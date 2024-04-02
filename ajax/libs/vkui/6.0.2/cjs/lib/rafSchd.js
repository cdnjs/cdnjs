/**
 * https://github.com/alexreardon/raf-schd
 *
 * Copyright (c) 2021 Alex Reardon
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "rafSchd", {
    enumerable: true,
    get: function() {
        return rafSchd;
    }
});
const rafSchd = (fn)=>{
    let lastArgs = [];
    let frameId = null;
    const wrapperFn = (...args)=>{
        // Always capture the latest value
        lastArgs = args;
        // There is already a frame queued
        if (frameId) {
            return;
        }
        // Schedule a new frame
        frameId = requestAnimationFrame(()=>{
            frameId = null;
            fn(...lastArgs);
        });
    };
    // Adding cancel property to result function
    wrapperFn.cancel = ()=>{
        if (!frameId) {
            return;
        }
        cancelAnimationFrame(frameId);
        frameId = null;
    };
    return wrapperFn;
};

//# sourceMappingURL=rafSchd.js.map