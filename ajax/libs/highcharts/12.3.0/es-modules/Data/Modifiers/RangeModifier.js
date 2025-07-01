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
 *  - Dawid Dragula
 *
 * */
'use strict';
import DataModifier from './DataModifier.js';
import U from '../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Filters out table rows with a specific value range.
 *
 */
class RangeModifier extends DataModifier {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the range modifier.
     *
     * @param {Partial<RangeModifier.Options>} [options]
     * Options to configure the range modifier.
     */
    constructor(options) {
        super();
        this.options = merge(RangeModifier.defaultOptions, options);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Replaces table rows with filtered rows.
     *
     * @param {DataTable} table
     * Table to modify.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {DataTable}
     * Table with `modified` property as a reference.
     */
    modifyTable(table, eventDetail) {
        const modifier = this;
        modifier.emit({ type: 'modify', detail: eventDetail, table });
        let indexes = [];
        const { additive, ranges, strict } = modifier.options;
        if (ranges.length) {
            const modified = table.modified;
            let columns = table.getColumns(), rows = [];
            for (let i = 0, iEnd = ranges.length, range, rangeColumn; i < iEnd; ++i) {
                range = ranges[i];
                if (strict &&
                    typeof range.minValue !== typeof range.maxValue) {
                    continue;
                }
                if (i > 0 && !additive) {
                    modified.deleteRows();
                    modified.setRows(rows);
                    modified.setOriginalRowIndexes(indexes, true);
                    columns = modified.getColumns();
                    rows = [];
                    indexes = [];
                }
                rangeColumn = (columns[range.column] || []);
                for (let j = 0, jEnd = rangeColumn.length, cell, row, originalRowIndex; j < jEnd; ++j) {
                    cell = rangeColumn[j];
                    switch (typeof cell) {
                        default:
                            continue;
                        case 'boolean':
                        case 'number':
                        case 'string':
                            break;
                    }
                    if (strict &&
                        typeof cell !== typeof range.minValue) {
                        continue;
                    }
                    if (cell >= range.minValue &&
                        cell <= range.maxValue) {
                        if (additive) {
                            row = table.getRow(j);
                            originalRowIndex = table.getOriginalRowIndex(j);
                        }
                        else {
                            row = modified.getRow(j);
                            originalRowIndex = modified.getOriginalRowIndex(j);
                        }
                        if (row) {
                            rows.push(row);
                            indexes.push(originalRowIndex);
                        }
                    }
                }
            }
            modified.deleteRows();
            modified.setRows(rows);
            modified.setOriginalRowIndexes(indexes);
        }
        modifier.emit({ type: 'afterModify', detail: eventDetail, table });
        return table;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Default options for the range modifier.
 */
RangeModifier.defaultOptions = {
    type: 'Range',
    ranges: []
};
DataModifier.registerType('Range', RangeModifier);
/* *
 *
 *  Default Export
 *
 * */
export default RangeModifier;
