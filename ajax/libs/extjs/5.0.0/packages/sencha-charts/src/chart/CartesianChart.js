/**
 * @class Ext.chart.CartesianChart
 * @extends Ext.chart.AbstractChart
 * @xtype cartesian
 *
 * Represents a chart that uses cartesian coordinates.
 * A cartesian chart has two directions, X direction and Y direction.
 * The series and axes are coordinated along these directions.
 * By default the x direction is horizontal and y direction is vertical,
 * You can swap the direction by setting the {@link #flipXY} config to `true`.
 *
 * Cartesian series often treats x direction an y direction differently.
 * In most cases, data on x direction are assumed to be monotonically increasing.
 * Based on this property, cartesian series can be trimmed and summarized properly
 * to gain a better performance.
 *
 */

Ext.define('Ext.chart.CartesianChart', {
    extend: 'Ext.chart.AbstractChart',
    requires: ['Ext.chart.grid.HorizontalGrid', 'Ext.chart.grid.VerticalGrid'],
    config: {
        /**
         * @cfg {Boolean} flipXY Flip the direction of X and Y axis.
         * If flipXY is true, the X axes will be vertical and Y axes will be horizontal.
         */
        flipXY: false,

        innerRect: [0, 0, 1, 1],

        /**
         * @cfg {Object} innerPadding The amount of inner padding in pixels.
         * Inner padding is the padding from the innermost axes to the series.
         */
        innerPadding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    },
    xtype: [ 'cartesian', 'chart' ],

    applyInnerPadding: function (padding, oldPadding) {
        if (!Ext.isObject(padding)) {
            return Ext.util.Format.parseBox(padding);
        } else if (!oldPadding) {
            return padding;
        } else {
            return Ext.apply(oldPadding, padding);
        }
    },

    getDirectionForAxis: function (position) {
        var flipXY = this.getFlipXY();
        if (position === 'left' || position === 'right') {
            if (flipXY) {
                return 'X';
            } else {
                return 'Y';
            }
        } else {
            if (flipXY) {
                return 'Y';
            } else {
                return 'X';
            }
        }
    },

    /**
     * Layout the axes and series.
     */
    performLayout: function () {
        try {
            this.resizing++;
            this.callParent();
            this.suspendThicknessChanged();
            var me = this,
                chartRect = me.getSurface('chart').getRect(),
                width = chartRect[2],
                height = chartRect[3],
                axes = me.getAxes(), axis,
                seriesList = me.getSeries(), series,
                axisSurface, thickness,
                insetPadding = me.getInsetPadding(),
                innerPadding = me.getInnerPadding(),
                surface, gridSurface,
                shrinkBox = Ext.apply({}, insetPadding),
                mainRect, innerWidth, innerHeight,
                elements, floating, floatingValue, matrix, i, ln,
                isRtl = me.getInherited().rtl,
                flipXY = me.getFlipXY();

            if (width <= 0 || height <= 0) {
                return;
            }

            for (i = 0; i < axes.length; i++) {
                axis = axes[i];
                axisSurface = axis.getSurface();
                floating = axis.getFloating();
                floatingValue = floating ? floating.value : null;
                thickness = axis.getThickness();
                switch (axis.getPosition()) {
                    case 'top':
                        axisSurface.setRect([0, shrinkBox.top + 1, width, thickness]);
                        break;
                    case 'bottom':
                        axisSurface.setRect([0, height - (shrinkBox.bottom + thickness), width, thickness]);
                        break;
                    case 'left':
                        axisSurface.setRect([shrinkBox.left, 0, thickness, height]);
                        break;
                    case 'right':
                        axisSurface.setRect([width - (shrinkBox.right + thickness), 0, thickness, height]);
                        break;
                }
                if (floatingValue === null) {
                    shrinkBox[axis.getPosition()] += thickness;
                }
            }

            width -= shrinkBox.left + shrinkBox.right;
            height -= shrinkBox.top + shrinkBox.bottom;

            mainRect = [shrinkBox.left, shrinkBox.top, width, height];

            shrinkBox.left += innerPadding.left;
            shrinkBox.top += innerPadding.top;
            shrinkBox.right += innerPadding.right;
            shrinkBox.bottom += innerPadding.bottom;

            innerWidth = width - innerPadding.left - innerPadding.right;
            innerHeight = height - innerPadding.top - innerPadding.bottom;

            me.setInnerRect([shrinkBox.left, shrinkBox.top, innerWidth, innerHeight]);

            if (innerWidth <= 0 || innerHeight <= 0) {
                return;
            }

            me.setMainRect(mainRect);
            me.getSurface().setRect(mainRect);

            for (i = 0, ln = me.surfaceMap.grid && me.surfaceMap.grid.length; i < ln; i++) {
                gridSurface = me.surfaceMap.grid[i];
                gridSurface.setRect(mainRect);
                gridSurface.matrix.set(1, 0, 0, 1, innerPadding.left, innerPadding.top);
                gridSurface.matrix.inverse(gridSurface.inverseMatrix);
            }

            for (i = 0; i < axes.length; i++) {
                axis = axes[i];
                axisSurface = axis.getSurface();
                matrix = axisSurface.matrix;
                elements = matrix.elements;
                switch (axis.getPosition()) {
                    case 'top':
                    case 'bottom':
                        elements[4] = shrinkBox.left;
                        axis.setLength(innerWidth);
                        break;
                    case 'left':
                    case 'right':
                        elements[5] = shrinkBox.top;
                        axis.setLength(innerHeight);
                        break;
                }
                axis.updateTitleSprite();
                matrix.inverse(axisSurface.inverseMatrix);
            }

            for (i = 0, ln = seriesList.length; i < ln; i++) {
                series = seriesList[i];
                surface = series.getSurface();
                surface.setRect(mainRect);
                if (flipXY) {
                    if (isRtl) {
                        surface.matrix.set(0, -1, -1, 0,
                                innerPadding.left + innerWidth,
                                innerPadding.top + innerHeight);
                    } else {
                        surface.matrix.set(0, -1, 1, 0,
                            innerPadding.left,
                            innerPadding.top + innerHeight);
                    }
                } else {
                    surface.matrix.set(1, 0, 0, -1,
                        innerPadding.left,
                        innerPadding.top + innerHeight);
                }
                surface.matrix.inverse(surface.inverseMatrix);
                series.getOverlaySurface().setRect(mainRect);
            }
            me.redraw();
            me.onPlaceWatermark(chartRect[2], chartRect[3]);
        } catch (e) { // catch is required in IE8 (try/finally not supported)
            //<debug>
            Ext.log.error(this.$className + ': Unhandled Exception: ', e.description || e.message);
            //</debug>
            throw e;
        }
        finally {
            this.resizing--;
            this.resumeThicknessChanged();
        }
    },

    refloatAxes: function () {
        var me = this,
            axes = me.getAxes(),
            axis, axisSurface, axisRect,
            floating, value, alongAxis, matrix,
            size = me.innerElement.getSize(),
            inset = me.getInsetPadding(),
            width = size.width - inset.left - inset.right,
            height = size.height - inset.top - inset.bottom,
            isHorizontal;

        for (var i = 0; i < axes.length; i++) {
            axis = axes[i];
            floating = axis.getFloating();
            value = floating ? floating.value : null;
            if (value !== null) {
                axisSurface = axis.getSurface();
                axisRect = axisSurface.getRect();
                if (!axisRect) {
                    continue;
                }
                axisRect = axisRect.slice();
                alongAxis = me.getAxis(floating.alongAxis);
                if (alongAxis) {
                    isHorizontal = alongAxis.getAlignment() === 'horizontal';
                    if (Ext.isString(value)) {
                        value = alongAxis.getCoordFor(value);
                    }
                    alongAxis.floatingAxes[axis.getId()] = value;
                    matrix = alongAxis.getSprites()[0].attr.matrix;
                    if (isHorizontal) {
                        value = value * matrix.getXX() + matrix.getDX();
                    } else {
                        value = value * matrix.getYY() + matrix.getDY();
                    }
                } else {
                    isHorizontal = axis.getAlignment() === 'horizontal';
                    value = axisSurface.roundPixel(0.01 * value * (isHorizontal ? height : width));
                }
                switch (axis.getPosition()) {
                    case 'top':
                        axisRect[1] = inset.top + value - axisRect[3] + 1;
                        break;
                    case 'bottom':
                        axisRect[1] = inset.top + (alongAxis ? value : height - value);
                        break;
                    case 'left':
                        axisRect[0] = inset.left + value - axisRect[2] + 1;
                        break;
                    case 'right':
                        axisRect[0] = inset.left + (alongAxis ? value : width - value) - 1;
                        break;
                }
                axisSurface.setRect(axisRect);
            }
        }
    },

    redraw: function () {
        var me = this,
            series = me.getSeries(),
            axes = me.getAxes(),
            rect = me.getMainRect(),
            innerWidth, innerHeight,
            innerPadding = me.getInnerPadding(),
            sprites, xRange, yRange, isSide, attr, i, j,
            axis, axisX, axisY, range, visibleRange,
            flipXY = me.getFlipXY(),
            sprite, zIndex, zBase = 1000,
            markers, markerCount, markerIndex, markerSprite, markerZIndex;

        if (!rect) {
            return;
        }

        innerWidth = rect[2] - innerPadding.left - innerPadding.right;
        innerHeight = rect[3] - innerPadding.top - innerPadding.bottom;
        for (i = 0; i < series.length; i++) {
            if ((axisX = series[i].getXAxis())) {
                visibleRange = axisX.getVisibleRange();
                xRange = axisX.getRange();
                xRange = [
                    xRange[0] + (xRange[1] - xRange[0]) * visibleRange[0],
                    xRange[0] + (xRange[1] - xRange[0]) * visibleRange[1]
                ];
            } else {
                xRange = series[i].getXRange();
            }

            if ((axisY = series[i].getYAxis())) {
                visibleRange = axisY.getVisibleRange();
                yRange = axisY.getRange();
                yRange = [
                    yRange[0] + (yRange[1] - yRange[0]) * visibleRange[0],
                    yRange[0] + (yRange[1] - yRange[0]) * visibleRange[1]
                ];
            } else {
                yRange = series[i].getYRange();
            }

            attr = {
                visibleMinX: xRange[0],
                visibleMaxX: xRange[1],
                visibleMinY: yRange[0],
                visibleMaxY: yRange[1],
                innerWidth: innerWidth,
                innerHeight: innerHeight,
                flipXY: flipXY
            };

            sprites = series[i].getSprites();
            for (j = 0; j < sprites.length; j++) {

                // All the series now share the same surface, so we must assign
                // the sprites a zIndex that depends on the index of their series.
                sprite = sprites[j];
                zIndex = (sprite.attr.zIndex || 0);
                if (zIndex < zBase) {
                    // Set the sprite's zIndex
                    zIndex += (i+1) * 100 + zBase;
                    sprite.attr.zIndex = zIndex;
                    // Iterate through its marker sprites to do the same.
                    markers = sprite.boundMarkers;
                    if (markers) {
                        markerCount = (markers.items ? markers.items.length : 0);
                        if (markerCount) {
                            for (markerIndex = 0; markerIndex < markerCount; markerIndex++) {
                                markerSprite = markers.items[markerIndex];
                                markerZIndex = (markerSprite.attr.zIndex || 0);
                                if (markerZIndex == Number.MAX_VALUE) {
                                    markerSprite.attr.zIndex = zIndex;
                                } else {
                                    if (markerZIndex < zBase) {
                                        markerSprite.attr.zIndex = zIndex + markerZIndex;
                                    }
                                }
                            }
                        }
                    }
                }

                sprite.setAttributes(attr, true);
            }
        }

        for (i = 0; i < axes.length; i++) {
            axis = axes[i];
            isSide = axis.isSide();
            sprites = axis.getSprites();
            range = axis.getRange();
            visibleRange = axis.getVisibleRange();
            attr = {
                dataMin: range[0],
                dataMax: range[1],
                visibleMin: visibleRange[0],
                visibleMax: visibleRange[1]
            };
            if (isSide) {
                attr.length = innerHeight;
                attr.startGap = innerPadding.bottom;
                attr.endGap = innerPadding.top;
            } else {
                attr.length = innerWidth;
                attr.startGap = innerPadding.left;
                attr.endGap = innerPadding.right;
            }
            for (j = 0; j < sprites.length; j++) {
                sprites[j].setAttributes(attr, true);
            }
        }
        me.renderFrame();
        me.callParent(arguments);
    },

    renderFrame: function () {
        this.refloatAxes();
        this.callParent(arguments);
    },

    onPlaceWatermark: function (width, height) {
        var me = this,
            watermarkElement = me.watermarkElement,
            rect = watermarkElement &&
                  (me.getSurface ? me.getSurface('main').getRect()
                                 : me.getItems().get(0).getRect());

        if (rect) {
            watermarkElement.setStyle({
                right: Math.round(width - (rect[2] + rect[0])) + 'px',
                bottom: Math.round(height - (rect[3] + rect[1])) + 'px'
            });
        }
    }
});
