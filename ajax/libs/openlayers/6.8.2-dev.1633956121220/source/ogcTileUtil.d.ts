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
export function getMapTileUrlTemplate(links: Link[], mediaType?: string | undefined): string;
/**
 * @param {Array<Link>} links Tileset links.
 * @param {string} [mediaType] The preferred media type.
 * @param {Array<string>} [supportedMediaTypes] The media types supported by the parser.
 * @return {string} The tile URL template.
 */
export function getVectorTileUrlTemplate(links: Link[], mediaType?: string | undefined, supportedMediaTypes?: string[] | undefined): string;
/**
 * @param {SourceInfo} sourceInfo Source info.
 * @return {Promise<TileSetInfo>} Tile set info.
 */
export function getTileSetInfo(sourceInfo: SourceInfo): Promise<TileSetInfo>;
export type TileSetInfo = {
    /**
     * The tile URL template.
     */
    urlTemplate: string;
    /**
     * The tile grid.
     */
    grid: TileGrid;
    /**
     * The tile URL function.
     */
    urlFunction: (arg0: number[], arg1: number, arg2: import("../proj/Projection.js").default) => string | undefined;
};
export type SourceInfo = {
    /**
     * The tile set URL.
     */
    url: string;
    /**
     * The preferred tile media type.
     */
    mediaType: string;
    /**
     * The supported media types.
     */
    supportedMediaTypes?: string[];
    /**
     * The source projection.
     */
    projection: import("../proj/Projection.js").default;
    /**
     * Optional context for constructing the URL.
     */
    context?: any;
};
export type TileType = "map" | "vector";
export type CornerOfOrigin = "topLeft" | "bottomLeft";
export type TileSet = {
    /**
     * Type of data represented in the tileset.
     */
    dataType: "map" | "vector";
    /**
     * Reference to a tile matrix set definition.
     */
    tileMatrixSetDefinition?: string;
    /**
     * Tile matrix set definition.
     */
    tileMatrixSet?: TileMatrixSet;
    /**
     * Tile matrix set limits.
     */
    tileMatrixSetLimits?: TileMatrixSetLimit[];
    /**
     * Tileset links.
     */
    links: Link[];
};
export type Link = {
    /**
     * The link rel attribute.
     */
    rel: string;
    /**
     * The link URL.
     */
    href: string;
    /**
     * The link type.
     */
    type: string;
};
export type TileMatrixSetLimit = {
    /**
     * The tile matrix id.
     */
    tileMatrix: string;
    /**
     * The minimum tile row.
     */
    minTileRow: number;
    /**
     * The maximum tile row.
     */
    maxTileRow: number;
    /**
     * The minimum tile column.
     */
    minTileCol: number;
    /**
     * The maximum tile column.
     */
    maxTileCol: number;
};
export type TileMatrixSet = {
    /**
     * The tile matrix set identifier.
     */
    id: string;
    /**
     * The coordinate reference system.
     */
    crs: string;
    /**
     * Array of tile matrices.
     */
    tileMatrices: TileMatrix[];
};
export type TileMatrix = {
    /**
     * The tile matrix identifier.
     */
    id: string;
    /**
     * The pixel resolution (map units per pixel).
     */
    cellSize: number;
    /**
     * The map location of the matrix origin.
     */
    pointOfOrigin: number[];
    /**
     * The corner of the matrix that represents the origin ('topLeft' or 'bottomLeft').
     */
    cornerOfOrigin?: "topLeft" | "bottomLeft";
    /**
     * The number of columns.
     */
    matrixWidth: number;
    /**
     * The number of rows.
     */
    matrixHeight: number;
    /**
     * The pixel width of a tile.
     */
    tileWidth: number;
    /**
     * The pixel height of a tile.
     */
    tileHeight: number;
};
import TileGrid from "../tilegrid/TileGrid.js";
//# sourceMappingURL=ogcTileUtil.d.ts.map