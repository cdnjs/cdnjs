// Copyright (c) 2012 Sutoiku, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Some algorithms have been ported from Apache OpenOffice:

/**************************************************************
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 *************************************************************/
/*jslint evil: true*/
/*global define */

(function () {
  if (typeof exports !== "undefined") {
    module.exports = exportModule(
      require('numeric'),
      require('numeral'),
      require('jStat'),
      require('moment'),
      require('lodash'),
      require('underscore.string'),
      require('blueimp-md5')
    );
  } else if (typeof define === "function" && define.amd) {
    define(
      'formula',
      ['numeric', 'numeral', 'jStat', 'moment', 'lodash', 'underscore.string', 'md5'],
      exportModule
    );
  }

  function exportModule(numeric, numeral, jStatLib, moment, _, _s, md5Lib) {
    var Formula = {},
        jStat   = jStatLib.jStat,
        md5     = md5Lib.md5;

    var MEMOIZED_FACT = [];

    var SQRT2PI = 2.5066282746310002;

    var WEEK_STARTS = [
      undefined,
      0,
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      1,
      2,
      3,
      4,
      5,
      6,
      0
    ];

    var WEEK_TYPES = [
      [],
      [1, 2, 3, 4, 5, 6, 7],
      [7, 1, 2, 3, 4, 5, 6],
      [6, 0, 1, 2, 3, 4, 5],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [7, 1, 2, 3, 4, 5, 6],
      [6, 7, 1, 2, 3, 4, 5],
      [5, 6, 7, 1, 2, 3, 4],
      [4, 5, 6, 7, 1, 2, 3],
      [3, 4, 5, 6, 7, 1, 2],
      [2, 3, 4, 5, 6, 7, 1],
      [1, 2, 3, 4, 5, 6, 7]
    ];

    var WEEKEND_TYPES = [
      [],
      [6, 0],
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      undefined,
      undefined,
      undefined,
      [0],
      [1],
      [2],
      [3],
      [4],
      [5],
      [6]
    ];

    // Override some functions
    Formula.UNIQUE = function () {
      return _.unique(arguments);
    };

    Formula.FLATTEN = function () {
      return _.flatten(arguments);
    };

    // Generate a callback function
    Formula.FUNCTION = function () {
      var args = Array.prototype.slice.call(arguments);
      var expression = args[args.length - 1];
      var regexp = /(\w+)\(/g;
      var newExpression = expression.replace(regexp, function () {
        return "Formulae." + arguments[0];
      });

      args[args.length - 1] = "return " + newExpression + ";";
      if (newExpression !== expression) {
        args.unshift('Formulae');
      }

      return  Function.apply(null, args);
    };

    // Moment functions
    Formula.MOMENT = function (timestamp, format) {
      return moment(timestamp).format(format);
    };

    Formula.MOMENTADD = function (start_date, period, number) {
      return moment(start_date).add(period, number);
    };

    Formula.MOMENTDIFF = function (start_date, end_date, period) {
      return moment(end_date).diff(moment.utc(start_date), period);
    };

    Formula.MOMENTSUB = function (start_date, period, number) {
      return moment(start_date).subtract(period, number);
    };

    Formula.MOMENTUTC = function (timestamp, format) {
      return moment.utc(timestamp).format(format);
    };

    Formula.MOMENTUTCADD = function (start_date, period, number) {
      return moment.utc(start_date).add(period, number);
    };

    Formula.MOMENTUTCDIFF = function (start_date, end_date, period) {
      return moment.utc(end_date).diff(moment.utc(start_date), period);
    };

    Formula.MOMENTUTCSUB = function (start_date, period, number) {
      return moment.utc(start_date).subtract(period, number);
    };

    Formula.MOMENTUNIX = function (unixTime) {
      return moment.unix(unixTime).toDate();
    };

    Formula.MOMENTFORMAT = function (date, format) {
      return moment(date).format(format);
    };

    Formula.MOMENTISLEAPYEAR = function (date, format) {
      return moment(date, format).isLeapYear();
    };

    Formula.MOMENTISDST = function (date, format) {
      return moment(date, format).isDST();
    };

    Formula.MOMENTSTARTOF = function (date, units, format) {
      return moment(date, format).startOf(units).toDate();
    };

    Formula.MOMENTENDOF = function (date, units, format) {
      return moment(date, format).endOf(units).toDate();
    };

    Formula.MOMENTISAFTER = function (date1, date2, format) {
      return moment(date1, format).isAfter(moment(date2, format));
    };

    Formula.MOMENTISBEFORE = function (date1, date2, format) {
      return moment(date1, format).isBefore(moment(date2, format));
    };

    Formula.INTERVAL = function (second) {
      var year  = Math.floor(second/946080000);
      second    = second%946080000;
      var month = Math.floor(second/2592000);
      second    = second%2592000;
      var day   = Math.floor(second/86400);
      second    = second%86400;

      var hour  = Math.floor(second/3600);
      second    = second%3600;
      var min   = Math.floor(second/60);
      second    = second%60;
      var sec   = second;

      year  = (year  > 0) ? year  + 'Y' : '';
      month = (month > 0) ? month + 'M' : '';
      day   = (day   > 0) ? day   + 'D' : '';
      hour  = (hour  > 0) ? hour  + 'H' : '';
      min   = (min   > 0) ? min   + 'M' : '';
      sec   = (sec   > 0) ? sec   + 'S' : '';

      return 'P' + year + month + day +
             'T' + hour + min + sec;
    };

    // Custom Functions
    Formula.ARGSCONCAT = function (args) {
      var result = [];
      for (var i = 0; i < args.length; i++) {
        result = result.concat(args[i]);
      }
      return result;
    };

    Formula.ARGSTOARRAY = function (args) {
      return Array.prototype.slice.call(args, 0);
    };

    Formula.CLEANFLOAT = function (number) {
      var power = Math.pow(10, 14);
      return Math.round(number * power) / power;
    };

    Formula.COUNTIN = function (range, value) {
      var result = 0;
      for (var i = 0; i < range.length; i++) {
        if (range[i] === value) {
          result++;
        }
      }
      return result;
    };

    Formula.FINDFIELD = function(database, title) {
      var index = null;
      for (var i = 0; i < database.length; i++) {
        if (database[i][0] === title) {
          index = i;
          break;
        }
      }

      // Return error if the input field title is incorrect
      if (index == null) {
        return '#VALUE!';
      }
      return index;
    };

    Formula.FINDRESULTINDEX = function(database, criteria) {
      var maxCriteriaLength = criteria[0].length;
      for (var i = 1; i < criteria.length; i++) {
        if (criteria[i].length > maxCriteriaLength) {
          maxCriteriaLength = criteria[i].length;
        }
      }
      var columnResultIndexes = [];
      for (i = 1; i < maxCriteriaLength; i++) {
        var rowResultIndexes = [];
        for (var j = 0; j < criteria.length; j++) {
          if (criteria[j].length < maxCriteriaLength) {
            continue;
          }
          var criteriaTitle = criteria[j][0];
          var criteriaIndex = Formula.FINDFIELD(database, criteriaTitle);
          var criteriaValues = _.rest(database[criteriaIndex]);
          var count = 0;
          var singleResultIndexes = [];
          for (var k = 0; k < criteriaValues.length; k++) {
            if (eval(criteriaValues[k] + criteria[j][i])) {
              singleResultIndexes[count++] = k;
            }
          }
          rowResultIndexes[j] = singleResultIndexes;
        }
        columnResultIndexes[i - 1] = _.intersection.apply(_, rowResultIndexes);
      }

      var resultIndexes = _.union.apply(_, columnResultIndexes);
      return resultIndexes;
    };

    // Database functions
    Formula.DAVERAGE = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }

      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      var sum = 0;
      for (var i = 0; i < resultIndexes.length; i++) {
        sum += targetFields[resultIndexes[i]];
      }
      var average = Formula.IF(resultIndexes.length === 0, "#DIV/0!", sum / resultIndexes.length);
      return average;
    };

    Formula.DCOUNT = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }
      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      var targetValues = [];
      for (var i = 0; i < resultIndexes.length; i++) {
        targetValues[i] = targetFields[resultIndexes[i]];
      }
      return Formula.COUNT(targetValues);
    };

    Formula.DCOUNTA = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }
      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      var targetValues = [];
      for (var i = 0; i < resultIndexes.length; i++) {
        targetValues[i] = targetFields[resultIndexes[i]];
      }
      return Formula.COUNTA(targetValues);
    };

    Formula.DGET = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }
      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      // Return error if no record meets the criteria
      if (resultIndexes.length === 0) {
        return '#VALUE!';
      }
      // Returns the #NUM! error value because more than one record meets the
      // criteria
      if (resultIndexes.length > 1) {
        return '#NUM!';
      }

      return targetFields[resultIndexes[0]];
    };

    Formula.DMAX = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }
      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      var maxValue = targetFields[resultIndexes[0]];
      for (var i = 1; i < resultIndexes.length; i++) {
        if (maxValue < targetFields[resultIndexes[i]]) {
          maxValue = targetFields[resultIndexes[i]];
        }
      }
      return maxValue;
    };

    Formula.DMIN = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }
      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      var minValue = targetFields[resultIndexes[0]];
      for (var i = 1; i < resultIndexes.length; i++) {
        if (minValue > targetFields[resultIndexes[i]]) {
          minValue = targetFields[resultIndexes[i]];
        }
      }
      return minValue;
    };

    Formula.DPRODUCT = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }
      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      var targetValues = [];
      for (var i = 0; i < resultIndexes.length; i++) {
        targetValues[i] = targetFields[resultIndexes[i]];
      }
      targetValues = _.compact(targetValues);
      var result = 1;
      for (i = 0; i < targetValues.length; i++) {
        result *= targetValues[i];
      }
      return result;
    };

    Formula.DSTDEV = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }
      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      var targetValues = [];
      for (var i = 0; i < resultIndexes.length; i++) {
        targetValues[i] = targetFields[resultIndexes[i]];
      }
      targetValues = _.compact(targetValues);
      return Formula.STDEVS(targetValues);
    };

    Formula.DSTDEVP = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }
      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      var targetValues = [];
      for (var i = 0; i < resultIndexes.length; i++) {
        targetValues[i] = targetFields[resultIndexes[i]];
      }
      targetValues = _.compact(targetValues);
      return Formula.STDEVP(targetValues);
    };

    Formula.DSUM = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }
      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      var targetValues = [];
      for (var i = 0; i < resultIndexes.length; i++) {
        targetValues[i] = targetFields[resultIndexes[i]];
      }
      return Formula.SUM(targetValues);
    };

    Formula.DVAR = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }
      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      var targetValues = [];
      for (var i = 0; i < resultIndexes.length; i++) {
        targetValues[i] = targetFields[resultIndexes[i]];
      }
      return Formula.VARS(targetValues);
    };

    Formula.DVARP = function(database, field, criteria) {
      // Return error if field is not a number and not a string
      if (isNaN(field) && (typeof field !== "string")) {
        return '#VALUE!';
      }
      var resultIndexes = Formula.FINDRESULTINDEX(database, criteria);
      var targetFields = [];
      if (typeof field === "string") {
        var index = Formula.FINDFIELD(database, field);
        targetFields = _.rest(database[index]);
      } else {
        targetFields = _.rest(database[field]);
      }
      var targetValues = [];
      for (var i = 0; i < resultIndexes.length; i++) {
        targetValues[i] = targetFields[resultIndexes[i]];
      }
      return Formula.VARP(targetValues);
    };

    Formula.GETJSON = function (file) {
      var request = new XMLHttpRequest();
      request.open('GET', file, false);
      request.send(null);
      if (request.status === 200) {
        return JSON.parse(request.responseText);
      }
    };


    // Date functions
    Formula.DATE = function () {
      if (!arguments.length) {
        return new Date();
      }

      if (arguments.length === 1) {
        return new Date(arguments[0]);
      }

      var args = arguments;
      args[1] = args[1] - 1; // Monthes are between 0 and 11.
      return new (Date.bind.apply(Date, [Date].concat([].splice.call(args, 0))))();
    };

    Formula.DATEVALUE = function (date_text) {
      return Math.ceil((moment(date_text) - moment('1900-1-1')) / 86400000) + 2;
    };

    Formula.DAY = function (date) {
      return new Date(date).getDate();
    };

    Formula.DAYS = function (end_date, start_date) {
      return moment(new Date(end_date)).diff(moment(new Date(start_date)), 'days');
    };

    Formula.DAYS360 = function (start_date, end_date, method) {
      var start = moment(new Date(start_date));
      var end = moment(new Date(end_date));
      var smd = 31;
      var emd = 31;
      var sd = start.date();
      var ed = end.date();
      if (method) {
        sd = (sd === 31) ? 30 : sd;
        ed = (ed === 31) ? 30 : ed;
      }
      else {
        if (start.month() === 1) {
          smd = start.daysInMonth();
        }
        if (end.month() === 1) {
          emd = end.daysInMonth();
        }
        sd = (sd === smd) ? 30 : sd;
        if (sd === 30 || sd === smd) {
          ed = (ed === emd) ? 30 : ed;
        }
      }
      return 360 * (end.year() - start.year()) + 30 * (end.month() - start.month()) + (ed - sd);
    };

    Formula.EDATE = function (start_date, months) {
      return moment(new Date(start_date)).add('months', months).toDate();
    };

    Formula.EOMONTH = function (start_date, months) {
      var edate = moment(new Date(start_date)).add('months', months);
      return new Date(edate.year(), edate.month(), edate.daysInMonth());
    };

    Formula.FROMNOW = function (timestamp, nosuffix) {
      return moment(new Date(timestamp)).fromNow(nosuffix);
    };

    Formula.HOUR = function (timestamp) {
      return (timestamp <= 1) ? Math.floor(24 * timestamp) : new Date(timestamp).getHours();
    };

    Formula.MINUTE = function (timestamp) {
      return (timestamp <= 1) ? Math.floor(24 * 60 * timestamp) - 60 * Math.floor(24 * timestamp) : new Date(timestamp).getMinutes();
    };

    Formula.ISOWEEKNUM = function (date) {
      return moment(new Date(date)).format('w');
    };

    Formula.MONTH = function (timestamp) {
      return new Date(timestamp).getMonth() + 1;
    };

    Formula.NETWORKDAYS = function (start_date, end_date, holidays) {
      return Formula.NETWORKDAYSINTL(start_date, end_date, 1, holidays);
    };

    Formula.NETWORKDAYSINTL = function (start_date, end_date, weekend, holidays) {
      var weekend_type = (typeof weekend === 'undefined') ? 1 : weekend;
      var weekend_days = WEEKEND_TYPES[weekend_type];
      var sd = moment(start_date);
      var ed = moment(end_date);
      var net_days = ed.diff(sd, 'days') + 1;
      var net_work_days = net_days;
      var cd = sd;
      var holiday_dates = [];
      if (typeof holidays !== 'undefined') {
        for (var i = 0; i < holidays.length; i++) {
          holiday_dates[i] = moment(new Date(holidays[i])).format('MM-DD-YYYY');
        }
      }

      if (!weekend_days.length && !holiday_dates.length) {
        // No need to loop here.
        return net_work_days;
      }
      var j = 0;
      while (j < net_days) {
        if (weekend_days.indexOf(parseInt(cd.format('d'), 10)) >= 0) {
          net_work_days--;
        } else if (holiday_dates.indexOf(cd.format('MM-DD-YYYY')) >= 0) {
          net_work_days--;
        }
        cd = cd.add('days', 1);
        j++;
      }
      return net_work_days;
    };

    Formula.NOW = function () {
      return new Date();
    };

    Formula.SECOND = function (timestamp) {
      return new Date(timestamp).getSeconds();
    };

    Formula.TIME = function (hour, minute, second) {
      return (3600 * hour + 60 * minute + second) / 86400;
    };

    Formula.TIMEVALUE = function (time_text) {
      var timestamp = new Date(time_text);
      return (3600 * timestamp.getHours() + 60 * timestamp.getMinutes() + timestamp.getSeconds()) / 86400;
    };

    Formula.TODAY = Formula.NOW;

    Formula.WEEKDAY = function (date, type) {
      var week_day = moment(new Date(date)).format('d');
      var week_type = (typeof type === 'undefined') ? 1 : type;
      return WEEK_TYPES[week_type][week_day];
    };

    Formula.WEEKNUM = function (date, type) {
      var current_date = moment(new Date(date));
      var january_first = moment(new Date(current_date.year(), 0, 1));
      var week_type = (typeof type === 'undefined') ? 1 : type;
      var week_start = WEEK_STARTS[week_type];
      var first_day = january_first.format('d');
      var offset = (first_day < week_start) ? week_start - first_day + 1 : first_day - week_start;
      if (week_type === 21) {
        return Formula.ISOWEEKNUM(date);
      } else {
        return Math.floor(current_date.diff(january_first.subtract('days', offset), 'days') / 7) + 1;
      }
    };

    Formula.WORKDAY = function (start_date, days, holidays) {
      return Formula.WORKDAYINTL(start_date, days, 1, holidays);
    };

    Formula.WORKDAYINTL = function (start_date, days, weekend, holidays) {
      var weekend_type = (typeof weekend === 'undefined') ? 1 : weekend;
      var weekend_days = WEEKEND_TYPES[weekend_type];
      var sd = moment(new Date(start_date));
      var cd = sd;
      var day_of_week = '';
      var holiday_dates = [];
      if (typeof holidays !== 'undefined') {
        for (var i = 0; i < holidays.length; i++) {
          holiday_dates[i] = moment(new Date(holidays[i])).format('MM-DD-YYYY');
        }
      }
      var j = 0;
      while (j < days) {
        cd = cd.add('days', 1);
        day_of_week = cd.format('d');
        if (weekend_days.indexOf(parseInt(day_of_week, 10)) < 0 && holiday_dates.indexOf(cd.format('MM-DD-YYYY')) < 0) {
          j++;
        }
      }
      return cd.toDate();
    };

    Formula.YEAR = function (date) {
      return new Date(date).getFullYear();
    };

    Formula.YEARFRAC = function (start_date, end_date, basis) {
      // Credits: David A. Wheeler [http://www.dwheeler.com/]

      // Initialize parameters
      basis = (typeof basis === 'undefined') ? 0 : basis;
      var sdate = moment(new Date(start_date));
      var edate = moment(new Date(end_date));

      // Return error if either date is invalid
      if (!sdate.isValid() || !edate.isValid()) {
        return '#VALUE!';
      }

      // Return error if basis is neither 0, 1, 2, 3, or 4
      if ([0, 1, 2, 3, 4].indexOf(basis) === -1) {
        return '#NUM!';
      }

      // Return zero if start_date and end_date are the same
      if (sdate === edate) {
        return 0;
      }

      // Swap dates if start_date is later than end_date
      if (sdate.diff(edate) > 0) {
        edate = moment(new Date(start_date));
        sdate = moment(new Date(end_date));
      }

      // Lookup years, months, and days
      var syear = sdate.year();
      var smonth = sdate.month();
      var sday = sdate.date();
      var eyear = edate.year();
      var emonth = edate.month();
      var eday = edate.date();

      switch (basis) {
        case 0:
          // US (NASD) 30/360
          // Note: if eday == 31, it stays 31 if sday < 30
          if (sday === 31 && eday === 31) {
            sday = 30;
            eday = 30;
          } else if (sday === 31) {
            sday = 30;
          } else if (sday === 30 && eday === 31) {
            eday = 30;
          } else if (smonth === 1 && emonth === 1 && sdate.daysInMonth() === sday && edate.daysInMonth() === eday) {
            sday = 30;
            eday = 30;
          } else if (smonth === 1 && sdate.daysInMonth() === sday) {
            sday = 30;
          }
          return ((eday + emonth * 30 + eyear * 360) - (sday + smonth * 30 + syear * 360)) / 360;

        case 1:
          // Actual/actual
          var feb29Between = function (date1, date2) {
            // Requires year2 == (year1 + 1) or year2 == year1
            // Returns TRUE if February 29 is between the two dates (date1 may be February 29), with two possibilities:
            // year1 is a leap year and date1 <= Februay 29 of year1
            // year2 is a leap year and date2 > Februay 29 of year2

            var mar1year1 = moment(new Date(date1.year(), 2, 1));
            if (moment([date1.year()]).isLeapYear() && date1.diff(mar1year1) < 0 && date2.diff(mar1year1) >= 0) {
              return true;
            }
            var mar1year2 = moment(new Date(date2.year(), 2, 1));
            if (moment([date2.year()]).isLeapYear() && date2.diff(mar1year2) >= 0 && date1.diff(mar1year2) < 0) {
              return true;
            }
            return false;
          };
          var ylength = 365;
          if (syear === eyear || ((syear + 1) === eyear) && ((smonth > emonth) || ((smonth === emonth) && (sday >= eday)))) {
            if (syear === eyear && moment([syear]).isLeapYear()) {
              ylength = 366;
            } else if (feb29Between(sdate, edate) || (emonth === 1 && eday === 29)) {
              ylength = 366;
            }
            return edate.diff(sdate, 'days') / ylength;
          } else {
            var years = (eyear - syear) + 1;
            var days = moment(new Date(eyear + 1, 0, 1)).diff(moment(new Date(syear, 0, 1)), 'days');
            var average = days / years;
            return edate.diff(sdate, 'days') / average;
          }
          break;

        case 2:
          // Actual/360
          return edate.diff(sdate, 'days') / 360;

        case 3:
          // Actual/365
          return edate.diff(sdate, 'days') / 365;

        case 4:
          // European 30/360
          if (sday === 31) {
            sday = 30;
          }

          if (eday === 31) {
            eday = 30;
          }
          // Remarkably, do NOT change February 28 or February 29 at ALL
          return ((eday + emonth * 30 + eyear * 360) - (sday + smonth * 30 + syear * 360)) / 360;
      }
    };

    // Engineering functions

    // This function is extracted from the source code of SheetJS/bessel:
    // https://github.com/SheetJS/bessel/blob/master/bessel.js#L144
    Formula.BESSELI = (function() {
      function horner(arr, v) {
        return arr.reduce(function(z, w) {
          return v*z + w;
        }, 0);
      }
      var b0_a = [1.0, 3.5156229, 3.0899424, 1.2067492, 0.2659732, 0.360768e-1, 0.45813e-2].reverse();
      var b0_b = [0.39894228, 0.1328592e-1, 0.225319e-2, -0.157565e-2, 0.916281e-2, -0.2057706e-1, 0.2635537e-1, -0.1647633e-1, 0.392377e-2].reverse();
      function bessel0(x) {
        if(x <= 3.75) {
          return horner(b0_a, x*x/(3.75*3.75));
        }
        return Math.exp(Math.abs(x))/Math.sqrt(Math.abs(x))*horner(b0_b, 3.75/Math.abs(x));
      }

      var b1_a = [0.5, 0.87890594, 0.51498869, 0.15084934, 0.2658733e-1, 0.301532e-2, 0.32411e-3].reverse();
      var b1_b = [0.39894228, -0.3988024e-1, -0.362018e-2, 0.163801e-2, -0.1031555e-1, 0.2282967e-1, -0.2895312e-1, 0.1787654e-1, -0.420059e-2].reverse();
      function bessel1(x) {
        if(x < 3.75) {
          return x * horner(b1_a, x*x/(3.75*3.75));
        }
        return (x < 0 ? -1 : 1) * Math.exp(Math.abs(x))/Math.sqrt(Math.abs(x))*horner(b1_b, 3.75/Math.abs(x));
      }

      return function besseli(x, n) {
        n = Math.round(n);
        if(n === 0) {
          return bessel0(x);
        }
        if(n === 1) {
          return bessel1(x);
        }
        if(n < 0) {
          throw 'BESSELI Order (' + n + ') must be nonnegative';
        }
        if(Math.abs(x) === 0) {
          return 0;
        }

        var ret, j, tox = 2 / Math.abs(x), m, bip, bi, bim;
        m=2*Math.round((n+Math.round(Math.sqrt(40*n)))/2);
        bip=ret=0.0;
        bi=1.0;
        for (j=m;j>0;j--) {
          bim=j*tox*bi + bip;
          bip=bi; bi=bim;
          if (Math.abs(bi) > 1E10) {
            bi *= 1E-10;
            bip *= 1E-10;
            ret *= 1E-10;
          }
          if(j === n) {
            ret = bip;
          }
        }
        ret *= besseli(x, 0) / bi;
        return x < 0 && (n%2) ? -ret : ret;
      };

    })();

    // This function is extracted from the source code of SheetJS/bessel:
    // https://github.com/SheetJS/bessel/blob/master/bessel.js#L25
    Formula.BESSELJ = (function() {
      function horner(arr, v) {
        return arr.reduce(function(z, w) {
          return v*z + w;
        }, 0);
      }
      var b0_a1a = [57568490574.0,-13362590354.0,651619640.7,-11214424.18,77392.33017,-184.9052456].reverse();
      var b0_a2a = [57568490411.0,1029532985.0,9494680.718,59272.64853,267.8532712,1.0].reverse();
      var b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
      var b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934935152e-7].reverse();
      var W = 0.636619772; // 2 / Math.PI

      function bessel0(x) {
        var a, a1, a2, y = x * x, xx = Math.abs(x) - 0.785398164;
        if(Math.abs(x) < 8) {
          a1 = horner(b0_a1a, y);
          a2 = horner(b0_a2a, y);
          a = a1/a2;
        }
        else {
          y = 64 / y;
          a1 = horner(b0_a1b, y);
          a2 = horner(b0_a2b, y);
          a = Math.sqrt(W/Math.abs(x))*(Math.cos(xx)*a1-Math.sin(xx)*a2*8/Math.abs(x));
        }
        return a;
      }
      var b1_a1a = [72362614232.0,-7895059235.0,242396853.1,-2972611.439, 15704.48260, -30.16036606].reverse();
      var b1_a2a = [144725228442.0, 2300535178.0, 18583304.74, 99447.43394, 376.9991397, 1.0].reverse();
      var b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
      var b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();
      function bessel1(x) {
        var a, a1, a2, y = x*x, xx = Math.abs(x) - 2.356194491;
        if(Math.abs(x)< 8) {
          a1 = x*horner(b1_a1a, y);
          a2 = horner(b1_a2a, y);
          a = a1 / a2;
        } else {
          y = 64 / y;
          a1=horner(b1_a1b, y);
          a2=horner(b1_a2b, y);
          a=Math.sqrt(W/Math.abs(x))*(Math.cos(xx)*a1-Math.sin(xx)*a2*8/Math.abs(x));
          if(x < 0) {
            a = -a;
          }
        }
        return a;
      }

      function _bessel_iter(x, n, f0, f1, sign) {
        if(!sign) {
          sign = -1;
        }
        var tdx = 2 / x, f2;
        if(n === 0) {
          return f0;
        }
        if(n === 1) {
          return f1;
        }
        for(var o = 1; o !== n; ++o) {
          f2 = f1 * o * tdx + sign * f0;
          f0 = f1; f1 = f2;
        }
        return f1;
      }

      return function besselj(x, n) {
        n = Math.round(n);
        if(n === 0) {
          return bessel0(Math.abs(x));
        }
        if(n === 1) {
          return bessel1(Math.abs(x));
        }
        if(n < 0) {
          throw 'BESSELJ: Order (' + n + ') must be nonnegative';
        }
        if(Math.abs(x) === 0) {
          return 0;
        }

        var ret, j, tox = 2 / Math.abs(x), m, jsum, sum, bjp, bj, bjm;
        if(Math.abs(x) > n) {
          ret = _bessel_iter(x, n, bessel0(Math.abs(x)), bessel1(Math.abs(x)),-1);
        } else {
          m=2*Math.floor((n+Math.floor(Math.sqrt(40*n)))/2);
          jsum=0;
          bjp=ret=sum=0.0;
          bj=1.0;
          for (j=m;j>0;j--) {
            bjm=j*tox*bj-bjp;
            bjp=bj;
            bj=bjm;
            if (Math.abs(bj) > 1E10) {
              bj *= 1E-10;
              bjp *= 1E-10;
              ret *= 1E-10;
              sum *= 1E-10;
            }
            if (jsum) {
              sum += bj;
            }
            jsum=!jsum;
            if (j === n) {
              ret=bjp;
            }
          }
          sum=2.0*sum-bj;
          ret /= sum;
        }
        return x < 0 && (n%2) ? -ret : ret;
      };
    })();

    // This function is extracted from the source code of SheetJS/bessel:
    // https://github.com/SheetJS/bessel/blob/master/bessel.js#L186
    Formula.BESSELK = (function() {
      function horner(arr, v) {
        return arr.reduce(function(z, w) {
          return v*z + w;
        }, 0);
      }
      var b0_a = [-0.57721566, 0.42278420, 0.23069756, 0.3488590e-1, 0.262698e-2, 0.10750e-3, 0.74e-5].reverse();
      var b0_b = [1.25331414, -0.7832358e-1, 0.2189568e-1, -0.1062446e-1, 0.587872e-2, -0.251540e-2, 0.53208e-3].reverse();
      function bessel0(x) {
        if(x <= 2) {
          return -Math.log(x/2)*Formula.BESSELI(x,0) + horner(b0_a,x*x/4);
        }
        return Math.exp(-x)/Math.sqrt(x)*horner(b0_b,2/x);
      }

      var b1_a = [1.0, 0.15443144, -0.67278579, -0.18156897, -0.1919402e-1, -0.110404e-2, -0.4686e-4].reverse();
      var b1_b = [1.25331414, 0.23498619, -0.3655620e-1, 0.1504268e-1, -0.780353e-2, 0.325614e-2, -0.68245e-3].reverse();
      function bessel1(x) {
        if(x <= 2) {
          return Math.log(x/2)*Formula.BESSELI(x,1) + (1/x)*horner(b1_a,x*x/4);
        }
        return Math.exp(-x)/Math.sqrt(x)*horner(b1_b,2/x);
      }

      function _bessel_iter(x, n, f0, f1, sign) {
        if(!sign) {
          sign = -1;
        }
        var tdx = 2 / x, f2;
        if(n === 0) {
          return f0;
        }
        if(n === 1) {
          return f1;
        }
        for(var o = 1; o !== n; ++o) {
          f2 = f1 * o * tdx + sign * f0;
          f0 = f1; f1 = f2;
        }
        return f1;
      }

      function _bessel_wrap(bessel0, bessel1, name, nonzero, sign) {
        return function bessel(x,n) {
          if(n === 0) {
            return bessel0(x);
          }
          if(n === 1) {
            return bessel1(x);
          }
          if(n < 0) {
            throw name + ': Order (' + n + ') must be nonnegative';
          }
          if(nonzero === 1 && x === 0) {
            throw name + ': Undefined when x == 0';
          }
          if(nonzero === 2 && x <= 0) {
            throw name + ': Undefined when x <= 0';
          }
          var b0 = bessel0(x), b1 = bessel1(x);
          return _bessel_iter(x, n, b0, b1, sign);
        };
      }

      return _bessel_wrap(bessel0, bessel1, 'BESSELK', 2, 1);
    })();

    // This function is extracted from the source code of SheetJS/bessel:
    // https://github.com/SheetJS/bessel/blob/master/bessel.js#L101
    Formula.BESSELY = (function() {
      function horner(arr, v) {
        return arr.reduce(function(z, w) {
          return v*z + w;
        }, 0);
      }
      var b0_a1a = [-2957821389.0, 7062834065.0, -512359803.6, 10879881.29, -86327.92757, 228.4622733].reverse();
      var b0_a2a = [40076544269.0, 745249964.8, 7189466.438, 47447.26470, 226.1030244, 1.0].reverse();
      var b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
      var b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934945152e-7].reverse();

      var W = 0.636619772;
      function bessel0(x) {
        var a, a1, a2, y = x * x, xx = x - 0.785398164;
        if(x < 8) {
          a1 = horner(b0_a1a, y);
          a2 = horner(b0_a2a, y);
          a = a1/a2 + W * Formula.BESSELJ(x,0) * Math.log(x);
        } else {
          y = 64 / y;
          a1 = horner(b0_a1b, y);
          a2 = horner(b0_a2b, y);
          a = Math.sqrt(W/x)*(Math.sin(xx)*a1+Math.cos(xx)*a2*8/x);
        }
        return a;
      }

      var b1_a1a = [-0.4900604943e13, 0.1275274390e13, -0.5153438139e11, 0.7349264551e9, -0.4237922726e7, 0.8511937935e4].reverse();
      var b1_a2a = [0.2499580570e14, 0.4244419664e12, 0.3733650367e10, 0.2245904002e8, 0.1020426050e6, 0.3549632885e3, 1].reverse();
      var b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
      var b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();
      function bessel1(x) {
        var a, a1, a2, y = x*x, xx = x - 2.356194491;
        if(x < 8) {
          a1 = x*horner(b1_a1a, y);
          a2 = horner(b1_a2a, y);
          a = a1/a2 + W * (Formula.BESSELJ(x,1) * Math.log(x) - 1 / x);
        } else {
          y = 64 / y;
          a1=horner(b1_a1b, y);
          a2=horner(b1_a2b, y);
          a=Math.sqrt(W/x)*(Math.sin(xx)*a1+Math.cos(xx)*a2*8/x);
        }
        return a;
      }

      function _bessel_iter(x, n, f0, f1, sign) {
        if(!sign) {
          sign = -1;
        }
        var tdx = 2 / x, f2;
        if(n === 0) {
          return f0;
        }
        if(n === 1) {
          return f1;
        }
        for(var o = 1; o !== n; ++o) {
          f2 = f1 * o * tdx + sign * f0;
          f0 = f1; f1 = f2;
        }
        return f1;
      }

      function _bessel_wrap(bessel0, bessel1, name, nonzero, sign) {
        return function bessel(x,n) {
          if(n === 0) {
            return bessel0(x);
          }
          if(n === 1) {
            return bessel1(x);
          }
          if(n < 0) {
            throw name + ': Order (' + n + ') must be nonnegative';
          }
          if(nonzero === 1 && x === 0) {
            throw name + ': Undefined when x == 0';
          }
          if(nonzero === 2 && x <= 0) {
            throw name + ': Undefined when x <= 0';
          }
          var b0 = bessel0(x), b1 = bessel1(x);
          return _bessel_iter(x, n, b0, b1, sign);
        };
      }

      return _bessel_wrap(bessel0, bessel1, 'BESSELY', 1, -1);
    })();

    Formula.VALIDBIN = function (number) {
      return (/^[01]{1,10}$/).test(number);
    };

    Formula.BIN2DEC = function (number) {
      // Return error if number is not binary or contains more than 10 characters (10 digits)
      if (!Formula.VALIDBIN(number)) {
        return '#NUM!';
      }

      // Convert binary number to decimal
      var result = parseInt(number, 2);

      // Handle negative numbers
      var stringified = number.toString();
      if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
        return parseInt(stringified.substring(1), 2) - 512;
      } else {
        return result;
      }
    };

    Formula.BIN2HEX = function (number, places) {
      // Return error if number is not binary or contains more than 10 characters (10 digits)
      if (!Formula.VALIDBIN(number)) {
        return '#NUM!';
      }

      // Ignore places and return a 10-character hexadecimal number if number is negative
      var stringified = number.toString();
      if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
        return (1099511627264 + parseInt(stringified.substring(1), 2)).toString(16);
      }

      // Convert binary number to hexadecimal
      var result = parseInt(number, 2).toString(16);

      // Return hexadecimal number using the minimum number of characters necessary if places is undefined
      if (typeof places === 'undefined') {
        return result;
      } else {
        // Return error if places is nonnumeric
        if (isNaN(places)) {
          return '#VALUE!';
        }

        // Return error if places is negative
        if (places < 0) {
          return '#NUM!';
        }

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
      }
    };

    Formula.BIN2OCT = function (number, places) {
      // Return error if number is not binary or contains more than 10 characters (10 digits)
      if (!Formula.VALIDBIN(number)) {
        return '#NUM!';
      }

      // Ignore places and return a 10-character octal number if number is negative
      var stringified = number.toString();
      if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
        return (1073741312 + parseInt(stringified.substring(1), 2)).toString(8);
      }

      // Convert binary number to octal
      var result = parseInt(number, 2).toString(8);

      // Return octal number using the minimum number of characters necessary if places is undefined
      if (typeof places === 'undefined') {
        return result;
      } else {
        // Return error if places is nonnumeric
        if (isNaN(places)) {
          return '#VALUE!';
        }

        // Return error if places is negative
        if (places < 0) {
          return '#NUM!';
        }

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
      }
    };

    Formula.BITAND = function (number1, number2) {
      // Return error if either number is a non-numeric value
      if (isNaN(number1) || isNaN(number2)) {
        return '#VALUE!';
      }

      // Return error if either number is less than 0
      if (number1 < 0 || number2 < 0) {
        return '#NUM!';
      }

      // Return error if either number is a non-integer
      if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
        return '#NUM!';
      }

      // Return error if either number is greater than (2^48)-1
      if (number1 > 281474976710655 || number2 > 281474976710655) {
        return '#NUM!';
      }

      // Return bitwise AND of two numbers
      return number1 & number2;
    };

    Formula.BITLSHIFT = function (number, shift) {
      // Return error if either number is a non-numeric value
      if (isNaN(number) || isNaN(shift)) {
        return '#VALUE!';
      }

      // Return error if number is less than 0
      if (number < 0) {
        return '#NUM!';
      }

      // Return error if number is a non-integer
      if (Math.floor(number) !== number) {
        return '#NUM!';
      }

      // Return error if number is greater than (2^48)-1
      if (number > 281474976710655) {
        return '#NUM!';
      }

      // Return error if the absolute value of shift is greater than 53
      if (Math.abs(shift) > 53) {
        return '#NUM!';
      }

      // Return number shifted by shift bits to the left or to the right if shift is negative
      return (shift >= 0 ) ? number << shift : number >> -shift;
    };

    Formula.BITOR = function (number1, number2) {
      // Return error if either number is a non-numeric value
      if (isNaN(number1) || isNaN(number2)) {
        return '#VALUE!';
      }

      // Return error if either number is less than 0
      if (number1 < 0 || number2 < 0) {
        return '#NUM!';
      }

      // Return error if either number is a non-integer
      if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
        return '#NUM!';
      }

      // Return error if either number is greater than (2^48)-1
      if (number1 > 281474976710655 || number2 > 281474976710655) {
        return '#NUM!';
      }

      // Return bitwise OR of two numbers
      return number1 | number2;
    };

    Formula.BITRSHIFT = function (number, shift) {
      // Return error if either number is a non-numeric value
      if (isNaN(number) || isNaN(shift)) {
        return '#VALUE!';
      }

      // Return error if number is less than 0
      if (number < 0) {
        return '#NUM!';
      }

      // Return error if number is a non-integer
      if (Math.floor(number) !== number) {
        return '#NUM!';
      }

      // Return error if number is greater than (2^48)-1
      if (number > 281474976710655) {
        return '#NUM!';
      }

      // Return error if the absolute value of shift is greater than 53
      if (Math.abs(shift) > 53) {
        return '#NUM!';
      }

      // Return number shifted by shift bits to the right or to the left if shift is negative
      return (shift >= 0 ) ? number >> shift : number << -shift;
    };

    Formula.BITXOR = function (number1, number2) {
      // Return error if either number is a non-numeric value
      if (isNaN(number1) || isNaN(number2)) {
        return '#VALUE!';
      }

      // Return error if either number is less than 0
      if (number1 < 0 || number2 < 0) {
        return '#NUM!';
      }

      // Return error if either number is a non-integer
      if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
        return '#NUM!';
      }

      // Return error if either number is greater than (2^48)-1
      if (number1 > 281474976710655 || number2 > 281474976710655) {
        return '#NUM!';
      }

      // Return bitwise XOR of two numbers
      return number1 ^ number2;
    };

    Formula.COMPLEX = function (real, imaginary, suffix) {
      // Return error if either number is a non-numeric value
      if (isNaN(real) || isNaN(imaginary)) {
        return '#VALUE!';
      }

      // Set suffix
      suffix = (typeof suffix === 'undefined') ? 'i' : suffix;

      // Return error if suffix is neither "i" nor "j"
      if (suffix !== 'i' && suffix !== 'j') {
        return '#VALUE!';
      }

      // Return complex number
      if (real === 0 && imaginary === 0) {
        return 0;
      } else if (real === 0) {
        return (imaginary === 1) ? suffix : imaginary.toString() + suffix;
      } else if (imaginary === 0) {
        return real.toString();
      } else {
        var sign = (imaginary > 0) ? '+' : '';
        return real.toString() + sign + ((imaginary === 1) ? suffix : imaginary.toString() + suffix);
      }
    };

    Formula.CONVERT = function (number, from_unit, to_unit) {
      // Return error if number is a non-numeric value
      if (isNaN(number)) {
        return '#VALUE!';
      }

      // List of units supported by CONVERT and units defined by the International System of Units
      // [Name, Symbol, Alternate symbols, Quantity, ISU, CONVERT, Conversion ratio]
      var units = [
        ["a.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
        ["a.u. of charge", "e", null, "electric_charge", false, false, 1.60217653141414e-19],
        ["a.u. of energy", "Eh", null, "energy", false, false, 4.35974417757576e-18],
        ["a.u. of length", "a?", null, "length", false, false, 5.29177210818182e-11],
        ["a.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
        ["a.u. of time", "?/Eh", null, "time", false, false, 2.41888432650516e-17],
        ["admiralty knot", "admkn", null, "speed", false, true, 0.514773333],
        ["ampere", "A", null, "electric_current", true, false, 1],
        ["ampere per meter", "A/m", null, "magnetic_field_intensity", true, false, 1],
        ["ångström", "Å", ["ang"], "length", false, true, 1e-10],
        ["are", "ar", null, "area", false, true, 100],
        ["astronomical unit", "ua", null, "length", false, false, 1.49597870691667e-11],
        ["bar", "bar", null, "pressure", false, false, 100000],
        ["barn", "b", null, "area", false, false, 1e-28],
        ["becquerel", "Bq", null, "radioactivity", true, false, 1],
        ["bit", "bit", ["b"], "information", false, true, 1],
        ["btu", "BTU", ["btu"], "energy", false, true, 1055.05585262],
        ["byte", "byte", null, "information", false, true, 8],
        ["candela", "cd", null, "luminous_intensity", true, false, 1],
        ["candela per square metre", "cd/m?", null, "luminance", true, false, 1],
        ["coulomb", "C", null, "electric_charge", true, false, 1],
        ["cubic ångström", "ang3", ["ang^3"], "volume", false, true, 1e-30],
        ["cubic foot", "ft3", ["ft^3"], "volume", false, true, 0.028316846592],
        ["cubic inch", "in3", ["in^3"], "volume", false, true, 0.000016387064],
        ["cubic light-year", "ly3", ["ly^3"], "volume", false, true, 8.46786664623715e-47],
        ["cubic metre", "m?", null, "volume", true, true, 1],
        ["cubic mile", "mi3", ["mi^3"], "volume", false, true, 4168181825.44058],
        ["cubic nautical mile", "Nmi3", ["Nmi^3"], "volume", false, true, 6352182208],
        ["cubic Pica", "Pica3", ["Picapt3", "Pica^3", "Picapt^3"], "volume", false, true, 7.58660370370369e-8],
        ["cubic yard", "yd3", ["yd^3"], "volume", false, true, 0.764554857984],
        ["cup", "cup", null, "volume", false, true, 0.0002365882365],
        ["dalton", "Da", ["u"], "mass", false, false, 1.66053886282828e-27],
        ["day", "d", ["day"], "time", false, true, 86400],
        ["degree", "°", null, "angle", false, false, 0.0174532925199433],
        ["degrees Rankine", "Rank", null, "temperature", false, true, 0.555555555555556],
        ["dyne", "dyn", ["dy"], "force", false, true, 0.00001],
        ["electronvolt", "eV", ["ev"], "energy", false, true, 1.60217656514141],
        ["ell", "ell", null, "length", false, true, 1.143],
        ["erg", "erg", ["e"], "energy", false, true, 1e-7],
        ["farad", "F", null, "electric_capacitance", true, false, 1],
        ["fluid ounce", "oz", null, "volume", false, true, 0.0000295735295625],
        ["foot", "ft", null, "length", false, true, 0.3048],
        ["foot-pound", "flb", null, "energy", false, true, 1.3558179483314],
        ["gal", "Gal", null, "acceleration", false, false, 0.01],
        ["gallon", "gal", null, "volume", false, true, 0.003785411784],
        ["gauss", "G", ["ga"], "magnetic_flux_density", false, true, 1],
        ["grain", "grain", null, "mass", false, true, 0.0000647989],
        ["gram", "g", null, "mass", false, true, 0.001],
        ["gray", "Gy", null, "absorbed_dose", true, false, 1],
        ["gross registered ton", "GRT", ["regton"], "volume", false, true, 2.8316846592],
        ["hectare", "ha", null, "area", false, true, 10000],
        ["henry", "H", null, "inductance", true, false, 1],
        ["hertz", "Hz", null, "frequency", true, false, 1],
        ["horsepower", "HP", ["h"], "power", false, true, 745.69987158227],
        ["horsepower-hour", "HPh", ["hh", "hph"], "energy", false, true, 2684519.538],
        ["hour", "h", ["hr"], "time", false, true, 3600],
        ["imperial gallon (U.K.)", "uk_gal", null, "volume", false, true, 0.00454609],
        ["imperial hundredweight", "lcwt", ["uk_cwt", "hweight"], "mass", false, true, 50.802345],
        ["imperial quart (U.K)", "uk_qt", null, "volume", false, true, 0.0011365225],
        ["imperial ton", "brton", ["uk_ton", "LTON"], "mass", false, true, 1016.046909],
        ["inch", "in", null, "length", false, true, 0.0254],
        ["international acre", "uk_acre", null, "area", false, true, 4046.8564224],
        ["IT calorie", "cal", null, "energy", false, true, 4.1868],
        ["joule", "J", null, "energy", true, true, 1],
        ["katal", "kat", null, "catalytic_activity", true, false, 1],
        ["kelvin", "K", ["kel"], "temperature", true, true, 1],
        ["kilogram", "kg", null, "mass", true, true, 1],
        ["knot", "kn", null, "speed", false, true, 0.514444444444444],
        ["light-year", "ly", null, "length", false, true, 9460730472580800],
        ["litre", "L", ["l", "lt"], "volume", false, true, 0.001],
        ["lumen", "lm", null, "luminous_flux", true, false, 1],
        ["lux", "lx", null, "illuminance", true, false, 1],
        ["maxwell", "Mx", null, "magnetic_flux", false, false, 1e-18],
        ["measurement ton", "MTON", null, "volume", false, true, 1.13267386368],
        ["meter per hour", "m/h", ["m/hr"], "speed", false, true, 0.00027777777777778],
        ["meter per second", "m/s", ["m/sec"], "speed", true, true, 1],
        ["meter per second squared", "m?s??", null, "acceleration", true, false, 1],
        ["parsec", "pc", ["parsec"], "length", false, true, 30856775814671900],
        ["meter squared per second", "m?/s", null, "kinematic_viscosity", true, false, 1],
        ["metre", "m", null, "length", true, true, 1],
        ["miles per hour", "mph", null, "speed", false, true, 0.44704],
        ["millimetre of mercury", "mmHg", null, "pressure", false, false, 133.322],
        ["minute", "?", null, "angle", false, false, 0.000290888208665722],
        ["minute", "min", ["mn"], "time", false, true, 60],
        ["modern teaspoon", "tspm", null, "volume", false, true, 0.000005],
        ["mole", "mol", null, "amount_of_substance", true, false, 1],
        ["morgen", "Morgen", null, "area", false, true, 2500],
        ["n.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
        ["n.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
        ["n.u. of speed", "c?", null, "speed", false, false, 299792458],
        ["n.u. of time", "?/(me?c??)", null, "time", false, false, 1.28808866778687e-21],
        ["nautical mile", "M", ["Nmi"], "length", false, true, 1852],
        ["newton", "N", null, "force", true, true, 1],
        ["œrsted", "Oe ", null, "magnetic_field_intensity", false, false, 79.5774715459477],
        ["ohm", "Ω", null, "electric_resistance", true, false, 1],
        ["ounce mass", "ozm", null, "mass", false, true, 0.028349523125],
        ["pascal", "Pa", null, "pressure", true, false, 1],
        ["pascal second", "Pa?s", null, "dynamic_viscosity", true, false, 1],
        ["pferdestärke", "PS", null, "power", false, true, 735.49875],
        ["phot", "ph", null, "illuminance", false, false, 0.0001],
        ["pica (1/6 inch)", "pica", null, "length", false, true, 0.00035277777777778],
        ["pica (1/72 inch)", "Pica", ["Picapt"], "length", false, true, 0.00423333333333333],
        ["poise", "P", null, "dynamic_viscosity", false, false, 0.1],
        ["pond", "pond", null, "force", false, true, 0.00980665],
        ["pound force", "lbf", null, "force", false, true, 4.4482216152605],
        ["pound mass", "lbm", null, "mass", false, true, 0.45359237],
        ["quart", "qt", null, "volume", false, true, 0.000946352946],
        ["radian", "rad", null, "angle", true, false, 1],
        ["second", "?", null, "angle", false, false, 0.00000484813681109536],
        ["second", "s", ["sec"], "time", true, true, 1],
        ["short hundredweight", "cwt", ["shweight"], "mass", false, true, 45.359237],
        ["siemens", "S", null, "electrical_conductance", true, false, 1],
        ["sievert", "Sv", null, "equivalent_dose", true, false, 1],
        ["slug", "sg", null, "mass", false, true, 14.59390294],
        ["square ångström", "ang2", ["ang^2"], "area", false, true, 1e-20],
        ["square foot", "ft2", ["ft^2"], "area", false, true, 0.09290304],
        ["square inch", "in2", ["in^2"], "area", false, true, 0.00064516],
        ["square light-year", "ly2", ["ly^2"], "area", false, true, 8.95054210748189e+31],
        ["square meter", "m?", null, "area", true, true, 1],
        ["square mile", "mi2", ["mi^2"], "area", false, true, 2589988.110336],
        ["square nautical mile", "Nmi2", ["Nmi^2"], "area", false, true, 3429904],
        ["square Pica", "Pica2", ["Picapt2", "Pica^2", "Picapt^2"], "area", false, true, 0.00001792111111111],
        ["square yard", "yd2", ["yd^2"], "area", false, true, 0.83612736],
        ["statute mile", "mi", null, "length", false, true, 1609.344],
        ["steradian", "sr", null, "solid_angle", true, false, 1],
        ["stilb", "sb", null, "luminance", false, false, 0.0001],
        ["stokes", "St", null, "kinematic_viscosity", false, false, 0.0001],
        ["stone", "stone", null, "mass", false, true, 6.35029318],
        ["tablespoon", "tbs", null, "volume", false, true, 0.0000147868],
        ["teaspoon", "tsp", null, "volume", false, true, 0.00000492892],
        ["tesla", "T", null, "magnetic_flux_density", true, true, 1],
        ["thermodynamic calorie", "c", null, "energy", false, true, 4.184],
        ["ton", "ton", null, "mass", false, true, 907.18474],
        ["tonne", "t", null, "mass", false, false, 1000],
        ["U.K. pint", "uk_pt", null, "volume", false, true, 0.00056826125],
        ["U.S. bushel", "bushel", null, "volume", false, true, 0.03523907],
        ["U.S. oil barrel", "barrel", null, "volume", false, true, 0.158987295],
        ["U.S. pint", "pt", ["us_pt"], "volume", false, true, 0.000473176473],
        ["U.S. survey mile", "survey_mi", null, "length", false, true, 1609.347219],
        ["U.S. survey/statute acre", "us_acre", null, "area", false, true, 4046.87261],
        ["volt", "V", null, "voltage", true, false, 1],
        ["watt", "W", null, "power", true, true, 1],
        ["watt-hour", "Wh", ["wh"], "energy", false, true, 3600],
        ["weber", "Wb", null, "magnetic_flux", true, false, 1],
        ["yard", "yd", null, "length", false, true, 0.9144],
        ["year", "yr", null, "time", false, true, 31557600]
      ];

      // Binary prefixes
      // [Name, Prefix power of 2 value, Previx value, Abbreviation, Derived from]
      var binary_prefixes = {
        Yi: ["yobi", 80, 1208925819614629174706176, "Yi", "yotta"],
        Zi: ["zebi", 70, 1180591620717411303424, "Zi", "zetta"],
        Ei: ["exbi", 60, 1152921504606846976, "Ei", "exa"],
        Pi: ["pebi", 50, 1125899906842624, "Pi", "peta"],
        Ti: ["tebi", 40, 1099511627776, "Ti", "tera"],
        Gi: ["gibi", 30, 1073741824, "Gi", "giga"],
        Mi: ["mebi", 20, 1048576, "Mi", "mega"],
        ki: ["kibi", 10, 1024, "ki", "kilo"]
      };

      // Unit prefixes
      // [Name, Multiplier, Abbreviation]
      var unit_prefixes = {
        Y: ["yotta", 1e+24, "Y"],
        Z: ["zetta", 1e+21, "Z"],
        E: ["exa", 1e+18, "E"],
        P: ["peta", 1e+15, "P"],
        T: ["tera", 1e+12, "T"],
        G: ["giga", 1e+09, "G"],
        M: ["mega", 1e+06, "M"],
        k: ["kilo", 1e+03, "k"],
        h: ["hecto", 1e+02, "h"],
        e: ["dekao", 1e+01, "e"],
        d: ["deci", 1e-01, "d"],
        c: ["centi", 1e-02, "c"],
        m: ["milli", 1e-03, "m"],
        u: ["micro", 1e-06, "u"],
        n: ["nano", 1e-09, "n"],
        p: ["pico", 1e-12, "p"],
        f: ["femto", 1e-15, "f"],
        a: ["atto", 1e-18, "a"],
        z: ["zepto", 1e-21, "z"],
        y: ["yocto", 1e-24, "y"]
      };

      // Initialize units and multipliers
      var from = null;
      var to = null;
      var base_from_unit = from_unit;
      var base_to_unit = to_unit;
      var from_multiplier = 1;
      var to_multiplier = 1;
      var alt;

      // Lookup from and to units
      for (var i = 0; i < units.length; i++) {
        alt = (units[i][2] === null) ? [] : units[i][2];
        if (units[i][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
          from = units[i];
        }
        if (units[i][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
          to = units[i];
        }
      }

      // Lookup from prefix
      if (from === null) {
        var from_binary_prefix = binary_prefixes[from_unit.substring(0, 2)];
        var from_unit_prefix = unit_prefixes[from_unit.substring(0, 1)];

        // Handle dekao unit prefix (only unit prefix with two characters)
        if (from_unit.substring(0, 2) === 'da') {
          from_unit_prefix = ["dekao", 1e+01, "da"];
        }

        // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
        if (from_binary_prefix) {
          from_multiplier = from_binary_prefix[2];
          base_from_unit = from_unit.substring(2);
        } else if (from_unit_prefix) {
          from_multiplier = from_unit_prefix[1];
          base_from_unit = from_unit.substring(from_unit_prefix[2].length);
        }

        // Lookup from unit
        for (var j = 0; j < units.length; j++) {
          alt = (units[j][2] === null) ? [] : units[j][2];
          if (units[j][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
            from = units[j];
          }
        }
      }

      // Lookup to prefix
      if (to === null) {
        var to_binary_prefix = binary_prefixes[to_unit.substring(0, 2)];
        var to_unit_prefix = unit_prefixes[to_unit.substring(0, 1)];

        // Handle dekao unit prefix (only unit prefix with two characters)
        if (to_unit.substring(0, 2) === 'da') {
          to_unit_prefix = ["dekao", 1e+01, "da"];
        }

        // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
        if (to_binary_prefix) {
          to_multiplier = to_binary_prefix[2];
          base_to_unit = to_unit.substring(2);
        } else if (to_unit_prefix) {
          to_multiplier = to_unit_prefix[1];
          base_to_unit = to_unit.substring(to_unit_prefix[2].length);
        }

        // Lookup to unit
        for (var k = 0; k < units.length; k++) {
          alt = (units[k][2] === null) ? [] : units[k][2];
          if (units[k][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
            to = units[k];
          }
        }
      }

      // Return error if a unit does not exist
      if (from === null || to === null) {
        return '#N/A';
      }

      // Return error if units represent different quantities
      if (from[3] !== to[3]) {
        return '#N/A';
      }

      // Return converted number
      return number * from[6] * from_multiplier / (to[6] * to_multiplier);
    };

    Formula.DEC2BIN = function (number, places) {
      // Return error if number is not a number
      if (isNaN(number)) {
        return '#VALUE!';
      }

      // Return error if number is not decimal, is lower than -512, or is greater than 511
      if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) {
        return '#NUM!';
      }

      // Ignore places and return a 10-character binary number if number is negative
      if (number < 0) {
        return '1' + _s.repeat('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
      }

      // Convert decimal number to binary
      var result = parseInt(number, 10).toString(2);

      // Return binary number using the minimum number of characters necessary if places is undefined
      if (typeof places === 'undefined') {
        return result;
      } else {
        // Return error if places is nonnumeric
        if (isNaN(places)) {
          return '#VALUE!';
        }

        // Return error if places is negative
        if (places < 0) {
          return '#NUM!';
        }

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
      }
    };

    Formula.DEC2HEX = function (number, places) {
      // Return error if number is not a number
      if (isNaN(number)) {
        return '#VALUE!';
      }

      // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
      if (!/^-?[0-9]{1,12}$/.test(number) || number < -549755813888 || number > 549755813887) {
        return '#NUM!';
      }

      // Ignore places and return a 10-character hexadecimal number if number is negative
      if (number < 0) {
        return (1099511627776 + number).toString(16);
      }

      // Convert decimal number to hexadecimal
      var result = parseInt(number, 10).toString(16);

      // Return hexadecimal number using the minimum number of characters necessary if places is undefined
      if (typeof places === 'undefined') {
        return result;
      } else {
        // Return error if places is nonnumeric
        if (isNaN(places)) {
          return '#VALUE!';
        }

        // Return error if places is negative
        if (places < 0) {
          return '#NUM!';
        }

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
      }
    };

    Formula.DEC2OCT = function (number, places) {
      // Return error if number is not a number
      if (isNaN(number)) {
        return '#VALUE!';
      }

      // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
      if (!/^-?[0-9]{1,9}$/.test(number) || number < -536870912 || number > 536870911) {
        return '#NUM!';
      }

      // Ignore places and return a 10-character octal number if number is negative
      if (number < 0) {
        return (1073741824 + number).toString(8);
      }

      // Convert decimal number to octal
      var result = parseInt(number, 10).toString(8);

      // Return octal number using the minimum number of characters necessary if places is undefined
      if (typeof places === 'undefined') {
        return result;
      } else {
        // Return error if places is nonnumeric
        if (isNaN(places)) {
          return '#VALUE!';
        }

        // Return error if places is negative
        if (places < 0) {
          return '#NUM!';
        }

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
      }
    };

    Formula.DELTA = function (number1, number2) {
      // Set number2 to zero if undefined
      number2 = (typeof number2 === 'undefined') ? 0 : number2;

      // Return error if either number is not a number
      if (isNaN(number1) || isNaN(number2)) {
        return '#VALUE!';
      }

      // Return delta
      return (number1 === number2) ? 1 : 0;
    };

    Formula.ERF = function (lower_bound, upper_bound) {
      // Set number2 to zero if undefined
      upper_bound = (typeof upper_bound === 'undefined') ? 0 : upper_bound;

      // Return error if either number is not a number
      if (isNaN(lower_bound) || isNaN(upper_bound)) {
        return '#VALUE!';
      }

      // Return ERFC using jStat [http://www.jstat.org/]
      return jStat.erf(lower_bound);
    };

    Formula.ERFC = function (x) {
      // Return error if x is not a number
      if (isNaN(x)) {
        return '#VALUE!';
      }

      // Return ERFC using jStat [http://www.jstat.org/]
      return jStat.erfc(x);
    };

    Formula.ERFCPRECISE = function () {
      return;
    };

    Formula.ERFPRECISE = function () {
      return;
    };

    Formula.GESTEP = function (number, step) {
      // Set step to zero if undefined
      step = (typeof step === 'undefined') ? 0 : step;

      // Return error if either number is not a number
      if (isNaN(number) || isNaN(step)) {
        return '#VALUE!';
      }

      // Return delta
      return (number >= step) ? 1 : 0;
    };

    Formula.HEX2BIN = function (number, places) {

      // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
      if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
        return '#NUM!';
      }

      // Check if number is negative
      var negative = (number.length === 10 && number.substring(0, 1).toLowerCase() === 'f') ? true : false;

      // Convert hexadecimal number to decimal
      var decimal = (negative) ? parseInt(number, 16) - 1099511627776 : parseInt(number, 16);

      // Return error if number is lower than -512 or greater than 511
      if (decimal < -512 || decimal > 511) {
        return '#NUM!';
      }

      // Ignore places and return a 10-character binary number if number is negative
      if (negative) {
        return '1' + _s.repeat('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
      }

      // Convert decimal number to binary
      var result = decimal.toString(2);

      // Return binary number using the minimum number of characters necessary if places is undefined
      if (typeof places === 'undefined') {
        return result;
      } else {
        // Return error if places is nonnumeric
        if (isNaN(places)) {
          return '#VALUE!';
        }

        // Return error if places is negative
        if (places < 0) {
          return '#NUM!';
        }

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
      }
    };

    Formula.HEX2DEC = function (number) {
      // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
      if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
        return '#NUM!';
      }

      // Convert hexadecimal number to decimal
      var decimal = parseInt(number, 16);

      // Return decimal number
      return (decimal >= 549755813888) ? decimal - 1099511627776 : decimal;
    };

    Formula.HEX2OCT = function (number, places) {
      // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
      if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
        return '#NUM!';
      }

      // Convert hexadecimal number to decimal
      var decimal = parseInt(number, 16);

      // Return error if number is positive and greater than 0x1fffffff (536870911)
      if (decimal > 536870911 && decimal < 1098974756864) {
        return '#NUM!';
      }

      // Ignore places and return a 10-character octal number if number is negative
      if (decimal >= 1098974756864) {
        return (decimal - 1098437885952).toString(8);
      }

      // Convert decimal number to octal
      var result = decimal.toString(8);

      // Return octal number using the minimum number of characters necessary if places is undefined
      if (typeof places === 'undefined') {
        return result;
      } else {
        // Return error if places is nonnumeric
        if (isNaN(places)) {
          return '#VALUE!';
        }

        // Return error if places is negative
        if (places < 0) {
          return '#NUM!';
        }

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
      }
    };

    Formula.IMABS = function (inumber) {
      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return absolute value of complex number
      return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };

    Formula.IMAGINARY = function (inumber) {
      // Return 0 if inumber is equal to 0
      if (inumber === 0 || inumber === '0') {
        return 0;
      }

      // Handle special cases
      if (['i', 'j'].indexOf(inumber) >= 0) {
        return 1;
      }

      // Normalize imaginary coefficient
      inumber = inumber.replace('+i', '+1i').replace('-i', '-1i').replace('+j', '+1j').replace('-j', '-1j');

      // Lookup sign
      var plus = inumber.indexOf('+');
      var minus = inumber.indexOf('-');
      if (plus === 0) {
        plus = inumber.indexOf('+', 1);
      }

      if (minus === 0) {
        minus = inumber.indexOf('-', 1);
      }

      // Lookup imaginary unit
      var last = inumber.substring(inumber.length - 1, inumber.length);
      var unit = (last === 'i' || last === 'j');

      if (plus >= 0 || minus >= 0) {
        // Return error if imaginary unit is neither i nor j
        if (!unit) {
          return '#NUM!';
        }

        // Return imaginary coefficient of complex number
        if (plus >= 0) {
          return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
            '#NUM!' :
            Number(inumber.substring(plus + 1, inumber.length - 1));
        } else {
          return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
            '#NUM!' :
            -Number(inumber.substring(minus + 1, inumber.length - 1));
        }
      } else {
        if (unit) {
          return (isNaN(inumber.substring(0, inumber.length - 1))) ? '#NUM!' : inumber.substring(0, inumber.length - 1);
        } else {
          return (isNaN(inumber)) ? '#NUM!' : 0;
        }
      }
    };

    Formula.IMARGUMENT = function (inumber) {
      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return error if inumber is equal to zero
      if (x === 0 && y === 0) {
        return '#DIV/0!';
      }

      // Return PI/2 if x is equal to zero and y is positive
      if (x === 0 && y > 0) {
        return Math.PI / 2;
      }

      // Return -PI/2 if x is equal to zero and y is negative
      if (x === 0 && y < 0) {
        return -Math.PI / 2;
      }

      // Return zero if x is negative and y is equal to zero
      if (y === 0 && x > 0) {
        return 0;
      }

      // Return zero if x is negative and y is equal to zero
      if (y === 0 && x < 0) {
        return -Math.PI;
      }

      // Return argument of complex number
      if (x > 0) {
        return Math.atan(y / x);
      } else if (x < 0 && y >= 0) {
        return Math.atan(y / x) + Math.PI;
      } else {
        return Math.atan(y / x) - Math.PI;
      }
    };

    Formula.IMCONJUGATE = function (inumber) {
      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Lookup imaginary unit
      var unit = inumber.substring(inumber.length - 1);
      unit = (unit === 'i' || unit === 'j') ? unit : 'i';

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return conjugate of complex number
      return (y !== 0) ? Formula.COMPLEX(x, -y, unit) : inumber;
    };

    Formula.IMCOS = function (inumber) {
      // Return error if inumber is a logical value
      if (inumber === true || inumber === false) {
        return '#VALUE!';
      }

      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Lookup imaginary unit
      var unit = inumber.substring(inumber.length - 1);
      unit = (unit === 'i' || unit === 'j') ? unit : 'i';

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return cosine of complex number
      return Formula.COMPLEX(Math.cos(x) * (Math.exp(y) + Math.exp(-y)) / 2, -Math.sin(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
    };

    Formula.IMCOSH = function (inumber) {
      // Return error if inumber is a logical value
      if (inumber === true || inumber === false) {
        return '#VALUE!';
      }

      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Lookup imaginary unit
      var unit = inumber.substring(inumber.length - 1);
      unit = (unit === 'i' || unit === 'j') ? unit : 'i';

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return hyperbolic cosine of complex number
      return Formula.COMPLEX(Math.cos(y) * (Math.exp(x) + Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) - Math.exp(-x)) / 2, unit);
    };

    Formula.IMCOT = function (inumber) {
      // Return error if inumber is a logical value
      if (inumber === true || inumber === false) {
        return '#VALUE!';
      }

      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return cotangent of complex number
      return Formula.IMDIV(Formula.IMCOS(inumber), Formula.IMSIN(inumber));
    };

    Formula.IMCSC = function (inumber) {
      // Return error if inumber is a logical value
      if (inumber === true || inumber === false) {
        return '#VALUE!';
      }

      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return cosecant of complex number
      return Formula.IMDIV('1', Formula.IMSIN(inumber));
    };

    Formula.IMCSCH = function (inumber) {
      // Return error if inumber is a logical value
      if (inumber === true || inumber === false) {
        return '#VALUE!';
      }

      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return hyperbolic cosecant of complex number
      return Formula.IMDIV('1', Formula.IMSINH(inumber));
    };

    Formula.IMDIV = function (inumber1, inumber2) {
      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var a = Formula.IMREAL(inumber1);
      var b = Formula.IMAGINARY(inumber1);
      var c = Formula.IMREAL(inumber2);
      var d = Formula.IMAGINARY(inumber2);

      // Lookup imaginary unit
      var unit1 = inumber1.substring(inumber1.length - 1);
      var unit2 = inumber1.substring(inumber1.length - 1);
      var unit = 'i';
      if (unit1 === 'j') {
        unit = 'j';
      } else if (unit2 === 'j') {
        unit = 'j';
      }

      // Return error if either coefficient is not a number
      if (a === '#NUM!' || b === '#NUM!' || c === '#NUM!' || d === '#NUM!') {
        return '#NUM!';
      }

      // Return error if inumber2 is null
      if (c === 0 && d === 0) {
        return '#NUM!';
      }

      // Return exponential of complex number
      var den = c * c + d * d;
      return Formula.COMPLEX((a * c + b * d) / den, (b * c - a * d) / den, unit);
    };

    Formula.IMEXP = function (inumber) {
      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Lookup imaginary unit
      var unit = inumber.substring(inumber.length - 1);
      unit = (unit === 'i' || unit === 'j') ? unit : 'i';

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return exponential of complex number
      var e = Math.exp(x);
      return Formula.COMPLEX(e * Math.cos(y), e * Math.sin(y), unit);
    };

    Formula.IMLN = function (inumber) {
      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Lookup imaginary unit
      var unit = inumber.substring(inumber.length - 1);
      unit = (unit === 'i' || unit === 'j') ? unit : 'i';

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return exponential of complex number
      return Formula.COMPLEX(Math.log(Math.sqrt(x * x + y * y)), Math.atan(y / x), unit);
    };

    Formula.IMLOG10 = function (inumber) {
      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Lookup imaginary unit
      var unit = inumber.substring(inumber.length - 1);
      unit = (unit === 'i' || unit === 'j') ? unit : 'i';

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return exponential of complex number
      return Formula.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(10), Math.atan(y / x) / Math.log(10), unit);
    };

    Formula.IMLOG2 = function (inumber) {
      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Lookup imaginary unit
      var unit = inumber.substring(inumber.length - 1);
      unit = (unit === 'i' || unit === 'j') ? unit : 'i';

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return exponential of complex number
      return Formula.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(2), Math.atan(y / x) / Math.log(2), unit);
    };

    Formula.IMPOWER = function (inumber, number) {
      // Return error if number is nonnumeric
      if (isNaN(number)) {
        return '#VALUE!';
      }

      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Lookup imaginary unit
      var unit = inumber.substring(inumber.length - 1);
      unit = (unit === 'i' || unit === 'j') ? unit : 'i';

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Calculate power of modulus
      var p = Math.pow(Formula.IMABS(inumber), number);

      // Calculate argument
      var t = Formula.IMARGUMENT(inumber);

      // Return exponential of complex number
      return Formula.COMPLEX(p * Math.cos(number * t), p * Math.sin(number * t), unit);
    };

    Formula.IMPRODUCT = function () {
      // Initialize result
      var result = arguments[0];

      // Loop on all numbers
      for (var i = 1; i < arguments.length; i++) {
        // Lookup coefficients of two complex numbers
        var a = Formula.IMREAL(result);
        var b = Formula.IMAGINARY(result);
        var c = Formula.IMREAL(arguments[i]);
        var d = Formula.IMAGINARY(arguments[i]);

        // Return error if either coefficient is not a number
        if (a === '#NUM!' || b === '#NUM!' || c === '#NUM!' || d === '#NUM!') {
          return '#NUM!';
        }

        // Complute product of two complex numbers
        result = Formula.COMPLEX(a * c - b * d, a * d + b * c);
      }

      // Return product of complex numbers
      return result;
    };

    Formula.IMREAL = function (inumber) {
      // Return 0 if inumber is equal to 0
      if (inumber === 0 || inumber === '0') {
        return 0;
      }

      // Handle special cases
      if (['i', '+i', '1i', '+1i', '-i', '-1i', 'j', '+j', '1j', '+1j', '-j', '-1j'].indexOf(inumber) >= 0) {
        return 0;
      }

      // Lookup sign
      var plus = inumber.indexOf('+');
      var minus = inumber.indexOf('-');
      if (plus === 0) {
        plus = inumber.indexOf('+', 1);
      }
      if (minus === 0) {
        minus = inumber.indexOf('-', 1);
      }

      // Lookup imaginary unit
      var last = inumber.substring(inumber.length - 1, inumber.length);
      var unit = (last === 'i' || last === 'j');

      if (plus >= 0 || minus >= 0) {
        // Return error if imaginary unit is neither i nor j
        if (!unit) {
          return '#NUM!';
        }

        // Return real coefficient of complex number
        if (plus >= 0) {
          return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
            '#NUM!' :
            Number(inumber.substring(0, plus));
        } else {
          return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
            '#NUM!' :
            Number(inumber.substring(0, minus));
        }
      } else {
        if (unit) {
          return (isNaN(inumber.substring(0, inumber.length - 1))) ? '#NUM!' : 0;
        } else {
          return (isNaN(inumber)) ? '#NUM!' : inumber;
        }
      }
    };

    Formula.IMSEC = function (inumber) {
      // Return error if inumber is a logical value
      if (inumber === true || inumber === false) {
        return '#VALUE!';
      }

      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return secant of complex number
      return Formula.IMDIV('1', Formula.IMCOS(inumber));
    };

    Formula.IMSECH = function (inumber) {
      // Return error if inumber is a logical value
      if (inumber === true || inumber === false) {
        return '#VALUE!';
      }

      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return hyperbolic secant of complex number
      return Formula.IMDIV('1', Formula.IMCOSH(inumber));
    };

    Formula.IMSIN = function (inumber) {
      // Return error if inumber is a logical value
      if (inumber === true || inumber === false) {
        return '#VALUE!';
      }

      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Lookup imaginary unit
      var unit = inumber.substring(inumber.length - 1);
      unit = (unit === 'i' || unit === 'j') ? unit : 'i';

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return sine of complex number
      return Formula.COMPLEX(Math.sin(x) * (Math.exp(y) + Math.exp(-y)) / 2, Math.cos(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
    };

    Formula.IMSINH = function (inumber) {
      // Return error if inumber is a logical value
      if (inumber === true || inumber === false) {
        return '#VALUE!';
      }

      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Lookup imaginary unit
      var unit = inumber.substring(inumber.length - 1);
      unit = (unit === 'i' || unit === 'j') ? unit : 'i';

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return hyperbolic sine of complex number
      return Formula.COMPLEX(Math.cos(y) * (Math.exp(x) - Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) + Math.exp(-x)) / 2, unit);
    };

    Formula.IMSQRT = function (inumber) {
      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Lookup imaginary unit
      var unit = inumber.substring(inumber.length - 1);
      unit = (unit === 'i' || unit === 'j') ? unit : 'i';

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Calculate power of modulus
      var s = Math.sqrt(Formula.IMABS(inumber));

      // Calculate argument
      var t = Formula.IMARGUMENT(inumber);

      // Return exponential of complex number
      return Formula.COMPLEX(s * Math.cos(t / 2), s * Math.sin(t / 2), unit);
    };

    Formula.IMSUB = function (inumber1, inumber2) {
      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var a = Formula.IMREAL(inumber1);
      var b = Formula.IMAGINARY(inumber1);
      var c = Formula.IMREAL(inumber2);
      var d = Formula.IMAGINARY(inumber2);

      // Lookup imaginary unit
      var unit1 = inumber1.substring(inumber1.length - 1);
      var unit2 = inumber1.substring(inumber1.length - 1);
      var unit = 'i';
      if (unit1 === 'j') {
        unit = 'j';
      } else if (unit2 === 'j') {
        unit = 'j';
      }

      // Return error if either coefficient is not a number
      if (a === '#NUM!' || b === '#NUM!' || c === '#NUM!' || d === '#NUM!') {
        return '#NUM!';
      }

      // Return _ of two complex numbers
      return Formula.COMPLEX(a - c, b - d, unit);
    };

    Formula.IMSUM = function () {
      // Initialize result
      var result = arguments[0];

      // Loop on all numbers
      for (var i = 1; i < arguments.length; i++) {
        // Lookup coefficients of two complex numbers
        var a = Formula.IMREAL(result);
        var b = Formula.IMAGINARY(result);
        var c = Formula.IMREAL(arguments[i]);
        var d = Formula.IMAGINARY(arguments[i]);

        // Return error if either coefficient is not a number
        if (a === '#NUM!' || b === '#NUM!' || c === '#NUM!' || d === '#NUM!') {
          return '#NUM!';
        }

        // Complute product of two complex numbers
        result = Formula.COMPLEX(a + c, b + d);
      }

      // Return sum of complex numbers
      return result;
    };

    Formula.IMTAN = function (inumber) {
      // Return error if inumber is a logical value
      if (inumber === true || inumber === false) {
        return '#VALUE!';
      }

      // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
      var x = Formula.IMREAL(inumber);
      var y = Formula.IMAGINARY(inumber);

      // Return error if either coefficient is not a number
      if (x === '#NUM!' || y === '#NUM!') {
        return '#NUM!';
      }

      // Return tangent of complex number
      return Formula.IMDIV(Formula.IMSIN(inumber), Formula.IMCOS(inumber));
    };

    Formula.OCT2BIN = function (number, places) {
      // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
      if (!/^[0-7]{1,10}$/.test(number)) {
        return '#NUM!';
      }

      // Check if number is negative
      var negative = (number.length === 10 && number.substring(0, 1) === '7') ? true : false;

      // Convert octal number to decimal
      var decimal = (negative) ? parseInt(number, 8) - 1073741824 : parseInt(number, 8);

      // Return error if number is lower than -512 or greater than 511
      if (decimal < -512 || decimal > 511) {
        return '#NUM!';
      }

      // Ignore places and return a 10-character binary number if number is negative
      if (negative) {
        return '1' + _s.repeat('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
      }

      // Convert decimal number to binary
      var result = decimal.toString(2);

      // Return binary number using the minimum number of characters necessary if places is undefined
      if (typeof places === 'undefined') {
        return result;
      } else {
        // Return error if places is nonnumeric
        if (isNaN(places)) {
          return '#VALUE!';
        }

        // Return error if places is negative
        if (places < 0) {
          return '#NUM!';
        }

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
      }
    };

    Formula.OCT2DEC = function (number) {
      // Return error if number is not octal or contains more than ten characters (10 digits)
      if (!/^[0-7]{1,10}$/.test(number)) {
        return '#NUM!';
      }

      // Convert octal number to decimal
      var decimal = parseInt(number, 8);

      // Return decimal number
      return (decimal >= 536870912) ? decimal - 1073741824 : decimal;
    };

    Formula.OCT2HEX = function (number, places) {
      // Return error if number is not octal or contains more than ten characters (10 digits)
      if (!/^[0-7]{1,10}$/.test(number)) {
        return '#NUM!';
      }

      // Convert octal number to decimal
      var decimal = parseInt(number, 8);

      // Ignore places and return a 10-character octal number if number is negative
      if (decimal >= 536870912) {
        return 'ff' + (decimal + 3221225472).toString(16);
      }

      // Convert decimal number to hexadecimal
      var result = decimal.toString(16);

      // Return hexadecimal number using the minimum number of characters necessary if places is undefined
      if (typeof places === 'undefined') {
        return result;
      } else {
        // Return error if places is nonnumeric
        if (isNaN(places)) {
          return '#VALUE!';
        }

        // Return error if places is negative
        if (places < 0) {
          return '#NUM!';
        }

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= result.length) ? _s.repeat('0', places - result.length) + result : '#NUM!';
      }
    };


    // Financial functions

    Formula.ACCRINT = function (issue, first, settlement, rate, par, frequency, basis, method) {
      // Return error if either date is invalid
      if (!moment(issue).isValid() || !moment(first).isValid() || !moment(settlement).isValid()) {
        return '#VALUE!';
      }

      // Return error if either rate or par are lower than or equal to zero
      if (rate <= 0 || par <= 0) {
        return '#NUM!';
      }

      // Return error if frequency is neither 1, 2, or 4
      if ([1, 2, 4].indexOf(frequency) === -1) {
        return '#NUM!';
      }

      // Return error if basis is neither 0, 1, 2, 3, or 4
      if ([0, 1, 2, 3, 4].indexOf(basis) === -1) {
        return '#NUM!';
      }

      // Return error if issue greater than or equal to settlement
      if (moment(issue).diff(moment(settlement)) >= 0) {
        return '#NUM!';
      }

      // Set default values
      par = (typeof par === 'undefined') ? 0 : par;
      basis = (typeof basis === 'undefined') ? 0 : basis;
      method = (typeof method === 'undefined') ? true : method;

      // Compute accrued interest
      var factor = 0;
      switch (basis) {
        case 0:
          // US (NASD) 30/360
          factor = Formula.YEARFRAC(issue, settlement, basis);
          break;
        case 1:
          // Actual/actual
          factor = Formula.YEARFRAC(issue, settlement, basis);
          break;
        case 2:
          // Actual/360
          factor = Formula.YEARFRAC(issue, settlement, basis);
          break;
        case 3:
          // Actual/365
          factor = Formula.YEARFRAC(issue, settlement, basis);
          break;
        case 4:
          // European 30/360
          factor = Formula.YEARFRAC(issue, settlement, basis);
          break;
      }
      return par * rate * factor;
    };

    Formula.ACCRINTM = function () {
      return;
    };

    Formula.AMORDEGRC = function () {
      return;
    };

    Formula.AMORLINC = function () {
      return;
    };

    Formula.COUPDAYBS = function () {
      return;
    };

    Formula.COUPDAYS = function () {
      return;
    };

    Formula.COUPDAYSNC = function () {
      return;
    };

    Formula.COUPNCD = function () {
      return;
    };

    Formula.COUPNUM = function () {
      return;
    };

    Formula.COUPPCD = function () {
      return;
    };

    Formula.CUMIPMT = function (rate, periods, value, start, end, type) {
      // Credits: algorithm inspired by Apache OpenOffice
      // Credits: Hannes Stiebitzhofer for the translations of function and variable names
      // Requires Formula.FV() and Formula.PMT() from Formula.js [http://stoic.com/formula/]

      // Evaluate rate and periods (TODO: replace with secure expression evaluator)
      rate = eval(rate);
      periods = eval(periods);

      // Return error if either rate, periods, or value are lower than or equal to zero
      if (rate <= 0 || periods <= 0 || value <= 0) {
        return '#NUM!';
      }

      // Return error if start < 1, end < 1, or start > end
      if (start < 1 || end < 1 || start > end) {
        return '#NUM!';
      }

      // Return error if type is neither 0 nor 1
      if (type !== 0 && type !== 1) {
        return '#NUM!';
      }

      // Compute cumulative interest
      var payment = Formula.PMT(rate, periods, value, 0, type);
      var interest = 0;

      if (start === 1) {
        if (type === 0) {
          interest = -value;
          start++;
        }
      }

      for (var i = start; i <= end; i++) {
        if (type === 1) {
          interest += Formula.FV(rate, i - 2, payment, value, 1) - payment;
        } else {
          interest += Formula.FV(rate, i - 1, payment, value, 0);
        }
      }
      interest *= rate;

      // Return cumulative interest
      return interest;
    };

    Formula.CUMPRINC = function (rate, periods, value, start, end, type) {
      // Credits: algorithm inspired by Apache OpenOffice
      // Credits: Hannes Stiebitzhofer for the translations of function and variable names
      // Requires Formula.FV() and Formula.PMT() from Formula.js [http://stoic.com/formula/]

      // Evaluate rate and periods (TODO: replace with secure expression evaluator)
      rate = eval(rate);
      periods = eval(periods);

      // Return error if either rate, periods, or value are lower than or equal to zero
      if (rate <= 0 || periods <= 0 || value <= 0) {
        return '#NUM!';
      }

      // Return error if start < 1, end < 1, or start > end
      if (start < 1 || end < 1 || start > end) {
        return '#NUM!';
      }

      // Return error if type is neither 0 nor 1
      if (type !== 0 && type !== 1) {
        return '#NUM!';
      }

      // Compute cumulative principal
      var payment = Formula.PMT(rate, periods, value, 0, type);
      var principal = 0;
      if (start === 1) {
        if (type === 0) {
          principal = payment + value * rate;
        } else {
          principal = payment;
        }
        start++;
      }
      for (var i = start; i <= end; i++) {
        if (type > 0) {
          principal += payment - (Formula.FV(rate, i - 2, payment, value, 1) - payment) * rate;
        } else {
          principal += payment - Formula.FV(rate, i - 1, payment, value, 0) * rate;
        }
      }

      // Return cumulative principal
      return principal;
    };

    Formula.DB = function (cost, salvage, life, period, month) {
      // Initialize month
      month = (typeof month === 'undefined') ? 12 : month;

      // Return error if any of the parameters is not a number
      if (isNaN(cost) || isNaN(salvage) || isNaN(life) || isNaN(period) || isNaN(month)) {
        return '#VALUE!';
      }

      // Return error if any of the parameters is negative   [

      if (cost < 0 || salvage < 0 || life < 0 || period < 0) {
        return '#NUM!';
      }

      // Return error if month is not an integer between 1 and 12
      if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(month) === -1) {
        return '#NUM!';
      }

      // Return error if period is greater than life
      if (period > life) {
        return '#NUM!';
      }

      // Return 0 (zero) if salvage is greater than or equal to cost
      if (salvage >= cost) {
        return 0;
      }

      // Rate is rounded to three decimals places
      var rate = (1 - Math.pow(salvage / cost, 1 / life)).toFixed(3);

      // Compute initial depreciation
      var initial = cost * rate * month / 12;

      // Compute total depreciation
      var total = initial;
      var current = 0;
      var ceiling = (period === life) ? life - 1 : period;
      for (var i = 2; i <= ceiling; i++) {
        current = (cost - total) * rate;
        total += current;
      }

      // Depreciation for the first and last periods are special cases
      if (period === 1) {
        // First period
        return initial;
      } else if (period === life) {
        // Last period
        return (cost - total) * rate;
      } else {
        return current;
      }
    };

    Formula.DDB = function (cost, salvage, life, period, factor) {
      // Initialize factor
      factor = (typeof factor === 'undefined') ? 2 : factor;

      // Return error if any of the parameters is not a number
      if (isNaN(cost) || isNaN(salvage) || isNaN(life) || isNaN(period) || isNaN(factor)) {
        return '#VALUE!';
      }

      // Return error if any of the parameters is negative or if factor is null
      if (cost < 0 || salvage < 0 || life < 0 || period < 0 || factor <= 0) {
        return '#NUM!';
      }

      // Return error if period is greater than life
      if (period > life) {
        return '#NUM!';
      }

      // Return 0 (zero) if salvage is greater than or equal to cost
      if (salvage >= cost) {
        return 0;
      }

      // Compute depreciation
      var total = 0;
      var current = 0;
      for (var i = 1; i <= period; i++) {
        current = Math.min((cost - total) * (factor / life), (cost - salvage - total));
        total += current;
      }

      // Return depreciation
      return current;
    };

    Formula.DISC = function () {
      return;
    };

    Formula.DOLLARDE = function (dollar, fraction) {
      // Credits: algorithm inspired by Apache OpenOffice

      // Return error if any of the parameters is not a number
      if (isNaN(dollar) || isNaN(fraction)) {
        return '#VALUE!';
      }

      // Return error if fraction is negative
      if (fraction < 0) {
        return '#NUM!';
      }

      // Return error if fraction is greater than or equal to 0 and less than 1
      if (fraction >= 0 && fraction < 1) {
        return '#DIV/0!';
      }

      // Truncate fraction if it is not an integer
      fraction = parseInt(fraction, 10);

      // Compute integer part
      var result = parseInt(dollar, 10);

      // Add decimal part
      result += (dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;

      // Round result
      var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
      result = Math.round(result * power) / power;

      // Return converted dollar price
      return result;
    };

    Formula.DOLLARFR = function (dollar, fraction) {
      // Credits: algorithm inspired by Apache OpenOffice

      // Return error if any of the parameters is not a number
      if (isNaN(dollar) || isNaN(fraction)) {
        return '#VALUE!';
      }

      // Return error if fraction is negative
      if (fraction < 0) {
        return '#NUM!';
      }

      // Return error if fraction is greater than or equal to 0 and less than 1
      if (fraction >= 0 && fraction < 1) {
        return '#DIV/0!';
      }

      // Truncate fraction if it is not an integer
      fraction = parseInt(fraction, 10);

      // Compute integer part
      var result = parseInt(dollar, 10);

      // Add decimal part
      result += (dollar % 1) * Math.pow(10, -Math.ceil(Math.log(fraction) / Math.LN10)) * fraction;

      // Return converted dollar price
      return result;
    };

    Formula.DURATION = function () {
      return;
    };

    Formula.EFFECT = function (rate, periods) {
      // Return error if any of the parameters is not a number
      if (isNaN(rate) || isNaN(periods)) {
        return '#VALUE!';
      }

      // Return error if rate <=0 or periods < 1
      if (rate <= 0 || periods < 1) {
        return '#NUM!';
      }

      // Truncate periods if it is not an integer
      periods = parseInt(periods, 10);

      // Return effective annual interest rate
      return Math.pow(1 + rate / periods, periods) - 1;
    };

    Formula.FV = function (rate, periods, payment, value, type) {
      // Credits: algorithm inspired by Apache OpenOffice

      // Initialize type
      type = (typeof type === 'undefined') ? 0 : type;

      // Evaluate rate (TODO: replace with secure expression evaluator)
      rate = eval(rate);

      // Return future value
      var result;
      if (rate === 0) {
        result = value + payment * periods;
      } else {
        var term = Math.pow(1 + rate, periods);
        if (type === 1) {
          result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
        } else {
          result = value * term + payment * (term - 1) / rate;
        }
      }
      return -result;
    };

    Formula.FVSCHEDULE = function (principal, schedule) {
      // Initialize future value
      var future = principal;

      // Apply all interests in schedule
      for (var i = 0; i < schedule.length; i++) {
        // Return error if schedule value is not a number
        if (isNaN(schedule[i])) {
          return '#VALUE!';
        }

        // Apply scheduled interest
        future *= 1 + schedule[i];
      }

      // Return future value
      return future;
    };

    Formula.INTRATE = function () {
      return;
    };

    Formula.IPMT = function (rate, period, periods, present, future, type) {
      // Credits: algorithm inspired by Apache OpenOffice

      // Initialize type
      type = (typeof type === 'undefined') ? 0 : type;

      // Evaluate rate and periods (TODO: replace with secure expression evaluator)
      rate = eval(rate);
      periods = eval(periods);

      // Compute payment
      var payment = Formula.PMT(rate, periods, present, future, type);

      // Compute interest
      var interest;
      if (period === 1) {
        if (type === 1) {
          interest = 0;
        } else {
          interest = -present;
        }
      } else {
        if (type === 1) {
          interest = Formula.FV(rate, period - 2, payment, present, 1) - payment;
        } else {
          interest = Formula.FV(rate, period - 1, payment, present, 0);
        }
      }

      // Return interest
      return interest * rate;
    };

    Formula.IRR = function (values, guess) {
      // Credits: algorithm inspired by Apache OpenOffice

      // flatten so multi dimensional ranges also work
      values = Formula.FLATTEN(values);

      // Calculates the resulting amount
      var irrResult = function (values, dates, rate) {
        var r = rate + 1;
        var result = values[0];
        for (var i = 1; i < values.length; i++) {
          result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
        }
        return result;
      };

      // Calculates the first derivation
      var irrResultDeriv = function (values, dates, rate) {
        var r = rate + 1;
        var result = 0;
        for (var i = 1; i < values.length; i++) {
          var frac = (dates[i] - dates[0]) / 365;
          result -= frac * values[i] / Math.pow(r, frac + 1);
        }
        return result;
      };

      // Initialize dates and check that values contains at least one positive value and one negative value
      var dates = [];
      var positive = false;
      var negative = false;
      for (var i = 0; i < values.length; i++) {
        dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
        if (values[i] > 0) {
          positive = true;
        }
        if (values[i] < 0) {
          negative = true;
        }
      }

      // Return error if values does not contain at least one positive value and one negative value
      if (!positive || !negative) {
        return '#NUM!';
      }

      // Initialize guess and resultRate
      guess = (typeof guess === 'undefined') ? 0.1 : guess;
      var resultRate = guess;

      // Set maximum epsilon for end of iteration
      var epsMax = 1e-10;

      // Set maximum number of iterations
      var iterMax = 50;

      // Implement Newton's method
      var newRate, epsRate, resultValue;
      var iteration = 0;
      var contLoop = true;
      do {
        resultValue = irrResult(values, dates, resultRate);
        newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
        epsRate = Math.abs(newRate - resultRate);
        resultRate = newRate;
        contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
      } while (contLoop && (++iteration < iterMax));

      if (contLoop) {
        return '#NUM!';
      }

      // Return internal rate of return
      return resultRate;
    };

    Formula.ISPMT = function (rate, period, periods, value) {
      // Evaluate rate and periods (TODO: replace with secure expression evaluator)
      rate = eval(rate);
      periods = eval(periods);

      // Return interest
      return value * rate * (period / periods - 1);
    };

    Formula.MDURATION = function () {
      return;
    };

    Formula.MIRR = function (values, finance_rate, reinvest_rate) {
      // Initialize number of values
      var n = values.length;

      // Lookup payments (negative values) and incomes (positive values)
      var payments = [];
      var incomes = [];
      for (var i = 0; i < n; i++) {
        if (values[i] < 0) {
          payments.push(values[i]);
        } else {
          incomes.push(values[i]);
        }
      }

      // Return modified internal rate of return
      var num = -Formula.NPV(reinvest_rate, incomes) * Math.pow(1 + reinvest_rate, n - 1);
      var den = Formula.NPV(finance_rate, payments) * (1 + finance_rate);
      return Math.pow(num / den, 1 / (n - 1)) - 1;
    };

    Formula.NOMINAL = function (rate, periods) {
      // Return error if any of the parameters is not a number
      if (isNaN(rate) || isNaN(periods)) {
        return '#VALUE!';
      }

      // Return error if rate <=0 or periods < 1
      if (rate <= 0 || periods < 1) {
        return '#NUM!';
      }

      // Truncate periods if it is not an integer
      periods = parseInt(periods, 10);

      // Return nominal annual interest rate
      return (Math.pow(rate + 1, 1 / periods) - 1) * periods;
    };

    Formula.NPER = function (rate, payment, present, future, type) {
      // Initialize type
      type = (typeof type === 'undefined') ? 0 : type;

      // Initialize future value
      future = (typeof future === 'undefined') ? 0 : future;

      // Evaluate rate and periods (TODO: replace with secure expression evaluator)
      rate = eval(rate);

      // Return number of periods
      var num = payment * (1 + rate * type) - future * rate;
      var den = (present * rate + payment * (1 + rate * type));
      return Math.log(num / den) / Math.log(1 + rate);
    };

    Formula.NPV = function () {
      // Cast arguments to array
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args = args.concat(arguments[i]);
      }

      // Lookup rate
      var rate = args[0];

      // Initialize net present value
      var value = 0;

      // Loop on all values
      for (var j = 1; j < args.length; j++) {
        value += args[j] / Math.pow(1 + rate, j);
      }

      // Return net present value
      return value;
    };

    Formula.ODDFPRICE = function () {
      return;
    };

    Formula.ODDFYIELD = function () {
      return;
    };

    Formula.ODDLPRICE = function () {
      return;
    };

    Formula.ODDLYIELD = function () {
      return;
    };

    Formula.PDURATION = function (rate, present, future) {
      // Return error if any of the parameters is not a number
      if (isNaN(rate) || isNaN(present) || isNaN(future)) {
        return '#VALUE!';
      }

      // Return error if rate <=0
      if (rate <= 0) {
        return '#NUM!';
      }

      // Return number of periods
      return (Math.log(future) - Math.log(present)) / Math.log(1 + rate);
    };

    Formula.PMT = function (rate, periods, present, future, type) {
      // Credits: algorithm inspired by Apache OpenOffice

      // Initialize type
      type = (typeof type === 'undefined') ? 0 : type;

      // Evaluate rate and periods (TODO: replace with secure expression evaluator)
      rate = eval(rate);
      periods = eval(periods);

      // Return payment
      var result;
      if (rate === 0) {
        result = (present + future) / periods;
      } else {
        var term = Math.pow(1 + rate, periods);
        if (type === 1) {
          result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
        } else {
          result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
        }
      }
      return -result;
    };

    Formula.PPMT = function (rate, period, periods, present, future, type) {
      return Formula.PMT(rate, periods, present, future, type) - Formula.IPMT(rate, period, periods, present, future, type);
    };

    Formula.PRICE = function () {
      return;
    };

    Formula.PRICEDISC = function () {
      return;
    };

    Formula.PRICEMAT = function () {
      return;
    };

    Formula.PV = function (rate, periods, payment, future, type) {
      // Initialize type
      type = (typeof type === 'undefined') ? 0 : type;

      // Evaluate rate and periods (TODO: replace with secure expression evaluator)
      rate = eval(rate);
      periods = eval(periods);

      // Return present value
      if (rate === 0) {
        return -payment * periods - future;
      } else {
        return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
      }
    };

    Formula.RATE = function (periods, payment, present, future, type, guess) {
      // Credits: rabugento

      // Initialize guess
      guess = (typeof guess === 'undefined') ? 0.01 : guess;

      // Initialize future
      future = (typeof future === 'undefined') ? 0 : future;

      // Initialize type
      type = (typeof type === 'undefined') ? 0 : type;

      // Evaluate periods (TODO: replace with secure expression evaluator)
      periods = eval(periods);

      // Set maximum epsilon for end of iteration
      var epsMax = 1e-10;

      // Set maximum number of iterations
      var iterMax = 50;

      // Implement Newton's method
      var y, y0, y1, x0, x1 = 0, f = 0, i = 0;
      var rate = guess;
      if (Math.abs(rate) < epsMax) {
        y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
      } else {
        f = Math.exp(periods * Math.log(1 + rate));
        y = present * f + payment * (1 / rate + type) * (f - 1) + future;
      }
      y0 = present + payment * periods + future;
      y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
      i = x0 = 0;
      x1 = rate;
      while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
        rate = (y1 * x0 - y0 * x1) / (y1 - y0);
        x0 = x1;
        x1 = rate;
        if (Math.abs(rate) < epsMax) {
          y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
        } else {
          f = Math.exp(periods * Math.log(1 + rate));
          y = present * f + payment * (1 / rate + type) * (f - 1) + future;
        }
        y0 = y1;
        y1 = y;
        ++i;
      }
      return rate;
    };

    Formula.RECEIVED = function () {
      return;
    };

    Formula.RRI = function (periods, present, future) {
      // Return error if any of the parameters is not a number
      if (isNaN(periods) || isNaN(present) || isNaN(future)) {
        return '#VALUE!';
      }

      // Return error if periods or present is equal to 0 (zero)
      if (periods === 0 || present === 0) {
        return '#NUM!';
      }

      // Return equivalent interest rate
      return Math.pow(future / present, 1 / periods) - 1;
    };

    Formula.SLN = function (cost, salvage, life) {
      // Return error if any of the parameters is not a number
      if (isNaN(cost) || isNaN(salvage) || isNaN(life)) {
        return '#VALUE!';
      }

      // Return error if life equal to 0 (zero)
      if (life === 0) {
        return '#NUM!';
      }

      // Return straight-line depreciation
      return (cost - salvage) / life;
    };

    Formula.SYD = function (cost, salvage, life, period) {
      // Return error if any of the parameters is not a number
      if (isNaN(cost) || isNaN(salvage) || isNaN(life) || isNaN(period)) {
        return '#VALUE!';
      }

      // Return error if life equal to 0 (zero)
      if (life === 0) {
        return '#NUM!';
      }

      // Return error if period is lower than 1 or greater than life
      if (period < 1 || period > life) {
        return '#NUM!';
      }

      // Truncate period if it is not an integer
      period = parseInt(period, 10);

      // Return straight-line depreciation
      return (cost - salvage) * (life - period + 1) * 2 / (life * (life + 1));
    };

    Formula.TBILLEQ = function (settlement, maturity, discount) {
      // Return error if either date is invalid
      if (!moment(settlement).isValid() || !moment(maturity).isValid()) {
        return '#VALUE!';
      }

      // Return error if discount is lower than or equal to zero
      if (discount <= 0) {
        return '#NUM!';
      }

      // Return error if settlement is greater than maturity
      if (moment(settlement).diff(moment(maturity)) > 0) {
        return '#NUM!';
      }

      // Return error if maturity is more than one year after settlement
      if (moment(maturity).diff(moment(settlement), 'years') > 1) {
        return '#NUM!';
      }

      // Return bond-equivalent yield
      return (365 * discount) / (360 - discount * Formula.DAYS360(settlement, maturity));
    };

    Formula.TBILLPRICE = function (settlement, maturity, discount) {
      // Return error if either date is invalid
      if (!moment(settlement).isValid() || !moment(maturity).isValid()) {
        return '#VALUE!';
      }

      // Return error if discount is lower than or equal to zero
      if (discount <= 0) {
        return '#NUM!';
      }

      // Return error if settlement is greater than maturity
      if (moment(settlement).diff(moment(maturity)) > 0) {
        return '#NUM!';
      }

      // Return error if maturity is more than one year after settlement
      if (moment(maturity).diff(moment(settlement), 'years') > 1) {
        return '#NUM!';
      }

      // Return bond-equivalent yield
      return 100 * (1 - discount * Formula.DAYS360(settlement, maturity) / 360);
    };

    Formula.TBILLYIELD = function (settlement, maturity, price) {
      // Return error if either date is invalid
      if (!moment(settlement).isValid() || !moment(maturity).isValid()) {
        return '#VALUE!';
      }

      // Return error if price is lower than or equal to zero
      if (price <= 0) {
        return '#NUM!';
      }

      // Return error if settlement is greater than maturity
      if (moment(settlement).diff(moment(maturity)) > 0) {
        return '#NUM!';
      }

      // Return error if maturity is more than one year after settlement
      if (moment(maturity).diff(moment(settlement), 'years') > 1) {
        return '#NUM!';
      }

      // Return bond-equivalent yield
      return (100 - price) * 360 / (price * Formula.DAYS360(settlement, maturity));
    };

    Formula.VDB = function () {
      return;
    };


    Formula.XIRR = function (values, dates, guess) {
      // Credits: algorithm inspired by Apache OpenOffice

      // Calculates the resulting amount
      var irrResult = function (values, dates, rate) {
        var r = rate + 1;
        var result = values[0];
        for (var i = 1; i < values.length; i++) {
          result += values[i] / Math.pow(r, moment(dates[i]).diff(moment(dates[0]), 'days') / 365);
        }
        return result;
      };

      // Calculates the first derivation
      var irrResultDeriv = function (values, dates, rate) {
        var r = rate + 1;
        var result = 0;
        for (var i = 1; i < values.length; i++) {
          var frac = moment(dates[i]).diff(moment(dates[0]), 'days') / 365;
          result -= frac * values[i] / Math.pow(r, frac + 1);
        }
        return result;
      };

      // Check that values contains at least one positive value and one negative value
      var positive = false;
      var negative = false;
      for (var i = 0; i < values.length; i++) {
        if (values[i] > 0) {
          positive = true;
        }
        if (values[i] < 0) {
          negative = true;
        }
      }

      // Return error if values does not contain at least one positive value and one negative value
      if (!positive || !negative) {
        return '#NUM!';
      }

      // Initialize guess and resultRate
      guess = guess || 0.1;
      var resultRate = guess;

      // Set maximum epsilon for end of iteration
      var epsMax = 1e-10;

      // Set maximum number of iterations
      var iterMax = 50;

      // Implement Newton's method
      var newRate, epsRate, resultValue;
      var iteration = 0;
      var contLoop = true;
      do {
        resultValue = irrResult(values, dates, resultRate);
        newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
        epsRate = Math.abs(newRate - resultRate);
        resultRate = newRate;
        contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
      } while (contLoop && (++iteration < iterMax));

      if (contLoop) {
        return '#NUM!';
      }

      // Return internal rate of return
      return resultRate;
    };

    Formula.XNPV = function (rate, values, dates) {
      var result = 0;
      for (var i = 0; i < values.length; i++) {
        result += values[i] / Math.pow(1 + rate, moment(dates[i]).diff(moment(dates[0]), 'days') / 365);
      }
      return result;
    };

    Formula.YIELD = function () {
      return;
    };

    Formula.YIELDDISC = function () {
      return;
    };

    Formula.YIELDMAT = function () {
    };


    // Information functions

    Formula.ISNUMBER = function (number) {
      return (!isNaN(parseFloat(number)) && isFinite(number)) ? true : false;
    };


    // Logical functions

    Formula.AND = function () {
      var result = true;
      for (var i = 0; i < arguments.length; i++) {
        if (!arguments[i]) {
          result = false;
        }
      }
      return result;
    };

    Formula.FALSE = function () {
      return false;
    };

    Formula.SWITCH = function () {
      var result;
      if (arguments.length > 0)  {
        var targetValue = arguments[0];
        var argc = arguments.length - 1;
        var switchCount = Math.floor(argc / 2);
        var switchSatisfied = false;
        var defaultClause = argc % 2 === 0 ? null : arguments[arguments.length - 1];

        if (switchCount) {
          for (var index = 0; index < switchCount; index++) {
            if (targetValue === arguments[index * 2 + 1]) {
              result = arguments[index * 2 + 2];
              switchSatisfied = true;
              break;
            }
          }
        }

        if (!switchSatisfied && defaultClause) {
          result = defaultClause;
        }
      }

      return result;
    };

    Formula.IF = function (test, then_value, otherwise_value) {
      return test?then_value:otherwise_value;
    };

    Formula.IFNA = function (value, value_if_na) {
      return (value === '#N/A') ? value_if_na : value;
    };

    Formula.NOT = function (logical) {
      return !logical;
    };

    Formula.OR = function () {
      var result = false;
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i]) {
          result = true;
        }
      }
      return result;
    };

    Formula.TRUE = function () {
      return true;
    };

    Formula.XOR = function () {
      var result = 0;
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i]) {
          result++;
        }
      }
      return (Math.floor(Math.abs(result)) & 1) ? true : false;
    };


    // Lookup and reference functions

    Formula.REFERENCE = function (context, reference) {
      try {
        var path = reference.split('.'),
          result = context;
        _(path).forEach(function (step) {
          if (step[step.length - 1] === ']') {
            var opening = step.indexOf('[');
            var index = step.substring(opening + 1, step.length - 1);
            result = result[step.substring(0, opening)][index];
          } else {
            result = result[step];
          }
        });
        return result;
      } catch (error) {
        return;
      }
    };


    // Math functions

    Formula.ABS = function (number) {
      return Math.abs(number);
    };

    Formula.ACOS = function (number) {
      return Math.acos(number);
    };

    Formula.ACOSH = function (number) {
      return Math.log(number + Math.sqrt(number * number - 1));
    };

    Formula.ACOT = function (number) {
      return Math.atan(1 / number);
    };

    Formula.ACOTH = function (number) {
      return 0.5 * Math.log((number + 1) / (number - 1));
    };

    Formula.AGGREGATE = function (function_code) {
      var result = [];
      for (var i = 2; i < arguments.length; i++) {
        switch (function_code) {
          case 1:
            result[i - 2] = Formula.AVERAGE(arguments[i]);
            break;
          case 2:
            result[i - 2] = Formula.COUNT(arguments[i]);
            break;
          case 3:
            result[i - 2] = Formula.COUNTA(arguments[i]);
            break;
          case 4:
            result[i - 2] = Formula.MAX(arguments[i]);
            break;
          case 5:
            result[i - 2] = Formula.MIN(arguments[i]);
            break;
          case 6:
            result[i - 2] = Formula.PRODUCT(arguments[i]);
            break;
          case 7:
            result[i - 2] = Formula.STDEVS(arguments[i]);
            break;
          case 8:
            result[i - 2] = Formula.STDEVP(arguments[i]);
            break;
          case 9:
            result[i - 2] = Formula.SUM(arguments[i]);
            break;
          case 10:
            result[i - 2] = Formula.VARS(arguments[i]);
            break;
          case 11:
            result[i - 2] = Formula.VARP(arguments[i]);
            break;
          case 12:
            result[i - 2] = Formula.MEDIAN(arguments[i]);
            break;
          case 13:
            result[i - 2] = Formula.MODESNGL(arguments[i]);
            break;
          case 14:
            result[i - 2] = Formula.LARGE(arguments[i]);
            break;
          case 15:
            result[i - 2] = Formula.SMALL(arguments[i]);
            break;
          case 16:
            result[i - 2] = Formula.PERCENTILEINC(arguments[i]);
            break;
          case 17:
            result[i - 2] = Formula.QUARTILEINC(arguments[i]);
            break;
          case 18:
            result[i - 2] = Formula.PERCENTILEEXC(arguments[i]);
            break;
          case 19:
            result[i - 2] = Formula.QUARTILEEXC(arguments[i]);
            break;
        }
      }
      return result;
    };

    Formula.ARABIC = function (text) {
      // Credits: Rafa? Kukawski
      if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
        throw new Error('Incorrect roman number');
      }
      var r = 0;
      text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function (i) {
        r += {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1}[i];
      });
      return r;
    };

    Formula.ASIN = function (number) {
      return Math.asin(number);
    };

    Formula.ASINH = function (number) {
      return Math.log(number + Math.sqrt(number * number + 1));
    };

    Formula.ATAN = function (number) {
      return Math.atan(number);
    };

    Formula.ATAN2 = function (number_x, number_y) {
      return Math.atan2(number_x, number_y);
    };

    Formula.ATANH = function (number) {
      return Math.log((1 + number) / (1 - number)) / 2;
    };

    Formula.BASE = function (number, radix, min_length) {
      min_length = (typeof min_length === 'undefined') ? 0 : min_length;
      var result = number.toString(radix);
      return new Array(Math.max(min_length + 1 - result.length, 0)).join('0') + result;
    };

    Formula.CEILING = function (number, significance, mode) {
      if (significance === 0) {
        return 0;
      }
      significance = (typeof significance === 'undefined') ? 1 : Math.abs(significance);
      mode = (typeof mode === 'undefined') ? 0 : mode;
      var precision = -Math.floor(Math.log(significance) / Math.log(10));
      if (number >= 0) {
        return Formula.ROUND(Math.ceil(number / significance) * significance, precision);
      } else {
        if (mode === 0) {
          return -Formula.ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
        } else {
          return -Formula.ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
        }
      }
    };

    Formula.CEILINGMATH = Formula.CEILING;

    Formula.CEILINGPRECISE = Formula.CEILING;

    Formula.COMBIN = function (number, number_chosen) {
      return Formula.FACT(number) / (Formula.FACT(number_chosen) * Formula.FACT(number - number_chosen));
    };

    Formula.COMBINA = function (number, number_chosen) {
      return (number === 0 && number_chosen === 0) ? 1 : Formula.COMBIN(number + number_chosen - 1, number - 1);
    };

    Formula.COS = Math.cos;

    Formula.COSH = function (number) {
      return (Math.exp(number) + Math.exp(-number)) / 2;
    };

    Formula.COT = function (number) {
      return 1 / Math.tan(number);
    };

    Formula.COTH = function (number) {
      var e2 = Math.exp(2 * number);
      return (e2 + 1) / (e2 - 1);
    };

    Formula.CSC = function (number) {
      return 1 / Math.sin(number);
    };

    Formula.CSCH = function (number) {
      return 2 / (Math.exp(number) - Math.exp(-number));
    };

    Formula.DECIMAL = function (number, radix) {
      return parseInt(number, radix);
    };

    Formula.DEGREES = function (number) {
      return number * 180 / Math.PI;
    };

    Formula.EVEN = function (number) {
      return Formula.CEILING(number, -2, -1);
    };

    Formula.EXP = Math.exp;

    Formula.FACT = function (number) {
      var n = Math.floor(number);
      if (n === 0 || n === 1) {
        return 1;
      } else if (MEMOIZED_FACT[n] > 0) {
        return MEMOIZED_FACT[n];
      } else {
        MEMOIZED_FACT[n] = Formula.FACT(n - 1) * n;
        return MEMOIZED_FACT[n];
      }
    };

    Formula.FACTDOUBLE = function (number) {
      var n = Math.floor(number);
      if (n <= 0) {
        return 1;
      } else {
        return n * Formula.FACTDOUBLE(n - 2);
      }
    };

    Formula.FLOOR = function (number, significance, mode) {
      if (significance === 0) {
        return 0;
      }

      significance = significance ? Math.abs(significance) : 1;
      var precision = -Math.floor(Math.log(significance) / Math.log(10));
      if (number >= 0) {
        return Formula.ROUND(Math.floor(number / significance) * significance, precision);
      } else if (mode === 0 || typeof mode === 'undefined') {
        return -Formula.ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
      }
      return -Formula.ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
    };

    Formula.FLOORMATH = Formula.FLOOR;

    Formula.FLOORPRECISE = function(number, significance) {
      if (significance === 0) {
        return 0;
      }

      significance = significance ? Math.abs(significance) : 1;
      var precision = -Math.floor(Math.log(significance) / Math.log(10));
      if (number >= 0) {
        return Formula.ROUND(Math.round(number / significance) * significance, precision);
      }
      return -Formula.ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
    };

    Formula.GCD = function () {
      // Credits: Andrew Pociu
      for (var r, a, i = arguments.length - 1, result = arguments[i]; i;) {
        for (a = arguments[--i]; (r = a % result); a = result, result = r) {
          //empty
        }
      }
      return result;
    };

    Formula.INT = function (number) {
      return Math.floor(number);
    };

    Formula.ISEVEN = function (number) {
      return (Math.floor(Math.abs(number)) & 1) ? false : true;
    };

    Formula.ISOCEILING = Formula.CEILING;

    Formula.ISODD = function (number) {
      return (Math.floor(Math.abs(number)) & 1) ? true : false;
    };

    Formula.LCM = function () {
      // Credits: Jonas Raoni Soares Silva
      var o = Formula.ARGSTOARRAY(arguments);
      for (var i, j, n, d, r = 1; (n = o.pop()) !== undefined;) {
        while (n > 1) {
          if (n % 2) {
            for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2) {
              //empty
            }
            d = (i <= j) ? i : n;
          } else {
            d = 2;
          }
          for (n /= d, r *= d, i = o.length; i; (o[--i] % d) === 0 && (o[i] /= d) === 1 && o.splice(i, 1)) {
            //empty
          }
        }
      }
      return r;
    };

    Formula.LN = function (number) {
      return Math.log(number);
    };

    Formula.LOG = function (number, base) {
      base = (typeof base === 'undefined') ? 10 : base;
      return Math.log(number) / Math.log(base);
    };

    Formula.LOG10 = function (number) {
      return Math.log(number) / Math.log(10);
    };

    Formula.MDETERM = numeric.det;

    Formula.MINVERSE = numeric.inv;

    Formula.MMULT = numeric.dot;

    Formula.MOD = function (dividend, divisor) {
      var modulus = Math.abs(dividend % divisor);
      return (divisor > 0) ? modulus : -modulus;
    };

    Formula.MROUND = function (number, multiple) {
      if (number * multiple < 0) {
        throw new Error('Number and multiple must have the same sign.');
      }

      return Math.round(number / multiple) * multiple;
    };

    Formula.MULTINOMIAL = function () {
      var sum = 0;
      var divisor = 1;
      for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
        divisor *= Formula.FACT(arguments[i]);
      }
      return Formula.FACT(sum) / divisor;
    };

    Formula.MUNIT = numeric.identity;

    Formula.ODD = function (number) {
      var temp = Math.ceil(Math.abs(number));
      temp = (temp & 1) ? temp : temp + 1;
      return (number > 0) ? temp : -temp;
    };

    Formula.PI = function () {
      return Math.PI;
    };

    Formula.POWER = function (number, power) {
      var result = Math.pow(number, power);
      if (isNaN(result)) {
        return '#NUM!';
      }

      return result;
    };

    Formula.PRODUCT = function () {
      var result = 1;
      for (var i = 0; i < arguments.length; i++) {
        result *= arguments[i];
      }
      return result;
    };

    Formula.QUOTIENT = function (numerator, denominator) {
      return (numerator / denominator).toFixed(0);
    };

    Formula.RADIANS = function (number) {
      return number * Math.PI / 180;
    };

    Formula.RAND = function () {
      return Math.random();
    };

    Formula.RANDBETWEEN = function (bottom, top) {
      // Creative Commons Attribution 3.0 License
      // Copyright (c) 2012 eqcode
      return bottom + Math.ceil((top - bottom + 1) * Math.random()) - 1;
    };

    Formula.ROUND = function (number, digits) {
      return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
    };

    Formula.ROUNDDOWN = function (number, digits) {
      var sign = (number > 0) ? 1 : -1;
      return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
    };

    Formula.ROUNDUP = function (number, digits) {
      var sign = (number > 0) ? 1 : -1;
      return sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
    };

    Formula.SERIESSUM = function (x, n, m, coefficients) {
      var result = coefficients[0] * Math.pow(x, n);
      for (var i = 1; i < coefficients.length; i++) {
        result += coefficients[i] * Math.pow(x, n + i * m);
      }
      return result;
    };

    Formula.SEC = function (number) {
      return 1 / Math.cos(number);
    };

    Formula.SECH = function (number) {
      return 2 / (Math.exp(number) + Math.exp(-number));
    };

    Formula.SIGN = function (number) {
      if (number < 0) {
        return -1;
      } else if (number === 0) {
        return 0;
      } else {
        return 1;
      }
    };

    Formula.SIN = Math.sin;

    Formula.SINH = function (number) {
      return (Math.exp(number) - Math.exp(-number)) / 2;
    };

    Formula.SQRT = Math.sqrt;

    Formula.SQRTPI = function (number) {
      return Math.sqrt(number * Math.PI);
    };

    Formula.SUBTOTAL = function (function_code) {
      var result = [];
      for (var i = 1; i < arguments.length; i++) {
        switch (function_code) {
          case 1:
            result[i - 1] = Formula.AVERAGE(arguments[i]);
            break;
          case 2:
            result[i - 1] = Formula.COUNT(arguments[i]);
            break;
          case 3:
            result[i - 1] = Formula.COUNTA(arguments[i]);
            break;
          case 4:
            result[i - 1] = Formula.MAX(arguments[i]);
            break;
          case 5:
            result[i - 1] = Formula.MIN(arguments[i]);
            break;
          case 6:
            result[i - 1] = Formula.PRODUCT(arguments[i]);
            break;
          case 7:
            result[i - 1] = Formula.STDEV(arguments[i]);
            break;
          case 8:
            result[i - 1] = Formula.STDEVP(arguments[i]);
            break;
          case 9:
            result[i - 1] = Formula.SUM(arguments[i]);
            break;
          case 10:
            result[i - 1] = Formula.VAR(arguments[i]);
            break;
          case 11:
            result[i - 1] = Formula.VARP(arguments[i]);
            break;
        }
      }
      return result;
    };

    Formula.SUM = function () {
      var numbers = Formula.FLATTEN(arguments);
      var result = 0;
      var i = numbers.length;
      while(i--) {
        result += numbers[i];
      }

      return result;
    };

    Formula.SUMIF = function (range, criteria) {
      range = Formula.FLATTEN(range);
      var result = 0;
      for (var i = 0; i < range.length; i++) {
        result += (eval(range[i] + criteria)) ? range[i] : 0;
      }
      return result;
    };

    Formula.SUMIFS = function () {
      var args = Formula.ARGSTOARRAY(arguments);
      var range = Formula.FLATTEN(args.shift());
      var criteria = args;

      var n_range_elements = range.length;
      var n_criterias = criteria.length;

      var result = 0;
      for (var i = 0; i < n_range_elements; i++) {
        var el = range[i];
        var condition = '';
        for (var c = 0; c < n_criterias; c++) {
          condition += el+criteria[c];
          if (c !== n_criterias - 1) {
            condition += '&&';
          }
        }
        if (eval(condition)) {
          result += el;
        }
      }
      return result;
    };

    Formula.SUMPRODUCT = function () {
      var arrays = arguments.length + 1;
      var result = 0;
      for (var i = 0; i < arguments[0].length; i++) {
        for (var j = 0; j < arguments[0][i].length; j++) {
          var product = 1;
          for (var k = 1; k < arrays; k++) {
            product *= arguments[k - 1][i][j];
          }
          result += product;
        }
      }
      return result;
    };

    Formula.SUMSQ = function () {
      var numbers = Formula.FLATTEN(arguments);
      var result = 0;
      for (var i = 0; i < numbers.length; i++) {
        result += (Formula.ISNUMBER(numbers[i])) ? numbers[i] * numbers[i] : 0;
      }
      return result;
    };

    Formula.SUMX2MY2 = function (array_x, array_y) {
      var result = 0;
      array_x = Formula.FLATTEN(array_x);
      array_y = Formula.FLATTEN(array_y);
      for (var i = 0; i < array_x.length; i++) {
        result += array_x[i] * array_x[i] - array_y[i] * array_y[i];
      }
      return result;
    };

    Formula.SUMX2PY2 = function (array_x, array_y) {
      var result = 0;
      array_x = Formula.FLATTEN(array_x);
      array_y = Formula.FLATTEN(array_y);
      for (var i = 0; i < array_x.length; i++) {
        result += array_x[i] * array_x[i] + array_y[i] * array_y[i];
      }
      return result;
    };

    Formula.SUMXMY2 = function (array_x, array_y) {
      var result = 0;
      array_x = Formula.FLATTEN(array_x);
      array_y = Formula.FLATTEN(array_y);
      for (var i = 0; i < array_x.length; i++) {
        result += Math.pow(array_x[i] - array_y[i], 2);
      }
      return result;
    };

    Formula.TAN = function (number) {
      return Math.tan(number);
    };

    Formula.TANH = function (number) {
      var e2 = Math.exp(2 * number);
      return (e2 - 1) / (e2 + 1);
    };

    Formula.TRUNC = function (number, digits) {
      digits = (typeof digits === 'undefined') ? 0 : digits;
      var sign = (number > 0) ? 1 : -1;
      return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
    };


    // Statistical functions
    Formula.AVEDEV = function () {
      var range = Formula.FLATTEN(arguments);
      return jStat.sum(jStat(range).subtract(jStat.mean(range)).abs()[0]) / range.length;
    };

    Formula.AVERAGE = function () {
      var range = Formula.NUMBERS(Formula.FLATTEN(arguments));
      var n = range.length;
      var sum = 0;
      var count = 0;
      for (var i = 0; i < n; i++) {
        sum += range[i];
        count += 1;
      }
      return sum / count;
    };

    Formula.AVERAGEA = function () {
      var range = Formula.FLATTEN(arguments);
      var n = range.length;
      var sum = 0;
      var count = 0;
      for (var i = 0; i < n; i++) {
        var el = range[i];
        if (typeof el === 'number') {
          sum += el;
        }
        if (el === true) {
          sum++;
        }
        if (el !== null) {
          count++;
        }
      }
      return sum / count;
    };

    Formula.AVERAGEIF = function (range, criteria, average_range) {
      average_range = average_range || range;
      range = Formula.FLATTEN(range);
      average_range = Formula.FLATTEN(average_range);
      var average_count = 0;
      var result = 0;
      for (var i = 0; i < range.length; i++) {
        if (eval(range[i] + criteria)) {
          result += average_range[i];
          average_count++;
        }
      }
      return result / average_count;
    };

    Formula.AVERAGEIFS = function () {
      // Does not work with multi dimensional ranges yet!
      //http://office.microsoft.com/en-001/excel-help/averageifs-function-HA010047493.aspx
      var args = Formula.ARGSTOARRAY(arguments);
      var criteria = (args.length - 1) / 2;
      var range = Formula.FLATTEN(args[0]);
      var count = 0;
      var result = 0;
      for (var i = 0; i < range.length; i++) {
        var condition = '';
        for (var j = 0; j < criteria; j++) {
          condition += args[2 * j + 1][i] + args[2 * j + 2];
          if (j !== criteria - 1) {
            condition += '&&';
          }
        }
        if (eval(condition)) {
          result += range[i];
          count++;
        }
      }

      var average = result / count;
      if (isNaN(average)) {
        return 0;
      } else {
        return average;
      }
    };

    Formula.BETADIST = function (x, alpha, beta, cumulative, A, B) {
      A = (typeof A === 'undefined') ? 0 : A;
      B = (typeof B === 'undefined') ? 1 : B;
      x = (x - A) / (B - A);
      return (cumulative) ? jStat.beta.cdf(x, alpha, beta) : jStat.beta.pdf(x, alpha, beta);
    };

    Formula.BETAINV = function (probability, alpha, beta, A, B) {
      A = (typeof A === 'undefined') ? 0 : A;
      B = (typeof B === 'undefined') ? 1 : B;
      return jStat.beta.inv(probability, alpha, beta) * (B - A) + A;
    };

    Formula.BINOMDIST = function (successes, trials, probability, cumulative) {
      return (cumulative) ? jStat.binomial.cdf(successes, trials, probability) : jStat.binomial.pdf(successes, trials, probability);
    };

    Formula.BINOMDISTRANGE = function (trials, probability, successes, successes2) {
      successes2 = (typeof successes2 === 'undefined') ? successes : successes2;
      var result = 0;
      for (var i = successes; i <= successes2; i++) {
        result += Formula.COMBIN(trials, i) * Math.pow(probability, i) * Math.pow(1 - probability, trials - i);
      }
      return result;
    };

    Formula.BINOMINV = function (trials, probability, alpha) {
      var x = 0;
      while (x <= trials) {
        if (jStat.binomial.cdf(x, trials, probability) >= alpha) {
          return x;
        }
        x++;
      }
    };

    Formula.CHISQDIST = function (x, k, cumulative) {
      return (cumulative) ? jStat.chisquare.cdf(x, k) : jStat.chisquare.pdf(x, k);
    };

    Formula.CHISQDISTRT = function () {
      return;
    };

    Formula.CHISQINV = function (probability, k) {
      return jStat.chisquare.inv(probability, k);
    };

    Formula.CHISQINVRT = function () {
      return;
    };

    Formula.CHISQTEST = function () {
      return;
    };

    Formula.CONFIDENCENORM = function (alpha, sd, n) {
      return jStat.normalci(1, alpha, sd, n)[1] - 1;
    };

    Formula.CONFIDENCET = function (alpha, sd, n) {
      return jStat.tci(1, alpha, sd, n)[1] - 1;
    };

    Formula.CORREL = function () {
      return jStat.corrcoeff.apply(this, arguments);
    };

    Formula.COUNT = function () {
      var numbers = Formula.NUMBERS(Formula.FLATTEN(arguments));
      return numbers.length;
    };

    Formula.COUNTA = function () {
      var range = Formula.FLATTEN(arguments);
      return range.length - Formula.COUNTBLANK(range);
    };

    Formula.COUNTBLANK = function () {
      var range = Formula.FLATTEN(arguments);
      var blanks = 0;
      var element;
      for (var i = 0; i < range.length; i++) {
        element = range[i];
        if (element === null || element === '') {
          blanks++;
        }
      }
      return blanks;
    };

    Formula.COUNTIF = function (range, criteria) {
      range = Formula.FLATTEN(range);
      if (!/[<>=!]/.test(criteria)) {
        criteria = '=="'+criteria+'"';
      }
      var matches = 0;
      for (var i = 0; i < range.length; i++) {
        if (typeof range[i] !== 'string') {
          if (eval(range[i]+criteria)) {
            matches++;
          }
        } else {
          if (eval('"'+range[i]+'"'+criteria)) {
            matches++;
          }
        }
      }
      return matches;
    };

    Formula.COUNTIFS = function () {
      var args = Formula.ARGSTOARRAY(arguments);
      var results = new Array(Formula.FLATTEN(args[0]).length);
      for (var i = 0; i < results.length; i++) {
        results[i] = true;
      }
      for (i = 0; i < args.length; i += 2) {
        var range = Formula.FLATTEN(args[i]);
        var criteria = args[i + 1];
        if (!/[<>=!]/.test(criteria)) {
          criteria = '=="'+criteria+'"';
        }
        for (var j = 0; j < range.length; j++) {
          if (typeof range[j] !== 'string') {
            results[j] = results[j] && eval(range[j]+criteria);
          } else {
            results[j] = results[j] && eval('"'+range[j]+'"'+criteria);
          }
        }
      }
      var result = 0;
      for (i = 0; i < results.length; i++) {
        if (results[i]) {
          result++;
        }
      }
      return result;
    };

    Formula.COUNTUNIQUE = function () {
      return _.uniq(Formula.FLATTEN(arguments)).length;
    };

    Formula.COVARIANCEP = function (array1, array2) {
      var mean1 = jStat.mean(array1);
      var mean2 = jStat.mean(array2);
      var result = 0;
      var n = array1.length;
      for (var i = 0; i < n; i++) {
        result += (array1[i] - mean1) * (array2[i] - mean2);
      }
      return result / n;
    };

    Formula.COVARIANCES = function () {
      return jStat.covariance.apply(this, arguments);
    };

    Formula.DEVSQ = function () {
      var range = Formula.ARGSCONCAT(arguments);
      var mean = jStat.mean(range);
      var result = 0;
      for (var i = 0; i < range.length; i++) {
        result += Math.pow((range[i] - mean), 2);
      }
      return result;
    };

    Formula.EXPONDIST = function (x, lambda, cumulative) {
      return (cumulative) ? jStat.exponential.cdf(x, lambda) : jStat.exponential.pdf(x, lambda);
    };

    Formula.FDIST = function (x, d1, d2, cumulative) {
      return (cumulative) ? jStat.centralF.cdf(x, d1, d2) : jStat.centralF.pdf(x, d1, d2);
    };

    Formula.FDISTRT = function () {
      return;
    };

    Formula.FINV = function (probability, d1, d2) {
      if (probability <= 0.0 || probability > 1.0) {
        return '#NUM!';
      }

      return jStat.centralF.inv(1.0 - probability, d1, d2);
    };

    Formula.FINVRT = function () {
      return;
    };

    Formula.FTEST = function () {
      return;
    };

    Formula.FISHER = function (x) {
      return Math.log((1 + x) / (1 - x)) / 2;
    };

    Formula.FISHERINV = function (y) {
      var e2y = Math.exp(2 * y);
      return (e2y - 1) / (e2y + 1);
    };

    Formula.FORECAST = function (x, data_y, data_x) {
      var xmean = jStat.mean(data_x);
      var ymean = jStat.mean(data_y);
      var n = data_x.length;
      var num = 0;
      var den = 0;
      for (var i = 0; i < n; i++) {
        num += (data_x[i] - xmean) * (data_y[i] - ymean);
        den += Math.pow(data_x[i] - xmean, 2);
      }
      var b = num / den;
      var a = ymean - b * xmean;
      return a + b * x;
    };

    Formula.FREQUENCY = function (data, bins) {
      var n = data.length;
      var b = bins.length;
      var r = [];
      for (var i = 0; i <= b; i++) {
        r[i] = 0;
        for (var j = 0; j < n; j++) {
          if (i === 0) {
            if (data[j] <= bins[0]) {
              r[0] += 1;
            }
          } else if (i < b) {
            if (data[j] > bins[i - 1] && data[j] <= bins[i]) {
              r[i] += 1;
            }
          } else if (i === b) {
            if (data[j] > bins[b - 1]) {
              r[b] += 1;
            }
          }
        }
      }
      return r;
    };

    Formula.GAMMA = function () {
      return jStat.gammafn.apply(this, arguments);
    };

    //TODO
    Formula.GAMMADIST = function (/* x, alpha, beta, cumulative */) {
      /*
       var shape = alpha;
       var scale = 1 / beta;
       return (cumulative) ? jStat.gamma.cdf(x, shape, scale) : jStat.gamma.pdf(x, shape, scale);
       */
      return;
    };

    //TODO
    Formula.GAMMAINV = function (/* probability, alpha, beta */) {
      /*
       var shape = alpha;
       var scale = 1 / beta;
       return jStat.gamma.inv(probability, shape, scale);
       */
      return;
    };

    Formula.GAMMALN = function () {
      return jStat.gammaln.apply(this, arguments);
    };

    //TODO
    Formula.GAMMALNPRECISE = function () {
      return;
    };

    Formula.GAUSS = function (z) {
      return jStat.normal.cdf(z, 0, 1) - 0.5;
    };

    Formula.GEOMEAN = function () {
      return jStat.geomean(Formula.ARGSCONCAT(arguments));
    };

    Formula.GROWTH = function (known_y, known_x, new_x, use_const) {
      // Credits: Ilmari Karonen

      // Default values for optional parameters:
      var i;
      if (typeof(known_x) === 'undefined') {
        known_x = [];
        for (i = 1; i <= known_y.length; i++) {
          known_x.push(i);
        }
      }
      if (typeof(new_x) === 'undefined') {
        new_x = [];
        for (i = 1; i <= known_y.length; i++) {
          new_x.push(i);
        }
      }
      if (typeof(use_const) === 'undefined') {
        use_const = true;
      }

      // Calculate sums over the data:
      var n = known_y.length;
      var avg_x = 0;
      var avg_y = 0;
      var avg_xy = 0;
      var avg_xx = 0;
      for (i = 0; i < n; i++) {
        var x = known_x[i];
        var y = Math.log(known_y[i]);
        avg_x += x;
        avg_y += y;
        avg_xy += x * y;
        avg_xx += x * x;
      }
      avg_x /= n;
      avg_y /= n;
      avg_xy /= n;
      avg_xx /= n;

      // Compute linear regression coefficients:
      var beta;
      var alpha;
      if (use_const) {
        beta = (avg_xy - avg_x * avg_y) / (avg_xx - avg_x * avg_x);
        alpha = avg_y - beta * avg_x;
      } else {
        beta = avg_xy / avg_xx;
        alpha = 0;
      }

      // Compute and return result array:
      var new_y = [];
      for (i = 0; i < new_x.length; i++) {
        new_y.push(Math.exp(alpha + beta * new_x[i]));
      }
      return new_y;
    };

    Formula.HARMEAN = function () {
      var range = Formula.ARGSCONCAT(arguments);
      var n = range.length;
      var den = 0;
      for (var i = 0; i < n; i++) {
        den += 1 / range[i];
      }
      return n / den;
    };

    Formula.HYPGEOMDIST = function (x, n, M, N, cumulative) {
      function pdf(x, n, M, N) {
        return Formula.COMBIN(M, x) * Formula.COMBIN(N - M, n - x) / Formula.COMBIN(N, n);
      }

      function cdf(x, n, M, N) {
        var result = 0;
        for (var i = 0; i <= x; i++) {
          result += pdf(i, n, M, N);
        }
        return result;
      }

      return (cumulative) ? cdf(x, n, M, N) : pdf(x, n, M, N);
    };

    Formula.INTERCEPT = function (data_y, data_x) {
      return Formula.FORECAST(0, data_y, data_x);
    };

    Formula.KURT = function () {
      var range = Formula.ARGSCONCAT(arguments);
      var mean = jStat.mean(range);
      var n = range.length;
      var sigma = 0;
      for (var i = 0; i < n; i++) {
        sigma += Math.pow(range[i] - mean, 4);
      }
      sigma = sigma / Math.pow(jStat.stdev(range, true), 4);
      return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sigma - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3));
    };

    Formula.LARGE = function (array, k) {
      return array.sort(function (a, b) {
        return b - a;
      })[k - 1];
    };

    Formula.LINEST = function (data_y, data_x) {
      var xmean = jStat.mean(data_x);
      var ymean = jStat.mean(data_y);
      var n = data_x.length;
      var num = 0;
      var den = 0;
      for (var i = 0; i < n; i++) {
        num += (data_x[i] - xmean) * (data_y[i] - ymean);
        den += Math.pow(data_x[i] - xmean, 2);
      }
      var m = num / den;
      var b = ymean - m * xmean;
      return [m, b];
    };

    //TODO
    Formula.LOGEST = function () {
      return;
    };

    Formula.LOGNORMDIST = function (x, mean, sd, cumulative) {
      return (cumulative) ? jStat.lognormal.cdf(x, mean, sd) : jStat.lognormal.pdf(x, mean, sd);
    };

    Formula.LOGNORMINV = function (probability, mean, sd) {
      return jStat.lognormal.inv(probability, mean, sd);
    };

    Formula.MAX = function () {
      var range = Formula.FLATTEN(arguments);
      var n = range.length;
      var max = (n > 0) ? range[0] : 0;
      for (var i = 0; i < n; i++) {
        max = (range[i] > max && (range[i] !== true) && (range[i] !== false)) ? range[i] : max;
      }
      return max;
    };

    Formula.MAXA = function () {
      var range = Formula.FLATTEN(arguments);
      return (range.length > 0) ? Math.max.apply(Math, range) : 0;
    };

    Formula.MEDIAN = function () {
      return jStat.median(Formula.FLATTEN(arguments));
    };

    Formula.MIN = function () {
      var range = Formula.FLATTEN(arguments);
      var n = range.length;
      var min = (n > 0) ? range[0] : 0;
      for (var i = 0; i < n; i++) {
        min = (range[i] < min && (range[i] !== true) && (range[i] !== false)) ? range[i] : min;
      }
      return min;
    };

    Formula.MINA = function () {
      var range = Formula.FLATTEN(arguments);
      return (range.length > 0) ? Math.min.apply(Math, range) : 0;
    };

    Formula.MODEMULT = function () {
      // Credits: Roönaän
      var range = Formula.ARGSCONCAT(arguments),
        n = range.length,
        count = {},
        maxItems = [],
        max = 0,
        currentItem;
      for (var i = 0; i < n; i++) {
        currentItem = range[i];
        count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1;
        if (count[currentItem] > max) {
          max = count[currentItem];
          maxItems = [];
        }
        if (count[currentItem] === max) {
          maxItems[maxItems.length] = currentItem;
        }
      }
      return maxItems;
    };

    Formula.MODESNGL = function () {
      return Formula.MODEMULT(Formula.ARGSCONCAT(arguments)).sort(function (a, b) {
        return a - b;
      })[0];
    };

    Formula.NEGBINOMDIST = function (k, r, p, cumulative) {
      return (cumulative) ? jStat.negbin.cdf(k, r, p) : jStat.negbin.pdf(k, r, p);
    };

    Formula.NORMDIST = function (x, mean, sd, cumulative) {
      // Check parameters
      if (isNaN(x) || isNaN(mean) || isNaN(sd)) {
        return '#VALUE!';
      }
      if (sd <= 0) {
        return '#NUM!';
      }

      // Return normal distribution computed by jStat [http://jstat.org]
      return (cumulative) ? jStat.normal.cdf(x, mean, sd) : jStat.normal.pdf(x, mean, sd);
    };

    Formula.NORMINV = function (probability, mean, sd) {
      return jStat.normal.inv(probability, mean, sd);
    };

    Formula.NORMSDIST = function (z, cumulative) {
      return (cumulative) ? jStat.normal.cdf(z, 0, 1) : jStat.normal.pdf(z, 0, 1);
    };

    Formula.NORMSINV = function (probability) {
      return jStat.normal.inv(probability, 0, 1);
    };

    Formula.PEARSON = function (data_x, data_y) {
      var xmean = jStat.mean(data_x);
      var ymean = jStat.mean(data_y);
      var n = data_x.length;
      var num = 0;
      var den1 = 0;
      var den2 = 0;
      for (var i = 0; i < n; i++) {
        num += (data_x[i] - xmean) * (data_y[i] - ymean);
        den1 += Math.pow(data_x[i] - xmean, 2);
        den2 += Math.pow(data_y[i] - ymean, 2);
      }
      return num / Math.sqrt(den1 * den2);
    };

    Formula.PERCENTILEEXC = function (array, k) {
      array = array.sort(function (a, b) {
        {
          return a - b;
        }
      });
      var n = array.length;
      if (k < 1 / (n + 1) || k > 1 - 1 / (n + 1)) {
        return '#NUM!';
      }
      var l = k * (n + 1) - 1;
      var fl = Math.floor(l);
      return Formula.CLEANFLOAT((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
    };

    Formula.PERCENTILEINC = function (array, k) {
      array = array.sort(function (a, b) {
        return a - b;
      });
      var n = array.length;
      var l = k * (n - 1);
      var fl = Math.floor(l);
      return Formula.CLEANFLOAT((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
    };

    Formula.PERCENTRANKEXC = function (array, x, significance) {
      array = array.sort(function (a, b) {
        return a - b;
      });
      var uniques = _.uniq(array);
      var n = array.length;
      var m = uniques.length;
      significance = (typeof significance === 'undefined') ? 3 : significance;
      var power = Math.pow(10, significance);
      var result = 0;
      var match = false;
      var i = 0;
      while (!match && i < m) {
        if (x === uniques[i]) {
          result = (array.indexOf(uniques[i]) + 1) / (n + 1);
          match = true;
        } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
          result = (array.indexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n + 1);
          match = true;
        }
        i++;
      }
      return Math.floor(result * power) / power;
    };

    Formula.PERCENTRANKINC = function (array, x, significance) {
      array = array.sort(function (a, b) {
        return a - b;
      });
      var uniques = _.uniq(array);
      var n = array.length;
      var m = uniques.length;
      significance = (typeof significance === 'undefined') ? 3 : significance;
      var power = Math.pow(10, significance);
      var result = 0;
      var match = false;
      var i = 0;
      while (!match && i < m) {
        if (x === uniques[i]) {
          result = array.indexOf(uniques[i]) / (n - 1);
          match = true;
        } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
          result = (array.indexOf(uniques[i]) + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n - 1);
          match = true;
        }
        i++;
      }
      return Math.floor(result * power) / power;
    };

    Formula.PERMUT = function (number, number_chosen) {
      return Formula.FACT(number) / Formula.FACT(number - number_chosen);
    };

    Formula.PERMUTATIONA = function (number, number_chosen) {
      return Math.pow(number, number_chosen);
    };

    Formula.PHI = function (x) {
      return Math.exp(-0.5 * x * x) / SQRT2PI;
    };

    Formula.POISSONDIST = function (x, mean, cumulative) {
      return (cumulative) ? jStat.poisson.cdf(x, mean) : jStat.poisson.pdf(x, mean);
    };

    Formula.PROB = function (range, probability, lower, upper) {
      if (typeof lower === 'undefined') {
        return 0;
      }

      upper = (typeof upper === 'undefined') ? lower : upper;
      if (lower === upper) {
        return (range.indexOf(lower) >= 0) ? probability[range.indexOf(lower)] : 0;
      }

      var sorted = range.sort(function (a, b) {
        return a - b;
      });
      var n = sorted.length;
      var result = 0;
      for (var i = 0; i < n; i++) {
        if (sorted[i] >= lower && sorted[i] <= upper) {
          result += probability[range.indexOf(sorted[i])];
        }
      }
      return result;
    };

    Formula.QUARTILEEXC = function (range, quart) {
      switch (quart) {
        case 1:
          return Formula.PERCENTILEEXC(range, 0.25);
        case 2:
          return Formula.PERCENTILEEXC(range, 0.5);
        case 3:
          return Formula.PERCENTILEEXC(range, 0.75);
        default:
          return '#NUM!';
      }
    };

    Formula.QUARTILEINC = function (range, quart) {
      switch (quart) {
        case 1:
          return Formula.PERCENTILEINC(range, 0.25);
        case 2:
          return Formula.PERCENTILEINC(range, 0.5);
        case 3:
          return Formula.PERCENTILEINC(range, 0.75);
        default:
          return '#NUM!';
      }
    };

    Formula.RANKAVG = function (number, range, order) {
      order = (typeof order === 'undefined') ? false : order;
      var sort = (order) ? function (a, b) {
        return a - b;
      } : function (a, b) {
        return b - a;
      };
      range = range.sort(sort);
      var count = Formula.COUNTIN(range, number);
      return (count > 1) ? (2 * range.indexOf(number) + count + 1) / 2 : range.indexOf(number) + 1;
    };

    Formula.RANKEQ = function (number, range, order) {
      order = (typeof order === 'undefined') ? false : order;
      var sort = (order) ? function (a, b) {
        return a - b;
      } : function (a, b) {
        return b - a;
      };
      range = range.sort(sort);
      return range.indexOf(number) + 1;
    };

    Formula.RSQ = function (data_x, data_y) {
      return Math.pow(Formula.PEARSON(data_x, data_y), 2);
    };

    Formula.SKEW = function () {
      var range = Formula.ARGSCONCAT(arguments);
      var mean = jStat.mean(range);
      var n = range.length;
      var sigma = 0;
      for (var i = 0; i < n; i++) {
        sigma += Math.pow(range[i] - mean, 3);
      }
      return n * sigma / ((n - 1) * (n - 2) * Math.pow(jStat.stdev(range, true), 3));
    };

    Formula.SKEWP = function () {
      var range = Formula.ARGSCONCAT(arguments);
      var mean = jStat.mean(range);
      var n = range.length;
      var m2 = 0;
      var m3 = 0;
      for (var i = 0; i < n; i++) {
        m3 += Math.pow(range[i] - mean, 3);
        m2 += Math.pow(range[i] - mean, 2);
      }
      m3 = m3 / n;
      m2 = m2 / n;
      return m3 / Math.pow(m2, 3 / 2);
    };

    Formula.SLOPE = function (data_y, data_x) {
      var xmean = jStat.mean(data_x);
      var ymean = jStat.mean(data_y);
      var n = data_x.length;
      var num = 0;
      var den = 0;
      for (var i = 0; i < n; i++) {
        num += (data_x[i] - xmean) * (data_y[i] - ymean);
        den += Math.pow(data_x[i] - xmean, 2);
      }
      return num / den;
    };

    Formula.SMALL = function (array, k) {
      return array.sort(function (a, b) {
        return a - b;
      })[k - 1];
    };

    Formula.STANDARDIZE = function (x, mean, sd) {
      return (x - mean) / sd;
    };

    Formula.STDEVA = function () {
      var range = Formula.FLATTEN(arguments);
      var n = range.length;
      var sigma = 0;
      var mean = jStat.mean(range);
      for (var i = 0; i < n; i++) {
        sigma += Math.pow(range[i] - mean, 2);
      }
      return Math.sqrt(sigma / (n - 1));
    };

    Formula.STDEVP = function () {
      var range = Formula.FLATTEN(arguments);
      var n = range.length;
      var sigma = 0;
      var count = 0;
      var mean = Formula.AVERAGE(range);
      for (var i = 0; i < n; i++) {
        if (range[i] !== true && range[i] !== false) {
          sigma += Math.pow(range[i] - mean, 2);
          count++;
        }
      }
      return Math.sqrt(sigma / count);
    };

    Formula.STDEVPA = function () {
      var range = Formula.ARGSCONCAT(arguments);
      var n = range.length;
      var sigma = 0;
      var mean = jStat.mean(range);
      for (var i = 0; i < n; i++) {
        sigma += Math.pow(range[i] - mean, 2);
      }
      return Math.sqrt(sigma / n);
    };

    Formula.STDEVS = function () {
      var range = Formula.FLATTEN(arguments);
      var n = range.length;
      var sigma = 0;
      var count = 0;
      var mean = Formula.AVERAGE(range);
      for (var i = 0; i < n; i++) {
        if (range[i] !== true && range[i] !== false) {
          sigma += Math.pow(range[i] - mean, 2);
          count++;
        }
      }
      return Math.sqrt(sigma / (count - 1));
    };

    Formula.STEYX = function (data_y, data_x) {
      var xmean = jStat.mean(data_x);
      var ymean = jStat.mean(data_y);
      var n = data_x.length;
      var lft = 0;
      var num = 0;
      var den = 0;
      for (var i = 0; i < n; i++) {
        lft += Math.pow(data_y[i] - ymean, 2);
        num += (data_x[i] - xmean) * (data_y[i] - ymean);
        den += Math.pow(data_x[i] - xmean, 2);
      }
      return Math.sqrt((lft - num * num / den) / (n - 2));
    };

    Formula.TDIST = function (x, df, cumulative) {
      return (cumulative) ? jStat.studentt.cdf(x, df) : jStat.studentt.pdf(x, df);
    };

    //TODO
    Formula.TDIST2T = function () {
      return;
    };

    //TODO
    Formula.TDISTRT = function () {
      return;
    };

    //TODO
    Formula.TINV = function (probability, df) {
      return jStat.studentt.inv(probability, df);
    };

    //TODO
    Formula.TINV2T = function () {
      return;
    };

    //TODO
    Formula.TTEST = function () {
      return;
    };

    //TODO
    Formula.TREND = function () {
      return;
    };

    Formula.TRIMMEAN = function (range, percent) {
      range = Formula.FLATTEN(range);
      var trim = Formula.FLOOR(range.length * percent, 2) / 2;
      return jStat.mean(_.initial(_.rest(range.sort(function (a, b) {
        return a - b;
      }), trim), trim));
    };

    Formula.VARA = function () {
      var range = Formula.FLATTEN(arguments);
      var n = range.length;
      var sigma = 0;
      var count = 0;
      var mean = Formula.AVERAGEA(range);
      for (var i = 0; i < n; i++) {
        var el = range[i];
        if (typeof el === 'number') {
          sigma += Math.pow(el - mean, 2);
        } else if (el === true) {
          sigma += Math.pow(1 - mean, 2);
        } else {
          sigma += Math.pow(0 - mean, 2);
        }

        if (el !== null) {
          count++;
        }
      }
      return sigma / (count - 1);
    };

    Formula.VARP = function () {
      var range = Formula.NUMBERS(Formula.FLATTEN(arguments));
      var n = range.length;
      var sigma = 0;
      var count = 0;
      var mean = Formula.AVERAGE(range);
      for (var i = 0; i < n; i++) {
        sigma += Math.pow(range[i] - mean, 2);
        count++;
      }
      return sigma / count;
    };

    Formula.VARPA = function () {
      var range = Formula.FLATTEN(arguments);
      var n = range.length;
      var sigma = 0;
      var count = 0;
      var mean = Formula.AVERAGEA(range);
      for (var i = 0; i < n; i++) {
        var el = range[i];
        if (typeof el === 'number') {
          sigma += Math.pow(el - mean, 2);
        } else if (el === true) {
          sigma += Math.pow(1 - mean, 2);
        } else {
          sigma += Math.pow(0 - mean, 2);
        }

        if (el !== null) {
          count++;
        }
      }
      return sigma / count;
    };

    Formula.VARS = function () {
      var range = Formula.FLATTEN(arguments);
      var n = range.length;
      var sigma = 0;
      var count = 0;
      var mean = Formula.AVERAGE(range);
      for (var i = 0; i < n; i++) {
        if (range[i] !== true && range[i] !== false) {
          sigma += Math.pow(range[i] - mean, 2);
          count++;
        }
      }
      return sigma / (count - 1);
    };

    Formula.WEIBULLDIST = function (x, alpha, beta, cumulative) {
      return (cumulative) ? 1 - Math.exp(-Math.pow(x / beta, alpha)) : Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha / Math.pow(beta, alpha);
    };

    Formula.ZTEST = function (range, x, sigma) {
      var n = range.length;
      var sd = (typeof sigma === 'undefined') ? Formula.STDEVS(range) : sigma;
      return 1 - Formula.NORMSDIST((Formula.AVERAGE(range) - x) / (sd / Math.sqrt(n)), Formula.TRUE);
    };


    // Text functions

    Formula.CHAR = function (number) {
      return String.fromCharCode(number);
    };

    Formula.CLEAN = function (text) {
      return text.replace(/[\0-\x1F]/g, "");
    };

    Formula.CODE = function (text) {
      return text.charCodeAt(0);
    };

    Formula.CONCATENATE = function () {
      var string = '';
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== null && arguments[i] !== undefined) {
          string += arguments[i];
        }
      }

      return string;
    };

    Formula.DOLLAR = function (number, decimals) {
      decimals = (typeof decimals === 'undefined') ? 2 : decimals;
      var format = '';
      if (decimals <= 0) {
        number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
        format = '($0,0)';
      } else if (decimals > 0) {
        format = '($0,0.' + new Array(decimals + 1).join('0') + ')';
      }
      return numeral(number).format(format);
    };

    Formula.EXACT = function (text1, text2) {
      return text1 === text2;
    };

    Formula.FIND = function (find_text, within_text, position) {
      position = (typeof position === 'undefined') ? 0 : position;
      return within_text ? within_text.indexOf(find_text, position - 1) + 1 : null;
    };

    Formula.FIXED = function (number, decimals, no_commas) {
      decimals = (typeof decimals === 'undefined') ? 2 : decimals;
      no_commas = (typeof no_commas === 'undefined') ? false : no_commas;
      var format = no_commas ? '0' : '0,0';
      if (decimals <= 0) {
        number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
      } else if (decimals > 0) {
        format += '.' + new Array(decimals + 1).join('0');
      }
      return numeral(number).format(format);
    };

    Formula.HTML2TEXT = function (value) {
      var result = '';

      if (value) {
        if (value instanceof Array) {
          value.forEach(function (line) {
            if (result !== '') {
              result += '\n';
            }
            result += (line.replace(/<(?:.|\n)*?>/gm, ''));
          });
        } else {
          result = value.replace(/<(?:.|\n)*?>/gm, '');
        }
      }

      return result;
    };

    Formula.HUMANIZE = function (value) {
      if (value instanceof Date) {
        var dvalue = moment(value);
        if (dvalue.hours() || dvalue.minutes() || dvalue.seconds()) {
          return dvalue.format("dddd, MMMM Do YYYY, h:mm:ss");
        } else {
          return dvalue.format("dddd, MMMM Do YYYY");
        }
      }

      return value;
    };

    Formula.JOIN = function (array, separator) {
      return array.join(separator);
    };

    Formula.LEFT = function (text, number) {
      number = (typeof number === 'undefined') ? 1 : number;
      return text ? text.substring(0, number) : null;
    };

    Formula.LEN = function (text) {
      return text ? text.length : 0;
    };

    Formula.LOWER = function (text) {
      return text ? text.toLowerCase() : text;
    };

    Formula.MID = function (text, start, number) {
      return text.substring(start - 1, number);
    };

    Formula.NUMBERVALUE = function (text, decimal_separator, group_separator) {
      decimal_separator = (typeof decimal_separator === 'undefined') ? '.' : decimal_separator;
      group_separator = (typeof group_separator === 'undefined') ? ',' : group_separator;
      return Number(text.replace(decimal_separator, '.').replace(group_separator, ''));
    };

    Formula.NUMBERS = function () {
      var possibleNumbers = Formula.FLATTEN(arguments);
      return possibleNumbers.filter(function (el) {
        return typeof el === 'number';
      });
    };

    Formula.PROPER = function (text) {
      if (!text) { return; }
      return text.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

    Formula.REGEXEXTRACT = function (text, regular_expression) {
      var match = text.match(new RegExp(regular_expression));
      return match ? (match[match.length > 1 ? match.length - 1 : 0]) : null;
    };

    Formula.REGEXMATCH = function (text, regular_expression, full) {
      var match = text.match(new RegExp(regular_expression));
      return full ? match : !!match;
    };

    Formula.REGEXREPLACE = function (text, regular_expression, replacement) {
      return text.replace(new RegExp(regular_expression), replacement);
    };

    Formula.REPLACE = function (text, position, length, new_text) {
      return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length);
    };

    Formula.REPT = function (text, number) {
      return new Array(number + 1).join(text);
    };

    Formula.RIGHT = function (text, number) {
      number = (typeof number === 'undefined') ? 1 : number;
      return text ? text.substring(text.length - number) : null;
    };

    Formula.ROMAN = function (number) {
      // The MIT License
      // Copyright (c) 2008 Steven Levithan
      var digits = String(number).split('');
      var key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
      var roman = '';
      var i = 3;
      while (i--) {
        roman = (key[+digits.pop() + (i * 10)] || '') + roman;
      }
      return new Array(+digits.join('') + 1).join('M') + roman;
    };

    Formula.SEARCH = function (find_text, within_text, position) {
      position = (typeof position === 'undefined') ? 0 : position;
      return within_text.toLowerCase().indexOf(find_text.toLowerCase(), position - 1) + 1;
    };

    Formula.SPLIT = function (text, separator) {
      return _s.words(text, separator);
    };

    Formula.SUBSTITUTE = function (text, old_text, new_text, occurrence) {
      if (!text || !old_text || !new_text) {
        return text;
      } else if (typeof occurrence === 'undefined') {
        return text.replace(new RegExp(old_text, 'g'), new_text);
      } else {
        var index = 0;
        var i = 0;
        while (text.indexOf(old_text, index) > 0) {
          index = text.indexOf(old_text, index + 1);
          i++;
          if (i === occurrence) {
            return text.substring(0, index) + new_text + text.substring(index + old_text.length);
          }
        }
      }
    };

    Formula.T = function (value) {
      return (typeof value === "string") ? value : null;
    };

    Formula.TEXT = function (value, format) {
      if (!value) {
        return '';
      }

      if (value instanceof Object) {
        try {
          return JSON.stringify(value);
        } catch (err) {
          // ignore
          return '';
        }
      }

      if (typeof value === 'string') {
        if (!format) { return value; }
        return (format.indexOf('0') >= 0) ? numeral(value).format(format) : moment(new Date(value)).format(format);
      }

      if (value.toString && typeof value.toString === 'function') {
        return value.toString();
      }

      return '';
    };

    Formula.TRIM = function (text) {
      return _s.clean(text);
    };

    Formula.UNICHAR = Formula.CHAR;

    Formula.UNICODE = Formula.CODE;

    Formula.UPPER = function (text) {
      return text.toUpperCase();
    };

    Formula.VALUE = function (text) {
      return numeral().unformat(text);
    };

    // Hashing function
    Formula.MD5 = function (data, key, raw) {
      return md5(data, key, raw);
    };

    Formula.NUMERAL = function (number, format) {
      return numeral(number).format(format);
    };

    // Excel Error Handling
    Formula.ISERR = function (value) {
      return (['#DIV/0!', '#NAME?', '#NUM!', '#NULL!', '#REF!', '#VALUE!'].indexOf(value) >= 0 ) ? true : false;
    };

    Formula.ISERROR = function (value) {
      return Formula.ISERR(value) || value === '#N/A';
    };

    Formula.IFERROR = function (value, valueIfError) {
      if (Formula.ISERROR(value)) {
        return valueIfError;
      }

      return value;
    };
    return Formula;
  }
}).call(this);

