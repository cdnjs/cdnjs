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
    root.I = {};
    root.I.mixDeep = factory();
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

      if (mixin[propName] !== null && typeof mixin[propName] === 'object') {
        mixDeep(newObj[propName], mixin[propName]);
        continue;
      }

      newObj[propName] = mixin[propName];
    }
  }

  return newObj;
}

return mixDeep;

}));
