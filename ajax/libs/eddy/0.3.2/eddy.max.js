/*!
Copyright (C) 2013 by Andrea Giammarchi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function (Object) {
  'use strict';
  // probably the very first script you want to load in any project
  // do not redefine same stuff twice anyway
  if (Object.eddy) return;
  Object.eddy = true;

// all private variables
var /*! (C) Andrea Giammarchi Mit Style License */
  ArrayPrototype = Array.prototype,
  ObjectPrototype = Object.prototype,
  EventPrototype = Event.prototype,
  hasOwnProperty = ObjectPrototype.hasOwnProperty,
  push = ArrayPrototype.push,
  slice = ArrayPrototype.slice,
  unshift = ArrayPrototype.unshift,
  // IE < 9 has this problem which makes
  // eddy.js able to implement its features!
  // this would not have been possible in other
  // non ES5 compatible browsers so ... thanks IE!
  IE_WONT_ENUMERATE_THIS = 'toLocaleString',
  SECRET = {toLocaleString:1}.propertyIsEnumerable(
    IE_WONT_ENUMERATE_THIS
  ) ? '_@eddy' + Math.random() : IE_WONT_ENUMERATE_THIS,
  IE = SECRET === IE_WONT_ENUMERATE_THIS,
  // used in all ES5 compatible browsers (all but IE < 9)
  commonDescriptor =  (Object.create || Object)(null),
  defineProperty = IE ?
    function (self, property, descriptor) {
      self[property] = descriptor.value;
    } :
    Object.defineProperty,
  // http://jsperf.com/bind-no-args bind is still freaking slow so...
  bind = /* Object.bind || */ function (context) {
    // this is not a fully specd replacemenet for Function#bind
    // but works specifically for this use case like a charm
    var fn = this;
    return function () {
      return fn.apply(context, arguments);
    };
  },
  indexOf = ArrayPrototype.indexOf || function (value) {
    // if you want more standard indexOf use a proper polyfill
    // and include it before eddy.js
    var i = this.length;
    while (i-- && this[i] !== value) {}
    return i;
  },
  // every triggered even has a timeStamp
  now = Date.now || function () {
    return new Date().getTime();
  },
  // for ES3+ and JScript native Objects
  // no hosted objects are considered here
  // see eddy.dom.js for that
  eddy = {
    /**
     * Returns a bound version of the specified method.
     * If called again with same method, the initial bound
     * object will be returned instead of creating a new one.
     * This will make the following assertion always true:
     *
     * @example
     *  obj.boundTo('method') === obj.boundTo('method')
     *  // same as
     *  obj.boundTo(obj.method) === obj.boundTo(obj.method)
     *  // same as
     *  obj.boundTo('method') === obj.boundTo(obj.method)
     *
     * Bear in mind no arguments can be bound once, only the context.
     * Method could be either a function or a string.
     * In latter case, be aware Google Closure Compiler
     * might change methods name if compiled with
     * ADVANCED_OPTION resulting in a broken code.
     * Use methods instead of strings if you use such option.
     * @param   method  string|Function   the method name to bind
     * @return  Object  the callable bound function/method.
     */
    boundTo: function boundTo(method) {
      var
        all = hasOwnProperty.call(this, SECRET) ?
              this[SECRET] : setAndGet(this),
        m = all.m,
        b = all.b,
        fn = typeof method === 'string' ? this[method] : method,
        i = indexOf.call(m, fn);
      return i < 0 ?
          (b[push.call(m, fn) - 1] = bind.call(fn, this)) :
          b[i];
    },
    /**
     * Borrowed from node.js, it does exactly what node.js does.
     * 
     * @example
     *  {}.on('evt', function(arg1, arg2, argN){
     *    console.log(arg1, arg2, argN);
     *  }).emit('evt', 1, 2, 3);
     *  // {'0': 1, '1': 2, '2': 3}
     *
     * @param   type  string  the event name to emit
     * @param   [any=any]     one or more arguments to pass through
     * @return  boolean       true if the event was emitted
     */
    emit: function emit(type) {
      var
        has = hasOwnProperty.call(this, SECRET),
        listeners = has && this[SECRET].l,
        loop = has && hasOwnProperty.call(listeners, type),
        array = loop && listeners[type],
        args = loop && slice.call(arguments, 1),
        i = 0,
        length = loop ? array.length : i;
      while (i < length) {
        triggerEvent(this, array[i++], args);
      }
      return loop;
    },
    /**
     * Borrowed from node.js, it does exactly what node.js does.
     *
     * @example
     *  {}.on('evt', function a(){}).listeners('evt');
     *  // [ function a(){} ]
     *
     * @param   type  string  the optional event name to emit
     */
    listeners: function listeners(type) {
      return  hasOwnProperty.call(this, SECRET) &&
              hasOwnProperty.call(this[SECRET].l, type) &&
              this[SECRET].l[type].slice() || [];
    },
    /**
     * Counter part of `.on(type, handler)`
     * The equivalent of `removeListener` or `removeEventListener`.
     * It removes an event if already added and return same object
     *
     * @example
     *  var obj = {}.on('evt', console.boundTo('log'));
     *  obj.emit('evt', 'OK'); // "OK" true
     *  obj
     *    .off('evt', console.boundTo('log'))
     *    .emit('evt')
     *  ; // false
     *
     * @param   type  string  the event name to un-listen to
     * @param   handler Function|Object   the handler used initially
     * @return  Object  the chained object that called `.off()`
     */
    off: function off(type, handler) {
      var
        has = hasOwnProperty.call(this, SECRET),
        listeners = has && this[SECRET].l,
        array = has && hasOwnProperty.call(listeners, type) &&
          listeners[type],
        i
      ;
      if (array) {
        i = indexOf.call(array, handler);
        if (-1 < i) {
          array.splice(i, 1);
          if (!array.length) {
            delete listeners[type];
          }
        }
      }
      return this;
    },
    /**
     * The equivalent of `addListener` or `addEventListener`.
     * It adds an event if not already added and return same object
     *
     * @example
     *  var i = 0;
     *  function genericEvent() {
     *    console.log(++i);
     *  }
     *  var obj = {};
     *  obj
     *    .on('evt', genericEvent)
     *    .on('evt', genericEvent)
     *  ;
     *  obj.emit('evt'); // 1
     *
     * @param   type  string  the event name to listen to
     * @param   handler Function|Object   the handler used initially
     * @param   [optional, **reserved**] boolean  unshift instead of push
     * @return  Object  the chained object that called `.on()`
     */
    on: function on(type, handler, capture) {
      var
        has = hasOwnProperty.call(this, SECRET),
        listeners = (has ? this[SECRET] : setAndGet(this)).l,
        array = has && hasOwnProperty.call(listeners, type) ?
            listeners[type] : listeners[type] = []
      ;
      if (indexOf.call(array, handler) < 0) {
        (capture ? unshift : push).call(array, handler);
      }
      return this;
    },
    /**
     * Assigns an event that will be dropped the very first time
     * it will be triggered/emitted/fired.
     *
     * @example
     *  var i = 0;
     *  var obj = {}.once('increment', function(){
     *    console.log(++i);
     *  });
     *  obj.emit('increment'); // 1 true
     *  obj.emit('increment'); // false
     *
     * @param   type  string  the event name to emit
     * @param   handler Function|Object   the handler used initially
     * @param   [optional, **reserved**] boolean  unshift instead of push
     * @return  Object  the chained object that called `.once()`
     */
    once: function once(type, handler, capture) {
      var
        // IE8 has duplicated expression/declaration bug
        // could not self.on(type, function once(){}, ...);
        cb = function(e) {
          self.off(type, cb, capture);
          triggerEvent(self, handler, arguments);
        },
        self = this
      ;
      return self.on(type, cb, capture);
    },
    /**
     * Triggers an event in a *DOMish* way.
     * The handler wil be invoked with a single object
     * argument as event with at least a method called
     * `stopImmediatePropagation()` able to break the
     * method invocation loop.
     *
     * The event object will have always at least these properties:
     *  type      string    the name of the event
     *  timeStamp number    when the event has been triggered
     *  target    object    the original object that triggered
     *  data      [any]     optional argument passed through
     *                      eventually copied over the event
     * 
     * @example
     *  var o = {}.on('evt', function(e){
     *    console.log(e.type);
     *    console.log(e.data === RegExp);
     *  });
     *  o.trigger('evt', RegExp);
     *  // "evt" true true
     *
     * @param   type  string  the event name to emit
     * @param   [any=any]     optional data object to pass through
     *                        and/or copy over the event object
     * @return  boolean       true if the event was triggered
     */
    trigger: function trigger(evt, data) {
      var
        has = hasOwnProperty.call(this, SECRET),
        listeners = has && this[SECRET].l,
        isString = typeof evt == 'string',
        type = isString ? evt : evt.type,
        loop = has && hasOwnProperty.call(listeners, type),
        array = loop && listeners[type].slice(0),
        event = isString ?
            new Event(this, type, data) : evt,
        args = [event],
        i = 0,
        length = loop ? array.length : i,
        isNotAnEventInstance = !(event instanceof Event),
        result,
        current;
      if (isNotAnEventInstance) {
        event._active = true;
        event.stopImmediatePropagation =
          EventPrototype.stopImmediatePropagation;
      }
      event.currentTarget = this;
      while (event._active && i < length) {
        triggerEvent(this, array[i++], args);
      }
      result = !!event._active;
      if (isNotAnEventInstance) {
        delete event._active;
        delete event.stopImmediatePropagation;
      }
      return result;
    }
  },
  WTF = false,
  ifNotPresent,
  key;

/* eddy.js private helpers/shortcuts */
// the object used to trap listeners and bound functions
function createSecret() {
  return {
    l: {},
    m: [],
    b: []
  };
}

// assign properties only if not there already
try {
  document.createEvent('Event').target = document;
  ifNotPresent = function(e, key, value) {
    if (!hasOwnProperty.call(e, key)) {
      e[key] = value;
    }
  };
} catch(Nokia_Xpress) {
  WTF = true;
  ifNotPresent = function(e, key, value) {
    if (!hasOwnProperty.call(e, key)) {
      try {
        e[key] = value;
      } catch(Nokia_Xpress) {}
    }
  };
}

function setAndGet(self) {
  var value = createSecret();
  commonDescriptor.value = value;
  defineProperty(self, SECRET, commonDescriptor);
  commonDescriptor.value = null;
  return value;
}

// check if the handler is a function OR an object
// in latter case invoke `handler.handleEvent(args)`
// compatible with DOM event handlers
function triggerEvent(context, handler, args) {
  if (typeof handler == 'function') {
    handler.apply(context, args);
  } else {
    handler.handleEvent.apply(handler, args);
  }
}

/* the basic eddy.js Event class */
function Event(target, type, data) {
  ifNotPresent(this, 'timeStamp', now());
  for (var key in data) {
    if (hasOwnProperty.call(data, key)) {
      ifNotPresent(this, key, data[key]);
    }
  }
  ifNotPresent(this, 'type', type);
  ifNotPresent(this, 'target', target);
  if (data) ifNotPresent(this, 'data', data);
}
EventPrototype._active = true;
EventPrototype.stopImmediatePropagation = function () {
  this._active = false;
};

// assign in the least obtrusive way eddy properties
for (key in eddy) {
  if (hasOwnProperty.call(eddy, key)) {
    defineProperty(ObjectPrototype, key, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: eddy[key]
    });
  }
}
(function(forEach){
  function fn(key) {
    function callback(value) {
      /*jshint validthis:true */
      value[key].apply(value, this);
    }
    return function () {
      forEach.call(this, callback, arguments);
      return this;
    };
  }
  for(var key in eddy) {
    if (
      eddy.hasOwnProperty(key) &&
      !/^listeners|boundTo$/.test(key)
    ) {
      defineProperty(
        ArrayPrototype,
        key,
        {
          enumerable: false,
          configurable: true,
          writable: true,
          value: fn(key)
        }
      );
    }
  }
}(ArrayPrototype.forEach));
}(Object));