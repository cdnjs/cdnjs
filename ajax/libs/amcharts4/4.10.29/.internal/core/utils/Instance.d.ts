import { Sprite } from "../Sprite";
import { ITheme } from "../../themes/ITheme";
import * as $type from "./Type";
/**
 * Disposes all of the currently active charts.
 */
export declare function disposeAllCharts(): void;
export declare function addToQueue(sprite: Sprite): void;
export declare function removeFromQueue(sprite: Sprite): void;
/**
 * Checks whether the chart was not initialized fully due to setting
 * of `onlyShowOnViewport`. If it hasn't and is now in the viewport
 * the chart will be initialized.
 *
 * @since 4.9.12
 * @param  sprite  Top-level chart object
 */
export declare function viewPortHandler(sprite: Sprite): void;
export declare function queueHandler(sprite: Sprite): void;
/**
 * A shortcut to creating a chart instance.
 *
 * The first argument is either a reference to or an id of a DOM element to be
 * used as a container for the chart.
 *
 * The second argument is the type reference of the chart type. (for plain
 * JavaScript users this can also be a string indicating chart type)
 *
 * ```TypeScript
 * let chart = am4core.create("chartdiv", am4charts.PieChart);
 * ```
 * ```JavaScript
 * // Can pass in chart type reference like this:
 * var chart = am4core.create("chartdiv", am4charts.PieChart);
 *
 * // ... or chart class type as a string:
 * var chart = am4core.create("chartdiv", "PieChart");
 * ```
 *
 * @param htmlElement  Reference or id of the target container element
 * @param classType    Class type of the target chart type
 * @return Chart instance
 */
export declare function create<T extends Sprite>(htmlElement: $type.Optional<HTMLElement | string>, classType: {
    new (): T;
}): T;
/**
 * A shortcut to creating a chart from a config object.
 *
 * Example:
 *
 * ```TypeScript
 * let chart am4core.createFromConfig({ ... }, "chartdiv", am4charts.XYChart );
 * ```
 * ```JavaScript
 * var chart am4core.createFromConfig({ ... }, "chartdiv", "XYChart" );
 * ```
 *
 * If `chartType` parameter is not supplied it must be set in a config object,
 * via reference to chart type, e.g.:
 *
 * ```TypeScript
 * {
 *   "type": am4charts.XYChart,
 *   // ...
 * }
 * ```
 * ```JavaScript
 * {
 *   "type": am4charts.XYChart,
 *   // ...
 * }
 * ```
 *
 * Or via string: (if you are using JavaScript)
 *
 * ```TypeScript
 * {
 *   "type": "XYChart",
 *   // ...
 * }
 * ```
 * ```JavaScript
 * {
 *   "type": "XYChart",
 *   // ...
 * }
 * ```
 *
 * A `container` can either be a reference to an HTML container to put chart
 * in, or it's unique id.
 *
 * If `container` is not specified, it must be included in the config object:
 *
 * ```TypeScript
 * {
 *   "type": "XYChart",
 *   "container": "chartdiv",
 *   // ...
 * }
 * ```
 * ```JavaScript
 * {
 *   "type": "XYChart",
 *   "container": "chartdiv",
 *   // ...
 * }
 * ```
 *
 * @param config       Config object in property/value pairs
 * @param htmlElement  Container reference or ID
 * @param objectType   Chart type
 * @return A newly created chart instance
 * @todo Throw exception if type is not correct
 */
export declare function createFromConfig(config: {
    [index: string]: any;
}, htmlElement?: string | HTMLElement, classType?: {
    new (): Sprite;
} | string): Sprite;
/**
 * Useful in creating real queues form mult-chart creation.
 *
 * Accepts a reference to a function which crates and returns actual chart
 * object.
 *
 * It returns a `Promise` which you can use to catch chart instance once it's
 * created.
 *
 * ```TypeScript
 * am4core.createDeferred(function(div) {
 *   // Create first chart
 *   let chart = am4core.create(div, am4charts.XYChart);
 *   // ...
 *   return chart;
 * }, "chartdiv1").then(chart) {
 *   // `chart` variable holds an instance of the chart
 *   console.log("Chart ready", chart);
 * }
 *
 * am4core.createDeferred(function(div) {
 *   // Create second chart
 *   let chart = am4core.create(div, am4charts.PieChart);
 *   // ...
 *   return chart;
 * }, "chartdiv2").then(chart) {
 *   // `chart` variable holds an instance of the chart
 *   console.log("Chart ready", chart);
 * }
 * ```
 * ```JavaScript
 * am4core.createDeferred(function(div) {
 *   // Create first chart
 *   var chart = am4core.create(div, am4charts.XYChart);
 *   // ...
 *   return chart;
 * }, "chartdiv1").then(chart) {
 *   // `chart` variable holds an instance of the chart
 *   console.log("Chart ready", chart);
 * }
 *
 * am4core.createDeferred(function(div) {
 *   // Create second chart
 *   var chart = am4core.create(div, am4charts.PieChart);
 *   // ...
 *   return chart;
 * }, "chartdiv2").then(chart) {
 *   // `chart` variable holds an instance of the chart
 *   console.log("Chart ready", chart);
 * }
 * ```
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/performance/#Deferred_daisy_chained_instantiation} for more information
 * @since 4.10.0
 * @param  callback  Callback function that creates chart
 * @param  scope     Scope to call callback in
 * @param  ...rest   Parameters to pass into callback
 * @return           Promise with chart instance
 */
export declare function createDeferred(callback: (...args: Array<any>) => Sprite, scope?: any, ...rest: Array<any>): Promise<Sprite>;
/**
 * Applies a theme to System, and subsequently all chart instances created
 * from that point forward.
 *
 * amCharts supports multiple themes. Calling `useTheme` multiple times will
 * make the System apply multiple themes, rather than overwrite previously
 * set one.
 *
 * This enables combining features from multiple themes on the same chart.
 * E.g.:
 *
 * ```TypeScript
 * am4core.useTheme(am4themes.material);
 * am4core.useTheme(am4themes.animated);
 * ```
 * ```JavaScript
 * am4core.useTheme(am4themes.material);
 * am4core.useTheme(am4themes.animated);
 * ```
 *
 * The above will apply both the Material color and animation options to all
 * charts created.
 *
 * @param value  A reference to a theme
 */
export declare function useTheme(value: ITheme): void;
/**
 * Removes a theme from "active themes" list, so it won't get applied to any
 * charts created subsequently.
 *
 * @param value  A reference to a theme
 */
export declare function unuseTheme(value: ITheme): void;
/**
 * Removes all "active" themes. Any charts created subsequently will not have
 * any theme applied to them.
 */
export declare function unuseAllThemes(): void;
/**
 * Adds a license, e.g.:
 *
 * ```TypeScript
 * am4core.addLicense("xxxxxxxx");
 * ```
 * ```JavaScript
 * am4core.addLicense("xxxxxxxx");
 * ```
 *
 * Multiple licenses can be added to cover for multiple products.
 *
 * @since 4.5.16
 * @param  license  License key
 */
export declare function addLicense(license: string): void;
