/*!
 * angular-translate - v2.4.1 - 2014-10-03
 * http://github.com/PascalPrecht/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module('pascalprecht.translate').factory('$translateUrlLoader', [
  '$q',
  '$http',
  function ($q, $http) {
    return function (options) {
      if (!options || !options.url) {
        throw new Error('Couldn\'t use urlLoader since no url is given!');
      }
      var deferred = $q.defer();
      $http(angular.extend({
        url: options.url,
        params: { lang: options.key },
        method: 'GET'
      }, options.$http)).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(options.key);
      });
      return deferred.promise;
    };
  }
]);