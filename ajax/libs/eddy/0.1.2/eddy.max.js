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
(function(global){
  'use strict';
  if (global.eddy) return;
  /*! (C) Andrea Giammarchi Mit Style License */
  var
    uid = '_@eddy:' + Math.random(),
    Object = global.Object,
    create = Object.create,
    defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    slice = Array.prototype.slice,
    DOM = global.Node || global.Element || global.HTMLElement,
    hasDOM = !!DOM,
    boundTo = commonDescriptor(
      function boundTo(method) {
        var
          listeners = hasDOM ? DOMWM.get(this) || (
            DOMWM.set(this, create(null)),
            DOMWM.get(this)
          ) : this[uid],
          bound = listeners[uid] || (
            listeners[uid] = {
              m: [],
              b: []
            }
          ),
          fn = typeof method === 'string' ?
            this[method] : method,
          i = bound.m.indexOf(fn);
        return i < 0 ?
          bound.b[bound.m.push(fn) - 1] = fn.bind(this) :
          bound.b[i];
      }
    ),
    once = commonDescriptor(
      function once(type, handler, capture) {
        var self = this;
        return self.on(type, function once() {
          self.off(type, once, capture);
          triggerEvent(handler, self, arguments);
        }, capture);
      }
    ),
    DOMDescriptor = {
      boundTo: boundTo,
      emit: commonDescriptor(
        function DOMemit(type) {
          return this.trigger(
            type,
            {
              data: slice.call(arguments, 1)
            }
          );
        }
      ),
      off: commonDescriptor(
        function DOMOff(type, handler, capture) {
          this.removeEventListener(type, handler, !!capture);
          return this;
        }
      ),
      on: commonDescriptor(
        function DOMOn(type, handler, capture) {
          this.addEventListener(type, handler, !!capture);
          return this;
        }
      ),
      once: once,
      trigger: commonDescriptor(
        function DOMTrigger(evt, data) {
          var
            stringEvent = typeof evt === 'string',
            type = stringEvent ? evt : (data = evt).type,
            e = (
              this.ownerDocument || this.document || global.document
            ).createEvent('Event');
          e.initEvent(
            type,
            data && data.bubbles || 1,
            data && data.cancelable || 1
          );
          initEvent(e, this, type, stringEvent && data);
          this.dispatchEvent(e);
          return this;
        }
      )
    },
    JSDescriptor = {
      boundTo: boundTo,
      emit: commonDescriptor(
        function JSemit(type) {
          var array = this[uid][type],
              emitted = !!array;
          if (emitted) {
            array.forEach(
              emitJS,
              {
                arguments: (
                  array.shift.call(arguments),
                  arguments
                ),
                context: this
              }
            );
          }
          return emitted;
        }
      ),
      off: commonDescriptor(
        function JSOff(type, handler) {
          var
            listeners = this[uid],
            array = listeners[type],
            i;
          if (array) {
            i = array.indexOf(handler);
            if (-1 < i) {
              array.splice(i, 1);
              if (!array.length) {
                delete listeners[type];
              }
            }
          }
          return this;
        }
      ),
      on: commonDescriptor(
        function JSOn(type, handler) {
          var
            listeners = this[uid],
            array = listeners[type] || (listeners[type] = []);
          if (array.indexOf(handler) < 0) {
            array.push(handler);
          }
          return this;
        }
      ),
      once: once,
      trigger: commonDescriptor(
        function JSTrigger(evt, data) {
          var
            listeners = this[uid],
            isNotEvent = typeof evt === 'string',
            array = listeners[isNotEvent ? evt : evt.type];
          if (array) {
            array.every(
              triggerJS,
              {
                arguments: [isNotEvent ?
                  new Event(this, evt, data) :
                  (evt instanceof Event ?
                    evt : injectActiveStatus(evt))],
                context: this
              }
            );
          }
          return this;
        }
      )
    },
    stoppedPropagation = {
      value: false
    },
    WM = global.WeakMap,
    DOMWM
  ;
  function Event(target, type, data) {
    initEvent(this, target, type, data);
  }
  function _stopImmediatePropagation() {
    /*jshint validthis:true */
    stopImmediatePropagation.call(this);
    this._stopImmediatePropagation();
  }
  function commonDescriptor(value) {
    return {
      // writable: true,
      configurable: true,
      value: value
    };
  }
  function defineCommonMethod(name) {
    return function () {
      /*jshint validthis:true */
      return defineProperties(
        this,
        hasDOM && ('dispatchEvent' in this) ?
          DOMDescriptor :
          JSDescriptor
      )[name].apply(this, arguments);
    };
  }
  function ifNotPresent(e, key, value) {
    if (!(key in e)) e[key] = value;
  }
  function initEvent(e, target, type, data) {
    ifNotPresent(e, 'timeStamp', Date.now());
    for(var key in data) ifNotPresent(e, key, data[key]);
    ifNotPresent(e, 'type', type);
    ifNotPresent(e, 'target', target);
    if (data) ifNotPresent(e, 'data', data);
  }
  function injectActiveStatus(evt) {
    evt._active = true;
    evt._stopImmediatePropagation = evt.stopImmediatePropagation;
    evt.stopImmediatePropagation = _stopImmediatePropagation;
    return evt;
  }
  function stopImmediatePropagation() {
    /*jshint validthis:true */
    defineProperty(
      this,
      '_active',
      stoppedPropagation
    );
  }
  function triggerEvent(handler, context, args) {
    if (typeof handler == 'function') {
      handler.apply(context, args);
    } else {
      handler.handleEvent.apply(handler, args);
    }
  }
  function triggerAny(handler, context, e) {
    if (typeof handler == 'function') {
      handler.call(context, e);
    } else {
      handler.handleEvent(e);
    }
  }
  function emitJS(handler) {
    /*jshint validthis:true */
    triggerEvent(handler, this.context, this.arguments);
  }
  function triggerJS(handler) {
    /*jshint validthis:true */
    emitJS.call(this, handler);
    return this.arguments[0]._active;
  }
  if (hasDOM) {
    DOMWM = WM ? new WM() : {
      get: function (node) {
        return node[uid];
      },
      set: function (node, value) {
        defineProperty(
          node,
          uid,
          commonDescriptor(value)
        );
      }
    };
  }
  defineProperties(
    Event.prototype,
    {
      _active: commonDescriptor(true),
      stopImmediatePropagation: commonDescriptor(stopImmediatePropagation)
    }
  );
  // this property is used as
  // defineProperties descriptor
  // for all JS objects
  // In order to grant a fresh new
  // object as event handler
  // and without leaks
  // a new descriptor is returned
  // per each call
  defineProperty(
    JSDescriptor,
    uid,
    {
      enumerable: true,
      get: function get() {
        return {
          value: create(null)
        };
      }
    }
  );
  // all must be configurable
  // so other prototypes can work too
  defineProperties(
    Object.prototype,
    {
      boundTo: commonDescriptor(
        defineCommonMethod('boundTo')
      ),
      emit: commonDescriptor(
        defineCommonMethod('emit')
      ),
      off: commonDescriptor(
        defineCommonMethod('off')
      ),
      on: commonDescriptor(
        defineCommonMethod('on')
      ),
      once: commonDescriptor(
        defineCommonMethod('once')
      ),
      trigger: commonDescriptor(
        defineCommonMethod('trigger')
      )
    }
  );
  /* abandoned right now ... 
  defineProperty(
    String.prototype,
    'toLocaleString',
    commonDescriptor((function(){
      var
        hasOwnProperty = {}.hasOwnProperty,
        re = /\$\{([^}]+?)\}/g,
        place = function ($0, $1) {
          return current[$1];
        },
        locale = create(null),
        current;
      defineProperty(
        String,
        'setLocale',
        commonDescriptor(function setLocale(language){
          for (var key in language) {
            if (hasOwnProperty.call(language, key)) {
              locale[key] = language[key];
            }
          }
          return language;
        })
      );
      return function toLocaleString(object) {
        var result;
        current = object;
        result = (locale[this] || this).replace(re, place);
        current = null;
        return result;
      };
    }()))
  );
  // */
  defineProperty(global, 'eddy', {
    value: true
  });
}(
  typeof global == 'undefined' ? window : global
));