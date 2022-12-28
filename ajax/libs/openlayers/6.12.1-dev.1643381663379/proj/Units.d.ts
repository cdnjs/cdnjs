/**
 * @param {number} code Unit code.
 * @return {Units} Units.
 */
export function fromCode(code: number): Units;
/**
 * Meters per unit lookup table.
 * @const
 * @type {Object<Units, number>}
 * @api
 */
export const METERS_PER_UNIT: any;
export default Units;
/**
 * Projection units: `'degrees'`, `'ft'`, `'m'`, `'pixels'`, `'tile-pixels'` or
 * `'us-ft'`.
 */
type Units = string;
declare namespace Units {
    const RADIANS: string;
    const DEGREES: string;
    const FEET: string;
    const METERS: string;
    const PIXELS: string;
    const TILE_PIXELS: string;
    const USFEET: string;
}
//# sourceMappingURL=Units.d.ts.map