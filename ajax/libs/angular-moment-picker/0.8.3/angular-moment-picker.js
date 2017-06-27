/*! Angular Moment Picker - v0.8.2 - https://github.com/indrimuska/angular-moment-picker - (c) 2015 Indri Muska - MIT */
(function (angular) {
	'use strict';
	
	var KEYS = { up: 38, down: 40, left: 37, right: 39, escape: 27, enter: 13 };
	
	var momentPickerProvider = (function () {
		var defaults;
		
		function momentPickerProvider() {
			defaults = {
				locale:         'en',
				format:         'L LTS',
				minView:        'decade',
				maxView:        'minute',
				startView:      'year',
				autoclose:      true,
				today:          false,
				keyboard:       false,
				showHeader:     true,
				leftArrow:      '&larr;',
				rightArrow:     '&rarr;',
				// Decade View
				yearsFormat:    'YYYY',
				// Year View
				monthsFormat:   'MMM',
				// Month View
				daysFormat:     'D',
				// Day View
				hoursFormat:    'HH:[00]',
				hoursStart:     0,
				hoursEnd:       23,
				// Hour View
				minutesStep:    5,
				minutesStart:   0,
				minutesEnd:     59,
				// Minute View
				secondsFormat:  'ss',
				secondsStep:    1,
				secondsStart:   0,
				secondsEnd:     59,
			};
		}
		momentPickerProvider.prototype.options = function (options) {
			angular.extend(defaults, options);
			return angular.copy(defaults);
		};
		momentPickerProvider.prototype.$get = function () {
			return defaults;
		};
		
		return momentPickerProvider;
	})();
	
	var $timeout, $sce, $log, $window, momentPicker;
	
	var MomentPickerDirective = (function () {
		
		// Utility
		function getOffset(element) {
			var docElem, win, rect, doc;
			if (!element) return;
			if (!element.getClientRects().length) return { top: 0, left: 0 };
			rect = element.getBoundingClientRect();
			if (!rect.width && !rect.height) return rect;
			doc = element.ownerDocument;
			win = doc !== null && doc === doc.window ? element : doc.nodeType === 9 && doc.defaultView;
			docElem = doc.documentElement;
			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}
		
		// Directive
		function MomentPickerDirective(timeout, sce, log, window, momentPickerProvider) {
			this.restrict   = 'AE';
			this.require    = '?ngModel';
			this.transclude = true;
			this.scope      = {
				value:      '=?momentPicker',
				model:      '=?ngModel',
				locale:     '@?',
				format:     '@?',
				minView:    '@?',
				maxView:    '@?',
				startView:  '@?',
				minDate:    '=?',
				maxDate:    '=?',
				startDate:  '=?',
				disabled:   '=?disable',
				autoclose:  '=?',
				today:      '=?',
				keyboard:   '=?',
				additions:  '=?',
				change:     '&?',
				selectable: '&?'
			};
			this.template   = (
				'<div class="moment-picker">' +
					'<span class="moment-picker-contents"></span>' +
					'<div class="moment-picker-container {{view.selected}}-view" ' +
						'ng-show="view.isOpen && !disabled" ng-class="{\'moment-picker-disabled\': disabled, \'open\': view.isOpen}">' +
						'<div ng-if="additions.top" ng-include="additions.top"></div>' +
						'<table class="header-view" ng-if="showHeader">' +
							'<thead>' +
								'<tr>' +
									'<th ng-class="{disabled: !view.previous.selectable}" ng-bind-html="view.previous.label" ng-click="view.previous.set()"></th>' +
									'<th ng-bind="view.title" ng-click="view.setParentView()"></th>' +
									'<th ng-class="{disabled: !view.next.selectable}" ng-bind-html="view.next.label" ng-click="view.next.set()"></th>' +
								'</tr>' +
							'</thead>' +
						'</table>' +
						'<div class="moment-picker-specific-views">' +
							'<table ng-if="view.selected == \'decade\'">' +
								'<tbody>' +
									'<tr ng-repeat="row in decadeView.rows">' +
										'<td ng-repeat="year in row track by year.year" ' +
											'ng-class="year.class" ng-bind="year.label" ng-click="decadeView.setYear(year)"></td>' +
									'</tr>' +
								'</tbody>' +
							'</table>' +
							'<table ng-if="view.selected == \'year\'">' +
								'<tbody>' +
									'<tr ng-repeat="row in yearView.rows">' +
										'<td ng-repeat="month in row track by month.month" ' +
											'ng-class="month.class" ng-bind="month.label" ng-click="yearView.setMonth(month)"></td>' +
									'</tr>' +
								'</tbody>' +
							'</table>' +
							'<table ng-if="view.selected == \'month\'">' +
								'<thead>' +
									'<tr>' +
										'<th ng-repeat="day in monthView.days" ng-bind="day"></th>' +
									'</tr>' +
								'</thead>' +
								'<tbody>' +
									'<tr ng-repeat="row in monthView.rows">' +
										'<td ng-repeat="day in row track by day.date" ng-class="day.class" ng-bind="day.label" ng-click="monthView.setDay(day)"></td>' +
									'</tr>' +
								'</tbody>' +
							'</table>' +
							'<table ng-if="view.selected == \'day\'">' +
								'<tbody>' +
									'<tr ng-repeat="row in dayView.rows">' +
										'<td ng-repeat="hour in row track by hour.index" ' +
											'ng-class="hour.class" ng-bind="hour.label" ng-click="dayView.setHour(hour)"></td>' +
									'</tr>' +
								'</tbody>' +
							'</table>' +
							'<table ng-if="view.selected == \'hour\'">' +
								'<tbody>' +
									'<tr ng-repeat="row in hourView.rows">' +
										'<td ng-repeat="minute in row" ng-class="minute.class" ng-bind="minute.label" ng-click="hourView.setMinute(minute)"></td>' +
									'</tr>' +
								'</tbody>' +
							'</table>' +
							'<table ng-if="view.selected == \'minute\'">' +
								'<tbody>' +
									'<tr ng-repeat="row in minuteView.rows">' +
										'<td ng-repeat="second in row" ng-class="second.class" ng-bind="second.label" ng-click="minuteView.setSecond(second)"></td>' +
									'</tr>' +
								'</tbody>' +
							'</table>' +
						'</div>' +
						'<div ng-if="additions.bottom" ng-include="additions.bottom"></div>' +
					'</div>' +
				'</div>'
			);
			$timeout        = timeout;
			$sce            = sce;
			$log            = log;
			$window         = window;
			momentPicker    = momentPickerProvider;
		}
		MomentPickerDirective.prototype.$inject = ['$timeout', '$sce', '$log', '$window', 'momentPicker'];
		MomentPickerDirective.prototype.link = function ($scope, $element, $attrs, $ctrl, $transclude) {
			$transclude(function ($transElement) {
				// one-way binding attributes
				angular.forEach(['locale', 'format', 'minView', 'maxView', 'startView', 'autoclose', 'today', 'keyboard', 'showHeader', 'leftArrow', 'rightArrow', 'additions'], function (attr) {
					if (!angular.isDefined($scope[attr])) $scope[attr] = momentPicker[attr];
					if (!angular.isDefined($attrs[attr])) $attrs[attr] = $scope[attr];
				});
				
				// check if ngModel has been set
				if (!$attrs.ngModel) $ctrl = {};
				
				// utilities
				$scope.utility = {
					isValidMoment: function (value) { return moment.isMoment(value) && value.isValid(); },
					toValue: function (date) {
						var momentDate = date;
						if (!$scope.utility.isValidMoment(date)) momentDate = $scope.utility.toMoment(date);
						return $scope.utility.momentToValue(momentDate);
					},
					toMoment: function (date) {
						var momentDate = moment(date, $scope.format, $scope.locale);
						if (!$scope.utility.isValidMoment(momentDate)) momentDate = undefined;
						return momentDate;
					},
					momentToValue: function (momentObject) {
						if (!$scope.utility.isValidMoment(momentObject)) return undefined;
						return !$scope.format ? momentObject.valueOf() : momentObject.format($scope.format);
					},
					valueToMoment: function (formattedValue) {
						if (!formattedValue) return undefined;
						if (!$scope.format) return moment(formattedValue);
						return moment(formattedValue, $scope.format, $scope.locale);
					},
					setValue: function (value) {
						var modelValue = $scope.utility.isValidMoment(value) ? value.clone() : $scope.utility.valueToMoment(value),
							viewValue = $scope.utility.momentToValue(modelValue);
						$scope.model = modelValue;
						$ctrl.$modelValue = modelValue;
						if ($attrs.ngModel != $attrs.momentPicker) $scope.value = viewValue;
						if ($attrs.ngModel) {
							$ctrl.$setViewValue(viewValue);
							$ctrl.$render();
						}
					}
				};
				
				// limits
				$scope.limits = {
					minDate: undefined,
					maxDate: undefined,
					isAfterOrEqualMin: function (value, precision) {
						return !angular.isDefined($scope.limits.minDate) || value.isAfter($scope.limits.minDate, precision) || value.isSame($scope.limits.minDate, precision);
					},
					isBeforeOrEqualMax: function (value, precision) {
						return !angular.isDefined($scope.limits.maxDate) || value.isBefore($scope.limits.maxDate, precision) || value.isSame($scope.limits.maxDate, precision);
					},
					isSelectable: function (value, precision) {
						var selectable = true;
						try {
							if (angular.isFunction($scope.selectable)) selectable = $scope.selectable({ date: value, type: precision });
						} catch (e) {
							$log.error(e);
						}
						return $scope.limits.isAfterOrEqualMin(value, precision) && $scope.limits.isBeforeOrEqualMax(value, precision) && selectable;
					},
					checkValue: function () {
						if (!angular.isDefined($ctrl.$modelValue)) return;
						if (!$scope.limits.isAfterOrEqualMin($ctrl.$modelValue)) $scope.utility.setValue($scope.limits.minDate);
						if (!$scope.limits.isBeforeOrEqualMax($ctrl.$modelValue)) $scope.utility.setValue($scope.limits.maxDate);
					},
					checkView: function () {
						if (!angular.isDefined($scope.view.moment)) $scope.view.moment = moment().locale($scope.locale);
						if (!$scope.limits.isAfterOrEqualMin($scope.view.moment)) $scope.view.moment = $scope.limits.minDate.clone();
						if (!$scope.limits.isBeforeOrEqualMax($scope.view.moment)) $scope.view.moment = $scope.limits.maxDate.clone();
						$scope.view.update();
					}
				};
				
				$scope.views = {
					all: ['decade', 'year', 'month', 'day', 'hour', 'minute'],
					// for each view, `$scope.views.formats` object contains the available moment formats
					// formats present in more views are used to perform min/max view detection (i.e. 'LTS', 'LT', ...)
					formats: {
						'decade':	'Y{1,2}(?!Y)|YYYY|[Ll]{1,4}(?!T)',
									/* formats: Y,YY,YYYY,L,LL,LLL,LLLL,l,ll,lll,llll */
						'year':		'M{1,4}(?![Mo])|Mo|Q',
									/* formats: M,MM,MMM,MMM,Mo,Q */
						'month':	'[Dd]{1,4}(?![Ddo])|DDDo|[Dd]o|[Ww]{1,2}(?![Wwo])|[Ww]o|[Ee]|L{1,2}(?!T)|l{1,2}',
									/* formats: D,DD,DDD,DDDD,d,dd,ddd,dddd,DDDo,Do,do,W,WW,w,ww,Wo,wo,E,e,L,LL,l,ll */
						'day':		'[Hh]{1,2}|LTS?',
									/* formats: H,HH,h,hh,LT,LTS */
						'hour':		'm{1,2}|[Ll]{3,4}|LT(?!S)',
									/* formats: m,mm,LLL,LLLL,lll,llll,LT */
						'minute':	's{1,2}|S{1,}|X|LTS'
									/* formats: s,ss,S,SS,SSS..,X,LTS */
					},
					detectMinMax: function () {
						if (!$scope.format) return;
						
						var minView, maxView;
						angular.forEach($scope.views.formats, function (formats, view) {
							var regexp = new RegExp('(' + formats + ')(?![^\[]*\])', 'g');
							if (!$scope.format.match(regexp)) return;
							if (!angular.isDefined(minView)) minView = view;
							maxView = view;
						});
						
						if (!angular.isDefined(minView)) minView = 0;
						else minView = Math.max(0, $scope.views.all.indexOf(minView));
						if (!angular.isDefined(maxView)) maxView = $scope.views.all.length - 1;
						else maxView = Math.min($scope.views.all.length - 1, $scope.views.all.indexOf(maxView));
						
						if (minView > $scope.views.all.indexOf($scope.minView)) $scope.minView = $scope.views.all[minView];
						if (maxView < $scope.views.all.indexOf($scope.maxView)) $scope.maxView = $scope.views.all[maxView];
					}
				};
				$scope.view = {
					moment: undefined,
					value: undefined,
					isOpen: false,
					selected: $scope.startView,
					update: function () { $scope.view.value = $scope.utility.momentToValue($scope.view.moment); },
					toggle: function () { $scope.view.isOpen ? $scope.view.close() : $scope.view.open(); },
					open: function () {
						if ($scope.disabled || $scope.view.isOpen) return;
						
						$scope.view.isOpen = true;
						$timeout($scope.view.position, 0, false);
					},
					close: function () {
						if (!$scope.view.isOpen) return;
						
						$scope.view.isOpen = false;
						$scope.view.selected = $scope.startView;
					},
					position: function () {
						if (!$scope.view.isOpen) return;
						$scope.picker.removeClass('top').removeClass('left');
						
						var container = $scope.container[0],
							offset    = getOffset(container),
							top       = offset.top - $window.pageYOffset,
							left      = offset.left - $window.pageXOffset,
							winWidth  = $window.innerWidth,
							winHeight = $window.innerHeight;
						
						if (top + $window.pageYOffset - container.offsetHeight > 0 && top > winHeight / 2) $scope.picker.addClass('top');
						if (left + container.offsetWidth > winWidth) $scope.picker.addClass('left');
					},
					keydown: function (e) {
						var view       = $scope.view.selected + 'View',
							precision  = { decade: 'year', year: 'month', month: 'day', day: 'hour', hour: 'minute', minute: 'second' }[$scope.view.selected],
							singleUnit = momentPicker[precision + 'sStep'] || 1,
							operation  = [KEYS.up, KEYS.left].indexOf(e.keyCode) >= 0 ? 'subtract' : 'add',
							highlight  = function (vertical) {
								var unitMultiplier = vertical ? $scope[view].perLine : 1,
									nextDate = $scope.view.moment.clone()[operation](singleUnit * unitMultiplier, precision);
								if ($scope.limits.isSelectable(nextDate, precision)) {
									$scope.view.moment = nextDate;
									$scope.view.update();
									$scope.view.render();
								}
							};
						
						switch (e.keyCode) {
							case KEYS.up:
							case KEYS.down:
								e.preventDefault();
								if (!$scope.view.isOpen) $scope.view.open();
								else highlight(true);
								break;
							case KEYS.left:
							case KEYS.right:
								if (!$scope.view.isOpen) break;
								e.preventDefault();
								highlight();
								break;
							case KEYS.enter:
								if (!$scope.view.isOpen) break;
								$scope.view.change(precision);
								e.preventDefault();
								break;
							case KEYS.escape:
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
						label: $sce.trustAsHtml($scope.leftArrow),
						selectable: true,
						set: function () {
							if ($scope.view.previous.selectable) {
								$scope.view.moment.subtract($scope.view.unit(), $scope.view.precision());
								$scope.view.update();
							}
						}
					},
					next: {
						selectable: true,
						label: $sce.trustAsHtml($scope.rightArrow),
						set: function () {
							if ($scope.view.next.selectable) {
								$scope.view.moment.add($scope.view.unit(), $scope.view.precision());
								$scope.view.update();
							}
						}
					},
					setParentView: function () { $scope.view.change($scope.views.all[ Math.max(0, $scope.views.all.indexOf($scope.view.selected) - 1) ]); },
					// body
					render: function () {
						var momentPrevious = $scope.view.moment.clone().startOf($scope.view.precision()).subtract($scope.view.unit(), $scope.view.precision()),
							momentNext     = $scope.view.moment.clone().endOf($scope.view.precision()).add($scope.view.unit(), $scope.view.precision());
						
						$scope.view.previous.selectable = $scope.limits.isAfterOrEqualMin(momentPrevious, $scope.view.precision());
						$scope.view.previous.label      = $sce.trustAsHtml($scope.view.previous.selectable ? $scope.leftArrow : '&nbsp;');
						$scope.view.next.selectable     = $scope.limits.isBeforeOrEqualMax(momentNext, $scope.view.precision());
						$scope.view.next.label          = $sce.trustAsHtml($scope.view.next.selectable ? $scope.rightArrow : '&nbsp;');
						$scope.view.title               = $scope[$scope.view.selected + 'View'].render();
					},
					change: function (view) {
						var nextView = $scope.views.all.indexOf(view),
							minView  = $scope.views.all.indexOf($scope.minView),
							maxView  = $scope.views.all.indexOf($scope.maxView);
						
						if (nextView < 0 || nextView > maxView) {
							$scope.utility.setValue($scope.view.moment);
							if ($scope.autoclose) $timeout($scope.view.close);
						} else if (nextView >= minView) $scope.view.selected = view;
					}
				};
				// decade view
				$scope.decadeView = {
					perLine: 4,
					rows: {},
					render: function () {
						var year      = $scope.view.moment.clone(),
							firstYear = Math.floor(year.year() / 10) * 10 - 1;
						
						year.year(firstYear);
						$scope.decadeView.rows = {};
						for (var y = 0; y < 12; y++) {
							var index      = Math.floor(y / $scope.decadeView.perLine),
								selectable = $scope.limits.isSelectable(year, 'year');
							
							if (!$scope.decadeView.rows[index]) $scope.decadeView.rows[index] = [];
							$scope.decadeView.rows[index].push({
								label: year.format(momentPicker.yearsFormat),
								year:  year.year(),
								class: [
									$scope.keyboard && year.isSame($scope.view.moment, 'year') ? 'highlighted' : '',
									!selectable || [0, 11].indexOf(y) >= 0 ? 'disabled' :
										$scope.utility.isValidMoment($ctrl.$modelValue) && year.isSame($ctrl.$modelValue, 'year') ? 'selected' : ''
								].join(' ').trim(),
								selectable: selectable
							});
							year.add(1, 'years');
						}
						// return title
						return [year.subtract(2, 'years').format('YYYY'), year.subtract(9, 'years').format('YYYY')].reverse().join(' - ');
					},
					setYear: function (year) {
						if (!year.selectable) return;
						$scope.view.moment.year(year.year);
						$scope.view.update();
						$scope.view.change('year');
					}
				};
				// year view
				$scope.yearView = {
					perLine: 4,
					rows: {},
					render: function () {
						var month  = $scope.view.moment.clone().startOf('year'),
							months = moment.monthsShort();
						
						$scope.yearView.rows = {};
						months.forEach(function (label, i) {
							var index      = Math.floor(i / $scope.yearView.perLine),
								selectable = $scope.limits.isSelectable(month, 'month');
							
							if (!$scope.yearView.rows[index]) $scope.yearView.rows[index] = [];
							$scope.yearView.rows[index].push({
								label: month.format(momentPicker.monthsFormat),
								year:  month.year(),
								month: month.month(),
								class: [
									$scope.keyboard && month.isSame($scope.view.moment, 'month') ? 'highlighted' : '',
									!selectable ? 'disabled' : $scope.utility.isValidMoment($ctrl.$modelValue) && month.isSame($ctrl.$modelValue, 'month') ? 'selected' : ''
								].join(' ').trim(),
								selectable: selectable
							});
							month.add(1, 'months');
						});
						// return title
						return $scope.view.moment.format('YYYY');
					},
					setMonth: function (month) {
						if (!month.selectable) return;
						$scope.view.moment.year(month.year).month(month.month);
						$scope.view.update();
						$scope.view.change('month');
					}
				};
				// month view
				$scope.monthView = {
					perLine: moment.weekdays().length,
					days: moment.weekdays().map(function (day, i) {
						return moment().locale($scope.locale).startOf('week').add(i, 'day').format('dd');
					}),
					rows: [],
					render: function () {
						var month     = $scope.view.moment.month(),
							day       = $scope.view.moment.clone().startOf('month').startOf('week').hour(12),
							rows      = {},
							firstWeek = day.week(),
							lastWeek  = firstWeek + 5;
						
						$scope.monthView.rows = [];
						for (var w = firstWeek; w <= lastWeek; w++)
							rows[w] = Array.apply(null, Array($scope.monthView.perLine)).map(function () {
								var selectable = $scope.limits.isSelectable(day, 'day'),
									d = {
										label: day.format(momentPicker.daysFormat),
										year:  day.year(),
										date:  day.date(),
										month: day.month(),
										class: [
											$scope.keyboard && day.isSame($scope.view.moment, 'day') ? 'highlighted' : '',
											!!$scope.today && day.isSame(new Date(), 'day') ? 'today' : '',
											!selectable || day.month() != month ? 'disabled' :
												$scope.utility.isValidMoment($ctrl.$modelValue) && day.isSame($ctrl.$modelValue, 'day') ? 'selected' : ''
										].join(' ').trim(),
										selectable: selectable
									};
								day.add(1, 'days');
								return d;
							});
						// object to array - see https://github.com/indrimuska/angular-moment-picker/issues/9
						angular.forEach(rows, function (row) {
							$scope.monthView.rows.push(row);
						});
						// return title
						return $scope.view.moment.format('MMMM YYYY');
					},
					setDay: function (day) {
						if (!day.selectable) return;
						$scope.view.moment.year(day.year).month(day.month).date(day.date);
						$scope.view.update();
						$scope.view.change('day');
					}
				};
				// day view
				$scope.dayView = {
					perLine: 4,
					rows: [],
					render: function () {
						var hour = $scope.view.moment.clone().startOf('day').hour(momentPicker.hoursStart);
						
						$scope.dayView.rows = [];
						for (var h = 0; h <= momentPicker.hoursEnd - momentPicker.hoursStart; h++) {
							var index = Math.floor(h / $scope.dayView.perLine),
								selectable = $scope.limits.isSelectable(hour, 'hour');
							
							if (!$scope.dayView.rows[index])
								$scope.dayView.rows[index] = [];
							$scope.dayView.rows[index].push({
								index: h, // this is to prevent DST conflicts
								label: hour.format(momentPicker.hoursFormat),
								year:  hour.year(),
								month: hour.month(),
								date:  hour.date(),
								hour:  hour.hour(),
								class: [
									$scope.keyboard && hour.isSame($scope.view.moment, 'hour') ? 'highlighted' : '',
									!selectable ? 'disabled' : $scope.utility.isValidMoment($ctrl.$modelValue) && hour.isSame($ctrl.$modelValue, 'hour') ? 'selected' : ''
								].join(' ').trim(),
								selectable: selectable
							});
							hour.add(1, 'hours');
						}
						// return title
						return $scope.view.moment.format('LL');
					},
					setHour: function (hour) {
						if (!hour.selectable) return;
						$scope.view.moment.year(hour.year).month(hour.month).date(hour.date).hour(hour.hour);
						$scope.view.update();
						$scope.view.change('hour');
					}
				};
				// hour view
				$scope.hourView = {
					perLine: 4,
					rows: [],
					render: function () {
						var i = 0,
							minute = $scope.view.moment.clone().startOf('hour').minute(momentPicker.minutesStart),
							minutesFormat = momentPicker.minutesFormat || moment.localeData($scope.locale).longDateFormat('LT').replace(/[aA]/, '');
						
						$scope.hourView.rows = [];
						for (var m = 0; m <= momentPicker.minutesEnd - momentPicker.minutesStart; m += momentPicker.minutesStep) {
							var index = Math.floor(i / $scope.hourView.perLine),
								selectable = $scope.limits.isSelectable(minute, 'minute');
							
							if (!$scope.hourView.rows[index])
								$scope.hourView.rows[index] = [];
							$scope.hourView.rows[index].push({
								label:  minute.format(minutesFormat),
								year:   minute.year(),
								month:  minute.month(),
								date:   minute.date(),
								hour:   minute.hour(),
								minute: minute.minute(),
								class:  [
									$scope.keyboard && minute.isSame($scope.view.moment, 'minute') ? 'highlighted' : '',
									!selectable ? 'disabled' : $scope.utility.isValidMoment($ctrl.$modelValue) && minute.isSame($ctrl.$modelValue, 'minute') ? 'selected' : ''
								].join(' ').trim(),
								selectable: selectable
							});
							i++;
							minute.add(momentPicker.minutesStep, 'minutes');
						}
						if ($scope.keyboard) $scope.hourView.highlightClosest();
						// return title
						return $scope.view.moment.clone().startOf('hour').format('lll');
					},
					setMinute: function (minute) {
						if (!minute.selectable) return;
						$scope.view.moment.year(minute.year).month(minute.month).date(minute.date).hour(minute.hour).minute(minute.minute);
						$scope.view.update();
						$scope.view.change('minute');
					},
					highlightClosest: function () {
						var minutes = [], minute;
						angular.forEach($scope.hourView.rows, function (row) {
							angular.forEach(row, function (value) {
								if (Math.abs(value.minute - $scope.view.moment.minute()) < momentPicker.minutesStep) minutes.push(value);
							});
						});
						minute = minutes.sort(function (value1, value2) {
							return Math.abs(value1.minute - $scope.view.moment.minute()) > Math.abs(value2.minute - $scope.view.moment.minute());
						})[0];
						if (!minute || minute.minute - $scope.view.moment.minute() == 0) return;
						$scope.view.moment.year(minute.year).month(minute.month).date(minute.date).hour(minute.hour).minute(minute.minute);
						$scope.view.update();
						if (minute.selectable) minute.class = (minute.class + ' highlighted').trim();
					}
				};
				// minute view
				$scope.minuteView = {
					perLine: 6,
					rows: [],
					render: function () {
						var i = 0,
							second = $scope.view.moment.clone().startOf('minute').second(momentPicker.secondsStart);
						
						$scope.minuteView.rows = [];
						for (var s = 0; s <= momentPicker.secondsEnd - momentPicker.secondsStart; s += momentPicker.secondsStep) {
							var index = Math.floor(i / $scope.minuteView.perLine),
								selectable = $scope.limits.isSelectable(second, 'second');
							
							if (!$scope.minuteView.rows[index])
								$scope.minuteView.rows[index] = [];
							$scope.minuteView.rows[index].push({
								label:  second.format(momentPicker.secondsFormat),
								year:   second.year(),
								month:  second.month(),
								date:   second.date(),
								hour:   second.hour(),
								minute: second.minute(),
								second: second.second(),
								class:  [
									$scope.keyboard && second.isSame($scope.view.moment, 'second') ? 'highlighted' : '',
									!selectable ? 'disabled' : $scope.utility.isValidMoment($ctrl.$modelValue) && second.isSame($ctrl.$modelValue, 'second') ? 'selected' : ''
								].join(' ').trim(),
								selectable: selectable
							});
							i++;
							second.add(momentPicker.secondsStep, 'seconds');
						}
						if ($scope.keyboard) $scope.minuteView.highlightClosest();
						// return title
						return $scope.view.moment.clone().startOf('minute').format('lll');
					},
					setSecond: function (second) {
						if (!second.selectable) return;
						$scope.view.moment.year(second.year).month(second.month).date(second.date).hour(second.hour).minute(second.minute).second(second.second);
						$scope.view.update();
						$scope.view.change('second');
					},
					highlightClosest: function () {
						var seconds = [], second;
						angular.forEach($scope.minuteView.rows, function (row) {
							angular.forEach(row, function (value) {
								if (Math.abs(value.second - $scope.view.moment.second()) < momentPicker.secondsStep) seconds.push(value);
							});
						});
						second = seconds.sort(function (value1, value2) {
							return Math.abs(value1.second - $scope.view.moment.second()) > Math.abs(value2.second - $scope.view.moment.second());
						})[0];
						if (!second || second.second - $scope.view.moment.second() == 0) return;
						$scope.view.moment.year(second.year).month(second.month).date(second.date).hour(second.hour).minute(second.minute).second(second.second);
						$scope.view.update();
						if (second.selectable) second.class = (second.class + ' highlighted').trim();
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
				
				// initialization
				$scope.views.detectMinMax();
				$scope.limits.checkView();
				
				// model <-> view conversion
				if ($attrs.ngModel) {
					$ctrl.$parsers.push(function (viewValue) { return $scope.utility.valueToMoment(viewValue); });
					$ctrl.$formatters.push(function (modelValue) { return $scope.utility.momentToValue(modelValue); });
				}
				
				// view initialization (model controller is initialized after linking function)
				$timeout(function () {
					if ($scope.startDate) $scope.view.moment = $scope.utility.toMoment($scope.startDate);
					else if ($scope.utility.isValidMoment($ctrl.$modelValue)) $scope.view.moment = $ctrl.$modelValue.clone();
					$scope.view.update();
				});
				
				// properties listeners
				$scope.$watch(function () { return $scope.utility.momentToValue($ctrl.$modelValue); }, function (newViewValue, oldViewValue) {
					if (newViewValue == oldViewValue) return;
					
					var newModelValue = $scope.utility.valueToMoment(newViewValue);
					$scope.utility.setValue(newModelValue);
					$scope.limits.checkValue();
					$scope.view.moment = (newModelValue || moment()).clone();
					$scope.view.update();
					$scope.view.render();
					if (angular.isFunction($scope.change)) {
						var oldModelValue = $scope.utility.valueToMoment(oldViewValue);
						$timeout(function () {
							$scope.change({ newValue: newModelValue, oldValue: oldModelValue });
						}, 0, false);
					}
				});
				$scope.$watchGroup(['view.selected', 'view.value'], $scope.view.render);
				$scope.$watchGroup(['minView', 'maxView'], function () {
					// auto-detect minView/maxView
					$scope.views.detectMinMax();
					// limit startView
					$scope.startView = $scope.views.all[
						Math.max(
							Math.min(
								$scope.views.all.indexOf($scope.startView),
								$scope.views.all.indexOf($scope.maxView)
							),
							$scope.views.all.indexOf($scope.minView)
						)
					];
					$scope.view.selected = $scope.startView;
				});
				$scope.$watchGroup([
					function () { return $scope.utility.toValue($scope.minDate); },
					function () { return $scope.utility.toValue($scope.maxDate); }
				], function () {
					angular.forEach(['minDate', 'maxDate'], function (field) {
						$scope.limits[field] = $scope.utility.toMoment($scope[field]);
					});
					$scope.limits.checkValue();
					$scope.limits.checkView();
					$scope.view.render();
				}, true);
				$scope.$watch('locale', function (locale, previous) {
					if (!angular.isDefined(previous) || locale == previous) return;
					if ($scope.utility.isValidMoment($ctrl.$modelValue)) $scope.utility.setValue($ctrl.$modelValue.locale(locale));
					if ($scope.utility.isValidMoment($scope.limits.minDate)) $scope.limits.minDate = $scope.limits.minDate.locale(locale);
					if ($scope.utility.isValidMoment($scope.limits.maxDate)) $scope.limits.maxDate = $scope.limits.maxDate.locale(locale);
					$scope.view.render();
				});
				
				// event listeners
				$scope.focusInput = function (e) {
					if (e) e.preventDefault();
					$scope.input[0].focus();
				};
				$scope.input
					.on('focus click', function () { $scope.$evalAsync($scope.view.open); })
					.on('blur',        function () { $scope.$evalAsync($scope.view.close); })
					.on('keydown',     function (e) {
						if (!$scope.keyboard) return;
						e.preventDefault();
						$scope.$evalAsync(function () { $scope.view.keydown(e); });
					});
				$scope.contents.on('mousedown', function () { $scope.focusInput(); });
				$scope.container.on('mousedown', function (e) { $scope.focusInput(e); });
				angular.element($window).on('resize scroll', $scope.view.position);
			});
		};
		
		return MomentPickerDirective;
	})();
	
	angular
		.module('moment-picker', [])
		.provider('momentPicker', [function () {
			return new momentPickerProvider();
		}])
		.directive('momentPicker', [
			'$timeout', '$sce', '$log', '$window', 'momentPicker',
			function ($timeout, $sce, $log, $window, momentPicker) {
				return new MomentPickerDirective($timeout, $sce, $log, $window, momentPicker);
			}
		]);
	
})(window.angular);
