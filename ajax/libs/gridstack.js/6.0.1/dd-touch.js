"use strict";
/**
 * touch.ts 6.0.1
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointerleave = exports.pointerenter = exports.pointerdown = exports.touchend = exports.touchmove = exports.touchstart = exports.isTouch = void 0;
const dd_manager_1 = require("./dd-manager");
/**
 * Detect touch support - Windows Surface devices and other touch devices
 * should we use this instead ? (what we had for always showing resize handles)
 * /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
 */
exports.isTouch = ('ontouchstart' in document
    || 'ontouchstart' in window
    // || !!window.TouchEvent // true on Windows 10 Chrome desktop so don't use this
    || (window.DocumentTouch && document instanceof window.DocumentTouch)
    || navigator.maxTouchPoints > 0
    || navigator.msMaxTouchPoints > 0);
// interface TouchCoord {x: number, y: number};
class DDTouch {
}
/**
* Get the x,y position of a touch event
*/
// function getTouchCoords(e: TouchEvent): TouchCoord {
//   return {
//     x: e.changedTouches[0].pageX,
//     y: e.changedTouches[0].pageY
//   };
// }
/**
 * Simulate a mouse event based on a corresponding touch event
 * @param {Object} e A touch event
 * @param {String} simulatedType The corresponding mouse event
 */
function simulateMouseEvent(e, simulatedType) {
    // Ignore multi-touch events
    if (e.touches.length > 1)
        return;
    // Prevent "Ignored attempt to cancel a touchmove event with cancelable=false" errors
    if (e.cancelable)
        e.preventDefault();
    const touch = e.changedTouches[0], simulatedEvent = document.createEvent('MouseEvents');
    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(simulatedType, // type
    true, // bubbles
    true, // cancelable
    window, // view
    1, // detail
    touch.screenX, // screenX
    touch.screenY, // screenY
    touch.clientX, // clientX
    touch.clientY, // clientY
    false, // ctrlKey
    false, // altKey
    false, // shiftKey
    false, // metaKey
    0, // button
    null // relatedTarget
    );
    // Dispatch the simulated event to the target element
    e.target.dispatchEvent(simulatedEvent);
}
/**
 * Simulate a mouse event based on a corresponding Pointer event
 * @param {Object} e A pointer event
 * @param {String} simulatedType The corresponding mouse event
 */
function simulatePointerMouseEvent(e, simulatedType) {
    // Prevent "Ignored attempt to cancel a touchmove event with cancelable=false" errors
    if (e.cancelable)
        e.preventDefault();
    const simulatedEvent = document.createEvent('MouseEvents');
    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(simulatedType, // type
    true, // bubbles
    true, // cancelable
    window, // view
    1, // detail
    e.screenX, // screenX
    e.screenY, // screenY
    e.clientX, // clientX
    e.clientY, // clientY
    false, // ctrlKey
    false, // altKey
    false, // shiftKey
    false, // metaKey
    0, // button
    null // relatedTarget
    );
    // Dispatch the simulated event to the target element
    e.target.dispatchEvent(simulatedEvent);
}
/**
 * Handle the touchstart events
 * @param {Object} e The widget element's touchstart event
 */
function touchstart(e) {
    // Ignore the event if another widget is already being handled
    if (DDTouch.touchHandled)
        return;
    DDTouch.touchHandled = true;
    // Simulate the mouse events
    // simulateMouseEvent(e, 'mouseover');
    // simulateMouseEvent(e, 'mousemove');
    simulateMouseEvent(e, 'mousedown');
}
exports.touchstart = touchstart;
/**
 * Handle the touchmove events
 * @param {Object} e The document's touchmove event
 */
function touchmove(e) {
    // Ignore event if not handled by us
    if (!DDTouch.touchHandled)
        return;
    simulateMouseEvent(e, 'mousemove');
}
exports.touchmove = touchmove;
/**
 * Handle the touchend events
 * @param {Object} e The document's touchend event
 */
function touchend(e) {
    // Ignore event if not handled
    if (!DDTouch.touchHandled)
        return;
    // cancel delayed leave event when we release on ourself which happens BEFORE we get this!
    if (DDTouch.pointerLeaveTimeout) {
        window.clearTimeout(DDTouch.pointerLeaveTimeout);
        delete DDTouch.pointerLeaveTimeout;
    }
    const wasDragging = !!dd_manager_1.DDManager.dragElement;
    // Simulate the mouseup event
    simulateMouseEvent(e, 'mouseup');
    // simulateMouseEvent(event, 'mouseout');
    // If the touch interaction did not move, it should trigger a click
    if (!wasDragging) {
        simulateMouseEvent(e, 'click');
    }
    // Unset the flag to allow other widgets to inherit the touch event
    DDTouch.touchHandled = false;
}
exports.touchend = touchend;
/**
 * Note we don't get touchenter/touchleave (which are deprecated)
 * see https://stackoverflow.com/questions/27908339/js-touch-equivalent-for-mouseenter
 * so instead of PointerEvent to still get enter/leave and send the matching mouse event.
 */
function pointerdown(e) {
    e.target.releasePointerCapture(e.pointerId); // <- Important!
}
exports.pointerdown = pointerdown;
function pointerenter(e) {
    // ignore the initial one we get on pointerdown on ourself
    if (!dd_manager_1.DDManager.dragElement) {
        // console.log('pointerenter ignored');
        return;
    }
    // console.log('pointerenter');
    simulatePointerMouseEvent(e, 'mouseenter');
}
exports.pointerenter = pointerenter;
function pointerleave(e) {
    // ignore the leave on ourself we get before releasing the mouse over ourself
    // by delaying sending the event and having the up event cancel us
    if (!dd_manager_1.DDManager.dragElement) {
        // console.log('pointerleave ignored');
        return;
    }
    DDTouch.pointerLeaveTimeout = window.setTimeout(() => {
        delete DDTouch.pointerLeaveTimeout;
        // console.log('pointerleave delayed');
        simulatePointerMouseEvent(e, 'mouseleave');
    }, 10);
}
exports.pointerleave = pointerleave;
//# sourceMappingURL=dd-touch.js.map