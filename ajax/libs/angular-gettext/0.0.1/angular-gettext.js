angular.module('gettext', []);
angular.module('gettext').factory('gettextCatalog', [
  'gettextPlurals',
  function (gettextPlurals) {
    var Catalog;
    Catalog = function () {
      function Catalog() {
        this.debug = false;
        this.strings = {};
        this.currentLanguage = 'en';
      }
      Catalog.prototype.setStrings = function (language, strings) {
        return this.strings[language] = strings;
      };
      Catalog.prototype.getString = function (string) {
        var _ref;
        return ((_ref = this.strings[this.currentLanguage]) != null ? _ref[string] : void 0) || (this.debug ? '[MISSING]: ' + string : string);
      };
      Catalog.prototype.getPlural = function (n, string, stringPlural) {
        var form, plurals, _ref, _ref1;
        form = gettextPlurals(this.currentLanguage, n);
        plurals = ((_ref = this.strings[this.currentLanguage]) != null ? (_ref1 = _ref['_plurals']) != null ? _ref1[string] : void 0 : void 0) || [];
        return plurals[form] || (n === 1 ? string : stringPlural);
      };
      return Catalog;
    }();
    return new Catalog();
  }
]);
angular.module('gettext').directive('translate', [
  'gettextCatalog',
  '$interpolate',
  '$parse',
  function (gettextCatalog, $interpolate, $parse) {
    return {
      compile: function (element, attrs) {
        var err, input;
        err = function (missing, found) {
          throw new Error('You should add a ' + missing + ' attribute whenever you add a ' + found + ' attribute.');
        };
        if (attrs.translatePlural && !attrs.translateN) {
          err('translate-n', 'translate-plural');
        }
        if (attrs.translateN && !attrs.translatePlural) {
          err('translate-plural', 'translate-n');
        }
        input = element.html();
        return function (scope) {
          var countFn, process;
          countFn = $parse(attrs.translateN);
          process = function () {
            var interpolated, prev, translated;
            prev = element.html();
            if (attrs.translatePlural) {
              translated = gettextCatalog.getPlural(countFn(scope), input, attrs.translatePlural);
            } else {
              translated = gettextCatalog.getString(input);
            }
            interpolated = $interpolate(translated)(scope);
            if (prev === interpolated) {
              return;
            }
            return element.html(interpolated);
          };
          return scope.$watch(process);
        };
      }
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