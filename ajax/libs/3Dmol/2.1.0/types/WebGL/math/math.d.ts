import { Quaternion } from "./Quaternion";
import { Sphere } from "../shapes";
/** @class
 *  @subcategory  Math
 * */
export declare class Matrix4 {
    elements: Float32Array;
    constructor(n11: Array<number>);
    constructor(n11?: number, n12?: number, n13?: number, n14?: number, n21?: number, n22?: number, n23?: number, n24?: number, n31?: number, n32?: number, n33?: number, n34?: number, n41?: number, n42?: number, n43?: number, n44?: number);
    makeScale(x: any, y: any, z: any): void;
    set(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, n41: number, n42: number, n43: number, n44: number): this;
    identity(): this;
    copy(m: {
        elements: any;
    }): this;
    matrix3FromTopLeft(): Matrix3;
    setRotationFromEuler(v: Vector3, order?: string): this;
    setRotationFromQuaternion(q: Quaternion): this;
    multiplyMatrices(a: {
        elements: any;
    }, b: Matrix4): this;
    multiplyScalar(s: number): this;
    makeTranslation(x: any, y: any, z: any): this;
    snap(digits: number): this;
    transpose(): this;
    setPosition(v: Vector3): this;
    translate(v: Vector3): this;
    getInverse(m: Matrix4, throwOnInvertible?: boolean): this;
    isReflected(): boolean;
    scale(v: {
        x?: any;
        y?: any;
        z?: any;
    }): this;
    getMaxScaleOnAxis(): number;
    makeFrustum(left: number, right: number, bottom: number, top: number, near: number, far: number): this;
    makePerspective(fov: number, aspect: number, near: number, far: any): this;
    makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): this;
    isEqual(m: {
        elements: any;
    }): boolean;
    clone(): Matrix4;
    isIdentity(): boolean;
    isNearlyIdentity(digits: any): boolean;
    getScale(scale?: Vector3): Vector3;
    lookAt(eye: Vector3, target: Vector3, up: Vector3): this;
    compose(translation: Vector3, rotation: Quaternion, scale: Vector3): this;
}
/**
 * @interface
 */
export interface XYZ {
    /**  */
    x: number;
    /**  */
    y: number;
    /**  */
    z: number;
}
/** @class
 *  @subcategory  Math
 * */
export declare class Vector3 {
    color?: any;
    resi?: any;
    style?: any;
    smoothen?: any;
    atom?: any;
    skip?: any;
    atomid?: undefined;
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x: any, y: any, z: any): this;
    copy(v: {
        x: any;
        y: any;
        z: any;
    }): this;
    add(v: {
        x: any;
        y: any;
        z: any;
    }): this;
    addVectors(a: {
        x: any;
        y: any;
        z: any;
    }, b: {
        x: any;
        y: any;
        z: any;
    }): this;
    multiplyVectors(a: {
        x: number;
        y: number;
        z: number;
    }, b: {
        x: number;
        y: number;
        z: number;
    }): this;
    sub(v: {
        x: number;
        y: number;
        z: number;
    }): this;
    subVectors(a: {
        x: number;
        y: number;
        z: number;
    }, b: {
        x: number;
        y: number;
        z: number;
    }): this;
    multiplyScalar(s: number): this;
    divideScalar(s: number): this;
    max(s: {
        x: number;
        y: number;
        z: number;
    }): this;
    min(s: {
        x: number;
        y: number;
        z: number;
    }): this;
    distanceTo(v: any): number;
    distanceToSquared(v: {
        x: number;
        y: number;
        z: number;
    }): number;
    applyMatrix3(m: {
        elements: any;
    }): this;
    applyMatrix4(m: {
        elements: any;
    }): this;
    applyProjection(m: {
        elements: any;
    }): this;
    applyQuaternion(q: Quaternion): Vector3;
    negate(): this;
    dot(v: Vector3): number;
    length(): number;
    lengthSq(): number;
    normalize(): this;
    cross(v: Vector3): this;
    crossVectors(a: Vector3, b: Vector3): this;
    equals(b: Vector3): boolean;
    getPositionFromMatrix(m: Matrix4): this;
    setEulerFromRotationMatrix(m: Matrix4, order: string): this;
    rotateAboutVector(axis: Vector3, ang: number): this;
    setFromMatrixPosition(m: {
        elements: any;
    }): this;
    transformDirection(m: {
        elements: any;
    }): this;
    clone(): Vector3;
    unproject(camera: {
        matrixWorld: any;
        projectionMatrix: any;
    }): this;
}
export interface Matrix3 {
    elements: Float32Array;
}
/** @class
 *  @subcategory  Math
 * */
export declare class Matrix3 {
    constructor(n11?: number, n12?: number, n13?: number, n21?: number, n22?: number, n23?: number, n31?: number, n32?: number, n33?: number);
    set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number): this;
    identity(): this;
    copy(m: {
        elements: any;
    }): void;
    multiplyScalar(s: number): this;
    getInverse3(matrix: {
        elements: any;
    }): this;
    getInverse(matrix: {
        elements: any;
    }, throwOnInvertible: any): this;
    getDeterminant(): number;
    transpose(): this;
    clone(): Matrix3;
    getMatrix4(): Matrix4;
}
/** @class
 *  @subcategory  Math
 * */
export declare class Ray {
    origin: Vector3;
    direction: Vector3;
    constructor(origin?: Vector3, direction?: Vector3);
    set(origin: Vector3, direction: Vector3): this;
    copy(ray: Ray): this;
    at(t: number, optionalTarget: Vector3): Vector3;
    recast(t: any): this;
    closestPointToPoint(point: Vector3, optionalTarget: Vector3): Vector3;
    distanceToPoint(point: Vector3): number;
    isIntersectionCylinder(): void;
    isIntersectionSphere(sphere: Sphere): boolean;
    isIntersectionPlane(plane: any): boolean;
    distanceToPlane(plane: any): number;
    intersectPlane(plane: any, optionalTarget: any): Vector3;
    applyMatrix4(matrix4: any): this;
    clone(): Ray;
}
