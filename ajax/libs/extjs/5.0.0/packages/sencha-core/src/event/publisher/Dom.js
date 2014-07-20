/**
 * @private
 */
Ext.define('Ext.event.publisher.Dom', {
    extend: 'Ext.event.publisher.Publisher',

    requires: [
        'Ext.env.Browser',
        'Ext.event.Event',
        'Ext.GlobalEvents'
    ],

    targetType: 'element',

    idOrClassSelectorRegex: /^([#|\.])([\w\-]+)$/,

    classNameSplitRegex: /\s+/,

    SELECTOR_ALL: '*',

    // The following events do not bubble, but can still be "captured" at the top of
    // the DOM,  For these events, when the delegated event model is used, we attach a
    // single listener on the window object using the "useCapture" option.
    captureEvents: {
        resize: 1,
        focus: 1,
        blur: 1,
        paste: 1,
        input: 1,
        change: 1,
        animationstart: 1,
        animationend: 1,
        scroll: 1
    },

    // The following events do not bubble, and cannot be "captured".  The only way to
    // listen for these events is via a listener attached directly to the target element
    directEvents: {
        mouseenter: 1,
        mouseleave: 1,
        pointerenter: 1,
        pointerleave: 1,
        MSPointerEnter: 1,
        MSPointerLeave: 1,
        load: 1,
        unload: 1,
        beforeunload: 1,
        error: 1,
        DOMContentLoaded: 1,
        DOMFrameContentLoaded: 1
    },

    /**
     * In browsers that implement pointerevents when a pointerdown is triggered by touching
     * the screen, pointerover and pointerenter events will be fired immmediately before
     * the pointerdown. Also pointerout and pointerleave will be fired immediately after
     * pointerup when triggered using touch input.  For a consistent cross-browser
     * experience on touch-screens we block pointerover, pointerout, pointerenter, and
     * pointerleave when triggered by touch input, since in most cases pointerover/pointerenter
     * behavior is not desired when touching the screen.  Note: this should only affect
     * events with pointerType === 'touch' or pointerType === 'pen', we do NOT want to
     * block these events when triggered using a mouse.
     * See also:
     *     http://www.w3.org/TR/pointerevents/#the-pointerdown-event
     *     http://www.w3.org/TR/pointerevents/#the-pointerenter-event
     * @private
     */
    blockedPointerEvents: {
        pointerover: 1,
        pointerout: 1,
        pointerenter: 1,
        pointerleave: 1,
        MSPointerOver: 1,
        MSPointerOut: 1,
        MSPointerEnter: 1,
        MSPointerLeave: 1
    },

    /**
     * Browsers with pointer events may implement "compatibility" mouse events:
     * http://www.w3.org/TR/pointerevents/#compatibility-mapping-with-mouse-events
     * The behavior implemented in handlers for mouse over/out/enter/leave is not typically
     * desired when touching the screen, so we map all of these events to their pointer
     * counterparts in Ext.Element event translation code, so that they can be blocked
     * via "blockedPointerEvents".  The only scenario where this breaks down is in IE10
     * with mouseenter/mouseleave, since MSPointerEnter/MSPointerLeave were not implemented
     * in IE10.  For these 2 events we have to resort to a different method - capturing
     * the timestamp of the last pointer event that has pointerType == 'touch', and if the
     * mouse event occurred within a certain threshold we can reasonably assume it occurred
     * because of a touch on the screen (see isEventBlocked)
     * @private
     */
    blockedCompatibilityMouseEvents: {
        mouseenter: 1,
        mouseleave: 1
    },

    constructor: function() {
        var me = this,
            doc = document,
            defaultView = doc.defaultView,
            eventToVendorMap = me.eventToVendorMap = {},
            vendorToEventMap = me.vendorToEventMap = {},
            handledEvents = me.handledEvents,
            browser = Ext.browser,
            i, ln, name;

        me.captureSubscribers = {};
        me.directSubscribers = {};

        // this map tracks all the names of the events that currently have a global
        // event listener attached.  Allows this publisher to dynamically attach
        // listeners as subscribers are added, since it's difficult to know the universe
        // of DOM event names up front.
        me.globalListeners = {};

        if ((Ext.os.is.iOS && Ext.os.version.getMajor() < 5) ||
            !(defaultView && defaultView.addEventListener)) {
            // Delegated listeners will get attached to the document object because
            // attaching to the window object will not work.  In IE8 this is needed because
            // events do not bubble up to the window - bubbling stops at the document
            // object.  The iOS < 5 check was carried forward from Sencha Touch 2.3 -
            // Not sure why it was needed.  The check for (defaultView && defaultView.addEventListener)
            // was carried forward as well - it may be required for older mobile browsers.
            me.target = doc;
            // The isTargetWin flag, when false, indicates that the listener target is
            // not the window object. This means the delegated event system cannot be used
            // to listen for events on the window object - e.g. Ext.getWin().on(...).
            // The window object will need to have directly attached listeners for these
            // browsers.
            me.isTargetWin = false;
        } else {
            /**
             * @property {Object} target the DOM target to which listeners are attached for
             * delegated events.
             * @private
             */
            me.target = defaultView;
            me.isTargetWin = true;
        }

        me.initHandlers();

        if (handledEvents) {
            // If the publisher has handledEvents we attach listeners up front for those
            // events. Dom publisher does not have a list of event names, but attaches
            // listeners dynamically as subscribers are subscribed.  This allows it to
            // handle all DOM events that are not explicitly handled by another publisher.
            // Subclasses such as Gesture must explicitly list their handledEvents.
            for (i = 0,ln = handledEvents.length; i < ln; i++) {
                this.addDelegatedListener(handledEvents[i]);
            }
        } else {
            // processing that's applicable only to Dom publisher and not sublcasses goes here
            if (browser.is.WebKit) {
                // in webkit a handful of events need to be mapped to vendor-specific names.
                eventToVendorMap.transitionend = browser.getVendorProperyName('transitionEnd');
                eventToVendorMap.animationstart = browser.getVendorProperyName('animationStart');
                eventToVendorMap.animationend = browser.getVendorProperyName('animationEnd');

                // create a reverse map so we can unmap the vendor name to the real name
                // when we receive a vendor event.
                for (name in eventToVendorMap) {
                    vendorToEventMap[eventToVendorMap[name]] = name;
                }
            }
        }

        return me.callParent();
    },

    initHandlers: function() {
        var me = this;

        me.onDelegatedEvent = Ext.bind(me.onDelegatedEvent, me);
        me.onDirectEvent = Ext.bind(me.onDirectEvent, me);
    },

    handles: function() {
        // Dispatcher uses DOM publisher as the catch-all for all DOM events that are
        // not handled by other publishers.  It does not explicitly list its handled events.
        return false;
    },

    /**
     * Returns a map which tracks subscribers for each element, keyed by id, e.g.
     * {
     *     someid: {
     *         click: {
     *             $length: 2
     *             selector: ['#someid .somecls']
     *         },
     *         touchstart: ...
     *     },
     *     someOtherId: ...
     * }
     * @private
     * @param {String} eventName
     * @param {Boolean} capture `true` to return "capture" subscribers (those for which
     * top-down propagation was requested).  Capture subscribers are kept in a separate
     * map, since they are processed before the regular (bubble) subscribers,
     * see doPublish()
     */
    getSubscribers: function(eventName, capture) {
        var subscribers = capture ? this.captureSubscribers : this.subscribers,
            eventSubscribers = subscribers[eventName];

        if (!eventSubscribers) {
            eventSubscribers = subscribers[eventName] = {
                id: {
                    $length: 0
                },
                className: {
                    $length: 0
                },
                selector: [],
                all: 0,
                $length: 0
            };
        }

        return eventSubscribers;
    },

    /**
     * returns a map of "direct" subscribers - subscribers for which a direct DOM listener
     * was requested.  The shape of this map is the same as "subscribers".
     * see {@link #getSubscribers}
     * @private
     */
    getDirectSubscribers: function(id, eventName) {
        var directSubscribers = this.directSubscribers,
            idSubscribers = directSubscribers[id] || (directSubscribers[id] = {}),
            eventSubscribers = idSubscribers[eventName] ||
                (idSubscribers[eventName] = { $length: 0 });

        return eventSubscribers;
    },

    addDelegatedListener: function(eventName) {
        this.target.addEventListener(
            eventName, this.onDelegatedEvent, this.captureEvents[eventName]
        );
    },

    removeDelegatedListener: function(eventName) {
        this.target.removeEventListener(
            eventName, this.onDelegatedEvent, this.captureEvents[eventName]
        );
    },

    addDirectListener: function(eventName, element, capture) {
        element.addEventListener(eventName, this.onDirectEvent, capture);
    },

    removeDirectListener: function(eventName, element, capture) {
        element.removeEventListener(eventName, this.onDirectEvent, capture);
    },

    subscribe: function(target, eventName, options, observable) {
        var me = this,
            capture = !!options.capture,
            idOrClassSelectorMatch = target.match(me.idOrClassSelectorRegex),
            subscribers, idSubscribers, classNameSubscribers, selectorSubscribers,
            directSubscribers, dom, type, value;

        if (options.delegated !== false && !me.directEvents[eventName] &&
            !(target === '#ext-window' && !me.isTargetWin)) {
            // delegated events get a listener attached at the very top of the DOM.
            // For Dom publisher we attach events dynamically as they are subscribed to.
            // All other subclasses should have a handledEvents array with listeners
            // attached up front (see constructor).  This allows the Dispatcher to use
            // DOM publisher as a catch-all for any events that are not handled by
            // another publisher.
            if (!me.handledEvents && !me.globalListeners[eventName]) {
                me.addDelegatedListener(me.eventToVendorMap[eventName] || eventName);
                this.globalListeners[eventName] = 1;
            }
        } else {
            // non-delegated events get a listener attached directly to their element
            dom = observable.dom;

            directSubscribers =  this.getDirectSubscribers(dom.id, eventName);

            // track the number of subscribers for this eventName/element combination.
            // This is used to determine when it is safe to remove the dom listener
            if (++directSubscribers.$length === 1) {
                // non-delegated events get a direct listener on the target.
                me.addDirectListener(eventName, dom, capture);
            }

            if (!idOrClassSelectorMatch) {
                // save the selector so we can check the target against it before
                // dispatching
                (directSubscribers.selector ||
                        (directSubscribers.selector = [])).push(target);
            }

            // The emulated propagation phase (doPublish) is skipped for direct
            // listeners because they rely on natural dom propagation.  As a result,
            // we do not need to add direct subscribers to the global subscriber
            // maps, so we can just return now.
            return;
        }

        subscribers = me.getSubscribers(eventName, capture);
        idSubscribers = subscribers.id;
        classNameSubscribers = subscribers.className;
        selectorSubscribers = subscribers.selector;

        if (idOrClassSelectorMatch) {
            type = idOrClassSelectorMatch[1];
            value = idOrClassSelectorMatch[2];

            if (type === '#') {
                if (idSubscribers.hasOwnProperty(value)) {
                    idSubscribers[value]++;
                    return;
                }

                idSubscribers[value] = 1;
                idSubscribers.$length++;
            }
            else {
                if (classNameSubscribers.hasOwnProperty(value)) {
                    classNameSubscribers[value]++;
                    return;
                }

                classNameSubscribers[value] = 1;
                classNameSubscribers.$length++;
            }
        }
        else {
            if (target === this.SELECTOR_ALL) {
                subscribers.all++;
            }
            else {
                if (selectorSubscribers.hasOwnProperty(target)) {
                    selectorSubscribers[target]++;
                    return;
                }

                selectorSubscribers[target] = 1;
                selectorSubscribers.push(target);
            }
        }

        subscribers.$length++;
    },

    unsubscribe: function(target, eventName, all, options, observable) {
        var me = this,
            capture = !!options.capture,
            idOrClassSelectorMatch = target.match(me.idOrClassSelectorRegex),
            subscribers, idSubscribers, classNameSubscribers,
            selectorSubscribers, directSubscribers, type, value, dom, id;

        if (options.delegated === false || me.directEvents[eventName] ||
            (target === Ext.windowId && !me.isTargetWin)) {
            dom = observable.dom;
            id = dom.id;
            directSubscribers = me.getDirectSubscribers(id, eventName);

            // non-delegated events get a direct listener on the target, so we need to
            // remove it now if there are no remaining subscribers.
            if (all) {
                if (directSubscribers.$length) {
                    me.removeDirectListener(eventName, dom, capture);
                }
                delete me.directSubscribers[id];
            } else if (!--directSubscribers.$length) {
                me.removeDirectListener(eventName, dom, capture);
                delete me.directSubscribers[id][eventName];
            } else if (!idOrClassSelectorMatch) {
                Ext.Array.remove(directSubscribers.selector, target);
            }

            // we don't add direct subscribers to the global subscriber maps (see subscribe())
            return;
        }

        subscribers = me.getSubscribers(eventName, capture);
        idSubscribers = subscribers.id;
        classNameSubscribers = subscribers.className;
        selectorSubscribers = subscribers.selector;

        if (idOrClassSelectorMatch) {
            type = idOrClassSelectorMatch[1];
            value = idOrClassSelectorMatch[2];

            if (type === '#') {
                if (!idSubscribers.hasOwnProperty(value) || (!all && --idSubscribers[value] > 0)) {
                    return;
                }

                delete idSubscribers[value];
                idSubscribers.$length--;
            }
            else {
                if (!classNameSubscribers.hasOwnProperty(value) || (!all && --classNameSubscribers[value] > 0)) {
                    return;
                }

                delete classNameSubscribers[value];
                classNameSubscribers.$length--;
            }
        }
        else {
            if (target === me.SELECTOR_ALL) {
                if (all) {
                    subscribers.all = 0;
                }
                else {
                    subscribers.all--;
                }
            }
            else {
                if (!selectorSubscribers.hasOwnProperty(target) || (!all && --selectorSubscribers[target] > 0)) {
                    return;
                }

                delete selectorSubscribers[target];
                Ext.Array.remove(selectorSubscribers, target);
            }
        }

        subscribers.$length--;
    },

    getPropagatingTargets: function(target) {
        var targets = [];

        if (!target) {
            return targets;
        }

        do {
            targets[targets.length] = target;

            target = target.parentNode;
        } while (target);

        return targets;
    },

    dispatch: function(target, eventName, args) {
        args.push(args[0].target);
        this.callParent(arguments);
    },

    publish: function(eventName, target, event) {
        var captureSubscribers = this.getSubscribers(eventName, true),
            bubbleSubscribers = this.getSubscribers(eventName),
            wildcardCaptureSubscribers = this.getSubscribers('*', true),
            wildcardBubbleSubscribers = this.getSubscribers('*'),
            captureLen = captureSubscribers.$length,
            bubbleLen = bubbleSubscribers.$length,
            wildcardCaptureLen = wildcardCaptureSubscribers.$length,
            wildcardBubbleLen = wildcardBubbleSubscribers.$length,
            targets;

        if (!captureLen && !bubbleLen && !wildcardCaptureLen && !wildcardBubbleLen) {
            // nothing to publish
            return;
        }

        if (Ext.isArray(target)) {
            // Gesture publisher passes an already created array of propagating targets
            targets = target;
        } else if (this.captureEvents[eventName]) {
            targets = [target];
        } else {
            targets = this.getPropagatingTargets(target);
        }


        // initiate capture phase - during this phase listeners are called from the top down
        // instead of bubbling upward from the target.
        if (!captureLen || !this.doPublish(captureSubscribers, eventName, targets, event, true)) {
            if (wildcardCaptureLen) {
                this.doPublish(wildcardCaptureSubscribers, eventName, targets, event, true);
            }
        }

        // initiate bubble phase. (stopPropagation during the capture phase cancels the entire bubble phase)
        if (!event.isStopped && (!bubbleLen || !this.doPublish(bubbleSubscribers, eventName, targets, event))) {
            if (wildcardBubbleLen) {
                this.doPublish(wildcardBubbleSubscribers, eventName, targets, event);
            }
        }

        return this;
    },

    doPublish: function(subscribers, eventName, targets, event, capture) {
        var idSubscribers = subscribers.id,
            classNameSubscribers = subscribers.className,
            selectorSubscribers = subscribers.selector,
            hasIdSubscribers = idSubscribers.$length > 0,
            hasClassNameSubscribers = classNameSubscribers.$length > 0,
            hasSelectorSubscribers = selectorSubscribers.length > 0,
            hasAllSubscribers = subscribers.all > 0,
            isClassNameHandled = {},
            args = [event],
            hasDispatched = false,
            classNameSplitRegex = this.classNameSplitRegex,
            start = 0,
            end = targets.length,
            increment = 1,
            i, ln, j, subLn, target, id, className, classNames, selector;

        if (capture) {
            start = end - 1;
            end = increment = -1;
        }

        for (i = start; i !== end; i += increment) {
            target = targets[i];
            event.setCurrentTarget(target);

            if (hasIdSubscribers) {
                // We use getAttribute for forms since they can have their properties
                // overridden by children
                // Example:
                //  <form id="myForm">
                //      <input name="id">
                //  </form>
                // form.id === input node named id whereas form.getAttribute("id") === "myForm"
                // only use getAttribute for forms since some targets (document, window)
                // do not have getAttribute()
                id = (target.tagName === 'FORM') ? target.getAttribute('id') :
                        (target === window) ? 'ext-window' : target.id;

                if (id) {
                    if (idSubscribers.hasOwnProperty(id)) {
                        hasDispatched = true;
                        this.dispatch('#' + id, eventName, args, capture);
                    }
                }
            }

            if (hasClassNameSubscribers) {
                className = target.className;

                if (className) {
                    classNames = className.split(classNameSplitRegex);

                    for (j = 0,subLn = classNames.length; j < subLn; j++) {
                        className = classNames[j];

                        if (!isClassNameHandled[className]) {
                            isClassNameHandled[className] = true;

                            if (classNameSubscribers.hasOwnProperty(className)) {
                                hasDispatched = true;
                                this.dispatch('.' + className, eventName, args);
                            }
                        }
                    }
                }
            }

            // Stop propagation
            if (event.isStopped) {
                return hasDispatched;
            }
        }

        if (hasAllSubscribers && !hasDispatched) {
            event.setCurrentTarget(event.browserEvent.target);
            hasDispatched = true;
            this.dispatch(this.SELECTOR_ALL, eventName, args);
            if (event.isStopped) {
                return hasDispatched;
            }
        }

        if (hasSelectorSubscribers) {
            for (j = 0,subLn = targets.length; j < subLn; j++) {
                target = targets[j];

                for (i = 0,ln = selectorSubscribers.length; i < ln; i++) {
                    selector = selectorSubscribers[i];

                        if (Ext.fly(target).is(selector)) {
                            event.setCurrentTarget(target);
                            hasDispatched = true;
                            this.dispatch(selector, eventName, args);
                        }

                    if (event.isStopped) {
                        return hasDispatched;
                    }
                }
            }
        }

        return hasDispatched;
    },

    onDelegatedEvent: function(e, invokeAfter) {
        var me = this,
            type = e.type,
            event;

        event = new Ext.event.Event(e);

        if (me.isEventBlocked(event)) {
            return false;
        }

        me.beforeEvent(event);

        // if a vendor-specific event was fired, convert the name back to the "real" one
        type = event.type = me.vendorToEventMap[type] || type;

        Ext.frameStartTime = e.timeStamp;

        me.publish(type, event.target, event);

        if (invokeAfter !== false) {
            me.afterEvent(event);
        }

        return event;
    },

    /**
     * Handler for directly-attached (non-delegated) dom events
     * @param {Event} e
     * @private
     */
    onDirectEvent: function(e) {
        var me = this,
            type = e.type,
            event = new Ext.event.Event(e),
            eventName, currentTarget, id, selectors, dispatcher, targetType,
            target, el, i, len, selector;

        if (me.isEventBlocked(event)) {
            return;
        }

        me.beforeEvent(event);

        // if a vendor-specific event was fired, convert it back to the "real" one
        eventName = event.type = this.vendorToEventMap[type] || type;
        currentTarget = e.currentTarget;
        id = currentTarget.id;
        selectors =  me.getDirectSubscribers(id, eventName).selector;
        dispatcher = me.dispatcher;
        targetType = me.targetType;
        target = e.target;
        el = target;

        Ext.frameStartTime = e.timeStamp;

        if (target.navigator) {
            id = 'ext-window';
        }

        // For direct listeners we need to set the currentTarget here because it does not
        // get set during construction.  This is because delegated listeners have the
        // currentTarget set during the emulated propagation phase (see doPublish)
        event.setCurrentTarget(currentTarget);

        if (selectors) {
            len = selectors.length;
            while(el !== currentTarget) {
                for (i = 0; i < len; i++) {
                    selector = selectors[i];
                    if (Ext.fly(el).is(selector)) {
                        dispatcher.dispatchDirectEvent(
                            targetType,
                            selector,
                            eventName,
                            [event, target]
                        );
                    }
                }
                el = el.parentNode;
            }
        }

        // Since natural DOM propagation has occurred, no emulated propagation is needed.
        // Simply dispatch the event.
        dispatcher.dispatchDirectEvent(
            targetType,
            '#' + id,
            eventName,
            [event, target]
        );

        me.afterEvent(event);
    },

    beforeEvent: function(e) {
        var browserEvent = e.browserEvent,
            // use full class name, not me.self, so that Dom and Gesture publishers will
            // both place flags on the same object.
            self = Ext.event.publisher.Dom,
            touches, touch;

        if (browserEvent.type === 'touchstart') {
            touches = browserEvent.touches;

            if (touches.length === 1) {
                // capture the coordinates of the first touchstart event so we can use
                // them to eliminate duplicate mouse events if needed, (see isEventBlocked).
                touch = touches[0];
                self.lastTouchStartX = touch.pageX;
                self.lastTouchStartY = touch.pageY;
            }
        }
    },

    afterEvent: function(e) {
        var browserEvent = e.browserEvent,
            type = browserEvent.type,
            // use full class name, not me.self, so that Dom and Gesture publishers will
            // both place flags on the same object.
            self = Ext.event.publisher.Dom,
            GlobalEvents = Ext.GlobalEvents;

        if (GlobalEvents.hasListeners.idle && !GlobalEvents.idleEventMask[type]) {
            GlobalEvents.fireEvent('idle');
        }

        // It is important that the following time stamps are captured after the handlers
        // have been invoked because they need to represent the "exit" time, so that they
        // can be compared against the next "entry" time into onDelegatedEvent or
        // onDirectEvent to detect the time lapse in between the firing of the 2 events.
        // We set these flags on "this.self" so that they can be shared between Dom
        // publisher and subclasses

        if (e.self.pointerEvents[type] && e.pointerType !== 'mouse') {
            // track the last time a pointer event was fired as a result of interaction
            // with the screen, pointerType === 'touch' most likely but could also be
            // pointerType === 'pen' hence the reason we use !== 'mouse', This is used
            // to eliminate potential duplicate "compatibility" mouse events
            // (see isEventBlocked)
            self.lastScreenPointerEventTime = Ext.now();
        }

        if (type === 'touchend') {
            // Capture a time stamp so we can use it to eliminate potential duplicate
            // emulated mouse events on multi-input devices that have touch events,
            // e.g. Chrome on Window8 with touch-screen (see isEventBlocked).
            self.lastTouchEndTime = Ext.now();
        }
    },

    /**
     * Detects if the given event should be blocked from firing because it is an emulated
     * "compatibility" mouse event triggered by a touch on the screen.
     * @param {Ext.event.Event} e
     * @return {Boolean}
     * @private
     */
    isEventBlocked: function(e) {
        var me = this,
            type = e.type,
            // use full class name, not me.self, so that Dom and Gesture publishers will
            // both look for flags on the same object.
            self = Ext.event.publisher.Dom,
            now = Ext.now();

        // prevent emulated pointerover, pointerout, pointerenter, and pointerleave
        // events from firing when triggered by touching the screen.
        return (me.blockedPointerEvents[type] && e.pointerType !== 'mouse')
        ||
            // prevent compatibility mouse events from firing on devices with pointer
            // events - see comment on blockedCompatibilityMouseEvents for more details
            // The time from when the last pointer event fired until when compatibility
            // events are received varies depending on the browser, device, and application
            // so we use 1 second to be safe
            (me.blockedCompatibilityMouseEvents[type] &&
                (now - self.lastScreenPointerEventTime < 1000))
        ||
            (Ext.supports.TouchEvents && e.self.mouseEvents[e.type] &&
            // some browsers (e.g. webkit on Windows 8 with touch screen) emulate mouse
            // events after touch events have fired.  This only seems to happen when there
            // is no movement present, so, for example, a touchstart followed immediately
            // by a touchend would result in the following sequence of events:
            // "touchstart, touchend, mousemove, mousedown, mouseup"
            // yes, you read that right, the emulated mousemove fires before mousedown.
            // However, touch events with movement (touchstart, touchmove, then touchend)
            // do not trigger the emulated mouse events.
            // The side effect of this behavior is that single-touch gestures that expect
            // no movement (e.g. tap) can double-fire - once when the touchstart/touchend
            // occurs, and then again when the emulated mousedown/up occurs.
            // We cannot solve the problem by only listening for touch events and ignoring
            // mouse events, since we may be on a multi-input device that supports both
            // touch and mouse events and we want gestures to respond to both kinds of
            // events.  Instead we have to detect if the mouse event is a "dupe" by
            // checking if its coordinates are near the last touchstart's coordinates,
            // and if it's timestamp is within a certain threshold of the last touchend
            // event's timestamp.  This is because when dealing with multi-touch events,
            // the emulated mousedown event (when it does fire) will fire with approximately
            // the same coordinates as the first touchstart, but within a short time after
            // the last touchend.  We use 15px as the distance threshold, to be on the safe
            // side because the difference in coordinates can sometimes be up to 6px.
            Math.abs(e.pageX - self.lastTouchStartX) < 15 &&
            Math.abs(e.pageY - self.lastTouchStartY) < 15 &&
            // in the majority of cases, the emulated mousedown is observed within
            // 5ms of touchend, however, to be certain we avoid a situation where a
            // gesture handler gets executed twice we use a threshold of 1000ms.  The
            // side effect of this is that if a user touches the screen and then quickly
            // clicks screen in the same spot, the mousedown/mouseup sequence that
            // ensues will not trigger any gesture recognizers.
            (Ext.now() - self.lastTouchEndTime) < 1000);
    },

    //<debug>
    hasSubscriber: function(target, eventName) {
        var match = target.match(this.idOrClassSelectorRegex),
            subscribers = this.getSubscribers(eventName),
            type, value;

        if (match !== null) {
            type = match[1];
            value = match[2];

            if (type === '#') {
                return subscribers.id.hasOwnProperty(value);
            }
            else {
                return subscribers.className.hasOwnProperty(value);
            }
        }
        else {
            return (subscribers.selector.hasOwnProperty(target) && Ext.Array.indexOf(subscribers.selector, target) !== -1);
        }

        return false;
    },
    //</debug>

    getSubscribersCount: function(eventName) {
        return this.getSubscribers(eventName).$length + this.getSubscribers('*').$length;
    },

    destroy: function() {
        var me = this,
            handledEvents = me.handledEvents,
            i, ln, eventName;

        if (handledEvents) {
            for (i = 0, ln = handledEvents.length; i < ln; i++) {
                me.removeDelegatedListener(handledEvents[i]);
            }
        } else {
            for (eventName in me.globalListeners) {
                me.removeDelegatedListener(eventName);
            }
        }
    }
});
