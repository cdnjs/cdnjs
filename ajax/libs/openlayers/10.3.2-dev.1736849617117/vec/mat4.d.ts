/**
 * @module ol/vec/mat4
 */
/** @typedef {Array<number>} Mat4 */
/**
 * @return {Mat4} "4x4 matrix representing a 3D identity transform."
 */
export function create(): Mat4;
/**
 * @param {Mat4} mat4 Flattened 4x4 matrix receiving the result.
 * @param {import("../transform.js").Transform} transform Transformation matrix.
 * @return {Mat4} "2D transformation matrix as flattened 4x4 matrix."
 */
export function fromTransform(mat4: Mat4, transform: import("../transform.js").Transform): Mat4;
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @param {Mat4} [out] mat4 frustum matrix will be written into
 * @return {Mat4} out
 */
export function orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number, out?: Mat4): Mat4;
/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {Mat4} m The matrix to scale.
 * @param {number} x How much to scale in the x direction.
 * @param {number} y How much to scale in the y direction.
 * @param {number} z How much to scale in the z direction.
 * @param {Mat4} [out] The matrix to write to.
 * @return {Mat4} out
 */
export function scale(m: Mat4, x: number, y: number, z: number, out?: Mat4): Mat4;
/**
 * Translate a matrix.
 *
 * @param {Mat4} m the matrix to translate
 * @param {number} x How much to translate in the x direction.
 * @param {number} y How much to translate in the y direction.
 * @param {number} z How much to translate in the z direction.
 * @param {Mat4} [out] the receiving matrix
 * @return {Mat4} out
 */
export function translate(m: Mat4, x: number, y: number, z: number, out?: Mat4): Mat4;
/**
 * @param {number} x x translation.
 * @param {number} y y translation.
 * @param {number} z z translation.
 * @param {Mat4} [out] optional matrix to store result
 * @return {Mat4} out
 */
export function translation(x: number, y: number, z: number, out?: Mat4): Mat4;
export type Mat4 = Array<number>;
//# sourceMappingURL=mat4.d.ts.map