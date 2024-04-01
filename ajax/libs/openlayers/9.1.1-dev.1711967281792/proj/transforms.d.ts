/**
 * Clear the transform cache.
 */
export function clear(): void;
/**
 * Registers a conversion function to convert coordinates from the source
 * projection to the destination projection.
 *
 * @param {import("./Projection.js").default} source Source.
 * @param {import("./Projection.js").default} destination Destination.
 * @param {import("../proj.js").TransformFunction} transformFn Transform.
 */
export function add(source: import("./Projection.js").default, destination: import("./Projection.js").default, transformFn: import("../proj.js").TransformFunction): void;
/**
 * Unregisters the conversion function to convert coordinates from the source
 * projection to the destination projection.  This method is used to clean up
 * cached transforms during testing.
 *
 * @param {import("./Projection.js").default} source Source projection.
 * @param {import("./Projection.js").default} destination Destination projection.
 * @return {import("../proj.js").TransformFunction} transformFn The unregistered transform.
 */
export function remove(source: import("./Projection.js").default, destination: import("./Projection.js").default): import("../proj.js").TransformFunction;
/**
 * Get a transform given a source code and a destination code.
 * @param {string} sourceCode The code for the source projection.
 * @param {string} destinationCode The code for the destination projection.
 * @return {import("../proj.js").TransformFunction|undefined} The transform function (if found).
 */
export function get(sourceCode: string, destinationCode: string): import("../proj.js").TransformFunction | undefined;
//# sourceMappingURL=transforms.d.ts.map