/* angular-moment.js / v1.1.0 / (c) 2013, 2014, 2015, 2016, 2017 Uri Shaked / MIT Licence */

'format amd';
/* global define */

(function () {
	'use strict';

	function isUndefinedOrNull(val) {
		return angular.isUndefined(val) || val === null;
	}

	function requireMoment() {
		try {
			return require('moment'); // Using nw.js or browserify?
		} catch (e) {
			throw new Error('Please install moment via npm. Please reference to: https://github.com/urish/angular-moment'); // Add wiki/troubleshooting section?
		}
	}

	function angularMoment(angular, moment) {

		if(typeof moment === 'undefined') {
			if(typeof require === 'function') {
				moment = requireMoment();
			}else{
				throw new Error('Moment cannot be found by angular-moment! Please reference to: https://github.com/urish/angular-moment'); // Add wiki/troubleshooting section?
			}
		}

		/**
		 * @ngdoc overview
		 * @name angularMoment
		 *
		 * @description
		 * angularMoment module provides moment.js functionality for angular.js apps.
		 */
		angular.module('angularMoment', [])

		/**
		 * @ngdoc object
		 * @name angularMoment.config:angularMomentConfig
		 *
		 * @description
		 * Common configuration of the angularMoment module
		 */
			.constant('angularMomentConfig', {
				/**
				 * @ngdoc property
				 * @name angularMoment.config.angularMomentConfig#preprocess
				 * @propertyOf angularMoment.config:angularMomentConfig
				 * @returns {function} A preprocessor function that will be applied on all incoming dates
				 *
				 * @description
				 * Defines a preprocessor function to apply on all input dates (e.g. the input of `am-time-ago`,
				 * `amCalendar`, etc.). The function must return a `moment` object.
				 *
				 * @example
				 *   // Causes angular-moment to always treat the input values as unix timestamps
				 *   angularMomentConfig.preprocess = function(value) {
				 * 	   return moment.unix(value);
				 *   }
				 */
				preprocess: null,

				/**
				 * @ngdoc property
				 * @name angularMoment.config.angularMomentConfig#timezone
				 * @propertyOf angularMoment.config:angularMomentConfig
				 * @returns {string} The default timezone
				 *
				 * @description
				 * The default timezone (e.g. 'Europe/London'). Empty string by default (does not apply
				 * any timezone shift).
				 *
				 * NOTE: This option requires moment-timezone >= 0.3.0.
				 */
				timezone: null,

				/**
				 * @ngdoc property
				 * @name angularMoment.config.angularMomentConfig#format
				 * @propertyOf angularMoment.config:angularMomentConfig
				 * @returns {string} The pre-conversion format of the date
				 *
				 * @description
				 * Specify the format of the input date. Essentially it's a
				 * default and saves you from specifying a format in every
				 * element. Overridden by element attr. Null by default.
				 */
				format: null,

				/**
				 * @ngdoc property
				 * @name angularMoment.config.angularMomentConfig#statefulFilters
				 * @propertyOf angularMoment.config:angularMomentConfig
				 * @returns {boolean} Whether angular-moment filters should be stateless (or not)
				 *
				 * @description
				 * Specifies whether the filters included with angular-moment are stateful.
				 * Stateful filters will automatically re-evaluate whenever you change the timezone
				 * or locale settings, but may negatively impact performance. true by default.
				 */
				statefulFilters: true
			})

		/**
		 * @ngdoc object
		 * @name angularMoment.object:moment
		 *
		 * @description
		 * moment global (as provided by the moment.js library)
		 */
			.constant('moment', moment)

		/**
		 * @ngdoc object
		 * @name angularMoment.config:amTimeAgoConfig
		 * @module angularMoment
		 *
		 * @description
		 * configuration specific to the amTimeAgo directive
		 */
			.constant('amTimeAgoConfig', {
				/**
				 * @ngdoc property
				 * @name angularMoment.config.amTimeAgoConfig#withoutSuffix
				 * @propertyOf angularMoment.config:amTimeAgoConfig
				 * @returns {boolean} Whether to include a suffix in am-time-ago directive
				 *
				 * @description
				 * Defaults to false.
				 */
				withoutSuffix: false,

				/**
				 * @ngdoc property
				 * @name angularMoment.config.amTimeAgoConfig#serverTime
				 * @propertyOf angularMoment.config:amTimeAgoConfig
				 * @returns {number} Server time in milliseconds since the epoch
				 *
				 * @description
				 * If set, time ago will be calculated relative to the given value.
				 * If null, local time will be used. Defaults to null.
				 */
				serverTime: null,

				/**
				 * @ngdoc property
				 * @name angularMoment.config.amTimeAgoConfig#titleFormat
				 * @propertyOf angularMoment.config:amTimeAgoConfig
				 * @returns {string} The format of the date to be displayed in the title of the element. If null,
				 *        the directive set the title of the element.
				 *
				 * @description
				 * The format of the date used for the title of the element. null by default.
				 */
				titleFormat: null,

				/**
				 * @ngdoc property
				 * @name angularMoment.config.amTimeAgoConfig#fullDateThreshold
				 * @propertyOf angularMoment.config:amTimeAgoConfig
				 * @returns {number} The minimum number of days for showing a full date instead of relative time
				 *
				 * @description
				 * The threshold for displaying a full date. The default is null, which means the date will always
				 * be relative, and full date will never be displayed.
				 */
				fullDateThreshold: null,

				/**
				 * @ngdoc property
				 * @name angularMoment.config.amTimeAgoConfig#fullDateFormat
				 * @propertyOf angularMoment.config:amTimeAgoConfig
				 * @returns {string} The format to use when displaying a full date.
				 *
				 * @description
				 * Specify the format of the date when displayed as full date. null by default.
				 */
				fullDateFormat: null,

				fullDateThresholdUnit: 'day'
			})

		/**
		 * @ngdoc directive
		 * @name angularMoment.directive:amTimeAgo
		 * @module angularMoment
		 *
		 * @restrict A
		 */
			.directive('amTimeAgo', ['$window', 'moment', 'amMoment', 'amTimeAgoConfig', function ($window, moment, amMoment, amTimeAgoConfig) {

				return function (scope, element, attr) {
					var activeTimeout = null;
					var currentValue;
					var withoutSuffix = amTimeAgoConfig.withoutSuffix;
					var titleFormat = amTimeAgoConfig.titleFormat;
					var fullDateThreshold = amTimeAgoConfig.fullDateThreshold;
					var fullDateFormat = amTimeAgoConfig.fullDateFormat;
					var fullDateThresholdUnit = amTimeAgoConfig.fullDateThresholdUnit;

					var localDate = new Date().getTime();
					var modelName = attr.amTimeAgo;
					var currentFrom;
					var isTimeElement = ('TIME' === element[0].nodeName.toUpperCase());
					var setTitleTime = !element.attr('title');

					function getNow() {
						var now;
						if (currentFrom) {
							now = currentFrom;
						} else if (amTimeAgoConfig.serverTime) {
							var localNow = new Date().getTime();
							var nowMillis = localNow - localDate + amTimeAgoConfig.serverTime;
							now = moment(nowMillis);
						}
						else {
							now = moment();
						}
						return now;
					}

					function cancelTimer() {
						if (activeTimeout) {
							$window.clearTimeout(activeTimeout);
							activeTimeout = null;
						}
					}

					function updateTime(momentInstance) {
						var timeAgo = getNow().diff(momentInstance, fullDateThresholdUnit);
						var showFullDate = fullDateThreshold && timeAgo >= fullDateThreshold;

						if (showFullDate) {
							element.text(momentInstance.format(fullDateFormat));
						} else {
							element.text(momentInstance.from(getNow(), withoutSuffix));
						}

						if (titleFormat && setTitleTime) {
							element.attr('title', momentInstance.format(titleFormat));
						}

						if (!showFullDate) {
							var howOld = Math.abs(getNow().diff(momentInstance, 'minute'));
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
					}

					function updateDateTimeAttr(value) {
						if (isTimeElement) {
							element.attr('datetime', value);
						}
					}

					function updateMoment() {
						cancelTimer();
						if (currentValue) {
							var momentValue = amMoment.preprocessDate(currentValue);
							updateTime(momentValue);
							updateDateTimeAttr(momentValue.toISOString());
						}
					}

					scope.$watch(modelName, function (value) {
						if (isUndefinedOrNull(value) || (value === '')) {
							cancelTimer();
							if (currentValue) {
								element.text('');
								updateDateTimeAttr('');
								currentValue = null;
							}
							return;
						}

						currentValue = value;
						updateMoment();
					});

					if (angular.isDefined(attr.amFrom)) {
						scope.$watch(attr.amFrom, function (value) {
							if (isUndefinedOrNull(value) || (value === '')) {
								currentFrom = null;
							} else {
								currentFrom = moment(value);
							}
							updateMoment();
						});
					}

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

					attr.$observe('amFullDateThreshold', function (newValue) {
						fullDateThreshold = newValue;
						updateMoment();
					});

					attr.$observe('amFullDateFormat', function (newValue) {
						fullDateFormat = newValue;
						updateMoment();
					});

					attr.$observe('amFullDateThresholdUnit', function (newValue) {
						fullDateThresholdUnit = newValue;
						updateMoment();
					});

					scope.$on('$destroy', function () {
						cancelTimer();
					});

					scope.$on('amMoment:localeChanged', function () {
						updateMoment();
					});
				};
			}])

		/**
		 * @ngdoc service
		 * @name angularMoment.service.amMoment
		 * @module angularMoment
		 */
			.service('amMoment', ['moment', '$rootScope', '$log', 'angularMomentConfig', function (moment, $rootScope, $log, angularMomentConfig) {
				var defaultTimezone = null;

				/**
				 * @ngdoc function
				 * @name angularMoment.service.amMoment#changeLocale
				 * @methodOf angularMoment.service.amMoment
				 *
				 * @description
				 * Changes the locale for moment.js and updates all the am-time-ago directive instances
				 * with the new locale. Also broadcasts an `amMoment:localeChanged` event on $rootScope.
				 *
				 * @param {string} locale Locale code (e.g. en, es, ru, pt-br, etc.)
				 * @param {object} customization object of locale strings to override
				 */
				this.changeLocale = function (locale, customization) {
					var result = moment.locale(locale, customization);
					if (angular.isDefined(locale)) {
						$rootScope.$broadcast('amMoment:localeChanged');

					}
					return result;
				};

				/**
				 * @ngdoc function
				 * @name angularMoment.service.amMoment#changeTimezone
				 * @methodOf angularMoment.service.amMoment
				 *
				 * @description
				 * Changes the default timezone for amCalendar, amDateFormat and amTimeAgo. Also broadcasts an
				 * `amMoment:timezoneChanged` event on $rootScope.
				 *
				 * Note: this method works only if moment-timezone > 0.3.0 is loaded
				 *
				 * @param {string} timezone Timezone name (e.g. UTC)
				 */
				this.changeTimezone = function (timezone) {
					if (moment.tz && moment.tz.setDefault) {
						moment.tz.setDefault(timezone);
						$rootScope.$broadcast('amMoment:timezoneChanged');
					} else {
						$log.warn('angular-moment: changeTimezone() works only with moment-timezone.js v0.3.0 or greater.');
					}
					angularMomentConfig.timezone = timezone;
					defaultTimezone = timezone;
				};

				/**
				 * @ngdoc function
				 * @name angularMoment.service.amMoment#preprocessDate
				 * @methodOf angularMoment.service.amMoment
				 *
				 * @description
				 * Preprocess a given value and convert it into a Moment instance appropriate for use in the
				 * am-time-ago directive and the filters. The behavior of this function can be overriden by
				 * setting `angularMomentConfig.preprocess`.
				 *
				 * @param {*} value The value to be preprocessed
				 * @return {Moment} A `moment` object
				 */
				this.preprocessDate = function (value) {
					// Configure the default timezone if needed
					if (defaultTimezone !== angularMomentConfig.timezone) {
						this.changeTimezone(angularMomentConfig.timezone);
					}

					if (angularMomentConfig.preprocess) {
						return angularMomentConfig.preprocess(value);
					}

					if (!isNaN(parseFloat(value)) && isFinite(value)) {
						// Milliseconds since the epoch
						return moment(parseInt(value, 10));
					}

					// else just returns the value as-is.
					return moment(value);
				};
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amParse
		 * @module angularMoment
		 */
			.filter('amParse', ['moment', function (moment) {
				return function (value, format) {
					return moment(value, format);
				};
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amFromUnix
		 * @module angularMoment
		 */
			.filter('amFromUnix', ['moment', function (moment) {
				return function (value) {
					return moment.unix(value);
				};
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amUtc
		 * @module angularMoment
		 */
			.filter('amUtc', ['moment', function (moment) {
				return function (value) {
					return moment.utc(value);
				};
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amUtcOffset
		 * @module angularMoment
		 *
		 * @description
		 * Adds a UTC offset to the given timezone object. The offset can be a number of minutes, or a string such as
		 * '+0300', '-0300' or 'Z'.
		 */
			.filter('amUtcOffset', ['amMoment', function (amMoment) {
				function amUtcOffset(value, offset) {
					return amMoment.preprocessDate(value).utcOffset(offset);
				}

				return amUtcOffset;
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amLocal
		 * @module angularMoment
		 */
			.filter('amLocal', ['moment', function (moment) {
				return function (value) {
					return moment.isMoment(value) ? value.local() : null;
				};
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amTimezone
		 * @module angularMoment
		 *
		 * @description
		 * Apply a timezone onto a given moment object, e.g. 'America/Phoenix').
		 *
		 * You need to include moment-timezone.js for timezone support.
		 */
			.filter('amTimezone', ['amMoment', 'angularMomentConfig', '$log', function (amMoment, angularMomentConfig, $log) {
				function amTimezone(value, timezone) {
					var aMoment = amMoment.preprocessDate(value);

					if (!timezone) {
						return aMoment;
					}

					if (aMoment.tz) {
						return aMoment.tz(timezone);
					} else {
						$log.warn('angular-moment: named timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js ?');
						return aMoment;
					}
				}

				return amTimezone;
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amCalendar
		 * @module angularMoment
		 */
			.filter('amCalendar', ['moment', 'amMoment', 'angularMomentConfig', function (moment, amMoment, angularMomentConfig) {
				function amCalendarFilter(value, referenceTime, formats) {
					if (isUndefinedOrNull(value)) {
						return '';
					}

					var date = amMoment.preprocessDate(value);
					return date.isValid() ? date.calendar(referenceTime, formats) : '';
				}

				// Since AngularJS 1.3, filters have to explicitly define being stateful
				// (this is no longer the default).
				amCalendarFilter.$stateful = angularMomentConfig.statefulFilters;

				return amCalendarFilter;
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amDifference
		 * @module angularMoment
		 */
			.filter('amDifference', ['moment', 'amMoment', 'angularMomentConfig', function (moment, amMoment, angularMomentConfig) {
				function amDifferenceFilter(value, otherValue, unit, usePrecision) {
					if (isUndefinedOrNull(value)) {
						return '';
					}

					var date = amMoment.preprocessDate(value);
					var date2 = !isUndefinedOrNull(otherValue) ? amMoment.preprocessDate(otherValue) : moment();

					if (!date.isValid() || !date2.isValid()) {
						return '';
					}

					return date.diff(date2, unit, usePrecision);
				}

				amDifferenceFilter.$stateful = angularMomentConfig.statefulFilters;

				return amDifferenceFilter;
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amDateFormat
		 * @module angularMoment
		 * @function
		 */
			.filter('amDateFormat', ['moment', 'amMoment', 'angularMomentConfig', function (moment, amMoment, angularMomentConfig) {
				function amDateFormatFilter(value, format) {
					if (isUndefinedOrNull(value)) {
						return '';
					}

					var date = amMoment.preprocessDate(value);
					if (!date.isValid()) {
						return '';
					}

					return date.format(format);
				}

				amDateFormatFilter.$stateful = angularMomentConfig.statefulFilters;

				return amDateFormatFilter;
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amDurationFormat
		 * @module angularMoment
		 * @function
		 */
			.filter('amDurationFormat', ['moment', 'angularMomentConfig', function (moment, angularMomentConfig) {
				function amDurationFormatFilter(value, format, suffix) {
					if (isUndefinedOrNull(value)) {
						return '';
					}

					return moment.duration(value, format).humanize(suffix);
				}

				amDurationFormatFilter.$stateful = angularMomentConfig.statefulFilters;

				return amDurationFormatFilter;
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amTimeAgo
		 * @module angularMoment
		 * @function
		 */
			.filter('amTimeAgo', ['moment', 'amMoment', 'angularMomentConfig', function (moment, amMoment, angularMomentConfig) {
				function amTimeAgoFilter(value, suffix, from) {
					var date, dateFrom;

					if (isUndefinedOrNull(value)) {
						return '';
					}

					value = amMoment.preprocessDate(value);
					date = moment(value);
					if (!date.isValid()) {
						return '';
					}

					dateFrom = moment(from);
					if (!isUndefinedOrNull(from) && dateFrom.isValid()) {
						return date.from(dateFrom, suffix);
					}

					return date.fromNow(suffix);
				}

				amTimeAgoFilter.$stateful = angularMomentConfig.statefulFilters;

				return amTimeAgoFilter;
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amSubtract
		 * @module angularMoment
		 * @function
		 */
			.filter('amSubtract', ['moment', 'angularMomentConfig', function (moment, angularMomentConfig) {
				function amSubtractFilter(value, amount, type) {

					if (isUndefinedOrNull(value)) {
						return '';
					}

					return moment(value).subtract(parseInt(amount, 10), type);
				}

				amSubtractFilter.$stateful = angularMomentConfig.statefulFilters;

				return amSubtractFilter;
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amAdd
		 * @module angularMoment
		 * @function
		 */
			.filter('amAdd', ['moment', 'angularMomentConfig', function (moment, angularMomentConfig) {
				function amAddFilter(value, amount, type) {

					if (isUndefinedOrNull(value)) {
						return '';
					}

					return moment(value).add(parseInt(amount, 10), type);
				}

				amAddFilter.$stateful = angularMomentConfig.statefulFilters;

				return amAddFilter;
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amStartOf
		 * @module angularMoment
		 * @function
		 */
			.filter('amStartOf', ['moment', 'angularMomentConfig', function (moment, angularMomentConfig) {
				function amStartOfFilter(value, type) {

					if (isUndefinedOrNull(value)) {
						return '';
					}

					return moment(value).startOf(type);
				}

				amStartOfFilter.$stateful = angularMomentConfig.statefulFilters;

				return amStartOfFilter;
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amEndOf
		 * @module angularMoment
		 * @function
		 */
			.filter('amEndOf', ['moment', 'angularMomentConfig', function (moment, angularMomentConfig) {
				function amEndOfFilter(value, type) {

					if (isUndefinedOrNull(value)) {
						return '';
					}

					return moment(value).endOf(type);
				}

				amEndOfFilter.$stateful = angularMomentConfig.statefulFilters;

				return amEndOfFilter;
 			}]);

		return 'angularMoment';
	}

	var isElectron = window && window.process && window.process.type;
	if (typeof define === 'function' && define.amd) {
		define(['angular', 'moment'], angularMoment);
	} else if (typeof module !== 'undefined' && module && module.exports && (typeof require === 'function') && !isElectron) {
		module.exports = angularMoment(require('angular'), require('moment'));
	} else {
		angularMoment(angular, (typeof global !== 'undefined' && typeof global.moment !== 'undefined' ? global : window).moment);
	}
})();
