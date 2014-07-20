/**
 *
 */
Ext.define('Ext.event.gesture.Drag', {
    extend: 'Ext.event.gesture.SingleTouch',

    isStarted: false,

    startPoint: null,

    previousPoint: null,

    lastPoint: null,

    handledEvents: ['dragstart', 'drag', 'dragend', 'dragcancel'],

    config: {
        /**
         * @cfg {Number} minDistance
         * The minimum distance of pixels before a touch event becomes a drag event.
         */
        minDistance: 8
    },

    constructor: function() {
        this.callSuper(arguments);

        this.info = {
            touch: null,
            previous: {
                x: 0,
                y: 0
            },
            x: 0,
            y: 0,
            delta: {
                x: 0,
                y: 0
            },
            absDelta: {
                x: 0,
                y: 0
            },
            flick: {
                velocity: {
                    x: 0,
                    y: 0
                }
            },
            direction: {
                x: 0,
                y: 0
            },
            time: 0,
            previousTime: {
                x: 0,
                y: 0
            }
        };
    },

    onTouchStart: function(e) {
        if (this.callSuper(arguments) === false) {
            if (this.isStarted && this.lastMoveEvent !== null) {
                this.lastMoveEvent.isStopped = false;
                this.onTouchEnd(this.lastMoveEvent);
            }
            return false;
        }

        this.startTime = e.time;
        this.startPoint = e.changedTouches[0].point;
    },

    tryDragStart: function(e) {
        var startPoint = this.startPoint,
            touch = e.changedTouches[0],
            point = touch.point,
            minDistance = this.getMinDistance(),
            info = this.info;

        if (Math.abs(point.getDistanceTo(startPoint)) >= minDistance) {
            this.isStarted = true;

            this.previousPoint = this.lastPoint = point;

            this.resetInfo('x', e, touch);
            this.resetInfo('y', e, touch);

            info.time = e.time;

            this.fire('dragstart', e, info);
        }
    },

    onTouchMove: function(e) {
        if (!this.isStarted) {
            this.tryDragStart(e);
        }

        if (!this.isStarted) {
            return;
        }

        var touch = e.changedTouches[0],
            point = touch.point;

        if (this.lastPoint) {
            this.previousPoint = this.lastPoint;
        }

        this.lastPoint = point;
        this.lastMoveEvent = e;

        this.updateInfo('x', e, touch);
        this.updateInfo('y', e, touch);

        this.info.time = e.time;

        this.fire('drag', e, this.info);
    },

    onAxisDragEnd: function(axis, info) {
        var duration = info.time - info.previousTime[axis];

        if (duration > 0) {
            info.flick.velocity[axis] = (info[axis] - info.previous[axis]) / duration;
        }
    },

    resetInfo: function(axis, e, touch) {
        var value = this.lastPoint[axis],
            startValue = this.startPoint[axis],
            delta = value - startValue,
            capAxis = axis.toUpperCase(),
            info = this.info;

        info.touch = touch;

        info.delta[axis] = delta;
        info.absDelta[axis] = Math.abs(delta);

        info.previousTime[axis] = this.startTime;
        info.previous[axis] = startValue;
        info[axis] = value;
        info.direction[axis] = 0;

        info['start' + capAxis] = this.startPoint[axis];
        info['previous' + capAxis] = info.previous[axis];
        info['page' + capAxis] = info[axis];
        info['delta' + capAxis] = info.delta[axis];
        info['absDelta' + capAxis] = info.absDelta[axis];
        info['previousDelta' + capAxis] = 0;
        info.startTime = this.startTime;
    },

    updateInfo: function(axis, e, touch) {
        var me = this,
            value = me.lastPoint[axis],
            previousValue = me.previousPoint[axis],
            startValue = me.startPoint[axis],
            delta = value - startValue,
            info = me.info,
            direction = info.direction,
            capAxis = axis.toUpperCase(),
            previousFlick = info.previous[axis];

        info.touch = touch;
        info.delta[axis] = delta;
        info.absDelta[axis] = Math.abs(delta);

        if (value !== previousFlick && value !== info[axis]) {
            info.previous[axis] = info[axis];
            info.previousTime[axis] = info.time;
        }

        info[axis] = value;

        if (value > previousValue) {
            direction[axis] = 1;
        }
        else if (value < previousValue) {
            direction[axis] = -1;
        }

        info['start' + capAxis] = startValue;
        info['previous' + capAxis] = info.previous[axis];
        info['page' + capAxis] = info[axis];
        info['delta' + capAxis] = info.delta[axis];
        info['absDelta' + capAxis] = info.absDelta[axis];
        info['previousDelta' + capAxis] = info.previous[axis] - startValue;
        info.startTime = me.startTime;
    },

    onTouchEnd: function(e) {
        this.doEnd(e);
    },

    onTouchCancel: function(e) {
        this.doEnd(e, true);
        return false;
    },

    doEnd: function(e, isCancel) {
        if (!this.isStarted) {
            this.tryDragStart(e);
        }

        if (this.isStarted) {
            var touch = e.changedTouches[0],
                point = touch.point,
                info = this.info;

            this.isStarted = false;
            this.lastPoint = point;

            this.updateInfo('x', e, touch);
            this.updateInfo('y', e, touch);

            info.time = e.time;

            this.onAxisDragEnd('x', info);
            this.onAxisDragEnd('y', info);

            this.fire(isCancel ? 'dragcancel' : 'dragend', e, info);

            this.startPoint = null;
            this.previousPoint = null;
            this.lastPoint = null;
            this.lastMoveEvent = null;
        }
    }
});
