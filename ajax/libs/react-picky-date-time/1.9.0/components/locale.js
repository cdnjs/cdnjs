"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE = exports.DEFAULT_LACALE = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var REACT_PICKY_DATE_TIME_CUSTOM_LOCALE_EXAMPLE = "Invalid window.REACT_PICKY_DATE_TIME['customErrorMessage']. EXAMPLE: window.REACT_PICKY_DATE_TIME={customErrorMessage:{'en-US':{textbox:{empty:function empty(name){return getEnglishName(name)+'cannot be empty'},invalid:function invalid(name){return getEnglishName(name)+'invalid format'},invalidFormat:function invalidFormat(name){return getEnglishName(name)+'is not a number'},inBetween:function inBetween(name){return function(min){return function(max){return getEnglishName(name)+'must be '+min+'-'+max}}},lessThan:function lessThan(name){return function(min){return getEnglishName(name)+'cannot less than '+min}},greaterThan:function greaterThan(name){return function(max){return getEnglishName(name)+'cannot greater than '+max}},lengthEqual:function lengthEqual(name){return function(length){return getEnglishName(name)+'length must be '+length}},twoInputsNotEqual:function twoInputsNotEqual(){return'two inputs are not equal'}},radiobox:{empty:function empty(name){return'Please choose one '+getEnglishName(name)}},checkbox:{unchecked:function unchecked(name){return getEnglishName(name)+'must be checked'}},select:{empty:function empty(name){return'Please select a '+getEnglishName(name)}},textarea:{empty:function empty(name){return getEnglishName(name)+'cannot be empty'},invalid:function invalid(name){return getEnglishName(name)+'invalid format'},invalidFormat:function invalidFormat(name){return getEnglishName(name)+'is not a number'},inBetween:function inBetween(name){return function(min){return function(max){return getEnglishName(name)+'must be '+min+'-'+max}}},lessThan:function lessThan(name){return function(min){return getEnglishName(name)+'cannot less than '+min}},greaterThan:function greaterThan(name){return function(max){return getEnglishName(name)+'cannot greater than '+max}},lengthEqual:function lengthEqual(name){return function(length){return getEnglishName(name)+'length must be '+length}},twoInputsNotEqual:function twoInputsNotEqual(){return'two inputs are not equal'}}}}};"; // const LOCALE_RANGE = ['en-us', 'zh-cn'];

var DEFAULT_LACALE = 'en-us';
exports.DEFAULT_LACALE = DEFAULT_LACALE;
var locale = {
  'en-us': {
    today: 'Today',
    reset: 'Reset',
    'reset-date': 'Reset Date',
    clear: 'Clear',
    now: 'Now',
    weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  },
  'zh-cn': {
    today: '今天',
    reset: '重置',
    'reset-date': '重置日期',
    clear: '清零',
    now: '现在',
    weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  }
};

var getCustomLocale = function getCustomLocale(o, m) {
  if (!o || _typeof(o) !== 'object' || o.constructor !== Object || !Object.keys(o).length) {
    console.error(REACT_PICKY_DATE_TIME_CUSTOM_LOCALE_EXAMPLE);
    return false;
  }

  Object.keys(o).map(function (i) {
    if (!m[i]) {
      m[i] = o[i];
    } else {
      if (Object.keys(o[i]).length) {
        Object.keys(o[i]).map(function (j) {
          m[i][j] = o[i][j];
        });
      }
    }
  });
  return m;
};

var handleCustomLocale = function handleCustomLocale(locale, w) {
  var res;

  if (typeof w !== 'undefined') {
    if (w.REACT_PICKY_DATE_TIME && w.REACT_PICKY_DATE_TIME['customLocale']) {
      res = getCustomLocale(w.REACT_PICKY_DATE_TIME['customLocale'], locale);
    }
  }

  if (typeof res === 'undefined' || res === false) {
    return locale;
  }

  return res;
};

if (typeof window !== 'undefined') {
  window.REACT_PICKY_DATE_TIME = window.REACT_PICKY_DATE_TIME || {};
  locale = handleCustomLocale(locale, window);
}

var LOCALE = locale;
exports.LOCALE = LOCALE;