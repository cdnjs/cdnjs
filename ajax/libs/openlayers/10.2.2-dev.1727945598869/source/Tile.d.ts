/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Tile~TileSource} instances are instances of this
 * type.
 */
export class TileSourceEvent extends Event {
    /**
     * @param {string} type Type.
     * @param {import("../Tile.js").default} tile The tile.
     */
    constructor(type: string, tile: import("../Tile.js").default);
    /**
     * The tile related to the event.
     * @type {import("../Tile.js").default}
     * @api
     */
    tile: import("../Tile.js").default;
}
export default TileSource;
/**
 * *
 */
export type TileSourceOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<import("./TileEventType").TileSourceEventTypes, TileSourceEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | import("./TileEventType").TileSourceEventTypes, Return>;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
    /**
     * Attributions are collapsible.
     */
    attributionsCollapsible?: boolean | undefined;
    /**
     * Deprecated.  Use the cacheSize option on the layer instead.
     */
    cacheSize?: number | undefined;
    /**
     * TilePixelRatio.
     */
    tilePixelRatio?: number | undefined;
    /**
     * Projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * State.
     */
    state?: import("./Source.js").State | undefined;
    /**
     * TileGrid.
     */
    tileGrid?: import("../tilegrid.js").TileGrid | undefined;
    /**
     * WrapX.
     */
    wrapX?: boolean | undefined;
    /**
     * Transition.
     */
    transition?: number | undefined;
    /**
     * Key.
     */
    key?: string | undefined;
    /**
     * ZDirection.
     */
    zDirection?: number | import("../array.js").NearestDirectionFunction | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * the nearest neighbor is used when resampling.
     */
    interpolate?: boolean | undefined;
};
import Event from '../events/Event.js';
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./TileEventType").TileSourceEventTypes, TileSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     import("./TileEventType").TileSourceEventTypes, Return>} TileSourceOnSignature
 */
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./Source.js").State} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {boolean} [wrapX=false] WrapX.
 * @property {number} [transition] Transition.
 * @property {string} [key] Key.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing images divided into a tile grid.
 *
 * @template {import("../Tile.js").default} [TileType=import("../Tile.js").default]
 * @abstract
 * @api
 */
declare class TileSource<TileType extends import("../Tile.js").default = import("../Tile.js").default> extends Source {
    /**
     * @param {Options} options SourceTile source options.
     */
    constructor(options: Options);
    /***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */
    on: TileSourceOnSignature<import("../events").EventsKey>;
    /***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */
    once: TileSourceOnSignature<import("../events").EventsKey>;
    /***
     * @type {TileSourceOnSignature<void>}
     */
    un: TileSourceOnSignature<void>;
    /**
     * @private
     * @type {number}
     */
    private tilePixelRatio_;
    /**
     * @type {import("../tilegrid/TileGrid.js").default|null}
     * @protected
     */
    protected tileGrid: import("../tilegrid/TileGrid.js").default | null;
    /**
     * @protected
     * @type {import("../size.js").Size}
     */
    protected tmpSize: import("../size.js").Size;
    /**
     * @private
     * @type {string}
     */
    private key_;
    /**
     * @protected
     * @type {import("../Tile.js").Options}
     */
    protected tileOptions: import("../Tile.js").Options;
    /**
     * zDirection hint, read by the renderer. Indicates which resolution should be used
     * by a renderer if the views resolution does not match any resolution of the tile source.
     * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
     * will be used. If -1, the nearest higher resolution will be used.
     * @type {number|import("../array.js").NearestDirectionFunction}
     */
    zDirection: number | import("../array.js").NearestDirectionFunction;
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {number} Gutter.
     */
    getGutterForProjection(projection: import("../proj/Projection.js").default): number;
    /**
     * Return the key to be used for all tiles in the source.
     * @return {string} The key for all tiles.
     */
    getKey(): string;
    /**
     * Set the value to be used as the key for all tiles in the source.
     * @param {string} key The key for tiles.
     * @protected
     */
    protected setKey(key: string): void;
    /**
     * @abstract
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {TileType|null} Tile.
     */
    getTile(z: number, x: number, y: number, pixelRatio: number, projection: import("../proj/Projection.js").default): TileType | null;
    /**
     * Return the tile grid of the tile source.
     * @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
     * @api
     */
    getTileGrid(): import("../tilegrid/TileGrid.js").default | null;
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
     */
    getTileGridForProjection(projection: import("../proj/Projection.js").default): import("../tilegrid/TileGrid.js").default;
    /**
     * Get the tile pixel ratio for this source. Subclasses may override this
     * method, which is meant to return a supported pixel ratio that matches the
     * provided `pixelRatio` as close as possible.
     * @param {number} pixelRatio Pixel ratio.
     * @return {number} Tile pixel ratio.
     */
    getTilePixelRatio(pixelRatio: number): number;
    /**
     * @param {number} z Z.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../size.js").Size} Tile size.
     */
    getTilePixelSize(z: number, pixelRatio: number, projection: import("../proj/Projection.js").default): import("../size.js").Size;
    /**
     * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
     * is outside the resolution and extent range of the tile grid, `null` will be
     * returned.
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../proj/Projection.js").default} [projection] Projection.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
     *     null if no tile URL should be created for the passed `tileCoord`.
     */
    getTileCoordForTileUrlFunction(tileCoord: import("../tilecoord.js").TileCoord, projection?: import("../proj.js").Projection | undefined): import("../tilecoord.js").TileCoord;
    /**
     * Remove all cached reprojected tiles from the source. The next render cycle will create new tiles.
     * @api
     */
    clear(): void;
}
import Source from './Source.js';
//# sourceMappingURL=Tile.d.ts.map