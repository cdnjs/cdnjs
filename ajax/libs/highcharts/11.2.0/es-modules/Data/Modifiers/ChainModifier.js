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
import DataModifier from './DataModifier.js';
import U from '../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Modifies a table with the help of modifiers in an ordered chain.
 *
 * @private
 */
class ChainModifier extends DataModifier {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the modifier chain.
     *
     * @param {Partial<ChainModifier.Options>} [options]
     * Options to configure the modifier chain.
     *
     * @param {...DataModifier} [chain]
     * Ordered chain of modifiers.
     */
    constructor(options, ...chain) {
        super();
        this.chain = chain;
        this.options = merge(ChainModifier.defaultOptions, options);
        const optionsChain = this.options.chain || [];
        for (let i = 0, iEnd = optionsChain.length, modifierOptions, ModifierClass; i < iEnd; ++i) {
            modifierOptions = optionsChain[i];
            if (!modifierOptions.type) {
                continue;
            }
            ModifierClass = DataModifier.types[modifierOptions.type];
            if (ModifierClass) {
                chain.push(new ModifierClass(modifierOptions));
            }
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Adds a configured modifier to the end of the modifier chain. Please note,
     * that the modifier can be added multiple times.
     *
     * @param {DataModifier} modifier
     * Configured modifier to add.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     */
    add(modifier, eventDetail) {
        this.emit({
            type: 'addModifier',
            detail: eventDetail,
            modifier
        });
        this.chain.push(modifier);
        this.emit({
            type: 'addModifier',
            detail: eventDetail,
            modifier
        });
    }
    /**
     * Clears all modifiers from the chain.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     */
    clear(eventDetail) {
        this.emit({
            type: 'clearChain',
            detail: eventDetail
        });
        this.chain.length = 0;
        this.emit({
            type: 'afterClearChain',
            detail: eventDetail
        });
    }
    /**
     * Applies several modifications to the table and returns a modified copy of
     * the given table.
     *
     * @param {Highcharts.DataTable} table
     * Table to modify.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Promise<Highcharts.DataTable>}
     * Table with `modified` property as a reference.
     */
    modify(table, eventDetail) {
        const modifiers = (this.options.reverse ?
            this.chain.slice().reverse() :
            this.chain.slice());
        if (table.modified === table) {
            table.modified = table.clone(false, eventDetail);
        }
        let promiseChain = Promise.resolve(table);
        for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
            const modifier = modifiers[i];
            promiseChain = promiseChain.then((chainTable) => modifier.modify(chainTable.modified, eventDetail));
        }
        promiseChain = promiseChain.then((chainTable) => {
            table.modified.deleteColumns();
            table.modified.setColumns(chainTable.modified.getColumns());
            return table;
        });
        promiseChain = promiseChain['catch']((error) => {
            this.emit({
                type: 'error',
                detail: eventDetail,
                table
            });
            throw error;
        });
        return promiseChain;
    }
    /**
     * Applies partial modifications of a cell change to the property `modified`
     * of the given modified table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {string} columnName
     * Column name of changed cell.
     *
     * @param {number|undefined} rowIndex
     * Row index of changed cell.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Changed cell value.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    modifyCell(table, columnName, rowIndex, cellValue, eventDetail) {
        const modifiers = (this.options.reverse ?
            this.chain.reverse() :
            this.chain);
        if (modifiers.length) {
            let clone = table.clone();
            for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                modifiers[i].modifyCell(clone, columnName, rowIndex, cellValue, eventDetail);
                clone = clone.modified;
            }
            table.modified = clone;
        }
        return table;
    }
    /**
     * Applies partial modifications of column changes to the property
     * `modified` of the given table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Highcharts.DataTableColumnCollection} columns
     * Changed columns as a collection, where the keys are the column names.
     *
     * @param {number} [rowIndex=0]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    modifyColumns(table, columns, rowIndex, eventDetail) {
        const modifiers = (this.options.reverse ?
            this.chain.reverse() :
            this.chain.slice());
        if (modifiers.length) {
            let clone = table.clone();
            for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                modifiers[i].modifyColumns(clone, columns, rowIndex, eventDetail);
                clone = clone.modified;
            }
            table.modified = clone;
        }
        return table;
    }
    /**
     * Applies partial modifications of row changes to the property `modified`
     * of the given table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
     * Changed rows.
     *
     * @param {number} [rowIndex]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    modifyRows(table, rows, rowIndex, eventDetail) {
        const modifiers = (this.options.reverse ?
            this.chain.reverse() :
            this.chain.slice());
        if (modifiers.length) {
            let clone = table.clone();
            for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                modifiers[i].modifyRows(clone, rows, rowIndex, eventDetail);
                clone = clone.modified;
            }
            table.modified = clone;
        }
        return table;
    }
    /**
     * Applies several modifications to the table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {DataTable} table
     * Table to modify.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {DataTable}
     * Table as a reference.
     *
     * @emits ChainDataModifier#execute
     * @emits ChainDataModifier#afterExecute
     */
    modifyTable(table, eventDetail) {
        const chain = this;
        chain.emit({
            type: 'modify',
            detail: eventDetail,
            table
        });
        const modifiers = (chain.options.reverse ?
            chain.chain.reverse() :
            chain.chain.slice());
        let modified = table.modified;
        for (let i = 0, iEnd = modifiers.length, modifier; i < iEnd; ++i) {
            modifier = modifiers[i];
            modified = modifier.modifyTable(modified, eventDetail).modified;
        }
        table.modified = modified;
        chain.emit({
            type: 'afterModify',
            detail: eventDetail,
            table
        });
        return table;
    }
    /**
     * Removes a configured modifier from all positions in the modifier chain.
     *
     * @param {DataModifier} modifier
     * Configured modifier to remove.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     */
    remove(modifier, eventDetail) {
        const modifiers = this.chain;
        this.emit({
            type: 'removeModifier',
            detail: eventDetail,
            modifier
        });
        modifiers.splice(modifiers.indexOf(modifier), 1);
        this.emit({
            type: 'afterRemoveModifier',
            detail: eventDetail,
            modifier
        });
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Default option for the ordered modifier chain.
 */
ChainModifier.defaultOptions = {
    type: 'Chain'
};
DataModifier.registerType('Chain', ChainModifier);
/* *
 *
 *  Default Export
 *
 * */
export default ChainModifier;
