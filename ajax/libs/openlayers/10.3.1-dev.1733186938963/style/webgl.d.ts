export type ExpressionValue = import("../expr/expression.js").ExpressionValue;
export type ColorExpression = import("../color.js").Color | string | Array<ExpressionValue>;
export type BaseProps = {
    /**
     * Filter expression. If it resolves to a number strictly greater than 0, the
     * point will be displayed. If undefined, all points will show.
     */
    filter?: import("../expr/expression.js").ExpressionValue | undefined;
};
export type FillProps = {
    /**
     * Fill color.
     */
    "fill-color"?: ColorExpression | undefined;
    /**
     * Fill pattern image source URI. If `fill-color` is defined as well, it will be used to tint this image.
     */
    "fill-pattern-src"?: string | undefined;
    /**
     * Offset, which, together with the size and the offset origin, define the
     * sub-rectangle to use from the original fill pattern image.
     */
    "fill-pattern-offset"?: number[] | import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Origin of the offset: `bottom-left`, `bottom-right`,
     * `top-left` or `top-right`.
     */
    "fill-pattern-offset-origin"?: import("./Icon.js").IconOrigin | undefined;
    /**
     * Fill pattern image size in pixel. Can be used together with `fill-pattern-offset` to define the
     * sub-rectangle to use from the origin (sprite) fill pattern image.
     */
    "fill-pattern-size"?: import("../size.js").Size | import("../expr/expression.js").ExpressionValue | undefined;
};
export type StrokeProps = {
    /**
     * The stroke color.
     */
    "stroke-color"?: ColorExpression | undefined;
    /**
     * Stroke pixel width.
     */
    "stroke-width"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Stroke offset in pixel. A positive value offsets the line to the right, relative to the direction of the line.
     */
    "stroke-offset"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    "stroke-line-cap"?: string | number | boolean | any[] | import("../color.js").Color | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    "stroke-line-join"?: string | number | boolean | any[] | import("../color.js").Color | undefined;
    /**
     * Line dash pattern.
     */
    "stroke-line-dash"?: number[] | import("../expr/expression.js").ExpressionValue[] | undefined;
    /**
     * Line dash offset.
     */
    "stroke-line-dash-offset"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Miter limit.
     */
    "stroke-miter-limit"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Stroke pattern image source URI. If `stroke-color` is defined as well, it will be used to tint this image.
     */
    "stroke-pattern-src"?: string | undefined;
    /**
     * Offset, which, together with the size and the offset origin, define the
     * sub-rectangle to use from the original fill pattern image.
     */
    "stroke-pattern-offset"?: number[] | import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Origin of the offset: `bottom-left`, `bottom-right`,
     * `top-left` or `top-right`.
     */
    "stroke-pattern-offset-origin"?: import("./Icon.js").IconOrigin | undefined;
    /**
     * Stroke pattern image size in pixel. Can be used together with `stroke-pattern-offset` to define the
     * sub-rectangle to use from the origin (sprite) fill pattern image.
     */
    "stroke-pattern-size"?: import("../size.js").Size | import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Spacing between each pattern occurrence in pixels; 0 if undefined.
     */
    "stroke-pattern-spacing"?: import("../expr/expression.js").ExpressionValue | undefined;
};
export type IconProps = {
    /**
     * Image source URI.
     */
    "icon-src"?: string | undefined;
    /**
     * Anchor. Default value is the icon center.
     */
    "icon-anchor"?: number[] | import("../expr/expression.js").ExpressionValue | undefined;
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
    "icon-color"?: ColorExpression | undefined;
    /**
     * Opacity of the icon.
     */
    "icon-opacity"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * The `crossOrigin` attribute for loaded images. Note that you must provide a
     * `icon-cross-origin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    "icon-cross-origin"?: string | null | undefined;
    /**
     * Displacement of the icon.
     */
    "icon-displacement"?: number[] | import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Scale.
     */
    "icon-scale"?: import("../size.js").Size | import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Width of the icon. If not specified, the actual image width will be used. Cannot be combined
     * with `scale`.
     */
    "icon-width"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Height of the icon. If not specified, the actual image height will be used. Cannot be combined
     * with `scale`.
     */
    "icon-height"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    "icon-rotation"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Whether to rotate the icon with the view.
     */
    "icon-rotate-with-view"?: boolean | undefined;
    /**
     * Offset, which, together with the size and the offset origin, define the
     * sub-rectangle to use from the original icon image.
     */
    "icon-offset"?: number[] | import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Origin of the offset: `bottom-left`, `bottom-right`,
     * `top-left` or `top-right`.
     */
    "icon-offset-origin"?: import("./Icon.js").IconOrigin | undefined;
    /**
     * Icon size in pixel. Can be used together with `icon-offset` to define the
     * sub-rectangle to use from the origin (sprite) icon image.
     */
    "icon-size"?: import("../size.js").Size | import("../expr/expression.js").ExpressionValue | undefined;
};
export type ShapeProps = {
    /**
     * Number of points for stars and regular polygons. In case of a polygon, the number of points
     * is the number of sides.
     */
    "shape-points"?: import("../expr/expression.js").ExpressionValue | undefined;
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
    "shape-stroke-width"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Shape opacity.
     */
    "shape-opacity"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Radius of a regular polygon.
     */
    "shape-radius"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Second radius to make a star instead of a regular polygon.
     */
    "shape-radius2"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
     */
    "shape-angle"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Displacement of the shape
     */
    "shape-displacement"?: number[] | import("../expr/expression.js").ExpressionValue[] | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    "shape-rotation"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Whether to rotate the shape with the view.
     */
    "shape-rotate-with-view"?: boolean | undefined;
    /**
     * Scale. Unless two dimensional scaling is required a better
     * result may be obtained with appropriate settings for `shape-radius` and `shape-radius2`.
     */
    "shape-scale"?: import("../size.js").Size | import("../expr/expression.js").ExpressionValue | import("../expr/expression.js").ExpressionValue[] | undefined;
};
export type CircleProps = {
    /**
     * Circle radius.
     */
    "circle-radius"?: import("../expr/expression.js").ExpressionValue | undefined;
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
    "circle-stroke-width"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Circle opacity.
     */
    "circle-opacity"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * displacement
     */
    "circle-displacement"?: number[] | import("../expr/expression.js").ExpressionValue[] | undefined;
    /**
     * Scale. A two dimensional scale will produce an ellipse.
     * Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `circle-radius`.
     */
    "circle-scale"?: import("../size.js").Size | import("../expr/expression.js").ExpressionValue | import("../expr/expression.js").ExpressionValue[] | undefined;
    /**
     * Rotation in radians
     * (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
     */
    "circle-rotation"?: import("../expr/expression.js").ExpressionValue | undefined;
    /**
     * Whether to rotate the shape with the view
     * (meaningful only when used in conjunction with a two dimensional scale).
     */
    "circle-rotate-with-view"?: boolean | undefined;
};
export type WebGLStyle = BaseProps & IconProps & StrokeProps & FillProps & CircleProps & ShapeProps;
//# sourceMappingURL=webgl.d.ts.map