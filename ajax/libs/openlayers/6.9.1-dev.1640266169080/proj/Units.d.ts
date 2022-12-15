/**
 * @param {number} code Unit code.
 * @return {Units} Units.
 */
export function fromCode(code: number): string;
/**
 * Meters per unit lookup table.
 * @const
 * @type {Object<Units, number>}
 * @api
 */
export const METERS_PER_UNIT: Object<Units, number>;
export default Units;
/**
 * Projection units: `'degrees'`, `'ft'`, `'m'`, `'pixels'`, `'tile-pixels'` or
 * `'us-ft'`.
 */
export type Units = string;
declare namespace Units {
    export const RADIANS: string;
    export const DEGREES: string;
    export const FEET: string;
    export const METERS: string;
    export const PIXELS: string;
    export const TILE_PIXELS: string;
    export const USFEET: string;
}
//# sourceMappingURL=Units.d.ts.map