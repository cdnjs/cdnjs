import { GradientType } from "./Gradient";
export interface Colored {
    r: number;
    g: number;
    b: number;
    a?: number;
}
export type ColorConstructorArg = number | Color | Colored | undefined;
/**
 * @class
   *
   * @param r red 8bit number or numeric value of full color
   * @param g green 8bit number
   * @param b blue 8bit number
   */
export declare class Color implements Colored {
    r: number;
    g: number;
    b: number;
    constructor(r?: ColorConstructorArg, g?: number, b?: number);
    set<T extends Colored>(val: Color | number | T): Color;
    setHex(hex: number): Color;
    getHex(): number;
    clone(): Color;
    copy(color: Color): Color;
    scaled<T extends Colored>(): Colored;
}
export declare class CC {
    static rgbRegEx: RegExp;
    static cache: Record<number, Color>;
    static color(hex: undefined): Color;
    static color(hex: number): Color;
    static color(hex: string): Color;
    static color(hex: number[]): Color[];
    static color(hex: Color): Color;
    static color(hex: ColorSpec): Color;
    static color(hex: ColorSpec[]): Color[];
    static color(hex: ColorSpec | ColorSpec[]): Color | Color[];
    static getHex(hex: Array<string | number>): number[];
    static getHex(hex: string | number): number;
}
export declare const htmlColors: Record<string, ColorSpec>;
/**
 * Color representation. A hex number, html color name, or object with r/g/b properties
 */
export type ColorSpec = number | string | Colored;
/**
*  Colorscheme specification.
*  @see builtinColorSchemes
*/
export type ColorschemeSpec = string | {
    gradient?: GradientType | string;
    min?: number;
    max?: number;
    /**  {AtomSpec} property to use for gradient calculation.  E.g., 'b' for temperature factors of a PDB. */
    prop?: string;
    /** mid point value for gradient (for rwb) */
    mid?: number;
    /** Custom colors for gradient (for {@link CustomLinear}) */
    colors?: Array<ColorSpec>;
    /** map of a certain {@link AtomSpec} property to a color of the form `{'prop': 'elem', map:elementColors.greenCarbon}` Allows the user to provide a mapping of elements to colors to the colorscheme.  This can be done with any properties, and not just 'elem'.
   */
    map?: Record<string, unknown>;
    /**  Allows the user to provide a function for setting the colorschemes. */
    colorfunc?: Function;
};
/** Preset secondary structure color scheme
 * @struct
 */
export declare const ssColors: {
    pyMol: {
        h: number;
        s: number;
        c: number;
    };
    Jmol: {
        h: number;
        s: number;
        c: number;
    };
};
/** Preset element coloring - from individual element colors to entire mappings (e.g. 'elementColors.Jmol' colors atoms with Jmol stylings)
 * @struct
 */
export declare const elementColors: {
    defaultColor: number;
    /** Jmol-like element colors*/
    Jmol: Record<string, ColorSpec>;
    /** rasmol-like element colors */
    rasmol: Record<string, ColorSpec>;
    defaultColors: Record<string, ColorSpec>;
    greenCarbon: Record<string, ColorSpec>;
    cyanCarbon: Record<string, ColorSpec>;
    magentaCarbon: Record<string, ColorSpec>;
    yellowCarbon: Record<string, ColorSpec>;
    whiteCarbon: Record<string, ColorSpec>;
    orangeCarbon: Record<string, ColorSpec>;
    purpleCarbon: Record<string, ColorSpec>;
    blueCarbon: Record<string, ColorSpec>;
};
export declare const residues: {
    /** @property standard amino acid color scheme*/
    amino: Record<string, ColorSpec>;
    /** @property shapely amino acid color scheme*/
    shapely: Record<string, ColorSpec>;
    /** @property nucleic acid color scheme*/
    nucleic: Record<string, ColorSpec>;
};
export declare const chains: {
    /** @property chain based standard color scheme */
    atom: Record<string, ColorSpec>;
    /** @property hetatm color scheme */
    hetatm: Record<string, ColorSpec>;
};
/**
 * built in color schemes
 * The user can pass these strings directly as the colorscheme
 * @prop ssPyMol - pymol secondary structure
 * @prop  ssJmol - jmol secondary structure
   @prop Jmol - jmol element defaults
   @prop amino - amino acid coloring
   @prop shapely - amino acid coloring
   @prop nucleic - nucleic acid coloring
   @prop chain - color by chain
   @prop rasmol - rasmol default element coloring
   @prop default - default element coloring
   @prop greenCarbon - default element coloring with green carbon
   @prop cyanCarbon - default element coloring with cyan carbon
   @prop magentaCarbon - default element coloring with magenta carbon
   @prop purpleCarbon - default element coloring with purple carbon
   @prop whiteCarbon - default element coloring with white carbon
   @prop orangeCarbon - default element coloring with orange carbon
   @prop yellowCarbon - default element coloring with yellow carbon
   @prop blueCarbon - default element coloring with blue carbon
   @prop chainHetatm - color chains
 *
 * @example window.$3Dmol.download("pdb:4UAA",viewer,{},function(){
 *    viewer.setBackgroundColor(0xffffffff);
 *    var colorAsSnake = function(atom) {
 *      return atom.resi % 2 ? 'white': 'green'
 *    };
 *    viewer.setStyle( {chain:'A'}, { cartoon: {colorfunc: colorAsSnake }});
 *    viewer.setStyle( {chain:'B'}, { stick: {colorscheme: 'yellowCarbon'}});
 *    viewer.render();
 *  });
  */
export declare const builtinColorSchemes: {
    /** secondary structure pymol */
    ssPyMol: {
        prop: string;
        map: {
            h: number;
            s: number;
            c: number;
        };
    };
    ssJmol: {
        prop: string;
        map: {
            h: number;
            s: number;
            c: number;
        };
    };
    Jmol: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    amino: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    shapely: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    nucleic: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    chain: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    rasmol: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    default: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    greenCarbon: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    chainHetatm: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    cyanCarbon: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    magentaCarbon: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    purpleCarbon: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    whiteCarbon: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    orangeCarbon: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    yellowCarbon: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
    blueCarbon: {
        prop: string;
        map: Record<string, ColorSpec>;
    };
};
