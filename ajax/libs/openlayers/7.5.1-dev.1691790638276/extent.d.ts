/**
 * An array of numbers representing an extent: `[minx, miny, maxx, maxy]`.
 * @typedef {Array<number>} Extent
 * @api
 */
/**
 * Extent corner.
 * @typedef {'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'} Corner
 */
/**
 * Build an extent that includes all given coordinates.
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Bounding extent.
 * @api
 */
export function boundingExtent(coordinates: Array<import("./coordinate.js").Coordinate>): Extent;
/**
 * Return extent increased by the provided value.
 * @param {Extent} extent Extent.
 * @param {number} value The amount by which the extent should be buffered.
 * @param {Extent} [dest] Extent.
 * @return {Extent} Extent.
 * @api
 */
export function buffer(extent: Extent, value: number, dest?: Extent | undefined): Extent;
/**
 * Creates a clone of an extent.
 *
 * @param {Extent} extent Extent to clone.
 * @param {Extent} [dest] Extent.
 * @return {Extent} The clone.
 */
export function clone(extent: Extent, dest?: Extent | undefined): Extent;
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {number} Closest squared distance.
 */
export function closestSquaredDistanceXY(extent: Extent, x: number, y: number): number;
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @return {boolean} The coordinate is contained in the extent.
 * @api
 */
export function containsCoordinate(extent: Extent, coordinate: import("./coordinate.js").Coordinate): boolean;
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
export function containsExtent(extent1: Extent, extent2: Extent): boolean;
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {boolean} The x, y values are contained in the extent.
 * @api
 */
export function containsXY(extent: Extent, x: number, y: number): boolean;
/**
 * Get the relationship between a coordinate and extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} coordinate The coordinate.
 * @return {import("./extent/Relationship.js").default} The relationship (bitwise compare with
 *     import("./extent/Relationship.js").Relationship).
 */
export function coordinateRelationship(extent: Extent, coordinate: import("./coordinate.js").Coordinate): any;
/**
 * Create an empty extent.
 * @return {Extent} Empty extent.
 * @api
 */
export function createEmpty(): Extent;
/**
 * Create a new extent or update the provided extent.
 * @param {number} minX Minimum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxX Maximum X.
 * @param {number} maxY Maximum Y.
 * @param {Extent} [dest] Destination extent.
 * @return {Extent} Extent.
 */
export function createOrUpdate(minX: number, minY: number, maxX: number, maxY: number, dest?: Extent | undefined): Extent;
/**
 * Create a new empty extent or make the provided one empty.
 * @param {Extent} [dest] Extent.
 * @return {Extent} Extent.
 */
export function createOrUpdateEmpty(dest?: Extent | undefined): Extent;
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {Extent} [dest] Extent.
 * @return {Extent} Extent.
 */
export function createOrUpdateFromCoordinate(coordinate: import("./coordinate.js").Coordinate, dest?: Extent | undefined): Extent;
/**
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {Extent} [dest] Extent.
 * @return {Extent} Extent.
 */
export function createOrUpdateFromCoordinates(coordinates: Array<import("./coordinate.js").Coordinate>, dest?: Extent | undefined): Extent;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Extent} [dest] Extent.
 * @return {Extent} Extent.
 */
export function createOrUpdateFromFlatCoordinates(flatCoordinates: Array<number>, offset: number, end: number, stride: number, dest?: Extent | undefined): Extent;
/**
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @param {Extent} [dest] Extent.
 * @return {Extent} Extent.
 */
export function createOrUpdateFromRings(rings: Array<Array<import("./coordinate.js").Coordinate>>, dest?: Extent | undefined): Extent;
/**
 * Determine if two extents are equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The two extents are equivalent.
 * @api
 */
export function equals(extent1: Extent, extent2: Extent): boolean;
/**
 * Determine if two extents are approximately equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {number} tolerance Tolerance in extent coordinate units.
 * @return {boolean} The two extents differ by less than the tolerance.
 */
export function approximatelyEquals(extent1: Extent, extent2: Extent, tolerance: number): boolean;
/**
 * Modify an extent to include another extent.
 * @param {Extent} extent1 The extent to be modified.
 * @param {Extent} extent2 The extent that will be included in the first.
 * @return {Extent} A reference to the first (extended) extent.
 * @api
 */
export function extend(extent1: Extent, extent2: Extent): Extent;
/**
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 */
export function extendCoordinate(extent: Extent, coordinate: import("./coordinate.js").Coordinate): void;
/**
 * @param {Extent} extent Extent.
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Extent.
 */
export function extendCoordinates(extent: Extent, coordinates: Array<import("./coordinate.js").Coordinate>): Extent;
/**
 * @param {Extent} extent Extent.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Extent} Extent.
 */
export function extendFlatCoordinates(extent: Extent, flatCoordinates: Array<number>, offset: number, end: number, stride: number): Extent;
/**
 * @param {Extent} extent Extent.
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @return {Extent} Extent.
 */
export function extendRings(extent: Extent, rings: Array<Array<import("./coordinate.js").Coordinate>>): Extent;
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 */
export function extendXY(extent: Extent, x: number, y: number): void;
/**
 * This function calls `callback` for each corner of the extent. If the
 * callback returns a truthy value the function returns that value
 * immediately. Otherwise the function returns `false`.
 * @param {Extent} extent Extent.
 * @param {function(import("./coordinate.js").Coordinate): S} callback Callback.
 * @return {S|boolean} Value.
 * @template S
 */
export function forEachCorner<S>(extent: Extent, callback: (arg0: import("./coordinate.js").Coordinate) => S): boolean | S;
/**
 * Get the size of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Area.
 * @api
 */
export function getArea(extent: Extent): number;
/**
 * Get the bottom left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom left coordinate.
 * @api
 */
export function getBottomLeft(extent: Extent): import("./coordinate.js").Coordinate;
/**
 * Get the bottom right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom right coordinate.
 * @api
 */
export function getBottomRight(extent: Extent): import("./coordinate.js").Coordinate;
/**
 * Get the center coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Center.
 * @api
 */
export function getCenter(extent: Extent): import("./coordinate.js").Coordinate;
/**
 * Get a corner coordinate of an extent.
 * @param {Extent} extent Extent.
 * @param {Corner} corner Corner.
 * @return {import("./coordinate.js").Coordinate} Corner coordinate.
 */
export function getCorner(extent: Extent, corner: Corner): import("./coordinate.js").Coordinate;
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Enlarged area.
 */
export function getEnlargedArea(extent1: Extent, extent2: Extent): number;
/**
 * @param {import("./coordinate.js").Coordinate} center Center.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @param {import("./size.js").Size} size Size.
 * @param {Extent} [dest] Destination extent.
 * @return {Extent} Extent.
 */
export function getForViewAndSize(center: import("./coordinate.js").Coordinate, resolution: number, rotation: number, size: import("./size.js").Size, dest?: Extent | undefined): Extent;
/**
 * @param {import("./coordinate.js").Coordinate} center Center.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @param {import("./size.js").Size} size Size.
 * @return {Array<number>} Linear ring representing the viewport.
 */
export function getRotatedViewport(center: import("./coordinate.js").Coordinate, resolution: number, rotation: number, size: import("./size.js").Size): Array<number>;
/**
 * Get the height of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Height.
 * @api
 */
export function getHeight(extent: Extent): number;
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Intersection area.
 */
export function getIntersectionArea(extent1: Extent, extent2: Extent): number;
/**
 * Get the intersection of two extents.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {Extent} [dest] Optional extent to populate with intersection.
 * @return {Extent} Intersecting extent.
 * @api
 */
export function getIntersection(extent1: Extent, extent2: Extent, dest?: Extent | undefined): Extent;
/**
 * @param {Extent} extent Extent.
 * @return {number} Margin.
 */
export function getMargin(extent: Extent): number;
/**
 * Get the size (width, height) of an extent.
 * @param {Extent} extent The extent.
 * @return {import("./size.js").Size} The extent size.
 * @api
 */
export function getSize(extent: Extent): import("./size.js").Size;
/**
 * Get the top left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top left coordinate.
 * @api
 */
export function getTopLeft(extent: Extent): import("./coordinate.js").Coordinate;
/**
 * Get the top right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top right coordinate.
 * @api
 */
export function getTopRight(extent: Extent): import("./coordinate.js").Coordinate;
/**
 * Get the width of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Width.
 * @api
 */
export function getWidth(extent: Extent): number;
/**
 * Determine if one extent intersects another.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent.
 * @return {boolean} The two extents intersect.
 * @api
 */
export function intersects(extent1: Extent, extent2: Extent): boolean;
/**
 * Determine if an extent is empty.
 * @param {Extent} extent Extent.
 * @return {boolean} Is empty.
 * @api
 */
export function isEmpty(extent: Extent): boolean;
/**
 * @param {Extent} extent Extent.
 * @param {Extent} [dest] Extent.
 * @return {Extent} Extent.
 */
export function returnOrUpdate(extent: Extent, dest?: Extent | undefined): Extent;
/**
 * @param {Extent} extent Extent.
 * @param {number} value Value.
 */
export function scaleFromCenter(extent: Extent, value: number): void;
/**
 * Determine if the segment between two coordinates intersects (crosses,
 * touches, or is contained by) the provided extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} start Segment start coordinate.
 * @param {import("./coordinate.js").Coordinate} end Segment end coordinate.
 * @return {boolean} The segment intersects the extent.
 */
export function intersectsSegment(extent: Extent, start: import("./coordinate.js").Coordinate, end: import("./coordinate.js").Coordinate): boolean;
/**
 * Apply a transform function to the extent.
 * @param {Extent} extent Extent.
 * @param {import("./proj.js").TransformFunction} transformFn Transform function.
 * Called with `[minX, minY, maxX, maxY]` extent coordinates.
 * @param {Extent} [dest] Destination extent.
 * @param {number} [stops] Number of stops per side used for the transform.
 * By default only the corners are used.
 * @return {Extent} Extent.
 * @api
 */
export function applyTransform(extent: Extent, transformFn: import("./proj.js").TransformFunction, dest?: Extent | undefined, stops?: number | undefined): Extent;
/**
 * Modifies the provided extent in-place to be within the real world
 * extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./proj/Projection.js").default} projection Projection
 * @return {Extent} The extent within the real world extent.
 */
export function wrapX(extent: Extent, projection: import("./proj/Projection.js").default): Extent;
/**
 * Fits the extent to the real world
 *
 * If the extent does not cross the anti meridian, this will return the extent in an array
 * If the extent crosses the anti meridian, the extent will be sliced, so each part fits within the
 * real world
 *
 *
 * @param {Extent} extent Extent.
 * @param {import("./proj/Projection.js").default} projection Projection
 * @return {Array<Extent>} The extent within the real world extent.
 */
export function wrapAndSliceX(extent: Extent, projection: import("./proj/Projection.js").default): Array<Extent>;
/**
 * An array of numbers representing an extent: `[minx, miny, maxx, maxy]`.
 */
export type Extent = Array<number>;
/**
 * Extent corner.
 */
export type Corner = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
//# sourceMappingURL=extent.d.ts.map