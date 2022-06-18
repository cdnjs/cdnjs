export default RegularShape;
/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 */
export type Options = {
    /**
     * Fill style.
     */
    fill?: import("./Fill.js").default;
    /**
     * Number of points for stars and regular polygons. In case of a polygon, the number of points
     * is the number of sides.
     */
    points: number;
    /**
     * Radius of a regular polygon.
     */
    radius?: number;
    /**
     * Outer radius of a star.
     */
    radius1?: number;
    /**
     * Inner radius of a star.
     */
    radius2?: number;
    /**
     * Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
     */
    angle?: number;
    /**
     * Displacement of the shape
     */
    displacement?: number[];
    /**
     * Stroke style.
     */
    stroke?: import("./Stroke.js").default;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    rotation?: number;
    /**
     * Whether to rotate the shape with the view.
     */
    rotateWithView?: boolean;
};
export type RenderOptions = {
    strokeStyle?: string | CanvasGradient | CanvasPattern;
    strokeWidth: number;
    size: number;
    lineCap: CanvasLineCap;
    lineDash: number[];
    lineDashOffset: number;
    lineJoin: CanvasLineJoin;
    miterLimit: number;
};
/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} points Number of points for stars and regular polygons. In case of a polygon, the number of points
 * is the number of sides.
 * @property {number} [radius] Radius of a regular polygon.
 * @property {number} [radius1] Outer radius of a star.
 * @property {number} [radius2] Inner radius of a star.
 * @property {number} [angle=0] Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
 * @property {Array<number>} [displacement=[0,0]] Displacement of the shape
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view.
 */
/**
 * @typedef {Object} RenderOptions
 * @property {import("../colorlike.js").ColorLike} [strokeStyle]
 * @property {number} strokeWidth
 * @property {number} size
 * @property {CanvasLineCap} lineCap
 * @property {Array<number>} lineDash
 * @property {number} lineDashOffset
 * @property {CanvasLineJoin} lineJoin
 * @property {number} miterLimit
 */
/**
 * @classdesc
 * Set regular shape style for vector features. The resulting shape will be
 * a regular polygon when `radius` is provided, or a star when `radius1` and
 * `radius2` are provided.
 * @api
 */
declare class RegularShape extends ImageStyle {
    /**
     * @param {Options} options Options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    private canvas_;
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    private hitDetectionCanvas_;
    /**
     * @private
     * @type {import("./Fill.js").default}
     */
    private fill_;
    /**
     * @private
     * @type {Array<number>}
     */
    private origin_;
    /**
     * @private
     * @type {number}
     */
    private points_;
    /**
     * @protected
     * @type {number}
     */
    protected radius_: number;
    /**
     * @private
     * @type {number|undefined}
     */
    private radius2_;
    /**
     * @private
     * @type {number}
     */
    private angle_;
    /**
     * @private
     * @type {import("./Stroke.js").default}
     */
    private stroke_;
    /**
     * @private
     * @type {Array<number>}
     */
    private anchor_;
    /**
     * @private
     * @type {import("../size.js").Size}
     */
    private size_;
    /**
     * @private
     * @type {import("../size.js").Size}
     */
    private imageSize_;
    /**
     * @private
     * @type {import("../size.js").Size}
     */
    private hitDetectionImageSize_;
    /**
     * Clones the style.
     * @return {RegularShape} The cloned style.
     * @api
     */
    clone(): RegularShape;
    /**
     * Get the angle used in generating the shape.
     * @return {number} Shape's rotation in radians.
     * @api
     */
    getAngle(): number;
    /**
     * Get the fill style for the shape.
     * @return {import("./Fill.js").default} Fill style.
     * @api
     */
    getFill(): import("./Fill.js").default;
    /**
     * @inheritDoc
     */
    getHitDetectionImage(pixelRatio: any): HTMLCanvasElement;
    /**
     * @inheritDoc
     * @api
     */
    getImage(pixelRatio: any): HTMLCanvasElement;
    /**
     * @inheritDoc
     */
    getImageState(): number;
    /**
     * Get the number of points for generating the shape.
     * @return {number} Number of points for stars and regular polygons.
     * @api
     */
    getPoints(): number;
    /**
     * Get the (primary) radius for the shape.
     * @return {number} Radius.
     * @api
     */
    getRadius(): number;
    /**
     * Get the secondary radius for the shape.
     * @return {number|undefined} Radius2.
     * @api
     */
    getRadius2(): number;
    /**
     * Get the stroke style for the shape.
     * @return {import("./Stroke.js").default} Stroke style.
     * @api
     */
    getStroke(): import("./Stroke.js").default;
    /**
     * @inheritDoc
     */
    listenImageChange(listener: any): void;
    /**
     * @inheritDoc
     */
    unlistenImageChange(listener: any): void;
    /**
     * @protected
     */
    protected render(): void;
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     * @param {CanvasRenderingContext2D} context The rendering context.
     * @param {number} x The origin for the symbol (x).
     * @param {number} y The origin for the symbol (y).
     */
    private draw_;
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     */
    private createHitDetectionCanvas_;
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     * @param {CanvasRenderingContext2D} context The context.
     * @param {number} x The origin for the symbol (x).
     * @param {number} y The origin for the symbol (y).
     */
    private drawHitDetectionCanvas_;
}
import ImageStyle from "./Image.js";
//# sourceMappingURL=RegularShape.d.ts.map