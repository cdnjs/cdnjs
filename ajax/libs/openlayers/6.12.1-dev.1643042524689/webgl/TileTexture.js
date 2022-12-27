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
import ReprojTile from '../reproj/Tile.js';
import TileState from '../TileState.js';
import WebGLArrayBuffer from './Buffer.js';
import { ARRAY_BUFFER, STATIC_DRAW } from '../webgl.js';
import { toSize } from '../size.js';
/**
 * @param {WebGLRenderingContext} gl The WebGL context.
 * @param {WebGLTexture} texture The texture.
 * @param {boolean} interpolate Interpolate when resampling.
 */
function bindAndConfigure(gl, texture, interpolate) {
    var resampleFilter = interpolate ? gl.LINEAR : gl.NEAREST;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, resampleFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, resampleFilter);
}
/**
 * @param {WebGLRenderingContext} gl The WebGL context.
 * @param {WebGLTexture} texture The texture.
 * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} image The image.
 * @param {boolean} interpolate Interpolate when resampling.
 */
function uploadImageTexture(gl, texture, image, interpolate) {
    bindAndConfigure(gl, texture, interpolate);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
}
/**
 * @param {import("./Helper.js").default} helper The WebGL helper.
 * @param {WebGLTexture} texture The texture.
 * @param {import("../DataTile.js").Data} data The pixel data.
 * @param {import("../size.js").Size} size The pixel size.
 * @param {number} bandCount The band count.
 * @param {boolean} interpolate Interpolate when resampling.
 */
function uploadDataTexture(helper, texture, data, size, bandCount, interpolate) {
    var gl = helper.getGL();
    bindAndConfigure(gl, texture, interpolate);
    var bytesPerRow = data.byteLength / size[1];
    var unpackAlignment = 1;
    if (bytesPerRow % 8 === 0) {
        unpackAlignment = 8;
    }
    else if (bytesPerRow % 4 === 0) {
        unpackAlignment = 4;
    }
    else if (bytesPerRow % 2 === 0) {
        unpackAlignment = 2;
    }
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
    var oldUnpackAlignment = gl.getParameter(gl.UNPACK_ALIGNMENT);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, unpackAlignment);
    gl.texImage2D(gl.TEXTURE_2D, 0, format, size[0], size[1], 0, format, textureType, data);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, oldUnpackAlignment);
}
/**
 * @typedef {import("../DataTile.js").default|ImageTile|ReprojTile} TileType
 */
var TileTexture = /** @class */ (function (_super) {
    __extends(TileTexture, _super);
    /**
     * @param {TileType} tile The tile.
     * @param {import("../tilegrid/TileGrid.js").default} grid Tile grid.
     * @param {import("../webgl/Helper.js").default} helper WebGL helper.
     */
    function TileTexture(tile, grid, helper) {
        var _this = _super.call(this) || this;
        /**
         * @type {TileType}
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
     * @param {TileType} tile Tile.
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
                if (tile instanceof ImageTile) {
                    var image = tile.getImage();
                    if (image instanceof Image && !image.crossOrigin) {
                        image.crossOrigin = 'anonymous';
                    }
                }
                tile.addEventListener(EventType.CHANGE, this.handleTileChange_);
            }
        }
    };
    TileTexture.prototype.uploadTile_ = function () {
        var helper = this.helper_;
        var gl = helper.getGL();
        var tile = this.tile;
        if (tile instanceof ImageTile || tile instanceof ReprojTile) {
            var texture = gl.createTexture();
            this.textures.push(texture);
            this.bandCount = 4;
            uploadImageTexture(gl, texture, tile.getImage(), tile.interpolate);
            return;
        }
        var data = tile.getData();
        var isFloat = data instanceof Float32Array;
        var pixelCount = this.size[0] * this.size[1];
        var DataType = isFloat ? Float32Array : Uint8Array;
        var bytesPerElement = DataType.BYTES_PER_ELEMENT;
        var bytesPerRow = data.byteLength / this.size[1];
        this.bandCount = Math.floor(bytesPerRow / bytesPerElement / this.size[0]);
        var textureCount = Math.ceil(this.bandCount / 4);
        if (textureCount === 1) {
            var texture = gl.createTexture();
            this.textures.push(texture);
            uploadDataTexture(helper, texture, data, this.size, this.bandCount, tile.interpolate);
            return;
        }
        var textureDataArrays = new Array(textureCount);
        for (var textureIndex = 0; textureIndex < textureCount; ++textureIndex) {
            var texture = gl.createTexture();
            this.textures.push(texture);
            var bandCount = textureIndex < textureCount - 1 ? 4 : this.bandCount % 4;
            textureDataArrays[textureIndex] = new DataType(pixelCount * bandCount);
        }
        var dataIndex = 0;
        var rowOffset = 0;
        var colCount = this.size[0] * this.bandCount;
        for (var rowIndex = 0; rowIndex < this.size[1]; ++rowIndex) {
            for (var colIndex = 0; colIndex < colCount; ++colIndex) {
                var dataValue = data[rowOffset + colIndex];
                var pixelIndex = Math.floor(dataIndex / this.bandCount);
                var bandIndex = colIndex % this.bandCount;
                var textureIndex = Math.floor(bandIndex / 4);
                var textureData = textureDataArrays[textureIndex];
                var bandCount = textureData.length / pixelCount;
                var textureBandIndex = bandIndex % 4;
                textureData[pixelIndex * bandCount + textureBandIndex] = dataValue;
                ++dataIndex;
            }
            rowOffset += bytesPerRow / bytesPerElement;
        }
        for (var textureIndex = 0; textureIndex < textureCount; ++textureIndex) {
            var texture = this.textures[textureIndex];
            var textureData = textureDataArrays[textureIndex];
            var bandCount = textureData.length / pixelCount;
            uploadDataTexture(helper, texture, textureData, this.size, bandCount, tile.interpolate);
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