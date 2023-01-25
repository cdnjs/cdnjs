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
import DataTile from '../DataTile.js';
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
    var textureType;
    var canInterpolate;
    if (data instanceof Float32Array) {
        textureType = gl.FLOAT;
        helper.getExtension('OES_texture_float');
        var extension = helper.getExtension('OES_texture_float_linear');
        canInterpolate = extension !== null;
    }
    else {
        textureType = gl.UNSIGNED_BYTE;
        canInterpolate = true;
    }
    bindAndConfigure(gl, texture, interpolate && canInterpolate);
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
            throw new Error("Unsupported number of bands: ".concat(bandCount));
        }
    }
    var oldUnpackAlignment = gl.getParameter(gl.UNPACK_ALIGNMENT);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, unpackAlignment);
    gl.texImage2D(gl.TEXTURE_2D, 0, format, size[0], size[1], 0, format, textureType, data);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, oldUnpackAlignment);
}
/**
 * @type {CanvasRenderingContext2D}
 */
var pixelContext = null;
function createPixelContext() {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    pixelContext = canvas.getContext('2d');
}
/**
 * @typedef {import("../DataTile.js").default|ImageTile|ReprojTile} TileType
 */
/**
 * @typedef {Object} Options
 * @property {TileType} tile The tile.
 * @property {import("../tilegrid/TileGrid.js").default} grid Tile grid.
 * @property {import("../webgl/Helper.js").default} helper WebGL helper.
 * @property {number} [gutter=0] The size in pixels of the gutter around image tiles to ignore.
 */
var TileTexture = /** @class */ (function (_super) {
    __extends(TileTexture, _super);
    /**
     * @param {Options} options The tile texture options.
     */
    function TileTexture(options) {
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
        /**
         * @type {import("../size.js").Size}
         * @private
         */
        _this.renderSize_ = toSize(options.grid.getTileSize(options.tile.tileCoord[0]));
        /**
         * @type {number}
         * @private
         */
        _this.gutter_ = options.gutter || 0;
        /**
         * @type {number}
         */
        _this.bandCount = NaN;
        /**
         * @type {import("../webgl/Helper.js").default}
         * @private
         */
        _this.helper_ = options.helper;
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
        _this.helper_.flushBufferData(coords);
        /**
         * @type {WebGLArrayBuffer}
         */
        _this.coords = coords;
        _this.setTile(options.tile);
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
        var sourceTileSize = tile.getSize();
        var pixelSize = [
            sourceTileSize[0] + 2 * this.gutter_,
            sourceTileSize[1] + 2 * this.gutter_,
        ];
        var data = tile.getData();
        var isFloat = data instanceof Float32Array;
        var pixelCount = pixelSize[0] * pixelSize[1];
        var DataType = isFloat ? Float32Array : Uint8Array;
        var bytesPerElement = DataType.BYTES_PER_ELEMENT;
        var bytesPerRow = data.byteLength / pixelSize[1];
        this.bandCount = Math.floor(bytesPerRow / bytesPerElement / pixelSize[0]);
        var textureCount = Math.ceil(this.bandCount / 4);
        if (textureCount === 1) {
            var texture = gl.createTexture();
            this.textures.push(texture);
            uploadDataTexture(helper, texture, data, pixelSize, this.bandCount, tile.interpolate);
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
        var colCount = pixelSize[0] * this.bandCount;
        for (var rowIndex = 0; rowIndex < pixelSize[1]; ++rowIndex) {
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
            uploadDataTexture(helper, texture, textureData, pixelSize, bandCount, tile.interpolate);
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
    /**
     * Get data for a pixel.  If the tile is not loaded, null is returned.
     * @param {number} renderCol The column index (in rendered tile space).
     * @param {number} renderRow The row index (in rendered tile space).
     * @return {import("../DataTile.js").Data|null} The data.
     */
    TileTexture.prototype.getPixelData = function (renderCol, renderRow) {
        if (!this.loaded) {
            return null;
        }
        var renderWidth = this.renderSize_[0];
        var renderHeight = this.renderSize_[1];
        var gutter = this.gutter_;
        if (this.tile instanceof DataTile) {
            var sourceSize = this.tile.getSize();
            var sourceWidthWithoutGutter_1 = sourceSize[0];
            var sourceHeightWithoutGutter_1 = sourceSize[1];
            var sourceWidth_1 = sourceWidthWithoutGutter_1 + 2 * gutter;
            var sourceHeight_1 = sourceHeightWithoutGutter_1 + 2 * gutter;
            var sourceCol_1 = gutter +
                Math.floor(sourceWidthWithoutGutter_1 * (renderCol / renderWidth));
            var sourceRow_1 = gutter +
                Math.floor(sourceHeightWithoutGutter_1 * (renderRow / renderHeight));
            var data_1 = this.tile.getData();
            if (data_1 instanceof DataView) {
                var bytesPerPixel = data_1.byteLength / (sourceWidth_1 * sourceHeight_1);
                var offset_1 = bytesPerPixel * (sourceRow_1 * sourceWidth_1 + sourceCol_1);
                var buffer = data_1.buffer.slice(offset_1, offset_1 + bytesPerPixel);
                return new DataView(buffer);
            }
            var offset = this.bandCount * (sourceRow_1 * sourceWidth_1 + sourceCol_1);
            return data_1.slice(offset, offset + this.bandCount);
        }
        if (!pixelContext) {
            createPixelContext();
        }
        pixelContext.clearRect(0, 0, 1, 1);
        var image = this.tile.getImage();
        var sourceWidth = image.width;
        var sourceHeight = image.height;
        var sourceWidthWithoutGutter = sourceWidth - 2 * gutter;
        var sourceHeightWithoutGutter = sourceHeight - 2 * gutter;
        var sourceCol = gutter + Math.floor(sourceWidthWithoutGutter * (renderCol / renderWidth));
        var sourceRow = gutter +
            Math.floor(sourceHeightWithoutGutter * (renderRow / renderHeight));
        var data;
        try {
            pixelContext.drawImage(image, sourceCol, sourceRow, 1, 1, 0, 0, 1, 1);
            data = pixelContext.getImageData(0, 0, 1, 1).data;
        }
        catch (err) {
            pixelContext = null;
            return null;
        }
        return data;
    };
    return TileTexture;
}(EventTarget));
export default TileTexture;
//# sourceMappingURL=TileTexture.js.map