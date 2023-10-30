/* *
 *
 *  (c) 2014-2021 Highsoft AS
 *
 *  Authors: Jon Arild Nygard / Oystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* *
 *
 *  Imports
 *
 * */
import U from '../../Core/Utilities.js';
const { objectEach } = U;
/* *
 *
 *  Namespace
 *
 * */
var TreemapUtilities;
(function (TreemapUtilities) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @todo find correct name for this function.
     * @todo Similar to reduce, this function is likely redundant
     */
    function recursive(item, func, context) {
        let next;
        next = func.call(context || this, item);
        if (next !== false) {
            recursive(next, func, context);
        }
    }
    TreemapUtilities.recursive = recursive;
})(TreemapUtilities || (TreemapUtilities = {}));
/* *
 *
 *  Default Export
 *
 * */
export default TreemapUtilities;
