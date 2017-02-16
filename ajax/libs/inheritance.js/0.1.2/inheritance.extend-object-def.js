/*!
 * Inheritance.js (0.1.2)
 *
 * Copyright (c) 2015 Brandon Sara (http://bsara.github.io)
 * Licensed under the CPOL-1.02 (https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)
 */

function mix(obj, mixins) {
  var newObj = (obj || {});

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
}


function deepMix(obj, mixins) {
  var newObj = (obj || {});

  for (var i = 0; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (mixin.hasOwnProperty(attrName)) {
        if (typeof mixin[attrName] === 'object') {
          deepMix(newObj[attrName], mixin[attrName]);
          continue;
        }
        newObj[attrName] = mixin[attrName];
      }
    }
  }

  return newObj;
}


function mixWithObjectDef(objDef, mixins) {
  objDef = (objDef || {});

  var objDefPrototype = objDef.prototype;

  for (var i = 0; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (mixin.hasOwnProperty(attrName)) {
        objDefPrototype[attrName] = mixin[attrName];
      }
    }
  }

  return objDef;
}

function extendObjectDef(parentDef, childDefAttrs) {
  var attrName;

  parentDef = (parentDef || Object);
  childDefAttrs = (childDefAttrs || {});

  var childDef = (childDefAttrs.ctor || function() { return this.super.apply(this, arguments); });


  for (attrName in parentDef) {
    if (attrName === 'extend') {
      continue;
    }
    childDef[attrName] = parentDef[attrName];
  }

  childDef.__super__ = parentDef.prototype;
  childDef.extend = function(childDefAttrs) {
    return extendObjectDef(childDef, childDefAttrs);
  };


  var mixins = childDefAttrs.mixins;
  if (mixins !== null && mixins instanceof Array) {
    deepMix(childDefAttrs, mixins);
  }


  var staticAttrs = childDefAttrs.static;
  if (typeof staticAttrs !== 'undefined' && staticAttrs !== null) {
    for (attrName in staticAttrs) {
      childDef[attrName] = staticAttrs[attrName];
    }
  }


  childDef.prototype = Object.create(parentDef.prototype);
  childDef.prototype.objDef = childDef;

  childDef.prototype.constructor = function() {
    if (!(this instanceof childDef)) {
      return new childDef(arguments);
    }

    for (var funcName in this._super) {
      if (funcName !== '_super') {
        this._super[funcName] = this._super[funcName].bind(this);
      }
    }

    childDef(arguments);
  };


  childDef.prototype.super = function() {
    this.objDef.__super__.constructor.apply(this, arguments);
  };

  childDef.prototype._super = {};

  for (attrName in parentDef.prototype) {
    childDef.prototype._super[attrName] = function() {
      return this.objDef.__super__[attrName].apply(this, arguments);
    };
  }

  for (attrName in childDefAttrs) {
    if (attrName === 'constructor'
        || attrName === 'ctor'
        || attrName === 'objDef'
        || attrName === 'mixins'
        || attrName === 'static'
        || attrName === 'super'
        || attrName === '_super') {
      continue;
    }
    childDef.prototype[attrName] = childDefAttrs[attrName];
  }


  return childDef;
}
