/* *
 *
 *  (c) 2009-2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
import FormulaProcessor from '../FormulaProcessor.js';
const { getArgumentValue } = FormulaProcessor;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `ABS(value)` implementation. Returns positive numbers.
 *
 * @private
 * @function Formula.processorFunctions.AND
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {Array<number>}
 * Result value of the process.
 */
function ABS(args, table) {
    const value = getArgumentValue(args[0], table);
    switch (typeof value) {
        case 'number':
            return Math.abs(value);
        case 'object': {
            const values = [];
            for (let i = 0, iEnd = value.length, value2; i < iEnd; ++i) {
                value2 = value[i];
                if (typeof value2 !== 'number') {
                    return NaN;
                }
                values.push(Math.abs(value2));
            }
            return values;
        }
        default:
            return NaN;
    }
}
/* *
 *
 *  Registry
 *
 * */
FormulaProcessor.registerProcessorFunction('ABS', ABS);
/* *
 *
 *  Default Export
 *
 * */
export default ABS;
