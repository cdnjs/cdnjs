/**
 * angular-strap
 * @version v2.2.4 - 2015-05-28
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.helpers.dateFormatter', []).service('$dateFormatter', [ '$locale', 'dateFilter', function($locale, dateFilter) {
  this.getDefaultLocale = function() {
    return $locale.id;
  };
  this.getDatetimeFormat = function(format, lang) {
    return $locale.DATETIME_FORMATS[format] || format;
  };
  this.weekdaysShort = function(lang) {
    return $locale.DATETIME_FORMATS.SHORTDAY;
  };
  function splitTimeFormat(format) {
    return /(h+)([:\.])?(m+)([:\.])?(s*)[ ]?(a?)/i.exec(format).slice(1);
  }
  this.hoursFormat = function(timeFormat) {
    return splitTimeFormat(timeFormat)[0];
  };
  this.minutesFormat = function(timeFormat) {
    return splitTimeFormat(timeFormat)[2];
  };
  this.secondsFormat = function(timeFormat) {
    return splitTimeFormat(timeFormat)[4];
  };
  this.timeSeparator = function(timeFormat) {
    return splitTimeFormat(timeFormat)[1];
  };
  this.showSeconds = function(timeFormat) {
    return !!splitTimeFormat(timeFormat)[4];
  };
  this.showAM = function(timeFormat) {
    return !!splitTimeFormat(timeFormat)[5];
  };
  this.formatDate = function(date, format, lang, timezone) {
    return dateFilter(date, format, timezone);
  };
} ]);