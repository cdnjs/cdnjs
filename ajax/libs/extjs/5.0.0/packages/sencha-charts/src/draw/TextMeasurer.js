/**
 * Utility class to provide a way to *approximately* measure the dimension of texts without a drawing context.
 */
Ext.define('Ext.draw.TextMeasurer', {
    singleton: true,

    requires: ['Ext.util.TextMetrics'],

    /**
     * Measure a single-line text with specific font.
     * That may *not* be the exact size of the text as it is displayed.
     * @param {String} text
     * @param {String} font
     * @return {Object} An object with `width` and `height` properties.
     * @return {Number} return.width
     * @return {Number} return.height
     */
    measureTextSingleLine: function (text, font) {
        text = text.toString();
        var measureDiv = this.measureDiv || (this.measureDiv = Ext.getBody().createChild({
            tag: 'div',
            overflow: 'hidden',
            position: 'relative',
            //<debug>
            // tell the spec runner to ignore this element when checking if the dom is clean
            'data-sticky': true,
            //</debug>
            "float": 'left', // 'float' is a reserved word. Don't unquote, or it will break the CMD build.
            width: 0,
            height: 0,
            children: {
                tag: 'div',
                display: 'block',
                position: 'absolute',
                x: -100000,
                y: -100000,
                padding: 0,
                margin: 0,
                "z-index": -100000,
                "white-space": 'nowrap'
            }
        }).down('div'));
        measureDiv.setStyle({font: font || ''});
        return Ext.util.TextMetrics.measure(measureDiv, text);
    },

    /**
     * Measure a text with specific font.
     * This will split the text to lines and add up their size.
     * That may *not* be the exact size of the text as it is displayed.
     * @param {String} text
     * @param {String} font
     * @return {Object} An object with `width`, `height` and `sizes` properties.
     * @return {Number} return.width
     * @return {Number} return.height
     * @return {Object} return.sizes Results of individual line measurements, in case of multiline text.
     */
    measureText: function (text, font) {
        var lines = text.split('\n'),
            ln = lines.length,
            height = 0,
            width = 0,
            line, i,
            sizes;

        if (ln === 1) {
            return this.measureTextSingleLine(text, font);
        }

        sizes = [];
        for (i = 0; i < ln; i++) {
            line = this.measureTextSingleLine(lines[i], font);
            sizes.push(line);
            height += line.height;
            width = Math.max(width, line.width);
        }

        return {
            width: width,
            height: height,
            sizes: sizes
        };
    }
});
