/**
 * A collection of low-level async operation stuff.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import * as $array from "./Array";
var pendingFrame = false;
var nextQueue = [];
var readQueue = [];
var writeQueue = [];
var idleQueue = [];
var fps = 1000 / 60;
/**
 * [raf description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export var raf = (typeof requestAnimationFrame === "function"
    ? function (fn) {
        requestAnimationFrame(fn);
    }
    : function (fn) {
        setTimeout(fn, fps);
    });
/**
 * [frameLoop description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
function frameLoop() {
    var now = Date.now();
    var length = nextQueue.length;
    for (var i = 0; i < length; ++i) {
        nextQueue[i](now);
    }
    $array.shiftLeft(nextQueue, length);
    for (var i = 0; i < readQueue.length; ++i) {
        readQueue[i](now);
    }
    readQueue.length = 0;
    for (var i = 0; i < writeQueue.length; ++i) {
        writeQueue[i](now);
    }
    writeQueue.length = 0;
    if (nextQueue.length === 0 && readQueue.length === 0) {
        pendingFrame = false;
    }
    else {
        raf(frameLoop);
    }
}
/**
 * [pendFrame description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
function pendFrame() {
    if (!pendingFrame) {
        pendingFrame = true;
        raf(frameLoop);
    }
}
/**
 * [nextFrame description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param fn [description]
 */
export function nextFrame(fn) {
    nextQueue.push(fn);
    pendFrame();
}
/**
 * [readFrame description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param fn [description]
 */
export function readFrame(fn) {
    readQueue.push(fn);
    pendFrame();
}
/**
 * [writeFrame description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param fn [description]
 */
export function writeFrame(fn) {
    writeQueue.push(fn);
    pendFrame();
}
/**
 * [whenIdle description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param fn [description]
 */
export function whenIdle(fn) {
    idleQueue.push(fn);
}
/**
 * [triggerIdle description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @todo Maybe don't trigger a callback which was added while in the middle of triggering?
 */
export function triggerIdle() {
    var now = Date.now();
    var length = idleQueue.length;
    for (var i = 0; i < length; ++i) {
        idleQueue.shift()(now);
    }
}
//# sourceMappingURL=AsyncPending.js.map