// @tag core
/**
 * Represents single event type that an Observable object listens to.
 * All actual listeners are tracked inside here.  When the event fires,
 * it calls all the registered listener functions.
 *
 * @private
 */
Ext.define('Ext.util.Event', function() {
  var arraySlice = Array.prototype.slice,
      arrayInsert = Ext.Array.insert,
      toArray = Ext.Array.toArray,
      fireArgs = {};

  return {
    requires: 'Ext.util.DelayedTask',

    /**
     * @property {Boolean} isEvent
     * `true` in this class to identify an object as an instantiated Event, or subclass thereof.
     */
    isEvent: true,
    
    // Private. Event suspend count
    suspended: 0,

    noOptions: {},

    constructor: function(observable, name) {
        this.name = name;
        this.observable = observable;
        this.listeners = [];
    },

    addListener: function(fn, scope, options, caller) {
        var me = this,
            listeners, listener, priority, isNegativePriority, highestNegativePriorityIndex,
            hasNegativePriorityIndex, length, index, i, listenerPriority;

        if (typeof fn !== 'string') {
            scope = scope || me.observable;
        }

        //<debug error>
        if (!fn) {
            Ext.Error.raise({
                sourceClass: Ext.getClassName(this.observable),
                sourceMethod: "addListener",
                msg: "The specified callback function is undefined"
            });
        }
        //</debug>

        if (!me.isListening(fn, scope)) {
            listener = me.createListener(fn, scope, options, caller);
            if (me.firing) {
                // if we are currently firing this event, don't disturb the listener loop
                me.listeners = me.listeners.slice(0);
            }
            listeners = me.listeners;
            index = length = listeners.length;
            priority = options && options.priority;
            highestNegativePriorityIndex = me._highestNegativePriorityIndex;
            hasNegativePriorityIndex = (highestNegativePriorityIndex !== undefined);
            if (priority) {
                // Find the index at which to insert the listener into the listeners array,
                // sorted by priority highest to lowest.
                isNegativePriority = (priority < 0);
                if (!isNegativePriority || hasNegativePriorityIndex) {
                    // If the priority is a positive number, or if it is a negative number
                    // and there are other existing negative priority listenrs, then we
                    // need to calcuate the listeners priority-order index.
                    // If the priority is a negative number, begin the search for priority
                    // order index at the index of the highest existing negative priority
                    // listener, otherwise begin at 0
                    for(i = (isNegativePriority ? highestNegativePriorityIndex : 0); i < length; i++) {
                        // Listeners created without options will have no "o" property
                        listenerPriority = listeners[i].o ? listeners[i].o.priority||0 : 0;
                        if (listenerPriority < priority) {
                            index = i;
                            break;
                        }
                    }
                } else {
                    // if the priority is a negative number, and there are no other negative
                    // priority listeners, then no calculation is needed - the negative
                    // priority listener gets appended to the end of the listeners array.
                    me._highestNegativePriorityIndex = index;
                }
            } else if (hasNegativePriorityIndex) {
                // listeners with a priority of 0 or undefined are appended to the end of
                // the listeners array unless there are negative priority listeners in the
                // listeners array, then they are inserted before the highest negative
                // priority listener.
                index = highestNegativePriorityIndex;
            }

            if (!isNegativePriority && index <= highestNegativePriorityIndex) {
                me._highestNegativePriorityIndex ++;
            }
            if (index === length) {
                me.listeners[length] = listener;
            } else {
                arrayInsert(me.listeners, index, [listener]);
            }
        }
        return listener;
    },

    createListener: function(fn, scope, o, caller) {
        var me = this,
            preventClimb = scope === 'this' || scope === 'controller',
            listener = {
                fn: fn,
                scope: scope,
                ev: me,
                caller: caller,
                preventClimb: preventClimb,
                defaultScope: preventClimb ? scope : undefined,
                lateBound: (typeof fn === 'string' && (!scope || preventClimb))
            },
            handler = fn,
            allowLookup = true;

        // The order is important. The 'single' wrapper must be wrapped by the 'buffer' and 'delayed' wrapper
        // because the event removal that the single listener does destroys the listener's DelayedTask(s)
        if (o) {
            listener.o = o;
            if (o.single) {
                handler = me.createSingle(handler, listener, o, scope);
                allowLookup = false;
            }
            if (o.target) {
                handler = me.createTargeted(handler, listener, o, scope, allowLookup);
                allowLookup = false;
            }
            if (o.delay) {
                handler = me.createDelayed(handler, listener, o, scope, allowLookup);
                allowLookup = false;
            }
            if (o.buffer) {
                handler = me.createBuffered(handler, listener, o, scope, allowLookup);
                allowLookup = false;
            }
        }

        listener.fireFn = handler;
        listener.allowLookup = allowLookup;
        return listener;
    },

    findListener: function(fn, scope) {
        var listeners = this.listeners,
            i = listeners.length,
            listener, s, checkScope;

        while (i--) {
            listener = listeners[i];
            if (listener) {
                s = listener.scope;
                checkScope = (listener.lateBound && !listener.preventClimb) ? undefined : (scope || this.observable); 

                // Compare the listener's scope with *JUST THE PASSED SCOPE* if one is passed, and only fall back to the owning Observable if none is passed.
                // We cannot use the test (s == scope || s == this.observable)
                // Otherwise, if the Observable itself adds Ext.emptyFn as a listener, and then Ext.emptyFn is added under another scope, there will be a false match.
                if (listener.fn == fn && s == checkScope) {
                    return i;
                }
            }
        }

        return - 1;
    },

    isListening: function(fn, scope) {
        return this.findListener(fn, scope) !== -1;
    },

    removeListener: function(fn, scope) {
        var me = this,
            index,
            listener,
            highestNegativePriorityIndex,
            k;
            
        // Check if we passed in an event object.
        if (fn.fireFn) {
            index = Ext.Array.indexOf(listeners, fn);
        } else {
            index = me.findListener(fn, scope);
        }
        
        if (index != -1) {
            listener = me.listeners[index];
            highestNegativePriorityIndex = me._highestNegativePriorityIndex;

            if (me.firing) {
                me.listeners = me.listeners.slice(0);
            }

            // cancel and remove a buffered handler that hasn't fired yet
            if (listener.task) {
                listener.task.cancel();
                delete listener.task;
            }

            // cancel and remove all delayed handlers that haven't fired yet
            k = listener.tasks && listener.tasks.length;
            if (k) {
                while (k--) {
                    listener.tasks[k].cancel();
                }
                delete listener.tasks;
            }

            // Remove this listener from the listeners array
            // We can use splice directly. The IE8 bug which Ext.Array works around only affects *insertion*
            // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/6e946d03-e09f-4b22-a4dd-cd5e276bf05a/
            me.listeners.splice(index, 1);

            // if the listeners array contains negative priority listeners, adjust the
            // internal index if needed.
            if (highestNegativePriorityIndex) {
                if (index < highestNegativePriorityIndex) {
                    me._highestNegativePriorityIndex --;
                } else if (index === highestNegativePriorityIndex && index === me.listeners.length) {
                    delete me._highestNegativePriorityIndex;
                }
            }
            return true;
        }

        return false;
    },

    // Iterate to stop any buffered/delayed events
    clearListeners: function() {
        var listeners = this.listeners,
            i = listeners.length;

        while (i--) {
            this.removeListener(listeners[i].fn, listeners[i].scope);
        }
    },

    suspend: function() {
        ++this.suspended;
    },

    resume: function() {
        if (this.suspended) {
            --this.suspended;
        }
    },
    
    isSuspended: function() {
        return this.suspended > 0;
    },

    fire: function() {
        var me = this,
            listeners = me.listeners,
            count = listeners.length,
            fireInfo,
            i,
            args,
            listener,
            len;

        if (!me.suspended && count > 0) {
            me.firing = true;
            args = arguments.length ? arraySlice.call(arguments, 0) : [];
            len = args.length;
            for (i = 0; i < count; i++) {
                listener = listeners[i];
                if (listener.o) {
                    args[len] = listener.o;
                }
                if (listener) {
                    fireInfo = me.getFireInfo(listener);
                    if (fireInfo.fn.apply(fireInfo.scope, args) === false) {
                        return (me.firing = false);
                    }
                }
            }
        }
        me.firing = false;
        return true;
    },
    
    getFireInfo: function(listener, forceLookup) {
        var observable = this.observable,
            fn = forceLookup ? listener.fn : listener.fireFn,
            scope = listener.scope,
            caller = listener.caller;
            
        //<debug>
        var name = fn;
        //</debug>
        if ((forceLookup || listener.allowLookup) && listener.lateBound) {
            scope = (caller || observable).resolveListenerScope(listener.defaultScope);
            fn = scope[fn];
        } else {
            scope = scope || observable;
        }
        // We can only ever be firing one event at a time, so just keep
        // overwriting tghe object we've got in our closure, otherwise we'll be
        // creating a whole bunch of garbage objects
        fireArgs.fn = fn;
        fireArgs.scope = scope;
        //<debug>
        if (!fn) {
            Ext.Error.raise('Unable to dynamically resolve method "' + name + '"');
        }
        //</debug>
        return fireArgs;
    },

    createTargeted: function (handler, listener, o, scope, allowLookup) {
        return function(){
            if (o.target === arguments[0]) {
                var fireInfo;

                if (allowLookup) {
                    fireInfo = listener.ev.getFireInfo(listener, true);
                    handler = fireInfo.fn;
                    scope = fireInfo.scope;
                }

                handler.apply(scope, arguments);
            }
        };
    },

    createBuffered: function (handler, listener, o, scope, allowLookup) {
        listener.task = new Ext.util.DelayedTask();
        return function() {
            var fireInfo;

            if (allowLookup) {
                fireInfo = listener.ev.getFireInfo(listener, true);
                handler = fireInfo.fn;
                scope = fireInfo.scope;
            }

            listener.task.delay(o.buffer, handler, scope, toArray(arguments));
        };
    },

    createDelayed: function (handler, listener, o, scope, allowLookup) {
        return function() {
            var task = new Ext.util.DelayedTask(),
                fireInfo;

            if (allowLookup) {
                fireInfo = listener.ev.getFireInfo(listener, true);
                handler = fireInfo.fn;
                scope = fireInfo.scope;
            }
                
            if (!listener.tasks) {
                listener.tasks = [];
            }
            listener.tasks.push(task);
            task.delay(o.delay || 10, handler, scope, toArray(arguments));
        };
    },

    createSingle: function (handler, listener, o, scope) {
        return function() {
            var event = listener.ev,
                fireInfo = event.getFireInfo(listener, true);

            if (event.removeListener(listener.fn, scope) && event.observable) {
                // Removing from a regular Observable-owned, named event (not an anonymous
                // event such as Ext's readyEvent): Decrement the listeners count
                event.observable.hasListeners[event.name]--;
            }

            fireInfo.fn.apply(fireInfo.scope, arguments);
        };
    }
  };
});
