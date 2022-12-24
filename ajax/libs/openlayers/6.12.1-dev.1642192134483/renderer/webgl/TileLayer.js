var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/renderer/webgl/TileLayer
 */
import LRUCache from '../../structs/LRUCache.js';
import State from '../../source/State.js';
import TileRange from '../../TileRange.js';
import TileState from '../../TileState.js';
import TileTexture from '../../webgl/TileTexture.js';
import WebGLArrayBuffer from '../../webgl/Buffer.js';
import WebGLLayerRenderer from './Layer.js';
import { AttributeType } from '../../webgl/Helper.js';
import { ELEMENT_ARRAY_BUFFER, STATIC_DRAW } from '../../webgl.js';
import { compose as composeTransform, create as createTransform, } from '../../transform.js';
import { create as createMat4, fromTransform as mat4FromTransform, } from '../../vec/mat4.js';
import { createOrUpdate as createTileCoord, getKeyZXY, getKey as getTileCoordKey, } from '../../tilecoord.js';
import { fromUserExtent } from '../../proj.js';
import { getIntersection } from '../../extent.js';
import { getUid } from '../../util.js';
import { isEmpty } from '../../extent.js';
import { numberSafeCompareFunction } from '../../array.js';
import { toSize } from '../../size.js';
export var Uniforms = {
    TILE_TEXTURE_ARRAY: 'u_tileTextures',
    TILE_TRANSFORM: 'u_tileTransform',
    TRANSITION_ALPHA: 'u_transitionAlpha',
    DEPTH: 'u_depth',
    TEXTURE_PIXEL_WIDTH: 'u_texturePixelWidth',
    TEXTURE_PIXEL_HEIGHT: 'u_texturePixelHeight',
    RESOLUTION: 'u_resolution',
    ZOOM: 'u_zoom',
};
export var Attributes = {
    TEXTURE_COORD: 'a_textureCoord',
};
/**
 * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
 */
var attributeDescriptions = [
    {
        name: Attributes.TEXTURE_COORD,
        size: 2,
        type: AttributeType.FLOAT,
    },
];
/**
 * @type {Object<string, boolean>}
 */
var empty = {};
/**
 * Transform a zoom level into a depth value ranging from -1 to 1.
 * @param {number} z A zoom level.
 * @return {number} A depth value.
 */
function depthForZ(z) {
    return 2 * (1 - 1 / (z + 1)) - 1;
}
/**
 * Add a tile texture to the lookup.
 * @param {Object<number, Array<import("../../webgl/TileTexture.js").default>>} tileTexturesByZ Lookup of
 * tile textures by zoom level.
 * @param {import("../../webgl/TileTexture.js").default} tileTexture A tile texture.
 * @param {number} z The zoom level.
 */
function addTileTextureToLookup(tileTexturesByZ, tileTexture, z) {
    if (!(z in tileTexturesByZ)) {
        tileTexturesByZ[z] = [];
    }
    tileTexturesByZ[z].push(tileTexture);
}
/**
 * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
 * @param {import("../../extent.js").Extent} extent The frame extent.
 * @return {import("../../extent.js").Extent} Frame extent intersected with layer extents.
 */
function getRenderExtent(frameState, extent) {
    var layerState = frameState.layerStatesArray[frameState.layerIndex];
    if (layerState.extent) {
        extent = getIntersection(extent, fromUserExtent(layerState.extent, frameState.viewState.projection));
    }
    var source = 
    /** {import("../../source/Tile.js").default} */ layerState.layer.getSource();
    if (!source.getWrapX()) {
        var gridExtent = source
            .getTileGridForProjection(frameState.viewState.projection)
            .getExtent();
        if (gridExtent) {
            extent = getIntersection(extent, gridExtent);
        }
    }
    return extent;
}
/**
 * @typedef {Object} Options
 * @property {string} vertexShader Vertex shader source.
 * @property {string} fragmentShader Fragment shader source.
 * @property {Object<string, import("../../webgl/Helper").UniformValue>} [uniforms] Additional uniforms
 * made available to shaders.
 * @property {Array<import("../../webgl/PaletteTexture.js").default>} [paletteTextures] Palette textures.
 * @property {number} [cacheSize=512] The texture cache size.
 */
/**
 * @typedef {import("../../layer/WebGLTile.js").default} LayerType
 */
/**
 * @classdesc
 * WebGL renderer for tile layers.
 * @extends {WebGLLayerRenderer<LayerType>}
 * @api
 */
var WebGLTileLayerRenderer = /** @class */ (function (_super) {
    __extends(WebGLTileLayerRenderer, _super);
    /**
     * @param {LayerType} tileLayer Tile layer.
     * @param {Options} options Options.
     */
    function WebGLTileLayerRenderer(tileLayer, options) {
        var _this = _super.call(this, tileLayer, {
            uniforms: options.uniforms,
        }) || this;
        /**
         * This transform converts tile i, j coordinates to screen coordinates.
         * @type {import("../../transform.js").Transform}
         * @private
         */
        _this.tileTransform_ = createTransform();
        /**
         * @type {Array<number>}
         * @private
         */
        _this.tempMat4_ = createMat4();
        /**
         * @type {import("../../TileRange.js").default}
         * @private
         */
        _this.tempTileRange_ = new TileRange(0, 0, 0, 0);
        /**
         * @type {import("../../tilecoord.js").TileCoord}
         * @private
         */
        _this.tempTileCoord_ = createTileCoord(0, 0, 0);
        /**
         * @type {import("../../size.js").Size}
         * @private
         */
        _this.tempSize_ = [0, 0];
        /**
         * @type {WebGLProgram}
         * @private
         */
        _this.program_;
        /**
         * @private
         */
        _this.vertexShader_ = options.vertexShader;
        /**
         * @private
         */
        _this.fragmentShader_ = options.fragmentShader;
        /**
         * Tiles are rendered as a quad with the following structure:
         *
         *  [P3]---------[P2]
         *   |`           |
         *   |  `     B   |
         *   |    `       |
         *   |      `     |
         *   |   A    `   |
         *   |          ` |
         *  [P0]---------[P1]
         *
         * Triangle A: P0, P1, P3
         * Triangle B: P1, P2, P3
         *
         * @private
         */
        _this.indices_ = new WebGLArrayBuffer(ELEMENT_ARRAY_BUFFER, STATIC_DRAW);
        _this.indices_.fromArray([0, 1, 3, 1, 2, 3]);
        var cacheSize = options.cacheSize !== undefined ? options.cacheSize : 512;
        /**
         * @type {import("../../structs/LRUCache.js").default<import("../../webgl/TileTexture.js").default>}
         * @private
         */
        _this.tileTextureCache_ = new LRUCache(cacheSize);
        /**
         * @type {Array<import("../../webgl/PaletteTexture.js").default>}
         * @private
         */
        _this.paletteTextures_ = options.paletteTextures || [];
        return _this;
    }
    /**
     * @param {Options} options Options.
     */
    WebGLTileLayerRenderer.prototype.reset = function (options) {
        _super.prototype.reset.call(this, {
            uniforms: options.uniforms,
        });
        this.vertexShader_ = options.vertexShader;
        this.fragmentShader_ = options.fragmentShader;
        this.paletteTextures_ = options.paletteTextures || [];
        if (this.helper) {
            this.program_ = this.helper.getProgram(this.fragmentShader_, this.vertexShader_);
        }
    };
    WebGLTileLayerRenderer.prototype.afterHelperCreated = function () {
        this.program_ = this.helper.getProgram(this.fragmentShader_, this.vertexShader_);
        this.helper.flushBufferData(this.indices_);
    };
    /**
     * @param {import("../../webgl/TileTexture").TileType} tile Tile.
     * @return {boolean} Tile is drawable.
     * @private
     */
    WebGLTileLayerRenderer.prototype.isDrawableTile_ = function (tile) {
        var tileLayer = this.getLayer();
        var tileState = tile.getState();
        var useInterimTilesOnError = tileLayer.getUseInterimTilesOnError();
        return (tileState == TileState.LOADED ||
            tileState == TileState.EMPTY ||
            (tileState == TileState.ERROR && !useInterimTilesOnError));
    };
    /**
     * Determine whether renderFrame should be called.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     */
    WebGLTileLayerRenderer.prototype.prepareFrameInternal = function (frameState) {
        var layer = this.getLayer();
        var source = layer.getSource();
        if (!source) {
            return false;
        }
        if (isEmpty(getRenderExtent(frameState, frameState.extent))) {
            return false;
        }
        return source.getState() === State.READY;
    };
    /**
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {import("../../extent.js").Extent} extent The extent to be rendered.
     * @param {number} z The zoom level.
     * @param {Object<number, Array<TileTexture>>} tileTexturesByZ The zoom level.
     */
    WebGLTileLayerRenderer.prototype.enqueueTiles = function (frameState, extent, z, tileTexturesByZ) {
        var viewState = frameState.viewState;
        var tileLayer = this.getLayer();
        var tileSource = tileLayer.getSource();
        var tileGrid = tileSource.getTileGridForProjection(viewState.projection);
        var tileTextureCache = this.tileTextureCache_;
        var tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z, this.tempTileRange_);
        var tileSourceKey = getUid(tileSource);
        if (!(tileSourceKey in frameState.wantedTiles)) {
            frameState.wantedTiles[tileSourceKey] = {};
        }
        var wantedTiles = frameState.wantedTiles[tileSourceKey];
        var tileResolution = tileGrid.getResolution(z);
        for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
            for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
                var tileCoord = createTileCoord(z, x, y, this.tempTileCoord_);
                var tileCoordKey = getTileCoordKey(tileCoord);
                /**
                 * @type {TileTexture}
                 */
                var tileTexture = void 0;
                /**
                 * @type {import("../../webgl/TileTexture").TileType}
                 */
                var tile = void 0;
                if (tileTextureCache.containsKey(tileCoordKey)) {
                    tileTexture = tileTextureCache.get(tileCoordKey);
                    tile = tileTexture.tile;
                }
                if (!tileTexture || tileTexture.tile.key !== tileSource.getKey()) {
                    tile = tileSource.getTile(z, x, y, frameState.pixelRatio, viewState.projection);
                    if (!tileTexture) {
                        tileTexture = new TileTexture(tile, tileGrid, this.helper);
                        tileTextureCache.set(tileCoordKey, tileTexture);
                    }
                    else {
                        if (this.isDrawableTile_(tile)) {
                            tileTexture.setTile(tile);
                        }
                        else {
                            var interimTile = 
                            /** @type {import("../../webgl/TileTexture").TileType} */ (tile.getInterimTile());
                            tileTexture.setTile(interimTile);
                        }
                    }
                }
                addTileTextureToLookup(tileTexturesByZ, tileTexture, z);
                var tileQueueKey = tile.getKey();
                wantedTiles[tileQueueKey] = true;
                if (tile.getState() === TileState.IDLE) {
                    if (!frameState.tileQueue.isKeyQueued(tileQueueKey)) {
                        frameState.tileQueue.enqueue([
                            tile,
                            tileSourceKey,
                            tileGrid.getTileCoordCenter(tileCoord),
                            tileResolution,
                        ]);
                    }
                }
            }
        }
    };
    /**
     * Render the layer.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     */
    WebGLTileLayerRenderer.prototype.renderFrame = function (frameState) {
        var gl = this.helper.getGL();
        this.preRender(gl, frameState);
        var viewState = frameState.viewState;
        var tileLayer = this.getLayer();
        var tileSource = tileLayer.getSource();
        var tileGrid = tileSource.getTileGridForProjection(viewState.projection);
        var extent = getRenderExtent(frameState, frameState.extent);
        var z = tileGrid.getZForResolution(viewState.resolution, tileSource.zDirection);
        /**
         * @type {Object<number, Array<import("../../webgl/TileTexture.js").default>>}
         */
        var tileTexturesByZ = {};
        if (frameState.nextExtent) {
            var targetZ = tileGrid.getZForResolution(viewState.nextResolution, tileSource.zDirection);
            var nextExtent = getRenderExtent(frameState, frameState.nextExtent);
            this.enqueueTiles(frameState, nextExtent, targetZ, tileTexturesByZ);
        }
        this.enqueueTiles(frameState, extent, z, tileTexturesByZ);
        /**
         * A lookup of alpha values for tiles at the target rendering resolution
         * for tiles that are in transition.  If a tile coord key is absent from
         * this lookup, the tile should be rendered at alpha 1.
         * @type {Object<string, number>}
         */
        var alphaLookup = {};
        var uid = getUid(this);
        var time = frameState.time;
        var blend = false;
        // look for cached tiles to use if a target tile is not ready
        var tileTextures = tileTexturesByZ[z];
        for (var i = 0, ii = tileTextures.length; i < ii; ++i) {
            var tileTexture = tileTextures[i];
            var tile = tileTexture.tile;
            var tileCoord = tile.tileCoord;
            if (tileTexture.loaded) {
                var alpha = tile.getAlpha(uid, time);
                if (alpha === 1) {
                    // no need to look for alt tiles
                    tile.endTransition(uid);
                    continue;
                }
                blend = true;
                var tileCoordKey = getTileCoordKey(tileCoord);
                alphaLookup[tileCoordKey] = alpha;
            }
            // first look for child tiles (at z + 1)
            var coveredByChildren = this.findAltTiles_(tileGrid, tileCoord, z + 1, tileTexturesByZ);
            if (coveredByChildren) {
                continue;
            }
            // next look for parent tiles
            var minZoom = tileGrid.getMinZoom();
            for (var parentZ = z - 1; parentZ >= minZoom; --parentZ) {
                var coveredByParent = this.findAltTiles_(tileGrid, tileCoord, parentZ, tileTexturesByZ);
                if (coveredByParent) {
                    break;
                }
            }
        }
        this.helper.useProgram(this.program_);
        this.helper.prepareDraw(frameState, !blend);
        var zs = Object.keys(tileTexturesByZ)
            .map(Number)
            .sort(numberSafeCompareFunction);
        var centerX = viewState.center[0];
        var centerY = viewState.center[1];
        for (var j = 0, jj = zs.length; j < jj; ++j) {
            var tileZ = zs[j];
            var tileResolution = tileGrid.getResolution(tileZ);
            var tileSize = toSize(tileGrid.getTileSize(tileZ), this.tempSize_);
            var tileOrigin = tileGrid.getOrigin(tileZ);
            var centerI = (centerX - tileOrigin[0]) / (tileSize[0] * tileResolution);
            var centerJ = (tileOrigin[1] - centerY) / (tileSize[1] * tileResolution);
            var tileScale = viewState.resolution / tileResolution;
            var depth = depthForZ(tileZ);
            var tileTextures_1 = tileTexturesByZ[tileZ];
            for (var i = 0, ii = tileTextures_1.length; i < ii; ++i) {
                var tileTexture = tileTextures_1[i];
                if (!tileTexture.loaded) {
                    continue;
                }
                var tile = tileTexture.tile;
                var tileCoord = tile.tileCoord;
                var tileCoordKey = getTileCoordKey(tileCoord);
                var tileCenterI = tileCoord[1];
                var tileCenterJ = tileCoord[2];
                composeTransform(this.tileTransform_, 0, 0, 2 / ((frameState.size[0] * tileScale) / tileSize[0]), -2 / ((frameState.size[1] * tileScale) / tileSize[1]), viewState.rotation, -(centerI - tileCenterI), -(centerJ - tileCenterJ));
                this.helper.setUniformMatrixValue(Uniforms.TILE_TRANSFORM, mat4FromTransform(this.tempMat4_, this.tileTransform_));
                this.helper.bindBuffer(tileTexture.coords);
                this.helper.bindBuffer(this.indices_);
                this.helper.enableAttributes(attributeDescriptions);
                var textureSlot = 0;
                while (textureSlot < tileTexture.textures.length) {
                    var textureProperty = 'TEXTURE' + textureSlot;
                    var uniformName = Uniforms.TILE_TEXTURE_ARRAY + "[" + textureSlot + "]";
                    gl.activeTexture(gl[textureProperty]);
                    gl.bindTexture(gl.TEXTURE_2D, tileTexture.textures[textureSlot]);
                    gl.uniform1i(this.helper.getUniformLocation(uniformName), textureSlot);
                    ++textureSlot;
                }
                for (var paletteIndex = 0; paletteIndex < this.paletteTextures_.length; ++paletteIndex) {
                    var paletteTexture = this.paletteTextures_[paletteIndex];
                    gl.activeTexture(gl['TEXTURE' + textureSlot]);
                    var texture = paletteTexture.getTexture(gl);
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    gl.uniform1i(this.helper.getUniformLocation(paletteTexture.name), textureSlot);
                    ++textureSlot;
                }
                var alpha = tileCoordKey in alphaLookup ? alphaLookup[tileCoordKey] : 1;
                if (alpha < 1) {
                    frameState.animate = true;
                }
                this.helper.setUniformFloatValue(Uniforms.TRANSITION_ALPHA, alpha);
                this.helper.setUniformFloatValue(Uniforms.DEPTH, depth);
                this.helper.setUniformFloatValue(Uniforms.TEXTURE_PIXEL_WIDTH, tileSize[0]);
                this.helper.setUniformFloatValue(Uniforms.TEXTURE_PIXEL_HEIGHT, tileSize[1]);
                this.helper.setUniformFloatValue(Uniforms.RESOLUTION, viewState.resolution);
                this.helper.setUniformFloatValue(Uniforms.ZOOM, viewState.zoom);
                this.helper.drawElements(0, this.indices_.getSize());
            }
        }
        this.helper.finalizeDraw(frameState, this.dispatchPreComposeEvent, this.dispatchPostComposeEvent);
        var canvas = this.helper.getCanvas();
        var tileTextureCache = this.tileTextureCache_;
        while (tileTextureCache.canExpireCache()) {
            var tileTexture = tileTextureCache.pop();
            tileTexture.dispose();
        }
        // TODO: let the renderers manage their own cache instead of managing the source cache
        /**
         * Here we unconditionally expire the source cache since the renderer maintains
         * its own cache.
         * @param {import("../../PluggableMap.js").default} map Map.
         * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
         */
        var postRenderFunction = function (map, frameState) {
            tileSource.expireCache(frameState.viewState.projection, empty);
        };
        frameState.postRenderFunctions.push(postRenderFunction);
        this.postRender(gl, frameState);
        return canvas;
    };
    /**
     * Look for tiles covering the provided tile coordinate at an alternate
     * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
     * @param {import("../../tilegrid/TileGrid.js").default} tileGrid The tile grid.
     * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
     * @param {number} altZ The alternate zoom level.
     * @param {Object<number, Array<import("../../webgl/TileTexture.js").default>>} tileTexturesByZ Lookup of
     * tile textures by zoom level.
     * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
     * @private
     */
    WebGLTileLayerRenderer.prototype.findAltTiles_ = function (tileGrid, tileCoord, altZ, tileTexturesByZ) {
        var tileRange = tileGrid.getTileRangeForTileCoordAndZ(tileCoord, altZ, this.tempTileRange_);
        if (!tileRange) {
            return false;
        }
        var covered = true;
        var tileTextureCache = this.tileTextureCache_;
        for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
            for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
                var cacheKey = getKeyZXY(altZ, x, y);
                var loaded = false;
                if (tileTextureCache.containsKey(cacheKey)) {
                    var tileTexture = tileTextureCache.get(cacheKey);
                    if (tileTexture.loaded) {
                        addTileTextureToLookup(tileTexturesByZ, tileTexture, altZ);
                        loaded = true;
                    }
                }
                if (!loaded) {
                    covered = false;
                }
            }
        }
        return covered;
    };
    /**
     * Clean up.
     */
    WebGLTileLayerRenderer.prototype.disposeInternal = function () {
        var helper = this.helper;
        var gl = helper.getGL();
        helper.deleteBuffer(this.indices_);
        delete this.indices_;
        gl.deleteProgram(this.program_);
        delete this.program_;
        var tileTextureCache = this.tileTextureCache_;
        tileTextureCache.forEach(function (tileTexture) {
            tileTexture.dispose();
        });
        tileTextureCache.clear();
        delete this.tileTextureCache_;
        _super.prototype.disposeInternal.call(this);
    };
    return WebGLTileLayerRenderer;
}(WebGLLayerRenderer));
/**
 * @function
 * @return {import("../../layer/WebGLTile.js").default}
 */
WebGLTileLayerRenderer.prototype.getLayer;
export default WebGLTileLayerRenderer;
//# sourceMappingURL=TileLayer.js.map