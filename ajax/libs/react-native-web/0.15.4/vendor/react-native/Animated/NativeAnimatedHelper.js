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

import NativeEventEmitter from '../NativeEventEmitter';
import NativeAnimatedModule from './NativeAnimatedModule';
import invariant from 'fbjs/lib/invariant';
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
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    queueConnections = false;

    for (var q = 0, l = queue.length; q < l; q++) {
      var args = queue[q];
      NativeAnimatedModule.connectAnimatedNodes(args[0], args[1]);
    }

    queue.length = 0;
  },
  createAnimatedNode: function createAnimatedNode(tag, config) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.createAnimatedNode(tag, config);
  },
  startListeningToAnimatedNodeValue: function startListeningToAnimatedNodeValue(tag) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.startListeningToAnimatedNodeValue(tag);
  },
  stopListeningToAnimatedNodeValue: function stopListeningToAnimatedNodeValue(tag) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.stopListeningToAnimatedNodeValue(tag);
  },
  connectAnimatedNodes: function connectAnimatedNodes(parentTag, childTag) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');

    if (queueConnections) {
      queue.push([parentTag, childTag]);
      return;
    }

    NativeAnimatedModule.connectAnimatedNodes(parentTag, childTag);
  },
  disconnectAnimatedNodes: function disconnectAnimatedNodes(parentTag, childTag) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.disconnectAnimatedNodes(parentTag, childTag);
  },
  startAnimatingNode: function startAnimatingNode(animationId, nodeTag, config, endCallback) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.startAnimatingNode(animationId, nodeTag, config, endCallback);
  },
  stopAnimation: function stopAnimation(animationId) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.stopAnimation(animationId);
  },
  setAnimatedNodeValue: function setAnimatedNodeValue(nodeTag, value) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.setAnimatedNodeValue(nodeTag, value);
  },
  setAnimatedNodeOffset: function setAnimatedNodeOffset(nodeTag, offset) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.setAnimatedNodeOffset(nodeTag, offset);
  },
  flattenAnimatedNodeOffset: function flattenAnimatedNodeOffset(nodeTag) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.flattenAnimatedNodeOffset(nodeTag);
  },
  extractAnimatedNodeOffset: function extractAnimatedNodeOffset(nodeTag) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.extractAnimatedNodeOffset(nodeTag);
  },
  connectAnimatedNodeToView: function connectAnimatedNodeToView(nodeTag, viewTag) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.connectAnimatedNodeToView(nodeTag, viewTag);
  },
  disconnectAnimatedNodeFromView: function disconnectAnimatedNodeFromView(nodeTag, viewTag) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.disconnectAnimatedNodeFromView(nodeTag, viewTag);
  },
  dropAnimatedNode: function dropAnimatedNode(tag) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.dropAnimatedNode(tag);
  },
  addAnimatedEventToView: function addAnimatedEventToView(viewTag, eventName, eventMapping) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.addAnimatedEventToView(viewTag, eventName, eventMapping);
  },
  removeAnimatedEventFromView: function removeAnimatedEventFromView(viewTag, eventName, animatedNodeTag) {
    invariant(NativeAnimatedModule, 'Native animated module is not available');
    NativeAnimatedModule.removeAnimatedEventFromView(viewTag, eventName, animatedNodeTag);
  }
};
/**
 * Styles allowed by the native animated implementation.
 *
 * In general native animated implementation should support any numeric property that doesn't need
 * to be updated through the shadow view hierarchy (all non-layout properties).
 */

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
  invariant(NativeAnimatedModule, 'Native animated module is not available');
}

function shouldUseNativeDriver(config) {
  if (config.useNativeDriver === true && !NativeAnimatedModule) {
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
      nativeEventEmitter = new NativeEventEmitter(NativeAnimatedModule);
    }

    return nativeEventEmitter;
  }

};
export { API, addWhitelistedStyleProp, addWhitelistedTransformProp, addWhitelistedInterpolationParam, validateStyles, validateTransform, validateInterpolation, generateNewNodeTag, generateNewAnimationId, assertNativeAnimatedModule, shouldUseNativeDriver, transformDataType };
export default NativeAnimatedHelper;