export type SymbolType = string;
export namespace SymbolType {
    const CIRCLE: string;
    const SQUARE: string;
    const TRIANGLE: string;
    const IMAGE: string;
}
export type ExpressionValue = import("./expressions.js").ExpressionValue;
export type ColorExpression = import("../color.js").Color | string | Array<ExpressionValue>;
export type BaseProps = {
    /**
     * Filter expression. If it resolves to a number strictly greater than 0, the
     * point will be displayed. If undefined, all points will show.
     */
    filter?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Style variables; each variable must hold a number.
     * Note: **this object is meant to be mutated**: changes to the values will immediately be visible on the rendered features
     */
    variables?: {
        [x: string]: string | number | boolean | number[];
    } | undefined;
    /**
     * Symbol representation.
     */
    symbol?: LiteralSymbolStyle | undefined;
};
export type LiteralSymbolStyle = {
    /**
     * Size, mandatory.
     */
    size: ExpressionValue | Array<ExpressionValue>;
    /**
     * Symbol type to use, either a regular shape or an image.
     */
    symbolType: SymbolType;
    /**
     * Path to the image to be used for the symbol. Only required with `symbolType: 'image'`.
     */
    src?: string | undefined;
    /**
     * The `crossOrigin` attribute for loading `src`.
     */
    crossOrigin?: string | undefined;
    /**
     * Color used for the representation (either fill, line or symbol).
     */
    color?: ColorExpression | undefined;
    /**
     * Opacity.
     */
    opacity?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Symbol rotation in radians.
     */
    rotation?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Offset on X and Y axis for symbols. If not specified, the symbol will be centered.
     */
    offset?: import("./expressions.js").ExpressionValue[] | undefined;
    /**
     * Texture coordinates. If not specified, the whole texture will be used (range for 0 to 1 on both axes).
     */
    textureCoord?: import("./expressions.js").ExpressionValue[] | undefined;
    /**
     * Specify whether the symbol must rotate with the view or stay upwards.
     */
    rotateWithView?: boolean | undefined;
};
export type FillProps = {
    /**
     * The fill color.
     */
    "fill-color"?: ColorExpression | undefined;
};
export type StrokeProps = {
    /**
     * The stroke color.
     */
    "stroke-color"?: ColorExpression | undefined;
    /**
     * Stroke pixel width.
     */
    "stroke-width"?: import("./expressions.js").ExpressionValue | undefined;
};
export type IconProps = {
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
    "icon-color"?: ColorExpression | undefined;
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
    "icon-offset"?: number[] | import("./expressions.js").ExpressionValue[] | undefined;
    /**
     * Displacement of the icon.
     */
    "icon-displacement"?: number[] | import("./expressions.js").ExpressionValue[] | undefined;
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
    "icon-scale"?: import("../size.js").Size | import("./expressions.js").ExpressionValue | import("./expressions.js").ExpressionValue[] | undefined;
    /**
     * Width of the icon. If not specified, the actual image width will be used. Cannot be combined
     * with `scale`.
     */
    "icon-width"?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Height of the icon. If not specified, the actual image height will be used. Cannot be combined
     * with `scale`.
     */
    "icon-height"?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    "icon-rotation"?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Whether to rotate the icon with the view.
     */
    "icon-rotate-with-view"?: boolean | undefined;
    /**
     * Icon size in pixel. Can be used together with `icon-offset` to define the
     * sub-rectangle to use from the origin (sprite) icon image.
     */
    "icon-size"?: import("../size.js").Size | import("./expressions.js").ExpressionValue[] | undefined;
};
export type ShapeProps = {
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
    "shape-stroke-width"?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Radius of a regular polygon.
     */
    "shape-radius"?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * First radius of a star. Ignored if radius is set.
     */
    "shape-radius1"?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Second radius of a star.
     */
    "shape-radius2"?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
     */
    "shape-angle"?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Displacement of the shape
     */
    "shape-displacement"?: number[] | import("./expressions.js").ExpressionValue[] | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    "shape-rotation"?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Whether to rotate the shape with the view.
     */
    "shape-rotate-with-view"?: boolean | undefined;
    /**
     * Scale. Unless two dimensional scaling is required a better
     * result may be obtained with appropriate settings for `shape-radius`, `shape-radius1` and `shape-radius2`.
     */
    "shape-scale"?: import("../size.js").Size | import("./expressions.js").ExpressionValue | import("./expressions.js").ExpressionValue[] | undefined;
};
export type CircleProps = {
    /**
     * Circle radius.
     */
    "circle-radius"?: import("./expressions.js").ExpressionValue | undefined;
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
    "circle-stroke-width"?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * displacement
     */
    "circle-displacement"?: number[] | import("./expressions.js").ExpressionValue[] | undefined;
    /**
     * Scale. A two dimensional scale will produce an ellipse.
     * Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `circle-radius`.
     */
    "circle-scale"?: import("../size.js").Size | import("./expressions.js").ExpressionValue | import("./expressions.js").ExpressionValue[] | undefined;
    /**
     * Rotation in radians
     * (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
     */
    "circle-rotation"?: import("./expressions.js").ExpressionValue | undefined;
    /**
     * Whether to rotate the shape with the view
     * (meaningful only when used in conjunction with a two dimensional scale).
     */
    "circle-rotate-with-view"?: boolean | undefined;
};
export type LiteralStyle = BaseProps & IconProps & StrokeProps & FillProps & CircleProps & ShapeProps;
//# sourceMappingURL=literal.d.ts.map