/**
 * An array of numbers representing an extent: `[minx, miny, maxx, maxy]`.
 * @typedef {Array<number>} Extent
 * @api
 */
/**
 * Build an extent that includes all given coordinates.
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Bounding extent.
 * @api
 */
export function boundingExtent(coordinates: number[][]): number[];
/**
 * Return extent increased by the provided value.
 * @param {Extent} extent Extent.
 * @param {number} value The amount by which the extent should be buffered.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 * @api
 */
export function buffer(extent: number[], value: number, opt_extent?: number[] | undefined): number[];
/**
 * Creates a clone of an extent.
 *
 * @param {Extent} extent Extent to clone.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} The clone.
 */
export function clone(extent: number[], opt_extent?: number[] | undefined): number[];
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {number} Closest squared distance.
 */
export function closestSquaredDistanceXY(extent: number[], x: number, y: number): number;
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @return {boolean} The coordinate is contained in the extent.
 * @api
 */
export function containsCoordinate(extent: number[], coordinate: number[]): boolean;
/**
 * Check if one extent contains another.
 *
 * An extent is deemed contained if it lies completely within the other extent,
 * including if they share one or more edges.
 *
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The second extent is contained by or on the edge of the
 *     first.
 * @api
 */
export function containsExtent(extent1: number[], extent2: number[]): boolean;
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {boolean} The x, y values are contained in the extent.
 * @api
 */
export function containsXY(extent: number[], x: number, y: number): boolean;
/**
 * Get the relationship between a coordinate and extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} coordinate The coordinate.
 * @return {import("./extent/Relationship.js").default} The relationship (bitwise compare with
 *     import("./extent/Relationship.js").Relationship).
 */
export function coordinateRelationship(extent: number[], coordinate: number[]): any;
/**
 * Create an empty extent.
 * @return {Extent} Empty extent.
 * @api
 */
export function createEmpty(): number[];
/**
 * Create a new extent or update the provided extent.
 * @param {number} minX Minimum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxX Maximum X.
 * @param {number} maxY Maximum Y.
 * @param {Extent} [opt_extent] Destination extent.
 * @return {Extent} Extent.
 */
export function createOrUpdate(minX: number, minY: number, maxX: number, maxY: number, opt_extent?: number[] | undefined): number[];
/**
 * Create a new empty extent or make the provided one empty.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */
export function createOrUpdateEmpty(opt_extent?: number[] | undefined): number[];
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */
export function createOrUpdateFromCoordinate(coordinate: number[], opt_extent?: number[] | undefined): number[];
/**
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */
export function createOrUpdateFromCoordinates(coordinates: number[][], opt_extent?: number[] | undefined): number[];
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */
export function createOrUpdateFromFlatCoordinates(flatCoordinates: number[], offset: number, end: number, stride: number, opt_extent?: number[] | undefined): number[];
/**
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */
export function createOrUpdateFromRings(rings: number[][][], opt_extent?: number[] | undefined): number[];
/**
 * Determine if two extents are equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The two extents are equivalent.
 * @api
 */
export function equals(extent1: number[], extent2: number[]): boolean;
/**
 * Determine if two extents are approximately equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {number} tolerance Tolerance in extent coordinate units.
 * @return {boolean} The two extents differ by less than the tolerance.
 */
export function approximatelyEquals(extent1: number[], extent2: number[], tolerance: number): boolean;
/**
 * Modify an extent to include another extent.
 * @param {Extent} extent1 The extent to be modified.
 * @param {Extent} extent2 The extent that will be included in the first.
 * @return {Extent} A reference to the first (extended) extent.
 * @api
 */
export function extend(extent1: number[], extent2: number[]): number[];
/**
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 */
export function extendCoordinate(extent: number[], coordinate: number[]): void;
/**
 * @param {Extent} extent Extent.
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Extent.
 */
export function extendCoordinates(extent: number[], coordinates: number[][]): number[];
/**
 * @param {Extent} extent Extent.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Extent} Extent.
 */
export function extendFlatCoordinates(extent: number[], flatCoordinates: number[], offset: number, end: number, stride: number): number[];
/**
 * @param {Extent} extent Extent.
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @return {Extent} Extent.
 */
export function extendRings(extent: number[], rings: number[][][]): number[];
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 */
export function extendXY(extent: number[], x: number, y: number): void;
/**
 * This function calls `callback` for each corner of the extent. If the
 * callback returns a truthy value the function returns that value
 * immediately. Otherwise the function returns `false`.
 * @param {Extent} extent Extent.
 * @param {function(import("./coordinate.js").Coordinate): S} callback Callback.
 * @return {S|boolean} Value.
 * @template S
 */
export function forEachCorner<S>(extent: number[], callback: (arg0: number[]) => S): boolean | S;
/**
 * Get the size of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Area.
 * @api
 */
export function getArea(extent: number[]): number;
/**
 * Get the bottom left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom left coordinate.
 * @api
 */
export function getBottomLeft(extent: number[]): number[];
/**
 * Get the bottom right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom right coordinate.
 * @api
 */
export function getBottomRight(extent: number[]): number[];
/**
 * Get the center coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Center.
 * @api
 */
export function getCenter(extent: number[]): number[];
/**
 * Get a corner coordinate of an extent.
 * @param {Extent} extent Extent.
 * @param {import("./extent/Corner.js").default} corner Corner.
 * @return {import("./coordinate.js").Coordinate} Corner coordinate.
 */
export function getCorner(extent: number[], corner: any): number[];
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Enlarged area.
 */
export function getEnlargedArea(extent1: number[], extent2: number[]): number;
/**
 * @param {import("./coordinate.js").Coordinate} center Center.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @param {import("./size.js").Size} size Size.
 * @param {Extent} [opt_extent] Destination extent.
 * @return {Extent} Extent.
 */
export function getForViewAndSize(center: number[], resolution: number, rotation: number, size: number[], opt_extent?: number[] | undefined): number[];
/**
 * Get the height of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Height.
 * @api
 */
export function getHeight(extent: number[]): number;
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Intersection area.
 */
export function getIntersectionArea(extent1: number[], extent2: number[]): number;
/**
 * Get the intersection of two extents.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {Extent} [opt_extent] Optional extent to populate with intersection.
 * @return {Extent} Intersecting extent.
 * @api
 */
export function getIntersection(extent1: number[], extent2: number[], opt_extent?: number[] | undefined): number[];
/**
 * @param {Extent} extent Extent.
 * @return {number} Margin.
 */
export function getMargin(extent: number[]): number;
/**
 * Get the size (width, height) of an extent.
 * @param {Extent} extent The extent.
 * @return {import("./size.js").Size} The extent size.
 * @api
 */
export function getSize(extent: number[]): number[];
/**
 * Get the top left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top left coordinate.
 * @api
 */
export function getTopLeft(extent: number[]): number[];
/**
 * Get the top right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top right coordinate.
 * @api
 */
export function getTopRight(extent: number[]): number[];
/**
 * Get the width of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Width.
 * @api
 */
export function getWidth(extent: number[]): number;
/**
 * Determine if one extent intersects another.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent.
 * @return {boolean} The two extents intersect.
 * @api
 */
export function intersects(extent1: number[], extent2: number[]): boolean;
/**
 * Determine if an extent is empty.
 * @param {Extent} extent Extent.
 * @return {boolean} Is empty.
 * @api
 */
export function isEmpty(extent: number[]): boolean;
/**
 * @param {Extent} extent Extent.
 * @param {Extent} [opt_extent] Extent.
 * @return {Extent} Extent.
 */
export function returnOrUpdate(extent: number[], opt_extent?: number[] | undefined): number[];
/**
 * @param {Extent} extent Extent.
 * @param {number} value Value.
 */
export function scaleFromCenter(extent: number[], value: number): void;
/**
 * Determine if the segment between two coordinates intersects (crosses,
 * touches, or is contained by) the provided extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} start Segment start coordinate.
 * @param {import("./coordinate.js").Coordinate} end Segment end coordinate.
 * @return {boolean} The segment intersects the extent.
 */
export function intersectsSegment(extent: number[], start: number[], end: number[]): boolean;
/**
 * Apply a transform function to the extent.
 * @param {Extent} extent Extent.
 * @param {import("./proj.js").TransformFunction} transformFn Transform function.
 * Called with `[minX, minY, maxX, maxY]` extent coordinates.
 * @param {Extent} [opt_extent] Destination extent.
 * @param {number} [opt_stops] Number of stops per side used for the transform.
 * By default only the corners are used.
 * @return {Extent} Extent.
 * @api
 */
export function applyTransform(extent: number[], transformFn: (arg0: number[], arg1?: number[] | undefined, arg2?: number | undefined) => number[], opt_extent?: number[] | undefined, opt_stops?: number | undefined): number[];
/**
 * Modifies the provided extent in-place to be within the real world
 * extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./proj/Projection.js").default} projection Projection
 * @return {Extent} The extent within the real world extent.
 */
export function wrapX(extent: number[], projection: import("./proj/Projection.js").default): number[];
/**
 * An array of numbers representing an extent: `[minx, miny, maxx, maxy]`.
 */
export type Extent = number[];
//# sourceMappingURL=extent.d.ts.map