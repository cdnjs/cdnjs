Ext.define('Ext.rtl.form.Labelable', {
    override: 'Ext.form.Labelable',

    getHorizontalPaddingStyle: function() {
        return this.getInherited().rtl ? 'padding-left:' : 'padding-right:';
    }
});
