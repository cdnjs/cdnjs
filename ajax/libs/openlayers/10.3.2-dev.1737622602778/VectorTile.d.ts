export default VectorTile;
/**
 * @template {import('./Feature.js').FeatureLike} FeatureType
 */
declare class VectorTile<FeatureType extends import("./Feature.js").FeatureLike> extends Tile {
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("./TileState.js").default} state State.
     * @param {string} src Data source url.
     * @param {import("./format/Feature.js").default<FeatureType>} format Feature format.
     * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @param {import("./Tile.js").Options} [options] Tile options.
     */
    constructor(tileCoord: import("./tilecoord.js").TileCoord, state: any, src: string, format: import("./format/Feature.js").default<FeatureType>, tileLoadFunction: import("./Tile.js").LoadFunction, options?: import("./Tile.js").Options);
    /**
     * Extent of this tile; set by the source.
     * @type {import("./extent.js").Extent}
     */
    extent: import("./extent.js").Extent;
    /**
     * @private
     * @type {import("./format/Feature.js").default<FeatureType>}
     */
    private format_;
    /**
     * @private
     * @type {Array<FeatureType>}
     */
    private features_;
    /**
     * @private
     * @type {import("./featureloader.js").FeatureLoader<FeatureType>}
     */
    private loader_;
    /**
     * Feature projection of this tile; set by the source.
     * @type {import("./proj/Projection.js").default}
     */
    projection: import("./proj/Projection.js").default;
    /**
     * Resolution of this tile; set by the source.
     * @type {number}
     */
    resolution: number;
    /**
     * @private
     * @type {import("./Tile.js").LoadFunction}
     */
    private tileLoadFunction_;
    /**
     * @private
     * @type {string}
     */
    private url_;
    /**
     * @return {string} Tile url.
     */
    getTileUrl(): string;
    /**
     * Get the feature format assigned for reading this tile's features.
     * @return {import("./format/Feature.js").default<FeatureType>} Feature format.
     * @api
     */
    getFormat(): import("./format/Feature.js").default<FeatureType>;
    /**
     * Get the features for this tile. Geometries will be in the view projection.
     * @return {Array<FeatureType>} Features.
     * @api
     */
    getFeatures(): Array<FeatureType>;
    /**
     * Handler for successful tile load.
     * @param {Array<FeatureType>} features The loaded features.
     * @param {import("./proj/Projection.js").default} dataProjection Data projection.
     */
    onLoad(features: Array<FeatureType>, dataProjection: import("./proj/Projection.js").default): void;
    /**
     * Handler for tile load errors.
     */
    onError(): void;
    /**
     * Function for use in a {@link module:ol/source/VectorTile~VectorTile}'s `tileLoadFunction`.
     * Sets the features for the tile.
     * @param {Array<FeatureType>} features Features.
     * @api
     */
    setFeatures(features: Array<FeatureType>): void;
    /**
     * Set the feature loader for reading this tile's features.
     * @param {import("./featureloader.js").FeatureLoader<FeatureType>} loader Feature loader.
     * @api
     */
    setLoader(loader: import("./featureloader.js").FeatureLoader<FeatureType>): void;
}
import Tile from './Tile.js';
//# sourceMappingURL=VectorTile.d.ts.map