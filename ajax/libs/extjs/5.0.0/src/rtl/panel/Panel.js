Ext.define('Ext.rtl.panel.Panel', {
    override: 'Ext.panel.Panel',

    rtlCollapseDirs: {
        top: 'top',
        right: 'left',
        bottom: 'bottom',
        left: 'right'
    },

    convertCollapseDir: function(collapseDir) {
        if (!!Ext.rootInheritedState.rtl !== this.isLocalRtl()) {
            collapseDir = this.rtlCollapseDirs[collapseDir];
        }
        return this.callParent(arguments);
    }
});
