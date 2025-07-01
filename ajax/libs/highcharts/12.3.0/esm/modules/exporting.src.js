/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/exporting
 * @requires highcharts
 *
 * Exporting module
 *
 * (c) 2010-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__ from "../highcharts.src.js";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/

;// external ["../highcharts.src.js","default"]
const external_highcharts_src_js_default_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"];
var external_highcharts_src_js_default_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_namespaceObject);
;// external ["../highcharts.src.js","default","AST"]
const external_highcharts_src_js_default_AST_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].AST;
var external_highcharts_src_js_default_AST_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_AST_namespaceObject);
;// external ["../highcharts.src.js","default","Chart"]
const external_highcharts_src_js_default_Chart_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].Chart;
var external_highcharts_src_js_default_Chart_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_Chart_namespaceObject);
;// ./code/es-modules/Core/Chart/ChartNavigationComposition.js
/**
 *
 *  (c) 2010-2025 Paweł Fus
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

;// ./code/es-modules/Extensions/DownloadURL.js
/* *
 *
 *  (c) 2015-2025 Oystein Moseng
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

const { isSafari, win, win: { document: doc } } = (external_highcharts_src_js_default_default());

const { error } = (external_highcharts_src_js_default_default());
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
 *
 * @private
 * @function Highcharts.dataURLtoBlob
 *
 * @param {string} dataURL
 * URL to convert.
 *
 * @return {string | undefined}
 * Blob.
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
 *
 * @param {string | global.URL} dataURL
 * The dataURL/Blob to download.
 * @param {string} filename
 * The name of the resulting file (w/extension).
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
/**
 * Asynchronously downloads a script from a provided location.
 *
 * @private
 * @function Highcharts.getScript
 *
 * @param {string} scriptLocation
 * The location for the script to fetch.
 */
function getScript(scriptLocation) {
    return new Promise((resolve, reject) => {
        const head = doc.getElementsByTagName('head')[0], script = doc.createElement('script');
        // Set type and location for the script
        script.type = 'text/javascript';
        script.src = scriptLocation;
        // Resolve in case of a succesful script fetching
        script.onload = () => {
            resolve();
        };
        // Reject in case of fail
        script.onerror = () => {
            reject(error(`Error loading script ${scriptLocation}`));
        };
        // Append the newly created script
        head.appendChild(script);
    });
}
/* *
 *
 *  Default Export
 *
 * */
const DownloadURL = {
    dataURLtoBlob,
    downloadURL,
    getScript
};
/* harmony default export */ const Extensions_DownloadURL = (DownloadURL);

;// ./code/es-modules/Extensions/Exporting/ExportingDefaults.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { isTouchDevice } = (external_highcharts_src_js_default_default());
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
     * @since     10.3.3
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
     * @since     12.0.0
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
     * @type      {Object}
     * @since     11.3.0
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
    libURL: 'https://code.highcharts.com/12.3.0/lib/',
    /**
     * Whether the chart should be exported using the browser's built-in
     * capabilities, allowing offline exports without requiring access to the
     * Highcharts export server, or sent directly to the export server for
     * processing and downloading.
     *
     * This option is different from `exporting.fallbackToExportServer`, which
     * controls whether the export server should be used as a fallback only if
     * the local export fails. In contrast, `exporting.local` explicitly defines
     * which export method to use.
     *
     * @see [fallbackToExportServer](#exporting.fallbackToExportServer)
     *
     * @type      {boolean}
     * @default   true
     * @since 12.3.0
     * @requires  modules/exporting
     * @apioption exporting.local
     */
    local: true,
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
    url: `https://export-svg.highcharts.com?v=${(external_highcharts_src_js_default_default()).version}`,
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
     * @since    10.0.0
     * @requires modules/offline-exporting
     */
    pdfFont: {
        /**
         * The TTF font file for normal `font-style`. If font variations like
         * `bold` or `italic` are not defined, the `normal` font will be used
         * for those too.
         *
         * @type string | undefined
         */
        normal: void 0,
        /**
         * The TTF font file for bold text.
         *
         * @type string | undefined
         */
        bold: void 0,
        /**
         * The TTF font file for bold and italic text.
         *
         * @type string | undefined
         */
        bolditalic: void 0,
        /**
         * The TTF font file for italic text.
         *
         * @type string | undefined
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
             * @type  {Highcharts.SymbolKeyValue | "menu" | "menuball" | string}
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
             * @sample highcharts/exporting/menuitemdefinitions/
             *         Menu item definitions
             * @sample highcharts/exporting/menuitemdefinitions-webp/
             *         Adding a custom menu item for WebP export
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
            ]
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
     * @sample highcharts/exporting/menuitemdefinitions/
     *         Menu item definitions
     * @sample highcharts/exporting/menuitemdefinitions-webp/
     *         Adding a custom menu item for WebP export
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
                this.fullscreen?.toggle();
            }
        },
        /**
         * @ignore
         */
        printChart: {
            textKey: 'printChart',
            onclick: function () {
                this.exporting?.print();
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
            onclick: async function () {
                await this.exporting?.exportChart();
            }
        },
        /**
         * @ignore
         */
        downloadJPEG: {
            textKey: 'downloadJPEG',
            onclick: async function () {
                await this.exporting?.exportChart({
                    type: 'image/jpeg'
                });
            }
        },
        /**
         * @ignore
         */
        downloadPDF: {
            textKey: 'downloadPDF',
            onclick: async function () {
                await this.exporting?.exportChart({
                    type: 'application/pdf'
                });
            }
        },
        /**
         * @ignore
         */
        downloadSVG: {
            textKey: 'downloadSVG',
            onclick: async function () {
                await this.exporting?.exportChart({
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
         *
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
         * @since     10.3.0
         * @apioption navigation.buttonOptions.useHTML
         */
        /**
         * The vertical offset of the button's position relative to its
         * `verticalAlign`. By default adjusted for the chart title alignment.
         *
         * @sample highcharts/navigation/buttonoptions-verticalalign/
         *         Buttons at lower right
         *
         * @since     2.0
         * @apioption navigation.buttonOptions.y
         */
        y: -5,
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
         * @type  {Highcharts.ColorString | Highcharts.GradientColorObject | Highcharts.PatternObject}
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
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            fill: "#ffffff" /* Palette.backgroundColor */,
            /**
             * Padding for the button.
             */
            padding: 5,
            /**
             * Default stroke for the buttons.
             *
             * @type {Highcharts.ColorString}
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
 *  (c) 2010-2025 Torstein Honsi
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
 *  (c) 2009-2025 Rafal Sebestjanski
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



const { composed } = (external_highcharts_src_js_default_default());

const { addEvent, fireEvent, pushUnique } = (external_highcharts_src_js_default_default());
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
         * @type {boolean | undefined}
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
        const chart = this.chart, exportDivElements = chart.exporting?.divElements, exportingOptions = chart.options.exporting, menuItems = (exportingOptions &&
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
                external_highcharts_src_js_default_AST_default().setElementHTML(exportDivElement, !this.isOpen ?
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

;// ./code/es-modules/Core/HttpUtilities.js
/* *
 *
 *  (c) 2010-2025 Christer Vasseng, Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { win: HttpUtilities_win } = (external_highcharts_src_js_default_default());

const { discardElement, objectEach } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * Perform an Ajax call.
 *
 * @function Highcharts.ajax
 *
 * @param {Highcharts.AjaxSettingsObject} settings
 * The Ajax settings to use.
 *
 * @return {false | undefined}
 * Returns false, if error occurred.
 */
function ajax(settings) {
    const headers = {
        json: 'application/json',
        xml: 'application/xml',
        text: 'text/plain',
        octet: 'application/octet-stream'
    }, r = new XMLHttpRequest();
    /**
     * Private error handler.
     *
     * @private
     *
     * @param {XMLHttpRequest} xhr
     * Internal request object.
     * @param {string | Error} err
     * Occurred error.
     */
    function handleError(xhr, err) {
        if (settings.error) {
            settings.error(xhr, err);
        }
        else {
            // @todo Maybe emit a highcharts error event here
        }
    }
    if (!settings.url) {
        return false;
    }
    r.open((settings.type || 'get').toUpperCase(), settings.url, true);
    if (!settings.headers?.['Content-Type']) {
        r.setRequestHeader('Content-Type', headers[settings.dataType || 'json'] || headers.text);
    }
    objectEach(settings.headers, function (val, key) {
        r.setRequestHeader(key, val);
    });
    if (settings.responseType) {
        r.responseType = settings.responseType;
    }
    // @todo lacking timeout handling
    r.onreadystatechange = function () {
        let res;
        if (r.readyState === 4) {
            if (r.status === 200) {
                if (settings.responseType !== 'blob') {
                    res = r.responseText;
                    if (settings.dataType === 'json') {
                        try {
                            res = JSON.parse(res);
                        }
                        catch (e) {
                            if (e instanceof Error) {
                                return handleError(r, e);
                            }
                        }
                    }
                }
                return settings.success?.(res, r);
            }
            handleError(r, r.responseText);
        }
    };
    if (settings.data && typeof settings.data !== 'string') {
        settings.data = JSON.stringify(settings.data);
    }
    r.send(settings.data);
}
/**
 * Get a JSON resource over XHR, also supporting CORS without preflight.
 *
 * @function Highcharts.getJSON
 *
 * @param {string} url
 * The URL to load.
 * @param {Function} success
 * The success callback. For error handling, use the `Highcharts.ajax` function
 * instead.
 */
function getJSON(url, success) {
    HttpUtilities.ajax({
        url: url,
        success: success,
        dataType: 'json',
        headers: {
            // Override the Content-Type to avoid preflight problems with CORS
            // in the Highcharts demos
            'Content-Type': 'text/plain'
        }
    });
}
/**
 * The post utility.
 *
 * @private
 * @function Highcharts.post
 *
 * @param {string} url
 * Post URL.
 * @param {Object} data
 * Post data.
 * @param {RequestInit} [fetchOptions]
 * Additional attributes for the post request.
 */
async function post(url, data, fetchOptions) {
    // Prepare a form to send the data
    const formData = new HttpUtilities_win.FormData();
    // Add the data to the form
    objectEach(data, function (value, name) {
        formData.append(name, value);
    });
    formData.append('b64', 'true');
    // Send the POST
    const response = await HttpUtilities_win.fetch(url, {
        method: 'POST',
        body: formData,
        ...fetchOptions
    });
    // Check the response
    if (response.ok) {
        // Get the text from the response
        const text = await response.text();
        // Prepare self-click link with the Base64 representation
        const link = document.createElement('a');
        link.href = `data:${data.type};base64,${text}`;
        link.download = data.filename;
        link.click();
        // Remove the link
        discardElement(link);
    }
}
/* *
 *
 *  Default Export
 *
 * */
const HttpUtilities = {
    ajax,
    getJSON,
    post
};
/* harmony default export */ const Core_HttpUtilities = (HttpUtilities);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @interface Highcharts.AjaxSettingsObject
 */ /**
* The payload to send.
*
* @name Highcharts.AjaxSettingsObject#data
* @type {string | Highcharts.Dictionary<any> | undefined}
*/ /**
* The data type expected.
*
* @name Highcharts.AjaxSettingsObject#dataType
* @type {"json" | "xml" | "text" | "octet" | undefined}
*/ /**
* Function to call on error.
*
* @name Highcharts.AjaxSettingsObject#error
* @type {Function | undefined}
*/ /**
* The headers; keyed on header name.
*
* @name Highcharts.AjaxSettingsObject#headers
* @type {Highcharts.Dictionary<string> | undefined}
*/ /**
* Function to call on success.
*
* @name Highcharts.AjaxSettingsObject#success
* @type {Function | undefined}
*/ /**
* The HTTP method to use. For example GET or POST.
*
* @name Highcharts.AjaxSettingsObject#type
* @type {string | undefined}
*/ /**
* The URL to call.
*
* @name Highcharts.AjaxSettingsObject#url
* @type {string}
*/
(''); // Keeps doclets above in JS file

;// ./code/es-modules/Extensions/Exporting/Exporting.js
/* *
 *
 *  Exporting module
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { defaultOptions, setOptions } = (external_highcharts_src_js_default_default());

const { downloadURL: Exporting_downloadURL, getScript: Exporting_getScript } = Extensions_DownloadURL;




const { composed: Exporting_composed, doc: Exporting_doc, isFirefox, isMS, isSafari: Exporting_isSafari, SVG_NS, win: Exporting_win } = (external_highcharts_src_js_default_default());


const { addEvent: Exporting_addEvent, clearTimeout: Exporting_clearTimeout, createElement, css, discardElement: Exporting_discardElement, error: Exporting_error, extend, find, fireEvent: Exporting_fireEvent, isObject, merge, objectEach: Exporting_objectEach, pick, pushUnique: Exporting_pushUnique, removeEvent, splat, uniqueKey } = (external_highcharts_src_js_default_default());
external_highcharts_src_js_default_AST_default().allowedAttributes.push('data-z-index', 'fill-opacity', 'filter', 'preserveAspectRatio', 'rx', 'ry', 'stroke-dasharray', 'stroke-linejoin', 'stroke-opacity', 'text-anchor', 'transform', 'transform-origin', 'version', 'viewBox', 'visibility', 'xmlns', 'xmlns:xlink');
external_highcharts_src_js_default_AST_default().allowedTags.push('desc', 'clippath', 'fedropshadow', 'femorphology', 'g', 'image');
/* *
 *
 *  Constants
 *
 * */
const Exporting_domurl = Exporting_win.URL || Exporting_win.webkitURL || Exporting_win;
/* *
 *
 *  Class
 *
 * */
/**
 * The Exporting class provides methods for exporting charts to images. If the
 * exporting module is loaded, this class is instantiated on the chart and
 * available through the `chart.exporting` property. Read more about the
 * [exporting module](https://www.highcharts.com/docs/export-module-overview).
 *
 * @class
 * @name Highcharts.Exporting
 *
 * @param {Highcharts.Chart} chart
 * The chart instance.
 *
 */
class Exporting {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(chart, options) {
        this.options = {};
        this.chart = chart;
        this.options = options;
        this.btnCount = 0;
        this.buttonOffset = 0;
        this.divElements = [];
        this.svgElements = [];
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Make hyphenated property names out of camelCase.
     *
     * @private
     * @static
     * @function Highcharts.Exporting#hyphenate
     *
     * @param {string} property
     * Property name in camelCase.
     *
     * @return {string}
     * Hyphenated property name.
     *
     * @requires modules/exporting
     */
    static hyphenate(property) {
        return property.replace(/[A-Z]/g, function (match) {
            return '-' + match.toLowerCase();
        });
    }
    /**
     * Get data:URL from image URL.
     *
     * @private
     * @static
     * @async
     * @function Highcharts.Exporting#imageToDataURL
     *
     * @param {string} imageURL
     * The address or URL of the image.
     * @param {number} scale
     * The scale of the image.
     * @param {string} imageType
     * The export type of the image.
     *
     * @requires modules/exporting
     */
    static async imageToDataURL(imageURL, scale, imageType) {
        // First, wait for the image to be loaded
        const img = await Exporting.loadImage(imageURL), canvas = Exporting_doc.createElement('canvas'), ctx = canvas?.getContext('2d');
        if (!ctx) {
            throw new Error('No canvas found!');
        }
        else {
            canvas.height = img.height * scale;
            canvas.width = img.width * scale;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // Now we try to get the contents of the canvas
            return canvas.toDataURL(imageType);
        }
    }
    /**
     * Loads an image from the provided URL.
     *
     * @private
     * @static
     * @function Highcharts.Exporting#loadImage
     *
     * @param {string} imageURL
     * The address or URL of the image.
     *
     * @return {Promise<HTMLImageElement>}
     * Returns a Promise that resolves with the loaded HTMLImageElement.
     *
     * @requires modules/exporting
     */
    static loadImage(imageURL) {
        return new Promise((resolve, reject) => {
            // Create an image
            const image = new Exporting_win.Image();
            // Must be set prior to loading image source
            image.crossOrigin = 'Anonymous';
            // Return the image in case of success
            image.onload = () => {
                // IE bug where image is not always ready despite load event
                setTimeout(() => {
                    resolve(image);
                }, Exporting.loadEventDeferDelay);
            };
            // Reject in case of fail
            image.onerror = (error) => {
                reject(error);
            };
            // Provide the image URL
            image.src = imageURL;
        });
    }
    /**
     * Prepares and returns the image export options with default values where
     * necessary.
     *
     * @private
     * @static
     * @function Highcharts.Exporting#prepareImageOptions
     *
     * @param {Highcharts.ExportingOptions} exportingOptions
     * The exporting options.
     *
     * @return {Exporting.ImageOptions}
     * The finalized image export options with ensured values.
     *
     * @requires modules/exporting
     */
    static prepareImageOptions(exportingOptions) {
        const type = exportingOptions?.type || 'image/png', libURL = (exportingOptions?.libURL ||
            defaultOptions.exporting?.libURL);
        return {
            type,
            filename: ((exportingOptions?.filename || 'chart') +
                '.' +
                (type === 'image/svg+xml' ? 'svg' : type.split('/')[1])),
            scale: exportingOptions?.scale || 1,
            // Allow libURL to end with or without fordward slash
            libURL: libURL?.slice(-1) !== '/' ? libURL + '/' : libURL
        };
    }
    /**
     * A collection of fixes on the produced SVG to account for expand
     * properties and browser bugs. Returns a cleaned SVG.
     *
     * @private
     * @static
     * @function Highcharts.Exporting#sanitizeSVG
     *
     * @param {string} svg
     * SVG code to sanitize.
     * @param {Highcharts.Options} options
     * Chart options to apply.
     *
     * @return {string}
     * Sanitized SVG code.
     *
     * @requires modules/exporting
     */
    static sanitizeSVG(svg, options) {
        const split = svg.indexOf('</svg>') + 6, useForeignObject = svg.indexOf('<foreignObject') > -1;
        let html = svg.substr(split);
        // Remove any HTML added to the container after the SVG (#894, #9087)
        svg = svg.substr(0, split);
        if (useForeignObject) {
            // Some tags needs to be closed in xhtml (#13726)
            svg = svg.replace(/(<(?:img|br).*?(?=\>))>/g, '$1 />');
            // Move HTML into a foreignObject
        }
        else if (html && options?.exporting?.allowHTML) {
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
        svg = svg
            .replace(/zIndex="[^"]+"/g, '')
            .replace(/symbolName="[^"]+"/g, '')
            .replace(/jQuery\d+="[^"]+"/g, '')
            .replace(/url\(("|&quot;)(.*?)("|&quot;)\;?\)/g, 'url($2)')
            .replace(/url\([^#]+#/g, 'url(#')
            .replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ')
            .replace(/ (NS\d+\:)?href=/g, ' xlink:href=') // #3567
            .replace(/\n+/g, ' ')
            // Replace HTML entities, issue #347
            .replace(/&nbsp;/g, '\u00A0') // No-break space
            .replace(/&shy;/g, '\u00AD'); // Soft hyphen
        return svg;
    }
    /**
     * Get blob URL from SVG code. Falls back to normal data URI.
     *
     * @private
     * @static
     * @function Highcharts.Exporting#svgToDataURL
     *
     * @param {string} svg
     * SVG to get the URL from.
     *
     * @return {string}
     * The data URL.
     *
     * @requires modules/exporting
     */
    static svgToDataURL(svg) {
        // Webkit and not chrome
        const userAgent = Exporting_win.navigator.userAgent;
        const webKit = (userAgent.indexOf('WebKit') > -1 &&
            userAgent.indexOf('Chrome') < 0);
        try {
            // Safari requires data URI since it doesn't allow navigation to
            // blob URLs. ForeignObjects also don't work well in Blobs in Chrome
            // (#14780).
            if (!webKit && svg.indexOf('<foreignObject') === -1) {
                return Exporting_domurl.createObjectURL(new Exporting_win.Blob([svg], {
                    type: 'image/svg+xml;charset-utf-16'
                }));
            }
        }
        catch {
            // Ignore
        }
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Add the export button to the chart, with options.
     *
     * @private
     * @function Highcharts.Exporting#addButton
     *
     * @param {Highcharts.ExportingButtonOptions} options
     * The exporting button options object.
     *
     * @requires modules/exporting
     */
    addButton(options) {
        const exporting = this, chart = exporting.chart, renderer = chart.renderer, btnOptions = merge(chart.options.navigation?.buttonOptions, options), onclick = btnOptions.onclick, menuItems = btnOptions.menuItems, symbolSize = btnOptions.symbolSize || 12;
        let symbol;
        if (btnOptions.enabled === false || !btnOptions.theme) {
            return;
        }
        const theme = chart.styledMode ? {} : btnOptions.theme;
        let callback = (() => { });
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
                exporting.contextMenu(button.menuClassName, menuItems, button.translateX || 0, button.translateY || 0, button.width || 0, button.height || 0, button);
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
            .button(btnOptions.text || '', 0, 0, callback, theme, void 0, void 0, void 0, void 0, btnOptions.useHTML)
            .addClass(options.className || '')
            .attr({
            title: pick(chart.options.lang[(btnOptions._titleKey ||
                btnOptions.titleKey)], '')
        });
        button.menuClassName = (options.menuClassName ||
            'highcharts-menu-' + exporting.btnCount++);
        if (btnOptions.symbol) {
            symbol = renderer
                .symbol(btnOptions.symbol, Math.round((btnOptions.symbolX || 0) - (symbolSize / 2)), Math.round((btnOptions.symbolY || 0) - (symbolSize / 2)), symbolSize, symbolSize, 
            // If symbol is an image, scale it (#7957)
            {
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
            .add(exporting.group)
            .align(extend(btnOptions, {
            width: button.width,
            x: pick(btnOptions.x, exporting.buttonOffset) // #1654
        }), true, 'spacingBox');
        exporting.buttonOffset += (((button.width || 0) + (btnOptions.buttonSpacing || 0)) *
            (btnOptions.align === 'right' ? -1 : 1));
        exporting.svgElements.push(button, symbol);
    }
    /**
     * Clean up after printing a chart.
     *
     * @private
     * @function Highcharts.Exporting#afterPrint
     *
     * @emits Highcharts.Chart#event:afterPrint
     *
     * @requires modules/exporting
     */
    afterPrint() {
        const chart = this.chart;
        if (!this.printReverseInfo) {
            return void 0;
        }
        const { childNodes, origDisplay, resetParams } = this.printReverseInfo;
        // Put the chart back in
        this.moveContainers(chart.renderTo);
        // Restore all body content
        [].forEach.call(childNodes, function (node, i) {
            if (node.nodeType === 1) {
                node.style.display = (origDisplay[i] || '');
            }
        });
        this.isPrinting = false;
        // Reset printMaxWidth
        if (resetParams) {
            chart.setSize.apply(chart, resetParams);
        }
        delete this.printReverseInfo;
        Exporting.printingChart = void 0;
        Exporting_fireEvent(chart, 'afterPrint');
    }
    /**
     * Prepare chart and document before printing a chart.
     *
     * @private
     * @function Highcharts.Exporting#beforePrint
     *
     * @emits Highcharts.Chart#event:beforePrint
     *
     * @requires modules/exporting
     */
    beforePrint() {
        const chart = this.chart, body = Exporting_doc.body, printMaxWidth = this.options.printMaxWidth, printReverseInfo = {
            childNodes: body.childNodes,
            origDisplay: [],
            resetParams: void 0
        };
        this.isPrinting = true;
        chart.pointer?.reset(void 0, 0);
        Exporting_fireEvent(chart, 'beforePrint');
        // Handle printMaxWidth
        if (printMaxWidth && chart.chartWidth > printMaxWidth) {
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
        this.moveContainers(body);
        // Storage details for undo action after printing
        this.printReverseInfo = printReverseInfo;
    }
    /**
     * Display a popup menu for choosing the export type.
     *
     * @private
     * @function Highcharts.Exporting#contextMenu
     *
     * @param {string} className
     * An identifier for the menu.
     * @param {Array<(string | Highcharts.ExportingMenuObject)>} items
     * A collection with text and onclicks for the items.
     * @param {number} x
     * The x position of the opener button.
     * @param {number} y
     * The y position of the opener button.
     * @param {number} width
     * The width of the opener button.
     * @param {number} height
     * The height of the opener button.
     * @param {SVGElement} button
     * The SVG button element.
     *
     * @emits Highcharts.Chart#event:exportMenuHidden
     * @emits Highcharts.Chart#event:exportMenuShown
     *
     * @requires modules/exporting
     */
    contextMenu(className, items, x, y, width, height, button) {
        const exporting = this, chart = exporting.chart, navOptions = chart.options.navigation, chartWidth = chart.chartWidth, chartHeight = chart.chartHeight, cacheName = 'cache-' + className, 
        // For mouse leave detection
        menuPadding = Math.max(width, height);
        let innerMenu, menu = chart[cacheName];
        // Create the menu only the first time
        if (!menu) {
            // Create a HTML element above the SVG
            exporting.contextMenuEl = chart[cacheName] = menu =
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
                    MozBoxShadow: '3px 3px 10px #0008',
                    WebkitBoxShadow: '3px 3px 10px #0008',
                    boxShadow: '3px 3px 10px #0008'
                }, navOptions?.menuStyle || {}));
            }
            // Hide on mouse out
            menu.hideMenu = function () {
                css(menu, { display: 'none' });
                if (button) {
                    button.setState(0);
                }
                if (chart.exporting) {
                    chart.exporting.openMenu = false;
                }
                // #10361, #9998
                css(chart.renderTo, { overflow: 'hidden' });
                css(chart.container, { overflow: 'hidden' });
                Exporting_clearTimeout(menu.hideTimer);
                Exporting_fireEvent(chart, 'exportMenuHidden');
            };
            // Hide the menu some time after mouse leave (#1357)
            exporting.events?.push(Exporting_addEvent(menu, 'mouseleave', function () {
                menu.hideTimer = Exporting_win.setTimeout(menu.hideMenu, 500);
            }), Exporting_addEvent(menu, 'mouseenter', function () {
                Exporting_clearTimeout(menu.hideTimer);
            }), 
            // Hide it on clicking or touching outside the menu (#2258,
            // #2335, #2407)
            Exporting_addEvent(Exporting_doc, 'mouseup', function (e) {
                if (!chart.pointer?.inClass(e.target, className)) {
                    menu.hideMenu();
                }
            }), Exporting_addEvent(menu, 'click', function () {
                if (chart.exporting?.openMenu) {
                    menu.hideMenu();
                }
            }));
            // Create the items
            items.forEach(function (item) {
                if (typeof item === 'string') {
                    if (exporting.options.menuItemDefinitions?.[item]) {
                        item = exporting.options.menuItemDefinitions[item];
                    }
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
                            exporting.isDataTableVisible) {
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
                                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                    item.onclick.apply(chart, arguments);
                                }
                            }
                        }, void 0, innerMenu);
                        external_highcharts_src_js_default_AST_default().setElementHTML(element, item.text || chart.options.lang[item.textKey]);
                        if (!chart.styledMode) {
                            element.onmouseover = function () {
                                css(this, navOptions?.menuItemHoverStyle || {});
                            };
                            element.onmouseout = function () {
                                css(this, navOptions?.menuItemStyle || {});
                            };
                            css(element, extend({
                                cursor: 'pointer'
                            }, navOptions?.menuItemStyle || {}));
                        }
                    }
                    // Keep references to menu divs to be able to destroy them
                    exporting.divElements.push(element);
                }
            });
            // Keep references to menu and innerMenu div to be able to destroy
            // them
            exporting.divElements.push(innerMenu, menu);
            exporting.menuHeight = menu.offsetHeight;
            exporting.menuWidth = menu.offsetWidth;
        }
        const menuStyle = { display: 'block' };
        // If outside right, right align it
        if (x + (exporting.menuWidth || 0) > chartWidth) {
            menuStyle.right = (chartWidth - x - width - menuPadding) + 'px';
        }
        else {
            menuStyle.left = (x - menuPadding) + 'px';
        }
        // If outside bottom, bottom align it
        if (y + height + (exporting.menuHeight || 0) >
            chartHeight &&
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
        if (chart.exporting) {
            chart.exporting.openMenu = true;
        }
        Exporting_fireEvent(chart, 'exportMenuShown');
    }
    /**
     * Destroy the export buttons.
     *
     * @private
     * @function Highcharts.Exporting#destroy
     *
     * @param {global.Event} [e]
     * Event object.
     *
     * @requires modules/exporting
     */
    destroy(e) {
        const exporting = this, chart = e ? e.target : exporting.chart, { divElements, events, svgElements } = exporting;
        let cacheName;
        // Destroy the extra buttons added
        svgElements.forEach((elem, i) => {
            // Destroy and null the svg elements
            if (elem) { // #1822
                elem.onclick = elem.ontouchstart = null;
                cacheName = 'cache-' + elem.menuClassName;
                if (chart[cacheName]) {
                    delete chart[cacheName];
                }
                svgElements[i] = elem.destroy();
            }
        });
        svgElements.length = 0;
        // Destroy the exporting group
        if (exporting.group) {
            exporting.group.destroy();
            delete exporting.group;
        }
        // Destroy the divs for the menu
        divElements.forEach(function (elem, i) {
            if (elem) {
                // Remove the event handler
                Exporting_clearTimeout(elem.hideTimer); // #5427
                removeEvent(elem, 'mouseleave');
                // Remove inline events
                divElements[i] =
                    elem.onmouseout =
                        elem.onmouseover =
                            elem.ontouchstart =
                                elem.onclick = null;
                // Destroy the div by moving to garbage bin
                Exporting_discardElement(elem);
            }
        });
        divElements.length = 0;
        if (events) {
            events.forEach(function (unbind) {
                unbind();
            });
            events.length = 0;
        }
    }
    /**
     * Get data URL to an image of an SVG and call download on its options
     * object:
     *
     * - **filename:** Name of resulting downloaded file without extension.
     * Default is based on the chart title.
     * - **type:** File type of resulting download. Default is `image/png`.
     * - **scale:** Scaling factor of downloaded image compared to source.
     * Default is `2`.
     * - **libURL:** URL pointing to location of dependency scripts to download
     * on demand. Default is the exporting.libURL option of the global
     * Highcharts options pointing to our server.
     *
     * @async
     * @private
     * @function Highcharts.Exporting#downloadSVG
     *
     * @param {string} svg
     * The generated SVG.
     * @param {Highcharts.ExportingOptions} exportingOptions
     * The exporting options.
     *
     * @requires modules/exporting
     */
    // eslint-disable-next-line @typescript-eslint/require-await
    async downloadSVG(svg, exportingOptions) {
        const eventArgs = {
            svg,
            exportingOptions,
            exporting: this
        };
        // Fire a custom event before the export starts
        Exporting_fireEvent(Exporting.prototype, 'downloadSVG', eventArgs);
        // If the event was prevented, do not proceed with the export
        if (eventArgs.defaultPrevented) {
            return;
        }
        // Get the final image options
        const { type, filename, scale, libURL } = Exporting.prepareImageOptions(exportingOptions);
        let svgURL;
        // Initiate download depending on file type
        if (type === 'application/pdf') {
            // Error in case of offline-exporting module is not loaded
            throw new Error('Offline exporting logic for PDF type is not found.');
        }
        else if (type === 'image/svg+xml') {
            // SVG download. In this case, we want to use Microsoft specific
            // Blob if available
            if (typeof Exporting_win.MSBlobBuilder !== 'undefined') {
                const blob = new Exporting_win.MSBlobBuilder();
                blob.append(svg);
                svgURL = blob.getBlob('image/svg+xml');
            }
            else {
                svgURL = Exporting.svgToDataURL(svg);
            }
            // Download the chart
            Exporting_downloadURL(svgURL, filename);
        }
        else {
            // PNG/JPEG download - create bitmap from SVG
            svgURL = Exporting.svgToDataURL(svg);
            try {
                Exporting.objectURLRevoke = true;
                // First, try to get PNG by rendering on canvas
                const dataURL = await Exporting.imageToDataURL(svgURL, scale, type);
                Exporting_downloadURL(dataURL, filename);
            }
            catch (error) {
                // No need for the below logic to run in case no canvas is
                // found
                if (error.message === 'No canvas found!') {
                    throw error;
                }
                // Or in case of exceeding the input length
                if (svg.length > 100000000 /* RegexLimits.svgLimit */) {
                    throw new Error('Input too long');
                }
                // Failed due to tainted canvas
                // Create new and untainted canvas
                const canvas = Exporting_doc.createElement('canvas'), ctx = canvas.getContext('2d'), matchedImageWidth = svg.match(
                // eslint-disable-next-line max-len
                /^<svg[^>]*\s{,1000}width\s{,1000}=\s{,1000}\"?(\d+)\"?[^>]*>/), matchedImageHeight = svg.match(
                // eslint-disable-next-line max-len
                /^<svg[^>]*\s{0,1000}height\s{,1000}=\s{,1000}\"?(\d+)\"?[^>]*>/);
                if (ctx &&
                    matchedImageWidth &&
                    matchedImageHeight) {
                    const imageWidth = +matchedImageWidth[1] * scale, imageHeight = +matchedImageHeight[1] * scale, downloadWithCanVG = () => {
                        const v = Exporting_win.canvg.Canvg.fromString(ctx, svg);
                        v.start();
                        Exporting_downloadURL(Exporting_win.navigator.msSaveOrOpenBlob ?
                            canvas.msToBlob() :
                            canvas.toDataURL(type), filename);
                    };
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;
                    // Must load canVG first if not found. Don't destroy the
                    // object URL yet since we are doing things
                    // asynchronously
                    if (!Exporting_win.canvg) {
                        Exporting.objectURLRevoke = true;
                        await Exporting_getScript(libURL + 'canvg.js');
                    }
                    // Use loaded canvg
                    downloadWithCanVG();
                }
            }
            finally {
                if (Exporting.objectURLRevoke) {
                    try {
                        Exporting_domurl.revokeObjectURL(svgURL);
                    }
                    catch {
                        // Ignore
                    }
                }
            }
        }
    }
    /**
     * Submit an SVG version of the chart along with some parameters for local
     * conversion (PNG, JPEG, and SVG) or conversion on a server (PDF).
     *
     * @sample highcharts/members/chart-exportchart/
     * Export with no options
     * @sample highcharts/members/chart-exportchart-filename/
     * PDF type and custom filename
     * @sample highcharts/exporting/menuitemdefinitions-webp/
     * Export to WebP
     * @sample highcharts/members/chart-exportchart-custom-background/
     * Different chart background in export
     * @sample stock/members/chart-exportchart/
     * Export with Highcharts Stock
     *
     * @async
     * @function Highcharts.Exporting#exportChart
     *
     * @param {Highcharts.ExportingOptions} [exportingOptions]
     * Exporting options in addition to those defined in
     * [exporting](https://api.highcharts.com/highcharts/exporting).
     * @param {Highcharts.Options} [chartOptions]
     * Additional chart options for the exported chart. For example a different
     * background color can be added here, or `dataLabels` for export only.
     *
     * @requires modules/exporting
     */
    async exportChart(exportingOptions, chartOptions) {
        // Merge the options
        exportingOptions = merge(this.options, exportingOptions);
        // If local if expected
        if (exportingOptions.local) {
            // Trigger the local export logic
            await this.localExport(exportingOptions, chartOptions || {});
        }
        else {
            // Get the SVG representation
            const svg = this.getSVGForExport(exportingOptions, chartOptions);
            // Do the post
            if (exportingOptions.url) {
                await Core_HttpUtilities.post(exportingOptions.url, {
                    filename: exportingOptions.filename ?
                        exportingOptions.filename.replace(/\//g, '-') :
                        this.getFilename(),
                    type: exportingOptions.type,
                    width: exportingOptions.width,
                    scale: exportingOptions.scale,
                    svg
                }, exportingOptions.fetchOptions);
            }
        }
    }
    /**
     * Handles the fallback to the export server when a local export fails.
     *
     * @private
     * @async
     * @function Highcharts.Exporting#fallbackToServer
     *
     * @param {Highcharts.ExportingOptions} exportingOptions
     * The exporting options.
     * @param {Error} err
     * The error that caused the local export to fail.
     *
     * @return {Promise<void>}
     * A promise that resolves when the fallback process is complete.
     *
     * @requires modules/exporting
     */
    async fallbackToServer(exportingOptions, err) {
        if (exportingOptions.fallbackToExportServer === false) {
            if (exportingOptions.error) {
                exportingOptions.error(exportingOptions, err);
            }
            else {
                // Fallback disabled
                Exporting_error(28, true);
            }
        }
        else if (exportingOptions.type === 'application/pdf') {
            // The local must be false to fallback to server for PDF export
            exportingOptions.local = false;
            // Allow fallbacking to server only for PDFs that failed locally
            await this.exportChart(exportingOptions);
        }
    }
    /**
     * Return the unfiltered innerHTML of the chart container. Used as hook for
     * plugins. In styled mode, it also takes care of inlining CSS style rules.
     *
     * @see Chart#getSVG
     *
     * @function Highcharts.Exporting#getChartHTML
     *
     * @param {boolean} [applyStyleSheets]
     * whether or not to apply the style sheets.
     *
     * @return {string}
     * The unfiltered SVG of the chart.
     *
     * @requires modules/exporting
     */
    getChartHTML(applyStyleSheets) {
        const chart = this.chart;
        if (applyStyleSheets) {
            this.inlineStyles();
        }
        this.resolveCSSVariables();
        return chart.container.innerHTML;
    }
    /**
     * Get the default file name used for exported charts. By default it creates
     * a file name based on the chart title.
     *
     * @function Highcharts.Exporting#getFilename
     *
     * @return {string}
     * A file name without extension.
     *
     * @requires modules/exporting
     */
    getFilename() {
        const titleText = this.chart.userOptions.title?.text;
        let filename = this.options.filename;
        if (filename) {
            return filename.replace(/\//g, '-');
        }
        if (typeof titleText === 'string') {
            filename = titleText
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
     * View the SVG from a button
     *
     * @function Highcharts.Exporting#getSVG
     *
     * @param {Highcharts.Options} [chartOptions]
     * Additional chart options for the generated SVG representation. For
     * collections like `xAxis`, `yAxis` or `series`, the additional options is
     * either merged in to the original item of the same `id`, or to the first
     * item if a common id is not found.
     *
     * @return {string}
     * The SVG representation of the rendered chart.
     *
     * @emits Highcharts.Chart#event:getSVG
     *
     * @requires modules/exporting
     */
    getSVG(chartOptions) {
        const chart = this.chart;
        let svg, seriesOptions, 
        // Copy the options and add extra options
        options = merge(chart.options, chartOptions);
        // Use userOptions to make the options chain in series right (#3881)
        options.plotOptions = merge(chart.userOptions.plotOptions, chartOptions?.plotOptions);
        // ... and likewise with time, avoid that undefined time properties are
        // merged over legacy global time options
        options.time = merge(chart.userOptions.time, chartOptions?.time);
        // Create a sandbox where a new chart will be generated
        const sandbox = createElement('div', void 0, {
            position: 'absolute',
            top: '-9999em',
            width: chart.chartWidth + 'px',
            height: chart.chartHeight + 'px'
        }, Exporting_doc.body);
        // Get the source size
        const cssWidth = chart.renderTo.style.width, cssHeight = chart.renderTo.style.height, sourceWidth = options.exporting?.sourceWidth ||
            options.chart.width ||
            (/px$/.test(cssWidth) && parseInt(cssWidth, 10)) ||
            (options.isGantt ? 800 : 600), sourceHeight = options.exporting?.sourceHeight ||
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
        if (options.exporting) {
            options.exporting.enabled = false; // Hide buttons in print
        }
        delete options.data; // #3004
        // Prepare for replicating the chart
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
                options?.series?.push(seriesOptions);
            }
        });
        const colls = {};
        chart.axes.forEach(function (axis) {
            // Assign an internal key to ensure a one-to-one mapping (#5924)
            if (!axis.userOptions.internalKey) { // #6444
                axis.userOptions.internalKey = uniqueKey();
            }
            if (options && !axis.options.isInternal) {
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
                if (chartOptions[coll]) {
                    chartCopy.update({
                        [coll]: chartOptions[coll]
                    });
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
        svg = chartCopy.exporting?.getChartHTML(chart.styledMode ||
            options.exporting?.applyStyleSheets) || '';
        Exporting_fireEvent(chart, 'getSVG', { chartCopy: chartCopy });
        svg = Exporting.sanitizeSVG(svg, options);
        // Free up memory
        options = void 0;
        chartCopy.destroy();
        Exporting_discardElement(sandbox);
        return svg;
    }
    /**
     * Gets the SVG for export using the getSVG function with additional
     * options.
     *
     * @private
     * @function Highcharts.Exporting#getSVGForExport
     *
     * @param {Highcharts.ExportingOptions} [exportingOptions]
     * The exporting options.
     * @param {Highcharts.Options} [chartOptions]
     * Additional chart options for the exported chart.
     *
     * @return {string}
     * The SVG representation of the rendered chart.
     *
     * @requires modules/exporting
     */
    getSVGForExport(exportingOptions, chartOptions) {
        const currentExportingOptions = this.options;
        return this.getSVG(merge({ chart: { borderRadius: 0 } }, currentExportingOptions.chartOptions, chartOptions, {
            exporting: {
                sourceWidth: (exportingOptions?.sourceWidth ||
                    currentExportingOptions.sourceWidth),
                sourceHeight: (exportingOptions?.sourceHeight ||
                    currentExportingOptions.sourceHeight)
            }
        }));
    }
    /**
     * Analyze inherited styles from stylesheets and add them inline.
     *
     * @private
     * @function Highcharts.Exporting#inlineStyles
     *
     * @todo What are the border styles for text about? In general, text has a
     * lot of properties.
     *
     * @todo Make it work with IE9 and IE10.
     *
     * @requires modules/exporting
     */
    inlineStyles() {
        const denylist = Exporting.inlineDenylist, allowlist = Exporting.inlineAllowlist, // For IE
        defaultStyles = {};
        let dummySVG;
        // Create an iframe where we read default styles without pollution from
        // this body
        const iframe = createElement('iframe', void 0, {
            width: '1px',
            height: '1px',
            visibility: 'hidden'
        }, Exporting_doc.body);
        const iframeDoc = iframe.contentWindow?.document;
        if (iframeDoc) {
            iframeDoc.body.appendChild(iframeDoc.createElementNS(SVG_NS, 'svg'));
        }
        /**
         * Call this on all elements and recurse to children.
         *
         * @private
         * @function recurse
         *
         * @param {Highcharts.HTMLDOMElement | Highcharts.SVGSVGElement} node
         * Element child.
         */
        function recurse(node) {
            const filteredStyles = {};
            let styles, parentStyles, dummy, denylisted, allowlisted, i;
            /**
             * Check computed styles and whether they are in the allow/denylist
             * for styles or attributes.
             *
             * @private
             * @function filterStyles
             *
             * @param {string | number | Highcharts.GradientColor | Highcharts.PatternObject | undefined} val
             * Style value.
             * @param {string} prop
             * Style property name.
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
                        (defaultStyles[node.nodeName])[prop] !== val) {
                        // Attributes
                        if (!Exporting.inlineToAttributes ||
                            Exporting.inlineToAttributes.indexOf(prop) !== -1) {
                            if (val) {
                                node.setAttribute(Exporting.hyphenate(prop), val);
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
                Exporting.unstyledElements.indexOf(node.nodeName) === -1) {
                styles =
                    Exporting_win.getComputedStyle(node, null);
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
                    dummySVG =
                        iframeDoc.getElementsByTagName('svg')[0];
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
                    isFirefox ||
                        isMS ||
                        Exporting_isSafari || // #16902
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
         * Remove the dummy objects used to get defaults.
         *
         * @private
         * @function tearDown
         */
        function tearDown() {
            dummySVG.parentNode.removeChild(dummySVG);
            // Remove trash from DOM that stayed after each exporting
            iframe.parentNode.removeChild(iframe);
        }
        recurse(this.chart.container.querySelector('svg'));
        tearDown();
    }
    /**
     * Get SVG of chart prepared for client side export. This converts embedded
     * images in the SVG to data URIs. It requires the regular exporting module.
     * The options and chartOptions arguments are passed to the getSVGForExport
     * function.
     *
     * @private
     * @async
     * @function Highcharts.Exporting#localExport
     *
     * @param {Highcharts.ExportingOptions} exportingOptions
     * The exporting options.
     * @param {Highcharts.Options} chartOptions
     * Additional chart options for the exported chart.
     *
     * @return {Promise<string>}
     * The sanitized SVG.
     *
     * @requires modules/exporting
     */
    async localExport(exportingOptions, chartOptions) {
        const chart = this.chart, exporting = this, 
        // After grabbing the SVG of the chart's copy container we need
        // to do sanitation on the SVG
        sanitize = (svg) => Exporting.sanitizeSVG(svg || '', chartCopyOptions), 
        // Return true if the SVG contains images with external data.
        // With the boost module there are `image` elements with encoded
        // PNGs, these are supported by svg2pdf and should pass (#10243)
        hasExternalImages = function () {
            return [].some.call(chart.container.getElementsByTagName('image'), function (image) {
                const href = image.getAttribute('href');
                return (href !== '' &&
                    typeof href === 'string' &&
                    href.indexOf('data:') !== 0);
            });
        };
        let chartCopyContainer, chartCopyOptions, href = null, images;
        // If we are on IE and in styled mode, add an allowlist to the
        // renderer for inline styles that we want to pass through. There
        // are so many styles by default in IE that we don't want to
        // denylist them all
        if (isMS && chart.styledMode && !Exporting.inlineAllowlist.length) {
            Exporting.inlineAllowlist.push(/^blockSize/, /^border/, /^caretColor/, /^color/, /^columnRule/, /^columnRuleColor/, /^cssFloat/, /^cursor/, /^fill$/, /^fillOpacity/, /^font/, /^inlineSize/, /^length/, /^lineHeight/, /^opacity/, /^outline/, /^parentRule/, /^rx$/, /^ry$/, /^stroke/, /^textAlign/, /^textAnchor/, /^textDecoration/, /^transform/, /^vectorEffect/, /^visibility/, /^x$/, /^y$/);
        }
        // Always fall back on:
        // - MS browsers: Embedded images JPEG/PNG, or any PDF
        // - Embedded images and PDF
        if ((isMS &&
            (exportingOptions.type === 'application/pdf' ||
                chart.container.getElementsByTagName('image').length &&
                    exportingOptions.type !== 'image/svg+xml')) || (exportingOptions.type === 'application/pdf' &&
            hasExternalImages())) {
            await this.fallbackToServer(exportingOptions, new Error('Image type not supported for this chart/browser.'));
            return;
        }
        // Hook into getSVG to get a copy of the chart copy's container (#8273)
        const unbindGetSVG = Exporting_addEvent(chart, 'getSVG', (e) => {
            chartCopyOptions = e.chartCopy.options;
            chartCopyContainer =
                e.chartCopy.container.cloneNode(true);
            images = chartCopyContainer && chartCopyContainer
                .getElementsByTagName('image') || [];
        });
        try {
            // Trigger hook to get chart copy
            this.getSVGForExport(exportingOptions, chartOptions);
            // Get the static array
            const imagesArray = images ? Array.from(images) : [];
            // Go through the images we want to embed
            for (const image of imagesArray) {
                href = image.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
                if (href) {
                    Exporting.objectURLRevoke = false;
                    const dataURL = await Exporting.imageToDataURL(href, exportingOptions?.scale || 1, exportingOptions?.type || 'image/png');
                    // Change image href in chart copy
                    image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataURL);
                    // Hidden, boosted series have blank href (#10243)
                }
                else {
                    image.parentNode.removeChild(image);
                }
            }
            // Sanitize the SVG
            const sanitizedSVG = sanitize(chartCopyContainer?.innerHTML);
            // Use SVG of chart copy. If SVG contains foreignObjects PDF fails
            // in all browsers and all exports except SVG will fail in IE, as
            // both CanVG and svg2pdf choke on this. Gracefully fall back.
            if (sanitizedSVG.indexOf('<foreignObject') > -1 &&
                exportingOptions.type !== 'image/svg+xml' &&
                (isMS ||
                    exportingOptions.type === 'application/pdf')) {
                throw new Error('Image type not supported for charts with embedded HTML');
            }
            else {
                // Trigger SVG download
                await exporting.downloadSVG(sanitizedSVG, extend({ filename: exporting.getFilename() }, exportingOptions));
            }
            // Return the sanitized SVG
            return sanitizedSVG;
        }
        catch (error) {
            await this.fallbackToServer(exportingOptions, error);
        }
        finally {
            // Clean up
            unbindGetSVG();
        }
    }
    /**
     * Move the chart container(s) to another div.
     *
     * @private
     * @function Highcharts.Exporting#moveContainers
     *
     * @param {Highcharts.HTMLDOMElement} moveTo
     * Move target.
     *
     * @requires modules/exporting
     */
    moveContainers(moveTo) {
        const chart = this.chart, { scrollablePlotArea } = chart;
        (
        // When scrollablePlotArea is active (#9533)
        scrollablePlotArea ?
            [
                scrollablePlotArea.fixedDiv,
                scrollablePlotArea.scrollingContainer
            ] :
            [chart.container]).forEach(function (div) {
            moveTo.appendChild(div);
        });
    }
    /**
     * Clears away other elements in the page and prints the chart as it is
     * displayed. By default, when the exporting module is enabled, a context
     * button with a drop down menu in the upper right corner accesses this
     * function.
     *
     * @sample highcharts/members/chart-print/
     * Print from a HTML button
     *
     * @function Highcharts.Exporting#print
     *
     * @emits Highcharts.Chart#event:beforePrint
     * @emits Highcharts.Chart#event:afterPrint
     *
     * @requires modules/exporting
     */
    print() {
        const chart = this.chart;
        // Block the button while in printing mode
        if (this.isPrinting) {
            return;
        }
        Exporting.printingChart = chart;
        if (!Exporting_isSafari) {
            this.beforePrint();
        }
        // Give the browser time to draw WebGL content, an issue that randomly
        // appears (at least) in Chrome ~67 on the Mac (#8708).
        setTimeout(() => {
            Exporting_win.focus(); // #1510
            Exporting_win.print();
            // Allow the browser to prepare before reverting
            if (!Exporting_isSafari) {
                setTimeout(() => {
                    chart.exporting?.afterPrint();
                }, 1000);
            }
        }, 1);
    }
    /**
     * Add the buttons on chart load.
     *
     * @private
     * @function Highcharts.Exporting#render
     *
     * @requires modules/exporting
     */
    render() {
        const exporting = this, { chart, options } = exporting, isDirty = exporting?.isDirty || !exporting?.svgElements.length;
        exporting.buttonOffset = 0;
        if (exporting.isDirty) {
            exporting.destroy();
        }
        if (isDirty && options.enabled !== false) {
            exporting.events = [];
            exporting.group || (exporting.group = chart.renderer.g('exporting-group').attr({
                zIndex: 3 // #4955, // #8392
            }).add());
            Exporting_objectEach(options?.buttons, function (button) {
                exporting.addButton(button);
            });
            exporting.isDirty = false;
        }
    }
    /**
     * Resolve CSS variables into hex colors.
     *
     * @private
     * @function Highcharts.Exporting#resolveCSSVariables
     *
     * @requires modules/exporting
     */
    resolveCSSVariables() {
        Array.from(this.chart.container.querySelectorAll('*')).forEach((element) => {
            ['color', 'fill', 'stop-color', 'stroke'].forEach((prop) => {
                const attrValue = element.getAttribute(prop);
                if (attrValue?.includes('var(')) {
                    element.setAttribute(prop, getComputedStyle(element).getPropertyValue(prop));
                }
                const styleValue = element.style?.[prop];
                if (styleValue?.includes('var(')) {
                    element.style[prop] =
                        getComputedStyle(element).getPropertyValue(prop);
                }
            });
        });
    }
    /**
     * Updates the exporting object with the provided exporting options.
     *
     * @private
     * @function Highcharts.Exporting#update
     *
     * @param {Highcharts.ExportingOptions} exportingOptions
     * The exporting options to update with.
     * @param {boolean} [redraw=true]
     * Whether to redraw or not.
     *
     * @requires modules/exporting
     */
    update(exportingOptions, redraw) {
        this.isDirty = true;
        merge(true, this.options, exportingOptions);
        if (pick(redraw, true)) {
            this.chart.redraw();
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
Exporting.inlineAllowlist = [];
// These CSS properties are not inlined. Remember camelCase.
Exporting.inlineDenylist = [
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
Exporting.inlineToAttributes = [
    'fill',
    'stroke',
    'strokeLinecap',
    'strokeLinejoin',
    'strokeWidth',
    'textAnchor',
    'x',
    'y'
];
// Milliseconds to defer image load event handlers to offset IE bug
Exporting.loadEventDeferDelay = isMS ? 150 : 0;
Exporting.unstyledElements = [
    'clipPath',
    'defs',
    'desc'
];
/* *
 *
 *  Class Namespace
 *
 * */
(function (Exporting) {
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
     * Composition function.
     *
     * @private
     * @function Highcharts.Exporting#compose
     *
     * @param {ChartClass} ChartClass
     * Chart class.
     * @param {SVGRendererClass} SVGRendererClass
     * SVGRenderer class.
     *
     * @requires modules/exporting
     */
    function compose(ChartClass, SVGRendererClass) {
        Exporting_ExportingSymbols.compose(SVGRendererClass);
        Exporting_Fullscreen.compose(ChartClass);
        // Check the composition registry for the Exporting
        if (!Exporting_pushUnique(Exporting_composed, 'Exporting')) {
            return;
        }
        // Adding wrappers for the deprecated functions
        extend((external_highcharts_src_js_default_Chart_default()).prototype, {
            exportChart: async function (exportingOptions, chartOptions) {
                await this.exporting?.exportChart(exportingOptions, chartOptions);
                return;
            },
            getChartHTML: function (applyStyleSheets) {
                return this.exporting?.getChartHTML(applyStyleSheets);
            },
            getFilename: function () {
                return this.exporting?.getFilename();
            },
            getSVG: function (chartOptions) {
                return this.exporting?.getSVG(chartOptions);
            },
            print: function () {
                return this.exporting?.print();
            }
        });
        ChartClass.prototype.callbacks.push(chartCallback);
        Exporting_addEvent(ChartClass, 'afterInit', onChartAfterInit);
        Exporting_addEvent(ChartClass, 'layOutTitle', onChartLayOutTitle);
        if (Exporting_isSafari) {
            Exporting_win.matchMedia('print').addListener(function (mqlEvent) {
                if (!Exporting.printingChart) {
                    return void 0;
                }
                if (mqlEvent.matches) {
                    Exporting.printingChart.exporting?.beforePrint();
                }
                else {
                    Exporting.printingChart.exporting?.afterPrint();
                }
            });
        }
        // Update with defaults of the exporting module
        setOptions(Exporting_ExportingDefaults);
    }
    Exporting.compose = compose;
    /**
     * Function that is added to the callbacks array that runs on chart load.
     *
     * @private
     * @function Highcharts#chartCallback
     *
     * @param {Highcharts.Chart} chart
     * The chart instance.
     *
     * @requires modules/exporting
     */
    function chartCallback(chart) {
        const exporting = chart.exporting;
        if (exporting) {
            exporting.render();
            // Add the exporting buttons on each chart redraw
            Exporting_addEvent(chart, 'redraw', function () {
                this.exporting?.render();
            });
            // Destroy the export elements at chart destroy
            Exporting_addEvent(chart, 'destroy', function () {
                this.exporting?.destroy();
            });
        }
        // Uncomment this to see a button directly below the chart, for quick
        // testing of export
        // let button, viewImage, viewSource;
        // if (!chart.renderer.forExport) {
        //     viewImage = function (): void {
        //         const div = doc.createElement('div');
        //         div.innerHTML = chart.exporting?.getSVGForExport() || '';
        //         chart.renderTo.parentNode.appendChild(div);
        //     };
        //     viewSource = function (): void {
        //         const pre = doc.createElement('pre');
        //         pre.innerHTML = chart.exporting?.getSVGForExport()
        //             .replace(/</g, '\n&lt;')
        //             .replace(/>/g, '&gt;') || '';
        //         chart.renderTo.parentNode.appendChild(pre);
        //     };
        //     viewImage();
        //     // View SVG Image
        //     button = doc.createElement('button');
        //     button.innerHTML = 'View SVG Image';
        //     chart.renderTo.parentNode.appendChild(button);
        //     button.onclick = viewImage;
        //     // View SVG Source
        //     button = doc.createElement('button');
        //     button.innerHTML = 'View SVG Source';
        //     chart.renderTo.parentNode.appendChild(button);
        //     button.onclick = viewSource;
        // }
    }
    /**
     * Add update methods to handle chart.update and chart.exporting.update and
     * chart.navigation.update. These must be added to the chart instance rather
     * than the Chart prototype in order to use the chart instance inside the
     * update function.
     *
     * @private
     * @function Highcharts#onChartAfterInit
     *
     * @requires modules/exporting
     */
    function onChartAfterInit() {
        const chart = this;
        // Create the exporting instance
        if (chart.options.exporting) {
            /**
             * Exporting object.
             *
             * @name Highcharts.Chart#exporting
             * @type {Highcharts.Exporting}
             */
            chart.exporting = new Exporting(chart, chart.options.exporting);
            // Register update() method for navigation. Cannot be set the same
            // way as for exporting, because navigation options are shared with
            // bindings which has separate update() logic.
            Chart_ChartNavigationComposition
                .compose(chart).navigation
                .addUpdate((options, redraw) => {
                if (chart.exporting) {
                    chart.exporting.isDirty = true;
                    merge(true, chart.options.navigation, options);
                    if (pick(redraw, true)) {
                        chart.redraw();
                    }
                }
            });
        }
    }
    /**
     * On layout of titles (title, subtitle and caption), adjust the `alignTo`
     * box to avoid the context menu button.
     *
     * @private
     * @function Highcharts#onChartLayOutTitle
     *
     * @requires modules/exporting
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
 * The chart on which the event occurred.
 * @param {global.Event} event
 * The event that occurred.
 */
/**
 * Gets fired before a chart is printed through the context menu item or the
 * Chart.print method.
 *
 * @callback Highcharts.ExportingBeforePrintCallbackFunction
 *
 * @param {Highcharts.Chart} this
 * The chart on which the event occurred.
 * @param {global.Event} event
 * The event that occurred.
 */
/**
 * Function to call if the offline-exporting module fails to export a chart on
 * the client side.
 *
 * @callback Highcharts.ExportingErrorCallbackFunction
 *
 * @param {Highcharts.ExportingOptions} options
 * The exporting options.
 * @param {global.Error} err
 * The error from the module.
 */
/**
 * Definition for a menu item in the context menu.
 *
 * @interface Highcharts.ExportingMenuObject
 */ /**
* The text for the menu item.
*
* @name Highcharts.ExportingMenuObject#text
* @type {string | undefined}
*/ /**
* If internationalization is required, the key to a language string.
*
* @name Highcharts.ExportingMenuObject#textKey
* @type {string | undefined}
*/ /**
* The click handler for the menu item.
*
* @name Highcharts.ExportingMenuObject#onclick
* @type {Highcharts.EventCallbackFunction<Highcharts.Chart> | undefined}
*/ /**
* Indicates a separator line instead of an item.
*
* @name Highcharts.ExportingMenuObject#separator
* @type {boolean | undefined}
*/
/**
 * Possible MIME types for exporting.
 *
 * @typedef {"image/png" | "image/jpeg" | "application/pdf" | "image/svg+xml"} Highcharts.ExportingMimeTypeValue
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
 * Rescale the chart to print
 *
 * @type {Highcharts.ExportingAfterPrintCallbackFunction}
 * @since 4.1.0
 * @context Highcharts.Chart
 * @requires modules/exporting
 * @apioption chart.events.afterPrint
 */
/**
 * Fires before a chart is printed through the context menu item or
 * the `Chart.print` method.
 *
 * @sample highcharts/chart/events-beforeprint-afterprint/
 * Rescale the chart to print
 *
 * @type {Highcharts.ExportingBeforePrintCallbackFunction}
 * @since 4.1.0
 * @context Highcharts.Chart
 * @requires modules/exporting
 * @apioption chart.events.beforePrint
 */
(''); // Keeps doclets above in transpiled file

;// ./code/es-modules/masters/modules/exporting.src.js





const G = (external_highcharts_src_js_default_default());
// Class
G.Exporting = Exporting_Exporting;
// Compatibility
G.HttpUtilities = G.HttpUtilities || Core_HttpUtilities;
G.ajax = G.HttpUtilities.ajax;
G.getJSON = G.HttpUtilities.getJSON;
G.post = G.HttpUtilities.post;
// Compose
Exporting_Exporting.compose(G.Chart, G.Renderer);
/* harmony default export */ const exporting_src = ((external_highcharts_src_js_default_default()));

export { exporting_src as default };
