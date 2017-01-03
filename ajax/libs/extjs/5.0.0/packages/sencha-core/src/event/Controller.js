/**
 * @private
 */
Ext.define('Ext.event.Controller', {

    isFiring: false,

    listenerStack: null,

    constructor: function(dispatcher) {
        this.firingListeners = [];
        this.firingArguments = [];
        this.dispatcher = dispatcher;
        return this;
    },

    setInfo: function(info) {
        this.info = info;
    },

    getInfo: function() {
        return this.info;
    },

    setListenerStacks: function(listenerStacks) {
        this.listenerStacks = listenerStacks;
    },

    fire: function(args, action) {
        var listenerStacks = this.listenerStacks,
            firingListeners = this.firingListeners,
            firingArguments = this.firingArguments,
            push = firingListeners.push,
            ln = listenerStacks.length,
            listeners, beforeListeners, currentListeners, afterListeners,
            isActionBefore = false,
            isActionAfter = false,
            i;

        firingListeners.length = 0;

        if (action) {
            if (action.order !== 'after') {
                isActionBefore = true;
            }
            else {
                isActionAfter = true;
            }
        }

        if (ln === 1) {
            listeners = listenerStacks[0].listeners;
            beforeListeners = listeners.before;
            currentListeners = listeners.current;
            afterListeners = listeners.after;

            if (beforeListeners.length > 0) {
                push.apply(firingListeners, beforeListeners);
            }

            if (isActionBefore) {
                push.call(firingListeners, action);
            }

            if (currentListeners.length > 0) {
                push.apply(firingListeners, currentListeners);
            }

            if (isActionAfter) {
                push.call(firingListeners, action);
            }

            if (afterListeners.length > 0) {
                push.apply(firingListeners, afterListeners);
            }
        }
        else {
            for (i = 0; i < ln; i++) {
                beforeListeners = listenerStacks[i].listeners.before;
                if (beforeListeners.length > 0) {
                    push.apply(firingListeners, beforeListeners);
                }
            }

            if (isActionBefore) {
                push.call(firingListeners, action);
            }

            for (i = 0; i < ln; i++) {
                currentListeners = listenerStacks[i].listeners.current;
                if (currentListeners.length > 0) {
                    push.apply(firingListeners, currentListeners);
                }
            }

            if (isActionAfter) {
                push.call(firingListeners, action);
            }

            for (i = 0; i < ln; i++) {
                afterListeners = listenerStacks[i].listeners.after;
                if (afterListeners.length > 0) {
                    push.apply(firingListeners, afterListeners);
                }
            }
        }

        if (firingListeners.length === 0) {
            return this;
        }

        if (!args) {
            args = [];
        }

        firingArguments.length = 0;
        firingArguments.push.apply(firingArguments, args);

        // Backwards compatibility
        firingArguments.push(null, this);

        this.doFire();

        return this;
    },

    doFire: function() {
        var me = this,
            firingListeners = me.firingListeners,
            firingArguments = me.firingArguments,
            arg1 = firingArguments[1],
            optionsArgumentIndex = firingArguments.length - 2,
            observable = firingListeners[0].observable,
            info = me.info,
            event, i, ln, listener, options, fn, firingFn,
            boundFn, isLateBinding, scope, args, result, type, beforeFn;

        if (observable && observable.isElement) {
            event = firingArguments[0];
        }

        me.isPausing = me.isPaused = me.isStopped = false;
        me.isFiring = true;

        for (i = 0,ln = firingListeners.length; i < ln; i++) {
            listener = firingListeners[i];
            options = listener.options;
            fn = listener.fn;
            firingFn = listener.firingFn;
            boundFn = listener.boundFn;
            isLateBinding = listener.isLateBinding;
            scope = listener.scope;

            // Re-bind the callback if it has changed since the last time it's bound (overridden)
            if (isLateBinding && boundFn && boundFn !== scope[fn]) {
                boundFn = false;
                firingFn = false;
            }

            if (!boundFn) {
                if (isLateBinding) {
                    boundFn = scope[fn];

                    if (!boundFn) {
                        continue;
                    }
                }
                else {
                    boundFn = fn;
                }

                listener.boundFn = boundFn;
            }

            if (event) {
                // For events that have been translated to provide device compatibility,
                // e.g. mousedown -> touchstart, we want the event object to reflect the
                // type that was originally listened for, not the type of the actual event
                // that fired. The listener's "type" property reflects the original type.
                type = listener.type;
                if (type) {
                    // chain a new object to the event object before changing the type.
                    // This is more efficient than creating a new event object, and we
                    // don't want to change the type of the original event because it may
                    // be used asynchronously by other handlers
                    firingArguments[0] = event.chain({ type: type });
                }

                // In Ext4 Ext.EventObject was a singleton event object that was reused as events
                // were fired.  Set Ext.EventObject to the last fired event for compatibility.
                Ext.EventObject = firingArguments[0];
            }

            if (!firingFn) {
                firingFn = boundFn;

                if (options.delay) {
                    firingFn = Ext.Function.createDelayed(firingFn, options.delay, scope);
                }

                else if (options.buffer) {
                    firingFn = Ext.Function.createBuffered(firingFn, options.buffer, scope);
                }

                else if (options.onFrame) {
                    firingFn = Ext.Function.createAnimationFrame(firingFn, scope);
                }

                listener.firingFn = firingFn;
            }

            firingArguments[optionsArgumentIndex] = options;

            args = firingArguments;

            if (options.args) {
                args = options.args.concat(args);
            }

            // If using the delegate option, fix the target to be the delegate element,
            // however we only want to do this for element delegates.
            if (options.delegate && me.info.targetType === 'element') {
                firingArguments[1] = Ext.fly(arg1).findParent(options.delegate, arg1);
            }

            if (options.single) {
                // need to call the dispatcher, instead of just removing from the stack
                // here because we need to also tell the publisher to unsubscribe
                me.dispatcher.removeListener(info.targetType, info.target, info.eventName,
                    fn, scope, options, listener.order, listener.observable);
            }

            beforeFn = options.beforeFn;
            // Currently, the usage for the beforeFn is used for normalizing DOM events, for example
            // mouseenter/mouseleave get transformed to mouseover/mouseout in browsers that don't support them.
            // We give those functions a chance to jump in here and veto if necessary. We need to do this late
            // because we have to do it just before resolving the real caller
            if (beforeFn) {
                result = beforeFn.apply(Ext.global, args) !== false;
                if (result !== false) {
                    result = firingFn.apply(scope, args);
                }
            } else {
                result = firingFn.apply(scope, args);
            }

            // Restore the second argument if it wss set to the delegated target
            if (options.delegate) {
                firingArguments[1] = arg1;
            }

            if (result === false) {
                me.stop();
            }

            if (me.isStopped) {
                break;
            }

            if (me.isPausing) {
                me.isPaused = true;
                firingListeners.splice(0, i + 1);
                return;
            }

            if (event) {
                // reset the arguments' event object to the original non-translated one.
                firingArguments[0] = event;
            }
        }

        me.isFiring = false;
        me.listenerStacks = null;
        firingListeners.length = firingArguments.length = 0;
        me.connectingController = null;
    },

    connect: function(controller) {
        this.connectingController = controller;
    },

    resume: function() {
        var connectingController = this.connectingController;

        this.isPausing = false;

        if (this.isPaused && this.firingListeners.length > 0) {
            this.isPaused = false;
            this.doFire();
        }

        if (connectingController) {
            connectingController.resume();
        }

        return this;
    },

    isInterrupted: function() {
        return this.isStopped || this.isPaused;
    },

    stop: function() {
        var connectingController = this.connectingController;

        this.isStopped = true;

        if (connectingController) {
            this.connectingController = null;
            connectingController.stop();
        }

        this.isFiring = false;

        this.listenerStacks = null;

        return this;
    },

    pause: function() {
        var connectingController = this.connectingController;

        this.isPausing = true;

        if (connectingController) {
            connectingController.pause();
        }

        return this;
    }
});
