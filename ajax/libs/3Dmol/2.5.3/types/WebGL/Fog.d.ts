import { Color, ColorConstructorArg } from '../colors';
export declare class Fog {
    name: string;
    color: Color;
    near: number;
    far: number;
    constructor(hex?: ColorConstructorArg, near?: number, far?: number);
    clone(): Fog;
}
