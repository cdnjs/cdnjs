/**
 * @class Ext.state.Stateful
 * A mixin for being able to save the state of an object to an underlying
 * {@link Ext.state.Provider}.
 * @private
 */
Ext.define('Ext.state.Stateful', {
    mixinId: 'state',

    requires: ['Ext.state.Manager'],

    /**
     * @cfg {Boolean} stateful
     * A flag which causes the object to attempt to restore the state of
     * internal properties from a saved state on startup. The object must have
     * a {@link #stateId} for state to be managed.
     *
     * Auto-generated ids are not guaranteed to be stable across page loads and
     * cannot be relied upon to save and restore the same state for a object.
     *
     * For state saving to work, the state manager's provider must have been
     * set to an implementation of {@link Ext.state.Provider} which overrides the
     * {@link Ext.state.Provider#set set} and {@link Ext.state.Provider#get get}
     * methods to save and recall name/value pairs. A built-in implementation,
     * {@link Ext.state.CookieProvider} is available.
     *
     * To set the state provider for the current page:
     *
     *    Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
     *        expires: new Date(new Date().getTime()+(1000*60*60*24*7)), //7 days from now
     *    }));
     *
     * A stateful object attempts to save state when one of the events
     * listed in the {@link #stateEvents} configuration fires.
     *
     * To save state, a stateful object first serializes its state by
     * calling *{@link #getState}*.
     *
     * The Component base class implements {@link #getState} to save its width and height within the state
     * only if they were initially configured, and have changed from the configured value.
     *
     * The Panel class saves its collapsed state in addition to that.
     *
     * The Grid class saves its column state and store state (sorters and filters and grouper) in addition to its superclass state.
     *
     * If there is more application state to be save, the developer must provide an implementation which
     * first calls the superclass method to inherit the above behaviour, and then injects new properties
     * into the returned object.
     *
     * The value yielded by getState is passed to {@link Ext.state.Manager#set}
     * which uses the configured {@link Ext.state.Provider} to save the object
     * keyed by the {@link #stateId}.
     *
     * During construction, a stateful object attempts to *restore* its state by calling
     * {@link Ext.state.Manager#get} passing the {@link #stateId}
     *
     * The resulting object is passed to {@link #applyState}*. The default implementation of
     * {@link #applyState} simply copies properties into the object, but a developer may
     * override this to support restoration of more complex application state.
     *
     * You can perform extra processing on state save and restore by attaching
     * handlers to the {@link #beforestaterestore}, {@link #staterestore},
     * {@link #beforestatesave} and {@link #statesave} events.
     */
    stateful: false,

    /**
     * @cfg {String} stateId
     * The unique id for this object to use for state management purposes.
     *
     * See {@link #stateful} for an explanation of saving and restoring state.
     */

    /**
     * @cfg {String[]} stateEvents
     * <An array of events that, when fired, should trigger this object to
     * save its state. Defaults to none. `stateEvents` may be any type
     * of event supported by this object, including browser or custom events
     * (e.g., `['click', 'customerchange']`).
     *
     * See `{@link #stateful}` for an explanation of saving and
     * restoring object state.
     */

    /**
     * @cfg {Number} saveDelay
     * A buffer to be applied if many state events are fired within a short period.
     */
    saveDelay: 100,

    /**
     * @event beforestaterestore
     * Fires before the state of the object is restored. Return false from an event handler to stop the restore.
     * @param {Ext.state.Stateful} this
     * @param {Object} state The hash of state values returned from the StateProvider. If this
     * event is not vetoed, then the state object is passed to *`applyState`*. By default,
     * that simply copies property values into this object. The method maybe overriden to
     * provide custom state restoration.
     */

    /**
     * @event staterestore
     * Fires after the state of the object is restored.
     * @param {Ext.state.Stateful} this
     * @param {Object} state The hash of state values returned from the StateProvider. This is passed
     * to *`applyState`*. By default, that simply copies property values into this
     * object. The method maybe overridden to provide custom state restoration.
     */

    /**
     * @event beforestatesave
     * Fires before the state of the object is saved to the configured state provider. Return false to stop the save.
     * @param {Ext.state.Stateful} this
     * @param {Object} state The hash of state values. This is determined by calling
     * *`getState()`* on the object. This method must be provided by the
     * developer to return whatever representation of state is required, by default, Ext.state.Stateful
     * has a null implementation.
     */

    /**
     * @event statesave
     * Fires after the state of the object is saved to the configured state provider.
     * @param {Ext.state.Stateful} this
     * @param {Object} state The hash of state values. This is determined by calling
     * *`getState()`* on the object. This method must be provided by the
     * developer to return whatever representation of state is required, by default, Ext.state.Stateful
     * has a null implementation.
     */

    constructor: function() {
        var me = this;

        if (!me.stateEvents) {
            me.stateEvents = [];
        }

        if (me.stateful !== false) {
            me.addStateEvents(me.stateEvents);
            me.initState();
        }
    },

    /**
     * Add events that will trigger the state to be saved. If the first argument is an
     * array, each element of that array is the name of a state event. Otherwise, each
     * argument passed to this method is the name of a state event.
     *
     * @param {String/String[]} events The event name or an array of event names.
     */
    addStateEvents: function (events) {
        var me = this,
            i, event, stateEventsByName,
            eventArray;

        if (me.stateful && me.getStateId()) {
            eventArray =  (typeof events === 'string') ? arguments : events;

            stateEventsByName = me.stateEventsByName || (me.stateEventsByName = {});

            for (i = eventArray.length; i--; ) {
                event = eventArray[i];

                if (event && !stateEventsByName[event]) {
                    stateEventsByName[event] = 1;
                    me.on(event, me.onStateChange, me);
                }
            }
        }
    },

    /**
     * This method is called when any of the {@link #stateEvents} are fired.
     * @private
     */
    onStateChange: function(){
        var me = this,
            delay = me.saveDelay,
            statics, runner;

        if (!me.stateful) {
            return;
        }

        if (delay) {
            if (!me.stateTask) {
                statics = Ext.state.Stateful;
                runner = statics.runner || (statics.runner = new Ext.util.TaskRunner());

                me.stateTask = runner.newTask({
                    run: me.saveState,
                    scope: me,
                    interval: delay,
                    repeat: 1
                });
            }

            me.stateTask.start();
        } else {
            me.saveState();
        }
    },

    /**
     * Saves the state of the object to the persistence store.
     */
    saveState: function() {
        var me = this,
            id = me.stateful && me.getStateId(),
            hasListeners = me.hasListeners,
            plugins,
            plugin,
            i, len,
            state,
            pluginState;

        if (id) {
            state = me.getState() || {};    //pass along for custom interactions

            /*
             * Gather state from those plugins that implement a getState method
             */
            plugins = me.getPlugins() || [];
            for (i = 0, len = plugins.length; i < len; i++) {
                plugin = plugins[i];
                if (plugin && plugin.getState) {
                    pluginState = plugin.getState(state);
                    if (pluginState && !state[plugin.ptype]) {  //first duplicate plugin wins
                        state[plugin.ptype] = pluginState;
                    }
                }
            }

            if (!hasListeners.beforestatesave || me.fireEvent('beforestatesave', me, state) !== false) {
                Ext.state.Manager.set(id, state);
                if (hasListeners.statesave) {
                    me.fireEvent('statesave', me, state);
                }
            }
        }
    },

    /**
     * Gets the current state of the object. By default this function returns null,
     * it should be overridden in subclasses to implement methods for getting the state.
     * @return {Object} The current state
     */
    getState: function(){
        return null;
    },

    /**
     * Applies the state to the object. This should be overridden in subclasses to do
     * more complex state operations. By default it applies the state properties onto
     * the current object.
     * @param {Object} state The state
     */
    applyState: function(state) {
        if (state) {
            Ext.apply(this, state);
        }
    },

    /**
     * Gets the state id for this object.
     * @return {String} The 'stateId' or the implicit 'id' specified by component configuration.
     * @private
     */
    getStateId: function() {
        var me = this;
        return me.stateId || (me.autoGenId ? null : me.id);
    },

    /**
     * Initializes the state of the object upon construction.
     * @private
     */
    initState: function(){
        var me = this,
            id = me.stateful && me.getStateId(),
            hasListeners = me.hasListeners,
            state,
            combinedState,
            i, len,
            plugins,
            plugin,
            pluginType;

        if (id) {
            combinedState = Ext.state.Manager.get(id);
            if (combinedState) {
                state = Ext.apply({}, combinedState);
                if (!hasListeners.beforestaterestore || me.fireEvent('beforestaterestore', me, combinedState) !== false) {

                    //Notify all plugins FIRST (if interested) in new state
                    plugins = me.getPlugins() || [];
                    for (i = 0, len = plugins.length; i < len; i++) {
                        plugin = plugins[i];
                        if (plugin) {
                            pluginType = plugin.ptype;
                            if (plugin.applyState) {
                                plugin.applyState(state[pluginType], combinedState);
                            }
                            delete state[pluginType];  //clean to prevent unwanted props on the component in final phase
                        }
                    }

                    me.applyState(state);
                    if (hasListeners.staterestore) {
                        me.fireEvent('staterestore', me, combinedState);
                    }
                }
            }
        }
    },

    /**
     * Conditionally saves a single property from this object to the given state object.
     * The idea is to only save state which has changed from the initial state so that
     * current software settings do not override future software settings. Only those
     * values that are user-changed state should be saved.
     *
     * @param {String} propName The name of the property to save.
     * @param {Object} state The state object in to which to save the property.
     * @param {String} stateName (optional) The name to use for the property in state.
     * @return {Boolean} True if the property was saved, false if not.
     */
    savePropToState: function (propName, state, stateName) {
        var me = this,
            value = me[propName],
            config = me.initialConfig;

        if (me.hasOwnProperty(propName)) {
            if (!config || config[propName] !== value) {
                if (state) {
                    state[stateName || propName] = value;
                }
                return true;
            }
        }
        return false;
    },

    /**
     * Gathers additional named properties of the instance and adds their current values
     * to the passed state object.
     * @param {String/String[]} propNames The name (or array of names) of the property to save.
     * @param {Object} state The state object in to which to save the property values.
     * @return {Object} state
     */
    savePropsToState: function (propNames, state) {
        var me = this,
            i, n;

        if (typeof propNames === 'string') {
            me.savePropToState(propNames, state);
        } else {
            for (i = 0, n = propNames.length; i < n; ++i) {
                me.savePropToState(propNames[i], state);
            }
        }

        return state;
    },

    /**
     * Destroys this stateful object.
     */
    destroy: function(){
        var me = this,
            task = me.stateTask;

        if (task) {
            task.destroy();
            me.stateTask = null;
        }

        me.clearListeners();
    }
});
