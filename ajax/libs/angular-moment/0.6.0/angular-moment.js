/* angular-moment.js / v0.6.0 / (c) 2013 Uri Shaked / MIT Licence */

angular.module('angularMoment', [])
	.constant('amTimeAgoConfig', { withoutSuffix: false})
	.directive('amTimeAgo', ['$window', 'amTimeAgoConfig', function ($window, amTimeAgoConfig) {
		'use strict';

		return function (scope, element, attr) {
			var activeTimeout = null;
			var currentValue;
			var currentFormat;
			var withoutSuffix = amTimeAgoConfig.withoutSuffix;

			function cancelTimer() {
				if (activeTimeout) {
					$window.clearTimeout(activeTimeout);
					activeTimeout = null;
				}
			}

			function updateTime(momentInstance) {
				element.text(momentInstance.fromNow(withoutSuffix));
				var howOld = $window.moment().diff(momentInstance, 'minute');
				var secondsUntilUpdate = 3600;
				if (howOld < 1) {
					secondsUntilUpdate = 1;
				} else if (howOld < 60) {
					secondsUntilUpdate = 30;
				} else if (howOld < 180) {
					secondsUntilUpdate = 300;
				}

				activeTimeout = $window.setTimeout(function () {
					updateTime(momentInstance);
				}, secondsUntilUpdate * 1000);
			}

			function updateMoment() {
				cancelTimer();
				updateTime($window.moment(currentValue, currentFormat));
			}

			scope.$watch(attr.amTimeAgo, function (value) {
				if ((typeof value === 'undefined') || (value === null) || (value === '')) {
					cancelTimer();
					if (currentValue) {
						element.text('');
						currentValue = null;
					}
					return;
				}

				if (angular.isNumber(value)) {
					// Milliseconds since the epoch
					value = new Date(value);
				}
				// else assume the given value is already a date

				currentValue = value;
				updateMoment();
			});

			if (angular.isDefined(attr.amWithoutSuffix)) {
				scope.$watch(attr.amWithoutSuffix, function (value) {
					if (typeof value === 'boolean') {
						withoutSuffix = value;
						updateMoment();
					} else {
						withoutSuffix = amTimeAgoConfig.withoutSuffix;
					}
				});
			}

			attr.$observe('amFormat', function (format) {
				currentFormat = format;
				if (currentValue) {
					updateMoment();
				}
			});

			scope.$on('$destroy', function () {
				cancelTimer();
			});
		};
	}])
	.filter('amCalendar', ['$window', function ($window) {
		'use strict';

		return function (value) {
			if (typeof value === 'undefined' || value === null) {
				return '';
			}

			if (!isNaN(parseFloat(value)) && isFinite(value)) {
				// Milliseconds since the epoch
				value = new Date(parseInt(value, 10));
			}
			// else assume the given value is already a date

			return $window.moment(value).calendar();
		};
	}])
	.filter('amDateFormat', ['$window', function ($window) {
		'use strict';

		return function (value, format) {
			if (typeof value === 'undefined' || value === null) {
				return '';
			}

			if (!isNaN(parseFloat(value)) && isFinite(value)) {
				// Milliseconds since the epoch
				value = new Date(parseInt(value, 10));
			}
			// else assume the given value is already a date

			return $window.moment(value).format(format);
		};
	}])
	.filter('amDurationFormat', ['$window', function ($window) {
		'use strict';

		return function (value, format, suffix) {
			if (typeof value === 'undefined' || value === null) {
				return '';
			}

			// else assume the given value is already a duration in a format (miliseconds, etc)
			return $window.moment.duration(value, format).humanize(suffix);
		};
	}]);
