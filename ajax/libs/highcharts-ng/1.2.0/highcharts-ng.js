/**
 * highcharts-ng
 * @version v1.2.0 - 2017-12-02
 * @link https://github.com/pablojim/highcharts-ng
 * @author Barry Fitzgerald <>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports){
  module.exports = 'highcharts-ng';
}

(function () {
  'use strict';
  /*global angular: false*/
  var Highcharts = null;

  if (window && window.Highcharts) {
    Highcharts = window.Highcharts;
  } else if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
    module.exports === exports && module.exports === 'highcharts-ng'
  ) {
        Highcharts = require('highcharts');
  }


  angular.module('highcharts-ng', [])
    .component('highchart', {
      bindings: {
        config: '<',
        changeDetection: '<',
        disableChangeDetection: '<'
      },
      controller: HighChartNGController
    });

  HighChartNGController.$inject = ['$element', '$timeout'];

  function HighChartNGController($element, $timeout) {
    var initialized = false;
    var seriesId = 0;
    var yAxisId = 0;
    var xAxisId = 0;
    var ctrl = this;
    var prevConfig = {};
    var mergedConfig = {};
    var detector = ctrl.changeDetection || angular.equals;

    this.$onInit = function () {
      initChart();
      initialized = true;
    };

    this.$onChanges = function(changesObject) {
      if (changesObject.config && changesObject.config.currentValue !== undefined) {
        if (!initialized) {
          return;
        }
        initChart();
      }
    };

    this.removeItems = function (newItems, chartItems, id, toIgnore) {
      if (newItems && Array.isArray(newItems)) {
        var ids = ensureIds(newItems, id);
        for (var i = chartItems.length - 1; i >= 0; i -= 1) {
          var a = chartItems[i];
          if ((toIgnore.indexOf(a.options.id) < 0) && (ids.indexOf(a.options.id) < 0)) {
            //if we don't set redraw to true, it can create
            //glitches in the chart's rendering where the series
            //doesn't completely re-render
            a.remove(true);
          }
        }
      }

    };

    this.removeUnlinkedObjects = function (mergedConfig) {
      /*
       Removes unlinked objects, items that have been removed in the config,
       but not yet removed from the HighChart object
       */
      //First check to see if there are any axes that need to be removed
      //If a series is linked to the axis, it will be removed by HighCharts
      this.removeItems(mergedConfig.yAxis, ctrl.chart.yAxis, yAxisId, 'navigator-y-axis');
      this.removeItems(mergedConfig.xAxis, ctrl.chart.xAxis, xAxisId, 'navigator-x-axis');
      this.removeItems(mergedConfig.series, ctrl.chart.series, seriesId, 'highcharts-navigator-series');
      //TODO do we need to handle removing series from the config that highcharts has removed as part
      //of removing axes?
    };

    this.addAnyNewAxes = function (configAxes, chart, isX) {
      if (configAxes && Array.isArray(configAxes)) {
          angular.forEach(configAxes, function (s) {
            if (!chart.get(s.id)) {
              chart.addAxis(s, isX);
            }
          });
        }
    };

    this.$doCheck = function () {
      if (ctrl.disableChangeDetection === true) {
        return;
      }
      if (!detector(ctrl.config, prevConfig)) {
        prevConfig = angular.merge({}, ctrl.config);
        mergedConfig = getMergedOptions($element, ctrl.config, seriesId);

        //Remove any unlinked objects before adding
        this.removeUnlinkedObjects(mergedConfig);

        //Allows dynamic adding Axes
        this.addAnyNewAxes(mergedConfig.yAxis, ctrl.chart, false);
        this.addAnyNewAxes(mergedConfig.xAxis, ctrl.chart, true);

        //Allows dynamic adding of series
        if (mergedConfig.series) {
          // Add any new series
          angular.forEach(ctrl.config.series, function (s) {
            if (!ctrl.chart.get(s.id)) {
              ctrl.chart.addSeries(s);
            }
          });
        }

        ctrl.chart.update(mergedConfig, true);
      }
    };

    this.$onDestroy = function () {
      if (ctrl.chart) {
        try {
          ctrl.chart.destroy();
        } catch (ex) {
          // fail silently as highcharts will throw exception if element doesn't exist
        }

        $timeout(function () {
          $element.remove();
        }, 0);
      }
    };

    function initChart() {
      prevConfig = angular.merge({}, ctrl.config);
      mergedConfig = getMergedOptions($element, ctrl.config, seriesId);
      ctrl.chart = new Highcharts[getChartType(mergedConfig)](mergedConfig);
      ctrl.config.getChartObj = function () {
        return ctrl.chart;
      };

      // Fix resizing bug
      // https://github.com/pablojim/highcharts-ng/issues/550
      var originalWidth = $element[0].clientWidth;
      var originalHeight = $element[0].clientHeight;
      $timeout(function () {
        if ($element[0].clientWidth !== originalWidth || $element[0].clientHeight !== originalHeight) {
          ctrl.chart.reflow();
        }
      }, 0, false);
    }
  }


  function getMergedOptions(element, config, seriesId) {
    var mergedOptions = {};

    var defaultOptions = {
      chart: {
        events: {}
      },
      title: {},
      subtitle: {},
      series: [],
      credits: {},
      plotOptions: {},
      navigator: {},
    };

    if (config) {
      //check all series and axis ids are set
      if (config.series) {
        ensureIds(config.series, seriesId);
      }

      mergedOptions = angular.merge(defaultOptions, config);
    } else {
      mergedOptions = defaultOptions;
    }
    mergedOptions.chart.renderTo = element[0];

    //check chart type is set
    return mergedOptions;
  }

  var chartTypeMap = {
    'stock': 'StockChart',
    'map': 'Map',
    'chart': 'Chart'
  };

  function getChartType(config) {
    if (config === undefined || config.chartType === undefined) return 'Chart';
    return chartTypeMap[('' + config.chartType).toLowerCase()];
  }

  function ensureIds(chartCollection, collectionId) {
    /*
     Ensures each item in the iteratble chartCollection has an id,
     and if not auto-generates one incrementing collectionId
     */
    var ids = [];
    angular.forEach(chartCollection, function (s) {
      if (!angular.isDefined(s.id)) {
        collectionId += 1;
        s.id = 'cc-' + collectionId;
      }
      ids.push(s.id);
    });

    return ids;
  }


}());
