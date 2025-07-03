import type { Camera } from '../Camera';
import { Ray, Matrix4, Vector3 } from "../math";
import { Sphere } from "../shapes";
export declare class Raycaster {
    ray: Ray;
    near: number;
    far: number;
    precision: number;
    linePrecision: number;
    constructor(origin: Vector3 | undefined, direction: Vector3 | undefined, far?: number, near?: number);
    set(origin: Vector3, direction: Vector3): void;
    setFromCamera(coords: {
        x: any;
        y: any;
        z: any;
    }, camera: Camera): void;
    intersectObjects(group: any, objects: string | any[]): any[];
}
export declare function intersectObject(group: {
    matrixWorld: Matrix4;
}, clickable: {
    intersectionShape: any;
    boundingSphere: Sphere | undefined;
}, raycaster: Raycaster, intersects: any[]): any[];
