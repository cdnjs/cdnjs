/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

exports.__esModule = true;
exports.addWhitelistedStyleProp = addWhitelistedStyleProp;
exports.addWhitelistedTransformProp = addWhitelistedTransformProp;
exports.addWhitelistedInterpolationParam = addWhitelistedInterpolationParam;
exports.validateStyles = validateStyles;
exports.validateTransform = validateTransform;
exports.validateInterpolation = validateInterpolation;
exports.generateNewNodeTag = generateNewNodeTag;
exports.generateNewAnimationId = generateNewAnimationId;
exports.assertNativeAnimatedModule = assertNativeAnimatedModule;
exports.shouldUseNativeDriver = shouldUseNativeDriver;
exports.transformDataType = transformDataType;
exports.default = exports.API = void 0;

var _NativeEventEmitter = _interopRequireDefault(require("../NativeEventEmitter"));

var _NativeAnimatedModule = _interopRequireDefault(require("./NativeAnimatedModule"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __nativeAnimatedNodeTagCount = 1;
/* used for animated nodes */

var __nativeAnimationIdCount = 1;
/* used for started animations */

var nativeEventEmitter;
var queueConnections = false;
var queue = [];
/**
 * Simple wrappers around NativeAnimatedModule to provide flow and autocmplete support for
 * the native module methods
 */

var API = {
  enableQueue: function enableQueue() {
    queueConnections = true;
  },
  disableQueue: function disableQueue() {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');
    queueConnections = false;

    for (var q = 0, l = queue.length; q < l; q++) {
      var args = queue[q];

      _NativeAnimatedModule.default.connectAnimatedNodes(args[0], args[1]);
    }

    queue.length = 0;
  },
  createAnimatedNode: function createAnimatedNode(tag, config) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.createAnimatedNode(tag, config);
  },
  startListeningToAnimatedNodeValue: function startListeningToAnimatedNodeValue(tag) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.startListeningToAnimatedNodeValue(tag);
  },
  stopListeningToAnimatedNodeValue: function stopListeningToAnimatedNodeValue(tag) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.stopListeningToAnimatedNodeValue(tag);
  },
  connectAnimatedNodes: function connectAnimatedNodes(parentTag, childTag) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    if (queueConnections) {
      queue.push([parentTag, childTag]);
      return;
    }

    _NativeAnimatedModule.default.connectAnimatedNodes(parentTag, childTag);
  },
  disconnectAnimatedNodes: function disconnectAnimatedNodes(parentTag, childTag) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.disconnectAnimatedNodes(parentTag, childTag);
  },
  startAnimatingNode: function startAnimatingNode(animationId, nodeTag, config, endCallback) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.startAnimatingNode(animationId, nodeTag, config, endCallback);
  },
  stopAnimation: function stopAnimation(animationId) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.stopAnimation(animationId);
  },
  setAnimatedNodeValue: function setAnimatedNodeValue(nodeTag, value) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.setAnimatedNodeValue(nodeTag, value);
  },
  setAnimatedNodeOffset: function setAnimatedNodeOffset(nodeTag, offset) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.setAnimatedNodeOffset(nodeTag, offset);
  },
  flattenAnimatedNodeOffset: function flattenAnimatedNodeOffset(nodeTag) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.flattenAnimatedNodeOffset(nodeTag);
  },
  extractAnimatedNodeOffset: function extractAnimatedNodeOffset(nodeTag) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.extractAnimatedNodeOffset(nodeTag);
  },
  connectAnimatedNodeToView: function connectAnimatedNodeToView(nodeTag, viewTag) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.connectAnimatedNodeToView(nodeTag, viewTag);
  },
  disconnectAnimatedNodeFromView: function disconnectAnimatedNodeFromView(nodeTag, viewTag) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.disconnectAnimatedNodeFromView(nodeTag, viewTag);
  },
  dropAnimatedNode: function dropAnimatedNode(tag) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.dropAnimatedNode(tag);
  },
  addAnimatedEventToView: function addAnimatedEventToView(viewTag, eventName, eventMapping) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.addAnimatedEventToView(viewTag, eventName, eventMapping);
  },
  removeAnimatedEventFromView: function removeAnimatedEventFromView(viewTag, eventName, animatedNodeTag) {
    (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');

    _NativeAnimatedModule.default.removeAnimatedEventFromView(viewTag, eventName, animatedNodeTag);
  }
};
/**
 * Styles allowed by the native animated implementation.
 *
 * In general native animated implementation should support any numeric property that doesn't need
 * to be updated through the shadow view hierarchy (all non-layout properties).
 */

exports.API = API;
var STYLES_WHITELIST = {
  opacity: true,
  transform: true,
  borderRadius: true,
  borderBottomEndRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderBottomStartRadius: true,
  borderTopEndRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderTopStartRadius: true,
  elevation: true,

  /* ios styles */
  shadowOpacity: true,
  shadowRadius: true,

  /* legacy android transform properties */
  scaleX: true,
  scaleY: true,
  translateX: true,
  translateY: true
};
var TRANSFORM_WHITELIST = {
  translateX: true,
  translateY: true,
  scale: true,
  scaleX: true,
  scaleY: true,
  rotate: true,
  rotateX: true,
  rotateY: true,
  perspective: true
};
var SUPPORTED_INTERPOLATION_PARAMS = {
  inputRange: true,
  outputRange: true,
  extrapolate: true,
  extrapolateRight: true,
  extrapolateLeft: true
};

function addWhitelistedStyleProp(prop) {
  STYLES_WHITELIST[prop] = true;
}

function addWhitelistedTransformProp(prop) {
  TRANSFORM_WHITELIST[prop] = true;
}

function addWhitelistedInterpolationParam(param) {
  SUPPORTED_INTERPOLATION_PARAMS[param] = true;
}

function validateTransform(configs) {
  configs.forEach(function (config) {
    if (!TRANSFORM_WHITELIST.hasOwnProperty(config.property)) {
      throw new Error("Property '" + config.property + "' is not supported by native animated module");
    }
  });
}

function validateStyles(styles) {
  for (var _key in styles) {
    if (!STYLES_WHITELIST.hasOwnProperty(_key)) {
      throw new Error("Style property '" + _key + "' is not supported by native animated module");
    }
  }
}

function validateInterpolation(config) {
  for (var _key2 in config) {
    if (!SUPPORTED_INTERPOLATION_PARAMS.hasOwnProperty(_key2)) {
      throw new Error("Interpolation property '" + _key2 + "' is not supported by native animated module");
    }
  }
}

function generateNewNodeTag() {
  return __nativeAnimatedNodeTagCount++;
}

function generateNewAnimationId() {
  return __nativeAnimationIdCount++;
}

function assertNativeAnimatedModule() {
  (0, _invariant.default)(_NativeAnimatedModule.default, 'Native animated module is not available');
}

function shouldUseNativeDriver(config) {
  if (config.useNativeDriver === true && !_NativeAnimatedModule.default) {
    return false;
  }

  return config.useNativeDriver || false;
}

function transformDataType(value) {
  // Change the string type to number type so we can reuse the same logic in
  // iOS and Android platform
  if (typeof value !== 'string') {
    return value;
  }

  if (/deg$/.test(value)) {
    var degrees = parseFloat(value) || 0;
    var radians = degrees * Math.PI / 180.0;
    return radians;
  } else {
    return value;
  }
}

var NativeAnimatedHelper = {
  API: API,
  addWhitelistedStyleProp: addWhitelistedStyleProp,
  addWhitelistedTransformProp: addWhitelistedTransformProp,
  addWhitelistedInterpolationParam: addWhitelistedInterpolationParam,
  validateStyles: validateStyles,
  validateTransform: validateTransform,
  validateInterpolation: validateInterpolation,
  generateNewNodeTag: generateNewNodeTag,
  generateNewAnimationId: generateNewAnimationId,
  assertNativeAnimatedModule: assertNativeAnimatedModule,
  shouldUseNativeDriver: shouldUseNativeDriver,
  transformDataType: transformDataType,

  get nativeEventEmitter() {
    if (!nativeEventEmitter) {
      nativeEventEmitter = new _NativeEventEmitter.default(_NativeAnimatedModule.default);
    }

    return nativeEventEmitter;
  }

};
var _default = NativeAnimatedHelper;
exports.default = _default;