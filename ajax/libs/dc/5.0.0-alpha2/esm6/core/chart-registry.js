import { constants } from './constants.js';
import { ChartGroup } from './chart-group.js';
/**
 * The ChartRegistry maintains sets of all instantiated dc.js charts under named groups
 * and the default group. There is a single global ChartRegistry object named `chartRegistry`
 *
 * A chart group often corresponds to a crossfilter instance. It specifies
 * the set of charts which should be updated when a filter changes on one of the charts or when the
 * global functions {@link filterAll | filterAll}, {@link refocusAll | refocusAll},
 * {@link renderAll | renderAll}, {@link redrawAll | redrawAll}, or chart functions
 * {@link BaseMixin.renderGroup},
 * {@link BaseMixin.redrawGroup} are called.
 */
class ChartRegistry {
    constructor() {
        // chartGroup:string => charts:array
        this._chartMap = {};
    }
    chartGroup(group) {
        if (!group) {
            group = constants.DEFAULT_CHART_GROUP;
        }
        if (!this._chartMap[group]) {
            this._chartMap[group] = new ChartGroup();
        }
        return this._chartMap[group];
    }
    /**
     * Determine if a given chart instance resides in any group in the registry.
     */
    has(chart) {
        for (const chartGroupName in this._chartMap) {
            if (this._chartMap.hasOwnProperty(chartGroupName)) {
                if (this._chartMap[chartGroupName].has(chart)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Clear given group if one is provided, otherwise clears all groups.
     */
    clear(group) {
        if (group) {
            if (this._chartMap[group]) {
                this._chartMap[group].clear();
                delete this._chartMap[group];
            }
        }
        else {
            for (const chartGroupName in this._chartMap) {
                if (this._chartMap.hasOwnProperty(chartGroupName)) {
                    this._chartMap[chartGroupName].clear();
                }
            }
            this._chartMap = {};
        }
    }
    /**
     * Get an array of each chart instance in the given group.
     * If no group is provided, the charts in the default group are returned.
     */
    list(group) {
        return this.chartGroup(group).list();
    }
}
/**
 * The chartRegistry object maintains sets of all instantiated dc.js charts under named groups
 * and the default group.
 */
export const chartRegistry = new ChartRegistry();
//# sourceMappingURL=chart-registry.js.map