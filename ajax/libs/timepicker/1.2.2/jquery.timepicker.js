// jQuery TimePicker plugin - http://github.com/wvega/timepicker
//
// A jQuery plugin to enhance standard form input fields helping users to select
// (or type) times.
//
// Copyright (c) 2011 Willington Vega <wvega@wvega.com>
// Dual licensed under the MIT or GPL Version 2 licenses.


// Define a cross-browser window.console.log method.
// For IE and FF without Firebug, fallback to using an alert.
//if (!window.console) {
//    var log = window.opera ? window.opera.postError : alert;
//    window.console = { log: function(str) { log(str) } };
//}

if(typeof jQuery != 'undefined') {
    (function($, undefined) {

        function pad(str, ch, length) {
            return Array(length + 1 - str.length).join(ch) + str;
        }

        function normalize() {
            if (arguments.length == 1) {
                var date = arguments[0];
                if (typeof date === 'string') {
                    date = $.fn.timepicker.parseTime(date);
                }
                return new Date(1988, 7, 24, date.getHours(), date.getMinutes(), date.getSeconds());
            } else if (arguments.length == 3) {
                return new Date(1988, 7, 24, arguments[0], arguments[1], arguments[2]);
            } else if (arguments.length == 2) {
                return new Date(1988, 7, 24, arguments[0], arguments[1], 0);
            } else {
                return new Date(1988, 7, 24);
            }
        }
        
        $.TimePicker = function() {
            var widget = this;

            widget.container = $('.ui-timepicker-container');
            widget.ui = widget.container.find('.ui-timepícker');

            if (widget.ui.length === 0) {
                widget.container = $('<div></div>').addClass('ui-timepicker-container')
                                    .addClass('ui-timepicker-hidden ui-helper-hidden')
                                    .appendTo('body')
                                    .hide();
                widget.ui = $('<ul></ul>').addClass('ui-timepicker')
                                    .addClass('ui-widget ui-widget-content ui-menu')
                                    .addClass('ui-corner-all')
                                    .appendTo(widget.container);

                if ($.fn.jquery >= '1.4.2') {
                    widget.ui.delegate('a', 'mouseenter.timepicker', function(event) {
                        // passing false instead of an instance object tells the function
                        // to use the current instance
                        widget.activate(false, $(this).parent());
                    }).delegate('a', 'mouseleave.timepicker', function(event) {
                        widget.deactivate(false);
                    }).delegate('a', 'click.timepicker', function(event) {
                        event.preventDefault();
                        widget.select(false, $(this).parent());
                    });
                }

                widget.ui.bind('click.timepicker, scroll.timepicker', function(event) {
                    clearTimeout(widget.closing);
                });
            }
        };

        $.TimePicker.count = 0;
        $.TimePicker.instance = function() {
            if (!$.TimePicker._instance) {
                $.TimePicker._instance = new $.TimePicker();
            }
            return $.TimePicker._instance;
        };

        $.TimePicker.prototype = {
            // extracted from from jQuery UI Core
            // http://github,com/jquery/jquery-ui/blob/master/ui/jquery.ui.core.js
            keyCode: {
                ALT: 18,
                BLOQ_MAYUS: 20,
                CTRL: 17,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ENTER: 108,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                RIGHT: 39,
                SHIFT: 16,
                TAB: 9,
                UP: 38
            },
            
            _items: function(i, startTime) {
                var widget = this, ul = $('<ul></ul>'), item = null, time, end;

                if (startTime) {
                    time = normalize(startTime);
                } else if (i.options.startTime) {
                    time = normalize(i.options.startTime);
                } else {
                    time = normalize(i.options.startHour, i.options.startMinutes);
                }
                
                end = new Date(time.getTime() + 24 * 60 * 60 * 1000);

                while(time < end) {
                    if (widget._isValidTime(i, time)) {
                        item = $('<li>').addClass('ui-menu-item').appendTo(ul);
                        $('<a>').addClass('ui-corner-all').text($.fn.timepicker.formatTime(i.options.timeFormat, time)).appendTo(item);
                        item.data('time-value', time);
                    }
                    time = new Date(time.getTime() + i.options.interval * 60 * 1000);
                }

                return ul.children();
            },
            
            _isValidTime: function(i, time) {
                var min = null, max = null;

                time = normalize(time);

                if (i.options.minTime !== null) {
                    min = normalize(i.options.minTime);
                } else if (i.options.minHour !== null || i.options.minMinutes !== null) {
                    min = normalize(i.options.minHour, i.options.minMinutes);
                }

                if (i.options.maxTime !== null) {
                    max = normalize(i.options.maxTime);
                } else if (i.options.maxHour !== null || i.options.maxMinutes !== null) {
                    max = normalize(i.options.maxHour, i.options.maxMinutes);
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

            _hasScroll: function() {
                // fix for jQuery 1.6 new prop method
                m = typeof this.ui.prop !== 'undefined' ? 'prop' : 'attr';
                return this.ui.height() < this.ui[m]('scrollHeight');
            },

            /**
             * TODO: Write me!
             *
             * @param i
             * @param direction
             * @param edge
             * */
            _move: function(i, direction, edge) {
                var widget = this;
                if (widget.closed()) {
                    widget.open(i);
                }
                if (!widget.active) {
                    widget.activate(i, widget.ui.children(edge));
                    return;
                }
                var next = widget.active[direction + 'All']('.ui-menu-item').eq(0);
                if (next.length) {
                    widget.activate(i, next);
                } else {
                    widget.activate(i, widget.ui.children(edge));
                }
            },

            //
            // protected methods
            //

            register: function(node, options) {
                var widget = this, i = {}; // timepicker instance object

                i.element = $(node);
                
                if (i.element.data('TimePicker')) { return; }

                i.element.data('TimePicker', i);
                // TODO: use $.fn.data()
                i.options = $.metadata ? $.extend({}, options, i.element.metadata()) : $.extend({}, options);
                i.widget = widget;
                i.selectedTime = $.fn.timepicker.parseTime(i.element.val());

                // proxy functions for the exposed api methods
                $.extend(i, {
                    next: function() {return widget.next(i);},
                    previous: function() {return widget.previous(i);},
                    first: function() {return widget.first(i);},
                    last: function() {return widget.last(i);},
                    selected: function() {return widget.selected(i);},
                    open: function() {return widget.open(i);},
                    close: function(force) {return widget.close(i, force);},
                    closed: function() {return widget.closed(i);},
                    destroy: function() {return widget.destroy(i);},

                    parse: function(str) {return widget.parse(i, str);},
                    format: function(time, format) { return widget.format(i, time, format); },
                    getTime: function() {return widget.getTime(i);},
                    setTime: function(time, silent) {return widget.setTime(i, time, silent); },
                    option: function(name, value) { return widget.option(i, name, value); }
                });

                i.element.bind('keydown.timepicker', function(event) {
                    switch (event.which || event.keyCode) {
                        case widget.keyCode.ENTER:
                        case widget.keyCode.NUMPAD_ENTER:
                            event.preventDefault();
                            if (widget.closed()) {
                                i.element.trigger('change.timepicker');
                            } else {
                                widget.select(i, widget.active);
                            }
                            break;
                        case widget.keyCode.UP:
                            i.previous();
                            break;
                        case widget.keyCode.DOWN:
                            i.next();
                            break;
                        default:
                            if (!widget.closed()) {
                                i.close(true);
                            }
                            break;
                    }
                }).bind('focus.timepicker', function(event) {
                    i.open();
                }).bind('blur.timepicker', function(event) {
                    i.close();
                }).bind('change.timepicker', function(event) {
                    if (i.closed()) {
                        i.setTime($.fn.timepicker.parseTime(i.element.val()));
                    }
                });
            },

            select: function(i, item) {
                var widget = this, instance = i === false ? widget.instance : i;
                clearTimeout(widget.closing);
                widget.setTime(instance, $.fn.timepicker.parseTime(item.children('a').text()));
                widget.close(instance, true);
            },

            activate: function(i, item) {
                var widget = this, instance = i === false ? widget.instance : i;
                
                if (instance !== widget.instance) {
                    return;
                } else {
                    widget.deactivate();
                }

                if (widget._hasScroll()) {
                    var offset = item.offset().top - widget.ui.offset().top,
                        scroll = widget.ui.scrollTop(),
                        height = widget.ui.height();
                    if (offset < 0) {
                        widget.ui.scrollTop(scroll + offset);
                    } else if (offset >= height) {
                        widget.ui.scrollTop(scroll + offset - height + item.height());
                    }
                }

                widget.active = item.eq(0).children('a').addClass('ui-state-hover')
                                                        .attr('id', 'ui-active-item')
                                          .end();
            },

            deactivate: function() {
                var widget = this;
                if (!widget.active) { return; }
                widget.active.children('a').removeClass('ui-state-hover').removeAttr('id');
                widget.active = null;
            },

            /**
             * _activate, _deactivate, first, last, next, previous, _move and
             * _hasScroll were extracted from jQuery UI Menu
             * http://github,com/jquery/jquery-ui/blob/menu/ui/jquery.ui.menu.js
             */

            //
            // public methods
            //

            next: function(i) {
                if (this.closed() || this.instance === i) {
                    this._move(i, 'next', '.ui-menu-item:first');
                }
            },

            previous: function(i) {
                if (this.closed() || this.instance === i) {
                    this._move(i, 'prev', '.ui-menu-item:last');
                }
            },

            first: function(i) {
                if (this.instance === i) {
                    return this.active && !this.active.prevAll('.ui-menu-item').length;
                }
                return false;
            },

            last: function(i) {
                if (this.instance === i) {
                    return this.active && !this.active.nextAll('.ui-menu-item').length;
                }
                return false;
            },

            selected: function(i) {
                if (this.instance === i)  {
                    return this.active ? this.active : null;
                }
                return null;
            },

            open: function(i) {
                var widget = this;

                // return if dropdown is disabled
                if (!i.options.dropdown) return i.element;

                // if a date is already selected and options.dynamic is true,
                // arrange the items in the list so the first item is
                // cronologically right after the selected date.
                // TODO: set selectedTime
                if (i.rebuild || !i.items || (i.options.dynamic && i.selectedTime)) {
                    i.items = widget._items(i);
                }

                // remove old li elements but keep associated events, then append
                // the new li elements to the ul
                if (i.rebuild || widget.instance !== i || (i.options.dynamic && i.selectedTime)) {

                    // handle menu events when using jQuery versions previous to
                    // 1.4.2 (thanks to Brian Link)
                    // http://github.com/wvega/timepicker/issues#issue/4
                    if ($.fn.jquery < '1.4.2') {
                        widget.ui.children().remove();
                        widget.ui.append(i.items);
                        widget.ui.find('a').bind('mouseover.timepicker', function(event) {
                            widget.activate(i, $(this).parent());
                        }).bind('mouseout.timepicker', function(event) {
                            widget.deactivate(i);
                        }).bind('click.timepicker', function(event) {
                            event.preventDefault();
                            widget.select(i, $(this).parent());
                        });
                    } else {
                        widget.ui.children().detach();
                        widget.ui.append(i.items);
                    }
                }

                i.rebuild = false;
                
                // theme
                widget.container.removeClass('ui-helper-hidden ui-timepicker-hidden ui-timepicker-standard ui-timepicker-corners').show();

                switch (i.options.theme) {
                    case 'standard':
                        widget.container.addClass('ui-timepicker-standard');
                        //widget.ui.addClass('ui-timepicker-standard');
                        break;
                    case 'standard-rounded-corners':
                        widget.container.addClass('ui-timepicker-standard ui-timepicker-corners');
                        //widget.ui.addClass('ui-timepicker-standard ui-timepicker-corners');
                        break;
                    default:
                        break;
                }

                /* resize ui */

                // we are hiding the scrollbar in the dropdown menu adding a 40px
                // padding to the UL element making the scrollbar appear in the
                // part of the UL that's hidden by the container (a DIV).
                //
                // In order to calculate the position, width and height for the UI
                // elements regardless of the CSS styles  that could have been
                // applied to them we need to substract the additional padding,
                // calculate the measuraments with the default styles and add the
                // padding at the end of the process.
                var paddingRight = parseInt(widget.ui.css('paddingRight'), 10),
                    decoration, zindex;
                if (widget.ui.hasClass('ui-no-scrollbar') && !i.options.scrollbar) {
                    widget.ui.css({ paddingRight: paddingRight - 40 });
                }

                decoration = (widget.ui.outerWidth() - widget.ui.width()) +
                             (widget.container.outerWidth() - widget.container.width());
                zindex = i.options.zindex ? i.options.zindex : i.element.offsetParent().css('z-index');

                // width + padding + border = input field's outer width
                widget.ui.css({ width: i.element.outerWidth() - decoration });
                widget.container.css($.extend(i.element.offset(), {
                    height: widget.ui.outerHeight(),
                    width: widget.ui.outerWidth(),
                    zIndex: zindex
                }));

                decoration = i.items.eq(0).outerWidth() - i.items.eq(0).width();
                i.items.css('width', widget.ui.width() - decoration);

                // here we add the padding again
                if (widget.ui.hasClass('ui-no-scrollbar') && !i.options.scrollbar) {
                    widget.ui.css({ paddingRight: paddingRight });
                } else if (!i.options.scrollbar) {
                    widget.ui.css({ paddingRight: paddingRight + 40 }).addClass('ui-no-scrollbar');
                }

                // position
                widget.container.css('top', parseInt(widget.container.css('top'), 10) + i.element.outerHeight());

                widget.instance = i;

                // try to match input field's current value with an item in the
                // dropdown
                if (i.selectedTime) {
                    i.items.each(function() {
                        var item = $(this), time;

                        if ($.fn.jquery < '1.4.2') {
                            time = $.fn.timepicker.parseTime(item.find('a').text());
                        } else {
                            time = item.data('time-value');
                        }

                        if (time.getTime() == i.selectedTime.getTime()) {
                            widget.activate(i, item);
                            return false;
                        }
                        return true;
                    });
                } else {
                    widget.deactivate(i);
                }

                // don't break the chain
                return i.element;
            },

            close: function(i, force) {
                var widget = this;
                if (widget.closed() || force) {
                    clearTimeout(widget.closing);
                    if (widget.instance === i) {
                        widget.container.addClass('ui-helper-hidden ui-timepicker-hidden').hide();
                        widget.ui.scrollTop(0);
                        widget.ui.children().removeClass('ui-state-hover');
                    }
                } else {
                    widget.closing = setTimeout(function() {
                        widget.close(i, true);
                    }, 150);
                }
                return i.element;
            },

            closed: function() {
                return this.ui.is(':hidden');
            },

            destroy: function(i) {
                var widget = this;
                widget.close(i, true);
                return i.element.unbind('.timepicker').data('TimePicker', null);
            },

            //

            parse: function(i, str) {
                return $.fn.timepicker.parseTime(str);
            },

            format: function(i, time, format) {
                format = format || i.options.timeFormat;
                return $.fn.timepicker.formatTime(format, time);
            },

            getTime: function(i) {
                return i.selectedTime ? i.selectedTime : null;
            },

            setTime: function(i, time, silent) {
                var widget = this;

                if (typeof time === 'string') {
                    time = i.parse(time);
                }

                if (time && time.getMinutes && widget._isValidTime(i, time)) {
                    time = normalize(time);
                    i.selectedTime = time;
                    i.element.val(i.format(time, i.options.timeFormat));

                    // TODO: add documentaion about setTime being chainable
                    if (silent) { return i; }

                    // custom change event and change callback
                    // TODO: add documentation about this event
                    i.element.trigger('time-change', [time]);
                    if ($.isFunction(i.options.change)) {
                        i.options.change.apply(i.element, [time]);
                    }
                } else {
                    i.selectedTime = null;
                }

                return i;
            },

            option: function(i, name, value) {
                if (typeof value === 'undefined') {
                    return i.options[name];
                }

                var widget = this, options = {};

                if (typeof name === 'string') {
                    options[name] = value;
                } else {
                    options = name;
                }

                // some options require rebuilding the dropdown items
                destructive = ['minHour', 'minMinutes', 'minTime',
                               'maxHour', 'maxMinutes', 'maxTime',
                               'startHour', 'startMinutes', 'startTime',
                               'timeFormat', 'interval', 'dropdown'];

                $.each(i.options, function(name, value) {
                    if (typeof options[name] !== 'undefined') {
                        i.options[name] = options[name];
                        if (!i.rebuild && $.inArray(name, destructive) > -1) {
                            i.rebuild = true;
                        }
                    }
                });

                if (i.rebuild) { i.setTime(i.getTime()); }
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
            startHour: null,
            startMinutes: null,
            startTime: null,
            interval: 30,
            dynamic: true,
            theme: 'standard',
            zindex: null,
            dropdown: true,
            scrollbar: false,
            // callbacks
            change: function(time) {}
        };

        $.fn.timepicker = function(options) {
            // TODO: see if it works with previous versions
            if ($.fn.jquery < '1.3') {
                return this;
            }
            
            // support calling API methods using the following syntax:
            //   $(...).timepicker('parse', '11p');
            if (typeof options === 'string') {
                var args = Array.prototype.slice.call(arguments, 1), result;

                // chainable API methods
                if (options === 'setTime' || (options === 'option' && arguments.length > 2)) {
                    method = 'each';
                // API methods that return a value
                } else {
                    method = 'map';
                }

                result = this[method](function() {
                    var element = $(this), i = element.data('TimePicker');
                    if (typeof i === 'object') {
                        return i[options].apply(i, args);
                    }
                });

                if (method === 'map' && this.length == 1) {
                    return $.makeArray(result).shift();
                } else if (method === 'map') {
                    return $.makeArray(result);
                } else {
                    return result;
                }
            }

            // calling the constructor again on a jQuery object with a single
            // element returns a reference to a TimePicker object.
            if (this.length == 1 && this.data('TimePicker')) {
                return this.data('TimePicker');
            }
            
            var globals = $.extend({}, $.TimePicker.defaults, options);
            
            return this.each(function() {
                $.TimePicker.instance().register(this, globals);
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
        $.fn.timepicker.parseTime = (function(str) {
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
                    [/^(\d{1,2}):(\d):(\d\d)/, '$10$2$3']],
                length = patterns.length;

            return function(str) {
                var time = normalize(new Date()),
                    am = false, pm = false, h = false, m = false, s = false;

                if (typeof str === 'undefined' || !str.toLowerCase) { return null; }

                str = str.toLowerCase();
                am = /a/.test(str);
                pm = am ? false : /p/.test(str);
                str = str.replace(/[^0-9:]/g, '').replace(/:+/g, ':');

                for (var k = 0; k < length; k++) {
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

                h = parseInt(h, 10); m = parseInt(m, 10); s = parseInt(s, 10);

                if (am && h == 12) {
                    h = 0;
                } else if (pm && h < 12) {
                    h = h + 12;
                }

                if (h > 24 && (h % 10) <= 6 && m <= 60 && s <= 60) {
                    if (str.length >= 6) {
                        return $.fn.timepicker.parseTime(str.substr(0,5));
                    } else {
                        return $.fn.timepicker.parseTime(str + '0' + (am ? 'a' : '') + (pm ? 'p' : ''));
                    }
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
