/*!
Copyright (C) 2015 by Andrea Giammarchi @WebReflection

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
define(function () {
var mixin = (function (O) {'use strict';

  var
    // feature detection: try to use Symbol
    // to avoid name clashing as much as possible.
    // Also verify if Symbol.hasInstance is present
    // Use a basic Symbol fall-back and eventually
    // ignore setting the Symbol.hasInstance method
    notDefined = typeof notDefined,
    hasSymbol = typeof Symbol !== notDefined,
    hasInstanceOf = hasSymbol && !!Symbol.hasInstance,
    i = 0, // will make Symbol fall-back less name-clash prone
    createSymbol = hasSymbol ? Symbol : function (name) {
      return '@@:' + (++i) + ':' +  name + Math.random();
    },
    // unique ID used to set the init list Array
    uid = createSymbol('mixin:init'),

    // shortcut implicitly borrowed from Object.prototype
    hOP = O.hasOwnProperty,

    // shortcuts for common Object methods
    // partially polyfilled for this closure purpose only
    // if you are targeting IE8 don't forget to include
    // ES5 shim+sham upfront or this script would fail
    // because IE8 has a dumb implementation of defineProperty
    defineProperty =  O.defineProperty ||
            function (o, k, d) {o[k] = d.value;},
    gOPN =  O.getOwnPropertyNames || O.keys ||
            function (o, a, k) {
              a = [];
              for (k in o) if (hOP.call(o, k)) a.push(k);
              return a;
            },
    gOPD = O.getOwnPropertyDescriptor ||
            function (o, k) {return {value: o[k]};},
    gOPS = O.getOwnPropertySymbols ||
            function () { return []; },

    // shortcut or fall-back for Reflect.ownKeys
    ownKeys = typeof Reflect === notDefined || !Reflect.ownKeys ?
      function (obj) {
        return gOPN(obj).concat(
          gOPS(obj)
        );
      } :
      Reflect.ownKeys,

    // will define shared "public static" properties
    addStaticProperties = function (compose, sharedBehaviour) {
      for (var
        property, descriptor,
        sharedKeys = ownKeys(sharedBehaviour),
        i = 0, l = sharedKeys.length; i < l; i++
      ) {
        descriptor = gOPD(sharedBehaviour, (property = sharedKeys[i]));
        // ensure these are not configurable
        descriptor.configurable = false;
        // if not a getter/setter, ensure these are not writable
        if (hOP.call(descriptor, 'writable')) {
          descriptor.writable = false;
        }
        // finally define it as callback property
        defineProperty(compose, property, descriptor);
      }
    },

    // objects eventually recycled per every mixin
    tagDescriptor = hasInstanceOf && {value: true},
    initDescriptor = {value: function init() {
      for (var
        notDefined,
        initializers = this[uid],
        i = 0, l = initializers.length; i < l; i++
      ) {
        // [WARNING]
        // passing arguments to possibly
        // unknown initializers is an anti pattern!
        // You don't know what kind of parameters
        // every mixin.init() might accept so please invoke
        // the init method without arguments or use them
        // as last possible solution/hack to your problem.
        // It is also wrong to return any value
        // since init is a special method that could
        // invoke potentially many `init()` at once.
        // Accordingly, returning anything different
        // from `undefined` will throw an Error
        if (initializers[i].apply(this, arguments) !== notDefined) {
          throw new Error('mixin.init() must not return a value');
        }
      }
    }}
  ;

  return function mixin(behaviour, sharedBehaviour) {

    var
      instanceKeys = ownKeys(behaviour),
      typeTag = hasInstanceOf && createSymbol('isa')
    ;

    function compose(target) {
      for (var
        property, descriptor,
        proto = target.prototype || target,
        i = 0, l = instanceKeys.length; i < l; i++
      ) {
        property = instanceKeys[i];
        if (property === 'init') {
          if (!hOP.call(proto, uid)) {
            defineProperty(proto, uid, {value: []});
            defineProperty(proto, property, initDescriptor);
          }
          proto[uid].push(behaviour[property]);
        } else {
          descriptor = gOPD(behaviour, property);
          descriptor.enumerable = false;
          defineProperty(proto, property, descriptor);
        }
      }
      if (hasInstanceOf) defineProperty(proto, typeTag, tagDescriptor);
      return target;
    }

    // assign this composer shared properties
    if (sharedBehaviour) addStaticProperties(
      compose,
      sharedBehaviour
    );

    // if possible, ensure that
    // obj instanceof MyMixin
    // will return true
    if (hasInstanceOf) defineProperty(
      compose,
      Symbol.hasInstance,
      {value: function hasInstance(obj) {
        return !!obj[typeTag];
      }}
    );

    // return the function that could be used
    // as both decorator, or to enrich any sort of object
    return compose;

  };

}(Object));
return mixin;
});