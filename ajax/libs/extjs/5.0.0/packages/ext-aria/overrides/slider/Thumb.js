Ext.define('Ext.aria.slider.Thumb', {
    override: 'Ext.slider.Thumb',
    
    move: function(v, animate) {
        var me = this,
            el = me.el,
            slider = me.slider,
            styleProp = slider.vertical ? 'bottom' : slider.horizontalProp,
            to,
            from;

        v += '%';
        
        if (!animate) {
            el.dom.style[styleProp] = v;
            slider.fireEvent('move', slider, v, me);
        }
        else {
            to = {};
            to[styleProp] = v;
            
            if (!Ext.supports.GetPositionPercentage) {
                from = {};
                from[styleProp] = el.dom.style[styleProp];
            }
            
            new Ext.fx.Anim({
                target: el,
                duration: 350,
                from: from,
                to: to,
                callback: function() {
                    slider.fireEvent('move', slider, v, me);
                }
            });
        }
    }
});
