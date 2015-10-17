angular.module('gettext', []);
angular.module('gettext').constant('gettext', function (str) {
  return str;
});
angular.module('gettext').factory('gettextCatalog', [
  'gettextPlurals',
  '$http',
  '$cacheFactory',
  function (gettextPlurals, $http, $cacheFactory) {
    var catalog;
    var prefixDebug = function (string) {
      if (catalog.debug && catalog.currentLanguage !== 'en') {
        return '[MISSING]: ' + string;
      } else {
        return string;
      }
    };
    catalog = {
      debug: false,
      strings: {},
      currentLanguage: 'en',
      cache: $cacheFactory('strings'),
      setStrings: function (language, strings) {
        var key, val, _results;
        if (!this.strings[language]) {
          this.strings[language] = {};
        }
        for (key in strings) {
          val = strings[key];
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
      getString: function (string) {
        return this.getStringForm(string, 0) || prefixDebug(string);
      },
      getPlural: function (n, string, stringPlural) {
        var form = gettextPlurals(this.currentLanguage, n);
        return this.getStringForm(string, form) || prefixDebug(n === 1 ? string : stringPlural);
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
  function (gettextCatalog, $interpolate, $parse) {
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
          var assert = function (condition, missing, found) {
            if (!condition) {
              throw new Error('You should add a ' + missing + ' attribute whenever you add a ' + found + ' attribute.');
            }
          };
          assert(!attrs.translatePlural || attrs.translateN, 'translate-n', 'translate-plural');
          assert(!attrs.translateN || attrs.translatePlural, 'translate-plural', 'translate-n');
          assert(!attrs.ngIf, 'ng-if', 'translate');
          assert(!attrs.ngSwitchWhen, 'ng-switch-when', 'translate');
          var countFn = $parse(attrs.translateN);
          transclude($scope, function (clone) {
            var input = trim(clone.html());
            clone.removeAttr('translate');
            $element.replaceWith(clone);
            return $scope.$watch(function () {
              var prev = clone.html();
              var translated;
              if (attrs.translatePlural) {
                translated = gettextCatalog.getPlural(countFn($scope), input, attrs.translatePlural);
              } else {
                translated = gettextCatalog.getString(input);
              }
              var interpolated = $interpolate(translated)($scope);
              if (prev === interpolated) {
                return;
              }
              return clone.html(interpolated);
            });
          });
        };
      }
    };
  }
]);
angular.module('gettext').filter('translate', [
  'gettextCatalog',
  '$interpolate',
  '$parse',
  function (gettextCatalog, $interpolate, $parse) {
    return function (input) {
      return gettextCatalog.getString(input);
    };
  }
]);
angular.module('gettext').factory('gettextPlurals', function () {
  return function (langCode, n) {
    switch (langCode) {
    case 'ay':
    case 'bo':
    case 'cgg':
    case 'dz':
    case 'fa':
    case 'id':
    case 'ja':
    case 'jbo':
    case 'ka':
    case 'kk':
    case 'km':
    case 'ko':
    case 'ky':
    case 'lo':
    case 'ms':
    case 'my':
    case 'sah':
    case 'su':
    case 'th':
    case 'tt':
    case 'ug':
    case 'vi':
    case 'wo':
    case 'zh':
      return 0;
    case 'is':
      return n % 10 != 1 || n % 100 == 11 ? 1 : 0;
    case 'jv':
      return n != 0 ? 1 : 0;
    case 'mk':
      return n == 1 || n % 10 == 1 ? 0 : 1;
    case 'ach':
    case 'ak':
    case 'am':
    case 'arn':
    case 'br':
    case 'fil':
    case 'fr':
    case 'gun':
    case 'ln':
    case 'mfe':
    case 'mg':
    case 'mi':
    case 'oc':
    case 'pt_BR':
    case 'tg':
    case 'ti':
    case 'tr':
    case 'uz':
    case 'wa':
    case 'zh':
      return n > 1 ? 1 : 0;
    case 'lv':
      return n % 10 == 1 && n % 100 != 11 ? 0 : n != 0 ? 1 : 2;
    case 'lt':
      return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    case 'be':
    case 'bs':
    case 'hr':
    case 'ru':
    case 'sr':
    case 'uk':
      return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    case 'mnk':
      return n == 0 ? 0 : n == 1 ? 1 : 2;
    case 'ro':
      return n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2;
    case 'pl':
      return n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    case 'cs':
    case 'sk':
      return n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
    case 'sl':
      return n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0;
    case 'mt':
      return n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3;
    case 'gd':
      return n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3;
    case 'cy':
      return n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3;
    case 'kw':
      return n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3;
    case 'ga':
      return n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4;
    case 'ar':
      return n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    default:
      return n != 1 ? 1 : 0;
    }
  };
});