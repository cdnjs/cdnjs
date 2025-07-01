/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Color from './Color/Color.js';
const { parse: color } = Color;
import H from './Globals.js';
const { charts, composed, isTouchDevice } = H;
import U from './Utilities.js';
const { addEvent, attr, css, extend, find, fireEvent, isNumber, isObject, objectEach, offset, pick, pushUnique, splat } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The mouse and touch tracker object. Each {@link Chart} item has one
 * associated Pointer item that can be accessed from the  {@link Chart.pointer}
 * property.
 *
 * @class
 * @name Highcharts.Pointer
 *
 * @param {Highcharts.Chart} chart
 * The chart instance.
 *
 * @param {Highcharts.Options} options
 * The root options object. The pointer uses options from the chart and tooltip
 * structures.
 */
class Pointer {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Set inactive state to all series that are not currently hovered,
     * or, if `inactiveOtherPoints` is set to true, set inactive state to
     * all points within that series.
     *
     * @private
     * @function Highcharts.Pointer#applyInactiveState
     *
     * @param {Array<Highcharts.Point>} points
     * Currently hovered points
     */
    applyInactiveState(points = []) {
        const activeSeries = [];
        // Get all active series from the hovered points
        points.forEach((item) => {
            const series = item.series;
            // Include itself
            activeSeries.push(series);
            // Include parent series
            if (series.linkedParent) {
                activeSeries.push(series.linkedParent);
            }
            // Include all child series
            if (series.linkedSeries) {
                activeSeries.push.apply(activeSeries, series.linkedSeries);
            }
            // Include navigator series
            if (series.navigatorSeries) {
                activeSeries.push(series.navigatorSeries);
            }
            // Include boosed series when they share markerGroup
            if (series.boosted && series.markerGroup) {
                activeSeries.push.apply(activeSeries, this.chart.series.filter((otherSeries) => otherSeries.markerGroup === series.markerGroup));
            }
        });
        // Now loop over all series, filtering out active series
        this.chart.series.forEach((series) => {
            if (activeSeries.indexOf(series) === -1) {
                // Inactive series
                series.setState('inactive', true);
            }
            else if (series.options.inactiveOtherPoints) {
                // Active series, but other points should be inactivated
                series.setAllPointsToState('inactive');
            }
        });
    }
    /**
     * Destroys the Pointer object and disconnects DOM events.
     *
     * @function Highcharts.Pointer#destroy
     */
    destroy() {
        const pointer = this;
        this.eventsToUnbind.forEach((unbind) => unbind());
        this.eventsToUnbind = [];
        if (!H.chartCount) {
            Pointer.unbindDocumentMouseUp.forEach((el) => el.unbind());
            Pointer.unbindDocumentMouseUp.length = 0;
            if (Pointer.unbindDocumentTouchEnd) {
                Pointer.unbindDocumentTouchEnd = (Pointer.unbindDocumentTouchEnd());
            }
        }
        // Memory and CPU leak
        clearInterval(pointer.tooltipTimeout);
        objectEach(pointer, function (_val, prop) {
            pointer[prop] = void 0;
        });
    }
    /**
     * Calculate attrs for selection marker.
     * @private
     * @function Highcharts.Pointer#getSelectionMarkerAttrs
     * @emits getSelectionMarkerAttrs
     */
    getSelectionMarkerAttrs(chartX, chartY) {
        const e = {
            args: { chartX, chartY },
            attrs: {},
            shapeType: 'rect'
        };
        fireEvent(this, 'getSelectionMarkerAttrs', e, (e) => {
            const { chart, zoomHor, zoomVert } = this, { mouseDownX = 0, mouseDownY = 0 } = chart, attrs = e.attrs;
            let size;
            attrs.x = chart.plotLeft;
            attrs.y = chart.plotTop;
            attrs.width = zoomHor ? 1 : chart.plotWidth;
            attrs.height = zoomVert ? 1 : chart.plotHeight;
            // Adjust the width of the selection marker. Firefox needs at
            // least one pixel width or height in order to return a bounding
            // box.
            if (zoomHor) {
                size = chartX - mouseDownX;
                attrs.width = Math.max(1, Math.abs(size));
                attrs.x = (size > 0 ? 0 : size) + mouseDownX;
            }
            // Adjust the height of the selection marker
            if (zoomVert) {
                size = chartY - mouseDownY;
                attrs.height = Math.max(1, Math.abs(size));
                attrs.y = (size > 0 ? 0 : size) + mouseDownY;
            }
        });
        return e;
    }
    /**
     * Perform a drag operation in response to a mousemove event while the mouse
     * is down.
     * @private
     * @function Highcharts.Pointer#drag
     */
    drag(e) {
        const { chart } = this, { mouseDownX = 0, mouseDownY = 0 } = chart, { panning, panKey, selectionMarkerFill } = chart.options.chart, plotLeft = chart.plotLeft, plotTop = chart.plotTop, plotWidth = chart.plotWidth, plotHeight = chart.plotHeight, panningEnabled = isObject(panning) ?
            panning.enabled :
            panning, panKeyPressed = panKey && e[`${panKey}Key`];
        let chartX = e.chartX, chartY = e.chartY, clickedInside, selectionMarker = this.selectionMarker;
        // If the device supports both touch and mouse (like IE11), and we are
        // touch-dragging inside the plot area, don't handle the mouse event.
        // #4339.
        if (selectionMarker && selectionMarker.touch) {
            return;
        }
        // If the mouse is outside the plot area, adjust to coordinates
        // inside to prevent the selection marker from going outside
        if (chartX < plotLeft) {
            chartX = plotLeft;
        }
        else if (chartX > plotLeft + plotWidth) {
            chartX = plotLeft + plotWidth;
        }
        if (chartY < plotTop) {
            chartY = plotTop;
        }
        else if (chartY > plotTop + plotHeight) {
            chartY = plotTop + plotHeight;
        }
        // Determine if the mouse has moved more than 10px
        this.hasDragged = Math.sqrt(Math.pow(mouseDownX - chartX, 2) +
            Math.pow(mouseDownY - chartY, 2));
        if (this.hasDragged > 10) {
            clickedInside = chart.isInsidePlot(mouseDownX - plotLeft, mouseDownY - plotTop, {
                visiblePlotOnly: true
            });
            const { shapeType, attrs } = this.getSelectionMarkerAttrs(chartX, chartY);
            // Make a selection
            if (this.hasZoom &&
                clickedInside &&
                !panKeyPressed) {
                if (!selectionMarker) {
                    this.selectionMarker = selectionMarker =
                        chart.renderer[shapeType]();
                    selectionMarker
                        .attr({
                        'class': 'highcharts-selection-marker',
                        zIndex: 7
                    })
                        .add();
                    if (!chart.styledMode) {
                        selectionMarker.attr({
                            fill: selectionMarkerFill ||
                                color("#334eff" /* Palette.highlightColor80 */)
                                    .setOpacity(0.25).get()
                        });
                    }
                }
            }
            if (selectionMarker) {
                selectionMarker.attr(attrs);
            }
            // Panning
            if (clickedInside && !selectionMarker && panningEnabled) {
                chart.pan(e, panning);
            }
        }
    }
    /**
     * Start a drag operation.
     * @private
     * @function Highcharts.Pointer#dragStart
     */
    dragStart(e) {
        const chart = this.chart;
        // Record the start position
        chart.mouseIsDown = e.type;
        chart.cancelClick = false;
        chart.mouseDownX = e.chartX;
        chart.mouseDownY = e.chartY;
    }
    /**
     * Get selection box to calculate extremes
     * @private
     * @function Highcharts.Pointer#getSelectionBox
     * @emits getSelectionBox
     */
    getSelectionBox(marker) {
        const e = {
            args: { marker },
            result: marker.getBBox()
        };
        fireEvent(this, 'getSelectionBox', e);
        return e.result;
    }
    /**
     * On mouse up or touch end across the entire document, drop the selection.
     * @private
     * @function Highcharts.Pointer#drop
     */
    drop(e) {
        const { chart, selectionMarker } = this;
        // During a mouse, touch or mousewheel pan, the `startOnTick` and
        // `endOnTick` options are ignored. Otherwise the zooming or panning
        // would be jumpy, or even not performed because the end ticks would
        // block it. After the touch has ended, we undo this and render again.
        let redraw;
        for (const axis of chart.axes) {
            if (axis.isPanning) {
                axis.isPanning = false;
                if (axis.options.startOnTick ||
                    axis.options.endOnTick ||
                    axis.series.some((s) => s.boosted)) {
                    axis.forceRedraw = true;
                    axis.setExtremes(axis.userMin, axis.userMax, false);
                    redraw = true;
                }
            }
        }
        if (redraw) {
            chart.redraw();
        }
        if (selectionMarker && e) {
            // A selection has been made
            if (this.hasDragged) {
                const from = this.getSelectionBox(selectionMarker);
                chart.transform({
                    axes: chart.axes.filter((a) => a.zoomEnabled &&
                        ((a.coll === 'xAxis' && this.zoomX) ||
                            (a.coll === 'yAxis' && this.zoomY))),
                    selection: {
                        originalEvent: e, // #4890
                        xAxis: [],
                        yAxis: [],
                        ...from
                    },
                    from
                });
            }
            if (isNumber(chart.index)) {
                this.selectionMarker = selectionMarker.destroy();
            }
        }
        // Reset all. Check isNumber because it may be destroyed on mouse up
        // (#877)
        if (chart && isNumber(chart.index)) {
            css(chart.container, { cursor: chart._cursor });
            chart.cancelClick = this.hasDragged > 10; // #370
            chart.mouseIsDown = false;
            this.hasDragged = 0;
            this.pinchDown = [];
        }
    }
    /**
     * Finds the closest point to a set of coordinates, using the k-d-tree
     * algorithm.
     *
     * @function Highcharts.Pointer#findNearestKDPoint
     *
     * @param {Array<Highcharts.Series>} series
     * All the series to search in.
     *
     * @param {boolean|undefined} shared
     * Whether it is a shared tooltip or not.
     *
     * @param {Highcharts.PointerEventObject} e
     * The pointer event object, containing chart coordinates of the pointer.
     *
     * @return {Highcharts.Point|undefined}
     * The point closest to given coordinates.
     */
    findNearestKDPoint(series, shared, e) {
        let closest;
        /** @private */
        function sort(p1, p2) {
            const isCloserX = p1.distX - p2.distX, isCloser = p1.dist - p2.dist, isAbove = (p2.series.group?.zIndex -
                p1.series.group?.zIndex);
            let result;
            // We have two points which are not in the same place on xAxis
            // and shared tooltip:
            if (isCloserX !== 0 && shared) { // #5721
                result = isCloserX;
                // Points are not exactly in the same place on x/yAxis:
            }
            else if (isCloser !== 0) {
                result = isCloser;
                // The same xAxis and yAxis position, sort by z-index:
            }
            else if (isAbove !== 0) {
                result = isAbove;
                // The same zIndex, sort by array index:
            }
            else {
                result =
                    p1.series.index > p2.series.index ?
                        -1 :
                        1;
            }
            return result;
        }
        series.forEach(function (s) {
            const noSharedTooltip = s.noSharedTooltip && shared, compareX = (!noSharedTooltip &&
                s.options.findNearestPointBy.indexOf('y') < 0), point = s.searchPoint(e, compareX);
            if ( // Check that we actually found a point on the series.
            isObject(point, true) && point.series &&
                // Use the new point if it is closer.
                (!isObject(closest, true) ||
                    (sort(closest, point) > 0))) {
                closest = point;
            }
        });
        return closest;
    }
    /**
     * @private
     * @function Highcharts.Pointer#getChartCoordinatesFromPoint
     */
    getChartCoordinatesFromPoint(point, inverted) {
        const { xAxis, yAxis } = point.series, shapeArgs = point.shapeArgs;
        if (xAxis && yAxis) {
            let x = point.clientX ?? point.plotX ?? 0, y = point.plotY || 0;
            if (point.isNode &&
                shapeArgs &&
                isNumber(shapeArgs.x) &&
                isNumber(shapeArgs.y)) {
                x = shapeArgs.x;
                y = shapeArgs.y;
            }
            return inverted ? {
                chartX: yAxis.len + yAxis.pos - y,
                chartY: xAxis.len + xAxis.pos - x
            } : {
                chartX: x + xAxis.pos,
                chartY: y + yAxis.pos
            };
        }
        if (shapeArgs?.x && shapeArgs.y) {
            // E.g. pies do not have axes
            return {
                chartX: shapeArgs.x,
                chartY: shapeArgs.y
            };
        }
    }
    /**
     * Return the cached chartPosition if it is available on the Pointer,
     * otherwise find it. Running offset is quite expensive, so it should be
     * avoided when we know the chart hasn't moved.
     *
     * @function Highcharts.Pointer#getChartPosition
     *
     * @return {Highcharts.ChartPositionObject}
     * The offset of the chart container within the page
     */
    getChartPosition() {
        if (this.chartPosition) {
            return this.chartPosition;
        }
        const { container } = this.chart;
        const pos = offset(container);
        this.chartPosition = {
            left: pos.left,
            top: pos.top,
            scaleX: 1,
            scaleY: 1
        };
        const { offsetHeight, offsetWidth } = container;
        // #13342 - tooltip was not visible in Chrome, when chart
        // updates height.
        if (offsetWidth > 2 && // #13342
            offsetHeight > 2 // #13342
        ) {
            this.chartPosition.scaleX = pos.width / offsetWidth;
            this.chartPosition.scaleY = pos.height / offsetHeight;
        }
        return this.chartPosition;
    }
    /**
     * Get the click position in terms of axis values.
     *
     * @function Highcharts.Pointer#getCoordinates
     *
     * @param {Highcharts.PointerEventObject} e
     * Pointer event, extended with `chartX` and `chartY` properties.
     *
     * @return {Highcharts.PointerAxisCoordinatesObject}
     * Axis coordinates.
     */
    getCoordinates(e) {
        const coordinates = {
            xAxis: [],
            yAxis: []
        };
        for (const axis of this.chart.axes) {
            coordinates[axis.isXAxis ? 'xAxis' : 'yAxis'].push({
                axis,
                value: axis.toValue(e[axis.horiz ? 'chartX' : 'chartY'])
            });
        }
        return coordinates;
    }
    /**
     * Calculates what is the current hovered point/points and series.
     *
     * @private
     * @function Highcharts.Pointer#getHoverData
     *
     * @param {Highcharts.Point|undefined} existingHoverPoint
     * The point currently being hovered.
     *
     * @param {Highcharts.Series|undefined} existingHoverSeries
     * The series currently being hovered.
     *
     * @param {Array<Highcharts.Series>} series
     * All the series in the chart.
     *
     * @param {boolean} isDirectTouch
     * Is the pointer directly hovering the point.
     *
     * @param {boolean|undefined} shared
     * Whether it is a shared tooltip or not.
     *
     * @param {Highcharts.PointerEventObject} [e]
     * The triggering event, containing chart coordinates of the pointer.
     *
     * @return {Object}
     * Object containing resulting hover data: hoverPoint, hoverSeries, and
     * hoverPoints.
     */
    getHoverData(existingHoverPoint, existingHoverSeries, series, isDirectTouch, shared, e) {
        const hoverPoints = [], useExisting = !!(isDirectTouch && existingHoverPoint), filter = function (s) {
            return (s.visible &&
                !(!shared && s.directTouch) && // #3821
                pick(s.options.enableMouseTracking, true));
        };
        let hoverSeries = existingHoverSeries, 
        // Which series to look in for the hover point
        searchSeries, 
        // Parameters needed for beforeGetHoverData event.
        eventArgs = {
            chartX: e ? e.chartX : void 0,
            chartY: e ? e.chartY : void 0,
            shared: shared
        };
        // Find chart.hoverPane and update filter method in polar.
        fireEvent(this, 'beforeGetHoverData', eventArgs);
        const notSticky = hoverSeries && !hoverSeries.stickyTracking;
        searchSeries = notSticky ?
            // Only search on hovered series if it has stickyTracking false
            [hoverSeries] :
            // Filter what series to look in.
            series.filter((s) => s.stickyTracking &&
                (eventArgs.filter || filter)(s));
        // Use existing hovered point or find the one closest to coordinates.
        const hoverPoint = useExisting || !e ?
            existingHoverPoint :
            this.findNearestKDPoint(searchSeries, shared, e);
        // Assign hover series
        hoverSeries = hoverPoint?.series;
        // If we have a hoverPoint, assign hoverPoints.
        if (hoverPoint) {
            // When tooltip is shared, it displays more than one point
            if (shared && !hoverSeries.noSharedTooltip) {
                searchSeries = series.filter(function (s) {
                    return eventArgs.filter ?
                        eventArgs.filter(s) : filter(s) && !s.noSharedTooltip;
                });
                // Get all points with the same x value as the hoverPoint
                searchSeries.forEach(function (s) {
                    const nullInteraction = s.options?.nullInteraction;
                    let point = find(s.points, function (p) {
                        return (p.x === hoverPoint.x && (!p.isNull ||
                            !!nullInteraction));
                    });
                    if (isObject(point)) {
                        /*
                        * Boost returns a minimal point. Convert it to a usable
                        * point for tooltip and states.
                        */
                        if (s.boosted && s.boost) {
                            point = s.boost.getPoint(point);
                        }
                        hoverPoints.push(point);
                    }
                });
            }
            else {
                hoverPoints.push(hoverPoint);
            }
        }
        // Check whether the hoverPoint is inside pane we are hovering over.
        eventArgs = { hoverPoint: hoverPoint };
        fireEvent(this, 'afterGetHoverData', eventArgs);
        return {
            hoverPoint: eventArgs.hoverPoint,
            hoverSeries: hoverSeries,
            hoverPoints: hoverPoints
        };
    }
    /**
     * @private
     * @function Highcharts.Pointer#getPointFromEvent
     */
    getPointFromEvent(e) {
        let target = e.target, point;
        while (target && !point) {
            point = target.point;
            target = target.parentNode;
        }
        return point;
    }
    /**
     * @private
     * @function Highcharts.Pointer#onTrackerMouseOut
     */
    onTrackerMouseOut(e) {
        const chart = this.chart;
        const relatedTarget = e.relatedTarget;
        const series = chart.hoverSeries;
        this.isDirectTouch = false;
        if (series &&
            relatedTarget &&
            !series.stickyTracking &&
            !this.inClass(relatedTarget, 'highcharts-tooltip') &&
            (!this.inClass(relatedTarget, 'highcharts-series-' + series.index) || // #2499, #4465, #5553
                !this.inClass(relatedTarget, 'highcharts-tracker'))) {
            series.onMouseOut();
        }
    }
    /**
     * Utility to detect whether an element has, or has a parent with, a
     * specific class name. Used on detection of tracker objects and on deciding
     * whether hovering the tooltip should cause the active series to mouse out.
     *
     * @function Highcharts.Pointer#inClass
     *
     * @param {Highcharts.SVGDOMElement|Highcharts.HTMLDOMElement} element
     * The element to investigate.
     *
     * @param {string} className
     * The class name to look for.
     *
     * @return {boolean|undefined}
     * True if either the element or one of its parents has the given class
     * name.
     */
    inClass(element, className) {
        let elem = element, elemClassName;
        while (elem) {
            elemClassName = attr(elem, 'class');
            if (elemClassName) {
                if (elemClassName.indexOf(className) !== -1) {
                    return true;
                }
                if (elemClassName.indexOf('highcharts-container') !== -1) {
                    return false;
                }
            }
            elem = elem.parentElement;
        }
    }
    /**
     * Initialize the Pointer.
     *
     * @private
     * @function Highcharts.Pointer#init
     *
     * @param {Highcharts.Chart} chart
     * The Chart instance.
     *
     * @param {Highcharts.Options} options
     * The root options object. The pointer uses options from the chart and
     * tooltip structures.
     */
    constructor(chart, options) {
        this.hasDragged = 0;
        this.pointerCaptureEventsToUnbind = [];
        this.eventsToUnbind = [];
        // Store references
        this.options = options;
        this.chart = chart;
        // Do we need to handle click on a touch device?
        this.runChartClick = Boolean(options.chart.events?.click);
        this.pinchDown = [];
        this.setDOMEvents();
        fireEvent(this, 'afterInit');
    }
    /**
     * Takes a browser event object and extends it with custom Highcharts
     * properties `chartX` and `chartY` in order to work on the internal
     * coordinate system.
     *
     * On map charts, the properties `lon` and `lat` are added to the event
     * object given that the chart has projection information.
     *
     * @function Highcharts.Pointer#normalize
     *
     * @param {global.MouseEvent|global.PointerEvent|global.TouchEvent} e
     * Event object in standard browsers.
     *
     * @param {Highcharts.OffsetObject} [chartPosition]
     * Additional chart offset.
     *
     * @return {Highcharts.PointerEventObject}
     * A browser event with extended properties `chartX` and `chartY`.
     */
    normalize(e, chartPosition) {
        const touches = e.touches;
        // Position for iOS (#2757)
        const ePos = (touches ?
            touches.length ?
                touches.item(0) :
                (pick(// #13534
                touches.changedTouches, e.changedTouches))[0] :
            e);
        // Get mouse position
        if (!chartPosition) {
            chartPosition = this.getChartPosition();
        }
        let chartX = ePos.pageX - chartPosition.left, chartY = ePos.pageY - chartPosition.top;
        // #11329 - when there is scaling on a parent element, we need to take
        // this into account
        chartX /= chartPosition.scaleX;
        chartY /= chartPosition.scaleY;
        return extend(e, {
            chartX: Math.round(chartX),
            chartY: Math.round(chartY)
        });
    }
    /**
     * @private
     * @function Highcharts.Pointer#onContainerClick
     */
    onContainerClick(e) {
        const chart = this.chart;
        const hoverPoint = chart.hoverPoint;
        const pEvt = this.normalize(e);
        const plotLeft = chart.plotLeft;
        const plotTop = chart.plotTop;
        if (!chart.cancelClick) {
            // On tracker click, fire the series and point events. #783, #1583
            if (hoverPoint &&
                this.inClass(pEvt.target, 'highcharts-tracker')) {
                // The series click event
                fireEvent(hoverPoint.series, 'click', extend(pEvt, {
                    point: hoverPoint
                }));
                // The point click event
                if (chart.hoverPoint) { // It may be destroyed (#1844)
                    hoverPoint.firePointEvent('click', pEvt);
                }
                // When clicking outside a tracker, fire a chart event
            }
            else {
                extend(pEvt, this.getCoordinates(pEvt));
                // Fire a click event in the chart
                if (chart.isInsidePlot(pEvt.chartX - plotLeft, pEvt.chartY - plotTop, {
                    visiblePlotOnly: true
                })) {
                    fireEvent(chart, 'click', pEvt);
                }
            }
        }
    }
    /**
     * @private
     * @function Highcharts.Pointer#onContainerMouseDown
     */
    onContainerMouseDown(e) {
        const isPrimaryButton = ((e.buttons || e.button) & 1) === 1;
        e = this.normalize(e);
        // #11635, Firefox does not reliably fire move event after click scroll
        if (H.isFirefox &&
            e.button !== 0) {
            this.onContainerMouseMove(e);
        }
        // #11635, limiting to primary button
        if (typeof e.button === 'undefined' ||
            isPrimaryButton) {
            this.zoomOption(e);
            // #295, #13737 solve conflict between container drag and chart zoom
            if (isPrimaryButton) {
                e.preventDefault?.();
            }
            this.dragStart(e);
        }
    }
    /**
     * When mouse leaves the container, hide the tooltip.
     * @private
     * @function Highcharts.Pointer#onContainerMouseLeave
     */
    onContainerMouseLeave(e) {
        const { pointer } = charts[pick(Pointer.hoverChartIndex, -1)] || {};
        e = this.normalize(e);
        this.onContainerMouseMove(e);
        // #4886, MS Touch end fires mouseleave but with no related target
        if (pointer &&
            !this.inClass(e.relatedTarget, 'highcharts-tooltip')) {
            pointer.reset();
            // Also reset the chart position, used in #149 fix
            pointer.chartPosition = void 0;
        }
    }
    /**
     * When mouse enters the container, delete pointer's chartPosition.
     * @private
     * @function Highcharts.Pointer#onContainerMouseEnter
     */
    onContainerMouseEnter() {
        delete this.chartPosition;
    }
    /**
     * The mousemove, touchmove and touchstart event handler
     * @private
     * @function Highcharts.Pointer#onContainerMouseMove
     */
    onContainerMouseMove(e) {
        const chart = this.chart, tooltip = chart.tooltip, pEvt = this.normalize(e);
        this.setHoverChartIndex(e);
        if (chart.mouseIsDown === 'mousedown' || this.touchSelect(pEvt)) {
            this.drag(pEvt);
        }
        // Show the tooltip and run mouse over events (#977)
        if (!chart.exporting?.openMenu &&
            (this.inClass(pEvt.target, 'highcharts-tracker') ||
                chart.isInsidePlot(pEvt.chartX - chart.plotLeft, pEvt.chartY - chart.plotTop, {
                    visiblePlotOnly: true
                })) &&
            // If the tooltip has stickOnContact enabled, do nothing. This
            // applies regardless of any combinations of the `split` and
            // `useHTML` options.
            !tooltip?.shouldStickOnContact(pEvt)) {
            if (this.inClass(pEvt.target, 'highcharts-no-tooltip')) {
                this.reset(false, 0);
            }
            else {
                this.runPointActions(pEvt);
            }
        }
    }
    /**
     * @private
     * @function Highcharts.Pointer#onDocumentTouchEnd
     */
    onDocumentTouchEnd(e) {
        this.onDocumentMouseUp(e);
    }
    /**
     * @private
     * @function Highcharts.Pointer#onContainerTouchMove
     */
    onContainerTouchMove(e) {
        if (this.touchSelect(e)) {
            this.onContainerMouseMove(e);
        }
        else {
            this.touch(e);
        }
    }
    /**
     * @private
     * @function Highcharts.Pointer#onContainerTouchStart
     */
    onContainerTouchStart(e) {
        if (this.touchSelect(e)) {
            this.onContainerMouseDown(e);
        }
        else {
            this.zoomOption(e);
            this.touch(e, true);
        }
    }
    /**
     * Special handler for mouse move that will hide the tooltip when the mouse
     * leaves the plotarea. Issue #149 workaround. The mouseleave event does not
     * always fire.
     * @private
     * @function Highcharts.Pointer#onDocumentMouseMove
     */
    onDocumentMouseMove(e) {
        const chart = this.chart;
        const tooltip = chart.tooltip;
        const chartPosition = this.chartPosition;
        const pEvt = this.normalize(e, chartPosition);
        // If we're outside, hide the tooltip
        if (chartPosition &&
            !chart.isInsidePlot(pEvt.chartX - chart.plotLeft, pEvt.chartY - chart.plotTop, {
                visiblePlotOnly: true
            }) &&
            !tooltip?.shouldStickOnContact(pEvt) && (pEvt.target === chart.container.ownerDocument ||
            !this.inClass(pEvt.target, 'highcharts-tracker'))) {
            this.reset();
        }
    }
    /**
     * @private
     * @function Highcharts.Pointer#onDocumentMouseUp
     */
    onDocumentMouseUp(e) {
        charts[pick(Pointer.hoverChartIndex, -1)]
            ?.pointer
            ?.drop(e);
    }
    /**
     * Handle touch events with two touches
     * @private
     * @function Highcharts.Pointer#pinch
     */
    pinch(e) {
        const pointer = this, { chart, hasZoom, lastTouches } = pointer, touches = [].map.call(e.touches || [], 
        // Normalize each touch
        (touch) => pointer.normalize(touch)), touchesLength = touches.length, fireClickEvent = touchesLength === 1 && ((pointer.inClass(e.target, 'highcharts-tracker') &&
            chart.runTrackerClick) ||
            pointer.runChartClick), tooltip = chart.tooltip, followTouchMove = touchesLength === 1 &&
            pick(tooltip?.options.followTouchMove, true);
        // Don't initiate panning until the user has pinched. This prevents us
        // from blocking page scrolling as users scroll down a long page
        // (#4210).
        if (touchesLength > 1) {
            pointer.initiated = true;
        }
        else if (followTouchMove) {
            // #16119: Prevent blocking scroll when single-finger panning is
            // not enabled
            pointer.initiated = false;
        }
        // On touch devices, only proceed to trigger click if a handler is
        // defined
        if (hasZoom &&
            pointer.initiated &&
            !fireClickEvent &&
            e.cancelable !== false) {
            e.preventDefault();
        }
        // Register the touch start position
        if (e.type === 'touchstart') {
            pointer.pinchDown = touches;
            pointer.res = true; // Reset on next move
            chart.mouseDownX = e.chartX;
            // Optionally move the tooltip on touchmove
        }
        else if (followTouchMove) {
            this.runPointActions(pointer.normalize(e));
            // Event type is touchmove, handle panning and pinching. The length can
            // be 0 when releasing, if touchend fires first
        }
        else if (lastTouches) {
            fireEvent(chart, 'touchpan', {
                originalEvent: e,
                touches
            }, () => {
                const boxFromTouches = (touches) => {
                    const finger0 = touches[0], finger1 = touches[1] || finger0;
                    return {
                        x: finger0.chartX,
                        y: finger0.chartY,
                        width: finger1.chartX - finger0.chartX,
                        height: finger1.chartY - finger0.chartY
                    };
                };
                chart.transform({
                    axes: chart.axes
                        .filter((axis) => axis.zoomEnabled &&
                        ((this.zoomHor && axis.horiz) ||
                            (this.zoomVert && !axis.horiz))),
                    to: boxFromTouches(touches),
                    from: boxFromTouches(lastTouches),
                    trigger: e.type
                });
            });
            if (pointer.res) {
                pointer.res = false;
                this.reset(false, 0);
            }
        }
        pointer.lastTouches = touches;
    }
    /**
     * Run translation operations
     * @private
     * @function Highcharts.Pointer#pinchTranslate
     * /
    public pinchTranslate(
        pinchDown: Array<any>,
        touches: Array<PointerEvent>,
        transform: any,
        selectionMarker: any,
        clip: any,
        lastValidTouch: any
    ): void {
        if (this.zoomHor) {
            this.pinchTranslateDirection(
                true,
                pinchDown,
                touches,
                transform,
                selectionMarker,
                clip,
                lastValidTouch
            );
        }
        if (this.zoomVert) {
            this.pinchTranslateDirection(
                false,
                pinchDown,
                touches,
                transform,
                selectionMarker,
                clip,
                lastValidTouch
            );
        }
    }
    */
    /**
     * Run translation operations for each direction (horizontal and vertical)
     * independently.
     * @private
     * @function Highcharts.Pointer#pinchTranslateDirection
     * /
    public pinchTranslateDirection(
        horiz: boolean,
        pinchDown: Array<any>,
        touches: Array<PointerEvent>,
        transform: any,
        selectionMarker: any,
        clip: any,
        lastValidTouch: any,
        forcedScale?: number
    ): void {
        const chart = this.chart,
            xy: ('x'|'y') = horiz ? 'x' : 'y',
            XY: ('X'|'Y') = horiz ? 'X' : 'Y',
            sChartXY: ('chartX'|'chartY') = ('chart' + XY) as any,
            wh = horiz ? 'width' : 'height',
            plotLeftTop = (chart as any)['plot' + (horiz ? 'Left' : 'Top')],
            inverted = chart.inverted,
            bounds = chart.bounds[horiz ? 'h' : 'v'],
            singleTouch = pinchDown.length === 1,
            touch0Start = pinchDown[0][sChartXY],
            touch1Start = !singleTouch && pinchDown[1][sChartXY],
            setScale = function (): void {
                // Don't zoom if fingers are too close on this axis
                if (
                    typeof touch1Now === 'number' &&
                    Math.abs(touch0Start - touch1Start) > 20
                ) {
                    scale = forcedScale ||
                        Math.abs(touch0Now - touch1Now) /
                        Math.abs(touch0Start - touch1Start);
                }

                clipXY = ((plotLeftTop - touch0Now) / scale) + touch0Start;
                selectionWH = (chart as any)[
                    'plot' + (horiz ? 'Width' : 'Height')
                ] / scale;
            };

        let selectionWH: any,
            selectionXY,
            clipXY: any,
            scale = forcedScale || 1,
            touch0Now = touches[0][sChartXY],
            touch1Now = !singleTouch && touches[1][sChartXY],
            outOfBounds;

        // Set the scale, first pass
        setScale();

        // The clip position (x or y) is altered if out of bounds, the selection
        // position is not
        selectionXY = clipXY;

        // Out of bounds
        if (selectionXY < bounds.min) {
            selectionXY = bounds.min;
            outOfBounds = true;
        } else if (selectionXY + selectionWH > bounds.max) {
            selectionXY = bounds.max - selectionWH;
            outOfBounds = true;
        }

        // Is the chart dragged off its bounds, determined by dataMin and
        // dataMax?
        if (outOfBounds) {

            // Modify the touchNow position in order to create an elastic drag
            // movement. This indicates to the user that the chart is responsive
            // but can't be dragged further.
            touch0Now -= 0.8 * (touch0Now - lastValidTouch[xy][0]);
            if (typeof touch1Now === 'number') {
                touch1Now -= 0.8 * (touch1Now - lastValidTouch[xy][1]);
            }

            // Set the scale, second pass to adapt to the modified touchNow
            // positions
            setScale();

        } else {
            lastValidTouch[xy] = [touch0Now, touch1Now];
        }

        // Set geometry for clipping, selection and transformation
        if (!inverted) {
            clip[xy] = clipXY - plotLeftTop;
            clip[wh] = selectionWH;
        }
        const scaleKey = inverted ?
            (horiz ? 'scaleY' : 'scaleX') : 'scale' + XY;
        const transformScale = inverted ? 1 / scale : scale;

        selectionMarker[wh] = selectionWH;
        selectionMarker[xy] = selectionXY;
        // Invert scale if needed (#19217)
        transform[scaleKey] = scale * (inverted && !horiz ? -1 : 1);
        transform['translate' + XY] = (transformScale * plotLeftTop) +
            (touch0Now - (transformScale * touch0Start));
    }
    */
    /**
     * Reset the tracking by hiding the tooltip, the hover series state and the
     * hover point.
     *
     * @function Highcharts.Pointer#reset
     *
     * @param {boolean} [allowMove]
     * Instead of destroying the tooltip altogether, allow moving it if
     * possible.
     *
     * @param {number} [delay]
     * The tooltip hide delay in ms.
     */
    reset(allowMove, delay) {
        const pointer = this, chart = pointer.chart, hoverSeries = chart.hoverSeries, hoverPoint = chart.hoverPoint, hoverPoints = chart.hoverPoints, tooltip = chart.tooltip, tooltipPoints = tooltip?.shared ?
            hoverPoints :
            hoverPoint;
        // Check if the points have moved outside the plot area (#1003, #4736,
        // #5101)
        if (allowMove && tooltipPoints) {
            splat(tooltipPoints).forEach(function (point) {
                if (point.series.isCartesian &&
                    typeof point.plotX === 'undefined') {
                    allowMove = false;
                }
            });
        }
        // Just move the tooltip, #349
        if (allowMove) {
            if (tooltip && tooltipPoints && splat(tooltipPoints).length) {
                tooltip.refresh(tooltipPoints);
                if (tooltip.shared && hoverPoints) { // #8284
                    hoverPoints.forEach(function (point) {
                        point.setState(point.state, true);
                        if (point.series.isCartesian) {
                            if (point.series.xAxis.crosshair) {
                                point.series.xAxis
                                    .drawCrosshair(null, point);
                            }
                            if (point.series.yAxis.crosshair) {
                                point.series.yAxis
                                    .drawCrosshair(null, point);
                            }
                        }
                    });
                }
                else if (hoverPoint) { // #2500
                    hoverPoint.setState(hoverPoint.state, true);
                    chart.axes.forEach(function (axis) {
                        if (axis.crosshair &&
                            hoverPoint.series[axis.coll] === axis) {
                            axis.drawCrosshair(null, hoverPoint);
                        }
                    });
                }
            }
            // Full reset
        }
        else {
            if (hoverPoint) {
                hoverPoint.onMouseOut();
            }
            if (hoverPoints) {
                hoverPoints.forEach(function (point) {
                    point.setState();
                });
            }
            if (hoverSeries) {
                hoverSeries.onMouseOut();
            }
            if (tooltip) {
                tooltip.hide(delay);
            }
            if (pointer.unDocMouseMove) {
                pointer.unDocMouseMove = pointer.unDocMouseMove();
            }
            // Remove crosshairs
            chart.axes.forEach(function (axis) {
                axis.hideCrosshair();
            });
            chart.hoverPoints = chart.hoverPoint = void 0;
        }
    }
    /**
     * With line type charts with a single tracker, get the point closest to the
     * mouse. Run Point.onMouseOver and display tooltip for the point or points.
     *
     * @private
     * @function Highcharts.Pointer#runPointActions
     *
     * @emits Highcharts.Point#event:mouseOut
     * @emits Highcharts.Point#event:mouseOver
     */
    runPointActions(e, p, force) {
        const pointer = this, chart = pointer.chart, series = chart.series, tooltip = (chart.tooltip?.options.enabled ?
            chart.tooltip :
            void 0), shared = (tooltip ?
            tooltip.shared :
            false);
        let hoverPoint = p || chart.hoverPoint, hoverSeries = hoverPoint?.series || chart.hoverSeries;
        const // `onMouseOver` or already hovering a series with directTouch
        isDirectTouch = (!e || e.type !== 'touchmove') && (!!p || ((hoverSeries?.directTouch) &&
            pointer.isDirectTouch)), hoverData = this.getHoverData(hoverPoint, hoverSeries, series, isDirectTouch, shared, e);
        // Update variables from hoverData.
        hoverPoint = hoverData.hoverPoint;
        hoverSeries = hoverData.hoverSeries;
        const points = hoverData.hoverPoints, followPointer = hoverSeries?.tooltipOptions.followPointer &&
            !hoverSeries.tooltipOptions.split, useSharedTooltip = (shared &&
            hoverSeries &&
            !hoverSeries.noSharedTooltip);
        // Refresh tooltip for kdpoint if new hover point or tooltip was hidden
        // #3926, #4200
        if (hoverPoint &&
            (force ||
                hoverPoint !== chart.hoverPoint ||
                tooltip?.isHidden)) {
            (chart.hoverPoints || []).forEach(function (p) {
                if (points.indexOf(p) === -1) {
                    p.setState();
                }
            });
            // Set normal state to previous series
            if (chart.hoverSeries !== hoverSeries) {
                hoverSeries.onMouseOver();
            }
            pointer.applyInactiveState(points);
            // Do mouseover on all points (#3919, #3985, #4410, #5622)
            (points || []).forEach(function (p) {
                p.setState('hover');
            });
            // If tracking is on series in stead of on each point,
            // fire mouseOver on hover point. // #4448
            if (chart.hoverPoint) {
                chart.hoverPoint.firePointEvent('mouseOut');
            }
            // Hover point may have been destroyed in the event handlers (#7127)
            if (!hoverPoint.series) {
                return;
            }
            /**
             * Contains all hovered points.
             *
             * @name Highcharts.Chart#hoverPoints
             * @type {Array<Highcharts.Point>|null}
             */
            chart.hoverPoints = points;
            /**
             * Contains the original hovered point.
             *
             * @name Highcharts.Chart#hoverPoint
             * @type {Highcharts.Point|null}
             */
            chart.hoverPoint = hoverPoint;
            /**
             * Hover state should not be lost when axis is updated (#12569)
             * Axis.update runs pointer.reset which uses chart.hoverPoint.state
             * to apply state which does not exist in hoverPoint yet.
             * The mouseOver event should be triggered when hoverPoint
             * is correct.
             */
            hoverPoint.firePointEvent('mouseOver', void 0, () => {
                // Draw tooltip if necessary
                if (tooltip && hoverPoint) {
                    tooltip.refresh(useSharedTooltip ? points : hoverPoint, e);
                }
            });
            // Update positions (regardless of kdpoint or hoverPoint)
        }
        else if (followPointer && tooltip && !tooltip.isHidden) {
            const anchor = tooltip.getAnchor([{}], e);
            if (chart.isInsidePlot(anchor[0], anchor[1], {
                visiblePlotOnly: true
            })) {
                tooltip.updatePosition({ plotX: anchor[0], plotY: anchor[1] });
            }
        }
        // Start the event listener to pick up the tooltip and crosshairs
        if (!pointer.unDocMouseMove) {
            pointer.unDocMouseMove = addEvent(chart.container.ownerDocument, 'mousemove', (e) => charts[Pointer.hoverChartIndex ?? -1]
                ?.pointer
                ?.onDocumentMouseMove(e));
            pointer.eventsToUnbind.push(pointer.unDocMouseMove);
        }
        // Issues related to crosshair #4927, #5269 #5066, #5658
        chart.axes.forEach(function drawAxisCrosshair(axis) {
            const snap = axis.crosshair?.snap ?? true;
            let point;
            if (snap) {
                point = chart.hoverPoint; // #13002
                if (!point || point.series[axis.coll] !== axis) {
                    point = find(points, (p) => p.series?.[axis.coll] === axis);
                }
            }
            // Axis has snapping crosshairs, and one of the hover points belongs
            // to axis. Always call drawCrosshair when it is not snap.
            if (point || !snap) {
                axis.drawCrosshair(e, point);
                // Axis has snapping crosshairs, but no hover point belongs to axis
            }
            else {
                axis.hideCrosshair();
            }
        });
    }
    /**
     * Set the JS DOM events on the container and document. This method should
     * contain a one-to-one assignment between methods and their handlers. Any
     * advanced logic should be moved to the handler reflecting the event's
     * name.
     * @private
     * @function Highcharts.Pointer#setDOMEvents
     */
    setDOMEvents() {
        const container = this.chart.container, ownerDoc = container.ownerDocument;
        container.onmousedown = this.onContainerMouseDown.bind(this);
        container.onmousemove = this.onContainerMouseMove.bind(this);
        container.onclick = this.onContainerClick.bind(this);
        this.eventsToUnbind.push(addEvent(container, 'mouseenter', this.onContainerMouseEnter.bind(this)), addEvent(container, 'mouseleave', this.onContainerMouseLeave.bind(this)));
        if (!Pointer.unbindDocumentMouseUp.some((el) => el.doc === ownerDoc)) {
            Pointer.unbindDocumentMouseUp.push({
                doc: ownerDoc,
                unbind: addEvent(ownerDoc, 'mouseup', this.onDocumentMouseUp.bind(this))
            });
        }
        // In case we are dealing with overflow, reset the chart position when
        // scrolling parent elements
        let parent = this.chart.renderTo.parentElement;
        while (parent && parent.tagName !== 'BODY') {
            this.eventsToUnbind.push(addEvent(parent, 'scroll', () => {
                delete this.chartPosition;
            }));
            parent = parent.parentElement;
        }
        this.eventsToUnbind.push(addEvent(container, 'touchstart', this.onContainerTouchStart.bind(this), { passive: false }), addEvent(container, 'touchmove', this.onContainerTouchMove.bind(this), { passive: false }));
        if (!Pointer.unbindDocumentTouchEnd) {
            Pointer.unbindDocumentTouchEnd = addEvent(ownerDoc, 'touchend', this.onDocumentTouchEnd.bind(this), { passive: false });
        }
        this.setPointerCapture();
        addEvent(this.chart, 'redraw', this.setPointerCapture.bind(this));
    }
    /**
     * Sets, or removes on update, pointer events using pointer capture for
     * tooltip.followTouchMove if any series has findNearestPointBy that
     * includes the y dimension.
     * @private
     * @function Highcharts.Pointer#setPointerCapture
    */
    setPointerCapture() {
        // Only for touch
        if (!isTouchDevice) {
            return;
        }
        const pointer = this, events = pointer.pointerCaptureEventsToUnbind, chart = pointer.chart, container = chart.container, followTouchMove = pick(chart.options.tooltip?.followTouchMove, true), shouldHave = followTouchMove && chart.series.some((series) => series.options.findNearestPointBy
            .indexOf('y') > -1);
        if (!pointer.hasPointerCapture && shouldHave) {
            // Add
            // Bind
            events.push(addEvent(container, 'pointerdown', (e) => {
                if (e.target?.hasPointerCapture(e.pointerId)) {
                    e.target?.releasePointerCapture(e.pointerId);
                }
            }), addEvent(container, 'pointermove', (e) => {
                chart.pointer?.getPointFromEvent(e)?.onMouseOver(e);
            }));
            if (!chart.styledMode) {
                css(container, { 'touch-action': 'none' });
            }
            // Mostly for styled mode
            container.className += ' highcharts-no-touch-action';
            pointer.hasPointerCapture = true;
        }
        else if (pointer.hasPointerCapture && !shouldHave) {
            // Remove
            // Unbind
            events.forEach((e) => e());
            events.length = 0;
            if (!chart.styledMode) {
                css(container, {
                    'touch-action': pick(chart.options.chart.style?.['touch-action'], 'manipulation')
                });
            }
            // Mostly for styled mode
            container.className = container.className.replace(' highcharts-no-touch-action', '');
            pointer.hasPointerCapture = false;
        }
    }
    /**
     * Sets the index of the hovered chart and leaves the previous hovered
     * chart, to reset states like tooltip.
     * @private
     * @function Highcharts.Pointer#setHoverChartIndex
     */
    setHoverChartIndex(e) {
        const chart = this.chart;
        const hoverChart = H.charts[pick(Pointer.hoverChartIndex, -1)];
        if (hoverChart &&
            hoverChart !== chart) {
            const relatedTargetObj = { relatedTarget: chart.container };
            if (e && !e?.relatedTarget) {
                // #17192, Non-enumerable properties of "e" are dropped with
                // spreading (...e). Using Object.assign ensures integrity.
                Object.assign({}, e, relatedTargetObj);
            }
            hoverChart.pointer?.onContainerMouseLeave(e || relatedTargetObj);
        }
        if (!hoverChart?.mouseIsDown) {
            Pointer.hoverChartIndex = chart.index;
        }
    }
    /**
     * General touch handler shared by touchstart and touchmove.
     * @private
     * @function Highcharts.Pointer#touch
     */
    touch(e, start) {
        const { chart, pinchDown = [] } = this;
        let hasMoved, isInside;
        this.setHoverChartIndex();
        e = this.normalize(e);
        if (e.touches.length === 1) {
            isInside = chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop, {
                visiblePlotOnly: true
            });
            if (isInside && !chart.exporting?.openMenu) {
                // Run mouse events and display tooltip etc
                if (start) {
                    this.runPointActions(e);
                }
                // Android fires touchmove events after the touchstart even if
                // the finger hasn't moved, or moved only a pixel or two. In iOS
                // however, the touchmove doesn't fire unless the finger moves
                // more than ~4px. So we emulate this behaviour in Android by
                // checking how much it moved, and cancelling on small
                // distances. #3450. Tested and still relevant as of 2024.
                if (e.type === 'touchmove') {
                    hasMoved = pinchDown[0] ? // #5266
                        (Math.pow(pinchDown[0].chartX - e.chartX, 2) +
                            Math.pow(pinchDown[0].chartY - e.chartY, 2)) >= 16 :
                        false;
                }
                if (pick(hasMoved, true)) {
                    this.pinch(e);
                }
            }
            else if (start) {
                // Hide the tooltip on touching outside the plot area (#1203)
                this.reset();
            }
        }
        else if (e.touches.length === 2) {
            this.pinch(e);
        }
    }
    /**
     * Returns true if the chart is set up for zooming by single touch and the
     * event is capable
     * @private
     * @function Highcharts.Pointer#touchSelect
     */
    touchSelect(e) {
        return Boolean(this.chart.zooming.singleTouch &&
            e.touches &&
            e.touches.length === 1);
    }
    /**
     * Resolve the zoomType option, this is reset on all touch start and mouse
     * down events.
     * @private
     * @function Highcharts.Pointer#zoomOption
     */
    zoomOption(e) {
        const chart = this.chart, inverted = chart.inverted;
        let zoomType = chart.zooming.type || '', zoomX, zoomY;
        // Look for the pinchType option
        if (/touch/.test(e.type)) {
            zoomType = pick(chart.zooming.pinchType, zoomType);
        }
        this.zoomX = zoomX = /x/.test(zoomType);
        this.zoomY = zoomY = /y/.test(zoomType);
        this.zoomHor = (zoomX && !inverted) || (zoomY && inverted);
        this.zoomVert = (zoomY && !inverted) || (zoomX && inverted);
        this.hasZoom = zoomX || zoomY;
    }
}
Pointer.unbindDocumentMouseUp = [];
/* *
 *
 *  Class Namespace
 *
 * */
(function (Pointer) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    function compose(ChartClass) {
        if (pushUnique(composed, 'Core.Pointer')) {
            addEvent(ChartClass, 'beforeRender', function () {
                /**
                 * The Pointer that keeps track of mouse and touch
                 * interaction.
                 *
                 * @memberof Highcharts.Chart
                 * @name pointer
                 * @type {Highcharts.Pointer}
                 * @instance
                 */
                this.pointer = new Pointer(this, this.options);
            });
        }
    }
    Pointer.compose = compose;
})(Pointer || (Pointer = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Pointer;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Chart position and scale.
 *
 * @interface Highcharts.ChartPositionObject
 */ /**
* @name Highcharts.ChartPositionObject#left
* @type {number}
*/ /**
* @name Highcharts.ChartPositionObject#scaleX
* @type {number}
*/ /**
* @name Highcharts.ChartPositionObject#scaleY
* @type {number}
*/ /**
* @name Highcharts.ChartPositionObject#top
* @type {number}
*/
/**
 * One position in relation to an axis.
 *
 * @interface Highcharts.PointerAxisCoordinateObject
 */ /**
* Related axis.
*
* @name Highcharts.PointerAxisCoordinateObject#axis
* @type {Highcharts.Axis}
*/ /**
* Axis value.
*
* @name Highcharts.PointerAxisCoordinateObject#value
* @type {number}
*/
/**
 * Positions in terms of axis values.
 *
 * @interface Highcharts.PointerAxisCoordinatesObject
 */ /**
* Positions on the x-axis.
* @name Highcharts.PointerAxisCoordinatesObject#xAxis
* @type {Array<Highcharts.PointerAxisCoordinateObject>}
*/ /**
* Positions on the y-axis.
* @name Highcharts.PointerAxisCoordinatesObject#yAxis
* @type {Array<Highcharts.PointerAxisCoordinateObject>}
*/
/**
 * Pointer coordinates.
 *
 * @interface Highcharts.PointerCoordinatesObject
 */ /**
* @name Highcharts.PointerCoordinatesObject#chartX
* @type {number}
*/ /**
* @name Highcharts.PointerCoordinatesObject#chartY
* @type {number}
*/
/**
 * A native browser mouse or touch event, extended with position information
 * relative to the {@link Chart.container}.
 *
 * @interface Highcharts.PointerEventObject
 * @extends global.PointerEvent
 */ /**
* The X coordinate of the pointer interaction relative to the chart.
*
* @name Highcharts.PointerEventObject#chartX
* @type {number}
*/ /**
* The Y coordinate of the pointer interaction relative to the chart.
*
* @name Highcharts.PointerEventObject#chartY
* @type {number}
*/
/**
 * Axis-specific data of a selection.
 *
 * @interface Highcharts.SelectDataObject
 */ /**
* The selected Axis.
* @name Highcharts.SelectDataObject#axis
* @type {Highcharts.Axis}
*/ /**
* The maximum axis value, either automatic or set manually.
* @name Highcharts.SelectDataObject#max
* @type {number}
*/ /**
* The minimum axis value, either automatic or set manually.
* @name Highcharts.SelectDataObject#min
* @type {number}
*/
/**
 * Object for select events.
 * The primary axes are `xAxis[0]` and `yAxis[0]`. Remember the unit of a
 * datetime axis is milliseconds since 1970-01-01 00:00:00.
 *
 * @interface Highcharts.SelectEventObject
 */ /**
* The related browser event.
* @name Highcharts.SelectEventObject#originalEvent
* @type {global.Event}
*/ /**
* Prevents the default action for the event, if called.
* @name Highcharts.SelectEventObject#preventDefault
* @type {Function}
*/ /**
* Indicates a reset event to restore default state.
* @name Highcharts.SelectEventObject#resetSelection
* @type {boolean|undefined}
*/ /**
* Arrays containing the axes of each dimension and each axis' min and max
* values.
* @name Highcharts.SelectEventObject#xAxis
* @type {Array<Highcharts.SelectDataObject>}
*/ /**
* Arrays containing the axes of each dimension and each axis' min and max
* values.
* @name Highcharts.SelectEventObject#yAxis
* @type {Array<Highcharts.SelectDataObject>}
*/
''; // Keeps doclets above in JS file
