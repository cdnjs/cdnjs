/*!
 * Inheritance.js (0.3.2)
 *
 * Copyright (c) 2015 Brandon Sara (http://bsara.github.io)
 * Licensed under the CPOL-1.02 (https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.I = factory();
    root.ObjectDefinition = root.I.ObjectDefinition;
    delete root.I.ObjectDefinition;
  }
}(this, function() {/**
 * TODO: Add description
 *
 * @param {Object...} arguments - Mixin objects whose attributes should be mixed into this
 *                                object.
 *                                NOTE: The order of objects in this array does matter!
 *                                If there are attributes present in multiple mixin
 *                                objects, then the mixin with the largest index value
 *                                overwrite any values set by the lower index valued
 *                                mixin objects.
 *
 * @returns {Object} This object, mixed with the given mixin objects.
 */
Object.defineProperty(Object.prototype, 'mix', {
  value:        function() { return mix(this, arguments); },
  configurable: true,
  enumerable:   false,
  writable:     true
});


/**
 * TODO: Add description
 *
 * @param {Object...} arguments - Mixin objects whose attributes should be deep mixed into
 *                                this object.
 *                                NOTE: The order of objects in this array does matter!
 *                                If there are attributes present in multiple mixin
 *                                objects, then the mixin with the largest index value
 *                                overwrite any values set by the lower index valued
 *                                mixin objects.
 *
 * @returns {Object} This object, deep mixed with the given mixin objects.
 */
Object.defineProperty(Object.prototype, 'mixDeep', {
  value:        function() { return mixDeep(this, arguments); },
  configurable: true,
  enumerable:   false,
  writable:     true
});


makeInheritable(Object);


makeInheritable(ArrayBuffer, true);
makeInheritable(Array, true);
makeInheritable(DataView, true);
makeInheritable(Date, true);
makeInheritable(Error, true);
makeInheritable(EvalError, true);
makeInheritable(Float32Array, true);
makeInheritable(Float64Array, true);
makeInheritable(Function, true);
makeInheritable(Int8Array, true);

if (typeof Int16Array !== 'undefined' && Int16Array !== null) {
  makeInheritable(Int16Array, true);
}

makeInheritable(Int32Array, true);
makeInheritable(Intl.Collator, true);
makeInheritable(Intl.DateTimeFormat, true);
makeInheritable(Intl.NumberFormat, true);

if (typeof Map !== 'undefined' && Map !== null) {
  makeInheritable(Map, true);
}

makeInheritable(Number, true);

if (typeof Promise !== 'undefined' && Promise !== null) {
  makeInheritable(Promise, true);
}

if (typeof Proxy !== 'undefined' && Proxy !== null) {
  makeInheritable(Proxy, true);
}

makeInheritable(RangeError, true);
makeInheritable(ReferenceError, true);

if (typeof Reflect !== 'undefined' && Reflect !== null) {
  makeInheritable(Reflect, true);
}

makeInheritable(RegExp, true);

if (typeof Set !== 'undefined' && Set !== null) {
  makeInheritable(Set, true);
}

makeInheritable(String, true);

if (typeof Symbol !== 'undefined' && Symbol !== null) {
  makeInheritable(Symbol, true);
}

makeInheritable(SyntaxError, true);
makeInheritable(TypeError, true);
makeInheritable(Uint8Array, true);
makeInheritable(Uint8ClampedArray, true);
makeInheritable(Uint16Array, true);
makeInheritable(Uint32Array, true);
makeInheritable(URIError, true);

if (typeof WeakMap !== 'undefined' && WeakMap !== null) {
  makeInheritable(WeakMap, true);
}

if (typeof WeakSet !== 'undefined' && WeakSet !== null) {
  makeInheritable(WeakSet, true);
}/** @namespace */
var ObjectDefinition = {

  /**
   * Creates a new object (I.E. "class") that can be inherited.
   * NOTE: The new object inherits the native JavaScript `Object`.
   *
   * @param {Object} objDef - TODO: Add description
   *
   * @returns {Object} The newly created, inheritable, object that inherits `Object`.
   */
  create: function(objDef) {
    return inheritance(Object, objDef);
  }
};/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object to deep mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose attributes should be deep
 *                                        mixed into the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are attributes present in multiple mixin
 *                                        objects, then the mixin with the largest index value
 *                                        overwrite any values set by the lower index valued
 *                                        mixin objects.
 *
 * @returns {Object} The deep mixed version of `obj`.
 */
function mixDeep(obj, mixins) {
  var newObj = (obj || {});

  if (!(mixins instanceof Array)) {
    mixins = [ mixins ];
  }

  for (var i = 0; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (!mixin.hasOwnProperty(attrName)) {
        continue;
      }

      if (typeof mixin[attrName] === 'object') {
        mixDeep(newObj[attrName], mixin[attrName]);
        continue;
      }

      newObj[attrName] = mixin[attrName];
    }
  }

  return newObj;
}/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object containing the prototype to deep mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose attributes should be deep
 *                                        mixed into the prototype of the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are attributes present in multiple mixin
 *                                        objects, then the mixin with the largest index value
 *                                        overwrite any values set by the lower index valued
 *                                        mixin objects.
 *
 * @returns {Object} The deep mixed version of `obj`.
 *
 * @throws {TypeError} If `obj.prototype` does not exist.
 *
 * @requires mixDeep
 */
function mixPrototypeDeep(obj, mixins) {
  obj = (obj || { prototype: {} });

  if (typeof obj.prototype === 'undefined' || obj.prototype === null) {
    throw new TypeError("`obj.prototype` cannot be `undefined` or `null`!");
  }

  obj.prototype = mixDeep(obj.prototype, mixins);

  return obj;
}/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object containing the prototype to mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose attributes should be mixed
 *                                        into the prototype of the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are attributes present in multiple mixin
 *                                        objects, then the mixin with the largest index value
 *                                        overwrite any values set by the lower index valued
 *                                        mixin objects.
 *
 * @returns {Object} The mixed version of `obj`.
 *
 * @throws {TypeError} If `obj.prototype` does not exist.
 *
 * @requires mix
 */
function mixPrototype(obj, mixins) {
  obj = (obj || { prototype: {} });

  if (typeof obj.prototype === 'undefined' || obj.prototype === null) {
    throw new TypeError("`obj.prototype` cannot be `undefined` or `null`!");
  }

  obj.prototype = mix(obj.prototype, mixins);

  return obj;
}/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object to mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose attributes should be mixed
 *                                        into the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are attributes present in multiple mixin
 *                                        objects, then the mixin with the largest index value
 *                                        overwrite any values set by the lower index valued
 *                                        mixin objects.
 *
 * @returns {Object} The mixed version of `obj`.
 */
function mix(obj, mixins) {
  var newObj = (obj || {});

  if (!(mixins instanceof Array)) {
    mixins = [ mixins ];
  }

  for (var i = 0; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (mixin.hasOwnProperty(attrName)) {
        newObj[attrName] = mixin[attrName];
      }
    }
  }

  return newObj;
}/**
 * Creates a new object definition based upon the given `childDef` attributes that
 * inherits the given `parent`.
 *
 * @param {Object} parent     - The object to be inherited.
 * @param {Object} [childDef] - An object containing all attributes to be used in creating
 *                              the new object definition that will inherit the given
 *                              `parent` object. If this parameter is `undefined` or
 *                              `null`, then a new child object definition is created.
 *                              TODO: Add reference to the `childDef` spec
 *
 * @returns {Object} An object created from the given `childDef` that inherits `parent`.
 *
 * @requires mixDeep
 */
function inheritance(parent, childDef) {
  var attrName;

  parent   = (parent || Object);
  childDef = (childDef || {});

  var child = (childDef.ctor || function() { return this.super.apply(this, arguments); });


  for (attrName in parent) {
    if (attrName === 'extend') {
      continue;
    }
    child[attrName] = parent[attrName];
  }

  child.__super__ = parent.prototype;

  makeInheritable(child);


  var mixins = childDef.mixins;
  if (mixins !== null && mixins instanceof Array) {
    mixDeep(childDef, mixins);
  }


  var staticAttrs = childDef.static;
  if (typeof staticAttrs !== 'undefined' && staticAttrs !== null) {
    for (attrName in staticAttrs) {
      child[attrName] = staticAttrs[attrName];
    }
  }


  child.prototype        = Object.create(parent.prototype);
  child.prototype.objDef = child;

  child.prototype.constructor = function() {
    if (!(this instanceof child)) {
      return new child(arguments);
    }

    for (var funcName in this._super) {
      if (funcName !== '_super') {
        this._super[funcName] = this._super[funcName].bind(this);
      }
    }

    child(arguments);
  };


  child.prototype.super = function() {
    this.objDef.__super__.constructor.apply(this, arguments);
  };

  child.prototype._super = {};

  for (attrName in parent.prototype) {
    child.prototype._super[attrName] = function() {
      return this.objDef.__super__[attrName].apply(this, arguments);
    };
  }

  for (attrName in childDef) {
    if (attrName === 'constructor'
        || attrName === 'ctor'
        || attrName === 'objDef'
        || attrName === 'mixins'
        || attrName === 'static'
        || attrName === 'super'
        || attrName === '_super') {
      continue;
    }
    child.prototype[attrName] = childDef[attrName];
  }

  return child;
}/**
 * Makes an object inheritable by adding a function called `extend` as a "static"
 * attribute of the object. (I.E. Calling this function adding passing `Object` as a
 * parameter, creates `Object.extend`)
 *
 * @param {Object}  obj         - The object to make inheritable.
 * @param {Boolean} [overwrite] - If `true`, then an existing `extend` property will be
 *                                overwritten regardless of it's value.
 * @param {Boolean} [ignoreOverwriteError] - If `true`, then no error will be thrown if
 *                                           `obj.extend` already exists and `overwrite`
 *                                           is not `true`.
 *
 * @returns {Object} The modified `obj` given.
 *
 * @throws {TypeError} If `obj` is `undefined` or `null`.
 * @throws {TypeError} If `obj.extend` already exists and `overwrite` is NOT equal `true`.
 */
function makeInheritable(obj, overwrite, ignoreOverwriteError) {
  if (typeof obj === 'undefined' || obj === null) {
    throw new TypeError("`obj` cannot be undefined or null!");
  }
  if (overwrite !== true && typeof obj.extend !== 'undefined' && obj.extend !== null) {
    if (ignoreOverwriteError === true) {
      return obj;
    }
    throw new TypeError("`obj.extend` already exists! You're seeing this error to prevent the current extend function from being overwritten. See docs for how to override this functionality.");
  }

  /**
   * Creates a new object definition based upon the given `childDef` attributes and causes
   * that new object definition to inherit this object.
   *
   * @param {Object} childDef - An object containing all attributes to be used in creating
   *                            the new object definition that will inherit this object.
   *                            If this parameter is `undefined` or `null`, then a new
   *                            child object definition is created.
   *                            TODO: Add reference to the `childDef` spec
   *
   * @returns {Object} An object created from the given `childDef` that inherits this
   *                   object.
   */
  Object.defineProperty(obj, 'extend', {
    value:        function(childDef) { return inheritance(obj, childDef); },
    configurable: true,
    enumerable:   false,
    writable:     true
  });

  return obj;
}

return {
  mix: mix,
  mixDeep: mixDeep,
  mixPrototype: mixPrototype,
  mixPrototypeDeep: mixPrototypeDeep,
  inheritance: inheritance,
  makeInheritable: makeInheritable,
  ObjectDefinition: ObjectDefinition
};

}));
