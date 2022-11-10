/* *
 *
 *  Popup generator for Stock tools
 *
 *  (c) 2009-2021 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Popup from './Popup.js';
import U from '../../../Core/Utilities.js';
var addEvent = U.addEvent, wrap = U.wrap;
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
 * @private
 */
function compose(NagivationBindingsClass, PointerClass) {
    if (composedClasses.indexOf(NagivationBindingsClass) === -1) {
        composedClasses.push(NagivationBindingsClass);
        addEvent(NagivationBindingsClass, 'closePopup', onNavigationBindingsClosePopup);
        addEvent(NagivationBindingsClass, 'showPopup', onNavigationBindingsShowPopup);
    }
    if (composedClasses.indexOf(PointerClass) === -1) {
        composedClasses.push(PointerClass);
        wrap(PointerClass.prototype, 'onContainerMouseDown', wrapPointerOnContainerMouserDown);
    }
}
/**
 * @private
 */
function onNavigationBindingsClosePopup() {
    if (this.popup) {
        this.popup.closePopup();
    }
}
/**
 * @private
 */
function onNavigationBindingsShowPopup(config) {
    if (!this.popup) {
        // Add popup to main container
        this.popup = new Popup(this.chart.container, (this.chart.options.navigation.iconsURL ||
            (this.chart.options.stockTools &&
                this.chart.options.stockTools.gui.iconsURL) ||
            'https://code.highcharts.com/10.3.1/gfx/stock-icons/'), this.chart);
    }
    this.popup.showForm(config.formType, this.chart, config.options, config.onSubmit);
}
/**
 * onContainerMouseDown blocks internal popup events, due to e.preventDefault.
 * Related issue #4606
 * @private
 */
function wrapPointerOnContainerMouserDown(proceed, e) {
    // elements is not in popup
    if (!this.inClass(e.target, 'highcharts-popup')) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    }
}
/* *
 *
 *  Default Export
 *
 * */
var PopupComposition = {
    compose: compose
};
export default PopupComposition;
