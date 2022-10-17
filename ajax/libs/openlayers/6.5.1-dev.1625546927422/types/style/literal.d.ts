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
    filter?: ExpressionValue;
    /**
     * Style variables; each variable must hold a number.
     * Note: **this object is meant to be mutated**: changes to the values will immediately be visible on the rendered features
     */
    variables?: {
        [x: string]: number;
    };
    /**
     * Symbol representation.
     */
    symbol?: LiteralSymbolStyle;
};
export type LiteralSymbolStyle = {
    /**
     * Size, mandatory.
     */
    size: ExpressionValue | Array<ExpressionValue, ExpressionValue>;
    /**
     * Symbol type to use, either a regular shape or an image.
     */
    symbolType: SymbolType;
    /**
     * Path to the image to be used for the symbol. Only required with `symbolType: 'image'`.
     */
    src?: string;
    /**
     * Color used for the representation (either fill, line or symbol).
     */
    color?: import("../color.js").Color | Array<ExpressionValue> | string;
    /**
     * Opacity.
     */
    opacity?: ExpressionValue;
    /**
     * Symbol rotation in radians.
     */
    rotation?: ExpressionValue;
    /**
     * Offset on X and Y axis for symbols. If not specified, the symbol will be centered.
     */
    offset?: Array<ExpressionValue, ExpressionValue>;
    /**
     * Texture coordinates. If not specified, the whole texture will be used (range for 0 to 1 on both axes).
     */
    textureCoord?: Array<ExpressionValue, ExpressionValue, ExpressionValue, ExpressionValue>;
    /**
     * Specify whether the symbol must rotate with the view or stay upwards.
     */
    rotateWithView?: boolean;
};
//# sourceMappingURL=literal.d.ts.map