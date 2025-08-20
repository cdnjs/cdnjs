/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));
var startNativeAnimationNextId = 1;

// Important note: start() and stop() will only be called at most once.
// Once an animation has been stopped or finished its course, it will
// not be reused.
class Animation {
  start(fromValue, onUpdate, onEnd, previousAnimation, animatedValue) {}
  stop() {
    if (this.__nativeId) {
      _NativeAnimatedHelper.default.API.stopAnimation(this.__nativeId);
    }
  }
  __getNativeAnimationConfig() {
    // Subclasses that have corresponding animation implementation done in native
    // should override this method
    throw new Error('This animation type cannot be offloaded to native');
  }
  // Helper function for subclasses to make sure onEnd is only called once.
  __debouncedOnEnd(result) {
    var onEnd = this.__onEnd;
    this.__onEnd = null;
    onEnd && onEnd(result);
  }
  __startNativeAnimation(animatedValue) {
    var startNativeAnimationWaitId = startNativeAnimationNextId + ":startAnimation";
    startNativeAnimationNextId += 1;
    _NativeAnimatedHelper.default.API.setWaitingForIdentifier(startNativeAnimationWaitId);
    try {
      var config = this.__getNativeAnimationConfig();
      animatedValue.__makeNative(config.platformConfig);
      this.__nativeId = _NativeAnimatedHelper.default.generateNewAnimationId();
      _NativeAnimatedHelper.default.API.startAnimatingNode(this.__nativeId, animatedValue.__getNativeTag(), config,
      // $FlowFixMe[method-unbinding] added when improving typing for this parameters
      this.__debouncedOnEnd.bind(this));
    } catch (e) {
      throw e;
    } finally {
      _NativeAnimatedHelper.default.API.unsetWaitingForIdentifier(startNativeAnimationWaitId);
    }
  }
}
var _default = exports.default = Animation;
module.exports = exports.default;