export default Text;
export type Options = {
    /**
     * Font style as CSS 'font' value, see:
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is '10px sans-serif'
     */
    font?: string;
    /**
     * When `placement` is set to `'line'`, allow a maximum angle between adjacent characters.
     * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
     */
    maxAngle?: number;
    /**
     * Horizontal text offset in pixels. A positive will shift the text right.
     */
    offsetX?: number;
    /**
     * Vertical text offset in pixels. A positive will shift the text down.
     */
    offsetY?: number;
    /**
     * For polygon labels or when `placement` is set to `'line'`, allow text to exceed
     * the width of the polygon at the label position or the length of the path that it follows.
     */
    overflow?: boolean;
    /**
     * Text placement.
     */
    placement?: any;
    /**
     * Scale.
     */
    scale?: number | number[];
    /**
     * Whether to rotate the text with the view.
     */
    rotateWithView?: boolean;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    rotation?: number;
    /**
     * Text content.
     */
    text?: string;
    /**
     * Text alignment. Possible values: 'left', 'right', 'center', 'end' or 'start'.
     * Default is 'center' for `placement: 'point'`. For `placement: 'line'`, the default is to let the renderer choose a
     * placement where `maxAngle` is not exceeded.
     */
    textAlign?: string;
    /**
     * Text base line. Possible values: 'bottom', 'top', 'middle', 'alphabetic',
     * 'hanging', 'ideographic'.
     */
    textBaseline?: string;
    /**
     * Fill style. If none is provided, we'll use a dark fill-style (#333).
     */
    fill?: Fill;
    /**
     * Stroke style.
     */
    stroke?: import("./Stroke.js").default;
    /**
     * Fill style for the text background when `placement` is
     * `'point'`. Default is no fill.
     */
    backgroundFill?: Fill;
    /**
     * Stroke style for the text background  when `placement`
     * is `'point'`. Default is no stroke.
     */
    backgroundStroke?: import("./Stroke.js").default;
    /**
     * Padding in pixels around the text for decluttering and background. The order of
     * values in the array is `[top, right, bottom, left]`.
     */
    padding?: number[];
};
/**
 * @typedef {Object} Options
 * @property {string} [font] Font style as CSS 'font' value, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is '10px sans-serif'
 * @property {number} [maxAngle=Math.PI/4] When `placement` is set to `'line'`, allow a maximum angle between adjacent characters.
 * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
 * @property {number} [offsetX=0] Horizontal text offset in pixels. A positive will shift the text right.
 * @property {number} [offsetY=0] Vertical text offset in pixels. A positive will shift the text down.
 * @property {boolean} [overflow=false] For polygon labels or when `placement` is set to `'line'`, allow text to exceed
 * the width of the polygon at the label position or the length of the path that it follows.
 * @property {import("./TextPlacement.js").default|string} [placement='point'] Text placement.
 * @property {number|import("../size.js").Size} [scale] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the text with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {string} [text] Text content.
 * @property {string} [textAlign] Text alignment. Possible values: 'left', 'right', 'center', 'end' or 'start'.
 * Default is 'center' for `placement: 'point'`. For `placement: 'line'`, the default is to let the renderer choose a
 * placement where `maxAngle` is not exceeded.
 * @property {string} [textBaseline='middle'] Text base line. Possible values: 'bottom', 'top', 'middle', 'alphabetic',
 * 'hanging', 'ideographic'.
 * @property {import("./Fill.js").default} [fill] Fill style. If none is provided, we'll use a dark fill-style (#333).
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Fill.js").default} [backgroundFill] Fill style for the text background when `placement` is
 * `'point'`. Default is no fill.
 * @property {import("./Stroke.js").default} [backgroundStroke] Stroke style for the text background  when `placement`
 * is `'point'`. Default is no stroke.
 * @property {Array<number>} [padding=[0, 0, 0, 0]] Padding in pixels around the text for decluttering and background. The order of
 * values in the array is `[top, right, bottom, left]`.
 */
/**
 * @classdesc
 * Set text style for vector features.
 * @api
 */
declare class Text {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @private
     * @type {string|undefined}
     */
    private font_;
    /**
     * @private
     * @type {number|undefined}
     */
    private rotation_;
    /**
     * @private
     * @type {boolean|undefined}
     */
    private rotateWithView_;
    /**
     * @private
     * @type {number|import("../size.js").Size|undefined}
     */
    private scale_;
    /**
     * @private
     * @type {import("../size.js").Size}
     */
    private scaleArray_;
    /**
     * @private
     * @type {string|undefined}
     */
    private text_;
    /**
     * @private
     * @type {string|undefined}
     */
    private textAlign_;
    /**
     * @private
     * @type {string|undefined}
     */
    private textBaseline_;
    /**
     * @private
     * @type {import("./Fill.js").default}
     */
    private fill_;
    /**
     * @private
     * @type {number}
     */
    private maxAngle_;
    /**
     * @private
     * @type {import("./TextPlacement.js").default|string}
     */
    private placement_;
    /**
     * @private
     * @type {boolean}
     */
    private overflow_;
    /**
     * @private
     * @type {import("./Stroke.js").default}
     */
    private stroke_;
    /**
     * @private
     * @type {number}
     */
    private offsetX_;
    /**
     * @private
     * @type {number}
     */
    private offsetY_;
    /**
     * @private
     * @type {import("./Fill.js").default}
     */
    private backgroundFill_;
    /**
     * @private
     * @type {import("./Stroke.js").default}
     */
    private backgroundStroke_;
    /**
     * @private
     * @type {Array<number>}
     */
    private padding_;
    /**
     * Clones the style.
     * @return {Text} The cloned style.
     * @api
     */
    clone(): Text;
    /**
     * Get the `overflow` configuration.
     * @return {boolean} Let text overflow the length of the path they follow.
     * @api
     */
    getOverflow(): boolean;
    /**
     * Get the font name.
     * @return {string|undefined} Font.
     * @api
     */
    getFont(): string | undefined;
    /**
     * Get the maximum angle between adjacent characters.
     * @return {number} Angle in radians.
     * @api
     */
    getMaxAngle(): number;
    /**
     * Get the label placement.
     * @return {import("./TextPlacement.js").default|string} Text placement.
     * @api
     */
    getPlacement(): any;
    /**
     * Get the x-offset for the text.
     * @return {number} Horizontal text offset.
     * @api
     */
    getOffsetX(): number;
    /**
     * Get the y-offset for the text.
     * @return {number} Vertical text offset.
     * @api
     */
    getOffsetY(): number;
    /**
     * Get the fill style for the text.
     * @return {import("./Fill.js").default} Fill style.
     * @api
     */
    getFill(): Fill;
    /**
     * Determine whether the text rotates with the map.
     * @return {boolean|undefined} Rotate with map.
     * @api
     */
    getRotateWithView(): boolean | undefined;
    /**
     * Get the text rotation.
     * @return {number|undefined} Rotation.
     * @api
     */
    getRotation(): number | undefined;
    /**
     * Get the text scale.
     * @return {number|import("../size.js").Size|undefined} Scale.
     * @api
     */
    getScale(): number | number[] | undefined;
    /**
     * Get the symbolizer scale array.
     * @return {import("../size.js").Size} Scale array.
     */
    getScaleArray(): number[];
    /**
     * Get the stroke style for the text.
     * @return {import("./Stroke.js").default} Stroke style.
     * @api
     */
    getStroke(): import("./Stroke.js").default;
    /**
     * Get the text to be rendered.
     * @return {string|undefined} Text.
     * @api
     */
    getText(): string | undefined;
    /**
     * Get the text alignment.
     * @return {string|undefined} Text align.
     * @api
     */
    getTextAlign(): string | undefined;
    /**
     * Get the text baseline.
     * @return {string|undefined} Text baseline.
     * @api
     */
    getTextBaseline(): string | undefined;
    /**
     * Get the background fill style for the text.
     * @return {import("./Fill.js").default} Fill style.
     * @api
     */
    getBackgroundFill(): Fill;
    /**
     * Get the background stroke style for the text.
     * @return {import("./Stroke.js").default} Stroke style.
     * @api
     */
    getBackgroundStroke(): import("./Stroke.js").default;
    /**
     * Get the padding for the text.
     * @return {Array<number>} Padding.
     * @api
     */
    getPadding(): number[];
    /**
     * Set the `overflow` property.
     *
     * @param {boolean} overflow Let text overflow the path that it follows.
     * @api
     */
    setOverflow(overflow: boolean): void;
    /**
     * Set the font.
     *
     * @param {string|undefined} font Font.
     * @api
     */
    setFont(font: string | undefined): void;
    /**
     * Set the maximum angle between adjacent characters.
     *
     * @param {number} maxAngle Angle in radians.
     * @api
     */
    setMaxAngle(maxAngle: number): void;
    /**
     * Set the x offset.
     *
     * @param {number} offsetX Horizontal text offset.
     * @api
     */
    setOffsetX(offsetX: number): void;
    /**
     * Set the y offset.
     *
     * @param {number} offsetY Vertical text offset.
     * @api
     */
    setOffsetY(offsetY: number): void;
    /**
     * Set the text placement.
     *
     * @param {import("./TextPlacement.js").default|string} placement Placement.
     * @api
     */
    setPlacement(placement: any): void;
    /**
     * Set whether to rotate the text with the view.
     *
     * @param {boolean} rotateWithView Rotate with map.
     * @api
     */
    setRotateWithView(rotateWithView: boolean): void;
    /**
     * Set the fill.
     *
     * @param {import("./Fill.js").default} fill Fill style.
     * @api
     */
    setFill(fill: Fill): void;
    /**
     * Set the rotation.
     *
     * @param {number|undefined} rotation Rotation.
     * @api
     */
    setRotation(rotation: number | undefined): void;
    /**
     * Set the scale.
     *
     * @param {number|import("../size.js").Size|undefined} scale Scale.
     * @api
     */
    setScale(scale: number | number[] | undefined): void;
    /**
     * Set the stroke.
     *
     * @param {import("./Stroke.js").default} stroke Stroke style.
     * @api
     */
    setStroke(stroke: import("./Stroke.js").default): void;
    /**
     * Set the text.
     *
     * @param {string|undefined} text Text.
     * @api
     */
    setText(text: string | undefined): void;
    /**
     * Set the text alignment.
     *
     * @param {string|undefined} textAlign Text align.
     * @api
     */
    setTextAlign(textAlign: string | undefined): void;
    /**
     * Set the text baseline.
     *
     * @param {string|undefined} textBaseline Text baseline.
     * @api
     */
    setTextBaseline(textBaseline: string | undefined): void;
    /**
     * Set the background fill.
     *
     * @param {import("./Fill.js").default} fill Fill style.
     * @api
     */
    setBackgroundFill(fill: Fill): void;
    /**
     * Set the background stroke.
     *
     * @param {import("./Stroke.js").default} stroke Stroke style.
     * @api
     */
    setBackgroundStroke(stroke: import("./Stroke.js").default): void;
    /**
     * Set the padding (`[top, right, bottom, left]`).
     *
     * @param {!Array<number>} padding Padding.
     * @api
     */
    setPadding(padding: number[]): void;
}
import Fill from "./Fill.js";
//# sourceMappingURL=Text.d.ts.map