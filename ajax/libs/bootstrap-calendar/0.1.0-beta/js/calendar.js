/**
 * Bootstrap based calendar full view.
 *
 * https://github.com/Serhioromano/bootstrap-calendar
 *
 * User: Sergey Romanov <serg4172@mail.ru>
 * Version 0.1
 */
"use strict";

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
}
Date.prototype.getMonthFormatted = function() {
    var month = this.getMonth() + 1;
    return month < 10 ? '0' + month : month;
}
Date.prototype.getDateFormatted = function() {
    var date = this.getDate();
    return date < 10 ? '0' + date : date;
}
if(!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

;
(function($) {

    var defaults = {
        width: '100%',      // maximum width of all calendar
        view: 'month',      // month, week, day
        day: 'now',  // what day to start with. No matter month, week or day this will be a starting point
        // format yyyy-mm-dd or now
        first_day: 1,       // Which day is first 2 - sunday or 1 - monday
        events_url: '',     // URL to return JSON list of events in special format.
        // {success:1, result: [....]} or for error {success:0, error:'Something terrible happened'}
        // events: [...] as described in events property description
        // The start and end variables will be sent to this url

        /**
         * path to templates should end with slash /. It can be as relative
         *
         * /component/bootstrap-calendar/tmpls/
         *
         * or absolute
         *
         * http://localhost/component/bootstrap-calendar/tmpls/
         */
        tmpl_path: 'tmpls/',
        classes: {
            months: {
                inmonth: 'cal-day-inmonth',
                outmonth: 'cal-day-outmonth',
                saturday: 'cal-day-weekend',
                sunday: 'cal-day-weekend',
                holidays: 'cal-day-holiday',
                today: 'cal-day-today'
            },
            week: {
                workday: 'cal-day-workday',
                saturday: 'cal-day-weekend',
                sunday: 'cal-day-weekend',
                holidays: 'cal-day-holiday',
                today: 'cal-day-today'
            }
        },
        enable_easter_holidays: false, // Set to true if you want to enable Easter and Easter Monday as holidays
        views: {
            year: {
                slide_events: 1,
                enable: 1
            },
            month: {
                slide_events: 1,
                enable: 1
            },
            week: {
                enable: 1
            },
            day: {
                enable: 1
            }
        },


        // ------------------------------------------------------------
        // CALLBACKS. Events triggered by calendar class. You can use
        // those to affect you UI
        // ------------------------------------------------------------
        onAfterEventsLoad: function(events) {
        },
        onBeforeEventsLoad: function(next) {
            next();
        },
        onAfterViewLoad: function(calendar, view) {
        },

        // -------------------------------------------------------------
        // INTERNAL USE ONLY. DO NOT ASSIGN IT WILL BE OVERRIDDEN ANYWAY
        // -------------------------------------------------------------
        events: [],
        position: {
            start: new Date(),
            end: new Date()
        },
        templates: {
            year: '',
            month: '',
            week: '',
            day: ''
        },
        stop_cycling: false
    };

    function buildEventsUrl(events_url, data) {
        var separator, key, url;
        url = events_url;
        separator = (events_url.indexOf('?') < 0) ? '?' : '&';
        for(key in data) {
            url += separator + key + '=' + encodeURIComponent(data[key]);
            separator = '&';
        }
        return url;
    }

    function Calendar(params, context) {

        this.options = $.extend(true, {}, defaults, params);
        this.context = context;

        context.css('width', this.options.width);

        this.view.call(this);
        return this;
    }

    Calendar.prototype.setOptions = function(object) {
        $.extend(this.options, object);
    }

    Calendar.prototype._render = function() {
        this.context.html('');
        this._loadTemplate(this.options.view);
        this.stop_cycling = false;

        var data = {};
        data.events = [];
        data.cal = this;
        data.day = 1;

        // Getting list of days in a week in correct order. Works for month and week views
        if(this.options.first_day == 1) {
            data.months = [language.d1, language.d2, language.d3, language.d4, language.d5, language.d6, language.d0]
        } else {
            data.months = [language.d0, language.d1, language.d2, language.d3, language.d4, language.d5, language.d6]
        }

        // Get all events between start and end
        var start = parseInt(this.options.position.start.getTime());
        var end = parseInt(this.options.position.end.getTime());

        $.each(this.options.events, function(k, event) {
            if((parseInt(event.start) <= end) && (parseInt(event.end) >= start)) {
                data.events.push(event);
            }
        });

        switch(this.options.view) {
            case 'month':
                break;
            case 'week':
                break;
            case 'day':
                break;
        }

        data.start = new Date(this.options.position.start.getTime());
        data.lang = language;

        this.context.append(this.options.templates[this.options.view](data));
        this._update();
    };

    Calendar.prototype._week = function(event) {
        this._loadTemplate('week-days');

        var t = {};
        var start = parseInt(this.options.position.start.getTime());
        var end = parseInt(this.options.position.end.getTime());
        var events = [];
        var self = this;

        $.each(this.options.events, function(k, event) {
            if((parseInt(event.start) <= end) && (parseInt(event.end) >= start)) {

                event.start_day = new Date(parseInt(event.start)).getDay();
                if(self.options.first_day == 1) {
                    event.start_day = event.start_day - 1;
                }
                if(self.options.start_day < 0) {
                    event.start_day = 0;
                }
                if((event.end - event.start) <= 86400000) {
                    event.days = 1;
                } else {
                    event.days = ((event.end - event.start) / 86400000);
                }

                if(event.start < start) {

                    event.days = event.days - ((start - event.start) / 86400000);
                    event.start_day = 0;
                }

                event.days = Math.ceil(event.days);

                if(event.start_day + event.days > 7) {
                    event.days = 7 - (event.start_day);
                }

                if(self.options.first_day == 1) {

                }
                events.push(event);
            }
        });
        t.events = events;
        return self.options.templates['week-days'](t);

    }
    Calendar.prototype._month = function(month) {

        this._loadTemplate('year-month');

        var t = {};
        var newmonth = month + 1;
        t.data_day = this.options.position.start.getFullYear() + '-' + (newmonth < 10 ? '0' + newmonth : newmonth) + '-' + '01';
        t.month_name = language['m' + month];

        var curdate = new Date(this.options.position.start.getFullYear(), month, 1, 0, 0, 0);
        var start = parseInt(curdate.getTime());
        var end = parseInt(new Date(this.options.position.start.getFullYear(), month + 1, 0, 0, 0, 0).getTime());
        var events = [];

        $.each(this.options.events, function(k, event) {
            if((parseInt(event.start) <= end) && (parseInt(event.end) >= start)) {
                events.push(event);
            }
        });
        t.events = events;
        return this.options.templates['year-month'](t);
    }

    Calendar.prototype._day = function(week, day) {

        this._loadTemplate('month-day');

        var t = {tooltip: ''};
        var cls = this.options.classes.months.outmonth;

        var firstday = this.options.position.start.getDay();
        if(this.options.first_day == 2) {
            firstday++;
        } else {
            firstday = (firstday == 0 ? 7 : firstday);
        }

        day = (day - firstday) + 1;
        var curdate = new Date(this.options.position.start.getFullYear(), this.options.position.start.getMonth(), day, 0, 0, 0);

        // if day of the current month
        if(day > 0) {
            cls = this.options.classes.months.inmonth;
        }
        // stop cycling table rows;
        if((day + 1) > this.options.position.end.getDate()) {
            this.stop_cycling = true;
        }
        // if day of the next month
        if(day > this.options.position.end.getDate()) {
            day = day - this.options.position.end.getDate();
            cls = this.options.classes.months.outmonth;
        }

        cls = $.trim(cls + " " + this._getDayClass("months", curdate));
        
        if(day <= 0) {
            var daysinprevmonth = (new Date(this.options.position.start.getFullYear(), this.options.position.start.getMonth(), 0)).getDate();
            day = daysinprevmonth - Math.abs(day);
            cls += ' cal-month-first-row';
        }

        var holiday = this._getHoliday(curdate);
        if(holiday !== false) {
            t.tooltip = holiday;
        }

        t.data_day = curdate.getFullYear() + '-' + curdate.getMonthFormatted() + '-' + (day < 10 ? '0' + day : day);
        t.cls = cls;
        t.day = day;

        var start = parseInt(curdate.getTime());
        var end = parseInt(start + 86400000);
        var events = [];

        $.each(this.options.events, function(k, event) {
            if((parseInt(event.start) < end) && (parseInt(event.end) > start)) {
                events.push(event);
            }
        });

        t.events = events;
        return this.options.templates['month-day'](t);
    }

    Calendar.prototype._getHoliday = function(date) {
       if(this.options.enable_easter_holidays) {
           var easter = getEasterDate(date.getFullYear());
           if(easter.toDateString() == date.toDateString()) {
               return language.easter;
           }
           var easterMonday = new Date();
           easterMonday.setTime(easter.getTime());
           easterMonday.setDate(easter.getDate() + 1);
           if(easterMonday.toDateString() == date.toDateString()) {
               return language.easterMonday;
           }
       }
       if(this.options.holidays) {
           var date_str = date.getDateFormatted() + '-' + date.getMonthFormatted();
           if(date_str in this.options.holidays) {
               return this.options.holidays[date_str];
           }
           date_str += '-' + date.getFullYear();
           if(date_str in this.options.holidays) {
               return this.options.holidays[date_str];
           }
       }
       return false;
    };

    Calendar.prototype._getHolidayName = function(date) {
        var holiday = this._getHoliday(date);
        return (holiday === false) ? "" : holiday;
    };

    Calendar.prototype._getDayClass = function(class_group, date) {
        var self = this;
        var addClass = function(which, to) {
            var cls;
            cls = (self.options.classes && (class_group in self.options.classes) && (which in self.options.classes[class_group])) ? self.options.classes[class_group][which] : "";
            if((typeof(cls) == "string") && cls.length) {
                to.push(cls);
            }
        };
        var classes = [];
        if(date.toDateString() == (new Date()).toDateString()) {
            addClass("today", classes);
        }
        var holiday = this._getHoliday(date);
        if(holiday !== false) {
            addClass("holidays", classes);
        }
        switch(date.getDay()) {
            case 0:
                addClass("sunday", classes);
                break;
            case 6:
               addClass("saturday", classes);
               break;
        }
        return classes.join(" ");
    };

    Calendar.prototype.view = function(view) {
        if(view) this.options.view = view;

        this._init_position.call(this);
        this._loadEvents.call(this);
        this._render.call(this);

        this.options.onAfterViewLoad.call(this, this.options.view);
    };

    Calendar.prototype.navigate = function(where, next) {

        var to = $.extend({}, this.options.position);
        if(where == 'next') {
            switch(this.options.view) {
                case 'year':
                    to.start.setFullYear(this.options.position.start.getFullYear() + 1);
                    break;
                case 'month':
                    to.start.setMonth(this.options.position.start.getMonth() + 1);
                    break;
                case 'week':
                    to.start.setDate(this.options.position.start.getDate() + 7);
                    break;
                case 'day':
                    to.start.setDate(this.options.position.start.getDate() + 1);
                    break;
            }
        } else if(where == 'prev') {
            switch(this.options.view) {
                case 'year':
                    to.start.setFullYear(this.options.position.start.getFullYear() - 1);
                    break;
                case 'month':
                    to.start.setMonth(this.options.position.start.getMonth() - 1);
                    break;
                case 'week':
                    to.start.setDate(this.options.position.start.getDate() - 7);
                    break;
                case 'day':
                    to.start.setDate(this.options.position.start.getDate() - 1);
                    break;
            }
        } else if(where == 'today') {
            to.start.setTime(new Date().getTime());
        }
        else {
            $.error(language.error_where.format(where))
        }
        this.options.day = to.start.getFullYear() + '-' + to.start.getMonthFormatted() + '-' + to.start.getDateFormatted();
        this.view.call(this);
        if(_.isFunction(next)) {
            next();
        }
    };

    Calendar.prototype._init_position = function() {
        var year, month, day;

        if(this.options.day == 'now') {
            var date = new Date();
            year = date.getFullYear();
            month = date.getMonth();
            day = date.getDate();
        } else if(this.options.day.match(/^\d{4}-\d{2}-\d{2}$/g)) {
            var list = this.options.day.split('-');
            year = list[0];
            month = list[1] - 1;
            day = list[2];
        }
        else {
            $.error(language.error_dateformat.format(this.options.day));
        }

        switch(this.options.view) {
            case 'year':
                this.options.position.start.setTime(new Date(year, 0, 1).getTime());
                this.options.position.end.setTime(new Date(year, 12, 0, 23, 59, 59).getTime());
                break;
            case 'month':
                this.options.position.start.setTime(new Date(year, month, 1).getTime());
                this.options.position.end.setTime(new Date(year, month + 1, 0, 23, 59, 59).getTime());
                break;
            case 'day':
                this.options.position.start.setTime(new Date(year, month, day).getTime());
                this.options.position.end.setTime(new Date(year, month, day, 23, 59, 59).getTime());
                break;
            case 'week':
                var curr = new Date(year, month, day);
                var first = curr.getDate() - curr.getDay();
                if(this.options.first_day == 1) first += 1;
                var last = first + 6;

                this.options.position.start.setTime(new Date(year, month, first).getTime());
                this.options.position.end.setTime(new Date(year, month, last, 23, 59, 59).getTime());
                break;
            default:
                $.error(language.error_noview.format(this.options.view))
        }
        return this;
    };

    Calendar.prototype.getTitle = function() {
        var p = this.options.position.start;
        switch(this.options.view) {
            case 'year':
                return language.title_year.format(p.getFullYear());
                break;
            case 'month':
                return language.title_month.format(language['m' + p.getMonth()], p.getFullYear());
                break;
            case 'week':
                return language.title_week.format(p.getWeek(), p.getFullYear());
                break;
            case 'day':
                return language.title_day.format(language['d' + p.getDay()], p.getDate(), language['m' + p.getMonth()], p.getFullYear());
                break;
        }
        return;
    };

    Calendar.prototype.isToday = function() {
        var now = new Date().getTime();

        return ((now > this.options.position.start) && (now < this.options.position.end));
    }

    Calendar.prototype.getStartDate = function() {
        return this.options.position.start;
    }

    Calendar.prototype.getEndDate = function() {
        return this.options.position.end;
    }

    Calendar.prototype._loadEvents = function() {
        if(!this.options.events_url) {
            $.error(language.error_loadurl);
        }
        var self = this;
        this.options.onBeforeEventsLoad(function() {
            $.ajax({
                url: buildEventsUrl(self.options.events_url, {from: self.options.position.start.getTime(), to: self.options.position.end.getTime()}),
                dataType: 'json',
                type: 'GET',
                async: false
            }).done(function(json) {
                    if(!json.success) {
                        $.error(json.error);
                    }
                    self.options.events = json.result || [];
                    self.options.onAfterEventsLoad(json.result);
                });
        });
    };
    Calendar.prototype._loadTemplate = function(name) {
        if(this.options.templates[name]) {
            return;
        }
        var self = this;
        $.ajax({
            url: this.options.tmpl_path + name + '.html',
            dataType: 'html',
            type: 'GET',
            async: false
        }).done(function(html) {
                self.options.templates[name] = _.template(html);
            });
    };


    Calendar.prototype._update = function() {
        var self = this;

        $('*[rel="tooltip"]').tooltip();

        $('*[data-cal-date]').click(function() {
            var view = $(this).data('cal-view');
            if(!self.options.views[view].enable) {
                return;
            }
            self.options.day = $(this).data('cal-date');
            self.view(view);
        });
        $('.cal-cell').dblclick(function() {
            var view = $('[data-cal-date]', this).data('cal-view');
            if(!self.options.views[view].enable) {
                return;
            }
            self.options.day = $('[data-cal-date]', this).data('cal-date');
            self.view(view);
        });

        this['_update_' + this.options.view]();
    };

    Calendar.prototype._update_day = function() {

    };
    Calendar.prototype._update_week = function() {

    };
    Calendar.prototype._update_year = function() {
        this._update_month_year();

    };
    Calendar.prototype._update_month = function() {
        this._update_month_year();

        var week = $(document.createElement('div')).attr('id', 'cal-week-box');
        week.html(language.week);
        var start = this.options.position.start.getFullYear() + '-' + this.options.position.start.getMonthFormatted() + '-';
        $('.cal-month-box .cal-row-fluid').each(function(k, v) {
            var row = $(v);
            row.bind('mouseenter',function() {
                var child = $('.cal-cell1:first-child .cal-month-day', row);
                var day = (child.hasClass('cal-month-first-row') ? 1 : $('[data-cal-date]', child).text());
                day = (day < 10 ? '0' + day : day);
                week.attr('data-cal-week', start + day).show().appendTo(child);
            }).bind('mouseleave', function() {
                    week.hide();
                });
        });

        var self = this;

        week.click(function() {
            self.options.day = $(this).data('cal-week');
            self.view('week');
        });

        $('a.event').mouseenter(function() {
            $('a.event' + $(this).data('event-id')).parents('.cal-cell1').addClass('day-highlight dh-' + $(this).data('event-class'));
        });
        $('a.event').mouseleave(function() {
            $('div.cal-cell1').removeClass('day-highlight dh-' + $(this).data('event-class'));
        });

    };
    Calendar.prototype._update_month_year = function() {
        if(!this.options.views[this.options.view].slide_events) {
            return;
        }
        var activecell = 0;
        var self = this;
        var downbox = $(document.createElement('div')).attr('id', 'cal-day-box').html('<i class="icon-chevron-down"></i>');

        $('.cal-month-day, .cal-year-box .span3').each(function(k, v) {
            $(v).bind('mouseenter', function() {
                if($('.events-list', v).length == 0) return;
                if($(v).children('[data-cal-date]').text() == activecell) return;
                downbox.show().appendTo(v);
            });
            $(v).bind('mouseleave', function() {
                downbox.hide();
            });
        });


        var slider = $(document.createElement('div')).attr('id', 'cal-slide-box');
        slider.hide().click(function(event) {
            event.stopPropagation();
        });

        this._loadTemplate('events-list');

        downbox.click(function(event) {

            event.stopPropagation();

            var $this = $(this);
            var cell = $this.parents('.cal-cell');
            var row = $this.parents('.cal-row-fluid');
            var tick_position = cell.data('cal-row');

            $this.fadeOut('fast');

            slider.html(self.options.templates['events-list']({events: $('.events-list a.event', cell)}))
                .slideUp('fast', function() {
                    row.after(slider);
                    activecell = $('[data-cal-date]', cell).text();
                    $('#cal-slide-tick').addClass('tick' + tick_position).show();
                    slider.slideDown('fast', function() {
                        $('body').one('click', function() {
                            slider.slideUp('fast');
                            activecell = 0;
                        });
                    });
                });

            $('a.event-item').mouseenter(function() {
                $('a.event' + $(this).data('event-id')).parents('.cal-cell1').addClass('day-highlight dh-' + $(this).data('event-class'));
            });
            $('a.event-item').mouseleave(function() {
                $('div.cal-cell1').removeClass('day-highlight dh-' + $(this).data('event-class'));
            });
        });
    };

    function getEasterDate(year) {
        var a = year % 19;
        var b = Math.floor(year / 100);
        var c = year % 100;
        var d = Math.floor(b / 4); 
        var e = b % 4;
        var f = Math.floor((b + 8) / 25);
        var g = Math.floor((b - f + 1) / 3); 
        var h = (19 * a + b - d - g + 15) % 30;
        var i = Math.floor(c / 4);
        var k = c % 4;
        var l = (32 + 2 * e + 2 * i - h - k) % 7;
        var m = Math.floor((a + 11 * h + 22 * l) / 451);
        var n0 = (h + l + 7 * m + 114)
        var n = Math.floor(n0 / 31) - 1;
        var p = n0 % 31 + 1;
        return new Date(year, n, p, 0, 0, 0);
    }

    $.fn.calendar = function(params) {
        return new Calendar(params, this);
    }
}(jQuery));
