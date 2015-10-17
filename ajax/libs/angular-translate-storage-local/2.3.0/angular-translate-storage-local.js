/*!
 * angular-translate - v2.3.0 - 2014-09-16
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
    var hasLocalStorageSupport = 'localStorage' in $window;
    if (hasLocalStorageSupport) {
      var testKey = 'pascalprecht.translate.storageTest';
      try {
        if ($window.localStorage !== null) {
          $window.localStorage.setItem(testKey, 'foo');
          $window.localStorage.removeItem(testKey);
          hasLocalStorageSupport = true;
        } else {
          hasLocalStorageSupport = false;
        }
      } catch (e) {
        hasLocalStorageSupport = false;
      }
    }
    var $translateLocalStorage = hasLocalStorageSupport ? localStorageAdapter : $translateCookieStorage;
    return $translateLocalStorage;
  }
]);