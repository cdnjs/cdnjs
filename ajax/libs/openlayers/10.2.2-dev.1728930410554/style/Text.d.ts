export default Text;
/**
 * Default text placement is `'point'`. Note that
 * `'line'` requires the underlying geometry to be a {@link module :ol/geom/LineString~LineString},
 * {@link module :ol/geom/Polygon~Polygon}, {@link module :ol/geom/MultiLineString~MultiLineString} or
 * {@link module :ol/geom/MultiPolygon~MultiPolygon}.
 */
export type TextPlacement = "point" | "line";
export type TextJustify = "left" | "center" | "right";
export type Options = {
    /**
     * Font style as CSS `font` value, see:
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is `'10px sans-serif'`
     */
    font?: string | undefined;
    /**
     * When `placement` is set to `'line'`, allow a maximum angle between adjacent characters.
     * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
     */
    maxAngle?: number | undefined;
    /**
     * Horizontal text offset in pixels. A positive will shift the text right.
     */
    offsetX?: number | undefined;
    /**
     * Vertical text offset in pixels. A positive will shift the text down.
     */
    offsetY?: number | undefined;
    /**
     * For polygon labels or when `placement` is set to `'line'`, allow text to exceed
     * the width of the polygon at the label position or the length of the path that it follows.
     */
    overflow?: boolean | undefined;
    /**
     * Text placement.
     */
    placement?: TextPlacement | undefined;
    /**
     * Repeat interval. When set, the text will be repeated at this interval, which specifies
     * the distance between two text anchors in pixels. Only available when `placement` is set to `'line'`. Overrides 'textAlign'.
     */
    repeat?: number | undefined;
    /**
     * Scale.
     */
    scale?: number | import("../size.js").Size | undefined;
    /**
     * Whether to rotate the text with the view.
     */
    rotateWithView?: boolean | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    rotation?: number | undefined;
    /**
     * Text content or rich text content. For plain text provide a string, which can
     * contain line breaks (`\n`). For rich text provide an array of text/font tuples. A tuple consists of the text to
     * render and the font to use (or `''` to use the text style's font). A line break has to be a separate tuple (i.e. `'\n', ''`).
     * **Example:** `['foo', 'bold 10px sans-serif', ' bar', 'italic 10px sans-serif', ' baz', '']` will yield "**foo** *bar* baz".
     * **Note:** Rich text is not supported for `placement: 'line'` or the immediate rendering API.
     */
    text?: string | string[] | undefined;
    /**
     * Text alignment. Possible values: `'left'`, `'right'`, `'center'`, `'end'` or `'start'`.
     * Default is `'center'` for `placement: 'point'`. For `placement: 'line'`, the default is to let the renderer choose a
     * placement where `maxAngle` is not exceeded.
     */
    textAlign?: CanvasTextAlign | undefined;
    /**
     * Text justification within the text box.
     * If not set, text is justified towards the `textAlign` anchor.
     * Otherwise, use options `'left'`, `'center'`, or `'right'` to justify the text within the text box.
     * **Note:** `justify` is ignored for immediate rendering and also for `placement: 'line'`.
     */
    justify?: TextJustify | undefined;
    /**
     * Text base line. Possible values: `'bottom'`, `'top'`, `'middle'`, `'alphabetic'`,
     * `'hanging'`, `'ideographic'`.
     */
    textBaseline?: CanvasTextBaseline | undefined;
    /**
     * Fill style. If none is provided, we'll use a dark fill-style (#333). Specify `null` for no fill.
     */
    fill?: Fill | null | undefined;
    /**
     * Stroke style.
     */
    stroke?: import("./Stroke.js").default | undefined;
    /**
     * Fill style for the text background when `placement` is
     * `'point'`. Default is no fill.
     */
    backgroundFill?: Fill | undefined;
    /**
     * Stroke style for the text background  when `placement`
     * is `'point'`. Default is no stroke.
     */
    backgroundStroke?: import("./Stroke.js").default | undefined;
    /**
     * Padding in pixels around the text for decluttering and background. The order of
     * values in the array is `[top, right, bottom, left]`.
     */
    padding?: number[] | undefined;
    /**
     * Declutter mode: `declutter`, `obstacle`, `none`
     */
    declutterMode?: import("../style/Style.js").DeclutterMode | undefined;
};
/**
 * @typedef {Object} Options
 * @property {string} [font] Font style as CSS `font` value, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is `'10px sans-serif'`
 * @property {number} [maxAngle=Math.PI/4] When `placement` is set to `'line'`, allow a maximum angle between adjacent characters.
 * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
 * @property {number} [offsetX=0] Horizontal text offset in pixels. A positive will shift the text right.
 * @property {number} [offsetY=0] Vertical text offset in pixels. A positive will shift the text down.
 * @property {boolean} [overflow=false] For polygon labels or when `placement` is set to `'line'`, allow text to exceed
 * the width of the polygon at the label position or the length of the path that it follows.
 * @property {TextPlacement} [placement='point'] Text placement.
 * @property {number} [repeat] Repeat interval. When set, the text will be repeated at this interval, which specifies
 * the distance between two text anchors in pixels. Only available when `placement` is set to `'line'`. Overrides 'textAlign'.
 * @property {number|import("../size.js").Size} [scale] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the text with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {string|Array<string>} [text] Text content or rich text content. For plain text provide a string, which can
 * contain line breaks (`\n`). For rich text provide an array of text/font tuples. A tuple consists of the text to
 * render and the font to use (or `''` to use the text style's font). A line break has to be a separate tuple (i.e. `'\n', ''`).
 * **Example:** `['foo', 'bold 10px sans-serif', ' bar', 'italic 10px sans-serif', ' baz', '']` will yield "**foo** *bar* baz".
 * **Note:** Rich text is not supported for `placement: 'line'` or the immediate rendering API.
 * @property {CanvasTextAlign} [textAlign] Text alignment. Possible values: `'left'`, `'right'`, `'center'`, `'end'` or `'start'`.
 * Default is `'center'` for `placement: 'point'`. For `placement: 'line'`, the default is to let the renderer choose a
 * placement where `maxAngle` is not exceeded.
 * @property {TextJustify} [justify] Text justification within the text box.
 * If not set, text is justified towards the `textAlign` anchor.
 * Otherwise, use options `'left'`, `'center'`, or `'right'` to justify the text within the text box.
 * **Note:** `justify` is ignored for immediate rendering and also for `placement: 'line'`.
 * @property {CanvasTextBaseline} [textBaseline='middle'] Text base line. Possible values: `'bottom'`, `'top'`, `'middle'`, `'alphabetic'`,
 * `'hanging'`, `'ideographic'`.
 * @property {import("./Fill.js").default|null} [fill] Fill style. If none is provided, we'll use a dark fill-style (#333). Specify `null` for no fill.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Fill.js").default} [backgroundFill] Fill style for the text background when `placement` is
 * `'point'`. Default is no fill.
 * @property {import("./Stroke.js").default} [backgroundStroke] Stroke style for the text background  when `placement`
 * is `'point'`. Default is no stroke.
 * @property {Array<number>} [padding=[0, 0, 0, 0]] Padding in pixels around the text for decluttering and background. The order of
 * values in the array is `[top, right, bottom, left]`.
 * @property {import('../style/Style.js').DeclutterMode} [declutterMode] Declutter mode: `declutter`, `obstacle`, `none`
 */
/**
 * @classdesc
 * Set text style for vector features.
 * @api
 */
declare class Text {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
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
     * @type {string|Array<string>|undefined}
     */
    private text_;
    /**
     * @private
     * @type {CanvasTextAlign|undefined}
     */
    private textAlign_;
    /**
     * @private
     * @type {TextJustify|undefined}
     */
    private justify_;
    /**
     * @private
     * @type {number|undefined}
     */
    private repeat_;
    /**
     * @private
     * @type {CanvasTextBaseline|undefined}
     */
    private textBaseline_;
    /**
     * @private
     * @type {import("./Fill.js").default|null}
     */
    private fill_;
    /**
     * @private
     * @type {number}
     */
    private maxAngle_;
    /**
     * @private
     * @type {TextPlacement}
     */
    private placement_;
    /**
     * @private
     * @type {boolean}
     */
    private overflow_;
    /**
     * @private
     * @type {import("./Stroke.js").default|null}
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
     * @type {import("./Fill.js").default|null}
     */
    private backgroundFill_;
    /**
     * @private
     * @type {import("./Stroke.js").default|null}
     */
    private backgroundStroke_;
    /**
     * @private
     * @type {Array<number>|null}
     */
    private padding_;
    /**
     * @private
     * @type {import('../style/Style.js').DeclutterMode}
     */
    private declutterMode_;
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
     * @return {TextPlacement} Text placement.
     * @api
     */
    getPlacement(): TextPlacement;
    /**
     * Get the repeat interval of the text.
     * @return {number|undefined} Repeat interval in pixels.
     * @api
     */
    getRepeat(): number | undefined;
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
     * @return {import("./Fill.js").default|null} Fill style.
     * @api
     */
    getFill(): import("./Fill.js").default | null;
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
    getScale(): number | import("../size.js").Size | undefined;
    /**
     * Get the symbolizer scale array.
     * @return {import("../size.js").Size} Scale array.
     */
    getScaleArray(): import("../size.js").Size;
    /**
     * Get the stroke style for the text.
     * @return {import("./Stroke.js").default|null} Stroke style.
     * @api
     */
    getStroke(): import("./Stroke.js").default | null;
    /**
     * Get the text to be rendered.
     * @return {string|Array<string>|undefined} Text.
     * @api
     */
    getText(): string | Array<string> | undefined;
    /**
     * Get the text alignment.
     * @return {CanvasTextAlign|undefined} Text align.
     * @api
     */
    getTextAlign(): CanvasTextAlign | undefined;
    /**
     * Get the justification.
     * @return {TextJustify|undefined} Justification.
     * @api
     */
    getJustify(): TextJustify | undefined;
    /**
     * Get the text baseline.
     * @return {CanvasTextBaseline|undefined} Text baseline.
     * @api
     */
    getTextBaseline(): CanvasTextBaseline | undefined;
    /**
     * Get the background fill style for the text.
     * @return {import("./Fill.js").default|null} Fill style.
     * @api
     */
    getBackgroundFill(): import("./Fill.js").default | null;
    /**
     * Get the background stroke style for the text.
     * @return {import("./Stroke.js").default|null} Stroke style.
     * @api
     */
    getBackgroundStroke(): import("./Stroke.js").default | null;
    /**
     * Get the padding for the text.
     * @return {Array<number>|null} Padding.
     * @api
     */
    getPadding(): Array<number> | null;
    /**
     * Get the declutter mode of the shape
     * @return {import("./Style.js").DeclutterMode} Shape's declutter mode
     * @api
     */
    getDeclutterMode(): import("./Style.js").DeclutterMode;
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
     * @param {TextPlacement} placement Placement.
     * @api
     */
    setPlacement(placement: TextPlacement): void;
    /**
     * Set the repeat interval of the text.
     * @param {number|undefined} [repeat] Repeat interval in pixels.
     * @api
     */
    setRepeat(repeat?: number | undefined): void;
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
     * @param {import("./Fill.js").default|null} fill Fill style.
     * @api
     */
    setFill(fill: import("./Fill.js").default | null): void;
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
    setScale(scale: number | import("../size.js").Size | undefined): void;
    /**
     * Set the stroke.
     *
     * @param {import("./Stroke.js").default|null} stroke Stroke style.
     * @api
     */
    setStroke(stroke: import("./Stroke.js").default | null): void;
    /**
     * Set the text.
     *
     * @param {string|Array<string>|undefined} text Text.
     * @api
     */
    setText(text: string | Array<string> | undefined): void;
    /**
     * Set the text alignment.
     *
     * @param {CanvasTextAlign|undefined} textAlign Text align.
     * @api
     */
    setTextAlign(textAlign: CanvasTextAlign | undefined): void;
    /**
     * Set the justification.
     *
     * @param {TextJustify|undefined} justify Justification.
     * @api
     */
    setJustify(justify: TextJustify | undefined): void;
    /**
     * Set the text baseline.
     *
     * @param {CanvasTextBaseline|undefined} textBaseline Text baseline.
     * @api
     */
    setTextBaseline(textBaseline: CanvasTextBaseline | undefined): void;
    /**
     * Set the background fill.
     *
     * @param {import("./Fill.js").default|null} fill Fill style.
     * @api
     */
    setBackgroundFill(fill: import("./Fill.js").default | null): void;
    /**
     * Set the background stroke.
     *
     * @param {import("./Stroke.js").default|null} stroke Stroke style.
     * @api
     */
    setBackgroundStroke(stroke: import("./Stroke.js").default | null): void;
    /**
     * Set the padding (`[top, right, bottom, left]`).
     *
     * @param {Array<number>|null} padding Padding.
     * @api
     */
    setPadding(padding: Array<number> | null): void;
}
import Fill from './Fill.js';
//# sourceMappingURL=Text.d.ts.map