define(function (require) {
    'use strict';

    /**
     * This Chartist plugin creates a legend to show next to the chart.
     */
    var Chartist = require('chartist'),
        _ = require('underscore'),
        $ = require('jquery');

    var defaultOptions = {
        seriesName: 'name',
        inside: false // Shows the legend inside the chart (with CSS) - Not in use yet.
    };

    return function (options) {
        options = Chartist.extend(defaultOptions, options);
        console.log('opt',options);

        return function legend (chart) {
            var $chart = $(chart.container),
                legendClass = chart instanceof Chartist.Pie ? 'ct-legend-inside' : '',
                $legend = $chart
                .append('<ul class="ct-legend '+ legendClass +'"></ul>')
                .find('.ct-legend');

            console.log($chart);

            var insertLegendItem = function (i, name) {
                $legend.append('<li class="ct-series-' + i + '">' + name + '</li>');
            };

            // When the series have a name attribute, use this as legend (most charts).
            // Otherwise, use the labels as a legend (e.g. for a piechart)
            var hasSeriesName = false;

            if (chart.data.series.length && chart.data.series[0][options.seriesName]) {
                hasSeriesName = true;
            }

            if (hasSeriesName) {
                // Loop through all series to set each name in a list item.
                _.each(chart.data.series, function (series, i) {
                    if (series[options.seriesName]) {
                        insertLegendItem(i, series.name);
                    } else {
                        console.warn('Seriesname missing, watchout for incorrect legend.');
                    }
                });
            } else {
                _.each(chart.data.labels, function (label, i) {
                    insertLegendItem(i, label);
                });
            }
        };
    };
});
