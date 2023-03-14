/**
 * @param {boolean} [disable = true] Disable console info about `useGeographic()`
 */
export function disableCoordinateWarning(disable?: boolean | undefined): void;
/**
 * @param {Array<number>} input Input coordinate array.
 * @param {Array<number>} [output] Output array of coordinate values.
 * @param {number} [dimension] Dimension.
 * @return {Array<number>} Output coordinate array (new array, same coordinate
 *     values).
 */
export function cloneTransform(input: Array<number>, output?: number[] | undefined, dimension?: number | undefined): Array<number>;
/**
 * @param {Array<number>} input Input coordinate array.
 * @param {Array<number>} [output] Output array of coordinate values.
 * @param {number} [dimension] Dimension.
 * @return {Array<number>} Input coordinate array (same array as input).
 */
export function identityTransform(input: Array<number>, output?: number[] | undefined, dimension?: number | undefined): Array<number>;
/**
 * Add a Projection object to the list of supported projections that can be
 * looked up by their code.
 *
 * @param {Projection} projection Projection instance.
 * @api
 */
export function addProjection(projection: Projection): void;
/**
 * @param {Array<Projection>} projections Projections.
 */
export function addProjections(projections: Array<Projection>): void;
/**
 * Fetches a Projection object for the code specified.
 *
 * @param {ProjectionLike} projectionLike Either a code string which is
 *     a combination of authority and identifier such as "EPSG:4326", or an
 *     existing projection object, or undefined.
 * @return {Projection|null} Projection object, or null if not in list.
 * @api
 */
export function get(projectionLike: ProjectionLike): Projection | null;
/**
 * Get the resolution of the point in degrees or distance units.
 * For projections with degrees as the unit this will simply return the
 * provided resolution. For other projections the point resolution is
 * by default estimated by transforming the `point` pixel to EPSG:4326,
 * measuring its width and height on the normal sphere,
 * and taking the average of the width and height.
 * A custom function can be provided for a specific projection, either
 * by setting the `getPointResolution` option in the
 * {@link module:ol/proj/Projection~Projection} constructor or by using
 * {@link module:ol/proj/Projection~Projection#setGetPointResolution} to change an existing
 * projection object.
 * @param {ProjectionLike} projection The projection.
 * @param {number} resolution Nominal resolution in projection units.
 * @param {import("./coordinate.js").Coordinate} point Point to find adjusted resolution at.
 * @param {import("./proj/Units.js").Units} [units] Units to get the point resolution in.
 * Default is the projection's units.
 * @return {number} Point resolution.
 * @api
 */
export function getPointResolution(projection: ProjectionLike, resolution: number, point: import("./coordinate.js").Coordinate, units?: import("./proj/Units.js").Units | undefined): number;
/**
 * Registers transformation functions that don't alter coordinates. Those allow
 * to transform between projections with equal meaning.
 *
 * @param {Array<Projection>} projections Projections.
 * @api
 */
export function addEquivalentProjections(projections: Array<Projection>): void;
/**
 * Registers transformation functions to convert coordinates in any projection
 * in projection1 to any projection in projection2.
 *
 * @param {Array<Projection>} projections1 Projections with equal
 *     meaning.
 * @param {Array<Projection>} projections2 Projections with equal
 *     meaning.
 * @param {TransformFunction} forwardTransform Transformation from any
 *   projection in projection1 to any projection in projection2.
 * @param {TransformFunction} inverseTransform Transform from any projection
 *   in projection2 to any projection in projection1..
 */
export function addEquivalentTransforms(projections1: Array<Projection>, projections2: Array<Projection>, forwardTransform: TransformFunction, inverseTransform: TransformFunction): void;
/**
 * Clear all cached projections and transforms.
 */
export function clearAllProjections(): void;
/**
 * @param {Projection|string|undefined} projection Projection.
 * @param {string} defaultCode Default code.
 * @return {Projection} Projection.
 */
export function createProjection(projection: Projection | string | undefined, defaultCode: string): Projection;
/**
 * Creates a {@link module:ol/proj~TransformFunction} from a simple 2D coordinate transform
 * function.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} coordTransform Coordinate
 *     transform.
 * @return {TransformFunction} Transform function.
 */
export function createTransformFromCoordinateTransform(coordTransform: (arg0: import("./coordinate.js").Coordinate) => import("./coordinate.js").Coordinate): TransformFunction;
/**
 * Registers coordinate transform functions to convert coordinates between the
 * source projection and the destination projection.
 * The forward and inverse functions convert coordinate pairs; this function
 * converts these into the functions used internally which also handle
 * extents and coordinate arrays.
 *
 * @param {ProjectionLike} source Source projection.
 * @param {ProjectionLike} destination Destination projection.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} forward The forward transform
 *     function (that is, from the source projection to the destination
 *     projection) that takes a {@link module:ol/coordinate~Coordinate} as argument and returns
 *     the transformed {@link module:ol/coordinate~Coordinate}.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} inverse The inverse transform
 *     function (that is, from the destination projection to the source
 *     projection) that takes a {@link module:ol/coordinate~Coordinate} as argument and returns
 *     the transformed {@link module:ol/coordinate~Coordinate}. If the transform function can only
 *     transform less dimensions than the input coordinate, it is supposeed to return a coordinate
 *     with only the length it can transform. The other dimensions will be taken unchanged from the
 *     source.
 * @api
 */
export function addCoordinateTransforms(source: ProjectionLike, destination: ProjectionLike, forward: (arg0: import("./coordinate.js").Coordinate) => import("./coordinate.js").Coordinate, inverse: (arg0: import("./coordinate.js").Coordinate) => import("./coordinate.js").Coordinate): void;
/**
 * Transforms a coordinate from longitude/latitude to a different projection.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate as longitude and latitude, i.e.
 *     an array with longitude as 1st and latitude as 2nd element.
 * @param {ProjectionLike} [projection] Target projection. The
 *     default is Web Mercator, i.e. 'EPSG:3857'.
 * @return {import("./coordinate.js").Coordinate} Coordinate projected to the target projection.
 * @api
 */
export function fromLonLat(coordinate: import("./coordinate.js").Coordinate, projection?: ProjectionLike): import("./coordinate.js").Coordinate;
/**
 * Transforms a coordinate to longitude/latitude.
 * @param {import("./coordinate.js").Coordinate} coordinate Projected coordinate.
 * @param {ProjectionLike} [projection] Projection of the coordinate.
 *     The default is Web Mercator, i.e. 'EPSG:3857'.
 * @return {import("./coordinate.js").Coordinate} Coordinate as longitude and latitude, i.e. an array
 *     with longitude as 1st and latitude as 2nd element.
 * @api
 */
export function toLonLat(coordinate: import("./coordinate.js").Coordinate, projection?: ProjectionLike): import("./coordinate.js").Coordinate;
/**
 * Checks if two projections are the same, that is every coordinate in one
 * projection does represent the same geographic point as the same coordinate in
 * the other projection.
 *
 * @param {Projection} projection1 Projection 1.
 * @param {Projection} projection2 Projection 2.
 * @return {boolean} Equivalent.
 * @api
 */
export function equivalent(projection1: Projection, projection2: Projection): boolean;
/**
 * Searches in the list of transform functions for the function for converting
 * coordinates from the source projection to the destination projection.
 *
 * @param {Projection} sourceProjection Source Projection object.
 * @param {Projection} destinationProjection Destination Projection
 *     object.
 * @return {TransformFunction} Transform function.
 */
export function getTransformFromProjections(sourceProjection: Projection, destinationProjection: Projection): TransformFunction;
/**
 * Given the projection-like objects, searches for a transformation
 * function to convert a coordinates array from the source projection to the
 * destination projection.
 *
 * @param {ProjectionLike} source Source.
 * @param {ProjectionLike} destination Destination.
 * @return {TransformFunction} Transform function.
 * @api
 */
export function getTransform(source: ProjectionLike, destination: ProjectionLike): TransformFunction;
/**
 * Transforms a coordinate from source projection to destination projection.
 * This returns a new coordinate (and does not modify the original).
 *
 * See {@link module:ol/proj.transformExtent} for extent transformation.
 * See the transform method of {@link module:ol/geom/Geometry~Geometry} and its
 * subclasses for geometry transforms.
 *
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {ProjectionLike} source Source projection-like.
 * @param {ProjectionLike} destination Destination projection-like.
 * @return {import("./coordinate.js").Coordinate} Coordinate.
 * @api
 */
export function transform(coordinate: import("./coordinate.js").Coordinate, source: ProjectionLike, destination: ProjectionLike): import("./coordinate.js").Coordinate;
/**
 * Transforms an extent from source projection to destination projection.  This
 * returns a new extent (and does not modify the original).
 *
 * @param {import("./extent.js").Extent} extent The extent to transform.
 * @param {ProjectionLike} source Source projection-like.
 * @param {ProjectionLike} destination Destination projection-like.
 * @param {number} [stops] Number of stops per side used for the transform.
 * By default only the corners are used.
 * @return {import("./extent.js").Extent} The transformed extent.
 * @api
 */
export function transformExtent(extent: import("./extent.js").Extent, source: ProjectionLike, destination: ProjectionLike, stops?: number | undefined): import("./extent.js").Extent;
/**
 * Transforms the given point to the destination projection.
 *
 * @param {import("./coordinate.js").Coordinate} point Point.
 * @param {Projection} sourceProjection Source projection.
 * @param {Projection} destinationProjection Destination projection.
 * @return {import("./coordinate.js").Coordinate} Point.
 */
export function transformWithProjections(point: import("./coordinate.js").Coordinate, sourceProjection: Projection, destinationProjection: Projection): import("./coordinate.js").Coordinate;
/**
 * Set the projection for coordinates supplied from and returned by API methods.
 * This includes all API methods except for those interacting with tile grids.
 * @param {ProjectionLike} projection The user projection.
 * @api
 */
export function setUserProjection(projection: ProjectionLike): void;
/**
 * Clear the user projection if set.
 * @api
 */
export function clearUserProjection(): void;
/**
 * Get the projection for coordinates supplied from and returned by API methods.
 * Note that this method is not yet a part of the stable API.  Support for user
 * projections is not yet complete and should be considered experimental.
 * @return {Projection|null} The user projection (or null if not set).
 * @api
 */
export function getUserProjection(): Projection | null;
/**
 * Use geographic coordinates (WGS-84 datum) in API methods.  This includes all API
 * methods except for those interacting with tile grids.
 * @api
 */
export function useGeographic(): void;
/**
 * Return a coordinate transformed into the user projection.  If no user projection
 * is set, the original coordinate is returned.
 * @param {Array<number>} coordinate Input coordinate.
 * @param {ProjectionLike} sourceProjection The input coordinate projection.
 * @return {Array<number>} The input coordinate in the user projection.
 */
export function toUserCoordinate(coordinate: Array<number>, sourceProjection: ProjectionLike): Array<number>;
/**
 * Return a coordinate transformed from the user projection.  If no user projection
 * is set, the original coordinate is returned.
 * @param {Array<number>} coordinate Input coordinate.
 * @param {ProjectionLike} destProjection The destination projection.
 * @return {Array<number>} The input coordinate transformed.
 */
export function fromUserCoordinate(coordinate: Array<number>, destProjection: ProjectionLike): Array<number>;
/**
 * Return an extent transformed into the user projection.  If no user projection
 * is set, the original extent is returned.
 * @param {import("./extent.js").Extent} extent Input extent.
 * @param {ProjectionLike} sourceProjection The input extent projection.
 * @return {import("./extent.js").Extent} The input extent in the user projection.
 */
export function toUserExtent(extent: import("./extent.js").Extent, sourceProjection: ProjectionLike): import("./extent.js").Extent;
/**
 * Return an extent transformed from the user projection.  If no user projection
 * is set, the original extent is returned.
 * @param {import("./extent.js").Extent} extent Input extent.
 * @param {ProjectionLike} destProjection The destination projection.
 * @return {import("./extent.js").Extent} The input extent transformed.
 */
export function fromUserExtent(extent: import("./extent.js").Extent, destProjection: ProjectionLike): import("./extent.js").Extent;
/**
 * Return the resolution in user projection units per pixel. If no user projection
 * is set, or source or user projection are missing units, the original resolution
 * is returned.
 * @param {number} resolution Resolution in input projection units per pixel.
 * @param {ProjectionLike} sourceProjection The input projection.
 * @return {number} Resolution in user projection units per pixel.
 */
export function toUserResolution(resolution: number, sourceProjection: ProjectionLike): number;
/**
 * Return the resolution in user projection units per pixel. If no user projection
 * is set, or source or user projection are missing units, the original resolution
 * is returned.
 * @param {number} resolution Resolution in user projection units per pixel.
 * @param {ProjectionLike} destProjection The destination projection.
 * @return {number} Resolution in destination projection units per pixel.
 */
export function fromUserResolution(resolution: number, destProjection: ProjectionLike): number;
/**
 * Creates a safe coordinate transform function from a coordinate transform function.
 * "Safe" means that it can handle wrapping of x-coordinates for global projections,
 * and that coordinates exceeding the source projection validity extent's range will be
 * clamped to the validity range.
 * @param {Projection} sourceProj Source projection.
 * @param {Projection} destProj Destination projection.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} transform Transform function (source to destiation).
 * @return {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} Safe transform function (source to destiation).
 */
export function createSafeCoordinateTransform(sourceProj: Projection, destProj: Projection, transform: (arg0: import("./coordinate.js").Coordinate) => import("./coordinate.js").Coordinate): (arg0: import("./coordinate.js").Coordinate) => import("./coordinate.js").Coordinate;
/**
 * Add transforms to and from EPSG:4326 and EPSG:3857.  This function is called
 * by when this module is executed and should only need to be called again after
 * `clearAllProjections()` is called (e.g. in tests).
 */
export function addCommon(): void;
/**
 * A projection as {@link module :ol/proj/Projection~Projection}, SRS identifier
 * string or undefined.
 */
export type ProjectionLike = Projection | string | undefined;
/**
 * A transform function accepts an array of input coordinate values, an optional
 * output array, and an optional dimension (default should be 2).  The function
 * transforms the input coordinate values, populates the output array, and
 * returns the output array.
 */
export type TransformFunction = (arg0: Array<number>, arg1: Array<number> | undefined, arg2: number | undefined) => Array<number>;
import Projection from "./proj/Projection.js";
import { METERS_PER_UNIT } from "./proj/Units.js";
export { METERS_PER_UNIT, Projection };
//# sourceMappingURL=proj.d.ts.map