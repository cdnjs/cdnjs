import { eachDayOfInterval, startOfWeek, endOfWeek, addDays, subDays, subWeeks, addWeeks, startOfMonth, endOfMonth, isBefore, isFirstDayOfMonth, isLastDayOfMonth } from './date';
export var getYears = function getYears(currentYear, range) {
  var years = [];
  for (var i = currentYear - range; i <= currentYear + range; i++) {
    years.push({
      label: String(i).padStart(4, '0'),
      value: i
    });
  }
  return years;
};
export var getMonths = function getMonths(locale) {
  var months = [];
  var formatter = new Intl.DateTimeFormat(locale, {
    month: 'long'
  });
  for (var i = 0; i < 12; i++) {
    months.push({
      label: formatter.format(new Date('1970-01-01').setMonth(i)),
      value: i
    });
  }
  return months;
};
export var getDaysNames = function getDaysNames(now, weekStartsOn, locale) {
  var formatter = new Intl.DateTimeFormat(locale, {
    weekday: 'short'
  });
  return eachDayOfInterval(startOfWeek(now, weekStartsOn), endOfWeek(now, weekStartsOn)).map(function (day) {
    return formatter.format(day);
  });
};
export var navigateDate = function navigateDate(date, key) {
  var newDate = date !== null && date !== void 0 ? date : new Date();
  switch (key) {
    case 'ArrowRight':
      newDate = addDays(newDate, 1);
      break;
    case 'ArrowLeft':
      newDate = subDays(newDate, 1);
      break;
    case 'ArrowUp':
      newDate = subWeeks(newDate, 1);
      break;
    case 'ArrowDown':
      newDate = addWeeks(newDate, 1);
      break;
  }
  return newDate;
};
export var getWeeks = function getWeeks(viewDate, weekStartsOn) {
  var start = startOfWeek(startOfMonth(viewDate), weekStartsOn);
  var end = endOfWeek(endOfMonth(viewDate), weekStartsOn);
  var count = 0;
  var current = start;
  var nestedWeeks = [];
  var lastDay = null;
  while (isBefore(current, end)) {
    var weekNumber = Math.floor(count / 7);
    nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
    var day = current.getDay();
    if (lastDay !== day) {
      lastDay = day;
      nestedWeeks[weekNumber].push(current);
      count += 1;
    }
    current = addDays(current, 1);
  }
  return nestedWeeks;
};
export var setTimeEqual = function setTimeEqual(to, from) {
  if (from) {
    to.setHours(from.getHours());
    to.setMinutes(from.getMinutes());
    to.setSeconds(from.getSeconds());
    to.setMilliseconds(from.getMilliseconds());
  }
  return to;
};
export var isFirstDay = function isFirstDay(day, dayOfWeek) {
  return dayOfWeek === 0 || isFirstDayOfMonth(day);
};
export var isLastDay = function isLastDay(day, dayOfWeek) {
  return dayOfWeek === 6 || isLastDayOfMonth(day);
};
//# sourceMappingURL=calendar.js.map