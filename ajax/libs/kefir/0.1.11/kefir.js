/*! kefir - 0.1.11
 *  https://github.com/pozadi/kefir
 */
(function(global){
  "use strict";

function noop(){}

function id(x){return x}

function own(obj, prop){
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function toArray(arrayLike){
  if (isArray(arrayLike)) {
    return arrayLike;
  } else {
    return Array.prototype.slice.call(arrayLike);
  }
}

function createObj(proto) {
  var F = function(){};
  F.prototype = proto;
  return new F();
}

function extend() {
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

function firstArrOrToArr(args) {
  if (isArray(args[0])) {
    return args[0];
  }
  return toArray(args);
}

function restArgs(args, start, nullOnEmpty){
  if (args.length > start) {
    return Array.prototype.slice.call(args, start);
  }
  if (nullOnEmpty) {
    return null;
  } else {
    return [];
  }
}

function getFn(fn, context) {
  if (isFn(fn)) {
    return fn;
  } else {
    /*jshint eqnull:true */
    if (context == null || !isFn(context[fn])) {
      throw new Error('not a function: ' + fn + ' in ' + context);
    } else {
      return context[fn];
    }
  }
}

function callFn(fnMeta, moreArgs){
  // fnMeta = [
  //   fn,
  //   context,
  //   arg1,
  //   arg2,
  //   ...
  // ]
  var fn, context, args;
  if (isFn(fnMeta)) {
    fn = fnMeta;
    context = null;
    args = null;
  } else {
    context = fnMeta[1];
    fn = getFn(fnMeta[0], context);
    args = restArgs(fnMeta, 2, true);
  }
  if (moreArgs){
    if (args) {
      args = args.concat(toArray(moreArgs));
    } else {
      args = moreArgs;
    }
  }
  return args ? fn.apply(context, args) : fn.call(context);
}

function normFnMeta(fnMeta) {
  if (isArray(fnMeta) || isArguments(fnMeta)) {
    if (fnMeta.length === 1) {
      return fnMeta[0];
    }
    if (fnMeta.length === 0) {
      return null;
    }
  }
  return fnMeta;
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
  /*jshint eqnull:true */
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

function get(map, key, notFound){
  if (map && key in map) {
    return map[key];
  } else {
    return notFound;
  }
}

var Kefir = {};



// Special values

var NOTHING = Kefir.NOTHING = ['<nothing>'];
var END = Kefir.END = ['<end>'];
var NO_MORE = Kefir.NO_MORE = ['<no more>'];

// Example:
//   stream.__sendAny(Kefir.bunch(1, 2, Kefir.END))
Kefir.BunchOfValues = function(values){
  this.values = values;
}
Kefir.bunch = function() {
  return new Kefir.BunchOfValues(firstArrOrToArr(arguments));
}

// Example:
//   stream.__sendAny(Kefir.error('network error'))
Kefir.Error = function(error) {
  this.error = error;
}

Kefir.error = function(error) {
  return new Kefir.Error(error);
}



// Observable

var Observable = Kefir.Observable = function Observable(onFirstIn, onLastOut){

  // __onFirstIn, __onLastOut can also be added to prototype of child classes
  if (isFn(onFirstIn)) {
    this.__onFirstIn = onFirstIn;
  }
  if (isFn(onLastOut)) {
    this.__onLastOut = onLastOut;
  }

  this.__subscribers = [];

}

inherit(Observable, Object, {

  __ClassName: 'Observable',

  toString: function(){
    return '[' + this.__ClassName + (this.__objName ? (' | ' + this.__objName) : '') + ']';
  },

  __onFirstIn: noop,
  __onLastOut: noop,

  __on: function(type /*,callback [, context [, arg1, arg2 ...]]*/){
    if (!this.isEnded()) {
      var firstIn = (
        (type === 'value' || type === 'error') &&
        !(this.__hasSubscribers('value') || this.__hasSubscribers('error'))
      );
      this.__subscribers.push(arguments);
      if (firstIn) {
        this.__onFirstIn();
      }
    } else if (type === 'end') {
      callFn(restArgs(arguments, 1));
    }
  },
  __off: function(type /*,callback [, context [, arg1, arg2 ...]]*/){
    if (!this.isEnded()) {
      for (var i = 0; i < this.__subscribers.length; i++) {
        if (isEqualArrays(this.__subscribers[i], arguments)) {
          this.__subscribers[i] = null;
        }
      }
      if (
        (type === 'value' || type === 'error') &&
        !(this.__hasSubscribers('value') || this.__hasSubscribers('error'))
      ) {
        this.__onLastOut();
      }
    }
  },
  __send: function(type /*[, arg1, arg2, ...]*/) {
    if (!this.isEnded()) {
      for (var i = 0; i < this.__subscribers.length; i++) {
        var subscriber = this.__subscribers[i];
        if (subscriber && subscriber[0] === type) {
          var result = callFn(restArgs(subscriber, 1), restArgs(arguments, 1));
          if (result === NO_MORE) {
            this.__off.apply(this, subscriber)
          }
        }
      }
      if (type === 'end') {
        this.__clear();
      }
    }
  },
  __hasSubscribers: function(type) {
    if (this.isEnded()) {
      return false;
    }
    for (var i = 0; i < this.__subscribers.length; i++) {
      if (this.__subscribers[i] && this.__subscribers[i][0] === type) {
        return true;
      }
    }
    return false;
  },
  __clear: function() {
    this.__onLastOut();
    if (own(this, '__onFirstIn')) {
      this.__onFirstIn = null;
    }
    if (own(this, '__onLastOut')) {
      this.__onLastOut = null;
    }
    this.__subscribers = null;
  },


  __sendValue: function(x){
    this.__send('value', x);
    return this;
  },
  __sendError: function(x){
    this.__send('error', x);
    return this;
  },
  __sendEnd: function(){
    this.__send('end');
    return this;
  },
  __sendAny: function(x){
    if (x === END) {
      this.__sendEnd();
    } else if (x instanceof Kefir.BunchOfValues) {
      for (var i = 0; i < x.values.length; i++) {
        this.__sendAny(x.values[i]);
      }
    } else if (x instanceof Kefir.Error) {
      this.__sendError(x.error);
    } else if (x !== NOTHING) {
      this.__sendValue(x);
    }
    return this;
  },


  onValue: function(){
    this.__on.apply(this, ['value'].concat(toArray(arguments)));
    return this;
  },
  offValue: function(){
    this.__off.apply(this, ['value'].concat(toArray(arguments)));
    return this;
  },
  onError: function(){
    this.__on.apply(this, ['error'].concat(toArray(arguments)));
    return this;
  },
  offError: function(){
    this.__off.apply(this, ['error'].concat(toArray(arguments)));
    return this;
  },
  onEnd: function(){
    this.__on.apply(this, ['end'].concat(toArray(arguments)));
    return this;
  },
  offEnd: function(){
    this.__off.apply(this, ['end'].concat(toArray(arguments)));
    return this;
  },

  // for Property
  onNewValue: function(){
    return this.onValue.apply(this, arguments);
  },

  isEnded: function() {
    return !this.__subscribers;
  }


})




// Stream

var Stream = Kefir.Stream = function Stream(){
  Observable.apply(this, arguments);
}

inherit(Stream, Observable, {
  __ClassName: 'Stream'
})




// Property

var Property = Kefir.Property = function Property(onFirstIn, onLastOut, initial){
  Observable.call(this, onFirstIn, onLastOut);
  this.__cached = isUndefined(initial) ? NOTHING : initial;
}

inherit(Property, Observable, {

  __ClassName: 'Property',

  hasValue: function(){
    return this.__cached !== NOTHING;
  },
  getValue: function(){
    return this.__cached;
  },

  __sendValue: function(x) {
    if (!this.isEnded()){
      this.__cached = x;
    }
    Observable.prototype.__sendValue.call(this, x);
  },
  onNewValue: function(){
    this.__on.apply(this, ['value'].concat(toArray(arguments)));
    return this;
  },
  onValue: function() {
    if ( this.hasValue() ) {
      callFn(arguments, [this.__cached])
    }
    return this.onNewValue.apply(this, arguments);
  }

})



// Log

var logHelper = function(name, type, x) {
  console.log(name, type, x);
}

Observable.prototype.log = function(name) {
  if (!name) {
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



// Kefir.never()

var neverObj = new Stream();
neverObj.__sendEnd();
neverObj.__objName = 'Kefir.never()'
Kefir.never = function() {
  return neverObj;
}




// Kefir.once(x)

Kefir.OnceStream = function OnceStream(value){
  Stream.call(this);
  this.__value = value;
}

inherit(Kefir.OnceStream, Stream, {

  __ClassName: 'OnceStream',
  onValue: function(){
    if (!this.isEnded()) {
      callFn(arguments, [this.__value]);
      this.__value = null;
      this.__sendEnd();
    }
    return this;
  },
  onError: noop

})

Kefir.once = function(x) {
  return new Kefir.OnceStream(x);
}





// Kefir.fromBinder(fn)

Kefir.FromBinderStream = function FromBinderStream(subscribeFnMeta){
  Stream.call(this);
  this.__subscribeFnMeta = normFnMeta(subscribeFnMeta);
}

inherit(Kefir.FromBinderStream, Stream, {

  __ClassName: 'FromBinderStream',
  __onFirstIn: function(){
    var _this = this;
    this.__usubscriber = callFn(this.__subscribeFnMeta, [function(x){
      _this.__sendAny(x);
    }]);
  },
  __onLastOut: function(){
    if (isFn(this.__usubscriber)) {
      this.__usubscriber();
    }
    this.__usubscriber = null;
  },
  __clear: function(){
    Stream.prototype.__clear.call(this);
    this.__subscribeFnMeta = null;
  }

})

Kefir.fromBinder = function(/*subscribe[, context[, arg1, arg2...]]*/){
  return new Kefir.FromBinderStream(arguments);
}

var WithSourceStreamMixin = {
  __Constructor: function(source) {
    this.__source = source;
    source.onEnd(this.__sendEnd, this);
    if (source instanceof Property && this instanceof Property && source.hasValue()) {
      this.__handle(source.getValue());
    }
  },
  __handle: function(x){
    this.__sendAny(x);
  },
  __onFirstIn: function(){
    this.__source.onNewValue('__handle', this);
    this.__source.onError('__sendError', this);
  },
  __onLastOut: function(){
    this.__source.offValue('__handle', this);
    this.__source.offError('__sendError', this);
  },
  __clear: function(){
    Observable.prototype.__clear.call(this);
    this.__source = null;
  }
}





// observable.toProperty([initial])

Kefir.PropertyFromStream = function PropertyFromStream(source, initial){
  Property.call(this, null, null, initial);
  this.__Constructor(source);
}

inherit(Kefir.PropertyFromStream, Property, WithSourceStreamMixin, {
  __ClassName: 'PropertyFromStream'
})

Stream.prototype.toProperty = function(initial){
  return new Kefir.PropertyFromStream(this, initial);
}

Property.prototype.toProperty = function(initial){
  if (isUndefined(initial)) {
    return this
  } else {
    var prop = new Kefir.PropertyFromStream(this);
    prop.__sendValue(initial);
    return prop;
  }
}






// .scan(seed, fn)

Kefir.ScanProperty = function ScanProperty(source, seed, fnMeta){
  Property.call(this, null, null, seed);
  this.__fnMeta = normFnMeta(fnMeta);
  this.__Constructor(source);
}

inherit(Kefir.ScanProperty, Property, WithSourceStreamMixin, {

  __ClassName: 'ScanProperty',

  __handle: function(x){
    this.__sendValue( callFn(this.__fnMeta, [this.getValue(), x]) );
  },
  __clear: function(){
    WithSourceStreamMixin.__clear.call(this);
    this.__fnMeta = null;
  }

})

Observable.prototype.scan = function(seed/*fn[, context[, arg1, arg2, ...]]*/) {
  return new Kefir.ScanProperty(this, seed, restArgs(arguments, 1));
}




// .reduce(seed, fn)

Kefir.ReducedProperty = function ReducedProperty(source, seed, fnMeta){
  Property.call(this);
  this.__fnMeta = normFnMeta(fnMeta);
  this.__result = seed;
  source.onEnd('__sendResult', this);
  this.__Constructor(source);
}

inherit(Kefir.ReducedProperty, Property, WithSourceStreamMixin, {

  __ClassName: 'ReducedProperty',

  __handle: function(x){
    this.__result = callFn(this.__fnMeta, [this.__result, x]);
  },
  __sendResult: function(){
    this.__sendValue(this.__result);
  },
  __clear: function(){
    WithSourceStreamMixin.__clear.call(this);
    this.__fnMeta = null;
    this.__result = null;
  }

});

Observable.prototype.reduce = function(seed/*fn[, context[, arg1, arg2, ...]]*/) {
  return new Kefir.ReducedProperty(this, seed, restArgs(arguments, 1));
}




// .map(fn)

var MapMixin = {
  __Constructor: function(source, mapFnMeta){
    if (this instanceof Property) {
      Property.call(this);
    } else {
      Stream.call(this);
    }
    this.__mapFnMeta = normFnMeta(mapFnMeta);
    WithSourceStreamMixin.__Constructor.call(this, source);
  },
  __handle: function(x){
    this.__sendAny(
      this.__mapFnMeta ? callFn(this.__mapFnMeta, [x]) : x
    );
  },
  __clear: function(){
    WithSourceStreamMixin.__clear.call(this);
    this.__mapFnMeta = null;
  }
}
inheritMixin(MapMixin, WithSourceStreamMixin);

Kefir.MappedStream = function MappedStream(){
  this.__Constructor.apply(this, arguments);
}

inherit(Kefir.MappedStream, Stream, MapMixin, {
  __ClassName: 'MappedStream'
});

Kefir.MappedProperty = function MappedProperty(){
  this.__Constructor.apply(this, arguments);
}

inherit(Kefir.MappedProperty, Property, MapMixin, {
  __ClassName: 'MappedProperty'
})

Stream.prototype.map = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  return new Kefir.MappedStream(this, arguments);
}

Property.prototype.map = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  return new Kefir.MappedProperty(this, arguments);
}




// property.changes()

Property.prototype.changes = function() {
  return new Kefir.MappedStream(this);
}




// .diff(seed, fn)

var diffMapFn = function(x){
  var result = callFn(this.fnMeta, [this.prev, x]);
  this.prev = x;
  return result;
}

Observable.prototype.diff = function(start/*fn[, context[, arg1, arg2, ...]]*/) {
  return this.map(diffMapFn, {
    prev: start,
    fnMeta: normFnMeta(restArgs(arguments, 1))
  });
}





// .filter(fn)

var filterMapFn = function(filterFnMeta, x){
  if (callFn(filterFnMeta, [x])) {
    return x;
  } else {
    return NOTHING;
  }
}

Observable.prototype.filter = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  return this.map(filterMapFn, null, normFnMeta(arguments));
}




// .takeWhile(fn)

var takeWhileMapFn = function(fnMeta, x) {
  if (callFn(fnMeta, [x])) {
    return x;
  } else {
    return END;
  }
}

Observable.prototype.takeWhile = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  return this.map(takeWhileMapFn, null, normFnMeta(arguments));
}




// .take(n)

var takeMapFn = function(x) {
  if (this.n <= 0) {
    return END;
  }
  if (this.n === 1) {
    return Kefir.bunch(x, END);
  }
  this.n--;
  return x;
}

Observable.prototype.take = function(n) {
  return this.map(takeMapFn, {n: n});
}




// .skip(n)

var skipMapFn = function(x) {
  if (this.n <= 0) {
    return x;
  } else {
    this.n--;
    return NOTHING;
  }
}

Observable.prototype.skip = function(n) {
  return this.map(skipMapFn, {n: n});
}





// .skipDuplicates([fn])

var skipDuplicatesMapFn = function(x){
  var result;
  if (this.prev !== NOTHING && (this.fn ? this.fn(this.prev, x) : this.prev === x)) {
    result = NOTHING;
  } else {
    result = x;
  }
  this.hasPrev = true;
  this.prev = x;
  return result;
}

Observable.prototype.skipDuplicates = function(fn) {
  return this.map(skipDuplicatesMapFn, {fn: fn, prev: NOTHING});
}





// .skipWhile(fn)

var skipWhileMapFn = function(x){
  if (this.skip && callFn(this.fnMeta, [x])) {
    return NOTHING;
  } else {
    this.skip = false;
    return x;
  }
}

Observable.prototype.skipWhile = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  return this.map(skipWhileMapFn, {skip: true, fnMeta: normFnMeta(arguments)});
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
  __Constructor: function(main, sampler, fnMeta){
    if (this instanceof Property) {
      Property.call(this);
    } else {
      Stream.call(this);
    }
    this.__fnMeta = normFnMeta(fnMeta);
    this.__mainStream = main;
    this.__lastValue = NOTHING;
    if (main instanceof Property && main.hasValue()) {
      this.__lastValue = main.getValue();
    }
    WithSourceStreamMixin.__Constructor.call(this, sampler);
  },
  __handle: function(y){
    if (this.__lastValue !== NOTHING) {
      var x = this.__lastValue;
      if (this.__fnMeta) {
        x = callFn(this.__fnMeta, [x, y]);
      }
      this.__sendValue(x);
    }
  },
  __onFirstIn: function(){
    WithSourceStreamMixin.__onFirstIn.call(this);
    this.__mainStream.onValue('__saveValue', this);
    this.__mainStream.onError('__sendError', this);
  },
  __onLastOut: function(){
    WithSourceStreamMixin.__onLastOut.call(this);
    this.__mainStream.offValue('__saveValue', this);
    this.__mainStream.offError('__sendError', this);
  },
  __saveValue: function(x){
    this.__lastValue = x;
  },
  __clear: function(){
    WithSourceStreamMixin.__clear.call(this);
    this.__lastValue = null;
    this.__fn = null;
    this.__mainStream = null;
  }
}

inheritMixin(SampledByMixin, WithSourceStreamMixin);

Kefir.SampledByStream = function SampledByStream(){
  this.__Constructor.apply(this, arguments);
}

inherit(Kefir.SampledByStream, Stream, SampledByMixin, {
  __ClassName: 'SampledByStream'
})

Kefir.SampledByProperty = function SampledByProperty(){
  this.__Constructor.apply(this, arguments);
}

inherit(Kefir.SampledByProperty, Property, SampledByMixin, {
  __ClassName: 'SampledByProperty'
})

Observable.prototype.sampledBy = function(observable/*fn[, context[, arg1, arg2, ...]]*/) {
  if (observable instanceof Stream) {
    return new Kefir.SampledByStream(this, observable, restArgs(arguments, 1));
  } else {
    return new Kefir.SampledByProperty(this, observable, restArgs(arguments, 1));
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

  __initPluggable: function(){
    this.__plugged = [];
  },
  __clearPluggable: function(){
    this.__plugged = null;
  },
  __handlePlugged: function(i, value){
    this.__sendAny(value);
  },
  __plug: function(stream){
    if ( !this.isEnded() ) {
      this.__plugged.push(stream);
      var i = this.__plugged.length - 1;
      if (this.__hasSubscribers('value')) {
        stream.onValue('__handlePlugged', this, i);
        stream.onError('__sendError', this);
      }
      stream.onEnd('__unplugById', this, i);
    }
  },
  __unplugById: function(i){
    if ( !this.isEnded() ) {
      var stream = this.__plugged[i];
      if (stream) {
        this.__plugged[i] = null;
        stream.offValue('__handlePlugged', this, i);
        stream.offError('__sendError', this);
        stream.offEnd('__unplugById', this, i);
      }
    }
  },
  __unplug: function(stream){
    if ( !this.isEnded() ) {
      for (var i = 0; i < this.__plugged.length; i++) {
        if (this.__plugged[i] === stream) {
          this.__unplugById(i);
        }
      }
    }
  },
  __onFirstIn: function(){
    for (var i = 0; i < this.__plugged.length; i++) {
      var stream = this.__plugged[i];
      if (stream) {
        stream.onValue('__handlePlugged', this, i);
        stream.onError('__sendError', this);
      }
    }
  },
  __onLastOut: function(){
    for (var i = 0; i < this.__plugged.length; i++) {
      var stream = this.__plugged[i];
      if (stream) {
        stream.offValue('__handlePlugged', this, i);
        stream.offError('__sendError', this);
      }
    }
  },
  __hasNoPlugged: function(){
    if (this.isEnded()) {
      return true;
    }
    for (var i = 0; i < this.__plugged.length; i++) {
      if (this.__plugged[i]) {
        return false;
      }
    }
    return true;
  }

}





// Kefir.bus()

Kefir.Bus = function Bus(){
  Stream.call(this);
  this.__initPluggable();
}

inherit(Kefir.Bus, Stream, PluggableMixin, {

  __ClassName: 'Bus',

  push: function(x){
    this.__sendAny(x);
    return this;
  },
  error: function(e){
    this.__sendError(e);
    return this;
  },
  plug: function(stream){
    this.__plug(stream);
    return this;
  },
  unplug: function(stream){
    this.__unplug(stream);
    return this;
  },
  end: function(){
    this.__sendEnd();
    return this;
  },
  __clear: function(){
    Stream.prototype.__clear.call(this);
    this.__clearPluggable();
    this.push = noop;
  }

});

Kefir.bus = function(){
  return new Kefir.Bus();
}





// .flatMap()

Kefir.FlatMappedStream = function FlatMappedStream(sourceStream, mapFnMeta){
  Stream.call(this);
  this.__initPluggable();
  this.__sourceStream = sourceStream;
  this.__mapFnMeta = normFnMeta(mapFnMeta);
  sourceStream.onEnd(this.__onSourceEnds, this);
}

inherit(Kefir.FlatMappedStream, Stream, PluggableMixin, {

  __ClassName: 'FlatMappedStream',

  __onSourceEnds: function(){
    if (this.__hasNoPlugged()) {
      this.__sendEnd();
    }
  },
  __plugResult: function(x){
    this.__plug( callFn(this.__mapFnMeta, [x]) );
  },
  __onFirstIn: function(){
    this.__sourceStream.onValue('__plugResult', this);
    this.__sourceStream.onError('__sendError', this);
    PluggableMixin.__onFirstIn.call(this);
  },
  __onLastOut: function(){
    this.__sourceStream.offValue('__plugResult', this);
    this.__sourceStream.offError('__sendError', this);
    PluggableMixin.__onLastOut.call(this);
  },
  __unplugById: function(i){
    PluggableMixin.__unplugById.call(this, i);
    if (!this.isEnded() && this.__hasNoPlugged() && this.__sourceStream.isEnded()) {
      this.__sendEnd();
    }
  },
  __clear: function(){
    Stream.prototype.__clear.call(this);
    this.__clearPluggable();
    this.__sourceStream = null;
    this.__mapFnMeta = null;
  }

})

Observable.prototype.flatMap = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  return new Kefir.FlatMappedStream(this, arguments);
};




// .flatMapLatest()

Kefir.FlatMapLatestStream = function FlatMapLatestStream(){
  Kefir.FlatMappedStream.apply(this, arguments);
}

inherit(Kefir.FlatMapLatestStream, Kefir.FlatMappedStream, {

  __ClassName: 'FlatMapLatestStream',

  __plugResult: function(x){
    for (var i = 0; i < this.__plugged.length; i++) {
      this.__unplugById(i);
    }
    Kefir.FlatMappedStream.prototype.__plugResult.call(this, x);
  }

})

Observable.prototype.flatMapLatest = function(/*fn[, context[, arg1, arg2, ...]]*/) {
  return new Kefir.FlatMapLatestStream(this, arguments);
};




// .merge()

Kefir.MergedStream = function MergedStream(){
  Stream.call(this);
  this.__initPluggable();
  var sources = firstArrOrToArr(arguments);
  for (var i = 0; i < sources.length; i++) {
    this.__plug(sources[i]);
  }
}

inherit(Kefir.MergedStream, Stream, PluggableMixin, {

  __ClassName: 'MergedStream',

  __clear: function(){
    Stream.prototype.__clear.call(this);
    this.__clearPluggable();
  },
  __unplugById: function(i){
    PluggableMixin.__unplugById.call(this, i);
    if (this.__hasNoPlugged()) {
      this.__sendEnd();
    }
  }

});

Kefir.merge = function() {
  return new Kefir.MergedStream(firstArrOrToArr(arguments));
}

Observable.prototype.merge = function() {
  return Kefir.merge([this].concat(firstArrOrToArr(arguments)));
}









// .combine()

Kefir.CombinedStream = function CombinedStream(sources, mapFnMeta){
  Stream.call(this);
  this.__initPluggable();
  for (var i = 0; i < sources.length; i++) {
    this.__plug(sources[i]);
  }
  this.__cachedValues = new Array(sources.length);
  this.__hasValue = new Array(sources.length);
  this.__mapFnMeta = normFnMeta(mapFnMeta);
}

inherit(Kefir.CombinedStream, Stream, PluggableMixin, {

  __ClassName: 'CombinedStream',

  __unplugById: function(i){
    PluggableMixin.__unplugById.call(this, i);
    if (this.__hasNoPlugged()) {
      this.__sendEnd();
    }
  },
  __handlePlugged: function(i, x) {
    this.__hasValue[i] = true;
    this.__cachedValues[i] = x;
    if (this.__allCached()) {
      if (this.__mapFnMeta) {
        this.__sendAny(callFn(this.__mapFnMeta, this.__cachedValues));
      } else {
        this.__sendValue(this.__cachedValues.slice(0));
      }
    }
  },
  __allCached: function(){
    for (var i = 0; i < this.__hasValue.length; i++) {
      if (!this.__hasValue[i]) {
        return false;
      }
    }
    return true;
  },
  __clear: function(){
    Stream.prototype.__clear.call(this);
    this.__clearPluggable();
    this.__cachedValues = null;
    this.__hasValue = null;
    this.__mapFnMeta = null;
  }

});

Kefir.combine = function(sources/*, fn[, context[, arg1, arg2, ...]]*/) {
  return new Kefir.CombinedStream(sources, restArgs(arguments, 1));
}

Observable.prototype.combine = function(sources/*, fn[, context[, arg1, arg2, ...]]*/) {
  return new Kefir.CombinedStream([this].concat(sources), restArgs(arguments, 1));
}






// Kefir.onValues()

Kefir.onValues = function(streams/*, fn[, context[, arg1, agr2, ...]]*/){
  var fnMeta = normFnMeta(restArgs(arguments, 1))
  return Kefir.combine(streams).onValue(callFn, null, fnMeta);
}

// TODO
//
// observable.debounce(wait, immediate)
// http://underscorejs.org/#defer





// Kefir.later()

Kefir.LaterStream = function LaterStream(wait, value) {
  Stream.call(this);
  this.__value = value;
  this.__wait = wait;
}

inherit(Kefir.LaterStream, Stream, {

  __ClassName: 'LaterStream',

  __onFirstIn: function(){
    var _this = this;
    setTimeout(function(){
      _this.__sendAny(_this.__value);
      _this.__sendEnd();
    }, this.__wait);
  },

  __clear: function(){
    Stream.prototype.__clear.call(this);
    this.__value = null;
    this.__wait = null;
  }

});

Kefir.later = function(wait, value) {
  return new Kefir.LaterStream(wait, value);
}





// .delay()

var DelayedMixin = {
  __Constructor: function(source, wait) {
    this.__source = source;
    this.__wait = wait;
    source.onEnd(this.__sendEndLater, this);
  },
  __sendLater: function(x){
    var _this = this;
    setTimeout(function(){  _this.__sendValue(x)  }, this.__wait);
  },
  __sendEndLater: function(){
    var _this = this;
    setTimeout(function(){  _this.__sendEnd()  }, this.__wait);
  },
  __onFirstIn: function(){
    this.__source.onNewValue('__sendLater', this);
    this.__source.onError('__sendError', this);
  },
  __onLastOut: function(){
    this.__source.offValue('__sendLater', this);
    this.__source.offError('__sendError', this);
  },
  __clear: function(){
    Observable.prototype.__clear.call(this);
    this.__source = null;
    this.__wait = null;
  }
}


Kefir.DelayedStream = function DelayedStream(source, wait) {
  Stream.call(this);
  DelayedMixin.__Constructor.call(this, source, wait);
}

inherit(Kefir.DelayedStream, Stream, DelayedMixin, {
  __ClassName: 'DelayedStream'
});

Stream.prototype.delay = function(wait) {
  return new Kefir.DelayedStream(this, wait);
}


Kefir.DelayedProperty = function DelayedProperty(source, wait) {
  Property.call(this);
  DelayedMixin.__Constructor.call(this, source, wait);
  if (source.hasValue()) {
    this.__sendValue(source.getValue());
  }
}

inherit(Kefir.DelayedProperty, Property, DelayedMixin, {
  __ClassName: 'DelayedProperty'
});

Property.prototype.delay = function(wait) {
  return new Kefir.DelayedProperty(this, wait);
}






// .throttle(wait, {leading, trailing})

var ThrottledMixin = {

  __Constructor: function(source, wait, options){
    this.__source = source;
    this.__wait = wait;
    this.__trailingCallValue = null;
    this.__trailingCallTimeoutId = null;
    this.__endAfterTrailingCall = false;
    this.__lastCallTime = 0;
    this.__leading = get(options, 'leading', true);
    this.__trailing = get(options, 'trailing', true);
    var _this = this;
    this.__makeTrailingCallBinded = function(){  _this.__makeTrailingCall()  };
    source.onEnd(this.__sendEndLater, this);
  },

  __sendEndLater: function(){
    if (this.__trailingCallTimeoutId) {
      this.__endAfterTrailingCall = true;
    } else {
      this.__sendEnd();
    }
  },

  __scheduleTralingCall: function(value, wait){
    if (this.__trailingCallTimeoutId) {
      this.__cancelTralingCall();
    }
    this.__trailingCallValue = value;
    this.__trailingCallTimeoutId = setTimeout(this.__makeTrailingCallBinded, wait);
  },
  __cancelTralingCall: function(){
    if (this.__trailingCallTimeoutId !== null) {
      clearTimeout(this.__trailingCallTimeoutId);
      this.__trailingCallTimeoutId = null;
    }
  },
  __makeTrailingCall: function(){
    this.__sendValue(this.__trailingCallValue);
    this.__trailingCallTimeoutId = null;
    this.__trailingCallValue = null;
    this.__lastCallTime = !this.__leading ? 0 : now();
    if (this.__endAfterTrailingCall) {
      this.__sendEnd();
    }
  },

  __handleValueFromSource: function(x){
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

  __onFirstIn: function(){
    this.__source.onNewValue('__handleValueFromSource', this);
    this.__source.onError('__sendError', this);
  },
  __onLastOut: function(){
    this.__source.offValue('__handleValueFromSource', this);
    this.__source.offError('__sendError', this);
  },

  __clear: function(){
    Observable.prototype.__clear.call(this);
    this.__source = null;
    this.__wait = null;
    this.__trailingCallValue = null;
    this.__trailingCallTimeoutId = null;
    this.__makeTrailingCallBinded = null;
  }

};

Kefir.ThrottledStream = function ThrottledStream() {
  Stream.call(this);
  ThrottledMixin.__Constructor.apply(this, arguments);
}

inherit(Kefir.ThrottledStream, Stream, ThrottledMixin, {
  __ClassName: 'ThrottledStream'
});

Stream.prototype.throttle = function(wait, options) {
  return new Kefir.ThrottledStream(this, wait, options);
}


Kefir.ThrottledProperty = function ThrottledProperty(source) {
  Property.call(this);
  ThrottledMixin.__Constructor.apply(this, arguments);
  if (source.hasValue()) {
    this.__sendValue(source.getValue());
  }
}

inherit(Kefir.ThrottledProperty, Property, ThrottledMixin, {
  __ClassName: 'ThrottledProperty'
});

Property.prototype.throttle = function(wait, options) {
  return new Kefir.ThrottledProperty(this, wait, options);
}






// Kefir.fromPoll()

var FromPollStream = Kefir.FromPollStream = function FromPollStream(interval, sourceFnMeta){
  Stream.call(this);
  this.__interval = interval;
  this.__intervalId = null;
  var _this = this;
  sourceFnMeta = normFnMeta(sourceFnMeta);
  this.__bindedSend = function(){  _this.__sendAny(callFn(sourceFnMeta))  }
}

inherit(FromPollStream, Stream, {

  __ClassName: 'FromPollStream',
  __onFirstIn: function(){
    this.__intervalId = setInterval(this.__bindedSend, this.__interval);
  },
  __onLastOut: function(){
    if (this.__intervalId !== null){
      clearInterval(this.__intervalId);
      this.__intervalId = null;
    }
  },
  __clear: function(){
    Stream.prototype.__clear.call(this);
    this.__bindedSend = null;
  }

});

Kefir.fromPoll = function(interval/*, fn[, context[, arg1, arg2, ...]]*/){
  return new FromPollStream(interval, restArgs(arguments, 1));
}



// Kefir.interval()

Kefir.interval = function(interval, x){
  return new FromPollStream(interval, [id, null, x]);
}



// Kefir.sequentially()

var sequentiallyHelperFn = function(){
  if (this.xs.length === 0) {
    return END;
  }
  if (this.xs.length === 1){
    return Kefir.bunch(this.xs[0], END);
  }
  return this.xs.shift();
}

Kefir.sequentially = function(interval, xs){
  return new FromPollStream(interval, [sequentiallyHelperFn, {xs: xs.slice(0)}]);
}



// Kefir.repeatedly()

var repeatedlyHelperFn = function(){
  this.i = (this.i + 1) % this.xs.length;
  return this.xs[this.i];
}

Kefir.repeatedly = function(interval, xs){
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