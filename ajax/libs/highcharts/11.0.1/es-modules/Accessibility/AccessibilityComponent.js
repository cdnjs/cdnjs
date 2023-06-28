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
const { fireEventOnWrappedOrUnwrappedElement } = CU;
import DOMElementProvider from './Utils/DOMElementProvider.js';
import EventProvider from './Utils/EventProvider.js';
import HU from './Utils/HTMLUtilities.js';
const { getFakeMouseEvent } = HU;
import U from '../Core/Utilities.js';
const { extend } = U;
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
class AccessibilityComponent {
    constructor() {
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
    initBase(chart, proxyProvider) {
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
    }
    /**
     * Add an event to an element and keep track of it for later removal.
     * See EventProvider for details.
     * @private
     */
    addEvent(el, type, fn, options) {
        return this.eventProvider.addEvent(el, type, fn, options);
    }
    /**
     * Create an element and keep track of it for later removal.
     * See DOMElementProvider for details.
     * @private
     */
    createElement(tagName, options) {
        return this.domElementProvider.createElement(tagName, options);
    }
    /**
     * Fire a fake click event on an element. It is useful to have this on
     * AccessibilityComponent for users of custom components.
     */
    fakeClickEvent(el) {
        const fakeEvent = getFakeMouseEvent('click');
        fireEventOnWrappedOrUnwrappedElement(el, fakeEvent);
    }
    /**
     * Remove traces of the component.
     * @private
     */
    destroyBase() {
        this.domElementProvider.destroyCreatedElements();
        this.eventProvider.removeAddedEvents();
    }
}
extend(AccessibilityComponent.prototype, 
/** @lends Highcharts.AccessibilityComponent */
{
    /**
     * Called on component initialization.
     */
    init() { },
    /**
     * Get keyboard navigation handler for this component.
     * @private
     */
    getKeyboardNavigation: function () { },
    /**
     * Called on updates to the chart, including options changes.
     * Note that this is also called on first render of chart.
     */
    onChartUpdate() { },
    /**
     * Called on every chart render.
     */
    onChartRender() { },
    /**
     * Called when accessibility is disabled or chart is destroyed.
     */
    destroy() { }
});
/* *
 *
 *  Default Export
 *
 * */
export default AccessibilityComponent;
