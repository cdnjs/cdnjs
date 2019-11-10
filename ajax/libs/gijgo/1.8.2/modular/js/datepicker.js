/*
 * Gijgo DatePicker v1.8.2
 * http://gijgo.com/datepicker
 *
 * Copyright 2014, 2017 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.datepicker = {
    plugins: {},
    messages: {
        'en-us': {
            weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        }
    }
};

gj.datepicker.config = {
    base: {
        /** Whether to display dates in other months at the start or end of the current month.         */        showOtherMonths: false,

        /** Whether days in other months shown before or after the current month are selectable.
         * This only applies if the showOtherMonths option is set to true.         */        selectOtherMonths: true,

        /** The width of the datepicker.         */        width: undefined,

        /** The minimum selectable date. When not set, there is no minimum         */        minDate: undefined,

        /** The maximum selectable date. When not set, there is no maximum         */        maxDate: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.         */        format: 'mm/dd/yyyy',

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.         */        iconsLibrary: 'materialicons',

        /** The initial datepicker value.         */        value: undefined,

        /** Day of the week start. 0 (Sunday) to 6 (Saturday)         */        weekStartDay: 0,

        /** An array or function that will be used to determine which dates to be disabled for selection by the widget.         */        disableDates: undefined,

        /** An array that will be used to determine which days of week to be disabled for selection by the widget.
         * The array needs to contains only numbers where 0 is Sunday, 1 is Monday and etc.         */        disableDaysOfWeek: undefined,

        /** Whether to display week number in year on the left side of the calendar.         */        calendarWeeks: false,

        /** Whether to enable keyboard navigation.         */        keyboardNavigation: true,

        /** The language that needs to be in use.         */        locale: 'en-us',

        icons: {
            /** datepicker icon definition.             */            rightIcon: '<i class="gj-icon event" />',

            previousMonth: '<i class="gj-icon chevron-left" />',
            nextMonth: '<i class="gj-icon chevron-right" />'
        },

        fontSize: undefined,

        style: {
            wrapper: 'gj-datepicker gj-datepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            calendar: 'gj-calendar gj-calendar-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-calendar gj-calendar-bootstrap'
        },
        iconsLibrary: 'glyphicons',
        showOtherMonths: true
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-calendar gj-calendar-bootstrap'
        },
        showOtherMonths: true
    },

    fontawesome: {
        icons: {
            rightIcon: '<i class="fa fa-calendar" aria-hidden="true"></i>',
            previousMonth: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
            nextMonth: '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        icons: {
            rightIcon: '<span class="glyphicon glyphicon-calendar"></span>',
            previousMonth: '<span class="glyphicon glyphicon-chevron-left"></span>',
            nextMonth: '<span class="glyphicon glyphicon-chevron-right"></span>'
        }
    }
};

gj.datepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'datepicker');
        this.attr('data-datepicker', 'true');
        gj.datepicker.methods.initialize(this);
        return this;
    },

    initialize: function ($datepicker) {
        var data = $datepicker.data(), $calendar, $rightIcon,
            $wrapper = $datepicker.parent('div[role="wrapper"]');

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
            $datepicker.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $datepicker.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $datepicker.val(data.value).addClass(data.style.input).attr('role', 'input');

        data.fontSize && $datepicker.css('font-size', data.fontSize);        

        $rightIcon.on('click', function (e) {
            var $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
            if ($calendar.is(':visible')) {
                gj.datepicker.methods.close($datepicker);
            } else {
                gj.datepicker.methods.open($datepicker);
            }
        });

        $datepicker.on('blur', function () {
            $datepicker.timeout = setTimeout(function () {
                gj.datepicker.methods.close($datepicker);
            }, 500);
        });

        $wrapper.append($rightIcon);

        $calendar = gj.datepicker.methods.createCalendar($datepicker);

        if (data.keyboardNavigation) {
            $datepicker.on('keydown', gj.datepicker.methods.createKeyDownHandler($datepicker, $calendar));
        }
    },

    createCalendar: function ($datepicker) {
        var date, $navigator, data = $datepicker.data(),
            $calendar = $('<div role="calendar" type="month"/>').addClass(data.style.calendar).attr('guid', $datepicker.attr('data-guid')),
            $table = $('<table/>'),
            $thead = $('<thead/>');
        
        data.fontSize && $calendar.css('font-size', data.fontSize);

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            $datepicker.attr('day', date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
        }

        $datepicker.attr('month', date.getMonth());
        $datepicker.attr('year', date.getFullYear());

        $navigator = $('<div role="navigator" />');
        $navigator.append($('<div>' + data.icons.previousMonth + '</div>').on('click', gj.datepicker.methods.prev($datepicker)));
        $navigator.append($('<div role="period"></div>').on('click', gj.datepicker.methods.changePeriod($datepicker)));
        $navigator.append($('<div>' + data.icons.nextMonth + '</div>').on('click', gj.datepicker.methods.next($datepicker)));
        $calendar.append($navigator);

        $row = $('<tr role="week-days" />');
        if (data.calendarWeeks) {
            $row.append('<th><div>&nbsp;</div></th>');
        }
        for (i = data.weekStartDay; i < gj.datepicker.messages[data.locale].weekDays.length; i++) {
            $row.append('<th><div>' + gj.datepicker.messages[data.locale].weekDays[i] + '</div></th>');
        }
        for (i = 0; i < data.weekStartDay; i++) {
            $row.append('<th><div>' + gj.datepicker.messages[data.locale].weekDays[i] + '</div></th>');
        }
        $thead.append($row);

        $table.append($thead);
        $table.append('<tbody/>');
        $calendar.append($table);
        $calendar.hide();

        $('body').append($calendar);
        return $calendar;
    },

    renderMonth: function ($datepicker) {
        var weekDay, selectedDay, day, month, year, daysInMonth, total, firstDayPosition, i, now, prevMonth, nextMonth, $cell, $day, date,
            data = $datepicker.data(),
            $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]'),
            $table = $calendar.children('table'),
            $tbody = $table.children('tbody');

        clearTimeout($datepicker.timeout);
        $table.children('thead').show();
        if ($datepicker.attr('day')) {
            selectedDay = $datepicker.attr('day').split('-');
            selectedDay = new Date(selectedDay[0], selectedDay[1], selectedDay[2]);
        } else {
            selectedDay = new Date(undefined);
        }
        month = parseInt($datepicker.attr('month'), 10);
        year = parseInt($datepicker.attr('year'), 10);

        $calendar.attr('type', 'month');
        $calendar.find('div[role="period"]').text(gj.core.messages[data.locale].monthNames[month] + ' ' + year);

        daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if (year % 4 == 0 && year != 1900) {
            daysInMonth[1] = 29;
        }
        total = daysInMonth[month];

        firstDayPosition = (new Date(year, month, 1).getDay() + 7 - data.weekStartDay) % 7;

        $tbody.empty();

        weekDay = 0;
        $row = $('<tr />');
        prevMonth = gj.datepicker.methods.getPrevMonth(month, year);
        for (i = 1; i <= firstDayPosition; i++) {
            day = (daysInMonth[prevMonth.month] - firstDayPosition + i);
            date = new Date(prevMonth.year, prevMonth.month, day);
            if (data.calendarWeeks && i === 1) {
                $row.append('<td><div>' + gj.datepicker.methods.getWeekNumber(date) + '</div></td>');
            }
            if (prevMonth.year === selectedDay.getFullYear() && prevMonth.month === selectedDay.getMonth() && day === selectedDay.getDate()) {
                $cell = $('<td class="selected" />');
            } else {
                $cell = $('<td class="other-month" />');
            }
            if (data.showOtherMonths) {
                $day = $('<div>' + day + '</div>');
                $cell.append($day);
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    $cell.addClass('gj-cursor-pointer');
                    $day.on('click', gj.datepicker.methods.select($datepicker, $calendar, date));
                } else {
                    $cell.addClass('disabled');
                }
            }
            $row.append($cell);
            weekDay++;
        }
        if (i > 1) {
            $tbody.append($row);
        }

        now = new Date();
        for (i = 1; i <= total; i++) {
            date = new Date(year, month, i);
            if (weekDay == 0) {
                $row = $('<tr>');
                if (data.calendarWeeks) {
                    $row.append('<td><div>' + gj.datepicker.methods.getWeekNumber(date) + '</div></td>');
                }
            }
            $cell = $('<td day="' + i + '" />');
            if (year === selectedDay.getFullYear() && month === selectedDay.getMonth() && i === selectedDay.getDate()) {
                $cell.addClass('selected');
            } else if (year === now.getFullYear() && month === now.getMonth() && i === now.getDate()) {
                $cell.addClass('today');
            } else {
                $cell.addClass('current-month');
            }
            $day = $('<div>' + i + '</div>');
            if (gj.datepicker.methods.isSelectable(data, date)) {
                $cell.addClass('gj-cursor-pointer');
                $day.on('click', gj.datepicker.methods.select($datepicker, $calendar, date));
            } else {
                $cell.addClass('disabled');
            }
            $cell.append($day);
            $row.append($cell);
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }

        nextMonth = gj.datepicker.methods.getNextMonth(month, year);
        for (i = 1; weekDay != 0; i++) {
            date = new Date(nextMonth.year, nextMonth.month, i);
            if (nextMonth.year === selectedDay.getFullYear() && nextMonth.month === selectedDay.getMonth() && i === selectedDay.getDate()) {
                $cell = $('<td class="selected" />');
            } else {
                $cell = $('<td class="other-month" />');
            }
            if (data.showOtherMonths) {
                $day = $('<div>' + i + '</div>');
                $cell.append($day);
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    $cell.addClass('gj-cursor-pointer');
                    $day.on('click', gj.datepicker.methods.select($datepicker, $calendar, date));
                } else {
                    $cell.addClass('disabled');
                }
            }
            $row.append($cell);
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }
    },

    renderYear: function ($datepicker, $calendar) {
        var year, i, m, $month,
            data = $datepicker.data(),
            $table = $calendar.children('table'),
            $tbody = $table.children('tbody');

        clearTimeout($datepicker.timeout);
        $table.children('thead').hide();

        year = parseInt($datepicker.attr('year'), 10);

        $calendar.attr('type', 'year');
        $calendar.find('div[role="period"]').text(year);

        $tbody.empty();

        for (i = 0; i < 3; i++) {
            $row = $('<tr />');
            for (m = (i * 4); m <= (i * 4) + 3; m++) {
                $month = $('<div>' + gj.core.messages[data.locale].monthShortNames[m] + '</div>');
                $month.on('click', gj.datepicker.methods.selectMonth($datepicker, $calendar, m));
                $cell = $('<td></td>').append($month);
                $row.append($cell);
            }
            $tbody.append($row);
        }

        $datepicker.focus();
    },

    renderDecade: function ($datepicker, $calendar) {
        var year, decade, i, y, $year,
            $table = $calendar.children('table'),
            $tbody = $table.children('tbody');

        clearTimeout($datepicker.timeout);
        $table.children('thead').hide();

        year = parseInt($datepicker.attr('year'), 10);
        decade = year - (year % 10);

        $calendar.attr('type', 'decade');
        $calendar.find('div[role="period"]').text(decade + ' - ' + (decade + 9));

        $tbody.empty();

        for (i = decade - 1; i <= decade + 10 ; i += 4) {
            $row = $('<tr />');
            for (y = i; y <= i + 3; y++) {
                $year = $('<div>' + y + '</div>');
                $year.on('click', gj.datepicker.methods.selectYear($datepicker, $calendar, y));
                $cell = $('<td></td>').append($year);
                $row.append($cell);
            }
            $tbody.append($row);
        }

        $datepicker.focus();
    },

    renderCentury: function ($datepicker, $calendar) {
        var year, century, i, d, $decade,
            $table = $calendar.children('table'),
            $tbody = $table.children('tbody');

        clearTimeout($datepicker.timeout);
        $table.children('thead').hide();

        year = parseInt($datepicker.attr('year'), 10);
        century = year - (year % 100);

        $calendar.attr('type', 'century');
        $calendar.find('div[role="period"]').text(century + ' - ' + (century + 99));

        $tbody.empty();

        for (i = (century - 10); i < century + 100; i += 40) {
            $row = $('<tr />');
            for (d = i; d <= i + 30; d += 10) {
                $decade = $('<div>' + d + '</div>');
                $decade.on('click', gj.datepicker.methods.selectDecade($datepicker, $calendar, d));
                $cell = $('<td></td>').append($decade);
                $row.append($cell);
            }
            $tbody.append($row);
        }

        $datepicker.focus();
    },

    getWeekNumber: function (date) {
        var d = new Date(date.valueOf());
        d.setDate(d.getDate() + 6);
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    },

    getMinDate: function (data) {
        var minDate;
        if (data.minDate) {
            if (typeof (data.minDate) === 'string') {
                minDate = gj.core.parseDate(data.minDate, data.format, data.locale);
            } else if (typeof (data.minDate) === 'function') {
                minDate = data.minDate();
                if (typeof minDate === 'string') {
                    minDate = gj.core.parseDate(minDate, data.format, data.locale);
                }
            } else if (typeof data.minDate.getMonth === 'function') {
                minDate = data.minDate;
            }
        }
        return minDate;
    },

    getMaxDate: function (data) {
        var maxDate;
        if (data.maxDate) {
            if (typeof data.maxDate === 'string') {
                maxDate = gj.core.parseDate(data.maxDate, data.format, data.locale);
            } else if (typeof data.maxDate === 'function') {
                maxDate = data.maxDate();
                if (typeof maxDate === 'string') {
                    maxDate = gj.core.parseDate(maxDate, data.format, data.locale);
                }
            } else if (typeof data.maxDate.getMonth === 'function') {
                maxDate = data.maxDate;
            }
        }
        return maxDate;
    },

    isSelectable: function (data, date) {
        var result = true,
            minDate = gj.datepicker.methods.getMinDate(data),
            maxDate = gj.datepicker.methods.getMaxDate(data),
            i;

        if (minDate && date < minDate) {
            result = false;
        } else if (maxDate && date > maxDate) {
            result = false;
        }

        if (result) {
            if (data.disableDates) {
                if ($.isArray(data.disableDates)) {
                    for (i = 0; i < data.disableDates.length; i++) {
                        if (data.disableDates[i] instanceof Date && data.disableDates[i].getTime() === date.getTime()) {
                            result = false;
                        } else if (typeof data.disableDates[i] === 'string' && gj.core.parseDate(data.disableDates[i], data.format, data.locale).getTime() === date.getTime()) {
                            result = false;
                        }
                    }
                } else if (data.disableDates instanceof Function) {
                    result = data.disableDates(date);
                }
            }
            if ($.isArray(data.disableDaysOfWeek) && data.disableDaysOfWeek.indexOf(date.getDay()) > -1) {
                result = false;
            }
        }
        return result;
    },

    getPrevMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() - 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    getNextMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() + 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    prev: function ($datepicker) {
        return function () {
            var date, month, year, decade, century,
                $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            switch ($calendar.attr('type')) {
                case 'month':
                    month = parseInt($datepicker.attr('month'), 10);
                    year = parseInt($datepicker.attr('year'), 10);
                    date = gj.datepicker.methods.getPrevMonth(month, year);
                    $datepicker.attr('month', date.month);
                    $datepicker.attr('year', date.year);
                    gj.datepicker.methods.renderMonth($datepicker);
                    break;
                case 'year':
                    year = parseInt($datepicker.attr('year'), 10);
                    $datepicker.attr('year', year - 1);
                    gj.datepicker.methods.renderYear($datepicker, $calendar);
                    break;
                case 'decade':
                    year = parseInt($datepicker.attr('year'), 10);
                    decade = year - (year % 10);
                    $datepicker.attr('year', decade - 10);
                    gj.datepicker.methods.renderDecade($datepicker, $calendar);
                    break;
                case 'century':
                    year = parseInt($datepicker.attr('year'), 10);
                    century = year - (year % 100);
                    $datepicker.attr('year', century - 100);
                    gj.datepicker.methods.renderCentury($datepicker, $calendar);
                    break;
            }

            $datepicker.focus();
        }
    },

    next: function ($datepicker) {
        return function () {
            var date, month, year, decade, century,
                $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            switch ($calendar.attr('type')) {
                case 'month':
                    month = parseInt($datepicker.attr('month'), 10);
                    year = parseInt($datepicker.attr('year'), 10);
                    date = gj.datepicker.methods.getNextMonth(month, year);
                    $datepicker.attr('month', date.month);
                    $datepicker.attr('year', date.year);
                    gj.datepicker.methods.renderMonth($datepicker);
                    break;
                case 'year':
                    year = parseInt($datepicker.attr('year'), 10);
                    $datepicker.attr('year', year + 1);
                    gj.datepicker.methods.renderYear($datepicker, $calendar);
                    break;
                case 'decade':
                    year = parseInt($datepicker.attr('year'), 10);
                    decade = year - (year % 10);
                    $datepicker.attr('year', decade + 10);
                    gj.datepicker.methods.renderDecade($datepicker, $calendar);
                    break;
                case 'century':
                    year = parseInt($datepicker.attr('year'), 10);
                    century = year - (year % 100);
                    $datepicker.attr('year', century + 100);
                    gj.datepicker.methods.renderCentury($datepicker, $calendar);
                    break;
            }

            $datepicker.focus();
        }
    },

    changePeriod: function ($datepicker) {
        return function (e) {
            var $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            switch ($calendar.attr('type')) {
                case 'month':
                    gj.datepicker.methods.renderYear($datepicker, $calendar);
                    break;
                case 'year':
                    gj.datepicker.methods.renderDecade($datepicker, $calendar);
                    break;
                case 'decade':
                    gj.datepicker.methods.renderCentury($datepicker, $calendar);
                    break;
                case 'century':
                    clearTimeout($datepicker.timeout);
                    $datepicker.focus();
                    break;
            }
        }
    },

    select: function ($datepicker, $calendar, date) {
        return function (e) {
            var value,
                month = date.getMonth(),
                year = date.getFullYear(),
                data = $datepicker.data();
            value = gj.core.formatDate(date, data.format, data.locale);
            $datepicker.val(value);
            gj.datepicker.events.change($datepicker);
            $datepicker.attr('day', year + '-' + month + '-' + date.getDate());
            $datepicker.attr('month', month);
            $datepicker.attr('year', year);
            gj.datepicker.methods.close($datepicker);
            return $datepicker;
        };
    },

    selectMonth: function ($datepicker, $calendar, month) {
        return function (e) {
            $datepicker.attr('month', month);
            gj.datepicker.methods.renderMonth($datepicker);
        };
    },

    selectYear: function ($datepicker, $calendar, year) {
        return function (e) {
            $datepicker.attr('year', year);
            gj.datepicker.methods.renderYear($datepicker, $calendar);
        };
    },

    selectDecade: function ($datepicker, $calendar, year) {
        return function (e) {
            $datepicker.attr('year', year);
            gj.datepicker.methods.renderDecade($datepicker, $calendar);
        };
    },

    open: function ($datepicker) {
        var data = $datepicker.data(),
            offset = $datepicker.offset(),
            $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

        if ($datepicker.val()) {
            $datepicker.value($datepicker.val());
        }

        switch ($calendar.attr('type')) {
            case 'month':
                gj.datepicker.methods.renderMonth($datepicker);
                break;
            case 'year':
                gj.datepicker.methods.renderYear($datepicker, $calendar);
                break;
            case 'decade':
                gj.datepicker.methods.renderDecade($datepicker, $calendar);
                break;
            case 'century':
                gj.datepicker.methods.renderCentury($datepicker, $calendar);
                break;
        }

        $calendar.show();
        gj.core.calcPosition($datepicker[0], $calendar[0]);
        $datepicker.focus();
        gj.datepicker.events.open($datepicker);
    },

    close: function ($datepicker) {
        var $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
        $calendar.hide();
        gj.datepicker.events.close($datepicker);
    },

    createKeyDownHandler: function ($datepicker, $calendar) {
        return function (e) {
            var month, year, day, index, $new,
                $active = gj.datepicker.methods.getActiveCell($calendar);
            e = e || window.event;

            if (e.keyCode == '38') { // up
                index = $active.index();
                $new = $active.closest('tr').prev('tr').find('td:eq(' + index + ')');
                if (!$new.is('[day]')) {
                    gj.datepicker.methods.prev($datepicker)();
                    $new = $calendar.find('tbody tr').last().find('td:eq(' + index + ')');
                }
                if ($new.is('[day]')) {
                    $new.addClass('focused');
                    $active.removeClass('focused');
                }
            } else if (e.keyCode == '40') { // down
                index = $active.index();
                $new = $active.closest('tr').next('tr').find('td:eq(' + index + ')');
                if (!$new.is('[day]')) {
                    gj.datepicker.methods.next($datepicker)();
                    $new = $calendar.find('tbody tr').first().find('td:eq(' + index + ')');
                    if (!$new.is('[day]')) {
                        $new = $calendar.find('tbody tr:eq(1)').find('td:eq(' + index + ')');
                    }
                }
                if ($new.is('[day]')) {
                    $new.addClass('focused');
                    $active.removeClass('focused');
                }
            } else if (e.keyCode == '37') { // left
                $new = $active.prev('td[day]:not(.disabled)');
                if ($new.length === 0) {
                    $new = $active.closest('tr').prev('tr').find('td[day]').last();
                }
                if ($new.length === 0) {
                    gj.datepicker.methods.prev($datepicker)();
                    $new = $calendar.find('tbody tr').last().find('td[day]').last();
                }
                if ($new.length > 0) {
                    $new.addClass('focused');
                    $active.removeClass('focused');
                }
            } else if (e.keyCode == '39' || e.keyCode == '9') { // right/tab(next)
                $new = $active.next('[day]:not(.disabled)');
                if ($new.length === 0) {
                    $new = $active.closest('tr').next('tr').find('td[day]').first();
                }
                if ($new.length === 0) {
                    gj.datepicker.methods.next($datepicker)();
                    $new = $calendar.find('tbody tr').first().find('td[day]').first();
                }
                if ($new.length > 0) {
                    $new.addClass('focused');
                    $active.removeClass('focused');
                }                
            } else if (e.keyCode == '13') { // enter
                day = parseInt($active.attr('day'), 10);
                month = parseInt($datepicker.attr('month'), 10);
                year = parseInt($datepicker.attr('year'), 10);
                gj.datepicker.methods.select($datepicker, $calendar, new Date(year, month, day))();
            } else if (e.keyCode == '27') { // esc
                $datepicker.close();
            }
        }
    },

    getActiveCell: function ($calendar) {
        var $cell = $calendar.find('td[day].focused');
        if ($cell.length === 0) {
            $cell = $calendar.find('td[day].selected');
            if ($cell.length === 0) {
                $cell = $calendar.find('td[day].today');
                if ($cell.length === 0) {
                    $cell = $calendar.find('td[day]:not(.disabled)').first();
                }
            }
        }
        return $cell;
    },

    value: function ($datepicker, value) {
        var $calendar, date, data = $datepicker.data();
        if (typeof (value) === "undefined") {
            return $datepicker.val();
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date) {
                $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
                gj.datepicker.methods.select($datepicker, $calendar, date)();
            } else {
                $datepicker.val('');
            }            
            return $datepicker;
        }
    },

    destroy: function ($datepicker) {
        var data = $datepicker.data(),
            $parent = $datepicker.parent();
        if (data) {
            $datepicker.off();
            $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]').remove();
            $datepicker.removeData();
            $datepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-datepicker');
            $datepicker.removeClass();
            $parent.children('[role="right-icon"]').remove();
            $datepicker.unwrap();
        }
        return $datepicker;
    }
};

gj.datepicker.events = {
    /**
     * Triggered when the datepicker value is changed.
     *     */    change: function ($datepicker) {
        return $datepicker.triggerHandler('change');
    },

    /**
     * Event fires when the calendar is opened.     */    open: function ($datepicker) {
        return $datepicker.triggerHandler('open');
    },

    /**
     * Event fires when the calendar is closed.     */    close: function ($datepicker) {
        return $datepicker.triggerHandler('close');
    }
};

gj.datepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.datepicker.methods;

    /** Gets or sets the value of the datepicker.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove datepicker functionality from the element.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Open the calendar.     */    self.open = function () {
        gj.datepicker.methods.open(this);
    };

    /** Close the calendar.     */    self.close = function () {
        gj.datepicker.methods.close(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-datepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.datepicker.widget.prototype = new gj.widget();
gj.datepicker.widget.constructor = gj.datepicker.widget;

(function ($) {
    $.fn.datepicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.datepicker.widget(this, method);
            } else {
                $widget = new gj.datepicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
gj.core.messages['bg-bg'] = {
    monthNames: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
    monthShortNames: ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'ОКт', 'Ное', 'Дек']
};

gj.datepicker.messages['bg-bg'] = {
    weekDays: ['Н', 'П', 'В', 'С', 'Ч', 'П', 'С']
};
gj.core.messages['fr-fr'] = {
    monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    monthShortNames: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.' ]
};

gj.datepicker.messages['fr-fr'] = {
    weekDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S' ]
};
gj.core.messages['de-de'] = {
    monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    monthShortNames: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
};

gj.datepicker.messages['de-de'] = {
    weekDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
};
gj.core.messages['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ]
};

gj.datepicker.messages['pt-br'] = {
    //weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    weekDays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
};
gj.core.messages['ru-ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthShortNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
};

gj.datepicker.messages['ru-ru'] = {
    weekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
};
