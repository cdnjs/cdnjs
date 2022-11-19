/**
 * Clear the projections cache.
 */
export function clear(): void;
/**
 * Get a cached projection by code.
 * @param {string} code The code for the projection.
 * @return {import("./Projection.js").default} The projection (if cached).
 */
export function get(code: string): import("./Projection.js").default;
/**
 * Add a projection to the cache.
 * @param {string} code The projection code.
 * @param {import("./Projection.js").default} projection The projection to cache.
 */
export function add(code: string, projection: import("./Projection.js").default): void;
//# sourceMappingURL=projections.d.ts.map