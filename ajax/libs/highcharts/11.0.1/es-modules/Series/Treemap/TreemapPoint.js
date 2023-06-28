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
import DPU from '../DrawPointUtilities.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { series: { prototype: { pointClass: Point } }, seriesTypes: { pie: { prototype: { pointClass: PiePoint } }, scatter: { prototype: { pointClass: ScatterPoint } } } } = SeriesRegistry;
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
        this.name = void 0;
        this.node = void 0;
        this.options = void 0;
        this.series = void 0;
        this.shapeType = 'rect';
        this.value = void 0;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    draw(params) {
        DPU.draw(this, params);
    }
    getClassName() {
        let className = Point.prototype.getClassName.call(this), series = this.series, options = series.options;
        // Above the current level
        if (this.node.level <= series.nodeMap[series.rootNode].level) {
            className += ' highcharts-above-level';
        }
        else if (!this.node.isLeaf &&
            !pick(options.interactByLeaf, !options.allowTraversingTree)) {
            className += ' highcharts-internal-node-interactive';
        }
        else if (!this.node.isLeaf) {
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
        Point.prototype.setState.call(this, state);
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
