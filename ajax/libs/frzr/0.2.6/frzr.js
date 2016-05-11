(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){

var each = require(8)
var inherit = require(9)
var prefix = require(25)
var transition = require(27)

var Collection = require(3)
var Model = require(13)
var Observable = require(19)
var View = require(31)
var ViewCollection = require(33)

var frzr = {
  each: each,
  inherit: inherit,
  prefix: prefix,
  transition: transition,
  Collection: Collection,
  Model: Model,
  Observable: Observable,
  View: View,
  ViewCollection: ViewCollection
}

module.exports = frzr

global.frzr = frzr

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
module.exports = get

function get (id) {
  var self = this
  return self.lookup[id]
}
},{}],3:[function(require,module,exports){
var inherit = require(9)
var Observable = require(19)

module.exports = Collection

function Collection (items, options) {
  var self = this
  var isCollection = self instanceof Collection

  if (!isCollection) {
    return new Collection(items, options)
  }

  options && self.init(options)

  self.trigger('init')
  items && self.reset(items)
}

inherit(Collection, Observable)

var proto = Collection.prototype

proto.init = require(4)
proto.get = require(2)
proto.set = require(6)
proto.unset = require(7)
proto.reset = require(5)

Collection.extend = function (superOptions) {
  function ExtendedCollection (attrs, opts) {
    var self = this
    opts || (opts = {})
    var attribute

    for (attribute in superOptions) {
      if (attribute === 'init') {
        self.on('init', superOptions[attribute])
      } else if (typeof opts[attribute] === 'undefined') {
        opts[attribute] = superOptions[attribute]
      }
    }
    Collection.call(self, attrs, opts)
  }
  inherit(ExtendedCollection, Collection)

  return ExtendedCollection
}


},{}],4:[function(require,module,exports){
var each = require(8)

module.exports = init

function init (options) {
  var self = this
  if (options) {
    var attribute, value
    for (attribute in options) {
      value = options[attribute]
      if (attribute === 'index') {
        self.indexKeys = value.split(' ')
        each(self.indexKeys, function (key) {
          self[key + 'Lookup'] = {}
        })
      } else if (attribute === 'change') {
        self.on('change', value)
      } else if (attribute === 'move') {
        self.on('move', value)
      } else if (attribute === 'remove') {
        self.on('remove', value)
      } else {
        self[attribute] = value
      }
    }
  }
  self.models || (self.models = [])
  self.lookup || (self.lookup = {})
  self.index || (self.index = {})
}
},{}],5:[function(require,module,exports){
var each = require(8)
var Model = require(13)

module.exports = reset

function reset (items) {
  var self = this
  self.init()
  var _Model = self.model || Model
  var models = self.models
  var lookup = self.lookup
  var index = self.index

  var len = items.length
  var newModels = new Array(len)
  var newLookup = {}
  var newIndex = {}
  var idAttribute = self.idAttribute
  var modelIdAttribute
  var item, i
  var model, id
  var currentIndex

  var modelOptions = {
    init: function (model) {
      each(self.indexKeys || [], function (key) {
        model.on('change:' + key, function (model, value, oldValue) {
          var keyLookup = self[key + 'Lookup'][value]
          var oldKeyLookup = self[key + 'Lookup'][oldValue]

          if ((typeof oldValue !== 'undefined') && oldKeyLookup) {
            var index = oldKeyLookup.indexOf(model)
            ~index && oldKeyLookup.splice(index, 1)
          }
          if (typeof value !== 'undefined') {
            keyLookup || (keyLookup = self[key + 'Lookup'][value] = [])
            keyLookup.push(model)
          }
        })
      })

      self.trigger('add', model, self)
    },
    change: function (model) {
      self.trigger('change', model, self)
    },
    destroy: function (model) {
      self.trigger('remove', model, self)
    },
    collection: self
  }
  var ordered
  if (typeof idAttribute !== 'undefined') {
    modelOptions.idAttribute = idAttribute
    ordered = true
  }

  for (i = 0; i < len; i++) {
    item = items[i]

    id = ordered ? item[idAttribute] : i
    model = lookup[id]

    if (typeof model === 'undefined') {
      // create model
      model = new _Model(item, modelOptions)
      modelIdAttribute = model.idAttribute
      if (typeof modelIdAttribute !== 'undefined') {
        id = model.id
        if (typeof idAttribute !== 'undefined') {
          idAttribute = self.idAttribute = modelIdAttribute
        }
      } else {
        id = i
      }
      models.push(model)
    } else {
      // update model
      model.reset(item)

      id = (typeof model.id !== 'undefined') ? model.id : i
      currentIndex = index[id]
      if (i !== currentIndex) {
        self.trigger('move', model, i, currentIndex, self)
      }
    }
    newModels[i] = model
    newLookup[id] = model
    newIndex[id] = i
    delete lookup[id]
  }
  for (id in lookup) {
    // model removed
    model = lookup[id]
    model.destroy()
    delete lookup[id]
  }
  self.models = newModels
  self.lookup = newLookup
  self.index = newIndex
}
},{}],6:[function(require,module,exports){
var each = require(8)
var Model = require(13)

module.exports = set

function set (items) {
  var self = this
  self.init()
  var _Model = self.model || Model
  var models = self.models
  var lookup = self.lookup
  var index = self.index
  var len = items.length
  var idAttribute = self.idAttribute
  var modelIdAttribute
  var item, i
  var model, id, modelIndex

  var modelOptions = {
    init: function (model) {
      each(self.indexKeys || [], function (key) {
        model.on('change:' + key, function (model, value, oldValue) {
          var keyLookup = self[key + 'Lookup'][value]
          var oldKeyLookup = self[key + 'Lookup'][oldValue]

          if ((typeof oldValue !== 'undefined') && oldKeyLookup) {
            var index = oldKeyLookup.indexOf(model)
            ~index && oldKeyLookup.splice(index, 1)
          }
          if (typeof value !== 'undefined') {
            keyLookup || (keyLookup = self[key + 'Lookup'][value] = [])
            keyLookup.push(model)
          }
        })
      })

      self.trigger('add', model, self)
    },
    change: function (model) {
      self.trigger('change', model, self)
    },
    destroy: function (model) {
      self.trigger('remove', model, self)
    },
    move: function (model) {
      self.trigger('move', model, self)
    },
    collection: self
  }
  var ordered
  if (typeof idAttribute !== 'undefined') {
    modelOptions.idAttribute = idAttribute
    ordered = true
  }

  for (i = 0; i < len; i++) {
    item = items[i]

    id = ordered ? item[idAttribute] : i
    model = lookup[id]

    if (typeof model === 'undefined') {
      // create model
      model = new _Model(item, modelOptions)
      modelIdAttribute = model.idAttribute
      if (typeof modelIdAttribute !== 'undefined') {
        id = model.id
        if (typeof idAttribute !== 'undefined') {
          idAttribute = self.idAttribute = modelIdAttribute
        }
      } else {
        id = i
      }

      modelIndex = models.push(model) - 1

      lookup[id] = model
      index[id] = modelIndex
    } else {
      // update model
      model.reset(item)
    }
  }
}
},{}],7:[function(require,module,exports){
module.exports = function (id) {
  var self = this
  var model = self.lookup[id]

  if (typeof model !== 'undefined') {
    model.destroy()
    return model
  }
}


},{}],8:[function(require,module,exports){
'use strict'

module.exports = each

function each (array, iterator) {
  array = array || []

  var i, len

  for (i = 0, len = array.length; i < len; i++) {
    iterator(array[i], i, len)
  }
}
},{}],9:[function(require,module,exports){
module.exports = inherit

function inherit (target, superClass) {
  target.super = superClass

  target.prototype = Object.create(superClass.prototype, {
    constructor: {
      value: target,
      writable: true,
      configurable: true
    }
  })
}
},{}],10:[function(require,module,exports){
module.exports = changed

function changed (attribute) {
  var changedAttributes = this.changedAttributes || {}

  if (typeof attribute !== 'undefined') {
    return changedAttributes.hasOwnProperty(attribute)
  } else {
    var results = {}

    for (attribute in changedAttributes) {
      results[attribute] = true
    }
    return results
  }
}
},{}],11:[function(require,module,exports){
module.exports = destroy

function destroy () {
  var self = this

  self.trigger('destroy', self)
  self.reset({})
  self.off()
}
},{}],12:[function(require,module,exports){
module.exports = get

function get (attribute) {
  var currentAttributes = this.attributes || {}

  if (typeof attribute !== 'undefined') {
    return currentAttributes[attribute]
  } else {
    return currentAttributes
  }
}
},{}],13:[function(require,module,exports){
var inherit = require(9)
var Observable = require(19)

module.exports = Model

function Model (attributes, options) {
  var self = this
  var isModel = self instanceof Model

  if (!isModel) {
    return new Model(attributes, options)
  }

  if (options) {
    self.init(options)

    if (options.defaults) {
      attributes || (attributes = {})

      var attribute

      for (attribute in options.defaults) {
        attributes[attribute] = options.defaults[attribute]
      }
    }
  }

  self.trigger('init', self)
  attributes && self.set(attributes)
}

inherit(Model, Observable)

var proto = Model.prototype

proto.init = require(14)

proto.get = require(12)
proto.set = require(17)
proto.unset = require(18)
proto.reset = require(16)

proto.changed = require(10)
proto.previous = require(15)

proto.destroy = require(11)

Model.extend = function (superOptions) {
  function ExtendedModel (attrs, opts) {
    var self = this
    opts || (opts = {})
    var attribute

    for (attribute in superOptions) {
      if (attribute === 'init') {
        self.on('init', superOptions[attribute])
      } else if (typeof opts[attribute] === 'undefined') {
        opts[attribute] = superOptions[attribute]
      }
    }
    Model.call(self, attrs, opts)
  }
  inherit(ExtendedModel, Model)

  return ExtendedModel
}


},{}],14:[function(require,module,exports){
var cid = 1

module.exports = init

function init (options) {
  var self = this
  self.attributes || (self.attributes = {})
  self.changedAttributes || (self.changedAttributes = {})
  self.previousAttributes || (self.previousAttributes = {})

  self.idAttribute || (self.idAttribute = 'id')
  self.cid || (self.cid = cid++)

  var attribute, value

  if (options) {
    for (attribute in options) {
      value = options[attribute]
      if (attribute === 'init') {
        self.on('init', value)
      } else if (attribute === 'change') {
        self.on('change', value)
      } else if (attribute === 'destroy') {
        self.on('destroy', value)
      } else {
        self[attribute] = value
      }
    }
  }
}
},{}],15:[function(require,module,exports){
module.exports = previous

function previous (attribute) {
  var previousAttributes = this.previousAttributes || {}

  if (typeof attribute !== 'undefined') {
    return previousAttributes[attribute]
  } else {
    return previousAttributes
  }
}
},{}],16:[function(require,module,exports){
module.exports = reset

function reset (attributes) {
  var self = this
  self.init()

  if (self.idAttribute in attributes) {
    // set local id key if defined
    self.id = attributes[self.idAttribute]
  }

  var currentAttributes = self.attributes
  var changedAttributes = self.changedAttributes = {}
  var previousAttributes = self.previousAttributes

  var newAttributes = {}
  var attribute, value, prevValue

  for (attribute in attributes) {
    value = attributes[attribute]
    prevValue = currentAttributes[attribute]

    if (value !== prevValue) {
      // attribute changed
      changedAttributes[attribute] = value

      // trigger attribute change event
      self.trigger('change:' + attribute, self, value, prevValue)
    }

    // save previous value
    previousAttributes[attribute] = prevValue

    if (typeof attributes[attribute] !== 'undefined') {
      // set attribute
      newAttributes[attribute] = value
    }
    delete currentAttributes[attribute]
  }
  for (attribute in currentAttributes) {
    prevValue = currentAttributes[attribute]

    // attribute removed
    previousAttributes[attribute] = prevValue
    changedAttributes[attribute] = undefined

    // trigger attribute change event
    self.trigger('change:' + attribute, self, undefined, prevValue)
  }
  self.attributes = newAttributes

  // trigger model change event
  self.trigger('change', self)
}
},{}],17:[function(require,module,exports){
module.exports = set

function set (attribute, value) {
  var attributes

  if (typeof attribute === 'object') {
    // {attribute: value}
    attributes = attribute
  } else {
    // attribute, value
    (attributes = {})[attribute] = value
  }

  var self = this

  self.init()

  if (self.idAttribute in attributes) {
    // set local id attribute if defined
    self.id = attributes[self.idAttribute]
  }

  var currentAttributes = self.attributes
  var changedAttributes = self.changedAttributes = {}
  var previousAttributes = self.previousAttributes

  var newAttributes = {}

  var prevValue

  for (attribute in attributes) {
    value = attributes[attribute]
    prevValue = currentAttributes[attribute]

    if (value !== prevValue) {
      // attribute changed
      changedAttributes[attribute] = value

      // trigger attribute change event
      self.trigger('change:' + attribute, self, value, prevValue)
    }

    // save previous value
    previousAttributes[attribute] = prevValue

    if (typeof value !== 'undefined') {
      // set attribute
      newAttributes[attribute] = value
    }
    delete currentAttributes[attribute]
  }
  for (attribute in currentAttributes) {
    // unchanged attribute
    value = currentAttributes[attribute]
    newAttributes[attribute] = value
    previousAttributes[attribute] = value
  }
  self.attributes = newAttributes
  // trigger model change event
  self.trigger('change', self)
}
},{}],18:[function(require,module,exports){
module.exports = unset

function unset (attribute) {
  var self = this
  self.init()

  var currentAttributes = self.attributes
  var changedAttributes = self.changedAttributes = {}
  var previousAttributes = self.previousAttributes

  var prevValue = currentAttributes[attribute]

  // attribute removed
  changedAttributes[attribute] = undefined

  // save previous value
  previousAttributes[attribute] = prevValue

  // remove attribute
  delete currentAttributes[attribute]

  for (attribute in currentAttributes) {
    previousAttributes[attribute] = currentAttributes[attribute]
  }

  // trigger attribute change event
  self.trigger('change:' + attribute, self, undefined, prevValue)

  // trigger model change event
  self.trigger('change', self)
}
},{}],19:[function(require,module,exports){
module.exports = Observable

function Observable () {}

var proto = Observable.prototype

proto.on = require(21)
proto.one = require(22)
proto.trigger = require(23)
proto.off = require(20)


},{}],20:[function(require,module,exports){
var each = require(24)

module.exports = off

function off (name, cb) {
  var self = this
  if (typeof name === 'undefined') {
    // reset all listeners
    self.listeners = {}
    return
  }

  var listeners = self.listeners || {}
  if (typeof cb === 'undefined') {
    // reset current listeners
    delete listeners[name]
    return
  }

  var currentListeners = listeners[name]

  if (!currentListeners) {
    // no current listeners found
    return
  }

  each(currentListeners, function (listener, i, len) {
    if (listener.cb === cb) {
      // remove listener
      currentListeners.splice(i, 1)
      len--
      i--
    }
  })
}
},{}],21:[function(require,module,exports){
module.exports = on

function on (name, cb, context) {
  if (typeof name === 'undefined') {
    // name not set: do nothing
    return
  }
  if (typeof cb === 'undefined') {
    // cb not set: do nothing
    return
  }
  var self = this

  // init listeners
  var listeners = self.listeners || (self.listeners = {})

  // init current listeners
  var currentListeners = listeners[name] || (listeners[name] = [])

  // create listener object
  var listener = {
    cb: cb
  }

  // set context if defined
  context && (listener.context = context)

  // add listener
  currentListeners.push(listener)
}
},{}],22:[function(require,module,exports){
module.exports = one

function one (name, cb, context) {
  if (typeof name === 'undefined') {
    // name not set: do nothing
    return
  }
  if (typeof cb === 'undefined') {
    // cb not set: do nothing
    return
  }
  var self = this

  // init listeners
  var listeners = self.listeners || (self.listeners = {})

  // init current listeners
  var currentListeners = listeners[name] || (listeners[name] = [])

  // add listener
  var listener = {
    cb: cb,
    one: true
  }
  context && (listener.context = context)
  currentListeners.push(listener)
}
},{}],23:[function(require,module,exports){
var each = require(24)
var slice = Array.prototype.slice

module.exports = trigger

function trigger (name) {
  if (typeof name === 'undefined') {
    return
  }
  var self = this

  var listeners = self.listeners || {}
  if (!listeners) {
    // no listeners found
    return
  }

  var currentListeners = listeners[name]
  if (!currentListeners) {
    // no current listeners found
    return
  }

  // get arguments
  var args = slice.call(arguments, 1)

  each(currentListeners, function (listener, i, len) {
    // trigger listener
    listener.cb.apply(listener.context || self, args)

    if (listener.one) {
      // remove listener
      currentListeners.splice(i, 1)
      len--
      i--
    }
  })
}
},{}],24:[function(require,module,exports){
'use strict'

module.exports = each

function each (array, iterator) {
  array = array || []

  var len = array.length
  var i

  for (i = 0; i < len; i++) {
    iterator(array[i], i)
  }
}
},{}],25:[function(require,module,exports){
var w = window
var prefixes = 'webkit moz o ms'.split(' ')

var style = document.createElement('p').style
var memoized = {}

var each = require(8)

module.exports = prefix

function prefix (parameter) {
  if (memoized[parameter]) {
    // return from cache if memoized
    return memoized[parameter]
  }
  if (parameter === 'transitionend') {
    if (typeof w.ontransitionend !== 'undefined') {
      // no vendor prefix
      memoized[parameter] = 'transitionend'
      return memoized[parameter]
    }
    each(prefixes, function (prefix, i) {
      if (typeof w['on' + prefix + 'transitionend'] !== 'undefined') {
        // vendor prefix found
        memoized[parameter] = prefix + 'TransitionEnd'
        return memoized[parameter]
      }
    })
    return
  }
  if (parameter === 'animationend') {
    if (typeof w.onanimationend !== 'undefined') {
      // no vendor prefix
      memoized[parameter] = 'animationend'
      return memoized[parameter]
    }
    each(prefixes, function (prefix, i) {
      if (typeof w['on' + prefix + 'animationend'] !== 'undefined') {
        // vendor prefix found
        memoized[parameter] = prefix + 'AnimationEnd'
        return memoized[parameter]
      }
    })
    return
  }
  parameter = parameter.split('-').map(function (part) {
    // convert to camelCase
    return part.slice(0, 1).toUpperCase() + part.slice(1)
  }).join('')
  var defaultParameter = parameter[0].toLowerCase() + parameter.slice(1)
  if (typeof style[defaultParameter] !== 'undefined') {
    // no vendor prefix
    memoized[parameter] = defaultParameter
    return memoized[parameter]
  }
  each(prefixes, function (prefix, i) {
    if (typeof style[prefix + parameter] !== 'undefined') {
      // vendor prefix found
      memoized[parameter] = prefix + parameter
      return memoized[parameter]
    }
  })
}
},{}],26:[function(require,module,exports){
module.exports = {
  inQuad: cubicBezier(0.550, 0.085, 0.680, 0.530),
  inCubic: cubicBezier(0.550, 0.055, 0.675, 0.190),
  inQuart: cubicBezier(0.895, 0.030, 0.685, 0.220),
  inQuint: cubicBezier(0.755, 0.050, 0.855, 0.060),
  inSine: cubicBezier(0.470, 0.000, 0.745, 0.715),
  inExpo: cubicBezier(0.950, 0.050, 0.795, 0.035),
  inCirc: cubicBezier(0.600, 0.040, 0.980, 0.335),
  inBack: cubicBezier(0.600, -0.280, 0.735, 0.045),

  outQuad: cubicBezier(0.250, 0.460, 0.450, 0.940),
  outCubic: cubicBezier(0.215, 0.610, 0.355, 1.000),
  outQuart: cubicBezier(0.165, 0.840, 0.440, 1.000),
  outQuint: cubicBezier(0.230, 1.000, 0.320, 1.000),
  outSine: cubicBezier(0.390, 0.575, 0.565, 1.000),
  outExpo: cubicBezier(0.190, 1.000, 0.220, 1.000),
  outCirc: cubicBezier(0.075, 0.820, 0.165, 1.000),
  outBack: cubicBezier(0.175, 0.885, 0.320, 1.275),

  inOutQuad: cubicBezier(0.455, 0.030, 0.515, 0.955),
  inOutCubic: cubicBezier(0.645, 0.045, 0.355, 1.000),
  inOutQuart: cubicBezier(0.770, 0.000, 0.175, 1.000),
  inOutQuint: cubicBezier(0.860, 0.000, 0.070, 1.000),
  inOutSine: cubicBezier(0.445, 0.050, 0.550, 0.950),
  inOutExpo: cubicBezier(1.000, 0.000, 0.000, 1.000),
  inOutCirc: cubicBezier(0.785, 0.135, 0.150, 0.860),
  inOutBack: cubicBezier(0.680, -0.550, 0.265, 1.550)
}

function cubicBezier (a, b, c, d) {
  return 'cubic-bezier(' + a + ', ' + b + ', ' + c + ', ' + d + ')'
}
},{}],27:[function(require,module,exports){
var w = window

var each = require(8)
var eases = require(26)

var prefix = require(25)
var _transition = prefix('transition')
var _transitionend = prefix('transitionend')

var needTick = true
var tickQueue = []

module.exports = transition

function transition (el, time, settings) {
  var key, value
  settings || (settings = {})

  var from = settings.from || {}
  var to = settings.to || {}
  var delay = settings.delay || 0
  var ease = settings.ease || 'inOutQuad'
  var remove = settings.remove || ''
  var onComplete = settings.onComplete

  for (key in from) {
    value = from[key]
    if (typeof to[key] === 'undefined') {
      // no 'to' value set, calculate:
      to[key] = w.getComputedStyle(el).getPropertyValue(key)
    }
  }
  for (key in to) {
    value = to[key]
    if (typeof from[key] === 'undefined') {
      // no 'from' value set, calculate:
      from[key] = w.getComputedStyle(el).getPropertyValue(key)
    }
  }

  for (key in from) {
    value = from[key]
    el.style[prefix(key)] = value
  }

  if (delay) {
    setTimeout(doAnimation, delay * 1000)
  } else {
    nextTick(doAnimation)
  }

  function doAnimation () {
    var _ease = ease ? ' ' + eases[ease] : ''
    _transitionend ? el.addEventListener(_transitionend, onTransitionend) : setTimeout(onTransitionend, time * 1000)

    el.style[_transition] = 'all ' + time + 's' + _ease
    for (key in to) {
      value = to[key]
      el.style[prefix(key)] = value
    }
  }

  function onTransitionend () {
    each(remove.split(' '), function (key) {
      el.style[prefix(key)] = ''
    })
    onComplete && onComplete()
    _transitionend && el.removeEventListener(prefix('transitionend'), onTransitionend)
  }
}

function nextTick (cb) {
  if (needTick) {
    needTick = false
    setTimeout(function () {
      var len = tickQueue.length
      for (var i = 0; i < len; i++) {
        tickQueue[i]()
      }
      tickQueue.splice(0, len)
      needTick = true
    }, 0)
  }
  tickQueue.push(cb)
}
},{}],28:[function(require,module,exports){
module.exports = addListener

function addListener (target, name, cb) {
  var self = this

  self.domListeners || (self.domListeners = [])

  if (typeof target === 'string') {
    target = self.$find(target)
  }

  var domlistener = {
    target: target,
    name: name,
    cb: cb
  }
  self.domListeners.push(domlistener)
  target.addEventListener(name, cb)
}
},{}],29:[function(require,module,exports){
module.exports = find

function find (target, query) {
  var query0 = query[0]
  var result

  if (query0 === '#') {
    result = target.getElementById(query.slice(1))
  } else if (query0 === '.') {
    result = target.getElementsByClassName(query.slice(1))[0]
  } else {
    result = target.getElementsByTagName(query)[0]
  }
  if (result) {
    return result
  }
  result = target.querySelector(query)
  return result
}
},{}],30:[function(require,module,exports){
module.exports = findAll

function findAll (target, query) {
  var query0 = query[0]
  var result

  if (query0 === '#') {
    result = [target.getElementById(query.slice(1))]
  } else if (query0 === '.') {
    result = target.getElementsByClassName(query.slice(1))
  } else {
    result = target.getElementsByTagName(query)
  }
  if (result) {
    return Array.prototype.slice.call(result)
  }
  result = target.querySelectorAll(query)
  return Array.prototype.slice.call(result)
}
},{}],31:[function(require,module,exports){
var each = require(8)
var inherit = require(9)
var Observable = require(19)

var $find = require(29)
var $findAll = require(30)

var tmpl = require(32)

if (typeof exports === 'object') {
  module.exports = View
} else {
  window.View = View
}

function View (opts) {
  var self = this

  opts || (opts = {})
  opts.template || (opts.template = '<div></div>')

  var opt

  for (opt in opts) {
    if (opt === 'template') {
      // do nothing
    } else if (opt === 'init') {
      self.on('init', opts[opt])
    } else {
      self[opt] = opts[opt]
    }
  }

  var template = self.template = tmpl(opts.template)

  self.$el = template.el.cloneNode(true)
  var key
  for (key in template.find) {
    self['$' + key] = getChildPath(self.$el, template.find[key])
  }
  self.trigger('init', self)
}

inherit(View, Observable)

var proto = View.prototype

proto.$find = function (query) {
  var self = this
  var $el = self.$el
  var template = self.template

  if (query[0] === '$') {
    return getChildPath($el, template.find[query.slice(1)])
  } else {
    return $find($el, query)
  }
}
proto.$findAll = function (query) {
  return $findAll(this.$el, query)
}

proto.addListener = require(28)
proto.mount = mount
proto.unmount = unmount
proto.destroy = destroy

View.extend = function (superOptions) {
  function ExtendedView (opts) {
    var self = this
    opts || (opts = {})
    var attribute

    for (attribute in superOptions) {
      if (attribute === 'init') {
        self.on('init', superOptions[attribute])
      } else if (typeof opts[attribute] === 'undefined') {
        opts[attribute] = superOptions[attribute]
      }
    }
    View.call(self, opts)
  }
  inherit(ExtendedView, View)

  return ExtendedView
}

function mount (target) {
  var self = this
  self.$root = target
  self.$root.appendChild(self.$el)
}

function unmount () {
  var self = this
  self.$root.removeChild(self.$el)
}

function destroy () {
  var self = this
  self.$root.removeChild(self.$el)
  self.domListeners && each(self.domListeners, function (listener) {
    listener.target.removeEventListener(listener.name, listener.cb)
  })
  self.trigger('destroy', self)
  self.off()
}

function getChildPath (target, childpath) {
  each(childpath.split('.'), function (path) {
    target = target.childNodes[path]
  })
  return target
}
},{}],32:[function(require,module,exports){
var each = require(8)
var memoize = {}

module.exports = tmpl

function tmpl (html) {
  if (memoize[html]) {
    return memoize[html]
  }
  html = html.trim()
  var startWith = html.slice(0, 3)
  var el
  if (startWith === '<tr' || startWith === '<td') {
    el = document.createElement('tbody')
  } else {
    el = document.createElement('div')
  }
  el.innerHTML = html
  var find = {}
  iterate(el.firstChild, '', find)
  memoize[html] = {
    find: find,
    el: el.firstChild
  }
  return memoize[html]
}

function iterate (target, keypath, find) {
  var children = target.childNodes

  if (children.length === 0) {
    return
  }
  each(children, function (child, i) {
    if (child.nodeType > 1) {
      return
    }
    var frzr = child.getAttribute('frzr')
    if (frzr != null) {
      find[frzr] = keypath + i
      child.removeAttribute('frzr')
    }
    iterate(child, keypath + i + '.', find)
  })
}
},{}],33:[function(require,module,exports){
var inherit = require(9)
var Observable = require(19)

module.exports = ViewCollection

function ViewCollection (models, options) {
  var self = this
  var isViewCollection = self instanceof ViewCollection

  if (!isViewCollection) {
    return new ViewCollection(models, options)
  }

  options && self.init(options)

  self.trigger('init')
  models && self.reset(models)
}

inherit(ViewCollection, Observable)

var proto = ViewCollection.prototype

proto.init = require(34)
proto.reset = require(36)
proto.mount = require(35)

ViewCollection.extend = function (superOptions) {
  function ExtendedViewCollection (models, opts) {
    var self = this
    opts || (opts = {})
    var attribute

    for (attribute in superOptions) {
      if (attribute === 'init') {
        self.on('init', superOptions[attribute])
      } else if (typeof opts[attribute] === 'undefined') {
        opts[attribute] = superOptions[attribute]
      }
    }
    ViewCollection.call(self, models, opts)
  }
  inherit(ExtendedViewCollection, ViewCollection)

  return ExtendedViewCollection
}


},{}],34:[function(require,module,exports){
module.exports = init

function init (options) {
  var self = this
  var attr, value

  for (attr in options) {
    value = options[attr]
    if (attr === 'init') {
      self.on('init', value)
    } else if (attr === 'change') {
      self.on('change', value)
    } else if (attr === 'add') {
      self.on('add', value)
    } else if (attr === 'remove') {
      self.on('remove', value)
    } else {
      self[attr] = value
    }
  }

  self.views || (self.views = [])
  self.lookup || (self.lookup = {})
  self.index || (self.index = {})
}
},{}],35:[function(require,module,exports){
var each = require(8)

module.exports = mount

function mount (target) {
  var self = this
  self.root = target
  each(self.views, function (view) {
    view.mount(target)
  })
}
},{}],36:[function(require,module,exports){
var each = require(8)
var View = require(31)

module.exports = reset

function reset (models) {
  var self = this

  self.init()

  var views = self.views
  var lookup = self.lookup
  var index = self.index

  var newViews = []
  var newLookup = {}
  var newIndex = {}

  var _View = self.view || View

  var lastOldIndexDefined, lastOldIndex
  var groups = []
  var group = {
    items: []
  }

  each(models, function (model, i) {
    var id = (typeof model.id !== 'undefined') ? model.id : i
    newIndex[id] = i
  })
  var removed = 0
  each(views, function (view, i, len) {
    var id = (typeof view.model.id !== 'undefined') ? view.model.id : i
    if (typeof newIndex[id] === 'undefined') {
      view.destroy()
      i--
      len--
      removed++
    }
    index[id] -= removed
  })
  each(models, function (model, i) {
    var id = (typeof model.id !== 'undefined') ? model.id : i
    var view = lookup[id]
    var oldIndex = index[id]
    var oldIndexDefined = typeof oldIndex !== 'undefined'

    if (typeof view === 'undefined') {
      view = new _View({
        model: model
      })
      if (!lastOldIndexDefined) {
        group.items.push(view)
      } else {
        if (group.items.length) {
          groups.push(group)
        }
        group = {items: [view], index: i, oldIndex: oldIndex}
      }
    } else {
      if (lastOldIndexDefined && (oldIndex - 1 === lastOldIndex)) {
        group.items.push(view)
      } else {
        if (group.items.length) {
          groups.push(group)
        }
        group = {items: [view], index: i, oldIndex: oldIndex}
      }
    }
    newViews[i] = view
    newLookup[id] = view
    delete lookup[id]
    lastOldIndex = oldIndex
    lastOldIndexDefined = oldIndexDefined
  })
  if (group.items.length) {
    groups.push(group)
  }
  var moved
  var added = 0
  self.root && each(groups, function (group, i) {
    if (moved || group.index + added !== group.oldIndex) {
      var frag = document.createDocumentFragment()
      each(group.items, function (view, j) {
        frag.appendChild(view.$el)
        view.$root = self.root
        moved = true
        added++
      })
      self.root.appendChild(frag)
    }
  })
  self.views = newViews
  self.lookup = newLookup
  self.index = newIndex
}
},{}]},{},[1]);
