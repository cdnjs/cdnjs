/**
 * @license Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/offline-exporting
 * @requires highcharts
 * @requires highcharts/modules/exporting
 *
 * Client side exporting module
 *
 * (c) 2015-2024 Torstein Honsi / Oystein Moseng
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"], root["_Highcharts"]["AST"], root["_Highcharts"]["Chart"], root["_Highcharts"]["HttpUtilities"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/offline-exporting", ["highcharts/highcharts"], function (amd1) {return factory(amd1,amd1["AST"],amd1["Chart"],amd1["HttpUtilities"]);});
	else if(typeof exports === 'object')
		exports["highcharts/modules/offline-exporting"] = factory(root["_Highcharts"], root["_Highcharts"]["AST"], root["_Highcharts"]["Chart"], root["_Highcharts"]["HttpUtilities"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["AST"], root["Highcharts"]["Chart"], root["Highcharts"]["HttpUtilities"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__660__, __WEBPACK_EXTERNAL_MODULE__960__, __WEBPACK_EXTERNAL_MODULE__156__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 660:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__660__;

/***/ }),

/***/ 960:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__960__;

/***/ }),

/***/ 156:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__156__;

/***/ }),

/***/ 944:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__944__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ offline_exporting_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Extensions/DownloadURL.js
/* *
 *
 *  (c) 2015-2024 Oystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Mixin for downloading content in the browser
 *
 * */

/* *
 *
 *  Imports
 *
 * */

const { isSafari, win, win: { document: doc } } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Constants
 *
 * */
const domurl = win.URL || win.webkitURL || win;
/* *
 *
 *  Functions
 *
 * */
/**
 * Convert base64 dataURL to Blob if supported, otherwise returns undefined.
 * @private
 * @function Highcharts.dataURLtoBlob
 * @param {string} dataURL
 *        URL to convert
 * @return {string|undefined}
 *         Blob
 */
function dataURLtoBlob(dataURL) {
    const parts = dataURL
        .replace(/filename=.*;/, '')
        .match(/data:([^;]*)(;base64)?,([A-Z+\d\/]+)/i);
    if (parts &&
        parts.length > 3 &&
        (win.atob) &&
        win.ArrayBuffer &&
        win.Uint8Array &&
        win.Blob &&
        (domurl.createObjectURL)) {
        // Try to convert data URL to Blob
        const binStr = win.atob(parts[3]), buf = new win.ArrayBuffer(binStr.length), binary = new win.Uint8Array(buf);
        for (let i = 0; i < binary.length; ++i) {
            binary[i] = binStr.charCodeAt(i);
        }
        return domurl
            .createObjectURL(new win.Blob([binary], { 'type': parts[1] }));
    }
}
/**
 * Download a data URL in the browser. Can also take a blob as first param.
 *
 * @private
 * @function Highcharts.downloadURL
 * @param {string|global.URL} dataURL
 *        The dataURL/Blob to download
 * @param {string} filename
 *        The name of the resulting file (w/extension)
 * @return {void}
 */
function downloadURL(dataURL, filename) {
    const nav = win.navigator, a = doc.createElement('a');
    // IE specific blob implementation
    // Don't use for normal dataURLs
    if (typeof dataURL !== 'string' &&
        !(dataURL instanceof String) &&
        nav.msSaveOrOpenBlob) {
        nav.msSaveOrOpenBlob(dataURL, filename);
        return;
    }
    dataURL = '' + dataURL;
    if (nav.userAgent.length > 1000 /* RegexLimits.shortLimit */) {
        throw new Error('Input too long');
    }
    const // Some browsers have limitations for data URL lengths. Try to convert
    // to Blob or fall back. Edge always needs that blob.
    isOldEdgeBrowser = /Edge\/\d+/.test(nav.userAgent), 
    // Safari on iOS needs Blob in order to download PDF
    safariBlob = (isSafari &&
        typeof dataURL === 'string' &&
        dataURL.indexOf('data:application/pdf') === 0);
    if (safariBlob || isOldEdgeBrowser || dataURL.length > 2000000) {
        dataURL = dataURLtoBlob(dataURL) || '';
        if (!dataURL) {
            throw new Error('Failed to convert to blob');
        }
    }
    // Try HTML5 download attr if supported
    if (typeof a.download !== 'undefined') {
        a.href = dataURL;
        a.download = filename; // HTML5 download attribute
        doc.body.appendChild(a);
        a.click();
        doc.body.removeChild(a);
    }
    else {
        // No download attr, just opening data URI
        try {
            if (!win.open(dataURL, 'chart')) {
                throw new Error('Failed to open window');
            }
        }
        catch {
            // If window.open failed, try location.href
            win.location.href = dataURL;
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
const DownloadURL = {
    dataURLtoBlob,
    downloadURL
};
/* harmony default export */ const Extensions_DownloadURL = (DownloadURL);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","AST"],"commonjs":["highcharts","AST"],"commonjs2":["highcharts","AST"],"root":["Highcharts","AST"]}
var highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_ = __webpack_require__(660);
var highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default = /*#__PURE__*/__webpack_require__.n(highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Chart"],"commonjs":["highcharts","Chart"],"commonjs2":["highcharts","Chart"],"root":["Highcharts","Chart"]}
var highcharts_Chart_commonjs_highcharts_Chart_commonjs2_highcharts_Chart_root_Highcharts_Chart_ = __webpack_require__(960);
;// ./code/es-modules/Core/Chart/ChartNavigationComposition.js
/**
 *
 *  (c) 2010-2024 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Composition
 *
 * */
var ChartNavigationComposition;
(function (ChartNavigationComposition) {
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
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(chart) {
        if (!chart.navigation) {
            chart.navigation = new Additions(chart);
        }
        return chart;
    }
    ChartNavigationComposition.compose = compose;
    /* *
     *
     *  Class
     *
     * */
    /**
     * Initializes `chart.navigation` object which delegates `update()` methods
     * to all other common classes (used in exporting and navigationBindings).
     * @private
     */
    class Additions {
        /* *
         *
         *  Constructor
         *
         * */
        constructor(chart) {
            this.updates = [];
            this.chart = chart;
        }
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Registers an `update()` method in the `chart.navigation` object.
         *
         * @private
         * @param {UpdateFunction} updateFn
         * The `update()` method that will be called in `chart.update()`.
         */
        addUpdate(updateFn) {
            this.chart.navigation.updates.push(updateFn);
        }
        /**
         * @private
         */
        update(options, redraw) {
            this.updates.forEach((updateFn) => {
                updateFn.call(this.chart, options, redraw);
            });
        }
    }
    ChartNavigationComposition.Additions = Additions;
})(ChartNavigationComposition || (ChartNavigationComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Chart_ChartNavigationComposition = (ChartNavigationComposition);

;// ./code/es-modules/Extensions/Exporting/ExportingDefaults.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { isTouchDevice } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  API Options
 *
 * */
// Add the export related options
/**
 * Options for the exporting module. For an overview on the matter, see
 * [the docs](https://www.highcharts.com/docs/export-module/export-module-overview) and
 * read our [Fair Usage Policy](https://www.highcharts.com/docs/export-module/privacy-disclaimer-export).
 *
 * @requires     modules/exporting
 * @optionparent exporting
 */
const exporting = {
    /**
     * Experimental setting to allow HTML inside the chart (added through
     * the `useHTML` options), directly in the exported image. This allows
     * you to preserve complicated HTML structures like tables or bi-directional
     * text in exported charts.
     *
     * Disclaimer: The HTML is rendered in a `foreignObject` tag in the
     * generated SVG. The official export server is based on PhantomJS,
     * which supports this, but other SVG clients, like Batik, does not
     * support it. This also applies to downloaded SVG that you want to
     * open in a desktop client.
     *
     * @type      {boolean}
     * @default   false
     * @since     4.1.8
     * @apioption exporting.allowHTML
     */
    /**
     * Allows the end user to sort the data table by clicking on column headers.
     *
     * @since 10.3.3
     * @apioption exporting.allowTableSorting
     */
    allowTableSorting: true,
    /**
     * Allow exporting a chart retaining any user-applied CSS.
     *
     * Note that this is is default behavior in [styledMode](#chart.styledMode).
     *
     * @see [styledMode](#chart.styledMode)
     *
     * @sample {highcharts} highcharts/exporting/apply-stylesheets/
     *
     * @type      {boolean}
     * @default   false
     * @since 12.0.0
     * @apioption exporting.applyStyleSheets
     */
    /**
     * Additional chart options to be merged into the chart before exporting to
     * an image format. This does not apply to printing the chart via the export
     * menu.
     *
     * For example, a common use case is to add data labels to improve
     * readability of the exported chart, or to add a printer-friendly color
     * scheme to exported PDFs.
     *
     * @sample {highcharts} highcharts/exporting/chartoptions-data-labels/
     *         Added data labels
     * @sample {highstock} highcharts/exporting/chartoptions-data-labels/
     *         Added data labels
     *
     * @type      {Highcharts.Options}
     * @apioption exporting.chartOptions
     */
    /**
     * Whether to enable the exporting module. Disabling the module will
     * hide the context button, but API methods will still be available.
     *
     * @sample {highcharts} highcharts/exporting/enabled-false/
     *         Exporting module is loaded but disabled
     * @sample {highstock} highcharts/exporting/enabled-false/
     *         Exporting module is loaded but disabled
     *
     * @type      {boolean}
     * @default   true
     * @since     2.0
     * @apioption exporting.enabled
     */
    /**
     * Function to call if the offline-exporting module fails to export
     * a chart on the client side, and [fallbackToExportServer](
     * #exporting.fallbackToExportServer) is disabled. If left undefined, an
     * exception is thrown instead. Receives two parameters, the exporting
     * options, and the error from the module.
     *
     * @see [fallbackToExportServer](#exporting.fallbackToExportServer)
     *
     * @type      {Highcharts.ExportingErrorCallbackFunction}
     * @since     5.0.0
     * @requires  modules/exporting
     * @requires  modules/offline-exporting
     * @apioption exporting.error
     */
    /**
     * Whether or not to fall back to the export server if the offline-exporting
     * module is unable to export the chart on the client side. This happens for
     * certain browsers, and certain features (e.g.
     * [allowHTML](#exporting.allowHTML)), depending on the image type exporting
     * to. For very complex charts, it is possible that export can fail in
     * browsers that don't support Blob objects, due to data URL length limits.
     * It is recommended to define the [exporting.error](#exporting.error)
     * handler if disabling fallback, in order to notify users in case export
     * fails.
     *
     * @type      {boolean}
     * @default   true
     * @since     4.1.8
     * @requires  modules/exporting
     * @requires  modules/offline-exporting
     * @apioption exporting.fallbackToExportServer
     */
    /**
     * The filename, without extension, to use for the exported chart.
     *
     * @sample {highcharts} highcharts/exporting/filename/
     *         Custom file name
     * @sample {highstock} highcharts/exporting/filename/
     *         Custom file name
     *
     * @type      {string}
     * @default   chart
     * @since     2.0
     * @apioption exporting.filename
     */
    /**
     * Highcharts v11.2.0 and older. An object containing additional key value
     * data for the POST form that sends the SVG to the export server. For
     * example, a `target` can be set to make sure the generated image is
     * received in another frame, or a custom `enctype` or `encoding` can be
     * set.
     *
     * With Highcharts v11.3.0, the `fetch` API replaced the old HTML form. To
     * modify the request, now use [fetchOptions](#exporting.fetchOptions)
     * instead.
     *
     * @deprecated
     * @type      {Highcharts.HTMLAttributes}
     * @since     3.0.8
     * @apioption exporting.formAttributes
     */
    /**
     * Options for the fetch request used when sending the SVG to the export
     * server.
     *
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
     * for more information
     *
     * @type {Object}
     * @since 11.3.0
     * @apioption exporting.fetchOptions
     */
    /**
     * Path where Highcharts will look for export module dependencies to
     * load on demand if they don't already exist on `window`. Should currently
     * point to location of [CanVG](https://github.com/canvg/canvg) library,
     * [jsPDF](https://github.com/parallax/jsPDF) and
     * [svg2pdf.js](https://github.com/yWorks/svg2pdf.js), required for client
     * side export in certain browsers.
     *
     * @type      {string}
     * @default   https://code.highcharts.com/{version}/lib
     * @since     5.0.0
     * @apioption exporting.libURL
     */
    /**
     * Analogous to [sourceWidth](#exporting.sourceWidth).
     *
     * @type      {number}
     * @since     3.0
     * @apioption exporting.sourceHeight
     */
    /**
     * The width of the original chart when exported, unless an explicit
     * [chart.width](#chart.width) is set, or a pixel width is set on the
     * container. The width exported raster image is then multiplied by
     * [scale](#exporting.scale).
     *
     * @sample {highcharts} highcharts/exporting/sourcewidth/
     *         Source size demo
     * @sample {highstock} highcharts/exporting/sourcewidth/
     *         Source size demo
     * @sample {highmaps} maps/exporting/sourcewidth/
     *         Source size demo
     *
     * @type      {number}
     * @since     3.0
     * @apioption exporting.sourceWidth
     */
    /**
     * The pixel width of charts exported to PNG or JPG. As of Highcharts
     * 3.0, the default pixel width is a function of the [chart.width](
     * #chart.width) or [exporting.sourceWidth](#exporting.sourceWidth) and the
     * [exporting.scale](#exporting.scale).
     *
     * @sample {highcharts} highcharts/exporting/width/
     *         Export to 200px wide images
     * @sample {highstock} highcharts/exporting/width/
     *         Export to 200px wide images
     *
     * @type      {number}
     * @since     2.0
     * @apioption exporting.width
     */
    /**
     * Default MIME type for exporting if `chart.exportChart()` is called
     * without specifying a `type` option. Possible values are `image/png`,
     *  `image/jpeg`, `application/pdf` and `image/svg+xml`.
     *
     * @type  {Highcharts.ExportingMimeTypeValue}
     * @since 2.0
     */
    type: 'image/png',
    /**
     * The URL for the server module converting the SVG string to an image
     * format. By default this points to Highchart's free web service.
     *
     * @since 2.0
     */
    url: 'https://export-svg.highcharts.com/',
    /**
     * Settings for a custom font for the exported PDF, when using the
     * `offline-exporting` module. This is used for languages containing
     * non-ASCII characters, like Chinese, Russian, Japanese etc.
     *
     * As described in the [jsPDF
     * docs](https://github.com/parallax/jsPDF#use-of-unicode-characters--utf-8),
     * the 14 standard fonts in PDF are limited to the ASCII-codepage.
     * Therefore, in order to support other text in the exported PDF, one or
     * more TTF font files have to be passed on to the exporting module.
     *
     * See more in [the
     * docs](https://www.highcharts.com/docs/export-module/client-side-export).
     *
     * @sample {highcharts} highcharts/exporting/offline-download-pdffont/
     *         Download PDF in a language containing non-Latin characters.
     *
     * @since 10.0.0
     * @requires modules/offline-exporting
     */
    pdfFont: {
        /**
         * The TTF font file for normal `font-style`. If font variations like
         * `bold` or `italic` are not defined, the `normal` font will be used
         * for those too.
         *
         * @type string|undefined
         */
        normal: void 0,
        /**
         * The TTF font file for bold text.
         *
         * @type string|undefined
         */
        bold: void 0,
        /**
         * The TTF font file for bold and italic text.
         *
         * @type string|undefined
         */
        bolditalic: void 0,
        /**
         * The TTF font file for italic text.
         *
         * @type string|undefined
         */
        italic: void 0
    },
    /**
     * When printing the chart from the menu item in the burger menu, if
     * the on-screen chart exceeds this width, it is resized. After printing
     * or cancelled, it is restored. The default width makes the chart
     * fit into typical paper format. Note that this does not affect the
     * chart when printing the web page as a whole.
     *
     * @since 4.2.5
     */
    printMaxWidth: 780,
    /**
     * Defines the scale or zoom factor for the exported image compared
     * to the on-screen display. While for instance a 600px wide chart
     * may look good on a website, it will look bad in print. The default
     * scale of 2 makes this chart export to a 1200px PNG or JPG.
     *
     * @see [chart.width](#chart.width)
     * @see [exporting.sourceWidth](#exporting.sourceWidth)
     *
     * @sample {highcharts} highcharts/exporting/scale/
     *         Scale demonstrated
     * @sample {highstock} highcharts/exporting/scale/
     *         Scale demonstrated
     * @sample {highmaps} maps/exporting/scale/
     *         Scale demonstrated
     *
     * @since 3.0
     */
    scale: 2,
    /**
     * Options for the export related buttons, print and export. In addition
     * to the default buttons listed here, custom buttons can be added.
     * See [navigation.buttonOptions](#navigation.buttonOptions) for general
     * options.
     *
     * @type     {Highcharts.Dictionary<*>}
     * @requires modules/exporting
     */
    buttons: {
        /**
         * Options for the export button.
         *
         * In styled mode, export button styles can be applied with the
         * `.highcharts-contextbutton` class.
         *
         * @declare  Highcharts.ExportingButtonsOptionsObject
         * @extends  navigation.buttonOptions
         * @requires modules/exporting
         */
        contextButton: {
            /**
             * A click handler callback to use on the button directly instead of
             * the popup menu.
             *
             * @sample highcharts/exporting/buttons-contextbutton-onclick/
             *         Skip the menu and export the chart directly
             *
             * @type      {Function}
             * @since     2.0
             * @apioption exporting.buttons.contextButton.onclick
             */
            /**
             * See [navigation.buttonOptions.symbolFill](
             * #navigation.buttonOptions.symbolFill).
             *
             * @type      {Highcharts.ColorString}
             * @default   #666666
             * @since     2.0
             * @apioption exporting.buttons.contextButton.symbolFill
             */
            /**
             * The horizontal position of the button relative to the `align`
             * option.
             *
             * @type      {number}
             * @default   -10
             * @since     2.0
             * @apioption exporting.buttons.contextButton.x
             */
            /**
             * The class name of the context button.
             */
            className: 'highcharts-contextbutton',
            /**
             * The class name of the menu appearing from the button.
             */
            menuClassName: 'highcharts-contextmenu',
            /**
             * The symbol for the button. Points to a definition function in
             * the `Highcharts.Renderer.symbols` collection. The default
             * `menu` function is part of the exporting module. Possible
             * values are "circle", "square", "diamond", "triangle",
             * "triangle-down", "menu", "menuball" or custom shape.
             *
             * @sample highcharts/exporting/buttons-contextbutton-symbol/
             *         Use a circle for symbol
             * @sample highcharts/exporting/buttons-contextbutton-symbol-custom/
             *         Custom shape as symbol
             *
             * @type  {Highcharts.SymbolKeyValue|"menu"|"menuball"|string}
             * @since 2.0
             */
            symbol: 'menu',
            /**
             * The key to a [lang](#lang) option setting that is used for the
             * button's title tooltip. When the key is `contextButtonTitle`, it
             * refers to [lang.contextButtonTitle](#lang.contextButtonTitle)
             * that defaults to "Chart context menu".
             *
             * @since 6.1.4
             */
            titleKey: 'contextButtonTitle',
            /**
             * A collection of strings pointing to config options for the menu
             * items. The config options are defined in the
             * `menuItemDefinitions` option.
             *
             * By default, there is the "View in full screen" and "Print" menu
             * items, plus one menu item for each of the available export types.
             *
             * @sample {highcharts} highcharts/exporting/menuitemdefinitions/
             *         Menu item definitions
             * @sample {highstock} highcharts/exporting/menuitemdefinitions/
             *         Menu item definitions
             * @sample {highmaps} highcharts/exporting/menuitemdefinitions/
             *         Menu item definitions
             *
             * @type    {Array<string>}
             * @default ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadSVG"]
             * @since   2.0
             */
            menuItems: [
                'viewFullscreen',
                'printChart',
                'separator',
                'downloadPNG',
                'downloadJPEG',
                'downloadSVG'
            ],
            y: -5
        }
    },
    /**
     * An object consisting of definitions for the menu items in the context
     * menu. Each key value pair has a `key` that is referenced in the
     * [menuItems](#exporting.buttons.contextButton.menuItems) setting,
     * and a `value`, which is an object with the following properties:
     *
     * - **onclick:** The click handler for the menu item
     *
     * - **text:** The text for the menu item
     *
     * - **textKey:** If internationalization is required, the key to a language
     *   string
     *
     * Custom text for the "exitFullScreen" can be set only in lang options
     * (it is not a separate button).
     *
     * @sample {highcharts} highcharts/exporting/menuitemdefinitions/
     *         Menu item definitions
     * @sample {highstock} highcharts/exporting/menuitemdefinitions/
     *         Menu item definitions
     * @sample {highmaps} highcharts/exporting/menuitemdefinitions/
     *         Menu item definitions
     *
     *
     * @type    {Highcharts.Dictionary<Highcharts.ExportingMenuObject>}
     * @default {"viewFullscreen": {}, "printChart": {}, "separator": {}, "downloadPNG": {}, "downloadJPEG": {}, "downloadPDF": {}, "downloadSVG": {}}
     * @since   5.0.13
     */
    menuItemDefinitions: {
        /**
         * @ignore
         */
        viewFullscreen: {
            textKey: 'viewFullscreen',
            onclick: function () {
                if (this.fullscreen) {
                    this.fullscreen.toggle();
                }
            }
        },
        /**
         * @ignore
         */
        printChart: {
            textKey: 'printChart',
            onclick: function () {
                this.print();
            }
        },
        /**
         * @ignore
         */
        separator: {
            separator: true
        },
        /**
         * @ignore
         */
        downloadPNG: {
            textKey: 'downloadPNG',
            onclick: function () {
                this.exportChart();
            }
        },
        /**
         * @ignore
         */
        downloadJPEG: {
            textKey: 'downloadJPEG',
            onclick: function () {
                this.exportChart({
                    type: 'image/jpeg'
                });
            }
        },
        /**
         * @ignore
         */
        downloadPDF: {
            textKey: 'downloadPDF',
            onclick: function () {
                this.exportChart({
                    type: 'application/pdf'
                });
            }
        },
        /**
         * @ignore
         */
        downloadSVG: {
            textKey: 'downloadSVG',
            onclick: function () {
                this.exportChart({
                    type: 'image/svg+xml'
                });
            }
        }
    }
};
// Add language
/**
 * @optionparent lang
 */
const lang = {
    /**
     * Exporting module only. The text for the menu item to view the chart
     * in full screen.
     *
     * @since 8.0.1
     */
    viewFullscreen: 'View in full screen',
    /**
     * Exporting module only. The text for the menu item to exit the chart
     * from full screen.
     *
     * @since 8.0.1
     */
    exitFullscreen: 'Exit from full screen',
    /**
     * Exporting module only. The text for the menu item to print the chart.
     *
     * @since    3.0.1
     * @requires modules/exporting
     */
    printChart: 'Print chart',
    /**
     * Exporting module only. The text for the PNG download menu item.
     *
     * @since    2.0
     * @requires modules/exporting
     */
    downloadPNG: 'Download PNG image',
    /**
     * Exporting module only. The text for the JPEG download menu item.
     *
     * @since    2.0
     * @requires modules/exporting
     */
    downloadJPEG: 'Download JPEG image',
    /**
     * Exporting module only. The text for the PDF download menu item.
     *
     * @since    2.0
     * @requires modules/exporting
     */
    downloadPDF: 'Download PDF document',
    /**
     * Exporting module only. The text for the SVG download menu item.
     *
     * @since    2.0
     * @requires modules/exporting
     */
    downloadSVG: 'Download SVG vector image',
    /**
     * Exporting module menu. The tooltip title for the context menu holding
     * print and export menu items.
     *
     * @since    3.0
     * @requires modules/exporting
     */
    contextButtonTitle: 'Chart context menu'
};
/**
 * A collection of options for buttons and menus appearing in the exporting
 * module or in Stock Tools.
 *
 * @requires     modules/exporting
 * @optionparent navigation
 */
const navigation = {
    /**
     * A collection of options for buttons appearing in the exporting
     * module.
     *
     * In styled mode, the buttons are styled with the
     * `.highcharts-contextbutton` and `.highcharts-button-symbol` classes.
     *
     * @requires modules/exporting
     */
    buttonOptions: {
        /**
         * Whether to enable buttons.
         *
         * @sample highcharts/navigation/buttonoptions-enabled/
         *         Exporting module loaded but buttons disabled
         *
         * @type      {boolean}
         * @default   true
         * @since     2.0
         * @apioption navigation.buttonOptions.enabled
         */
        /**
         * The pixel size of the symbol on the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        symbolSize: 14,
        /**
         * The x position of the center of the symbol inside the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        symbolX: 14.5,
        /**
         * The y position of the center of the symbol inside the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        symbolY: 13.5,
        /**
         * Alignment for the buttons.
         *
         * @sample highcharts/navigation/buttonoptions-align/
         *         Center aligned
         *
         * @type  {Highcharts.AlignValue}
         * @since 2.0
         */
        align: 'right',
        /**
         * The pixel spacing between buttons, and between the context button and
         * the title.
         *
         * @sample highcharts/title/widthadjust
         *         Adjust the spacing when using text button
         * @since 2.0
         */
        buttonSpacing: 5,
        /**
         * Pixel height of the buttons.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        height: 28,
        /**
         * A text string to add to the individual button.
         *
         * @sample highcharts/exporting/buttons-text/
         *         Full text button
         * @sample highcharts/exporting/buttons-text-usehtml/
         *         Icon using CSS font in text
         * @sample highcharts/exporting/buttons-text-symbol/
         *         Combined symbol and text
         *
         * @type      {string}
         * @default   null
         * @since     3.0
         * @apioption navigation.buttonOptions.text
         */
        /**
         * Whether to use HTML for rendering the button. HTML allows for things
         * like inline CSS or image-based icons.
         *
         * @sample highcharts/exporting/buttons-text-usehtml/
         *         Icon using CSS font in text
         *
         * @type      boolean
         * @default   false
         * @since 10.3.0
         * @apioption navigation.buttonOptions.useHTML
         */
        /**
         * The vertical offset of the button's position relative to its
         * `verticalAlign`.
         *
         * @sample highcharts/navigation/buttonoptions-verticalalign/
         *         Buttons at lower right
         *
         * @type      {number}
         * @default   0
         * @since     2.0
         * @apioption navigation.buttonOptions.y
         */
        /**
         * The vertical alignment of the buttons. Can be one of `"top"`,
         * `"middle"` or `"bottom"`.
         *
         * @sample highcharts/navigation/buttonoptions-verticalalign/
         *         Buttons at lower right
         *
         * @type  {Highcharts.VerticalAlignValue}
         * @since 2.0
         */
        verticalAlign: 'top',
        /**
         * The pixel width of the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        width: 28,
        /**
         * Fill color for the symbol within the button.
         *
         * @sample highcharts/navigation/buttonoptions-symbolfill/
         *         Blue symbol stroke for one of the buttons
         *
         * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @since 2.0
         */
        symbolFill: "#666666" /* Palette.neutralColor60 */,
        /**
         * The color of the symbol's stroke or line.
         *
         * @sample highcharts/navigation/buttonoptions-symbolstroke/
         *         Blue symbol stroke
         *
         * @type  {Highcharts.ColorString}
         * @since 2.0
         */
        symbolStroke: "#666666" /* Palette.neutralColor60 */,
        /**
         * The pixel stroke width of the symbol on the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        symbolStrokeWidth: 3,
        /**
         * A configuration object for the button theme. The object accepts
         * SVG properties like `stroke-width`, `stroke` and `fill`.
         * Tri-state button styles are supported by the `states.hover` and
         * `states.select` objects.
         *
         * @sample highcharts/navigation/buttonoptions-theme/
         *         Theming the buttons
         *
         * @requires modules/exporting
         *
         * @since 3.0
         */
        theme: {
            /**
             * The default fill exists only to capture hover events.
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            fill: "#ffffff" /* Palette.backgroundColor */,
            /**
             * Padding for the button.
             */
            padding: 5,
            /**
             * Default stroke for the buttons.
             *
             * @type      {Highcharts.ColorString}
             */
            stroke: 'none',
            /**
             * Default stroke linecap for the buttons.
             */
            'stroke-linecap': 'round'
        }
    },
    /**
     * CSS styles for the popup menu appearing by default when the export
     * icon is clicked. This menu is rendered in HTML.
     *
     * @see In styled mode, the menu is styled with the `.highcharts-menu`
     *      class.
     *
     * @sample highcharts/navigation/menustyle/
     *         Light gray menu background
     *
     * @type    {Highcharts.CSSObject}
     * @default {"background": "#ffffff", "borderRadius": "3px", "padding": "0.5em"}
     * @since   2.0
     */
    menuStyle: {
        /** @ignore-option */
        border: 'none',
        /** @ignore-option */
        borderRadius: '3px',
        /** @ignore-option */
        background: "#ffffff" /* Palette.backgroundColor */,
        /** @ignore-option */
        padding: '0.5em'
    },
    /**
     * CSS styles for the individual items within the popup menu appearing
     * by default when the export icon is clicked. The menu items are
     * rendered in HTML. Font size defaults to `11px` on desktop and `14px`
     * on touch devices.
     *
     * @see In styled mode, the menu items are styled with the
     *      `.highcharts-menu-item` class.
     *
     * @sample {highcharts} highcharts/navigation/menuitemstyle/
     *         Add a grey stripe to the left
     *
     * @type    {Highcharts.CSSObject}
     * @default {"padding": "0.5em", "color": "#333333", "background": "none", "borderRadius": "3px", "fontSize": "0.8em", "transition": "background 250ms, color 250ms"}
     * @since   2.0
     */
    menuItemStyle: {
        /** @ignore-option */
        background: 'none',
        /** @ignore-option */
        borderRadius: '3px',
        /** @ignore-option */
        color: "#333333" /* Palette.neutralColor80 */,
        /** @ignore-option */
        padding: '0.5em',
        /** @ignore-option */
        fontSize: isTouchDevice ? '0.9em' : '0.8em',
        /** @ignore-option */
        transition: 'background 250ms, color 250ms'
    },
    /**
     * CSS styles for the hover state of the individual items within the
     * popup menu appearing by default when the export icon is clicked. The
     * menu items are rendered in HTML.
     *
     * @see In styled mode, the menu items are styled with the
     *      `.highcharts-menu-item` class.
     *
     * @sample highcharts/navigation/menuitemhoverstyle/
     *         Bold text on hover
     *
     * @type    {Highcharts.CSSObject}
     * @default {"background": "#f2f2f2" }
     * @since   2.0
     */
    menuItemHoverStyle: {
        /** @ignore-option */
        background: "#f2f2f2" /* Palette.neutralColor5 */
    }
};
/* *
 *
 *  Default Export
 *
 * */
const ExportingDefaults = {
    exporting,
    lang,
    navigation
};
/* harmony default export */ const Exporting_ExportingDefaults = (ExportingDefaults);

;// ./code/es-modules/Extensions/Exporting/ExportingSymbols.js
/* *
 *
 *  Exporting module
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Composition
 *
 * */
var ExportingSymbols;
(function (ExportingSymbols) {
    /* *
     *
     *  Constants
     *
     * */
    const modifiedClasses = [];
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(SVGRendererClass) {
        if (modifiedClasses.indexOf(SVGRendererClass) === -1) {
            modifiedClasses.push(SVGRendererClass);
            const symbols = SVGRendererClass.prototype.symbols;
            symbols.menu = menu;
            symbols.menuball = menuball.bind(symbols);
        }
    }
    ExportingSymbols.compose = compose;
    /**
     * @private
     */
    function menu(x, y, width, height) {
        const arr = [
            ['M', x, y + 2.5],
            ['L', x + width, y + 2.5],
            ['M', x, y + height / 2 + 0.5],
            ['L', x + width, y + height / 2 + 0.5],
            ['M', x, y + height - 1.5],
            ['L', x + width, y + height - 1.5]
        ];
        return arr;
    }
    /**
     * @private
     */
    function menuball(x, y, width, height) {
        const h = (height / 3) - 2;
        let path = [];
        path = path.concat(this.circle(width - h, y, h, h), this.circle(width - h, y + h + 4, h, h), this.circle(width - h, y + 2 * (h + 4), h, h));
        return path;
    }
})(ExportingSymbols || (ExportingSymbols = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Exporting_ExportingSymbols = (ExportingSymbols);

;// ./code/es-modules/Extensions/Exporting/Fullscreen.js
/* *
 *
 *  (c) 2009-2024 Rafal Sebestjanski
 *
 *  Full screen for Highcharts
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
/**
 * The module allows user to enable display chart in full screen mode.
 * Used in StockTools too.
 * Based on default solutions in browsers.
 */



const { composed } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { addEvent, fireEvent, pushUnique } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function onChartBeforeRender() {
    /**
     * @name Highcharts.Chart#fullscreen
     * @type {Highcharts.Fullscreen}
     * @requires modules/full-screen
     */
    this.fullscreen = new Fullscreen(this);
}
/* *
 *
 *  Class
 *
 * */
/**
 * Handles displaying chart's container in the fullscreen mode.
 *
 * **Note**: Fullscreen is not supported on iPhone due to iOS limitations.
 *
 * @class
 * @name Highcharts.Fullscreen
 *
 * @requires modules/exporting
 */
class Fullscreen {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Prepares the chart class to support fullscreen.
     *
     * @param {typeof_Highcharts.Chart} ChartClass
     * The chart class to decorate with fullscreen support.
     */
    static compose(ChartClass) {
        if (pushUnique(composed, 'Fullscreen')) {
            // Initialize fullscreen
            addEvent(ChartClass, 'beforeRender', onChartBeforeRender);
        }
    }
    /* *
     *
     *  Constructors
     *
     * */
    constructor(chart) {
        /**
         * Chart managed by the fullscreen controller.
         * @name Highcharts.Fullscreen#chart
         * @type {Highcharts.Chart}
         */
        this.chart = chart;
        /**
         * The flag is set to `true` when the chart is displayed in
         * the fullscreen mode.
         *
         * @name Highcharts.Fullscreen#isOpen
         * @type {boolean|undefined}
         * @since 8.0.1
         */
        this.isOpen = false;
        const container = chart.renderTo;
        // Hold event and methods available only for a current browser.
        if (!this.browserProps) {
            if (typeof container.requestFullscreen === 'function') {
                this.browserProps = {
                    fullscreenChange: 'fullscreenchange',
                    requestFullscreen: 'requestFullscreen',
                    exitFullscreen: 'exitFullscreen'
                };
            }
            else if (container.mozRequestFullScreen) {
                this.browserProps = {
                    fullscreenChange: 'mozfullscreenchange',
                    requestFullscreen: 'mozRequestFullScreen',
                    exitFullscreen: 'mozCancelFullScreen'
                };
            }
            else if (container.webkitRequestFullScreen) {
                this.browserProps = {
                    fullscreenChange: 'webkitfullscreenchange',
                    requestFullscreen: 'webkitRequestFullScreen',
                    exitFullscreen: 'webkitExitFullscreen'
                };
            }
            else if (container.msRequestFullscreen) {
                this.browserProps = {
                    fullscreenChange: 'MSFullscreenChange',
                    requestFullscreen: 'msRequestFullscreen',
                    exitFullscreen: 'msExitFullscreen'
                };
            }
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Stops displaying the chart in fullscreen mode.
     * Exporting module required.
     *
     * @since       8.0.1
     *
     * @function    Highcharts.Fullscreen#close
     * @return      {void}
     * @requires    modules/full-screen
     */
    close() {
        const fullscreen = this, chart = fullscreen.chart, optionsChart = chart.options.chart;
        fireEvent(chart, 'fullscreenClose', null, function () {
            // Don't fire exitFullscreen() when user exited
            // using 'Escape' button.
            if (fullscreen.isOpen &&
                fullscreen.browserProps &&
                chart.container.ownerDocument instanceof Document) {
                chart.container.ownerDocument[fullscreen.browserProps.exitFullscreen]();
            }
            // Unbind event as it's necessary only before exiting
            // from fullscreen.
            if (fullscreen.unbindFullscreenEvent) {
                fullscreen.unbindFullscreenEvent = fullscreen
                    .unbindFullscreenEvent();
            }
            chart.setSize(fullscreen.origWidth, fullscreen.origHeight, false);
            fullscreen.origWidth = void 0;
            fullscreen.origHeight = void 0;
            optionsChart.width = fullscreen.origWidthOption;
            optionsChart.height = fullscreen.origHeightOption;
            fullscreen.origWidthOption = void 0;
            fullscreen.origHeightOption = void 0;
            fullscreen.isOpen = false;
            fullscreen.setButtonText();
        });
    }
    /**
     * Displays the chart in fullscreen mode.
     * When fired customly by user before exporting context button is created,
     * button's text will not be replaced - it's on the user side.
     * Exporting module required.
     *
     * @since       8.0.1
     *
     * @function Highcharts.Fullscreen#open
     * @return      {void}
     * @requires    modules/full-screen
     */
    open() {
        const fullscreen = this, chart = fullscreen.chart, optionsChart = chart.options.chart;
        fireEvent(chart, 'fullscreenOpen', null, function () {
            if (optionsChart) {
                fullscreen.origWidthOption = optionsChart.width;
                fullscreen.origHeightOption = optionsChart.height;
            }
            fullscreen.origWidth = chart.chartWidth;
            fullscreen.origHeight = chart.chartHeight;
            // Handle exitFullscreen() method when user clicks 'Escape' button.
            if (fullscreen.browserProps) {
                const unbindChange = addEvent(chart.container.ownerDocument, // Chart's document
                fullscreen.browserProps.fullscreenChange, function () {
                    // Handle lack of async of browser's
                    // fullScreenChange event.
                    if (fullscreen.isOpen) {
                        fullscreen.isOpen = false;
                        fullscreen.close();
                    }
                    else {
                        chart.setSize(null, null, false);
                        fullscreen.isOpen = true;
                        fullscreen.setButtonText();
                    }
                });
                const unbindDestroy = addEvent(chart, 'destroy', unbindChange);
                fullscreen.unbindFullscreenEvent = () => {
                    unbindChange();
                    unbindDestroy();
                };
                const promise = chart.renderTo[fullscreen.browserProps.requestFullscreen]();
                if (promise) {
                    promise['catch'](function () {
                        alert(// eslint-disable-line no-alert
                        'Full screen is not supported inside a frame.');
                    });
                }
            }
        });
    }
    /**
     * Replaces the exporting context button's text when toogling the
     * fullscreen mode.
     *
     * @private
     *
     * @since 8.0.1
     *
     * @requires modules/full-screen
     */
    setButtonText() {
        const chart = this.chart, exportDivElements = chart.exportDivElements, exportingOptions = chart.options.exporting, menuItems = (exportingOptions &&
            exportingOptions.buttons &&
            exportingOptions.buttons.contextButton.menuItems), lang = chart.options.lang;
        if (exportingOptions &&
            exportingOptions.menuItemDefinitions &&
            lang &&
            lang.exitFullscreen &&
            lang.viewFullscreen &&
            menuItems &&
            exportDivElements) {
            const exportDivElement = exportDivElements[menuItems.indexOf('viewFullscreen')];
            if (exportDivElement) {
                highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default().setElementHTML(exportDivElement, !this.isOpen ?
                    (exportingOptions.menuItemDefinitions.viewFullscreen
                        .text ||
                        lang.viewFullscreen) : lang.exitFullscreen);
            }
        }
    }
    /**
     * Toggles displaying the chart in fullscreen mode.
     * By default, when the exporting module is enabled, a context button with
     * a drop down menu in the upper right corner accesses this function.
     * Exporting module required.
     *
     * @since 8.0.1
     *
     * @sample      highcharts/members/chart-togglefullscreen/
     *              Toggle fullscreen mode from a HTML button
     *
     * @function Highcharts.Fullscreen#toggle
     * @requires    modules/full-screen
     */
    toggle() {
        const fullscreen = this;
        if (!fullscreen.isOpen) {
            fullscreen.open();
        }
        else {
            fullscreen.close();
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Exporting_Fullscreen = (Fullscreen);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Gets fired when closing the fullscreen
 *
 * @callback Highcharts.FullScreenfullscreenCloseCallbackFunction
 *
 * @param {Highcharts.Chart} chart
 *        The chart on which the event occurred.
 *
 * @param {global.Event} event
 *        The event that occurred.
 */
/**
 * Gets fired when opening the fullscreen
 *
 * @callback Highcharts.FullScreenfullscreenOpenCallbackFunction
 *
 * @param {Highcharts.Chart} chart
 *        The chart on which the event occurred.
 *
 * @param {global.Event} event
 *        The event that occurred.
 */
(''); // Keeps doclets above separated from following code
/* *
 *
 *  API Options
 *
 * */
/**
 * Fires when a fullscreen is closed through the context menu item,
 * or a fullscreen is closed on the `Escape` button click,
 * or the `Chart.fullscreen.close` method.
 *
 * @sample highcharts/chart/events-fullscreen
 *         Title size change on fullscreen open
 *
 * @type      {Highcharts.FullScreenfullscreenCloseCallbackFunction}
 * @since     10.1.0
 * @context   Highcharts.Chart
 * @requires  modules/full-screen
 * @apioption chart.events.fullscreenClose
 */
/**
 * Fires when a fullscreen is opened through the context menu item,
 * or the `Chart.fullscreen.open` method.
 *
 * @sample highcharts/chart/events-fullscreen
 *         Title size change on fullscreen open
 *
 * @type      {Highcharts.FullScreenfullscreenOpenCallbackFunction}
 * @since     10.1.0
 * @context   Highcharts.Chart
 * @requires  modules/full-screen
 * @apioption chart.events.fullscreenOpen
 */
(''); // Keeps doclets above in transpiled file

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","HttpUtilities"],"commonjs":["highcharts","HttpUtilities"],"commonjs2":["highcharts","HttpUtilities"],"root":["Highcharts","HttpUtilities"]}
var highcharts_HttpUtilities_commonjs_highcharts_HttpUtilities_commonjs2_highcharts_HttpUtilities_root_Highcharts_HttpUtilities_ = __webpack_require__(156);
var highcharts_HttpUtilities_commonjs_highcharts_HttpUtilities_commonjs2_highcharts_HttpUtilities_root_Highcharts_HttpUtilities_default = /*#__PURE__*/__webpack_require__.n(highcharts_HttpUtilities_commonjs_highcharts_HttpUtilities_commonjs2_highcharts_HttpUtilities_root_Highcharts_HttpUtilities_);
;// ./code/es-modules/Extensions/Exporting/Exporting.js
/* *
 *
 *  Exporting module
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { defaultOptions } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());




const { doc: Exporting_doc, SVG_NS, win: Exporting_win } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());


const { addEvent: Exporting_addEvent, css, createElement, discardElement, extend, find, fireEvent: Exporting_fireEvent, isObject, merge, objectEach, pick, removeEvent, splat, uniqueKey } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
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
    // These CSS properties are not inlined. Remember camelCase.
    const inlineDenylist = [
        /-/, // In Firefox, both hyphened and camelCased names are listed
        /^(clipPath|cssText|d|height|width)$/, // Full words
        /^font$/, // More specific props are set
        /[lL]ogical(Width|Height)$/,
        /^parentRule$/,
        /^(cssRules|ownerRules)$/, // #19516 read-only properties
        /perspective/,
        /TapHighlightColor/,
        /^transition/,
        /^length$/, // #7700
        /^\d+$/ // #17538
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
        const theme = chart.styledMode ? {} : btnOptions.theme;
        let callback;
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
                // Consistent with onclick call (#3495)
                if (e) {
                    e.stopPropagation();
                }
                chart.contextMenu(button.menuClassName, menuItems, button.translateX || 0, button.translateY || 0, button.width || 0, button.height || 0, button);
                button.setState(2);
            };
        }
        if (btnOptions.text && btnOptions.symbol) {
            theme.paddingLeft = pick(theme.paddingLeft, 30);
        }
        else if (!btnOptions.text) {
            extend(theme, {
                width: btnOptions.width,
                height: btnOptions.height,
                padding: 0
            });
        }
        const button = renderer
            .button(btnOptions.text, 0, 0, callback, theme, void 0, void 0, void 0, void 0, btnOptions.useHTML)
            .addClass(options.className)
            .attr({
            title: pick(chart.options.lang[btnOptions._titleKey || btnOptions.titleKey], '')
        });
        button.menuClassName = (options.menuClassName ||
            'highcharts-menu-' + chart.btnCount++);
        if (btnOptions.symbol) {
            symbol = renderer
                .symbol(btnOptions.symbol, Math.round((btnOptions.symbolX || 0) - (symbolSize / 2)), Math.round((btnOptions.symbolY || 0) - (symbolSize / 2)), symbolSize, symbolSize
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
        chart.buttonOffset += (((button.width || 0) + btnOptions.buttonSpacing) *
            (btnOptions.align === 'right' ? -1 : 1));
        chart.exportSVGElements.push(button, symbol);
    }
    /**
     * Clean up after printing a chart.
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
        // Put the chart back in
        chart.moveContainers(chart.renderTo);
        // Restore all body content
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
        Exporting_fireEvent(chart, 'afterPrint');
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
        const chart = this, body = Exporting_doc.body, printMaxWidth = chart.options.exporting.printMaxWidth, printReverseInfo = {
            childNodes: body.childNodes,
            origDisplay: [],
            resetParams: void 0
        };
        chart.isPrinting = true;
        chart.pointer?.reset(void 0, 0);
        Exporting_fireEvent(chart, 'beforePrint');
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
        // Hide all body content
        [].forEach.call(printReverseInfo.childNodes, function (node, i) {
            if (node.nodeType === 1) {
                printReverseInfo.origDisplay[i] = node.style.display;
                node.style.display = 'none';
            }
        });
        // Pull out the chart
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
        Exporting_addEvent(chart, 'redraw', composition.renderExporting);
        // Destroy the export elements at chart destroy
        Exporting_addEvent(chart, 'destroy', composition.destroyExport);
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
        Exporting_ExportingSymbols.compose(SVGRendererClass);
        Exporting_Fullscreen.compose(ChartClass);
        const chartProto = ChartClass.prototype;
        if (!chartProto.exportChart) {
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
            Exporting_addEvent(ChartClass, 'init', onChartInit);
            Exporting_addEvent(ChartClass, 'layOutTitle', onChartLayOutTitle);
            if ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isSafari) {
                Exporting_win.matchMedia('print').addListener(function (mqlEvent) {
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
            defaultOptions.exporting = merge(Exporting_ExportingDefaults.exporting, defaultOptions.exporting);
            defaultOptions.lang = merge(Exporting_ExportingDefaults.lang, defaultOptions.lang);
            // Buttons and menus are collected in a separate config option set
            // called 'navigation'. This can be extended later to add control
            // buttons like zoom and pan right click menus.
            defaultOptions.navigation = merge(Exporting_ExportingDefaults.navigation, defaultOptions.navigation);
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
        const chart = this, navOptions = chart.options.navigation, chartWidth = chart.chartWidth, chartHeight = chart.chartHeight, cacheName = 'cache-' + className, 
        // For mouse leave detection
        menuPadding = Math.max(width, height);
        let innerMenu, menu = chart[cacheName];
        // Create the menu only the first time
        if (!menu) {
            // Create a HTML element above the SVG
            chart.exportContextMenu = chart[cacheName] = menu =
                createElement('div', {
                    className: className
                }, {
                    position: 'absolute',
                    zIndex: 1000,
                    padding: menuPadding + 'px',
                    pointerEvents: 'auto',
                    ...chart.renderer.style
                }, chart.scrollablePlotArea?.fixedDiv || chart.container);
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
            // Hide on mouse out
            menu.hideMenu = function () {
                css(menu, { display: 'none' });
                if (button) {
                    button.setState(0);
                }
                chart.openMenu = false;
                // #10361, #9998
                css(chart.renderTo, { overflow: 'hidden' });
                css(chart.container, { overflow: 'hidden' });
                highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default().clearTimeout(menu.hideTimer);
                Exporting_fireEvent(chart, 'exportMenuHidden');
            };
            // Hide the menu some time after mouse leave (#1357)
            chart.exportEvents.push(Exporting_addEvent(menu, 'mouseleave', function () {
                menu.hideTimer = Exporting_win.setTimeout(menu.hideMenu, 500);
            }), Exporting_addEvent(menu, 'mouseenter', function () {
                highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default().clearTimeout(menu.hideTimer);
            }), 
            // Hide it on clicking or touching outside the menu (#2258,
            // #2335, #2407)
            Exporting_addEvent(Exporting_doc, 'mouseup', function (e) {
                if (!chart.pointer?.inClass(e.target, className)) {
                    menu.hideMenu();
                }
            }), Exporting_addEvent(menu, 'click', function () {
                if (chart.openMenu) {
                    menu.hideMenu();
                }
            }));
            // Create the items
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
                                if (typeof item !== 'string' && item.onclick) {
                                    item.onclick.apply(chart, arguments);
                                }
                            }
                        }, void 0, innerMenu);
                        highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default().setElementHTML(element, item.text ||
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
        // If outside right, right align it
        if (x + (chart.exportMenuWidth || 0) > chartWidth) {
            menuStyle.right = (chartWidth - x - width - menuPadding) + 'px';
        }
        else {
            menuStyle.left = (x - menuPadding) + 'px';
        }
        // If outside bottom, bottom align it
        if (y + height + (chart.exportMenuHeight || 0) > chartHeight &&
            button.alignOptions?.verticalAlign !== 'top') {
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
        Exporting_fireEvent(chart, 'exportMenuShown');
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
                    highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default().clearTimeout(elem.hideTimer); // #5427
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
        // Merge the options
        exportingOptions = merge(this.options.exporting, exportingOptions);
        // Do the post
        highcharts_HttpUtilities_commonjs_highcharts_HttpUtilities_commonjs2_highcharts_HttpUtilities_root_Highcharts_HttpUtilities_default().post(exportingOptions.url, {
            filename: exportingOptions.filename ?
                exportingOptions.filename.replace(/\//g, '-') :
                this.getFilename(),
            type: exportingOptions.type,
            width: exportingOptions.width,
            scale: exportingOptions.scale,
            svg: svg
        }, exportingOptions.fetchOptions);
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
    function getChartHTML(applyStyleSheets) {
        if (applyStyleSheets) {
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
                .replace(/<\/?[^>]+(>|$)/g, '') // Strip HTML tags
                .replace(/[\s_]+/g, '-')
                .replace(/[^a-z\d\-]/g, '') // Preserve only latin
                .replace(/^[\-]+/g, '') // Dashes in the start
                .replace(/[\-]+/g, '-') // Dashes in a row
                .substr(0, 24)
                .replace(/[\-]+$/g, ''); // Dashes in the end;
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
        // Create a sandbox where a new chart will be generated
        const sandbox = createElement('div', null, {
            position: 'absolute',
            top: '-9999em',
            width: chart.chartWidth + 'px',
            height: chart.chartHeight + 'px'
        }, Exporting_doc.body);
        // Get the source size
        const cssWidth = chart.renderTo.style.width, cssHeight = chart.renderTo.style.height, sourceWidth = options.exporting.sourceWidth ||
            options.chart.width ||
            (/px$/.test(cssWidth) && parseInt(cssWidth, 10)) ||
            (options.isGantt ? 800 : 600), sourceHeight = options.exporting.sourceHeight ||
            options.chart.height ||
            (/px$/.test(cssHeight) && parseInt(cssHeight, 10)) ||
            400;
        // Override some options
        extend(options.chart, {
            animation: false,
            renderTo: sandbox,
            forExport: true,
            renderer: 'SVGRenderer',
            width: sourceWidth,
            height: sourceHeight
        });
        options.exporting.enabled = false; // Hide buttons in print
        delete options.data; // #3004
        // prepare for replicating the chart
        options.series = [];
        chart.series.forEach(function (serie) {
            seriesOptions = merge(serie.userOptions, {
                animation: false, // Turn off animation
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
                    visible: axis.visible,
                    // Force some options that could have be set directly on
                    // the axis while missing in the userOptions or options.
                    type: axis.type,
                    uniqueNames: axis.uniqueNames
                }));
            }
        });
        // Make sure the `colorAxis` object of the `defaultOptions` isn't used
        // in the chart copy's user options, because a color axis should only be
        // added when the user actually applies it.
        options.colorAxis = chart.userOptions.colorAxis;
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
            const axisCopy = find(chartCopy.axes, (copy) => copy.options.internalKey === axis.userOptions.internalKey);
            if (axisCopy) {
                const extremes = axis.getExtremes(), 
                // Make sure min and max overrides in the
                // `exporting.chartOptions.xAxis` settings are reflected.
                // These should override user-set extremes via zooming,
                // scrollbar etc (#7873).
                exportOverride = splat(chartOptions?.[axis.coll] || {})[0], userMin = 'min' in exportOverride ?
                    exportOverride.min :
                    extremes.userMin, userMax = 'max' in exportOverride ?
                    exportOverride.max :
                    extremes.userMax;
                if (((typeof userMin !== 'undefined' &&
                    userMin !== axisCopy.min) || (typeof userMax !== 'undefined' &&
                    userMax !== axisCopy.max))) {
                    axisCopy.setExtremes(userMin ?? void 0, userMax ?? void 0, true, false);
                }
            }
        });
        // Get the SVG from the container's innerHTML
        svg = chartCopy.getChartHTML(chart.styledMode ||
            options.exporting?.applyStyleSheets);
        Exporting_fireEvent(this, 'getSVG', { chartCopy: chartCopy });
        svg = chart.sanitizeSVG(svg, options);
        // Free up memory
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
        return prop.replace(/[A-Z]/g, function (match) {
            return '-' + match.toLowerCase();
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
        const iframe = Exporting_doc.createElement('iframe');
        css(iframe, {
            width: '1px',
            height: '1px',
            visibility: 'hidden'
        });
        Exporting_doc.body.appendChild(iframe);
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
             * for styles or attributes.
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
                    if (prop.length > 1000 /* RegexLimits.shortLimit */) {
                        throw new Error('Input too long');
                    }
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
                styles = Exporting_win.getComputedStyle(node, null);
                parentStyles = node.nodeName === 'svg' ?
                    {} :
                    Exporting_win.getComputedStyle(node.parentNode, null);
                // Get default styles from the browser so that we don't have to
                // add these
                if (!defaultStyles[node.nodeName]) {
                    /*
                    If (!dummySVG) {
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
                    const s = Exporting_win.getComputedStyle(dummy, null), defaults = {};
                    for (const key in s) {
                        if (key.length < 1000 /* RegexLimits.shortLimit */ &&
                            typeof s[key] === 'string' &&
                            !/^\d+$/.test(key)) {
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
                    (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isFirefox ||
                        (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isMS ||
                        (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isSafari || // #16902
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
        const { scrollablePlotArea } = this;
        (
        // When scrollablePlotArea is active (#9533)
        scrollablePlotArea ?
            [
                scrollablePlotArea.fixedDiv,
                scrollablePlotArea.scrollingContainer
            ] :
            [this.container]).forEach(function (div) {
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
        Chart_ChartNavigationComposition
            .compose(chart).navigation
            .addUpdate((options, redraw) => {
            update('navigation', options, redraw);
        });
    }
    /**
     * On layout of titles (title, subtitle and caption), adjust the `alignTo``
     * box to avoid the context menu button.
     * @private
     */
    function onChartLayOutTitle({ alignTo, key, textPxLength }) {
        const exportingOptions = this.options.exporting, { align, buttonSpacing = 0, verticalAlign, width = 0 } = merge(this.options.navigation?.buttonOptions, exportingOptions?.buttons?.contextButton), space = alignTo.width - textPxLength, widthAdjust = width + buttonSpacing;
        if ((exportingOptions?.enabled ?? true) &&
            key === 'title' &&
            align === 'right' &&
            verticalAlign === 'top') {
            if (space < 2 * widthAdjust) {
                if (space < widthAdjust) {
                    alignTo.width -= widthAdjust;
                }
                else if (this.title?.alignValue !== 'left') {
                    alignTo.x -= widthAdjust - space / 2;
                }
            }
        }
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
        if (chart.isPrinting) { // Block the button while in printing mode
            return;
        }
        printingChart = chart;
        if (!(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isSafari) {
            chart.beforePrint();
        }
        // Give the browser time to draw WebGL content, an issue that randomly
        // appears (at least) in Chrome ~67 on the Mac (#8708).
        setTimeout(() => {
            Exporting_win.focus(); // #1510
            Exporting_win.print();
            // Allow the browser to prepare before reverting
            if (!(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isSafari) {
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
     * account for expand properties, browser bugs.
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
            .replace(/jQuery\d+="[^"]+"/g, '')
            .replace(/url\(("|&quot;)(.*?)("|&quot;)\;?\)/g, 'url($2)')
            .replace(/url\([^#]+#/g, 'url(#')
            .replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ')
            .replace(/ (NS\d+\:)?href=/g, ' xlink:href=') // #3567
            .replace(/\n+/g, ' ')
            // Batik doesn't support rgba fills and strokes (#3095)
            .replace(/(fill|stroke)="rgba\(([ \d]+,[ \d]+,[ \d]+),([ \d\.]+)\)"/g, // eslint-disable-line max-len
        '$1="rgb($2)" $1-opacity="$3"')
            // Replace HTML entities, issue #347
            .replace(/&nbsp;/g, '\u00A0') // No-break space
            .replace(/&shy;/g, '\u00AD'); // Soft hyphen
        return svg;
    }
})(Exporting || (Exporting = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Exporting_Exporting = (Exporting);
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
 *        The chart on which the event occurred.
 *
 * @param {global.Event} event
 *        The event that occurred.
 */
/**
 * Gets fired before a chart is printed through the context menu item or the
 * Chart.print method.
 *
 * @callback Highcharts.ExportingBeforePrintCallbackFunction
 *
 * @param {Highcharts.Chart} this
 *        The chart on which the event occurred.
 *
 * @param {global.Event} event
 *        The event that occurred.
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
(''); // Keeps doclets above in transpiled file
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
(''); // Keeps doclets above in transpiled file

;// ./code/es-modules/Extensions/OfflineExporting/OfflineExportingDefaults.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 * Declarations
 *
 * */
const OfflineExportingDefaults = {
    libURL: 'https://code.highcharts.com/12.1.2/lib/',
    // When offline-exporting is loaded, redefine the menu item definitions
    // related to download.
    menuItemDefinitions: {
        downloadPNG: {
            textKey: 'downloadPNG',
            onclick: function () {
                this.exportChartLocal();
            }
        },
        downloadJPEG: {
            textKey: 'downloadJPEG',
            onclick: function () {
                this.exportChartLocal({
                    type: 'image/jpeg'
                });
            }
        },
        downloadSVG: {
            textKey: 'downloadSVG',
            onclick: function () {
                this.exportChartLocal({
                    type: 'image/svg+xml'
                });
            }
        },
        downloadPDF: {
            textKey: 'downloadPDF',
            onclick: function () {
                this.exportChartLocal({
                    type: 'application/pdf'
                });
            }
        }
    }
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const OfflineExporting_OfflineExportingDefaults = (OfflineExportingDefaults);

;// ./code/es-modules/Extensions/OfflineExporting/OfflineExporting.js
/* *
 *
 *  Client side exporting module
 *
 *  (c) 2015 Torstein Honsi / Oystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { defaultOptions: OfflineExporting_defaultOptions } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { downloadURL: OfflineExporting_downloadURL } = Extensions_DownloadURL;


const { doc: OfflineExporting_doc, win: OfflineExporting_win } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { ajax } = (highcharts_HttpUtilities_commonjs_highcharts_HttpUtilities_commonjs2_highcharts_HttpUtilities_root_Highcharts_HttpUtilities_default());


const { addEvent: OfflineExporting_addEvent, error, extend: OfflineExporting_extend, fireEvent: OfflineExporting_fireEvent, merge: OfflineExporting_merge } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default().allowedAttributes.push('data-z-index', 'fill-opacity', 'filter', 'rx', 'ry', 'stroke-dasharray', 'stroke-linejoin', 'stroke-opacity', 'text-anchor', 'transform', 'version', 'viewBox', 'visibility', 'xmlns', 'xmlns:xlink');
highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default().allowedTags.push('desc', 'clippath', 'g');
/* *
 *
 *  Composition
 *
 * */
var OfflineExporting;
(function (OfflineExporting) {
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
    // Dummy object so we can reuse our canvas-tools.js without errors
    OfflineExporting.CanVGRenderer = {}, OfflineExporting.domurl = OfflineExporting_win.URL || OfflineExporting_win.webkitURL || OfflineExporting_win, 
    // Milliseconds to defer image load event handlers to offset IE bug
    OfflineExporting.loadEventDeferDelay = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isMS ? 150 : 0;
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Extends OfflineExporting with Chart.
     * @private
     */
    function compose(ChartClass) {
        const chartProto = ChartClass.prototype;
        if (!chartProto.exportChartLocal) {
            chartProto.getSVGForLocalExport = getSVGForLocalExport;
            chartProto.exportChartLocal = exportChartLocal;
            // Extend the default options to use the local exporter logic
            OfflineExporting_merge(true, OfflineExporting_defaultOptions.exporting, OfflineExporting_OfflineExportingDefaults);
        }
        return ChartClass;
    }
    OfflineExporting.compose = compose;
    /**
     * Get data URL to an image of an SVG and call download on it options
     * object:
     * - **filename:** Name of resulting downloaded file without extension.
     * Default is `chart`.
     *
     * - **type:** File type of resulting download. Default is `image/png`.
     *
     * - **scale:** Scaling factor of downloaded image compared to source.
     * Default is `1`.
     * - **libURL:** URL pointing to location of dependency scripts to download
     * on demand. Default is the exporting.libURL option of the global
     * Highcharts options pointing to our server.
     *
     * @function Highcharts.downloadSVGLocal
     *
     * @param {string} svg
     * The generated SVG
     *
     * @param {Highcharts.ExportingOptions} options
     * The exporting options
     *
     * @param {Function} failCallback
     * The callback function in case of errors
     *
     * @param {Function} [successCallback]
     * The callback function in case of success
     *
     */
    function downloadSVGLocal(svg, options, failCallback, successCallback) {
        const dummySVGContainer = OfflineExporting_doc.createElement('div'), imageType = options.type || 'image/png', filename = ((options.filename || 'chart') +
            '.' +
            (imageType === 'image/svg+xml' ?
                'svg' : imageType.split('/')[1])), scale = options.scale || 1;
        let svgurl, blob, finallyHandler, libURL = (options.libURL || OfflineExporting_defaultOptions.exporting.libURL), objectURLRevoke = true, pdfFont = options.pdfFont;
        // Allow libURL to end with or without fordward slash
        libURL = libURL.slice(-1) !== '/' ? libURL + '/' : libURL;
        /*
         * Detect if we need to load TTF fonts for the PDF, then load them and
         * proceed.
         *
         * @private
         */
        const loadPdfFonts = (svgElement, callback) => {
            const hasNonASCII = (s) => (
            // eslint-disable-next-line no-control-regex
            /[^\u0000-\u007F\u200B]+/.test(s));
            // Register an event in order to add the font once jsPDF is
            // initialized
            const addFont = (variant, base64) => {
                OfflineExporting_win.jspdf.jsPDF.API.events.push([
                    'initialized',
                    function () {
                        this.addFileToVFS(variant, base64);
                        this.addFont(variant, 'HighchartsFont', variant);
                        if (!this.getFontList().HighchartsFont) {
                            this.setFont('HighchartsFont');
                        }
                    }
                ]);
            };
            // If there are no non-ASCII characters in the SVG, do not use
            // bother downloading the font files
            if (pdfFont && !hasNonASCII(svgElement.textContent || '')) {
                pdfFont = void 0;
            }
            // Add new font if the URL is declared, #6417.
            const variants = ['normal', 'italic', 'bold', 'bolditalic'];
            // Shift the first element off the variants and add as a font.
            // Then asynchronously trigger the next variant until calling the
            // callback when the variants are empty.
            let normalBase64;
            const shiftAndLoadVariant = () => {
                const variant = variants.shift();
                // All variants shifted and possibly loaded, proceed
                if (!variant) {
                    return callback();
                }
                const url = pdfFont && pdfFont[variant];
                if (url) {
                    ajax({
                        url,
                        responseType: 'blob',
                        success: (data, xhr) => {
                            const reader = new FileReader();
                            reader.onloadend = function () {
                                if (typeof this.result === 'string') {
                                    const base64 = this.result.split(',')[1];
                                    addFont(variant, base64);
                                    if (variant === 'normal') {
                                        normalBase64 = base64;
                                    }
                                }
                                shiftAndLoadVariant();
                            };
                            reader.readAsDataURL(xhr.response);
                        },
                        error: shiftAndLoadVariant
                    });
                }
                else {
                    // For other variants, fall back to normal text weight/style
                    if (normalBase64) {
                        addFont(variant, normalBase64);
                    }
                    shiftAndLoadVariant();
                }
            };
            shiftAndLoadVariant();
        };
        /*
         * @private
         */
        const downloadPDF = () => {
            highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default().setElementHTML(dummySVGContainer, svg);
            const textElements = dummySVGContainer.getElementsByTagName('text'), 
            // Copy style property to element from parents if it's not
            // there. Searches up hierarchy until it finds prop, or hits the
            // chart container.
            setStylePropertyFromParents = function (el, propName) {
                let curParent = el;
                while (curParent && curParent !== dummySVGContainer) {
                    if (curParent.style[propName]) {
                        let value = curParent.style[propName];
                        if (propName === 'fontSize' && /em$/.test(value)) {
                            value = Math.round(parseFloat(value) * 16) + 'px';
                        }
                        el.style[propName] = value;
                        break;
                    }
                    curParent = curParent.parentNode;
                }
            };
            let titleElements, outlineElements;
            // Workaround for the text styling. Making sure it does pick up
            // settings for parent elements.
            [].forEach.call(textElements, function (el) {
                // Workaround for the text styling. making sure it does pick up
                // the root element
                ['fontFamily', 'fontSize']
                    .forEach((property) => {
                    setStylePropertyFromParents(el, property);
                });
                el.style.fontFamily = pdfFont && pdfFont.normal ?
                    // Custom PDF font
                    'HighchartsFont' :
                    // Generic font (serif, sans-serif etc)
                    String(el.style.fontFamily &&
                        el.style.fontFamily.split(' ').splice(-1));
                // Workaround for plotband with width, removing title from text
                // nodes
                titleElements = el.getElementsByTagName('title');
                [].forEach.call(titleElements, function (titleElement) {
                    el.removeChild(titleElement);
                });
                // Remove all .highcharts-text-outline elements, #17170
                outlineElements =
                    el.getElementsByClassName('highcharts-text-outline');
                while (outlineElements.length > 0) {
                    const outline = outlineElements[0];
                    if (outline.parentNode) {
                        outline.parentNode.removeChild(outline);
                    }
                }
            });
            const svgNode = dummySVGContainer.querySelector('svg');
            if (svgNode) {
                loadPdfFonts(svgNode, () => {
                    svgToPdf(svgNode, 0, scale, (pdfData) => {
                        try {
                            OfflineExporting_downloadURL(pdfData, filename);
                            if (successCallback) {
                                successCallback();
                            }
                        }
                        catch (e) {
                            failCallback(e);
                        }
                    });
                });
            }
        };
        // Initiate download depending on file type
        if (imageType === 'image/svg+xml') {
            // SVG download. In this case, we want to use Microsoft specific
            // Blob if available
            try {
                if (typeof OfflineExporting_win.MSBlobBuilder !== 'undefined') {
                    blob = new OfflineExporting_win.MSBlobBuilder();
                    blob.append(svg);
                    svgurl = blob.getBlob('image/svg+xml');
                }
                else {
                    svgurl = svgToDataUrl(svg);
                }
                OfflineExporting_downloadURL(svgurl, filename);
                if (successCallback) {
                    successCallback();
                }
            }
            catch (e) {
                failCallback(e);
            }
        }
        else if (imageType === 'application/pdf') {
            if (OfflineExporting_win.jspdf && OfflineExporting_win.jspdf.jsPDF) {
                downloadPDF();
            }
            else {
                // Must load pdf libraries first. // Don't destroy the object
                // URL yet since we are doing things asynchronously. A cleaner
                // solution would be nice, but this will do for now.
                objectURLRevoke = true;
                getScript(libURL + 'jspdf.js', function () {
                    getScript(libURL + 'svg2pdf.js', downloadPDF);
                });
            }
        }
        else {
            // PNG/JPEG download - create bitmap from SVG
            svgurl = svgToDataUrl(svg);
            finallyHandler = function () {
                try {
                    OfflineExporting.domurl.revokeObjectURL(svgurl);
                }
                catch (e) {
                    // Ignore
                }
            };
            // First, try to get PNG by rendering on canvas
            imageToDataUrl(svgurl, imageType, {}, scale, function (imageURL) {
                // Success
                try {
                    OfflineExporting_downloadURL(imageURL, filename);
                    if (successCallback) {
                        successCallback();
                    }
                }
                catch (e) {
                    failCallback(e);
                }
            }, function () {
                if (svg.length > 100000000 /* RegexLimits.svgLimit */) {
                    throw new Error('Input too long');
                }
                // Failed due to tainted canvas
                // Create new and untainted canvas
                const canvas = OfflineExporting_doc.createElement('canvas'), ctx = canvas.getContext('2d'), matchedImageWidth = svg.match(
                // eslint-disable-next-line max-len
                /^<svg[^>]*\s{,1000}width\s{,1000}=\s{,1000}\"?(\d+)\"?[^>]*>/), matchedImageHeight = svg.match(
                // eslint-disable-next-line max-len
                /^<svg[^>]*\s{0,1000}height\s{,1000}=\s{,1000}\"?(\d+)\"?[^>]*>/);
                if (ctx && matchedImageWidth && matchedImageHeight) {
                    const imageWidth = +matchedImageWidth[1] * scale, imageHeight = +matchedImageHeight[1] * scale, downloadWithCanVG = () => {
                        const v = OfflineExporting_win.canvg.Canvg.fromString(ctx, svg);
                        v.start();
                        try {
                            OfflineExporting_downloadURL(OfflineExporting_win.navigator.msSaveOrOpenBlob ?
                                canvas.msToBlob() :
                                canvas.toDataURL(imageType), filename);
                            if (successCallback) {
                                successCallback();
                            }
                        }
                        catch (e) {
                            failCallback(e);
                        }
                        finally {
                            finallyHandler();
                        }
                    };
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;
                    if (OfflineExporting_win.canvg) {
                        // Use preloaded canvg
                        downloadWithCanVG();
                    }
                    else {
                        // Must load canVG first.
                        // Don't destroy the object URL yet since we are
                        // doing things asynchronously. A cleaner solution
                        // would be nice, but this will do for now.
                        objectURLRevoke = true;
                        getScript(libURL + 'canvg.js', downloadWithCanVG);
                    }
                }
            }, 
            // No canvas support
            failCallback, 
            // Failed to load image
            failCallback, 
            // Finally
            function () {
                if (objectURLRevoke) {
                    finallyHandler();
                }
            });
        }
    }
    OfflineExporting.downloadSVGLocal = downloadSVGLocal;
    /* eslint-disable valid-jsdoc */
    /**
     * Exporting and offline-exporting modules required. Export a chart to
     * an image locally in the user's browser.
     *
     * @function Highcharts.Chart#exportChartLocal
     *
     * @param  {Highcharts.ExportingOptions} [exportingOptions]
     *         Exporting options, the same as in
     *         {@link Highcharts.Chart#exportChart}.
     *
     * @param  {Highcharts.Options} [chartOptions]
     *         Additional chart options for the exported chart. For example
     *         a different background color can be added here, or
     *         `dataLabels` for export only.
     *
     *
     * @requires modules/exporting
     * @requires modules/offline-exporting
     */
    function exportChartLocal(exportingOptions, chartOptions) {
        const chart = this, options = OfflineExporting_merge(chart.options.exporting, exportingOptions), fallbackToExportServer = function (err) {
            if (options.fallbackToExportServer === false) {
                if (options.error) {
                    options.error(options, err);
                }
                else {
                    error(28, true); // Fallback disabled
                }
            }
            else {
                chart.exportChart(options);
            }
        }, svgSuccess = function (svg) {
            // If SVG contains foreignObjects PDF fails in all browsers
            // and all exports except SVG will fail in IE, as both CanVG
            // and svg2pdf choke on this. Gracefully fall back.
            if (svg.indexOf('<foreignObject') > -1 &&
                options.type !== 'image/svg+xml' &&
                ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isMS || options.type === 'application/pdf')) {
                fallbackToExportServer(new Error('Image type not supported for charts with embedded HTML'));
            }
            else {
                OfflineExporting.downloadSVGLocal(svg, OfflineExporting_extend({ filename: chart.getFilename() }, options), fallbackToExportServer, () => OfflineExporting_fireEvent(chart, 'exportChartLocalSuccess'));
            }
        }, 
        // Return true if the SVG contains images with external data. With
        // the boost module there are `image` elements with encoded PNGs,
        // these are supported by svg2pdf and should pass (#10243).
        hasExternalImages = function () {
            return [].some.call(chart.container.getElementsByTagName('image'), function (image) {
                const href = image.getAttribute('href');
                return (href !== '' &&
                    typeof href === 'string' &&
                    href.indexOf('data:') !== 0);
            });
        };
        // If we are on IE and in styled mode, add an allowlist to the renderer
        // for inline styles that we want to pass through. There are so many
        // styles by default in IE that we don't want to denylist them all.
        if ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isMS && chart.styledMode && !Exporting_Exporting.inlineAllowlist.length) {
            Exporting_Exporting.inlineAllowlist.push(/^blockSize/, /^border/, /^caretColor/, /^color/, /^columnRule/, /^columnRuleColor/, /^cssFloat/, /^cursor/, /^fill$/, /^fillOpacity/, /^font/, /^inlineSize/, /^length/, /^lineHeight/, /^opacity/, /^outline/, /^parentRule/, /^rx$/, /^ry$/, /^stroke/, /^textAlign/, /^textAnchor/, /^textDecoration/, /^transform/, /^vectorEffect/, /^visibility/, /^x$/, /^y$/);
        }
        // Always fall back on:
        // - MS browsers: Embedded images JPEG/PNG, or any PDF
        // - Embedded images and PDF
        if (((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isMS &&
            (options.type === 'application/pdf' ||
                chart.container.getElementsByTagName('image').length &&
                    options.type !== 'image/svg+xml')) || (options.type === 'application/pdf' &&
            hasExternalImages())) {
            fallbackToExportServer(new Error('Image type not supported for this chart/browser.'));
            return;
        }
        chart.getSVGForLocalExport(options, chartOptions || {}, fallbackToExportServer, svgSuccess);
    }
    /**
     * Downloads a script and executes a callback when done.
     *
     * @private
     * @function getScript
     * @param {string} scriptLocation
     * @param {Function} callback
     */
    function getScript(scriptLocation, callback) {
        const head = OfflineExporting_doc.getElementsByTagName('head')[0], script = OfflineExporting_doc.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptLocation;
        script.onload = callback;
        script.onerror = function () {
            error('Error loading script ' + scriptLocation);
        };
        head.appendChild(script);
    }
    OfflineExporting.getScript = getScript;
    /**
     * Get SVG of chart prepared for client side export. This converts
     * embedded images in the SVG to data URIs. It requires the regular
     * exporting module. The options and chartOptions arguments are passed
     * to the getSVGForExport function.
     *
     * @private
     * @function Highcharts.Chart#getSVGForLocalExport
     * @param {Highcharts.ExportingOptions} options
     * @param {Highcharts.Options} chartOptions
     * @param {Function} failCallback
     * @param {Function} successCallback
     */
    function getSVGForLocalExport(options, chartOptions, failCallback, successCallback) {
        const chart = this, 
        // After grabbing the SVG of the chart's copy container we need
        // to do sanitation on the SVG
        sanitize = (svg) => chart.sanitizeSVG(svg, chartCopyOptions), 
        // When done with last image we have our SVG
        checkDone = () => {
            if (images && imagesEmbedded === imagesLength) {
                successCallback(sanitize(chartCopyContainer.innerHTML));
            }
        }, 
        // Success handler, we converted image to base64!
        embeddedSuccess = (imageURL, imageType, callbackArgs) => {
            ++imagesEmbedded;
            // Change image href in chart copy
            callbackArgs.imageElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageURL);
            checkDone();
        };
        let el, chartCopyContainer, chartCopyOptions, href = null, images, imagesLength = 0, imagesEmbedded = 0;
        // Hook into getSVG to get a copy of the chart copy's
        // container (#8273)
        chart.unbindGetSVG = OfflineExporting_addEvent(chart, 'getSVG', (e) => {
            chartCopyOptions = e.chartCopy.options;
            chartCopyContainer = e.chartCopy.container.cloneNode(true);
            images = chartCopyContainer && chartCopyContainer
                .getElementsByTagName('image') || [];
            imagesLength = images.length;
        });
        // Trigger hook to get chart copy
        chart.getSVGForExport(options, chartOptions);
        try {
            // If there are no images to embed, the SVG is okay now.
            if (!images || !images.length) {
                // Use SVG of chart copy
                successCallback(sanitize(chartCopyContainer.innerHTML));
                return;
            }
            // Go through the images we want to embed
            for (let i = 0; i < images.length; i++) {
                el = images[i];
                href = el.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
                if (href) {
                    OfflineExporting.imageToDataUrl(href, 'image/png', { imageElement: el }, options.scale, embeddedSuccess, 
                    // Tainted canvas
                    failCallback, 
                    // No canvas support
                    failCallback, 
                    // Failed to load source
                    failCallback);
                    // Hidden, boosted series have blank href (#10243)
                }
                else {
                    imagesEmbedded++;
                    el.parentNode.removeChild(el);
                    i--;
                    checkDone();
                }
            }
        }
        catch (e) {
            failCallback(e);
        }
        // Clean up
        chart.unbindGetSVG();
    }
    /**
     * Get data:URL from image URL. Pass in callbacks to handle results.
     *
     * @private
     * @function Highcharts.imageToDataUrl
     *
     * @param {string} imageURL
     *
     * @param {string} imageType
     *
     * @param {*} callbackArgs
     *        callbackArgs is used only by callbacks.
     *
     * @param {number} scale
     *
     * @param {Function} successCallback
     *        Receives four arguments: imageURL, imageType, callbackArgs,
     *        and scale.
     *
     * @param {Function} taintedCallback
     *        Receives four arguments: imageURL, imageType, callbackArgs,
     *        and scale.
     *
     * @param {Function} noCanvasSupportCallback
     *        Receives four arguments: imageURL, imageType, callbackArgs,
     *        and scale.
     *
     * @param {Function} failedLoadCallback
     *        Receives four arguments: imageURL, imageType, callbackArgs,
     *        and scale.
     *
     * @param {Function} [finallyCallback]
     *        finallyCallback is always called at the end of the process. All
     *        callbacks receive four arguments: imageURL, imageType,
     *        callbackArgs, and scale.
     */
    function imageToDataUrl(imageURL, imageType, callbackArgs, scale, successCallback, taintedCallback, noCanvasSupportCallback, failedLoadCallback, finallyCallback) {
        let img = new OfflineExporting_win.Image(), taintedHandler;
        const loadHandler = () => {
            setTimeout(function () {
                const canvas = OfflineExporting_doc.createElement('canvas'), ctx = canvas.getContext && canvas.getContext('2d');
                let dataURL;
                try {
                    if (!ctx) {
                        noCanvasSupportCallback(imageURL, imageType, callbackArgs, scale);
                    }
                    else {
                        canvas.height = img.height * scale;
                        canvas.width = img.width * scale;
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        // Now we try to get the contents of the canvas.
                        try {
                            dataURL = canvas.toDataURL(imageType);
                            successCallback(dataURL, imageType, callbackArgs, scale);
                        }
                        catch (e) {
                            taintedHandler(imageURL, imageType, callbackArgs, scale);
                        }
                    }
                }
                finally {
                    if (finallyCallback) {
                        finallyCallback(imageURL, imageType, callbackArgs, scale);
                    }
                }
                // IE bug where image is not always ready despite calling load
                // event.
            }, OfflineExporting.loadEventDeferDelay);
        }, 
        // Image load failed (e.g. invalid URL)
        errorHandler = () => {
            failedLoadCallback(imageURL, imageType, callbackArgs, scale);
            if (finallyCallback) {
                finallyCallback(imageURL, imageType, callbackArgs, scale);
            }
        };
        // This is called on load if the image drawing to canvas failed with a
        // security error. We retry the drawing with crossOrigin set to
        // Anonymous.
        taintedHandler = () => {
            img = new OfflineExporting_win.Image();
            taintedHandler = taintedCallback;
            // Must be set prior to loading image source
            img.crossOrigin = 'Anonymous';
            img.onload = loadHandler;
            img.onerror = errorHandler;
            img.src = imageURL;
        };
        img.onload = loadHandler;
        img.onerror = errorHandler;
        img.src = imageURL;
    }
    OfflineExporting.imageToDataUrl = imageToDataUrl;
    /**
     * Get blob URL from SVG code. Falls back to normal data URI.
     *
     * @private
     * @function Highcharts.svgToDataURL
     */
    function svgToDataUrl(svg) {
        // Webkit and not chrome
        const userAgent = OfflineExporting_win.navigator.userAgent;
        const webKit = (userAgent.indexOf('WebKit') > -1 &&
            userAgent.indexOf('Chrome') < 0);
        try {
            // Safari requires data URI since it doesn't allow navigation to
            // blob URLs. ForeignObjects also don't work well in Blobs in Chrome
            // (#14780).
            if (!webKit && svg.indexOf('<foreignObject') === -1) {
                return OfflineExporting.domurl.createObjectURL(new OfflineExporting_win.Blob([svg], {
                    type: 'image/svg+xml;charset-utf-16'
                }));
            }
        }
        catch (e) {
            // Ignore
        }
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }
    OfflineExporting.svgToDataUrl = svgToDataUrl;
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function svgToPdf(svgElement, margin, scale, callback) {
        const width = (Number(svgElement.getAttribute('width')) + 2 * margin) *
            scale, height = (Number(svgElement.getAttribute('height')) + 2 * margin) *
            scale, pdfDoc = new OfflineExporting_win.jspdf.jsPDF(// eslint-disable-line new-cap
        // setting orientation to portrait if height exceeds width
        height > width ? 'p' : 'l', 'pt', [width, height]);
        // Workaround for #7090, hidden elements were drawn anyway. It comes
        // down to https://github.com/yWorks/svg2pdf.js/issues/28. Check this
        // later.
        [].forEach.call(svgElement.querySelectorAll('*[visibility="hidden"]'), function (node) {
            node.parentNode.removeChild(node);
        });
        // Workaround for #13948, multiple stops in linear gradient set to 0
        // causing error in Acrobat
        const gradients = svgElement.querySelectorAll('linearGradient');
        for (let index = 0; index < gradients.length; index++) {
            const gradient = gradients[index];
            const stops = gradient.querySelectorAll('stop');
            let i = 0;
            while (i < stops.length &&
                stops[i].getAttribute('offset') === '0' &&
                stops[i + 1].getAttribute('offset') === '0') {
                stops[i].remove();
                i++;
            }
        }
        // Workaround for #15135, zero width spaces, which Highcharts uses
        // to break lines, are not correctly rendered in PDF. Replace it
        // with a regular space and offset by some pixels to compensate.
        [].forEach.call(svgElement.querySelectorAll('tspan'), (tspan) => {
            if (tspan.textContent === '\u200B') {
                tspan.textContent = ' ';
                tspan.setAttribute('dx', -5);
            }
        });
        pdfDoc.svg(svgElement, {
            x: 0,
            y: 0,
            width,
            height,
            removeInvalid: true
        }).then(() => callback(pdfDoc.output('datauristring')));
    }
    OfflineExporting.svgToPdf = svgToPdf;
})(OfflineExporting || (OfflineExporting = {}));
/* *
 *
 * Default Export
 *
 * */
/* harmony default export */ const OfflineExporting_OfflineExporting = (OfflineExporting);

;// ./code/es-modules/masters/modules/offline-exporting.src.js





const G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
// Compatibility
G.dataURLtoBlob = G.dataURLtoBlob || Extensions_DownloadURL.dataURLtoBlob;
G.downloadSVGLocal = OfflineExporting_OfflineExporting.downloadSVGLocal;
G.downloadURL = G.downloadURL || Extensions_DownloadURL.downloadURL;
// Compose
OfflineExporting_OfflineExporting.compose(G.Chart);
/* harmony default export */ const offline_exporting_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});