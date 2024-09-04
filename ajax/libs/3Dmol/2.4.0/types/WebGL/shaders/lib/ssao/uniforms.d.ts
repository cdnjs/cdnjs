import { Matrix4 } from "WebGL/math";
export declare const uniforms: {
    total_strength: {
        type: string;
        value: number;
    };
    radius: {
        type: string;
        value: number;
    };
    projinv: {
        type: string;
        value: Matrix4[];
    };
};
