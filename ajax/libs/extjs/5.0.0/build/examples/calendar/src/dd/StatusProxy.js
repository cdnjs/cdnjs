/*
 * @class Ext.calendar.dd.StatusProxy
 * A specialized drag proxy that supports a drop status icon, {@link Ext.Layer} styles and auto-repair. It also
 * contains a calendar-specific drag status message containing details about the dragged event's target drop date range.  
 * This is the default drag proxy used by all calendar views.
 * @constructor
 * @param {Object} config
 */
Ext.define('Ext.calendar.dd.StatusProxy', {
    
    extend: 'Ext.dd.StatusProxy',

    animRepair: true,
    
    /**
     * @cfg {String} moveEventCls
     * The CSS class to apply to the status element when an event is being dragged (defaults to 'ext-cal-dd-move').
     */
    moveEventCls : 'ext-cal-dd-move',
    
    /**
     * @cfg {String} addEventCls
     * The CSS class to apply to the status element when drop is not allowed (defaults to 'ext-cal-dd-add').
     */
    addEventCls : 'ext-cal-dd-add',
    
    // inherit docs
    childEls: [
        'ghost',
        'message'
    ],
    
    // inherit docs
    renderTpl: [
        '<div class="' + Ext.baseCSSPrefix + 'dd-drop-icon"></div>' +
        '<div class="ext-dd-ghost-ct">' +
            '<div id="{id}-ghost" data-ref="ghost" class="' + Ext.baseCSSPrefix + 'dd-drag-ghost"></div>' +
            '<div id="{id}-message" data-ref="message" class="' + Ext.baseCSSPrefix + 'dd-msg"></div>' +
        '</div>'
    ],

    // inherit docs
    update : function(html){
        this.callParent(arguments);
        
        var el = this.ghost.dom.firstChild;
        if(el){
            // if the ghost contains an event clone (from dragging an existing event)
            // set it to auto height to ensure visual consistency
            Ext.fly(el).setHeight('auto');
        }
    },
    
    /* @private
     * Update the calendar-specific drag status message without altering the ghost element.
     * @param {String} msg The new status message
     */
    updateMsg : function(msg){
        this.message.update(msg);
    }
});