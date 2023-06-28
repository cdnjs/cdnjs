/**
 * @license Highcharts JS v11.0.1 (2023-05-08)
 *
 * Highcharts Drilldown module
 *
 * Author: Torstein Honsi
 * License: www.highcharts.com/license
 *
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/drilldown', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(
                    new CustomEvent(
                        'HighchartsModuleLoaded',
                        { detail: { path: path, module: obj[path] }
                    })
                );
            }
        }
    }
    _registerModule(_modules, 'Extensions/Breadcrumbs/BreadcrumbsDefaults.js', [], function () {
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
        /* *
         *
         *  Constants
         *
         * */
        /**
         * @optionparent lang
         */
        const lang = {
            /**
             * @since   10.0.0
             * @product highcharts
             *
             * @private
             */
            mainBreadcrumb: 'Main'
        };
        /**
         * Options for breadcrumbs. Breadcrumbs general options are defined in
         * `navigation.breadcrumbs`. Specific options for drilldown are set in
         * `drilldown.breadcrumbs` and for tree-like series traversing, in
         * `plotOptions[series].breadcrumbs`.
         *
         * @since        10.0.0
         * @product      highcharts
         * @optionparent navigation.breadcrumbs
         */
        const options = {
            /**
             * A collection of attributes for the buttons. The object takes SVG
             * attributes like `fill`, `stroke`, `stroke-width`, as well as `style`,
             * a collection of CSS properties for the text.
             *
             * The object can also be extended with states, so you can set
             * presentational options for `hover`, `select` or `disabled` button
             * states.
             *
             * @sample {highcharts} highcharts/breadcrumbs/single-button
             *         Themed, single button
             *
             * @type    {Highcharts.SVGAttributes}
             * @since   10.0.0
             * @product highcharts
             */
            buttonTheme: {
                /** @ignore */
                fill: 'none',
                /** @ignore */
                height: 18,
                /** @ignore */
                padding: 2,
                /** @ignore */
                'stroke-width': 0,
                /** @ignore */
                zIndex: 7,
                /** @ignore */
                states: {
                    select: {
                        fill: 'none'
                    }
                },
                style: {
                    color: "#334eff" /* Palette.highlightColor80 */
                }
            },
            /**
             * The default padding for each button and separator in each direction.
             *
             * @type  {number}
             * @since 10.0.0
             */
            buttonSpacing: 5,
            /**
             * Fires when clicking on the breadcrumbs button. Two arguments are
             * passed to the function. First breadcrumb button as an SVG element.
             * Second is the breadcrumbs class, containing reference to the chart,
             * series etc.
             *
             * ```js
             * click: function(button, breadcrumbs) {
             *   console.log(button);
             * }
             * ```
             *
             * Return false to stop default buttons click action.
             *
             * @type      {Highcharts.BreadcrumbsClickCallbackFunction}
             * @since     10.0.0
             * @apioption navigation.breadcrumbs.events.click
             */
            /**
             * When the breadcrumbs are floating, the plot area will not move to
             * make space for it. By default, the chart will not make space for the
             * buttons. This property won't work when positioned in the middle.
             *
             * @sample highcharts/breadcrumbs/single-button
             *         Floating button
             *
             * @type  {boolean}
             * @since 10.0.0
             */
            floating: false,
            /**
             * A format string for the breadcrumbs button. Variables are enclosed by
             * curly brackets. Available values are passed in the declared point
             * options.
             *
             * @type      {string|undefined}
             * @since 10.0.0
             * @default   undefined
             * @sample {highcharts} highcharts/breadcrumbs/format Display custom
             *          values in breadcrumb button.
             */
            format: void 0,
            /**
             * Callback function to format the breadcrumb text from scratch.
             *
             * @type      {Highcharts.BreadcrumbsFormatterCallbackFunction}
             * @since     10.0.0
             * @default   undefined
             * @apioption navigation.breadcrumbs.formatter
             */
            /**
             * What box to align the button to. Can be either `plotBox` or
             * `spacingBox`.
             *
             * @type    {Highcharts.ButtonRelativeToValue}
             * @default plotBox
             * @since   10.0.0
             * @product highcharts highmaps
             */
            relativeTo: 'plotBox',
            /**
             * Whether to reverse the order of buttons. This is common in Arabic
             * and Hebrew.
             *
             * @sample {highcharts} highcharts/breadcrumbs/rtl
             *         Breadcrumbs in RTL
             *
             * @type  {boolean}
             * @since 10.2.0
             */
            rtl: false,
            /**
             * Positioning for the button row. The breadcrumbs buttons will be
             * aligned properly for the default chart layout (title,  subtitle,
             * legend, range selector) for the custom chart layout set the position
             * properties.
             *
             * @sample  {highcharts} highcharts/breadcrumbs/single-button
             *          Single, right aligned button
             *
             * @type    {Highcharts.BreadcrumbsAlignOptions}
             * @since   10.0.0
             * @product highcharts highmaps
             */
            position: {
                /**
                 * Horizontal alignment of the breadcrumbs buttons.
                 *
                 * @type {Highcharts.AlignValue}
                 */
                align: 'left',
                /**
                 * Vertical alignment of the breadcrumbs buttons.
                 *
                 * @type {Highcharts.VerticalAlignValue}
                 */
                verticalAlign: 'top',
                /**
                 * The X offset of the breadcrumbs button group.
                 *
                 * @type {number}
                 */
                x: 0,
                /**
                 * The Y offset of the breadcrumbs button group. When `undefined`,
                 * and `floating` is `false`, the `y` position is adapted so that
                 * the breadcrumbs are rendered outside the target area.
                 *
                 * @type {number|undefined}
                 */
                y: void 0
            },
            /**
             * Options object for Breadcrumbs separator.
             *
             * @since 10.0.0
             */
            separator: {
                /**
                 * @type    {string}
                 * @since   10.0.0
                 * @product highcharts
                 */
                text: '/',
                /**
                 * CSS styles for the breadcrumbs separator.
                 *
                 * In styled mode, the breadcrumbs separators are styled by the
                 * `.highcharts-separator` rule with its different states.
                 *  @type  {Highcharts.CSSObject}
                 *  @since 10.0.0
                 */
                style: {
                    color: "#666666" /* Palette.neutralColor60 */,
                    fontSize: '0.8em'
                }
            },
            /**
             * Show full path or only a single button.
             *
             * @sample {highcharts} highcharts/breadcrumbs/single-button
             *         Single, styled button
             *
             * @type  {boolean}
             * @since 10.0.0
             */
            showFullPath: true,
            /**
             * CSS styles for all breadcrumbs.
             *
             * In styled mode, the breadcrumbs buttons are styled by the
             * `.highcharts-breadcrumbs-buttons .highcharts-button` rule with its
             * different states.
             *
             * @type  {Highcharts.SVGAttributes}
             * @since 10.0.0
             */
            style: {},
            /**
             * Whether to use HTML to render the breadcrumbs items texts.
             *
             * @type  {boolean}
             * @since 10.0.0
             */
            useHTML: false,
            /**
             * The z index of the breadcrumbs group.
             *
             * @type  {number}
             * @since 10.0.0
             */
            zIndex: 7
        };
        /* *
         *
         *  Default Export
         *
         * */
        const BreadcrumbsDefaults = {
            lang,
            options
        };

        return BreadcrumbsDefaults;
    });
    _registerModule(_modules, 'Extensions/Breadcrumbs/Breadcrumbs.js', [_modules['Extensions/Breadcrumbs/BreadcrumbsDefaults.js'], _modules['Core/Chart/Chart.js'], _modules['Core/FormatUtilities.js'], _modules['Core/Utilities.js']], function (BreadcrumbsDefaults, Chart, F, U) {
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
        const { format } = F;
        const { addEvent, defined, extend, fireEvent, isString, merge, objectEach, pick } = U;
        /* *
         *
         *  Constants
         *
         * */
        const composedMembers = [];
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
                if (U.pushUnique(composedMembers, ChartClass)) {
                    addEvent(Chart, 'destroy', onChartDestroy);
                    addEvent(Chart, 'afterShowResetZoom', onChartAfterShowResetZoom);
                    addEvent(Chart, 'getMargins', onChartGetMargins);
                    addEvent(Chart, 'redraw', onChartRedraw);
                    addEvent(Chart, 'selection', onChartSelection);
                }
                if (U.pushUnique(composedMembers, highchartsDefaultOptions)) {
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
             * @requires  modules/breadcrumbs
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
             * @requires  modules/breadcrumbs
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
             * Calcule level on which chart currently is.
             *
             * @requires  modules/breadcrumbs
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
             * @requires  modules/breadcrumbs
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
             * @requires  modules/breadcrumbs
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
             * @requires  modules/breadcrums
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
             * @requires  modules/breadcrumbs
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
             * @requires  modules/breadcrumbs
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
             * @requires  modules/breadcrumbs
             *
             * @function Highcharts.Breadcrumbs#renderSingleButton
             * @param {Highcharts.Breadcrumbs} this Breadcrumbs class.
             */
            renderSingleButton() {
                const breadcrumbs = this, chart = breadcrumbs.chart, list = breadcrumbs.list, breadcrumbsOptions = breadcrumbs.options, buttonSpacing = breadcrumbsOptions.buttonSpacing;
                // Make sure that only one type of button is visible.
                this.destroyListElements();
                // Draw breadcrumbs. Inital position for calculating the breadcrumbs
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
             * @requires  modules/breadcrumbs
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
                        'scrollablePlotBox'), bBox = breadcrumbs.group.getBBox(), additionalSpace = 2 * (buttonTheme.padding || 0) +
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
             * @requires  modules/breadcrums
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
             * @requires  modules/breadcrums
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
             * @requires  modules/breadcrumbs
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
             * @requires  modules/breadcrumbs
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
             * @requires  modules/breadcrumbs
             *
             * @function Highcharts.Breadcrumbs#destroy
             * @param {Highcharts.Breadcrumbs} this
             *        Breadcrumbs class.
             */
            destroy() {
                this.destroySingleButton();
                // Destroy elements one by one. It's necessary beacause
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
             * @requires  modules/breadcrumbs
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
             * @requires  modules/breadcrumbs
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
             * @requires  modules/breadcrumbs
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
             * @requires  modules/breadcrumbs
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
                // Inital position for calculating the breadcrumbs group.
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

        return Breadcrumbs;
    });
    _registerModule(_modules, 'Extensions/Drilldown.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Axis/Axis.js'], _modules['Core/Chart/Chart.js'], _modules['Core/Color/Color.js'], _modules['Series/Column/ColumnSeries.js'], _modules['Core/Globals.js'], _modules['Core/Defaults.js'], _modules['Core/Series/Point.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Axis/Tick.js'], _modules['Core/Utilities.js'], _modules['Extensions/Breadcrumbs/Breadcrumbs.js']], function (A, Axis, Chart, Color, ColumnSeries, H, D, Point, Series, SeriesRegistry, SVGRenderer, Tick, U, Breadcrumbs) {
        /* *
         *
         *  Highcharts Drilldown module
         *
         *  Author: Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { animObject } = A;
        const { noop } = H;
        const { defaultOptions } = D;
        const { seriesTypes } = SeriesRegistry;
        const { addEvent, cleanRecursively, defined, extend, fireEvent, merge, objectEach, pick, removeEvent, syncTimeout } = U;
        const PieSeries = seriesTypes.pie, MapSeries = seriesTypes.map;
        let ddSeriesId = 1;
        /**
         * Gets fired when a drilldown point is clicked, before the new series is added.
         * Note that when clicking a category label to trigger multiple series
         * drilldown, one `drilldown` event is triggered per point in the category.
         *
         * @callback Highcharts.DrilldownCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart where the event occurs.
         *
         * @param {Highcharts.DrilldownEventObject} e
         *        The drilldown event.
         */
        /**
         * The event arguments when a drilldown point is clicked.
         *
         * @interface Highcharts.DrilldownEventObject
         */ /**
        * If a category label was clicked, which index.
        * @name Highcharts.DrilldownEventObject#category
        * @type {number|undefined}
        */ /**
        * The original browser event (usually click) that triggered the drilldown.
        * @name Highcharts.DrilldownEventObject#originalEvent
        * @type {global.Event|undefined}
        */ /**
        * Prevents the default behaviour of the event.
        * @name Highcharts.DrilldownEventObject#preventDefault
        * @type {Function}
        */ /**
        * The originating point.
        * @name Highcharts.DrilldownEventObject#point
        * @type {Highcharts.Point}
        */ /**
        * If a category label was clicked, this array holds all points corresponding to
        * the category. Otherwise it is set to false.
        * @name Highcharts.DrilldownEventObject#points
        * @type {boolean|Array<Highcharts.Point>|undefined}
        */ /**
        * Options for the new series. If the event is utilized for async drilldown, the
        * seriesOptions are not added, but rather loaded async.
        * @name Highcharts.DrilldownEventObject#seriesOptions
        * @type {Highcharts.SeriesOptionsType|undefined}
        */ /**
        * The event target.
        * @name Highcharts.DrilldownEventObject#target
        * @type {Highcharts.Chart}
        */ /**
        * The event type.
        * @name Highcharts.DrilldownEventObject#type
        * @type {"drilldown"}
        */
        /**
         * This gets fired after all the series have been drilled up. This is especially
         * usefull in a chart with multiple drilldown series.
         *
         * @callback Highcharts.DrillupAllCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart where the event occurs.
         *
         * @param {Highcharts.DrillupAllEventObject} e
         *        The final drillup event.
         */
        /**
         * The event arguments when all the series have been drilled up.
         *
         * @interface Highcharts.DrillupAllEventObject
         */ /**
        * Prevents the default behaviour of the event.
        * @name Highcharts.DrillupAllEventObject#preventDefault
        * @type {Function}
        */ /**
        * The event target.
        * @name Highcharts.DrillupAllEventObject#target
        * @type {Highcharts.Chart}
        */ /**
        * The event type.
        * @name Highcharts.DrillupAllEventObject#type
        * @type {"drillupall"}
        */
        /**
         * Gets fired when drilling up from a drilldown series.
         *
         * @callback Highcharts.DrillupCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart where the event occurs.
         *
         * @param {Highcharts.DrillupEventObject} e
         *        The drillup event.
         */
        /**
         * The event arguments when drilling up from a drilldown series.
         *
         * @interface Highcharts.DrillupEventObject
         */ /**
        * Prevents the default behaviour of the event.
        * @name Highcharts.DrillupEventObject#preventDefault
        * @type {Function}
        */ /**
        * Options for the new series.
        * @name Highcharts.DrillupEventObject#seriesOptions
        * @type {Highcharts.SeriesOptionsType|undefined}
        */ /**
        * The event target.
        * @name Highcharts.DrillupEventObject#target
        * @type {Highcharts.Chart}
        */ /**
        * The event type.
        * @name Highcharts.DrillupEventObject#type
        * @type {"drillup"}
        */
        // Add language
        extend(defaultOptions.lang, 
        /**
         * @optionparent lang
         */
        {
        /**
         * The text for the button that appears when drilling down, linking back
         * to the parent series. The parent series' name is inserted for
         * `{series.name}`.
         *
         * @deprecated
         * @since    3.0.8
         * @product  highcharts highmaps
         * @requires modules/drilldown
         * @apioption lang.drillUpText
         */
        });
        /**
         * Options for drill down, the concept of inspecting increasingly high
         * resolution data through clicking on chart items like columns or pie slices.
         *
         * The drilldown feature requires the drilldown.js file to be loaded,
         * found in the modules directory of the download package, or online at
         * [code.highcharts.com/modules/drilldown.js
         * ](https://code.highcharts.com/modules/drilldown.js).
         *
         * @sample {highcharts} highcharts/series-organization/drilldown
         *         Organization chart drilldown
         *
         * @product      highcharts highmaps
         * @requires     modules/drilldown
         * @optionparent drilldown
         */
        defaultOptions.drilldown = {
            /**
             * When this option is false, clicking a single point will drill down
             * all points in the same category, equivalent to clicking the X axis
             * label.
             *
             * @sample {highcharts} highcharts/drilldown/allowpointdrilldown-false/
             *         Don't allow point drilldown
             *
             * @type      {boolean}
             * @default   true
             * @since     4.1.7
             * @product   highcharts
             * @apioption drilldown.allowPointDrilldown
             */
            /**
             * Options for the breadcrumbs, the navigation at the top leading the way
             * up through the drilldown levels.
             *
             * @since 10.0.0
             * @product   highcharts
             * @extends   navigation.breadcrumbs
             * @optionparent drilldown.breadcrumbs
             */
            /**
             * An array of series configurations for the drill down. Each series
             * configuration uses the same syntax as the [series](#series) option set.
             * These drilldown series are hidden by default. The drilldown series is
             * linked to the parent series' point by its `id`.
             *
             * @type      {Array<Highcharts.SeriesOptionsType>}
             * @since     3.0.8
             * @product   highcharts highmaps
             * @apioption drilldown.series
             */
            /**
             * Additional styles to apply to the X axis label for a point that
             * has drilldown data. By default it is underlined and blue to invite
             * to interaction.
             *
             * In styled mode, active label styles can be set with the
             * `.highcharts-drilldown-axis-label` class.
             *
             * @sample {highcharts} highcharts/drilldown/labels/
             *         Label styles
             *
             * @type    {Highcharts.CSSObject}
             * @default { "cursor": "pointer", "color": "#003399", "fontWeight": "bold", "textDecoration": "underline" }
             * @since   3.0.8
             * @product highcharts highmaps
             */
            activeAxisLabelStyle: {
                /** @ignore-option */
                cursor: 'pointer',
                /** @ignore-option */
                color: "#0022ff" /* Palette.highlightColor100 */,
                /** @ignore-option */
                fontWeight: 'bold',
                /** @ignore-option */
                textDecoration: 'underline'
            },
            /**
             * Additional styles to apply to the data label of a point that has
             * drilldown data. By default it is underlined and blue to invite to
             * interaction.
             *
             * In styled mode, active data label styles can be applied with the
             * `.highcharts-drilldown-data-label` class.
             *
             * @sample {highcharts} highcharts/drilldown/labels/
             *         Label styles
             *
             * @type    {Highcharts.CSSObject}
             * @default { "cursor": "pointer", "color": "#003399", "fontWeight": "bold", "textDecoration": "underline" }
             * @since   3.0.8
             * @product highcharts highmaps
             */
            activeDataLabelStyle: {
                cursor: 'pointer',
                color: "#0022ff" /* Palette.highlightColor100 */,
                fontWeight: 'bold',
                textDecoration: 'underline'
            },
            /**
             * Set the animation for all drilldown animations. Animation of a drilldown
             * occurs when drilling between a column point and a column series,
             * or a pie slice and a full pie series. Drilldown can still be used
             * between series and points of different types, but animation will
             * not occur.
             *
             * The animation can either be set as a boolean or a configuration
             * object. If `true`, it will use the 'swing' jQuery easing and a duration
             * of 500 ms. If used as a configuration object, the following properties
             * are supported:
             *
             * - `duration`: The duration of the animation in milliseconds.
             *
             * - `easing`: A string reference to an easing function set on the `Math`
             *   object. See
             *   [the easing demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-animation-easing/).
             *
             * @type    {boolean|Highcharts.AnimationOptionsObject}
             * @since   3.0.8
             * @product highcharts highmaps
             */
            animation: {
                /** @ignore-option */
                duration: 500
            },
            /**
             *
             * Options for the drill up button that appears when drilling down on a
             * series. The text for the button is defined in
             * [lang.drillUpText](#lang.drillUpText).
             *
             * This option is deprecated since 9.3.2, use `drilldown.breadcrumbs`
             * instead.
             *
             * @sample highcharts/breadcrumbs/single-button
             *         Breadcrumbs set up like a legacy button
             * @sample {highcharts} highcharts/drilldown/drillupbutton/ Drill up button
             * @sample {highmaps} highcharts/drilldown/drillupbutton/ Drill up button
             *
             * @since   3.0.8
             * @product highcharts highmaps
             *
             * @deprecated
             */
            drillUpButton: {
                /**
                 * What box to align the button to. Can be either `plotBox` or
                 * `spacingBox`.
                 *
                 * @type       {Highcharts.ButtonRelativeToValue}
                 * @default    plotBox
                 * @since      3.0.8
                 * @product    highcharts highmaps
                 * @apioption  drilldown.drillUpButton.relativeTo
                 */
                /**
                 * A collection of attributes for the button. The object takes SVG
                 * attributes like `fill`, `stroke`, `stroke-width` or `r`, the border
                 * radius. The theme also supports `style`, a collection of CSS
                 * properties for the text. Equivalent attributes for the hover state
                 * are given in `theme.states.hover`.
                 *
                 * In styled mode, drill-up button styles can be applied with the
                 * `.highcharts-drillup-button` class.
                 *
                 * @sample {highcharts} highcharts/drilldown/drillupbutton/
                 *         Button theming
                 * @sample {highmaps} highcharts/drilldown/drillupbutton/
                 *         Button theming
                 *
                 * @type      {Object}
                 * @since     3.0.8
                 * @product   highcharts highmaps
                 * @apioption drilldown.drillUpButton.theme
                 */
                /**
                 * Positioning options for the button within the `relativeTo` box.
                 * Available properties are `x`, `y`, `align` and `verticalAlign`.
                 *
                 * @type    {Highcharts.AlignObject}
                 * @since   3.0.8
                 * @product highcharts highmaps
                 */
                position: {
                    /**
                     * Vertical alignment of the button.
                     *
                     * @type      {Highcharts.VerticalAlignValue}
                     * @default   top
                     * @product   highcharts highmaps
                     * @apioption drilldown.drillUpButton.position.verticalAlign
                     */
                    /**
                     * Horizontal alignment.
                     *
                     * @type {Highcharts.AlignValue}
                     */
                    align: 'right',
                    /**
                     * The X offset of the button.
                     */
                    x: -10,
                    /**
                     * The Y offset of the button.
                     */
                    y: 10
                }
            },
            /**
             * Enable or disable zooming into a region of clicked map point you want to
             * drill into. If mapZooming is set to false the drilldown/drillup
             * animations only fade in/fade out without zooming to a specific map point.
             *
             * @sample    maps/demo/map-drilldown-preloaded/
             *            Map drilldown without async maps loading
             *
             * @type      {boolean}
             * @default   true
             * @since 11.0.0
             * @product   highmaps
             * @apioption drilldown.mapZooming
             */
            mapZooming: true
        };
        /**
         * Fires when a drilldown point is clicked, before the new series is added. This
         * event is also utilized for async drilldown, where the seriesOptions are not
         * added by option, but rather loaded async. Note that when clicking a category
         * label to trigger multiple series drilldown, one `drilldown` event is
         * triggered per point in the category.
         *
         * Event arguments:
         *
         * - `category`: If a category label was clicked, which index.
         *
         * - `originalEvent`: The original browser event (usually click) that triggered
         *   the drilldown.
         *
         * - `point`: The originating point.
         *
         * - `points`: If a category label was clicked, this array holds all points
         *   corresponding to the category.
         *
         * - `seriesOptions`: Options for the new series.
         *
         * @sample {highcharts} highcharts/drilldown/async/
         *         Async drilldown
         *
         * @type      {Highcharts.DrilldownCallbackFunction}
         * @since     3.0.8
         * @product   highcharts highmaps
         * @context   Highcharts.Chart
         * @requires  modules/drilldown
         * @apioption chart.events.drilldown
         */
        /**
         * Fires when drilling up from a drilldown series.
         *
         * @type      {Highcharts.DrillupCallbackFunction}
         * @since     3.0.8
         * @product   highcharts highmaps
         * @context   Highcharts.Chart
         * @requires  modules/drilldown
         * @apioption chart.events.drillup
         */
        /**
         * In a chart with multiple drilldown series, this event fires after all the
         * series have been drilled up.
         *
         * @type      {Highcharts.DrillupAllCallbackFunction}
         * @since     4.2.4
         * @product   highcharts highmaps
         * @context   Highcharts.Chart
         * @requires  modules/drilldown
         * @apioption chart.events.drillupall
         */
        /**
         * The `id` of a series in the [drilldown.series](#drilldown.series) array to
         * use for a drilldown for this point.
         *
         * @sample {highcharts} highcharts/drilldown/basic/
         *         Basic drilldown
         *
         * @type      {string}
         * @since     3.0.8
         * @product   highcharts
         * @requires  modules/drilldown
         * @apioption series.line.data.drilldown
         */
        /**
         * A general fadeIn method.
         *
         * @requires module:modules/drilldown
         *
         * @function Highcharts.SVGElement#fadeIn
         *
         * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
         * The animation options for the element fade.
         */
        SVGRenderer.prototype.Element.prototype.fadeIn = function (animation) {
            this
                .attr({
                opacity: 0.1,
                visibility: 'inherit'
            })
                .animate({
                opacity: pick(this.newOpacity, 1) // newOpacity used in maps
            }, animation || {
                duration: 250
            });
        };
        /**
         * Add a series to the chart as drilldown from a specific point in the parent
         * series. This method is used for async drilldown, when clicking a point in a
         * series should result in loading and displaying a more high-resolution series.
         * When not async, the setup is simpler using the
         * [drilldown.series](https://api.highcharts.com/highcharts/drilldown.series)
         * options structure.
         *
         * @sample highcharts/drilldown/async/
         *         Async drilldown
         *
         * @function Highcharts.Chart#addSeriesAsDrilldown
         *
         * @param {Highcharts.Point} point
         * The point from which the drilldown will start.
         *
         * @param {Highcharts.SeriesOptionsType} options
         * The series options for the new, detailed series.
         */
        Chart.prototype.addSeriesAsDrilldown = function (point, options) {
            const chart = this;
            if (chart.mapView) {
                // stop hovering while drilling down
                point.series.isDrilling = true;
                // stop duplicating and overriding animations
                point.series.options.inactiveOtherPoints = true;
                // hide and disable dataLabels
                if (point.series.dataLabelsGroup) {
                    point.series.dataLabelsGroup.destroy();
                    delete point.series.dataLabelsGroup;
                }
                // #18925 map zooming is not working with geoJSON maps
                if (chart.options.drilldown &&
                    !chart.mapView.projection.hasGeoProjection &&
                    defaultOptions.drilldown) {
                    const userDrilldown = cleanRecursively(chart.options.drilldown, defaultOptions.drilldown);
                    // set mapZooming to false if user didn't set any in chart config
                    if (!defined(userDrilldown.mapZooming)) {
                        chart.options.drilldown.mapZooming = false;
                    }
                }
                if (chart.options.drilldown &&
                    chart.options.drilldown.animation &&
                    chart.options.drilldown.mapZooming) {
                    // first zoomTo then crossfade series
                    chart.mapView.allowTransformAnimation = true;
                    const animOptions = animObject(chart.options.drilldown.animation);
                    if (typeof animOptions !== 'boolean') {
                        const userComplete = animOptions.complete, drilldownComplete = function (obj) {
                            if (obj && obj.applyDrilldown && chart.mapView) {
                                chart.addSingleSeriesAsDrilldown(point, options);
                                chart.applyDrilldown();
                                chart.mapView.allowTransformAnimation = false;
                            }
                        };
                        animOptions.complete =
                            function () {
                                if (userComplete) {
                                    userComplete.apply(this, arguments);
                                }
                                drilldownComplete.apply(this, arguments);
                            };
                    }
                    point.zoomTo(animOptions);
                }
                else {
                    chart.addSingleSeriesAsDrilldown(point, options);
                    chart.applyDrilldown();
                }
            }
            else {
                chart.addSingleSeriesAsDrilldown(point, options);
                chart.applyDrilldown();
            }
        };
        Chart.prototype.addSingleSeriesAsDrilldown = function (point, ddOptions) {
            let oldSeries = point.series, xAxis = oldSeries.xAxis, yAxis = oldSeries.yAxis, newSeries, pointIndex, levelSeries = [], levelSeriesOptions = [], level, levelNumber, last, colorProp;
            colorProp = this.styledMode ?
                { colorIndex: pick(point.colorIndex, oldSeries.colorIndex) } :
                { color: point.color || oldSeries.color };
            if (!this.drilldownLevels) {
                this.drilldownLevels = [];
            }
            levelNumber = oldSeries.options._levelNumber || 0;
            // See if we can reuse the registered series from last run
            last = this.drilldownLevels[this.drilldownLevels.length - 1];
            if (last && last.levelNumber !== levelNumber) {
                last = void 0;
            }
            ddOptions = extend(extend({
                _ddSeriesId: ddSeriesId++
            }, colorProp), ddOptions);
            pointIndex = oldSeries.points.indexOf(point);
            // Record options for all current series
            oldSeries.chart.series.forEach(function (series) {
                if (series.xAxis === xAxis) {
                    series.options._ddSeriesId =
                        series.options._ddSeriesId || ddSeriesId++;
                    series.options._colorIndex = series.userOptions._colorIndex;
                    series.options._levelNumber =
                        series.options._levelNumber || levelNumber; // #3182
                    if (last) {
                        levelSeries = last.levelSeries;
                        levelSeriesOptions = last.levelSeriesOptions;
                    }
                    else {
                        levelSeries.push(series);
                        // (#10597)
                        series.purgedOptions = merge({
                            _ddSeriesId: series.options._ddSeriesId,
                            _levelNumber: series.options._levelNumber,
                            selected: series.options.selected
                        }, series.userOptions);
                        levelSeriesOptions.push(series.purgedOptions);
                    }
                }
            });
            // Add a record of properties for each drilldown level
            level = extend({
                levelNumber: levelNumber,
                seriesOptions: oldSeries.options,
                seriesPurgedOptions: oldSeries.purgedOptions,
                levelSeriesOptions: levelSeriesOptions,
                levelSeries: levelSeries,
                shapeArgs: point.shapeArgs,
                // no graphic in line series with markers disabled
                bBox: point.graphic ? point.graphic.getBBox() : {},
                color: point.isNull ?
                    Color.parse(colorProp.color).setOpacity(0).get() :
                    colorProp.color,
                lowerSeriesOptions: ddOptions,
                pointOptions: oldSeries.options.data[pointIndex],
                pointIndex: pointIndex,
                oldExtremes: {
                    xMin: xAxis && xAxis.userMin,
                    xMax: xAxis && xAxis.userMax,
                    yMin: yAxis && yAxis.userMin,
                    yMax: yAxis && yAxis.userMax
                },
                resetZoomButton: last && last.levelNumber === levelNumber ?
                    void 0 : this.resetZoomButton
            }, colorProp);
            // Push it to the lookup array
            this.drilldownLevels.push(level);
            // Reset names to prevent extending (#6704)
            if (xAxis && xAxis.names) {
                xAxis.names.length = 0;
            }
            newSeries = level.lowerSeries = this.addSeries(ddOptions, false);
            newSeries.options._levelNumber = levelNumber + 1;
            if (xAxis) {
                xAxis.oldPos = xAxis.pos;
                xAxis.userMin = xAxis.userMax = null;
                yAxis.userMin = yAxis.userMax = null;
            }
            newSeries.isDrilling = true;
            // Run fancy cross-animation on supported and equal types
            if (oldSeries.type === newSeries.type) {
                newSeries.animate = (newSeries.animateDrilldown || noop);
                newSeries.options.animation = true;
            }
        };
        Chart.prototype.applyDrilldown = function () {
            const chart = this, drilldownLevels = this.drilldownLevels;
            let levelToRemove;
            if (drilldownLevels && drilldownLevels.length > 0) {
                // #3352, async loading
                levelToRemove =
                    drilldownLevels[drilldownLevels.length - 1].levelNumber;
                this.drilldownLevels.forEach(function (level) {
                    if (chart.mapView &&
                        chart.options.drilldown &&
                        chart.options.drilldown.mapZooming) {
                        chart.redraw();
                        level.lowerSeries.isDrilling = false;
                        chart.mapView.fitToBounds(level.lowerSeries.bounds);
                        level.lowerSeries.isDrilling = true;
                    }
                    if (level.levelNumber === levelToRemove) {
                        level.levelSeries.forEach(function (series, j) {
                            if (!chart.mapView) {
                                // Not removed, not added as part of a multi-series
                                // drilldown
                                if (series.options &&
                                    series.options._levelNumber === levelToRemove) {
                                    series.remove(false);
                                }
                            }
                            else {
                                // deal with asonchrynous removing of map series after
                                // zooming into
                                if (series.options &&
                                    series.options._levelNumber === levelToRemove &&
                                    series.group) {
                                    let animOptions = {};
                                    if (chart.options.drilldown) {
                                        animOptions = chart.options.drilldown.animation;
                                    }
                                    series.group.animate({
                                        opacity: 0
                                    }, animOptions, function () {
                                        series.remove(false);
                                        // We have a reset zoom button. Hide it and
                                        // detatch it from the chart. It is preserved
                                        // to the layer config above.
                                        if (chart.resetZoomButton) {
                                            chart.resetZoomButton.hide();
                                            delete chart.resetZoomButton;
                                        }
                                        chart.pointer.reset();
                                        fireEvent(chart, 'afterDrilldown');
                                        if (chart.mapView) {
                                            chart.series.forEach((series) => {
                                                series.isDirtyData = true;
                                                series.isDrilling = false;
                                            });
                                            chart.mapView.fitToBounds(void 0, void 0);
                                        }
                                        fireEvent(chart, 'afterApplyDrilldown');
                                    });
                                }
                            }
                        });
                    }
                });
            }
            if (!chart.mapView) {
                // We have a reset zoom button. Hide it and detatch it from the
                // chart. It is preserved to the layer config above.
                if (this.resetZoomButton) {
                    this.resetZoomButton.hide();
                    delete this.resetZoomButton;
                }
                this.pointer.reset();
                fireEvent(this, 'afterDrilldown');
                this.redraw();
                fireEvent(this, 'afterApplyDrilldown');
            }
        };
        /**
         * This method creates an array of arrays containing a level number
         * with the corresponding series/point.
         *
         * @requires  modules/breadcrumbs
         *
         * @private
         * @param {Highcharts.Chart} chart
         *        Highcharts Chart object.
         * @return {Array<Breadcrumbs.BreadcrumbOptions>}
         *        List for Highcharts Breadcrumbs.
         */
        const createBreadcrumbsList = function (chart) {
            const list = [], drilldownLevels = chart.drilldownLevels;
            // The list is based on drilldown levels from the chart object
            if (drilldownLevels && drilldownLevels.length) {
                // Add the initial series as the first element.
                if (!list[0]) {
                    list.push({
                        level: 0,
                        levelOptions: drilldownLevels[0].seriesOptions
                    });
                }
                drilldownLevels.forEach(function (level, i) {
                    const lastBreadcrumb = list[list.length - 1];
                    // If level is already added to breadcrumbs list,
                    // don't add it again- drilling categories
                    // + 1 because of the wrong levels numeration
                    // in drilldownLevels array.
                    if (level.levelNumber + 1 > lastBreadcrumb.level) {
                        list.push({
                            level: level.levelNumber + 1,
                            levelOptions: merge({
                                name: level.lowerSeries.name
                            }, level.pointOptions)
                        });
                    }
                });
            }
            return list;
        };
        /**
         * When the chart is drilled down to a child series, calling `chart.drillUp()`
         * will drill up to the parent series.
         *
         * @requires  modules/drilldown
         *
         * @function Highcharts.Chart#drillUp
         *
         * @sample {highcharts} highcharts/drilldown/programmatic
         *         Programmatic drilldown
         */
        Chart.prototype.drillUp = function (isMultipleDrillUp) {
            if (!this.drilldownLevels || this.drilldownLevels.length === 0) {
                return;
            }
            fireEvent(this, 'beforeDrillUp');
            const chart = this, drilldownLevels = chart.drilldownLevels, levelNumber = drilldownLevels[drilldownLevels.length - 1].levelNumber, chartSeries = chart.series, drilldownLevelsNumber = chart.drilldownLevels.length, addSeries = function (seriesOptions, oldSeries) {
                let addedSeries;
                chartSeries.forEach(function (series) {
                    if (series.options._ddSeriesId === seriesOptions._ddSeriesId) {
                        addedSeries = series;
                    }
                });
                addedSeries = addedSeries || chart.addSeries(seriesOptions, false);
                if (addedSeries.type === oldSeries.type &&
                    addedSeries.animateDrillupTo) {
                    addedSeries.animate = addedSeries.animateDrillupTo;
                }
                if (seriesOptions === level.seriesPurgedOptions) {
                    return addedSeries;
                }
            }, removeSeries = (oldSeries) => {
                oldSeries.remove(false);
                chart.series.forEach((series) => {
                    // ensures to redraw series to get correct colors
                    if (series.colorAxis) {
                        series.isDirtyData = true;
                    }
                    series.options.inactiveOtherPoints = false;
                });
                chart.redraw();
            };
            let i = drilldownLevels.length, seriesI, level, oldExtremes;
            while (i--) {
                let oldSeries, newSeries;
                level = drilldownLevels[i];
                if (level.levelNumber === levelNumber) {
                    drilldownLevels.pop();
                    // Get the lower series by reference or id
                    oldSeries = level.lowerSeries;
                    if (!oldSeries.chart) { // #2786
                        seriesI = chartSeries.length; // #2919
                        while (seriesI--) {
                            if (chartSeries[seriesI].options.id ===
                                level.lowerSeriesOptions.id &&
                                chartSeries[seriesI].options._levelNumber ===
                                    levelNumber + 1) { // #3867
                                oldSeries = chartSeries[seriesI];
                                break;
                            }
                        }
                    }
                    oldSeries.xData = []; // Overcome problems with minRange (#2898)
                    // Reset the names to start new series from the beginning.
                    // Do it once to preserve names when multiple
                    // series are added for the same axis, #16135.
                    if (oldSeries.xAxis &&
                        oldSeries.xAxis.names &&
                        (drilldownLevelsNumber === 0 || i === drilldownLevelsNumber)) {
                        oldSeries.xAxis.names.length = 0;
                    }
                    level.levelSeriesOptions.forEach((el) => {
                        newSeries = addSeries(el, oldSeries);
                    });
                    fireEvent(chart, 'drillup', {
                        seriesOptions: level.seriesPurgedOptions ||
                            level.seriesOptions
                    });
                    if (newSeries) {
                        if (newSeries.type === oldSeries.type) {
                            newSeries.drilldownLevel = level;
                            newSeries.options.animation =
                                chart.options.drilldown.animation;
                            // #2919
                            if (oldSeries.animateDrillupFrom && oldSeries.chart) {
                                oldSeries.animateDrillupFrom(level);
                            }
                        }
                        newSeries.options._levelNumber = levelNumber;
                    }
                    const seriesToRemove = oldSeries;
                    // cannot access variable changed in loop
                    if (!chart.mapView) {
                        seriesToRemove.remove(false);
                    }
                    // Reset the zoom level of the upper series
                    if (newSeries && newSeries.xAxis) {
                        oldExtremes = level.oldExtremes;
                        newSeries.xAxis.setExtremes(oldExtremes.xMin, oldExtremes.xMax, false);
                        newSeries.yAxis.setExtremes(oldExtremes.yMin, oldExtremes.yMax, false);
                    }
                    // We have a resetZoomButton tucked away for this level. Attatch
                    // it to the chart and show it.
                    if (level.resetZoomButton) {
                        chart.resetZoomButton = level.resetZoomButton;
                    }
                    if (!this.mapView) {
                        fireEvent(chart, 'afterDrillUp');
                        this.redraw();
                        if (this.ddDupes) {
                            this.ddDupes.length = 0; // #3315
                        } // #8324
                        // Fire a once-off event after all series have been drilled
                        // up (#5158)
                        fireEvent(chart, 'drillupall');
                    }
                    else {
                        const shouldAnimate = level.levelNumber === levelNumber &&
                            isMultipleDrillUp, zoomingDrill = chart.options.drilldown &&
                            chart.options.drilldown.animation &&
                            chart.options.drilldown.mapZooming;
                        if (shouldAnimate) {
                            oldSeries.remove(false);
                        }
                        else {
                            // hide and disable dataLabels
                            if (oldSeries.dataLabelsGroup) {
                                oldSeries.dataLabelsGroup.destroy();
                                delete oldSeries.dataLabelsGroup;
                            }
                            if (chart.mapView && newSeries) {
                                if (zoomingDrill) {
                                    // stop hovering while drilling down
                                    oldSeries.isDrilling = true;
                                    newSeries.isDrilling = true;
                                    chart.redraw(false);
                                    // Fit to previous bounds
                                    chart.mapView.fitToBounds(oldSeries.bounds, void 0, true, false);
                                }
                                chart.mapView.allowTransformAnimation = true;
                                fireEvent(chart, 'afterDrillUp', {
                                    seriesOptions: newSeries ? newSeries.userOptions : void 0
                                });
                                if (zoomingDrill) {
                                    // Fit to natural bounds
                                    chart.mapView.setView(void 0, 1, true, {
                                        complete: function () {
                                            // fire it only on complete in this place
                                            // (once)
                                            if (Object.prototype.hasOwnProperty.call(this, 'complete')) {
                                                removeSeries(oldSeries);
                                            }
                                        }
                                    });
                                }
                                else {
                                    // When user don't want to zoom into region only
                                    // fade out
                                    chart.mapView.allowTransformAnimation = false;
                                    if (oldSeries.group) {
                                        oldSeries.group.animate({
                                            opacity: 0
                                        }, chart.options.drilldown.animation, function () {
                                            removeSeries(oldSeries);
                                            if (chart.mapView) {
                                                chart.mapView.allowTransformAnimation =
                                                    true;
                                            }
                                        });
                                    }
                                    else {
                                        removeSeries(oldSeries);
                                        chart.mapView.allowTransformAnimation = true;
                                    }
                                }
                                newSeries.isDrilling = false;
                                if (chart.ddDupes) {
                                    chart.ddDupes.length = 0; // #3315
                                } // #8324
                                // Fire a once-off event after all series have been
                                // drilled up (#5158)
                                fireEvent(chart, 'drillupall');
                            }
                        }
                    }
                }
            }
        };
        /**
         * A function to fade in a group. First, the element is being hidden,
         * then, using `opactiy`, is faded in. Used for example by `dataLabelsGroup`
         * where simple SVGElement.fadeIn() is not enough, because of other features
         * (e.g. InactiveState) using `opacity` to fadeIn/fadeOut.
         * @requires module:modules/drilldown
         *
         * @private
         * @param {undefined|SVGElement} [group]
         * The SVG element to be faded in.
         */
        function fadeInGroup(group) {
            const animationOptions = animObject(this.chart.options.drilldown.animation);
            if (group) {
                group.hide();
                syncTimeout(function () {
                    // Make sure neither the group, or the chart, were destroyed
                    if (group && group.added) {
                        group.fadeIn();
                    }
                }, Math.max(animationOptions.duration - 50, 0));
            }
        }
        /* eslint-disable no-invalid-this */
        // Add update function to be called internally from Chart.update
        // (#7600, #12855)
        addEvent(Chart, 'afterInit', function () {
            const chart = this;
            chart.drilldown = {
                chart,
                fadeInGroup,
                update: function (options, redraw) {
                    merge(true, chart.options.drilldown, options);
                    if (pick(redraw, true)) {
                        chart.redraw();
                    }
                }
            };
        });
        addEvent(Chart, 'render', function () {
            (this.xAxis || []).forEach(function (axis) {
                axis.ddPoints = {};
                axis.series.forEach(function (series) {
                    let i, xData = series.xData || [], points = series.points, p;
                    for (i = 0; i < xData.length; i++) {
                        p = series.options.data[i];
                        // The `drilldown` property can only be set on an array or an
                        // object
                        if (typeof p !== 'number') {
                            // Convert array to object (#8008)
                            p = series.pointClass.prototype.optionsToObject
                                .call({ series: series }, p);
                            if (p.drilldown) {
                                if (!axis.ddPoints[xData[i]]) {
                                    axis.ddPoints[xData[i]] = [];
                                }
                                const index = i - (series.cropStart || 0);
                                axis.ddPoints[xData[i]].push((points && index >= 0 && index < points.length) ?
                                    points[index] :
                                    true);
                            }
                        }
                    }
                });
                // Add drillability to ticks, and always keep it drillability updated
                // (#3951)
                objectEach(axis.ticks, Tick.prototype.drillable);
            });
        });
        addEvent(Breadcrumbs, 'up', function (e) {
            const chart = this.chart, drillUpsNumber = this.getLevel() - e.newLevel;
            let isMultipleDrillUp = drillUpsNumber > 1;
            for (let i = 0; i < drillUpsNumber; i++) {
                if (i === drillUpsNumber - 1) {
                    isMultipleDrillUp = false;
                }
                chart.drillUp(isMultipleDrillUp);
            }
        });
        addEvent(Chart, 'afterDrilldown', function () {
            const chart = this, drilldownOptions = chart.options.drilldown, breadcrumbsOptions = drilldownOptions && drilldownOptions.breadcrumbs;
            if (!chart.breadcrumbs) {
                chart.breadcrumbs = new Breadcrumbs(chart, breadcrumbsOptions);
            }
            chart.breadcrumbs.updateProperties(createBreadcrumbsList(chart));
        });
        addEvent(Chart, 'afterDrillUp', function () {
            const chart = this;
            chart.breadcrumbs &&
                chart.breadcrumbs.updateProperties(createBreadcrumbsList(chart));
        });
        addEvent(Chart, 'update', function (e) {
            const breadcrumbs = this.breadcrumbs, breadcrumbOptions = e.options.drilldown &&
                e.options.drilldown.breadcrumbs;
            if (breadcrumbs && breadcrumbOptions) {
                breadcrumbs.update(e.options.drilldown.breadcrumbs);
            }
        });
        /**
         * When drilling up, keep the upper series invisible until the lower series has
         * moved into place.
         *
         * @private
         * @function Highcharts.ColumnSeries#animateDrillupTo
         * @param {boolean} [init=false]
         * Whether to initialize animation
         */
        ColumnSeries.prototype.animateDrillupTo = function (init) {
            if (!init) {
                const newSeries = this, level = newSeries.drilldownLevel;
                // First hide all items before animating in again
                this.points.forEach(function (point) {
                    const dataLabel = point.dataLabel;
                    if (point.graphic) { // #3407
                        point.graphic.hide();
                    }
                    if (dataLabel) {
                        // The data label is initially hidden, make sure it is not faded
                        // in (#6127)
                        dataLabel.hidden = dataLabel.attr('visibility') === 'hidden';
                        if (!dataLabel.hidden) {
                            dataLabel.hide();
                            if (point.connector) {
                                point.connector.hide();
                            }
                        }
                    }
                });
                // Do dummy animation on first point to get to complete
                syncTimeout(function () {
                    if (newSeries.points) { // May be destroyed in the meantime, #3389
                        // Unable to drillup with nodes, #13711
                        let pointsWithNodes = [];
                        newSeries.data.forEach(function (el) {
                            pointsWithNodes.push(el);
                        });
                        if (newSeries.nodes) {
                            pointsWithNodes = pointsWithNodes.concat(newSeries.nodes);
                        }
                        pointsWithNodes.forEach(function (point, i) {
                            // Fade in other points
                            const verb = i === (level && level.pointIndex) ? 'show' : 'fadeIn', inherit = verb === 'show' ? true : void 0, dataLabel = point.dataLabel;
                            if (point.graphic && // #3407
                                point.visible // Don't show if invisible (#18303)
                            ) {
                                point.graphic[verb](inherit);
                            }
                            if (dataLabel && !dataLabel.hidden) { // #6127
                                dataLabel.fadeIn(); // #7384
                                if (point.connector) {
                                    point.connector.fadeIn();
                                }
                            }
                        });
                    }
                }, Math.max(this.chart.options.drilldown.animation.duration - 50, 0));
                // Reset to prototype
                delete this.animate;
            }
        };
        ColumnSeries.prototype.animateDrilldown = function (init) {
            let series = this, chart = this.chart, drilldownLevels = chart.drilldownLevels, animateFrom, animationOptions = animObject(chart.options.drilldown.animation), xAxis = this.xAxis, styledMode = chart.styledMode;
            if (!init) {
                drilldownLevels.forEach(function (level) {
                    if (series.options._ddSeriesId ===
                        level.lowerSeriesOptions._ddSeriesId) {
                        animateFrom = level.shapeArgs;
                        if (!styledMode) {
                            // Add the point colors to animate from
                            animateFrom.fill = level.color;
                        }
                    }
                });
                animateFrom.x += pick(xAxis.oldPos, xAxis.pos) - xAxis.pos;
                this.points.forEach(function (point) {
                    const animateTo = point.shapeArgs;
                    if (!styledMode) {
                        // Add the point colors to animate to
                        animateTo.fill = point.color;
                    }
                    if (point.graphic) {
                        point.graphic
                            .attr(animateFrom)
                            .animate(extend(point.shapeArgs, { fill: point.color || series.color }), animationOptions);
                    }
                });
                if (chart.drilldown) {
                    chart.drilldown.fadeInGroup(this.dataLabelsGroup);
                }
                // Reset to prototype
                delete this.animate;
            }
        };
        /**
         * When drilling up, pull out the individual point graphics from the lower
         * series and animate them into the origin point in the upper series.
         *
         * @private
         * @function Highcharts.ColumnSeries#animateDrillupFrom
         * @param {Highcharts.DrilldownLevelObject} level
         *        Level container
         * @return {void}
         */
        ColumnSeries.prototype.animateDrillupFrom = function (level) {
            let animationOptions = animObject(this.chart.options.drilldown.animation), group = this.group, 
            // For 3d column series all columns are added to one group
            // so we should not delete the whole group. #5297
            removeGroup = group !== this.chart.columnGroup, series = this;
            // Cancel mouse events on the series group (#2787)
            series.trackerGroups.forEach(function (key) {
                if (series[key]) { // we don't always have dataLabelsGroup
                    series[key].on('mouseover');
                }
            });
            if (removeGroup) {
                delete this.group;
            }
            this.points.forEach(function (point) {
                const graphic = point.graphic, animateTo = level.shapeArgs, complete = function () {
                    graphic.destroy();
                    if (group && removeGroup) {
                        group = group.destroy();
                    }
                };
                if (graphic && animateTo) {
                    delete point.graphic;
                    if (!series.chart.styledMode) {
                        animateTo.fill = level.color;
                    }
                    if (animationOptions.duration) {
                        graphic.animate(animateTo, merge(animationOptions, { complete: complete }));
                    }
                    else {
                        graphic.attr(animateTo);
                        complete();
                    }
                }
            });
        };
        if (PieSeries) {
            extend(PieSeries.prototype, {
                animateDrillupTo: ColumnSeries.prototype.animateDrillupTo,
                animateDrillupFrom: ColumnSeries.prototype.animateDrillupFrom,
                animateDrilldown: function (init) {
                    const level = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1], animationOptions = this.chart.options.drilldown.animation;
                    if (this.is('item')) {
                        animationOptions.duration = 0;
                    }
                    // Unable to drill down in the horizontal item series #13372
                    if (this.center) {
                        const animateFrom = level.shapeArgs, start = animateFrom.start, angle = animateFrom.end - start, startAngle = angle / this.points.length, styledMode = this.chart.styledMode;
                        if (!init) {
                            this.points.forEach(function (point, i) {
                                const animateTo = point.shapeArgs;
                                if (!styledMode) {
                                    animateFrom.fill = level.color;
                                    animateTo.fill = point.color;
                                }
                                if (point.graphic) {
                                    point.graphic
                                        .attr(merge(animateFrom, {
                                        start: start + i * startAngle,
                                        end: start + (i + 1) * startAngle
                                    }))[animationOptions ? 'animate' : 'attr'](animateTo, animationOptions);
                                }
                            });
                            if (this.chart.drilldown) {
                                this.chart.drilldown.fadeInGroup(this.dataLabelsGroup);
                            }
                            // Reset to prototype
                            delete this.animate;
                        }
                    }
                }
            });
        }
        if (MapSeries) {
            extend(MapSeries.prototype, {
                /**
                 * Animate in the new series.
                 * @private
                 */
                animateDrilldown(init) {
                    const series = this, chart = this.chart, group = this.group;
                    if (chart && group && series.options) {
                        // Initialize the animation
                        if (init && chart.mapView) {
                            group.attr({
                                opacity: 0.01
                            });
                            chart.mapView.allowTransformAnimation = false;
                            // stop duplicating and overriding animations
                            series.options.inactiveOtherPoints = true;
                            series.options.enableMouseTracking = false;
                            // Run the animation
                        }
                        else {
                            group.animate({
                                opacity: 1
                            }, chart.options.drilldown.animation, function () {
                                if (series.options) {
                                    series.options.inactiveOtherPoints = false;
                                    series.options.enableMouseTracking =
                                        pick((series.userOptions &&
                                            series.userOptions.enableMouseTracking), true);
                                    series.isDirty = true;
                                    chart.redraw();
                                }
                            });
                            if (chart.drilldown) {
                                chart.drilldown.fadeInGroup(this.dataLabelsGroup);
                            }
                        }
                    }
                },
                /**
                 * When drilling up, pull out the individual point graphics from the
                 * lower series and animate them into the origin point in the upper
                 * series.
                 * @private
                 */
                animateDrillupFrom() {
                    const series = this, chart = this.chart;
                    if (chart && chart.mapView) {
                        chart.mapView.allowTransformAnimation = false;
                    }
                    // stop duplicating and overriding animations
                    if (series.options) {
                        series.options.inactiveOtherPoints = true;
                    }
                },
                /**
                 * When drilling up, keep the upper series invisible until the lower
                 * series has moved into place.
                 * @private
                 */
                animateDrillupTo(init) {
                    const series = this, chart = this.chart, group = this.group;
                    if (chart && group) {
                        // Initialize the animation
                        if (init) {
                            group.attr({
                                opacity: 0.01
                            });
                            // stop duplicating and overriding animations
                            if (series.options) {
                                series.options.inactiveOtherPoints = true;
                            }
                            // Run the animation
                        }
                        else {
                            group.animate({
                                opacity: 1
                            }, chart.options.drilldown.animation);
                            if (chart.drilldown) {
                                chart.drilldown.fadeInGroup(this.dataLabelsGroup);
                            }
                        }
                    }
                }
            });
        }
        /**
         * Perform drilldown on a point instance. The [drilldown](https://api.highcharts.com/highcharts/series.line.data.drilldown)
         * property must be set on the point options.
         *
         * To drill down multiple points in the same category, use
         * `Axis.drilldownCategory` instead.
         *
         * @requires  modules/drilldown
         *
         * @function Highcharts.Point#doDrilldown
         *
         * @sample {highcharts} highcharts/drilldown/programmatic
         *         Programmatic drilldown
         */
        Point.prototype.doDrilldown = function () {
            this.runDrilldown();
        };
        Point.prototype.runDrilldown = function (holdRedraw, category, originalEvent) {
            const series = this.series, chart = series.chart, drilldown = chart.options.drilldown;
            let i = (drilldown.series || []).length, seriesOptions;
            if (!chart.ddDupes) {
                chart.ddDupes = [];
            }
            while (i-- && !seriesOptions) {
                if (drilldown.series[i].id === this.drilldown &&
                    chart.ddDupes.indexOf(this.drilldown) === -1) {
                    seriesOptions = drilldown.series[i];
                    chart.ddDupes.push(this.drilldown);
                }
            }
            // Fire the event. If seriesOptions is undefined, the implementer can check
            // for  seriesOptions, and call addSeriesAsDrilldown async if necessary.
            fireEvent(chart, 'drilldown', {
                point: this,
                seriesOptions: seriesOptions,
                category: category,
                originalEvent: originalEvent,
                points: (typeof category !== 'undefined' &&
                    this.series.xAxis.getDDPoints(category).slice(0))
            }, function (e) {
                const chart = e.point.series && e.point.series.chart, seriesOptions = e.seriesOptions;
                if (chart && seriesOptions) {
                    if (holdRedraw) {
                        chart.addSingleSeriesAsDrilldown(e.point, seriesOptions);
                    }
                    else {
                        chart.addSeriesAsDrilldown(e.point, seriesOptions);
                    }
                }
            });
        };
        /**
         * Drill down to a given category. This is the same as clicking on an axis
         * label. If multiple series with drilldown are present, all will drill down to
         * the given category.
         *
         * See also `Point.doDrilldown` for drilling down on a single point instance.
         *
         * @function Highcharts.Axis#drilldownCategory
         *
         * @sample {highcharts} highcharts/drilldown/programmatic
         *         Programmatic drilldown
         *
         * @param {number} x
         *        The index of the category
         * @param {global.MouseEvent} [originalEvent]
         *        The original event, used internally.
         */
        Axis.prototype.drilldownCategory = function (x, originalEvent) {
            this.getDDPoints(x).forEach(function (point) {
                if (point &&
                    point.series &&
                    point.series.visible &&
                    point.runDrilldown) { // #3197
                    point.runDrilldown(true, x, originalEvent);
                }
            });
            this.chart.applyDrilldown();
        };
        /**
         * Return drillable points for this specific X value.
         *
         * @private
         * @function Highcharts.Axis#getDDPoints
         * @param {number} x
         *        Tick position
         * @return {Array<(false|Highcharts.Point)>}
         *         Drillable points
         */
        Axis.prototype.getDDPoints = function (x) {
            return (this.ddPoints && this.ddPoints[x] || []);
        };
        /**
         * Make a tick label drillable, or remove drilling on update.
         *
         * @private
         * @function Highcharts.Axis#drillable
         */
        Tick.prototype.drillable = function () {
            const pos = this.pos, label = this.label, axis = this.axis, isDrillable = axis.coll === 'xAxis' && axis.getDDPoints, ddPointsX = isDrillable && axis.getDDPoints(pos), styledMode = axis.chart.styledMode;
            if (isDrillable) {
                if (label && ddPointsX && ddPointsX.length) {
                    label.drillable = true;
                    if (!label.basicStyles && !styledMode) {
                        label.basicStyles = merge(label.styles);
                    }
                    label.addClass('highcharts-drilldown-axis-label');
                    // #12656 - avoid duplicate of attach event
                    if (label.removeOnDrillableClick) {
                        removeEvent(label.element, 'click');
                    }
                    label.removeOnDrillableClick = addEvent(label.element, 'click', function (e) {
                        e.preventDefault();
                        axis.drilldownCategory(pos, e);
                    });
                    if (!styledMode) {
                        label.css(axis.chart.options.drilldown.activeAxisLabelStyle);
                    }
                }
                else if (label && label.drillable && label.removeOnDrillableClick) {
                    if (!styledMode) {
                        label.styles = {}; // reset for full overwrite of styles
                        label.element.removeAttribute('style'); // #17933
                        label.css(label.basicStyles);
                    }
                    label.removeOnDrillableClick(); // #3806
                    label.removeClass('highcharts-drilldown-axis-label');
                }
            }
        };
        // On initialization of each point, identify its label and make it clickable.
        // Also, provide a list of points associated to that label.
        addEvent(Point, 'afterInit', function () {
            const point = this;
            if (point.drilldown && !point.unbindDrilldownClick) {
                // Add the click event to the point
                point.unbindDrilldownClick = addEvent(point, 'click', handlePointClick);
            }
            return point;
        });
        addEvent(Point, 'update', function (e) {
            const point = this, options = e.options || {};
            if (options.drilldown && !point.unbindDrilldownClick) {
                // Add the click event to the point
                point.unbindDrilldownClick = addEvent(point, 'click', handlePointClick);
            }
            else if (!options.drilldown &&
                options.drilldown !== void 0 &&
                point.unbindDrilldownClick) {
                point.unbindDrilldownClick = point.unbindDrilldownClick();
            }
        });
        const handlePointClick = function (e) {
            const point = this, series = point.series;
            if (series.xAxis &&
                series.chart.options.drilldown.allowPointDrilldown ===
                    false) {
                // #5822, x changed
                series.xAxis.drilldownCategory(point.x, e);
            }
            else {
                point.runDrilldown(void 0, void 0, e);
            }
        };
        addEvent(Series, 'afterDrawDataLabels', function () {
            const css = this.chart.options.drilldown.activeDataLabelStyle, renderer = this.chart.renderer, styledMode = this.chart.styledMode;
            this.points.forEach(function (point) {
                const dataLabelsOptions = point.options.dataLabels, pointCSS = pick(point.dlOptions, dataLabelsOptions && dataLabelsOptions.style, {});
                if (point.drilldown && point.dataLabel) {
                    if (css.color === 'contrast' && !styledMode) {
                        pointCSS.color = renderer.getContrast(point.color || this.color);
                    }
                    if (dataLabelsOptions && dataLabelsOptions.color) {
                        pointCSS.color = dataLabelsOptions.color;
                    }
                    point.dataLabel
                        .addClass('highcharts-drilldown-data-label');
                    if (!styledMode) {
                        point.dataLabel
                            .css(css)
                            .css(pointCSS);
                    }
                }
            }, this);
        });
        const applyCursorCSS = function (element, cursor, addClass, styledMode) {
            element[addClass ? 'addClass' : 'removeClass']('highcharts-drilldown-point');
            if (!styledMode) {
                element.css({ cursor: cursor });
            }
        };
        // Mark the trackers with a pointer
        addEvent(Series, 'afterDrawTracker', function () {
            const styledMode = this.chart.styledMode;
            this.points.forEach(function (point) {
                if (point.drilldown && point.graphic) {
                    applyCursorCSS(point.graphic, 'pointer', true, styledMode);
                }
            });
        });
        addEvent(Point, 'afterSetState', function () {
            const styledMode = this.series.chart.styledMode;
            if (this.drilldown && this.series.halo && this.state === 'hover') {
                applyCursorCSS(this.series.halo, 'pointer', true, styledMode);
            }
            else if (this.series.halo) {
                applyCursorCSS(this.series.halo, 'auto', false, styledMode);
            }
        });
        addEvent(Chart, 'drillup', function () {
            if (this.resetZoomButton) {
                this.resetZoomButton = this.resetZoomButton.destroy();
            }
        });
        addEvent(Chart, 'drillupall', function () {
            if (this.resetZoomButton) {
                this.showResetZoom();
            }
        });

    });
    _registerModule(_modules, 'masters/modules/drilldown.src.js', [_modules['Core/Globals.js'], _modules['Extensions/Breadcrumbs/Breadcrumbs.js']], function (Highcharts, Breadcrumbs) {

        const G = Highcharts;
        G.Breadcrumbs = Breadcrumbs;
        Breadcrumbs.compose(G.Chart, G.defaultOptions);

    });
}));