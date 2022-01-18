import { canUseDOM } from "./dom";
import { isTesting } from "./testing";
var animationEvent = {
  supported: false,
  name: null
};
var transitionEvent = {
  supported: false,
  name: null
};

if (canUseDOM && !isTesting) {
  if (typeof AnimationEvent !== 'undefined') {
    animationEvent.supported = true;
    animationEvent.name = 'animationend';
  } else if (typeof WebKitAnimationEvent !== 'undefined') {
    animationEvent.supported = true;
    animationEvent.name = 'webkitAnimationEnd';
  }

  if (typeof TransitionEvent !== 'undefined') {
    transitionEvent.supported = true;
    transitionEvent.name = 'transitionend';
  } else if (typeof WebKitTransitionEvent !== 'undefined') {
    transitionEvent.supported = true;
    transitionEvent.name = 'webkitTransitionEnd';
  }
}

export { animationEvent, transitionEvent };
//# sourceMappingURL=supportEvents.js.map