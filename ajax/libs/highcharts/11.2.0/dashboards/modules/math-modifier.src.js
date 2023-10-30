/**
 * @license Highcharts Dashboards Math  (2023-10-30)
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('dashboards/modules/math-modifier', ['dashboards'], function (Dashboards) {
            factory(Dashboards);
            factory.Dashboards = Dashboards;
            return factory;
        });
    } else {
        factory(typeof Dashboards !== 'undefined' ? Dashboards : undefined);
    }
}(function (Dashboards) {
    'use strict';
    var _modules = Dashboards ? Dashboards._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent(
                    'DashboardsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Data/Formula/FormulaParser.js', [], function () {
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
        /* *
         *
         *  Constants
         *
         * */
        /**
         * @private
         */
        const booleanRegExp = /^(?:FALSE|TRUE)/;
        /**
         * `.`-separated decimal.
         * @private
         */
        const decimal1RegExp = /^[+-]?\d+(?:\.\d+)?(?:e[+-]\d+)?/;
        /**
         * `,`-separated decimal.
         * @private
         */
        const decimal2RegExp = /^[+-]?\d+(?:,\d+)?(?:e[+-]\d+)?/;
        /**
         * - Group 1: Function name
         * @private
         */
        const functionRegExp = /^([A-Z][A-Z\d\.]*)\(/;
        /**
         * @private
         */
        const operatorRegExp = /^(?:[+\-*\/^<=>]|<=|=>)/;
        /**
         * - Group 1: Start column
         * - Group 2: Start row
         * - Group 3: End column
         * - Group 4: End row
         * @private
         */
        const rangeA1RegExp = /^(\$?[A-Z]+)(\$?\d+)\:(\$?[A-Z]+)(\$?\d+)/;
        /**
         * - Group 1: Start row
         * - Group 2: Start column
         * - Group 3: End row
         * - Group 4: End column
         * @private
         */
        const rangeR1C1RegExp = /^R(\d*|\[\d+\])C(\d*|\[\d+\])\:R(\d*|\[\d+\])C(\d*|\[\d+\])/;
        /**
         * - Group 1: Column
         * - Group 2: Row
         * @private
         */
        const referenceA1RegExp = /^(\$?[A-Z]+)(\$?\d+)(?![\:C])/;
        /**
         * - Group 1: Row
         * - Group 2: Column
         * @private
         */
        const referenceR1C1RegExp = /^R(\d*|\[\d+\])C(\d*|\[\d+\])(?!\:)/;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Extracts the inner string of the most outer parantheses.
         *
         * @private
         *
         * @param {string} text
         * Text string to extract from.
         *
         * @return {string}
         * Extracted parantheses. If not found an exception will be thrown.
         */
        function extractParantheses(text) {
            let parantheseLevel = 0;
            for (let i = 0, iEnd = text.length, char, parantheseStart = 1; i < iEnd; ++i) {
                char = text[i];
                if (char === '(') {
                    if (!parantheseLevel) {
                        parantheseStart = i + 1;
                    }
                    ++parantheseLevel;
                    continue;
                }
                if (char === ')') {
                    --parantheseLevel;
                    if (!parantheseLevel) {
                        return text.substring(parantheseStart, i);
                    }
                }
            }
            if (parantheseLevel > 0) {
                const error = new Error('Incomplete parantheses.');
                error.name = 'FormulaParseError';
                throw error;
            }
            return '';
        }
        /**
         * Extracts the inner string value.
         *
         * @private
         *
         * @param {string} text
         * Text string to extract from.
         *
         * @return {string}
         * Extracted string. If not found an exception will be thrown.
         */
        function extractString(text) {
            let start = -1;
            for (let i = 0, iEnd = text.length, char, escaping = false; i < iEnd; ++i) {
                char = text[i];
                if (char === '\\') {
                    escaping = !escaping;
                    continue;
                }
                if (escaping) {
                    escaping = false;
                    continue;
                }
                if (char === '"') {
                    if (start < 0) {
                        start = i;
                    }
                    else {
                        return text.substring(start + 1, i); // i is excluding
                    }
                }
            }
            const error = new Error('Incomplete string.');
            error.name = 'FormulaParseError';
            throw error;
        }
        /**
         * Parses an argument string. Formula arrays with a single term will be
         * simplified to the term.
         *
         * @private
         *
         * @param {string} text
         * Argument string to parse.
         *
         * @param {boolean} alternativeSeparators
         * Whether to expect `;` as argument separator and `,` as decimal separator.
         *
         * @return {Formula|Function|Range|Reference|Value}
         * The recognized term structure.
         */
        function parseArgument(text, alternativeSeparators) {
            let match;
            // Check for a R1C1:R1C1 range notation
            match = text.match(rangeR1C1RegExp);
            if (match) {
                const beginColumnRelative = (match[2] === '' || match[2][0] === '[');
                const beginRowRelative = (match[1] === '' || match[1][0] === '[');
                const endColumnRelative = (match[4] === '' || match[4][0] === '[');
                const endRowRelative = (match[3] === '' || match[3][0] === '[');
                const range = {
                    type: 'range',
                    beginColumn: (beginColumnRelative ?
                        parseInt(match[2].substring(1, -1) || '0', 10) :
                        parseInt(match[2], 10) - 1),
                    beginRow: (beginRowRelative ?
                        parseInt(match[1].substring(1, -1) || '0', 10) :
                        parseInt(match[1], 10) - 1),
                    endColumn: (endColumnRelative ?
                        parseInt(match[4].substring(1, -1) || '0', 10) :
                        parseInt(match[4], 10) - 1),
                    endRow: (endRowRelative ?
                        parseInt(match[3].substring(1, -1) || '0', 10) :
                        parseInt(match[3], 10) - 1)
                };
                if (beginColumnRelative) {
                    range.beginColumnRelative = true;
                }
                if (beginRowRelative) {
                    range.beginRowRelative = true;
                }
                if (endColumnRelative) {
                    range.endColumnRelative = true;
                }
                if (endRowRelative) {
                    range.endRowRelative = true;
                }
                return range;
            }
            // Check for a A1:A1 range notation
            match = text.match(rangeA1RegExp);
            if (match) {
                const beginColumnRelative = match[1][0] !== '$';
                const beginRowRelative = match[2][0] !== '$';
                const endColumnRelative = match[3][0] !== '$';
                const endRowRelative = match[4][0] !== '$';
                const range = {
                    type: 'range',
                    beginColumn: parseReferenceColumn(beginColumnRelative ?
                        match[1] :
                        match[1].substring(1)) - 1,
                    beginRow: parseInt(beginRowRelative ?
                        match[2] :
                        match[2].substring(1), 10) - 1,
                    endColumn: parseReferenceColumn(endColumnRelative ?
                        match[3] :
                        match[3].substring(1)) - 1,
                    endRow: parseInt(endRowRelative ?
                        match[4] :
                        match[4].substring(1), 10) - 1
                };
                if (beginColumnRelative) {
                    range.beginColumnRelative = true;
                }
                if (beginRowRelative) {
                    range.beginRowRelative = true;
                }
                if (endColumnRelative) {
                    range.endColumnRelative = true;
                }
                if (endRowRelative) {
                    range.endRowRelative = true;
                }
                return range;
            }
            // Fallback to formula processing for other pattern types
            const formula = parseFormula(text, alternativeSeparators);
            return (formula.length === 1 && typeof formula[0] !== 'string' ?
                formula[0] :
                formula);
        }
        /**
         * Parse arguments string inside function parantheses.
         *
         * @private
         *
         * @param {string} text
         * Parantheses string of the function.
         *
         * @param {boolean} alternativeSeparators
         * Whether to expect `;` as argument separator and `,` as decimal separator.
         *
         * @return {Highcharts.FormulaArguments}
         * Parsed arguments array.
         */
        function parseArguments(text, alternativeSeparators) {
            const args = [], argumentsSeparator = (alternativeSeparators ? ';' : ',');
            let parantheseLevel = 0, term = '';
            for (let i = 0, iEnd = text.length, char; i < iEnd; ++i) {
                char = text[i];
                // Check for separator
                if (char === argumentsSeparator &&
                    !parantheseLevel &&
                    term) {
                    args.push(parseArgument(term, alternativeSeparators));
                    term = '';
                    // Check for a quoted string before skip logic
                }
                else if (char === '"' &&
                    !parantheseLevel &&
                    !term) {
                    const string = extractString(text.substring(i));
                    args.push(string);
                    i += string.length + 1; // only +1 to cover ++i in for-loop
                    // Skip space and check paranthesis nesting
                }
                else if (char !== ' ') {
                    term += char;
                    if (char === '(') {
                        ++parantheseLevel;
                    }
                    else if (char === ')') {
                        --parantheseLevel;
                    }
                }
            }
            // look for left-overs from last argument
            if (!parantheseLevel && term) {
                args.push(parseArgument(term, alternativeSeparators));
            }
            return args;
        }
        /**
         * Converts a spreadsheet formula string into a formula array. Throws a
         * `FormulaParserError` when the string can not be parsed.
         *
         * @private
         * @function Formula.parseFormula
         *
         * @param {string} text
         * Spreadsheet formula string, without the leading `=`.
         *
         * @param {boolean} alternativeSeparators
         * * `false` to expect `,` between arguments and `.` in decimals.
         * * `true` to expect `;` between arguments and `,` in decimals.
         *
         * @return {Formula.Formula}
         * Formula array representing the string.
         */
        function parseFormula(text, alternativeSeparators) {
            const decimalRegExp = (alternativeSeparators ?
                decimal2RegExp :
                decimal1RegExp), formula = [];
            let match, next = (text[0] === '=' ? text.substring(1) : text).trim();
            while (next) {
                // Check for an R1C1 reference notation
                match = next.match(referenceR1C1RegExp);
                if (match) {
                    const columnRelative = (match[2] === '' || match[2][0] === '[');
                    const rowRelative = (match[1] === '' || match[1][0] === '[');
                    const reference = {
                        type: 'reference',
                        column: (columnRelative ?
                            parseInt(match[2].substring(1, -1) || '0', 10) :
                            parseInt(match[2], 10) - 1),
                        row: (rowRelative ?
                            parseInt(match[1].substring(1, -1) || '0', 10) :
                            parseInt(match[1], 10) - 1)
                    };
                    if (columnRelative) {
                        reference.columnRelative = true;
                    }
                    if (rowRelative) {
                        reference.rowRelative = true;
                    }
                    formula.push(reference);
                    next = next.substring(match[0].length).trim();
                    continue;
                }
                // Check for an A1 reference notation
                match = next.match(referenceA1RegExp);
                if (match) {
                    const columnRelative = match[1][0] !== '$';
                    const rowRelative = match[2][0] !== '$';
                    const reference = {
                        type: 'reference',
                        column: parseReferenceColumn(columnRelative ?
                            match[1] :
                            match[1].substring(1)) - 1,
                        row: parseInt(rowRelative ?
                            match[2] :
                            match[2].substring(1), 10) - 1
                    };
                    if (columnRelative) {
                        reference.columnRelative = true;
                    }
                    if (rowRelative) {
                        reference.rowRelative = true;
                    }
                    formula.push(reference);
                    next = next.substring(match[0].length).trim();
                    continue;
                }
                // Check for a formula operator
                match = next.match(operatorRegExp);
                if (match) {
                    formula.push(match[0]);
                    next = next.substring(match[0].length).trim();
                    continue;
                }
                // Check for a boolean value
                match = next.match(booleanRegExp);
                if (match) {
                    formula.push(match[0] === 'TRUE');
                    next = next.substring(match[0].length).trim();
                    continue;
                }
                // Check for a number value
                match = next.match(decimalRegExp);
                if (match) {
                    formula.push(parseFloat(match[0]));
                    next = next.substring(match[0].length).trim();
                    continue;
                }
                // Check for a quoted string
                if (next[0] === '"') {
                    const string = extractString(next);
                    formula.push(string.substring(1, -1));
                    next = next.substring(string.length + 2).trim();
                    continue;
                }
                // Check for a function
                match = next.match(functionRegExp);
                if (match) {
                    next = next.substring(match[1].length).trim();
                    const parantheses = extractParantheses(next);
                    formula.push({
                        type: 'function',
                        name: match[1],
                        args: parseArguments(parantheses, alternativeSeparators)
                    });
                    next = next.substring(parantheses.length + 2).trim();
                    continue;
                }
                // Check for a formula in parantheses
                if (next[0] === '(') {
                    const paranteses = extractParantheses(next);
                    if (paranteses) {
                        formula
                            .push(parseFormula(paranteses, alternativeSeparators));
                        next = next.substring(paranteses.length + 2).trim();
                        continue;
                    }
                }
                // Something is not right
                const position = text.length - next.length, error = new Error('Unexpected character `' +
                    text.substring(position, position + 1) +
                    '` at position ' + (position + 1) +
                    '. (`...' + text.substring(position - 5, position + 6) + '...`)');
                error.name = 'FormulaParseError';
                throw error;
            }
            return formula;
        }
        /**
         * Converts a reference column `A` of `A1` into a number. Supports endless sizes
         * `ZZZ...`, just limited by integer precision.
         *
         * @private
         *
         * @param {string} text
         * Column string to convert.
         *
         * @return {number}
         * Converted column index.
         */
        function parseReferenceColumn(text) {
            let column = 0;
            for (let i = 0, iEnd = text.length, code, factor = text.length - 1; i < iEnd; ++i) {
                code = text.charCodeAt(i);
                if (code >= 65 && code <= 90) {
                    column += (code - 64) * Math.pow(26, factor);
                }
                --factor;
            }
            return column;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const FormulaParser = {
            parseFormula
        };

        return FormulaParser;
    });
    _registerModule(_modules, 'Data/Formula/FormulaTypes.js', [], function () {
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
        /* *
         *
         *  Constants
         *
         * */
        /**
         * Array of all possible operators.
         * @private
         */
        const operators = ['+', '-', '*', '/', '^', '=', '<', '<=', '>', '>='];
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Tests an item for a Formula array.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is a formula (or argument) array.
         */
        function isFormula(item) {
            return item instanceof Array;
        }
        /**
         * Tests an item for a Function structure.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is a formula function.
         */
        function isFunction(item) {
            return (typeof item === 'object' &&
                !(item instanceof Array) &&
                item.type === 'function');
        }
        /**
         * Tests an item for an Operator string.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is an operator string.
         */
        function isOperator(item) {
            return (typeof item === 'string' &&
                operators.indexOf(item) >= 0);
        }
        /**
         * Tests an item for a Range structure.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is a range.
         */
        function isRange(item) {
            return (typeof item === 'object' &&
                !(item instanceof Array) &&
                item.type === 'range');
        }
        /**
         * Tests an item for a Reference structure.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is a reference.
         */
        function isReference(item) {
            return (typeof item === 'object' &&
                !(item instanceof Array) &&
                item.type === 'reference');
        }
        /**
         * Tests an item for a Value structure.
         *
         * @private
         *
         * @param {Highcharts.FormulaItem|null|undefined} item
         * Item to test.
         *
         * @return {boolean}
         * `true`, if the item is a value.
         */
        function isValue(item) {
            return (typeof item === 'boolean' ||
                typeof item === 'number' ||
                typeof item === 'string');
        }
        /* *
         *
         *  Default Export
         *
         * */
        const MathFormula = {
            isFormula,
            isFunction,
            isOperator,
            isRange,
            isReference,
            isValue
        };

        return MathFormula;
    });
    _registerModule(_modules, 'Data/Formula/FormulaProcessor.js', [_modules['Data/Formula/FormulaTypes.js']], function (FormulaTypes) {
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
        const { isFormula, isFunction, isOperator, isRange, isReference, isValue } = FormulaTypes;
        /* *
         *
         *  Constants
         *
         * */
        const asLogicalStringRegExp = / */;
        const MAX_FALSE = Number.MAX_VALUE / 1.000000000001;
        const MAX_STRING = Number.MAX_VALUE / 1.000000000002;
        const MAX_TRUE = Number.MAX_VALUE;
        const operatorPriority = {
            '^': 3,
            '*': 2,
            '/': 2,
            '+': 1,
            '-': 1,
            '=': 0,
            '<': 0,
            '<=': 0,
            '>': 0,
            '>=': 0
        };
        const processorFunctions = {};
        const processorFunctionNameRegExp = /^[A-Z][A-Z\.]*$/;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Converts non-number types to logical numbers.
         *
         * @param {Highcharts.FormulaValue} value
         * Value to convert.
         *
         * @return {number}
         * Logical number value. `NaN` if not convertable.
         */
        function asLogicalNumber(value) {
            switch (typeof value) {
                case 'boolean':
                    return value ? MAX_TRUE : MAX_FALSE;
                case 'string':
                    return MAX_STRING;
                case 'number':
                    return value;
                default:
                    return NaN;
            }
        }
        /**
         * Converts strings to logical strings, while other types get passed through. In
         * logical strings the space character is the lowest value and letters are case
         * insensitive.
         *
         * @param {Highcharts.FormulaValue} value
         * Value to convert.
         *
         * @return {Highcharts.FormulaValue}
         * Logical string value or passed through value.
         */
        function asLogicalString(value) {
            if (typeof value === 'string') {
                return value.toLowerCase().replace(asLogicalStringRegExp, '\0');
            }
            return value;
        }
        /**
         * Converts non-number types to a logic number.
         *
         * @param {Highcharts.FormulaValue} value
         * Value to convert.
         *
         * @return {number}
         * Number value. `NaN` if not convertable.
         */
        function asNumber(value) {
            switch (typeof value) {
                case 'boolean':
                    return value ? 1 : 0;
                case 'string':
                    return parseFloat(value.replace(',', '.'));
                case 'number':
                    return value;
                default:
                    return NaN;
            }
        }
        /**
         * Process a basic operation of two given values.
         *
         * @private
         *
         * @param {Highcharts.FormulaOperator} operator
         * Operator between values.
         *
         * @param {Highcharts.FormulaValue} x
         * First value for operation.
         *
         * @param {Highcharts.FormulaValue} y
         * Second value for operation.
         *
         * @return {Highcharts.FormulaValue}
         * Operation result. `NaN` if operation is not support.
         */
        function basicOperation(operator, x, y) {
            switch (operator) {
                case '=':
                    return asLogicalString(x) === asLogicalString(y);
                case '<':
                    if (typeof x === typeof y) {
                        return asLogicalString(x) < asLogicalString(y);
                    }
                    return asLogicalNumber(x) < asLogicalNumber(y);
                case '<=':
                    if (typeof x === typeof y) {
                        return asLogicalString(x) <= asLogicalString(y);
                    }
                    return asLogicalNumber(x) <= asLogicalNumber(y);
                case '>':
                    if (typeof x === typeof y) {
                        return asLogicalString(x) > asLogicalString(y);
                    }
                    return asLogicalNumber(x) > asLogicalNumber(y);
                case '>=':
                    if (typeof x === typeof y) {
                        return asLogicalString(x) >= asLogicalString(y);
                    }
                    return asLogicalNumber(x) >= asLogicalNumber(y);
            }
            x = asNumber(x);
            y = asNumber(y);
            let result;
            switch (operator) {
                case '+':
                    result = x + y;
                    break;
                case '-':
                    result = x - y;
                    break;
                case '*':
                    result = x * y;
                    break;
                case '/':
                    result = x / y;
                    break;
                case '^':
                    result = Math.pow(x, y);
                    break;
                default:
                    return NaN;
            }
            // limit decimal to 9 digits
            return (result % 1 ?
                Math.round(result * 1000000000) / 1000000000 :
                result);
        }
        /**
         * Converts an argument to Value and in case of a range to an array of Values.
         *
         * @function Highcharts.Formula.getArgumentValue
         *
         * @param {Highcharts.FormulaRange|Highcharts.FormulaTerm} arg
         * Formula range or term to convert.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {Highcharts.FormulaValue|Array<Highcharts.FormulaValue>}
         * Converted value.
         */
        function getArgumentValue(arg, table) {
            // Add value
            if (isValue(arg)) {
                return arg;
            }
            // Add values of a range
            if (isRange(arg)) {
                return (table && getRangeValues(arg, table) || []);
            }
            // Add values of a function
            if (isFunction(arg)) {
                return processFunction(arg, table);
            }
            // Process functions, operations, references with formula processor
            return processFormula((isFormula(arg) ? arg : [arg]), table);
        }
        /**
         * Converts all arguments to Values and in case of ranges to arrays of Values.
         *
         * @function Highcharts.Formula.getArgumentsValues
         *
         * @param {Highcharts.FormulaArguments} args
         * Formula arguments to convert.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {Array<(Highcharts.FormulaValue|Array<Highcharts.FormulaValue>)>}
         * Converted values.
         */
        function getArgumentsValues(args, table) {
            const values = [];
            for (let i = 0, iEnd = args.length; i < iEnd; ++i) {
                values.push(getArgumentValue(args[i], table));
            }
            return values;
        }
        /**
         * Extracts cell values from a table for a given range.
         *
         * @function Highcharts.Formula.getRangeValues
         *
         * @param {Highcharts.FormulaRange} range
         * Formula range to use.
         *
         * @param {Highcharts.DataTable} table
         * Table to extract from.
         *
         * @return {Array<Highcharts.FormulaValue>}
         * Extracted values.
         */
        function getRangeValues(range, table) {
            const columnNames = table
                .getColumnNames()
                .slice(range.beginColumn, range.endColumn + 1), values = [];
            for (let i = 0, iEnd = columnNames.length, cell; i < iEnd; ++i) {
                const cells = table.getColumn(columnNames[i], true) || [];
                for (let j = range.beginRow, jEnd = range.endRow + 1; j < jEnd; ++j) {
                    cell = cells[j];
                    if (typeof cell === 'string' &&
                        cell[0] === '=' &&
                        table !== table.modified) {
                        // Look in the modified table for formula result
                        cell = table.modified.getCell(columnNames[i], j);
                    }
                    values.push(isValue(cell) ? cell : NaN);
                }
            }
            return values;
        }
        /**
         * Extracts the cell value from a table for a given reference.
         *
         * @private
         *
         * @param {Highcharts.FormulaReference} reference
         * Formula reference to use.
         *
         * @param {Highcharts.DataTable} table
         * Table to extract from.
         *
         * @return {Highcharts.FormulaValue}
         * Extracted value. 'undefined' might also indicate that the cell was not found.
         */
        function getReferenceValue(reference, table) {
            const columnName = table.getColumnNames()[reference.column];
            if (columnName) {
                const cell = table.getCell(columnName, reference.row);
                if (typeof cell === 'string' &&
                    cell[0] === '=' &&
                    table !== table.modified) {
                    // Look in the modified table for formula result
                    const result = table.modified.getCell(columnName, reference.row);
                    return isValue(result) ? result : NaN;
                }
                return isValue(cell) ? cell : NaN;
            }
            return NaN;
        }
        /**
         * Processes a formula array on the given table. If the formula does not contain
         * references or ranges, then no table has to be provided.
         *
         * @private
         * @function Highcharts.processFormula
         *
         * @param {Highcharts.Formula} formula
         * Formula array to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {Highcharts.FormulaValue}
         * Result value of the process. `NaN` indicates an error.
         */
        function processFormula(formula, table) {
            let x;
            for (let i = 0, iEnd = formula.length, item, operator, result, y; i < iEnd; ++i) {
                item = formula[i];
                // Remember operator for operation on next item
                if (isOperator(item)) {
                    operator = item;
                    continue;
                }
                // Next item is a value
                if (isValue(item)) {
                    y = item;
                    // Next item is a formula and needs to get processed first
                }
                else if (isFormula(item)) {
                    y = processFormula(formula, table);
                    // Next item is a function call and needs to get processed first
                }
                else if (isFunction(item)) {
                    result = processFunction(item, table);
                    y = (isValue(result) ? result : NaN); // arrays are not allowed here
                    // Next item is a reference and needs to get resolved
                }
                else if (isReference(item)) {
                    y = (table && getReferenceValue(item, table));
                }
                // If we have a next value, lets do the operation
                if (typeof y !== 'undefined') {
                    // Next value is our first value
                    if (typeof x === 'undefined') {
                        if (operator) {
                            x = basicOperation(operator, 0, y);
                        }
                        else {
                            x = y;
                        }
                        // Fail fast if no operator available
                    }
                    else if (!operator) {
                        return NaN;
                        // Regular next value
                    }
                    else {
                        const operator2 = formula[i + 1];
                        if (isOperator(operator2) &&
                            operatorPriority[operator2] > operatorPriority[operator]) {
                            y = basicOperation(operator2, y, processFormula(formula.slice(i + 2)));
                            i = iEnd;
                        }
                        x = basicOperation(operator, x, y);
                    }
                    operator = void 0;
                    y = void 0;
                }
            }
            return isValue(x) ? x : NaN;
        }
        /**
         * Process a function  on the give table. If the arguments do not contain
         * references or ranges, then no table has to be provided.
         *
         * @private
         *
         * @param {Highcharts.FormulaFunction} formulaFunction
         * Formula function to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @param {Highcharts.FormulaReference} [reference]
         * Table cell reference to use for relative references and ranges.
         *
         * @return {Highcharts.FormulaValue|Array<Highcharts.FormulaValue>}
         * Result value (or values) of the process. `NaN` indicates an error.
         */
        function processFunction(formulaFunction, table, reference // @todo
        ) {
            const processor = processorFunctions[formulaFunction.name];
            if (processor) {
                try {
                    return processor(formulaFunction.args, table);
                }
                catch {
                    return NaN;
                }
            }
            const error = new Error(`Function "${formulaFunction.name}" not found.`);
            error.name = 'FormulaProcessError';
            throw error;
        }
        /**
         * Registers a function for the FormulaProcessor.
         *
         * @param {string} name
         * Name of the function in spreadsheets notation with upper case.
         *
         * @param {Highcharts.FormulaFunction} processorFunction
         * ProcessorFunction for the FormulaProcessor. This is an object so that it
         * can take additional parameter for future validation routines.
         *
         * @return {boolean}
         * Return true, if the ProcessorFunction has been registered.
         */
        function registerProcessorFunction(name, processorFunction) {
            return (processorFunctionNameRegExp.test(name) &&
                !processorFunctions[name] &&
                !!(processorFunctions[name] = processorFunction));
        }
        /**
         * Translates relative references and ranges in-place.
         *
         * @param {Highcharts.Formula} formula
         * Formula to translate references and ranges in.
         *
         * @param {number} [columnDelta=0]
         * Column delta to translate to. Negative translate back.
         *
         * @param {number} [rowDelta=0]
         * Row delta to translate to. Negative numbers translate back.
         *
         * @return {Highcharts.Formula}
         * Formula with translated reference and ranges. This formula is equal to the
         * first argument.
         */
        function translateReferences(formula, columnDelta = 0, rowDelta = 0) {
            for (let i = 0, iEnd = formula.length, item; i < iEnd; ++i) {
                item = formula[i];
                if (item instanceof Array) {
                    translateReferences(item, columnDelta, rowDelta);
                }
                else if (isFunction(item)) {
                    translateReferences(item.args, columnDelta, rowDelta);
                }
                else if (isRange(item)) {
                    if (item.beginColumnRelative) {
                        item.beginColumn += columnDelta;
                    }
                    if (item.beginRowRelative) {
                        item.beginRow += rowDelta;
                    }
                    if (item.endColumnRelative) {
                        item.endColumn += columnDelta;
                    }
                    if (item.endRowRelative) {
                        item.endRow += rowDelta;
                    }
                }
                else if (isReference(item)) {
                    if (item.columnRelative) {
                        item.column += columnDelta;
                    }
                    if (item.rowRelative) {
                        item.row += rowDelta;
                    }
                }
            }
            return formula;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const FormulaProcessor = {
            asNumber,
            getArgumentValue,
            getArgumentsValues,
            getRangeValues,
            getReferenceValue,
            processFormula,
            processorFunctions,
            registerProcessorFunction,
            translateReferences
        };

        return FormulaProcessor;
    });
    _registerModule(_modules, 'Data/Formula/Functions/ABS.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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

        return ABS;
    });
    _registerModule(_modules, 'Data/Formula/Functions/AND.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `AND(...tests)` implementation. Returns `TRUE`, if all test
         * results are not `0` or `FALSE`.
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
         * @return {boolean}
         * Result value of the process.
         */
        function AND(args, table) {
            for (let i = 0, iEnd = args.length, value; i < iEnd; ++i) {
                value = getArgumentValue(args[i], table);
                if (!value ||
                    (typeof value === 'object' &&
                        !AND(value, table))) {
                    return false;
                }
            }
            return true;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('AND', AND);
        /* *
         *
         *  Default Export
         *
         * */

        return AND;
    });
    _registerModule(_modules, 'Data/Formula/Functions/AVERAGE.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentsValues } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `AVERAGE(...values)` implementation. Calculates the average
         * of the given values that are numbers.
         *
         * @private
         * @function Formula.processorFunctions.AVERAGE
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
        function AVERAGE(args, table) {
            const values = getArgumentsValues(args, table);
            let count = 0, result = 0;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (!isNaN(value)) {
                            ++count;
                            result += value;
                        }
                        break;
                    case 'object':
                        for (let j = 0, jEnd = value.length, value2; j < jEnd; ++j) {
                            value2 = value[j];
                            if (typeof value2 === 'number' &&
                                !isNaN(value2)) {
                                ++count;
                                result += value2;
                            }
                        }
                        break;
                }
            }
            return (count ? (result / count) : 0);
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('AVERAGE', AVERAGE);
        /* *
         *
         *  Default Export
         *
         * */

        return AVERAGE;
    });
    _registerModule(_modules, 'Data/Formula/Functions/AVERAGEA.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `AVERAGEA(...values)` implementation. Calculates the
         * average of the given values. Strings and FALSE are calculated as 0.
         *
         * @private
         * @function Formula.processorFunctions.AVERAGEA
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
        function AVERAGEA(args, table) {
            let count = 0, result = 0;
            for (let i = 0, iEnd = args.length, value; i < iEnd; ++i) {
                value = getArgumentValue(args[i], table);
                switch (typeof value) {
                    case 'boolean':
                        ++count;
                        result += (value ? 1 : 0);
                        continue;
                    case 'number':
                        if (!isNaN(value)) {
                            ++count;
                            result += value;
                        }
                        continue;
                    case 'string':
                        ++count;
                        continue;
                    default:
                        for (let j = 0, jEnd = value.length, value2; j < jEnd; ++j) {
                            value2 = value[j];
                            switch (typeof value2) {
                                case 'boolean':
                                    ++count;
                                    result += (value2 ? 1 : 0);
                                    continue;
                                case 'number':
                                    if (!isNaN(value2)) {
                                        ++count;
                                        result += value2;
                                    }
                                    continue;
                                case 'string':
                                    ++count;
                                    continue;
                            }
                        }
                        continue;
                }
            }
            return (count ? (result / count) : 0);
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('AVERAGEA', AVERAGEA);
        /* *
         *
         *  Default Export
         *
         * */

        return AVERAGEA;
    });
    _registerModule(_modules, 'Data/Formula/Functions/COUNT.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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

        return COUNT;
    });
    _registerModule(_modules, 'Data/Formula/Functions/COUNTA.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `COUNTA(...values)` implementation. Returns the count of
         * given values that are not empty.
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
        function COUNTA(args, table) {
            const values = FormulaProcessor.getArgumentsValues(args, table);
            let count = 0;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (isNaN(value)) {
                            continue;
                        }
                        break;
                    case 'object':
                        count += COUNTA(value, table);
                        continue;
                    case 'string':
                        if (!value) {
                            continue;
                        }
                        break;
                }
                ++count;
            }
            return count;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('COUNTA', COUNTA);
        /* *
         *
         *  Default Export
         *
         * */

        return COUNTA;
    });
    _registerModule(_modules, 'Data/Formula/Functions/IF.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `IF(test, value1, value2)` implementation. Returns one of
         * the values based on the test result. `value1` will be returned, if the test
         * result is not `0` or `FALSE`.
         *
         * @private
         * @function Formula.processorFunctions.IF
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {Highcharts.FormulaValue|Array<Highcharts.FormulaValue>}
         * Result value of the process.
         */
        function IF(args, table) {
            return (getArgumentValue(args[0], table) ?
                getArgumentValue(args[1], table) :
                getArgumentValue(args[2], table));
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('IF', IF);
        /* *
         *
         *  Default Export
         *
         * */

        return IF;
    });
    _registerModule(_modules, 'Data/Formula/Functions/ISNA.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `ISNA(value)` implementation. Returns TRUE if value is not
         * a number.
         *
         * @private
         * @function Formula.processorFunctions.ISNA
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {boolean}
         * Result value of the process.
         */
        function ISNA(args, table) {
            const value = getArgumentValue(args[0], table);
            return (typeof value !== 'number' || isNaN(value));
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('ISNA', ISNA);
        /* *
         *
         *  Default Export
         *
         * */

        return ISNA;
    });
    _registerModule(_modules, 'Data/Formula/Functions/MAX.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentsValues } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `MAX(...values)` implementation. Calculates the largest
         * of the given values that are numbers.
         *
         * @private
         * @function Formula.processorFunctions.MAX
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
        function MAX(args, table) {
            const values = getArgumentsValues(args, table);
            let result = Number.NEGATIVE_INFINITY;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (value > result) {
                            result = value;
                        }
                        break;
                    case 'object':
                        value = MAX(value);
                        if (value > result) {
                            result = value;
                        }
                        break;
                }
            }
            return isFinite(result) ? result : 0;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('MAX', MAX);
        /* *
         *
         *  Default Export
         *
         * */

        return MAX;
    });
    _registerModule(_modules, 'Data/Formula/Functions/MEDIAN.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `MEDIAN(...values)` implementation. Calculates the median
         * average of the given values.
         *
         * @private
         * @function Formula.processorFunctions.MEDIAN
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to process.
         *
         * @return {number}
         * Result value of the process.
         */
        function MEDIAN(args, table) {
            const median = [], values = FormulaProcessor.getArgumentsValues(args, table);
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (!isNaN(value)) {
                            median.push(value);
                        }
                        break;
                    case 'object':
                        for (let j = 0, jEnd = value.length, value2; j < jEnd; ++j) {
                            value2 = value[j];
                            if (typeof value2 === 'number' &&
                                !isNaN(value2)) {
                                median.push(value2);
                            }
                        }
                        break;
                }
            }
            const count = median.length;
            if (!count) {
                return NaN;
            }
            const half = Math.floor(count / 2); // floor because index starts at 0
            return (count % 2 ?
                median[half] : // odd
                (median[half - 1] + median[half]) / 2 // even
            );
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('MEDIAN', MEDIAN);
        /* *
         *
         *  Default Export
         *
         * */

        return MEDIAN;
    });
    _registerModule(_modules, 'Data/Formula/Functions/MIN.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentsValues } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `MIN(...values)` implementation. Calculates the lowest
         * of the given values that are numbers.
         *
         * @private
         * @function Formula.processorFunctions.MIN
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
        function MIN(args, table) {
            const values = getArgumentsValues(args, table);
            let result = Number.POSITIVE_INFINITY;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (value < result) {
                            result = value;
                        }
                        break;
                    case 'object':
                        value = MIN(value);
                        if (value < result) {
                            result = value;
                        }
                        break;
                }
            }
            return isFinite(result) ? result : 0;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('MIN', MIN);
        /* *
         *
         *  Default Export
         *
         * */

        return MIN;
    });
    _registerModule(_modules, 'Data/Formula/Functions/MOD.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `MOD(value1, value2)` implementation. Calculates the rest
         * of the division with the given values.
         *
         * @private
         * @function Formula.processorFunctions.MOD
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
        function MOD(args, table) {
            let value1 = getArgumentValue(args[0], table), value2 = getArgumentValue(args[1], table);
            if (typeof value1 === 'object') {
                value1 = value1[0];
            }
            if (typeof value2 === 'object') {
                value2 = value2[0];
            }
            if (typeof value1 !== 'number' ||
                typeof value2 !== 'number' ||
                value2 === 0) {
                return NaN;
            }
            return value1 % value2;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('MOD', MOD);
        /* *
         *
         *  Default Export
         *
         * */

        return MOD;
    });
    _registerModule(_modules, 'Data/Formula/Functions/MODE.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Creates the mode map of the given arguments.
         *
         * @private
         * @function Formula.processorFunctions.MULT
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to process.
         *
         * @return {number}
         * Result value of the process.
         */
        function getModeMap(args, table) {
            const modeMap = {}, values = FormulaProcessor.getArgumentsValues(args, table);
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (!isNaN(value)) {
                            modeMap[value] = (modeMap[value] || 0) + 1;
                        }
                        break;
                    case 'object':
                        for (let j = 0, jEnd = value.length, value2; j < jEnd; ++j) {
                            value2 = value[j];
                            if (typeof value2 === 'number' &&
                                !isNaN(value2)) {
                                modeMap[value2] = (modeMap[value2] || 0) + 1;
                            }
                        }
                        break;
                }
            }
            return modeMap;
        }
        /**
         * Processor for the `MODE.MULT(...values)` implementation. Calculates the most
         * frequent values of the give values.
         *
         * @private
         * @function Formula.processorFunctions.MULT
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to process.
         *
         * @return {number|Array<number>}
         * Result value of the process.
         */
        function MULT(args, table) {
            const modeMap = getModeMap(args, table), keys = Object.keys(modeMap);
            if (!keys.length) {
                return NaN;
            }
            let modeKeys = [parseFloat(keys[0])], modeCount = modeMap[keys[0]];
            for (let i = 1, iEnd = keys.length, key, count; i < iEnd; ++i) {
                key = keys[i];
                count = modeMap[key];
                if (modeCount < count) {
                    modeKeys = [parseFloat(key)];
                    modeCount = count;
                }
                else if (modeCount === count) {
                    modeKeys.push(parseFloat(key));
                }
            }
            return modeCount > 1 ? modeKeys : NaN;
        }
        /**
         * Processor for the `MODE.SNGL(...values)` implementation. Calculates the
         * lowest most frequent value of the give values.
         *
         * @private
         * @function Formula.processorFunctions['MODE.SNGL']
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to process.
         *
         * @return {number}
         * Result value of the process.
         */
        function SNGL(args, table) {
            const modeMap = getModeMap(args, table), keys = Object.keys(modeMap);
            if (!keys.length) {
                return NaN;
            }
            let modeKey = parseFloat(keys[0]), modeCount = modeMap[keys[0]];
            for (let i = 1, iEnd = keys.length, key, keyValue, count; i < iEnd; ++i) {
                key = keys[i];
                count = modeMap[key];
                if (modeCount < count) {
                    modeKey = parseFloat(key);
                    modeCount = count;
                }
                else if (modeCount === count) {
                    keyValue = parseFloat(key);
                    if (modeKey > keyValue) {
                        modeKey = keyValue;
                        modeCount = count;
                    }
                }
            }
            return modeCount > 1 ? modeKey : NaN;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('MODE', SNGL);
        FormulaProcessor.registerProcessorFunction('MODE.MULT', MULT);
        FormulaProcessor.registerProcessorFunction('MODE.SNGL', SNGL);
        /* *
         *
         *  Default Export
         *
         * */
        const MODE = {
            MULT,
            SNGL
        };

        return MODE;
    });
    _registerModule(_modules, 'Data/Formula/Functions/NOT.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `NOT(value)` implementation. Returns the opposite test
         * result.
         *
         * @private
         * @function Formula.processorFunctions.NOT
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to use for references and ranges.
         *
         * @return {boolean|number}
         * Result value of the process.
         */
        function NOT(args, table) {
            let value = getArgumentValue(args[0], table);
            if (typeof value === 'object') {
                value = value[0];
            }
            switch (typeof value) {
                case 'boolean':
                case 'number':
                    return !value;
            }
            return NaN;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('NOT', NOT);
        /* *
         *
         *  Default Export
         *
         * */

        return NOT;
    });
    _registerModule(_modules, 'Data/Formula/Functions/OR.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `OR(...tests)` implementation. Returns `TRUE`, if one test
         * result is not `0` or `FALSE`.
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
         * @return {boolean}
         * Result value of the process.
         */
        function OR(args, table) {
            for (let i = 0, iEnd = args.length, value; i < iEnd; ++i) {
                value = getArgumentValue(args[i], table);
                if (typeof value === 'object') {
                    if (OR(value, table)) {
                        return true;
                    }
                }
                else if (value) {
                    return true;
                }
            }
            return false;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('OR', OR);
        /* *
         *
         *  Default Export
         *
         * */

        return OR;
    });
    _registerModule(_modules, 'Data/Formula/Functions/PRODUCT.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentsValues } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `PRODUCT(...values)` implementation. Calculates the product
         * of the given values.
         *
         * @private
         * @function Formula.processorFunctions.PRODUCT
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
        function PRODUCT(args, table) {
            const values = getArgumentsValues(args, table);
            let result = 1, calculated = false;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (!isNaN(value)) {
                            calculated = true;
                            result *= value;
                        }
                        break;
                    case 'object':
                        calculated = true;
                        result *= PRODUCT(value, table);
                        break;
                }
            }
            return (calculated ? result : 0);
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('PRODUCT', PRODUCT);
        /* *
         *
         *  Default Export
         *
         * */

        return PRODUCT;
    });
    _registerModule(_modules, 'Data/Formula/Functions/SUM.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `SUM(...values)` implementation. Calculates the sum of the
         * given values.
         *
         * @private
         * @function Formula.processorFunctions.SUM
         *
         * @param {Highcharts.FormulaArguments} args
         * Arguments to process.
         *
         * @param {Highcharts.DataTable} [table]
         * Table to process.
         *
         * @return {number}
         * Result value of the process.
         */
        function SUM(args, table) {
            const values = FormulaProcessor.getArgumentsValues(args, table);
            let result = 0;
            for (let i = 0, iEnd = values.length, value; i < iEnd; ++i) {
                value = values[i];
                switch (typeof value) {
                    case 'number':
                        if (!isNaN(value)) {
                            result += value;
                        }
                        break;
                    case 'object':
                        result += SUM(value, table);
                        break;
                }
            }
            return result;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('SUM', SUM); // 🐝
        /* *
         *
         *  Default Export
         *
         * */

        return SUM;
    });
    _registerModule(_modules, 'Data/Formula/Functions/XOR.js', [_modules['Data/Formula/FormulaProcessor.js']], function (FormulaProcessor) {
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
        const { getArgumentValue } = FormulaProcessor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Processor for the `XOR(...tests)` implementation. Returns `TRUE`, if at least
         * one of the given tests differs in result of other tests.
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
         * @return {boolean|number}
         * Result value of the process.
         */
        function XOR(args, table) {
            for (let i = 0, iEnd = args.length, lastValue, value; i < iEnd; ++i) {
                value = getArgumentValue(args[i], table);
                switch (typeof value) {
                    case 'boolean':
                    case 'number':
                        if (typeof lastValue === 'undefined') {
                            lastValue = !!value;
                        }
                        else if (!!value !== lastValue) {
                            return true;
                        }
                        break;
                    case 'object':
                        for (let j = 0, jEnd = value.length, value2; j < jEnd; ++j) {
                            value2 = value[j];
                            switch (typeof value2) {
                                case 'boolean':
                                case 'number':
                                    if (typeof lastValue === 'undefined') {
                                        lastValue = !!value2;
                                    }
                                    else if (!!value2 !== lastValue) {
                                        return true;
                                    }
                                    break;
                            }
                        }
                        break;
                }
            }
            return false;
        }
        /* *
         *
         *  Registry
         *
         * */
        FormulaProcessor.registerProcessorFunction('XOR', XOR);
        /* *
         *
         *  Default Export
         *
         * */

        return XOR;
    });
    _registerModule(_modules, 'Data/Formula/Formula.js', [_modules['Data/Formula/FormulaParser.js'], _modules['Data/Formula/FormulaProcessor.js'], _modules['Data/Formula/FormulaTypes.js']], function (FormulaParser, FormulaProcessor, FormulaType) {
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
        /* *
         *
         *  Imports
         *
         * */
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * Formula engine to make use of spreadsheet formula strings.
         * @internal
         */
        const Formula = {
            ...FormulaParser,
            ...FormulaProcessor,
            ...FormulaType
        };

        return Formula;
    });
    _registerModule(_modules, 'Data/Modifiers/MathModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Data/Formula/FormulaParser.js'], _modules['Data/Formula/FormulaProcessor.js']], function (DataModifier, FormulaParser, FormulaProcessor) {
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
        /* *
         *
         *  Class
         *
         * */
        /**
         * Replaces formula strings in a table with calculated values.
         *
         * @private
         * @class
         * @name Highcharts.DataModifier.types.MathModifier
         * @augments Highcharts.DataModifier
         */
        class MathModifier extends DataModifier {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(options) {
                super();
                this.options = {
                    ...MathModifier.defaultOptions,
                    ...options
                };
            }
            /* *
             *
             *  Functions
             *
             * */
            modifyTable(table, eventDetail) {
                const modifier = this;
                modifier.emit({ type: 'modify', detail: eventDetail, table });
                const alternativeSeparators = modifier.options.alternativeSeparators, formulaColumns = (modifier.options.formulaColumns ||
                    table.getColumnNames()), modified = table.modified;
                for (let i = 0, iEnd = formulaColumns.length, columnName; i < iEnd; ++i) {
                    columnName = formulaColumns[i];
                    if (formulaColumns.indexOf(columnName) >= 0) {
                        modified.setColumn(columnName, modifier.processColumn(table, columnName));
                    }
                }
                const columnFormulas = (modifier.options.columnFormulas || []);
                for (let i = 0, iEnd = columnFormulas.length, columnFormula, formula; i < iEnd; ++i) {
                    columnFormula = columnFormulas[i];
                    formula = FormulaParser.parseFormula(columnFormula.formula, alternativeSeparators);
                    modified.setColumn(columnFormula.column, modifier.processColumnFormula(formula, table, columnFormula.rowStart, columnFormula.rowEnd));
                }
                modifier.emit({ type: 'afterModify', detail: eventDetail, table });
                return table;
            }
            /**
             * Process a column by replacing formula strings with calculated values.
             *
             * @private
             *
             * @param {Highcharts.DataTable} table
             * Table to extract column from and use as reference.
             *
             * @param {string} columnNameOrAlias
             * Name or alias of column to process.
             *
             * @param {number} rowIndex
             * Row index to start the replacing process from.
             *
             * @return {Highcharts.DataTableColumn}
             * Returns the processed table column.
             */
            processColumn(table, columnNameOrAlias, rowIndex = 0) {
                const alternativeSeparators = this.options.alternativeSeparators, column = (table.getColumn(columnNameOrAlias, true) || [])
                    .slice(rowIndex > 0 ? rowIndex : 0);
                for (let i = 0, iEnd = column.length, cacheFormula = [], cacheString = '', cell; i < iEnd; ++i) {
                    cell = column[i];
                    if (typeof cell === 'string' &&
                        cell[0] === '=') {
                        try {
                            // use cache while formula string is repetitive
                            cacheFormula = (cacheString === cell ?
                                cacheFormula :
                                FormulaParser.parseFormula(cell.substring(1), alternativeSeparators));
                            // process parsed formula string
                            column[i] =
                                FormulaProcessor.processFormula(cacheFormula, table);
                        }
                        catch {
                            column[i] = NaN;
                        }
                    }
                }
                return column;
            }
            /**
             * Process a column by replacing cell values with calculated values from a
             * given formula.
             *
             * @private
             *
             * @param {Highcharts.Formula} formula
             * Formula to use for processing.
             *
             * @param {Highcharts.DataTable} table
             * Table to extract column from and use as reference.
             *
             * @param {number} rowStart
             * Row index to start the replacing process from.
             *
             * @param {number} rowEnd
             * Row index to end the replacing process.
             *
             * @return {Highcharts.DataTableColumn}
             * Returns the processed table column.
             */
            processColumnFormula(formula, table, rowStart = 0, rowEnd = table.getRowCount()) {
                rowStart = rowStart >= 0 ? rowStart : 0;
                rowEnd = rowEnd >= 0 ? rowEnd : table.getRowCount() + rowEnd;
                const column = [], modified = table.modified;
                for (let i = 0, iEnd = (rowEnd - rowStart); i < iEnd; ++i) {
                    try {
                        column[i] = FormulaProcessor.processFormula(formula, modified);
                    }
                    catch {
                        column[i] = NaN;
                    }
                    finally {
                        formula = FormulaProcessor.translateReferences(formula, 0, 1);
                    }
                }
                return column;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options of MathModifier.
         * @private
         */
        MathModifier.defaultOptions = {
            type: 'Math',
            alternativeSeparators: false
        };
        DataModifier.registerType('Math', MathModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return MathModifier;
    });
    _registerModule(_modules, 'masters/modules/math-modifier.src.js', [_modules['Dashboards/Globals.js'], _modules['Data/Formula/Formula.js']], function (Globals, Formula) {

        /* *
         *
         *  Imports
         *
         * */
        // Fill registries
        /* *
         *
         *  Namespace
         *
         * */
        const G = Globals;
        G.Formula = Formula;
        /* *
         *
         *  Default Export
         *
         * */

        return G;
    });
}));