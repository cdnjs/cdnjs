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
import StackItem from './Stacking/StackItem.js';
import U from '../Utilities.js';
const { addEvent, objectEach } = U;
/**
 * @private
 */
var WaterfallAxis;
(function (WaterfallAxis) {
    /* *
     *
     *  Interfaces
     *
     * */
    /* *
     *
     *  Classes
     *
     * */
    /**
     * @private
     */
    class Composition {
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /* *
         *
         *  Constructors
         *
         * */
        /**
         * @private
         */
        constructor(axis) {
            this.axis = axis;
            this.stacks = {
                changed: false
            };
        }
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Calls StackItem.prototype.render function that creates and renders
         * stack total label for each waterfall stack item.
         *
         * @private
         * @function Highcharts.Axis#renderWaterfallStackTotals
         */
        renderStackTotals() {
            const yAxis = this.axis, waterfallStacks = yAxis.waterfall.stacks, stackTotalGroup = (yAxis.stacking && yAxis.stacking.stackTotalGroup), dummyStackItem = new StackItem(yAxis, yAxis.options.stackLabels || {}, false, 0, void 0);
            this.dummyStackItem = dummyStackItem;
            // Render each waterfall stack total
            if (stackTotalGroup) {
                objectEach(waterfallStacks, function (type) {
                    objectEach(type, function (stackItem, key) {
                        dummyStackItem.total = stackItem.stackTotal;
                        dummyStackItem.x = +key;
                        if (stackItem.label) {
                            dummyStackItem.label = stackItem.label;
                        }
                        StackItem.prototype.render.call(dummyStackItem, stackTotalGroup);
                        stackItem.label = dummyStackItem.label;
                        delete dummyStackItem.label;
                    });
                });
            }
            dummyStackItem.total = null;
        }
    }
    WaterfallAxis.Composition = Composition;
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable no-invalid-this, valid-jsdoc */
    /**
     * @private
     */
    function compose(AxisClass, ChartClass) {
        addEvent(AxisClass, 'init', onInit);
        addEvent(AxisClass, 'afterBuildStacks', onAfterBuildStacks);
        addEvent(AxisClass, 'afterRender', onAfterRender);
        addEvent(ChartClass, 'beforeRedraw', onBeforeRedraw);
    }
    WaterfallAxis.compose = compose;
    /**
     * @private
     */
    function onAfterBuildStacks() {
        const axis = this;
        const stacks = axis.waterfall.stacks;
        if (stacks) {
            stacks.changed = false;
            delete stacks.alreadyChanged;
        }
    }
    /**
     * @private
     */
    function onAfterRender() {
        const axis = this;
        const stackLabelOptions = axis.options.stackLabels;
        if (stackLabelOptions && stackLabelOptions.enabled &&
            axis.waterfall.stacks) {
            axis.waterfall.renderStackTotals();
        }
    }
    /**
     * @private
     */
    function onBeforeRedraw() {
        let axes = this.axes, series = this.series, i = series.length;
        while (i--) {
            if (series[i].options.stacking) {
                axes.forEach(function (axis) {
                    if (!axis.isXAxis) {
                        axis.waterfall.stacks.changed = true;
                    }
                });
                i = 0;
            }
        }
    }
    /**
     * @private
     */
    function onInit() {
        const axis = this;
        if (!axis.waterfall) {
            axis.waterfall = new Composition(axis);
        }
    }
})(WaterfallAxis || (WaterfallAxis = {}));
/* *
 *
 *  Default Export
 *
 * */
export default WaterfallAxis;
