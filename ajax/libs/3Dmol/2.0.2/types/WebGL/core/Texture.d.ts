import { EventDispatcher } from "./EventDispatcher";
export declare class Texture extends EventDispatcher {
    id: number;
    name: string;
    image: any;
    mapping: any;
    wrapS: number;
    wrapT: number;
    anisotropy: number;
    format: number;
    type: number;
    premultiplyAlpha: boolean;
    flipY: boolean;
    unpackAlignment: number;
    magFilter: number;
    minFilter: number;
    offset: any;
    repeat: any;
    needsUpdate: boolean;
    onUpdate: null;
    constructor(image?: any, is3D?: boolean);
    clone(texture?: Texture): Texture;
    dispose(): void;
}
export declare let TextureIdCount: number;
