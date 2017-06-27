angular.module('pascalprecht.translate').constant('TRANSLATE_MF_INTERPOLATION_CACHE', '$translateMessageFormatInterpolation').factory('$translateMessageFormatInterpolation', [
  '$cacheFactory',
  'TRANSLATE_MF_INTERPOLATION_CACHE',
  function ($cacheFactory, TRANSLATE_MF_INTERPOLATION_CACHE) {
    var $translateInterpolator = {};
    $cache = $cacheFactory.get(TRANSLATE_MF_INTERPOLATION_CACHE), $mf = new MessageFormat(), $identifier = 'messageformat';
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
    $translateInterpolator.interpolate = function (string, interpolateParams) {
      interpolateParams = interpolateParams || {};
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