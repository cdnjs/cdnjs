angular.module('jm.i18next', ['ng']);
angular.module('jm.i18next').provider('$i18next', function () {

	'use strict';

	var self = this,
		/**
		 * This will be our translation function (see code below)
		 */
		t = null,
		translations = {},
		globalOptions = null;

	self.options = {};

	self.$get = ['$rootScope', function ($rootScope) {

		function init(options) {

			window.i18n.init(options, function (localize) {

				translations = {};

				t = localize;

				if (!$rootScope.$$phase) {
					$rootScope.$digest();
				}

				$rootScope.$broadcast('i18nextLanguageChange');

			});

		}

		function optionsChange (newOptions, oldOptions) {

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
				translations[lng][key] = key;
			} else if (!translations[lng][key] || hasOwnOptions) {
				translations[lng][key] = t(key, options);
			}

		}

		function $i18nextTanslate(key, options) {

			var optionsObj = options || {},
				mergedOptions = options ? angular.extend({}, optionsObj, options) : optionsObj;

			translate(key, mergedOptions, !!options);

			return (options && options.lng) ? translations[options.lng][key] :
				!!optionsObj.lng ? translations[optionsObj.lng][key] : translations['auto'][key];

		}

		$i18nextTanslate.debugMsg = [];

		$i18nextTanslate.options = self.options;

		if (self.options !== globalOptions) {
			optionsChange(self.options, globalOptions);
		}

		$rootScope.$watch(function () { return $i18nextTanslate.options; }, function (newOptions, oldOptions) {
			// Check whether there are new options and whether the new options are different from the old options.
			if (!!newOptions && oldOptions !== newOptions) {
				optionsChange(newOptions, oldOptions);
			}
		}, true);

		return $i18nextTanslate;

	}];

});

angular.module('jm.i18next').directive('ngI18next', ['$rootScope', '$i18next', '$compile', '$parse', function ($rootScope, $i18next, $compile, $parse) {

	'use strict';

	function parse(scope, element, key) {

		var attr = 'text',
			attrs = [attr],
			string;

		/*
		 * Check if we want to translate an attribute
		 */
		if (key.indexOf('[') === 0) {
			var parts = key.split(']');
			key = parts[1];
			attr = parts[0].substr(1, parts[0].length - 1);
		}
		/*
		 * Cut of the ";" that might be at the end of the string
		 */
		if (key.indexOf(';') === key.length - 1) {
			key = key.substr(0, key.length - 2);
		}
		/*
		 * If passing options, split attr
		 */
		if (attr.indexOf(':') >= 0) {
			attrs = attr.split(':');
			attr = attrs[0];
		} else if (attr === 'i18next') {
			attrs[1] = 'i18next';
			attr = 'text';
		}

		if (attr !== 'i18next' && attrs[1] !== 'i18next') {

			string = $i18next(key);

		} else {

			var options = {},
				strippedKey = key;

			if (key.indexOf('(') >= 0 && key.indexOf(')') >= 0) {

				var keys = key.split(')');

				keys[0] = keys[0].substr(1, keys[0].length);

				if (keys.length > 2) {

					strippedKey = keys.pop();

					options = $parse(keys.join(')'))();

				} else {

					options = $parse(keys[0])();
					strippedKey = keys[1];

				}

			}

			string = $i18next(strippedKey, options);

		}

		if (attr === 'html') {

			element.empty().append(string);

		} else if (attr === 'text') {

			element.text(string);

		} else {

			element.attr(attr, string);

		}
		/*
		 * Now compile the content of the element and bind the variables to
		 * the scope
		 */
		$compile(element.contents())(scope);

		if (!$rootScope.$$phase) {
			$rootScope.$digest();
		}
	}


	function localize(scope, element, key) {

		if (key.indexOf(';') >= 0) {

			var keys = key.split(';');

			for (var i = 0; i < keys.length; i++) {
				if (keys[i] !== '') {
					parse(scope, element, keys[i]);
				}
			}

		} else {
			parse(scope, element, key);
		}

	}

	return {

		// 'A': only as attribute
		restrict: 'A',

		scope: false,

		link: function postLink(scope, element, attrs) {

			var translationValue;

			function observe (value) {

				if (value === '') {
					translationValue = element.text().replace(/^\s+|\s+$/g, ''); // RegEx removes whitespace
				} else {
					translationValue = value;
				}

				if (!translationValue) {
					// Well, seems that we don't have anything to translate...
					return;
				}

				localize(scope, element, translationValue);

			}

			attrs.$observe('ngI18next', observe);

			observe(attrs.ngI18next);

			scope.$on('i18nextLanguageChange', function () {
				localize(scope, element, translationValue);
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
