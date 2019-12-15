/* flatpickr v4.5.1, @license MIT */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.be = {})));
}(this, (function (exports) { 'use strict';

    var fp = typeof window !== "undefined" && window.flatpickr !== undefined ? window.flatpickr : {
      l10ns: {}
    };
    var Belarusian = {
      weekdays: {
        shorthand: ["Нд", "Пн", "Аў", "Ср", "Чц", "Пт", "Сб"],
        longhand: ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота"]
      },
      months: {
        shorthand: ["Сту", "Лют", "Сак", "Кра", "Тра", "Чэр", "Ліп", "Жні", "Вер", "Кас", "Ліс", "Сне"],
        longhand: ["Студзень", "Люты", "Сакавік", "Красавік", "Травень", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Снежань"]
      },
      firstDayOfWeek: 1,
      ordinal: function ordinal() {
        return "";
      },
      rangeSeparator: " — ",
      weekAbbreviation: "Тыд.",
      scrollTitle: "Пракруціце для павелічэння",
      toggleTitle: "Націсніце для пераключэння",
      amPM: ["ДП", "ПП"],
      yearAriaLabel: "Год"
    };
    fp.l10ns.be = Belarusian;
    var be = fp.l10ns;

    exports.Belarusian = Belarusian;
    exports.default = be;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
