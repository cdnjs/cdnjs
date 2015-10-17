(function () {
  'use strict';

  Chart.defaults.global.responsive = true;
  Chart.defaults.global.multiTooltipTemplate = '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>';

  Chart.defaults.global.colours = [
    { // blue
      fillColor: 'rgba(151,187,205,0.2)',
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,0.8)'
    },
    { // light grey
      fillColor: 'rgba(220,220,220,0.2)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,0.8)'
    },
    { // red
      fillColor: 'rgba(247,70,74,0.2)',
      strokeColor: 'rgba(247,70,74,1)',
      pointColor: 'rgba(247,70,74,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(247,70,74,0.8)'
    },
    { // green
      fillColor: 'rgba(70,191,189,0.2)',
      strokeColor: 'rgba(70,191,189,1)',
      pointColor: 'rgba(70,191,189,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(70,191,189,0.8)'
    },
    { // yellow
      fillColor: 'rgba(253,180,92,0.2)',
      strokeColor: 'rgba(253,180,92,1)',
      pointColor: 'rgba(253,180,92,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(253,180,92,0.8)'
    },
    { // grey
      fillColor: 'rgba(148,159,177,0.2)',
      strokeColor: 'rgba(148,159,177,1)',
      pointColor: 'rgba(148,159,177,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      fillColor: 'rgba(77,83,96,0.2)',
      strokeColor: 'rgba(77,83,96,1)',
      pointColor: 'rgba(77,83,96,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(77,83,96,1)'
    }
  ];

  angular.module('chart.js', [])
    .directive('chartBase', function () { return chart(); })
    .directive('chartLine', function () { return chart('Line'); })
    .directive('chartBar', function () { return chart('Bar'); })
    .directive('chartRadar', function () { return chart('Radar'); })
    .directive('chartDoughnut', function () { return chart('Doughnut'); })
    .directive('chartPie', function () { return chart('Pie'); })
    .directive('chartPolarArea', function () { return chart('PolarArea'); });

  function chart (type) {
    return {
      restrict: 'CA',
      scope: {
        data: '=',
        labels: '=',
        options: '=',
        series: '=',
        colours: '=?',
        getColour: '=?',
        chartType: '=',
        legend: '@',
        click: '='
      },
      link: function (scope, elem/*, attrs */) {
        var chart, container = document.createElement('div');
        container.className = 'chart-container';
        elem.replaceWith(container);
        container.appendChild(elem[0]);

        if (typeof window.G_vmlCanvasManager === 'object' && window.G_vmlCanvasManager !== null) {
          if (typeof window.G_vmlCanvasManager.initElement === 'function') {
            window.G_vmlCanvasManager.initElement(elem[0]);
          }
        }

        // Order of setting "watch" matter

        scope.$watch('data', function (newVal, oldVal) {
          if (! newVal || ! newVal.length || (Array.isArray(newVal[0]) && ! newVal[0].length)) return;
          var chartType = type || scope.chartType;
          if (! chartType) return;

          if (chart) {
            if (canUpdateChart(newVal, oldVal)) return updateChart(chart, newVal, scope);
            chart.destroy();
          }

          chart = createChart(chartType, scope, elem);
        }, true);

        scope.$watch('series', resetChart, true);
        scope.$watch('labels', resetChart, true);
        scope.$watch('options', resetChart, true);
        scope.$watch('colours', resetChart, true);

        scope.$watch('chartType', function (newVal, oldVal) {
          if (isEmpty(newVal)) return;
          if (angular.equals(newVal, oldVal)) return;
          if (chart) chart.destroy();
          chart = createChart(newVal, scope, elem);
        });

        scope.$on('$destroy', function () {
          if (chart) chart.destroy();
        });

        function resetChart (newVal, oldVal) {
          if (isEmpty(newVal)) return;
          if (angular.equals(newVal, oldVal)) return;
          var chartType = type || scope.chartType;
          if (! chartType) return;

          // chart.update() doesn't work for series and labels
          // so we have to re-create the chart entirely
          if (chart) chart.destroy();

          chart = createChart(chartType, scope, elem);
        }
      }
    };
  }

  function canUpdateChart(newVal, oldVal) {
    if (newVal && oldVal && newVal.length && oldVal.length) {
      return Array.isArray(newVal[0]) ?
      newVal.length === oldVal.length && newVal[0].length === oldVal[0].length :
        oldVal.reduce(sum, 0) > 0 ? newVal.length === oldVal.length : false;
    }
    return false;
  }

  function sum (carry, val) {
    return carry + val;
  }

  function createChart (type, scope, elem) {
    if (! scope.data || ! scope.data.length) return;
    scope.getColour = typeof scope.getColour === 'function' ? scope.getColour : getRandomColour;
    scope.colours = getColours(scope);
    var cvs = elem[0], ctx = cvs.getContext('2d');
    var data = Array.isArray(scope.data[0]) ?
      getDataSets(scope.labels, scope.data, scope.series || [], scope.colours) :
      getData(scope.labels, scope.data, scope.colours);
    var chart = new Chart(ctx)[type](data, scope.options || {});
    scope.$emit('create', chart);

    if (scope.click) {
      cvs.onclick = function (evt) {
        var click = chart.getPointsAtEvent || chart.getBarsAtEvent || chart.getSegmentsAtEvent;

        if (click) {
          var activePoints = click.call(chart, evt);
          scope.click(activePoints, evt);
          scope.$apply();
        }
      };
    }
    if (scope.legend && scope.legend !== 'false') setLegend(elem, chart);
    return chart;
  }

  function getColours (scope) {
    var colours = angular.copy(scope.colours) || angular.copy(Chart.defaults.global.colours);
    while (colours.length < scope.data.length) {
      colours.push(scope.getColour());
    }
    return colours.map(convertColour);
  }

  function convertColour (colour) {
    if (typeof colour === 'object' && colour !== null) return colour;
    if (typeof colour === 'string' && colour[0] === '#') return getColour(hexToRgb(colour.substr(1)));
    return getRandomColour();
  }

  function getRandomColour () {
    var colour = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
    return getColour(colour);
  }

  function getColour (colour) {
    return {
      fillColor: rgba(colour, 0.2),
      strokeColor: rgba(colour, 1),
      pointColor: rgba(colour, 1),
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: rgba(colour, 0.8)
    };
  }

  function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function rgba(colour, alpha) {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
  }

  // Credit: http://stackoverflow.com/a/11508164/1190235
  function hexToRgb (hex) {
    var bigint = parseInt(hex, 16),
      r = (bigint >> 16) & 255,
      g = (bigint >> 8) & 255,
      b = bigint & 255;

    return [r, g, b];
  }

  function getDataSets (labels, data, series, colours) {
    return {
      labels: labels,
      datasets: data.map(function (item, i) {
        var dataSet = angular.copy(colours[i]);
        dataSet.label = series[i];
        dataSet.data = item;
        return dataSet;
      })
    };
  }

  function getData (labels, data, colours) {
    return labels.map(function (label, i) {
      return {
        label: label,
        value: data[i],
        color: colours[i].strokeColor,
        highlight: colours[i].pointHighlightStroke
      };
    });
  }

  function setLegend (elem, chart) {
    var $parent = elem.parent(),
        $oldLegend = $parent.find('chart-legend'),
        legend = '<chart-legend>' + chart.generateLegend() + '</chart-legend>';
    if ($oldLegend.length) $oldLegend.replaceWith(legend);
    else $parent.append(legend);
  }

  function updateChart (chart, values, scope) {
    if (Array.isArray(scope.data[0])) {
      chart.datasets.forEach(function (dataset, i) {
        (dataset.points || dataset.bars).forEach(function (dataItem, j) {
          dataItem.value = values[i][j];
        });
      });
    } else {
      chart.segments.forEach(function (segment, i) {
        segment.value = values[i];
      });
    }
    chart.update();
    scope.$emit('update', chart);
  }

  function isEmpty (value) {
    return ! value ||
      (Array.isArray(value) && ! value.length) ||
      (typeof value === 'object' && ! Object.keys(value).length);
  }

})();
