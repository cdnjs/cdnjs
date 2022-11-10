/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import DataLabel from '../../Core/Series/DataLabel.js';
import H from '../../Core/Globals.js';
var noop = H.noop;
import R from '../../Core/Renderer/RendererUtilities.js';
var distribute = R.distribute;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var Series = SeriesRegistry.series;
import U from '../../Core/Utilities.js';
var arrayMax = U.arrayMax, clamp = U.clamp, defined = U.defined, merge = U.merge, pick = U.pick, relativeLength = U.relativeLength;
/* *
 *
 *  Composition
 *
 * */
var ColumnDataLabel;
(function (ColumnDataLabel) {
    /* *
     *
     *  Constants
     *
     * */
    var composedClasses = [];
    var dataLabelPositioners = {
        // Based on the value computed in Highcharts' distribute algorithm.
        radialDistributionY: function (point) {
            return point.top + point.distributeBox.pos;
        },
        // get the x - use the natural x position for labels near the
        // top and bottom, to prevent the top and botton slice
        // connectors from touching each other on either side
        // Based on the value computed in Highcharts' distribute algorithm.
        radialDistributionX: function (series, point, y, naturalY) {
            return series.getX(y < point.top + 2 || y > point.bottom - 2 ?
                naturalY :
                y, point.half, point);
        },
        // dataLabels.distance determines the x position of the label
        justify: function (point, radius, seriesCenter) {
            return seriesCenter[0] + (point.half ? -1 : 1) *
                (radius + point.labelDistance);
        },
        // Left edges of the left-half labels touch the left edge of the plot
        // area. Right edges of the right-half labels touch the right edge of
        // the plot area.
        alignToPlotEdges: function (dataLabel, half, plotWidth, plotLeft) {
            var dataLabelWidth = dataLabel.getBBox().width;
            return half ? dataLabelWidth + plotLeft :
                plotWidth - dataLabelWidth - plotLeft;
        },
        // Connectors of each side end in the same x position. Labels are
        // aligned to them. Left edge of the widest left-half label touches the
        // left edge of the plot area. Right edge of the widest right-half label
        // touches the right edge of the plot area.
        alignToConnectors: function (points, half, plotWidth, plotLeft) {
            var maxDataLabelWidth = 0, dataLabelWidth;
            // find widest data label
            points.forEach(function (point) {
                dataLabelWidth = point.dataLabel.getBBox().width;
                if (dataLabelWidth > maxDataLabelWidth) {
                    maxDataLabelWidth = dataLabelWidth;
                }
            });
            return half ? maxDataLabelWidth + plotLeft :
                plotWidth - maxDataLabelWidth - plotLeft;
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /** @private */
    function compose(PieSeriesClass) {
        DataLabel.compose(Series);
        if (composedClasses.indexOf(PieSeriesClass) === -1) {
            composedClasses.push(PieSeriesClass);
            var pieProto = PieSeriesClass.prototype;
            pieProto.dataLabelPositioners = dataLabelPositioners;
            pieProto.alignDataLabel = noop;
            pieProto.drawDataLabels = drawDataLabels;
            pieProto.placeDataLabels = placeDataLabels;
            pieProto.verifyDataLabelOverflow = verifyDataLabelOverflow;
        }
    }
    ColumnDataLabel.compose = compose;
    /**
     * Override the base drawDataLabels method by pie specific functionality
     * @private
     */
    function drawDataLabels() {
        var series = this, data = series.data, chart = series.chart, options = series.options.dataLabels || {}, connectorPadding = options.connectorPadding, plotWidth = chart.plotWidth, plotHeight = chart.plotHeight, plotLeft = chart.plotLeft, maxWidth = Math.round(chart.chartWidth / 3), seriesCenter = series.center, radius = seriesCenter[2] / 2, centerY = seriesCenter[1], halves = [
            [],
            [] // left
        ], overflow = [0, 0, 0, 0], // top, right, bottom, left
        dataLabelPositioners = series.dataLabelPositioners;
        var point, connectorWidth, connector, dataLabel, dataLabelWidth, 
        // labelPos,
        labelPosition, labelHeight, 
        // divide the points into right and left halves for anti collision
        x, y, visibility, j, pointDataLabelsOptions;
        // get out if not enabled
        if (!series.visible ||
            (!options.enabled &&
                !series._hasPointLabels)) {
            return;
        }
        // Reset all labels that have been shortened
        data.forEach(function (point) {
            if (point.dataLabel && point.visible && point.dataLabel.shortened) {
                point.dataLabel
                    .attr({
                    width: 'auto'
                }).css({
                    width: 'auto',
                    textOverflow: 'clip'
                });
                point.dataLabel.shortened = false;
            }
        });
        // run parent method
        Series.prototype.drawDataLabels.apply(series);
        data.forEach(function (point) {
            if (point.dataLabel) {
                if (point.visible) { // #407, #2510
                    // Arrange points for detection collision
                    halves[point.half].push(point);
                    // Reset positions (#4905)
                    point.dataLabel._pos = null;
                    // Avoid long labels squeezing the pie size too far down
                    if (!defined(options.style.width) &&
                        !defined(point.options.dataLabels &&
                            point.options.dataLabels.style &&
                            point.options.dataLabels.style.width)) {
                        if (point.dataLabel.getBBox().width > maxWidth) {
                            point.dataLabel.css({
                                // Use a fraction of the maxWidth to avoid
                                // wrapping close to the end of the string.
                                width: Math.round(maxWidth * 0.7) + 'px'
                            });
                            point.dataLabel.shortened = true;
                        }
                    }
                }
                else {
                    point.dataLabel = point.dataLabel.destroy();
                    // Workaround to make pies destroy multiple datalabels
                    // correctly. This logic needs rewriting to support multiple
                    // datalabels fully.
                    if (point.dataLabels && point.dataLabels.length === 1) {
                        delete point.dataLabels;
                    }
                }
            }
        });
        /* Loop over the points in each half, starting from the top and bottom
         * of the pie to detect overlapping labels.
         */
        halves.forEach(function (points, i) {
            var length = points.length, positions = [];
            var top, bottom, naturalY, sideOverflow, size, distributionLength;
            if (!length) {
                return;
            }
            // Sort by angle
            series.sortByAngle(points, i - 0.5);
            // Only do anti-collision when we have dataLabels outside the pie
            // and have connectors. (#856)
            if (series.maxLabelDistance > 0) {
                top = Math.max(0, centerY - radius - series.maxLabelDistance);
                bottom = Math.min(centerY + radius + series.maxLabelDistance, chart.plotHeight);
                points.forEach(function (point) {
                    // check if specific points' label is outside the pie
                    if (point.labelDistance > 0 && point.dataLabel) {
                        // point.top depends on point.labelDistance value
                        // Used for calculation of y value in getX method
                        point.top = Math.max(0, centerY - radius - point.labelDistance);
                        point.bottom = Math.min(centerY + radius + point.labelDistance, chart.plotHeight);
                        size = point.dataLabel.getBBox().height || 21;
                        // point.positionsIndex is needed for getting index of
                        // parameter related to specific point inside positions
                        // array - not every point is in positions array.
                        point.distributeBox = {
                            target: point.labelPosition.natural.y -
                                point.top + size / 2,
                            size: size,
                            rank: point.y
                        };
                        positions.push(point.distributeBox);
                    }
                });
                distributionLength = bottom + size - top;
                distribute(positions, distributionLength, distributionLength / 5);
            }
            // Now the used slots are sorted, fill them up sequentially
            for (j = 0; j < length; j++) {
                point = points[j];
                // labelPos = point.labelPos;
                labelPosition = point.labelPosition;
                dataLabel = point.dataLabel;
                visibility = point.visible === false ? 'hidden' : 'inherit';
                naturalY = labelPosition.natural.y;
                y = naturalY;
                if (positions && defined(point.distributeBox)) {
                    if (typeof point.distributeBox.pos === 'undefined') {
                        visibility = 'hidden';
                    }
                    else {
                        labelHeight = point.distributeBox.size;
                        // Find label's y position
                        y = dataLabelPositioners
                            .radialDistributionY(point);
                    }
                }
                // It is needed to delete point.positionIndex for
                // dynamically added points etc.
                delete point.positionIndex; // @todo unused
                // Find label's x position
                // justify is undocumented in the API - preserve support for it
                if (options.justify) {
                    x = dataLabelPositioners.justify(point, radius, seriesCenter);
                }
                else {
                    switch (options.alignTo) {
                        case 'connectors':
                            x = dataLabelPositioners.alignToConnectors(points, i, plotWidth, plotLeft);
                            break;
                        case 'plotEdges':
                            x = dataLabelPositioners.alignToPlotEdges(dataLabel, i, plotWidth, plotLeft);
                            break;
                        default:
                            x = dataLabelPositioners.radialDistributionX(series, point, y, naturalY);
                    }
                }
                // Record the placement and visibility
                dataLabel._attr = {
                    visibility: visibility,
                    align: labelPosition.alignment
                };
                pointDataLabelsOptions = point.options.dataLabels || {};
                dataLabel._pos = {
                    x: (x +
                        pick(pointDataLabelsOptions.x, options.x) + // (#12985)
                        ({
                            left: connectorPadding,
                            right: -connectorPadding
                        }[labelPosition.alignment] || 0)),
                    // 10 is for the baseline (label vs text)
                    y: (y +
                        pick(pointDataLabelsOptions.y, options.y) - // (#12985)
                        10)
                };
                // labelPos.x = x;
                // labelPos.y = y;
                labelPosition.final.x = x;
                labelPosition.final.y = y;
                // Detect overflowing data labels
                if (pick(options.crop, true)) {
                    dataLabelWidth = dataLabel.getBBox().width;
                    sideOverflow = null;
                    // Overflow left
                    if (x - dataLabelWidth < connectorPadding &&
                        i === 1 // left half
                    ) {
                        sideOverflow = Math.round(dataLabelWidth - x + connectorPadding);
                        overflow[3] = Math.max(sideOverflow, overflow[3]);
                        // Overflow right
                    }
                    else if (x + dataLabelWidth > plotWidth - connectorPadding &&
                        i === 0 // right half
                    ) {
                        sideOverflow = Math.round(x + dataLabelWidth - plotWidth + connectorPadding);
                        overflow[1] = Math.max(sideOverflow, overflow[1]);
                    }
                    // Overflow top
                    if (y - labelHeight / 2 < 0) {
                        overflow[0] = Math.max(Math.round(-y + labelHeight / 2), overflow[0]);
                        // Overflow left
                    }
                    else if (y + labelHeight / 2 > plotHeight) {
                        overflow[2] = Math.max(Math.round(y + labelHeight / 2 - plotHeight), overflow[2]);
                    }
                    dataLabel.sideOverflow = sideOverflow;
                }
            } // for each point
        }); // for each half
        // Do not apply the final placement and draw the connectors until we
        // have verified that labels are not spilling over.
        if (arrayMax(overflow) === 0 ||
            this.verifyDataLabelOverflow(overflow)) {
            // Place the labels in the final position
            this.placeDataLabels();
            this.points.forEach(function (point) {
                // #8864: every connector can have individual options
                pointDataLabelsOptions =
                    merge(options, point.options.dataLabels);
                connectorWidth =
                    pick(pointDataLabelsOptions.connectorWidth, 1);
                // Draw the connector
                if (connectorWidth) {
                    var isNew = void 0;
                    connector = point.connector;
                    dataLabel = point.dataLabel;
                    if (dataLabel &&
                        dataLabel._pos &&
                        point.visible &&
                        point.labelDistance > 0) {
                        visibility = dataLabel._attr.visibility;
                        isNew = !connector;
                        if (isNew) {
                            point.connector = connector = chart.renderer
                                .path()
                                .addClass('highcharts-data-label-connector ' +
                                ' highcharts-color-' + point.colorIndex +
                                (point.className ?
                                    ' ' + point.className :
                                    ''))
                                .add(series.dataLabelsGroup);
                            if (!chart.styledMode) {
                                connector.attr({
                                    'stroke-width': connectorWidth,
                                    'stroke': (pointDataLabelsOptions.connectorColor ||
                                        point.color ||
                                        "#666666" /* Palette.neutralColor60 */)
                                });
                            }
                        }
                        connector[isNew ? 'attr' : 'animate']({
                            d: point.getConnectorPath()
                        });
                        connector.attr('visibility', visibility);
                    }
                    else if (connector) {
                        point.connector = connector.destroy();
                    }
                }
            });
        }
    }
    /**
     * Perform the final placement of the data labels after we have verified
     * that they fall within the plot area.
     * @private
     */
    function placeDataLabels() {
        this.points.forEach(function (point) {
            var dataLabel = point.dataLabel, _pos;
            if (dataLabel && point.visible) {
                _pos = dataLabel._pos;
                if (_pos) {
                    // Shorten data labels with ellipsis if they still overflow
                    // after the pie has reached minSize (#223).
                    if (dataLabel.sideOverflow) {
                        dataLabel._attr.width =
                            Math.max(dataLabel.getBBox().width -
                                dataLabel.sideOverflow, 0);
                        dataLabel.css({
                            width: dataLabel._attr.width + 'px',
                            textOverflow: ((this.options.dataLabels.style || {})
                                .textOverflow ||
                                'ellipsis')
                        });
                        dataLabel.shortened = true;
                    }
                    dataLabel.attr(dataLabel._attr);
                    dataLabel[dataLabel.moved ? 'animate' : 'attr'](_pos);
                    dataLabel.moved = true;
                }
                else if (dataLabel) {
                    dataLabel.attr({ y: -9999 });
                }
            }
            // Clear for update
            delete point.distributeBox;
        }, this);
    }
    /**
     * Verify whether the data labels are allowed to draw, or we should run more
     * translation and data label positioning to keep them inside the plot area.
     * Returns true when data labels are ready to draw.
     * @private
     */
    function verifyDataLabelOverflow(overflow) {
        var center = this.center, options = this.options, centerOption = options.center, minSize = options.minSize || 80, newSize = minSize, 
        // If a size is set, return true and don't try to shrink the pie
        // to fit the labels.
        ret = options.size !== null;
        if (!ret) {
            // Handle horizontal size and center
            if (centerOption[0] !== null) { // Fixed center
                newSize = Math.max(center[2] -
                    Math.max(overflow[1], overflow[3]), minSize);
            }
            else { // Auto center
                newSize = Math.max(
                // horizontal overflow
                center[2] - overflow[1] - overflow[3], minSize);
                // horizontal center
                center[0] += (overflow[3] - overflow[1]) / 2;
            }
            // Handle vertical size and center
            if (centerOption[1] !== null) { // Fixed center
                newSize = clamp(newSize, minSize, center[2] - Math.max(overflow[0], overflow[2]));
            }
            else { // Auto center
                newSize = clamp(newSize, minSize, 
                // vertical overflow
                center[2] - overflow[0] - overflow[2]);
                // vertical center
                center[1] += (overflow[0] - overflow[2]) / 2;
            }
            // If the size must be decreased, we need to run translate and
            // drawDataLabels again
            if (newSize < center[2]) {
                center[2] = newSize;
                center[3] = Math.min(// #3632
                options.thickness ?
                    Math.max(0, newSize - options.thickness * 2) :
                    Math.max(0, relativeLength(options.innerSize || 0, newSize)), newSize); // #6647
                this.translate(center);
                if (this.drawDataLabels) {
                    this.drawDataLabels();
                }
                // Else, return true to indicate that the pie and its labels is
                // within the plot area
            }
            else {
                ret = true;
            }
        }
        return ret;
    }
})(ColumnDataLabel || (ColumnDataLabel = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ColumnDataLabel;
