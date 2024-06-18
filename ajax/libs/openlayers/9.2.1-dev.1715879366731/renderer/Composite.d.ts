export default CompositeMapRenderer;
/**
 * @classdesc
 * Canvas map renderer.
 * @api
 */
declare class CompositeMapRenderer extends MapRenderer {
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
     * @param {import("../Map.js").FrameState} frameState Frame state.
     * @param {Array<import('../layer/Layer.js').State>} layerStates Layers.
     */
    declutter(frameState: import("../Map.js").FrameState, layerStates: Array<import('../layer/Layer.js').State>): void;
}
import MapRenderer from './Map.js';
//# sourceMappingURL=Composite.d.ts.map