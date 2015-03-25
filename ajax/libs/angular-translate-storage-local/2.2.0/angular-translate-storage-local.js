/*!
 * angular-translate - v2.2.0 - 2014-06-03
 * http://github.com/PascalPrecht/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module('pascalprecht.translate').factory('$translateLocalStorage', [
  '$window',
  '$translateCookieStorage',
  function ($window, $translateCookieStorage) {
    var localStorageAdapter = function () {
        var langKey;
        return {
          get: function (name) {
            if (!langKey) {
              langKey = $window.localStorage.getItem(name);
            }
            return langKey;
          },
          set: function (name, value) {
            langKey = value;
            $window.localStorage.setItem(name, value);
          }
        };
      }();
    var hasLocalStorageSupport = 'localStorage' in $window && $window.localStorage !== null;
    if (hasLocalStorageSupport) {
      var testKey = 'pascalprecht.translate.storageTest';
      try {
        $window.localStorage.setItem(testKey, 'foo');
        $window.localStorage.removeItem(testKey);
      } catch (e) {
        hasLocalStorageSupport = false;
      }
    }
    var $translateLocalStorage = hasLocalStorageSupport ? localStorageAdapter : $translateCookieStorage;
    return $translateLocalStorage;
  }
]);