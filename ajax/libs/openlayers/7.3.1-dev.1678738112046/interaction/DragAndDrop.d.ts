/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/DragAndDrop~DragAndDrop} instances are instances
 * of this type.
 */
export class DragAndDropEvent extends Event {
    /**
     * @param {DragAndDropEventType} type Type.
     * @param {File} file File.
     * @param {Array<import("../Feature.js").default>} [features] Features.
     * @param {import("../proj/Projection.js").default} [projection] Projection.
     */
    constructor(type: DragAndDropEventType, file: File, features?: import("../Feature.js").default<import("../geom/Geometry.js").default>[] | undefined, projection?: import("../proj/Projection.js").default | undefined);
    /**
     * The features parsed from dropped data.
     * @type {Array<import("../Feature.js").FeatureLike>|undefined}
     * @api
     */
    features: Array<import("../Feature.js").FeatureLike> | undefined;
    /**
     * The dropped file.
     * @type {File}
     * @api
     */
    file: File;
    /**
     * The feature projection.
     * @type {import("../proj/Projection.js").default|undefined}
     * @api
     */
    projection: import("../proj/Projection.js").default | undefined;
}
export default DragAndDrop;
export type Options = {
    /**
     * Format constructors
     * (and/or formats pre-constructed with options).
     */
    formatConstructors?: (import("../format/Feature.js").default | typeof import("../format/Feature.js").default)[] | undefined;
    /**
     * Optional vector source where features will be added.  If a source is provided
     * all existing features will be removed and new features will be added when
     * they are dropped on the target.  If you want to add features to a vector
     * source without removing the existing features (append only), instead of
     * providing the source option listen for the "addfeatures" event.
     */
    source?: import("../source/Vector.js").default<import("../geom/Geometry.js").default> | undefined;
    /**
     * Target projection. By default, the map's view's projection is used.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * The element that is used as the drop target, default is the viewport element.
     */
    target?: HTMLElement | undefined;
};
/**
 * *
 */
export type DragAndDropOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types | 'change:active', import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<'addfeatures', DragAndDropEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | 'change:active' | 'addfeatures', Return>;
import Event from "../events/Event.js";
type DragAndDropEventType = string;
declare namespace DragAndDropEventType {
    const ADD_FEATURES: string;
}
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'addfeatures', DragAndDropEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'addfeatures', Return>} DragAndDropOnSignature
 */
/**
 * @classdesc
 * Handles input of vector data by drag and drop.
 *
 * @api
 *
 * @fires DragAndDropEvent
 */
declare class DragAndDrop extends Interaction {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
    /***
     * @type {DragAndDropOnSignature<import("../events").EventsKey>}
     */
    on: DragAndDropOnSignature<import("../events").EventsKey>;
    /***
     * @type {DragAndDropOnSignature<import("../events").EventsKey>}
     */
    once: DragAndDropOnSignature<import("../events").EventsKey>;
    /***
     * @type {DragAndDropOnSignature<void>}
     */
    un: DragAndDropOnSignature<void>;
    /**
     * @private
     * @type {boolean}
     */
    private readAsBuffer_;
    /**
     * @private
     * @type {Array<import("../format/Feature.js").default>}
     */
    private formats_;
    /**
     * @private
     * @type {import("../proj/Projection.js").default}
     */
    private projection_;
    /**
     * @private
     * @type {?Array<import("../events.js").EventsKey>}
     */
    private dropListenKeys_;
    /**
     * @private
     * @type {import("../source/Vector.js").default}
     */
    private source_;
    /**
     * @private
     * @type {HTMLElement|null}
     */
    private target;
    /**
     * @param {File} file File.
     * @param {Event} event Load event.
     * @private
     */
    private handleResult_;
    /**
     * @private
     */
    private registerListeners_;
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../Map.js").default} map Map.
     */
    setMap(map: import("../Map.js").default): void;
    /**
     * @param {import("../format/Feature.js").default} format Format.
     * @param {string} text Text.
     * @param {import("../format/Feature.js").ReadOptions} options Read options.
     * @private
     * @return {Array<import("../Feature.js").default>} Features.
     */
    private tryReadFeatures_;
    /**
     * @private
     */
    private unregisterListeners_;
    /**
     * @param {DragEvent} event Event.
     */
    handleDrop(event: DragEvent): void;
    /**
     * @param {DragEvent} event Event.
     */
    handleStop(event: DragEvent): void;
}
import Interaction from "./Interaction.js";
//# sourceMappingURL=DragAndDrop.d.ts.map