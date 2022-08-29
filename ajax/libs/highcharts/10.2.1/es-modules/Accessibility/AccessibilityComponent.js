/* *
 *
 *  (c) 2009-2021 Øystein Moseng
 *
 *  Accessibility component class definition
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import CU from './Utils/ChartUtilities.js';
var fireEventOnWrappedOrUnwrappedElement = CU.fireEventOnWrappedOrUnwrappedElement;
import DOMElementProvider from './Utils/DOMElementProvider.js';
import EventProvider from './Utils/EventProvider.js';
import HU from './Utils/HTMLUtilities.js';
var getFakeMouseEvent = HU.getFakeMouseEvent;
import U from '../Core/Utilities.js';
var extend = U.extend;
/* *
 *
 *  Class
 *
 * */
/**
 * The AccessibilityComponent base class, representing a part of the chart that
 * has accessibility logic connected to it. This class can be inherited from to
 * create a custom accessibility component for a chart.
 *
 * Components should take care to destroy added elements and unregister event
 * handlers on destroy. This is handled automatically if using this.addEvent and
 * this.createElement.
 *
 * @sample highcharts/accessibility/custom-component
 *         Custom accessibility component
 *
 * @requires module:modules/accessibility
 * @class
 * @name Highcharts.AccessibilityComponent
 */
var AccessibilityComponent = /** @class */ (function () {
    function AccessibilityComponent() {
        /* *
         *
         *  Properties
         *
         * */
        this.chart = void 0;
        this.domElementProvider = void 0;
        this.eventProvider = void 0;
        this.keyCodes = void 0;
        this.proxyProvider = void 0;
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Initialize the class
     * @private
     * @param {Highcharts.Chart} chart The chart object
     * @param {Highcharts.ProxyProvider} proxyProvider The proxy provider of the accessibility module
     */
    AccessibilityComponent.prototype.initBase = function (chart, proxyProvider) {
        this.chart = chart;
        this.eventProvider = new EventProvider();
        this.domElementProvider = new DOMElementProvider();
        this.proxyProvider = proxyProvider;
        // Key code enum for common keys
        this.keyCodes = {
            left: 37,
            right: 39,
            up: 38,
            down: 40,
            enter: 13,
            space: 32,
            esc: 27,
            tab: 9,
            pageUp: 33,
            pageDown: 34,
            end: 35,
            home: 36
        };
    };
    /**
     * Add an event to an element and keep track of it for later removal.
     * See EventProvider for details.
     * @private
     */
    AccessibilityComponent.prototype.addEvent = function (el, type, fn, options) {
        return this.eventProvider.addEvent(el, type, fn, options);
    };
    /**
     * Create an element and keep track of it for later removal.
     * See DOMElementProvider for details.
     * @private
     */
    AccessibilityComponent.prototype.createElement = function (tagName, options) {
        return this.domElementProvider.createElement(tagName, options);
    };
    /**
     * Fire a fake click event on an element. It is useful to have this on
     * AccessibilityComponent for users of custom components.
     */
    AccessibilityComponent.prototype.fakeClickEvent = function (el) {
        var fakeEvent = getFakeMouseEvent('click');
        fireEventOnWrappedOrUnwrappedElement(el, fakeEvent);
    };
    /**
     * Remove traces of the component.
     * @private
     */
    AccessibilityComponent.prototype.destroyBase = function () {
        this.domElementProvider.destroyCreatedElements();
        this.eventProvider.removeAddedEvents();
    };
    return AccessibilityComponent;
}());
extend(AccessibilityComponent.prototype, 
/** @lends Highcharts.AccessibilityComponent */
{
    /**
     * Called on component initialization.
     */
    init: function () { },
    /**
     * Get keyboard navigation handler for this component.
     * @private
     */
    getKeyboardNavigation: function () { },
    /**
     * Called on updates to the chart, including options changes.
     * Note that this is also called on first render of chart.
     */
    onChartUpdate: function () { },
    /**
     * Called on every chart render.
     */
    onChartRender: function () { },
    /**
     * Called when accessibility is disabled or chart is destroyed.
     */
    destroy: function () { }
});
/* *
 *
 *  Default Export
 *
 * */
export default AccessibilityComponent;
