/**
 * angular-spinner version 0.4.0
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
				controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
					$scope.spinner = null;
					$scope.key = angular.isDefined($attrs.spinnerKey) ? $attrs.spinnerKey : false;
					$scope.startActive = angular.isDefined($attrs.spinnerStartActive) ?
						$attrs.spinnerStartActive : !($scope.key);

					$scope.spin = function () {
						if ($scope.spinner) {
							$scope.spinner.spin($element[0]);
						}
					};

					$scope.stop = function () {
						if ($scope.spinner) {
							$scope.spinner.stop();
						}
					};
				}],
				link: function (scope, element, attr) {
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
