angular.module('pascalprecht.translate', ['ng']).run([
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
    } else {
      if (angular.isString($translate.fallbackLanguage()) && $translate.fallbackLanguage() !== $translate.preferredLanguage()) {
        $translate.load($translate.fallbackLanguage());
      }
      if (angular.isString($translate.preferredLanguage())) {
        $translate.uses($translate.preferredLanguage());
      }
    }
  }
]);
angular.module('pascalprecht.translate').constant('$STORAGE_KEY', 'NG_TRANSLATE_LANG_KEY');
angular.module('pascalprecht.translate').provider('$translate', [
  '$STORAGE_KEY',
  function ($STORAGE_KEY) {
    var $translationTable = {}, $preferredLanguage, $fallbackLanguage, $uses, $nextLang, $storageFactory, $storageKey = $STORAGE_KEY, $storagePrefix, $missingTranslationHandlerFactory, $interpolationFactory, $interpolatorFactories = [], $loaderFactory, $loaderOptions, $notFoundIndicatorLeft, $notFoundIndicatorRight, NESTED_OBJECT_DELIMITER = '.';
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
    this.translations = translations;
    this.addInterpolation = function (factory) {
      $interpolatorFactories.push(factory);
    };
    this.useMessageFormatInterpolation = function () {
      this.useInterpolation('$translateMessageFormatInterpolation');
    };
    this.useInterpolation = function (factory) {
      $interpolationFactory = factory;
    };
    this.preferredLanguage = function (langKey) {
      if (langKey) {
        $preferredLanguage = langKey;
      } else {
        return $preferredLanguage;
      }
    };
    this.translationNotFoundIndicator = function (indicator) {
      this.translationNotFoundIndicatorLeft(indicator);
      this.translationNotFoundIndicatorRight(indicator);
    };
    this.translationNotFoundIndicatorLeft = function (indicator) {
      if (!indicator) {
        return $notFoundIndicatorLeft;
      }
      $notFoundIndicatorLeft = indicator;
    };
    this.translationNotFoundIndicatorRight = function (indicator) {
      if (!indicator) {
        return $notFoundIndicatorRight;
      }
      $notFoundIndicatorRight = indicator;
    };
    this.fallbackLanguage = function (langKey) {
      if (langKey) {
        $fallbackLanguage = langKey;
      } else {
        return $fallbackLanguage;
      }
    };
    this.uses = function (langKey) {
      if (langKey) {
        if (!$translationTable[langKey] && !$loaderFactory) {
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
    this.useUrlLoader = function (url) {
      this.useLoader('$translateUrlLoader', { url: url });
    };
    this.useStaticFilesLoader = function (options) {
      this.useLoader('$translateStaticFilesLoader', options);
    };
    this.useLoader = function (loaderFactory, options) {
      $loaderFactory = loaderFactory;
      $loaderOptions = options || {};
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
    this.useMissingTranslationHandlerLog = function () {
      this.useMissingTranslationHandler('$translateMissingTranslationHandlerLog');
    };
    this.useMissingTranslationHandler = function (factory) {
      $missingTranslationHandlerFactory = factory;
    };
    this.$get = [
      '$log',
      '$injector',
      '$rootScope',
      '$q',
      function ($log, $injector, $rootScope, $q) {
        var Storage, defaultInterpolator = $injector.get($interpolationFactory || '$translateDefaultInterpolation');
        pendingLoader = false, interpolatorHashMap = {};
        if ($storageFactory) {
          Storage = $injector.get($storageFactory);
          if (!Storage.get || !Storage.set) {
            throw new Error('Couldn\'t use storage \'' + $storageFactory + '\', missing get() or set() method!');
          }
        }
        if ($interpolatorFactories.length > 0) {
          angular.forEach($interpolatorFactories, function (interpolatorFactory) {
            var interpolator = $injector.get(interpolatorFactory);
            interpolator.setLocale($preferredLanguage || $uses);
            interpolatorHashMap[interpolator.getInterpolationIdentifier()] = interpolator;
          });
        }
        var $translate = function (translationId, interpolateParams, interpolationId) {
          var table = $uses ? $translationTable[$uses] : $translationTable, Interpolator = interpolationId ? interpolatorHashMap[interpolationId] : defaultInterpolator;
          if (table && table.hasOwnProperty(translationId)) {
            return Interpolator.interpolate(table[translationId], interpolateParams);
          }
          if ($missingTranslationHandlerFactory && !pendingLoader) {
            $injector.get($missingTranslationHandlerFactory)(translationId, $uses);
          }
          if ($uses && $fallbackLanguage && $uses !== $fallbackLanguage) {
            var translation = $translationTable[$fallbackLanguage][translationId];
            if (translation) {
              var returnVal;
              Interpolator.setLocale($fallbackLanguage);
              returnVal = Interpolator.interpolate(translation, interpolateParams);
              Interpolator.setLocale($uses);
              return returnVal;
            }
          }
          if ($notFoundIndicatorLeft) {
            translationId = [
              $notFoundIndicatorLeft,
              translationId
            ].join(' ');
          }
          if ($notFoundIndicatorRight) {
            translationId = [
              translationId,
              $notFoundIndicatorRight
            ].join(' ');
          }
          return translationId;
        };
        $translate.preferredLanguage = function () {
          return $preferredLanguage;
        };
        $translate.fallbackLanguage = function () {
          return $fallbackLanguage;
        };
        $translate.proposedLanguage = function () {
          return $nextLang;
        };
        $translate.storage = function () {
          return Storage;
        };
        $translate.uses = function (key) {
          if (!key) {
            return $uses;
          }
          var success = function () {
            $uses = key;
            if ($storageFactory) {
              Storage.set($translate.storageKey(), $uses);
            }
            defaultInterpolator.setLocale($uses);
            angular.forEach(interpolatorHashMap, function (interpolator, id) {
              interpolatorHashMap[id].setLocale($uses);
            });
            $rootScope.$broadcast('translationChangeSuccess');
          };
          var error = function () {
            $rootScope.$broadcast('translationChangeError');
          };
          return $translate.load(key, success, error);
        };
        $translate.load = function (key, success, error) {
          if (!key) {
            throw 'No language key specified for loading.';
          }
          var deferred = $q.defer();
          if (!$translationTable[key]) {
            pendingLoader = true;
            $nextLang = key;
            $injector.get($loaderFactory)(angular.extend($loaderOptions, { key: key })).then(function (data) {
              var translationTable = {};
              if (angular.isArray(data)) {
                angular.forEach(data, function (table) {
                  angular.extend(translationTable, table);
                });
              } else {
                angular.extend(translationTable, data);
              }
              translations(key, translationTable);
              if (angular.isFunction(success)) {
                success();
              }
              pendingLoader = false;
              deferred.resolve(key);
            }, function (key) {
              if (angular.isFunction(error)) {
                error();
              }
              deferred.reject(key);
            });
            return deferred.promise;
          }
          if (angular.isFunction(success)) {
            success();
          }
          deferred.resolve(key);
          return deferred.promise;
        };
        $translate.storageKey = function () {
          return storageKey();
        };
        if ($loaderFactory && angular.equals($translationTable, {})) {
          $translate.uses($translate.uses());
        }
        return $translate;
      }
    ];
  }
]);
angular.module('pascalprecht.translate').directive('translate', [
  '$filter',
  '$interpolate',
  function ($filter, $interpolate) {
    var translate = $filter('translate');
    return {
      restrict: 'A',
      scope: true,
      link: function linkFn(scope, element, attr) {
        if (attr.translateInterpolation) {
          scope.interpolation = attr.translateInterpolation;
        }
        attr.$observe('translate', function (translationId) {
          if (angular.equals(translationId, '')) {
            scope.translationId = $interpolate(element.text().replace(/^\s+|\s+$/g, ''))(scope.$parent);
          } else {
            scope.translationId = translationId;
          }
        });
        attr.$observe('translateValues', function (interpolateParams) {
          scope.interpolateParams = interpolateParams;
        });
        scope.$on('translationChangeSuccess', function () {
          element.html(translate(scope.translationId, scope.interpolateParams, scope.interpolation));
        });
        scope.$watch('translationId + interpolateParams', function (nValue) {
          if (nValue) {
            element.html(translate(scope.translationId, scope.interpolateParams, scope.interpolation));
          }
        });
      }
    };
  }
]);
angular.module('pascalprecht.translate').filter('translate', [
  '$parse',
  '$translate',
  function ($parse, $translate) {
    return function (translationId, interpolateParams, interpolation) {
      if (!angular.isObject(interpolateParams)) {
        interpolateParams = $parse(interpolateParams)();
      }
      return $translate(translationId, interpolateParams, interpolation);
    };
  }
]);