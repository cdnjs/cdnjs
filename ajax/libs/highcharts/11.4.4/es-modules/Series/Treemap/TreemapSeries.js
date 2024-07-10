/* *
 *
 *  (c) 2014-2024 Highsoft AS
 *
 *  Authors: Jon Arild Nygard / Oystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Breadcrumbs from '../../Extensions/Breadcrumbs/Breadcrumbs.js';
import Color from '../../Core/Color/Color.js';
const { parse: color } = Color;
import ColorMapComposition from '../ColorMapComposition.js';
import H from '../../Core/Globals.js';
const { composed, noop } = H;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { column: ColumnSeries, scatter: ScatterSeries } = SeriesRegistry.seriesTypes;
import TreemapAlgorithmGroup from './TreemapAlgorithmGroup.js';
import TreemapNode from './TreemapNode.js';
import TreemapPoint from './TreemapPoint.js';
import TreemapSeriesDefaults from './TreemapSeriesDefaults.js';
import TreemapUtilities from './TreemapUtilities.js';
import TU from '../TreeUtilities.js';
const { getColor, getLevelOptions, updateRootId } = TU;
import U from '../../Core/Utilities.js';
const { addEvent, correctFloat, crisp, defined, error, extend, fireEvent, isArray, isObject, isString, merge, pick, pushUnique, stableSort } = U;
/* *
 *
 *  Constants
 *
 * */
const axisMax = 100;
/* *
 *
 *  Variables
 *
 * */
let treemapAxisDefaultValues = false;
/* *
 *
 *  Functions
 *
 * */
/** @private */
function onSeriesAfterBindAxes() {
    const series = this, xAxis = series.xAxis, yAxis = series.yAxis;
    let treeAxis;
    if (xAxis && yAxis) {
        if (series.is('treemap')) {
            treeAxis = {
                endOnTick: false,
                gridLineWidth: 0,
                lineWidth: 0,
                min: 0,
                minPadding: 0,
                max: axisMax,
                maxPadding: 0,
                startOnTick: false,
                title: void 0,
                tickPositions: []
            };
            extend(yAxis.options, treeAxis);
            extend(xAxis.options, treeAxis);
            treemapAxisDefaultValues = true;
        }
        else if (treemapAxisDefaultValues) {
            yAxis.setOptions(yAxis.userOptions);
            xAxis.setOptions(xAxis.userOptions);
            treemapAxisDefaultValues = false;
        }
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.treemap
 *
 * @augments Highcharts.Series
 */
class TreemapSeries extends ScatterSeries {
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(SeriesClass) {
        if (pushUnique(composed, 'TreemapSeries')) {
            addEvent(SeriesClass, 'afterBindAxes', onSeriesAfterBindAxes);
        }
    }
    /* *
     *
     *  Function
     *
     * */
    /* eslint-disable valid-jsdoc */
    algorithmCalcPoints(directionChange, last, group, childrenArea) {
        const plot = group.plot, end = group.elArr.length - 1;
        let pX, pY, pW, pH, gW = group.lW, gH = group.lH, keep, i = 0;
        if (last) {
            gW = group.nW;
            gH = group.nH;
        }
        else {
            keep = group.elArr[end];
        }
        for (const p of group.elArr) {
            if (last || (i < end)) {
                if (group.direction === 0) {
                    pX = plot.x;
                    pY = plot.y;
                    pW = gW;
                    pH = p / pW;
                }
                else {
                    pX = plot.x;
                    pY = plot.y;
                    pH = gH;
                    pW = p / pH;
                }
                childrenArea.push({
                    x: pX,
                    y: pY,
                    width: pW,
                    height: correctFloat(pH)
                });
                if (group.direction === 0) {
                    plot.y = plot.y + pH;
                }
                else {
                    plot.x = plot.x + pW;
                }
            }
            i = i + 1;
        }
        // Reset variables
        group.reset();
        if (group.direction === 0) {
            group.width = group.width - gW;
        }
        else {
            group.height = group.height - gH;
        }
        plot.y = plot.parent.y + (plot.parent.height - group.height);
        plot.x = plot.parent.x + (plot.parent.width - group.width);
        if (directionChange) {
            group.direction = 1 - group.direction;
        }
        // If not last, then add uncalculated element
        if (!last) {
            group.addElement(keep);
        }
    }
    algorithmFill(directionChange, parent, children) {
        const childrenArea = [];
        let pTot, direction = parent.direction, x = parent.x, y = parent.y, width = parent.width, height = parent.height, pX, pY, pW, pH;
        for (const child of children) {
            pTot =
                (parent.width * parent.height) * (child.val / parent.val);
            pX = x;
            pY = y;
            if (direction === 0) {
                pH = height;
                pW = pTot / pH;
                width = width - pW;
                x = x + pW;
            }
            else {
                pW = width;
                pH = pTot / pW;
                height = height - pH;
                y = y + pH;
            }
            childrenArea.push({
                x: pX,
                y: pY,
                width: pW,
                height: pH
            });
            if (directionChange) {
                direction = 1 - direction;
            }
        }
        return childrenArea;
    }
    algorithmLowAspectRatio(directionChange, parent, children) {
        const series = this, childrenArea = [], plot = {
            x: parent.x,
            y: parent.y,
            parent: parent
        }, direction = parent.direction, end = children.length - 1, group = new TreemapAlgorithmGroup(parent.height, parent.width, direction, plot);
        let pTot, i = 0;
        // Loop through and calculate all areas
        for (const child of children) {
            pTot =
                (parent.width * parent.height) * (child.val / parent.val);
            group.addElement(pTot);
            if (group.lP.nR > group.lP.lR) {
                series.algorithmCalcPoints(directionChange, false, group, childrenArea, plot // @todo no supported
                );
            }
            // If last child, then calculate all remaining areas
            if (i === end) {
                series.algorithmCalcPoints(directionChange, true, group, childrenArea, plot // @todo not supported
                );
            }
            ++i;
        }
        return childrenArea;
    }
    /**
     * Over the alignment method by setting z index.
     * @private
     */
    alignDataLabel(point, dataLabel, labelOptions) {
        const style = labelOptions.style;
        // #8160: Prevent the label from exceeding the point's
        // boundaries in treemaps by applying ellipsis overflow.
        // The issue was happening when datalabel's text contained a
        // long sequence of characters without a whitespace.
        if (style &&
            !defined(style.textOverflow) &&
            dataLabel.text &&
            dataLabel.getBBox().width > (dataLabel.text.textWidth || 0)) {
            dataLabel.css({
                textOverflow: 'ellipsis',
                // Unit (px) is required when useHTML is true
                width: style.width += 'px'
            });
        }
        ColumnSeries.prototype.alignDataLabel.apply(this, arguments);
        if (point.dataLabel) {
            // `point.node.zIndex` could be undefined (#6956)
            point.dataLabel.attr({ zIndex: (point.node.zIndex || 0) + 1 });
        }
    }
    /**
     * Recursive function which calculates the area for all children of a
     * node.
     *
     * @private
     * @function Highcharts.Series#calculateChildrenAreas
     *
     * @param {Object} parent
     * The node which is parent to the children.
     *
     * @param {Object} area
     * The rectangular area of the parent.
     */
    calculateChildrenAreas(parent, area) {
        const series = this, options = series.options, mapOptionsToLevel = series.mapOptionsToLevel, level = mapOptionsToLevel[parent.level + 1], algorithm = pick((series[(level && level.layoutAlgorithm)] &&
            level.layoutAlgorithm), options.layoutAlgorithm), alternate = options.alternateStartingDirection, 
        // Collect all children which should be included
        children = parent.children.filter((n) => !n.ignore);
        let childrenValues = [];
        if (level && level.layoutStartingDirection) {
            area.direction = level.layoutStartingDirection === 'vertical' ?
                0 :
                1;
        }
        childrenValues = series[algorithm](area, children);
        let i = -1;
        for (const child of children) {
            const values = childrenValues[++i];
            child.values = merge(values, {
                val: child.childrenTotal,
                direction: (alternate ? 1 - area.direction : area.direction)
            });
            child.pointValues = merge(values, {
                x: (values.x / series.axisRatio),
                // Flip y-values to avoid visual regression with csvCoord in
                // Axis.translate at setPointValues. #12488
                y: axisMax - values.y - values.height,
                width: (values.width / series.axisRatio)
            });
            // If node has children, then call method recursively
            if (child.children.length) {
                series.calculateChildrenAreas(child, child.values);
            }
        }
    }
    /**
     * Create level list.
     * @private
     */
    createList(e) {
        const chart = this.chart, breadcrumbs = chart.breadcrumbs, list = [];
        if (breadcrumbs) {
            let currentLevelNumber = 0;
            list.push({
                level: currentLevelNumber,
                levelOptions: chart.series[0]
            });
            let node = e.target.nodeMap[e.newRootId];
            const extraNodes = [];
            // When the root node is set and has parent,
            // recreate the path from the node tree.
            while (node.parent || node.parent === '') {
                extraNodes.push(node);
                node = e.target.nodeMap[node.parent];
            }
            for (const node of extraNodes.reverse()) {
                list.push({
                    level: ++currentLevelNumber,
                    levelOptions: node
                });
            }
            // If the list has only first element, we should clear it
            if (list.length <= 1) {
                list.length = 0;
            }
        }
        return list;
    }
    /**
     * Extend drawDataLabels with logic to handle custom options related to
     * the treemap series:
     *
     * - Points which is not a leaf node, has dataLabels disabled by
     *   default.
     *
     * - Options set on series.levels is merged in.
     *
     * - Width of the dataLabel is set to match the width of the point
     *   shape.
     *
     * @private
     */
    drawDataLabels() {
        const series = this, mapOptionsToLevel = series.mapOptionsToLevel, points = series.points.filter(function (n) {
            return n.node.visible;
        });
        let options, level;
        for (const point of points) {
            level = mapOptionsToLevel[point.node.level];
            // Set options to new object to avoid problems with scope
            options = { style: {} };
            // If not a leaf, then label should be disabled as default
            if (!point.node.isLeaf) {
                options.enabled = false;
            }
            // If options for level exists, include them as well
            if (level && level.dataLabels) {
                options = merge(options, level.dataLabels);
                series.hasDataLabels = () => true;
            }
            // Set dataLabel width to the width of the point shape.
            if (point.shapeArgs) {
                options.style.width = point.shapeArgs.width;
                if (point.dataLabel) {
                    point.dataLabel.css({
                        width: point.shapeArgs.width + 'px'
                    });
                }
            }
            // Merge custom options with point options
            point.dlOptions = merge(options, point.options.dataLabels);
        }
        super.drawDataLabels();
    }
    /**
     * Override drawPoints
     * @private
     */
    drawPoints(points = this.points) {
        const series = this, chart = series.chart, renderer = chart.renderer, styledMode = chart.styledMode, options = series.options, shadow = styledMode ? {} : options.shadow, borderRadius = options.borderRadius, withinAnimationLimit = chart.pointCount < options.animationLimit, allowTraversingTree = options.allowTraversingTree;
        for (const point of points) {
            const levelDynamic = point.node.levelDynamic, animatableAttribs = {}, attribs = {}, css = {}, groupKey = 'level-group-' + point.node.level, hasGraphic = !!point.graphic, shouldAnimate = withinAnimationLimit && hasGraphic, shapeArgs = point.shapeArgs;
            // Don't bother with calculate styling if the point is not drawn
            if (point.shouldDraw()) {
                point.isInside = true;
                if (borderRadius) {
                    attribs.r = borderRadius;
                }
                merge(true, // Extend object
                // Which object to extend
                shouldAnimate ? animatableAttribs : attribs, 
                // Add shapeArgs to animate/attr if graphic exists
                hasGraphic ? shapeArgs : {}, 
                // Add style attribs if !styleMode
                styledMode ?
                    {} :
                    series.pointAttribs(point, point.selected ? 'select' : void 0));
                // In styled mode apply point.color. Use CSS, otherwise the
                // fill used in the style sheet will take precedence over
                // the fill attribute.
                if (series.colorAttribs && styledMode) {
                    // Heatmap is loaded
                    extend(css, series.colorAttribs(point));
                }
                if (!series[groupKey]) {
                    series[groupKey] = renderer.g(groupKey)
                        .attr({
                        // @todo Set the zIndex based upon the number of
                        // levels, instead of using 1000
                        zIndex: 1000 - (levelDynamic || 0)
                    })
                        .add(series.group);
                    series[groupKey].survive = true;
                }
            }
            // Draw the point
            point.draw({
                animatableAttribs,
                attribs,
                css,
                group: series[groupKey],
                imageUrl: point.imageUrl,
                renderer,
                shadow,
                shapeArgs,
                shapeType: point.shapeType
            });
            // If setRootNode is allowed, set a point cursor on clickables &
            // add drillId to point
            if (allowTraversingTree && point.graphic) {
                point.drillId = options.interactByLeaf ?
                    series.drillToByLeaf(point) :
                    series.drillToByGroup(point);
            }
        }
    }
    /**
     * Finds the drill id for a parent node. Returns false if point should
     * not have a click event.
     * @private
     */
    drillToByGroup(point) {
        let drillId = false;
        if (!point.node.isLeaf &&
            (point.node.level - this.nodeMap[this.rootNode].level) === 1) {
            drillId = point.id;
        }
        return drillId;
    }
    /**
     * Finds the drill id for a leaf node. Returns false if point should not
     * have a click event
     * @private
     */
    drillToByLeaf(point) {
        const { traverseToLeaf } = point.series.options;
        let drillId = false, nodeParent;
        if ((point.node.parent !== this.rootNode) &&
            point.node.isLeaf) {
            if (traverseToLeaf) {
                drillId = point.id;
            }
            else {
                nodeParent = point.node;
                while (!drillId) {
                    if (typeof nodeParent.parent !== 'undefined') {
                        nodeParent = this.nodeMap[nodeParent.parent];
                    }
                    if (nodeParent.parent === this.rootNode) {
                        drillId = nodeParent.id;
                    }
                }
            }
        }
        return drillId;
    }
    /**
     * @todo remove this function at a suitable version.
     * @private
     */
    drillToNode(id, redraw) {
        error(32, false, void 0, { 'treemap.drillToNode': 'use treemap.setRootNode' });
        this.setRootNode(id, redraw);
    }
    drillUp() {
        const series = this, node = series.nodeMap[series.rootNode];
        if (node && isString(node.parent)) {
            series.setRootNode(node.parent, true, { trigger: 'traverseUpButton' });
        }
    }
    getExtremes() {
        // Get the extremes from the value data
        const { dataMin, dataMax } = super.getExtremes(this.colorValueData);
        this.valueMin = dataMin;
        this.valueMax = dataMax;
        // Get the extremes from the y data
        return super.getExtremes();
    }
    /**
     * Creates an object map from parent id to childrens index.
     *
     * @private
     * @function Highcharts.Series#getListOfParents
     *
     * @param {Highcharts.SeriesTreemapDataOptions} [data]
     *        List of points set in options.
     *
     * @param {Array<string>} [existingIds]
     *        List of all point ids.
     *
     * @return {Object}
     *         Map from parent id to children index in data.
     */
    getListOfParents(data, existingIds) {
        const arr = isArray(data) ? data : [], ids = isArray(existingIds) ? existingIds : [], listOfParents = arr.reduce(function (prev, curr, i) {
            const parent = pick(curr.parent, '');
            if (typeof prev[parent] === 'undefined') {
                prev[parent] = [];
            }
            prev[parent].push(i);
            return prev;
        }, {
            '': [] // Root of tree
        });
        // If parent does not exist, hoist parent to root of tree.
        for (const parent of Object.keys(listOfParents)) {
            const children = listOfParents[parent];
            if ((parent !== '') && (ids.indexOf(parent) === -1)) {
                for (const child of children) {
                    listOfParents[''].push(child);
                }
                delete listOfParents[parent];
            }
        }
        return listOfParents;
    }
    /**
     * Creates a tree structured object from the series points.
     * @private
     */
    getTree() {
        const series = this, allIds = this.data.map(function (d) {
            return d.id;
        }), parentList = series.getListOfParents(this.data, allIds);
        series.nodeMap = {};
        series.nodeList = [];
        return series.buildTree('', -1, 0, parentList);
    }
    buildTree(id, index, level, list, parent) {
        const series = this, children = [], point = series.points[index];
        let height = 0, child;
        // Actions
        for (const i of (list[id] || [])) {
            child = series.buildTree(series.points[i].id, i, level + 1, list, id);
            height = Math.max(child.height + 1, height);
            children.push(child);
        }
        const node = new series.NodeClass().init(id, index, children, height, level, series, parent);
        for (const child of children) {
            child.parentNode = node;
        }
        series.nodeMap[node.id] = node;
        series.nodeList.push(node);
        if (point) {
            point.node = node;
            node.point = point;
        }
        return node;
    }
    /**
     * Define hasData function for non-cartesian series. Returns true if the
     * series has points at all.
     * @private
     */
    hasData() {
        return !!this.processedXData.length; // != 0
    }
    init(chart, options) {
        const series = this, breadcrumbsOptions = merge(options.drillUpButton, options.breadcrumbs), setOptionsEvent = addEvent(series, 'setOptions', (event) => {
            const options = event.userOptions;
            if (defined(options.allowDrillToNode) &&
                !defined(options.allowTraversingTree)) {
                options.allowTraversingTree = options.allowDrillToNode;
                delete options.allowDrillToNode;
            }
            if (defined(options.drillUpButton) &&
                !defined(options.traverseUpButton)) {
                options.traverseUpButton = options.drillUpButton;
                delete options.drillUpButton;
            }
        });
        super.init(chart, options);
        // Treemap's opacity is a different option from other series
        delete series.opacity;
        // Handle deprecated options.
        series.eventsToUnbind.push(setOptionsEvent);
        if (series.options.allowTraversingTree) {
            series.eventsToUnbind.push(addEvent(series, 'click', series.onClickDrillToNode));
            series.eventsToUnbind.push(addEvent(series, 'setRootNode', function (e) {
                const chart = series.chart;
                if (chart.breadcrumbs) {
                    // Create a list using the event after drilldown.
                    chart.breadcrumbs.updateProperties(series.createList(e));
                }
            }));
            series.eventsToUnbind.push(addEvent(series, 'update', 
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            function (e, redraw) {
                const breadcrumbs = this.chart.breadcrumbs;
                if (breadcrumbs && e.options.breadcrumbs) {
                    breadcrumbs.update(e.options.breadcrumbs);
                }
            }));
            series.eventsToUnbind.push(addEvent(series, 'destroy', function destroyEvents(e) {
                const chart = this.chart;
                if (chart.breadcrumbs && !e.keepEventsForUpdate) {
                    chart.breadcrumbs.destroy();
                    chart.breadcrumbs = void 0;
                }
            }));
        }
        if (!chart.breadcrumbs) {
            chart.breadcrumbs = new Breadcrumbs(chart, breadcrumbsOptions);
        }
        series.eventsToUnbind.push(addEvent(chart.breadcrumbs, 'up', function (e) {
            const drillUpsNumber = this.level - e.newLevel;
            for (let i = 0; i < drillUpsNumber; i++) {
                series.drillUp();
            }
        }));
    }
    /**
     * Add drilling on the suitable points.
     * @private
     */
    onClickDrillToNode(event) {
        const series = this, point = event.point, drillId = point && point.drillId;
        // If a drill id is returned, add click event and cursor.
        if (isString(drillId)) {
            point.setState(''); // Remove hover
            series.setRootNode(drillId, true, { trigger: 'click' });
        }
    }
    /**
     * Get presentational attributes
     * @private
     */
    pointAttribs(point, state) {
        const series = this, mapOptionsToLevel = (isObject(series.mapOptionsToLevel) ?
            series.mapOptionsToLevel :
            {}), level = point && mapOptionsToLevel[point.node.level] || {}, options = this.options, stateOptions = state && options.states && options.states[state] || {}, className = (point && point.getClassName()) || '', 
        // Set attributes by precedence. Point trumps level trumps series.
        // Stroke width uses pick because it can be 0.
        attr = {
            'stroke': (point && point.borderColor) ||
                level.borderColor ||
                stateOptions.borderColor ||
                options.borderColor,
            'stroke-width': pick(point && point.borderWidth, level.borderWidth, stateOptions.borderWidth, options.borderWidth),
            'dashstyle': (point && point.borderDashStyle) ||
                level.borderDashStyle ||
                stateOptions.borderDashStyle ||
                options.borderDashStyle,
            'fill': (point && point.color) || this.color
        };
        let opacity;
        // Hide levels above the current view
        if (className.indexOf('highcharts-above-level') !== -1) {
            attr.fill = 'none';
            attr['stroke-width'] = 0;
            // Nodes with children that accept interaction
        }
        else if (className.indexOf('highcharts-internal-node-interactive') !== -1) {
            opacity = pick(stateOptions.opacity, options.opacity);
            attr.fill = color(attr.fill).setOpacity(opacity).get();
            attr.cursor = 'pointer';
            // Hide nodes that have children
        }
        else if (className.indexOf('highcharts-internal-node') !== -1) {
            attr.fill = 'none';
        }
        else if (state) {
            // Brighten and hoist the hover nodes
            attr.fill = color(attr.fill)
                .brighten(stateOptions.brightness)
                .get();
        }
        return attr;
    }
    /**
     * Set the node's color recursively, from the parent down.
     * @private
     */
    setColorRecursive(node, parentColor, colorIndex, index, siblings) {
        const series = this, chart = series && series.chart, colors = chart && chart.options && chart.options.colors;
        if (node) {
            const colorInfo = getColor(node, {
                colors: colors,
                index: index,
                mapOptionsToLevel: series.mapOptionsToLevel,
                parentColor: parentColor,
                parentColorIndex: colorIndex,
                series: series,
                siblings: siblings
            }), point = series.points[node.i];
            if (point) {
                point.color = colorInfo.color;
                point.colorIndex = colorInfo.colorIndex;
            }
            let i = -1;
            // Do it all again with the children
            for (const child of (node.children || [])) {
                series.setColorRecursive(child, colorInfo.color, colorInfo.colorIndex, ++i, node.children.length);
            }
        }
    }
    setPointValues() {
        const series = this;
        const { points, xAxis, yAxis } = series;
        const styledMode = series.chart.styledMode;
        // Get the crisp correction in classic mode. For this to work in
        // styled mode, we would need to first add the shape (without x,
        // y, width and height), then read the rendered stroke width
        // using point.graphic.strokeWidth(), then modify and apply the
        // shapeArgs. This applies also to column series, but the
        // downside is performance and code complexity.
        const getStrokeWidth = (point) => (styledMode ?
            0 :
            (series.pointAttribs(point)['stroke-width'] || 0));
        for (const point of points) {
            const { pointValues: values, visible } = point.node;
            // Points which is ignored, have no values.
            if (values && visible) {
                const { height, width, x, y } = values;
                const strokeWidth = getStrokeWidth(point);
                const x1 = crisp(xAxis.toPixels(x, true), strokeWidth, true);
                const x2 = crisp(xAxis.toPixels(x + width, true), strokeWidth, true);
                const y1 = crisp(yAxis.toPixels(y, true), strokeWidth, true);
                const y2 = crisp(yAxis.toPixels(y + height, true), strokeWidth, true);
                // Set point values
                const shapeArgs = {
                    x: Math.min(x1, x2),
                    y: Math.min(y1, y2),
                    width: Math.abs(x2 - x1),
                    height: Math.abs(y2 - y1)
                };
                point.plotX = shapeArgs.x + (shapeArgs.width / 2);
                point.plotY = shapeArgs.y + (shapeArgs.height / 2);
                point.shapeArgs = shapeArgs;
            }
            else {
                // Reset visibility
                delete point.plotX;
                delete point.plotY;
            }
        }
    }
    /**
     * Sets a new root node for the series.
     *
     * @private
     * @function Highcharts.Series#setRootNode
     *
     * @param {string} id
     * The id of the new root node.
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart or not.
     *
     * @param {Object} [eventArguments]
     * Arguments to be accessed in event handler.
     *
     * @param {string} [eventArguments.newRootId]
     * Id of the new root.
     *
     * @param {string} [eventArguments.previousRootId]
     * Id of the previous root.
     *
     * @param {boolean} [eventArguments.redraw]
     * Whether to redraw the chart after.
     *
     * @param {Object} [eventArguments.series]
     * The series to update the root of.
     *
     * @param {string} [eventArguments.trigger]
     * The action which triggered the event. Undefined if the setRootNode is
     * called directly.
     *
     * @emits Highcharts.Series#event:setRootNode
     */
    setRootNode(id, redraw, eventArguments) {
        const series = this, eventArgs = extend({
            newRootId: id,
            previousRootId: series.rootNode,
            redraw: pick(redraw, true),
            series: series
        }, eventArguments);
        /**
         * The default functionality of the setRootNode event.
         *
         * @private
         * @param {Object} args The event arguments.
         * @param {string} args.newRootId Id of the new root.
         * @param {string} args.previousRootId Id of the previous root.
         * @param {boolean} args.redraw Whether to redraw the chart after.
         * @param {Object} args.series The series to update the root of.
         * @param {string} [args.trigger=undefined] The action which
         * triggered the event. Undefined if the setRootNode is called
         * directly.
             */
        const defaultFn = function (args) {
            const series = args.series;
            // Store previous and new root ids on the series.
            series.idPreviousRoot = args.previousRootId;
            series.rootNode = args.newRootId;
            // Redraw the chart
            series.isDirty = true; // Force redraw
            if (args.redraw) {
                series.chart.redraw();
            }
        };
        // Fire setRootNode event.
        fireEvent(series, 'setRootNode', eventArgs, defaultFn);
    }
    /**
     * Workaround for `inactive` state. Since `series.opacity` option is
     * already reserved, don't use that state at all by disabling
     * `inactiveOtherPoints` and not inheriting states by points.
     * @private
     */
    setState(state) {
        this.options.inactiveOtherPoints = true;
        super.setState(state, false);
        this.options.inactiveOtherPoints = false;
    }
    setTreeValues(tree) {
        const series = this, options = series.options, idRoot = series.rootNode, mapIdToNode = series.nodeMap, nodeRoot = mapIdToNode[idRoot], levelIsConstant = (typeof options.levelIsConstant === 'boolean' ?
            options.levelIsConstant :
            true), children = [], point = series.points[tree.i];
        // First give the children some values
        let childrenTotal = 0;
        for (let child of tree.children) {
            child = series.setTreeValues(child);
            children.push(child);
            if (!child.ignore) {
                childrenTotal += child.val;
            }
        }
        // Sort the children
        stableSort(children, (a, b) => ((a.sortIndex || 0) - (b.sortIndex || 0)));
        // Set the values
        const val = pick(point && point.options.value, childrenTotal);
        if (point) {
            point.value = val;
        }
        extend(tree, {
            children: children,
            childrenTotal: childrenTotal,
            // Ignore this node if point is not visible
            ignore: !(pick(point && point.visible, true) && (val > 0)),
            isLeaf: tree.visible && !childrenTotal,
            levelDynamic: (tree.level - (levelIsConstant ? 0 : nodeRoot.level)),
            name: pick(point && point.name, ''),
            sortIndex: pick(point && point.sortIndex, -val),
            val: val
        });
        return tree;
    }
    sliceAndDice(parent, children) {
        return this.algorithmFill(true, parent, children);
    }
    squarified(parent, children) {
        return this.algorithmLowAspectRatio(true, parent, children);
    }
    strip(parent, children) {
        return this.algorithmLowAspectRatio(false, parent, children);
    }
    stripes(parent, children) {
        return this.algorithmFill(false, parent, children);
    }
    translate() {
        const series = this, options = series.options;
        let // NOTE: updateRootId modifies series.
        rootId = updateRootId(series), rootNode, pointValues, seriesArea, val;
        // Call prototype function
        super.translate();
        // @todo Only if series.isDirtyData is true
        const tree = series.tree = series.getTree();
        rootNode = series.nodeMap[rootId];
        if (rootId !== '' &&
            (!rootNode)) {
            series.setRootNode('', false);
            rootId = series.rootNode;
            rootNode = series.nodeMap[rootId];
        }
        series.mapOptionsToLevel = getLevelOptions({
            from: rootNode.level + 1,
            levels: options.levels,
            to: tree.height,
            defaults: {
                levelIsConstant: series.options.levelIsConstant,
                colorByPoint: options.colorByPoint
            }
        });
        // Parents of the root node is by default visible
        TreemapUtilities.recursive(series.nodeMap[series.rootNode], (node) => {
            const p = node.parent;
            let next = false;
            node.visible = true;
            if (p || p === '') {
                next = series.nodeMap[p];
            }
            return next;
        });
        // Children of the root node is by default visible
        TreemapUtilities.recursive(series.nodeMap[series.rootNode].children, (children) => {
            let next = false;
            for (const child of children) {
                child.visible = true;
                if (child.children.length) {
                    next = (next || []).concat(child.children);
                }
            }
            return next;
        });
        series.setTreeValues(tree);
        // Calculate plotting values.
        series.axisRatio = (series.xAxis.len / series.yAxis.len);
        series.nodeMap[''].pointValues = pointValues = {
            x: 0,
            y: 0,
            width: axisMax,
            height: axisMax
        };
        series.nodeMap[''].values = seriesArea = merge(pointValues, {
            width: (pointValues.width * series.axisRatio),
            direction: (options.layoutStartingDirection === 'vertical' ? 0 : 1),
            val: tree.val
        });
        series.calculateChildrenAreas(tree, seriesArea);
        // Logic for point colors
        if (!series.colorAxis &&
            !options.colorByPoint) {
            series.setColorRecursive(series.tree);
        }
        // Update axis extremes according to the root node.
        if (options.allowTraversingTree) {
            val = rootNode.pointValues;
            series.xAxis.setExtremes(val.x, val.x + val.width, false);
            series.yAxis.setExtremes(val.y, val.y + val.height, false);
            series.xAxis.setScale();
            series.yAxis.setScale();
        }
        // Assign values to points.
        series.setPointValues();
    }
}
/* *
 *
 *  Static Properties
 *
 * */
TreemapSeries.defaultOptions = merge(ScatterSeries.defaultOptions, TreemapSeriesDefaults);
extend(TreemapSeries.prototype, {
    buildKDTree: noop,
    colorAttribs: ColorMapComposition.seriesMembers.colorAttribs,
    colorKey: 'colorValue', // Point color option key
    directTouch: true,
    getExtremesFromAll: true,
    getSymbol: noop,
    optionalAxis: 'colorAxis',
    parallelArrays: ['x', 'y', 'value', 'colorValue'],
    pointArrayMap: ['value'],
    pointClass: TreemapPoint,
    NodeClass: TreemapNode,
    trackerGroups: ['group', 'dataLabelsGroup'],
    utils: TreemapUtilities
});
ColorMapComposition.compose(TreemapSeries);
SeriesRegistry.registerSeriesType('treemap', TreemapSeries);
/* *
 *
 *  Default Export
 *
 * */
export default TreemapSeries;
