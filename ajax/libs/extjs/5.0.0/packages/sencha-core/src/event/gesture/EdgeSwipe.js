/**
 * A event recognizer created to recognize swipe movements from the edge of a container.
 */
Ext.define('Ext.event.gesture.EdgeSwipe', {
    extend: 'Ext.event.gesture.Swipe',

    handledEvents: [
        'edgeswipe',
        'edgeswipestart',
        'edgeswipeend',
        'edgeswipecancel'
    ],

    inheritableStatics: {
        NOT_NEAR_EDGE: 'Not Near Edge'
    },

    config: {
        minDistance: 60
    },

    onTouchStart: function(e) {
        if (this.callParent(arguments) === false) {
            return false;
        }

        var touch = e.changedTouches[0];

        this.started = false;

        this.direction = null;

        this.isHorizontal = true;
        this.isVertical = true;

        this.startX = touch.pageX;
        this.startY = touch.pageY;
    },

    onTouchMove: function(e) {
        var touch = e.changedTouches[0],
            x = touch.pageX,
            y = touch.pageY,
            deltaX = x - this.startX,
            deltaY = y - this.startY,
            absDeltaY = Math.abs(y - this.startY),
            absDeltaX = Math.abs(x - this.startX),
            minDistance = this.getMinDistance(),
            maxOffset = this.getMaxOffset(),
            duration = e.time - this.startTime,
            elementWidth = Ext.Viewport && Ext.Element.getViewportWidth(),
            elementHeight = Ext.Viewport && Ext.Element.getViewportHeight(),
            direction, distance;

        // Check if the swipe is going off vertical
        if (this.isVertical && absDeltaX > maxOffset) {
            this.isVertical = false;
        }

        // Check if the swipe is going off horizontal
        if (this.isHorizontal && absDeltaY > maxOffset) {
            this.isHorizontal = false;
        }

        // If the swipe is both, determin which one it is from the maximum distance travelled
        if (this.isVertical && this.isHorizontal) {
            if (absDeltaY > absDeltaX) {
                this.isHorizontal = false;
            } else {
                this.isVertical = false;
            }
        }

        // Get the direction of the swipe
        if (this.isHorizontal) {
            direction = (deltaX < 0) ? 'left' : 'right';
            distance = deltaX;
        }
        else if (this.isVertical) {
            direction = (deltaY < 0) ? 'up' : 'down';
            distance = deltaY;
        }

        this.direction = this.direction || direction;

        // Invert the distance if we are going up or left so the distance is a positive number FROM the side
        if (this.direction == 'up') {
            distance = deltaY * -1;
        } else if (this.direction == 'left') {
            distance = deltaX * -1;
        }

        this.distance = distance;

        if (distance == 0) {
            return this.fail(this.self.DISTANCE_NOT_ENOUGH);
        }

        if (!this.started) {
            // If this is the first move, check if we are close enough to the edge to begin
            if (this.direction == 'right' && this.startX > minDistance) {
                return this.fail(this.self.NOT_NEAR_EDGE);
            }
            else if (this.direction == 'down' &&  this.startY > minDistance) {
                return this.fail(this.self.NOT_NEAR_EDGE);
            }
            else if (this.direction == 'left' &&  (elementWidth - this.startX) > minDistance) {
                return this.fail(this.self.NOT_NEAR_EDGE);
            }
            else if (this.direction == 'up' && (elementHeight - this.startY) > minDistance) {
                return this.fail(this.self.NOT_NEAR_EDGE);
            }

            // Start the event
            this.started = true;
            this.startTime = e.time;

            this.fire('edgeswipestart', e, {
                touch: touch,
                direction: this.direction,
                distance: this.distance,
                duration: duration
            });
        } else {
            this.fire('edgeswipe', e, {
                touch: touch,
                direction: this.direction,
                distance: this.distance,
                duration: duration
            });
        }
    },

    onTouchEnd: function(e) {
        var duration;

        if (this.onTouchMove(e) !== false) {
            duration = e.time - this.startTime;

            this.fire('edgeswipeend', e, {
                touch: e.changedTouches[0],
                direction: this.direction,
                distance: this.distance,
                duration: duration
            });
        }
    },

    onTouchCancel: function(e) {
        this.fire('edgeswipecancel', e, {
            touch: e.changedTouches[0]
        });
        return false;
    }
});
