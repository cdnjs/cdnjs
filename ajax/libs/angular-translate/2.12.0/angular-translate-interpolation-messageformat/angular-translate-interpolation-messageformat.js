/*!
 * angular-translate - v2.12.0 - 2016-09-05
 * 
 * Copyright (c) 2016 The angular-translate team, Pascal Precht; Licensed MIT
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["messageformat"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("messageformat"));
  } else {
    factory(MessageFormat);
  }
}(this, function (MessageFormat) {

$translateMessageFormatInterpolation.$inject = ['$translateSanitization', '$cacheFactory', 'TRANSLATE_MF_INTERPOLATION_CACHE'];
angular.module('pascalprecht.translate')

/**
 * @ngdoc property
 * @name pascalprecht.translate.TRANSLATE_MF_INTERPOLATION_CACHE
 * @requires TRANSLATE_MF_INTERPOLATION_CACHE
 *
 * @description
 * Uses MessageFormat.js to interpolate strings against some values.
 */
.constant('TRANSLATE_MF_INTERPOLATION_CACHE', '$translateMessageFormatInterpolation')

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateMessageFormatInterpolation
 * @requires pascalprecht.translate.TRANSLATE_MF_INTERPOLATION_CACHE
 *
 * @description
 * Uses MessageFormat.js to interpolate strings against some values.
 *
 * Be aware to configure a proper sanitization strategy.
 *
 * See also:
 * * {@link pascalprecht.translate.$translateSanitization}
 * * {@link https://github.com/SlexAxton/messageformat.js}
 *
 * @return {object} $translateMessageFormatInterpolation Interpolator service
 */
.factory('$translateMessageFormatInterpolation', $translateMessageFormatInterpolation);

function $translateMessageFormatInterpolation($translateSanitization, $cacheFactory, TRANSLATE_MF_INTERPOLATION_CACHE) {

  'use strict';

  var $translateInterpolator = {},
      $cache = $cacheFactory.get(TRANSLATE_MF_INTERPOLATION_CACHE),
      // instantiate with default locale (which is 'en')
      $mf = new MessageFormat('en'),
      $identifier = 'messageformat';

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

  /**
   * @deprecated will be removed in 3.0
   * @see {@link pascalprecht.translate.$translateSanitization}
   */
  $translateInterpolator.useSanitizeValueStrategy = function (value) {
    $translateSanitization.useStrategy(value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateMessageFormatInterpolation#interpolate
   * @methodOf pascalprecht.translate.$translateMessageFormatInterpolation
   *
   * @description
   * Interpolates given string against given interpolate params using MessageFormat.js.
   *
   * @returns {string} interpolated string.
   */
  $translateInterpolator.interpolate = function (string, interpolationParams/*, context*/) {
    interpolationParams = interpolationParams || {};
    interpolationParams = $translateSanitization.sanitize(interpolationParams, 'params');

    var compiledFunction = $cache.get('mf:' + string);

    // if given string wasn't compiled yet, we do so now and never have to do it again
    if (!compiledFunction) {

      // Ensure explicit type if possible
      // MessageFormat checks the actual type (i.e. for amount based conditions)
      for (var key in interpolationParams) {
        if (interpolationParams.hasOwnProperty(key)) {
          // ensure number
          var number = parseInt(interpolationParams[key], 10);
          if (angular.isNumber(number) && ('' + number) === interpolationParams[key]) {
            interpolationParams[key] = number;
          }
        }
      }

      compiledFunction = $mf.compile(string);
      $cache.put('mf:' + string, compiledFunction);
    }

    var interpolatedText = compiledFunction(interpolationParams);
    return $translateSanitization.sanitize(interpolatedText, 'text');
  };

  return $translateInterpolator;
}

$translateMessageFormatInterpolation.displayName = '$translateMessageFormatInterpolation';
return 'pascalprecht.translate';

}));
