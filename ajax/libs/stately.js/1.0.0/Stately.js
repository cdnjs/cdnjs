/*
 * Stately.js: A JavaScript based finite-state machine (FSM) engine.
 *
 * Copyright (c) 2012 Florian Schäfer (florian.schaefer@gmail.com)
 * Released under MIT license.
 *
 * Version: 1.0.0
 *
 */
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.Stately = factory();
    }
})(this, function () {

    var
        //helper to identify options type
        toString = Object.prototype.toString,

        //custom exception for invalid states
        InvalidStateError = (function () {

            //custom event constructor
            function InvalidStateError(message) {

                //set error name
                this.name = 'InvalidStateError';

                //the error message
                this.message = message;
            }

            //inherit from error object
            InvalidStateError.prototype = new Error();

            //set custom error constructor
            InvalidStateError.prototype.constructor = InvalidStateError;

            //return custom event
            return InvalidStateError;
        })();

    //constructor
    function Stately(statesObject) {

        //if statesObject is a function
        if (typeof statesObject === 'function') {

            //avaluate it
            statesObject = statesObject();
        }

        //if no valid statesObject provided
        if (toString.call(statesObject) !== '[object Object]') {

            //bail out
            throw new InvalidStateError('Stately.js: Invalid states object: `' + statesObject + '`.');
        }

        var
            //current state of the machine
            currentState,

            //storage for notification callbacks
            notificationStore = [],

            //notify callbacks about a transition
            notify = function () {

                //make copy of notification storage
                var notifications = notificationStore.slice();

                //walk over stored callbacks
                for (var i = 0, l = notifications.length; i < l; i++) {

                    //and notify them
                    notifications[i].apply(this, arguments);
                }
            },

            //storage for machine states
            stateStore = {

                //evaluates the current state
                getMachineState: function getMachineState() {

                    //return current state as string
                    return currentState.name;
                },

                //function to transition into another state
                setMachineState: function setMachineState(nextState /*, eventName */) {

                    var
                        //event that triggered the transition
                        eventName = arguments[1],

                        //before state hook
                        onBeforeState,

                        //enter state hook
                        onEnterState,

                        //leave state hook
                        onLeaveState,

                        //store last machine state
                        lastState = currentState;

                    //if state machine cannot handle returned state
                    if (!nextState || !nextState.name || !stateStore[nextState.name]) {

                        //throw invalid state exception
                        throw new InvalidStateError('Stately.js: Transitioned into invalid state: `' + setMachineState.caller + '`.');
                    }

                    //transition into next state
                    currentState = nextState;

                    //retrieve enter state hook
                    onBeforeState = stateMachine['onbefore' + currentState.name];

                    //if a hook is attached
                    if (onBeforeState && typeof onBeforeState === 'function') {

                        //apply it
                        onBeforeState.call(stateStore, eventName, lastState.name, nextState.name);
                    }

                    //retrieve enter state hook
                    onEnterState = stateMachine['onenter' + currentState.name] || stateMachine['on' + currentState.name];

                    //if a hook is attached
                    if (onEnterState && typeof onEnterState === 'function') {

                        //apply it
                        onEnterState.call(stateStore, eventName, lastState.name, nextState.name);
                    }

                    //retrieve leave state hook
                    onLeaveState = stateMachine['onleave' + currentState.name];

                    //if a hook is attached
                    if (onLeaveState && typeof onLeaveState === 'function') {

                        //apply it
                        onLeaveState.call(stateStore, eventName, lastState.name, nextState.name);
                    }

                    //notify notification callbacks about transition
                    notify.call(stateStore, eventName, lastState.name, nextState.name);

                    //return the state store
                    return this;
                },

                //function returns the possible events in current state
                getMachineEvents: function getMachineEvents() {

                    //storage for the events in current state
                    var events = [];

                    //walk over the events of the current state
                    for (var property in currentState) {

                        //ensure to only walk over own properties
                        if (currentState.hasOwnProperty(property)) {

                            //if it is an event function
                            if (typeof currentState[property] === 'function') {

                                //store it in events storage
                                events.push(property);
                            }
                        }
                    }

                    //return the possible events
                    return events;
                }

            },

            //the state machine
            stateMachine = {

                //copy function to public state machine object
                getMachineState: stateStore.getMachineState,

                //copy function to public state machine object
                getMachineEvents: stateStore.getMachineEvents,

                //store a new notification callback
                bind: function bind(callback) {

                    //if we have a new notification callback
                    if (callback) {

                        //store it in notification storage
                        notificationStore.push(callback);
                    }

                    //return the state machine
                    return this;
                },

                //remove a notification callback from storage
                unbind: function unbind(callback) {

                    //if no callback is given
                    if (!callback) {

                        //reset notification storage
                        notificationStore = [];

                    } else {

                        //walk over stored callbacks
                        for (var i = 0, l = notificationStore.length; i < l; i++) {

                            //if callback is found in notification storage
                            if (notificationStore[i] === callback) {

                                //remove it
                                notificationStore.splice(i, 1);
                            }
                        }
                    }

                    //return the state machine
                    return this;
                }
            },

            //event decorator factory function
            transition = function transition(stateName, eventName, nextEvent) {

                //the decorator
                return function event() {

                    var
                        //before event hook
                        onBeforeEvent,

                        //after event hook
                        onAfterEvent,

                        //new state machine changed into
                        nextState,

                        //return the state machine if no event returns something
                        eventValue = stateMachine;

                    //if attached event handler doesn't handle this event
                    if (stateStore[stateName] !== currentState) {

                        //try other events in chain
                        if (nextEvent) {

                            //let next event function handle this event
                            eventValue = nextEvent.apply(stateStore, arguments);
                        }

                        //or return value of action
                        return eventValue;
                    }

                    //retrieve before event hook
                    onBeforeEvent = stateMachine['onbefore' + eventName];

                    //if a hook is attached
                    if (onBeforeEvent && typeof onBeforeEvent === 'function') {

                        //apply it
                        onBeforeEvent.call(stateStore, eventName, currentState.name, currentState.name);
                    }

                    //run action
                    eventValue = stateStore[stateName][eventName].apply(stateStore, arguments);

                    //check return value of action
                    if (typeof eventValue === 'undefined') {

                        //nothing returned, stay in current state
                        nextState = currentState;

                        //return state machine
                        eventValue = stateMachine;

                    } else if (toString.call(eventValue) === '[object Object]') {

                        //if state store object is returned ('this' in action function) stay in current state
                        nextState = (eventValue === stateStore ? currentState : eventValue);

                        //return state machine
                        eventValue = stateMachine;

                    } else if (toString.call(eventValue) === '[object Array]' && eventValue.length >= 1) {

                        //else first element is next state
                        nextState = eventValue[0];

                        //second element is return value
                        eventValue = eventValue[1];
                    }

                    //retrieve after event hook
                    onAfterEvent = stateMachine['onafter' + eventName] || stateMachine['on' + eventName];

                    //if a hook is attached
                    if (onAfterEvent && typeof onAfterEvent === 'function') {

                        //apply it
                        onAfterEvent.call(stateStore, eventName, currentState.name, nextState.name);
                    }

                    //transition into next state
                    stateStore.setMachineState(nextState, eventName);

                    //return desired value
                    return eventValue;
                };
            };

        //walk over states object
        for (var stateName in statesObject) {

            //check own properties
            if (statesObject.hasOwnProperty(stateName)) {

                //store states in storage
                stateStore[stateName] = statesObject[stateName];

                //walk over events
                for (var eventName in stateStore[stateName]) {

                    //check for own property
                    if (stateStore[stateName].hasOwnProperty(eventName)) {

                        //if type is a string, assume it is a state
                        if (typeof stateStore[stateName][eventName] === 'string') {

                            //decorate it
                            stateStore[stateName][eventName] = (function (stateName) {

                                //with a function
                                return function event() {

                                    //returning the given state
                                    return this[stateName];
                                };

                            })(stateStore[stateName][eventName]);
                        }

                        //if type function
                        if (typeof stateStore[stateName][eventName] === 'function') {

                            //assign decorated events to state machine
                            stateMachine[eventName] = transition(stateName, eventName, stateMachine[eventName]);
                        }
                    }
                }

                //attach states name to object in storage
                stateStore[stateName].name = stateName;

                //initial state is the first passed in state
                if (!currentState) {

                    //make initial state the current state
                    currentState = stateStore[stateName];
                }
            }
        }

        //if there is no initial state
        if (!currentState) {

            //throw invalid state exception
            throw new InvalidStateError('Stately.js: Invalid initial state.');
        }

        //return the new state machine
        return stateMachine;
    }

    //a factory for new machines
    Stately.machine = function machine(statesObject) {
        return new Stately(statesObject);
    };

    //InvalidStateError exception
    Stately.InvalidStateError = InvalidStateError;

    //export Stately object
    return Stately;

});
