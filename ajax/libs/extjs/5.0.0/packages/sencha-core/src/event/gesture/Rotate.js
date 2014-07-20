/**
 * A simple event recognizer which knows when you rotate.
 */
Ext.define('Ext.event.gesture.Rotate', {
    extend: 'Ext.event.gesture.MultiTouch',

    handledEvents: ['rotatestart', 'rotate', 'rotateend', 'rotatecancel'],

    /**
     * @member Ext.dom.Element
     * @event rotatestart
     * Fired once when a rotation has started.
     * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
     * @param {HTMLElement} node The target of the event.
     * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
     */

    /**
     * @member Ext.dom.Element
     * @event rotate
     * Fires continuously when there is rotation (the touch must move for this to be fired).
     * When listening to this, ensure you know about the {@link Ext.event.Event#angle} and {@link Ext.event.Event#rotation}
     * properties in the `event` object.
     * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
     * @param {HTMLElement} node The target of the event.
     * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
     */

    /**
     * @member Ext.dom.Element
     * @event rotateend
     * Fires when a rotation event has ended.
     * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
     * @param {HTMLElement} node The target of the event.
     * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
     */

    /**
     * @property {Number} angle
     * The angle of the rotation.
     *
     * **This is only available when the event type is `rotate`**
     * @member Ext.event.Event
     */

    /**
     * @property {Number} rotation
     * A amount of rotation, since the start of the event.
     *
     * **This is only available when the event type is `rotate`**
     * @member Ext.event.Event
     */

    startAngle: 0,

    lastTouches: null,

    lastAngle: null,

    onTouchMove: function(e) {
        if (!this.isTracking) {
            return;
        }

        var touches = e.touches,
            lastAngle = this.lastAngle,
            firstPoint, secondPoint, angle, nextAngle, previousAngle, diff;

        firstPoint = touches[0].point;
        secondPoint = touches[1].point;

        angle = firstPoint.getAngleTo(secondPoint);

        if (lastAngle !== null) {
            diff = Math.abs(lastAngle - angle);
            nextAngle = angle + 360;
            previousAngle = angle - 360;

            if (Math.abs(nextAngle - lastAngle) < diff) {
                angle = nextAngle;
            }
            else if (Math.abs(previousAngle - lastAngle) < diff) {
                angle = previousAngle;
            }
        }

        this.lastAngle = angle;

        if (!this.isStarted) {
            this.isStarted = true;

            this.startAngle = angle;

            this.fire('rotatestart', e, {
                touches: touches,
                angle: angle,
                rotation: 0
            });
        }
        else {
            this.fire('rotate', e, {
                touches: touches,
                angle: angle,
                rotation: angle - this.startAngle
            });
        }

        this.lastTouches = Ext.Array.clone(touches);
    },

    fireEnd: function(e) {
        this.lastAngle = null;
        this.fire('rotateend', e);
    },

    fireCancel: function(e) {
        this.lastAngle = null;
        this.fire('rotatecancel', e);
    }
});
