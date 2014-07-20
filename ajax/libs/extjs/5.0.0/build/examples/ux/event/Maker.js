/**
 * Event maker.
 */
Ext.define('Ext.ux.event.Maker', {

    eventQueue: [],
    
    startAfter: 500,
    
    timerIncrement: 500,
    
    currentTiming: 0,
    
    
    constructor: function(config) {
        var me = this;
        
        me.currentTiming = me.startAfter;
        
        if(!Ext.isArray(config)) {
            config = [config];
        }
        
        Ext.Array.each(config, function(item) {
            item.el = item.el || 'el';
            Ext.Array.each(Ext.ComponentQuery.query(item.cmpQuery), function(cmp) {
                var event = {}, x, y, el;
             
                if (!item.domQuery) {
                    el = cmp[item.el];
                } else {
                    el = cmp.el.down(item.domQuery);
                }

                event.target = '#' + el.dom.id;
                
                event.type = item.type;
                
                event.button = config.button || 0;
                
                x = el.getX() + (el.getWidth() / 2);
                y = el.getY() + (el.getHeight() / 2);
                
                event.xy = [x,y];
                
                event.ts = me.currentTiming;
                
                me.currentTiming += me.timerIncrement;
                    
                me.eventQueue.push(event);
            });
 
            if (item.screenshot) {
                me.eventQueue[me.eventQueue.length - 1].screenshot = true;
            }
        });
        return me.eventQueue;
    }
});