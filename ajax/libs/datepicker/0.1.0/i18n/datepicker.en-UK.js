/*!
 * Datepicker v0.1.0
 * https://github.com/fengyuanchen/datepicker
 *
 * Copyright 2014 Fenngyuan Chen
 * Released under the MIT license
 */

(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {

    "use strict";

    $.fn.datepicker.setDefaults({
        autoClose: false,
        dateFormat: "dd/mm/yy",
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        showMonthAfterYear: false,
        viewStart: 0, // days
        weekStart: 0, // Sunday
        yearSuffix: ""
    });
});
