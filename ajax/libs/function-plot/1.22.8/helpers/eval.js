"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interval = exports.builtIn = void 0;
const built_in_math_eval_1 = __importDefault(require("built-in-math-eval"));
const interval_arithmetic_eval_1 = __importDefault(require("interval-arithmetic-eval"));
const samplers = {
    interval: interval_arithmetic_eval_1.default,
    builtIn: built_in_math_eval_1.default
};
if (global.math) {
    samplers.builtIn = global.math.compile;
}
function generateEvaluator(samplerName) {
    function doCompile(expression) {
        // compiles does the following
        //
        // when expression === string
        //
        //     gen = new require('math-codegen')
        //     return gen.parse(expression).compile(Interval|BultInMath)
        //
        //     which is an object with the form
        //
        //     {
        //       eval: function (scope) {
        //         // math-codegen magic
        //       }
        //     }
        //
        // when expression === function
        //
        //    {
        //      eval: expression
        //    }
        //
        // othewise throw an error
        if (typeof expression === 'string') {
            const compiled = samplers[samplerName](expression);
            if (global.math && samplerName === 'builtIn') {
                // if mathjs is included use its evaluate method instead
                return { eval: compiled.evaluate || compiled.eval };
            }
            return compiled;
        }
        else if (typeof expression === 'function') {
            return { eval: expression };
        }
        else {
            throw Error('expression must be a string or a function');
        }
    }
    function compileIfPossible(meta, property) {
        // compile the function using interval arithmetic, cache the result
        // so that multiple calls with the same argument don't trigger the
        // kinda expensive compilation process
        const expression = meta[property];
        const hiddenProperty = samplerName + '_Expression_' + property;
        const hiddenCompiled = samplerName + '_Compiled_' + property;
        if (expression !== meta[hiddenProperty]) {
            meta[hiddenProperty] = expression;
            meta[hiddenCompiled] = doCompile(expression);
        }
    }
    function getCompiledExpression(meta, property) {
        return meta[samplerName + '_Compiled_' + property];
    }
    /**
     * Evaluates meta[property] with `variables`
     *
     * - Compiles meta[property] if it wasn't compiled already (also with cache
     *   check)
     * - Evaluates the resulting function with the merge of meta.scope and
     *   `variables`
     *
     * @param {Object} meta
     * @param {String} property
     * @param {Object} variables
     * @returns {Number|Array} The builtIn evaluator returns a number, the
     * interval evaluator an array
     */
    function evaluate(meta, property, variables) {
        // e.g.
        //
        //  meta: {
        //    fn: 'x + 3',
        //    scope: { y: 3 }
        //  }
        //  property: 'fn'
        //  variables:  { x: 3 }
        //
        compileIfPossible(meta, property);
        return getCompiledExpression(meta, property).eval(Object.assign({}, meta.scope || {}, variables));
    }
    return evaluate;
}
const builtIn = generateEvaluator('builtIn');
exports.builtIn = builtIn;
const interval = generateEvaluator('interval');
exports.interval = interval;
//# sourceMappingURL=eval.js.map