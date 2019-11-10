/**
 * angular-strap
 * @version v2.3.10 - 2016-10-17
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.helpers.dateParser', []).provider('$dateParser', [ '$localeProvider', function($localeProvider) {
  function ParseDate() {
    this.year = 1970;
    this.month = 0;
    this.day = 1;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
  }
  ParseDate.prototype.setMilliseconds = function(value) {
    this.milliseconds = value;
  };
  ParseDate.prototype.setSeconds = function(value) {
    this.seconds = value;
  };
  ParseDate.prototype.setMinutes = function(value) {
    this.minutes = value;
  };
  ParseDate.prototype.setHours = function(value) {
    this.hours = value;
  };
  ParseDate.prototype.getHours = function() {
    return this.hours;
  };
  ParseDate.prototype.setDate = function(value) {
    this.day = value;
  };
  ParseDate.prototype.setMonth = function(value) {
    this.month = value;
  };
  ParseDate.prototype.setFullYear = function(value) {
    this.year = value;
  };
  ParseDate.prototype.fromDate = function(value) {
    this.year = value.getFullYear();
    this.month = value.getMonth();
    this.day = value.getDate();
    this.hours = value.getHours();
    this.minutes = value.getMinutes();
    this.seconds = value.getSeconds();
    this.milliseconds = value.getMilliseconds();
    return this;
  };
  ParseDate.prototype.toDate = function() {
    return new Date(this.year, this.month, this.day, this.hours, this.minutes, this.seconds, this.milliseconds);
  };
  var proto = ParseDate.prototype;
  function noop() {}
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  function indexOfCaseInsensitive(array, value) {
    var len = array.length;
    var str = value.toString().toLowerCase();
    for (var i = 0; i < len; i++) {
      if (array[i].toLowerCase() === str) {
        return i;
      }
    }
    return -1;
  }
  var defaults = this.defaults = {
    format: 'shortDate',
    strict: false
  };
  this.$get = [ '$locale', 'dateFilter', function($locale, dateFilter) {
    var DateParserFactory = function(config) {
      var options = angular.extend({}, defaults, config);
      var $dateParser = {};
      var regExpMap = {
        sss: '[0-9]{3}',
        ss: '[0-5][0-9]',
        s: options.strict ? '[1-5]?[0-9]' : '[0-9]|[0-5][0-9]',
        mm: '[0-5][0-9]',
        m: options.strict ? '[1-5]?[0-9]' : '[0-9]|[0-5][0-9]',
        HH: '[01][0-9]|2[0-3]',
        H: options.strict ? '1?[0-9]|2[0-3]' : '[01]?[0-9]|2[0-3]',
        hh: '[0][1-9]|[1][012]',
        h: options.strict ? '[1-9]|1[012]' : '0?[1-9]|1[012]',
        a: 'AM|PM',
        EEEE: $locale.DATETIME_FORMATS.DAY.join('|'),
        EEE: $locale.DATETIME_FORMATS.SHORTDAY.join('|'),
        dd: '0[1-9]|[12][0-9]|3[01]',
        d: options.strict ? '[1-9]|[1-2][0-9]|3[01]' : '0?[1-9]|[1-2][0-9]|3[01]',
        MMMM: $locale.DATETIME_FORMATS.MONTH.join('|'),
        MMM: $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
        MM: '0[1-9]|1[012]',
        M: options.strict ? '[1-9]|1[012]' : '0?[1-9]|1[012]',
        yyyy: '[1]{1}[0-9]{3}|[2]{1}[0-9]{3}',
        yy: '[0-9]{2}',
        y: options.strict ? '-?(0|[1-9][0-9]{0,3})' : '-?0*[0-9]{1,4}'
      };
      var setFnMap = {
        sss: proto.setMilliseconds,
        ss: proto.setSeconds,
        s: proto.setSeconds,
        mm: proto.setMinutes,
        m: proto.setMinutes,
        HH: proto.setHours,
        H: proto.setHours,
        hh: proto.setHours,
        h: proto.setHours,
        EEEE: noop,
        EEE: noop,
        dd: proto.setDate,
        d: proto.setDate,
        a: function(value) {
          var hours = this.getHours() % 12;
          return this.setHours(value.match(/pm/i) ? hours + 12 : hours);
        },
        MMMM: function(value) {
          return this.setMonth(indexOfCaseInsensitive($locale.DATETIME_FORMATS.MONTH, value));
        },
        MMM: function(value) {
          return this.setMonth(indexOfCaseInsensitive($locale.DATETIME_FORMATS.SHORTMONTH, value));
        },
        MM: function(value) {
          return this.setMonth(1 * value - 1);
        },
        M: function(value) {
          return this.setMonth(1 * value - 1);
        },
        yyyy: proto.setFullYear,
        yy: function(value) {
          return this.setFullYear(2e3 + 1 * value);
        },
        y: function(value) {
          return 1 * value <= 50 && value.length === 2 ? this.setFullYear(2e3 + 1 * value) : this.setFullYear(1 * value);
        }
      };
      var regex;
      var setMap;
      $dateParser.init = function() {
        $dateParser.$format = $locale.DATETIME_FORMATS[options.format] || options.format;
        regex = regExpForFormat($dateParser.$format);
        setMap = setMapForFormat($dateParser.$format);
      };
      $dateParser.isValid = function(date) {
        if (angular.isDate(date)) return !isNaN(date.getTime());
        return regex.test(date);
      };
      $dateParser.parse = function(value, baseDate, format, timezone) {
        if (format) format = $locale.DATETIME_FORMATS[format] || format;
        if (angular.isDate(value)) value = dateFilter(value, format || $dateParser.$format, timezone);
        var formatRegex = format ? regExpForFormat(format) : regex;
        var formatSetMap = format ? setMapForFormat(format) : setMap;
        var matches = formatRegex.exec(value);
        if (!matches) return false;
        var date = baseDate && !isNaN(baseDate.getTime()) ? new ParseDate().fromDate(baseDate) : new ParseDate().fromDate(new Date(1970, 0, 1, 0));
        for (var i = 0; i < matches.length - 1; i++) {
          if (formatSetMap[i]) formatSetMap[i].call(date, matches[i + 1]);
        }
        var newDate = date.toDate();
        if (parseInt(date.day, 10) !== newDate.getDate()) {
          return false;
        }
        return newDate;
      };
      $dateParser.getDateForAttribute = function(key, value) {
        var date;
        if (value === 'today') {
          var today = new Date();
          date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (key === 'maxDate' ? 1 : 0), 0, 0, 0, key === 'minDate' ? 0 : -1);
        } else if (angular.isString(value) && value.match(/^".+"$/)) {
          date = new Date(value.substr(1, value.length - 2));
        } else if (isNumeric(value)) {
          date = new Date(parseInt(value, 10));
        } else if (angular.isString(value) && value.length === 0) {
          date = key === 'minDate' ? -Infinity : +Infinity;
        } else {
          date = new Date(value);
        }
        return date;
      };
      $dateParser.getTimeForAttribute = function(key, value) {
        var time;
        if (value === 'now') {
          time = new Date().setFullYear(1970, 0, 1);
        } else if (angular.isString(value) && value.match(/^".+"$/)) {
          time = new Date(value.substr(1, value.length - 2)).setFullYear(1970, 0, 1);
        } else if (isNumeric(value)) {
          time = new Date(parseInt(value, 10)).setFullYear(1970, 0, 1);
        } else if (angular.isString(value) && value.length === 0) {
          time = key === 'minTime' ? -Infinity : +Infinity;
        } else {
          time = $dateParser.parse(value, new Date(1970, 0, 1, 0));
        }
        return time;
      };
      $dateParser.daylightSavingAdjust = function(date) {
        if (!date) {
          return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
      };
      $dateParser.timezoneOffsetAdjust = function(date, timezone, undo) {
        if (!date) {
          return null;
        }
        if (timezone && timezone === 'UTC') {
          date = new Date(date.getTime());
          date.setMinutes(date.getMinutes() + (undo ? -1 : 1) * date.getTimezoneOffset());
        }
        return date;
      };
      function regExpForFormat(format) {
        var re = buildDateAbstractRegex(format);
        return buildDateParseRegex(re);
      }
      function buildDateAbstractRegex(format) {
        var escapedFormat = escapeReservedSymbols(format);
        var escapedLiteralFormat = escapedFormat.replace(/''/g, '\\\'');
        var literalRegex = /('(?:\\'|.)*?')/;
        var formatParts = escapedLiteralFormat.split(literalRegex);
        var dateElements = Object.keys(regExpMap);
        var dateRegexParts = [];
        angular.forEach(formatParts, function(part) {
          if (isFormatStringLiteral(part)) {
            part = trimLiteralEscapeChars(part);
          } else {
            for (var i = 0; i < dateElements.length; i++) {
              part = part.split(dateElements[i]).join('${' + i + '}');
            }
          }
          dateRegexParts.push(part);
        });
        return dateRegexParts.join('');
      }
      function escapeReservedSymbols(text) {
        return text.replace(/\\/g, '[\\\\]').replace(/-/g, '[-]').replace(/\./g, '[.]').replace(/\*/g, '[*]').replace(/\+/g, '[+]').replace(/\?/g, '[?]').replace(/\$/g, '[$]').replace(/\^/g, '[^]').replace(/\//g, '[/]').replace(/\\s/g, '[\\s]');
      }
      function isFormatStringLiteral(text) {
        return /^'.*'$/.test(text);
      }
      function trimLiteralEscapeChars(text) {
        return text.replace(/^'(.*)'$/, '$1');
      }
      function buildDateParseRegex(abstractRegex) {
        var dateElements = Object.keys(regExpMap);
        var re = abstractRegex;
        for (var i = 0; i < dateElements.length; i++) {
          re = re.split('${' + i + '}').join('(' + regExpMap[dateElements[i]] + ')');
        }
        return new RegExp('^' + re + '$', [ 'i' ]);
      }
      function setMapForFormat(format) {
        var re = buildDateAbstractRegex(format);
        return buildDateParseValuesMap(re);
      }
      function buildDateParseValuesMap(abstractRegex) {
        var dateElements = Object.keys(regExpMap);
        var valuesRegex = new RegExp('\\${(\\d+)}', 'g');
        var valuesMatch;
        var keyIndex;
        var valueKey;
        var valueFunction;
        var valuesFunctionMap = [];
        while ((valuesMatch = valuesRegex.exec(abstractRegex)) !== null) {
          keyIndex = valuesMatch[1];
          valueKey = dateElements[keyIndex];
          valueFunction = setFnMap[valueKey];
          valuesFunctionMap.push(valueFunction);
        }
        return valuesFunctionMap;
      }
      $dateParser.init();
      return $dateParser;
    };
    return DateParserFactory;
  } ];
} ]);