'use strict';

angular.module('highcharts-ng', [])
  .directive('highchart', function () {

    function prependMethod(obj, method, func) {
      var original = obj[method];
      obj[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        func.apply(this, args);
        if(original) {
          return original.apply(this, args);
        }  else {
          return;
        }

      };
    }

    function deepExtend(destination, source) {
      for (var property in source) {
        if (source[property] && source[property].constructor &&
            source[property].constructor === Object) {
          destination[property] = destination[property] || {};
          deepExtend(destination[property], source[property]);
        } else {
          destination[property] = source[property];
        }
      }
      return destination;
    }

    var seriesId = 0;
    var ensureIds = function (series) {
      series.forEach(function (s) {
        if (!angular.isDefined(s.id)) {
          s.id = "series-" + seriesId++;
        }
      });
    }

    var defaultOptions = {
      chart: {
        events: {}
      },
      title: {},
      series: [],
      navigator: {enabled: false}
    }

    var getMergedOptions = function (scope, element, config) {
      var mergedOptions = {}
      if (config.options) {
        mergedOptions = deepExtend(defaultOptions, config.options);
      } else {
        mergedOptions = defaultOptions;
      }
      mergedOptions.chart.renderTo = element[0];
      if(config.xAxis) {
        prependMethod(mergedOptions.chart.events, 'selection', function(e){
          var thisChart = this;
          if(e.xAxis) {
            scope.$apply(function () {
              scope.config.xAxis.currentMin = e.xAxis[0].min;
              scope.config.xAxis.currentMax = e.xAxis[0].max;
            });
          } else {
            //handle reset button - zoom out to all
            scope.$apply(function () {
              scope.config.xAxis.currentMin = thisChart.xAxis[0].dataMin;
              scope.config.xAxis.currentMax = thisChart.xAxis[0].dataMax;
            });
          }
        });

        prependMethod(mergedOptions.chart.events, 'addSeries', function(e){
            scope.config.xAxis.currentMin = this.xAxis[0].min || scope.config.xAxis.currentMin;
            scope.config.xAxis.currentMax = this.xAxis[0].max || scope.config.xAxis.currentMax;
        });
      }

      if(config.xAxis) {
        mergedOptions.xAxis = angular.copy(config.xAxis)
      }
      if(config.title) {
        mergedOptions.title = config.title
      }
      return mergedOptions
    }

    var updateZoom = function (axis, modelAxis) {
      var extremes = axis.getExtremes();
      if(modelAxis.currentMin !== extremes.dataMin || modelAxis.currentMax !== extremes.dataMax) {
        axis.setExtremes(modelAxis.currentMin, modelAxis.currentMax, false);
      }
    }

    var processExtremes = function(chart, axis) {
      if(axis.currentMin || axis.currentMax) {
        chart.xAxis[0].setExtremes(axis.currentMin, axis.currentMax, true);
      }
    }

    var processSeries = function(chart, series) {
      var ids = []
      if(series) {
        ensureIds(series);

        //Find series to add or update
        series.forEach(function (s) {
          ids.push(s.id)
          var chartSeries = chart.get(s.id);
          if (chartSeries) {
            chartSeries.update(angular.copy(s), false);
          } else {
            chart.addSeries(angular.copy(s), false)
          }
        });
      }

      //Now remove any missing series
      for(var i = chart.series.length - 1; i >= 0; i--) {
        var s = chart.series[i];
        if (ids.indexOf(s.options.id) < 0) {
          s.remove(false);
        }
      };

    }

    var initialiseChart = function(scope, element, config) {
      config || (config = {});
      var mergedOptions = getMergedOptions(scope, element, config);
      var chart = config.useHighStocks ? new Highcharts.StockChart(mergedOptions) : new Highcharts.Chart(mergedOptions);
      if(config.xAxis) {
        processExtremes(chart, config.xAxis);
      }
      processSeries(chart, config.series);
      if(config.loading) {
        chart.showLoading()
      }
      chart.redraw();
      return chart;
    }


    return {
      restrict: 'EAC',
      replace: true,
      template: '<div></div>',
      scope: {
        config: '='
      },
      link: function (scope, element, attrs) {

        var chart = initialiseChart(scope, element, scope.config);

        scope.$watch("config.series", function (newSeries, oldSeries) {
          //do nothing when called on registration
          if (newSeries === oldSeries) return;
          processSeries(chart, newSeries);
          chart.redraw();
        }, true);

        scope.$watch("config.title", function (newTitle) {
          chart.setTitle(newTitle, true);
        }, true);

        scope.$watch("config.loading", function (loading) {
          if(loading) {
            chart.showLoading()
          } else {
            chart.hideLoading()
          }
        });

        scope.$watch("config.useHighStocks", function (useHighStocks) {
          chart.destroy();
          chart = initialiseChart(scope, element, scope.config);
        });

        scope.$watch("config.xAxis", function (newAxes, oldAxes) {
          if (newAxes === oldAxes) return;
          if(newAxes) {
            chart.xAxis[0].update(newAxes);
            updateZoom(chart.xAxis[0], angular.copy(newAxes));
            chart.redraw();
          }
        }, true);
        scope.$watch("config.options", function (newOptions, oldOptions, scope) {
          //do nothing when called on registration
          if (newOptions === oldOptions) return;
          chart.destroy();
          chart = initialiseChart(scope, element, scope.config);

        }, true);
      }
    }
  });
