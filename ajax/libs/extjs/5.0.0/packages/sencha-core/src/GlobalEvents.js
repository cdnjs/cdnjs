/**
 * An `{@link Ext.mixin.Observable Observable}` through which Ext fires global events.
 * 
 * Ext.on() and Ext.un() are shorthand for {@link #addListener} and {@link #removeListener}
 * on this Observable.  For example, to listen for the idle event:
 * 
 *     Ext.on('idle', function() {
 *         // do something
 *     });
 */
Ext.define('Ext.GlobalEvents', {
    extend: 'Ext.mixin.Observable',
    alternateClassName: 'Ext.globalEvents', // for compat with Ext JS 4.2 and earlier
    
    requires: [
        'Ext.dom.Element'
    ],

    observableType: 'global',

    singleton: true,

    // private
    resizeBuffer: 100,

    /**
     * @event added
     * Fires when a Component is added to a Container.
     * @param {Ext.Component} component
     */

    /**
     * @event collapse
     * Fires when a Component is collapsed (e.g., a panel).
     * @param {Ext.Component} component
     */

    /**
     * @event expand
     * Fires when a Component is expanded (e.g., a panel).
     * @param {Ext.Component} component
     */

    /**
     * @event hide
     * Fires when a Component is hidden.
     * @param {Ext.Component} component
     */

    /**
     * @event idle
     * Fires when an event handler finishes its run, just before returning to
     * browser control.
     * 
     * This includes DOM event handlers, Ajax (including JSONP) event handlers,
     * and {@link Ext.util.TaskRunner TaskRunners}
     * 
     * When called at the tail of a DOM event, the event object is passed as the
     * sole parameter.
     * 
     * This can be useful for performing cleanup, or update tasks which need to
     * happen only after all code in an event handler has been run, but which
     * should not be executed in a timer due to the intervening browser
     * reflow/repaint which would take place.
     */

    /**
     * @event removed
     * Fires when a Component is removed from a Container.
     * @param {Ext.Component} component
     */

    /**
     * @event resize
     * Fires when the browser window is resized.  To avoid running resize handlers
     * too often resulting in sluggish window resizing, resize events use a buffer
     * of 100 milliseconds.
     * @param {Number} width The new width
     * @param {Number} height The new height
     */

    /**
     * @event show
     * Fires when a Component is shown.
     * @param {Ext.Component} component
     */

    /**
     * @property {Object} idleEventMask
     * This object holds event names for events that should not trigger an `idle` event
     * following their dispatch.
     * @private
     * @since 5.0.0
     */
    idleEventMask: {
        mousemove: 1,
        touchmove: 1,
        pointermove: 1,
        MSPointerMove: 1,
        unload: 1
    },

    constructor: function() {
        var me = this;

        me.callParent();

        Ext.onReady(function() {
            // using a closure here instead of attaching the event directly to the
            // attachListeners method gives us a chance to override the method
            me.attachListeners();
        });
    },

    attachListeners: function() {
        Ext.get(window).on('resize', this.fireResize, this, {
            buffer: this.resizeBuffer
        });
    },

    fireResize: function() {
        var me = this,
            Element = Ext.Element,
            w = Element.getViewportWidth(),
            h = Element.getViewportHeight();

         // In IE the resize event will sometimes fire even though the w/h are the same.
         if (me.curHeight !== h || me.curWidth !== w) {
             me.curHeight = h;
             me.curWidth = w;
             me.fireEvent('resize', w, h);
         }
    }

}, function(GlobalEvents) {
    /**
     * @member Ext
     * @method on
     * Shorthand for {@link Ext.GlobalEvents#addListener}.
     * @inheritdoc Ext.util.Observable#addListener
     */
    Ext.on = function() {
        return GlobalEvents.addListener.apply(GlobalEvents, arguments);
    };

    /**
     * @member Ext
     * @method
     * Shorthand for {@link Ext.GlobalEvents#removeListener}.
     * @inheritdoc Ext.util.Observable#removeListener
     */
    Ext.un = function() {
        return GlobalEvents.removeListener.apply(GlobalEvents, arguments);
    };
});
