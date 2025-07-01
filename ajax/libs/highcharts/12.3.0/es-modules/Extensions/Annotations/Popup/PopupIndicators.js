/* *
 *
 *  Popup generator for Stock tools
 *
 *  (c) 2009-2025 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import AST from '../../../Core/Renderer/HTML/AST.js';
import H from '../../../Core/Globals.js';
const { doc } = H;
import SeriesRegistry from '../../../Core/Series/SeriesRegistry.js';
const { seriesTypes } = SeriesRegistry;
import U from '../../../Core/Utilities.js';
const { addEvent, createElement, defined, isArray, isObject, objectEach, stableSort } = U;
/* *
 *
 *  Enums
 *
 * */
/**
 * Enum for properties which should have dropdown list.
 * @private
 */
var DropdownProperties;
(function (DropdownProperties) {
    DropdownProperties[DropdownProperties["params.algorithm"] = 0] = "params.algorithm";
    DropdownProperties[DropdownProperties["params.average"] = 1] = "params.average";
})(DropdownProperties || (DropdownProperties = {}));
/**
 * List of available algorithms for the specific indicator.
 * @private
 */
const dropdownParameters = {
    'algorithm-pivotpoints': ['standard', 'fibonacci', 'camarilla'],
    'average-disparityindex': ['sma', 'ema', 'dema', 'tema', 'wma']
};
/* *
 *
 *  Functions
 *
 * */
/**
 * Create two columns (divs) in HTML.
 * @private
 * @param {Highcharts.HTMLDOMElement} container
 * Container of columns
 * @return {Highcharts.Dictionary<Highcharts.HTMLDOMElement>}
 * Reference to two HTML columns (lhsCol, rhsCol)
 */
function addColsContainer(container) {
    // Left column
    const lhsCol = createElement('div', {
        className: 'highcharts-popup-lhs-col'
    }, void 0, container);
    // Right column
    const rhsCol = createElement('div', {
        className: 'highcharts-popup-rhs-col'
    }, void 0, container);
    // Wrapper content
    createElement('div', {
        className: 'highcharts-popup-rhs-col-wrapper'
    }, void 0, rhsCol);
    return {
        lhsCol: lhsCol,
        rhsCol: rhsCol
    };
}
/**
 * Create indicator's form. It contains two tabs (ADD and EDIT) with
 * content.
 * @private
 */
function addForm(chart, _options, callback) {
    const lang = this.lang;
    let buttonParentDiv;
    if (!chart) {
        return;
    }
    // Add tabs
    this.tabs.init.call(this, chart);
    // Get all tabs content divs
    const tabsContainers = this.container
        .querySelectorAll('.highcharts-tab-item-content');
    // ADD tab
    addColsContainer(tabsContainers[0]);
    addSearchBox.call(this, chart, tabsContainers[0]);
    addIndicatorList.call(this, chart, tabsContainers[0], 'add');
    buttonParentDiv = tabsContainers[0]
        .querySelectorAll('.highcharts-popup-rhs-col')[0];
    this.addButton(buttonParentDiv, lang.addButton || 'add', 'add', buttonParentDiv, callback);
    // EDIT tab
    addColsContainer(tabsContainers[1]);
    addIndicatorList.call(this, chart, tabsContainers[1], 'edit');
    buttonParentDiv = tabsContainers[1]
        .querySelectorAll('.highcharts-popup-rhs-col')[0];
    this.addButton(buttonParentDiv, lang.saveButton || 'save', 'edit', buttonParentDiv, callback);
    this.addButton(buttonParentDiv, lang.removeButton || 'remove', 'remove', buttonParentDiv, callback);
}
/**
 * Create typical inputs for chosen indicator. Fields are extracted from
 * defaultOptions (ADD mode) or current indicator (ADD mode). Two extra
 * fields are added:
 * - hidden input - contains indicator type (required for callback)
 * - select - list of series which can be linked with indicator
 * @private
 * @param {Highcharts.Chart} chart
 * Chart
 * @param {Highcharts.Series} series
 * Indicator
 * @param {string} seriesType
 * Indicator type like: sma, ema, etc.
 * @param {Highcharts.HTMLDOMElement} rhsColWrapper
 * Element where created HTML list is added
 */
function addFormFields(chart, series, seriesType, rhsColWrapper) {
    const fields = series.params || series.options.params;
    // Reset current content
    rhsColWrapper.innerHTML = AST.emptyHTML;
    // Create title (indicator name in the right column)
    createElement('h3', {
        className: 'highcharts-indicator-title'
    }, void 0, rhsColWrapper).appendChild(doc.createTextNode(getNameType(series, seriesType).indicatorFullName));
    // Input type
    createElement('input', {
        type: 'hidden',
        name: 'highcharts-type-' + seriesType,
        value: seriesType
    }, void 0, rhsColWrapper);
    // List all series with id
    listAllSeries.call(this, seriesType, 'series', chart, rhsColWrapper, series, series.linkedParent && series.linkedParent.options.id);
    if (fields.volumeSeriesID) {
        listAllSeries.call(this, seriesType, 'volume', chart, rhsColWrapper, series, series.linkedParent && fields.volumeSeriesID);
    }
    // Add param fields
    addParamInputs.call(this, chart, 'params', fields, seriesType, rhsColWrapper);
}
/**
 * Create HTML list of all indicators (ADD mode) or added indicators
 * (EDIT mode).
 *
 * @private
 *
 * @param {Highcharts.AnnotationChart} chart
 *        The chart object.
 *
 * @param {string} [optionName]
 *        Name of the option into which selection is being added.
 *
 * @param {HTMLDOMElement} [parentDiv]
 *        HTML parent element.
 *
 * @param {string} listType
 *        Type of list depending on the selected bookmark.
 *        Might be 'add' or 'edit'.
 *
 * @param {string|undefined} filter
 *        Applied filter string from the input.
 *        For the first iteration, it's an empty string.
 */
function addIndicatorList(chart, parentDiv, listType, filter) {
    /**
     *
     */
    function selectIndicator(series, indicatorType) {
        const button = rhsColWrapper.parentNode
            .children[1];
        addFormFields.call(popup, chart, series, indicatorType, rhsColWrapper);
        if (button) {
            button.style.display = 'block';
        }
        // Add hidden input with series.id
        if (isEdit && series.options) {
            createElement('input', {
                type: 'hidden',
                name: 'highcharts-id-' + indicatorType,
                value: series.options.id
            }, void 0, rhsColWrapper).setAttribute('highcharts-data-series-id', series.options.id);
        }
    }
    const popup = this, lang = popup.lang, lhsCol = parentDiv.querySelectorAll('.highcharts-popup-lhs-col')[0], rhsCol = parentDiv.querySelectorAll('.highcharts-popup-rhs-col')[0], isEdit = listType === 'edit', series = (isEdit ?
        chart.series : // EDIT mode
        chart.options.plotOptions || {} // ADD mode
    );
    if (!chart && series) {
        return;
    }
    let item, filteredSeriesArray = [];
    // Filter and sort the series.
    if (!isEdit && !isArray(series)) {
        // Apply filters only for the 'add' indicator list.
        filteredSeriesArray = filterSeries.call(this, series, filter);
    }
    else if (isArray(series)) {
        filteredSeriesArray = filterSeriesArray.call(this, series);
    }
    // Sort indicators alphabetically.
    stableSort(filteredSeriesArray, (a, b) => {
        const seriesAName = a.indicatorFullName.toLowerCase(), seriesBName = b.indicatorFullName.toLowerCase();
        return (seriesAName < seriesBName) ?
            -1 : (seriesAName > seriesBName) ? 1 : 0;
    });
    // If the list exists remove it from the DOM
    // in order to create a new one with different filters.
    if (lhsCol.children[1]) {
        lhsCol.children[1].remove();
    }
    // Create wrapper for list.
    const indicatorList = createElement('ul', {
        className: 'highcharts-indicator-list'
    }, void 0, lhsCol);
    const rhsColWrapper = rhsCol.querySelectorAll('.highcharts-popup-rhs-col-wrapper')[0];
    filteredSeriesArray.forEach((seriesSet) => {
        const { indicatorFullName, indicatorType, series } = seriesSet;
        item = createElement('li', {
            className: 'highcharts-indicator-list'
        }, void 0, indicatorList);
        const btn = createElement('button', {
            className: 'highcharts-indicator-list-item',
            textContent: indicatorFullName
        }, void 0, item);
        ['click', 'touchstart'].forEach((eventName) => {
            addEvent(btn, eventName, function () {
                selectIndicator(series, indicatorType);
            });
        });
    });
    // Select first item from the list
    if (filteredSeriesArray.length > 0) {
        const { series, indicatorType } = filteredSeriesArray[0];
        selectIndicator(series, indicatorType);
    }
    else if (!isEdit) {
        AST.setElementHTML(rhsColWrapper.parentNode.children[0], lang.noFilterMatch || '');
        rhsColWrapper.parentNode.children[1]
            .style.display = 'none';
    }
}
/**
 * Recurrent function which lists all fields, from params object and
 * create them as inputs. Each input has unique `data-name` attribute,
 * which keeps chain of fields i.e params.styles.fontSize.
 * @private
 * @param {Highcharts.Chart} chart
 * Chart
 * @param {string} parentNode
 * Name of parent to create chain of names
 * @param {Highcharts.PopupFieldsDictionary<string>} fields
 * Params which are based for input create
 * @param {string} type
 * Indicator type like: sma, ema, etc.
 * @param {Highcharts.HTMLDOMElement} parentDiv
 * Element where created HTML list is added
 */
function addParamInputs(chart, parentNode, fields, type, parentDiv) {
    if (!chart) {
        return;
    }
    const addInput = this.addInput;
    objectEach(fields, (value, fieldName) => {
        // Create name like params.styles.fontSize
        const parentFullName = parentNode + '.' + fieldName;
        if (defined(value) && // Skip if field is unnecessary, #15362
            parentFullName) {
            if (isObject(value)) {
                // (15733) 'Periods' has an arrayed value. Label must be
                // created here.
                addInput.call(this, parentFullName, type, parentDiv, {});
                addParamInputs.call(this, chart, parentFullName, value, type, parentDiv);
            }
            // If the option is listed in dropdown enum,
            // add the selection box for it.
            if (parentFullName in DropdownProperties) {
                // Add selection boxes.
                const selectBox = addSelection.call(this, type, parentFullName, parentDiv);
                // Add possible dropdown options.
                addSelectionOptions.call(this, chart, parentNode, selectBox, type, fieldName, value);
            }
            else if (
            // Skip volume field which is created by addFormFields.
            parentFullName !== 'params.volumeSeriesID' &&
                !isArray(value) // Skip params declared in array.
            ) {
                addInput.call(this, parentFullName, type, parentDiv, {
                    value: value,
                    type: 'number'
                } // All inputs are text type
                );
            }
        }
    });
}
/**
 * Add searchbox HTML element and its' label.
 *
 * @private
 *
 * @param {Highcharts.AnnotationChart} chart
 *        The chart object.
 *
 * @param {HTMLDOMElement} parentDiv
 *        HTML parent element.
 */
function addSearchBox(chart, parentDiv) {
    const popup = this, lhsCol = parentDiv.querySelectorAll('.highcharts-popup-lhs-col')[0], options = 'searchIndicators', inputAttributes = {
        value: '',
        type: 'text',
        htmlFor: 'search-indicators',
        labelClassName: 'highcharts-input-search-indicators-label'
    }, clearFilterText = this.lang.clearFilter, inputWrapper = createElement('div', {
        className: 'highcharts-input-wrapper'
    }, void 0, lhsCol);
    const handleInputChange = function (inputText) {
        // Apply some filters.
        addIndicatorList.call(popup, chart, popup.container, 'add', inputText);
    };
    // Add input field with the label and button.
    const input = this.addInput(options, 'input', inputWrapper, inputAttributes), button = createElement('a', {
        textContent: clearFilterText
    }, void 0, inputWrapper);
    input.classList.add('highcharts-input-search-indicators');
    button.classList.add('clear-filter-button');
    // Add input change events.
    addEvent(input, 'input', function () {
        handleInputChange(this.value);
        // Show clear filter button.
        if (this.value.length) {
            button.style.display = 'inline-block';
        }
        else {
            button.style.display = 'none';
        }
    });
    // Add clear filter click event.
    ['click', 'touchstart'].forEach((eventName) => {
        addEvent(button, eventName, function () {
            // Clear the input.
            input.value = '';
            handleInputChange('');
            // Hide clear filter button- no longer necessary.
            button.style.display = 'none';
        });
    });
}
/**
 * Add selection HTML element and its' label.
 *
 * @private
 *
 * @param {string} indicatorType
 * Type of the indicator i.e. sma, ema...
 *
 * @param {string} [optionName]
 * Name of the option into which selection is being added.
 *
 * @param {HTMLDOMElement} [parentDiv]
 * HTML parent element.
 */
function addSelection(indicatorType, optionName, parentDiv) {
    const optionParamList = optionName.split('.'), labelText = optionParamList[optionParamList.length - 1], selectName = 'highcharts-' + optionName + '-type-' + indicatorType, lang = this.lang;
    // Add a label for the selection box.
    createElement('label', {
        htmlFor: selectName
    }, null, parentDiv).appendChild(doc.createTextNode(lang[labelText] || optionName));
    // Create a selection box.
    const selectBox = createElement('select', {
        name: selectName,
        className: 'highcharts-popup-field',
        id: 'highcharts-select-' + optionName
    }, null, parentDiv);
    selectBox.setAttribute('id', 'highcharts-select-' + optionName);
    return selectBox;
}
/**
 * Get and add selection options.
 *
 * @private
 *
 * @param {Highcharts.AnnotationChart} chart
 *        The chart object.
 *
 * @param {string} [optionName]
 *        Name of the option into which selection is being added.
 *
 * @param {HTMLSelectElement} [selectBox]
 *        HTML select box element to which the options are being added.
 *
 * @param {string|undefined} indicatorType
 *        Type of the indicator i.e. sma, ema...
 *
 * @param {string|undefined} parameterName
 *        Name of the parameter which should be applied.
 *
 * @param {string|undefined} selectedOption
 *        Default value in dropdown.
 */
function addSelectionOptions(chart, optionName, selectBox, indicatorType, parameterName, selectedOption, currentSeries) {
    // Get and apply selection options for the possible series.
    if (optionName === 'series' || optionName === 'volume') {
        // List all series which have id - mandatory for indicator.
        chart.series.forEach((series) => {
            const seriesOptions = series.options, seriesName = seriesOptions.name ||
                seriesOptions.params ?
                series.name :
                seriesOptions.id || '';
            if (seriesOptions.id !== 'highcharts-navigator-series' &&
                seriesOptions.id !== (currentSeries &&
                    currentSeries.options &&
                    currentSeries.options.id)) {
                if (!defined(selectedOption) &&
                    optionName === 'volume' &&
                    series.type === 'column') {
                    selectedOption = seriesOptions.id;
                }
                createElement('option', {
                    value: seriesOptions.id
                }, void 0, selectBox).appendChild(doc.createTextNode(seriesName));
            }
        });
    }
    else if (indicatorType && parameterName) {
        // Get and apply options for the possible parameters.
        const dropdownKey = parameterName + '-' + indicatorType, parameterOption = dropdownParameters[dropdownKey];
        parameterOption.forEach((element) => {
            createElement('option', {
                value: element
            }, void 0, selectBox).appendChild(doc.createTextNode(element));
        });
    }
    // Add the default dropdown value if defined.
    if (defined(selectedOption)) {
        selectBox.value = selectedOption;
    }
}
/**
 * Filter object of series which are not indicators.
 * If the filter string exists, check against it.
 *
 * @private
 *
 * @param {Highcharts.FilteredSeries} series
 *        All series are available in the plotOptions.
 *
 * @param {string|undefined} filter
 *        Applied filter string from the input.
 *        For the first iteration, it's an empty string.
 *
 * @return {Array<Highcharts.FilteredSeries>} filteredSeriesArray
 *         Returns array of filtered series based on filter string.
 */
function filterSeries(series, filter) {
    const popup = this, lang = popup.chart && popup.chart.options.lang, indicatorAliases = lang &&
        lang.navigation &&
        lang.navigation.popup &&
        lang.navigation.popup.indicatorAliases, filteredSeriesArray = [];
    let filteredSeries;
    objectEach(series, (series, value) => {
        const seriesOptions = series && series.options;
        // Allow only indicators.
        if (series.params || seriesOptions &&
            seriesOptions.params) {
            const { indicatorFullName, indicatorType } = getNameType(series, value);
            if (filter) {
                // Replace invalid characters.
                const validFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(validFilter, 'i'), alias = indicatorAliases &&
                    indicatorAliases[indicatorType] &&
                    indicatorAliases[indicatorType].join(' ') || '';
                if (indicatorFullName.match(regex) ||
                    alias.match(regex)) {
                    filteredSeries = {
                        indicatorFullName,
                        indicatorType,
                        series: series
                    };
                    filteredSeriesArray.push(filteredSeries);
                }
            }
            else {
                filteredSeries = {
                    indicatorFullName,
                    indicatorType,
                    series: series
                };
                filteredSeriesArray.push(filteredSeries);
            }
        }
    });
    return filteredSeriesArray;
}
/**
 * Filter an array of series and map its names and types.
 *
 * @private
 *
 * @param {Highcharts.FilteredSeries} series
 *        All series that are available in the plotOptions.
 *
 * @return {Array<Highcharts.FilteredSeries>} filteredSeriesArray
 *         Returns array of filtered series based on filter string.
 */
function filterSeriesArray(series) {
    const filteredSeriesArray = [];
    // Allow only indicators.
    series.forEach((series) => {
        if (series.is('sma')) {
            filteredSeriesArray.push({
                indicatorFullName: series.name,
                indicatorType: series.type,
                series: series
            });
        }
    });
    return filteredSeriesArray;
}
/**
 * Get amount of indicators added to chart.
 * @private
 * @return {number} - Amount of indicators
 */
function getAmount() {
    let counter = 0;
    this.series.forEach((serie) => {
        if (serie.params ||
            serie.options.params) {
            counter++;
        }
    });
    return counter;
}
/**
 * Extract full name and type of requested indicator.
 *
 * @private
 *
 * @param {Highcharts.Series} series
 * Series which name is needed(EDITmode - defaultOptions.series,
 * ADDmode - indicator series).
 *
 * @param {string} [indicatorType]
 * Type of the indicator i.e. sma, ema...
 *
 * @return {Highcharts.Dictionary<string>}
 * Full name and series type.
 */
function getNameType(series, indicatorType) {
    const options = series.options;
    // Add mode
    let seriesName = (seriesTypes[indicatorType] &&
        seriesTypes[indicatorType].prototype.nameBase) ||
        indicatorType.toUpperCase(), seriesType = indicatorType;
    // Edit
    if (options && options.type) {
        seriesType = series.options.type;
        seriesName = series.name;
    }
    return {
        indicatorFullName: seriesName,
        indicatorType: seriesType
    };
}
/**
 * Create the selection box for the series,
 * add options and apply the default one.
 *
 * @private
 *
 * @param {string} indicatorType
 *        Type of the indicator i.e. sma, ema...
 *
 * @param {string} [optionName]
 *        Name of the option into which selection is being added.
 *
 * @param {Highcharts.AnnotationChart} chart
 *        The chart object.
 *
 * @param {HTMLDOMElement} [parentDiv]
 *        HTML parent element.
 *
 * @param {string|undefined} selectedOption
 *        Default value in dropdown.
 */
function listAllSeries(indicatorType, optionName, chart, parentDiv, currentSeries, selectedOption) {
    const popup = this;
    // Won't work without the chart.
    if (!chart) {
        return;
    }
    // Add selection boxes.
    const selectBox = addSelection.call(popup, indicatorType, optionName, parentDiv);
    // Add possible dropdown options.
    addSelectionOptions.call(popup, chart, optionName, selectBox, void 0, void 0, void 0, currentSeries);
    // Add the default dropdown value if defined.
    if (defined(selectedOption)) {
        selectBox.value = selectedOption;
    }
}
/* *
 *
 *  Default Export
 *
 * */
const PopupIndicators = {
    addForm,
    getAmount
};
export default PopupIndicators;
