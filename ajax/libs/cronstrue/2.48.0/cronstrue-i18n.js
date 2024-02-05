(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cronstrue", [], factory);
	else if(typeof exports === 'object')
		exports["cronstrue"] = factory();
	else
		root["cronstrue"] = factory();
})(globalThis, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 794:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronParser = void 0;
var rangeValidator_1 = __webpack_require__(586);
var CronParser = (function () {
    function CronParser(expression, dayOfWeekStartIndexZero, monthStartIndexZero) {
        if (dayOfWeekStartIndexZero === void 0) { dayOfWeekStartIndexZero = true; }
        if (monthStartIndexZero === void 0) { monthStartIndexZero = false; }
        this.expression = expression;
        this.dayOfWeekStartIndexZero = dayOfWeekStartIndexZero;
        this.monthStartIndexZero = monthStartIndexZero;
    }
    CronParser.prototype.parse = function () {
        var parsed = this.extractParts(this.expression);
        this.normalize(parsed);
        this.validate(parsed);
        return parsed;
    };
    CronParser.prototype.extractParts = function (expression) {
        if (!this.expression) {
            throw new Error("cron expression is empty");
        }
        var parsed = expression.trim().split(/[ ]+/);
        for (var i = 0; i < parsed.length; i++) {
            if (parsed[i].includes(",")) {
                var arrayElement = parsed[i]
                    .split(",")
                    .map(function (item) { return item.trim(); })
                    .filter(function (item) { return item !== ""; })
                    .map(function (item) { return (!isNaN(Number(item)) ? Number(item) : item); })
                    .filter(function (item) { return item !== null && item !== ""; });
                if (arrayElement.length === 0) {
                    arrayElement.push("*");
                }
                arrayElement.sort(function (a, b) { return (a !== null && b !== null ? a - b : 0); });
                parsed[i] = arrayElement.map(function (item) { return (item !== null ? item.toString() : ""); }).join(",");
            }
        }
        if (parsed.length < 5) {
            throw new Error("Expression has only ".concat(parsed.length, " part").concat(parsed.length == 1 ? "" : "s", ". At least 5 parts are required."));
        }
        else if (parsed.length == 5) {
            parsed.unshift("");
            parsed.push("");
        }
        else if (parsed.length == 6) {
            var isYearWithNoSecondsPart = /\d{4}$/.test(parsed[5]) || parsed[4] == "?" || parsed[2] == "?";
            if (isYearWithNoSecondsPart) {
                parsed.unshift("");
            }
            else {
                parsed.push("");
            }
        }
        else if (parsed.length > 7) {
            throw new Error("Expression has ".concat(parsed.length, " parts; too many!"));
        }
        return parsed;
    };
    CronParser.prototype.normalize = function (expressionParts) {
        var _this = this;
        expressionParts[3] = expressionParts[3].replace("?", "*");
        expressionParts[5] = expressionParts[5].replace("?", "*");
        expressionParts[2] = expressionParts[2].replace("?", "*");
        if (expressionParts[0].indexOf("0/") == 0) {
            expressionParts[0] = expressionParts[0].replace("0/", "*/");
        }
        if (expressionParts[1].indexOf("0/") == 0) {
            expressionParts[1] = expressionParts[1].replace("0/", "*/");
        }
        if (expressionParts[2].indexOf("0/") == 0) {
            expressionParts[2] = expressionParts[2].replace("0/", "*/");
        }
        if (expressionParts[3].indexOf("1/") == 0) {
            expressionParts[3] = expressionParts[3].replace("1/", "*/");
        }
        if (expressionParts[4].indexOf("1/") == 0) {
            expressionParts[4] = expressionParts[4].replace("1/", "*/");
        }
        if (expressionParts[6].indexOf("1/") == 0) {
            expressionParts[6] = expressionParts[6].replace("1/", "*/");
        }
        expressionParts[5] = expressionParts[5].replace(/(^\d)|([^#/\s]\d)/g, function (t) {
            var dowDigits = t.replace(/\D/, "");
            var dowDigitsAdjusted = dowDigits;
            if (_this.dayOfWeekStartIndexZero) {
                if (dowDigits == "7") {
                    dowDigitsAdjusted = "0";
                }
            }
            else {
                dowDigitsAdjusted = (parseInt(dowDigits) - 1).toString();
            }
            return t.replace(dowDigits, dowDigitsAdjusted);
        });
        if (expressionParts[5] == "L") {
            expressionParts[5] = "6";
        }
        if (expressionParts[3] == "?") {
            expressionParts[3] = "*";
        }
        if (expressionParts[3].indexOf("W") > -1 &&
            (expressionParts[3].indexOf(",") > -1 || expressionParts[3].indexOf("-") > -1)) {
            throw new Error("The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
        }
        var days = {
            SUN: 0,
            MON: 1,
            TUE: 2,
            WED: 3,
            THU: 4,
            FRI: 5,
            SAT: 6,
        };
        for (var day in days) {
            expressionParts[5] = expressionParts[5].replace(new RegExp(day, "gi"), days[day].toString());
        }
        expressionParts[4] = expressionParts[4].replace(/(^\d{1,2})|([^#/\s]\d{1,2})/g, function (t) {
            var dowDigits = t.replace(/\D/, "");
            var dowDigitsAdjusted = dowDigits;
            if (_this.monthStartIndexZero) {
                dowDigitsAdjusted = (parseInt(dowDigits) + 1).toString();
            }
            return t.replace(dowDigits, dowDigitsAdjusted);
        });
        var months = {
            JAN: 1,
            FEB: 2,
            MAR: 3,
            APR: 4,
            MAY: 5,
            JUN: 6,
            JUL: 7,
            AUG: 8,
            SEP: 9,
            OCT: 10,
            NOV: 11,
            DEC: 12,
        };
        for (var month in months) {
            expressionParts[4] = expressionParts[4].replace(new RegExp(month, "gi"), months[month].toString());
        }
        if (expressionParts[0] == "0") {
            expressionParts[0] = "";
        }
        if (!/\*|\-|\,|\//.test(expressionParts[2]) &&
            (/\*|\//.test(expressionParts[1]) || /\*|\//.test(expressionParts[0]))) {
            expressionParts[2] += "-".concat(expressionParts[2]);
        }
        for (var i = 0; i < expressionParts.length; i++) {
            if (expressionParts[i].indexOf(",") != -1) {
                expressionParts[i] =
                    expressionParts[i]
                        .split(",")
                        .filter(function (str) { return str !== ""; })
                        .join(",") || "*";
            }
            if (expressionParts[i] == "*/1") {
                expressionParts[i] = "*";
            }
            if (expressionParts[i].indexOf("/") > -1 && !/^\*|\-|\,/.test(expressionParts[i])) {
                var stepRangeThrough = null;
                switch (i) {
                    case 4:
                        stepRangeThrough = "12";
                        break;
                    case 5:
                        stepRangeThrough = "6";
                        break;
                    case 6:
                        stepRangeThrough = "9999";
                        break;
                    default:
                        stepRangeThrough = null;
                        break;
                }
                if (stepRangeThrough !== null) {
                    var parts = expressionParts[i].split("/");
                    expressionParts[i] = "".concat(parts[0], "-").concat(stepRangeThrough, "/").concat(parts[1]);
                }
            }
        }
    };
    CronParser.prototype.validate = function (parsed) {
        this.assertNoInvalidCharacters("DOW", parsed[5]);
        this.assertNoInvalidCharacters("DOM", parsed[3]);
        this.validateRange(parsed);
    };
    CronParser.prototype.validateRange = function (parsed) {
        rangeValidator_1.default.secondRange(parsed[0]);
        rangeValidator_1.default.minuteRange(parsed[1]);
        rangeValidator_1.default.hourRange(parsed[2]);
        rangeValidator_1.default.dayOfMonthRange(parsed[3]);
        rangeValidator_1.default.monthRange(parsed[4], this.monthStartIndexZero);
        rangeValidator_1.default.dayOfWeekRange(parsed[5], this.dayOfWeekStartIndexZero);
    };
    CronParser.prototype.assertNoInvalidCharacters = function (partDescription, expression) {
        var invalidChars = expression.match(/[A-KM-VX-Z]+/gi);
        if (invalidChars && invalidChars.length) {
            throw new Error("".concat(partDescription, " part contains invalid values: '").concat(invalidChars.toString(), "'"));
        }
    };
    return CronParser;
}());
exports.CronParser = CronParser;


/***/ }),

/***/ 728:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpressionDescriptor = void 0;
var stringUtilities_1 = __webpack_require__(910);
var cronParser_1 = __webpack_require__(794);
var ExpressionDescriptor = (function () {
    function ExpressionDescriptor(expression, options) {
        this.expression = expression;
        this.options = options;
        this.expressionParts = new Array(5);
        if (!this.options.locale && ExpressionDescriptor.defaultLocale) {
            this.options.locale = ExpressionDescriptor.defaultLocale;
        }
        if (!ExpressionDescriptor.locales[this.options.locale]) {
            var fallBackLocale = Object.keys(ExpressionDescriptor.locales)[0];
            console.warn("Locale '".concat(this.options.locale, "' could not be found; falling back to '").concat(fallBackLocale, "'."));
            this.options.locale = fallBackLocale;
        }
        this.i18n = ExpressionDescriptor.locales[this.options.locale];
        if (options.use24HourTimeFormat === undefined) {
            options.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault();
        }
    }
    ExpressionDescriptor.toString = function (expression, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.throwExceptionOnParseError, throwExceptionOnParseError = _c === void 0 ? true : _c, _d = _b.verbose, verbose = _d === void 0 ? false : _d, _e = _b.dayOfWeekStartIndexZero, dayOfWeekStartIndexZero = _e === void 0 ? true : _e, _f = _b.monthStartIndexZero, monthStartIndexZero = _f === void 0 ? false : _f, use24HourTimeFormat = _b.use24HourTimeFormat, _g = _b.locale, locale = _g === void 0 ? null : _g, _h = _b.tzOffset, tzOffset = _h === void 0 ? 0 : _h;
        var options = {
            throwExceptionOnParseError: throwExceptionOnParseError,
            verbose: verbose,
            dayOfWeekStartIndexZero: dayOfWeekStartIndexZero,
            monthStartIndexZero: monthStartIndexZero,
            use24HourTimeFormat: use24HourTimeFormat,
            locale: locale,
            tzOffset: tzOffset
        };
        var descripter = new ExpressionDescriptor(expression, options);
        return descripter.getFullDescription();
    };
    ExpressionDescriptor.initialize = function (localesLoader, defaultLocale) {
        if (defaultLocale === void 0) { defaultLocale = "en"; }
        ExpressionDescriptor.specialCharacters = ["/", "-", ",", "*"];
        ExpressionDescriptor.defaultLocale = defaultLocale;
        localesLoader.load(ExpressionDescriptor.locales);
    };
    ExpressionDescriptor.prototype.getFullDescription = function () {
        var description = "";
        try {
            var parser = new cronParser_1.CronParser(this.expression, this.options.dayOfWeekStartIndexZero, this.options.monthStartIndexZero);
            this.expressionParts = parser.parse();
            var timeSegment = this.getTimeOfDayDescription();
            var dayOfMonthDesc = this.getDayOfMonthDescription();
            var monthDesc = this.getMonthDescription();
            var dayOfWeekDesc = this.getDayOfWeekDescription();
            var yearDesc = this.getYearDescription();
            description += timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc;
            description = this.transformVerbosity(description, !!this.options.verbose);
            description = description.charAt(0).toLocaleUpperCase() + description.substr(1);
        }
        catch (ex) {
            if (!this.options.throwExceptionOnParseError) {
                description = this.i18n.anErrorOccuredWhenGeneratingTheExpressionD();
            }
            else {
                throw "".concat(ex);
            }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getTimeOfDayDescription = function () {
        var secondsExpression = this.expressionParts[0];
        var minuteExpression = this.expressionParts[1];
        var hourExpression = this.expressionParts[2];
        var description = "";
        if (!stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters) &&
            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters) &&
            !stringUtilities_1.StringUtilities.containsAny(secondsExpression, ExpressionDescriptor.specialCharacters)) {
            description += this.i18n.atSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
        }
        else if (!secondsExpression &&
            minuteExpression.indexOf("-") > -1 &&
            !(minuteExpression.indexOf(",") > -1) &&
            !(minuteExpression.indexOf("/") > -1) &&
            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters)) {
            var minuteParts = minuteExpression.split("-");
            description += stringUtilities_1.StringUtilities.format(this.i18n.everyMinuteBetweenX0AndX1(), this.formatTime(hourExpression, minuteParts[0], ""), this.formatTime(hourExpression, minuteParts[1], ""));
        }
        else if (!secondsExpression &&
            hourExpression.indexOf(",") > -1 &&
            hourExpression.indexOf("-") == -1 &&
            hourExpression.indexOf("/") == -1 &&
            !stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters)) {
            var hourParts = hourExpression.split(",");
            description += this.i18n.at();
            for (var i = 0; i < hourParts.length; i++) {
                description += " ";
                description += this.formatTime(hourParts[i], minuteExpression, "");
                if (i < hourParts.length - 2) {
                    description += ",";
                }
                if (i == hourParts.length - 2) {
                    description += this.i18n.spaceAnd();
                }
            }
        }
        else {
            var secondsDescription = this.getSecondsDescription();
            var minutesDescription = this.getMinutesDescription();
            var hoursDescription = this.getHoursDescription();
            description += secondsDescription;
            if (description && minutesDescription) {
                description += ", ";
            }
            description += minutesDescription;
            if (minutesDescription === hoursDescription) {
                return description;
            }
            if (description && hoursDescription) {
                description += ", ";
            }
            description += hoursDescription;
        }
        return description;
    };
    ExpressionDescriptor.prototype.getSecondsDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[0], this.i18n.everySecond(), function (s) {
            return s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Seconds(s), s);
        }, function (s) {
            return _this.i18n.secondsX0ThroughX1PastTheMinute();
        }, function (s) {
            return s == "0"
                ? ""
                : parseInt(s) < 20
                    ? _this.i18n.atX0SecondsPastTheMinute(s)
                    : _this.i18n.atX0SecondsPastTheMinuteGt20() || _this.i18n.atX0SecondsPastTheMinute(s);
        });
        return description;
    };
    ExpressionDescriptor.prototype.getMinutesDescription = function () {
        var _this = this;
        var secondsExpression = this.expressionParts[0];
        var hourExpression = this.expressionParts[2];
        var description = this.getSegmentDescription(this.expressionParts[1], this.i18n.everyMinute(), function (s) {
            return s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Minutes(s), s);
        }, function (s) {
            return _this.i18n.minutesX0ThroughX1PastTheHour();
        }, function (s) {
            try {
                return s == "0" && hourExpression.indexOf("/") == -1 && secondsExpression == ""
                    ? _this.i18n.everyHour()
                    : parseInt(s) < 20
                        ? _this.i18n.atX0MinutesPastTheHour(s)
                        : _this.i18n.atX0MinutesPastTheHourGt20() || _this.i18n.atX0MinutesPastTheHour(s);
            }
            catch (e) {
                return _this.i18n.atX0MinutesPastTheHour(s);
            }
        });
        return description;
    };
    ExpressionDescriptor.prototype.getHoursDescription = function () {
        var _this = this;
        var expression = this.expressionParts[2];
        var description = this.getSegmentDescription(expression, this.i18n.everyHour(), function (s) {
            return _this.formatTime(s, "0", "");
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Hours(s), s);
        }, function (s) {
            return _this.i18n.betweenX0AndX1();
        }, function (s) {
            return _this.i18n.atX0();
        });
        if (description && expression.includes("-") && this.expressionParts[1] != "0") {
            var atTheHourMatches = Array.from(description.matchAll(/:00/g));
            if (atTheHourMatches.length > 1) {
                var lastAtTheHourMatchIndex = atTheHourMatches[atTheHourMatches.length - 1].index;
                description =
                    description.substring(0, lastAtTheHourMatchIndex) +
                        ":59" +
                        description.substring(lastAtTheHourMatchIndex + 3);
            }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getDayOfWeekDescription = function () {
        var _this = this;
        var daysOfWeekNames = this.i18n.daysOfTheWeek();
        var description = null;
        if (this.expressionParts[5] == "*") {
            description = "";
        }
        else {
            description = this.getSegmentDescription(this.expressionParts[5], this.i18n.commaEveryDay(), function (s, form) {
                var exp = s;
                if (s.indexOf("#") > -1) {
                    exp = s.substring(0, s.indexOf("#"));
                }
                else if (s.indexOf("L") > -1) {
                    exp = exp.replace("L", "");
                }
                var parsedExp = parseInt(exp);
                if (_this.options.tzOffset) {
                    var hourExpression = _this.expressionParts[2];
                    var hour = parseInt(hourExpression) + (_this.options.tzOffset ? _this.options.tzOffset : 0);
                    if (hour >= 24) {
                        parsedExp++;
                    }
                    else if (hour < 0) {
                        parsedExp--;
                    }
                    if (parsedExp > 6) {
                        parsedExp = 0;
                    }
                    else if (parsedExp < 0) {
                        parsedExp = 6;
                    }
                }
                var description = _this.i18n.daysOfTheWeekInCase
                    ? _this.i18n.daysOfTheWeekInCase(form)[parsedExp]
                    : daysOfWeekNames[parsedExp];
                if (s.indexOf("#") > -1) {
                    var dayOfWeekOfMonthDescription = null;
                    var dayOfWeekOfMonthNumber = s.substring(s.indexOf("#") + 1);
                    var dayOfWeekNumber = s.substring(0, s.indexOf("#"));
                    switch (dayOfWeekOfMonthNumber) {
                        case "1":
                            dayOfWeekOfMonthDescription = _this.i18n.first(dayOfWeekNumber);
                            break;
                        case "2":
                            dayOfWeekOfMonthDescription = _this.i18n.second(dayOfWeekNumber);
                            break;
                        case "3":
                            dayOfWeekOfMonthDescription = _this.i18n.third(dayOfWeekNumber);
                            break;
                        case "4":
                            dayOfWeekOfMonthDescription = _this.i18n.fourth(dayOfWeekNumber);
                            break;
                        case "5":
                            dayOfWeekOfMonthDescription = _this.i18n.fifth(dayOfWeekNumber);
                            break;
                    }
                    description = dayOfWeekOfMonthDescription + " " + description;
                }
                return description;
            }, function (s) {
                if (parseInt(s) == 1) {
                    return "";
                }
                else {
                    return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0DaysOfTheWeek(s), s);
                }
            }, function (s) {
                var beginFrom = s.substring(0, s.indexOf("-"));
                var domSpecified = _this.expressionParts[3] != "*";
                return domSpecified ? _this.i18n.commaAndX0ThroughX1(beginFrom) : _this.i18n.commaX0ThroughX1(beginFrom);
            }, function (s) {
                var format = null;
                if (s.indexOf("#") > -1) {
                    var dayOfWeekOfMonthNumber = s.substring(s.indexOf("#") + 1);
                    format = _this.i18n.commaOnThe(dayOfWeekOfMonthNumber).trim() + _this.i18n.spaceX0OfTheMonth();
                }
                else if (s.indexOf("L") > -1) {
                    format = _this.i18n.commaOnTheLastX0OfTheMonth(s.replace("L", ""));
                }
                else {
                    var domSpecified = _this.expressionParts[3] != "*";
                    format = domSpecified ? _this.i18n.commaAndOnX0() : _this.i18n.commaOnlyOnX0(s);
                }
                return format;
            });
        }
        return description;
    };
    ExpressionDescriptor.prototype.getMonthDescription = function () {
        var _this = this;
        var monthNames = this.i18n.monthsOfTheYear();
        var description = this.getSegmentDescription(this.expressionParts[4], "", function (s, form) {
            return form && _this.i18n.monthsOfTheYearInCase
                ? _this.i18n.monthsOfTheYearInCase(form)[parseInt(s) - 1]
                : monthNames[parseInt(s) - 1];
        }, function (s) {
            if (parseInt(s) == 1) {
                return "";
            }
            else {
                return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Months(s), s);
            }
        }, function (s) {
            return _this.i18n.commaMonthX0ThroughMonthX1() || _this.i18n.commaX0ThroughX1();
        }, function (s) {
            return _this.i18n.commaOnlyInMonthX0 ? _this.i18n.commaOnlyInMonthX0() : _this.i18n.commaOnlyInX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getDayOfMonthDescription = function () {
        var _this = this;
        var description = null;
        var expression = this.expressionParts[3];
        switch (expression) {
            case "L":
                description = this.i18n.commaOnTheLastDayOfTheMonth();
                break;
            case "WL":
            case "LW":
                description = this.i18n.commaOnTheLastWeekdayOfTheMonth();
                break;
            default:
                var weekDayNumberMatches = expression.match(/(\d{1,2}W)|(W\d{1,2})/);
                if (weekDayNumberMatches) {
                    var dayNumber = parseInt(weekDayNumberMatches[0].replace("W", ""));
                    var dayString = dayNumber == 1
                        ? this.i18n.firstWeekday()
                        : stringUtilities_1.StringUtilities.format(this.i18n.weekdayNearestDayX0(), dayNumber.toString());
                    description = stringUtilities_1.StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), dayString);
                    break;
                }
                else {
                    var lastDayOffSetMatches = expression.match(/L-(\d{1,2})/);
                    if (lastDayOffSetMatches) {
                        var offSetDays = lastDayOffSetMatches[1];
                        description = stringUtilities_1.StringUtilities.format(this.i18n.commaDaysBeforeTheLastDayOfTheMonth(offSetDays), offSetDays);
                        break;
                    }
                    else if (expression == "*" && this.expressionParts[5] != "*") {
                        return "";
                    }
                    else {
                        description = this.getSegmentDescription(expression, this.i18n.commaEveryDay(), function (s) {
                            return s == "L"
                                ? _this.i18n.lastDay()
                                : _this.i18n.dayX0
                                    ? stringUtilities_1.StringUtilities.format(_this.i18n.dayX0(), s)
                                    : s;
                        }, function (s) {
                            return s == "1" ? _this.i18n.commaEveryDay() : _this.i18n.commaEveryX0Days(s);
                        }, function (s) {
                            return _this.i18n.commaBetweenDayX0AndX1OfTheMonth(s);
                        }, function (s) {
                            return _this.i18n.commaOnDayX0OfTheMonth(s);
                        });
                    }
                    break;
                }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getYearDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[6], "", function (s) {
            return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Years(s), s);
        }, function (s) {
            return _this.i18n.commaYearX0ThroughYearX1() || _this.i18n.commaX0ThroughX1();
        }, function (s) {
            return _this.i18n.commaOnlyInYearX0 ? _this.i18n.commaOnlyInYearX0() : _this.i18n.commaOnlyInX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getSegmentDescription = function (expression, allDescription, getSingleItemDescription, getIncrementDescriptionFormat, getRangeDescriptionFormat, getDescriptionFormat) {
        var description = null;
        var doesExpressionContainIncrement = expression.indexOf("/") > -1;
        var doesExpressionContainRange = expression.indexOf("-") > -1;
        var doesExpressionContainMultipleValues = expression.indexOf(",") > -1;
        if (!expression) {
            description = "";
        }
        else if (expression === "*") {
            description = allDescription;
        }
        else if (!doesExpressionContainIncrement && !doesExpressionContainRange && !doesExpressionContainMultipleValues) {
            description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), getSingleItemDescription(expression));
        }
        else if (doesExpressionContainMultipleValues) {
            var segments = expression.split(",");
            var descriptionContent = "";
            for (var i = 0; i < segments.length; i++) {
                if (i > 0 && segments.length > 2) {
                    descriptionContent += ",";
                    if (i < segments.length - 1) {
                        descriptionContent += " ";
                    }
                }
                if (i > 0 && segments.length > 1 && (i == segments.length - 1 || segments.length == 2)) {
                    descriptionContent += "".concat(this.i18n.spaceAnd(), " ");
                }
                if (segments[i].indexOf("/") > -1 || segments[i].indexOf("-") > -1) {
                    var isSegmentRangeWithoutIncrement = segments[i].indexOf("-") > -1 && segments[i].indexOf("/") == -1;
                    var currentDescriptionContent = this.getSegmentDescription(segments[i], allDescription, getSingleItemDescription, getIncrementDescriptionFormat, isSegmentRangeWithoutIncrement ? this.i18n.commaX0ThroughX1 : getRangeDescriptionFormat, getDescriptionFormat);
                    if (isSegmentRangeWithoutIncrement) {
                        currentDescriptionContent = currentDescriptionContent.replace(", ", "");
                    }
                    descriptionContent += currentDescriptionContent;
                }
                else if (!doesExpressionContainIncrement) {
                    descriptionContent += getSingleItemDescription(segments[i]);
                }
                else {
                    descriptionContent += this.getSegmentDescription(segments[i], allDescription, getSingleItemDescription, getIncrementDescriptionFormat, getRangeDescriptionFormat, getDescriptionFormat);
                }
            }
            if (!doesExpressionContainIncrement) {
                description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), descriptionContent);
            }
            else {
                description = descriptionContent;
            }
        }
        else if (doesExpressionContainIncrement) {
            var segments = expression.split("/");
            description = stringUtilities_1.StringUtilities.format(getIncrementDescriptionFormat(segments[1]), segments[1]);
            if (segments[0].indexOf("-") > -1) {
                var rangeSegmentDescription = this.generateRangeSegmentDescription(segments[0], getRangeDescriptionFormat, getSingleItemDescription);
                if (rangeSegmentDescription.indexOf(", ") != 0) {
                    description += ", ";
                }
                description += rangeSegmentDescription;
            }
            else if (segments[0].indexOf("*") == -1) {
                var rangeItemDescription = stringUtilities_1.StringUtilities.format(getDescriptionFormat(segments[0]), getSingleItemDescription(segments[0]));
                rangeItemDescription = rangeItemDescription.replace(", ", "");
                description += stringUtilities_1.StringUtilities.format(this.i18n.commaStartingX0(), rangeItemDescription);
            }
        }
        else if (doesExpressionContainRange) {
            description = this.generateRangeSegmentDescription(expression, getRangeDescriptionFormat, getSingleItemDescription);
        }
        return description;
    };
    ExpressionDescriptor.prototype.generateRangeSegmentDescription = function (rangeExpression, getRangeDescriptionFormat, getSingleItemDescription) {
        var description = "";
        var rangeSegments = rangeExpression.split("-");
        var rangeSegment1Description = getSingleItemDescription(rangeSegments[0], 1);
        var rangeSegment2Description = getSingleItemDescription(rangeSegments[1], 2);
        var rangeDescriptionFormat = getRangeDescriptionFormat(rangeExpression);
        description += stringUtilities_1.StringUtilities.format(rangeDescriptionFormat, rangeSegment1Description, rangeSegment2Description);
        return description;
    };
    ExpressionDescriptor.prototype.formatTime = function (hourExpression, minuteExpression, secondExpression) {
        var hourOffset = 0;
        var minuteOffset = 0;
        if (this.options.tzOffset) {
            hourOffset = this.options.tzOffset > 0 ? Math.floor(this.options.tzOffset) : Math.ceil(this.options.tzOffset);
            minuteOffset = (parseFloat((this.options.tzOffset % 1).toFixed(2)));
            if (minuteOffset != 0) {
                minuteOffset *= 60;
            }
        }
        var hour = parseInt(hourExpression) + (hourOffset);
        var minute = parseInt(minuteExpression) + (minuteOffset);
        if (minute >= 60) {
            minute -= 60;
            hour += 1;
        }
        else if (minute < 0) {
            minute += 60;
            hour -= 1;
        }
        if (hour >= 24) {
            hour = hour - 24;
        }
        else if (hour < 0) {
            hour = 24 + hour;
        }
        var period = "";
        var setPeriodBeforeTime = false;
        if (!this.options.use24HourTimeFormat) {
            setPeriodBeforeTime = !!(this.i18n.setPeriodBeforeTime && this.i18n.setPeriodBeforeTime());
            period = setPeriodBeforeTime ? "".concat(this.getPeriod(hour), " ") : " ".concat(this.getPeriod(hour));
            if (hour > 12) {
                hour -= 12;
            }
            if (hour === 0) {
                hour = 12;
            }
        }
        var second = "";
        if (secondExpression) {
            second = ":".concat(("00" + secondExpression).substring(secondExpression.length));
        }
        return "".concat(setPeriodBeforeTime ? period : "").concat(("00" + hour.toString()).substring(hour.toString().length), ":").concat(("00" + minute.toString()).substring(minute.toString().length)).concat(second).concat(!setPeriodBeforeTime ? period : "");
    };
    ExpressionDescriptor.prototype.transformVerbosity = function (description, useVerboseFormat) {
        if (!useVerboseFormat) {
            description = description.replace(new RegExp(", ".concat(this.i18n.everyMinute()), "g"), "");
            description = description.replace(new RegExp(", ".concat(this.i18n.everyHour()), "g"), "");
            description = description.replace(new RegExp(this.i18n.commaEveryDay(), "g"), "");
            description = description.replace(/\, ?$/, "");
        }
        return description;
    };
    ExpressionDescriptor.prototype.getPeriod = function (hour) {
        return hour >= 12 ? (this.i18n.pm && this.i18n.pm()) || "PM" : (this.i18n.am && this.i18n.am()) || "AM";
    };
    ExpressionDescriptor.locales = {};
    return ExpressionDescriptor;
}());
exports.ExpressionDescriptor = ExpressionDescriptor;


/***/ }),

/***/ 980:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bg = exports.my = exports.vi = exports.ar = exports.th = exports.af = exports.hu = exports.be = exports.ca = exports.fa = exports.sw = exports.sl = exports.fi = exports.sk = exports.cs = exports.he = exports.ja = exports.zh_TW = exports.zh_CN = exports.uk = exports.tr = exports.ru = exports.ro = exports.pt_PT = exports.pt_BR = exports.pl = exports.sv = exports.nb = exports.nl = exports.ko = exports.id = exports.it = exports.fr = exports.es = exports.de = exports.da = exports.en = void 0;
var en_1 = __webpack_require__(751);
Object.defineProperty(exports, "en", ({ enumerable: true, get: function () { return en_1.en; } }));
var da_1 = __webpack_require__(904);
Object.defineProperty(exports, "da", ({ enumerable: true, get: function () { return da_1.da; } }));
var de_1 = __webpack_require__(511);
Object.defineProperty(exports, "de", ({ enumerable: true, get: function () { return de_1.de; } }));
var es_1 = __webpack_require__(470);
Object.defineProperty(exports, "es", ({ enumerable: true, get: function () { return es_1.es; } }));
var fr_1 = __webpack_require__(953);
Object.defineProperty(exports, "fr", ({ enumerable: true, get: function () { return fr_1.fr; } }));
var it_1 = __webpack_require__(128);
Object.defineProperty(exports, "it", ({ enumerable: true, get: function () { return it_1.it; } }));
var id_1 = __webpack_require__(258);
Object.defineProperty(exports, "id", ({ enumerable: true, get: function () { return id_1.id; } }));
var ko_1 = __webpack_require__(305);
Object.defineProperty(exports, "ko", ({ enumerable: true, get: function () { return ko_1.ko; } }));
var nl_1 = __webpack_require__(771);
Object.defineProperty(exports, "nl", ({ enumerable: true, get: function () { return nl_1.nl; } }));
var nb_1 = __webpack_require__(869);
Object.defineProperty(exports, "nb", ({ enumerable: true, get: function () { return nb_1.nb; } }));
var sv_1 = __webpack_require__(673);
Object.defineProperty(exports, "sv", ({ enumerable: true, get: function () { return sv_1.sv; } }));
var pl_1 = __webpack_require__(665);
Object.defineProperty(exports, "pl", ({ enumerable: true, get: function () { return pl_1.pl; } }));
var pt_BR_1 = __webpack_require__(461);
Object.defineProperty(exports, "pt_BR", ({ enumerable: true, get: function () { return pt_BR_1.pt_BR; } }));
var pt_PT_1 = __webpack_require__(713);
Object.defineProperty(exports, "pt_PT", ({ enumerable: true, get: function () { return pt_PT_1.pt_PT; } }));
var ro_1 = __webpack_require__(408);
Object.defineProperty(exports, "ro", ({ enumerable: true, get: function () { return ro_1.ro; } }));
var ru_1 = __webpack_require__(392);
Object.defineProperty(exports, "ru", ({ enumerable: true, get: function () { return ru_1.ru; } }));
var tr_1 = __webpack_require__(999);
Object.defineProperty(exports, "tr", ({ enumerable: true, get: function () { return tr_1.tr; } }));
var uk_1 = __webpack_require__(716);
Object.defineProperty(exports, "uk", ({ enumerable: true, get: function () { return uk_1.uk; } }));
var zh_CN_1 = __webpack_require__(419);
Object.defineProperty(exports, "zh_CN", ({ enumerable: true, get: function () { return zh_CN_1.zh_CN; } }));
var zh_TW_1 = __webpack_require__(139);
Object.defineProperty(exports, "zh_TW", ({ enumerable: true, get: function () { return zh_TW_1.zh_TW; } }));
var ja_1 = __webpack_require__(949);
Object.defineProperty(exports, "ja", ({ enumerable: true, get: function () { return ja_1.ja; } }));
var he_1 = __webpack_require__(389);
Object.defineProperty(exports, "he", ({ enumerable: true, get: function () { return he_1.he; } }));
var cs_1 = __webpack_require__(674);
Object.defineProperty(exports, "cs", ({ enumerable: true, get: function () { return cs_1.cs; } }));
var sk_1 = __webpack_require__(203);
Object.defineProperty(exports, "sk", ({ enumerable: true, get: function () { return sk_1.sk; } }));
var fi_1 = __webpack_require__(578);
Object.defineProperty(exports, "fi", ({ enumerable: true, get: function () { return fi_1.fi; } }));
var sl_1 = __webpack_require__(738);
Object.defineProperty(exports, "sl", ({ enumerable: true, get: function () { return sl_1.sl; } }));
var sw_1 = __webpack_require__(286);
Object.defineProperty(exports, "sw", ({ enumerable: true, get: function () { return sw_1.sw; } }));
var fa_1 = __webpack_require__(384);
Object.defineProperty(exports, "fa", ({ enumerable: true, get: function () { return fa_1.fa; } }));
var ca_1 = __webpack_require__(708);
Object.defineProperty(exports, "ca", ({ enumerable: true, get: function () { return ca_1.ca; } }));
var be_1 = __webpack_require__(445);
Object.defineProperty(exports, "be", ({ enumerable: true, get: function () { return be_1.be; } }));
var hu_1 = __webpack_require__(560);
Object.defineProperty(exports, "hu", ({ enumerable: true, get: function () { return hu_1.hu; } }));
var af_1 = __webpack_require__(675);
Object.defineProperty(exports, "af", ({ enumerable: true, get: function () { return af_1.af; } }));
var th_1 = __webpack_require__(312);
Object.defineProperty(exports, "th", ({ enumerable: true, get: function () { return th_1.th; } }));
var ar_1 = __webpack_require__(935);
Object.defineProperty(exports, "ar", ({ enumerable: true, get: function () { return ar_1.ar; } }));
var vi_1 = __webpack_require__(533);
Object.defineProperty(exports, "vi", ({ enumerable: true, get: function () { return vi_1.vi; } }));
var my_1 = __webpack_require__(863);
Object.defineProperty(exports, "my", ({ enumerable: true, get: function () { return my_1.my; } }));
var bg_1 = __webpack_require__(431);
Object.defineProperty(exports, "bg", ({ enumerable: true, get: function () { return bg_1.bg; } }));


/***/ }),

/***/ 282:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.allLocalesLoader = void 0;
var allLocales = __webpack_require__(980);
var allLocalesLoader = (function () {
    function allLocalesLoader() {
    }
    allLocalesLoader.prototype.load = function (availableLocales) {
        for (var property in allLocales) {
            if (allLocales.hasOwnProperty(property)) {
                availableLocales[property] = new allLocales[property]();
            }
        }
    };
    return allLocalesLoader;
}());
exports.allLocalesLoader = allLocalesLoader;


/***/ }),

/***/ 675:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.af = void 0;
var af = (function () {
    function af() {
    }
    af.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    af.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    af.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    af.prototype.commaYearX0ThroughYearX1 = function () {
        return ", jaar %s na %s";
    };
    af.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    af.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Daar was 'n fout om die tydsuitdrukking the genereer. Raadpleeg asb die uitdrukking formaat.";
    };
    af.prototype.everyMinute = function () {
        return "elke minuut";
    };
    af.prototype.everyHour = function () {
        return "elke uur";
    };
    af.prototype.atSpace = function () {
        return "Teen ";
    };
    af.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Elke minuut tussen %s en %s";
    };
    af.prototype.at = function () {
        return "Teen";
    };
    af.prototype.spaceAnd = function () {
        return " en";
    };
    af.prototype.everySecond = function () {
        return "elke sekonde";
    };
    af.prototype.everyX0Seconds = function () {
        return "elke %s sekonde";
    };
    af.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekonde %s deur na %s na die minuut";
    };
    af.prototype.atX0SecondsPastTheMinute = function () {
        return "teen %s sekondes na die minuut";
    };
    af.prototype.everyX0Minutes = function () {
        return "elke %s minute";
    };
    af.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minute %s deur na %s na die uur";
    };
    af.prototype.atX0MinutesPastTheHour = function () {
        return "teen %s minute na die uur";
    };
    af.prototype.everyX0Hours = function () {
        return "elke %s ure";
    };
    af.prototype.betweenX0AndX1 = function () {
        return "tussen %s en %s";
    };
    af.prototype.atX0 = function () {
        return "teen %s";
    };
    af.prototype.commaEveryDay = function () {
        return ", elke dag";
    };
    af.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", elke %s dae van die week";
    };
    af.prototype.commaX0ThroughX1 = function () {
        return ", %s deur na %s";
    };
    af.prototype.commaAndX0ThroughX1 = function () {
        return ", en %s deur na %s";
    };
    af.prototype.first = function () {
        return "eerste";
    };
    af.prototype.second = function () {
        return "tweede";
    };
    af.prototype.third = function () {
        return "derde";
    };
    af.prototype.fourth = function () {
        return "vierde";
    };
    af.prototype.fifth = function () {
        return "vyfde";
    };
    af.prototype.commaOnThe = function () {
        return ", op die ";
    };
    af.prototype.spaceX0OfTheMonth = function () {
        return " %s van die maand";
    };
    af.prototype.lastDay = function () {
        return "die laaste dag";
    };
    af.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", op die laaste %s van die maand";
    };
    af.prototype.commaOnlyOnX0 = function () {
        return ", net op %s";
    };
    af.prototype.commaAndOnX0 = function () {
        return ", en op %s";
    };
    af.prototype.commaEveryX0Months = function () {
        return ", elke %s maande";
    };
    af.prototype.commaOnlyInX0 = function () {
        return ", net in %s";
    };
    af.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", op die laaste dag van die maand";
    };
    af.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", op die laaste weeksdag van die maand";
    };
    af.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dae voor die laaste dag van die maand";
    };
    af.prototype.firstWeekday = function () {
        return "eerste weeksdag";
    };
    af.prototype.weekdayNearestDayX0 = function () {
        return "weeksdag naaste aan dag %s";
    };
    af.prototype.commaOnTheX0OfTheMonth = function () {
        return ", op die %s van die maande";
    };
    af.prototype.commaEveryX0Days = function () {
        return ", elke %s dae";
    };
    af.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", tussen dag %s en %s van die maand";
    };
    af.prototype.commaOnDayX0OfTheMonth = function () {
        return ", op dag %s van die maand";
    };
    af.prototype.commaEveryHour = function () {
        return ", elke uur";
    };
    af.prototype.commaEveryX0Years = function () {
        return ", elke %s jare";
    };
    af.prototype.commaStartingX0 = function () {
        return ", beginnende %s";
    };
    af.prototype.daysOfTheWeek = function () {
        return ["Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag"];
    };
    af.prototype.monthsOfTheYear = function () {
        return [
            "Januarie",
            "Februarie",
            "Maart",
            "April",
            "Mei",
            "Junie",
            "Julie",
            "Augustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
    };
    return af;
}());
exports.af = af;


/***/ }),

/***/ 935:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ar = void 0;
var ar = (function () {
    function ar() {
    }
    ar.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ar.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ar.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ar.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ar.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    ar.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "حدث خطأ في إنشاء وصف المصطلح٠ تأكد من تركيب مصطلح الكرون";
    };
    ar.prototype.everyMinute = function () {
        return "كل دقيقة";
    };
    ar.prototype.everyHour = function () {
        return "كل ساعة";
    };
    ar.prototype.atSpace = function () {
        return " ";
    };
    ar.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "كل دقيقة بين %s و %s";
    };
    ar.prototype.at = function () {
        return "";
    };
    ar.prototype.spaceAnd = function () {
        return " و";
    };
    ar.prototype.everySecond = function () {
        return "كل ثانية";
    };
    ar.prototype.everyX0Seconds = function () {
        return "كل %s ثواني";
    };
    ar.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "الثواني %s حتى %s من بداية الدقيقة";
    };
    ar.prototype.atX0SecondsPastTheMinute = function () {
        return "الثانية %s من بداية الدقيقة";
    };
    ar.prototype.everyX0Minutes = function () {
        return "كل %s دقائق";
    };
    ar.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "الدقائق %s حتى %s من بداية الساعة";
    };
    ar.prototype.atX0MinutesPastTheHour = function () {
        return "الدقيقة %s من بداية الساعة";
    };
    ar.prototype.everyX0Hours = function () {
        return "كل %s ساعات";
    };
    ar.prototype.betweenX0AndX1 = function () {
        return "بين %s و %s";
    };
    ar.prototype.atX0 = function () {
        return "%s";
    };
    ar.prototype.commaEveryDay = function () {
        return "، كل يوم";
    };
    ar.prototype.commaEveryX0DaysOfTheWeek = function () {
        return "، كل %s من أيام الأسبوع";
    };
    ar.prototype.commaX0ThroughX1 = function () {
        return "، %s حتى %s";
    };
    ar.prototype.commaAndX0ThroughX1 = function () {
        return "، و %s حتى %s";
    };
    ar.prototype.first = function () {
        return "أول";
    };
    ar.prototype.second = function () {
        return "ثاني";
    };
    ar.prototype.third = function () {
        return "ثالث";
    };
    ar.prototype.fourth = function () {
        return "رابع";
    };
    ar.prototype.fifth = function () {
        return "خامس";
    };
    ar.prototype.commaOnThe = function () {
        return "، في ال";
    };
    ar.prototype.spaceX0OfTheMonth = function () {
        return " %s من الشهر";
    };
    ar.prototype.lastDay = function () {
        return "اليوم الأخير";
    };
    ar.prototype.commaOnTheLastX0OfTheMonth = function () {
        return "، في اخر %s من الشهر";
    };
    ar.prototype.commaOnlyOnX0 = function () {
        return "، %s فقط";
    };
    ar.prototype.commaAndOnX0 = function () {
        return "، وفي %s";
    };
    ar.prototype.commaEveryX0Months = function () {
        return "، كل %s أشهر";
    };
    ar.prototype.commaOnlyInX0 = function () {
        return "، %s فقط";
    };
    ar.prototype.commaOnTheLastDayOfTheMonth = function () {
        return "، في اخر يوم من الشهر";
    };
    ar.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return "، في اخر يوم أسبوع من الشهر";
    };
    ar.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return "، %s أيام قبل اخر يوم من الشهر";
    };
    ar.prototype.firstWeekday = function () {
        return "اول ايام الأسبوع";
    };
    ar.prototype.weekdayNearestDayX0 = function () {
        return "يوم الأسبوع الأقرب ليوم %s";
    };
    ar.prototype.commaOnTheX0OfTheMonth = function () {
        return "، في %s من الشهر";
    };
    ar.prototype.commaEveryX0Days = function () {
        return "، كل %s أيام";
    };
    ar.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return "، بين يوم %s و %s من الشهر";
    };
    ar.prototype.commaOnDayX0OfTheMonth = function () {
        return "، في اليوم %s من الشهر";
    };
    ar.prototype.commaEveryHour = function () {
        return "، كل ساعة";
    };
    ar.prototype.commaEveryX0Years = function () {
        return "، كل %s سنوات";
    };
    ar.prototype.commaStartingX0 = function () {
        return "، بداية من %s";
    };
    ar.prototype.daysOfTheWeek = function () {
        return ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    };
    ar.prototype.monthsOfTheYear = function () {
        return [
            "يناير",
            "فبراير",
            "مارس",
            "ابريل",
            "مايو",
            "يونيو",
            "يوليو",
            "أغسطس",
            "سبتمبر",
            "أكتوبر",
            "نوفمبر",
            "ديسمبر",
        ];
    };
    return ar;
}());
exports.ar = ar;


/***/ }),

/***/ 445:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.be = void 0;
var be = (function () {
    function be() {
    }
    be.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    be.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    be.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    be.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    be.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    be.prototype.everyMinute = function () {
        return "кожную хвіліну";
    };
    be.prototype.everyHour = function () {
        return "кожную гадзіну";
    };
    be.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Адбылася памылка падчас генерацыі апісання выразы. Праверце сінтаксіс крон-выразы.";
    };
    be.prototype.atSpace = function () {
        return "У ";
    };
    be.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Кожную хвіліну з %s да %s";
    };
    be.prototype.at = function () {
        return "У";
    };
    be.prototype.spaceAnd = function () {
        return " і";
    };
    be.prototype.everySecond = function () {
        return "кожную секунду";
    };
    be.prototype.everyX0Seconds = function () {
        return "кожныя %s секунд";
    };
    be.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "секунды з %s па %s";
    };
    be.prototype.atX0SecondsPastTheMinute = function () {
        return "у %s секунд";
    };
    be.prototype.everyX0Minutes = function () {
        return "кожныя %s хвілін";
    };
    be.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "хвіліны з %s па %s";
    };
    be.prototype.atX0MinutesPastTheHour = function () {
        return "у %s хвілін";
    };
    be.prototype.everyX0Hours = function () {
        return "кожныя %s гадзін";
    };
    be.prototype.betweenX0AndX1 = function () {
        return "з %s па %s";
    };
    be.prototype.atX0 = function () {
        return "у %s";
    };
    be.prototype.commaEveryDay = function () {
        return ", кожны дзень";
    };
    be.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", кожныя %s дзён тыдня";
    };
    be.prototype.commaX0ThroughX1 = function () {
        return ", %s па %s";
    };
    be.prototype.commaAndX0ThroughX1 = function () {
        return ", і %s па %s";
    };
    be.prototype.first = function () {
        return "першы";
    };
    be.prototype.second = function () {
        return "другі";
    };
    be.prototype.third = function () {
        return "трэці";
    };
    be.prototype.fourth = function () {
        return "чацвёрты";
    };
    be.prototype.fifth = function () {
        return "пяты";
    };
    be.prototype.commaOnThe = function () {
        return ", у ";
    };
    be.prototype.spaceX0OfTheMonth = function () {
        return " %s месяца";
    };
    be.prototype.lastDay = function () {
        return "апошні дзень";
    };
    be.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", у апошні %s месяца";
    };
    be.prototype.commaOnlyOnX0 = function () {
        return ", толькі ў %s";
    };
    be.prototype.commaAndOnX0 = function () {
        return ", і ў %s";
    };
    be.prototype.commaEveryX0Months = function () {
        return ", кожныя %s месяцаў";
    };
    be.prototype.commaOnlyInX0 = function () {
        return ", толькі ў %s";
    };
    be.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", у апошні дзень месяца";
    };
    be.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", у апошні будні дзень месяца";
    };
    be.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s дзён да апошняга дня месяца";
    };
    be.prototype.firstWeekday = function () {
        return "першы будны дзень";
    };
    be.prototype.weekdayNearestDayX0 = function () {
        return "найбліжэйшы будны дзень да %s";
    };
    be.prototype.commaOnTheX0OfTheMonth = function () {
        return ", у %s месяцы";
    };
    be.prototype.commaEveryX0Days = function () {
        return ", кожныя %s дзён";
    };
    be.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", з %s па %s лік месяца";
    };
    be.prototype.commaOnDayX0OfTheMonth = function () {
        return ", у %s лік месяца";
    };
    be.prototype.commaEveryX0Years = function () {
        return ", кожныя %s гадоў";
    };
    be.prototype.commaStartingX0 = function () {
        return ", пачатак %s";
    };
    be.prototype.daysOfTheWeek = function () {
        return ["нядзеля", "панядзелак", "аўторак", "серада", "чацвер", "пятніца", "субота"];
    };
    be.prototype.monthsOfTheYear = function () {
        return [
            "студзень",
            "люты",
            "сакавік",
            "красавік",
            "травень",
            "чэрвень",
            "ліпень",
            "жнівень",
            "верасень",
            "кастрычнік",
            "лістапад",
            "снежань",
        ];
    };
    return be;
}());
exports.be = be;


/***/ }),

/***/ 431:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bg = void 0;
var getPhraseByPlural = function (str, words) {
    var strAsNumber = str != null ? Number(str) : 0;
    return strAsNumber < 2 ? words[0] : words[1];
};
var getPhraseByDayOfWeek = function (str, words) {
    var strAsNumber = str != null ? Number(str) : 0;
    return words[[1, 0, 0, 1, 0, 0, 1][strAsNumber]];
};
var getNumberEnding = function (str, gender) {
    var strAsNumber = str != null ? Number(str) : 1;
    strAsNumber = Math.max(Math.min(strAsNumber < 10 || (strAsNumber > 20 && strAsNumber % 10 !== 0) ? strAsNumber % 10 : 3, 3), 1) - 1;
    var genderIndex = ['м', 'ж', 'ср'].indexOf(gender);
    return ['в', 'р', 'т'][strAsNumber] + ['и', 'а', 'о'][genderIndex];
};
var bg = (function () {
    function bg() {
    }
    bg.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    bg.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    bg.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    bg.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    bg.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    bg.prototype.everyMinute = function () {
        return 'всяка минута';
    };
    bg.prototype.everyHour = function () {
        return 'всеки час';
    };
    bg.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return 'Възникна грешка при генериране на описанието на израза. Проверете синтаксиса на cron израза.';
    };
    bg.prototype.atSpace = function () {
        return 'В ';
    };
    bg.prototype.everyMinuteBetweenX0AndX1 = function () {
        return 'Всяка минута от %s до %s';
    };
    bg.prototype.at = function () {
        return 'В';
    };
    bg.prototype.spaceAnd = function () {
        return ' и';
    };
    bg.prototype.everySecond = function () {
        return 'всяка секунда';
    };
    bg.prototype.everyX0Seconds = function (s) {
        return 'всеки %s секунди';
    };
    bg.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return 'секунди от %s до %s';
    };
    bg.prototype.atX0SecondsPastTheMinute = function (s) {
        return "%s-".concat(getNumberEnding(s, 'ж'), " \u0441\u0435\u043A\u0443\u043D\u0434\u0430");
    };
    bg.prototype.everyX0Minutes = function (s) {
        return 'всеки %s минути';
    };
    bg.prototype.minutesX0ThroughX1PastTheHour = function () {
        return 'минути от %s до %s';
    };
    bg.prototype.atX0MinutesPastTheHour = function (s) {
        return "%s-".concat(getNumberEnding(s, 'ж'), " \u043C\u0438\u043D\u0443\u0442a");
    };
    bg.prototype.everyX0Hours = function (s) {
        return 'всеки %s часа';
    };
    bg.prototype.betweenX0AndX1 = function () {
        return 'от %s до %s';
    };
    bg.prototype.atX0 = function () {
        return 'в %s';
    };
    bg.prototype.commaEveryDay = function () {
        return ', всеки ден';
    };
    bg.prototype.commaEveryX0DaysOfTheWeek = function (s) {
        return getPhraseByPlural(s, [', всеки %s ден от седмицата', ', всеки %s дена от седмицата']);
    };
    bg.prototype.commaX0ThroughX1 = function (s) {
        return ', от %s до %s';
    };
    bg.prototype.commaAndX0ThroughX1 = function (s) {
        return ' и от %s до %s';
    };
    bg.prototype.first = function (s) {
        return getPhraseByDayOfWeek(s, ['первият', 'первата']);
    };
    bg.prototype.second = function (s) {
        return getPhraseByDayOfWeek(s, ['вторият', 'втората']);
    };
    bg.prototype.third = function (s) {
        return getPhraseByDayOfWeek(s, ['третият', 'третата']);
    };
    bg.prototype.fourth = function (s) {
        return getPhraseByDayOfWeek(s, ['четвертият', 'четвертата']);
    };
    bg.prototype.fifth = function (s) {
        return getPhraseByDayOfWeek(s, ['петият', 'петата']);
    };
    bg.prototype.commaOnThe = function (s) {
        return ', ';
    };
    bg.prototype.spaceX0OfTheMonth = function () {
        return ' %s на месеца';
    };
    bg.prototype.lastDay = function () {
        return 'последният ден';
    };
    bg.prototype.commaOnTheLastX0OfTheMonth = function (s) {
        return getPhraseByDayOfWeek(s, [', в последният %s от месеца', ', в последната %s отмесеца']);
    };
    bg.prototype.commaOnlyOnX0 = function (s) {
        return ', %s';
    };
    bg.prototype.commaAndOnX0 = function () {
        return ' и %s';
    };
    bg.prototype.commaEveryX0Months = function (s) {
        return ' всеки %s месеца';
    };
    bg.prototype.commaOnlyInMonthX0 = function () {
        return ', %s';
    };
    bg.prototype.commaOnlyInX0 = function () {
        return ', в %s';
    };
    bg.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ', в последният ден на месеца';
    };
    bg.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ', в последния делничен ден от месеца';
    };
    bg.prototype.commaDaysBeforeTheLastDayOfTheMonth = function (s) {
        return getPhraseByPlural(s, [', %s ден преди края на месеца', ', %s дена преди края на месеца']);
    };
    bg.prototype.firstWeekday = function () {
        return 'първият делничен ден';
    };
    bg.prototype.weekdayNearestDayX0 = function () {
        return 'най-близкият делничен ден до %s число';
    };
    bg.prototype.commaOnTheX0OfTheMonth = function () {
        return ', на %s число от месеца';
    };
    bg.prototype.commaEveryX0Days = function (s) {
        return getPhraseByPlural(s, [', всеки %s ден', ', всеки %s дена']);
    };
    bg.prototype.commaBetweenDayX0AndX1OfTheMonth = function (s) {
        var _a;
        var values = (_a = s === null || s === void 0 ? void 0 : s.split('-')) !== null && _a !== void 0 ? _a : [];
        return ", \u043E\u0442 %s-".concat(getNumberEnding(values[0], 'ср'), " \u0434\u043E %s-").concat(getNumberEnding(values[1], 'ср'), " \u0447\u0438\u0441\u043B\u043E \u043D\u0430 \u043C\u0435\u0441\u0435\u0446\u0430");
    };
    bg.prototype.commaOnDayX0OfTheMonth = function (s) {
        return ", \u043D\u0430 %s-".concat(getNumberEnding(s, 'ср'), " \u0447\u0438\u0441\u043B\u043E \u043E\u0442 \u043C\u0435\u0441\u0435\u0446\u0430");
    };
    bg.prototype.commaEveryX0Years = function (s) {
        return getPhraseByPlural(s, [', всяка %s година', ', всеки %s години']);
    };
    bg.prototype.commaStartingX0 = function () {
        return ', започвайки %s';
    };
    bg.prototype.daysOfTheWeek = function () {
        return ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота'];
    };
    bg.prototype.monthsOfTheYear = function () {
        return ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септевмври', 'октомври', 'ноември', 'декември'];
    };
    return bg;
}());
exports.bg = bg;


/***/ }),

/***/ 708:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ca = void 0;
var ca = (function () {
    function ca() {
    }
    ca.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ca.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ca.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ca.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ca.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    ca.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "S'ha produït un error mentres es generava la descripció de l'expressió. Revisi la sintaxi de la expressió de cron.";
    };
    ca.prototype.at = function () {
        return "A les";
    };
    ca.prototype.atSpace = function () {
        return "A les ";
    };
    ca.prototype.atX0 = function () {
        return "a les %s";
    };
    ca.prototype.atX0MinutesPastTheHour = function () {
        return "als %s minuts de l'hora";
    };
    ca.prototype.atX0SecondsPastTheMinute = function () {
        return "als %s segonds del minut";
    };
    ca.prototype.betweenX0AndX1 = function () {
        return "entre les %s i les %s";
    };
    ca.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre els dies %s i %s del mes";
    };
    ca.prototype.commaEveryDay = function () {
        return ", cada dia";
    };
    ca.prototype.commaEveryX0Days = function () {
        return ", cada %s dies";
    };
    ca.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", cada %s dies de la setmana";
    };
    ca.prototype.commaEveryX0Months = function () {
        return ", cada %s mesos";
    };
    ca.prototype.commaOnDayX0OfTheMonth = function () {
        return ", el dia %s del mes";
    };
    ca.prototype.commaOnlyInX0 = function () {
        return ", sólo en %s";
    };
    ca.prototype.commaOnlyOnX0 = function () {
        return ", només el %s";
    };
    ca.prototype.commaAndOnX0 = function () {
        return ", i el %s";
    };
    ca.prototype.commaOnThe = function () {
        return ", en el ";
    };
    ca.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", en l'últim dia del mes";
    };
    ca.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", en l'últim dia de la setmana del mes";
    };
    ca.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dies abans de l'últim dia del mes";
    };
    ca.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", en l'últim %s del mes";
    };
    ca.prototype.commaOnTheX0OfTheMonth = function () {
        return ", en el %s del mes";
    };
    ca.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    ca.prototype.commaAndX0ThroughX1 = function () {
        return ", i de %s a %s";
    };
    ca.prototype.everyHour = function () {
        return "cada hora";
    };
    ca.prototype.everyMinute = function () {
        return "cada minut";
    };
    ca.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "cada minut entre les %s i les %s";
    };
    ca.prototype.everySecond = function () {
        return "cada segon";
    };
    ca.prototype.everyX0Hours = function () {
        return "cada %s hores";
    };
    ca.prototype.everyX0Minutes = function () {
        return "cada %s minuts";
    };
    ca.prototype.everyX0Seconds = function () {
        return "cada %s segons";
    };
    ca.prototype.fifth = function () {
        return "cinquè";
    };
    ca.prototype.first = function () {
        return "primer";
    };
    ca.prototype.firstWeekday = function () {
        return "primer dia de la setmana";
    };
    ca.prototype.fourth = function () {
        return "quart";
    };
    ca.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "del minut %s al %s passada l'hora";
    };
    ca.prototype.second = function () {
        return "segon";
    };
    ca.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "En els segons %s al %s de cada minut";
    };
    ca.prototype.spaceAnd = function () {
        return " i";
    };
    ca.prototype.spaceX0OfTheMonth = function () {
        return " %s del mes";
    };
    ca.prototype.lastDay = function () {
        return "l'últim dia";
    };
    ca.prototype.third = function () {
        return "tercer";
    };
    ca.prototype.weekdayNearestDayX0 = function () {
        return "dia de la setmana més proper al %s";
    };
    ca.prototype.commaEveryX0Years = function () {
        return ", cada %s anys";
    };
    ca.prototype.commaStartingX0 = function () {
        return ", començant %s";
    };
    ca.prototype.daysOfTheWeek = function () {
        return ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"];
    };
    ca.prototype.monthsOfTheYear = function () {
        return [
            "gener",
            "febrer",
            "març",
            "abril",
            "maig",
            "juny",
            "juliol",
            "agost",
            "setembre",
            "octubre",
            "novembre",
            "desembre",
        ];
    };
    return ca;
}());
exports.ca = ca;


/***/ }),

/***/ 674:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cs = void 0;
var cs = (function () {
    function cs() {
    }
    cs.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    cs.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    cs.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    cs.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    cs.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    cs.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Při vytváření popisu došlo k chybě. Zkontrolujte prosím správnost syntaxe cronu.";
    };
    cs.prototype.everyMinute = function () {
        return "každou minutu";
    };
    cs.prototype.everyHour = function () {
        return "každou hodinu";
    };
    cs.prototype.atSpace = function () {
        return "V ";
    };
    cs.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Každou minutu mezi %s a %s";
    };
    cs.prototype.at = function () {
        return "V";
    };
    cs.prototype.spaceAnd = function () {
        return " a";
    };
    cs.prototype.everySecond = function () {
        return "každou sekundu";
    };
    cs.prototype.everyX0Seconds = function () {
        return "každých %s sekund";
    };
    cs.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    cs.prototype.atX0SecondsPastTheMinute = function () {
        return "v %s sekund";
    };
    cs.prototype.everyX0Minutes = function () {
        return "každých %s minut";
    };
    cs.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuty od %s do %s";
    };
    cs.prototype.atX0MinutesPastTheHour = function () {
        return "v %s minut";
    };
    cs.prototype.everyX0Hours = function () {
        return "každých %s hodin";
    };
    cs.prototype.betweenX0AndX1 = function () {
        return "mezi %s a %s";
    };
    cs.prototype.atX0 = function () {
        return "v %s";
    };
    cs.prototype.commaEveryDay = function () {
        return ", každý den";
    };
    cs.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", každých %s dní v týdnu";
    };
    cs.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    cs.prototype.commaAndX0ThroughX1 = function () {
        return ", a od %s do %s";
    };
    cs.prototype.first = function () {
        return "první";
    };
    cs.prototype.second = function () {
        return "druhý";
    };
    cs.prototype.third = function () {
        return "třetí";
    };
    cs.prototype.fourth = function () {
        return "čtvrtý";
    };
    cs.prototype.fifth = function () {
        return "pátý";
    };
    cs.prototype.commaOnThe = function () {
        return ", ";
    };
    cs.prototype.spaceX0OfTheMonth = function () {
        return " %s v měsíci";
    };
    cs.prototype.lastDay = function () {
        return "poslední den";
    };
    cs.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", poslední %s v měsíci";
    };
    cs.prototype.commaOnlyOnX0 = function () {
        return ", pouze v %s";
    };
    cs.prototype.commaAndOnX0 = function () {
        return ", a v %s";
    };
    cs.prototype.commaEveryX0Months = function () {
        return ", každých %s měsíců";
    };
    cs.prototype.commaOnlyInX0 = function () {
        return ", pouze v %s";
    };
    cs.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", poslední den v měsíci";
    };
    cs.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", poslední pracovní den v měsíci";
    };
    cs.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dní před posledním dnem v měsíci";
    };
    cs.prototype.firstWeekday = function () {
        return "první pracovní den";
    };
    cs.prototype.weekdayNearestDayX0 = function () {
        return "pracovní den nejblíže %s. dni";
    };
    cs.prototype.commaOnTheX0OfTheMonth = function () {
        return ", v %s v měsíci";
    };
    cs.prototype.commaEveryX0Days = function () {
        return ", každých %s dnů";
    };
    cs.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mezi dny %s a %s v měsíci";
    };
    cs.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. den v měsíci";
    };
    cs.prototype.commaEveryX0Years = function () {
        return ", každých %s roků";
    };
    cs.prototype.commaStartingX0 = function () {
        return ", začínající %s";
    };
    cs.prototype.daysOfTheWeek = function () {
        return ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
    };
    cs.prototype.monthsOfTheYear = function () {
        return [
            "Leden",
            "Únor",
            "Březen",
            "Duben",
            "Květen",
            "Červen",
            "Červenec",
            "Srpen",
            "Září",
            "Říjen",
            "Listopad",
            "Prosinec",
        ];
    };
    return cs;
}());
exports.cs = cs;


/***/ }),

/***/ 904:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.da = void 0;
var da = (function () {
    function da() {
    }
    da.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    da.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Der opstod en fejl ved generering af udtryksbeskrivelsen. Tjek cron-ekspressionssyntaxen.";
    };
    da.prototype.at = function () {
        return "kl";
    };
    da.prototype.atSpace = function () {
        return "kl ";
    };
    da.prototype.atX0 = function () {
        return "kl %s";
    };
    da.prototype.atX0MinutesPastTheHour = function () {
        return "%s minutter efter timeskift";
    };
    da.prototype.atX0SecondsPastTheMinute = function () {
        return "%s sekunder efter minutskift";
    };
    da.prototype.betweenX0AndX1 = function () {
        return "mellem %s og %s";
    };
    da.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellem dag %s og %s i måneden";
    };
    da.prototype.commaEveryDay = function () {
        return ", hver dag";
    };
    da.prototype.commaEveryX0Days = function () {
        return ", hver %s. dag";
    };
    da.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", hver %s. ugedag";
    };
    da.prototype.commaEveryX0Months = function () {
        return ", hver %s. måned";
    };
    da.prototype.commaEveryX0Years = function () {
        return ", hvert %s. år";
    };
    da.prototype.commaOnDayX0OfTheMonth = function () {
        return ", på dag %s i måneden";
    };
    da.prototype.commaOnlyInX0 = function () {
        return ", kun i %s";
    };
    da.prototype.commaOnlyOnX0 = function () {
        return ", kun på %s";
    };
    da.prototype.commaAndOnX0 = function () {
        return ", og på %s";
    };
    da.prototype.commaOnThe = function () {
        return ", på den ";
    };
    da.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", på den sidste dag i måneden";
    };
    da.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", på den sidste hverdag i måneden";
    };
    da.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dage før den sidste dag i måneden";
    };
    da.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", på den sidste %s i måneden";
    };
    da.prototype.commaOnTheX0OfTheMonth = function () {
        return ", på den %s i måneden";
    };
    da.prototype.commaX0ThroughX1 = function () {
        return ", %s til og med %s";
    };
    da.prototype.commaAndX0ThroughX1 = function () {
        return ", og %s til og med %s";
    };
    da.prototype.everyHour = function () {
        return "hver time";
    };
    da.prototype.everyMinute = function () {
        return "hvert minut";
    };
    da.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "hvert minut mellem %s og %s";
    };
    da.prototype.everySecond = function () {
        return "hvert sekund";
    };
    da.prototype.everyX0Hours = function () {
        return "hver %s. time";
    };
    da.prototype.everyX0Minutes = function () {
        return "hvert %s. minut";
    };
    da.prototype.everyX0Seconds = function () {
        return "hvert %s. sekund";
    };
    da.prototype.fifth = function () {
        return "femte";
    };
    da.prototype.first = function () {
        return "første";
    };
    da.prototype.firstWeekday = function () {
        return "første hverdag";
    };
    da.prototype.fourth = function () {
        return "fjerde";
    };
    da.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutterne fra %s til og med %s hver time";
    };
    da.prototype.second = function () {
        return "anden";
    };
    da.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunderne fra %s til og med %s hvert minut";
    };
    da.prototype.spaceAnd = function () {
        return " og";
    };
    da.prototype.spaceX0OfTheMonth = function () {
        return " %s i måneden";
    };
    da.prototype.lastDay = function () {
        return "sidste dag";
    };
    da.prototype.third = function () {
        return "tredje";
    };
    da.prototype.weekdayNearestDayX0 = function () {
        return "hverdag nærmest dag %s";
    };
    da.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    da.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    da.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    da.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    da.prototype.commaStartingX0 = function () {
        return ", startende %s";
    };
    da.prototype.daysOfTheWeek = function () {
        return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    };
    da.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "marts",
            "april",
            "maj",
            "juni",
            "juli",
            "august",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return da;
}());
exports.da = da;


/***/ }),

/***/ 511:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.de = void 0;
var de = (function () {
    function de() {
    }
    de.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    de.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    de.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    de.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    de.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    de.prototype.everyMinute = function () {
        return "jede Minute";
    };
    de.prototype.everyHour = function () {
        return "jede Stunde";
    };
    de.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Beim Generieren der Ausdrucksbeschreibung ist ein Fehler aufgetreten. Überprüfen Sie die Syntax des Cron-Ausdrucks.";
    };
    de.prototype.atSpace = function () {
        return "Um ";
    };
    de.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Jede Minute zwischen %s und %s";
    };
    de.prototype.at = function () {
        return "Um";
    };
    de.prototype.spaceAnd = function () {
        return " und";
    };
    de.prototype.everySecond = function () {
        return "Jede Sekunde";
    };
    de.prototype.everyX0Seconds = function () {
        return "alle %s Sekunden";
    };
    de.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "Sekunden %s bis %s";
    };
    de.prototype.atX0SecondsPastTheMinute = function () {
        return "bei Sekunde %s";
    };
    de.prototype.everyX0Minutes = function () {
        return "alle %s Minuten";
    };
    de.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "Minuten %s bis %s";
    };
    de.prototype.atX0MinutesPastTheHour = function () {
        return "bei Minute %s";
    };
    de.prototype.everyX0Hours = function () {
        return "alle %s Stunden";
    };
    de.prototype.betweenX0AndX1 = function () {
        return "zwischen %s und %s";
    };
    de.prototype.atX0 = function () {
        return "um %s";
    };
    de.prototype.commaEveryDay = function () {
        return ", jeden Tag";
    };
    de.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", alle %s Tage der Woche";
    };
    de.prototype.commaX0ThroughX1 = function () {
        return ", %s bis %s";
    };
    de.prototype.commaAndX0ThroughX1 = function () {
        return ", und %s bis %s";
    };
    de.prototype.first = function () {
        return "ersten";
    };
    de.prototype.second = function () {
        return "zweiten";
    };
    de.prototype.third = function () {
        return "dritten";
    };
    de.prototype.fourth = function () {
        return "vierten";
    };
    de.prototype.fifth = function () {
        return "fünften";
    };
    de.prototype.commaOnThe = function () {
        return ", am ";
    };
    de.prototype.spaceX0OfTheMonth = function () {
        return " %s des Monats";
    };
    de.prototype.lastDay = function () {
        return "der letzte Tag";
    };
    de.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", am letzten %s des Monats";
    };
    de.prototype.commaOnlyOnX0 = function () {
        return ", nur jeden %s";
    };
    de.prototype.commaAndOnX0 = function () {
        return ", und jeden %s";
    };
    de.prototype.commaEveryX0Months = function () {
        return ", alle %s Monate";
    };
    de.prototype.commaOnlyInX0 = function () {
        return ", nur im %s";
    };
    de.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", am letzten Tag des Monats";
    };
    de.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", am letzten Werktag des Monats";
    };
    de.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s tage vor dem letzten Tag des Monats";
    };
    de.prototype.firstWeekday = function () {
        return "ersten Werktag";
    };
    de.prototype.weekdayNearestDayX0 = function () {
        return "Werktag am nächsten zum %s Tag";
    };
    de.prototype.commaOnTheX0OfTheMonth = function () {
        return ", am %s des Monats";
    };
    de.prototype.commaEveryX0Days = function () {
        return ", alle %s Tage";
    };
    de.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", zwischen Tag %s und %s des Monats";
    };
    de.prototype.commaOnDayX0OfTheMonth = function () {
        return ", an Tag %s des Monats";
    };
    de.prototype.commaEveryX0Years = function () {
        return ", alle %s Jahre";
    };
    de.prototype.commaStartingX0 = function () {
        return ", beginnend %s";
    };
    de.prototype.daysOfTheWeek = function () {
        return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    };
    de.prototype.monthsOfTheYear = function () {
        return [
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember",
        ];
    };
    return de;
}());
exports.de = de;


/***/ }),

/***/ 751:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.en = void 0;
var en = (function () {
    function en() {
    }
    en.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    en.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    en.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    en.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    en.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    en.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "An error occured when generating the expression description.  Check the cron expression syntax.";
    };
    en.prototype.everyMinute = function () {
        return "every minute";
    };
    en.prototype.everyHour = function () {
        return "every hour";
    };
    en.prototype.atSpace = function () {
        return "At ";
    };
    en.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Every minute between %s and %s";
    };
    en.prototype.at = function () {
        return "At";
    };
    en.prototype.spaceAnd = function () {
        return " and";
    };
    en.prototype.everySecond = function () {
        return "every second";
    };
    en.prototype.everyX0Seconds = function () {
        return "every %s seconds";
    };
    en.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "seconds %s through %s past the minute";
    };
    en.prototype.atX0SecondsPastTheMinute = function () {
        return "at %s seconds past the minute";
    };
    en.prototype.everyX0Minutes = function () {
        return "every %s minutes";
    };
    en.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutes %s through %s past the hour";
    };
    en.prototype.atX0MinutesPastTheHour = function () {
        return "at %s minutes past the hour";
    };
    en.prototype.everyX0Hours = function () {
        return "every %s hours";
    };
    en.prototype.betweenX0AndX1 = function () {
        return "between %s and %s";
    };
    en.prototype.atX0 = function () {
        return "at %s";
    };
    en.prototype.commaEveryDay = function () {
        return ", every day";
    };
    en.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", every %s days of the week";
    };
    en.prototype.commaX0ThroughX1 = function () {
        return ", %s through %s";
    };
    en.prototype.commaAndX0ThroughX1 = function () {
        return ", %s through %s";
    };
    en.prototype.first = function () {
        return "first";
    };
    en.prototype.second = function () {
        return "second";
    };
    en.prototype.third = function () {
        return "third";
    };
    en.prototype.fourth = function () {
        return "fourth";
    };
    en.prototype.fifth = function () {
        return "fifth";
    };
    en.prototype.commaOnThe = function () {
        return ", on the ";
    };
    en.prototype.spaceX0OfTheMonth = function () {
        return " %s of the month";
    };
    en.prototype.lastDay = function () {
        return "the last day";
    };
    en.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", on the last %s of the month";
    };
    en.prototype.commaOnlyOnX0 = function () {
        return ", only on %s";
    };
    en.prototype.commaAndOnX0 = function () {
        return ", and on %s";
    };
    en.prototype.commaEveryX0Months = function () {
        return ", every %s months";
    };
    en.prototype.commaOnlyInX0 = function () {
        return ", only in %s";
    };
    en.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", on the last day of the month";
    };
    en.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", on the last weekday of the month";
    };
    en.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s days before the last day of the month";
    };
    en.prototype.firstWeekday = function () {
        return "first weekday";
    };
    en.prototype.weekdayNearestDayX0 = function () {
        return "weekday nearest day %s";
    };
    en.prototype.commaOnTheX0OfTheMonth = function () {
        return ", on the %s of the month";
    };
    en.prototype.commaEveryX0Days = function () {
        return ", every %s days";
    };
    en.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", between day %s and %s of the month";
    };
    en.prototype.commaOnDayX0OfTheMonth = function () {
        return ", on day %s of the month";
    };
    en.prototype.commaEveryHour = function () {
        return ", every hour";
    };
    en.prototype.commaEveryX0Years = function () {
        return ", every %s years";
    };
    en.prototype.commaStartingX0 = function () {
        return ", starting %s";
    };
    en.prototype.daysOfTheWeek = function () {
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    };
    en.prototype.monthsOfTheYear = function () {
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
    };
    return en;
}());
exports.en = en;


/***/ }),

/***/ 470:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.es = void 0;
var es = (function () {
    function es() {
    }
    es.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    es.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    es.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    es.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    es.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    es.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ocurrió un error mientras se generaba la descripción de la expresión. Revise la sintaxis de la expresión de cron.";
    };
    es.prototype.at = function () {
        return "A las";
    };
    es.prototype.atSpace = function () {
        return "A las ";
    };
    es.prototype.atX0 = function () {
        return "a las %s";
    };
    es.prototype.atX0MinutesPastTheHour = function () {
        return "a los %s minutos de la hora";
    };
    es.prototype.atX0SecondsPastTheMinute = function () {
        return "a los %s segundos del minuto";
    };
    es.prototype.betweenX0AndX1 = function () {
        return "entre las %s y las %s";
    };
    es.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre los días %s y %s del mes";
    };
    es.prototype.commaEveryDay = function () {
        return ", cada día";
    };
    es.prototype.commaEveryX0Days = function () {
        return ", cada %s días";
    };
    es.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", cada %s días de la semana";
    };
    es.prototype.commaEveryX0Months = function () {
        return ", cada %s meses";
    };
    es.prototype.commaOnDayX0OfTheMonth = function () {
        return ", el día %s del mes";
    };
    es.prototype.commaOnlyInX0 = function () {
        return ", sólo en %s";
    };
    es.prototype.commaOnlyOnX0 = function () {
        return ", sólo el %s";
    };
    es.prototype.commaAndOnX0 = function () {
        return ", y el %s";
    };
    es.prototype.commaOnThe = function () {
        return ", en el ";
    };
    es.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", en el último día del mes";
    };
    es.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", en el último día de la semana del mes";
    };
    es.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s días antes del último día del mes";
    };
    es.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", en el último %s del mes";
    };
    es.prototype.commaOnTheX0OfTheMonth = function () {
        return ", en el %s del mes";
    };
    es.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    es.prototype.commaAndX0ThroughX1 = function () {
        return ", y de %s a %s";
    };
    es.prototype.everyHour = function () {
        return "cada hora";
    };
    es.prototype.everyMinute = function () {
        return "cada minuto";
    };
    es.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "cada minuto entre las %s y las %s";
    };
    es.prototype.everySecond = function () {
        return "cada segundo";
    };
    es.prototype.everyX0Hours = function () {
        return "cada %s horas";
    };
    es.prototype.everyX0Minutes = function () {
        return "cada %s minutos";
    };
    es.prototype.everyX0Seconds = function () {
        return "cada %s segundos";
    };
    es.prototype.fifth = function () {
        return "quinto";
    };
    es.prototype.first = function () {
        return "primero";
    };
    es.prototype.firstWeekday = function () {
        return "primer día de la semana";
    };
    es.prototype.fourth = function () {
        return "cuarto";
    };
    es.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "del minuto %s al %s pasada la hora";
    };
    es.prototype.second = function () {
        return "segundo";
    };
    es.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "En los segundos %s al %s de cada minuto";
    };
    es.prototype.spaceAnd = function () {
        return " y";
    };
    es.prototype.spaceX0OfTheMonth = function () {
        return " %s del mes";
    };
    es.prototype.lastDay = function () {
        return "el último día";
    };
    es.prototype.third = function () {
        return "tercer";
    };
    es.prototype.weekdayNearestDayX0 = function () {
        return "día de la semana más próximo al %s";
    };
    es.prototype.commaEveryX0Years = function () {
        return ", cada %s años";
    };
    es.prototype.commaStartingX0 = function () {
        return ", comenzando %s";
    };
    es.prototype.daysOfTheWeek = function () {
        return ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    };
    es.prototype.monthsOfTheYear = function () {
        return [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ];
    };
    return es;
}());
exports.es = es;


/***/ }),

/***/ 384:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fa = void 0;
var fa = (function () {
    function fa() {
    }
    fa.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fa.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    fa.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fa.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fa.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    fa.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "خطایی در نمایش توضیحات این وظیفه رخ داد. لطفا ساختار آن را بررسی کنید.";
    };
    fa.prototype.everyMinute = function () {
        return "هر دقیقه";
    };
    fa.prototype.everyHour = function () {
        return "هر ساعت";
    };
    fa.prototype.atSpace = function () {
        return "در ";
    };
    fa.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "هر دقیقه بین %s و %s";
    };
    fa.prototype.at = function () {
        return "در";
    };
    fa.prototype.spaceAnd = function () {
        return " و";
    };
    fa.prototype.everySecond = function () {
        return "هر ثانیه";
    };
    fa.prototype.everyX0Seconds = function () {
        return "هر %s ثانیه";
    };
    fa.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "ثانیه %s تا %s دقیقه گذشته";
    };
    fa.prototype.atX0SecondsPastTheMinute = function () {
        return "در %s قانیه از دقیقه گذشته";
    };
    fa.prototype.everyX0Minutes = function () {
        return "هر %s دقیقه";
    };
    fa.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "دقیقه %s تا %s ساعت گذشته";
    };
    fa.prototype.atX0MinutesPastTheHour = function () {
        return "در %s دقیقه پس از ساعت";
    };
    fa.prototype.everyX0Hours = function () {
        return "هر %s ساعت";
    };
    fa.prototype.betweenX0AndX1 = function () {
        return "بین %s و %s";
    };
    fa.prototype.atX0 = function () {
        return "در %s";
    };
    fa.prototype.commaEveryDay = function () {
        return ", هر روز";
    };
    fa.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", هر %s روز از هفته";
    };
    fa.prototype.commaX0ThroughX1 = function () {
        return ", %s تا %s";
    };
    fa.prototype.commaAndX0ThroughX1 = function () {
        return ", و %s تا %s";
    };
    fa.prototype.first = function () {
        return "اول";
    };
    fa.prototype.second = function () {
        return "دوم";
    };
    fa.prototype.third = function () {
        return "سوم";
    };
    fa.prototype.fourth = function () {
        return "چهارم";
    };
    fa.prototype.fifth = function () {
        return "پنجم";
    };
    fa.prototype.commaOnThe = function () {
        return ", در ";
    };
    fa.prototype.spaceX0OfTheMonth = function () {
        return " %s ماه";
    };
    fa.prototype.lastDay = function () {
        return "آخرین روز";
    };
    fa.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", در %s ماه";
    };
    fa.prototype.commaOnlyOnX0 = function () {
        return ", فقط در %s";
    };
    fa.prototype.commaAndOnX0 = function () {
        return ", و در %s";
    };
    fa.prototype.commaEveryX0Months = function () {
        return ", هر %s ماه";
    };
    fa.prototype.commaOnlyInX0 = function () {
        return ", فقط در %s";
    };
    fa.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", در آخرین روز ماه";
    };
    fa.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", در آخرین روز ماه";
    };
    fa.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s روز قبل از آخرین روز ماه";
    };
    fa.prototype.firstWeekday = function () {
        return "اولین روز";
    };
    fa.prototype.weekdayNearestDayX0 = function () {
        return "روز نزدیک به روز %s";
    };
    fa.prototype.commaOnTheX0OfTheMonth = function () {
        return ", در %s ماه";
    };
    fa.prototype.commaEveryX0Days = function () {
        return ", هر %s روز";
    };
    fa.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", بین روز %s و %s ماه";
    };
    fa.prototype.commaOnDayX0OfTheMonth = function () {
        return ", در %s ماه";
    };
    fa.prototype.commaEveryMinute = function () {
        return ", هر minute";
    };
    fa.prototype.commaEveryHour = function () {
        return ", هر ساعت";
    };
    fa.prototype.commaEveryX0Years = function () {
        return ", هر %s سال";
    };
    fa.prototype.commaStartingX0 = function () {
        return ", آغاز %s";
    };
    fa.prototype.daysOfTheWeek = function () {
        return ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
    };
    fa.prototype.monthsOfTheYear = function () {
        return ["ژانویه", "فوریه", "مارس", "آپریل", "مه", "ژوئن", "ژوئیه", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"];
    };
    return fa;
}());
exports.fa = fa;


/***/ }),

/***/ 578:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fi = void 0;
var fi = (function () {
    function fi() {
    }
    fi.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    fi.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Virhe kuvauksen generoinnissa. Tarkista cron-syntaksi.";
    };
    fi.prototype.at = function () {
        return "Klo";
    };
    fi.prototype.atSpace = function () {
        return "Klo ";
    };
    fi.prototype.atX0 = function () {
        return "klo %s";
    };
    fi.prototype.atX0MinutesPastTheHour = function () {
        return "%s minuuttia yli";
    };
    fi.prototype.atX0MinutesPastTheHourGt20 = function () {
        return "%s minuuttia yli";
    };
    fi.prototype.atX0SecondsPastTheMinute = function () {
        return "%s sekunnnin jälkeen";
    };
    fi.prototype.betweenX0AndX1 = function () {
        return "%s - %s välillä";
    };
    fi.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", kuukauden päivien %s ja %s välillä";
    };
    fi.prototype.commaEveryDay = function () {
        return ", joka päivä";
    };
    fi.prototype.commaEveryHour = function () {
        return ", joka tunti";
    };
    fi.prototype.commaEveryMinute = function () {
        return ", joka minuutti";
    };
    fi.prototype.commaEveryX0Days = function () {
        return ", joka %s. päivä";
    };
    fi.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", joka %s. viikonpäivä";
    };
    fi.prototype.commaEveryX0Months = function () {
        return ", joka %s. kuukausi";
    };
    fi.prototype.commaEveryX0Years = function () {
        return ", joka %s. vuosi";
    };
    fi.prototype.commaOnDayX0OfTheMonth = function () {
        return ", kuukauden %s päivä";
    };
    fi.prototype.commaOnlyInX0 = function () {
        return ", vain %s";
    };
    fi.prototype.commaOnlyOnX0 = function () {
        return ", vain %s";
    };
    fi.prototype.commaOnThe = function () {
        return ",";
    };
    fi.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", kuukauden viimeisenä päivänä";
    };
    fi.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", kuukauden viimeisenä viikonpäivänä";
    };
    fi.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", kuukauden viimeinen %s";
    };
    fi.prototype.commaOnTheX0OfTheMonth = function () {
        return ", kuukauden %s";
    };
    fi.prototype.commaX0ThroughX1 = function () {
        return ", %s - %s";
    };
    fi.prototype.commaAndX0ThroughX1 = function () {
        return ", %s - %s";
    };
    fi.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s päivää ennen kuukauden viimeistä päivää";
    };
    fi.prototype.commaStartingX0 = function () {
        return ", alkaen %s";
    };
    fi.prototype.everyHour = function () {
        return "joka tunti";
    };
    fi.prototype.everyMinute = function () {
        return "joka minuutti";
    };
    fi.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "joka minuutti %s - %s välillä";
    };
    fi.prototype.everySecond = function () {
        return "joka sekunti";
    };
    fi.prototype.everyX0Hours = function () {
        return "joka %s. tunti";
    };
    fi.prototype.everyX0Minutes = function () {
        return "joka %s. minuutti";
    };
    fi.prototype.everyX0Seconds = function () {
        return "joka %s. sekunti";
    };
    fi.prototype.fifth = function () {
        return "viides";
    };
    fi.prototype.first = function () {
        return "ensimmäinen";
    };
    fi.prototype.firstWeekday = function () {
        return "ensimmäinen viikonpäivä";
    };
    fi.prototype.fourth = function () {
        return "neljäs";
    };
    fi.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "joka tunti minuuttien %s - %s välillä";
    };
    fi.prototype.second = function () {
        return "toinen";
    };
    fi.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "joka minuutti sekunttien %s - %s välillä";
    };
    fi.prototype.spaceAnd = function () {
        return " ja";
    };
    fi.prototype.spaceAndSpace = function () {
        return " ja ";
    };
    fi.prototype.spaceX0OfTheMonth = function () {
        return " %s kuukaudessa";
    };
    fi.prototype.third = function () {
        return "kolmas";
    };
    fi.prototype.weekdayNearestDayX0 = function () {
        return "viikonpäivä lähintä %s päivää";
    };
    fi.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fi.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fi.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fi.prototype.lastDay = function () {
        return "viimeinen päivä";
    };
    fi.prototype.commaAndOnX0 = function () {
        return ", ja edelleen %s";
    };
    fi.prototype.daysOfTheWeek = function () {
        return ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"];
    };
    fi.prototype.monthsOfTheYear = function () {
        return [
            "tammikuu",
            "helmikuu",
            "maaliskuu",
            "huhtikuu",
            "toukokuu",
            "kesäkuu",
            "heinäkuu",
            "elokuu",
            "syyskuu",
            "lokakuu",
            "marraskuu",
            "joulukuu",
        ];
    };
    return fi;
}());
exports.fi = fi;


/***/ }),

/***/ 953:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fr = void 0;
var fr = (function () {
    function fr() {
    }
    fr.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fr.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    fr.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fr.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fr.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    fr.prototype.everyMinute = function () {
        return "toutes les minutes";
    };
    fr.prototype.everyHour = function () {
        return "toutes les heures";
    };
    fr.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Une erreur est survenue en générant la description de l'expression cron. Vérifiez sa syntaxe.";
    };
    fr.prototype.atSpace = function () {
        return "À ";
    };
    fr.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Toutes les minutes entre %s et %s";
    };
    fr.prototype.at = function () {
        return "À";
    };
    fr.prototype.spaceAnd = function () {
        return " et";
    };
    fr.prototype.everySecond = function () {
        return "toutes les secondes";
    };
    fr.prototype.everyX0Seconds = function () {
        return "toutes les %s secondes";
    };
    fr.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "les secondes entre %s et %s après la minute";
    };
    fr.prototype.atX0SecondsPastTheMinute = function () {
        return "%s secondes après la minute";
    };
    fr.prototype.everyX0Minutes = function () {
        return "toutes les %s minutes";
    };
    fr.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "les minutes entre %s et %s après l'heure";
    };
    fr.prototype.atX0MinutesPastTheHour = function () {
        return "%s minutes après l'heure";
    };
    fr.prototype.everyX0Hours = function () {
        return "toutes les %s heures";
    };
    fr.prototype.betweenX0AndX1 = function () {
        return "de %s à %s";
    };
    fr.prototype.atX0 = function () {
        return "à %s";
    };
    fr.prototype.commaEveryDay = function () {
        return ", tous les jours";
    };
    fr.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", tous les %s jours de la semaine";
    };
    fr.prototype.commaX0ThroughX1 = function () {
        return ", de %s à %s";
    };
    fr.prototype.commaAndX0ThroughX1 = function () {
        return ", et de %s à %s";
    };
    fr.prototype.first = function () {
        return "premier";
    };
    fr.prototype.second = function () {
        return "second";
    };
    fr.prototype.third = function () {
        return "troisième";
    };
    fr.prototype.fourth = function () {
        return "quatrième";
    };
    fr.prototype.fifth = function () {
        return "cinquième";
    };
    fr.prototype.commaOnThe = function () {
        return ", le ";
    };
    fr.prototype.spaceX0OfTheMonth = function () {
        return " %s du mois";
    };
    fr.prototype.lastDay = function () {
        return "le dernier jour";
    };
    fr.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", le dernier %s du mois";
    };
    fr.prototype.commaOnlyOnX0 = function () {
        return ", uniquement le %s";
    };
    fr.prototype.commaAndOnX0 = function () {
        return ", et %s";
    };
    fr.prototype.commaEveryX0Months = function () {
        return ", tous les %s mois";
    };
    fr.prototype.commaOnlyInX0 = function () {
        return ", uniquement en %s";
    };
    fr.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", le dernier jour du mois";
    };
    fr.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", le dernier jour ouvrable du mois";
    };
    fr.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s jours avant le dernier jour du mois";
    };
    fr.prototype.firstWeekday = function () {
        return "premier jour ouvrable";
    };
    fr.prototype.weekdayNearestDayX0 = function () {
        return "jour ouvrable le plus proche du %s";
    };
    fr.prototype.commaOnTheX0OfTheMonth = function () {
        return ", le %s du mois";
    };
    fr.prototype.commaEveryX0Days = function () {
        return ", tous les %s jours";
    };
    fr.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", du %s au %s du mois";
    };
    fr.prototype.commaOnDayX0OfTheMonth = function () {
        return ", le %s du mois";
    };
    fr.prototype.commaEveryX0Years = function () {
        return ", tous les %s ans";
    };
    fr.prototype.commaDaysX0ThroughX1 = function () {
        return ", du %s au %s";
    };
    fr.prototype.commaStartingX0 = function () {
        return ", à partir de %s";
    };
    fr.prototype.daysOfTheWeek = function () {
        return ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    };
    fr.prototype.monthsOfTheYear = function () {
        return [
            "janvier",
            "février",
            "mars",
            "avril",
            "mai",
            "juin",
            "juillet",
            "août",
            "septembre",
            "octobre",
            "novembre",
            "décembre",
        ];
    };
    return fr;
}());
exports.fr = fr;


/***/ }),

/***/ 389:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.he = void 0;
var he = (function () {
    function he() {
    }
    he.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    he.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    he.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    he.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    he.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    he.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "אירעה שגיאה בעת יצירת תיאור הביטוי. בדוק את תחביר הביטוי cron.";
    };
    he.prototype.everyMinute = function () {
        return "כל דקה";
    };
    he.prototype.everyHour = function () {
        return "כל שעה";
    };
    he.prototype.atSpace = function () {
        return "ב ";
    };
    he.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "כל דקה %s עד %s";
    };
    he.prototype.at = function () {
        return "ב";
    };
    he.prototype.spaceAnd = function () {
        return " ו";
    };
    he.prototype.everySecond = function () {
        return "כל שניה";
    };
    he.prototype.everyX0Seconds = function () {
        return "כל %s שניות";
    };
    he.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "%s עד %s שניות של הדקה";
    };
    he.prototype.atX0SecondsPastTheMinute = function () {
        return "ב %s שניות של הדקה";
    };
    he.prototype.everyX0Minutes = function () {
        return "כל %s דקות";
    };
    he.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "%s עד %s דקות של השעה";
    };
    he.prototype.atX0MinutesPastTheHour = function () {
        return "ב %s דקות של השעה";
    };
    he.prototype.everyX0Hours = function () {
        return "כל %s שעות";
    };
    he.prototype.betweenX0AndX1 = function () {
        return "%s עד %s";
    };
    he.prototype.atX0 = function () {
        return "ב %s";
    };
    he.prototype.commaEveryDay = function () {
        return ", כל יום";
    };
    he.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", כל %s ימים בשבוע";
    };
    he.prototype.commaX0ThroughX1 = function () {
        return ", %s עד %s";
    };
    he.prototype.commaAndX0ThroughX1 = function () {
        return ", ו %s עד %s";
    };
    he.prototype.first = function () {
        return "ראשון";
    };
    he.prototype.second = function () {
        return "שני";
    };
    he.prototype.third = function () {
        return "שלישי";
    };
    he.prototype.fourth = function () {
        return "רביעי";
    };
    he.prototype.fifth = function () {
        return "חמישי";
    };
    he.prototype.commaOnThe = function () {
        return ", ב ";
    };
    he.prototype.spaceX0OfTheMonth = function () {
        return " %s של החודש";
    };
    he.prototype.lastDay = function () {
        return "היום האחרון";
    };
    he.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", רק ב %s של החודש";
    };
    he.prototype.commaOnlyOnX0 = function () {
        return ", רק ב %s";
    };
    he.prototype.commaAndOnX0 = function () {
        return ", וב %s";
    };
    he.prototype.commaEveryX0Months = function () {
        return ", כל %s חודשים";
    };
    he.prototype.commaOnlyInX0 = function () {
        return ", רק ב %s";
    };
    he.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ביום האחרון של החודש";
    };
    he.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ביום החול האחרון של החודש";
    };
    he.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ימים לפני היום האחרון בחודש";
    };
    he.prototype.firstWeekday = function () {
        return "יום החול הראשון";
    };
    he.prototype.weekdayNearestDayX0 = function () {
        return "יום החול הראשון הקרוב אל %s";
    };
    he.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ביום ה%s של החודש";
    };
    he.prototype.commaEveryX0Days = function () {
        return ", כל %s ימים";
    };
    he.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", בין היום ה%s וה%s של החודש";
    };
    he.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ביום ה%s של החודש";
    };
    he.prototype.commaEveryX0Years = function () {
        return ", כל %s שנים";
    };
    he.prototype.commaStartingX0 = function () {
        return ", החל מ %s";
    };
    he.prototype.daysOfTheWeek = function () {
        return ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"];
    };
    he.prototype.monthsOfTheYear = function () {
        return ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
    };
    return he;
}());
exports.he = he;


/***/ }),

/***/ 560:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hu = void 0;
var hu = (function () {
    function hu() {
    }
    hu.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    hu.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    hu.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    hu.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    hu.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    hu.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Hiba történt a kifejezésleírás generálásakor. Ellenőrizze a cron kifejezés szintaxisát.";
    };
    hu.prototype.everyMinute = function () {
        return "minden percben";
    };
    hu.prototype.everyHour = function () {
        return "minden órában";
    };
    hu.prototype.atSpace = function () {
        return "Ekkor: ";
    };
    hu.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "percenként %s és %s között";
    };
    hu.prototype.at = function () {
        return "Ekkor:";
    };
    hu.prototype.spaceAnd = function () {
        return " és";
    };
    hu.prototype.everySecond = function () {
        return "minden másodpercben";
    };
    hu.prototype.everyX0Seconds = function () {
        return "%s másodpercenként";
    };
    hu.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "%s. másodpercben %s perc után";
    };
    hu.prototype.atX0SecondsPastTheMinute = function () {
        return "%s. másodpercben";
    };
    hu.prototype.everyX0Minutes = function () {
        return "minden %s. percben";
    };
    hu.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "%s. percben %s óra után";
    };
    hu.prototype.atX0MinutesPastTheHour = function () {
        return "%s. percben";
    };
    hu.prototype.everyX0Hours = function () {
        return "minden %s órában";
    };
    hu.prototype.betweenX0AndX1 = function () {
        return "%s és %s között";
    };
    hu.prototype.atX0 = function () {
        return "ekkor %s";
    };
    hu.prototype.commaEveryDay = function () {
        return ", minden nap";
    };
    hu.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", a hét minden %s napján";
    };
    hu.prototype.commaX0ThroughX1 = function () {
        return ", %s - %s";
    };
    hu.prototype.commaAndX0ThroughX1 = function () {
        return ", és %s - %s";
    };
    hu.prototype.first = function () {
        return "első";
    };
    hu.prototype.second = function () {
        return "második";
    };
    hu.prototype.third = function () {
        return "harmadik";
    };
    hu.prototype.fourth = function () {
        return "negyedik";
    };
    hu.prototype.fifth = function () {
        return "ötödik";
    };
    hu.prototype.commaOnThe = function () {
        return ", ";
    };
    hu.prototype.spaceX0OfTheMonth = function () {
        return " %s a hónapban";
    };
    hu.prototype.lastDay = function () {
        return "az utolsó nap";
    };
    hu.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", a hónap utolsó %s";
    };
    hu.prototype.commaOnlyOnX0 = function () {
        return ", csak ekkor: %s";
    };
    hu.prototype.commaAndOnX0 = function () {
        return ", és %s";
    };
    hu.prototype.commaEveryX0Months = function () {
        return ", minden %s hónapban";
    };
    hu.prototype.commaOnlyInX0 = function () {
        return ", csak ekkor: %s";
    };
    hu.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", a hónap utolsó napján";
    };
    hu.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", a hónap utolsó hétköznapján";
    };
    hu.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s nappal a hónap utolsó napja előtt";
    };
    hu.prototype.firstWeekday = function () {
        return "első hétköznap";
    };
    hu.prototype.weekdayNearestDayX0 = function () {
        return "hétköznap legközelebbi nap %s";
    };
    hu.prototype.commaOnTheX0OfTheMonth = function () {
        return ", a hónap %s";
    };
    hu.prototype.commaEveryX0Days = function () {
        return ", %s naponként";
    };
    hu.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", a hónap %s és %s napja között";
    };
    hu.prototype.commaOnDayX0OfTheMonth = function () {
        return ", a hónap %s napján";
    };
    hu.prototype.commaEveryHour = function () {
        return ", minden órában";
    };
    hu.prototype.commaEveryX0Years = function () {
        return ", %s évente";
    };
    hu.prototype.commaStartingX0 = function () {
        return ", %s kezdettel";
    };
    hu.prototype.daysOfTheWeek = function () {
        return ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"];
    };
    hu.prototype.monthsOfTheYear = function () {
        return [
            "január",
            "február",
            "március",
            "április",
            "május",
            "június",
            "július",
            "augusztus",
            "szeptember",
            "október",
            "november",
            "december",
        ];
    };
    return hu;
}());
exports.hu = hu;


/***/ }),

/***/ 258:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.id = void 0;
var id = (function () {
    function id() {
    }
    id.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    id.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    id.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    id.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    id.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    id.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Terjadi kesalahan saat membuat deskripsi ekspresi. Periksa sintaks ekspresi cron.";
    };
    id.prototype.everyMinute = function () {
        return "setiap menit";
    };
    id.prototype.everyHour = function () {
        return "setiap jam";
    };
    id.prototype.atSpace = function () {
        return "Pada ";
    };
    id.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Setiap menit diantara %s dan %s";
    };
    id.prototype.at = function () {
        return "Pada";
    };
    id.prototype.spaceAnd = function () {
        return " dan";
    };
    id.prototype.everySecond = function () {
        return "setiap detik";
    };
    id.prototype.everyX0Seconds = function () {
        return "setiap %s detik";
    };
    id.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "detik ke %s sampai %s melewati menit";
    };
    id.prototype.atX0SecondsPastTheMinute = function () {
        return "pada %s detik lewat satu menit";
    };
    id.prototype.everyX0Minutes = function () {
        return "setiap %s menit";
    };
    id.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "menit ke %s sampai %s melewati jam";
    };
    id.prototype.atX0MinutesPastTheHour = function () {
        return "pada %s menit melewati jam";
    };
    id.prototype.everyX0Hours = function () {
        return "setiap %s jam";
    };
    id.prototype.betweenX0AndX1 = function () {
        return "diantara %s dan %s";
    };
    id.prototype.atX0 = function () {
        return "pada %s";
    };
    id.prototype.commaEveryDay = function () {
        return ", setiap hari";
    };
    id.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", setiap hari %s  dalam seminggu";
    };
    id.prototype.commaX0ThroughX1 = function () {
        return ", %s sampai %s";
    };
    id.prototype.commaAndX0ThroughX1 = function () {
        return ", dan %s sampai %s";
    };
    id.prototype.first = function () {
        return "pertama";
    };
    id.prototype.second = function () {
        return "kedua";
    };
    id.prototype.third = function () {
        return "ketiga";
    };
    id.prototype.fourth = function () {
        return "keempat";
    };
    id.prototype.fifth = function () {
        return "kelima";
    };
    id.prototype.commaOnThe = function () {
        return ", di ";
    };
    id.prototype.spaceX0OfTheMonth = function () {
        return " %s pada bulan";
    };
    id.prototype.lastDay = function () {
        return "hari terakhir";
    };
    id.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", pada %s terakhir bulan ini";
    };
    id.prototype.commaOnlyOnX0 = function () {
        return ", hanya pada %s";
    };
    id.prototype.commaAndOnX0 = function () {
        return ", dan pada %s";
    };
    id.prototype.commaEveryX0Months = function () {
        return ", setiap bulan %s ";
    };
    id.prototype.commaOnlyInX0 = function () {
        return ", hanya pada %s";
    };
    id.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", pada hari terakhir bulan ini";
    };
    id.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", pada hari kerja terakhir setiap bulan";
    };
    id.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s hari sebelum hari terakhir setiap bulan";
    };
    id.prototype.firstWeekday = function () {
        return "hari kerja pertama";
    };
    id.prototype.weekdayNearestDayX0 = function () {
        return "hari kerja terdekat %s";
    };
    id.prototype.commaOnTheX0OfTheMonth = function () {
        return ", pada %s bulan ini";
    };
    id.prototype.commaEveryX0Days = function () {
        return ", setiap %s hari";
    };
    id.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", antara hari %s dan %s dalam sebulan";
    };
    id.prototype.commaOnDayX0OfTheMonth = function () {
        return ", pada hari %s dalam sebulan";
    };
    id.prototype.commaEveryHour = function () {
        return ", setiap jam";
    };
    id.prototype.commaEveryX0Years = function () {
        return ", setiap %s tahun";
    };
    id.prototype.commaStartingX0 = function () {
        return ", mulai pada %s";
    };
    id.prototype.daysOfTheWeek = function () {
        return ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    };
    id.prototype.monthsOfTheYear = function () {
        return [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
    };
    return id;
}());
exports.id = id;


/***/ }),

/***/ 128:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.it = void 0;
var it = (function () {
    function it() {
    }
    it.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    it.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    it.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    it.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    it.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    it.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "È verificato un errore durante la generazione la descrizione espressione. Controllare la sintassi delle espressioni cron.";
    };
    it.prototype.at = function () {
        return "Alle";
    };
    it.prototype.atSpace = function () {
        return "Alle ";
    };
    it.prototype.atX0 = function () {
        return "alle %s";
    };
    it.prototype.atX0MinutesPastTheHour = function () {
        return "al %s minuto passata l'ora";
    };
    it.prototype.atX0SecondsPastTheMinute = function () {
        return "al %s secondo passato il minuto";
    };
    it.prototype.betweenX0AndX1 = function () {
        return "tra le %s e le %s";
    };
    it.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", tra il giorno %s e %s del mese";
    };
    it.prototype.commaEveryDay = function () {
        return ", ogni giorno";
    };
    it.prototype.commaEveryX0Days = function () {
        return ", ogni %s giorni";
    };
    it.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ogni %s giorni della settimana";
    };
    it.prototype.commaEveryX0Months = function () {
        return ", ogni %s mesi";
    };
    it.prototype.commaEveryX0Years = function () {
        return ", ogni %s anni";
    };
    it.prototype.commaOnDayX0OfTheMonth = function () {
        return ", il giorno %s del mese";
    };
    it.prototype.commaOnlyInX0 = function () {
        return ", solo in %s";
    };
    it.prototype.commaOnlyOnX0 = function () {
        return ", solo il %s";
    };
    it.prototype.commaAndOnX0 = function () {
        return ", e il %s";
    };
    it.prototype.commaOnThe = function () {
        return ", il ";
    };
    it.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", l'ultimo giorno del mese";
    };
    it.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", nell'ultima settimana del mese";
    };
    it.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s giorni prima dell'ultimo giorno del mese";
    };
    it.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", l'ultimo %s del mese";
    };
    it.prototype.commaOnTheX0OfTheMonth = function () {
        return ", il %s del mese";
    };
    it.prototype.commaX0ThroughX1 = function () {
        return ", %s al %s";
    };
    it.prototype.commaAndX0ThroughX1 = function () {
        return ", e %s al %s";
    };
    it.prototype.everyHour = function () {
        return "ogni ora";
    };
    it.prototype.everyMinute = function () {
        return "ogni minuto";
    };
    it.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Ogni minuto tra le %s e le %s";
    };
    it.prototype.everySecond = function () {
        return "ogni secondo";
    };
    it.prototype.everyX0Hours = function () {
        return "ogni %s ore";
    };
    it.prototype.everyX0Minutes = function () {
        return "ogni %s minuti";
    };
    it.prototype.everyX0Seconds = function () {
        return "ogni %s secondi";
    };
    it.prototype.fifth = function () {
        return "quinto";
    };
    it.prototype.first = function () {
        return "primo";
    };
    it.prototype.firstWeekday = function () {
        return "primo giorno della settimana";
    };
    it.prototype.fourth = function () {
        return "quarto";
    };
    it.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuti %s al %s dopo l'ora";
    };
    it.prototype.second = function () {
        return "secondo";
    };
    it.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "secondi %s al %s oltre il minuto";
    };
    it.prototype.spaceAnd = function () {
        return " e";
    };
    it.prototype.spaceX0OfTheMonth = function () {
        return " %s del mese";
    };
    it.prototype.lastDay = function () {
        return "l'ultimo giorno";
    };
    it.prototype.third = function () {
        return "terzo";
    };
    it.prototype.weekdayNearestDayX0 = function () {
        return "giorno della settimana più vicino al %s";
    };
    it.prototype.commaStartingX0 = function () {
        return ", a partire %s";
    };
    it.prototype.daysOfTheWeek = function () {
        return ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
    };
    it.prototype.monthsOfTheYear = function () {
        return [
            "gennaio",
            "febbraio",
            "marzo",
            "aprile",
            "maggio",
            "giugno",
            "luglio",
            "agosto",
            "settembre",
            "ottobre",
            "novembre",
            "dicembre",
        ];
    };
    return it;
}());
exports.it = it;


/***/ }),

/***/ 949:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ja = void 0;
var ja = (function () {
    function ja() {
    }
    ja.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    ja.prototype.everyMinute = function () {
        return "毎分";
    };
    ja.prototype.everyHour = function () {
        return "毎時";
    };
    ja.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "式の記述を生成する際にエラーが発生しました。Cron 式の構文を確認してください。";
    };
    ja.prototype.atSpace = function () {
        return "次において実施";
    };
    ja.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "%s から %s まで毎分";
    };
    ja.prototype.at = function () {
        return "次において実施";
    };
    ja.prototype.spaceAnd = function () {
        return "と";
    };
    ja.prototype.everySecond = function () {
        return "毎秒";
    };
    ja.prototype.everyX0Seconds = function () {
        return "%s 秒ごと";
    };
    ja.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "毎分 %s 秒から %s 秒まで";
    };
    ja.prototype.atX0SecondsPastTheMinute = function () {
        return "毎分 %s 秒過ぎ";
    };
    ja.prototype.everyX0Minutes = function () {
        return "%s 分ごと";
    };
    ja.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "毎時 %s 分から %s 分まで";
    };
    ja.prototype.atX0MinutesPastTheHour = function () {
        return "毎時 %s 分過ぎ";
    };
    ja.prototype.everyX0Hours = function () {
        return "%s 時間ごと";
    };
    ja.prototype.betweenX0AndX1 = function () {
        return "%s と %s の間";
    };
    ja.prototype.atX0 = function () {
        return "次において実施 %s";
    };
    ja.prototype.commaEveryDay = function () {
        return "、毎日";
    };
    ja.prototype.commaEveryX0DaysOfTheWeek = function () {
        return "、週のうち %s 日ごと";
    };
    ja.prototype.commaX0ThroughX1 = function () {
        return "、%s から %s まで";
    };
    ja.prototype.commaAndX0ThroughX1 = function () {
        return "、%s から %s まで";
    };
    ja.prototype.first = function () {
        return "1 番目";
    };
    ja.prototype.second = function () {
        return "2 番目";
    };
    ja.prototype.third = function () {
        return "3 番目";
    };
    ja.prototype.fourth = function () {
        return "4 番目";
    };
    ja.prototype.fifth = function () {
        return "5 番目";
    };
    ja.prototype.commaOnThe = function () {
        return "次に";
    };
    ja.prototype.spaceX0OfTheMonth = function () {
        return "月のうち %s";
    };
    ja.prototype.commaOnTheLastX0OfTheMonth = function () {
        return "月の最後の %s に";
    };
    ja.prototype.commaOnlyOnX0 = function () {
        return "%s にのみ";
    };
    ja.prototype.commaEveryX0Months = function () {
        return "、%s か月ごと";
    };
    ja.prototype.commaOnlyInX0 = function () {
        return "%s でのみ";
    };
    ja.prototype.commaOnTheLastDayOfTheMonth = function () {
        return "次の最終日に";
    };
    ja.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return "月の最後の平日に";
    };
    ja.prototype.firstWeekday = function () {
        return "最初の平日";
    };
    ja.prototype.weekdayNearestDayX0 = function () {
        return "%s 日の直近の平日";
    };
    ja.prototype.commaOnTheX0OfTheMonth = function () {
        return "月の %s に";
    };
    ja.prototype.commaEveryX0Days = function () {
        return "、%s 日ごと";
    };
    ja.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return "、月の %s 日から %s 日の間";
    };
    ja.prototype.commaOnDayX0OfTheMonth = function () {
        return "、月の %s 日目";
    };
    ja.prototype.spaceAndSpace = function () {
        return "と";
    };
    ja.prototype.commaEveryMinute = function () {
        return "、毎分";
    };
    ja.prototype.commaEveryHour = function () {
        return "、毎時";
    };
    ja.prototype.commaEveryX0Years = function () {
        return "、%s 年ごと";
    };
    ja.prototype.commaStartingX0 = function () {
        return "、%s に開始";
    };
    ja.prototype.aMPeriod = function () {
        return "AM";
    };
    ja.prototype.pMPeriod = function () {
        return "PM";
    };
    ja.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return "月の最終日の %s 日前";
    };
    ja.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ja.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ja.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ja.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ja.prototype.lastDay = function () {
        return "最終日";
    };
    ja.prototype.commaAndOnX0 = function () {
        return "、〜と %s";
    };
    ja.prototype.daysOfTheWeek = function () {
        return ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
    };
    ja.prototype.monthsOfTheYear = function () {
        return ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    };
    return ja;
}());
exports.ja = ja;


/***/ }),

/***/ 305:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ko = void 0;
var ko = (function () {
    function ko() {
    }
    ko.prototype.setPeriodBeforeTime = function () {
        return true;
    };
    ko.prototype.pm = function () {
        return "오후";
    };
    ko.prototype.am = function () {
        return "오전";
    };
    ko.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ko.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ko.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ko.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ko.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    ko.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "표현식 설명을 생성하는 중 오류가 발생했습니다. cron 표현식 구문을 확인하십시오.";
    };
    ko.prototype.everyMinute = function () {
        return "1분마다";
    };
    ko.prototype.everyHour = function () {
        return "1시간마다";
    };
    ko.prototype.atSpace = function () {
        return "시간 ";
    };
    ko.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "%s 및 %s 사이에 매 분";
    };
    ko.prototype.at = function () {
        return "시간";
    };
    ko.prototype.spaceAnd = function () {
        return " 및";
    };
    ko.prototype.everySecond = function () {
        return "1초마다";
    };
    ko.prototype.everyX0Seconds = function () {
        return "%s초마다";
    };
    ko.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "정분 후 %s초에서 %s초까지";
    };
    ko.prototype.atX0SecondsPastTheMinute = function () {
        return "정분 후 %s초에서";
    };
    ko.prototype.everyX0Minutes = function () {
        return "%s분마다";
    };
    ko.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "정시 후 %s분에서 %s분까지";
    };
    ko.prototype.atX0MinutesPastTheHour = function () {
        return "정시 후 %s분에서";
    };
    ko.prototype.everyX0Hours = function () {
        return "%s시간마다";
    };
    ko.prototype.betweenX0AndX1 = function () {
        return "%s에서 %s 사이";
    };
    ko.prototype.atX0 = function () {
        return "%s에서";
    };
    ko.prototype.commaEveryDay = function () {
        return ", 매일";
    };
    ko.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", 주 중 %s일마다";
    };
    ko.prototype.commaX0ThroughX1 = function () {
        return ", %s에서 %s까지";
    };
    ko.prototype.commaAndX0ThroughX1 = function () {
        return ", 및 %s에서 %s까지";
    };
    ko.prototype.first = function () {
        return "첫 번째";
    };
    ko.prototype.second = function () {
        return "두 번째";
    };
    ko.prototype.third = function () {
        return "세 번째";
    };
    ko.prototype.fourth = function () {
        return "네 번째";
    };
    ko.prototype.fifth = function () {
        return "다섯 번째";
    };
    ko.prototype.commaOnThe = function () {
        return ", 해당 ";
    };
    ko.prototype.spaceX0OfTheMonth = function () {
        return " 해당 월의 %s";
    };
    ko.prototype.lastDay = function () {
        return "마지막 날";
    };
    ko.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", 해당 월의 마지막 %s";
    };
    ko.prototype.commaOnlyOnX0 = function () {
        return ", %s에만";
    };
    ko.prototype.commaAndOnX0 = function () {
        return ", 및 %s에";
    };
    ko.prototype.commaEveryX0Months = function () {
        return ", %s개월마다";
    };
    ko.prototype.commaOnlyInX0 = function () {
        return ", %s에만";
    };
    ko.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", 해당 월의 마지막 날에";
    };
    ko.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", 해당 월의 마지막 평일에";
    };
    ko.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", 해당 월의 마지막 날 %s일 전";
    };
    ko.prototype.firstWeekday = function () {
        return "첫 번째 평일";
    };
    ko.prototype.weekdayNearestDayX0 = function () {
        return "%s일과 가장 가까운 평일";
    };
    ko.prototype.commaOnTheX0OfTheMonth = function () {
        return ", 해당 월의 %s에";
    };
    ko.prototype.commaEveryX0Days = function () {
        return ", %s일마다";
    };
    ko.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", 해당 월의 %s일에서 %s일까지";
    };
    ko.prototype.commaOnDayX0OfTheMonth = function () {
        return ", 해당 월의 %s일에";
    };
    ko.prototype.commaEveryMinute = function () {
        return ", 1분마다";
    };
    ko.prototype.commaEveryHour = function () {
        return ", 1시간마다";
    };
    ko.prototype.commaEveryX0Years = function () {
        return ", %s년마다";
    };
    ko.prototype.commaStartingX0 = function () {
        return ", %s부터";
    };
    ko.prototype.daysOfTheWeek = function () {
        return ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    };
    ko.prototype.monthsOfTheYear = function () {
        return ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    };
    return ko;
}());
exports.ko = ko;


/***/ }),

/***/ 863:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.my = void 0;
var my = (function () {
    function my() {
    }
    my.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    my.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    my.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    my.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    my.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    my.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Terdapat ralat semasa menjana penerangan ungkapan. Sila periksa sintaks ungkapan cron.";
    };
    my.prototype.everyMinute = function () {
        return "setiap minit";
    };
    my.prototype.everyHour = function () {
        return "setiap jam";
    };
    my.prototype.atSpace = function () {
        return "Pada ";
    };
    my.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Setiap minit antara %s dan %s";
    };
    my.prototype.at = function () {
        return "Pada";
    };
    my.prototype.spaceAnd = function () {
        return " dan";
    };
    my.prototype.everySecond = function () {
        return "setiap saat";
    };
    my.prototype.everyX0Seconds = function () {
        return "setiap %s saat";
    };
    my.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "saat ke %s hingga %s selepas minit";
    };
    my.prototype.atX0SecondsPastTheMinute = function () {
        return "pada %s saat selepas minit";
    };
    my.prototype.everyX0Minutes = function () {
        return "setiap %s minit";
    };
    my.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minit ke %s hingga %s selepas jam";
    };
    my.prototype.atX0MinutesPastTheHour = function () {
        return "pada %s minit selepas jam";
    };
    my.prototype.everyX0Hours = function () {
        return "setiap %s jam";
    };
    my.prototype.betweenX0AndX1 = function () {
        return "antara %s dan %s";
    };
    my.prototype.atX0 = function () {
        return "pada %s";
    };
    my.prototype.commaEveryDay = function () {
        return ", setiap hari";
    };
    my.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", setiap %s hari dalam minggu";
    };
    my.prototype.commaX0ThroughX1 = function () {
        return ", %s hingga %s";
    };
    my.prototype.commaAndX0ThroughX1 = function () {
        return ", dan %s hingga %s";
    };
    my.prototype.first = function () {
        return "pertama";
    };
    my.prototype.second = function () {
        return "kedua";
    };
    my.prototype.third = function () {
        return "ketiga";
    };
    my.prototype.fourth = function () {
        return "keempat";
    };
    my.prototype.fifth = function () {
        return "kelima";
    };
    my.prototype.commaOnThe = function () {
        return ", pada ";
    };
    my.prototype.spaceX0OfTheMonth = function () {
        return " %s pada bulan";
    };
    my.prototype.lastDay = function () {
        return "hari terakhir";
    };
    my.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", pada %s terakhir bulan";
    };
    my.prototype.commaOnlyOnX0 = function () {
        return ", hanya pada %s";
    };
    my.prototype.commaAndOnX0 = function () {
        return ", dan pada %s";
    };
    my.prototype.commaEveryX0Months = function () {
        return ", setiap bulan %s";
    };
    my.prototype.commaOnlyInX0 = function () {
        return ", hanya pada %s";
    };
    my.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", pada hari terakhir bulan";
    };
    my.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", pada minggu terakhir bulan";
    };
    my.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s hari sebelum hari terakhir bulan";
    };
    my.prototype.firstWeekday = function () {
        return "hari pertama minggu bekerja";
    };
    my.prototype.weekdayNearestDayX0 = function () {
        return "hari bekerja yang terdekat dengan %s";
    };
    my.prototype.commaOnTheX0OfTheMonth = function () {
        return ", pada %s bulan";
    };
    my.prototype.commaEveryX0Days = function () {
        return ", setiap %s hari";
    };
    my.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", antara hari %s dan %s dalam bulan";
    };
    my.prototype.commaOnDayX0OfTheMonth = function () {
        return ", pada hari %s dalam bulan";
    };
    my.prototype.commaEveryHour = function () {
        return ", setiap jam";
    };
    my.prototype.commaEveryX0Years = function () {
        return ", setiap %s tahun";
    };
    my.prototype.commaStartingX0 = function () {
        return ", bermula %s";
    };
    my.prototype.daysOfTheWeek = function () {
        return ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"];
    };
    my.prototype.monthsOfTheYear = function () {
        return [
            "Januari",
            "Februari",
            "Mac",
            "April",
            "Mei",
            "Jun",
            "Julai",
            "Ogos",
            "September",
            "Oktober",
            "November",
            "Disember",
        ];
    };
    return my;
}());
exports.my = my;


/***/ }),

/***/ 869:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nb = void 0;
var nb = (function () {
    function nb() {
    }
    nb.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    nb.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    nb.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    nb.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    nb.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    nb.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "En feil inntraff ved generering av uttrykksbeskrivelse. Sjekk cron syntaks.";
    };
    nb.prototype.at = function () {
        return "Kl.";
    };
    nb.prototype.atSpace = function () {
        return "Kl.";
    };
    nb.prototype.atX0 = function () {
        return "på %s";
    };
    nb.prototype.atX0MinutesPastTheHour = function () {
        return "på %s minutter etter timen";
    };
    nb.prototype.atX0SecondsPastTheMinute = function () {
        return "på %s sekunder etter minuttet";
    };
    nb.prototype.betweenX0AndX1 = function () {
        return "mellom %s og %s";
    };
    nb.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellom dag %s og %s av måneden";
    };
    nb.prototype.commaEveryDay = function () {
        return ", hver dag";
    };
    nb.prototype.commaEveryX0Days = function () {
        return ", hver %s dag";
    };
    nb.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", hver %s ukedag";
    };
    nb.prototype.commaEveryX0Months = function () {
        return ", hver %s måned";
    };
    nb.prototype.commaEveryX0Years = function () {
        return ", hvert %s år";
    };
    nb.prototype.commaOnDayX0OfTheMonth = function () {
        return ", på dag %s av måneden";
    };
    nb.prototype.commaOnlyInX0 = function () {
        return ", bare i %s";
    };
    nb.prototype.commaOnlyOnX0 = function () {
        return ", på %s";
    };
    nb.prototype.commaAndOnX0 = function () {
        return ", og på %s";
    };
    nb.prototype.commaOnThe = function () {
        return ", på ";
    };
    nb.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", på den siste dagen i måneden";
    };
    nb.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", den siste ukedagen i måneden";
    };
    nb.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dager før den siste dagen i måneden";
    };
    nb.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", på den siste %s av måneden";
    };
    nb.prototype.commaOnTheX0OfTheMonth = function () {
        return ", på den %s av måneden";
    };
    nb.prototype.commaX0ThroughX1 = function () {
        return ", %s til og med %s";
    };
    nb.prototype.commaAndX0ThroughX1 = function () {
        return ", og %s til og med %s";
    };
    nb.prototype.everyHour = function () {
        return "hver time";
    };
    nb.prototype.everyMinute = function () {
        return "hvert minutt";
    };
    nb.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Hvert minutt mellom %s og %s";
    };
    nb.prototype.everySecond = function () {
        return "hvert sekund";
    };
    nb.prototype.everyX0Hours = function () {
        return "hver %s time";
    };
    nb.prototype.everyX0Minutes = function () {
        return "hvert %s minutt";
    };
    nb.prototype.everyX0Seconds = function () {
        return "hvert %s sekund";
    };
    nb.prototype.fifth = function () {
        return "femte";
    };
    nb.prototype.first = function () {
        return "første";
    };
    nb.prototype.firstWeekday = function () {
        return "første ukedag";
    };
    nb.prototype.fourth = function () {
        return "fjerde";
    };
    nb.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuttene fra %s til og med %s etter timen";
    };
    nb.prototype.second = function () {
        return "sekund";
    };
    nb.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundene fra %s til og med %s etter minuttet";
    };
    nb.prototype.spaceAnd = function () {
        return " og";
    };
    nb.prototype.spaceX0OfTheMonth = function () {
        return " %s i måneden";
    };
    nb.prototype.lastDay = function () {
        return "den siste dagen";
    };
    nb.prototype.third = function () {
        return "tredje";
    };
    nb.prototype.weekdayNearestDayX0 = function () {
        return "ukedag nærmest dag %s";
    };
    nb.prototype.commaStartingX0 = function () {
        return ", starter %s";
    };
    nb.prototype.daysOfTheWeek = function () {
        return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    };
    nb.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "mars",
            "april",
            "mai",
            "juni",
            "juli",
            "august",
            "september",
            "oktober",
            "november",
            "desember",
        ];
    };
    return nb;
}());
exports.nb = nb;


/***/ }),

/***/ 771:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nl = void 0;
var nl = (function () {
    function nl() {
    }
    nl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    nl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    nl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    nl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    nl.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    nl.prototype.everyMinute = function () {
        return "elke minuut";
    };
    nl.prototype.everyHour = function () {
        return "elk uur";
    };
    nl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Er is een fout opgetreden bij het vertalen van de gegevens. Controleer de gegevens.";
    };
    nl.prototype.atSpace = function () {
        return "Op ";
    };
    nl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Elke minuut tussen %s en %s";
    };
    nl.prototype.at = function () {
        return "Op";
    };
    nl.prototype.spaceAnd = function () {
        return " en";
    };
    nl.prototype.everySecond = function () {
        return "elke seconde";
    };
    nl.prototype.everyX0Seconds = function () {
        return "elke %s seconden";
    };
    nl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "seconden %s t/m %s na de minuut";
    };
    nl.prototype.atX0SecondsPastTheMinute = function () {
        return "op %s seconden na de minuut";
    };
    nl.prototype.everyX0Minutes = function () {
        return "elke %s minuten";
    };
    nl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuut %s t/m %s na het uur";
    };
    nl.prototype.atX0MinutesPastTheHour = function () {
        return "op %s minuten na het uur";
    };
    nl.prototype.everyX0Hours = function () {
        return "elke %s uur";
    };
    nl.prototype.betweenX0AndX1 = function () {
        return "tussen %s en %s";
    };
    nl.prototype.atX0 = function () {
        return "op %s";
    };
    nl.prototype.commaEveryDay = function () {
        return ", elke dag";
    };
    nl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", elke %s dagen van de week";
    };
    nl.prototype.commaX0ThroughX1 = function () {
        return ", %s t/m %s";
    };
    nl.prototype.commaAndX0ThroughX1 = function () {
        return ", en %s t/m %s";
    };
    nl.prototype.first = function () {
        return "eerste";
    };
    nl.prototype.second = function () {
        return "tweede";
    };
    nl.prototype.third = function () {
        return "derde";
    };
    nl.prototype.fourth = function () {
        return "vierde";
    };
    nl.prototype.fifth = function () {
        return "vijfde";
    };
    nl.prototype.commaOnThe = function () {
        return ", op de ";
    };
    nl.prototype.spaceX0OfTheMonth = function () {
        return " %s van de maand";
    };
    nl.prototype.lastDay = function () {
        return "de laatste dag";
    };
    nl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", op de laatste %s van de maand";
    };
    nl.prototype.commaOnlyOnX0 = function () {
        return ", alleen op %s";
    };
    nl.prototype.commaAndOnX0 = function () {
        return ", en op %s";
    };
    nl.prototype.commaEveryX0Months = function () {
        return ", elke %s maanden";
    };
    nl.prototype.commaOnlyInX0 = function () {
        return ", alleen in %s";
    };
    nl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", op de laatste dag van de maand";
    };
    nl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", op de laatste werkdag van de maand";
    };
    nl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dagen vóór de laatste dag van de maand";
    };
    nl.prototype.firstWeekday = function () {
        return "eerste werkdag";
    };
    nl.prototype.weekdayNearestDayX0 = function () {
        return "werkdag dichtst bij dag %s";
    };
    nl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", op de %s van de maand";
    };
    nl.prototype.commaEveryX0Days = function () {
        return ", elke %s dagen";
    };
    nl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", tussen dag %s en %s van de maand";
    };
    nl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", op dag %s van de maand";
    };
    nl.prototype.commaEveryX0Years = function () {
        return ", elke %s jaren";
    };
    nl.prototype.commaStartingX0 = function () {
        return ", beginnend %s";
    };
    nl.prototype.daysOfTheWeek = function () {
        return ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
    };
    nl.prototype.monthsOfTheYear = function () {
        return [
            "januari",
            "februari",
            "maart",
            "april",
            "mei",
            "juni",
            "juli",
            "augustus",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return nl;
}());
exports.nl = nl;


/***/ }),

/***/ 665:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pl = void 0;
var pl = (function () {
    function pl() {
    }
    pl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    pl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    pl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    pl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    pl.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    pl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Wystąpił błąd podczas generowania opisu wyrażenia cron. Sprawdź składnię wyrażenia cron.";
    };
    pl.prototype.at = function () {
        return "O";
    };
    pl.prototype.atSpace = function () {
        return "O ";
    };
    pl.prototype.atX0 = function () {
        return "o %s";
    };
    pl.prototype.atX0MinutesPastTheHour = function () {
        return "w %s minucie";
    };
    pl.prototype.atX0SecondsPastTheMinute = function () {
        return "w %s sekundzie";
    };
    pl.prototype.betweenX0AndX1 = function () {
        return "od %s do %s";
    };
    pl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", od %s-ego do %s-ego dnia miesiąca";
    };
    pl.prototype.commaEveryDay = function () {
        return ", co dzień";
    };
    pl.prototype.commaEveryX0Days = function () {
        return ", co %s dni";
    };
    pl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", co %s dni tygodnia";
    };
    pl.prototype.commaEveryX0Months = function () {
        return ", co %s miesięcy";
    };
    pl.prototype.commaEveryX0Years = function () {
        return ", co %s lat";
    };
    pl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s-ego dnia miesiąca";
    };
    pl.prototype.commaOnlyInX0 = function () {
        return ", tylko %s";
    };
    pl.prototype.commaOnlyOnX0 = function () {
        return ", tylko %s";
    };
    pl.prototype.commaAndOnX0 = function () {
        return ", i %s";
    };
    pl.prototype.commaOnThe = function () {
        return ", ";
    };
    pl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ostatni dzień miesiąca";
    };
    pl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ostatni dzień roboczy miesiąca";
    };
    pl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dni przed ostatnim dniem miesiąca";
    };
    pl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ostatni %s miesiąca";
    };
    pl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", %s miesiąca";
    };
    pl.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    pl.prototype.commaAndX0ThroughX1 = function () {
        return ", i od %s do %s";
    };
    pl.prototype.everyHour = function () {
        return "co godzinę";
    };
    pl.prototype.everyMinute = function () {
        return "co minutę";
    };
    pl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Co minutę od %s do %s";
    };
    pl.prototype.everySecond = function () {
        return "co sekundę";
    };
    pl.prototype.everyX0Hours = function () {
        return "co %s godzin";
    };
    pl.prototype.everyX0Minutes = function () {
        return "co %s minut";
    };
    pl.prototype.everyX0Seconds = function () {
        return "co %s sekund";
    };
    pl.prototype.fifth = function () {
        return "piąty";
    };
    pl.prototype.first = function () {
        return "pierwszy";
    };
    pl.prototype.firstWeekday = function () {
        return "pierwszy dzień roboczy";
    };
    pl.prototype.fourth = function () {
        return "czwarty";
    };
    pl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuty od %s do %s";
    };
    pl.prototype.second = function () {
        return "drugi";
    };
    pl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    pl.prototype.spaceAnd = function () {
        return " i";
    };
    pl.prototype.spaceX0OfTheMonth = function () {
        return " %s miesiąca";
    };
    pl.prototype.lastDay = function () {
        return "ostatni dzień";
    };
    pl.prototype.third = function () {
        return "trzeci";
    };
    pl.prototype.weekdayNearestDayX0 = function () {
        return "dzień roboczy najbliższy %s-ego dnia";
    };
    pl.prototype.commaStartingX0 = function () {
        return ", startowy %s";
    };
    pl.prototype.daysOfTheWeek = function () {
        return ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
    };
    pl.prototype.monthsOfTheYear = function () {
        return [
            "styczeń",
            "luty",
            "marzec",
            "kwiecień",
            "maj",
            "czerwiec",
            "lipiec",
            "sierpień",
            "wrzesień",
            "październik",
            "listopad",
            "grudzień",
        ];
    };
    return pl;
}());
exports.pl = pl;


/***/ }),

/***/ 461:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pt_BR = void 0;
var pt_BR = (function () {
    function pt_BR() {
    }
    pt_BR.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    pt_BR.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    pt_BR.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    pt_BR.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    pt_BR.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    pt_BR.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ocorreu um erro ao gerar a descrição da expressão Cron.";
    };
    pt_BR.prototype.at = function () {
        return "às";
    };
    pt_BR.prototype.atSpace = function () {
        return "às ";
    };
    pt_BR.prototype.atX0 = function () {
        return "Às %s";
    };
    pt_BR.prototype.atX0MinutesPastTheHour = function () {
        return "aos %s minutos da hora";
    };
    pt_BR.prototype.atX0SecondsPastTheMinute = function () {
        return "aos %s segundos do minuto";
    };
    pt_BR.prototype.betweenX0AndX1 = function () {
        return "entre %s e %s";
    };
    pt_BR.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre os dias %s e %s do mês";
    };
    pt_BR.prototype.commaEveryDay = function () {
        return ", a cada dia";
    };
    pt_BR.prototype.commaEveryX0Days = function () {
        return ", a cada %s dias";
    };
    pt_BR.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", a cada %s dias de semana";
    };
    pt_BR.prototype.commaEveryX0Months = function () {
        return ", a cada %s meses";
    };
    pt_BR.prototype.commaOnDayX0OfTheMonth = function () {
        return ", no dia %s do mês";
    };
    pt_BR.prototype.commaOnlyInX0 = function (s) {
        return s && s.length > 1 && s[1] === "-" ? "somente %s" : ", somente em %s";
    };
    pt_BR.prototype.commaOnlyOnX0 = function (s) {
        return s && s.length > 1 && s[1] === "-" ? ", somente %s" : ", somente de %s";
    };
    pt_BR.prototype.commaAndOnX0 = function () {
        return ", e de %s";
    };
    pt_BR.prototype.commaOnThe = function () {
        return ", na ";
    };
    pt_BR.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", no último dia do mês";
    };
    pt_BR.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", no último dia da semana do mês";
    };
    pt_BR.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dias antes do último dia do mês";
    };
    pt_BR.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", na última %s do mês";
    };
    pt_BR.prototype.commaOnTheX0OfTheMonth = function () {
        return ", no %s do mês";
    };
    pt_BR.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    pt_BR.prototype.commaAndX0ThroughX1 = function () {
        return ", e de %s a %s";
    };
    pt_BR.prototype.everyHour = function () {
        return "a cada hora";
    };
    pt_BR.prototype.everyMinute = function () {
        return "a cada minuto";
    };
    pt_BR.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "a cada minuto entre %s e %s";
    };
    pt_BR.prototype.everySecond = function () {
        return "a cada segundo";
    };
    pt_BR.prototype.everyX0Hours = function () {
        return "a cada %s horas";
    };
    pt_BR.prototype.everyX0Minutes = function () {
        return "a cada %s minutos";
    };
    pt_BR.prototype.everyX0Seconds = function () {
        return "a cada %s segundos";
    };
    pt_BR.prototype.fifth = function () {
        return "quinta";
    };
    pt_BR.prototype.first = function () {
        return "primeira";
    };
    pt_BR.prototype.firstWeekday = function () {
        return "primeiro dia da semana";
    };
    pt_BR.prototype.fourth = function () {
        return "quarta";
    };
    pt_BR.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "do minuto %s até %s de cada hora";
    };
    pt_BR.prototype.second = function () {
        return "segunda";
    };
    pt_BR.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "No segundo %s até %s de cada minuto";
    };
    pt_BR.prototype.spaceAnd = function () {
        return " e";
    };
    pt_BR.prototype.spaceX0OfTheMonth = function () {
        return " %s do mês";
    };
    pt_BR.prototype.lastDay = function () {
        return "o último dia";
    };
    pt_BR.prototype.third = function () {
        return "terceira";
    };
    pt_BR.prototype.weekdayNearestDayX0 = function () {
        return "dia da semana mais próximo do dia %s";
    };
    pt_BR.prototype.commaEveryX0Years = function () {
        return ", a cada %s anos";
    };
    pt_BR.prototype.commaStartingX0 = function () {
        return ", iniciando %s";
    };
    pt_BR.prototype.daysOfTheWeek = function () {
        return ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    };
    pt_BR.prototype.monthsOfTheYear = function () {
        return [
            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro",
        ];
    };
    return pt_BR;
}());
exports.pt_BR = pt_BR;


/***/ }),

/***/ 713:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pt_PT = void 0;
var pt_PT = (function () {
    function pt_PT() {
    }
    pt_PT.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    pt_PT.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    pt_PT.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    pt_PT.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    pt_PT.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    pt_PT.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ocorreu um erro ao gerar a descrição da expressão Cron.";
    };
    pt_PT.prototype.at = function () {
        return "às";
    };
    pt_PT.prototype.atSpace = function () {
        return "às ";
    };
    pt_PT.prototype.atX0 = function () {
        return "Às %s";
    };
    pt_PT.prototype.atX0MinutesPastTheHour = function () {
        return "aos %s minutos da hora";
    };
    pt_PT.prototype.atX0SecondsPastTheMinute = function () {
        return "aos %s segundos do minuto";
    };
    pt_PT.prototype.betweenX0AndX1 = function () {
        return "entre %s e %s";
    };
    pt_PT.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre os dias %s e %s do mês";
    };
    pt_PT.prototype.commaEveryDay = function () {
        return ", a cada dia";
    };
    pt_PT.prototype.commaEveryX0Days = function () {
        return ", a cada %s dias";
    };
    pt_PT.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", a cada %s dias de semana";
    };
    pt_PT.prototype.commaEveryX0Months = function () {
        return ", a cada %s meses";
    };
    pt_PT.prototype.commaOnDayX0OfTheMonth = function () {
        return ", no dia %s do mês";
    };
    pt_PT.prototype.commaOnlyInX0 = function () {
        return ", somente em %s";
    };
    pt_PT.prototype.commaOnlyOnX0 = function () {
        return ", somente de %s";
    };
    pt_PT.prototype.commaAndOnX0 = function () {
        return ", e de %s";
    };
    pt_PT.prototype.commaOnThe = function () {
        return ", na ";
    };
    pt_PT.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", no último dia do mês";
    };
    pt_PT.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", no último dia da semana do mês";
    };
    pt_PT.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dias antes do último dia do mês";
    };
    pt_PT.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", na última %s do mês";
    };
    pt_PT.prototype.commaOnTheX0OfTheMonth = function () {
        return ", no %s do mês";
    };
    pt_PT.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    pt_PT.prototype.commaAndX0ThroughX1 = function () {
        return ", e de %s a %s";
    };
    pt_PT.prototype.everyHour = function () {
        return "a cada hora";
    };
    pt_PT.prototype.everyMinute = function () {
        return "a cada minuto";
    };
    pt_PT.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "a cada minuto entre %s e %s";
    };
    pt_PT.prototype.everySecond = function () {
        return "a cada segundo";
    };
    pt_PT.prototype.everyX0Hours = function () {
        return "a cada %s horas";
    };
    pt_PT.prototype.everyX0Minutes = function () {
        return "a cada %s minutos";
    };
    pt_PT.prototype.everyX0Seconds = function () {
        return "a cada %s segundos";
    };
    pt_PT.prototype.fifth = function () {
        return "quinta";
    };
    pt_PT.prototype.first = function () {
        return "primeira";
    };
    pt_PT.prototype.firstWeekday = function () {
        return "primeiro dia da semana";
    };
    pt_PT.prototype.fourth = function () {
        return "quarta";
    };
    pt_PT.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "do minuto %s até %s de cada hora";
    };
    pt_PT.prototype.second = function () {
        return "segunda";
    };
    pt_PT.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "No segundo %s até %s de cada minuto";
    };
    pt_PT.prototype.spaceAnd = function () {
        return " e";
    };
    pt_PT.prototype.spaceX0OfTheMonth = function () {
        return " %s do mês";
    };
    pt_PT.prototype.lastDay = function () {
        return "o último dia";
    };
    pt_PT.prototype.third = function () {
        return "terceira";
    };
    pt_PT.prototype.weekdayNearestDayX0 = function () {
        return "dia da semana mais próximo do dia %s";
    };
    pt_PT.prototype.commaEveryX0Years = function () {
        return ", a cada %s anos";
    };
    pt_PT.prototype.commaStartingX0 = function () {
        return ", iniciando %s";
    };
    pt_PT.prototype.daysOfTheWeek = function () {
        return ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    };
    pt_PT.prototype.monthsOfTheYear = function () {
        return [
            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro",
        ];
    };
    return pt_PT;
}());
exports.pt_PT = pt_PT;


/***/ }),

/***/ 408:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ro = void 0;
var ro = (function () {
    function ro() {
    }
    ro.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    ro.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Eroare la generarea descrierii. Verificați sintaxa.";
    };
    ro.prototype.at = function () {
        return "La";
    };
    ro.prototype.atSpace = function () {
        return "La ";
    };
    ro.prototype.atX0 = function () {
        return "la %s";
    };
    ro.prototype.atX0MinutesPastTheHour = function () {
        return "la și %s minute";
    };
    ro.prototype.atX0SecondsPastTheMinute = function () {
        return "la și %s secunde";
    };
    ro.prototype.betweenX0AndX1 = function () {
        return "între %s și %s";
    };
    ro.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", între zilele %s și %s ale lunii";
    };
    ro.prototype.commaEveryDay = function () {
        return ", în fiecare zi";
    };
    ro.prototype.commaEveryX0Days = function () {
        return ", la fiecare %s zile";
    };
    ro.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", la fiecare a %s-a zi a săptămânii";
    };
    ro.prototype.commaEveryX0Months = function () {
        return ", la fiecare %s luni";
    };
    ro.prototype.commaEveryX0Years = function () {
        return ", o dată la %s ani";
    };
    ro.prototype.commaOnDayX0OfTheMonth = function () {
        return ", în ziua %s a lunii";
    };
    ro.prototype.commaOnlyInX0 = function () {
        return ", doar în %s";
    };
    ro.prototype.commaOnlyOnX0 = function () {
        return ", doar %s";
    };
    ro.prototype.commaAndOnX0 = function () {
        return ", și %s";
    };
    ro.prototype.commaOnThe = function () {
        return ", în ";
    };
    ro.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", în ultima zi a lunii";
    };
    ro.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", în ultima zi lucrătoare a lunii";
    };
    ro.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s zile înainte de ultima zi a lunii";
    };
    ro.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", în ultima %s a lunii";
    };
    ro.prototype.commaOnTheX0OfTheMonth = function () {
        return ", în %s a lunii";
    };
    ro.prototype.commaX0ThroughX1 = function () {
        return ", de %s până %s";
    };
    ro.prototype.commaAndX0ThroughX1 = function () {
        return ", și de %s până %s";
    };
    ro.prototype.everyHour = function () {
        return "în fiecare oră";
    };
    ro.prototype.everyMinute = function () {
        return "în fiecare minut";
    };
    ro.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "În fiecare minut între %s și %s";
    };
    ro.prototype.everySecond = function () {
        return "în fiecare secundă";
    };
    ro.prototype.everyX0Hours = function () {
        return "la fiecare %s ore";
    };
    ro.prototype.everyX0Minutes = function () {
        return "la fiecare %s minute";
    };
    ro.prototype.everyX0Seconds = function () {
        return "la fiecare %s secunde";
    };
    ro.prototype.fifth = function () {
        return "a cincea";
    };
    ro.prototype.first = function () {
        return "prima";
    };
    ro.prototype.firstWeekday = function () {
        return "prima zi a săptămânii";
    };
    ro.prototype.fourth = function () {
        return "a patra";
    };
    ro.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "între minutele %s și %s";
    };
    ro.prototype.second = function () {
        return "a doua";
    };
    ro.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "între secunda %s și secunda %s";
    };
    ro.prototype.spaceAnd = function () {
        return " și";
    };
    ro.prototype.spaceX0OfTheMonth = function () {
        return " %s a lunii";
    };
    ro.prototype.lastDay = function () {
        return "ultima zi";
    };
    ro.prototype.third = function () {
        return "a treia";
    };
    ro.prototype.weekdayNearestDayX0 = function () {
        return "cea mai apropiată zi a săptămânii de ziua %s";
    };
    ro.prototype.commaMonthX0ThroughMonthX1 = function () {
        return ", din %s până în %s";
    };
    ro.prototype.commaYearX0ThroughYearX1 = function () {
        return ", din %s până în %s";
    };
    ro.prototype.atX0MinutesPastTheHourGt20 = function () {
        return "la și %s de minute";
    };
    ro.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return "la și %s de secunde";
    };
    ro.prototype.commaStartingX0 = function () {
        return ", pornire %s";
    };
    ro.prototype.daysOfTheWeek = function () {
        return ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
    };
    ro.prototype.monthsOfTheYear = function () {
        return [
            "ianuarie",
            "februarie",
            "martie",
            "aprilie",
            "mai",
            "iunie",
            "iulie",
            "august",
            "septembrie",
            "octombrie",
            "noiembrie",
            "decembrie",
        ];
    };
    return ro;
}());
exports.ro = ro;


/***/ }),

/***/ 392:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ru = void 0;
var getPhraseByNumber = function (str, words) {
    var number = Number(str);
    return number !== undefined
        ? words[number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]]
        : words[2];
};
var getPhraseByDayOfWeek = function (str, words) {
    var number = Number(str);
    return number !== undefined
        ? words[number === 0 ? 0 : number === 1 || number === 2 || number === 4 ? 1 : 2]
        : words[1];
};
var ru = (function () {
    function ru() {
    }
    ru.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ru.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ru.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ru.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ru.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    ru.prototype.everyMinute = function () {
        return "каждую минуту";
    };
    ru.prototype.everyHour = function () {
        return "каждый час";
    };
    ru.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Произошла ошибка во время генерации описания выражения. Проверьте синтаксис крон-выражения.";
    };
    ru.prototype.atSpace = function () {
        return "В ";
    };
    ru.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Каждую минуту с %s по %s";
    };
    ru.prototype.at = function () {
        return "В";
    };
    ru.prototype.spaceAnd = function () {
        return " и";
    };
    ru.prototype.everySecond = function () {
        return "каждую секунду";
    };
    ru.prototype.everyX0Seconds = function (s) {
        return getPhraseByNumber(s, ["каждую %s секунду", "каждые %s секунды", "каждые %s секунд"]);
    };
    ru.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "секунды с %s по %s";
    };
    ru.prototype.atX0SecondsPastTheMinute = function (s) {
        return getPhraseByNumber(s, ["в %s секунду", "в %s секунды", "в %s секунд"]);
    };
    ru.prototype.everyX0Minutes = function (s) {
        return getPhraseByNumber(s, ["каждую %s минуту", "каждые %s минуты", "каждые %s минут"]);
    };
    ru.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "минуты с %s по %s";
    };
    ru.prototype.atX0MinutesPastTheHour = function (s) {
        return getPhraseByNumber(s, ["в %s минуту", "в %s минуты", "в %s минут"]);
    };
    ru.prototype.everyX0Hours = function (s) {
        return getPhraseByNumber(s, ["каждый %s час", "каждые %s часа", "каждые %s часов"]);
    };
    ru.prototype.betweenX0AndX1 = function () {
        return "с %s по %s";
    };
    ru.prototype.atX0 = function () {
        return "в %s";
    };
    ru.prototype.commaEveryDay = function () {
        return ", каждый день";
    };
    ru.prototype.commaEveryX0DaysOfTheWeek = function (s) {
        return getPhraseByNumber(s, ["", ", каждые %s дня недели", ", каждые %s дней недели"]);
    };
    ru.prototype.commaX0ThroughX1 = function (s) {
        return s && (s[0] == "2" || s[0] == "3") ? ", со %s по %s" : ", с %s по %s";
    };
    ru.prototype.commaAndX0ThroughX1 = function (s) {
        return s && (s[0] == "2" || s[0] == "3") ? " и со %s по %s" : " и с %s по %s";
    };
    ru.prototype.first = function (s) {
        return getPhraseByDayOfWeek(s, ["первое", "первый", "первую"]);
    };
    ru.prototype.second = function (s) {
        return getPhraseByDayOfWeek(s, ["второе", "второй", "вторую"]);
    };
    ru.prototype.third = function (s) {
        return getPhraseByDayOfWeek(s, ["третье", "третий", "третью"]);
    };
    ru.prototype.fourth = function (s) {
        return getPhraseByDayOfWeek(s, ["четвертое", "четвертый", "четвертую"]);
    };
    ru.prototype.fifth = function (s) {
        return getPhraseByDayOfWeek(s, ["пятое", "пятый", "пятую"]);
    };
    ru.prototype.commaOnThe = function (s) {
        return s === "2" ? ", во " : ", в ";
    };
    ru.prototype.spaceX0OfTheMonth = function () {
        return " %s месяца";
    };
    ru.prototype.lastDay = function () {
        return "последний день";
    };
    ru.prototype.commaOnTheLastX0OfTheMonth = function (s) {
        return getPhraseByDayOfWeek(s, [", в последнее %s месяца", ", в последний %s месяца", ", в последнюю %s месяца"]);
    };
    ru.prototype.commaOnlyOnX0 = function (s) {
        return s && s[0] === "2" ? ", только во %s" : ", только в %s";
    };
    ru.prototype.commaAndOnX0 = function () {
        return ", и %s";
    };
    ru.prototype.commaEveryX0Months = function (s) {
        return getPhraseByNumber(s, ["", " каждые %s месяца", " каждые %s месяцев"]);
    };
    ru.prototype.commaOnlyInMonthX0 = function () {
        return ", только %s";
    };
    ru.prototype.commaOnlyInX0 = function () {
        return ", только в %s";
    };
    ru.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", в последний день месяца";
    };
    ru.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", в последний будний день месяца";
    };
    ru.prototype.commaDaysBeforeTheLastDayOfTheMonth = function (s) {
        return getPhraseByNumber(s, [
            ", за %s день до конца месяца",
            ", за %s дня до конца месяца",
            ", за %s дней до конца месяца",
        ]);
    };
    ru.prototype.firstWeekday = function () {
        return "первый будний день";
    };
    ru.prototype.weekdayNearestDayX0 = function () {
        return "ближайший будний день к %s числу";
    };
    ru.prototype.commaOnTheX0OfTheMonth = function () {
        return ", в %s месяца";
    };
    ru.prototype.commaEveryX0Days = function (s) {
        return getPhraseByNumber(s, [", каждый %s день", ", каждые %s дня", ", каждые %s дней"]);
    };
    ru.prototype.commaBetweenDayX0AndX1OfTheMonth = function (s) {
        return s && s.substring(0, s.indexOf("-")) == "2" ? ", со %s по %s число месяца" : ", с %s по %s число месяца";
    };
    ru.prototype.commaOnDayX0OfTheMonth = function (s) {
        return s && s[0] == "2" ? ", во %s число месяца" : ", в %s число месяца";
    };
    ru.prototype.commaEveryX0Years = function (s) {
        return getPhraseByNumber(s, [", каждый %s год", ", каждые %s года", ", каждые %s лет"]);
    };
    ru.prototype.commaStartingX0 = function () {
        return ", начало %s";
    };
    ru.prototype.daysOfTheWeek = function () {
        return ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
    };
    ru.prototype.daysOfTheWeekInCase = function (f) {
        if (f === void 0) { f = 2; }
        return f == 1
            ? ["воскресенья", "понедельника", "вторника", "среды", "четверга", "пятницы", "субботы"]
            : ["воскресенье", "понедельник", "вторник", "среду", "четверг", "пятницу", "субботу"];
    };
    ru.prototype.monthsOfTheYear = function () {
        return [
            "январь",
            "февраль",
            "март",
            "апрель",
            "май",
            "июнь",
            "июль",
            "август",
            "сентябрь",
            "октябрь",
            "ноябрь",
            "декабрь",
        ];
    };
    ru.prototype.monthsOfTheYearInCase = function (f) {
        return f == 1
            ? [
                "января",
                "февраля",
                "марта",
                "апреля",
                "мая",
                "июня",
                "июля",
                "августа",
                "сентября",
                "октября",
                "ноября",
                "декабря",
            ]
            : this.monthsOfTheYear();
    };
    return ru;
}());
exports.ru = ru;


/***/ }),

/***/ 203:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sk = void 0;
var sk = (function () {
    function sk() {
    }
    sk.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sk.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sk.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sk.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sk.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sk.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Pri vytváraní popisu došlo k chybe. Skontrolujte prosím správnosť syntaxe cronu.";
    };
    sk.prototype.everyMinute = function () {
        return "každú minútu";
    };
    sk.prototype.everyHour = function () {
        return "každú hodinu";
    };
    sk.prototype.atSpace = function () {
        return "V ";
    };
    sk.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Každú minútu medzi %s a %s";
    };
    sk.prototype.at = function () {
        return "V";
    };
    sk.prototype.spaceAnd = function () {
        return " a";
    };
    sk.prototype.everySecond = function () {
        return "každú sekundu";
    };
    sk.prototype.everyX0Seconds = function () {
        return "každých %s sekúnd";
    };
    sk.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    sk.prototype.atX0SecondsPastTheMinute = function () {
        return "v %s sekúnd";
    };
    sk.prototype.everyX0Minutes = function () {
        return "každých %s minút";
    };
    sk.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minúty od %s do %s";
    };
    sk.prototype.atX0MinutesPastTheHour = function () {
        return "v %s minút";
    };
    sk.prototype.everyX0Hours = function () {
        return "každých %s hodín";
    };
    sk.prototype.betweenX0AndX1 = function () {
        return "medzi %s a %s";
    };
    sk.prototype.atX0 = function () {
        return "v %s";
    };
    sk.prototype.commaEveryDay = function () {
        return ", každý deň";
    };
    sk.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", každých %s dní v týždni";
    };
    sk.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    sk.prototype.commaAndX0ThroughX1 = function () {
        return ", a od %s do %s";
    };
    sk.prototype.first = function () {
        return "prvý";
    };
    sk.prototype.second = function () {
        return "druhý";
    };
    sk.prototype.third = function () {
        return "tretí";
    };
    sk.prototype.fourth = function () {
        return "štvrtý";
    };
    sk.prototype.fifth = function () {
        return "piaty";
    };
    sk.prototype.commaOnThe = function () {
        return ", ";
    };
    sk.prototype.spaceX0OfTheMonth = function () {
        return " %s v mesiaci";
    };
    sk.prototype.lastDay = function () {
        return "posledný deň";
    };
    sk.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", posledný %s v mesiaci";
    };
    sk.prototype.commaOnlyOnX0 = function () {
        return ", iba v %s";
    };
    sk.prototype.commaAndOnX0 = function () {
        return ", a v %s";
    };
    sk.prototype.commaEveryX0Months = function () {
        return ", každých %s mesiacov";
    };
    sk.prototype.commaOnlyInX0 = function () {
        return ", iba v %s";
    };
    sk.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", posledný deň v mesiaci";
    };
    sk.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", posledný pracovný deň v mesiaci";
    };
    sk.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dní pred posledným dňom v mesiaci";
    };
    sk.prototype.firstWeekday = function () {
        return "prvý pracovný deň";
    };
    sk.prototype.weekdayNearestDayX0 = function () {
        return "pracovný deň najbližšie %s. dňu";
    };
    sk.prototype.commaOnTheX0OfTheMonth = function () {
        return ", v %s v mesiaci";
    };
    sk.prototype.commaEveryX0Days = function () {
        return ", každých %s dní";
    };
    sk.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", medzi dňami %s a %s v mesiaci";
    };
    sk.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. deň v mesiaci";
    };
    sk.prototype.commaEveryX0Years = function () {
        return ", každých %s rokov";
    };
    sk.prototype.commaStartingX0 = function () {
        return ", začínajúcich %s";
    };
    sk.prototype.daysOfTheWeek = function () {
        return ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];
    };
    sk.prototype.monthsOfTheYear = function () {
        return [
            "Január",
            "Február",
            "Marec",
            "Apríl",
            "Máj",
            "Jún",
            "Júl",
            "August",
            "September",
            "Október",
            "November",
            "December",
        ];
    };
    return sk;
}());
exports.sk = sk;


/***/ }),

/***/ 738:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sl = void 0;
var sl = (function () {
    function sl() {
    }
    sl.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Pri generiranju opisa izraza je prišlo do napake. Preverite sintakso izraza cron.";
    };
    sl.prototype.at = function () {
        return "Ob";
    };
    sl.prototype.atSpace = function () {
        return "Ob ";
    };
    sl.prototype.atX0 = function () {
        return "ob %s";
    };
    sl.prototype.atX0MinutesPastTheHour = function () {
        return "ob %s.";
    };
    sl.prototype.atX0SecondsPastTheMinute = function () {
        return "ob %s.";
    };
    sl.prototype.betweenX0AndX1 = function () {
        return "od %s do %s";
    };
    sl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", od %s. do %s. dne v mesecu";
    };
    sl.prototype.commaEveryDay = function () {
        return ", vsak dan";
    };
    sl.prototype.commaEveryX0Days = function () {
        return ", vsakih %s dni";
    };
    sl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", vsakih %s dni v tednu";
    };
    sl.prototype.commaEveryX0Months = function () {
        return ", vsakih %s mesecev";
    };
    sl.prototype.commaEveryX0Years = function () {
        return ", vsakih %s let";
    };
    sl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. dan v mesecu";
    };
    sl.prototype.commaOnlyInX0 = function () {
        return ", samo v %s";
    };
    sl.prototype.commaOnlyOnX0 = function () {
        return ", samo v %s";
    };
    sl.prototype.commaAndOnX0 = function () {
        return "in naprej %s";
    };
    sl.prototype.commaOnThe = function () {
        return ", ";
    };
    sl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", zadnji %s v mesecu";
    };
    sl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", zadnji delovni dan v mesecu";
    };
    sl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dni pred koncem meseca";
    };
    sl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", zadnji %s v mesecu";
    };
    sl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", %s v mesecu";
    };
    sl.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    sl.prototype.commaAndX0ThroughX1 = function () {
        return ", in od %s do %s";
    };
    sl.prototype.everyHour = function () {
        return "vsako uro";
    };
    sl.prototype.everyMinute = function () {
        return "vsako minuto";
    };
    sl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Vsako minuto od %s do %s";
    };
    sl.prototype.everySecond = function () {
        return "vsako sekundo";
    };
    sl.prototype.everyX0Hours = function () {
        return "vsakih %s ur";
    };
    sl.prototype.everyX0Minutes = function () {
        return "vsakih %s minut";
    };
    sl.prototype.everyX0Seconds = function () {
        return "vsakih %s sekund";
    };
    sl.prototype.fifth = function () {
        return "peti";
    };
    sl.prototype.first = function () {
        return "prvi";
    };
    sl.prototype.firstWeekday = function () {
        return "prvi delovni dan";
    };
    sl.prototype.fourth = function () {
        return "četrti";
    };
    sl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minute od %s do %s";
    };
    sl.prototype.second = function () {
        return "drugi";
    };
    sl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunde od %s do %s";
    };
    sl.prototype.spaceAnd = function () {
        return " in";
    };
    sl.prototype.spaceX0OfTheMonth = function () {
        return " %s v mesecu";
    };
    sl.prototype.lastDay = function () {
        return "zadnjič";
    };
    sl.prototype.third = function () {
        return "tretji";
    };
    sl.prototype.weekdayNearestDayX0 = function () {
        return "delovni dan, najbližji %s. dnevu";
    };
    sl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sl.prototype.commaStartingX0 = function () {
        return ", začenši %s";
    };
    sl.prototype.daysOfTheWeek = function () {
        return ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"];
    };
    sl.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "marec",
            "april",
            "maj",
            "junij",
            "julij",
            "avgust",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return sl;
}());
exports.sl = sl;


/***/ }),

/***/ 673:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sv = void 0;
var sv = (function () {
    function sv() {
    }
    sv.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sv.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sv.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sv.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sv.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sv.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ett fel inträffade vid generering av uttryckets beskrivning. Kontrollera cron-uttryckets syntax.";
    };
    sv.prototype.everyMinute = function () {
        return "varje minut";
    };
    sv.prototype.everyHour = function () {
        return "varje timme";
    };
    sv.prototype.atSpace = function () {
        return "Kl ";
    };
    sv.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Varje minut mellan %s och %s";
    };
    sv.prototype.at = function () {
        return "Kl";
    };
    sv.prototype.spaceAnd = function () {
        return " och";
    };
    sv.prototype.everySecond = function () {
        return "varje sekund";
    };
    sv.prototype.everyX0Seconds = function () {
        return "varje %s sekund";
    };
    sv.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunderna från %s till och med %s efter minuten";
    };
    sv.prototype.atX0SecondsPastTheMinute = function () {
        return "på %s sekunder efter minuten";
    };
    sv.prototype.everyX0Minutes = function () {
        return "var %s minut";
    };
    sv.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuterna från %s till och med %s efter timmen";
    };
    sv.prototype.atX0MinutesPastTheHour = function () {
        return "på %s minuten efter timmen";
    };
    sv.prototype.everyX0Hours = function () {
        return "var %s timme";
    };
    sv.prototype.betweenX0AndX1 = function () {
        return "mellan %s och %s";
    };
    sv.prototype.atX0 = function () {
        return "kl %s";
    };
    sv.prototype.commaEveryDay = function () {
        return ", varje dag";
    };
    sv.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", var %s dag i veckan";
    };
    sv.prototype.commaX0ThroughX1 = function () {
        return ", %s till %s";
    };
    sv.prototype.commaAndX0ThroughX1 = function () {
        return ", och %s till %s";
    };
    sv.prototype.first = function () {
        return "första";
    };
    sv.prototype.second = function () {
        return "andra";
    };
    sv.prototype.third = function () {
        return "tredje";
    };
    sv.prototype.fourth = function () {
        return "fjärde";
    };
    sv.prototype.fifth = function () {
        return "femte";
    };
    sv.prototype.commaOnThe = function () {
        return ", den ";
    };
    sv.prototype.spaceX0OfTheMonth = function () {
        return " %sen av månaden";
    };
    sv.prototype.lastDay = function () {
        return "den sista dagen";
    };
    sv.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", på sista %s av månaden";
    };
    sv.prototype.commaOnlyOnX0 = function () {
        return ", varje %s";
    };
    sv.prototype.commaAndOnX0 = function () {
        return ", och på %s";
    };
    sv.prototype.commaEveryX0Months = function () {
        return ", var %s månad";
    };
    sv.prototype.commaOnlyInX0 = function () {
        return ", bara på %s";
    };
    sv.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", på sista dagen av månaden";
    };
    sv.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", på sista veckodag av månaden";
    };
    sv.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dagar före den sista dagen i månaden";
    };
    sv.prototype.firstWeekday = function () {
        return "första veckodag";
    };
    sv.prototype.weekdayNearestDayX0 = function () {
        return "veckodagen närmast dag %s";
    };
    sv.prototype.commaOnTheX0OfTheMonth = function () {
        return ", på den %s av månaden";
    };
    sv.prototype.commaEveryX0Days = function () {
        return ", var %s dag";
    };
    sv.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellan dag %s och %s av månaden";
    };
    sv.prototype.commaOnDayX0OfTheMonth = function () {
        return ", på dag %s av månaden";
    };
    sv.prototype.commaEveryX0Years = function () {
        return ", var %s år";
    };
    sv.prototype.commaStartingX0 = function () {
        return ", startar %s";
    };
    sv.prototype.daysOfTheWeek = function () {
        return ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
    };
    sv.prototype.monthsOfTheYear = function () {
        return [
            "januari",
            "februari",
            "mars",
            "april",
            "maj",
            "juni",
            "juli",
            "augusti",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return sv;
}());
exports.sv = sv;


/***/ }),

/***/ 286:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sw = void 0;
var sw = (function () {
    function sw() {
    }
    sw.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sw.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sw.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sw.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sw.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sw.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Kuna tatizo wakati wa kutunga msemo. Angalia cron expression syntax.";
    };
    sw.prototype.everyMinute = function () {
        return "kila dakika";
    };
    sw.prototype.everyHour = function () {
        return "kila saa";
    };
    sw.prototype.atSpace = function () {
        return "Kwa ";
    };
    sw.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Kila dakika kwanzia %s hadi %s";
    };
    sw.prototype.at = function () {
        return "Kwa";
    };
    sw.prototype.spaceAnd = function () {
        return " na";
    };
    sw.prototype.everySecond = function () {
        return "kila sekunde";
    };
    sw.prototype.everyX0Seconds = function () {
        return "kila sekunde %s";
    };
    sw.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunde ya %s hadi %s baada ya dakika";
    };
    sw.prototype.atX0SecondsPastTheMinute = function () {
        return "sekunde %s baada ya dakika";
    };
    sw.prototype.everyX0Minutes = function () {
        return "kila dakika %s";
    };
    sw.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutes %s through %s past the hour";
    };
    sw.prototype.atX0MinutesPastTheHour = function () {
        return "at %s minutes past the hour";
    };
    sw.prototype.everyX0Hours = function () {
        return "every %s hours";
    };
    sw.prototype.betweenX0AndX1 = function () {
        return "kati ya %s na %s";
    };
    sw.prototype.atX0 = function () {
        return "kwenye %s";
    };
    sw.prototype.commaEveryDay = function () {
        return ", kila siku";
    };
    sw.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", kila siku %s ya wiki";
    };
    sw.prototype.commaX0ThroughX1 = function () {
        return ", %s hadi %s";
    };
    sw.prototype.commaAndX0ThroughX1 = function () {
        return ", na %s hadi %s";
    };
    sw.prototype.first = function () {
        return "ya kwanza";
    };
    sw.prototype.second = function () {
        return "ya pili";
    };
    sw.prototype.third = function () {
        return "ya tatu";
    };
    sw.prototype.fourth = function () {
        return "ya nne";
    };
    sw.prototype.fifth = function () {
        return "ya tano";
    };
    sw.prototype.commaOnThe = function () {
        return ", kwenye ";
    };
    sw.prototype.spaceX0OfTheMonth = function () {
        return " siku %s ya mwezi";
    };
    sw.prototype.lastDay = function () {
        return "siku ya mwisho";
    };
    sw.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaOnlyOnX0 = function () {
        return ", kwa %s tu";
    };
    sw.prototype.commaAndOnX0 = function () {
        return ", na pia %s";
    };
    sw.prototype.commaEveryX0Months = function () {
        return ", kila mwezi wa %s";
    };
    sw.prototype.commaOnlyInX0 = function () {
        return ", kwa %s tu";
    };
    sw.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", siku ya mwisho wa mwezi";
    };
    sw.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", wikendi ya mwisho wa mwezi";
    };
    sw.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", siku ya %s kabla ya siku ya mwisho wa mwezi";
    };
    sw.prototype.firstWeekday = function () {
        return "siku za kazi ya kwanza";
    };
    sw.prototype.weekdayNearestDayX0 = function () {
        return "siku ya kazi karibu na siku ya %s";
    };
    sw.prototype.commaOnTheX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaEveryX0Days = function () {
        return ", kila siku %s";
    };
    sw.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", kati ya siku %s na %s ya mwezi";
    };
    sw.prototype.commaOnDayX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaEveryX0Years = function () {
        return ", kila miaka %s";
    };
    sw.prototype.commaStartingX0 = function () {
        return ", kwanzia %s";
    };
    sw.prototype.daysOfTheWeek = function () {
        return ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"];
    };
    sw.prototype.monthsOfTheYear = function () {
        return [
            "Januari",
            "Februari",
            "Machi",
            "Aprili",
            "Mei",
            "Juni",
            "Julai",
            "Agosti",
            "Septemba",
            "Oktoba",
            "Novemba",
            "Desemba",
        ];
    };
    return sw;
}());
exports.sw = sw;


/***/ }),

/***/ 312:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.th = void 0;
var th = (function () {
    function th() {
    }
    th.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    th.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    th.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    th.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    th.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    th.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "เกิดข้อผิดพลาดขณะสร้างคำอธิบายนิพจน์ ตรวจสอบไวยากรณ์นิพจน์ครอน";
    };
    th.prototype.everyMinute = function () {
        return "ทุกๆ นาที";
    };
    th.prototype.everyHour = function () {
        return "ทุกๆ ชั่วโมง";
    };
    th.prototype.atSpace = function () {
        return "เมื่อ ";
    };
    th.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "ทุกๆ นาที %s และ %s";
    };
    th.prototype.at = function () {
        return "เมื่อ";
    };
    th.prototype.spaceAnd = function () {
        return " และ";
    };
    th.prototype.everySecond = function () {
        return "ทุกๆ วินาที";
    };
    th.prototype.everyX0Seconds = function () {
        return "ทุกๆ %s วินาที";
    };
    th.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "วินาที %s ถึง %s นาทีที่ผ่านมา";
    };
    th.prototype.atX0SecondsPastTheMinute = function () {
        return "เมื่อ %s วินาที นาทีที่ผ่านมา";
    };
    th.prototype.everyX0Minutes = function () {
        return "ทุกๆ %s นาที";
    };
    th.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "นาที %s ถึง %s ชั่วโมงที่ผ่านมา";
    };
    th.prototype.atX0MinutesPastTheHour = function () {
        return "เมื่อ %s นาที ชั่วโมงที่ผ่านมา";
    };
    th.prototype.everyX0Hours = function () {
        return "ทุกๆ %s ชั่วโมง";
    };
    th.prototype.betweenX0AndX1 = function () {
        return "ระหว่าง %s ถึง %s";
    };
    th.prototype.atX0 = function () {
        return "เมื่อ %s";
    };
    th.prototype.commaEveryDay = function () {
        return ", ทุกๆ วัน";
    };
    th.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ทุกๆ %s วันของสัปดาห์";
    };
    th.prototype.commaX0ThroughX1 = function () {
        return ", %s ถึง %s";
    };
    th.prototype.commaAndX0ThroughX1 = function () {
        return ", %s ถึง %s";
    };
    th.prototype.first = function () {
        return "แรก";
    };
    th.prototype.second = function () {
        return "ที่สอง";
    };
    th.prototype.third = function () {
        return "ที่สาม";
    };
    th.prototype.fourth = function () {
        return "ที่สี่";
    };
    th.prototype.fifth = function () {
        return "ที่ห้า";
    };
    th.prototype.commaOnThe = function () {
        return ", ในวัน ";
    };
    th.prototype.spaceX0OfTheMonth = function () {
        return " %s ของเดือน";
    };
    th.prototype.lastDay = function () {
        return "วันสุดท้าย";
    };
    th.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ณ สุดท้าย %s ของเดือน";
    };
    th.prototype.commaOnlyOnX0 = function () {
        return ", เท่านั้น %s";
    };
    th.prototype.commaAndOnX0 = function () {
        return ", และใน %s";
    };
    th.prototype.commaEveryX0Months = function () {
        return ", ทุกๆ %s เดือน";
    };
    th.prototype.commaOnlyInX0 = function () {
        return ", เท่านั้น %s";
    };
    th.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ในวันสิ้นเดือน";
    };
    th.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ในวันธรรมดาสุดท้ายของเดือน";
    };
    th.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s วันก่อนวันสุดท้ายของเดือน";
    };
    th.prototype.firstWeekday = function () {
        return "วันธรรมดาวันแรก";
    };
    th.prototype.weekdayNearestDayX0 = function () {
        return "วันธรรมดาที่ใกล้ที่สุด %s";
    };
    th.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ในวัน %s ของเดือน";
    };
    th.prototype.commaEveryX0Days = function () {
        return ", ทุกๆ %s วัน";
    };
    th.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ระหว่างวัน %s และ %s ของเดือน";
    };
    th.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ในวัน %s ของเดือน";
    };
    th.prototype.commaEveryHour = function () {
        return ", ทุกๆ ชั่วโมง";
    };
    th.prototype.commaEveryX0Years = function () {
        return ", ทุกๆ %s ปี";
    };
    th.prototype.commaStartingX0 = function () {
        return ", เริ่ม %s";
    };
    th.prototype.daysOfTheWeek = function () {
        return ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"];
    };
    th.prototype.monthsOfTheYear = function () {
        return [
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฎาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม",
        ];
    };
    return th;
}());
exports.th = th;


/***/ }),

/***/ 999:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tr = void 0;
var tr = (function () {
    function tr() {
    }
    tr.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    tr.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    tr.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    tr.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    tr.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    tr.prototype.everyMinute = function () {
        return "her dakika";
    };
    tr.prototype.everyHour = function () {
        return "her saat";
    };
    tr.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "İfade açıklamasını oluştururken bir hata oluştu. Cron ifadesini gözden geçirin.";
    };
    tr.prototype.atSpace = function () {
        return "Saat ";
    };
    tr.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Saat %s ve %s arasındaki her dakika";
    };
    tr.prototype.at = function () {
        return "Saat";
    };
    tr.prototype.spaceAnd = function () {
        return " ve";
    };
    tr.prototype.everySecond = function () {
        return "her saniye";
    };
    tr.prototype.everyX0Seconds = function () {
        return "her %s saniyede bir";
    };
    tr.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "dakikaların %s. ve %s. saniyeleri arası";
    };
    tr.prototype.atX0SecondsPastTheMinute = function () {
        return "dakikaların %s. saniyesinde";
    };
    tr.prototype.everyX0Minutes = function () {
        return "her %s dakikada bir";
    };
    tr.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "saatlerin %s. ve %s. dakikaları arası";
    };
    tr.prototype.atX0MinutesPastTheHour = function () {
        return "saatlerin %s. dakikasında";
    };
    tr.prototype.everyX0Hours = function () {
        return "her %s saatte";
    };
    tr.prototype.betweenX0AndX1 = function () {
        return "%s ile %s arasında";
    };
    tr.prototype.atX0 = function () {
        return "saat %s";
    };
    tr.prototype.commaEveryDay = function () {
        return ", her gün";
    };
    tr.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ayın her %s günü";
    };
    tr.prototype.commaX0ThroughX1 = function () {
        return ", %s ile %s arasında";
    };
    tr.prototype.commaAndX0ThroughX1 = function () {
        return ", ve %s ile %s arasında";
    };
    tr.prototype.first = function () {
        return "ilk";
    };
    tr.prototype.second = function () {
        return "ikinci";
    };
    tr.prototype.third = function () {
        return "üçüncü";
    };
    tr.prototype.fourth = function () {
        return "dördüncü";
    };
    tr.prototype.fifth = function () {
        return "beşinci";
    };
    tr.prototype.commaOnThe = function () {
        return ", ayın ";
    };
    tr.prototype.spaceX0OfTheMonth = function () {
        return " %s günü";
    };
    tr.prototype.lastDay = function () {
        return "son gün";
    };
    tr.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ayın son %s günü";
    };
    tr.prototype.commaOnlyOnX0 = function () {
        return ", sadece %s günü";
    };
    tr.prototype.commaAndOnX0 = function () {
        return ", ve %s";
    };
    tr.prototype.commaEveryX0Months = function () {
        return ", %s ayda bir";
    };
    tr.prototype.commaOnlyInX0 = function () {
        return ", sadece %s için";
    };
    tr.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ayın son günü";
    };
    tr.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ayın son iş günü";
    };
    tr.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ayın son gününden önceki günler";
    };
    tr.prototype.firstWeekday = function () {
        return "ilk iş günü";
    };
    tr.prototype.weekdayNearestDayX0 = function () {
        return "%s. günü sonrasındaki ilk iş günü";
    };
    tr.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ayın %s";
    };
    tr.prototype.commaEveryX0Days = function () {
        return ", %s günde bir";
    };
    tr.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ayın %s. ve %s. günleri arası";
    };
    tr.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ayın %s. günü";
    };
    tr.prototype.commaEveryX0Years = function () {
        return ", %s yılda bir";
    };
    tr.prototype.commaStartingX0 = function () {
        return ", başlangıç %s";
    };
    tr.prototype.daysOfTheWeek = function () {
        return ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    };
    tr.prototype.monthsOfTheYear = function () {
        return [
            "Ocak",
            "Şubat",
            "Mart",
            "Nisan",
            "Mayıs",
            "Haziran",
            "Temmuz",
            "Ağustos",
            "Eylül",
            "Ekim",
            "Kasım",
            "Aralık",
        ];
    };
    return tr;
}());
exports.tr = tr;


/***/ }),

/***/ 716:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uk = void 0;
var uk = (function () {
    function uk() {
    }
    uk.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    uk.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    uk.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    uk.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    uk.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    uk.prototype.everyMinute = function () {
        return "щохвилини";
    };
    uk.prototype.everyHour = function () {
        return "щогодини";
    };
    uk.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "ВІдбулася помилка підчас генерації опису. Перевірта правильність написання cron виразу.";
    };
    uk.prototype.atSpace = function () {
        return "О ";
    };
    uk.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Щохвилини між %s та %s";
    };
    uk.prototype.at = function () {
        return "О";
    };
    uk.prototype.spaceAnd = function () {
        return " та";
    };
    uk.prototype.everySecond = function () {
        return "Щосекунди";
    };
    uk.prototype.everyX0Seconds = function () {
        return "кожні %s секунд";
    };
    uk.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "з %s по %s секунду";
    };
    uk.prototype.atX0SecondsPastTheMinute = function () {
        return "о %s секунді";
    };
    uk.prototype.everyX0Minutes = function () {
        return "кожні %s хвилин";
    };
    uk.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "з %s по %s хвилину";
    };
    uk.prototype.atX0MinutesPastTheHour = function () {
        return "о %s хвилині";
    };
    uk.prototype.everyX0Hours = function () {
        return "кожні %s годин";
    };
    uk.prototype.betweenX0AndX1 = function () {
        return "між %s та %s";
    };
    uk.prototype.atX0 = function () {
        return "о %s";
    };
    uk.prototype.commaEveryDay = function () {
        return ", щоденно";
    };
    uk.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", кожен %s день тижня";
    };
    uk.prototype.commaX0ThroughX1 = function () {
        return ", %s по %s";
    };
    uk.prototype.commaAndX0ThroughX1 = function () {
        return ", та %s по %s";
    };
    uk.prototype.first = function () {
        return "перший";
    };
    uk.prototype.second = function () {
        return "другий";
    };
    uk.prototype.third = function () {
        return "третій";
    };
    uk.prototype.fourth = function () {
        return "четвертий";
    };
    uk.prototype.fifth = function () {
        return "п'ятий";
    };
    uk.prototype.commaOnThe = function () {
        return ", в ";
    };
    uk.prototype.spaceX0OfTheMonth = function () {
        return " %s місяця";
    };
    uk.prototype.lastDay = function () {
        return "останній день";
    };
    uk.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", в останній %s місяця";
    };
    uk.prototype.commaOnlyOnX0 = function () {
        return ", тільки в %s";
    };
    uk.prototype.commaAndOnX0 = function () {
        return ", і в %s";
    };
    uk.prototype.commaEveryX0Months = function () {
        return ", кожен %s місяць";
    };
    uk.prototype.commaOnlyInX0 = function () {
        return ", тільки в %s";
    };
    uk.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", в останній день місяця";
    };
    uk.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", в останній будень місяця";
    };
    uk.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s днів до останнього дня місяця";
    };
    uk.prototype.firstWeekday = function () {
        return "перший будень";
    };
    uk.prototype.weekdayNearestDayX0 = function () {
        return "будень найближчий до %s дня";
    };
    uk.prototype.commaOnTheX0OfTheMonth = function () {
        return ", в %s місяця";
    };
    uk.prototype.commaEveryX0Days = function () {
        return ", кожен %s день";
    };
    uk.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", між %s та %s днями місяця";
    };
    uk.prototype.commaOnDayX0OfTheMonth = function () {
        return ", на %s день місяця";
    };
    uk.prototype.commaEveryX0Years = function () {
        return ", кожні %s роки";
    };
    uk.prototype.commaStartingX0 = function () {
        return ", початок %s";
    };
    uk.prototype.daysOfTheWeek = function () {
        return ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];
    };
    uk.prototype.monthsOfTheYear = function () {
        return [
            "січень",
            "лютий",
            "березень",
            "квітень",
            "травень",
            "червень",
            "липень",
            "серпень",
            "вересень",
            "жовтень",
            "листопад",
            "грудень",
        ];
    };
    return uk;
}());
exports.uk = uk;


/***/ }),

/***/ 533:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.vi = void 0;
var vi = (function () {
    function vi() {
    }
    vi.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    vi.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    vi.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    vi.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    vi.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    vi.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Đã xảy ra lỗi khi tạo mô tả biểu thức. Vui lòng kiểm tra cú pháp biểu thức cron.";
    };
    vi.prototype.everyMinute = function () {
        return "mỗi phút";
    };
    vi.prototype.everyHour = function () {
        return "mỗi giờ";
    };
    vi.prototype.atSpace = function () {
        return "Vào ";
    };
    vi.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Mỗi phút giữa %s and %s";
    };
    vi.prototype.at = function () {
        return "Vào";
    };
    vi.prototype.spaceAnd = function () {
        return " và";
    };
    vi.prototype.everySecond = function () {
        return "mỗi giây";
    };
    vi.prototype.everyX0Seconds = function () {
        return "mỗi %s giây";
    };
    vi.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "giây thứ %s qua phút thứ %s";
    };
    vi.prototype.atX0SecondsPastTheMinute = function () {
        return "tại giây thứ %s của mỗi phút";
    };
    vi.prototype.everyX0Minutes = function () {
        return "mỗi %s phút";
    };
    vi.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "phút thứ %s qua %s tiếng";
    };
    vi.prototype.atX0MinutesPastTheHour = function () {
        return "vào %s phút của mỗi tiếng";
    };
    vi.prototype.everyX0Hours = function () {
        return "mỗi %s tiếng";
    };
    vi.prototype.betweenX0AndX1 = function () {
        return "giữa %s và %s";
    };
    vi.prototype.atX0 = function () {
        return "vào %s";
    };
    vi.prototype.commaEveryDay = function () {
        return ", mỗi ngày";
    };
    vi.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", mỗi %s ngày trong tuần";
    };
    vi.prototype.commaX0ThroughX1 = function () {
        return ", %s đến %s";
    };
    vi.prototype.commaAndX0ThroughX1 = function () {
        return ", %s đến %s";
    };
    vi.prototype.first = function () {
        return "đầu tiên";
    };
    vi.prototype.second = function () {
        return "thứ 2";
    };
    vi.prototype.third = function () {
        return "thứ 3";
    };
    vi.prototype.fourth = function () {
        return "thứ 4";
    };
    vi.prototype.fifth = function () {
        return "thứ 5";
    };
    vi.prototype.commaOnThe = function () {
        return ", trên ";
    };
    vi.prototype.spaceX0OfTheMonth = function () {
        return " %s của tháng";
    };
    vi.prototype.lastDay = function () {
        return "ngày cuối cùng";
    };
    vi.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", vào ngày %s cuối cùng của tháng";
    };
    vi.prototype.commaOnlyOnX0 = function () {
        return ", chỉ trên %s";
    };
    vi.prototype.commaAndOnX0 = function () {
        return ", và hơn %s";
    };
    vi.prototype.commaEveryX0Months = function () {
        return ", mỗi ngày %s tháng";
    };
    vi.prototype.commaOnlyInX0 = function () {
        return ", chỉ trong %s";
    };
    vi.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", vào ngày cuối cùng của tháng";
    };
    vi.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", vào ngày cuối tuần của tháng";
    };
    vi.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ngày trước ngày cuối cùng của tháng";
    };
    vi.prototype.firstWeekday = function () {
        return "ngày đầu tuần";
    };
    vi.prototype.weekdayNearestDayX0 = function () {
        return "ngày trong tuần ngày gần nhất %s";
    };
    vi.prototype.commaOnTheX0OfTheMonth = function () {
        return ", vào ngày %s của tháng";
    };
    vi.prototype.commaEveryX0Days = function () {
        return ", mỗi %s ngày";
    };
    vi.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", giữa ngày %s và %s trong tháng";
    };
    vi.prototype.commaOnDayX0OfTheMonth = function () {
        return ", vào %s ngày trong tháng";
    };
    vi.prototype.commaEveryHour = function () {
        return ", mỗi tiếng";
    };
    vi.prototype.commaEveryX0Years = function () {
        return ", mỗi %s năm";
    };
    vi.prototype.commaStartingX0 = function () {
        return ", bắt đầu %s";
    };
    vi.prototype.daysOfTheWeek = function () {
        return ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    };
    vi.prototype.monthsOfTheYear = function () {
        return [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ];
    };
    return vi;
}());
exports.vi = vi;


/***/ }),

/***/ 419:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.zh_CN = void 0;
var zh_CN = (function () {
    function zh_CN() {
    }
    zh_CN.prototype.setPeriodBeforeTime = function () {
        return true;
    };
    zh_CN.prototype.pm = function () {
        return "下午";
    };
    zh_CN.prototype.am = function () {
        return "上午";
    };
    zh_CN.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    zh_CN.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    zh_CN.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    zh_CN.prototype.commaYearX0ThroughYearX1 = function () {
        return ", 从%s年至%s年";
    };
    zh_CN.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    zh_CN.prototype.everyMinute = function () {
        return "每分钟";
    };
    zh_CN.prototype.everyHour = function () {
        return "每小时";
    };
    zh_CN.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "生成表达式描述时发生了错误，请检查cron表达式语法。";
    };
    zh_CN.prototype.atSpace = function () {
        return "在";
    };
    zh_CN.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "在 %s 至 %s 之间的每分钟";
    };
    zh_CN.prototype.at = function () {
        return "在";
    };
    zh_CN.prototype.spaceAnd = function () {
        return " 和";
    };
    zh_CN.prototype.everySecond = function () {
        return "每秒";
    };
    zh_CN.prototype.everyX0Seconds = function () {
        return "每隔 %s 秒";
    };
    zh_CN.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "在每分钟的第 %s 到 %s 秒";
    };
    zh_CN.prototype.atX0SecondsPastTheMinute = function () {
        return "在每分钟的第 %s 秒";
    };
    zh_CN.prototype.everyX0Minutes = function () {
        return "每隔 %s 分钟";
    };
    zh_CN.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "在每小时的第 %s 到 %s 分钟";
    };
    zh_CN.prototype.atX0MinutesPastTheHour = function () {
        return "在每小时的第 %s 分钟";
    };
    zh_CN.prototype.everyX0Hours = function () {
        return "每隔 %s 小时";
    };
    zh_CN.prototype.betweenX0AndX1 = function () {
        return "在 %s 和 %s 之间";
    };
    zh_CN.prototype.atX0 = function () {
        return "在%s";
    };
    zh_CN.prototype.commaEveryDay = function () {
        return ", 每天";
    };
    zh_CN.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", 每周的每 %s 天";
    };
    zh_CN.prototype.commaX0ThroughX1 = function () {
        return ", %s至%s";
    };
    zh_CN.prototype.commaAndX0ThroughX1 = function () {
        return ", 和%s至%s";
    };
    zh_CN.prototype.first = function () {
        return "第一个";
    };
    zh_CN.prototype.second = function () {
        return "第二个";
    };
    zh_CN.prototype.third = function () {
        return "第三个";
    };
    zh_CN.prototype.fourth = function () {
        return "第四个";
    };
    zh_CN.prototype.fifth = function () {
        return "第五个";
    };
    zh_CN.prototype.commaOnThe = function () {
        return ", 限每月的";
    };
    zh_CN.prototype.spaceX0OfTheMonth = function () {
        return "%s";
    };
    zh_CN.prototype.lastDay = function () {
        return "本月最后一天";
    };
    zh_CN.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", 限每月的最后一个%s";
    };
    zh_CN.prototype.commaOnlyOnX0 = function () {
        return ", 仅%s";
    };
    zh_CN.prototype.commaAndOnX0 = function () {
        return ", 或者为%s";
    };
    zh_CN.prototype.commaEveryX0Months = function () {
        return ", 每隔 %s 个月";
    };
    zh_CN.prototype.commaOnlyInX0 = function () {
        return ", 仅限%s";
    };
    zh_CN.prototype.commaOnlyInMonthX0 = function () {
        return ", 仅于%s份";
    };
    zh_CN.prototype.commaOnlyInYearX0 = function () {
        return ", 仅于 %s 年";
    };
    zh_CN.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", 限每月的最后一天";
    };
    zh_CN.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", 限每月的最后一个工作日";
    };
    zh_CN.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", 限每月最后%s天";
    };
    zh_CN.prototype.firstWeekday = function () {
        return "第一个工作日";
    };
    zh_CN.prototype.weekdayNearestDayX0 = function () {
        return "最接近 %s 号的工作日";
    };
    zh_CN.prototype.commaOnTheX0OfTheMonth = function () {
        return ", 限每月的%s";
    };
    zh_CN.prototype.commaEveryX0Days = function () {
        return ", 每隔 %s 天";
    };
    zh_CN.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", 限每月的 %s 至 %s 之间";
    };
    zh_CN.prototype.commaOnDayX0OfTheMonth = function () {
        return ", 限每月%s";
    };
    zh_CN.prototype.commaEveryX0Years = function () {
        return ", 每隔 %s 年";
    };
    zh_CN.prototype.commaStartingX0 = function () {
        return ", %s开始";
    };
    zh_CN.prototype.dayX0 = function () {
        return " %s 号";
    };
    zh_CN.prototype.daysOfTheWeek = function () {
        return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    };
    zh_CN.prototype.monthsOfTheYear = function () {
        return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    };
    return zh_CN;
}());
exports.zh_CN = zh_CN;


/***/ }),

/***/ 139:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.zh_TW = void 0;
var zh_TW = (function () {
    function zh_TW() {
    }
    zh_TW.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    zh_TW.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    zh_TW.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    zh_TW.prototype.commaYearX0ThroughYearX1 = function () {
        return ", 從 %s 年至 %s 年";
    };
    zh_TW.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    zh_TW.prototype.everyMinute = function () {
        return "每分鐘";
    };
    zh_TW.prototype.everyHour = function () {
        return "每小時";
    };
    zh_TW.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "產生表達式描述時發生了錯誤，請檢查 cron 表達式語法。";
    };
    zh_TW.prototype.atSpace = function () {
        return "在 ";
    };
    zh_TW.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "在 %s 和 %s 之間的每分鐘";
    };
    zh_TW.prototype.at = function () {
        return "在";
    };
    zh_TW.prototype.spaceAnd = function () {
        return " 和";
    };
    zh_TW.prototype.everySecond = function () {
        return "每秒";
    };
    zh_TW.prototype.everyX0Seconds = function () {
        return "每 %s 秒";
    };
    zh_TW.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "在每分鐘的 %s 到 %s 秒";
    };
    zh_TW.prototype.atX0SecondsPastTheMinute = function () {
        return "在每分鐘的 %s 秒";
    };
    zh_TW.prototype.everyX0Minutes = function () {
        return "每 %s 分鐘";
    };
    zh_TW.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "在每小時的 %s 到 %s 分鐘";
    };
    zh_TW.prototype.atX0MinutesPastTheHour = function () {
        return "在每小時的 %s 分";
    };
    zh_TW.prototype.everyX0Hours = function () {
        return "每 %s 小時";
    };
    zh_TW.prototype.betweenX0AndX1 = function () {
        return "在 %s 和 %s 之間";
    };
    zh_TW.prototype.atX0 = function () {
        return "在 %s";
    };
    zh_TW.prototype.commaEveryDay = function () {
        return ", 每天";
    };
    zh_TW.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", 每週的每 %s 天";
    };
    zh_TW.prototype.commaX0ThroughX1 = function () {
        return ", %s 到 %s";
    };
    zh_TW.prototype.commaAndX0ThroughX1 = function () {
        return ", 和 %s 到 %s";
    };
    zh_TW.prototype.first = function () {
        return "第一個";
    };
    zh_TW.prototype.second = function () {
        return "第二個";
    };
    zh_TW.prototype.third = function () {
        return "第三個";
    };
    zh_TW.prototype.fourth = function () {
        return "第四個";
    };
    zh_TW.prototype.fifth = function () {
        return "第五個";
    };
    zh_TW.prototype.commaOnThe = function () {
        return ", 在每月 ";
    };
    zh_TW.prototype.spaceX0OfTheMonth = function () {
        return "%s ";
    };
    zh_TW.prototype.lastDay = function () {
        return "最後一天";
    };
    zh_TW.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", 每月的最後一個 %s ";
    };
    zh_TW.prototype.commaOnlyOnX0 = function () {
        return ", 僅在 %s";
    };
    zh_TW.prototype.commaAndOnX0 = function () {
        return ", 或 %s";
    };
    zh_TW.prototype.commaEveryX0Months = function () {
        return ", 每 %s 月";
    };
    zh_TW.prototype.commaOnlyInX0 = function () {
        return ", 僅在 %s";
    };
    zh_TW.prototype.commaOnlyInMonthX0 = function () {
        return ", 僅在 %s";
    };
    zh_TW.prototype.commaOnlyInYearX0 = function () {
        return ", 僅在 %s 年";
    };
    zh_TW.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", 每月的最後一天";
    };
    zh_TW.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", 每月的最後一個工作日";
    };
    zh_TW.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s 這個月的最後一天的前幾天";
    };
    zh_TW.prototype.firstWeekday = function () {
        return "第一個工作日";
    };
    zh_TW.prototype.weekdayNearestDayX0 = function () {
        return "最接近 %s 號的工作日";
    };
    zh_TW.prototype.commaOnTheX0OfTheMonth = function () {
        return ", 每月的 %s ";
    };
    zh_TW.prototype.commaEveryX0Days = function () {
        return ", 每 %s 天";
    };
    zh_TW.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", 在每月的 %s 和 %s 之間";
    };
    zh_TW.prototype.commaOnDayX0OfTheMonth = function () {
        return ", 每月的 %s";
    };
    zh_TW.prototype.commaEveryX0Years = function () {
        return ", 每 %s 年";
    };
    zh_TW.prototype.commaStartingX0 = function () {
        return ", %s 開始";
    };
    zh_TW.prototype.dayX0 = function () {
        return " %s 號";
    };
    zh_TW.prototype.daysOfTheWeek = function () {
        return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    };
    zh_TW.prototype.monthsOfTheYear = function () {
        return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    };
    return zh_TW;
}());
exports.zh_TW = zh_TW;


/***/ }),

/***/ 586:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function assert(value, message) {
    if (!value) {
        throw new Error(message);
    }
}
var RangeValidator = (function () {
    function RangeValidator() {
    }
    RangeValidator.secondRange = function (parse) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var second = parseInt(parsed[i], 10);
                assert(second >= 0 && second <= 59, 'seconds part must be >= 0 and <= 59');
            }
        }
    };
    RangeValidator.minuteRange = function (parse) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var minute = parseInt(parsed[i], 10);
                assert(minute >= 0 && minute <= 59, 'minutes part must be >= 0 and <= 59');
            }
        }
    };
    RangeValidator.hourRange = function (parse) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var hour = parseInt(parsed[i], 10);
                assert(hour >= 0 && hour <= 23, 'hours part must be >= 0 and <= 23');
            }
        }
    };
    RangeValidator.dayOfMonthRange = function (parse) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var dayOfMonth = parseInt(parsed[i], 10);
                assert(dayOfMonth >= 1 && dayOfMonth <= 31, 'DOM part must be >= 1 and <= 31');
            }
        }
    };
    RangeValidator.monthRange = function (parse, monthStartIndexZero) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var month = parseInt(parsed[i], 10);
                assert(month >= 1 && month <= 12, monthStartIndexZero ? 'month part must be >= 0 and <= 11' : 'month part must be >= 1 and <= 12');
            }
        }
    };
    RangeValidator.dayOfWeekRange = function (parse, dayOfWeekStartIndexZero) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var dayOfWeek = parseInt(parsed[i], 10);
                assert(dayOfWeek >= 0 && dayOfWeek <= 6, dayOfWeekStartIndexZero ? 'DOW part must be >= 0 and <= 6' : 'DOW part must be >= 1 and <= 7');
            }
        }
    };
    return RangeValidator;
}());
exports["default"] = RangeValidator;


/***/ }),

/***/ 910:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StringUtilities = void 0;
var StringUtilities = (function () {
    function StringUtilities() {
    }
    StringUtilities.format = function (template) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return template.replace(/%s/g, function (substring) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return values.shift();
        });
    };
    StringUtilities.containsAny = function (text, searchStrings) {
        return searchStrings.some(function (c) {
            return text.indexOf(c) > -1;
        });
    };
    return StringUtilities;
}());
exports.StringUtilities = StringUtilities;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toString = void 0;
var expressionDescriptor_1 = __webpack_require__(728);
var allLocalesLoader_1 = __webpack_require__(282);
expressionDescriptor_1.ExpressionDescriptor.initialize(new allLocalesLoader_1.allLocalesLoader());
exports["default"] = expressionDescriptor_1.ExpressionDescriptor;
var toString = expressionDescriptor_1.ExpressionDescriptor.toString;
exports.toString = toString;

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});