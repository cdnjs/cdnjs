export default CompositeMapRenderer;
/**
 * @classdesc
 * Canvas map renderer.
 * @api
 */
declare class CompositeMapRenderer extends MapRenderer {
    /**
     * @param {import("../PluggableMap.js").default} map Map.
     */
    constructor(map: import("../PluggableMap.js").default);
    /**
     * @type {import("../events.js").EventsKey}
     */
    fontChangeListenerKey_: import("../events.js").EventsKey;
    /**
     * @private
     * @type {HTMLDivElement}
     */
    private element_;
    /**
     * @private
     * @type {Array<HTMLElement>}
     */
    private children_;
    /**
     * @private
     * @type {boolean}
     */
    private renderedVisible_;
    /**
     * @inheritDoc
     */
    renderFrame(frameState: any): void;
    /**
     * @inheritDoc
     */
    forEachLayerAtPixel(pixel: any, frameState: any, hitTolerance: any, callback: any, layerFilter: any): any;
}
import MapRenderer from "./Map.js";
//# sourceMappingURL=Composite.d.ts.map