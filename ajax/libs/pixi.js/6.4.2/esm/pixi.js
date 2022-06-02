/*!
 * pixi.js - v6.4.2
 * Compiled Thu, 02 Jun 2022 15:39:26 UTC
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import '@pixi/polyfill';
import * as utils from '@pixi/utils';
export { utils };
import { AccessibilityManager } from '@pixi/accessibility';
export * from '@pixi/accessibility';
import { InteractionManager } from '@pixi/interaction';
export * from '@pixi/interaction';
import { Application } from '@pixi/app';
export * from '@pixi/app';
import { Renderer, BatchRenderer } from '@pixi/core';
export * from '@pixi/core';
import { Extract } from '@pixi/extract';
export * from '@pixi/extract';
import { Loader, AppLoaderPlugin } from '@pixi/loaders';
export * from '@pixi/loaders';
import { CompressedTextureLoader, DDSLoader, KTXLoader } from '@pixi/compressed-textures';
export * from '@pixi/compressed-textures';
import { ParticleRenderer } from '@pixi/particle-container';
export * from '@pixi/particle-container';
import { Prepare } from '@pixi/prepare';
export * from '@pixi/prepare';
import { SpritesheetLoader } from '@pixi/spritesheet';
export * from '@pixi/spritesheet';
import { TilingSpriteRenderer } from '@pixi/sprite-tiling';
export * from '@pixi/sprite-tiling';
import { BitmapFontLoader } from '@pixi/text-bitmap';
export * from '@pixi/text-bitmap';
import { TickerPlugin } from '@pixi/ticker';
export * from '@pixi/ticker';
import { AlphaFilter } from '@pixi/filter-alpha';
import { BlurFilter, BlurFilterPass } from '@pixi/filter-blur';
import { ColorMatrixFilter } from '@pixi/filter-color-matrix';
import { DisplacementFilter } from '@pixi/filter-displacement';
import { FXAAFilter } from '@pixi/filter-fxaa';
import { NoiseFilter } from '@pixi/filter-noise';
import '@pixi/mixin-cache-as-bitmap';
import '@pixi/mixin-get-child-by-name';
import '@pixi/mixin-get-global-position';
export * from '@pixi/constants';
export * from '@pixi/display';
export * from '@pixi/graphics';
export * from '@pixi/math';
export * from '@pixi/mesh';
export * from '@pixi/mesh-extras';
export * from '@pixi/runner';
export * from '@pixi/sprite';
export * from '@pixi/sprite-animated';
export * from '@pixi/text';
export * from '@pixi/settings';

// Install renderer plugins
Renderer.registerPlugin('accessibility', AccessibilityManager);
Renderer.registerPlugin('extract', Extract);
Renderer.registerPlugin('interaction', InteractionManager);
Renderer.registerPlugin('particle', ParticleRenderer);
Renderer.registerPlugin('prepare', Prepare);
Renderer.registerPlugin('batch', BatchRenderer);
Renderer.registerPlugin('tilingSprite', TilingSpriteRenderer);
// Install loader plugins
Loader.registerPlugin(BitmapFontLoader);
Loader.registerPlugin(CompressedTextureLoader);
Loader.registerPlugin(DDSLoader);
Loader.registerPlugin(KTXLoader);
Loader.registerPlugin(SpritesheetLoader);
// Install application plugins
Application.registerPlugin(TickerPlugin);
Application.registerPlugin(AppLoaderPlugin);
/**
 * String of the current PIXI version.
 * @static
 * @constant
 * @memberof PIXI
 * @name VERSION
 * @type {string}
 */
var VERSION = '6.4.2';
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
    AlphaFilter: AlphaFilter,
    BlurFilter: BlurFilter,
    BlurFilterPass: BlurFilterPass,
    ColorMatrixFilter: ColorMatrixFilter,
    DisplacementFilter: DisplacementFilter,
    FXAAFilter: FXAAFilter,
    NoiseFilter: NoiseFilter,
};

export { VERSION, filters };
//# sourceMappingURL=pixi.js.map
