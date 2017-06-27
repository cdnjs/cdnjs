/*!
 * ng-i18next - Version 0.4.2 - 2015-05-22
 * Copyright (c) 2015 Andre Meyering
 *
 * AngularJS provider, filter and directive for i18next (i18next by Jan Mühlemann)
 *
 * - Source: https://github.com/i18next/ng-i18next/
 * - Issues: https://github.com/i18next/ng-i18next/issues
 *
 * License: MIT - https://github.com/i18next/ng-i18next/blob/master/LICENSE
 *
*/
angular.module('jm.i18next', ['ng', 'ngSanitize']);
angular.module('jm.i18next').provider('$i18next', function () {

	'use strict';

	var self = this,
		/**
		 * This will be our translation function (see code below)
		 */
		t = null,
		translations = {},
		globalOptions = {},
		triesToLoadI18next = 0;

	self.options = globalOptions;

	self.$get = ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {

		var i18nDeferred;

		function init(options) {

			if (options.noConflict && window.i18n) {
				window.i18n.noConflict();
			}

			var i18n = window.i18next || window.i18n;

			if (i18n) {

				i18nDeferred = $q.defer();

				i18n.init(options, function (localize) {

					translations = {};

					t = localize;

					if (!$rootScope.$$phase) {
						$rootScope.$digest();
					}

					$rootScope.$broadcast('i18nextLanguageChange', i18n.lng());

					i18nDeferred.resolve();

				});

				return i18nDeferred.promise;

			} else {

				triesToLoadI18next++;
				// only check 4 times for i18next
				if (triesToLoadI18next < 5) {

					$timeout(function () {
						return init(options);
					}, 400);

				} else {
					throw new Error('[ng-i18next] Can\'t find i18next!');
				}

			}
		}

		function optionsChange(newOptions, oldOptions) {

			$i18nextTanslate.debugMsg.push(['i18next options changed:', oldOptions, newOptions]);

			globalOptions = newOptions;

			return init(globalOptions);

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

			var hasOwnOptions = !!options,
			    hasOwnNsOption = hasOwnOptions && options.ns,
			    hasGlobalNsObj = globalOptions && globalOptions.ns,
			    defaultOptions = globalOptions,
			    mergedOptions,
			    lng;

			// https://github.com/i18next/i18next/blob/e47bdb4d5528c752499b0209d829fde4e1cc96e7/src/i18next.translate.js#L232
			// Because of i18next read namespace from `options.ns`
			if (!hasOwnNsOption && hasGlobalNsObj) {
				defaultOptions = angular.copy(globalOptions);
				defaultOptions.ns = defaultOptions.ns.defaultNs;
			}

			mergedOptions = hasOwnOptions ? angular.extend({}, defaultOptions, options) : defaultOptions;

			// https://github.com/i18next/i18next/blob/7af53d5a01cc9942c0edae361bd2f65361e340c9/src/i18next.translate.js#L289
			// lng will be deleted in some case
			lng = mergedOptions.lng;

			translate(key, mergedOptions, hasOwnOptions);

			return !!lng ? translations[lng][key] : translations['auto'][key];

		}

		$i18nextTanslate.debugMsg = [];

		$i18nextTanslate.options = self.options;

		if (self.options !== globalOptions) {
			optionsChange(self.options, globalOptions);
		}

		$i18nextTanslate.reInit = function () {
			return optionsChange(globalOptions, globalOptions);
		};

		$rootScope.$watch(function () { return $i18nextTanslate.options; }, function (newOptions, oldOptions) {
			// Check whether there are new options and whether the new options are different from the old options.
			// Check if globalOptions
			if (!!newOptions && (oldOptions !== newOptions || globalOptions!== newOptions)) {
				optionsChange(newOptions, oldOptions);
			}
		}, true);

		return $i18nextTanslate;

	}];

});

angular.module('jm.i18next').directive('ngI18next', ['$i18next', '$compile', '$parse', '$interpolate', '$sanitize',
	function ($i18next, $compile, $parse, $interpolate, $sanitize) {

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

		function parse(key, noWatch) {
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

				if (parsedKey.options.attr === 'html') {
					angular.forEach(i18nOptions, function(value, key) {
						i18nOptions[key] = $sanitize(value);
					});
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
				if (!noWatch) {
					stringUnregister = $scope.$watch(string, insertText);
				}
				insertText(string($scope));
			}

			if (!noWatch) {
				argsUnregister = $scope.$watch(parsedKey.i18nOptions, render, true);
			}
			render(parsedKey.i18nOptions($scope));
		}

		this.localize = function localize(key, noWatch) {
			var keys = key.split(';');

			for (var i = 0; i < keys.length; ++i) {
				key = keys[i].trim();

				if (key === '') {
					continue;
				}

				parse(key, noWatch);
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

			translationValue = attrs.ngI18next.replace(/^\s+|\s+$/g, '');

			if (translationValue.indexOf('__once__') < 0) {

				attrs.$observe('ngI18next', observe);

			} else {
				// Remove '__once__'
				translationValue = translationValue.split('__once__').join('');

				ctrl.localize(translationValue, true);
			}

			scope.$on('i18nextLanguageChange', function () {
				ctrl.localize(translationValue);
			});

		}

	};

}]);

angular.module('jm.i18next').directive('boI18next', ['$i18next', '$compile', function ($i18next, $compile) {

	'use strict';

	return {

		// 'A': only as attribute
		restrict: 'A',

		scope: false,

		link: function postLink(scope, element, attrs) {

			var newElement = element.clone();

			newElement.attr('ng-i18next', '__once__' + attrs.boI18next);
			newElement.removeAttr('bo-i18next');

			element.replaceWith($compile(newElement)(scope));

		}

	};

}]);

angular.module('jm.i18next').filter('i18next', ['$i18next', function ($i18next) {

	'use strict';

	function i18nextFilter(string, options) {

		return $i18next(string, options);

	}

	// https://docs.angularjs.org/guide/filter#stateful-filters
	i18nextFilter.$stateful = true;

	return i18nextFilter;

}]);
