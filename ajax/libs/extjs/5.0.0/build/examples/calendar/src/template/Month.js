/**
 * @class Ext.calendar.template.Month
 * @extends Ext.XTemplate
 * <p>This is the template used to render the {@link Ext.calendar.template.Month MonthView}. Internally this class defers to an
 * instance of {@link Ext.calerndar.BoxLayoutTemplate} to handle the inner layout rendering and adds containing elements around
 * that to form the month view.</p> 
 * <p>This template is automatically bound to the underlying event store by the 
 * calendar components and expects records of type {@link Ext.calendar.EventRecord}.</p>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext.calendar.template.Month', {
    extend: 'Ext.XTemplate',
    
    requires: ['Ext.calendar.template.BoxLayout'],
    
    constructor: function(config){
        
        Ext.apply(this, config);
    
        this.weekTpl = new Ext.calendar.template.BoxLayout(config);
        this.weekTpl.compile();
        
        var weekLinkTpl = this.showWeekLinks ? '<div class="ext-cal-week-link-hd">&#160;</div>' : '';
        
        this.callParent([
            '<div class="ext-cal-inner-ct {extraClasses}">',
                '<div class="ext-cal-hd-ct ext-cal-month-hd">',
                    weekLinkTpl,
                    '<table class="ext-cal-hd-days-tbl" cellpadding="0" cellspacing="0">',
                        '<tbody>',
                            '<tr>',
                                '<tpl for="days">',
                                    '<th class="ext-cal-hd-day{[xindex==1 ? " ext-cal-day-first" : ""]}" title="{.:date("l, F j, Y")}">{.:date("D")}</th>',
                                '</tpl>',
                            '</tr>',
                        '</tbody>',
                    '</table>',
                '</div>',
                '<div class="ext-cal-body-ct">{weeks}</div>',
            '</div>'
        ]);
    },

    // private
    applyTemplate : function(o){
        var days = [],
            weeks = this.weekTpl.apply(o),
            dt = o.viewStart,
            D = Ext.calendar.util.Date;
        
        for(var i = 0; i < 7; i++){
            days.push(D.add(dt, {days: i}));
        }
        
        var extraClasses = this.showHeader === true ? '' : 'ext-cal-noheader';
        if(this.showWeekLinks){
            extraClasses += ' ext-cal-week-links';
        }
        
        return this.applyOut({
            days: days,
            weeks: weeks,
            extraClasses: extraClasses
        }, []).join('');
    },
    
    apply: function(values) {
        return this.applyTemplate.apply(this, arguments);
    }
});