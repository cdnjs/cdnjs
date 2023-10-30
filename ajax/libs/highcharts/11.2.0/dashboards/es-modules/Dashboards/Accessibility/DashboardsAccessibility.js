/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *
 * */
'use strict';
/* *
 *
 *  Functions
 *
 * */
/* *
 *
 *  Class
 *
 * */
class DashboardsAccessibility {
    /* *
    *
    *  Constructor
    *
    * */
    constructor(board) {
        this.board = board;
        this.addTabIndexToCells();
    }
    /* *
    *
    *  Functions
    *
    * */
    addTabIndexToCells() {
        const components = this.board.mountedComponents;
        let cell;
        for (let i = 0, iEnd = components.length; i < iEnd; ++i) {
            cell = components[i].cell;
            if (cell && cell.container) {
                cell.container.setAttribute('tabindex', -1);
            }
        }
    }
}
// namespace DashboardsAccessibility { }
/* *
 *
 *  Default Export
 *
 * */
export default DashboardsAccessibility;
