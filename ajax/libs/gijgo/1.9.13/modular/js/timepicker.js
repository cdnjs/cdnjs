/*
 * Gijgo TimePicker v1.9.13
 * http://gijgo.com/timepicker
 *
 * Copyright 2014, 2019 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.timepicker = {
    plugins: {}
};

gj.timepicker.config = {
    base: {

        /** The width of the timepicker.         */        width: undefined,

        /** If set to true, the timepicker will have modal behavior.         */        modal: true,

        /** If set to true, add header to the timepicker.         */        header: true,

        /** If set to true, add footer with ok and cancel buttons to the timepicker.         */        footer: true,

        /** Specifies the format, which is used to format the value of the timepicker displayed in the input.         */        format: 'HH:MM',

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The initial timepicker value.         */        value: undefined,

        /** The timepicker mode. Tells the component to display the picker in ampm (12hr) format or 24hr format.         */        mode: 'ampm',

        /** The language that needs to be in use.         */        locale: 'en-us',

        /** The size of the timepicker input.         */        size: 'default',

        icons: {
            rightIcon: '<i class="gj-icon clock" />'
        },

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-timepicker gj-timepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            clock: 'gj-picker gj-picker-md timepicker',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            clock: 'gj-picker gj-picker-bootstrap timepicker',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control border',
            clock: 'gj-picker gj-picker-bootstrap timepicker',
            footer: 'modal-footer',
            button: 'btn btn-default'
        }
    }
};

gj.timepicker.methods = {
    init: function (jsConfig) {
        gj.picker.widget.prototype.init.call(this, jsConfig, 'timepicker');
        return this;
    },

    initialize: function () {

    },

    initMouse: function ($body, $input, $picker, data) {
        $body.off();
        $body.on('mousedown', gj.timepicker.methods.mouseDownHandler($input, $picker));
        $body.on('mousemove', gj.timepicker.methods.mouseMoveHandler($input, $picker, data));
        $body.on('mouseup', gj.timepicker.methods.mouseUpHandler($input, $picker, data));
    },

    createPicker: function ($timepicker) {
        var date, data = $timepicker.data(),
            $clock = $('<div role="picker" />').addClass(data.style.clock).attr('guid', $timepicker.attr('data-guid')),
            $hour = $('<div role="hour" />'),
            $minute = $('<div role="minute" />'),
            $header = $('<div role="header" />'),
            $mode = $('<div role="mode" />'),
            $body = $('<div role="body" />'),
            $btnOk = $('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].ok + '</button>'),
            $btnCancel = $('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].cancel + '</button>'),
            $footer = $('<div role="footer" class="' + data.style.footer + '" />');

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            $timepicker.attr('hours', date.getHours());
        }

        gj.timepicker.methods.initMouse($body, $timepicker, $clock, data);

        if (data.header) {
            $hour.on('click', function () {
                gj.timepicker.methods.renderHours($timepicker, $clock, data);
            });
            $minute.on('click', function () {
                gj.timepicker.methods.renderMinutes($timepicker, $clock, data);
            });
            $header.append($hour).append(':').append($minute);
            if (data.mode === 'ampm') {
                $mode.append($('<span role="am">' + gj.core.messages[data.locale].am + '</span>').on('click', function () {
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
                $mode.append($('<span role="pm">' + gj.core.messages[data.locale].pm + '</span>').on('click', function () {
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

    updateArrow: function(e, $timepicker, $clock, data) {
        var rect, value,
            mouseX = $timepicker.mouseX(e),
            mouseY = $timepicker.mouseY(e),
            scrollY = window.scrollY || window.pageYOffset || 0,
            scrollX = window.scrollX || window.pageXOffset || 0;

        rect = e.target.getBoundingClientRect();
        if (data.dialMode == 'hours') {
            value = gj.timepicker.methods.getPointerValue(mouseX - scrollX - rect.left, mouseY - scrollY - rect.top, data.mode);
            $clock.attr('hour', data.mode === 'ampm' && $clock.attr('mode') === 'pm' && value < 12 ? value + 12 : value);
        } else if (data.dialMode == 'minutes') {
            value = gj.timepicker.methods.getPointerValue(mouseX - scrollX - rect.left, mouseY - scrollY - rect.top, 'minutes');
            $clock.attr('minute', value);
        }

        gj.timepicker.methods.update($timepicker, $clock, data);
    },

    update: function ($timepicker, $clock, data) {
        var hour, minute, $arrow, visualHour, $header, $numbers;

        // update the arrow
        hour = gj.timepicker.methods.getHour($clock);
        minute = gj.timepicker.methods.getMinute($clock);
        $arrow = $clock.find('[role="arrow"]');
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

        // update the numbers
        visualHour = (data.mode === 'ampm' && hour > 12 ? hour - 12 : (hour == 0 ? 12 : hour));
        $numbers = $clock.find('[role="body"] span');
        $numbers.removeClass('selected');
        $numbers.filter(function (e) {
            if (data.dialMode == 'hours') {
                return parseInt($(this).text(), 10) == visualHour;
            } else {
                return parseInt($(this).text(), 10) == minute;
            }
        }).addClass('selected');

        // update the header
        if (data.header) {
            $header = $clock.find('[role="header"]');
            $header.find('[role="hour"]').text(visualHour);
            $header.find('[role="minute"]').text(gj.core.pad(minute));
            if (data.mode === 'ampm') {
                if (hour >= 12) {
                    $header.find('[role="pm"]').addClass('selected');
                    $header.find('[role="am"]').removeClass('selected');
                } else {
                    $header.find('[role="am"]').addClass('selected');
                    $header.find('[role="pm"]').removeClass('selected');
                }
            }
        }
    },

    mouseDownHandler: function ($timepicker, $clock) {
        return function (e) {
            $timepicker.mouseMove = true;
        }
    },

    mouseMoveHandler: function ($timepicker, $clock, data) {
        return function (e) {
            if ($timepicker.mouseMove) {
                gj.timepicker.methods.updateArrow(e, $timepicker, $clock, data);
            }
        }
    },

    mouseUpHandler: function ($timepicker, $clock, data) {
        return function (e) {
            gj.timepicker.methods.updateArrow(e, $timepicker, $clock, data);
            $timepicker.mouseMove = false;
            if (!data.modal) {
                clearTimeout($timepicker.timeout);
                $timepicker.focus();
            }
            if (data.dialMode == 'hours') {
                setTimeout(function () {
                    gj.timepicker.events.select($timepicker, 'hour');
                    gj.timepicker.methods.renderMinutes($timepicker, $clock, data);
                }, 1000);
            } else if (data.dialMode == 'minutes') {
                if (data.footer !== true && data.autoClose !== false) {
                    gj.timepicker.methods.setTime($timepicker, $clock)();
                }
                gj.timepicker.events.select($timepicker, 'minute');
            }
        }
    },

    renderHours: function ($timepicker, $clock, data) {
        var $dial, $body = $clock.find('[role="body"]');

        clearTimeout($timepicker.timeout);
        $body.empty();
        $dial = $('<div role="dial"></div>');

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
        if (data.mode === '24hr') {
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
        $body.append($dial);

        $clock.find('[role="header"] [role="hour"]').addClass('selected');
        $clock.find('[role="header"] [role="minute"]').removeClass('selected');

        data.dialMode = 'hours';

        gj.timepicker.methods.update($timepicker, $clock, data);
    },

    renderMinutes: function ($timepicker, $clock, data) {
        var $body = $clock.find('[role="body"]');

        clearTimeout($timepicker.timeout);
        $body.empty();
        $dial = $('<div role="dial"></div>');

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
        $body.append($dial);

        $clock.find('[role="header"] [role="hour"]').removeClass('selected');
        $clock.find('[role="header"] [role="minute"]').addClass('selected');
        
        data.dialMode = 'minutes';

        gj.timepicker.methods.update($timepicker, $clock, data);
    },

    open: function ($timepicker) {
        var time, hour, data = $timepicker.data(),
            $clock = $('body').find('[role="picker"][guid="' + $timepicker.attr('data-guid') + '"]');

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

        gj.timepicker.methods.renderHours($timepicker, $clock, data);

        gj.picker.widget.prototype.open.call($timepicker, 'timepicker');
        return $timepicker;
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
    }
};

gj.timepicker.events = {
    /**
     * Triggered when the timepicker value is changed.
     *     */    change: function ($timepicker) {
        return $timepicker.triggerHandler('change');
    },

    /**
     * Triggered when new value is selected inside the picker.
     *     */    select: function ($timepicker, type) {
        return $timepicker.triggerHandler('select', [type]);
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
        return gj.picker.widget.prototype.destroy.call(this, 'timepicker');
    };

    /** Open the clock.     */    self.open = function () {
        return gj.timepicker.methods.open(this);
    };

    /** Close the clock.     */    self.close = function () {
        return gj.picker.widget.prototype.close.call(this, 'timepicker');
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-timepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.timepicker.widget.prototype = new gj.picker.widget();
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
