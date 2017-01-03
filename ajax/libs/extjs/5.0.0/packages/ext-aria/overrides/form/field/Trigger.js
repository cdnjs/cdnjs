Ext.define('Ext.aria.form.field.Trigger', {
    override: 'Ext.form.field.Trigger',

    getFocusFrameEl: function() {
        return this.triggerWrap;
    }
});
