import type { Camera } from "./Camera";
import { Scene } from "./core";
import { Sprite } from "./objects/Sprite";
export type Nullable<T> = T | null;
export type NullableWebGLUniformLocation = Nullable<WebGLUniformLocation>;
export type UniformsValueType = {
    uvOffset: NullableWebGLUniformLocation;
    uvScale: NullableWebGLUniformLocation;
    rotation: NullableWebGLUniformLocation;
    scale: NullableWebGLUniformLocation;
    alignment: NullableWebGLUniformLocation;
    color: NullableWebGLUniformLocation;
    map: NullableWebGLUniformLocation;
    opacity: NullableWebGLUniformLocation;
    useScreenCoordinates: NullableWebGLUniformLocation;
    screenPosition: NullableWebGLUniformLocation;
    modelViewMatrix: NullableWebGLUniformLocation;
    projectionMatrix: NullableWebGLUniformLocation;
    fogType: NullableWebGLUniformLocation;
    fogDensity: NullableWebGLUniformLocation;
    fogNear: NullableWebGLUniformLocation;
    fogFar: NullableWebGLUniformLocation;
    fogColor: NullableWebGLUniformLocation;
    alphaTest: NullableWebGLUniformLocation;
};
export type SpriteMeta = {
    vertices: Nullable<Float32Array>;
    faces: Nullable<Uint16Array>;
    vertexBuffer: Nullable<WebGLBuffer>;
    elementBuffer: Nullable<WebGLBuffer>;
    program: Nullable<WebGLProgram>;
    attributes: Record<string, number>;
    uniforms: Nullable<UniformsValueType>;
};
export declare class SpritePlugin {
    private gl?;
    private renderer;
    private precision?;
    private sprite;
    sprites?: Sprite[];
    init(renderer: any): void;
    render(scene: Scene, camera: Camera, viewportWidth: number, viewportHeight: number, inFront?: boolean): void;
    private createProgram;
}
