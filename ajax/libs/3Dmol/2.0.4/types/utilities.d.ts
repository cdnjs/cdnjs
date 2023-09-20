import { Color } from "./colors";
import { IsoSurfaceSpec } from "GLShape";
export declare function extend(obj1: any, src1: any): any;
export declare function deepCopy(inObject: any): any;
export declare function isNumeric(obj: any): boolean;
export declare function isEmptyObject(obj: any): boolean;
export type Func = Function | string | undefined | null;
export declare function makeFunction(callback: Func): Func;
export declare function adjustVolumeStyle(style: IsoSurfaceSpec): void;
export declare function getExtent(atomlist: any, ignoreSymmetries?: any): any[][];
export declare function getPropertyRange(atomlist: any, prop: any): number[];
export declare class PausableTimer {
    ident: any;
    total_time_run: number;
    start_time: number;
    countdown: number;
    fn: any;
    arg: any;
    constructor(fn: any, countdown: any, arg?: any);
    cancel(): void;
    pause(): void;
    resume(): void;
}
export declare function base64ToArray(base64: any): Uint8Array;
export declare function getAtomProperty(atom: any, prop: any): any;
export declare function mergeGeos(geometry: any, mesh: any): void;
export declare function specStringToObject(str: any): any;
/**
 * Fetch data from URL
 *
 * @param uri URL
 * @param callback Function to call with data
 */
export declare function get(uri: any, callback?: any): Promise<any>;
/**
 * Download binary data (e.g. a gzipped file) into an array buffer and provide
 * arraybuffer to callback.
 * @param {string} uri - location of data
 * @param {Function} [callback] - Function to call with arraybuffer as argument.
 * @param {string} [request] - type of request
 * @param {string} [postdata] - data for POST request
 * @return {Promise}
 */
export declare function getbin(uri: any, callback?: any, request?: any, postdata?: any): any;
/**
 * Load a PDB/PubChem structure into existing viewer. Automatically calls 'zoomTo' and 'render' on viewer after loading model
 * @param {string} query - String specifying pdb or pubchem id; must be prefaced with "pdb: " or "cid: ", respectively
 * @param {GLViewer} viewer - Add new model to existing viewer
 * @param {Object} options - Specify additional options
 *                           format: file format to download, if multiple are available, default format is pdb
 *                           pdbUri: URI to retrieve PDB files, default URI is http://www.rcsb.org/pdb/files/
 * @param {Function} [callback] - Function to call with model as argument after data is loaded.
  
 * @return {GLModel} GLModel, Promise if callback is not provided
 * @example
 viewer.setBackgroundColor(0xffffffff);
       $3Dmol.download('pdb:2nbd',viewer,{onemol: true,multimodel: true},function(m) {
        m.setStyle({'cartoon':{colorscheme:{prop:'ss',map:$3Dmol.ssColors.Jmol}}});
       viewer.zoomTo();
       viewer.render(callback);
    });
 */
export declare function download(query: any, viewer: any, options: any, callback?: any): any;
export declare function getColorFromStyle(atom: any, style: any): Color;
export declare function getElement(element: any): HTMLElement | null;
