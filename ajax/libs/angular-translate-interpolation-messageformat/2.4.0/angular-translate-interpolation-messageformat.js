/*!
 * angular-translate - v2.4.0 - 2014-09-22
 * http://github.com/PascalPrecht/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module('pascalprecht.translate').constant('TRANSLATE_MF_INTERPOLATION_CACHE', '$translateMessageFormatInterpolation').factory('$translateMessageFormatInterpolation', [
  '$cacheFactory',
  'TRANSLATE_MF_INTERPOLATION_CACHE',
  function ($cacheFactory, TRANSLATE_MF_INTERPOLATION_CACHE) {
    var $translateInterpolator = {}, $cache = $cacheFactory.get(TRANSLATE_MF_INTERPOLATION_CACHE), $mf = new MessageFormat(), $identifier = 'messageformat', $sanitizeValueStrategy = null, sanitizeValueStrategies = {
        escaped: function (params) {
          var result = {};
          for (var key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
              result[key] = angular.element('<div></div>').text(params[key]).html();
            }
          }
          return result;
        }
      };
    var sanitizeParams = function (params) {
      var result;
      if (angular.isFunction(sanitizeValueStrategies[$sanitizeValueStrategy])) {
        result = sanitizeValueStrategies[$sanitizeValueStrategy](params);
      } else {
        result = params;
      }
      return result;
    };
    if (!$cache) {
      $cache = $cacheFactory(TRANSLATE_MF_INTERPOLATION_CACHE);
    }
    $cache.put('en', $mf);
    $translateInterpolator.setLocale = function (locale) {
      $mf = $cache.get(locale);
      if (!$mf) {
        $mf = new MessageFormat(locale);
        $cache.put(locale, $mf);
      }
    };
    $translateInterpolator.getInterpolationIdentifier = function () {
      return $identifier;
    };
    $translateInterpolator.useSanitizeValueStrategy = function (value) {
      $sanitizeValueStrategy = value;
      return this;
    };
    $translateInterpolator.interpolate = function (string, interpolateParams) {
      interpolateParams = interpolateParams || {};
      if ($sanitizeValueStrategy) {
        interpolateParams = sanitizeParams(interpolateParams);
      }
      var interpolatedText = $cache.get(string + angular.toJson(interpolateParams));
      if (!interpolatedText) {
        interpolatedText = $mf.compile(string)(interpolateParams);
        $cache.put(string + angular.toJson(interpolateParams), interpolatedText);
      }
      return interpolatedText;
    };
    return $translateInterpolator;
  }
]);