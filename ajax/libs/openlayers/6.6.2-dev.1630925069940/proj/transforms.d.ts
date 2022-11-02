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
export function add(source: import("./Projection.js").default, destination: import("./Projection.js").default, transformFn: (arg0: number[], arg1?: number[] | undefined, arg2?: number | undefined) => number[]): void;
/**
 * Unregisters the conversion function to convert coordinates from the source
 * projection to the destination projection.  This method is used to clean up
 * cached transforms during testing.
 *
 * @param {import("./Projection.js").default} source Source projection.
 * @param {import("./Projection.js").default} destination Destination projection.
 * @return {import("../proj.js").TransformFunction} transformFn The unregistered transform.
 */
export function remove(source: import("./Projection.js").default, destination: import("./Projection.js").default): (arg0: number[], arg1?: number[] | undefined, arg2?: number | undefined) => number[];
/**
 * Get a transform given a source code and a destination code.
 * @param {string} sourceCode The code for the source projection.
 * @param {string} destinationCode The code for the destination projection.
 * @return {import("../proj.js").TransformFunction|undefined} The transform function (if found).
 */
export function get(sourceCode: string, destinationCode: string): ((arg0: number[], arg1?: number[] | undefined, arg2?: number | undefined) => number[]) | undefined;
//# sourceMappingURL=transforms.d.ts.map