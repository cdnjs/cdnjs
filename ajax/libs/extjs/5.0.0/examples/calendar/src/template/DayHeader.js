/**
 * @class Ext.calendar.template.DayHeader
 * @extends Ext.XTemplate
 * <p>This is the template used to render the all-day event container used in {@link Ext.calendar.DayView DayView} and 
 * {@link Ext.calendar.WeekView WeekView}. Internally the majority of the layout logic is deferred to an instance of
 * {@link Ext.calendar.BoxLayoutTemplate}.</p> 
 * <p>This template is automatically bound to the underlying event store by the 
 * calendar components and expects records of type {@link Ext.calendar.EventRecord}.</p>
 * <p>Note that this template would not normally be used directly. Instead you would use the {@link Ext.calendar.DayViewTemplate}
 * that internally creates an instance of this template along with a {@link Ext.calendar.DayBodyTemplate}.</p>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext.calendar.template.DayHeader', {
    extend: 'Ext.XTemplate',
    
    requires: ['Ext.calendar.template.BoxLayout'],
    
    constructor: function(config){
        
        Ext.apply(this, config);
        
        this.allDayTpl = new Ext.calendar.template.BoxLayout(config);
        this.allDayTpl.compile();
        
        this.callParent([
            '<div class="ext-cal-hd-ct">',
                '<table class="ext-cal-hd-days-tbl" cellspacing="0" cellpadding="0">',
                    '<tbody>',
                        '<tr>',
                            '<td class="ext-cal-gutter"></td>',
                            '<td class="ext-cal-hd-days-td"><div class="ext-cal-hd-ad-inner">{allDayTpl}</div></td>',
                            '<td class="ext-cal-gutter-rt"></td>',
                        '</tr>',
                    '</tobdy>',
                '</table>',
            '</div>'
        ]);
    },

    applyTemplate : function(o){
        return this.applyOut({
            allDayTpl: this.allDayTpl.apply(o)
        }, []).join('');
    },
    
    apply: function(values) {
        return this.applyTemplate.apply(this, arguments);
    }
});