export type SymbolType = string;
export namespace SymbolType {
    export const CIRCLE: string;
    export const SQUARE: string;
    export const TRIANGLE: string;
    export const IMAGE: string;
}
export type ExpressionValue = string | number | boolean | any[] | number[];
export type LiteralStyle = {
    /**
     * Filter expression. If it resolves to a number strictly greater than 0, the
     * point will be displayed. If undefined, all points will show.
     */
    filter?: string | number | boolean | any[] | number[];
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
    size: string | number | boolean | any[] | number[] | (string | number | boolean | any[] | number[])[];
    /**
     * Symbol type to use, either a regular shape or an image.
     */
    symbolType: string;
    /**
     * Path to the image to be used for the symbol. Only required with `symbolType: 'image'`.
     */
    src?: string;
    /**
     * Color used for the representation (either fill, line or symbol).
     */
    color?: string | number[] | (string | number | boolean | any[] | number[])[];
    /**
     * Opacity.
     */
    opacity?: string | number | boolean | any[] | number[];
    /**
     * Symbol rotation in radians.
     */
    rotation?: string | number | boolean | any[] | number[];
    /**
     * Offset on X and Y axis for symbols. If not specified, the symbol will be centered.
     */
    offset?: (string | number | boolean | any[] | number[])[];
    /**
     * Texture coordinates. If not specified, the whole texture will be used (range for 0 to 1 on both axes).
     */
    textureCoord?: (string | number | boolean | any[] | number[])[];
    /**
     * Specify whether the symbol must rotate with the view or stay upwards.
     */
    rotateWithView?: boolean;
};
//# sourceMappingURL=literal.d.ts.map