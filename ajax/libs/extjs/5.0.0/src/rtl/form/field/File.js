Ext.define('Ext.rtl.form.field.File', {
    override: 'Ext.form.field.File',

    getButtonMarginProp: function() {
        return this.getInherited().rtl ? 'margin-right:' : 'margin-left:';
    }
});
