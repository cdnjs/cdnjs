/* *
 *
 *  (c) 2009-2025 Øystein Moseng
 *
 *  Accessibility component for chart zoom.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import AccessibilityComponent from '../AccessibilityComponent.js';
import CU from '../Utils/ChartUtilities.js';
const { unhideChartElementFromAT } = CU;
import HU from '../Utils/HTMLUtilities.js';
const { getFakeMouseEvent } = HU;
import KeyboardNavigationHandler from '../KeyboardNavigationHandler.js';
import U from '../../Core/Utilities.js';
const { attr, pick } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function chartHasMapZoom(chart) {
    return !!((chart.mapView) &&
        chart.mapNavigation &&
        chart.mapNavigation.navButtons.length);
}
/* *
 *
 *  Class
 *
 * */
/**
 * The ZoomComponent class
 *
 * @private
 * @class
 * @name Highcharts.ZoomComponent
 */
class ZoomComponent extends AccessibilityComponent {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.focusedMapNavButtonIx = -1;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initialize the component
     */
    init() {
        const component = this, chart = this.chart;
        this.proxyProvider.addGroup('zoom', 'div');
        [
            'afterShowResetZoom', 'afterApplyDrilldown', 'drillupall'
        ].forEach((eventType) => {
            component.addEvent(chart, eventType, function () {
                component.updateProxyOverlays();
            });
        });
    }
    /**
     * Called when chart is updated
     */
    onChartUpdate() {
        const chart = this.chart, component = this;
        // Make map zoom buttons accessible
        if (chart.mapNavigation) {
            chart.mapNavigation.navButtons.forEach((button, i) => {
                unhideChartElementFromAT(chart, button.element);
                component.setMapNavButtonAttrs(button.element, 'accessibility.zoom.mapZoom' + (i ? 'Out' : 'In'));
            });
        }
    }
    /**
     * @private
     * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} button
     * @param {string} labelFormatKey
     */
    setMapNavButtonAttrs(button, labelFormatKey) {
        const chart = this.chart, label = chart.langFormat(labelFormatKey, { chart: chart });
        attr(button, {
            tabindex: -1,
            role: 'button',
            'aria-label': label
        });
    }
    /**
     * Update the proxy overlays on every new render to ensure positions are
     * correct.
     */
    onChartRender() {
        this.updateProxyOverlays();
    }
    /**
     * Update proxy overlays, recreating the buttons.
     */
    updateProxyOverlays() {
        const chart = this.chart;
        // Always start with a clean slate
        this.proxyProvider.clearGroup('zoom');
        if (chart.resetZoomButton) {
            this.createZoomProxyButton(chart.resetZoomButton, 'resetZoomProxyButton', chart.langFormat('accessibility.zoom.resetZoomButton', { chart: chart }));
        }
        if (chart.drillUpButton &&
            chart.breadcrumbs &&
            chart.breadcrumbs.list) {
            const lastBreadcrumb = chart.breadcrumbs.list[chart.breadcrumbs.list.length - 1];
            this.createZoomProxyButton(chart.drillUpButton, 'drillUpProxyButton', chart.langFormat('accessibility.drillUpButton', {
                chart: chart,
                buttonText: chart.breadcrumbs.getButtonText(lastBreadcrumb)
            }));
        }
    }
    /**
     * @private
     * @param {Highcharts.SVGElement} buttonEl
     * @param {string} buttonProp
     * @param {string} label
     */
    createZoomProxyButton(buttonEl, buttonProp, label) {
        this[buttonProp] = this.proxyProvider.addProxyElement('zoom', {
            click: buttonEl
        }, 'button', {
            'aria-label': label,
            tabindex: -1
        });
    }
    /**
     * Get keyboard navigation handler for map zoom.
     * @private
     * @return {Highcharts.KeyboardNavigationHandler} The module object
     */
    getMapZoomNavigation() {
        const keys = this.keyCodes, chart = this.chart, component = this;
        return new KeyboardNavigationHandler(chart, {
            keyCodeMap: [
                [
                    [keys.up, keys.down, keys.left, keys.right],
                    function (keyCode) {
                        return component.onMapKbdArrow(this, keyCode);
                    }
                ],
                [
                    [keys.tab],
                    function (_keyCode, e) {
                        return component.onMapKbdTab(this, e);
                    }
                ],
                [
                    [keys.space, keys.enter],
                    function () {
                        return component.onMapKbdClick(this);
                    }
                ]
            ],
            validate: function () {
                return chartHasMapZoom(chart);
            },
            init: function (direction) {
                return component.onMapNavInit(direction);
            }
        });
    }
    /**
     * Arrow key panning for maps.
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler The handler context.
     * @param {number} keyCode Key pressed.
     * @return {number} Response code
     */
    onMapKbdArrow(keyboardNavigationHandler, keyCode) {
        const chart = this.chart, keys = this.keyCodes, target = chart.container, isY = keyCode === keys.up || keyCode === keys.down, stepDirection = (keyCode === keys.left || keyCode === keys.up) ?
            1 : -1, granularity = 10, diff = (isY ? chart.plotHeight : chart.plotWidth) /
            granularity * stepDirection, 
        // Randomize since same mousedown coords twice is ignored in MapView
        r = Math.random() * 10, startPos = {
            x: target.offsetLeft + chart.plotLeft + chart.plotWidth / 2 + r,
            y: target.offsetTop + chart.plotTop + chart.plotHeight / 2 + r
        }, endPos = isY ? { x: startPos.x, y: startPos.y + diff } :
            { x: startPos.x + diff, y: startPos.y };
        [
            getFakeMouseEvent('mousedown', startPos),
            getFakeMouseEvent('mousemove', endPos),
            getFakeMouseEvent('mouseup', endPos)
        ].forEach((e) => target.dispatchEvent(e));
        return keyboardNavigationHandler.response.success;
    }
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @param {global.KeyboardEvent} event
     * @return {number} Response code
     */
    onMapKbdTab(keyboardNavigationHandler, event) {
        const chart = this.chart;
        const response = keyboardNavigationHandler.response;
        const isBackwards = event.shiftKey;
        const isMoveOutOfRange = isBackwards && !this.focusedMapNavButtonIx ||
            !isBackwards && this.focusedMapNavButtonIx;
        // Deselect old
        chart.mapNavigation.navButtons[this.focusedMapNavButtonIx].setState(0);
        if (isMoveOutOfRange) {
            if (chart.mapView) {
                chart.mapView.zoomBy(); // Reset zoom
            }
            return response[isBackwards ? 'prev' : 'next'];
        }
        // Select other button
        this.focusedMapNavButtonIx += isBackwards ? -1 : 1;
        const button = chart.mapNavigation.navButtons[this.focusedMapNavButtonIx];
        chart.setFocusToElement(button.box, button.element);
        button.setState(2);
        return response.success;
    }
    /**
     * Called on map button click.
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler The handler context object
     * @return {number} Response code
     */
    onMapKbdClick(keyboardNavigationHandler) {
        const el = this.chart.mapNavigation.navButtons[this.focusedMapNavButtonIx].element;
        this.fakeClickEvent(el);
        return keyboardNavigationHandler.response.success;
    }
    /**
     * @private
     * @param {number} direction
     */
    onMapNavInit(direction) {
        const chart = this.chart, zoomIn = chart.mapNavigation.navButtons[0], zoomOut = chart.mapNavigation.navButtons[1], initialButton = direction > 0 ? zoomIn : zoomOut;
        chart.setFocusToElement(initialButton.box, initialButton.element);
        initialButton.setState(2);
        this.focusedMapNavButtonIx = direction > 0 ? 0 : 1;
    }
    /**
     * Get keyboard navigation handler for a simple chart button. Provide the
     * button reference for the chart, and a function to call on click.
     *
     * @private
     * @param {string} buttonProp The property on chart referencing the button.
     * @return {Highcharts.KeyboardNavigationHandler} The module object
     */
    simpleButtonNavigation(buttonProp, proxyProp, onClick) {
        const keys = this.keyCodes, component = this, chart = this.chart;
        return new KeyboardNavigationHandler(chart, {
            keyCodeMap: [
                [
                    [keys.tab, keys.up, keys.down, keys.left, keys.right],
                    function (keyCode, e) {
                        const isBackwards = (keyCode === keys.tab && e.shiftKey ||
                            keyCode === keys.left ||
                            keyCode === keys.up);
                        // Arrow/tab => just move
                        return this.response[isBackwards ? 'prev' : 'next'];
                    }
                ],
                [
                    [keys.space, keys.enter],
                    function () {
                        const res = onClick(this, chart);
                        return pick(res, this.response.success);
                    }
                ]
            ],
            validate: function () {
                const hasButton = (chart[buttonProp] &&
                    chart[buttonProp].box &&
                    component[proxyProp].innerElement);
                return hasButton;
            },
            init: function () {
                chart.setFocusToElement(chart[buttonProp].box, component[proxyProp].innerElement);
            }
        });
    }
    /**
     * Get keyboard navigation handlers for this component.
     * @return {Array<Highcharts.KeyboardNavigationHandler>}
     *         List of module objects
     */
    getKeyboardNavigation() {
        return [
            this.simpleButtonNavigation('resetZoomButton', 'resetZoomProxyButton', function (_handler, chart) {
                chart.zoomOut();
            }),
            this.simpleButtonNavigation('drillUpButton', 'drillUpProxyButton', function (handler, chart) {
                chart.drillUp();
                return handler.response.prev;
            }),
            this.getMapZoomNavigation()
        ];
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default ZoomComponent;
