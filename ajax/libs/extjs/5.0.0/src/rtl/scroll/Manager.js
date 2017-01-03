Ext.define('Ext.rtl.scroll.Manager', {
    override: 'Ext.scroll.Manager',

    rtlPositionMethods: {
        x: 'rtlSetLocalX',
        y: 'setLocalY'
    },

    constructor: function(config) {
        var me = this,
            owner = config.owner,
            rtl = owner.getInherited().rtl;

        if (rtl) {
            me.positionMethods = me.rtlPositionMethods;
            me.indicatorCls += ' ' + owner._rtlCls;
        }

        me.callParent(arguments);

        if (rtl) {
            me.scroller.rtl = true;
        }
    }
});
