/*!
 * ZUI: 日历 - v1.9.0 - 2019-03-04
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2019 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: calendar.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */

(function($, window) {
    'use strict';
    var NAME = 'zui.calendar';
    var NUMBER_TYPE_NAME = 'number';
    var STRING_TYPE_NAME = 'string';
    var UNDEFINED_TYPE_NAME = 'undefined';
    var presetColors = {
        "primary": 1,
        "green": 2,
        "red": 3,
        "blue": 4,
        "yellow": 5,
        "brown": 6,
        "purple": 7
    };

    var getNearbyLastWeekDay = function(date, lastWeek) {
            lastWeek = lastWeek || 1;

            var d = date.clone();
            while(d.getDay() != lastWeek) {
                d.addDays(-1);
            }
            d.clearTime();
            return d;
        },

        getFirstDayOfMonth = function(date) {
            var d = date.clone();
            d.setDate(1);
            return d;
        },

        calculateDays = function(start, end) {
            var s = start.clone().clearTime();
            var e = end.clone().clearTime();
            return Math.round((e.getTime() - s.getTime()) / Date.ONEDAY_TICKS) + 1;
        },

        everyDayTo = function(start, end, callback) {
            var a = start.clone();
            var i = 0;
            while(a <= end) {
                callback(a.clone(), i++);
                a.addDays(1);
            }
        };

    var Calendar = function(element, options) {
        this.name = NAME;
        this.$ = $(element);
        this.id = this.$.attr('id') || (NAME + $.zui.uuid());
        this.$.attr('id', this.id);
        this.storeName = NAME + '.' + this.id;

        this.getOptions(options);
        this.getLang();

        this.resetData(this.options.data);

        this.storeData = $.zui.store.pageGet(this.storeName, {
            date: 'today',
            view: 'month'
        });

        this.date = this.options.startDate || 'today';
        this.view = this.options.startView || 'month';

        this.$.toggleClass('limit-event-title', options.limitEventTitle);

        if(this.options.withHeader) {
            var $header = this.$.children('.calender-header');
            if(!$header.length) {
                $header = $('<header class="calender-header"><div class="btn-toolbar"><div class="btn-group"><button type="button" class="btn btn-today">{today}</button></div><div class="btn-group"><button type="button" class="btn btn-prev"><i class="icon-chevron-left"></i></button><button type="button" class="btn btn-next"><i class="icon-chevron-right"></i></button></div><div class="btn-group"><span class="calendar-caption"></span></div></div></header>'.format(this.lang));
                this.$.append($header);
            }
            this.$caption = $header.find('.calendar-caption');
            this.$todayBtn = $header.find('.btn-today');
            this.$header = $header;
        }

        var $views = this.$.children('.calendar-views');
        if(!$views.length) {
            $views = $('<div class="calendar-views"></div>');
            this.$.append($views);
        }
        this.$views = $views;

        this.display();

        this.bindEvents();
    };

    // default options
    Calendar.DEFAULTS = {
        langs: {
            zh_cn: {
                weekNames: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                today: '今天',
                year: '{0}年',
                month: '{0}月',
                yearMonth: '{0}年{1}月'
            },
            zh_tw: {
                weekNames: ['週一', '週二', '週三', '週四', '週五', '週六', '週日'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                today: '今天',
                year: '{0}年',
                month: '{0}月',
                yearMonth: '{0}年{1}月'
            },
            en: {
                weekNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                today: 'Today',
                year: '{0}',
                month: '{0}',
                yearMonth: '{2}, {0}'
            }
        },
        data: {
            calendars: {
                defaultCal: {
                    color: '#229F24'
                }
            },
            events: []
        },
        // startView: "month",  // default view when load complete
        // startDate: 'today',  // default date when load complete
        limitEventTitle: true,
        storage: true,
        withHeader: true,
        dragThenDrop: true, // drag an event and drop at another day,
        // hideEmptyWeekends: false // Auto hide empty weekends
    };

    Calendar.prototype.resetData = function(data) {
        var that = this;
        that.data = data = data || that.data;
        if (data.calendars) {
            this.calendars = {};
            that.addCalendars(data.calendars, true);
        }
        if (data.events) {
            this.events = [];
            that.addEvents(data.events, true);
        }
        that.sortEvents();
    };

    // Sort events by start datetime
    Calendar.prototype.sortEvents = function() {
        var that = this;
        var events = that.events;
        if(!$.isArray(events)) {
            events = [];
        }

        events.sort(that.options.eventSorter || function(a, b) {
            if (a.allDay) {
                return 1;
            } else if (b.allDay) {
                return -1;
            }
            var result = a.start > b.start ? 1 : (a.start < b.start ? (-1) : 0);
            if (result === 0) {
                result = a.id < b.id ? (-1) : 1;
            }
            return result;
        });

        that.events = events;
    };

    Calendar.prototype.bindEvents = function() {
        var $e = this.$,
            that = this;

        $e.on('click', '.btn-today', function() {
            that.date = new Date();
            that.display();
            $e.callComEvent(that, 'clickTodayBtn');
        }).on('click', '.btn-next', function() {
            if(that.view === 'month') {
                that.date.addMonths(1);
            }
            that.display();
            $e.callComEvent(that, 'clickNextBtn');
        }).on('click', '.btn-prev', function() {
            if(that.view === 'month') {
                that.date.addMonths(-1);
            }
            that.display();
            $e.callComEvent(that, 'clickPrevBtn');
        }).on('click', '.event', function(event) {
            $e.callComEvent(that, 'clickEvent', {
                element: this,
                event: $(this).data('event'),
                events: that.events
            });
            event.stopPropagation();
        }).on('click', '.cell-day', function() {
            $e.callComEvent(that, 'clickCell', {
                element: this,
                view: that.view,
                date: new Date($(this).children('.day').attr('data-date')),
                events: that.events
            });
        });
    };

    Calendar.prototype.addCalendars = function(calendars, silence) {
        var that = this;
        if(!that.calendars) that.calendars = {};

        if($.isPlainObject(calendars)) {
            calendars = [calendars];
        }
        $.each(calendars, function(index, cal) {
            if(!silence && false === that.$.callComEvent(this, 'beforeAddCalendars', {
                    newCalendar: cal,
                    data: that.data
                })) {
                return;
            }

            if(!cal.color) cal.color = 'primary';
            if(!presetColors[cal.color.toLowerCase()]) {
                var c = new $.zui.Color(cal.color);
                cal.textColor = c.contrast().hexStr();
            } else {
                cal.presetColor = true;
            }
            that.calendars[cal.name] = cal;
        });

        if(!silence) {
            that.display();
            that.$.callComEvent(that, 'addCalendars', {
                newCalendars: calendars,
                data: that.data
            });
        }
    };

    Calendar.prototype.addEvents = function(events, silence) {
        var that = this;
        if(!that.events) that.events = [];

        if($.isPlainObject(events)) {
            events = [events];
        }
        $.each(events, function(index, e) {
            if(!silence && false === that.$.callComEvent(that, 'beforeAddEvent', {
                    newEvent: e,
                    data: that.data
                })) {
                return;
            }

            var startType = typeof e.start;
            var endType = typeof e.end;
            if(startType === NUMBER_TYPE_NAME || startType === STRING_TYPE_NAME) {
                e.start = new Date(e.start);
            }
            if(endType === NUMBER_TYPE_NAME || endType === STRING_TYPE_NAME) {
                e.end = new Date(e.end);
            }
            if(typeof e.id === UNDEFINED_TYPE_NAME) {
                e.id = $.zui.uuid();
            }

            if(e.allDay) {
                e.start.clearTime();
                if (!e.end) {
                    e.end = e.start.clone();
                }
                e.end.clearTime().addDays(1).addMilliseconds(-1);
            }

            e.days = calculateDays(e.start, e.end);

            that.events.push(e);
        });

        if(!silence) {
            that.sortEvents();
            that.display();
            that.$.callComEvent(that, 'addEvents', {
                newEvents: events,
                data: that.data
            });
        }
    };

    Calendar.prototype.getEvent = function(id) {
        var events = this.events;
        for(var i = 0; i < events.length; i++) {
            if(events[i].id == id) {
                return events[i];
            }
        }
        return null;
    };

    Calendar.prototype.updateEvents = function(events) {
        var eventsParams = {
                data: this.data,
                changes: []
            },
            that = this;

        if($.isPlainObject(events)) {
            events = [events];
        }
        var event, chgs, eventParam;
        $.each(events, function(index, changes) {
            event = changes.event;
            chgs = changes.changes;
            eventParam = {
                event: event,
                changes: []
            };
            if(typeof event === STRING_TYPE_NAME) {
                event = that.getEvent(event);
            }
            if(event) {
                if($.isPlainObject(chgs)) {
                    chgs = [chgs];
                }
                $.each(changes, function(idx, chge) {
                    if(false !== that.$.callComEvent(that, 'beforeChange', {
                        event: event,
                        change: chge.change,
                        to: chge.to,
                        from: event[chge.change]
                    })) {
                        eventParam.changes.push($.extend(true, {}, chge, {
                            from: event[chge.change]
                        }));
                        event[chge.change] = chge.to;
                    }
                });
            }
            eventsParams.changes.push(eventParam);
        });

        that.sortEvents();
        that.display();
        that.$.callComEvent(that, 'change', eventsParams);
    };

    Calendar.prototype.removeEvents = function(events) {
        if(!$.isArray(events)) {
            events = [events];
        }
        var id, event, idx, evts = this.events,
            that = this,
            removedEvents = [];
        $.each(events, function(index, value) {
            id = $.isPlainObject(value) ? value.id : value;
            idx = -1;
            for(var i = 0; i < evts.length; i++) {
                if(evts[i].id == id) {
                    idx = i;
                    event = evts[i];
                    break;
                }
            }

            if(idx >= 0 && fasle !== that.$.callComEvent(that, 'beforeRemoveEvent', {
                    event: event,
                    eventId: id,
                    data: that.data
                })) {
                evts.splice(idx, 1);
                removedEvents.push(event);
            }
        });

        that.sortEvents();
        that.display();
        that.$.callComEvent(that, 'removeEvents', {
            removedEvents: removedEvents,
            data: that.data
        });
    };

    Calendar.prototype.getOptions = function(options) {
        this.options = $.extend(true, {}, Calendar.DEFAULTS, this.$.data(), options, true);
    };

    Calendar.prototype.getLang = function() {
        this.lang = this.options.langs[(this.options.lang || ($.zui && $.zui.clientLang ? $.zui.clientLang() : 'zh_cn')).replace('-', '_')];
    };

    Calendar.prototype.display = function(view, date) {
        var that = this;
        var viewType = typeof view;
        var dateType = typeof date;

        if(viewType === UNDEFINED_TYPE_NAME) {
            view = that.view;
        } else {
            that.view = view;
        }

        if(dateType === UNDEFINED_TYPE_NAME) {
            date = that.date;
        } else {
            that.date = date;
        }

        if(date === 'today') {
            date = new Date();
            that.date = date;
        }

        if(typeof date === STRING_TYPE_NAME) {
            date = new Date(date);
            that.date = date;
        }

        if(that.options.storage) {
            $.zui.store.pageSet(that.storeName, {
                date: date,
                view: view
            });
        }

        var eventPramas = {
            view: view,
            date: date
        };

        var doDisplay = function() {
            switch(view) {
                case 'month':
                    that.displayMonth(date);
                    break;
            }

            that.$.callComEvent(that, 'display', eventPramas);
        };

        var beforeDisplayResult = that.$.callComEvent(that, 'beforeDisplay', [eventPramas, doDisplay]);
        if (beforeDisplayResult !== false) {
            doDisplay();
        }
    };

    Calendar.prototype.displayMonth = function(date) {
        var that = this;
        date = date || that.date;
        var options = that.options,
            lang = that.lang,
            i,
            $views = that.$views,
            $e = that.$;

        var $view = that.$monthView;
        if(!$view || !$view.length) {
            $view = $('<div class="calendar-view month"><table class="table table-bordered"><thead><tr class="week-head"></tr></thead><tbody class="month-days"></tbody></table></div>');

            var $weekHead = $view.find('.week-head'),
                $monthDays = $view.find('.month-days'),
                $tr;

            for(i = 0; i < 7; i++) {
                $('<th>' + lang.weekNames[i] + '</th>').toggleClass('weekend-head', i >= 5).appendTo($weekHead);
            }

            for(i = 0; i < 6; i++) {
                $tr = $('<tr class="week-days"></tr>');
                for(var j = 0; j < 7; j++) {
                    $('<td class="cell-day"><div class="day"><div class="heading"><span class="month"></span> <span class="number"></span></div><div class="content"><div class="events"></div></div></div></td>').toggleClass('weekend-day', j >= 5).appendTo($tr);
                }
                $monthDays.append($tr);
            }

            $views.append($view);
            that.$monthView = $view;
        }

        var $weeks = $view.find('.week-days'),
            $days = $view.find('.day'),
            firstDayOfMonth = getFirstDayOfMonth(date),
            // lastDayOfMonth = getLastDayOfMonth(date),
            $week,
            $day,
            $cell,
            year,
            day,
            month,
            today = new Date();
        var firstDay = getNearbyLastWeekDay(firstDayOfMonth),
            thisYear = date.getFullYear(),
            thisMonth = date.getMonth(),
            todayMonth = today.getMonth(),
            todayYear = today.getFullYear(),
            todayDate = today.getDate();
        var lastDay = firstDay.clone().addDays(6 * 7).addMilliseconds(-1),
            printDate = firstDay.clone().addDays(1).addMilliseconds(-1);
        var events = that.getEvents(firstDay, lastDay),
            calendars = that.calendars,
            printDateId, isFirstDayOfWeek, $event, cal, $dayEvents;

        var isEmptyWeekends = true;
        $weeks.each(function(weekIdx) {
            $week = $(this);
            $week.find('.day').each(function(dayIndex) {
                isFirstDayOfWeek = dayIndex === 0;
                $day = $(this);
                $cell = $day.closest('.cell-day');
                year = printDate.getFullYear();
                day = printDate.getDate();
                month = printDate.getMonth();
                printDateId = printDate.toDateString();
                $day.attr('data-date', printDateId).data('date', printDate.clone());
                $day.find('.heading > .number').text(day);

                $day.find('.heading > .month')
                    .toggle((weekIdx === 0 && dayIndex === 0) || day === 1)
                    .text(((month === 0 && day === 1) ? (lang.year.format(year) + ' ') : '') + lang.monthNames[month]);
                $cell.toggleClass('current-month', month === thisMonth);
                $cell.toggleClass('current', (day === todayDate && month === todayMonth && year === todayYear));
                $cell.toggleClass('past', printDate < today);
                $cell.toggleClass('future', printDate > today);
                $dayEvents = $day.find('.events').empty();

                var dayEvents = events[printDateId];
                if(dayEvents) {
                    var eventsMap = dayEvents.events,
                        stripCount = 0,
                        e;
                    for(i = 0; i <= dayEvents.maxPos; ++i) {
                        e = eventsMap[i];
                        if(!e || (e.placeholder && !isFirstDayOfWeek)) {
                            stripCount++;
                            continue;
                        }
                        if (isEmptyWeekends && dayIndex >= 5) {
                            isEmptyWeekends = false;
                        }
                        if (options.eventCreator) {
                            $event = options.eventCreator(e, $cell, that);
                        } else {
                            $event = $('<div data-id="' + e.id + '" class="event" title="' + e.desc + '"><span class="time">' + e.start.format('hh:mm') + '</span> <span class="title">' + e.title + '</span></div>');
                            $event.find('.time').toggle(!e.allDay);
                            $event.data('event', e);
                            $event.attr('data-days', e.days);
                        }
                        $event.toggleClass('event-all-day', !!e.allDay).data('event', e).attr('data-days', e.days);

                        if(e.calendar) {
                            cal = calendars[e.calendar];
                            if(cal) {
                                if(cal.presetColor) {
                                    $event.addClass('color-' + cal.color);
                                } else {
                                    $event.css({
                                        'background-color': cal.color,
                                        color: cal.textColor
                                    });
                                }
                            }
                        }

                        if(e.days) {
                            if(!e.placeholder) {
                                $event.css('width', Math.min(7 - dayIndex, e.days) + '00%');
                            } else if(isFirstDayOfWeek) {
                                $event.css('width', Math.min(7, e.days - e.holderPos) + '00%');
                            }
                        }

                        if(stripCount > 0) {
                            $event.css('margin-top', stripCount * 22);
                            stripCount = 0;
                        }

                        $dayEvents.append($event);
                    }
                }

                if (options.dayFormater) {
                    options.dayFormater($cell, printDate, dayEvents, that);
                }

                printDate.addDays(1);
            });
        });
        if (options.hideEmptyWeekends) {
            $view.toggleClass('weekends-empty', isEmptyWeekends);
        }

        if(options.withHeader) {
            that.$caption.text(lang.yearMonth.format(thisYear, thisMonth + 1, lang.monthNames[thisMonth]));
            that.$todayBtn.toggleClass('disabled', thisMonth === todayMonth && thisYear === todayYear);
        }

        if(options.dragThenDrop) {
            if(!$.fn.droppable) {
                return console.error('Calendar dragThenDrop option requires droppable.js');
            }
            if(!$view.data('zui.droppable')) {
                $view.droppable($.extend({
                    target: '.cell-day',
                    selector: '.event',
                    flex: true,
                    start: function() {
                        that.$.addClass('event-dragging');
                    },
                    drop: function(e) {
                        var et = e.element.data('event'),
                            newDate = e.target.children('.day').attr('data-date');
                        if(!et || !newDate) return;
                        var startDate = et.start.clone();
                        if(startDate.toDateString() != newDate) {
                            newDate = new Date(newDate);
                            newDate.setHours(startDate.getHours());
                            newDate.setMinutes(startDate.getMinutes());
                            newDate.setSeconds(startDate.getSeconds());

                            if(false !== that.$.callComEvent(that, 'beforeChange', {
                                    event: et,
                                    change: 'start',
                                    to: newDate
                                })) {
                                var oldEnd = et.end.clone();

                                et.end.addMilliseconds(et.end.getTime() - startDate.getTime());
                                et.start = newDate;

                                that.display();

                                that.$.callComEvent(that, 'change', {
                                    data: that.data,
                                    changes: [{
                                        event: et,
                                        changes: [{
                                            change: 'start',
                                            from: startDate,
                                            to: et.start
                                        }, {
                                            change: 'end',
                                            from: oldEnd,
                                            to: et.end
                                        }]
                                    }]
                                });
                            }
                        }
                    },
                    finish: function() {
                        that.$.removeClass('event-dragging');
                    }
                }, ($.isPlainObject(options.dragThenDrop)) ? options.dragThenDrop : null));
            }
        }
    };

    Calendar.prototype.getEvents = function(start, end) {
        var events = {};
        var calendars = this.calendars;
        var addEventToDay = function(day, event, position) {
            var dayId = day.toDateString();
            var dayEvents = events[dayId];
            if(!dayEvents) {
                dayEvents = {
                    maxPos: -1,
                    events: {}
                };
            }

            if(typeof position === 'undefined') {
                for(var i = 0; i < 100; ++i) {
                    if(!dayEvents.events[i]) {
                        position = i;
                        break;
                    }
                }
            }

            dayEvents.maxPos = Math.max(position, dayEvents.maxPos);
            dayEvents.events[position] = event;
            events[dayId] = dayEvents;
            return position;
        };
        $.each(this.events, function(index, e) {
            if(e.start >= start && e.start <= end) {
                var position = addEventToDay(e.start, e);
                if(e.days > 1) {
                    var placeholder = $.extend({
                        placeholder: true
                    }, e);
                    everyDayTo(e.start.clone().addDays(1), e.end, function(thisDay, i) {
                        addEventToDay(thisDay.clone(), $.extend({
                            holderPos: i
                        }, placeholder), position);
                    });
                }
            }
        });
        return events;
    };

    $.fn.calendar = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new Calendar(this, options)));

            if(typeof option == STRING_TYPE_NAME) data[option]();
        });
    };

    $.fn.calendar.Constructor = Calendar;
}(jQuery, window));

