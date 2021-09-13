/*!
 * pixi.js - v6.1.3
 * Compiled Mon, 13 Sep 2021 15:29:31 UTC
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('@pixi/polyfill');
var utils = require('@pixi/utils');
var accessibility = require('@pixi/accessibility');
var interaction = require('@pixi/interaction');
var app = require('@pixi/app');
var core = require('@pixi/core');
var extract = require('@pixi/extract');
var loaders = require('@pixi/loaders');
var compressedTextures = require('@pixi/compressed-textures');
var particleContainer = require('@pixi/particle-container');
var prepare = require('@pixi/prepare');
var spritesheet = require('@pixi/spritesheet');
var spriteTiling = require('@pixi/sprite-tiling');
var textBitmap = require('@pixi/text-bitmap');
var ticker = require('@pixi/ticker');
var filterAlpha = require('@pixi/filter-alpha');
var filterBlur = require('@pixi/filter-blur');
var filterColorMatrix = require('@pixi/filter-color-matrix');
var filterDisplacement = require('@pixi/filter-displacement');
var filterFxaa = require('@pixi/filter-fxaa');
var filterNoise = require('@pixi/filter-noise');
require('@pixi/mixin-cache-as-bitmap');
require('@pixi/mixin-get-child-by-name');
require('@pixi/mixin-get-global-position');
var constants = require('@pixi/constants');
var display = require('@pixi/display');
var graphics = require('@pixi/graphics');
var math = require('@pixi/math');
var mesh = require('@pixi/mesh');
var meshExtras = require('@pixi/mesh-extras');
var runner = require('@pixi/runner');
var sprite = require('@pixi/sprite');
var spriteAnimated = require('@pixi/sprite-animated');
var text = require('@pixi/text');
var settings = require('@pixi/settings');

// Install renderer plugins
core.Renderer.registerPlugin('accessibility', accessibility.AccessibilityManager);
core.Renderer.registerPlugin('extract', extract.Extract);
core.Renderer.registerPlugin('interaction', interaction.InteractionManager);
core.Renderer.registerPlugin('particle', particleContainer.ParticleRenderer);
core.Renderer.registerPlugin('prepare', prepare.Prepare);
core.Renderer.registerPlugin('batch', core.BatchRenderer);
core.Renderer.registerPlugin('tilingSprite', spriteTiling.TilingSpriteRenderer);
// Install loader plugins
loaders.Loader.registerPlugin(textBitmap.BitmapFontLoader);
loaders.Loader.registerPlugin(compressedTextures.CompressedTextureLoader);
loaders.Loader.registerPlugin(compressedTextures.DDSLoader);
loaders.Loader.registerPlugin(compressedTextures.KTXLoader);
loaders.Loader.registerPlugin(spritesheet.SpritesheetLoader);
// Install application plugins
app.Application.registerPlugin(ticker.TickerPlugin);
app.Application.registerPlugin(loaders.AppLoaderPlugin);
/**
 * String of the current PIXI version.
 *
 * @static
 * @constant
 * @memberof PIXI
 * @name VERSION
 * @type {string}
 */
var VERSION = '6.1.3';
/**
 * @namespace PIXI
 */
/**
 * This namespace contains WebGL-only display filters that can be applied
 * to DisplayObjects using the {@link PIXI.DisplayObject#filters filters} property.
 *
 * Since PixiJS only had a handful of built-in filters, additional filters
 * can be downloaded {@link https://github.com/pixijs/pixi-filters here} from the
 * PixiJS Filters repository.
 *
 * All filters must extend {@link PIXI.Filter}.
 *
 * @example
 * // Create a new application
 * const app = new PIXI.Application();
 *
 * // Draw a green rectangle
 * const rect = new PIXI.Graphics()
 *     .beginFill(0x00ff00)
 *     .drawRect(40, 40, 200, 200);
 *
 * // Add a blur filter
 * rect.filters = [new PIXI.filters.BlurFilter()];
 *
 * // Display rectangle
 * app.stage.addChild(rect);
 * document.body.appendChild(app.view);
 * @namespace PIXI.filters
 */
var filters = {
    AlphaFilter: filterAlpha.AlphaFilter,
    BlurFilter: filterBlur.BlurFilter,
    BlurFilterPass: filterBlur.BlurFilterPass,
    ColorMatrixFilter: filterColorMatrix.ColorMatrixFilter,
    DisplacementFilter: filterDisplacement.DisplacementFilter,
    FXAAFilter: filterFxaa.FXAAFilter,
    NoiseFilter: filterNoise.NoiseFilter,
};

Object.keys(accessibility).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return accessibility[k];
        }
    });
});
Object.keys(interaction).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return interaction[k];
        }
    });
});
Object.keys(app).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return app[k];
        }
    });
});
Object.keys(core).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return core[k];
        }
    });
});
Object.keys(extract).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return extract[k];
        }
    });
});
Object.keys(loaders).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return loaders[k];
        }
    });
});
Object.keys(compressedTextures).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return compressedTextures[k];
        }
    });
});
Object.keys(particleContainer).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return particleContainer[k];
        }
    });
});
Object.keys(prepare).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return prepare[k];
        }
    });
});
Object.keys(spritesheet).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return spritesheet[k];
        }
    });
});
Object.keys(spriteTiling).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return spriteTiling[k];
        }
    });
});
Object.keys(textBitmap).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return textBitmap[k];
        }
    });
});
Object.keys(ticker).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return ticker[k];
        }
    });
});
Object.keys(constants).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return constants[k];
        }
    });
});
Object.keys(display).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return display[k];
        }
    });
});
Object.keys(graphics).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return graphics[k];
        }
    });
});
Object.keys(math).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return math[k];
        }
    });
});
Object.keys(mesh).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return mesh[k];
        }
    });
});
Object.keys(meshExtras).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return meshExtras[k];
        }
    });
});
Object.keys(runner).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return runner[k];
        }
    });
});
Object.keys(sprite).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return sprite[k];
        }
    });
});
Object.keys(spriteAnimated).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return spriteAnimated[k];
        }
    });
});
Object.keys(text).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return text[k];
        }
    });
});
Object.keys(settings).forEach(function (k) {
    if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return settings[k];
        }
    });
});
exports.utils = utils;
exports.VERSION = VERSION;
exports.filters = filters;
//# sourceMappingURL=pixi.js.map
