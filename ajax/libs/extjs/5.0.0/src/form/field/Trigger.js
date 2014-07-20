/**
 * @deprecated 5.0
 * Provides a convenient wrapper for TextFields that adds a clickable trigger button.
 * (looks like a combobox by default).
 *
 * As of Ext JS 5.0 this class has been deprecated.  It is recommended to use a
 * {@link Ext.form.field.Text Text Field} with the {@link Ext.form.field.Text#triggers
 * triggers} config instead.  This class is provided for compatibility reasons but is
 * not used internally by the framework.
 */
Ext.define('Ext.form.field.Trigger', {
    extend:'Ext.form.field.Text',
    alias: ['widget.triggerfield', 'widget.trigger'],
    requires: ['Ext.dom.Helper', 'Ext.util.ClickRepeater'],
    alternateClassName: ['Ext.form.TriggerField', 'Ext.form.TwinTriggerField', 'Ext.form.Trigger'],

    /**
     * @cfg {String} triggerCls
     * An additional CSS class used to style the trigger button. The trigger will always get the {@link Ext.form.trigger.Trigger#baseCls}
     * by default and triggerCls will be **appended** if specified.
     */
    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',

    inheritableStatics: {
        warnDeprecated: function() {
            //<debug>
            // TODO: can we make this warning depend on compat level?
            Ext.log.warn('Ext.form.field.Trigger is deprecated. Use Ext.form.field.Text instead.');
            //</debug>
        }
    },

    onClassExtended: function() {
        this.warnDeprecated();
    },

    constructor: function(config) {
        this.self.warnDeprecated();
        this.callParent([config]);
    }
});
