Ext.define('Ext.rtl.form.field.Checkbox', {
    override: 'Ext.form.field.Checkbox',

    getSubTplData: function(){
        var data = this.callParent();
        if (this.getInherited().rtl) {
            data.childElCls = this._rtlCls;
        }
        return data;
    }
});
