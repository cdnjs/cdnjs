/*!
 * angular-translate - v2.1.1 - 2014-05-20
 * http://github.com/PascalPrecht/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module('pascalprecht.translate').factory('$translateLocalStorage', [
  '$window',
  '$translateCookieStorage',
  function ($window, $translateCookieStorage) {
    var localStorageAdapter = {
        get: function (name) {
          return $window.localStorage.getItem(name);
        },
        set: function (name, value) {
          $window.localStorage.setItem(name, value);
        }
      };
    var $translateLocalStorage = 'localStorage' in $window && $window.localStorage !== null ? localStorageAdapter : $translateCookieStorage;
    return $translateLocalStorage;
  }
]);
