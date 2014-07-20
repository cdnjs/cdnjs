/**
 * @class Ext.chart.interactions.RotatePie3D
 * @extends Ext.chart.interactions.Rotate
 *
 * A special version of the Rotate interaction used by Pie3D Chart.
 */
Ext.define('Ext.chart.interactions.RotatePie3D', {

    extend: 'Ext.chart.interactions.Rotate',

    type: 'rotatePie3d',

    alias: 'interaction.rotatePie3d',

    getAngle: function (e) {
        var chart = this.getChart(),
            rtl = chart.getInherited().rtl,
            direction = rtl ? -1 : 1,
            pageXY = e.getXY(),
            xy = chart.element.getXY(),
            rect = chart.getMainRect();
        return direction * Math.atan2(
            pageXY[1] - xy[1] - rect[3] * 0.5,
            pageXY[0] - xy[0] - rect[2] * 0.5
        );
    }
});
