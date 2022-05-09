"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYearSet = exports.getDaysListByMonth = exports.getDaysArray = exports.formatDateString = exports.WEEK_NUMBER = exports.TIME_TYPE = exports.TIME_SELECTION_SECOND_CHAR_POS_LIST = exports.TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST = exports.TIME_SELECTION_FIRST_CHAR_POS_LIST = exports.TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST = exports.TIME_JUMP_CHAR_POS_LIST = exports.TIME_CURSOR_POSITION_OBJECT = exports.SIZE_RANGE = exports.SELECTOR_YEAR_SET_NUMBER = exports.SECOND_DEGREE_NUMBER = exports.R2D = exports.QUARTER = exports.PREV_TRANSITION = exports.POINTER_ROTATE = exports.NEXT_TRANSITION = exports.MINUTE_DEGREE_NUMBER = exports.KEY_CODE = exports.HOUR_DEGREE_NUMBER = exports.DEFAULT_SIZE = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// GENERAL
var SIZE_RANGE = ['l', 'm', 's', 'xs'];
exports.SIZE_RANGE = SIZE_RANGE;
var DEFAULT_SIZE = 'm'; // CALENDAR

exports.DEFAULT_SIZE = DEFAULT_SIZE;
var PREV_TRANSITION = 'prev';
exports.PREV_TRANSITION = PREV_TRANSITION;
var NEXT_TRANSITION = 'next';
exports.NEXT_TRANSITION = NEXT_TRANSITION;
var SELECTOR_YEAR_SET_NUMBER = 5;
exports.SELECTOR_YEAR_SET_NUMBER = SELECTOR_YEAR_SET_NUMBER;
var POINTER_ROTATE = 0;
exports.POINTER_ROTATE = POINTER_ROTATE;
var WEEK_NUMBER = 7;
exports.WEEK_NUMBER = WEEK_NUMBER;

var getDaysArray = function getDaysArray(year, month) {
  var prevMonth;
  var nextMonth;
  var prevYear;
  var nextYear;

  if (month == 12) {
    prevMonth = 11;
    nextMonth = 1;
    prevYear = year - 1;
    nextYear = year + 1;
  } else if (month == 1) {
    prevMonth = 12;
    nextMonth = 2;
    prevYear = year - 1;
    nextYear = year + 1;
  } else {
    prevMonth = month - 1;
    nextMonth = month + 1;
    prevYear = year;
    nextYear = year;
  }

  var date = new Date(year, month - 1, 1);
  var prevMonthDate = null;
  var thisMonthDate = null;
  var nextMonthDate = null;
  var res = [];
  var startOffset = date.getDay();

  if (startOffset != 0) {
    prevMonthDate = getDaysListByMonth(prevYear, prevMonth);

    for (var i = prevMonthDate.length - startOffset; i <= prevMonthDate.length - 1; i++) {
      res.push(prevMonthDate[i]);
    }
  }

  thisMonthDate = getDaysListByMonth(year, month);
  res = [].concat(_toConsumableArray(res), _toConsumableArray(thisMonthDate));
  var endOffset = WEEK_NUMBER - thisMonthDate[thisMonthDate.length - 1].day - 1;

  if (endOffset != 0) {
    nextMonthDate = getDaysListByMonth(nextYear, nextMonth);

    for (var _i = 0; _i <= endOffset - 1; _i++) {
      res.push(nextMonthDate[_i]);
    }
  }

  return res;
};

exports.getDaysArray = getDaysArray;

var getDaysListByMonth = function getDaysListByMonth(year, month) {
  var date = new Date(year, month - 1, 1);
  var res = [];
  year = String(year);
  var monthName = formatDateString(month);

  while (date.getMonth() == month - 1) {
    var dayName = formatDateString(date.getDate());
    var item = {
      name: dayName,
      day: date.getDay(),
      month: monthName,
      year: year,
      value: "".concat(year, "-").concat(monthName, "-").concat(dayName)
    };
    res.push(item);
    date.setDate(date.getDate() + 1);
  }

  return res;
};

exports.getDaysListByMonth = getDaysListByMonth;

var formatDateString = function formatDateString(val) {
  if (Number(val) < 10) {
    return String('0' + Number(val));
  }

  return String(val);
};

exports.formatDateString = formatDateString;

var getYearSet = function getYearSet(year) {
  var res = [];
  var itemNumber;
  var startOffset;
  var endOffset;

  if (SELECTOR_YEAR_SET_NUMBER % 2 == 1) {
    itemNumber = (SELECTOR_YEAR_SET_NUMBER - 1) / 2 + 1;
    startOffset = SELECTOR_YEAR_SET_NUMBER - itemNumber;
  } else {
    itemNumber = SELECTOR_YEAR_SET_NUMBER / 2 - 1;
    startOffset = itemNumber - 1;
  }

  endOffset = SELECTOR_YEAR_SET_NUMBER - itemNumber;

  for (var i = year - startOffset; i <= year - 1; i++) {
    res.push(i);
  }

  res.push(year);

  for (var _i2 = 0; _i2 <= endOffset - 1; _i2++) {
    year = year + 1;
    res.push(year);
  }

  return res;
}; // CLOCK


exports.getYearSet = getYearSet;
var R2D = 180 / Math.PI;
exports.R2D = R2D;
var SECOND_DEGREE_NUMBER = 6;
exports.SECOND_DEGREE_NUMBER = SECOND_DEGREE_NUMBER;
var MINUTE_DEGREE_NUMBER = 6;
exports.MINUTE_DEGREE_NUMBER = MINUTE_DEGREE_NUMBER;
var HOUR_DEGREE_NUMBER = 30;
exports.HOUR_DEGREE_NUMBER = HOUR_DEGREE_NUMBER;
var QUARTER = [0, 15, 30, 45];
exports.QUARTER = QUARTER;
var TIME_SELECTION_FIRST_CHAR_POS_LIST = [0, 3, 6];
exports.TIME_SELECTION_FIRST_CHAR_POS_LIST = TIME_SELECTION_FIRST_CHAR_POS_LIST;
var TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST = [1, 4, 7];
exports.TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST = TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST;
var TIME_SELECTION_SECOND_CHAR_POS_LIST = [1, 4, 7];
exports.TIME_SELECTION_SECOND_CHAR_POS_LIST = TIME_SELECTION_SECOND_CHAR_POS_LIST;
var TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST = [2, 5, 8];
exports.TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST = TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST;
var TIME_JUMP_CHAR_POS_LIST = [1, 4, 7];
exports.TIME_JUMP_CHAR_POS_LIST = TIME_JUMP_CHAR_POS_LIST;
var TIME_CURSOR_POSITION_OBJECT = {
  0: 'clockHandHour',
  1: 'clockHandHour',
  2: 'clockHandHour',
  3: 'clockHandMinute',
  4: 'clockHandMinute',
  5: 'clockHandMinute',
  6: 'clockHandSecond',
  7: 'clockHandSecond',
  8: 'clockHandSecond',
  9: 'meridiem',
  10: 'meridiem',
  11: 'meridiem'
};
exports.TIME_CURSOR_POSITION_OBJECT = TIME_CURSOR_POSITION_OBJECT;
var TIME_TYPE = ['clockHandHour', 'clockHandMinute', 'clockHandSecond', 'meridiem'];
exports.TIME_TYPE = TIME_TYPE;
var KEY_CODE = {
  '8': 'Backspace',
  '46': 'Delete',
  '38': 'ArrowUp',
  '37': 'ArrowLeft',
  '39': 'ArrowRight',
  '40': 'ArrowDown',
  '48': '0',
  '49': '1',
  '50': '2',
  '51': '3',
  '52': '4',
  '53': '5',
  '54': '6',
  '55': '7',
  '56': '8',
  '57': '9'
};
exports.KEY_CODE = KEY_CODE;