/*!
 * Inheritance.js (0.0.2)
 *
 * Copyright (c) 2015 Brandon Sara (http://bsara.github.io)
 * Licensed under the CPOL-1.02 (https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)
 */

function mix(obj, mixins) {
  var newObj = (obj || {});

  for (var i = 1; i < mixins.length; i++) {
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

  for (var i = 1; i < mixins.length; i++) {
    var mixin = mixin[i];

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

  for (var i = 1; i < mixins.length; i++) {
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
