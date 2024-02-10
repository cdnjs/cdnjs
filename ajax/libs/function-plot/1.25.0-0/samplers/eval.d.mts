/**
 * Evaluates meta[property] with `variables`
 *
 * - Compiles meta[property] if it wasn't compiled already (also with cache
 *   check)
 * - Evaluates the resulting function with the merge of meta.scope and
 *   `variables`
 *
 * @param meta
 * @param property
 * @param variables
 * @returns The builtIn evaluator returns a number, the interval evaluator an array
 */
export function builtIn(meta: any, property: any, variables: any): any;
/**
 * Evaluates meta[property] with `variables`
 *
 * - Compiles meta[property] if it wasn't compiled already (also with cache
 *   check)
 * - Evaluates the resulting function with the merge of meta.scope and
 *   `variables`
 *
 * @param meta
 * @param property
 * @param variables
 * @returns The builtIn evaluator returns a number, the interval evaluator an array
 */
export function interval(meta: any, property: any, variables: any): any;
