/* *
 *
 *  (c) 2009-2021 Øystein Moseng
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
import U from '../../Core/Utilities.js';
var attr = U.attr, extend = U.extend;
import AccessibilityComponent from '../AccessibilityComponent.js';
import KeyboardNavigationHandler from '../KeyboardNavigationHandler.js';
import ChartUtilities from '../Utils/ChartUtilities.js';
var getChartTitle = ChartUtilities.getChartTitle, unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
import HTMLUtilities from '../Utils/HTMLUtilities.js';
var getFakeMouseEvent = HTMLUtilities.getFakeMouseEvent;
/* eslint-disable no-invalid-this, valid-jsdoc */
/**
 * Get the wrapped export button element of a chart.
 *
 * @private
 * @param {Highcharts.Chart} chart
 * @returns {Highcharts.SVGElement}
 */
function getExportMenuButtonElement(chart) {
    return chart.exportSVGElements && chart.exportSVGElements[0];
}
/**
 * Show the export menu and focus the first item (if exists).
 *
 * @private
 * @function Highcharts.Chart#showExportMenu
 */
Chart.prototype.showExportMenu = function () {
    var exportButton = getExportMenuButtonElement(this);
    if (exportButton) {
        var el = exportButton.element;
        if (el.onclick) {
            el.onclick(getFakeMouseEvent('click'));
        }
    }
};
/**
 * @private
 * @function Highcharts.Chart#hideExportMenu
 */
Chart.prototype.hideExportMenu = function () {
    var chart = this, exportList = chart.exportDivElements;
    if (exportList && chart.exportContextMenu) {
        // Reset hover states etc.
        exportList.forEach(function (el) {
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
};
/**
 * Highlight export menu item by index.
 *
 * @private
 * @function Highcharts.Chart#highlightExportItem
 *
 * @param {number} ix
 *
 * @return {boolean}
 */
Chart.prototype.highlightExportItem = function (ix) {
    var listItem = this.exportDivElements && this.exportDivElements[ix];
    var curHighlighted = this.exportDivElements &&
        this.exportDivElements[this.highlightedExportItemIx];
    if (listItem &&
        listItem.tagName === 'LI' &&
        !(listItem.children && listItem.children.length)) {
        // Test if we have focus support for SVG elements
        var hasSVGFocusSupport = !!(this.renderTo.getElementsByTagName('g')[0] || {}).focus;
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
};
/**
 * Try to highlight the last valid export menu item.
 *
 * @private
 * @function Highcharts.Chart#highlightLastExportItem
 * @return {boolean}
 */
Chart.prototype.highlightLastExportItem = function () {
    var chart = this;
    if (chart.exportDivElements) {
        var i = chart.exportDivElements.length;
        while (i--) {
            if (chart.highlightExportItem(i)) {
                return true;
            }
        }
    }
    return false;
};
/**
 * @private
 * @param {Highcharts.Chart} chart
 */
function exportingShouldHaveA11y(chart) {
    var exportingOpts = chart.options.exporting, exportButton = getExportMenuButtonElement(chart);
    return !!(exportingOpts &&
        exportingOpts.enabled !== false &&
        exportingOpts.accessibility &&
        exportingOpts.accessibility.enabled &&
        exportButton &&
        exportButton.element);
}
/**
 * The MenuComponent class
 *
 * @private
 * @class
 * @name Highcharts.MenuComponent
 */
var MenuComponent = function () { };
MenuComponent.prototype = new AccessibilityComponent();
extend(MenuComponent.prototype, /** @lends Highcharts.MenuComponent */ {
    /**
     * Init the component
     */
    init: function () {
        var chart = this.chart, component = this;
        this.addEvent(chart, 'exportMenuShown', function () {
            component.onMenuShown();
        });
        this.addEvent(chart, 'exportMenuHidden', function () {
            component.onMenuHidden();
        });
        this.createProxyGroup();
    },
    /**
     * @private
     */
    onMenuHidden: function () {
        var menu = this.chart.exportContextMenu;
        if (menu) {
            menu.setAttribute('aria-hidden', 'true');
        }
        this.isExportMenuShown = false;
        this.setExportButtonExpandedState('false');
    },
    /**
     * @private
     */
    onMenuShown: function () {
        var chart = this.chart, menu = chart.exportContextMenu;
        if (menu) {
            this.addAccessibleContextMenuAttribs();
            unhideChartElementFromAT(chart, menu);
        }
        this.isExportMenuShown = true;
        this.setExportButtonExpandedState('true');
    },
    /**
     * @private
     * @param {string} stateStr
     */
    setExportButtonExpandedState: function (stateStr) {
        if (this.exportButtonProxy) {
            this.exportButtonProxy.buttonElement.setAttribute('aria-expanded', stateStr);
        }
    },
    /**
     * Called on each render of the chart. We need to update positioning of the
     * proxy overlay.
     */
    onChartRender: function () {
        this.proxyProvider.clearGroup('chartMenu');
        this.proxyMenuButton();
    },
    /**
     * @private
     */
    proxyMenuButton: function () {
        var chart = this.chart;
        var proxyProvider = this.proxyProvider;
        var buttonEl = getExportMenuButtonElement(chart);
        if (exportingShouldHaveA11y(chart) && buttonEl) {
            this.exportButtonProxy = proxyProvider.addProxyElement('chartMenu', { click: buttonEl }, {
                'aria-label': chart.langFormat('accessibility.exporting.menuButtonLabel', {
                    chart: chart,
                    chartTitle: getChartTitle(chart)
                }),
                'aria-expanded': false
            });
        }
    },
    /**
     * @private
     */
    createProxyGroup: function () {
        var chart = this.chart;
        if (chart && this.proxyProvider) {
            this.proxyProvider.addGroup('chartMenu', 'div');
        }
    },
    /**
     * @private
     */
    addAccessibleContextMenuAttribs: function () {
        var chart = this.chart, exportList = chart.exportDivElements;
        if (exportList && exportList.length) {
            // Set tabindex on the menu items to allow focusing by script
            // Set role to give screen readers a chance to pick up the contents
            exportList.forEach(function (item) {
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
            var parentDiv = (exportList[0] && exportList[0].parentNode);
            if (parentDiv) {
                attr(parentDiv, {
                    'aria-hidden': void 0,
                    'aria-label': chart.langFormat('accessibility.exporting.chartMenuLabel', { chart: chart }),
                    role: 'list' // Needed for webkit/VO
                });
            }
        }
    },
    /**
     * Get keyboard navigation handler for this component.
     * @return {Highcharts.KeyboardNavigationHandler}
     */
    getKeyboardNavigation: function () {
        var keys = this.keyCodes, chart = this.chart, component = this;
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
                var proxy = component.exportButtonProxy;
                var svgEl = component.chart.exportingGroup;
                if (proxy && svgEl) {
                    chart.setFocusToElement(svgEl, proxy.buttonElement);
                }
            },
            // Hide the menu
            terminate: function () {
                chart.hideExportMenu();
            }
        });
    },
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @return {number} Response code
     */
    onKbdPrevious: function (keyboardNavigationHandler) {
        var chart = this.chart;
        var a11yOptions = chart.options.accessibility;
        var response = keyboardNavigationHandler.response;
        // Try to highlight prev item in list. Highlighting e.g.
        // separators will fail.
        var i = chart.highlightedExportItemIx || 0;
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
    },
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @return {number} Response code
     */
    onKbdNext: function (keyboardNavigationHandler) {
        var chart = this.chart;
        var a11yOptions = chart.options.accessibility;
        var response = keyboardNavigationHandler.response;
        // Try to highlight next item in list. Highlighting e.g.
        // separators will fail.
        for (var i = (chart.highlightedExportItemIx || 0) + 1; i < chart.exportDivElements.length; ++i) {
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
    },
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @return {number} Response code
     */
    onKbdClick: function (keyboardNavigationHandler) {
        var chart = this.chart;
        var curHighlightedItem = chart.exportDivElements[chart.highlightedExportItemIx];
        var exportButtonElement = getExportMenuButtonElement(chart).element;
        if (this.isExportMenuShown) {
            this.fakeClickEvent(curHighlightedItem);
        }
        else {
            this.fakeClickEvent(exportButtonElement);
            chart.highlightExportItem(0);
        }
        return keyboardNavigationHandler.response.success;
    }
});
export default MenuComponent;
