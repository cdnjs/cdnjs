/*! kefir - 0.1.12
 *  https://github.com/pozadi/kefir
 */
(function(global){
  "use strict";

function noop() {}

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

function toArray(arrayLike) {
  if (isArray(arrayLike)) {
    return arrayLike;
  } else {
    return Array.prototype.slice.call(arrayLike);
  }
}

function createObj(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F();
}

function extend(/*target, mixin1, mixin2...*/) {
  if (arguments.length === 1) {
    return arguments[0];
  }
  var result = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    for (var prop in arguments[i]) {
      if(own(arguments[i], prop)) {
        result[prop] = arguments[i][prop];
      }
    }
  }
  return result;
}

function inherit(Child, Parent/*[, mixin1, mixin2, ...]*/) {
  Child.prototype = createObj(Parent.prototype);
  Child.prototype.constructor = Child;
  for (var i = 2; i < arguments.length; i++) {
    extend(Child.prototype, arguments[i]);
  }
  return Child;
}

function inheritMixin(Child, Parent) {
  for (var prop in Parent) {
    if (own(Parent, prop) && !(prop in Child)) {
      Child[prop] = Parent[prop];
    }
  }
  return Child;
}

function agrsToArray(args) {
  if (args.length === 1 && isArray(args[0])) {
    return args[0];
  }
  return toArray(args);
}

function rest(arr, start, onEmpty) {
  if (arr.length > start) {
    return Array.prototype.slice.call(arr, start);
  }
  return onEmpty;
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
  if (a == null && b == null) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

var now = Date.now ?
  function() { return Date.now() } :
  function() { return new Date().getTime() };

var Kefir = {};



// Special values

var NOTHING = Kefir.NOTHING = ['<nothing>'];
var END = Kefir.END = ['<end>'];
var NO_MORE = Kefir.NO_MORE = ['<no more>'];

var BunchOfValues = function(values) {
  this.values = values;
}
Kefir.bunch = function() {
  return new BunchOfValues(agrsToArray(arguments));
}

var KefirError = function(error) {
  this.error = error;
}
Kefir.error = function(error) {
  return new KefirError(error);
}




// Callable

function Callable(fnMeta) {
  if (isFn(fnMeta) || (fnMeta instanceof Callable)) {
    return fnMeta;
  }
  if (fnMeta && fnMeta.length) {
    if (fnMeta.length === 1) {
      if (isFn(fnMeta[0])) {
        return fnMeta[0];
      } else {
        throw new Error('can\'t convert to Callable ' + fnMeta);
      }
    }
    this.fn = getFn(fnMeta[0], fnMeta[1]);
    this.context = fnMeta[1];
    this.args = rest(fnMeta, 2, null);
  } else {
    throw new Error('can\'t convert to Callable ' + fnMeta);
  }
}


function callFast(fn, context, args) {
  if (context != null) {
    if (!args || args.length === 0) {
      return fn.call(context);
    } else {
      return fn.apply(context, args);
    }
  } else {
    if (!args || args.length === 0) {
      return fn();
    } else if (args.length === 1) {
      return fn(args[0]);
    } else if (args.length === 2) {
      return fn(args[0], args[1]);
    } else if (args.length === 3) {
      return fn(args[0], args[1], args[2]);
    }
    return fn.apply(null, args);
  }
}

Callable.call = function(callable, args) {
  if (isFn(callable)) {
    return callFast(callable, null, args);
  } else if (callable instanceof Callable) {
    if (callable.args) {
      if (args) {
        args = callable.args.concat(toArray(args));
      } else {
        args = callable.args;
      }
    }
    return callFast(callable.fn, callable.context, args);
  } else {
    return Callable.call(new Callable(callable), args);
  }
}

Callable.isEqual = function(a, b) {
  if (a === b) {
    return true;
  }
  a = new Callable(a);
  b = new Callable(b);
  if (isFn(a) || isFn(b)) {
    return a === b;
  }
  return a.fn === b.fn &&
    a.context === b.context &&
    isEqualArrays(a.args, b.args);
}







// Observable

var Observable = Kefir.Observable = function Observable(onFirstIn, onLastOut) {

  // __onFirstIn, __onLastOut can also be added to prototype of child classes
  if (isFn(onFirstIn)) {
    this.__onFirstIn = onFirstIn;
  }
  if (isFn(onLastOut)) {
    this.__onLastOut = onLastOut;
  }

  this.__subscribers = {
    value: null,
    error: null,
    both: null,
    end: null
  };

  this.alive = true;
  this.active = false;

}

inherit(Observable, Object, {

  __ClassName: 'Observable',

  toString: function() {
    return '[' + this.__ClassName + (this.__objName ? (' | ' + this.__objName) : '') + ']';
  },

  __onFirstIn: noop,
  __onLastOut: noop,

  __addSubscriber: function(type, fnMeta) {
    if (this.__subscribers[type] === null) {
      this.__subscribers[type] = [];
    }
    this.__subscribers[type].push(new Callable(fnMeta));
  },

  __removeSubscriber: function(type, fnMeta) {
    var subs = this.__subscribers[type];
    if (subs !== null) {
      var callable = new Callable(fnMeta);
      for (var i = 0; i < subs.length; i++) {
        if (Callable.isEqual(subs[i], callable)) {
          subs.splice(i, 1);
          return;
        }
      }
    }
  },

  __on: function(type, fnMeta) {
    if (this.alive) {
      this.__addSubscriber(type, fnMeta);
      if (!this.active && type !== 'end') {
        this.active = true;
        this.__onFirstIn();
      }
    } else if (type === 'end') {
      Callable.call(fnMeta);
    }
  },
  __off: function(type, fnMeta) {
    if (this.alive) {
      this.__removeSubscriber(type, fnMeta);
      if (this.active && type !== 'end' && !this.__hasSubscribers()) {
        this.active = false;
        this.__onLastOut();
      }
    }
  },
  __send: function(type, x) {
    var i, l, subs, args;
    if (this.alive) {
      if (type === 'end') {
        subs = this.__subscribers.end;
        if (subs !== null) {
          subs = subs.slice(0);
          for (i = 0, l = subs.length; i < l; i++) {
            Callable.call(subs[i]);
          }
        }
        this.__clear();
      } else if (this.active) {
        subs = (type === 'value') ? this.__subscribers.value : this.__subscribers.error;
        if (subs !== null) {
          subs = subs.slice(0);
          args = [x];
          for (i = 0, l = subs.length; i < l; i++) {
            if (Callable.call(subs[i], args) === NO_MORE) {
              this.__off(type, subs[i]);
            }
          }
        }
        subs = this.__subscribers.both;
        if (subs !== null) {
          subs = subs.slice(0);
          args = [type, x];
          for (i = 0, l = subs.length; i < l; i++) {
            if (Callable.call(subs[i], args) === NO_MORE) {
              this.__off('both', subs[i]);
            }
          }
        }
      }
    }
  },
  __hasSubscribers: function() {
    var s = this.__subscribers;
    return (s.value !== null && s.value.length > 0) ||
      (s.error !== null && s.error.length > 0) ||
      (s.both !== null && s.both.length > 0);
  },
  __clear: function() {
    if (this.active) {
      this.active = false;
      this.__onLastOut();
    }
    if (own(this, '__onFirstIn')) {
      this.__onFirstIn = null;
    }
    if (own(this, '__onLastOut')) {
      this.__onLastOut = null;
    }
    this.__subscribers = null;
    this.alive = false;
  },


  __sendValue: function(x) {
    this.__send('value', x);
    return this;
  },
  __sendError: function(x) {
    this.__send('error', x);
    return this;
  },
  __sendEnd: function() {
    this.__send('end');
    return this;
  },
  __sendAny: function(x) {
    if (x === NOTHING) {  return this  }
    if (x === END) {  this.__sendEnd(); return this  }
    if (x instanceof KefirError) {  this.__sendError(x.error); return this  }
    if (x instanceof BunchOfValues) {
      for (var i = 0; i < x.values.length; i++) {
        this.__sendAny(x.values[i]);
      }
      return this;
    }
    this.__sendValue(x);
    return this;
  },


  onValue: function() {
    this.__on('value', arguments);
    return this;
  },
  offValue: function() {
    this.__off('value', arguments);
    return this;
  },
  onError: function() {
    this.__on('error', arguments);
    return this;
  },
  offError: function() {
    this.__off('error', arguments);
    return this;
  },
  onBoth: function() {
    this.__on('both', arguments);
    return this;
  },
  offBoth: function() {
    this.__off('both', arguments);
    return this;
  },
  onEnd: function() {
    this.__on('end', arguments);
    return this;
  },
  offEnd: function() {
    this.__off('end', arguments);
    return this;
  },

  // for same interface as in Property
  onNewValue: function() {
    return this.onValue.apply(this, arguments);
  },
  onNewBoth: function() {
    return this.onBoth.apply(this, arguments);
  },
  changes: function() {
    return this;
  },

  isEnded: function() {
    return !this.alive;
  }


})




// Stream

var Stream = Kefir.Stream = function Stream() {
  Observable.apply(this, arguments);
}

inherit(Stream, Observable, {
  __ClassName: 'Stream'
})




// Property

var Property = Kefir.Property = function Property(onFirstIn, onLastOut, initial) {
  Observable.call(this, onFirstIn, onLastOut);
  this.__cached = isUndefined(initial) ? NOTHING : initial;
}

inherit(Property, Observable, {

  __ClassName: 'Property',

  hasValue: function() {
    return this.__cached !== NOTHING;
  },
  getValue: function() {
    return this.__cached;
  },

  __sendValue: function(x) {
    if (this.alive) {
      this.__cached = x;
    }
    Observable.prototype.__sendValue.call(this, x);
  },
  onNewValue: function() {
    this.__on('value', arguments);
    return this;
  },
  onValue: function() {
    if (this.hasValue()) {
      Callable.call(arguments, [this.getValue()]);
    }
    return this.onNewValue.apply(this, arguments);
  },
  onNewBoth: function() {
    this.__on('both', arguments);
    return this;
  },
  onBoth: function() {
    if (this.hasValue()) {
      Callable.call(arguments, ['value', this.getValue()]);
    }
    return this.onNewBoth.apply(this, arguments);
  }

})



// Log

var logHelper = function(name, type, x) {
  console.log(name, type, x);
}

Observable.prototype.log = function(name) {
  if (name == null) {
    name = this.toString();
  }
  this.onValue(logHelper, null, name, '<value>');
  this.onError(logHelper, null, name, '<error>');
  this.onEnd(logHelper, null, name, '<end>');
  return this;
}

// TODO
//
// Kefir.constant(x)
// Kefir.fromArray(values)
// Kefir.fromCallback(fn)
// Kefir.fromNodeCallback(fn)
// Kefir.fromPromise(promise)



// Kefir.never()

var neverObj = new Stream();
neverObj.__sendEnd();
neverObj.__objName = 'Kefir.never()'
Kefir.never = function() {  return neverObj  }




// Kefir.once(x)

var OnceStream = function OnceStream(value) {
  Stream.call(this);
  this.__value = value;
}

inherit(OnceStream, Stream, {

  __ClassName: 'OnceStream',
  onValue: function() {
    if (this.alive) {
      Callable.call(arguments, [this.__value]);
      this.__value = null;
      this.__sendEnd();
    }
    return this;
  },
  onBoth: function() {
    if (this.alive) {
      Callable.call(arguments, ['value', this.__value]);
      this.__value = null;
      this.__sendEnd();
    }
    return this;
  },
  onError: noop

})

Kefir.once = function(x) {
  return new OnceStream(x);
}





// Kefir.fromBinder(fn)

var FromBinderStream = function FromBinderStream(subscribeFnMeta) {
  Stream.call(this);
  this.__subscribeFn = new Callable(subscribeFnMeta);
}

inherit(FromBinderStream, Stream, {

  __ClassName: 'FromBinderStream',
  __onFirstIn: function() {
    var _this = this;
    this.__unsubscribe = Callable.call(this.__subscribeFn, [function(x) {
      _this.__sendAny(x);
    }]);
  },
  __onLastOut: function() {
    if (isFn(this.__unsubscribe)) {
      this.__unsubscribe();
    }
    this.__unsubscribe = null;
  },
  __clear: function() {
    Stream.prototype.__clear.call(this);
    this.__subscribeFn = null;
  }

})

Kefir.fromBinder = function(/*subscribe[, context[, arg1, arg2...]]*/) {
  return new FromBinderStream(arguments);
}

var WithSourceStreamMixin = {
  __Constructor: function(source) {
    this.__source = source;
    source.onEnd(this.__sendEnd, this);
    if (source instanceof Property && this instanceof Property && source.hasValue()) {
      this.__handle(source.getValue());
    }
  },
  __handle: function(x) {
    this.__sendAny(x);
  },
  __handleBoth: function(type, x) {
    if (type === 'value') {
      this.__handle(x);
    } else {
      this.__sendError(x);
    }
  },
  __onFirstIn: function() {
    this.__source.onNewBoth(this.__handleBoth, this);
  },
  __onLastOut: function() {
    this.__source.offBoth(this.__handleBoth, this);
  },
  __clear: function() {
    Observable.prototype.__clear.call(this);
    this.__source = null;
  }
}





// observable.toProperty([initial])

var PropertyFromStream = function PropertyFromStream(source, initial) {
  Property.call(this, null, null, initial);
  this.__Constructor(source);
}

inherit(PropertyFromStream, Property, WithSourceStreamMixin, {
  __ClassName: 'PropertyFromStream'
})

Stream.prototype.toProperty = function(initial) {
  return new PropertyFromStream(this, initial);
}

Property.prototype.toProperty = function(initial) {
  if (isUndefined(initial)) {
    return this
  } else {
    var prop = new PropertyFromStream(this);
    prop.__sendValue(initial);
    return prop;
  }
}






// .scan(seed, fn)

var ScanProperty = function ScanProperty(source, seed, fnMeta) {
  Property.call(this, null, null, seed);
  this.__fn = new Callable(fnMeta);
  this.__Constructor(source);
}

inherit(ScanProperty, Property, WithSourceStreamMixin, {

  __ClassName: 'ScanProperty',

  __handle: function(x) {
    this.__sendValue(Callable.call(this.__fn, [this.getValue(), x]));
  },
  __clear: function() {
    WithSourceStreamMixin.__clear.call(this);
    this.__fn = null;
  }

})

Observable.prototype.scan = function(seed/*fn[, context[, arg1, arg2, ...]]*/) {
  return new ScanProperty(this, seed, rest(arguments, 1));
}




// .reduce(seed, fn)

var ReducedProperty = function ReducedProperty(source, seed, fnMeta) {
  Property.call(this);
  this.__fn = new Callable(fnMeta);
  this.__result = seed;
  source.onEnd('__sendResult', this);
  this.__Constructor(source);
}

inherit(ReducedProperty, Property, WithSourceStreamMixin, {

  __ClassName: 'ReducedProperty',

  __handle: function(x) {
    this.__result = Callable.call(this.__fn, [this.__result, x]);
  },
  __sendResult: function() {
    this.__sendValue(this.__result);
  },
  __clear: function() {
    WithSourceStreamMixin.__clear.call(this);
    this.__fn = null;
    this.__result = null;
  }

});

Observable.prototype.reduce = function(seed/*fn[, context[, arg1, arg2, ...]]*/) {
  return new ReducedProperty(this, seed, rest(arguments, 1));
}




// .map(fn)

var MapMixin = {
  __Constructor: function(source, mapFnMeta) {
    if (this instanceof Property) {
      Property.call(this);
    } else {
      Stream.call(this);
    }
    this.__mapFn = mapFnMeta && new Callable(mapFnMeta);
    WithSourceStreamMixin.__Constructor.call(this, source);
  },
  __handle: function(x) {
    this.__sendAny(
      this.__mapFn ? Callable.call(this.__mapFn, [x]) : x
    );
  },
  __clear: function() {
    WithSourceStreamMixin.__clear.call(this);
    this.__mapFn = null;
  }
}
inheritMixin(MapMixin, WithSourceStreamMixin);

var MappedStream = function MappedStream() {
  this.__Constructor.apply(this, arguments);
}

inherit(MappedStream, Stream, MapMixin, {
  __ClassName: 'MappedStream'
});

var MappedProperty = function MappedProperty() {
  this.__Constructor.apply(this, arguments);
}

inherit(MappedProperty, Property, MapMixin, {
  __ClassName: 'MappedProperty'
})

Stream.prototype.map = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  return new MappedStream(this, arguments);
}

Property.prototype.map = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  return new MappedProperty(this, arguments);
}




// property.changes()

Property.prototype.changes = function() {
  return new MappedStream(this);
}




// .diff(seed, fn)

Observable.prototype.diff = function(start/*fn[, context[, arg1, arg2, ...]]*/) {
  var fn = new Callable(rest(arguments, 1));
  var prev = start;
  return this.map(function(x) {
    var result = Callable.call(fn, [prev, x]);
    prev = x;
    return result;
  });
}





// .filter(fn)

Observable.prototype.filter = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  var fn = new Callable(arguments);
  return this.map(function(x) {
    if (Callable.call(fn, [x])) {
      return x;
    } else {
      return NOTHING;
    }
  });
}




// .takeWhile(fn)

Observable.prototype.takeWhile = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  var fn = new Callable(arguments);
  return this.map(function(x) {
    if (Callable.call(fn, [x])) {
      return x;
    } else {
      return END;
    }
  });
}




// .take(n)

Observable.prototype.take = function(n) {
  return this.map(function(x) {
    if (n <= 0) {
      return END;
    }
    if (n === 1) {
      return Kefir.bunch(x, END);
    }
    n--;
    return x;
  });
}




// .skip(n)

Observable.prototype.skip = function(n) {
  return this.map(function(x) {
    if (n <= 0) {
      return x;
    } else {
      n--;
      return NOTHING;
    }
  });
}





// .skipDuplicates([fn])

Observable.prototype.skipDuplicates = function(fn) {
  var prev = NOTHING;
  return this.map(function(x) {
    var result;
    if (prev !== NOTHING && (fn ? fn(prev, x) : prev === x)) {
      result = NOTHING;
    } else {
      result = x;
    }
    prev = x;
    return result;
  });
}





// .skipWhile(fn)

Observable.prototype.skipWhile = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  var fn = new Callable(arguments);
  var skip = true;
  return this.map(function(x) {
    if (skip && Callable.call(fn, [x])) {
      return NOTHING;
    } else {
      skip = false;
      return x;
    }
  });
}

// TODO
//
// observable.filter(property)
// observable.takeWhile(property)
// observable.skipWhile(property)
//
// observable.awaiting(otherObservable)
// stream.skipUntil(stream2)




// .sampledBy(observable, fn)

var SampledByMixin = {
  __Constructor: function(main, sampler, fnMeta) {
    if (this instanceof Property) {
      Property.call(this);
    } else {
      Stream.call(this);
    }
    this.__transformer = fnMeta && (new Callable(fnMeta));
    this.__mainStream = main;
    this.__lastValue = NOTHING;
    if (main instanceof Property && main.hasValue()) {
      this.__lastValue = main.getValue();
    }
    WithSourceStreamMixin.__Constructor.call(this, sampler);
  },
  __handle: function(y) {
    if (this.__lastValue !== NOTHING) {
      var x = this.__lastValue;
      if (this.__transformer) {
        x = Callable.call(this.__transformer, [x, y]);
      }
      this.__sendValue(x);
    }
  },
  __handleMainBoth: function(type, x) {
    if (type === 'value') {
      this.__lastValue = x;
    } else {
      this.__sendError(x);
    }
  },
  __onFirstIn: function() {
    WithSourceStreamMixin.__onFirstIn.call(this);
    this.__mainStream.onBoth(this.__handleMainBoth, this);
  },
  __onLastOut: function() {
    WithSourceStreamMixin.__onLastOut.call(this);
    this.__mainStream.offBoth(this.__handleMainBoth, this);
  },
  __clear: function() {
    WithSourceStreamMixin.__clear.call(this);
    this.__lastValue = null;
    this.__fn = null;
    this.__mainStream = null;
  }
}

inheritMixin(SampledByMixin, WithSourceStreamMixin);

var SampledByStream = function SampledByStream() {
  this.__Constructor.apply(this, arguments);
}

inherit(SampledByStream, Stream, SampledByMixin, {
  __ClassName: 'SampledByStream'
})

var SampledByProperty = function SampledByProperty() {
  this.__Constructor.apply(this, arguments);
}

inherit(SampledByProperty, Property, SampledByMixin, {
  __ClassName: 'SampledByProperty'
})

Observable.prototype.sampledBy = function(observable/*fn[, context[, arg1, arg2, ...]]*/) {
  if (observable instanceof Stream) {
    return new SampledByStream(this, observable, rest(arguments, 1));
  } else {
    return new SampledByProperty(this, observable, rest(arguments, 1));
  }
}

// TODO
//
// observable.flatMapFirst(f)
//
// observable.zip(other, f)
//
// observable.awaiting(otherObservable)
//
// stream.concat(otherStream)




var PluggableMixin = {

  __initPluggable: function() {
    this.__plugged = [];
  },
  __clearPluggable: function() {
    this.__plugged = null;
  },
  __handlePluggedBoth: function(type, value) {
    if (type === 'value') {
      this.__sendAny(value);
    } else {
      this.__sendError(value);
    }
  },
  __plug: function(stream) {
    if (this.alive) {
      this.__plugged.push(stream);
      if (this.active) {
        stream.onBoth(this.__handlePluggedBoth, this);
      }
      stream.onEnd('__unplug', this, stream);
    }
  },
  __unplug: function(stream) {
    if (this.alive) {
      for (var i = 0; i < this.__plugged.length; i++) {
        if (stream === this.__plugged[i]) {
          stream.offBoth(this.__handlePluggedBoth, this);
          stream.offEnd('__unplug', this, stream);
          this.__plugged.splice(i, 1);
          return;
        }
      }
    }
  },
  __onFirstIn: function() {
    for (var i = 0; i < this.__plugged.length; i++) {
      var stream = this.__plugged[i];
      if (stream) {
        stream.onBoth(this.__handlePluggedBoth, this);
      }
    }
  },
  __onLastOut: function() {
    for (var i = 0; i < this.__plugged.length; i++) {
      var stream = this.__plugged[i];
      if (stream) {
        stream.offBoth(this.__handlePluggedBoth, this);
      }
    }
  },
  __hasNoPlugged: function() {
    return !this.alive || this.__plugged.length === 0;
  }

}





// Kefir.bus()

var Bus = function Bus() {
  Stream.call(this);
  this.__initPluggable();
}

inherit(Bus, Stream, PluggableMixin, {

  __ClassName: 'Bus',

  push: function(x) {
    this.__sendAny(x);
    return this;
  },
  error: function(e) {
    this.__sendError(e);
    return this;
  },
  plug: function(stream) {
    this.__plug(stream);
    return this;
  },
  unplug: function(stream) {
    this.__unplug(stream);
    return this;
  },
  end: function() {
    this.__sendEnd();
    return this;
  },
  __clear: function() {
    Stream.prototype.__clear.call(this);
    this.__clearPluggable();
  }

});

Kefir.bus = function() {
  return new Bus();
}





// .flatMap()

var FlatMappedStream = function FlatMappedStream(sourceStream, mapFnMeta) {
  Stream.call(this);
  this.__initPluggable();
  this.__sourceStream = sourceStream;
  this.__mapFn = new Callable(mapFnMeta);
  sourceStream.onEnd(this.__onSourceEnds, this);
}

inherit(FlatMappedStream, Stream, PluggableMixin, {

  __ClassName: 'FlatMappedStream',

  __onSourceEnds: function() {
    if (this.__hasNoPlugged()) {
      this.__sendEnd();
    }
  },
  __plugResult: function(x) {
    this.__plug(Callable.call(this.__mapFn, [x]));
  },
  __hadleSourceBoth: function(type, x) {
    if (type === 'value') {
      this.__plugResult(x);
    } else {
      this.__sendError(x);
    }
  },
  __onFirstIn: function() {
    this.__sourceStream.onBoth(this.__hadleSourceBoth, this);
    PluggableMixin.__onFirstIn.call(this);
  },
  __onLastOut: function() {
    this.__sourceStream.offBoth(this.__hadleSourceBoth, this);
    PluggableMixin.__onLastOut.call(this);
  },
  __unplug: function(stream) {
    PluggableMixin.__unplug.call(this, stream);
    if (this.alive && this.__sourceStream.isEnded() && this.__hasNoPlugged()) {
      this.__sendEnd();
    }
  },
  __clear: function() {
    Stream.prototype.__clear.call(this);
    this.__clearPluggable();
    this.__sourceStream = null;
    this.__mapFn = null;
  }

})

Observable.prototype.flatMap = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  return new FlatMappedStream(this, arguments);
};




// .flatMapLatest()

var FlatMapLatestStream = function FlatMapLatestStream() {
  FlatMappedStream.apply(this, arguments);
}

inherit(FlatMapLatestStream, FlatMappedStream, {

  __ClassName: 'FlatMapLatestStream',

  __plugResult: function(x) {
    if (this.__plugged.length === 1) {
      this.__unplug(this.__plugged[0]);
    }
    FlatMappedStream.prototype.__plugResult.call(this, x);
  }

})

Observable.prototype.flatMapLatest = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  return new FlatMapLatestStream(this, arguments);
};




// .merge()

var MergedStream = function MergedStream() {
  Stream.call(this);
  this.__initPluggable();
  var sources = agrsToArray(arguments);
  for (var i = 0; i < sources.length; i++) {
    this.__plug(sources[i]);
  }
}

inherit(MergedStream, Stream, PluggableMixin, {

  __ClassName: 'MergedStream',

  __clear: function() {
    Stream.prototype.__clear.call(this);
    this.__clearPluggable();
  },
  __unplug: function(stream) {
    PluggableMixin.__unplug.call(this, stream);
    if (this.__hasNoPlugged()) {
      this.__sendEnd();
    }
  }

});

Kefir.merge = function() {
  return new MergedStream(agrsToArray(arguments));
}

Observable.prototype.merge = function() {
  return Kefir.merge([this].concat(agrsToArray(arguments)));
}









// .combine()

var CombinedStream = function CombinedStream(sources, mapFnMeta) {
  Stream.call(this);
  this.__plugged = sources;
  for (var i = 0; i < this.__plugged.length; i++) {
    sources[i].onEnd(this.__unplugById, this, i);
  }
  this.__cachedValues = new Array(sources.length);
  this.__hasValue = new Array(sources.length);
  this.__mapFn = mapFnMeta && new Callable(mapFnMeta);
}

inherit(CombinedStream, Stream, {

  __ClassName: 'CombinedStream',

  __onFirstIn: function() {
    for (var i = 0; i < this.__plugged.length; i++) {
      var stream = this.__plugged[i];
      if (stream) {
        stream.onBoth(this.__handlePluggedBoth, this, i);
      }
    }
  },
  __onLastOut: function() {
    for (var i = 0; i < this.__plugged.length; i++) {
      var stream = this.__plugged[i];
      if (stream) {
        stream.offBoth(this.__handlePluggedBoth, this, i);
      }
    }
  },
  __hasNoPlugged: function() {
    if (!this.alive) {
      return true;
    }
    for (var i = 0; i < this.__plugged.length; i++) {
      if (this.__plugged[i]) {
        return false;
      }
    }
    return true;
  },
  __unplugById: function(i) {
    var stream = this.__plugged[i];
    if (stream) {
      this.__plugged[i] = null;
      stream.offBoth(this.__handlePluggedBoth, this, i);
      stream.offEnd(this.__unplugById, this, i);
      if (this.__hasNoPlugged()) {
        this.__sendEnd();
      }
    }
  },
  __handlePluggedBoth: function(i, type, x) {
    if (type === 'value') {
      this.__hasValue[i] = true;
      this.__cachedValues[i] = x;
      if (this.__allCached()) {
        if (this.__mapFn) {
          this.__sendAny(Callable.call(this.__mapFn, this.__cachedValues));
        } else {
          this.__sendValue(this.__cachedValues.slice(0));
        }
      }
    } else {
      this.__sendError(x);
    }
  },
  __allCached: function() {
    for (var i = 0; i < this.__hasValue.length; i++) {
      if (!this.__hasValue[i]) {
        return false;
      }
    }
    return true;
  },
  __clear: function() {
    Stream.prototype.__clear.call(this);
    this.__plugged = null;
    this.__cachedValues = null;
    this.__hasValue = null;
    this.__mapFn = null;
  }

});

Kefir.combine = function(sources/*, fn[, context[, arg1, arg2, ...]]*/) {
  return new CombinedStream(sources, rest(arguments, 1));
}

Observable.prototype.combine = function(sources/*, fn[, context[, arg1, arg2, ...]]*/) {
  return new CombinedStream([this].concat(sources), rest(arguments, 1));
}






// Kefir.onValues()

Kefir.onValues = function(streams/*, fn[, context[, arg1, agr2, ...]]*/) {
  var fn = new Callable(rest(arguments, 1))
  return Kefir.combine(streams).onValue(function(xs) {
    return Callable.call(fn, xs);
  });
}

// TODO
//
// observable.debounce(wait, immediate)
// http://underscorejs.org/#defer





// Kefir.later()

var LaterStream = function LaterStream(wait, value) {
  Stream.call(this);
  this.__value = value;
  this.__wait = wait;
}

inherit(LaterStream, Stream, {

  __ClassName: 'LaterStream',

  __onFirstIn: function() {
    var _this = this;
    setTimeout(function() {
      _this.__sendAny(_this.__value);
      _this.__sendEnd();
    }, this.__wait);
  },

  __clear: function() {
    Stream.prototype.__clear.call(this);
    this.__value = null;
    this.__wait = null;
  }

});

Kefir.later = function(wait, value) {
  return new LaterStream(wait, value);
}





// .delay()

var DelayedMixin = {
  __Constructor: function(source, wait) {
    this.__source = source;
    this.__wait = wait;
    source.onEnd(this.__sendEndLater, this);
  },
  __sendLater: function(x) {
    var _this = this;
    setTimeout(function() {  _this.__sendValue(x)  }, this.__wait);
  },
  __handleBoth: function(type, x) {
    if (type === 'value') {
      this.__sendLater(x);
    } else {
      this.__sendError(x);
    }
  },
  __sendEndLater: function() {
    var _this = this;
    setTimeout(function() {  _this.__sendEnd()  }, this.__wait);
  },
  __onFirstIn: function() {
    this.__source.onNewBoth(this.__handleBoth, this);
  },
  __onLastOut: function() {
    this.__source.offBoth(this.__handleBoth, this);
  },
  __clear: function() {
    Observable.prototype.__clear.call(this);
    this.__source = null;
    this.__wait = null;
  }
}


var DelayedStream = function DelayedStream(source, wait) {
  Stream.call(this);
  DelayedMixin.__Constructor.call(this, source, wait);
}

inherit(DelayedStream, Stream, DelayedMixin, {
  __ClassName: 'DelayedStream'
});

Stream.prototype.delay = function(wait) {
  return new DelayedStream(this, wait);
}


var DelayedProperty = function DelayedProperty(source, wait) {
  Property.call(this);
  DelayedMixin.__Constructor.call(this, source, wait);
  if (source.hasValue()) {
    this.__sendValue(source.getValue());
  }
}

inherit(DelayedProperty, Property, DelayedMixin, {
  __ClassName: 'DelayedProperty'
});

Property.prototype.delay = function(wait) {
  return new DelayedProperty(this, wait);
}






// .throttle(wait, {leading, trailing})

var ThrottledMixin = {

  __Constructor: function(source, wait, options) {
    this.__source = source;
    this.__wait = wait;
    this.__trailingCallValue = null;
    this.__trailingCallTimeoutId = null;
    this.__endAfterTrailingCall = false;
    this.__lastCallTime = 0;
    this.__leading = get(options, 'leading', true);
    this.__trailing = get(options, 'trailing', true);
    var _this = this;
    this.__makeTrailingCallBinded = function() {  _this.__makeTrailingCall()  };
    source.onEnd(this.__sendEndLater, this);
  },

  __sendEndLater: function() {
    if (this.__trailingCallTimeoutId) {
      this.__endAfterTrailingCall = true;
    } else {
      this.__sendEnd();
    }
  },

  __scheduleTralingCall: function(value, wait) {
    if (this.__trailingCallTimeoutId) {
      this.__cancelTralingCall();
    }
    this.__trailingCallValue = value;
    this.__trailingCallTimeoutId = setTimeout(this.__makeTrailingCallBinded, wait);
  },
  __cancelTralingCall: function() {
    if (this.__trailingCallTimeoutId !== null) {
      clearTimeout(this.__trailingCallTimeoutId);
      this.__trailingCallTimeoutId = null;
    }
  },
  __makeTrailingCall: function() {
    this.__sendValue(this.__trailingCallValue);
    this.__trailingCallTimeoutId = null;
    this.__trailingCallValue = null;
    this.__lastCallTime = !this.__leading ? 0 : now();
    if (this.__endAfterTrailingCall) {
      this.__sendEnd();
    }
  },

  __handle: function(x) {
    var curTime = now();
    if (this.__lastCallTime === 0 && !this.__leading) {
      this.__lastCallTime = curTime;
    }
    var remaining = this.__wait - (curTime - this.__lastCallTime);
    if (remaining <= 0) {
      this.__cancelTralingCall();
      this.__lastCallTime = curTime;
      this.__sendValue(x);
    } else if (this.__trailing) {
      this.__scheduleTralingCall(x, remaining);
    }
  },
  __handleBoth: function(type, x) {
    if (type === 'value') {
      this.__handle(x);
    } else {
      this.__sendError(x);
    }
  },

  __onFirstIn: function() {
    this.__source.onNewBoth(this.__handleBoth, this);
  },
  __onLastOut: function() {
    this.__source.offBoth(this.__handleBoth, this);
  },

  __clear: function() {
    Observable.prototype.__clear.call(this);
    this.__source = null;
    this.__wait = null;
    this.__trailingCallValue = null;
    this.__trailingCallTimeoutId = null;
    this.__makeTrailingCallBinded = null;
  }

};

var ThrottledStream = function ThrottledStream() {
  Stream.call(this);
  ThrottledMixin.__Constructor.apply(this, arguments);
}

inherit(ThrottledStream, Stream, ThrottledMixin, {
  __ClassName: 'ThrottledStream'
});

Stream.prototype.throttle = function(wait, options) {
  return new ThrottledStream(this, wait, options);
}


var ThrottledProperty = function ThrottledProperty(source) {
  Property.call(this);
  ThrottledMixin.__Constructor.apply(this, arguments);
  if (source.hasValue()) {
    this.__sendValue(source.getValue());
  }
}

inherit(ThrottledProperty, Property, ThrottledMixin, {
  __ClassName: 'ThrottledProperty'
});

Property.prototype.throttle = function(wait, options) {
  return new ThrottledProperty(this, wait, options);
}






// Kefir.fromPoll()

var FromPollStream = function FromPollStream(interval, sourceFn) {
  Stream.call(this);
  this.__interval = interval;
  this.__intervalId = null;
  var _this = this;
  sourceFn = new Callable(sourceFn);
  this.__bindedSend = function() {  _this.__sendAny(Callable.call(sourceFn))  }
}

inherit(FromPollStream, Stream, {

  __ClassName: 'FromPollStream',
  __onFirstIn: function() {
    this.__intervalId = setInterval(this.__bindedSend, this.__interval);
  },
  __onLastOut: function() {
    if (this.__intervalId !== null) {
      clearInterval(this.__intervalId);
      this.__intervalId = null;
    }
  },
  __clear: function() {
    Stream.prototype.__clear.call(this);
    this.__bindedSend = null;
  }

});

Kefir.fromPoll = function(interval/*, fn[, context[, arg1, arg2, ...]]*/) {
  return new FromPollStream(interval, rest(arguments, 1));
}



// Kefir.interval()

Kefir.interval = function(interval, x) {
  return new FromPollStream(interval, [id, null, x]);
}



// Kefir.sequentially()

var sequentiallyHelperFn = function() {
  if (this.xs.length === 0) {
    return END;
  }
  if (this.xs.length === 1) {
    return Kefir.bunch(this.xs[0], END);
  }
  return this.xs.shift();
}

Kefir.sequentially = function(interval, xs) {
  return new FromPollStream(interval, [sequentiallyHelperFn, {xs: xs.slice(0)}]);
}



// Kefir.repeatedly()

var repeatedlyHelperFn = function() {
  this.i = (this.i + 1) % this.xs.length;
  return this.xs[this.i];
}

Kefir.repeatedly = function(interval, xs) {
  return new FromPollStream(interval, [repeatedlyHelperFn, {i: -1, xs: xs}]);
}

// TODO
//
// stream.bufferWithTime(delay)
// stream.bufferWithTime(f)
// stream.bufferWithCount(count)
// stream.bufferWithTimeOrCount(delay, count)

// TODO
//
// observable.mapError(f)
// observable.errors()
// observable.skipErrors()
// observable.endOnError(f)

// TODO
//
// observable.not()
// property.and(other)
// property.or(other)
//
// http://underscorejs.org/#pluck
// http://underscorejs.org/#invoke

// TODO
//
// Model = Bus + Property + lenses


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