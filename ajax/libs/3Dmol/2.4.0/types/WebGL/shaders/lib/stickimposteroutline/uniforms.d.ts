import { Matrix4 } from "WebGL/math";
import { Color } from "../../../../colors";
export declare const uniforms: {
    opacity: {
        type: string;
        value: number;
    };
    fogColor: {
        type: string;
        value: Color;
    };
    fogNear: {
        type: string;
        value: number;
    };
    fogFar: {
        type: string;
        value: number;
    };
    outlineColor: {
        type: string;
        value: Color;
    };
    outlineWidth: {
        type: string;
        value: number;
    };
    outlinePushback: {
        type: string;
        value: number;
    };
    outlineMaxPixels: {
        type: string;
        value: number;
    };
    projinv: {
        type: string;
        value: Matrix4[];
    };
};
