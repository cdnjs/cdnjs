(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["angular", "chartist"], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('angular'), require('chartist'));
    } else {
        root.angularChartist = factory(root.angular, root.Chartist);
    }
}(this, function (angular, Chartist) {

    'use strict';

    var angularChartist = angular.module('angular-chartist', []);

    function AngularChartistCtrl($scope) {
        this.data = $scope.data();
        this.chartType = $scope.chartType;

        this.events = $scope.events() || {};
        this.options = $scope.chartOptions() || null;
        this.responsiveOptions = $scope.responsiveOptions() || null;
    }

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
            controller: ['$scope', AngularChartistCtrl],
            link: function (scope, element, attrs, Ctrl) {
                var elm = element[0];
                var chart = Ctrl.renderChart(elm);

                Ctrl.bindEvents(chart);

                // Deeply watch the data and create a new chart if data is updated
                scope.$watch(scope.data, function (newData, oldData) {
                    // Avoid initializing the chart twice
                    if (newData !== oldData) {
                        chart.detach();
                        chart = Ctrl.renderChart(elm);
                        Ctrl.bindEvents(chart);
                    }
                }, true);
            }
        };
    }]);

    return angularChartist;

}));