/*!
 * Knockout ES5 plugin - https://github.com/SteveSanderson/knockout-es5
 * Copyright (c) Steve Sanderson
 * MIT license
 */

(function(global, undefined) {
  'use strict';

  var ko;

  // Model tracking
  // --------------
  //
  // This is the central feature of Knockout-ES5. We augment model objects by converting properties
  // into ES5 getter/setter pairs that read/write an underlying Knockout observable. This means you can
  // use plain JavaScript syntax to read/write the property while still getting the full benefits of
  // Knockout's automatic dependency detection and notification triggering.
  //
  // For comparison, here's Knockout ES3-compatible syntax:
  //
  //     var firstNameLength = myModel.user().firstName().length; // Read
  //     myModel.user().firstName('Bert'); // Write
  //
  // ... versus Knockout-ES5 syntax:
  //
  //     var firstNameLength = myModel.user.firstName.length; // Read
  //     myModel.user.firstName = 'Bert'; // Write

  // `ko.track(model)` converts each property on the given model object into a getter/setter pair that
  // wraps a Knockout observable. Optionally specify an array of property names to wrap; otherwise we
  // wrap all properties. If any of the properties are already observables, we replace them with
  // ES5 getter/setter pairs that wrap your original observable instances. In the case of readonly
  // ko.computed properties, we simply do not define a setter (so attempted writes will be ignored,
  // which is how ES5 readonly properties normally behave).
  //
  // By design, this does *not* recursively walk child object properties, because making literally
  // everything everywhere independently observable is usually unhelpful. When you do want to track
  // child object properties independently, define your own class for those child objects and put
  // a separate ko.track call into its constructor --- this gives you far more control.
  /**
   * @param {object} obj
   * @param {object|array.<string>} propertyNamesOrSettings
   * @param {boolean} propertyNamesOrSettings.deep Use deep track.
   * @param {array.<string>} propertyNamesOrSettings.fields Array of property names to wrap.
   * todo: @param {array.<string>} propertyNamesOrSettings.exclude Array of exclude property names to wrap.
   * todo: @param {function(string, *):boolean} propertyNamesOrSettings.filter Function to filter property 
   *   names to wrap. A function that takes ... params
   * @return {object}
   */
  function track(obj, propertyNamesOrSettings) {
    if (!obj || typeof obj !== 'object') {
      throw new Error('When calling ko.track, you must pass an object as the first parameter.');
    }

    var propertyNames;

    if ( isPlainObject(propertyNamesOrSettings) ) {
      // defaults
      propertyNamesOrSettings.deep = propertyNamesOrSettings.deep || false;
      propertyNamesOrSettings.fields = propertyNamesOrSettings.fields || Object.getOwnPropertyNames(obj);
      propertyNamesOrSettings.lazy = propertyNamesOrSettings.lazy || false;

      wrap(obj, propertyNamesOrSettings.fields, propertyNamesOrSettings);
    } else {
      propertyNames = propertyNamesOrSettings || Object.getOwnPropertyNames(obj);
      wrap(obj, propertyNames, {});
    }

    return obj;
  }

  // fix for ie
  var rFunctionName = /^function\s*([^\s(]+)/;
  function getFunctionName( ctor ){
    if (ctor.name) {
      return ctor.name;
    }
    return (ctor.toString().trim().match( rFunctionName ) || [])[1];
  }

  function canTrack(obj) {
    return obj && typeof obj === 'object' && getFunctionName(obj.constructor) === 'Object';
  }

  function createPropertyDescriptor(originalValue, prop, map) {
    var isObservable = ko.isObservable(originalValue);
    var isArray = !isObservable && Array.isArray(originalValue);
    var observable = isObservable ? originalValue
        : isArray ? ko.observableArray(originalValue)
        : ko.observable(originalValue);

    map[prop] = function () { return observable; };

    // add check in case the object is already an observable array
    if (isArray || (isObservable && 'push' in observable)) {
      notifyWhenPresentOrFutureArrayValuesMutate(ko, observable);
    }

    return {
      configurable: true,
      enumerable: true,
      get: observable,
      set: ko.isWriteableObservable(observable) ? observable : undefined
    };
  }

  function createLazyPropertyDescriptor(originalValue, prop, map) {
    if (ko.isObservable(originalValue)) {
      // no need to be lazy if we already have an observable
      return createPropertyDescriptor(originalValue, prop, map);
    }

    var observable;

    function getOrCreateObservable(value, writing) {
      if (observable) {
        return writing ? observable(value) : observable;
      }

      if (Array.isArray(value)) {
        observable = ko.observableArray(value);
        notifyWhenPresentOrFutureArrayValuesMutate(ko, observable);
        return observable;
      }

      return (observable = ko.observable(value));
    }

    map[prop] = function () { return getOrCreateObservable(originalValue); };
    return {
      configurable: true,
      enumerable: true,
      get: function () { return getOrCreateObservable(originalValue)(); },
      set: function (value) { getOrCreateObservable(value, true); }
    };
  }

  function wrap(obj, props, options) {
    if (!props.length) {
      return;
    }

    var allObservablesForObject = getAllObservablesForObject(obj, true);
    var descriptors = {};

    props.forEach(function (prop) {
      // Skip properties that are already tracked
      if (prop in allObservablesForObject) {
        return;
      }

      // Skip properties where descriptor can't be redefined
      if (Object.getOwnPropertyDescriptor(obj, prop).configurable === false){
        return;
      }

      var originalValue = obj[prop];
      descriptors[prop] = (options.lazy ? createLazyPropertyDescriptor : createPropertyDescriptor)
        (originalValue, prop, allObservablesForObject);

      if (options.deep && canTrack(originalValue)) {
        wrap(originalValue, Object.keys(originalValue), options);
      }
    });

    Object.defineProperties(obj, descriptors);
  }

  function isPlainObject( obj ){
    return !!obj && typeof obj === 'object' && obj.constructor === Object;
  }

  // Lazily created by `getAllObservablesForObject` below. Has to be created lazily because the
  // WeakMap factory isn't available until the module has finished loading (may be async).
  var objectToObservableMap;

  // Gets or creates the hidden internal key-value collection of observables corresponding to
  // properties on the model object.
  function getAllObservablesForObject(obj, createIfNotDefined) {
    if (!objectToObservableMap) {
      objectToObservableMap = weakMapFactory();
    }

    var result = objectToObservableMap.get(obj);
    if (!result && createIfNotDefined) {
      result = {};
      objectToObservableMap.set(obj, result);
    }
    return result;
  }

  // Removes the internal references to observables mapped to the specified properties
  // or the entire object reference if no properties are passed in. This allows the
  // observables to be replaced and tracked again.
  function untrack(obj, propertyNames) {
    if (!objectToObservableMap) {
      return;
    }

    if (arguments.length === 1) {
      objectToObservableMap['delete'](obj);
    } else {
      var allObservablesForObject = getAllObservablesForObject(obj, false);
      if (allObservablesForObject) {
        propertyNames.forEach(function(propertyName) {
          delete allObservablesForObject[propertyName];
        });
      }
    }
  }

  // Computed properties
  // -------------------
  //
  // The preceding code is already sufficient to upgrade ko.computed model properties to ES5
  // getter/setter pairs (or in the case of readonly ko.computed properties, just a getter).
  // These then behave like a regular property with a getter function, except they are smarter:
  // your evaluator is only invoked when one of its dependencies changes. The result is cached
  // and used for all evaluations until the next time a dependency changes).
  //
  // However, instead of forcing developers to declare a ko.computed property explicitly, it's
  // nice to offer a utility function that declares a computed getter directly.

  // Implements `ko.defineProperty`
  function defineComputedProperty(obj, propertyName, evaluatorOrOptions) {
    var ko = this,
      computedOptions = { owner: obj, deferEvaluation: true };

    if (typeof evaluatorOrOptions === 'function') {
      computedOptions.read = evaluatorOrOptions;
    } else {
      if ('value' in evaluatorOrOptions) {
        throw new Error('For ko.defineProperty, you must not specify a "value" for the property. ' +
                        'You must provide a "get" function.');
      }

      if (typeof evaluatorOrOptions.get !== 'function') {
        throw new Error('For ko.defineProperty, the third parameter must be either an evaluator function, ' +
                        'or an options object containing a function called "get".');
      }

      computedOptions.read = evaluatorOrOptions.get;
      computedOptions.write = evaluatorOrOptions.set;
    }

    obj[propertyName] = ko.computed(computedOptions);
    track.call(ko, obj, [propertyName]);
    return obj;
  }

  // Array handling
  // --------------
  //
  // Arrays are special, because unlike other property types, they have standard mutator functions
  // (`push`/`pop`/`splice`/etc.) and it's desirable to trigger a change notification whenever one of
  // those mutator functions is invoked.
  //
  // Traditionally, Knockout handles this by putting special versions of `push`/`pop`/etc. on observable
  // arrays that mutate the underlying array and then trigger a notification. That approach doesn't
  // work for Knockout-ES5 because properties now return the underlying arrays, so the mutator runs
  // in the context of the underlying array, not any particular observable:
  //
  //     // Operates on the underlying array value
  //     myModel.someCollection.push('New value');
  //
  // To solve this, Knockout-ES5 detects array values, and modifies them as follows:
  //  1. Associates a hidden subscribable with each array instance that it encounters
  //  2. Intercepts standard mutators (`push`/`pop`/etc.) and makes them trigger the subscribable
  // Then, for model properties whose values are arrays, the property's underlying observable
  // subscribes to the array subscribable, so it can trigger a change notification after mutation.

  // Given an observable that underlies a model property, watch for any array value that might
  // be assigned as the property value, and hook into its change events
  function notifyWhenPresentOrFutureArrayValuesMutate(ko, observable) {
    var watchingArraySubscription = null;
    ko.computed(function () {
      // Unsubscribe to any earlier array instance
      if (watchingArraySubscription) {
        watchingArraySubscription.dispose();
        watchingArraySubscription = null;
      }

      // Subscribe to the new array instance
      var newArrayInstance = observable();
      if (newArrayInstance instanceof Array) {
        watchingArraySubscription = startWatchingArrayInstance(ko, observable, newArrayInstance);
      }
    });
  }

  // Listens for array mutations, and when they happen, cause the observable to fire notifications.
  // This is used to make model properties of type array fire notifications when the array changes.
  // Returns a subscribable that can later be disposed.
  function startWatchingArrayInstance(ko, observable, arrayInstance) {
    var subscribable = getSubscribableForArray(ko, arrayInstance);
    return subscribable.subscribe(observable);
  }

  // Lazily created by `getSubscribableForArray` below. Has to be created lazily because the
  // WeakMap factory isn't available until the module has finished loading (may be async).
  var arraySubscribablesMap;

  // Gets or creates a subscribable that fires after each array mutation
  function getSubscribableForArray(ko, arrayInstance) {
    if (!arraySubscribablesMap) {
      arraySubscribablesMap = weakMapFactory();
    }

    var subscribable = arraySubscribablesMap.get(arrayInstance);
    if (!subscribable) {
      subscribable = new ko.subscribable();
      arraySubscribablesMap.set(arrayInstance, subscribable);

      var notificationPauseSignal = {};
      wrapStandardArrayMutators(arrayInstance, subscribable, notificationPauseSignal);
      addKnockoutArrayMutators(ko, arrayInstance, subscribable, notificationPauseSignal);
    }

    return subscribable;
  }

  // After each array mutation, fires a notification on the given subscribable
  function wrapStandardArrayMutators(arrayInstance, subscribable, notificationPauseSignal) {
    ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'].forEach(function(fnName) {
      var origMutator = arrayInstance[fnName];
      arrayInstance[fnName] = function() {
        var result = origMutator.apply(this, arguments);
        if (notificationPauseSignal.pause !== true) {
          subscribable.notifySubscribers(this);
        }
        return result;
      };
    });
  }

  // Adds Knockout's additional array mutation functions to the array
  function addKnockoutArrayMutators(ko, arrayInstance, subscribable, notificationPauseSignal) {
    ['remove', 'removeAll', 'destroy', 'destroyAll', 'replace'].forEach(function(fnName) {
      // Make it a non-enumerable property for consistency with standard Array functions
      Object.defineProperty(arrayInstance, fnName, {
        enumerable: false,
        value: function() {
          var result;

          // These additional array mutators are built using the underlying push/pop/etc.
          // mutators, which are wrapped to trigger notifications. But we don't want to
          // trigger multiple notifications, so pause the push/pop/etc. wrappers and
          // delivery only one notification at the end of the process.
          notificationPauseSignal.pause = true;
          try {
            // Creates a temporary observableArray that can perform the operation.
            result = ko.observableArray.fn[fnName].apply(ko.observableArray(arrayInstance), arguments);
          }
          finally {
            notificationPauseSignal.pause = false;
          }
          subscribable.notifySubscribers(arrayInstance);
          return result;
        }
      });
    });
  }

  // Static utility functions
  // ------------------------
  //
  // Since Knockout-ES5 sets up properties that return values, not observables, you can't
  // trivially subscribe to the underlying observables (e.g., `someProperty.subscribe(...)`),
  // or tell them that object values have mutated, etc. To handle this, we set up some
  // extra utility functions that can return or work with the underlying observables.

  // Returns the underlying observable associated with a model property (or `null` if the
  // model or property doesn't exist, or isn't associated with an observable). This means
  // you can subscribe to the property, e.g.:
  //
  //     ko.getObservable(model, 'propertyName')
  //       .subscribe(function(newValue) { ... });
  function getObservable(obj, propertyName) {
    if (!obj || typeof obj !== 'object') {
      return null;
    }

    var allObservablesForObject = getAllObservablesForObject(obj, false);
    if (allObservablesForObject && propertyName in allObservablesForObject) {
      return allObservablesForObject[propertyName]();
    }

    return null;
  }
  
  // Returns a boolean indicating whether the property on the object has an underlying
  // observables. This does the check in a way not to create an observable if the
  // object was created with lazily created observables
  function isTracked(obj, propertyName) {
    if (!obj || typeof obj !== 'object') {
      return false;
    }
    
    var allObservablesForObject = getAllObservablesForObject(obj, false);
    return !!allObservablesForObject && propertyName in allObservablesForObject;
  }

  // Causes a property's associated observable to fire a change notification. Useful when
  // the property value is a complex object and you've modified a child property.
  function valueHasMutated(obj, propertyName) {
    var observable = getObservable(obj, propertyName);

    if (observable) {
      observable.valueHasMutated();
    }
  }

  // Module initialisation
  // ---------------------
  //
  // When this script is first evaluated, it works out what kind of module loading scenario
  // it is in (Node.js or a browser `<script>` tag), stashes a reference to its dependencies
  // (currently that's just the WeakMap shim), and then finally attaches itself to whichever
  // instance of Knockout.js it can find.

  // A function that returns a new ES6-compatible WeakMap instance (using ES5 shim if needed).
  // Instantiated by prepareExports, accounting for which module loader is being used.
  var weakMapFactory;

  // Extends a Knockout instance with Knockout-ES5 functionality
  function attachToKo(ko) {
    ko.track = track;
    ko.untrack = untrack;
    ko.getObservable = getObservable;
    ko.valueHasMutated = valueHasMutated;
    ko.defineProperty = defineComputedProperty;

    // todo: test it, maybe added it to ko. directly
    ko.es5 = {
      getAllObservablesForObject: getAllObservablesForObject,
      notifyWhenPresentOrFutureArrayValuesMutate: notifyWhenPresentOrFutureArrayValuesMutate,
      isTracked: isTracked
    };
  }

  // Determines which module loading scenario we're in, grabs dependencies, and attaches to KO
  function prepareExports() {
    if (typeof exports === 'object' && typeof module === 'object') {
      // Node.js case - load KO and WeakMap modules synchronously
      ko = require('knockout');
      var WM = require('../lib/weakmap');
      attachToKo(ko);
      weakMapFactory = function() { return new WM(); };
      module.exports = ko;
    } else if (typeof define === 'function' && define.amd) {
      define(['knockout'], function(koModule) {
        ko = koModule;
        attachToKo(koModule);
        weakMapFactory = function() { return new global.WeakMap(); };
        return koModule;
      });
    } else if ('ko' in global) {
      // Non-module case - attach to the global instance, and assume a global WeakMap constructor
      ko = global.ko;
      attachToKo(global.ko);
      weakMapFactory = function() { return new global.WeakMap(); };
    }
  }

  prepareExports();

})(this);

/*! WeakMap shim
 * (The MIT License)
 *
 * Copyright (c) 2012 Brandon Benvie <http://bbenvie.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the 'Software'), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included with all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY  CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Original WeakMap implementation by Gozala @ https://gist.github.com/1269991
// Updated and bugfixed by Raynos @ https://gist.github.com/1638059
// Expanded by Benvie @ https://github.com/Benvie/harmony-collections

// This is the version used by knockout-es5. Modified by Steve Sanderson as follows:
// [1] Deleted weakmap.min.js (it's not useful as it would be out of sync with weakmap.js now I'm editing it)
// [2] Since UglifyJS strips inline function names (and you can't disable that without disabling name mangling
//     entirely), insert code that re-adds function names

void function(global, undefined_, undefined){
  var getProps = Object.getOwnPropertyNames,
      cachedWindowNames = typeof window === 'object' ? Object.getOwnPropertyNames(window) : [],
      defProp  = Object.defineProperty,
      toSource = Function.prototype.toString,
      create   = Object.create,
      hasOwn   = Object.prototype.hasOwnProperty,
      funcName = /^\n?function\s?(\w*)?_?\(/;


  function define(object, key, value){
    if (typeof key === 'function') {
      value = key;
      key = nameOf(value).replace(/_$/, '');
    }
    return defProp(object, key, { configurable: true, writable: true, value: value });
  }

  function nameOf(func){
    return typeof func !== 'function'
          ? '' : '_name' in func
          ? func._name : 'name' in func
          ? func.name : toSource.call(func).match(funcName)[1];
  }

  function namedFunction(name, func) {
    // Undo the name-stripping that UglifyJS does
    func._name = name;
    return func;
  }

  // ############
  // ### Data ###
  // ############

  var Data = (function(){
    var dataDesc = { value: { writable: true, value: undefined } },
        uids     = create(null),

        createUID = function(){
          var key = Math.random().toString(36).slice(2);
          return key in uids ? createUID() : uids[key] = key;
        },

        globalID = createUID(),

        storage = function(obj){
          if (hasOwn.call(obj, globalID))
            return obj[globalID];

          if (!Object.isExtensible(obj))
            throw new TypeError("Object must be extensible");

          var store = create(null);
          defProp(obj, globalID, { value: store });
          return store;
        };

    // common per-object storage area made visible by patching getOwnPropertyNames'
    define(Object, namedFunction('getOwnPropertyNames', function getOwnPropertyNames(obj){
      // gh-43
      var coercedObj = Object(obj), props;
      if (coercedObj.toString() === '[object Window]') {
          try {
              props = getProps(obj);
          } catch (e) {
              props = cachedWindowNames;
          }
      } else {
          props = getProps(obj);
      }
      if (hasOwn.call(obj, globalID))
        props.splice(props.indexOf(globalID), 1);
      return props;
    }));

    function Data(){
      var puid = createUID(),
          secret = {};

      this.unlock = function(obj){
        var store = storage(obj);
        if (hasOwn.call(store, puid))
          return store[puid](secret);

        var data = create(null, dataDesc);
        defProp(store, puid, {
          value: function(key){ if (key === secret) return data; }
        });
        return data;
      }
    }

    define(Data.prototype, namedFunction('get', function get(o){ return this.unlock(o).value }));
    define(Data.prototype, namedFunction('set', function set(o, v){ this.unlock(o).value = v }));

    return Data;
  }());


  var WM = (function(data){
    var validate = function(key){
      if (key == null || typeof key !== 'object' && typeof key !== 'function')
        throw new TypeError("Invalid WeakMap key");
    }

    var wrap = function(collection, value){
      var store = data.unlock(collection);
      if (store.value)
        throw new TypeError("Object is already a WeakMap");
      store.value = value;
    }

    var unwrap = function(collection){
      var storage = data.unlock(collection).value;
      if (!storage)
        throw new TypeError("WeakMap is not generic");
      return storage;
    }

    var initialize = function(weakmap, iterable){
      if (iterable !== null && typeof iterable === 'object' && typeof iterable.forEach === 'function') {
        iterable.forEach(function(item, i){
          if (item instanceof Array && item.length === 2)
            set.call(weakmap, iterable[i][0], iterable[i][1]);
        });
      }
    }


    function WeakMap(iterable){
      if (this === global || this == null || this === WeakMap.prototype)
        return new WeakMap(iterable);

      wrap(this, new Data);
      initialize(this, iterable);
    }

    function get(key){
      validate(key);
      var value = unwrap(this).get(key);
      return value === undefined_ ? undefined : value;
    }

    function set(key, value){
      validate(key);
      // store a token for explicit undefined so that "has" works correctly
      unwrap(this).set(key, value === undefined ? undefined_ : value);
    }

    function has(key){
      validate(key);
      return unwrap(this).get(key) !== undefined;
    }

    function delete_(key){
      validate(key);
      var data = unwrap(this),
          had = data.get(key) !== undefined;
      data.set(key, undefined);
      return had;
    }

    function toString(){
      unwrap(this);
      return '[object WeakMap]';
    }

    // Undo the function-name stripping that UglifyJS does
    get._name = 'get';
    set._name = 'set';
    has._name = 'has';
    toString._name = 'toString';

    var src = (''+Object).split('Object');
    var stringifier = namedFunction('toString', function toString(){
      return src[0] + nameOf(this) + src[1];
    });

    define(stringifier, stringifier);

    var prep = { __proto__: [] } instanceof Array
      ? function(f){ f.__proto__ = stringifier }
      : function(f){ define(f, stringifier) };

    prep(WeakMap);

    [toString, get, set, has, delete_].forEach(function(method){
      define(WeakMap.prototype, method);
      prep(method);
    });

    return WeakMap;
  }(new Data));

  var defaultCreator = Object.create
    ? function(){ return Object.create(null) }
    : function(){ return {} };

  function createStorage(creator){
    var weakmap = new WM;
    creator || (creator = defaultCreator);

    function storage(object, value){
      if (value || arguments.length === 2) {
        weakmap.set(object, value);
      } else {
        value = weakmap.get(object);
        if (value === undefined) {
          value = creator(object);
          weakmap.set(object, value);
        }
      }
      return value;
    }

    return storage;
  }


  if (typeof module !== 'undefined') {
    module.exports = WM;
  } else if (typeof exports !== 'undefined') {
    exports.WeakMap = WM;
  } else if (!('WeakMap' in global)) {
    global.WeakMap = WM;
  }

  WM.createStorage = createStorage;
  if (global.WeakMap)
    global.WeakMap.createStorage = createStorage;
}(function(){ return this }());
