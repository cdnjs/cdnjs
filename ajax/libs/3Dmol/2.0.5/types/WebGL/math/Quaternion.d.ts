export interface Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
}
/** @class
 *  @subcategory  Math
 * */
export declare class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    set(x: number, y: number, z: number, w: number): this;
    copy(q: Quaternion): this;
    conjugate(): this;
    inverse(): this;
    length(): number;
    lengthxyz(): number;
    normalize(): this;
    multiply(q: any): this;
    multiplyScalar(s: number): this;
    multiplyQuaternions(a: Quaternion, b: Quaternion): this;
    sub(q: Quaternion): this;
    clone(): Quaternion;
    setFromEuler(e: Quaternion): this;
}
