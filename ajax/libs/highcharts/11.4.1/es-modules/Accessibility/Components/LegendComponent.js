/* *
 *
 *  (c) 2009-2024 Øystein Moseng
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
const { animObject } = A;
import H from '../../Core/Globals.js';
const { doc } = H;
import Legend from '../../Core/Legend/Legend.js';
import U from '../../Core/Utilities.js';
const { addEvent, fireEvent, isNumber, pick, syncTimeout } = U;
import AccessibilityComponent from '../AccessibilityComponent.js';
import KeyboardNavigationHandler from '../KeyboardNavigationHandler.js';
import CU from '../Utils/ChartUtilities.js';
const { getChartTitle } = CU;
import HU from '../Utils/HTMLUtilities.js';
const { stripHTMLTagsFromString: stripHTMLTags, addClass, removeClass } = HU;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function scrollLegendToItem(legend, itemIx) {
    const itemPage = (legend.allItems[itemIx].legendItem || {}).pageIx, curPage = legend.currentPage;
    if (typeof itemPage !== 'undefined' && itemPage + 1 !== curPage) {
        legend.scroll(1 + itemPage - curPage);
    }
}
/**
 * @private
 */
function shouldDoLegendA11y(chart) {
    const items = chart.legend && chart.legend.allItems, legendA11yOptions = (chart.options.legend.accessibility || {}), unsupportedColorAxis = chart.colorAxis && chart.colorAxis.some((c) => !c.dataClasses || !c.dataClasses.length);
    return !!(items && items.length &&
        !unsupportedColorAxis &&
        legendA11yOptions.enabled !== false);
}
/**
 * @private
 */
function setLegendItemHoverState(hoverActive, item) {
    const legendItem = item.legendItem || {};
    item.setState(hoverActive ? 'hover' : '', true);
    for (const key of ['group', 'label', 'symbol']) {
        const svgElement = legendItem[key];
        const element = svgElement && svgElement.element || svgElement;
        if (element) {
            fireEvent(element, hoverActive ? 'mouseover' : 'mouseout');
        }
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * The LegendComponent class
 *
 * @private
 * @class
 * @name Highcharts.LegendComponent
 */
class LegendComponent extends AccessibilityComponent {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.highlightedLegendItemIx = NaN;
        this.proxyGroup = null;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Init the component
     * @private
     */
    init() {
        const component = this;
        this.recreateProxies();
        // Note: Chart could create legend dynamically, so events cannot be
        // tied to the component's chart's current legend.
        // @todo 1. attach component to created legends
        // @todo 2. move listeners to composition and access `this.component`
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
                syncTimeout(() => component.proxyProvider
                    .updateGroupProxyElementPositions('legend'), animObject(pick(this.chart.renderer.globalAnimation, true)).duration);
            }
        });
    }
    /**
     * Update visibility of legend items when using paged legend
     * @private
     */
    updateLegendItemProxyVisibility() {
        const chart = this.chart;
        const legend = chart.legend;
        const items = legend.allItems || [];
        const curPage = legend.currentPage || 1;
        const clipHeight = legend.clipHeight || 0;
        let legendItem;
        items.forEach((item) => {
            if (item.a11yProxyElement) {
                const hasPages = legend.pages && legend.pages.length;
                const proxyEl = item.a11yProxyElement.element;
                let hide = false;
                legendItem = item.legendItem || {};
                if (hasPages) {
                    const itemPage = legendItem.pageIx || 0;
                    const y = legendItem.y || 0;
                    const h = legendItem.label ?
                        Math.round(legendItem.label.getBBox().height) :
                        0;
                    hide = y + h - legend.pages[itemPage] > clipHeight ||
                        itemPage !== curPage - 1;
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
    }
    /**
     * @private
     */
    onChartRender() {
        if (!shouldDoLegendA11y(this.chart)) {
            this.removeProxies();
        }
    }
    /**
     * @private
     */
    highlightAdjacentLegendPage(direction) {
        const chart = this.chart;
        const legend = chart.legend;
        const curPageIx = legend.currentPage || 1;
        const newPageIx = curPageIx + direction;
        const pages = legend.pages || [];
        if (newPageIx > 0 && newPageIx <= pages.length) {
            let i = 0, res;
            for (const item of legend.allItems) {
                if (((item.legendItem || {}).pageIx || 0) + 1 === newPageIx) {
                    res = chart.highlightLegendItem(i);
                    if (res) {
                        this.highlightedLegendItemIx = i;
                    }
                }
                ++i;
            }
        }
    }
    /**
     * @private
     */
    updateProxyPositionForItem(item) {
        if (item.a11yProxyElement) {
            item.a11yProxyElement.refreshPosition();
        }
    }
    /**
     * Returns false if legend a11y is disabled and proxies were not created,
     * true otherwise.
     * @private
     */
    recreateProxies() {
        const focusedElement = doc.activeElement;
        const proxyGroup = this.proxyGroup;
        const shouldRestoreFocus = focusedElement && proxyGroup &&
            proxyGroup.contains(focusedElement);
        this.removeProxies();
        if (shouldDoLegendA11y(this.chart)) {
            this.addLegendProxyGroup();
            this.proxyLegendItems();
            this.updateLegendItemProxyVisibility();
            this.updateLegendTitle();
            if (shouldRestoreFocus) {
                this.chart.highlightLegendItem(this.highlightedLegendItemIx);
            }
            return true;
        }
        return false;
    }
    /**
     * @private
     */
    removeProxies() {
        this.proxyProvider.removeGroup('legend');
    }
    /**
     * @private
     */
    updateLegendTitle() {
        const chart = this.chart;
        const legendTitle = stripHTMLTags((chart.legend &&
            chart.legend.options.title &&
            chart.legend.options.title.text ||
            '').replace(/<br ?\/?>/g, ' '), chart.renderer.forExport);
        const legendLabel = chart.langFormat('accessibility.legend.legendLabel' + (legendTitle ? '' : 'NoTitle'), {
            chart,
            legendTitle,
            chartTitle: getChartTitle(chart)
        });
        this.proxyProvider.updateGroupAttrs('legend', {
            'aria-label': legendLabel
        });
    }
    /**
     * @private
     */
    addLegendProxyGroup() {
        const a11yOptions = this.chart.options.accessibility;
        const groupRole = a11yOptions.landmarkVerbosity === 'all' ?
            'region' : null;
        this.proxyGroup = this.proxyProvider.addGroup('legend', 'ul', {
            // Filled by updateLegendTitle, to keep up to date without
            // recreating group
            'aria-label': '_placeholder_',
            role: groupRole
        });
    }
    /**
     * @private
     */
    proxyLegendItems() {
        const component = this, items = (this.chart.legend || {}).allItems || [];
        let legendItem;
        items.forEach((item) => {
            legendItem = item.legendItem || {};
            if (legendItem.label && legendItem.label.element) {
                component.proxyLegendItem(item);
            }
        });
    }
    /**
     * @private
     * @param {Highcharts.BubbleLegendItem|Point|Highcharts.Series} item
     */
    proxyLegendItem(item) {
        const legendItem = item.legendItem || {};
        if (!legendItem.label || !legendItem.group) {
            return;
        }
        const itemLabel = this.chart.langFormat('accessibility.legend.legendItem', {
            chart: this.chart,
            itemName: stripHTMLTags(item.name, this.chart.renderer.forExport),
            item
        });
        const attribs = {
            tabindex: -1,
            'aria-pressed': item.visible,
            'aria-label': itemLabel
        };
        // Considers useHTML
        const proxyPositioningElement = legendItem.group.div ?
            legendItem.label :
            legendItem.group;
        item.a11yProxyElement = this.proxyProvider.addProxyElement('legend', {
            click: legendItem.label,
            visual: proxyPositioningElement.element
        }, 'button', attribs);
    }
    /**
     * Get keyboard navigation handler for this component.
     * @private
     */
    getKeyboardNavigation() {
        const keys = this.keyCodes, component = this, chart = this.chart;
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
                    function () {
                        return component.onKbdClick(this);
                    }
                ],
                [
                    [keys.pageDown, keys.pageUp],
                    function (keyCode) {
                        const direction = keyCode === keys.pageDown ? 1 : -1;
                        component.highlightAdjacentLegendPage(direction);
                        return this.response.success;
                    }
                ]
            ],
            validate: function () {
                return component.shouldHaveLegendNavigation();
            },
            init: function () {
                chart.highlightLegendItem(0);
                component.highlightedLegendItemIx = 0;
            },
            terminate: function () {
                component.highlightedLegendItemIx = -1;
                chart.legend.allItems.forEach((item) => setLegendItemHoverState(false, item));
            }
        });
    }
    /**
     * Arrow key navigation
     * @private
     */
    onKbdArrowKey(keyboardNavigationHandler, key) {
        const { keyCodes: { left, up }, highlightedLegendItemIx, chart } = this, numItems = chart.legend.allItems.length, wrapAround = chart.options.accessibility
            .keyboardNavigation.wrapAround, direction = (key === left || key === up) ? -1 : 1, res = chart.highlightLegendItem(highlightedLegendItemIx + direction);
        if (res) {
            this.highlightedLegendItemIx += direction;
        }
        else if (wrapAround && numItems > 1) {
            this.highlightedLegendItemIx = direction > 0 ?
                0 : numItems - 1;
            chart.highlightLegendItem(this.highlightedLegendItemIx);
        }
        return keyboardNavigationHandler.response.success;
    }
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @return {number} Response code
     */
    onKbdClick(keyboardNavigationHandler) {
        const legendItem = this.chart.legend.allItems[this.highlightedLegendItemIx];
        if (legendItem && legendItem.a11yProxyElement) {
            legendItem.a11yProxyElement.click();
        }
        return keyboardNavigationHandler.response.success;
    }
    /**
     * @private
     */
    shouldHaveLegendNavigation() {
        if (!shouldDoLegendA11y(this.chart)) {
            return false;
        }
        const chart = this.chart, legendOptions = chart.options.legend || {}, legendA11yOptions = (legendOptions.accessibility || {});
        return !!(chart.legend.display &&
            legendA11yOptions.keyboardNavigation &&
            legendA11yOptions.keyboardNavigation.enabled);
    }
    /**
     * Clean up
     * @private
     */
    destroy() {
        this.removeProxies();
    }
}
/* *
 *
 *  Class Namespace
 *
 * */
(function (LegendComponent) {
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
     * Highlight legend item by index.
     * @private
     */
    function chartHighlightLegendItem(ix) {
        const items = this.legend.allItems;
        const oldIx = this.accessibility &&
            this.accessibility.components.legend.highlightedLegendItemIx;
        const itemToHighlight = items[ix], legendItem = itemToHighlight?.legendItem || {};
        if (itemToHighlight) {
            if (isNumber(oldIx) && items[oldIx]) {
                setLegendItemHoverState(false, items[oldIx]);
            }
            scrollLegendToItem(this.legend, ix);
            const legendItemProp = legendItem.label;
            const proxyBtn = itemToHighlight.a11yProxyElement &&
                itemToHighlight.a11yProxyElement.element;
            if (legendItemProp && legendItemProp.element && proxyBtn) {
                this.setFocusToElement(legendItemProp, proxyBtn);
            }
            setLegendItemHoverState(true, itemToHighlight);
            return true;
        }
        return false;
    }
    /**
     * @private
     */
    function compose(ChartClass, LegendClass) {
        const chartProto = ChartClass.prototype;
        if (!chartProto.highlightLegendItem) {
            chartProto.highlightLegendItem = chartHighlightLegendItem;
            addEvent(LegendClass, 'afterColorizeItem', legendOnAfterColorizeItem);
        }
    }
    LegendComponent.compose = compose;
    /**
     * Keep track of pressed state for legend items.
     * @private
     */
    function legendOnAfterColorizeItem(e) {
        const chart = this.chart, a11yOptions = chart.options.accessibility, legendItem = e.item;
        if (a11yOptions.enabled && legendItem && legendItem.a11yProxyElement) {
            legendItem.a11yProxyElement.innerElement.setAttribute('aria-pressed', e.visible ? 'true' : 'false');
        }
    }
})(LegendComponent || (LegendComponent = {}));
/* *
 *
 *  Default Export
 *
 * */
export default LegendComponent;
