
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["angular","chartist"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('angular'), require('chartist'));
  } else {
    root.angularChartist = factory(root.angular, root.Chartist);
  }
}(this, function(angular, Chartist) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*global angular, Chartist*/

var AngularChartistCtrl = (function () {
    function AngularChartistCtrl($scope, $element) {
        var _this = this;

        _classCallCheck(this, AngularChartistCtrl);

        this.data = $scope.data;
        this.chartType = $scope.chartType;

        this.events = $scope.events() || {};
        this.options = $scope.chartOptions() || null;
        this.responsiveOptions = $scope.responsiveOptions() || null;

        this.element = $element[0];

        this.renderChart();

        $scope.$watch(function () {
            return {
                data: $scope.data,
                chartType: $scope.chartType,
                chartOptions: $scope.chartOptions()
            };
        }, this.update.bind(this), true);

        $scope.$on('$destroy', function () {
            if (_this.chart) {
                _this.chart.detach();
            }
        });
    }

    _createClass(AngularChartistCtrl, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this2 = this;

            Object.keys(this.events).forEach(function (eventName) {
                _this2.chart.on(eventName, _this2.events[eventName]);
            });
        }
    }, {
        key: 'renderChart',
        value: function renderChart() {
            // ensure that the chart does not get created without data
            if (this.data) {
                this.chart = Chartist[this.chartType](this.element, this.data, this.options, this.responsiveOptions);

                this.bindEvents();

                return this.chart;
            }
        }
    }, {
        key: 'update',
        value: function update(newConfig, oldConfig) {
            // Update controller with new configuration
            this.chartType = newConfig.chartType;
            this.data = newConfig.data;
            this.options = newConfig.chartOptions;

            // If chart type changed we need to recreate whole chart, otherwise we can update
            if (!this.chart || newConfig.chartType !== oldConfig.chartType) {
                this.renderChart();
            } else {
                this.chart.update(this.data, this.options);
            }
        }
    }]);

    return AngularChartistCtrl;
})();

AngularChartistCtrl.$inject = ['$scope', '$element'];

function chartistDirective() {
    return {
        restrict: 'EA',
        scope: {
            // mandatory
            data: '=chartistData',
            chartType: '@chartistChartType',
            // optional
            events: '&chartistEvents',
            chartOptions: '&chartistChartOptions',
            responsiveOptions: '&chartistResponsiveOptions'
        },
        controller: 'AngularChartistCtrl'
    };
}

chartistDirective.$inject = [];

/*eslint-disable no-unused-vars */
var angularChartist = angular.module('angular-chartist', []).controller('AngularChartistCtrl', AngularChartistCtrl).directive('chartist', chartistDirective);
/*eslint-enable no-unused-vars */
return angularChartist;

}));
