import { touch } from './support';
var DragEngine = /** @class */ (function () {
    function DragEngine(surface, area) {
        this.surface = surface;
        this.area = area;
        //	Set the mouse/touch events.
        this.surface.addEventListener(touch ? 'touchstart' : 'mousedown', this.start.bind(this));
        this.surface.addEventListener(touch ? 'touchend' : 'mouseup', this.stop.bind(this));
        this.surface.addEventListener(touch ? 'touchleave' : 'mouseleave', this.stop.bind(this));
        this.surface.addEventListener(touch ? 'touchmove' : 'mousemove', this.move.bind(this));
    }
    /**
     * Starting the touch gesture.
     */
    DragEngine.prototype.start = function (event) {
        var passed = 0;
        var width = this.surface.clientWidth;
        var height = this.surface.clientHeight;
        //  Check if the gesture started below the area.top.
        var top = this._getArea(this.area.top, height);
        if (typeof top == 'number') {
            if (event.pageY >= top) {
                passed++;
            }
        }
        //  Check if the gesture started before the area.right.
        var right = this._getArea(this.area.right, width);
        if (typeof right == 'number') {
            right = width - right;
            if (event.pageX <= right) {
                passed++;
            }
        }
        //  Check if the gesture started above the area.bottom.
        var bottom = this._getArea(this.area.bottom, height);
        if (typeof bottom == 'number') {
            bottom = height - bottom;
            if (event.pageY <= bottom) {
                passed++;
            }
        }
        //  Check if the gesture started after the area.left.
        var left = this._getArea(this.area.left, width);
        if (typeof left == 'number') {
            if (event.pageX >= left) {
                passed++;
            }
        }
        if (passed == 4) {
            //	Store the start x- and y-position.
            this.startPosition = {
                x: event.pageX,
                y: event.pageY
            };
            //	Set the state of the gesture to "watching".
            this.state = DragEngine.state.watching;
        }
    };
    /**
     * Stopping the touch gesture.
     */
    DragEngine.prototype.stop = function (event) {
        //	Dispatch the "dragEnd" events.
        if (this.state == DragEngine.state.dragging) {
            /** The event information. */
            var detail = this._eventDetail();
            /** The direction. */
            var dragDirection = DragEngine.directionNames[this.axis][this.distance[this.axis] > 0 ? 0 : 1];
            this._dispatchEvents('drag*End', detail, dragDirection);
            //	Dispatch the "swipe" events.
            if (Math.abs(this.movement[this.axis]) > DragEngine.treshold.swipe) {
                /** The direction. */
                var swipeDirection = DragEngine.directionNames[this.axis][this.movement[this.axis] > 0 ? 0 : 1];
                this._dispatchEvents('swipe*', detail, swipeDirection);
            }
        }
        //	Set the state of the gesture to "inactive".
        this.state = DragEngine.state.inactive;
    };
    /**
     * Doing the touch gesture.
     */
    DragEngine.prototype.move = function (event) {
        switch (this.state) {
            case DragEngine.state.watching:
            case DragEngine.state.dragging:
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
                var dragDirection = DragEngine.directionNames[this.axis][this.movement[this.axis] > 0 ? 0 : 1];
                //	Watching for the gesture to go past the treshold.
                if (this.state == DragEngine.state.watching) {
                    if (Math.abs(this.distance[this.axis]) >
                        DragEngine.treshold.start) {
                        this._dispatchEvents('drag*Start', detail, dragDirection);
                        //	Set the state of the gesture to "inactive".
                        this.state = DragEngine.state.dragging;
                    }
                }
                //	Dispatch the "drag" events.
                if (this.state == DragEngine.state.dragging) {
                    this._dispatchEvents('drag*', detail, dragDirection);
                }
                break;
        }
    };
    DragEngine.prototype._eventDetail = function () {
        return {
            movementX: this.movement.x,
            movementY: this.movement.y,
            distanceX: this.distance.x -
                (this.axis == 'x' ? DragEngine.treshold.start : 0),
            distanceY: this.distance.y -
                (this.axis == 'y' ? DragEngine.treshold.start : 0)
        };
    };
    DragEngine.prototype._dispatchEvents = function (eventName, detail, dir) {
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
    DragEngine.prototype._getArea = function (position, size) {
        if (typeof position == 'string') {
            if (position.slice(-1) == '%') {
                position = parseInt(position.slice(0, -1), 10);
                position = size * (position / 100);
            }
        }
        return position;
    };
    DragEngine.directionNames = {
        x: ['Right', 'Left'],
        y: ['Down', 'Up']
    };
    DragEngine.treshold = {
        start: 25,
        swipe: 15
    };
    DragEngine.state = {
        inactive: 0,
        watching: 1,
        dragging: 2
    };
    return DragEngine;
}());
export default DragEngine;
