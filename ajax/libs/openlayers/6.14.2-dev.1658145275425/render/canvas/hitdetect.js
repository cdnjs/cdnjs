/**
 * @module ol/render/canvas/hitdetect
 */
import CanvasImmediateRenderer from './Immediate.js';
import IconAnchorUnits from '../../style/IconAnchorUnits.js';
import { Icon } from '../../style.js';
import { clamp } from '../../math.js';
import { createCanvasContext2D } from '../../dom.js';
import { intersects } from '../../extent.js';
import { numberSafeCompareFunction } from '../../array.js';
export var HIT_DETECT_RESOLUTION = 0.5;
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
    var width = size[0] * HIT_DETECT_RESOLUTION;
    var height = size[1] * HIT_DETECT_RESOLUTION;
    var context = createCanvasContext2D(width, height);
    context.imageSmoothingEnabled = false;
    var canvas = context.canvas;
    var renderer = new CanvasImmediateRenderer(context, HIT_DETECT_RESOLUTION, extent, null, rotation);
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
            var geometry = originalStyle.getGeometryFunction()(feature);
            if (!geometry || !intersects(extent, geometry.getExtent())) {
                continue;
            }
            var style = originalStyle.clone();
            var fill = style.getFill();
            if (fill) {
                fill.setColor(color);
            }
            var stroke = style.getStroke();
            if (stroke) {
                stroke.setColor(color);
                stroke.setLineDash(null);
            }
            style.setText(undefined);
            var image = originalStyle.getImage();
            if (image && image.getOpacity() !== 0) {
                var imgSize = image.getImageSize();
                if (!imgSize) {
                    continue;
                }
                var imgContext = createCanvasContext2D(imgSize[0], imgSize[1], undefined, { alpha: false });
                var img = imgContext.canvas;
                imgContext.fillStyle = color;
                imgContext.fillRect(0, 0, img.width, img.height);
                style.setImage(new Icon({
                    img: img,
                    imgSize: imgSize,
                    anchor: image.getAnchor(),
                    anchorXUnits: IconAnchorUnits.PIXELS,
                    anchorYUnits: IconAnchorUnits.PIXELS,
                    offset: image.getOrigin(),
                    opacity: 1,
                    size: image.getSize(),
                    scale: image.getScale(),
                    rotation: image.getRotation(),
                    rotateWithView: image.getRotateWithView(),
                }));
            }
            var zIndex = style.getZIndex() || 0;
            var byGeometryType = featuresByZIndex[zIndex];
            if (!byGeometryType) {
                byGeometryType = {};
                featuresByZIndex[zIndex] = byGeometryType;
                byGeometryType['Polygon'] = [];
                byGeometryType['Circle'] = [];
                byGeometryType['LineString'] = [];
                byGeometryType['Point'] = [];
            }
            byGeometryType[geometry.getType().replace('Multi', '')].push(geometry, style);
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
        var x = Math.floor(Math.round(pixel[0]) * HIT_DETECT_RESOLUTION);
        var y = Math.floor(Math.round(pixel[1]) * HIT_DETECT_RESOLUTION);
        // The pixel coordinate is clamped down to the hit-detect canvas' size to account
        // for browsers returning coordinates slightly larger than the actual canvas size
        // due to a non-integer pixel ratio.
        var index = (clamp(x, 0, imageData.width - 1) +
            clamp(y, 0, imageData.height - 1) * imageData.width) *
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