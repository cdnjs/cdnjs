import { Texture } from "../core/Texture";
import { Color } from "../../colors";
import { Vector2 } from "../math";
import { Material } from "./Material";
export declare class SpriteMaterial extends Material {
    sizeAttenuation: boolean;
    screenOffset: any;
    scaleByViewPort: boolean;
    alignment: any;
    scaleByViewport: any;
    color: Color;
    map: Texture;
    useScreenCoordinates: boolean;
    fog: boolean;
    uvOffset: Vector2;
    uvScale: Vector2;
    constructor(parameters?: any);
    clone<T extends this>(material?: T): T;
}
