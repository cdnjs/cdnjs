/*! Kefir.js v0.2.11
 *  https://github.com/pozadi/kefir
 */
;(function(global){
  "use strict";

  var Kefir = {};


function and() {
  for (var i = 0; i < arguments.length; i++) {
    if (!arguments[i]) {
      return arguments[i];
    }
  }
  return arguments[i - 1];
}

function or() {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      return arguments[i];
    }
  }
  return arguments[i - 1];
}

function concat(a, b) {
  var result = new Array(a.length + b.length)
    , j = 0
    , length, i;
  if (a.length === 0) {  return b  }
  if (b.length === 0) {  return a  }
  length = a.length;
  for (i = 0; i < length; i++, j++) {
    result[j] = a[i];
  }
  length = b.length;
  for (i = 0; i < length; i++, j++) {
    result[j] = b[i];
  }
  return result;
}

function find(arr, value) {
  var length = arr.length
    , i;
  for (i = 0; i < length; i++) {
    if (arr[i] === value) {  return i  }
  }
  return -1;
}

function findByPred(arr, pred) {
  var length = arr.length
    , i;
  for (i = 0; i < length; i++) {
    if (pred(arr[i])) {  return i  }
  }
  return -1;
}

function cloneArray(input) {
  var length = input.length
    , result = new Array(length)
    , i;
  for (i = 0; i < length; i++) {
    result[i] = input[i];
  }
  return result;
}

function remove(input, index) {
  var length = input.length
    , result, i, j;
  if (index >= 0 && index < length) {
    if (length === 1) {
      return [];
    } else {
      result = new Array(length - 1);
      for (i = 0, j = 0; i < length; i++) {
        if (i !== index) {
          result[j] = input[i];
          j++;
        }
      }
      return result;
    }
  } else {
    return input;
  }
}

function removeByPred(input, pred) {
  return remove(input, findByPred(input, pred));
}

function map(input, fn) {
  var length = input.length
    , result = new Array(length)
    , i;
  for (i = 0; i < length; i++) {
    result[i] = fn(input[i]);
  }
  return result;
}

function forEach(arr, fn) {
  var length = arr.length
    , i;
  for (i = 0; i < length; i++) {  fn(arr[i])  }
}

function fillArray(arr, value) {
  var length = arr.length
    , i;
  for (i = 0; i < length; i++) {
    arr[i] = value;
  }
}

function contains(arr, value) {
  return find(arr, value) !== -1;
}

function rest(arr, start, onEmpty) {
  if (arr.length > start) {
    return Array.prototype.slice.call(arr, start);
  }
  return onEmpty;
}

function slide(cur, next, max) {
  var length = Math.min(max, cur.length + 1),
      offset = cur.length - length + 1,
      result = new Array(length),
      i;
  for (i = offset; i < length; i++) {
    result[i - offset] = cur[i];
  }
  result[length - 1] = next;
  return result;
}

function isEqualArrays(a, b) {
  var length, i;
  if (a == null && b == null) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (i = 0, length = a.length; i < length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function apply(fn, c, a) {
  var aLength = a ? a.length : 0;
  if (c == null) {
    switch (aLength) {
      case 0:  return fn();
      case 1:  return fn(a[0]);
      case 2:  return fn(a[0], a[1]);
      case 3:  return fn(a[0], a[1], a[2]);
      case 4:  return fn(a[0], a[1], a[2], a[3]);
      default: return fn.apply(null, a);
    }
  } else {
    switch (aLength) {
      case 0:  return fn.call(c);
      default: return fn.apply(c, a);
    }
  }
}

function bindWithoutContext(fn, a, length) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  switch (length) {
    case 0:
      switch (a.length) {
        case 0:  return fn;
        case 1:  return function() {return fn(a0)}
        case 2:  return function() {return fn(a0, a1)}
        case 3:  return function() {return fn(a0, a1, a2)}
        case 4:  return function() {return fn(a0, a1, a2, a3)}
        default: return function() {return fn.apply(null, a)}
      }
      break;
    case 1:
      switch (a.length) {
        case 0:  return fn;
        case 1:  return function(b0) {return fn(a0, b0)}
        case 2:  return function(b0) {return fn(a0, a1, b0)}
        case 3:  return function(b0) {return fn(a0, a1, a2, b0)}
        case 4:  return function(b0) {return fn(a0, a1, a2, a3, b0)}
        default: return function(b0) {return fn.apply(null, concat(a, [b0]))}
      }
      break;
    case 2:
      switch (a.length) {
        case 0:  return fn;
        case 1:  return function(b0, b1) {return fn(a0, b0, b1)}
        case 2:  return function(b0, b1) {return fn(a0, a1, b0, b1)}
        case 3:  return function(b0, b1) {return fn(a0, a1, a2, b0, b1)}
        case 4:  return function(b0, b1) {return fn(a0, a1, a2, a3, b0, b1)}
        default: return function(b0, b1) {return fn.apply(null, concat(a, [b0, b1]))}
      }
      break;
    default:
      switch (a.length) {
        case 0:  return fn;
        default: return function() {return apply(fn, null, concat(a, arguments))}
      }
  }
}

function bindWithContext(fn, c, a, length) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  switch (length) {
    case 0:
      switch (a.length) {
        case 0:  return function() {return fn.call(c)}
        default: return function() {return fn.apply(c, a)}
      }
      break;
    case 1:
      switch (a.length) {
        case 0:  return function(b0) {return fn.call(c, b0)}
        case 1:  return function(b0) {return fn.call(c, a0, b0)}
        case 2:  return function(b0) {return fn.call(c, a0, a1, b0)}
        case 3:  return function(b0) {return fn.call(c, a0, a1, a2, b0)}
        case 4:  return function(b0) {return fn.call(c, a0, a1, a2, a3, b0)}
        default: return function(b0) {return fn.apply(c, concat(a, [b0]))}
      }
      break;
    case 2:
      switch (a.length) {
        case 0:  return function(b0, b1) {return fn.call(c, b0, b1)}
        case 1:  return function(b0, b1) {return fn.call(c, a0, b0, b1)}
        case 2:  return function(b0, b1) {return fn.call(c, a0, a1, b0, b1)}
        case 3:  return function(b0, b1) {return fn.call(c, a0, a1, a2, b0, b1)}
        case 4:  return function(b0, b1) {return fn.call(c, a0, a1, a2, a3, b0, b1)}
        default: return function(b0, b1) {return fn.apply(c, concat(a, [b0, b1]))}
      }
      break;
    default:
      switch (a.length) {
        case 0: return function() {return fn.apply(c, arguments)}
        default: return function() {return fn.apply(c, concat(a, arguments))}
      }
  }
}

function bind(fn, context, args, boundFunctionLength) {
  if (context == null) {
    return bindWithoutContext(fn, args, boundFunctionLength);
  } else {
    return bindWithContext(fn, context, args, boundFunctionLength);
  }
}








// array functions (a.k.a fnMeta) helpers

function normFnMeta(fnMeta) {
  var fn, context, args;
  if (fnMeta instanceof _Fn) {
    return fnMeta;
  } else {
    if (isFn(fnMeta)) {
      return {fn: fnMeta, context: null, args: []};
    } else {
      if (isArrayLike(fnMeta)) {
        context = (fnMeta[1] == null ? null : fnMeta[1]);
        fn = fnMeta[0];
        args = rest(fnMeta, 2, []);
        if (!isFn(fn)) {
          if (context !== null && isFn(context[fn])) {
            fn = context[fn];
          } else {
            throw new Error('Object isn\'t a function, and can\'t be converted to it: ' + fnMeta);
          }
        }
        return {fn: fn, context: context, args: args};
      } else {
        throw new Error('Object isn\'t a function, and can\'t be converted to it: ' + fnMeta);
      }
    }
  }
}

function applyFnMeta(fnMeta, args) {
  fnMeta = normFnMeta(fnMeta);
  return apply(fnMeta.fn, fnMeta.context, concat(fnMeta.args, args));
}

function buildFn(fnMeta, length) {
  fnMeta = normFnMeta(fnMeta);
  return bind(fnMeta.fn, fnMeta.context, fnMeta.args, length);
}





// Fn class

function _Fn(fnMeta, length) {
  this.context = fnMeta.context;
  this.fn = fnMeta.fn;
  this.args = fnMeta.args;
  this.invoke = bind(this.fn, this.context, this.args, length);
}

_Fn.prototype.apply = function(args) {
  return apply(this.invoke, null, args);
}

_Fn.prototype.applyWithContext = function(context, args) {
  if (this.context === null) {
    return apply(this.fn, context, concat(this.args, args));
  } else {
    return this.apply(args);
  }
}

function Fn(fnMeta, length) {
  if (fnMeta instanceof _Fn) {
    return fnMeta;
  } else {
    return new _Fn(normFnMeta(fnMeta), length == null ? 100 : length);
  }
}

Fn.isEqual = function(a, b) {
  if (a === b) {
    return true;
  }
  a = Fn(a);
  b = Fn(b);
  return a.fn === b.fn &&
    a.context === b.context &&
    isEqualArrays(a.args, b.args);
}

Kefir.Fn = Fn;

function get(map, key, notFound) {
  if (map && key in map) {
    return map[key];
  } else {
    return notFound;
  }
}

function own(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function createObj(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F();
}

function extend(target /*, mixin1, mixin2...*/) {
  var length = arguments.length
    , i, prop;
  for (i = 1; i < length; i++) {
    for (prop in arguments[i]) {
      target[prop] = arguments[i][prop];
    }
  }
  return target;
}

function inherit(Child, Parent /*, mixin1, mixin2...*/) {
  var length = arguments.length
    , i;
  Child.prototype = createObj(Parent.prototype);
  Child.prototype.constructor = Child;
  for (i = 2; i < length; i++) {
    extend(Child.prototype, arguments[i]);
  }
  return Child;
}

var NOTHING = ['<nothing>'];

function agrsToArray(args) {
  if (args.length === 1 && isArray(args[0])) {
    return args[0];
  }
  return cloneArray(args);
}

var now = Date.now ?
  function() { return Date.now() } :
  function() { return new Date().getTime() };

function isFn(fn) {
  return typeof fn === 'function';
}

function isUndefined(x) {
  return typeof x === 'undefined';
}

function isArrayLike(xs) {
  return isArray(xs) || isArguments(xs);
}

var isArray = Array.isArray || function(xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
}

var isArguments = function(xs) {
  return Object.prototype.toString.call(xs) === '[object Arguments]';
}

// For IE
if (!isArguments(arguments)) {
  isArguments = function(obj) {
    return !!(obj && own(obj, 'callee'));
  }
}

function withInterval(name, mixin) {

  function AnonymousStream(wait, args) {
    Stream.call(this);
    this._wait = wait;
    this._intervalId = null;
    var $ = this;
    this._$onTick = function() {  $._onTick()  }
    this._init(args);
  }

  inherit(AnonymousStream, Stream, {

    _name: name,

    _init: function(args) {},
    _free: function() {},

    _onTick: function() {},

    _onActivation: function() {
      this._intervalId = setInterval(this._$onTick, this._wait);
    },
    _onDeactivation: function() {
      if (this._intervalId !== null) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
    },

    _clear: function() {
      Stream.prototype._clear.call(this);
      this._$onTick = null;
      this._free();
    }

  }, mixin);

  Kefir[name] = function(wait) {
    return new AnonymousStream(wait, rest(arguments, 1, []));
  }
}

function withOneSource(name, mixin, options) {


  options = extend({
    streamMethod: function(StreamClass, PropertyClass) {
      return function() {  return new StreamClass(this, arguments)  }
    },
    propertyMethod: function(StreamClass, PropertyClass) {
      return function() {  return new PropertyClass(this, arguments)  }
    }
  }, options || {});



  mixin = extend({
    _init: function(args) {},
    _free: function() {},

    _handleValue: function(x, isCurrent) {  this._send('value', x, isCurrent)  },
    _handleEnd: function(__, isCurrent) {  this._send('end', null, isCurrent)  },

    _onActivationHook: function() {},
    _onDeactivationHook: function() {},

    _handleAny: function(event) {
      switch (event.type) {
        case 'value': this._handleValue(event.value, event.current); break;
        case 'end': this._handleEnd(event.value, event.current); break;
      }
    },

    _onActivation: function() {
      this._onActivationHook();
      this._source.onAny([this._handleAny, this]);
    },
    _onDeactivation: function() {
      this._onDeactivationHook();
      this._source.offAny([this._handleAny, this]);
    }
  }, mixin || {});



  function buildClass(BaseClass) {
    function AnonymousObservable(source, args) {
      BaseClass.call(this);
      this._source = source;
      this._name = source._name + '.' + name;
      this._init(args);
    }

    inherit(AnonymousObservable, BaseClass, {
      _clear: function() {
        BaseClass.prototype._clear.call(this);
        this._source = null;
        this._free();
      }
    }, mixin);

    return AnonymousObservable;
  }


  var AnonymousStream = buildClass(Stream);
  var AnonymousProperty = buildClass(Property);

  if (options.streamMethod) {
    Stream.prototype[name] = options.streamMethod(AnonymousStream, AnonymousProperty);
  }

  if (options.propertyMethod) {
    Property.prototype[name] = options.propertyMethod(AnonymousStream, AnonymousProperty);
  }

}

function withTwoSources(name, mixin /*, options*/) {

  mixin = extend({
    _init: function() {},
    _free: function() {},

    _handlePrimaryValue: function(x, isCurrent) {},
    _handlePrimaryEnd: function(__, isCurrent) {  this._send('end', null, isCurrent)  },

    _handleSecondaryValue: function(x, isCurrent) {  this._lastSecondary = x  },
    _handleSecondaryEnd: function(__, isCurrent) {},

    _handlePrimaryAny: function(event) {
      switch (event.type) {
        case 'value': this._handlePrimaryValue(event.value, event.current); break;
        case 'end': this._handlePrimaryEnd(event.value, event.current); break;
      }
    },
    _handleSecondaryAny: function(event) {
      switch (event.type) {
        case 'value': this._handleSecondaryValue(event.value, event.current); break;
        case 'end': this._handleSecondaryEnd(event.value, event.current); break;
      }
    },

    _removeSecondary: function() {
      this._secondary.offAny([this._handleSecondaryAny, this]);
      this._secondary = null;
      this._secondaryRemoved = true;
    },

    _onActivation: function() {
      if (!this._secondaryRemoved) {
        this._secondary.onAny([this._handleSecondaryAny, this]);
      }
      if (this._alive) {
        this._primary.onAny([this._handlePrimaryAny, this]);
      }
    },
    _onDeactivation: function() {
      if (!this._secondaryRemoved) {
        this._secondary.offAny([this._handleSecondaryAny, this]);
      }
      this._primary.offAny([this._handlePrimaryAny, this]);
    }
  }, mixin || {});



  function buildClass(BaseClass) {
    function AnonymousObservable(primary, secondary) {
      BaseClass.call(this);
      this._primary = primary;
      this._secondary = secondary;
      this._name = primary._name + '.' + name;
      this._lastSecondary = NOTHING;
      this._secondaryRemoved = false;
      this._init();
    }

    inherit(AnonymousObservable, BaseClass, {
      _clear: function() {
        BaseClass.prototype._clear.call(this);
        this._primary = null;
        this._secondary = null;
        this._lastSecondary = null;
        this._free();
      }
    }, mixin);

    return AnonymousObservable;
  }


  var AnonymousStream = buildClass(Stream);
  var AnonymousProperty = buildClass(Property);

  Stream.prototype[name] = function(secondary) {
    return new AnonymousStream(this, secondary);
  }

  Property.prototype[name] = function(secondary) {
    return new AnonymousProperty(this, secondary);
  }

}

// Subscribers

function Subscribers() {
  this._fns = [];
}

extend(Subscribers, {
  callOne: function(fn, event) {
    if (fn.type === 'any') {
      fn.invoke(event);
    } else if (fn.type === event.type) {
      if (fn.type === 'value') {
        fn.invoke(event.value);
      } else {
        fn.invoke();
      }
    }
  },
  callOnce: function(type, fnMeta, event) {
    if (type === 'any') {
      applyFnMeta(fnMeta, [event]);
    } else if (type === event.type) {
      if (type === 'value') {
        applyFnMeta(fnMeta, [event.value]);
      } else {
        applyFnMeta(fnMeta, []);
      }
    }
  }
});

extend(Subscribers.prototype, {
  add: function(type, fn) {
    fn = Fn(fn, type === 'end' ? 0 : 1);
    fn.type = type;
    this._fns = concat(this._fns, [fn]);
  },
  remove: function(type, fn) {
    fn = Fn(fn);
    this._fns = removeByPred(this._fns, function(x) {
      return x.type === type && Fn.isEqual(x, fn);
    });
  },
  callAll: function(event) {
    var fns = this._fns;
    for (var i = 0; i < fns.length; i++) {
      Subscribers.callOne(fns[i], event);
    }
  },
  isEmpty: function() {
    return this._fns.length === 0;
  }
});





// Events

function Event(type, value, current) {
  return {type: type, value: value, current: !!current};
}

var CURRENT_END = Event('end', undefined, true);





// Observable

function Observable() {
  this._subscribers = new Subscribers();
  this._active = false;
  this._alive = true;
}
Kefir.Observable = Observable;

extend(Observable.prototype, {

  _name: 'observable',

  _onActivation: function() {},
  _onDeactivation: function() {},

  _setActive: function(active) {
    if (this._active !== active) {
      this._active = active;
      if (active) {
        this._onActivation();
      } else {
        this._onDeactivation();
      }
    }
  },

  _clear: function() {
    this._setActive(false);
    this._alive = false;
    this._subscribers = null;
  },

  _send: function(type, x, isCurrent) {
    if (this._alive) {
      this._subscribers.callAll(Event(type, x, isCurrent));
      if (type === 'end') {  this._clear()  }
    }
  },

  on: function(type, fn) {
    if (this._alive) {
      this._subscribers.add(type, fn);
      this._setActive(true);
    } else {
      Subscribers.callOnce(type, fn, CURRENT_END);
    }
    return this;
  },

  off: function(type, fn) {
    if (this._alive) {
      this._subscribers.remove(type, fn);
      if (this._subscribers.isEmpty()) {
        this._setActive(false);
      }
    }
    return this;
  },

  onValue:  function(fn) {  return this.on('value', fn)   },
  onEnd:    function(fn) {  return this.on('end', fn)     },
  onAny:    function(fn) {  return this.on('any', fn)     },

  offValue: function(fn) {  return this.off('value', fn)  },
  offEnd:   function(fn) {  return this.off('end', fn)    },
  offAny:   function(fn) {  return this.off('any', fn)    }

});


// extend() can't handle `toString` in IE8
Observable.prototype.toString = function() {  return '[' + this._name + ']'  };









// Stream

function Stream() {
  Observable.call(this);
}
Kefir.Stream = Stream;

inherit(Stream, Observable, {

  _name: 'stream'

});







// Property

function Property() {
  Observable.call(this);
  this._current = NOTHING;
}
Kefir.Property = Property;

inherit(Property, Observable, {

  _name: 'property',

  _send: function(type, x, isCurrent) {
    if (this._alive) {
      if (!isCurrent) {
        this._subscribers.callAll(Event(type, x));
      }
      if (type === 'value') {  this._current = x  }
      if (type === 'end') {  this._clear()  }
    }
  },

  on: function(type, fn) {
    if (this._alive) {
      this._subscribers.add(type, fn);
      this._setActive(true);
    }
    if (this._current !== NOTHING) {
      Subscribers.callOnce(type, fn, Event('value', this._current, true));
    }
    if (!this._alive) {
      Subscribers.callOnce(type, fn, CURRENT_END);
    }
    return this;
  }

});






// Log

function logCb(name, event) {
  var typeStr = '<' + event.type + (event.current ? ':current' : '') + '>';
  if (event.type === 'value') {
    console.log(name, typeStr, event.value);
  } else {
    console.log(name, typeStr);
  }
}

Observable.prototype.log = function(name) {
  this.onAny([logCb, null, name || this.toString()]);
  return this;
}

Observable.prototype.offLog = function(name) {
  this.offAny([logCb, null, name || this.toString()]);
  return this;
}



// Kefir.withInterval()

withInterval('withInterval', {
  _init: function(args) {
    this._fn = buildFn(args[0], 1);
    var $ = this;
    this._emitter = {
      emit: function(x) {  $._send('value', x)  },
      end: function() {  $._send('end')  }
    }
  },
  _free: function() {
    this._fn = null;
    this._emitter = null;
  },
  _onTick: function() {
    this._fn(this._emitter);
  }
});





// Kefir.fromPoll()

withInterval('fromPoll', {
  _init: function(args) {
    this._fn = buildFn(args[0], 0);
  },
  _free: function() {
    this._fn = null;
  },
  _onTick: function() {
    this._send('value', this._fn());
  }
});





// Kefir.interval()

withInterval('interval', {
  _init: function(args) {
    this._x = args[0];
  },
  _free: function() {
    this._x = null;
  },
  _onTick: function() {
    this._send('value', this._x);
  }
});




// Kefir.sequentially()

withInterval('sequentially', {
  _init: function(args) {
    this._xs = cloneArray(args[0]);
    if (this._xs.length === 0) {
      this._send('end')
    }
  },
  _free: function() {
    this._xs = null;
  },
  _onTick: function() {
    switch (this._xs.length) {
      case 1:
        this._send('value', this._xs[0]);
        this._send('end');
        break;
      default:
        this._send('value', this._xs.shift());
    }
  }
});




// Kefir.repeatedly()

withInterval('repeatedly', {
  _init: function(args) {
    this._xs = cloneArray(args[0]);
    this._i = -1;
  },
  _onTick: function() {
    if (this._xs.length > 0) {
      this._i = (this._i + 1) % this._xs.length;
      this._send('value', this._xs[this._i]);
    }
  }
});





// Kefir.later()

withInterval('later', {
  _init: function(args) {
    this._x = args[0];
  },
  _free: function() {
    this._x = null;
  },
  _onTick: function() {
    this._send('value', this._x);
    this._send('end');
  }
});

function _AbstractPool(options) {
  Stream.call(this);

  this._queueLim = get(options, 'queueLim', 0);
  this._concurLim = get(options, 'concurLim', -1);
  this._drop = get(options, 'drop', 'new');
  if (this._concurLim === 0) {
    throw new Error('options.concurLim can\'t be 0');
  }

  this._queue = [];
  this._curSources = [];
  this._activating = false;
}

inherit(_AbstractPool, Stream, {

  _name: 'abstractPool',

  _add: function(obs) {
    if (this._concurLim === -1 || this._curSources.length < this._concurLim) {
      this._addToCur(obs);
    } else {
      if (this._queueLim === -1 || this._queue.length < this._queueLim) {
        this._addToQueue(obs);
      } else if (this._drop === 'old') {
        this._removeOldest();
        this._add(obs);
      }
    }
  },
  _addAll: function(obss) {
    var $ = this;
    forEach(obss, function(obs) {  $._add(obs)  });
  },
  _remove: function(obs) {
    if (this._removeCur(obs) === -1) {
      this._removeQueue(obs);
    }
  },

  _addToQueue: function(obs) {
    this._queue = concat(this._queue, [obs]);
  },
  _addToCur: function(obs) {
    this._curSources = concat(this._curSources, [obs]);
    if (this._active) {  this._sub(obs)  }
  },
  _sub: function(obs) {
    obs.onAny([this._handleSubAny, this]);
    obs.onEnd([this._removeCur, this, obs]);
  },
  _unsub: function(obs) {
    obs.offAny([this._handleSubAny, this]);
    obs.offEnd([this._removeCur, this, obs]);
  },
  _handleSubAny: function(event) {
    if (event.type === 'value') {
      this._send('value', event.value, event.current && this._activating);
    }
  },

  _removeQueue: function(obs) {
    var index = find(this._queue, obs);
    this._queue = remove(this._queue, index);
    return index;
  },
  _removeCur: function(obs) {
    if (this._active) {  this._unsub(obs)  }
    var index = find(this._curSources, obs);
    this._curSources = remove(this._curSources, index);
    if (index !== -1) {
      if (this._queue.length !== 0) {
        this._pullQueue();
      } else if (this._curSources.length === 0) {
        this._onEmpty();
      }
    }
    return index;
  },
  _removeOldest: function() {
    this._removeCur(this._curSources[0]);
  },

  _pullQueue: function() {
    if (this._queue.length !== 0) {
      this._queue = cloneArray(this._queue);
      this._addToCur(this._queue.shift());
    }
  },

  _onActivation: function() {
    var sources = this._curSources
      , i;
    this._activating = true;
    for (i = 0; i < sources.length; i++) {  this._sub(sources[i])  }
    this._activating = false;
  },
  _onDeactivation: function() {
    var sources = this._curSources
      , i;
    for (i = 0; i < sources.length; i++) {  this._unsub(sources[i])  }
  },

  _isEmpty: function() {  return this._curSources.length === 0  },
  _onEmpty: function() {},

  _clear: function() {
    Stream.prototype._clear.call(this);
    this._queue = null;
    this._curSources = null;
  }

});





// .merge()

var MergeLike = {
  _onEmpty: function() {
    if (this._initialised) {  this._send('end', null, this._activating)  }
  }
};

function Merge(sources) {
  _AbstractPool.call(this);
  if (sources.length === 0) {  this._send('end')  } else {  this._addAll(sources)  }
  this._initialised = true;
}

inherit(Merge, _AbstractPool, extend({_name: 'merge'}, MergeLike));

Kefir.merge = function() {
  return new Merge(agrsToArray(arguments));
}

Observable.prototype.merge = function(other) {
  return Kefir.merge([this, other]);
}




// .concat()

function Concat(sources) {
  _AbstractPool.call(this, {concurLim: 1, queueLim: -1});
  if (sources.length === 0) {  this._send('end')  } else {  this._addAll(sources)  }
  this._initialised = true;
}

inherit(Concat, _AbstractPool, extend({_name: 'concat'}, MergeLike));

Kefir.concat = function() {
  return new Concat(agrsToArray(arguments));
}

Observable.prototype.concat = function(other) {
  return Kefir.concat([this, other]);
}






// .pool()

function Pool() {
  _AbstractPool.call(this);
}

inherit(Pool, _AbstractPool, {

  _name: 'pool',

  plug: function(obs) {
    this._add(obs);
    return this;
  },
  unplug: function(obs) {
    this._remove(obs);
    return this;
  }

});

Kefir.pool = function() {
  return new Pool();
}





// .bus()

function Bus() {
  _AbstractPool.call(this);
}

inherit(Bus, _AbstractPool, {

  _name: 'bus',

  plug: function(obs) {
    this._add(obs);
    return this;
  },
  unplug: function(obs) {
    this._remove(obs);
    return this;
  },

  emit: function(x) {
    this._send('value', x);
    return this;
  },
  end: function() {
    this._send('end');
    return this;
  }

});

Kefir.bus = function() {
  return new Bus();
}





// .flatMap()

function FlatMap(source, fn, options) {
  _AbstractPool.call(this, options);
  this._source = source;
  this._fn = fn ? buildFn(fn, 1) : null;
  this._mainEnded = false;
  this._lastCurrent = null;
}

inherit(FlatMap, _AbstractPool, {

  _onActivation: function() {
    _AbstractPool.prototype._onActivation.call(this);
    this._activating = true;
    this._source.onAny([this._handleMainSource, this]);
    this._activating = false;
  },
  _onDeactivation: function() {
    _AbstractPool.prototype._onDeactivation.call(this);
    this._source.offAny([this._handleMainSource, this]);
  },

  _handleMainSource: function(event) {
    if (event.type === 'value') {
      if (!event.current || this._lastCurrent !== event.value) {
        this._add(this._fn ? this._fn(event.value) : event.value);
      }
      this._lastCurrent = event.value;
    } else {
      if (this._isEmpty()) {
        this._send('end', null, event.current);
      } else {
        this._mainEnded = true;
      }
    }
  },

  _onEmpty: function() {
    if (this._mainEnded) {  this._send('end')  }
  },

  _clear: function() {
    _AbstractPool.prototype._clear.call(this);
    this._source = null;
    this._lastCurrent = null;
  }

});

Observable.prototype.flatMap = function(fn) {
  return new FlatMap(this, fn)
    .setName(this, 'flatMap');
}

Observable.prototype.flatMapLatest = function(fn) {
  return new FlatMap(this, fn, {concurLim: 1, drop: 'old'})
    .setName(this, 'flatMapLatest');
}

Observable.prototype.flatMapFirst = function(fn) {
  return new FlatMap(this, fn, {concurLim: 1})
    .setName(this, 'flatMapFirst');
}

Observable.prototype.flatMapConcat = function(fn) {
  return new FlatMap(this, fn, {queueLim: -1, concurLim: 1})
    .setName(this, 'flatMapConcat');
}

Observable.prototype.flatMapConcurLimit = function(fn, limit) {
  var result;
  if (limit === 0) {
    result = Kefir.never();
  } else {
    if (limit < 0) {  limit = -1  }
    result = new FlatMap(this, fn, {queueLim: -1, concurLim: limit});
  }
  return result.setName(this, 'flatMapConcurLimit');
}





// .sampledBy()

function SampledBy(passive, active, combinator) {
  Stream.call(this);
  if (active.length === 0) {
    this._send('end');
  } else {
    this._passiveCount = passive.length;
    this._combinator = combinator ? Fn(combinator) : null;
    this._sources = concat(passive, active);
    this._aliveCount = 0;
    this._currents = new Array(this._sources.length);
    fillArray(this._currents, NOTHING);
    this._activating = false;
    this._emitAfterActivation = false;
    this._endAfterActivation = false;
  }
}

inherit(SampledBy, Stream, {

  _name: 'sampledBy',

  _onActivation: function() {
    var length = this._sources.length,
        i;
    this._aliveCount = length - this._passiveCount;
    this._activating = true;
    for (i = 0; i < length; i++) {
      this._sources[i].onAny([this._handleAny, this, i]);
    }
    this._activating = false;
    if (this._emitAfterActivation) {
      this._emitAfterActivation = false;
      this._emitIfFull(true);
    }
    if (this._endAfterActivation) {
      this._send('end', null, true);
    }
  },

  _onDeactivation: function() {
    var length = this._sources.length,
        i;
    for (i = 0; i < length; i++) {
      this._sources[i].offAny([this._handleAny, this, i]);
    }
  },

  _emitIfFull: function(isCurrent) {
    if (!contains(this._currents, NOTHING)) {
      var combined = cloneArray(this._currents);
      if (this._combinator) {
        combined = this._combinator.apply(this._currents);
      }
      this._send('value', combined, isCurrent);
    }
  },

  _handleAny: function(i, event) {
    if (event.type === 'value') {
      this._currents[i] = event.value;
      if (i >= this._passiveCount) {
        if (this._activating) {
          this._emitAfterActivation = true;
        } else {
          this._emitIfFull(event.current);
        }
      }
    } else {
      if (i >= this._passiveCount) {
        this._aliveCount--;
        if (this._aliveCount === 0) {
          if (this._activating) {
            this._endAfterActivation = true;
          } else {
            this._send('end', null, event.current);
          }
        }
      }
    }
  },

  _clear: function() {
    Stream.prototype._clear.call(this);
    this._sources = null;
    this._currents = null;
  }

});

Kefir.sampledBy = function(passive, active, combinator) {
  return new SampledBy(passive, active, combinator);
}

Observable.prototype.sampledBy = function(other, combinator) {
  return Kefir.sampledBy([this], [other], combinator);
}




// .combine()

Kefir.combine = function(sources, combinator) {
  var result = new SampledBy([], sources, combinator);
  result._name = 'combine';
  return result;
}

Observable.prototype.combine = function(other, combinator) {
  return Kefir.combine([this, other], combinator);
}

function produceStream(StreamClass, PropertyClass) {
  return function() {  return new StreamClass(this, arguments)  }
}
function produceProperty(StreamClass, PropertyClass) {
  return function() {  return new PropertyClass(this, arguments)  }
}



// .toProperty()

withOneSource('toProperty', {
  _init: function(args) {
    if (args.length > 0) {
      this._send('value', args[0]);
    }
  }
}, {propertyMethod: null, streamMethod: produceProperty});




// .changes()

withOneSource('changes', {
  _handleValue: function(x, isCurrent) {
    if (!isCurrent) {
      this._send('value', x);
    }
  }
}, {streamMethod: null, propertyMethod: produceStream});




// .withHandler()

withOneSource('withHandler', {
  _init: function(args) {
    this._handler = buildFn(args[0], 2);
    this._forcedCurrent = false;
    var $ = this;
    this._emitter = {
      emit: function(x) {  $._send('value', x, $._forcedCurrent)  },
      end: function() {  $._send('end', null, $._forcedCurrent)  }
    }
  },
  _free: function() {
    this._handler = null;
    this._emitter = null;
  },
  _handleAny: function(event) {
    this._forcedCurrent = event.current;
    this._handler(this._emitter, event);
    this._forcedCurrent = false;
  }
});




// .flatten(fn)

withOneSource('flatten', {
  _init: function(args) {
    this._fn = args[0] ? buildFn(args[0], 1) : null;
  },
  _free: function() {
    this._fn = null;
  },
  _handleValue: function(x, isCurrent) {
    var xs = this._fn === null ? x : this._fn(x);
    for (var i = 0; i < xs.length; i++) {
      this._send('value', xs[i], isCurrent);
    }
  }
});







// .transduce(transducer)

function xformForObs(obs) {
  return {
    init: function() {
      return null;
    },
    step: function(res, input) {
      obs._send('value', input, obs._forcedCurrent);
      return null;
    },
    result: function(res) {
      obs._send('end', null, obs._forcedCurrent);
      return null;
    }
  };
}

withOneSource('transduce', {
  _init: function(args) {
    this._xform = args[0](xformForObs(this));
    this._forcedCurrent = true;
    this._endIfReduced(this._xform.init());
    this._forcedCurrent = false;
  },
  _free: function() {
    this._xform = null;
  },
  _endIfReduced: function(obj) {
    if (obj !== null) {
      this._xform.result(null);
    }
  },
  _handleValue: function(x, isCurrent) {
    this._forcedCurrent = isCurrent;
    this._endIfReduced(this._xform.step(null, x));
    this._forcedCurrent = false;
  },
  _handleEnd: function(__, isCurrent) {
    this._forcedCurrent = isCurrent;
    this._xform.result(null);
    this._forcedCurrent = false;
  }
});





var withFnArgMixin = {
  _init: function(args) {  this._fn = buildFn(args[0], 1)  },
  _free: function() {  this._fn = null  }
};



// .map(fn)

withOneSource('map', extend({
  _handleValue: function(x, isCurrent) {
    this._send('value', this._fn(x), isCurrent);
  }
}, withFnArgMixin));





// .filter(fn)

withOneSource('filter', extend({
  _handleValue: function(x, isCurrent) {
    if (this._fn(x)) {
      this._send('value', x, isCurrent);
    }
  }
}, withFnArgMixin));





// .takeWhile(fn)

withOneSource('takeWhile', extend({
  _handleValue: function(x, isCurrent) {
    if (this._fn(x)) {
      this._send('value', x, isCurrent);
    } else {
      this._send('end', null, isCurrent);
    }
  }
}, withFnArgMixin));





// .take(n)

withOneSource('take', {
  _init: function(args) {
    this._n = args[0];
    if (this._n <= 0) {
      this._send('end');
    }
  },
  _handleValue: function(x, isCurrent) {
    this._n--;
    this._send('value', x, isCurrent);
    if (this._n === 0) {
      this._send('end', null, isCurrent);
    }
  }
});





// .skip(n)

withOneSource('skip', {
  _init: function(args) {
    this._n = args[0] < 0 ? 0 : args[0];
  },
  _handleValue: function(x, isCurrent) {
    if (this._n === 0) {
      this._send('value', x, isCurrent);
    } else {
      this._n--;
    }
  }
});




// .skipDuplicates([fn])

withOneSource('skipDuplicates', {
  _init: function(args) {
    this._fn = args[0] ? buildFn(args[0], 2) : null;
    this._prev = NOTHING;
  },
  _free: function() {
    this._fn = null;
    this._prev = null;
  },
  _isEqual: function(a, b) {
    return this._fn === null ? a === b : this._fn(a, b);
  },
  _handleValue: function(x, isCurrent) {
    if (this._prev === NOTHING || !this._isEqual(this._prev, x)) {
      this._send('value', x, isCurrent);
      this._prev = x;
    }
  }
});





// .skipWhile(fn)

withOneSource('skipWhile', {
  _init: function(args) {
    this._fn = buildFn(args[0], 1);
    this._skip = true;
  },
  _free: function() {
    this._fn = null;
  },
  _handleValue: function(x, isCurrent) {
    if (!this._skip) {
      this._send('value', x, isCurrent);
      return;
    }
    if (!this._fn(x)) {
      this._skip = false;
      this._fn = null;
      this._send('value', x, isCurrent);
    }
  }
});





// .diff(seed, fn)

withOneSource('diff', {
  _init: function(args) {
    this._prev = args[0];
    this._fn = args[1] ? buildFn(args[1], 2) : null;
  },
  _free: function() {
    this._prev = null;
    this._fn = null;
  },
  _handleValue: function(x, isCurrent) {
    var result = (this._fn === null) ?
      [this._prev, x] :
      this._fn(this._prev, x);
    this._send('value', result, isCurrent);
    this._prev = x;
  }
});





// .scan(seed, fn)

withOneSource('scan', {
  _init: function(args) {
    this._send('value', args[0], true);
    this._fn = buildFn(args[1], 2);
  },
  _free: function() {
    this._fn = null;
  },
  _handleValue: function(x, isCurrent) {
    this._send('value', this._fn(this._current, x), isCurrent);
  }
}, {streamMethod: produceProperty});





// .reduce(seed, fn)

withOneSource('reduce', {
  _init: function(args) {
    this._result = args[0];
    this._fn = buildFn(args[1], 2);
  },
  _free: function() {
    this._fn = null;
    this._result = null;
  },
  _handleValue: function(x) {
    this._result = this._fn(this._result, x);
  },
  _handleEnd: function(__, isCurrent) {
    this._send('value', this._result, isCurrent);
    this._send('end', null, isCurrent);
  }
});




// .slidingWindow(max[, min])

withOneSource('slidingWindow', {
  _init: function(args) {
    this._max = args[0];
    this._min = args[1] || 0;
    this._cache = [];
  },
  _free: function() {
    this._cache = null;
  },
  _handleValue: function(x, isCurrent) {
    this._cache = slide(this._cache, x, this._max);
    if (this._cache.length >= this._min) {
      this._send('value', this._cache, isCurrent);
    }
  }
});





// .debounce(wait, {immediate})

withOneSource('debounce', {
  _init: function(args) {
    this._wait = Math.max(0, args[0]);
    this._immediate = get(args[1], 'immediate', false);
    this._lastAttempt = 0;
    this._timeoutId = null;
    this._laterValue = null;
    this._endLater = false;
    var $ = this;
    this._$later = function() {  $._later()  };
  },
  _free: function() {
    this._laterValue = null;
    this._$later = null;
  },
  _handleValue: function(x, isCurrent) {
    if (isCurrent) {
      this._send('value', x, isCurrent);
    } else {
      this._lastAttempt = now();
      if (this._immediate && !this._timeoutId) {
        this._send('value', x);
      }
      if (!this._timeoutId) {
        this._timeoutId = setTimeout(this._$later, this._wait);
      }
      if (!this._immediate) {
        this._laterValue = x;
      }
    }
  },
  _handleEnd: function(__, isCurrent) {
    if (isCurrent) {
      this._send('end', null, isCurrent);
    } else {
      if (this._timeoutId && !this._immediate) {
        this._endLater = true;
      } else {
        this._send('end');
      }
    }
  },
  _later: function() {
    var last = now() - this._lastAttempt;
    if (last < this._wait && last >= 0) {
      this._timeoutId = setTimeout(this._$later, this._wait - last);
    } else {
      this._timeoutId = null;
      if (!this._immediate) {
        this._send('value', this._laterValue);
        this._laterValue = null;
      }
      if (this._endLater) {
        this._send('end');
      }
    }
  }
});





// .throttle(wait, {leading, trailing})

withOneSource('throttle', {
  _init: function(args) {
    this._wait = Math.max(0, args[0]);
    this._leading = get(args[1], 'leading', true);
    this._trailing = get(args[1], 'trailing', true);
    this._trailingValue = null;
    this._timeoutId = null;
    this._endLater = false;
    this._lastCallTime = 0;
    var $ = this;
    this._$trailingCall = function() {  $._trailingCall()  };
  },
  _free: function() {
    this._trailingValue = null;
    this._$trailingCall = null;
  },
  _handleValue: function(x, isCurrent) {
    if (isCurrent) {
      this._send('value', x, isCurrent);
    } else {
      var curTime = now();
      if (this._lastCallTime === 0 && !this._leading) {
        this._lastCallTime = curTime;
      }
      var remaining = this._wait - (curTime - this._lastCallTime);
      if (remaining <= 0) {
        this._cancelTraling();
        this._lastCallTime = curTime;
        this._send('value', x);
      } else if (this._trailing) {
        this._cancelTraling();
        this._trailingValue = x;
        this._timeoutId = setTimeout(this._$trailingCall, remaining);
      }
    }
  },
  _handleEnd: function(__, isCurrent) {
    if (isCurrent) {
      this._send('end', null, isCurrent);
    } else {
      if (this._timeoutId) {
        this._endLater = true;
      } else {
        this._send('end');
      }
    }
  },
  _cancelTraling: function() {
    if (this._timeoutId !== null) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  },
  _trailingCall: function() {
    this._send('value', this._trailingValue);
    this._timeoutId = null;
    this._trailingValue = null;
    this._lastCallTime = !this._leading ? 0 : now();
    if (this._endLater) {
      this._send('end');
    }
  }
});





// .delay()

withOneSource('delay', {
  _init: function(args) {
    this._wait = Math.max(0, args[0]);
    this._buff = [];
    var $ = this;
    this._$shiftBuff = function() {  $._send('value', $._buff.shift())  }
  },
  _free: function() {
    this._buff = null;
    this._$shiftBuff = null;
  },
  _handleValue: function(x, isCurrent) {
    if (isCurrent) {
      this._send('value', x, isCurrent);
    } else {
      this._buff.push(x);
      setTimeout(this._$shiftBuff, this._wait);
    }
  },
  _handleEnd: function(__, isCurrent) {
    if (isCurrent) {
      this._send('end', null, isCurrent);
    } else {
      var $ = this;
      setTimeout(function() {  $._send('end')  }, this._wait);
    }
  }
});

// Kefir.fromBinder(fn)

function FromBinder(fn) {
  Stream.call(this);
  this._fn = buildFn(fn, 1);
  this._unsubscribe = null;
}

inherit(FromBinder, Stream, {

  _name: 'fromBinder',

  _onActivation: function() {
    var $ = this
      , unsub
      , isCurrent = true
      , emitter = {
        emit: function(x) {  $._send('value', x, isCurrent)  },
        end: function() {  $._send('end', null, isCurrent)  }
      };
    unsub = this._fn(emitter);
    isCurrent = false;
    if (unsub) {
      this._unsubscribe = buildFn(unsub, 0);
    }
  },
  _onDeactivation: function() {
    if (this._unsubscribe !== null) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  },

  _clear: function() {
    Stream.prototype._clear.call(this);
    this._fn = null;
  }

})

Kefir.fromBinder = function(fn) {
  return new FromBinder(fn);
}






// Kefir.emitter()

function Emitter() {
  Stream.call(this);
}

inherit(Emitter, Stream, {
  _name: 'emitter',
  emit: function(x) {
    this._send('value', x);
    return this;
  },
  end: function() {
    this._send('end');
    return this;
  }
});

Kefir.emitter = function() {
  return new Emitter();
}







// Kefir.never()

var neverObj = new Stream();
neverObj._send('end');
neverObj._name = 'never';
Kefir.never = function() {  return neverObj  }





// Kefir.constant(x)

function Constant(x) {
  Property.call(this);
  this._send('value', x);
  this._send('end');
}

inherit(Constant, Property, {
  _name: 'constant'
})

Kefir.constant = function(x) {
  return new Constant(x);
}


// .setName

Observable.prototype.setName = function(sourceObs, selfName /* or just selfName */) {
  this._name = selfName ? sourceObs._name + '.' + selfName : sourceObs;
  return this;
}



// .mapTo

Observable.prototype.mapTo = function(value) {
  return this.map(function() {  return value  }).setName(this, 'mapTo');
}



// .pluck

Observable.prototype.pluck = function(propertyName) {
  return this.map(function(x) {
    return x[propertyName];
  }).setName(this, 'pluck');
}



// .invoke

Observable.prototype.invoke = function(methodName /*, arg1, arg2... */) {
  var args = rest(arguments, 1);
  return this.map(args ?
    function(x) {  return apply(x[methodName], x, args)  } :
    function(x) {  return x[methodName]()  }
  ).setName(this, 'invoke');
}




// .timestamp

Observable.prototype.timestamp = function() {
  return this.map(function(x) {  return {value: x, time: now()}  }).setName(this, 'timestamp');
}




// .tap

Observable.prototype.tap = function(fn) {
  fn = buildFn(fn, 1);
  return this.map(function(x) {
    fn(x);
    return x;
  }).setName(this, 'tap');
}



// .and

Kefir.and = function(observables) {
  return Kefir.combine(observables, and).setName('and');
}

Observable.prototype.and = function(other) {
  return this.combine(other, and).setName('and');
}



// .or

Kefir.or = function(observables) {
  return Kefir.combine(observables, or).setName('or');
}

Observable.prototype.or = function(other) {
  return this.combine(other, or).setName('or');
}



// .not

Observable.prototype.not = function() {
  return this.map(function(x) {  return !x  }).setName(this, 'not');
}



// .awaiting

Observable.prototype.awaiting = function(other) {
  return Kefir.merge([
    this.mapTo(true),
    other.mapTo(false)
  ]).skipDuplicates().toProperty(false).setName(this, 'awaiting');
}




// .fromCallback

Kefir.fromCallback = function(callbackConsumer) {
  callbackConsumer = buildFn(callbackConsumer, 1);
  var called = false;
  return Kefir.fromBinder(function(emitter) {
    if (!called) {
      callbackConsumer(function(x) {
        emitter.emit(x);
        emitter.end();
      });
      called = true;
    }
  }).setName('fromCallback');
}




// .fromEvent

Kefir.fromEvent = function(target, eventName, transformer) {
  transformer = transformer && Fn(transformer);
  var sub = target.addEventListener || target.addListener || target.bind;
  var unsub = target.removeEventListener || target.removeListener || target.unbind;
  return Kefir.fromBinder(function(emitter) {
    var handler = transformer ?
      function() {
        emitter.emit(transformer.applyWithContext(this, arguments));
      } : emitter.emit;
    sub.call(target, eventName, handler);
    return function() {
      unsub.call(target, eventName, handler);
    }
  }).setName('fromEvent');
}

withTwoSources('filterBy', {

  _handlePrimaryValue: function(x, isCurrent) {
    if (this._lastSecondary !== NOTHING && this._lastSecondary) {
      this._send('value', x, isCurrent);
    }
  },

  _handleSecondaryEnd: function(__, isCurrent) {
    if (this._lastSecondary === NOTHING || !this._lastSecondary) {
      this._send('end', null, isCurrent);
    }
  }

});



withTwoSources('waitFor', {

  _handlePrimaryValue: function(x, isCurrent) {
    if (this._lastSecondary !== NOTHING) {
      this._send('value', x, isCurrent);
    }
  },

  _handleSecondaryValue: function(x) {
    this._lastSecondary = x;
    this._removeSecondary();
  },

  _handleSecondaryEnd: function(__, isCurrent) {
    if (this._lastSecondary === NOTHING) {
      this._send('end', null, isCurrent);
    }
  }

});



withTwoSources('takeWhileBy', {

  _handlePrimaryValue: function(x, isCurrent) {
    if (this._lastSecondary !== NOTHING) {
      this._send('value', x, isCurrent);
    }
  },

  _handleSecondaryValue: function(x, isCurrent) {
    this._lastSecondary = x;
    if (!this._lastSecondary) {
      this._send('end', null, isCurrent);
    }
  },

  _handleSecondaryEnd: function(__, isCurrent) {
    if (this._lastSecondary === NOTHING) {
      this._send('end', null, isCurrent);
    }
  }

});




withTwoSources('skipWhileBy', {

  _handlePrimaryValue: function(x, isCurrent) {
    if (this._lastSecondary !== NOTHING && !this._lastSecondary) {
      this._send('value', x, isCurrent);
    }
  },

  _handleSecondaryValue: function(x, isCurrent) {
    this._lastSecondary = x;
    if (!this._lastSecondary) {
      this._removeSecondary();
    }
  },

  _handleSecondaryEnd: function(__, isCurrent) {
    if (this._lastSecondary === NOTHING || this._lastSecondary) {
      this._send('end', null, isCurrent);
    }
  }

});


  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return Kefir;
    });
    global.Kefir = Kefir;
  } else if (typeof module === "object" && typeof exports === "object") {
    module.exports = Kefir;
    Kefir.Kefir = Kefir;
  } else {
    global.Kefir = Kefir;
  }

}(this));