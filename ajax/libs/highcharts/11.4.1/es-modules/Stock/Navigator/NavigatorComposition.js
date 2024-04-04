/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import D from '../../Core/Defaults.js';
const { setOptions } = D;
import H from '../../Core/Globals.js';
const { composed } = H;
import NavigatorAxisAdditions from '../../Core/Axis/NavigatorAxisComposition.js';
import NavigatorDefaults from './NavigatorDefaults.js';
import NavigatorSymbols from './NavigatorSymbols.js';
import RendererRegistry from '../../Core/Renderer/RendererRegistry.js';
const { getRendererType } = RendererRegistry;
import StockUtilities from '../../Stock/Utilities/StockUtilities.js';
const { setFixedRange } = StockUtilities;
import U from '../../Core/Utilities.js';
const { addEvent, extend, pushUnique } = U;
/* *
 *
 *  Variables
 *
 * */
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function compose(ChartClass, AxisClass, SeriesClass) {
    NavigatorAxisAdditions.compose(AxisClass);
    if (pushUnique(composed, 'Navigator')) {
        ChartClass.prototype.setFixedRange = setFixedRange;
        extend(getRendererType().prototype.symbols, NavigatorSymbols);
        addEvent(SeriesClass, 'afterUpdate', onSeriesAfterUpdate);
        setOptions({ navigator: NavigatorDefaults });
    }
}
/**
 * Handle updating series
 * @private
 */
function onSeriesAfterUpdate() {
    if (this.chart.navigator && !this.options.isInternal) {
        this.chart.navigator.setBaseSeries(null, false);
    }
}
/* *
 *
 *  Default Export
 *
 * */
const NavigatorComposition = {
    compose
};
export default NavigatorComposition;
