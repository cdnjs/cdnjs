import { Sphere } from "./WebGL/shapes";
import { Vector3 } from "./WebGL/math";
/**
 * VolumetricRenderer style specification
*/
export interface VolumetricRendererSpec {
    /** list of objects containing @color, @opacity and @value properties to specify color per voxel data value */
    transferfn?: {
        color: unknown;
        opacity: unknown;
        value: unknown;
    }[];
    /** number of times to sample each voxel approximately (default 5) */
    subsamples?: number;
    /**  coordinates around which to include data; use viewer.selectedAtoms() to convert an AtomSelectionSpec to coordinates */
    coords?: Array<Vector3>;
    /** distance around coords to include data [default = 2.0] */
    seldist?: number;
}
/**
 * A GLVolumetricRender is a "shape" for representing volumetric data as a density distribution.
 *
 * @class
 *
 * @param {VolumeData} data - volumetric data
 * @param {VolumetricRenderSpec} spec - specification of volumetric render
 * @returns {$3Dmol.GLShape}
 */
export declare class GLVolumetricRender {
    static interpolateArray(data: any, fitCount: any): any[];
    hidden: boolean;
    boundingSphere: Sphere;
    shapePosition: any;
    renderedShapeObj: any;
    shapeObj: any;
    geo: any;
    subsamples: number;
    data: any;
    transferfunctionbuffer: any;
    min: number;
    max: number;
    extent: any;
    maxdepth: number;
    texmatrix: any;
    minunit: any;
    constructor(data: any, spec: any);
    /**
     * Initialize webgl objects for rendering
     * @param {Object3D} group
     *
     */
    globj(group: any): void;
    removegl(group: any): void;
    get position(): Vector3;
    get x(): number;
    get y(): number;
    get z(): number;
}
