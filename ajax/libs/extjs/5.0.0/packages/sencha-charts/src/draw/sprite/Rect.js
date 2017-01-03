/**
 * @class Ext.draw.sprite.Rect
 * @extends Ext.draw.sprite.Path
 *
 * A sprite that represents a rectangle.
 *
 *     @example preview miniphone
 *     var container = new Ext.draw.Container({
 *       items: [{
 *         type: 'rect',
 *         x: 50,
 *         y: 50,
 *         width: 50,
 *         height: 50,
 *         fillStyle: 'blue'
 *       }]
 *     });
 *     Ext.Viewport.setLayout('fit');
 *     Ext.Viewport.add(container);
 */
Ext.define('Ext.draw.sprite.Rect', {
    extend: 'Ext.draw.sprite.Path',
    alias: 'sprite.rect',
    type: 'rect',
    inheritableStatics: {
        def: {
            processors: {
                /**
                 * @cfg {Number} [x=0] The position of the sprite on the x-axis.
                 */
                x: 'number',

                /**
                 * @cfg {Number} [y=0] The position of the sprite on the y-axis.
                 */
                y: 'number',

                /**
                 * @cfg {Number} [width=1] The width of the sprite.
                 */
                width: 'number',

                /**
                 * @cfg {Number} [height=1] The height of the sprite.
                 */
                height: 'number',

                /**
                 * @cfg {Number} [radius=0] The radius of the rounded corners.
                 */
                radius: 'number'
            },
            aliases: {

            },
            dirtyTriggers: {
                x: 'path',
                y: 'path',
                width: 'path',
                height: 'path',
                radius: 'path'
            },
            defaults: {
                x: 0,
                y: 0,
                width: 1,
                height: 1,
                radius: 0
            }
        }
    },

    updatePlainBBox: function (plain) {
        var attr = this.attr;
        plain.x = attr.x;
        plain.y = attr.y;
        plain.width = attr.width;
        plain.height = attr.height;
    },

    updateTransformedBBox: function (transform, plain) {
        this.attr.matrix.transformBBox(plain, this.attr.radius, transform);
    },

    updatePath: function (path, attr) {
        var x = attr.x,
            y = attr.y,
            width = attr.width,
            height = attr.height,
            radius = Math.min(attr.radius, Math.abs(attr.height) * 0.5, Math.abs(attr.width) * 0.5);
        if (radius === 0) {
            path.rect(x, y, width, height);
        } else {
            path.moveTo(x + radius, y);
            path.arcTo(x + width, y, x + width, y + height, radius);
            path.arcTo(x + width, y + height, x, y + height, radius);
            path.arcTo(x, y + height, x, y, radius);
            path.arcTo(x, y, x + radius, y, radius);
        }
    }
});