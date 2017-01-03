/**
 * @class Ext.draw.sprite.Circle
 * @extends Ext.draw.sprite.Path
 *
 * A sprite that represents a circle.
 *
 *     @example preview miniphone
 *     new Ext.draw.Container({
 *       fullscreen: true,
 *       items: [{
 *         type: 'circle',
 *         cx: 100,
 *         cy: 100,
 *         r: 25,
 *         fillStyle: 'blue'
 *       }]
 *     });
 *
 */
Ext.define("Ext.draw.sprite.Circle", {
    extend: "Ext.draw.sprite.Path",
    alias: 'sprite.circle',
    type: 'circle',
    inheritableStatics: {
        def: {
            processors: {
                /**
                 * @cfg {Number} [cx=0] The center coordinate of the sprite on the x-axis.
                 */
                cx: "number",

                /**
                 * @cfg {Number} [cy=0] The center coordinate of the sprite on the y-axis.
                 */
                cy: "number",

                /**
                 * @cfg {Number} [r=0] The radius of the sprite.
                 */
                r: "number"
            },
            aliases: {
                radius: "r",
                x: "cx",
                y: "cy",
                centerX: "cx",
                centerY: "cy"
            },
            defaults: {
                cx: 0,
                cy: 0,
                r: 0
            },
            dirtyTriggers: {
                cx: 'path',
                cy: 'path',
                r: 'path'
            }
        }
    },

    updatePlainBBox: function (plain) {
        var attr = this.attr,
            cx = attr.cx,
            cy = attr.cy,
            r = attr.r;
        plain.x = cx - r;
        plain.y = cy - r;
        plain.width = r + r;
        plain.height = r + r;
    },

    updateTransformedBBox: function (transform) {
        var attr = this.attr,
            cx = attr.cx,
            cy = attr.cy,
            r = attr.r,
            matrix = attr.matrix,
            scalesX = matrix.getScaleX(),
            scalesY = matrix.getScaleY(),
            w, h;
        w = scalesX * r;
        h = scalesY * r;
        transform.x = matrix.x(cx, cy) - w;
        transform.y = matrix.y(cx, cy) - h;
        transform.width = w + w;
        transform.height = h + h;
    },

    updatePath: function (path, attr) {
        path.arc(attr.cx, attr.cy, attr.r, 0, Math.PI * 2, false);
    }
});