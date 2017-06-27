/**
 * highcharts-ng
 * @version v0.0.13 - 2016-10-04
 * @link https://github.com/pablojim/highcharts-ng
 * @author Barry Fitzgerald <>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function () {
  'use strict';
  /*global angular: false, Highcharts: false */
  var MODULE_NAME = 'highcharts-ng-lazyload';
  if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports){
    module.exports = MODULE_NAME;
  }


  angular.module(MODULE_NAME, ['highcharts-ng'])
    .provider('highchartsNG', highchartsNGProvider);

  function highchartsNGProvider(){
    var modules = [];
    var basePath = false;
    var lazyLoad = false;
    return {
      HIGHCHART: 'highcharts.js',
      HIGHSTOCK: 'stock/highstock.js',
      basePath: function (p) {
        basePath = p;
      },
      lazyLoad: function (list) {
        if (list === undefined) {
          modules = [this.HIGHCHART];
        } else {
          modules = list;
        }
        lazyLoad = true;
      },
      $get: ['$q', '$window', function ($q, $window) {
        if (!basePath) {
          basePath = (window.location.protocol === 'https:' ? 'https' : 'http') + '://code.highcharts.com/';
        }
        return highchartsNG($q, $window, basePath, modules);
      }]
    };
  }

  function highchartsNG($q, $window, basePath, modules) {
    var highchartsProm;

    function loadScript(path) {
      return $q(function(resolve){
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = path;
        s.onload = resolve;
        document.getElementsByTagName('body')[0].appendChild(s);
      });
    }

    function getHighcharts() {
      if (typeof $window.Highcharts !== 'undefined') {
        return $q.when($window.Highcharts);
      }
      var prom = $q.when();
      angular.forEach(modules, function(s) {
        prom = prom.then(function() {
          return loadScript(basePath + s);
        });
      });

      return prom.then(function() {
        return $window.Highcharts;
      });
    }

    function getHighchartsOnce() {
      if(!highchartsProm) {
        highchartsProm = getHighcharts();
      }
      return highchartsProm;
    }

    return {
      getHighcharts: getHighchartsOnce,
      ready: function ready(callback, thisArg) {
        getHighchartsOnce().then(function() {
          callback.call(thisArg);
        });
      }
    };
  }
}());
