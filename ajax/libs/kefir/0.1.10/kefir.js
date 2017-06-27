/*! kefir - 0.1.10
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
    fn = fnMeta[0];
    context = fnMeta[1];
    args = restArgs(fnMeta, 2, true);
    /*jshint eqnull:true */
    if (!isFn(fn) && context != null) {
      fn = context[fn];
    }
  }
  if (moreArgs){
    if (args) {
      args = args.concat(toArray(moreArgs));
    } else {
      args = moreArgs;
    }
  }
  if (isFn(fn)) {
    return args ? fn.apply(context, args) : fn.call(context);
  } else {
    throw new Error('not a function ' + fn);
  }
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



// Never

var neverObj = new Stream();
neverObj.__sendEnd();
neverObj.__objName = 'Kefir.never()'
Kefir.never = function() {
  return neverObj;
}




// Once

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





// fromBinder

Kefir.FromBinderStream = function FromBinderStream(subscribe){
  Stream.call(this);
  this.__subscribe = subscribe;
}

inherit(Kefir.FromBinderStream, Stream, {

  __ClassName: 'FromBinderStream',
  __onFirstIn: function(){
    var _this = this;
    this.__usubscriber = this.__subscribe(function(x){
      _this.__sendAny(x);
    });
  },
  __onLastOut: function(){
    if (isFn(this.__usubscriber)) {
      this.__usubscriber();
    }
    this.__usubscriber = null;
  },
  __clear: function(){
    Stream.prototype.__clear.call(this);
    this.__subscribe = null;
  }

})

Kefir.fromBinder = function(subscribe){
  return new Kefir.FromBinderStream(subscribe);
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





// .skipWhile(f)

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




// .sampledBy(observable, fn)

var SampledByMixin = {
  __Constructor: function(main, sampler, fnMeta){
    if (this instanceof Property) {
      Property.call(this);
    } else {
      Stream.call(this);
    }
    WithSourceStreamMixin.__Constructor.call(this, sampler);
    this.__lastValue = NOTHING;
    this.__fnMeta = normFnMeta(fnMeta);
    this.__mainStream = main;
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





// Bus

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





// FlatMap

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




// FlatMapLatest

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




// Merge

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









// Combine

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

// FromPoll

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



// Interval

Kefir.interval = function(interval, x){
  return new FromPollStream(interval, [id, null, x]);
}



// Sequentially

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



// Repeatedly

var repeatedlyHelperFn = function(){
  this.i = (this.i + 1) % this.xs.length;
  return this.xs[this.i];
}

Kefir.repeatedly = function(interval, xs){
  return new FromPollStream(interval, [repeatedlyHelperFn, {i: -1, xs: xs}]);
}

// TODO
//
// // more underscore-style maybe?
// observable.delay(delay)
// observable.throttle(delay)
// observable.debounce(delay)
// observable.debounceImmediate(delay)
//
// Kefir.later(delay, value)


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