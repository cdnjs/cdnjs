"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEasingKey = void 0;
const tweenable_1 = require("./tweenable");
/**
 * Determines whether or not a given string represents a defined easing curve
 * on {@link Tweenable.easing}. This also supports custom easing functions.
 */
const isEasingKey = (key) => {
    return key in tweenable_1.Tweenable.easing;
};
exports.isEasingKey = isEasingKey;
