import { P as Point, E as Element, A as ArcOptions, D as DatasetController, C as Chart$3, a as AnyObject, b as PointElement$1, c as Config, d as Chart$4, e as ChartEvent$2, f as ChartArea, n as noop, S as Scale, T as TimeUnit, g as DateAdapter$1 } from './chunks/helpers.core.js';
export { av as ActiveDataPoint, aw as ActiveElement, a$ as Align, m as Animation, cj as AnimationEvent, aY as AnimationOptions, aU as AnimationSpec, o as Animations, aV as AnimationsSpec, ci as Animator, b4 as ArcBorderRadius, b5 as ArcHoverOptions, A as ArcOptions, B as BarController, a7 as BarControllerChartOptions, a6 as BarControllerDatasetOptions, v as BarElement, bh as BarHoverOptions, bf as BarOptions, be as BarProps, x as BasePlatform, y as BasicPlatform, bJ as BorderOptions, bg as BorderRadius, h as BubbleController, a8 as BubbleControllerDatasetOptions, a9 as BubbleDataPoint, b_ as CartesianParsedData, bP as CartesianScaleOptions, bW as CartesianScaleTypeRegistry, bM as CartesianTickOptions, N as CategoryScale, bQ as CategoryScaleOptions, d as Chart, f as ChartArea, aQ as ChartComponent, aJ as ChartComponentLike, ce as ChartConfiguration, cf as ChartConfigurationCustomTypesPerDataset, cc as ChartData, cd as ChartDataCustomTypesPerDataset, ca as ChartDataset, cb as ChartDatasetCustomTypesPerDataset, c8 as ChartDatasetProperties, c9 as ChartDatasetPropertiesCustomTypesPerDataset, e as ChartEvent, ax as ChartItem, au as ChartMeta, c5 as ChartOptions, c0 as ChartType, b$ as ChartTypeRegistry, ck as Color, b1 as CommonElementOptions, b2 as CommonHoverOptions, bo as ComplexFillTarget, a5 as ControllerDatasetOptions, aT as CoreChartOptions, aS as CoreInteractionOptions, aM as CoreScaleOptions, c3 as DatasetChartOptions, p as DatasetController, aA as DatasetControllerChartComponent, g as DateAdapter, F as Decimation, bk as DecimationAlgorithm, bl as DecimationOptions, c6 as DefaultDataPoint, aB as Defaults, z as DomPlatform, ag as DoughnutAnimationOptions, i as DoughnutController, ah as DoughnutControllerChartOptions, af as DoughnutControllerDatasetOptions, ai as DoughnutDataPoint, aj as DoughnutMetaExtensions, cg as EasingFunction, E as Element, bj as ElementChartOptions, bi as ElementOptionsByType, bD as ExtendedPlugin, bn as FillTarget, G as Filler, bp as FillerControllerDatasetOptions, bm as FillerOptions, aZ as FontSpec, bK as GridLineOptions, I as Interaction, aR as InteractionAxis, aE as InteractionItem, aH as InteractionMode, aF as InteractionModeFunction, aG as InteractionModeMap, aD as InteractionOptions, cl as LayoutItem, cm as LayoutPosition, H as Legend, br as LegendElement, bq as LegendItem, bs as LegendOptions, L as LineController, ab as LineControllerChartOptions, aa as LineControllerDatasetOptions, w as LineElement, b8 as LineHoverOptions, b7 as LineOptions, b6 as LineProps, O as LinearScale, bR as LinearScaleOptions, Q as LogarithmicScale, bS as LogarithmicScaleOptions, aC as Overrides, c7 as ParsedDataType, a4 as ParsingOptions, am as PieAnimationOptions, j as PieController, al as PieControllerChartOptions, ak as PieControllerDatasetOptions, an as PieDataPoint, ao as PieMetaExtensions, aI as Plugin, bI as PluginChartOptions, bH as PluginOptionsByType, P as Point, b as PointElement, bb as PointHoverOptions, ba as PointOptions, bd as PointPrefixedHoverOptions, bc as PointPrefixedOptions, ch as PointProps, b9 as PointStyle, aq as PolarAreaAnimationOptions, k as PolarAreaController, ar as PolarAreaControllerChartOptions, ap as PolarAreaControllerDatasetOptions, R as RadarController, at as RadarControllerChartOptions, as as RadarControllerDatasetOptions, U as RadialLinearScale, bV as RadialLinearScaleOptions, bX as RadialScaleTypeRegistry, bU as RadialTickOptions, aK as Registry, q as Scale, c4 as ScaleChartOptions, c2 as ScaleOptions, c1 as ScaleOptionsByType, bZ as ScaleType, bY as ScaleTypeRegistry, l as ScatterController, ae as ScatterControllerChartOptions, ac as ScatterControllerDatasetOptions, ad as ScatterDataPoint, $ as Scriptable, a2 as ScriptableAndArray, a3 as ScriptableAndArrayOptions, a1 as ScriptableAndScriptableOptions, bN as ScriptableCartesianScaleContext, bO as ScriptableChartContext, Y as ScriptableContext, Z as ScriptableLineSegmentContext, a0 as ScriptableOptions, aN as ScriptableScaleContext, aO as ScriptableScalePointLabelContext, bE as ScriptableTooltipContext, b3 as Segment, J as SubTitle, a_ as TextAlign, aL as Tick, bL as TickOptions, r as Ticks, V as TimeScale, bT as TimeScaleOptions, W as TimeSeriesScale, T as TimeUnit, K as Title, bt as TitleOptions, M as Tooltip, bC as TooltipCallbacks, bG as TooltipItem, bw as TooltipLabelStyle, bx as TooltipModel, bF as TooltipOptions, by as TooltipPosition, bB as TooltipPositioner, bz as TooltipPositionerFunction, bA as TooltipPositionerMap, bu as TooltipXAlignment, bv as TooltipYAlignment, aW as TransitionSpec, aX as TransitionsSpec, aP as TypedRegistry, az as UpdateMode, ay as UpdateModeEnum, b0 as VisualElement, _ as _adapters, s as defaults, t as layouts, X as registerables, u as registry } from './chunks/helpers.core.js';

interface ArcProps extends Point {
    startAngle: number;
    endAngle: number;
    innerRadius: number;
    outerRadius: number;
    circumference: number;
}
declare class ArcElement extends Element<ArcProps, ArcOptions> {
    static id: string;
    static defaults: {
        borderAlign: string;
        borderColor: string;
        borderJoinStyle: any;
        borderRadius: number;
        borderWidth: number;
        offset: number;
        spacing: number;
        angle: any;
        circular: boolean;
    };
    static defaultRoutes: {
        backgroundColor: string;
    };
    circumference: number;
    endAngle: number;
    fullCircles: number;
    innerRadius: number;
    outerRadius: number;
    pixelMargin: number;
    startAngle: number;
    constructor(cfg: any);
    inRange(chartX: number, chartY: number, useFinalPosition: boolean): boolean;
    getCenterPoint(useFinalPosition: boolean): {
        x: number;
        y: number;
    };
    tooltipPosition(useFinalPosition: boolean): {
        x: number;
        y: number;
    };
    draw(ctx: CanvasRenderingContext2D): void;
}

declare class BarController extends DatasetController {
    static id: string;
    /**
     * @type {any}
     */
    static overrides: any;
    /**
       * Overriding primitive data parsing since we support mixed primitive/array
       * data for float bars
       * @protected
       */
    protected parsePrimitiveData(meta: any, data: any, start: any, count: any): any[];
    /**
       * Overriding array data parsing since we support mixed primitive/array
       * data for float bars
       * @protected
       */
    protected parseArrayData(meta: any, data: any, start: any, count: any): any[];
    /**
       * Overriding object data parsing since we support mixed primitive/array
       * value-scale data for float bars
       * @protected
       */
    protected parseObjectData(meta: any, data: any, start: any, count: any): any[];
    update(mode: any): void;
    /**
       * Returns the stacks based on groups and bar visibility.
       * @param {number} [last] - The dataset index
       * @param {number} [dataIndex] - The data index of the ruler
       * @returns {string[]} The list of stack IDs
       * @private
       */
    private _getStacks;
    /**
       * Returns the effective number of stacks based on groups and bar visibility.
       * @private
       */
    private _getStackCount;
    /**
       * Returns the stack index for the given dataset based on groups and bar visibility.
       * @param {number} [datasetIndex] - The dataset index
       * @param {string} [name] - The stack name to find
     * @param {number} [dataIndex]
       * @returns {number} The stack index
       * @private
       */
    private _getStackIndex;
    /**
       * @private
       */
    private _getRuler;
    /**
       * Note: pixel values are not clamped to the scale area.
       * @private
       */
    private _calculateBarValuePixels;
    /**
       * @private
       */
    private _calculateBarIndexPixels;
}

declare class BubbleController extends DatasetController {
    static id: string;
    /**
     * @type {any}
     */
    static overrides: any;
    /**
       * Parse array of primitive values
       * @protected
       */
    protected parsePrimitiveData(meta: any, data: any, start: any, count: any): any;
    /**
       * Parse array of arrays
       * @protected
       */
    protected parseArrayData(meta: any, data: any, start: any, count: any): any;
    /**
       * Parse array of objects
       * @protected
       */
    protected parseObjectData(meta: any, data: any, start: any, count: any): any;
    /**
       * @protected
       */
    protected getMaxOverflow(): number;
    /**
       * @protected
       */
    protected getLabelAndValue(index: any): {
        label: any;
        value: string;
    };
    update(mode: any): void;
}

declare class DoughnutController extends DatasetController {
    static id: string;
    static descriptors: {
        _scriptable: (name: any) => boolean;
        _indexable: (name: any) => boolean;
    };
    /**
     * @type {any}
     */
    static overrides: any;
    constructor(chart: any, datasetIndex: any);
    innerRadius: number;
    outerRadius: number;
    offsetX: number;
    offsetY: number;
    /**
       * Override data parsing, since we are not using scales
       */
    parse(start: any, count: any): void;
    /**
       * @private
       */
    private _getRotation;
    /**
       * @private
       */
    private _getCircumference;
    /**
       * Get the maximal rotation & circumference extents
       * across all visible datasets.
       */
    _getRotationExtents(): {
        rotation: number;
        circumference: number;
    };
    /**
     * @private
     */
    private _circumference;
    calculateTotal(): number;
    calculateCircumference(value: any): number;
    getLabelAndValue(index: any): {
        label: any;
        value: string;
    };
    getMaxBorderWidth(arcs: any): number;
    getMaxOffset(arcs: any): number;
    /**
       * Get radius length offset of the dataset in relation to the visible datasets weights. This allows determining the inner and outer radius correctly
       * @private
       */
    private _getRingWeightOffset;
    /**
       * @private
       */
    private _getRingWeight;
    /**
       * Returns the sum of all visible data set weights.
       * @private
       */
    private _getVisibleDatasetWeightTotal;
}

declare class LineController extends DatasetController {
    static id: string;
    /**
     * @type {any}
     */
    static overrides: any;
    update(mode: any): void;
    /**
       * @protected
       */
    protected getMaxOverflow(): any;
}

declare class PolarAreaController extends DatasetController {
    static id: string;
    /**
     * @type {any}
     */
    static overrides: any;
    constructor(chart: any, datasetIndex: any);
    innerRadius: number;
    outerRadius: number;
    getLabelAndValue(index: any): {
        label: any;
        value: string;
    };
    parseObjectData(meta: any, data: any, start: any, count: any): any[];
    update(mode: any): void;
    /**
     * @protected
     */
    protected getMinMax(): {
        min: number;
        max: number;
    };
    /**
       * @private
       */
    private _updateRadius;
    countVisibleElements(): number;
    /**
       * @private
       */
    private _computeAngle;
}

declare class PieController extends DoughnutController {
}

declare class RadarController extends DatasetController {
    static id: string;
    /**
     * @type {any}
     */
    static overrides: any;
    /**
       * @protected
       */
    protected getLabelAndValue(index: any): {
        label: any;
        value: string;
    };
    parseObjectData(meta: any, data: any, start: any, count: any): any[];
    update(mode: any): void;
}

declare class ScatterController extends DatasetController {
    static id: string;
    /**
     * @type {any}
     */
    static overrides: any;
    /**
       * @protected
       */
    protected getLabelAndValue(index: any): {
        label: any;
        value: string;
    };
    update(mode: any): void;
    /**
       * @protected
       */
    protected getMaxOverflow(): any;
}

type controllers_BarController = BarController;
declare const controllers_BarController: typeof BarController;
type controllers_BubbleController = BubbleController;
declare const controllers_BubbleController: typeof BubbleController;
type controllers_DoughnutController = DoughnutController;
declare const controllers_DoughnutController: typeof DoughnutController;
type controllers_LineController = LineController;
declare const controllers_LineController: typeof LineController;
type controllers_PolarAreaController = PolarAreaController;
declare const controllers_PolarAreaController: typeof PolarAreaController;
type controllers_PieController = PieController;
declare const controllers_PieController: typeof PieController;
type controllers_RadarController = RadarController;
declare const controllers_RadarController: typeof RadarController;
type controllers_ScatterController = ScatterController;
declare const controllers_ScatterController: typeof ScatterController;
declare namespace controllers {
  export {
    controllers_BarController as BarController,
    controllers_BubbleController as BubbleController,
    controllers_DoughnutController as DoughnutController,
    controllers_LineController as LineController,
    controllers_PolarAreaController as PolarAreaController,
    controllers_PieController as PieController,
    controllers_RadarController as RadarController,
    controllers_ScatterController as ScatterController,
  };
}

declare class Animation$1 {
    constructor(cfg: any, target: any, prop: any, to: any);
    _active: boolean;
    _fn: any;
    _easing: any;
    _start: number;
    _duration: number;
    _total: number;
    _loop: boolean;
    _target: any;
    _prop: any;
    _from: unknown;
    _to: any;
    _promises: any[];
    active(): boolean;
    update(cfg: any, to: any, date: any): void;
    cancel(): void;
    tick(date: any): void;
    wait(): Promise<any>;
    _notify(resolved: any): void;
}

declare class Animations {
    constructor(chart: any, config: any);
    _chart: any;
    _properties: Map<any, any>;
    configure(config: any): void;
    /**
       * Utility to handle animation of `options`.
       * @private
       */
    private _animateOptions;
    /**
       * @private
       */
    private _createAnimations;
    /**
       * Update `target` properties to new values, using configured animations
       * @param {object} target - object to update
       * @param {object} values - new target properties
       * @returns {boolean|undefined} - `true` if animations were started
       **/
    update(target: object, values: object): boolean | undefined;
}

/**
 * @typedef { import("./core.animation").default } Animation
 * @typedef { import("./core.controller").default } Chart
 */
/**
 * Please use the module's default export which provides a singleton instance
 * Note: class is export for typedoc
 */
declare class Animator {
    _request: any;
    _charts: Map<any, any>;
    _running: boolean;
    _lastDate: number;
    /**
       * @private
       */
    private _notify;
    /**
       * @private
       */
    private _refresh;
    /**
       * @private
       */
    private _update;
    /**
       * @private
       */
    private _getAnims;
    /**
       * @param {Chart} chart
       * @param {string} event - event name
       * @param {Function} cb - callback
       */
    listen(chart: Chart$2, event: string, cb: Function): void;
    /**
       * Add animations
       * @param {Chart} chart
       * @param {Animation[]} items - animations
       */
    add(chart: Chart$2, items: Animation[]): void;
    /**
       * Counts number of active animations for the chart
       * @param {Chart} chart
       */
    has(chart: Chart$2): boolean;
    /**
       * Start animating (all charts)
       * @param {Chart} chart
       */
    start(chart: Chart$2): void;
    running(chart: any): boolean;
    /**
       * Stop all animations for the chart
       * @param {Chart} chart
       */
    stop(chart: Chart$2): void;
    /**
       * Remove chart from Animator
       * @param {Chart} chart
       */
    remove(chart: Chart$2): boolean;
}
declare const _default$7: Animator;

type Animation = Animation$1;
type Chart$2 = Chart$3;

type Segment = {
    start: number;
    end: number;
    loop: boolean;
    style?: any;
};

declare class LineElement extends Element<AnyObject, AnyObject> {
    static id: string;
    /**
     * @type {any}
     */
    static defaults: any;
    static descriptors: {
        _scriptable: boolean;
        _indexable: (name: any) => boolean;
    };
    constructor(cfg: any);
    animated: boolean;
    options: any;
    _chart: any;
    _loop: any;
    _fullLoop: any;
    _path: any;
    _points: any;
    _segments: Segment[];
    _decimated: boolean;
    _pointsUpdated: boolean;
    _datasetIndex: any;
    updateControlPoints(chartArea: any, indexAxis: any): void;
    set points(arg: any);
    get points(): any;
    get segments(): Segment[];
    /**
       * First non-skipped point on this line
       * @returns {PointElement|undefined}
       */
    first(): PointElement | undefined;
    /**
       * Last non-skipped point on this line
       * @returns {PointElement|undefined}
       */
    last(): PointElement | undefined;
    /**
       * Interpolate a point in this line at the same value on `property` as
       * the reference `point` provided
       * @param {PointElement} point - the reference point
       * @param {string} property - the property to match on
       * @returns {PointElement|undefined}
       */
    interpolate(point: PointElement, property: string): PointElement | undefined;
    /**
       * Append a segment of this line to current path.
       * @param {CanvasRenderingContext2D} ctx
       * @param {object} segment
       * @param {number} segment.start - start index of the segment, referring the points array
       * @param {number} segment.end - end index of the segment, referring the points array
       * @param {boolean} segment.loop - indicates that the segment is a loop
       * @param {object} params
       * @param {boolean} params.move - move to starting point (vs line to it)
       * @param {boolean} params.reverse - path the segment from end to start
       * @param {number} params.start - limit segment to points starting from `start` index
       * @param {number} params.end - limit segment to points ending at `start` + `count` index
       * @returns {undefined|boolean} - true if the segment is a full loop (path should be closed)
       */
    pathSegment(ctx: CanvasRenderingContext2D, segment: {
        start: number;
        end: number;
        loop: boolean;
    }, params: {
        move: boolean;
        reverse: boolean;
        start: number;
        end: number;
    }): undefined | boolean;
    /**
       * Append all segments of this line to current path.
       * @param {CanvasRenderingContext2D|Path2D} ctx
       * @param {number} [start]
       * @param {number} [count]
       * @returns {undefined|boolean} - true if line is a full loop (path should be closed)
       */
    path(ctx: CanvasRenderingContext2D | Path2D, start?: number, count?: number): undefined | boolean;
    /**
       * Draw
       * @param {CanvasRenderingContext2D} ctx
       * @param {object} chartArea
       * @param {number} [start]
       * @param {number} [count]
       */
    draw(ctx: CanvasRenderingContext2D, chartArea: object, start?: number, count?: number): void;
}
type PointElement = PointElement$1;

declare class BarElement extends Element<AnyObject, AnyObject> {
    static id: string;
    /**
     * @type {any}
     */
    static defaults: any;
    constructor(cfg: any);
    options: any;
    horizontal: any;
    base: any;
    width: any;
    height: any;
    inflateAmount: any;
    draw(ctx: any): void;
    inRange(mouseX: any, mouseY: any, useFinalPosition: any): boolean;
    inXRange(mouseX: any, useFinalPosition: any): boolean;
    inYRange(mouseY: any, useFinalPosition: any): boolean;
    getCenterPoint(useFinalPosition: any): {
        x: number;
        y: number;
    };
    getRange(axis: any): number;
}

type elements_ArcElement = ArcElement;
declare const elements_ArcElement: typeof ArcElement;
type elements_LineElement = LineElement;
declare const elements_LineElement: typeof LineElement;
type elements_BarElement = BarElement;
declare const elements_BarElement: typeof BarElement;
declare namespace elements {
  export {
    elements_ArcElement as ArcElement,
    elements_LineElement as LineElement,
    PointElement$1 as PointElement,
    elements_BarElement as BarElement,
  };
}

/**
 * @typedef { import("../core/core.controller").default } Chart
 */
/**
 * Abstract class that allows abstracting platform dependencies away from the chart.
 */
declare class BasePlatform {
    /**
       * Called at chart construction time, returns a context2d instance implementing
       * the [W3C Canvas 2D Context API standard]{@link https://www.w3.org/TR/2dcontext/}.
       * @param {HTMLCanvasElement} canvas - The canvas from which to acquire context (platform specific)
       * @param {number} [aspectRatio] - The chart options
       */
    acquireContext(canvas: HTMLCanvasElement, aspectRatio?: number): void;
    /**
       * Called at chart destruction time, releases any resources associated to the context
       * previously returned by the acquireContext() method.
       * @param {CanvasRenderingContext2D} context - The context2d instance
       * @returns {boolean} true if the method succeeded, else false
       */
    releaseContext(context: CanvasRenderingContext2D): boolean;
    /**
       * Registers the specified listener on the given chart.
       * @param {Chart} chart - Chart from which to listen for event
       * @param {string} type - The ({@link ChartEvent}) type to listen for
       * @param {function} listener - Receives a notification (an object that implements
       * the {@link ChartEvent} interface) when an event of the specified type occurs.
       */
    addEventListener(chart: Chart$1, type: string, listener: Function): void;
    /**
       * Removes the specified listener previously registered with addEventListener.
       * @param {Chart} chart - Chart from which to remove the listener
       * @param {string} type - The ({@link ChartEvent}) type to remove
       * @param {function} listener - The listener function to remove from the event target.
       */
    removeEventListener(chart: Chart$1, type: string, listener: Function): void;
    /**
       * @returns {number} the current devicePixelRatio of the device this platform is connected to.
       */
    getDevicePixelRatio(): number;
    /**
       * Returns the maximum size in pixels of given canvas element.
       * @param {HTMLCanvasElement} element
       * @param {number} [width] - content width of parent element
       * @param {number} [height] - content height of parent element
       * @param {number} [aspectRatio] - aspect ratio to maintain
       */
    getMaximumSize(element: HTMLCanvasElement, width?: number, height?: number, aspectRatio?: number): {
        width: number;
        height: number;
    };
    /**
       * @param {HTMLCanvasElement} canvas
       * @returns {boolean} true if the canvas is attached to the platform, false if not.
       */
    isAttached(canvas: HTMLCanvasElement): boolean;
    /**
     * Updates config with platform specific requirements
     * @param {import("../core/core.config").default} config
     */
    updateConfig(config: Config): void;
}
type Chart$1 = Chart$3;

/**
 * Platform class for charts without access to the DOM or to many element properties
 * This platform is used by default for any chart passed an OffscreenCanvas.
 * @extends BasePlatform
 */
declare class BasicPlatform extends BasePlatform {
    acquireContext(item: any): any;
    updateConfig(config: any): void;
}

/**
 * Platform class for charts that can access the DOM and global window/document properties
 * @extends BasePlatform
 */
declare class DomPlatform extends BasePlatform {
    /**
       * @param {HTMLCanvasElement} canvas
       * @param {number} [aspectRatio]
       * @return {CanvasRenderingContext2D|null}
       */
    acquireContext(canvas: HTMLCanvasElement, aspectRatio?: number): CanvasRenderingContext2D | null;
    /**
       * @param {Chart} chart
       * @param {string} type
       */
    removeEventListener(chart: Chart, type: string): void;
}
type Chart = Chart$3;

declare function _detectPlatform(canvas: any): typeof BasicPlatform | typeof DomPlatform;

interface ColorsPluginOptions {
    enabled?: boolean;
}
declare const _default$6: {
    id: string;
    defaults: {
        enabled: boolean;
    };
    beforeLayout(chart: Chart$4, _args: any, options: ColorsPluginOptions): void;
};

declare namespace _default$5 {
    const id: string;
    namespace defaults {
        const algorithm: string;
        const enabled: boolean;
    }
    function beforeElementsUpdate(chart: any, args: any, options: any): void;
    function destroy(chart: any): void;
    function destroy(chart: any): void;
}

declare namespace _default$4 {
    const id: string;
    function afterDatasetsUpdate(chart: any, _args: any, options: any): void;
    function afterDatasetsUpdate(chart: any, _args: any, options: any): void;
    function beforeDraw(chart: any, _args: any, options: any): void;
    function beforeDraw(chart: any, _args: any, options: any): void;
    function beforeDatasetsDraw(chart: any, _args: any, options: any): void;
    function beforeDatasetsDraw(chart: any, _args: any, options: any): void;
    function beforeDatasetDraw(chart: any, args: any, options: any): void;
    function beforeDatasetDraw(chart: any, args: any, options: any): void;
    namespace defaults {
        const propagate: boolean;
        const drawTime: string;
    }
}

declare class Legend extends Element<AnyObject, AnyObject> {
    /**
       * @param {{ ctx: any; options: any; chart: any; }} config
       */
    constructor(config: {
        ctx: any;
        options: any;
        chart: any;
    });
    _added: boolean;
    legendHitBoxes: any[];
    /**
         * @private
         */
    private _hoveredItem;
    doughnutMode: boolean;
    chart: any;
    options: any;
    ctx: any;
    legendItems: any;
    columnSizes: any[];
    lineWidths: number[];
    maxHeight: any;
    maxWidth: any;
    top: any;
    bottom: any;
    left: any;
    right: any;
    height: any;
    width: any;
    _margins: any;
    position: any;
    weight: any;
    fullSize: any;
    update(maxWidth: any, maxHeight: any, margins: any): void;
    setDimensions(): void;
    buildLabels(): void;
    fit(): void;
    /**
       * @private
       */
    private _fitRows;
    _fitCols(titleHeight: any, labelFont: any, boxWidth: any, _itemHeight: any): any;
    adjustHitBoxes(): void;
    isHorizontal(): boolean;
    draw(): void;
    /**
       * @private
       */
    private _draw;
    /**
       * @protected
       */
    protected drawTitle(): void;
    /**
       * @private
       */
    private _computeTitleHeight;
    /**
       * @private
       */
    private _getLegendItemAt;
    /**
       * Handle an event
       * @param {ChartEvent} e - The event to handle
       */
    handleEvent(e: ChartEvent$1): void;
}
declare namespace _default$3 {
    export const id: string;
    export { Legend as _element };
    export function start(chart: any, _args: any, options: any): void;
    export function start(chart: any, _args: any, options: any): void;
    export function stop(chart: any): void;
    export function stop(chart: any): void;
    export function beforeUpdate(chart: any, _args: any, options: any): void;
    export function beforeUpdate(chart: any, _args: any, options: any): void;
    export function afterUpdate(chart: any): void;
    export function afterUpdate(chart: any): void;
    export function afterEvent(chart: any, args: any): void;
    export function afterEvent(chart: any, args: any): void;
    export namespace defaults {
        const display: boolean;
        const position: string;
        const align: string;
        const fullSize: boolean;
        const reverse: boolean;
        const weight: number;
        function onClick(e: any, legendItem: any, legend: any): void;
        function onClick(e: any, legendItem: any, legend: any): void;
        const onHover: any;
        const onLeave: any;
        namespace labels {
            function color(ctx: any): any;
            const boxWidth: number;
            const padding: number;
            function generateLabels(chart: any): any;
            function generateLabels(chart: any): any;
        }
        namespace title {
            export function color_1(ctx: any): any;
            export { color_1 as color };
            const display_1: boolean;
            export { display_1 as display };
            const position_1: string;
            export { position_1 as position };
            export const text: string;
        }
    }
    export namespace descriptors {
        export function _scriptable(name: any): boolean;
        export namespace labels_1 {
            export function _scriptable_1(name: any): boolean;
            export { _scriptable_1 as _scriptable };
        }
        export { labels_1 as labels };
    }
}

type ChartEvent$1 = ChartEvent$2;

declare namespace _default$2 {
    const id: string;
    function start(chart: any, _args: any, options: any): void;
    function start(chart: any, _args: any, options: any): void;
    function stop(chart: any): void;
    function stop(chart: any): void;
    function beforeUpdate(chart: any, _args: any, options: any): void;
    function beforeUpdate(chart: any, _args: any, options: any): void;
    namespace defaults {
        export const align: string;
        export const display: boolean;
        export namespace font {
            const weight: string;
        }
        export const fullSize: boolean;
        export const padding: number;
        export const position: string;
        export const text: string;
        const weight_1: number;
        export { weight_1 as weight };
    }
    namespace defaultRoutes {
        const color: string;
    }
    namespace descriptors {
        const _scriptable: boolean;
        const _indexable: boolean;
    }
}

declare class Title extends Element<AnyObject, AnyObject> {
    /**
       * @param {{ ctx: any; options: any; chart: any; }} config
       */
    constructor(config: {
        ctx: any;
        options: any;
        chart: any;
    });
    chart: any;
    options: any;
    ctx: any;
    _padding: ChartArea;
    top: number;
    bottom: any;
    left: number;
    right: any;
    width: any;
    height: any;
    position: any;
    weight: any;
    fullSize: any;
    update(maxWidth: any, maxHeight: any): void;
    isHorizontal(): boolean;
    _drawArgs(offset: any): {
        titleX: any;
        titleY: any;
        maxWidth: number;
        rotation: number;
    };
    draw(): void;
}
declare namespace _default$1 {
    export const id: string;
    export { Title as _element };
    export function start(chart: any, _args: any, options: any): void;
    export function start(chart: any, _args: any, options: any): void;
    export function stop(chart: any): void;
    export function stop(chart: any): void;
    export function beforeUpdate(chart: any, _args: any, options: any): void;
    export function beforeUpdate(chart: any, _args: any, options: any): void;
    export namespace defaults {
        export const align: string;
        export const display: boolean;
        export namespace font {
            const weight: string;
        }
        export const fullSize: boolean;
        export const padding: number;
        export const position: string;
        export const text: string;
        const weight_1: number;
        export { weight_1 as weight };
    }
    export namespace defaultRoutes {
        const color: string;
    }
    export namespace descriptors {
        const _scriptable: boolean;
        const _indexable: boolean;
    }
}

declare class Tooltip extends Element<AnyObject, AnyObject> {
    /**
     * @namespace Chart.Tooltip.positioners
     */
    static positioners: {
        /**
           * Average mode places the tooltip at the average position of the elements shown
           */
        average(items: any): false | {
            x: number;
            y: number;
        };
        /**
           * Gets the tooltip position nearest of the item nearest to the event position
           */
        nearest(items: any, eventPosition: any): false | {
            x: any;
            y: any;
        };
    };
    constructor(config: any);
    opacity: number;
    _active: any[];
    _eventPosition: any;
    _size: {
        width: number;
        height: number;
    };
    _cachedAnimations: Readonly<Animations>;
    _tooltipItems: any[];
    $animations: any;
    $context: any;
    chart: any;
    options: any;
    dataPoints: {
        chart: Chart$3;
        label: any;
        parsed: any;
        raw: any;
        formattedValue: any;
        dataset: any;
        dataIndex: number;
        datasetIndex: number;
        element: Element<AnyObject, AnyObject>;
    }[];
    title: any;
    beforeBody: any;
    body: any[];
    afterBody: any;
    footer: any;
    xAlign: any;
    yAlign: any;
    x: any;
    y: any;
    height: number;
    width: number;
    caretX: any;
    caretY: any;
    labelColors: any[];
    labelPointStyles: any[];
    labelTextColors: any[];
    initialize(options: any): void;
    /**
       * @private
       */
    private _resolveAnimations;
    /**
       * @protected
       */
    protected getContext(): any;
    getTitle(context: any, options: any): any;
    getBeforeBody(tooltipItems: any, options: any): any;
    getBody(tooltipItems: any, options: any): any[];
    getAfterBody(tooltipItems: any, options: any): any;
    getFooter(tooltipItems: any, options: any): any;
    /**
       * @private
       */
    private _createItems;
    update(changed: any, replay: any): void;
    drawCaret(tooltipPoint: any, ctx: any, size: any, options: any): void;
    getCaretPosition(tooltipPoint: any, size: any, options: any): {
        x1: any;
        x2: any;
        x3: any;
        y1: any;
        y2: any;
        y3: any;
    };
    drawTitle(pt: any, ctx: any, options: any): void;
    /**
       * @private
       */
    private _drawColorBox;
    drawBody(pt: any, ctx: any, options: any): void;
    drawFooter(pt: any, ctx: any, options: any): void;
    drawBackground(pt: any, ctx: any, tooltipSize: any, options: any): void;
    /**
       * Update x/y animation targets when _active elements are animating too
       * @private
       */
    private _updateAnimationTarget;
    /**
     * Determine if the tooltip will draw anything
     * @returns {boolean} True if the tooltip will render
     */
    _willRender(): boolean;
    draw(ctx: any): void;
    /**
       * Get active elements in the tooltip
       * @returns {Array} Array of elements that are active in the tooltip
       */
    getActiveElements(): any[];
    /**
       * Set active elements in the tooltip
       * @param {array} activeElements Array of active datasetIndex/index pairs.
       * @param {object} eventPosition Synthetic event position used in positioning
       */
    setActiveElements(activeElements: any[], eventPosition: object): void;
    _ignoreReplayEvents: boolean;
    /**
       * Handle an event
       * @param {ChartEvent} e - The event to handle
       * @param {boolean} [replay] - This is a replayed event (from update)
       * @param {boolean} [inChartArea] - The event is inside chartArea
       * @returns {boolean} true if the tooltip changed
       */
    handleEvent(e: ChartEvent, replay?: boolean, inChartArea?: boolean): boolean;
    /**
       * Helper for determining the active elements for event
       * @param {ChartEvent} e - The event to handle
       * @param {InteractionItem[]} lastActive - Previously active elements
       * @param {boolean} [replay] - This is a replayed event (from update)
       * @param {boolean} [inChartArea] - The event is inside chartArea
       * @returns {InteractionItem[]} - Active elements
       * @private
       */
    private _getActiveElements;
    /**
       * Determine if the active elements + event combination changes the
       * tooltip position
       * @param {array} active - Active elements
       * @param {ChartEvent} e - Event that triggered the position change
       * @returns {boolean} True if the position has changed
       */
    _positionChanged(active: any[], e: ChartEvent): boolean;
}
declare namespace _default {
    export const id: string;
    export { Tooltip as _element };
    export { positioners };
    export function afterInit(chart: any, _args: any, options: any): void;
    export function afterInit(chart: any, _args: any, options: any): void;
    export function beforeUpdate(chart: any, _args: any, options: any): void;
    export function beforeUpdate(chart: any, _args: any, options: any): void;
    export function reset(chart: any, _args: any, options: any): void;
    export function reset(chart: any, _args: any, options: any): void;
    export function afterDraw(chart: any): void;
    export function afterDraw(chart: any): void;
    export function afterEvent(chart: any, args: any): void;
    export function afterEvent(chart: any, args: any): void;
    export namespace defaults {
        export const enabled: boolean;
        export const external: any;
        export const position: string;
        export const backgroundColor: string;
        export const titleColor: string;
        export namespace titleFont {
            const weight: string;
        }
        export const titleSpacing: number;
        export const titleMarginBottom: number;
        export const titleAlign: string;
        export const bodyColor: string;
        export const bodySpacing: number;
        export const bodyFont: {};
        export const bodyAlign: string;
        export const footerColor: string;
        export const footerSpacing: number;
        export const footerMarginTop: number;
        export namespace footerFont {
            const weight_1: string;
            export { weight_1 as weight };
        }
        export const footerAlign: string;
        export const padding: number;
        export const caretPadding: number;
        export const caretSize: number;
        export const cornerRadius: number;
        export function boxHeight(ctx: any, opts: any): any;
        export function boxWidth(ctx: any, opts: any): any;
        export const multiKeyBackground: string;
        export const displayColors: boolean;
        export const boxPadding: number;
        export const borderColor: string;
        export const borderWidth: number;
        export namespace animation {
            const duration: number;
            const easing: string;
        }
        export namespace animations {
            namespace numbers {
                const type: string;
                const properties: string[];
            }
            namespace opacity {
                const easing_1: string;
                export { easing_1 as easing };
                const duration_1: number;
                export { duration_1 as duration };
            }
        }
        export { defaultCallbacks as callbacks };
    }
    export namespace defaultRoutes {
        const bodyFont_1: string;
        export { bodyFont_1 as bodyFont };
        const footerFont_1: string;
        export { footerFont_1 as footerFont };
        const titleFont_1: string;
        export { titleFont_1 as titleFont };
    }
    export namespace descriptors {
        export function _scriptable(name: any): boolean;
        export const _indexable: boolean;
        export namespace callbacks {
            const _scriptable_1: boolean;
            export { _scriptable_1 as _scriptable };
            const _indexable_1: boolean;
            export { _indexable_1 as _indexable };
        }
        export namespace animation_1 {
            const _fallback: boolean;
        }
        export { animation_1 as animation };
        export namespace animations_1 {
            const _fallback_1: string;
            export { _fallback_1 as _fallback };
        }
        export { animations_1 as animations };
    }
    export const additionalOptionScopes: string[];
}

type ChartEvent = ChartEvent$2;
declare namespace positioners {
    /**
       * Average mode places the tooltip at the average position of the elements shown
       */
    function average(items: any): false | {
        x: number;
        y: number;
    };
    /**
       * Average mode places the tooltip at the average position of the elements shown
       */
    function average(items: any): false | {
        x: number;
        y: number;
    };
    /**
       * Gets the tooltip position nearest of the item nearest to the event position
       */
    function nearest(items: any, eventPosition: any): false | {
        x: any;
        y: any;
    };
    /**
       * Gets the tooltip position nearest of the item nearest to the event position
       */
    function nearest(items: any, eventPosition: any): false | {
        x: any;
        y: any;
    };
}
declare namespace defaultCallbacks {
    export { noop as beforeTitle };
    export function title(tooltipItems: any): any;
    export function title(tooltipItems: any): any;
    export { noop as afterTitle };
    export { noop as beforeBody };
    export { noop as beforeLabel };
    export function label(tooltipItem: any): any;
    export function label(tooltipItem: any): any;
    export function labelColor(tooltipItem: any): {
        borderColor: any;
        backgroundColor: any;
        borderWidth: any;
        borderDash: any;
        borderDashOffset: any;
        borderRadius: number;
    };
    export function labelColor(tooltipItem: any): {
        borderColor: any;
        backgroundColor: any;
        borderWidth: any;
        borderDash: any;
        borderDashOffset: any;
        borderRadius: number;
    };
    export function labelTextColor(): any;
    export function labelTextColor(): any;
    export function labelPointStyle(tooltipItem: any): {
        pointStyle: any;
        rotation: any;
    };
    export function labelPointStyle(tooltipItem: any): {
        pointStyle: any;
        rotation: any;
    };
    export { noop as afterLabel };
    export { noop as afterBody };
    export { noop as beforeFooter };
    export { noop as footer };
    export { noop as afterFooter };
}

declare namespace plugins {
  export {
    _default$6 as Colors,
    _default$5 as Decimation,
    _default$4 as Filler,
    _default$3 as Legend,
    _default$2 as SubTitle,
    _default$1 as Title,
    _default as Tooltip,
  };
}

declare class CategoryScale extends Scale {
    static id: string;
    /**
     * @type {any}
     */
    static defaults: any;
    /** @type {number} */
    _startValue: number;
    _valueRange: number;
    _addedLabels: any[];
    init(scaleOptions: any): void;
    parse(raw: any, index: any): number;
    buildTicks(): {
        value: any;
    }[];
    getLabelForValue(value: any): any;
    getPixelForValue(value: any): number;
    getPixelForTick(index: any): number;
    getValueForPixel(pixel: any): number;
}

declare class LinearScaleBase extends Scale {
    /** @type {number} */
    start: number;
    /** @type {number} */
    end: number;
    /** @type {number} */
    _startValue: number;
    /** @type {number} */
    _endValue: number;
    _valueRange: number;
    parse(raw: any, index: any): number;
    handleTickRangeOptions(): void;
    getTickLimit(): number;
    /**
       * @protected
       */
    protected computeTickLimit(): number;
    getLabelForValue(value: any): string;
}

declare class LinearScale extends LinearScaleBase {
    static id: string;
    /**
     * @type {any}
     */
    static defaults: any;
    getPixelForValue(value: any): number;
    getValueForPixel(pixel: any): number;
}

declare class LogarithmicScale extends Scale {
    static id: string;
    /**
     * @type {any}
     */
    static defaults: any;
    /** @type {number} */
    start: number;
    /** @type {number} */
    end: number;
    /** @type {number} */
    _startValue: number;
    _valueRange: number;
    parse(raw: any, index: any): number;
    _zero: boolean;
    handleTickRangeOptions(): void;
    /**
       * @param {number} value
       * @return {string}
       */
    getLabelForValue(value: number): string;
    getPixelForValue(value: any): number;
    getValueForPixel(pixel: any): number;
}

declare class RadialLinearScale extends LinearScaleBase {
    static id: string;
    /**
     * @type {any}
     */
    static defaults: any;
    static defaultRoutes: {
        'angleLines.color': string;
        'pointLabels.color': string;
        'ticks.color': string;
    };
    static descriptors: {
        angleLines: {
            _fallback: string;
        };
    };
    /** @type {number} */
    xCenter: number;
    /** @type {number} */
    yCenter: number;
    /** @type {number} */
    drawingArea: number;
    /** @type {string[]} */
    _pointLabels: string[];
    _pointLabelItems: any[];
    _padding: ChartArea;
    generateTickLabels(ticks: any): void;
    setCenterPoint(leftMovement: any, rightMovement: any, topMovement: any, bottomMovement: any): void;
    getIndexAngle(index: any): number;
    getDistanceFromCenterForValue(value: any): number;
    getValueForDistanceFromCenter(distance: any): any;
    getPointLabelContext(index: any): any;
    getPointPosition(index: any, distanceFromCenter: any, additionalAngle?: number): {
        x: number;
        y: number;
        angle: number;
    };
    getPointPositionForValue(index: any, value: any): {
        x: number;
        y: number;
        angle: number;
    };
    getBasePosition(index: any): {
        x: number;
        y: number;
        angle: number;
    };
    getPointLabelPosition(index: any): {
        left: any;
        top: any;
        right: any;
        bottom: any;
    };
    /**
       * @protected
       */
    protected drawGrid(): void;
    /**
       * @protected
       */
    protected drawLabels(): void;
}

declare class TimeScale extends Scale {
    static id: string;
    /**
     * @type {any}
     */
    static defaults: any;
    /**
       * @param {object} props
       */
    constructor(props: object);
    /** @type {{data: number[], labels: number[], all: number[]}} */
    _cache: {
        data: number[];
        labels: number[];
        all: number[];
    };
    /** @type {Unit} */
    _unit: Unit;
    /** @type {Unit=} */
    _majorUnit: Unit | undefined;
    _offsets: {};
    _normalized: boolean;
    _parseOpts: {
        parser: any;
        round: any;
        isoWeekday: any;
    };
    init(scaleOpts: any, opts?: {}): void;
    _adapter: DateAdapter;
    /**
       * @param {*} raw
       * @param {number?} [index]
       * @return {number}
       */
    parse(raw: any, index?: number | null): number;
    /**
       * @private
       */
    private _getLabelBounds;
    /**
       * Returns the start and end offsets from edges in the form of {start, end}
       * where each value is a relative width to the scale and ranges between 0 and 1.
       * They add extra margins on the both sides by scaling down the original scale.
       * Offsets are added when the `offset` option is true.
       * @param {number[]} timestamps
       * @protected
       */
    protected initOffsets(timestamps?: number[]): void;
    /**
       * Generates a maximum of `capacity` timestamps between min and max, rounded to the
       * `minor` unit using the given scale time `options`.
       * Important: this method can return ticks outside the min and max range, it's the
       * responsibility of the calling code to clamp values if needed.
       * @private
       */
    private _generate;
    /**
       * @param {number} value
       * @return {string}
       */
    getLabelForValue(value: number): string;
    /**
       * Function to format an individual tick mark
       * @param {number} time
       * @param {number} index
       * @param {object[]} ticks
       * @param {string|undefined} [format]
       * @return {string}
       * @private
       */
    private _tickFormatFunction;
    /**
       * @param {object[]} ticks
       */
    generateTickLabels(ticks: object[]): void;
    /**
       * @param {number} value - Milliseconds since epoch (1 January 1970 00:00:00 UTC)
       * @return {number}
       */
    getDecimalForValue(value: number): number;
    /**
       * @param {number} value - Milliseconds since epoch (1 January 1970 00:00:00 UTC)
       * @return {number}
       */
    getPixelForValue(value: number): number;
    /**
       * @param {number} pixel
       * @return {number}
       */
    getValueForPixel(pixel: number): number;
    /**
       * @param {string} label
       * @return {{w:number, h:number}}
       * @private
       */
    private _getLabelSize;
    /**
       * @param {number} exampleTime
       * @return {number}
       * @private
       */
    private _getLabelCapacity;
    /**
       * @protected
       */
    protected getDataTimestamps(): any;
    /**
       * @protected
       */
    protected getLabelTimestamps(): number[];
    /**
       * @param {number[]} values
       * @protected
       */
    protected normalize(values: number[]): number[];
}
type Unit = TimeUnit;
type DateAdapter = DateAdapter$1;

declare class TimeSeriesScale extends TimeScale {
    /** @type {object[]} */
    _table: object[];
    /** @type {number} */
    _minPos: number;
    /** @type {number} */
    _tableRange: number;
    /**
       * @protected
       */
    protected initOffsets(): void;
    /**
       * Returns an array of {time, pos} objects used to interpolate a specific `time` or position
       * (`pos`) on the scale, by searching entries before and after the requested value. `pos` is
       * a decimal between 0 and 1: 0 being the start of the scale (left or top) and 1 the other
       * extremity (left + width or top + height). Note that it would be more optimized to directly
       * store pre-computed pixels, but the scale dimensions are not guaranteed at the time we need
       * to create the lookup table. The table ALWAYS contains at least two items: min and max.
       * @param {number[]} timestamps
       * @return {object[]}
       * @protected
       */
    protected buildLookupTable(timestamps: number[]): object[];
    /**
       * Returns all timestamps
       * @return {number[]}
       * @private
       */
    private _getTimestampsForTable;
}

type scales_CategoryScale = CategoryScale;
declare const scales_CategoryScale: typeof CategoryScale;
type scales_LinearScale = LinearScale;
declare const scales_LinearScale: typeof LinearScale;
type scales_LogarithmicScale = LogarithmicScale;
declare const scales_LogarithmicScale: typeof LogarithmicScale;
type scales_RadialLinearScale = RadialLinearScale;
declare const scales_RadialLinearScale: typeof RadialLinearScale;
type scales_TimeScale = TimeScale;
declare const scales_TimeScale: typeof TimeScale;
type scales_TimeSeriesScale = TimeSeriesScale;
declare const scales_TimeSeriesScale: typeof TimeSeriesScale;
declare namespace scales {
  export {
    scales_CategoryScale as CategoryScale,
    scales_LinearScale as LinearScale,
    scales_LogarithmicScale as LogarithmicScale,
    scales_RadialLinearScale as RadialLinearScale,
    scales_TimeScale as TimeScale,
    scales_TimeSeriesScale as TimeSeriesScale,
  };
}

export { ArcElement, ArcProps, _default$6 as Colors, _detectPlatform, _default$7 as animator, controllers, elements, plugins, scales };
