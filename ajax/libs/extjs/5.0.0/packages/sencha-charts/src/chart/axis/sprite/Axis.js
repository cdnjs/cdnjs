/**
 * @private
 * @class Ext.chart.axis.sprite.Axis
 * @extends Ext.draw.sprite.Sprite
 *
 * The axis sprite. Currently all types of the axis will be rendered with this sprite.
 * TODO(touch-2.2): Split different types of axis into different sprite classes.
 */
Ext.define('Ext.chart.axis.sprite.Axis', {
    extend: 'Ext.draw.sprite.Sprite',
    type: 'axis',
    mixins: {
        markerHolder: 'Ext.chart.MarkerHolder'
    },

    requires: ['Ext.draw.sprite.Text'],

    inheritableStatics: {
        def: {
            processors: {
                /**
                 * @cfg {Boolean} grid 'true' if the axis has a grid.
                 */
                grid: 'bool',

                /**
                 * @cfg {Boolean} axisLine 'true' if the main line of the axis is drawn.
                 */
                axisLine: 'bool',

                /**
                 * @cfg {Boolean} minorTricks 'true' if the axis has sub ticks.
                 */
                minorTicks: 'bool',

                /**
                 * @cfg {Number} minorTickSize The length of the minor ticks.
                 */
                minorTickSize: 'number',

                /**
                 * @cfg {Boolean} majorTicks 'true' if the axis has major ticks.
                 */
                majorTicks: 'bool',

                /**
                 * @cfg {Number} majorTickSize The length of the major ticks.
                 */
                majorTickSize: 'number',

                /**
                 * @cfg {Number} length The total length of the axis.
                 */
                length: 'number',

                /**
                 * @private
                 * @cfg {Number} startGap Axis start determined by the chart inset padding.
                 */
                startGap: 'number',

                /**
                 * @private
                 * @cfg {Number} endGap Axis end determined by the chart inset padding.
                 */
                endGap: 'number',

                /**
                 * @cfg {Number} dataMin The minimum value of the axis data.
                 */
                dataMin: 'number',

                /**
                 * @cfg {Number} dataMax The maximum value of the axis data.
                 */
                dataMax: 'number',

                /**
                 * @cfg {Number} visibleMin The minimum value that is displayed.
                 */
                visibleMin: 'number',

                /**
                 * @cfg {Number} visibleMax The maximum value that is displayed.
                 */
                visibleMax: 'number',

                /**
                 * @cfg {String} position The position of the axis on the chart.
                 */
                position: 'enums(left,right,top,bottom,angular,radial,gauge)',

                /**
                 * @cfg {Number} minStepSize The minimum step size between ticks.
                 */
                minStepSize: 'number',

                /**
                 * @private
                 * @cfg {Number} estStepSize The estimated step size between ticks.
                 */
                estStepSize: 'number',

                /**
                 * @private
                 * Unused.
                 */
                titleOffset: 'number',

                /**
                 * @cfg {Number} textPadding The padding around axis labels to determine collision.
                 */
                textPadding: 'number',

                /**
                 * @cfg {Number} min The minimum value of the axis.
                 */
                min: 'number',

                /**
                 * @cfg {Number} max The maximum value of the axis.
                 */
                max: 'number',

                /**
                 * @cfg {Number} centerX The central point of the angular axis on the x-axis.
                 */
                centerX: 'number',

                /**
                 * @cfg {Number} centerY The central point of the angular axis on the y-axis.
                 */
                centerY: 'number',

                /**
                 * @private
                 * @cfg {Number} radius
                 * Unused.
                 */
                radius: 'number',

                /**
                 * @private
                 */
                totalAngle: 'number',

                /**
                 * @cfg {Number} The starting rotation of the angular axis.
                 */
                baseRotation: 'number',

                /**
                 * @private
                 * Unused.
                 */
                data: 'default',

                /**
                 * @cfg {Boolean} 'true' if the estimated step size is adjusted by text size.
                 */
                enlargeEstStepSizeByText: 'bool'
            },

            defaults: {
                grid: false,
                axisLine: true,
                minorTicks: false,
                minorTickSize: 3,
                majorTicks: true,
                majorTickSize: 5,
                length: 0,
                startGap: 0,
                endGap: 0,
                visibleMin: 0,
                visibleMax: 1,
                dataMin: 0,
                dataMax: 1,
                position: '',
                minStepSize: 0,
                estStepSize: 20,
                min: 0,
                max: 1,
                centerX: 0,
                centerY: 0,
                radius: 1,
                baseRotation: 0,
                data: null,
                titleOffset: 0,
                textPadding: 5,
                scalingCenterY: 0,
                scalingCenterX: 0,
                // Override default
                strokeStyle: 'black',
                enlargeEstStepSizeByText: false
            },

            dirtyTriggers: {
                minorTickSize: 'bbox',
                majorTickSize: 'bbox',
                position: 'bbox,layout',
                axisLine: 'bbox,layout',
                min: 'layout',
                max: 'layout',
                length: 'layout',
                minStepSize: 'layout',
                estStepSize: 'layout',
                data: 'layout',
                dataMin: 'layout',
                dataMax: 'layout',
                visibleMin: 'layout',
                visibleMax: 'layout',
                enlargeEstStepSizeByText: 'layout'
            },
            updaters: {
                layout: function () {
                    this.doLayout();
                }
            }
        }
    },

    config: {

        /**
         * @cfg {Object} label
         *
         * The label configuration object for the Axis. This object may include style attributes
         * like `spacing`, `padding`, `font` that receives a string or number and
         * returns a new string with the modified values.
         */
        label: null,

        /**
         * @cfg {Object|Ext.chart.axis.layout.Layout} layout The layout configuration used by the axis.
         */
        layout: null,

        /**
         * @cfg {Object|Ext.chart.axis.segmenter.Segmenter} segmenter The method of segmenter used by the axis.
         */
        segmenter: null,

        /**
         * @cfg {Function} renderer Allows direct customisation of rendered axis sprites.
         */
        renderer: null,

        /**
         * @private
         * @cfg {Object} layoutContext Stores the context after calculating layout.
         */
        layoutContext: null,

        /**
         * @cfg {Ext.chart.axis.Axis} axis The axis represented by this sprite.
         */
        axis: null
    },

    thickness: 0,

    stepSize: 0,

    getBBox: function () { return null; },

    doLayout: function () {
        var me = this,
            chart = me.getAxis().getChart();
        if (chart.isInitializing) {
            return;
        }
        var attr = me.attr,
            layout = me.getLayout(),
            isRtl = chart.getInherited().rtl,
            min = attr.dataMin + (attr.dataMax - attr.dataMin) * attr.visibleMin,
            max = attr.dataMin + (attr.dataMax - attr.dataMin) * attr.visibleMax,
            context = {
                attr: attr,
                segmenter: me.getSegmenter()
            };

        if (attr.position === 'left' || attr.position === 'right') {
            attr.translationX = 0;
            attr.translationY = max * attr.length / (max - min);
            attr.scalingX = 1;
            attr.scalingY = -attr.length / (max - min);
            attr.scalingCenterY = 0;
            attr.scalingCenterX = 0;
            me.applyTransformations(true);
        } else if (attr.position === 'top' || attr.position === 'bottom') {
            if (isRtl) {
                attr.translationX = attr.length + min * attr.length / (max - min) + 1;
            } else {
                attr.translationX = -min * attr.length / (max - min);
            }
            attr.translationY = 0;
            attr.scalingX = (isRtl ? -1 : 1) * attr.length / (max - min);
            attr.scalingY = 1;
            attr.scalingCenterY = 0;
            attr.scalingCenterX = 0;
            me.applyTransformations(true);
        }

        if (layout) {
            layout.calculateLayout(context);
            me.setLayoutContext(context);
        }
    },

    iterate: function (snaps, fn) {
        var i, position,
            id, floatingAxes, floatingValues,
            some = Ext.Array.some,
            abs = Math.abs,
            threshold;
        if (snaps.getLabel) {
            if (snaps.min < snaps.from) {
                fn.call(this, snaps.min, snaps.getLabel(snaps.min), -1, snaps);
            }
            for (i = 0; i <= snaps.steps; i++) {
                fn.call(this, snaps.get(i), snaps.getLabel(i), i, snaps);
            }
            if (snaps.max > snaps.to) {
                fn.call(this, snaps.max, snaps.getLabel(snaps.max), snaps.steps + 1, snaps);
            }
        } else {
            floatingAxes = this.getAxis().floatingAxes;
            floatingValues = [];
            threshold = (snaps.to - snaps.from) / (snaps.steps + 1);
            for (id in floatingAxes) {
                floatingValues.push(floatingAxes[id]);
            }
            // Don't render ticks in axes intersection points.
            function isTickVisible(position) {
                return !floatingValues.length || some(floatingValues, function (value) {
                    return abs(value - position) > threshold;
                });
            }
            if (snaps.min < snaps.from && isTickVisible(snaps.min)) {
                fn.call(this, snaps.min, snaps.min, -1, snaps);
            }
            for (i = 0; i <= snaps.steps; i++) {
                position = snaps.get(i);
                if (isTickVisible(position)) {
                    fn.call(this, position, position, i, snaps);
                }
            }
            if (snaps.max > snaps.to && isTickVisible(snaps.max)) {
                fn.call(this, snaps.max, snaps.max, snaps.steps + 1, snaps);
            }
        }
    },

    renderTicks: function (surface, ctx, layout, clipRect) {
        var me = this,
            attr = me.attr,
            docked = attr.position,
            matrix = attr.matrix,
            halfLineWidth = 0.5 * attr.lineWidth,
            xx = matrix.getXX(),
            dx = matrix.getDX(),
            yy = matrix.getYY(),
            dy = matrix.getDY(),
            majorTicks = layout.majorTicks,
            majorTickSize = attr.majorTickSize,
            minorTicks = layout.minorTicks,
            minorTickSize = attr.minorTickSize;

        if (majorTicks) {
            switch (docked) {
                case 'right':
                    function getRightTickFn(size) {
                        return function (position, labelText, i) {
                            position = surface.roundPixel(position * yy + dy) + halfLineWidth;
                            ctx.moveTo(0, position);
                            ctx.lineTo(size, position);
                        };
                    }
                    me.iterate(majorTicks, getRightTickFn(majorTickSize));
                    minorTicks && me.iterate(minorTicks, getRightTickFn(minorTickSize));
                    break;
                case 'left':
                    function getLeftTickFn(size) {
                        return function (position, labelText, i) {
                            position = surface.roundPixel(position * yy + dy) + halfLineWidth;
                            ctx.moveTo(clipRect[2] - size, position);
                            ctx.lineTo(clipRect[2], position);
                        };
                    }
                    me.iterate(majorTicks, getLeftTickFn(majorTickSize));
                    minorTicks && me.iterate(minorTicks, getLeftTickFn(minorTickSize));
                    break;
                case 'bottom':
                    function getBottomTickFn(size) {
                        return function (position, labelText, i) {
                            position = surface.roundPixel(position * xx + dx) - halfLineWidth;
                            ctx.moveTo(position, 0);
                            ctx.lineTo(position, size);
                        };
                    }
                    me.iterate(majorTicks, getBottomTickFn(majorTickSize));
                    minorTicks && me.iterate(minorTicks, getBottomTickFn(minorTickSize));
                    break;
                case 'top':
                    function getTopTickFn(size) {
                        return function (position, labelText, i) {
                            position = surface.roundPixel(position * xx + dx) - halfLineWidth;
                            ctx.moveTo(position, clipRect[3]);
                            ctx.lineTo(position, clipRect[3] - size);
                        };
                    }
                    me.iterate(majorTicks, getTopTickFn(majorTickSize));
                    minorTicks && me.iterate(minorTicks, getTopTickFn(minorTickSize));
                    break;
                case 'angular':
                    me.iterate(majorTicks, function (position, labelText, i) {
                        position = position / (attr.max + 1) * Math.PI * 2 + attr.baseRotation;
                        ctx.moveTo(
                            attr.centerX + (attr.length) * Math.cos(position),
                            attr.centerY + (attr.length) * Math.sin(position)
                        );
                        ctx.lineTo(
                            attr.centerX + (attr.length + majorTickSize) * Math.cos(position),
                            attr.centerY + (attr.length + majorTickSize) * Math.sin(position)
                        );
                    });
                    break;
                case 'gauge':
                    var gaugeAngles = me.getGaugeAngles();
                    me.iterate(majorTicks, function (position, labelText, i) {
                        position = (position - attr.min) / (attr.max - attr.min + 1) * attr.totalAngle - attr.totalAngle + gaugeAngles.start;
                        ctx.moveTo(
                            attr.centerX + (attr.length) * Math.cos(position),
                            attr.centerY + (attr.length) * Math.sin(position)
                        );
                        ctx.lineTo(
                            attr.centerX + (attr.length + majorTickSize) * Math.cos(position),
                            attr.centerY + (attr.length + majorTickSize) * Math.sin(position)
                        );
                    });
                    break;
            }
        }
    },

    renderLabels: function (surface, ctx, layout, clipRect) {
        var me = this,
            attr = me.attr,
            halfLineWidth = 0.5 * attr.lineWidth,
            docked = attr.position,
            matrix = attr.matrix,
            textPadding = attr.textPadding,
            xx = matrix.getXX(),
            dx = matrix.getDX(),
            yy = matrix.getYY(),
            dy = matrix.getDY(),
            thickness = 0,
            majorTicks = layout.majorTicks,
            tickPadding = Math.max(attr.majorTickSize, attr.minorTickSize) + attr.lineWidth,
            label = me.getLabel(), font, labelOffset,
            lastLabelText = null,
            textSize = 0, textCount = 0,
            segmenter = layout.segmenter,
            renderer = me.getRenderer(),
            title = me.getAxis().getTitle(),
            titleBBox = title && title.attr.text !== '' && title.getBBox(),
            labelInverseMatrix, lastBBox = null, bbox, fly, text, titlePadding;
        if (majorTicks && label && !label.attr.hidden) {
            font = label.attr.font;
            if (ctx.font !== font) {
                ctx.font = font;
            } // This can profoundly improve performance.
            label.setAttributes({translationX: 0, translationY: 0}, true, true);
            label.applyTransformations();
            labelInverseMatrix = label.attr.inverseMatrix.elements.slice(0);
            switch (docked) {
                case 'left':
                    titlePadding = titleBBox ? titleBBox.x + titleBBox.width : 0;
                    label.setAttributes({
                        translationX: surface.roundPixel(titlePadding + (clipRect[2] - titlePadding - tickPadding) / 2 + dx) - halfLineWidth
                    }, true, true);
                    break;
                case 'right':
                    titlePadding = titleBBox ? clipRect[2] - titleBBox.x : 0;
                    label.setAttributes({
                        translationX: surface.roundPixel(tickPadding + (clipRect[2] - tickPadding - titlePadding) / 2 + dx) + halfLineWidth
                    }, true, true);
                    break;
                case 'top':
                    titlePadding = titleBBox ? titleBBox.y + titleBBox.height: 0;
                    label.setAttributes({
                        translationY: surface.roundPixel(titlePadding + (clipRect[3] - titlePadding - tickPadding) / 2) - halfLineWidth
                    }, true, true);
                    break;
                case 'bottom':
                    titlePadding = titleBBox ? clipRect[3] - titleBBox.y : 0;
                    label.setAttributes({
                        translationY: surface.roundPixel(tickPadding + (clipRect[3] - tickPadding - titlePadding) / 2) + halfLineWidth
                    }, true, true);
                    break;
                case 'radial' :
                    label.setAttributes({
                        translationX: attr.centerX
                    }, true, true);
                    break;
                case 'angular':
                    label.setAttributes({
                        translationY: attr.centerY
                    }, true, true);
                    break;
                case 'gauge':
                    label.setAttributes({
                        translationY: attr.centerY
                    }, true, true);
                    break;
            }

            // TODO: there are better ways to detect collision.
            if (docked === 'left' || docked === 'right') {
                me.iterate(majorTicks, function (position, labelText, i) {
                    if (labelText === undefined) {
                        return;
                    }
                    text = renderer ? renderer.call(me, labelText, layout, lastLabelText) : segmenter.renderer(labelText, layout, lastLabelText);
                    lastLabelText = labelText;
                    label.setAttributes({
                        text: String(text),
                        translationY: surface.roundPixel(position * yy + dy)
                    }, true, true);
                    label.applyTransformations();
                    thickness = Math.max(thickness, label.getBBox().width + tickPadding);
                    if (thickness <= me.thickness) {
                        fly = Ext.draw.Matrix.fly(label.attr.matrix.elements.slice(0));
                        bbox = fly.prepend.apply(fly, labelInverseMatrix).transformBBox(label.getBBox(true));
                        if (lastBBox && !Ext.draw.Draw.isBBoxIntersect(bbox, lastBBox, textPadding)) {
                            return;
                        }
                        surface.renderSprite(label);
                        lastBBox = bbox;
                        textSize += bbox.height;
                        textCount++;
                    }
                });
            } else if (docked === 'top' || docked === 'bottom') {
                me.iterate(majorTicks, function (position, labelText, i) {
                    if (labelText === undefined) {
                        return;
                    }
                    // TODO: When a custom renderer is used, the labels don't go through the segmenter.renderer
                    // TODO: and so if they are numbers they don't get rounded, we have to take care of it in our
                    // TODO: custom renderer. It may appear that they have the precision we want already, so
                    // TODO: for our custom renderer we could just use function (v) { return v + '%'; }, but this is
                    // TODO: deceiving, as the min/max values are not aligned by the Numeric (or Time) segmenter
                    // TODO: (see layout.Continuous#snapEnds) since segmenter.from simply returns the passed value.
                    // TODO: So what we get is sever jittering during axis range animation because the min/max
                    // TODO: labels (typically max, since min is often 0) will have varying mantissa during animation.
                    // TODO: The min/max should always be aligned as well as intermidiate ticks, because who really
                    // TODO: wants to have axis with values like this [-13.5233, -10, -5, 0, 5, 10, 12.2352]?
                    // TODO: Granted, it will only look this way if we defined our own custom render and don't do
                    // TODO: the rounding there, like in the example above. But even without a custom renderer
                    // TODO: the labels will look like this [-13, -10, -5, 0, 5, 10, 12]. The spacing between the
                    // TODO: ticks and the grid lines is still inconsistent, which doesn't look right to most everybody.
                    // TODO: Alternatively, alignMaximum/MinimumByMajorUnit configs should be implemented
                    // TODO: and set to 'true' by default.
                    // TODO: For now taking care of rounding in custom renderers is the way to go.
                    text = renderer ? renderer.call(this, labelText, layout, lastLabelText) : segmenter.renderer(labelText, layout, lastLabelText);
                    lastLabelText = labelText;
                    label.setAttributes({
                        text: String(text),
                        translationX: surface.roundPixel(position * xx + dx)
                    }, true, true);
                    label.applyTransformations();
                    thickness = Math.max(thickness, label.getBBox().height + tickPadding);
                    if (thickness <= me.thickness) {
                        fly = Ext.draw.Matrix.fly(label.attr.matrix.elements.slice(0));
                        bbox = fly.prepend.apply(fly, labelInverseMatrix).transformBBox(label.getBBox(true));
                        if (lastBBox && !Ext.draw.Draw.isBBoxIntersect(bbox, lastBBox, textPadding)) {
                            return;
                        }
                        surface.renderSprite(label);
                        lastBBox = bbox;
                        textSize += bbox.width;
                        textCount++;
                    }
                });
            } else if (docked === 'radial') {
                me.iterate(majorTicks, function (position, labelText, i) {
                    if (labelText === undefined) {
                        return;
                    }
                    text = renderer ? renderer.call(me, labelText, layout, lastLabelText) : segmenter.renderer(labelText, layout, lastLabelText);
                    lastLabelText = labelText;
                    if (typeof text !== 'undefined') {
                        label.setAttributes({
                            text: String(text),
                            translationX: attr.centerX - surface.roundPixel(position) / attr.max * attr.length * Math.cos(attr.baseRotation + Math.PI / 2),
                            translationY: attr.centerY - surface.roundPixel(position) / attr.max * attr.length * Math.sin(attr.baseRotation + Math.PI / 2)
                        }, true, true);
                        label.applyTransformations();
                        bbox = label.attr.matrix.transformBBox(label.getBBox(true));
                        if (lastBBox && !Ext.draw.Draw.isBBoxIntersect(bbox, lastBBox)) {
                            return;
                        }
                        surface.renderSprite(label);
                        lastBBox = bbox;
                        textSize += bbox.width;
                        textCount++;
                    }
                });
            } else if (docked === 'angular') {
                labelOffset = attr.majorTickSize + attr.lineWidth * 0.5 + (parseInt(label.attr.fontSize, 10) || 10) / 2;
                me.iterate(majorTicks, function (position, labelText, i) {
                    if (labelText === undefined) {
                        return;
                    }
                    text = renderer ? renderer.call(me, labelText, layout, lastLabelText) : segmenter.renderer(labelText, layout, lastLabelText);
                    lastLabelText = labelText;
                    thickness = Math.max(thickness, Math.max(attr.majorTickSize, attr.minorTickSize) + (attr.lineCap !== 'butt' ? attr.lineWidth * 0.5 : 0));
                    if (typeof text !== 'undefined') {
                        var angle = position / (attr.max + 1) * Math.PI * 2 + attr.baseRotation;
                        label.setAttributes({
                            text: String(text),
                            translationX: attr.centerX + (attr.length + labelOffset) * Math.cos(angle),
                            translationY: attr.centerY + (attr.length + labelOffset) * Math.sin(angle)
                        }, true, true);
                        label.applyTransformations();
                        bbox = label.attr.matrix.transformBBox(label.getBBox(true));
                        if (lastBBox && !Ext.draw.Draw.isBBoxIntersect(bbox, lastBBox)) {
                            return;
                        }
                        surface.renderSprite(label);
                        lastBBox = bbox;
                        textSize += bbox.width;
                        textCount++;
                    }
                });
            } else if (docked === 'gauge') {
                var gaugeAngles = me.getGaugeAngles();
                me.iterate(majorTicks, function (position, labelText, i) {
                    if (labelText === undefined) {
                        return;
                    }
                    text = renderer ? renderer.call(me, labelText, layout, lastLabelText) : segmenter.renderer(labelText, layout, lastLabelText);
                    lastLabelText = labelText;

                    if (typeof text !== 'undefined') {
                        var angle = (position - attr.min) / (attr.max - attr.min + 1) * attr.totalAngle - attr.totalAngle + gaugeAngles.start;
                        label.setAttributes({
                            text: String(text),
                            translationX: attr.centerX + (attr.length + 10) * Math.cos(angle),
                            translationY: attr.centerY + (attr.length + 10) * Math.sin(angle)
                        }, true, true);
                        label.applyTransformations();
                        bbox = label.attr.matrix.transformBBox(label.getBBox(true));
                        if (lastBBox && !Ext.draw.Draw.isBBoxIntersect(bbox, lastBBox)) {
                            return;
                        }
                        surface.renderSprite(label);
                        lastBBox = bbox;
                        textSize += bbox.width;
                        textCount++;
                    }
                });
            }

            if (attr.enlargeEstStepSizeByText && textCount) {
                textSize /= textCount;
                textSize += tickPadding;
                textSize *= 2;
                if (attr.estStepSize < textSize) {
                    attr.estStepSize = textSize;
                }
            }

            if (Math.abs(me.thickness - (thickness)) > 1) {
                me.thickness = thickness;
                attr.bbox.plain.dirty = true;
                attr.bbox.transform.dirty = true;
                me.doThicknessChanged();
                return false;
            }
        }
    },

    renderAxisLine: function (surface, ctx, layout, clipRect) {
        var me = this,
            attr = me.attr,
            halfLineWidth = attr.lineWidth * 0.5,
            docked = attr.position,
            position, gaugeAngles;
        if (attr.axisLine && attr.length) {
            switch (docked) {
                case 'left':
                    position = surface.roundPixel(clipRect[2]) - halfLineWidth;
                    ctx.moveTo(position, -attr.endGap);
                    ctx.lineTo(position, attr.length + attr.startGap);
                    break;
                case 'right':
                    ctx.moveTo(halfLineWidth, -attr.endGap);
                    ctx.lineTo(halfLineWidth, attr.length + attr.startGap);
                    break;
                case 'bottom':
                    ctx.moveTo(-attr.startGap, halfLineWidth);
                    ctx.lineTo(attr.length + attr.endGap, halfLineWidth);
                    break;
                case 'top':
                    position = surface.roundPixel(clipRect[3]) - halfLineWidth;
                    ctx.moveTo(-attr.startGap, position);
                    ctx.lineTo(attr.length + attr.endGap, position);
                    break;
                case 'angular':
                    ctx.moveTo(attr.centerX + attr.length, attr.centerY);
                    ctx.arc(attr.centerX, attr.centerY, attr.length, 0, Math.PI * 2, true);
                    break;
                case 'gauge':
                    gaugeAngles = me.getGaugeAngles();
                    ctx.moveTo(attr.centerX + Math.cos(gaugeAngles.start) * attr.length,
                        attr.centerY + Math.sin(gaugeAngles.start) * attr.length);
                    ctx.arc(attr.centerX, attr.centerY, attr.length, gaugeAngles.start, gaugeAngles.end, true);
                    break;
            }
        }
    },

    getGaugeAngles: function () {
        var me = this,
            angle = me.attr.totalAngle,
            offset;
        if (angle <= Math.PI) {
            offset = (Math.PI - angle) * 0.5;
        } else {
            offset = -(Math.PI * 2 - angle) * 0.5;
        }
        offset = Math.PI * 2 - offset;
        return {
            start: offset,
            end: offset - angle
        };
    },

    renderGridLines: function (surface, ctx, layout, clipRect) {
        var me = this,
            attr = me.attr,
            matrix = attr.matrix,
            startGap = attr.startGap,
            endGap = attr.endGap,
            xx = matrix.getXX(),
            yy = matrix.getYY(),
            dx = matrix.getDX(),
            dy = matrix.getDY(),
            position = attr.position,
            majorTicks = layout.majorTicks,
            anchor, j, lastAnchor;
        if (attr.grid) {
            if (majorTicks) {
                if (position === 'left' || position === 'right') {
                    lastAnchor = attr.min * yy + dy + endGap + startGap;
                    me.iterate(majorTicks, function (position, labelText, i) {
                        anchor = position * yy + dy + endGap;
                        me.putMarker('horizontal-' + (i % 2 ? 'odd' : 'even'), {
                            y: anchor,
                            height: lastAnchor - anchor
                        }, j = i, true);
                        lastAnchor = anchor;
                    });
                    j++;
                    anchor = 0;
                    me.putMarker('horizontal-' + (j % 2 ? 'odd' : 'even'), {
                        y: anchor,
                        height: lastAnchor - anchor
                    }, j, true);
                } else if (position === 'top' || position === 'bottom') {
                    lastAnchor = attr.min * xx + dx + startGap;
                    if (startGap) {
                        me.putMarker('vertical-even', {
                            x: 0,
                            width: lastAnchor
                        }, -1, true);
                    }
                    me.iterate(majorTicks, function (position, labelText, i) {
                        anchor = position * xx + dx + startGap;
                        me.putMarker('vertical-' + (i % 2 ? 'odd' : 'even'), {
                            x: anchor,
                            width: lastAnchor - anchor
                        }, j = i, true);
                        lastAnchor = anchor;
                    });
                    j++;
                    anchor = attr.length + attr.startGap + attr.endGap;
                    me.putMarker('vertical-' + (j % 2 ? 'odd' : 'even'), {
                        x: anchor,
                        width: lastAnchor - anchor
                    }, j, true);
                } else if (position === 'radial') {
                    me.iterate(majorTicks, function (position, labelText, i) {
                        if (!position) {
                            return;
                        }
                        anchor = position / attr.max * attr.length;
                        me.putMarker('circular-' + (i % 2 ? 'odd' : 'even'), {
                            scalingX: anchor,
                            scalingY: anchor
                        }, i, true);
                        lastAnchor = anchor;
                    });
                } else if (position === 'angular') {
                    me.iterate(majorTicks, function (position, labelText, i) {
                        if (!attr.length) {
                            return;
                        }
                        anchor = position / (attr.max + 1) * Math.PI * 2 + attr.baseRotation;
                        me.putMarker('radial-' + (i % 2 ? 'odd' : 'even'), {
                            rotationRads: anchor,
                            rotationCenterX: 0,
                            rotationCenterY: 0,
                            scalingX: attr.length,
                            scalingY: attr.length
                        }, i, true);
                        lastAnchor = anchor;
                    });
                }
            }
        }
    },

    renderLimits: function () {
        var me = this,
            axis = me.getAxis(),
            limits = Ext.Array.from(axis.getLimits());

        if (!limits.length) {
            return;
        }

        var limitsRect = axis.limits.surface.getRect(),
            attr = me.attr,
            matrix = attr.matrix,
            position = attr.position,
            chain = Ext.Object.chain,
            titles = axis.limits.titles,
            titleBBox, titlePosition, titleFlip,
            limit, value,
            i, ln, x, y;

        titles.instances = [];
        titles.position = 0;

        if (position === 'left' || position === 'right') {
            for (i = 0, ln = limits.length; i < ln; i++) {
                limit = chain(limits[i]);
                !limit.line && (limit.line = {});
                value = Ext.isString(limit.value) ? axis.getCoordFor(limit.value) : limit.value;
                value = value * matrix.getYY() + matrix.getDY();
                limit.line.y = value;
                me.putMarker('horizontal-limit-lines', limit.line, i, true);
                if (limit.line.title) {
                    titles.createInstance(limit.line.title);
                    titleBBox = titles.getBBoxFor(titles.position - 1);
                    titlePosition = limit.line.title.position || (position === 'left' ? 'start' : 'end');
                    switch (titlePosition) {
                        case 'start':
                            x = 10;
                            break;
                        case 'end':
                            x = limitsRect[2] - 10;
                            break;
                        case 'middle':
                            x = limitsRect[2] / 2;
                            break;
                    }
                    titles.setAttributesFor(titles.position - 1, {
                        x: x,
                        y: value - titleBBox.height / 2,
                        textAlign: titlePosition,
                        fillStyle: limit.line.title.fillStyle || limit.line.strokeStyle
                    });
                }
            }
        } else if (position === 'top' || position === 'bottom') {
            for (i = 0, ln = limits.length; i < ln; i++) {
                limit = chain(limits[i]);
                !limit.line && (limit.line = {});
                value = Ext.isString(limit.value) ? axis.getCoordFor(limit.value) : limit.value;
                value = value * matrix.getXX() + matrix.getDX();
                limit.line.x = value;
                me.putMarker('vertical-limit-lines', limit.line, i, true);
                if (limit.line.title) {
                    titles.createInstance(limit.line.title);
                    titleBBox = titles.getBBoxFor(titles.position - 1);
                    titlePosition = limit.line.title.position || (position === 'top' ? 'end' : 'start');
                    switch (titlePosition) {
                        case 'start':
                            y = limitsRect[3] - titleBBox.width / 2 - 10;
                            break;
                        case 'end':
                            y = titleBBox.width / 2 + 10;
                            break;
                        case 'middle':
                            y = limitsRect[3] / 2;
                            break;
                    }
                    titles.setAttributesFor(titles.position - 1, {
                        x: value + titleBBox.height / 2,
                        y: y,
                        fillStyle: limit.line.title.fillStyle || limit.line.strokeStyle,
                        rotationRads: Math.PI / 2
                    });
                }
            }
        } else if (position === 'radial') {
            for (i = 0, ln = limits.length; i < ln; i++) {
                limit = chain(limits[i]);
                !limit.line && (limit.line = {});
                value = Ext.isString(limit.value) ? axis.getCoordFor(limit.value) : limit.value;
                if (value > attr.max) {
                    continue;
                }
                value = value / attr.max * attr.length;
                limit.line.cx = attr.centerX;
                limit.line.cy = attr.centerY;
                limit.line.scalingX = value;
                limit.line.scalingY = value;
                me.putMarker('circular-limit-lines', limit.line, i, true);
                if (limit.line.title) {
                    titles.createInstance(limit.line.title);
                    titleBBox = titles.getBBoxFor(titles.position - 1);
                    titles.setAttributesFor(titles.position - 1, {
                        x: attr.centerX,
                        y: attr.centerY - value - titleBBox.height / 2,
                        fillStyle: limit.line.title.fillStyle || limit.line.strokeStyle
                    });
                }
            }
        } else if (position === 'angular') {
            for (i = 0, ln = limits.length; i < ln; i++) {
                limit = chain(limits[i]);
                !limit.line && (limit.line = {});
                value = Ext.isString(limit.value) ? axis.getCoordFor(limit.value) : limit.value;
                value = value / (attr.max + 1) * Math.PI * 2 + attr.baseRotation;
                limit.line.translationX = attr.centerX;
                limit.line.translationY = attr.centerY;
                limit.line.rotationRads = value;
                limit.line.rotationCenterX = 0;
                limit.line.rotationCenterY = 0;
                limit.line.scalingX = attr.length;
                limit.line.scalingY = attr.length;
                me.putMarker('radial-limit-lines', limit.line, i, true);
                if (limit.line.title) {
                    titles.createInstance(limit.line.title);
                    titleBBox = titles.getBBoxFor(titles.position - 1);
                    titleFlip = ((value > -0.5 * Math.PI && value < 0.5 * Math.PI) || (value > 1.5 * Math.PI && value < 2 * Math.PI)) ? 1 : -1;
                    titles.setAttributesFor(titles.position - 1, {
                        x: attr.centerX + 0.5 * attr.length * Math.cos(value) + titleFlip * titleBBox.height / 2 * Math.sin(value),
                        y: attr.centerY + 0.5 * attr.length * Math.sin(value) - titleFlip * titleBBox.height / 2 * Math.cos(value),
                        rotationRads: titleFlip === 1 ? value : value - Math.PI,
                        fillStyle: limit.line.title.fillStyle || limit.line.strokeStyle
                    });
                }
            }
        } else if (position === 'gauge') {

        }
    },

    doThicknessChanged: function () {
        var axis = this.getAxis();
        if (axis) {
            axis.onThicknessChanged();
        }
    },

    render: function (surface, ctx, clipRect) {
        var me = this,
            layout = me.getLayoutContext();
        if (layout) {
            if (false === me.renderLabels(surface, ctx, layout, clipRect)) {
                return false;
            }
            ctx.beginPath();
            me.renderTicks(surface, ctx, layout, clipRect);
            me.renderAxisLine(surface, ctx, layout, clipRect);
            me.renderGridLines(surface, ctx, layout, clipRect);
            me.renderLimits();
            ctx.stroke();
        }
    }
});