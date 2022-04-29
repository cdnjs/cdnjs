/* *
 *
 *  (c) 2009-2021 Øystein Moseng
 *
 *  Proxy elements are used to shadow SVG elements in HTML for assistive
 *  technology, such as screen readers or voice input software.
 *
 *  The ProxyProvider keeps track of all proxy elements of the a11y module,
 *  and updating their order and positioning.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../Core/Globals.js';
var doc = H.doc;
import U from '../Core/Utilities.js';
var attr = U.attr, css = U.css;
import CU from './Utils/ChartUtilities.js';
var unhideChartElementFromAT = CU.unhideChartElementFromAT;
import DOMElementProvider from './Utils/DOMElementProvider.js';
import HU from './Utils/HTMLUtilities.js';
var removeElement = HU.removeElement, removeChildNodes = HU.removeChildNodes;
import ProxyElement from './ProxyElement.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Keeps track of all proxy elements and proxy groups.
 *
 * @private
 * @class
 */
var ProxyProvider = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    function ProxyProvider(chart) {
        this.chart = chart;
        this.domElementProvider = new DOMElementProvider();
        this.groups = {};
        this.groupOrder = [];
        this.beforeChartProxyPosContainer = this.createProxyPosContainer('before');
        this.afterChartProxyPosContainer = this.createProxyPosContainer('after');
        this.update();
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable */
    /**
     * Add a new proxy element to a group, proxying a target control.
     */
    ProxyProvider.prototype.addProxyElement = function (groupKey, target, attributes) {
        var group = this.groups[groupKey];
        if (!group) {
            throw new Error('ProxyProvider.addProxyElement: Invalid group key ' + groupKey);
        }
        var proxy = new ProxyElement(this.chart, target, group.type, attributes);
        group.proxyContainerElement.appendChild(proxy.element);
        group.proxyElements.push(proxy);
        return proxy;
    };
    /**
     * Create a group that will contain proxy elements. The group order is
     * automatically updated according to the last group order keys.
     *
     * Returns the added group.
     */
    ProxyProvider.prototype.addGroup = function (groupKey, groupType, attributes) {
        var existingGroup = this.groups[groupKey];
        if (existingGroup) {
            return existingGroup.groupElement;
        }
        var proxyContainer = this.domElementProvider.createElement(groupType);
        // If we want to add a role to the group, and still use e.g.
        // a list group, we need a wrapper div.
        var groupElement;
        if (attributes && attributes.role && groupType !== 'div') {
            groupElement = this.domElementProvider.createElement('div');
            groupElement.appendChild(proxyContainer);
        }
        else {
            groupElement = proxyContainer;
        }
        groupElement.className = 'highcharts-a11y-proxy-group highcharts-a11y-proxy-group-' +
            groupKey.replace(/\W/g, '-');
        this.groups[groupKey] = {
            proxyContainerElement: proxyContainer,
            groupElement: groupElement,
            type: groupType,
            proxyElements: []
        };
        attr(groupElement, attributes || {});
        if (groupType === 'ul') {
            proxyContainer.setAttribute('role', 'list'); // Needed for webkit
        }
        // Add the group to the end by default, and perhaps then we
        // won't have to reorder the whole set of groups.
        this.afterChartProxyPosContainer.appendChild(groupElement);
        this.updateGroupOrder(this.groupOrder);
        return groupElement;
    };
    /**
     * Update HTML attributes of a group.
     */
    ProxyProvider.prototype.updateGroupAttrs = function (groupKey, attributes) {
        var group = this.groups[groupKey];
        if (!group) {
            throw new Error('ProxyProvider.updateGroupAttrs: Invalid group key ' + groupKey);
        }
        attr(group.groupElement, attributes);
    };
    /**
     * Reorder the proxy groups.
     *
     * The group key "series" refers to the chart's data points / <svg> element.
     * This is so that the keyboardNavigation.order option can be used to
     * determine the proxy group order.
     */
    ProxyProvider.prototype.updateGroupOrder = function (groupKeys) {
        var _this = this;
        // Store so that we can update order when a new group is created
        this.groupOrder = groupKeys.slice();
        // Don't unnecessarily reorder, because keyboard focus is lost
        if (this.isDOMOrderGroupOrder()) {
            return;
        }
        var seriesIx = groupKeys.indexOf('series');
        var beforeKeys = seriesIx > -1 ? groupKeys.slice(0, seriesIx) : groupKeys;
        var afterKeys = seriesIx > -1 ? groupKeys.slice(seriesIx + 1) : [];
        // Store focused element since it will be lost when reordering
        var activeElement = doc.activeElement;
        // Add groups to correct container
        ['before', 'after'].forEach(function (pos) {
            var posContainer = _this[pos === 'before' ?
                'beforeChartProxyPosContainer' :
                'afterChartProxyPosContainer'];
            var keys = pos === 'before' ? beforeKeys : afterKeys;
            removeChildNodes(posContainer);
            keys.forEach(function (groupKey) {
                var group = _this.groups[groupKey];
                if (group) {
                    posContainer.appendChild(group.groupElement);
                }
            });
        });
        // Attempt to restore focus after reordering, but note that this may
        // cause screen readers re-announcing the button.
        if ((this.beforeChartProxyPosContainer.contains(activeElement) ||
            this.afterChartProxyPosContainer.contains(activeElement)) &&
            activeElement && activeElement.focus) {
            activeElement.focus();
        }
    };
    /**
     * Remove all proxy elements in a group
     */
    ProxyProvider.prototype.clearGroup = function (groupKey) {
        var group = this.groups[groupKey];
        if (!group) {
            throw new Error('ProxyProvider.clearGroup: Invalid group key ' + groupKey);
        }
        removeChildNodes(group.proxyContainerElement);
    };
    /**
     * Remove a group from the DOM and from the proxy provider's group list.
     * All child elements are removed.
     * If the group does not exist, nothing happens.
     */
    ProxyProvider.prototype.removeGroup = function (groupKey) {
        var group = this.groups[groupKey];
        if (group) {
            removeElement(group.groupElement);
            delete this.groups[groupKey];
        }
    };
    /**
     * Update the position and order of all proxy groups and elements
     */
    ProxyProvider.prototype.update = function () {
        this.updatePosContainerPositions();
        this.updateGroupOrder(this.groupOrder);
        this.updateProxyElementPositions();
    };
    /**
     * Update all proxy element positions
     */
    ProxyProvider.prototype.updateProxyElementPositions = function () {
        Object.keys(this.groups).forEach(this.updateGroupProxyElementPositions.bind(this));
    };
    /**
     * Update a group's proxy elements' positions.
     * If the group does not exist, nothing happens.
     */
    ProxyProvider.prototype.updateGroupProxyElementPositions = function (groupKey) {
        var group = this.groups[groupKey];
        if (group) {
            group.proxyElements.forEach(function (el) { return el.refreshPosition(); });
        }
    };
    /**
     * Remove all added elements
     */
    ProxyProvider.prototype.destroy = function () {
        this.domElementProvider.destroyCreatedElements();
    };
    // -------------------------- private ------------------------------------
    /**
     * Create and return a pos container element (the overall containers for
     * the proxy groups).
     */
    ProxyProvider.prototype.createProxyPosContainer = function (classNamePostfix) {
        var el = this.domElementProvider.createElement('div');
        el.setAttribute('aria-hidden', 'false');
        el.className = 'highcharts-a11y-proxy-container' + (classNamePostfix ? '-' + classNamePostfix : '');
        css(el, {
            top: '0',
            left: '0'
        });
        if (!this.chart.styledMode) {
            el.style.whiteSpace = 'nowrap';
            el.style.position = 'absolute';
        }
        return el;
    };
    /**
     * Get an array of group keys that corresponds to the current group order
     * in the DOM.
     */
    ProxyProvider.prototype.getCurrentGroupOrderInDOM = function () {
        var _this = this;
        var getGroupKeyFromElement = function (el) {
            var allGroups = Object.keys(_this.groups);
            var i = allGroups.length;
            while (i--) {
                var groupKey = allGroups[i];
                var group = _this.groups[groupKey];
                if (group && el === group.groupElement) {
                    return groupKey;
                }
            }
        };
        var getChildrenGroupOrder = function (el) {
            var childrenOrder = [];
            var children = el.children;
            for (var i = 0; i < children.length; ++i) {
                var groupKey = getGroupKeyFromElement(children[i]);
                if (groupKey) {
                    childrenOrder.push(groupKey);
                }
            }
            return childrenOrder;
        };
        var before = getChildrenGroupOrder(this.beforeChartProxyPosContainer);
        var after = getChildrenGroupOrder(this.afterChartProxyPosContainer);
        before.push('series');
        return before.concat(after);
    };
    /**
     * Check if the current DOM order matches the current group order, so that
     * a reordering/update is unnecessary.
     */
    ProxyProvider.prototype.isDOMOrderGroupOrder = function () {
        var _this = this;
        var domOrder = this.getCurrentGroupOrderInDOM();
        var groupOrderWithGroups = this.groupOrder.filter(function (x) { return x === 'series' || !!_this.groups[x]; });
        var i = domOrder.length;
        if (i !== groupOrderWithGroups.length) {
            return false;
        }
        while (i--) {
            if (domOrder[i] !== groupOrderWithGroups[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Update the DOM positions of the before/after proxy
     * positioning containers for the groups.
     */
    ProxyProvider.prototype.updatePosContainerPositions = function () {
        var chart = this.chart;
        // If exporting, don't add these containers to the DOM.
        if (chart.renderer.forExport) {
            return;
        }
        var rendererSVGEl = chart.renderer.box;
        chart.container.insertBefore(this.afterChartProxyPosContainer, rendererSVGEl.nextSibling);
        chart.container.insertBefore(this.beforeChartProxyPosContainer, rendererSVGEl);
        unhideChartElementFromAT(this.chart, this.afterChartProxyPosContainer);
        unhideChartElementFromAT(this.chart, this.beforeChartProxyPosContainer);
    };
    return ProxyProvider;
}());
/* *
 *
 *  Export Default
 *
 * */
export default ProxyProvider;
