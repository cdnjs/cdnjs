/* flatpickr v4.5.2, @license MIT */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.monthSelect = factory());
}(this, (function () { 'use strict';

    function monthSelectPlugin() {
      return function (fp) {
        var days;

        function onDayHover(event) {
          if (!event.target || !event.target.classList.contains("flatpickr-day")) return;
          var dayIndex = Array.prototype.indexOf.call(days, event.target);
          fp.monthStartDay = new Date(days[dayIndex].dateObj.getFullYear(), days[dayIndex].dateObj.getMonth(), 1, 0, 0, 0, 0).getTime();
          fp.monthEndDay = new Date(days[dayIndex].dateObj.getFullYear(), days[dayIndex].dateObj.getMonth() + 1, 0, 0, 0, 0, 0).getTime();

          for (var i = days.length; i--;) {
            var date = days[i].dateObj.getTime();
            if (date > fp.monthEndDay || date < fp.monthStartDay) days[i].classList.remove("inRange");else days[i].classList.add("inRange");
            if (date != fp.monthEndDay) days[i].classList.remove("endRange");else days[i].classList.add("endRange");
            if (date != fp.monthStartDay) days[i].classList.remove("startRange");else days[i].classList.add("startRange");
          }
        }

        function highlightMonth() {
          for (var i = days.length; i--;) {
            var date = days[i].dateObj.getTime();
            if (date >= fp.monthStartDay && date <= fp.monthEndDay) days[i].classList.add("month", "selected");
            if (date != fp.monthEndDay) days[i].classList.remove("endRange");else days[i].classList.add("endRange");
            if (date != fp.monthStartDay) days[i].classList.remove("startRange");else days[i].classList.add("startRange");
          }
        }

        function clearHover() {
          for (var i = days.length; i--;) {
            days[i].classList.remove("inRange");
          }
        }

        return {
          onChange: highlightMonth,
          onMonthChange: highlightMonth,
          onClose: clearHover,
          onParseConfig: function onParseConfig() {
            fp.config.mode = "single";
            fp.config.enableTime = false;
          },
          onReady: [function () {
            days = fp.days.childNodes;
          }, function () {
            return fp.days.addEventListener("mouseover", onDayHover);
          }, highlightMonth]
        };
      };
    }

    return monthSelectPlugin;

})));
