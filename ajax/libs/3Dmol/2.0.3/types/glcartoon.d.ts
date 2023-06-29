import { ColorSpec } from "./colors";
/**
 * A visualization of protein or nucleic acid secondary structure.  Applying this to other molecules will not show anything.
  In nucleic acids, the base cylinders obtain their color from the  atom to which the cylinder is drawn, which is 'N1' for purines (resn: 'A', 'G', 'DA', 'DG') and
  'N3' for pyrimidines (resn: 'C', 'U', 'DC', 'DT').
  The different nucleobases can therefore be distinguished as by setting the colors
  of each of these atoms. The backbone color is set from the 'P' atoms ('O5' for the 5' terminus).

 *
 * @example $3Dmol.download("pdb:4ZD3",viewer,{},function(){
                  viewer.setBackgroundColor(0xffffffff);
                  viewer.setViewStyle({style:"outline"});
                  viewer.setStyle({},{cartoon:{}});
                  viewer.render();
              });
 */
export interface CartoonStyleSpec {
    /** do not show  */
    hidden?: boolean;
    /** strand color, may specify as 'spectrum' which will apply reversed gradient based on residue number */
    color?: ColorSpec;
    /**  style of cartoon rendering (trace, oval, rectangle (default), parabola, edged) */
    style?: string;
    /**  whether to use constant strand width, disregarding
    *       secondary structure; use thickness to adjust radius */
    ribbon?: boolean;
    /** whether to add arrows showing beta-sheet
    *       directionality; does not apply to trace or ribbon */
    arrows?: boolean;
    /** whether to display alpha helices as simple cylinders;
    *       does not apply to trace */
    tubes?: boolean;
    /** cartoon strand thickness, default is 0.4 */
    thickness?: number;
    /** cartoon strand width, default is secondary
    *       structure-dependent; does not apply to trace or ribbon */
    width?: number;
    /** set opacity from 0-1; transparency is set per-chain
    *       with a warning outputted in the event of ambiguity */
    opacity?: number;
}
export declare function subdivide_spline(_points: any, DIV: any): any[];
export declare function drawCartoon(group: any, atomList: any, gradientrange: any, quality?: number): void;
