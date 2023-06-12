import { AtomStyleSpec, BondStyle, GLModel } from "./GLModel";
import { GLViewer } from "./GLViewer";
import { ColorSpec } from "./colors";
/**
 * Atom representation. Depending on the input file format, not all fields may be defined.
 */
export interface AtomSpec {
    /** Parent residue name */
    resn?: string;
    /**  Atom's x coordinate  */
    x?: number;
    /**  Atom's y coordinate  */
    y?: number;
    /**  Atom's z coordinate  */
    z?: number;
    /**  Atom's color, as hex code or built-in color string */
    color?: ColorSpec;
    /**  Hex code for color to be used for surface patch over this atom */
    surfaceColor?: ColorSpec;
    /**  Element abbreviation (e.g. 'H', 'Ca', etc) */
    elem?: string;
    /**  Set to true if atom is a heteroatom */
    hetflag?: boolean;
    /**  Chain this atom belongs to, if specified in input file (e.g 'A' for chain A) */
    chain?: string;
    /**  Residue number */
    resi?: number;
    icode?: number;
    rescode?: number;
    /** Atom's serial id number */
    serial?: number;
    /** Index of atom in molecule */
    index?: number;
    /** Atom name; may be more specific than 'elem' (e.g 'CA' for alpha carbon) */
    atom?: string;
    /** Array of atom ids this atom is bonded to */
    bonds?: number[];
    /** Secondary structure identifier (for cartoon render; e.g. 'h' for helix) */
    ss?: string;
    /** true if this atom forms only single bonds or no bonds at all */
    singleBonds?: boolean;
    /** Array of this atom's bond orders, corresponding to bonds identfied by 'bonds' */
    bondOrder?: number[];
    /** Optional mapping of additional properties */
    properties?: Record<string, any>;
    /** Atom b factor data */
    b?: number;
    /** If applicable, this atom's record entry from the input PDB file (used to output new PDB from models) */
    pdbline?: string;
    /** Set this flag to true to enable click selection handling for this atom */
    clickable?: boolean;
    /** Callback click handler function to be executed on this atom and its parent viewer */
    callback?: (atom: AtomSpec, viewer: GLViewer) => void;
    /** Set this flag to true to enable hover selection handling for this atom */
    hoverable?: boolean;
    /** Callback hover handler function to be executed on this atom and its parent viewer */
    hover_callback?: (atom: AtomSpec, viewer: GLViewer) => void;
    /** Callback handling "unhover" to be executed on this atom and its parent viewer */
    unhover_callback?: (atom: AtomSpec, viewer: GLViewer) => void;
    /** for selection, inverts the meaning of the selection */
    invert?: boolean;
    /** style of atom */
    style?: AtomStyleSpec;
    /** custom bond styling by position in bonds */
    bondStyles?: BondStyle[];
    intersectionShape?: any;
    capDrawn?: boolean;
    model?: number;
    contextMenuEnabled?: boolean;
}
/**
 * Atom selection object. Used to specify what atoms should be selected.  Can include
 * any field from {@link AtomSpec} in which case atoms must equal the specified value.
 * All fields must match for the selection to hold. If values
 * are provided as a list, then only one value of the list must match.
 * @extends AtomSpec
 * @example
 * $3Dmol.download("pdb:2EJ0",viewer,{},function(){
 *  viewer.setStyle({chain:'B'},{cartoon:{color:'spectrum'}});
 *  viewer.setStyle({chain:'B',invert:true},{cartoon:{}});
 *  viewer.setStyle({bonds: 0},{sphere:{radius:0.5}}); //water molecules
 *  viewer.setStyle({resn:'PMP',byres:true,expand:5},{stick:{colorscheme:"greenCarbon"}});
 *  viewer.setStyle({resi:["91-95","42-50"]},{cartoon:{color:"green",thickness:1.0}});
 *  viewer.render();
 * });
 */
export interface AtomSelectionSpec extends Omit<AtomSpec, "bonds" | "model" | "index"> {
    /** a single model or list of models from which atoms should be selected.  Can also specify by numerical creation order.  Reverse indexing is allowed (-1 specifies last added model). */
    model?: GLModel | number | GLModel[] | number[];
    /** index of the atom or atoms to select */
    index?: number | number[];
    /** overloaded to select number of bonds, e.g. {bonds: 0} will select all nonbonded atoms */
    bonds?: number;
    /** user supplied function that gets passed an {@link AtomSpec} and should return true if the atom should be selected */
    predicate?: (atom: AtomSpec) => boolean;
    /** if set, inverts the meaning of the selection */
    invert?: boolean;
    /** if set, expands the selection to include all atoms of any residue that has any atom selected */
    byres?: boolean;
    /** expands the selection to include all atoms within a given distance from the selection */
    expand?: number | string;
    /** intersects the selection with the set of atoms within a given distance from another selection */
    within?: WithinSelectionSpec;
    /** take the intersection of the provided lists of {@link AtomSelectionSpec}s */
    and?: AtomSelectionSpec[] & {
        __cached_results?: any;
    };
    /** take the union of the provided lists of {@link AtomSelectionSpec}s */
    or?: AtomSelectionSpec[] & {
        __cached_results?: any;
    };
    /** take the inverse of the provided {@link AtomSelectionSpec} */
    not?: AtomSelectionSpec;
    contextMenuEnabled?: boolean;
}
/**
 * Within selection object. Used to find the subset of an atom selection that is within
 * some distance from another atom selection. When added as a field of an {@link AtomSelectionSpec},
 * intersects the set of atoms in that selection with the set of atoms within a given
 * distance from the given {@link AtomSelectionSpec}.
 * @example
 * $3Dmol.download("pdb:2EJ0",viewer,{},function(){
 *  viewer.setStyle({chain: 'A', within:{distance: 10, sel:{chain: 'B'}}}, {sphere:{}});
 *  viewer.render();
 * });// stylizes atoms in chain A that are within 10 angstroms of an atom in chain B
 *
 */
export interface WithinSelectionSpec {
    /** the distance in angstroms away from the atom selection to include atoms in the parent selection */
    distance?: number;
    /** if set, selects atoms not within distance range for intersection */
    invert?: boolean;
    /** the selection of atoms against which to measure the distance from the parent atom selection */
    sel?: AtomSelectionSpec;
}
