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

    var angularChartist = angular.module('angular-chartist', []);

    function AngularChartistCtrl($scope) {
        this.data = $scope.data();
        this.chartType = $scope.chartType;

        this.events = $scope.events() || {};
        this.options = $scope.chartOptions() || null;
        this.responsiveOptions = $scope.responsiveOptions() || null;
    }

    AngularChartistCtrl.$inject = ['$scope'];

    AngularChartistCtrl.prototype.bindEvents = function (chart) {
        Object.keys(this.events).forEach(function (eventName) {
            chart.on(eventName, this.events[eventName]);
        }, this);
    };

    AngularChartistCtrl.prototype.renderChart = function (element) {
        return Chartist[this.chartType](element, this.data, this.options, this.responsiveOptions);
    };

    angularChartist.directive('chartist', [

    function () {
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
            link: function (scope, element, attrs, Ctrl) {
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
        };
    }]);

    return angularChartist;

}));