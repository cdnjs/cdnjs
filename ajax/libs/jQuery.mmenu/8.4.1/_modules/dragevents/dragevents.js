import * as support from './_support';
import * as options from './_defaults';
import * as settings from './_settings';
import { percentage2number } from './_helpers';
import { extend } from '../helpers';
var DragEvents = /** @class */ (function () {
    /**
     * Create the gestures.
     * @param {HTMLElement} surface     The surface for the gesture.
     * @param {object}      area        Restriction where on the surface the gesture can be started.
     * @param {object}      treshold    Treshold for the gestures.
     */
    function DragEvents(surface, area, treshold) {
        this.surface = surface;
        this.area = extend(area, options.area);
        this.treshold = extend(treshold, options.treshold);
        //	Set the mouse/touch events.
        this.surface.addEventListener(support.touch ? 'touchstart' : 'mousedown', this.start.bind(this));
        this.surface.addEventListener(support.touch ? 'touchend' : 'mouseup', this.stop.bind(this));
        this.surface.addEventListener(support.touch ? 'touchleave' : 'mouseleave', this.stop.bind(this));
        this.surface.addEventListener(support.touch ? 'touchmove' : 'mousemove', this.move.bind(this));
    }
    /**
     * Starting the touch gesture.
     */
    DragEvents.prototype.start = function (event) {
        /** The widht of the surface. */
        var width = this.surface.clientWidth;
        /** The height of the surface. */
        var height = this.surface.clientHeight;
        //  Check if the gesture started below the area.top.
        var top = percentage2number(this.area.top, height);
        if (typeof top == 'number') {
            if (event.pageY < top) {
                return;
            }
        }
        //  Check if the gesture started before the area.right.
        var right = percentage2number(this.area.right, width);
        if (typeof right == 'number') {
            right = width - right;
            if (event.pageX > right) {
                return;
            }
        }
        //  Check if the gesture started above the area.bottom.
        var bottom = percentage2number(this.area.bottom, height);
        if (typeof bottom == 'number') {
            bottom = height - bottom;
            if (event.pageY > bottom) {
                return;
            }
        }
        //  Check if the gesture started after the area.left.
        var left = percentage2number(this.area.left, width);
        if (typeof left == 'number') {
            if (event.pageX < left) {
                return;
            }
        }
        //	Store the start x- and y-position.
        this.startPosition = {
            x: event.pageX,
            y: event.pageY
        };
        //	Set the state of the gesture to "watching".
        this.state = settings.state.watching;
    };
    /**
     * Stopping the touch gesture.
     */
    DragEvents.prototype.stop = function (event) {
        //	Dispatch the "dragEnd" events.
        if (this.state == settings.state.dragging) {
            /** The event information. */
            var detail = this._eventDetail();
            /** The direction. */
            var dragDirection = this._dragDirection();
            this._dispatchEvents('drag*End', detail, dragDirection);
            //	Dispatch the "swipe" events.
            if (Math.abs(this.movement[this.axis]) > this.treshold.swipe) {
                /** The direction. */
                var swipeDirection = this._swipeDirection();
                this._dispatchEvents('swipe*', detail, swipeDirection);
            }
        }
        //	Set the state of the gesture to "inactive".
        this.state = settings.state.inactive;
    };
    /**
     * Doing the touch gesture.
     */
    DragEvents.prototype.move = function (event) {
        switch (this.state) {
            case settings.state.watching:
            case settings.state.dragging:
                this.movement = {
                    x: event.movementX,
                    y: event.movementY
                };
                this.distance = {
                    x: event.pageX - this.startPosition.x,
                    y: event.pageY - this.startPosition.y
                };
                this.axis =
                    Math.abs(this.distance.x) > Math.abs(this.distance.y)
                        ? 'x'
                        : 'y';
                /** The event information. */
                var detail = this._eventDetail();
                /** The direction. */
                var dragDirection = this._dragDirection();
                //	Watching for the gesture to go past the treshold.
                if (this.state == settings.state.watching) {
                    if (Math.abs(this.distance[this.axis]) > this.treshold.start) {
                        this._dispatchEvents('drag*Start', detail, dragDirection);
                        //	Set the state of the gesture to "inactive".
                        this.state = settings.state.dragging;
                    }
                }
                //	Dispatch the "drag" events.
                if (this.state == settings.state.dragging) {
                    this._dispatchEvents('drag*Move', detail, dragDirection);
                }
                break;
        }
    };
    /**
     * Get the event details.
     * @return {bject} The event details.
     */
    DragEvents.prototype._eventDetail = function () {
        return {
            movementX: this.movement.x,
            movementY: this.movement.y,
            distanceX: this.distance.x - (this.axis == 'x' ? this.treshold.start : 0),
            distanceY: this.distance.y - (this.axis == 'y' ? this.treshold.start : 0)
        };
    };
    /**
     * Dispatch the events
     * @param {string} eventName    The name for the events to dispatch.
     * @param {object} detail       The event details.
     * @param {string} dir          The direction of the gesture.
     */
    DragEvents.prototype._dispatchEvents = function (eventName, detail, dir) {
        /** General event, e.g. "drag" */
        var event = new CustomEvent(eventName.replace('*', ''), { detail: detail });
        this.surface.dispatchEvent(event);
        /** Axis event, e.g. "dragX" */
        var axis = new CustomEvent(eventName.replace('*', this.axis.toUpperCase()), { detail: detail });
        this.surface.dispatchEvent(axis);
        /** Direction event, e.g. "dragLeft" */
        var direction = new CustomEvent(eventName.replace('*', dir), {
            detail: detail
        });
        this.surface.dispatchEvent(direction);
    };
    DragEvents.prototype._dragDirection = function () {
        return settings.directionNames[this.axis][this.distance[this.axis] > 0 ? 0 : 1];
    };
    DragEvents.prototype._swipeDirection = function () {
        return settings.directionNames[this.axis][this.movement[this.axis] > 0 ? 0 : 1];
    };
    return DragEvents;
}());
export default DragEvents;
