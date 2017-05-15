/*! Angular Moment Picker - v0.9.10 - http://indrimuska.github.io/angular-moment-picker - (c) 2015 Indri Muska - MIT */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(16);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(2);
	var provider_1 = __webpack_require__(3);
	exports.Provider = provider_1["default"];
	var directive_1 = __webpack_require__(4);
	exports.Directive = directive_1["default"];
	angular
	    .module('moment-picker', [])
	    .provider('momentPicker', [function () { return new provider_1["default"](); }])
	    .directive('momentPicker', [
	    '$timeout', '$sce', '$log', '$window', 'momentPicker', '$compile', '$templateCache',
	    function ($timeout, $sce, $log, $window, momentPicker, $compile, $templateCache) {
	        return new directive_1["default"]($timeout, $sce, $log, $window, momentPicker, $compile, $templateCache);
	    }
	]);


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = angular;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(2);
	var Provider = (function () {
	    function Provider() {
	        this.settings = {
	            locale: 'en',
	            format: 'L LTS',
	            minView: 'decade',
	            maxView: 'minute',
	            startView: 'year',
	            inline: false,
	            validate: true,
	            autoclose: true,
	            setOnSelect: false,
	            today: false,
	            keyboard: false,
	            showHeader: true,
	            leftArrow: '&larr;',
	            rightArrow: '&rarr;',
	            // Decade View
	            yearsFormat: 'YYYY',
	            // Year View
	            monthsFormat: 'MMM',
	            // Month View
	            daysFormat: 'D',
	            // Day View
	            hoursFormat: 'HH:[00]',
	            hoursStart: 0,
	            hoursEnd: 23,
	            // Hour View
	            minutesStep: 5,
	            minutesStart: 0,
	            minutesEnd: 59,
	            // Minute View
	            secondsFormat: 'ss',
	            secondsStep: 1,
	            secondsStart: 0,
	            secondsEnd: 59
	        };
	    }
	    Provider.prototype.options = function (options) {
	        angular.extend(this.settings, options);
	        return angular.copy(this.settings);
	    };
	    Provider.prototype.$get = function () {
	        return this.settings;
	    };
	    return Provider;
	}());
	exports.__esModule = true;
	exports["default"] = Provider;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(2);
	var moment = __webpack_require__(5);
	var helpers_1 = __webpack_require__(6);
	var views_1 = __webpack_require__(7);
	var utility_1 = __webpack_require__(9);
	var templateHtml = __webpack_require__(15);
	var Directive = (function () {
	    function Directive($timeout, $sce, $log, $window, provider, $compile, $templateCache) {
	        var _this = this;
	        this.$timeout = $timeout;
	        this.$sce = $sce;
	        this.$log = $log;
	        this.$window = $window;
	        this.provider = provider;
	        this.$compile = $compile;
	        this.$templateCache = $templateCache;
	        this.restrict = 'AE';
	        this.require = '?ngModel';
	        this.transclude = true;
	        this.template = templateHtml;
	        this.scope = {
	            value: '=?momentPicker',
	            model: '=?ngModel',
	            locale: '@?',
	            format: '@?',
	            minView: '@?',
	            maxView: '@?',
	            startView: '@?',
	            minDate: '=?',
	            maxDate: '=?',
	            startDate: '=?',
	            disabled: '=?disable',
	            position: '@?',
	            inline: '@?',
	            validate: '=?',
	            autoclose: '=?',
	            setOnSelect: '=?',
	            isOpen: '=?',
	            today: '=?',
	            keyboard: '=?',
	            showHeader: '=?',
	            additions: '=?',
	            change: '&?',
	            selectable: '&?'
	        };
	        this.link = function ($scope, $element, $attrs, $ctrl, $transclude) {
	            $transclude(function ($transElement) {
	                // one-way binding attributes
	                angular.forEach([
	                    'locale', 'format', 'minView', 'maxView', 'startView', 'position', 'inline', 'validate', 'autoclose', 'setOnSelect', 'today',
	                    'keyboard', 'showHeader', 'leftArrow', 'rightArrow', 'additions'
	                ], function (attr) {
	                    if (!angular.isDefined($scope[attr]))
	                        $scope[attr] = _this.provider[attr];
	                    if (!angular.isDefined($attrs[attr]))
	                        $attrs[attr] = $scope[attr];
	                });
	                // check if ngModel has been set
	                if (!$attrs['ngModel'])
	                    $ctrl = {};
	                // limits
	                $scope.limits = {
	                    minDate: utility_1.toMoment($scope.minDate, $scope.format, $scope.locale),
	                    maxDate: utility_1.toMoment($scope.maxDate, $scope.format, $scope.locale),
	                    isAfterOrEqualMin: function (value, precision) {
	                        return !angular.isDefined($scope.limits.minDate) || value.isAfter($scope.limits.minDate, precision) || value.isSame($scope.limits.minDate, precision);
	                    },
	                    isBeforeOrEqualMax: function (value, precision) {
	                        return !angular.isDefined($scope.limits.maxDate) || value.isBefore($scope.limits.maxDate, precision) || value.isSame($scope.limits.maxDate, precision);
	                    },
	                    isSelectable: function (value, precision) {
	                        var selectable = true;
	                        try {
	                            if (angular.isFunction($scope.selectable) && $attrs['selectable'])
	                                selectable = $scope.selectable({ date: value, type: precision });
	                        }
	                        catch (e) {
	                            _this.$log.error(e);
	                        }
	                        return $scope.limits.isAfterOrEqualMin(value, precision) && $scope.limits.isBeforeOrEqualMax(value, precision) && selectable;
	                    },
	                    checkValue: function () {
	                        if (!utility_1.isValidMoment($ctrl.$modelValue) || !$scope.validate)
	                            return;
	                        if (!$scope.limits.isAfterOrEqualMin($ctrl.$modelValue))
	                            utility_1.setValue($scope.limits.minDate, $scope, $ctrl, $attrs);
	                        if (!$scope.limits.isBeforeOrEqualMax($ctrl.$modelValue))
	                            utility_1.setValue($scope.limits.maxDate, $scope, $ctrl, $attrs);
	                    },
	                    checkView: function () {
	                        if (!angular.isDefined($scope.view.moment))
	                            $scope.view.moment = moment().locale($scope.locale);
	                        if (!$scope.limits.isAfterOrEqualMin($scope.view.moment))
	                            $scope.view.moment = $scope.limits.minDate.clone();
	                        if (!$scope.limits.isBeforeOrEqualMax($scope.view.moment))
	                            $scope.view.moment = $scope.limits.maxDate.clone();
	                        $scope.view.update();
	                        $scope.view.render();
	                    }
	                };
	                $scope.views = {
	                    all: ['decade', 'year', 'month', 'day', 'hour', 'minute'],
	                    precisions: { decade: 'year', year: 'month', month: 'date', day: 'hour', hour: 'minute', minute: 'second' },
	                    // for each view, `$scope.views.formats` object contains the available moment formats
	                    // formats present in more views are used to perform min/max view detection (i.e. 'LTS', 'LT', ...)
	                    formats: {
	                        decade: 'Y{1,2}(?!Y)|YYYY|[Ll]{1,4}(?!T)',
	                        /* formats: Y,YY,YYYY,L,LL,LLL,LLLL,l,ll,lll,llll */
	                        year: 'M{1,4}(?![Mo])|Mo|Q',
	                        /* formats: M,MM,MMM,MMM,Mo,Q */
	                        month: '[Dd]{1,4}(?![Ddo])|DDDo|[Dd]o|[Ww]{1,2}(?![Wwo])|[Ww]o|[Ee]|L{1,2}(?!T)|l{1,2}',
	                        /* formats: D,DD,DDD,DDDD,d,dd,ddd,dddd,DDDo,Do,do,W,WW,w,ww,Wo,wo,E,e,L,LL,l,ll */
	                        day: '[Hh]{1,2}|LTS?',
	                        /* formats: H,HH,h,hh,LT,LTS */
	                        hour: 'm{1,2}|[Ll]{3,4}|LT(?!S)',
	                        /* formats: m,mm,LLL,LLLL,lll,llll,LT */
	                        minute: 's{1,2}|S{1,}|X|LTS'
	                    },
	                    detectMinMax: function () {
	                        $scope.detectedMinView = $scope.detectedMaxView = undefined;
	                        if (!$scope.format)
	                            return;
	                        var minView, maxView;
	                        angular.forEach($scope.views.formats, function (formats, view) {
	                            var regexp = new RegExp('(' + formats + ')(?![^\[]*\])', 'g');
	                            if (!$scope.format.match(regexp))
	                                return;
	                            if (!angular.isDefined(minView))
	                                minView = view;
	                            maxView = view;
	                        });
	                        if (!angular.isDefined(minView))
	                            minView = 0;
	                        else
	                            minView = Math.max(0, $scope.views.all.indexOf(minView));
	                        if (!angular.isDefined(maxView))
	                            maxView = $scope.views.all.length - 1;
	                        else
	                            maxView = Math.min($scope.views.all.length - 1, $scope.views.all.indexOf(maxView));
	                        if (minView > $scope.views.all.indexOf($scope.minView))
	                            $scope.minView = $scope.views.all[minView];
	                        if (maxView < $scope.views.all.indexOf($scope.maxView))
	                            $scope.maxView = $scope.views.all[maxView];
	                        // save detected min/max view to use them to update the model value properly
	                        $scope.detectedMinView = $scope.views.all[minView];
	                        $scope.detectedMaxView = $scope.views.all[maxView];
	                    },
	                    // specific views
	                    decade: new views_1.DecadeView($scope, $ctrl, _this.provider),
	                    year: new views_1.YearView($scope, $ctrl, _this.provider),
	                    month: new views_1.MonthView($scope, $ctrl, _this.provider),
	                    day: new views_1.DayView($scope, $ctrl, _this.provider),
	                    hour: new views_1.HourView($scope, $ctrl, _this.provider),
	                    minute: new views_1.MinuteView($scope, $ctrl, _this.provider)
	                };
	                $scope.view = {
	                    moment: undefined,
	                    value: undefined,
	                    isOpen: false,
	                    selected: $scope.startView,
	                    update: function () { $scope.view.value = utility_1.momentToValue($scope.view.moment, $scope.format); },
	                    toggle: function () { $scope.view.isOpen ? $scope.view.close() : $scope.view.open(); },
	                    open: function () {
	                        if ($scope.disabled || $scope.view.isOpen || $scope.inline)
	                            return;
	                        $scope.isOpen = true;
	                        $scope.view.isOpen = true;
	                        _this.$timeout($scope.view.position, 0, false);
	                    },
	                    close: function () {
	                        if (!$scope.view.isOpen || $scope.inline)
	                            return;
	                        $scope.isOpen = false;
	                        $scope.view.isOpen = false;
	                        $scope.view.selected = $scope.startView;
	                    },
	                    position: function () {
	                        if (!$scope.view.isOpen || $scope.position || $scope.inline)
	                            return;
	                        $scope.picker.removeClass('top').removeClass('right');
	                        var container = $scope.container[0], offset = helpers_1.getOffset(container), top = offset.top - _this.$window.pageYOffset, left = offset.left - _this.$window.pageXOffset, winWidth = _this.$window.innerWidth, winHeight = _this.$window.innerHeight;
	                        if (top + _this.$window.pageYOffset - container.offsetHeight > 0 && top > winHeight / 2)
	                            $scope.picker.addClass('top');
	                        if (left + container.offsetWidth > winWidth)
	                            $scope.picker.addClass('right');
	                    },
	                    keydown: function (e) {
	                        var view = $scope.views[$scope.view.selected], precision = $scope.views.precisions[$scope.view.selected].replace('date', 'day'), singleUnit = _this.provider[precision + 'sStep'] || 1, operation = [utility_1.KEYS.up, utility_1.KEYS.left].indexOf(e.keyCode) >= 0 ? 'subtract' : 'add', highlight = function (vertical) {
	                            var unitMultiplier = vertical ? view.perLine : 1, nextDate = $scope.view.moment.clone()[operation](singleUnit * unitMultiplier, precision);
	                            if ($scope.limits.isSelectable(nextDate, precision)) {
	                                $scope.view.moment = nextDate;
	                                $scope.view.update();
	                                $scope.view.render();
	                            }
	                        };
	                        switch (e.keyCode) {
	                            case utility_1.KEYS.up:
	                            case utility_1.KEYS.down:
	                                e.preventDefault();
	                                if (!$scope.view.isOpen)
	                                    $scope.view.open();
	                                else
	                                    highlight(true);
	                                break;
	                            case utility_1.KEYS.left:
	                            case utility_1.KEYS.right:
	                                if (!$scope.view.isOpen)
	                                    break;
	                                e.preventDefault();
	                                highlight();
	                                break;
	                            case utility_1.KEYS.enter:
	                                if (!$scope.view.isOpen)
	                                    break;
	                                $scope.view.change(precision);
	                                e.preventDefault();
	                                break;
	                            case utility_1.KEYS.escape:
	                                $scope.view.toggle();
	                                break;
	                        }
	                    },
	                    // utility
	                    unit: function () { return $scope.view.selected == 'decade' ? 10 : 1; },
	                    precision: function () { return $scope.view.selected.replace('decade', 'year'); },
	                    // header
	                    title: '',
	                    previous: {
	                        label: _this.$sce.trustAsHtml($scope.leftArrow),
	                        selectable: true,
	                        set: function () {
	                            if ($scope.view.previous.selectable) {
	                                $scope.view.moment.subtract($scope.view.unit(), $scope.view.precision());
	                                $scope.view.update();
	                                $scope.view.render();
	                            }
	                        }
	                    },
	                    next: {
	                        selectable: true,
	                        label: _this.$sce.trustAsHtml($scope.rightArrow),
	                        set: function () {
	                            if ($scope.view.next.selectable) {
	                                $scope.view.moment.add($scope.view.unit(), $scope.view.precision());
	                                $scope.view.update();
	                                $scope.view.render();
	                            }
	                        }
	                    },
	                    setParentView: function () { $scope.view.change($scope.views.all[Math.max(0, $scope.views.all.indexOf($scope.view.selected) - 1)]); },
	                    // body
	                    render: function () {
	                        var momentPrevious = $scope.view.moment.clone().startOf($scope.view.precision()).subtract($scope.view.unit(), $scope.view.precision()), momentNext = $scope.view.moment.clone().endOf($scope.view.precision()).add($scope.view.unit(), $scope.view.precision());
	                        $scope.view.previous.selectable = $scope.limits.isAfterOrEqualMin(momentPrevious, $scope.view.precision());
	                        $scope.view.previous.label = _this.$sce.trustAsHtml($scope.view.previous.selectable ? $scope.leftArrow : '&nbsp;');
	                        $scope.view.next.selectable = $scope.limits.isBeforeOrEqualMax(momentNext, $scope.view.precision());
	                        $scope.view.next.label = _this.$sce.trustAsHtml($scope.view.next.selectable ? $scope.rightArrow : '&nbsp;');
	                        $scope.view.title = $scope.views[$scope.view.selected].render();
	                    },
	                    change: function (view) {
	                        var nextView = $scope.views.all.indexOf(view), minView = $scope.views.all.indexOf($scope.minView), maxView = $scope.views.all.indexOf($scope.maxView);
	                        var update = function () {
	                            utility_1.setValue($scope.view.moment, $scope, $ctrl, $attrs);
	                            $scope.view.update();
	                            if ($attrs['ngModel'])
	                                $ctrl.$commitViewValue();
	                        };
	                        if ($scope.setOnSelect)
	                            update();
	                        if (nextView < 0 || nextView > maxView) {
	                            if (!$scope.setOnSelect)
	                                update();
	                            if ($scope.autoclose)
	                                _this.$timeout($scope.view.close);
	                        }
	                        else if (nextView >= minView)
	                            $scope.view.selected = view;
	                    }
	                };
	                // creation
	                $scope.picker = angular.element($element[0].querySelectorAll('.moment-picker'));
	                $element.after($scope.picker);
	                $scope.contents = angular.element($scope.picker[0].querySelectorAll('.moment-picker-contents'));
	                $scope.container = angular.element($scope.picker[0].querySelectorAll('.moment-picker-container'));
	                $scope.contents.append($element.append($transElement));
	                $scope.input = $scope.contents[0].tagName.toLowerCase() != 'input' && $scope.contents[0].querySelectorAll('input').length > 0
	                    ? angular.element($scope.contents[0].querySelectorAll('input'))
	                    : angular.element($scope.contents[0]);
	                $scope.input.addClass('moment-picker-input').attr('tabindex', 0);
	                ($scope.position || '').split(' ').forEach(function (className) { return $scope.picker.addClass(className); });
	                // transclude scope to template additions
	                _this.$timeout(function () {
	                    angular.forEach($scope.additions || {}, function (tempalteUrl, key) {
	                        var placeholder = angular.element($scope.container[0].querySelector('.moment-picker-addition.' + key));
	                        var template = _this.$templateCache.get(tempalteUrl);
	                        var compiled = _this.$compile(template)($scope.$parent);
	                        placeholder.append(compiled);
	                    });
	                });
	                // initialization
	                $scope.views.detectMinMax();
	                $scope.limits.checkView();
	                // model controller is initialized after linking function
	                _this.$timeout(function () {
	                    if ($attrs['ngModel']) {
	                        if (!$ctrl.$modelValue && $scope.value)
	                            $ctrl.$setViewValue($scope.value);
	                        $ctrl.$commitViewValue();
	                        $ctrl.$render();
	                    }
	                    // view initialization
	                    if ($scope.startDate)
	                        $scope.view.moment = utility_1.toMoment($scope.startDate, $scope.format, $scope.locale);
	                    else if (utility_1.isValidMoment($ctrl.$modelValue))
	                        $scope.view.moment = $ctrl.$modelValue.clone();
	                    $scope.view.update();
	                    $scope.view.render();
	                });
	                // model <-> view conversion
	                if ($attrs['ngModel']) {
	                    $ctrl.$parsers.push(function (viewValue) { return utility_1.updateMoment($ctrl.$modelValue, utility_1.valueToMoment(viewValue, $scope), $scope) || true; });
	                    $ctrl.$formatters.push(function (modelValue) { return utility_1.momentToValue(modelValue, $scope.format) || ''; });
	                    $ctrl.$viewChangeListeners.push(function () { if ($attrs['ngModel'] != $attrs['momentPicker'])
	                        $scope.value = $ctrl.$viewValue; });
	                    $ctrl.$validators.minDate = function (value) { return $scope.validate || !utility_1.isValidMoment(value) || $scope.limits.isAfterOrEqualMin(value); };
	                    $ctrl.$validators.maxDate = function (value) { return $scope.validate || !utility_1.isValidMoment(value) || $scope.limits.isBeforeOrEqualMax(value); };
	                }
	                // properties listeners
	                if ($attrs['ngModel'] != $attrs['momentPicker'])
	                    $scope.$watch('value', function (newValue, oldValue) {
	                        if (newValue !== oldValue)
	                            utility_1.setValue(newValue, $scope, $ctrl, $attrs);
	                    });
	                $scope.$watch(function () { return utility_1.momentToValue($ctrl.$modelValue, $scope.format); }, function (newViewValue, oldViewValue) {
	                    if (newViewValue == oldViewValue)
	                        return;
	                    var newModelValue = utility_1.valueToMoment(newViewValue, $scope);
	                    utility_1.setValue(newModelValue, $scope, $ctrl, $attrs);
	                    $scope.limits.checkValue();
	                    $scope.view.moment = (newModelValue || moment().locale($scope.locale)).clone();
	                    $scope.view.update();
	                    $scope.view.render();
	                    if (angular.isFunction($scope.change) && $attrs['change']) {
	                        var oldModelValue_1 = utility_1.valueToMoment(oldViewValue, $scope);
	                        $scope.$evalAsync(function () { return $scope.change({ newValue: newModelValue, oldValue: oldModelValue_1 }); });
	                    }
	                });
	                $scope.$watch(function () { return $ctrl.$modelValue && $ctrl.$modelValue.valueOf(); }, function () {
	                    var viewMoment = (utility_1.isValidMoment($ctrl.$modelValue) ? $ctrl.$modelValue : moment().locale($scope.locale)).clone();
	                    if (!viewMoment.isSame($scope.view.moment)) {
	                        $scope.view.moment = viewMoment;
	                        $scope.view.update();
	                        $scope.view.render();
	                    }
	                });
	                $scope.$watch('view.selected', function () { return $scope.view.render(); });
	                $scope.$watchGroup(['minView', 'maxView'], function () {
	                    // auto-detect minView/maxView
	                    $scope.views.detectMinMax();
	                    // limit startView
	                    $scope.startView = $scope.views.all[Math.max(Math.min($scope.views.all.indexOf($scope.startView), $scope.views.all.indexOf($scope.maxView)), $scope.views.all.indexOf($scope.minView))];
	                    $scope.view.selected = $scope.startView;
	                });
	                $scope.$watchGroup([
	                    function () { return utility_1.toValue($scope.minDate, $scope.format, $scope.locale); },
	                    function () { return utility_1.toValue($scope.maxDate, $scope.format, $scope.locale); }
	                ], function () {
	                    angular.forEach(['minDate', 'maxDate'], function (field) {
	                        $scope.limits[field] = utility_1.toMoment($scope[field], $scope.format, $scope.locale);
	                    });
	                    $scope.limits.checkValue();
	                    $scope.limits.checkView();
	                    $scope.view.render();
	                });
	                $scope.$watch(function () { return utility_1.toValue($scope.startDate, $scope.format, $scope.locale); }, function (newViewValue, oldViewValue) {
	                    if (newViewValue == oldViewValue)
	                        return;
	                    $scope.view.moment = utility_1.valueToMoment(newViewValue, $scope);
	                    $scope.view.update();
	                    $scope.view.render();
	                });
	                $attrs.$observe('locale', function (locale) { return $scope.locale = locale; });
	                $scope.$watch('locale', function (locale, previous) {
	                    if (!angular.isDefined(previous) || locale == previous)
	                        return;
	                    if (utility_1.isValidMoment($ctrl.$modelValue))
	                        utility_1.setValue($ctrl.$modelValue.locale(locale), $scope, $ctrl, $attrs);
	                    if (utility_1.isValidMoment($scope.view.moment))
	                        $scope.view.moment = $scope.view.moment.locale(locale);
	                    if (utility_1.isValidMoment($scope.limits.minDate))
	                        $scope.limits.minDate = $scope.limits.minDate.locale(locale);
	                    if (utility_1.isValidMoment($scope.limits.maxDate))
	                        $scope.limits.maxDate = $scope.limits.maxDate.locale(locale);
	                    $scope.view.render();
	                });
	                $scope.$watch('validate', $scope.limits.checkValue);
	                $scope.$watch('isOpen', function (isOpen) {
	                    if ($scope.inline)
	                        $scope.view.isOpen = true;
	                    else if (angular.isDefined(isOpen) && isOpen != $scope.view.isOpen)
	                        $scope.view.toggle();
	                });
	                // event listeners
	                var focusInput = function (e) {
	                    if (e)
	                        e.preventDefault();
	                    $scope.input[0].focus();
	                };
	                $scope.input
	                    .on('focus click', function () { return $scope.$evalAsync($scope.view.open); })
	                    .on('blur', function () { return $scope.$evalAsync($scope.view.close); })
	                    .on('keydown', function (e) { return $scope.keyboard && $scope.$evalAsync(function () { return $scope.view.keydown(e); }); });
	                $scope.contents.on('click', function () { return focusInput(); });
	                $scope.container.on('mousedown', function (e) { return focusInput(e); });
	                angular.element(_this.$window).on('resize scroll', $scope.view.position);
	            });
	        };
	    }
	    return Directive;
	}());
	exports.__esModule = true;
	exports["default"] = Directive;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = moment;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Offset getter method from jQuery: https://github.com/jquery/jquery/blob/3.1.1/src/offset.js#L78
	 */
	exports.getOffset = function (element) {
	    if (!element)
	        return;
	    if (!element.getClientRects().length)
	        return { top: 0, left: 0 };
	    // https://github.com/jquery/jquery/blob/3.1.1/src/core.js#L220
	    var isWindow = function (obj) { return obj != null && obj === obj.window; };
	    var getWindow = function (elem) { return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView; }; // tslint:disable-line:no-any
	    var rect = element.getBoundingClientRect();
	    if (!rect.width && !rect.height)
	        return rect;
	    var doc = element.ownerDocument;
	    var win = getWindow(doc);
	    var docElem = doc.documentElement;
	    return {
	        top: rect.top + win.pageYOffset - docElem.clientTop,
	        left: rect.left + win.pageXOffset - docElem.clientLeft
	    };
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var decadeView_1 = __webpack_require__(8);
	exports.DecadeView = decadeView_1["default"];
	var yearView_1 = __webpack_require__(10);
	exports.YearView = yearView_1["default"];
	var monthView_1 = __webpack_require__(11);
	exports.MonthView = monthView_1["default"];
	var dayView_1 = __webpack_require__(12);
	exports.DayView = dayView_1["default"];
	var hourView_1 = __webpack_require__(13);
	exports.HourView = hourView_1["default"];
	var minuteView_1 = __webpack_require__(14);
	exports.MinuteView = minuteView_1["default"];


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utility_1 = __webpack_require__(9);
	var DecadeView = (function () {
	    function DecadeView($scope, $ctrl, provider) {
	        this.$scope = $scope;
	        this.$ctrl = $ctrl;
	        this.provider = provider;
	        this.perLine = 4;
	        this.rows = {};
	    }
	    DecadeView.prototype.render = function () {
	        var year = this.$scope.view.moment.clone(), firstYear = Math.floor(year.year() / 10) * 10 - 1;
	        this.rows = {};
	        year.year(firstYear);
	        for (var y = 0; y < 12; y++) {
	            var index = Math.floor(y / this.perLine), selectable = this.$scope.limits.isSelectable(year, 'year');
	            if (!this.rows[index])
	                this.rows[index] = [];
	            this.rows[index].push({
	                index: year.year(),
	                label: year.format(this.provider.yearsFormat),
	                year: year.year(),
	                "class": [
	                    this.$scope.keyboard && year.isSame(this.$scope.view.moment, 'year') ? 'highlighted' : '',
	                    !selectable || [0, 11].indexOf(y) >= 0 ? 'disabled' : utility_1.isValidMoment(this.$ctrl.$modelValue) && year.isSame(this.$ctrl.$modelValue, 'year') ? 'selected' : ''
	                ].join(' ').trim(),
	                selectable: selectable
	            });
	            year.add(1, 'years');
	        }
	        // return title
	        return [year.subtract(2, 'years').format('YYYY'), year.subtract(9, 'years').format('YYYY')].reverse().join(' - ');
	    };
	    DecadeView.prototype.set = function (year) {
	        if (!year.selectable)
	            return;
	        this.$scope.view.moment.year(year.year);
	        this.$scope.view.update();
	        this.$scope.view.change('year');
	    };
	    return DecadeView;
	}());
	exports.__esModule = true;
	exports["default"] = DecadeView;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(2);
	var moment = __webpack_require__(5);
	exports.KEYS = { up: 38, down: 40, left: 37, right: 39, escape: 27, enter: 13 };
	exports.isValidMoment = function (value) {
	    return moment.isMoment(value) && value.isValid();
	};
	exports.toValue = function (date, format, locale) {
	    var momentDate = date;
	    if (!exports.isValidMoment(date))
	        momentDate = exports.toMoment(date, format, locale);
	    return exports.momentToValue(momentDate, format);
	};
	exports.toMoment = function (date, format, locale) {
	    var momentDate = moment(date, format, locale);
	    if (!exports.isValidMoment(momentDate))
	        momentDate = undefined;
	    return momentDate;
	};
	exports.momentToValue = function (momentObject, format) {
	    if (!exports.isValidMoment(momentObject))
	        return undefined;
	    return !format ? momentObject.valueOf() : momentObject.format(format);
	};
	exports.valueToMoment = function (formattedValue, $scope) {
	    var momentValue;
	    if (!formattedValue)
	        return momentValue;
	    if (!$scope.format)
	        momentValue = moment(formattedValue);
	    else
	        momentValue = moment(formattedValue, $scope.format, $scope.locale);
	    if ($scope.model) {
	        // set value for each view precision (from Decade View to minView)
	        var views = $scope.views.all.slice(0, $scope.views.all.indexOf($scope.detectedMinView));
	        angular.forEach(views, function (view) {
	            var precision = $scope.views.precisions[view];
	            momentValue[precision]($scope.model[precision]());
	        });
	    }
	    return momentValue;
	};
	exports.setValue = function (value, $scope, $ctrl, $attrs) {
	    var modelValue = exports.isValidMoment(value) ? value.clone() : exports.valueToMoment(value, $scope), viewValue = exports.momentToValue(modelValue, $scope.format);
	    exports.updateMoment($scope.model, modelValue, $scope);
	    exports.updateMoment($ctrl.$modelValue, modelValue, $scope);
	    if ($attrs['ngModel'] != $attrs['momentPicker'])
	        $scope.value = viewValue;
	    if ($attrs['ngModel']) {
	        $ctrl.$setViewValue(viewValue);
	        $ctrl.$render(); // render input value
	    }
	};
	exports.updateMoment = function (model, value, $scope) {
	    if (!exports.isValidMoment(model) || !value)
	        model = value;
	    else {
	        if (!model.isSame(value)) {
	            // set value for each view precision (from Decade View to maxView)
	            var views = $scope.views.all.slice(0, $scope.views.all.indexOf($scope.detectedMaxView) + 1);
	            angular.forEach(views, function (view) {
	                var precision = $scope.views.precisions[view];
	                model[precision](value[precision]());
	            });
	        }
	    }
	    return model;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var moment = __webpack_require__(5);
	var utility_1 = __webpack_require__(9);
	var YearView = (function () {
	    function YearView($scope, $ctrl, provider) {
	        this.$scope = $scope;
	        this.$ctrl = $ctrl;
	        this.provider = provider;
	        this.perLine = 4;
	        this.rows = {};
	    }
	    YearView.prototype.render = function () {
	        var _this = this;
	        var month = this.$scope.view.moment.clone().startOf('year'), months = moment.monthsShort();
	        this.rows = {};
	        months.forEach(function (label, i) {
	            var index = Math.floor(i / _this.perLine), selectable = _this.$scope.limits.isSelectable(month, 'month');
	            if (!_this.rows[index])
	                _this.rows[index] = [];
	            _this.rows[index].push({
	                index: month.month(),
	                label: month.format(_this.provider.monthsFormat),
	                year: month.year(),
	                month: month.month(),
	                "class": [
	                    _this.$scope.keyboard && month.isSame(_this.$scope.view.moment, 'month') ? 'highlighted' : '',
	                    !selectable ? 'disabled' : utility_1.isValidMoment(_this.$ctrl.$modelValue) && month.isSame(_this.$ctrl.$modelValue, 'month') ? 'selected' : ''
	                ].join(' ').trim(),
	                selectable: selectable
	            });
	            month.add(1, 'months');
	        });
	        // return title
	        return this.$scope.view.moment.format('YYYY');
	    };
	    YearView.prototype.set = function (month) {
	        if (!month.selectable)
	            return;
	        this.$scope.view.moment.year(month.year).month(month.month);
	        this.$scope.view.update();
	        this.$scope.view.change('month');
	    };
	    return YearView;
	}());
	exports.__esModule = true;
	exports["default"] = YearView;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(2);
	var moment = __webpack_require__(5);
	var utility_1 = __webpack_require__(9);
	var MonthView = (function () {
	    function MonthView($scope, $ctrl, provider) {
	        this.$scope = $scope;
	        this.$ctrl = $ctrl;
	        this.provider = provider;
	        this.perLine = moment.weekdays().length;
	        this.rows = [];
	    }
	    MonthView.prototype.render = function () {
	        var _this = this;
	        var month = this.$scope.view.moment.month(), day = this.$scope.view.moment.clone().startOf('month').startOf('week').hour(12), rows = {}, firstWeek = day.week(), lastWeek = firstWeek + 5;
	        this.rows = [];
	        for (var week = firstWeek; week <= lastWeek; week++)
	            rows[week] = Array.apply(null, Array(this.perLine)).map(function () {
	                var selectable = _this.$scope.limits.isSelectable(day, 'day');
	                var date = {
	                    index: day.date(),
	                    label: day.format(_this.provider.daysFormat),
	                    year: day.year(),
	                    month: day.month(),
	                    date: day.date(),
	                    "class": [
	                        _this.$scope.keyboard && day.isSame(_this.$scope.view.moment, 'day') ? 'highlighted' : '',
	                        !!_this.$scope.today && day.isSame(new Date(), 'day') ? 'today' : '',
	                        !selectable || day.month() != month ? 'disabled' : utility_1.isValidMoment(_this.$ctrl.$modelValue) && day.isSame(_this.$ctrl.$modelValue, 'day') ? 'selected' : ''
	                    ].join(' ').trim(),
	                    selectable: selectable
	                };
	                day.add(1, 'days');
	                return date;
	            });
	        // object to array - see https://github.com/indrimuska/angular-moment-picker/issues/9
	        angular.forEach(rows, function (row) { return _this.rows.push(row); });
	        // render headers
	        this.headers = moment.weekdays().map(function (d, i) { return moment().locale(_this.$scope.locale).startOf('week').add(i, 'day').format('dd'); });
	        // return title
	        return this.$scope.view.moment.format('MMMM YYYY');
	    };
	    MonthView.prototype.set = function (day) {
	        if (!day.selectable)
	            return;
	        this.$scope.view.moment.year(day.year).month(day.month).date(day.date);
	        this.$scope.view.update();
	        this.$scope.view.change('day');
	    };
	    return MonthView;
	}());
	exports.__esModule = true;
	exports["default"] = MonthView;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utility_1 = __webpack_require__(9);
	var DayView = (function () {
	    function DayView($scope, $ctrl, provider) {
	        this.$scope = $scope;
	        this.$ctrl = $ctrl;
	        this.provider = provider;
	        this.perLine = 4;
	        this.rows = {};
	    }
	    DayView.prototype.render = function () {
	        var hour = this.$scope.view.moment.clone().startOf('day').hour(this.provider.hoursStart);
	        this.rows = {};
	        for (var h = 0; h <= this.provider.hoursEnd - this.provider.hoursStart; h++) {
	            var index = Math.floor(h / this.perLine), selectable = this.$scope.limits.isSelectable(hour, 'hour');
	            if (!this.rows[index])
	                this.rows[index] = [];
	            this.rows[index].push({
	                index: h,
	                label: hour.format(this.provider.hoursFormat),
	                year: hour.year(),
	                month: hour.month(),
	                date: hour.date(),
	                hour: hour.hour(),
	                "class": [
	                    this.$scope.keyboard && hour.isSame(this.$scope.view.moment, 'hour') ? 'highlighted' : '',
	                    !selectable ? 'disabled' : utility_1.isValidMoment(this.$ctrl.$modelValue) && hour.isSame(this.$ctrl.$modelValue, 'hour') ? 'selected' : ''
	                ].join(' ').trim(),
	                selectable: selectable
	            });
	            hour.add(1, 'hours');
	        }
	        // return title
	        return this.$scope.view.moment.format('LL');
	    };
	    DayView.prototype.set = function (hour) {
	        if (!hour.selectable)
	            return;
	        this.$scope.view.moment.year(hour.year).month(hour.month).date(hour.date).hour(hour.hour);
	        this.$scope.view.update();
	        this.$scope.view.change('hour');
	    };
	    return DayView;
	}());
	exports.__esModule = true;
	exports["default"] = DayView;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(2);
	var moment = __webpack_require__(5);
	var utility_1 = __webpack_require__(9);
	var HourView = (function () {
	    function HourView($scope, $ctrl, provider) {
	        this.$scope = $scope;
	        this.$ctrl = $ctrl;
	        this.provider = provider;
	        this.perLine = 4;
	        this.rows = {};
	    }
	    HourView.prototype.render = function () {
	        var i = 0, minute = this.$scope.view.moment.clone().startOf('hour').minute(this.provider.minutesStart), minutesFormat = this.provider.minutesFormat || moment.localeData(this.$scope.locale).longDateFormat('LT').replace(/[aA]/, '').trim();
	        this.rows = {};
	        for (var m = 0; m <= this.provider.minutesEnd - this.provider.minutesStart; m += this.provider.minutesStep) {
	            var index = Math.floor(i / this.perLine), selectable = this.$scope.limits.isSelectable(minute, 'minute');
	            if (!this.rows[index])
	                this.rows[index] = [];
	            this.rows[index].push({
	                index: minute.minute(),
	                label: minute.format(minutesFormat),
	                year: minute.year(),
	                month: minute.month(),
	                date: minute.date(),
	                hour: minute.hour(),
	                minute: minute.minute(),
	                "class": [
	                    this.$scope.keyboard && minute.isSame(this.$scope.view.moment, 'minute') ? 'highlighted' : '',
	                    !selectable ? 'disabled' : utility_1.isValidMoment(this.$ctrl.$modelValue) && minute.isSame(this.$ctrl.$modelValue, 'minute') ? 'selected' : ''
	                ].join(' ').trim(),
	                selectable: selectable
	            });
	            i++;
	            minute.add(this.provider.minutesStep, 'minutes');
	        }
	        if (this.$scope.keyboard)
	            this.highlightClosest();
	        // return title
	        return this.$scope.view.moment.clone().startOf('hour').format('lll');
	    };
	    HourView.prototype.set = function (minute) {
	        if (!minute.selectable)
	            return;
	        this.$scope.view.moment.year(minute.year).month(minute.month).date(minute.date).hour(minute.hour).minute(minute.minute);
	        this.$scope.view.update();
	        this.$scope.view.change('minute');
	    };
	    HourView.prototype.highlightClosest = function () {
	        var _this = this;
	        var minutes = [], minute;
	        angular.forEach(this.rows, function (row) {
	            angular.forEach(row, function (value) {
	                if (Math.abs(value.minute - _this.$scope.view.moment.minute()) < _this.provider.minutesStep)
	                    minutes.push(value);
	            });
	        });
	        minute = minutes.sort(function (value1, value2) {
	            return Math.abs(value1.minute - _this.$scope.view.moment.minute()) > Math.abs(value2.minute - _this.$scope.view.moment.minute()) ? 1 : 0;
	        })[0];
	        if (!minute || minute.minute - this.$scope.view.moment.minute() == 0)
	            return;
	        this.$scope.view.moment.year(minute.year).month(minute.month).date(minute.date).hour(minute.hour).minute(minute.minute);
	        this.$scope.view.update();
	        if (minute.selectable)
	            minute["class"] = (minute["class"] + ' highlighted').trim();
	    };
	    return HourView;
	}());
	exports.__esModule = true;
	exports["default"] = HourView;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(2);
	var utility_1 = __webpack_require__(9);
	var MinuteView = (function () {
	    function MinuteView($scope, $ctrl, provider) {
	        this.$scope = $scope;
	        this.$ctrl = $ctrl;
	        this.provider = provider;
	        this.perLine = 6;
	        this.rows = {};
	    }
	    MinuteView.prototype.render = function () {
	        var i = 0, second = this.$scope.view.moment.clone().startOf('minute').second(this.provider.secondsStart);
	        this.rows = {};
	        for (var s = 0; s <= this.provider.secondsEnd - this.provider.secondsStart; s += this.provider.secondsStep) {
	            var index = Math.floor(i / this.perLine), selectable = this.$scope.limits.isSelectable(second, 'second');
	            if (!this.rows[index])
	                this.rows[index] = [];
	            this.rows[index].push({
	                index: second.second(),
	                label: second.format(this.provider.secondsFormat),
	                year: second.year(),
	                month: second.month(),
	                date: second.date(),
	                hour: second.hour(),
	                minute: second.minute(),
	                second: second.second(),
	                "class": [
	                    this.$scope.keyboard && second.isSame(this.$scope.view.moment, 'second') ? 'highlighted' : '',
	                    !selectable ? 'disabled' : utility_1.isValidMoment(this.$ctrl.$modelValue) && second.isSame(this.$ctrl.$modelValue, 'second') ? 'selected' : ''
	                ].join(' ').trim(),
	                selectable: selectable
	            });
	            i++;
	            second.add(this.provider.secondsStep, 'seconds');
	        }
	        if (this.$scope.keyboard)
	            this.highlightClosest();
	        // return title
	        return this.$scope.view.moment.clone().startOf('minute').format('lll');
	    };
	    MinuteView.prototype.set = function (second) {
	        if (!second.selectable)
	            return;
	        this.$scope.view.moment.year(second.year).month(second.month).date(second.date).hour(second.hour).minute(second.minute).second(second.second);
	        this.$scope.view.update();
	        this.$scope.view.change();
	    };
	    MinuteView.prototype.highlightClosest = function () {
	        var _this = this;
	        var seconds = [], second;
	        angular.forEach(this.rows, function (row) {
	            angular.forEach(row, function (value) {
	                if (Math.abs(value.second - _this.$scope.view.moment.second()) < _this.provider.secondsStep)
	                    seconds.push(value);
	            });
	        });
	        second = seconds.sort(function (value1, value2) {
	            return Math.abs(value1.second - _this.$scope.view.moment.second()) > Math.abs(value2.second - _this.$scope.view.moment.second()) ? 1 : 0;
	        })[0];
	        if (!second || second.second - this.$scope.view.moment.second() == 0)
	            return;
	        this.$scope.view.moment.year(second.year).month(second.month).date(second.date).hour(second.hour).minute(second.minute).second(second.second);
	        this.$scope.view.update();
	        if (second.selectable)
	            second["class"] = (second["class"] + ' highlighted').trim();
	    };
	    return MinuteView;
	}());
	exports.__esModule = true;
	exports["default"] = MinuteView;


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "<div class=moment-picker> <span class=moment-picker-contents></span> <div class=\"moment-picker-container {{view.selected}}-view\" ng-show=\"(view.isOpen && !disabled) || inline\" ng-class=\"{'moment-picker-disabled': disabled, open: view.isOpen, inline: inline}\"> <div ng-if=additions.top class=\"moment-picker-addition top\"></div> <table class=header-view ng-if=showHeader> <thead> <tr> <th ng-class=\"{disabled: !view.previous.selectable}\" ng-bind-html=view.previous.label ng-click=view.previous.set()></th> <th ng-bind=view.title ng-click=view.setParentView()></th> <th ng-class=\"{disabled: !view.next.selectable}\" ng-bind-html=view.next.label ng-click=view.next.set()></th> </tr> </thead> </table> <div class=moment-picker-specific-views> <table> <thead ng-if=views[view.selected].headers> <tr> <th ng-repeat=\"header in views[view.selected].headers\" ng-bind=header></th> </tr> </thead> <tbody> <tr ng-repeat=\"row in views[view.selected].rows\"> <td ng-repeat=\"item in row track by item.index\" ng-class=item.class ng-bind=item.label ng-click=\"!disabled && views[view.selected].set(item)\"></td> </tr> </tbody> </table> </div> <div ng-if=additions.bottom class=\"moment-picker-addition bottom\"></div> </div> </div>";

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);