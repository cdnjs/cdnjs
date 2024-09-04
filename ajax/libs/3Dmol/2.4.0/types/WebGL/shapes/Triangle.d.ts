import type { Matrix4 } from "../math";
import { Vector3 } from "../math";
/**   plane specified by three points

 *  @class
 *  @subcategory  Math
 *
 *
 */
export declare class Triangle {
    a: Vector3;
    b: Vector3;
    c: Vector3;
    constructor(a?: Vector3, b?: Vector3, c?: Vector3);
    copy(triangle: Triangle): Triangle;
    applyMatrix4(matrix: Matrix4): Triangle;
    getNormal(): Vector3;
}
