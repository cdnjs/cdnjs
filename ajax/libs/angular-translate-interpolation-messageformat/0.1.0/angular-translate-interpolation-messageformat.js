angular.module('pascalprecht.translate').constant('TRANSLATE_MF_INTERPOLATION_CACHE', '$translateMessageFormatInterpolation').factory('$translateMessageFormatInterpolation', [
  '$cacheFactory',
  'TRANSLATE_MF_INTERPOLATION_CACHE',
  function ($cacheFactory, TRANSLATE_MF_INTERPOLATION_CACHE) {
    var cache = $cacheFactory.get(TRANSLATE_MF_INTERPOLATION_CACHE);
    if (!cache) {
      cache = $cacheFactory(TRANSLATE_MF_INTERPOLATION_CACHE);
    }
    return function (string, interpolateParams, locale) {
      var mf = cache.get('MessageFormat-' + locale);
      if (!mf) {
        mf = new MessageFormat(locale);
        cache.put('MessageFormat-' + locale, mf);
      }
      interpolateParams = interpolateParams || {};
      var interpolatedText = cache.get(string + angular.toJson(interpolateParams));
      if (!interpolatedText) {
        interpolatedText = mf.compile(string)(interpolateParams);
        cache.put(string + angular.toJson(interpolateParams), interpolatedText);
      }
      return interpolatedText;
    };
  }
]);