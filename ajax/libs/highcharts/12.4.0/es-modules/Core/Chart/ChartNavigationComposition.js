/**
 *
 *  (c) 2010-2025 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* *
 *
 *  Composition
 *
 * */
var ChartNavigationComposition;
(function (ChartNavigationComposition) {
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
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(chart) {
        if (!chart.navigation) {
            chart.navigation = new Additions(chart);
        }
        return chart;
    }
    ChartNavigationComposition.compose = compose;
    /* *
     *
     *  Class
     *
     * */
    /**
     * Initializes `chart.navigation` object which delegates `update()` methods
     * to all other common classes (used in exporting and navigationBindings).
     * @private
     */
    class Additions {
        /* *
         *
         *  Constructor
         *
         * */
        constructor(chart) {
            this.updates = [];
            this.chart = chart;
        }
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Registers an `update()` method in the `chart.navigation` object.
         *
         * @private
         * @param {UpdateFunction} updateFn
         * The `update()` method that will be called in `chart.update()`.
         */
        addUpdate(updateFn) {
            this.chart.navigation.updates.push(updateFn);
        }
        /**
         * @private
         */
        update(options, redraw) {
            this.updates.forEach((updateFn) => {
                updateFn.call(this.chart, options, redraw);
            });
        }
    }
    ChartNavigationComposition.Additions = Additions;
})(ChartNavigationComposition || (ChartNavigationComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ChartNavigationComposition;
