YUI.add('event-synthetic', function(Y) {

/**
 * Define new DOM events that can be subscribed from any Node.
 *
 * @module event
 * @submodule event-synthetic
 */
var Evt         = Y.Env.evt,
    DOMWrappers = Evt.dom_wrappers,
    DOMMap      = Evt.dom_map,
    EvtPlugins  = Evt.plugins,
    DOMEvents   = Y.Node.DOM_EVENTS,
    isFunction  = Y.Lang.isFunction;

/*
 * Adds the following method to CustomEvent's prototype.
 */

/**
 * Returns the first subscriber that matches the provided function and/or
 * context.  Both function and context parameters are optional.  Omitting
 * either will return the first match on the other parameter, and omitting both
 * will return the first subscriber.
 *
 * @method getSubscriber
 * @param fn {Function} Optional. The subscribed callback function
 * @param ctx {Object} Optional.  The context override for the callback
 * @return {Subscriber} or null
 * @for CustomEvent
 * @since 3.1.0
 * @in event-synthetic
 */
Y.CustomEvent.prototype.getSubscriber = function (fn, ctx) {
    var subs = this.getSubs(), // on, after subs and their *:type siblings
        i, len, id, sub;

    for ( i = 0, len = subs.length; i < len; ++i ) {
        for (id in subs[i]) {
            if (subs[i].hasOwnProperty(id)) {
                sub = subs[i][id];
                if ((!fn || sub.fn === fn) && (!ctx || sub.context === ctx)) {
                    return sub;
                }
            }
        }
    }

    return null;
};

/**
 * <p>Wrapper class for the integration of new events into the YUI event
 * infrastructure.  Don't instantiate this object directly, use
 * <code>Y.Event.define( type, config )</code>.</p>
 *
 * <p>The configuration object must include the event <code>type</code>, and should include implementation methods for <code>on</code> and <code>detach</code>.  This is the full list of configuration properties:</p>
 * <dl>
 *   <dt><code>type</code></dt>
 *       <dd>REQUIRED.  The name of the synthetic event.  What goes
 *       <code>node.on(<strong>HERE</strong>, callback )</code>.</dd>
 *
 *   <dt><code>on</code></dt>
 *       <dd><code>function ( node, subscription, fireEvent )</code> The
 *       implementation logic for subscription.  Any special setup you need to
 *       do to create the environment for the event being fired.  E.g. native
 *       DOM event subscriptions.  Store subscription related objects and
 *       information on the <code>subscription</code> object.  When the
 *       criteria have been met to fire the synthetic event, call
 *       <code>fireEvent.fire()</code>.</dd>
 *
 *   <dt><code>detach</code></dt>
 *       <dd><code>function ( node, subscription, fireEvent )</code> The
 *       implementation logic for cleaning up a detached subscription. E.g.
 *       detach any DOM subscriptions done in <code>on</code>.</dd>
 *
 *   <dt><code>publishConfig</code></dt>
 *       <dd>(Object) The configuration object that will be used to instantiate
 *       the underlying CustomEvent.  By default, the event is defined with
 *       <code>emitFacade: true</code> so subscribers will receive a DOM-like
 *       event object.</dd>
 *
 *   <dt><code>processArgs</code></dt>
 *       <dd><code>function ( argArray )</code>  Optional method to extract any
 *       additional arguments from the subscription signature.  Using this
 *       allows <code>on</code> signatures like <code>node.on(
 *       &quot;hover&quot;, overCallback, outCallback )</code>.  Be sure that
 *       the args passed in is pruned of any additional arguments using, for
 *       example, <code>argArray.splice(2,1);</code>.  Data returned from the
 *       function will be stored on the <code>subscription</code> object passed
 *       to <code>on</code> and <code>detach</code> under
 *       <code>subscription._extra</code>.</dd>
 *   <dt>
 * </dl>
 *
 * @class SyntheticEvent
 * @constructor
 * @param cfg {Object} Implementation pieces and configuration
 * @since 3.1.0
 * @in event-synthetic
 */
function SyntheticEvent(cfg) {
    this._init(cfg);
}

SyntheticEvent.prototype = {
    /**
     * Initializes the synthetic event.
     *
     * @method _init
     * @param cfg {Object} The configuration object passed to the constructor
     * @protected
     */
    _init: function (cfg) {
        this.type = cfg.type;
        this.impl = cfg;
        this._publishConfig = cfg.publishConfig || { emitFacade: true };
    },

    /**
     * Initial receiver of the event subscription.  Passes off control to the
     * implementation <code>on</code> specified in the constructor
     * configuration after setting up the boiler plate code necessary for clean
     * detaching and destruction in the Event infrastructure.  Note that the
     * implementation function specified in the configuration will be called
     * once for each node passed in <code>el</code>, and each will be a Node
     * instance.
     *
     * @method on
     * @param type {String} the synthetic event name
     * @param fn {Function} the callback function
     * @param el {HTMLElement | Node | HTMLElement[] | NodeList} 
     *                          subscription target(s)
     * @protected
     */
    on: function (type, fn, el) {
        var args = Y.Array(arguments,0,true),
            self = DOMEvents[type], // event system calls on.apply(Y, ...)
            ce,       // Custom event published on node
            node,     // Node wrapper for el
            payload,  // extra info extracted from the args by implementation
            key, domGuid, // Ids for registering as a DOM event
            _handles, // Collection of detach handles for array subs
            handle;   // The detach handle for this subscription

        // Y.on normalizes Nodes to DOM nodes and NodeLists to an array of DOM
        // nodes.  Other possible value is a selector string.
        if (Y.Lang.isString(el)) {
            args[2] = Y.Selector.query(el);

            // If not found by query, trigger deferral.
            if (args[2].length) {
                el = args[2];
            } else {
                handle = Y.onAvailable(el, function () {
                    Y.mix(handle, Y.on.apply(Y, args), true);
                });
            }
        }

        // Array of elements get collection handle
        if (Y.Lang.isArray(el)) {
            _handles = [];
            Y.Array.each(el, function (n) {
                args[2] = n;
                _handles.push(Y.on.apply(Y, args));
            });

            // EventHandle can be constructed with an array of other handles
            handle = new Y.EventHandle(_handles);
        }

        // Single element subscription
        if (!handle) {
            // Allow the implementation to modify and/or extract extra data
            // from the subscription args
            payload = isFunction(self.impl.processArgs) ?
                self.impl.processArgs(args) : self._processArgs(args);

            args.shift(); // don't need type from here on out
            node = args[1] = Y.one(el);

            // Get or publish a custom event on the Node with the synthetic
            // event's name.
            ce = node._yuievt ? node._yuievt.events[self.type] : null;

            if (!ce) {
                ce = node.publish(self.type, self._publishConfig);

                // node.detach() with type missing doesn't reach adapter fork
                ce.detach = function (fn, context) {
                    return self.detach.call(Y, type, fn, context);
                };

                // Decorate and register like a DOM ce to support purgeElement
                domGuid = Y.stamp(el);
                key = 'event:' + Y.stamp(el) + self.type;

                // This will route through Y.Env.remove - the wrapper for
                // removeEventListener/detachEvent.  To avoid cross browser
                // issues, a real event name and dummy function are used to
                // make the DOM detach a noop
                Y.mix(ce, {
                    el     : el,
                    key    : key,
                    domkey : domGuid,
                    fn     : function () {},
                    capture: false
                });

                DOMMap[domGuid]  = DOMMap[domGuid] || {};
                DOMWrappers[key] = DOMMap[domGuid][key] = ce;
            }

            // Disallow duplicates.  
            if (!ce.getSubscriber(fn, el)) {
                // Subscribe to the hosted custom event
                handle = ce.on.apply(ce, args);

                handle.sub._extra = payload;

                // Override the handle's detach method to pass through to the
                // the this instance's detach method
                handle.detach = function () {
                    self.detach.call(Y, type, this.sub.fn, this.sub.context);
                };

                // Pass control to the implementation code
                if (isFunction(self.impl.on)) {
                    self.impl.on.call(self.impl, node, handle.sub, ce);
                }
            }
        }

        return handle;
    },

    /**
     * Initial receiver of the event detach.  Passes off control to the
     * implementation <code>detach</code> specified in the constructor
     * configuration after doing the necessary infrastructure cleanup.
     * Note that the implementation function specified in the configuration
     * will be called once for each node passed in <code>el</code>, and each
     * will be a Node instance.
     *
     * @method detach
     * @param type { String } the synthetic event name
     * @param fn {Function} the callback function
     * @param el {HTMLElement | Node | HTMLElement[] | NodeList}
     *                      subscription target(s)
     * @protected
     */
    detach: function (type, fn, el) {
        var args = Y.Array(arguments, 0, true),
            self = DOMEvents[type],
            ret  = 1, // To aggregate return values from detach multiple
            ce,       // The custom event published on the Node
            sub;      // The subscription tied to this fn and el

        // Detach doesn't normalize Node or NodeList
        if (el instanceof Y.Node) {
            el = el._node;
        } else if (el instanceof Y.NodeList) {
            el = el._nodes;
        } else if (Y.Lang.isString(el)) {
            el = Y.Selector.query(el);
        } else if (el && !Y.Array.test(el) && !el.tagName) {
            el = null;
        }

        if (el) {
            // Iterate detach by looping back for each item
            if (Y.Array.test(el)) {
                Y.Array.each(el, function (n, idx) {
                    args[2] = n;
                    ret += Y.detach.apply(Y, args);
                });

                return ret;
            }

            // Single element subscription detach.  Wrap in a Node because
            // that's how the subscription/context is enabled
            el = Y.one(el);

            // Get the custom event named for the synthetic event from the Node.
            // Node uses Y.augment(Node, EventTarget), so _yuievt won't be
            // present until an API method is called.
            // @TODO: do I need to do the object default?
            ce = (el._yuievt || {events:{}}).events[self.type];

            // Get the Subscriber object for this fn and context
            sub = ce ? ce.getSubscriber(fn, el) : null;

            if (sub) {
                // detach called without a fn = detach all subs
                // @TODO: this and the generic return should return an int
                if (!fn) {
                    while (sub) {
                        args[1] = sub.fn;
                        ret += Y.detach.apply(Y, args);
                        sub = ce.getSubscriber(fn, el);
                    }

                    return ret;
                }

                if (isFunction(self.impl.detach)) {
                    self.impl.detach.call(self.impl, el, sub, ce);
                }

                // Standard detach cleanup
                ce._delete(sub);

                ret = 1;
            }

        }

        return ret;
    },

    /**
     * Stub implementation.  Specify this in the configuration object passed to 
     * the constructor (rather, passed to <code>Y.Event.define</code>).
     *
     * @method _processArgs
     * @param args {Array} Array of arguments passed to <code>on</code>
     * @return {MIXED} null by default, but override to return useful data
     * @protected
     */
    _processArgs: function (args) {
        return null;
    }
};

Y.SyntheticEvent = SyntheticEvent;

/*
 * Static method added to <code>Y.Event</code>
 */

/**
 * <p>Static method to register a synthetic event definition and implementation
 * in the DOM Event subsystem.</p>
 *
 * <p>Pass either a string <code>type</code> and configuration object as
 * separate parameters or a configuration object that includes a
 * <code>type</code> property as a single parameter.</p>
 *
 * <p>The configuration object should include implementation methods for
 * <code>on</code> and <code>detach</code>.  This is the full list of
 * configuration properties:</p>
 *
 * <dl>
 *   <dt><code>type</code></dt>
 *       <dd>Required if using the <code>Y.Event.define( config )</code>
 *       signature.  The name of the synthetic event.  What goes
 *       <code>node.on(<strong>HERE</strong>, callback )</code>.</dd>
 *
 *   <dt><code>on</code></dt>
 *       <dd><code>function ( node, subscription, fireEvent )</code> The
 *       implementation logic for subscription.  Any special setup you need to
 *       do to create the environment for the event being fired.  E.g. native
 *       DOM event subscriptions.  Store subscription related objects and
 *       information on the <code>subscription</code> object.  When the
 *       criteria have been met to fire the synthetic event, call
 *       <code>fireEvent.fire()</code>.</dd>
 *
 *   <dt><code>detach</code></dt>
 *       <dd><code>function ( node, subscription, fireEvent )</code> The
 *       implementation logic for cleaning up a detached subscription. E.g.
 *       detach any DOM subscriptions done in <code>on</code>.</dd>
 *
 *   <dt><code>publishConfig</code></dt>
 *       <dd>(Object) The configuration object that will be used to instantiate
 *       the underlying CustomEvent.  By default, the event is defined with
 *       <code>emitFacade: true</code> so subscribers will receive a DOM-like
 *       event object.</dd>
 *
 *   <dt><code>processArgs</code></dt>
 *       <dd><code>function ( argArray )</code>  Optional method to extract any
 *       additional arguments from the subscription signature.  Using this
 *       allows <code>on</code> signatures like <code>node.on(
 *       &quot;hover&quot;, overCallback, outCallback )</code>.  Be sure that
 *       the args passed in is pruned of any additional arguments using, for
 *       example, <code>argArray.splice(2,1);</code>.  Data returned from the
 *       function will be stored on the <code>subscription</code> object passed
 *       to <code>on</code> and <code>detach</code> under
 *       <code>subscription._extra</code>.</dd>
 *   <dt>
 * </dl>
 *
 * @method Event.define
 * @param type {String} Name given to the synthetic event
 * @param cfg {Object} configuration object.  Pass this as the first
 *                  parameter if it includes the <code>type</code> property.
 * @static
 * @for Event
 * @since 3.1.0
 * @in event-synthetic
 */
Y.Event.define = function (type, cfg) {
    var e = Y.Lang.isObject(type) ?
                type :
                Y.mix(Y.Object(cfg || {}), { type: type });

    // no redefinition allowed
    if (!DOMEvents[e.type]) {
        EvtPlugins[e.type] = DOMEvents[e.type] = new Y.SyntheticEvent(e);
    }
};


}, '@VERSION@' ,{requires:['node-base', 'event-custom']});
