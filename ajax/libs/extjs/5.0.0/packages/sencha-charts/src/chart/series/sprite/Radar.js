/**
 * @class Ext.chart.series.sprite.Radar
 * @extends Ext.chart.series.sprite.Polar
 * 
 * Radar series sprite.
 */
Ext.define('Ext.chart.series.sprite.Radar', {
    alias: 'sprite.radar',
    extend: 'Ext.chart.series.sprite.Polar',

    render: function (surface, ctx) {
        var me = this,
            attr = me.attr,
            centerX = attr.centerX,
            centerY = attr.centerY,
            matrix = attr.matrix,
            minX = attr.dataMinX,
            maxX = attr.dataMaxX,
            maxY = attr.dataMaxY,
            dataX = attr.dataX,
            dataY = attr.dataY,
            rangeY = attr.rangeY,
            endRho = attr.endRho,
            startRho = attr.startRho,
            baseRotation = attr.baseRotation,
            i, length = dataX.length,
            markerCfg = {},
            surfaceMatrix = me.surfaceMatrix,
            x, y, r, th;
        ctx.beginPath();
        for (i = 0; i < length; i++) {
            th = (dataX[i] - minX) / (maxX - minX + 1) * 2 * Math.PI + baseRotation;
            r = dataY[i] / (rangeY ? rangeY[1] : maxY) * (endRho - startRho) + startRho;
            x = matrix.x(centerX + Math.cos(th) * r, centerY + Math.sin(th) * r);
            y = matrix.y(centerX + Math.cos(th) * r, centerY + Math.sin(th) * r);
            if (i === 0) {
                ctx.moveTo(x, y);
            }
            ctx.lineTo(x, y);
            markerCfg.translationX = surfaceMatrix.x(x, y);
            markerCfg.translationY = surfaceMatrix.y(x, y);
            me.putMarker('markers', markerCfg, i, true);
        }
        ctx.closePath();
        ctx.fillStroke(attr);
    }
});