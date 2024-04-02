"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    animationEvent: function() {
        return animationEvent;
    },
    transitionEvent: function() {
        return transitionEvent;
    }
});
const _dom = require("./dom");
const _testing = require("./testing");
const animationEvent = {
    supported: false
};
const transitionEvent = {
    supported: false,
    name: null
};
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