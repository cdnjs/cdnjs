/**
 * @param {number} code Unit code.
 * @return {Units} Units.
 */
export function fromCode(code: number): Units;
/**
 * @typedef {Object} MetersPerUnitLookup
 * @property {number} radians Radians
 * @property {number} degrees Degrees
 * @property {number} ft  Feet
 * @property {number} m Meters
 * @property {number} us-ft US feet
 */
/**
 * Meters per unit lookup table.
 * @const
 * @type {MetersPerUnitLookup}
 * @api
 */
export const METERS_PER_UNIT: MetersPerUnitLookup;
/**
 * Projection units.
 */
export type Units = 'radians' | 'degrees' | 'ft' | 'm' | 'pixels' | 'tile-pixels' | 'us-ft';
export type MetersPerUnitLookup = {
    /**
     * Radians
     */
    radians: number;
    /**
     * Degrees
     */
    degrees: number;
    /**
     * Feet
     */
    ft: number;
    /**
     * Meters
     */
    m: number;
    /**
     * US feet
     */
    "us-ft": number;
};
//# sourceMappingURL=Units.d.ts.map