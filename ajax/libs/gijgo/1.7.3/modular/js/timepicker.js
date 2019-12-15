/*
 * Gijgo TimePicker v1.7.3
 * http://gijgo.com/timepicker
 *
 * Copyright 2014, 2017 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.timepicker = {
    plugins: {},
    messages: {
        'en-us': {
            am: 'AM',
            pm: 'PM'
        }
    }
};

gj.timepicker.config = {
    base: {

        /** The width of the timepicker.         */        width: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.         */        format: 'MM:HH',

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The initial timepicker value.         */        value: undefined,

        /** The language that needs to be in use.         */        locale: 'en-us',

        icons: {
            rightIcon: '<i class="gj-icon clock" />'
        },

        style: {
            wrapper: 'gj-timepicker gj-timepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            clock: 'gj-clock gj-clock-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-calendar gj-calendar-bootstrap'
        },
        iconsLibrary: 'glyphicons',
        showOtherMonths: true
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-calendar gj-calendar-bootstrap'
        },
        showOtherMonths: true
    }
};

gj.timepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'timepicker');
        this.attr('data-timepicker', 'true');
        gj.timepicker.methods.initialize(this);
        return this;
    },

    initialize: function ($timepicker) {
        var data = $timepicker.data(), $calendar,
            $wrapper = $timepicker.parent('div[role="wrapper"]'),
            $rightIcon = data.uiLibrary !== 'materialdesign' && data.iconsLibrary === 'materialicons' ? $('<span class="input-group-addon">' + data.icons.rightIcon + '</span>') : $(data.icons.rightIcon);

        $rightIcon.attr('role', 'right-icon');
        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $timepicker.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $timepicker.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $timepicker.val(data.value).addClass(data.style.input).attr('role', 'input');

        //data.fontSize && $timepicker.css('font-size', data.fontSize);

        $rightIcon.on('click', function (e) {
            var $clock = $('body').children('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');
            if ($clock.is(':visible')) {
                gj.timepicker.methods.hide($timepicker);
            } else {
                gj.timepicker.methods.show($timepicker);
            }
        });

        $timepicker.on('blur', function () {
            console.log('blur');
            $timepicker.timeout = setTimeout(function () {
                if (!$timepicker.mouseMove) {
                    gj.timepicker.methods.hide($timepicker);
                    console.log('blur-aftertimeout');
                }
            }, 500);
        });

        $wrapper.append($rightIcon);

        $calendar = gj.timepicker.methods.createClock($timepicker);

        if (data.keyboardNavigation) {
            $timepicker.on('keydown', gj.timepicker.methods.createKeyDownHandler($timepicker, $calendar));
        }
    },

    createClock: function ($timepicker) {
        var date, data = $timepicker.data(),
            $clock = $('<div role="clock" />').addClass(data.style.clock).attr('guid', $timepicker.attr('data-guid')),
            $body = $('<div role="body" />');
            $dial = $('<div role="dial"></div>');
        

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            $timepicker.attr('hours', date.getHours());
        }
        
        $dial.on('mousedown', gj.timepicker.methods.mouseDownHandler($timepicker, $clock));
        $dial.on('mousemove', gj.timepicker.methods.mouseMoveHandler($timepicker, $clock));
        $dial.on('mouseup', gj.timepicker.methods.mouseUpHandler($timepicker));

        $body.append($dial);
        $clock.append($body);
        $clock.hide();

        $('body').append($clock);
        return $clock;
    },

    mouseDownHandler: function ($timepicker, $clock) {
        return function (e) {
            var $arrow = $clock.find('[role="arrow"]');
            $timepicker.mouseMove = true;
            $arrow.show();
            console.log('mousedown');
        }
    },

    mouseMoveHandler: function ($timepicker, $clock) {
        return function (e) {
            var x, y, $dial, $arrow, offset, height;
            if ($timepicker.mouseMove) {
                $dial = $clock.find('[role="dial"]');
                $arrow = $clock.find('[role="arrow"]');
                offset = $dial.offset();
                height = $dial.height();
                x = $timepicker.mouseX(e) - offset.left;
                y = $timepicker.mouseY(e) - offset.top;
                //Math.round(((y / height) * 100) / 1.8)
                console.log('mousemove x=' + x + ' y=' + (((y / height) * 180) - 90));

                $arrow.css('transform', 'rotate(' + (((y / height) * 180) - 90) + 'deg);');
            }
        }
    },

    mouseUpHandler: function ($timepicker) {
        return function (e) {
            $timepicker.mouseMove = false;
            $timepicker.focus();
            clearTimeout($timepicker.timeout);
            console.log('mouseup');
        }
    },

    renderHours: function ($timepicker, $clock) {
        var $dial = $clock.find('[role="dial"]');

        clearTimeout($timepicker.timeout);
        $dial.empty();

        $dial.append('<div role="arrow" style="transform: rotate(60deg); display: none;"><div class="c296"></div><div class="c297"></div></div>');

        $dial.append('<span class="c291" style="transform: translate(54px, -93.5307px);">1</span>');
        $dial.append('<span class="c291" style="transform: translate(93.5307px, -54px);">2</span>');
        $dial.append('<span class="c291" style="transform: translate(108px, 0px);">3</span>');
        $dial.append('<span class="c291" style="transform: translate(93.5307px, 54px);">4</span>');
        $dial.append('<span class="c291" style="transform: translate(54px, 93.5307px);">5</span>');
        $dial.append('<span class="c291" style="transform: translate(6.61309e-15px, 108px);">6</span>');
        $dial.append('<span class="c291" style="transform: translate(-54px, 93.5307px);">7</span>');
        $dial.append('<span class="c291" style="transform: translate(-93.5307px, 54px);">8</span>');
        $dial.append('<span class="c291" style="transform: translate(-108px, 1.32262e-14px);">9</span>');
        $dial.append('<span class="c291" style="transform: translate(-93.5307px, -54px);">10</span>');
        $dial.append('<span class="c291" style="transform: translate(-54px, -93.5307px);">11</span>');
        $dial.append('<span class="c291" style="transform: translate(-1.98393e-14px, -108px);">12</span>');
        $dial.append('<span class="c291 c292" style="transform: translate(38px, -65.8179px);">13</span>');
        $dial.append('<span class="c291 c292" style="transform: translate(65.8179px, -38px);">14</span>');
        $dial.append('<span class="c291 c292" style="transform: translate(76px, 0px);">15</span>');
        $dial.append('<span class="c291 c292" style="transform: translate(65.8179px, 38px);">16</span>');
        $dial.append('<span class="c291 c292 selected" style="transform: translate(38px, 65.8179px);">17</span>');
        $dial.append('<span class="c291 c292" style="transform: translate(4.65366e-15px, 76px);">18</span>');
        $dial.append('<span class="c291 c292" style="transform: translate(-38px, 65.8179px);">19</span>');
        $dial.append('<span class="c291 c292" style="transform: translate(-65.8179px, 38px);">20</span>');
        $dial.append('<span class="c291 c292" style="transform: translate(-76px, 9.30732e-15px);">21</span>');
        $dial.append('<span class="c291 c292" style="transform: translate(-65.8179px, -38px);">22</span>');
        $dial.append('<span class="c291 c292" style="transform: translate(-38px, -65.8179px);">23</span>');
        $dial.append('<span class="c291 c292" style="transform: translate(-1.3961e-14px, -76px);">00</span>');
    },

    select: function ($timepicker, $calendar, date) {
        return function (e) {
            return $timepicker;
        };
    },

    show: function ($timepicker) {
        var data = $timepicker.data(),
            offset = $timepicker.offset(),
            $clock = $('body').children('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');

        gj.timepicker.methods.renderHours($timepicker, $clock);
        $clock.css('left', offset.left).css('top', offset.top + $timepicker.outerHeight(true) + 3);
        $clock.show();
        $timepicker.focus();
        gj.timepicker.events.show($timepicker);
    },

    hide: function ($timepicker) {
        var $clock = $('body').children('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');
        $clock.hide();
        gj.timepicker.events.hide($timepicker);
    },

    value: function ($timepicker, value) {
        var $clock, time, data = $timepicker.data();
        if (typeof (value) === "undefined") {
            return $timepicker.val();
        } else {
            time = gj.core.parseDate(value, data.format, data.locale);
            if (time) {
                $clock = $('body').children('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');
                gj.timepicker.methods.select($timepicker, $clock, time)();
            } else {
                $timepicker.val('');
            }
            return $timepicker;
        }
    },

    destroy: function ($timepicker) {
        var data = $timepicker.data(),
            $parent = $timepicker.parent();
        if (data) {
            $timepicker.off();
            $('body').children('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]').remove();
            $timepicker.removeData();
            $timepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-timepicker');
            $timepicker.removeClass();
            $parent.children('[role="right-icon"]').remove();
            $timepicker.unwrap();
        }
        return $timepicker;
    }
};

gj.timepicker.events = {
    /**
     * Triggered when the timepicker value is changed.
     *     */    change: function ($timepicker) {
        return $timepicker.triggerHandler('change');
    },

    /**
     * Event fires when the timepicker is opened.     */    show: function ($timepicker) {
        return $timepicker.triggerHandler('show');
    },

    /**
     * Event fires when the timepicker is closed.     */    hide: function ($timepicker) {
        return $timepicker.triggerHandler('hide');
    }
};

gj.timepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.timepicker.methods;

    /** Gets or sets the value of the timepicker.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove timepicker functionality from the element.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Show the calendar.     */    self.show = function () {
        gj.timepicker.methods.show(this);
    };

    /** Hide the calendar.     */    self.hide = function () {
        gj.timepicker.methods.hide(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-timepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.timepicker.widget.prototype = new gj.widget();
gj.timepicker.widget.constructor = gj.timepicker.widget;

(function ($) {
    $.fn.timepicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.timepicker.widget(this, method);
            } else {
                $widget = new gj.timepicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
