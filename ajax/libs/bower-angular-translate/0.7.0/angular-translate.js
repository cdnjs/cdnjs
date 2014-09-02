angular.module('ngTranslate', ['ng']).run([
  '$translate',
  function ($translate) {
    var key = $translate.storageKey(), storage = $translate.storage();
    if (storage) {
      if (!storage.get(key)) {
        if (angular.isString($translate.preferredLanguage())) {
          $translate.uses($translate.preferredLanguage());
        } else {
          storage.set(key, $translate.uses());
        }
      } else {
        $translate.uses(storage.get(key));
      }
    } else if (angular.isString($translate.preferredLanguage())) {
      $translate.uses($translate.preferredLanguage());
    }
  }
]);
angular.module('ngTranslate').constant('$STORAGE_KEY', 'NG_TRANSLATE_LANG_KEY');
angular.module('ngTranslate').provider('$translate', [
  '$STORAGE_KEY',
  function ($STORAGE_KEY) {
    var $translationTable = {}, $preferredLanguage, $uses, $storageFactory, $storageKey = $STORAGE_KEY, $storagePrefix, $missingTranslationHandler, $asyncLoaders = [], NESTED_OBJECT_DELIMITER = '.';
    var LoaderGenerator = {
        forUrl: function (url) {
          return [
            '$http',
            '$q',
            function ($http, $q) {
              return function (key) {
                var deferred = $q.defer();
                $http({
                  url: url,
                  params: { lang: key },
                  method: 'GET'
                }).success(function (data, status) {
                  deferred.resolve(data);
                }).error(function (data, status) {
                  deferred.reject(key);
                });
                return deferred.promise;
              };
            }
          ];
        },
        byStaticFiles: function (prefix, suffix) {
          return [
            '$http',
            '$q',
            function ($http, $q) {
              return function (key) {
                var deferred = $q.defer();
                $http({
                  url: [
                    prefix,
                    key,
                    suffix
                  ].join(''),
                  method: 'GET',
                  params: ''
                }).success(function (data, status) {
                  deferred.resolve(data);
                }).error(function (data, status) {
                  deferred.reject(key);
                });
                return deferred.promise;
              };
            }
          ];
        }
      };
    var translations = function (langKey, translationTable) {
      if (!langKey && !translationTable) {
        return $translationTable;
      }
      if (langKey && !translationTable) {
        if (angular.isString(langKey)) {
          return $translationTable[langKey];
        } else {
          angular.extend($translationTable, flatObject(langKey));
        }
      } else {
        if (!angular.isObject($translationTable[langKey])) {
          $translationTable[langKey] = {};
        }
        angular.extend($translationTable[langKey], flatObject(translationTable));
      }
    };
    var flatObject = function (data, path, result) {
      var key, keyWithPath, val;
      if (!path) {
        path = [];
      }
      if (!result) {
        result = {};
      }
      for (key in data) {
        if (!data.hasOwnProperty(key))
          continue;
        val = data[key];
        if (angular.isObject(val)) {
          flatObject(val, path.concat(key), result);
        } else {
          keyWithPath = path.length ? '' + path.join(NESTED_OBJECT_DELIMITER) + NESTED_OBJECT_DELIMITER + key : key;
          result[keyWithPath] = val;
        }
      }
      return result;
    };
    var invokeLoading = function ($injector, key) {
      var deferred = $injector.get('$q').defer(), loaderFnBuilder = $asyncLoaders[0], loaderFn;
      if (loaderFnBuilder) {
        loaderFn = $injector.invoke(loaderFnBuilder);
        if (angular.isFunction(loaderFn)) {
          loaderFn(key).then(function (data) {
            translations(key, data);
            deferred.resolve(data);
          }, function (key) {
            deferred.reject(key);
          });
        } else {
          deferred.reject(key);
        }
      } else {
        deferred.reject(key);
      }
      return deferred.promise;
    };
    this.translations = translations;
    this.preferredLanguage = function (langKey) {
      if (langKey) {
        $preferredLanguage = langKey;
      } else {
        return $preferredLanguage;
      }
    };
    this.uses = function (langKey) {
      if (langKey) {
        if (!$translationTable[langKey] && !$asyncLoaders.length) {
          throw new Error('$translateProvider couldn\'t find translationTable for langKey: \'' + langKey + '\'');
        }
        $uses = langKey;
      } else {
        return $uses;
      }
    };
    var storageKey = function (key) {
      if (!key) {
        if ($storagePrefix) {
          return $storagePrefix + $storageKey;
        }
        return $storageKey;
      }
      $storageKey = key;
    };
    this.storageKey = storageKey;
    this.missingTranslationHandler = function (functionHandler) {
      if (angular.isUndefined(functionHandler)) {
        return $missingTranslationHandler;
      }
      $missingTranslationHandler = functionHandler;
    };
    this.registerLoader = function (loader) {
      if (!loader) {
        throw new Error('Please define a valid loader!');
      }
      var $loader;
      if (!(angular.isFunction(loader) || angular.isArray(loader))) {
        if (angular.isString(loader)) {
          loader = {
            type: 'url',
            url: loader
          };
        }
        switch (loader.type) {
        case 'url':
          $loader = LoaderGenerator.forUrl(loader.url);
          break;
        case 'static-files':
          $loader = LoaderGenerator.byStaticFiles(loader.prefix, loader.suffix);
          break;
        }
      } else {
        $loader = loader;
      }
      $asyncLoaders.push($loader);
    };
    this.useLoaderFactory = function (loader) {
      this.registerLoader(loader);
    };
    this.useLocalStorage = function () {
      this.useStorage('$translateLocalStorage');
    };
    this.useCookieStorage = function () {
      this.useStorage('$translateCookieStorage');
    };
    this.useStorage = function (storageFactory) {
      $storageFactory = storageFactory;
    };
    this.storagePrefix = function (prefix) {
      if (!prefix) {
        return prefix;
      }
      $storagePrefix = prefix;
    };
    this.$get = [
      '$interpolate',
      '$log',
      '$injector',
      '$rootScope',
      '$q',
      function ($interpolate, $log, $injector, $rootScope, $q) {
        var Storage;
        if ($storageFactory) {
          Storage = $injector.get($storageFactory);
          if (!Storage.get || !Storage.set) {
            throw new Error('Couldn\'t use storage \'' + $storageFactory + '\', missing get() or set() method!');
          }
        }
        var $translate = function (translationId, interpolateParams) {
          var translation = $uses ? $translationTable[$uses] ? $translationTable[$uses][translationId] : translationId : $translationTable[translationId];
          if (translation) {
            return $interpolate(translation)(interpolateParams);
          }
          if (!angular.isUndefined($missingTranslationHandler)) {
            $missingTranslationHandler(translationId);
          } else {
            $log.warn('Translation for ' + translationId + ' doesn\'t exist');
          }
          return translationId;
        };
        $translate.preferredLanguage = function () {
          return $preferredLanguage;
        };
        $translate.storage = function () {
          return Storage;
        };
        $translate.uses = function (key) {
          if (!key) {
            return $uses;
          }
          var deferred = $q.defer();
          if (!$translationTable[key]) {
            invokeLoading($injector, key).then(function (data) {
              $uses = key;
              if ($storageFactory) {
                Storage.set($translate.storageKey(), $uses);
              }
              $rootScope.$broadcast('translationChangeSuccess');
              deferred.resolve($uses);
            }, function (key) {
              $rootScope.$broadcast('translationChangeError');
              deferred.reject(key);
            });
            return deferred.promise;
          }
          $uses = key;
          if ($storageFactory) {
            Storage.set($translate.storageKey(), $uses);
          }
          deferred.resolve($uses);
          $rootScope.$broadcast('translationChangeSuccess');
          return deferred.promise;
        };
        $translate.storageKey = function () {
          return storageKey();
        };
        if ($asyncLoaders.length && angular.equals($translationTable, {})) {
          $translate.uses($translate.uses());
        }
        return $translate;
      }
    ];
  }
]);
angular.module('ngTranslate').directive('translate', [
  '$filter',
  '$interpolate',
  function ($filter, $interpolate) {
    var translate = $filter('translate');
    return {
      restrict: 'A',
      scope: true,
      link: function linkFn(scope, element, attr) {
        attr.$observe('translate', function (translationId) {
          if (angular.equals(translationId, '')) {
            scope.translationId = $interpolate(element.text().replace(/^\s+|\s+$/g, ''))(scope.$parent);
          } else {
            scope.translationId = translationId;
          }
        });
        attr.$observe('values', function (interpolateParams) {
          scope.interpolateParams = interpolateParams;
        });
        scope.$on('translationChangeSuccess', function () {
          element.html(translate(scope.translationId, scope.interpolateParams));
        });
        scope.$watch('translationId + interpolateParams', function (nValue) {
          if (nValue) {
            element.html(translate(scope.translationId, scope.interpolateParams));
          }
        });
      }
    };
  }
]);
angular.module('ngTranslate').filter('translate', [
  '$parse',
  '$translate',
  function ($parse, $translate) {
    return function (translationId, interpolateParams) {
      if (!angular.isObject(interpolateParams)) {
        interpolateParams = $parse(interpolateParams)();
      }
      return $translate(translationId, interpolateParams);
    };
  }
]);
angular.module('ngTranslate').factory('$translateCookieStorage', [
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
angular.module('ngTranslate').factory('$translateLocalStorage', [
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