/**
 * A mixin for {@link Ext.container.Container} components that are likely to have form fields in their
 * items subtree. Adds the following capabilities:
 *
 * - Methods for handling the addition and removal of {@link Ext.form.Labelable} and {@link Ext.form.field.Field}
 *   instances at any depth within the container.
 * - Events ({@link #fieldvaliditychange} and {@link #fielderrorchange}) for handling changes to the state
 *   of individual fields at the container level.
 * - Automatic application of {@link #fieldDefaults} config properties to each field added within the
 *   container, to facilitate uniform configuration of all fields.
 *
 * This mixin is primarily for internal use by {@link Ext.form.Panel} and {@link Ext.form.FieldContainer},
 * and should not normally need to be used directly.
 *
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.form.FieldAncestor', {
    extend: 'Ext.Mixin',

    requires: [
        'Ext.container.Monitor'
    ],

    mixinConfig: {
        id: 'fieldAncestor',
        after: {
            initInheritedState: 'initFieldInheritedState'
        }
    },

    /**
     * @cfg {Object} fieldDefaults
     * If specified, the properties in this object are used as default config values for each {@link Ext.form.Labelable}
     * instance (e.g. {@link Ext.form.field.Base} or {@link Ext.form.FieldContainer}) that is added as a descendant of
     * this container. Corresponding values specified in an individual field's own configuration, or from the {@link
     * Ext.container.Container#defaults defaults config} of its parent container, will take precedence. See the
     * documentation for {@link Ext.form.Labelable} to see what config options may be specified in the fieldDefaults.
     *
     * Example:
     *
     *     new Ext.form.Panel({
     *         fieldDefaults: {
     *             labelAlign: 'left',
     *             labelWidth: 100
     *         },
     *         items: [{
     *             xtype: 'fieldset',
     *             defaults: {
     *                 labelAlign: 'top'
     *             },
     *             items: [{
     *                 name: 'field1'
     *             }, {
     *                 name: 'field2'
     *             }]
     *         }, {
     *             xtype: 'fieldset',
     *             items: [{
     *                 name: 'field3',
     *                 labelWidth: 150
     *             }, {
     *                 name: 'field4'
     *             }]
     *         }]
     *     });
     *
     * In this example, field1 and field2 will get labelAlign:'top' (from the fieldset's defaults) and labelWidth:100
     * (from fieldDefaults), field3 and field4 will both get labelAlign:'left' (from fieldDefaults and field3 will use
     * the labelWidth:150 from its own config.
     */

    /**
     * @event fieldvaliditychange
     * Fires when the validity state of any one of the {@link Ext.form.field.Field} instances within this
     * container changes.
     * @param {Ext.form.FieldAncestor} this
     * @param {Ext.form.Labelable} The Field instance whose validity changed
     * @param {String} isValid The field's new validity state
     */

    /**
     * @event fielderrorchange
     * Fires when the active error message is changed for any one of the {@link Ext.form.Labelable} instances
     * within this container.
     * @param {Ext.form.FieldAncestor} this
     * @param {Ext.form.Labelable} The Labelable instance whose active error was changed
     * @param {String} error The active error message
     */

    /**
     * Initializes the FieldAncestor's state; this must be called from the initComponent method of any components
     * importing this mixin.
     * @protected
     */
    initFieldAncestor: function() {
        var me = this;

        // We use the monitor here as opposed to event bubbling. The problem with bubbling is it doesn't
        // let us react to items being added/remove at different places in the hierarchy which may have an
        // impact on the error/valid state.
        me.monitor = new Ext.container.Monitor({
            scope: me,
            selector: '[isFormField]:not([excludeForm])',
            addHandler: me.onChildFieldAdd,
            removeHandler: me.onChildFieldRemove
        });
        me.initFieldDefaults();
    },
    
    initMonitor: function() {
        this.monitor.bind(this);    
    },

    initFieldInheritedState: function (inheritedState) {
        var inheritedFieldDefaults = inheritedState.fieldDefaults,
            fieldDefaults = this.fieldDefaults;

        if (fieldDefaults) {
            if (inheritedFieldDefaults) {
                inheritedState.fieldDefaults =
                        Ext.apply(Ext.Object.chain(inheritedFieldDefaults), fieldDefaults);
            } else {
                inheritedState.fieldDefaults = fieldDefaults;
            }
        }
    },

    onChildFieldAdd: function(field) {
        var me = this;
        me.mon(field, 'errorchange', me.handleFieldErrorChange, me);
        me.mon(field, 'validitychange', me.handleFieldValidityChange, me);
    },
    
    onChildFieldRemove: function(field) {
        var me = this;
        me.mun(field, 'errorchange', me.handleFieldErrorChange, me);
        me.mun(field, 'validitychange', me.handleFieldValidityChange, me);
    },

    /**
     * @private Initialize the {@link #fieldDefaults} object
     */
    initFieldDefaults: function() {
        if (!this.fieldDefaults) {
            this.fieldDefaults = {};
        }
    },

    /**
     * @private Handle bubbled validitychange events from descendants; invoke the aggregated event and method
     */
    handleFieldValidityChange: function(field, isValid) {
        var me = this;
        if (field !== me) {
            me.fireEvent('fieldvaliditychange', me, field, isValid);
            me.onFieldValidityChange(field, isValid);
        }
    },

    /**
     * @private Handle bubbled errorchange events from descendants; invoke the aggregated event and method
     */
    handleFieldErrorChange: function(labelable, activeError) {
        var me = this;
        if (labelable !== me) {
            me.fireEvent('fielderrorchange', me, labelable, activeError);
            me.onFieldErrorChange(labelable, activeError);
        }
    },

    /**
     * Fired when the validity of any field within the container changes.
     * @param {Ext.form.field.Field} field The sub-field whose validity changed
     * @param {Boolean} valid The new validity state
     * @protected
     */
    onFieldValidityChange: Ext.emptyFn,

    /**
     * Fired when the error message of any field within the container changes.
     * @param {Ext.form.Labelable} field The sub-field whose active error changed
     * @param {String} error The new active error message
     * @protected
     */
    onFieldErrorChange: Ext.emptyFn,
    
    beforeDestroy: function(){
        this.monitor.unbind();
        this.callParent();
    }

});
