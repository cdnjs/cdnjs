(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.stampit = global.stampit || {})));
}(this, (function (exports) { 'use strict';

function isObject(obj) {
  var type = typeof obj;
  return !!obj && (type === 'object' || type === 'function');
}

function isFunction(obj) {
  return typeof obj === 'function';
}

var extractFunctions = function () {
  var result = [];
  for (var i = 0; i < arguments.length; i += 1) {
    var arg = arguments.length <= i + 0 ? undefined : arguments[i + 0];
    if (isFunction(arg)) result.push(arg);else if (Array.isArray(arg)) result = result.concat(arg.filter(isFunction));
  }
  return result.length === 0 ? undefined : result;
}

function isPlainObject(value) {
  return !!value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype;
}

/**
 * The 'src' argument plays the command role.
 * The returned values is always of the same type as the 'src'.
 * @param dst
 * @param src
 * @returns {*}
 */
function mergeOne(dst, src) {
  if (src === undefined) return dst;

  // According to specification arrays must be concatenated.
  // Also, the '.concat' creates a new array instance. Overrides the 'dst'.
  if (Array.isArray(src)) return (Array.isArray(dst) ? dst : []).concat(src);

  // Now deal with non plain 'src' object. 'src' overrides 'dst'
  // Note that functions are also assigned! We do not deep merge functions.
  if (!isPlainObject(src)) return src;

  // See if 'dst' is allowed to be mutated. If not - it's overridden with a new plain object.
  var returnValue = isObject(dst) ? dst : {};

  var keys = Object.keys(src);
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];

    var srcValue = src[key];
    // Do not merge properties with the 'undefined' value.
    if (srcValue !== undefined) {
      var dstValue = returnValue[key];
      // Recursive calls to mergeOne() must allow only plain objects or arrays in dst
      var newDst = isPlainObject(dstValue) || Array.isArray(srcValue) ? dstValue : {};

      // deep merge each property. Recursion!
      returnValue[key] = mergeOne(newDst, srcValue);
    }
  }

  return returnValue;
}

var merge = function (dst) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  return srcs.reduce(mergeOne, dst);
}

var assign$1 = Object.assign;

var standardiseDescriptor = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var methods = _ref.methods;
  var properties = _ref.properties;
  var props = _ref.props;
  var refs = _ref.refs;
  var initializers = _ref.initializers;
  var init = _ref.init;
  var deepProperties = _ref.deepProperties;
  var deepProps = _ref.deepProps;
  var propertyDescriptors = _ref.propertyDescriptors;
  var staticProperties = _ref.staticProperties;
  var statics = _ref.statics;
  var staticDeepProperties = _ref.staticDeepProperties;
  var deepStatics = _ref.deepStatics;
  var staticPropertyDescriptors = _ref.staticPropertyDescriptors;
  var configuration = _ref.configuration;
  var conf = _ref.conf;
  var deepConfiguration = _ref.deepConfiguration;
  var deepConf = _ref.deepConf;

  var p = isObject(props) || isObject(refs) || isObject(properties) ? assign$1({}, props, refs, properties) : undefined;

  var dp = isObject(deepProps) ? merge({}, deepProps) : undefined;
  dp = isObject(deepProperties) ? merge(dp, deepProperties) : dp;

  var sp = isObject(statics) || isObject(staticProperties) ? assign$1({}, statics, staticProperties) : undefined;

  var dsp = isObject(deepStatics) ? merge({}, deepStatics) : undefined;
  dsp = isObject(staticDeepProperties) ? merge(dsp, staticDeepProperties) : dsp;

  var c = isObject(conf) || isObject(configuration) ? assign$1({}, conf, configuration) : undefined;

  var dc = isObject(deepConf) ? merge({}, deepConf) : undefined;
  dc = isObject(deepConfiguration) ? merge(dc, deepConfiguration) : dc;

  return {
    methods: methods,
    properties: p,
    initializers: extractFunctions(init, initializers),
    deepProperties: dp,
    staticProperties: sp,
    staticDeepProperties: dsp,
    propertyDescriptors: propertyDescriptors,
    staticPropertyDescriptors: staticPropertyDescriptors,
    configuration: c,
    deepConfiguration: dc
  };
}

var assign$2 = Object.assign;

/**
 * Creates new factory instance.
 * @param {object} descriptor The information about the object the factory will be creating.
 * @returns {Function} The new factory function.
 */
function createFactory(descriptor) {
  return function Stamp(options) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var obj = Object.create(descriptor.methods || {});

    merge(obj, descriptor.deepProperties);
    assign$2(obj, descriptor.properties);
    Object.defineProperties(obj, descriptor.propertyDescriptors || {});

    if (!descriptor.initializers || descriptor.initializers.length === 0) return obj;

    if (options === undefined) options = {};
    return descriptor.initializers.filter(isFunction).reduce(function (resultingObj, initializer) {
      var returnedValue = initializer.call(resultingObj, options, { instance: resultingObj, stamp: Stamp, args: [options].concat(args) });
      return returnedValue === undefined ? resultingObj : returnedValue;
    }, obj);
  };
}

/**
 * Returns a new stamp given a descriptor and a compose function implementation.
 * @param {object} [descriptor={}] The information about the object the stamp will be creating.
 * @param {Function} composeFunction The "compose" function implementation.
 * @returns {Function}
 */
function createStamp(descriptor, composeFunction) {
  var Stamp = createFactory(descriptor);

  merge(Stamp, descriptor.staticDeepProperties);
  assign$2(Stamp, descriptor.staticProperties);
  Object.defineProperties(Stamp, descriptor.staticPropertyDescriptors || {});

  var composeImplementation = isFunction(Stamp.compose) ? Stamp.compose : composeFunction;
  Stamp.compose = function _compose() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return composeImplementation.apply(this, args);
  };
  assign$2(Stamp.compose, descriptor);

  return Stamp;
}

/**
 * Mutates the dstDescriptor by merging the srcComposable data into it.
 * @param {object} dstDescriptor The descriptor object to merge into.
 * @param {object} [srcComposable] The composable (either descriptor or stamp) to merge data form.
 * @returns {object} Returns the dstDescriptor argument.
 */
function mergeComposable(dstDescriptor, srcComposable) {
  var srcDescriptor = srcComposable && srcComposable.compose || srcComposable;
  if (!isObject(srcDescriptor)) return dstDescriptor;

  var combineProperty = function combineProperty(propName, action) {
    if (!isObject(srcDescriptor[propName])) return;
    if (!isObject(dstDescriptor[propName])) dstDescriptor[propName] = {};
    action(dstDescriptor[propName], srcDescriptor[propName]);
  };

  combineProperty('methods', assign$2);
  combineProperty('properties', assign$2);
  combineProperty('deepProperties', merge);
  combineProperty('propertyDescriptors', assign$2);
  combineProperty('staticProperties', assign$2);
  combineProperty('staticDeepProperties', merge);
  combineProperty('staticPropertyDescriptors', assign$2);
  combineProperty('configuration', assign$2);
  combineProperty('deepConfiguration', merge);
  if (Array.isArray(srcDescriptor.initializers)) {
    dstDescriptor.initializers = srcDescriptor.initializers.reduce(function (result, init) {
      if (isFunction(init) && result.indexOf(init) < 0) {
        result.push(init);
      }
      return result;
    }, Array.isArray(dstDescriptor.initializers) ? dstDescriptor.initializers : []);
  }

  return dstDescriptor;
}

/**
 * Given the list of composables (stamp descriptors and stamps) returns
 * a new stamp (composable factory function).
 * @param {...(object|Function)} [composables] The list of composables.
 * @returns {Stamp} A new stamp (aka composable factory function)
 */
function compose() {
  for (var _len3 = arguments.length, composables = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    composables[_key3] = arguments[_key3];
  }

  var descriptor = [this].concat(composables).filter(isObject).reduce(mergeComposable, {});
  return createStamp(descriptor, compose);
}

/**
 * The Stamp Descriptor
 * @typedef {Function|Object} Descriptor
 * @returns {Stamp} A new stamp based on this Stamp
 * @property {Object} [methods] Methods or other data used as object instances' prototype
 * @property {Array<Function>} [initializers] List of initializers called for each object instance
 * @property {Object} [properties] Shallow assigned properties of object instances
 * @property {Object} [deepProperties] Deeply merged properties of object instances
 * @property {Object} [staticProperties] Shallow assigned properties of Stamps
 * @property {Object} [staticDeepProperties] Deeply merged properties of Stamps
 * @property {Object} [configuration] Shallow assigned properties of Stamp arbitrary metadata
 * @property {Object} [deepConfiguration] Deeply merged properties of Stamp arbitrary metadata
 * @property {Object} [propertyDescriptors] ES5 Property Descriptors applied to object instances
 * @property {Object} [staticPropertyDescriptors] ES5 Property Descriptors applied to Stamps
 */

/**
 * The Stamp factory function
 * @typedef {Function} Stamp
 * @returns {*} Instantiated object
 * @property {Descriptor} compose - The Stamp descriptor and composition function
 */

function isStamp(obj) {
  return isFunction(obj) && isFunction(obj.compose);
}

var assign = Object.assign;

function createUtilityFunction(propName, action) {
  return function composeUtil() {
    var descriptor = {};
    descriptor[propName] = action.apply(undefined, [{}].concat(Array.prototype.slice.call(arguments)));
    return (this && this.compose || stampit).call(this, descriptor);
  };
}

var methods = createUtilityFunction('methods', assign);

var properties = createUtilityFunction('properties', assign);
function initializers() {
  return (this && this.compose || stampit).call(this, {
    initializers: extractFunctions.apply(undefined, arguments)
  });
}
var deepProperties = createUtilityFunction('deepProperties', merge);
var staticProperties = createUtilityFunction('staticProperties', assign);
var staticDeepProperties = createUtilityFunction('staticDeepProperties', merge);
var configuration = createUtilityFunction('configuration', assign);
var deepConfiguration = createUtilityFunction('deepConfiguration', merge);
var propertyDescriptors = createUtilityFunction('propertyDescriptors', assign);

var staticPropertyDescriptors = createUtilityFunction('staticPropertyDescriptors', assign);

var allUtilities = {
  methods: methods,

  properties: properties,
  refs: properties,
  props: properties,

  initializers: initializers,
  init: initializers,

  deepProperties: deepProperties,
  deepProps: deepProperties,

  staticProperties: staticProperties,
  statics: staticProperties,

  staticDeepProperties: staticDeepProperties,
  deepStatics: staticDeepProperties,

  configuration: configuration,
  conf: configuration,

  deepConfiguration: deepConfiguration,
  deepConf: deepConfiguration,

  propertyDescriptors: propertyDescriptors,

  staticPropertyDescriptors: staticPropertyDescriptors
};

/**
 * Infected stamp. Used as a storage of the infection metadata
 * @type {Function}
 * @return {Stamp}
 */
var baseStampit = compose({ staticProperties: allUtilities }, {
  staticProperties: {
    create: function create() {
      return this.apply(undefined, arguments);
    },

    compose: stampit // infecting
  }
});

/**
 * Infected compose
 * @return {Stamp}
 */
function stampit() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args = args.filter(isObject).map(function (arg) {
    return isStamp(arg) ? arg : standardiseDescriptor(arg);
  });

  // Calling the standard pure compose function here.
  return compose.apply(this || baseStampit, args);
}

var exportedCompose = stampit.bind(); // bind to 'undefined'
stampit.compose = exportedCompose;

// Setting up the shortcut functions
var stampit$1 = assign(stampit, allUtilities);

exports.methods = methods;
exports.properties = properties;
exports.refs = properties;
exports.props = properties;
exports.initializers = initializers;
exports.init = initializers;
exports.deepProperties = deepProperties;
exports.deepProps = deepProperties;
exports.staticProperties = staticProperties;
exports.statics = staticProperties;
exports.staticDeepProperties = staticDeepProperties;
exports.deepStatics = staticDeepProperties;
exports.configuration = configuration;
exports.conf = configuration;
exports.deepConfiguration = deepConfiguration;
exports.deepConf = deepConfiguration;
exports.propertyDescriptors = propertyDescriptors;
exports.staticPropertyDescriptors = staticPropertyDescriptors;
exports.compose = exportedCompose;
exports['default'] = stampit$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=stampit.umd.js.map
