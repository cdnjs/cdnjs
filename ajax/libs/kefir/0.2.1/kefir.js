/*! kefir - 0.2.1
 *  https://github.com/pozadi/kefir
 */
;(function(global){
  "use strict";

var NOTHING = ['<nothing>'];

function id(x) {return x}

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

function extend(/*target, mixin1, mixin2...*/) {
  var length = arguments.length
    , result, i, prop;
  if (length === 1) {
    return arguments[0];
  }
  result = arguments[0];
  for (i = 1; i < length; i++) {
    for (prop in arguments[i]) {
      if(own(arguments[i], prop)) {
        result[prop] = arguments[i][prop];
      }
    }
  }
  return result;
}

function inherit(Child, Parent/*[, mixin1, mixin2, ...]*/) {
  var length = arguments.length
    , i;
  Child.prototype = createObj(Parent.prototype);
  Child.prototype.constructor = Child;
  for (i = 2; i < length; i++) {
    extend(Child.prototype, arguments[i]);
  }
  return Child;
}

function agrsToArray(args) {
  if (args.length === 1 && isArray(args[0])) {
    return args[0];
  }
  return toArray(args);
}

function getFn(fn, context) {
  if (isFn(fn)) {
    return fn;
  } else {
    if (context == null || !isFn(context[fn])) {
      throw new Error('not a function: ' + fn + ' in ' + context);
    } else {
      return context[fn];
    }
  }
}

function call(fn, context, args) {
  if (context != null) {
    if (!args || args.length === 0) {
      return fn.call(context);
    } else {
      return fn.apply(context, args);
    }
  } else {
    if (!args || args.length === 0) {
      return fn();
    }
    switch (args.length) {
      case 1: return fn(args[0]);
      case 2: return fn(args[0], args[1]);
      case 3: return fn(args[0], args[1], args[2]);
    }
    return fn.apply(null, args);
  }
}

function concat(a, b) {
  var result = new Array(a.length + b.length)
    , j = 0
    , length, i;
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

function cloneArray(input) {
  var length = input.length
    , result = new Array(length)
    , i;
  for (i = 0; i < length; i++) {
    result[i] = input[i];
  }
  return result;
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

function fillArray(arr, value) {
  var length = arr.length
    , i;
  for (i = 0; i < length; i++) {
    arr[i] = value;
  }
}

function contains(arr, value) {
  var length = arr.length
    , i;
  for (i = 0; i < length; i++) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
}

function rest(arr, start, onEmpty) {
  if (arr.length > start) {
    return Array.prototype.slice.call(arr, start);
  }
  return onEmpty;
}

function toArray(arrayLike) {
  if (isArray(arrayLike)) {
    return arrayLike;
  } else {
    return cloneArray(arrayLike);
  }
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

function isArray(xs) {
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

function toStream(obs) {
  if (obs instanceof Stream) {
    return obs;
  } else {
    return obs.changes();
  }
}

function toProperty(obs) {
  if (obs instanceof Stream) {
    return obs.toProperty();
  } else {
    return obs;
  }
}

function withInterval(name, mixin) {

  function AnonymousStream(wait, args) {
    Stream.call(this);
    this._wait = wait;
    this._intervalId = null;
    var _this = this;
    this._bindedOnTick = function() {  _this._onTick()  }
    this._init(args);
  }

  inherit(AnonymousStream, Stream, {

    _name: name,

    _init: function(args) {},
    _free: function() {},

    _onTick: function() {},

    _onActivation: function() {
      this._intervalId = setInterval(this._bindedOnTick, this._wait);
    },
    _onDeactivation: function() {
      if (this._intervalId !== null) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
    },

    _clear: function() {
      Stream.prototype._clear.call(this);
      this._bindedOnTick = null;
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

    _handleAny: function(type, x, isCurrent) {
      switch (type) {
        case 'value': this._handleValue(x, isCurrent); break;
        case 'end': this._handleEnd(x, isCurrent); break;
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



  function AnonymousStream(source, args) {
    Stream.call(this);
    this._source = source;
    this._name = source._name + '.' + name;
    this._init(args);
  }

  inherit(AnonymousStream, Stream, {
    _clear: function() {
      Stream.prototype._clear.call(this);
      this._source = null;
      this._free();
    }
  }, mixin);



  function AnonymousProperty(source, args) {
    Property.call(this);
    this._source = source;
    this._name = source._name + '.' + name;
    this._init(args);
  }

  inherit(AnonymousProperty, Property, {
    _clear: function() {
      Property.prototype._clear.call(this);
      this._source = null;
      this._free();
    }
  }, mixin);



  if (options.streamMethod) {
    Stream.prototype[name] = options.streamMethod(AnonymousStream, AnonymousProperty);
  }

  if (options.propertyMethod) {
    Property.prototype[name] = options.propertyMethod(AnonymousStream, AnonymousProperty);
  }

}



var Kefir = {};





// Fn

function Fn(fnMeta) {
  if (isFn(fnMeta) || (fnMeta instanceof Fn)) {
    return fnMeta;
  }
  if (fnMeta && fnMeta.length) {
    if (fnMeta.length === 1) {
      if (isFn(fnMeta[0])) {
        return fnMeta[0];
      } else {
        throw new Error('can\'t convert to Fn ' + fnMeta);
      }
    }
    this.fn = getFn(fnMeta[0], fnMeta[1]);
    this.context = fnMeta[1];
    this.args = rest(fnMeta, 2, null);
  } else {
    throw new Error('can\'t convert to Fn ' + fnMeta);
  }
}
Kefir.Fn = Fn;

Fn.call = function(fn, args) {
  if (isFn(fn)) {
    return call(fn, null, args);
  } else if (fn instanceof Fn) {
    if (fn.args) {
      if (args) {
        args = concat(fn.args, args);
      } else {
        args = fn.args;
      }
    }
    return call(fn.fn, fn.context, args);
  } else {
    return Fn.call(new Fn(fn), args);
  }
}

Fn.isEqual = function(a, b) {
  if (a === b) {
    return true;
  }
  a = new Fn(a);
  b = new Fn(b);
  if (isFn(a) || isFn(b)) {
    return a === b;
  }
  return a.fn === b.fn &&
    a.context === b.context &&
    isEqualArrays(a.args, b.args);
}




// Subscribers

function Subscribers() {
  this.value = [];
  this.end = [];
  this.any = [];
  this.total = 0;
}

extend(Subscribers.prototype, {
  add: function(type, fn) {
    this[type].push(new Fn(fn));
    this.total++;
  },
  remove: function(type, fn) {
    var subs = this[type]
      , length = subs.length
      , i;
    fn = new Fn(fn);
    for (i = 0; i < length; i++) {
      if (Fn.isEqual(subs[i], fn)) {
        subs.splice(i, 1);
        this.total--;
        return;
      }
    }
  },
  call: function(type, args) {
    var subs = this[type]
      , length = subs.length
      , i;
    if (length !== 0) {
      if (length === 1) {
        Fn.call(subs[0], args);
      } else {
        subs = cloneArray(subs);
        for (i = 0; i < length; i++) {
          Fn.call(subs[i], args);
        }
      }
    }
  },
  isEmpty: function() {
    return this.total === 0;
  }
});





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
      if (!(type === 'end' && isCurrent)) {
        if (type === 'end') {  x = undefined  }
        this._subscribers.call(type, [x, !!isCurrent]);
        this._subscribers.call('any', [type, x, !!isCurrent]);
      }
      if (type === 'end') {  this._clear()  }
    }
  },

  _callWithCurrent: function(fnType, fn, valueType, value) {
    if (fnType === valueType) {
      Fn.call(fn, [value, true]);
    } else if (fnType === 'any') {
      Fn.call(fn, [valueType, value, true]);
    }
  },

  on: function(type, fn) {
    if (this._alive) {
      this._subscribers.add(type, fn);
      this._setActive(true);
    }
    if (!this._alive) {
      this._callWithCurrent(type, fn, 'end');
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

  toString: function() {  return '[' + this._name + ']'  },

  onValue:  function(fn) {  this.on('value', fn)   },
  onEnd:    function(fn) {  this.on('end', fn)     },
  onAny:    function(fn) {  this.on('any', fn)     },

  offValue: function(fn) {  this.off('value', fn)  },
  offEnd:   function(fn) {  this.off('end', fn)    },
  offAny:   function(fn) {  this.off('any', fn)    }

});









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
        if (type === 'end') {  x = undefined  }
        this._subscribers.call(type, [x, false]);
        this._subscribers.call('any', [type, x, false]);
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
      this._callWithCurrent(type, fn, 'value', this._current);
    }
    if (!this._alive) {
      this._callWithCurrent(type, fn, 'end');
    }
    return this;
  }

});






// Log

function logCb(name, type, x, isCurrent) {
  var typeStr = '<' + type + (isCurrent ? ':current' : '') + '>';
  if (type === 'value') {
    console.log(name, typeStr, x);
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
    this._fn = new Fn(args[0]);
    var _this = this;
    this._bindedSend = function(type, x) {  _this._send(type, x)  }
  },
  _free: function() {
    this._fn = null;
    this._bindedSend = null;
  },
  _onTick: function() {
    Fn.call(this._fn, [this._bindedSend]);
  }
});





// Kefir.fromPoll()

withInterval('fromPoll', {
  _init: function(args) {
    this._fn = new Fn(args[0]);
  },
  _free: function() {
    this._fn = null;
  },
  _onTick: function() {
    this._send('value', Fn.call(this._fn));
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

// .merge()

function Merge(sources) {
  Stream.call(this);
  if (sources.length === 0) {
    this._send('end');
  } else {
    this._sources = sources;
    this._aliveCount = 0;
  }
}

inherit(Merge, Stream, {

  _name: 'merge',

  _onActivation: function() {
    var length = this._sources.length,
        i;
    this._aliveCount = length;
    for (i = 0; i < length; i++) {
      this._sources[i].onAny([this._handleAny, this]);
    }
  },

  _onDeactivation: function() {
    var length = this._sources.length,
        i;
    for (i = 0; i < length; i++) {
      this._sources[i].offAny([this._handleAny, this]);
    }
  },

  _handleAny: function(type, x, isCurrent) {
    if (type === 'value') {
      this._send('value', x, isCurrent);
    } else {
      this._aliveCount--;
      if (this._aliveCount === 0) {
        this._send('end', null, isCurrent);
      }
    }
  },

  _clear: function() {
    Stream.prototype._clear.call(this);
    this._sources = null;
  }

});

Kefir.merge = function(sources) {
  return new Merge(sources);
}

Observable.prototype.merge = function(other) {
  return Kefir.merge([this, other]);
}







// .combine()

function Combine(sources, combinator) {
  Property.call(this);
  if (sources.length === 0) {
    this._send('end');
  } else {
    this._combinator = combinator ? new Fn(combinator) : null;
    this._sources = map(sources, toProperty);
    this._aliveCount = 0;
    this._currents = new Array(sources.length);
  }
}

inherit(Combine, Property, {

  _name: 'combine',

  _onActivation: function() {
    var length = this._sources.length,
        i;
    this._aliveCount = length;
    fillArray(this._currents, NOTHING);
    for (i = 0; i < length; i++) {
      this._sources[i].onAny([this._handleAny, this, i]);
    }
  },

  _onDeactivation: function() {
    var length = this._sources.length,
        i;
    for (i = 0; i < length; i++) {
      this._sources[i].offAny([this._handleAny, this, i]);
    }
  },

  _handleAny: function(i, type, x, isCurrent) {
    if (type === 'value') {
      this._currents[i] = x;
      if (!contains(this._currents, NOTHING)) {
        var combined = cloneArray(this._currents);
        if (this._combinator) {
          combined = Fn.call(this._combinator, this._currents);
        }
        this._send('value', combined, isCurrent);
      }
    } else {
      this._aliveCount--;
      if (this._aliveCount === 0) {
        this._send('end', null, isCurrent);
      }
    }
  },

  _clear: function() {
    Property.prototype._clear.call(this);
    this._sources = null;
  }

});

Kefir.combine = function(sources, combinator) {
  return new Combine(sources, combinator);
}

Observable.prototype.combine = function(other, combinator) {
  return Kefir.combine([this, other], combinator);
}






// .sampledBy()

function SampledBy(passive, active, combinator) {
  Stream.call(this);
  if (active.length === 0) {
    this._send('end');
  } else {
    this._passiveCount = passive.length;
    this._combinator = combinator ? new Fn(combinator) : null;
    this._sources = concat(passive, active);
    this._aliveCount = 0;
    this._currents = new Array(this._sources.length);
    fillArray(this._currents, NOTHING);
  }
}

inherit(SampledBy, Stream, {

  _name: 'sampledBy',

  _onActivation: function() {
    var length = this._sources.length,
        i;
    this._aliveCount = length - this._passiveCount;
    for (i = 0; i < length; i++) {
      this._sources[i].onAny([this._handleAny, this, i]);
    }
  },

  _onDeactivation: function() {
    var length = this._sources.length,
        i;
    for (i = 0; i < length; i++) {
      this._sources[i].offAny([this._handleAny, this, i]);
    }
  },

  _handleAny: function(i, type, x, isCurrent) {
    if (type === 'value') {
      this._currents[i] = x;
      if (i >= this._passiveCount) {
        if (!contains(this._currents, NOTHING)) {
          var combined = cloneArray(this._currents);
          if (this._combinator) {
            combined = Fn.call(this._combinator, this._currents);
          }
          this._send('value', combined, isCurrent);
        }
      }
    } else {
      if (i >= this._passiveCount) {
        this._aliveCount--;
        if (this._aliveCount === 0) {
          this._send('end', null, isCurrent);
        }
      }
    }
  },

  _clear: function() {
    Stream.prototype._clear.call(this);
    this._sources = null;
  }

});

Kefir.sampledBy = function(passive, active, combinator) {
  return new SampledBy(passive, active, combinator);
}

Observable.prototype.sampledBy = function(other, combinator) {
  return Kefir.sampledBy([this], [other], combinator);
}






// .pool()

function _AbstractPool() {
  Stream.call(this);
  this._sources = [];
}

inherit(_AbstractPool, Stream, {

  _name: 'abstractPool',

  _sub: function(obs) {
    obs.onValue([this._send, this, 'value']);
    obs.onEnd([this._remove, this, obs]);
  },
  _unsub: function(obs) {
    obs.offValue([this._send, this, 'value']);
    obs.offEnd([this._remove, this, obs]);
  },

  _add: function(obs) {
    this._sources.push(obs);
    if (this._active) {
      this._sub(obs);
    }
  },
  _remove: function(obs) {
    if (this._active) {
      this._unsub(obs);
    }
    for (var i = 0; i < this._sources.length; i++) {
      if (this._sources[i] === obs) {
        this._sources.splice(i, 1);
        return;
      }
    }
  },

  _onActivation: function() {
    var sources = cloneArray(this._sources);
    for (var i = 0; i < sources.length; i++) {
      this._sub(sources[i]);
    }
  },
  _onDeactivation: function() {
    for (var i = 0; i < this._sources.length; i++) {
      this._unsub(this._sources[i]);
    }
  }

});



function Pool() {
  _AbstractPool.call(this);
}

inherit(Pool, _AbstractPool, {

  _name: 'pool',

  add: function(obs) {
    this._add(obs);
    return this;
  },
  remove: function(obs) {
    this._remove(obs);
    return this;
  }

});

Kefir.pool = function() {
  return new Pool();
}





// .flatMap()

function FlatMap(source, fn) {
  _AbstractPool.call(this);
  this._source = source;
  this._name = source._name + '.flatMap';
  this._fn = fn ? new Fn(fn) : null;
  this._mainEnded = false;
}

inherit(FlatMap, _AbstractPool, {

  _onActivation: function() {
    _AbstractPool.prototype._onActivation.call(this);
    this._source.onAny([this._handleMainSource, this]);
  },
  _onDeactivation: function() {
    _AbstractPool.prototype._onDeactivation.call(this);
    this._source.offAny([this._handleMainSource, this]);
  },

  _handleMainSource: function(type, x, isCurrent) {
    if (type === 'value') {
      if (this._fn) {
        x = Fn.call(this._fn, [x]);
      }
      this._add(x);
    } else {
      if (this._sources.length === 0) {
        this._send('end', null, isCurrent);
      } else {
        this._mainEnded = true;
      }
    }
  },

  _remove: function(obs) {
    _AbstractPool.prototype._remove.call(this, obs);
    if (this._mainEnded && this._sources.length === 0) {
      this._send('end');
    }
  },

  _clear: function() {
    _AbstractPool.prototype._clear.call(this);
    this._source = null;
  }

});

Observable.prototype.flatMap = function(fn) {
  return new FlatMap(this, fn);
}







// .flatMapLatest()
// TODO


// .toProperty()

withOneSource('toProperty', {
  _init: function(args) {
    if (args.length > 0) {
      this._send('value', args[0]);
    }
  }
}, {
  propertyMethod: null,
  streamMethod: function(StreamClass, PropertyClass) {
    return function() {  return new PropertyClass(this, arguments)  }
  }
});




// .changes()

withOneSource('changes', {
  _handleValue: function(x, isCurrent) {
    if (!isCurrent) {
      this._send('value', x);
    }
  }
}, {
  streamMethod: null,
  propertyMethod: function(StreamClass, PropertyClass) {
    return function() {  return new StreamClass(this)  }
  }
});




// .withHandler()

withOneSource('withHandler', {
  _init: function(args) {
    var _this = this;
    this._handler = new Fn(args[0]);
    this._bindedSend = function(type, x, isCurrent) {  _this._send(type, x, isCurrent)  }
  },
  _free: function() {
    this._handler = null;
    this._bindedSend = null;
  },
  _handleAny: function(type, x, isCurrent) {
    Fn.call(this._handler, [this._bindedSend, type, x, isCurrent]);
  }
});





// .map(fn)

withOneSource('map', {
  _init: function(args) {
    this._fn = new Fn(args[0]);
  },
  _free: function() {
    this._fn = null;
  },
  _handleValue: function(x, isCurrent) {
    this._send('value', Fn.call(this._fn, [x]), isCurrent);
  }
});





// .filter(fn)

withOneSource('filter', {
  _init: function(args) {
    this._fn = new Fn(args[0]);
  },
  _free: function() {
    this._fn = null;
  },
  _handleValue: function(x, isCurrent) {
    if (Fn.call(this._fn, [x])) {
      this._send('value', x, isCurrent);
    }
  }
});





// .takeWhile(fn)

withOneSource('takeWhile', {
  _init: function(args) {
    this._fn = new Fn(args[0]);
  },
  _free: function() {
    this._fn = null;
  },
  _handleValue: function(x, isCurrent) {
    if (Fn.call(this._fn, [x])) {
      this._send('value', x, isCurrent);
    } else {
      this._send('end', null, isCurrent);
    }
  }
});





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
      this._send('end');
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

function strictlyEqual(a, b) {  return a === b  }

withOneSource('skipDuplicates', {
  _init: function(args) {
    if (args.length > 0) {
      this._fn = new Fn(args[0]);
    } else {
      this._fn = strictlyEqual;
    }
    this._prev = NOTHING;
  },
  _free: function() {
    this._fn = null;
    this._prev = null;
  },
  _handleValue: function(x, isCurrent) {
    if (this._prev === NOTHING || !Fn.call(this._fn, [this._prev, x])) {
      this._send('value', x, isCurrent);
    }
    this._prev = x;
  }
});





// .skipWhile(fn)

withOneSource('skipWhile', {
  _init: function(args) {
    this._fn = new Fn(args[0]);
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
    if (!Fn.call(this._fn, [x])) {
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
    this._fn = new Fn(rest(args, 1));
  },
  _free: function() {
    this._prev = null;
    this._fn = null;
  },
  _handleValue: function(x, isCurrent) {
    this._send('value', Fn.call(this._fn, [this._prev, x]), isCurrent);
    this._prev = x;
  }
});





// .scan(seed, fn)

withOneSource('scan', {
  _init: function(args) {
    this._prev = args[0];
    this._fn = new Fn(rest(args, 1));
  },
  _free: function() {
    this._prev = null;
    this._fn = null;
  },
  _handleValue: function(x, isCurrent) {
    this._prev = Fn.call(this._fn, [this._prev, x]);
    this._send('value', this._prev, isCurrent);
  }
});





// .reduce(seed, fn)

withOneSource('reduce', {
  _init: function(args) {
    this._result = args[0];
    this._fn = new Fn(rest(args, 1));
  },
  _free: function(){
    this._fn = null;
    this._result = null;
  },
  _handleValue: function(x) {
    this._result = Fn.call(this._fn, [this._result, x]);
  },
  _handleEnd: function(__, isCurrent) {
    this._send('value', this._result, isCurrent);
    this._send('end', null, isCurrent);
  }
});





// .throttle(wait, {leading, trailing})

withOneSource('throttle', {
  _init: function(args) {
    this._wait = args[0];
    this._leading = get(args[1], 'leading', true);
    this._trailing = get(args[1], 'trailing', true);
    this._trailingCallValue = null;
    this._trailingCallTimeoutId = null;
    this._endAfterTrailingCall = false;
    this._lastCallTime = 0;
    var _this = this;
    this._makeTrailingCallBinded = function() {  _this._makeTrailingCall()  };
  },
  _free: function() {
    this._trailingCallValue = null;
    this._makeTrailingCallBinded = null;
  },
  _handleValue: function(x, isCurrent) {
    if (isCurrent) {
      this._send('value', x, isCurrent);
      return;
    }
    var curTime = now();
    if (this._lastCallTime === 0 && !this._leading) {
      this._lastCallTime = curTime;
    }
    var remaining = this._wait - (curTime - this._lastCallTime);
    if (remaining <= 0) {
      this._cancelTralingCall();
      this._lastCallTime = curTime;
      this._send('value', x);
    } else if (this._trailing) {
      this._scheduleTralingCall(x, remaining);
    }
  },
  _handleEnd: function(__, isCurrent) {
    if (isCurrent) {
      this._send('end', null, isCurrent);
      return;
    }
    if (this._trailingCallTimeoutId) {
      this._endAfterTrailingCall = true;
    } else {
      this._send('end');
    }
  },
  _scheduleTralingCall: function(value, wait) {
    if (this._trailingCallTimeoutId) {
      this._cancelTralingCall();
    }
    this._trailingCallValue = value;
    this._trailingCallTimeoutId = setTimeout(this._makeTrailingCallBinded, wait);
  },
  _cancelTralingCall: function() {
    if (this._trailingCallTimeoutId !== null) {
      clearTimeout(this._trailingCallTimeoutId);
      this._trailingCallTimeoutId = null;
    }
  },
  _makeTrailingCall: function() {
    this._send('value', this._trailingCallValue);
    this._trailingCallTimeoutId = null;
    this._trailingCallValue = null;
    this._lastCallTime = !this._leading ? 0 : now();
    if (this._endAfterTrailingCall) {
      this._send('end');
    }
  }
});






// .delay()

withOneSource('delay', {
  _init: function(args) {
    this._wait = args[0];
  },
  _handleValue: function(x, isCurrent) {
    if (isCurrent) {
      this._send('value', x, isCurrent);
      return;
    }
    var _this = this;
    setTimeout(function() {  _this._send('value', x)  }, this._wait);
  },
  _handleEnd: function(__, isCurrent) {
    if (isCurrent) {
      this._send('end', null, isCurrent);
      return;
    }
    var _this = this;
    setTimeout(function() {  _this._send('end')  }, this._wait);
  }
});

// Kefir.fromBinder(fn)

function FromBinder(fn) {
  Stream.call(this);
  this._fn = new Fn(fn);
  this._unsubscribe = null;
}

inherit(FromBinder, Stream, {

  _name: 'fromBinder',

  _onActivation: function() {
    var _this = this;
    this._unsubscribe = Fn.call(this._fn, [
      function(type, x) {  _this._send(type, x)  }
    ]);
  },
  _onDeactivation: function() {
    if (isFn(this._unsubscribe)) {
      this._unsubscribe();
    }
    this._unsubscribe = null;
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
  emit: function(x) {  this._send('value', x)  },
  end: function() {  this._send('end')  }
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

function ConstantProperty(x) {
  Property.call(this);
  this._send('value', x);
  this._send('end');
}

inherit(ConstantProperty, Property, {
  _name: 'constant'
})

Kefir.constant = function(x) {
  return new ConstantProperty(x);
}


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