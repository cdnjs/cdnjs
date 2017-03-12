(function(global){

    function Rye (selector, context) {
        if (!(this instanceof Rye)){
            return new Rye(selector, context)
        }

        if (selector instanceof Rye){
            return selector
        }

        var util = Rye.require('Util')

        if (typeof selector === 'string') {
            this.selector = selector
            this.elements = this.qsa(context, selector)

        } else if (selector instanceof Array) {
            this.elements = util.unique(selector.filter(util.isElement))

        } else if (util.isNodeList(selector)) {
            this.elements = Array.prototype.slice.call(selector).filter(util.isElement)

        } else if (util.isElement(selector)) {
            this.elements = [selector]

        } else {
            this.elements = []
        }

        this._update()
    }

    Rye.version = '0.1.0'

    // Minimalist module system
    var modules = {}
    Rye.require = function (module) {
        return modules[module]
    }
    Rye.define = function (module, fn) {
        modules[module] = fn.call(Rye.prototype)
    }

    // Export global object
    global.Rye = Rye

})(window)

;Rye.define('Util', function(){

    var _slice = Array.prototype.slice
      , _forEach = Array.prototype.forEach
      , _toString = Object.prototype.toString

    var uid = {
            current: 0
          , next: function(){ return ++this.current }
        }

    function each (obj, fn, context) {
        if (!obj) {
            return
        }
        if (obj.forEach === _forEach) {
            return obj.forEach(fn, context)
        }
        if (obj.length === +obj.length) {
            for (var i = 0; i < obj.length; i++) {
                fn.call(context || obj, obj[i], i, obj)
            }
        } else {
            var keys = Object.keys(obj)
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i]
                fn.call(context || obj, obj[key], key, obj)
            }
        }
    }

    function extend (obj) {
        each(_slice.call(arguments, 1), function(source){
            each(source, function(value, key){
                obj[key] = value
            })
        })
        return obj
    }

    function inherits (child, parent) {
        extend(child, parent)
        function Ctor () {
            this.constructor = child
        }
        Ctor.prototype = parent.prototype
        child.prototype = new Ctor()
        child.__super__ = parent.prototype
        return child
    }

    function isElement (element) {
        return element && (element.nodeType === 1 || element.nodeType === 9)
    }
    
    function isNodeList (obj) {
        return obj && is(['nodelist', 'htmlcollection', 'htmlformcontrolscollection'], obj)
    }

    function unique (array) {
        return array.filter(function(item, idx){
            return array.indexOf(item) == idx
        })
    }

    function pluck (array, property) {
        return array.map(function(item){
            return item[property]
        })
    }

    function put (array, property, value) {
        return array.forEach(function(item, i){
            array[i][property] = value
        })
    }

    function prefix (key, obj) {
        var result
          , upcased = key[0].toUpperCase() + key.substring(1)
          , prefixes = ['moz', 'webkit', 'ms', 'o']

        obj = obj || window

        if (result = obj[key]){
            return result
        }

        // No pretty array methods here :(
        // http://jsperf.com/everywhile
        while(prefix = prefixes.shift()){
            if (result = obj[prefix + upcased]){
                break;
            }
        }
        return result
    }

    function _apply (context, fn, applyArgs, cutoff, fromLeft) {
        if (typeof fn === 'string') {
            fn = context[fn]
        }
        return function () {
            var args = _slice.call(arguments, 0, cutoff || Infinity)
            
            if (applyArgs) {
                args = fromLeft ? applyArgs.concat(args) : args.concat(applyArgs)
            }
            if (typeof context === 'number') {
                context = args[context]
            }

            return fn.apply(context || this, args)
        }
    }

    function applyRight (context, fn, applyArgs, cutoff) {
        return _apply(context, fn, applyArgs, cutoff)
    }

    function applyLeft (context, fn, applyArgs, cutoff) {
        return _apply(context, fn, applyArgs, cutoff, true)
    }

    function curry (fn) {
        return applyLeft(this, fn, _slice.call(arguments, 1))
    }

    function getUid (element) {
        return element.rye_id || (element.rye_id = uid.next())
    }

    function type (obj) {
        var ref = _toString.call(obj).match(/\s(\w+)\]$/)
        return ref && ref[1].toLowerCase()
    }

    function is (kind, obj) {
        return kind.indexOf(type(obj)) >= 0
    }

    return {
        each        : each
      , extend      : extend
      , inherits    : inherits
      , isElement   : isElement
      , isNodeList  : isNodeList
      , unique      : unique
      , pluck       : pluck
      , put         : put
      , prefix      : prefix
      , applyRight  : applyRight
      , applyLeft   : applyLeft
      , curry       : curry
      , getUid      : getUid
      , type        : type
      , is          : is
    }

})

;Rye.define('Data', function(){

    var util = Rye.require('Util')
      , data = {}

    function set (element, key, value) {
        var id = util.getUid(element)
          , obj = data[id] || (data[id] = {})
        obj[key] = value
    }

    function get (element, key) {
        var obj = data[util.getUid(element)]
        if (key == null) {
            return obj
        }
        return obj && obj[key]
    }

    this.data = function (key, value) {
        if (value !== undefined) {
            this.each(function(element){
                set(element, key, value)
            })
            return this
        }

        if (this.elements.length === 1) {
            return get(this.elements[0], key)
        } else {
            return this.elements.map(function(element){
                return get(element, key)
            })
        }
    }


    return {
        set   : set
      , get   : get
    }
})
;Rye.define('Query', function(){

    var util = Rye.require('Util')
      , _slice = Array.prototype.slice
      , selectorRE = /^([.#]?)([\w\-]+)$/
      , selectorType = {
            '.': 'getElementsByClassName'
          , '#': 'getElementById'
          , '' : 'getElementsByTagName'
          , '_': 'querySelectorAll'
        }
      , dummyDiv = document.createElement('div')

    function matches(element, selector) {
        var matchesSelector, match
        if (!element || !util.isElement(element) || !selector) {
            return false
        }

        if (selector.nodeType) {
            return element === selector
        }

        if (selector instanceof Rye) {
            return selector.elements.some(function(selector){
                return matches(element, selector)
            })
        }

        if (element === document) {
            return false
        }

        matchesSelector = util.prefix('matchesSelector', dummyDiv)
        if (matchesSelector) {
            return matchesSelector.call(element, selector)
        }

        // fall back to performing a selector:
        if (!element.parentNode) {
            dummyDiv.appendChild(element)
        }
        match = qsa(element.parentNode, selector).indexOf(element) >= 0
        if (element.parentNode === dummyDiv) {
            dummyDiv.removeChild(element)
        }
        return match
    }

    function qsa (element, selector) {
        var method
        
        element = element || document

        // http://jsperf.com/getelementbyid-vs-queryselector/11
        if (!selector.match(selectorRE) || (RegExp.$1 === '#' && element !== document)) {
            method = selectorType._
        } else {
            method = selectorType[RegExp.$1]
            selector = RegExp.$2
        }

        var result = element[method](selector)

        if (util.isNodeList(result)){
            return _slice.call(result)
        }

        if (util.isElement(result)){
            return [result]
        }

        return []
    }

    // Walks the DOM tree using `method`, returns
    // when an element node is found
    function getClosestNode (element, method, selector) {
        do {
            element = element[method]
        } while (element && ((selector && !matches(element, selector)) || !util.isElement(element)))
        return element
    }

    // Creates a new Rye instance applying a filter if necessary
    function _create (elements, selector) {
        return selector == null ? new Rye(elements) : new Rye(elements).filter(selector)
    }

    this.qsa = qsa

    this.find = function (selector) {
        var elements
        if (this.length === 1) {
            elements = qsa(this.elements[0], selector)
        } else {
            elements = this.elements.reduce(function(elements, element){
                return elements.concat(qsa(element, selector))
            }, [])
        }
        return _create(elements)
    }

    this.filter = function (selector, inverse) {
        if (typeof selector === 'function') {
            var fn = selector
            return _create(this.elements.filter(function(element, index){
                return fn.call(element, element, index) != (inverse || false)
            }))
        }
        if (selector && selector[0] === '!') {
            selector = selector.substr(1)
            inverse = true
        }
        return _create(this.elements.filter(function(element){
            return matches(element, selector) != (inverse || false)
        }))
    }

    this.contains = function (selector) {
        var matches
        return _create(this.elements.reduce(function(elements, element){
            matches = qsa(element, selector)
            return elements.concat(matches.length ? element : null)
        }, []))
    }

    this.is = function (selector) {
        return this.length > 0 && this.filter(selector).length > 0
    }

    this.not = function (selector) {
        return this.filter(selector, true)
    }

    this.index = function (selector) {
        if (selector == null) {
            return this.parent().children().indexOf(this.elements[0])
        }
        return this.indexOf(new Rye(selector).elements[0])
    }

    this.add = function (selector, context) {
        var elements = selector
        if (typeof selector === 'string') {
            elements = new Rye(selector, context).elements
        }
        return this.concat(elements)
    }

    // Extract a list with the provided property for each value.
    // This works like underscore's pluck, with the added
    // getClosestNode() method to avoid picking up non-html nodes.
    this.pluckNode = function (property) {
        return this.map(function(element){
            return getClosestNode(element, property)
        })
    }

    this.next = function () {
        return _create(this.pluckNode('nextSibling'))
    }

    this.prev = function () {
        return _create(this.pluckNode('previousSibling'))
    }

    this.first = function () {
        return _create(this.get(0))
    }

    this.last = function () {
        return _create(this.get(-1))
    }

    this.siblings = function (selector) {
        var siblings = []
        this.each(function(element){
            _slice.call(element.parentNode.childNodes).forEach(function(child){
                if (util.isElement(child) && child !== element){
                    siblings.push(child)
                }
            })
        })
        return _create(siblings, selector)
    }

    this.parent = function (selector) {
        return _create(this.pluck('parentNode'), selector)
    }

    // borrow from zepto
    this.parents = function (selector) {
        var ancestors = []
          , elements = this.elements
          , fn = function (element) {
                if ((element = element.parentNode) && element !== document && ancestors.indexOf(element) < 0) {
                    ancestors.push(element)
                    return element
                }
            }

        while (elements.length > 0 && elements[0] !== undefined) {
            elements = elements.map(fn)
        }
        return _create(ancestors, selector)
    }

    this.closest = function (selector) {
        return this.map(function(element){
            if (matches(element, selector)) {
                return element
            }
            return getClosestNode(element, 'parentNode', selector)
        })
    }

    this.children = function (selector) {
        return _create(this.elements.reduce(function(elements, element){
            var childrens = _slice.call(element.children)
            return elements.concat(childrens)
        }, []), selector)
    }


    return {
        matches        : matches
      , qsa            : qsa
      , getClosestNode : getClosestNode
    }

})

;Rye.define('Collection', function(){

    var util = Rye.require('Util')
      , _slice  = Array.prototype.slice
      , _concat = Array.prototype.concat

    this.get = function (index) {
        if (index == null) {
            return this.elements.slice()
        }
        return this.elements[index < 0 ? this.elements.length + index : index]
    }

    this.eq = function (index) {
        // We have to explicitly null the selection since .get()
        // returns the whole collection when called without arguments.
        if (index == null) {
            return new Rye()
        }
        return new Rye(this.get(index))
    }

    // Methods that return a usable value
    ;['forEach', 'reduce', 'reduceRight', 'indexOf'].forEach(function(method){
        this[method] = function (a, b, c, d) {
            return this.elements[method](a, b, c, d)
        }
    }.bind(this))

    // Methods that return a list are turned into a Rye instance
    ;['map', 'sort'].forEach(function(method){
        this[method] = function (a, b, c, d) {
            return new Rye(this.elements[method](a, b, c, d))
        }
    }.bind(this))

    this.each = function (fn) {
        this.elements.forEach(fn)
        return this
    }

    this.iterate = function(method, context){
        return function(a, b, c, d){
            return this.each(function(element){
                method.call(context, element, a, b, c, d)
            })
        }
    }

    this.push = function (item) {
        if (util.isElement(item)){
            this.elements.push(item)
            this._update()
            return this.length - 1
        } else {
            return -1
        }
    }

    this.slice = function (start, end) {
        return new Rye(_slice.call(this.elements, start, end))
    }

    // Concatenate two elements lists, do .unique() clean-up
    this.concat = function () {
        var args = _slice.call(arguments).map(function(arr){
            return arr instanceof Rye ? arr.elements : arr
        })
        return new Rye(_concat.apply(this.elements, args))
    }

    this.pluck = function (property) {
        return util.pluck(this.elements, property)
    }

    this.put = function (property, value) {
        util.put(this.elements, property, value)
        return this
    }

    this._update = function () {
        this.length = this.elements.length
    }

})

;Rye.define('Manipulation', function(){

    var util = Rye.require('Util')
      , query = Rye.require('Query')
      , _slice = Array.prototype.slice

    function getValue(element) {
        if (element.multiple) {
            return new Rye(element).find('option').filter(function(option) {
                return option.selected && !option.disabled
            }).pluck('value')
        }
        return element.value
    }

    function getAttribute(element, name) {
        if (name === 'value' && element.nodeName == 'INPUT') {
            return getValue(element)
        }
        return element.getAttribute(name)
    }

    function append (element, html) {
        if (typeof html === 'string') {
            element.insertAdjacentHTML('beforeend', html)
        } else {
            element.appendChild(html)
        }
    }

    function prepend (element, html) {
        var first
        if (typeof html === 'string') {
            element.insertAdjacentHTML('afterbegin', html)
        } else if (first = element.childNodes[0]){
            element.insertBefore(html, first)
        } else {
            element.appendChild(html)
        }
    }

    function after (element, html) {
        var next
        if (typeof html === 'string') {
            element.insertAdjacentHTML('afterend', html)
        } else if (next = query.getClosestNode(element, 'nextSibling')) {
            element.parentNode.insertBefore(html, next)
        } else {
            element.parentNode.appendChild(html)
        }
    }

    function before (element, html) {
        if (typeof html === 'string') {
            element.insertAdjacentHTML('beforebegin', html)
        } else {
            element.parentNode.insertBefore(html, element)
        }
    }

    function proxyExport(fn, method) {
        // This function coerces the input into either a string or an array of elements,
        // then passes it on to the appropriate method, iterating if necessary.
        this[method] = function (obj) {

            if (typeof obj !== 'string'){
                if (obj instanceof Rye) {
                    obj = obj.elements
                } else if (util.isNodeList(obj)) {
                    obj = _slice.call(obj)
                }
                // Also support arrays [el1, el2, ...]
                if (Array.isArray(obj)) {
                    if (/prepend|before/.test(method)){
                        obj = _slice.call(obj, 0).reverse()
                    }
                    return obj.forEach(this[method].bind(this))
                }
            }

            if (this.length === 1) {
                fn(this.elements[0], obj)
            } else {
                this.each(function(element, i){
                    var node = i > 0 ? obj.cloneNode(true) : obj
                    fn(element, node)
                })
            }
            return this
        }
    }

    // Patch methods, add to prototype
    util.each({
        append  : append
      , prepend : prepend
      , after   : after
      , before  : before
    }, proxyExport.bind(this))


    this.text = function (text) {
        if (text == null) {
            return this.elements[0] && this.elements[0].textContent
        }
        return this.each(function(element){
            element.textContent = text
        })
    }

    this.html = function (html) {
        if (html == null) {
            return this.elements[0] && this.elements[0].innerHTML
        }
        return this.each(function(element){
            element.innerHTML = html
        })
    }

    this.empty = function () {
        return this.put('innerHTML', '')
    }

    this.clone = function () {
        return this.map(function(element){
            return element.cloneNode(true)
        })
    }

    this.remove = function () {
        return this.each(function(element){
            if (element.parentNode) {
                element.parentNode.removeChild(element)
            }
        })
    }

    this.val = function (value) {
        if (value == null) {
            return this.elements[0] && getValue(this.elements[0])
        }
        return this.each(function(element){
            element.value = value
        })
    }

    this.attr = function (name, value) {
        if (typeof name === 'object'){
            return this.each(function(element){
                util.each(name, function(value, key){
                    element.setAttribute(key, value)
                })
            })
        }
        return typeof value === 'undefined'
          ? this.elements[0] && getAttribute(this.elements[0], name)
          : this.each(function(element){
                element.setAttribute(name, value)
            })
    }

    this.prop = function (name, value) {
        if (typeof name === 'object'){
            return this.each(function(element){
                util.each(name, function(value, key){
                    element[key] = value
                })
            })
        }
        return typeof value === 'undefined'
          ? this.elements[0] && this.elements[0][name]
          : this.put(name, value)
    }

    Rye.create = function (html) {
        var temp = document.createElement('div')
          , children

        temp.innerHTML = html

        children = _slice.call(temp.childNodes)
        children.forEach(function(node, i){
            temp.removeChild(node)
        })

        return new Rye(children)
    }

    return {
        getValue     : getValue
      , getAttribute : getAttribute
      , append       : append
      , prepend      : prepend
      , after        : after
      , before       : before
    }

})
;Rye.define('Events', function(){

    var util = Rye.require('Util')
      , query = Rye.require('Query')
      , _slice = Array.prototype.slice

    // General-purpose event emitter
    // -----------------------------

    function EventEmitter () {
        this.events = {}
        this.context = null
    }

    // Adds a handler to the events list
    EventEmitter.prototype.addListener = function (event, handler) {
        var handlers = this.events[event] || (this.events[event] = [])
        handlers.push(handler)
        return this
    }

    // Add a handler that can only get called once
    EventEmitter.prototype.once = function (event, handler) {
        var self = this
        function suicide () {
            handler.apply(this, arguments)
            self.removeListener(event, suicide)
        }
        return this.addListener(event, suicide)
    }

    // Removes a handler from the events list
    EventEmitter.prototype.removeListener = function (event, handler) {
        var self = this
          , handlers = this.events[event]
        if (event === '*') {
            if (!handler) {
                this.events = {}
            } else {
                util.each(this.events, function(handlers, event){
                    self.removeListener(event, handler)
                })
            }
        } else if (handler && handlers) {
            handlers.splice(handlers.indexOf(handler), 1)
            if (handlers.length === 0) {
                delete this.events[event]
            }
        } else {
            delete this.events[event]
        }
        return this
    }

    // Calls all handlers that match the event type
    EventEmitter.prototype.emit = function (event) {
        var handlers = this.events[event]
          , args = _slice.call(arguments, 1)
          , context = this.context || this

        if (handlers) {
            util.each(handlers, function(fn) {
                fn.apply(context, args)
            })
        }
        return this
    }

    EventEmitter.prototype.proxy = function (event) {
        return util.applyLeft(this, this.emit, [event])
    }

    // Utility methods
    // -----------------------------

    var emitters = {}

    function getEmitter (element) {
        var id = util.getUid(element)
        return emitters[id] || (emitters[id] = new DOMEventEmitter(element))
    }

    function getType (event) {
        var index = event.indexOf(' ')
        return index > 0 ? event.substr(0, index) : event
    }

    function getSelector (event) {
        var index = event.indexOf(' ')
        return index > 0 ? event.substr(index) : ''
    }

    function createEvent (type, properties) {
        if (typeof type != 'string') {
            type = type.type
        }
        var isMouse = ['click', 'mousedown', 'mouseup', 'mousemove'].indexOf(type) != -1
          , event = document.createEvent(isMouse ? 'MouseEvent' : 'Event')
        if (properties) {
            util.extend(event, properties)
        }
        event.initEvent(type, true, true)
        return event
    }

    // DOM event emitter
    // -----------------------------

    /*
        Creates one event emitter per element, proxies DOM events to it. This way
        we can keep track of the functions so that they can be removed from the
        elements by reference when you call .removeListener() by event name.   
    */

    function DOMEventEmitter (element) {
        EventEmitter.call(this)
        this.element = element
        this.proxied = {}
    }

    util.inherits(DOMEventEmitter, EventEmitter)

    DOMEventEmitter.prototype._proxy = function (event) {
        return function (DOMEvent) {
            var selector = getSelector(event)
              , context = this.element
            // delegate behavior
            if (selector) {
                context = DOMEvent.target
                while (context && !query.matches(context, selector)) {
                    context = context !== this.element && context.parentNode
                }
                if (!context || context == this.element) {
                    return
                }
            }
            this.context = context
            this.emit(event, DOMEvent, this.element)
        }.bind(this)
    }

    DOMEventEmitter.prototype.proxy = function (event) {
        return this.proxied[event] || (this.proxied[event] = this._proxy(event))
    }

    DOMEventEmitter.prototype.addListener = function (event, handler) {
        EventEmitter.prototype.addListener.call(this, event, handler)
        if (!this.proxied[event]) {
            this.element.addEventListener(getType(event), this.proxy(event), false)
        }
        return this
    }

    DOMEventEmitter.prototype.removeListener = function (event, handler) {
        if (event.indexOf('*') >= 0) {
            var self = this
              , re = new RegExp('^' + event.replace('*', '\\b'))
            // *      : remove all events
            // type * : remove delegate events
            // type*  : remove delegate and undelegate
            util.each(this.events, function(handlers, event){
                if (re.test(event)) {
                    self.removeListener(event, handler)
                }
            })
        } else {
            var proxy = this.proxied[event]
            EventEmitter.prototype.removeListener.call(this, event, handler)
            if (!this.events[event] && proxy) {
                this.element.removeEventListener(getType(event), proxy, false)
                delete this.proxied[event]
            }
        }
        return this
    }

    function acceptMultipleEvents (method) {
        var _method = DOMEventEmitter.prototype[method]
        DOMEventEmitter.prototype[method] = function (event, handler) {
            var self = this
            if (typeof event !== 'string') {
                util.each(event, function(handler, event){
                    _method.call(self, event, handler)
                })
            } else {
                _method.call(self, event, handler)
            }
            return self
        }
    }

    ;['addListener', 'once', 'removeListener'].forEach(acceptMultipleEvents)

    DOMEventEmitter.prototype.destroy = function () {
        return this.removeListener('*')
    }

    DOMEventEmitter.prototype.trigger = function (event, data) {
        if (!(event instanceof window.Event)) {
            event = createEvent(event)
        }
        event.data = data
        this.element.dispatchEvent(event)
        return this
    }

    // Exported methods
    // -----------------------------
    
    var exports = {}

    function emitterProxy (method, element, event, handler) {
        getEmitter(element)[method](event, handler)
    }

    ;['addListener', 'removeListener', 'once', 'trigger'].forEach(function(method){
        // Create a function proxy for the method
        var fn = util.curry(emitterProxy, method)
        // Exports module and rye methods
        exports[method] = fn
        this[method] = this.iterate(fn)
    }.bind(this))

    // Aliases
    // -----------------------------
    
    ;[EventEmitter.prototype, DOMEventEmitter.prototype, this].forEach(function(obj){
        obj.on = obj.addListener
    })

    // Global event bus / pub-sub
    // -----------------------------

    var EE = new EventEmitter

    Rye.subscribe   = EE.addListener.bind(EE)
    Rye.unsubscribe = EE.removeListener.bind(EE)
    Rye.publish     = EE.emit.bind(EE)

    
    return {
        EventEmitter    : EventEmitter
      , DOMEventEmitter : DOMEventEmitter
      , getEmitter      : getEmitter
      , createEvent     : createEvent
      , addListener     : exports.addListener
      , once            : exports.once
      , removeListener  : exports.removeListener
      , trigger         : exports.trigger
    }
})

;Rye.define('Style', function(){

    var util = Rye.require('Util')
      , data = Rye.require('Data')
      , _cssNumber = 'fill-opacity font-weight line-height opacity orphans widows z-index zoom'.split(' ')

    function getCSS (element, property) {
        return element.style.getPropertyValue(property)
            || window.getComputedStyle(element, null).getPropertyValue(property)
    }

    function setCSS (element, property, value) {
        // If a number was passed in, add 'px' to the (except for certain CSS properties)
        if (typeof value == 'number' && _cssNumber.indexOf(property) === -1) {
            value += 'px'
        }
        var action = (value === null || value === '') ? 'remove' : 'set'
        element.style[action + 'Property'](property, '' + value)
        return element
    }

    function hasClass (element, name) {
        name = name.trim()
        return element.classList ? 
               element.classList.contains(name)
             : (' ' + element.className + ' ').indexOf(' ' + name + ' ') !== -1
    }

    function addClass (element, names) {
        if (element.classList) {
            names.replace(/\S+/g, function(name){ element.classList.add(name) })
        } else {
            var classes = ' ' + element.className + ' ', name
            names = names.trim().split(/\s+/)
            while (name = names.shift()) {
                if (classes.indexOf(' ' + name + ' ') === -1) { 
                    classes += name + ' '
                }
            }
            element.className = classes.trim()
        }
        return element
    }

    function removeClass (element, names) {
        if (names === '*') {
            element.className = ''
        } else {
            if (names instanceof RegExp) {
                names = [names]
            } else if (element.classList && names.indexOf('*') === -1) {
                names.replace(/\S+/g, function(name){ element.classList.remove(name) })
                return
            } else {
                names = names.trim().split(/\s+/)
            }

            var classes = ' ' + element.className + ' ', name
            while (name = names.shift()) {
                if (name.indexOf && name.indexOf('*') !== -1) {
                    name = new RegExp('\\s*\\b' + name.replace('*', '\\S*') + '\\b\\s*', 'g')
                }
                if (name instanceof RegExp) {
                    classes = classes.replace(name, ' ')
                } else {
                    while (classes.indexOf(' ' + name + ' ') !== -1) {
                        classes = classes.replace(' ' + name + ' ', ' ')
                    }
                }
            }
            element.className = classes.trim()
        }
        return element
    }


    this.show = this.iterate(function(element){
        setCSS(element, 'display', data.get(element, '_display') || 'block')
    })

    this.hide = this.iterate(function(element){
        var _display = getCSS(element, 'display')
        if (_display !== 'none') {
            data.set(element, '_display', _display)
        }
        setCSS(element, 'display', 'none')
    })

    this.css = function (property, value) {
        if (value == null) {
            if (typeof property == 'string') {
                return this.elements[0] && getCSS(this.elements[0], property)
            }

            return this.each(function(element){
                util.each(property, function(value, key){
                    setCSS(element, key, value)
                })
            })
        }
        return this.each(function(element){
            setCSS(element, property, value)
        })
    }

    this.hasClass = function (name) {
        var result = false
        this.each(function(element){
            result = result || hasClass(element, name)
        })
        return !!result
    }

    this.addClass = this.iterate(addClass)

    this.removeClass = this.iterate(removeClass)

    this.toggleClass = this.iterate(function(element, name, when){
        if (when == null) {
            when = !hasClass(element, name)
        }
        (when ? addClass : removeClass)(element, name)
    })


    return {
        getCSS      : getCSS
      , setCSS      : setCSS
      , hasClass    : hasClass
      , addClass    : addClass
      , removeClass : removeClass
    }
})

;Rye.define('TouchEvents', function(){

    var util = Rye.require('Util')
      , events = Rye.require('Events')
      , touch = {}

    // checks if it needed
    function parentIfText (node) {
        return 'tagName' in node ? node : node.parentNode
    }

    function Gesture(props) {
        util.extend(this, props)
        Gesture.all.push(this)
    }
    Gesture.all = []
    Gesture.cancelAll = function () {
        Gesture.all.forEach(function(instance){
            instance.cancel()
        })
        touch = {}
    }
    Gesture.prototype.schedule = function () {
        this.timeout = setTimeout(this._trigger.bind(this), this.delay)
    }
    Gesture.prototype._trigger = function () {
        this.timeout = null
        this.trigger()
    }
    Gesture.prototype.cancel = function () {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
        this.timeout = null
    }

    if (events && ('ontouchstart' in window || window.mocha)) {

        var tap = new Gesture({
                delay: 0
              , trigger: function () {
                    // cancelTouch cancels processing of single vs double taps for faster 'tap' response
                    var event = events.createEvent('tap')
                    event.cancelTouch = Gesture.cancelAll
                    events.trigger(touch.element, event)

                    // trigger double tap immediately
                    if (touch.isDoubleTap) {
                        events.trigger(touch.element, 'doubletap')
                        touch = {}

                    // trigger single tap after (x)ms of inactivity
                    } else {
                        singleTap.schedule()
                    }
                }
            })
          , singleTap = new Gesture({
                delay: 250
              , trigger: function () {
                    events.trigger(touch.element, 'singletap')
                    touch = {}
                }
            })
          , longTap = new Gesture({
                delay: 750
              , trigger: function () {
                    if (touch.last) {
                        events.trigger(touch.element, 'longtap')
                        touch = {}
                    }
                }
            })
          , swipe = new Gesture({
                delay: 0
              , trigger: function () {
                    events.trigger(touch.element, 'swipe')
                    events.trigger(touch.element, 'swipe' + this.direction())
                    touch = {}
                }
              , direction: function () {
                    if (Math.abs(touch.x1 - touch.x2) >= Math.abs(touch.y1 - touch.y2)) {
                        return touch.x1 - touch.x2 > 0 ? 'left' : 'right'
                    }
                    return touch.y1 - touch.y2 > 0 ? 'up' : 'down'
                }
            })

        events.addListener(document.body, 'touchstart', function (event) {
            var now = Date.now()
            singleTap.cancel()
            touch.element = parentIfText(event.touches[0].target)
            touch.x1 = event.touches[0].pageX
            touch.y1 = event.touches[0].pageY
            if (touch.last && (now - touch.last) <= 250) {
                touch.isDoubleTap = true
            }
            touch.last = now
            longTap.schedule()
        })

        events.addListener(document.body, 'touchmove', function (event) {
            longTap.cancel()
            touch.x2 = event.touches[0].pageX
            touch.y2 = event.touches[0].pageY
        })

        events.addListener(document.body, 'touchend', function () {
            longTap.cancel()

            // swipe
            if (Math.abs(touch.x1 - touch.x2) > 30 || Math.abs(touch.y1 - touch.y2) > 30) {
                swipe.schedule()
            // normal tap
            } else if ('last' in touch) {
                tap.schedule()
            }
        })

        events.addListener(document.body, 'touchcancel', Gesture.cancelAll)
        events.addListener(window, 'scroll', Gesture.cancelAll)
    }
})

;Rye.define('Request', function(){

    var util = Rye.require('Util')
      , manipulation = Rye.require('Manipulation')
      , noop = function(){}
      , escape = encodeURIComponent
      , accepts = {
            types  : ['arraybuffer', 'blob', 'document', 'json', 'text']
          , json   : 'application/json'
          , xml    : 'application/xml, text/xml'
          , html   : 'text/html, application/xhtml+xml'
          , text   : 'text/plain'
        }
      , defaults = {
            method       : 'GET'
          , url          : window.location.toString()
          , async        : true
          , accepts      : accepts
          , callback     : noop
          , timeout      : 0
       // , headers      : {}
       // , contentType  : null
       // , data         : null
       // , responseType : null
       // , headers      : null
        }

    function serialize (obj) {
        var params = []
        ;(function fn (obj, scope) {
            util.each(obj, function(value, key){
                value = obj[key]
                if (scope) {
                    key = scope + '[' + (Array.isArray(obj) ? '' : key) + ']'
                }

                if (util.is(['array', 'object'], value)) {
                    fn(value, key)
                } else {
                    params.push(escape(key) + '=' + escape(value))
                }
            })
        })(obj)
        return params.join('&').replace(/%20/g, '+')
    }

    function appendQuery (url, query) {
        return (url + '&' + query).replace(/[&?]+/, '?')
    }

    function parseData (options) {
        if (options.data && (typeof options.data !== 'string')) {
            options.data = serialize(options.data)
        }
        if (options.data && options.method === 'GET') {
            options.url = appendQuery(options.url, options.data)
        }
    }

    function parseMime (mime) {
        return mime && (mime.split('/')[1] || mime)
    }

    function parseJSON (xhr) {
        var data = xhr.response
        // error of responseType: json
        if (data === null) {
            return new Error('Parser Error')
        }
        if (typeof data !== 'object') {
            try {
                data = JSON.parse(xhr.responseText)
            } catch (err) {
                return err
            }
        }
        return data
    }

    function parseXML (xhr) {
        var data = xhr.responseXML
        // parse xml to IE 9
        if (data.xml && window.DOMParser) {
            try {
                var parser = new window.DOMParser()
                data = parser.parseFromString(data.xml, 'text/xml')
            } catch (err) {
                return err
            }
        }
        return data            
    }

    function request (options, callback) {
        if (typeof options === 'string') {
            options = { url: options }
        }
        if (!callback) {
            callback = options.callback || noop
        }

        var settings = util.extend({}, defaults, options)
          , xhr = new window.XMLHttpRequest()
          , mime = settings.accepts[settings.responseType]
          , abortTimeout = null
          , headers = {}

        settings.method = settings.method.toUpperCase()
        parseData(settings)

        // sets request's accept and content type 
        if (mime) {
            headers['Accept'] = mime
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType(mime.split(',')[0])
            }
        }
        if (settings.contentType || ['POST', 'PUT'].indexOf(settings.method) >= 0) {
            headers['Content-Type'] =  settings.contentType || 'application/x-www-form-urlencoded'
        }
        util.extend(headers, settings.headers || {})

        xhr.onreadystatechange = function(){
            var err, data
            if (xhr.readyState != 4 || !xhr.status) {
                return
            }
            xhr.onreadystatechange = noop
            clearTimeout(abortTimeout)

            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                xhr.type = settings.responseType || xhr.responseType || parseMime(xhr.getResponseHeader('content-type'))
                
                switch (xhr.type) {
                    case 'json':
                        data = parseJSON(xhr)
                        break
                    case 'xml':
                        data = parseXML(xhr)
                        break
                    default:
                        data = xhr.responseText
                }

                if (data instanceof Error) {
                    err = data, data = undefined
                }

            } else {
                err = new Error('Request failed')
            }
            callback.call(xhr, err, data, xhr)
        }

        xhr.ontimeout = function(){
            callback.call(xhr, new Error('Timeout'), null, xhr)
        }

        xhr.open(settings.method, settings.url, settings.async)

        // implements fallback to request's abort by timeout
        if (!('timeout' in xhr) && settings.timeout > 0) {
            abortTimeout = setTimeout(function(){
                xhr.onreadystatechange = noop
                xhr.abort()
                xhr.ontimeout()
            }, settings.timeout)
        }

        // exports settings to xhr and sets headers
        util.each(settings, function(value, key) {
            if (key !== 'responseType' || accepts.types.indexOf(value) >= 0) {
                try { xhr[key] = value } catch (e) {}
            }
        })
        util.each(headers, function(value, name) {
            xhr.setRequestHeader(name, value)
        })

        xhr.send(settings.data)
        return xhr
    }

    function requestProxy (method, options, callback) {
        if (typeof options === 'string') {
            options = { url: options }
        }
        options.method = method
        return request(options, callback)
    }

    var hideTypes = 'fieldset submit reset button image radio checkbox'.split(' ')

    this.serialize = function () {
        var form = this.get(0)
          , fields = {}
        new Rye(form && form.elements).forEach(function(field){
            if (!field.disabled && (
                    field.checked
                 || (field.type && hideTypes.indexOf(field.type) < 0)
                )
            ) {
                fields[field.name] = manipulation.getValue(field)
            }
        })
        return serialize(fields)
    }

    // Exported methods
    // ----------------
    
    Rye.request = request
    Rye.get     = util.curry(requestProxy, 'GET')
    Rye.post    = util.curry(requestProxy, 'POST')

    // prevents to attach properties on request
    var exports = request.bind({})

    util.extend(exports, {
        serialize   : serialize
      , appendQuery : appendQuery
      , defaults    : defaults
      , get         : util.curry(requestProxy, 'GET')
      , post        : util.curry(requestProxy, 'POST')
      // https://github.com/mlbli/craft/blob/master/src/ajax.js#L77
    })

    return exports

})
