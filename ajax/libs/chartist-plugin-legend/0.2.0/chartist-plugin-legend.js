(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['chartist'], function (chartist) {
            return (root.returnExportsGlobal = factory(chartist));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('chartist'));
    } else {
        root['Chartist.plugins.legend'] = factory(root.chartist);
    }
}(this, function () {

    /**
     * This Chartist plugin creates a legend to show next to the chart.
     *
     */
    (function (Chartist) {
        'use strict';

        var defaultOptions = {
            className: '',
            legendNames: false,
            clickable: true
        };

        Chartist.plugins = Chartist.plugins || {};

        Chartist.plugins.legend = function (options) {

            options = Chartist.extend({}, defaultOptions, options);

            return function legend(chart) {

                // Set a unique className for each series so that when a series is removed,
                // the other series still have the same color.
                if (options.clickable) {
                    chart.data.series.forEach(function (series, seriesIndex) {
                        if (typeof series !== 'object') {
                            series = {
                                data: series
                            };
                        }

                        series.className = series.className || chart.options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex);
                    });
                }

                var chartElement = chart.container;
                chartElement.innerHTML += '<ul class="ct-legend"></ul>';
                var legendElement = chartElement.querySelector(".ct-legend");
                if (chart instanceof Chartist.Pie) {
                    legendElement.classList.add('ct-legend-inside');
                }
                if (typeof options.className === "string" && options.className.length > 0) {
                    legendElement.classList.add(options.className);
                }

                var removedSeries = [],
                    originalSeries = chart.data.series.slice(0);

                // Get the right array to use for generating the legend.
                var legendNames = chart.data.series;
                if (chart instanceof Chartist.Pie) {
                    legendNames = chart.data.labels;
                }
                legendNames = options.legendNames || legendNames;

                // Loop through all legends to set each name in a list item.
                var legendHtml = legendNames.map(function (legend, i) {
                    var legendName = legend.name || legend;
                    return '<li class="ct-series-' + i.toString() + '" data-legend="' + i.toString() + '">' + legendName + '</li>';
                }).join("");
                legendElement.innerHTML = legendHtml;
 
                if (options.clickable) {
                    var legendChildClickEvent = function (e) {
                        e.preventDefault();

                        var seriesIndex = parseInt(this.getAttribute('data-legend')),
                            removedSeriesIndex = removedSeries.indexOf(seriesIndex);

                        if (removedSeriesIndex > -1) {
                            // Add to series again.
                            removedSeries.splice(removedSeriesIndex, 1);
                            this.classList.remove('inactive');
                        } else {
                            // Remove from series, only if a minimum of one series is still visible.
                            if (chart.data.series.length > 1) {
                                removedSeries.push(seriesIndex);
                                this.classList.add('inactive');
                            }
                        }

                        // Reset the series to original and remove each series that
                        // is still removed again, to remain index order.
                        var seriesCopy = originalSeries.slice(0);

                        // Reverse sort the removedSeries to prevent removing the wrong index.
                        removedSeries.sort().reverse();

                        removedSeries.forEach(function (series) {
                            seriesCopy.splice(series, 1);
                        });

                        chart.data.series = seriesCopy;

                        chart.update();
                    };
                    var legendElementChildren = legendElement.querySelectorAll("li");
                    Array.prototype.forEach.call(legendElementChildren, function (legendElementChild) {
                        legendElementChild.onclick = legendChildClickEvent;
                    });
                }

            };

        };

    }(Chartist));

    return Chartist.plugins.legend;

}));
