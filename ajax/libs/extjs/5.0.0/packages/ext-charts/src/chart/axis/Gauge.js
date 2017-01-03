/**
 * @class Ext.chart.axis.Gauge
 *
 * Gauge Axis is the axis to be used with a Gauge series. The Gauge axis
 * displays numeric data from an interval defined by the `minimum`, `maximum` and
 * `step` configuration properties. The placement of the numeric data can be changed
 * by altering the `margin` option that is set to `10` by default.
 *
 * A possible configuration for this axis would look like:
 *
 *     axes: [{
 *         type: 'gauge',
 *         position: 'gauge',
 *         minimum: 0,
 *         maximum: 100,
 *         steps: 10,
 *         margin: 7
 *     }],
 */
Ext.define('Ext.chart.axis.Gauge', {

    /* Begin Definitions */

    extend: 'Ext.chart.axis.Abstract',

    /* End Definitions */

    /**
     * @cfg {Number} minimum (required)
     * The minimum value of the interval to be displayed in the axis.
     */

    /**
     * @cfg {Number} maximum (required)
     * The maximum value of the interval to be displayed in the axis.
     */

    /**
     * @cfg {Number} steps (required)
     * The number of steps and tick marks to add to the interval.
     */

    /**
     * @cfg {Number} [margin=10]
     * The offset positioning of the tick marks and labels in pixels.
     */

    /**
     * @cfg {String} title
     * The title for the Axis.
     */

    position: 'gauge',

    alias: 'axis.gauge',

    drawAxis: function(init) {
        var chart = this.chart,
            surface = chart.surface,
            bbox = chart.chartBBox,
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + bbox.height,
            margin = this.margin || 10,
            rho = Math.min(bbox.width, 2 * bbox.height) /2 + margin,
            sprites = [], sprite,
            steps = this.steps,
            i, pi = Math.PI,
            cos = Math.cos,
            sin = Math.sin;

        if (this.sprites && !chart.resizing) {
            this.drawLabel();
            return;
        }

        if (this.margin >= 0) {
            if (!this.sprites) {
                //draw circles
                for (i = 0; i <= steps; i++) {
                    sprite = surface.add({
                        type: 'path',
                        path: ['M', centerX + (rho - margin) * cos(i / steps * pi - pi),
                                    centerY + (rho - margin) * sin(i / steps * pi - pi),
                                    'L', centerX + rho * cos(i / steps * pi - pi),
                                    centerY + rho * sin(i / steps * pi - pi), 'Z'],
                        stroke: '#ccc'
                    });
                    sprite.setAttributes({
                        hidden: false
                    }, true);
                    sprites.push(sprite);
                }
            } else {
                sprites = this.sprites;
                //draw circles
                for (i = 0; i <= steps; i++) {
                    sprites[i].setAttributes({
                        path: ['M', centerX + (rho - margin) * cos(i / steps * pi - pi),
                                    centerY + (rho - margin) * sin(i / steps * pi - pi),
                               'L', centerX + rho * cos(i / steps * pi - pi),
                                    centerY + rho * sin(i / steps * pi - pi), 'Z'],
                        stroke: '#ccc'
                    }, true);
                }
            }
        }
        this.sprites = sprites;
        this.drawLabel();
        if (this.title) {
            this.drawTitle();
        }
    },

    drawTitle: function() {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            bbox = chart.chartBBox,
            labelSprite = me.titleSprite,
            labelBBox;

        if (!labelSprite) {
            me.titleSprite = labelSprite = surface.add(Ext.apply({
                type: 'text',
                zIndex: 2
            }, me.axisTitleStyle, me.labelTitle));
        }
        labelSprite.setAttributes(Ext.apply({
            text: me.title
        }, me.label || {}), true);
        labelBBox = labelSprite.getBBox();
        labelSprite.setAttributes({
            x: bbox.x + (bbox.width / 2) - (labelBBox.width / 2),
            y: bbox.y + bbox.height - (labelBBox.height / 2) - 4
        }, true);
    },

    /**
     * Updates the {@link #title} of this axis.
     * @param {String} title
     */
    setTitle: function(title) {
        this.title = title;
        this.drawTitle();
    },

    drawLabel: function() {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            bbox = chart.chartBBox,
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + bbox.height,
            margin = me.margin || 10,
            rho = Math.min(bbox.width, 2 * bbox.height) /2 + 2 * margin,
            round = Math.round,
            labelArray = [], label,
            maxValue = me.maximum || 0,
            minValue = me.minimum || 0,
            steps = me.steps, 
            pi = Math.PI,
            cos = Math.cos,
            sin = Math.sin,
            labelConf = this.label,
            renderer = labelConf.renderer || Ext.identityFn,
            reverse = me.reverse,
            i, adjY, idx;

        if (!this.labelArray) {
            //draw scale
            for (i = 0; i <= steps; i++) {
                // TODO Adjust for height of text / 2 instead
                adjY = (i === 0 || i === steps) ? 7 : 0;
                idx = reverse ? steps - i : i;
                label = surface.add({
                    type: 'text',
                    text: renderer(round(minValue + idx / steps * (maxValue - minValue))),
                    x: centerX + rho * cos(i / steps * pi - pi),
                    y: centerY + rho * sin(i / steps * pi - pi) - adjY,
                    'text-anchor': 'middle',
                    'stroke-width': 0.2,
                    zIndex: 10,
                    stroke: '#333'
                });
                label.setAttributes({
                    hidden: false
                }, true);
                labelArray.push(label);
            }
        }
        else {
            labelArray = this.labelArray;
            //draw values
            for (i = 0; i <= steps; i++) {
                // TODO Adjust for height of text / 2 instead
                adjY = (i === 0 || i === steps) ? 7 : 0;
                idx = reverse ? steps - i : i;
                labelArray[i].setAttributes({
                    text: renderer(round(minValue + idx / steps * (maxValue - minValue))),
                    x: centerX + rho * cos(i / steps * pi - pi),
                    y: centerY + rho * sin(i / steps * pi - pi) - adjY
                }, true);
            }
        }
        this.labelArray = labelArray;
    }
});