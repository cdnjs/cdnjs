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
 * @return {Expression} The parsed expression result.
 */
export function parse(encoded: EncodedExpression, context: ParsingContext): Expression;
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
};
export type EncodedExpression = LiteralValue | any[];
export type ArgValidator = (arg0: any[], arg1: ParsingContext) => Array<Expression>;
export type LiteralValue = boolean | number | string | Array<number>;
export type Parser = (arg0: any[], arg1: ParsingContext) => Expression;
//# sourceMappingURL=expression.d.ts.map