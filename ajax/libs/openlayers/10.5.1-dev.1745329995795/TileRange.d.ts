/**
 * @param {number} minX Minimum X.
 * @param {number} maxX Maximum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxY Maximum Y.
 * @param {TileRange} [tileRange] TileRange.
 * @return {TileRange} Tile range.
 */
export function createOrUpdate(minX: number, maxX: number, minY: number, maxY: number, tileRange?: TileRange): TileRange;
export default TileRange;
/**
 * @module ol/TileRange
 */
/**
 * A representation of a contiguous block of tiles.  A tile range is specified
 * by its min/max tile coordinates and is inclusive of coordinates.
 */
declare class TileRange {
    /**
     * @param {number} minX Minimum X.
     * @param {number} maxX Maximum X.
     * @param {number} minY Minimum Y.
     * @param {number} maxY Maximum Y.
     */
    constructor(minX: number, maxX: number, minY: number, maxY: number);
    /**
     * @type {number}
     */
    minX: number;
    /**
     * @type {number}
     */
    maxX: number;
    /**
     * @type {number}
     */
    minY: number;
    /**
     * @type {number}
     */
    maxY: number;
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @return {boolean} Contains tile coordinate.
     */
    contains(tileCoord: import("./tilecoord.js").TileCoord): boolean;
    /**
     * @param {TileRange} tileRange Tile range.
     * @return {boolean} Contains.
     */
    containsTileRange(tileRange: TileRange): boolean;
    /**
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @return {boolean} Contains coordinate.
     */
    containsXY(x: number, y: number): boolean;
    /**
     * @param {TileRange} tileRange Tile range.
     * @return {boolean} Equals.
     */
    equals(tileRange: TileRange): boolean;
    /**
     * @param {TileRange} tileRange Tile range.
     */
    extend(tileRange: TileRange): void;
    /**
     * @return {number} Height.
     */
    getHeight(): number;
    /**
     * @return {import("./size.js").Size} Size.
     */
    getSize(): import("./size.js").Size;
    /**
     * @return {number} Width.
     */
    getWidth(): number;
    /**
     * @param {TileRange} tileRange Tile range.
     * @return {boolean} Intersects.
     */
    intersects(tileRange: TileRange): boolean;
}
//# sourceMappingURL=TileRange.d.ts.map