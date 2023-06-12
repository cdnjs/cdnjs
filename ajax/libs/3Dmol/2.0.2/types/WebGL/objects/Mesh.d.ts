import type { Material } from "../materials";
import type { Geometry } from "../core";
import { Object3D } from "../core";
export declare class Mesh extends Object3D {
    geometry: Geometry;
    material: Material;
    constructor(geometry: Geometry, material: Material);
    clone(object: Mesh): Mesh;
}
