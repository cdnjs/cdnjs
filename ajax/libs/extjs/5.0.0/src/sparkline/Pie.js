/**
 * @class Ext.sparkline.Pie
 *
 * Plots a pie chart based upon the input {#values} array.
 */
Ext.define('Ext.sparkline.Pie', {
    extend: 'Ext.sparkline.Base',

    alias: 'widget.sparklinepie',

    config: {

        /**
         * @cfg {Number} [offset] Angle in degrees to offset the first slice.
         */
        offset: 0,
        
        /**
         * @cfg {String[]} [sliceColors] An array of CSS colro values to apply to the chart slices.
         */
        sliceColors: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#66aa00', '#dd4477', '#0099c6', '#990099'],
        
        /**
         * @cfg {Number} [borderWidth=0] Border width in pixels of line round slices.
         */
        borderWidth: 0,
        
        /**
         * @cfg {String} [borderColor=#000] Border color of line round slices.
         */
        borderColor: '#000',
        
        tipTpl: new Ext.XTemplate('&#9679; {value} ({percent:number("0.0")}%)')
    },

    // Ensure values is an array of numbers
    applyValues: function(newValues) {
        newValues = Ext.Array.map(Ext.Array.from(newValues), Number);
        this.disabled = !(newValues && newValues.length);
        return newValues;
    },

    onUpdate: function () {
        var me = this,
            values = me.values,
            total = 0, i;

        me.callParent(arguments);

        me.shapes = {}; // map shape ids to value offsets
        me.valueShapes = {}; // maps value offsets to shape ids

        if (values.length > 0) {
            for (i = values.length; i--;) {
                total += values[i];
            }
        }
        me.total = total;
        me.radius = Math.floor(Math.min(me.getWidth(), me.getHeight()) / 2);
    },

    getRegion: function(x, y) {
        var shapeid = this.canvas.getShapeAt(x, y);
        return (shapeid != null && this.shapes[shapeid] != null) ? this.shapes[shapeid] : null;
    },

    getRegionFields: function(region) {
        var sliceColors = this.getSliceColors();

        return {
            isNull: this.values[region] == null,
            value: this.values[region],
            percent: this.values[region] / this.total * 100,
            color: sliceColors[region % sliceColors.length],
            offset: region
        };
    },

    renderHighlight: function(region) {
        this.renderSlice(region, true).append();
    },

    renderSlice: function(valuenum, highlight) {
        var me = this,
            canvas = me.canvas,
            radius = me.radius,
            borderWidth = me.getBorderWidth(),
            offset = me.getOffset(),
            circle = 2 * Math.PI,
            values = me.values,
            total = me.total,
            next = offset ? (2*Math.PI)*(offset/360) : 0,
            start, end, i, vlen, color,
            sliceColors = this.getSliceColors();

        vlen = values.length;
        for (i = 0; i < vlen; i++) {
            start = next;
            end = next;
            if (total > 0) {  // avoid divide by zero
                end = next + (circle * (values[i] / total));
            }
            if (valuenum === i) {
                color = sliceColors[i % sliceColors.length];
                if (highlight) {
                    color = me.calcHighlightColor(color);
                }

                return canvas.drawPieSlice(radius, radius, radius - borderWidth, start, end, null, color);
            }
            next = end;
        }
    },

    renderGraph: function () {
        var me = this,
            canvas = me.canvas,
            values = me.values,
            radius = me.radius,
            borderWidth = me.getBorderWidth(),
            shape, i,
            shapes = me.shapes || (me.shapes = {}),
            valueShapes = me.valueShapes || (me.valueShapes = {});

        if (!me.callParent()) {
            return;
        }
        if (borderWidth) {
            canvas.drawCircle(radius, radius, Math.floor(radius - (borderWidth / 2)),
                me.getBorderColor(), null, borderWidth).append();
        }
        for (i = values.length; i--;) {
            if (values[i]) { // don't render zero values
                shape = me.renderSlice(i).append();
                valueShapes[i] = shape.id; // store just the shapeid
                shapes[shape.id] = i;
            }
        }

        // If mouse is over, re-apply the highlight
        if (me.currentPageXY && me.el.getRegion().contains(me.currentPageXY)) {
            me.currentRegion = null;
            me.updateDisplay();
        }
        canvas.render();
    }
});