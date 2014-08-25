/* angular-moment.js / v0.7.0 / (c) 2013, 2014 Uri Shaked / MIT Licence */

/* global define */

(function () {
	'use strict';

	function angularMoment(angular, moment) {

		/**
		 * @ngdoc overview
		 * @name angularMoment
		 *
		 * @description
		 * angularMoment module provides moment.js functionality for angular.js apps.
		 */
		return angular.module('angularMoment', [])

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
				 * @returns {string} The default preprocessor to apply
				 *
				 * @description
				 * Defines a default preprocessor to apply (e.g. 'unix', 'etc', ...). The default value is null,
				 * i.e. no preprocessor will be applied.
				 */
				preprocess: null, // e.g. 'unix', 'utc', ...

				/**
				 * @ngdoc property
				 * @name angularMoment.config.angularMomentConfig#timezone
				 * @propertyOf angularMoment.config:angularMomentConfig
				 * @returns {string} The default timezone
				 *
				 * @description
				 * The default timezone (e.g. 'Europe/London'). Empty string by default (does not apply
				 * any timezone shift).
				 */
				timezone: ''
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
				withoutSuffix: false
			})

		/**
		 * @ngdoc directive
		 * @name angularMoment.directive:amTimeAgo
		 * @module angularMoment
		 *
		 * @restrict A
		 */
			.directive('amTimeAgo', ['$window', 'moment', 'amMoment', 'amTimeAgoConfig', 'angularMomentConfig', function ($window, moment, amMoment, amTimeAgoConfig, angularMomentConfig) {

				return function (scope, element, attr) {
					var activeTimeout = null;
					var currentValue;
					var currentFormat;
					var withoutSuffix = amTimeAgoConfig.withoutSuffix;
					var preprocess = angularMomentConfig.preprocess;

					function cancelTimer() {
						if (activeTimeout) {
							$window.clearTimeout(activeTimeout);
							activeTimeout = null;
						}
					}

					function updateTime(momentInstance) {
						element.text(momentInstance.fromNow(withoutSuffix));
						var howOld = moment().diff(momentInstance, 'minute');
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
						if (currentValue) {
							updateTime(amMoment.preprocessDate(currentValue, preprocess, currentFormat));
						}
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
						updateMoment();
					});

					attr.$observe('amPreprocess', function (newValue) {
						preprocess = newValue;
						updateMoment();
					});

					scope.$on('$destroy', function () {
						cancelTimer();
					});

					scope.$on('amMoment:languageChange', function () {
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
				/**
				 * @ngdoc property
				 * @name angularMoment:amMoment#preprocessors
				 * @module angularMoment
				 *
				 * @description
				 * Defines the preprocessors for the preprocessDate method. By default, the following preprocessors
				 * are defined: utc, unix.
				 */
				this.preprocessors = {
					utc: moment.utc,
					unix: moment.unix
				};

				/**
				 * @ngdoc function
				 * @name angularMoment.service.amMoment#changeLanguage
				 * @methodOf angularMoment.service.amMoment
				 *
				 * @description
				 * Changes the language for moment.js and updates all the am-time-ago directive instances
				 * with the new language.
				 *
				 * @param {string} lang 2-letter language code (e.g. en, es, ru, etc.)
				 */
				this.changeLanguage = function (lang) {
					var result = moment.lang(lang);
					if (angular.isDefined(lang)) {
						$rootScope.$broadcast('amMoment:languageChange');
					}
					return result;
				};

				/**
				 * @ngdoc function
				 * @name angularMoment.service.amMoment#preprocessDate
				 * @methodOf angularMoment.service.amMoment
				 *
				 * @description
				 * Preprocess a given value and convert it into a Moment instance appropriate for use in the
				 * am-time-ago directive and the filters.
				 *
				 * @param {*} value The value to be preprocessed
				 * @param {string} preprocess The name of the preprocessor the apply (e.g. utc, unix)
				 * @param {string=} format Specifies how to parse the value (see {@link http://momentjs.com/docs/#/parsing/string-format/})
				 * @return {Moment} A value that can be parsed by the moment library
				 */
				this.preprocessDate = function (value, preprocess, format) {
					if (this.preprocessors[preprocess]) {
						return this.preprocessors[preprocess](value, format);
					}
					if (preprocess) {
						$log.warn('angular-moment: Ignoring unsupported value for preprocess: ' + preprocess);
					}
					if (!isNaN(parseFloat(value)) && isFinite(value)) {
						// Milliseconds since the epoch
						return moment(parseInt(value, 10));
					}
					// else just returns the value as-is.
					return moment(value, format);
				};

				/**
				 * @ngdoc function
				 * @name angularMoment.service.amMoment#applyTimezone
				 * @methodOf angularMoment.service.amMoment
				 *
				 * @description
				 * Apply a timezone onto a given moment object - if moment-timezone.js is included
				 * Otherwise, it'll not apply any timezone shift.
				 *
				 * @param {Moment} aMoment a moment() instance to apply the timezone shift to
				 * @returns {Moment} The given moment with the timezone shift applied
				 */
				this.applyTimezone = function (aMoment) {
					var timezone = angularMomentConfig.timezone;
					if (aMoment && timezone) {
						if (aMoment.tz) {
							aMoment = aMoment.tz(timezone);
						} else {
							$log.warn('angular-moment: timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?');
						}
					}
					return aMoment;
				};
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amCalendar
		 * @module angularMoment
		 */
			.filter('amCalendar', ['moment', 'amMoment', function (moment, amMoment) {
				return function (value, preprocess) {
					if (typeof value === 'undefined' || value === null) {
						return '';
					}

					value = amMoment.preprocessDate(value, preprocess);
					var date = moment(value);
					if (!date.isValid()) {
						return '';
					}

					return amMoment.applyTimezone(date).calendar();
				};
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amDateFormat
		 * @module angularMoment
		 * @function
		 */
			.filter('amDateFormat', ['moment', 'amMoment', function (moment, amMoment) {
				return function (value, format, preprocess) {
					if (typeof value === 'undefined' || value === null) {
						return '';
					}

					value = amMoment.preprocessDate(value, preprocess);
					var date = moment(value);
					if (!date.isValid()) {
						return '';
					}

					return amMoment.applyTimezone(date).format(format);
				};
			}])

		/**
		 * @ngdoc filter
		 * @name angularMoment.filter:amDurationFormat
		 * @module angularMoment
		 * @function
		 */
			.filter('amDurationFormat', ['moment', function (moment) {
				return function (value, format, suffix) {
					if (typeof value === 'undefined' || value === null) {
						return '';
					}

					return moment.duration(value, format).humanize(suffix);
				};
			}]);
	}

	if (typeof define === 'function' && define.amd) {
		define('angular-moment', ['angular', 'moment'], angularMoment);
	} else {
		angularMoment(angular, window.moment);
	}
})();
