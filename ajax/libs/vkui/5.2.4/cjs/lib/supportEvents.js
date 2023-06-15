"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transitionEvent = exports.animationEvent = void 0;
var _dom = require("./dom");
var _testing = require("./testing");
var animationEvent = {
  supported: false
};
exports.animationEvent = animationEvent;
var transitionEvent = {
  supported: false,
  name: null
};
exports.transitionEvent = transitionEvent;
if (_dom.canUseDOM && !_testing.isTesting) {
  if (typeof AnimationEvent !== 'undefined') {
    animationEvent.supported = true;
  } else if (typeof WebKitAnimationEvent !== 'undefined') {
    animationEvent.supported = true;
  }
  if (typeof TransitionEvent !== 'undefined') {
    transitionEvent.supported = true;
    transitionEvent.name = 'transitionend';
  } else if (typeof WebKitTransitionEvent !== 'undefined') {
    transitionEvent.supported = true;
    transitionEvent.name = 'webkitTransitionEnd';
  }
}
//# sourceMappingURL=supportEvents.js.map