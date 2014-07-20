Ext.define('Ext.aria.tip.QuickTip', {
    override: 'Ext.tip.QuickTip',
    
    showByTarget: function(targetEl) {
        var me = this,
            target, size, xy, x, y;
        
        target = me.targets[targetEl.id];
        
        if (!target) {
            return;
        }
        
        me.activeTarget = target;
        me.activeTarget.el = Ext.get(targetEl).dom;
        me.anchor = me.activeTarget.anchor;
        
        size = targetEl.getSize();
        xy = targetEl.getXY();
        
        me.showAt([ xy[0], xy[1] + size.height ]);
    }
});
