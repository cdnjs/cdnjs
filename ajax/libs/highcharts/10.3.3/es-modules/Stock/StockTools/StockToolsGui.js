/* *
 *
 *  GUI generator for Stock tools
 *
 *  (c) 2009-2021 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import D from '../../Core/Defaults.js';
var setOptions = D.setOptions;
import StockToolsDefaults from './StockToolsDefaults.js';
import Toolbar from './StockToolbar.js';
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, getStyle = U.getStyle, merge = U.merge, pick = U.pick;
/* *
 *
 *  Constants
 *
 * */
var composedClasses = [];
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
    var chartOptions = this.options, lang = chartOptions.lang, guiOptions = merge(chartOptions.stockTools && chartOptions.stockTools.gui, options && options.gui), langOptions = lang && lang.stockTools && lang.stockTools.gui;
    this.stockTools = new Toolbar(guiOptions, langOptions, this);
    if (this.stockTools.guiEnabled) {
        this.isDirtyBox = true;
    }
}
/**
 * @private
 */
function compose(ChartClass, NavigationBindingsClass) {
    if (composedClasses.indexOf(ChartClass) === -1) {
        composedClasses.push(ChartClass);
        addEvent(ChartClass, 'afterGetContainer', onChartAfterGetContainer);
        addEvent(ChartClass, 'beforeRedraw', onChartBeforeRedraw);
        addEvent(ChartClass, 'beforeRender', onChartBeforeRedraw);
        addEvent(ChartClass, 'destroy', onChartDestroy);
        addEvent(ChartClass, 'getMargins', onChartGetMargins, { order: 0 });
        addEvent(ChartClass, 'redraw', onChartRedraw);
        addEvent(ChartClass, 'render', onChartRender);
        ChartClass.prototype.setStockTools = chartSetStockTools;
    }
    if (composedClasses.indexOf(NavigationBindingsClass) === -1) {
        composedClasses.push(NavigationBindingsClass);
        addEvent(NavigationBindingsClass, 'deselectButton', onNavigationBindingsDeselectButton);
        addEvent(NavigationBindingsClass, 'selectButton', onNavigationBindingsSelectButton);
    }
    if (composedClasses.indexOf(setOptions) === -1) {
        composedClasses.push(setOptions);
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
        var optionsChart = this.options.chart;
        var listWrapper = this.stockTools.listWrapper, offsetWidth = listWrapper && ((listWrapper.startWidth +
            getStyle(listWrapper, 'padding-left') +
            getStyle(listWrapper, 'padding-right')) || listWrapper.offsetWidth);
        var dirty = false;
        if (offsetWidth && offsetWidth < this.plotWidth) {
            var nextX = pick(optionsChart.spacingLeft, optionsChart.spacing && optionsChart.spacing[3], 0) + offsetWidth;
            var diff = nextX - this.spacingBox.x;
            this.spacingBox.x = nextX;
            this.spacingBox.width -= diff;
            dirty = true;
        }
        else if (offsetWidth === 0) {
            dirty = true;
        }
        if (offsetWidth !== this.stockTools.prevOffsetWidth) {
            this.stockTools.prevOffsetWidth = offsetWidth;
            if (dirty) {
                this.isDirtyLegend = true;
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
    var listWrapper = this.stockTools && this.stockTools.listWrapper, offsetWidth = listWrapper && ((listWrapper.startWidth +
        getStyle(listWrapper, 'padding-left') +
        getStyle(listWrapper, 'padding-right')) || listWrapper.offsetWidth);
    if (offsetWidth && offsetWidth < this.plotWidth) {
        this.plotLeft += offsetWidth;
        this.spacing[3] += offsetWidth;
    }
}
/**
 * @private
 */
function onChartRedraw() {
    if (this.stockTools && this.stockTools.guiEnabled) {
        this.stockTools.redraw();
    }
}
/**
 * Check if the correct price indicator button is displayed, #15029.
 * @private
 */
function onChartRender() {
    var stockTools = this.stockTools, button = stockTools &&
        stockTools.toolbar &&
        stockTools.toolbar.querySelector('.highcharts-current-price-indicator');
    // Change the initial button background.
    if (stockTools &&
        this.navigationBindings &&
        this.options.series &&
        button) {
        if (this.navigationBindings.constructor.prototype.utils
            .isPriceIndicatorEnabled(this.series)) {
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
    var className = 'highcharts-submenu-wrapper', gui = this.chart.stockTools;
    if (gui && gui.guiEnabled) {
        var button = event.button;
        // If deselecting a button from a submenu, select state for it's parent
        if (button.parentNode.className.indexOf(className) >= 0) {
            button = button.parentNode.parentNode;
        }
        // Set active class on the current button
        gui.toggleButtonActiveClass(button);
    }
}
/**
 * Communication with bindings
 * @private
 */
function onNavigationBindingsSelectButton(event) {
    var className = 'highcharts-submenu-wrapper', gui = this.chart.stockTools;
    if (gui && gui.guiEnabled) {
        var button = event.button;
        // Unslect other active buttons
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
var StockToolsGui = {
    compose: compose
};
export default StockToolsGui;
