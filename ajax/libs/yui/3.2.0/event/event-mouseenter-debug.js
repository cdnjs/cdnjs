YUI.add('event-mouseenter', function(Y) {

/**
 * <p>Adds subscription and delegation support for mouseenter and mouseleave
 * events.  Unlike mouseover and mouseout, these events aren't fired from child
 * elements of a subscribed node.</p>
 *
 * <p>This avoids receiving three mouseover notifications from a setup like</p>
 *
 * <pre><code>div#container > p > a[href]</code></pre>
 *
 * <p>where</p>
 *
 * <pre><code>Y.one('#container').on('mouseover', callback)</code></pre>
 *
 * <p>When the mouse moves over the link, one mouseover event is fired from
 * #container, then when the mouse moves over the p, another mouseover event is
 * fired and bubbles to #container, causing a second notification, and finally
 * when the mouse moves over the link, a third mouseover event is fired and
 * bubbles to #container for a third notification.</p>
 *
 * <p>By contrast, using mouseenter instead of mouseover, the callback would be
 * executed only once when the mouse moves over #container.</p>
 *
 * @module event
 * @submodule event-mouseenter
 */
function notify(e, notifier) {
    var current = e.currentTarget,
        related = e.relatedTarget;

    if (current !== related && !current.contains(related)) {
        notifier.fire(e);
    }
}

var config = {
    proxyType: "mouseover",

    on: function (node, sub, notifier) {
        sub.onHandle = node.on(this.proxyType, notify, null, notifier);
    },

    detach: function (node, sub) {
        sub.onHandle.detach();
    },

    delegate: function (node, sub, notifier, filter) {
        sub.delegateHandle =
            Y.delegate(this.proxyType, notify, node, filter, null, notifier);
    },

    detachDelegate: function (node, sub) {
        sub.delegateHandle.detach();
    }
};

Y.Event.define("mouseenter", config, true);
Y.Event.define("mouseleave", Y.merge(config, { proxyType: "mouseout" }), true);


}, '@VERSION@' ,{requires:['event-synthetic']});
