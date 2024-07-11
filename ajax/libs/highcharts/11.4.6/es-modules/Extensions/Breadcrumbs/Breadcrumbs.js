/* *
 *
 *  Highcharts Breadcrumbs module
 *
 *  Authors: Grzegorz Blachlinski, Karol Kolodziej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import BreadcrumbsDefaults from './BreadcrumbsDefaults.js';
import F from '../../Core/Templating.js';
const { format } = F;
import H from '../../Core/Globals.js';
const { composed } = H;
import U from '../../Core/Utilities.js';
const { addEvent, defined, extend, fireEvent, isString, merge, objectEach, pick, pushUnique } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * Shift the drillUpButton to make the space for resetZoomButton, #8095.
 * @private
 */
function onChartAfterShowResetZoom() {
    const chart = this;
    if (chart.breadcrumbs) {
        const bbox = chart.resetZoomButton &&
            chart.resetZoomButton.getBBox(), breadcrumbsOptions = chart.breadcrumbs.options;
        if (bbox &&
            breadcrumbsOptions.position.align === 'right' &&
            breadcrumbsOptions.relativeTo === 'plotBox') {
            chart.breadcrumbs.alignBreadcrumbsGroup(-bbox.width - breadcrumbsOptions.buttonSpacing);
        }
    }
}
/**
 * Remove resize/afterSetExtremes at chart destroy.
 * @private
 */
function onChartDestroy() {
    if (this.breadcrumbs) {
        this.breadcrumbs.destroy();
        this.breadcrumbs = void 0;
    }
}
/**
 * Logic for making space for the buttons above the plot area
 * @private
 */
function onChartGetMargins() {
    const breadcrumbs = this.breadcrumbs;
    if (breadcrumbs &&
        !breadcrumbs.options.floating &&
        breadcrumbs.level) {
        const breadcrumbsOptions = breadcrumbs.options, buttonTheme = breadcrumbsOptions.buttonTheme, breadcrumbsHeight = ((buttonTheme.height || 0) +
            2 * (buttonTheme.padding || 0) +
            breadcrumbsOptions.buttonSpacing), verticalAlign = breadcrumbsOptions.position.verticalAlign;
        if (verticalAlign === 'bottom') {
            this.marginBottom = (this.marginBottom || 0) + breadcrumbsHeight;
            breadcrumbs.yOffset = breadcrumbsHeight;
        }
        else if (verticalAlign !== 'middle') {
            this.plotTop += breadcrumbsHeight;
            breadcrumbs.yOffset = -breadcrumbsHeight;
        }
        else {
            breadcrumbs.yOffset = void 0;
        }
    }
}
/**
 * @private
 */
function onChartRedraw() {
    this.breadcrumbs && this.breadcrumbs.redraw();
}
/**
 * After zooming out, shift the drillUpButton to the previous position, #8095.
 * @private
 */
function onChartSelection(event) {
    if (event.resetSelection === true &&
        this.breadcrumbs) {
        this.breadcrumbs.alignBreadcrumbsGroup();
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * The Breadcrumbs class
 *
 * @private
 * @class
 * @name Highcharts.Breadcrumbs
 *
 * @param {Highcharts.Chart} chart
 *        Chart object
 * @param {Highcharts.Options} userOptions
 *        User options
 */
class Breadcrumbs {
    /* *
     *
     *  Functions
     *
     * */
    static compose(ChartClass, highchartsDefaultOptions) {
        if (pushUnique(composed, 'Breadcrumbs')) {
            addEvent(ChartClass, 'destroy', onChartDestroy);
            addEvent(ChartClass, 'afterShowResetZoom', onChartAfterShowResetZoom);
            addEvent(ChartClass, 'getMargins', onChartGetMargins);
            addEvent(ChartClass, 'redraw', onChartRedraw);
            addEvent(ChartClass, 'selection', onChartSelection);
            // Add language support.
            extend(highchartsDefaultOptions.lang, BreadcrumbsDefaults.lang);
        }
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(chart, userOptions) {
        this.elementList = {};
        this.isDirty = true;
        this.level = 0;
        this.list = [];
        const chartOptions = merge(chart.options.drilldown &&
            chart.options.drilldown.drillUpButton, Breadcrumbs.defaultOptions, chart.options.navigation && chart.options.navigation.breadcrumbs, userOptions);
        this.chart = chart;
        this.options = chartOptions || {};
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Update Breadcrumbs properties, like level and list.
     *
     * @function Highcharts.Breadcrumbs#updateProperties
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    updateProperties(list) {
        this.setList(list);
        this.setLevel();
        this.isDirty = true;
    }
    /**
     * Set breadcrumbs list.
     * @function Highcharts.Breadcrumbs#setList
     *
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     * @param {Highcharts.BreadcrumbsOptions} list
     *        Breadcrumbs list.
     */
    setList(list) {
        this.list = list;
    }
    /**
     * Calculate level on which chart currently is.
     *
     * @function Highcharts.Breadcrumbs#setLevel
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    setLevel() {
        this.level = this.list.length && this.list.length - 1;
    }
    /**
     * Get Breadcrumbs level
     *
     * @function Highcharts.Breadcrumbs#getLevel
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    getLevel() {
        return this.level;
    }
    /**
     * Default button text formatter.
     *
     * @function Highcharts.Breadcrumbs#getButtonText
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     * @param {Highcharts.Breadcrumbs} breadcrumb
     *        Breadcrumb.
     * @return {string}
     *         Formatted text.
     */
    getButtonText(breadcrumb) {
        const breadcrumbs = this, chart = breadcrumbs.chart, breadcrumbsOptions = breadcrumbs.options, lang = chart.options.lang, textFormat = pick(breadcrumbsOptions.format, breadcrumbsOptions.showFullPath ?
            '{level.name}' : '← {level.name}'), defaultText = lang && pick(lang.drillUpText, lang.mainBreadcrumb);
        let returnText = breadcrumbsOptions.formatter &&
            breadcrumbsOptions.formatter(breadcrumb) ||
            format(textFormat, { level: breadcrumb.levelOptions }, chart) || '';
        if (((isString(returnText) &&
            !returnText.length) ||
            returnText === '← ') &&
            defined(defaultText)) {
            returnText = !breadcrumbsOptions.showFullPath ?
                '← ' + defaultText :
                defaultText;
        }
        return returnText;
    }
    /**
     * Redraw.
     *
     * @function Highcharts.Breadcrumbs#redraw
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    redraw() {
        if (this.isDirty) {
            this.render();
        }
        if (this.group) {
            this.group.align();
        }
        this.isDirty = false;
    }
    /**
     * Create a group, then draw breadcrumbs together with the separators.
     *
     * @function Highcharts.Breadcrumbs#render
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    render() {
        const breadcrumbs = this, chart = breadcrumbs.chart, breadcrumbsOptions = breadcrumbs.options;
        // A main group for the breadcrumbs.
        if (!breadcrumbs.group && breadcrumbsOptions) {
            breadcrumbs.group = chart.renderer
                .g('breadcrumbs-group')
                .addClass('highcharts-no-tooltip highcharts-breadcrumbs')
                .attr({
                zIndex: breadcrumbsOptions.zIndex
            })
                .add();
        }
        // Draw breadcrumbs.
        if (breadcrumbsOptions.showFullPath) {
            this.renderFullPathButtons();
        }
        else {
            this.renderSingleButton();
        }
        this.alignBreadcrumbsGroup();
    }
    /**
     * Draw breadcrumbs together with the separators.
     *
     * @function Highcharts.Breadcrumbs#renderFullPathButtons
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    renderFullPathButtons() {
        // Make sure that only one type of button is visible.
        this.destroySingleButton();
        this.resetElementListState();
        this.updateListElements();
        this.destroyListElements();
    }
    /**
     * Render Single button - when showFullPath is not used. The button is
     * similar to the old drillUpButton
     *
     * @function Highcharts.Breadcrumbs#renderSingleButton
     * @param {Highcharts.Breadcrumbs} this Breadcrumbs class.
     */
    renderSingleButton() {
        const breadcrumbs = this, chart = breadcrumbs.chart, list = breadcrumbs.list, breadcrumbsOptions = breadcrumbs.options, buttonSpacing = breadcrumbsOptions.buttonSpacing;
        // Make sure that only one type of button is visible.
        this.destroyListElements();
        // Draw breadcrumbs. Initial position for calculating the breadcrumbs
        // group.
        const posX = breadcrumbs.group ?
            breadcrumbs.group.getBBox().width :
            buttonSpacing, posY = buttonSpacing;
        const previousBreadcrumb = list[list.length - 2];
        if (!chart.drillUpButton && (this.level > 0)) {
            chart.drillUpButton = breadcrumbs.renderButton(previousBreadcrumb, posX, posY);
        }
        else if (chart.drillUpButton) {
            if (this.level > 0) {
                // Update button.
                this.updateSingleButton();
            }
            else {
                this.destroySingleButton();
            }
        }
    }
    /**
     * Update group position based on align and it's width.
     *
     * @function Highcharts.Breadcrumbs#renderSingleButton
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    alignBreadcrumbsGroup(xOffset) {
        const breadcrumbs = this;
        if (breadcrumbs.group) {
            const breadcrumbsOptions = breadcrumbs.options, buttonTheme = breadcrumbsOptions.buttonTheme, positionOptions = breadcrumbsOptions.position, alignTo = (breadcrumbsOptions.relativeTo === 'chart' ||
                breadcrumbsOptions.relativeTo === 'spacingBox' ?
                void 0 :
                'plotBox'), bBox = breadcrumbs.group.getBBox(), additionalSpace = 2 * (buttonTheme.padding || 0) +
                breadcrumbsOptions.buttonSpacing;
            // Store positionOptions
            positionOptions.width = bBox.width + additionalSpace;
            positionOptions.height = bBox.height + additionalSpace;
            const newPositions = merge(positionOptions);
            // Add x offset if specified.
            if (xOffset) {
                newPositions.x += xOffset;
            }
            if (breadcrumbs.options.rtl) {
                newPositions.x += positionOptions.width;
            }
            newPositions.y = pick(newPositions.y, this.yOffset, 0);
            breadcrumbs.group.align(newPositions, true, alignTo);
        }
    }
    /**
     * Render a button.
     *
     * @function Highcharts.Breadcrumbs#renderButton
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     * @param {Highcharts.Breadcrumbs} breadcrumb
     *        Current breadcrumb
     * @param {Highcharts.Breadcrumbs} posX
     *        Initial horizontal position
     * @param {Highcharts.Breadcrumbs} posY
     *        Initial vertical position
     * @return {SVGElement|void}
     *        Returns the SVG button
     */
    renderButton(breadcrumb, posX, posY) {
        const breadcrumbs = this, chart = this.chart, breadcrumbsOptions = breadcrumbs.options, buttonTheme = merge(breadcrumbsOptions.buttonTheme);
        const button = chart.renderer
            .button(breadcrumbs.getButtonText(breadcrumb), posX, posY, function (e) {
            // Extract events from button object and call
            const buttonEvents = breadcrumbsOptions.events &&
                breadcrumbsOptions.events.click;
            let callDefaultEvent;
            if (buttonEvents) {
                callDefaultEvent = buttonEvents.call(breadcrumbs, e, breadcrumb);
            }
            // (difference in behaviour of showFullPath and drillUp)
            if (callDefaultEvent !== false) {
                // For single button we are not going to the button
                // level, but the one level up
                if (!breadcrumbsOptions.showFullPath) {
                    e.newLevel = breadcrumbs.level - 1;
                }
                else {
                    e.newLevel = breadcrumb.level;
                }
                fireEvent(breadcrumbs, 'up', e);
            }
        }, buttonTheme)
            .addClass('highcharts-breadcrumbs-button')
            .add(breadcrumbs.group);
        if (!chart.styledMode) {
            button.attr(breadcrumbsOptions.style);
        }
        return button;
    }
    /**
     * Render a separator.
     *
     * @function Highcharts.Breadcrumbs#renderSeparator
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     * @param {Highcharts.Breadcrumbs} posX
     *        Initial horizontal position
     * @param {Highcharts.Breadcrumbs} posY
     *        Initial vertical position
     * @return {Highcharts.SVGElement}
     *        Returns the SVG button
     */
    renderSeparator(posX, posY) {
        const breadcrumbs = this, chart = this.chart, breadcrumbsOptions = breadcrumbs.options, separatorOptions = breadcrumbsOptions.separator;
        const separator = chart.renderer
            .label(separatorOptions.text, posX, posY, void 0, void 0, void 0, false)
            .addClass('highcharts-breadcrumbs-separator')
            .add(breadcrumbs.group);
        if (!chart.styledMode) {
            separator.css(separatorOptions.style);
        }
        return separator;
    }
    /**
     * Update.
     * @function Highcharts.Breadcrumbs#update
     *
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     * @param {Highcharts.BreadcrumbsOptions} options
     *        Breadcrumbs class.
     * @param {boolean} redraw
     *        Redraw flag
     */
    update(options) {
        merge(true, this.options, options);
        this.destroy();
        this.isDirty = true;
    }
    /**
     * Update button text when the showFullPath set to false.
     * @function Highcharts.Breadcrumbs#updateSingleButton
     *
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    updateSingleButton() {
        const chart = this.chart, currentBreadcrumb = this.list[this.level - 1];
        if (chart.drillUpButton) {
            chart.drillUpButton.attr({
                text: this.getButtonText(currentBreadcrumb)
            });
        }
    }
    /**
     * Destroy the chosen breadcrumbs group
     *
     * @function Highcharts.Breadcrumbs#destroy
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    destroy() {
        this.destroySingleButton();
        // Destroy elements one by one. It's necessary because
        // g().destroy() does not remove added HTML
        this.destroyListElements(true);
        // Then, destroy the group itself.
        if (this.group) {
            this.group.destroy();
        }
        this.group = void 0;
    }
    /**
     * Destroy the elements' buttons and separators.
     *
     * @function Highcharts.Breadcrumbs#destroyListElements
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    destroyListElements(force) {
        const elementList = this.elementList;
        objectEach(elementList, (element, level) => {
            if (force ||
                !elementList[level].updated) {
                element = elementList[level];
                element.button && element.button.destroy();
                element.separator && element.separator.destroy();
                delete element.button;
                delete element.separator;
                delete elementList[level];
            }
        });
        if (force) {
            this.elementList = {};
        }
    }
    /**
     * Destroy the single button if exists.
     *
     * @function Highcharts.Breadcrumbs#destroySingleButton
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    destroySingleButton() {
        if (this.chart.drillUpButton) {
            this.chart.drillUpButton.destroy();
            this.chart.drillUpButton = void 0;
        }
    }
    /**
     * Reset state for all buttons in elementList.
     *
     * @function Highcharts.Breadcrumbs#resetElementListState
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    resetElementListState() {
        objectEach(this.elementList, (element) => {
            element.updated = false;
        });
    }
    /**
     * Update rendered elements inside the elementList.
     *
     * @function Highcharts.Breadcrumbs#updateListElements
     *
     * @param {Highcharts.Breadcrumbs} this
     *        Breadcrumbs class.
     */
    updateListElements() {
        const breadcrumbs = this, elementList = breadcrumbs.elementList, buttonSpacing = breadcrumbs.options.buttonSpacing, posY = buttonSpacing, list = breadcrumbs.list, rtl = breadcrumbs.options.rtl, rtlFactor = rtl ? -1 : 1, updateXPosition = function (element, spacing) {
            return rtlFactor * element.getBBox().width +
                rtlFactor * spacing;
        }, adjustToRTL = function (element, posX, posY) {
            element.translate(posX - element.getBBox().width, posY);
        };
        // Initial position for calculating the breadcrumbs group.
        let posX = breadcrumbs.group ?
            updateXPosition(breadcrumbs.group, buttonSpacing) :
            buttonSpacing, currentBreadcrumb, breadcrumb;
        for (let i = 0, iEnd = list.length; i < iEnd; ++i) {
            const isLast = i === iEnd - 1;
            let button, separator;
            breadcrumb = list[i];
            if (elementList[breadcrumb.level]) {
                currentBreadcrumb = elementList[breadcrumb.level];
                button = currentBreadcrumb.button;
                // Render a separator if it was not created before.
                if (!currentBreadcrumb.separator &&
                    !isLast) {
                    // Add spacing for the next separator
                    posX += rtlFactor * buttonSpacing;
                    currentBreadcrumb.separator =
                        breadcrumbs.renderSeparator(posX, posY);
                    if (rtl) {
                        adjustToRTL(currentBreadcrumb.separator, posX, posY);
                    }
                    posX += updateXPosition(currentBreadcrumb.separator, buttonSpacing);
                }
                else if (currentBreadcrumb.separator &&
                    isLast) {
                    currentBreadcrumb.separator.destroy();
                    delete currentBreadcrumb.separator;
                }
                elementList[breadcrumb.level].updated = true;
            }
            else {
                // Render a button.
                button = breadcrumbs.renderButton(breadcrumb, posX, posY);
                if (rtl) {
                    adjustToRTL(button, posX, posY);
                }
                posX += updateXPosition(button, buttonSpacing);
                // Render a separator.
                if (!isLast) {
                    separator = breadcrumbs.renderSeparator(posX, posY);
                    if (rtl) {
                        adjustToRTL(separator, posX, posY);
                    }
                    posX += updateXPosition(separator, buttonSpacing);
                }
                elementList[breadcrumb.level] = {
                    button,
                    separator,
                    updated: true
                };
            }
            if (button) {
                button.setState(isLast ? 2 : 0);
            }
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
Breadcrumbs.defaultOptions = BreadcrumbsDefaults.options;
/* *
 *
 *  Default Export
 *
 * */
export default Breadcrumbs;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Callback function to react on button clicks.
 *
 * @callback Highcharts.BreadcrumbsClickCallbackFunction
 *
 * @param {Highcharts.Event} event
 * Event.
 *
 * @param {Highcharts.BreadcrumbOptions} options
 * Breadcrumb options.
 *
 * @param {global.Event} e
 * Event arguments.
 */
/**
 * Callback function to format the breadcrumb text from scratch.
 *
 * @callback Highcharts.BreadcrumbsFormatterCallbackFunction
 *
 * @param {Highcharts.Event} event
 * Event.
 *
 * @param {Highcharts.BreadcrumbOptions} options
 * Breadcrumb options.
 *
 * @return {string}
 * Formatted text or false
 */
/**
 * Options for the one breadcrumb.
 *
 * @interface Highcharts.BreadcrumbOptions
 */
/**
 * Level connected to a specific breadcrumb.
 * @name Highcharts.BreadcrumbOptions#level
 * @type {number}
 */
/**
 * Options for series or point connected to a specific breadcrumb.
 * @name Highcharts.BreadcrumbOptions#levelOptions
 * @type {SeriesOptions|PointOptionsObject}
 */
/**
 * Options for aligning breadcrumbs group.
 *
 * @interface Highcharts.BreadcrumbsAlignOptions
 */
/**
 * Align of a Breadcrumb group.
 * @default right
 * @name Highcharts.BreadcrumbsAlignOptions#align
 * @type {AlignValue}
 */
/**
 * Vertical align of a Breadcrumb group.
 * @default top
 * @name Highcharts.BreadcrumbsAlignOptions#verticalAlign
 * @type {VerticalAlignValue}
 */
/**
 * X offset of a Breadcrumbs group.
 * @name Highcharts.BreadcrumbsAlignOptions#x
 * @type {number}
 */
/**
 * Y offset of a Breadcrumbs group.
 * @name Highcharts.BreadcrumbsAlignOptions#y
 * @type {number}
 */
/**
 * Options for all breadcrumbs.
 *
 * @interface Highcharts.BreadcrumbsOptions
 */
/**
 * Button theme.
 * @name Highcharts.BreadcrumbsOptions#buttonTheme
 * @type { SVGAttributes | undefined }
 */
(''); // Keeps doclets above in JS file
