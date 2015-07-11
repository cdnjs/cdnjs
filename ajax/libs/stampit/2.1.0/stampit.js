/**
 * Stampit
 **
 * Create objects from reusable, composable behaviors.
 **
 * Copyright (c) 2013 Eric Elliott
 * http://opensource.org/licenses/MIT
 **/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashCollectionForEach = require('lodash/collection/forEach');

var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);

var _lodashLangIsFunction = require('lodash/lang/isFunction');

var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

var _lodashLangIsObject = require('lodash/lang/isObject');

var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

var _supermixer = require('supermixer');

var create = Object.create;
function isThenable(value) {
  return value && (0, _lodashLangIsFunction2['default'])(value.then);
}

function extractFunctions() {
  var result = [];

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if ((0, _lodashLangIsFunction2['default'])(args[0])) {
    (0, _lodashCollectionForEach2['default'])(args, function (fn) {
      // assuming all the arguments are functions
      if ((0, _lodashLangIsFunction2['default'])(fn)) {
        result.push(fn);
      }
    });
  } else if ((0, _lodashLangIsObject2['default'])(args[0])) {
    (0, _lodashCollectionForEach2['default'])(args, function (obj) {
      (0, _lodashCollectionForEach2['default'])(obj, function (fn) {
        if ((0, _lodashLangIsFunction2['default'])(fn)) {
          result.push(fn);
        }
      });
    });
  }
  return result;
}

function addMethods(fixed) {
  for (var _len2 = arguments.length, methods = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    methods[_key2 - 1] = arguments[_key2];
  }

  return _supermixer.mixinFunctions.apply(undefined, [fixed.methods].concat(methods));
}
function addRefs(fixed) {
  for (var _len3 = arguments.length, refs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    refs[_key3 - 1] = arguments[_key3];
  }

  fixed.refs = fixed.state = _supermixer.mixin.apply(undefined, [fixed.refs].concat(refs));
  return fixed.refs;
}
function addInit(fixed) {
  for (var _len4 = arguments.length, inits = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    inits[_key4 - 1] = arguments[_key4];
  }

  var extractedInits = extractFunctions.apply(undefined, inits);
  fixed.init = fixed.enclose = fixed.init.concat(extractedInits);
  return fixed.init;
}
function addProps(fixed) {
  for (var _len5 = arguments.length, propses = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    propses[_key5 - 1] = arguments[_key5];
  }

  return _supermixer.merge.apply(undefined, [fixed.props].concat(propses));
}
function addStatic(fixed) {
  for (var _len6 = arguments.length, statics = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    statics[_key6 - 1] = arguments[_key6];
  }

  return _supermixer.mixin.apply(undefined, [fixed['static']].concat(statics));
}

function cloneAndExtend(fixed, extensionFunction) {
  var stamp = stampit(fixed);

  for (var _len7 = arguments.length, args = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
    args[_key7 - 2] = arguments[_key7];
  }

  extensionFunction.apply(undefined, [stamp.fixed].concat(args));
  return stamp;
}

function _compose() {
  var result = stampit();

  for (var _len8 = arguments.length, factories = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    factories[_key8] = arguments[_key8];
  }

  (0, _lodashCollectionForEach2['default'])(factories, function (source) {
    if (source && source.fixed) {
      addMethods(result.fixed, source.fixed.methods);
      // We might end up having two different stampit modules loaded and used in conjunction.
      // These || operators ensure that old stamps could be combined with the current version stamps.
      // 'state' is the old name for 'refs'
      addRefs(result.fixed, source.fixed.refs || source.fixed.state);
      // 'enclose' is the old name for 'init'
      addInit(result.fixed, source.fixed.init || source.fixed.enclose);
      addProps(result.fixed, source.fixed.props);
      addStatic(result.fixed, source.fixed['static']);
    }
  });
  return (0, _supermixer.mixin)(result, result.fixed['static']);
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
var stampit = function stampit(options) {
  var fixed = { methods: {}, refs: {}, init: [], props: {}, 'static': {} };
  fixed.state = fixed.refs; // Backward compatibility. 'state' is the old name for 'refs'.
  fixed.enclose = fixed.init; // Backward compatibility. 'enclose' is the old name for 'init'.
  if (options) {
    addMethods(fixed, options.methods);
    addRefs(fixed, options.refs);
    addInit(fixed, options.init);
    addProps(fixed, options.props);
    addStatic(fixed, options['static']);
  }

  var factory = function Factory(refs) {
    for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
      args[_key9 - 1] = arguments[_key9];
    }

    var instance = (0, _supermixer.mixin)(create(fixed.methods), fixed.refs, refs);
    (0, _supermixer.mergeUnique)(instance, fixed.props); // props are safely merged into refs

    var nextPromise = null;
    if (fixed.init.length > 0) {
      (0, _lodashCollectionForEach2['default'])(fixed.init, function (fn) {
        if (!(0, _lodashLangIsFunction2['default'])(fn)) {
          return; // not a function, do nothing.
        }

        // Check if we are in the async mode.
        if (!nextPromise) {
          // Call the init().
          var callResult = fn.call(instance, { args: args, instance: instance, stamp: factory });
          if (!callResult) {
            return; // The init() returned nothing. Proceed to the next init().
          }

          // Returned value is meaningful.
          // It will replace the stampit-created object.
          if (!isThenable(callResult)) {
            instance = callResult; // stamp is synchronous so far.
            return;
          }

          // This is the sync->async conversion point.
          // Since now our factory will return a promise, not an object.
          nextPromise = callResult;
        } else {
          // As long as one of the init() functions returned a promise,
          // now our factory will 100% return promise too.
          // Linking the init() functions into the promise chain.
          nextPromise = nextPromise.then(function (newInstance) {
            // The previous promise might want to return a value,
            // which we should take as a new object instance.
            instance = newInstance || instance;

            // Calling the following init().
            // NOTE, than `fn` is wrapped to a closure within the forEach loop.
            var callResult = fn.call(instance, { args: args, instance: instance, stamp: factory });
            // Check if call result is truthy.
            if (!callResult) {
              // The init() returned nothing. Thus using the previous object instance.
              return instance;
            }

            if (!isThenable(callResult)) {
              // This init() was synchronous and returned a meaningful value.
              instance = callResult;
              // Resolve the instance for the next `then()`.
              return instance;
            }

            // The init() returned another promise. It is becoming our nextPromise.
            return callResult;
          });
        }
      });
    }

    // At the end we should resolve the last promise and
    // return the resolved value (as a promise too).
    return nextPromise ? nextPromise.then(function (newInstance) {
      return newInstance || instance;
    }) : instance;
  };

  var refsMethod = cloneAndExtend.bind(null, fixed, addRefs);
  var initMethod = cloneAndExtend.bind(null, fixed, addInit);
  return (0, _supermixer.mixin)(factory, {
    /**
     * Creates a new object instance form the stamp.
     */
    create: factory,

    /**
     * The stamp components.
     */
    fixed: fixed,

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
    'static': function _static() {
      for (var _len10 = arguments.length, statics = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        statics[_key10] = arguments[_key10];
      }

      var newStamp = cloneAndExtend.apply(undefined, [factory.fixed, addStatic].concat(statics));
      return (0, _supermixer.mixin)(newStamp, newStamp.fixed['static']);
    },

    /**
     * Take one or more factories produced from stampit() and
     * combine them with `this` to produce and return a new factory.
     * Combining overrides properties with last-in priority.
     * @param {[Function]|...Function} factories Stampit factories.
     * @return {Function} A new stampit factory composed from arguments.
     */
    compose: function compose() {
      for (var _len11 = arguments.length, factories = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        factories[_key11] = arguments[_key11];
      }

      return _compose.apply(undefined, [factory].concat(factories));
    }
  }, fixed['static']);
};

// Static methods

function isStamp(obj) {
  return (0, _lodashLangIsFunction2['default'])(obj) && (0, _lodashLangIsFunction2['default'])(obj.methods) && ((0, _lodashLangIsFunction2['default'])(obj.refs) || (0, _lodashLangIsFunction2['default'])(obj.state)) && ((0, _lodashLangIsFunction2['default'])(obj.init) || (0, _lodashLangIsFunction2['default'])(obj.enclose)) && (0, _lodashLangIsFunction2['default'])(obj.props) && (0, _lodashLangIsFunction2['default'])(obj['static']) && (0, _lodashLangIsObject2['default'])(obj.fixed);
}

function convertConstructor(Constructor) {
  var stamp = stampit();
  stamp.fixed.refs = stamp.fixed.state = (0, _supermixer.mergeChainNonFunctions)(stamp.fixed.refs, Constructor.prototype);
  (0, _supermixer.mixin)(stamp, (0, _supermixer.mixin)(stamp.fixed['static'], Constructor));

  (0, _supermixer.mixinChainFunctions)(stamp.fixed.methods, Constructor.prototype);
  addInit(stamp.fixed, function (_ref) {
    var instance = _ref.instance;
    var args = _ref.args;
    return Constructor.apply(instance, args);
  });

  return stamp;
}

function shortcutMethod(extensionFunction) {
  var stamp = stampit();

  for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
    args[_key12 - 1] = arguments[_key12];
  }

  extensionFunction.apply(undefined, [stamp.fixed].concat(args));

  return stamp;
}

exports['default'] = (0, _supermixer.mixin)(stampit, {

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
  'static': function _static() {
    for (var _len13 = arguments.length, statics = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
      statics[_key13] = arguments[_key13];
    }

    var newStamp = shortcutMethod.apply(undefined, [addStatic].concat(statics));
    return (0, _supermixer.mixin)(newStamp, newStamp.fixed['static']);
  },

  /**
   * Take two or more factories produced from stampit() and
   * combine them to produce a new factory.
   * Combining overrides properties with last-in priority.
   * @param {[Function]|...Function} factories Stamps produced by stampit().
   * @return {Function} A new stampit factory composed from arguments.
   */
  compose: _compose,

  /**
   * Take a destination object followed by one or more source objects,
   * and copy the source object properties to the destination object,
   * with last in priority overrides.
   * @param {Object} destination An object to copy properties to.
   * @param {...Object} source An object to copy properties from.
   * @returns {Object}
   */
  mixin: _supermixer.mixin,
  extend: _supermixer.mixin,
  mixIn: _supermixer.mixin,
  assign: _supermixer.mixin,

  /**
   * Check if an object is a stamp.
   * @param {Object} obj An object to check.
   * @returns {Boolean}
   */
  isStamp: isStamp,

  /**
   * Take an old-fashioned JS constructor and return a stampit stamp
   * that you can freely compose with other stamps.
   * @param  {Function} Constructor
   * @return {Function} A composable stampit factory (aka stamp).
   */
  convertConstructor: convertConstructor
});
module.exports = exports['default'];

// isStamp can be called for old stampit factory object.
// We should check old names (state and enclose) too.