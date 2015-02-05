/**
 * angular-strap
 * @version v2.0.0-beta.4 - 2014-01-20
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (window, document, undefined) {
  'use strict';
  angular.module('mgcrea.ngStrap', [
    'mgcrea.ngStrap.modal',
    'mgcrea.ngStrap.aside',
    'mgcrea.ngStrap.alert',
    'mgcrea.ngStrap.button',
    'mgcrea.ngStrap.select',
    'mgcrea.ngStrap.datepicker',
    'mgcrea.ngStrap.navbar',
    'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.popover',
    'mgcrea.ngStrap.dropdown',
    'mgcrea.ngStrap.typeahead',
    'mgcrea.ngStrap.scrollspy',
    'mgcrea.ngStrap.affix',
    'mgcrea.ngStrap.tab'
  ]);
  angular.module('mgcrea.ngStrap.affix', ['mgcrea.ngStrap.helpers.dimensions']).provider('$affix', function () {
    var defaults = this.defaults = { offsetTop: 'auto' };
    this.$get = [
      '$window',
      'dimensions',
      function ($window, dimensions) {
        var windowEl = angular.element($window);
        var bodyEl = angular.element($window.document.body);
        function AffixFactory(element, config) {
          var $affix = {};
          var options = angular.extend({}, defaults, config);
          var reset = 'affix affix-top affix-bottom', initialAffixTop = 0, initialOffsetTop = 0, affixed = null, unpin = null;
          var parent = element.parent();
          if (options.offsetParent) {
            if (options.offsetParent.match(/^\d+$/)) {
              for (var i = 0; i < options.offsetParent * 1 - 1; i++) {
                parent = parent.parent();
              }
            } else {
              parent = angular.element(options.offsetParent);
            }
          }
          var offsetTop = 0;
          if (options.offsetTop) {
            if (options.offsetTop === 'auto') {
              options.offsetTop = '+0';
            }
            if (options.offsetTop.match(/^[-+]\d+$/)) {
              initialAffixTop -= options.offsetTop * 1;
              if (options.offsetParent) {
                offsetTop = dimensions.offset(parent[0]).top + options.offsetTop * 1;
              } else {
                offsetTop = dimensions.offset(element[0]).top - dimensions.css(element[0], 'marginTop', true) + options.offsetTop * 1;
              }
            } else {
              offsetTop = options.offsetTop * 1;
            }
          }
          var offsetBottom = 0;
          if (options.offsetBottom) {
            if (options.offsetParent && options.offsetBottom.match(/^[-+]\d+$/)) {
              offsetBottom = $window.document.body.scrollHeight - (dimensions.offset(parent[0]).top + dimensions.height(parent[0])) + options.offsetBottom * 1 + 1;
            } else {
              offsetBottom = options.offsetBottom * 1;
            }
          }
          $affix.init = function () {
            initialOffsetTop = dimensions.offset(element[0]).top + initialAffixTop;
            windowEl.on('scroll', this.checkPosition);
            windowEl.on('click', this.checkPositionWithEventLoop);
            this.checkPosition();
            this.checkPositionWithEventLoop();
          };
          $affix.destroy = function () {
            windowEl.off('scroll', this.checkPosition);
            windowEl.off('click', this.checkPositionWithEventLoop);
          };
          $affix.checkPositionWithEventLoop = function () {
            setTimeout(this.checkPosition, 1);
          };
          $affix.checkPosition = function () {
            var scrollTop = $window.pageYOffset;
            var position = dimensions.offset(element[0]);
            var elementHeight = dimensions.height(element[0]);
            var affix = getRequiredAffixClass(unpin, position, elementHeight);
            if (affixed === affix)
              return;
            affixed = affix;
            element.removeClass(reset).addClass('affix' + (affix !== 'middle' ? '-' + affix : ''));
            if (affix === 'top') {
              unpin = null;
              element.css('position', options.offsetParent ? '' : 'relative');
              element.css('top', '');
            } else if (affix === 'bottom') {
              if (options.offsetUnpin) {
                unpin = -(options.offsetUnpin * 1);
              } else {
                unpin = position.top - scrollTop;
              }
              element.css('position', options.offsetParent ? '' : 'relative');
              element.css('top', options.offsetParent ? '' : bodyEl[0].offsetHeight - offsetBottom - elementHeight - initialOffsetTop + 'px');
            } else {
              unpin = null;
              element.css('position', 'fixed');
              element.css('top', initialAffixTop + 'px');
            }
          };
          function getRequiredAffixClass(unpin, position, elementHeight) {
            var scrollTop = $window.pageYOffset;
            var scrollHeight = $window.document.body.scrollHeight;
            if (scrollTop <= offsetTop) {
              return 'top';
            } else if (unpin !== null && scrollTop + unpin <= position.top) {
              return 'middle';
            } else if (offsetBottom !== null && position.top + elementHeight + initialAffixTop >= scrollHeight - offsetBottom) {
              return 'bottom';
            } else {
              return 'middle';
            }
          }
          $affix.init();
          return $affix;
        }
        return AffixFactory;
      }
    ];
  }).directive('bsAffix', [
    '$affix',
    'dimensions',
    function ($affix, dimensions) {
      return {
        restrict: 'EAC',
        link: function postLink(scope, element, attr) {
          var options = {
              scope: scope,
              offsetTop: 'auto'
            };
          angular.forEach([
            'offsetTop',
            'offsetBottom',
            'offsetParent',
            'offsetUnpin'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          var affix = $affix(element, options);
          scope.$on('$destroy', function () {
            options = null;
            affix = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.alert', []).run([
    '$templateCache',
    function ($templateCache) {
      var template = '' + '<div class="alert" tabindex="-1" ng-class="[type ? \'alert-\' + type : null]">' + '<button type="button" class="close" ng-click="$hide()">&times;</button>' + '<strong ng-bind="title"></strong>&nbsp;<span ng-bind-html="content"></span>' + '</div>';
      $templateCache.put('$alert', template);
    }
  ]).provider('$alert', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        prefixClass: 'alert',
        placement: null,
        template: '$alert',
        container: false,
        element: null,
        backdrop: false,
        keyboard: true,
        show: true,
        duration: false
      };
    this.$get = [
      '$modal',
      '$timeout',
      function ($modal, $timeout) {
        function AlertFactory(config) {
          var $alert = {};
          var options = angular.extend({}, defaults, config);
          $alert = $modal(options);
          if (!options.scope) {
            angular.forEach(['type'], function (key) {
              if (options[key])
                $alert.$scope[key] = options[key];
            });
          }
          var show = $alert.show;
          if (options.duration) {
            $alert.show = function () {
              show();
              $timeout(function () {
                $alert.hide();
              }, options.duration * 1000);
            };
          }
          return $alert;
        }
        return AlertFactory;
      }
    ];
  }).directive('bsAlert', [
    '$window',
    '$location',
    '$sce',
    '$alert',
    function ($window, $location, $sce, $alert) {
      var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
      return {
        restrict: 'EAC',
        scope: true,
        link: function postLink(scope, element, attr, transclusion) {
          var options = {
              scope: scope,
              element: element,
              show: false
            };
          angular.forEach([
            'template',
            'placement',
            'keyboard',
            'html',
            'container',
            'animation',
            'duration'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          angular.forEach([
            'title',
            'content',
            'type'
          ], function (key) {
            attr[key] && attr.$observe(key, function (newValue, oldValue) {
              scope[key] = newValue;
            });
          });
          attr.bsAlert && scope.$watch(attr.bsAlert, function (newValue, oldValue) {
            if (angular.isObject(newValue)) {
              angular.extend(scope, newValue);
            } else {
              scope.content = newValue;
            }
          }, true);
          var alert = $alert(options);
          element.on(attr.trigger || 'click', alert.toggle);
          scope.$on('$destroy', function () {
            alert.destroy();
            options = null;
            alert = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.aside', ['mgcrea.ngStrap.modal']).run([
    '$templateCache',
    function ($templateCache) {
      var template = '' + '<div class="aside" tabindex="-1" role="dialog">' + '<div class="aside-dialog">' + '<div class="aside-content">' + '<div class="aside-header" ng-show="title">' + '<button type="button" class="close" ng-click="$hide()">&times;</button>' + '<h4 class="aside-title" ng-bind="title"></h4>' + '</div>' + '<div class="aside-body" ng-show="content" ng-bind="content"></div>' + '<div class="aside-footer">' + '<button type="button" class="btn btn-default" ng-click="$hide()">Close</button>' + '</div>' + '</div>' + '</div>' + '</div>';
      $templateCache.put('$aside', template);
    }
  ]).provider('$aside', function () {
    var defaults = this.defaults = {
        animation: 'animation-fadeAndSlideRight',
        prefixClass: 'aside',
        placement: 'right',
        template: '$aside',
        container: false,
        element: null,
        backdrop: true,
        keyboard: true,
        html: false,
        show: true
      };
    this.$get = [
      '$modal',
      function ($modal) {
        function AsideFactory(config) {
          var $aside = {};
          var options = angular.extend({}, defaults, config);
          $aside = $modal(options);
          return $aside;
        }
        return AsideFactory;
      }
    ];
  }).directive('bsAside', [
    '$window',
    '$location',
    '$sce',
    '$aside',
    function ($window, $location, $sce, $aside) {
      var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
      return {
        restrict: 'EAC',
        scope: true,
        link: function postLink(scope, element, attr, transclusion) {
          var options = {
              scope: scope,
              element: element,
              show: false
            };
          angular.forEach([
            'template',
            'placement',
            'backdrop',
            'keyboard',
            'html',
            'container',
            'animation'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          angular.forEach([
            'title',
            'content'
          ], function (key) {
            attr[key] && attr.$observe(key, function (newValue, oldValue) {
              scope[key] = newValue;
            });
          });
          attr.bsAside && scope.$watch(attr.bsAside, function (newValue, oldValue) {
            if (angular.isObject(newValue)) {
              angular.extend(scope, newValue);
            } else {
              scope.content = newValue;
            }
          }, true);
          var aside = $aside(options);
          element.on(attr.trigger || 'click', aside.toggle);
          scope.$on('$destroy', function () {
            aside.destroy();
            options = null;
            aside = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.button', []).provider('$button', function () {
    var defaults = this.defaults = {
        activeClass: 'active',
        toggleEvent: 'click'
      };
    this.$get = function () {
      return { defaults: defaults };
    };
  }).directive('bsCheckboxGroup', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      compile: function postLink(element, attr) {
        element.attr('data-toggle', 'buttons');
        element.removeAttr('ng-model');
        var children = element[0].querySelectorAll('input[type="checkbox"]');
        angular.forEach(children, function (child) {
          var childEl = angular.element(child);
          childEl.attr('bs-checkbox', '');
          childEl.attr('ng-model', attr.ngModel + '.' + childEl.attr('value'));
        });
      }
    };
  }).directive('bsCheckbox', [
    '$button',
    function ($button) {
      var defaults = $button.defaults;
      var constantValueRegExp = /^(true|false|\d+)$/;
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, element, attr, controller) {
          var options = defaults;
          var isInput = element[0].nodeName === 'INPUT';
          var activeElement = isInput ? element.parent() : element;
          var trueValue = angular.isDefined(attr.trueValue) ? attr.trueValue : true;
          if (constantValueRegExp.test(attr.trueValue)) {
            trueValue = scope.$eval(attr.trueValue);
          }
          var falseValue = angular.isDefined(attr.falseValue) ? attr.falseValue : false;
          if (constantValueRegExp.test(attr.falseValue)) {
            falseValue = scope.$eval(attr.falseValue);
          }
          var hasExoticValues = typeof trueValue !== 'boolean' || typeof falseValue !== 'boolean';
          if (hasExoticValues) {
            controller.$parsers.push(function (viewValue) {
              return viewValue ? trueValue : falseValue;
            });
            scope.$watch(attr.ngModel, function (newValue, oldValue) {
              controller.$render();
            });
          }
          controller.$render = function () {
            var isActive = angular.equals(controller.$modelValue, trueValue);
            if (isInput) {
              element[0].checked = isActive;
            }
            activeElement.toggleClass(options.activeClass, isActive);
          };
          element.bind(options.toggleEvent, function () {
            scope.$apply(function () {
              if (!isInput) {
                controller.$setViewValue(!activeElement.hasClass('active'));
              }
              if (!hasExoticValues) {
                controller.$render();
              }
            });
          });
        }
      };
    }
  ]).directive('bsRadioGroup', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      compile: function postLink(element, attr) {
        element.attr('data-toggle', 'buttons');
        element.removeAttr('ng-model');
        var children = element[0].querySelectorAll('input[type="radio"]');
        angular.forEach(children, function (child) {
          angular.element(child).attr('bs-radio', '');
          angular.element(child).attr('ng-model', attr.ngModel);
        });
      }
    };
  }).directive('bsRadio', [
    '$button',
    function ($button) {
      var defaults = $button.defaults;
      var constantValueRegExp = /^(true|false|\d+)$/;
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, element, attr, controller) {
          var options = defaults;
          var isInput = element[0].nodeName === 'INPUT';
          var activeElement = isInput ? element.parent() : element;
          var value = constantValueRegExp.test(attr.value) ? scope.$eval(attr.value) : attr.value;
          controller.$render = function () {
            var isActive = angular.equals(controller.$modelValue, value);
            if (isInput) {
              element[0].checked = isActive;
            }
            activeElement.toggleClass(options.activeClass, isActive);
          };
          element.bind(options.toggleEvent, function () {
            scope.$apply(function () {
              controller.$setViewValue(value);
              controller.$render();
            });
          });
        }
      };
    }
  ]);
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
  angular.module('mgcrea.ngStrap.dropdown', ['mgcrea.ngStrap.tooltip']).run([
    '$templateCache',
    function ($templateCache) {
      var template = '' + '<ul tabindex="-1" class="dropdown-menu" role="menu">' + '<li role="presentation" ng-class="{divider: item.divider}" ng-repeat="item in content" >' + '<a role="menuitem" tabindex="-1" href="{{item.href}}" ng-if="!item.divider" ng-click="$eval(item.click);$hide()" ng-bind="item.text"></a>' + '</li>' + '</ul>';
      $templateCache.put('$dropdown', template);
    }
  ]).provider('$dropdown', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        prefixClass: 'dropdown',
        placement: 'bottom-left',
        template: '$dropdown',
        trigger: 'click',
        container: false,
        keyboard: true,
        html: false,
        delay: 0
      };
    this.$get = [
      '$window',
      '$tooltip',
      function ($window, $tooltip) {
        var bodyEl = angular.element($window.document.body);
        var matchesSelector = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector;
        function DropdownFactory(element, config) {
          var $dropdown = {};
          var options = angular.extend({}, defaults, config);
          $dropdown = $tooltip(element, options);
          $dropdown.$onKeyDown = function (evt) {
            if (!/(38|40)/.test(evt.keyCode))
              return;
            evt.preventDefault();
            evt.stopPropagation();
            var items = angular.element($dropdown.$element[0].querySelectorAll('li:not(.divider) a'));
            if (!items.length)
              return;
            var index;
            angular.forEach(items, function (el, i) {
              if (matchesSelector && matchesSelector.call(el, ':focus'))
                index = i;
            });
            if (evt.keyCode === 38 && index > 0)
              index--;
            else if (evt.keyCode === 40 && index < items.length - 1)
              index++;
            else if (angular.isUndefined(index))
              index = 0;
            items.eq(index)[0].focus();
          };
          var show = $dropdown.show;
          $dropdown.show = function () {
            show();
            setTimeout(function () {
              options.keyboard && $dropdown.$element.on('keydown', $dropdown.$onKeyDown);
              bodyEl.on('click', onBodyClick);
            });
          };
          var hide = $dropdown.hide;
          $dropdown.hide = function () {
            options.keyboard && $dropdown.$element.off('keydown', $dropdown.$onKeyDown);
            bodyEl.off('click', onBodyClick);
            hide();
          };
          function onBodyClick(evt) {
            if (evt.target === element[0])
              return;
            return evt.target !== element[0] && $dropdown.hide();
          }
          return $dropdown;
        }
        return DropdownFactory;
      }
    ];
  }).directive('bsDropdown', [
    '$window',
    '$location',
    '$sce',
    '$dropdown',
    function ($window, $location, $sce, $dropdown) {
      return {
        restrict: 'EAC',
        scope: true,
        link: function postLink(scope, element, attr, transclusion) {
          var options = { scope: scope };
          angular.forEach([
            'placement',
            'container',
            'delay',
            'trigger',
            'keyboard',
            'html',
            'animation',
            'template'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          attr.bsDropdown && scope.$watch(attr.bsDropdown, function (newValue, oldValue) {
            scope.content = newValue;
          }, true);
          var dropdown = $dropdown(element, options);
          scope.$on('$destroy', function () {
            dropdown.destroy();
            options = null;
            dropdown = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.helpers.debounce', []).constant('debounce', function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function () {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function () {
        var last = new Date() - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate)
            result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow)
        result = func.apply(context, args);
      return result;
    };
  }).constant('throttle', function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function () {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function () {
      var now = new Date();
      if (!previous && options.leading === false)
        previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  });
  angular.module('mgcrea.ngStrap.helpers.dimensions', []).factory('dimensions', [
    '$document',
    '$window',
    function ($document, $window) {
      var jqLite = angular.element;
      var fn = {};
      var nodeName = fn.nodeName = function (element, name) {
          return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
        };
      fn.css = function (element, prop, extra) {
        var value;
        if (element.currentStyle) {
          value = element.currentStyle[prop];
        } else if (window.getComputedStyle) {
          value = window.getComputedStyle(element)[prop];
        } else {
          value = element.style[prop];
        }
        return extra === true ? parseFloat(value) || 0 : value;
      };
      fn.offset = function (element) {
        var boxRect = element.getBoundingClientRect();
        var docElement = element.ownerDocument;
        return {
          width: element.offsetWidth,
          height: element.offsetHeight,
          top: boxRect.top + (window.pageYOffset || docElement.documentElement.scrollTop) - (docElement.documentElement.clientTop || 0),
          left: boxRect.left + (window.pageXOffset || docElement.documentElement.scrollLeft) - (docElement.documentElement.clientLeft || 0)
        };
      };
      fn.position = function (element) {
        var offsetParentRect = {
            top: 0,
            left: 0
          }, offsetParentElement, offset;
        if (fn.css(element, 'position') === 'fixed') {
          offset = element.getBoundingClientRect();
        } else {
          offsetParentElement = offsetParent(element);
          offset = fn.offset(element);
          offset = fn.offset(element);
          if (!nodeName(offsetParentElement, 'html')) {
            offsetParentRect = fn.offset(offsetParentElement);
          }
          offsetParentRect.top += fn.css(offsetParentElement, 'borderTopWidth', true);
          offsetParentRect.left += fn.css(offsetParentElement, 'borderLeftWidth', true);
        }
        return {
          width: element.offsetWidth,
          height: element.offsetHeight,
          top: offset.top - offsetParentRect.top - fn.css(element, 'marginTop', true),
          left: offset.left - offsetParentRect.left - fn.css(element, 'marginLeft', true)
        };
      };
      var offsetParent = function offsetParentElement(element) {
        var docElement = element.ownerDocument;
        var offsetParent = element.offsetParent || docElement;
        if (nodeName(offsetParent, '#document'))
          return docElement.documentElement;
        while (offsetParent && !nodeName(offsetParent, 'html') && fn.css(offsetParent, 'position') === 'static') {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElement.documentElement;
      };
      fn.height = function (element, outer) {
        var value = element.offsetHeight;
        if (outer) {
          value += fn.css(element, 'marginTop', true) + fn.css(element, 'marginBottom', true);
        } else {
          value -= fn.css(element, 'paddingTop', true) + fn.css(element, 'paddingBottom', true) + fn.css(element, 'borderTopWidth', true) + fn.css(element, 'borderBottomWidth', true);
        }
        return value;
      };
      fn.width = function (element, outer) {
        var value = element.offsetWidth;
        if (outer) {
          value += fn.css(element, 'marginLeft', true) + fn.css(element, 'marginRight', true);
        } else {
          value -= fn.css(element, 'paddingLeft', true) + fn.css(element, 'paddingRight', true) + fn.css(element, 'borderLeftWidth', true) + fn.css(element, 'borderRightWidth', true);
        }
        return value;
      };
      return fn;
    }
  ]);
  angular.module('mgcrea.ngStrap.helpers.parseOptions', []).provider('$parseOptions', function () {
    var defaults = this.defaults = { regexp: /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/ };
    this.$get = [
      '$parse',
      '$q',
      function ($parse, $q) {
        function ParseOptionsFactory(attr, config) {
          var $parseOptions = {};
          var options = angular.extend({}, defaults, config);
          $parseOptions.$values = [];
          var match, displayFn, valueName, keyName, groupByFn, valueFn, valuesFn;
          $parseOptions.init = function () {
            $parseOptions.$match = match = attr.match(options.regexp);
            displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], keyName = match[5], groupByFn = $parse(match[3] || ''), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]);
          };
          $parseOptions.valuesFn = function (scope, controller) {
            return $q.when(valuesFn(scope, controller)).then(function (values) {
              $parseOptions.$values = values ? parseValues(values) : {};
              return $parseOptions.$values;
            });
          };
          function parseValues(values) {
            return values.map(function (match) {
              var locals = {}, label, value;
              locals[valueName] = match;
              label = displayFn(locals);
              value = valueFn(locals);
              if (angular.isObject(value))
                value = label;
              return {
                label: label,
                value: value
              };
            });
          }
          $parseOptions.init();
          return $parseOptions;
        }
        return ParseOptionsFactory;
      }
    ];
  });
  angular.module('mgcrea.ngStrap.modal', ['mgcrea.ngStrap.helpers.dimensions']).run([
    '$templateCache',
    '$modal',
    function ($templateCache, $modal) {
      var template = '' + '<div class="modal" tabindex="-1" role="dialog">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header" ng-show="title">' + '<button type="button" class="close" ng-click="$hide()">&times;</button>' + '<h4 class="modal-title" ng-bind="title"></h4>' + '</div>' + '<div class="modal-body" ng-show="content" ng-bind="content"></div>' + '<div class="modal-footer">' + '<button type="button" class="btn btn-default" ng-click="$hide()">Close</button>' + '</div>' + '</div>' + '</div>' + '</div>';
      $templateCache.put('$modal', template);
    }
  ]).provider('$modal', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        prefixClass: 'modal',
        placement: 'top',
        template: '$modal',
        container: false,
        element: null,
        backdrop: true,
        keyboard: true,
        html: false,
        show: true
      };
    this.$get = [
      '$window',
      '$rootScope',
      '$compile',
      '$q',
      '$templateCache',
      '$http',
      '$animate',
      '$timeout',
      'dimensions',
      function ($window, $rootScope, $compile, $q, $templateCache, $http, $animate, $timeout, dimensions) {
        var forEach = angular.forEach;
        var jqLite = angular.element;
        var trim = String.prototype.trim;
        var bodyElement = jqLite($window.document.body);
        var htmlReplaceRegExp = /ng-bind="/gi;
        var findElement = function (query, element) {
          return jqLite((element || document).querySelectorAll(query));
        };
        function ModalFactory(config) {
          var $modal = {};
          var options = angular.extend({}, defaults, config);
          $modal.$promise = $q.when($templateCache.get(options.template) || $http.get(options.template));
          var scope = $modal.$scope = options.scope && options.scope.$new() || $rootScope.$new();
          if (!options.element && !options.container) {
            options.container = 'body';
          }
          if (!options.scope) {
            forEach([
              'title',
              'content'
            ], function (key) {
              if (options[key])
                scope[key] = options[key];
            });
          }
          scope.$hide = function () {
            scope.$$postDigest(function () {
              $modal.hide();
            });
          };
          scope.$show = function () {
            scope.$$postDigest(function () {
              $modal.show();
            });
          };
          scope.$toggle = function () {
            scope.$$postDigest(function () {
              $modal.toggle();
            });
          };
          var modalLinker, modalElement;
          var backdropElement = jqLite('<div class="' + options.prefixClass + '-backdrop"/>');
          $modal.$promise.then(function (template) {
            if (angular.isObject(template))
              template = template.data;
            if (options.html)
              template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
            template = trim.apply(template);
            modalLinker = $compile(template);
            $modal.init();
          });
          $modal.init = function () {
            if (options.show) {
              scope.$$postDigest(function () {
                options.trigger === 'focus' ? element[0].focus() : $modal.show();
              });
            }
          };
          $modal.destroy = function () {
            if (modalElement) {
              modalElement.remove();
              modalElement = null;
            }
            if (backdropElement) {
              backdropElement.remove();
              backdropElement = null;
            }
            scope.$destroy();
          };
          $modal.show = function () {
            var parent = options.container ? findElement(options.container) : null;
            var after = options.container ? null : options.element;
            modalElement = $modal.$element = modalLinker(scope, function (clonedElement, scope) {
            });
            modalElement.css({ display: 'block' }).addClass(options.placement);
            if (options.animation) {
              if (options.backdrop) {
                backdropElement.addClass('animation-fade');
              }
              modalElement.addClass(options.animation);
            }
            if (options.backdrop) {
              $animate.enter(backdropElement, bodyElement, null, function () {
              });
            }
            $animate.enter(modalElement, parent, after, function () {
            });
            scope.$isShown = true;
            scope.$$phase || scope.$digest();
            $modal.focus();
            bodyElement.addClass(options.prefixClass + '-open');
            if (options.backdrop) {
              modalElement.on('click', hideOnBackdropClick);
              backdropElement.on('click', hideOnBackdropClick);
            }
            if (options.keyboard) {
              modalElement.on('keyup', $modal.$onKeyUp);
            }
          };
          $modal.hide = function () {
            $animate.leave(modalElement, function () {
              bodyElement.removeClass(options.prefixClass + '-open');
            });
            if (options.backdrop) {
              $animate.leave(backdropElement, function () {
              });
            }
            scope.$$phase || scope.$digest();
            scope.$isShown = false;
            if (options.backdrop) {
              modalElement.off('click', hideOnBackdropClick);
              backdropElement.off('click', hideOnBackdropClick);
            }
            if (options.keyboard) {
              modalElement.off('keyup', $modal.$onKeyUp);
            }
          };
          $modal.toggle = function () {
            scope.$isShown ? $modal.hide() : $modal.show();
          };
          $modal.focus = function () {
            modalElement[0].focus();
          };
          $modal.$onKeyUp = function (evt) {
            evt.which === 27 && $modal.hide();
          };
          function hideOnBackdropClick(evt) {
            if (evt.target !== evt.currentTarget)
              return;
            options.backdrop === 'static' ? $modal.focus() : $modal.hide();
          }
          return $modal;
        }
        return ModalFactory;
      }
    ];
  }).directive('bsModal', [
    '$window',
    '$location',
    '$sce',
    '$modal',
    function ($window, $location, $sce, $modal) {
      return {
        restrict: 'EAC',
        scope: true,
        link: function postLink(scope, element, attr, transclusion) {
          var options = {
              scope: scope,
              element: element,
              show: false
            };
          angular.forEach([
            'template',
            'placement',
            'backdrop',
            'keyboard',
            'html',
            'container',
            'animation'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          angular.forEach([
            'title',
            'content'
          ], function (key) {
            attr[key] && attr.$observe(key, function (newValue, oldValue) {
              scope[key] = newValue;
            });
          });
          attr.bsModal && scope.$watch(attr.bsModal, function (newValue, oldValue) {
            if (angular.isObject(newValue)) {
              angular.extend(scope, newValue);
            } else {
              scope.content = newValue;
            }
          }, true);
          var modal = $modal(options);
          element.on(attr.trigger || 'click', modal.toggle);
          scope.$on('$destroy', function () {
            modal.destroy();
            options = null;
            modal = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.navbar', []).provider('$navbar', function () {
    var defaults = this.defaults = {
        activeClass: 'active',
        routeAttr: 'data-match-route'
      };
    this.$get = function () {
      return { defaults: defaults };
    };
  }).directive('bsNavbar', [
    '$window',
    '$location',
    '$navbar',
    function ($window, $location, $navbar) {
      var defaults = $navbar.defaults;
      return {
        restrict: 'A',
        link: function postLink(scope, element, attr, controller) {
          var options = defaults;
          angular.forEach(Object.keys(defaults), function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          scope.$watch(function () {
            return $location.path();
          }, function (newValue, oldValue) {
            var liElements = element[0].querySelectorAll('li[' + options.routeAttr + ']');
            angular.forEach(liElements, function (li) {
              var liElement = angular.element(li);
              var pattern = liElement.attr(options.routeAttr);
              var regexp = new RegExp('^' + pattern.replace('/', '\\/') + '$', ['i']);
              if (regexp.test(newValue)) {
                liElement.addClass(options.activeClass);
              } else {
                liElement.removeClass(options.activeClass);
              }
            });
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.popover', ['mgcrea.ngStrap.tooltip']).run([
    '$templateCache',
    function ($templateCache) {
      var template = '' + '<div class="popover" tabindex="-1" ng-show="content" ng-class="{\'in\': $visible}">' + '<div class="arrow"></div>' + '<h3 class="popover-title" ng-bind="title" ng-show="title"></h3>' + '<div class="popover-content" ng-bind="content"></div>' + '</div>';
      $templateCache.put('$popover', template);
    }
  ]).provider('$popover', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        placement: 'right',
        template: '$popover',
        trigger: 'click',
        keyboard: true,
        html: false,
        title: '',
        content: '',
        delay: 0,
        container: false
      };
    this.$get = [
      '$tooltip',
      function ($tooltip) {
        function PopoverFactory(element, config) {
          var options = angular.extend({}, defaults, config);
          return $tooltip(element, options);
        }
        return PopoverFactory;
      }
    ];
  }).directive('bsPopover', [
    '$window',
    '$location',
    '$sce',
    '$popover',
    function ($window, $location, $sce, $popover) {
      var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
      return {
        restrict: 'EAC',
        scope: true,
        link: function postLink(scope, element, attr) {
          var options = { scope: scope };
          angular.forEach([
            'placement',
            'container',
            'delay',
            'trigger',
            'keyboard',
            'html',
            'animation',
            'template'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          angular.forEach([
            'title',
            'content'
          ], function (key) {
            attr[key] && attr.$observe(key, function (newValue, oldValue) {
              scope[key] = newValue;
              angular.isDefined(oldValue) && requestAnimationFrame(function () {
                popover && popover.$applyPlacement();
              });
            });
          });
          attr.bsPopover && scope.$watch(attr.bsPopover, function (newValue, oldValue) {
            if (angular.isObject(newValue)) {
              angular.extend(scope, newValue);
            } else {
              scope.content = newValue;
            }
            angular.isDefined(oldValue) && requestAnimationFrame(function () {
              popover && popover.$applyPlacement();
            });
          }, true);
          var popover = $popover(element, options);
          scope.$on('$destroy', function () {
            popover.destroy();
            options = null;
            popover = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.scrollspy', [
    'mgcrea.ngStrap.helpers.debounce',
    'mgcrea.ngStrap.helpers.dimensions'
  ]).provider('$scrollspy', function () {
    var spies = this.$$spies = {};
    var defaults = this.defaults = {
        debounce: 150,
        throttle: 100,
        offset: 100
      };
    this.$get = [
      '$window',
      '$document',
      '$rootScope',
      'dimensions',
      'debounce',
      'throttle',
      function ($window, $document, $rootScope, dimensions, debounce, throttle) {
        var windowEl = angular.element($window);
        var docEl = angular.element($document.prop('documentElement'));
        var bodyEl = angular.element($window.document.body);
        function nodeName(element, name) {
          return element[0].nodeName && element[0].nodeName.toLowerCase() === name.toLowerCase();
        }
        function ScrollSpyFactory(config) {
          var options = angular.extend({}, defaults, config);
          if (!options.element)
            options.element = bodyEl;
          var isWindowSpy = nodeName(options.element, 'body');
          var scrollEl = isWindowSpy ? windowEl : options.element;
          var scrollId = isWindowSpy ? 'window' : options.id;
          if (spies[scrollId]) {
            spies[scrollId].$$count++;
            return spies[scrollId];
          }
          var $scrollspy = {};
          var trackedElements = $scrollspy.$trackedElements = [];
          var sortedElements = [];
          var activeTarget;
          var debouncedCheckPosition;
          var throttledCheckPosition;
          var debouncedCheckOffsets;
          var viewportHeight;
          var scrollTop;
          $scrollspy.init = function () {
            this.$$count = 1;
            debouncedCheckPosition = debounce(this.checkPosition, options.debounce);
            throttledCheckPosition = throttle(this.checkPosition, options.throttle);
            scrollEl.on('click', this.checkPositionWithEventLoop);
            windowEl.on('resize', debouncedCheckPosition);
            scrollEl.on('scroll', throttledCheckPosition);
            debouncedCheckOffsets = debounce(this.checkOffsets, options.debounce);
            $rootScope.$on('$viewContentLoaded', debouncedCheckOffsets);
            $rootScope.$on('$includeContentLoaded', debouncedCheckOffsets);
            debouncedCheckOffsets();
            if (scrollId) {
              spies[scrollId] = $scrollspy;
            }
          };
          $scrollspy.destroy = function () {
            this.$$count--;
            if (this.$$count > 0) {
              return;
            }
            scrollEl.off('click', this.checkPositionWithEventLoop);
            windowEl.off('resize', debouncedCheckPosition);
            scrollEl.off('scroll', debouncedCheckPosition);
            $rootScope.$off('$viewContentLoaded', debouncedCheckOffsets);
            $rootScope.$off('$includeContentLoaded', debouncedCheckOffsets);
          };
          $scrollspy.checkPosition = function () {
            if (!sortedElements.length)
              return;
            scrollTop = (isWindowSpy ? $window.pageYOffset : scrollEl.prop('scrollTop')) || 0;
            viewportHeight = Math.max($window.innerHeight, docEl.prop('clientHeight'));
            if (scrollTop < sortedElements[0].offsetTop && activeTarget !== sortedElements[0].target) {
              return $scrollspy.$activateElement(sortedElements[0]);
            }
            for (var i = sortedElements.length; i--;) {
              if (angular.isUndefined(sortedElements[i].offsetTop) || sortedElements[i].offsetTop === null)
                continue;
              if (activeTarget === sortedElements[i].target)
                continue;
              if (scrollTop < sortedElements[i].offsetTop)
                continue;
              if (sortedElements[i + 1] && scrollTop > sortedElements[i + 1].offsetTop)
                continue;
              return $scrollspy.$activateElement(sortedElements[i]);
            }
          };
          $scrollspy.checkPositionWithEventLoop = function () {
            setTimeout(this.checkPosition, 1);
          };
          $scrollspy.$activateElement = function (element) {
            if (activeTarget) {
              var activeElement = $scrollspy.$getTrackedElement(activeTarget);
              if (activeElement) {
                activeElement.source.removeClass('active');
                if (nodeName(activeElement.source, 'li') && nodeName(activeElement.source.parent().parent(), 'li')) {
                  activeElement.source.parent().parent().removeClass('active');
                }
              }
            }
            activeTarget = element.target;
            element.source.addClass('active');
            if (nodeName(element.source, 'li') && nodeName(element.source.parent().parent(), 'li')) {
              element.source.parent().parent().addClass('active');
            }
          };
          $scrollspy.$getTrackedElement = function (target) {
            return trackedElements.filter(function (obj) {
              return obj.target === target;
            })[0];
          };
          $scrollspy.checkOffsets = function () {
            angular.forEach(trackedElements, function (trackedElement) {
              var targetElement = document.querySelector(trackedElement.target);
              trackedElement.offsetTop = targetElement ? dimensions.offset(targetElement).top : null;
              if (options.offset && trackedElement.offsetTop !== null)
                trackedElement.offsetTop -= options.offset * 1;
            });
            sortedElements = trackedElements.filter(function (el) {
              return el.offsetTop !== null;
            }).sort(function (a, b) {
              return a.offsetTop - b.offsetTop;
            });
            debouncedCheckPosition();
          };
          $scrollspy.trackElement = function (target, source) {
            trackedElements.push({
              target: target,
              source: source
            });
          };
          $scrollspy.untrackElement = function (target, source) {
            var toDelete;
            for (var i = trackedElements.length; i--;) {
              if (trackedElements[i].target === target && trackedElements[i].source === source) {
                toDelete = i;
                break;
              }
            }
            trackedElements = trackedElements.splice(toDelete, 1);
          };
          $scrollspy.activate = function (i) {
            trackedElements[i].addClass('active');
          };
          $scrollspy.init();
          return $scrollspy;
        }
        return ScrollSpyFactory;
      }
    ];
  }).directive('bsScrollspy', [
    '$rootScope',
    'debounce',
    'dimensions',
    '$scrollspy',
    function ($rootScope, debounce, dimensions, $scrollspy) {
      return {
        restrict: 'EAC',
        link: function postLink(scope, element, attr) {
          var options = { scope: scope };
          angular.forEach([
            'offset',
            'target'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          var scrollspy = $scrollspy(options);
          scrollspy.trackElement(options.target, element);
          scope.$on('$destroy', function () {
            scrollspy.untrackElement(options.target, element);
            scrollspy.destroy();
            options = null;
            scrollspy = null;
          });
        }
      };
    }
  ]).directive('bsScrollspyList', [
    '$rootScope',
    'debounce',
    'dimensions',
    '$scrollspy',
    function ($rootScope, debounce, dimensions, $scrollspy) {
      return {
        restrict: 'A',
        compile: function postLink(element, attr) {
          var children = element[0].querySelectorAll('li > a[href]');
          angular.forEach(children, function (child) {
            var childEl = angular.element(child);
            childEl.parent().attr('bs-scrollspy', '').attr('data-target', childEl.attr('href'));
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.select', [
    'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.helpers.parseOptions'
  ]).provider('$select', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        prefixClass: 'select',
        placement: 'bottom-left',
        template: 'select/select.tpl.html',
        trigger: 'focus',
        container: false,
        keyboard: true,
        html: false,
        delay: 0,
        multiple: false,
        sort: true,
        caretHtml: '&nbsp;<span class="caret"></span>',
        placeholder: 'Choose among the following...'
      };
    this.$get = [
      '$window',
      '$document',
      '$rootScope',
      '$tooltip',
      function ($window, $document, $rootScope, $tooltip) {
        var bodyEl = angular.element($window.document.body);
        var isTouch = 'createTouch' in $window.document;
        function SelectFactory(element, controller, config) {
          var $select = {};
          var options = angular.extend({}, defaults, config);
          $select = $tooltip(element, options);
          var parentScope = config.scope;
          var scope = $select.$scope;
          scope.$matches = [];
          scope.$activeIndex = 0;
          scope.$isMultiple = options.multiple;
          scope.$activate = function (index) {
            scope.$$postDigest(function () {
              $select.activate(index);
            });
          };
          scope.$select = function (index, evt) {
            scope.$$postDigest(function () {
              $select.select(index);
            });
          };
          scope.$isVisible = function () {
            return $select.$isVisible();
          };
          scope.$isActive = function (index) {
            return $select.$isActive(index);
          };
          $select.update = function (matches) {
            scope.$matches = matches;
            if (controller.$modelValue && matches.length) {
              if (options.multiple && angular.isArray(controller.$modelValue)) {
                scope.$activeIndex = controller.$modelValue.map(function (value) {
                  return $select.$getIndex(value);
                });
              } else {
                scope.$activeIndex = $select.$getIndex(controller.$modelValue);
              }
            } else if (scope.$activeIndex >= matches.length) {
              scope.$activeIndex = options.multiple ? [] : 0;
            }
          };
          $select.activate = function (index) {
            if (options.multiple) {
              scope.$activeIndex.sort();
              $select.$isActive(index) ? scope.$activeIndex.splice(scope.$activeIndex.indexOf(index), 1) : scope.$activeIndex.push(index);
              if (options.sort)
                scope.$activeIndex.sort();
            } else {
              scope.$activeIndex = index;
            }
            return scope.$activeIndex;
          };
          $select.select = function (index) {
            var value = scope.$matches[index].value;
            $select.activate(index);
            if (options.multiple) {
              controller.$setViewValue(scope.$activeIndex.map(function (index) {
                return scope.$matches[index].value;
              }));
            } else {
              controller.$setViewValue(value);
            }
            controller.$render();
            if (parentScope)
              parentScope.$digest();
            if (!options.multiple) {
              if (options.trigger === 'focus')
                element[0].blur();
              else if ($select.$isShown)
                $select.hide();
            }
            scope.$emit('$select.select', value, index);
          };
          $select.$isVisible = function () {
            if (!options.minLength || !controller) {
              return scope.$matches.length;
            }
            return scope.$matches.length && controller.$viewValue.length >= options.minLength;
          };
          $select.$isActive = function (index) {
            if (options.multiple) {
              return scope.$activeIndex.indexOf(index) !== -1;
            } else {
              return scope.$activeIndex === index;
            }
          };
          $select.$getIndex = function (value) {
            var l = scope.$matches.length, i = l;
            if (!l)
              return;
            for (i = l; i--;) {
              if (scope.$matches[i].value === value)
                break;
            }
            if (i < 0)
              return;
            return i;
          };
          $select.$onElementMouseDown = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if ($select.$isShown) {
              element[0].blur();
            } else {
              element[0].focus();
            }
          };
          $select.$onMouseDown = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (isTouch) {
              var targetEl = angular.element(evt.target);
              targetEl.triggerHandler('click');
            }
          };
          $select.$onKeyDown = function (evt) {
            if (!/(38|40|13)/.test(evt.keyCode))
              return;
            evt.preventDefault();
            evt.stopPropagation();
            if (evt.keyCode === 13) {
              return $select.select(scope.$activeIndex);
            }
            if (evt.keyCode === 38 && scope.$activeIndex > 0)
              scope.$activeIndex--;
            else if (evt.keyCode === 40 && scope.$activeIndex < scope.$matches.length - 1)
              scope.$activeIndex++;
            else if (angular.isUndefined(scope.$activeIndex))
              scope.$activeIndex = 0;
            scope.$digest();
          };
          var _init = $select.init;
          $select.init = function () {
            _init();
            element.on(isTouch ? 'touchstart' : 'mousedown', $select.$onElementMouseDown);
          };
          var _destroy = $select.destroy;
          $select.destroy = function () {
            _destroy();
            element.off(isTouch ? 'touchstart' : 'mousedown', $select.$onElementMouseDown);
          };
          var _show = $select.show;
          $select.show = function () {
            _show();
            if (options.multiple) {
              $select.$element.addClass('select-multiple');
            }
            setTimeout(function () {
              $select.$element.on(isTouch ? 'touchstart' : 'mousedown', $select.$onMouseDown);
              if (options.keyboard) {
                element.on('keydown', $select.$onKeyDown);
              }
            });
          };
          var _hide = $select.hide;
          $select.hide = function () {
            $select.$element.off(isTouch ? 'touchstart' : 'mousedown', $select.$onMouseDown);
            if (options.keyboard) {
              element.off('keydown', $select.$onKeyDown);
            }
            _hide();
          };
          return $select;
        }
        SelectFactory.defaults = defaults;
        return SelectFactory;
      }
    ];
  }).directive('bsSelect', [
    '$window',
    '$parse',
    '$q',
    '$select',
    '$parseOptions',
    function ($window, $parse, $q, $select, $parseOptions) {
      var defaults = $select.defaults;
      return {
        restrict: 'EAC',
        require: 'ngModel',
        link: function postLink(scope, element, attr, controller) {
          var options = { scope: scope };
          angular.forEach([
            'placement',
            'container',
            'delay',
            'trigger',
            'keyboard',
            'html',
            'animation',
            'template',
            'placeholder',
            'multiple'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          var parsedOptions = $parseOptions(attr.ngOptions);
          var select = $select(element, controller, options);
          scope.$watch(parsedOptions.$match[7], function (newValue, oldValue) {
            parsedOptions.valuesFn(scope, controller).then(function (values) {
              select.update(values);
              controller.$render();
            });
          });
          controller.$render = function () {
            var selected, index;
            if (options.multiple && angular.isArray(controller.$modelValue)) {
              selected = controller.$modelValue.map(function (value) {
                index = select.$getIndex(value);
                return angular.isDefined(index) ? select.$scope.$matches[index].label : false;
              }).filter(angular.isDefined).join(', ');
            } else {
              index = select.$getIndex(controller.$modelValue);
              selected = angular.isDefined(index) ? select.$scope.$matches[index].label : false;
            }
            element.html((selected ? selected : attr.placeholder || defaults.placeholder) + defaults.caretHtml);
          };
          scope.$on('$destroy', function () {
            select.destroy();
            options = null;
            select = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.tab', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('$pane', '{{pane.content}}');
      var template = '<ul class="nav nav-tabs">' + '<li ng-repeat="pane in panes" ng-class="{active:$index==active}">' + '<a data-toggle="tab" ng-click="setActive($index, $event)" data-index="{{$index}}">{{pane.title}}</a>' + '</li>' + '</ul>' + '<div class="tab-content">' + '<div ng-repeat="pane in panes" class="tab-pane" ng-class="[$index==active?\'active\':\'\']" ng-include="pane.template || \'$pane\'"></div>' + '</div>';
      $templateCache.put('$tabs', template);
    }
  ]).provider('$tab', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        template: '$tabs'
      };
    this.$get = function () {
      return { defaults: defaults };
    };
  }).directive('bsTabs', [
    '$window',
    '$animate',
    '$tab',
    function ($window, $animate, $tab) {
      var defaults = $tab.defaults;
      return {
        restrict: 'EAC',
        scope: true,
        require: '?ngModel',
        templateUrl: function (element, attr) {
          return attr.template || defaults.template;
        },
        link: function postLink(scope, element, attr, controller) {
          var options = defaults;
          angular.forEach(['animation'], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          attr.bsTabs && scope.$watch(attr.bsTabs, function (newValue, oldValue) {
            scope.panes = newValue;
          }, true);
          element.addClass('tabs');
          if (options.animation) {
            element.addClass(options.animation);
          }
          scope.active = scope.activePane = 0;
          scope.setActive = function (index, ev) {
            scope.active = index;
            if (controller) {
              controller.$setViewValue(index);
            }
          };
          if (controller) {
            controller.$render = function () {
              scope.active = controller.$modelValue * 1;
            };
          }
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.tooltip', ['mgcrea.ngStrap.helpers.dimensions']).run([
    '$templateCache',
    function ($templateCache) {
      var template = '' + '<div class="tooltip" ng-show="title">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner" ng-bind="title"></div>' + '</div>';
      $templateCache.put('$tooltip', template);
    }
  ]).provider('$tooltip', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        prefixClass: 'tooltip',
        container: false,
        placement: 'top',
        template: '$tooltip',
        trigger: 'hover focus',
        keyboard: false,
        html: false,
        show: false,
        title: '',
        type: '',
        delay: 0
      };
    this.$get = [
      '$window',
      '$rootScope',
      '$compile',
      '$q',
      '$templateCache',
      '$http',
      '$animate',
      '$timeout',
      'dimensions',
      function ($window, $rootScope, $compile, $q, $templateCache, $http, $animate, $timeout, dimensions) {
        var trim = String.prototype.trim;
        var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
        var htmlReplaceRegExp = /ng-bind="/gi;
        var findElement = function (query, element) {
          return angular.element((element || document).querySelectorAll(query));
        };
        function TooltipFactory(element, config) {
          var $tooltip = {};
          var options = $tooltip.$options = angular.extend({}, defaults, config);
          $tooltip.$promise = $q.when($templateCache.get(options.template) || $http.get(options.template));
          var scope = $tooltip.$scope = options.scope && options.scope.$new() || $rootScope.$new();
          if (options.delay && angular.isString(options.delay)) {
            options.delay = parseFloat(options.delay);
          }
          scope.$hide = function () {
            scope.$$postDigest(function () {
              $tooltip.hide();
            });
          };
          scope.$show = function () {
            scope.$$postDigest(function () {
              $tooltip.show();
            });
          };
          scope.$toggle = function () {
            scope.$$postDigest(function () {
              $tooltip.toggle();
            });
          };
          $tooltip.$isShown = false;
          var timeout, hoverState;
          var tipLinker, tipElement, tipTemplate;
          $tooltip.$promise.then(function (template) {
            if (angular.isObject(template))
              template = template.data;
            if (options.html)
              template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
            template = trim.apply(template);
            tipTemplate = template;
            tipLinker = $compile(template);
            $tooltip.init();
          });
          $tooltip.init = function () {
            if (options.delay && angular.isNumber(options.delay)) {
              options.delay = {
                show: options.delay,
                hide: options.delay
              };
            }
            var triggers = options.trigger.split(' ');
            for (var i = triggers.length; i--;) {
              var trigger = triggers[i];
              if (trigger === 'click') {
                element.on('click', $tooltip.toggle);
              } else if (trigger !== 'manual') {
                element.on(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
                element.on(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
              }
            }
            if (options.show) {
              scope.$$postDigest(function () {
                options.trigger === 'focus' ? element[0].focus() : $tooltip.show();
              });
            }
          };
          $tooltip.destroy = function () {
            var triggers = options.trigger.split(' ');
            for (var i = triggers.length; i--;) {
              var trigger = triggers[i];
              if (trigger === 'click') {
                element.off('click', $tooltip.toggle);
              } else if (trigger !== 'manual') {
                element.off(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
                element.off(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
              }
            }
            if (tipElement) {
              tipElement.remove();
              tipElement = null;
            }
            scope.$destroy();
          };
          $tooltip.enter = function () {
            clearTimeout(timeout);
            hoverState = 'in';
            if (!options.delay || !options.delay.show) {
              return $tooltip.show();
            }
            timeout = setTimeout(function () {
              if (hoverState === 'in')
                $tooltip.show();
            }, options.delay.show);
          };
          $tooltip.show = function () {
            var parent = options.container ? findElement(options.container) : null;
            var after = options.container ? null : element;
            tipElement = $tooltip.$element = tipLinker(scope, function (clonedElement, scope) {
            });
            tipElement.css({
              top: '0px',
              left: '0px',
              display: 'block'
            }).addClass(options.placement);
            if (options.animation)
              tipElement.addClass(options.animation);
            if (options.type)
              tipElement.addClass(options.prefixClass + '-' + options.type);
            $animate.enter(tipElement, parent, after, function () {
            });
            $tooltip.$isShown = true;
            scope.$$phase || scope.$digest();
            requestAnimationFrame($tooltip.$applyPlacement);
            if (options.keyboard) {
              if (options.trigger !== 'focus') {
                $tooltip.focus();
                tipElement.on('keyup', $tooltip.$onKeyUp);
              } else {
                element.on('keyup', $tooltip.$onFocusKeyUp);
              }
            }
          };
          $tooltip.leave = function () {
            clearTimeout(timeout);
            hoverState = 'out';
            if (!options.delay || !options.delay.hide) {
              return $tooltip.hide();
            }
            timeout = setTimeout(function () {
              if (hoverState === 'out') {
                $tooltip.hide();
              }
            }, options.delay.hide);
          };
          $tooltip.hide = function () {
            $animate.leave(tipElement, function () {
            });
            scope.$$phase || scope.$digest();
            $tooltip.$isShown = false;
            if (options.keyboard) {
              tipElement.off('keyup', $tooltip.$onKeyUp);
            }
          };
          $tooltip.toggle = function () {
            $tooltip.$isShown ? $tooltip.leave() : $tooltip.enter();
          };
          $tooltip.focus = function () {
            tipElement[0].focus();
          };
          $tooltip.$applyPlacement = function () {
            if (!tipElement)
              return;
            var elementPosition = getPosition();
            var tipWidth = tipElement.prop('offsetWidth'), tipHeight = tipElement.prop('offsetHeight');
            var tipPosition = getCalculatedOffset(options.placement, elementPosition, tipWidth, tipHeight);
            tipPosition.top += 'px';
            tipPosition.left += 'px';
            tipElement.css(tipPosition);
          };
          $tooltip.$onKeyUp = function (evt) {
            evt.which === 27 && $tooltip.hide();
          };
          $tooltip.$onFocusKeyUp = function (evt) {
            evt.which === 27 && element[0].blur();
          };
          function getPosition() {
            if (options.container === 'body') {
              return dimensions.offset(element[0]);
            } else {
              return dimensions.position(element[0]);
            }
          }
          function getCalculatedOffset(placement, position, actualWidth, actualHeight) {
            var offset;
            var split = placement.split('-');
            switch (split[0]) {
            case 'right':
              offset = {
                top: position.top + position.height / 2 - actualHeight / 2,
                left: position.left + position.width
              };
              break;
            case 'bottom':
              offset = {
                top: position.top + position.height,
                left: position.left + position.width / 2 - actualWidth / 2
              };
              break;
            case 'left':
              offset = {
                top: position.top + position.height / 2 - actualHeight / 2,
                left: position.left - actualWidth
              };
              break;
            default:
              offset = {
                top: position.top - actualHeight,
                left: position.left + position.width / 2 - actualWidth / 2
              };
              break;
            }
            if (!split[1]) {
              return offset;
            }
            if (split[0] === 'top' || split[0] === 'bottom') {
              switch (split[1]) {
              case 'left':
                offset.left = position.left;
                break;
              case 'right':
                offset.left = position.left + position.width - actualWidth;
              }
            } else if (split[0] === 'left' || split[0] === 'right') {
              switch (split[1]) {
              case 'top':
                offset.top = position.top - actualHeight;
                break;
              case 'bottom':
                offset.top = position.top + position.height;
              }
            }
            return offset;
          }
          return $tooltip;
        }
        return TooltipFactory;
      }
    ];
  }).directive('bsTooltip', [
    '$window',
    '$location',
    '$sce',
    '$tooltip',
    function ($window, $location, $sce, $tooltip) {
      var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
      return {
        restrict: 'EAC',
        scope: true,
        link: function postLink(scope, element, attr, transclusion) {
          var options = { scope: scope };
          angular.forEach([
            'placement',
            'container',
            'delay',
            'trigger',
            'keyboard',
            'html',
            'animation',
            'type',
            'template'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          angular.forEach(['title'], function (key) {
            attr[key] && attr.$observe(key, function (newValue, oldValue) {
              scope[key] = newValue;
              angular.isDefined(oldValue) && requestAnimationFrame(function () {
                tooltip && tooltip.$applyPlacement();
              });
            });
          });
          attr.bsTooltip && scope.$watch(attr.bsTooltip, function (newValue, oldValue) {
            if (angular.isObject(newValue)) {
              angular.extend(scope, newValue);
            } else {
              scope.content = newValue;
            }
            angular.isDefined(oldValue) && requestAnimationFrame(function () {
              tooltip && tooltip.$applyPlacement();
            });
          }, true);
          var tooltip = $tooltip(element, options);
          scope.$on('$destroy', function () {
            tooltip.destroy();
            options = null;
            tooltip = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.typeahead', [
    'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.helpers.parseOptions'
  ]).run([
    '$templateCache',
    function ($templateCache) {
      var template = '' + '<ul tabindex="-1" class="typeahead dropdown-menu" ng-show="$isVisible()" role="select">' + '<li role="presentation" ng-repeat="match in $matches" ng-class="{active: $index == $activeIndex}">' + '<a role="menuitem" tabindex="-1" ng-click="$select($index, $event)" ng-bind="match.label"></a>' + '</li>' + '</ul>';
      $templateCache.put('$typeahead', template);
    }
  ]).provider('$typeahead', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        prefixClass: 'typeahead',
        placement: 'bottom-left',
        template: '$typeahead',
        trigger: 'focus',
        container: false,
        keyboard: true,
        html: false,
        delay: 0,
        minLength: 1,
        limit: 6
      };
    this.$get = [
      '$window',
      '$rootScope',
      '$tooltip',
      function ($window, $rootScope, $tooltip) {
        var bodyEl = angular.element($window.document.body);
        function TypeaheadFactory(element, config) {
          var $typeahead = {};
          var options = angular.extend({}, defaults, config);
          var controller = options.controller;
          $typeahead = $tooltip(element, options);
          var parentScope = config.scope;
          var scope = $typeahead.$scope;
          scope.$matches = [];
          scope.$activeIndex = 0;
          scope.$activate = function (index) {
            scope.$$postDigest(function () {
              $typeahead.activate(index);
            });
          };
          scope.$select = function (index, evt) {
            scope.$$postDigest(function () {
              $typeahead.select(index);
            });
          };
          scope.$isVisible = function () {
            return $typeahead.$isVisible();
          };
          $typeahead.update = function (matches) {
            scope.$matches = matches;
            if (scope.$activeIndex >= matches.length) {
              scope.$activeIndex = 0;
            }
          };
          $typeahead.activate = function (index) {
            scope.$activeIndex = index;
          };
          $typeahead.select = function (index) {
            var value = scope.$matches[index].value;
            if (controller) {
              controller.$setViewValue(value);
              controller.$render();
              if (parentScope)
                parentScope.$digest();
            }
            if (options.trigger === 'focus')
              element[0].blur();
            else if ($typeahead.$isShown)
              $typeahead.hide();
            scope.$activeIndex = 0;
            scope.$emit('$typeahead.select', value, index);
          };
          $typeahead.$isVisible = function () {
            if (!options.minLength || !controller) {
              return !!scope.$matches.length;
            }
            return scope.$matches.length && controller.$viewValue.length >= options.minLength;
          };
          $typeahead.$onMouseDown = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
          };
          $typeahead.$onKeyDown = function (evt) {
            if (!/(38|40|13)/.test(evt.keyCode))
              return;
            evt.preventDefault();
            evt.stopPropagation();
            if (evt.keyCode === 13) {
              return $typeahead.select(scope.$activeIndex);
            }
            if (evt.keyCode === 38 && scope.$activeIndex > 0)
              scope.$activeIndex--;
            else if (evt.keyCode === 40 && scope.$activeIndex < scope.$matches.length - 1)
              scope.$activeIndex++;
            else if (angular.isUndefined(scope.$activeIndex))
              scope.$activeIndex = 0;
            scope.$digest();
          };
          var show = $typeahead.show;
          $typeahead.show = function () {
            show();
            setTimeout(function () {
              $typeahead.$element.on('mousedown', $typeahead.$onMouseDown);
              if (options.keyboard) {
                element.on('keydown', $typeahead.$onKeyDown);
              }
            });
          };
          var hide = $typeahead.hide;
          $typeahead.hide = function () {
            $typeahead.$element.off('mousedown', $typeahead.$onMouseDown);
            if (options.keyboard) {
              element.off('keydown', $typeahead.$onKeyDown);
            }
            hide();
          };
          return $typeahead;
        }
        TypeaheadFactory.defaults = defaults;
        return TypeaheadFactory;
      }
    ];
  }).directive('bsTypeahead', [
    '$window',
    '$parse',
    '$q',
    '$typeahead',
    '$parseOptions',
    function ($window, $parse, $q, $typeahead, $parseOptions) {
      var defaults = $typeahead.defaults;
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
            'limit',
            'minLength'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          var limit = options.limit || defaults.limit;
          var parsedOptions = $parseOptions(attr.ngOptions + ' | filter:$viewValue |\xa0limitTo:' + limit);
          var typeahead = $typeahead(element, options);
          scope.$watch(attr.ngModel, function (newValue, oldValue) {
            parsedOptions.valuesFn(scope, controller).then(function (values) {
              if (values.length > limit)
                values = values.slice(0, limit);
              typeahead.update(values);
            });
          });
          scope.$on('$destroy', function () {
            typeahead.destroy();
            options = null;
            typeahead = null;
          });
        }
      };
    }
  ]);
}(window, document));