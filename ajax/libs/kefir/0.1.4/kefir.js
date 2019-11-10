/*! kefir - 0.1.4
 *  https://github.com/pozadi/kefir
 */
(function(global){
  "use strict";


  // Class method names convention
  //
  // __foo: can be used only inside class or child class
  // _foo: can be used only inside Kefir
  // foo: public API



  var Kefir = {};

  Kefir.END = ['<end>'];
  Kefir.NO_MORE = ['<no more>'];




  // Utils

  function noop(){}

  function own(obj, prop){
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  function toArray(arrayLike){
    return Array.prototype.slice.call(arrayLike);
  }

  function createObj(proto) {
    var F = function(){};
    F.prototype = proto;
    return new F();
  }

  function extend() {
    var objects = toArray(arguments);
    if (objects.length === 1) {
      return objects[0];
    }
    var result = objects.shift();
    for (var i = 0; i < objects.length; i++) {
      for (var prop in objects[i]) {
        if(own(objects[i], prop)) {
          result[prop] = objects[i][prop];
        }
      }
    }
    return result;
  }

  function inherit(Child, Parent, childPrototype) {
    Child.prototype = createObj(Parent.prototype);
    Child.prototype.constructor = Child;
    if (childPrototype) {
      extend(Child.prototype, childPrototype)
    }
    return Child;
  }

  function removeFromArray(array, value) {
    for (var i = 0; i < array.length;) {
      if (array[i] === value) {
        array.splice(i, 1);
      } else {
        i++;
      }
    }
  }

  function killInArray(array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === value) {
        array[i] = null;
      }
    }
  }

  function isAllDead(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        return false;
      }
    }
    return true;
  }

  function firstArrOrToArr(args) {
    if (Object.prototype.toString.call(args[0]) === '[object Array]') {
      return args[0];
    }
    return toArray(args);
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  function isFn(fn) {
    return typeof fn === "function";
  }





  // Callbacks

  var Callbacks = Kefir.Callbacks = inherit(function Callbacks(){
    this.__subscribers = null;
    this.__contexts = null;
  }, Object, {
    add: function(fn, context){
      if (this.__subscribers === null) {
        this.__subscribers = [];
        this.__contexts = [];
      }
      this.__subscribers.push(fn);
      this.__contexts.push(context);
    },
    remove: function(fn, context){
      if (this.isEmpty()) {return}
      for (var i = 0; i < this.__subscribers.length; i++) {
        if (this.__subscribers[i] === fn && this.__contexts[i] === context) {
          this.__subscribers[i] = null;
          this.__contexts[i] = null;
        }
      }
      if (isAllDead(this.__subscribers)){
        this.__subscribers = null;
        this.__contexts = null;
      }
    },
    isEmpty: function(){
      return this.__subscribers === null;
    },
    hasOne: function(){
      return !this.isEmpty() && this.__subscribers.length === 1;
    },
    send: function(x){
      if (this.isEmpty()) {return}
      for (var i = 0, l = this.__subscribers.length; i < l; i++) {
        var callback = this.__subscribers[i];
        var context = this.__contexts[i];
        if (isFn(callback)) {
          if(Kefir.NO_MORE === callback.call(context, x)) {
            this.remove(callback, context);
          }
        }
      }
    }
  });





  // Helper mixins

  var withHandlerMixin = {
    __Constructor: function(source) {
      this.__source = source;
      source.onEnd(this.__sendEnd, this);
      if (source instanceof Property && this instanceof Property && source.hasCached()) {
        this.__handle(source.getCached());
      }
    },
    __handle: function(x){
      this._send(x);
    },
    __onFirstIn: function(){
      this.__source.onChanges(this.__handle, this);
    },
    __onLastOut: function(){
      this.__source.off(this.__handle, this);
    },
    __end: function(){
      this.__source = null;
    }
  }






  // Base Stream class

  var Stream = Kefir.Stream = inherit(function Stream(onFirstIn, onLastOut){

    // __onFirstIn, __onLastOut can also be added to prototype of child classes
    if (isFn(onFirstIn)) {
      this.__onFirstIn = onFirstIn;
    }
    if (isFn(onLastOut)) {
      this.__onLastOut = onLastOut;
    }

    this.__subscribers = new Callbacks;
    this.__endSubscribers = new Callbacks;
  }, Object, {

    _send: function(x) {
      if (!this.isEnded()) {
        if (x === Kefir.END) {
          this.__end();
        } else {
          this.__deliver(x);
        }
      }
    },
    __deliver: function(x){
      if (!this.__subscribers.isEmpty()) {
        this.__subscribers.send(x);
        if (this.__subscribers.isEmpty()) {
          this.__onLastOut();
        }
      }
    },
    on: function(callback, context) {
      if (!this.isEnded()) {
        this.__subscribers.add(callback, context);
        if (this.__subscribers.hasOne()) {
          this.__onFirstIn();
        }
      }
    },
    onChanges: function(callback, context){
      this.on(callback, context);
    },
    off: function(callback, context) {
      if (!this.isEnded()) {
        this.__subscribers.remove(callback, context);
        if (this.__subscribers.isEmpty()) {
          this.__onLastOut();
        }
      }
    },
    onEnd: function(callback, context) {
      if (this.isEnded()) {
        callback.call(context);
      } else {
        this.__endSubscribers.add(callback, context);
      }
    },
    offEnd: function(callback, context) {
      if (!this.isEnded()){
        this.__endSubscribers.remove(callback, context);
      }
    },
    isEnded: function() {
      return this.__subscribers === null;
    },
    hasSubscribers: function(){
      return !this.isEnded() && !this.__subscribers.isEmpty();
    },
    __onFirstIn: noop,
    __onLastOut: noop,
    __sendEnd: function(){
      this._send(Kefir.END);
    },
    __end: function() {
      if (!this.isEnded()) {
        this.__onLastOut();
        this.__endSubscribers.send();
        if (own(this, '__onFirstIn')) {
          this.__onFirstIn = null;
        }
        if (own(this, '__onLastOut')) {
          this.__onLastOut = null;
        }
        this.__subscribers = null;
        this.__endSubscribers = null;
      }
    }

  });






  // Never

  var neverObj = createObj(Stream.prototype);
  neverObj.__subscribers = null;
  Kefir.never = function() {
    return neverObj;
  }




  // Once

  Kefir.OnceStream = inherit(function OnceStream(value){
    Stream.call(this);
    this.__value = value;
  }, Stream, {

    __onFirstIn: function(){
      this._send(this.__value);
      this.__value = null;
      this._send(Kefir.END);
    }

  });

  Kefir.once = function(x) {
    return new Kefir.OnceStream(x);
  }




  // Property

  var Property = Kefir.Property = inherit(function Property(onFirstIn, onLastOut, initial){
    Stream.call(this, onFirstIn, onLastOut);
    this.__hasCached = (typeof initial !== "undefined");
    this.__cached = initial;
  }, Stream, {

    onChanges: function(callback, context){
      Stream.prototype.on.call(this, callback, context);
    },
    on: function(callback, context) {
      if (this.__hasCached) {
        callback(this.__cached);
      }
      this.onChanges(callback, context);
    },
    _send: function(x) {
      if (!this.isEnded()){
        this.__hasCached = true;
        this.__cached = x;
      }
      Stream.prototype._send.call(this, x);
    },
    toProperty: function(initial){
      assert(
        typeof initial === "undefined",
        "can't convert Property to Property with new initial value"
      )
      return this;
    },
    hasCached: function(){
      return this.__hasCached;
    },
    getCached: function(){
      return this.__cached;
    }

  })

  Kefir.PropertyFromStream = inherit(function PropertyFromStream(source, initial){
    Property.call(this, null, null, initial);
    this.__Constructor.call(this, source);
  }, Property, extend({}, withHandlerMixin, {

    __end: function(){
      Property.prototype.__end.call(this);
      withHandlerMixin.__end.call(this);
    }

  }))

  Stream.prototype.toProperty = function(initial){
    return new Kefir.PropertyFromStream(this, initial);
  }




  // Property::changes()

  Kefir.ChangesStream = inherit(function ChangesStream(source){
    Stream.call(this);
    this.__Constructor.call(this, source);
  }, Stream, extend({}, withHandlerMixin, {

    __end: function(){
      Stream.prototype.__end.call(this);
      withHandlerMixin.__end.call(this);
    }

  }))

  Property.prototype.changes = function() {
    return new Kefir.ChangesStream(this);
  };





  // fromBinder

  Kefir.FromBinderStream = inherit(function FromBinderStream(subscribe){
    Stream.call(this);
    this.__subscribe = subscribe;
  }, Stream, {

    __onFirstIn: function(){
      var _this = this;
      this.__usubscriber = this.__subscribe(function(x){
        _this._send(x);
      });
    },
    __onLastOut: function(){
      if (isFn(this.__usubscriber)) {
        this.__usubscriber();
      }
      this.__usubscriber = null;
    },
    __end: function(){
      Stream.prototype.__end.call(this);
      this.__subscribe = null;
    }

  })

  Kefir.fromBinder = function(subscribe){
    return new Kefir.FromBinderStream(subscribe);
  }








  // Bus

  Kefir.Bus = inherit(function Bus(){
    Stream.call(this);
    this.__plugged = [];
  }, Stream, {

    push: function(x){
      this._send(x)
    },
    plug: function(stream){
      if (!this.isEnded()) {
        this.__plugged.push(stream);
        if (this.hasSubscribers()) {
          stream.on(this._send, this);
        }
        var _this = this;
        stream.onEnd(function(){  _this.unplug(stream)  });
      }
    },
    unplug: function(stream){
      if (!this.isEnded()) {
        stream.off(this._send, this);
        removeFromArray(this.__plugged, stream);
      }
    },
    end: function(){
      this._send(Kefir.END);
    },
    __onFirstIn: function(){
      for (var i = 0; i < this.__plugged.length; i++) {
        this.__plugged[i].on(this._send, this);
      }
    },
    __onLastOut: function(){
      for (var i = 0; i < this.__plugged.length; i++) {
        this.__plugged[i].off(this._send, this);
      }
    },
    __end: function(){
      Stream.prototype.__end.call(this);
      this.__plugged = null;
      this.push = noop;
    }

  });

  Kefir.bus = function(){
    return new Kefir.Bus;
  }




  // FromPoll

  var FromPollStream = Kefir.FromPollStream = inherit(function FromPollStream(interval, sourceFn){
    Stream.call(this);
    this.__interval = interval;
    this.__intervalId = null;
    var _this = this;
    this.__send = function(){  _this._send(sourceFn())  }
  }, Stream, {

    __onFirstIn: function(){
      this.__intervalId = setInterval(this.__send, this.__interval);
    },
    __onLastOut: function(){
      if (this.__intervalId !== null){
        clearInterval(this.__intervalId);
        this.__intervalId = null;
      }
    },
    __end: function(){
      Stream.prototype.__end.call(this);
      this.__send = null;
    }

  });

  Kefir.fromPoll = function(interval, sourceFn){
    return new FromPollStream(interval, sourceFn);
  }



  // Interval

  Kefir.interval = function(interval, x){
    return new FromPollStream(interval, function(){  return x });
  }



  // Sequentially

  Kefir.sequentially = function(interval, values){
    values = values.slice(0);
    return new FromPollStream(interval, function(){
      if (values.length === 0){
        return Kefir.END;
      } else {
        return values.shift();
      }
    });
  }



  // Repeatedly

  Kefir.repeatedly = function(interval, values){
    var i = -1;
    return new FromPollStream(interval, function(){
      return values[++i % values.length];
    });
  }




  // Map

  var mapMixin = extend({}, withHandlerMixin, {
    __Constructor: function(source, mapFn){
      if (source instanceof Property) {
        Property.call(this);
      } else {
        Stream.call(this);
      }
      this.__mapFn = mapFn;
      withHandlerMixin.__Constructor.call(this, source);
    },
    __handle: function(x){
      this._send( this.__mapFn(x) );
    },
    __end: function(){
      Stream.prototype.__end.call(this);
      withHandlerMixin.__end.call(this);
      this.__mapFn = null;
    }
  });

  Kefir.MappedStream = inherit(
    function MappedStream(){this.__Constructor.apply(this, arguments)},
    Stream, mapMixin
  );

  Kefir.MappedProperty = inherit(
    function MappedProperty(){this.__Constructor.apply(this, arguments)},
    Property, mapMixin
  );

  Stream.prototype.map = function(fn) {
    if (this instanceof Property) {
      return new Kefir.MappedProperty(this, fn);
    } else {
      return new Kefir.MappedStream(this, fn);
    }
  };







  // Filter

  var filterMixin = extend({}, mapMixin, {
    __handle: function(x){
      if (this.__mapFn(x)) {
        this._send(x);
      }
    }
  });

  Kefir.FilteredStream = inherit(
    function FilteredStream(){this.__Constructor.apply(this, arguments)},
    Stream, filterMixin
  );

  Kefir.FilteredProperty = inherit(
    function FilteredProperty(){this.__Constructor.apply(this, arguments)},
    Property, filterMixin
  );

  Stream.prototype.filter = function(fn) {
    if (this instanceof Property) {
      return new Kefir.FilteredProperty(this, fn);
    } else {
      return new Kefir.FilteredStream(this, fn);
    }
  };





  // TakeWhile

  var takeWhileMixin = extend({}, mapMixin, {
    __handle: function(x){
      if (this.__mapFn(x)) {
        this._send(x);
      } else {
        this._send(Kefir.END);
      }
    }
  });

  Kefir.TakeWhileStream = inherit(
    function TakeWhileStream(){this.__Constructor.apply(this, arguments)},
    Stream, takeWhileMixin
  );

  Kefir.TakeWhileProperty = inherit(
    function TakeWhileProperty(){this.__Constructor.apply(this, arguments)},
    Property, takeWhileMixin
  );

  Stream.prototype.takeWhile = function(fn) {
    if (this instanceof Property) {
      return new Kefir.TakeWhileProperty(this, fn);
    } else {
      return new Kefir.TakeWhileStream(this, fn);
    }
  };




  // Take

  Stream.prototype.take = function(n) {
    return this.takeWhile(function(){
      return n-- > 0;
    })
  };






  // FlatMap

  Kefir.FlatMappedStream = inherit(function FlatMappedStream(sourceStream, mapFn){
    Stream.call(this)
    this.__sourceStream = sourceStream;
    this.__plugged = [];
    this.__mapFn = mapFn;
    sourceStream.onEnd(this.__sendEnd, this);
  }, Stream, {

    __plugResult: function(x){
      this.__plug(  this.__mapFn(x)  );
    },
    __onFirstIn: function(){
      this.__sourceStream.on(this.__plugResult, this);
      for (var i = 0; i < this.__plugged.length; i++) {
        this.__plugged[i].on(this._send, this);
      }
    },
    __onLastOut: function(){
      this.__sourceStream.off(this.__plugResult, this);
      for (var i = 0; i < this.__plugged.length; i++) {
        this.__plugged[i].off(this._send, this);
      }
    },
    __plug: function(stream){
      this.__plugged.push(stream);
      if (this.hasSubscribers()) {
        stream.on(this._send, this);
      }
      var _this = this;
      stream.onEnd(function(){  _this.__unplug(stream)  });
    },
    __unplug: function(stream){
      if (!this.isEnded()) {
        stream.off(this._send, this);
        removeFromArray(this.__plugged, stream);
      }
    },
    __end: function(){
      Stream.prototype.__end.call(this);
      this.__sourceStream = null;
      this.__mapFn = null;
      this.__plugged = null;
    }

  });

  Stream.prototype.flatMap = function(fn) {
    return new Kefir.FlatMappedStream(this, fn);
  };








  // Merge

  Kefir.MergedStream = inherit(function MergedStream(){
    Stream.call(this)
    this.__sources = firstArrOrToArr(arguments);
    for (var i = 0; i < this.__sources.length; i++) {
      this.__sources[i].onEnd(
        this.__unplugFor(this.__sources[i])
      );
    }
  }, Stream, {

    __onFirstIn: function(){
      for (var i = 0; i < this.__sources.length; i++) {
        this.__sources[i].on(this._send, this);
      }
    },
    __onLastOut: function(){
      for (var i = 0; i < this.__sources.length; i++) {
        this.__sources[i].off(this._send, this);
      }
    },
    __unplug: function(stream){
      stream.off(this._send, this);
      removeFromArray(this.__sources, stream);
      if (this.__sources.length === 0) {
        this._send(Kefir.END);
      }
    },
    __unplugFor: function(stream){
      var _this = this;
      return function(){  _this.__unplug(stream)  }
    },
    __end: function(){
      Stream.prototype.__end.call(this);
      this.__sources = null;
    }

  });

  Kefir.merge = function() {
    return new Kefir.MergedStream(firstArrOrToArr(arguments));
  }

  Stream.prototype.merge = function() {
    return Kefir.merge([this].concat(firstArrOrToArr(arguments)));
  }









  // Combine

  Kefir.CombinedStream = inherit(function CombinedStream(sources, mapFn){
    Stream.call(this)

    this.__sources = sources;
    this.__cachedValues = new Array(sources.length);
    this.__hasCached = new Array(sources.length);
    this.__receiveFns = new Array(sources.length);
    this.__mapFn = mapFn;

    for (var i = 0; i < this.__sources.length; i++) {
      this.__receiveFns[i] = this.__receiveFor(i);
      this.__sources[i].onEnd( this.__unplugFor(i) );
    }

  }, Stream, {

    __onFirstIn: function(){
      for (var i = 0; i < this.__sources.length; i++) {
        if (this.__sources[i]) {
          this.__sources[i].on(this.__receiveFns[i]);
        }
      }
    },
    __onLastOut: function(){
      for (var i = 0; i < this.__sources.length; i++) {
        if (this.__sources[i]) {
          this.__sources[i].off(this.__receiveFns[i]);
        }
      }
    },
    __unplug: function(i){
      this.__sources[i].off(this.__receiveFns[i]);
      this.__sources[i] = null
      this.__receiveFns[i] = null
      if (isAllDead(this.__sources)) {
        this._send(Kefir.END);
      }
    },
    __unplugFor: function(i){
      var _this = this;
      return function(){  _this.__unplug(i)  }
    },
    __receive: function(i, x) {
      this.__hasCached[i] = true;
      this.__cachedValues[i] = x;
      if (this.__allCached()) {
        if (isFn(this.__mapFn)) {
          this._send(this.__mapFn.apply(null, this.__cachedValues));
        } else {
          this._send(this.__cachedValues.slice(0));
        }
      }
    },
    __receiveFor: function(i) {
      var _this = this;
      return function(x){
        _this.__receive(i, x);
      }
    },
    __allCached: function(){
      for (var i = 0; i < this.__hasCached.length; i++) {
        if (!this.__hasCached[i]) {
          return false;
        }
      }
      return true;
    },
    __end: function(){
      Stream.prototype.__end.call(this);
      this.__sources = null;
      this.__cachedValues = null;
      this.__hasCached = null;
      this.__receiveFns = null;
      this.__mapFn = null;
    }

  });

  Kefir.combine = function(sources, mapFn) {
    return new Kefir.CombinedStream(sources, mapFn);
  }

  Stream.prototype.combine = function(sources, mapFn) {
    return Kefir.combine([this].concat(sources), mapFn);
  }





  // Log

  Stream.prototype.log = function(text) {
    function log(value){
      if (text) {
        console.log(text, value);
      } else {
        console.log(value);
      }
    }
    this.on(log);
    this.onEnd(function(){  log(Kefir.END)  });
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
