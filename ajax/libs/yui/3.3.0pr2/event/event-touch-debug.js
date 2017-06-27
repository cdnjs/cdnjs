YUI.add('event-touch', function(Y) {

/**
 * Adds touch event facade normalization properties (touches, changedTouches, targetTouches etc.) to the DOM event facade
 *
 * @module event-touch
 */

var SCALE = "scale",
    ROTATION = "rotation",
    IDENTIFIER = "identifier";

/**
 * Adds touch event facade normalization properties to the DOM event facade
 *
 * @method _touch
 * @for DOMEventFacade
 * @private
 * @param ev {Event} the DOM event
 * @param currentTarget {HTMLElement} the element the listener was attached to
 * @param wrapper {Event.Custom} the custom event wrapper for this DOM event
 */
Y.DOMEventFacade.prototype._touch = function(e, currentTarget, wrapper) {

    var i,l, etCached, et,touchCache;

    Y.log("Calling facade._touch() with e = " + e);

    if (e.touches) {
        Y.log("Found e.touches. Replicating on facade");

        this.touches = [];
        touchCache = {};

        for (i = 0, l = e.touches.length; i < l; ++i) {
            et = e.touches[i];
            touchCache[Y.stamp(et)] = this.touches[i] = new Y.DOMEventFacade(et, currentTarget, wrapper);
        }
    }

    if (e.targetTouches) {
        Y.log("Found e.targetTouches. Replicating on facade");

        this.targetTouches = [];

        for (i = 0, l = e.targetTouches.length; i < l; ++i) {
            et = e.targetTouches[i];
            etCached = touchCache && touchCache[Y.stamp(et, true)];

            this.targetTouches[i] = etCached || new Y.DOMEventFacade(et, currentTarget, wrapper);
            
            if (etCached) { Y.log("Found native event in touches. Using same facade in targetTouches"); }
        }
    }

    if (e.changedTouches) {
        Y.log("Found e.changedTouches. Replicating on facade");        

        this.changedTouches = [];

        for (i = 0, l = e.changedTouches.length; i < l; ++i) {
            et = e.changedTouches[i];
            etCached = touchCache && touchCache[Y.stamp(et, true)];

            this.changedTouches[i] = etCached || new Y.DOMEventFacade(et, currentTarget, wrapper);
            
            if (etCached) { Y.log("Found native event in touches. Using same facade in changedTouches"); }
        }
    }

    if (SCALE in e) {
        this[SCALE] = e[SCALE];
    }

    if (ROTATION in e) {
        this[ROTATION] = e[ROTATION];
    }

    if (IDENTIFIER in e) {
        this[IDENTIFIER] = e[IDENTIFIER];
    }
};

if (Y.Node.DOM_EVENTS) {
    Y.mix(Y.Node.DOM_EVENTS, {
        touchstart:1,
        touchmove:1,
        touchend:1,
        touchcancel:1,
        gesturestart:1,
        gesturechange:1,
        gestureend:1
    });
}


}, '@VERSION@' ,{requires:['node-base']});
