Ext.define('Ext.rtl.chart.Chart', {
    override: 'Ext.chart.Chart',
    
    initSurfaceCfg: function(cfg) {
        this.callParent(arguments);
        // Even in rtl mode, we still want the chart to use ltr, since
        // we're just reversing the axes 
        cfg.forceLtr = true;
    },
    
    configureAxisStyles: function(config) {
        var temp;
        
        if (this.getInherited().rtl) {
            temp = config.axisLabelLeftStyle;
            config.axisLabelLeftStyle = config.axisLabelRightStyle;
            config.axisLabelRightStyle = temp;
        
            temp = config.axisTitleLeftStyle;
            config.axisTitleLeftStyle = config.axisTitleRightStyle;
            config.axisTitleRightStyle = temp;
        }
    },
    
    beforeRender: function() {
        // Put this here because by this point we definitely know that we've been added to a container
        // so we can identify the hierarchy state. Since the collection is keyed by side, we'll go ahead
        // and do all our modifications before everything is initialized ~and~ we know our RTL state
        var me = this,
            axes = me.axes,
            items, i, len, axis;
            
        if (me.getInherited().rtl) {
            // There are 2 cases for RTL:
            // The root is LTR & we are RTL, in which case we don't reverse the events
            // The root is RTL & we are RTL, in we which need to re-LTRify the events, since
            // the charts always lay out in an LTR fashion.
            me.rtlEvent = !me.isOppositeRootDirection();
            items = axes.getRange();
            axes.removeAll();
            
            for (i = 0, len = items.length; i < len; ++i) {
                axis = items[i];
                axis.position = this.invertPosition(axis.position);
                axes.add(axis);
            }
        }
        
        me.callParent(arguments);
    },
    
    invertPosition: function(pos) {
        if (Ext.isArray(pos)) {
            var out = [],
                len = pos.length,
                i;
                
            for (i = 0; i < len; ++i) {
                out.push(this.invertPosition(pos[i]));
            }
            return out;
        }
        if (this.getInherited().rtl) {
            if (pos == 'left') {
                pos = 'right';
            } else if (pos == 'right') {
                pos = 'left';
            }
        }
        return pos;
    },
    
    getEventXY: function(e) {
        var box, pageXY, x, y, width;
        
        if (this.rtlEvent) {
            // If we're in RTL mode, the event coordinates have been reversed,
            // so we need to modify them to get them back to a useful
            // state for us!
            box = this.surface.getRegion();
            pageXY = e.getXY();
            width = box.right - box.left;
            
            x = width - (pageXY[0] - box.left);
            y = pageXY[1] - box.top;
            
            return [x, y];
        } else {
            return this.callParent(arguments);
        }
        
    }
});
