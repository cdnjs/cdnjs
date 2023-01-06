export default PluggableMap;
/**
 * State of the current frame. Only `pixelRatio`, `time` and `viewState` should
 * be used in applications.
 */
export type FrameState = {
    /**
     * The pixel ratio of the frame.
     */
    pixelRatio: number;
    /**
     * The time when rendering of the frame was requested.
     */
    time: number;
    /**
     * The state of the current view.
     */
    viewState: import("./View.js").State;
    /**
     * Animate.
     */
    animate: boolean;
    /**
     * CoordinateToPixelTransform.
     */
    coordinateToPixelTransform: import("./transform.js").Transform;
    /**
     * DeclutterTree.
     */
    declutterTree: any;
    /**
     * Extent.
     */
    extent: null | import("./extent.js").Extent;
    /**
     * Next extent during an animation series.
     */
    nextExtent?: import("./extent.js").Extent | undefined;
    /**
     * Index.
     */
    index: number;
    /**
     * LayerStatesArray.
     */
    layerStatesArray: Array<import("./layer/Layer.js").State>;
    /**
     * LayerIndex.
     */
    layerIndex: number;
    /**
     * PixelToCoordinateTransform.
     */
    pixelToCoordinateTransform: import("./transform.js").Transform;
    /**
     * PostRenderFunctions.
     */
    postRenderFunctions: Array<PostRenderFunction>;
    /**
     * Size.
     */
    size: import("./size.js").Size;
    /**
     * TileQueue.
     */
    tileQueue: TileQueue;
    /**
     * UsedTiles.
     */
    usedTiles: {
        [x: string]: {
            [x: string]: boolean;
        };
    };
    /**
     * ViewHints.
     */
    viewHints: Array<number>;
    /**
     * WantedTiles.
     */
    wantedTiles: {
        [x: string]: {
            [x: string]: boolean;
        };
    };
    /**
     * The id of the map.
     */
    mapId: string;
    /**
     * Identifiers of previously rendered elements.
     */
    renderTargets: {
        [x: string]: boolean;
    };
};
export type PostRenderFunction = (arg0: PluggableMap, arg1: FrameState | null) => any;
export type AtPixelOptions = {
    /**
     * Layer filter
     * function. The filter function will receive one argument, the
     * {@link module :ol/layer/Layer~Layer layer-candidate} and it should return a boolean value.
     * Only layers which are visible and for which this function returns `true`
     * will be tested for features. By default, all visible layers will be tested.
     */
    layerFilter?: undefined | ((arg0: import("./layer/Layer.js").default<import("./source/Source").default>) => boolean);
    /**
     * Hit-detection tolerance in css pixels. Pixels
     * inside the radius around the given position will be checked for features.
     */
    hitTolerance?: number | undefined;
    /**
     * Check-Wrapped Will check for for wrapped geometries inside the range of
     * +/- 1 world width. Works only if a projection is used that can be wrapped.
     */
    checkWrapped?: boolean | undefined;
};
export type MapOptionsInternal = {
    /**
     * Controls.
     */
    controls?: Collection<import("./control/Control.js").default> | undefined;
    /**
     * Interactions.
     */
    interactions?: Collection<import("./interaction/Interaction.js").default> | undefined;
    /**
     * KeyboardEventTarget.
     */
    keyboardEventTarget: HTMLElement | Document;
    /**
     * Overlays.
     */
    overlays: Collection<import("./Overlay.js").default>;
    /**
     * Values.
     */
    values: {
        [x: string]: any;
    };
};
export type MapObjectEventTypes = import("./ObjectEventType").Types | 'change:layergroup' | 'change:size' | 'change:target' | 'change:view';
/**
 * *
 */
export type PluggableMapOnSignature<Return> = import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> & import("./Observable").OnSignature<MapObjectEventTypes, import("./Object").ObjectEvent, Return> & import("./Observable").OnSignature<import("./MapBrowserEventType").Types, MapBrowserEvent<any>, Return> & import("./Observable").OnSignature<import("./MapEventType").Types, import("./MapEvent").default, Return> & import("./Observable").OnSignature<import("./render/EventType").MapRenderEventTypes, import("./render/Event").default, Return> & import("./Observable").CombinedOnSignature<import("./Observable").EventTypes | MapObjectEventTypes | import("./MapBrowserEventType").Types | import("./MapEventType").Types | import("./render/EventType").MapRenderEventTypes, Return>;
/**
 * Object literal with config options for the map.
 */
export type MapOptions = {
    /**
     * Controls initially added to the map. If not specified,
     * {@link module :ol/control.defaults} is used.
     */
    controls?: Collection<import("./control/Control.js").default> | import("./control/Control.js").default[] | undefined;
    /**
     * The ratio between
     * physical pixels and device-independent pixels (dips) on the device.
     */
    pixelRatio?: number | undefined;
    /**
     * Interactions that are initially added to the map. If not specified,
     * {@link module :ol/interaction.defaults} is used.
     */
    interactions?: Collection<import("./interaction/Interaction.js").default> | import("./interaction/Interaction.js").default[] | undefined;
    /**
     * The element to
     * listen to keyboard events on. This determines when the `KeyboardPan` and
     * `KeyboardZoom` interactions trigger. For example, if this option is set to
     * `document` the keyboard interactions will always trigger. If this option is
     * not specified, the element the library listens to keyboard events on is the
     * map target (i.e. the user-provided div for the map). If this is not
     * `document`, the target element needs to be focused for key events to be
     * emitted, requiring that the target element has a `tabindex` attribute.
     */
    keyboardEventTarget?: string | Document | HTMLElement | undefined;
    /**
     * Layers. If this is not defined, a map with no layers will be rendered. Note
     * that layers are rendered in the order supplied, so if you want, for example,
     * a vector layer to appear on top of a tile layer, it must come after the tile
     * layer.
     */
    layers?: import("./layer/Base.js").default[] | Collection<import("./layer/Base.js").default> | LayerGroup | undefined;
    /**
     * Maximum number tiles to load
     * simultaneously.
     */
    maxTilesLoading?: number | undefined;
    /**
     * The minimum distance in pixels the
     * cursor must move to be detected as a map move event instead of a click.
     * Increasing this value can make it easier to click on the map.
     */
    moveTolerance?: number | undefined;
    /**
     * Overlays initially added to the map. By default, no overlays are added.
     */
    overlays?: Collection<import("./Overlay.js").default> | import("./Overlay.js").default[] | undefined;
    /**
     * The container for the map, either the
     * element itself or the `id` of the element. If not specified at construction
     * time, {@link module :ol/Map~Map#setTarget} must be called for the map to be
     * rendered. If passed by element, the container can be in a secondary document.
     */
    target?: string | HTMLElement | undefined;
    /**
     * The map's view.  No layer sources will be
     * fetched unless this is specified at construction time or through
     * {@link module :ol/Map~Map#setView}.
     */
    view?: View | Promise<import("./View.js").ViewOptions> | undefined;
};
/**
 * @fires import("./MapBrowserEvent.js").MapBrowserEvent
 * @fires import("./MapEvent.js").MapEvent
 * @fires import("./render/Event.js").default#precompose
 * @fires import("./render/Event.js").default#postcompose
 * @fires import("./render/Event.js").default#rendercomplete
 * @api
 */
declare class PluggableMap extends BaseObject {
    /**
     * @param {MapOptions} options Map options.
     */
    constructor(options: MapOptions);
    /***
     * @type {PluggableMapOnSignature<import("./events").EventsKey>}
     */
    on: PluggableMapOnSignature<import("./events").EventsKey>;
    /***
     * @type {PluggableMapOnSignature<import("./events").EventsKey>}
     */
    once: PluggableMapOnSignature<import("./events").EventsKey>;
    /***
     * @type {PluggableMapOnSignature<void>}
     */
    un: PluggableMapOnSignature<void>;
    /**
     * @private
     * @type {boolean}
     */
    private renderComplete_;
    /** @private */
    private boundHandleBrowserEvent_;
    /**
     * @type {number}
     * @private
     */
    private maxTilesLoading_;
    /**
     * @private
     * @type {number}
     */
    private pixelRatio_;
    /**
     * @private
     * @type {*}
     */
    private postRenderTimeoutHandle_;
    /**
     * @private
     * @type {number|undefined}
     */
    private animationDelayKey_;
    /**
     * @private
     */
    private animationDelay_;
    /**
     * @private
     * @type {import("./transform.js").Transform}
     */
    private coordinateToPixelTransform_;
    /**
     * @private
     * @type {import("./transform.js").Transform}
     */
    private pixelToCoordinateTransform_;
    /**
     * @private
     * @type {number}
     */
    private frameIndex_;
    /**
     * @private
     * @type {?FrameState}
     */
    private frameState_;
    /**
     * The extent at the previous 'moveend' event.
     * @private
     * @type {import("./extent.js").Extent}
     */
    private previousExtent_;
    /**
     * @private
     * @type {?import("./events.js").EventsKey}
     */
    private viewPropertyListenerKey_;
    /**
     * @private
     * @type {?import("./events.js").EventsKey}
     */
    private viewChangeListenerKey_;
    /**
     * @private
     * @type {?Array<import("./events.js").EventsKey>}
     */
    private layerGroupPropertyListenerKeys_;
    /**
     * @private
     * @type {!HTMLElement}
     */
    private viewport_;
    /**
     * @private
     * @type {!HTMLElement}
     */
    private overlayContainer_;
    /**
     * @private
     * @type {!HTMLElement}
     */
    private overlayContainerStopEvent_;
    /**
     * @private
     * @type {MapBrowserEventHandler}
     */
    private mapBrowserEventHandler_;
    /**
     * @private
     * @type {number}
     */
    private moveTolerance_;
    /**
     * @private
     * @type {HTMLElement|Document}
     */
    private keyboardEventTarget_;
    /**
     * @private
     * @type {?Array<import("./events.js").EventsKey>}
     */
    private targetChangeHandlerKeys_;
    /**
     * @type {Collection<import("./control/Control.js").default>}
     * @protected
     */
    protected controls: Collection<import("./control/Control.js").default>;
    /**
     * @type {Collection<import("./interaction/Interaction.js").default>}
     * @protected
     */
    protected interactions: Collection<import("./interaction/Interaction.js").default>;
    /**
     * @type {Collection<import("./Overlay.js").default>}
     * @private
     */
    private overlays_;
    /**
     * A lookup of overlays by id.
     * @private
     * @type {Object<string, import("./Overlay.js").default>}
     */
    private overlayIdIndex_;
    /**
     * @type {import("./renderer/Map.js").default}
     * @private
     */
    private renderer_;
    /**
     * @private
     * @type {!Array<PostRenderFunction>}
     */
    private postRenderFunctions_;
    /**
     * @private
     * @type {TileQueue}
     */
    private tileQueue_;
    /**
     * @abstract
     * @return {import("./renderer/Map.js").default} The map renderer
     */
    createRenderer(): import("./renderer/Map.js").default;
    /**
     * Add the given control to the map.
     * @param {import("./control/Control.js").default} control Control.
     * @api
     */
    addControl(control: import("./control/Control.js").default): void;
    /**
     * Add the given interaction to the map. If you want to add an interaction
     * at another point of the collection use `getInteraction()` and the methods
     * available on {@link module:ol/Collection~Collection}. This can be used to
     * stop the event propagation from the handleEvent function. The interactions
     * get to handle the events in the reverse order of this collection.
     * @param {import("./interaction/Interaction.js").default} interaction Interaction to add.
     * @api
     */
    addInteraction(interaction: import("./interaction/Interaction.js").default): void;
    /**
     * Adds the given layer to the top of this map. If you want to add a layer
     * elsewhere in the stack, use `getLayers()` and the methods available on
     * {@link module:ol/Collection~Collection}.
     * @param {import("./layer/Base.js").default} layer Layer.
     * @api
     */
    addLayer(layer: import("./layer/Base.js").default): void;
    /**
     * @param {import("./layer/Group.js").GroupEvent} event The layer add event.
     * @private
     */
    private handleLayerAdd_;
    /**
     * Add the given overlay to the map.
     * @param {import("./Overlay.js").default} overlay Overlay.
     * @api
     */
    addOverlay(overlay: import("./Overlay.js").default): void;
    /**
     * This deals with map's overlay collection changes.
     * @param {import("./Overlay.js").default} overlay Overlay.
     * @private
     */
    private addOverlayInternal_;
    /**
     * Detect features that intersect a pixel on the viewport, and execute a
     * callback with each intersecting feature. Layers included in the detection can
     * be configured through the `layerFilter` option in `opt_options`.
     * @param {import("./pixel.js").Pixel} pixel Pixel.
     * @param {function(import("./Feature.js").FeatureLike, import("./layer/Layer.js").default<import("./source/Source").default>, import("./geom/SimpleGeometry.js").default): T} callback Feature callback. The callback will be
     *     called with two arguments. The first argument is one
     *     {@link module:ol/Feature~Feature feature} or
     *     {@link module:ol/render/Feature~RenderFeature render feature} at the pixel, the second is
     *     the {@link module:ol/layer/Layer~Layer layer} of the feature and will be null for
     *     unmanaged layers. To stop detection, callback functions can return a
     *     truthy value.
     * @param {AtPixelOptions} [opt_options] Optional options.
     * @return {T|undefined} Callback result, i.e. the return value of last
     * callback execution, or the first truthy callback return value.
     * @template T
     * @api
     */
    forEachFeatureAtPixel<T>(pixel: import("./pixel.js").Pixel, callback: (arg0: import("./Feature.js").FeatureLike, arg1: import("./layer/Layer.js").default<import("./source/Source").default>, arg2: import("./geom/SimpleGeometry.js").default) => T, opt_options?: AtPixelOptions | undefined): T | undefined;
    /**
     * Get all features that intersect a pixel on the viewport.
     * @param {import("./pixel.js").Pixel} pixel Pixel.
     * @param {AtPixelOptions} [opt_options] Optional options.
     * @return {Array<import("./Feature.js").FeatureLike>} The detected features or
     * an empty array if none were found.
     * @api
     */
    getFeaturesAtPixel(pixel: import("./pixel.js").Pixel, opt_options?: AtPixelOptions | undefined): Array<import("./Feature.js").FeatureLike>;
    /**
     * Get all layers from all layer groups.
     * @return {Array<import("./layer/Layer.js").default>} Layers.
     * @api
     */
    getAllLayers(): Array<import("./layer/Layer.js").default>;
    /**
     * Please the `layer.getData()` method for {@link module:ol/layer/Tile~TileLayer#getData tile layers} or
     * {@link module:ol/layer/Image~ImageLayer#getData image layers} instead of using this method.
     *
     * Detect layers that have a color value at a pixel on the viewport, and
     * execute a callback with each matching layer. Layers included in the
     * detection can be configured through `opt_layerFilter`.
     *
     * Note: In maps with more than one layer, this method will typically return pixel data
     * representing the composed image of all layers visible at the given pixel – because layers
     * will generally share the same rendering context.  To force layers to render separately, and
     * to get pixel data representing only one layer at a time, you can assign each layer a unique
     * `className` in its constructor.
     *
     * @param {import("./pixel.js").Pixel} pixel Pixel.
     * @param {function(this: S, import("./layer/Layer.js").default, (Uint8ClampedArray|Uint8Array)): T} callback
     *     Layer callback. This callback will receive two arguments: first is the
     *     {@link module:ol/layer/Layer~Layer layer}, second argument is an array representing
     *     [R, G, B, A] pixel values (0 - 255) and will be `null` for layer types
     *     that do not currently support this argument. To stop detection, callback
     *     functions can return a truthy value.
     * @param {AtPixelOptions} [opt_options] Configuration options.
     * @return {T|undefined} Callback result, i.e. the return value of last
     * callback execution, or the first truthy callback return value.
     * @template S,T
     * @api
     * @deprecated
     */
    forEachLayerAtPixel<S, T_1>(pixel: import("./pixel.js").Pixel, callback: (this: S, arg1: import("./layer/Layer.js").default, arg2: (Uint8ClampedArray | Uint8Array)) => T_1, opt_options?: AtPixelOptions | undefined): T_1 | undefined;
    /**
     * Detect if features intersect a pixel on the viewport. Layers included in the
     * detection can be configured through `opt_layerFilter`.
     * @param {import("./pixel.js").Pixel} pixel Pixel.
     * @param {AtPixelOptions} [opt_options] Optional options.
     * @return {boolean} Is there a feature at the given pixel?
     * @api
     */
    hasFeatureAtPixel(pixel: import("./pixel.js").Pixel, opt_options?: AtPixelOptions | undefined): boolean;
    /**
     * Returns the coordinate in user projection for a browser event.
     * @param {MouseEvent} event Event.
     * @return {import("./coordinate.js").Coordinate} Coordinate.
     * @api
     */
    getEventCoordinate(event: MouseEvent): import("./coordinate.js").Coordinate;
    /**
     * Returns the coordinate in view projection for a browser event.
     * @param {MouseEvent} event Event.
     * @return {import("./coordinate.js").Coordinate} Coordinate.
     */
    getEventCoordinateInternal(event: MouseEvent): import("./coordinate.js").Coordinate;
    /**
     * Returns the map pixel position for a browser event relative to the viewport.
     * @param {UIEvent} event Event.
     * @return {import("./pixel.js").Pixel} Pixel.
     * @api
     */
    getEventPixel(event: UIEvent): import("./pixel.js").Pixel;
    /**
     * Get the target in which this map is rendered.
     * Note that this returns what is entered as an option or in setTarget:
     * if that was an element, it returns an element; if a string, it returns that.
     * @return {HTMLElement|string|undefined} The Element or id of the Element that the
     *     map is rendered in.
     * @observable
     * @api
     */
    getTarget(): HTMLElement | string | undefined;
    /**
     * Get the DOM element into which this map is rendered. In contrast to
     * `getTarget` this method always return an `Element`, or `null` if the
     * map has no target.
     * @return {HTMLElement} The element that the map is rendered in.
     * @api
     */
    getTargetElement(): HTMLElement;
    /**
     * Get the coordinate for a given pixel.  This returns a coordinate in the
     * user projection.
     * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
     * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
     * @api
     */
    getCoordinateFromPixel(pixel: import("./pixel.js").Pixel): import("./coordinate.js").Coordinate;
    /**
     * Get the coordinate for a given pixel.  This returns a coordinate in the
     * map view projection.
     * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
     * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
     */
    getCoordinateFromPixelInternal(pixel: import("./pixel.js").Pixel): import("./coordinate.js").Coordinate;
    /**
     * Get the map controls. Modifying this collection changes the controls
     * associated with the map.
     * @return {Collection<import("./control/Control.js").default>} Controls.
     * @api
     */
    getControls(): Collection<import("./control/Control.js").default>;
    /**
     * Get the map overlays. Modifying this collection changes the overlays
     * associated with the map.
     * @return {Collection<import("./Overlay.js").default>} Overlays.
     * @api
     */
    getOverlays(): Collection<import("./Overlay.js").default>;
    /**
     * Get an overlay by its identifier (the value returned by overlay.getId()).
     * Note that the index treats string and numeric identifiers as the same. So
     * `map.getOverlayById(2)` will return an overlay with id `'2'` or `2`.
     * @param {string|number} id Overlay identifier.
     * @return {import("./Overlay.js").default} Overlay.
     * @api
     */
    getOverlayById(id: string | number): import("./Overlay.js").default;
    /**
     * Get the map interactions. Modifying this collection changes the interactions
     * associated with the map.
     *
     * Interactions are used for e.g. pan, zoom and rotate.
     * @return {Collection<import("./interaction/Interaction.js").default>} Interactions.
     * @api
     */
    getInteractions(): Collection<import("./interaction/Interaction.js").default>;
    /**
     * Get the layergroup associated with this map.
     * @return {LayerGroup} A layer group containing the layers in this map.
     * @observable
     * @api
     */
    getLayerGroup(): LayerGroup;
    /**
     * Clear any existing layers and add layers to the map.
     * @param {Array<import("./layer/Base.js").default>|Collection<import("./layer/Base.js").default>} layers The layers to be added to the map.
     * @api
     */
    setLayers(layers: Array<import("./layer/Base.js").default> | Collection<import("./layer/Base.js").default>): void;
    /**
     * Get the collection of layers associated with this map.
     * @return {!Collection<import("./layer/Base.js").default>} Layers.
     * @api
     */
    getLayers(): Collection<import("./layer/Base.js").default>;
    /**
     * @return {boolean} Layers have sources that are still loading.
     */
    getLoadingOrNotReady(): boolean;
    /**
     * Get the pixel for a coordinate.  This takes a coordinate in the user
     * projection and returns the corresponding pixel.
     * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
     * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
     * @api
     */
    getPixelFromCoordinate(coordinate: import("./coordinate.js").Coordinate): import("./pixel.js").Pixel;
    /**
     * Get the pixel for a coordinate.  This takes a coordinate in the map view
     * projection and returns the corresponding pixel.
     * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
     * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
     */
    getPixelFromCoordinateInternal(coordinate: import("./coordinate.js").Coordinate): import("./pixel.js").Pixel;
    /**
     * Get the map renderer.
     * @return {import("./renderer/Map.js").default} Renderer
     */
    getRenderer(): import("./renderer/Map.js").default;
    /**
     * Get the size of this map.
     * @return {import("./size.js").Size|undefined} The size in pixels of the map in the DOM.
     * @observable
     * @api
     */
    getSize(): import("./size.js").Size | undefined;
    /**
     * Get the view associated with this map. A view manages properties such as
     * center and resolution.
     * @return {View} The view that controls this map.
     * @observable
     * @api
     */
    getView(): View;
    /**
     * Get the element that serves as the map viewport.
     * @return {HTMLElement} Viewport.
     * @api
     */
    getViewport(): HTMLElement;
    /**
     * Get the element that serves as the container for overlays.  Elements added to
     * this container will let mousedown and touchstart events through to the map,
     * so clicks and gestures on an overlay will trigger {@link module:ol/MapBrowserEvent~MapBrowserEvent}
     * events.
     * @return {!HTMLElement} The map's overlay container.
     */
    getOverlayContainer(): HTMLElement;
    /**
     * Get the element that serves as a container for overlays that don't allow
     * event propagation. Elements added to this container won't let mousedown and
     * touchstart events through to the map, so clicks and gestures on an overlay
     * don't trigger any {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     * @return {!HTMLElement} The map's overlay container that stops events.
     */
    getOverlayContainerStopEvent(): HTMLElement;
    /**
     * @return {!Document} The document where the map is displayed.
     */
    getOwnerDocument(): Document;
    /**
     * @param {import("./Tile.js").default} tile Tile.
     * @param {string} tileSourceKey Tile source key.
     * @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
     * @param {number} tileResolution Tile resolution.
     * @return {number} Tile priority.
     */
    getTilePriority(tile: import("./Tile.js").default, tileSourceKey: string, tileCenter: import("./coordinate.js").Coordinate, tileResolution: number): number;
    /**
     * @param {UIEvent} browserEvent Browser event.
     * @param {string} [opt_type] Type.
     */
    handleBrowserEvent(browserEvent: UIEvent, opt_type?: string | undefined): void;
    /**
     * @param {MapBrowserEvent} mapBrowserEvent The event to handle.
     */
    handleMapBrowserEvent(mapBrowserEvent: MapBrowserEvent<any>): void;
    /**
     * @protected
     */
    protected handlePostRender(): void;
    /**
     * @private
     */
    private handleSizeChanged_;
    /**
     * @private
     */
    private handleTargetChanged_;
    /**
     * @private
     */
    private handleTileChange_;
    /**
     * @private
     */
    private handleViewPropertyChanged_;
    /**
     * @private
     */
    private handleViewChanged_;
    /**
     * @private
     */
    private handleLayerGroupChanged_;
    /**
     * @return {boolean} Is rendered.
     */
    isRendered(): boolean;
    /**
     * Requests an immediate render in a synchronous manner.
     * @api
     */
    renderSync(): void;
    /**
     * Redraws all text after new fonts have loaded
     */
    redrawText(): void;
    /**
     * Request a map rendering (at the next animation frame).
     * @api
     */
    render(): void;
    /**
     * Remove the given control from the map.
     * @param {import("./control/Control.js").default} control Control.
     * @return {import("./control/Control.js").default|undefined} The removed control (or undefined
     *     if the control was not found).
     * @api
     */
    removeControl(control: import("./control/Control.js").default): import("./control/Control.js").default | undefined;
    /**
     * Remove the given interaction from the map.
     * @param {import("./interaction/Interaction.js").default} interaction Interaction to remove.
     * @return {import("./interaction/Interaction.js").default|undefined} The removed interaction (or
     *     undefined if the interaction was not found).
     * @api
     */
    removeInteraction(interaction: import("./interaction/Interaction.js").default): import("./interaction/Interaction.js").default | undefined;
    /**
     * Removes the given layer from the map.
     * @param {import("./layer/Base.js").default} layer Layer.
     * @return {import("./layer/Base.js").default|undefined} The removed layer (or undefined if the
     *     layer was not found).
     * @api
     */
    removeLayer(layer: import("./layer/Base.js").default): import("./layer/Base.js").default | undefined;
    /**
     * @param {import("./layer/Group.js").GroupEvent} event The layer remove event.
     * @private
     */
    private handleLayerRemove_;
    /**
     * Remove the given overlay from the map.
     * @param {import("./Overlay.js").default} overlay Overlay.
     * @return {import("./Overlay.js").default|undefined} The removed overlay (or undefined
     *     if the overlay was not found).
     * @api
     */
    removeOverlay(overlay: import("./Overlay.js").default): import("./Overlay.js").default | undefined;
    /**
     * @param {number} time Time.
     * @private
     */
    private renderFrame_;
    /**
     * Sets the layergroup of this map.
     * @param {LayerGroup} layerGroup A layer group containing the layers in this map.
     * @observable
     * @api
     */
    setLayerGroup(layerGroup: LayerGroup): void;
    /**
     * Set the size of this map.
     * @param {import("./size.js").Size|undefined} size The size in pixels of the map in the DOM.
     * @observable
     * @api
     */
    setSize(size: import("./size.js").Size | undefined): void;
    /**
     * Set the target element to render this map into.
     * @param {HTMLElement|string} [target] The Element or id of the Element
     *     that the map is rendered in.
     * @observable
     * @api
     */
    setTarget(target?: string | HTMLElement | undefined): void;
    /**
     * Set the view for this map.
     * @param {View|Promise<import("./View.js").ViewOptions>} view The view that controls this map.
     * It is also possible to pass a promise that resolves to options for constructing a view.  This
     * alternative allows view properties to be resolved by sources or other components that load
     * view-related metadata.
     * @observable
     * @api
     */
    setView(view: View | Promise<import("./View.js").ViewOptions>): void;
    /**
     * Force a recalculation of the map viewport size.  This should be called when
     * third-party code changes the size of the map viewport.
     * @api
     */
    updateSize(): void;
    /**
     * Recomputes the viewport size and save it on the view object (if any)
     * @private
     */
    private updateViewportSize_;
}
import TileQueue from "./TileQueue.js";
import Collection from "./Collection.js";
import MapBrowserEvent from "./MapBrowserEvent.js";
import LayerGroup from "./layer/Group.js";
import View from "./View.js";
import BaseObject from "./Object.js";
//# sourceMappingURL=PluggableMap.d.ts.map