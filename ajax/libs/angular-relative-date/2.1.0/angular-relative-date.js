(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.relativeDate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = relativeDateFilter;
var getTranslate = function getTranslate(injector, translations) {
  if (injector.has('$translate')) {
    return injector.get('$translate');
  } else {
    return {
      instant: function instant(id, params) {
        return translations[id].replace('{{time}}', params.time);
      }
    };
  }
};

var calculateDelta = function calculateDelta(now, date) {
  return Math.round(Math.abs(now - date) / 1000);
};

function relativeDateFilter($injector, _now, relativeDateTranslations) {
  var $translate = getTranslate($injector, relativeDateTranslations);

  return function (date) {
    var now = _now || new Date();

    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    var delta = null;

    var minute = 60;
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = day * 30;
    var year = day * 365;

    delta = calculateDelta(now, date);

    if (delta > day && delta < week) {
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
      delta = calculateDelta(now, date);
    }

    var translate = function translate(translatePhrase, timeValue) {
      var translateKey;

      if (translatePhrase === 'just_now') {
        translateKey = translatePhrase;
      } else if (now >= date) {
        translateKey = translatePhrase + '_ago';
      } else {
        translateKey = translatePhrase + '_from_now';
      }

      return $translate.instant(translateKey, {
        time: timeValue
      });
    };

    switch (false) {
      case !(delta < 30):
        return translate('just_now');

      case !(delta < minute):
        return translate('seconds', delta);

      case !(delta < 2 * minute):
        return translate('a_minute');

      case !(delta < hour):
        return translate('minutes', Math.floor(delta / minute));

      case Math.floor(delta / hour) !== 1:
        return translate('an_hour');

      case !(delta < day):
        return translate('hours', Math.floor(delta / hour));

      case !(delta < day * 2):
        return translate('a_day');

      case !(delta < week):
        return translate('days', Math.floor(delta / day));

      case Math.floor(delta / week) !== 1:
        return translate('a_week');

      case !(delta < month):
        return translate('weeks', Math.floor(delta / week));

      case Math.floor(delta / month) !== 1:
        return translate('a_month');

      case !(delta < year):
        return translate('months', Math.floor(delta / month));

      case Math.floor(delta / year) !== 1:
        return translate('a_year');

      default:
        return translate('over_a_year');
    }
  };
}

},{}],2:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _translations = _dereq_('./translations');

var _translations2 = _interopRequireDefault(_translations);

var _filter = _dereq_('./filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global angular */

var relativeDate = angular.module('relativeDate', []);

relativeDate.value('now', null);
relativeDate.value('relativeDateTranslations', _translations2.default);

relativeDate.filter('relativeDate', ['$injector', 'now', 'relativeDateTranslations', _filter2.default]);

exports.default = relativeDate;

},{"./filter":1,"./translations":3}],3:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  just_now: 'just now',
  seconds_ago: '{{time}} seconds ago',
  a_minute_ago: 'a minute ago',
  minutes_ago: '{{time}} minutes ago',
  an_hour_ago: 'an hour ago',
  hours_ago: '{{time}} hours ago',
  a_day_ago: 'yesterday',
  days_ago: '{{time}} days ago',
  a_week_ago: 'a week ago',
  weeks_ago: '{{time}} weeks ago',
  a_month_ago: 'a month ago',
  months_ago: '{{time}} months ago',
  a_year_ago: 'a year ago',
  years_ago: '{{time}} years ago',
  over_a_year_ago: 'over a year ago',
  seconds_from_now: '{{time}} seconds from now',
  a_minute_from_now: 'a minute from now',
  minutes_from_now: '{{time}} minutes from now',
  an_hour_from_now: 'an hour from now',
  hours_from_now: '{{time}} hours from now',
  a_day_from_now: 'tomorrow',
  days_from_now: '{{time}} days from now',
  a_week_from_now: 'a week from now',
  weeks_from_now: '{{time}} weeks from now',
  a_month_from_now: 'a month from now',
  months_from_now: '{{time}} months from now',
  a_year_from_now: 'a year from now',
  years_from_now: '{{time}} years from now',
  over_a_year_from_now: 'over a year from now'
};

},{}]},{},[2])(2)
});
//# sourceMappingURL=angular-relative-date.js.map
