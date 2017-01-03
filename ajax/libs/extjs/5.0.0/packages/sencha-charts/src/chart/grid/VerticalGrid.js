/**
 * @class Ext.chart.grid.VerticalGrid
 * @extends Ext.draw.sprite.Sprite
 * 
 * Vertical Grid sprite. Used in Cartesian Charts.
 */
Ext.define("Ext.chart.grid.VerticalGrid", {
    extend: 'Ext.draw.sprite.Sprite',
    alias: 'grid.vertical',

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
            x = surface.roundPixel(attr.x),
            halfLineWidth = ctx.lineWidth * 0.5;
        ctx.beginPath();
        ctx.rect(x - halfLineWidth, clipRect[1] - surface.matrix.getDY(), attr.width, clipRect[3]);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x - halfLineWidth, clipRect[1] - surface.matrix.getDY());
        ctx.lineTo(x - halfLineWidth, clipRect[1] + clipRect[3] - surface.matrix.getDY());
        ctx.stroke();
    }
});