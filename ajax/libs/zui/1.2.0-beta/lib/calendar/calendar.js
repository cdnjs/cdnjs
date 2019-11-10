/*!
 * ZUI - v1.2.0-beta - 2014-10-30
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: calendar.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


+ function($, window)
{
    "use strict";
    var name = 'zui.calendar';

    var getNearbyLastWeekDay = function(date, lastWeek)
        {
            lastWeek = lastWeek || 1;

            var d = date.clone();
            while (d.getDay() != lastWeek)
            {
                d.addDays(-1);
            }
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);
            return d;
        },

        getFirstDayOfMonth = function(date)
        {
            var d = date.clone();
            d.setDate(1);
            return d;
        },

        getLastDayOfMonth = function(date)
        {
            var d = date.clone();
            var month = d.getMonth();
            d.setDate(28);

            while (d.getMonth() == month)
            {
                d.addDays(1);
            }

            d.addDays(-1);

            return d;
        };

    var Calendar = function(element, options)
    {
        this.name = name;
        this.$ = $(element);
        this.id = this.$.attr('id') || (name + $.uuid());
        this.$.attr('id', this.id);
        this.storeName = name + '.' + this.id;

        this.getOptions(options);
        this.getLang();

        this.data = this.options.data;
        this.calendars = $.isPlainObject(this.data.calendars) ? this.data.calendars :
        {};
        this.events = this.data.events;
        this.sortEvents();

        this.storeData = window.store.pageGet(this.storeName,
        {
            date: 'today',
            view: 'month'
        });

        this.date = this.options.startDate || (this.options.storage ? this.storeData.date : 'today');
        this.view = this.options.startView || (this.options.storage ? this.storeData.view : 'month');

        this.$.toggleClass('limit-event-title', options.limitEventTitle);

        if (this.options.withHeader)
        {
            var $header = this.$.children('.calender-header');
            if (!$header.length)
            {
                $header = $('<header><div class="btn-toolbar"><div class="btn-group"><button type="button" class="btn btn-today">{today}</button></div><div class="btn-group"><button type="button" class="btn btn-prev"><i class="icon-chevron-left"></i></button><button type="button" class="btn btn-next"><i class="icon-chevron-right"></i></button></div><div class="btn-group"><span class="calendar-caption"></span></div></div></header>'.format(this.lang));
                this.$.append($header);
            }
            this.$caption = $header.find('.calendar-caption');
            this.$todayBtn = $header.find('.btn-today');
            this.$header = $header;
        }

        var $views = this.$.children('.calendar-views');
        if (!$views.length)
        {
            $views = $('<div class="calendar-views"></div>');
            this.$.append($views);
        }
        this.$views = $views;
        this.$monthView = $views.children('.calendar-view.month');

        this.display();

        this.bindEvents();
    };

    // default options
    Calendar.DEFAULTS = {
        langs:
        {
            zh_cn:
            {
                weekNames: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                today: '今天',
                year: '{0}年',
                month: '{0}月',
                yearMonth: '{0}年{1}月'
            }
        },
        data:
        {
            calendars:
            {
                defaultCal:
                {
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
        dragThenDrop: true // drag an event and drop at another day
    };

    // Sort events by start datetime
    Calendar.prototype.sortEvents = function()
    {
        var events = this.events;
        if (!$.isArray(events))
        {
            events = [];
        }

        $.each(events, function(index, e)
        {
            if (typeof e.start === 'string')
            {
                e.start = new Date(e.start);
            }
            if (typeof e.end === 'string')
            {
                e.end = new Date(e.end);
            }

            if (typeof e.id === 'undefined')
            {
                e.id = $.uuid();
            }
        });

        events.sort(function(a, b)
        {
            return a.start > b.start ? 1 : (a.start < b.start ? (-1) : 0);
        });

        // this.events = events;
    }

    Calendar.prototype.bindEvents = function()
    {
        var $e = this.$,
            self = this;

        $e.on('click', '.btn-today', function()
        {
            self.date = new Date();
            self.display();
            self.callEvent('clickTodayBtn');
        }).on('click', '.btn-next', function()
        {
            if (self.view === 'month')
            {
                self.date.addMonths(1);
            }
            self.display();
            self.callEvent('clickNextBtn');
        }).on('click', '.btn-prev', function()
        {
            if (self.view === 'month')
            {
                self.date.addMonths(-1);
            }
            self.display();
            self.callEvent('clickPrevBtn');
        }).on('click', '.event', function(event)
        {
            self.callEvent('clickEvent',
            {
                event: $(this).data('event'),
                events: self.events
            });
            event.stopPropagation();
        }).on('click', '.cell-day', function()
        {
            self.callEvent('clickCell',
            {
                view: self.view,
                date: $(this).attr('data-date'),
                events: self.events
            });
        });
    };

    Calendar.prototype.addCalendars = function(calendars)
    {
        if ($.isPlainObject(calendars))
        {
            calendars = [calendars];
        }
        $.each(calendars, function(index, value)
        {
            if (this.callEvent('beforeAddCalendars',
            {
                newCalendar: value,
                data: this.data
            }))
            {
                this.calendars[value.name](value);
            }
        });

        this.display();
        this.callEvent('addCalendars',
        {
            newCalendars: calendars,
            data: this.data
        });
    };

    Calendar.prototype.addEvents = function(events)
    {
        if ($.isPlainObject(events))
        {
            events = [events];
        }
        $.each(events, function(index, value)
        {
            if (this.callEvent('beforeAddEvent',
            {
                newEvent: value,
                data: this.data
            }))
            {
                this.events.push(value);
            }
        });

        this.sortEvents();
        this.display();
        this.callEvent('addEvents',
        {
            newEvents: events,
            data: this.data
        });
    };

    Calendar.prototype.getEvent = function(id)
    {
        var events = this.events;
        for (var i = 0; i < events.length; i++)
        {
            if (events[i].id == id)
            {
                return events[i];
            }
        }
        return null
    };

    Calendar.prototype.updateEvents = function(updates)
    {
        var eventsParams = {
            data: this.data,
            changes: []
        };

        if ($.isPlainObject(events))
        {
            events = [events];
        }
        var event, chgs, eventParam;
        $.each(events, function(index, changes)
        {
            event = changes.event;
            chgs = changes.changes;
            eventParam = {
                event: event,
                changes: []
            };
            if (typeof event === 'string')
            {
                event = this.getEvent(event);
            }
            if (event)
            {
                if ($.isPlainObject(chgs))
                {
                    chgs = [chgs];
                }
                $.each(function(idx, chge)
                {
                    if (this.callEvent('beforeChange',
                    {
                        event: event,
                        change: chge.change,
                        to: chge.to,
                        from: event[chge.change]
                    }))
                    {
                        eventParam.changes.push($.entend(true,
                        {}, chge,
                        {
                            from: event[chge.change]
                        }));
                        event[chge.change] = chge.to;
                    }
                });
            }
            eventsParams.changes.push(eventParam);
        });

        this.sortEvents();
        this.display();
        this.callEvent('change', eventsParams);
    };

    Calendar.prototype.removeEvents = function(events)
    {
        if (!$.isArray(events))
        {
            events = [events];
        }
        var id, event, idx, evts = this.events,
            removedEvents = [];
        $.each(events, function(index, value)
        {
            id = $.isPlainObject(value) ? value.id : value;
            idx = -1;
            for (var i = 0; i < evts.length; i++)
            {
                if (evts[i].id == id)
                {
                    idx = i;
                    event = evts[i];
                    break;
                }
            }

            if (idx >= 0 && this.callEvent('beforeRemoveEvent',
            {
                event: event,
                eventId: id,
                data: this.data
            }))
            {
                evts.splice(idx, 1);
                removedEvents.push(event);
            }
        });

        this.sortEvents();
        this.display();
        this.callEvent('removeEvents',
        {
            removedEvents: removedEvents,
            data: this.data
        });
    };

    Calendar.prototype.getOptions = function(options)
    {
        this.options = $.extend(
        {}, Calendar.DEFAULTS, this.$.data(), options);
    };

    Calendar.prototype.getLang = function()
    {
        this.lang = this.options.langs[this.options.lang || $.clientLang()];
    };

    Calendar.prototype.display = function(view, date)
    {
        if (typeof view === 'undefined')
        {
            view = this.view;
        }
        else
        {
            this.view = view;
        }

        if (typeof date === 'undefined')
        {
            date = this.date;
        }
        else
        {
            this.date = date;
        }

        if (date === 'today')
        {
            date = new Date();
            this.date = date;
        }
        else if (typeof date === 'string')
        {
            date = new Date(date);
            this.date = date;
        }

        if (this.options.storage)
        {
            window.store.pageSet(this.storeName,
            {
                date: date,
                view: view
            });
        }

        var eventPramas = {
            view: view,
            date: date
        };
        if (this.callEvent('beforeDisplay', eventPramas))
        {
            switch (view)
            {
                case 'month':
                    this.displayMonth(date);
                    break;
            }

            this.callEvent('display', eventPramas);
        }
    };

    Calendar.prototype.displayMonth = function()
    {
        var options = this.options,
            self = this,
            lang = this.lang,
            date = this.date,
            $views = this.$views,
            $e = this.$;

        var $view = self.$monthView;
        if (!$view.length)
        {
            $view = $('<div class="calendar-view month"><table class="table table-bordered"><thead><tr class="week-head"></tr></thead><tbody class="month-days"></tbody></table></div>');

            var $weekHead = $view.find('.week-head'),
                $monthDays = $view.find('.month-days'),
                $tr;

            for (var i = 0; i < 7; i++)
            {
                $weekHead.append('<th>' + lang.weekNames[i] + '</th>');
            }

            for (var i = 0; i < 6; i++)
            {
                $tr = $('<tr class="week-days"></tr>');
                for (var j = 0; j < 7; j++)
                {
                    $tr.append('<td class="cell-day"><div class="day"><div class="heading"><span class="month"></span> <span class="number"></span></div><div class="content"><div class="events"></div></div></div></td>');
                }
                $monthDays.append($tr);
            }

            $views.append($view);
            self.$monthView = $view;
        }

        var $weeks = $view.find('.week-days'),
            $days = $view.find('.day'),
            firstDayOfMonth = getFirstDayOfMonth(date),
            lastDayOfMonth = getLastDayOfMonth(date),
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
            thisDay = date.getDate(),
            todayMonth = today.getMonth(),
            todayYear = today.getFullYear(),
            todayDate = today.getDate();
        var lastDay = firstDay.clone().addDays(6 * 7).addMilliseconds(-1),
            printDate = firstDay.clone().addDays(1).addMilliseconds(-1);

        $weeks.each(function(weekIdx)
        {
            $week = $(this);
            $week.find('.day').each(function(dayIndex)
            {
                $day = $(this);
                $cell = $day.closest('.cell-day');
                year = printDate.getFullYear();
                day = printDate.getDate();
                month = printDate.getMonth();
                $day.attr('data-date', printDate.toDateString());
                $day.find('.heading > .number').text(day);

                $day.find('.heading > .month')
                    .toggle((weekIdx === 0 && dayIndex === 0) || day === 1)
                    .text(((month === 0 && day === 1) ? (lang.year.format(year) + ' ') : '') + lang.monthNames[month]);
                $cell.toggleClass('current-month', month === thisMonth);
                $cell.toggleClass('current', (day === todayDate && month === todayMonth && year === todayYear));
                $cell.toggleClass('past', printDate < today);
                $cell.toggleClass('future', printDate > today);
                $day.find('.events').empty();

                printDate.addDays(1);
            });
        });

        if (options.withHeader)
        {
            this.$caption.text(lang.yearMonth.format(thisYear, thisMonth + 1));
            this.$todayBtn.toggleClass('disabled', thisMonth === todayMonth);
        }

        var $event,
            cal,
            events = this.events,
            calendars = this.calendars;
        $.each(this.events, function(index, e)
        {
            if (e.start >= firstDay && e.start <= lastDay)
            {
                $day = $days.filter('[data-date="' + e.start.toDateString() + '"]');
                if ($day.length)
                {
                    $event = $('<div data-id="' + e.id + '" class="event" title="' + e.desc + '"><span class="time">' + e.start.format('hh:mm') + '</span> <span class="title">' + e.title + '</span></div>');
                    $event.find('.time').toggle(!e.allDay);
                    $event.data('event', e);

                    if (e.calendar)
                    {
                        cal = calendars[e.calendar];
                        if (cal)
                        {
                            $event.data('calendar', cal).css('background-color', cal.color);
                        }
                    }

                    $day.find('.events').append($event);
                }
            }
        });

        if (options.dragThenDrop)
        {
            $view.find('.event').droppable(
            {
                target: $days,
                container: $view,
                flex: true,
                start: function(e)
                {
                    $e.addClass('event-dragging');
                },
                drop: function(e)
                {
                    var et = e.element.data('event'),
                        newDate = e.target.attr('data-date');
                    var startDate = et.start.clone();
                    if (startDate.toDateString() != newDate)
                    {
                        newDate = new Date(newDate);
                        newDate.setHours(startDate.getHours());
                        newDate.setMinutes(startDate.getMinutes());
                        newDate.setSeconds(startDate.getSeconds());

                        if (self.callEvent('beforeChange',
                        {
                            event: et,
                            change: 'start',
                            to: newDate
                        }))
                        {
                            var oldEnd = et.end.clone();

                            et.end.addMilliseconds(et.end.getTime() - startDate.getTime());
                            et.start = newDate;

                            e.target.find('.events').append(e.element);

                            self.callEvent('change',
                            {
                                data: self.data,
                                changes: [
                                {
                                    event: et,
                                    changes: [
                                    {
                                        change: 'start',
                                        from: startDate,
                                        to: et.start
                                    },
                                    {
                                        change: 'end',
                                        from: oldEnd,
                                        to: et.end
                                    }]
                                }]
                            });
                        }

                    }
                },
                finish: function(e)
                {
                    $e.removeClass('event-dragging');
                }
            });
        }
    };

    Calendar.prototype.callEvent = function(name, params)
    {
        var result = this.$.callEvent(name + '.' + this.name, params, this);
        return !(result.result != undefined && (!result.result));
    };

    $.fn.calendar = function(option)
    {
        return this.each(function()
        {
            var $this = $(this);
            var data = $this.data(name);
            var options = typeof option == 'object' && option;

            if (!data) $this.data(name, (data = new Calendar(this, options)));

            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.calendar.Constructor = Calendar;
}(jQuery, window);
