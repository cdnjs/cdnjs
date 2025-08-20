"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.API = void 0;
exports.addWhitelistedInterpolationParam = addWhitelistedInterpolationParam;
exports.addWhitelistedStyleProp = addWhitelistedStyleProp;
exports.addWhitelistedTransformProp = addWhitelistedTransformProp;
exports.assertNativeAnimatedModule = assertNativeAnimatedModule;
exports.default = void 0;
exports.generateNewAnimationId = generateNewAnimationId;
exports.generateNewNodeTag = generateNewNodeTag;
exports.isSupportedColorStyleProp = isSupportedColorStyleProp;
exports.isSupportedInterpolationParam = isSupportedInterpolationParam;
exports.isSupportedStyleProp = isSupportedStyleProp;
exports.isSupportedTransformProp = isSupportedTransformProp;
exports.shouldUseNativeDriver = shouldUseNativeDriver;
exports.transformDataType = transformDataType;
exports.validateInterpolation = validateInterpolation;
exports.validateStyles = validateStyles;
exports.validateTransform = validateTransform;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _NativeAnimatedModule = _interopRequireDefault(require("./NativeAnimatedModule"));
var _NativeAnimatedTurboModule = _interopRequireDefault(require("./NativeAnimatedTurboModule"));
var _NativeEventEmitter = _interopRequireDefault(require("../EventEmitter/NativeEventEmitter"));
var _Platform = _interopRequireDefault(require("../Utilities/Platform"));
var _ReactNativeFeatureFlags = _interopRequireDefault(require("../ReactNative/ReactNativeFeatureFlags"));
var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));
var _RCTDeviceEventEmitter = _interopRequireDefault(require("../EventEmitter/RCTDeviceEventEmitter"));
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

// TODO T69437152 @petetheheat - Delete this fork when Fabric ships to 100%.
var NativeAnimatedModule = _Platform.default.OS === 'ios' && global.RN$Bridgeless === true ? _NativeAnimatedTurboModule.default : _NativeAnimatedModule.default;
var __nativeAnimatedNodeTagCount = 1; /* used for animated nodes */
var __nativeAnimationIdCount = 1; /* used for started animations */

var nativeEventEmitter;
var waitingForQueuedOperations = new Set();
var queueOperations = false;
var queue = [];
// $FlowFixMe
var singleOpQueue = [];
var useSingleOpBatching = false;
_Platform.default.OS === 'android' && !!(NativeAnimatedModule != null && NativeAnimatedModule.queueAndExecuteBatchedOperations) && _ReactNativeFeatureFlags.default.animatedShouldUseSingleOp();
var flushQueueTimeout = null;
var eventListenerGetValueCallbacks = {};
var eventListenerAnimationFinishedCallbacks = {};
var globalEventEmitterGetValueListener = null;
var globalEventEmitterAnimationFinishedListener = null;
var nativeOps = useSingleOpBatching ? function () {
  var apis = ['createAnimatedNode',
  // 1
  'updateAnimatedNodeConfig',
  // 2
  'getValue',
  // 3
  'startListeningToAnimatedNodeValue',
  // 4
  'stopListeningToAnimatedNodeValue',
  // 5
  'connectAnimatedNodes',
  // 6
  'disconnectAnimatedNodes',
  // 7
  'startAnimatingNode',
  // 8
  'stopAnimation',
  // 9
  'setAnimatedNodeValue',
  // 10
  'setAnimatedNodeOffset',
  // 11
  'flattenAnimatedNodeOffset',
  // 12
  'extractAnimatedNodeOffset',
  // 13
  'connectAnimatedNodeToView',
  // 14
  'disconnectAnimatedNodeFromView',
  // 15
  'restoreDefaultValues',
  // 16
  'dropAnimatedNode',
  // 17
  'addAnimatedEventToView',
  // 18
  'removeAnimatedEventFromView',
  // 19
  'addListener',
  // 20
  'removeListener' // 21
  ];
  return apis.reduce((acc, functionName, i) => {
    // These indices need to be kept in sync with the indices in native (see NativeAnimatedModule in Java, or the equivalent for any other native platform).
    // $FlowFixMe[prop-missing]
    acc[functionName] = i + 1;
    return acc;
  }, {});
}() : NativeAnimatedModule;

/**
 * Wrappers around NativeAnimatedModule to provide flow and autocomplete support for
 * the native module methods, and automatic queue management on Android
 */
var API = exports.API = {
  getValue: function getValue(tag, saveValueCallback) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    if (useSingleOpBatching) {
      if (saveValueCallback) {
        eventListenerGetValueCallbacks[tag] = saveValueCallback;
      }
      // $FlowFixMe
      API.queueOperation(nativeOps.getValue, tag);
    } else {
      API.queueOperation(nativeOps.getValue, tag, saveValueCallback);
    }
  },
  setWaitingForIdentifier: function setWaitingForIdentifier(id) {
    waitingForQueuedOperations.add(id);
    queueOperations = true;
    if (_ReactNativeFeatureFlags.default.animatedShouldDebounceQueueFlush() && flushQueueTimeout) {
      clearTimeout(flushQueueTimeout);
    }
  },
  unsetWaitingForIdentifier: function unsetWaitingForIdentifier(id) {
    waitingForQueuedOperations.delete(id);
    if (waitingForQueuedOperations.size === 0) {
      queueOperations = false;
      API.disableQueue();
    }
  },
  disableQueue: function disableQueue() {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    if (_ReactNativeFeatureFlags.default.animatedShouldDebounceQueueFlush()) {
      var prevTimeout = flushQueueTimeout;
      clearImmediate(prevTimeout);
      flushQueueTimeout = setImmediate(API.flushQueue);
    } else {
      API.flushQueue();
    }
  },
  flushQueue: function flushQueue() {
    /*
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    flushQueueTimeout = null;
     // Early returns before calling any APIs
    if (useSingleOpBatching && singleOpQueue.length === 0) {
      return;
    }
    if (!useSingleOpBatching && queue.length === 0) {
      return;
    }
     if (useSingleOpBatching) {
      // Set up event listener for callbacks if it's not set up
      if (
        !globalEventEmitterGetValueListener ||
        !globalEventEmitterAnimationFinishedListener
      ) {
        setupGlobalEventEmitterListeners();
      }
      // Single op batching doesn't use callback functions, instead we
      // use RCTDeviceEventEmitter. This reduces overhead of sending lots of
      // JSI functions across to native code; but also, TM infrastructure currently
      // does not support packing a function into native arrays.
      NativeAnimatedModule.queueAndExecuteBatchedOperations?.(singleOpQueue);
      singleOpQueue.length = 0;
    } else {
      Platform.OS === 'android' && NativeAnimatedModule.startOperationBatch?.();
      for (let q = 0, l = queue.length; q < l; q++) {
        queue[q]();
      }
      queue.length = 0;
      Platform.OS === 'android' &&
        NativeAnimatedModule.finishOperationBatch?.();
    }
    */
  },
  queueOperation: function queueOperation(fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (useSingleOpBatching) {
      // Get the command ID from the queued function, and push that ID and any arguments needed to execute the operation
      // $FlowFixMe: surprise, fn is actually a number
      singleOpQueue.push(fn, ...args);
      return;
    }

    // If queueing is explicitly on, *or* the queue has not yet
    // been flushed, use the queue. This is to prevent operations
    // from being executed out of order.
    if (queueOperations || queue.length !== 0) {
      queue.push(() => fn(...args));
    } else {
      fn(...args);
    }
  },
  createAnimatedNode: function createAnimatedNode(tag, config) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.createAnimatedNode, tag, config);
  },
  updateAnimatedNodeConfig: function updateAnimatedNodeConfig(tag, config) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    //if (nativeOps.updateAnimatedNodeConfig) {
    //  API.queueOperation(nativeOps.updateAnimatedNodeConfig, tag, config);
    //}
  },
  startListeningToAnimatedNodeValue: function startListeningToAnimatedNodeValue(tag) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.startListeningToAnimatedNodeValue, tag);
  },
  stopListeningToAnimatedNodeValue: function stopListeningToAnimatedNodeValue(tag) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.stopListeningToAnimatedNodeValue, tag);
  },
  connectAnimatedNodes: function connectAnimatedNodes(parentTag, childTag) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.connectAnimatedNodes, parentTag, childTag);
  },
  disconnectAnimatedNodes: function disconnectAnimatedNodes(parentTag, childTag) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.disconnectAnimatedNodes, parentTag, childTag);
  },
  startAnimatingNode: function startAnimatingNode(animationId, nodeTag, config, endCallback) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    if (useSingleOpBatching) {
      if (endCallback) {
        eventListenerAnimationFinishedCallbacks[animationId] = endCallback;
      }
      // $FlowFixMe
      API.queueOperation(nativeOps.startAnimatingNode, animationId, nodeTag, config);
    } else {
      API.queueOperation(nativeOps.startAnimatingNode, animationId, nodeTag, config, endCallback);
    }
  },
  stopAnimation: function stopAnimation(animationId) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.stopAnimation, animationId);
  },
  setAnimatedNodeValue: function setAnimatedNodeValue(nodeTag, value) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.setAnimatedNodeValue, nodeTag, value);
  },
  setAnimatedNodeOffset: function setAnimatedNodeOffset(nodeTag, offset) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.setAnimatedNodeOffset, nodeTag, offset);
  },
  flattenAnimatedNodeOffset: function flattenAnimatedNodeOffset(nodeTag) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.flattenAnimatedNodeOffset, nodeTag);
  },
  extractAnimatedNodeOffset: function extractAnimatedNodeOffset(nodeTag) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.extractAnimatedNodeOffset, nodeTag);
  },
  connectAnimatedNodeToView: function connectAnimatedNodeToView(nodeTag, viewTag) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.connectAnimatedNodeToView, nodeTag, viewTag);
  },
  disconnectAnimatedNodeFromView: function disconnectAnimatedNodeFromView(nodeTag, viewTag) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.disconnectAnimatedNodeFromView, nodeTag, viewTag);
  },
  restoreDefaultValues: function restoreDefaultValues(nodeTag) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    // Backwards compat with older native runtimes, can be removed later.
    if (nativeOps.restoreDefaultValues != null) {
      API.queueOperation(nativeOps.restoreDefaultValues, nodeTag);
    }
  },
  dropAnimatedNode: function dropAnimatedNode(tag) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.dropAnimatedNode, tag);
  },
  addAnimatedEventToView: function addAnimatedEventToView(viewTag, eventName, eventMapping) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.addAnimatedEventToView, viewTag, eventName, eventMapping);
  },
  removeAnimatedEventFromView(viewTag, eventName, animatedNodeTag) {
    (0, _invariant.default)(nativeOps, 'Native animated module is not available');
    API.queueOperation(nativeOps.removeAnimatedEventFromView, viewTag, eventName, animatedNodeTag);
  }
};
function setupGlobalEventEmitterListeners() {
  globalEventEmitterGetValueListener = _RCTDeviceEventEmitter.default.addListener('onNativeAnimatedModuleGetValue', function (params) {
    var tag = params.tag;
    var callback = eventListenerGetValueCallbacks[tag];
    if (!callback) {
      return;
    }
    callback(params.value);
    delete eventListenerGetValueCallbacks[tag];
  });
  globalEventEmitterAnimationFinishedListener = _RCTDeviceEventEmitter.default.addListener('onNativeAnimatedModuleAnimationFinished', function (params) {
    var animationId = params.animationId;
    var callback = eventListenerAnimationFinishedCallbacks[animationId];
    if (!callback) {
      return;
    }
    callback(params);
    delete eventListenerAnimationFinishedCallbacks[animationId];
  });
}

/**
 * Styles allowed by the native animated implementation.
 *
 * In general native animated implementation should support any numeric or color property that
 * doesn't need to be updated through the shadow view hierarchy (all non-layout properties).
 */
var SUPPORTED_COLOR_STYLES = {
  backgroundColor: true,
  borderBottomColor: true,
  borderColor: true,
  borderEndColor: true,
  borderLeftColor: true,
  borderRightColor: true,
  borderStartColor: true,
  borderTopColor: true,
  color: true,
  tintColor: true
};
var SUPPORTED_STYLES = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, SUPPORTED_COLOR_STYLES), {}, {
  borderBottomEndRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderBottomStartRadius: true,
  borderRadius: true,
  borderTopEndRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderTopStartRadius: true,
  elevation: true,
  opacity: true,
  transform: true,
  zIndex: true,
  /* ios styles */
  shadowOpacity: true,
  shadowRadius: true,
  /* legacy android transform properties */
  scaleX: true,
  scaleY: true,
  translateX: true,
  translateY: true
});
var SUPPORTED_TRANSFORMS = {
  translateX: true,
  translateY: true,
  scale: true,
  scaleX: true,
  scaleY: true,
  rotate: true,
  rotateX: true,
  rotateY: true,
  rotateZ: true,
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
  SUPPORTED_STYLES[prop] = true;
}
function addWhitelistedTransformProp(prop) {
  SUPPORTED_TRANSFORMS[prop] = true;
}
function addWhitelistedInterpolationParam(param) {
  SUPPORTED_INTERPOLATION_PARAMS[param] = true;
}
function isSupportedColorStyleProp(prop) {
  return SUPPORTED_COLOR_STYLES.hasOwnProperty(prop);
}
function isSupportedStyleProp(prop) {
  return SUPPORTED_STYLES.hasOwnProperty(prop);
}
function isSupportedTransformProp(prop) {
  return SUPPORTED_TRANSFORMS.hasOwnProperty(prop);
}
function isSupportedInterpolationParam(param) {
  return SUPPORTED_INTERPOLATION_PARAMS.hasOwnProperty(param);
}
function validateTransform(configs) {
  configs.forEach(config => {
    if (!isSupportedTransformProp(config.property)) {
      throw new Error("Property '" + config.property + "' is not supported by native animated module");
    }
  });
}
function validateStyles(styles) {
  for (var _key2 in styles) {
    if (!isSupportedStyleProp(_key2)) {
      throw new Error("Style property '" + _key2 + "' is not supported by native animated module");
    }
  }
}
function validateInterpolation(config) {
  for (var _key3 in config) {
    if (!isSupportedInterpolationParam(_key3)) {
      throw new Error("Interpolation property '" + _key3 + "' is not supported by native animated module");
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
  (0, _invariant.default)(NativeAnimatedModule, 'Native animated module is not available');
}
var _warnedMissingNativeAnimated = false;
function shouldUseNativeDriver(config) {
  if (config.useNativeDriver == null) {
    console.warn('Animated: `useNativeDriver` was not specified. This is a required ' + 'option and must be explicitly set to `true` or `false`');
  }
  if (config.useNativeDriver === true && !NativeAnimatedModule) {
    if (!_warnedMissingNativeAnimated) {
      console.warn('Animated: `useNativeDriver` is not supported because the native ' + 'animated module is missing. Falling back to JS-based animation. To ' + 'resolve this, add `RCTAnimation` module to this app, or remove ' + '`useNativeDriver`. ' + 'Make sure to run `bundle exec pod install` first. Read more about autolinking: https://github.com/react-native-community/cli/blob/master/docs/autolinking.md');
      _warnedMissingNativeAnimated = true;
    }
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
var _default = exports.default = {
  API,
  isSupportedColorStyleProp,
  isSupportedStyleProp,
  isSupportedTransformProp,
  isSupportedInterpolationParam,
  addWhitelistedStyleProp,
  addWhitelistedTransformProp,
  addWhitelistedInterpolationParam,
  validateStyles,
  validateTransform,
  validateInterpolation,
  generateNewNodeTag,
  generateNewAnimationId,
  assertNativeAnimatedModule,
  shouldUseNativeDriver,
  transformDataType,
  // $FlowExpectedError[unsafe-getters-setters] - unsafe getter lint suppresion
  // $FlowExpectedError[missing-type-arg] - unsafe getter lint suppresion
  get nativeEventEmitter() {
    if (!nativeEventEmitter) {
      nativeEventEmitter = new _NativeEventEmitter.default(
      // T88715063: NativeEventEmitter only used this parameter on iOS. Now it uses it on all platforms, so this code was modified automatically to preserve its behavior
      // If you want to use the native module on other platforms, please remove this condition and test its behavior
      _Platform.default.OS !== 'ios' ? null : NativeAnimatedModule);
    }
    return nativeEventEmitter;
  }
};