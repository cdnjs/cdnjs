/*!
 * pixi.js - v7.0.0-beta.3
 * Compiled Thu, 13 Oct 2022 15:35:43 UTC
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var filterAlpha = require('@pixi/filter-alpha');
var filterBlur = require('@pixi/filter-blur');
var filterColorMatrix = require('@pixi/filter-color-matrix');
var filterDisplacement = require('@pixi/filter-displacement');
var filterFxaa = require('@pixi/filter-fxaa');
var filterNoise = require('@pixi/filter-noise');
require('@pixi/mixin-cache-as-bitmap');
require('@pixi/mixin-get-child-by-name');
require('@pixi/mixin-get-global-position');
var accessibility = require('@pixi/accessibility');
var app = require('@pixi/app');
var assets = require('@pixi/assets');
var compressedTextures = require('@pixi/compressed-textures');
var core = require('@pixi/core');
var display = require('@pixi/display');
var events = require('@pixi/events');
var extract = require('@pixi/extract');
var graphics = require('@pixi/graphics');
var mesh = require('@pixi/mesh');
var meshExtras = require('@pixi/mesh-extras');
var particleContainer = require('@pixi/particle-container');
var prepare = require('@pixi/prepare');
var sprite = require('@pixi/sprite');
var spritesheet = require('@pixi/spritesheet');
var spriteAnimated = require('@pixi/sprite-animated');
var spriteTiling = require('@pixi/sprite-tiling');
var text = require('@pixi/text');
var textBitmap = require('@pixi/text-bitmap');

const filters = {
  AlphaFilter: filterAlpha.AlphaFilter,
  BlurFilter: filterBlur.BlurFilter,
  BlurFilterPass: filterBlur.BlurFilterPass,
  ColorMatrixFilter: filterColorMatrix.ColorMatrixFilter,
  DisplacementFilter: filterDisplacement.DisplacementFilter,
  FXAAFilter: filterFxaa.FXAAFilter,
  NoiseFilter: filterNoise.NoiseFilter
};

exports.filters = filters;
Object.keys(accessibility).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return accessibility[k]; }
    });
});
Object.keys(app).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return app[k]; }
    });
});
Object.keys(assets).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return assets[k]; }
    });
});
Object.keys(compressedTextures).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return compressedTextures[k]; }
    });
});
Object.keys(core).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return core[k]; }
    });
});
Object.keys(display).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return display[k]; }
    });
});
Object.keys(events).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return events[k]; }
    });
});
Object.keys(extract).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return extract[k]; }
    });
});
Object.keys(graphics).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return graphics[k]; }
    });
});
Object.keys(mesh).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return mesh[k]; }
    });
});
Object.keys(meshExtras).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return meshExtras[k]; }
    });
});
Object.keys(particleContainer).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return particleContainer[k]; }
    });
});
Object.keys(prepare).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return prepare[k]; }
    });
});
Object.keys(sprite).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return sprite[k]; }
    });
});
Object.keys(spritesheet).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return spritesheet[k]; }
    });
});
Object.keys(spriteAnimated).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return spriteAnimated[k]; }
    });
});
Object.keys(spriteTiling).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return spriteTiling[k]; }
    });
});
Object.keys(text).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return text[k]; }
    });
});
Object.keys(textBitmap).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return textBitmap[k]; }
    });
});
//# sourceMappingURL=pixi.js.map
