/**
 * A field with a pair of up/down spinner buttons. This class is not normally instantiated directly,
 * instead it is subclassed and the {@link #onSpinUp} and {@link #onSpinDown} methods are implemented
 * to handle when the buttons are clicked. A good example of this is the {@link Ext.form.field.Number}
 * field which uses the spinner to increment and decrement the field's value by its
 * {@link Ext.form.field.Number#step step} config value.
 *
 * For example:
 *
 *     @example
 *     Ext.define('Ext.ux.CustomSpinner', {
 *         extend: 'Ext.form.field.Spinner',
 *         alias: 'widget.customspinner',
 *
 *         // override onSpinUp (using step isn't neccessary)
 *         onSpinUp: function() {
 *             var me = this;
 *             if (!me.readOnly) {
 *                 var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
 *                 me.setValue((val + me.step) + ' Pack');
 *             }
 *         },
 *
 *         // override onSpinDown
 *         onSpinDown: function() {
 *             var me = this;
 *             if (!me.readOnly) {
 *                var val = parseInt(me.getValue().split(' '), 10)||0; // gets rid of " Pack", defaults to zero on parse failure
 *                if (val <= me.step) {
 *                    me.setValue('Dry!');
 *                } else {
 *                    me.setValue((val - me.step) + ' Pack');
 *                }
 *             }
 *         }
 *     });
 *
 *     Ext.create('Ext.form.FormPanel', {
 *         title: 'Form with SpinnerField',
 *         bodyPadding: 5,
 *         width: 350,
 *         renderTo: Ext.getBody(),
 *         items:[{
 *             xtype: 'customspinner',
 *             fieldLabel: 'How Much Beer?',
 *             step: 6
 *         }]
 *     });
 *
 * By default, pressing the up and down arrow keys will also trigger the onSpinUp and onSpinDown methods;
 * to prevent this, set `{@link #keyNavEnabled} = false`.
 */
Ext.define('Ext.form.field.Spinner', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.spinnerfield',
    alternateClassName: 'Ext.form.Spinner',
    requires: [
        'Ext.form.trigger.Spinner',
        'Ext.util.KeyNav'
    ],

    config: {
        triggers: {
            spinner: {
                type: 'spinner',
                upHandler: 'onSpinnerUpClick',
                downHandler: 'onSpinnerDownClick',
                scope: 'this'
            }
        }
    },

    /**
     * @cfg {Boolean} spinUpEnabled
     * Specifies whether the up spinner button is enabled. Defaults to true. To change this after the component is
     * created, use the {@link #setSpinUpEnabled} method.
     */
    spinUpEnabled: true,

    /**
     * @cfg {Boolean} spinDownEnabled
     * Specifies whether the down spinner button is enabled. Defaults to true. To change this after the component is
     * created, use the {@link #setSpinDownEnabled} method.
     */
    spinDownEnabled: true,

    /**
     * @cfg {Boolean} keyNavEnabled
     * Specifies whether the up and down arrow keys should trigger spinning up and down. Defaults to true.
     */
    keyNavEnabled: true,

    /**
     * @cfg {Boolean} mouseWheelEnabled
     * Specifies whether the mouse wheel should trigger spinning up and down while the field has focus.
     * Defaults to true.
     */
    mouseWheelEnabled: true,

    /**
     * @cfg {Boolean} repeatTriggerClick
     * Whether a {@link Ext.util.ClickRepeater click repeater} should be attached to the spinner buttons.
     * Defaults to true.
     */
    repeatTriggerClick: true,

    /**
     * @method
     * @protected
     * This method is called when the spinner up button is clicked, or when the up arrow key is pressed if
     * {@link #keyNavEnabled} is true. Must be implemented by subclasses.
     */
    onSpinUp: Ext.emptyFn,

    /**
     * @method
     * @protected
     * This method is called when the spinner down button is clicked, or when the down arrow key is pressed if
     * {@link #keyNavEnabled} is true. Must be implemented by subclasses.
     */
    onSpinDown: Ext.emptyFn,
    
    ariaRole: 'spinbutton',

    /**
     * @event spin
     * Fires when the spinner is made to spin up or down.
     * @param {Ext.form.field.Spinner} this
     * @param {String} direction Either 'up' if spinning up, or 'down' if spinning down.
     */

    /**
     * @event spinup
     * Fires when the spinner is made to spin up.
     * @param {Ext.form.field.Spinner} this
     */

    /**
     * @event spindown
     * Fires when the spinner is made to spin down.
     * @param {Ext.form.field.Spinner} this
     */

    applyTriggers: function(triggers) {
        var me = this,
            spinnerTrigger = triggers.spinner;

        spinnerTrigger.upEnabled = me.spinUpEnabled;
        spinnerTrigger.downEnabled = me.spinDownEnabled;

        return me.callParent([triggers]);
    },

    /**
     * @private
     * Override.
     */
    onRender: function() {
        var me = this,
            spinnerTrigger = me.getTrigger('spinner');

        me.callParent();

        // Init up/down arrow keys
        if (me.keyNavEnabled) {
            me.spinnerKeyNav = new Ext.util.KeyNav(me.inputEl, {
                scope: me,
                up: me.spinUp,
                down: me.spinDown
            });
        }

        // Init mouse wheel
        if (me.mouseWheelEnabled) {
            me.mon(me.bodyEl, 'mousewheel', me.onMouseWheel, me);
        }

        // in v4 spinUpEl/spinDownEl were childEls, now they are children of the trigger.
        // create references for compatibility
        me.spinUpEl = spinnerTrigger.upEl;
        me.spinDownEl = spinnerTrigger.downEl;
    },

    /**
     * @private
     * Handles the spinner up button clicks.
     */
    onSpinnerUpClick: function() {
        this.spinUp();
    },

    /**
     * @private
     * Handles the spinner down button clicks.
     */
    onSpinnerDownClick: function() {
        this.spinDown();
    },

    /**
     * Triggers the spinner to step up; fires the {@link #spin} and {@link #spinup} events and calls the
     * {@link #onSpinUp} method. Does nothing if the field is {@link #disabled} or if {@link #spinUpEnabled}
     * is false.
     */
    spinUp: function() {
        var me = this;
        if (me.spinUpEnabled && !me.disabled) {
            me.fireEvent('spin', me, 'up');
            me.fireEvent('spinup', me);
            me.onSpinUp();
        }
    },

    /**
     * Triggers the spinner to step down; fires the {@link #spin} and {@link #spindown} events and calls the
     * {@link #onSpinDown} method. Does nothing if the field is {@link #disabled} or if {@link #spinDownEnabled}
     * is false.
     */
    spinDown: function() {
        var me = this;
        if (me.spinDownEnabled && !me.disabled) {
            me.fireEvent('spin', me, 'down');
            me.fireEvent('spindown', me);
            me.onSpinDown();
        }
    },

    /**
     * Sets whether the spinner up button is enabled.
     * @param {Boolean} enabled true to enable the button, false to disable it.
     */
    setSpinUpEnabled: function(enabled) {
        var me = this,
            wasEnabled = me.spinUpEnabled;
        me.spinUpEnabled = enabled;
        if (wasEnabled !== enabled && me.rendered) {
            me.getTrigger('spinner').setUpEnabled(enabled);
        }
    },

    /**
     * Sets whether the spinner down button is enabled.
     * @param {Boolean} enabled true to enable the button, false to disable it.
     */
    setSpinDownEnabled: function(enabled) {
        var me = this,
            wasEnabled = me.spinDownEnabled;
        me.spinDownEnabled = enabled;
        if (wasEnabled !== enabled && me.rendered) {
            me.getTrigger('spinner').setDownEnabled(enabled);
        }
    },

    /**
     * @private
     * Handles mousewheel events on the field
     */
    onMouseWheel: function(e) {
        var me = this,
            delta;
        if (me.hasFocus) {
            delta = e.getWheelDelta();
            if (delta > 0) {
                me.spinUp();
            } else if (delta < 0) {
                me.spinDown();
            }
            e.stopEvent();
        }
    },

    onDestroy: function() {
        Ext.destroyMembers(this, 'spinnerKeyNav');
        this.callParent();
    }

});