import type { Material } from './../materials/Material';
import { Matrix4, Quaternion, Vector3 } from "../math";
import type { Geometry } from './Geometry';
import type { Fog } from '../Fog';
import { Color, ColorConstructorArg } from "../../colors";
import { Sprite } from 'WebGL/objects';
export declare let Object3DIDCount: number;
export declare class Object3D {
    id: number;
    name: string;
    parent?: Object3D;
    children: Array<Object3D>;
    position: Vector3;
    rotation: Vector3 | number;
    matrix: Matrix4;
    matrixWorld: Matrix4;
    quaternion: Quaternion;
    eulerOrder: string;
    up: Vector3;
    scale: Vector3;
    matrixAutoUpdate: boolean;
    matrixWorldNeedsUpdate: boolean;
    rotationAutoUpdate: boolean;
    useQuaternion: boolean;
    visible: boolean;
    geometry?: Geometry;
    material?: Material;
    lookAt(vector: Vector3): void;
    add<T extends Object3D>(object: T): void;
    remove<T extends Object3D>(object: T): void;
    vrml(indent?: string): string;
    updateMatrix(): void;
    updateMatrixWorld(force?: boolean): void;
    clone(object?: Object3D): Object3D;
    setVisible(val: boolean): void;
}
export declare class Scene extends Object3D {
    fog: Fog | null;
    overrideMaterial: Material | null;
    matrixAutoUpdate: boolean;
    __objects: Object3D[];
    __lights: Light[];
    __objectsAdded: Object3D[];
    __objectsRemoved: Object3D[];
    __webglSprites: Sprite[];
    __addObject<T extends Object3D>(object: T): void;
    __removeObject<T extends Object3D>(object: T): void;
}
export declare class Light extends Object3D {
    color: Color;
    intensity: any;
    position: Vector3;
    target: Object3D;
    castShadow: boolean;
    onlyShadow: boolean;
    constructor(hex?: ColorConstructorArg, intensity?: number);
}
