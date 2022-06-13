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
     */
    drawCustom(geometry: import("../geom/SimpleGeometry.js").default, feature: import("./Feature.js").default | import("../Feature.js").default<any>, renderer: Function): void;
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
    drawLineString(lineStringGeometry: import("./Feature.js").default | import("../geom/LineString.js").default, feature: import("./Feature.js").default | import("../Feature.js").default<any>): void;
    /**
     * @param {import("../geom/MultiLineString.js").default|import("./Feature.js").default} multiLineStringGeometry MultiLineString geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawMultiLineString(multiLineStringGeometry: import("./Feature.js").default | import("../geom/MultiLineString.js").default, feature: import("./Feature.js").default | import("../Feature.js").default<any>): void;
    /**
     * @param {import("../geom/MultiPoint.js").default|import("./Feature.js").default} multiPointGeometry MultiPoint geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawMultiPoint(multiPointGeometry: import("./Feature.js").default | import("../geom/MultiPoint.js").default, feature: import("./Feature.js").default | import("../Feature.js").default<any>): void;
    /**
     * @param {import("../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawMultiPolygon(multiPolygonGeometry: import("../geom/MultiPolygon.js").default, feature: import("./Feature.js").default | import("../Feature.js").default<any>): void;
    /**
     * @param {import("../geom/Point.js").default|import("./Feature.js").default} pointGeometry Point geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawPoint(pointGeometry: import("../geom/Point.js").default | import("./Feature.js").default, feature: import("./Feature.js").default | import("../Feature.js").default<any>): void;
    /**
     * @param {import("../geom/Polygon.js").default|import("./Feature.js").default} polygonGeometry Polygon geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawPolygon(polygonGeometry: import("../geom/Polygon.js").default | import("./Feature.js").default, feature: import("./Feature.js").default | import("../Feature.js").default<any>): void;
    /**
     * @param {import("../geom/Geometry.js").default|import("./Feature.js").default} geometry Geometry.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     */
    drawText(geometry: import("../geom/Geometry.js").default | import("./Feature.js").default, feature: import("./Feature.js").default | import("../Feature.js").default<any>): void;
    /**
     * @param {import("../style/Fill.js").default} fillStyle Fill style.
     * @param {import("../style/Stroke.js").default} strokeStyle Stroke style.
     */
    setFillStrokeStyle(fillStyle: import("../style/Fill.js").default, strokeStyle: import("../style/Stroke.js").default): void;
    /**
     * @param {import("../style/Image.js").default} imageStyle Image style.
     * @param {import("./canvas.js").DeclutterGroup=} opt_declutterGroup Declutter.
     */
    setImageStyle(imageStyle: import("../style/Image.js").default, opt_declutterGroup?: any[]): void;
    /**
     * @param {import("../style/Text.js").default} textStyle Text style.
     * @param {import("./canvas.js").DeclutterGroups=} opt_declutterGroups Declutter.
     */
    setTextStyle(textStyle: import("../style/Text.js").default, opt_declutterGroups?: any[][]): void;
}
//# sourceMappingURL=VectorContext.d.ts.map