export default CircleStyle;
export type Options = {
    /**
     * Fill style.
     */
    fill?: import("./Fill.js").default;
    /**
     * Circle radius.
     */
    radius: number;
    /**
     * Stroke style.
     */
    stroke?: import("./Stroke.js").default;
    /**
     * displacement
     */
    displacement?: number[];
};
/**
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} radius Circle radius.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {Array<number>} [displacement=[0,0]] displacement
 */
/**
 * @classdesc
 * Set circle style for vector features.
 * @api
 */
declare class CircleStyle extends RegularShape {
    /**
     * @param {Options=} opt_options Options.
     */
    constructor(opt_options?: Options);
    /**
    * Clones the style.
    * @return {CircleStyle} The cloned style.
    * @override
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
import RegularShape from "./RegularShape.js";
//# sourceMappingURL=Circle.d.ts.map