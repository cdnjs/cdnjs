import type { Vector3 } from '../math';
import type { Camera } from '../Camera';
export declare class Projector {
    static unprojectVector(vector: Vector3, camera: Camera): Vector3;
    static projectVector(vector: Vector3, camera: Camera): Vector3;
    projectVector(vector: Vector3, camera: Camera): Vector3;
    unprojectVector(vector: Vector3, camera: Camera): Vector3;
}
