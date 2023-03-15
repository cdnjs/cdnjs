export default RegularShape;
/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 */
export type Options = {
    /**
     * Fill style.
     */
    fill?: import("./Fill.js").default | undefined;
    /**
     * Number of points for stars and regular polygons. In case of a polygon, the number of points
     * is the number of sides.
     */
    points: number;
    /**
     * Radius of a regular polygon.
     */
    radius?: number | undefined;
    /**
     * First radius of a star. Ignored if radius is set.
     */
    radius1?: number | undefined;
    /**
     * Second radius of a star.
     */
    radius2?: number | undefined;
    /**
     * Shape's angle in radians. A value of 0 will have one of the shape's points facing up.
     */
    angle?: number | undefined;
    /**
     * Displacement of the shape in pixels.
     * Positive values will shift the shape right and up.
     */
    displacement?: number[] | undefined;
    /**
     * Stroke style.
     */
    stroke?: import("./Stroke.js").default | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    rotation?: number | undefined;
    /**
     * Whether to rotate the shape with the view.
     */
    rotateWithView?: boolean | undefined;
    /**
     * Scale. Unless two dimensional scaling is required a better
     * result may be obtained with appropriate settings for `radius`, `radius1` and `radius2`.
     */
    scale?: number | import("../size.js").Size | undefined;
    /**
     * Declutter mode.
     */
    declutterMode?: "declutter" | "obstacle" | "none" | undefined;
};
export type RenderOptions = {
    /**
     * StrokeStyle.
     */
    strokeStyle?: import("../colorlike.js").ColorLike | undefined;
    /**
     * StrokeWidth.
     */
    strokeWidth: number;
    /**
     * Size.
     */
    size: number;
    /**
     * LineDash.
     */
    lineDash: Array<number> | null;
    /**
     * LineDashOffset.
     */
    lineDashOffset: number;
    /**
     * LineJoin.
     */
    lineJoin: CanvasLineJoin;
    /**
     * MiterLimit.
     */
    miterLimit: number;
};
/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} points Number of points for stars and regular polygons. In case of a polygon, the number of points
 * is the number of sides.
 * @property {number} [radius] Radius of a regular polygon.
 * @property {number} [radius1] First radius of a star. Ignored if radius is set.
 * @property {number} [radius2] Second radius of a star.
 * @property {number} [angle=0] Shape's angle in radians. A value of 0 will have one of the shape's points facing up.
 * @property {Array<number>} [displacement=[0, 0]] Displacement of the shape in pixels.
 * Positive values will shift the shape right and up.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view.
 * @property {number|import("../size.js").Size} [scale=1] Scale. Unless two dimensional scaling is required a better
 * result may be obtained with appropriate settings for `radius`, `radius1` and `radius2`.
 * @property {"declutter"|"obstacle"|"none"|undefined} [declutterMode] Declutter mode.
 */
/**
 * @typedef {Object} RenderOptions
 * @property {import("../colorlike.js").ColorLike} [strokeStyle] StrokeStyle.
 * @property {number} strokeWidth StrokeWidth.
 * @property {number} size Size.
 * @property {Array<number>|null} lineDash LineDash.
 * @property {number} lineDashOffset LineDashOffset.
 * @property {CanvasLineJoin} lineJoin LineJoin.
 * @property {number} miterLimit MiterLimit.
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
     * @type {Object<number, HTMLCanvasElement>}
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
     * @type {import("../size.js").Size}
     */
    private size_;
    /**
     * @private
     * @type {RenderOptions}
     */
    private renderOptions_;
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
     * Set the fill style.
     * @param {import("./Fill.js").default} fill Fill style.
     * @api
     */
    setFill(fill: import("./Fill.js").default): void;
    /**
     * @return {HTMLCanvasElement} Image element.
     */
    getHitDetectionImage(): HTMLCanvasElement;
    /**
     * Get the image icon.
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLCanvasElement} Image or Canvas element.
     * @api
     */
    getImage(pixelRatio: number): HTMLCanvasElement;
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
    getRadius2(): number | undefined;
    /**
     * Get the stroke style for the shape.
     * @return {import("./Stroke.js").default} Stroke style.
     * @api
     */
    getStroke(): import("./Stroke.js").default;
    /**
     * Set the stroke style.
     * @param {import("./Stroke.js").default} stroke Stroke style.
     * @api
     */
    setStroke(stroke: import("./Stroke.js").default): void;
    /**
     * Calculate additional canvas size needed for the miter.
     * @param {string} lineJoin Line join
     * @param {number} strokeWidth Stroke width
     * @param {number} miterLimit Miter limit
     * @return {number} Additional canvas size needed
     * @private
     */
    private calculateLineJoinSize_;
    /**
     * @return {RenderOptions}  The render options
     * @protected
     */
    protected createRenderOptions(): RenderOptions;
    /**
     * @protected
     */
    protected render(): void;
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     * @param {CanvasRenderingContext2D} context The rendering context.
     * @param {number} pixelRatio The pixel ratio.
     */
    private draw_;
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     */
    private createHitDetectionCanvas_;
    /**
     * @private
     * @param {CanvasRenderingContext2D} context The context to draw in.
     */
    private createPath_;
    /**
     * @private
     * @param {RenderOptions} renderOptions Render options.
     * @param {CanvasRenderingContext2D} context The context.
     */
    private drawHitDetectionCanvas_;
}
import ImageStyle from "./Image.js";
//# sourceMappingURL=RegularShape.d.ts.map