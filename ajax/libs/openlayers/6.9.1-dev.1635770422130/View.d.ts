/**
 * @param {ViewOptions} options View options.
 * @return {import("./centerconstraint.js").Type} The constraint.
 */
export function createCenterConstraint(options: ViewOptions): (arg0: number[] | undefined, arg1: number, arg2: number[], arg3?: boolean | undefined, arg4?: number[] | undefined) => number[] | undefined;
/**
 * @param {ViewOptions} options View options.
 * @return {{constraint: import("./resolutionconstraint.js").Type, maxResolution: number,
 *     minResolution: number, minZoom: number, zoomFactor: number}} The constraint.
 */
export function createResolutionConstraint(options: ViewOptions): {
    constraint: (arg0: number | undefined, arg1: number, arg2: number[], arg3?: boolean | undefined) => number | undefined;
    maxResolution: number;
    minResolution: number;
    minZoom: number;
    zoomFactor: number;
};
/**
 * @param {ViewOptions} options View options.
 * @return {import("./rotationconstraint.js").Type} Rotation constraint.
 */
export function createRotationConstraint(options: ViewOptions): (arg0: number | undefined, arg1?: boolean | undefined) => number | undefined;
/**
 * Determine if an animation involves no view change.
 * @param {Animation} animation The animation.
 * @return {boolean} The animation involves no view change.
 */
export function isNoopAnimation(animation: Animation): boolean;
export default View;
/**
 * An animation configuration
 */
export type Animation = {
    /**
     * Source center.
     */
    sourceCenter?: number[];
    /**
     * Target center.
     */
    targetCenter?: number[];
    /**
     * Source resolution.
     */
    sourceResolution?: number;
    /**
     * Target resolution.
     */
    targetResolution?: number;
    /**
     * Source rotation.
     */
    sourceRotation?: number;
    /**
     * Target rotation.
     */
    targetRotation?: number;
    /**
     * Anchor.
     */
    anchor?: number[];
    /**
     * Start.
     */
    start: number;
    /**
     * Duration.
     */
    duration: number;
    /**
     * Complete.
     */
    complete: boolean;
    /**
     * Easing.
     */
    easing: (arg0: number) => number;
    /**
     * Callback.
     */
    callback: (arg0: boolean) => void;
};
export type Constraints = {
    /**
     * Center.
     */
    center: (arg0: number[] | undefined, arg1: number, arg2: number[], arg3?: boolean | undefined, arg4?: number[] | undefined) => number[] | undefined;
    /**
     * Resolution.
     */
    resolution: (arg0: number | undefined, arg1: number, arg2: number[], arg3?: boolean | undefined) => number | undefined;
    /**
     * Rotation.
     */
    rotation: (arg0: number | undefined, arg1?: boolean | undefined) => number | undefined;
};
export type FitOptions = {
    /**
     * The size in pixels of the box to fit
     * the extent into. Default is the current size of the first map in the DOM that
     * uses this view, or `[100, 100]` if no such map is found.
     */
    size?: number[];
    /**
     * Padding (in pixels) to be
     * cleared inside the view. Values in the array are top, right, bottom and left
     * padding.
     */
    padding?: number[];
    /**
     * If the view `constrainResolution` option is `true`,
     * get the nearest extent instead of the closest that actually fits the view.
     */
    nearest?: boolean;
    /**
     * Minimum resolution that we zoom to.
     */
    minResolution?: number;
    /**
     * Maximum zoom level that we zoom to. If
     * `minResolution` is given, this property is ignored.
     */
    maxZoom?: number;
    /**
     * The duration of the animation in milliseconds.
     * By default, there is no animation to the target extent.
     */
    duration?: number;
    /**
     * The easing function used during
     * the animation (defaults to {@link module:ol/easing.inAndOut}).
     * The function will be called for each frame with a number representing a
     * fraction of the animation's duration.  The function should return a number
     * between 0 and 1 representing the progress toward the destination state.
     */
    easing?: (arg0: number) => number;
    /**
     * Function called when the view is in
     * its final position. The callback will be called with `true` if the animation
     * series completed on its own or `false` if it was cancelled.
     */
    callback?: (arg0: boolean) => void;
};
export type ViewOptions = {
    /**
     * The initial center for
     * the view. If a user projection is not set, the coordinate system for the center is
     * specified with the `projection` option. Layer sources will not be fetched if this
     * is not set, but the center can be set later with {@link #setCenter}.
     */
    center?: number[];
    /**
     * Rotation constraint.
     * `false` means no constraint. `true` means no constraint, but snap to zero
     * near zero. A number constrains the rotation to that number of values. For
     * example, `4` will constrain the rotation to 0, 90, 180, and 270 degrees.
     */
    constrainRotation?: number | boolean;
    /**
     * Enable rotation.
     * If `false`, a rotation constraint that always sets the rotation to zero is
     * used. The `constrainRotation` option has no effect if `enableRotation` is
     * `false`.
     */
    enableRotation?: boolean;
    /**
     * The extent that constrains the
     * view, in other words, nothing outside of this extent can be visible on the map.
     */
    extent?: number[];
    /**
     * If true, the extent
     * constraint will only apply to the view center and not the whole extent.
     */
    constrainOnlyCenter?: boolean;
    /**
     * If true, the extent
     * constraint will be applied smoothly, i.e. allow the view to go slightly outside
     * of the given `extent`.
     */
    smoothExtentConstraint?: boolean;
    /**
     * The maximum resolution used to determine
     * the resolution constraint. It is used together with `minResolution` (or
     * `maxZoom`) and `zoomFactor`. If unspecified it is calculated in such a way
     * that the projection's validity extent fits in a 256x256 px tile. If the
     * projection is Spherical Mercator (the default) then `maxResolution` defaults
     * to `40075016.68557849 / 256 = 156543.03392804097`.
     */
    maxResolution?: number;
    /**
     * The minimum resolution used to determine
     * the resolution constraint.  It is used together with `maxResolution` (or
     * `minZoom`) and `zoomFactor`.  If unspecified it is calculated assuming 29
     * zoom levels (with a factor of 2). If the projection is Spherical Mercator
     * (the default) then `minResolution` defaults to
     * `40075016.68557849 / 256 / Math.pow(2, 28) = 0.0005831682455839253`.
     */
    minResolution?: number;
    /**
     * The maximum zoom level used to determine the
     * resolution constraint. It is used together with `minZoom` (or
     * `maxResolution`) and `zoomFactor`.  Note that if `minResolution` is also
     * provided, it is given precedence over `maxZoom`.
     */
    maxZoom?: number;
    /**
     * The minimum zoom level used to determine the
     * resolution constraint. It is used together with `maxZoom` (or
     * `minResolution`) and `zoomFactor`.  Note that if `maxResolution` is also
     * provided, it is given precedence over `minZoom`.
     */
    minZoom?: number;
    /**
     * If `false` the view is constrained so
     * only one world is visible, and you cannot pan off the edge.  If `true` the map
     * may show multiple worlds at low zoom levels.  Only used if the `projection` is
     * global.  Note that if `extent` is also provided it is given precedence.
     */
    multiWorld?: boolean;
    /**
     * If true, the view will always
     * animate to the closest zoom level after an interaction; false means
     * intermediary zoom levels are allowed.
     */
    constrainResolution?: boolean;
    /**
     * If true, the resolution
     * min/max values will be applied smoothly, i. e. allow the view to exceed slightly
     * the given resolution or zoom bounds.
     */
    smoothResolutionConstraint?: boolean;
    /**
     * Allow the view to be zoomed out to
     * show the full configured extent. By default, when a view is configured with an
     * extent, users will not be able to zoom out so the viewport exceeds the extent in
     * either dimension. This means the full extent may not be visible if the viewport
     * is taller or wider than the aspect ratio of the configured extent. If
     * showFullExtent is true, the user will be able to zoom out so that the viewport
     * exceeds the height or width of the configured extent, but not both, allowing the
     * full extent to be shown.
     */
    showFullExtent?: boolean;
    /**
     * The
     * projection. The default is Spherical Mercator.
     */
    projection?: string | import("./proj/Projection.js").default | undefined;
    /**
     * The initial resolution for the view. The
     * units are `projection` units per pixel (e.g. meters per pixel). An
     * alternative to setting this is to set `zoom`. Layer sources will not be
     * fetched if neither this nor `zoom` are defined, but they can be set later
     * with {@link #setZoom} or {@link #setResolution}.
     */
    resolution?: number;
    /**
     * Resolutions that determine the
     * zoom levels if specified. The index in the array corresponds to the zoom level,
     * therefore the resolution values have to be in descending order. It also constrains
     * the resolution by the minimum and maximum value. If set the `maxResolution`,
     * `minResolution`, `minZoom`, `maxZoom`, and `zoomFactor` options are ignored.
     */
    resolutions?: number[];
    /**
     * The initial rotation for the view in radians
     * (positive rotation clockwise, 0 means North).
     */
    rotation?: number;
    /**
     * Only used if `resolution` is not defined. Zoom
     * level used to calculate the initial resolution for the view.
     */
    zoom?: number;
    /**
     * The zoom factor used to compute the
     * corresponding resolution.
     */
    zoomFactor?: number;
    /**
     * Padding (in css pixels).
     * If the map viewport is partially covered with other content (overlays) along
     * its edges, this setting allows to shift the center of the viewport away from
     * that content. The order of the values is top, right, bottom, left.
     */
    padding?: number[];
};
export type AnimationOptions = {
    /**
     * The center of the view at the end of
     * the animation.
     */
    center?: number[];
    /**
     * The zoom level of the view at the end of the
     * animation. This takes precedence over `resolution`.
     */
    zoom?: number;
    /**
     * The resolution of the view at the end
     * of the animation.  If `zoom` is also provided, this option will be ignored.
     */
    resolution?: number;
    /**
     * The rotation of the view at the end of
     * the animation.
     */
    rotation?: number;
    /**
     * Optional anchor to remain fixed
     * during a rotation or resolution animation.
     */
    anchor?: number[];
    /**
     * The duration of the animation in milliseconds.
     */
    duration?: number;
    /**
     * The easing function used
     * during the animation (defaults to {@link module:ol/easing.inAndOut}).
     * The function will be called for each frame with a number representing a
     * fraction of the animation's duration.  The function should return a number
     * between 0 and 1 representing the progress toward the destination state.
     */
    easing?: (arg0: number) => number;
};
export type State = {
    /**
     * Center.
     */
    center: number[];
    /**
     * Projection.
     */
    projection: import("./proj/Projection.js").default;
    /**
     * Resolution.
     */
    resolution: number;
    /**
     * The next center during an animation series.
     */
    nextCenter?: number[];
    /**
     * The next resolution during an animation series.
     */
    nextResolution?: number;
    /**
     * The next rotation during an animation series.
     */
    nextRotation?: number;
    /**
     * Rotation.
     */
    rotation: number;
    /**
     * Zoom.
     */
    zoom: number;
};
export type ViewObjectEventTypes = "propertychange" | "change:center" | "change:resolution" | "change:rotation";
/**
 * *
 */
export type ViewOnSignature<Return> = ((type: "error" | "change", listener: (event: import("./events/Event.js").default) => any) => Return) & ((type: "propertychange" | "change:center" | "change:resolution" | "change:rotation", listener: (event: import("./Object.js").ObjectEvent) => any) => Return) & ((type: ("error" | "change" | "propertychange" | "change:center" | "change:resolution" | "change:rotation")[], listener: (event: Event | import("./events/Event.js").default) => any) => Return extends void | null ? void : Return[]);
/**
 * @typedef {import("./ObjectEventType").Types|'change:center'|'change:resolution'|'change:rotation'} ViewObjectEventTypes
 */
/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<ViewObjectEventTypes, import("./Object").ObjectEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|ViewObjectEventTypes, Return>} ViewOnSignature
 */
/**
 * @classdesc
 * A View object represents a simple 2D view of the map.
 *
 * This is the object to act upon to change the center, resolution,
 * and rotation of the map.
 *
 * A View has a `projection`. The projection determines the
 * coordinate system of the center, and its units determine the units of the
 * resolution (projection units per pixel). The default projection is
 * Spherical Mercator (EPSG:3857).
 *
 * ### The view states
 *
 * A View is determined by three states: `center`, `resolution`,
 * and `rotation`. Each state has a corresponding getter and setter, e.g.
 * `getCenter` and `setCenter` for the `center` state.
 *
 * The `zoom` state is actually not saved on the view: all computations
 * internally use the `resolution` state. Still, the `setZoom` and `getZoom`
 * methods are available, as well as `getResolutionForZoom` and
 * `getZoomForResolution` to switch from one system to the other.
 *
 * ### The constraints
 *
 * `setCenter`, `setResolution` and `setRotation` can be used to change the
 * states of the view, but any constraint defined in the constructor will
 * be applied along the way.
 *
 * A View object can have a *resolution constraint*, a *rotation constraint*
 * and a *center constraint*.
 *
 * The *resolution constraint* typically restricts min/max values and
 * snaps to specific resolutions. It is determined by the following
 * options: `resolutions`, `maxResolution`, `maxZoom` and `zoomFactor`.
 * If `resolutions` is set, the other three options are ignored. See
 * documentation for each option for more information. By default, the view
 * only has a min/max restriction and allow intermediary zoom levels when
 * pinch-zooming for example.
 *
 * The *rotation constraint* snaps to specific angles. It is determined
 * by the following options: `enableRotation` and `constrainRotation`.
 * By default rotation is allowed and its value is snapped to zero when approaching the
 * horizontal.
 *
 * The *center constraint* is determined by the `extent` option. By
 * default the view center is not constrained at all.
 *
 * ### Changing the view state
 *
 * It is important to note that `setZoom`, `setResolution`, `setCenter` and
 * `setRotation` are subject to the above mentioned constraints. As such, it
 * may sometimes not be possible to know in advance the resulting state of the
 * View. For example, calling `setResolution(10)` does not guarantee that
 * `getResolution()` will return `10`.
 *
 * A consequence of this is that, when applying a delta on the view state, one
 * should use `adjustCenter`, `adjustRotation`, `adjustZoom` and `adjustResolution`
 * rather than the corresponding setters. This will let view do its internal
 * computations. Besides, the `adjust*` methods also take an `opt_anchor`
 * argument which allows specifying an origin for the transformation.
 *
 * ### Interacting with the view
 *
 * View constraints are usually only applied when the view is *at rest*, meaning that
 * no interaction or animation is ongoing. As such, if the user puts the view in a
 * state that is not equivalent to a constrained one (e.g. rotating the view when
 * the snap angle is 0), an animation will be triggered at the interaction end to
 * put back the view to a stable state;
 *
 * @api
 */
declare class View extends BaseObject {
    /**
     * @param {ViewOptions} [opt_options] View options.
     */
    constructor(opt_options?: ViewOptions | undefined);
    /***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */
    on: ViewOnSignature<import("./events").EventsKey>;
    /***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */
    once: ViewOnSignature<import("./events").EventsKey>;
    /***
     * @type {ViewOnSignature<void>}
     */
    un: ViewOnSignature<void>;
    /**
     * @private
     * @type {Array<number>}
     */
    private hints_;
    /**
     * @private
     * @type {Array<Array<Animation>>}
     */
    private animations_;
    /**
     * @private
     * @type {number|undefined}
     */
    private updateAnimationKey_;
    /**
     * @private
     * @const
     * @type {import("./proj/Projection.js").default}
     */
    private projection_;
    /**
     * @private
     * @type {import("./size.js").Size}
     */
    private viewportSize_;
    /**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */
    private targetCenter_;
    /**
     * @private
     * @type {number|undefined}
     */
    private targetResolution_;
    /**
     * @private
     * @type {number|undefined}
     */
    private targetRotation_;
    /**
     * @private
     * @type {import("./coordinate.js").Coordinate}
     */
    private nextCenter_;
    /**
     * @private
     * @type {number}
     */
    private nextResolution_;
    /**
     * @private
     * @type {number}
     */
    private nextRotation_;
    /**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */
    private cancelAnchor_;
    /**
     * Set up the view with the given options.
     * @param {ViewOptions} options View options.
     */
    applyOptions_(options: ViewOptions): void;
    /**
     * @private
     * @type {number}
     */
    private maxResolution_;
    /**
     * @private
     * @type {number}
     */
    private minResolution_;
    /**
     * @private
     * @type {number}
     */
    private zoomFactor_;
    /**
     * @private
     * @type {Array<number>|undefined}
     */
    private resolutions_;
    /**
     * @type {Array<number>|undefined}
     * @private
     */
    private padding_;
    /**
     * @private
     * @type {number}
     */
    private minZoom_;
    /**
     * @private
     * @type {Constraints}
     */
    private constraints_;
    /**
     * @private
     * @type {ViewOptions}
     */
    private options_;
    set padding(arg: number[] | undefined);
    /**
     * Padding (in css pixels).
     * If the map viewport is partially covered with other content (overlays) along
     * its edges, this setting allows to shift the center of the viewport away from that
     * content. The order of the values in the array is top, right, bottom, left.
     * The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
     * @type {Array<number>|undefined}
     * @api
     */
    get padding(): number[] | undefined;
    /**
     * Get an updated version of the view options used to construct the view.  The
     * current resolution (or zoom), center, and rotation are applied to any stored
     * options.  The provided options can be used to apply new min/max zoom or
     * resolution limits.
     * @param {ViewOptions} newOptions New options to be applied.
     * @return {ViewOptions} New options updated with the current view state.
     */
    getUpdatedOptions_(newOptions: ViewOptions): ViewOptions;
    /**
     * Animate the view.  The view's center, zoom (or resolution), and rotation
     * can be animated for smooth transitions between view states.  For example,
     * to animate the view to a new zoom level:
     *
     *     view.animate({zoom: view.getZoom() + 1});
     *
     * By default, the animation lasts one second and uses in-and-out easing.  You
     * can customize this behavior by including `duration` (in milliseconds) and
     * `easing` options (see {@link module:ol/easing}).
     *
     * To chain together multiple animations, call the method with multiple
     * animation objects.  For example, to first zoom and then pan:
     *
     *     view.animate({zoom: 10}, {center: [0, 0]});
     *
     * If you provide a function as the last argument to the animate method, it
     * will get called at the end of an animation series.  The callback will be
     * called with `true` if the animation series completed on its own or `false`
     * if it was cancelled.
     *
     * Animations are cancelled by user interactions (e.g. dragging the map) or by
     * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
     * (or another method that calls one of these).
     *
     * @param {...(AnimationOptions|function(boolean): void)} var_args Animation
     *     options.  Multiple animations can be run in series by passing multiple
     *     options objects.  To run multiple animations in parallel, call the method
     *     multiple times.  An optional callback can be provided as a final
     *     argument.  The callback will be called with a boolean indicating whether
     *     the animation completed without being cancelled.
     * @api
     */
    animate(...args: (AnimationOptions | ((arg0: boolean) => void))[]): void;
    /**
     * @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
     */
    animateInternal(...args: (AnimationOptions | ((arg0: boolean) => void))[]): void;
    /**
     * Determine if the view is being animated.
     * @return {boolean} The view is being animated.
     * @api
     */
    getAnimating(): boolean;
    /**
     * Determine if the user is interacting with the view, such as panning or zooming.
     * @return {boolean} The view is being interacted with.
     * @api
     */
    getInteracting(): boolean;
    /**
     * Cancel any ongoing animations.
     * @api
     */
    cancelAnimations(): void;
    /**
     * Update all animations.
     */
    updateAnimations_(): void;
    /**
     * @param {number} rotation Target rotation.
     * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
     * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
     */
    calculateCenterRotate(rotation: number, anchor: number[]): number[] | undefined;
    /**
     * @param {number} resolution Target resolution.
     * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
     * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
     */
    calculateCenterZoom(resolution: number, anchor: number[]): number[] | undefined;
    /**
     * Returns the current viewport size.
     * @private
     * @param {number} [opt_rotation] Take into account the rotation of the viewport when giving the size
     * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
     */
    private getViewportSize_;
    /**
     * Stores the viewport size on the view. The viewport size is not read every time from the DOM
     * to avoid performance hit and layout reflow.
     * This should be done on map size change.
     * Note: the constraints are not resolved during an animation to avoid stopping it
     * @param {import("./size.js").Size} [opt_size] Viewport size; if undefined, [100, 100] is assumed
     */
    setViewportSize(opt_size?: number[] | undefined): void;
    /**
     * Get the view center.
     * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
     * @observable
     * @api
     */
    getCenter(): number[] | undefined;
    /**
     * Get the view center without transforming to user projection.
     * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
     */
    getCenterInternal(): number[] | undefined;
    /**
     * @return {Constraints} Constraints.
     */
    getConstraints(): Constraints;
    /**
     * @return {boolean} Resolution constraint is set
     */
    getConstrainResolution(): boolean;
    /**
     * @param {Array<number>} [opt_hints] Destination array.
     * @return {Array<number>} Hint.
     */
    getHints(opt_hints?: number[] | undefined): number[];
    /**
     * Calculate the extent for the current view state and the passed size.
     * The size is the pixel dimensions of the box into which the calculated extent
     * should fit. In most cases you want to get the extent of the entire map,
     * that is `map.getSize()`.
     * @param {import("./size.js").Size} [opt_size] Box pixel size. If not provided, the size
     * of the map that uses this view will be used.
     * @return {import("./extent.js").Extent} Extent.
     * @api
     */
    calculateExtent(opt_size?: number[] | undefined): number[];
    /**
     * @param {import("./size.js").Size} [opt_size] Box pixel size. If not provided,
     * the map's last known viewport size will be used.
     * @return {import("./extent.js").Extent} Extent.
     */
    calculateExtentInternal(opt_size?: number[] | undefined): number[];
    /**
     * Get the maximum resolution of the view.
     * @return {number} The maximum resolution of the view.
     * @api
     */
    getMaxResolution(): number;
    /**
     * Get the minimum resolution of the view.
     * @return {number} The minimum resolution of the view.
     * @api
     */
    getMinResolution(): number;
    /**
     * Get the maximum zoom level for the view.
     * @return {number} The maximum zoom level.
     * @api
     */
    getMaxZoom(): number;
    /**
     * Set a new maximum zoom level for the view.
     * @param {number} zoom The maximum zoom level.
     * @api
     */
    setMaxZoom(zoom: number): void;
    /**
     * Get the minimum zoom level for the view.
     * @return {number} The minimum zoom level.
     * @api
     */
    getMinZoom(): number;
    /**
     * Set a new minimum zoom level for the view.
     * @param {number} zoom The minimum zoom level.
     * @api
     */
    setMinZoom(zoom: number): void;
    /**
     * Set whether the view should allow intermediary zoom levels.
     * @param {boolean} enabled Whether the resolution is constrained.
     * @api
     */
    setConstrainResolution(enabled: boolean): void;
    /**
     * Get the view projection.
     * @return {import("./proj/Projection.js").default} The projection of the view.
     * @api
     */
    getProjection(): import("./proj/Projection.js").default;
    /**
     * Get the view resolution.
     * @return {number|undefined} The resolution of the view.
     * @observable
     * @api
     */
    getResolution(): number | undefined;
    /**
     * Get the resolutions for the view. This returns the array of resolutions
     * passed to the constructor of the View, or undefined if none were given.
     * @return {Array<number>|undefined} The resolutions of the view.
     * @api
     */
    getResolutions(): number[] | undefined;
    /**
     * Get the resolution for a provided extent (in map units) and size (in pixels).
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {import("./size.js").Size} [opt_size] Box pixel size.
     * @return {number} The resolution at which the provided extent will render at
     *     the given size.
     * @api
     */
    getResolutionForExtent(extent: number[], opt_size?: number[] | undefined): number;
    /**
     * Get the resolution for a provided extent (in map units) and size (in pixels).
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {import("./size.js").Size} [opt_size] Box pixel size.
     * @return {number} The resolution at which the provided extent will render at
     *     the given size.
     */
    getResolutionForExtentInternal(extent: number[], opt_size?: number[] | undefined): number;
    /**
     * Return a function that returns a value between 0 and 1 for a
     * resolution. Exponential scaling is assumed.
     * @param {number} [opt_power] Power.
     * @return {function(number): number} Resolution for value function.
     */
    getResolutionForValueFunction(opt_power?: number | undefined): (arg0: number) => number;
    /**
     * Get the view rotation.
     * @return {number} The rotation of the view in radians.
     * @observable
     * @api
     */
    getRotation(): number;
    /**
     * Return a function that returns a resolution for a value between
     * 0 and 1. Exponential scaling is assumed.
     * @param {number} [opt_power] Power.
     * @return {function(number): number} Value for resolution function.
     */
    getValueForResolutionFunction(opt_power?: number | undefined): (arg0: number) => number;
    /**
     * Returns the size of the viewport minus padding.
     * @private
     * @param {number} [opt_rotation] Take into account the rotation of the viewport when giving the size
     * @return {import("./size.js").Size} Viewport size reduced by the padding.
     */
    private getViewportSizeMinusPadding_;
    /**
     * @return {State} View state.
     */
    getState(): State;
    /**
     * Get the current zoom level. This method may return non-integer zoom levels
     * if the view does not constrain the resolution, or if an interaction or
     * animation is underway.
     * @return {number|undefined} Zoom.
     * @api
     */
    getZoom(): number | undefined;
    /**
     * Get the zoom level for a resolution.
     * @param {number} resolution The resolution.
     * @return {number|undefined} The zoom level for the provided resolution.
     * @api
     */
    getZoomForResolution(resolution: number): number | undefined;
    /**
     * Get the resolution for a zoom level.
     * @param {number} zoom Zoom level.
     * @return {number} The view resolution for the provided zoom level.
     * @api
     */
    getResolutionForZoom(zoom: number): number;
    /**
     * Fit the given geometry or extent based on the given map size and border.
     * The size is pixel dimensions of the box to fit the extent into.
     * In most cases you will want to use the map size, that is `map.getSize()`.
     * Takes care of the map angle.
     * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
     *     extent to fit the view to.
     * @param {FitOptions} [opt_options] Options.
     * @api
     */
    fit(geometryOrExtent: number[] | import("./geom/SimpleGeometry.js").default, opt_options?: FitOptions | undefined): void;
    /**
     * Calculate rotated extent
     * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
     * @return {import("./extent").Extent} The rotated extent for the geometry.
     */
    rotatedExtentForGeometry(geometry: import("./geom/SimpleGeometry.js").default): number[];
    /**
     * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
     * @param {FitOptions} [opt_options] Options.
     */
    fitInternal(geometry: import("./geom/SimpleGeometry.js").default, opt_options?: FitOptions | undefined): void;
    /**
     * Center on coordinate and view position.
     * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("./size.js").Size} size Box pixel size.
     * @param {import("./pixel.js").Pixel} position Position on the view to center on.
     * @api
     */
    centerOn(coordinate: number[], size: number[], position: number[]): void;
    /**
     * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("./size.js").Size} size Box pixel size.
     * @param {import("./pixel.js").Pixel} position Position on the view to center on.
     */
    centerOnInternal(coordinate: number[], size: number[], position: number[]): void;
    /**
     * Calculates the shift between map and viewport center.
     * @param {import("./coordinate.js").Coordinate} center Center.
     * @param {number} resolution Resolution.
     * @param {number} rotation Rotation.
     * @param {import("./size.js").Size} size Size.
     * @return {Array<number>|undefined} Center shift.
     */
    calculateCenterShift(center: number[], resolution: number, rotation: number, size: number[]): number[] | undefined;
    /**
     * @return {boolean} Is defined.
     */
    isDef(): boolean;
    /**
     * Adds relative coordinates to the center of the view. Any extent constraint will apply.
     * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
     * @api
     */
    adjustCenter(deltaCoordinates: number[]): void;
    /**
     * Adds relative coordinates to the center of the view. Any extent constraint will apply.
     * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
     */
    adjustCenterInternal(deltaCoordinates: number[]): void;
    /**
     * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
     * constraint will apply.
     * @param {number} ratio The ratio to apply on the view resolution.
     * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
     * @api
     */
    adjustResolution(ratio: number, opt_anchor?: number[] | undefined): void;
    /**
     * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
     * constraint will apply.
     * @param {number} ratio The ratio to apply on the view resolution.
     * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
     */
    adjustResolutionInternal(ratio: number, opt_anchor?: number[] | undefined): void;
    /**
     * Adds a value to the view zoom level, optionally using an anchor. Any resolution
     * constraint will apply.
     * @param {number} delta Relative value to add to the zoom level.
     * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
     * @api
     */
    adjustZoom(delta: number, opt_anchor?: number[] | undefined): void;
    /**
     * Adds a value to the view rotation, optionally using an anchor. Any rotation
     * constraint will apply.
     * @param {number} delta Relative value to add to the zoom rotation, in radians.
     * @param {import("./coordinate.js").Coordinate} [opt_anchor] The rotation center.
     * @api
     */
    adjustRotation(delta: number, opt_anchor?: number[] | undefined): void;
    /**
     * @param {number} delta Relative value to add to the zoom rotation, in radians.
     * @param {import("./coordinate.js").Coordinate} [opt_anchor] The rotation center.
     */
    adjustRotationInternal(delta: number, opt_anchor?: number[] | undefined): void;
    /**
     * Set the center of the current view. Any extent constraint will apply.
     * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
     * @observable
     * @api
     */
    setCenter(center: number[] | undefined): void;
    /**
     * Set the center using the view projection (not the user projection).
     * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
     */
    setCenterInternal(center: number[] | undefined): void;
    /**
     * @param {import("./ViewHint.js").default} hint Hint.
     * @param {number} delta Delta.
     * @return {number} New value.
     */
    setHint(hint: any, delta: number): number;
    /**
     * Set the resolution for this view. Any resolution constraint will apply.
     * @param {number|undefined} resolution The resolution of the view.
     * @observable
     * @api
     */
    setResolution(resolution: number | undefined): void;
    /**
     * Set the rotation for this view. Any rotation constraint will apply.
     * @param {number} rotation The rotation of the view in radians.
     * @observable
     * @api
     */
    setRotation(rotation: number): void;
    /**
     * Zoom to a specific zoom level. Any resolution constrain will apply.
     * @param {number} zoom Zoom level.
     * @api
     */
    setZoom(zoom: number): void;
    /**
     * Recompute rotation/resolution/center based on target values.
     * Note: we have to compute rotation first, then resolution and center considering that
     * parameters can influence one another in case a view extent constraint is present.
     * @param {boolean} [opt_doNotCancelAnims] Do not cancel animations.
     * @param {boolean} [opt_forceMoving] Apply constraints as if the view is moving.
     * @private
     */
    private applyTargetState_;
    /**
     * If any constraints need to be applied, an animation will be triggered.
     * This is typically done on interaction end.
     * Note: calling this with a duration of 0 will apply the constrained values straight away,
     * without animation.
     * @param {number} [opt_duration] The animation duration in ms.
     * @param {number} [opt_resolutionDirection] Which direction to zoom.
     * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
     */
    resolveConstraints(opt_duration?: number | undefined, opt_resolutionDirection?: number | undefined, opt_anchor?: number[] | undefined): void;
    /**
     * Notify the View that an interaction has started.
     * The view state will be resolved to a stable one if needed
     * (depending on its constraints).
     * @api
     */
    beginInteraction(): void;
    /**
     * Notify the View that an interaction has ended. The view state will be resolved
     * to a stable one if needed (depending on its constraints).
     * @param {number} [opt_duration] Animation duration in ms.
     * @param {number} [opt_resolutionDirection] Which direction to zoom.
     * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
     * @api
     */
    endInteraction(opt_duration?: number | undefined, opt_resolutionDirection?: number | undefined, opt_anchor?: number[] | undefined): void;
    /**
     * Notify the View that an interaction has ended. The view state will be resolved
     * to a stable one if needed (depending on its constraints).
     * @param {number} [opt_duration] Animation duration in ms.
     * @param {number} [opt_resolutionDirection] Which direction to zoom.
     * @param {import("./coordinate.js").Coordinate} [opt_anchor] The origin of the transformation.
     */
    endInteractionInternal(opt_duration?: number | undefined, opt_resolutionDirection?: number | undefined, opt_anchor?: number[] | undefined): void;
    /**
     * Get a valid position for the view center according to the current constraints.
     * @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
     * @param {number} [opt_targetResolution] Target resolution. If not supplied, the current one will be used.
     * This is useful to guess a valid center position at a different zoom level.
     * @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
     */
    getConstrainedCenter(targetCenter: number[] | undefined, opt_targetResolution?: number | undefined): number[] | undefined;
    /**
     * Get a valid zoom level according to the current view constraints.
     * @param {number|undefined} targetZoom Target zoom.
     * @param {number} [opt_direction=0] Indicate which resolution should be used
     * by a renderer if the view resolution does not match any resolution of the tile source.
     * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
     * will be used. If -1, the nearest higher resolution will be used.
     * @return {number|undefined} Valid zoom level.
     */
    getConstrainedZoom(targetZoom: number | undefined, opt_direction?: number | undefined): number | undefined;
    /**
     * Get a valid resolution according to the current view constraints.
     * @param {number|undefined} targetResolution Target resolution.
     * @param {number} [opt_direction=0] Indicate which resolution should be used
     * by a renderer if the view resolution does not match any resolution of the tile source.
     * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
     * will be used. If -1, the nearest higher resolution will be used.
     * @return {number|undefined} Valid resolution.
     */
    getConstrainedResolution(targetResolution: number | undefined, opt_direction?: number | undefined): number | undefined;
}
import BaseObject from "./Object.js";
//# sourceMappingURL=View.d.ts.map