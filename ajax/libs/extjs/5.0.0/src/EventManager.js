/**
 * @class Ext.EventManager
 * Registers event handlers on DOM elements.
 * 
 * This class is deprecated.  Please use the Ext.dom.Element api to atach listeners to
 * DOM Elements.  For example:
 * 
 *     var element = Ext.get('myId');
 *     
 *     element.on('click', function(e) {
 *         // event handling logic here
 *     });
 *
 * @singleton
 * @deprecated 5.0.0
 */
Ext.define('Ext.EventManager', {
    singleton: true,

    mouseLeaveRe: /(mouseout|mouseleave)/,
    mouseEnterRe: /(mouseover|mouseenter)/,

    /**
     * Appends an event handler to an element.  The shorthand version {@link #on} is equivalent.
     * Typically you will use {@link Ext.dom.Element#addListener} directly on an Element in favor of
     * calling this version.
     *
     * {@link Ext.EventManager#on} is an alias for {@link Ext.EventManager#addListener}.
     *
     * @param {String/Ext.dom.Element/HTMLElement/Window} el The html element or id to assign the event handler to.
     *
     * @param {String} eventName The name of the event to listen for.
     * May also be an object who's property names are event names.
     *
     * @param {Function/String} [handler] The handler function the event invokes. A String parameter
     * is assumed to be method name in `scope` object, or Element object if no scope is provided.
     * @param {Ext.event.Event} handler.event The {@link Ext.event.Event EventObject} describing the event.
     * @param {Ext.dom.Element} handler.target The Element which was the target of the event.
     * Note that this may be filtered by using the `delegate` option.
     * @param {Object} handler.options The options object from the addListener call.
     *
     * @param {Object} [scope] The scope (`this` reference) in which the handler function is executed.
     * Defaults to the Element.
     *
     * @param {Object} [options] An object containing handler configuration properties.
     * This may contain any of the following properties (See {@link Ext.dom.Element#addListener}
     * for examples of how to use these options.):
     * @param {Object} options.scope The scope (`this` reference) in which the handler function is executed. Defaults to the Element.
     * @param {String} options.delegate A simple selector to filter the target or look for a descendant of the target. See {@link Ext.dom.Query} for
     * information about simple selectors.
     * @param {Boolean} options.stopEvent True to stop the event. That is stop propagation, and prevent the default action.
     * @param {Boolean} options.preventDefault True to prevent the default action
     * @param {Boolean} options.stopPropagation True to prevent event propagation
     * @param {Boolean} options.normalized False to pass a browser event to the handler function instead of an Ext.event.Event
     * @param {Number} options.delay The number of milliseconds to delay the invocation of the handler after te event fires.
     * @param {Boolean} options.single True to add a handler to handle just the next firing of the event, and then remove itself.
     * @param {Number} options.buffer Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed
     * by the specified number of milliseconds. If the event fires again within that time, the original
     * handler is *not* invoked, but the new handler is scheduled in its place.
     * @param {Ext.dom.Element} options.target Only call the handler if the event was fired on the target Element,
     * *not* if the event was bubbled up from a child node.
     * @param {Boolean} options.capture `true` to initiate capture which will fire the listeners on the target Element *before* any descendant Elements.
     * Normal events start with the target element and propagate upward to ancestor elements, whereas captured events propagate from the top of the DOM
     * downward to descendant elements. This option is the same as the useCapture parameter in the javascript addEventListener method.
     */
    addListener: function(element, eventName, fn, scope, options) {
        //<debug>
        Ext.log.warn("Ext.EventManager is deprecated. " +
            "Use Ext.dom.Element#addListener to attach an event listener.");
        //</debug>
        Ext.get(element).addListener(eventName, fn, scope, options);
    },

    /**
     * Adds a listener to be notified when the browser window is resized and provides resize event buffering (100 milliseconds),
     * passes new viewport width and height to handlers.
     * @param {Function} fn      The handler function the window resize event invokes.
     * @param {Object}   scope   The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
     * @param {Boolean}  [options] Options object as passed to {@link Ext.dom.Element#addListener}
     * @deprecated 5.0.0
     */
    onWindowResize: function(fn, scope, options) {
        //<debug>
        Ext.log.warn("Ext.EventManager is deprecated. " +
            "Use Ext.on('resize', fn) to attach a window resize listener.");
        //</debug>
        Ext.GlobalEvents.on('resize', fn, scope, options);
    },

    /**
     * Adds a listener to be notified when the browser window is unloaded.
     * @param {Function} fn      The handler function the window unload event invokes.
     * @param {Object}   scope   The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
     * @param {Boolean}  options Options object as passed to {@link Ext.dom.Element#addListener}
     * @deprecated 5.0.0
     */
    onWindowUnload: function(fn, scope, options) {
        //<debug>
        Ext.log.warn("Ext.EventManager is deprecated. " +
            "Use Ext.getWin().on('unload', fn) to attach a window unload listener.");
        //</debug>
        Ext.getWin().on('unload', fn, scope, options);
    },

    /**
     * Recursively removes all previous added listeners from an element and its children.
     * Typically you will use {@link Ext.dom.Element#clearListeners} directly on an Element
     * in favor of calling this method.
     * @param {String/Ext.dom.Element/HTMLElement/Window} el The id or html element from which
     * to remove all event handlers.
     * @param {String} eventName (optional) The name of the event.
     * @deprecated 5.0.0
     */
    purgeElement: function(element, eventName) {
        //<debug>
        Ext.log.warn("Ext.EventManager is deprecated. " +
            "Call clearListeners() on a Ext.dom.Element to remove all listeners.");
        //</debug>
        Ext.get(element).clearListeners();
    },

    /**
     * Removes all event handers from an element.  Typically you will use {@link
     * Ext.dom.Element#clearListeners} directly on an Element in favor of calling this method.
     * @param {String/Ext.dom.Element/HTMLElement/Window} el The id or html element from which
     * to remove all event handlers.
     * @deprecated 5.0.0
     */
    removeAll: function(element) {
        //<debug>
        Ext.log.warn("Ext.EventManager is deprecated. " +
            "Call clearListeners() on a Ext.dom.Element to remove all listeners.");
        //</debug>
        Ext.get(element).clearListeners();
    },

    /**
     * Removes an event handler from an element.  The shorthand version {@link #un} is equivalent.  Typically
     * you will use {@link Ext.dom.Element#removeListener} directly on an Element in favor of calling this version.
     *
     * {@link Ext.EventManager#on} is an alias for {@link Ext.EventManager#addListener}.
     *
     * @param {String/Ext.dom.Element/HTMLElement/Window} el The id or html element from which to remove the listener.
     * @param {String} eventName The name of the event.
     * @param {Function} fn The handler function to remove. **This must be a reference to the function passed
     * into the {@link #addListener} call.**
     * @param {Object} scope If a scope (`this` reference) was specified when the listener was added,
     * then this must refer to the same object.
     */
    removeListener: function(element, eventName, fn, scope, options) {
        //<debug>
        Ext.log.warn("Ext.EventManager is deprecated. " +
            "Use Ext.dom.Element#removeListener to remove an event listener.");
        //</debug>
        Ext.get(element).removeListener(eventName, fn, scope, options);
    },

    /**
     * Removes the passed window resize listener.
     * @param {Function} fn        The method the event invokes
     * @param {Object}   scope    The scope of handler
     * @deprecated 5.0.0
     */
    removeResizeListener: function(fn, scope) {
        //<debug>
        Ext.log.warn("Ext.EventManager is deprecated. " +
            "Use Ext.on('resize', fn) to detach a window resize listener.");
        //</debug>
        Ext.GlobalEvents.un('resize', fn, scope);
    },

    /**
     * Removes the passed window unload listener.
     * @param {Function} fn        The method the event invokes
     * @param {Object}   scope    The scope of handler
     * @deprecated 5.0.0
     */
    removeUnloadListener: function(fn, scope) {
        //<debug>
        Ext.log.warn("Ext.EventManager is deprecated. " +
            "Use Ext.getWin().un('unload', fn) to detach a window unload listener.");
        //</debug>
        Ext.getWin().un('unload', fn, scope);
    },

    /**
     * Stop the event (preventDefault and stopPropagation)
     * @param {Event} event The event to stop
     * @deprecated 5.0.0
     */
    stopEvent: function(event) {
        //<debug>
        Ext.log.warn("Ext.EventManager.stopEvent() is deprecated. " +
            "Call stopEvent() directly on the Ext.event.Event instance instead.");
        //</debug>
        this.stopPropagation(event);
        this.preventDefault(event);
    },

    /**
     * Cancels bubbling of the event.
     * @param {Event} event The event to stop bubbling.
     * @deprecated 5.0.0
     */
    stopPropagation: function(event) {
        //<debug>
        Ext.log.warn("Ext.EventManager.stopPropagation() is deprecated. " +
            "Call stopPropagation() directly on the Ext.event.Event instance instead.");
        //</debug>
        event = event.browserEvent || event;
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    /**
     * Prevents the browsers default handling of the event.
     * @param {Event} event The event to prevent the default
     * @deprecated 5.0.0
     */
    preventDefault: function(event) {
        //<debug>
        Ext.log.warn("Ext.EventManager.preventDefault() is deprecated. " +
            "Call preventDefault() directly on the Ext.event.Event instance instead.");
        //</debug>
        event = event.browserEvent || event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
            // Some keys events require setting the keyCode to -1 to be prevented
            try {
              // all ctrl + X and F1 -> F12
              if (event.ctrlKey || event.keyCode > 111 && event.keyCode < 124) {
                  event.keyCode = -1;
              }
            } catch (e) {
                // see this outdated document http://support.microsoft.com/kb/934364/en-us for more info
            }
        }
    },

    /**
     * Get the id of the element. If one has not been assigned, automatically assign it.
     * @param {HTMLElement/Ext.dom.Element} element The element to get the id for.
     * @return {String} id
     * @deprecated 5.0.0
     */
    getId: function(element) {
        //<debug>
        Ext.log.warn("Ext.EventManager.getId() is deprecated. " +
            "Call Ext.get() to assign ids to elements.");
        //</debug>
        element = Ext.get(element);
        return element.id;
    },

    /**
     * Gets the related target from the event.
     * @param {Object} event The event
     * @return {HTMLElement} The related target.
     * @deprecated 5.0.0
     */
    getRelatedTarget: function(event) {
        //<debug>
        Ext.log.warn("Ext.EventManager.getRelatedTarget() is deprecated. " +
            "Call getRelatedTarget() directly on the Ext.event.Event instance instead.");
        //</debug>
        event = event.browserEvent || event;
        var target = event.relatedTarget;
        if (!target) {
            if (this.mouseLeaveRe.test(event.type)) {
                target = event.toElement;
            } else if (this.mouseEnterRe.test(event.type)) {
                target = event.fromElement;
            }
        }
        return this.resolveTextNode(target);
    },

    /**
     * Gets the x coordinate from the event
     * @param {Object} event The event
     * @return {Number} The x coordinate
     * @deprecated 5.0.0
     */
    getPageX: function(event) {
        //<debug>
        Ext.log.warn("Ext.EventManager.getPageX() is deprecated. " +
            "Call getX() directly on the Ext.event.Event instance instead.");
        //</debug>
        return this.getPageXY(event)[0];
    },

    /**
     * Gets the x & y coordinate from the event
     * @param {Object} event The event
     * @return {Number[]} The x/y coordinate
     * @deprecated 5.0.0
     */
    getPageXY: function(event) {
        //<debug>
        Ext.log.warn("Ext.EventManager.getPageXY() is deprecated. " +
            "Call getXY() directly on the Ext.event.Event instance instead.");
        //</debug>
        event = event.browserEvent || event;
        var x = event.pageX,
            y = event.pageY,
            docEl = doc.documentElement,
            body = doc.body;

        // pageX/pageY not available (undefined, not null), use clientX/clientY instead
        if (!x && x !== 0) {
            x = event.clientX + (docEl && docEl.scrollLeft || body && body.scrollLeft || 0) - (docEl && docEl.clientLeft || body && body.clientLeft || 0);
            y = event.clientY + (docEl && docEl.scrollTop  || body && body.scrollTop  || 0) - (docEl && docEl.clientTop  || body && body.clientTop  || 0);
        }
        return [x, y];
    },

    /**
     * Gets the y coordinate from the event
     * @param {Object} event The event
     * @return {Number} The y coordinate
     * @deprecated 5.0.0
     */
    getPageY: function(event) {
        //<debug>
        Ext.log.warn("Ext.EventManager.getPageY() is deprecated. " +
            "Call getY() directly on the Ext.event.Event instance instead.");
        //</debug>
        return this.getPageXY(event)[1];
    },

    /**
     * Gets the target of the event.
     * @param {Object} event The event
     * @return {HTMLElement} target
     * @deprecated 5.0.0
     */
    getTarget: function(event) {
        //<debug>
        Ext.log.warn("Ext.EventManager.getTarget() is deprecated. " +
            "Call getTarget() directly on the Ext.event.Event instance instead.");
        //</debug>
        event = event.browserEvent || event;
        return EventManager.resolveTextNode(event.target || event.srcElement);
    },

    // technically no need to browser sniff this, however it makes
    // no sense to check this every time, for every event, whether
    // the string is equal.
    /**
     * Resolve any text nodes accounting for browser differences.
     * @private
     * @param {HTMLElement} node The node
     * @return {HTMLElement} The resolved node
     * @deprecated 5.0.0
     */
    resolveTextNode: Ext.isGecko ?
        function(node) {
            if (node) {
                // work around firefox bug, https://bugzilla.mozilla.org/show_bug.cgi?id=101197
                var s = HTMLElement.prototype.toString.call(node);
                if (s !== '[xpconnect wrapped native prototype]' && s !== '[object XULElement]') {
                    return node.nodeType == 3 ? node.parentNode: node;
                }
            }
        }
        :
        function(node) {
            return node && node.nodeType == 3 ? node.parentNode: node;
        }
}, function(EventManager) {
    /**
     * @member Ext.EventManager
     * @method on
     * @inheritdoc Ext.EventManager#addListener
     */
    EventManager.on = EventManager.addListener;

    /**
     * @member Ext.EventManager
     * @method un
     * @inheritdoc Ext.EventManager#removeListener
     */
    EventManager.un = EventManager.removeListener;
});