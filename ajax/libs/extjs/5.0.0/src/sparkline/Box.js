/**
 * @class Ext.sparkline.Box
 * Generates a box plot graph from the provided {@link #values} array.
 *
 * See <a href="http://en.wikipedia.org/wiki/Box_plot">Wikipedia Box Plots</a>
 */
Ext.define('Ext.sparkline.Box', {
    extend: 'Ext.sparkline.Base',

    alias: 'widget.sparklinebox',

    config: {

        /**
         * @cfg {Boolean} [raw=false] By default the points are calciulated from the input values array. Set this to true to passthe pre-calculated points in the values config.
         */
        raw: false,

        /**
         * @cfg {String} [boxLineColor=#000] The color of the box outline.
         */
        boxLineColor: '#000',
        
        /**
         * @cfg {String} [boxFillColor=#cdf] The color of the box fill.
         */
        boxFillColor: '#cdf',
        
        /**
         * @cfg {String} [whiskerColor=#000] The color of the whiskers.
         */
        whiskerColor: '#000',
        
        /**
         * @cfg {String} [outlierLineColor=#333] The color of the outlier circles' outline.
         */
        outlierLineColor: '#333',
        
        /**
         * @cfg {String} [outlierFillColor=#fff] The fill color of the outlier circles.
         */
        outlierFillColor: '#fff',
        
        /**
         * @cfg {String} [medianColor=#f00] The color of the median line.
         */
        medianColor: '#f00',
        
        /**
         * @cfg {Boolean} [showOutliers=true] Configure as `false` to not show outlier circles.
         */
        showOutliers: true,
        
        /**
         * @cfg {Number} [outlierIQR=1.5] The inter-quartile range multipler used to calculate values that qualify as an outlier.
         */
        outlierIQR: 1.5,
        
        /**
         * @cfg {Number} [spotRadius=1.5] The radius of the outlier circles.
         */
        spotRadius: 1.5,
        
        /**
         * @cfg {Number} [target] If set, a crosshair will be drawn at the specified value point.
         */
        target: null,
        
        /**
         * @cfg {Number} [targetColor=#4a2] The color of the crosshair drawn at the pointe specified by {@link #target}.
         */
        targetColor: '#4a2',
        
        /**
         * @cfg {Number} [chartRangeMin] The minimum value to use for the range of Y values of the chart - Defaults to the minimum value supplied.
         */
        chartRangeMin: null,
        
        /**
         * @cfg {Number} [chartRangeMax] The maximum value to use for the range of Y values of the chart - Defaults to the minimum value supplied.
         */
        chartRangeMax: null,
                
        tipTpl: new Ext.XTemplate('{field:this.fields}: {value}', {
            fields: function(v) {
                var fields = {
                    lq: 'Lower Quartile',
                    med: 'Median',
                    uq: 'Upper Quartile',
                    lo: 'Left Outlier',
                    ro: 'Right Outlier',
                    lw: 'Left Whisker',
                    rw: 'Right Whisker'
                };
                return fields[v];
            }
        }),
        tooltipFormatFieldlistKey: 'field'
    },

    quartile: function (values, q) {
        var vl;
        if (q === 2) {
            vl = Math.floor(values.length / 2);
            return values.length % 2 ? values[vl] : (values[vl-1] + values[vl]) / 2;
        } else {
            if (values.length % 2 ) { // odd
                vl = (values.length * q + q) / 4;
                return vl % 1 ? (values[Math.floor(vl)] + values[Math.floor(vl) - 1]) / 2 : values[vl-1];
            } else { //even
                vl = (values.length * q + 2) / 4;
                return vl % 1 ? (values[Math.floor(vl)] + values[Math.floor(vl) - 1]) / 2 :  values[vl-1];

            }
        }
    },

    // Ensure values is an array of numbers
    applyValues: function(newValues) {
        newValues = Ext.Array.map(Ext.Array.from(newValues), Number);
        this.disabled = !(newValues && newValues.length);
        return newValues;
    },

    /*
     * Simulate a single region
     */
    getRegion: function () {
        return 1;
    },

    getRegionFields: function () {
        var result = [
            { field: 'lq', value: this.quartiles[0] },
            { field: 'med', value: this.quartiles[1] },
            { field: 'uq', value: this.quartiles[2] }
        ];
        if (this.loutlier !== undefined) {
            result.push({ field: 'lo', value: this.loutlier});
        }
        if (this.routlier !== undefined) {
            result.push({ field: 'ro', value: this.routlier});
        }
        if (this.lwhisker !== undefined) {
            result.push({ field: 'lw', value: this.lwhisker});
        }
        if (this.rwhisker !== undefined) {
            result.push({ field: 'rw', value: this.rwhisker});
        }
        return result;
    },

    renderHighlight: Ext.emptyFn,

    renderGraph: function () {
        var me = this,
            canvas = me.canvas,
            values = me.values,
            vlen = values.length,
            canvasWidth = me.getWidth(),
            canvasHeight = me.getHeight(),
            chartRangeMin = me.getChartRangeMin(),
            chartRangeMax = me.getChartRangeMax(),
            minValue = chartRangeMin == null ? Math.min.apply(Math, values) : chartRangeMin,
            maxValue = chartRangeMax == null ? Math.max.apply(Math, values) : chartRangeMax,
            canvasLeft = 0,
            lwhisker, loutlier, iqr, q1, q2, q3, rwhisker, routlier, i,
            size, unitSize,
            spotRadius = me.getSpotRadius(),
            outlierLineColor = me.getOutlierLineColor(),
            outlierFillColor = me.getOutlierFillColor(),
            showOutliers = me.getShowOutliers(),
            outlierIQR = me.getOutlierIQR(),
            lineColor = me.getLineColor(),
            whiskerColor = me.getWhiskerColor(),
            targetColor = me.getTargetColor();

        if (!me.callParent()) {
            return;
        }

        if (me.raw) {
            if (showOutliers && values.length > 5) {
                loutlier = values[0];
                lwhisker = values[1];
                q1 = values[2];
                q2 = values[3];
                q3 = values[4];
                rwhisker = values[5];
                routlier = values[6];
            } else {
                lwhisker = values[0];
                q1 = values[1];
                q2 = values[2];
                q3 = values[3];
                rwhisker = values[4];
            }
        } else {
            values.sort(function (a, b) { return a - b; });
            q1 = me.quartile(values, 1);
            q2 = me.quartile(values, 2);
            q3 = me.quartile(values, 3);
            iqr = q3 - q1;
            if (showOutliers) {
                lwhisker = rwhisker = null;
                for (i = 0; i < vlen; i++) {
                    if (lwhisker == null && values[i] > q1 - (iqr * outlierIQR)) {
                        lwhisker = values[i];
                    }
                    if (values[i] < q3 + (iqr * outlierIQR)) {
                        rwhisker = values[i];
                    }
                }
                loutlier = values[0];
                routlier = values[vlen - 1];
            } else {
                lwhisker = values[0];
                rwhisker = values[vlen - 1];
            }
        }
        me.quartiles = [q1, q2, q3];
        me.lwhisker = lwhisker;
        me.rwhisker = rwhisker;
        me.loutlier = loutlier;
        me.routlier = routlier;

        unitSize = canvasWidth / (maxValue - minValue + 1);
        if (showOutliers) {
            canvasLeft = Math.ceil(spotRadius);
            canvasWidth -= 2 * Math.ceil(spotRadius);
            unitSize = canvasWidth / (maxValue - minValue + 1);
            if (loutlier < lwhisker) {
                canvas.drawCircle((loutlier - minValue) * unitSize + canvasLeft,
                    canvasHeight / 2,
                    spotRadius,
                    outlierLineColor,
                    outlierFillColor).append();
            }
            if (routlier > rwhisker) {
                canvas.drawCircle((routlier - minValue) * unitSize + canvasLeft,
                    canvasHeight / 2,
                    spotRadius,
                    outlierLineColor,
                    outlierFillColor).append();
            }
        }

        // box
        canvas.drawRect(
            Math.round((q1 - minValue) * unitSize + canvasLeft),
            Math.round(canvasHeight * 0.1),
            Math.round((q3 - q1) * unitSize),
            Math.round(canvasHeight * 0.8),
            me.getBoxLineColor(),
            me.getBoxFillColor()).append();
        // left whisker
        canvas.drawLine(
            Math.round((lwhisker - minValue) * unitSize + canvasLeft),
            Math.round(canvasHeight / 2),
            Math.round((q1 - minValue) * unitSize + canvasLeft),
            Math.round(canvasHeight / 2),
            lineColor).append();
        canvas.drawLine(
            Math.round((lwhisker - minValue) * unitSize + canvasLeft),
            Math.round(canvasHeight / 4),
            Math.round((lwhisker - minValue) * unitSize + canvasLeft),
            Math.round(canvasHeight - canvasHeight / 4),
            whiskerColor).append();
        // right whisker
        canvas.drawLine(Math.round((rwhisker - minValue) * unitSize + canvasLeft),
            Math.round(canvasHeight / 2),
            Math.round((q3 - minValue) * unitSize + canvasLeft),
            Math.round(canvasHeight / 2),
            lineColor).append();
        canvas.drawLine(
            Math.round((rwhisker - minValue) * unitSize + canvasLeft),
            Math.round(canvasHeight / 4),
            Math.round((rwhisker - minValue) * unitSize + canvasLeft),
            Math.round(canvasHeight - canvasHeight / 4),
            whiskerColor).append();
        // median line
        canvas.drawLine(
            Math.round((q2 - minValue) * unitSize + canvasLeft),
            Math.round(canvasHeight * 0.1),
            Math.round((q2 - minValue) * unitSize + canvasLeft),
            Math.round(canvasHeight * 0.9),
            me.getMedianColor()).append();
        if (me.target) {
            size = Math.ceil(me.spotRadius);
            canvas.drawLine(
                Math.round((me.target - minValue) * unitSize + canvasLeft),
                Math.round((canvasHeight / 2) - size),
                Math.round((me.target - minValue) * unitSize + canvasLeft),
                Math.round((canvasHeight / 2) + size),
                targetColor).append();
            canvas.drawLine(
                Math.round((me.target - minValue) * unitSize + canvasLeft - size),
                Math.round(canvasHeight / 2),
                Math.round((me.target - minValue) * unitSize + canvasLeft + size),
                Math.round(canvasHeight / 2),
                targetColor).append();
        }

        // If mouse is over, re-apply the highlight
        if (me.currentPageXY && me.el.getRegion().contains(me.currentPageXY)) {
            me.currentRegion = null;
            me.updateDisplay();
        }
        canvas.render();
    }
});