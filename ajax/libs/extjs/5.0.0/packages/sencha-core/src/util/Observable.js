// @tag core
/**
 * Base class that provides a common interface for publishing events. Subclasses are
 * expected to have a property "events" which is populated as event listeners register,
 * and, optionally, a property "listeners" with configured listeners defined.
 *
 * For example:
 *
 *     Ext.define('Employee', {
 *         mixins: {
 *             observable: 'Ext.util.Observable'
 *         },
 *
 *         constructor: function (config) {
 *             // The Observable constructor copies all of the properties of `config` on
 *             // to `this` using {@link Ext#apply}. Further, the `listeners` property is
 *             // processed to add listeners.
 *             //
 *             this.mixins.observable.constructor.call(this, config);
 *         }
 *     });
 *
 * This could then be used like this:
 *
 *     var newEmployee = new Employee({
 *         name: employeeName,
 *         listeners: {
 *             quit: function() {
 *                 // By default, "this" will be the object that fired the event.
 *                 alert(this.name + " has quit!");
 *             }
 *         }
 *     });
 */
Ext.define('Ext.util.Observable', function(Observable) {

    var emptyFn = Ext.emptyFn,
        emptyArray = [],
        arrayProto = Array.prototype,
        arraySlice = arrayProto.slice,
        eventNameMap = Ext.$eventNameMap,
        // Private Destroyable class which removes listeners
        ListenerRemover = function(observable) {

            // Passed a ListenerRemover: return it
            if (observable instanceof ListenerRemover) {
                return observable;
            }

            this.observable = observable;

            // Called when addManagedListener is used with the event source as the second arg:
            // (owner, eventSource, args...)
            if (arguments[1].isObservable) {
                this.managedListeners = true;
            }
            this.args = arraySlice.call(arguments, 1);
        };

    ListenerRemover.prototype.destroy = function() {
        var observable = this.observable;
        observable[this.managedListeners ? 'mun' : 'un'].apply(observable, this.args);
    };

    return {
        mixinId: 'observable',

        requires: [
            'Ext.util.Event'
        ],

        statics: {
            /**
            * Removes **all** added captures from the Observable.
            *
            * @param {Ext.util.Observable} o The Observable to release
            * @static
            */
            releaseCapture: function(o) {
                o.fireEventArgs = this.prototype.fireEventArgs;
            },

            /**
            * Starts capture on the specified Observable. All events will be passed to the supplied function with the event
            * name + standard signature of the event **before** the event is fired. If the supplied function returns false,
            * the event will not fire.
            *
            * @param {Ext.util.Observable} o The Observable to capture events from.
            * @param {Function} fn The function to call when an event is fired.
            * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed. Defaults to
            * the Observable firing the event.
            * @static
            */
            capture: function(o, fn, scope) {
                // We're capturing calls to fireEventArgs to avoid duplication of events;
                // however fn expects fireEvent's signature so we have to convert it here.
                // To avoid unnecessary conversions, observe() below is aware of the changes
                // and will capture fireEventArgs instead.
                var newFn = function(eventName, args) {
                    return fn.apply(scope, [eventName].concat(args));
                };
                
                this.captureArgs(o, newFn, scope);
            },
            
            /**
             * @private
             */
            captureArgs: function(o, fn, scope) {
                o.fireEventArgs = Ext.Function.createInterceptor(o.fireEventArgs, fn, scope);
            },

            /**
            * Sets observability on the passed class constructor.
            *
            * This makes any event fired on any instance of the passed class also fire a single event through
            * the **class** allowing for central handling of events on many instances at once.
            *
            * Usage:
            *
            *     Ext.util.Observable.observe(Ext.data.Connection);
            *     Ext.data.Connection.on('beforerequest', function(con, options) {
            *         console.log('Ajax request made to ' + options.url);
            *     });
            *
            * @param {Function} c The class constructor to make observable.
            * @param {Object} listeners An object containing a series of listeners to add. See {@link #addListener}.
            * @static
            */
            observe: function(cls, listeners) {
                if (cls) {
                    if (!cls.isObservable) {
                        Ext.applyIf(cls, new this());
                        this.captureArgs(cls.prototype, cls.fireEventArgs, cls);
                    }
                    if (Ext.isObject(listeners)) {
                        cls.on(listeners);
                    }
                }
                return cls;
            },

            /**
            * Prepares a given class for observable instances. This method is called when a
            * class derives from this class or uses this class as a mixin.
            * @param {Function} T The class constructor to prepare.
            * @param {Ext.util.Observable} mixin The mixin if being used as a mixin.
            * @param {Object} data The raw class creation data if this is an extend.
            * @private
            */
            prepareClass: function (T, mixin, data) {
                // T.hasListeners is the object to track listeners on class T. This object's
                // prototype (__proto__) is the "hasListeners" of T.superclass.

                // Instances of T will create "hasListeners" that have T.hasListeners as their
                // immediate prototype (__proto__).

                var listeners = T.listeners = [],
                    // If this function was called as a result of an "onExtended", it will
                    // receive the class as "T", but the members will not yet have been
                    // applied to the prototype. If this is the case, just grab listeners
                    // off of the raw data object.
                    targetListeners = data ? data.listeners : T.prototype.listeners,
                    name, mixin;

                // Process listeners that have been declared on the class body. These
                // listeners must not override each other, but each must be added
                // separately. This is accomplished by maintaining a nested array
                // of listeners for the class and it's superclasses/mixins
                if (mixin) {
                    listeners.push(mixin.listeners);
                } else {
                    listeners.push(T.superclass.self.listeners);
                }
                if (targetListeners) {
                    listeners.push(targetListeners);
                }

                if (!T.HasListeners) {
                    // We create a HasListeners "class" for this class. The "prototype" of the
                    // HasListeners class is an instance of the HasListeners class associated
                    // with this class's super class (or with Observable).
                    var HasListeners = function () {},
                        SuperHL = T.superclass.HasListeners || (mixin && mixin.HasListeners) ||
                                Observable.HasListeners;

                    // Make the HasListener class available on the class and its prototype:
                    T.prototype.HasListeners = T.HasListeners = HasListeners;

                    // And connect its "prototype" to the new HasListeners of our super class
                    // (which is also the class-level "hasListeners" instance).
                    HasListeners.prototype = T.hasListeners = new SuperHL();
                }
            }
        },

        /* End Definitions */

        /**
        * @cfg {Object} listeners
        *
        * A config object containing one or more event handlers to be added to this object during initialization. This
        * should be a valid listeners config object as specified in the {@link #addListener} example for attaching multiple
        * handlers at once.
        *
        * **DOM events from Ext JS {@link Ext.Component Components}**
        *
        * While _some_ Ext JS Component classes export selected DOM events (e.g. "click", "mouseover" etc), this is usually
        * only done when extra value can be added. For example the {@link Ext.view.View DataView}'s **`{@link
        * Ext.view.View#itemclick itemclick}`** event passing the node clicked on. To access DOM events directly from a
        * child element of a Component, we need to specify the `element` option to identify the Component property to add a
        * DOM listener to:
        *
        *     new Ext.panel.Panel({
        *         width: 400,
        *         height: 200,
        *         dockedItems: [{
        *             xtype: 'toolbar'
        *         }],
        *         listeners: {
        *             click: {
        *                 element: 'el', //bind to the underlying el property on the panel
        *                 fn: function(){ console.log('click el'); }
        *             },
        *             dblclick: {
        *                 element: 'body', //bind to the underlying body property on the panel
        *                 fn: function(){ console.log('dblclick body'); }
        *             }
        *         }
        *     });
        */

        /**
        * @property {Boolean} isObservable
        * `true` in this class to identify an object as an instantiated Observable, or subclass thereof.
        */
        isObservable: true,
        
        isUtilObservable: true,

        /**
        * @private
        * Initial suspended call count. Incremented when {@link #suspendEvents} is called, decremented when {@link #resumeEvents} is called.
        */
        eventsSuspended: 0,

        /**
        * @property {Object} hasListeners
        * @readonly
        * This object holds a key for any event that has a listener. The listener may be set
        * directly on the instance, or on its class or a super class (via {@link #observe}) or
        * on the {@link Ext.app.EventBus MVC EventBus}. The values of this object are truthy
        * (a non-zero number) and falsy (0 or undefined). They do not represent an exact count
        * of listeners. The value for an event is truthy if the event must be fired and is
        * falsy if there is no need to fire the event.
        * 
        * The intended use of this property is to avoid the expense of fireEvent calls when
        * there are no listeners. This can be particularly helpful when one would otherwise
        * have to call fireEvent hundreds or thousands of times. It is used like this:
        * 
        *      if (this.hasListeners.foo) {
        *          this.fireEvent('foo', this, arg1);
        *      }
        */

        constructor: function(config) {
            var me = this,
                self = me.self,
                declaredListeners;

            if (config) {
                Ext.apply(me, config);
            }

            me.hasListeners = new me.HasListeners();

            me.events = me.events || {};

            declaredListeners = self.listeners;
            if (declaredListeners && !me._addDeclaredListeners(declaredListeners)) {
                // Nulling out declared listeners allows future instances to avoid
                // recursing into the declared listeners arrays if the first instance
                // discovers that there are no declarative listeners in its hierarchy
                self.listeners = null;
            }

            if (me.listeners) {
                me.on(me.listeners);
                me.listeners = null; //Set as an instance property to pre-empt the prototype in case any are set there.
            }

            if (me.bubbleEvents) {
                me.enableBubble(me.bubbleEvents);
            }
        },

        onClassExtended: function (T) {
            if (!T.HasListeners) {
                // Some classes derive from us and some others derive from those classes. All
                // of these are passed to this method.
                Observable.prepareClass(T);
            }
        },

        // @private
        // Matches options property names within a listeners specification object  - property names which are never used as event names.
        eventOptionsRe : /^(?:scope|delay|buffer|onFrame|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|element|destroyable|vertical|horizontal|priority)$/,

        /**
         * Adds declarative listeners as nested arrays of listener objects.
         * @private
         * @param {Array} listeners
         * @return {Boolean} `true` if any listeners were added
         */
        _addDeclaredListeners: function(listeners) {
            var me = this;

            if (listeners instanceof Array) {
                Ext.each(listeners, me._addDeclaredListeners, me);
            } else {
                me._addedDeclaredListeners = true;
                me.addListener(listeners);
            }

            return me._addedDeclaredListeners;
        },

        /**
        * Adds listeners to any Observable object (or Ext.Element) which are automatically removed when this Component is
        * destroyed.
        *
        * @param {Ext.util.Observable/Ext.dom.Element} item The item to which to add a listener/listeners.
        * @param {Object/String} ename The event name, or an object containing event name properties.
        * @param {Function} fn (optional) If the `ename` parameter was an event name, this is the handler function.
        * @param {Object} scope (optional) If the `ename` parameter was an event name, this is the scope (`this` reference)
        * in which the handler function is executed.
        * @param {Object} options (optional) If the `ename` parameter was an event name, this is the
        * {@link Ext.util.Observable#addListener addListener} options.
        * @return {Object} **Only when the `destroyable` option is specified. **
        *
        *  A `Destroyable` object. An object which implements the `destroy` method which removes all listeners added in this call. For example:
        *
        *     this.btnListeners = myButton.mon({
        *         destroyable: true
        *         mouseover:   function() { console.log('mouseover'); },
        *         mouseout:    function() { console.log('mouseout'); },
        *         click:       function() { console.log('click'); }
        *     });
        *
        * And when those listeners need to be removed:
        *
        *     Ext.destroy(this.btnListeners);
        *
        * or
        *
        *     this.btnListeners.destroy();
        */
        addManagedListener: function(item, ename, fn, scope, options, /* private */ noDestroy) {
            var me = this,
                managedListeners = me.managedListeners = me.managedListeners || [],
                config, passedOptions;

            if (typeof ename !== 'string') {
                // When creating listeners using the object form, allow caller to override the default of
                // using the listeners object as options.
                // This is used by relayEvents, when adding its relayer so that it does not contibute
                // a spurious options param to the end of the arg list.
                passedOptions = arguments.length > 4 ? options : ename;

                options = ename;
                for (ename in options) {
                    if (options.hasOwnProperty(ename)) {
                        config = options[ename];
                        if (!me.eventOptionsRe.test(ename)) {
                            // recurse, but pass the noDestroy parameter as true so that lots of individual Destroyables are not created.
                            // We create a single one at the end if necessary.
                            me.addManagedListener(item, ename, config.fn || config, config.scope || options.scope || scope, config.fn ? config : passedOptions, true);
                        }
                    }
                }
                if (options && options.destroyable) {
                    return new ListenerRemover(me, item, options);
                }
            }
            else {
                // NOTE: Because we just call on() next we don't need to resolveMethod here.

                if (fn !== emptyFn) {
                    managedListeners.push({
                        item: item,
                        ename: ename,
                        fn: fn,
                        scope: scope,
                        options: options
                    });

                    // We can only pass the caller if we're listening to the same type
                    // of observable, the arguments aren't the same. We need to pass the caller
                    // so that the scope can be correctly resolved, otherwise it will default
                    // to item.
                    if (item.isUtilObservable) {
                        item.on(ename, fn, scope, options, me);
                    }  else {
                        item.on(ename, fn, scope, options);
                    }

                    // The 'noDestroy' flag is sent if we're looping through a hash of listeners passing each one to addManagedListener separately
                    if (!noDestroy && options && options.destroyable) {
                        return new ListenerRemover(me, item, ename, fn, scope);
                    }
                }
            }
        },
        

        /**
        * Removes listeners that were added by the {@link #mon} method.
        *
        * @param {Ext.util.Observable/Ext.dom.Element} item The item from which to remove a listener/listeners.
        * @param {Object/String} ename The event name, or an object containing event name properties.
        * @param {Function} fn (optional) If the `ename` parameter was an event name, this is the handler function.
        * @param {Object} scope (optional) If the `ename` parameter was an event name, this is the scope (`this` reference)
        * in which the handler function is executed.
        */
        removeManagedListener: function(item, ename, fn, scope) {
            var me = this,
                options,
                config,
                managedListeners,
                length,
                i;

            if (typeof ename !== 'string') {
                options = ename;
                for (ename in options) {
                    if (options.hasOwnProperty(ename)) {
                        config = options[ename];
                        if (!me.eventOptionsRe.test(ename)) {
                            me.removeManagedListener(item, ename, config.fn || config, config.scope || options.scope || scope);
                        }
                    }
                }
            } else {
                managedListeners = me.managedListeners ? me.managedListeners.slice() : [];
                
                // NOTE: Because we just call un() soon we don't need to resolveMethod here.
                // Only call it below so we can get an error in debug mode when the method is not present.
                // We do nothing with the result.
                //<debug>
                if (typeof fn === 'string' && scope && scope !== 'this' && scope !== 'controller' && !managedListeners.length) {
                    me.resolveMethod(fn, scope);
                }
                //</debug>

                for (i = 0, length = managedListeners.length; i < length; i++) {
                    me.removeManagedListenerItem(false, managedListeners[i], item, ename, fn, scope);
                }
            }
        },

        /**
        * Fires the specified event with the passed parameters (minus the event name, plus the `options` object passed
        * to {@link #addListener}).
        *
        * An event may be set to bubble up an Observable parent hierarchy (See {@link Ext.Component#getBubbleTarget}) by
        * calling {@link #enableBubble}.
        *
        * @param {String} eventName The name of the event to fire.
        * @param {Object...} args Variable number of parameters are passed to handlers.
        * @return {Boolean} returns false if any of the handlers return false otherwise it returns true.
        */
        fireEvent: function(eventName) {
            return this.fireEventArgs(eventName, arraySlice.call(arguments, 1));
        },
        
        /**
         * Gets the default scope for firing late bound events (string names with
         * no scope attached) at runtime.
         * @param {Object} [defaultScope=this] The default scope to return if none is found.
         * @return {Object} The default event scope
         * @protected
         */
        resolveListenerScope: function (defaultScope) {
            //<debug>
            if (defaultScope === 'controller') {
                Ext.Error.raise('scope: "controller" can only be specified on components that derive from component');
            }
            //</debug>
            
            if (defaultScope === 'this') {
                defaultScope = null;
            }
            return defaultScope || this;
        },

        /**
        * Fires the specified event with the passed parameter list.
        *
        * An event may be set to bubble up an Observable parent hierarchy (See {@link Ext.Component#getBubbleTarget}) by
        * calling {@link #enableBubble}.
        *
        * @param {String} eventName The name of the event to fire.
        * @param {Object[]} args An array of parameters which are passed to handlers.
        * @return {Boolean} returns false if any of the handlers return false otherwise it returns true.
        */
        fireEventArgs: function(eventName, args) {
            // This is inlined for performance
            eventName = eventNameMap[eventName] || (eventNameMap[eventName] = eventName.toLowerCase());
            var me = this,
                // no need to make events since we need an Event with listeners
                events = me.events,
                event = events && events[eventName],
                ret = true;

            // Only continue firing the event if there are listeners to be informed.
            // Bubbled events will always have a listener count, so will be fired.
            if (me.hasListeners[eventName]) {
                ret = me.doFireEvent(eventName, args || emptyArray, event ? event.bubble : false);
            }
            return ret;
        },

        /**
        * Continue to fire event.
        * @private
        *
        * @param {String} eventName
        * @param {Array} args
        * @param {Boolean} bubbles
        */
        doFireEvent: function(eventName, args, bubbles) {
            var target = this,
                queue, event,
                ret = true;

            do {
                if (target.eventsSuspended) {
                    if ((queue = target.eventQueue)) {
                        queue.push([eventName, args]);
                    }
                    return ret;
                } else {
                    event = target.events && target.events[eventName];
                    // Continue bubbling if event exists and it is `true` or the handler didn't returns false and it
                    // configure to bubble.
                    if (event && event !== true) {
                        if ((ret = event.fire.apply(event, args)) === false) {
                            break;
                        }
                    }
                }
            } while (bubbles && (target = target.getBubbleParent()));
            return ret;
        },

        /**
        * Gets the bubbling parent for an Observable
        * @private
        * @return {Ext.util.Observable} The bubble parent. null is returned if no bubble target exists
        */
        getBubbleParent: function() {
            var me = this, parent = me.getBubbleTarget && me.getBubbleTarget();
            if (parent && parent.isObservable) {
                return parent;
            }
            return null;
        },

        /**
        * The {@link #on} method is shorthand for {@link #addListener}.
        *
        * Appends an event handler to this object.  For example:
        *
        *     myGridPanel.on("mouseover", this.onMouseOver, this);
        *
        * The method also allows for a single argument to be passed which is a config object
        * containing properties which specify multiple events. For example:
        *
        *     myGridPanel.on({
        *         cellClick: this.onCellClick,
        *         mouseover: this.onMouseOver,
        *         mouseout: this.onMouseOut,
        *         scope: this // Important. Ensure "this" is correct during handler execution
        *     });
        *
        * One can also specify options for each event handler separately:
        *
        *     myGridPanel.on({
        *         cellClick: {fn: this.onCellClick, scope: this, single: true},
        *         mouseover: {fn: panel.onMouseOver, scope: panel}
        *     });
        *
        * *Names* of methods in a specified scope may also be used. Note that
        * `scope` MUST be specified to use this option:
        *
        *     myGridPanel.on({
        *         cellClick: {fn: 'onCellClick', scope: this, single: true},
        *         mouseover: {fn: 'onMouseOver', scope: panel}
        *     });
        *
        * @param {String/Object} eventName The name of the event to listen for.
        * May also be an object who's property names are event names.
        *
        * @param {Function} [fn] The method the event invokes, or *if `scope` is specified, the *name* of the method within
        * the specified `scope`.  Will be called with arguments
        * given to {@link Ext.util.Observable#fireEvent} plus the `options` parameter described below.
        *
        * @param {Object} [scope] The scope (`this` reference) in which the handler function is
        * executed. **If omitted, defaults to the object which fired the event.**
        *
        * @param {Object} [options] An object containing handler configuration.
        *
        * **Note:** Unlike in ExtJS 3.x, the options object will also be passed as the last
        * argument to every event handler.
        *
        * This object may contain any of the following properties:
        *
        * @param {Object} options.scope
        *   The scope (`this` reference) in which the handler function is executed. **If omitted,
        *   defaults to the object which fired the event.**
        *
        * @param {Number} options.delay
        *   The number of milliseconds to delay the invocation of the handler after the event fires.
        *
        * @param {Boolean} options.single
        *   True to add a handler to handle just the next firing of the event, and then remove itself.
        *
        * @param {Number} options.buffer
        *   Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed
        *   by the specified number of milliseconds. If the event fires again within that time,
        *   the original handler is _not_ invoked, but the new handler is scheduled in its place.
        *
        * @param {Number} options.onFrame
        *   Causes the handler to be scheduled to run at the next animation frame event. If the
        *   event fires again before that time, the handler is not rescheduled - the handler
        *   will only be called once when the next animation frame is fired, with the last set
        *   of arguments passed.
        *
        * @param {Ext.util.Observable} options.target
        *   Only call the handler if the event was fired on the target Observable, _not_ if the event
        *   was bubbled up from a child Observable.
        *
        * @param {String} options.element
        *   **This option is only valid for listeners bound to {@link Ext.Component Components}.**
        *   The name of a Component property which references an element to add a listener to.
        *
        *   This option is useful during Component construction to add DOM event listeners to elements of
        *   {@link Ext.Component Components} which will exist only after the Component is rendered.
        *   For example, to add a click listener to a Panel's body:
        *
        *       new Ext.panel.Panel({
        *           title: 'The title',
        *           listeners: {
        *               click: this.handlePanelClick,
        *               element: 'body'
        *           }
        *       });
        *
        * @param {Boolean} [options.destroyable=false]
        *   When specified as `true`, the function returns A `Destroyable` object. An object which implements the `destroy` method which removes all listeners added in this call.
        *   
        * @param {Number} [options.priority]
        *   An optional numeric priority that determines the order in which event handlers
        *   are run. Event handlers with no priority will be run as if they had a priority
        *   of 0. Handlers with a higher priority will be prioritized to run sooner than
        *   those with a lower priority.  Negative numbers can be used to set a priority
        *   lower than the default. Internally, the framework uses a range of 1000 or
        *   greater, and -1000 or lesser for handers that are intended to run before or
        *   after all others, so it is recommended to stay within the range of -999 to 999
        *   when setting the priority of event handlers in application-level code.
        *
        * **Combining Options**
        *
        * Using the options argument, it is possible to combine different types of listeners:
        *
        * A delayed, one-time listener.
        *
        *     myPanel.on('hide', this.handleClick, this, {
        *         single: true,
        *         delay: 100
        *     });
        *
        * @return {Object} **Only when the `destroyable` option is specified. **
        *
        *  A `Destroyable` object. An object which implements the `destroy` method which removes all listeners added in this call. For example:
        *
        *     this.btnListeners =  = myButton.on({
        *         destroyable: true
        *         mouseover:   function() { console.log('mouseover'); },
        *         mouseout:    function() { console.log('mouseout'); },
        *         click:       function() { console.log('click'); }
        *     });
        *
        * And when those listeners need to be removed:
        *
        *     Ext.destroy(this.btnListeners);
        *
        * or
        *
        *     this.btnListeners.destroy();
        */
        addListener: function(ename, fn, scope, options, caller) {
            var me = this,
                config, event,
                prevListenerCount = 0;

            // Object listener hash passed
            if (typeof ename !== 'string') {
                options = ename;
                for (ename in options) {
                    config = options[ename];
                    if (!me.eventOptionsRe.test(ename)) {
                        /* This would be an API change so check removed until https://sencha.jira.com/browse/EXTJSIV-7183 is fully implemented in 4.2
                        // Test must go here as well as in the simple form because of the attempted property access here on the config object.
                        //<debug>
                        if (!config || (typeof config !== 'function' && !config.fn)) {
                            Ext.Error.raise('No function passed for event ' + me.$className + '.' + ename);
                        }
                        //</debug>
                        */
                        me.addListener(ename, config.fn || config, config.scope || options.scope, config.fn ? config : options, caller);
                    }
                }
                if (options && options.destroyable) {
                    return new ListenerRemover(me, options);
                }
            }
            // String, function passed
            else {
                // This is inlined for performance
                ename = eventNameMap[ename] || (eventNameMap[ename] = ename.toLowerCase());
                // need events now...
                event = (me.events || (me.events = {}))[ename];
                if (event && event.isEvent) {
                    prevListenerCount = event.listeners.length;
                } else {
                    me.events[ename] = event = new Ext.util.Event(me, ename);
                }

                // Allow listeners: { click: 'onClick', scope: myObject }
                // If we get passed with a scope, go and resolve it directly,
                // otherwise we need to defer it til when the event fires.
                if (typeof fn === 'string' && scope && scope !== 'this' && scope !== 'controller') {
                    fn = me.resolveMethod(fn, scope);
                }
                //<debug>
                else {
                    // If we have a string and no scope we won't have a function yet,
                    // so don't throw any exception.
                    if (!(typeof fn === 'string' && (!scope || scope === 'this' || scope === 'controller'))) {
                        Ext.Assert.isFunction(fn,
                            'No function passed for event ' + me.$className + '.' + ename);
                    }
                }
                //</debug>

                if (fn !== emptyFn) {
                    event.addListener(fn, scope, options, caller);

                    // If a new listener has been added (Event.addListener rejects duplicates of the same fn+scope)
                    // then increment the hasListeners counter
                    if (event.listeners.length !== prevListenerCount) {
                        me.hasListeners._incr_(ename);
                    }
                    if (options && options.destroyable) {
                        return new ListenerRemover(me, ename, fn, scope, options);
                    }
                }
            }
        },

        /**
        * Removes an event handler.
        *
        * @param {String} eventName The type of event the handler was associated with.
        * @param {Function} fn The handler to remove. **This must be a reference to the function passed into the
        * {@link Ext.util.Observable#addListener} call.**
        * @param {Object} scope (optional) The scope originally specified for the handler. It must be the same as the
        * scope argument specified in the original call to {@link Ext.util.Observable#addListener} or the listener will not be removed.
        */
        removeListener: function(ename, fn, scope) {
            var me = this,
                events = me.events,
                config,
                event,
                options;

            if (typeof ename !== 'string') {
                options = ename;
                for (ename in options) {
                    if (options.hasOwnProperty(ename)) {
                        config = options[ename];
                        if (!me.eventOptionsRe.test(ename)) {
                            me.removeListener(ename, config.fn || config, config.scope || options.scope);
                        }
                    }
                }
            } else {
                // This is inlined for performance
                ename = eventNameMap[ename] || (eventNameMap[ename] = ename.toLowerCase());
                event = events && events[ename];
                if (event && event.isEvent) {
                    if (typeof fn === 'string' && scope && scope !== 'this' && scope !== 'controller') {
                        fn = me.resolveMethod(fn, scope);
                    }
                    
                    if (event.removeListener(fn, scope)) {
                        me.hasListeners._decr_(ename);
                    }
                }
            }
        },

        /**
        * Removes all listeners for this object including the managed listeners
        */
        clearListeners: function() {
            var me = this,
                events = me.events,
                hasListeners = me.hasListeners,
                event,
                key;

            if (events) {
                for (key in events) {
                    if (events.hasOwnProperty(key)) {
                        event = events[key];
                        if (event.isEvent) {
                            delete hasListeners[key];
                            event.clearListeners();
                        }
                    }
                }
            }

            me.clearManagedListeners();
        },

        //<debug>
        purgeListeners : function() {
            if (Ext.global.console) {
                Ext.global.console.warn('Observable: purgeListeners has been deprecated. Please use clearListeners.');
            }
            return this.clearListeners.apply(this, arguments);
        },
        //</debug>

        /**
        * Removes all managed listeners for this object.
        */
        clearManagedListeners : function() {
            var me = this,
                managedListeners = me.managedListeners || [],
                i = 0,
                len = managedListeners.length;

            for (; i < len; i++) {
                me.removeManagedListenerItem(true, managedListeners[i]);
            }

            me.managedListeners = [];
        },

        /**
        * Remove a single managed listener item
        * @private
        * @param {Boolean} isClear True if this is being called during a clear
        * @param {Object} managedListener The managed listener item
        * See removeManagedListener for other args
        */
        removeManagedListenerItem: function(isClear, managedListener, item, ename, fn, scope){
            if (isClear || (managedListener.item === item && managedListener.ename === ename && (!fn || managedListener.fn === fn) && (!scope || managedListener.scope === scope))) {
                managedListener.item.un(managedListener.ename, managedListener.fn, managedListener.scope);
                if (!isClear) {
                    Ext.Array.remove(this.managedListeners, managedListener);
                }
            }
        },

        //<debug>
        purgeManagedListeners : function() {
            if (Ext.global.console) {
                Ext.global.console.warn('Observable: purgeManagedListeners has been deprecated. Please use clearManagedListeners.');
            }
            return this.clearManagedListeners.apply(this, arguments);
        },
        //</debug>
        
        resolveMethod: function (fn, scope) {
            //<debug>
            if (!fn) {
                Ext.Error.raise('No function specified');
            }
            
            if (!scope || !Ext.isObject(scope)) {
                Ext.Error.raise('Named method "' + fn + '" requires a scope object');
            }
            if (!Ext.isFunction(scope[fn])) {
                Ext.Error.raise('No method named "' + fn + '" on ' +
                                (scope.$className || 'scope object'));
            }
            //</debug>

            return scope[fn];
        }, 

        /**
        * Checks to see if this object has any listeners for a specified event, or whether the event bubbles. The answer
        * indicates whether the event needs firing or not.
        *
        * @param {String} eventName The name of the event to check for
        * @return {Boolean} `true` if the event is being listened for or bubbles, else `false`
        */
        hasListener: function(ename) {
            // This is inlined for performance
            ename = eventNameMap[ename] || (eventNameMap[ename] = ename.toLowerCase());
            return !!this.hasListeners[ename];
        },
        
        /**
         * Checks if all events, or a specific event, is suspended.
         * @param {String} [event] The name of the specific event to check
         * @return {Boolean} `true` if events are suspended
         */
        isSuspended: function(event) {
            var suspended = this.eventsSuspended > 0,
                events = this.events;
                
            if (!suspended && event && events) {
                event = events[event];
                if (event && event.isEvent) {
                    return event.isSuspended();
                }
            }
            return suspended;
        },

        /**
        * Suspends the firing of all events. (see {@link #resumeEvents})
        *
        * @param {Boolean} queueSuspended `true` to queue up suspended events to be fired
        * after the {@link #resumeEvents} call instead of discarding all suspended events.
        */
        suspendEvents: function(queueSuspended) {
            ++this.eventsSuspended;
            if (queueSuspended && !this.eventQueue) {
                this.eventQueue = [];
            }
        },

        /**
         * Suspends firing of the named event(s).
         *
         * After calling this method to suspend events, the events will no longer fire when requested to fire.
         *
         * **Note that if this is called multiple times for a certain event, the converse method
         * {@link #resumeEvent} will have to be called the same number of times for it to resume firing.**
         *
         * @param  {String...} eventName Multiple event names to suspend.
         */
        suspendEvent: function() {
            var me = this,
                events = me.events || (me.events = {}),
                len = arguments.length,
                i, event, ename;

            for (i = 0; i < len; i++) {
                ename = arguments[i];
                // This is inlined for performance
                ename = eventNameMap[ename] || (eventNameMap[ename] = ename.toLowerCase());
                event = events[ename];
                // we need to spin up the Event instance so it can hold the suspend count
                if (!event || !event.isEvent) {
                    events[ename] = event = new Ext.util.Event(me, ename);
                }
                event.suspend();
            }
        },

        /**
         * Resumes firing of the named event(s).
         *
         * After calling this method to resume events, the events will fire when requested to fire.
         *
         * **Note that if the {@link #suspendEvent} method is called multiple times for a certain event,
         * this converse method will have to be called the same number of times for it to resume firing.**
         *
         * @param  {String...} eventName Multiple event names to resume.
         */
        resumeEvent: function() {
            var events = this.events || 0,
                len = events && arguments.length,
                i, event;

            for (i = 0; i < len; i++) {
                // If it exists, and is an Event object (not still a boolean placeholder), resume it
                event = events[arguments[i]];
                if (event && event.resume) {
                    event.resume();
                }
            }
        },

        /**
        * Resumes firing events (see {@link #suspendEvents}).
        *
        * If events were suspended using the `queueSuspended` parameter, then all events fired
        * during event suspension will be sent to any listeners now.
        * 
        * @param {Boolean} [discardQueue] `true` to prevent any previously queued events from firing
        * while we were suspended. See {@link #suspendEvents}.
        */
        resumeEvents: function(discardQueue) {
            var me = this,
                queued = me.eventQueue,
                qLen, q;

            if (me.eventsSuspended && ! --me.eventsSuspended) {
                delete me.eventQueue;

                if (!discardQueue && queued) {
                    qLen = queued.length;
                    for (q = 0; q < qLen; q++) {
                        // Important to call fireEventArgs here so MVC can hook in
                        me.fireEventArgs.apply(me, queued[q]);
                    }
                }
            }
        },

        /**
        * Relays selected events from the specified Observable as if the events were fired by `this`.
        *
        * For example if you are extending Grid, you might decide to forward some events from store.
        * So you can do this inside your initComponent:
        *
        *     this.relayEvents(this.getStore(), ['load']);
        *
        * The grid instance will then have an observable 'load' event which will be passed the
        * parameters of the store's load event and any function fired with the grid's load event
        * would have access to the grid using the `this` keyword.
        *
        * @param {Object} origin The Observable whose events this object is to relay.
        * @param {String[]} events Array of event names to relay.
        * @param {String} [prefix] A common prefix to prepend to the event names. For example:
        *
        *     this.relayEvents(this.getStore(), ['load', 'clear'], 'store');
        *
        * Now the grid will forward 'load' and 'clear' events of store as 'storeload' and 'storeclear'.
        *
        * @return {Object} A `Destroyable` object. An object which implements the `destroy` method which, when destroyed, removes all relayers. For example:
        *
        *     this.storeRelayers = this.relayEvents(this.getStore(), ['load', 'clear'], 'store');
        *
        * Can be undone by calling
        *
        *     Ext.destroy(this.storeRelayers);
        *
        * or
        *     this.store.relayers.destroy();
        */
        relayEvents : function(origin, events, prefix) {
            var me = this,
                len = events.length,
                i = 0,
                oldName,
                relayers = {};

            for (; i < len; i++) {
                oldName = events[i];

                // Build up the listener hash.
                relayers[oldName] = me.createRelayer(prefix ? prefix + oldName : oldName);
            }
            // Add the relaying listeners as ManagedListeners so that they are removed when this.clearListeners is called (usually when _this_ is destroyed)
            // Explicitly pass options as undefined so that the listener does not get an extra options param
            // which then has to be sliced off in the relayer.
            me.mon(origin, relayers, null, null, undefined);

            // relayed events are always destroyable.
            return new ListenerRemover(me, origin, relayers);
        },

        /**
        * @private
        * Creates an event handling function which refires the event from this object as the passed event name.
        * @param {String} newName The name under which to refire the passed parameters.
        * @param {Array} beginEnd (optional) The caller can specify on which indices to slice.
        * @returns {Function}
        */
        createRelayer: function(newName, beginEnd) {
            var me = this;
            return function() {
                return me.fireEventArgs.call(me, newName, beginEnd ? arraySlice.apply(arguments, beginEnd) : arguments);
            };
        },

        /**
        * Enables events fired by this Observable to bubble up an owner hierarchy by calling `this.getBubbleTarget()` if
        * present. There is no implementation in the Observable base class.
        *
        * This is commonly used by Ext.Components to bubble events to owner Containers.
        * See {@link Ext.Component#getBubbleTarget}. The default implementation in Ext.Component returns the
        * Component's immediate owner. But if a known target is required, this can be overridden to access the
        * required target more quickly.
        *
        * Example:
        *
        *     Ext.define('Ext.overrides.form.field.Base', {
        *         override: 'Ext.form.field.Base',
        *
        *         //  Add functionality to Field's initComponent to enable the change event to bubble
        *         initComponent: function () {
        *             this.callParent();
        *             this.enableBubble('change');
        *         }
        *     });
        *
        *     var myForm = Ext.create('Ext.form.Panel', {
        *         title: 'User Details',
        *         items: [{
        *             ...
        *         }],
        *         listeners: {
        *             change: function() {
        *                 // Title goes red if form has been modified.
        *                 myForm.header.setStyle('color', 'red');
        *             }
        *         }
        *     });
        *
        * @param {String/String[]} eventNames The event name to bubble, or an Array of event names.
        */
        enableBubble: function(eventNames) {
            if (eventNames) {
                var me = this,
                    names = (typeof eventNames == 'string') ? arguments : eventNames,
                    // we must create events now if we have not yet
                    events = me.events || (me.events = {}),
                    length = events && names.length,
                    ename, event, i;

                for (i = 0; i < length; ++i) {
                    ename = names[i];
                    // This is inlined for performance
                    ename = eventNameMap[ename] || (eventNameMap[ename] = ename.toLowerCase());
                    event = events[ename];

                    if (!event || !event.isEvent) {
                        events[ename] = event = new Ext.util.Event(me, ename);
                    }

                    // Event must fire if it bubbles (We don't know if anyone up the
                    // bubble hierarchy has listeners added)
                    me.hasListeners._incr_(ename);

                    event.bubble = true;
                }
            }
        },

        deprecated: {
            '5.0': {
                methods: {
                    addEvents: null
                }
            }
        }
    };
}, function() {
    var Observable = this,
        proto = Observable.prototype,
        HasListeners = function () {},
        prepareMixin = function (T) {
            if (!T.HasListeners) {
                var proto = T.prototype;

                // Classes that use us as a mixin (best practice) need to be prepared.
                Observable.prepareClass(T, this);

                // Now that we are mixed in to class T, we need to watch T for derivations
                // and prepare them also.
                T.onExtended(function (U, data) {
                    //<debug>
                    Ext.classSystemMonitor && Ext.classSystemMonitor('extend mixin', arguments);
                    //</debug>

                    Observable.prepareClass(U, null, data);
                });

                // Also, if a class uses us as a mixin and that class is then used as
                // a mixin, we need to be notified of that as well.
                if (proto.onClassMixedIn) {
                    // play nice with other potential overrides...
                    Ext.override(T, {
                        onClassMixedIn: function (U) {
                            prepareMixin.call(this, U);
                            this.callParent(arguments);
                        }
                    });
                } else {
                    // just us chickens, so add the method...
                    proto.onClassMixedIn = function (U) {
                        prepareMixin.call(this, U);
                    };
                }
            }
        };

    HasListeners.prototype = {
        //$$: 42  // to make sure we have a proper prototype
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
    };

    proto.HasListeners = Observable.HasListeners = HasListeners;

    Observable.createAlias({
        /**
         * @method
         * @inheritdoc Ext.util.Observable#addListener
         */
        on: 'addListener',
        /**
         * @method
         * Shorthand for {@link #removeListener}.
         * @inheritdoc Ext.util.Observable#removeListener
         */
        un: 'removeListener',
        /**
         * @method
         * Shorthand for {@link #addManagedListener}.
         * @inheritdoc Ext.util.Observable#addManagedListener
         */
        mon: 'addManagedListener',
        /**
         * @method
         * Shorthand for {@link #removeManagedListener}.
         * @inheritdoc Ext.util.Observable#removeManagedListener
         */
        mun: 'removeManagedListener'
    });

    //deprecated, will be removed in 5.0
    Observable.observeClass = Observable.observe;

    // this is considered experimental (along with beforeMethod, afterMethod, removeMethodListener?)
    // allows for easier interceptor and sequences, including cancelling and overwriting the return value of the call
    // private
    function getMethodEvent(method){
        var e = (this.methodEvents = this.methodEvents || {})[method],
            returnValue,
            v,
            cancel,
            obj = this,
            makeCall;

        if (!e) {
            this.methodEvents[method] = e = {};
            e.originalFn = this[method];
            e.methodName = method;
            e.before = [];
            e.after = [];

            makeCall = function(fn, scope, args){
                if((v = fn.apply(scope || obj, args)) !== undefined){
                    if (typeof v == 'object') {
                        if(v.returnValue !== undefined){
                            returnValue = v.returnValue;
                        }else{
                            returnValue = v;
                        }
                        cancel = !!v.cancel;
                    }
                    else
                        if (v === false) {
                            cancel = true;
                        }
                        else {
                            returnValue = v;
                        }
                }
            };

            this[method] = function(){
                var args = Array.prototype.slice.call(arguments, 0),
                    b, i, len;
                returnValue = v = undefined;
                cancel = false;

                for(i = 0, len = e.before.length; i < len; i++){
                    b = e.before[i];
                    makeCall(b.fn, b.scope, args);
                    if (cancel) {
                        return returnValue;
                    }
                }

                if((v = e.originalFn.apply(obj, args)) !== undefined){
                    returnValue = v;
                }

                for(i = 0, len = e.after.length; i < len; i++){
                    b = e.after[i];
                    makeCall(b.fn, b.scope, args);
                    if (cancel) {
                        return returnValue;
                    }
                }
                return returnValue;
            };
        }
        return e;
    }

    Ext.apply(proto, {
        onClassMixedIn: prepareMixin,

        // these are considered experimental
        // allows for easier interceptor and sequences, including cancelling and overwriting the return value of the call
        // adds an 'interceptor' called before the original method
        beforeMethod : function(method, fn, scope){
            getMethodEvent.call(this, method).before.push({
                fn: fn,
                scope: scope
            });
        },

        // adds a 'sequence' called after the original method
        afterMethod : function(method, fn, scope){
            getMethodEvent.call(this, method).after.push({
                fn: fn,
                scope: scope
            });
        },

        removeMethodListener: function(method, fn, scope){
            var e = this.getMethodEvent(method),
                i, len;
            for(i = 0, len = e.before.length; i < len; i++){
                if(e.before[i].fn == fn && e.before[i].scope == scope){
                    Ext.Array.erase(e.before, i, 1);
                    return;
                }
            }
            for(i = 0, len = e.after.length; i < len; i++){
                if(e.after[i].fn == fn && e.after[i].scope == scope){
                    Ext.Array.erase(e.after, i, 1);
                    return;
                }
            }
        },

        toggleEventLogging: function(toggle) {
            Ext.util.Observable[toggle ? 'capture' : 'releaseCapture'](this, function(en) {
                if (Ext.isDefined(Ext.global.console)) {
                    Ext.global.console.log(en, arguments);
                }
            });
        }
    });
});
