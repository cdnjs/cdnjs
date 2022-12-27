export default VectorContext;
/**
 * @module ol/render/VectorContext
 */
/**
 * @classdesc
 * Context for drawing geometries.  A vector context is available on render
 * events and does not need to be constructed directly.
 * @api
 */
declare class VectorContext {
    /**
     * Render a geometry with a custom renderer.
     *
     * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     * @param {Function} renderer Renderer.
     * @param {Function} hitDetectionRenderer Renderer.
     */
    drawCustom(geometry: import("../geom/SimpleGeometry.js").default, feature: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("./Feature.js").default, renderer: Function, hitDetectionRenderer: Function): void;
    /**
     * Render a geometry.
     *
     * @param {import("../geom/Geometry.js").default} geometry The geometry to render.
     */
    drawGeometry(geometry: import("../geom/Geometry.js").default): void;
    /**
     * Set the rendering style.
     *
     * @param {import("../style/Style.js").default} style The rendering style.
     */
    setStyle(style: import("../style/Style.js").default): void;
    /**
     * @param {import("../geom/Circle.js").default} circleGeometry Circle geometry.
     * @param {import("../Feature.js").default} feature Feature.
     */
    drawCircle(circleGeometry: import("../geom/Circle.js").default, feature: import("../Feature.js").default<any>): void;
    /**
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("../style/Style.js").default} style Style.
     */
    drawFeature(feature: import("../Feature.js").default<any>, style: import("../style/Style.js").default): void;
    /**
     * @param {import("../geom/GeometryCollection.js").default} geometryCollectionGeometry Geometry collection.
     * @param {import("../Feature.js").default} feature Feature.
     */
    drawGeometryCollection(geometryCollectionGeometry: import("../geom/GeometryCollection.js").default, feature: import("../Feature.js").default<any>): void;
    /**
     * @param {import("../geom/LineString.js").default|import("./Feature.js").default} lineStringGeometry Line string geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawLineString(lineStringGeometry: import("../geom/LineString.js").default | import("./Feature.js").default, feature: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("./Feature.js").default): void;
    /**
     * @param {import("../geom/MultiLineString.js").default|import("./Feature.js").default} multiLineStringGeometry MultiLineString geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawMultiLineString(multiLineStringGeometry: import("../geom/MultiLineString.js").default | import("./Feature.js").default, feature: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("./Feature.js").default): void;
    /**
     * @param {import("../geom/MultiPoint.js").default|import("./Feature.js").default} multiPointGeometry MultiPoint geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawMultiPoint(multiPointGeometry: import("../geom/MultiPoint.js").default | import("./Feature.js").default, feature: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("./Feature.js").default): void;
    /**
     * @param {import("../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawMultiPolygon(multiPolygonGeometry: import("../geom/MultiPolygon.js").default, feature: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("./Feature.js").default): void;
    /**
     * @param {import("../geom/Point.js").default|import("./Feature.js").default} pointGeometry Point geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawPoint(pointGeometry: import("../geom/Point.js").default | import("./Feature.js").default, feature: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("./Feature.js").default): void;
    /**
     * @param {import("../geom/Polygon.js").default|import("./Feature.js").default} polygonGeometry Polygon geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawPolygon(polygonGeometry: import("../geom/Polygon.js").default | import("./Feature.js").default, feature: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("./Feature.js").default): void;
    /**
     * @param {import("../geom/SimpleGeometry.js").default|import("./Feature.js").default} geometry Geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawText(geometry: import("../geom/SimpleGeometry.js").default | import("./Feature.js").default, feature: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("./Feature.js").default): void;
    /**
     * @param {import("../style/Fill.js").default} fillStyle Fill style.
     * @param {import("../style/Stroke.js").default} strokeStyle Stroke style.
     */
    setFillStrokeStyle(fillStyle: import("../style/Fill.js").default, strokeStyle: import("../style/Stroke.js").default): void;
    /**
     * @param {import("../style/Image.js").default} imageStyle Image style.
     * @param {import("../render/canvas.js").DeclutterImageWithText} [opt_declutterImageWithText] Shared data for combined decluttering with a text style.
     */
    setImageStyle(imageStyle: import("../style/Image.js").default, opt_declutterImageWithText?: {
        [x: number]: {
            0: CanvasRenderingContext2D;
            1: number;
            2: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | import("./canvas.js").Label;
            3: import("./canvas/Executor.js").ImageOrLabelDimensions;
            4: number;
            5: any[];
            6: any[];
        };
    } | undefined): void;
    /**
     * @param {import("../style/Text.js").default} textStyle Text style.
     * @param {import("../render/canvas.js").DeclutterImageWithText} [opt_declutterImageWithText] Shared data for combined decluttering with an image style.
     */
    setTextStyle(textStyle: import("../style/Text.js").default, opt_declutterImageWithText?: {
        [x: number]: {
            0: CanvasRenderingContext2D;
            1: number;
            2: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | import("./canvas.js").Label;
            3: import("./canvas/Executor.js").ImageOrLabelDimensions;
            4: number;
            5: any[];
            6: any[];
        };
    } | undefined): void;
}
//# sourceMappingURL=VectorContext.d.ts.map