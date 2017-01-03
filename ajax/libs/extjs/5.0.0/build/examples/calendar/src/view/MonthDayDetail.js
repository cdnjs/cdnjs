/*
 * This is the view used internally by the panel that displays overflow events in the
 * month view. Anytime a day cell cannot display all of its events, it automatically displays
 * a link at the bottom to view all events for that day. When clicked, a panel pops up that
 * uses this view to display the events for that day.
 */
Ext.define('Ext.calendar.view.MonthDayDetail', {
    extend: 'Ext.Component',
    alias: 'widget.monthdaydetailview',

    requires: [
        'Ext.XTemplate',
        'Ext.calendar.util.Date',
        'Ext.calendar.view.AbstractCalendar'
    ],

    afterRender: function() {
        this.tpl = this.getTemplate();

        this.callParent(arguments);

        this.el.on({
            click: this.view.onClick,
            mouseover: this.view.onMouseOver,
            mouseout: this.view.onMouseOut,
            scope: this.view
        });
    },

    getTemplate: function() {
        if (!this.tpl) {
            this.tpl = new Ext.XTemplate(
                '<div class="ext-cal-mdv x-unselectable">',
                    '<table class="ext-cal-mvd-tbl" cellpadding="0" cellspacing="0">',
                        '<tbody>',
                            '<tpl for=".">',
                                '<tr><td class="ext-cal-ev">{markup}</td></tr>',
                            '</tpl>',
                        '</tbody>',
                    '</table>',
                '</div>'
            );
        }
        this.tpl.compile();
        return this.tpl;
    },

    update: function(dt) {
        this.date = dt;
        this.refresh();
    },

    refresh: function() {
        if (!this.rendered) {
            return;
        }
        var eventTpl = this.view.getEventTemplate(),

        templateData = [],

        evts = this.store.queryBy(function(rec) {
            var thisDt = Ext.Date.clearTime(this.date, true).getTime(),
                recStart = Ext.Date.clearTime(rec.data[Ext.calendar.data.EventMappings.StartDate.name], true).getTime(),
                startsOnDate = (thisDt == recStart),
                spansDate = false;

            if (!startsOnDate) {
                var recEnd = Ext.Date.clearTime(rec.data[Ext.calendar.data.EventMappings.EndDate.name], true).getTime();
                spansDate = recStart < thisDt && recEnd >= thisDt;
            }
            return startsOnDate || spansDate;
        },
        this);

        evts.each(function(evt) {
            var item = evt.data,
            M = Ext.calendar.data.EventMappings;

            item._renderAsAllDay = item[M.IsAllDay.name] || Ext.calendar.util.Date.diffDays(item[M.StartDate.name], item[M.EndDate.name]) > 0;
            item.spanLeft = Ext.calendar.util.Date.diffDays(item[M.StartDate.name], this.date) > 0;
            item.spanRight = Ext.calendar.util.Date.diffDays(this.date, item[M.EndDate.name]) > 0;
            item.spanCls = (item.spanLeft ? (item.spanRight ? 'ext-cal-ev-spanboth':
            'ext-cal-ev-spanleft') : (item.spanRight ? 'ext-cal-ev-spanright': ''));

            templateData.push({
                markup: eventTpl.apply(this.getTemplateEventData(item))
            });
        },
        this);

        this.tpl.overwrite(this.el, templateData);
        this.fireEvent('eventsrendered', this, this.date, evts.getCount());
    },

    getTemplateEventData: function(evt) {
        var data = this.view.getTemplateEventData(evt);
        data._elId = 'dtl-' + data._elId;
        return data;
    }
});
