YUI.add('event-valuechange', function(Y) {

/**
 * Adds a synthetic <code>valueChange</code> event that fires when the
 * <code>value</code> property of an input field or textarea changes as a result
 * of a keystroke, mouse operation, or input method editor (IME) input event.
 *
 * @module event-valuechange
 */

/**
 * Provides the implementation for the synthetic <code>valueChange</code> event.
 *
 * @class ValueChange
 * @static
 */

var YArray = Y.Array,

// Just a simple namespace to make methods overridable.
VC = {
    // -- Static Constants -----------------------------------------------------
    POLL_INTERVAL: 50,
    TIMEOUT: 10000,

    // -- Protected Static Properties ------------------------------------------
    _history  : {},
    _intervals: {},
    _notifiers: {},
    _timeouts : {},

    // -- Protected Static Methods ---------------------------------------------
    _poll: function (node, stamp, e) {
        var newVal  = node._node.value, // performance cheat; getValue() is a big hit when polling
            prevVal = VC._history[stamp],
            facade;

        if (newVal !== prevVal) {
            VC._history[stamp] = newVal;

            facade = {
                _event : e,
                newVal : newVal,
                prevVal: prevVal
            };

            YArray.each(VC._notifiers[stamp], function (notifier) {
                notifier.fire(facade);
            });

            VC._refreshTimeout(node, stamp);
        }
    },

    _refreshTimeout: function (node, stamp) {
        VC._stopTimeout(node, stamp); // avoid dupes

        // If we don't see any changes within the timeout period (10 seconds by
        // default), stop polling.
        VC._timeouts[stamp] = setTimeout(function () {
            VC._stopPolling(node, stamp);
        }, VC.TIMEOUT);

        Y.log('_refreshTimeout: ' + stamp, 'info', 'event-valuechange');
    },

    _startPolling: function (node, stamp, e, force) {
        if (!stamp) {
            stamp = Y.stamp(node);
        }

        // Don't bother continuing if we're already polling.
        if (!force && VC._intervals[stamp]) {
            return;
        }

        VC._stopPolling(node, stamp); // avoid dupes

        // Poll for changes to the node's value. We can't rely on keyboard
        // events for this, since the value may change due to a mouse-initiated
        // paste event, an IME input event, or for some other reason that
        // doesn't trigger a key event.
        VC._intervals[stamp] = setInterval(function () {
            VC._poll(node, stamp, e);
        }, VC.POLL_INTERVAL);

        VC._refreshTimeout(node, stamp, e);

        Y.log('_startPolling: ' + stamp, 'info', 'event-valuechange');
    },

    _stopPolling: function (node, stamp) {
        if (!stamp) {
            stamp = Y.stamp(node);
        }

        VC._intervals[stamp] = clearInterval(VC._intervals[stamp]);
        VC._stopTimeout(node, stamp);

        Y.log('_stopPolling: ' + stamp, 'info', 'event-valuechange');
    },

    _stopTimeout: function (node, stamp) {
        if (!stamp) {
            stamp = Y.stamp(node);
        }

        VC._timeouts[stamp] = clearTimeout(VC._timeouts[stamp]);
    },

    // -- Protected Static Event Handlers --------------------------------------
    _onBlur: function (e) {
        VC._stopPolling(e.currentTarget);
    },

    _onKeyDown: function (e) {
        VC._startPolling(e.currentTarget, null, e);
    },

    _onKeyUp: function (e) {
        // These charCodes indicate that an IME has started. We'll restart
        // polling and give the IME up to 10 seconds (by default) to finish.
        if (e.charCode === 229 || e.charCode === 197) {
            VC._startPolling(e.currentTarget, null, e, true);
        }
    },

    _onMouseDown: function (e) {
        VC._startPolling(e.currentTarget, null, e);
    },

    _onSubscribe: function (node, subscription, notifier) {
        var stamp     = Y.stamp(node),
            notifiers = VC._notifiers[stamp];

        VC._history[stamp] = node.get('value');

        notifier._handles = node.on({
            blur     : VC._onBlur,
            keydown  : VC._onKeyDown,
            keyup    : VC._onKeyUp,
            mousedown: VC._onMouseDown
        });

        if (!notifiers) {
            notifiers = VC._notifiers[stamp] = [];
        }

        notifiers.push(notifier);
    },

    _onUnsubscribe: function (node, subscription, notifier) {
        var stamp     = Y.stamp(node),
            notifiers = VC._notifiers[stamp],
            index     = YArray.indexOf(notifiers, notifier);

        notifier._handles.detach();

        if (index !== -1) {
            notifiers.splice(index, 1);

            if (!notifiers.length) {
                VC._stopPolling(node, stamp);

                delete VC._notifiers[stamp];
                delete VC._history[stamp];
            }
        }
    }
};

/**
 * <p>
 * Synthetic event that fires when the <code>value</code> property of an input
 * field or textarea changes as a result of a keystroke, mouse operation, or
 * input method editor (IME) input event.
 * </p>
 *
 * <p>
 * Unlike the <code>onchange</code> event, this event fires when the value
 * actually changes and not when the element loses focus. This event also
 * reports IME and multi-stroke input more reliably than <code>oninput</code> or
 * the various key events across browsers.
 * </p>
 *
 * <p>
 * This event is provided by the <code>event-valuechange</code> module.
 * </p>
 *
 * <p>
 * <strong>Usage example:</strong>
 * </p>
 *
 * <code><pre>
 * YUI().use('event-valuechange', function (Y) {
 * &nbsp;&nbsp;Y.one('input').on('valueChange', function (e) {
 * &nbsp;&nbsp;&nbsp;&nbsp;// Handle valueChange events on the first input element on the page.
 * &nbsp;&nbsp;});
 * });
 * </pre></code>
 *
 * @event valueChange
 * @param {EventFacade} e Event facade with the following additional
 *   properties:
 *
 * <dl>
 *   <dt>prevVal (String)</dt>
 *   <dd>
 *     Previous value before the latest change.
 *   </dd>
 *
 *   <dt>newVal (String)</dt>
 *   <dd>
 *     New value after the latest change.
 *   </dd>
 * </dl>
 *
 * @for YUI
 */

Y.Event.define('valueChange', {
    detach: VC._onUnsubscribe,
    on    : VC._onSubscribe,

    publishConfig: {
        emitFacade: true
    }
});

Y.ValueChange = VC;


}, '@VERSION@' ,{requires:['event-focus', 'event-synthetic']});
