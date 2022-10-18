export default CanvasImmediateRenderer;
/**
 * @classdesc
 * A concrete subclass of {@link module:ol/render/VectorContext VectorContext} that implements
 * direct rendering of features and geometries to an HTML5 Canvas context.
 * Instances of this class are created internally by the library and
 * provided to application code as vectorContext member of the
 * {@link module:ol/render/Event~RenderEvent RenderEvent} object associated with postcompose, precompose and
 * render events emitted by layers and maps.
 */
declare class CanvasImmediateRenderer extends VectorContext {
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../extent.js").Extent} extent Extent.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {number} [opt_squaredTolerance] Optional squared tolerance for simplification.
     * @param {import("../../proj.js").TransformFunction} [opt_userTransform] Transform from user to view projection.
     */
    constructor(context: CanvasRenderingContext2D, pixelRatio: number, extent: import("../../extent.js").Extent, transform: import("../../transform.js").Transform, viewRotation: number, opt_squaredTolerance?: number, opt_userTransform?: import("../../proj.js").TransformFunction);
    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    private context_;
    /**
     * @private
     * @type {number}
     */
    private pixelRatio_;
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */
    private extent_;
    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */
    private transform_;
    /**
     * @private
     * @type {number}
     */
    private viewRotation_;
    /**
     * @private
     * @type {number}
     */
    private squaredTolerance_;
    /**
     * @private
     * @type {import("../../proj.js").TransformFunction}
     */
    private userTransform_;
    /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */
    private contextFillState_;
    /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */
    private contextStrokeState_;
    /**
     * @private
     * @type {?import("../canvas.js").TextState}
     */
    private contextTextState_;
    /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */
    private fillState_;
    /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */
    private strokeState_;
    /**
     * @private
     * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
     */
    private image_;
    /**
     * @private
     * @type {number}
     */
    private imageAnchorX_;
    /**
     * @private
     * @type {number}
     */
    private imageAnchorY_;
    /**
     * @private
     * @type {number}
     */
    private imageHeight_;
    /**
     * @private
     * @type {number}
     */
    private imageOpacity_;
    /**
     * @private
     * @type {number}
     */
    private imageOriginX_;
    /**
     * @private
     * @type {number}
     */
    private imageOriginY_;
    /**
     * @private
     * @type {boolean}
     */
    private imageRotateWithView_;
    /**
     * @private
     * @type {number}
     */
    private imageRotation_;
    /**
     * @private
     * @type {import("../../size.js").Size}
     */
    private imageScale_;
    /**
     * @private
     * @type {number}
     */
    private imageWidth_;
    /**
     * @private
     * @type {string}
     */
    private text_;
    /**
     * @private
     * @type {number}
     */
    private textOffsetX_;
    /**
     * @private
     * @type {number}
     */
    private textOffsetY_;
    /**
     * @private
     * @type {boolean}
     */
    private textRotateWithView_;
    /**
     * @private
     * @type {number}
     */
    private textRotation_;
    /**
     * @private
     * @type {import("../../size.js").Size}
     */
    private textScale_;
    /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */
    private textFillState_;
    /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */
    private textStrokeState_;
    /**
     * @private
     * @type {?import("../canvas.js").TextState}
     */
    private textState_;
    /**
     * @private
     * @type {Array<number>}
     */
    private pixelCoordinates_;
    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */
    private tmpLocalTransform_;
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @private
     */
    private drawImages_;
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @private
     */
    private drawText_;
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @param {boolean} close Close.
     * @private
     * @return {number} end End.
     */
    private moveToLineTo_;
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {Array<number>} ends Ends.
     * @param {number} stride Stride.
     * @private
     * @return {number} End.
     */
    private drawRings_;
    /**
     * @param {import("../../transform.js").Transform} transform Transform.
     */
    setTransform(transform: import("../../transform.js").Transform): void;
    /**
     * @param {import("../canvas.js").FillState} fillState Fill state.
     * @private
     */
    private setContextFillState_;
    /**
     * @param {import("../canvas.js").StrokeState} strokeState Stroke state.
     * @private
     */
    private setContextStrokeState_;
    /**
     * @param {import("../canvas.js").TextState} textState Text state.
     * @private
     */
    private setContextTextState_;
}
import VectorContext from "../VectorContext.js";
//# sourceMappingURL=Immediate.d.ts.map