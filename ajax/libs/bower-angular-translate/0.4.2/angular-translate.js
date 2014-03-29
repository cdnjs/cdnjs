angular.module('ngTranslate', ['ng', 'ngCookies'])

.run(['$translate', '$COOKIE_KEY', '$cookieStore', function ($translate, $COOKIE_KEY, $cookieStore) {

  if ($translate.rememberLanguage()) {
    if (!$cookieStore.get($COOKIE_KEY)) {
      $cookieStore.put($COOKIE_KEY, $translate.uses());
    } else {
      $translate.uses($cookieStore.get($COOKIE_KEY));
    }
  }
}]);

angular.module('ngTranslate')

.directive('translate', ['$filter', '$interpolate', function ($filter, $interpolate) {

  var translate = $filter('translate');

  return {
    restrict: 'A',
    scope: true,
    link: function linkFn(scope, element, attr) {

      attr.$observe('translate', function (translationId) {
        if (angular.equals(translationId , '')) {
          scope.translationId = $interpolate(element.text())(scope.$parent);
        } else {
          scope.translationId = translationId;
        }
      });

      attr.$observe('values', function (interpolateParams) {
        scope.interpolateParams = interpolateParams;
      });

      scope.$watch('translationId + interpolateParams', function () {
        element.html(translate(scope.translationId, scope.interpolateParams));
      });
    }
  };
}]);

angular.module('ngTranslate')

.filter('translate', ['$parse', '$translate', function ($parse, $translate) {
  return function (translationId, interpolateParams) {

    if (!angular.isObject(interpolateParams)) {
      interpolateParams = $parse(interpolateParams)();
    }
    return $translate(translationId, interpolateParams);
  };
}]);

angular.module('ngTranslate').constant('$COOKIE_KEY', 'NG_TRANSLATE_LANG_KEY');

angular.module('ngTranslate').provider('$translate', function () {

  var $translationTable = {},
      $uses,
      $rememberLanguage = false;

  this.translations = function (langKey, translationTable) {

    if (!langKey && !translationTable) {
      return $translationTable;
    }

    if (langKey && !translationTable) {
      if (angular.isString(langKey)) {
        return $translationTable[langKey];
      } else {
        $translationTable = langKey;
      }
    } else {
      $translationTable[langKey] = translationTable;
    }
  };

  this.uses = function (langKey) {
    if (langKey) {
      if (!$translationTable[langKey]) {
        throw new Error("$translateProvider couldn't find translationTable for langKey: '" + langKey + "'");
      }
      $uses = langKey;
    } else {
      return $uses;
    }
  };

  this.rememberLanguage = function (boolVal) {
    if (angular.isUndefined(boolVal)) {
      return $rememberLanguage;
    }
    $rememberLanguage = boolVal;
  };

  this.$get = ['$interpolate', '$log', '$cookieStore', '$COOKIE_KEY', function ($interpolate, $log, $cookieStore, $COOKIE_KEY) {

    $translate = function (translationId, interpolateParams) {
      var translation = ($uses) ? 
        $translationTable[$uses][translationId] : 
        $translationTable[translationId];

      if (translation) {
        return $interpolate(translation)(interpolateParams);
      }
      $log.warn("Translation for " + translationId + " doesn't exist");
      return translationId;
    };

    $translate.uses = function (key) {
      if (!key) {
        return $uses;
      }
      $uses = key;
      if ($rememberLanguage) {
        $cookieStore.put($COOKIE_KEY, $uses);
      }
    };

    $translate.rememberLanguage = function () {
      return $rememberLanguage;
    };

    return $translate;
  }];
});
