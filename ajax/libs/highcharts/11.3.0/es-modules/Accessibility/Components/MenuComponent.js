/* *
 *
 *  (c) 2009-2024 Øystein Moseng
 *
 *  Accessibility component for exporting menu.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Chart from '../../Core/Chart/Chart.js';
import H from '../../Core/Globals.js';
const { composed } = H;
import U from '../../Core/Utilities.js';
const { attr, pushUnique } = U;
import AccessibilityComponent from '../AccessibilityComponent.js';
import KeyboardNavigationHandler from '../KeyboardNavigationHandler.js';
import ChartUtilities from '../Utils/ChartUtilities.js';
const { getChartTitle, unhideChartElementFromAT } = ChartUtilities;
import HTMLUtilities from '../Utils/HTMLUtilities.js';
const { getFakeMouseEvent } = HTMLUtilities;
/* *
 *
 *  Functions
 *
 * */
/**
 * Get the wrapped export button element of a chart.
 * @private
 */
function getExportMenuButtonElement(chart) {
    return chart.exportSVGElements && chart.exportSVGElements[0];
}
/**
 * @private
 */
function exportingShouldHaveA11y(chart) {
    const exportingOpts = chart.options.exporting, exportButton = getExportMenuButtonElement(chart);
    return !!(exportingOpts &&
        exportingOpts.enabled !== false &&
        exportingOpts.accessibility &&
        exportingOpts.accessibility.enabled &&
        exportButton &&
        exportButton.element);
}
/* *
 *
 *  Class
 *
 * */
/**
 * The MenuComponent class
 *
 * @private
 * @class
 * @name Highcharts.MenuComponent
 */
class MenuComponent extends AccessibilityComponent {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Init the component
     */
    init() {
        const chart = this.chart, component = this;
        this.addEvent(chart, 'exportMenuShown', function () {
            component.onMenuShown();
        });
        this.addEvent(chart, 'exportMenuHidden', function () {
            component.onMenuHidden();
        });
        this.createProxyGroup();
    }
    /**
     * @private
     */
    onMenuHidden() {
        const menu = this.chart.exportContextMenu;
        if (menu) {
            menu.setAttribute('aria-hidden', 'true');
        }
        this.setExportButtonExpandedState('false');
    }
    /**
     * @private
     */
    onMenuShown() {
        const chart = this.chart, menu = chart.exportContextMenu;
        if (menu) {
            this.addAccessibleContextMenuAttribs();
            unhideChartElementFromAT(chart, menu);
        }
        this.setExportButtonExpandedState('true');
    }
    /**
     * @private
     * @param {string} stateStr
     */
    setExportButtonExpandedState(stateStr) {
        if (this.exportButtonProxy) {
            this.exportButtonProxy.innerElement.setAttribute('aria-expanded', stateStr);
        }
    }
    /**
     * Called on each render of the chart. We need to update positioning of the
     * proxy overlay.
     */
    onChartRender() {
        const chart = this.chart, focusEl = chart.focusElement, a11y = chart.accessibility;
        this.proxyProvider.clearGroup('chartMenu');
        this.proxyMenuButton();
        if (this.exportButtonProxy &&
            focusEl &&
            focusEl === chart.exportingGroup) {
            if (focusEl.focusBorder) {
                chart.setFocusToElement(focusEl, this.exportButtonProxy.innerElement);
            }
            else if (a11y) {
                a11y.keyboardNavigation.tabindexContainer.focus();
            }
        }
    }
    /**
     * @private
     */
    proxyMenuButton() {
        const chart = this.chart;
        const proxyProvider = this.proxyProvider;
        const buttonEl = getExportMenuButtonElement(chart);
        if (exportingShouldHaveA11y(chart) && buttonEl) {
            this.exportButtonProxy = proxyProvider.addProxyElement('chartMenu', { click: buttonEl }, 'button', {
                'aria-label': chart.langFormat('accessibility.exporting.menuButtonLabel', {
                    chart: chart,
                    chartTitle: getChartTitle(chart)
                }),
                'aria-expanded': false,
                title: chart.options.lang.contextButtonTitle || null
            });
        }
    }
    /**
     * @private
     */
    createProxyGroup() {
        const chart = this.chart;
        if (chart && this.proxyProvider) {
            this.proxyProvider.addGroup('chartMenu');
        }
    }
    /**
     * @private
     */
    addAccessibleContextMenuAttribs() {
        const chart = this.chart, exportList = chart.exportDivElements;
        if (exportList && exportList.length) {
            // Set tabindex on the menu items to allow focusing by script
            // Set role to give screen readers a chance to pick up the contents
            exportList.forEach((item) => {
                if (item) {
                    if (item.tagName === 'LI' &&
                        !(item.children && item.children.length)) {
                        item.setAttribute('tabindex', -1);
                    }
                    else {
                        item.setAttribute('aria-hidden', 'true');
                    }
                }
            });
            // Set accessibility properties on parent div
            const parentDiv = (exportList[0] && exportList[0].parentNode);
            if (parentDiv) {
                attr(parentDiv, {
                    'aria-hidden': void 0,
                    'aria-label': chart.langFormat('accessibility.exporting.chartMenuLabel', { chart }),
                    role: 'list' // Needed for webkit/VO
                });
            }
        }
    }
    /**
     * Get keyboard navigation handler for this component.
     * @private
     */
    getKeyboardNavigation() {
        const keys = this.keyCodes, chart = this.chart, component = this;
        return new KeyboardNavigationHandler(chart, {
            keyCodeMap: [
                // Arrow prev handler
                [
                    [keys.left, keys.up],
                    function () {
                        return component.onKbdPrevious(this);
                    }
                ],
                // Arrow next handler
                [
                    [keys.right, keys.down],
                    function () {
                        return component.onKbdNext(this);
                    }
                ],
                // Click handler
                [
                    [keys.enter, keys.space],
                    function () {
                        return component.onKbdClick(this);
                    }
                ]
            ],
            // Only run exporting navigation if exporting support exists and is
            // enabled on chart
            validate: function () {
                return !!chart.exporting &&
                    chart.options.exporting.enabled !== false &&
                    chart.options.exporting.accessibility.enabled !==
                        false;
            },
            // Focus export menu button
            init: function () {
                const proxy = component.exportButtonProxy;
                const svgEl = component.chart.exportingGroup;
                if (proxy && svgEl) {
                    chart.setFocusToElement(svgEl, proxy.innerElement);
                }
            },
            // Hide the menu
            terminate: function () {
                chart.hideExportMenu();
            }
        });
    }
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @return {number} Response code
     */
    onKbdPrevious(keyboardNavigationHandler) {
        const chart = this.chart;
        const a11yOptions = chart.options.accessibility;
        const response = keyboardNavigationHandler.response;
        // Try to highlight prev item in list. Highlighting e.g.
        // separators will fail.
        let i = chart.highlightedExportItemIx || 0;
        while (i--) {
            if (chart.highlightExportItem(i)) {
                return response.success;
            }
        }
        // We failed, so wrap around or move to prev module
        if (a11yOptions.keyboardNavigation.wrapAround) {
            chart.highlightLastExportItem();
            return response.success;
        }
        return response.prev;
    }
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @return {number} Response code
     */
    onKbdNext(keyboardNavigationHandler) {
        const chart = this.chart;
        const a11yOptions = chart.options.accessibility;
        const response = keyboardNavigationHandler.response;
        // Try to highlight next item in list. Highlighting e.g.
        // separators will fail.
        for (let i = (chart.highlightedExportItemIx || 0) + 1; i < chart.exportDivElements.length; ++i) {
            if (chart.highlightExportItem(i)) {
                return response.success;
            }
        }
        // We failed, so wrap around or move to next module
        if (a11yOptions.keyboardNavigation.wrapAround) {
            chart.highlightExportItem(0);
            return response.success;
        }
        return response.next;
    }
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @return {number} Response code
     */
    onKbdClick(keyboardNavigationHandler) {
        const chart = this.chart;
        const curHighlightedItem = chart.exportDivElements[chart.highlightedExportItemIx];
        const exportButtonElement = getExportMenuButtonElement(chart).element;
        if (chart.openMenu) {
            this.fakeClickEvent(curHighlightedItem);
        }
        else {
            this.fakeClickEvent(exportButtonElement);
            chart.highlightExportItem(0);
        }
        return keyboardNavigationHandler.response.success;
    }
}
/* *
 *
 *  Class Namespace
 *
 * */
(function (MenuComponent) {
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
        if (pushUnique(composed, compose)) {
            const chartProto = Chart.prototype;
            chartProto.hideExportMenu = chartHideExportMenu;
            chartProto.highlightExportItem = chartHighlightExportItem;
            chartProto.highlightLastExportItem = chartHighlightLastExportItem;
            chartProto.showExportMenu = chartShowExportMenu;
        }
    }
    MenuComponent.compose = compose;
    /**
     * Show the export menu and focus the first item (if exists).
     *
     * @private
     * @function Highcharts.Chart#showExportMenu
     */
    function chartShowExportMenu() {
        const exportButton = getExportMenuButtonElement(this);
        if (exportButton) {
            const el = exportButton.element;
            if (el.onclick) {
                el.onclick(getFakeMouseEvent('click'));
            }
        }
    }
    /**
     * @private
     * @function Highcharts.Chart#hideExportMenu
     */
    function chartHideExportMenu() {
        const chart = this, exportList = chart.exportDivElements;
        if (exportList && chart.exportContextMenu && chart.openMenu) {
            // Reset hover states etc.
            exportList.forEach((el) => {
                if (el &&
                    el.className === 'highcharts-menu-item' &&
                    el.onmouseout) {
                    el.onmouseout(getFakeMouseEvent('mouseout'));
                }
            });
            chart.highlightedExportItemIx = 0;
            // Hide the menu div
            chart.exportContextMenu.hideMenu();
            // Make sure the chart has focus and can capture keyboard events
            chart.container.focus();
        }
    }
    /**
     * Highlight export menu item by index.
     *
     * @private
     * @function Highcharts.Chart#highlightExportItem
     */
    function chartHighlightExportItem(ix) {
        const listItem = this.exportDivElements && this.exportDivElements[ix];
        const curHighlighted = this.exportDivElements &&
            this.exportDivElements[this.highlightedExportItemIx];
        if (listItem &&
            listItem.tagName === 'LI' &&
            !(listItem.children && listItem.children.length)) {
            // Test if we have focus support for SVG elements
            const hasSVGFocusSupport = !!(this.renderTo.getElementsByTagName('g')[0] || {}).focus;
            // Only focus if we can set focus back to the elements after
            // destroying the menu (#7422)
            if (listItem.focus && hasSVGFocusSupport) {
                listItem.focus();
            }
            if (curHighlighted && curHighlighted.onmouseout) {
                curHighlighted.onmouseout(getFakeMouseEvent('mouseout'));
            }
            if (listItem.onmouseover) {
                listItem.onmouseover(getFakeMouseEvent('mouseover'));
            }
            this.highlightedExportItemIx = ix;
            return true;
        }
        return false;
    }
    /**
     * Try to highlight the last valid export menu item.
     *
     * @private
     * @function Highcharts.Chart#highlightLastExportItem
     */
    function chartHighlightLastExportItem() {
        const chart = this;
        if (chart.exportDivElements) {
            let i = chart.exportDivElements.length;
            while (i--) {
                if (chart.highlightExportItem(i)) {
                    return true;
                }
            }
        }
        return false;
    }
})(MenuComponent || (MenuComponent = {}));
/* *
 *
 *  Default Export
 *
 * */
export default MenuComponent;
