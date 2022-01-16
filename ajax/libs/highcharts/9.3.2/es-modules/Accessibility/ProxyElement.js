/* *
 *
 *  (c) 2009-2021 Øystein Moseng
 *
 *  Proxy elements are used to shadow SVG elements in HTML for assistive
 *  technology, such as screen readers or voice input software.
 *
 *  The ProxyElement class represents such an element, and deals with
 *  overlay positioning and mirroring events for the target.
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
var attr = U.attr, css = U.css, merge = U.merge;
import EventProvider from './Utils/EventProvider.js';
import ChartUtilities from './Utils/ChartUtilities.js';
var fireEventOnWrappedOrUnwrappedElement = ChartUtilities.fireEventOnWrappedOrUnwrappedElement;
import HTMLUtilities from './Utils/HTMLUtilities.js';
var cloneMouseEvent = HTMLUtilities.cloneMouseEvent, cloneTouchEvent = HTMLUtilities.cloneTouchEvent, getFakeMouseEvent = HTMLUtilities.getFakeMouseEvent, removeElement = HTMLUtilities.removeElement;
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a proxy element that overlays a target and relays events
 * to its target.
 *
 * @private
 * @class
 */
var ProxyElement = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    function ProxyElement(chart, target, groupType, attributes) {
        this.chart = chart;
        this.target = target;
        this.groupType = groupType;
        var isListItem = groupType === 'ul';
        this.eventProvider = new EventProvider();
        var wrapperEl = isListItem ? doc.createElement('li') : null;
        var btnEl = this.buttonElement = doc.createElement('button');
        if (!chart.styledMode) {
            this.hideButtonVisually(btnEl);
        }
        if (wrapperEl) {
            if (isListItem && !chart.styledMode) {
                wrapperEl.style.listStyle = 'none';
            }
            wrapperEl.appendChild(btnEl);
            this.element = wrapperEl;
        }
        else {
            this.element = btnEl;
        }
        this.updateTarget(target, attributes);
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Fake a click event on the target.
     */
    ProxyElement.prototype.click = function () {
        var pos = this.getTargetPosition();
        pos.x += pos.width / 2;
        pos.y += pos.height / 2;
        var fakeEventObject = getFakeMouseEvent('click', pos);
        fireEventOnWrappedOrUnwrappedElement(this.target.click, fakeEventObject);
    };
    /**
     * Update the target to be proxied. The position and events are updated to
     * match the new target.
     * @param target The new target definition
     * @param attributes New HTML attributes to apply to the button. Set an
     * attribute to null to remove.
     */
    ProxyElement.prototype.updateTarget = function (target, attributes) {
        this.target = target;
        this.updateCSSClassName();
        attr(this.buttonElement, merge({
            'aria-label': this.getTargetAttr(target.click, 'aria-label')
        }, attributes));
        this.eventProvider.removeAddedEvents();
        this.addProxyEventsToButton(this.buttonElement, target.click);
        this.refreshPosition();
    };
    /**
     * Refresh the position of the proxy element to match the current target
     */
    ProxyElement.prototype.refreshPosition = function () {
        var bBox = this.getTargetPosition();
        css(this.buttonElement, {
            width: (bBox.width || 1) + 'px',
            height: (bBox.height || 1) + 'px',
            left: (Math.round(bBox.x) || 0) + 'px',
            top: (Math.round(bBox.y) || 0) + 'px'
        });
    };
    /**
     * Remove button from DOM, and clear events.
     */
    ProxyElement.prototype.remove = function () {
        this.eventProvider.removeAddedEvents();
        removeElement(this.element);
    };
    // -------------------------- private ------------------------------------
    /**
     * Update the CSS class name to match target
     */
    ProxyElement.prototype.updateCSSClassName = function () {
        var stringHasNoTooltip = function (s) { return (s.indexOf('highcharts-no-tooltip') > -1); };
        var legend = this.chart.legend;
        var groupDiv = legend.group && legend.group.div;
        var noTooltipOnGroup = stringHasNoTooltip(groupDiv && groupDiv.className || '');
        var targetClassName = this.getTargetAttr(this.target.click, 'class') || '';
        var noTooltipOnTarget = stringHasNoTooltip(targetClassName);
        this.buttonElement.className = noTooltipOnGroup || noTooltipOnTarget ?
            'highcharts-a11y-proxy-button highcharts-no-tooltip' :
            'highcharts-a11y-proxy-button';
    };
    /**
     * Mirror events for a proxy button to a target
     */
    ProxyElement.prototype.addProxyEventsToButton = function (button, target) {
        var _this = this;
        [
            'click', 'touchstart', 'touchend', 'touchcancel', 'touchmove',
            'mouseover', 'mouseenter', 'mouseleave', 'mouseout'
        ].forEach(function (evtType) {
            var isTouchEvent = evtType.indexOf('touch') === 0;
            _this.eventProvider.addEvent(button, evtType, function (e) {
                var clonedEvent = isTouchEvent ?
                    cloneTouchEvent(e) :
                    cloneMouseEvent(e);
                if (target) {
                    fireEventOnWrappedOrUnwrappedElement(target, clonedEvent);
                }
                e.stopPropagation();
                // #9682, #15318: Touch scrolling didnt work when touching
                // proxy
                if (!isTouchEvent) {
                    e.preventDefault();
                }
            }, { passive: false });
        });
    };
    /**
     * Set visually hidden style on a proxy button
     */
    ProxyElement.prototype.hideButtonVisually = function (button) {
        css(button, {
            borderWidth: 0,
            backgroundColor: 'transparent',
            cursor: 'pointer',
            outline: 'none',
            opacity: 0.001,
            filter: 'alpha(opacity=1)',
            zIndex: 999,
            overflow: 'hidden',
            padding: 0,
            margin: 0,
            display: 'block',
            position: 'absolute',
            '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=1)'
        });
    };
    /**
     * Get the position relative to chart container for the target
     */
    ProxyElement.prototype.getTargetPosition = function () {
        var clickTarget = this.target.click;
        // We accept both DOM elements and wrapped elements as click targets.
        var clickTargetElement = clickTarget.element ?
            clickTarget.element :
            clickTarget;
        var posElement = this.target.visual || clickTargetElement;
        var chartDiv = this.chart.renderTo;
        if (chartDiv && posElement && posElement.getBoundingClientRect) {
            var rectEl = posElement.getBoundingClientRect(), rectDiv = chartDiv.getBoundingClientRect();
            return {
                x: rectEl.left - rectDiv.left,
                y: rectEl.top - rectDiv.top,
                width: rectEl.right - rectEl.left,
                height: rectEl.bottom - rectEl.top
            };
        }
        return { x: 0, y: 0, width: 1, height: 1 };
    };
    /**
     * Get an attribute value of a target
     */
    ProxyElement.prototype.getTargetAttr = function (target, key) {
        if (target.element) {
            return target.element.getAttribute(key);
        }
        return target.getAttribute(key);
    };
    return ProxyElement;
}());
/* *
 *
 *  Default Export
 *
 * */
export default ProxyElement;
