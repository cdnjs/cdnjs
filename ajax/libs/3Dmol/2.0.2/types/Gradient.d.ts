import { Color } from "./colors";
export declare abstract class GradientType {
    gradient?: string;
    abstract valueToHex(value: number, range?: number[]): number;
    abstract range(): number[] | null;
}
export declare function normalizeValue(lo: number, hi: number, val: number): {
    lo: number;
    hi: number;
    val: number;
};
export declare function getGradient(grad: any): GradientType;
/**
 * Color scheme red to white to blue, for charges
 * Reverse gradients are supported when min>max so that the colors are displayed in reverse order.
 * @subcategory Gradients
 */
export declare class RWB extends GradientType {
    gradient: string;
    min: number;
    max: number;
    mid?: number;
    mult: number;
    constructor(min?: number | [number, number], max?: number, mid?: number);
    range(): [number, number];
    valueToHex(val: any, range: any): any;
}
/**
 * rainbow gradient, but without purple to match jmol
 * Reverse gradients are supported when min>max so that the colors are displayed in reverse order.
 * @subcategory Gradients
 */
export declare class ROYGB extends GradientType {
    gradient: string;
    mult: number;
    max: number;
    min: number;
    constructor(min: any, max: any);
    valueToHex(val: any, range: any): any;
    range(): [number, number];
}
/**
 * rainbow gradient with constant saturation, all the way to purple!
 * Reverse gradients are supported when min>max so that the colors are displayed in reverse order.
  * @subcategory Gradients
 *
 * @example $.get('data/1fas.pqr', function(data){
      viewer.addModel(data, "pqr");
      $.get("data/1fas.cube",function(volumedata){
          viewer.addSurface($3Dmol.SurfaceType.VDW, {
              opacity:0.85,
              voldata: new $3Dmol.VolumeData(volumedata, "cube"),
              volscheme: new $3Dmol.Gradient.Sinebow(2,0,1)
          },{});
          
      viewer.render();
      });
      viewer.zoomTo();
  });
 */
export declare class Sinebow extends GradientType {
    gradient: string;
    mult: number;
    max: number;
    min: number;
    constructor(min: any, max: any);
    valueToHex(val: any, range: any): number;
    range(): [number, number];
}
/**
 * Custom linear gradient using user supplied colors.
 * Reverse gradients are supported when min>max so that the colors are displayed in reverse order.
 * Midpoints are not supported - color map should be specified to get desired middle color.
 *
 * @param {number} min
 * @param {number} max
 * @param {Array} colors  Array of colors that will be linearly interpolated between from min to max values.
 * @subcategory Gradients
 *
 * @example
       $3Dmol.get('../test_structs/af.pdb', function(data){
              viewer.addModel(data);
              viewer.setStyle({cartoon:{colorscheme:{prop: 'b', gradient:'linear', min: 70, max: 100, colors: ["blue","yellow","green"]}}});
              viewer.zoomTo();
              viewer.render();
            });
 */
export declare class CustomLinear extends GradientType {
    gradient: string;
    min: number;
    max: number;
    colors: Color[];
    constructor(min: any, max: any, colors?: any);
    range(): [number, number];
    valueToHex(val: any, range: any): number;
}
export declare const builtinGradients: {
    rwb: typeof RWB;
    RWB: typeof RWB;
    roygb: typeof ROYGB;
    ROYGB: typeof ROYGB;
    sinebow: typeof Sinebow;
    linear: typeof CustomLinear;
};
export declare class Gradient extends GradientType {
    static RWB: typeof RWB;
    static ROYGB: typeof ROYGB;
    static Sinebow: typeof Sinebow;
    static CustomLinear: typeof CustomLinear;
    static builtinGradients: {
        rwb: typeof RWB;
        RWB: typeof RWB;
        roygb: typeof ROYGB;
        ROYGB: typeof ROYGB;
        sinebow: typeof Sinebow;
        linear: typeof CustomLinear;
    };
    static normalizeValue: typeof normalizeValue;
    static getGradient: typeof getGradient;
    valueToHex(_value: number, _range?: number[]): number;
    range(): [number, number] | null;
}
