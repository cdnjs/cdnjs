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
import AST from '../../../Core/Renderer/HTML/AST.js';
import H from '../../../Core/Globals.js';
var doc = H.doc;
import D from '../../../Core/DefaultOptions.js';
var getOptions = D.getOptions;
import PopupAnnotations from './PopupAnnotations.js';
import PopupIndicators from './PopupIndicators.js';
import PopupTabs from './PopupTabs.js';
import U from '../../../Core/Utilities.js';
var addEvent = U.addEvent, createElement = U.createElement, extend = U.extend, fireEvent = U.fireEvent, pick = U.pick;
/* *
 *
 *  Functions
 *
 * */
/**
 * Get values from all inputs and selections then create JSON.
 *
 * @private
 *
 * @param {Highcharts.HTMLDOMElement} parentDiv
 * The container where inputs and selections are created.
 *
 * @param {string} type
 * Type of the popup bookmark (add|edit|remove).
 */
function getFields(parentDiv, type) {
    var inputList = Array.prototype.slice.call(parentDiv.querySelectorAll('input')), selectList = Array.prototype.slice.call(parentDiv.querySelectorAll('select')), optionSeries = '#highcharts-select-series > option:checked', optionVolume = '#highcharts-select-volume > option:checked', linkedTo = parentDiv.querySelectorAll(optionSeries)[0], volumeTo = parentDiv.querySelectorAll(optionVolume)[0];
    var fieldsOutput = {
        actionType: type,
        linkedTo: linkedTo && linkedTo.getAttribute('value') || '',
        fields: {}
    };
    inputList.forEach(function (input) {
        var param = input.getAttribute('highcharts-data-name'), seriesId = input.getAttribute('highcharts-data-series-id');
        // params
        if (seriesId) {
            fieldsOutput.seriesId = input.value;
        }
        else if (param) {
            fieldsOutput.fields[param] = input.value;
        }
        else {
            // type like sma / ema
            fieldsOutput.type = input.value;
        }
    });
    selectList.forEach(function (select) {
        var id = select.id;
        // Get inputs only for the parameters, not for series and volume.
        if (id !== 'highcharts-select-series' &&
            id !== 'highcharts-select-volume') {
            var parameter = id.split('highcharts-select-')[1];
            fieldsOutput.fields[parameter] = select.value;
        }
    });
    if (volumeTo) {
        fieldsOutput.fields['params.volumeSeriesID'] = volumeTo
            .getAttribute('value') || '';
    }
    return fieldsOutput;
}
/* *
 *
 *  Class
 *
 * */
var Popup = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    function Popup(parentDiv, iconsURL, chart) {
        this.chart = chart;
        this.iconsURL = iconsURL;
        this.lang = getOptions().lang.navigation.popup;
        // create popup div
        this.container = createElement('div', {
            className: 'highcharts-popup highcharts-no-tooltip'
        }, void 0, parentDiv);
        addEvent(this.container, 'mousedown', function () {
            var activeAnnotation = chart &&
                chart.navigationBindings &&
                chart.navigationBindings.activeAnnotation;
            if (activeAnnotation) {
                activeAnnotation.cancelClick = true;
                var unbind_1 = addEvent(H.doc, 'click', function () {
                    setTimeout(function () {
                        activeAnnotation.cancelClick = false;
                    }, 0);
                    unbind_1();
                });
            }
        });
        // add close button
        this.addCloseBtn();
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initialize the popup. Create base div and add close button.
     * @private
     * @param {Highcharts.HTMLDOMElement} parentDiv
     * Container where popup should be placed
     * @param {string} iconsURL
     * Icon URL
     */
    Popup.prototype.init = function (parentDiv, iconsURL, chart) {
        Popup.call(this, parentDiv, iconsURL, chart);
    };
    /**
     * Create HTML element and attach click event (close popup).
     * @private
     */
    Popup.prototype.addCloseBtn = function () {
        var _this = this;
        var iconsURL = this.iconsURL;
        // create close popup btn
        var closeBtn = createElement('div', {
            className: 'highcharts-popup-close'
        }, void 0, this.container);
        closeBtn.style['background-image'] = 'url(' +
            (iconsURL.match(/png|svg|jpeg|jpg|gif/ig) ?
                iconsURL : iconsURL + 'close.svg') + ')';
        ['click', 'touchstart'].forEach(function (eventName) {
            addEvent(closeBtn, eventName, function () {
                if (_this.chart) {
                    fireEvent(_this.chart.navigationBindings, 'closePopup');
                }
                else {
                    _this.closePopup();
                }
            });
        });
    };
    /**
     * Create input with label.
     *
     * @private
     *
     * @param {string} option
     *        Chain of fields i.e params.styles.fontSize separeted by the dot.
     *
     * @param {string} indicatorType
     *        Type of the indicator i.e. sma, ema...
     *
     * @param {HTMLDOMElement} parentDiv
     *        HTML parent element.
     *
     * @param {Highcharts.InputAttributes} inputAttributes
     *        Attributes of the input.
     *
     * @return {HTMLInputElement}
     *         Return created input element.
     */
    Popup.prototype.addInput = function (option, indicatorType, parentDiv, inputAttributes) {
        var optionParamList = option.split('.'), optionName = optionParamList[optionParamList.length - 1], lang = this.lang, inputName = 'highcharts-' + indicatorType + '-' + pick(inputAttributes.htmlFor, optionName);
        if (!inputName.match(/\d/g)) {
            // add label
            createElement('label', {
                htmlFor: inputName,
                className: inputAttributes.labelClassName
            }, void 0, parentDiv).appendChild(doc.createTextNode(lang[optionName] || optionName));
        }
        // add input
        var input = createElement('input', {
            name: inputName,
            value: inputAttributes.value,
            type: inputAttributes.type,
            className: 'highcharts-popup-field'
        }, void 0, parentDiv);
        input.setAttribute('highcharts-data-name', option);
        return input;
    };
    /**
     * Create button.
     * @private
     * @param {Highcharts.HTMLDOMElement} parentDiv
     * Container where elements should be added
     * @param {string} label
     * Text placed as button label
     * @param {string} type
     * add | edit | remove
     * @param {Function} callback
     * On click callback
     * @param {Highcharts.HTMLDOMElement} fieldsDiv
     * Container where inputs are generated
     * @return {Highcharts.HTMLDOMElement}
     * HTML button
     */
    Popup.prototype.addButton = function (parentDiv, label, type, fieldsDiv, callback) {
        var _this = this;
        var button = createElement('button', void 0, void 0, parentDiv);
        button.appendChild(doc.createTextNode(label));
        if (callback) {
            ['click', 'touchstart'].forEach(function (eventName) {
                addEvent(button, eventName, function () {
                    _this.closePopup();
                    return callback(getFields(fieldsDiv, type));
                });
            });
        }
        return button;
    };
    /**
     * Reset content of the current popup and show.
     * @private
     */
    Popup.prototype.showPopup = function () {
        var popupDiv = this.container, toolbarClass = 'highcharts-annotation-toolbar', popupCloseBtn = popupDiv
            .querySelectorAll('.highcharts-popup-close')[0];
        this.formType = void 0;
        // reset content
        popupDiv.innerHTML = AST.emptyHTML;
        // reset toolbar styles if exists
        if (popupDiv.className.indexOf(toolbarClass) >= 0) {
            popupDiv.classList.remove(toolbarClass);
            // reset toolbar inline styles
            popupDiv.removeAttribute('style');
        }
        // add close button
        popupDiv.appendChild(popupCloseBtn);
        popupDiv.style.display = 'block';
        popupDiv.style.height = '';
    };
    /**
     * Hide popup.
     * @private
     */
    Popup.prototype.closePopup = function () {
        this.container.style.display = 'none';
    };
    /**
     * Create content and show popup.
     * @private
     * @param {string} - type of popup i.e indicators
     * @param {Highcharts.Chart} - chart
     * @param {Highcharts.AnnotationsOptions} - options
     * @param {Function} - on click callback
     */
    Popup.prototype.showForm = function (type, chart, options, callback) {
        if (!chart) {
            return;
        }
        // show blank popup
        this.showPopup();
        // indicator form
        if (type === 'indicators') {
            this.indicators.addForm.call(this, chart, options, callback);
        }
        // annotation small toolbar
        if (type === 'annotation-toolbar') {
            this.annotations.addToolbar.call(this, chart, options, callback);
        }
        // annotation edit form
        if (type === 'annotation-edit') {
            this.annotations.addForm.call(this, chart, options, callback);
        }
        // flags form - add / edit
        if (type === 'flag') {
            this.annotations.addForm.call(this, chart, options, callback, true);
        }
        this.formType = type;
        // Explicit height is needed to make inner elements scrollable
        this.container.style.height = this.container.offsetHeight + 'px';
    };
    return Popup;
}());
extend(Popup.prototype, {
    annotations: PopupAnnotations,
    indicators: PopupIndicators,
    tabs: PopupTabs
});
/* *
 *
 *  Default Export
 *
 * */
export default Popup;
