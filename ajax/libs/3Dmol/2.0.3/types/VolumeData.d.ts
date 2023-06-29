import { Matrix4 } from "./WebGL/math";
interface VolumeDataOptions {
    negate?: boolean;
    normalize?: boolean;
}
/**
 * $3Dmol.VolumeData stores volumetric data. This includes file parsing
 * functionality.
 *
 * @class
 * @param {string} str - volumetric data
 * @param {string} format - format of supplied data (cube, dx, vasp); append .gz if compressed
 * @param {Object} options - normalize (zero mean, unit variance), negate
 */
export declare class VolumeData {
    unit: {
        x: number;
        y: number;
        z: number;
    };
    origin: {
        x: number;
        y: number;
        z: number;
    };
    size: {
        x: number;
        y: number;
        z: number;
    };
    data: Float32Array;
    matrix: any;
    inversematrix: Matrix4 | null;
    dimensionorder: any;
    isbinary: Set<string>;
    constructor(str: any, format: string, options?: VolumeDataOptions);
    /**
     * @function $3Dmol.VolumeData.getIndex
     * @param {number} x,y,z - the coordinates
     * @returns - index into flat array closest to provided coordinate; -1 if invalid
     */
    getIndex(x: number, y: number, z: number): number;
    /**
     * @function $3Dmol.VolumeData.getVal
     * @param {number} x,y,z - the coordinates
     * @returns - value closest to provided coordinate; zero if coordinate invalid
     */
    getVal(x: number, y: number, z: number): number;
    getCoordinates: (index: number) => {
        x: number;
        y: number;
        z: number;
    };
    vasp: (str: any) => void;
    dx: (str: any) => void;
    cube(str: any): void;
    ccp4(bin: any): void;
}
export {};
