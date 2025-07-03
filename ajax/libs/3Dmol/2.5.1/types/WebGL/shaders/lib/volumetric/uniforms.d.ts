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
    data: {
        type: string;
        value: number;
    };
    colormap: {
        type: string;
        value: number;
    };
    depthmap: {
        type: string;
        value: number;
    };
    step: {
        type: string;
        value: number;
    };
    maxdepth: {
        type: string;
        value: number;
    };
    subsamples: {
        type: string;
        value: number;
    };
    textmat: {
        type: string;
        value: Matrix4[];
    };
    projinv: {
        type: string;
        value: Matrix4[];
    };
    transfermin: {
        type: string;
        value: number;
    };
    transfermax: {
        type: string;
        value: number;
    };
};
