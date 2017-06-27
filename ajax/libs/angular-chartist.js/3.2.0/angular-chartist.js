(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["angular", "chartist"], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('angular'), require('chartist'));
    } else {
        root.angularChartist = factory(root.angular, root.Chartist);
    }
}(this, function (angular, Chartist) {

    /* global angular, Chartist */
    'use strict';

    var _createClass = (function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }

    var AngularChartistCtrl = (function () {
        function AngularChartistCtrl($scope) {
            _classCallCheck(this, AngularChartistCtrl);

            this.data = $scope.data();
            this.chartType = $scope.chartType;

            this.events = $scope.events() || {};
            this.options = $scope.chartOptions() || null;
            this.responsiveOptions = $scope.responsiveOptions() || null;
        }

        _createClass(AngularChartistCtrl, [{
            key: 'bindEvents',
            value: function bindEvents(chart) {
                var _this = this;

                Object.keys(this.events).forEach(function (eventName) {
                    chart.on(eventName, _this.events[eventName]);
                });
            }
        },
        {
            key: 'renderChart',
            value: function renderChart(element) {
                return Chartist[this.chartType](element, this.data, this.options, this.responsiveOptions);
            }
        }]);

        return AngularChartistCtrl;
    })();

    AngularChartistCtrl.$inject = ['$scope'];

    function AngularChartistLink(scope, element, attrs, Ctrl) {
        var elm = element[0];
        var chart = Ctrl.renderChart(elm);

        Ctrl.bindEvents(chart);

        scope.$watch(function () {
            return {
                data: scope.data(),
                chartType: scope.chartType,
                chartOptions: scope.chartOptions()
            };
        }, function (newConfig, oldConfig) {
            // Update controller with new configuration
            Ctrl.chartType = newConfig.chartType;
            Ctrl.data = newConfig.data;
            Ctrl.options = newConfig.chartOptions;

            // If chart type changed we need to recreate whole chart, otherwise we can update
            if (newConfig.chartType !== oldConfig.chartType) {
                chart = Ctrl.renderChart(elm);
            } else {
                chart.update(Ctrl.data, Ctrl.options);
            }
        }, true);

        scope.$on('$destroy', function () {
            chart.detach();
        });
    }

    function AngularChartistDirective() {
        return {
            restrict: 'EA',
            scope: {
                // mandatory
                data: '&chartistData',
                chartType: '@chartistChartType',
                // optional
                events: '&chartistEvents',
                chartOptions: '&chartistChartOptions',
                responsiveOptions: '&chartistResponsiveOptions'
            },
            controller: AngularChartistCtrl,
            link: AngularChartistLink
        };
    }

    AngularChartistDirective.$inject = [];

    var angularChartist = angular.module('angular-chartist', []).directive('chartist', AngularChartistDirective);
    return angularChartist;

}));