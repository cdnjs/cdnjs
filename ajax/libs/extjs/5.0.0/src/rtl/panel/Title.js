Ext.define('Ext.rtl.panel.Title', {
    override: 'Ext.panel.Title',

    getIconRenderData: function() {
        var me = this,
            data = me.callParent(),
            header = me.ownerCt;

        if (header && header.isParentRtl()) {
            data.childElCls = ' ' + me._rtlCls;
        }

        return data;
    },

    privates: {
        _getVerticalAdjustDirection: function() {
            var header = this.ownerCt;
            return (header && header.isParentRtl()) ? 'right' : 'left';
        }
    }
});
