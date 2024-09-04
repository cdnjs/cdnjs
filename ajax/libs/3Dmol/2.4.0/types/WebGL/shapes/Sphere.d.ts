import { Matrix4 } from '../math';
import { Vector3, XYZ } from '../math';
/** @class
 *  @subcategory  Math
 * */
export declare class Sphere {
    center: Vector3;
    radius: number;
    box?: any;
    constructor(center?: XYZ, radius?: number);
    set(center: Vector3, radius: number): Sphere;
    copy(sphere: Sphere): Sphere;
    applyMatrix4(matrix: Matrix4): Sphere;
    translate(offset: Vector3): Sphere;
    equals(sphere: Sphere): boolean;
    clone(): Sphere;
}
