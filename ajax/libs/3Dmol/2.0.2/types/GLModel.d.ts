import { Geometry } from "./WebGL";
import { Matrix3, XYZ } from "./WebGL/math";
import { Color, ColorschemeSpec, ColorSpec } from "./colors";
import { CartoonStyleSpec } from "./glcartoon";
import { Gradient } from "./Gradient";
import { AtomSelectionSpec, AtomSpec } from "./specs";
import { GLViewer } from "GLViewer";
import { ArrowSpec } from "GLShape";
import { ParserOptionsSpec } from "./parsers/ParserOptionsSpec";
import { LabelSpec } from "Label";
/**
 * GLModel represents a group of related atoms
 * @class
 */
export declare class GLModel {
    static defaultAtomStyle: AtomStyleSpec;
    static defaultlineWidth: number;
    static vdwRadii: {
        H: number;
        He: number;
        Li: number;
        Be: number;
        B: number;
        C: number;
        N: number;
        O: number;
        F: number;
        Ne: number;
        Na: number;
        Mg: number;
        Al: number;
        Si: number;
        P: number;
        S: number;
        Cl: number;
        Ar: number;
        K: number;
        Ca: number;
        Ni: number;
        Cu: number;
        Zn: number;
        Ga: number;
        Ge: number;
        As: number;
        Se: number;
        Br: number;
        Kr: number;
        Rb: number;
        Sr: number;
        Pd: number;
        Ag: number;
        Cd: number;
        In: number;
        Sn: number;
        Sb: number;
        Te: number;
        I: number;
        Xe: number;
        Cs: number;
        Ba: number;
        Pt: number;
        Au: number;
        Hg: number;
        Tl: number;
        Pb: number;
        Bi: number;
        Po: number;
        At: number;
        Rn: number;
        Fr: number;
        Ra: number;
        U: number;
    };
    static sameObj(a: any, b: any): boolean;
    unitCellObjects: any;
    private atoms;
    private frames;
    private box;
    private atomdfs;
    private id;
    private hidden;
    private molObj;
    private renderedMolObj;
    private lastColors;
    private modelData;
    private modelDatas;
    private idMatrix;
    private dontDuplicateAtoms;
    private defaultColor;
    private options;
    private ElementColors;
    private readonly defaultSphereRadius;
    private readonly defaultCartoonQuality;
    private readonly defaultStickRadius;
    constructor(mid: any, options?: any);
    /**
     *
     * @param {AtomSpec} atom
     * @param {atomstyle} style
     * @return {number}
     *
     */
    private getRadiusFromStyle;
    /**
     *
     * @param {AtomSpec} atom
     * @param {Record<number, Geometry>} geos
     */
    private drawAtomCross;
    private getGoodCross;
    private getSideBondV;
    private addLine;
    /**
     *
     * @param {AtomSpec}
     *            atom
     * @param {AtomSpec[]} atoms
     * @param {Record<number,Geometry>} geos
     */
    private drawBondLines;
    /**
     *
     * @param {AtomSpec} atom
     * @param {Geometry} geo
     */
    private drawAtomSphere;
    /** Register atom shaped click handlers */
    private drawAtomClickSphere;
    private drawAtomInstanced;
    private drawSphereImposter;
    private drawAtomImposter;
    static drawStickImposter(geo: Geometry, from: XYZ, to: XYZ, radius: number, color: Color): void;
    private drawBondSticks;
    /** param {AtomSpec[]} atoms */
    private createMolObj;
    /**
     * Return object representing internal state of
     * the model appropriate for passing to setInternalState
     *
    */
    getInternalState(): {
        atoms: AtomSpec[];
        frames: any;
    };
    /**
     * Overwrite the internal model state with the passed state.
     *
    */
    setInternalState(state: any): void;
    /**
     * Returns crystallographic information if present.
     *
     *
     */
    getCrystData(): any;
    /**
     * Set crystallographic information using three angles and three lengths
     *
     * @param {number} a - length of unit cell side
     * @param {number} b - length of unit cell side
     * @param {number} c - length of unit cell side
     * @param {number} alpha - unit cell angle in degrees (default 90)
     * @param {number} beta - unit cell angle in degrees (default 90)
     * @param {number} gamma - unit cell angle in degrees (default 90)

     */
    setCrystData(a?: number, b?: number, c?: number, alpha?: number, beta?: number, gamma?: number): void;
    /**
     * Set the crystallographic matrix to the given matrix.
     *
     * This function removes `a`, `b`, `c`, `alpha`, `beta`, `gamma` from
     * the crystal data.
     *
     * @param {Matrix3} matrix - unit cell matrix
     */
    setCrystMatrix(matrix: Matrix3): void;
    /**
     * Returns list of rotational/translational matrices if there is BIOMT data
     * Otherwise returns a list of just the ID matrix
     *
     * @return {Array<Matrix4>}
     *
     */
    getSymmetries(): any;
    /**
     * Sets symmetries based on specified matrices in list
     *
     * @param {Array<Matrix4>} list
     *
     */
    setSymmetries(list: any): void;
    /**
     * Returns model id number
     *
     * @return {number} Model ID
     */
    getID(): number;
    /**
     * Returns model's frames property, a list of atom lists
     *
     * @return {number}
     */
    getNumFrames(): any;
    private adjustCoord;
    private adjustCoordinatesToBox;
    /**
     * Sets model's atomlist to specified frame
     * Sets to last frame if framenum out of range
     *
     * @param {number} framenum - model's atoms are set to this index in frames list
     * @return {Promise}
     */
    setFrame(framenum: number, viewer?: GLViewer): Promise<void>;
    /**
     * Add atoms as frames of model
     *
     * @param {AtomSpec[]} atoms - atoms to be added
     */
    addFrame(atoms: AtomSpec[]): void;
    /**
     * If model atoms have dx, dy, dz properties (in some xyz files), vibrate populates the model's frame property based on parameters.
     * Model can then be animated
     *
     * @param {number} numFrames - number of frames to be created, default to 10
     * @param {number} amplitude - amplitude of distortion, default to 1 (full)
     * @param {boolean} bothWays - if true, extend both in positive and negative directions by numFrames
     * @param {GLViewer} viewer - required if arrowSpec is provided
     * @param {ArrowSpec} arrowSpec - specification for drawing animated arrows. If color isn't specified, atom color (sphere, stick, line preference) is used.
     *@example

      $3Dmol.download("pdb:4UAA",viewer,{},function(){
        viewer.setStyle({},{stick:{}});
        viewer.vibrate(10, 1);
        viewer.animate({loop: "forward",reps: 1});

        viewer.zoomTo();
              viewer.render();
          });
     */
    vibrate(numFrames?: number, amplitude?: number, bothWays?: boolean, viewer?: GLViewer, arrowSpec?: ArrowSpec): void;
    setAtomDefaults(atoms: AtomSpec[]): void;
    /** add atoms to this model from molecular data string
     *
     * @param {string|ArrayBuffer} data - atom structure file input data string, for gzipped input use ArrayBuffer
     * @param {string} format - input file string format (e.g 'pdb', 'sdf', 'sdf.gz', etc.)
     * @param {ParserOptionsSpec} options - format dependent options. Attributes depend on the input format
     */
    addMolData(data: string | ArrayBuffer, format: string, options?: ParserOptionsSpec): void;
    setDontDuplicateAtoms(dup: boolean): void;
    setModelData(mData: any): void;
    private propertyMatches;
    private static deepCopyAndCache;
    /** given a selection specification, return true if atom is selected.
     * Does not support context-aware selectors like expand/within/byres.
     *
     * @param {AtomSpec} atom
     * @param {AtomSelectionSpec} sel
     * @return {boolean}
     */
    atomIsSelected(atom: AtomSpec, sel?: AtomSelectionSpec): boolean;
    private static squaredDistance;
    /** returns a list of atoms in the expanded bounding box, but not in the current one
     *
     *  Bounding box:
     *
     *    [ [ xmin, ymin, zmin ],
     *      [ xmax, ymax, zmax ],
     *      [ xctr, yctr, zctr ] ]
     *
     **/
    private expandAtomList;
    private static getFloat;
    /** return list of atoms selected by sel, this is specific to glmodel
     *
     * @param {AtomSelectionSpec} sel
     * @return {Object[]}
     * @example
     $3Dmol.download("pdb:4wwy",viewer,{},function(){
              var atoms = viewer.selectedAtoms({chain:'A'});
              for(var i = 0, n = atoms.length; i < n; i++) {
                 atoms[i].b = 0.0;
              }
              viewer.setStyle({cartoon:{colorscheme:{prop:'b',gradient: 'roygb',min:0,max:30}}});
              viewer.render();
          });
     */
    selectedAtoms(sel: AtomSelectionSpec, from?: AtomSpec[]): AtomSpec[];
    /** Add list of new atoms to model.  Adjusts bonds appropriately.
     *
     * @param {AtomSpec[]} newatoms
     * @example
     * var atoms = [{elem: 'C', x: 0, y: 0, z: 0, bonds: [1,2], bondOrder: [1,2]}, {elem: 'O', x: -1.5, y: 0, z: 0, bonds: [0]},{elem: 'O', x: 1.5, y: 0, z: 0, bonds: [0], bondOrder: [2]}];

        viewer.setBackgroundColor(0xffffffff);
        var m = viewer.addModel();
        m.addAtoms(atoms);
        m.setStyle({},{stick:{}});
        viewer.zoomTo();
        viewer.render();
     */
    addAtoms(newatoms: AtomSpec[]): void;
    /** Assign bonds based on atomic coordinates.
     *  This currently uses a primitive distance-based algorithm that does not
     * consider valence constraints and will only create single bonds.
     */
    assignBonds(): void;
    /** Remove specified atoms from model
     *
     * @param {AtomSpec[]} badatoms - list of atoms
     */
    removeAtoms(badatoms: AtomSpec[]): void;
    /** Set atom style of selected atoms
     *
     * @param {AtomSelectionSpec} sel
     * @param {AtomStyleSpec} style
     * @param {boolean} add - if true, add to current style, don't replace
     @example
    $3Dmol.download("pdb:4UB9",viewer,{},function(){
              viewer.setBackgroundColor(0xffffffff);

              viewer.setStyle({chain:'A'},{line:{hidden:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.Sinebow($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
              viewer.setStyle({chain:'B'},{line:{colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.Sinebow($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
              viewer.setStyle({chain:'C'},{cross:{hidden:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.Sinebow($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
              viewer.setStyle({chain:'D'},{cross:{colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.RWB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
              viewer.setStyle({chain:'E'},{cross:{radius:2.0,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.RWB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
              viewer.setStyle({chain:'F'},{stick:{hidden:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.RWB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
              viewer.setStyle({chain:'G'},{stick:{radius:0.8,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.ROYGB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
              viewer.setStyle({chain:'H'},{stick:{singleBonds:true,colorscheme:{prop:'b',gradient: new $3Dmol.Gradient.ROYGB($3Dmol.getPropertyRange(viewer.selectedAtoms(),'b'))}}});
              viewer.render();
          });
     */
    setStyle(sel: AtomSelectionSpec | AtomStyleSpec | string, style?: AtomStyleSpec | string, add?: any): void;
    /** Set clickable and callback of selected atoms
     *
     * @param {AtomSelectionSpec} sel - atom selection to apply clickable settings to
     * @param {boolean} clickable - whether click-handling is enabled for the selection
     * @param {function} callback - function called when an atom in the selection is clicked

     */
    setClickable(sel: AtomSelectionSpec, clickable: boolean, callback: any): void;
    /** Set hoverable and callback of selected atoms
    *
    * @param {AtomSelectionSpec} sel - atom selection to apply hoverable settings to
    * @param {boolean} hoverable - whether hover-handling is enabled for the selection
    * @param {function} hover_callback - function called when an atom in the selection is hovered over
    * @param {function} unhover_callback - function called when the mouse moves out of the hover area
    */
    setHoverable(sel: AtomSelectionSpec, hoverable: boolean, hover_callback: any, unhover_callback: any): void;
    /** enable context menu of selected atoms
     *
     * @param {AtomSelectionSpec} sel - atom selection to apply hoverable settings to
     * @param {boolean} contextMenuEnabled - whether contextMenu-handling is enabled for the selection
     */
    enableContextMenu(sel: AtomSelectionSpec, contextMenuEnabled: any): void;
    /** given a mapping from element to color, set atom colors
     *
     * @param {AtomSelectionSpec} sel
     * @param {object} colors
     */
    setColorByElement(sel: AtomSelectionSpec, colors: any): void;
    /**
     * @param {AtomSelectionSpec} sel
     * @param {string} prop
     * @param {Gradient|string} scheme
     */
    setColorByProperty(sel: AtomSelectionSpec, prop: string, scheme: Gradient | string, range?: any): void;
    /**
     * @deprecated use setStyle and colorfunc attribute
     * @param {AtomSelectionSpec} sel - selection object
     * @param {function} func - function to be used to set the color
     @example
      $3Dmol.download("pdb:4UAA",viewer,{},function(){
              viewer.setBackgroundColor(0xffffffff);
              var colorAsSnake = function(atom) {
                return atom.resi % 2 ? 'white': 'green'
              };

              viewer.setStyle( {}, { cartoon: {colorfunc: colorAsSnake }});

              viewer.render();
          });

     */
    setColorByFunction(sel: AtomSelectionSpec, colorfun: any): void;
    /** Convert the model into an object in the format of a ChemDoodle JSON model.
     *
     * @param {boolean} whether or not to include style information. Defaults to false.
     * @return {Object}
     */
    toCDObject(includeStyles?: boolean): any;
    /** manage the globj for this model in the possed modelGroup - if it has to be regenerated, remove and add
     *
     * @param {Object3D} group
     * @param Object options
     */
    globj(group: any, options: any): void;
    /** return a VRML string representation of the model.  Does not include VRML header information
     * @return VRML
     */
    exportVRML(): string;
    /** Remove any renderable mol object from scene
     *
     * @param {Object3D} group
     */
    removegl(group: any): void;
    /**
     * Don't show this model in future renderings. Keep all styles and state
     * so it can be efficiencly shown again.
     *
     * * @see GLModel#show

     * @example
        $3Dmol.download("pdb:3ucr",viewer,{},function(){
        viewer.setStyle({},{stick:{}});
        viewer.getModel().hide();
        viewer.render();
        });
     */
    hide(): void;
    /**
     * Unhide a hidden model
     * @see GLModel#hide
     * @example
        $3Dmol.download("pdb:3ucr",viewer,{},function(){
        viewer.setStyle({},{stick:{}});
        viewer.getModel().hide();
        viewer.render(  )
        viewer.getModel().show()
        viewer.render();
        });
     */
    show(): void;
    /** Create labels for atoms that show the value of the passed property.
     *
     * @param {String} prop - property name
     * @param {AtomSelectionSpec} sel
     * @param {GLViewer} viewer
     * @param {LabelSpec} options
     */
    addPropertyLabels(prop: string, sel: AtomSelectionSpec, viewer: GLViewer, style: LabelSpec): void;
    /** Create labels for residues of selected atoms.
     * Will create a single label at the center of mass of all atoms
     * with the same chain,resn, and resi.
     *
     * @param {AtomSelectionSpec} sel
     * @param {GLViewer} viewer
     * @param {LabelSpec} options
     * @param {boolean} byframe - if true, create labels for every individual frame, not just current; frames must be loaded already
     */
    addResLabels(sel: AtomSelectionSpec, viewer: GLViewer, style: LabelSpec, byframe?: boolean): any[];
    private setupDFS;
    /**
    * Set coordinates from remote trajectory file.
    * @param {string} url - contains the url where mdsrv has been hosted
    * @param {string} path - contains the path of the file (<root>/filename)
    * @return {Promise}
    */
    setCoordinatesFromURL(url: string, path: string): Promise<any>;
    /**
    * Set coordinates for the atoms from provided trajectory file.
    * @param {string|ArrayBuffer} str - contains the data of the file
    * @param {string} format - contains the format of the file (mdcrd, inpcrd, pdb, netcdf, or array).  Arrays should be TxNx3 where T is the number of timesteps and N the number of atoms.
      @example
         let m = viewer.addModel()  //create an empty model
         m.addAtoms([{x:0,y:0,z:0,elem:'C'},{x:2,y:0,z:0,elem:'C'}]) //provide a list of dictionaries representing the atoms
         viewer.setStyle({'sphere':{}})
         m.setCoordinates([[[0.0, 0.0, 0.0], [2.0, 0.0, 0.0]], [[0.0, 0.0, 0.0], [2.8888888359069824, 0.0, 0.0]], [[0.0, 0.0, 0.0], [3.777777671813965, 0.0, 0.0]], [[0.0, 0.0, 0.0], [4.666666507720947, 0.0, 0.0]], [[0.0, 0.0, 0.0], [5.55555534362793, 0.0, 0.0]], [[0.0, 0.0, 0.0], [6.44444465637207, 0.0, 0.0]], [[0.0, 0.0, 0.0], [7.333333492279053, 0.0, 0.0]], [[0.0, 0.0, 0.0], [8.222222328186035, 0.0, 0.0]], [[0.0, 0.0, 0.0], [9.11111068725586, 0.0, 0.0]], [[0.0, 0.0, 0.0], [10.0, 0.0, 0.0]]],'array');
         viewer.animate({loop: "forward",reps: 1});
         viewer.zoomTo();
         viewer.zoom(0.5);
         viewer.render();
    */
    setCoordinates(str: string | ArrayBuffer, format: string): any;
    /**
     * add atomSpecs to validAtomSelectionSpecs
     * @deprecated
     * @param {Array} customAtomSpecs - array of strings that can be used as atomSelectionSpecs
     * this is to prevent the 'Unknown Selector x' message on the console for the strings passed.
     * These messages are no longer generated as, in theory, typescript will catch problems at compile time.
     * In practice, there may still be issues at run-time but we don't check for them...
     *
     * What we should do is use something like https://github.com/woutervh-/typescript-is to do runtime
     * type checking, but it currently doesn't work with our types...
     */
    addAtomSpecs(customAtomSpecs: any): void;
    static parseCrd(data: any, format: string): any;
    static parseMolData(data?: any, format?: string, options?: any): any;
}
/** Atom style specification */
export interface AtomStyleSpec {
    /** draw bonds as lines */
    line?: LineStyleSpec;
    /** draw atoms as crossed lines (aka stars) */
    cross?: CrossStyleSpec;
    /** draw bonds as capped cylinders */
    stick?: StickStyleSpec;
    /** draw atoms as spheres */
    sphere?: SphereStyleSpec;
    /** draw cartoon representation of secondary structure */
    cartoon?: CartoonStyleSpec;
    /** invisible style for click handling only */
    clicksphere?: ClickSphereStyleSpec;
}
/** Line style specification
 */
export interface LineStyleSpec {
    /** do not show line */
    hidden?: boolean;
    /** *deprecated due to vanishing browser support*  */
    linewidth?: number;
    /** colorscheme to use on atoms */
    colorscheme?: ColorschemeSpec;
    /** fixed coloring, overrides colorscheme */
    color?: ColorSpec;
    /** opacity (zero to one), must be the same for all atoms in a model */
    opacity?: number;
    /** wireframe style */
    wireframe?: boolean;
}
/** Cross style specification
 */
export interface CrossStyleSpec {
    /** do not show line */
    hidden?: boolean;
    /** *deprecated due to vanishing browser support*  */
    linewidth?: number;
    /** radius of cross */
    radius?: number;
    /** scale VDW radius by specified amount */
    scale?: number;
    /** colorscheme to use on atoms */
    colorscheme?: ColorschemeSpec;
    /** fixed coloring, overrides colorscheme */
    color?: ColorSpec;
    /** opacity (zero to one), must be the same for all atoms in a model */
    opacity?: number;
}
/** Stick (cylinder) style specification
 */
export interface StickStyleSpec {
    /** do not show sticks */
    hidden?: boolean;
    /** radius of stick */
    radius?: number;
    /** draw all bonds as single bonds */
    singleBonds?: boolean;
    /** colorscheme to use on atoms */
    colorscheme?: ColorschemeSpec;
    /** fixed coloring, overrides colorscheme */
    color?: ColorSpec;
    /** opacity (zero to one), must be the same for all atoms in a model */
    opacity?: number;
    /** display nonbonded atoms as spheres */
    showNonBonded?: boolean;
}
/** Sphere (spacefill) style specification
 */
export interface SphereStyleSpec {
    /** do not show sticks */
    hidden?: boolean;
    /** fixed radius of sphere */
    radius?: number;
    /** scale VDW radius by specified amount */
    scale?: number;
    /** colorscheme to use on atoms */
    colorscheme?: ColorschemeSpec;
    /** fixed coloring, overrides colorscheme */
    color?: ColorSpec;
    /** opacity (zero to one), must be the same for all atoms in a model */
    opacity?: number;
}
/** Invisible click sphere style specification.  This lets you set
 * larger (or smaller) click targets on atoms then the default radii or
 * have clickable atoms even if they aren't being rendered visibly.
 */
export interface ClickSphereStyleSpec {
    /** do not show sticks */
    hidden?: boolean;
    /** fixed radius of sphere */
    radius?: number;
    /** scale VDW radius by specified amount */
    scale?: number;
}
/** Style for individual bond. */
export interface BondStyle {
    iswire?: boolean;
    /**  */
    singleBond?: boolean;
    /**  */
    radius?: number;
    /**  */
    color1?: ColorSpec;
    /**  */
    color2?: ColorSpec;
}
