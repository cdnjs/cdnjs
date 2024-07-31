import { printSingleValue } from './utils.js';
/**
 * Converts a list of filters into a readable string.
 */
export function printFilters(filters) {
    return filters.map(filter => printFilter(filter)).join(', ');
}
/**
 * Converts a filter into a readable string.
 */
export function printFilter(filter) {
    let s = '';
    if (typeof filter !== 'undefined' && filter !== null) {
        if (filter instanceof Array) {
            if (filter.length >= 2) {
                s = `[${filter.map(e => printSingleValue(e)).join(' -> ')}]`;
            }
            else if (filter.length >= 1) {
                s = printSingleValue(filter[0]);
            }
        }
        else {
            s = printSingleValue(filter);
        }
    }
    return s;
}
//# sourceMappingURL=printers.js.map