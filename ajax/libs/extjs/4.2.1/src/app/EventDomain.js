/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * This class is a base class for an event domain. In the context of MVC, an "event domain"
 * is one or more base classes that fire events to which a Controller wants to listen. A
 * controller listens to events by describing the selectors for events of interest to it.
 *
 * Matching selectors to the firer of an event is one key aspect that defines an event
 * domain. All event domain instances must provide a `match` method that tests selectors
 * against the event firer.
 *
 * When an event domain instance is created (typically as a `singleton`), its `type`
 * property is used to catalog the domain in the
 * {@link Ext.app.EventDomain#instances Ext.app.EventDomain.instances} map.
 *
 * There are five event domains provided by default:
 *
 * -   {@link Ext.app.domain.Component Component domain}. This is the primary event domain that
 * has been available since Ext JS MVC was introduced. This domain is defined as any class that
 * extends {@link Ext.Component}, where the selectors use
 * {@link Ext.ComponentQuery#query Ext.ComponentQuery}.
 * -   {@link Ext.app.domain.Global Global domain}. This domain provides Controllers with access
 * to events fired from {@link Ext#globalEvents} Observable instance. These events represent
 * the state of the application as a whole, and are always anonymous. Because of this, Global
 * domain does not provide selectors at all.
 * -   {@link Ext.app.domain.Controller Controller domain}. This domain includes all classes
 * that extend {@link Ext.app.Controller}. Events fired by Controllers will be available
 * within this domain; selectors are either Controller's {@link Ext.app.Controller#id id} or
 * '*' wildcard for any Controller.
 * -   {@link Ext.app.domain.Store Store domain}. This domain is for classes extending
 * {@link Ext.data.AbstractStore}. Selectors are either Store's
 * {@link Ext.data.AbstractStore#storeId storeId} or '*' wildcard for any Store.
 * -   {@link Ext.app.domain.Direct Direct domain}. This domain includes all classes that extend
 * {@link Ext.direct.Provider}. Selectors are either Provider's {@link Ext.direct.Provider#id id}
 * or '*' wildcard for any Provider. This domain is optional and will be loaded only if
 * {@link Ext.direct.Manager} singleton is required in your application.
 *
 * @protected
 */

Ext.define('Ext.app.EventDomain', {
    requires: [
        'Ext.util.Event'
    ],

    statics: {
        /**
         * An object map containing `Ext.app.EventDomain` instances keyed by the value
         * of their `type` property.
         */
        instances: {}
    },
    
    /**
     * @cfg {String} idProperty Name of the identifier property for this event domain.
     */
     
    isEventDomain: true,

    constructor: function() {
        var me = this;

        Ext.app.EventDomain.instances[me.type] = me;

        me.bus = {};
        me.monitoredClasses = [];
    },

    /**
     * This method dispatches an event fired by an object monitored by this domain. This
     * is not called directly but is called by interceptors injected by the `monitor` method.
     * 
     * @param {Object} target The firer of the event.
     * @param {String} ev The event being fired.
     * @param {Array} args The arguments for the event. This array **does not** include the event name.
     * That has already been sliced off because this class intercepts the {@link Ext.util.Observable#fireEventArgs fireEventArgs}
     * method which takes an array as the event's argument list.
     *
     * @return {Boolean} `false` if any listener returned `false`, otherwise `true`.
     *
     * @private
     */
    dispatch: function(target, ev, args) {
        var me = this,
            bus = me.bus,
            selectors = bus[ev],
            selector, controllers, id, events, event, i, ln;

        if (!selectors) {
            return true;
        }

        // Loop over all the selectors that are bound to this event
        for (selector in selectors) {
            // Check if the target matches the selector
            if (selectors.hasOwnProperty(selector) && me.match(target, selector)) {
                // Loop over all the controllers that are bound to this selector
                controllers = selectors[selector];

                for (id in controllers) {
                    if (controllers.hasOwnProperty(id)) {
                        // Loop over all the events that are bound to this selector
                        events = controllers[id];

                        for (i = 0, ln = events.length; i < ln; i++) {
                            event = events[i];

                            // Fire the event!
                            if (event.fire.apply(event, args) === false) {
                                return false;
                            }
                        }
                    }
                }
            }
        }

        return true;
    },

    /**
     * This method adds listeners on behalf of a controller. This method is passed an
     * object that is keyed by selectors. The value of these is also an object but now
     * keyed by event name. For example:
     * 
     *      domain.listen({
     *          'some[selector]': {
     *              click: function() { ... }
     *          },
     *          
     *          'other selector': {
     *              change: {
     *                  fn: function() { ... },
     *                  delay: 10
     *              }
     *          }
     *      
     *      }, controller);
     * 
     * @param {Object} selectors Config object containing selectors and listeners.
     *
     * @private
     */
    listen: function(selectors, controller) {
        var me = this,
            bus = me.bus,
            idProperty = me.idProperty,
            monitoredClasses = me.monitoredClasses,
            monitoredClassesCount = monitoredClasses.length,
            i, tree, list, selector, options, listener, scope, event, listeners, ev;

        for (selector in selectors) {
            if (selectors.hasOwnProperty(selector) && (listeners = selectors[selector])) {
                if (idProperty) {
                    //<debug>
                    if (!/^[*#]/.test(selector)) {
                        Ext.Error.raise('Selectors containing id should begin with #');
                    }
                    //</debug>
                
                    selector = selector === '*' ? selector : selector.substring(1);
                }
                
                for (ev in listeners) {
                    if (listeners.hasOwnProperty(ev)) {
                        options  = null;
                        listener = listeners[ev];
                        scope    = controller;
                        event    = new Ext.util.Event(controller, ev);

                        // Normalize the listener
                        if (Ext.isObject(listener)) {
                            options  = listener;
                            listener = options.fn;
                            scope    = options.scope || controller;

                            delete options.fn;
                            delete options.scope;
                        }

                        if (typeof listener === 'string') {
                            listener = scope[listener];
                        }
                        event.addListener(listener, scope, options);

                        for (i = monitoredClassesCount; i-- > 0;) {
                            monitoredClasses[i].hasListeners._incr_(ev);
                        }

                        // Create the bus tree if it is not there yet
                        tree = bus[ev]             || (bus[ev] = {});
                        tree = tree[selector]      || (tree[selector] = {});
                        list = tree[controller.id] || (tree[controller.id] = []);

                        // Push our listener in our bus
                        list.push(event);
                    }
                } //end inner loop
            }
        } //end outer loop
    },

    /**
     * This method matches the firer of the event (the `target`) to the given `selector`.
     * Default matching is very simple: a match is true when selector equals target's
     * {@link #cfg-idProperty idProperty}, or when selector is '*' wildcard to match any
     * target.
     * 
     * @param {Object} target The firer of the event.
     * @param {String} selector The selector to which to match the `target`.
     *
     * @return {Boolean} `true` if the `target` matches the `selector`.
     *
     * @protected
     */
    match: function(target, selector) {
        var idProperty = this.idProperty;
        
        if (idProperty) {
            return selector === '*' || target[idProperty] === selector;
        }
        
        return false;
    },

    /**
     * This method is called by the derived class to monitor `fireEvent` calls. Any call
     * to `fireEvent` on the target Observable will be intercepted and dispatched to any
     * listening Controllers. Assuming the original `fireEvent` method does not return
     * `false`, the event is passed to the `dispatch` method of this object.
     * 
     * This is typically called in the `constructor` of derived classes.
     * 
     * @param {Ext.Class} observable The Observable to monitor for events.
     *
     * @protected
     */
    monitor: function(observable) {
        var domain = this,
            prototype = observable.isInstance ? observable : observable.prototype,
            fireEventArgs = prototype.fireEventArgs;

        domain.monitoredClasses.push(observable);

        prototype.fireEventArgs = function(ev, args) {
            var ret = fireEventArgs.apply(this, arguments);

            if (ret !== false) {
                ret = domain.dispatch(this, ev, args);
            }

            return ret;
        };
    },

    /**
     * Removes all of a controller's attached listeners.
     *
     * @param {String} controllerId The id of the controller.
     *
     * @private
     */
    unlisten: function(controllerId) {
        var bus = this.bus,
            controllers, ev, selector, selectors;

        for (ev in bus) {
            if (bus.hasOwnProperty(ev) && (selectors = bus[ev])) {
                for (selector in selectors) {
                    controllers = selectors[selector];
                    delete controllers[controllerId];  // harmless if !hasOwnProperty
                }
            }
        }
    }
});
