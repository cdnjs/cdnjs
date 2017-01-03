Ext.define('Ext.draw.sprite.Line', {
    extend: 'Ext.draw.sprite.Sprite',
    alias: 'sprite.line',
    type: 'line',

    inheritableStatics: {
        def: {
            processors: {
                fromX: 'number',
                fromY: 'number',
                toX: 'number',
                toY: 'number'
            },

            defaults: {
                fromX: 0,
                fromY: 0,
                toX: 1,
                toY: 1
            }
        }
    },

    render: function (surface, ctx) {
        var attr = this.attr,
            matrix = this.attr.matrix;

        matrix.toContext(ctx);

        ctx.beginPath();
        ctx.moveTo(attr.fromX, attr.fromY);
        ctx.lineTo(attr.toX, attr.toY);
        ctx.stroke();
    }
});