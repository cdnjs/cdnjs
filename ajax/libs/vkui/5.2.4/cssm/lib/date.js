import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _typeof from "@babel/runtime/helpers/typeof";
import dayjs from 'dayjs';

// Using date-fns-like type for migration

export function startOfDay(date) {
  return dayjs(date).startOf('day').toDate();
}
export function endOfDay(date) {
  return dayjs(date).endOf('day').toDate();
}
export function startOfWeek(date) {
  var weekStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  weekStart = weekStart % 7;
  var day = dayjs(date);
  var weekDay = day.day();
  var diff = (weekDay < weekStart ? 7 : 0) + weekDay - weekStart;
  return day.date(day.date() - diff).toDate();
}
export function endOfWeek(date) {
  var weekStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var day = dayjs(startOfWeek(date, weekStart));
  return day.date(day.date() + 6).toDate();
}
export function startOfMonth(date) {
  return dayjs(date).startOf('month').toDate();
}
export function endOfMonth(date) {
  return dayjs(date).endOf('month').toDate();
}
export function isFirstDayOfMonth(date) {
  return dayjs(date).date() === 1;
}
export function isLastDayOfMonth(date) {
  // isSameDay -- shorter, but not exact with date-fns behavior
  // return isSameDay(date, dayjs(date).endOf("month"));
  return dayjs(date).endOf('day').isSame(dayjs(date).endOf('month'));
}
export function format(date, format) {
  return dayjs(date).format(format);
}
export function isBefore(date1, date2) {
  // Exactly as date-fns does
  // dayjs().isBefore() for slightly different approach
  return dayjs(date1) < dayjs(date2);
}
export function isAfter(date1, date2) {
  return dayjs(date1) > dayjs(date2);
}
export function isSameDay(date1, date2) {
  return dayjs(date1).isSame(date2, 'day');
}
export function isSameMonth(date1, date2) {
  return dayjs(date1).isSame(date2, 'month');
}
export function isWithinInterval(date, start, end) {
  var day = dayjs(date);
  return day >= dayjs(start) && day <= dayjs(end);
}
export function setMinutes(date, minute) {
  return dayjs(date).set('minute', minute).toDate();
}
export function setHours(date, hour) {
  return dayjs(date).set('hour', hour).toDate();
}
export function setMonth(date, month) {
  return dayjs(date).set('month', month).toDate();
}
export function setYear(date, year) {
  return dayjs(date).set('year', year).toDate();
}
export function addDays(date, day) {
  return dayjs(date).add(day, 'day').toDate();
}
export function subDays(date, day) {
  return dayjs(date).subtract(day, 'day').toDate();
}
export function addWeeks(date, week) {
  return dayjs(date).add(week, 'week').toDate();
}
export function subWeeks(date, week) {
  return dayjs(date).subtract(week, 'week').toDate();
}
export function addMonths(date, month) {
  return dayjs(date).add(month, 'month').toDate();
}
export function subMonths(date, month) {
  return dayjs(date).subtract(month, 'month').toDate();
}

// Rip off date-fns
export function eachDayOfInterval(start, end) {
  var dates = [];
  var startDate = dayjs(start).toDate();
  var endDate = dayjs(end).toDate();
  var endTime = endDate.getTime();
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  while (currentDate.getTime() <= endTime) {
    dates.push(new Date(currentDate.getTime()));
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0);
  }
  return dates;
}
export function parse(input, format) {
  var referenceDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();
  var match2 = /^\d\d/; // 00 - 99
  var match4 = /^\d{4}/; // 0000 - 9999

  var entries = [['YYYY', match4, function (val) {
    return ['Y', +val, true];
  }], ['MM', match2, function (val) {
    var numVal = +val;
    var okay = numVal > 0 && numVal <= 12;
    return ['M', numVal - 1, okay];
  }], ['DD', match2, function (val) {
    return ['D', +val, true];
  }], ['HH', match2, function (val) {
    var numVal = parseInt(val, 10);
    var okay = numVal >= 0 && numVal < 24;
    return ['h', numVal, okay];
  }], ['mm', match2, function (val) {
    var numVal = parseInt(val, 10);
    var okay = numVal >= 0 && numVal < 60;
    return ['m', numVal, okay];
  }]];
  var superRegExp = new RegExp(entries.map(function (item) {
    return item[0];
  }).join('|'), 'g');
  var store = {
    Y: referenceDate.getFullYear(),
    M: referenceDate.getMonth(),
    D: referenceDate.getDate(),
    h: referenceDate.getHours(),
    m: referenceDate.getMinutes(),
    s: referenceDate.getSeconds(),
    ms: referenceDate.getMilliseconds()
  };
  var prevInputIndex = 0;
  var lastNonFormatting = '';
  var lastFormatIndex = 0;
  var found = false;
  var _loop = function _loop() {
    var match = superRegExp.exec(format);
    if (!match) {
      return "break";
    }
    var length = match[0].length;
    var atIndex = superRegExp.lastIndex - length;
    var item = entries.find(function (item) {
      return item[0] === match[0];
    });
    if (!item) {
      return {
        v: new Date('')
      };
    }
    lastNonFormatting = format.slice(lastFormatIndex, atIndex);
    lastFormatIndex = superRegExp.lastIndex;
    if (input.slice(prevInputIndex, prevInputIndex + lastNonFormatting.length) !== lastNonFormatting) {
      return {
        v: new Date('')
      };
    }
    var value = input.slice(prevInputIndex + lastNonFormatting.length).match(item[1]);
    if (!value) {
      return {
        v: new Date('')
      };
    }
    prevInputIndex = prevInputIndex + lastNonFormatting.length + value[0].length;
    var _item$ = item[2](value[0]),
      _item$2 = _slicedToArray(_item$, 3),
      key = _item$2[0],
      newValue = _item$2[1],
      okay = _item$2[2];
    if (!okay) {
      return {
        v: new Date('')
      };
    }
    store[key] = newValue;
    found = true;
  };
  while (true) {
    var _ret = _loop();
    if (_ret === "break") break;
    if (_typeof(_ret) === "object") return _ret.v;
  }
  if (!found) {
    return new Date('');
  }
  var date = new Date(store.Y, store.M, store.D, store.h, store.m, store.s, store.ms);

  // Since days of months are dynamic, they can't be validated in entries,
  // so we check it here, in the finalized date
  if (date.getMonth() !== store.M || date.getDate() !== store.D) {
    return new Date('');
  }
  return date;
}
export function isMatch(input, format) {
  return !isNaN(+parse(input, format));
}
export function getMillisecondsToTomorrow(date) {
  return dayjs(endOfDay(date)).diff(dayjs(date), 'ms');
}
//# sourceMappingURL=date.js.map