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
 * @typedef {FlatStyle|Array<FlatStyle>} FlatStyleLike
 */
/**
 * Fill style properties applied to polygon features.
 *
 * @typedef {Object} FlatFill
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [fill-color] The fill color.
 */
/**
 * Stroke style properties applied to line strings and polygon boundaries.  To apply a stroke, at least one of
 * `stroke-color` or `stroke-width` must be provided.
 *
 * @typedef {Object} FlatStroke
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [stroke-color] The stroke color.
 * @property {number} [stroke-width] Stroke pixel width.
 * @property {CanvasLineCap} [stroke-line-cap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {CanvasLineJoin} [stroke-line-join='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {Array<number>} [stroke-line-dash] Line dash pattern.
 * @property {number} [stroke-line-dash-offset=0] Line dash offset.
 * @property {number} [stroke-miter-limit=10] Miter limit.
 */
/**
 * Label style properties applied to all features.  At a minimum, a `text-value` must be provided.
 *
 * @typedef {Object} FlatText
 * @property {string|Array<string>} [text-value] Text content or rich text content. For plain text provide a string, which can
 * contain line breaks (`\n`). For rich text provide an array of text/font tuples. A tuple consists of the text to
 * render and the font to use (or `''` to use the text style's font). A line break has to be a separate tuple (i.e. `'\n', ''`).
 * **Example:** `['foo', 'bold 10px sans-serif', ' bar', 'italic 10px sans-serif', ' baz', '']` will yield "**foo** *bar* baz".
 * **Note:** Rich text is not supported for the immediate rendering API.
 * @property {string} [text-font] Font style as CSS `font` value, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is `'10px sans-serif'`
 * @property {number} [text-max-angle=Math.PI/4] When `text-placement` is set to `'line'`, allow a maximum angle between adjacent characters.
 * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
 * @property {number} [text-offset-x=0] Horizontal text offset in pixels. A positive will shift the text right.
 * @property {number} [text-offset-y=0] Vertical text offset in pixels. A positive will shift the text down.
 * @property {boolean} [text-overflow=false] For polygon labels or when `placement` is set to `'line'`, allow text to exceed
 * the width of the polygon at the label position or the length of the path that it follows.
 * @property {import("./Text.js").TextPlacement} [text-placement='point'] Text placement.
 * @property {number} [text-repeat] Repeat interval in pixels. When set, the text will be repeated at this interval. Only available when
 * `text-placement` is set to `'line'`. Overrides `text-align`.
 * @property {number|import("../size.js").Size} [text-scale] Scale.
 * @property {boolean} [text-rotate-with-view=false] Whether to rotate the text with the view.
 * @property {number} [text-rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {CanvasTextAlign} [text-align] Text alignment. Possible values: `'left'`, `'right'`, `'center'`, `'end'` or `'start'`.
 * Default is `'center'` for `text-placement: 'point'`. For `text-placement: 'line'`, the default is to let the renderer choose a
 * placement where `text-max-angle` is not exceeded.
 * @property {import('./Text.js').TextJustify} [text-justify] Text justification within the text box.
 * If not set, text is justified towards the `textAlign` anchor.
 * Otherwise, use options `'left'`, `'center'`, or `'right'` to justify the text within the text box.
 * **Note:** `text-justify` is ignored for immediate rendering and also for `text-placement: 'line'`.
 * @property {CanvasTextBaseline} [text-baseline='middle'] Text base line. Possible values: `'bottom'`, `'top'`, `'middle'`, `'alphabetic'`,
 * `'hanging'`, `'ideographic'`.
 * @property {Array<number>} [text-padding=[0, 0, 0, 0]] Padding in pixels around the text for decluttering and background. The order of
 * values in the array is `[top, right, bottom, left]`.
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [text-fill-color] The fill color.
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [text-background-fill-color] The fill color.
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [text-stroke-color] The stroke color.
 * @property {CanvasLineCap} [text-stroke-line-cap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {CanvasLineJoin} [text-stroke-line-join='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {Array<number>} [text-stroke-line-dash] Line dash pattern.
 * @property {number} [text-stroke-line-dash-offset=0] Line dash offset.
 * @property {number} [text-stroke-miter-limit=10] Miter limit.
 * @property {number} [text-stroke-width] Stroke pixel width.
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [text-background-stroke-color] The stroke color.
 * @property {CanvasLineCap} [text-background-stroke-line-cap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {CanvasLineJoin} [text-background-stroke-line-join='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {Array<number>} [text-background-stroke-line-dash] Line dash pattern.
 * @property {number} [text-background-stroke-line-dash-offset=0] Line dash offset.
 * @property {number} [text-background-stroke-miter-limit=10] Miter limit.
 * @property {number} [text-background-stroke-width] Stroke pixel width.
 */
/**
 * Icon style properties applied to point features.  One of `icon-src` or `icon-img` must be provided to render
 * points with an icon.
 *
 * @typedef {Object} FlatIcon
 * @property {string} [icon-src] Image source URI.
 * @property {HTMLImageElement|HTMLCanvasElement} [icon-img] Image object for the icon. If the `icon-src` option is not provided then the
 * provided image must already be loaded. And in that case, it is required
 * to provide the size of the image, with the `icon-img-size` option.
 * @property {import("../size.js").Size} [icon-img-size] Image size in pixels. Only required if `icon-img` is set and `icon-src` is not.
 * The provided size needs to match the actual size of the image.
 * @property {Array<number>} [icon-anchor=[0.5, 0.5]] Anchor. Default value is the icon center.
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
 * @property {Array<number>} [icon-displacement=[0,0]] Displacement of the icon.
 * @property {import("./Icon.js").IconOrigin} [icon-offset-origin='top-left'] Origin of the offset: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {number} [icon-opacity=1] Opacity of the icon.
 * @property {number|import("../size.js").Size} [icon-scale=1] Scale.
 * @property {number} [icon-rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {boolean} [icon-rotate-with-view=false] Whether to rotate the icon with the view.
 * @property {import("../size.js").Size} [icon-size] Icon size in pixel. Can be used together with `icon-offset` to define the
 * sub-rectangle to use from the origin (sprite) icon image.
 * @property {"declutter"|"obstacle"|"none"|undefined} [icon-declutter-mode] Declutter mode
 */
/**
 * Regular shape style properties for rendering point features.  At least `shape-points` must be provided.
 *
 * @typedef {Object} FlatShape
 * @property {number} [shape-points] Number of points for stars and regular polygons. In case of a polygon, the number of points
 * is the number of sides.
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [shape-fill-color] The fill color.
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [shape-stroke-color] The stroke color.
 * @property {number} [shape-stroke-width] Stroke pixel width.
 * @property {CanvasLineCap} [shape-stroke-line-cap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {CanvasLineJoin} [shape-stroke-line-join='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {Array<number>} [shape-stroke-line-dash] Line dash pattern.
 * @property {number} [shape-stroke-line-dash-offset=0] Line dash offset.
 * @property {number} [shape-stroke-miter-limit=10] Miter limit.
 * @property {number} [shape-radius] Radius of a regular polygon.
 * @property {number} [shape-radius1] First radius of a star. Ignored if radius is set.
 * @property {number} [shape-radius2] Second radius of a star.
 * @property {number} [shape-angle=0] Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
 * @property {Array<number>} [shape-displacement=[0,0]] Displacement of the shape
 * @property {number} [shape-rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {boolean} [shape-rotate-with-view=false] Whether to rotate the shape with the view.
 * @property {number|import("../size.js").Size} [shape-scale=1] Scale. Unless two dimensional scaling is required a better
 * result may be obtained with appropriate settings for `shape-radius`, `shape-radius1` and `shape-radius2`.
 * @property {"declutter"|"obstacle"|"none"|undefined} [shape-declutter-mode] Declutter mode.
 */
/**
 * Circle style properties for rendering point features.  At least `circle-radius` must be provided.
 *
 * @typedef {Object} FlatCircle
 * @property {number} [circle-radius] Circle radius.
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [circle-fill-color] The fill color.
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [circle-stroke-color] The stroke color.
 * @property {number} [circle-stroke-width] Stroke pixel width.
 * @property {CanvasLineCap} [circle-stroke-line-cap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {CanvasLineJoin} [circle-stroke-line-join='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {Array<number>} [circle-stroke-line-dash] Line dash pattern.
 * @property {number} [circle-stroke-line-dash-offset=0] Line dash offset.
 * @property {number} [circle-stroke-miter-limit=10] Miter limit.
 * @property {Array<number>} [circle-displacement=[0,0]] displacement
 * @property {number|import("../size.js").Size} [circle-scale=1] Scale. A two dimensional scale will produce an ellipse.
 * Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `circle-radius`.
 * @property {number} [circle-rotation=0] Rotation in radians
 * (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
 * @property {boolean} [circle-rotate-with-view=false] Whether to rotate the shape with the view
 * (meaningful only when used in conjunction with a two dimensional scale).
 * @property {"declutter"|"obstacle"|"none"|undefined} [circle-declutter-mode] Declutter mode
 */
/**
 * @param {FlatStyle} flatStyle A flat style literal.
 * @return {import("./Style.js").default} A style instance.
 */
export function toStyle(flatStyle: FlatStyle): import("./Style.js").default;
/**
 * For static styling, the [layer.setStyle()]{@link module :ol/layer/Vector~VectorLayer#setStyle} method
 * can be called with an object literal that has fill, stroke, text, icon, regular shape, and/or circle properties.
 */
export type FlatStyle = FlatFill & FlatStroke & FlatText & FlatIcon & FlatShape & FlatCircle;
/**
 * A flat style literal or an array of the same.
 */
export type FlatStyleLike = FlatStyle | Array<FlatStyle>;
/**
 * Fill style properties applied to polygon features.
 */
export type FlatFill = {
    /**
     * The fill color.
     */
    "fill-color"?: import("../color.js").Color | import("../colorlike.js").ColorLike | undefined;
};
/**
 * Stroke style properties applied to line strings and polygon boundaries.  To apply a stroke, at least one of
 * `stroke-color` or `stroke-width` must be provided.
 */
export type FlatStroke = {
    /**
     * The stroke color.
     */
    "stroke-color"?: import("../color.js").Color | import("../colorlike.js").ColorLike | undefined;
    /**
     * Stroke pixel width.
     */
    "stroke-width"?: number | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    "stroke-line-cap"?: CanvasLineCap | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    "stroke-line-join"?: CanvasLineJoin | undefined;
    /**
     * Line dash pattern.
     */
    "stroke-line-dash"?: number[] | undefined;
    /**
     * Line dash offset.
     */
    "stroke-line-dash-offset"?: number | undefined;
    /**
     * Miter limit.
     */
    "stroke-miter-limit"?: number | undefined;
};
/**
 * Label style properties applied to all features.  At a minimum, a `text-value` must be provided.
 */
export type FlatText = {
    /**
     * Text content or rich text content. For plain text provide a string, which can
     * contain line breaks (`\n`). For rich text provide an array of text/font tuples. A tuple consists of the text to
     * render and the font to use (or `''` to use the text style's font). A line break has to be a separate tuple (i.e. `'\n', ''`).
     * **Example:** `['foo', 'bold 10px sans-serif', ' bar', 'italic 10px sans-serif', ' baz', '']` will yield "**foo** *bar* baz".
     * **Note:** Rich text is not supported for the immediate rendering API.
     */
    "text-value"?: string | string[] | undefined;
    /**
     * Font style as CSS `font` value, see:
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is `'10px sans-serif'`
     */
    "text-font"?: string | undefined;
    /**
     * When `text-placement` is set to `'line'`, allow a maximum angle between adjacent characters.
     * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
     */
    "text-max-angle"?: number | undefined;
    /**
     * Horizontal text offset in pixels. A positive will shift the text right.
     */
    "text-offset-x"?: number | undefined;
    /**
     * Vertical text offset in pixels. A positive will shift the text down.
     */
    "text-offset-y"?: number | undefined;
    /**
     * For polygon labels or when `placement` is set to `'line'`, allow text to exceed
     * the width of the polygon at the label position or the length of the path that it follows.
     */
    "text-overflow"?: boolean | undefined;
    /**
     * Text placement.
     */
    "text-placement"?: import("./Text.js").TextPlacement | undefined;
    /**
     * Repeat interval in pixels. When set, the text will be repeated at this interval. Only available when
     * `text-placement` is set to `'line'`. Overrides `text-align`.
     */
    "text-repeat"?: number | undefined;
    /**
     * Scale.
     */
    "text-scale"?: number | import("../size.js").Size | undefined;
    /**
     * Whether to rotate the text with the view.
     */
    "text-rotate-with-view"?: boolean | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    "text-rotation"?: number | undefined;
    /**
     * Text alignment. Possible values: `'left'`, `'right'`, `'center'`, `'end'` or `'start'`.
     * Default is `'center'` for `text-placement: 'point'`. For `text-placement: 'line'`, the default is to let the renderer choose a
     * placement where `text-max-angle` is not exceeded.
     */
    "text-align"?: CanvasTextAlign | undefined;
    /**
     * Text justification within the text box.
     * If not set, text is justified towards the `textAlign` anchor.
     * Otherwise, use options `'left'`, `'center'`, or `'right'` to justify the text within the text box.
     * **Note:** `text-justify` is ignored for immediate rendering and also for `text-placement: 'line'`.
     */
    "text-justify"?: import("./Text.js").TextJustify | undefined;
    /**
     * Text base line. Possible values: `'bottom'`, `'top'`, `'middle'`, `'alphabetic'`,
     * `'hanging'`, `'ideographic'`.
     */
    "text-baseline"?: CanvasTextBaseline | undefined;
    /**
     * Padding in pixels around the text for decluttering and background. The order of
     * values in the array is `[top, right, bottom, left]`.
     */
    "text-padding"?: number[] | undefined;
    /**
     * The fill color.
     */
    "text-fill-color"?: import("../color.js").Color | import("../colorlike.js").ColorLike | undefined;
    /**
     * The fill color.
     */
    "text-background-fill-color"?: import("../color.js").Color | import("../colorlike.js").ColorLike | undefined;
    /**
     * The stroke color.
     */
    "text-stroke-color"?: import("../color.js").Color | import("../colorlike.js").ColorLike | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    "text-stroke-line-cap"?: CanvasLineCap | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    "text-stroke-line-join"?: CanvasLineJoin | undefined;
    /**
     * Line dash pattern.
     */
    "text-stroke-line-dash"?: number[] | undefined;
    /**
     * Line dash offset.
     */
    "text-stroke-line-dash-offset"?: number | undefined;
    /**
     * Miter limit.
     */
    "text-stroke-miter-limit"?: number | undefined;
    /**
     * Stroke pixel width.
     */
    "text-stroke-width"?: number | undefined;
    /**
     * The stroke color.
     */
    "text-background-stroke-color"?: import("../color.js").Color | import("../colorlike.js").ColorLike | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    "text-background-stroke-line-cap"?: CanvasLineCap | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    "text-background-stroke-line-join"?: CanvasLineJoin | undefined;
    /**
     * Line dash pattern.
     */
    "text-background-stroke-line-dash"?: number[] | undefined;
    /**
     * Line dash offset.
     */
    "text-background-stroke-line-dash-offset"?: number | undefined;
    /**
     * Miter limit.
     */
    "text-background-stroke-miter-limit"?: number | undefined;
    /**
     * Stroke pixel width.
     */
    "text-background-stroke-width"?: number | undefined;
};
/**
 * Icon style properties applied to point features.  One of `icon-src` or `icon-img` must be provided to render
 * points with an icon.
 */
export type FlatIcon = {
    /**
     * Image source URI.
     */
    "icon-src"?: string | undefined;
    /**
     * Image object for the icon. If the `icon-src` option is not provided then the
     * provided image must already be loaded. And in that case, it is required
     * to provide the size of the image, with the `icon-img-size` option.
     */
    "icon-img"?: HTMLCanvasElement | HTMLImageElement | undefined;
    /**
     * Image size in pixels. Only required if `icon-img` is set and `icon-src` is not.
     * The provided size needs to match the actual size of the image.
     */
    "icon-img-size"?: import("../size.js").Size | undefined;
    /**
     * Anchor. Default value is the icon center.
     */
    "icon-anchor"?: number[] | undefined;
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
    "icon-displacement"?: number[] | undefined;
    /**
     * Origin of the offset: `bottom-left`, `bottom-right`,
     * `top-left` or `top-right`.
     */
    "icon-offset-origin"?: import("./Icon.js").IconOrigin | undefined;
    /**
     * Opacity of the icon.
     */
    "icon-opacity"?: number | undefined;
    /**
     * Scale.
     */
    "icon-scale"?: number | import("../size.js").Size | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    "icon-rotation"?: number | undefined;
    /**
     * Whether to rotate the icon with the view.
     */
    "icon-rotate-with-view"?: boolean | undefined;
    /**
     * Icon size in pixel. Can be used together with `icon-offset` to define the
     * sub-rectangle to use from the origin (sprite) icon image.
     */
    "icon-size"?: import("../size.js").Size | undefined;
    /**
     * Declutter mode
     */
    "icon-declutter-mode"?: "declutter" | "obstacle" | "none" | undefined;
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
    "shape-fill-color"?: import("../color.js").Color | import("../colorlike.js").ColorLike | undefined;
    /**
     * The stroke color.
     */
    "shape-stroke-color"?: import("../color.js").Color | import("../colorlike.js").ColorLike | undefined;
    /**
     * Stroke pixel width.
     */
    "shape-stroke-width"?: number | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    "shape-stroke-line-cap"?: CanvasLineCap | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    "shape-stroke-line-join"?: CanvasLineJoin | undefined;
    /**
     * Line dash pattern.
     */
    "shape-stroke-line-dash"?: number[] | undefined;
    /**
     * Line dash offset.
     */
    "shape-stroke-line-dash-offset"?: number | undefined;
    /**
     * Miter limit.
     */
    "shape-stroke-miter-limit"?: number | undefined;
    /**
     * Radius of a regular polygon.
     */
    "shape-radius"?: number | undefined;
    /**
     * First radius of a star. Ignored if radius is set.
     */
    "shape-radius1"?: number | undefined;
    /**
     * Second radius of a star.
     */
    "shape-radius2"?: number | undefined;
    /**
     * Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
     */
    "shape-angle"?: number | undefined;
    /**
     * Displacement of the shape
     */
    "shape-displacement"?: number[] | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    "shape-rotation"?: number | undefined;
    /**
     * Whether to rotate the shape with the view.
     */
    "shape-rotate-with-view"?: boolean | undefined;
    /**
     * Scale. Unless two dimensional scaling is required a better
     * result may be obtained with appropriate settings for `shape-radius`, `shape-radius1` and `shape-radius2`.
     */
    "shape-scale"?: number | import("../size.js").Size | undefined;
    /**
     * Declutter mode.
     */
    "shape-declutter-mode"?: "declutter" | "obstacle" | "none" | undefined;
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
    "circle-fill-color"?: import("../color.js").Color | import("../colorlike.js").ColorLike | undefined;
    /**
     * The stroke color.
     */
    "circle-stroke-color"?: import("../color.js").Color | import("../colorlike.js").ColorLike | undefined;
    /**
     * Stroke pixel width.
     */
    "circle-stroke-width"?: number | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    "circle-stroke-line-cap"?: CanvasLineCap | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    "circle-stroke-line-join"?: CanvasLineJoin | undefined;
    /**
     * Line dash pattern.
     */
    "circle-stroke-line-dash"?: number[] | undefined;
    /**
     * Line dash offset.
     */
    "circle-stroke-line-dash-offset"?: number | undefined;
    /**
     * Miter limit.
     */
    "circle-stroke-miter-limit"?: number | undefined;
    /**
     * displacement
     */
    "circle-displacement"?: number[] | undefined;
    /**
     * Scale. A two dimensional scale will produce an ellipse.
     * Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `circle-radius`.
     */
    "circle-scale"?: number | import("../size.js").Size | undefined;
    /**
     * Rotation in radians
     * (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
     */
    "circle-rotation"?: number | undefined;
    /**
     * Whether to rotate the shape with the view
     * (meaningful only when used in conjunction with a two dimensional scale).
     */
    "circle-rotate-with-view"?: boolean | undefined;
    /**
     * Declutter mode
     */
    "circle-declutter-mode"?: "declutter" | "obstacle" | "none" | undefined;
};
//# sourceMappingURL=flat.d.ts.map