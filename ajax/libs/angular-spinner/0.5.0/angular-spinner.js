/**
 * angular-spinner version 0.5.0
 * License: MIT.
 * Copyright (C) 2013, 2014, Uri Shaked and contributors.
 */

(function(window, angular, undefined) {
	'use strict';

	angular.module('angularSpinner', [])

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

		.directive('usSpinner', ['$window', function ($window) {
			return {
				scope: true,
				link: function (scope, element, attr) {
					scope.spinner = null;

					scope.key = angular.isDefined(attr.spinnerKey) ? attr.spinnerKey : false;

					scope.startActive = angular.isDefined(attr.spinnerStartActive) ?
						attr.spinnerStartActive : scope.key ?
						false: true;

					scope.spin = function () {
						if (scope.spinner) {
							scope.spinner.spin(element[0]);
						}
					};

					scope.stop = function () {
						if (scope.spinner) {
							scope.spinner.stop();
						}
					};
					
					scope.$watch(attr.usSpinner, function (options) {
						scope.stop();
						scope.spinner = new $window.Spinner(options);
						if (!scope.key || scope.startActive) {
							scope.spinner.spin(element[0]);
						}
					}, true);

					scope.$on('us-spinner:spin', function (event, key) {
						if(key === scope.key){
							scope.spin();
						}
					});

					scope.$on('us-spinner:stop', function (event, key) {
						if(key === scope.key){
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

})(window, window.angular);
