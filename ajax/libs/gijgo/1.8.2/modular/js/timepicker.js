/*
 * Gijgo TimePicker v1.8.2
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
            pm: 'PM',
            ok: 'Ok',
            cancel: 'Cancel'
        }
    }
};

gj.timepicker.config = {
    base: {

        /** The width of the timepicker.         */        width: undefined,

        /** If set to true, the timepicker will have modal behavior.         */        modal: true,

        /** If set to true, add header to the timepicker.         */        header: true,

        /** If set to true, add footer with ok and cancel buttons to the timepicker.         */        footer: true,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.         */        format: 'HH:MM',

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The initial timepicker value.         */        value: undefined,

        /** The timepicker mode. Tells the component to display the picker in ampm (12hr) format or 24hr format.         */        mode: 'ampm',

        /** The language that needs to be in use.         */        locale: 'en-us',

        icons: {
            rightIcon: '<i class="gj-icon clock" />'
        },

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-timepicker gj-timepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            clock: 'gj-clock gj-clock-md',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            clock: 'gj-clock gj-clock-bootstrap',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            clock: 'gj-clock gj-clock-bootstrap',
            footer: 'modal-footer',
            button: 'btn btn-default'
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
        var data = $timepicker.data(), $calendar, $rightIcon, $wrapper = $timepicker.parent('div[role="wrapper"]');

        if (data.uiLibrary === 'bootstrap') {
            $rightIcon = $('<span class="input-group-addon">' + data.icons.rightIcon + '</span>');
        } else if (data.uiLibrary === 'bootstrap4') {
            $rightIcon = $('<span class="input-group-append"><span class="input-group-text">' + data.icons.rightIcon + '</span></span>');
        } else {
            $rightIcon = $(data.icons.rightIcon);
        }

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
            var $clock = $('body').find('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');
            if ($clock.is(':visible')) {
                gj.timepicker.methods.close($timepicker);
            } else {
                gj.timepicker.methods.open($timepicker);
            }
        });

        if (data.footer === false) {
            $timepicker.on('blur', function () {
                $timepicker.timeout = setTimeout(function () {
                    if (!$timepicker.mouseMove) {
                        gj.timepicker.methods.close($timepicker);
                    }
                }, 500);
            });
        }

        $wrapper.append($rightIcon);

        $calendar = gj.timepicker.methods.createClock($timepicker);

        if (data.keyboardNavigation) {
            $timepicker.on('keydown', gj.timepicker.methods.createKeyDownHandler($timepicker, $calendar));
        }
    },

    createClock: function ($timepicker) {
        var date, data = $timepicker.data(),
            $clock = $('<div role="clock" />').addClass(data.style.clock).attr('guid', $timepicker.attr('data-guid')),
            $hour = $('<div role="hour" />'),
            $minute = $('<div role="minute" />'),
            $header = $('<div role="header" />'),
            $mode = $('<div role="mode" />'),
            $body = $('<div role="body" />'),
            $dial = $('<div role="dial"></div>'),
            $btnOk = $('<button class="' + data.style.button + '">' + gj.timepicker.messages[data.locale].ok + '</button>'),
            $btnCancel = $('<button class="' + data.style.button + '">' + gj.timepicker.messages[data.locale].cancel + '</button>'),
            $footer = $('<div role="footer" class="' + data.style.footer + '" />');

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            $timepicker.attr('hours', date.getHours());
        }
        
        $dial.on('mousedown', gj.timepicker.methods.mouseDownHandler($timepicker, $clock));
        $dial.on('mousemove', gj.timepicker.methods.mouseMoveHandler($timepicker, $clock));
        $dial.on('mouseup', gj.timepicker.methods.mouseUpHandler($timepicker, $clock));

        if (data.header) {
            $hour.on('click', function () {
                gj.timepicker.methods.renderHours($timepicker, $clock);
            });
            $minute.on('click', function () {
                gj.timepicker.methods.renderMinutes($timepicker, $clock);
            });
            $header.append($hour).append(':').append($minute);
            if (data.mode === 'ampm') {
                $mode.append($('<span role="am">' + gj.timepicker.messages[data.locale].am + '</span>').on('click', function () {
                    var hour = gj.timepicker.methods.getHour($clock);
                    $clock.attr('mode', 'am');
                    $(this).addClass('selected');
                    $(this).parent().children('[role="pm"]').removeClass('selected');
                    if (hour >= 12) {
                        $clock.attr('hour', hour - 12);
                    }
                    if (!data.modal) {
                        clearTimeout($timepicker.timeout);
                        $timepicker.focus();
                    }
                }));
                $mode.append('<br />');
                $mode.append($('<span role="pm">' + gj.timepicker.messages[data.locale].pm + '</span>').on('click', function () {
                    var hour = gj.timepicker.methods.getHour($clock);
                    $clock.attr('mode', 'pm');
                    $(this).addClass('selected');
                    $(this).parent().children('[role="am"]').removeClass('selected');
                    if (hour < 12) {
                        $clock.attr('hour', hour + 12);
                    }
                    if (!data.modal) {
                        clearTimeout($timepicker.timeout);
                        $timepicker.focus();
                    }
                }));
                $header.append($mode);
            }
            $clock.append($header);
        }

        $body.append($dial);
        $clock.append($body);

        if (data.footer) {
            $btnCancel.on('click', function () { $timepicker.close(); });
            $footer.append($btnCancel);
            $btnOk.on('click', gj.timepicker.methods.setTime($timepicker, $clock));
            $footer.append($btnOk);
            $clock.append($footer);
        }

        $clock.hide();

        $('body').append($clock);

        if (data.modal) {
            $clock.wrapAll('<div role="modal" class="' + data.style.modal + '"/>');
            gj.core.center($clock);
        }
        return $clock;
    },

    getHour: function ($clock) {
        return parseInt($clock.attr('hour'), 10) || 0;
    },

    getMinute: function ($clock) {
        return parseInt($clock.attr('minute'), 10) || 0;
    },

    setTime: function ($timepicker, $clock) {
        return function () {
            var hour = gj.timepicker.methods.getHour($clock),
                minute = gj.timepicker.methods.getMinute($clock),
                mode = $clock.attr('mode'),
                date = new Date(0, 0, 0, (hour === 12 && mode === 'am' ? 0 : hour), minute),
                data = $timepicker.data(),
                value = gj.core.formatDate(date, data.format, data.locale);
            $timepicker.value(value);
            $timepicker.close();
        }
    },

    getPointerValue: function (x, y, mode) {
        var value, radius, size = 256,
            angle = Math.atan2(size / 2 - x, size / 2 - y) / Math.PI * 180;

        if (angle < 0) {
            angle = 360 + angle;
        }

        switch (mode) {
            case 'ampm': {
                value = 12 - Math.round(angle * 12 / 360);
                return value === 0 ? 12 : value;
            }
            case '24hr': {
                radius = Math.sqrt(Math.pow(size / 2 - x, 2) + Math.pow(size / 2 - y, 2));
                value = 12 - Math.round(angle * 12 / 360);
                if (value === 0) {
                    value = 12;
                }
                if (radius < size / 2 - 32) {
                    value = value === 12 ? 0 : value + 12;
                }
                return value;
            }
            case 'minutes': {
                value = Math.round(60 - 60 * angle / 360);
                return value === 60 ? 0 : value;
            }
        }
    },

    updateArrow: function(e, $timepicker, $clock) {
        var mouseX, mouseY, rect, value, data = $timepicker.data();
        mouseX = $timepicker.mouseX(e);
        mouseY = $timepicker.mouseY(e);

        rect = e.target.getBoundingClientRect();
        if (data.dialMode == 'hours') {
            value = gj.timepicker.methods.getPointerValue(mouseX - rect.left, mouseY - rect.top, data.mode);
            $clock.attr('hour', data.mode === 'ampm' && $clock.attr('mode') === 'pm' && value < 12 ? value + 12 : value);
        } else if (data.dialMode == 'minutes') {
            value = gj.timepicker.methods.getPointerValue(mouseX - rect.left, mouseY - rect.top, 'minutes');
            $clock.attr('minute', value);
        }

        if (data.dialMode == 'hours') {
            setTimeout(function () {
                gj.timepicker.methods.renderMinutes($timepicker, $clock);
            }, 1000);
        } else if (data.dialMode == 'minutes' && $timepicker.data().footer == false) {
            gj.timepicker.methods.setTime($timepicker, $clock)();
        }

        gj.timepicker.methods.select($timepicker, $clock);
    },

    select: function ($timepicker, $clock) {
        var $dial = $clock.find('[role="dial"]'),
            $arrow = $clock.find('[role="arrow"]'),
            data = $timepicker.data(),
            hour = gj.timepicker.methods.getHour($clock),
            minute = gj.timepicker.methods.getMinute($clock);

        if (data.dialMode == 'hours' && (hour == 0 || hour > 12) && data.mode === '24hr') {
            $arrow.css('width', 'calc(50% - 52px)');
        } else {
            $arrow.css('width', 'calc(50% - 20px)');
        }

        if (data.dialMode == 'hours') {
            $arrow.css('transform', 'rotate(' + ((hour * 30) - 90).toString() + 'deg)');
        } else {
            $arrow.css('transform', 'rotate(' + ((minute * 6) - 90).toString() + 'deg)');
        }
        $arrow.show();

        gj.timepicker.methods.update($timepicker, $clock);
    },

    update: function ($timepicker, $clock) {
        var data = $timepicker.data(),
            hour = gj.timepicker.methods.getHour($clock),
            visualHour = (data.mode === 'ampm' && hour > 12 ? hour - 12 : (hour == 0 ? 12 : hour)),
            minute = gj.timepicker.methods.getMinute($clock),
            $header = $clock.find('[role="header"]'),
            $numbers = $clock.find('[role="dial"] span');

        $header.children('[role="hour"]').text(visualHour);
        $header.children('[role="minute"]').text(gj.core.pad(minute));
        $numbers.removeClass('selected');
        $numbers.filter(function (e) {
            if (data.dialMode == 'hours') {
                return parseInt($(this).text(), 10) == visualHour;
            } else {
                return parseInt($(this).text(), 10) == minute;
            }
        }).addClass('selected');
        if (data.mode === 'ampm') {
            if (hour >= 12) {
                $header.find('[role="pm"]').addClass('selected');
                $header.find('[role="am"]').removeClass('selected');
            } else {
                $header.find('[role="am"]').addClass('selected');
                $header.find('[role="pm"]').removeClass('selected');
            }
        }        
    },

    mouseDownHandler: function ($timepicker, $clock) {
        return function (e) {
            $timepicker.mouseMove = true;
        }
    },

    mouseMoveHandler: function ($timepicker, $clock) {
        return function (e) {
            if ($timepicker.mouseMove) {
                gj.timepicker.methods.updateArrow(e, $timepicker, $clock);
            }
        }
    },

    mouseUpHandler: function ($timepicker, $clock) {
        return function (e) {
            gj.timepicker.methods.updateArrow(e, $timepicker, $clock);
            $timepicker.mouseMove = false;
            if (!$timepicker.data().modal) {
                clearTimeout($timepicker.timeout);
                $timepicker.focus();
            }
        }
    },

    renderHours: function ($timepicker, $clock) {
        var $dial = $clock.find('[role="dial"]');

        clearTimeout($timepicker.timeout);
        $dial.empty();

        $dial.append('<div role="arrow" style="transform: rotate(-90deg); display: none;"><div class="arrow-begin"></div><div class="arrow-end"></div></div>');

        $dial.append('<span role="hour" style="transform: translate(54px, -93.5307px);">1</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, -54px);">2</span>');
        $dial.append('<span role="hour" style="transform: translate(108px, 0px);">3</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, 54px);">4</span>');
        $dial.append('<span role="hour" style="transform: translate(54px, 93.5307px);">5</span>');
        $dial.append('<span role="hour" style="transform: translate(6.61309e-15px, 108px);">6</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, 93.5307px);">7</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, 54px);">8</span>');
        $dial.append('<span role="hour" style="transform: translate(-108px, 1.32262e-14px);">9</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, -54px);">10</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, -93.5307px);">11</span>');
        $dial.append('<span role="hour" style="transform: translate(-1.98393e-14px, -108px);">12</span>');
        if ($timepicker.data('mode') === '24hr') {
            $dial.append('<span role="hour" style="transform: translate(38px, -65.8179px);">13</span>');
            $dial.append('<span role="hour" style="transform: translate(65.8179px, -38px);">14</span>');
            $dial.append('<span role="hour" style="transform: translate(76px, 0px);">15</span>');
            $dial.append('<span role="hour" style="transform: translate(65.8179px, 38px);">16</span>');
            $dial.append('<span role="hour" style="transform: translate(38px, 65.8179px);">17</span>');
            $dial.append('<span role="hour" style="transform: translate(4.65366e-15px, 76px);">18</span>');
            $dial.append('<span role="hour" style="transform: translate(-38px, 65.8179px);">19</span>');
            $dial.append('<span role="hour" style="transform: translate(-65.8179px, 38px);">20</span>');
            $dial.append('<span role="hour" style="transform: translate(-76px, 9.30732e-15px);">21</span>');
            $dial.append('<span role="hour" style="transform: translate(-65.8179px, -38px);">22</span>');
            $dial.append('<span role="hour" style="transform: translate(-38px, -65.8179px);">23</span>');
            $dial.append('<span role="hour" style="transform: translate(-1.3961e-14px, -76px);">00</span>');
        }

        $clock.find('[role="header"] [role="hour"]').addClass('selected');
        $clock.find('[role="header"] [role="minute"]').removeClass('selected');

        $timepicker.data('dialMode', 'hours');

        gj.timepicker.methods.select($timepicker, $clock);
    },

    renderMinutes: function ($timepicker, $clock) {
        var $dial = $clock.find('[role="dial"]');

        clearTimeout($timepicker.timeout);
        $dial.empty();

        $dial.append('<div role="arrow" style="transform: rotate(-90deg); display: none;"><div class="arrow-begin"></div><div class="arrow-end"></div></div>');

        $dial.append('<span role="hour" style="transform: translate(54px, -93.5307px);">5</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, -54px);">10</span>');
        $dial.append('<span role="hour" style="transform: translate(108px, 0px);">15</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, 54px);">20</span>');
        $dial.append('<span role="hour" style="transform: translate(54px, 93.5307px);">25</span>');
        $dial.append('<span role="hour" style="transform: translate(6.61309e-15px, 108px);">30</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, 93.5307px);">35</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, 54px);">40</span>');
        $dial.append('<span role="hour" style="transform: translate(-108px, 1.32262e-14px);">45</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, -54px);">50</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, -93.5307px);">55</span>');
        $dial.append('<span role="hour" style="transform: translate(-1.98393e-14px, -108px);">00</span>');

        $clock.find('[role="header"] [role="hour"]').removeClass('selected');
        $clock.find('[role="header"] [role="minute"]').addClass('selected');
        
        $timepicker.data('dialMode', 'minutes');

        gj.timepicker.methods.select($timepicker, $clock);
    },

    open: function ($timepicker) {
        var time, hour, offset, data = $timepicker.data(),
            $clock = $('body').find('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');

        if ($timepicker.value()) {
            time = gj.core.parseDate($timepicker.value(), data.format, data.locale);
        } else {
            time = new Date();
        }
        hour = time.getHours();
        if (data.mode === 'ampm') {
            $clock.attr('mode', hour > 12 ? 'pm' : 'am');
        }
        $clock.attr('hour', hour);
        $clock.attr('minute', time.getMinutes());

        gj.timepicker.methods.renderHours($timepicker, $clock);
        $clock.show();
        $clock.closest('div[role="modal"]').show();
        if (data.modal) {
            gj.core.center($clock);
        } else {
            offset = $timepicker.offset();
            $clock.css('left', offset.left).css('top', offset.top + $timepicker.outerHeight(true) + 3);
            $timepicker.focus();
        }
        gj.timepicker.events.open($timepicker);
    },

    close: function ($timepicker) {
        var $clock = $('body').find('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');
        $clock.hide();
        $clock.closest('div[role="modal"]').hide();
        gj.timepicker.events.close($timepicker);
    },

    value: function ($timepicker, value) {
        var $clock, time, data = $timepicker.data();
        if (typeof (value) === "undefined") {
            return $timepicker.val();
        } else {
            $timepicker.val(value);
            gj.timepicker.events.change($timepicker);
            return $timepicker;
        }
    },

    destroy: function ($timepicker) {
        var data = $timepicker.data(),
            $parent = $timepicker.parent(),
            $clock = $('body').find('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');
        if (data) {
            $timepicker.off();
            if ($clock.parent('[role="modal"]').length > 0) {
                $clock.unwrap();
            }
            $clock.remove();
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
     * Event fires when the timepicker is opened.     */    open: function ($timepicker) {
        return $timepicker.triggerHandler('open');
    },

    /**
     * Event fires when the timepicker is closed.     */    close: function ($timepicker) {
        return $timepicker.triggerHandler('close');
    }
};

gj.timepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.timepicker.methods;

    self.mouseMove = false;

    /** Gets or sets the value of the timepicker.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove timepicker functionality from the element.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Open the clock.     */    self.open = function () {
        gj.timepicker.methods.open(this);
    };

    /** Close the clock.     */    self.close = function () {
        gj.timepicker.methods.close(this);
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
gj.timepicker.messages['bg-bg'] = {
    am: 'AM',
    pm: 'PM',
    ok: 'ОК',
    cancel: 'Отказ'
};
gj.timepicker.messages['fr-fr'] = {
    am: 'AM',
    pm: 'PM',
    ok: 'OK',
    cancel: 'Annuler'
};
gj.timepicker.messages['de-de'] = {
    am: 'AM',
    pm: 'PM',
    ok: 'OK',
    cancel: 'Abbrechen'
};
gj.timepicker.messages['pt-br'] = {
    am: 'AM',
    pm: 'PM',
    ok: 'OK',
    cancel: 'Cancelar'
};
gj.timepicker.messages['ru-ru'] = {
    am: 'AM',
    pm: 'PM',
    ok: 'ОК',
    cancel: 'Отмена'
};
