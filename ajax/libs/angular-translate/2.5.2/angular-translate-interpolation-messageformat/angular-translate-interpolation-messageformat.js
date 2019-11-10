/*!
 * angular-translate - v2.5.2 - 2014-12-10
 * http://github.com/angular-translate/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module('pascalprecht.translate')

.constant('TRANSLATE_MF_INTERPOLATION_CACHE', '$translateMessageFormatInterpolation')

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateMessageFormatInterpolation
 * @requires TRANSLATE_MF_INTERPOLATION_CACHE
 *
 * @description
 * Uses MessageFormat.js to interpolate strings against some values.
 *
 * @return {object} $translateInterpolator Interpolator service
 */
.factory('$translateMessageFormatInterpolation', ['$cacheFactory', 'TRANSLATE_MF_INTERPOLATION_CACHE', function ($cacheFactory, TRANSLATE_MF_INTERPOLATION_CACHE) {

  var $translateInterpolator = {},
      $cache = $cacheFactory.get(TRANSLATE_MF_INTERPOLATION_CACHE),
      // instantiate with default locale (which is 'en')
      $mf = new MessageFormat('en'),
      $identifier = 'messageformat',
      $sanitizeValueStrategy = null,
      // map of all sanitize strategies
      sanitizeValueStrategies = {
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
    // create cache if it doesn't exist already
    $cache = $cacheFactory(TRANSLATE_MF_INTERPOLATION_CACHE);
  }

  $cache.put('en', $mf);

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateMessageFormatInterpolation#setLocale
   * @methodOf pascalprecht.translate.$translateMessageFormatInterpolation
   *
   * @description
   * Sets current locale (this is currently not use in this interpolation).
   *
   * @param {string} locale Language key or locale.
   */
  $translateInterpolator.setLocale = function (locale) {
    $mf = $cache.get(locale);
    if (!$mf) {
      $mf = new MessageFormat(locale);
      $cache.put(locale, $mf);
    }
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateMessageFormatInterpolation#getInterpolationIdentifier
   * @methodOf pascalprecht.translate.$translateMessageFormatInterpolation
   *
   * @description
   * Returns an identifier for this interpolation service.
   *
   * @returns {string} $identifier
   */
  $translateInterpolator.getInterpolationIdentifier = function () {
    return $identifier;
  };

  $translateInterpolator.useSanitizeValueStrategy = function (value) {
    $sanitizeValueStrategy = value;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateMessageFormatInterpolation#interpolate
   * @methodOf pascalprecht.translate.$translateMessageFormatInterpolation
   *
   * @description
   * Interpolates given string agains given interpolate params using MessageFormat.js.
   *
   * @returns {string} interpolated string.
   */
  $translateInterpolator.interpolate = function (string, interpolateParams) {

    interpolateParams = interpolateParams || {};

    if ($sanitizeValueStrategy) {
      interpolateParams = sanitizeParams(interpolateParams);
    }

    var interpolatedText = $cache.get(string + angular.toJson(interpolateParams));

    // if given string wasn't interpolated yet, we do so now and never have to do it again
    if (!interpolatedText) {
      interpolatedText = $mf.compile(string)(interpolateParams);
      $cache.put(string + angular.toJson(interpolateParams), interpolatedText);
    }
    return interpolatedText;
  };

  return $translateInterpolator;
}]);
