/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import A from '../../Core/Animation/AnimationUtilities.js';
const { setAnimation } = A;
import Point from '../../Core/Series/Point.js';
import U from '../../Core/Utilities.js';
const { addEvent, defined, extend, isNumber, pick, relativeLength } = U;
/* *
 *
 *  Class
 *
 * */
class PiePoint extends Point {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Extendable method for getting the path of the connector between the
     * data label and the pie slice.
     * @private
     */
    getConnectorPath(dataLabel) {
        const labelPosition = dataLabel.dataLabelPosition, options = (dataLabel.options || {}), connectorShape = options.connectorShape, shapeFunc = (this.connectorShapes[connectorShape] || connectorShape);
        return labelPosition && shapeFunc.call(this, {
            // Pass simplified label position object for user's convenience
            ...labelPosition.computed,
            alignment: labelPosition.alignment
        }, labelPosition.connectorPosition, options) || [];
    }
    /**
     * @private
     */
    getTranslate() {
        return this.sliced && this.slicedTranslation || {
            translateX: 0,
            translateY: 0
        };
    }
    /**
     * @private
     */
    haloPath(size) {
        const shapeArgs = this.shapeArgs;
        return this.sliced || !this.visible ?
            [] :
            this.series.chart.renderer.symbols.arc(shapeArgs.x, shapeArgs.y, shapeArgs.r + size, shapeArgs.r + size, {
                // Substract 1px to ensure the background is not bleeding
                // through between the halo and the slice (#7495).
                innerR: shapeArgs.r - 1,
                start: shapeArgs.start,
                end: shapeArgs.end,
                borderRadius: shapeArgs.borderRadius
            });
    }
    /**
     * Initialize the pie slice.
     * @private
     */
    constructor(series, options, x) {
        super(series, options, x);
        this.half = 0;
        this.name ?? (this.name = 'Slice');
        // Add event listener for select
        const toggleSlice = (e) => {
            this.slice(e.type === 'select');
        };
        addEvent(this, 'select', toggleSlice);
        addEvent(this, 'unselect', toggleSlice);
    }
    /**
     * Negative points are not valid (#1530, #3623, #5322)
     * @private
     */
    isValid() {
        return isNumber(this.y) && this.y >= 0;
    }
    /**
     * Toggle the visibility of a pie slice or other data point. Note that this
     * method is available only for some series, like pie, treemap and sunburst.
     *
     * @function Highcharts.Point#setVisible
     *
     * @param {boolean} [vis]
     * True to show the pie slice or other data point, false to hide. If
     * undefined, the visibility is toggled.
     *
     * @param {boolean} [redraw] Whether to redraw the chart after the point is
     * altered. If doing more operations on the chart, it is a good idea to set
     * redraw to false and call {@link Chart#redraw|chart.redraw()} after.
     *
     */
    setVisible(vis, redraw = true) {
        if (vis !== this.visible) {
            // If called without an argument, toggle visibility
            this.update({
                visible: vis ?? !this.visible
            }, redraw, void 0, false);
        }
    }
    /**
     * Set or toggle whether the slice is cut out from the pie.
     * @private
     *
     * @param {boolean} sliced
     * When undefined, the slice state is toggled.
     *
     * @param {boolean} [redraw]
     * Whether to redraw the chart. True by default.
     *
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
     * Animation options.
     */
    slice(sliced, redraw, animation) {
        const series = this.series, chart = series.chart;
        setAnimation(animation, chart);
        // Redraw is true by default
        redraw = pick(redraw, true);
        /**
         * Pie series only. Whether to display a slice offset from the
         * center.
         * @name Highcharts.Point#sliced
         * @type {boolean|undefined}
         */
        // if called without an argument, toggle
        this.sliced = this.options.sliced = sliced =
            defined(sliced) ? sliced : !this.sliced;
        // Update userOptions.data
        series.options.data[series.data.indexOf(this)] =
            this.options;
        if (this.graphic) {
            this.graphic.animate(this.getTranslate());
        }
    }
}
extend(PiePoint.prototype, {
    connectorShapes: {
        // Only one available before v7.0.0
        fixedOffset: function (labelPosition, connectorPosition, options) {
            const breakAt = connectorPosition.breakAt, touchingSliceAt = connectorPosition.touchingSliceAt, lineSegment = options.softConnector ? [
                'C',
                // 1st control point (of the curve)
                labelPosition.x +
                    // 5 gives the connector a little horizontal bend
                    (labelPosition.alignment === 'left' ? -5 : 5),
                labelPosition.y,
                2 * breakAt.x - touchingSliceAt.x,
                2 * breakAt.y - touchingSliceAt.y,
                breakAt.x,
                breakAt.y //
            ] : [
                'L',
                breakAt.x,
                breakAt.y
            ];
            // Assemble the path
            return ([
                ['M', labelPosition.x, labelPosition.y],
                lineSegment,
                ['L', touchingSliceAt.x, touchingSliceAt.y]
            ]);
        },
        straight: function (labelPosition, connectorPosition) {
            const touchingSliceAt = connectorPosition.touchingSliceAt;
            // Direct line to the slice
            return [
                ['M', labelPosition.x, labelPosition.y],
                ['L', touchingSliceAt.x, touchingSliceAt.y]
            ];
        },
        crookedLine: function (labelPosition, connectorPosition, options) {
            const { breakAt, touchingSliceAt } = connectorPosition, { series } = this, [cx, cy, diameter] = series.center, r = diameter / 2, { plotLeft, plotWidth } = series.chart, leftAligned = labelPosition.alignment === 'left', { x, y } = labelPosition;
            let crookX = breakAt.x;
            if (options.crookDistance) {
                const crookDistance = relativeLength(// % to fraction
                options.crookDistance, 1);
                crookX = leftAligned ?
                    cx +
                        r +
                        (plotWidth + plotLeft - cx - r) * (1 - crookDistance) :
                    plotLeft + (cx - r) * crookDistance;
                // When the crookDistance option is undefined, make the bend in the
                // intersection between the radial line in the middle of the slice,
                // and the extension of the label position.
            }
            else {
                crookX = cx + (cy - y) * Math.tan((this.angle || 0) - Math.PI / 2);
            }
            const path = [['M', x, y]];
            // The crookedLine formula doesn't make sense if the path overlaps
            // the label - use straight line instead in that case
            if (leftAligned ?
                (crookX <= x && crookX >= breakAt.x) :
                (crookX >= x && crookX <= breakAt.x)) {
                path.push(['L', crookX, y]);
            }
            path.push(['L', breakAt.x, breakAt.y], ['L', touchingSliceAt.x, touchingSliceAt.y]);
            return path;
        }
    }
});
/* *
 *
 *  Default Export
 *
 * */
export default PiePoint;
