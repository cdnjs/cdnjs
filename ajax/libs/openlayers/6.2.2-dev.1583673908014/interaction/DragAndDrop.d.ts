export default DragAndDrop;
export type Options = {
    /**
     * Format constructors.
     */
    formatConstructors?: typeof import("../format/Feature.js").default[];
    /**
     * Optional vector source where features will be added.  If a source is provided
     * all existing features will be removed and new features will be added when
     * they are dropped on the target.  If you want to add features to a vector
     * source without removing the existing features (append only), instead of
     * providing the source option listen for the "addfeatures" event.
     */
    source?: import("../source/Vector.js").default<any>;
    /**
     * Target projection. By default, the map's view's projection is used.
     */
    projection?: string | import("../proj/Projection.js").default;
    /**
     * The element that is used as the drop target, default is the viewport element.
     */
    target?: HTMLElement;
};
export type DragAndDropEventType = string;
/**
 * @classdesc
 * Handles input of vector data by drag and drop.
 * @api
 *
 * @fires DragAndDropEvent
 */
declare class DragAndDrop extends Interaction {
    /**
     * @param {Options=} opt_options Options.
     */
    constructor(opt_options?: Options);
    /**
     * @private
     * @type {Array<typeof import("../format/Feature.js").default>}
     */
    private formatConstructors_;
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
     * @type {HTMLElement}
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
     * @inheritDoc
     */
    setActive(active: any): void;
    /**
     * @inheritDoc
     */
    setMap(map: any): void;
    /**
     * @param {import("../format/Feature.js").default} format Format.
     * @param {string} text Text.
     * @param {import("../format/Feature.js").ReadOptions} options Read options.
     * @private
     * @return {Array<import("../Feature.js").FeatureLike>} Features.
     */
    private tryReadFeatures_;
    /**
     * @private
     */
    private unregisterListeners_;
}
import Interaction from "./Interaction.js";
//# sourceMappingURL=DragAndDrop.d.ts.map