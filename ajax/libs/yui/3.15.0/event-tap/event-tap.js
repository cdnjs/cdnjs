/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('event-tap', function (Y, NAME) {

/**
The tap module provides a gesture events, "tap", which normalizes user interactions
across touch and mouse or pointer based input devices.  This can be used by application developers
to build input device agnostic components which behave the same in response to either touch or mouse based
interaction.

'tap' is like a touchscreen 'click', only it requires much less finger-down time since it listens to touch events,
but reverts to mouse events if touch is not supported.

@example

    YUI().use('event-tap', function (Y) {
        Y.one('#my-button').on('tap', function (e) {
        });
    });

@module event
@submodule event-tap
@author Andres Garza, matuzak and tilo mitra
@since 3.7.0

*/
var doc = Y.config.doc,
    GESTURE_MAP = Y.Event._GESTURE_MAP,
    EVT_START = GESTURE_MAP.start,
    EVT_TAP = 'tap',
    POINTER_EVENT_TEST = /pointer/i,

    HANDLES = {
        START: 'Y_TAP_ON_START_HANDLE',
        END: 'Y_TAP_ON_END_HANDLE',
        CANCEL: 'Y_TAP_ON_CANCEL_HANDLE'
    };

function detachHandles(subscription, handles) {
    handles = handles || Y.Object.values(HANDLES);

    Y.Array.each(handles, function (item) {
        var handle = subscription[item];
        if (handle) {
            handle.detach();
            subscription[item] = null;
        }
    });

}


/**
Sets up a "tap" event, that is fired on touch devices in response to a tap event (finger down, finder up).
This event can be used instead of listening for click events which have a 500ms delay on most touch devices.
This event can also be listened for using node.delegate().

@event tap
@param type {string} "tap"
@param fn {function} The method the event invokes. It receives the event facade of the underlying DOM event.
@for Event
@return {EventHandle} the detach handle
*/
Y.Event.define(EVT_TAP, {
    publishConfig: {
        preventedFn: function (e) {
            var sub = e.target.once('click', function (click) {
                click.preventDefault();
            });

            // Make sure to detach the subscription during the next event loop
            // so this doesn't `preventDefault()` on the wrong click event.
            setTimeout(function () {
                sub.detach();
            //Setting this to `0` causes the detachment to occur before the click
            //comes in on Android 4.0.3-4.0.4. 100ms seems to be a reliable number here
            //that works across the board.
            }, 100);
        }
    },

    processArgs: function (args, isDelegate) {

        //if we return for the delegate use case, then the `filter` argument
        //returns undefined, and we have to get the filter from sub._extra[0] (ugly)

        if (!isDelegate) {
            var extra = args[3];
            // remove the extra arguments from the array as specified by
            // http://yuilibrary.com/yui/docs/event/synths.html
            args.splice(3,1);
            return extra;
        }
    },
    /**
    This function should set up the node that will eventually fire the event.

    Usage:

        node.on('tap', function (e) {
        });

    @method on
    @param {Node} node
    @param {Array} subscription
    @param {Boolean} notifier
    @public
    @static
    **/
    on: function (node, subscription, notifier) {
        subscription[HANDLES.START] = node.on(EVT_START, this._start, this, node, subscription, notifier);
    },

    /**
    Detaches all event subscriptions set up by the event-tap module

    @method detach
    @param {Node} node
    @param {Array} subscription
    @param {Boolean} notifier
    @public
    @static
    **/
    detach: function (node, subscription, notifier) {
        detachHandles(subscription);
    },

    /**
    Event delegation for the 'tap' event. The delegated event will use a
    supplied selector or filtering function to test if the event references at least one
    node that should trigger the subscription callback.

    Usage:

        node.delegate('tap', function (e) {
        }, 'li a');

    @method delegate
    @param {Node} node
    @param {Array} subscription
    @param {Boolean} notifier
    @param {String | Function} filter
    @public
    @static
    **/
    delegate: function (node, subscription, notifier, filter) {
        subscription[HANDLES.START] = Y.delegate(EVT_START, function (e) {
            this._start(e, node, subscription, notifier, true);
        }, node, filter, this);
    },

    /**
    Detaches the delegated event subscriptions set up by the event-tap module.
    Only used if you use node.delegate(...) instead of node.on(...);

    @method detachDelegate
    @param {Node} node
    @param {Array} subscription
    @param {Boolean} notifier
    @public
    @static
    **/
    detachDelegate: function (node, subscription, notifier) {
        detachHandles(subscription);
    },

    /**
    Called when the monitor(s) are tapped on, either through touchstart or mousedown.

    @method _start
    @param {DOMEventFacade} event
    @param {Node} node
    @param {Array} subscription
    @param {Boolean} notifier
    @param {Boolean} delegate
    @protected
    @static
    **/
    _start: function (event, node, subscription, notifier, delegate) {

        var context = {
                canceled: false,
                eventType: event.type
            },
            preventMouse = subscription.preventMouse || false;

        //move ways to quit early to the top.
        // no right clicks
        if (event.button && event.button === 3) {
            return;
        }

        // for now just support a 1 finger count (later enhance via config)
        if (event.touches && event.touches.length !== 1) {
            return;
        }

        context.node = delegate ? event.currentTarget : node;

        //There is a double check in here to support event simulation tests, in which
        //event.touches can be undefined when simulating 'touchstart' on touch devices.
        if (event.touches) {
          context.startXY = [ event.touches[0].pageX, event.touches[0].pageY ];
        }
        else {
          context.startXY = [ event.pageX, event.pageY ];
        }

        //If `onTouchStart()` was called by a touch event, set up touch event subscriptions.
        //Otherwise, set up mouse/pointer event event subscriptions.
        if (event.touches) {

            subscription[HANDLES.END] = node.once('touchend', this._end, this, node, subscription, notifier, delegate, context);
            subscription[HANDLES.CANCEL] = node.once('touchcancel', this.detach, this, node, subscription, notifier, delegate, context);

            //Since this is a touch* event, there will be corresponding mouse events
            //that will be fired. We don't want these events to get picked up and fire
            //another `tap` event, so we'll set this variable to `true`.
            subscription.preventMouse = true;
        }

        //Only add these listeners if preventMouse is `false`
        //ie: not when touch events have already been subscribed to
        else if (context.eventType.indexOf('mouse') !== -1 && !preventMouse) {
            subscription[HANDLES.END] = node.once('mouseup', this._end, this, node, subscription, notifier, delegate, context);
            subscription[HANDLES.CANCEL] = node.once('mousecancel', this.detach, this, node, subscription, notifier, delegate, context);
        }

        //If a mouse event comes in after a touch event, it will go in here and
        //reset preventMouse to `true`.
        //If a mouse event comes in without a prior touch event, preventMouse will be
        //false in any case, so this block doesn't do anything.
        else if (context.eventType.indexOf('mouse') !== -1 && preventMouse) {
            subscription.preventMouse = false;
        }

        else if (POINTER_EVENT_TEST.test(context.eventType)) {
            subscription[HANDLES.END] = node.once(GESTURE_MAP.end, this._end, this, node, subscription, notifier, delegate, context);
            subscription[HANDLES.CANCEL] = node.once(GESTURE_MAP.cancel, this.detach, this, node, subscription, notifier, delegate, context);
        }

    },


    /**
    Called when the monitor(s) fires a touchend event (or the mouse equivalent).
    This method fires the 'tap' event if certain requirements are met.

    @method _end
    @param {DOMEventFacade} event
    @param {Node} node
    @param {Array} subscription
    @param {Boolean} notifier
    @param {Boolean} delegate
    @param {Object} context
    @protected
    @static
    **/
    _end: function (event, node, subscription, notifier, delegate, context) {
        var startXY = context.startXY,
            endXY,
            clientXY,
            sensitivity = 15;

        if (subscription._extra && subscription._extra.sensitivity >= 0) {
            sensitivity = subscription._extra.sensitivity;
        }

        //There is a double check in here to support event simulation tests, in which
        //event.touches can be undefined when simulating 'touchstart' on touch devices.
        if (event.changedTouches) {
          endXY = [ event.changedTouches[0].pageX, event.changedTouches[0].pageY ];
          clientXY = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
        }
        else {
          endXY = [ event.pageX, event.pageY ];
          clientXY = [event.clientX, event.clientY];
        }

        // make sure mouse didn't move
        if (Math.abs(endXY[0] - startXY[0]) <= sensitivity && Math.abs(endXY[1] - startXY[1]) <= sensitivity) {

            event.type = EVT_TAP;
            event.pageX = endXY[0];
            event.pageY = endXY[1];
            event.clientX = clientXY[0];
            event.clientY = clientXY[1];
            event.currentTarget = context.node;

            notifier.fire(event);
        }

        detachHandles(subscription, [HANDLES.END, HANDLES.CANCEL]);
    }
});


}, '3.15.0', {"requires": ["node-base", "event-base", "event-touch", "event-synthetic"]});
