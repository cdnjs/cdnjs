export default BaseTileRepresentation;
export type BaseTileType = import("../Tile.js").default;
export type TileRepresentationOptions<TileType extends BaseTileType> = {
    /**
     * The tile.
     */
    tile: TileType;
    /**
     * Tile grid.
     */
    grid: import("../tilegrid/TileGrid.js").default;
    /**
     * WebGL helper.
     */
    helper: import("../webgl/Helper.js").default;
    /**
     * The size in pixels of the gutter around image tiles to ignore.
     */
    gutter?: number | undefined;
};
/**
 * @typedef {import("../Tile.js").default} BaseTileType
 */
/**
 * @template {BaseTileType} TileType
 * @typedef {Object} TileRepresentationOptions
 * @property {TileType} tile The tile.
 * @property {import("../tilegrid/TileGrid.js").default} grid Tile grid.
 * @property {import("../webgl/Helper.js").default} helper WebGL helper.
 * @property {number} [gutter=0] The size in pixels of the gutter around image tiles to ignore.
 */
/**
 * @classdesc
 * Base class for representing a tile in a webgl context
 * @template {import("../Tile.js").default} TileType
 * @abstract
 */
declare class BaseTileRepresentation<TileType extends import("../Tile.js").default> extends EventTarget {
    /**
     * @param {TileRepresentationOptions<TileType>} options The tile representation options.
     */
    constructor(options: TileRepresentationOptions<TileType>);
    /**
     * @type {TileType}
     */
    tile: TileType;
    handleTileChange_(): void;
    /**
     * @type {number}
     * @protected
     */
    protected gutter: number;
    /**
     * @type {import("../webgl/Helper.js").default}
     * @protected
     */
    protected helper: import("../webgl/Helper.js").default;
    loaded: boolean;
    ready: boolean;
    /**
     * @param {TileType} tile Tile.
     */
    setTile(tile: TileType): void;
    /**
     * @abstract
     * @protected
     */
    protected uploadTile(): void;
    setReady(): void;
    /**
     * @param {import("./Helper.js").default} helper The WebGL helper.
     */
    setHelper(helper: import("./Helper.js").default): void;
}
import EventTarget from '../events/Target.js';
//# sourceMappingURL=BaseTileRepresentation.d.ts.map