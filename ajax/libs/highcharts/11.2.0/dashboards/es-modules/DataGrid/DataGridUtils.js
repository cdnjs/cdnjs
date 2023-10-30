/* *
 *
 *  Data Grid utilities
 *
 *  (c) 2009-2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Øystein Moseng
 *
 * */
/* *
 *
 *  Functions
 *
 * */
const DataGridUtils = {
    dataTableCellToString(cell) {
        return typeof cell === 'string' ||
            typeof cell === 'number' ||
            typeof cell === 'boolean' ?
            '' + cell :
            '';
    },
    emptyHTMLElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    },
    makeDiv: (className, id) => {
        const div = document.createElement('div');
        div.className = className;
        if (id) {
            div.id = id;
        }
        return div;
    }
};
/* *
 *
 *  Default Export
 *
 * */
export default DataGridUtils;
