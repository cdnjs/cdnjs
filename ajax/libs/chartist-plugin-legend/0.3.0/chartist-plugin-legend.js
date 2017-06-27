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
        root['Chartist.plugins.legend'] = factory(root.Chartist);
    }
}(this, function (Chartist) {
    /**
     * This Chartist plugin creates a legend to show next to the chart.
     *
     */
    'use strict';

    var defaultOptions = {
        className: '',
        legendNames: false,
        clickable: true,
        onClick: null
    };

    Chartist.plugins = Chartist.plugins || {};

    Chartist.plugins.legend = function (options) {

        options = Chartist.extend({}, defaultOptions, options);

        return function legend(chart) {
            var existingLegendElement = chart.container.querySelector('.ct-legend');
            if (existingLegendElement) {
                // Clear legend if already existing.
                existingLegendElement.parentNode.removeChild(existingLegendElement);
            }

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

            var legendElement = document.createElement('ul');
            legendElement.className = 'ct-legend';
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
            legendNames.forEach(function (legend, i) {
                var li = document.createElement('li');
                li.className = 'ct-series-' + i;
                li.setAttribute('data-legend', i);
                li.textContent = legend.name || legend;
                legendElement.appendChild(li);
            });
            chart.container.appendChild(legendElement);

            if (options.clickable) {
                legendElement.addEventListener('click', function (e) {
                    var li = e.target;
                    if (li.parentNode !== legendElement || !li.hasAttribute('data-legend'))
                        return;
                    e.preventDefault();

                    var seriesIndex = parseInt(li.getAttribute('data-legend')),
                        removedSeriesIndex = removedSeries.indexOf(seriesIndex);

                    if (removedSeriesIndex > -1) {
                        // Add to series again.
                        removedSeries.splice(removedSeriesIndex, 1);
                        li.classList.remove('inactive');
                    } else {
                        // Remove from series, only if a minimum of one series is still visible.
                        if (chart.data.series.length > 1) {
                            removedSeries.push(seriesIndex);
                            li.classList.add('inactive');
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

                    if (options.onClick) {
                        options.onClick(chart, e);
                    }

                    chart.data.series = seriesCopy;

                    chart.update();
                });
            }

        };

    };

    return Chartist.plugins.legend;

}));
