module.exports = clone;

/**
 * Clones an Object using deep cloning.
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
  if (circular) {
    var circularParent = {};
    var circularResolved = {};
    var circularReplace = [];
    function _clone(parent, context, child, cIndex) {
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
        if (parent instanceof Array) {
          child = [];
          for(i in parent)
            child[i] = _clone(parent[i], context + '[' + i + ']', child, i);
        }
        else if (parent instanceof Date)
          child = new Date(parent.getTime());
        else if (parent instanceof RegExp)
          child = new RegExp(parent.source);
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
        child = parent; //Just a simple shallow clone will do
      return child;
    }

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
  }
  else {
    // Deep clone all properties of parent into child
    var child;
    if (typeof parent == 'object') {
      if (parent == null)
        return parent;
      if (parent instanceof Array) {
        child = [];
        for(i in parent)
          child[i] = clone(parent[i], circular);
      }
      else if (parent instanceof Date)
        child = new Date(parent.getTime() );
      else if (parent instanceof RegExp)
        child = new RegExp(parent.source);
      else {
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
