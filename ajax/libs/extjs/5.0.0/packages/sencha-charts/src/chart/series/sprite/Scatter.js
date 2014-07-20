/**
 * @class Ext.chart.series.sprite.Scatter
 * @extends Ext.chart.series.sprite.Cartesian
 * 
 * Scatter series sprite.
 */
Ext.define('Ext.chart.series.sprite.Scatter', {
    alias: 'sprite.scatterSeries',
    extend: 'Ext.chart.series.sprite.Cartesian',

    renderClipped: function (surface, ctx, clip, clipRect) {
        if (this.cleanRedraw) {
            return;
        }
        var me = this,
            attr = me.attr,
            dataX = attr.dataX,
            dataY = attr.dataY,
            labels = attr.labels,
            drawLabels = labels && me.getBoundMarker('labels'),
            matrix = me.attr.matrix,
            xx = matrix.getXX(),
            yy = matrix.getYY(),
            dx = matrix.getDX(),
            dy = matrix.getDY(),
            markerCfg = {}, changes,
            left = clipRect[0] - xx,
            right = clipRect[0] + clipRect[2] + xx,
            top = clipRect[1] - yy,
            bottom = clipRect[1] + clipRect[3] + yy,
            x, y;
        for (var i = 0; i < dataX.length; i++) {
            x = dataX[i];
            y = dataY[i];
            x = x * xx + dx;
            y = y * yy + dy;
            if (left <= x && x <= right && top <= y && y <= bottom) {
                if (attr.renderer) {
                    markerCfg = {
                        type: 'items',
                        translationX: x,
                        translationY: y
                    };
                    changes = attr.renderer.call(me, me, markerCfg, {store: me.getStore()}, i);
                    markerCfg = Ext.apply(markerCfg, changes);
                } else {
                    markerCfg.translationX = x;
                    markerCfg.translationY = y;
                }
                me.putMarker('items', markerCfg, i, !attr.renderer);
                if (drawLabels && labels[i]) {
                    me.drawLabel(labels[i], x, y, i, clipRect);
                }
            }
        }
    },

    drawLabel: function (text, dataX, dataY, labelId, rect) {
        var me = this,
            attr = me.attr,
            label = me.getBoundMarker('labels')[0],
            labelTpl = label.getTemplate(),
            labelCfg = me.labelCfg || (me.labelCfg = {}),
            surfaceMatrix = me.surfaceMatrix,
            labelX, labelY,
            labelOverflowPadding = attr.labelOverflowPadding,
            flipXY = attr.flipXY,
            left = flipXY ? rect[1] : rect[0],
            top = flipXY ? rect[0] : rect[1],
            width = flipXY ? rect[3] : rect[2],
            height = flipXY ? rect[2] : rect[3],
            halfWidth, halfHeight,
            labelBox,
            changes;

        labelCfg.text = text;

        labelBox = me.getMarkerBBox('labels', labelId, true);
        if (!labelBox) {
            me.putMarker('labels', labelCfg, labelId);
            labelBox = me.getMarkerBBox('labels', labelId, true);
        }

        if (flipXY) {
            labelCfg.rotationRads = Math.PI * 0.5;
        } else {
            labelCfg.rotationRads = 0;
        }

        halfWidth = labelBox.width / 2;
        halfHeight = labelBox.height / 2;

        labelX = dataX;

        switch (labelTpl.attr.display) {
            case 'under':
                labelY = dataY - halfHeight - labelOverflowPadding;
                break;
            case 'rotate':
                labelX += labelOverflowPadding;
                labelY = dataY - labelOverflowPadding;
                labelCfg.rotationRads = -Math.PI / 4;
                break;
            default: // 'over'
                labelY = dataY + halfHeight + labelOverflowPadding;
        }

        if (labelX <= left + halfWidth) {
            labelX = left + halfWidth;
        } else if (labelX >= width - halfWidth) {
            labelX = width - halfWidth;
        }

        if (labelY <= top + halfHeight) {
            labelY = top + halfHeight;
        } else if (labelY >= height - halfHeight) {
            labelY = height - halfHeight;
        }

        labelCfg.x = surfaceMatrix.x(labelX, labelY);
        labelCfg.y = surfaceMatrix.y(labelX, labelY);

        if (labelTpl.attr.renderer) {
            changes = labelTpl.attr.renderer.call(me, text, label, labelCfg, {store: me.getStore()}, labelId);
            if (typeof changes === 'string') {
                labelCfg.text = changes;
            } else {
                Ext.apply(labelCfg, changes);
            }
        }

        me.putMarker('labels', labelCfg, labelId);
    }
});
