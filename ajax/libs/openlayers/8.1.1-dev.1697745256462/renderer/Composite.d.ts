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
     * @type {Array<import("../layer/BaseVector.js").default>}
     */
    declutterLayers_: Array<import("../layer/BaseVector.js").default<any, any>>;
}
import MapRenderer from './Map.js';
//# sourceMappingURL=Composite.d.ts.map