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
        dateFormat: "yyyy-mm-dd",
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        showMonthAfterYear: true,
        viewStart: 0, // days
        weekStart: 1, // Monday
        yearSuffix: "年"
    });
});
