/**
 * https://github.com/alexreardon/raf-schd
 *
 * Copyright (c) 2021 Alex Reardon
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
export var rafSchd = function(fn) {
    var lastArgs = [];
    var frameId = null;
    var wrapperFn = function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        // Always capture the latest value
        lastArgs = args;
        // There is already a frame queued
        if (frameId) {
            return;
        }
        // Schedule a new frame
        frameId = requestAnimationFrame(function() {
            frameId = null;
            fn.apply(void 0, _to_consumable_array(lastArgs));
        });
    };
    // Adding cancel property to result function
    wrapperFn.cancel = function() {
        if (!frameId) {
            return;
        }
        cancelAnimationFrame(frameId);
        frameId = null;
    };
    return wrapperFn;
};

//# sourceMappingURL=rafSchd.js.map