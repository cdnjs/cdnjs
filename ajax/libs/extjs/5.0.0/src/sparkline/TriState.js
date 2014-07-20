/**
 * @class Ext.sparkline.TriState
 *
 * Plots bars based upon "win"/"draw" or "lose" status of the input {@link #values} array. Positive values mean
 * a win, zero a draw, and negative a lose. 
 */
Ext.define('Ext.sparkline.TriState', {
    extend: 'Ext.sparkline.BarBase',
    requires: [
        'Ext.sparkline.RangeMap'
    ],

    alias: 'widget.sparklinetristate',

    config: {

        /**
         * @cfg {Number} [barWidth=4] The pixel width of each bar.
         */
        barWidth: 4,
        
        /**
         * @cfg {Number} [barSpacing=1] The pixel spacing between each bar.
         */
        barSpacing: 1,
        
        /**
         * @cfg {String} [posBarColor=#6f6] The color for positive value bars.
         */
        posBarColor: '#6f6',
        
        /**
         * @cfg {String} [negBarColor=#f44] The color for negative value bars.
         */
        negBarColor: '#f44',
        
        /**
         * @cfg {String} [zeroBarColor=#999] The color for zero value bars.
         */
        zeroBarColor: '#999',
        
        /**
         * @cfg {Object} [colorMap] An object which uses range specifiers as keys to indicate bar color values
         * for range of values. A range specifier is of the form `[number]:[number]` indicating start and end range.
         * Omitting aither means an open ended range. For example to render green bars on all values less than -1
         * and red on values higher than 1 use:
         *
         *    {
         *        // Open ended range, with max value -1
         *        ":-1": "green",
         *
         *        // Open ended range, with min value 1
         *        "1:": "red"
         *    }
         */
        colorMap: {},
        
        tipTpl: new Ext.XTemplate('&#9679; {value:this.states}', {
            states: function(v) {
                var value = Number(v);
                if (value === -1) {
                    return 'Loss';
                }
                if (value === 0) {
                    return 'Draw';
                }
                if (value === 1) {
                    return 'Win';
                }
                return v;
            }
        })
    },

    applyColorMap: function(colorMap) {
        var me = this;

        if (Ext.isArray(colorMap)) {
            me.colorMapByIndex = colorMap;
            me.colorMapByValue = null;
        } else {
            me.colorMapByIndex = null;
            me.colorMapByValue = colorMap;
            if (me.colorMapByValue && me.colorMapByValue.get == null) {
                me.colorMapByValue = new Ext.sparkline.RangeMap(colorMap);
            }
        }
        return colorMap;
    },

    // Ensure values is an array of numbers
    applyValues: function(newValues) {
        newValues = Ext.Array.map(Ext.Array.from(newValues), Number);
        this.disabled = !(newValues && newValues.length);
        return newValues;
    },

    onUpdate: function() {
        this.totalBarWidth = this.getBarWidth() + this.getBarSpacing();
    },

    getBarWidth: function() {
        var values = this.values;

        return this._barWidth || (this.getWidth() - (values.length - 1) * this.getBarSpacing()) / values.length;
    },

    getRegion: function (x, y) {
        return Math.floor(x / this.totalBarWidth);
    },

    getRegionFields: function (region) {
        return {
            isNull: this.values[region] == null,
            value: this.values[region],
            color: this.calcColor(this.values[region], region),
            offset: region
        };
    },

    calcColor: function (value, valuenum) {
        var me = this,
            values = me.values,
            colorMapByIndex = me.colorMapByIndex,
            colorMapByValue = me.colorMapByValue,
            color, newColor;

        if (colorMapByValue && (newColor = colorMapByValue.get(value))) {
            color = newColor;
        } else if (colorMapByIndex && colorMapByIndex.length > valuenum) {
            color = colorMapByIndex[valuenum];
        } else if (values[valuenum] < 0) {
            color = me.getNegBarColor();
        } else if (values[valuenum] > 0) {
            color = me.getPosBarColor();
        } else {
            color = me.getZeroBarColor();
        }
        return color;
    },

    renderRegion: function (valuenum, highlight) {
        var me = this,
            values = me.values,
            canvas = me.canvas,
            canvasHeight, height, halfHeight, x, y, color;

        canvasHeight = canvas.pixelHeight;
        halfHeight = Math.round(canvasHeight / 2);

        x = valuenum * me.totalBarWidth;
        if (values[valuenum] < 0) {
            y = halfHeight;
            height = halfHeight - 1;
        } else if (values[valuenum] > 0) {
            y = 0;
            height = halfHeight - 1;
        } else {
            y = halfHeight - 1;
            height = 2;
        }
        color = me.calcColor(values[valuenum], valuenum);
        if (color == null) {
            return;
        }
        if (highlight) {
            color = me.calcHighlightColor(color);
        }
        canvas.drawRect(x, y, me.getBarWidth() - 1, height - 1, color, color).append();
    }
});