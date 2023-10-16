"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.standardEasingFunctions = exports.setBezierFunction = exports.Scene = exports.interpolate = exports.tween = exports.Tweenable = exports.shouldScheduleUpdate = exports.processTweens = void 0;
const tweenable_1 = require("./tweenable");
Object.defineProperty(exports, "processTweens", { enumerable: true, get: function () { return tweenable_1.processTweens; } });
Object.defineProperty(exports, "shouldScheduleUpdate", { enumerable: true, get: function () { return tweenable_1.shouldScheduleUpdate; } });
Object.defineProperty(exports, "Tweenable", { enumerable: true, get: function () { return tweenable_1.Tweenable; } });
Object.defineProperty(exports, "tween", { enumerable: true, get: function () { return tweenable_1.tween; } });
var interpolate_1 = require("./interpolate");
Object.defineProperty(exports, "interpolate", { enumerable: true, get: function () { return interpolate_1.interpolate; } });
var scene_1 = require("./scene");
Object.defineProperty(exports, "Scene", { enumerable: true, get: function () { return scene_1.Scene; } });
var bezier_1 = require("./bezier");
Object.defineProperty(exports, "setBezierFunction", { enumerable: true, get: function () { return bezier_1.setBezierFunction; } });
var standard_easing_functions_1 = require("./standard-easing-functions");
Object.defineProperty(exports, "standardEasingFunctions", { enumerable: true, get: function () { return standard_easing_functions_1.standardEasingFunctions; } });
__exportStar(require("./types"), exports);
/**
 * The NPM package version of Shifty.
 */
exports.VERSION = String(process.env.PACKAGE_VERSION);
