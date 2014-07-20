/**
 * @docauthor Jason Johnston <jason@sencha.com>
 * 
 * FormPanel provides a standard container for forms. It is essentially a standard {@link Ext.panel.Panel} which
 * automatically creates a {@link Ext.form.Basic BasicForm} for managing any {@link Ext.form.field.Field}
 * objects that are added as descendants of the panel. It also includes conveniences for configuring and
 * working with the BasicForm and the collection of Fields.
 * 
 * # Layout
 * 
 * By default, FormPanel is configured with `{@link Ext.layout.container.Anchor layout:'anchor'}` for
 * the layout of its immediate child items. This can be changed to any of the supported container layouts.
 * The layout of sub-containers is configured in {@link Ext.container.Container#layout the standard way}.
 * 
 * # BasicForm
 * 
 * FormPanel class accepts all
 * of the config options supported by the {@link Ext.form.Basic} class, and will pass them along to
 * the internal BasicForm when it is created.
 * 
 * The following events fired by the BasicForm will be re-fired by the FormPanel and can therefore be
 * listened for on the FormPanel itself:
 * 
 * - {@link Ext.form.Basic#beforeaction beforeaction}
 * - {@link Ext.form.Basic#actionfailed actionfailed}
 * - {@link Ext.form.Basic#actioncomplete actioncomplete}
 * - {@link Ext.form.Basic#validitychange validitychange}
 * - {@link Ext.form.Basic#dirtychange dirtychange}
 * 
 * # Field Defaults
 * 
 * The {@link #fieldDefaults} config option conveniently allows centralized configuration of default values
 * for all fields added as descendants of the FormPanel. Any config option recognized by implementations
 * of {@link Ext.form.Labelable} may be included in this object. See the {@link #fieldDefaults} documentation
 * for details of how the defaults are applied.
 * 
 * # Form Validation
 * 
 * With the default configuration, form fields are validated on-the-fly while the user edits their values.
 * This can be controlled on a per-field basis (or via the {@link #fieldDefaults} config) with the field
 * config properties {@link Ext.form.field.Field#validateOnChange} and {@link Ext.form.field.Base#checkChangeEvents},
 * and the FormPanel's config properties {@link #pollForChanges} and {@link #pollInterval}.
 * 
 * Any component within the FormPanel can be configured with `formBind: true`. This will cause that
 * component to be automatically disabled when the form is invalid, and enabled when it is valid. This is most
 * commonly used for Button components to prevent submitting the form in an invalid state, but can be used on
 * any component type.
 * 
 * For more information on form validation see the following:
 * 
 * - {@link Ext.form.field.Field#validateOnChange}
 * - {@link #pollForChanges} and {@link #pollInterval}
 * - {@link Ext.form.field.VTypes}
 * - {@link Ext.form.Basic#doAction BasicForm.doAction clientValidation notes}
 * 
 * # Form Submission
 * 
 * By default, Ext Forms are submitted through Ajax, using {@link Ext.form.action.Action}. See the documentation for
 * {@link Ext.form.Basic} for details.
 *
 * # Example usage
 * 
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'Simple Form',
 *         bodyPadding: 5,
 *         width: 350,
 * 
 *         // The form will submit an AJAX request to this URL when submitted
 *         url: 'save-form.php',
 * 
 *         // Fields will be arranged vertically, stretched to full width
 *         layout: 'anchor',
 *         defaults: {
 *             anchor: '100%'
 *         },
 * 
 *         // The fields
 *         defaultType: 'textfield',
 *         items: [{
 *             fieldLabel: 'First Name',
 *             name: 'first',
 *             allowBlank: false
 *         },{
 *             fieldLabel: 'Last Name',
 *             name: 'last',
 *             allowBlank: false
 *         }],
 * 
 *         // Reset and Submit buttons
 *         buttons: [{
 *             text: 'Reset',
 *             handler: function() {
 *                 this.up('form').getForm().reset();
 *             }
 *         }, {
 *             text: 'Submit',
 *             formBind: true, //only enabled once the form is valid
 *             disabled: true,
 *             handler: function() {
 *                 var form = this.up('form').getForm();
 *                 if (form.isValid()) {
 *                     form.submit({
 *                         success: function(form, action) {
 *                            Ext.Msg.alert('Success', action.result.msg);
 *                         },
 *                         failure: function(form, action) {
 *                             Ext.Msg.alert('Failed', action.result.msg);
 *                         }
 *                     });
 *                 }
 *             }
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 *
 */
Ext.define('Ext.form.Panel', {
    extend:'Ext.panel.Panel',
    mixins: {
        fieldAncestor: 'Ext.form.FieldAncestor'
    },
    alias: 'widget.form',
    alternateClassName: ['Ext.FormPanel', 'Ext.form.FormPanel'],
    requires: ['Ext.form.Basic', 'Ext.util.TaskRunner'],

    /**
     * @cfg {Boolean} pollForChanges
     * If set to `true`, sets up an interval task (using the {@link #pollInterval}) in which the
     * panel's fields are repeatedly checked for changes in their values. This is in addition to the normal detection
     * each field does on its own input element, and is not needed in most cases. It does, however, provide a
     * means to absolutely guarantee detection of all changes including some edge cases in some browsers which
     * do not fire native events. Defaults to `false`.
     */

    /**
     * @cfg {Number} pollInterval
     * Interval in milliseconds at which the form's fields are checked for value changes. Only used if
     * the {@link #pollForChanges} option is set to `true`. Defaults to 500 milliseconds.
     */

    /**
     * @cfg {Ext.enums.Layout/Object} layout
     * The {@link Ext.container.Container#layout} for the form panel's immediate child items.
     */
    layout: 'anchor',

    ariaRole: 'form',
    
    basicFormConfigs: [
        /** @cfg @inheritdoc Ext.form.Basic#api */
        'api', 
        /** @cfg @inheritdoc Ext.form.Basic#baseParams */
        'baseParams', 
        /** @cfg @inheritdoc Ext.form.Basic#errorReader */
        'errorReader', 
        /** @cfg @inheritdoc Ext.form.Basic#jsonSubmit */
        'jsonSubmit',
        /** @cfg @inheritdoc Ext.form.Basic#method */
        'method', 
        /** @cfg @inheritdoc Ext.form.Basic#paramOrder */
        'paramOrder',
        /** @cfg @inheritdoc Ext.form.Basic#paramsAsHash */
        'paramsAsHash',
        /** @cfg @inheritdoc Ext.form.Basic#reader */
        'reader',
        /** @cfg @inheritdoc Ext.form.Basic#standardSubmit */
        'standardSubmit',
        /** @cfg @inheritdoc Ext.form.Basic#timeout */
        'timeout',
        /** @cfg @inheritdoc Ext.form.Basic#trackResetOnLoad */
        'trackResetOnLoad',
        /** @cfg @inheritdoc Ext.form.Basic#url */
        'url',
        /** @cfg @inheritdoc Ext.form.Basic#waitMsgTarget */
        'waitMsgTarget',
        /** @cfg @inheritdoc Ext.form.Basic#waitTitle */
        'waitTitle'
    ],

    initComponent: function() {
        var me = this;

        if (me.frame) {
            me.border = false;
        }

        me.initFieldAncestor();
        me.callParent();

        me.relayEvents(me.form, [
            /**
             * @event beforeaction
             * @inheritdoc Ext.form.Basic#beforeaction
             */
            'beforeaction',
            /**
             * @event actionfailed
             * @inheritdoc Ext.form.Basic#actionfailed
             */
            'actionfailed',
            /**
             * @event actioncomplete
             * @inheritdoc Ext.form.Basic#actioncomplete
             */
            'actioncomplete',
            /**
             * @event validitychange
             * @inheritdoc Ext.form.Basic#validitychange
             */
            'validitychange',
            /**
             * @event dirtychange
             * @inheritdoc Ext.form.Basic#dirtychange
             */
            'dirtychange'
        ]);

        // Start polling if configured
        if (me.pollForChanges) {
            me.startPolling(me.pollInterval || 500);
        }
    },

    initItems: function() {
        // Create the BasicForm
        this.callParent();
        this.initMonitor();
        this.form = this.createForm();
    },

    // Initialize the BasicForm after all layouts have been completed.
    afterFirstLayout: function() {
        this.callParent(arguments);
        this.form.initialize();
    },

    /**
     * @private
     */
    createForm: function() {
        var cfg = {},
            props = this.basicFormConfigs,
            len = props.length,
            i = 0,
            prop;
            
        for (; i < len; ++i) {
            prop = props[i];
            cfg[prop] = this[prop];
        }
        return new Ext.form.Basic(this, cfg);
    },

    /**
     * Provides access to the {@link Ext.form.Basic Form} which this Panel contains.
     * @return {Ext.form.Basic} The {@link Ext.form.Basic Form} which this Panel contains.
     */
    getForm: function() {
        return this.form;
    },

    /**
     * Loads an {@link Ext.data.Model} into this form (internally just calls {@link Ext.form.Basic#loadRecord})
     * See also {@link Ext.form.Basic#trackResetOnLoad trackResetOnLoad}. The fields in the model are mapped to 
     * fields in the form by matching either the {@link Ext.form.field.Base#name} or {@link Ext.Component#itemId}.  
     * @param {Ext.data.Model} record The record to load
     * @return {Ext.form.Basic} The Ext.form.Basic attached to this FormPanel
     */
    loadRecord: function(record) {
        return this.getForm().loadRecord(record);
    },

    /**
     * Returns the currently loaded Ext.data.Model instance if one was loaded via {@link #loadRecord}.
     * @return {Ext.data.Model} The loaded instance
     */
    getRecord: function() {
        return this.getForm().getRecord();
    },
    
    /**
     * Persists the values in this form into the passed {@link Ext.data.Model} object in a beginEdit/endEdit block.
     * If the record is not specified, it will attempt to update (if it exists) the record provided to {@link #loadRecord}.
     * @param {Ext.data.Model} [record] The record to edit
     * @return {Ext.form.Basic} The Ext.form.Basic attached to this FormPanel
     */
    updateRecord: function(record) {
        return this.getForm().updateRecord(record);
    },

    /**
     * Convenience function for fetching the current value of each field in the form. This is the same as calling
     * {@link Ext.form.Basic#getValues this.getForm().getValues()}.
     *
     * @inheritdoc Ext.form.Basic#getValues
     */
    getValues: function(asString, dirtyOnly, includeEmptyText, useDataValues) {
        return this.getForm().getValues(asString, dirtyOnly, includeEmptyText, useDataValues);
    },
    
    /**
     * Convenience function to check if the form has any dirty fields. This is the same as calling
     * {@link Ext.form.Basic#isDirty this.getForm().isDirty()}.
     *
     * @inheritdoc Ext.form.Basic#isDirty
     */
    isDirty: function () {
        return this.form.isDirty();
    },
    
    /**
     * Convenience function to check if the form has all valid fields. This is the same as calling
     * {@link Ext.form.Basic#isValid this.getForm().isValid()}.
     *
     * @inheritdoc Ext.form.Basic#isValid
     */
    isValid: function () {
       return this.form.isValid();
    },

    /**
     * Convenience function reset the form. This is the same as calling
     * {@link Ext.form.Basic#reset this.getForm().reset()}.
     *
     * @inheritdoc Ext.form.Basic#reset
     */
    reset: function() {
        this.form.reset();
    },
    
    /**
     * Convenience function to check if the form has any invalid fields. This is the same as calling
     * {@link Ext.form.Basic#hasInvalidField this.getForm().hasInvalidField()}.
     *
     * @inheritdoc Ext.form.Basic#hasInvalidField
     */
    hasInvalidField: function () {
        return this.form.hasInvalidField();
    },

    beforeDestroy: function() {
        this.stopPolling();
        this.form.destroy();
        this.callParent();
    },

    /**
     * This is a proxy for the underlying BasicForm's {@link Ext.form.Basic#load} call.
     * @param {Object} options The options to pass to the action (see {@link Ext.form.Basic#load} and
     * {@link Ext.form.Basic#doAction} for details)
     */
    load: function(options) {
        this.form.load(options);
    },

    /**
     * This is a proxy for the underlying BasicForm's {@link Ext.form.Basic#submit} call.
     * @param {Object} options The options to pass to the action (see {@link Ext.form.Basic#submit} and
     * {@link Ext.form.Basic#doAction} for details)
     */
    submit: function(options) {
        this.form.submit(options);
    },

    /**
     * Start an interval task to continuously poll all the fields in the form for changes in their
     * values. This is normally started automatically by setting the {@link #pollForChanges} config.
     * @param {Number} interval The interval in milliseconds at which the check should run.
     */
    startPolling: function(interval) {
        this.stopPolling();
        var task = new Ext.util.TaskRunner(interval);
        task.start({
            interval: 0,
            run: this.checkChange,
            scope: this
        });
        this.pollTask = task;
    },

    /**
     * Stop a running interval task that was started by {@link #startPolling}.
     */
    stopPolling: function() {
        var task = this.pollTask;
        if (task) {
            task.stopAll();
            delete this.pollTask;
        }
    },

    /**
     * Forces each field within the form panel to
     * {@link Ext.form.field.Field#checkChange check if its value has changed}.
     */
    checkChange: function() {
        var fields = this.form.getFields().items,
            f,
            fLen   = fields.length;

        for (f = 0; f < fLen; f++) {
            fields[f].checkChange();
        }
    }
});
