/**
 * @class Ext.chart.series.sprite.StackedCartesian
 * @extends Ext.chart.series.sprite.Cartesian
 *
 * Stacked cartesian sprite.
 */
Ext.define('Ext.chart.series.sprite.StackedCartesian', {
    extend: 'Ext.chart.series.sprite.Cartesian',
    inheritableStatics: {
        def: {
            processors: {
                /**
                 * @private
                 * @cfg {Number} [groupCount=1] The number of items (e.g. bars) in a group.
                 */
                groupCount: 'number',

                /**
                 * @private
                 * @cfg {Number} [groupOffset=0] The group index of the series sprite.
                 */
                groupOffset: 'number',

                /**
                 * @private
                 * @cfg {Object} [dataStartY=null] The starting point of the data used in the series.
                 */
                dataStartY: 'data'
            },
            defaults: {
                selectionTolerance: 20,
                groupCount: 1,
                groupOffset: 0,
                dataStartY: null
            },
            dirtyTriggers: {
                dataStartY: 'dataY,bbox'
            }
        }
    },

    //@inheritdoc
    getIndexNearPoint: function (x, y) {
        var sprite = this,
            mat = sprite.attr.matrix,
            dataX = sprite.attr.dataX,
            dataY = sprite.attr.dataY,
            dataStartY = sprite.attr.dataStartY,
            selectionTolerance = sprite.attr.selectionTolerance,
            minX = 0.5, minY = Infinity, index = -1,
            imat = mat.clone().prependMatrix(this.surfaceMatrix).inverse(),
            center = imat.transformPoint([x, y]),
            positionLB = imat.transformPoint([x - selectionTolerance, y - selectionTolerance]),
            positionTR = imat.transformPoint([x + selectionTolerance, y + selectionTolerance]),
            dx, dy,
            top = Math.min(positionLB[1], positionTR[1]),
            bottom = Math.max(positionLB[1], positionTR[1]);

        for (var i = 0; i < dataX.length; i++) {
            if (Math.min(dataStartY[i], dataY[i]) <= bottom && top <= Math.max(dataStartY[i], dataY[i])) {
                dx = Math.abs(dataX[i] - center[0]);
                dy = Math.max(-Math.min(dataY[i] - center[1], center[1] - dataStartY[i]), 0);
                if (dx < minX && dy <= minY) {
                    minX = dx;
                    minY = dy;
                    index = i;
                }
            }
        }

        return index;
    }
});