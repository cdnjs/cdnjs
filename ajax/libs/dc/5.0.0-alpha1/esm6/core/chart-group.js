var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FilterStorage } from './filter-storage.js';
/**
 * A chart group often corresponds to a set of linked charts.
 * For example, when using crossfilter, it is typically charts linked to same crossfilter instance.
 * It specifies the set of charts which should be updated when a filter changes on one of the charts.
 * The {@linkcode BaseMixin} methods {@linkcode BaseMixin.renderGroup | renderGroup} and
 * {@linkcode BaseMixin.redrawGroup | redrawGroup} call {@linkcode renderAll} and {@linkcode redrawAll}
 * on the chart group.
 *
 * `dc` charts created without specifying a chartGroup are registered with the default ChartGroup.
 * It is recommended that all `dc` charts are created with an explicit chartGroup.
 *
 * This has been introduced in v5 to facilitate automated garage collection of charts.
 * SPAs (Single Page Applications), or any other environments where set of charts need to be unloaded,
 * should use explicit chartGroups.
 *
 * It is possible to register non dc charts (or any other object) with the chartGroup.
 * Please see {@linkcode IMinimalChart} to understand the methods the chartGroup will be invoking.
 *
 * `dc` charts do not hard depend on this class. So, it is possible to replace it with any compliant
 * implementation. {@linkcode IChartGroup} specifies what rest of the `dc` expects.
 */
export class ChartGroup {
    /**
     * Create a new instance. Please note it does not take a name as parameter.
     */
    constructor() {
        this._charts = [];
        this.filterStorage = new FilterStorage();
    }
    /**
     * List of charts in the group. It returns the internal storage without defensive cloning.
     *
     * @category Intermediate
     */
    list() {
        return this._charts;
    }
    /**
     * Check if the chart is registered with this chartGroup.
     *
     * @category Intermediate
     */
    has(chart) {
        return this._charts.includes(chart);
    }
    /**
     * dc charts will register themselves. Non dc charts will need to call this method.
     *
     * @category Intermediate
     */
    register(chart) {
        this._charts.push(chart);
    }
    /**
     * dc charts will deregister themselves.
     *
     * @category Intermediate
     */
    deregister(chart) {
        if (typeof chart.dispose === 'function') {
            chart.dispose();
        }
        this._charts = this._charts.filter(ch => ch !== chart);
    }
    /**
     * Remove all charts from the registry.
     * Should not be called directly - it may leave charts in inconsistent state.
     *
     * @category Ninja
     */
    clear() {
        this._charts = [];
    }
    /**
     * Once all charts have been registered, this function should be called.
     * It will do the following in order:
     * - invoke async callback {@linkcode beforeRenderAll},
     * - invoke {@linkcode BaseMixin.render | render} on each of the charts,
     * - invoke callback {@linkcode renderlet}.
     *
     * Typically this will be called only once.
     */
    renderAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.beforeRenderAll === 'function') {
                yield this.beforeRenderAll();
            }
            for (const chart of this._charts) {
                chart.render();
            }
            if (typeof this.renderlet === 'function') {
                this.renderlet();
            }
        });
    }
    /**
     * Redraw all the charts.
     *
     * When a filter is modified for any of the charts or there is a change in the underlying data,
     * all linked charts will need be redrawn.
     *
     * It will do the following in order:
     * - invoke async callback {@linkcode beforeRedrawAll},
     * - invoke {@linkcode BaseMixin.redraw | redraw} on each of the charts,
     * - invoke callback {@linkcode renderlet}.
     *
     * For any filter changes, this will be called by dc charts internally.
     * However, if there is a change in data (like rows getting added), this function
     * needs to be called to see the updated data.
     */
    redrawAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.beforeRedrawAll === 'function') {
                yield this.beforeRedrawAll();
            }
            for (const chart of this._charts) {
                chart.redraw();
            }
            if (typeof this.renderlet === 'function') {
                this.renderlet();
            }
        });
    }
    /**
     * Reset filters for all the charts. This can be used to implement `Reset All` in the UI.
     */
    filterAll() {
        for (const chart of this._charts) {
            chart.filterAll();
        }
    }
    /**
     * Refocus all the charts that support focusing.
     */
    refocusAll() {
        for (const chart of this._charts) {
            if (chart.focus) {
                chart.focus();
            }
        }
    }
}
//# sourceMappingURL=chart-group.js.map