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
import Chart from '../Core/Chart/Chart.js';
import H from '../Core/Globals.js';
const { doc } = H;
import U from '../Core/Utilities.js';
const { addEvent, extend, isNumber, merge, objectEach, pick } = U;
import './MapNavigationDefaults.js';
/* eslint-disable no-invalid-this, valid-jsdoc */
/**
 * @private
 */
function stopEvent(e) {
    if (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        e.cancelBubble = true;
    }
}
/**
 * The MapNavigation handles buttons for navigation in addition to mousewheel
 * and doubleclick handlers for chart zooming.
 *
 * @private
 * @class
 * @name MapNavigation
 *
 * @param {Highcharts.Chart} chart
 *        The Chart instance.
 */
function MapNavigation(chart) {
    this.navButtons = [];
    this.init(chart);
}
/**
 * Initialize function.
 *
 * @function MapNavigation#init
 *
 * @param {Highcharts.Chart} chart
 *        The Chart instance.
 *
 * @return {void}
 */
MapNavigation.prototype.init = function (chart) {
    this.chart = chart;
};
/**
 * Update the map navigation with new options. Calling this is the same as
 * calling `chart.update({ mapNavigation: {} })`.
 *
 * @function MapNavigation#update
 *
 * @param {Highcharts.MapNavigationOptions} [options]
 *        New options for the map navigation.
 *
 * @return {void}
 */
MapNavigation.prototype.update = function (options) {
    let mapNav = this, chart = this.chart, o = chart.options.mapNavigation, attr, outerHandler = function (e) {
        this.handler.call(chart, e);
        stopEvent(e); // Stop default click event (#4444)
    }, navButtons = mapNav.navButtons;
    // Merge in new options in case of update, and register back to chart
    // options.
    if (options) {
        o = chart.options.mapNavigation =
            merge(chart.options.mapNavigation, options);
    }
    // Destroy buttons in case of dynamic update
    while (navButtons.length) {
        navButtons.pop().destroy();
    }
    if (pick(o.enableButtons, o.enabled) && !chart.renderer.forExport) {
        if (!mapNav.navButtonsGroup) {
            mapNav.navButtonsGroup = chart.renderer.g()
                .attr({
                zIndex: 4 // #4955, // #8392
            })
                .add();
        }
        objectEach(o.buttons, function (buttonOptions, n) {
            var _a;
            buttonOptions = merge(o.buttonOptions, buttonOptions);
            // Presentational
            if (!chart.styledMode && buttonOptions.theme) {
                attr = buttonOptions.theme;
                attr.style = merge(buttonOptions.theme.style, buttonOptions.style // #3203
                );
            }
            const { text, width = 0, height = 0, padding = 0 } = buttonOptions;
            const button = chart.renderer
                .button(
            // Display the text from options only if it is not plus or
            // minus
            (text !== '+' && text !== '-' && text) || '', 0, 0, outerHandler, attr, void 0, void 0, void 0, n === 'zoomIn' ? 'topbutton' : 'bottombutton')
                .addClass('highcharts-map-navigation highcharts-' + {
                zoomIn: 'zoom-in',
                zoomOut: 'zoom-out'
            }[n])
                .attr({
                width,
                height,
                title: chart.options.lang[n],
                padding: buttonOptions.padding,
                zIndex: 5
            })
                .add(mapNav.navButtonsGroup);
            // Add SVG paths for the default symbols, because the text
            // representation of + and - is not sharp and position is not easy
            // to control.
            if (text === '+' || text === '-') {
                // Mysterious +1 to achieve centering
                const w = width + 1, d = [
                    ['M', padding + 3, padding + height / 2],
                    ['L', padding + w - 3, padding + height / 2]
                ];
                if (text === '+') {
                    d.push(['M', padding + w / 2, padding + 3], ['L', padding + w / 2, padding + height - 3]);
                }
                chart.renderer
                    .path(d)
                    .addClass('highcharts-button-symbol')
                    .attr(chart.styledMode ? {} : {
                    stroke: (_a = buttonOptions.style) === null || _a === void 0 ? void 0 : _a.color,
                    'stroke-width': 3,
                    'stroke-linecap': 'round'
                })
                    .add(button);
            }
            button.handler = buttonOptions.onclick;
            // Stop double click event (#4444)
            addEvent(button.element, 'dblclick', stopEvent);
            navButtons.push(button);
            extend(buttonOptions, {
                width: button.width,
                height: 2 * button.height
            });
            if (!chart.hasLoaded) {
                // Align it after the plotBox is known (#12776)
                const unbind = addEvent(chart, 'load', () => {
                    // #15406: Make sure button hasnt been destroyed
                    if (button.element) {
                        button.align(buttonOptions, false, buttonOptions.alignTo);
                    }
                    unbind();
                });
            }
            else {
                button.align(buttonOptions, false, buttonOptions.alignTo);
            }
        });
        // Borrowed from overlapping-datalabels. Consider a shared module.
        const isIntersectRect = (box1, box2) => !(box2.x >= box1.x + box1.width ||
            box2.x + box2.width <= box1.x ||
            box2.y >= box1.y + box1.height ||
            box2.y + box2.height <= box1.y);
        // Check the mapNavigation buttons collision with exporting button
        // and translate the mapNavigation button if they overlap.
        const adjustMapNavBtn = function () {
            const expBtnBBox = chart.exportingGroup && chart.exportingGroup.getBBox();
            if (expBtnBBox) {
                const navBtnsBBox = mapNav.navButtonsGroup.getBBox();
                // If buttons overlap
                if (isIntersectRect(expBtnBBox, navBtnsBBox)) {
                    // Adjust the mapNav buttons' position by translating them
                    // above or below the exporting button
                    const aboveExpBtn = -navBtnsBBox.y - navBtnsBBox.height +
                        expBtnBBox.y - 5, belowExpBtn = expBtnBBox.y + expBtnBBox.height -
                        navBtnsBBox.y + 5, mapNavVerticalAlign = o.buttonOptions && o.buttonOptions.verticalAlign;
                    // If bottom aligned and adjusting the mapNav button would
                    // translate it out of the plotBox, translate it up
                    // instead of down
                    mapNav.navButtonsGroup.attr({
                        translateY: mapNavVerticalAlign === 'bottom' ?
                            aboveExpBtn :
                            belowExpBtn
                    });
                }
            }
        };
        if (!chart.hasLoaded) {
            // Align it after the plotBox is known (#12776) and after the
            // hamburger button's position is known so they don't overlap
            // (#15782)
            addEvent(chart, 'render', adjustMapNavBtn);
        }
    }
    this.updateEvents(o);
};
/**
 * Update events, called internally from the update function. Add new event
 * handlers, or unbinds events if disabled.
 *
 * @function MapNavigation#updateEvents
 *
 * @param {Highcharts.MapNavigationOptions} options
 *        Options for map navigation.
 *
 * @return {void}
 */
MapNavigation.prototype.updateEvents = function (options) {
    const chart = this.chart;
    // Add the double click event
    if (pick(options.enableDoubleClickZoom, options.enabled) ||
        options.enableDoubleClickZoomTo) {
        this.unbindDblClick = this.unbindDblClick || addEvent(chart.container, 'dblclick', function (e) {
            chart.pointer.onContainerDblClick(e);
        });
    }
    else if (this.unbindDblClick) {
        // Unbind and set unbinder to undefined
        this.unbindDblClick = this.unbindDblClick();
    }
    // Add the mousewheel event
    if (pick(options.enableMouseWheelZoom, options.enabled)) {
        this.unbindMouseWheel = this.unbindMouseWheel || addEvent(chart.container, doc.onwheel !== void 0 ? 'wheel' : // Newer Firefox
            doc.onmousewheel !== void 0 ? 'mousewheel' :
                'DOMMouseScroll', function (e) {
            // Prevent scrolling when the pointer is over the element with
            // that class, for example anotation popup #12100.
            if (!chart.pointer.inClass(e.target, 'highcharts-no-mousewheel')) {
                chart.pointer.onContainerMouseWheel(e);
                // Issue #5011, returning false from non-jQuery event does
                // not prevent default
                stopEvent(e);
            }
            return false;
        });
    }
    else if (this.unbindMouseWheel) {
        // Unbind and set unbinder to undefined
        this.unbindMouseWheel = this.unbindMouseWheel();
    }
};
// Add events to the Chart object itself
extend(Chart.prototype, /** @lends Chart.prototype */ {
    /**
     * Fit an inner box to an outer. If the inner box overflows left or right,
     * align it to the sides of the outer. If it overflows both sides, fit it
     * within the outer. This is a pattern that occurs more places in
     * Highcharts, perhaps it should be elevated to a common utility function.
     *
     * @ignore
     * @function Highcharts.Chart#fitToBox
     *
     * @param {Highcharts.BBoxObject} inner
     *
     * @param {Highcharts.BBoxObject} outer
     *
     * @return {Highcharts.BBoxObject}
     *         The inner box
     */
    fitToBox: function (inner, outer) {
        [['x', 'width'], ['y', 'height']].forEach(function (dim) {
            const pos = dim[0], size = dim[1];
            if (inner[pos] + inner[size] >
                outer[pos] + outer[size]) { // right
                // the general size is greater, fit fully to outer
                if (inner[size] > outer[size]) {
                    inner[size] = outer[size];
                    inner[pos] = outer[pos];
                }
                else { // align right
                    inner[pos] = outer[pos] +
                        outer[size] - inner[size];
                }
            }
            if (inner[size] > outer[size]) {
                inner[size] = outer[size];
            }
            if (inner[pos] < outer[pos]) {
                inner[pos] = outer[pos];
            }
        });
        return inner;
    },
    /**
     * Highcharts Maps only. Zoom in or out of the map. See also
     * {@link Point#zoomTo}. See {@link Chart#fromLatLonToPoint} for how to get
     * the `centerX` and `centerY` parameters for a geographic location.
     *
     * Deprecated as of v9.3 in favor of [MapView.zoomBy](https://api.highcharts.com/class-reference/Highcharts.MapView#zoomBy).
     *
     * @deprecated
     * @function Highcharts.Chart#mapZoom
     *
     * @param {number} [howMuch]
     *        How much to zoom the map. Values less than 1 zooms in. 0.5 zooms
     *        in to half the current view. 2 zooms to twice the current view. If
     *        omitted, the zoom is reset.
     *
     * @param {number} [xProjected]
     *        The projected x position to keep stationary when zooming, if
     *        available space.
     *
     * @param {number} [yProjected]
     *        The projected y position to keep stationary when zooming, if
     *        available space.
     *
     * @param {number} [chartX]
     *        Keep this chart position stationary if possible. This is used for
     *        example in mousewheel events, where the area under the mouse
     *        should be fixed as we zoom in.
     *
     * @param {number} [chartY]
     *        Keep this chart position stationary if possible.
     *
     * @deprecated
     */
    mapZoom: function (howMuch, xProjected, yProjected, chartX, chartY) {
        if (this.mapView) {
            if (isNumber(howMuch)) {
                // Compliance, mapView.zoomBy uses different values
                howMuch = Math.log(howMuch) / Math.log(0.5);
            }
            this.mapView.zoomBy(howMuch, isNumber(xProjected) && isNumber(yProjected) ?
                this.mapView.projection.inverse([xProjected, yProjected]) :
                void 0, isNumber(chartX) && isNumber(chartY) ?
                [chartX, chartY] :
                void 0);
        }
    }
});
// Extend the Chart.render method to add zooming and panning
addEvent(Chart, 'beforeRender', function () {
    // Render the plus and minus buttons. Doing this before the shapes makes
    // getBBox much quicker, at least in Chrome.
    this.mapNavigation = new MapNavigation(this);
    this.mapNavigation.update();
});
H.MapNavigation = MapNavigation;
