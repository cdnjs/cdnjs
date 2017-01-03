/**
 * Linear gradient.
 *
 *     @example preview miniphone
 *     var container = new Ext.draw.Container({
 *       items: [{
 *         type: 'circle',
 *         cx: 50,
 *         cy: 50,
 *         r: 100,
 *         fillStyle: {
 *           type: 'linear',
 *           degrees: 0,
 *           stops: [
 *             {
 *               offset: 0,
 *               color: 'white'
 *             },
 *             {
 *               offset: 1,
 *               color: 'blue'
 *             }
 *           ]
 *         }
 *       }]
 *     });
 *     Ext.Viewport.setLayout('fit');
 *     Ext.Viewport.add(container);
 */

Ext.define("Ext.draw.gradient.Linear", {
    extend: 'Ext.draw.gradient.Gradient',
    type: 'linear',
    config: {
        /**
         * @cfg {Number} The degree of rotation of the gradient.
         */
        degrees: 0
    },

    setAngle: function (angle) {
        this.setDegrees(angle);
    },

    /**
     * @inheritdoc
     */
    generateGradient: function (ctx, bbox) {
        var angle = Ext.draw.Draw.rad(this.getDegrees()),
            cos = Math.cos(angle),
            sin = Math.sin(angle),
            w = bbox.width,
            h = bbox.height,
            cx = bbox.x + w * 0.5,
            cy = bbox.y + h * 0.5,
            stops = this.getStops(),
            ln = stops.length,
            gradient,
            l, i;

        if (!isNaN(cx) && !isNaN(cy) && h > 0 && w > 0) {
            l = (Math.sqrt(h * h + w * w) * Math.abs(Math.cos(angle - Math.atan(h / w)))) / 2;
            gradient = ctx.createLinearGradient(
                cx + cos * l, cy + sin * l,
                cx - cos * l, cy - sin * l
            );

            for (i = 0; i < ln; i++) {
                gradient.addColorStop(stops[i].offset, stops[i].color);
            }
            return gradient;
        }
        return 'none';
    }
});