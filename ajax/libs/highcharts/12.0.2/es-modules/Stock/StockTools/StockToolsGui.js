/* *
 *
 *  GUI generator for Stock tools
 *
 *  (c) 2009-2024 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import D from '../../Core/Defaults.js';
const { setOptions } = D;
import StockToolsDefaults from './StockToolsDefaults.js';
import Toolbar from './StockToolbar.js';
import U from '../../Core/Utilities.js';
const { addEvent, getStyle, merge, pick } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * Verify if Toolbar should be added.
 * @private
 */
function chartSetStockTools(options) {
    const chartOptions = this.options, lang = chartOptions.lang, guiOptions = merge(chartOptions.stockTools && chartOptions.stockTools.gui, options && options.gui), langOptions = lang && lang.stockTools && lang.stockTools.gui;
    this.stockTools = new Toolbar(guiOptions, langOptions, this);
    if (this.stockTools.guiEnabled) {
        this.isDirtyBox = true;
    }
}
/**
 * @private
 */
function compose(ChartClass, NavigationBindingsClass) {
    const chartProto = ChartClass.prototype;
    if (!chartProto.setStockTools) {
        addEvent(ChartClass, 'afterGetContainer', onChartAfterGetContainer);
        addEvent(ChartClass, 'beforeRedraw', onChartBeforeRedraw);
        addEvent(ChartClass, 'beforeRender', onChartBeforeRedraw);
        addEvent(ChartClass, 'destroy', onChartDestroy);
        addEvent(ChartClass, 'getMargins', onChartGetMargins, { order: 0 });
        addEvent(ChartClass, 'render', onChartRender);
        chartProto.setStockTools = chartSetStockTools;
        addEvent(NavigationBindingsClass, 'deselectButton', onNavigationBindingsDeselectButton);
        addEvent(NavigationBindingsClass, 'selectButton', onNavigationBindingsSelectButton);
        setOptions(StockToolsDefaults);
    }
}
/**
 * Run HTML generator
 * @private
 */
function onChartAfterGetContainer() {
    this.setStockTools();
}
/**
 * Handle beforeRedraw and beforeRender
 * @private
 */
function onChartBeforeRedraw() {
    if (this.stockTools) {
        this.stockTools.redraw();
        setOffset(this);
    }
}
/**
 * Function to calculate and set the offset width for stock tools.
 * @private
 */
function setOffset(chart) {
    if (chart.stockTools?.guiEnabled) {
        const optionsChart = chart.options.chart;
        const listWrapper = chart.stockTools.listWrapper;
        const offsetWidth = listWrapper && ((listWrapper.startWidth +
            getStyle(listWrapper, 'padding-left') +
            getStyle(listWrapper, 'padding-right')) || listWrapper.offsetWidth);
        chart.stockTools.width = offsetWidth;
        let dirty = false;
        if (offsetWidth < chart.plotWidth) {
            const nextX = pick(optionsChart.spacingLeft, optionsChart.spacing && optionsChart.spacing[3], 0) + offsetWidth;
            const diff = nextX - chart.spacingBox.x;
            chart.spacingBox.x = nextX;
            chart.spacingBox.width -= diff;
            dirty = true;
        }
        else if (offsetWidth === 0) {
            dirty = true;
        }
        if (offsetWidth !== chart.stockTools.prevOffsetWidth) {
            chart.stockTools.prevOffsetWidth = offsetWidth;
            if (dirty) {
                chart.isDirtyLegend = true;
            }
        }
    }
}
/**
 * @private
 */
function onChartDestroy() {
    if (this.stockTools) {
        this.stockTools.destroy();
    }
}
/**
 * @private
 */
function onChartGetMargins() {
    const offsetWidth = this.stockTools?.visible && this.stockTools.guiEnabled ?
        this.stockTools.width : 0;
    if (offsetWidth && offsetWidth < this.plotWidth) {
        this.plotLeft += offsetWidth;
        this.spacing[3] += offsetWidth;
    }
}
/**
 * Check if the correct price indicator button is displayed, #15029.
 * @private
 */
function onChartRender() {
    const stockTools = this.stockTools, button = stockTools &&
        stockTools.toolbar &&
        stockTools.toolbar.querySelector('.highcharts-current-price-indicator');
    // Change the initial button background.
    if (stockTools &&
        this.navigationBindings &&
        this.options.series &&
        button) {
        if (this.navigationBindings.utils
            ?.isPriceIndicatorEnabled?.(this.series)) {
            button.firstChild.style['background-image'] =
                'url("' + stockTools.getIconsURL() + 'current-price-hide.svg")';
        }
        else {
            button.firstChild.style['background-image'] =
                'url("' + stockTools.getIconsURL() + 'current-price-show.svg")';
        }
    }
}
/**
 * @private
 */
function onNavigationBindingsDeselectButton(event) {
    const className = 'highcharts-submenu-wrapper', gui = this.chart.stockTools;
    if (gui && gui.guiEnabled) {
        let button = event.button;
        // If deselecting a button from a submenu, select state for it's parent
        if (button.parentNode.className.indexOf(className) >= 0) {
            button = button.parentNode.parentNode;
        }
        button.classList.remove('highcharts-active');
    }
}
/**
 * Communication with bindings
 * @private
 */
function onNavigationBindingsSelectButton(event) {
    const className = 'highcharts-submenu-wrapper', gui = this.chart.stockTools;
    if (gui && gui.guiEnabled) {
        let button = event.button;
        // Unselect other active buttons
        gui.unselectAllButtons(event.button);
        // If clicked on a submenu, select state for it's parent
        if (button.parentNode.className.indexOf(className) >= 0) {
            button = button.parentNode.parentNode;
        }
        // Set active class on the current button
        gui.toggleButtonActiveClass(button);
    }
}
/* *
 *
 *  Default Export
 *
 * */
const StockToolsGui = {
    compose
};
export default StockToolsGui;
