/**
 * Create a `geometryFunction` for `type: 'Circle'` that will create a regular
 * polygon with a user specified number of sides and start angle instead of a
 * {@link import("../geom/Circle.js").Circle} geometry.
 * @param {number} [sides] Number of sides of the regular polygon.
 *     Default is 32.
 * @param {number} [angle] Angle of the first point in counter-clockwise
 *     radians. 0 means East.
 *     Default is the angle defined by the heading from the center of the
 *     regular polygon to the current pointer position.
 * @return {GeometryFunction} Function that draws a polygon.
 * @api
 */
export function createRegularPolygon(sides?: number | undefined, angle?: number | undefined): GeometryFunction;
/**
 * Create a `geometryFunction` that will create a box-shaped polygon (aligned
 * with the coordinate system axes).  Use this with the draw interaction and
 * `type: 'Circle'` to return a box instead of a circle geometry.
 * @return {GeometryFunction} Function that draws a box-shaped polygon.
 * @api
 */
export function createBox(): GeometryFunction;
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Draw~Draw} instances are
 * instances of this type.
 */
export class DrawEvent extends Event {
    /**
     * @param {DrawEventType} type Type.
     * @param {Feature} feature The feature drawn.
     */
    constructor(type: DrawEventType, feature: Feature);
    /**
     * The feature being drawn.
     * @type {Feature}
     * @api
     */
    feature: Feature;
}
export default Draw;
export type Options = {
    /**
     * Geometry type of
     * the geometries being drawn with this instance.
     */
    type: import("../geom/Geometry.js").Type;
    /**
     * The maximum distance in pixels between
     * "down" and "up" for a "up" event to be considered a "click" event and
     * actually add a point/vertex to the geometry being drawn.  The default of `6`
     * was chosen for the draw interaction to behave correctly on mouse as well as
     * on touch devices.
     */
    clickTolerance?: number | undefined;
    /**
     * Destination collection for the drawn features.
     */
    features?: import("../Collection.js").default<Feature<import("../geom/Geometry.js").default>> | undefined;
    /**
     * Destination source for
     * the drawn features.
     */
    source?: VectorSource<Feature<import("../geom/Geometry.js").default>> | undefined;
    /**
     * Delay in milliseconds after pointerdown
     * before the current vertex can be dragged to its exact position.
     */
    dragVertexDelay?: number | undefined;
    /**
     * Pixel distance for snapping to the
     * drawing finish. Must be greater than `0`.
     */
    snapTolerance?: number | undefined;
    /**
     * Stop click, singleclick, and
     * doubleclick events from firing during drawing.
     */
    stopClick?: boolean | undefined;
    /**
     * The number of points that can be drawn before
     * a polygon ring or line string is finished. By default there is no
     * restriction.
     */
    maxPoints?: number | undefined;
    /**
     * The number of points that must be drawn
     * before a polygon ring or line string can be finished. Default is `3` for
     * polygon rings and `2` for line strings.
     */
    minPoints?: number | undefined;
    /**
     * A function
     * that takes an {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether the drawing can be finished. Not used when drawing
     * POINT or MULTI_POINT geometries.
     */
    finishCondition?: import("../events/condition.js").Condition | undefined;
    /**
     * Style for sketch features. The draw interaction can have up to three sketch features, depending on the mode.
     * It will always contain a feature with a `Point` geometry that corresponds to the current cursor position.
     * If the mode is `LineString` or `Polygon`, and there is at least one drawn point, it will also contain a feature with
     * a `LineString` geometry that corresponds to the line between the already drawn points and the current cursor position.
     * If the mode is `Polygon`, and there is at least one drawn point, it will also contain a feature with a `Polygon`
     * geometry that corresponds to the polygon between the already drawn points and the current cursor position
     * (note that this polygon has only two points if only one point is drawn).
     * If the mode is `Circle`, and there is one point drawn, it will also contain a feature with a `Circle` geometry whose
     * center is the drawn point and the radius is determined by the distance between the drawn point and the cursor.
     */
    style?: import("../style/Style.js").StyleLike | import("../style/flat.js").FlatStyleLike | undefined;
    /**
     * Function that is called when a geometry's coordinates are updated.
     */
    geometryFunction?: GeometryFunction | undefined;
    /**
     * Geometry name to use for features created
     * by the draw interaction.
     */
    geometryName?: string | undefined;
    /**
     * A function that
     * takes an {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * By default {@link module :ol/events/condition.noModifierKeys}, i.e. a click,
     * adds a vertex or deactivates freehand drawing.
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * Operate in freehand mode for lines,
     * polygons, and circles.  This makes the interaction always operate in freehand
     * mode and takes precedence over any `freehandCondition` option.
     */
    freehand?: boolean | undefined;
    /**
     * Condition that activates freehand drawing for lines and polygons. This
     * function takes an {@link module :ol/MapBrowserEvent~MapBrowserEvent} and
     * returns a boolean to indicate whether that event should be handled. The
     * default is {@link module :ol/events/condition.shiftKeyOnly}, meaning that the
     * Shift key activates freehand drawing.
     */
    freehandCondition?: import("../events/condition.js").Condition | undefined;
    /**
     * Trace a portion of another geometry.
     * Ignored when in freehand mode.
     */
    trace?: boolean | import("../events/condition.js").Condition | undefined;
    /**
     * Source for features to trace.  If tracing is active and a `traceSource` is
     * not provided, the interaction's `source` will be used.  Tracing requires that the interaction is configured with
     * either a `traceSource` or a `source`.
     */
    traceSource?: VectorSource<Feature<import("../geom/Geometry.js").default>> | undefined;
    /**
     * Wrap the world horizontally on the sketch
     * overlay.
     */
    wrapX?: boolean | undefined;
    /**
     * Layout of the
     * feature geometries created by the draw interaction.
     */
    geometryLayout?: import("../geom/Geometry.js").GeometryLayout | undefined;
};
/**
 * Coordinate type when drawing points.
 */
export type PointCoordType = import("../coordinate.js").Coordinate;
/**
 * Coordinate type when drawing lines.
 */
export type LineCoordType = Array<import("../coordinate.js").Coordinate>;
/**
 * Coordinate type when drawing polygons.
 */
export type PolyCoordType = Array<Array<import("../coordinate.js").Coordinate>>;
/**
 * Types used for drawing coordinates.
 */
export type SketchCoordType = number[] | import("../coordinate.js").Coordinate[] | import("../coordinate.js").Coordinate[][];
export type TraceState = {
    /**
     * Tracing active.
     */
    active: boolean;
    /**
     * The initially clicked pixel location.
     */
    startPx?: import("../pixel.js").Pixel | undefined;
    /**
     * Targets available for tracing.
     */
    targets?: TraceTarget[] | undefined;
    /**
     * The index of the currently traced target.  A value of -1 indicates
     * that no trace target is active.
     */
    targetIndex?: number | undefined;
};
export type TraceTarget = {
    /**
     * Target coordinates.
     */
    coordinates: Array<import("../coordinate.js").Coordinate>;
    /**
     * The target coordinates are a linear ring.
     */
    ring: boolean;
    /**
     * The index of first traced coordinate.  A fractional index represents an
     * edge intersection.  Index values for rings will wrap (may be negative or larger than coordinates length).
     */
    startIndex: number;
    /**
     * The index of last traced coordinate.  Details from startIndex also apply here.
     */
    endIndex: number;
};
/**
 * Function that takes an array of coordinates and an optional existing geometry
 * and a projection as arguments, and returns a geometry. The optional existing
 * geometry is the geometry that is returned when the function is called without
 * a second argument.
 */
export type GeometryFunction = (arg0: SketchCoordType, arg1: import("../geom/SimpleGeometry.js").default, arg2: import("../proj/Projection.js").default) => import("../geom/SimpleGeometry.js").default;
/**
 * Draw mode.  This collapses multi-part geometry types with their single-part
 * cousins.
 */
export type Mode = 'Point' | 'LineString' | 'Polygon' | 'Circle';
export type TraceTargetUpdateInfo = {
    /**
     * The new target index.
     */
    index: number;
    /**
     * The new segment end index.
     */
    endIndex: number;
};
export type PointSegmentRelationship = {
    /**
     * The closest point expressed as a fraction along the segment length.
     */
    along: number;
    /**
     * The squared distance of the point to the segment.
     */
    squaredDistance: number;
};
/**
 * *
 */
export type DrawOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types | 'change:active', import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<'drawabort' | 'drawend' | 'drawstart', DrawEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | 'change:active' | 'drawabort' | 'drawend' | 'drawstart', Return>;
import Event from '../events/Event.js';
import Feature from '../Feature.js';
type DrawEventType = string;
declare namespace DrawEventType {
    let DRAWSTART: string;
    let DRAWEND: string;
    let DRAWABORT: string;
}
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'drawabort'|'drawend'|'drawstart', DrawEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'drawabort'|'drawend'|'drawstart', Return>} DrawOnSignature
 */
/**
 * @classdesc
 * Interaction for drawing feature geometries.
 *
 * @fires DrawEvent
 * @api
 */
declare class Draw extends PointerInteraction {
    /**
     * @param {Options} options Options.
     */
    constructor(options: Options);
    /***
     * @type {DrawOnSignature<import("../events").EventsKey>}
     */
    on: DrawOnSignature<import("../events").EventsKey>;
    /***
     * @type {DrawOnSignature<import("../events").EventsKey>}
     */
    once: DrawOnSignature<import("../events").EventsKey>;
    /***
     * @type {DrawOnSignature<void>}
     */
    un: DrawOnSignature<void>;
    /**
     * @type {boolean}
     * @private
     */
    private shouldHandle_;
    /**
     * @type {import("../pixel.js").Pixel}
     * @private
     */
    private downPx_;
    /**
     * @type {ReturnType<typeof setTimeout>}
     * @private
     */
    private downTimeout_;
    /**
     * @type {number|undefined}
     * @private
     */
    private lastDragTime_;
    /**
     * Pointer type of the last pointermove event
     * @type {string}
     * @private
     */
    private pointerType_;
    /**
     * @type {boolean}
     * @private
     */
    private freehand_;
    /**
     * Target source for drawn features.
     * @type {VectorSource|null}
     * @private
     */
    private source_;
    /**
     * Target collection for drawn features.
     * @type {import("../Collection.js").default<Feature>|null}
     * @private
     */
    private features_;
    /**
     * Pixel distance for snapping.
     * @type {number}
     * @private
     */
    private snapTolerance_;
    /**
     * Geometry type.
     * @type {import("../geom/Geometry.js").Type}
     * @private
     */
    private type_;
    /**
     * Drawing mode (derived from geometry type.
     * @type {Mode}
     * @private
     */
    private mode_;
    /**
     * Stop click, singleclick, and doubleclick events from firing during drawing.
     * Default is `false`.
     * @type {boolean}
     * @private
     */
    private stopClick_;
    /**
     * The number of points that must be drawn before a polygon ring or line
     * string can be finished.  The default is 3 for polygon rings and 2 for
     * line strings.
     * @type {number}
     * @private
     */
    private minPoints_;
    /**
     * The number of points that can be drawn before a polygon ring or line string
     * is finished. The default is no restriction.
     * @type {number}
     * @private
     */
    private maxPoints_;
    /**
     * A function to decide if a potential finish coordinate is permissible
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private finishCondition_;
    /**
     * @private
     * @type {import("../geom/Geometry.js").GeometryLayout}
     */
    private geometryLayout_;
    /**
     * @type {GeometryFunction}
     * @private
     */
    private geometryFunction_;
    /**
     * @type {number}
     * @private
     */
    private dragVertexDelay_;
    /**
     * Finish coordinate for the feature (first point for polygons, last point for
     * linestrings).
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    private finishCoordinate_;
    /**
     * Sketch feature.
     * @type {Feature<import('../geom/SimpleGeometry.js').default>}
     * @private
     */
    private sketchFeature_;
    /**
     * Sketch point.
     * @type {Feature<Point>}
     * @private
     */
    private sketchPoint_;
    /**
     * Sketch coordinates. Used when drawing a line or polygon.
     * @type {SketchCoordType}
     * @private
     */
    private sketchCoords_;
    /**
     * Sketch line. Used when drawing polygon.
     * @type {Feature<LineString>}
     * @private
     */
    private sketchLine_;
    /**
     * Sketch line coordinates. Used when drawing a polygon or circle.
     * @type {LineCoordType}
     * @private
     */
    private sketchLineCoords_;
    /**
     * Squared tolerance for handling up events.  If the squared distance
     * between a down and up event is greater than this tolerance, up events
     * will not be handled.
     * @type {number}
     * @private
     */
    private squaredClickTolerance_;
    /**
     * Draw overlay where our sketch features are drawn.
     * @type {VectorLayer}
     * @private
     */
    private overlay_;
    /**
     * Name of the geometry attribute for newly created features.
     * @type {string|undefined}
     * @private
     */
    private geometryName_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private condition_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private freehandCondition_;
    /**
     * @type {import("../events/condition.js").Condition}
     * @private
     */
    private traceCondition_;
    /**
     * @type {TraceState}
     * @private
     */
    private traceState_;
    /**
     * @type {VectorSource|null}
     * @private
     */
    private traceSource_;
    /**
     * Toggle tracing mode or set a tracing condition.
     *
     * @param {boolean|import("../events/condition.js").Condition} trace A boolean to toggle tracing mode or an event
     *     condition that will be checked when a feature is clicked to determine if tracing should be active.
     */
    setTrace(trace: boolean | import("../events/condition.js").Condition): void;
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../Map.js").default} map Map.
     */
    setMap(map: import("../Map.js").default): void;
    /**
     * Get the overlay layer that this interaction renders sketch features to.
     * @return {VectorLayer} Overlay layer.
     * @api
     */
    getOverlay(): VectorLayer<any>;
    /**
     * @private
     */
    private deactivateTrace_;
    /**
     * Activate or deactivate trace state based on a browser event.
     * @param {import("../MapBrowserEvent.js").default} event Event.
     * @private
     */
    private toggleTraceState_;
    /**
     * @param {TraceTarget} target The trace target.
     * @param {number} endIndex The new end index of the trace.
     * @private
     */
    private addOrRemoveTracedCoordinates_;
    /**
     * @param {number} fromIndex The start index.
     * @param {number} toIndex The end index.
     * @private
     */
    private removeTracedCoordinates_;
    /**
     * @param {TraceTarget} target The trace target.
     * @param {number} fromIndex The start index.
     * @param {number} toIndex The end index.
     * @private
     */
    private addTracedCoordinates_;
    /**
     * Update the trace.
     * @param {import("../MapBrowserEvent.js").default} event Event.
     * @private
     */
    private updateTrace_;
    /**
     * Handle move events.
     * @param {import("../MapBrowserEvent.js").default} event A move event.
     * @private
     */
    private handlePointerMove_;
    /**
     * Determine if an event is within the snapping tolerance of the start coord.
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @param {boolean} [tracing] Drawing in trace mode (only stop if at the starting point).
     * @return {boolean} The event is within the snapping tolerance of the start.
     * @private
     */
    private atFinish_;
    /**
     * @param {import("../coordinate").Coordinate} coordinates Coordinate.
     * @private
     */
    private createOrUpdateSketchPoint_;
    /**
     * @param {import("../geom/Polygon.js").default} geometry Polygon geometry.
     * @private
     */
    private createOrUpdateCustomSketchLine_;
    /**
     * Start the drawing.
     * @param {import("../coordinate.js").Coordinate} start Start coordinate.
     * @private
     */
    private startDrawing_;
    /**
     * Modify the drawing.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @private
     */
    private modifyDrawing_;
    /**
     * Add a new coordinate to the drawing.
     * @param {!PointCoordType} coordinate Coordinate
     * @return {Feature<import("../geom/SimpleGeometry.js").default>} The sketch feature.
     * @private
     */
    private addToDrawing_;
    /**
     * @param {number} n The number of points to remove.
     */
    removeLastPoints_(n: number): void;
    /**
     * Remove last point of the feature currently being drawn. Does not do anything when
     * drawing POINT or MULTI_POINT geometries.
     * @api
     */
    removeLastPoint(): void;
    /**
     * Stop drawing and add the sketch feature to the target layer.
     * The {@link module:ol/interaction/Draw~DrawEventType.DRAWEND} event is
     * dispatched before inserting the feature.
     * @return {Feature<import("../geom/SimpleGeometry.js").default>|null} The drawn feature.
     * @api
     */
    finishDrawing(): Feature<import("../geom/SimpleGeometry.js").default> | null;
    /**
     * Stop drawing without adding the sketch feature to the target layer.
     * @return {Feature<import("../geom/SimpleGeometry.js").default>|null} The sketch feature (or null if none).
     * @private
     */
    private abortDrawing_;
    /**
     * Stop drawing without adding the sketch feature to the target layer.
     * @api
     */
    abortDrawing(): void;
    /**
     * Append coordinates to the end of the geometry that is currently being drawn.
     * This can be used when drawing LineStrings or Polygons. Coordinates will
     * either be appended to the current LineString or the outer ring of the current
     * Polygon. If no geometry is being drawn, a new one will be created.
     * @param {!LineCoordType} coordinates Linear coordinates to be appended to
     * the coordinate array.
     * @api
     */
    appendCoordinates(coordinates: LineCoordType): void;
    /**
     * Initiate draw mode by starting from an existing geometry which will
     * receive new additional points. This only works on features with
     * `LineString` geometries, where the interaction will extend lines by adding
     * points to the end of the coordinates array.
     * This will change the original feature, instead of drawing a copy.
     *
     * The function will dispatch a `drawstart` event.
     *
     * @param {!Feature<LineString>} feature Feature to be extended.
     * @api
     */
    extend(feature: Feature<LineString>): void;
    /**
     * Redraw the sketch features.
     * @private
     */
    private updateSketchFeatures_;
    /**
     * @private
     */
    private updateState_;
}
import VectorSource from '../source/Vector.js';
import PointerInteraction from './Pointer.js';
import VectorLayer from '../layer/Vector.js';
import LineString from '../geom/LineString.js';
//# sourceMappingURL=Draw.d.ts.map