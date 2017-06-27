/*!
 * angular-translate - v2.4.0 - 2014-09-22
 * http://github.com/PascalPrecht/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module('pascalprecht.translate').factory('$translateCookieStorage', [
  '$cookieStore',
  function ($cookieStore) {
    var $translateCookieStorage = {
        get: function (name) {
          return $cookieStore.get(name);
        },
        set: function (name, value) {
          $cookieStore.put(name, value);
        }
      };
    return $translateCookieStorage;
  }
]);