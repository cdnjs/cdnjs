/**
 * @module ol/style/flat
 */
/**
 * @api
 * @fileoverview Vector layers can be styled with an object literal containing properties for
 * stroke, fill, image, and text styles.  The types below can be composed into a single object.
 * For example, a style with both stroke and fill properties could look like this:
 *
 *     const style = {
 *       'stroke-color': 'yellow',
 *       'stroke-width': 1.5,
 *       'fill-color': 'orange',
 *     };
 *
 * See details about the available properties depending on what type of symbolizer should be applied:
 *  * {@link module:ol/style/flat~FlatStroke Stroke} - properties for applying a stroke to lines and polygons
 *  * {@link module:ol/style/flat~FlatFill Fill} - properties for filling polygons
 *  * {@link module:ol/style/flat~FlatText Text} - properties for labeling points, lines, and polygons
 *  * {@link module:ol/style/flat~FlatIcon Icon} - properties for rendering points with an icon
 *  * {@link module:ol/style/flat~FlatCircle Circle} - properties for rendering points with a circle
 *  * {@link module:ol/style/flat~FlatShape Shape} - properties for rendering points with a regular shape
 *
 * To conditionally apply styles based on a filter, a list of {@link module:ol/style/flat~Rule rules} can be used.
 * For example, to style points with a big orange circle if the population is greater than 1 million and
 * a smaller blue circle otherwise:
 *
 *     const rules = [
 *       {
 *         filter: ['>', ['get', 'population'], 1_000_000],
 *         style: {
 *           'circle-radius': 10,
 *           'circle-fill-color': 'red',
 *         }
 *       },
 *       {
 *         else: true,
 *         style: {
 *           'circle-radius': 5,
 *           'circle-fill-color': 'blue',
 *         },
 *       },
 *     ];
 */
/**
 * A literal boolean (e.g. `true`) or an expression that evaluates to a boolean (e.g. `['>', ['get', 'population'], 1_000_000]`).
 *
 * @typedef {boolean|Array} BooleanExpression
 */
/**
 * A literal string (e.g. `'hello'`) or an expression that evaluates to a string (e.g. `['get', 'greeting']`).
 *
 * @typedef {string|Array} StringExpression
 */
/**
 * A literal number (e.g. `42`) or an expression that evaluates to a number (e.g. `['+', 40, 2]`).
 *
 * @typedef {number|Array} NumberExpression
 */
/**
 * A CSS named color (e.g. `'blue'`), an array of 3 RGB values (e.g. `[0, 255, 0]`), an array of 4 RGBA values
 * (e.g. `[0, 255, 0, 0.5]`), or an expression that evaluates to one of these color types (e.g. `['get', 'color']`).
 *
 * @typedef {import("../color.js").Color|string|Array} ColorExpression
 */
/**
 * An array of numbers (e.g. `[1, 2, 3]`) or an expression that evaluates to the same (e.g. `['get', 'values']`).
 *
 * @typedef {Array<number>|Array} NumberArrayExpression
 */
/**
 * An array of two numbers (e.g. `[10, 20]`) or an expression that evaluates to the same (e.g. `['get', 'size']`).
 *
 * @typedef {number|Array<number>|Array} SizeExpression
 */
/**
 * For static styling, the [layer.setStyle()]{@link module:ol/layer/Vector~VectorLayer#setStyle} method
 * can be called with an object literal that has fill, stroke, text, icon, regular shape, and/or circle properties.
 * @api
 *
 * @typedef {FlatFill & FlatStroke & FlatText & FlatIcon & FlatShape & FlatCircle} FlatStyle
 */
/**
 * A flat style literal or an array of the same.
 *
 * @typedef {FlatStyle|Array<FlatStyle>|Array<Rule>} FlatStyleLike
 */
/**
 * Fill style properties applied to polygon features.
 *
 * @typedef {Object} FlatFill
 * @property {ColorExpression} [fill-color] The fill color.
 * @property {StringExpression} [fill-pattern-src] Fill pattern image URL.
 * @property {SizeExpression} [fill-pattern-size] Fill pattern image size in pixels.
 * Can be used together with `fill-pattern-offset` to define the sub-rectangle to use
 * from a fill pattern image sprite sheet.
 * @property {SizeExpression} [fill-pattern-offset] Fill pattern image offset in pixels.
 */
/**
 * Stroke style properties applied to line strings and polygon boundaries.  To apply a stroke, at least one of
 * `stroke-color` or `stroke-width` must be provided.
 *
 * @typedef {Object} FlatStroke
 * @property {ColorExpression} [stroke-color] The stroke color.
 * @property {NumberExpression} [stroke-width] Stroke pixel width.
 * @property {StringExpression} [stroke-line-cap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {StringExpression} [stroke-line-join='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {NumberArrayExpression} [stroke-line-dash] Line dash pattern.
 * @property {NumberExpression} [stroke-line-dash-offset=0] Line dash offset.
 * @property {NumberExpression} [stroke-miter-limit=10] Miter limit.
 * @property {NumberExpression} [z-index] The zIndex of the style.
 */
/**
 * Label style properties applied to all features.  At a minimum, a `text-value` must be provided.
 *
 * @typedef {Object} FlatText
 * @property {StringExpression} [text-value] Text content (with `\n` for line breaks).
 * @property {StringExpression} [text-font='10px sans-serif'] Font style as [CSS `font`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font) value.
 * @property {NumberExpression} [text-max-angle=Math.PI/4] When `text-placement` is set to `'line'`, allow a maximum angle between adjacent characters.
 * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
 * @property {NumberExpression} [text-offset-x=0] Horizontal text offset in pixels. A positive will shift the text right.
 * @property {NumberExpression} [text-offset-y=0] Vertical text offset in pixels. A positive will shift the text down.
 * @property {BooleanExpression} [text-overflow=false] For polygon labels or when `placement` is set to `'line'`, allow text to exceed
 * the width of the polygon at the label position or the length of the path that it follows.
 * @property {StringExpression} [text-placement='point'] Text placement.
 * @property {NumberExpression} [text-repeat] Repeat interval in pixels. When set, the text will be repeated at this interval. Only available when
 * `text-placement` is set to `'line'`. Overrides `text-align`.
 * @property {SizeExpression} [text-scale] Scale.
 * @property {BooleanExpression} [text-rotate-with-view=false] Whether to rotate the text with the view.
 * @property {NumberExpression} [text-rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {StringExpression} [text-align] Text alignment. Possible values: `'left'`, `'right'`, `'center'`, `'end'` or `'start'`.
 * Default is `'center'` for `'text-placement': 'point'`. For `'text-placement': 'line'`, the default is to let the renderer choose a
 * placement where `text-max-angle` is not exceeded.
 * @property {StringExpression} [text-justify] Text justification within the text box.
 * If not set, text is justified towards the `textAlign` anchor.
 * Otherwise, use options `'left'`, `'center'`, or `'right'` to justify the text within the text box.
 * **Note:** `text-justify` is ignored for immediate rendering and also for `'text-placement': 'line'`.
 * @property {StringExpression} [text-baseline='middle'] Text base line. Possible values: `'bottom'`, `'top'`, `'middle'`, `'alphabetic'`,
 * `'hanging'`, `'ideographic'`.
 * @property {NumberArrayExpression} [text-padding=[0, 0, 0, 0]] Padding in pixels around the text for decluttering and background. The order of
 * values in the array is `[top, right, bottom, left]`.
 * @property {ColorExpression} [text-fill-color] The fill color. Specify `'none'` to avoid hit detection on the fill.
 * @property {ColorExpression} [text-background-fill-color] The fill color.
 * @property {ColorExpression} [text-stroke-color] The stroke color.
 * @property {StringExpression} [text-stroke-line-cap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {StringExpression} [text-stroke-line-join='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {NumberArrayExpression} [text-stroke-line-dash] Line dash pattern.
 * @property {NumberExpression} [text-stroke-line-dash-offset=0] Line dash offset.
 * @property {NumberExpression} [text-stroke-miter-limit=10] Miter limit.
 * @property {NumberExpression} [text-stroke-width] Stroke pixel width.
 * @property {ColorExpression} [text-background-stroke-color] The stroke color.
 * @property {StringExpression} [text-background-stroke-line-cap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {StringExpression} [text-background-stroke-line-join='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {NumberArrayExpression} [text-background-stroke-line-dash] Line dash pattern.
 * @property {NumberExpression} [text-background-stroke-line-dash-offset=0] Line dash offset.
 * @property {NumberExpression} [text-background-stroke-miter-limit=10] Miter limit.
 * @property {NumberExpression} [text-background-stroke-width] Stroke pixel width.
 * @property {import("./Style.js").DeclutterMode} [text-declutter-mode] Declutter mode
 * @property {NumberExpression} [z-index] The zIndex of the style.
 */
/**
 * Icon style properties applied to point features. `icon-src` must be provided to render
 * points with an icon.
 *
 * @typedef {Object} FlatIcon
 * @property {string} [icon-src] Image source URI.
 * @property {NumberArrayExpression} [icon-anchor=[0.5, 0.5]] Anchor. Default value is the icon center.
 * @property {import("./Icon.js").IconOrigin} [icon-anchor-origin='top-left'] Origin of the anchor: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {import("./Icon.js").IconAnchorUnits} [icon-anchor-x-units='fraction'] Units in which the anchor x value is
 * specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
 * the x value in pixels.
 * @property {import("./Icon.js").IconAnchorUnits} [icon-anchor-y-units='fraction'] Units in which the anchor y value is
 * specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
 * the y value in pixels.
 * @property {import("../color.js").Color|string} [icon-color] Color to tint the icon. If not specified,
 * the icon will be left as is.
 * @property {null|string} [icon-cross-origin] The `crossOrigin` attribute for loaded images. Note that you must provide a
 * `icon-cross-origin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {Array<number>} [icon-offset=[0, 0]] Offset, which, together with the size and the offset origin, define the
 * sub-rectangle to use from the original icon image.
 * @property {NumberArrayExpression} [icon-displacement=[0,0]] Displacement of the icon.
 * @property {import("./Icon.js").IconOrigin} [icon-offset-origin='top-left'] Origin of the offset: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {NumberExpression} [icon-opacity=1] Opacity of the icon.
 * @property {SizeExpression} [icon-scale=1] Scale.
 * @property {number} [icon-width] Width of the icon. If not specified, the actual image width will be used. Cannot be combined
 * with `scale`.
 * @property {number} [icon-height] Height of the icon. If not specified, the actual image height will be used. Cannot be combined
 * with `scale`.
 * @property {NumberExpression} [icon-rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {BooleanExpression} [icon-rotate-with-view=false] Whether to rotate the icon with the view.
 * @property {import("../size.js").Size} [icon-size] Icon size in pixel. Can be used together with `icon-offset` to define the
 * sub-rectangle to use from the origin (sprite) icon image.
 * @property {import("./Style.js").DeclutterMode} [icon-declutter-mode] Declutter mode
 * @property {NumberExpression} [z-index] The zIndex of the style.
 */
/**
 * Regular shape style properties for rendering point features.  At least `shape-points` must be provided.
 *
 * @typedef {Object} FlatShape
 * @property {number} [shape-points] Number of points for stars and regular polygons. In case of a polygon, the number of points
 * is the number of sides.
 * @property {ColorExpression} [shape-fill-color] The fill color.
 * @property {ColorExpression} [shape-stroke-color] The stroke color.
 * @property {NumberExpression} [shape-stroke-width] Stroke pixel width.
 * @property {StringExpression} [shape-stroke-line-cap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {StringExpression} [shape-stroke-line-join='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {NumberArrayExpression} [shape-stroke-line-dash] Line dash pattern.
 * @property {NumberExpression} [shape-stroke-line-dash-offset=0] Line dash offset.
 * @property {NumberExpression} [shape-stroke-miter-limit=10] Miter limit.
 * @property {number} [shape-radius] Radius of a regular polygon.
 * @property {number} [shape-radius2] Second radius to make a star instead of a regular polygon.
 * @property {number} [shape-angle=0] Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
 * @property {NumberArrayExpression} [shape-displacement=[0,0]] Displacement of the shape
 * @property {NumberExpression} [shape-rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {BooleanExpression} [shape-rotate-with-view=false] Whether to rotate the shape with the view.
 * @property {SizeExpression} [shape-scale=1] Scale. Unless two dimensional scaling is required a better
 * result may be obtained with appropriate settings for `shape-radius` and `shape-radius2`.
 * @property {import("./Style.js").DeclutterMode} [shape-declutter-mode] Declutter mode.
 * @property {NumberExpression} [z-index] The zIndex of the style.
 */
/**
 * Circle style properties for rendering point features.  At least `circle-radius` must be provided.
 *
 * @typedef {Object} FlatCircle
 * @property {number} [circle-radius] Circle radius.
 * @property {ColorExpression} [circle-fill-color] The fill color.
 * @property {ColorExpression} [circle-stroke-color] The stroke color.
 * @property {NumberExpression} [circle-stroke-width] Stroke pixel width.
 * @property {StringExpression} [circle-stroke-line-cap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {StringExpression} [circle-stroke-line-join='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {NumberArrayExpression} [circle-stroke-line-dash] Line dash pattern.
 * @property {NumberExpression} [circle-stroke-line-dash-offset=0] Line dash offset.
 * @property {NumberExpression} [circle-stroke-miter-limit=10] Miter limit.
 * @property {NumberArrayExpression} [circle-displacement=[0,0]] displacement
 * @property {SizeExpression} [circle-scale=1] Scale. A two dimensional scale will produce an ellipse.
 * Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `circle-radius`.
 * @property {NumberExpression} [circle-rotation=0] Rotation in radians
 * (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
 * @property {BooleanExpression} [circle-rotate-with-view=false] Whether to rotate the shape with the view
 * (meaningful only when used in conjunction with a two dimensional scale).
 * @property {import("./Style.js").DeclutterMode} [circle-declutter-mode] Declutter mode
 * @property {NumberExpression} [z-index] The zIndex of the style.
 */
/**
 * These default style properties are applied when no other style is given.
 *
 * @typedef {Object} DefaultStyle
 * @property {string} fill-color `'rgba(255,255,255,0.4)'`
 * @property {string} stroke-color `'#3399CC'`
 * @property {number} stroke-width `1.25`
 * @property {number} circle-radius `5`
 * @property {string} circle-fill-color `'rgba(255,255,255,0.4)'`
 * @property {number} circle-stroke-width `1.25`
 * @property {string} circle-stroke-color `'#3399CC'`
 */
/**
 * @return {DefaultStyle} The default flat style.
 */
export function createDefaultStyle(): DefaultStyle;
/**
 * A literal boolean (e.g. `true`) or an expression that evaluates to a boolean (e.g. `['>', ['get', 'population'], 1_000_000]`).
 */
export type BooleanExpression = boolean | any[];
/**
 * A literal string (e.g. `'hello'`) or an expression that evaluates to a string (e.g. `['get', 'greeting']`).
 */
export type StringExpression = string | any[];
/**
 * A literal number (e.g. `42`) or an expression that evaluates to a number (e.g. `['+', 40, 2]`).
 */
export type NumberExpression = number | any[];
/**
 * A CSS named color (e.g. `'blue'`), an array of 3 RGB values (e.g. `[0, 255, 0]`), an array of 4 RGBA values
 * (e.g. `[0, 255, 0, 0.5]`), or an expression that evaluates to one of these color types (e.g. `['get', 'color']`).
 */
export type ColorExpression = import("../color.js").Color | string | any[];
/**
 * An array of numbers (e.g. `[1, 2, 3]`) or an expression that evaluates to the same (e.g. `['get', 'values']`).
 */
export type NumberArrayExpression = Array<number> | any[];
/**
 * An array of two numbers (e.g. `[10, 20]`) or an expression that evaluates to the same (e.g. `['get', 'size']`).
 */
export type SizeExpression = number | Array<number> | any[];
/**
 * For static styling, the [layer.setStyle()]{@link module :ol/layer/Vector~VectorLayer#setStyle} method
 * can be called with an object literal that has fill, stroke, text, icon, regular shape, and/or circle properties.
 */
export type FlatStyle = FlatFill & FlatStroke & FlatText & FlatIcon & FlatShape & FlatCircle;
/**
 * A flat style literal or an array of the same.
 */
export type FlatStyleLike = FlatStyle | Array<FlatStyle> | Array<Rule>;
/**
 * Fill style properties applied to polygon features.
 */
export type FlatFill = {
    /**
     * The fill color.
     */
    "fill-color"?: ColorExpression | undefined;
    /**
     * Fill pattern image URL.
     */
    "fill-pattern-src"?: StringExpression | undefined;
    /**
     * Fill pattern image size in pixels.
     * Can be used together with `fill-pattern-offset` to define the sub-rectangle to use
     * from a fill pattern image sprite sheet.
     */
    "fill-pattern-size"?: SizeExpression | undefined;
    /**
     * Fill pattern image offset in pixels.
     */
    "fill-pattern-offset"?: SizeExpression | undefined;
};
/**
 * Stroke style properties applied to line strings and polygon boundaries.  To apply a stroke, at least one of
 * `stroke-color` or `stroke-width` must be provided.
 */
export type FlatStroke = {
    /**
     * The stroke color.
     */
    "stroke-color"?: ColorExpression | undefined;
    /**
     * Stroke pixel width.
     */
    "stroke-width"?: NumberExpression | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    "stroke-line-cap"?: StringExpression | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    "stroke-line-join"?: StringExpression | undefined;
    /**
     * Line dash pattern.
     */
    "stroke-line-dash"?: NumberArrayExpression | undefined;
    /**
     * Line dash offset.
     */
    "stroke-line-dash-offset"?: NumberExpression | undefined;
    /**
     * Miter limit.
     */
    "stroke-miter-limit"?: NumberExpression | undefined;
    /**
     * The zIndex of the style.
     */
    "z-index"?: NumberExpression | undefined;
};
/**
 * Label style properties applied to all features.  At a minimum, a `text-value` must be provided.
 */
export type FlatText = {
    /**
     * Text content (with `\n` for line breaks).
     */
    "text-value"?: StringExpression | undefined;
    /**
     * Font style as [CSS `font`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font) value.
     */
    "text-font"?: StringExpression | undefined;
    /**
     * When `text-placement` is set to `'line'`, allow a maximum angle between adjacent characters.
     * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
     */
    "text-max-angle"?: NumberExpression | undefined;
    /**
     * Horizontal text offset in pixels. A positive will shift the text right.
     */
    "text-offset-x"?: NumberExpression | undefined;
    /**
     * Vertical text offset in pixels. A positive will shift the text down.
     */
    "text-offset-y"?: NumberExpression | undefined;
    /**
     * For polygon labels or when `placement` is set to `'line'`, allow text to exceed
     * the width of the polygon at the label position or the length of the path that it follows.
     */
    "text-overflow"?: BooleanExpression | undefined;
    /**
     * Text placement.
     */
    "text-placement"?: StringExpression | undefined;
    /**
     * Repeat interval in pixels. When set, the text will be repeated at this interval. Only available when
     * `text-placement` is set to `'line'`. Overrides `text-align`.
     */
    "text-repeat"?: NumberExpression | undefined;
    /**
     * Scale.
     */
    "text-scale"?: SizeExpression | undefined;
    /**
     * Whether to rotate the text with the view.
     */
    "text-rotate-with-view"?: BooleanExpression | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    "text-rotation"?: NumberExpression | undefined;
    /**
     * Text alignment. Possible values: `'left'`, `'right'`, `'center'`, `'end'` or `'start'`.
     * Default is `'center'` for `'text-placement': 'point'`. For `'text-placement': 'line'`, the default is to let the renderer choose a
     * placement where `text-max-angle` is not exceeded.
     */
    "text-align"?: StringExpression | undefined;
    /**
     * Text justification within the text box.
     * If not set, text is justified towards the `textAlign` anchor.
     * Otherwise, use options `'left'`, `'center'`, or `'right'` to justify the text within the text box.
     * **Note:** `text-justify` is ignored for immediate rendering and also for `'text-placement': 'line'`.
     */
    "text-justify"?: StringExpression | undefined;
    /**
     * Text base line. Possible values: `'bottom'`, `'top'`, `'middle'`, `'alphabetic'`,
     * `'hanging'`, `'ideographic'`.
     */
    "text-baseline"?: StringExpression | undefined;
    /**
     * Padding in pixels around the text for decluttering and background. The order of
     * values in the array is `[top, right, bottom, left]`.
     */
    "text-padding"?: NumberArrayExpression | undefined;
    /**
     * The fill color. Specify `'none'` to avoid hit detection on the fill.
     */
    "text-fill-color"?: ColorExpression | undefined;
    /**
     * The fill color.
     */
    "text-background-fill-color"?: ColorExpression | undefined;
    /**
     * The stroke color.
     */
    "text-stroke-color"?: ColorExpression | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    "text-stroke-line-cap"?: StringExpression | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    "text-stroke-line-join"?: StringExpression | undefined;
    /**
     * Line dash pattern.
     */
    "text-stroke-line-dash"?: NumberArrayExpression | undefined;
    /**
     * Line dash offset.
     */
    "text-stroke-line-dash-offset"?: NumberExpression | undefined;
    /**
     * Miter limit.
     */
    "text-stroke-miter-limit"?: NumberExpression | undefined;
    /**
     * Stroke pixel width.
     */
    "text-stroke-width"?: NumberExpression | undefined;
    /**
     * The stroke color.
     */
    "text-background-stroke-color"?: ColorExpression | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    "text-background-stroke-line-cap"?: StringExpression | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    "text-background-stroke-line-join"?: StringExpression | undefined;
    /**
     * Line dash pattern.
     */
    "text-background-stroke-line-dash"?: NumberArrayExpression | undefined;
    /**
     * Line dash offset.
     */
    "text-background-stroke-line-dash-offset"?: NumberExpression | undefined;
    /**
     * Miter limit.
     */
    "text-background-stroke-miter-limit"?: NumberExpression | undefined;
    /**
     * Stroke pixel width.
     */
    "text-background-stroke-width"?: NumberExpression | undefined;
    /**
     * Declutter mode
     */
    "text-declutter-mode"?: import("./Style.js").DeclutterMode | undefined;
    /**
     * The zIndex of the style.
     */
    "z-index"?: NumberExpression | undefined;
};
/**
 * Icon style properties applied to point features. `icon-src` must be provided to render
 * points with an icon.
 */
export type FlatIcon = {
    /**
     * Image source URI.
     */
    "icon-src"?: string | undefined;
    /**
     * Anchor. Default value is the icon center.
     */
    "icon-anchor"?: NumberArrayExpression | undefined;
    /**
     * Origin of the anchor: `bottom-left`, `bottom-right`,
     * `top-left` or `top-right`.
     */
    "icon-anchor-origin"?: import("./Icon.js").IconOrigin | undefined;
    /**
     * Units in which the anchor x value is
     * specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
     * the x value in pixels.
     */
    "icon-anchor-x-units"?: import("./Icon.js").IconAnchorUnits | undefined;
    /**
     * Units in which the anchor y value is
     * specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
     * the y value in pixels.
     */
    "icon-anchor-y-units"?: import("./Icon.js").IconAnchorUnits | undefined;
    /**
     * Color to tint the icon. If not specified,
     * the icon will be left as is.
     */
    "icon-color"?: string | import("../color.js").Color | undefined;
    /**
     * The `crossOrigin` attribute for loaded images. Note that you must provide a
     * `icon-cross-origin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    "icon-cross-origin"?: string | null | undefined;
    /**
     * Offset, which, together with the size and the offset origin, define the
     * sub-rectangle to use from the original icon image.
     */
    "icon-offset"?: number[] | undefined;
    /**
     * Displacement of the icon.
     */
    "icon-displacement"?: NumberArrayExpression | undefined;
    /**
     * Origin of the offset: `bottom-left`, `bottom-right`,
     * `top-left` or `top-right`.
     */
    "icon-offset-origin"?: import("./Icon.js").IconOrigin | undefined;
    /**
     * Opacity of the icon.
     */
    "icon-opacity"?: NumberExpression | undefined;
    /**
     * Scale.
     */
    "icon-scale"?: SizeExpression | undefined;
    /**
     * Width of the icon. If not specified, the actual image width will be used. Cannot be combined
     * with `scale`.
     */
    "icon-width"?: number | undefined;
    /**
     * Height of the icon. If not specified, the actual image height will be used. Cannot be combined
     * with `scale`.
     */
    "icon-height"?: number | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    "icon-rotation"?: NumberExpression | undefined;
    /**
     * Whether to rotate the icon with the view.
     */
    "icon-rotate-with-view"?: BooleanExpression | undefined;
    /**
     * Icon size in pixel. Can be used together with `icon-offset` to define the
     * sub-rectangle to use from the origin (sprite) icon image.
     */
    "icon-size"?: import("../size.js").Size | undefined;
    /**
     * Declutter mode
     */
    "icon-declutter-mode"?: import("./Style.js").DeclutterMode | undefined;
    /**
     * The zIndex of the style.
     */
    "z-index"?: NumberExpression | undefined;
};
/**
 * Regular shape style properties for rendering point features.  At least `shape-points` must be provided.
 */
export type FlatShape = {
    /**
     * Number of points for stars and regular polygons. In case of a polygon, the number of points
     * is the number of sides.
     */
    "shape-points"?: number | undefined;
    /**
     * The fill color.
     */
    "shape-fill-color"?: ColorExpression | undefined;
    /**
     * The stroke color.
     */
    "shape-stroke-color"?: ColorExpression | undefined;
    /**
     * Stroke pixel width.
     */
    "shape-stroke-width"?: NumberExpression | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    "shape-stroke-line-cap"?: StringExpression | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    "shape-stroke-line-join"?: StringExpression | undefined;
    /**
     * Line dash pattern.
     */
    "shape-stroke-line-dash"?: NumberArrayExpression | undefined;
    /**
     * Line dash offset.
     */
    "shape-stroke-line-dash-offset"?: NumberExpression | undefined;
    /**
     * Miter limit.
     */
    "shape-stroke-miter-limit"?: NumberExpression | undefined;
    /**
     * Radius of a regular polygon.
     */
    "shape-radius"?: number | undefined;
    /**
     * Second radius to make a star instead of a regular polygon.
     */
    "shape-radius2"?: number | undefined;
    /**
     * Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
     */
    "shape-angle"?: number | undefined;
    /**
     * Displacement of the shape
     */
    "shape-displacement"?: NumberArrayExpression | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    "shape-rotation"?: NumberExpression | undefined;
    /**
     * Whether to rotate the shape with the view.
     */
    "shape-rotate-with-view"?: BooleanExpression | undefined;
    /**
     * Scale. Unless two dimensional scaling is required a better
     * result may be obtained with appropriate settings for `shape-radius` and `shape-radius2`.
     */
    "shape-scale"?: SizeExpression | undefined;
    /**
     * Declutter mode.
     */
    "shape-declutter-mode"?: import("./Style.js").DeclutterMode | undefined;
    /**
     * The zIndex of the style.
     */
    "z-index"?: NumberExpression | undefined;
};
/**
 * Circle style properties for rendering point features.  At least `circle-radius` must be provided.
 */
export type FlatCircle = {
    /**
     * Circle radius.
     */
    "circle-radius"?: number | undefined;
    /**
     * The fill color.
     */
    "circle-fill-color"?: ColorExpression | undefined;
    /**
     * The stroke color.
     */
    "circle-stroke-color"?: ColorExpression | undefined;
    /**
     * Stroke pixel width.
     */
    "circle-stroke-width"?: NumberExpression | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    "circle-stroke-line-cap"?: StringExpression | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    "circle-stroke-line-join"?: StringExpression | undefined;
    /**
     * Line dash pattern.
     */
    "circle-stroke-line-dash"?: NumberArrayExpression | undefined;
    /**
     * Line dash offset.
     */
    "circle-stroke-line-dash-offset"?: NumberExpression | undefined;
    /**
     * Miter limit.
     */
    "circle-stroke-miter-limit"?: NumberExpression | undefined;
    /**
     * displacement
     */
    "circle-displacement"?: NumberArrayExpression | undefined;
    /**
     * Scale. A two dimensional scale will produce an ellipse.
     * Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `circle-radius`.
     */
    "circle-scale"?: SizeExpression | undefined;
    /**
     * Rotation in radians
     * (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
     */
    "circle-rotation"?: NumberExpression | undefined;
    /**
     * Whether to rotate the shape with the view
     * (meaningful only when used in conjunction with a two dimensional scale).
     */
    "circle-rotate-with-view"?: BooleanExpression | undefined;
    /**
     * Declutter mode
     */
    "circle-declutter-mode"?: import("./Style.js").DeclutterMode | undefined;
    /**
     * The zIndex of the style.
     */
    "z-index"?: NumberExpression | undefined;
};
/**
 * These default style properties are applied when no other style is given.
 */
export type DefaultStyle = {
    /**
     * `'rgba(255,255,255,0.4)'`
     */
    "fill-color": string;
    /**
     * `'#3399CC'`
     */
    "stroke-color": string;
    /**
     * `1.25`
     */
    "stroke-width": number;
    /**
     * `5`
     */
    "circle-radius": number;
    /**
     * `'rgba(255,255,255,0.4)'`
     */
    "circle-fill-color": string;
    /**
     * `1.25`
     */
    "circle-stroke-width": number;
    /**
     * `'#3399CC'`
     */
    "circle-stroke-color": string;
};
/**
 * A rule is used to conditionally apply a style.  If the rule's filter evaluates to true,
 * the style will be applied.
 */
export type Rule = {
    /**
     * The style to be applied if the filter matches.
     */
    style: FlatStyle | Array<FlatStyle>;
    /**
     * The filter used
     * to determine if a style applies.  If no filter is included, the rule always applies
     * (unless it is an else rule).
     */
    filter?: import("../expr/expression.js").EncodedExpression | undefined;
    /**
     * If true, the rule applies only if no other previous rule applies.
     * If the else rule also has a filter, the rule will not apply if the filter does not match.
     */
    else?: boolean | undefined;
};
//# sourceMappingURL=flat.d.ts.map