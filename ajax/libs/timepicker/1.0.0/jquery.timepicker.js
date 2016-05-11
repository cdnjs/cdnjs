// jQuery TimePicker plugin - http://github.com/wvega/timepicker
//
// A jQuery plugin to enhance standard form input fields helping users to select
// (or type) times.
//
// Copyright (c) 2010 Willington Vega, http://wvega.com/
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

if(typeof jQuery != 'undefined') {
    (function($){
        var pad  = function(str, ch, length) {
            return Array(length + 1 - str.length).join(ch) + str;
        };
        
        $.TimePicker = function(element, options) {
            var self = this, doc = element.ownerDocument;

            self.element = $(element).data("TimePicker", self).attr('autocomplete', 'off');
            self.selectedTime = $.fn.timepicker.parseTime(self.element.val());
            self.options = $.metadata ? $.extend({}, options, self.element.metadata()) : options;

            if (self.element.attr('id').length === 0) {
                self.element.attr('id', 'timepicker-field-' + (new Date()).getTime());
            }
            self._build();

            self.menu.delegate('a', 'mouseenter.timepicker mouseleave.timepicker', function(event) {
                if (event.type == 'mouseover') {
                    self._activate($(this).parent());
                } else {
                    self._deactivate();
                }
            }).delegate('a', 'click', function(event) {
                event.preventDefault();
                self._select($(this).parent());
            }).appendTo('body', doc);

            // handle input field events
            self.element.bind('keydown.timepicker', function(event) {
                switch (event.which) {
                    case self.keyCode.ENTER:
                    case self.keyCode.NUMPAD_ENTER:
                        event.preventDefault();
                        if (self.closed) {
                            self.element.change();
                        } else {
                            self._select(self.active);
                        }
                        break;
                    case self.keyCode.UP:
                        self.previous();
                        break;
                    case self.keyCode.DOWN:
                        self.next();
                        break;
                    // TODO: always close?
                    default:
                        self.close();
                        break;
                }
            }).bind('focus.timepicker', function() {
                self.open();
            }).bind('change.timepicker', function(event) {
                if (self.closed) {
                    self.setTime($.fn.timepicker.parseTime(self.element.val()));
                }
            });
        };

        $.TimePicker.prototype = {
            // extracted from from jQuery UI Core
            // http://github,com/jquery/jquery-ui/blob/master/ui/jquery.ui.core.js
            keyCode: {
                DOWN: 40,
                END: 35,
                ENTER: 13,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ENTER: 108,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                RIGHT: 39,
                TAB: 9,
                UP: 38
            },
            
            _isValidTime: function(time) {
                var self = this, min = null, max = null;

                time.setSeconds(0, 0);

                if (self.options.minTime !== null) {
                    min = new Date();
                    min.setTime(time.valueOf());
                    min.setHours(self.options.minTime.getHours(), self.options.minTime.getMinutes(), 0, 0);
                } else if (self.options.minHour !== null || self.options.minMinutes !== null) {
                    min = new Date();
                    min.setTime(time.valueOf());
                    if (self.options.minHour !== null) {
                        min.setHours(self.options.minHour, 0, 0, 0);
                    }
                    if (self.options.minMinutes !== null) {
                        min.setMinutes(self.options.minMinutes, 0, 0);
                    }
                }

                if (self.options.maxTime !== null) {
                    max = new Date();
                    max.setTime(time.valueOf());
                    max.setHours(self.options.maxTime.getHours(), self.options.maxTime.getMinutes(), 0, 0);
                } else if (self.options.maxHour !== null || self.options.maxMinutes !== null) {
                    max = new Date();
                    max.setTime(time.valueOf());
                    if (self.options.maxHour !== null) {
                        max.setHours(self.options.maxHour, 0, 0, 0);
                    }
                    if (self.options.maxMinutes !== null) {
                        max.setMinutes(self.options.maxMinutes, 0, 0);
                    }
                }

                if (min !== null && max !== null) {
                    return time >= min && time <= max;
                } else if (min !== null) {
                    return time >= min;
                } else if (max !== null) {
                    return time <= max;
                }

                return true;
            },
            
            _populate: function(startTime) {
                var self = this, item = null,
                    ticks = 60 / self.options.interval,
                    startHour, limitHour, startTick, lastTick, limitTick,
                    hour='', min='', time = new Date();

                if (startTime) {
                    startHour = startTime.getHours();
                    startTick = Math.ceil(startTime.getMinutes() / self.options.interval);
                } else if (self.options.startTime) {
                    startHour = self.options.startTime.getHours();
                    startTick = Math.ceil(self.options.startTime.getMinutes() / self.options.interval);
                } else {
                    startHour = self.options.startHour;
                    startTick = Math.ceil(self.options.startMinutes / self.options.interval);
                }
                // if startTick is not zero some times may be lost, we need to
                // add those at the end of the list. WTF :S?
                limitHour = startHour + 24 + 1; // +1 is need

                if (startTick >= ticks) {
                    startHour += 1;
                    limitHour += 1;
                    startTick -= ticks;
                }
                lastTick = startTick;
                limitTick = ticks;

                self.menu.empty();
                for (var h = startHour; h < limitHour; h++) {
                    if (h == limitHour -1) {
                        limitTick = lastTick;
                    }
                    for (var i=startTick; i < limitTick; i++) {
                        hour = pad((h % 24).toString(), '0', 2);
                        min = pad(((i % ticks) * self.options.interval).toString(), '0', 2);
                        time.setHours(hour, min);
                        if (self._isValidTime(time)) {
                            item = $('<li>')
                                .addClass('ui-menu-item')
                                .appendTo(self.menu);
                            $('<a>')
                                .addClass('ui-corner-all')
                                .text($.fn.timepicker.formatTime(self.options.timeFormat, time))
                                .appendTo(item);
                        }
                    }
                    startTick=0;
                }
            },
            
            _build: function() {
                this.menu = $('<ul>', {id: 'timepicker-' + (new Date()).getTime()})
                    .addClass('ui-timepicker ui-widget ui-widget-content')
                    .addClass('ui-corner-all ui-helper-hidden');
                this.closed = true;
                // populate timepicker with time items
                this._populate();
            },

            _hasScroll: function() {
                return this.menu.height() < this.menu.attr('scrollHeight');
            },

            _activate: function(item) {
                this._deactivate();
                if (this._hasScroll()) {
                    var offset = item.offset().top - this.menu.offset().top,
                        scroll = this.menu.scrollTop(),
                        height = this.menu.height();
                    if (offset < 0) {
                        this.menu.scrollTop(scroll + offset);
                    } else if (offset > height) {
                        this.menu.scrollTop(scroll + offset - height + item.height());
                    }
                }
                this.active = item.eq(0)
                    .children('a')
                        .addClass('ui-state-hover')
                        .attr('id', 'ui-active-item')
                    .end();
            },

            _deactivate: function() {
                if (!this.active) {return;}
                this.active.children('a')
                    .removeClass('ui-state-hover')
                    .removeAttr('id');
                this.active = null;
            },

            _select: function(item) {
                // update fields value
                this.setTime($.fn.timepicker.parseTime( item.children('a').text() ));
                // close menu
                this.close();
            },

            _move: function(direction, edge) {
                if (this.closed) {
                    this.open();
                }
                if (!this.active) {
                    this._activate(this.menu.children(edge));
                    return;
                }
                var next = this.active[direction + 'All']('.ui-menu-item').eq(0);
                if (next.length) {
                    this._activate(next);
                } else {
                    this._activate(this.menu.children(edge));
                }
            },

            option: function(key, value) {
                if (arguments.length > 1) {
                    if (this.options.hasOwnProperty(key)) {
                        this.options[key] = value;
                    }
                    return this;
                }
                return this.options[key];
            },

            /**
             * _activate, _deactivate, first, last, next, previous, _move and
             * _hasScroll were extracted from jQuery UI Menu
             * http://github,com/jquery/jquery-ui/blob/menu/ui/jquery.ui.menu.js
             */

            next: function() {
                this._move('next', '.ui-menu-item:first');
            },

            previous: function() {
                this._move('prev', '.ui-menu-item:last');
            },

            first: function() {
                return this.active && !this.active.prevAll('.ui-menu-item').length;
            },

            last: function() {
                return this.active && !this.active.nextAll('.ui-menu-item').length;
            },

            selected: function() {
                return this.active ? this.active : null;
            },

            open: function() {
                var self = this;
                if (self.closed) {
                    // if a date is already selected, arrange the items in the list
                    // so the first item is cronologically right after the selected
                    // date.
                    if (self.selectedTime) {
                        self._populate(self.selectedTime);
                    }

                    var properties = self.element.offset();
                    properties.top = properties.top + self.element.outerHeight();
                    properties.width = self.element.innerWidth();
                    self.menu.css(properties);

                    self.menu.removeClass('ui-helper-hidden').addClass('ui-menu');
                    $('html').bind('focusin.timepicker click.timepicker', function(event) {
                        var target = $(event.target),
                            parent = target.closest('#' + self.menu.attr('id'));
                        // Do nothing if the target is within the timepicker,
                        // is the timepicker or is the associated input field.
                        if (parent.length > 0 || target.attr('id') === self.element.attr('id')) {
                            // pass
                        } else {
                            setTimeout(function() {
                                self.close();
                            }, 50);
                        }
                    });
                    self.closed = false;
                }
                // don't break chain
                return self.element;
            },

            close: function() {
                var self = this;
                if (!self.closed) {
                    self.menu.scrollTop(0).addClass('ui-helper-hidden').removeClass('ui-menu');
                    self.menu.children().removeClass('ui-state-hover');
                    $('html').unbind('.timepciker');
                    self.closed = true;
                }
                // don't break chain
                return self.element;
            },

            destroy: function() {
                return this.element.unbind('.timepicker').data('TimePicker', null);
            },

            getTime: function() {
                if (this.selectedTime) {
                    return this.selectedTime;
                }
                return null;
            },

            setTime: function(time) {
                var self = this;

                if (time && time.getMinutes) {
                    self.element.val($.fn.timepicker.formatTime(self.options.timeFormat, time));
                    self.selectedTime = time;
                    
                    if (self.options.change && $.isFunction(self.options.change)) {
                        self.options.change(time);
                    }
                }
            }
        };

        $.TimePicker.defaults =  {
            timeFormat: 'hh:mm p',
            minHour: null,
            minMinutes: null,
            minTime: null,
            maxHour: null,
            maxMinutes: null,
            maxTime: null,
            startHour: 7,
            startMinutes: 0,
            startTime: null,
            interval: 30,
            // callbacks
            change: function(time) {}
        };

        $.fn.timepicker = function(options) {
            // TODO: see if it works with previous versions
            if ($.fn.jquery < '1.4.1') {
                return this;
            }
            
            // Calling the constructor again returns a reference to a TimePicker object.
            if (this.data('TimePicker')) {
                return this.data('TimePicker');
            }
            
            var globals = $.extend({}, $.TimePicker.defaults, options);
            
            return this.each(function(){
                (new $.TimePicker(this, globals));
            });
        };
        
        /**
         * TODO: documentation
         */
        $.fn.timepicker.formatTime = function(format, time) {
            var hours = time.getHours(),
                hours12 = hours % 12,
                minutes = time.getMinutes(),
                seconds = time.getSeconds(),
                replacements = {
                    hh: pad((hours12 === 0 ? 12 : hours12).toString(), '0', 2),
                    HH: pad(hours.toString(), '0', 2),
                    mm: pad(minutes.toString(), '0', 2),
                    ss: pad(seconds.toString(), '0', 2),
                    h: (hours12 === 0 ? 12 : hours12),
                    H: hours,
                    m: minutes,
                    s: seconds,
                    p: hours > 11 ? 'PM' : 'AM'
                },
                str = format, k = '';
            for (k in replacements) {
                if (replacements.hasOwnProperty(k)) {
                    str = str.replace(new RegExp(k,'g'), replacements[k]);
                }
            }
            return str;
        };

        /**
         * Convert a string representing a given time into a Date object.
         *
         * The Date object will have attributes others than hours, minutes and
         * seconds set to current local time values. The function will return
         * false if given string can't be converted.
         *
         * If there is an 'a' in the string we set am to true, if there is a 'p'
         * we set pm to true, if both are present only am is setted to true.
         *
         * All non-digit characters are removed from the string before trying to
         * parse the time.
         *
         * ''       can't be converted and the function returns false.
         * '1'      is converted to     01:00:00 am
         * '11'     is converted to     11:00:00 am
         * '111'    is converted to     01:11:00 am
         * '1111'   is converted to     11:11:00 am
         * '11111'  is converted to     01:11:11 am
         * '111111' is converted to     11:11:11 am
         *
         * Only the first six (or less) characters are considered.
         *
         * Special case:
         *
         * When hours is greater than 24 and the last digit is less or equal than 6, and minutes
         * and seconds are less or equal than 60, we append a trailing zero and
         * start parsing process again. Examples:
         *
         * '95' is treated as '950' and converted to 09:50:00 am
         * '46' is treated as '460' and converted to 05:00:00 am
         * '57' can't be converted and the function returns false.
         *
         * For a detailed list of supported formats check the unit tests at
         * http://github.com/wvega/timepicker/tree/master/tests/
         */
        $.fn.timepicker.parseTime = (function() {
            var patterns = [
                    // 1, 12, 123, 1234, 12345, 123456
                    [/^(\d+)$/, '$1'],
                    // :1, :2, :3, :4 ... :9
                    [/^:(\d)$/, '$10'],
                    // :1, :12, :123, :1234 ...
                    [/^:(\d+)/, '$1'],
                    // 6:06, 5:59, 5:8
                    [/^(\d):([7-9])$/, '0$10$2'],
                    [/^(\d):(\d\d)$/, '$1$2'],
                    [/^(\d):(\d{1,})$/, '0$1$20'],
                    // 10:8, 10:10, 10:34
                    [/^(\d\d):([7-9])$/, '$10$2'],
                    [/^(\d\d):(\d)$/, '$1$20'],
                    [/^(\d\d):(\d*)$/, '$1$2'],
                    // 123:4, 1234:456
                    [/^(\d{3,}):(\d)$/, '$10$2'],
                    [/^(\d{3,}):(\d{2,})/, '$1$2'],
                    //
                    [/^(\d):(\d):(\d)$/, '0$10$20$3'],
                    [/^(\d{1,2}):(\d):(\d\d)/, '$10$2$3']];

            return function(str) {
                var time = new Date(),
                    am = false, pm = false, h = false, m = false, s = false, k = 0;
                str = str.toLowerCase();
                am = /a/.test(str);
                pm = am ? false : /p/.test(str);
                str = str.replace(/[^0-9:]/g, '').replace(/:+/g, ':');

                for (k in patterns) {
                    if (patterns[k][0].test(str)) {
                        str = str.replace(patterns[k][0], patterns[k][1]);
                        break;
                    }
                }
                str = str.replace(/:/g, '');

                if (str.length == 1) {
                    h = str;
                } else if (str.length == 2) {
                    h = str;
                } else if (str.length == 3 || str.length == 5) {
                    h = str.substr(0, 1);
                    m = str.substr(1, 2);
                    s = str.substr(3, 2);
                } else if (str.length == 4 || str.length > 5) {
                    h = str.substr(0, 2);
                    m = str.substr(2, 2);
                    s = str.substr(4, 2);
                }

                if (str.length > 0 && str.length < 5) {
                    if (str.length < 3) {
                        m = 0;
                    }
                    s = 0;
                }

                if (h === false || m === false || s === false) {
                    return false;
                }

                h = parseInt(h, 10);m = parseInt(m, 10);s = parseInt(s, 10);

                if (am && h == 12) {
                    h = 0;
                } else if (pm && h < 12) {
                    h = h + 12;
                }

                if (h > 24 && (h % 10) <= 6 && m <= 60 && s <= 60) {
                    return $.fn.timepicker.parseTime(str + '0' + (am ? 'a' : '') + (pm ? 'p' : ''));
                } else if (h <= 24 && m <= 60 && s <= 60) {
                    time.setHours(h, m, s);
                    return time;
                } else {
                    return false;
                }
            };
        })();
    })(jQuery);
}