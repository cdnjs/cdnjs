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
        if (!this.surface['mmHasDragEvents']) {
            this.surface.addEventListener(support.touch ? 'touchstart' : 'mousedown', this.start.bind(this));
            this.surface.addEventListener(support.touch ? 'touchend' : 'mouseup', this.stop.bind(this));
            this.surface.addEventListener(support.touch ? 'touchleave' : 'mouseleave', this.stop.bind(this));
            this.surface.addEventListener(support.touch ? 'touchmove' : 'mousemove', this.move.bind(this));
        }
        this.surface['mmHasDragEvents'] = true;
    }
    /**
     * Starting the touch gesture.
     * @param {Event} event The touch event.
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
     * @param {Event} event The touch event.
     */
    DragEvents.prototype.stop = function (event) {
        //	Dispatch the "dragEnd" events.
        if (this.state == settings.state.dragging) {
            /** The direction. */
            var dragDirection = this._dragDirection();
            /** The event information. */
            var detail = this._eventDetail(dragDirection);
            this._dispatchEvents('drag*End', detail);
            //	Dispatch the "swipe" events.
            if (Math.abs(this.movement[this.axis]) > this.treshold.swipe) {
                /** The direction. */
                var swipeDirection = this._swipeDirection();
                detail.direction = swipeDirection;
                this._dispatchEvents('swipe*', detail);
            }
        }
        //	Set the state of the gesture to "inactive".
        this.state = settings.state.inactive;
    };
    /**
     * Doing the touch gesture.
     * @param {Event} event The touch event.
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
                /** The direction. */
                var dragDirection = this._dragDirection();
                /** The event information. */
                var detail = this._eventDetail(dragDirection);
                //	Watching for the gesture to go past the treshold.
                if (this.state == settings.state.watching) {
                    if (Math.abs(this.distance[this.axis]) > this.treshold.start) {
                        this._dispatchEvents('drag*Start', detail);
                        //	Set the state of the gesture to "inactive".
                        this.state = settings.state.dragging;
                    }
                }
                //	Dispatch the "drag" events.
                if (this.state == settings.state.dragging) {
                    this._dispatchEvents('drag*Move', detail);
                }
                break;
        }
    };
    /**
     * Get the event details.
     * @param {string}  direction   Direction for the event (up, right, down, left).
     * @return {object}             The event details.
     */
    DragEvents.prototype._eventDetail = function (direction) {
        var distX = this.distance.x;
        var distY = this.distance.y;
        if (this.axis == 'x') {
            distX -= distX > 0 ? this.treshold.start : 0 - this.treshold.start;
        }
        if (this.axis == 'y') {
            distY -= distY > 0 ? this.treshold.start : 0 - this.treshold.start;
        }
        return {
            axis: this.axis,
            direction: direction,
            movementX: this.movement.x,
            movementY: this.movement.y,
            distanceX: distX,
            distanceY: distY
        };
    };
    /**
     * Dispatch the events
     * @param {string} eventName    The name for the events to dispatch.
     * @param {object} detail       The event details.
     */
    DragEvents.prototype._dispatchEvents = function (eventName, detail) {
        /** General event, e.g. "drag" */
        var event = new CustomEvent(eventName.replace('*', ''), { detail: detail });
        this.surface.dispatchEvent(event);
        /** Axis event, e.g. "dragX" */
        var axis = new CustomEvent(eventName.replace('*', this.axis.toUpperCase()), { detail: detail });
        this.surface.dispatchEvent(axis);
        /** Direction event, e.g. "dragLeft" */
        var direction = new CustomEvent(eventName.replace('*', detail.direction), {
            detail: detail
        });
        this.surface.dispatchEvent(direction);
    };
    /**
     * Get the dragging direction.
     * @return {string} The direction in which the user is dragging.
     */
    DragEvents.prototype._dragDirection = function () {
        return settings.directionNames[this.axis][this.distance[this.axis] > 0 ? 0 : 1];
    };
    /**
     * Get the dragging direction.
     * @return {string} The direction in which the user is dragging.
     */
    DragEvents.prototype._swipeDirection = function () {
        return settings.directionNames[this.axis][this.movement[this.axis] > 0 ? 0 : 1];
    };
    return DragEvents;
}());
export default DragEvents;
