export default CanvasImmediateRenderer;
/**
 * @classdesc
 * A concrete subclass of {@link module:ol/render/VectorContext~VectorContext} that implements
 * direct rendering of features and geometries to an HTML5 Canvas context.
 * Instances of this class are created internally by the library and
 * provided to application code as vectorContext member of the
 * {@link module:ol/render/Event~RenderEvent} object associated with postcompose, precompose and
 * render events emitted by layers and maps.
 */
declare class CanvasImmediateRenderer extends VectorContext {
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../extent.js").Extent} extent Extent.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {number} [squaredTolerance] Optional squared tolerance for simplification.
     * @param {import("../../proj.js").TransformFunction} [userTransform] Transform from user to view projection.
     */
    constructor(context: CanvasRenderingContext2D, pixelRatio: number, extent: import("../../extent.js").Extent, transform: import("../../transform.js").Transform, viewRotation: number, squaredTolerance?: number | undefined, userTransform?: import("../../proj.js").TransformFunction | undefined);
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
    private transformRotation_;
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
     * Render a circle geometry into the canvas.  Rendering is immediate and uses
     * the current fill and stroke styles.
     *
     * @param {import("../../geom/Circle.js").default} geometry Circle geometry.
     * @api
     */
    drawCircle(geometry: import("../../geom/Circle.js").default): void;
    /**
     * @param {import("../../transform.js").Transform} transform Transform.
     */
    setTransform(transform: import("../../transform.js").Transform): void;
    /**
     * Render a geometry into the canvas.  Call
     * {@link module:ol/render/canvas/Immediate~CanvasImmediateRenderer#setStyle renderer.setStyle()} first to set the rendering style.
     *
     * @param {import("../../geom/Geometry.js").default|import("../Feature.js").default} geometry The geometry to render.
     * @api
     */
    drawGeometry(geometry: import("../../geom/Geometry.js").default | import("../Feature.js").default): void;
    /**
     * Render a GeometryCollection to the canvas.  Rendering is immediate and
     * uses the current styles appropriate for each geometry in the collection.
     *
     * @param {import("../../geom/GeometryCollection.js").default} geometry Geometry collection.
     */
    drawGeometryCollection(geometry: import("../../geom/GeometryCollection.js").default): void;
    /**
     * Render a Point geometry into the canvas.  Rendering is immediate and uses
     * the current style.
     *
     * @param {import("../../geom/Point.js").default|import("../Feature.js").default} geometry Point geometry.
     */
    drawPoint(geometry: import("../../geom/Point.js").default | import("../Feature.js").default): void;
    /**
     * Render a MultiPoint geometry  into the canvas.  Rendering is immediate and
     * uses the current style.
     *
     * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} geometry MultiPoint geometry.
     */
    drawMultiPoint(geometry: import("../../geom/MultiPoint.js").default | import("../Feature.js").default): void;
    /**
     * Render a LineString into the canvas.  Rendering is immediate and uses
     * the current style.
     *
     * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} geometry LineString geometry.
     */
    drawLineString(geometry: import("../../geom/LineString.js").default | import("../Feature.js").default): void;
    /**
     * Render a MultiLineString geometry into the canvas.  Rendering is immediate
     * and uses the current style.
     *
     * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} geometry MultiLineString geometry.
     */
    drawMultiLineString(geometry: import("../../geom/MultiLineString.js").default | import("../Feature.js").default): void;
    /**
     * Render a Polygon geometry into the canvas.  Rendering is immediate and uses
     * the current style.
     *
     * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} geometry Polygon geometry.
     */
    drawPolygon(geometry: import("../../geom/Polygon.js").default | import("../Feature.js").default): void;
    /**
     * Render MultiPolygon geometry into the canvas.  Rendering is immediate and
     * uses the current style.
     * @param {import("../../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
     */
    drawMultiPolygon(geometry: import("../../geom/MultiPolygon.js").default): void;
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
    /**
     * Set the image style for subsequent draw operations.  Pass null to remove
     * the image style.
     *
     * @param {import("../../style/Image.js").default} imageStyle Image style.
     */
    setImageStyle(imageStyle: import("../../style/Image.js").default): void;
    /**
     * Set the text style for subsequent draw operations.  Pass null to
     * remove the text style.
     *
     * @param {import("../../style/Text.js").default} textStyle Text style.
     */
    setTextStyle(textStyle: import("../../style/Text.js").default): void;
}
import VectorContext from "../VectorContext.js";
//# sourceMappingURL=Immediate.d.ts.map