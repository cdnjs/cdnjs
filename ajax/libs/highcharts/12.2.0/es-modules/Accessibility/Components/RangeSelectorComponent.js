/* *
 *
 *  (c) 2009-2025 Øystein Moseng
 *
 *  Accessibility component for the range selector.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import AccessibilityComponent from '../AccessibilityComponent.js';
import Announcer from '../Utils/Announcer.js';
import ChartUtilities from '../Utils/ChartUtilities.js';
const { unhideChartElementFromAT, getAxisRangeDescription } = ChartUtilities;
import KeyboardNavigationHandler from '../KeyboardNavigationHandler.js';
import U from '../../Core/Utilities.js';
const { addEvent, attr } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * Do we want date input navigation
 * @private
 */
function shouldRunInputNavigation(chart) {
    return Boolean(chart.rangeSelector &&
        chart.rangeSelector.inputGroup &&
        chart.rangeSelector.inputGroup.element.style.visibility !== 'hidden' &&
        chart.options.rangeSelector.inputEnabled !== false &&
        chart.rangeSelector.minInput &&
        chart.rangeSelector.maxInput);
}
/* *
 *
 *  Class
 *
 * */
/**
 * The RangeSelectorComponent class
 *
 * @private
 * @class
 * @name Highcharts.RangeSelectorComponent
 */
class RangeSelectorComponent extends AccessibilityComponent {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Init the component
     * @private
     */
    init() {
        const chart = this.chart;
        this.announcer = new Announcer(chart, 'polite');
    }
    /**
     * Called on first render/updates to the chart, including options changes.
     */
    onChartUpdate() {
        const chart = this.chart, component = this, rangeSelector = chart.rangeSelector;
        if (!rangeSelector) {
            return;
        }
        this.updateSelectorVisibility();
        this.setDropdownAttrs();
        if (rangeSelector.buttons &&
            rangeSelector.buttons.length) {
            rangeSelector.buttons.forEach((button) => {
                component.setRangeButtonAttrs(button);
            });
        }
        // Make sure input boxes are accessible and focusable
        if (rangeSelector.maxInput && rangeSelector.minInput) {
            ['minInput', 'maxInput'].forEach(function (key, i) {
                const input = rangeSelector[key];
                if (input) {
                    unhideChartElementFromAT(chart, input);
                    component.setRangeInputAttrs(input, 'accessibility.rangeSelector.' + (i ? 'max' : 'min') +
                        'InputLabel');
                }
            });
        }
    }
    /**
     * Hide buttons from AT when showing dropdown, and vice versa.
     * @private
     */
    updateSelectorVisibility() {
        const chart = this.chart;
        const rangeSelector = chart.rangeSelector;
        const dropdown = (rangeSelector &&
            rangeSelector.dropdown);
        const buttons = (rangeSelector &&
            rangeSelector.buttons ||
            []);
        const hideFromAT = (el) => el.setAttribute('aria-hidden', true);
        if (rangeSelector &&
            rangeSelector.hasVisibleDropdown &&
            dropdown) {
            unhideChartElementFromAT(chart, dropdown);
            buttons.forEach((btn) => hideFromAT(btn.element));
        }
        else {
            if (dropdown) {
                hideFromAT(dropdown);
            }
            buttons.forEach((btn) => unhideChartElementFromAT(chart, btn.element));
        }
    }
    /**
     * Set accessibility related attributes on dropdown element.
     * @private
     */
    setDropdownAttrs() {
        const chart = this.chart;
        const dropdown = (chart.rangeSelector &&
            chart.rangeSelector.dropdown);
        if (dropdown) {
            const label = chart.langFormat('accessibility.rangeSelector.dropdownLabel', { rangeTitle: chart.options.lang.rangeSelectorZoom });
            dropdown.setAttribute('aria-label', label);
            dropdown.setAttribute('tabindex', -1);
        }
    }
    /**
     * Set attrs for a range button
     * @private
     */
    setRangeButtonAttrs(button) {
        attr(button.element, {
            tabindex: -1,
            role: 'button'
        });
    }
    /**
     * Set attrs for a date input
     * @private
     */
    setRangeInputAttrs(input, langKey) {
        const chart = this.chart;
        attr(input, {
            tabindex: -1,
            'aria-label': chart.langFormat(langKey, { chart: chart })
        });
    }
    /**
     * Handle arrow key nav
     * @private
     */
    onButtonNavKbdArrowKey(keyboardNavigationHandler, keyCode) {
        const response = keyboardNavigationHandler.response, keys = this.keyCodes, chart = this.chart, wrapAround = chart.options.accessibility
            .keyboardNavigation.wrapAround, direction = (keyCode === keys.left || keyCode === keys.up) ? -1 : 1, didHighlight = chart.highlightRangeSelectorButton(chart.highlightedRangeSelectorItemIx + direction);
        if (!didHighlight) {
            if (wrapAround) {
                keyboardNavigationHandler.init(direction);
                return response.success;
            }
            return response[direction > 0 ? 'next' : 'prev'];
        }
        return response.success;
    }
    /**
     * Handle keyboard click
     * @private
     */
    onButtonNavKbdClick(keyboardNavigationHandler) {
        const response = keyboardNavigationHandler.response, chart = this.chart, wasDisabled = chart.oldRangeSelectorItemState === 3;
        if (!wasDisabled) {
            this.fakeClickEvent(chart.rangeSelector.buttons[chart.highlightedRangeSelectorItemIx].element);
        }
        return response.success;
    }
    /**
     * Called whenever a range selector button has been clicked, either by
     * mouse, touch, or kbd/voice/other.
     * @private
     */
    onAfterBtnClick() {
        const chart = this.chart;
        const axisRangeDescription = getAxisRangeDescription(chart.xAxis[0]);
        const announcement = chart.langFormat('accessibility.rangeSelector.clickButtonAnnouncement', { chart, axisRangeDescription });
        if (announcement) {
            this.announcer.announce(announcement);
        }
    }
    /**
     * Handle move between input elements with Tab key
     * @private
     */
    onInputKbdMove(direction) {
        const chart = this.chart;
        const rangeSel = chart.rangeSelector;
        const newIx = chart.highlightedInputRangeIx = (chart.highlightedInputRangeIx || 0) + direction;
        const newIxOutOfRange = newIx > 1 || newIx < 0;
        if (newIxOutOfRange) {
            if (chart.accessibility) {
                // Ignore focus
                chart.accessibility.keyboardNavigation.exiting = true;
                chart.accessibility.keyboardNavigation.tabindexContainer
                    .focus();
                return chart.accessibility.keyboardNavigation.move(direction);
            }
        }
        else if (rangeSel) {
            const svgEl = rangeSel[newIx ? 'maxDateBox' : 'minDateBox'];
            const inputEl = rangeSel[newIx ? 'maxInput' : 'minInput'];
            if (svgEl && inputEl) {
                chart.setFocusToElement(svgEl, inputEl);
            }
        }
        return true;
    }
    /**
     * Init date input navigation
     * @private
     */
    onInputNavInit(direction) {
        const component = this;
        const chart = this.chart;
        const buttonIxToHighlight = direction > 0 ? 0 : 1;
        const rangeSel = chart.rangeSelector;
        const svgEl = (rangeSel &&
            rangeSel[buttonIxToHighlight ? 'maxDateBox' : 'minDateBox']);
        const minInput = (rangeSel && rangeSel.minInput);
        const maxInput = (rangeSel && rangeSel.maxInput);
        const inputEl = buttonIxToHighlight ? maxInput : minInput;
        chart.highlightedInputRangeIx = buttonIxToHighlight;
        if (svgEl && minInput && maxInput) {
            chart.setFocusToElement(svgEl, inputEl);
            // Tab-press with the input focused does not propagate to chart
            // automatically, so we manually catch and handle it when relevant.
            if (this.removeInputKeydownHandler) {
                this.removeInputKeydownHandler();
            }
            const keydownHandler = (e) => {
                const isTab = (e.which || e.keyCode) === this.keyCodes.tab;
                if (isTab &&
                    component.onInputKbdMove(e.shiftKey ? -1 : 1)) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            };
            const minRemover = addEvent(minInput, 'keydown', keydownHandler);
            const maxRemover = addEvent(maxInput, 'keydown', keydownHandler);
            this.removeInputKeydownHandler = () => {
                minRemover();
                maxRemover();
            };
        }
    }
    /**
     * Terminate date input nav
     * @private
     */
    onInputNavTerminate() {
        const rangeSel = (this.chart.rangeSelector || {});
        if (rangeSel.maxInput) {
            rangeSel.hideInput('max');
        }
        if (rangeSel.minInput) {
            rangeSel.hideInput('min');
        }
        if (this.removeInputKeydownHandler) {
            this.removeInputKeydownHandler();
            delete this.removeInputKeydownHandler;
        }
    }
    /**
     * Init range selector dropdown nav
     * @private
     */
    initDropdownNav() {
        const chart = this.chart;
        const rangeSelector = chart.rangeSelector;
        const dropdown = (rangeSelector && rangeSelector.dropdown);
        if (rangeSelector && dropdown) {
            chart.setFocusToElement(rangeSelector.buttonGroup, dropdown);
            if (this.removeDropdownKeydownHandler) {
                this.removeDropdownKeydownHandler();
            }
            // Tab-press with dropdown focused does not propagate to chart
            // automatically, so we manually catch and handle it when relevant.
            this.removeDropdownKeydownHandler = addEvent(dropdown, 'keydown', (e) => {
                const isTab = (e.which || e.keyCode) === this.keyCodes.tab, a11y = chart.accessibility;
                if (isTab) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (a11y) {
                        a11y.keyboardNavigation.move(e.shiftKey ? -1 : 1);
                    }
                }
            });
        }
    }
    /**
     * Get navigation for the range selector buttons.
     * @private
     * @return {Highcharts.KeyboardNavigationHandler} The module object.
     */
    getRangeSelectorButtonNavigation() {
        const chart = this.chart;
        const keys = this.keyCodes;
        const component = this;
        return new KeyboardNavigationHandler(chart, {
            keyCodeMap: [
                [
                    [keys.left, keys.right, keys.up, keys.down],
                    function (keyCode) {
                        return component.onButtonNavKbdArrowKey(this, keyCode);
                    }
                ],
                [
                    [keys.enter, keys.space],
                    function () {
                        return component.onButtonNavKbdClick(this);
                    }
                ]
            ],
            validate: function () {
                return !!(chart.rangeSelector &&
                    chart.rangeSelector.buttons &&
                    chart.rangeSelector.buttons.length);
            },
            init: function (direction) {
                const rangeSelector = chart.rangeSelector;
                if (rangeSelector && rangeSelector.hasVisibleDropdown) {
                    component.initDropdownNav();
                }
                else if (rangeSelector) {
                    const lastButtonIx = rangeSelector.buttons.length - 1;
                    chart.highlightRangeSelectorButton(direction > 0 ? 0 : lastButtonIx);
                }
            },
            terminate: function () {
                if (component.removeDropdownKeydownHandler) {
                    component.removeDropdownKeydownHandler();
                    delete component.removeDropdownKeydownHandler;
                }
            }
        });
    }
    /**
     * Get navigation for the range selector input boxes.
     * @private
     * @return {Highcharts.KeyboardNavigationHandler}
     *         The module object.
     */
    getRangeSelectorInputNavigation() {
        const chart = this.chart;
        const component = this;
        return new KeyboardNavigationHandler(chart, {
            keyCodeMap: [],
            validate: function () {
                return shouldRunInputNavigation(chart);
            },
            init: function (direction) {
                component.onInputNavInit(direction);
            },
            terminate: function () {
                component.onInputNavTerminate();
            }
        });
    }
    /**
     * Get keyboard navigation handlers for this component.
     * @return {Array<Highcharts.KeyboardNavigationHandler>}
     *         List of module objects.
     */
    getKeyboardNavigation() {
        return [
            this.getRangeSelectorButtonNavigation(),
            this.getRangeSelectorInputNavigation()
        ];
    }
    /**
     * Remove component traces
     */
    destroy() {
        if (this.removeDropdownKeydownHandler) {
            this.removeDropdownKeydownHandler();
        }
        if (this.removeInputKeydownHandler) {
            this.removeInputKeydownHandler();
        }
        if (this.announcer) {
            this.announcer.destroy();
        }
    }
}
/* *
 *
 *  Class Namespace
 *
 * */
(function (RangeSelectorComponent) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Highlight range selector button by index.
     *
     * @private
     * @function Highcharts.Chart#highlightRangeSelectorButton
     */
    function chartHighlightRangeSelectorButton(ix) {
        const buttons = (this.rangeSelector &&
            this.rangeSelector.buttons ||
            []);
        const curHighlightedIx = this.highlightedRangeSelectorItemIx;
        const curSelectedIx = (this.rangeSelector &&
            this.rangeSelector.selected);
        // Deselect old
        if (typeof curHighlightedIx !== 'undefined' &&
            buttons[curHighlightedIx] &&
            curHighlightedIx !== curSelectedIx) {
            buttons[curHighlightedIx].setState(this.oldRangeSelectorItemState || 0);
        }
        // Select new
        this.highlightedRangeSelectorItemIx = ix;
        if (buttons[ix]) {
            this.setFocusToElement(buttons[ix].box, buttons[ix].element);
            if (ix !== curSelectedIx) {
                this.oldRangeSelectorItemState = buttons[ix].state;
                buttons[ix].setState(1);
            }
            return true;
        }
        return false;
    }
    /**
     * Build compositions
     * @private
     */
    function compose(ChartClass, RangeSelectorClass) {
        const chartProto = ChartClass.prototype;
        if (!chartProto.highlightRangeSelectorButton) {
            chartProto.highlightRangeSelectorButton = (chartHighlightRangeSelectorButton);
            addEvent(RangeSelectorClass, 'afterBtnClick', rangeSelectorAfterBtnClick);
        }
    }
    RangeSelectorComponent.compose = compose;
    /**
     * Range selector does not have destroy-setup for class instance events - so
     * we set it on the class and call the component from here.
     * @private
     */
    function rangeSelectorAfterBtnClick() {
        const a11y = this.chart.accessibility;
        if (a11y && a11y.components.rangeSelector) {
            return a11y.components.rangeSelector.onAfterBtnClick();
        }
    }
})(RangeSelectorComponent || (RangeSelectorComponent = {}));
/* *
 *
 *  Export Default
 *
 * */
export default RangeSelectorComponent;
