!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.mercury=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*
    Pro tip: Don't require `mercury` itself.
      require and depend on all these modules directly!
*/
var mercury = module.exports = {
    // Entry
    main: _dereq_("main-loop"),

    // Input
    Delegator: _dereq_("dom-delegator"),
    input: _dereq_("geval/multiple"),
    event: _dereq_("value-event/event"),
    valueEvent: _dereq_("value-event/value"),
    submitEvent: _dereq_("value-event/submit"),
    changeEvent: _dereq_("value-event/change"),
    keyEvent: _dereq_("value-event/key"),

    // State
    array: _dereq_("observ-array"),
    hash: _dereq_("observ-hash"),
    value: _dereq_("observ"),

    // Render
    diff: _dereq_("virtual-dom/diff"),
    patch: _dereq_("virtual-dom/patch"),
    partial: _dereq_("vdom-thunk"),
    create: _dereq_("virtual-dom/create-element"),
    h: _dereq_("virtual-hyperscript"),
    svg: _dereq_("virtual-hyperscript/svg"),

    // Utility
    app: app
}

function app(elem, observ, render) {
    mercury.Delegator();
    var loop = mercury.main(observ(), render)
    observ(loop.update)
    elem.appendChild(loop.target)
}

},{"dom-delegator":5,"geval/multiple":16,"main-loop":19,"observ":25,"observ-array":22,"observ-hash":24,"value-event/change":27,"value-event/event":28,"value-event/key":29,"value-event/submit":35,"value-event/value":36,"vdom-thunk":37,"virtual-dom/create-element":38,"virtual-dom/diff":39,"virtual-dom/patch":42,"virtual-hyperscript":61,"virtual-hyperscript/svg":69}],2:[function(_dereq_,module,exports){

},{}],3:[function(_dereq_,module,exports){
var DataSet = _dereq_("data-set")

module.exports = addEvent

function addEvent(target, type, handler) {
    var ds = DataSet(target)
    var events = ds[type]

    if (!events) {
        ds[type] = handler
    } else if (Array.isArray(events)) {
        if (events.indexOf(handler) === -1) {
            events.push(handler)
        }
    } else if (events !== handler) {
        ds[type] = [events, handler]
    }
}

},{"data-set":7}],4:[function(_dereq_,module,exports){
var document = _dereq_("global/document")
var DataSet = _dereq_("data-set")

var addEvent = _dereq_("./add-event.js")
var removeEvent = _dereq_("./remove-event.js")
var ProxyEvent = _dereq_("./proxy-event.js")

module.exports = DOMDelegator

function DOMDelegator() {
    this.target = document.documentElement
    this.events = {}
    this.rawEventListeners = {}
    this.globalListeners = {}
}

DOMDelegator.prototype.addEventListener = addEvent
DOMDelegator.prototype.removeEventListener = removeEvent

DOMDelegator.prototype.addGlobalEventListener =
    function addGlobalEventListener(eventName, fn) {
        var listeners = this.globalListeners[eventName]
        if (!listeners) {
            listeners = this.globalListeners[eventName] = []
        }

        if (listeners.indexOf(fn) === -1) {
            listeners.push(fn)
        }
    }

DOMDelegator.prototype.removeGlobalEventListener =
    function removeGlobalEventListener(eventName, fn) {
        var listeners = this.globalListeners[eventName]
        if (!listeners) {
            return
        }

        var index = listeners.indexOf(fn)
        if (index !== -1) {
            listeners.splice(index, 1)
        }
    }

DOMDelegator.prototype.listenTo = function listenTo(eventName) {
    if (this.events[eventName]) {
        return
    }

    this.events[eventName] = true
    listen(this, eventName)
}

DOMDelegator.prototype.unlistenTo = function unlistenTo(eventName) {
    if (!this.events[eventName]) {
        return
    }

    this.events[eventName] = false
    unlisten(this, eventName)
}

function listen(delegator, eventName) {
    var listener = delegator.rawEventListeners[eventName]

    if (!listener) {
        listener = delegator.rawEventListeners[eventName] =
            createHandler(eventName, delegator.globalListeners)
    }

    delegator.target.addEventListener(eventName, listener, true)
}

function unlisten(delegator, eventName) {
    var listener = delegator.rawEventListeners[eventName]

    if (!listener) {
        throw new Error("dom-delegator#unlistenTo: cannot " +
            "unlisten to " + eventName)
    }

    delegator.target.removeEventListener(eventName, listener, true)
}

function createHandler(eventName, globalListeners) {
    return handler

    function handler(ev) {
        var globalHandlers = globalListeners[eventName] || []
        var listener = getListener(ev.target, eventName)

        var handlers = globalHandlers
            .concat(listener ? listener.handlers : [])
        if (handlers.length === 0) {
            return
        }

        var arg = new ProxyEvent(ev, listener)

        handlers.forEach(function (handler) {
            typeof handler === "function" ?
                handler(arg) : handler.handleEvent(arg)
        })
    }
}

function getListener(target, type) {
    // terminate recursion if parent is `null`
    if (target === null) {
        return null
    }

    var ds = DataSet(target)
    // fetch list of handler fns for this event
    var handler = ds[type]
    var allHandler = ds.event

    if (!handler && !allHandler) {
        return getListener(target.parentNode, type)
    }

    var handlers = [].concat(handler || [], allHandler || [])
    return new Listener(target, handlers)
}

function Listener(target, handlers) {
    this.currentTarget = target
    this.handlers = handlers
}

},{"./add-event.js":3,"./proxy-event.js":13,"./remove-event.js":14,"data-set":7,"global/document":18}],5:[function(_dereq_,module,exports){
var Individual = _dereq_("individual")

var DOMDelegator = _dereq_("./dom-delegator.js")

var delegatorCache = Individual("__DOM_DELEGATOR_CACHE@7", {})
var commonEvents = [
    "blur", "change", "click",  "contextmenu", "dblclick",
    "error","focus", "focusin", "focusout", "input", "keydown",
    "keypress", "keyup", "load", "mousedown", "mouseup",
    "resize", "scroll", "select", "submit", "unload",
]

/*  Delegator is a thin wrapper around a singleton `DOMDelegator`
        instance.

    Only one DOMDelegator should exist because we do not want
        duplicate event listeners bound to the DOM.

    `Delegator` will also `listenTo()` all events unless 
        every caller opts out of it
*/
module.exports = Delegator

function Delegator(opts) {
    opts = opts || {}
    var delegator = delegatorCache.delegator

    if (!delegator) {
        delegator = delegatorCache.delegator =
            new DOMDelegator()
    }

    if (opts.defaultEvents !== false) {
        for (var i = 0; i < commonEvents.length; i++) {
            delegator.listenTo(commonEvents[i])
        }
    }

    return delegator
}



},{"./dom-delegator.js":4,"individual":10}],6:[function(_dereq_,module,exports){
module.exports = createHash

function createHash(elem) {
    var attributes = elem.attributes
    var hash = {}

    if (attributes === null || attributes === undefined) {
        return hash
    }

    for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i]

        if (attr.name.substr(0,5) !== "data-") {
            continue
        }

        hash[attr.name.substr(5)] = attr.value
    }

    return hash
}

},{}],7:[function(_dereq_,module,exports){
var createStore = _dereq_("weakmap-shim/create-store")
var Individual = _dereq_("individual")

var createHash = _dereq_("./create-hash.js")

var hashStore = Individual("__DATA_SET_WEAKMAP@3", createStore())

module.exports = DataSet

function DataSet(elem) {
    var store = hashStore(elem)

    if (!store.hash) {
        store.hash = createHash(elem)
    }

    return store.hash
}

},{"./create-hash.js":6,"individual":10,"weakmap-shim/create-store":8}],8:[function(_dereq_,module,exports){
var hiddenStore = _dereq_('./hidden-store.js');

module.exports = createStore;

function createStore() {
    var key = {};

    return function (obj) {
        if (typeof obj !== 'object' || obj === null) {
            throw new Error('Weakmap-shim: Key must be object')
        }

        var store = obj.valueOf(key);
        return store && store.identity === key ?
            store : hiddenStore(obj, key);
    };
}

},{"./hidden-store.js":9}],9:[function(_dereq_,module,exports){
module.exports = hiddenStore;

function hiddenStore(obj, key) {
    var store = { identity: key };
    var valueOf = obj.valueOf;

    Object.defineProperty(obj, "valueOf", {
        value: function (value) {
            return value !== key ?
                valueOf.apply(this, arguments) : store;
        },
        writable: true
    });

    return store;
}

},{}],10:[function(_dereq_,module,exports){
var root = _dereq_("global")

module.exports = Individual

function Individual(key, value) {
    if (root[key]) {
        return root[key]
    }

    Object.defineProperty(root, key, {
        value: value
        , configurable: true
    })

    return value
}

},{"global":11}],11:[function(_dereq_,module,exports){
(function (global){
/*global window, global*/
if (typeof global !== "undefined") {
    module.exports = global
} else if (typeof window !== "undefined") {
    module.exports = window
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(_dereq_,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],13:[function(_dereq_,module,exports){
var inherits = _dereq_("inherits")

var ALL_PROPS = [
    "altKey", "bubbles", "cancelable", "ctrlKey",
    "eventPhase", "metaKey", "relatedTarget", "shiftKey",
    "target", "timeStamp", "type", "view", "which"
]
var KEY_PROPS = ["char", "charCode", "key", "keyCode"]
var MOUSE_PROPS = [
    "button", "buttons", "clientX", "clientY", "layerX",
    "layerY", "offsetX", "offsetY", "pageX", "pageY",
    "screenX", "screenY", "toElement"
]

var rkeyEvent = /^key|input/
var rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/

module.exports = ProxyEvent

function ProxyEvent(ev, listener) {
    if (!(this instanceof ProxyEvent)) {
        return new ProxyEvent(ev, listener)
    }

    if (rkeyEvent.test(ev.type)) {
        return new KeyEvent(ev, listener)
    } else if (rmouseEvent.test(ev.type)) {
        return new MouseEvent(ev, listener)
    }

    for (var i = 0; i < ALL_PROPS.length; i++) {
        var propKey = ALL_PROPS[i]
        this[propKey] = ev[propKey]
    }

    this._rawEvent = ev
    this.currentTarget = listener ? listener.currentTarget : null
}

ProxyEvent.prototype.preventDefault = function () {
    this._rawEvent.preventDefault()
}

function MouseEvent(ev, listener) {
    for (var i = 0; i < ALL_PROPS.length; i++) {
        var propKey = ALL_PROPS[i]
        this[propKey] = ev[propKey]
    }

    for (var j = 0; j < MOUSE_PROPS.length; j++) {
        var mousePropKey = MOUSE_PROPS[j]
        this[mousePropKey] = ev[mousePropKey]
    }

    this._rawEvent = ev
    this.currentTarget = listener ? listener.currentTarget : null
}

inherits(MouseEvent, ProxyEvent)

function KeyEvent(ev, listener) {
    for (var i = 0; i < ALL_PROPS.length; i++) {
        var propKey = ALL_PROPS[i]
        this[propKey] = ev[propKey]
    }

    for (var j = 0; j < KEY_PROPS.length; j++) {
        var keyPropKey = KEY_PROPS[j]
        this[keyPropKey] = ev[keyPropKey]
    }

    this._rawEvent = ev
    this.currentTarget = listener ? listener.currentTarget : null
}

inherits(KeyEvent, ProxyEvent)

},{"inherits":12}],14:[function(_dereq_,module,exports){
var DataSet = _dereq_("data-set")

module.exports = removeEvent

function removeEvent(target, type, handler) {
    var ds = DataSet(target)
    var events = ds[type]

    if (!events) {
        return
    } else if (Array.isArray(events)) {
        var index = events.indexOf(handler)
        if (index !== -1) {
            events.splice(index, 1)
        }
    } else if (events === handler) {
        ds[type] = null
    }
}

},{"data-set":7}],15:[function(_dereq_,module,exports){
module.exports = Event

function Event() {
    var listeners = []

    return { broadcast: broadcast, listen: event }

    function broadcast(value) {
        for (var i = 0; i < listeners.length; i++) {
            listeners[i](value)
        }
    }

    function event(listener) {
        listeners.push(listener)

        return removeListener

        function removeListener() {
            var index = listeners.indexOf(listener)
            if (index !== -1) {
                listeners.splice(index, 1)
            }
        }
    }
}

},{}],16:[function(_dereq_,module,exports){
var event = _dereq_("./single.js")

module.exports = multiple

function multiple(names) {
    return names.reduce(function (acc, name) {
        acc[name] = event()
        return acc
    }, {})
}

},{"./single.js":17}],17:[function(_dereq_,module,exports){
var Event = _dereq_('./event.js')

module.exports = Single

function Single() {
    var tuple = Event()

    return function event(value) {
        if (typeof value === "function") {
            return tuple.listen(value)
        } else {
            return tuple.broadcast(value)
        }
    }
}

},{"./event.js":15}],18:[function(_dereq_,module,exports){
if (typeof document !== "undefined") {
    module.exports = document;
} else {
    module.exports = _dereq_("min-document");
}

},{"min-document":2}],19:[function(_dereq_,module,exports){
var raf = _dereq_("raf/polyfill")
var vdomCreate = _dereq_("virtual-dom/create-element")
var vdomDiff = _dereq_("virtual-dom/diff")
var vdomPatch = _dereq_("virtual-dom/patch")

module.exports = main

function main(initialState, view, opts) {
    opts = opts || {}

    var currentState = initialState
    var create = opts.create || vdomCreate
    var diff = opts.diff || vdomDiff
    var patch = opts.patch || vdomPatch
    var looping = true

    var tree = view(currentState)
    var target = create(tree, opts)

    currentState = null

    raf(redraw)

    return {
        target: target,
        update: update
    }

    function update(state) {
        if (currentState === null && !looping) {
            looping = true
            raf(redraw)
        }

        currentState = state
    }

    function redraw() {
        if (currentState === null) {
            looping = false
            return
        }

        var newTree = view(currentState)

        if (opts.createOnly) {
            create(newTree, opts)
        } else {
            var patches = diff(tree, newTree, opts)
            patch(target, patches, opts)
        }

        tree = newTree
        currentState = null

        raf(redraw)
    }
}

},{"raf/polyfill":26,"virtual-dom/create-element":38,"virtual-dom/diff":39,"virtual-dom/patch":42}],20:[function(_dereq_,module,exports){
module.exports = addListener

function addListener(observArray, observ) {
    var list = observArray._list

    return observ(function (value) {
        var valueList =  observArray().slice()
        var index = list.indexOf(observ)

        // This code path should never hit. If this happens
        // there's a bug in the cleanup code
        if (index === -1) {
            var message = "observ-array: Unremoved observ listener"
            var err = new Error(message)
            err.list = list
            err.index = index
            err.observ = observ
            throw err
        }

        valueList.splice(index, 1, value)
        valueList._diff = [index, 1, value]

        observArray.set(valueList)
    })
}

},{}],21:[function(_dereq_,module,exports){
var ObservArray = _dereq_("./index.js")

var slice = Array.prototype.slice

var ARRAY_METHODS = [
    "concat", "slice", "every", "filter", "forEach", "indexOf",
    "join", "lastIndexOf", "map", "reduce", "reduceRight",
    "some", "toString", "toLocaleString"
]

var methods = ARRAY_METHODS.map(function (name) {
    return [name, function () {
        var res = this._list[name].apply(this._list, arguments)

        if (res && Array.isArray(res)) {
            res = ObservArray(res)
        }

        return res
    }]
})

module.exports = ArrayMethods

function ArrayMethods(obs) {
    obs.push = observArrayPush
    obs.pop = observArrayPop
    obs.shift = observArrayShift
    obs.unshift = observArrayUnshift
    obs.reverse = notImplemented
    obs.sort = notImplemented

    methods.forEach(function (tuple) {
        obs[tuple[0]] = tuple[1]
    })
    return obs
}



function observArrayPush() {
    var args = slice.call(arguments)
    args.unshift(this._list.length, 0)
    this.splice.apply(this, args)

    return this._list.length
}
function observArrayPop() {
    return this.splice(this._list.length - 1, 1)[0]
}
function observArrayShift() {
    return this.splice(0, 1)[0]
}
function observArrayUnshift() {
    var args = slice.call(arguments)
    args.unshift(0, 0)
    this.splice.apply(this, args)

    return this._list.length
}


function notImplemented() {
    throw new Error("Pull request welcome")
}

},{"./index.js":22}],22:[function(_dereq_,module,exports){
var Observ = _dereq_("observ")

// circular dep between ArrayMethods & this file
module.exports = ObservArray

var splice = _dereq_("./splice.js")
var ArrayMethods = _dereq_("./array-methods.js")
var addListener = _dereq_("./add-listener.js")

/*  ObservArray := (Array<T>) => Observ<
        Array<T> & { _diff: Array }
    > & {
        splice: (index: Number, amount: Number, rest...: T) =>
            Array<T>,
        push: (values...: T) => Number,
        filter: (lambda: Function, thisValue: Any) => Array<T>,
        indexOf: (item: T, fromIndex: Number) => Number
    }

    Fix to make it more like ObservHash.

    I.e. you write observables into it. 
        reading methods take plain JS objects to read
        and the value of the array is always an array of plain
        objsect.

        The observ array instance itself would have indexed 
        properties that are the observables
*/
function ObservArray(initialList) {
    // list is the internal mutable list observ instances that
    // all methods on `obs` dispatch to.
    var list = initialList
    var initialState = []

    // copy state out of initialList into initialState
    list.forEach(function (observ, index) {
        initialState[index] = typeof observ === "function" ?
            observ() : observ
    })

    var obs = Observ(initialState)
    obs.splice = splice

    obs.get = get
    obs.getLength = getLength
    obs.put = put

    // you better not mutate this list directly
    // this is the list of observs instances
    obs._list = list

    var removeListeners = list.map(function (observ) {
        return typeof observ === "function" ?
            addListener(obs, observ) :
            null
    });
    // this is a list of removal functions that must be called
    // when observ instances are removed from `obs.list`
    // not calling this means we do not GC our observ change
    // listeners. Which causes rage bugs
    obs._removeListeners = removeListeners

    return ArrayMethods(obs, list)
}

function get(index) {
    return this._list[index]
}

function put(index, value) {
    this.splice(index, 1, value)
}

function getLength() {
    return this._list.length
}

},{"./add-listener.js":20,"./array-methods.js":21,"./splice.js":23,"observ":25}],23:[function(_dereq_,module,exports){
var slice = Array.prototype.slice

var addListener = _dereq_("./add-listener.js")

module.exports = splice

// `obs.splice` is a mutable implementation of `splice()`
// that mutates both `list` and the internal `valueList` that
// is the current value of `obs` itself
function splice(index, amount) {
    var obs = this
    var args = slice.call(arguments, 0)
    var valueList = obs().slice()

    // generate a list of args to mutate the internal
    // list of only obs
    var valueArgs = args.map(function (value, index) {
        if (index === 0 || index === 1) {
            return value
        }

        // must unpack observables that we are adding
        return typeof value === "function" ? value() : value
    })

    valueList.splice.apply(valueList, valueArgs)
    // we remove the observs that we remove
    var removed = obs._list.splice.apply(obs._list, args)

    var extraRemoveListeners = args.slice(2).map(function (observ) {
        return typeof observ === "function" ?
            addListener(obs, observ) :
            null
    })
    extraRemoveListeners.unshift(args[0], args[1])
    var removedListeners = obs._removeListeners.splice
        .apply(obs._removeListeners, extraRemoveListeners)

    removedListeners.forEach(function (removeObservListener) {
        if (removeObservListener) {
            removeObservListener()
        }
    })

    valueList._diff = valueArgs

    obs.set(valueList)
    return removed
}

},{"./add-listener.js":20}],24:[function(_dereq_,module,exports){
var Observ = _dereq_("observ")
var extend = _dereq_("xtend")

/* ObservHash := (Object<String, Observ<T>>) => 
    Object<String, Observ<T>> &
        Observ<Object<String, T> & {
            _diff: Object<String, Any>
        }>

*/
module.exports = ObservHash

function ObservHash(hash) {
    var keys = Object.keys(hash)

    var initialState = {}

    keys.forEach(function (key) {
        var observ = hash[key]
        initialState[key] = typeof observ === "function" ?
            observ() : observ
    })

    var obs = Observ(initialState)
    keys.forEach(function (key) {
        var observ = hash[key]
        obs[key] = observ

        if (typeof observ === "function") {
            observ(function (value) {
                var state = extend(obs())
                state[key] = value
                var diff = {}
                diff[key] = value && value._diff ?
                    value._diff : value
                state._diff = diff
                obs.set(state)
            })
        }
    })

    return obs
}

},{"observ":25,"xtend":70}],25:[function(_dereq_,module,exports){
module.exports = Observable

function Observable(value) {
    var listeners = []
    value = value === undefined ? null : value

    observable.set = function (v) {
        value = v
        listeners.forEach(function (f) {
            f(v)
        })
    }

    return observable

    function observable(listener) {
        if (!listener) {
            return value
        }

        listeners.push(listener)

        return function remove() {
            listeners.splice(listeners.indexOf(listener), 1)
        }
    }
}

},{}],26:[function(_dereq_,module,exports){
var global = typeof window === 'undefined' ? this : window

var _raf =
  global.requestAnimationFrame ||
  global.webkitRequestAnimationFrame ||
  global.mozRequestAnimationFrame ||
  global.msRequestAnimationFrame ||
  global.oRequestAnimationFrame ||
  (global.setImmediate ? function(fn, el) {
    setImmediate(fn)
  } :
  function(fn, el) {
    setTimeout(fn, 0)
  })

module.exports = _raf

},{}],27:[function(_dereq_,module,exports){
var extend = _dereq_('xtend')
var getFormData = _dereq_('form-data-set/element')

module.exports = ChangeSinkHandler

function ChangeSinkHandler(sink, data) {
    if (!(this instanceof ChangeSinkHandler)) {
        return new ChangeSinkHandler(sink, data)
    }

    this.sink = sink
    this.data = data
    this.type = 'change'
    this.id = sink.id
}

ChangeSinkHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    var target = ev.target

    var isValid =
        (ev.type === 'change' && target.type === 'checkbox') ||
        (ev.type === 'input' && target.type === 'text') ||
        (ev.type === 'change' && target.type === 'range')

    if (!isValid) {
        return
    }

    var value = getFormData(ev.currentTarget)
    var data = extend(value, this.data)

    if (typeof this.sink === 'function') {
        this.sink(data)
    } else {
        this.sink.write(data)
    }
}

},{"form-data-set/element":31,"xtend":34}],28:[function(_dereq_,module,exports){
module.exports = SinkEventHandler

function SinkEventHandler(sink, data) {
    if (!(this instanceof SinkEventHandler)) {
        return new SinkEventHandler(sink, data)
    }

    this.sink = sink
    this.id = sink.id
    this.data = data
}

SinkEventHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    if (typeof this.sink === 'function') {
        this.sink(this.data)
    } else {
        this.sink.write(this.data)
    }
}

},{}],29:[function(_dereq_,module,exports){
module.exports = KeyEventHandler

function KeyEventHandler(fn, key, data) {
    if (!(this instanceof KeyEventHandler)) {
        return new KeyEventHandler(fn, key, data)
    }

    this.fn = fn
    this.data = data
    this.key = key
}

KeyEventHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    if (ev.keyCode === this.key) {
        this.fn(this.data)
    }
}

},{}],30:[function(_dereq_,module,exports){
var slice = Array.prototype.slice

module.exports = iterativelyWalk

function iterativelyWalk(nodes, cb) {
    if (!('length' in nodes)) {
        nodes = [nodes]
    }
    
    nodes = slice.call(nodes)

    while(nodes.length) {
        var node = nodes.shift(),
            ret = cb(node)

        if (ret) {
            return ret
        }

        if (node.childNodes.length) {
            nodes = slice.call(node.childNodes).concat(nodes)
        }
    }
}

},{}],31:[function(_dereq_,module,exports){
var walk = _dereq_('dom-walk')

var FormData = _dereq_('./index.js')

module.exports = getFormData

function buildElems(rootElem) {
    var hash = {}

    walk(rootElem, function (child) {
        if (child.name) {
            hash[child.name] = child
        }
    })


    return hash
}

function getFormData(rootElem) {
    var elements = buildElems(rootElem)

    return FormData(elements)
}

},{"./index.js":32,"dom-walk":30}],32:[function(_dereq_,module,exports){
/*jshint maxcomplexity: 10*/

module.exports = FormData

//TODO: Massive spec: http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#constructing-form-data-set
function FormData(elements) {
    return Object.keys(elements).reduce(function (acc, key) {
        var elem = elements[key]

        acc[key] = valueOfElement(elem)

        return acc
    }, {})
}

function valueOfElement(elem) {
    if (typeof elem === "function") {
        return elem()
    } else if (containsRadio(elem)) {
        var elems = toList(elem)
        var checked = elems.filter(function (elem) {
            return elem.checked
        })[0] || null

        return checked ? checked.value : null
    } else if (Array.isArray(elem)) {
        return elem.map(valueOfElement).filter(filterNull)
    } else if (elem.tagName === undefined && elem.nodeType === undefined) {
        return FormData(elem)
    } else if (elem.tagName === "INPUT" && isChecked(elem)) {
        if (elem.hasAttribute("value")) {
            return elem.checked ? elem.value : null
        } else {
            return elem.checked
        }
    } else if (elem.tagName === "INPUT") {
        return elem.value
    } else if (elem.tagName === "TEXTAREA") {
        return elem.value
    } else if (elem.tagName === "SELECT") {
        return elem.value
    }
}

function isChecked(elem) {
    return elem.type === "checkbox" || elem.type === "radio"
}

function containsRadio(value) {
    if (value.tagName || value.nodeType) {
        return false
    }

    var elems = toList(value)

    return elems.some(function (elem) {
        return elem.tagName === "INPUT" && elem.type === "radio"
    })
}

function toList(value) {
    if (Array.isArray(value)) {
        return value
    }

    return Object.keys(value).map(prop, value)
}

function prop(x) {
    return this[x]
}

function filterNull(val) {
    return val !== null
}

},{}],33:[function(_dereq_,module,exports){
module.exports = hasKeys

function hasKeys(source) {
    return source !== null &&
        (typeof source === "object" ||
        typeof source === "function")
}

},{}],34:[function(_dereq_,module,exports){
var hasKeys = _dereq_("./has-keys")

module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        if (!hasKeys(source)) {
            continue
        }

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{"./has-keys":33}],35:[function(_dereq_,module,exports){
var extend = _dereq_('xtend')
var getFormData = _dereq_('form-data-set/element')

var ENTER = 13

module.exports = SubmitSinkHandler

function SubmitSinkHandler(sink, data) {
    if (!(this instanceof SubmitSinkHandler)) {
        return new SubmitSinkHandler(sink, data)
    }

    this.sink = sink
    this.data = data
    this.id = sink.id
    this.type = 'submit'
}

SubmitSinkHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    var target = ev.target

    var isValid =
        (ev.type === 'click' && target.tagName === 'BUTTON') ||
        (
            (target.type === 'text' || target.tagName === 'TEXTAREA') &&
            (ev.keyCode === ENTER && !ev.shiftKey && ev.type === 'keydown')
        )

    if (!isValid) {
        return
    }

    var value = getFormData(ev.currentTarget)
    var data = extend(value, this.data)

    if (typeof this.sink === 'function') {
        this.sink(data)
    } else {
        this.sink.write(data)
    }
}

},{"form-data-set/element":31,"xtend":34}],36:[function(_dereq_,module,exports){
var extend = _dereq_('xtend')
var getFormData = _dereq_('form-data-set/element')

module.exports = ValueEventHandler

function ValueEventHandler(sink, data) {
    if (!(this instanceof ValueEventHandler)) {
        return new ValueEventHandler(sink, data)
    }

    this.sink = sink
    this.data = data
    this.id = sink.id
}

ValueEventHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    var value = getFormData(ev.currentTarget)
    var data = extend(value, this.data)

    if (typeof this.sink === 'function') {
        this.sink(data)
    } else {
        this.sink.write(data)
    }
}

},{"form-data-set/element":31,"xtend":34}],37:[function(_dereq_,module,exports){
var createElement = _dereq_("virtual-dom/create-element")
var diff = _dereq_("virtual-dom/diff")
var patch = _dereq_("virtual-dom/patch")

var MESSAGE = "partial() cannot cache on values. " + 
    "You must specify object arguments. partial("

function copyOver(list, offset) {
    var newList = []
    for (var i = offset; i < list.length; i++) {
        newList[i - offset] = list[i]
    }
    return newList
}

module.exports = partial

function partial(fn) {
    var args = copyOver(arguments, 1)
    var firstArg = args[0]
    var hasObjects = args.length === 0
    var key

    if (typeof firstArg === "object" && firstArg !== null) {
        hasObjects = true
        if ("key" in firstArg) {
            key = firstArg.key
        } else if ("id" in firstArg) {
            key = firstArg.id
        }
    }

    for (var i = 1; !hasObjects && i < args.length; i++) {
        var arg = args[i];
        if (typeof arg === "object" && arg !== null) {
            hasObjects = true
        }
    }

    if (!hasObjects) {
        throw new Error(MESSAGE + args + ")")
    }

    return new Thunk(fn, args, key)
}

function Thunk(fn, args, key) {
    this.fn = fn
    this.args = args
    this.vnode = null
    this.key = key
}

Thunk.prototype.type = "immutable-thunk"
Thunk.prototype.update = update
Thunk.prototype.init = init

function shouldUpdate(current, previous) {
    if (current.fn !== previous.fn) {
        return true
    }

    var cargs = current.args
    var pargs = previous.args

    // fast case for args is zero case.
    if (cargs.length === 0 && pargs.length === 0) {
        return false
    }

    if (cargs.length !== pargs.length) {
        return true
    }

    var max = cargs.length > pargs.length ? cargs.length : pargs.length

    for (var i = 0; i < max; i++) {
        if (cargs[i] !== pargs[i]) {
            return true
        }
    }

    return false
}

function update(previous, domNode) {
    if (!shouldUpdate(this, previous)) {
        this.vnode = previous.vnode
        return
    }

    if (!this.vnode) {
        this.vnode = this.fn.apply(null, this.args)
    }

    var patches = diff(previous.vnode, this.vnode)
    patch(domNode, patches)
}

function init() {
    this.vnode = this.fn.apply(null, this.args)
    return createElement(this.vnode)
}

},{"virtual-dom/create-element":38,"virtual-dom/diff":39,"virtual-dom/patch":42}],38:[function(_dereq_,module,exports){
var createElement = _dereq_("./vdom/create-element")

module.exports = createElement

},{"./vdom/create-element":44}],39:[function(_dereq_,module,exports){
var diff = _dereq_("./vtree/diff")

module.exports = diff

},{"./vtree/diff":49}],40:[function(_dereq_,module,exports){
module.exports = isObject

function isObject(x) {
    return typeof x === "object" && x !== null
}

},{}],41:[function(_dereq_,module,exports){
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

},{}],42:[function(_dereq_,module,exports){
var patch = _dereq_("./vdom/patch")

module.exports = patch

},{"./vdom/patch":47}],43:[function(_dereq_,module,exports){
var isObject = _dereq_("is-object")

var isHook = _dereq_("../vtree/is-vhook")

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (isHook(propValue)) {
            propValue.hook(node,
                propName,
                previous ? previous[propName] : undefined)
        } else {
            if (isObject(propValue)) {
                if (!isObject(node[propName])) {
                    node[propName] = {}
                }

                for (var k in propValue) {
                    node[propName][k] = propValue[k]
                }
            } else if (propValue !== undefined) {
                node[propName] = propValue
            }
        }
    }
}

},{"../vtree/is-vhook":50,"is-object":40}],44:[function(_dereq_,module,exports){
var document = _dereq_("global/document")

var applyProperties = _dereq_("./apply-properties")

var isVNode = _dereq_("../vtree/is-vnode")
var isVText = _dereq_("../vtree/is-vtext")
var isWidget = _dereq_("../vtree/is-widget")

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}

},{"../vtree/is-vnode":51,"../vtree/is-vtext":52,"../vtree/is-widget":53,"./apply-properties":43,"global/document":18}],45:[function(_dereq_,module,exports){
// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

},{}],46:[function(_dereq_,module,exports){
var applyProperties = _dereq_("./apply-properties")

var isWidget = _dereq_("../vtree/is-widget")
var VPatch = _dereq_("../vtree/vpatch")

var render = _dereq_("./create-element")
var updateWidget = _dereq_("./update-widget")

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.propeties)
            return domNode
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = render(vText, renderOptions)

        if (parentNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    destroyWidget(domNode, leftVNode)

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    if (updateWidget(leftVNode, widget)) {
        return widget.update(leftVNode, domNode) || domNode
    }

    var parentNode = domNode.parentNode
    var newWidget = render(widget, renderOptions)

    if (parentNode) {
        parentNode.replaceChild(newWidget, domNode)
    }

    destroyWidget(domNode, leftVNode)

    return newWidget
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = render(vNode, renderOptions)

    if (parentNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    destroyWidget(domNode, leftVNode)

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, bIndex) {
    var children = []
    var childNodes = domNode.childNodes
    var len = childNodes.length
    var i

    for (i = 0; i < len; i++) {
        children.push(domNode.childNodes[i])
    }

    for (i = 0; i < len; i++) {
        var move = bIndex[i]
        if (move !== undefined) {
            var node = children[move]
            domNode.removeChild(node)
            domNode.insertBefore(node, childNodes[i])
        }
    }
}

},{"../vtree/is-widget":53,"../vtree/vpatch":56,"./apply-properties":43,"./create-element":44,"./update-widget":48}],47:[function(_dereq_,module,exports){
var document = _dereq_("global/document")
var isArray = _dereq_("x-is-array")

var domIndex = _dereq_("./dom-index")
var patchOp = _dereq_("./patch-op")

module.exports = patch

function patch(rootNode, patches) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument
    var renderOptions

    if (ownerDocument !== document) {
        renderOptions = {
            document: ownerDocument
        }
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}

},{"./dom-index":45,"./patch-op":46,"global/document":18,"x-is-array":41}],48:[function(_dereq_,module,exports){
var isWidget = _dereq_("../vtree/is-widget")

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("type" in a && "type" in b) {
            return a.type === b.type
        } else {
            return a.init === b.init
        }
    }

    return false
}

},{"../vtree/is-widget":53}],49:[function(_dereq_,module,exports){
var isArray = _dereq_("x-is-array")
var isObject = _dereq_("is-object")

var VPatch = _dereq_("./vpatch")
var isVNode = _dereq_("./is-vnode")
var isVText = _dereq_("./is-vtext")
var isWidget = _dereq_("./is-widget")

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        hooks(b, patch, index)
        return
    }

    var apply = patch[index]

    if (isWidget(b)) {
        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))

        if (!isWidget(a)) {
            destroyWidgets(a, patch, index)
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            destroyWidgets(a, patch, index)
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties, b.hooks)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                destroyWidgets(a, patch, index)
            }

            apply = diffChildren(a, b, patch, apply, index)
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            destroyWidgets(a, patch, index)
        }
    } else if (b == null) {
        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
        destroyWidgets(a, patch, index)
    }

    if (apply) {
        patch[index] = apply
    }
}

function diffProps(a, b, hooks) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            continue
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (hooks && aKey in hooks) {
            diff = diff || {}
            diff[aKey] = bValue
        } else {
            if (isObject(aValue) && isObject(bValue)) {
                if (getPrototype(bValue) !== getPrototype(aValue)) {
                    diff = diff || {}
                    diff[aKey] = bValue
                } else {
                    var objectDiff = diffProps(aValue, bValue)
                    if (objectDiff) {
                        diff = diff || {}
                        diff[aKey] = objectDiff
                    }
                }
            } else if (aValue !== bValue && bValue !== undefined) {
                diff = diff || {}
                diff[aKey] = bValue
            }
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var bChildren = reorder(aChildren, b.children)

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply, new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else if (!rightNode) {
            if (leftNode) {
                // Excess nodes in a need to be removed
                patch[index] = new VPatch(VPatch.REMOVE, leftNode, null)
                destroyWidgets(leftNode, patch, index)
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (bChildren.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, bChildren.moves))
    }

    return apply
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = new VPatch(VPatch.REMOVE, vNode, null)
        }
    } else if (isVNode(vNode) && vNode.hasWidgets) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    }
}

// Execute hooks when two nodes are identical
function hooks(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = new VPatch(VPatch.PROPS, vNode.hooks, vNode.hooks)
        }

        if (vNode.descendantHooks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                hooks(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    }
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {

    var bKeys = keyIndex(bChildren)

    if (!bKeys) {
        return bChildren
    }

    var aKeys = keyIndex(aChildren)

    if (!aKeys) {
        return bChildren
    }

    var bMatch = {}, aMatch = {}

    for (var key in bKeys) {
        bMatch[bKeys[key]] = aKeys[key]
    }

    for (var key in aKeys) {
        aMatch[aKeys[key]] = bKeys[key]
    }

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen
    var shuffle = []
    var freeIndex = 0
    var i = 0
    var moveIndex = 0
    var moves = shuffle.moves = {}

    while (freeIndex < len) {
        var move = aMatch[i]
        if (move !== undefined) {
            shuffle[i] = bChildren[move]
            moves[move] = moveIndex++
        } else if (i in aMatch) {
            shuffle[i] = undefined
        } else {
            while (bMatch[freeIndex] !== undefined) {
                freeIndex++
            }

            if (freeIndex < len) {
                moves[freeIndex] = moveIndex++
                shuffle[i] = bChildren[freeIndex]
                freeIndex++
            }
        }
        i++
    }

    return shuffle
}

function keyIndex(children) {
    var i, keys

    for (i = 0; i < children.length; i++) {
        var child = children[i]

        if (child.key !== undefined) {
            keys = keys || {}
            keys[child.key] = i
        }
    }

    return keys
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}

},{"./is-vnode":51,"./is-vtext":52,"./is-widget":53,"./vpatch":56,"is-object":40,"x-is-array":41}],50:[function(_dereq_,module,exports){
module.exports = isHook

function isHook(hook) {
    return hook && typeof hook.hook === "function" &&
        !hook.hasOwnProperty("hook")
}

},{}],51:[function(_dereq_,module,exports){
var version = _dereq_("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    if (!x) {
        return false;
    }

    return x.type === "VirtualNode" && x.version === version
}

},{"./version":54}],52:[function(_dereq_,module,exports){
var version = _dereq_("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    if (!x) {
        return false;
    }

    return x.type === "VirtualText" && x.version === version
}

},{"./version":54}],53:[function(_dereq_,module,exports){
module.exports = isWidget

function isWidget(w) {
    return w && typeof w.init === "function" && typeof w.update === "function"
}

},{}],54:[function(_dereq_,module,exports){
module.exports = "1"

},{}],55:[function(_dereq_,module,exports){
var version = _dereq_("./version")
var isVNode = _dereq_("./is-vnode")
var isWidget = _dereq_("./is-widget")
var isVHook = _dereq_("./is-vhook")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property)) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"

},{"./is-vhook":50,"./is-vnode":51,"./is-widget":53,"./version":54}],56:[function(_dereq_,module,exports){
var version = _dereq_("./version")

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version.split(".")
VirtualPatch.prototype.type = "VirtualPatch"

},{"./version":54}],57:[function(_dereq_,module,exports){
var version = _dereq_("./version")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"

},{"./version":54}],58:[function(_dereq_,module,exports){
module.exports = AttributeHook;

function AttributeHook(value) {
    if (!(this instanceof AttributeHook)) {
        return new AttributeHook(value);
    }

    this.value = value;
}

AttributeHook.prototype.hook = function (node, prop, prev) {
    if (prev && prev.value === this.value) {
        return;
    }

    node.setAttributeNS(null, prop, this.value)
}

},{}],59:[function(_dereq_,module,exports){
var DataSet = _dereq_("data-set")

module.exports = DataSetHook;

function DataSetHook(value) {
    if (!(this instanceof DataSetHook)) {
        return new DataSetHook(value);
    }

    this.value = value;
}

DataSetHook.prototype.hook = function (node, propertyName) {
    var ds = DataSet(node)
    var propName = propertyName.substr(5)

    ds[propName] = this.value;
};

},{"data-set":63}],60:[function(_dereq_,module,exports){
module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};

},{}],61:[function(_dereq_,module,exports){
var VNode = _dereq_("virtual-dom/vtree/vnode.js")
var VText = _dereq_("virtual-dom/vtree/vtext.js")
var isVNode = _dereq_("virtual-dom/vtree/is-vnode")
var isVText = _dereq_("virtual-dom/vtree/is-vtext")
var isWidget = _dereq_("virtual-dom/vtree/is-widget")
var isHook = _dereq_("virtual-dom/vtree/is-vhook")

var parseTag = _dereq_("./parse-tag.js")
var softSetHook = _dereq_("./hooks/soft-set-hook.js")
var dataSetHook = _dereq_("./hooks/data-set-hook.js")

module.exports = h

function h(tagName, properties, children) {
    var childNodes = []
    var tag, props, key, namespace

    if (!children && isChildren(properties)) {
        children = properties
        props = {}
    }

    props = props || properties || {}
    tag = parseTag(tagName, props)

    if (children) {
        if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
                addChild(children[i], childNodes)
            }
        } else {
            addChild(children, childNodes)
        }
    }

    // support keys
    if ("key" in props) {
        key = props.key
        props.key = undefined
    }

    // support namespace
    if ("namespace" in props) {
        namespace = props.namespace
        props.namespace = undefined
    }

    // fix cursor bug
    if (tag === "input" &&
        "value" in props &&
        props.value !== undefined &&
        !isHook(props.value)
    ) {
        props.value = softSetHook(props.value)
    }

    // add data-set support
    var keys = Object.keys(props)
    for (var j = 0; j < keys.length; j++) {
        var propName = keys[j]
        var value = props[propName]
        if (!isHook(value) && propName.substr(0, 5) === "data-") {
            props[propName] = dataSetHook(value)
        }
    }

    return new VNode(tag, props, childNodes, key, namespace)
}

function addChild(c, childNodes) {
    if (typeof c === "string") {
        childNodes.push(new VText(c))
    } else if (isChild(c)) {
        childNodes.push(c)
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x)
}

function isChildren(x) {
    return typeof x === "string" || Array.isArray(x)
}

},{"./hooks/data-set-hook.js":59,"./hooks/soft-set-hook.js":60,"./parse-tag.js":68,"virtual-dom/vtree/is-vhook":50,"virtual-dom/vtree/is-vnode":51,"virtual-dom/vtree/is-vtext":52,"virtual-dom/vtree/is-widget":53,"virtual-dom/vtree/vnode.js":55,"virtual-dom/vtree/vtext.js":57}],62:[function(_dereq_,module,exports){
module.exports=_dereq_(6)
},{}],63:[function(_dereq_,module,exports){
module.exports=_dereq_(7)
},{"./create-hash.js":62,"individual":64,"weakmap-shim/create-store":66}],64:[function(_dereq_,module,exports){
module.exports=_dereq_(10)
},{"global":65}],65:[function(_dereq_,module,exports){
module.exports=_dereq_(11)
},{}],66:[function(_dereq_,module,exports){
module.exports=_dereq_(8)
},{"./hidden-store.js":67}],67:[function(_dereq_,module,exports){
module.exports=_dereq_(9)
},{}],68:[function(_dereq_,module,exports){
var classIdSplit = /([\.#]?[a-zA-Z0-9_:-]+)/
var notClassId = /^\.|#/

module.exports = parseTag

function parseTag(tag, props) {
    if (!tag) {
        return "div"
    }

    var noId = !("id" in props)

    var tagParts = tag.split(classIdSplit)
    var tagName = null

    if (notClassId.test(tagParts[1])) {
        tagName = "div"
    }

    var classes, part, type, i
    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i]

        if (!part) {
            continue
        }

        type = part.charAt(0)

        if (!tagName) {
            tagName = part
        } else if (type === ".") {
            classes = classes || []
            classes.push(part.substring(1, part.length))
        } else if (type === "#" && noId) {
            props.id = part.substring(1, part.length)
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className)
        }

        props.className = classes.join(" ")
    }

    return tagName ? tagName.toLowerCase() : "div"
}

},{}],69:[function(_dereq_,module,exports){
var attributeHook = _dereq_("./hooks/attribute-hook.js")
var h = _dereq_("./index.js")

var BLACKLISTED_KEYS = {
    "style": true,
    "namespace": true,
    "key": true
}
var SVG_NAMESPACE = "http://www.w3.org/2000/svg"

module.exports = svg

function svg(tagName, properties, children) {
    if (!children && isChildren(properties)) {
        children = properties
        properties = {}
    }

    properties = properties || {}

    // set namespace for svg
    properties.namespace = SVG_NAMESPACE

    // for each key, if attribute & string, bool or number then
    // convert it into a setAttribute hook
    for (var key in properties) {
        if (!properties.hasOwnProperty(key)) {
            continue
        }

        if (BLACKLISTED_KEYS[key]) {
            continue
        }

        var value = properties[key]
        if (typeof value !== "string" &&
            typeof value !== "number" &&
            typeof value !== "boolean"
        ) {
            continue
        }

        properties[key] = attributeHook(value)
    }

    return h(tagName, properties, children)
}

function isChildren(x) {
    return typeof x === "string" || Array.isArray(x)
}

},{"./hooks/attribute-hook.js":58,"./index.js":61}],70:[function(_dereq_,module,exports){
module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}]},{},[1])
(1)
});