/* *
 *
 *  Networkgraph series
 *
 *  (c) 2010-2021 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import A from '../Core/Animation/AnimationUtilities.js';
const { setAnimation } = A;
import U from '../Core/Utilities.js';
const { addEvent } = U;
/* *
 *
 *  Constants
 *
 * */
const composedMembers = [];
const integrations = {};
const layouts = {};
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function compose(ChartClass) {
    if (U.pushUnique(composedMembers, ChartClass)) {
        addEvent(ChartClass, 'afterPrint', onChartAfterPrint);
        addEvent(ChartClass, 'beforePrint', onChartBeforePrint);
        addEvent(ChartClass, 'predraw', onChartPredraw);
        addEvent(ChartClass, 'render', onChartRender);
    }
}
/**
 * Re-enable simulation after print.
 * @private
 */
function onChartAfterPrint() {
    if (this.graphLayoutsLookup) {
        this.graphLayoutsLookup.forEach((layout) => {
            // return to default simulation
            layout.updateSimulation();
        });
        this.redraw();
    }
}
/**
 * Disable simulation before print if enabled.
 * @private
 */
function onChartBeforePrint() {
    if (this.graphLayoutsLookup) {
        this.graphLayoutsLookup.forEach((layout) => {
            layout.updateSimulation(false);
        });
        this.redraw();
    }
}
/**
 * Clear previous layouts.
 * @private
 */
function onChartPredraw() {
    if (this.graphLayoutsLookup) {
        this.graphLayoutsLookup.forEach((layout) => {
            layout.stop();
        });
    }
}
/**
 * @private
 */
function onChartRender() {
    let systemsStable, afterRender = false;
    const layoutStep = (layout) => {
        if (layout.maxIterations-- &&
            isFinite(layout.temperature) &&
            !layout.isStable() &&
            !layout.enableSimulation) {
            // Hook similar to build-in addEvent, but instead of
            // creating whole events logic, use just a function.
            // It's faster which is important for rAF code.
            // Used e.g. in packed-bubble series for bubble radius
            // calculations
            if (layout.beforeStep) {
                layout.beforeStep();
            }
            layout.step();
            systemsStable = false;
            afterRender = true;
        }
    };
    if (this.graphLayoutsLookup) {
        setAnimation(false, this);
        // Start simulation
        this.graphLayoutsLookup.forEach((layout) => layout.start());
        // Just one sync step, to run different layouts similar to
        // async mode.
        while (!systemsStable) {
            systemsStable = true;
            this.graphLayoutsLookup.forEach(layoutStep);
        }
        if (afterRender) {
            this.series.forEach((series) => {
                if (series && series.layout) {
                    series.render();
                }
            });
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
const GraphLayoutComposition = {
    compose,
    integrations,
    layouts
};
export default GraphLayoutComposition;
