/**
 * @param {string} code The projection code.
 * @return {UTMZone|null} The UTM zone info (or null if not UTM).
 */
export function zoneFromCode(code: string): UTMZone | null;
/**
 * @param {string} code The projection code.
 * @return {import('./Projection.js').default|null} A projection or null if unable to create one.
 */
export function makeProjection(code: string): import("./Projection.js").default | null;
/**
 * @param {import('./Projection.js').default} projection The projection.
 * @return {import('../proj.js').Transforms|null} The transforms lookup or null if unable to handle projection.
 */
export function makeTransforms(projection: import("./Projection.js").default): import("../proj.js").Transforms | null;
export type UTMZone = {
    /**
     * The zone number (1 - 60).
     */
    number: number;
    /**
     * The northern hemisphere.
     */
    north: boolean;
};
//# sourceMappingURL=utm.d.ts.map