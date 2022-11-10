/* *
 *
 *  (c) 2010-2022 Pawel Lysy
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* *
*
*  Class
*
* */
var TreemapNode = /** @class */ (function () {
    function TreemapNode() {
        /* *
        *
        *  Properties
        *
        * */
        this.childrenTotal = 0;
        this.visible = false;
    }
    /* *
    *
    *  Functions
    *
    * */
    TreemapNode.prototype.init = function (id, i, children, height, level, series, parent) {
        this.id = id;
        this.i = i;
        this.children = children;
        this.height = height;
        this.level = level;
        this.series = series;
        this.parent = parent;
        return this;
    };
    return TreemapNode;
}());
/* *
*
*  Default Export
*
* */
export default TreemapNode;
