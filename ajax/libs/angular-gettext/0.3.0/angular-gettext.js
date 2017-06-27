angular.module('gettext', []);
angular.module('gettext').constant('gettext', function (str) {
  /*
     * Does nothing, simply returns the input string.
     *
     * This function serves as a marker for `grunt-angular-gettext` to know that
     * this string should be extracted for translations.
     */
  return str;
});
angular.module('gettext').factory('gettextCatalog', [
  'gettextPlurals',
  '$http',
  '$cacheFactory',
  '$interpolate',
  function (gettextPlurals, $http, $cacheFactory, $interpolate) {
    var catalog;
    var prefixDebug = function (string) {
      if (catalog.debug && catalog.currentLanguage !== catalog.baseLanguage) {
        return '[MISSING]: ' + string;
      } else {
        return string;
      }
    };
    catalog = {
      debug: false,
      strings: {},
      baseLanguage: 'en',
      currentLanguage: 'en',
      cache: $cacheFactory('strings'),
      setStrings: function (language, strings) {
        if (!this.strings[language]) {
          this.strings[language] = {};
        }
        for (var key in strings) {
          var val = strings[key];
          if (typeof val === 'string') {
            this.strings[language][key] = [val];
          } else {
            this.strings[language][key] = val;
          }
        }
      },
      getStringForm: function (string, n) {
        var stringTable = this.strings[this.currentLanguage] || {};
        var plurals = stringTable[string] || [];
        return plurals[n];
      },
      getString: function (string, context) {
        string = this.getStringForm(string, 0) || prefixDebug(string);
        return context ? $interpolate(string)(context) : string;
      },
      getPlural: function (n, string, stringPlural, context) {
        var form = gettextPlurals(this.currentLanguage, n);
        string = this.getStringForm(string, form) || prefixDebug(n === 1 ? string : stringPlural);
        return context ? $interpolate(string)(context) : string;
      },
      loadRemote: function (url) {
        return $http({
          method: 'GET',
          url: url,
          cache: catalog.cache
        }).success(function (data) {
          for (var lang in data) {
            catalog.setStrings(lang, data[lang]);
          }
        });
      }
    };
    return catalog;
  }
]);
angular.module('gettext').directive('translate', [
  'gettextCatalog',
  '$interpolate',
  '$parse',
  '$compile',
  function (gettextCatalog, $interpolate, $parse, $compile) {
    /**
     * Trim fallback for old browsers(instead of jQuery)
     * Based on AngularJS-v1.2.2 (angular.js#620)
     */
    var trim = function () {
        if (!String.prototype.trim) {
          return function (value) {
            return typeof value === 'string' ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
          };
        }
        return function (value) {
          return typeof value === 'string' ? value.trim() : value;
        };
      }();
    return {
      transclude: 'element',
      priority: 499,
      compile: function (element, attrs, transclude) {
        return function ($scope, $element) {
          // Validate attributes
          var assert = function (condition, missing, found) {
            if (!condition) {
              throw new Error('You should add a ' + missing + ' attribute whenever you add a ' + found + ' attribute.');
            }
          };
          assert(!attrs.translatePlural || attrs.translateN, 'translate-n', 'translate-plural');
          assert(!attrs.translateN || attrs.translatePlural, 'translate-plural', 'translate-n');
          // See https://github.com/angular/angular.js/issues/4852
          if (attrs.ngIf) {
            throw new Error('You should not combine translate with ng-if, this will lead to problems.');
          }
          if (attrs.ngSwitchWhen) {
            throw new Error('You should not combine translate with ng-switch-when, this will lead to problems.');
          }
          var countFn = $parse(attrs.translateN);
          var pluralScope = null;
          transclude($scope, function (clone) {
            var input = trim(clone.html());
            clone.removeAttr('translate');
            $element.replaceWith(clone);
            return $scope.$watch(function () {
              var prev = clone.html();
              // Fetch correct translated string.
              var translated;
              if (attrs.translatePlural) {
                $scope = pluralScope || (pluralScope = $scope.$new());
                $scope.$count = countFn($scope);
                translated = gettextCatalog.getPlural($scope.$count, input, attrs.translatePlural);
              } else {
                translated = gettextCatalog.getString(input);
              }
              // Interpolate with scope.
              var interpolated = $interpolate(translated)($scope);
              if (prev === interpolated) {
                return;  // Skip DOM change.
              }
              clone.html(interpolated);
              if (attrs.translateCompile !== undefined) {
                $compile(clone.contents())($scope);
              }
              return clone;
            });
          });
        };
      }
    };
  }
]);
angular.module('gettext').filter('translate', [
  'gettextCatalog',
  function (gettextCatalog) {
    return function (input) {
      return gettextCatalog.getString(input);
    };
  }
]);
// Do not edit this file, it is autogenerated using genplurals.py!
angular.module('gettext').factory('gettextPlurals', function () {
  return function (langCode, n) {
    switch (langCode) {
    case 'ay':
    // Aymará
    case 'bo':
    // Tibetan
    case 'cgg':
    // Chiga
    case 'dz':
    // Dzongkha
    case 'fa':
    // Persian
    case 'id':
    // Indonesian
    case 'ja':
    // Japanese
    case 'jbo':
    // Lojban
    case 'ka':
    // Georgian
    case 'kk':
    // Kazakh
    case 'km':
    // Khmer
    case 'ko':
    // Korean
    case 'ky':
    // Kyrgyz
    case 'lo':
    // Lao
    case 'ms':
    // Malay
    case 'my':
    // Burmese
    case 'sah':
    // Yakut
    case 'su':
    // Sundanese
    case 'th':
    // Thai
    case 'tt':
    // Tatar
    case 'ug':
    // Uyghur
    case 'vi':
    // Vietnamese
    case 'wo':
    // Wolof
    case 'zh':
      // Chinese
      // 1 form
      return 0;
    case 'is':
      // Icelandic
      // 2 forms
      return n % 10 != 1 || n % 100 == 11 ? 1 : 0;
    case 'jv':
      // Javanese
      // 2 forms
      return n != 0 ? 1 : 0;
    case 'mk':
      // Macedonian
      // 2 forms
      return n == 1 || n % 10 == 1 ? 0 : 1;
    case 'ach':
    // Acholi
    case 'ak':
    // Akan
    case 'am':
    // Amharic
    case 'arn':
    // Mapudungun
    case 'br':
    // Breton
    case 'fil':
    // Filipino
    case 'fr':
    // French
    case 'gun':
    // Gun
    case 'ln':
    // Lingala
    case 'mfe':
    // Mauritian Creole
    case 'mg':
    // Malagasy
    case 'mi':
    // Maori
    case 'oc':
    // Occitan
    case 'pt_BR':
    // Brazilian Portuguese
    case 'tg':
    // Tajik
    case 'ti':
    // Tigrinya
    case 'tr':
    // Turkish
    case 'uz':
    // Uzbek
    case 'wa':
    // Walloon
    case 'zh':
      // Chinese
      // 2 forms
      return n > 1 ? 1 : 0;
    case 'lv':
      // Latvian
      // 3 forms
      return n % 10 == 1 && n % 100 != 11 ? 0 : n != 0 ? 1 : 2;
    case 'lt':
      // Lithuanian
      // 3 forms
      return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    case 'be':
    // Belarusian
    case 'bs':
    // Bosnian
    case 'hr':
    // Croatian
    case 'ru':
    // Russian
    case 'sr':
    // Serbian
    case 'uk':
      // Ukrainian
      // 3 forms
      return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    case 'mnk':
      // Mandinka
      // 3 forms
      return n == 0 ? 0 : n == 1 ? 1 : 2;
    case 'ro':
      // Romanian
      // 3 forms
      return n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2;
    case 'pl':
      // Polish
      // 3 forms
      return n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    case 'cs':
    // Czech
    case 'sk':
      // Slovak
      // 3 forms
      return n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
    case 'sl':
      // Slovenian
      // 4 forms
      return n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0;
    case 'mt':
      // Maltese
      // 4 forms
      return n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3;
    case 'gd':
      // Scottish Gaelic
      // 4 forms
      return n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3;
    case 'cy':
      // Welsh
      // 4 forms
      return n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3;
    case 'kw':
      // Cornish
      // 4 forms
      return n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3;
    case 'ga':
      // Irish
      // 5 forms
      return n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4;
    case 'ar':
      // Arabic
      // 6 forms
      return n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    default:
      // Everything else
      return n != 1 ? 1 : 0;
    }
  };
});