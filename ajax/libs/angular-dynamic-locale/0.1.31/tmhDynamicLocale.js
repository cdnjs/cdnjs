/**
 * Angular Dynamic Locale - 0.1.27
 * https://github.com/lgalfaso/angular-dynamic-locale
 * License: MIT
 */
(function(window) {
'use strict';
angular.module('tmh.dynamicLocale', []).config(['$provide', function ($provide) {
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
    storageFactory = 'tmhDynamicLocaleStorageCache',
    storage,
    storageKey = STORAGE_KEY,
    promiseCache = {},
    activeLocale;

  /**
   * Loads a script asynchronously
   *
   * @param {string} url The url for the script
   * @param {function) callback A function to be called once the script is loaded
   */
  function loadScript(url, callback, errorCallback, $timeout) {
    var script = document.createElement('script'),
      body = document.getElementsByTagName('body')[0],
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
              body.removeChild(script);
              callback();
            }, 30, false);
        }
      };
    } else { // Others
      script.onload = function () {
        if (removed) return;
        removed = true;
        body.removeChild(script);
        callback();
      };
      script.onerror = function () {
        if (removed) return;
        removed = true;
        body.removeChild(script);
        errorCallback();
      };
    }
    script.src = url;
    script.async = false;
    body.appendChild(script);
  }

  /**
   * Loads a locale and replaces the properties from the current locale with the new locale information
   *
   * @param localeUrl The path to the new locale
   * @param $locale The locale at the curent scope
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


    if (promiseCache[localeId]) return promiseCache[localeId];

    var cachedLocale,
      deferred = $q.defer();
    if (localeId === activeLocale) {
      deferred.resolve($locale);
    } else if ((cachedLocale = localeCache.get(localeId))) {
      activeLocale = localeId;
      $rootScope.$evalAsync(function() {
        overrideValues($locale, cachedLocale);
        $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
        storage.put(storageKey, localeId);
        deferred.resolve($locale);
      });
    } else {
      activeLocale = localeId;
      promiseCache[localeId] = deferred.promise;
      loadScript(localeUrl, function () {
        // Create a new injector with the new locale
        var localInjector = angular.injector(['ngLocale']),
          externalLocale = localInjector.get('$locale');

        overrideValues($locale, externalLocale);
        localeCache.put(localeId, externalLocale);
        delete promiseCache[localeId];

        $rootScope.$apply(function () {
          $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
          storage.put(storageKey, localeId);
          deferred.resolve($locale);
        });
      }, function () {
        delete promiseCache[localeId];

        $rootScope.$apply(function () {
          if (activeLocale === localeId) activeLocale = $locale.id;
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

  this.useStorage = function(storageName) {
    storageFactory = storageName;
  };

  this.useCookieStorage = function() {
    this.useStorage('$cookieStore');
  };

  this.defaultLocale = function (value) {
    defaultLocale = value;
  };

  this.storageKey = function (value) {
    if (value) {
      storageKey = value;
      return this;
    } else {
      return storageKey;
    }
  };

  this.$get = ['$rootScope', '$injector', '$interpolate', '$locale', '$q', 'tmhDynamicLocaleCache', '$timeout', function($rootScope, $injector, interpolate, locale, $q, tmhDynamicLocaleCache, $timeout) {
    var localeLocation = interpolate(localeLocationPattern);

    storage = $injector.get(storageFactory);
    $rootScope.$evalAsync(function () {
      var initialLocale;
      if ((initialLocale = (storage.get(storageKey) || defaultLocale))) {
        loadLocale(localeLocation({locale: initialLocale}), locale, initialLocale, $rootScope, $q, tmhDynamicLocaleCache, $timeout);
      }
    });
    return {
      /**
       * @ngdoc method
       * @description
       * @param {string=} value Sets the locale to the new locale. Changing the locale will trigger
       *    a background task that will retrieve the new locale and configure the current $locale
       *    instance with the information from the new locale
       */
      set: function(value) {
        return loadLocale(localeLocation({locale: value}), locale, value, $rootScope, $q, tmhDynamicLocaleCache, $timeout);
      },
      /**
       * @ngdoc method
       * @description Returns the configured locale
       */
      get: function() {
        return activeLocale;
      }
    };
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
}(window));
