/*!
 * ng-i18next - Version 0.3.5 - 2014-09-04
 * Copyright (c) 2014 Andre Meyering
 *
 * AngularJS filter and directive for i18next (i18next by Jan Mühlemann)
 *
 * - Source: https://github.com/archer96/ng-i18next
 * - Issues: https://github.com/archer96/ng-i18next/issues
 *
 * License: MIT - https://github.com/archer96/ng-i18next/LICENSE
 *
*/
angular.module('jm.i18next', ['ng']);
angular.module('jm.i18next').provider('$i18next', function () {

	'use strict';

	var self = this,
		/**
		 * This will be our translation function (see code below)
		 */
		t = null,
		translations = {},
		globalOptions = null,
		triesToLoadI18next = 0;

	self.options = {};

	self.$get = ['$rootScope', '$timeout', function ($rootScope, $timeout) {

		function init(options) {

			if (window.i18n) {

				window.i18n.init(options, function (localize) {

					translations = {};

					t = localize;

					if (!$rootScope.$$phase) {
						$rootScope.$digest();
					}

					$rootScope.$broadcast('i18nextLanguageChange', window.i18n.lng());

				});

			} else {

				triesToLoadI18next++;
				// only check 4 times for i18next
				if (triesToLoadI18next < 5) {

					$timeout(function () {
						init(options);
					}, 400);

				} else {
					throw new Error('[ng-i18next] Can\'t find i18next!');
				}

			}
		}

		function optionsChange(newOptions, oldOptions) {

			$i18nextTanslate.debugMsg.push(['i18next options changed:', oldOptions, newOptions]);

			globalOptions = newOptions;

			init(globalOptions);

		}

		/**
		 * Translates `key` with given options and puts the translation into `translations`.
		 * @param {Boolean} hasOwnOptions hasOwnOptions means that we are passing options to
		 *                                $i18next so we can't use previous saved translation.
		 */
		function translate(key, options, hasOwnOptions) {

			var lng = options.lng || 'auto';

			if (!translations[lng]) {
				translations[lng] = {};
			}

			if (!t) {

				translations[lng][key] = 'defaultLoadingValue' in options ? options.defaultLoadingValue :
					'defaultValue' in options ? options.defaultValue :
					'defaultLoadingValue' in globalOptions ? globalOptions.defaultLoadingValue : key;

			} else if (!translations[lng][key] || hasOwnOptions) {

				translations[lng][key] = t(key, options);

			}

		}

		function $i18nextTanslate(key, options) {

			var mergedOptions = !!options ? angular.extend({}, globalOptions, options) : globalOptions;

			translate(key, mergedOptions, !!options);

			return !!mergedOptions.lng ? translations[mergedOptions.lng][key] : translations['auto'][key];

		}

		$i18nextTanslate.debugMsg = [];

		$i18nextTanslate.options = self.options;

		if (self.options !== globalOptions) {
			optionsChange(self.options, globalOptions);
		}

		$i18nextTanslate.reInit = function () {
			optionsChange(globalOptions, globalOptions);
		};

		$rootScope.$watch(function () { return $i18nextTanslate.options; }, function (newOptions, oldOptions) {
			// Check whether there are new options and whether the new options are different from the old options.
			if (!!newOptions && oldOptions !== newOptions) {
				optionsChange(newOptions, oldOptions);
			}
		}, true);

		return $i18nextTanslate;

	}];

});

angular.module('jm.i18next').directive('ngI18next', ['$i18next', '$compile', '$parse', '$interpolate', function ($i18next, $compile, $parse, $interpolate) {

	'use strict';

	function parseOptions(options) {

		var res = {
			attr: 'text'
		};

		options = options.split(':');

		for (var i = 0; i < options.length; ++i) {
			if (options[i] === 'i18next') {
				res[options[i]] = true;
			} else {
				res.attr = options[i];
			}
		}

		return res;
	}

	function parseKey(key) {

		var options = {
				attr: 'text'
			},
			i18nOptions = '{}',
			tmp;

		key = key.trim();

		if (key.indexOf('[') === 0) {
			tmp = key.split(']');
			options = parseOptions(tmp.shift().substr(1).trim());
			key = tmp.join(']');
		}

		if (options.i18next && key.indexOf('(') === 0 && key.indexOf(')') >= 0) {
			tmp = key.split(')');
			key = tmp.pop().trim();
			i18nOptions = tmp.join(')').substr(1).trim();
		}

		return {
			key: key,
			options: options,
			i18nOptions: $parse(i18nOptions)
		};
	}

	function I18nextCtrl($scope, $element) {
		var argsUnregister;
		var stringUnregister;

		function parse(key) {
			var parsedKey = parseKey(key);

			// If there are watched values, unregister them
			if (argsUnregister) {
				argsUnregister();
			}
			if (stringUnregister) {
				stringUnregister();
			}

			function render(i18nOptions) {
				if (i18nOptions.sprintf) {
					i18nOptions.postProcess = 'sprintf';
				}

				var string = $i18next(parsedKey.key, i18nOptions);

				if (parsedKey.options.attr === 'html') {
					$element.empty().append(string);

					/*
					 * Now compile the content of the element and bind the variables to
					 * the scope
					 */
					$compile($element.contents())($scope);

					return;
				}

				if (stringUnregister) {
					stringUnregister();
				}

				var insertText = $element.text.bind($element);

				if (parsedKey.options.attr !== 'text') {
					insertText = $element.attr.bind($element, parsedKey.options.attr);
				}

				string = $interpolate(string);
				stringUnregister = $scope.$watch(string, insertText);
				insertText(string($scope));
			}

			argsUnregister = $scope.$watch(parsedKey.i18nOptions, render, true);
			render(parsedKey.i18nOptions($scope));
		}

		this.localize = function localize(key) {
			var keys = key.split(';');

			for (var i = 0; i < keys.length; ++i) {
				key = keys[i].trim();

				if (key === '') {
					continue;
				}

				parse(key);
			}

		};
	}

	return {

		// 'A': only as attribute
		restrict: 'A',

		scope: false,

		controller: ['$scope', '$element', I18nextCtrl],

		require: 'ngI18next',

		link: function postLink(scope, element, attrs, ctrl) {
			var translationValue = '';

			function observe(value) {
				translationValue = value.replace(/^\s+|\s+$/g, ''); // RegEx removes whitespace

				if (translationValue === '') {
					return setupWatcher();
				}

				ctrl.localize(translationValue);
			}

			function setupWatcher() {
				// Prevent from executing this method twice
				if (setupWatcher.done) {
					return;
				}

				// interpolate is allowing to transform {{expr}} into text
				var interpolation = $interpolate(element.html());

				scope.$watch(interpolation, observe);

				setupWatcher.done = true;
			}

			attrs.$observe('ngI18next', observe);

			scope.$on('i18nextLanguageChange', function () {
				ctrl.localize(translationValue);
			});
		}

	};

}]);

angular.module('jm.i18next').filter('i18next', ['$i18next', function ($i18next) {

	'use strict';

	return function (string, options) {

		return $i18next(string, options);

	};

}]);
