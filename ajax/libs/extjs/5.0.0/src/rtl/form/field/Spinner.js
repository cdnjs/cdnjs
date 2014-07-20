Ext.define('Ext.rtl.form.field.Spinner', {
    override: 'Ext.form.field.Spinner',

    getTriggerData: function(){
        var data = this.callParent();
        if (this.getInherited().rtl) {
            data.childElCls = this._rtlCls;
        }
        return data;
    }
});
