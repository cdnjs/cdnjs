/*!
 * Inheritance.js (0.4.0)
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
  }
}(this, function() {/**
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

      if (typeof mixin[propName] === 'object') {
        mixDeep(newObj[propName], mixin[propName]);
        continue;
      }

      newObj[propName] = mixin[propName];
    }
  }

  return newObj;
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

  var addOwnerIfFunction = function(obj, owner) {
    if (typeof obj === 'function') {
      obj.owner = owner;
    }
    return obj;
  };



  parent   = (parent || Object);
  objDefProps = (objDefProps || {});

  var propName;
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



  addOwnerIfFunction(objCtor, objDef.prototype);

  Object.defineProperty(objDef.prototype, '__ctor__', {
    value:        objCtor,
    configurable: false,
    enumerable:   false,
    writable:     false
  });



  makeInheritable(objDef);



  var mixins = objDefProps.mixins;

  if (mixins !== null && mixins instanceof Array) {
    mixDeep(objDefProps, mixins);
  }



  var staticProps = objDefProps.static;

  if (typeof staticProps !== 'undefined' && staticProps !== null) {
    for (propName in staticProps) {
      if (propName === 'consts'
          || propName === '__super__') {
        continue;
      }

      objDef[propName] = addOwnerIfFunction(staticProps[propName], objDef);
    }


    var staticConstProps = staticProps.consts;

    if (typeof staticConstProps !== 'undefined' && staticConstProps !== null) {
      for (propName in staticConstProps) {
        Object.defineProperty(objDef, propName, {
          value:        staticConstProps[propName],
          configurable: false,
          enumerable:   true,
          writable:     false
        });
      }
    }
  }

  Object.defineProperty(objDef, '__super__', {
    value:        parent.prototype,
    configurable: false,
    enumerable:   false,
    writable:     false
  });



  var privateProps = objDefProps.private;

  if (typeof privateProps !== 'undefined' && privateProps !== null) {
    for (propName in privateProps) {
      if (propName === 'constructor'
          || propName === 'ctor'
          || propName === 'static'
          || propName === '_super'
          || propName === '__ctor__') {
        continue;
      }

      Object.defineProperty(objDef.prototype, propName, {
        value:        addOwnerIfFunction(privateProps[propName], objDef.prototype),
        configurable: true,
        enumerable:   false,
        writable:     true
      });
    }


    var privateStaticProps = privateProps.static;
    if (typeof privateStaticProps !== 'undefined' && privateStaticProps !== null) {
      for (propName in privateStaticProps) {
        Object.defineProperty(objDef, propName, {
          value:        addOwnerIfFunction(privateStaticProps[propName], objDef),
          configurable: true,
          enumerable:   false,
          writable:     true
        });
      }
    }
  }


  Object.defineProperty(objDef.prototype, '_super', {
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
          var propName = propNames[i];

          if (callerOwner[propName] === caller) {
            callerName = propName;
            break;
          }
        }
      }

      if (!callerName) {
        return;
      }


      var superFunc = superType[callerName];

      if (typeof superFunc !== 'function' || superFunc === null) {
        return;
      }

      return superFunc.apply(this, arguments);
    }
  });



  objDef.prototype.constructor = addOwnerIfFunction(objDef, objDef.prototype);

  for (propName in objDefProps) {
    if (propName === 'constructor'
        || propName === 'ctor'
        || propName === 'mixins'
        || propName === 'private'
        || propName === 'static'
        || propName === '_super'
        || propName === '__ctor__') {
      continue;
    }
    objDef.prototype[propName] = addOwnerIfFunction(objDefProps[propName], objDef.prototype);
  }



  return objDef;
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
}

return {
  mixDeep: mixDeep,
  inheritance: inheritance,
  makeInheritable: makeInheritable
};

}));
