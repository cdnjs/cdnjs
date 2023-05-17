export default CanvasVectorTileLayerRenderer;
/**
 * @classdesc
 * Canvas renderer for vector tile layers.
 * @api
 * @extends {CanvasTileLayerRenderer<import("../../layer/VectorTile.js").default>}
 */
declare class CanvasVectorTileLayerRenderer extends CanvasTileLayerRenderer<import("../../layer/VectorTile.js").default> {
    /**
     * @param {import("../../layer/VectorTile.js").default} layer VectorTile layer.
     */
    constructor(layer: import("../../layer/VectorTile.js").default);
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
     * @type {import("../../transform.js").Transform}
     */
    private tmpTransform_;
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../proj/Projection").default} projection Projection.
     * @return {boolean|undefined} Tile needs to be rendered.
     */
    prepareTile(tile: import("../../VectorRenderTile.js").default, pixelRatio: number, projection: import("../../proj/Projection").default): boolean | undefined;
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @return {boolean} Tile is drawable.
     */
    isDrawableTile(tile: import("../../VectorRenderTile.js").default): boolean;
    /**
     * @inheritDoc
     */
    getTileImage(tile: any): any;
    /**
     * @param {import("../../VectorRenderTile.js").default} tile Tile.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../proj/Projection.js").default} projection Projection.
     * @private
     */
    private updateExecutorGroup_;
    /**
     * Handle changes in image style state.
     * @param {import("../../events/Event.js").default} event Image style change event.
     * @private
     */
    private handleStyleImageChange_;
    /**
     * Render declutter items for this layer
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     */
    renderDeclutter(frameState: import("../../Map.js").FrameState): void;
    getTileRenderTransform(tile: any, frameState: any): number[];
    ready: any;
    /**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
     * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
     * @param {import("../../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder group for decluttering.
     * @return {boolean} `true` if an image is loading.
     */
    renderFeature(feature: import("../../Feature.js").FeatureLike, squaredTolerance: number, styles: import("../../style/Style.js").default | Array<import("../../style/Style.js").default>, builderGroup: import("../../render/canvas/BuilderGroup.js").default, declutterBuilderGroup?: CanvasBuilderGroup | undefined): boolean;
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
import CanvasTileLayerRenderer from "./TileLayer.js";
import CanvasBuilderGroup from "../../render/canvas/BuilderGroup.js";
//# sourceMappingURL=VectorTileLayer.d.ts.map