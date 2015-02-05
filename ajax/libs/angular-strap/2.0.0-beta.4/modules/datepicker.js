/**
 * angular-strap
 * @version v2.0.0-beta.4 - 2014-01-20
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.datepicker', ['mgcrea.ngStrap.tooltip']).provider('$datepicker', function () {
  var defaults = this.defaults = {
      animation: 'animation-fade',
      prefixClass: 'datepicker',
      placement: 'bottom-left',
      template: 'datepicker/datepicker.tpl.html',
      trigger: 'focus',
      container: false,
      keyboard: true,
      html: false,
      delay: 0,
      dateType: 'date',
      dateFormat: 'shortDate',
      autoclose: false,
      minDate: -Infinity,
      maxDate: +Infinity,
      startView: 0,
      minView: 0,
      weekStart: 0
    };
  this.$get = [
    '$window',
    '$document',
    '$rootScope',
    '$sce',
    '$locale',
    'dateFilter',
    'datepickerViews',
    '$tooltip',
    function ($window, $document, $rootScope, $sce, $locale, dateFilter, datepickerViews, $tooltip) {
      var bodyEl = angular.element($window.document.body);
      var isTouch = 'createTouch' in $window.document;
      if (!defaults.lang)
        defaults.lang = $locale.id;
      function DatepickerFactory(element, controller, config) {
        var $datepicker = $tooltip(element, angular.extend({}, defaults, config));
        var parentScope = config.scope;
        var options = $datepicker.$options;
        var scope = $datepicker.$scope;
        var pickerViews = datepickerViews($datepicker);
        $datepicker.$views = pickerViews.views;
        var viewDate = pickerViews.viewDate;
        $datepicker.$mode = options.startView;
        var $picker = $datepicker.$views[$datepicker.$mode];
        scope.$select = function (date) {
          $datepicker.select(date);
        };
        scope.$selectPane = function (value) {
          $datepicker.$selectPane(value);
        };
        scope.$toggleMode = function () {
          $datepicker.setMode(($datepicker.$mode + 1) % $datepicker.$views.length);
        };
        $datepicker.update = function (date) {
          if (!isNaN(date.getTime())) {
            var firstBuild = angular.isUndefined($datepicker.$date);
            $datepicker.$date = date;
            $picker.update.call($picker, date, firstBuild);
          }
        };
        $datepicker.select = function (date, keepMode) {
          if (!angular.isDate(date))
            date = new Date(date);
          if (!$datepicker.$mode || keepMode) {
            controller.$setViewValue(date);
            controller.$render();
            if (options.autoclose && !keepMode) {
              options.trigger === 'focus' ? element[0].blur() : $datepicker.hide();
            }
          } else {
            angular.extend(viewDate, {
              year: date.getUTCFullYear(),
              month: date.getUTCMonth(),
              date: date.getUTCDate()
            });
            $datepicker.setMode($datepicker.$mode - 1);
            $datepicker.$build();
          }
        };
        $datepicker.setMode = function (mode) {
          $datepicker.$mode = mode;
          $picker = $datepicker.$views[$datepicker.$mode];
          $datepicker.$build();
        };
        $datepicker.$build = function () {
          $picker.build.call($picker);
        };
        $datepicker.$updateSelected = function () {
          for (var i = 0, l = scope.rows.length; i < l; i++) {
            angular.forEach(scope.rows[i], updateSelected);
          }
        };
        $datepicker.$isSelected = function (date) {
          return $picker.isSelected(date);
        };
        $datepicker.$selectPane = function (value) {
          var steps = $picker.steps;
          var targetDate = new Date(Date.UTC(viewDate.year + (steps.year || 0) * value, viewDate.month + (steps.month || 0) * value, viewDate.date + (steps.day || 0) * value));
          angular.extend(viewDate, {
            year: targetDate.getUTCFullYear(),
            month: targetDate.getUTCMonth(),
            date: targetDate.getUTCDate()
          });
          $datepicker.$build();
        };
        $datepicker.$onMouseDown = function (evt) {
          evt.preventDefault();
          evt.stopPropagation();
          if (isTouch) {
            var targetEl = angular.element(evt.target);
            targetEl.triggerHandler('click');
          }
        };
        $datepicker.$onKeyDown = function (evt) {
          if (!/(38|37|39|40|13)/.test(evt.keyCode))
            return;
          evt.preventDefault();
          evt.stopPropagation();
          if (evt.keyCode === 13) {
            if (!$datepicker.$mode) {
              return options.trigger === 'focus' ? element[0].blur() : $datepicker.hide();
            } else {
              return scope.$apply(function () {
                $datepicker.setMode($datepicker.$mode - 1);
              });
            }
          }
          $picker.onKeyDown(evt);
          parentScope.$digest();
        };
        function updateSelected(el) {
          el.selected = $datepicker.$isSelected(el.date);
        }
        var _init = $datepicker.init;
        $datepicker.init = function () {
          if (controller.$dateValue) {
            $datepicker.$date = controller.$dateValue;
            $datepicker.$build();
          }
          _init();
        };
        var _show = $datepicker.show;
        $datepicker.show = function () {
          _show();
          setTimeout(function () {
            $datepicker.$element.on(isTouch ? 'touchstart' : 'mousedown', $datepicker.$onMouseDown);
            if (options.keyboard) {
              element.on('keydown', $datepicker.$onKeyDown);
            }
          });
        };
        var _hide = $datepicker.hide;
        $datepicker.hide = function () {
          $datepicker.$element.off(isTouch ? 'touchstart' : 'mousedown', $datepicker.$onMouseDown);
          if (options.keyboard) {
            element.off('keydown', $datepicker.$onKeyDown);
          }
          _hide();
        };
        return $datepicker;
      }
      DatepickerFactory.defaults = defaults;
      return DatepickerFactory;
    }
  ];
}).provider('$dateParser', [
  '$localeProvider',
  function ($localeProvider) {
    var proto = Date.prototype;
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    var defaults = this.defaults = { format: 'shortDate' };
    this.$get = [
      '$locale',
      function ($locale) {
        if (!defaults.lang)
          defaults.lang = $locale.id;
        var DateParserFactory = function (options) {
          var $dateParser = {};
          window.$locale = $locale;
          var regExpMap = {
              '/': '[\\/]',
              '-': '[-]',
              '.': '[.]',
              ' ': '[\\s]',
              'EEEE': '((?:' + $locale.DATETIME_FORMATS.DAY.join('|') + '))',
              'EEE': '((?:' + $locale.DATETIME_FORMATS.SHORTDAY.join('|') + '))',
              'dd': '((?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1})))',
              'd': '((?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1})))',
              'MMMM': '((?:' + $locale.DATETIME_FORMATS.MONTH.join('|') + '))',
              'MMM': '((?:' + $locale.DATETIME_FORMATS.SHORTMONTH.join('|') + '))',
              'MM': '((?:[0]?[1-9]|[1][012]))',
              'M': '((?:[0]?[1-9]|[1][012]))',
              'yyyy': '((?:(?:[1]{1}[0-9]{1}[0-9]{1}[0-9]{1})|(?:[2]{1}[0-9]{3}))(?![[0-9]]))',
              'yy': '((?:(?:[0-9]{1}[0-9]{1}))(?![[0-9]]))'
            };
          var setFnMap = {
              'dd': proto.setUTCDate,
              'd': proto.setUTCDate,
              'MMMM': function (value) {
                return this.setUTCMonth($locale.DATETIME_FORMATS.MONTH.indexOf(value));
              },
              'MMM': function (value) {
                return this.setUTCMonth($locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value));
              },
              'MM': function (value) {
                return this.setUTCMonth(1 * value - 1);
              },
              'M': function (value) {
                return this.setUTCMonth(1 * value - 1);
              },
              'yyyy': proto.setUTCFullYear,
              'yy': function (value) {
                return this.setUTCFullYear(2000 + 1 * value);
              },
              'y': proto.setUTCFullYear
            };
          var regex, setMap;
          $dateParser.init = function () {
            $dateParser.$format = $locale.DATETIME_FORMATS[options.format] || options.format;
            regex = regExpForFormat($dateParser.$format);
            setMap = setMapForFormat($dateParser.$format);
          };
          $dateParser.isValid = function (date) {
            if (angular.isDate(date))
              return !isNaN(date.getTime());
            return regex.test(date);
          };
          $dateParser.parse = function (value, baseDate) {
            if (angular.isDate(value))
              return value;
            var matches = regex.exec(value);
            if (!matches)
              return false;
            var date = baseDate || new Date(0);
            for (var i = 0; i < matches.length - 1; i++) {
              setMap[i] && setMap[i].call(date, matches[i + 1]);
            }
            return date;
          };
          function setMapForFormat(format) {
            var keys = Object.keys(setFnMap), i;
            var map = [], sortedMap = [];
            for (i = 0; i < keys.length; i++) {
              if ([
                  '/',
                  '.',
                  '-',
                  ' '
                ].indexOf(keys[i]) !== -1)
                continue;
              if (format.split(keys[i]).length > 1) {
                var index = format.search(keys[i]);
                format = format.split(keys[i]).join('');
                if (setFnMap[keys[i]])
                  map[index] = setFnMap[keys[i]];
              }
            }
            angular.forEach(map, function (v) {
              sortedMap.push(v);
            });
            return sortedMap;
          }
          function regExpForFormat(format) {
            var keys = Object.keys(regExpMap), i;
            for (i = 0; i < keys.length; i++) {
              format = format.split(keys[i]).join('${' + i + '}');
            }
            for (i = 0; i < keys.length; i++) {
              format = format.split('${' + i + '}').join(regExpMap[keys[i]]);
            }
            return new RegExp('^' + format + '$', ['i']);
          }
          $dateParser.init();
          return $dateParser;
        };
        return DateParserFactory;
      }
    ];
  }
]).directive('bsDatepicker', [
  '$window',
  '$parse',
  '$q',
  '$locale',
  'dateFilter',
  '$datepicker',
  '$dateParser',
  '$timeout',
  function ($window, $parse, $q, $locale, dateFilter, $datepicker, $dateParser, $timeout) {
    var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
    var moment = window.moment;
    return {
      restrict: 'EAC',
      require: 'ngModel',
      link: function postLink(scope, element, attr, controller) {
        var options = {
            scope: scope,
            controller: controller
          };
        angular.forEach([
          'placement',
          'container',
          'delay',
          'trigger',
          'keyboard',
          'html',
          'animation',
          'template',
          'autoclose',
          'dateType',
          'dateFormat',
          'lang'
        ], function (key) {
          if (angular.isDefined(attr[key]))
            options[key] = attr[key];
        });
        var datepicker = $datepicker(element, controller, options);
        options = datepicker.$options;
        angular.forEach([
          'minDate',
          'maxDate'
        ], function (key) {
          attr[key] && attr.$observe(key, function (newValue, oldValue) {
            if (newValue === 'now' || newValue === 'today')
              newValue = null;
            datepicker.$options[key] = +new Date(newValue);
            angular.isDefined(oldValue) && requestAnimationFrame(function () {
              datepicker && datepicker.$build();
            });
          });
        });
        scope.$watch(attr.ngModel, function (newValue, oldValue) {
          datepicker.update(controller.$dateValue);
        });
        var dateParser = $dateParser({
            format: options.dateFormat,
            lang: options.lang
          });
        controller.$parsers.unshift(function (viewValue) {
          var parsedDate = dateParser.parse(viewValue, controller.$dateValue);
          if (!parsedDate || isNaN(parsedDate.getTime())) {
            controller.$setValidity('date', false);
            return;
          } else {
            var isValid = parsedDate.getTime() >= options.minDate && parsedDate.getTime() <= options.maxDate;
            controller.$setValidity('date', isValid);
          }
          controller.$dateValue = parsedDate;
          if (options.dateType === 'string') {
            return dateFilter(viewValue, options.dateFormat);
          } else if (options.dateType === 'number') {
            return controller.$dateValue.getTime();
          } else if (options.dateType === 'iso') {
            return controller.$dateValue.toISOString();
          } else {
            return controller.$dateValue;
          }
        });
        controller.$formatters.push(function (modelValue) {
          controller.$dateValue = angular.isDate(modelValue) ? modelValue : new Date(modelValue);
          return controller.$dateValue;
        });
        controller.$render = function () {
          element.val(controller.$isEmpty(controller.$viewValue) ? '' : dateFilter(controller.$viewValue, options.dateFormat));
        };
        scope.$on('$destroy', function () {
          datepicker.destroy();
          options = null;
          datepicker = null;
        });
      }
    };
  }
]).provider('datepickerViews', function () {
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
  this.$get = [
    '$locale',
    '$sce',
    'dateFilter',
    function ($locale, $sce, dateFilter) {
      return function (picker) {
        var scope = picker.$scope;
        var options = picker.$options;
        var weekDaysMin = $locale.DATETIME_FORMATS.SHORTDAY;
        var weekDaysLabels = weekDaysMin.slice(options.weekStart).concat(weekDaysMin.slice(0, options.weekStart));
        var dayLabelHtml = $sce.trustAsHtml('<th class="dow text-center">' + weekDaysLabels.join('</th><th class="dow text-center">') + '</th>');
        var startDate = picker.$date || new Date();
        var viewDate = {
            year: startDate.getUTCFullYear(),
            month: startDate.getUTCMonth(),
            date: startDate.getUTCDate()
          };
        var views = [
            {
              format: 'dd',
              split: 7,
              height: 250,
              steps: { month: 1 },
              update: function (date, force) {
                if (force || date.getUTCFullYear() !== viewDate.year || date.getUTCMonth() !== viewDate.month) {
                  angular.extend(viewDate, {
                    year: picker.$date.getUTCFullYear(),
                    month: picker.$date.getUTCMonth(),
                    date: picker.$date.getUTCDate()
                  });
                  picker.$build();
                } else if (date.getUTCDate() !== viewDate.date) {
                  viewDate.date = picker.$date.getUTCDate();
                  picker.$updateSelected();
                }
              },
              build: function () {
                var days = [], day;
                var firstDayOfMonth = new Date(Date.UTC(viewDate.year, viewDate.month, 1));
                var firstDate = new Date(+firstDayOfMonth - (firstDayOfMonth.getUTCDay() + 1 - options.weekStart) * 86400000);
                for (var i = 0; i < 35; i++) {
                  day = new Date(+firstDate + i * 86400000);
                  days.push({
                    date: day,
                    label: dateFilter(day, this.format),
                    selected: this.isSelected(day),
                    muted: day.getUTCMonth() !== viewDate.month,
                    disabled: this.isDisabled(day)
                  });
                }
                scope.title = dateFilter(firstDayOfMonth, 'MMMM yyyy');
                scope.labels = dayLabelHtml;
                scope.rows = split(days, this.split);
                scope.width = 100 / this.split;
                scope.height = (this.height - 75) / scope.rows.length;
              },
              isSelected: function (date) {
                return date.getUTCFullYear() === picker.$date.getUTCFullYear() && date.getUTCMonth() === picker.$date.getUTCMonth() && date.getUTCDate() === picker.$date.getUTCDate();
              },
              isDisabled: function (date) {
                return date.getTime() < options.minDate || date.getTime() > options.maxDate;
              },
              onKeyDown: function (evt) {
                var actualTime = picker.$date.getTime();
                if (evt.keyCode === 37)
                  picker.select(new Date(actualTime - 1 * 86400000), true);
                else if (evt.keyCode === 38)
                  picker.select(new Date(actualTime - 7 * 86400000), true);
                else if (evt.keyCode === 39)
                  picker.select(new Date(actualTime + 1 * 86400000), true);
                else if (evt.keyCode === 40)
                  picker.select(new Date(actualTime + 7 * 86400000), true);
              }
            },
            {
              name: 'month',
              format: 'MMM',
              split: 4,
              height: 250,
              steps: { year: 1 },
              update: function (date) {
                if (date.getUTCFullYear() !== viewDate.year) {
                  angular.extend(viewDate, {
                    year: picker.$date.getUTCFullYear(),
                    month: picker.$date.getUTCMonth(),
                    date: picker.$date.getUTCDate()
                  });
                  picker.$build();
                } else if (date.getUTCMonth() !== viewDate.month) {
                  angular.extend(viewDate, {
                    month: picker.$date.getUTCMonth(),
                    date: picker.$date.getUTCDate()
                  });
                  picker.$updateSelected();
                }
              },
              build: function () {
                var months = [], month;
                for (var i = 0; i < 12; i++) {
                  month = new Date(Date.UTC(viewDate.year, i, 1));
                  months.push({
                    date: month,
                    label: dateFilter(month, this.format),
                    selected: picker.$isSelected(month),
                    disabled: this.isDisabled(month)
                  });
                }
                scope.title = dateFilter(month, 'yyyy');
                scope.labels = false;
                scope.rows = split(months, this.split);
                scope.width = 100 / this.split;
                scope.height = (this.height - 50) / scope.rows.length;
              },
              isSelected: function (date) {
                return date.getUTCFullYear() === picker.$date.getUTCFullYear() && date.getUTCMonth() === picker.$date.getUTCMonth();
              },
              isDisabled: function (date) {
                var lastDate = +new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));
                return lastDate < options.minDate || date.getTime() > options.maxDate;
              },
              onKeyDown: function (evt) {
                var actualMonth = picker.$date.getUTCMonth();
                if (evt.keyCode === 37)
                  picker.select(picker.$date.setMonth(actualMonth - 1), true);
                else if (evt.keyCode === 38)
                  picker.select(picker.$date.setMonth(actualMonth - 4), true);
                else if (evt.keyCode === 39)
                  picker.select(picker.$date.setMonth(actualMonth + 1), true);
                else if (evt.keyCode === 40)
                  picker.select(picker.$date.setMonth(actualMonth + 4), true);
              }
            },
            {
              name: 'year',
              format: 'yyyy',
              split: 4,
              height: 250,
              steps: { year: 12 },
              update: function (date) {
                if (parseInt(date.getUTCFullYear() / 20, 10) !== parseInt(viewDate.year / 20, 10)) {
                  angular.extend(viewDate, {
                    year: picker.$date.getUTCFullYear(),
                    month: picker.$date.getUTCMonth(),
                    date: picker.$date.getUTCDate()
                  });
                  picker.$build();
                } else if (date.getUTCFullYear() !== viewDate.year) {
                  angular.extend(viewDate, {
                    year: picker.$date.getUTCFullYear(),
                    month: picker.$date.getUTCMonth(),
                    date: picker.$date.getUTCDate()
                  });
                  picker.$updateSelected();
                }
              },
              build: function () {
                var firstYear = viewDate.year - viewDate.year % (this.split * 3);
                var years = [], year;
                for (var i = 0; i < 12; i++) {
                  year = new Date(Date.UTC(firstYear + i, 0, 1));
                  years.push({
                    date: year,
                    label: dateFilter(year, this.format),
                    selected: picker.$isSelected(year),
                    disabled: this.isDisabled(year)
                  });
                }
                scope.title = years[0].label + '-' + years[years.length - 1].label;
                scope.labels = false;
                scope.rows = split(years, this.split);
                scope.width = 100 / this.split;
                scope.height = (this.height - 50) / scope.rows.length;
              },
              isSelected: function (date) {
                return date.getUTCFullYear() === picker.$date.getUTCFullYear();
              },
              isDisabled: function (date) {
                var lastDate = +new Date(Date.UTC(date.getUTCFullYear(), 1, 0));
                return lastDate < options.minDate || date.getTime() > options.maxDate;
              },
              onKeyDown: function (evt) {
                var actualYear = picker.$date.getUTCFullYear();
                if (evt.keyCode === 37)
                  picker.select(picker.$date.setYear(actualYear - 1), true);
                else if (evt.keyCode === 38)
                  picker.select(picker.$date.setYear(actualYear - 4), true);
                else if (evt.keyCode === 39)
                  picker.select(picker.$date.setYear(actualYear + 1), true);
                else if (evt.keyCode === 40)
                  picker.select(picker.$date.setYear(actualYear + 4), true);
              }
            }
          ];
        return {
          views: options.minView ? Array.prototype.slice.call(views, options.minView) : views,
          viewDate: viewDate
        };
      };
    }
  ];
});