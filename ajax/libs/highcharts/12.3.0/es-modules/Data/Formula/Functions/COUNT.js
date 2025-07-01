/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `COUNT(...values)` implementation. Returns the count of
 * given values that are numbers.
 *
 * @private
 * @function Formula.processorFunctions.COUNT
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {number}
 * Result value of the process.
 */
function COUNT(args, table) {
    const values = FormulaProcessor.getArgumentsValues(args, table);
    let count = 0;
    for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
        value = values[i];
        switch (typeof value) {
            case 'number':
                if (!isNaN(value)) {
                    ++count;
                }
                break;
            case 'object':
                count += COUNT(value, table);
                break;
        }
    }
    return count;
}
/* *
 *
 *  Registry
 *
 * */
FormulaProcessor.registerProcessorFunction('COUNT', COUNT);
/* *
 *
 *  Default Export
 *
 * */
export default COUNT;
