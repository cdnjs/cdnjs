Ext.define('Ext.rtl.button.Button', {
    override: 'Ext.button.Button',

    getTriggerRegion: function() {
        var me = this,
            region = me._triggerRegion;

        if (!Ext.rootInheritedState.rtl !== !this.getInherited().rtl
            && me.arrowAlign === 'right') {
            region.begin = 0;
            region.end = me.btnEl.getX() - me.el.getX();
        } else {
            region = me.callParent();
        }

        return region;
    }
});
