export interface Interval {
    lo: number;
    hi: number;
}
export interface FunctionPlotOptionsAxis {
    /**
     * Initial ends of the axis
     */
    domain?: number[];
    /**
     * The type of axis (either {@link ScaleLinear} or {@link ScaleLogarithmic}
     */
    type?: 'linear' | 'log';
    /**
     * The label to display next to the axis
     */
    label?: string;
    /**
     * True to invert the direction of the axis
     */
    invert?: boolean;
}
export interface FunctionPlotTip {
    /**
     * True to display a vertical line on mouseover
     */
    xLine?: boolean;
    /**
     * True to display a horizontal line on mouseover
     */
    yLine?: boolean;
    /**
     * A function to override what's rendered on mouseover
     */
    renderer?: (x: number, y: number, index: number) => string;
    /**
     * Internal reference to the {@link Chart} instance
     */
    owner?: any;
}
export interface FunctionPlotDatumScope {
    [key: string]: any;
}
/**
 * The string or function to evaluate
 *
 * - when `fnType: 'linear'`, a string expressed in terms of `x`
 * - when `fnType: 'implicit'`, a string expressed in terms of `x` and `y`
 * - when `fnType: 'polar'`, a string expressed in terms of `theta`
 * - when `fnType: 'parametric'`, a string expressed in terms of `t`
 */
declare type Function = string | ((scope: FunctionPlotDatumScope) => any);
export interface FunctionPlotDatumSecant {
    /**
     * (optional) True to update the secant line by evaluating `fn` with the current mouse position
     * (`x0` is the fixed point and `x1` is computed dynamically based on the current mouse position)
     */
    updateOnMouseMove?: boolean;
    /**
     * The abscissa of the first point i.e. the secant will always intersect the point `(x0, fn(x0))`
     */
    x0: number;
    /**
     * (optional if `updateOnMouseMove` is set) The abscissa of the second point i.e.
     * the secant will always intersect the point `(x1, fn(x1))`, requires x0 to be set
     */
    x1?: number;
    /**
     * The function to render
     */
    fn?: Function;
    /**
     * Additional information available during function evaluation
     */
    scope?: FunctionPlotDatumScope;
    $$mouseListener?: any;
}
export interface FunctionPlotDatumDerivative {
    /**
     * True to compute the tangent line by evaluating `derivative.fn` with the current mouse position
     * (i.e. let `x0` be the abscissa of the mouse position transformed to local coordinates,
     * the tangent line to the point `x0, fn(x0)`)
     */
    updateOnMouseMove?: boolean;
    /**
     * The abscissa of the point which belongs to the curve represented by `fn` whose tangent will be computed
     * (i.e. the tangent line to the point `x0, fn(x0)`)
     */
    x0?: number;
    /**
     * The derivative of the parent data `fn`
     */
    fn?: Function;
    /**
     * Additional information available during function evaluation
     */
    scope?: FunctionPlotDatumScope;
    $$mouseListener?: any;
}
export interface FunctionPlotDatum {
    /**
     * The function to render
     */
    fn?: Function;
    /**
     * The function to render (only used for polar functions)
     */
    r?: Function;
    /**
     * The function to render (only used for parametric functions)
     */
    x?: Function;
    /**
     * The function to render (only used for parametric functions)
     */
    y?: Function;
    /**
     * The type of graph to render
     *
     * - polyline: uses the builtIn sampler to render a disjoint set of lines
     * - interval: uses the interval arithmetic sampler to render a disjoint set of rectangles
     * - scatter: dotted line
     */
    graphType?: 'polyline' | 'interval' | 'scatter';
    /**
     * The type of function to render
     */
    fnType?: 'linear' | 'parametric' | 'implicit' | 'polar' | 'points' | 'vector';
    /**
     * The sampler to take samples from `range`, available values are `interval|builtIn`
     *
     * - **NOTE: `builtIn` should only be used when `graphType` is `polyline|scatter`**
     * - **NOTE: when math.js is included in the webpage it will be used instead of the bundled sampler**
     */
    sampler?: 'interval' | 'builtIn';
    /**
     * The number of values to be taken from `range` to evaluate the function, note that if interval-arithmetic is used the function
     * will be evaluated with intervals instead of single values
     */
    nSamples?: number;
    /**
     * Additional information available during function evaluation
     */
    scope?: FunctionPlotDatumScope;
    /**
     * The secants configuration
     */
    secants?: FunctionPlotDatumSecant[];
    /**
     * The derivative configuration
     */
    derivative?: FunctionPlotDatumDerivative;
    /**
     * (only if `graphType: 'polyline'` or `graphType: 'scatter'`) True to close the path,
     * for any segment of the closed area graph `y0` will be 0 and `y1` will be `f(x)`
     */
    closed?: boolean;
    /**
     * The color of the function to render
     */
    color?: string;
    /**
     * True to make the tip ignore this function
     */
    skipTip?: boolean;
    /**
     * Additional attributes set on the svg node that represents this datum
     */
    attr?: any;
    /**
     * An array with two numbers, the function will only be evaluated with values that belong to this interval
     *
     * default value for `fnType: 'polar'`: `[-Math.PI, Math.PI]`
     * default value for `fnType: 'parametric'`: `[0, 2 * Math.PI]`
     * default value for the other functions: `[-Infinity, Infinity]`
     */
    range?: [number, number];
    /**
     * An array of 2-number array which hold the coordinates of the points to render when `fnType: 'points'`
     */
    points?: number[][];
    /**
     * An array of 2-number array which hold the coordinates of the points to render when `fnType: 'vector'`
     */
    vector?: number[];
    /**
     * Vector offset when `fnType: 'vector'`
     */
    offset?: number[];
    /**
     * @private
     * The datum index
     */
    index?: number;
    /**
     * @private
     * True if the datum is a helper function
     */
    isHelper?: boolean;
    /**
     * @private
     * True to bypass the range limits, used for helper functions
     */
    skipBoundsCheck?: boolean;
}
export interface FunctionPlotAnnotation {
    /**
     * If set a vertical line will be rendered at this location
     */
    x?: number;
    /**
     * If set a horizontal line will be rendered at this location
     */
    y?: number;
    /**
     * The text displayed next to the line
     */
    text?: string;
}
export interface FunctionPlotOptions {
    /**
     * @private
     * For internal usage
     */
    id?: string;
    /**
     * A css selector or DOM node of the parent element that will contain the graph
     */
    target: string;
    /**
     * The chart title
     */
    title?: string;
    /**
     * The chart width (set on the svg element)
     */
    width?: number;
    /**
     * The chart height (set on the svg element)
     */
    height?: number;
    /**
     * The x-axis configuration
     */
    xAxis?: FunctionPlotOptionsAxis;
    /**
     * The y-axis configuration
     */
    yAxis?: FunctionPlotOptionsAxis;
    /**
     * The x-axis domain, internally state used to preserve the x-domain across multiple calls to function plot
     */
    xDomain?: number[];
    /**
     * The y-axis domain, internally state used to preserve the y-domain across multiple calls to function plot
     */
    yDomain?: number[];
    /**
     * The tip configuration
     */
    tip?: FunctionPlotTip;
    /**
     * True to display a grid
     */
    grid?: boolean;
    /**
     * True to disable panning and zoom
     */
    disableZoom?: boolean;
    /**
     * The functions to plot
     */
    data?: FunctionPlotDatum[];
    /**
     * The annotations displayed in the graph
     */
    annotations?: FunctionPlotAnnotation[];
    /**
     * Plugin configuration (WIP)
     */
    plugins?: any[];
}
export {};
