import type { Matrix4 } from '../math';
import { Vector3 } from '../math';
/** @class
 *  @subcategory  Math
 * */
export declare class Cylinder {
    c1: Vector3;
    c2: Vector3;
    direction: Vector3;
    radius: number;
    constructor(c1?: Vector3, c2?: Vector3, radius?: number);
    copy(cylinder: Cylinder): Cylinder;
    lengthSq(): number;
    applyMatrix4(matrix: Matrix4): Cylinder;
}
