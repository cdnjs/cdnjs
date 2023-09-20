import { Material } from "../materials";
import type { Geometry } from "../core";
import { Object3D } from "../core";
export declare enum LineStyle {
    LineStrip = 0,
    LinePieces = 1
}
export declare class Line extends Object3D {
    type: any;
    geometry: Geometry;
    material: Material;
    constructor(geometry: Geometry, material?: Material, type?: LineStyle);
    clone<T extends this>(object?: T): T;
}
