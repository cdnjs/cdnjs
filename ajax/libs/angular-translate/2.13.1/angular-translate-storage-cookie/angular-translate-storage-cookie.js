/*!
 * angular-translate - v2.13.1 - 2016-12-06
 * 
 * Copyright (c) 2016 The angular-translate team, Pascal Precht; Licensed MIT
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    factory();
  }
}(this, function () {

$translateCookieStorageFactory.$inject = ['$cookieStore'];
angular.module('pascalprecht.translate')

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateCookieStorage
 * @requires $cookieStore
 *
 * @description
 * Abstraction layer for cookieStore. This service is used when telling angular-translate
 * to use cookieStore as storage.
 *
 */
  .factory('$translateCookieStorage', $translateCookieStorageFactory);

function $translateCookieStorageFactory($cookieStore) {

  'use strict';

  var $translateCookieStorage = {

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translateCookieStorage#get
     * @methodOf pascalprecht.translate.$translateCookieStorage
     *
     * @description
     * Returns an item from cookieStorage by given name.
     *
     * @param {string} name Item name
     * @return {string} Value of item name
     */
    get: function (name) {
      return $cookieStore.get(name);
    },

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translateCookieStorage#set
     * @methodOf pascalprecht.translate.$translateCookieStorage
     *
     * @description
     * Sets an item in cookieStorage by given name.
     *
     * @deprecated use #put
     *
     * @param {string} name Item name
     * @param {string} value Item value
     */
    set: function (name, value) {
      $cookieStore.put(name, value);
    },

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translateCookieStorage#put
     * @methodOf pascalprecht.translate.$translateCookieStorage
     *
     * @description
     * Sets an item in cookieStorage by given name.
     *
     * @param {string} name Item name
     * @param {string} value Item value
     */
    put: function (name, value) {
      $cookieStore.put(name, value);
    }
  };

  return $translateCookieStorage;
}

$translateCookieStorageFactory.displayName = '$translateCookieStorage';
return 'pascalprecht.translate';

}));
