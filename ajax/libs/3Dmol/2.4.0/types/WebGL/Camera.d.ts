import { Object3D } from "./core";
import { Matrix4, Vector3 } from "./math";
export declare class Camera extends Object3D {
    projectionMatrix: Matrix4;
    projectionMatrixInverse: Matrix4;
    matrixWorldInverse: Matrix4;
    right: number;
    left: number;
    top: number;
    bottom: number;
    ortho: boolean;
    fov: number;
    aspect: number;
    near: number;
    far: number;
    z: number;
    constructor(fov?: number, aspect?: number, near?: number, far?: number, ortho?: boolean);
    lookAt(vector: Vector3): void;
    updateProjectionMatrix(): void;
}
