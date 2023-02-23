/**
 * @typedef {function((number|undefined), boolean=): (number|undefined)} Type
 */
/**
 * @param {number|undefined} rotation Rotation.
 * @return {number|undefined} Rotation.
 */
export function disable(rotation: number | undefined): number | undefined;
/**
 * @param {number|undefined} rotation Rotation.
 * @return {number|undefined} Rotation.
 */
export function none(rotation: number | undefined): number | undefined;
/**
 * @param {number} n N.
 * @return {Type} Rotation constraint.
 */
export function createSnapToN(n: number): Type;
/**
 * @param {number} [tolerance] Tolerance.
 * @return {Type} Rotation constraint.
 */
export function createSnapToZero(tolerance?: number | undefined): Type;
export type Type = (arg0: (number | undefined), arg1: boolean | undefined) => (number | undefined);
//# sourceMappingURL=rotationconstraint.d.ts.map