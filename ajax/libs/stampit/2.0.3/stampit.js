/**
 * Stampit
 **
 * Create objects from reusable, composable behaviors.
 **
 * Copyright (c) 2013 Eric Elliott
 * http://opensource.org/licenses/MIT
 **/
import forEach from 'lodash/collection/forEach';
import forOwn from 'lodash/object/forOwn';
import isFunction from 'lodash/lang/isFunction';
import isObject from 'lodash/lang/isObject';
import map from 'lodash/collection/map';
import {
  merge,
  mergeChainNonFunctions,
  mergeUnique,
  mixin,
  mixinChainFunctions,
  mixinFunctions
} from 'supermixer';

const create = Object.create;

function extractFunctions(...args) {
  if (isFunction(args[0])) {
    return map(args, fn => {
      if (isFunction(fn)) {
        return fn;
      }
    });
  } else if (isObject(args[0])) {
    const arr = [];
    forEach(args, obj => {
      forOwn(obj, fn => {
        if (isFunction(fn)) {
          arr.push(fn);
        }
      });
    });
    return arr;
  }
  return [];
}

function addMethods(fixed, ...methods) {
  return mixinFunctions(fixed.methods, ...methods);
}
function addRefs(fixed, ...refs) {
  fixed.refs = fixed.state = mixin(fixed.refs || fixed.state, ...refs);
  return fixed.refs;
}
function addInit(fixed, ...inits) {
  const extractedInits = extractFunctions(...inits);
  fixed.init = fixed.enclose = (fixed.init || fixed.enclose).concat(extractedInits);
  return fixed.init;
}
function addProps(fixed, ...propses) {
  return merge(fixed.props, ...propses);
}
function addStatic(fixed, ...statics) {
  return mixin(fixed.static, ...statics);
}

function cloneAndExtend(fixed, extensionFunction, ...args) {
  const stamp = stampit(fixed);
  extensionFunction(stamp.fixed, ...args);
  return stamp;
}

function compose(...factories) {
  const result = stampit();
  forEach(factories, source => {
    if (source && source.fixed) {
      addMethods(result.fixed, source.fixed.methods);
      // We might end up having two different stampit modules loaded and used in conjunction.
      // These || operators ensure that old stamps could be combined with the current version stamps.
      addRefs(result.fixed, source.fixed.refs || source.fixed.state); // 'state' is the old name for 'refs'
      addInit(result.fixed, source.fixed.init || source.fixed.enclose); // 'enclose' is the old name for 'init'
      addProps(result.fixed, source.fixed.props);
      addStatic(result.fixed, source.fixed.static);
    }
  });
  return mixin(result, result.fixed.static);
}

/**
 * Return a factory function that will produce new objects using the
 * components that are passed in or composed.
 *
 * @param  {Object} [options] Options to build stamp from: `{ methods, refs, init, props }`
 * @param  {Object} [options.methods] A map of method names and bodies for delegation.
 * @param  {Object} [options.refs] A map of property names and values to be mixed into each new object.
 * @param  {Object} [options.init] A closure (function) used to create private data and privileged methods.
 * @param  {Object} [options.props] An object to be deeply cloned into each newly stamped object.
 * @param  {Object} [options.static] An object to be mixed into each `this` and derived stamps (not objects!).
 * @return {Function(refs)} factory A factory to produce objects.
 * @return {Function(refs)} factory.create Just like calling the factory function.
 * @return {Object} factory.fixed An object map containing the stamp components.
 * @return {Function(methods)} factory.methods Add methods to the stamp. Chainable.
 * @return {Function(refs)} factory.refs Add references to the stamp. Chainable.
 * @return {Function(Function(context))} factory.init Add a closure which called on object instantiation. Chainable.
 * @return {Function(props)} factory.props Add deeply cloned properties to the produced objects. Chainable.
 * @return {Function(stamps)} factory.compose Combine several stamps into single. Chainable.
 * @return {Function(statics)} factory.static Add properties to the stamp (not objects!). Chainable.
 */
const stampit = function stampit(options) {
  const fixed = {methods: {}, refs: {}, init: [], props: {}, static: {}};
  fixed.state = fixed.refs; // Backward compatibility. 'state' is the old name for 'refs'.
  fixed.enclose = fixed.init; // Backward compatibility. 'enclose' is the old name for 'init'.
  if (options) {
    addMethods(fixed, options.methods);
    addRefs(fixed, options.refs);
    addInit(fixed, options.init);
    addProps(fixed, options.props);
    addStatic(fixed, options.static);
  }

  const factory = function Factory(refs, ...args) {
    let instance = mixin(create(fixed.methods), fixed.refs, refs);
    mergeUnique(instance, fixed.props); // props are safely merged into refs

    if (fixed.init.length > 0) {
      forEach(fixed.init, fn => {
        if (isFunction(fn)) {
          instance = fn.call(instance, { args, instance, stamp: factory }) || instance;
        }
      });
    }

    return instance;
  };

  const refsMethod = cloneAndExtend.bind(null, fixed, addRefs);
  const initMethod = cloneAndExtend.bind(null, fixed, addInit);
  return mixin(factory, {
    /**
     * Creates a new object instance form the stamp.
     */
    create: factory,

    /**
     * The stamp components.
     */
    fixed,

    /**
     * Take n objects and add them to the methods list of a new stamp. Creates new stamp.
     * @return {Function} A new stamp (factory object).
     */
    methods: cloneAndExtend.bind(null, fixed, addMethods),

    /**
     * Take n objects and add them to the references list of a new stamp. Creates new stamp.
     * @return {Function} A new stamp (factory object).
     */
    refs: refsMethod,

    /**
     * Alias to refs(). Deprecated.
     * @return {Function} A new stamp (factory object).
     */
    state: refsMethod,

    /**
     * Take n functions, an array of functions, or n objects and add
     * the functions to the initializers list of a new stamp. Creates new stamp.
     * @return {Function} A new stamp (factory object).
     */
    init: initMethod,

    /**
     * Alias to init(). Deprecated.
     * @return {Function} A new stamp (factory object).
     */
    enclose: initMethod,

    /**
     * Take n objects and deep merge them to the properties. Creates new stamp.
     * @return {Function} A new stamp (factory object).
     */
    props: cloneAndExtend.bind(null, fixed, addProps),

    /**
     * Take n objects and add all props to the factory object. Creates new stamp.
     * @return {Function} A new stamp (factory object).
     */
    static(...statics) {
      const newStamp = cloneAndExtend(factory.fixed, addStatic, ...statics);
      return mixin(newStamp, newStamp.fixed.static);
    },

    /**
     * Take one or more factories produced from stampit() and
     * combine them with `this` to produce and return a new factory.
     * Combining overrides properties with last-in priority.
     * @param {[Function]|...Function} factories Stampit factories.
     * @return {Function} A new stampit factory composed from arguments.
     */
    compose: (...factories) => compose(factory, ...factories)
  }, fixed.static);
};

// Static methods

function isStamp(obj) {
  return (
    isFunction(obj) &&
    isFunction(obj.methods) &&
    // isStamp can be called for old stampit factory object. We should check old names (state and enclose) too.
    (isFunction(obj.refs) || isFunction(obj.state)) &&
    (isFunction(obj.init) || isFunction(obj.enclose)) &&
    isFunction(obj.props) &&
    isFunction(obj.static) &&
    isObject(obj.fixed)
  );
}

function convertConstructor(Constructor) {
  const stamp = stampit();
  stamp.fixed.refs = stamp.fixed.state = mergeChainNonFunctions(stamp.fixed.refs, Constructor.prototype);

  mixinChainFunctions(stamp.fixed.methods, Constructor.prototype);
  addInit(stamp.fixed, ({ instance, args }) => Constructor.apply(instance, args));

  return stamp;
}

function shortcutMethod(extensionFunction, ...args) {
  const stamp = stampit();

  extensionFunction(stamp.fixed, ...args);

  return stamp;
}

export default mixin(stampit, {

  /**
   * Take n objects and add them to the methods list of a new stamp. Creates new stamp.
   * @return {Function} A new stamp (factory object).
   */
  methods: shortcutMethod.bind(null, addMethods),

  /**
   * Take n objects and add them to the references list of a new stamp. Creates new stamp.
   * @return {Function} A new stamp (factory object).
   */
  refs: shortcutMethod.bind(null, addRefs),

  /**
   * Take n functions, an array of functions, or n objects and add
   * the functions to the initializers list of a new stamp. Creates new stamp.
   * @return {Function} A new stamp (factory object).
   */
  init: shortcutMethod.bind(null, addInit),

  /**
   * Take n objects and deep merge them to the properties. Creates new stamp.
   * @return {Function} A new stamp (factory object).
   */
  props: shortcutMethod.bind(null, addProps),

  /**
   * Take n objects and add all props to the factory object. Creates new stamp.
   * @return {Function} A new stamp (factory object).
   */
  static(...statics) {
    const newStamp = shortcutMethod(addStatic, ...statics);
    return mixin(newStamp, newStamp.fixed.static);
  },

  /**
   * Take two or more factories produced from stampit() and
   * combine them to produce a new factory.
   * Combining overrides properties with last-in priority.
   * @param {[Function]|...Function} factories Stamps produced by stampit().
   * @return {Function} A new stampit factory composed from arguments.
   */
  compose: compose,

  /**
   * Take a destination object followed by one or more source objects,
   * and copy the source object properties to the destination object,
   * with last in priority overrides.
   * @param {Object} destination An object to copy properties to.
   * @param {...Object} source An object to copy properties from.
   * @returns {Object}
   */
  mixin,
  extend: mixin,
  mixIn: mixin,
  assign: mixin,

  /**
   * Check if an object is a stamp.
   * @param {Object} obj An object to check.
   * @returns {Boolean}
   */
  isStamp,

  /**
   * Take an old-fashioned JS constructor and return a stampit stamp
   * that you can freely compose with other stamps.
   * @param  {Function} Constructor
   * @return {Function} A composable stampit factory (aka stamp).
   */
  convertConstructor
});
