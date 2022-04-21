/**
 * @module ol/pointer/TouchSource
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Based on https://github.com/Polymer/PointerEvents
// Copyright (c) 2013 The Polymer Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
// * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
// * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
import { remove } from '../array.js';
import EventSource from './EventSource.js';
import { POINTER_ID } from './MouseSource.js';
/**
 * @type {number}
 */
var CLICK_COUNT_TIMEOUT = 200;
/**
 * @type {string}
 */
var POINTER_TYPE = 'touch';
/**
 * Handler for `touchstart`, triggers `pointerover`,
 * `pointerenter` and `pointerdown` events.
 *
 * @this {TouchSource}
 * @param {TouchEvent} inEvent The in event.
 */
function touchstart(inEvent) {
    this.vacuumTouches_(inEvent);
    this.setPrimaryTouch_(inEvent.changedTouches[0]);
    this.dedupSynthMouse_(inEvent);
    this.clickCount_++;
    this.processTouches_(inEvent, this.overDown_);
}
/**
 * Handler for `touchmove`.
 *
 * @this {TouchSource}
 * @param {TouchEvent} inEvent The in event.
 */
function touchmove(inEvent) {
    this.processTouches_(inEvent, this.moveOverOut_);
}
/**
 * Handler for `touchend`, triggers `pointerup`,
 * `pointerout` and `pointerleave` events.
 *
 * @this {TouchSource}
 * @param {TouchEvent} inEvent The event.
 */
function touchend(inEvent) {
    this.dedupSynthMouse_(inEvent);
    this.processTouches_(inEvent, this.upOut_);
}
/**
 * Handler for `touchcancel`, triggers `pointercancel`,
 * `pointerout` and `pointerleave` events.
 *
 * @this {TouchSource}
 * @param {TouchEvent} inEvent The in event.
 */
function touchcancel(inEvent) {
    this.processTouches_(inEvent, this.cancelOut_);
}
var TouchSource = /** @class */ (function (_super) {
    __extends(TouchSource, _super);
    /**
     * @param {import("./PointerEventHandler.js").default} dispatcher The event handler.
     * @param {import("./MouseSource.js").default} mouseSource Mouse source.
     */
    function TouchSource(dispatcher, mouseSource) {
        var _this = this;
        var mapping = {
            'touchstart': touchstart,
            'touchmove': touchmove,
            'touchend': touchend,
            'touchcancel': touchcancel
        };
        _this = _super.call(this, dispatcher, mapping) || this;
        /**
         * @const
         * @type {!Object<string, Event|Object>}
         */
        _this.pointerMap = dispatcher.pointerMap;
        /**
         * @const
         * @type {import("./MouseSource.js").default}
         */
        _this.mouseSource = mouseSource;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.firstTouchId_ = undefined;
        /**
         * @private
         * @type {number}
         */
        _this.clickCount_ = 0;
        /**
         * @private
         * @type {?}
         */
        _this.resetId_;
        /**
         * Mouse event timeout: This should be long enough to
         * ignore compat mouse events made by touch.
         * @private
         * @type {number}
         */
        _this.dedupTimeout_ = 2500;
        return _this;
    }
    /**
     * @private
     * @param {Touch} inTouch The in touch.
     * @return {boolean} True, if this is the primary touch.
     */
    TouchSource.prototype.isPrimaryTouch_ = function (inTouch) {
        return this.firstTouchId_ === inTouch.identifier;
    };
    /**
     * Set primary touch if there are no pointers, or the only pointer is the mouse.
     * @param {Touch} inTouch The in touch.
     * @private
     */
    TouchSource.prototype.setPrimaryTouch_ = function (inTouch) {
        var count = Object.keys(this.pointerMap).length;
        if (count === 0 || (count === 1 && POINTER_ID.toString() in this.pointerMap)) {
            this.firstTouchId_ = inTouch.identifier;
            this.cancelResetClickCount_();
        }
    };
    /**
     * @private
     * @param {PointerEvent} inPointer The in pointer object.
     */
    TouchSource.prototype.removePrimaryPointer_ = function (inPointer) {
        if (inPointer.isPrimary) {
            this.firstTouchId_ = undefined;
            this.resetClickCount_();
        }
    };
    /**
     * @private
     */
    TouchSource.prototype.resetClickCount_ = function () {
        this.resetId_ = setTimeout(this.resetClickCountHandler_.bind(this), CLICK_COUNT_TIMEOUT);
    };
    /**
     * @private
     */
    TouchSource.prototype.resetClickCountHandler_ = function () {
        this.clickCount_ = 0;
        this.resetId_ = undefined;
    };
    /**
     * @private
     */
    TouchSource.prototype.cancelResetClickCount_ = function () {
        if (this.resetId_ !== undefined) {
            clearTimeout(this.resetId_);
        }
    };
    /**
     * @private
     * @param {TouchEvent} browserEvent Browser event
     * @param {Touch} inTouch Touch event
     * @return {PointerEvent} A pointer object.
     */
    TouchSource.prototype.touchToPointer_ = function (browserEvent, inTouch) {
        var e = this.dispatcher.cloneEvent(browserEvent, inTouch);
        // Spec specifies that pointerId 1 is reserved for Mouse.
        // Touch identifiers can start at 0.
        // Add 2 to the touch identifier for compatibility.
        e.pointerId = inTouch.identifier + 2;
        // TODO: check if this is necessary?
        //e.target = findTarget(e);
        e.bubbles = true;
        e.cancelable = true;
        e.detail = this.clickCount_;
        e.button = 0;
        e.buttons = 1;
        e.width = inTouch.radiusX || 0;
        e.height = inTouch.radiusY || 0;
        e.pressure = inTouch.force || 0.5;
        e.isPrimary = this.isPrimaryTouch_(inTouch);
        e.pointerType = POINTER_TYPE;
        // make sure that the properties that are different for
        // each `Touch` object are not copied from the BrowserEvent object
        e.clientX = inTouch.clientX;
        e.clientY = inTouch.clientY;
        e.screenX = inTouch.screenX;
        e.screenY = inTouch.screenY;
        return e;
    };
    /**
     * @private
     * @param {TouchEvent} inEvent Touch event
     * @param {function(TouchEvent, PointerEvent): void} inFunction In function.
     */
    TouchSource.prototype.processTouches_ = function (inEvent, inFunction) {
        var touches = Array.prototype.slice.call(inEvent.changedTouches);
        var count = touches.length;
        function preventDefault() {
            inEvent.preventDefault();
        }
        for (var i = 0; i < count; ++i) {
            var pointer = this.touchToPointer_(inEvent, touches[i]);
            // forward touch preventDefaults
            pointer.preventDefault = preventDefault;
            inFunction.call(this, inEvent, pointer);
        }
    };
    /**
     * @private
     * @param {TouchList} touchList The touch list.
     * @param {number} searchId Search identifier.
     * @return {boolean} True, if the `Touch` with the given id is in the list.
     */
    TouchSource.prototype.findTouch_ = function (touchList, searchId) {
        var l = touchList.length;
        for (var i = 0; i < l; i++) {
            var touch = touchList[i];
            if (touch.identifier === searchId) {
                return true;
            }
        }
        return false;
    };
    /**
     * In some instances, a touchstart can happen without a touchend. This
     * leaves the pointermap in a broken state.
     * Therefore, on every touchstart, we remove the touches that did not fire a
     * touchend event.
     * To keep state globally consistent, we fire a pointercancel for
     * this "abandoned" touch
     *
     * @private
     * @param {TouchEvent} inEvent The in event.
     */
    TouchSource.prototype.vacuumTouches_ = function (inEvent) {
        var touchList = inEvent.touches;
        // pointerMap.getCount() should be < touchList.length here,
        // as the touchstart has not been processed yet.
        var keys = Object.keys(this.pointerMap);
        var count = keys.length;
        if (count >= touchList.length) {
            var d = [];
            for (var i = 0; i < count; ++i) {
                var key = Number(keys[i]);
                var value = this.pointerMap[key];
                // Never remove pointerId == 1, which is mouse.
                // Touch identifiers are 2 smaller than their pointerId, which is the
                // index in pointermap.
                if (key != POINTER_ID && !this.findTouch_(touchList, key - 2)) {
                    d.push(value.out);
                }
            }
            for (var i = 0; i < d.length; ++i) {
                this.cancelOut_(inEvent, d[i]);
            }
        }
    };
    /**
     * @private
     * @param {TouchEvent} browserEvent The event.
     * @param {PointerEvent} inPointer The in pointer object.
     */
    TouchSource.prototype.overDown_ = function (browserEvent, inPointer) {
        this.pointerMap[inPointer.pointerId] = {
            target: inPointer.target,
            out: inPointer,
            outTarget: inPointer.target
        };
        this.dispatcher.over(inPointer, browserEvent);
        this.dispatcher.enter(inPointer, browserEvent);
        this.dispatcher.down(inPointer, browserEvent);
    };
    /**
     * @private
     * @param {TouchEvent} browserEvent The event.
     * @param {PointerEvent} inPointer The in pointer.
     */
    TouchSource.prototype.moveOverOut_ = function (browserEvent, inPointer) {
        var event = inPointer;
        var pointer = this.pointerMap[event.pointerId];
        // a finger drifted off the screen, ignore it
        if (!pointer) {
            return;
        }
        var outEvent = pointer.out;
        var outTarget = pointer.outTarget;
        this.dispatcher.move(event, browserEvent);
        if (outEvent && outTarget !== event.target) {
            outEvent.relatedTarget = event.target;
            /** @type {Object} */ (event).relatedTarget = outTarget;
            // recover from retargeting by shadow
            outEvent.target = outTarget;
            if (event.target) {
                this.dispatcher.leaveOut(outEvent, browserEvent);
                this.dispatcher.enterOver(event, browserEvent);
            }
            else {
                // clean up case when finger leaves the screen
                /** @type {Object} */ (event).target = outTarget;
                /** @type {Object} */ (event).relatedTarget = null;
                this.cancelOut_(browserEvent, event);
            }
        }
        pointer.out = event;
        pointer.outTarget = event.target;
    };
    /**
     * @private
     * @param {TouchEvent} browserEvent An event.
     * @param {PointerEvent} inPointer The inPointer object.
     */
    TouchSource.prototype.upOut_ = function (browserEvent, inPointer) {
        this.dispatcher.up(inPointer, browserEvent);
        this.dispatcher.out(inPointer, browserEvent);
        this.dispatcher.leave(inPointer, browserEvent);
        this.cleanUpPointer_(inPointer);
    };
    /**
     * @private
     * @param {TouchEvent} browserEvent The event.
     * @param {PointerEvent} inPointer The in pointer.
     */
    TouchSource.prototype.cancelOut_ = function (browserEvent, inPointer) {
        this.dispatcher.cancel(inPointer, browserEvent);
        this.dispatcher.out(inPointer, browserEvent);
        this.dispatcher.leave(inPointer, browserEvent);
        this.cleanUpPointer_(inPointer);
    };
    /**
     * @private
     * @param {PointerEvent} inPointer The inPointer object.
     */
    TouchSource.prototype.cleanUpPointer_ = function (inPointer) {
        delete this.pointerMap[inPointer.pointerId];
        this.removePrimaryPointer_(inPointer);
    };
    /**
     * Prevent synth mouse events from creating pointer events.
     *
     * @private
     * @param {TouchEvent} inEvent The in event.
     */
    TouchSource.prototype.dedupSynthMouse_ = function (inEvent) {
        var lts = this.mouseSource.lastTouches;
        var t = inEvent.changedTouches[0];
        // only the primary finger will synth mouse events
        if (this.isPrimaryTouch_(t)) {
            // remember x/y of last touch
            var lt_1 = [t.clientX, t.clientY];
            lts.push(lt_1);
            setTimeout(function () {
                // remove touch after timeout
                remove(lts, lt_1);
            }, this.dedupTimeout_);
        }
    };
    return TouchSource;
}(EventSource));
export default TouchSource;
//# sourceMappingURL=TouchSource.js.map