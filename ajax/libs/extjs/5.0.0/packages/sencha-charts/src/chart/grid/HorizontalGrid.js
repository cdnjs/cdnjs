/**
 * @class Ext.chart.grid.HorizontalGrid
 * @extends Ext.draw.sprite.Sprite
 * 
 * Horizontal Grid sprite. Used in Cartesian Charts.
 */
Ext.define("Ext.chart.grid.HorizontalGrid", {
    extend: 'Ext.draw.sprite.Sprite',
    alias: 'grid.horizontal',

    inheritableStatics: {
        def: {
            processors: {
                x: 'number',
                y: 'number',
                width: 'number',
                height: 'number'
            },

            defaults: {
                x: 0,
                y: 0,
                width: 1,
                height: 1,
                strokeStyle: '#DDD'
            }
        }
    },

    render: function (surface, ctx, clipRect) {
        var attr = this.attr,
            y = surface.roundPixel(attr.y),
            halfLineWidth = ctx.lineWidth * 0.5;
        ctx.beginPath();
        ctx.rect(clipRect[0] - surface.matrix.getDX(), y + halfLineWidth, +clipRect[2], attr.height);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(clipRect[0] - surface.matrix.getDX(), y + halfLineWidth);
        ctx.lineTo(clipRect[0] + clipRect[2] - surface.matrix.getDX(), y + halfLineWidth);
        ctx.stroke();
    }
});