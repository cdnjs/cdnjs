/*!
 * Inheritance.js (0.4.9)
 *
 * Copyright (c) 2016 Brandon Sara (http://bsara.github.io)
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
}(this, function() {/** @namespace */
var InternalUtils = {
  getPropertyDescriptor: function(obj, propName) {
    var propDescriptor = Object.getOwnPropertyDescriptor(obj, propName);

    if (propDescriptor != null) {
      return propDescriptor;
    }

    if (obj.constructor == null || obj.constructor.__super__ == null) {
      return undefined;
    }

    return InternalUtils.getPropertyDescriptor(obj.constructor.__super__, propName);
  }
};/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object to mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose properties should be mixed
 *                                        into the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are properties present in multiple mixin
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

    for (var propName in mixin) {
      if (mixin.hasOwnProperty(propName)) {
        newObj[propName] = mixin[propName];
      }
    }
  }

  return newObj;
}/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object to deep mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose properties should be deep
 *                                        mixed into the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are properties present in multiple mixin
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

    for (var propName in mixin) {
      if (!mixin.hasOwnProperty(propName)) {
        continue;
      }

      if (mixin[propName] !== null && typeof mixin[propName] === 'object') {
        mixDeep(newObj[propName], mixin[propName]);
        continue;
      }

      newObj[propName] = mixin[propName];
    }
  }

  return newObj;
}/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object containing the prototype to mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose properties should be mixed
 *                                        into the prototype of the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are properties present in multiple mixin
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

  if (obj.prototype == null) {
    throw new TypeError("`obj.prototype` cannot be `undefined` or `null`!");
  }

  obj.prototype = mix(obj.prototype, mixins);

  return obj;
}/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object containing the prototype to deep mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose properties should be deep
 *                                        mixed into the prototype of the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are properties present in multiple mixin
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

  if (obj.prototype == null) {
    throw new TypeError("`obj.prototype` cannot be `undefined` or `null`!");
  }

  obj.prototype = mixDeep(obj.prototype, mixins);

  return obj;
}/**
 * Creates a new object definition based upon the given `objDefProps` that inherits the
 * given `parent`.
 *
 * @param {Object} parent        - The object to be inherited.
 * @param {Object} [objDefProps] - An object containing all properties to be used in
 *                                 creating the new object definition that will inherit
 *                                 the given `parent` object. If this parameter is
 *                                 `undefined` or `null`, then a new child object
 *                                 definition is created.
 *                                 TODO: Add reference to the `objDefProps` spec
 *
 * @returns {Object} An object created from the given `objDefProps` that inherits
 *                   `parent`.
 *
 * @requires makeInheritable, mixDeep
 */
function inheritance(parent, objDefProps) {
  parent      = (parent || Object);
  objDefProps = (objDefProps || {});

  var objDef;
  var objCtor    = (objDefProps.ctor || function() { return objDef.__super__.constructor.apply(this, arguments); });
  var objDefName = objDefProps.__defName;

  if (typeof objDefName === 'string' && objDefName.trim()) {
    objDefName = objDefName.trim();
  } else if (objCtor.name) {
    objDefName = objCtor.name;
  } else {
    objDefName = undefined;
  }

  delete objDefProps.__defName;  eval('objDef = function' + (objDefName ? (' ' + objDefName) : '') + '() { return objCtor.apply(this, arguments); };');  objDef.prototype = Object.create(parent.prototype);


  makeInheritable(objDef);


  _setupMixins(objDefProps);
  _setupStaticProperties(objDef, objDefProps);
  _setupPrivateProperties(objDef, objDefProps);
  _setupSuperFunction(objDef);
  _setupPublicProperties(objDef, objDefProps);


  _addOwnerIfFunction(objDef.prototype, objCtor);


  Object.defineProperty(objDef, 'isObjDef', { get: function() { return true; } });
  Object.defineProperty(objDef, '__super__', { get: function() { return parent.prototype; } });
  Object.defineProperty(objDef.prototype, '__ctor__', { get: function() { return objCtor; } });


  return objDef;
}



function _setupMixins(props) {
  var mixins = props.mixins;

  if (mixins != null && mixins instanceof Array) {
    mixDeep(props, mixins);
  }
}


function _setupStaticProperties(def, props) {
  var propName;


  var staticProps = props.static;

  if (staticProps == null) {
    return;
  }

  for (propName in staticProps) {
    if (_isReservedStaticProperty(propName)) {
      continue;
    }
    _addProperty(def, staticProps, propName);
  }


  var staticConstProps = staticProps.consts;

  if (staticConstProps == null) {
    return;
  }

  for (propName in staticConstProps) {
    if (_isReservedStaticProperty(propName)) {
      continue;
    }

    var action = function(propertyName, value) {
      Object.defineProperty(def, propertyName, { get: function() { return value; }});
    };

    action(propName, staticConstProps[propName]);
  }
}


function _setupPrivateProperties(def, props) {
  var propName;


  var privateProps = props.private;

  if (privateProps == null) {
    return;
  }

  for (propName in privateProps) {
    if (_isReservedInstanceProperty(propName)) {
      continue;
    }
    _addProperty(def.prototype, privateProps, propName, true);
  }


  var privateStaticProps = privateProps.static;

  if (privateStaticProps == null) {
    return;
  }

  for (propName in privateStaticProps) {
    if (_isReservedStaticProperty(propName)) {
      continue;
    }
    _addProperty(def, privateStaticProps, propName, true);
  }
}


function _setupPublicProperties(def, props) {
  def.prototype.constructor = _addOwnerIfFunction(def.prototype, def);

  for (var propName in props) {
    if (_isReservedInstanceProperty(propName)
        || propName === 'mixins'
        || propName === 'private') {
      continue;
    }

    _updatePrototypeWithMixDeep(def.prototype, props, propName);
  }
}


function _setupSuperFunction(def) {
  Object.defineProperty(def.prototype, '_super', {
    configurable: false,
    enumerable:   false,
    writable:     false,

    value: function() {
      var caller = arguments.callee.caller;

      if (!caller) {
        return;
      }

      var callerOwner = caller.owner;
      var superType   = callerOwner.constructor.__super__;

      if (!superType) {
        return;
      }


      if (caller === callerOwner.constructor || caller === callerOwner.__ctor__) {
        return superType.constructor.apply(this, arguments);
      }


      var callerName = caller.name;

      if (!callerName) {
        var propNames = Object.getOwnPropertyNames(callerOwner);

        for (var i = 0; i < propNames.length; i++) {
          var propName       = propNames[i];
          var propDescriptor = Object.getOwnPropertyDescriptor(callerOwner, propName);

          if (propDescriptor.get != null || propDescriptor.set != null) {
            continue;
          }

          if (propDescriptor.value === caller) {
            callerName = propName;
            break;
          }
        }
      }

      if (!callerName) {
        return;
      }


      var superFunc;
      var superFuncDescriptor = InternalUtils.getPropertyDescriptor(superType, callerName);
      var callerDescriptor    = InternalUtils.getPropertyDescriptor(callerOwner, callerName);

      if (superFuncDescriptor != null) {
        if (callerDescriptor.get != null && callerDescriptor.get === caller) {
          superFunc = superFuncDescriptor.get;
        } else if (callerDescriptor.set != null && callerDescriptor.set === caller) {
          superFunc = superFuncDescriptor.set;
        } else {
          superFunc = superFuncDescriptor.value;
        }
      }

      if (typeof superFunc !== 'function' || superFunc == null) {
        return;
      }


      return superFunc.apply(this, arguments);
    }
  });
}


function _isReservedStaticProperty(propName) {
  return (propName === 'consts' || propName === '__super__');
}


function _isReservedInstanceProperty(propName) {
  return (propName === 'constructor'
          || propName === 'ctor'
          || propName === 'static'
          || propName === '_super'
          || propName === '__ctor__');
}


function _isPropGetterOrSetter(propOwner, propName) {
  var propDescriptor = Object.getOwnPropertyDescriptor(propOwner, propName);
  return (typeof propDescriptor !== 'undefined'
          && (typeof propDescriptor.get !== 'undefined' || typeof propDescriptor.set !== 'undefined'));
}


function _updatePrototypeWithMixDeep(prototype, props, propName) {
  if (!_isPropGetterOrSetter(props, propName) && !_isPropGetterOrSetter(prototype, propName)) {
    var protoProp = prototype[propName];
    var mixinProp = props[propName];

    if (mixinProp != null
        && typeof mixinProp === 'object'
        && mixinProp.constructor.name === 'Object'
        && (protoProp != null && protoProp.constructor.name === 'Object')) {
      mixDeep(protoProp, mixinProp);
      return;
    }
  }

  _addProperty(prototype, props, propName);
}


function _addProperty(propNewOwner, propCurrentOwner, propName, isPrivate) {
  isPrivate = (isPrivate === true);


  var propOptions    = {};
  var propDescriptor = Object.getOwnPropertyDescriptor(propCurrentOwner, propName);

  if (typeof propDescriptor !== 'undefined') {
    for (var descriptorPropName in propDescriptor) {
      propOptions[descriptorPropName] = propDescriptor[descriptorPropName];
    }
  }


  if (typeof propOptions.value !== 'undefined') {
    _addOwnerIfFunction(propNewOwner, propOptions.value);
  }
  if (typeof propOptions.get !== 'undefined') {
    _addOwnerIfFunction(propNewOwner, propOptions.get);
  }
  if (typeof propOptions.set !== 'undefined') {
    _addOwnerIfFunction(propNewOwner, propOptions.set);
  }


  if (isPrivate) {
    propOptions.enumerable = false;
  }


  Object.defineProperty(propNewOwner, propName, propOptions);
}


function _addOwnerIfFunction(owner, obj) {
  if (typeof obj === 'function') {
    obj.owner = owner;
  }
  return obj;
}/**
 * Makes an object inheritable by adding a function called `extend` as a "static"
 * property of the object. (I.E. Calling this function passing `MyObject` as a
 * parameter, creates `MyObject.extend`)
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
  if (obj == null) {
    throw new TypeError("`obj` cannot be undefined or null!");
  }
  if (overwrite !== true && obj.extend != null) {
    if (ignoreOverwriteError === true) {
      return obj;
    }
    throw new TypeError("`obj.extend` already exists! You're seeing this error to prevent the current extend function from being overwritten. See docs for how to override this functionality.");
  }

  /**
   * Creates a new object definition based upon the given `objDefProps` properties and
   * causes that new object definition to inherit this object.
   *
   * @param {Object} objDefProps - An object containing all properties to be used in
   *                               creating the new object definition that will inherit
   *                               this object. If this parameter is `undefined` or
   *                               `null`, then a new child object definition is created.
   *                               TODO: Add reference to the `objDefProps` spec
   *
   * @returns {Object} An object created from the given `objDefProps` that inherits this
   *                   object.
   *
   * @throws {TypeError} If the object's definition has been sealed. @see {@link https://github.com/bsara/inheritance.js/blob/master/src/inherit/seal.js}
   *
   * @requires inheritance
   */
  Object.defineProperty(obj, 'extend', {
    value:        function(objDefProps) { return inheritance(obj, objDefProps); },
    configurable: true,
    enumerable:   false,
    writable:     true
  });

  return obj;
}/**
 * Makes an object sealed by adding a function called `extend` as a "static" property
 * of the object that throws an error if it is ever called. (I.E. Calling this function
 * passing `MyObject` as a parameter, creates `MyObject.extend` and `MyObject.sealed`,
 * where `MyObject.sealed` will always be `true`)
 *
 * @param {Object}  obj         - The object to seal.
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
function seal(obj, overwrite, ignoreOverwriteError) {
  if (obj == null) {
    throw new TypeError("`obj` cannot be undefined or null!");
  }
  if (overwrite !== true && obj.extend != null) {
    if (ignoreOverwriteError === true) {
      return obj;
    }
    throw new TypeError("`obj.extend` already exists! You're seeing this error to prevent the current extend function from being overwritten. See docs for how to override this functionality.");
  }


  if (obj.extend != null) {
    delete obj.extend;
  }

  Object.defineProperties(obj, {
    sealed: { get: function() { return true; } },
    extend: {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        function() { throw new TypeError("The object definition you are trying to extend is sealed and cannot be inherited."); }
    }
  });

  return obj;
}/** @namespace */
var ObjectDefinition = {

  /**
   * Creates a new object (I.E. "class") that can be inherited.
   * NOTE: The new object inherits the native JavaScript `Object`.
   *
   * @param {Object} objDef - TODO: Add description
   *
   * @returns {Object} The newly created, inheritable, object that inherits `Object`.
   *
   * @requires inheritance
   */
  create: function(objDef) {
    return inheritance(Object, objDef);
  },


  /**
   * Creates a new object (I.E. "class") that CANNOT be inherited.
   * NOTE: The new object inherits the native JavaScript `Object`.
   *
   * @param {Object} objDef - TODO: Add description
   *
   * @returns {Object} The newly created, non-inheritable, object that inherits `Object`.
   *
   * @requires seal
   */
  createSealed: function(objDef) {
    return seal(inheritance(Object, objDef), true);
  }
};


seal(ObjectDefinition, true);

return {
  mix:              mix,
  mixDeep:          mixDeep,
  mixPrototype:     mixPrototype,
  mixPrototypeDeep: mixPrototypeDeep,
  inheritance:      inheritance,
  makeInheritable:  makeInheritable,
  seal:             seal,
  ObjectDefinition: ObjectDefinition
};

}));
