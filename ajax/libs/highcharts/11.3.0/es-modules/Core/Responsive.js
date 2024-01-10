/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from './Globals.js';
const { composed } = H;
import U from './Utilities.js';
const { diffObjects, extend, find, merge, pick, pushUnique, uniqueKey } = U;
/* *
 *
 *  Composition
 *
 * */
var Responsive;
(function (Responsive) {
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
     * @private
     */
    function compose(ChartClass) {
        if (pushUnique(composed, compose)) {
            extend(ChartClass.prototype, {
                matchResponsiveRule,
                setResponsive
            });
        }
        return ChartClass;
    }
    Responsive.compose = compose;
    /**
     * Handle a single responsiveness rule.
     *
     * @private
     * @function Highcharts.Chart#matchResponsiveRule
     * @param {Highcharts.ResponsiveRulesOptions} rule
     * @param {Array<string>} matches
     */
    function matchResponsiveRule(rule, matches) {
        const condition = rule.condition, fn = condition.callback || function () {
            return (this.chartWidth <= pick(condition.maxWidth, Number.MAX_VALUE) &&
                this.chartHeight <= pick(condition.maxHeight, Number.MAX_VALUE) &&
                this.chartWidth >= pick(condition.minWidth, 0) &&
                this.chartHeight >= pick(condition.minHeight, 0));
        };
        if (fn.call(this)) {
            matches.push(rule._id);
        }
    }
    /**
     * Update the chart based on the current chart/document size and options
     * for responsiveness.
     *
     * @private
     * @function Highcharts.Chart#setResponsive
     * @param  {boolean} [redraw=true]
     * @param  {boolean} [reset=false]
     * Reset by un-applying all rules. Chart.update resets all rules before
     * applying updated options.
     */
    function setResponsive(redraw, reset) {
        const options = this.options.responsive, currentResponsive = this.currentResponsive;
        let ruleIds = [], undoOptions;
        if (!reset && options && options.rules) {
            options.rules.forEach((rule) => {
                if (typeof rule._id === 'undefined') {
                    rule._id = uniqueKey();
                }
                this.matchResponsiveRule(rule, ruleIds /* , redraw */);
            }, this);
        }
        // Merge matching rules
        const mergedOptions = merge(...ruleIds
            .map((ruleId) => find((options || {}).rules || [], (rule) => (rule._id === ruleId)))
            .map((rule) => (rule && rule.chartOptions)));
        mergedOptions.isResponsiveOptions = true;
        // Stringified key for the rules that currently apply.
        ruleIds = (ruleIds.toString() || void 0);
        const currentRuleIds = (currentResponsive && currentResponsive.ruleIds);
        // Changes in what rules apply
        if (ruleIds !== currentRuleIds) {
            // Undo previous rules. Before we apply a new set of rules, we
            // need to roll back completely to base options (#6291).
            if (currentResponsive) {
                this.update(currentResponsive.undoOptions, redraw, true);
            }
            if (ruleIds) {
                // Get undo-options for matching rules. The `undoOptions``
                // hold the current values before they are changed by the
                // `mergedOptions`.
                undoOptions = diffObjects(mergedOptions, this.options, true, this.collectionsWithUpdate);
                undoOptions.isResponsiveOptions = true;
                this.currentResponsive = {
                    ruleIds: ruleIds,
                    mergedOptions: mergedOptions,
                    undoOptions: undoOptions
                };
                this.update(mergedOptions, redraw, true);
            }
            else {
                this.currentResponsive = void 0;
            }
        }
    }
})(Responsive || (Responsive = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Responsive;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * A callback function to gain complete control on when the responsive rule
 * applies.
 *
 * @callback Highcharts.ResponsiveCallbackFunction
 *
 * @param {Highcharts.Chart} this
 * Chart context.
 *
 * @return {boolean}
 * Return `true` if it applies.
 */
(''); // keeps doclets above in JS file
/* *
 *
 *  API Options
 *
 * */
/**
 * Allows setting a set of rules to apply for different screen or chart
 * sizes. Each rule specifies additional chart options.
 *
 * @sample {highstock} stock/demo/responsive/
 *         Stock chart
 * @sample highcharts/responsive/axis/
 *         Axis
 * @sample highcharts/responsive/legend/
 *         Legend
 * @sample highcharts/responsive/classname/
 *         Class name
 *
 * @since     5.0.0
 * @apioption responsive
 */
/**
 * A set of rules for responsive settings. The rules are executed from
 * the top down.
 *
 * @sample {highcharts} highcharts/responsive/axis/
 *         Axis changes
 * @sample {highstock} highcharts/responsive/axis/
 *         Axis changes
 * @sample {highmaps} highcharts/responsive/axis/
 *         Axis changes
 *
 * @type      {Array<*>}
 * @since     5.0.0
 * @apioption responsive.rules
 */
/**
 * A full set of chart options to apply as overrides to the general
 * chart options. The chart options are applied when the given rule
 * is active.
 *
 * A special case is configuration objects that take arrays, for example
 * [xAxis](#xAxis), [yAxis](#yAxis) or [series](#series). For these
 * collections, an `id` option is used to map the new option set to
 * an existing object. If an existing object of the same id is not found,
 * the item of the same indexupdated. So for example, setting `chartOptions`
 * with two series items without an `id`, will cause the existing chart's
 * two series to be updated with respective options.
 *
 * @sample {highstock} stock/demo/responsive/
 *         Stock chart
 * @sample highcharts/responsive/axis/
 *         Axis
 * @sample highcharts/responsive/legend/
 *         Legend
 * @sample highcharts/responsive/classname/
 *         Class name
 *
 * @type      {Highcharts.Options}
 * @since     5.0.0
 * @apioption responsive.rules.chartOptions
 */
/**
 * Under which conditions the rule applies.
 *
 * @since     5.0.0
 * @apioption responsive.rules.condition
 */
/**
 * A callback function to gain complete control on when the responsive
 * rule applies. Return `true` if it applies. This opens for checking
 * against other metrics than the chart size, for example the document
 * size or other elements.
 *
 * @type      {Highcharts.ResponsiveCallbackFunction}
 * @since     5.0.0
 * @context   Highcharts.Chart
 * @apioption responsive.rules.condition.callback
 */
/**
 * The responsive rule applies if the chart height is less than this.
 *
 * @type      {number}
 * @since     5.0.0
 * @apioption responsive.rules.condition.maxHeight
 */
/**
 * The responsive rule applies if the chart width is less than this.
 *
 * @sample highcharts/responsive/axis/
 *         Max width is 500
 *
 * @type      {number}
 * @since     5.0.0
 * @apioption responsive.rules.condition.maxWidth
 */
/**
 * The responsive rule applies if the chart height is greater than this.
 *
 * @type      {number}
 * @default   0
 * @since     5.0.0
 * @apioption responsive.rules.condition.minHeight
 */
/**
 * The responsive rule applies if the chart width is greater than this.
 *
 * @type      {number}
 * @default   0
 * @since     5.0.0
 * @apioption responsive.rules.condition.minWidth
 */
(''); // keeps doclets above in JS file
