export default CircleStyle;
export type Options = {
    /**
     * Fill style.
     */
    fill?: import("./Fill.js").default | undefined;
    /**
     * Circle radius.
     */
    radius: number;
    /**
     * Stroke style.
     */
    stroke?: import("./Stroke.js").default | undefined;
    /**
     * displacement
     */
    displacement?: number[] | undefined;
    /**
     * Scale. A two dimensional scale will produce an ellipse.
     * Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `radius`.
     */
    scale?: number | import("../size.js").Size | undefined;
    /**
     * Rotation in radians
     * (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
     */
    rotation?: number | undefined;
    /**
     * Whether to rotate the shape with the view
     * (meaningful only when used in conjunction with a two dimensional scale).
     */
    rotateWithView?: boolean | undefined;
    /**
     * Declutter mode
     */
    declutterMode?: import("./Style.js").DeclutterMode | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} radius Circle radius.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {Array<number>} [displacement=[0,0]] displacement
 * @property {number|import("../size.js").Size} [scale=1] Scale. A two dimensional scale will produce an ellipse.
 * Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `radius`.
 * @property {number} [rotation=0] Rotation in radians
 * (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view
 * (meaningful only when used in conjunction with a two dimensional scale).
 * @property {import('./Style.js').DeclutterMode} [declutterMode] Declutter mode
 */
/**
 * @classdesc
 * Set circle style for vector features.
 * @api
 */
declare class CircleStyle extends RegularShape {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
    /**
     * Clones the style.
     * @return {CircleStyle} The cloned style.
     * @api
     */
    clone(): CircleStyle;
    /**
     * Set the circle radius.
     *
     * @param {number} radius Circle radius.
     * @api
     */
    setRadius(radius: number): void;
}
import RegularShape from './RegularShape.js';
//# sourceMappingURL=Circle.d.ts.map