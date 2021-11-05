/* *
 *
 *  (c) 2009-2021 Øystein Moseng
 *
 *  Accessibility component for chart legend.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import A from '../../Core/Animation/AnimationUtilities.js';
var animObject = A.animObject;
import Chart from '../../Core/Chart/Chart.js';
import H from '../../Core/Globals.js';
import Legend from '../../Core/Legend/Legend.js';
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, extend = U.extend, fireEvent = U.fireEvent, isNumber = U.isNumber, pick = U.pick, syncTimeout = U.syncTimeout;
import AccessibilityComponent from '../AccessibilityComponent.js';
import KeyboardNavigationHandler from '../KeyboardNavigationHandler.js';
import HTMLUtilities from '../Utils/HTMLUtilities.js';
var stripHTMLTags = HTMLUtilities.stripHTMLTagsFromString, addClass = HTMLUtilities.addClass, removeClass = HTMLUtilities.removeClass;
import ChartUtils from '../Utils/ChartUtilities.js';
var getChartTitle = ChartUtils.getChartTitle;
/* eslint-disable no-invalid-this, valid-jsdoc */
/**
 * @private
 */
function scrollLegendToItem(legend, itemIx) {
    var itemPage = legend.allItems[itemIx].pageIx, curPage = legend.currentPage;
    if (typeof itemPage !== 'undefined' && itemPage + 1 !== curPage) {
        legend.scroll(1 + itemPage - curPage);
    }
}
/**
 * @private
 */
function shouldDoLegendA11y(chart) {
    var items = chart.legend && chart.legend.allItems, legendA11yOptions = (chart.options.legend.accessibility || {});
    return !!(items && items.length &&
        !(chart.colorAxis && chart.colorAxis.length) &&
        legendA11yOptions.enabled !== false);
}
/**
 * Highlight legend item by index.
 *
 * @private
 * @function Highcharts.Chart#highlightLegendItem
 *
 * @param {number} ix
 *
 * @return {boolean}
 */
Chart.prototype.highlightLegendItem = function (ix) {
    var items = this.legend.allItems;
    var oldIx = this.accessibility &&
        this.accessibility.components.legend.highlightedLegendItemIx;
    var itemToHighlight = items[ix];
    if (itemToHighlight) {
        if (isNumber(oldIx) && items[oldIx]) {
            fireEvent(items[oldIx].legendGroup.element, 'mouseout');
        }
        scrollLegendToItem(this.legend, ix);
        var legendItemProp = itemToHighlight.legendItem;
        var proxyBtn = itemToHighlight.a11yProxyElement && itemToHighlight.a11yProxyElement.buttonElement;
        if (legendItemProp && legendItemProp.element && proxyBtn) {
            this.setFocusToElement(legendItemProp, proxyBtn);
        }
        if (itemToHighlight.legendGroup) {
            fireEvent(itemToHighlight.legendGroup.element, 'mouseover');
        }
        return true;
    }
    return false;
};
// Keep track of pressed state for legend items
addEvent(Legend, 'afterColorizeItem', function (e) {
    var chart = this.chart, a11yOptions = chart.options.accessibility, legendItem = e.item;
    if (a11yOptions.enabled && legendItem && legendItem.a11yProxyElement) {
        legendItem.a11yProxyElement.buttonElement.setAttribute('aria-pressed', e.visible ? 'true' : 'false');
    }
});
/**
 * The LegendComponent class
 *
 * @private
 * @class
 * @name Highcharts.LegendComponent
 */
var LegendComponent = function () { };
LegendComponent.prototype = new AccessibilityComponent();
extend(LegendComponent.prototype, /** @lends Highcharts.LegendComponent */ {
    /**
     * Init the component
     * @private
     */
    init: function () {
        var component = this;
        this.recreateProxies();
        // Note: Chart could create legend dynamically, so events can not be
        // tied to the component's chart's current legend.
        this.addEvent(Legend, 'afterScroll', function () {
            if (this.chart === component.chart) {
                component.proxyProvider.updateGroupProxyElementPositions('legend');
                component.updateLegendItemProxyVisibility();
                if (component.highlightedLegendItemIx > -1) {
                    this.chart.highlightLegendItem(component.highlightedLegendItemIx);
                }
            }
        });
        this.addEvent(Legend, 'afterPositionItem', function (e) {
            if (this.chart === component.chart && this.chart.renderer) {
                component.updateProxyPositionForItem(e.item);
            }
        });
        this.addEvent(Legend, 'afterRender', function () {
            if (this.chart === component.chart &&
                this.chart.renderer &&
                component.recreateProxies()) {
                syncTimeout(function () { return component.proxyProvider.updateGroupProxyElementPositions('legend'); }, animObject(pick(this.chart.renderer.globalAnimation, true)).duration);
            }
        });
    },
    /**
     * Update visibility of legend items when using paged legend
     * @private
     */
    updateLegendItemProxyVisibility: function () {
        var chart = this.chart;
        var legend = chart.legend;
        var items = legend.allItems || [];
        var curPage = legend.currentPage || 1;
        var clipHeight = legend.clipHeight || 0;
        items.forEach(function (item) {
            if (item.a11yProxyElement) {
                var hasPages = legend.pages && legend.pages.length;
                var proxyEl = item.a11yProxyElement.element;
                var hide = false;
                if (hasPages) {
                    var itemPage = item.pageIx || 0;
                    var y = item._legendItemPos ? item._legendItemPos[1] : 0;
                    var h = item.legendItem ? Math.round(item.legendItem.getBBox().height) : 0;
                    hide = y + h - legend.pages[itemPage] > clipHeight || itemPage !== curPage - 1;
                }
                if (hide) {
                    if (chart.styledMode) {
                        addClass(proxyEl, 'highcharts-a11y-invisible');
                    }
                    else {
                        proxyEl.style.visibility = 'hidden';
                    }
                }
                else {
                    removeClass(proxyEl, 'highcharts-a11y-invisible');
                    proxyEl.style.visibility = '';
                }
            }
        });
    },
    /**
     * @private
     */
    onChartRender: function () {
        if (!shouldDoLegendA11y(this.chart)) {
            this.removeProxies();
        }
    },
    /**
     * @private
     */
    highlightAdjacentLegendPage: function (direction) {
        var chart = this.chart;
        var legend = chart.legend;
        var curPageIx = legend.currentPage || 1;
        var newPageIx = curPageIx + direction;
        var pages = legend.pages || [];
        if (newPageIx > 0 && newPageIx <= pages.length) {
            var len = legend.allItems.length;
            for (var i = 0; i < len; ++i) {
                if (legend.allItems[i].pageIx + 1 === newPageIx) {
                    var res = chart.highlightLegendItem(i);
                    if (res) {
                        this.highlightedLegendItemIx = i;
                    }
                    return;
                }
            }
        }
    },
    /**
     * @private
     */
    updateProxyPositionForItem: function (item) {
        if (item.a11yProxyElement) {
            item.a11yProxyElement.refreshPosition();
        }
    },
    /**
     * Returns false if legend a11y is disabled and proxies were not created,
     * true otherwise.
     * @private
     */
    recreateProxies: function () {
        this.removeProxies();
        if (shouldDoLegendA11y(this.chart)) {
            this.addLegendProxyGroup();
            this.proxyLegendItems();
            this.updateLegendItemProxyVisibility();
            this.updateLegendTitle();
            return true;
        }
        return false;
    },
    /**
     * @private
     */
    removeProxies: function () {
        this.proxyProvider.removeGroup('legend');
    },
    /**
     * @private
     */
    updateLegendTitle: function () {
        var chart = this.chart;
        var legendTitle = stripHTMLTags((chart.legend &&
            chart.legend.options.title &&
            chart.legend.options.title.text ||
            '').replace(/<br ?\/?>/g, ' '));
        var legendLabel = chart.langFormat('accessibility.legend.legendLabel' + (legendTitle ? '' : 'NoTitle'), {
            chart: chart,
            legendTitle: legendTitle,
            chartTitle: getChartTitle(chart)
        });
        this.proxyProvider.updateGroupAttrs('legend', {
            'aria-label': legendLabel
        });
    },
    /**
     * @private
     */
    addLegendProxyGroup: function () {
        var a11yOptions = this.chart.options.accessibility;
        var groupRole = a11yOptions.landmarkVerbosity === 'all' ? 'region' : null;
        this.proxyProvider.addGroup('legend', 'ul', {
            'aria-label': '_placeholder_',
            role: groupRole
        });
    },
    /**
     * @private
     */
    proxyLegendItems: function () {
        var component = this, items = (this.chart.legend &&
            this.chart.legend.allItems || []);
        items.forEach(function (item) {
            if (item.legendItem && item.legendItem.element) {
                component.proxyLegendItem(item);
            }
        });
    },
    /**
     * @private
     * @param {Highcharts.BubbleLegendItem|Point|Highcharts.Series} item
     */
    proxyLegendItem: function (item) {
        if (!item.legendItem || !item.legendGroup) {
            return;
        }
        var itemLabel = this.chart.langFormat('accessibility.legend.legendItem', {
            chart: this.chart,
            itemName: stripHTMLTags(item.name),
            item: item
        });
        var attribs = {
            tabindex: -1,
            'aria-pressed': item.visible,
            'aria-label': itemLabel
        };
        // Considers useHTML
        var proxyPositioningElement = item.legendGroup.div ? item.legendItem : item.legendGroup;
        item.a11yProxyElement = this.proxyProvider.addProxyElement('legend', {
            click: item.legendItem,
            visual: proxyPositioningElement.element
        }, attribs);
    },
    /**
     * Get keyboard navigation handler for this component.
     * @return {Highcharts.KeyboardNavigationHandler}
     */
    getKeyboardNavigation: function () {
        var keys = this.keyCodes, component = this, chart = this.chart;
        return new KeyboardNavigationHandler(chart, {
            keyCodeMap: [
                [
                    [keys.left, keys.right, keys.up, keys.down],
                    function (keyCode) {
                        return component.onKbdArrowKey(this, keyCode);
                    }
                ],
                [
                    [keys.enter, keys.space],
                    function (keyCode) {
                        if (H.isFirefox && keyCode === keys.space) { // #15520
                            return this.response.success;
                        }
                        return component.onKbdClick(this);
                    }
                ],
                [
                    [keys.pageDown, keys.pageUp],
                    function (keyCode) {
                        var direction = keyCode === keys.pageDown ? 1 : -1;
                        component.highlightAdjacentLegendPage(direction);
                        return this.response.success;
                    }
                ]
            ],
            validate: function () {
                return component.shouldHaveLegendNavigation();
            },
            init: function (direction) {
                return component.onKbdNavigationInit(direction);
            },
            terminate: function () {
                component.highlightedLegendItemIx = -1;
                chart.legend.allItems.forEach(function (item) { return item.setState('', true); });
            }
        });
    },
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @param {number} keyCode
     * @return {number}
     * Response code
     */
    onKbdArrowKey: function (keyboardNavigationHandler, keyCode) {
        var keys = this.keyCodes, response = keyboardNavigationHandler.response, chart = this.chart, a11yOptions = chart.options.accessibility, numItems = chart.legend.allItems.length, direction = (keyCode === keys.left || keyCode === keys.up) ? -1 : 1;
        var res = chart.highlightLegendItem(this.highlightedLegendItemIx + direction);
        if (res) {
            this.highlightedLegendItemIx += direction;
            return response.success;
        }
        if (numItems > 1 &&
            a11yOptions.keyboardNavigation.wrapAround) {
            keyboardNavigationHandler.init(direction);
            return response.success;
        }
        // No wrap, move
        return response[direction > 0 ? 'next' : 'prev'];
    },
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @return {number} Response code
     */
    onKbdClick: function (keyboardNavigationHandler) {
        var legendItem = this.chart.legend.allItems[this.highlightedLegendItemIx];
        if (legendItem && legendItem.a11yProxyElement) {
            legendItem.a11yProxyElement.click();
        }
        return keyboardNavigationHandler.response.success;
    },
    /**
     * @private
     * @return {boolean|undefined}
     */
    shouldHaveLegendNavigation: function () {
        var chart = this.chart, legendOptions = chart.options.legend || {}, hasLegend = chart.legend && chart.legend.allItems, hasColorAxis = chart.colorAxis && chart.colorAxis.length, legendA11yOptions = (legendOptions.accessibility || {});
        return !!(hasLegend &&
            chart.legend.display &&
            !hasColorAxis &&
            legendA11yOptions.enabled &&
            legendA11yOptions.keyboardNavigation &&
            legendA11yOptions.keyboardNavigation.enabled);
    },
    /**
     * @private
     * @param {number} direction
     */
    onKbdNavigationInit: function (direction) {
        var chart = this.chart, lastIx = chart.legend.allItems.length - 1, ixToHighlight = direction > 0 ? 0 : lastIx;
        chart.highlightLegendItem(ixToHighlight);
        this.highlightedLegendItemIx = ixToHighlight;
    }
});
export default LegendComponent;
