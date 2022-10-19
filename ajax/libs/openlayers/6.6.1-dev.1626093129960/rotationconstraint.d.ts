/**
 * @typedef {function((number|undefined), boolean=): (number|undefined)} Type
 */
/**
 * @param {number|undefined} rotation Rotation.
 * @return {number|undefined} Rotation.
 */
export function disable(rotation: number): number;
/**
 * @param {number|undefined} rotation Rotation.
 * @return {number|undefined} Rotation.
 */
export function none(rotation: number): number;
/**
 * @param {number} n N.
 * @return {Type} Rotation constraint.
 */
export function createSnapToN(n: number): (arg0: number, arg1?: boolean) => number;
/**
 * @param {number} [opt_tolerance] Tolerance.
 * @return {Type} Rotation constraint.
 */
export function createSnapToZero(opt_tolerance?: number): (arg0: number, arg1?: boolean) => number;
export type Type = (arg0: number, arg1?: boolean) => number;
//# sourceMappingURL=rotationconstraint.d.ts.map