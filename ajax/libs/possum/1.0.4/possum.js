'use strict';

import stampit from 'stampit'
import cuid from 'cuid'

//constants
const ANY_TRANSITION = 'ANY'

const EVENTS = {
    INVALID_TRANSITION: 'invalidTransition'
    ,NO_HANDLER: 'noHandler'
    ,HANDLING: 'handling'
    ,HANDLED: 'handled'
    ,INVOKED: 'invoked'
    ,DEFERRED: 'deferred'
    ,TRANSITIONED: 'transitioned'
}

const evented = stampit()
.init(function(){
    const eventModel = stampit()
        .refs({
            topic: undefined
             , payload: undefined
             , state: undefined
             , timestamp: undefined
             , id: undefined
             , namespace: undefined
        })
        .init(function() {
            this.timestamp = new Date().toUTCString()
            this.id = cuid()
        })

    this.createEvent = eventModel
    this.copyEvent = (e, topic) => {
        return this.createEvent({
            topic: (topic || e.topic)
            , payload: e.payload
            , state: e.state
            , timestamp: new Date().toUTCString()
            , namespace: e.namespace
            , id: cuid()
        })
    }
    this.namespaced = (value, namespace) => {
        namespace = (namespace || this.namespace)
        let delimiter = ((this.emitterOpts.delimiter) || '.')
        let pre = ''
        if(namespace) {
            pre = `${namespace}${delimiter}`
        }
        return `${pre}${value}`
    }
})

/**
* possums are event emitters
* Provide either a `emitEvent` function for total control of the method of publication;
* or, provide a `emit` event (supported by any nodejs EventEmitter clone)
* */
const emitter = stampit()
.init(function(){
    //default impl
    this.emitEvent = (e) => {
        if(!this.emit) {
             throw new Error('please provide an `emit` or an `emitEvent` implementation')
        }
        e.event = this.namespaced(e.topic)
        this.emit(e.event, e)
        return this
    }
})

/**
 * represents a single state in config passed by `states`
 *
 * */
let stateModel = stampit()
    .refs({
        name: undefined
    })
    .init(function(){
        if(!this.name) {
            throw new Error('`name` is required')
        }
        let enter
        let exit
        let handlers = {}

        function noop(){}

        this.entry = () => {
            return (enter || noop)
        }
        this.exit = () => {
            return (exit || noop)
        }
        this.get = (inputType) => {
            return handlers[inputType]
        }
        this.set = (handlers = {}) => {
            for(let inputType in handlers) {
                this.handler(inputType,handlers[inputType])
            }
        }
        this.handler = (inputType, fn) => {
            switch(inputType) {
                case '_enter':
                    enter = fn
                    break;
                case '_exit':
                    exit = fn
                    break;
                default:
                    handlers[inputType] = fn;
                    break;
            }
            return this
        }
    })

/**
 * maps state names to their config and exposes
 * api for retrieving and setting them
 *
 * */
let statesCollection = stampit()
    .init(function(){
        let map = {}

        this.set = (states) => {
            for(let stateName in states) {
                let state = stateModel({ name: stateName})
                state.set(states[stateName])
                map[stateName] = state
            }
            return this
        }
        this.get = ( stateName, inputType ) => {
            let cfg = map[stateName]
            if(!cfg) {
                return undefined
            }
            let handler = cfg.get(inputType)
            if(!handler) {
                return undefined
            }
            return handler
        }
        this.getEntry = ( stateName ) => {
            let cfg = map[stateName]
            return cfg.entry()
        }
        this.getExit = ( stateName ) => {
            let cfg = map[stateName]
            return cfg.exit()
        }
        this.has = ( stateName ) => {
            return Object.hasOwnProperty.call(map, stateName)
        }
    })



/**
 * possum api
 *
 * */
let api = stampit()
    .refs({
        emitterOpts: {
            wildcards: true
            ,delimiter: '.'
            ,newListener: true
            ,maxListeners: 10
        }
    })
    .static({
        /**
         * Assign states config to instance
         *
         * @method states
         * @param {Object} cfg state : inputHandlers pairs
         * @example
         * p.states({
         *  'uninitialized': {
         *      'initialized': function(inputType, args) { ...}
         *      'another': function(inputType, args) { ...}
         *  }
         * })
         * @return {stamp}
         * */
        states (cfg) {
            return this.props({
                states: cfg
            })
        }
        /**
         * Set the state target. Uses `this` if not provided.
         *
         * @method target
         * @param {Any} obj the object for state tracking
         * @return {stamp}
         */
        , target (obj) {
            return this.props({
                target: obj
            })
        }
        /**
         * Configure the instance
         *
         * @method config
         * @param {Object} args any number of args to configure
         * @return {stamp}
         * */
        , config (...args) {
            return this.props(...args)
        }
    })
    .compose(evented, emitter)
    .init(function(){
        if(!this.initialState) {
            throw new Error('an `initialState` config is required')
        }

        let handlers = statesCollection()
        handlers.set(this.states)

        let target = (this.target || this)

        let invocations = []

        let deferrals = {}

        const replay = (deferred, lastResult) =>  {
            if(!deferred.length) {
                return lastResult
            }
            let next = deferred.shift()
            if(lastResult && lastResult.then) {
                return lastResult
                    .then(this.handle.bind(this, next.inputType, next.args))
                    .then(function(res){
                        return replay(deferred, res)
                    })
            }
            return replay(deferred, this.handle(next.inputType,next.args))
        }

        const done = (len, completed, result) => {
            //remove the invocation
            if(invocations.length >= len) {
                invocations.splice(len -1, 1)
            }
            this.emitEvent(completed)
            return result
        }

        /**
         * The current state
         *
         * @property {String} currentState the current state of the possum
         * */
        this.currentState = this.initialState
        /**
         * The prior state
         *
         * @property {String} priorState the prior state of the possum
         * */
        this.priorState = undefined

        /**
         * Handle an `inputType` with the configure states handlers
         *
         * @method handle - the primary interaction point for callers
         * @param {String} inputType
         * @param {Any} [args]
         * @example
         *
         * myPossum.handle('initialize',{ id: '123'})
         * @return {Any} the result of the handler configured by `states`
         * */
        this.handle = (inputType, args) => {
            let len = invocations.push({ inputType, args})
            let handler = handlers.get(this.currentState, inputType)
            if(!handler) {
                let noHandler = this.createEvent({
                    topic: EVENTS.NO_HANDLER
                    , payload: {
                        args: args
                        , inputType: inputType
                    }
                    , namespace: this.namespace
                    , state: this.currentState
                })
                this.emitEvent(noHandler)
                return this
            }
            //create events
            let handling = this.createEvent({
                topic: EVENTS.HANDLING
                , payload: {
                    args: args
                    , inputType: inputType
                }
                , namespace: this.namespace
                , state: this.currentState
            })
            let invoked = this.copyEvent(handling, EVENTS.INVOKED)
            let handled = this.copyEvent(handling, EVENTS.HANDLED)

            //do it
            this.emitEvent(handling)
            let result = handler.call(this, args, target)
            this.emitEvent(invoked)

            if(result && result.then) {
                return result
                    .then(done.bind(this, len, handled))
            }
            return done(len, handled, result)
        }

        /**
         * Defers the invocation for replay after transition
         *
         * @method deferUntilTransition
         * @param {String} [toState] optionally provide a transition
         * after which to replay this invocation.
         * @return {Possum} the possum instance
         * */
        this.deferUntilTransition = (toState = ANY_TRANSITION) => {
            let coll = (deferrals[toState] || [])
            let invocation = invocations.pop()
            let deferred = this.createEvent({
                topic: 'deferred'
                , state: this.currentState
                , payload: invocation
                , namespace: this.namespace
            })
            coll.push(invocation)
            deferrals[toState] = coll

            this.emitEvent(deferred)
            return this
        }
        const updateStates = (toState, fromState) => {
            this.priorState = fromState
            this.currentState = toState
        }

        const doTransition = (toState, fromState, target) => {
            let transitioned = this.createEvent({
                topic: 'transitioned'
                , payload: {
                    toState: toState
                    , fromState: fromState
                }
                , state: fromState
                , namespace: this.namespace
            })
            this.emitEvent(transitioned)
            let deferred = (deferrals[toState] || [])
                            .concat(deferrals[ANY_TRANSITION] || []);
            (delete deferrals[toState]);
            (delete deferrals[ANY_TRANSITION]);
            return replay(deferred)
        }
        /**
         * Transition to another state.
         * Prefer calling this internally; eg inside a handler.
         *
         * @method transition
         * @param {String} toState - the target transition
         * @return {Any} the result of any deferred handlers, if any
         * */
        this.transition = (toState) => {
            if(!handlers.has( toState )) {
                this.emitEvent(this.createEvent({
                    topic: EVENTS.INVALID_TRANSITION
                    , namespace: this.namespace
                    , payload: { toState: toState, fromState: this.currentState}
                    , state: this.currentState
                }))
                return this
            }
            // first exit current state
            let exit = handlers.getExit(this.currentState)
            let enter = handlers.getEntry(toState)
            let result = exit.call(this, target )
            let updateStateBound = updateStates.bind(this, toState, this.currentState)
            let doTransitionBound = doTransition.bind(this, toState, this.currentState, target )
            if(result && result.then) {
                return result
                    .tap(updateStateBound)
                    .then(enter.bind(this))
                    .then(doTransitionBound)
            }
            updateStateBound();
            result = enter.call(this, target )
            if( result && result.then ) {
                return result.then(doTransitionBound)
            }
            return doTransitionBound()
        }

        /**
         * Getter/setter for the state target to pass
         * into each handler
         *
         * @method target
         * @param {Any} [obj] if provided, SET the target
         * with `obj`; otherwise, GET the target
         * @return {Any} the target
         * */
        this.target = (obj) => {
            if(obj) {
                return (target = obj)
            }
            return target
        }
    })

export default api
