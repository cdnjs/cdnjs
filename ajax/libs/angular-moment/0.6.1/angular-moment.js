/* angular-moment.js / v0.6.1 / (c) 2013, 2014 Uri Shaked / MIT Licence */

(function(){
	'use strict';

	/**
	 * Apply a timezone onto a given moment object - if moment-timezone.js is included
	 * Otherwise, it'll not apply any timezone shift.
	 * @param {Moment} aMoment
	 * @param {string} timezone
	 * @returns {Moment}
	 */
	function applyTimezone(aMoment, timezone, $log) {
		if (aMoment && timezone) {
			if (aMoment.tz) {
				aMoment = aMoment.tz(timezone);
			} else {
				$log.warn('angular-moment: timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?');
			}
		}
		return aMoment;
	}

	angular.module('angularMoment', [])
		/**
		* Common configuration of the angularMoment module
		*/
		.constant('angularMomentConfig', {
			timezone: '' // e.g. 'Europe/London'
		})
		.constant('amTimeAgoConfig', { withoutSuffix: false})
		.directive('amTimeAgo', ['$window', 'amTimeAgoConfig', function ($window, amTimeAgoConfig) {

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
		.filter('amCalendar', ['$window', '$log', 'angularMomentConfig', function ($window, $log, angularMomentConfig) {

			return function (value) {
				if (typeof value === 'undefined' || value === null) {
					return '';
				}

				if (!isNaN(parseFloat(value)) && isFinite(value)) {
					// Milliseconds since the epoch
					value = new Date(parseInt(value, 10));
				}
				// else assume the given value is already a date

				return applyTimezone($window.moment(value), angularMomentConfig.timezone, $log).calendar();
			};
		}])
		.filter('amDateFormat', ['$window', '$log', 'angularMomentConfig', function ($window, $log, angularMomentConfig) {

			return function (value, format) {
				if (typeof value === 'undefined' || value === null) {
					return '';
				}

				if (!isNaN(parseFloat(value)) && isFinite(value)) {
					// Milliseconds since the epoch
					value = new Date(parseInt(value, 10));
				}
				// else assume the given value is already a date

				return applyTimezone($window.moment(value), angularMomentConfig.timezone, $log).format(format);
			};
		}])
		.filter('amDurationFormat', ['$window', function ($window) {

			return function (value, format, suffix) {
				if (typeof value === 'undefined' || value === null) {
					return '';
				}

				// else assume the given value is already a duration in a format (miliseconds, etc)
				return $window.moment.duration(value, format).humanize(suffix);
			};
		}]);

})();