/**
 * angular-spinner version 0.7.0
 * License: MIT.
 * Copyright (C) 2013, 2014, 2015, Uri Shaked and contributors.
 */

'format amd';

(function (root) {
	'use strict';

	function factory(angular, Spinner) {

		return angular
			.module('angularSpinner', [])

			.constant('SpinJSSpinner', Spinner)

			.provider('usSpinnerConfig', function () {
				var _config = {};

				return {
					setDefaults: function (config) {
						_config = config || _config;
					},
					$get: function () {
						return {
							config: _config
						};
					}
				};
			})

			.factory('usSpinnerService', ['$rootScope', function ($rootScope) {
				var config = {};

				config.spin = function (key) {
					$rootScope.$broadcast('us-spinner:spin', key);
				};

				config.stop = function (key) {
					$rootScope.$broadcast('us-spinner:stop', key);
				};

				return config;
			}])

			.directive('usSpinner', ['SpinJSSpinner', 'usSpinnerConfig', function (SpinJSSpinner, usSpinnerConfig) {
				return {
					scope: true,
					link: function (scope, element, attr) {
						scope.spinner = null;

						scope.key = angular.isDefined(attr.spinnerKey) ? attr.spinnerKey : false;

						scope.startActive = angular.isDefined(attr.spinnerStartActive) ?
							scope.$eval(attr.spinnerStartActive) : scope.key ?
							false : true;

						function stopSpinner() {
							if (scope.spinner) {
								scope.spinner.stop();
							}
						}

						scope.spin = function () {
							if (scope.spinner) {
								scope.spinner.spin(element[0]);
							}
						};

						scope.stop = function () {
							scope.startActive = false;
							stopSpinner();
						};

						scope.$watch(attr.usSpinner, function (options) {
							stopSpinner();

							options = options || {};
							for (var property in usSpinnerConfig.config) {
								if (options[property] === undefined) {
									options[property] = usSpinnerConfig.config[property];
								}
							}

							scope.spinner = new SpinJSSpinner(options);
							if (!scope.key || scope.startActive) {
								scope.spinner.spin(element[0]);
							}
						}, true);

						scope.$on('us-spinner:spin', function (event, key) {
							if (key === scope.key) {
								scope.spin();
							}
						});

						scope.$on('us-spinner:stop', function (event, key) {
							if (key === scope.key) {
								scope.stop();
							}
						});

						scope.$on('$destroy', function () {
							scope.stop();
							scope.spinner = null;
						});
					}
				};
			}]);
	}

	if (typeof define === 'function' && define.amd) {
		/* AMD module */
		define(['angular', 'spin.js'], factory);
	} else if (typeof module !== 'undefined' && module && module.exports) {
		/* CommonJS module */
		module.exports = factory(require('angular'), require('spin.js'));
	} else {
		/* Browser global */
		factory(root.angular, root.Spinner);
	}
}(window || global));
