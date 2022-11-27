/**
 * @module ol/webgl/TileTexture
 */
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
import EventTarget from '../events/Target.js';
import EventType from '../events/EventType.js';
import ImageTile from '../ImageTile.js';
import TileState from '../TileState.js';
import WebGLArrayBuffer from './Buffer.js';
import { ARRAY_BUFFER, STATIC_DRAW } from '../webgl.js';
import { toSize } from '../size.js';
function bindAndConfigure(gl, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
}
/**
 * @param {WebGLRenderingContext} gl The WebGL context.
 * @param {WebGLTexture} texture The texture.
 * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} image The image.
 */
function uploadImageTexture(gl, texture, image) {
    bindAndConfigure(gl, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
}
/**
 * @param {import("./Helper.js").default} helper The WebGL helper.
 * @param {WebGLTexture} texture The texture.
 * @param {import("../DataTile.js").Data} data The pixel data.
 * @param {import("../size.js").Size} size The pixel size.
 * @param {number} bandCount The band count.
 */
function uploadDataTexture(helper, texture, data, size, bandCount) {
    var gl = helper.getGL();
    bindAndConfigure(gl, texture);
    var format;
    switch (bandCount) {
        case 1: {
            format = gl.LUMINANCE;
            break;
        }
        case 2: {
            format = gl.LUMINANCE_ALPHA;
            break;
        }
        case 3: {
            format = gl.RGB;
            break;
        }
        case 4: {
            format = gl.RGBA;
            break;
        }
        default: {
            throw new Error("Unsupported number of bands: " + bandCount);
        }
    }
    var textureType;
    if (data instanceof Float32Array) {
        textureType = gl.FLOAT;
        helper.getExtension('OES_texture_float');
        helper.getExtension('OES_texture_float_linear');
    }
    else {
        textureType = gl.UNSIGNED_BYTE;
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, format, size[0], size[1], 0, format, textureType, data);
}
var TileTexture = /** @class */ (function (_super) {
    __extends(TileTexture, _super);
    /**
     * @param {import("../DataTile.js").default|import("../ImageTile.js").default} tile The tile.
     * @param {import("../tilegrid/TileGrid.js").default} grid Tile grid.
     * @param {import("../webgl/Helper.js").default} helper WebGL helper.
     */
    function TileTexture(tile, grid, helper) {
        var _this = _super.call(this) || this;
        /**
         * @type {import("../DataTile.js").default|import("../ImageTile.js").default}
         */
        _this.tile;
        /**
         * @type {Array<WebGLTexture>}
         */
        _this.textures = [];
        _this.handleTileChange_ = _this.handleTileChange_.bind(_this);
        _this.size = toSize(grid.getTileSize(tile.tileCoord[0]));
        _this.bandCount = NaN;
        _this.helper_ = helper;
        var coords = new WebGLArrayBuffer(ARRAY_BUFFER, STATIC_DRAW);
        coords.fromArray([
            0,
            1,
            1,
            1,
            1,
            0,
            0,
            0,
        ]);
        helper.flushBufferData(coords);
        _this.coords = coords;
        _this.setTile(tile);
        return _this;
    }
    /**
     * @param {import("../DataTile.js").default|import("../ImageTile.js").default} tile Tile.
     */
    TileTexture.prototype.setTile = function (tile) {
        if (tile !== this.tile) {
            if (this.tile) {
                this.tile.removeEventListener(EventType.CHANGE, this.handleTileChange_);
            }
            this.tile = tile;
            this.textures.length = 0;
            this.loaded = tile.getState() === TileState.LOADED;
            if (this.loaded) {
                this.uploadTile_();
            }
            else {
                tile.addEventListener(EventType.CHANGE, this.handleTileChange_);
            }
        }
    };
    TileTexture.prototype.uploadTile_ = function () {
        var helper = this.helper_;
        var gl = helper.getGL();
        var tile = this.tile;
        if (tile instanceof ImageTile) {
            var texture = gl.createTexture();
            this.textures.push(texture);
            this.bandCount = 4;
            uploadImageTexture(gl, texture, tile.getImage());
            return;
        }
        var data = tile.getData();
        var isFloat = data instanceof Float32Array;
        var pixelCount = this.size[0] * this.size[1];
        // Float arrays feature four bytes per element,
        //  BYTES_PER_ELEMENT throws a TypeScript exception but would handle
        //  this better for more varied typed arrays.
        this.bandCount = data.byteLength / (isFloat ? 4 : 1) / pixelCount;
        var textureCount = Math.ceil(this.bandCount / 4);
        if (textureCount === 1) {
            var texture = gl.createTexture();
            this.textures.push(texture);
            uploadDataTexture(helper, texture, data, this.size, this.bandCount);
            return;
        }
        var DataType = isFloat ? Float32Array : Uint8Array;
        var textureDataArrays = new Array(textureCount);
        for (var textureIndex = 0; textureIndex < textureCount; ++textureIndex) {
            var texture = gl.createTexture();
            this.textures.push(texture);
            var bandCount = textureIndex < textureCount - 1 ? 4 : this.bandCount % 4;
            textureDataArrays[textureIndex] = new DataType(pixelCount * bandCount);
        }
        var valueCount = pixelCount * this.bandCount;
        for (var dataIndex = 0; dataIndex < valueCount; ++dataIndex) {
            var bandIndex = dataIndex % this.bandCount;
            var textureBandIndex = bandIndex % 4;
            var textureIndex = Math.floor(bandIndex / 4);
            var bandCount = textureIndex < textureCount - 1 ? 4 : this.bandCount % 4;
            var pixelIndex = Math.floor(dataIndex / this.bandCount);
            textureDataArrays[textureIndex][pixelIndex * bandCount + textureBandIndex] = data[dataIndex];
        }
        for (var textureIndex = 0; textureIndex < textureCount; ++textureIndex) {
            var bandCount = textureIndex < textureCount - 1 ? 4 : this.bandCount % 4;
            var texture = this.textures[textureIndex];
            var data_1 = textureDataArrays[textureIndex];
            uploadDataTexture(helper, texture, data_1, this.size, bandCount);
        }
    };
    TileTexture.prototype.handleTileChange_ = function () {
        if (this.tile.getState() === TileState.LOADED) {
            this.loaded = true;
            this.uploadTile_();
            this.dispatchEvent(EventType.CHANGE);
        }
    };
    TileTexture.prototype.disposeInternal = function () {
        var gl = this.helper_.getGL();
        this.helper_.deleteBuffer(this.coords);
        for (var i = 0; i < this.textures.length; ++i) {
            gl.deleteTexture(this.textures[i]);
        }
        this.tile.removeEventListener(EventType.CHANGE, this.handleTileChange_);
    };
    return TileTexture;
}(EventTarget));
export default TileTexture;
//# sourceMappingURL=TileTexture.js.map