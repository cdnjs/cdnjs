/*
 * jquery.flot.tooltip
 * 
 * description: easy-to-use tooltips for Flot charts
 * version: 0.7.1
 * author: Krzysztof Urbas @krzysu [myviews.pl]
 * website: https://github.com/krzysu/flot.tooltip
 * 
 * build on 2014-06-22
 * released under MIT License, 2012
*/ 
// IE8 polyfill for Array.indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        if ( this === undefined || this === null ) {
            throw new TypeError( '"this" is null or not defined' );
        }
        var length = this.length >>> 0; // Hack to convert object.length to a UInt32
        fromIndex = +fromIndex || 0;
        if (Math.abs(fromIndex) === Infinity) {
            fromIndex = 0;
        }
        if (fromIndex < 0) {
            fromIndex += length;
            if (fromIndex < 0) {
                fromIndex = 0;
            }
        }

        for (;fromIndex < length; fromIndex++) {
            if (this[fromIndex] === searchElement) {
                return fromIndex;
            }
        }

        return -1;
    };
}

(function ($) {

    // plugin options, default values
    var defaultOptions = {
        tooltip: false,
        tooltipOpts: {
            content: "%s | X: %x | Y: %y",
            // allowed templates are:
            // %s -> series label,
            // %lx -> x axis label (requires flot-axislabels plugin https://github.com/markrcote/flot-axislabels),
            // %ly -> y axis label (requires flot-axislabels plugin https://github.com/markrcote/flot-axislabels),
            // %x -> X value,
            // %y -> Y value,
            // %x.2 -> precision of X value,
            // %p -> percent
            xDateFormat: null,
            yDateFormat: null,
            monthNames: null,
            dayNames: null,
            shifts: {
                x: 10,
                y: 20
            },
            defaultTheme: true,

            // callbacks
            onHover: function(flotItem, $tooltipEl) {}
        }
    };

    // object
    var FlotTooltip = function(plot) {

        // variables
        this.tipPosition = {x: 0, y: 0};

        this.init(plot);
    };

    // main plugin function
    FlotTooltip.prototype.init = function(plot) {

        var that = this;

        // detect other flot plugins
        var plotPluginsLength = $.plot.plugins.length;
        this.plotPlugins = [];

        if (plotPluginsLength) {
            for (var p = 0; p < plotPluginsLength; p++) {
                this.plotPlugins.push($.plot.plugins[p].name);
            }
        }

        plot.hooks.bindEvents.push(function (plot, eventHolder) {

            // get plot options
            that.plotOptions = plot.getOptions();

            // if not enabled return
            if (that.plotOptions.tooltip === false || typeof that.plotOptions.tooltip === 'undefined') return;

            // shortcut to access tooltip options
            that.tooltipOptions = that.plotOptions.tooltipOpts;

            // create tooltip DOM element
            var $tip = that.getDomElement();

            // bind event
            $( plot.getPlaceholder() ).bind("plothover", plothover);

            $(eventHolder).bind('mousemove', mouseMove);
        });

        plot.hooks.shutdown.push(function (plot, eventHolder){
            $(plot.getPlaceholder()).unbind("plothover", plothover);
            $(eventHolder).unbind("mousemove", mouseMove);
        });

        function mouseMove(e){
            var pos = {};
            pos.x = e.pageX;
            pos.y = e.pageY;
            that.updateTooltipPosition(pos);
        }

        function plothover(event, pos, item) {
            var $tip = that.getDomElement();
            if (item) {
                var tipText;

                // convert tooltip content template to real tipText
                tipText = that.stringFormat(that.tooltipOptions.content, item);

                $tip.html( tipText );
                that.updateTooltipPosition({ x: pos.pageX, y: pos.pageY });
                $tip.css({
                        left: that.tipPosition.x + that.tooltipOptions.shifts.x,
                        top: that.tipPosition.y + that.tooltipOptions.shifts.y
                    })
                    .show();

                // run callback
                if(typeof that.tooltipOptions.onHover === 'function') {
                    that.tooltipOptions.onHover(item, $tip);
                }
            }
            else {
                $tip.hide().html('');
            }
        }
    };

    /**
     * get or create tooltip DOM element
     * @return jQuery object
     */
    FlotTooltip.prototype.getDomElement = function() {
        var $tip = $('#flotTip');

        if( $tip.length === 0 ){
            $tip = $('<div />').attr('id', 'flotTip');
            $tip.appendTo('body').hide().css({position: 'absolute'});

            if(this.tooltipOptions.defaultTheme) {
                $tip.css({
                    'background': '#fff',
                    'z-index': '1040',
                    'padding': '0.4em 0.6em',
                    'border-radius': '0.5em',
                    'font-size': '0.8em',
                    'border': '1px solid #111',
                    'display': 'none',
                    'white-space': 'nowrap'
                });
            }
        }

        return $tip;
    };

    // as the name says
    FlotTooltip.prototype.updateTooltipPosition = function(pos) {
        var $tip = $('#flotTip');

        var totalTipWidth = $tip.outerWidth() + this.tooltipOptions.shifts.x;
        var totalTipHeight = $tip.outerHeight() + this.tooltipOptions.shifts.y;
        if ((pos.x - $(window).scrollLeft()) > ($(window).innerWidth() - totalTipWidth)) {
            pos.x -= totalTipWidth;
        }
        if ((pos.y - $(window).scrollTop()) > ($(window).innerHeight() - totalTipHeight)) {
            pos.y -= totalTipHeight;
        }
        this.tipPosition.x = pos.x;
        this.tipPosition.y = pos.y;
    };

    /**
     * core function, create tooltip content
     * @param  {string} content - template with tooltip content
     * @param  {object} item - Flot item
     * @return {string} real tooltip content for current item
     */
    FlotTooltip.prototype.stringFormat = function(content, item) {

        var percentPattern = /%p\.{0,1}(\d{0,})/;
        var seriesPattern = /%s/;
        var xLabelPattern = /%lx/; // requires flot-axislabels plugin https://github.com/markrcote/flot-axislabels, will be ignored if plugin isn't loaded
        var yLabelPattern = /%ly/; // requires flot-axislabels plugin https://github.com/markrcote/flot-axislabels, will be ignored if plugin isn't loaded
        var xPattern = /%x\.{0,1}(\d{0,})/;
        var yPattern = /%y\.{0,1}(\d{0,})/;
        var xPatternWithoutPrecision = "%x";
        var yPatternWithoutPrecision = "%y";
        var customTextPattern = "%ct";

        var x, y, customText;

        // for threshold plugin we need to read data from different place
        if (typeof item.series.threshold !== "undefined") {
            x = item.datapoint[0];
            y = item.datapoint[1];
            customText = item.datapoint[2];
        } else if (typeof item.series.lines !== "undefined" && item.series.lines.steps) {
            x = item.series.datapoints.points[item.dataIndex * 2];
            y = item.series.datapoints.points[item.dataIndex * 2 + 1];
            // TODO: where to find custom text in this variant?
            customText = "";
        } else {
            x = item.series.data[item.dataIndex][0];
            y = item.series.data[item.dataIndex][1];
            customText = item.series.data[item.dataIndex][2];
        }

        // I think this is only in case of threshold plugin
        if (item.series.label === null && item.series.originSeries) {
            item.series.label = item.series.originSeries.label;
        }

        // if it is a function callback get the content string
        if( typeof(content) === 'function' ) {
            content = content(item.series.label, x, y, item);
        }

        // percent match for pie charts
        if( typeof (item.series.percent) !== 'undefined' ) {
            content = this.adjustValPrecision(percentPattern, content, item.series.percent);
        }

        // series match
        if( typeof(item.series.label) !== 'undefined' ) {
            content = content.replace(seriesPattern, item.series.label);
        }
        else {
            //remove %s if label is undefined
            content = content.replace(seriesPattern, "");
        }

        // x axis label match
        if( this.hasAxisLabel('xaxis', item) ) {
            content = content.replace(xLabelPattern, item.series.xaxis.options.axisLabel);
        }
        else {
            //remove %lx if axis label is undefined or axislabels plugin not present
            content = content.replace(xLabelPattern, "");
        }

        // y axis label match
        if( this.hasAxisLabel('yaxis', item) ) {
            content = content.replace(yLabelPattern, item.series.yaxis.options.axisLabel);
        }
        else {
            //remove %ly if axis label is undefined or axislabels plugin not present
            content = content.replace(yLabelPattern, "");
        }

        // time mode axes with custom dateFormat
        if(this.isTimeMode('xaxis', item) && this.isXDateFormat(item)) {
            content = content.replace(xPattern, this.timestampToDate(x, this.tooltipOptions.xDateFormat, item.series.xaxis.options));
        }

        if(this.isTimeMode('yaxis', item) && this.isYDateFormat(item)) {
            content = content.replace(yPattern, this.timestampToDate(y, this.tooltipOptions.yDateFormat, item.series.yaxis.options));
        }

        // set precision if defined
        if(typeof x === 'number') {
            content = this.adjustValPrecision(xPattern, content, x);
        }
        if(typeof y === 'number') {
            content = this.adjustValPrecision(yPattern, content, y);
        }

        // change x from number to given label, if given
        if(typeof item.series.xaxis.ticks !== 'undefined') {

            var ticks;
            if(this.hasRotatedXAxisTicks(item)) {
                // xaxis.ticks will be an empty array if tickRotor is being used, but the values are available in rotatedTicks
                ticks = 'rotatedTicks';
            }
            else {
                ticks = 'ticks';
            }

            // see https://github.com/krzysu/flot.tooltip/issues/65
            var tickIndex = item.dataIndex + item.seriesIndex;

            if(item.series.xaxis[ticks].length > tickIndex && !this.isTimeMode('xaxis', item)) {
                var valueX = (this.isCategoriesMode('xaxis', item)) ? item.series.xaxis[ticks][tickIndex].label : item.series.xaxis[ticks][tickIndex].v;
                if (valueX === x) {
                    content = content.replace(xPattern, item.series.xaxis[ticks][tickIndex].label);
                }
            }
        }

        // change y from number to given label, if given
        if(typeof item.series.yaxis.ticks !== 'undefined') {
            for (var index in item.series.yaxis.ticks) {
                if (item.series.yaxis.ticks.hasOwnProperty(index)) {
                    var valueY = (this.isCategoriesMode('yaxis', item)) ? item.series.yaxis.ticks[index].label : item.series.yaxis.ticks[index].v;
                    if (valueY === y) {
                        content = content.replace(yPattern, item.series.yaxis.ticks[index].label);
                    }
                }
            }
        }

        // if no value customization, use tickFormatter by default
        if(typeof item.series.xaxis.tickFormatter !== 'undefined') {
            //escape dollar
            content = content.replace(xPatternWithoutPrecision, item.series.xaxis.tickFormatter(x, item.series.xaxis).replace(/\$/g, '$$'));
        }
        if(typeof item.series.yaxis.tickFormatter !== 'undefined') {
            //escape dollar
            content = content.replace(yPatternWithoutPrecision, item.series.yaxis.tickFormatter(y, item.series.yaxis).replace(/\$/g, '$$'));
        }

        if(customText) {
            content = content.replace(customTextPattern, customText);
        }

        return content;
    };

    // helpers just for readability
    FlotTooltip.prototype.isTimeMode = function(axisName, item) {
        return (typeof item.series[axisName].options.mode !== 'undefined' && item.series[axisName].options.mode === 'time');
    };

    FlotTooltip.prototype.isXDateFormat = function(item) {
        return (typeof this.tooltipOptions.xDateFormat !== 'undefined' && this.tooltipOptions.xDateFormat !== null);
    };

    FlotTooltip.prototype.isYDateFormat = function(item) {
        return (typeof this.tooltipOptions.yDateFormat !== 'undefined' && this.tooltipOptions.yDateFormat !== null);
    };

    FlotTooltip.prototype.isCategoriesMode = function(axisName, item) {
        return (typeof item.series[axisName].options.mode !== 'undefined' && item.series[axisName].options.mode === 'categories');
    };

    //
    FlotTooltip.prototype.timestampToDate = function(tmst, dateFormat, options) {
        var theDate = $.plot.dateGenerator(tmst, options);
        return $.plot.formatDate(theDate, dateFormat, this.tooltipOptions.monthNames, this.tooltipOptions.dayNames);
    };

    //
    FlotTooltip.prototype.adjustValPrecision = function(pattern, content, value) {

        var precision;
        var matchResult = content.match(pattern);
        if( matchResult !== null ) {
            if(RegExp.$1 !== '') {
                precision = RegExp.$1;
                value = value.toFixed(precision);

                // only replace content if precision exists, in other case use thickformater
                content = content.replace(pattern, value);
            }
        }
        return content;
    };

    // other plugins detection below

    // check if flot-axislabels plugin (https://github.com/markrcote/flot-axislabels) is used and that an axis label is given
    FlotTooltip.prototype.hasAxisLabel = function(axisName, item) {
        return (this.plotPlugins.indexOf('axisLabels') !== -1 && typeof item.series[axisName].options.axisLabel !== 'undefined' && item.series[axisName].options.axisLabel.length > 0);
    };

    // check whether flot-tickRotor, a plugin which allows rotation of X-axis ticks, is being used
    FlotTooltip.prototype.hasRotatedXAxisTicks = function(item) {
        return ($.grep($.plot.plugins, function(p){ return p.name === "tickRotor"; }).length === 1 && typeof item.series.xaxis.rotatedTicks !== 'undefined');
    };

    //
    var init = function(plot) {
      new FlotTooltip(plot);
    };

    // define Flot plugin
    $.plot.plugins.push({
        init: init,
        options: defaultOptions,
        name: 'tooltip',
        version: '0.6.7'
    });

})(jQuery);
