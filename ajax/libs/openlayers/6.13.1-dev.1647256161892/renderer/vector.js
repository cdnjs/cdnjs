/**
 * @module ol/renderer/vector
 */
import BuilderType from '../render/canvas/BuilderType.js';
import GeometryType from '../geom/GeometryType.js';
import ImageState from '../ImageState.js';
import { getUid } from '../util.js';
/**
 * Feature callback. The callback will be called with three arguments. The first
 * argument is one {@link module:ol/Feature~Feature feature} or {@link module:ol/render/Feature~RenderFeature render feature}
 * at the pixel, the second is the {@link module:ol/layer/Layer~Layer layer} of the feature and will be null for
 * unmanaged layers. The third is the {@link module:ol/geom/SimpleGeometry~SimpleGeometry} of the feature. For features
 * with a GeometryCollection geometry, it will be the first detected geometry from the collection.
 * @template T
 * @typedef {function(import("../Feature.js").FeatureLike, import("../layer/Layer.js").default<import("../source/Source").default>, import("../geom/SimpleGeometry.js").default): T} FeatureCallback
 */
/**
 * Tolerance for geometry simplification in device pixels.
 * @type {number}
 */
var SIMPLIFY_TOLERANCE = 0.5;
/**
 * @const
 * @type {Object<import("../geom/GeometryType.js").default,
 *                function(import("../render/canvas/BuilderGroup.js").default, import("../geom/Geometry.js").default,
 *                         import("../style/Style.js").default, Object): void>}
 */
var GEOMETRY_RENDERERS = {
    'Point': renderPointGeometry,
    'LineString': renderLineStringGeometry,
    'Polygon': renderPolygonGeometry,
    'MultiPoint': renderMultiPointGeometry,
    'MultiLineString': renderMultiLineStringGeometry,
    'MultiPolygon': renderMultiPolygonGeometry,
    'GeometryCollection': renderGeometryCollectionGeometry,
    'Circle': renderCircleGeometry,
};
/**
 * @param {import("../Feature.js").FeatureLike} feature1 Feature 1.
 * @param {import("../Feature.js").FeatureLike} feature2 Feature 2.
 * @return {number} Order.
 */
export function defaultOrder(feature1, feature2) {
    return parseInt(getUid(feature1), 10) - parseInt(getUid(feature2), 10);
}
/**
 * @param {number} resolution Resolution.
 * @param {number} pixelRatio Pixel ratio.
 * @return {number} Squared pixel tolerance.
 */
export function getSquaredTolerance(resolution, pixelRatio) {
    var tolerance = getTolerance(resolution, pixelRatio);
    return tolerance * tolerance;
}
/**
 * @param {number} resolution Resolution.
 * @param {number} pixelRatio Pixel ratio.
 * @return {number} Pixel tolerance.
 */
export function getTolerance(resolution, pixelRatio) {
    return (SIMPLIFY_TOLERANCE * resolution) / pixelRatio;
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
 * @param {import("../geom/Circle.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */
function renderCircleGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var fillStyle = style.getFill();
    var strokeStyle = style.getStroke();
    if (fillStyle || strokeStyle) {
        var circleReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.CIRCLE);
        circleReplay.setFillStrokeStyle(fillStyle, strokeStyle);
        circleReplay.drawCircle(geometry, feature);
    }
    var textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
        var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
        textReplay.setTextStyle(textStyle);
        textReplay.drawText(geometry, feature);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../style/Style.js").default} style Style.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {function(import("../events/Event.js").default): void} listener Listener function.
 * @param {import("../proj.js").TransformFunction} [opt_transform] Transform from user to view projection.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 * @return {boolean} `true` if style is loading.
 */
export function renderFeature(replayGroup, feature, style, squaredTolerance, listener, opt_transform, opt_declutterBuilderGroup) {
    var loading = false;
    var imageStyle = style.getImage();
    if (imageStyle) {
        var imageState = imageStyle.getImageState();
        if (imageState == ImageState.LOADED || imageState == ImageState.ERROR) {
            imageStyle.unlistenImageChange(listener);
        }
        else {
            if (imageState == ImageState.IDLE) {
                imageStyle.load();
            }
            imageState = imageStyle.getImageState();
            imageStyle.listenImageChange(listener);
            loading = true;
        }
    }
    renderFeatureInternal(replayGroup, feature, style, squaredTolerance, opt_transform, opt_declutterBuilderGroup);
    return loading;
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../style/Style.js").default} style Style.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */
function renderFeatureInternal(replayGroup, feature, style, squaredTolerance, opt_transform, opt_declutterBuilderGroup) {
    var geometry = style.getGeometryFunction()(feature);
    if (!geometry) {
        return;
    }
    var simplifiedGeometry = geometry.simplifyTransformed(squaredTolerance, opt_transform);
    var renderer = style.getRenderer();
    if (renderer) {
        renderGeometry(replayGroup, simplifiedGeometry, style, feature);
    }
    else {
        var geometryRenderer = GEOMETRY_RENDERERS[simplifiedGeometry.getType()];
        geometryRenderer(replayGroup, simplifiedGeometry, style, feature, opt_declutterBuilderGroup);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../geom/Geometry.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 */
function renderGeometry(replayGroup, geometry, style, feature) {
    if (geometry.getType() == GeometryType.GEOMETRY_COLLECTION) {
        var geometries = 
        /** @type {import("../geom/GeometryCollection.js").default} */ (geometry).getGeometries();
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            renderGeometry(replayGroup, geometries[i], style, feature);
        }
        return;
    }
    var replay = replayGroup.getBuilder(style.getZIndex(), BuilderType.DEFAULT);
    replay.drawCustom(
    /** @type {import("../geom/SimpleGeometry.js").default} */ (geometry), feature, style.getRenderer(), style.getHitDetectionRenderer());
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */
function renderGeometryCollectionGeometry(replayGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var geometries = geometry.getGeometriesArray();
    var i, ii;
    for (i = 0, ii = geometries.length; i < ii; ++i) {
        var geometryRenderer = GEOMETRY_RENDERERS[geometries[i].getType()];
        geometryRenderer(replayGroup, geometries[i], style, feature, opt_declutterBuilderGroup);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/LineString.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */
function renderLineStringGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var strokeStyle = style.getStroke();
    if (strokeStyle) {
        var lineStringReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.LINE_STRING);
        lineStringReplay.setFillStrokeStyle(null, strokeStyle);
        lineStringReplay.drawLineString(geometry, feature);
    }
    var textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
        var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
        textReplay.setTextStyle(textStyle);
        textReplay.drawText(geometry, feature);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiLineString.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */
function renderMultiLineStringGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var strokeStyle = style.getStroke();
    if (strokeStyle) {
        var lineStringReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.LINE_STRING);
        lineStringReplay.setFillStrokeStyle(null, strokeStyle);
        lineStringReplay.drawMultiLineString(geometry, feature);
    }
    var textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
        var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
        textReplay.setTextStyle(textStyle);
        textReplay.drawText(geometry, feature);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */
function renderMultiPolygonGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var fillStyle = style.getFill();
    var strokeStyle = style.getStroke();
    if (strokeStyle || fillStyle) {
        var polygonReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.POLYGON);
        polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
        polygonReplay.drawMultiPolygon(geometry, feature);
    }
    var textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
        var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
        textReplay.setTextStyle(textStyle);
        textReplay.drawText(geometry, feature);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/Point.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */
function renderPointGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var imageStyle = style.getImage();
    var textStyle = style.getText();
    /** @type {import("../render/canvas.js").DeclutterImageWithText} */
    var declutterImageWithText;
    if (opt_declutterBuilderGroup) {
        builderGroup = opt_declutterBuilderGroup;
        declutterImageWithText =
            imageStyle && textStyle && textStyle.getText() ? {} : undefined;
    }
    if (imageStyle) {
        if (imageStyle.getImageState() != ImageState.LOADED) {
            return;
        }
        var imageReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.IMAGE);
        imageReplay.setImageStyle(imageStyle, declutterImageWithText);
        imageReplay.drawPoint(geometry, feature);
    }
    if (textStyle && textStyle.getText()) {
        var textReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.TEXT);
        textReplay.setTextStyle(textStyle, declutterImageWithText);
        textReplay.drawText(geometry, feature);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiPoint.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */
function renderMultiPointGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var imageStyle = style.getImage();
    var textStyle = style.getText();
    /** @type {import("../render/canvas.js").DeclutterImageWithText} */
    var declutterImageWithText;
    if (opt_declutterBuilderGroup) {
        builderGroup = opt_declutterBuilderGroup;
        declutterImageWithText =
            imageStyle && textStyle && textStyle.getText() ? {} : undefined;
    }
    if (imageStyle) {
        if (imageStyle.getImageState() != ImageState.LOADED) {
            return;
        }
        var imageReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.IMAGE);
        imageReplay.setImageStyle(imageStyle, declutterImageWithText);
        imageReplay.drawMultiPoint(geometry, feature);
    }
    if (textStyle && textStyle.getText()) {
        var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
        textReplay.setTextStyle(textStyle, declutterImageWithText);
        textReplay.drawText(geometry, feature);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/Polygon.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [opt_declutterBuilderGroup] Builder for decluttering.
 */
function renderPolygonGeometry(builderGroup, geometry, style, feature, opt_declutterBuilderGroup) {
    var fillStyle = style.getFill();
    var strokeStyle = style.getStroke();
    if (fillStyle || strokeStyle) {
        var polygonReplay = builderGroup.getBuilder(style.getZIndex(), BuilderType.POLYGON);
        polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
        polygonReplay.drawPolygon(geometry, feature);
    }
    var textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
        var textReplay = (opt_declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), BuilderType.TEXT);
        textReplay.setTextStyle(textStyle);
        textReplay.drawText(geometry, feature);
    }
}
//# sourceMappingURL=vector.js.map