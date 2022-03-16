"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTimeEqual = exports.navigateDate = exports.isLastDay = exports.isFirstDay = exports.getYears = exports.getWeeks = exports.getMonths = exports.getDaysNames = void 0;

var _dateFns = require("date-fns");

var getYears = function getYears(currentYear, range) {
  var years = [];

  for (var i = currentYear - range; i <= currentYear + range; i++) {
    years.push({
      label: String(i).padStart(4, "0"),
      value: i
    });
  }

  return years;
};

exports.getYears = getYears;

var getMonths = function getMonths(locale) {
  var months = [];
  var formatter = new Intl.DateTimeFormat(locale, {
    month: "long"
  });

  for (var i = 0; i < 12; i++) {
    months.push({
      label: formatter.format(new Date("1970-01-01").setMonth(i)),
      value: i
    });
  }

  return months;
};

exports.getMonths = getMonths;

var getDaysNames = function getDaysNames(now, weekStartsOn, locale) {
  var formatter = new Intl.DateTimeFormat(locale, {
    weekday: "short"
  });
  return (0, _dateFns.eachDayOfInterval)({
    start: (0, _dateFns.startOfWeek)(now, {
      weekStartsOn: weekStartsOn
    }),
    end: (0, _dateFns.endOfWeek)(now, {
      weekStartsOn: weekStartsOn
    })
  }).map(function (day) {
    return formatter.format(day);
  });
};

exports.getDaysNames = getDaysNames;

var navigateDate = function navigateDate(date, key) {
  var newDate = date !== null && date !== void 0 ? date : new Date();

  switch (key) {
    case "ArrowRight":
      newDate = (0, _dateFns.addDays)(newDate, 1);
      break;

    case "ArrowLeft":
      newDate = (0, _dateFns.subDays)(newDate, 1);
      break;

    case "ArrowUp":
      newDate = (0, _dateFns.subWeeks)(newDate, 1);
      break;

    case "ArrowDown":
      newDate = (0, _dateFns.addWeeks)(newDate, 1);
      break;
  }

  return newDate;
};

exports.navigateDate = navigateDate;

var getWeeks = function getWeeks(viewDate, weekStartsOn) {
  var start = (0, _dateFns.startOfWeek)((0, _dateFns.startOfMonth)(viewDate), {
    weekStartsOn: weekStartsOn
  });
  var end = (0, _dateFns.endOfWeek)((0, _dateFns.endOfMonth)(viewDate), {
    weekStartsOn: weekStartsOn
  });
  var count = 0;
  var current = start;
  var nestedWeeks = [];
  var lastDay = null;

  while ((0, _dateFns.isBefore)(current, end)) {
    var weekNumber = Math.floor(count / 7);
    nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
    var day = current.getDay();

    if (lastDay !== day) {
      lastDay = day;
      nestedWeeks[weekNumber].push(current);
      count += 1;
    }

    current = (0, _dateFns.addDays)(current, 1);
  }

  return nestedWeeks;
};

exports.getWeeks = getWeeks;

var setTimeEqual = function setTimeEqual(to, from) {
  if (from) {
    to.setHours(from.getHours());
    to.setMinutes(from.getMinutes());
    to.setSeconds(from.getSeconds());
    to.setMilliseconds(from.getMilliseconds());
  }

  return to;
};

exports.setTimeEqual = setTimeEqual;

var isFirstDay = function isFirstDay(day, dayOfWeek) {
  return dayOfWeek === 0 || (0, _dateFns.isFirstDayOfMonth)(day);
};

exports.isFirstDay = isFirstDay;

var isLastDay = function isLastDay(day, dayOfWeek) {
  return dayOfWeek === 6 || (0, _dateFns.isLastDayOfMonth)(day);
};

exports.isLastDay = isLastDay;
//# sourceMappingURL=calendar.js.map