/**
 * This function adapts a rule evaluator to the existing style function interface.
 * After we have deprecated the style function, we can use the compiled rules directly
 * and pass a more complete evaluation context (variables, zoom, time, etc.).
 *
 * @param {Array<import('../../style/flat.js').Rule>} rules The rules.
 * @return {import('../../style/Style.js').StyleFunction} A style function.
 */
export function rulesToStyleFunction(rules: Array<import('../../style/flat.js').Rule>): import('../../style/Style.js').StyleFunction;
/**
 * This function adapts a style evaluator to the existing style function interface.
 * After we have deprecated the style function, we can use the compiled rules directly
 * and pass a more complete evaluation context (variables, zoom, time, etc.).
 *
 * @param {Array<import('../../style/flat.js').FlatStyle>} flatStyles The flat styles.
 * @return {import('../../style/Style.js').StyleFunction} A style function.
 */
export function flatStylesToStyleFunction(flatStyles: Array<import('../../style/flat.js').FlatStyle>): import('../../style/Style.js').StyleFunction;
/**
 * @typedef {function(EvaluationContext):Array<Style>} RuleSetEvaluator
 */
/**
 * @typedef {Object} CompiledRule
 * @property {ExpressionEvaluator} filter The compiled filter evaluator.
 * @property {Array<StyleEvaluator>} styles The list of compiled style evaluators.
 */
/**
 * @param {Array<import('../../style/flat.js').Rule>} rules The rules.
 * @param {ParsingContext} context The parsing context.
 * @return {RuleSetEvaluator} The evaluator function.
 */
export function buildRuleSet(rules: Array<import('../../style/flat.js').Rule>, context: ParsingContext): RuleSetEvaluator;
/**
 * @typedef {function(EvaluationContext):Style|null} StyleEvaluator
 */
/**
 * @param {FlatStyle} flatStyle A flat style literal.
 * @param {ParsingContext} context The parsing context.
 * @return {StyleEvaluator} A function that evaluates to a style.  The style returned by
 * this function will be reused between invocations.
 */
export function buildStyle(flatStyle: FlatStyle, context: ParsingContext): StyleEvaluator;
export type FlatStyle = import("../../style/flat.js").FlatStyle;
export type EncodedExpression = import("../../expr/expression.js").EncodedExpression;
export type ParsingContext = import("../../expr/expression.js").ParsingContext;
export type CallExpression = import("../../expr/expression.js").CallExpression;
export type EvaluationContext = import("../../expr/cpu.js").EvaluationContext;
export type ExpressionEvaluator = import("../../expr/cpu.js").ExpressionEvaluator;
export type RuleSetEvaluator = (arg0: EvaluationContext) => Array<Style>;
export type CompiledRule = {
    /**
     * The compiled filter evaluator.
     */
    filter: ExpressionEvaluator;
    /**
     * The list of compiled style evaluators.
     */
    styles: Array<StyleEvaluator>;
};
export type StyleEvaluator = (arg0: EvaluationContext) => Style | null;
export type FillEvaluator = (arg0: EvaluationContext) => Fill | null;
export type StrokeEvaluator = (arg0: EvaluationContext) => Stroke | null;
export type TextEvaluator = (arg0: EvaluationContext) => Text;
export type ImageEvaluator = (arg0: EvaluationContext) => import("../../style/Image.js").default;
import Style from '../../style/Style.js';
import Fill from '../../style/Fill.js';
import Stroke from '../../style/Stroke.js';
import Text from '../../style/Text.js';
//# sourceMappingURL=style.d.ts.map