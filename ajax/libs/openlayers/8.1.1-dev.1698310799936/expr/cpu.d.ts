/**
 * @fileoverview This module includes functions to build expressions for evaluation on the CPU.
 * Building is composed of two steps: parsing and compiling.  The parsing step takes an encoded
 * expression and returns an instance of one of the expression classes.  The compiling step takes
 * the expression instance and returns a function that can be evaluated in to return a literal
 * value.  The evaluator function should do as little allocation and work as possible.
 */
/**
 * @typedef {Object} EvaluationContext
 * @property {Object} properties The values for properties used in 'get' expressions.
 * @property {Object} variables The values for variables used in 'var' expressions.
 * @property {number} resolution The map resolution.
 * @property {string|number|null} featureId The feature id.
 */
/**
 * @return {EvaluationContext} A new evaluation context.
 */
export function newEvaluationContext(): EvaluationContext;
/**
 * @typedef {function(EvaluationContext):import("./expression.js").LiteralValue} ExpressionEvaluator
 */
/**
 * @typedef {function(EvaluationContext):boolean} BooleanEvaluator
 */
/**
 * @typedef {function(EvaluationContext):number} NumberEvaluator
 */
/**
 * @typedef {function(EvaluationContext):string} StringEvaluator
 */
/**
 * @typedef {function(EvaluationContext):(Array<number>|string)} ColorLikeEvaluator
 */
/**
 * @typedef {function(EvaluationContext):Array<number>} NumberArrayEvaluator
 */
/**
 * @typedef {function(EvaluationContext):Array<number>} CoordinateEvaluator
 */
/**
 * @typedef {function(EvaluationContext):(Array<number>|number)} SizeLikeEvaluator
 */
/**
 * @param {import('./expression.js').EncodedExpression} encoded The encoded expression.
 * @param {number} type The expected type.
 * @param {import('./expression.js').ParsingContext} context The parsing context.
 * @return {ExpressionEvaluator} The expression evaluator.
 */
export function buildExpression(encoded: import('./expression.js').EncodedExpression, type: number, context: import('./expression.js').ParsingContext): ExpressionEvaluator;
export type EvaluationContext = {
    /**
     * The values for properties used in 'get' expressions.
     */
    properties: any;
    /**
     * The values for variables used in 'var' expressions.
     */
    variables: any;
    /**
     * The map resolution.
     */
    resolution: number;
    /**
     * The feature id.
     */
    featureId: string | number | null;
};
export type ExpressionEvaluator = (arg0: EvaluationContext) => import("./expression.js").LiteralValue;
export type BooleanEvaluator = (arg0: EvaluationContext) => boolean;
export type NumberEvaluator = (arg0: EvaluationContext) => number;
export type StringEvaluator = (arg0: EvaluationContext) => string;
export type ColorLikeEvaluator = (arg0: EvaluationContext) => (Array<number> | string);
export type NumberArrayEvaluator = (arg0: EvaluationContext) => Array<number>;
export type CoordinateEvaluator = (arg0: EvaluationContext) => Array<number>;
export type SizeLikeEvaluator = (arg0: EvaluationContext) => (Array<number> | number);
//# sourceMappingURL=cpu.d.ts.map