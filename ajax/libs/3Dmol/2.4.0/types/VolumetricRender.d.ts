import { Sphere } from "./WebGL/shapes";
import { Vector3, XYZ } from "./WebGL/math";
import { AtomSelectionSpec } from "specs";
import { GLViewer } from "GLViewer";
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
    coords?: XYZ[];
    /** selection around which to include data */
    selection?: AtomSelectionSpec;
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
    static interpolateArray(data: string | any[], fitCount: number): any[];
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
    constructor(data: {
        matrix: {
            elements: any;
        };
        size: XYZ;
        unit: XYZ;
        origin: XYZ;
        data: number[];
        getIndex: (arg0: number, arg1: number, arg2: number) => number;
    }, spec: VolumetricRendererSpec, viewer?: GLViewer);
    /**
     * Initialize webgl objects for rendering
     * @param {Object3D} group
     *
     */
    globj(group: {
        remove: (arg0: any) => void;
        add: (arg0: any) => void;
    }): void;
    removegl(group: {
        remove: (arg0: any) => void;
    }): void;
    get position(): Vector3;
    get x(): number;
    get y(): number;
    get z(): number;
}
