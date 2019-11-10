/**
 * Angular Dynamic Locale - 0.1.32
 * https://github.com/lgalfaso/angular-dynamic-locale
 * License: MIT
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
'use strict';
angular.module('tmh.dynamicLocale', []).config(['$provide', function($provide) {
  function makeStateful($delegate) {
    $delegate.$stateful = true;
    return $delegate;
  }

  $provide.decorator('dateFilter', ['$delegate', makeStateful]);
  $provide.decorator('numberFilter', ['$delegate', makeStateful]);
  $provide.decorator('currencyFilter', ['$delegate', makeStateful]);

}])
.constant('tmhDynamicLocale.STORAGE_KEY', 'tmhDynamicLocale.locale')
.provider('tmhDynamicLocale', ['tmhDynamicLocale.STORAGE_KEY', function(STORAGE_KEY) {

  var defaultLocale,
    localeLocationPattern = 'angular/i18n/angular-locale_{{locale}}.js',
    nodeToAppend,
    storageFactory = 'tmhDynamicLocaleStorageCache',
    storage,
    storageKey = STORAGE_KEY,
    promiseCache = {},
    activeLocale,
    extraProperties = {};

  /**
   * Loads a script asynchronously
   *
   * @param {string} url The url for the script
   @ @param {function} callback A function to be called once the script is loaded
   */
  function loadScript(url, callback, errorCallback, $timeout) {
    var script = document.createElement('script'),
      element = nodeToAppend ? nodeToAppend : document.getElementsByTagName("body")[0],
      removed = false;

    script.type = 'text/javascript';
    if (script.readyState) { // IE
      script.onreadystatechange = function () {
        if (script.readyState === 'complete' ||
            script.readyState === 'loaded') {
          script.onreadystatechange = null;
          $timeout(
            function () {
              if (removed) return;
              removed = true;
              element.removeChild(script);
              callback();
            }, 30, false);
        }
      };
    } else { // Others
      script.onload = function () {
        if (removed) return;
        removed = true;
        element.removeChild(script);
        callback();
      };
      script.onerror = function () {
        if (removed) return;
        removed = true;
        element.removeChild(script);
        errorCallback();
      };
    }
    script.src = url;
    script.async = true;
    element.appendChild(script);
  }

  /**
   * Loads a locale and replaces the properties from the current locale with the new locale information
   *
   * @param {string} localeUrl The path to the new locale
   * @param {Object} $locale The locale at the curent scope
   * @param {string} localeId The locale id to load
   * @param {Object} $rootScope The application $rootScope
   * @param {Object} $q The application $q
   * @param {Object} localeCache The current locale cache
   * @param {Object} $timeout The application $timeout
   */
  function loadLocale(localeUrl, $locale, localeId, $rootScope, $q, localeCache, $timeout) {

    function overrideValues(oldObject, newObject) {
      if (activeLocale !== localeId) {
        return;
      }
      angular.forEach(oldObject, function(value, key) {
        if (!newObject[key]) {
          delete oldObject[key];
        } else if (angular.isArray(newObject[key])) {
          oldObject[key].length = newObject[key].length;
        }
      });
      angular.forEach(newObject, function(value, key) {
        if (angular.isArray(newObject[key]) || angular.isObject(newObject[key])) {
          if (!oldObject[key]) {
            oldObject[key] = angular.isArray(newObject[key]) ? [] : {};
          }
          overrideValues(oldObject[key], newObject[key]);
        } else {
          oldObject[key] = newObject[key];
        }
      });
    }


    if (promiseCache[localeId]) {
      activeLocale = localeId;
      return promiseCache[localeId];
    }

    var cachedLocale,
      deferred = $q.defer();
    if (localeId === activeLocale) {
      deferred.resolve($locale);
    } else if ((cachedLocale = localeCache.get(localeId))) {
      activeLocale = localeId;
      $rootScope.$evalAsync(function() {
        overrideValues($locale, cachedLocale);
        storage.put(storageKey, localeId);
        $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
        deferred.resolve($locale);
      });
    } else {
      activeLocale = localeId;
      promiseCache[localeId] = deferred.promise;
      loadScript(localeUrl, function() {
        // Create a new injector with the new locale
        var localInjector = angular.injector(['ngLocale']),
          externalLocale = localInjector.get('$locale');

        overrideValues($locale, externalLocale);
        localeCache.put(localeId, externalLocale);
        delete promiseCache[localeId];

        $rootScope.$applyAsync(function() {
          storage.put(storageKey, localeId);
          $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
          deferred.resolve($locale);
        });
      }, function() {
        delete promiseCache[localeId];

        $rootScope.$applyAsync(function() {
          if (activeLocale === localeId) {
            activeLocale = $locale.id;
          }
          $rootScope.$broadcast('$localeChangeError', localeId);
          deferred.reject(localeId);
        });
      }, $timeout);
    }
    return deferred.promise;
  }

  this.localeLocationPattern = function(value) {
    if (value) {
      localeLocationPattern = value;
      return this;
    } else {
      return localeLocationPattern;
    }
  };

  this.appendScriptTo = function(nodeElement) {
    nodeToAppend = nodeElement;
  };

  this.useStorage = function(storageName) {
    storageFactory = storageName;
  };

  this.useCookieStorage = function() {
    this.useStorage('$cookieStore');
  };

  this.defaultLocale = function(value) {
    defaultLocale = value;
  };

  this.storageKey = function(value) {
    if (value) {
      storageKey = value;
      return this;
    } else {
      return storageKey;
    }
  };

  this.addLocalePatternValue = function(key, value) {
    extraProperties[key] = value;
  };

  this.$get = ['$rootScope', '$injector', '$interpolate', '$locale', '$q', 'tmhDynamicLocaleCache', '$timeout', function($rootScope, $injector, interpolate, locale, $q, tmhDynamicLocaleCache, $timeout) {
    var localeLocation = interpolate(localeLocationPattern);

    storage = $injector.get(storageFactory);
    $rootScope.$evalAsync(function() {
      var initialLocale;
      if ((initialLocale = (storage.get(storageKey) || defaultLocale))) {
        loadLocaleFn(initialLocale);
      }
    });
    return {
      /**
       * @ngdoc method
       * @description
       * @param {string} value Sets the locale to the new locale. Changing the locale will trigger
       *    a background task that will retrieve the new locale and configure the current $locale
       *    instance with the information from the new locale
       */
      set: loadLocaleFn,
      /**
       * @ngdoc method
       * @description Returns the configured locale
       */
      get: function() {
        return activeLocale;
      }
    };

    function loadLocaleFn(localeId) {
      var baseProperties = {locale: localeId, angularVersion: angular.version.full};
      return loadLocale(localeLocation(angular.extend({}, extraProperties, baseProperties)), locale, localeId, $rootScope, $q, tmhDynamicLocaleCache, $timeout);
    }
  }];
}]).provider('tmhDynamicLocaleCache', function() {
  this.$get = ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('tmh.dynamicLocales');
  }];
}).provider('tmhDynamicLocaleStorageCache', function() {
  this.$get = ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('tmh.dynamicLocales.store');
  }];
}).run(['tmhDynamicLocale', angular.noop]);

return 'tmh.dynamicLocale';

}));
