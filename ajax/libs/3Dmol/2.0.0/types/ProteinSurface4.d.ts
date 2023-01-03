/**
 * Surface types
 * @readonly
 * @enum {number}
 * @property VDW - van der Waals surface
 * @property MS - Molecular surface
 * @property SAS - Solvent accessible surface
 * @property SES - Solvent exposed surface
 */
export declare enum SurfaceType {
    VDW = 1,
    MS = 2,
    SAS = 3,
    SES = 4
}
/**
 * Render surface synchronously if true
 * @param {boolean} [$3Dmol.SyncSurface=false]
 * @type {boolean} */
export declare var syncSurface: boolean;
export declare function setSyncSurface(val: boolean): void;
export declare class MarchingCubeInitializer {
    ISDONE: number;
    constructor();
    march(data: any, verts: any, faces: any, spec: any): void;
    laplacianSmooth(numiter: any, verts: any, faces: any): void;
    edgeTable: Uint32Array;
    triTable: number[][];
    edgeTable2: number[];
    triTable2: number[][];
}
export declare let MarchingCube: MarchingCubeInitializer;
export declare class PointGrid {
    data: Int32Array;
    width: number;
    height: number;
    constructor(length: any, width: any, height: any);
    set(x: number, y: number, z: number, pt: any): void;
    get(x: number, y: number, z: number): {
        ix: number;
        iy: number;
        iz: number;
    };
}
export declare class ProteinSurface {
    readonly INOUT = 1;
    readonly ISDONE = 2;
    readonly ISBOUND = 4;
    ptranx: number;
    ptrany: number;
    ptranz: number;
    probeRadius: number;
    defaultScaleFactor: number;
    scaleFactor: number;
    pHeight: number;
    pWidth: number;
    pLength: number;
    cutRadius: number;
    vpBits: any;
    vpDistance: any;
    vpAtomID: any;
    pminx: number;
    pminy: number;
    pminz: number;
    pmaxx: number;
    pmaxy: number;
    pmaxz: number;
    depty: {};
    widxz: {};
    faces: number[];
    verts: any[];
    readonly vdwRadii: {
        H: number;
        Li: number;
        Na: number;
        K: number;
        C: number;
        N: number;
        O: number;
        F: number;
        P: number;
        S: number;
        CL: number;
        BR: number;
        SE: number;
        ZN: number;
        CU: number;
        NI: number;
        X: number;
    };
    private getVDWIndex;
    readonly nb: Int32Array[];
    getFacesAndVertices(atomlist: any[]): {
        vertices: any[];
        faces: any[];
    };
    initparm(extent: number[][], btype: any, volume: any): void;
    boundingatom(btype: any): void;
    fillvoxels(atoms: any, atomlist: any): void;
    fillAtom(atom: any, atoms: any): void;
    fillvoxelswaals(atoms: any, atomlist: any): void;
    fillAtomWaals(atom: any, atoms: any): void;
    buildboundary(): void;
    fastdistancemap(): void;
    fastoneshell(inarray: any, boundPoint: any): any[];
    marchingcubeinit(stype: any): void;
    marchingcube(stype: any): void;
}
