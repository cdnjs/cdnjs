/*!
 * chartjs-adapter-luxon v0.1.1
 * https://www.chartjs.org
 * (c) 2019 Chart.js Contributors
 * Released under the MIT license
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("chart.js"),require("luxon")):"function"==typeof define&&define.amd?define(["chart.js","luxon"],t):t((e=e||self).Chart,e.luxon)}(this,function(e,t){"use strict";var n={datetime:"MMM d, yyyy, h:mm:ss a",millisecond:"h:mm:ss.SSS a",second:"h:mm:ss a",minute:"h:mm a",hour:"ha",day:"MMM d",week:"DD",month:"MMM yyyy",quarter:"'Q'q - yyyy",year:"yyyy"};function r(e){return t.DateTime.fromMillis(e)}e._adapters._date.override({_id:"luxon",formats:function(){return n},parse:function(n,f){if(e.helpers.isNullOrUndef(n))return null;var a=typeof n;return"number"===a?n=r(n):"string"===a?n="string"==typeof f?t.DateTime.fromFormat(n,f):t.DateTime.fromISO(n):"object"===a?n=t.DateTime.fromObject(n):n instanceof Date&&(n=t.DateTime.fromJSDate(n)),n.isValid?n.valueOf():null},format:function(e,t){return r(e).toFormat(t)},add:function(e,t,n){var f={};return f[n]=t,r(e).plus(f).valueOf()},diff:function(e,t,n){return r(e).diff(r(t)).as(n).valueOf()},startOf:function(e,t,n){return"isoWeek"===t?r(e).isoWeekday(n).valueOf():t?r(e).startOf(t).valueOf():e},endOf:function(e,t){return r(e).endOf(t).valueOf()}})});
