import { Vector3, XYZ } from "./WebGL/math";
import { Mesh } from "./WebGL";
import { ColorSpec, ColorschemeSpec } from "./colors";
import { Gradient } from "./Gradient";
import { AtomStyleSpec, GLModel, LineStyleSpec } from "./GLModel";
import { Label, LabelSpec } from "./Label";
import { ArrowSpec, BoxSpec, CurveSpec, CustomShapeSpec, CylinderSpec, GLShape, IsoSurfaceSpec, LineSpec, ShapeSpec, SphereSpec } from "./GLShape";
import { VolumeData } from "./VolumeData";
import { SurfaceType } from "./ProteinSurface4";
import { GLVolumetricRender, VolumetricRendererSpec } from "./VolumetricRender";
import { AtomSelectionSpec, AtomSpec } from "./specs";
/**
 * WebGL-based 3Dmol.js viewer
 * Note: The preferred method of instantiating a GLViewer is through {@link createViewer}
 *
 * @class
*/
export declare class GLViewer {
    private static numWorkers;
    private static maxVolume;
    private callback;
    private defaultcolors;
    private config;
    private nomouse;
    private bgColor;
    private camerax;
    private _viewer;
    private glDOM;
    private models;
    private surfaces;
    private shapes;
    private labels;
    private clickables;
    private hoverables;
    private contextMenuEnabledAtoms;
    private current_hover;
    private hoverDuration;
    private viewer_frame;
    private WIDTH;
    private HEIGHT;
    private viewChangeCallback;
    private stateChangeCallback;
    private NEAR;
    private FAR;
    private CAMERA_Z;
    private fov;
    private linkedViewers;
    private renderer;
    private row;
    private col;
    private cols;
    private rows;
    private viewers;
    private control_all;
    private ASPECT;
    private camera;
    private lookingAt;
    private raycaster;
    private projector;
    private scene;
    private rotationGroup;
    private modelGroup;
    private fogStart;
    private slabNear;
    private slabFar;
    container: HTMLElement | null;
    static readonly surfaceTypeMap: {
        VDW: SurfaceType;
        MS: SurfaceType;
        SAS: SurfaceType;
        SES: SurfaceType;
    };
    private cq;
    private dq;
    private animated;
    private animationTimers;
    private isDragging;
    private mouseStartX;
    private mouseStartY;
    private touchDistanceStart;
    private touchHold;
    private currentModelPos;
    private cz;
    private cslabNear;
    private cslabFar;
    private mouseButton;
    private hoverTimeout;
    private divwatcher;
    private spinInterval;
    private getRect;
    private getWidth;
    private getHeight;
    private setupRenderer;
    private initializeScene;
    private initContainer;
    private decAnim;
    private incAnim;
    private nextSurfID;
    private setSlabAndFog;
    private show;
    private updateClickables;
    private handleClickSelection;
    private canvasOffset;
    private setHover;
    private handleHoverSelection;
    private handleHoverContinue;
    /**
     * Determine if a positioned event is "close enough" to mouseStart to be considered a click.
     * With a mouse, the position should be exact, but allow a slight delta for a touch interface.
     * @param {Event} event
     * @param {{ allowTolerance, tolerance: number }} options
     */
    private closeEnoughForClick;
    private calcTouchDistance;
    private getX;
    private getY;
    private isInViewer;
    private adjustZoomToLimits;
    private static slerp;
    constructor(element: any, c?: ViewerSpec);
    /**
    * Return a list of objects that intersect that at the specified viewer position.
    *
    * @param x - x position in screen coordinates
    * @param y - y position in screen coordinates
    * @param {Object[]} - list of objects or selection object specifying what object to check for targeting
    */
    targetedObjects(x: number, y: number, objects: any): any[];
    /** Convert model coordinates to screen coordinates.
     * @param {object | list} - an object or list of objects with x,y,z attributes (e.g. an atom)
     * @return {object | list} - and object or list of {x: screenX, y: screenY}
     */
    modelToScreen(coords: any): any[];
    /**
     * For a given screen (x,y) displacement return model displacement
     * @param{x} x displacement in screen coordinates
     * @param{y} y displacement in screen corodinates
     * @param{modelz} z coordinate in model coordinates to compute offset for, default is model axis
    */
    screenOffsetToModel(x: number, y: number, modelz?: any): Vector3;
    /**
     * Distance from screen coordinate to model coordinate assuming screen point
     * is projected to the same depth as model coordinate
     * @param{screen} xy screen coordinate
     * @param{model} xyz model coordinate
    */
    screenToModelDistance(screen: XYZ, model: any): number;
    /**
     * Set a callback to call when the view has potentially changed.
     *
    */
    setViewChangeCallback(callback: any): void;
    /**
     * Set a callback to call when the view has potentially changed.
     *
    */
    setStateChangeCallback(callback: any): void;
    /**
     * Return configuration of viewer
     */
    getConfig(): any;
    /**
     * Set the configuration object.  Note that some setting may only
     * have an effect at viewer creation time.
     */
    setConfig(c: any): void;
    /**
     * Return object representing internal state of
     * the viewer appropriate for passing to setInternalState
     *
    */
    getInternalState(): {
        models: any[];
        surfaces: any[];
        shapes: any[];
        labels: any[];
    };
    /**
     * Overwrite internal state of the viewer with passed  object
     * which should come from getInternalState.
     *
    */
    setInternalState(state: any): void;
    /**
     * Set lower and upper limit stops for zoom.
     *
     * @param {lower} - limit on zoom in (positive number).  Default 0.
     * @param {upper} - limit on zoom out (positive number).  Default infinite.
     * @example
      $3Dmol.get("data/set1_122_complex.mol2", function(moldata) {
            var m = viewer.addModel(moldata);
            viewer.setStyle({stick:{colorscheme:"Jmol"}});
            viewer.setZoomLimits(100,200);
            viewer.zoomTo();
            viewer.zoom(10); //will not zoom all the way
            viewer.render();
        });
    */
    setZoomLimits(lower: any, upper: any): void;
    /**
     * Set camera parameters (distance to the origin and field of view)
     *
     * @param {parameters} - new camera parameters, with possible fields
     *                       being fov for the field of view, z for the
     *                       distance to the origin, and orthographic (boolean)
     *                       for kind of projection (default false).
     * @example
      $3Dmol.get("data/set1_122_complex.mol2", function(data) {
            var m = viewer.addModel(data);
            viewer.setStyle({stick:{}});
            viewer.zoomTo();
            viewer.setCameraParameters({ fov: 10 , z: 300 });
            viewer.render();
        });
    */
    setCameraParameters(parameters: any): void;
    _handleMouseDown(ev: any): void;
    _handleMouseUp(ev: any): void;
    _handleMouseScroll(ev: any): void;
    /**
     * Return image URI of viewer contents (base64 encoded).     *
     */
    pngURI(): string;
    /**
     * Return a promise that resolves to an animated PNG image URI of
     viewer contents (base64 encoded) for nframes of viewer changes.
     * @return {Promise}
     */
    apngURI(nframes: number): Promise<unknown>;
    /**
     * Return underlying canvas element.
     */
    getCanvas(): HTMLCanvasElement;
    /**
     * Return renderer element.
     */
    getRenderer(): any;
    /**
         * Set the duration of the hover delay
         *
         * @param {number}
         *            [hoverDuration] - an optional parameter that denotes
         *            the duration of the hover delay (in milliseconds) before the hover action is called
         *
     */
    setHoverDuration(duration?: number): void;
    _handleMouseMove(ev: any): void;
    /** User specified function for handling a context menu event.
     * Handler is passed the selected object, x and y in canvas coordinates,
     * and original event.
     */
    userContextMenuHandler: Function | null;
    _handleContextMenu(ev: any): void;
    /**
     * Change the viewer's container element
     * Also useful if the original container element was removed from the DOM.
     *
     * @param {Object | string} element
     *            Either HTML element or string identifier. Defaults to the element used to initialize the viewer.

     */
    setContainer(element: any): this;
    /**
     * Set the background color (default white)
     *
     * @param {number}
     *            hex Hexcode specified background color, or standard color spec
     * @param {number}
     *            a Alpha level (default 1.0)
     *
     * @example
     *
     * viewer.setBackgroundColor(0x000000);


     *
     */
    setBackgroundColor(hex: ColorSpec, a: number): this;
    /**
     * Set view projection scheme.  Either orthographic or perspective.
     * Default is perspective.  Orthographic can also be enabled on viewer creation
     * by setting orthographic to true in the config object.
     *
     *
     * @example
     viewer.setViewStyle({style:"outline"});
          $3Dmol.get('data/1fas.pqr', function(data){
              viewer.addModel(data, "pqr");
              $3Dmol.get("data/1fas.cube",function(volumedata){
                  viewer.addSurface($3Dmol.SurfaceType.VDW, {opacity:0.85,voldata: new $3Dmol.VolumeData(volumedata, "cube"), volscheme: new $3Dmol.Gradient.RWB(-10,10)},{});
              });
              viewer.zoomTo();

              viewer.setProjection("orthographic");
              viewer.render(callback);
          });
     *
     */
    setProjection(proj: any): void;
    /**
     * Set global view styles.
     *
     * @example
     *   viewer.setViewStyle({style:"outline"});
          $3Dmol.get('data/1fas.pqr', function(data){
              viewer.addModel(data, "pqr");
              $3Dmol.get("data/1fas.cube",function(volumedata){
                  viewer.addSurface($3Dmol.SurfaceType.VDW, {opacity:0.85,voldata: new $3Dmol.VolumeData(volumedata, "cube"), volscheme: new $3Dmol.Gradient.RWB(-10,10)},{});
              });
              viewer.zoomTo();
              viewer.render(callback);
          });
     *
     */
    setViewStyle(parameters: any): this;
    private updateSize;
    /**
     * Set viewer width independently of the HTML container.  This is probably not what you want.
     *
     * @param {number} w Width in pixels
     */
    setWidth(w: number): this;
    /**
     * Set viewer height independently of the HTML container.  This is probably not what you want.
     *
     * @param {number} h Height in pixels
     */
    setHeight(h: number): this;
    /**
     * Resize viewer according to containing HTML element's dimensions
     *
     */
    resize(): this;
    /**
     * Return specified model
     *
     * @param {number}
     *            [id=last model id] - Retrieve model with specified id
     * @default Returns last model added to viewer or null if there are no models
     * @return {GLModel}
     *
     * @example // Retrieve reference to first GLModel added var m =
     *    $3Dmol.download("pdb:1UBQ",viewer,{},function(m1){
              $3Dmol.download("pdb:1UBI", viewer,{}, function(m2) {
                viewer.zoomTo();
                m1.setStyle({cartoon: {color:'green'}});
                //could use m2 here as well
                viewer.getModel().setStyle({cartoon: {color:'blue'}});
                viewer.render();
            })
          });
     */
    getModel(id?: number | GLModel): GLModel;
    /**
     * Continuously rotate a scene around the specified axis.
     *
     * Call `spin(false)` to stop spinning.
     *
     * @param  {string|boolean|Array} axis
     *            [axis] - Axis ("x", "y", "z", "vx", "vy", or "vz") to rotate around.
     *            Default "y".  View relative (rather than model relative) axes are prefixed with v.
     * @param  {number} speed
     *            [speed] - Speed multiplier for spinning the viewer. 1 is default and a negative
     *             value reverses the direction of the spin.
     *
     */
    spin(axis: any, speed?: number): void;
    private animateMotion;
    /**
     * Rotate scene by angle degrees around axis
     *
     * @param {number}
     *            [angle] - Angle, in degrees, to rotate by.
     * @param {string}
     *            [axis] - Axis ("x", "y", "z", "vx", "vy", or "vz") to rotate around.
     *            Default "y".  View relative (rather than model relative) axes are prefixed with v.
     *            Axis can also be specified as a vector.
     * @param {number}
     *            [animationDuration] - an optional parameter that denotes
     *            the duration of the rotation animation. Default 0 (no animation)
     * @param {boolean} [fixedPath] - if true animation is constrained to
     *      requested motion, overriding updates that happen during the animation         *
     * @example     $3Dmol.download('cid:4000', viewer, {}, function() {
    viewer.setStyle({stick:{}});
    viewer.zoomTo();
    viewer.rotate(90,'y',1);
    viewer.render(callback);
    });

     *
     */
    rotate(angle: number, axis?: any, animationDuration?: number, fixedPath?: boolean): this;
    surfacesFinished(): boolean;
    /** Returns an array representing the current viewpoint.
     * Translation, zoom, and rotation quaternion.
     * @returns {Array.<number>} [ pos.x, pos.y, pos.z, rotationGroup.position.z, q.x, q.y, q.z, q.w ]
     *  */
    getView(): any[];
    /** Sets the view to the specified translation, zoom, and rotation.
     *
     * @param {Array.<number>} arg Array formatted identically to the return value of getView */
    setView(arg: any, nolink?: any): this;
    /**
     * Render current state of viewer, after
     * adding/removing models, applying styles, etc.
     *
     */
    render(callback?: any, exts?: any): this;
    private getModelList;
    /**
     *
     * @param {AtomSelectionSpec}
     *            sel
     * @return {AtomSpec[]}
     */
    private getAtomsFromSel;
    /**
     *
     * @param {AtomSpec}
     *            atom
     * @param {AtomSelectionSpec}
     *            sel
     * @return {boolean}
     */
    private atomIsSelected;
    /** return list of atoms selected by sel
     *
     * @param {AtomSelectionSpec} sel
     * @return {AtomSpec[]}
     */
    selectedAtoms(sel: AtomSelectionSpec): AtomSpec[];
    /**
    * Returns valid values for the specified attribute in the given selection
    * @param {string} attribute
    * @param {AtomSelectionSpec} sel
    * @return {Array.<Object>}
    *
    */
    getUniqueValues(attribute: string, sel?: AtomSelectionSpec): string[];
    /**
     * Return pdb output of selected atoms (if atoms from pdb input)
     *
     * @param {AtomSelectionSpec} sel - Selection specification specifying model and atom properties to select.  Default: all atoms in viewer
     * @return {string} PDB string of selected atoms
     */
    pdbData(sel: AtomSelectionSpec): string;
    /**
     * Zoom current view by a constant factor
     *
     * @param {number}
     *            [factor] - Magnification factor. Values greater than 1
     *            will zoom in, less than one will zoom out. Default 2.
     * @param {number}
     *            [animationDuration] - an optional parameter that denotes
     *            the duration of a zoom animation
     * @param {Boolean} [fixedPath] - if true animation is constrained to
     *      requested motion, overriding updates that happen during the animation
     * @example
    $3Dmol.get('data/4csv.pdb', function(data) {
    viewer.addModel(data,'pdb');
    viewer.setStyle({cartoon:{},stick:{}});
    viewer.zoomTo()
    viewer.zoom(2,1000);
    viewer.render();
    });

         */
    zoom(factor?: number, animationDuration?: number, fixedPath?: boolean): this;
    /**
     * Translate current view by x,y screen coordinates
     * This pans the camera rather than translating the model.
     *
     * @param {number} x Relative change in view coordinates of camera
     * @param {number} y Relative change in view coordinates of camera
     * @param {number}
     *            [animationDuration] - an optional parameter that denotes
     *            the duration of a zoom animation
     * @param {Boolean} [fixedPath] - if true animation is constrained to
     *      requested motion, overriding updates that happen during the animation         *
     * @example     $3Dmol.get('data/4csv.pdb', function(data) {
    viewer.addModel(data,'pdb');
    viewer.setStyle({cartoon:{},stick:{}});
    viewer.zoomTo();
    viewer.translate(200,50);
    viewer.rotate(90,'z');
    viewer.render(callback);
    });
     */
    translate(x: number, y: number, animationDuration?: number, fixedPath?: boolean): this;
    /**
     * Translate current models by x,y screen coordinates
     * This translates the models relative to the current view. It does
     * not change the center of rotation.
     *
     * @param {number} x Relative change in x screen coordinate
     * @param {number} y Relative change in y screen coordinate
     * @param {number}
     *            [animationDuration] - an optional parameter that denotes
     *            the duration of a zoom animation
     * @param {Boolean} [fixedPath] - if true animation is constrained to
     *      requested motion, overriding updates that happen during the animation         *
     * @example     $3Dmol.get('data/4csv.pdb', function(data) {
    viewer.addModel(data,'pdb');
    viewer.setStyle({cartoon:{},stick:{}});
    viewer.zoomTo();
    viewer.translateScene(200,50);
    viewer.rotate(90,'z'); // will no longer be around model center
    viewer.render(callback);
    });
     */
    translateScene(x: number, y: number, animationDuration?: number, fixedPath?: boolean): this;
    /**
     * Adjust slab to fully enclose selection (default everything).
     *
     * @param {AtomSelectionSpec} sel
     *            Selection specification specifying model and atom
     *            properties to select. Default: all atoms in viewer
     */
    fitSlab(sel: AtomSelectionSpec): this;
    /**
     * Re-center the viewer around the provided selection (unlike zoomTo, does not zoom).
     *
     * @param {AtomSelectionSpec}
     *            [sel] - Selection specification specifying model and atom
     *            properties to select. Default: all atoms in viewer
     * @param {number}
     *            [animationDuration] - an optional parameter that denotes
     *            the duration of a zoom animation
     * @param {Boolean} [fixedPath] - if true animation is constrained to
     *      requested motion, overriding updates that happen during the animation         *
     * @example // if the user were to pass the animationDuration value to
     *           // the function like so viewer.zoomTo({resn:'STI'},1000);
     *         //   the program would center on resn 'STI' over the course
     *         //   of 1 second(1000 milleseconds).
     *  // Reposition to centroid of all atoms of all models in this
     * //viewer glviewer.center();
    $3Dmol.get('data/4csv.pdb', function(data) {
    viewer.addModel(data,'pdb');
    viewer.setStyle({cartoon:{},stick:{}});
    viewer.center();
    viewer.render(callback);
    });
     */
    center(sel?: AtomSelectionSpec, animationDuration?: number, fixedPath?: boolean): this;
    /**
     * Zoom to center of atom selection.  The slab will be set appropriately for
     * the selection, unless an empty selection is provided, in which case there will be no slab.
     *
     * @param {Object}
     *            [sel] - Selection specification specifying model and atom
     *            properties to select. Default: all atoms in viewer
     * @param {number}
     *            [animationDuration] - an optional parameter that denotes
     *            the duration of a zoom animation
     * @param {Boolean} [fixedPath] - if true animation is constrained to
     *      requested motion, overriding updates that happen during the animation         *
      * @example


          $3Dmol.get('data/1fas.pqr', function(data){
              viewer.addModel(data, "pqr");
              $3Dmol.get("data/1fas.cube",function(volumedata){
                  viewer.addSurface($3Dmol.SurfaceType.VDW, {
                      opacity:0.85,
                      voldata: new $3Dmol.VolumeData(volumedata, "cube"),
                      volscheme: new $3Dmol.Gradient.Sinebow($3Dmol.getPropertyRange(viewer.selectedAtoms(),'charge'))
                  },{});

              viewer.render();
              });
              viewer.zoomTo();
            });
     */
    zoomTo(sel?: AtomSelectionSpec, animationDuration?: number, fixedPath?: boolean): this;
    /**
     * Set slab of view (contents outside of slab are clipped).
     * Must call render to update.
     *
     * @param {number} near near clipping plane distance
     * @param {number} far far clipping plane distance
     */
    setSlab(near: number, far: number): void;
    /**
     * Get slab of view (contents outside of slab are clipped).
     *
     * @return {Object}
     *      @property {number} near - near clipping plane distance
     *      @property {number} far - far clipping plane distance
     */
    getSlab(): {
        near: number;
        far: number;
    };
    /**
     * Add label to viewer
     *
     * @param {string}
     *            text - Label text
     * @param {LabelSpec}
     *            options - Label style specification
      @param {AtomSelection}
     *            sel - Set position of label to center of this selection
     * @param {boolean} noshow - if true, do not immediately display label - when adding multiple labels this is more efficient
     * @return {Label}
     *
     * @example
     *  $3Dmol.download("pdb:2EJ0",viewer,{},function(){

              viewer.addLabel("Aromatic", {position: {x:-6.89, y:0.75, z:0.35}, backgroundColor: 0x800080, backgroundOpacity: 0.8});
              viewer.addLabel("Label",{font:'sans-serif',fontSize:18,fontColor:'white',fontOpacity:1,borderThickness:1.0,
                                       borderColor:'red',borderOpacity:0.5,backgroundColor:'black',backgroundOpacity:0.5,
                                       position:{x:50.0,y:0.0,z:0.0},inFront:true,showBackground:true});
              viewer.setStyle({chain:'A'},{cross:{hidden:true}});
              viewer.setStyle({chain:'B'},{cross:{hidden:false,
                                                  linewidth:1.0,
                                                  colorscheme:'greenCarbon'}});
              viewer.setStyle({chain:'C'},{cross:{hidden:false,
                                                  linewidth:1.0,
                                                  radius:0.5}});
              viewer.setStyle({chain:'D'},{cross:{hidden:false,
                                                  linewidth:10.0}});
              viewer.setStyle({chain:'E'},{cross:{hidden:false,
                                                  linewidth:1.0,
                                                  color:'black'}});

              viewer.render();


            });

     */
    addLabel(text: string, options?: LabelSpec, sel?: AtomSelectionSpec, noshow?: boolean): Label;
    /** Add residue labels.  This will generate one label per a
     * residue within the selected atoms.  The label will be at the
     * centroid of the atoms and styled according to the passed style.
     * The label text will be [resn][resi]
     *
     * @param {AtomSelectionSpec} sel
     * @param {AtomStyleSpec} style
     * @param {boolean} byframe - if true, create labels for every individual frame, not just current
     *
     * @example
         $3Dmol.download("mmtf:2ll5",viewer,{},function(){
              viewer.setStyle({stick:{radius:0.15},cartoon:{}});
              viewer.addResLabels({hetflag:false}, {font: 'Arial', fontColor:'black',showBackground:false, screenOffset: {x:0,y:0}});
              viewer.zoomTo();
              viewer.render();
            });
     */
    addResLabels(sel: AtomSelectionSpec, style: AtomStyleSpec, byframe?: boolean): Label[];
    /** Add property labels.  This will generate one label per a selected
     * atom at the atom's coordinates with the property value as the label text.
     *
     * @param {string} prop - property name
     * @param {AtomSelectionSpec} sel
     * @param {AtomStyleSpec} style
     *
     * * @example
         $3Dmol.download("cid:5291",viewer,{},function(){
              viewer.setStyle({stick: {radius:.2}});
              viewer.addPropertyLabels("index",{not:{elem:'H'}}, {fontColor:'black',font: 'sans-serif', fontSize: 28, showBackground:false,alignment:'center'});
              viewer.zoomTo();
              viewer.render();
            });
     */
    addPropertyLabels(prop: string, sel: AtomSelectionSpec, style: AtomStyleSpec): this;
    /**
     * Remove label from viewer
     *
     * @param {Label} label - $3Dmol label
     *
     * @example // Remove labels created in
     $3Dmol.download("pdb:2EJ0",viewer,{},function(){
              var toremove = viewer.addLabel("Aromatic", {position: {x:-6.89, y:0.75, z:0.35}, backgroundColor: 0x800080, backgroundOpacity: 0.8});
              viewer.addLabel("Label",{font:'sans-serif',fontSize:18,fontColor:'white',fontOpacity:1,borderThickness:1.0,
                                       borderColor:'red',borderOpacity:0.5,backgroundColor:'black',backgroundOpacity:0.5,
                                       position:{x:50.0,y:0.0,z:0.0},inFront:true,showBackground:true});
              viewer.removeLabel(toremove);
              viewer.render();


            });

     */
    removeLabel(label: Label): this;
    /**
     * Remove all labels from viewer
     *
     *         @example
    $3Dmol.download("pdb:1ubq",viewer,{},function(){

           viewer.addResLabels();
           viewer.setStyle({},{stick:{}});
           viewer.render( ); //show labels

           viewer.removeAllLabels();
           viewer.render(); //hide labels
    });
     */
    removeAllLabels(): this;
    /**
     * Modify existing label's style
     *
     * @param {Label} label - $3Dmol label
     * @param {LabelSpec}
     *            stylespec - Label style specification
     * @return {Label}
     */
    setLabelStyle(label: Label, stylespec: LabelSpec): Label;
    /**
     * Modify existing label's text
     *
     * @param {Label}  label - $3Dmol label
     * @param {String}
     *            text - Label text
     * @return {Label}
     */
    setLabelText(label: Label, text: string): Label;
    /**
     * Add shape object to viewer
     * @see {GLShape}
     *
     * @param {ShapeSpec} shapeSpec - style specification for label
     * @return {GLShape}
     */
    addShape(shapeSpec: ShapeSpec): GLShape;
    /**
     * Remove shape object from viewer
     *
     * @param {GLShape} shape - Reference to shape object to remove
     */
    removeShape(shape: GLShape): this;
    /**
     * Remove all shape objects from viewer
     */
    removeAllShapes(): this;
    private getSelectionCenter;
    /**
     * Create and add sphere shape. This method provides a shorthand
     * way to create a spherical shape object
     *
     * @param {SphereShapeSpec} spec - Sphere shape style specification
     * @return {GLShape}
     @example

     viewer.addSphere({center:{x:0,y:0,z:0},radius:10.0,color:'red'});

     viewer.render();
     */
    addSphere(spec: SphereSpec): GLShape;
    /**
     * Create and add box shape. This method provides a shorthand
     * way to create a box shape object
     *
     * @param {BoxSpec} spec - Box shape style specification
     * @return {GLShape}
     @example

     viewer.addLine({color:'red',start:{x:0,y:0,z:0},end:{x:5,y:0,z:0}});
     viewer.addLine({color:'blue',start:{x:0,y:0,z:0},end:{x:0,y:5,z:0}});
     viewer.addLine({color:'green',start:{x:0,y:0,z:0},end:{x:0,y:0,z:5}});

     viewer.addBox({center:{x:0,y:0,z:0},dimensions: {w:3,h:4,d:2},color:'magenta'});
     viewer.zoomTo();
     viewer.rotate(45, {x:1,y:1,z:1});
     viewer.render();
     */
    addBox(spec?: BoxSpec): GLShape;
    /**
     * Create and add arrow shape
     *
     * @param {ArrowSpec} spec - Style specification
     * @return {GLShape}
     @example
    $3Dmol.download("pdb:4DM7",viewer,{},function(){

              viewer.setBackgroundColor(0xffffffff);
              viewer.addArrow({
                  start: {x:-10.0, y:0.0, z:0.0},
                  end: {x:0.0, y:-10.0, z:0.0},
                  radius: 1.0,
                  radiusRadio:1.0,
                  mid:1.0,
                  clickable:true,
                  callback:function(){
                      this.color.setHex(0xFF0000FF);
                      viewer.render( );
                  }
              });
              viewer.render();
            });
     */
    addArrow(spec?: ArrowSpec): GLShape;
    /**
     * Create and add cylinder shape
     *
     * @param {CylinderSpec} spec - Style specification
     * @return {GLShape}

      @example
     viewer.setBackgroundColor(0xffffffff);
          viewer.addCylinder({start:{x:0.0,y:0.0,z:0.0},
                              end:{x:10.0,y:0.0,z:0.0},
                              radius:1.0,
                              fromCap:1,
                              toCap:2,
                              color:'red',
                              hoverable:true,
                              clickable:true,
                              callback:function(){ this.color.setHex(0x00FFFF00);viewer.render( );},
                              hover_callback: function(){ viewer.render( );},
                              unhover_callback: function(){ this.color.setHex(0xFF000000);viewer.render( );}
                             });
          viewer.addCylinder({start:{x:0.0,y:2.0,z:0.0},
                              end:{x:0.0,y:10.0,z:0.0},
                              radius:0.5,
                              fromCap:false,
                              toCap:true,
                              color:'teal'});
          viewer.addCylinder({start:{x:15.0,y:0.0,z:0.0},
                              end:{x:20.0,y:0.0,z:0.0},
                              radius:1.0,
                              color:'black',
                              fromCap:false,
                              toCap:false});
          viewer.render();
     */
    addCylinder(spec?: CylinderSpec): GLShape;
    /**
     * Create and add Curve shape
     *
     * @param {CurveSpec} spec - Style specification
     * @return {GLShape}

     @example
          viewer.addCurve({points: [{x:0.0,y:0.0,z:0.0}, {x:5.0,y:3.0,z:0.0}, {x:5.0,y:7.0,z:0.0}, {x:0.0,y:10.0,z:0.0}],
                              radius:0.5,
                              smooth: 10,
                              fromArrow:false,
                              toArrow: true,
                              color:'orange',
                              });
          viewer.addCurve({points: [{x:-1,y:0.0,z:0.0}, {x:-5.0,y:5.0,z:0.0}, {x:-2,y:10.0,z:0.0}],
                              radius:1,
                              fromArrow:true,
                              toArrow: false,
                              color:'purple',
                              });
          viewer.zoomTo();
          viewer.render();
     */
    addCurve(spec?: CurveSpec): GLShape;
    /**
     * Create and add line shape
     *
     * @param {LineSpec} spec - Style specification, can specify dashed, dashLength, and gapLength
     * @return {GLShape}
     @example
     $3Dmol.download("pdb:2ABJ",viewer,{},function(){

              viewer.setViewStyle({style:"outline"});
              viewer.setStyle({chain:'A'},{sphere:{hidden:true}});
              viewer.setStyle({chain:'D'},{sphere:{radius:3.0}});
              viewer.setStyle({chain:'G'},{sphere:{colorscheme:'greenCarbon'}});
              viewer.setStyle({chain:'J'},{sphere:{color:'blue'}});
              viewer.addLine({dashed:true,start:{x:0,y:0,z:0},end:{x:100,y:100,z:100}});
              viewer.render();
          });

     */
    addLine(spec?: LineSpec): GLShape;
    /**
     * Create and add unit cell visualization.
     *
     * @param {GLModel|number} model - Model with unit cell information (e.g., pdb derived).  If omitted uses most recently added model.
     * @param {UnitCellStyleSpec} spec - visualization style
       @example

            $3Dmol.get('data/1jpy.cif', function(data) {
              let m = viewer.addModel(data);
              viewer.addUnitCell(m, {box:{color:'purple'},alabel:'X',blabel:'Y',clabel:'Z',alabelstyle: {fontColor: 'black',backgroundColor:'white',inFront:true,fontSize:40},astyle:{color:'darkred', radius:5,midpos: -10}});
              viewer.zoomTo();
              viewer.render();
    });
     */
    addUnitCell(model?: GLModel | number, spec?: UnitCellStyleSpec): void;
    /**
    * Remove unit cell visualization from model.
    *
    * @param {GLModel|number} model - Model with unit cell information (e.g., pdb derived).  If omitted uses most recently added model.
      @example
           $3Dmol.get('data/icsd_200866.cif', function(data) {
             let m = viewer.addModel(data);
             viewer.setStyle({sphere:{}})
             viewer.addUnitCell();
             viewer.zoomTo();
             viewer.removeUnitCell();
             viewer.render();
       });
    */
    removeUnitCell(model?: GLModel | number): void;
    /**
    * Replicate atoms in model to form a super cell of the specified dimensions.
    * Original cell will be centered as much as possible.
    *
    * @param {integer} A - number of times to replicate cell in X dimension.
    * @param {integer} B - number of times to replicate cell in Y dimension.  If absent, X value is used.
    * @param {integer} C - number of times to replicate cell in Z dimension.  If absent, Y value is used.
    * @param {GLModel} model - Model with unit cell information (e.g., pdb derived).  If omitted uses most recently added model.
    * @param {boolean} addBonds - Create bonds between unit cells based on distances.
      @example
           $3Dmol.get('data/icsd_200866.cif', function(data) {
             let m = viewer.addModel(data);
             viewer.setStyle({sphere:{scale:.25}})
             viewer.addUnitCell();
             viewer.zoomTo();
             viewer.replicateUnitCell(3,2,1,m);
             viewer.render();
       });
    */
    replicateUnitCell(A?: number, B?: number, C?: number, model?: GLModel | number, addBonds?: boolean): void;
    /** Add dashed line to shape */
    addLineDashed(spec: CylinderSpec, s: GLShape): GLShape;
    /**
     * Add custom shape component from user supplied function
     *
     * @param {CustomSpec} spec - Style specification
     * @return {GLShape}
     @example
     function triangle(viewer) {
        var vertices = [];
        var normals = [];
        var colors = [];
        var r = 20;
        //triangle
        vertices.push(new $3Dmol.Vector3(0,0,0));
        vertices.push(new $3Dmol.Vector3(r,0,0));
        vertices.push(new $3Dmol.Vector3(0,r,0));

        normals.push(new $3Dmol.Vector3(0,0,1));
        normals.push(new $3Dmol.Vector3(0,0,1));
        normals.push(new $3Dmol.Vector3(0,0,1));

        colors.push({r:1,g:0,b:0});
        colors.push({r:0,g:1,b:0});
        colors.push({r:0,g:0,b:1});

        var faces = [ 0,1,2 ];

        var spec = {vertexArr:vertices, normalArr: normals, faceArr:faces,color:colors};
        viewer.addCustom(spec);
    }
    triangle(viewer);
    viewer.render();
     */
    addCustom(spec: CustomShapeSpec): GLShape;
    /**
     * Construct isosurface from volumetric data in gaussian cube format
     * @param {String} data - Input file contents
     * @param {String} format - Input file format
     * @param {VolumetricRendererSpec|IsoSurfaceSpec} spec - Shape style specification
     * @return {GLShape}
     *
     * @example


    $3Dmol.get('data/bohr.cube', function(data) {

    viewer.addVolumetricData(data, "cube", {isoval: -0.01, color: "red", opacity: 0.95});
    viewer.setStyle({cartoon:{},stick:{}});
    viewer.zoomTo();
    viewer.render();
    });


     */
    addVolumetricData(data: any, format: string, spec?: VolumetricRendererSpec | IsoSurfaceSpec): GLVolumetricRender | GLShape;
    /**
     * Construct isosurface from volumetric data.  This is more flexible
    * than addVolumetricData, but can not be used with py3Dmol.
     * @param {VolumeData} data - volumetric data
     * @param {IsoSurfaceSpec} spec - Shape style specification
     * @return {GLShape}
     *
     @example
     $3Dmol.get('../test_structs/benzene-homo.cube', function(data){
              var voldata = new $3Dmol.VolumeData(data, "cube");
              viewer.addIsosurface(voldata, {isoval: 0.01,
                                             color: "blue"});
              viewer.addIsosurface(voldata, {isoval: -0.01,
                                             color: "red"});
              viewer.zoomTo();
              viewer.render();
            });
     */
    addIsosurface(data: any, spec?: IsoSurfaceSpec, callback?: any): GLShape;
    /**
     * Create volumetric renderer for volumetricData
     * @param {VolumeData} data - volumetric data
     * @param {VolumetricRenderSpec} spec - specification of volumetric render
     *
     * @return {GLShape}
     *
     */
    addVolumetricRender(data: any, spec: VolumetricRendererSpec): GLVolumetricRender;
    /**
     * Return true if volumetric rendering is supported (WebGL 2.0 required)
     *
     * @return {boolean}
     */
    hasVolumetricRender(): any;
    /**
     * Enable/disable fog for content far from the camera
     *
     * @param {boolean} fog whether to enable or disable the fog
     */
    enableFog(fog: boolean): void;
    /**
     * Sets the atomlists of all models in the viewer to specified frame.
     * Shapes and labels can also be displayed by frame.
     * Sets to last frame if framenum out of range
     *
     * @param {number} framenum - fame index to use, starts at zero
     * @return {Promise}
     */
    setFrame(framenum: number): Promise<void>;
    /**
     * Gets the current viewer frame.
     *
     */
    getFrame(): number;
    /**
     * Returns the number of frames that the model with the most frames in the viewer has
     *
     * @return {number}
     */
    getNumFrames(): number;
    /**
     * Animate all models in viewer from their respective frames
     * @param {Object} options - can specify interval (speed of animation), loop (direction
     * of looping, 'backward', 'forward' or 'backAndForth'), step interval between frames ('step'), startFrame, and reps (numer of repetitions, 0 indicates infinite loop)
     *
     */
    animate(options: any): this;
    /**
     * Stop animation of all models in viewer
     */
    stopAnimate(): this;
    /**
     * Pause animation of all models in viewer
     */
    pauseAnimate(): this;
    /**
     * Resume animation of all models in viewer
     */
    resumeAnimate(): this;
    /**
     * Return true if viewer is currently being animated, false otherwise
     * @return {boolean}
     */
    isAnimated(): boolean;
    /**
     * Create and add model to viewer, given molecular data and its format
     *
     * @param {string} data - Input data
     * @param {string} format - Input format ('pdb', 'sdf', 'xyz', 'pqr', or 'mol2')
     * @param {ParserOptionsSpec} options - format dependent options. Attributes depend on the input file format.
     * @example


          viewer.setViewStyle({style:"outline"});
          $3Dmol.get('data/1fas.pqr', function(data){
              viewer.addModel(data, "pqr");
              $3Dmol.get("data/1fas.cube",function(volumedata){
                  viewer.addSurface($3Dmol.SurfaceType.VDW, {opacity:0.85,voldata: new $3Dmol.VolumeData(volumedata, "cube"), volscheme: new $3Dmol.Gradient.RWB(-10,10)},{});

              viewer.render();
              });
              viewer.zoomTo();
          });
     *
     * @return {GLModel}
     */
    addModel(data?: any, format?: string, options?: any): GLModel;
    /**
     * Given multimodel file and its format, add atom data to the viewer as separate models
     * and return list of these models
     *
     * @param {string} data - Input data
     * @param {string} format - Input format (see {@link FileFormats})
     * @return {Array<GLModel>}
     */
    addModels(data: any, format: string, options?: any): GLModel[];
    /**
     * Create and add model to viewer. Given multimodel file and its format,
     * different atomlists are stored in model's frame
     * property and model's atoms are set to the 0th frame
     *
     * @param {string} data - Input data
     * @param {string} format - Input format (see {@link FileFormats})
     * @return {GLModel}
     *
     * @example
            $3Dmol.get('../test_structs/multiple2.xyz', function(data){
              viewer.addModelsAsFrames(data, "xyz");
              viewer.animate({loop: "forward",reps: 1});
              viewer.setStyle({stick:{colorscheme:'magentaCarbon'}});
              viewer.zoomTo();
              viewer.render();
          });
     */
    addModelsAsFrames(data: any, format: string, options?: any): GLModel;
    /**
     * Create and add model to viewer. Given multimodel file and its format,
     * all atoms are added to one model
     *
     * @param {string} data - Input data
     * @param {string} format - Input format (see {@link FileFormats})
     * @return {GLModel}
     @example


          $3Dmol.get('../test_structs/multiple.sdf', function(data){
              viewer.addAsOneMolecule(data, "sdf");
              viewer.zoomTo();
              viewer.render();
          });
     */
    addAsOneMolecule(data: any, format: string, options?: any): GLModel;
    /**
     * Delete specified model from viewer
     *
     * @param {GLModel|number} model
     */
    removeModel(model?: GLModel | number): this;
    /**
     * Delete all existing models
     */
    removeAllModels(): this;
    /**
     * Export one or all of the loaded models into ChemDoodle compatible JSON.
     * @param {boolean} includeStyles - Whether or not to include style information.
     * @param {number} modelID - Optional parameter for which model to export. If left out, export all of them.
     * @return {string}
     */
    exportJSON(includeStyles: boolean, modelID: number): string;
    /** return a VRML string representation of the scene.  Include VRML header information
     * @return VRML
     */
    exportVRML(): string;
    /**
     * Create a new model from atoms specified by sel.
     * If extract, removes selected atoms from existing models
     *
     * @param {AtomSelectionSpec} sel - Atom selection specification
     * @param {boolean=} extract - If true, remove selected atoms from existing models
     * @return {GLModel}
     */
    createModelFrom(sel: AtomSelectionSpec, extract?: boolean): GLModel;
    private applyToModels;
    /**
     * Set style properties to all selected atoms
     *
     * @param {AtomSelectionSpec} sel - Atom selection specification.  Can be omitted to select all.
     * @param {AtomStyleSpec} style - Style spec to apply to specified atoms
     *
     * @example
     viewer.setBackgroundColor(0xffffffff);
    $3Dmol.download('pdb:5IRE',viewer,{doAssembly: false},function(m) {
    m.setStyle({chain:'A'},{'cartoon':{color:'spectrum'}});
    m.setStyle({chain:'C'},{'cartoon':{style:'trace',color:'blue'}});
    m.setStyle({chain:'E'},{'cartoon':{tubes:true,arrows:true,color:'green',opacity:0.75}});
    m.setStyle({chain:'B'},{'cartoon':{color:'red',opacity:0.5}});
    m.setStyle({chain:'D'},{'cartoon':{style:'trace',color:'grey',opacity:0.75}});
    m.setStyle({chain:'F'},{'cartoon':{arrows:true,color:'white'}});
    // viewer.addStyle({chain:'B'},{line:{}});
    viewer.zoomTo();
    viewer.render();
    });
     */
    setStyle(sel: AtomSelectionSpec, style: AtomStyleSpec): any;
    setStyle(sel: AtomStyleSpec): any;
    /**
     * Add style properties to all selected atoms
     *
     * @param {AtomSelectionSpec} sel - Atom selection specification.  Can be omitted to select all
     * @param {AtomStyleSpec} style - style spec to add to specified atoms
     @example

    $3Dmol.download('pdb:5IRE',viewer,{doAssembly: false},function(m) {
    viewer.setStyle({cartoon:{}});
    //keep cartoon style, but show thick sticks for chain A
    viewer.addStyle({chain:'A'},{stick:{radius:.5,colorscheme:"magentaCarbon"}});
    viewer.zoomTo();
    viewer.render();
    });
     */
    addStyle(sel: AtomSelectionSpec, style: AtomStyleSpec): any;
    addStyle(sel: AtomStyleSpec): any;
    /**
     * Set click-handling properties to all selected atoms. *Important*: render must be called for this to take effect.
     *
     * @param {AtomSelectionSpec} sel - atom selection to apply clickable settings to
     * @param {boolean} clickable - whether click-handling is enabled for the selection
     * @param {function} callback - function called when an atom in the selection is clicked. The function is passed
     * the selected (foremost) object, the viewer, the triggering event, the associated container, and a list
     * of all intersecting objects with their distances from the viewer.
     *
     * @example
        $3Dmol.download("cid:307900",viewer,{},function(){

               viewer.setStyle({},{sphere:{}});
               viewer.setClickable({},true,function(atom,viewer,event,container) {
                   viewer.addLabel(atom.resn+":"+atom.atom,{position: atom, backgroundColor: 'darkgreen', backgroundOpacity: 0.8});
               });
               viewer.render();
    });
     */
    setClickable(sel: AtomSelectionSpec, clickable: boolean, callback: any): this;
    /** Set hoverable and callback of selected atoms
     *
     * @param {AtomSelectionSpec} sel - atom selection to apply hoverable settings to
     * @param {boolean} hoverable - whether hover-handling is enabled for the selection
     * @param {function} hover_callback - function called when an atom in the selection is hovered over.  The function has the same signature as a click handler.
     * @param {function} unhover_callback - function called when the mouse moves out of the hover area
    @example
    $3Dmol.download("pdb:1ubq",viewer,{},function(){

           viewer.setHoverable({},true,function(atom,viewer,event,container) {
               if(!atom.label) {
                atom.label = viewer.addLabel(atom.resn+":"+atom.atom,{position: atom, backgroundColor: 'mintcream', fontColor:'black'});
               }
           },
           function(atom) {
               if(atom.label) {
                viewer.removeLabel(atom.label);
                delete atom.label;
               }
            }
           );
           viewer.setStyle({},{stick:{}});
           viewer.render();
    });

     */
    setHoverable(sel: AtomSelectionSpec, hoverable: boolean, hover_callback: any, unhover_callback: any): this;
    /** enable context menu and callback of selected atoms
     *
     * @param {AtomSelectionSpec} sel - atom selection to apply hoverable settings to
     * @param {boolean} contextMenuEnabled - whether contextMenu-handling is enabled for the selection

     */
    enableContextMenu(sel: AtomSelectionSpec, contextMenuEnabled: boolean): this;
    /**
     * If  atoms have dx, dy, dz properties (in some xyz files), vibrate populates each model's frame property based on parameters.
     * Models can then be animated
     *
     * @param {number} numFrames - number of frames to be created, default to 10
     * @param {number} amplitude - amplitude of distortion, default to 1 (full)
     * @param {boolean} bothWays - if true, extend both in positive and negative directions by numFrames
     * @param {ArrowSpec} arrowSpec - specification for drawing animated arrows. If color isn't specified, atom color (sphere, stick, line preference) is used.
     */
    vibrate(numFrames: number, amplitude: number, bothways: boolean, arrowSpec: ArrowSpec): this;
    /**
     * @param {AtomSelectionSpec} sel
     * @param {string} prop
     * @param {Gradient|string} scheme
     * @param {object} range
     */
    setColorByProperty(sel: AtomSelectionSpec, prop: string, scheme: Gradient | string, range: any): this;
    /**
     * @param {AtomSelectionSpec} sel
     * @param {object} colors
     */
    setColorByElement(sel: AtomSelectionSpec, colors: any): this;
    /**
     *
     * @param {AtomSpec[]} atomlist
     * @param {Array}
     *            extent
     * @return {Array}
     */
    private static getAtomsWithin;
    private static volume;
    /**
     *
     * @param {Array}
     *            extent
     * @param {AtomSpec[]} atomlist
     * @param {AtomSpec[]} atomstoshow
     * @return {Array}
     */
    private carveUpExtent;
    /**
     *
     * @param {AtomSpec[]} atoms
     * @param {{vertices:number,faces:number}}
     *            VandF
     * @param {MeshLambertMaterial}
     *            mat
     * @return {Mesh}
     */
    private static generateSurfaceMesh;
    /**
     *
     * @param {SurfaceType}
     *            type
     * @param {Array}
     *            expandedExtent
     * @param {AtomSpec[]}
     *            extendedAtoms
     * @param {AtomSpec[]}
     *            atomsToShow
     * @param {AtomSpec[]} atoms
     * @param {number}
     *            vol
     * @return {Object}
     */
    private static generateMeshSyncHelper;
    private static getMatWithStyle;
    /**
     * Adds an explicit mesh as a surface object.
     * @param {Mesh}
     *            mesh
     * @param {Object}
     *            style
     * @returns {number} surfid
     */
    addMesh(mesh: Mesh): number;
    private static shallowCopy;
    /**
     * Add surface representation to atoms
     * @param {SurfaceType|string} type - Surface type (VDW, MS, SAS, or SES)
     * @param {SurfaceStyleSpec} style - optional style specification for surface material (e.g. for different coloring scheme, etc)
     * @param {AtomSelectionSpec} atomsel - Show surface for atoms in this selection
     * @param {AtomSelectionSpec} allsel - Use atoms in this selection to calculate surface; may be larger group than 'atomsel'
     * @param {AtomSelectionSpec} focus - Optionally begin rendering surface specified atoms
     * @param {function} surfacecallback - function to be called after setting the surface
     * @return {Promise} promise - Returns a promise that ultimately resovles to the surfid.  Returns surfid immediately if surfacecallback is specified.  Returned promise has a [surfid, GLViewer, style, atomsel, allsel, focus] fields for immediate access.
     */
    addSurface(stype: SurfaceType | string, style?: SurfaceStyleSpec, atomsel?: AtomSelectionSpec, allsel?: AtomSelectionSpec, focus?: AtomSelectionSpec, surfacecallback?: any): any;
    /**
     * Set the surface material to something else, must render change
     * @param {number} surf - Surface ID to apply changes to
     * @param {SurfaceStyleSpec} style - new material style specification
     @example
     $3Dmol.get("data/9002806.cif",function(data){
        viewer.addModel(data);
        viewer.setStyle({stick:{}});
        let surf = viewer.addSurface("SAS");
        surf.then(function() {
            viewer.setSurfaceMaterialStyle(surf.surfid, {color:'blue',opacity:0.5});
            viewer.render();
            });
       });
     */
    setSurfaceMaterialStyle(surf: number, style: SurfaceStyleSpec): this;
    /**
     * Return surface object
     * @param {number} surf - surface id
     */
    getSurface(surf: number): any;
    /**
     * Remove surface with given ID
     * @param {number} surf - surface id
     */
    removeSurface(surf: number): this;
    /** Remove all surfaces.
     **/
    removeAllSurfaces(): this;
    /** return Jmol moveto command to position this scene */
    jmolMoveTo(): string;
    /** Clear scene of all objects
     * */
    clear(): this;
    /**
     * Add specified properties to all atoms matching input argument
     * @param {Object} props, either array of atom selectors with associated props, or function that takes atom and sets its properties
     * @param {AtomSelectionSpec} sel  - subset of atoms to work on - model selection must be specified here
         @example
         $3Dmol.get('../test_structs/b.sdf', function(data){
                  viewer.addModel(data,'sdf');
                  let props = [];
                  //make the atom index a property x
                  for(let i = 0; i < 8; i++) {
                    props.push({index:i,props:{'x':i}});
                  }
                  viewer.mapAtomProperties(props);
                  viewer.setStyle({sphere:{colorscheme:{gradient:'roygb',prop:'x',min:0,max:8}}});
                  viewer.zoomTo();
                  viewer.render();
                });
     */
    mapAtomProperties(props: any, sel: AtomSelectionSpec): this;
    /**
     * Synchronize this view matrix of this viewer to the passed viewer.
     * When the viewpoint of this viewer changes, the other viewer will
     * be set to this viewer's view.
     * @param {$3Dmol.GLViewer} otherview
     */
    linkViewer(otherviewer: GLViewer): this;
    /**
     * Return the z distance between the model and the camera
     * @return {number} distance
     */
    getPerceivedDistance(): number;
    /**
     * Set the distance between the model and the camera
     * Essentially zooming. Useful while stereo rendering.
     */
    setPerceivedDistance(dist: number): void;
    /**
     * Used for setting an approx value of eyeSeparation. Created for calling by StereoViewer object
     * @return {number} camera x position
     */
    setAutoEyeSeparation(isright: boolean, x: number): number;
    /**
     * Set the default cartoon quality for newly created models.  Default is 5.
     * Current models are not affected.
     * @number quality, higher results in higher resolution renders
     */
    setDefaultCartoonQuality(val: number): void;
}
/**
 * Create and initialize an appropriate viewer at supplied HTML element using specification in config
 * @param {Object | string} element - Either HTML element or string identifier
 * @param {ViewerSpec} [config] Viewer configuration
 * @return {GLViewer} GLViewer, null if unable to instantiate WebGL
 * @example
   var viewer = $3Dmol.createViewer(
     'gldiv', //id of div to create canvas in
     {
       defaultcolors: $3Dmol.elementColors.rasmol,
       backgroundColor: 'black'
     }
   );
 *
 */
export declare function createViewer(element: any, config?: ViewerSpec): GLViewer;
/**
 * Create and initialize an appropriate a grid of viewers that share a WebGL canvas
 * @param {Object | string} element - Either HTML element or string identifier
 * @param {GridSpec} [config] - grid configuration
 * @param {ViewerGridSpec} [viewer_config] - Viewer specification to apply to all subviewers
 * @return [[GLViewer]] 2D array of GLViewers
 * @example
   var viewers = $3Dmol.createViewerGrid(
     'gldiv', //id of div to create canvas in
     {
       rows: 2,
       cols: 2,
       control_all: true  //mouse controls all viewers
     },
     { backgroundColor: 'lightgrey' }
   );
   $3Dmol.get('data/1jpy.cif', function(data) {
     var viewer = viewers[0][0];
     viewer.addModel(data,'cif');
     viewer.setStyle({sphere:{}});
     viewer.zoomTo();
     viewer.render( );

     viewer = viewers[0][1];
     viewer.addModel(data,'cif');
     viewer.setStyle({stick:{}});
     viewer.zoomTo();
     viewer.render( );

     viewer = viewers[1][0];
     viewer.addModel(data,'cif');
     viewer.setStyle({cartoon:{color:'spectrum'}});
     viewer.zoomTo();
     viewer.render( );

     viewer = viewers[1][1];
     viewer.addModel(data,'cif');
     viewer.setStyle({cartoon:{colorscheme:'chain'}});
     viewer.zoomTo();
     viewer.render();


   });

 */
export declare function createViewerGrid(element: any, config?: ViewerGridSpec, viewer_config?: ViewerSpec): any[];
export declare function createStereoViewer(element: any): void;
/**
 * GLViewer input specification
 */
export interface ViewerSpec {
    /** Callback function to be executed with this viewer after setup is complete */
    callback?: (viewer: ViewerSpec) => void;
    /** Object defining default atom colors as atom => color property value pairs for all models within this viewer */
    defaultcolors?: Record<string, ColorSpec>;
    /**
     * Whether to disable disable handling of mouse events.
     * If you want to use your own mouse handlers, set this then bind your handlers to the canvas object.
                  The default 3Dmol.js handlers are available for use:
                  'mousedown touchstart': viewer._handleMouseDown,
                  'DOMMouseScroll mousewheel': viewer._handleMouseScroll
                  'mousemove touchmove': viewer._handleMouseMove
     */
    nomouse?: boolean | string;
    /** Color of the canvas background */
    backgroundColor?: string;
    /** Alpha transparency of canvas background */
    backgroundAlpha?: number;
    /** */
    camerax?: number;
    /** */
    hoverDuration?: number;
    /** id of the canvas */
    id?: string;
    /** default 5 */
    cartoonQuality?: number;
    /** */
    row?: number;
    /** */
    col?: number;
    /** */
    rows?: number;
    /** */
    cols?: number;
    /** */
    canvas?: HTMLCanvasElement;
    viewers?: GLViewer[];
    /** */
    minimumZoomToDistance?: number;
    /** */
    lowerZoomLimit?: number;
    /** */
    upperZoomLimit?: number;
    /** */
    antialias?: boolean;
    /** */
    control_all?: boolean;
    /** */
    orthographic?: boolean;
    /** Disable fog, default to false */
    disableFog?: boolean;
}
/**
 * Grid GLViewer input specification
 */
export interface ViewerGridSpec {
    /** number of rows in grid */
    rows?: number;
    /** number of columns in grid */
    cols?: number;
    /** if true, mouse events are linked */
    control_all?: boolean;
}
/**
 * @example
 * var setStyles = function(volumedata){
 *  var data = new $3Dmol.VolumeData(volumedata, "cube");
 *  viewer.addSurface("VDW", {opacity:0.85, voldata: data, volscheme: new $3Dmol.Gradient.RWB(-10,10)},{chain:'A'});
 *  viewer.mapAtomProperties($3Dmol.applyPartialCharges);
 *  viewer.addSurface($3Dmol.SurfaceType.SAS, {map:{prop:'partialCharge',scheme:new $3Dmol.Gradient.RWB(-.05,.05)}, opacity:1.0},{chain:'B'});
 *  viewer.addSurface($3Dmol.SurfaceType.VDW, {opacity:0.85,voldata: data, color:'red'},{chain:'C'});
 *  viewer.addSurface($3Dmol.SurfaceType.SAS, {opacity:0.85,voldata: data, colorscheme:'greenCarbon'},{chain:'D'});
 *  viewer.render();
 * };
 * $3Dmol.download("pdb:4DLN",viewer,{},function(){
 *   $.get("data/1fas.cube",setStyles);
 * });
 */
export interface SurfaceStyleSpec {
    /** sets the transparency: 0 to hide, 1 for fully opaque */
    opacity?: number;
    /** element based coloring */
    colorscheme?: ColorschemeSpec;
    /** fixed coloring, overrides colorscheme */
    color?: ColorSpec;
    /** volumetric data for vertex coloring, can be VolumeData object or raw data if volformat is specified */
    voldata?: VolumeData;
    /** coloring scheme for mapping volumetric data to vertex color, if not a Gradient object, show describe a builtin gradient one by providing an object with gradient, min, max, and (optionally) mid fields. */
    volscheme?: Gradient;
    /** format of voldata if not a {VolumeData} object */
    volformat?: string;
    map?: Record<string, unknown>;
}
/** Style specification ofr unit cell shape.  */
export interface UnitCellStyleSpec {
    /** line style used to draw box */
    box?: LineStyleSpec;
    /** arrow specification of the "a" axis */
    astyle?: ArrowSpec;
    /** arrow specification of the "b" axis */
    bstyle?: ArrowSpec;
    /** arrow specification of the "c" axis */
    cstyle?: ArrowSpec;
    /** label for "a" axis */
    alabel?: string;
    /** label style for a axis */
    alabelstyle?: LabelSpec;
    /** label for "b" axis */
    blabel?: string;
    /** label style for b axis */
    blabelstyle?: LabelSpec;
    /** label for "c" axis */
    clabel?: string;
    /** label style for c axis */
    clabelstyle?: LabelSpec;
}
