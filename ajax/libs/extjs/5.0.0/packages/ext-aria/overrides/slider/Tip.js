Ext.define('Ext.aria.slider.Tip', {
    override: 'Ext.slider.Tip',
    
    init: function(slider) {
        var me = this,
            timeout = slider.tipHideTimeout;
        
        me.onSlide = Ext.Function.createThrottled(me.onSlide, 50, me);
        me.hide = Ext.Function.createBuffered(me.hide, timeout, me);
        
        me.callParent(arguments);
        
        slider.on({
            scope: me,
            change: me.onSlide,
            move: me.onSlide,
            changecomplete: me.hide
        });
    }
});
