/*!
 * Inheritance.js (0.2.0)
 *
 * Copyright (c) 2015 Brandon Sara (http://bsara.github.io)
 * Licensed under the CPOL-1.02 (https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)
 */
(function(root, factory) {
  if (typeof define === "function" && define.amd) define(factory);
  else if (typeof exports === "object") module.exports = factory();
  else {
    var _module = factory();
    if (typeof _module === "function") {
      var moduleName = ((typeof _module.name !== "undefined") ? _module.name : ( /^function\s+([\w\$]+)\s*\(/ ).exec( _module.toString() )[1])
      root[moduleName] = _module;
      return;
    }
    for (var moduleName in _module) {
      if (_module.hasOwnProperty(moduleName)) {
        root[moduleName] = _module[moduleName];
      }
    }
  }
})(this, function() {
/**
 * TODO: Add description
 *
 * @param {Object}        obj    - The object to deep mix into.
 *                                 NOTE: `undefined` and `null` are both VALID values for
 *                                 this parameter. If `obj` is `undefined` or `null`, then
 *                                 a new object will be created from the `mixins` given.
 * @param {Array<Object>} mixins - An array of objects whose attributes should be deep
 *                                 mixed into the given `obj`.
 *                                 NOTE: The order of objects in this array does matter!
 *                                 If there are attributes present in multiple mixin
 *                                 objects, then the mixin with the largest index value
 *                                 overwrite any values set by the lower index valued
 *                                 mixin objects.
 *
 * @returns {Object} The deep mixed version of `obj`.
 */
function mixDeep(obj, mixins) {
  var newObj = (obj || {});

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
 * Creates a new object definition based upon the given `childDef` attributes and causes
 * that new object definition to inherit the given `parent`.
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

  parent = (parent || Object);
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


  child.prototype = Object.create(parent.prototype);
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
 * @returns {Object} The `obj` given.
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
   *                            the new object definition that will inherit the given
   *                            `parent` object. If this parameter is `undefined` or
   *                            `null`, then a new child object definition is created.
   *                            TODO: Add reference to the `childDef` spec
   *
   * @returns {Object} An object created from the given `childDef` that inherits this
   *                   object.
   */
  obj.extend = function(childDef) {
    return inheritance(obj, childDef);
  };

  return obj;
}

return {
  mixDeep: mixDeep,
  inheritance: inheritance,
  makeInheritable: makeInheritable
};
});