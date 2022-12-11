/**
 * @module ol/source/ogcTileUtil
 */
import TileGrid from '../tilegrid/TileGrid.js';
import { assign } from '../obj.js';
import { getJSON, resolveUrl } from '../net.js';
import { get as getProjection } from '../proj.js';
import { getIntersection as intersectExtents } from '../extent.js';
/**
 * See https://ogcapi.ogc.org/tiles/.
 */
/**
 * @typedef {'map' | 'vector'} TileType
 */
/**
 * @typedef {'topLeft' | 'bottomLeft'} CornerOfOrigin
 */
/**
 * @typedef {Object} TileSet
 * @property {TileType} dataType Type of data represented in the tileset.
 * @property {string} [tileMatrixSetDefinition] Reference to a tile matrix set definition.
 * @property {TileMatrixSet} [tileMatrixSet] Tile matrix set definition.
 * @property {Array<TileMatrixSetLimit>} [tileMatrixSetLimits] Tile matrix set limits.
 * @property {Array<Link>} links Tileset links.
 */
/**
 * @typedef {Object} Link
 * @property {string} rel The link rel attribute.
 * @property {string} href The link URL.
 * @property {string} type The link type.
 */
/**
 * @typedef {Object} TileMatrixSetLimit
 * @property {string} tileMatrix The tile matrix id.
 * @property {number} minTileRow The minimum tile row.
 * @property {number} maxTileRow The maximum tile row.
 * @property {number} minTileCol The minimum tile column.
 * @property {number} maxTileCol The maximum tile column.
 */
/**
 * @typedef {Object} TileMatrixSet
 * @property {string} id The tile matrix set identifier.
 * @property {string} crs The coordinate reference system.
 * @property {Array<TileMatrix>} tileMatrices Array of tile matrices.
 */
/**
 * @typedef {Object} TileMatrix
 * @property {string} id The tile matrix identifier.
 * @property {number} cellSize The pixel resolution (map units per pixel).
 * @property {Array<number>} pointOfOrigin The map location of the matrix origin.
 * @property {CornerOfOrigin} [cornerOfOrigin='topLeft'] The corner of the matrix that represents the origin ('topLeft' or 'bottomLeft').
 * @property {number} matrixWidth The number of columns.
 * @property {number} matrixHeight The number of rows.
 * @property {number} tileWidth The pixel width of a tile.
 * @property {number} tileHeight The pixel height of a tile.
 */
/**
 * @type {Object<string, boolean>}
 */
var knownMapMediaTypes = {
    'image/png': true,
    'image/jpeg': true,
    'image/gif': true,
    'image/webp': true,
};
/**
 * @type {Object<string, boolean>}
 */
var knownVectorMediaTypes = {
    'application/vnd.mapbox-vector-tile': true,
    'application/geo+json': true,
};
/**
 * @typedef {Object} TileSetInfo
 * @property {string} urlTemplate The tile URL template.
 * @property {import("../tilegrid/TileGrid.js").default} grid The tile grid.
 * @property {import("../Tile.js").UrlFunction} urlFunction The tile URL function.
 */
/**
 * @typedef {Object} SourceInfo
 * @property {string} url The tile set URL.
 * @property {string} mediaType The preferred tile media type.
 * @property {Array<string>} [supportedMediaTypes] The supported media types.
 * @property {import("../proj/Projection.js").default} projection The source projection.
 * @property {Object} [context] Optional context for constructing the URL.
 */
/**
 * @param {Array<Link>} links Tileset links.
 * @param {string} [mediaType] The preferred media type.
 * @return {string} The tile URL template.
 */
export function getMapTileUrlTemplate(links, mediaType) {
    var tileUrlTemplate;
    var fallbackUrlTemplate;
    for (var i = 0; i < links.length; ++i) {
        var link = links[i];
        if (link.rel === 'item') {
            if (link.type === mediaType) {
                tileUrlTemplate = link.href;
                break;
            }
            if (knownMapMediaTypes[link.type]) {
                fallbackUrlTemplate = link.href;
            }
            else if (!fallbackUrlTemplate && link.type.indexOf('image/') === 0) {
                fallbackUrlTemplate = link.href;
            }
        }
    }
    if (!tileUrlTemplate) {
        if (fallbackUrlTemplate) {
            tileUrlTemplate = fallbackUrlTemplate;
        }
        else {
            throw new Error('Could not find "item" link');
        }
    }
    return tileUrlTemplate;
}
/**
 * @param {Array<Link>} links Tileset links.
 * @param {string} [mediaType] The preferred media type.
 * @param {Array<string>} [supportedMediaTypes] The media types supported by the parser.
 * @return {string} The tile URL template.
 */
export function getVectorTileUrlTemplate(links, mediaType, supportedMediaTypes) {
    var tileUrlTemplate;
    var fallbackUrlTemplate;
    /**
     * Lookup of URL by media type.
     * @type {Object<string, string>}
     */
    var hrefLookup = {};
    for (var i = 0; i < links.length; ++i) {
        var link = links[i];
        hrefLookup[link.type] = link.href;
        if (link.rel === 'item') {
            if (link.type === mediaType) {
                tileUrlTemplate = link.href;
                break;
            }
            if (knownVectorMediaTypes[link.type]) {
                fallbackUrlTemplate = link.href;
            }
        }
    }
    if (!tileUrlTemplate && supportedMediaTypes) {
        for (var i = 0; i < supportedMediaTypes.length; ++i) {
            var supportedMediaType = supportedMediaTypes[i];
            if (hrefLookup[supportedMediaType]) {
                tileUrlTemplate = hrefLookup[supportedMediaType];
                break;
            }
        }
    }
    if (!tileUrlTemplate) {
        if (fallbackUrlTemplate) {
            tileUrlTemplate = fallbackUrlTemplate;
        }
        else {
            throw new Error('Could not find "item" link');
        }
    }
    return tileUrlTemplate;
}
/**
 * @param {SourceInfo} sourceInfo The source info.
 * @param {TileMatrixSet} tileMatrixSet Tile matrix set.
 * @param {string} tileUrlTemplate Tile URL template.
 * @param {Array<TileMatrixSetLimit>} [tileMatrixSetLimits] Tile matrix set limits.
 * @return {TileSetInfo} Tile set info.
 */
function parseTileMatrixSet(sourceInfo, tileMatrixSet, tileUrlTemplate, tileMatrixSetLimits) {
    var projection = sourceInfo.projection;
    if (!projection) {
        projection = getProjection(tileMatrixSet.crs);
        if (!projection) {
            throw new Error("Unsupported CRS: " + tileMatrixSet.crs);
        }
    }
    var backwards = projection.getAxisOrientation().substr(0, 2) !== 'en';
    var matrices = tileMatrixSet.tileMatrices;
    /**
     * @type {Object<string, TileMatrix>}
     */
    var matrixLookup = {};
    for (var i = 0; i < matrices.length; ++i) {
        var matrix = matrices[i];
        matrixLookup[matrix.id] = matrix;
    }
    /**
     * @type {Object<string, TileMatrixSetLimit>}
     */
    var limitLookup = {};
    /**
     * @type {Array<string>}
     */
    var matrixIds = [];
    if (tileMatrixSetLimits) {
        for (var i = 0; i < tileMatrixSetLimits.length; ++i) {
            var limit = tileMatrixSetLimits[i];
            var id = limit.tileMatrix;
            matrixIds.push(id);
            limitLookup[id] = limit;
        }
    }
    else {
        for (var i = 0; i < matrices.length; ++i) {
            var id = matrices[i].id;
            matrixIds.push(id);
        }
    }
    var length = matrixIds.length;
    var origins = new Array(length);
    var resolutions = new Array(length);
    var sizes = new Array(length);
    var tileSizes = new Array(length);
    var extent = [-Infinity, -Infinity, Infinity, Infinity];
    for (var i = 0; i < length; ++i) {
        var id = matrixIds[i];
        var matrix = matrixLookup[id];
        var origin_1 = matrix.pointOfOrigin;
        if (backwards) {
            origins[i] = [origin_1[1], origin_1[0]];
        }
        else {
            origins[i] = origin_1;
        }
        resolutions[i] = matrix.cellSize;
        sizes[i] = [matrix.matrixWidth, matrix.matrixHeight];
        tileSizes[i] = [matrix.tileWidth, matrix.tileHeight];
        var limit = limitLookup[id];
        if (limit) {
            var tileMapWidth = matrix.cellSize * matrix.tileWidth;
            var minX = origins[i][0] + limit.minTileCol * tileMapWidth;
            var maxX = origins[i][0] + (limit.maxTileCol + 1) * tileMapWidth;
            var tileMapHeight = matrix.cellSize * matrix.tileHeight;
            var upsideDown = matrix.cornerOfOrigin === 'bottomLeft';
            var minY = void 0;
            var maxY = void 0;
            if (upsideDown) {
                minY = origins[i][1] + limit.minTileRow * tileMapHeight;
                maxY = origins[i][1] + (limit.maxTileRow + 1) * tileMapHeight;
            }
            else {
                minY = origins[i][1] - (limit.maxTileRow + 1) * tileMapHeight;
                maxY = origins[i][1] - limit.minTileRow * tileMapHeight;
            }
            intersectExtents(extent, [minX, minY, maxX, maxY], extent);
        }
    }
    var tileGrid = new TileGrid({
        origins: origins,
        resolutions: resolutions,
        sizes: sizes,
        tileSizes: tileSizes,
        extent: tileMatrixSetLimits ? extent : undefined,
    });
    var context = sourceInfo.context;
    var base = sourceInfo.url;
    function tileUrlFunction(tileCoord, pixelRatio, projection) {
        if (!tileCoord) {
            return undefined;
        }
        var id = matrixIds[tileCoord[0]];
        var matrix = matrixLookup[id];
        var upsideDown = matrix.cornerOfOrigin === 'bottomLeft';
        var localContext = {
            tileMatrix: id,
            tileCol: tileCoord[1],
            tileRow: upsideDown ? -tileCoord[2] - 1 : tileCoord[2],
        };
        if (tileMatrixSetLimits) {
            var limit = limitLookup[matrix.id];
            if (localContext.tileCol < limit.minTileCol ||
                localContext.tileCol > limit.maxTileCol ||
                localContext.tileRow < limit.minTileRow ||
                localContext.tileRow > limit.maxTileRow) {
                return undefined;
            }
        }
        assign(localContext, context);
        var url = tileUrlTemplate.replace(/\{(\w+?)\}/g, function (m, p) {
            return localContext[p];
        });
        return resolveUrl(base, url);
    }
    return {
        grid: tileGrid,
        urlTemplate: tileUrlTemplate,
        urlFunction: tileUrlFunction,
    };
}
/**
 * @param {SourceInfo} sourceInfo The source info.
 * @param {TileSet} tileSet Tile set.
 * @return {TileSetInfo|Promise<TileSetInfo>} Tile set info.
 */
function parseTileSetMetadata(sourceInfo, tileSet) {
    var tileMatrixSetLimits = tileSet.tileMatrixSetLimits;
    var tileUrlTemplate;
    if (tileSet.dataType === 'map') {
        tileUrlTemplate = getMapTileUrlTemplate(tileSet.links, sourceInfo.mediaType);
    }
    else if (tileSet.dataType === 'vector') {
        tileUrlTemplate = getVectorTileUrlTemplate(tileSet.links, sourceInfo.mediaType, sourceInfo.supportedMediaTypes);
    }
    else {
        throw new Error('Expected tileset data type to be "map" or "vector"');
    }
    if (tileSet.tileMatrixSet) {
        return parseTileMatrixSet(sourceInfo, tileSet.tileMatrixSet, tileUrlTemplate, tileMatrixSetLimits);
    }
    var tileMatrixSetLink = tileSet.links.find(function (link) {
        return link.rel === 'http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme';
    });
    if (!tileMatrixSetLink) {
        throw new Error('Expected http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme link or tileMatrixSet');
    }
    var tileMatrixSetDefinition = tileMatrixSetLink.href;
    var url = resolveUrl(sourceInfo.url, tileMatrixSetDefinition);
    return getJSON(url).then(function (tileMatrixSet) {
        return parseTileMatrixSet(sourceInfo, tileMatrixSet, tileUrlTemplate, tileMatrixSetLimits);
    });
}
/**
 * @param {SourceInfo} sourceInfo Source info.
 * @return {Promise<TileSetInfo>} Tile set info.
 */
export function getTileSetInfo(sourceInfo) {
    return getJSON(sourceInfo.url).then(function (tileSet) {
        return parseTileSetMetadata(sourceInfo, tileSet);
    });
}
//# sourceMappingURL=ogcTileUtil.js.map