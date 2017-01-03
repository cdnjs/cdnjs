Ext.define('Ext.rtl.button.Segmented', {
    override: 'Ext.button.Segmented',

    privates: {
        _getFirstCls: function() {
            return this.getInherited().rtl ? this._lastCls : this._firstCls;
        },

        _getLastCls: function() {
            return this.getInherited().rtl ? this._firstCls : this._lastCls;
        }
    }
});