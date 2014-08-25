/*! angular-retina - v0.1.3 - 2013-05-29
* https://github.com/jrief/angular-retina
* Copyright (c) 2013 Jacob Rief; Licensed MIT */
(function (angular, undefined) {
  'use strict';
  angular.module('ngRetina', []).config([
    '$provide',
    function ($provide) {
      $provide.decorator('ngSrcDirective', function ($delegate) {
        $delegate[0].compile = function (element, attrs) {
        };
        return $delegate;
      });
    }
  ]).directive('ngSrc', [
    '$window',
    '$http',
    '$cacheFactory',
    function ($window, $http, $cacheFactory) {
      var cache = $cacheFactory('retinaImageURLs');
      var msie = parseInt((/msie (\d+)/.exec($window.navigator.userAgent.toLowerCase()) || [])[1], 10);
      var isRetina = function () {
          var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), ' + '(-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';
          if ($window.devicePixelRatio > 1)
            return true;
          return $window.matchMedia && $window.matchMedia(mediaQuery).matches;
        }();
      function getHighResolutionURL(url) {
        var parts = url.split('.');
        if (parts.length < 2)
          return url;
        parts[parts.length - 2] += '@2x';
        return parts.join('.');
      }
      return function (scope, element, attrs) {
        function setImgSrc(img_url) {
          attrs.$set('src', img_url);
          if (msie)
            element.prop('src', img_url);
        }
        function set2xVariant(img_url) {
          var img_url_2x = cache.get(img_url);
          if (img_url_2x === undefined) {
            img_url_2x = getHighResolutionURL(img_url);
            $http.head(img_url_2x).success(function (data, status) {
              setImgSrc(img_url_2x);
              cache.put(img_url, img_url_2x);
            }).error(function (data, status, headers, config) {
              setImgSrc(img_url);
              cache.put(img_url, img_url);
            });
          } else {
            setImgSrc(img_url_2x);
          }
        }
        attrs.$observe('ngSrc', function (value) {
          if (!value)
            return;
          if (isRetina) {
            set2xVariant(value);
          } else {
            setImgSrc(value);
          }
        });
      };
    }
  ]);
}(window.angular));