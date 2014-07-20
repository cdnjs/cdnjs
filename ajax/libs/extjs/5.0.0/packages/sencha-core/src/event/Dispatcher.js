/**
 * @private
 */
Ext.define('Ext.event.Dispatcher', {

    requires: [
        'Ext.event.ListenerStack',
        'Ext.event.Controller'
    ],

    statics: {
        getInstance: function() {
            if (!this.instance) {
                this.instance = new this();
            }

            return this.instance;
        },

        setInstance: function(instance) {
            this.instance = instance;

            return this;
        }
    },

    baseHasListeners: {
        _decr_: function (ev) {
            if (! --this[ev]) {
                // Delete this entry, since 0 does not mean no one is listening, just
                // that no one is *directly* listening. This allows the eventBus or
                // class observers to "poke" through and expose their presence.
                delete this[ev];
            }
        },
        _incr_: function (ev) {
            if (this.hasOwnProperty(ev)) {
                // if we already have listeners at this level, just increment the count...
                ++this[ev];
            } else {
                // otherwise, start the count at 1 (which hides whatever is in our prototype
                // chain)...
                this[ev] = 1;
            }
        }
    },

    hasListeners: {},

    config: {
        publishers: {}
    },

    wildcard: '*',

    constructor: function(config) {
        this.listenerStacks = {};

        this.captureListenerStacks = {};

        this.directListenerStacks = {};

        this.activePublishers = {};

        this.publishersCache = {};

        this.noActivePublishers = [];

        this.controller = null;

        this.initConfig(config);

        return this;
    },

    getListenerStack: function(targetType, target, eventName, createIfNotExist) {
        return this.doGetListenerStack(
            this.listenerStacks,
            targetType,
            target,
            eventName,
            createIfNotExist
        );
    },

    getCaptureListenerStack: function(targetType, target, eventName, createIfNotExist) {
        return this.doGetListenerStack(
            this.captureListenerStacks,
            targetType,
            target,
            eventName,
            createIfNotExist
        );
    },

    getDirectListenerStack: function(targetType, target, eventName, createIfNotExist) {
        return this.doGetListenerStack(
            this.directListenerStacks,
            targetType,
            target,
            eventName,
            createIfNotExist
        );
    },

    doGetListenerStack: function(listenerStacks, targetType, target, eventName, createIfNotExist) {

        //var exampleListenerStacks = {
        //    element: {
        //        '#someId': {
        //            click: new Ext.event.ListenerStack()
        //        }
        //    },
        //    component: {
        //
        //    }
        //};


        var map = listenerStacks[targetType],
            listenerStack;

        if (!map) {
            if (createIfNotExist) {
                listenerStacks[targetType] = map = {};
            }
            else {
                return null;
            }
        }

        map = map[target];

        if (!map) {
            if (createIfNotExist) {
                listenerStacks[targetType][target] = map = {};
            }
            else {
                return null;
            }
        }

        listenerStack = map[eventName];

        if (!listenerStack) {
            if (createIfNotExist) {
                map[eventName] = listenerStack = new Ext.event.ListenerStack();
            }
            else {
                return null;
            }
        }

        return listenerStack;
    },

    getController: function(targetType, target, eventName, connectedController) {
        var me = this,
            controller = me.controller,
            info = {
                targetType: targetType,
                target: target,
                eventName: eventName
            };

        if (!controller) {
            me.controller = controller = new Ext.event.Controller(me);
        }

        if (controller.isFiring) {
            controller = new Ext.event.Controller(me);
        }

        controller.setInfo(info);

        if (connectedController && controller !== connectedController) {
            controller.connect(connectedController);
        }

        return controller;
    },

    applyPublishers: function(publishers) {
        var i, publisher;

        this.publishersCache = {};

        for (i in publishers) {
            if (publishers.hasOwnProperty(i)) {
                publisher = publishers[i];

                this.registerPublisher(publisher);
            }
        }

        return publishers;
    },

    registerPublisher: function(publisher) {
        var activePublishers = this.activePublishers,
            targetType = publisher.getTargetType(),
            publishers = activePublishers[targetType];

        if (!publishers) {
            activePublishers[targetType] = publishers = [];
        }

        publishers.push(publisher);

        publisher.setDispatcher(this);

        return this;
    },

    getCachedActivePublishers: function(targetType, eventName) {
        var cache = this.publishersCache,
            publishers;

        if ((publishers = cache[targetType]) && (publishers = publishers[eventName])) {
            return publishers;
        }

        return null;
    },

    cacheActivePublishers: function(targetType, eventName, publishers) {
        var cache = this.publishersCache;

        if (!cache[targetType]) {
            cache[targetType] = {};
        }

        cache[targetType][eventName] = publishers;

        return publishers;
    },

    getActivePublishers: function(targetType, eventName) {
        var publishers = this.getCachedActivePublishers(targetType, eventName),
            activePublishers, domPublisher, i, ln, publisher;

        if (publishers) {
            return publishers;
        }

        activePublishers = this.activePublishers[targetType];

        if (activePublishers) {
            publishers = [];

            for (i = 0,ln = activePublishers.length; i < ln; i++) {
                publisher = activePublishers[i];

                if (publisher.handles(eventName)) {
                    publishers.push(publisher);
                }


            }

            if (!publishers.length && targetType === 'element') {
                // if no publishers explicitly handle the given DOM event, fall back
                // to Dom publisher, if available.
                domPublisher = this.getPublisher('dom');
                if (domPublisher) {
                    publishers.push(domPublisher);
                }
            }
        }
        else {
            publishers = this.noActivePublishers;
        }

        return this.cacheActivePublishers(targetType, eventName, publishers);
    },

    hasListener: function(targetType, target, eventName) {
        var listenerStack = this.getListenerStack(targetType, target, eventName),
            captureListenerStack = this.getCaptureListenerStack(targetType, target, eventName),
            hasListener = false;

        if (listenerStack) {
            hasListener = listenerStack.count() > 0;
        }
        if (!hasListener && targetType === 'element') {
            
            hasListener = captureListenerStack.count() > 0;
        }

        return hasListener;
    },

    getHasListeners: function (type, observable) {
        var has = this.hasListeners,
            ret = observable && observable.hasListeners;

        if (!ret) {
            ret = has[type] || (has[type] = Ext.Object.chain(this.baseHasListeners));

            if (observable) {
                observable.hasListeners = ret = Ext.Object.chain(ret);
            }
        }

        return ret;
    },

    addListener: function(targetType, target, eventName, fn, scope, options, order, observable) {
        options = options || {};
        var publishers = this.getActivePublishers(targetType, eventName),
            ln = publishers.length,
            i, result;

        result = this.doAddListener(targetType, target, eventName, fn, scope, options, order, observable);

        if (result) {
            for (i = 0; i < ln; i++) {
                publishers[i].subscribe(target, eventName, options, observable);
            }
        }

        return result;
    },

    doAddListener: function(targetType, target, eventName, fn, scope, options, order, observable) {
        options = options || {};
        var me = this,
            listenerStack, domPublisher;

        if (targetType === 'element') {
            if (options.capture) {
                listenerStack = me.getCaptureListenerStack(targetType, target, eventName, true);
            } else {
                domPublisher = me.getPublisher('dom');
                if (options.delegated === false || domPublisher.directEvents[eventName] ||
                        // When the delegated listener target is not the window object, we
                        // use direct listeners on the window object
                        (!domPublisher.isTargetWin && target === '#ext-window')) {
                    listenerStack = me.getDirectListenerStack(targetType, target, eventName, true);
                }
            }
        }

        if (!listenerStack) {
            listenerStack = me.getListenerStack(targetType, target, eventName, true);
        }

        me.getHasListeners(targetType, observable)._incr_(eventName);

        return listenerStack.add(fn, scope, options, order, observable);
    },

    removeListener: function(targetType, target, eventName, fn, scope, options, order, observable) {
        options = options || {};
        var publishers = this.getActivePublishers(targetType, eventName),
            ln = publishers.length,
            i, result;

        result = this.doRemoveListener(targetType, target, eventName, fn, scope, options, order, observable);

        if (result) {
            for (i = 0; i < ln; i++) {
                publishers[i].unsubscribe(target, eventName, null, options, observable);
            }
        }

        return result;
    },

    doRemoveListener: function(targetType, target, eventName, fn, scope, options, order, observable) {
        options = options || {};
        var me = this,
            listenerStack, domPublisher;

        if (targetType === 'element') {
            if (options.capture) {
                listenerStack = me.getCaptureListenerStack(targetType, target, eventName);
            } else {
                domPublisher = me.getPublisher('dom');
                if (options.delegated === false || domPublisher.directEvents[eventName] ||
                        // When the delegated listener target is not the window object, we
                        // use direct listeners on the window object
                        (!domPublisher.isTargetWin && target === '#ext-window')) {
                    listenerStack = me.getDirectListenerStack(targetType, target, eventName);
                }
            }
        }

        if (!listenerStack) {
            listenerStack = me.getListenerStack(targetType, target, eventName);
        }

        // If there are listeners for the event, and the passed function/scope combination was matched and removed
        // then we decrement the hasListeners counter.
        if (listenerStack && listenerStack.remove(fn, scope, order)) {
            me.getHasListeners(targetType, observable)._decr_(eventName);
            return true;
        }
        return false;
    },

    clearListeners: function(targetType, target, observable) {
        var me = this,
            listenerStacks = me.listenerStacks[targetType],
            captureListenerStacks = me.captureListenerStacks[targetType],
            directListenerStacks;

        if (listenerStacks) {
            me.doClearListeners(listenerStacks, targetType, target, {}, observable);
        }

        if (captureListenerStacks) {
            me.doClearListeners(captureListenerStacks, targetType, target, {
                capture: true
            }, observable);
        }

        if (observable) {
            directListenerStacks = me.directListenerStacks[targetType];
            if (directListenerStacks) {
                me.doClearListeners(directListenerStacks, targetType, target, {
                    delegated: false
                }, observable);
            }
        }
    },

    doClearListeners: function(listenerStacks, targetType, target, options, observable) {
        var me = this,
            stacks = listenerStacks[target],
            hasListeners = me.getHasListeners(targetType, observable),
            eventName, i, ln, publishers;

        if (stacks) {
            for (eventName in stacks) {
                publishers = me.getActivePublishers(targetType, eventName);

                for (i = 0, ln = publishers.length; i < ln; i++) {
                    publishers[i].unsubscribe(target, eventName, true, options, observable);
                }

                if (!(hasListeners[eventName] -= stacks[eventName].length)) {
                    delete hasListeners[eventName];
                }
            }

            delete listenerStacks[target];
        }
    },

    dispatchEvent: function(targetType, target, eventName) {
        var publishers = this.getActivePublishers(targetType, eventName),
            ln = publishers.length,
            i;

        if (ln > 0) {
            for (i = 0; i < ln; i++) {
                publishers[i].notify(target, eventName);
            }
        }

        return this.doDispatchEvent.apply(this, arguments);
    },

    doDispatchEvent: function(targetType, target, eventName, args, action, connectedController, capture) {
        var listenerStack = capture ? this.getCaptureListenerStack(targetType, target, eventName) :
                    this.getListenerStack(targetType, target, eventName, capture),
            wildcardStacks = this.getWildcardListenerStacks(targetType, target, eventName, capture),
            controller;

        if (!listenerStack || !listenerStack.length) {
            if (!wildcardStacks.length && !action) {
                return;
            }
        }
        else {
            wildcardStacks.push(listenerStack);
        }

        controller = this.getController(targetType, target, eventName, connectedController);
        controller.setListenerStacks(wildcardStacks);
        controller.fire(args, action);

        return !controller.isInterrupted();
    },

    dispatchDirectEvent: function(targetType, target, eventName, args) {
        var listenerStack = this.getDirectListenerStack(targetType, target, eventName),
            controller;

        if (listenerStack && listenerStack.length) {
            controller = this.getController(targetType, target, eventName);
            controller.setListenerStacks([listenerStack]);
            controller.fire(args);

            return !controller.isInterrupted();
        }
    },

    getWildcardListenerStacks: function(targetType, target, eventName, capture) {
        var stacks = [],
            wildcard = this.wildcard,
            isEventNameNotWildcard = eventName !== wildcard,
            isTargetNotWildcard = target !== wildcard,
            stack;

        if (isEventNameNotWildcard && (stack = this.getListenerStack(targetType, target, wildcard, capture))) {
            stacks.push(stack);
        }

        if (isTargetNotWildcard && (stack = this.getListenerStack(targetType, wildcard, eventName, capture))) {
            stacks.push(stack);
        }

        return stacks;
    },

    getPublisher: function (name) {
        return this.getPublishers()[name];
    },

    destroy: function() {
        var publishers = this.getPublishers(),
            name;

        for (name in publishers) {
            publishers[name].destroy();
        }
    }
});
