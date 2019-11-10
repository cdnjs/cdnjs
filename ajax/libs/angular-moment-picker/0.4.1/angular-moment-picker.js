(function (angular) {
	
	var momentPickerProvider = (function () {
		function momentPickerProvider() {
			defaults = {
				locale:        'en',
				format:        'L LTS',
				minView:       'year',
				maxView:       'minute',
				startView:     'year',
				leftArrow:     '&larr;',
				rightArrow:    '&rarr;',
				monthsFormat:  'MMM',
				daysFormat:    'D',
				hoursFormat:   'HH:[00]',
				minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
				secondsFormat: 'ss',
				minutesStep:   5,
				secondsStep:   1
			};
		};
		momentPickerProvider.prototype.options = function (options) {
			angular.extend(defaults, options);
			return angular.copy(defaults);
		};
		momentPickerProvider.prototype.$get = function () {
			return defaults;
		};
		
		return momentPickerProvider;
	})();
	
	var MomentPickerDirective = (function () {
		function MomentPickerDirective(timeout, sce, compile, document, momentPickerProvider) {
			this.restrict = 'A',
			this.scope = {
				model:     '=momentPicker',
				locale:    '@?',
				format:    '@?',
				minView:   '@?',
				maxView:   '@?',
				startView: '@?',
				minDate:   '=?',
				maxDate:   '=?',
				disabled:  '=?disable',
				change:    '&?'
			};
			$timeout     = timeout;
			$sce         = sce;
			$compile     = compile;
			$document    = document;
			momentPicker = momentPickerProvider;
		};
		MomentPickerDirective.prototype.$inject = ['$timeout', '$sce', '$compile', '$document', 'momentPicker'];
		MomentPickerDirective.prototype.link = function ($scope, $element, $attrs) {
			$scope.template = (
				'<div class="moment-picker-container {{view.selected}}-view" ng-show="view.isOpen && !disabled" ng-class="{\'moment-picker-disabled\': disabled}">' +
					'<table class="header-view">' +
						'<thead>' +
							'<tr>' +
								'<th ng-class="{disabled: !view.previous.selectable}" ng-bind-html="view.previous.label" ng-click="view.previous.set()"></th>' +
								'<th ng-bind="view.title" ng-click="view.setParentView()"></th>' +
								'<th ng-class="{disabled: !view.next.selectable}" ng-bind-html="view.next.label" ng-click="view.next.set()"></th>' +
							'</tr>' +
						'</thead>' +
					'</table>' +
					'<div class="moment-picker-specific-views">' +
						'<table ng-if="view.selected == \'year\'">' +
							'<tbody>' +
								'<tr ng-repeat="fourMonth in yearView.fourMonths">' +
									'<td ng-repeat="month in fourMonth track by month.month" ' +
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
								'<tr ng-repeat="days in monthView.weeks">' +
									'<td ng-repeat="day in days track by day.date" ng-class="day.class" ng-bind="day.label" ng-click="monthView.setDate(day)"></td>' +
								'</tr>' +
							'</tbody>' +
						'</table>' +
						'<table ng-if="view.selected == \'day\'">' +
							'<tbody>' +
								'<tr ng-repeat="threeHours in dayView.threeHours">' +
									'<td ng-repeat="hour in threeHours track by hour.hour" '+
										'ng-class="hour.class" ng-bind="hour.label" ng-click="dayView.setHour(hour)"></td>' +
								'</tr>' +
							'</tbody>' +
						'</table>' +
						'<table ng-if="view.selected == \'hour\'">' +
							'<tbody>' +
								'<tr ng-repeat="minutes in hourView.minutes">' +
									'<td ng-repeat="minute in minutes" ng-class="minute.class" ng-bind="minute.label" ng-click="hourView.setMinute(minute)"></td>' +
								'</tr>' +
							'</tbody>' +
						'</table>' +
						'<table ng-if="view.selected == \'minute\'">' +
							'<tbody>' +
								'<tr ng-repeat="seconds in minuteView.seconds">' +
									'<td ng-repeat="second in seconds" ng-class="second.class" ng-bind="second.label" ng-click="minuteView.setSecond(second)"></td>' +
								'</tr>' +
							'</tbody>' +
						'</table>' +
					'</div>' +
				'</div>'
			);
			
			// one-way binding attributes
			angular.forEach(['locale', 'format', 'minView', 'maxView', 'startView', 'leftArrow', 'rightArrow'], function (attr) {
				if (!angular.isDefined($scope[attr])) $scope[attr] = momentPicker[attr]
				if (!angular.isDefined($attrs[attr])) $attrs[attr] = $scope[attr];
			});
			
			// utilities
			$scope.momentToDate = function (value) { return angular.isDefined(value) && value.isValid() ? value.clone().toDate() : undefined; }
			$scope.valueUpdate = function () { if (!$scope.disabled) $scope.value = $scope.momentToDate($scope.valueMoment); }
			$scope.limits = {
				isAfterOrEqualMin: function (value, precision) {
					return !angular.isDefined($scope.minDateMoment) || value.isAfter($scope.minDateMoment, precision) || value.isSame($scope.minDateMoment, precision);
				},
				isBeforeOrEqualMax: function (value, precision) {
					return !angular.isDefined($scope.maxDateMoment) || value.isBefore($scope.maxDateMoment, precision) || value.isSame($scope.maxDateMoment, precision);
				},
				isSelectable: function (value, precision) {
					return $scope.limits.isAfterOrEqualMin(value, precision) && $scope.limits.isBeforeOrEqualMax(value, precision);
				},
				checkValue: function () {
					if (!angular.isDefined($scope.valueMoment)) return;
					if (!$scope.limits.isAfterOrEqualMin($scope.valueMoment)) $scope.valueUpdate($scope.valueMoment = $scope.minDateMoment.clone());
					if (!$scope.limits.isBeforeOrEqualMax($scope.valueMoment)) $scope.valueUpdate($scope.valueMoment = $scope.maxDateMoment.clone());
				},
				checkView: function () {
					if (!angular.isDefined($scope.view.moment)) $scope.view.moment = moment().locale($scope.locale);
					if (!$scope.limits.isAfterOrEqualMin($scope.view.moment)) $scope.view.moment = $scope.minDateMoment.clone();
					if (!$scope.limits.isBeforeOrEqualMax($scope.view.moment)) $scope.view.moment = $scope.maxDateMoment.clone();
					$scope.view.update();
				}
			};
			
			$scope.views = {
				all: ['year', 'month', 'day', 'hour', 'minute'],
				// for each view, `$scope.views.formats` object contains the available moment formats
				// formats present in more views are used to perform min/max view detection (i.e. 'LTS', 'LT', ...)
				formats: {
					'year':    'M{1,4}(?![Mo])|Mo|Q|[Ll]{1,4}(?!T)',
							   /* formats: M,MM,MMM,MMM,Mo,Q,L,LL,LLL,LLLL,l,ll,lll,llll */
					'month':   '[Dd]{1,4}(?![Ddo])|DDDo|[Dd]o|[Ww]{1,2}(?![Wwo])|[Ww]o|[Ee]|L{1,4}(?!T)|l{1,4}',
							   /* formats: D,DD,DDD,DDDD,d,dd,ddd,dddd,DDDo,Do,do,W,WW,w,ww,Wo,wo,E,e,L,LL,l,ll */
					'day':     '[Hh]{1,2}|LTS?',
							   /* formats: H,HH,h,hh,LT,LTS */
					'hour':    'm{1,2}|[Ll]{3,4}|LT(?!S)',
							   /* formats: m,mm,LLL,LLLL,lll,llll,LT */
					'minute':  's{1,2}|S{1,}|X|LTS'
							   /* formats: s,ss,S,SS,SSS..,X,LTS */
				},
				detectMinMax: function () {
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
				isOpen: false,
				selected: $scope.startView,
				update: function () { $scope.view.value = $scope.momentToDate($scope.view.moment); },
				toggle: function () { $scope.view.isOpen ? $scope.view.close() : $scope.view.open(); },
				open: function () {
					// close every open picker
					// this is required because every picker stops click event propagation
					angular.forEach($document[0].querySelectorAll('.moment-picker-container.open'), function (element) {
						((angular.element(element).scope().view || {}).close || angular.noop)();
					});
					$scope.view.isOpen = true;
				},
				close: function () {
					$scope.view.isOpen = false;
					$scope.view.selected = $scope.startView;
				},
				// header
				title: '',
				previous: {
					selectable: true,
					label: $sce.trustAsHtml($scope.leftArrow),
					selectable: true,
					set: function () { if ($scope.view.previous.selectable) $scope.view.update($scope.view.moment.subtract(1, $scope.view.selected).toDate()); },
				},
				next: {
					selectable: true,
					label: $sce.trustAsHtml($scope.rightArrow),
					set: function () { if ($scope.view.next.selectable) $scope.view.update($scope.view.moment.add(1, $scope.view.selected).toDate()); },
				},
				setParentView: function () { $scope.view.change($scope.views.all[ Math.max(0, $scope.views.all.indexOf($scope.view.selected) - 1) ]); },
				// body
				render: function () {
					var momentPrevious = $scope.view.moment.clone().startOf($scope.view.selected).subtract(1, $scope.view.selected),
						momentNext     = $scope.view.moment.clone().endOf($scope.view.selected).add(1, $scope.view.selected);
					
					$scope.view.previous.selectable = $scope.limits.isAfterOrEqualMin(momentPrevious, $scope.view.selected);
					$scope.view.previous.label      = $sce.trustAsHtml($scope.view.previous.selectable ? $scope.leftArrow : '&nbsp;');
					$scope.view.next.selectable     = $scope.limits.isBeforeOrEqualMax(momentNext, $scope.view.selected);
					$scope.view.next.label          = $sce.trustAsHtml($scope.view.next.selectable ? $scope.rightArrow : '&nbsp;');
					$scope.view.title               = $scope[$scope.view.selected + 'View'].render();
				},
				change: function (view) {
					var nextView = $scope.views.all.indexOf(view),
						minView  = $scope.views.all.indexOf($scope.minView),
						maxView  = $scope.views.all.indexOf($scope.maxView);
					
					if (nextView < 0 || nextView > maxView) {
						$scope.valueUpdate($scope.valueMoment = $scope.view.moment.clone());
						$scope.view.close();
					} else if (nextView >= minView) $scope.view.selected = view;
				}
			};
			// year view
			$scope.yearView = {
				fourMonths: {},
				render: function () {
					var month  = $scope.view.moment.clone().startOf('year'),
						months = moment.monthsShort();
					
					$scope.yearView.fourMonths = [];
					months.forEach(function (label, i) {
						var index = Math.floor(i / 4),
							selectable = $scope.limits.isSelectable(month, 'month');
						
						if (!$scope.yearView.fourMonths[index]) $scope.yearView.fourMonths[index] = [];
						$scope.yearView.fourMonths[index].push({
							label: month.format(momentPicker.monthsFormat),
							year:  month.year(),
							month: month.month(),
							class: !selectable ? 'disabled' : month.isSame($scope.valueMoment, 'month') ? 'selected' : '',
							selectable: selectable
						});
						month.add(1, 'months');
					});
					// return title
					return $scope.view.moment.format('YYYY');
				},
				setMonth: function (month) {
					if (!month.selectable) return;
					$scope.view.update($scope.view.moment.year(month.year).month(month.month));
					$scope.view.change('month');
				}
			};
			// month view
			$scope.monthView = {
				days: (function () {
					var days = [],
						day  = moment().locale($scope.locale).startOf('week');
					for (var i = 0; i < 7; i++) {
						days.push(day.format('dd'));
						day.add(1, 'days');
					}
					return days;
				})(),
				weeks: [],
				render: function () {
					var month     = $scope.view.moment.month(),
						day       = $scope.view.moment.clone().startOf('month').startOf('week'),
						lastDay   = $scope.view.moment.clone().endOf('month').endOf('week'),
						firstWeek = day.week(),
						lastWeek  = firstWeek + 5;//lastDay.week() == 1 ? lastDay.weekday(-1).week() + 1 : lastDay.week();
					
					weeks = {};
					$scope.monthView.weeks = [];
					for (var w = firstWeek; w <= lastWeek; w++)
						weeks[w] = '0000000'.split('').map(function () {
							var selectable = $scope.limits.isSelectable(day, 'day'),
								d = {
									label: day.format(momentPicker.daysFormat),
									year:  day.year(),
									date:  day.date(),
									month: day.month(),
									class: !selectable || day.month() != month ? 'disabled' : day.isSame($scope.valueMoment, 'day') ? 'selected' : '',
									selectable: selectable
								};
							day.add(1, 'days');
							return d;
						});
					// object to array - see https://github.com/indrimuska/angular-moment-picker/issues/9
					angular.forEach(weeks, function (week) {
						$scope.monthView.weeks.push(week);
					});
					// return title
					return $scope.view.moment.format('MMMM YYYY');
				},
				setDate: function (day) {
					if (!day.selectable) return;
					$scope.view.update($scope.view.moment.year(day.year).month(day.month).date(day.date));
					$scope.view.change('day');
				}
			};
			// day view
			$scope.dayView = {
				threeHours: [],
				render: function () {
					var hour = $scope.view.moment.clone().startOf('day'),
						format = moment.localeData().longDateFormat('LT').replace(/[aA]/, '');
					
					$scope.dayView.threeHours = [];
					for (var h = 0; h < 24; h++) {
						var index = Math.floor(h / 4),
							selectable = $scope.limits.isSelectable(hour, 'hour');
						
						if (!$scope.dayView.threeHours[index])
							$scope.dayView.threeHours[index] = [];
						$scope.dayView.threeHours[index].push({
							label: hour.format(momentPicker.hoursFormat),
							year:  hour.year(),
							month: hour.month(),
							date:  hour.date(),
							hour:  hour.hour(),
							class: !selectable ? 'disabled' : hour.isSame($scope.valueMoment, 'hour') ? 'selected' : '',
							selectable: selectable
						});
						hour.add(1, 'hours');
					}
					// return title
					return $scope.view.moment.format('LL');
				},
				setHour: function (hour) {
					if (!hour.selectable) return;
					$scope.view.update($scope.view.moment.year(hour.year).month(hour.month).date(hour.date).hour(hour.hour));
					$scope.view.change('hour');
				}
			};
			// hour view
			$scope.hourView = {
				minutes: [],
				render: function () {
					var i = 0,
						minute = $scope.view.moment.clone().startOf('hour');
					
					$scope.hourView.minutes = [];
					for (var m = 0; m < 60; m += momentPicker.minutesStep) {
						var index = Math.floor(i / 4),
							selectable = $scope.limits.isSelectable(minute, 'minute');
						
						if (!$scope.hourView.minutes[index])
							$scope.hourView.minutes[index] = [];
						$scope.hourView.minutes[index].push({
							label:  minute.format(momentPicker.minutesFormat),
							year:   minute.year(),
							month:  minute.month(),
							date:   minute.date(),
							hour:   minute.hour(),
							minute: minute.minute(),
							class:  !selectable ? 'disabled' : minute.isSame($scope.valueMoment, 'minute') ? 'selected' : '',
							selectable: selectable
						});
						i++;
						minute.add(momentPicker.minutesStep, 'minutes');
					}
					// return title
					return $scope.view.moment.clone().startOf('hour').format('lll');
				},
				setMinute: function (minute) {
					if (!minute.selectable) return;
					$scope.view.update($scope.view.moment.year(minute.year).month(minute.month).date(minute.date).hour(minute.hour).minute(minute.minute));
					$scope.view.change('minute');
				}
			};
			// minute view
			$scope.minuteView = {
				seconds: [],
				render: function () {
					var i = 0,
						second = $scope.view.moment.clone().startOf('minute');
					
					$scope.minuteView.seconds = [];
					for (var s = 0; s < 60; s += momentPicker.secondsStep) {
						var index = Math.floor(i / 6),
							selectable = $scope.limits.isSelectable(second, 'second');
						
						if (!$scope.minuteView.seconds[index])
							$scope.minuteView.seconds[index] = [];
						$scope.minuteView.seconds[index].push({
							label:  second.format(momentPicker.secondsFormat),
							year:   second.year(),
							month:  second.month(),
							date:   second.date(),
							hour:   second.hour(),
							minute: second.minute(),
							second: second.second(),
							class:  !selectable ? 'disabled' : second.isSame($scope.valueMoment, 'second') ? 'selected' : '',
							selectable: selectable
						});
						i++;
						second.add(momentPicker.secondsStep, 'seconds');
					}
					// return title
					return $scope.view.moment.clone().startOf('minute').format('lll');
				},
				setSecond: function (second) {
					if (!second.selectable) return;
					$scope.view.update($scope.view.moment.year(second.year).month(second.month).date(second.date).hour(second.hour).minute(second.minute).second(second.second));
					$scope.view.change('second');
				}
			};
			
			// creation
			$scope.picker = angular.element('<span class="moment-picker"></span>');
			$element.after($scope.picker);
			$scope.contents = $element.addClass('moment-picker-contents').removeAttr('moment-picker');
			$scope.container = $compile($scope.template)($scope);
			$scope.picker.append($scope.contents);
			$scope.picker.append($scope.container);
			
			// initialization
			$scope.views.detectMinMax();
			$scope.limits.checkView();
			
			// properties listeners
			$scope.$watch('model', function (model, previous) {
				if (angular.isDefined(model)) {
					$scope.valueMoment = moment(model, $scope.format, $scope.locale);
					if (!$scope.valueMoment.isValid())
						$scope.valueMoment = undefined;
					else {
						$scope.view.moment = $scope.valueMoment.clone();
						$scope.view.update();
					}
				}
				$scope.valueUpdate($scope.valueMoment);
				$scope.limits.checkValue();
			});
			$scope.$watch('value', function (value, previous) {
				if (!angular.isDefined($scope.valueMoment)) return;
				var oldValue = $scope.model,
					newValue = $scope.valueMoment.format($scope.format);
				if (newValue != oldValue)
					$timeout(function () {
						$scope.view.update($scope.view.moment = $scope.valueMoment.clone());
						$scope.model = newValue;
						if (angular.isFunction($scope.change)) $scope.change({ newValue: newValue, oldValue: oldValue });
					});
			});
			$scope.$watch('[view.selected, view.value]', $scope.view.render, true);
			$scope.$watch('[minView, maxView]', function () {
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
			$scope.$watch('[minDate, maxDate]', function () {
				angular.forEach(['minDate', 'maxDate'], function (limitValue) {
					if (angular.isDefined($scope[limitValue])) {
						$scope[limitValue + 'Moment'] = moment($scope[limitValue], $scope.format, $scope.locale);
						if (!$scope[limitValue + 'Moment'].isValid())
							$scope[limitValue + 'Moment'] = undefined;
					}
				});
				$scope.limits.checkValue();
				$scope.limits.checkView();
				$scope.view.render();
			}, true);
			
			// open/close listeners
			$document.on('click', function () { if ($scope.view.isOpen) $timeout($scope.view.close); });
			$scope.container.on('click', function (e) { e.stopPropagation(); });
			$scope.contents.on('click', function (e) {
				e.stopPropagation();
				if (!$scope.view.isOpen) $timeout($scope.view.open);
			});
			angular.element($scope.contents[0].querySelector('input')).on('focus', function () { if (!$scope.view.isOpen) $timeout($scope.view.open); });
		};
		
		return MomentPickerDirective;
	})();
	
	angular
		.module('moment-picker', [])
		.provider('momentPicker', [function () {
			return new momentPickerProvider();
		}])
		.directive('momentPicker', ['$timeout', '$sce', '$compile', '$document', 'momentPicker', function ($timeout, $sce, $compile, $document, momentPicker) {
			return new MomentPickerDirective($timeout, $sce, $compile, $document, momentPicker);
		}]);
	
})(window.angular);