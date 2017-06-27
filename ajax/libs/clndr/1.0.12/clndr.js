/*!              ~ CLNDR v1.0.12 ~ 
 * ============================================== 
 *       https://github.com/kylestetz/CLNDR 
 * ============================================== 
 *  created by kyle stetz (github.com/kylestetz) 
 *        &available under the MIT license 
 * http://opensource.org/licenses/mit-license.php 
 * ============================================== 
 */
!function($, window, document, undefined) {
    function Clndr(element, options) {
        this.element = element, this.options = $.extend(!0, {}, defaults, options), this.options.events.length && (this.options.events = this.addMomentObjectToEvents(this.options.events)), 
        this.month = this.options.startWithMonth ? moment(this.options.startWithMonth) : moment(), 
        this._defaults = defaults, this._name = pluginName, this.init();
    }
    var clndrTemplate = "<div class='clndr-controls'><div class='clndr-control-button'><span class='clndr-previous-button'>previous</span></div><div class='month'><%= month %> <%= year %></div><div class='clndr-control-button rightalign'><span class='clndr-next-button'>next</span></div></div><table class='clndr-table' border='0' cellspacing='0' cellpadding='0'><thead><tr class='header-days'><% for(var i = 0; i < daysOfTheWeek.length; i++) { %><td class='header-day'><%= daysOfTheWeek[i] %></td><% } %></tr></thead><tbody><% for(var i = 0; i < numberOfRows; i++){ %><tr><% for(var j = 0; j < 7; j++){ %><% var d = j + i * 7; %><td class='<%= days[d].classes %>'><div class='day-contents'><%= days[d].day %></div></td><% } %></tr><% } %></tbody></table>", pluginName = "clndr", defaults = {
        template: clndrTemplate,
        weekOffset: 0,
        startWithMonth: null,
        clickEvents: {
            click: null,
            nextMonth: null,
            previousMonth: null,
            nextYear: null,
            previousYear: null,
            today: null,
            onMonthChange: null,
            onYearChange: null
        },
        targets: {
            nextButton: "clndr-next-button",
            previousButton: "clndr-previous-button",
            nextYearButton: "clndr-next-year-button",
            previousYearButton: "clndr-previous-year-button",
            todayButton: "clndr-today-button",
            day: "day",
            empty: "empty"
        },
        events: [],
        extras: null,
        dateParameter: "date",
        doneRendering: null,
        render: null,
        daysOfTheWeek: null,
        showAdjacentMonths: !0,
        adjacentDaysChangeMonth: !1,
        ready: null
    };
    Clndr.prototype.init = function() {
        if (this.daysOfTheWeek = this.options.daysOfTheWeek || [], !this.options.daysOfTheWeek) {
            this.daysOfTheWeek = [];
            for (var i = 0; 7 > i; i++) this.daysOfTheWeek.push(moment().weekday(i).format("dd").charAt(0));
        }
        if (this.options.weekOffset && (this.daysOfTheWeek = this.shiftWeekdayLabels(this.options.weekOffset)), 
        !$.isFunction(this.options.render)) {
            if (this.options.render = null, "undefined" == typeof _) throw new Error("Underscore was not found. Please include underscore.js OR provide a custom render function.");
            this.compiledClndrTemplate = _.template(this.options.template);
        }
        $(this.element).html("<div class='clndr'></div>"), this.calendarContainer = $(".clndr", this.element), 
        this.bindEvents(), this.render(), this.options.ready && this.options.ready.apply(this, []);
    }, Clndr.prototype.shiftWeekdayLabels = function(offset) {
        for (var days = this.daysOfTheWeek, i = 0; offset > i; i++) days.push(days.shift());
        return days;
    }, Clndr.prototype.createDaysObject = function(currentMonth) {
        daysArray = [];
        var date = currentMonth.startOf("month");
        if (this.eventsLastMonth = [], this.eventsThisMonth = [], this.eventsNextMonth = [], 
        this.options.events.length && (this.eventsThisMonth = $(this.options.events).filter(function() {
            return this._clndrDateObject.format("YYYY-MM") == currentMonth.format("YYYY-MM");
        }), this.options.showAdjacentMonths)) {
            var lastMonth = currentMonth.clone().subtract("months", 1), nextMonth = currentMonth.clone().add("months", 1);
            this.eventsLastMonth = $(this.options.events).filter(function() {
                return this._clndrDateObject.format("YYYY-MM") == lastMonth.format("YYYY-MM");
            }), this.eventsNextMonth = $(this.options.events).filter(function() {
                return this._clndrDateObject.format("YYYY-MM") == nextMonth.format("YYYY-MM");
            });
        }
        var diff = date.weekday() - this.options.weekOffset;
        if (0 > diff && (diff += 7), this.options.showAdjacentMonths) for (var i = 0; diff > i; i++) {
            var day = moment([ currentMonth.year(), currentMonth.month(), i - diff + 1 ]);
            daysArray.push(this.createDayObject(day, this.eventsLastMonth));
        } else for (var i = 0; diff > i; i++) daysArray.push(this.calendarDay({
            classes: this.options.targets.empty + " last-month"
        }));
        for (var numOfDays = date.daysInMonth(), i = 1; numOfDays >= i; i++) {
            var day = moment([ currentMonth.year(), currentMonth.month(), i ]);
            daysArray.push(this.createDayObject(day, this.eventsThisMonth));
        }
        if (this.options.showAdjacentMonths) for (i = 1; 0 !== daysArray.length % 7; ) {
            var day = moment([ currentMonth.year(), currentMonth.month(), numOfDays + i ]);
            daysArray.push(this.createDayObject(day, this.eventsNextMonth)), i++;
        } else for (i = 1; 0 !== daysArray.length % 7; ) daysArray.push(this.calendarDay({
            classes: this.options.targets.empty + " next-month"
        })), i++;
        return daysArray;
    }, Clndr.prototype.createDayObject = function(day, monthEvents) {
        var eventsToday = [], now = moment(), j = 0, l = monthEvents.length;
        for (j; l > j; j++) monthEvents[j]._clndrDateObject.date() == day.date() && eventsToday.push(monthEvents[j]);
        var extraClasses = "";
        return now.format("YYYY-MM-DD") == day.format("YYYY-MM-DD") && (extraClasses += " today"), 
        day.isBefore(now, "day") && (extraClasses += " past"), eventsToday.length && (extraClasses += " event"), 
        this.month.month() > day.month() ? (extraClasses += " adjacent-month", extraClasses += this.month.year() === day.year() ? " last-month" : " next-month") : this.month.month() < day.month() && (extraClasses += " adjacent-month", 
        extraClasses += this.month.year() === day.year() ? " next-month" : " last-month"), 
        !day.isValid() && day.hasOwnProperty("_d") && day._d != undefined && (day = moment(day._d)), 
        extraClasses += " calendar-day-" + day.format("YYYY-MM-DD"), this.calendarDay({
            day: day.date(),
            classes: this.options.targets.day + extraClasses,
            id: "calendar-day-" + day.format("YYYY-MM-DD"),
            events: eventsToday,
            date: day
        });
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
        this.options.render ? this.calendarContainer.html(this.options.render.apply(this, [ data ])) : this.calendarContainer.html(this.compiledClndrTemplate(data)), 
        this.options.doneRendering && this.options.doneRendering.apply(this, []);
    }, Clndr.prototype.bindEvents = function() {
        var $container = $(this.element), self = this;
        $container.on("click", "." + this.options.targets.day, function(event) {
            if (self.options.clickEvents.click) {
                var target = self.buildTargetObject(event.currentTarget, !0);
                self.options.clickEvents.click.apply(self, [ target ]);
            }
            self.options.adjacentDaysChangeMonth && ($(event.currentTarget).is(".last-month") ? self.backActionWithContext(self) : $(event.currentTarget).is(".next-month") && self.forwardActionWithContext(self));
        }), $container.on("click", "." + this.options.targets.empty, function(event) {
            if (self.options.clickEvents.click) {
                var target = self.buildTargetObject(event.currentTarget, !1);
                self.options.clickEvents.click.apply(self, [ target ]);
            }
            self.options.adjacentDaysChangeMonth && ($(event.currentTarget).is(".last-month") ? self.backActionWithContext(self) : $(event.currentTarget).is(".next-month") && self.forwardActionWithContext(self));
        }), $container.on("click", "." + this.options.targets.previousButton, {
            context: this
        }, this.backAction).on("click", "." + this.options.targets.nextButton, {
            context: this
        }, this.forwardAction).on("click", "." + this.options.targets.todayButton, {
            context: this
        }, this.todayAction).on("click", "." + this.options.targets.nextYearButton, {
            context: this
        }, this.nextYearAction).on("click", "." + this.options.targets.previousYearButton, {
            context: this
        }, this.previousYearAction);
    }, Clndr.prototype.buildTargetObject = function(currentTarget, targetWasDay) {
        var target = {
            element: currentTarget,
            events: [],
            date: null
        };
        if (targetWasDay) {
            var dateString, classNameIndex = currentTarget.className.indexOf("calendar-day-");
            dateString = 0 !== classNameIndex ? currentTarget.className.substring(classNameIndex + 13, classNameIndex + 23) : currentTarget.id.replace("calendar-day-", ""), 
            target.date = moment(dateString), this.options.events && (target.events = $.makeArray($(this.options.events).filter(function() {
                return this._clndrDateObject.format("YYYY-MM-DD") == dateString;
            })));
        }
        return target;
    }, Clndr.prototype.forwardAction = function(event) {
        var self = event.data.context;
        self.forwardActionWithContext(self);
    }, Clndr.prototype.backAction = function(event) {
        var self = event.data.context;
        self.backActionWithContext(self);
    }, Clndr.prototype.backActionWithContext = function(self) {
        var yearChanged = !self.month.isSame(moment(), "year");
        self.month.subtract("months", 1), self.options.clickEvents.previousMonth && self.options.clickEvents.previousMonth.apply(self, [ moment(self.month) ]), 
        self.options.clickEvents.onMonthChange && self.options.clickEvents.onMonthChange.apply(self, [ moment(self.month) ]), 
        yearChanged && self.options.clickEvents.onYearChange && self.options.clickEvents.onYearChange.apply(self, [ moment(self.month) ]), 
        self.render();
    }, Clndr.prototype.forwardActionWithContext = function(self) {
        var yearChanged = !self.month.isSame(moment(), "year");
        self.month.add("months", 1), self.options.clickEvents.nextMonth && self.options.clickEvents.nextMonth.apply(self, [ self.month ]), 
        self.options.clickEvents.onMonthChange && self.options.clickEvents.onMonthChange.apply(self, [ self.month ]), 
        yearChanged && self.options.clickEvents.onYearChange && self.options.clickEvents.onYearChange.apply(self, [ moment(self.month) ]), 
        self.render();
    }, Clndr.prototype.todayAction = function(event) {
        var self = event.data.context, monthChanged = !self.month.isSame(moment(), "month"), yearChanged = !self.month.isSame(moment(), "year");
        self.options.clickEvents.today && self.options.clickEvents.today.apply(self, [ moment(self.month) ]), 
        monthChanged && (self.month = moment(), self.options.clickEvents.onMonthChange && self.options.clickEvents.onMonthChange.apply(self, [ moment(self.month) ]), 
        yearChanged && self.options.clickEvents.onYearChange && self.options.clickEvents.onYearChange.apply(self, [ moment(self.month) ]), 
        self.render());
    }, Clndr.prototype.nextYearAction = function(event) {
        var self = event.data.context;
        self.month.add("years", 1), self.options.clickEvents.nextYear && self.options.clickEvents.nextYear.apply(self, [ moment(self.month) ]), 
        self.options.clickEvents.onMonthChange && self.options.clickEvents.onMonthChange.apply(self, [ moment(self.month) ]), 
        self.options.clickEvents.onYearChange && self.options.clickEvents.onYearChange.apply(self, [ moment(self.month) ]), 
        self.render();
    }, Clndr.prototype.previousYearAction = function(event) {
        var self = event.data.context;
        self.month.subtract("years", 1), self.options.clickEvents.previousYear && self.options.clickEvents.previousYear.apply(self, [ moment(self.month) ]), 
        self.options.clickEvents.onMonthChange && self.options.clickEvents.onMonthChange.apply(self, [ moment(self.month) ]), 
        self.options.clickEvents.onYearChange && self.options.clickEvents.onYearChange.apply(self, [ moment(self.month) ]), 
        self.render();
    }, Clndr.prototype.forward = function() {
        return this.month.add("months", 1), this.render(), this;
    }, Clndr.prototype.back = function() {
        return this.month.subtract("months", 1), this.render(), this;
    }, Clndr.prototype.next = function() {
        return this.forward(), this;
    }, Clndr.prototype.previous = function() {
        return this.back(), this;
    }, Clndr.prototype.setMonth = function(newMonth) {
        return this.month.month(newMonth), this.render(), this;
    }, Clndr.prototype.setYear = function(newYear) {
        return this.month.year(newYear), this.render(), this;
    }, Clndr.prototype.nextYear = function() {
        return this.month.add("year", 1), this.render(), this;
    }, Clndr.prototype.previousYear = function() {
        return this.month.subtract("year", 1), this.render(), this;
    }, Clndr.prototype.setYear = function(newYear) {
        return this.month.year(newYear), this.render(), this;
    }, Clndr.prototype.setEvents = function(events) {
        return this.options.events = this.addMomentObjectToEvents(events), this.render(), 
        this;
    }, Clndr.prototype.addEvents = function(events) {
        return this.options.events = $.merge(this.options.events, this.addMomentObjectToEvents(events)), 
        this.render(), this;
    }, Clndr.prototype.addMomentObjectToEvents = function(events) {
        var self = this, i = 0, l = events.length;
        for (i; l > i; i++) events[i]._clndrDateObject = moment(events[i][self.options.dateParameter]);
        return events;
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