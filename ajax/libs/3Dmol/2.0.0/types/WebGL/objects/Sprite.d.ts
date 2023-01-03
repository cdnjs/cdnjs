import { Material } from './../materials/Material';
import { Object3D } from "../core";
import { Vector3 } from '../math';
export declare class Sprite extends Object3D {
    rotation3d: Vector3;
    _modelViewMatrix: any;
    z?: number;
    material?: Material;
    constructor(material?: Material);
    updateMatrix(): void;
    clone<T extends this>(object?: Sprite): Sprite;
}
