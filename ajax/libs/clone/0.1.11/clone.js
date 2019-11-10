"use strict";

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

var util = {
  isArray: function (ar) {
    return Array.isArray(ar) || (typeof ar === 'object' && objectToString(ar) === '[object Array]');
  },
  isDate: function (d) {
    return typeof d === 'object' && objectToString(d) === '[object Date]';
  },
  isRegExp: function (re) {
    return typeof re === 'object' && objectToString(re) === '[object RegExp]';
  },
  getRegExpFlags: function (re) {
    var flags = '';
    re.global && (flags += 'g');
    re.ignoreCase && (flags += 'i');
    re.multiline && (flags += 'm');
    return flags;
  }
};

if (typeof module === 'object')
  module.exports = clone;

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
*/
function clone(parent, circular) {
  if (typeof circular == 'undefined')
    circular = true;

  var useBuffer = typeof Buffer != 'undefined';

  var circularParent = {};
  var circularResolved = {};
  var circularReplace = [];

  function _clone(parent, context, child, cIndex) {
    var i; // Use local context within this function
    // Deep clone all properties of parent into child
    if (typeof parent == 'object') {
      if (parent == null)
        return parent;
      // Check for circular references
      for(i in circularParent)
        if (circularParent[i] === parent) {
          // We found a circular reference
          circularReplace.push({'resolveTo': i, 'child': child, 'i': cIndex});
          return null; //Just return null for now...
          // we will resolve circular references later
        }

      // Add to list of all parent objects
      circularParent[context] = parent;
      // Now continue cloning...
      if (util.isArray(parent)) {
        child = [];
        for(i in parent)
          child[i] = _clone(parent[i], context + '[' + i + ']', child, i);
      }
      else if (util.isDate(parent))
        child = new Date(parent.getTime());
      else if (util.isRegExp(parent)) {
        child = new RegExp(parent.source, util.getRegExpFlags(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (useBuffer && Buffer.isBuffer(parent))
      {
        child = new Buffer(parent.length);
        parent.copy(child);
      }
      else {
        child = {};

        // Also copy prototype over to new cloned object
        child.__proto__ = parent.__proto__;
        for(i in parent)
          child[i] = _clone(parent[i], context + '[' + i + ']', child, i);
      }

      // Add to list of all cloned objects
      circularResolved[context] = child;
    }
    else
      child = parent; //Just a simple shallow copy will do
    return child;
  }

  var i;
  if (circular) {
    var cloned = _clone(parent, '*');

    // Now this object has been cloned. Let's check to see if there are any
    // circular references for it
    for(i in circularReplace) {
      var c = circularReplace[i];
      if (c && c.child && c.i in c.child) {
        c.child[c.i] = circularResolved[c.resolveTo];
      }
    }
    return cloned;
  } else {
    // Deep clone all properties of parent into child
    var child;
    if (typeof parent == 'object') {
      if (parent == null)
        return parent;
      if (parent.constructor.name === 'Array') {
        child = [];
        for(i in parent)
          child[i] = clone(parent[i], circular);
      }
      else if (util.isDate(parent))
        child = new Date(parent.getTime() );
      else if (util.isRegExp(parent)) {
        child = new RegExp(parent.source, util.getRegExpFlags(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else {
        child = {};
        child.__proto__ = parent.__proto__;
        for(i in parent)
          child[i] = clone(parent[i], circular);
      }
    }
    else
      child = parent; // Just a simple shallow clone will do
    return child;
  }
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};
