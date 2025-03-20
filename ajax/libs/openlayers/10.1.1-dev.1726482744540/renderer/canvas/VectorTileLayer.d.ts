export default CanvasVectorTileLayerRenderer;
/**
 * @classdesc
 * Canvas renderer for vector tile layers.
 * @api
 * @extends {CanvasTileLayerRenderer<import("../../layer/VectorTile.js").default<import('../../source/VectorTile.js').default<import('../../Feature.js').FeatureLike>>>}
 */
declare class CanvasVectorTileLayerRenderer extends CanvasTileLayerRenderer<import("../../layer/VectorTile.js").default<import("../../source/VectorTile.js").default<import("../../Feature.js").FeatureLike>, import("../../Feature.js").FeatureLike>> {
    /**
     * @param {import("../../layer/VectorTile.js").default} layer VectorTile layer.
     * @param {import("./TileLayer.js").Options} options Options.
     */
    constructor(layer: import("../../layer/VectorTile.js").default, options: import("./TileLayer.js").Options);
    /** @private */
    private boundHandleStyleImageChange_;
    /**
     * @private
     * @type {number}
     */
    private renderedLayerRevision_;
    /**
     * @private
     * @type {import("../../transform").Transform}
     */
    private renderedPixelToCoordinateTransform_;
    /**
     * @private
     * @type {number}
     */
    private renderedRotation_;
    /**
     * @private
     * @type {number}
     */
    private renderedOpacity_;
    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */
    private tmpTransform_;
    /**
     * @private
     * @type {Array<ZIndexContext>}
     */
    private tileClipContexts_;
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {number} x Left of the tile.
     * @param {number} y Top of the tile.
     * @param {number} w Width of the tile.
     * @param {number} h Height of the tile.
     * @param {number} gutter Tile gutter.
     * @param {boolean} transition Apply an alpha transition.
     * @override
     */
    override drawTile(tile: import("../../VectorRenderTile.js").default, frameState: import("../../Map.js").FrameState, x: number, y: number, w: number, h: number, gutter: number, transition: boolean): void;
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../proj/Projection.js").default} projection Projection.
     * @private
     */
    private updateExecutorGroup_;
    /**
     * @param {import("../../extent.js").Extent} extent Extent.
     * @return {Array<import('../../Feature.js').FeatureLike>} Features.
     */
    getFeaturesInExtent(extent: import("../../extent.js").Extent): Array<import("../../Feature.js").FeatureLike>;
    /**
     * Handle changes in image style state.
     * @param {import("../../events/Event.js").default} event Image style change event.
     * @private
     */
    private handleStyleImageChange_;
    /**
     * Render declutter items for this layer
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {import("../../layer/Layer.js").State} layerState Layer state.
     */
    renderDeclutter(frameState: import("../../Map.js").FrameState, layerState: import("../../layer/Layer.js").State): void;
    getTileRenderTransform(tile: any, frameState: any): number[];
    /**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
     * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
     * @param {boolean} [declutter] Enable decluttering.
     * @param {number} [index] Render order index.
     * @return {boolean} `true` if an image is loading.
     */
    renderFeature(feature: import("../../Feature.js").FeatureLike, squaredTolerance: number, styles: import("../../style/Style.js").default | Array<import("../../style/Style.js").default>, builderGroup: import("../../render/canvas/BuilderGroup.js").default, declutter?: boolean | undefined, index?: number | undefined): boolean;
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @return {boolean} A new tile image was rendered.
     * @private
     */
    private tileImageNeedsRender_;
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @param {import("../../Map").FrameState} frameState Frame state.
     * @private
     */
    private renderTileImage_;
}
import CanvasTileLayerRenderer from './TileLayer.js';
//# sourceMappingURL=VectorTileLayer.d.ts.map