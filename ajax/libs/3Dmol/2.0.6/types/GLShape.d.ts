import { Geometry } from "./WebGL";
import { Sphere } from "./WebGL/shapes";
import { Vector3, XYZ } from "./WebGL/math";
import { ColorSpec } from "./colors";
import { VolumeData } from "./VolumeData";
import { CAP } from "./GLDraw";
import { Func } from "./utilities";
import { GradientType } from "./Gradient";
/**
 * A GLShape is a collection of user specified shapes.
 *
 * @class
 * @extends {ShapeSpec}
 * @param {number} sid - Unique identifier
 * @param {ShapeSpec} stylespec - shape style specification
 */
export declare class GLShape {
    private static ISDONE;
    private static finalizeGeo;
    static updateColor(geo: Geometry, color: any): void;
    static drawArrow(shape: GLShape, geo: Geometry, spec: ArrowSpec): void;
    static updateBoundingFromPoints(sphere: Sphere, components: any, points: any, numPoints: number): void;
    private static addCustomGeo;
    static drawCustom: (shape: GLShape, geo: Geometry, customSpec: CustomShapeSpec) => void;
    static updateFromStyle(shape: GLShape, stylespec: ShapeSpec): void;
    boundingSphere: Sphere;
    intersectionShape: any;
    color: any;
    hidden: boolean;
    wireframe: boolean;
    opacity: number;
    linewidth: number;
    clickable: boolean;
    callback: Func;
    hoverable: boolean;
    hover_callback: Func;
    unhover_callback: Func;
    frame: any;
    side: number;
    shapePosition: any;
    private geo;
    private linegeo;
    private stylespec;
    private components;
    private shapeObj;
    private renderedShapeObj;
    /**
     * Custom renderable shape
     *
     * @constructor
     *
     * @param {ShapeSpec} stylespec
     */
    constructor(stylespec: ShapeSpec);
    /** Update shape with new style specification
     * @param {ShapeSpec} newspec
       @example
        let sphere = viewer.addSphere({center:{x:0,y:0,z:0},radius:10.0,color:'red'});
        sphere.updateStyle({color:'yellow',opacity:0.5});
        viewer.render();
     */
    updateStyle(newspec: ShapeSpec): void;
    /**
     * Creates a custom shape from supplied vertex and face arrays
     * @param {CustomShapeSpec} customSpec
     */
    addCustom(customSpec: CustomShapeSpec): void;
    /**
     * Creates a sphere shape
     * @param {SphereSpec} sphereSpec
     @example
     viewer.addSphere({center:{x:0,y:0,z:0},radius:10.0,color:'red'});
     
     viewer.render();
     */
    addSphere(sphereSpec: SphereSpec): void;
    /**
     * Creates a box
     * @param {BoxSpec} boxSpec
     @example
     var shape = viewer.addShape({color:'red'});
     shape.addBox({corner: {x:1,y:2,z:0}, dimensions: {w: 4, h: 2, d: 6}});
     shape.addBox({corner: {x:-5,y:-3,z:0},
                   dimensions: { w: {x:1,y:1,z:0},
                                 h: {x:-1,y:1,z:0},
                                 d: {x:0,y:0,z:1} }});
     viewer.zoomTo();
     viewer.rotate(30);
     viewer.render();
     */
    addBox(boxSpec: BoxSpec): void;
    /**
     * Creates a cylinder shape
     * @param {CylinderSpec} cylinderSpec
     @example
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
    addCylinder(cylinderSpec: CylinderSpec): void;
    /**
     * Creates a dashed cylinder shape
     * @param {CylinderSpec} cylinderSpec
     */
    addDashedCylinder(cylinderSpec: CylinderSpec): void;
    /**
     * Creates a curved shape
     * @param {CurveSpec} curveSpec
     */
    addCurve(curveSpec: CurveSpec): void;
    /**
     * Creates a line shape
     * @param {LineSpec} lineSpec
     @example
     $3Dmol.download("pdb:2ABJ",viewer,{},function(){
              viewer.addLine({dashed:true,start:{x:0,y:0,z:0},end:{x:100,y:100,z:100}});
              viewer.render(callback);
          });
    
     */
    addLine(lineSpec: LineSpec): void;
    /**
     * Creates an arrow shape
     * @param {ArrowSpec} arrowSpec
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
    addArrow(arrowSpec: ArrowSpec): void;
    static distance_from(c1: XYZ, c2: XYZ): number;
    static inSelectedRegion(coordinate: XYZ, selectedRegion: any, radius: number): boolean;
    /**
     * Create isosurface from voluemetric data.
     * @param {VolumeData} data - volumetric input data
     * @param {IsoSurfaceSpec} isoSpec - volumetric data shape specification
     * @example //the user can specify a selected region for the isosurface
     $.get('../test_structs/benzene-homo.cube', function(data){
              var voldata = new $3Dmol.VolumeData(data, "cube");
              viewer.addIsosurface(voldata, {isoval: 0.01,
                                             color: "blue",
                                             alpha: 0.5,
                                             smoothness: 10});
              viewer.addIsosurface(voldata, {isoval: -0.01,
                                             color: "red",
                                             smoothness: 5,
                                             opacity:0.5,
                                             wireframe:true,
                                             clickable:true,
                                             callback:
                                             function() {
                                                 this.opacity = 0.0;
                                                 viewer.render( );
                                             }});
              viewer.setStyle({}, {stick:{}});
              viewer.zoomTo();
              viewer.render();
            });
     */
    addIsosurface(data: any, volSpec: IsoSurfaceSpec, callback?: any): void;
    /**
     * @deprecated Use addIsosurface instead
     * Creates custom shape from volumetric data
     * @param {string} data - Volumetric input data
     * @param {string} fmt - Input data format (e.g. 'cube' for cube file format)
     * @param {IsoSurfaceSpec} isoSpec - Volumetric data shape specification
     */
    addVolumetricData(data: any, fmt: any, volSpec: IsoSurfaceSpec): void;
    finalize(): Geometry;
    globj(group: any): void;
    removegl(group: any): void;
    get position(): Vector3;
    get x(): number;
    get y(): number;
    get z(): number;
}
export declare function splitMesh(mesh: any): any;
/**
 * GLShape style specification
 */
export interface ShapeSpec {
    /** Either a single color for the whole object or an array specifying the color at each vertex ({@link CustomShapeSpec}). */
    color?: ColorSpec | ColorSpec[];
    alpha?: number;
    /** transparency, between 0 (invisible) and 1 (opaque) */
    opacity?: number;
    /** draw as wireframe, not surface */
    wireframe?: boolean;
    /** if true, do not display object */
    hidden?: boolean;
    /** width of line for wireframe rendering **No longer supported by most browsers** */
    linewidth?: number;
    /** if true, user can click on object to trigger callback */
    clickable?: boolean;
    /** function to call on click */
    callback?: Func;
    /** if true, user can hover on object to trigger callback */
    hoverable?: boolean;
    /** hover callback */
    hover_callback?: Func;
    /** unhover callback */
    unhover_callback?: Func;
    /** if set, only display in this frame of an animation */
    frame?: number;
    side?: number;
    voldata?: VolumeData;
    volscheme?: GradientType;
}
/**
 * Isosurface style specification
 * @extends ShapeSpec
 */
export interface IsoSurfaceSpec extends ShapeSpec {
    /** specifies the isovalue to draw surface at */
    isoval?: number;
    /** if true uses voxel style rendering */
    voxel?: boolean;
    /** amount to smooth surface (default 1) */
    smoothness?: number;
    /** coordinates around which to include data; use viewer.selectedAtoms() to convert an AtomSelectionSpec to coordinates */
    coords?: XYZ[];
    /** distance around coords to include data [default = 2.0] */
    seldist?: number;
    /** volumetric data for vertex coloring, can be VolumeData object or raw data if volformat is specified */
    voldata?: VolumeData;
    /** coloring scheme for mapping volumetric data to vertex color, if not a Gradient object, show describe a builtin gradient one by providing an object with gradient, min, max, and (optionally) mid fields. */
    volscheme?: GradientType;
    /** format of voldata if not a $3Dmol.VolumeData object */
    volformat?: string;
    selectedRegion?: XYZ[];
    selectedOffset?: number;
    radius?: number;
}
/**
 * Arrow shape specification.
  * @extends ShapeSpec
 */
export interface ArrowSpec extends ShapeSpec {
    /** starting position */
    start?: XYZ;
    /** ending position */
    end?: XYZ;
    /** direction to extend from start (instead of specifying end) */
    dir?: XYZ;
    /** length to extend in dir direction from start (instead of specifying end) */
    length?: number;
    /** radius (default 0.1A) */
    radius?: number;
    /** color */
    color?: ColorSpec;
    /** hidden */
    hidden?: boolean;
    /** ratio of arrow base to cylinder (1.618034 default) */
    radiusRatio?: number;
    /** relative position of arrow base (0.618034 default) */
    mid?: number;
    /** position of arrow base in length units, if negative positioned from end instead of start.  Overrides mid. */
    midpos?: number;
}
/**
 * Cylinder shape specification.
 * @extends ShapeSpec
 *
 */
export interface CylinderSpec extends ShapeSpec {
    /** starting vector */
    start?: XYZ;
    /** ending position */
    end?: XYZ;
    /** radius */
    radius?: number;
    /** Place a cap at the start (none, flat or round) */
    fromCap?: CAP;
    /** Place a cap at the end (none, flat or round) */
    toCap?: CAP;
    /** Make the cylinder dashed. */
    dashed?: boolean;
    /** Length of dashes (default 0.25) */
    dashLength?: number;
    /** Length of gaps (default 0.25) */
    gapLength?: number;
}
/**
 * Curve shape specification.
 * @extends ShapeSpec
 */
export interface CurveSpec extends ShapeSpec {
    /** Sequence of points to draw curve through */
    points?: XYZ[];
    /** amount of interpolation */
    smooth?: number;
    /** radius of curve */
    radius?: number;
    /** if an arrow should be drawn at the start */
    fromArrow?: boolean;
    /** if an arrow should be drawn at the end */
    toArrow?: boolean;
    /** have cap at start */
    fromCap?: CAP;
    /** have cap at end */
    toCap?: CAP;
}
/**
 * Line shape specification.  Default to wireframe.
 * @extends ShapeSpec
 */
export interface LineSpec extends ShapeSpec {
    /** Starting position */
    start?: XYZ;
    /** Ending position */
    end?: XYZ;
    /** make dashed */
    dashed?: boolean;
}
/**
 * Box shape specification.
 * @extends ShapeSpec
 */
export interface BoxSpec extends ShapeSpec {
    /** bottom corner of box */
    corner?: XYZ;
    /** center of box */
    center?: XYZ;
    /** width, height, depth of box */
    dimensions?: {
        w: number | XYZ;
        h: number | XYZ;
        d: number | XYZ;
    };
}
/**
 * Specification for adding custom shape.
 * @extends ShapeSpec
 */
export interface CustomShapeSpec extends ShapeSpec {
    /** List of vertex positions */
    vertexArr?: XYZ[];
    /** List of normal vectors for each vertex */
    normalArr?: XYZ[];
    /** List of triangles to build the custom shape. Each triangle is defined by the indices of 3 vertices in vertexArr, so the array length should be 3 times the number of faces. */
    faceArr?: number[];
}
/**
 * Sphere shape specification. Extends {@link ShapeSpec}.
 */
export interface SphereSpec extends ShapeSpec {
    /** center of sphere */
    center?: XYZ;
    /** radius of sphere */
    radius?: number;
    /** quality metric, higher uses more triangles (default 2) */
    quality?: number;
}
