/**
 * @class Ext.calendar.view.Day
 * @extends Ext.container.Container
 * <p>Unlike other calendar views, is not actually a subclass of {@link Ext.calendar.view.AbstractCalendar AbstractCalendar}.
 * Instead it is a {@link Ext.container.Container Container} subclass that internally creates and manages the layouts of
 * a {@link Ext.calendar.DayHeaderView DayHeaderView} and a {@link Ext.calendar.DayBodyView DayBodyView}. As such
 * DayView accepts any config values that are valid for DayHeaderView and DayBodyView and passes those through
 * to the contained views. It also supports the interface required of any calendar view and in turn calls methods
 * on the contained views as necessary.</p>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext.calendar.view.Day', {
    extend: 'Ext.container.Container',
    alias: 'widget.dayview',
    
    requires: [
        'Ext.calendar.view.AbstractCalendar',
        'Ext.calendar.view.DayHeader',
        'Ext.calendar.view.DayBody'
    ],
    
    /**
     * @cfg {Boolean} showTime
     * True to display the current time in today's box in the calendar, false to not display it (defautls to true)
     */
    showTime: true,
    /**
     * @cfg {Boolean} showTodayText
     * True to display the {@link #todayText} string in today's box in the calendar, false to not display it (defautls to true)
     */
    showTodayText: true,
    /**
     * @cfg {String} todayText
     * The text to display in the current day's box in the calendar when {@link #showTodayText} is true (defaults to 'Today')
     */
    todayText: 'Today',
    /**
     * @cfg {String} ddCreateEventText
     * The text to display inside the drag proxy while dragging over the calendar to create a new event (defaults to 
     * 'Create event for {0}' where {0} is a date range supplied by the view)
     */
    ddCreateEventText: 'Create event for {0}',
    /**
     * @cfg {String} ddMoveEventText
     * The text to display inside the drag proxy while dragging an event to reposition it (defaults to 
     * 'Move event to {0}' where {0} is the updated event start date/time supplied by the view)
     */
    ddMoveEventText: 'Move event to {0}',
    /**
     * @cfg {Number} dayCount
     * The number of days to display in the view (defaults to 1)
     */
    dayCount: 1,
    
    // private
    initComponent : function(){
        // rendering more than 7 days per view is not supported
        this.dayCount = this.dayCount > 7 ? 7 : this.dayCount;
        
        var cfg = Ext.apply({}, this.initialConfig);
        cfg.showTime = this.showTime;
        cfg.showTodatText = this.showTodayText;
        cfg.todayText = this.todayText;
        cfg.dayCount = this.dayCount;
        cfg.wekkCount = 1; 
        
        var header = Ext.applyIf({
            xtype: 'dayheaderview',
            id: this.id+'-hd'
        }, cfg);
        
        var body = Ext.applyIf({
            xtype: 'daybodyview',
            id: this.id+'-bd'
        }, cfg);
        
        this.items = [header, body];
        this.addCls('ext-cal-dayview ext-cal-ct');
        
        this.callParent(arguments);
    },
    
    // private
    afterRender : function(){
        this.callParent(arguments);
        
        this.header = Ext.getCmp(this.id+'-hd');
        this.body = Ext.getCmp(this.id+'-bd');
        this.body.on('eventsrendered', this.forceSize, this);
    },
    
    // private
    refresh : function(){
        this.header.refresh();
        this.body.refresh();
    },
    
    // private
    forceSize: function(){
        // The defer call is mainly for good ol' IE, but it doesn't hurt in
        // general to make sure that the window resize is good and done first
        // so that we can properly calculate sizes.
        Ext.defer(function(){
            var ct = this.el.up('.x-panel-body'),
                hd = this.el.down('.ext-cal-day-header'),
                h = ct.getHeight() - hd.getHeight();
            
            this.el.down('.ext-cal-body-ct').setHeight(h);
        }, 10, this);
    },
    
    // private
    onResize : function() {
        this.callParent(arguments);
        this.forceSize();
    },
    
    // private
    getViewBounds : function(){
        return this.header.getViewBounds();
    },
    
    /**
     * Returns the start date of the view, as set by {@link #setStartDate}. Note that this may not 
     * be the first date displayed in the rendered calendar -- to get the start and end dates displayed
     * to the user use {@link #getViewBounds}.
     * @return {Date} The start date
     */
    getStartDate : function(){
        return this.header.getStartDate();
    },

    /**
     * Sets the start date used to calculate the view boundaries to display. The displayed view will be the 
     * earliest and latest dates that match the view requirements and contain the date passed to this function.
     * @param {Date} dt The date used to calculate the new view boundaries
     */
    setStartDate: function(dt){
        this.header.setStartDate(dt, true);
        this.body.setStartDate(dt, true);
    },

    // private
    renderItems: function(){
        this.header.renderItems();
        this.body.renderItems();
    },
    
    /**
     * Returns true if the view is currently displaying today's date, else false.
     * @return {Boolean} True or false
     */
    isToday : function(){
        return this.header.isToday();
    },
    
    /**
     * Updates the view to contain the passed date
     * @param {Date} dt The date to display
     * @return {Date} The new view start date
     */
    moveTo : function(dt, noRefresh){
        this.header.moveTo(dt, noRefresh);
        return this.body.moveTo(dt, noRefresh);
    },
    
    /**
     * Updates the view to the next consecutive date(s)
     * @return {Date} The new view start date
     */
    moveNext : function(noRefresh){
        this.header.moveNext(noRefresh);
        return this.body.moveNext(noRefresh);
    },
    
    /**
     * Updates the view to the previous consecutive date(s)
     * @return {Date} The new view start date
     */
    movePrev : function(noRefresh){
        this.header.movePrev(noRefresh);
        return this.body.movePrev(noRefresh);
    },

    /**
     * Shifts the view by the passed number of days relative to the currently set date
     * @param {Number} value The number of days (positive or negative) by which to shift the view
     * @return {Date} The new view start date
     */
    moveDays : function(value, noRefresh){
        this.header.moveDays(value, noRefresh);
        return this.body.moveDays(value, noRefresh);
    },
    
    /**
     * Updates the view to show today
     * @return {Date} Today's date
     */
    moveToday : function(noRefresh){
        this.header.moveToday(noRefresh);
        return this.body.moveToday(noRefresh);
    }
});
