/* *
 *
 *  Exporting module
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import AST from '../../Core/Renderer/HTML/AST.js';
import Chart from '../../Core/Chart/Chart.js';
import ChartNavigationComposition from '../../Core/Chart/ChartNavigationComposition.js';
import D from '../../Core/Defaults.js';
const { defaultOptions, setOptions } = D;
import ExportingDefaults from './ExportingDefaults.js';
import ExportingSymbols from './ExportingSymbols.js';
import Fullscreen from './Fullscreen.js';
import G from '../../Core/Globals.js';
const { doc, SVG_NS, win } = G;
import HU from '../../Core/HttpUtilities.js';
import U from '../../Core/Utilities.js';
const { addEvent, css, createElement, discardElement, extend, find, fireEvent, isObject, merge, objectEach, pick, removeEvent, uniqueKey } = U;
/* *
 *
 *  Composition
 *
 * */
var Exporting;
(function (Exporting) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    const composedMembers = [];
    // These CSS properties are not inlined. Remember camelCase.
    const inlineDenylist = [
        /-/,
        /^(clipPath|cssText|d|height|width)$/,
        /^font$/,
        /[lL]ogical(Width|Height)$/,
        /^parentRule$/,
        /perspective/,
        /TapHighlightColor/,
        /^transition/,
        /^length$/,
        /^[0-9]+$/ // #17538
    ];
    // These ones are translated to attributes rather than styles
    const inlineToAttributes = [
        'fill',
        'stroke',
        'strokeLinecap',
        'strokeLinejoin',
        'strokeWidth',
        'textAnchor',
        'x',
        'y'
    ];
    Exporting.inlineAllowlist = [];
    const unstyledElements = [
        'clipPath',
        'defs',
        'desc'
    ];
    /* *
     *
     *  Variables
     *
     * */
    let printingChart;
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Add the export button to the chart, with options.
     *
     * @private
     * @function Highcharts.Chart#addButton
     * @param {Highcharts.NavigationButtonOptions} options
     * @requires modules/exporting
     */
    function addButton(options) {
        const chart = this, renderer = chart.renderer, btnOptions = merge(chart.options.navigation.buttonOptions, options), onclick = btnOptions.onclick, menuItems = btnOptions.menuItems, symbolSize = btnOptions.symbolSize || 12;
        let symbol;
        if (!chart.btnCount) {
            chart.btnCount = 0;
        }
        // Keeps references to the button elements
        if (!chart.exportDivElements) {
            chart.exportDivElements = [];
            chart.exportSVGElements = [];
        }
        if (btnOptions.enabled === false || !btnOptions.theme) {
            return;
        }
        const attr = btnOptions.theme;
        let callback;
        if (!chart.styledMode) {
            attr.fill = pick(attr.fill, "#ffffff" /* Palette.backgroundColor */);
            attr.stroke = pick(attr.stroke, 'none');
        }
        if (onclick) {
            callback = function (e) {
                if (e) {
                    e.stopPropagation();
                }
                onclick.call(chart, e);
            };
        }
        else if (menuItems) {
            callback = function (e) {
                // consistent with onclick call (#3495)
                if (e) {
                    e.stopPropagation();
                }
                chart.contextMenu(button.menuClassName, menuItems, button.translateX, button.translateY, button.width, button.height, button);
                button.setState(2);
            };
        }
        if (btnOptions.text && btnOptions.symbol) {
            attr.paddingLeft = pick(attr.paddingLeft, 30);
        }
        else if (!btnOptions.text) {
            extend(attr, {
                width: btnOptions.width,
                height: btnOptions.height,
                padding: 0
            });
        }
        if (!chart.styledMode) {
            attr['stroke-linecap'] = 'round';
            attr.fill = pick(attr.fill, "#ffffff" /* Palette.backgroundColor */);
            attr.stroke = pick(attr.stroke, 'none');
        }
        const button = renderer
            .button(btnOptions.text, 0, 0, callback, attr, void 0, void 0, void 0, void 0, btnOptions.useHTML)
            .addClass(options.className)
            .attr({
            title: pick(chart.options.lang[btnOptions._titleKey || btnOptions.titleKey], '')
        });
        button.menuClassName = (options.menuClassName ||
            'highcharts-menu-' + chart.btnCount++);
        if (btnOptions.symbol) {
            symbol = renderer
                .symbol(btnOptions.symbol, btnOptions.symbolX - (symbolSize / 2), btnOptions.symbolY - (symbolSize / 2), symbolSize, symbolSize
            // If symbol is an image, scale it (#7957)
            , {
                width: symbolSize,
                height: symbolSize
            })
                .addClass('highcharts-button-symbol')
                .attr({
                zIndex: 1
            })
                .add(button);
            if (!chart.styledMode) {
                symbol.attr({
                    stroke: btnOptions.symbolStroke,
                    fill: btnOptions.symbolFill,
                    'stroke-width': btnOptions.symbolStrokeWidth || 1
                });
            }
        }
        button
            .add(chart.exportingGroup)
            .align(extend(btnOptions, {
            width: button.width,
            x: pick(btnOptions.x, chart.buttonOffset) // #1654
        }), true, 'spacingBox');
        chart.buttonOffset += ((button.width + btnOptions.buttonSpacing) *
            (btnOptions.align === 'right' ? -1 : 1));
        chart.exportSVGElements.push(button, symbol);
    }
    /**
     * Clena up after printing a chart.
     *
     * @function Highcharts#afterPrint
     *
     * @private
     *
     * @param {Highcharts.Chart} chart
     *        Chart that was (or suppose to be) printed
     *
     * @emits Highcharts.Chart#event:afterPrint
     */
    function afterPrint() {
        const chart = this;
        if (!chart.printReverseInfo) {
            return void 0;
        }
        const { childNodes, origDisplay, resetParams } = chart.printReverseInfo;
        // put the chart back in
        chart.moveContainers(chart.renderTo);
        // restore all body content
        [].forEach.call(childNodes, function (node, i) {
            if (node.nodeType === 1) {
                node.style.display = (origDisplay[i] || '');
            }
        });
        chart.isPrinting = false;
        // Reset printMaxWidth
        if (resetParams) {
            chart.setSize.apply(chart, resetParams);
        }
        delete chart.printReverseInfo;
        printingChart = void 0;
        fireEvent(chart, 'afterPrint');
    }
    /**
     * Prepare chart and document before printing a chart.
     *
     * @function Highcharts#beforePrint
     *
     * @private
     *
     *
     * @emits Highcharts.Chart#event:beforePrint
     */
    function beforePrint() {
        const chart = this, body = doc.body, printMaxWidth = chart.options.exporting.printMaxWidth, printReverseInfo = {
            childNodes: body.childNodes,
            origDisplay: [],
            resetParams: void 0
        };
        chart.isPrinting = true;
        chart.pointer.reset(null, 0);
        fireEvent(chart, 'beforePrint');
        // Handle printMaxWidth
        const handleMaxWidth = printMaxWidth &&
            chart.chartWidth > printMaxWidth;
        if (handleMaxWidth) {
            printReverseInfo.resetParams = [
                chart.options.chart.width,
                void 0,
                false
            ];
            chart.setSize(printMaxWidth, void 0, false);
        }
        // hide all body content
        [].forEach.call(printReverseInfo.childNodes, function (node, i) {
            if (node.nodeType === 1) {
                printReverseInfo.origDisplay[i] = node.style.display;
                node.style.display = 'none';
            }
        });
        // pull out the chart
        chart.moveContainers(body);
        // Storage details for undo action after printing
        chart.printReverseInfo = printReverseInfo;
    }
    /**
     * @private
     */
    function chartCallback(chart) {
        const composition = chart;
        composition.renderExporting();
        addEvent(chart, 'redraw', composition.renderExporting);
        // Destroy the export elements at chart destroy
        addEvent(chart, 'destroy', composition.destroyExport);
        // Uncomment this to see a button directly below the chart, for quick
        // testing of export
        /*
        let button, viewImage, viewSource;
        if (!chart.renderer.forExport) {
            viewImage = function () {
                let div = doc.createElement('div');
                div.innerHTML = chart.getSVGForExport();
                chart.renderTo.parentNode.appendChild(div);
            };

            viewSource = function () {
                let pre = doc.createElement('pre');
                pre.innerHTML = chart.getSVGForExport()
                    .replace(/</g, '\n&lt;')
                    .replace(/>/g, '&gt;');
                chart.renderTo.parentNode.appendChild(pre);
            };

            viewImage();

            // View SVG Image
            button = doc.createElement('button');
            button.innerHTML = 'View SVG Image';
            chart.renderTo.parentNode.appendChild(button);
            button.onclick = viewImage;

            // View SVG Source
            button = doc.createElement('button');
            button.innerHTML = 'View SVG Source';
            chart.renderTo.parentNode.appendChild(button);
            button.onclick = viewSource;
        }
        //*/
    }
    /**
     * @private
     */
    function compose(ChartClass, SVGRendererClass) {
        ExportingSymbols.compose(SVGRendererClass);
        Fullscreen.compose(ChartClass);
        if (U.pushUnique(composedMembers, ChartClass)) {
            const chartProto = ChartClass.prototype;
            chartProto.afterPrint = afterPrint;
            chartProto.exportChart = exportChart;
            chartProto.inlineStyles = inlineStyles;
            chartProto.print = print;
            chartProto.sanitizeSVG = sanitizeSVG;
            chartProto.getChartHTML = getChartHTML;
            chartProto.getSVG = getSVG;
            chartProto.getSVGForExport = getSVGForExport;
            chartProto.getFilename = getFilename;
            chartProto.moveContainers = moveContainers;
            chartProto.beforePrint = beforePrint;
            chartProto.contextMenu = contextMenu;
            chartProto.addButton = addButton;
            chartProto.destroyExport = destroyExport;
            chartProto.renderExporting = renderExporting;
            chartProto.callbacks.push(chartCallback);
            addEvent(ChartClass, 'init', onChartInit);
            if (G.isSafari) {
                G.win.matchMedia('print').addListener(function (mqlEvent) {
                    if (!printingChart) {
                        return void 0;
                    }
                    if (mqlEvent.matches) {
                        printingChart.beforePrint();
                    }
                    else {
                        printingChart.afterPrint();
                    }
                });
            }
        }
        if (U.pushUnique(composedMembers, setOptions)) {
            defaultOptions.exporting = merge(ExportingDefaults.exporting, defaultOptions.exporting);
            defaultOptions.lang = merge(ExportingDefaults.lang, defaultOptions.lang);
            // Buttons and menus are collected in a separate config option set
            // called 'navigation'. This can be extended later to add control
            // buttons like zoom and pan right click menus.
            defaultOptions.navigation = merge(ExportingDefaults.navigation, defaultOptions.navigation);
        }
    }
    Exporting.compose = compose;
    /**
     * Display a popup menu for choosing the export type.
     *
     * @private
     * @function Highcharts.Chart#contextMenu
     * @param {string} className
     *        An identifier for the menu.
     * @param {Array<string|Highcharts.ExportingMenuObject>} items
     *        A collection with text and onclicks for the items.
     * @param {number} x
     *        The x position of the opener button
     * @param {number} y
     *        The y position of the opener button
     * @param {number} width
     *        The width of the opener button
     * @param {number} height
     *        The height of the opener button
     * @requires modules/exporting
     */
    function contextMenu(className, items, x, y, width, height, button) {
        const chart = this, navOptions = chart.options.navigation, chartWidth = chart.chartWidth, chartHeight = chart.chartHeight, cacheName = 'cache-' + className, menuPadding = Math.max(width, height); // for mouse leave detection
        let innerMenu, menu = chart[cacheName];
        // create the menu only the first time
        if (!menu) {
            // create a HTML element above the SVG
            chart.exportContextMenu = chart[cacheName] = menu =
                createElement('div', {
                    className: className
                }, {
                    position: 'absolute',
                    zIndex: 1000,
                    padding: menuPadding + 'px',
                    pointerEvents: 'auto'
                }, chart.fixedDiv || chart.container);
            innerMenu = createElement('ul', { className: 'highcharts-menu' }, chart.styledMode ? {} : {
                listStyle: 'none',
                margin: 0,
                padding: 0
            }, menu);
            // Presentational CSS
            if (!chart.styledMode) {
                css(innerMenu, extend({
                    MozBoxShadow: '3px 3px 10px #888',
                    WebkitBoxShadow: '3px 3px 10px #888',
                    boxShadow: '3px 3px 10px #888'
                }, navOptions.menuStyle));
            }
            // hide on mouse out
            menu.hideMenu = function () {
                css(menu, { display: 'none' });
                if (button) {
                    button.setState(0);
                }
                chart.openMenu = false;
                // #10361, #9998
                css(chart.renderTo, { overflow: 'hidden' });
                css(chart.container, { overflow: 'hidden' });
                U.clearTimeout(menu.hideTimer);
                fireEvent(chart, 'exportMenuHidden');
            };
            // Hide the menu some time after mouse leave (#1357)
            chart.exportEvents.push(addEvent(menu, 'mouseleave', function () {
                menu.hideTimer = win.setTimeout(menu.hideMenu, 500);
            }), addEvent(menu, 'mouseenter', function () {
                U.clearTimeout(menu.hideTimer);
            }), 
            // Hide it on clicking or touching outside the menu (#2258,
            // #2335, #2407)
            addEvent(doc, 'mouseup', function (e) {
                if (!chart.pointer.inClass(e.target, className)) {
                    menu.hideMenu();
                }
            }), addEvent(menu, 'click', function () {
                if (chart.openMenu) {
                    menu.hideMenu();
                }
            }));
            // create the items
            items.forEach(function (item) {
                if (typeof item === 'string') {
                    item = chart.options.exporting
                        .menuItemDefinitions[item];
                }
                if (isObject(item, true)) {
                    let element;
                    if (item.separator) {
                        element = createElement('hr', void 0, void 0, innerMenu);
                    }
                    else {
                        // When chart initialized with the table, wrong button
                        // text displayed, #14352.
                        if (item.textKey === 'viewData' &&
                            chart.isDataTableVisible) {
                            item.textKey = 'hideData';
                        }
                        element = createElement('li', {
                            className: 'highcharts-menu-item',
                            onclick: function (e) {
                                if (e) { // IE7
                                    e.stopPropagation();
                                }
                                menu.hideMenu();
                                if (item.onclick) {
                                    item.onclick
                                        .apply(chart, arguments);
                                }
                            }
                        }, void 0, innerMenu);
                        AST.setElementHTML(element, item.text ||
                            chart.options.lang[item.textKey]);
                        if (!chart.styledMode) {
                            element.onmouseover = function () {
                                css(this, navOptions.menuItemHoverStyle);
                            };
                            element.onmouseout = function () {
                                css(this, navOptions.menuItemStyle);
                            };
                            css(element, extend({
                                cursor: 'pointer'
                            }, navOptions.menuItemStyle || {}));
                        }
                    }
                    // Keep references to menu divs to be able to destroy them
                    chart.exportDivElements.push(element);
                }
            });
            // Keep references to menu and innerMenu div to be able to destroy
            // them
            chart.exportDivElements.push(innerMenu, menu);
            chart.exportMenuWidth = menu.offsetWidth;
            chart.exportMenuHeight = menu.offsetHeight;
        }
        const menuStyle = { display: 'block' };
        // if outside right, right align it
        if (x + chart.exportMenuWidth > chartWidth) {
            menuStyle.right = (chartWidth - x - width - menuPadding) + 'px';
        }
        else {
            menuStyle.left = (x - menuPadding) + 'px';
        }
        // if outside bottom, bottom align it
        if (y + height + chart.exportMenuHeight > chartHeight &&
            button.alignOptions.verticalAlign !== 'top') {
            menuStyle.bottom = (chartHeight - y - menuPadding) + 'px';
        }
        else {
            menuStyle.top = (y + height - menuPadding) + 'px';
        }
        css(menu, menuStyle);
        // #10361, #9998
        css(chart.renderTo, { overflow: '' });
        css(chart.container, { overflow: '' });
        chart.openMenu = true;
        fireEvent(chart, 'exportMenuShown');
    }
    /**
     * Destroy the export buttons.
     * @private
     * @function Highcharts.Chart#destroyExport
     * @param {global.Event} [e]
     * @requires modules/exporting
     */
    function destroyExport(e) {
        const chart = e ? e.target : this, exportSVGElements = chart.exportSVGElements, exportDivElements = chart.exportDivElements, exportEvents = chart.exportEvents;
        let cacheName;
        // Destroy the extra buttons added
        if (exportSVGElements) {
            exportSVGElements.forEach((elem, i) => {
                // Destroy and null the svg elements
                if (elem) { // #1822
                    elem.onclick = elem.ontouchstart = null;
                    cacheName = 'cache-' + elem.menuClassName;
                    if (chart[cacheName]) {
                        delete chart[cacheName];
                    }
                    exportSVGElements[i] = elem.destroy();
                }
            });
            exportSVGElements.length = 0;
        }
        // Destroy the exporting group
        if (chart.exportingGroup) {
            chart.exportingGroup.destroy();
            delete chart.exportingGroup;
        }
        // Destroy the divs for the menu
        if (exportDivElements) {
            exportDivElements.forEach(function (elem, i) {
                if (elem) {
                    // Remove the event handler
                    U.clearTimeout(elem.hideTimer); // #5427
                    removeEvent(elem, 'mouseleave');
                    // Remove inline events
                    // (chart.exportDivElements as any)[i] =
                    exportDivElements[i] =
                        elem.onmouseout =
                            elem.onmouseover =
                                elem.ontouchstart =
                                    elem.onclick = null;
                    // Destroy the div by moving to garbage bin
                    discardElement(elem);
                }
            });
            exportDivElements.length = 0;
        }
        if (exportEvents) {
            exportEvents.forEach(function (unbind) {
                unbind();
            });
            exportEvents.length = 0;
        }
    }
    /**
     * Exporting module required. Submit an SVG version of the chart to a server
     * along with some parameters for conversion.
     *
     * @sample highcharts/members/chart-exportchart/
     *         Export with no options
     * @sample highcharts/members/chart-exportchart-filename/
     *         PDF type and custom filename
     * @sample highcharts/members/chart-exportchart-custom-background/
     *         Different chart background in export
     * @sample stock/members/chart-exportchart/
     *         Export with Highcharts Stock
     *
     * @function Highcharts.Chart#exportChart
     *
     * @param {Highcharts.ExportingOptions} exportingOptions
     *        Exporting options in addition to those defined in
     *        [exporting](https://api.highcharts.com/highcharts/exporting).
     *
     * @param {Highcharts.Options} chartOptions
     *        Additional chart options for the exported chart. For example a
     *        different background color can be added here, or `dataLabels` for
     *        export only.
     *
     * @requires modules/exporting
     */
    function exportChart(exportingOptions, chartOptions) {
        const svg = this.getSVGForExport(exportingOptions, chartOptions);
        // merge the options
        exportingOptions = merge(this.options.exporting, exportingOptions);
        // do the post
        HU.post(exportingOptions.url, {
            filename: exportingOptions.filename ?
                exportingOptions.filename.replace(/\//g, '-') :
                this.getFilename(),
            type: exportingOptions.type,
            width: exportingOptions.width,
            scale: exportingOptions.scale,
            svg: svg
        }, exportingOptions.formAttributes);
    }
    /**
     * Return the unfiltered innerHTML of the chart container. Used as hook for
     * plugins. In styled mode, it also takes care of inlining CSS style rules.
     *
     * @see Chart#getSVG
     *
     * @function Highcharts.Chart#getChartHTML
     *
     * @return {string}
     * The unfiltered SVG of the chart.
     *
     * @requires modules/exporting
     */
    function getChartHTML() {
        if (this.styledMode) {
            this.inlineStyles();
        }
        return this.container.innerHTML;
    }
    /**
     * Get the default file name used for exported charts. By default it creates
     * a file name based on the chart title.
     *
     * @function Highcharts.Chart#getFilename
     *
     * @return {string} A file name without extension.
     *
     * @requires modules/exporting
     */
    function getFilename() {
        const s = this.userOptions.title && this.userOptions.title.text;
        let filename = this.options.exporting.filename;
        if (filename) {
            return filename.replace(/\//g, '-');
        }
        if (typeof s === 'string') {
            filename = s
                .toLowerCase()
                .replace(/<\/?[^>]+(>|$)/g, '') // strip HTML tags
                .replace(/[\s_]+/g, '-')
                .replace(/[^a-z0-9\-]/g, '') // preserve only latin
                .replace(/^[\-]+/g, '') // dashes in the start
                .replace(/[\-]+/g, '-') // dashes in a row
                .substr(0, 24)
                .replace(/[\-]+$/g, ''); // dashes in the end;
        }
        if (!filename || filename.length < 5) {
            filename = 'chart';
        }
        return filename;
    }
    /**
     * Return an SVG representation of the chart.
     *
     * @sample highcharts/members/chart-getsvg/
     *         View the SVG from a button
     *
     * @function Highcharts.Chart#getSVG
     *
     * @param {Highcharts.Options} [chartOptions]
     *        Additional chart options for the generated SVG representation. For
     *        collections like `xAxis`, `yAxis` or `series`, the additional
     *        options is either merged in to the original item of the same
     *        `id`, or to the first item if a common id is not found.
     *
     * @return {string}
     *         The SVG representation of the rendered chart.
     *
     * @emits Highcharts.Chart#event:getSVG
     *
     * @requires modules/exporting
     */
    function getSVG(chartOptions) {
        const chart = this;
        let svg, seriesOptions, 
        // Copy the options and add extra options
        options = merge(chart.options, chartOptions);
        // Use userOptions to make the options chain in series right (#3881)
        options.plotOptions = merge(chart.userOptions.plotOptions, chartOptions && chartOptions.plotOptions);
        // ... and likewise with time, avoid that undefined time properties are
        // merged over legacy global time options
        options.time = merge(chart.userOptions.time, chartOptions && chartOptions.time);
        // create a sandbox where a new chart will be generated
        const sandbox = createElement('div', null, {
            position: 'absolute',
            top: '-9999em',
            width: chart.chartWidth + 'px',
            height: chart.chartHeight + 'px'
        }, doc.body);
        // get the source size
        const cssWidth = chart.renderTo.style.width, cssHeight = chart.renderTo.style.height, sourceWidth = options.exporting.sourceWidth ||
            options.chart.width ||
            (/px$/.test(cssWidth) && parseInt(cssWidth, 10)) ||
            (options.isGantt ? 800 : 600), sourceHeight = options.exporting.sourceHeight ||
            options.chart.height ||
            (/px$/.test(cssHeight) && parseInt(cssHeight, 10)) ||
            400;
        // override some options
        extend(options.chart, {
            animation: false,
            renderTo: sandbox,
            forExport: true,
            renderer: 'SVGRenderer',
            width: sourceWidth,
            height: sourceHeight
        });
        options.exporting.enabled = false; // hide buttons in print
        delete options.data; // #3004
        // prepare for replicating the chart
        options.series = [];
        chart.series.forEach(function (serie) {
            seriesOptions = merge(serie.userOptions, {
                animation: false,
                enableMouseTracking: false,
                showCheckbox: false,
                visible: serie.visible
            });
            // Used for the navigator series that has its own option set
            if (!seriesOptions.isInternal) {
                options.series.push(seriesOptions);
            }
        });
        const colls = {};
        chart.axes.forEach(function (axis) {
            // Assign an internal key to ensure a one-to-one mapping (#5924)
            if (!axis.userOptions.internalKey) { // #6444
                axis.userOptions.internalKey = uniqueKey();
            }
            if (!axis.options.isInternal) {
                if (!colls[axis.coll]) {
                    colls[axis.coll] = true;
                    options[axis.coll] = [];
                }
                options[axis.coll].push(merge(axis.userOptions, {
                    visible: axis.visible
                }));
            }
        });
        // Generate the chart copy
        const chartCopy = new chart.constructor(options, chart.callback);
        // Axis options and series options  (#2022, #3900, #5982)
        if (chartOptions) {
            ['xAxis', 'yAxis', 'series'].forEach(function (coll) {
                const collOptions = {};
                if (chartOptions[coll]) {
                    collOptions[coll] = chartOptions[coll];
                    chartCopy.update(collOptions);
                }
            });
        }
        // Reflect axis extremes in the export (#5924)
        chart.axes.forEach(function (axis) {
            const axisCopy = find(chartCopy.axes, function (copy) {
                return copy.options.internalKey ===
                    axis.userOptions.internalKey;
            }), extremes = axis.getExtremes(), userMin = extremes.userMin, userMax = extremes.userMax;
            if (axisCopy &&
                ((typeof userMin !== 'undefined' &&
                    userMin !== axisCopy.min) || (typeof userMax !== 'undefined' &&
                    userMax !== axisCopy.max))) {
                axisCopy.setExtremes(userMin, userMax, true, false);
            }
        });
        // Get the SVG from the container's innerHTML
        svg = chartCopy.getChartHTML();
        fireEvent(this, 'getSVG', { chartCopy: chartCopy });
        svg = chart.sanitizeSVG(svg, options);
        // free up memory
        options = null;
        chartCopy.destroy();
        discardElement(sandbox);
        return svg;
    }
    /**
     * @private
     * @function Highcharts.Chart#getSVGForExport
     */
    function getSVGForExport(options, chartOptions) {
        const chartExportingOptions = this.options.exporting;
        return this.getSVG(merge({ chart: { borderRadius: 0 } }, chartExportingOptions.chartOptions, chartOptions, {
            exporting: {
                sourceWidth: ((options && options.sourceWidth) ||
                    chartExportingOptions.sourceWidth),
                sourceHeight: ((options && options.sourceHeight) ||
                    chartExportingOptions.sourceHeight)
            }
        }));
    }
    /**
     * Make hyphenated property names out of camelCase
     * @private
     * @param {string} prop
     * Property name in camelCase
     * @return {string}
     * Hyphenated property name
     */
    function hyphenate(prop) {
        return prop.replace(/([A-Z])/g, function (a, b) {
            return '-' + b.toLowerCase();
        });
    }
    /**
     * Analyze inherited styles from stylesheets and add them inline
     *
     * @private
     * @function Highcharts.Chart#inlineStyles
     *
     * @todo What are the border styles for text about? In general, text has a
     *       lot of properties.
     *
     * @todo Make it work with IE9 and IE10.
     *
     * @requires modules/exporting
     */
    function inlineStyles() {
        const denylist = inlineDenylist, allowlist = Exporting.inlineAllowlist, // For IE
        defaultStyles = {};
        let dummySVG;
        // Create an iframe where we read default styles without pollution from
        // this body
        const iframe = doc.createElement('iframe');
        css(iframe, {
            width: '1px',
            height: '1px',
            visibility: 'hidden'
        });
        doc.body.appendChild(iframe);
        const iframeDoc = (iframe.contentWindow && iframe.contentWindow.document);
        if (iframeDoc) {
            iframeDoc.body.appendChild(iframeDoc.createElementNS(SVG_NS, 'svg'));
        }
        /**
         * Call this on all elements and recurse to children
         * @private
         * @param {Highcharts.HTMLDOMElement} node
         *        Element child
             */
        function recurse(node) {
            const filteredStyles = {};
            let styles, parentStyles, dummy, denylisted, allowlisted, i;
            /**
             * Check computed styles and whether they are in the allow/denylist
             * for styles or atttributes.
             * @private
             * @param {string} val
             *        Style value
             * @param {string} prop
             *        Style property name
                     */
            function filterStyles(val, prop) {
                // Check against allowlist & denylist
                denylisted = allowlisted = false;
                if (allowlist.length) {
                    // Styled mode in IE has a allowlist instead. Exclude all
                    // props not in this list.
                    i = allowlist.length;
                    while (i-- && !allowlisted) {
                        allowlisted = allowlist[i].test(prop);
                    }
                    denylisted = !allowlisted;
                }
                // Explicitly remove empty transforms
                if (prop === 'transform' && val === 'none') {
                    denylisted = true;
                }
                i = denylist.length;
                while (i-- && !denylisted) {
                    denylisted = (denylist[i].test(prop) ||
                        typeof val === 'function');
                }
                if (!denylisted) {
                    // If parent node has the same style, it gets inherited, no
                    // need to inline it. Top-level props should be diffed
                    // against parent (#7687).
                    if ((parentStyles[prop] !== val ||
                        node.nodeName === 'svg') &&
                        defaultStyles[node.nodeName][prop] !== val) {
                        // Attributes
                        if (!inlineToAttributes ||
                            inlineToAttributes.indexOf(prop) !== -1) {
                            if (val) {
                                node.setAttribute(hyphenate(prop), val);
                            }
                            // Styles
                        }
                        else {
                            filteredStyles[prop] = val;
                        }
                    }
                }
            }
            if (iframeDoc &&
                node.nodeType === 1 &&
                unstyledElements.indexOf(node.nodeName) === -1) {
                styles = win.getComputedStyle(node, null);
                parentStyles = node.nodeName === 'svg' ?
                    {} :
                    win.getComputedStyle(node.parentNode, null);
                // Get default styles from the browser so that we don't have to
                // add these
                if (!defaultStyles[node.nodeName]) {
                    /*
                    if (!dummySVG) {
                        dummySVG = doc.createElementNS(H.SVG_NS, 'svg');
                        dummySVG.setAttribute('version', '1.1');
                        doc.body.appendChild(dummySVG);
                    }
                    */
                    dummySVG = iframeDoc.getElementsByTagName('svg')[0];
                    dummy = iframeDoc.createElementNS(node.namespaceURI, node.nodeName);
                    dummySVG.appendChild(dummy);
                    // Get the defaults into a standard object (simple merge
                    // won't do)
                    const s = win.getComputedStyle(dummy, null), defaults = {};
                    for (const key in s) {
                        if (typeof s[key] === 'string' &&
                            !/^[0-9]+$/.test(key)) {
                            defaults[key] = s[key];
                        }
                    }
                    defaultStyles[node.nodeName] = defaults;
                    // Remove default fill, otherwise text disappears when
                    // exported
                    if (node.nodeName === 'text') {
                        delete defaultStyles.text.fill;
                    }
                    dummySVG.removeChild(dummy);
                }
                // Loop through all styles and add them inline if they are ok
                for (const p in styles) {
                    if (
                    // Some browsers put lots of styles on the prototype...
                    G.isFirefox ||
                        G.isMS ||
                        G.isSafari || // #16902
                        // ... Chrome puts them on the instance
                        Object.hasOwnProperty.call(styles, p)) {
                        filterStyles(styles[p], p);
                    }
                }
                // Apply styles
                css(node, filteredStyles);
                // Set default stroke width (needed at least for IE)
                if (node.nodeName === 'svg') {
                    node.setAttribute('stroke-width', '1px');
                }
                if (node.nodeName === 'text') {
                    return;
                }
                // Recurse
                [].forEach.call(node.children || node.childNodes, recurse);
            }
        }
        /**
         * Remove the dummy objects used to get defaults
         * @private
         */
        function tearDown() {
            dummySVG.parentNode.removeChild(dummySVG);
            // Remove trash from DOM that stayed after each exporting
            iframe.parentNode.removeChild(iframe);
        }
        recurse(this.container.querySelector('svg'));
        tearDown();
    }
    /**
     * Move the chart container(s) to another div.
     *
     * @function Highcharts#moveContainers
     *
     * @private
     *
     * @param {Highcharts.HTMLDOMElement} moveTo
     *        Move target
     */
    function moveContainers(moveTo) {
        const chart = this;
        (chart.fixedDiv ? // When scrollablePlotArea is active (#9533)
            [chart.fixedDiv, chart.scrollingContainer] :
            [chart.container]).forEach(function (div) {
            moveTo.appendChild(div);
        });
    }
    /**
     * Add update methods to handle chart.update and chart.exporting.update and
     * chart.navigation.update. These must be added to the chart instance rather
     * than the Chart prototype in order to use the chart instance inside the
     * update function.
     * @private
     */
    function onChartInit() {
        const chart = this, 
        /**
         * @private
         * @param {"exporting"|"navigation"} prop
         *        Property name in option root
         * @param {Highcharts.ExportingOptions|Highcharts.NavigationOptions} options
         *        Options to update
         * @param {boolean} [redraw=true]
         *        Whether to redraw
                 */
        update = (prop, options, redraw) => {
            chart.isDirtyExporting = true;
            merge(true, chart.options[prop], options);
            if (pick(redraw, true)) {
                chart.redraw();
            }
        };
        chart.exporting = {
            update: function (options, redraw) {
                update('exporting', options, redraw);
            }
        };
        // Register update() method for navigation. Cannot be set the same way
        // as for exporting, because navigation options are shared with bindings
        // which has separate update() logic.
        ChartNavigationComposition
            .compose(chart).navigation
            .addUpdate((options, redraw) => {
            update('navigation', options, redraw);
        });
    }
    /**
     * Exporting module required. Clears away other elements in the page and
     * prints the chart as it is displayed. By default, when the exporting
     * module is enabled, a context button with a drop down menu in the upper
     * right corner accesses this function.
     *
     * @sample highcharts/members/chart-print/
     *         Print from a HTML button
     *
     * @function Highcharts.Chart#print
     *
     *
     * @emits Highcharts.Chart#event:beforePrint
     * @emits Highcharts.Chart#event:afterPrint
     *
     * @requires modules/exporting
     */
    function print() {
        const chart = this;
        if (chart.isPrinting) { // block the button while in printing mode
            return;
        }
        printingChart = chart;
        if (!G.isSafari) {
            chart.beforePrint();
        }
        // Give the browser time to draw WebGL content, an issue that randomly
        // appears (at least) in Chrome ~67 on the Mac (#8708).
        setTimeout(() => {
            win.focus(); // #1510
            win.print();
            // allow the browser to prepare before reverting
            if (!G.isSafari) {
                setTimeout(() => {
                    chart.afterPrint();
                }, 1000);
            }
        }, 1);
    }
    /**
     * Add the buttons on chart load
     * @private
     * @function Highcharts.Chart#renderExporting
     * @requires modules/exporting
     */
    function renderExporting() {
        const chart = this, exportingOptions = chart.options.exporting, buttons = exportingOptions.buttons, isDirty = chart.isDirtyExporting || !chart.exportSVGElements;
        chart.buttonOffset = 0;
        if (chart.isDirtyExporting) {
            chart.destroyExport();
        }
        if (isDirty && exportingOptions.enabled !== false) {
            chart.exportEvents = [];
            chart.exportingGroup = chart.exportingGroup ||
                chart.renderer.g('exporting-group').attr({
                    zIndex: 3 // #4955, // #8392
                }).add();
            objectEach(buttons, function (button) {
                chart.addButton(button);
            });
            chart.isDirtyExporting = false;
        }
    }
    /**
     * Exporting module only. A collection of fixes on the produced SVG to
     * account for expando properties, browser bugs.
     * Returns a cleaned SVG.
     *
     * @private
     * @function Highcharts.Chart#sanitizeSVG
     * @param {string} svg
     *        SVG code to sanitize
     * @param {Highcharts.Options} options
     *        Chart options to apply
     * @return {string}
     *         Sanitized SVG code
     * @requires modules/exporting
     */
    function sanitizeSVG(svg, options) {
        const split = svg.indexOf('</svg>') + 6;
        let html = svg.substr(split);
        // Remove any HTML added to the container after the SVG (#894, #9087)
        svg = svg.substr(0, split);
        // Move HTML into a foreignObject
        if (options && options.exporting && options.exporting.allowHTML) {
            if (html) {
                html = '<foreignObject x="0" y="0" ' +
                    'width="' + options.chart.width + '" ' +
                    'height="' + options.chart.height + '">' +
                    '<body xmlns="http://www.w3.org/1999/xhtml">' +
                    // Some tags needs to be closed in xhtml (#13726)
                    html.replace(/(<(?:img|br).*?(?=\>))>/g, '$1 />') +
                    '</body>' +
                    '</foreignObject>';
                svg = svg.replace('</svg>', html + '</svg>');
            }
        }
        svg = svg
            .replace(/zIndex="[^"]+"/g, '')
            .replace(/symbolName="[^"]+"/g, '')
            .replace(/jQuery[0-9]+="[^"]+"/g, '')
            .replace(/url\(("|&quot;)(.*?)("|&quot;)\;?\)/g, 'url($2)')
            .replace(/url\([^#]+#/g, 'url(#')
            .replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ')
            .replace(/ (|NS[0-9]+\:)href=/g, ' xlink:href=') // #3567
            .replace(/\n/, ' ')
            // Batik doesn't support rgba fills and strokes (#3095)
            .replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, // eslint-disable-line max-len
        '$1="rgb($2)" $1-opacity="$3"')
            // Replace HTML entities, issue #347
            .replace(/&nbsp;/g, '\u00A0') // no-break space
            .replace(/&shy;/g, '\u00AD'); // soft hyphen
        return svg;
    }
})(Exporting || (Exporting = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Exporting;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Gets fired after a chart is printed through the context menu item or the
 * Chart.print method.
 *
 * @callback Highcharts.ExportingAfterPrintCallbackFunction
 *
 * @param {Highcharts.Chart} this
 *        The chart on which the event occured.
 *
 * @param {global.Event} event
 *        The event that occured.
 */
/**
 * Gets fired before a chart is printed through the context menu item or the
 * Chart.print method.
 *
 * @callback Highcharts.ExportingBeforePrintCallbackFunction
 *
 * @param {Highcharts.Chart} this
 *        The chart on which the event occured.
 *
 * @param {global.Event} event
 *        The event that occured.
 */
/**
 * Function to call if the offline-exporting module fails to export a chart on
 * the client side.
 *
 * @callback Highcharts.ExportingErrorCallbackFunction
 *
 * @param {Highcharts.ExportingOptions} options
 *        The exporting options.
 *
 * @param {global.Error} err
 *        The error from the module.
 */
/**
 * Definition for a menu item in the context menu.
 *
 * @interface Highcharts.ExportingMenuObject
 */ /**
* The text for the menu item.
*
* @name Highcharts.ExportingMenuObject#text
* @type {string|undefined}
*/ /**
* If internationalization is required, the key to a language string.
*
* @name Highcharts.ExportingMenuObject#textKey
* @type {string|undefined}
*/ /**
* The click handler for the menu item.
*
* @name Highcharts.ExportingMenuObject#onclick
* @type {Highcharts.EventCallbackFunction<Highcharts.Chart>|undefined}
*/ /**
* Indicates a separator line instead of an item.
*
* @name Highcharts.ExportingMenuObject#separator
* @type {boolean|undefined}
*/
/**
 * Possible MIME types for exporting.
 *
 * @typedef {"image/png"|"image/jpeg"|"application/pdf"|"image/svg+xml"} Highcharts.ExportingMimeTypeValue
 */
(''); // keeps doclets above in transpiled file
/* *
 *
 *  API Options
 *
 * */
/**
 * Fires after a chart is printed through the context menu item or the
 * `Chart.print` method.
 *
 * @sample highcharts/chart/events-beforeprint-afterprint/
 *         Rescale the chart to print
 *
 * @type      {Highcharts.ExportingAfterPrintCallbackFunction}
 * @since     4.1.0
 * @context   Highcharts.Chart
 * @requires  modules/exporting
 * @apioption chart.events.afterPrint
 */
/**
 * Fires before a chart is printed through the context menu item or
 * the `Chart.print` method.
 *
 * @sample highcharts/chart/events-beforeprint-afterprint/
 *         Rescale the chart to print
 *
 * @type      {Highcharts.ExportingBeforePrintCallbackFunction}
 * @since     4.1.0
 * @context   Highcharts.Chart
 * @requires  modules/exporting
 * @apioption chart.events.beforePrint
 */
(''); // keeps doclets above in transpiled file
