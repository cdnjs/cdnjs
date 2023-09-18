/**
 * Get a string representation for a type.
 * @param {number} type The type.
 * @return {string} The type name.
 */
export function typeName(type: number): string;
/**
 * @param {number} broad The broad type.
 * @param {number} specific The specific type.
 * @return {boolean} The broad type includes the specific type.
 */
export function includesType(broad: number, specific: number): boolean;
/**
 * @param {number} oneType One type.
 * @param {number} otherType Another type.
 * @return {boolean} The set of types overlap (share a common specific type)
 */
export function overlapsType(oneType: number, otherType: number): boolean;
/**
 * @param {number} type The type.
 * @param {number} expected The expected type.
 * @return {boolean} The given type is exactly the expected type.
 */
export function isType(type: number, expected: number): boolean;
/**
 * @typedef {LiteralExpression|CallExpression} Expression
 */
/**
 * @typedef {Object} ParsingContext
 * @property {Set<string>} variables Variables referenced with the 'var' operator.
 * @property {Set<string>} properties Properties referenced with the 'get' operator.
 * @property {import("../style/literal").LiteralStyle} style The style being parsed
 */
/**
 * @return {ParsingContext} A new parsing context.
 */
export function newParsingContext(): ParsingContext;
/**
 * @typedef {LiteralValue|Array} EncodedExpression
 */
/**
 * @param {EncodedExpression} encoded The encoded expression.
 * @param {ParsingContext} context The parsing context.
 * @param {number} [typeHint] Optional type hint
 * @return {Expression} The parsed expression result.
 */
export function parse(encoded: EncodedExpression, context: ParsingContext, typeHint?: number | undefined): Expression;
export const NoneType: 0;
export const BooleanType: number;
export const NumberType: number;
export const StringType: number;
export const ColorType: number;
export const NumberArrayType: number;
export const AnyType: number;
/**
 * @typedef {boolean|number|string|Array<number>} LiteralValue
 */
export class LiteralExpression {
    /**
     * @param {number} type The value type.
     * @param {LiteralValue} value The literal value.
     */
    constructor(type: number, value: LiteralValue);
    type: number;
    value: LiteralValue;
}
export class CallExpression {
    /**
     * @param {number} type The return type.
     * @param {string} operator The operator.
     * @param {...Expression} args The arguments.
     */
    constructor(type: number, operator: string, ...args: Expression[]);
    type: number;
    operator: string;
    args: Expression[];
}
/**
 * @type {Object<string, string>}
 */
export const Ops: {
    [x: string]: string;
};
export type Expression = LiteralExpression | CallExpression;
export type ParsingContext = {
    /**
     * Variables referenced with the 'var' operator.
     */
    variables: Set<string>;
    /**
     * Properties referenced with the 'get' operator.
     */
    properties: Set<string>;
    /**
     * The style being parsed
     */
    style: import("../style/literal").LiteralStyle;
};
export type EncodedExpression = LiteralValue | any[];
/**
 * An argument validator applies various checks to an encoded expression arguments
 * Returns the parsed arguments if any.
 * Third argument is the array of parsed arguments from previous validators
 * Fourth argument is an optional type hint
 */
export type ArgValidator = (arg0: Array<EncodedExpression>, arg1: ParsingContext, arg2: Array<Expression>, arg3: number | null) => Array<Expression> | void;
export type LiteralValue = boolean | number | string | Array<number>;
/**
 * Third argument is a type hint
 */
export type Parser = (arg0: any[], arg1: ParsingContext, arg2: number) => Expression;
//# sourceMappingURL=expression.d.ts.map