Ext.define('Ext.rtl.panel.Bar', {
    override: 'Ext.panel.Bar',

    rtlPositions: {
        top: 'top',
        right: 'left',
        bottom: 'bottom',
        left: 'right'
    },

    _rtlRotationClasses: {
        1: Ext.baseCSSPrefix + 'title-rotate-left',
        2: Ext.baseCSSPrefix + 'title-rotate-right'
    },

    _rtlRotationAngles: {
        1: 270,
        2: 90
    },

    onAdded: function (container, pos, instanced) {
        var me = this;

        if (me.isParentRtl()) {
            me._rotationClasses = me._rtlRotationClasses;
            me._rotationAngles = me._rtlRotationAngles;
        }
        this.callParent([container, pos, instanced]);
    },

    privates: {
        getDockName: function () {
            var me = this,
                dock = me.dock;

            return me.isParentRtl() ? me.rtlPositions[dock] : dock
        }
    }
});