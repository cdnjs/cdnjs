export type SymbolType = string;
export namespace SymbolType {
    const CIRCLE: string;
    const SQUARE: string;
    const TRIANGLE: string;
    const IMAGE: string;
}
export type ExpressionValue = import("./expressions.js").ExpressionValue;
export type LiteralStyle = {
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
        [x: string]: number;
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
    color?: string | import("../color.js").Color | import("./expressions.js").ExpressionValue[] | undefined;
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
//# sourceMappingURL=literal.d.ts.map