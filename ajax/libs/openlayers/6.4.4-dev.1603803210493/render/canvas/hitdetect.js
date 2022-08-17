/**
 * @module ol/render/canvas/hitdetect
 */
import CanvasImmediateRenderer from './Immediate.js';
import GeometryType from '../../geom/GeometryType.js';
import IconAnchorUnits from '../../style/IconAnchorUnits.js';
import { Icon } from '../../style.js';
import { createCanvasContext2D } from '../../dom.js';
import { intersects } from '../../extent.js';
import { numberSafeCompareFunction } from '../../array.js';
/**
 * @param {import("../../size.js").Size} size Canvas size in css pixels.
 * @param {Array<import("../../transform.js").Transform>} transforms Transforms
 * for rendering features to all worlds of the viewport, from coordinates to css
 * pixels.
 * @param {Array<import("../../Feature.js").FeatureLike>} features
 * Features to consider for hit detection.
 * @param {import("../../style/Style.js").StyleFunction|undefined} styleFunction
 * Layer style function.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @return {ImageData} Hit detection image data.
 */
export function createHitDetectionImageData(size, transforms, features, styleFunction, extent, resolution, rotation) {
    var width = size[0] / 2;
    var height = size[1] / 2;
    var context = createCanvasContext2D(width, height);
    context.imageSmoothingEnabled = false;
    var canvas = context.canvas;
    var renderer = new CanvasImmediateRenderer(context, 0.5, extent, null, rotation);
    var featureCount = features.length;
    // Stretch hit detection index to use the whole available color range
    var indexFactor = Math.floor((256 * 256 * 256 - 1) / featureCount);
    var featuresByZIndex = {};
    for (var i = 1; i <= featureCount; ++i) {
        var feature = features[i - 1];
        var featureStyleFunction = feature.getStyleFunction() || styleFunction;
        if (!styleFunction) {
            continue;
        }
        var styles = featureStyleFunction(feature, resolution);
        if (!styles) {
            continue;
        }
        if (!Array.isArray(styles)) {
            styles = [styles];
        }
        var index = i * indexFactor;
        var color = '#' + ('000000' + index.toString(16)).slice(-6);
        for (var j = 0, jj = styles.length; j < jj; ++j) {
            var originalStyle = styles[j];
            var style = originalStyle.clone();
            var fill = style.getFill();
            if (fill) {
                fill.setColor(color);
            }
            var stroke = style.getStroke();
            if (stroke) {
                stroke.setColor(color);
            }
            style.setText(undefined);
            var image = originalStyle.getImage();
            if (image) {
                var imgSize = image.getImageSize();
                if (!imgSize) {
                    continue;
                }
                var canvas_1 = document.createElement('canvas');
                canvas_1.width = imgSize[0];
                canvas_1.height = imgSize[1];
                var imgContext = canvas_1.getContext('2d', { alpha: false });
                imgContext.fillStyle = color;
                var img = imgContext.canvas;
                imgContext.fillRect(0, 0, img.width, img.height);
                var width_1 = imgSize ? imgSize[0] : img.width;
                var height_1 = imgSize ? imgSize[1] : img.height;
                var iconContext = createCanvasContext2D(width_1, height_1);
                iconContext.drawImage(img, 0, 0);
                style.setImage(new Icon({
                    img: img,
                    imgSize: imgSize,
                    anchor: image.getAnchor(),
                    anchorXUnits: IconAnchorUnits.PIXELS,
                    anchorYUnits: IconAnchorUnits.PIXELS,
                    offset: image.getOrigin(),
                    size: image.getSize(),
                    opacity: image.getOpacity(),
                    scale: image.getScale(),
                    rotation: image.getRotation(),
                    rotateWithView: image.getRotateWithView(),
                }));
            }
            var zIndex = Number(style.getZIndex());
            var byGeometryType = featuresByZIndex[zIndex];
            if (!byGeometryType) {
                byGeometryType = {};
                featuresByZIndex[zIndex] = byGeometryType;
                byGeometryType[GeometryType.POLYGON] = [];
                byGeometryType[GeometryType.CIRCLE] = [];
                byGeometryType[GeometryType.LINE_STRING] = [];
                byGeometryType[GeometryType.POINT] = [];
            }
            var geometry = style.getGeometryFunction()(feature);
            if (geometry && intersects(extent, geometry.getExtent())) {
                byGeometryType[geometry.getType().replace('Multi', '')].push(geometry, style);
            }
        }
    }
    var zIndexKeys = Object.keys(featuresByZIndex)
        .map(Number)
        .sort(numberSafeCompareFunction);
    for (var i = 0, ii = zIndexKeys.length; i < ii; ++i) {
        var byGeometryType = featuresByZIndex[zIndexKeys[i]];
        for (var type in byGeometryType) {
            var geomAndStyle = byGeometryType[type];
            for (var j = 0, jj = geomAndStyle.length; j < jj; j += 2) {
                renderer.setStyle(geomAndStyle[j + 1]);
                for (var k = 0, kk = transforms.length; k < kk; ++k) {
                    renderer.setTransform(transforms[k]);
                    renderer.drawGeometry(geomAndStyle[j]);
                }
            }
        }
    }
    return context.getImageData(0, 0, canvas.width, canvas.height);
}
/**
 * @param {import("../../pixel").Pixel} pixel Pixel coordinate on the hit
 * detection canvas in css pixels.
 * @param {Array<import("../../Feature").FeatureLike>} features Features. Has to
 * match the `features` array that was passed to `createHitDetectionImageData()`.
 * @param {ImageData} imageData Hit detection image data generated by
 * `createHitDetectionImageData()`.
 * @return {Array<import("../../Feature").FeatureLike>} features Features.
 */
export function hitDetect(pixel, features, imageData) {
    var resultFeatures = [];
    if (imageData) {
        var index = (Math.round(pixel[0] / 2) + Math.round(pixel[1] / 2) * imageData.width) *
            4;
        var r = imageData.data[index];
        var g = imageData.data[index + 1];
        var b = imageData.data[index + 2];
        var i = b + 256 * (g + 256 * r);
        var indexFactor = Math.floor((256 * 256 * 256 - 1) / features.length);
        if (i && i % indexFactor === 0) {
            resultFeatures.push(features[i / indexFactor - 1]);
        }
    }
    return resultFeatures;
}
//# sourceMappingURL=hitdetect.js.map