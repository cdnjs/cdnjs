/*!              ~ CLNDR v1.0.2 ~ 
 * ============================================== 
 *       https://github.com/kylestetz/CLNDR 
 * ============================================== 
 *  created by kyle stetz (github.com/kylestetz) 
 *        &available under the MIT license 
 * http://opensource.org/licenses/mit-license.php 
 * ============================================== 
 */
!function($) {
    function Clndr(element, options) {
        this.element = element, this.options = $.extend({}, defaults, options), this.options.events.length && (this.options.events = this.addMomentObjectToEvents(this.options.events)), 
        this.month = this.options.startWithMonth ? moment(this.options.startWithMonth) : moment(), 
        this._defaults = defaults, this._name = pluginName, this.init();
    }
    var clndrTemplate = "<div class='clndr-controls'><div class='clndr-control-button'><span class='clndr-previous-button'>previous</span></div><div class='month'><%= month %></div><div class='clndr-control-button rightalign'><span class='clndr-next-button'>next</span></div></div><table class='clndr-table' border='0' cellspacing='0' cellpadding='0'><thead><tr class='header-days'><% _.each(daysOfTheWeek, function(dayOfTheWeek) { %><td class='header-day'><%= dayOfTheWeek %></td><% }); %></tr></thead><tbody><% for(var i = 0; i < numberOfRows; i++){ %><tr><% for(var j = 0; j < 7; j++){ %><% var d = j + i * 7; %><td class='<%= days[d].classes %>' id='<%= days[d].id %>'><div class='day-contents'><%= days[d].day %></div></td><% } %></tr><% } %></tbody></table>", pluginName = "clndr", defaults = {
        template: clndrTemplate,
        weekOffset: 0,
        startWithMonth: null,
        clickEvents: {
            click: null,
            nextMonth: null,
            previousMonth: null,
            onMonthChange: null
        },
        targets: {
            nextButton: "clndr-next-button",
            previousButton: "clndr-previous-button",
            day: "day",
            empty: "empty"
        },
        events: [],
        extras: null,
        dateParameter: "date",
        doneRendering: null,
        render: null
    };
    Clndr.prototype.init = function() {
        this.daysOfTheWeek = this.options.weekOffset ? this.shiftWeekdayLabels(this.options.weekOffset) : [ "S", "M", "T", "W", "T", "F", "S" ], 
        this.options.render || (this.compiledClndrTemplate = _.template(this.options.template)), 
        $(this.element).html("<div class='clndr'></div>"), this.calendarContainer = $(".clndr", this.element), 
        this.render();
    }, Clndr.prototype.shiftWeekdayLabels = function(offset) {
        for (var days = [ "S", "M", "T", "W", "T", "F", "S" ], i = 0; offset > i; i++) days.push(days.shift());
        return days;
    }, Clndr.prototype.createDaysObject = function(currentMonth) {
        daysArray = [];
        var date = currentMonth.startOf("month"), now = moment(), diff = date.day() - this.options.weekOffset;
        0 > diff && (diff += 7);
        for (var i = 0; diff > i; i++) daysArray.push(this.calendarDay());
        this.eventsThisMonth = [], this.options.events.length && (this.eventsThisMonth = _.filter(this.options.events, function(event) {
            return event._clndrDateObject.format("YYYY-MM") == currentMonth.format("YYYY-MM");
        }));
        for (var numOfDays = date.daysInMonth(), i = 1; numOfDays >= i; i++) {
            var eventsToday = [];
            _.each(this.eventsThisMonth, function(event) {
                event._clndrDateObject.date() == i && eventsToday.push(event);
            });
            var currentDay = moment([ currentMonth.year(), currentMonth.month(), i ]), extraClasses = "";
            now.format("YYYY-MM-DD") == currentDay.format("YYYY-MM-DD") && (extraClasses += " today"), 
            eventsToday.length && (extraClasses += " event"), daysArray.push(this.calendarDay({
                day: i,
                classes: this.options.targets.day + extraClasses,
                id: "calendar-day-" + currentDay.format("YYYY-MM-DD"),
                events: eventsToday,
                date: currentDay
            }));
        }
        for (;0 !== daysArray.length % 7; ) daysArray.push(this.calendarDay());
        return daysArray;
    }, Clndr.prototype.render = function() {
        this.calendarContainer.children().remove();
        var days = this.createDaysObject(this.month);
        this.month;
        var data = {
            daysOfTheWeek: this.daysOfTheWeek,
            numberOfRows: Math.ceil(days.length / 7),
            days: days,
            month: this.month.format("MMMM"),
            year: this.month.year(),
            eventsThisMonth: this.eventsThisMonth,
            extras: this.options.extras
        };
        this.options.render ? this.calendarContainer.html(this.options.render(data)) : this.calendarContainer.html(this.compiledClndrTemplate(data)), 
        this.bindEvents(), this.options.doneRendering && this.options.doneRendering();
    }, Clndr.prototype.bindEvents = function() {
        $("." + this.options.targets.day, this.element).on("click", {
            context: this
        }, function(event) {
            if (event.data.context.options.clickEvents.click) {
                var target = event.data.context.buildTargetObject(event.currentTarget, !0);
                event.data.context.options.clickEvents.click(target);
            }
        }), $("." + this.options.targets.empty, this.element).on("click", {
            context: this
        }, function(event) {
            if (event.data.context.options.clickEvents.click) {
                var target = event.data.context.buildTargetObject(event.currentTarget, !1);
                event.data.context.options.clickEvents.click(target);
            }
        }), $("." + this.options.targets.previousButton, this.element).on("click", {
            context: this
        }, this.backAction), $("." + this.options.targets.nextButton, this.element).on("click", {
            context: this
        }, this.forwardAction);
    }, Clndr.prototype.buildTargetObject = function(currentTarget, targetWasDay) {
        var target = {
            element: currentTarget,
            events: null,
            date: null
        };
        if (targetWasDay) {
            var dateString = currentTarget.id.replace("calendar-day-", "");
            target.date = moment(dateString), this.options.events && (target.events = _.filter(this.options.events, function(event) {
                return event._clndrDateObject.format("YYYY-MM-DD") == dateString;
            }));
        }
        return target;
    }, Clndr.prototype.forwardAction = function(event) {
        event.data.context.month.add("months", 1), event.data.context.options.clickEvents.nextMonth && event.data.context.options.clickEvents.nextMonth(event.data.context.month), 
        event.data.context.options.clickEvents.onMonthChange && event.data.context.options.clickEvents.onMonthChange(event.data.context.month), 
        event.data.context.render();
    }, Clndr.prototype.backAction = function(event) {
        event.data.context.month.subtract("months", 1), event.data.context.options.clickEvents.previousMonth && event.data.context.options.clickEvents.previousMonth(event.data.context.month), 
        event.data.context.options.clickEvents.onMonthChange && event.data.context.options.clickEvents.onMonthChange(event.data.context.month), 
        event.data.context.render();
    }, Clndr.prototype.forward = function() {
        this.month.add("months", 1), this.render();
    }, Clndr.prototype.back = function() {
        this.month.subtract("months", 1), this.render();
    }, Clndr.prototype.next = function() {
        this.forward();
    }, Clndr.prototype.previous = function() {
        this.back();
    }, Clndr.prototype.setMonth = function(newMonth) {
        this.month.month(newMonth), this.render();
    }, Clndr.prototype.setYear = function(newYear) {
        this.month.year(newYear), this.render();
    }, Clndr.prototype.nextYear = function() {
        this.month.add("year", 1), this.render();
    }, Clndr.prototype.previousYear = function() {
        this.month.subtract("year", 1), this.render();
    }, Clndr.prototype.setYear = function(newYear) {
        this.month.year(newYear), this.render();
    }, Clndr.prototype.setEvents = function(events) {
        this.options.events = this.addMomentObjectToEvents(events), calendar.render();
    }, Clndr.prototype.addMomentObjectToEvents = function(events) {
        var self = this;
        return _.each(events, function(event) {
            event._clndrDateObject = moment(event[self.options.dateParameter]);
        }), events;
    }, Clndr.prototype.calendarDay = function(options) {
        var defaults = {
            day: "",
            classes: this.options.targets.empty,
            events: [],
            id: "",
            date: null
        };
        return $.extend({}, defaults, options);
    }, $.fn.clndr = function(options) {
        if (!$.data(this, "plugin_clndr")) {
            var clndr_instance = new Clndr(this, options);
            return $.data(this, "plugin_clndr", clndr_instance), clndr_instance;
        }
    };
}(jQuery, window, document);