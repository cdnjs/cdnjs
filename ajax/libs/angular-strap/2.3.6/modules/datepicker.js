/**
 * angular-strap
 * @version v2.3.6 - 2015-11-14
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.datepicker', [ 'mgcrea.ngStrap.helpers.dateParser', 'mgcrea.ngStrap.helpers.dateFormatter', 'mgcrea.ngStrap.tooltip' ]).provider('$datepicker', function() {
  var defaults = this.defaults = {
    animation: 'am-fade',
    prefixClass: 'datepicker',
    placement: 'bottom-left',
    templateUrl: 'datepicker/datepicker.tpl.html',
    trigger: 'focus',
    container: false,
    keyboard: true,
    html: false,
    delay: 0,
    useNative: false,
    dateType: 'date',
    dateFormat: 'shortDate',
    timezone: null,
    modelDateFormat: null,
    dayFormat: 'dd',
    monthFormat: 'MMM',
    yearFormat: 'yyyy',
    monthTitleFormat: 'MMMM yyyy',
    yearTitleFormat: 'yyyy',
    strictFormat: false,
    autoclose: false,
    minDate: -Infinity,
    maxDate: +Infinity,
    startView: 0,
    minView: 0,
    startWeek: 0,
    daysOfWeekDisabled: '',
    iconLeft: 'glyphicon glyphicon-chevron-left',
    iconRight: 'glyphicon glyphicon-chevron-right'
  };
  this.$get = [ '$window', '$document', '$rootScope', '$sce', '$dateFormatter', 'datepickerViews', '$tooltip', '$timeout', function($window, $document, $rootScope, $sce, $dateFormatter, datepickerViews, $tooltip, $timeout) {
    var isNative = /(ip(a|o)d|iphone|android)/gi.test($window.navigator.userAgent);
    var isTouch = 'createTouch' in $window.document && isNative;
    if (!defaults.lang) defaults.lang = $dateFormatter.getDefaultLocale();
    function DatepickerFactory(element, controller, config) {
      var $datepicker = $tooltip(element, angular.extend({}, defaults, config));
      var parentScope = config.scope;
      var options = $datepicker.$options;
      var scope = $datepicker.$scope;
      if (options.startView) options.startView -= options.minView;
      var pickerViews = datepickerViews($datepicker);
      $datepicker.$views = pickerViews.views;
      var viewDate = pickerViews.viewDate;
      scope.$mode = options.startView;
      scope.$iconLeft = options.iconLeft;
      scope.$iconRight = options.iconRight;
      var $picker = $datepicker.$views[scope.$mode];
      scope.$select = function(date) {
        $datepicker.select(date);
      };
      scope.$selectPane = function(value) {
        $datepicker.$selectPane(value);
      };
      scope.$toggleMode = function() {
        $datepicker.setMode((scope.$mode + 1) % $datepicker.$views.length);
      };
      $datepicker.update = function(date) {
        if (angular.isDate(date) && !isNaN(date.getTime())) {
          $datepicker.$date = date;
          $picker.update.call($picker, date);
        }
        $datepicker.$build(true);
      };
      $datepicker.updateDisabledDates = function(dateRanges) {
        options.disabledDateRanges = dateRanges;
        for (var i = 0, l = scope.rows.length; i < l; i++) {
          angular.forEach(scope.rows[i], $datepicker.$setDisabledEl);
        }
      };
      $datepicker.select = function(date, keep) {
        if (!angular.isDate(controller.$dateValue)) controller.$dateValue = new Date(date);
        if (!scope.$mode || keep) {
          controller.$setViewValue(angular.copy(date));
          controller.$render();
          if (options.autoclose && !keep) {
            $timeout(function() {
              $datepicker.hide(true);
            });
          }
        } else {
          angular.extend(viewDate, {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate()
          });
          $datepicker.setMode(scope.$mode - 1);
          $datepicker.$build();
        }
      };
      $datepicker.setMode = function(mode) {
        scope.$mode = mode;
        $picker = $datepicker.$views[scope.$mode];
        $datepicker.$build();
      };
      $datepicker.$build = function(pristine) {
        if (pristine === true && $picker.built) return;
        if (pristine === false && !$picker.built) return;
        $picker.build.call($picker);
      };
      $datepicker.$updateSelected = function() {
        for (var i = 0, l = scope.rows.length; i < l; i++) {
          angular.forEach(scope.rows[i], updateSelected);
        }
      };
      $datepicker.$isSelected = function(date) {
        return $picker.isSelected(date);
      };
      $datepicker.$setDisabledEl = function(el) {
        el.disabled = $picker.isDisabled(el.date);
      };
      $datepicker.$selectPane = function(value) {
        var steps = $picker.steps;
        var targetDate = new Date(Date.UTC(viewDate.year + (steps.year || 0) * value, viewDate.month + (steps.month || 0) * value, 1));
        angular.extend(viewDate, {
          year: targetDate.getUTCFullYear(),
          month: targetDate.getUTCMonth(),
          date: targetDate.getUTCDate()
        });
        $datepicker.$build();
      };
      $datepicker.$onMouseDown = function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (isTouch) {
          var targetEl = angular.element(evt.target);
          if (targetEl[0].nodeName.toLowerCase() !== 'button') {
            targetEl = targetEl.parent();
          }
          targetEl.triggerHandler('click');
        }
      };
      $datepicker.$onKeyDown = function(evt) {
        if (!/(38|37|39|40|13)/.test(evt.keyCode) || evt.shiftKey || evt.altKey) return;
        evt.preventDefault();
        evt.stopPropagation();
        if (evt.keyCode === 13) {
          if (!scope.$mode) {
            $datepicker.hide(true);
          } else {
            scope.$apply(function() {
              $datepicker.setMode(scope.$mode - 1);
            });
          }
          return;
        }
        $picker.onKeyDown(evt);
        parentScope.$digest();
      };
      function updateSelected(el) {
        el.selected = $datepicker.$isSelected(el.date);
      }
      function focusElement() {
        element[0].focus();
      }
      var _init = $datepicker.init;
      $datepicker.init = function() {
        if (isNative && options.useNative) {
          element.prop('type', 'date');
          element.css('-webkit-appearance', 'textfield');
          return;
        } else if (isTouch) {
          element.prop('type', 'text');
          element.attr('readonly', 'true');
          element.on('click', focusElement);
        }
        _init();
      };
      var _destroy = $datepicker.destroy;
      $datepicker.destroy = function() {
        if (isNative && options.useNative) {
          element.off('click', focusElement);
        }
        _destroy();
      };
      var _show = $datepicker.show;
      $datepicker.show = function() {
        if (!isTouch && element.attr('readonly') || element.attr('disabled')) return;
        _show();
        $timeout(function() {
          if (!$datepicker.$isShown) return;
          $datepicker.$element.on(isTouch ? 'touchstart' : 'mousedown', $datepicker.$onMouseDown);
          if (options.keyboard) {
            element.on('keydown', $datepicker.$onKeyDown);
          }
        }, 0, false);
      };
      var _hide = $datepicker.hide;
      $datepicker.hide = function(blur) {
        if (!$datepicker.$isShown) return;
        $datepicker.$element.off(isTouch ? 'touchstart' : 'mousedown', $datepicker.$onMouseDown);
        if (options.keyboard) {
          element.off('keydown', $datepicker.$onKeyDown);
        }
        _hide(blur);
      };
      return $datepicker;
    }
    DatepickerFactory.defaults = defaults;
    return DatepickerFactory;
  } ];
}).directive('bsDatepicker', [ '$window', '$parse', '$q', '$dateFormatter', '$dateParser', '$datepicker', function($window, $parse, $q, $dateFormatter, $dateParser, $datepicker) {
  var defaults = $datepicker.defaults;
  var isNative = /(ip(a|o)d|iphone|android)/gi.test($window.navigator.userAgent);
  return {
    restrict: 'EAC',
    require: 'ngModel',
    link: function postLink(scope, element, attr, controller) {
      var options = {
        scope: scope
      };
      angular.forEach([ 'template', 'templateUrl', 'controller', 'controllerAs', 'placement', 'container', 'delay', 'trigger', 'html', 'animation', 'autoclose', 'dateType', 'dateFormat', 'timezone', 'modelDateFormat', 'dayFormat', 'strictFormat', 'startWeek', 'startDate', 'useNative', 'lang', 'startView', 'minView', 'iconLeft', 'iconRight', 'daysOfWeekDisabled', 'id', 'prefixClass', 'prefixEvent' ], function(key) {
        if (angular.isDefined(attr[key])) options[key] = attr[key];
      });
      var falseValueRegExp = /^(false|0|)$/i;
      angular.forEach([ 'html', 'container', 'autoclose', 'useNative' ], function(key) {
        if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) {
          options[key] = false;
        }
      });
      var datepicker = $datepicker(element, controller, options);
      options = datepicker.$options;
      if (isNative && options.useNative) options.dateFormat = 'yyyy-MM-dd';
      var lang = options.lang;
      var formatDate = function(date, format) {
        return $dateFormatter.formatDate(date, format, lang);
      };
      var dateParser = $dateParser({
        format: options.dateFormat,
        lang: lang,
        strict: options.strictFormat
      });
      attr.bsShow && scope.$watch(attr.bsShow, function(newValue, oldValue) {
        if (!datepicker || !angular.isDefined(newValue)) return;
        if (angular.isString(newValue)) newValue = !!newValue.match(/true|,?(datepicker),?/i);
        newValue === true ? datepicker.show() : datepicker.hide();
      });
      angular.forEach([ 'minDate', 'maxDate' ], function(key) {
        angular.isDefined(attr[key]) && attr.$observe(key, function(newValue) {
          datepicker.$options[key] = dateParser.getDateForAttribute(key, newValue);
          !isNaN(datepicker.$options[key]) && datepicker.$build(false);
          validateAgainstMinMaxDate(controller.$dateValue);
        });
      });
      angular.isDefined(attr.dateFormat) && attr.$observe('dateFormat', function(newValue) {
        datepicker.$options.dateFormat = newValue;
      });
      scope.$watch(attr.ngModel, function(newValue, oldValue) {
        datepicker.update(controller.$dateValue);
      }, true);
      function normalizeDateRanges(ranges) {
        if (!ranges || !ranges.length) return null;
        return ranges;
      }
      if (angular.isDefined(attr.disabledDates)) {
        scope.$watch(attr.disabledDates, function(disabledRanges, previousValue) {
          disabledRanges = normalizeDateRanges(disabledRanges);
          previousValue = normalizeDateRanges(previousValue);
          if (disabledRanges) {
            datepicker.updateDisabledDates(disabledRanges);
          }
        });
      }
      function validateAgainstMinMaxDate(parsedDate) {
        if (!angular.isDate(parsedDate)) return;
        var isMinValid = isNaN(datepicker.$options.minDate) || parsedDate.getTime() >= datepicker.$options.minDate;
        var isMaxValid = isNaN(datepicker.$options.maxDate) || parsedDate.getTime() <= datepicker.$options.maxDate;
        var isValid = isMinValid && isMaxValid;
        controller.$setValidity('date', isValid);
        controller.$setValidity('min', isMinValid);
        controller.$setValidity('max', isMaxValid);
        if (isValid) controller.$dateValue = parsedDate;
      }
      controller.$parsers.unshift(function(viewValue) {
        var date;
        if (!viewValue) {
          controller.$setValidity('date', true);
          return null;
        }
        var parsedDate = dateParser.parse(viewValue, controller.$dateValue);
        if (!parsedDate || isNaN(parsedDate.getTime())) {
          controller.$setValidity('date', false);
          return;
        } else {
          validateAgainstMinMaxDate(parsedDate);
        }
        if (options.dateType === 'string') {
          date = dateParser.timezoneOffsetAdjust(parsedDate, options.timezone, true);
          return formatDate(date, options.modelDateFormat || options.dateFormat);
        }
        date = dateParser.timezoneOffsetAdjust(controller.$dateValue, options.timezone, true);
        if (options.dateType === 'number') {
          return date.getTime();
        } else if (options.dateType === 'unix') {
          return date.getTime() / 1e3;
        } else if (options.dateType === 'iso') {
          return date.toISOString();
        } else {
          return new Date(date);
        }
      });
      controller.$formatters.push(function(modelValue) {
        var date;
        if (angular.isUndefined(modelValue) || modelValue === null) {
          date = NaN;
        } else if (angular.isDate(modelValue)) {
          date = modelValue;
        } else if (options.dateType === 'string') {
          date = dateParser.parse(modelValue, null, options.modelDateFormat);
        } else if (options.dateType === 'unix') {
          date = new Date(modelValue * 1e3);
        } else {
          date = new Date(modelValue);
        }
        controller.$dateValue = dateParser.timezoneOffsetAdjust(date, options.timezone);
        return getDateFormattedString();
      });
      controller.$render = function() {
        element.val(getDateFormattedString());
      };
      function getDateFormattedString() {
        return !controller.$dateValue || isNaN(controller.$dateValue.getTime()) ? '' : formatDate(controller.$dateValue, options.dateFormat);
      }
      scope.$on('$destroy', function() {
        if (datepicker) datepicker.destroy();
        options = null;
        datepicker = null;
      });
    }
  };
} ]).provider('datepickerViews', function() {
  var defaults = this.defaults = {
    dayFormat: 'dd',
    daySplit: 7
  };
  function split(arr, size) {
    var arrays = [];
    while (arr.length > 0) {
      arrays.push(arr.splice(0, size));
    }
    return arrays;
  }
  function mod(n, m) {
    return (n % m + m) % m;
  }
  this.$get = [ '$dateFormatter', '$dateParser', '$sce', function($dateFormatter, $dateParser, $sce) {
    return function(picker) {
      var scope = picker.$scope;
      var options = picker.$options;
      var lang = options.lang;
      var formatDate = function(date, format) {
        return $dateFormatter.formatDate(date, format, lang);
      };
      var dateParser = $dateParser({
        format: options.dateFormat,
        lang: lang,
        strict: options.strictFormat
      });
      var weekDaysMin = $dateFormatter.weekdaysShort(lang);
      var weekDaysLabels = weekDaysMin.slice(options.startWeek).concat(weekDaysMin.slice(0, options.startWeek));
      var weekDaysLabelsHtml = $sce.trustAsHtml('<th class="dow text-center">' + weekDaysLabels.join('</th><th class="dow text-center">') + '</th>');
      var startDate = picker.$date || (options.startDate ? dateParser.getDateForAttribute('startDate', options.startDate) : new Date());
      var viewDate = {
        year: startDate.getFullYear(),
        month: startDate.getMonth(),
        date: startDate.getDate()
      };
      var views = [ {
        format: options.dayFormat,
        split: 7,
        steps: {
          month: 1
        },
        update: function(date, force) {
          if (!this.built || force || date.getFullYear() !== viewDate.year || date.getMonth() !== viewDate.month) {
            angular.extend(viewDate, {
              year: picker.$date.getFullYear(),
              month: picker.$date.getMonth(),
              date: picker.$date.getDate()
            });
            picker.$build();
          } else if (date.getDate() !== viewDate.date || date.getDate() === 1) {
            viewDate.date = picker.$date.getDate();
            picker.$updateSelected();
          }
        },
        build: function() {
          var firstDayOfMonth = new Date(viewDate.year, viewDate.month, 1), firstDayOfMonthOffset = firstDayOfMonth.getTimezoneOffset();
          var firstDate = new Date(+firstDayOfMonth - mod(firstDayOfMonth.getDay() - options.startWeek, 7) * 864e5), firstDateOffset = firstDate.getTimezoneOffset();
          var today = dateParser.timezoneOffsetAdjust(new Date(), options.timezone).toDateString();
          if (firstDateOffset !== firstDayOfMonthOffset) firstDate = new Date(+firstDate + (firstDateOffset - firstDayOfMonthOffset) * 6e4);
          var days = [], day;
          for (var i = 0; i < 42; i++) {
            day = dateParser.daylightSavingAdjust(new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + i));
            days.push({
              date: day,
              isToday: day.toDateString() === today,
              label: formatDate(day, this.format),
              selected: picker.$date && this.isSelected(day),
              muted: day.getMonth() !== viewDate.month,
              disabled: this.isDisabled(day)
            });
          }
          scope.title = formatDate(firstDayOfMonth, options.monthTitleFormat);
          scope.showLabels = true;
          scope.labels = weekDaysLabelsHtml;
          scope.rows = split(days, this.split);
          this.built = true;
        },
        isSelected: function(date) {
          return picker.$date && date.getFullYear() === picker.$date.getFullYear() && date.getMonth() === picker.$date.getMonth() && date.getDate() === picker.$date.getDate();
        },
        isDisabled: function(date) {
          var time = date.getTime();
          if (time < options.minDate || time > options.maxDate) return true;
          if (options.daysOfWeekDisabled.indexOf(date.getDay()) !== -1) return true;
          if (options.disabledDateRanges) {
            for (var i = 0; i < options.disabledDateRanges.length; i++) {
              if (time >= options.disabledDateRanges[i].start && time <= options.disabledDateRanges[i].end) {
                return true;
              }
            }
          }
          return false;
        },
        onKeyDown: function(evt) {
          if (!picker.$date) {
            return;
          }
          var actualTime = picker.$date.getTime();
          var newDate;
          if (evt.keyCode === 37) newDate = new Date(actualTime - 1 * 864e5); else if (evt.keyCode === 38) newDate = new Date(actualTime - 7 * 864e5); else if (evt.keyCode === 39) newDate = new Date(actualTime + 1 * 864e5); else if (evt.keyCode === 40) newDate = new Date(actualTime + 7 * 864e5);
          if (!this.isDisabled(newDate)) picker.select(newDate, true);
        }
      }, {
        name: 'month',
        format: options.monthFormat,
        split: 4,
        steps: {
          year: 1
        },
        update: function(date, force) {
          if (!this.built || date.getFullYear() !== viewDate.year) {
            angular.extend(viewDate, {
              year: picker.$date.getFullYear(),
              month: picker.$date.getMonth(),
              date: picker.$date.getDate()
            });
            picker.$build();
          } else if (date.getMonth() !== viewDate.month) {
            angular.extend(viewDate, {
              month: picker.$date.getMonth(),
              date: picker.$date.getDate()
            });
            picker.$updateSelected();
          }
        },
        build: function() {
          var firstMonth = new Date(viewDate.year, 0, 1);
          var months = [], month;
          for (var i = 0; i < 12; i++) {
            month = new Date(viewDate.year, i, 1);
            months.push({
              date: month,
              label: formatDate(month, this.format),
              selected: picker.$isSelected(month),
              disabled: this.isDisabled(month)
            });
          }
          scope.title = formatDate(month, options.yearTitleFormat);
          scope.showLabels = false;
          scope.rows = split(months, this.split);
          this.built = true;
        },
        isSelected: function(date) {
          return picker.$date && date.getFullYear() === picker.$date.getFullYear() && date.getMonth() === picker.$date.getMonth();
        },
        isDisabled: function(date) {
          var lastDate = +new Date(date.getFullYear(), date.getMonth() + 1, 0);
          return lastDate < options.minDate || date.getTime() > options.maxDate;
        },
        onKeyDown: function(evt) {
          if (!picker.$date) {
            return;
          }
          var actualMonth = picker.$date.getMonth();
          var newDate = new Date(picker.$date);
          if (evt.keyCode === 37) newDate.setMonth(actualMonth - 1); else if (evt.keyCode === 38) newDate.setMonth(actualMonth - 4); else if (evt.keyCode === 39) newDate.setMonth(actualMonth + 1); else if (evt.keyCode === 40) newDate.setMonth(actualMonth + 4);
          if (!this.isDisabled(newDate)) picker.select(newDate, true);
        }
      }, {
        name: 'year',
        format: options.yearFormat,
        split: 4,
        steps: {
          year: 12
        },
        update: function(date, force) {
          if (!this.built || force || parseInt(date.getFullYear() / 20, 10) !== parseInt(viewDate.year / 20, 10)) {
            angular.extend(viewDate, {
              year: picker.$date.getFullYear(),
              month: picker.$date.getMonth(),
              date: picker.$date.getDate()
            });
            picker.$build();
          } else if (date.getFullYear() !== viewDate.year) {
            angular.extend(viewDate, {
              year: picker.$date.getFullYear(),
              month: picker.$date.getMonth(),
              date: picker.$date.getDate()
            });
            picker.$updateSelected();
          }
        },
        build: function() {
          var firstYear = viewDate.year - viewDate.year % (this.split * 3);
          var years = [], year;
          for (var i = 0; i < 12; i++) {
            year = new Date(firstYear + i, 0, 1);
            years.push({
              date: year,
              label: formatDate(year, this.format),
              selected: picker.$isSelected(year),
              disabled: this.isDisabled(year)
            });
          }
          scope.title = years[0].label + '-' + years[years.length - 1].label;
          scope.showLabels = false;
          scope.rows = split(years, this.split);
          this.built = true;
        },
        isSelected: function(date) {
          return picker.$date && date.getFullYear() === picker.$date.getFullYear();
        },
        isDisabled: function(date) {
          var lastDate = +new Date(date.getFullYear() + 1, 0, 0);
          return lastDate < options.minDate || date.getTime() > options.maxDate;
        },
        onKeyDown: function(evt) {
          if (!picker.$date) {
            return;
          }
          var actualYear = picker.$date.getFullYear(), newDate = new Date(picker.$date);
          if (evt.keyCode === 37) newDate.setYear(actualYear - 1); else if (evt.keyCode === 38) newDate.setYear(actualYear - 4); else if (evt.keyCode === 39) newDate.setYear(actualYear + 1); else if (evt.keyCode === 40) newDate.setYear(actualYear + 4);
          if (!this.isDisabled(newDate)) picker.select(newDate, true);
        }
      } ];
      return {
        views: options.minView ? Array.prototype.slice.call(views, options.minView) : views,
        viewDate: viewDate
      };
    };
  } ];
});