/* *
 *
 *  (c) 2014-2025 Highsoft AS
 *
 *  Authors: Jon Arild Nygard / Oystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import DPU from '../DrawPointUtilities.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { pie: { prototype: { pointClass: PiePoint } }, scatter: { prototype: { pointClass: ScatterPoint } } } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { extend, isNumber, pick } = U;
/* *
 *
 *  Class
 *
 * */
class TreemapPoint extends ScatterPoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.groupedPointsAmount = 0;
        this.shapeType = 'rect';
    }
    /* *
     *
     *  Functions
     *
     * */
    draw(params) {
        DPU.draw(this, params);
    }
    getClassName() {
        const series = this.series, options = series.options;
        let className = super.getClassName();
        // Above the current level
        if (this.node.level <= series.nodeMap[series.rootNode].level &&
            this.node.children.length) {
            className += ' highcharts-above-level';
        }
        else if (!this.node.isGroup &&
            !this.node.isLeaf &&
            !series.nodeMap[series.rootNode].isGroup &&
            !pick(options.interactByLeaf, !options.allowTraversingTree)) {
            className += ' highcharts-internal-node-interactive';
        }
        else if (!this.node.isGroup &&
            !this.node.isLeaf &&
            !series.nodeMap[series.rootNode].isGroup) {
            className += ' highcharts-internal-node';
        }
        return className;
    }
    /**
     * A tree point is valid if it has han id too, assume it may be a parent
     * item.
     *
     * @private
     * @function Highcharts.Point#isValid
     */
    isValid() {
        return Boolean(this.id || isNumber(this.value));
    }
    setState(state) {
        super.setState.apply(this, arguments);
        // Graphic does not exist when point is not visible.
        if (this.graphic) {
            this.graphic.attr({
                zIndex: state === 'hover' ? 1 : 0
            });
        }
    }
    shouldDraw() {
        return isNumber(this.plotY) && this.y !== null;
    }
}
extend(TreemapPoint.prototype, {
    setVisible: PiePoint.prototype.setVisible
});
/* *
 *
 *  Default Export
 *
 * */
export default TreemapPoint;
