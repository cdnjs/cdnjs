"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    addDays: function() {
        return addDays;
    },
    addMonths: function() {
        return addMonths;
    },
    addWeeks: function() {
        return addWeeks;
    },
    eachDayOfInterval: function() {
        return eachDayOfInterval;
    },
    endOfDay: function() {
        return endOfDay;
    },
    endOfMonth: function() {
        return endOfMonth;
    },
    endOfWeek: function() {
        return endOfWeek;
    },
    format: function() {
        return format;
    },
    getMillisecondsToTomorrow: function() {
        return getMillisecondsToTomorrow;
    },
    isAfter: function() {
        return isAfter;
    },
    isBefore: function() {
        return isBefore;
    },
    isFirstDayOfMonth: function() {
        return isFirstDayOfMonth;
    },
    isLastDayOfMonth: function() {
        return isLastDayOfMonth;
    },
    isMatch: function() {
        return isMatch;
    },
    isSameDay: function() {
        return isSameDay;
    },
    isSameMonth: function() {
        return isSameMonth;
    },
    isWithinInterval: function() {
        return isWithinInterval;
    },
    parse: function() {
        return parse;
    },
    setHours: function() {
        return setHours;
    },
    setMinutes: function() {
        return setMinutes;
    },
    setMonth: function() {
        return setMonth;
    },
    setYear: function() {
        return setYear;
    },
    startOfDay: function() {
        return startOfDay;
    },
    startOfMonth: function() {
        return startOfMonth;
    },
    startOfWeek: function() {
        return startOfWeek;
    },
    subDays: function() {
        return subDays;
    },
    subMonths: function() {
        return subMonths;
    },
    subWeeks: function() {
        return subWeeks;
    }
});
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _type_of = require("@swc/helpers/_/_type_of");
var _dayjs = /*#__PURE__*/ _interop_require_default._(require("dayjs"));
function startOfDay(date) {
    return (0, _dayjs.default)(date).startOf("day").toDate();
}
function endOfDay(date) {
    return (0, _dayjs.default)(date).endOf("day").toDate();
}
function startOfWeek(date) {
    var weekStart = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    weekStart = weekStart % 7;
    var day = (0, _dayjs.default)(date);
    var weekDay = day.day();
    var diff = (weekDay < weekStart ? 7 : 0) + weekDay - weekStart;
    return day.date(day.date() - diff).toDate();
}
function endOfWeek(date) {
    var weekStart = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var day = (0, _dayjs.default)(startOfWeek(date, weekStart));
    return day.date(day.date() + 6).toDate();
}
function startOfMonth(date) {
    return (0, _dayjs.default)(date).startOf("month").toDate();
}
function endOfMonth(date) {
    return (0, _dayjs.default)(date).endOf("month").toDate();
}
function isFirstDayOfMonth(date) {
    return (0, _dayjs.default)(date).date() === 1;
}
function isLastDayOfMonth(date) {
    // isSameDay -- shorter, but not exact with date-fns behavior
    // return isSameDay(date, dayjs(date).endOf("month"));
    return (0, _dayjs.default)(date).endOf("day").isSame((0, _dayjs.default)(date).endOf("month"));
}
function format(date, format) {
    return (0, _dayjs.default)(date).format(format);
}
function isBefore(date1, date2) {
    // Exactly as date-fns does
    // dayjs().isBefore() for slightly different approach
    return (0, _dayjs.default)(date1) < (0, _dayjs.default)(date2);
}
function isAfter(date1, date2) {
    return (0, _dayjs.default)(date1) > (0, _dayjs.default)(date2);
}
function isSameDay(date1, date2) {
    return (0, _dayjs.default)(date1).isSame(date2, "day");
}
function isSameMonth(date1, date2) {
    return (0, _dayjs.default)(date1).isSame(date2, "month");
}
function isWithinInterval(date, start, end) {
    var day = (0, _dayjs.default)(date);
    return day >= (0, _dayjs.default)(start) && day <= (0, _dayjs.default)(end);
}
function setMinutes(date, minute) {
    return (0, _dayjs.default)(date).set("minute", minute).toDate();
}
function setHours(date, hour) {
    return (0, _dayjs.default)(date).set("hour", hour).toDate();
}
function setMonth(date, month) {
    return (0, _dayjs.default)(date).set("month", month).toDate();
}
function setYear(date, year) {
    return (0, _dayjs.default)(date).set("year", year).toDate();
}
function addDays(date, day) {
    return (0, _dayjs.default)(date).add(day, "day").toDate();
}
function subDays(date, day) {
    return (0, _dayjs.default)(date).subtract(day, "day").toDate();
}
function addWeeks(date, week) {
    return (0, _dayjs.default)(date).add(week, "week").toDate();
}
function subWeeks(date, week) {
    return (0, _dayjs.default)(date).subtract(week, "week").toDate();
}
function addMonths(date, month) {
    return (0, _dayjs.default)(date).add(month, "month").toDate();
}
function subMonths(date, month) {
    return (0, _dayjs.default)(date).subtract(month, "month").toDate();
}
function eachDayOfInterval(start, end) {
    var dates = [];
    var startDate = (0, _dayjs.default)(start).toDate();
    var endDate = (0, _dayjs.default)(end).toDate();
    var endTime = endDate.getTime();
    var currentDate = startDate;
    currentDate.setHours(0, 0, 0, 0);
    while(currentDate.getTime() <= endTime){
        dates.push(new Date(currentDate.getTime()));
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(0, 0, 0, 0);
    }
    return dates;
}
function parse(input, format) {
    var _loop = function() {
        var match = superRegExp.exec(format);
        if (!match) {
            return "break";
        }
        var length = match[0].length;
        var atIndex = superRegExp.lastIndex - length;
        var item = entries.find(function(item) {
            return item[0] === match[0];
        });
        lastNonFormatting = format.slice(lastFormatIndex, atIndex);
        lastFormatIndex = superRegExp.lastIndex;
        if (input.slice(prevInputIndex, prevInputIndex + lastNonFormatting.length) !== lastNonFormatting) {
            return {
                v: new Date("")
            };
        }
        var value = input.slice(prevInputIndex + lastNonFormatting.length).match(item[1]);
        if (!value) {
            return {
                v: new Date("")
            };
        }
        prevInputIndex = prevInputIndex + lastNonFormatting.length + value[0].length;
        var _item_ = _sliced_to_array._(item[2](value[0]), 3), key = _item_[0], newValue = _item_[1], okay = _item_[2];
        if (!okay) {
            return {
                v: new Date("")
            };
        }
        store[key] = newValue;
        found = true;
    };
    var referenceDate = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : new Date();
    var match2 = /^\d\d/; // 00 - 99
    var match4 = /^\d{4}/; // 0000 - 9999
    var entries = [
        [
            "YYYY",
            match4,
            function(val) {
                return [
                    "Y",
                    +val,
                    true
                ];
            }
        ],
        [
            "MM",
            match2,
            function(val) {
                var numVal = +val;
                var okay = numVal > 0 && numVal <= 12;
                return [
                    "M",
                    numVal - 1,
                    okay
                ];
            }
        ],
        [
            "DD",
            match2,
            function(val) {
                return [
                    "D",
                    +val,
                    true
                ];
            }
        ],
        [
            "HH",
            match2,
            function(val) {
                var numVal = parseInt(val, 10);
                var okay = numVal >= 0 && numVal < 24;
                return [
                    "h",
                    numVal,
                    okay
                ];
            }
        ],
        [
            "mm",
            match2,
            function(val) {
                var numVal = parseInt(val, 10);
                var okay = numVal >= 0 && numVal < 60;
                return [
                    "m",
                    numVal,
                    okay
                ];
            }
        ]
    ];
    var superRegExp = new RegExp(entries.map(function(item) {
        return item[0];
    }).join("|"), "g");
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
    var lastNonFormatting = "";
    var lastFormatIndex = 0;
    var found = false;
    while(true){
        var _ret = _loop();
        if (_type_of._(_ret) === "object") return _ret.v;
        if (_ret === "break") break;
    }
    if (!found) {
        return new Date("");
    }
    var date = new Date(store.Y, store.M, store.D, store.h, store.m, store.s, store.ms);
    // Since days of months are dynamic, they can't be validated in entries,
    // so we check it here, in the finalized date
    if (date.getMonth() !== store.M || date.getDate() !== store.D) {
        return new Date("");
    }
    return date;
}
function isMatch(input, format) {
    return !isNaN(+parse(input, format));
}
function getMillisecondsToTomorrow(date) {
    return (0, _dayjs.default)(endOfDay(date)).diff((0, _dayjs.default)(date), "ms");
}

//# sourceMappingURL=date.js.map