/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/offline-exporting
 * @requires highcharts
 * @requires highcharts/modules/exporting
 *
 * Client side exporting module
 *
 * (c) 2015-2025 Torstein Honsi / Oystein Moseng
 *
 * License: www.highcharts.com/license
 */
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__ from "../highcharts.src.js";
import * as __WEBPACK_EXTERNAL_MODULE__exporting_src_js_3afc400f__ from "./exporting.src.js";
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

;// external ["../highcharts.src.js","default","AST"]
const external_highcharts_src_js_default_AST_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].AST;
var external_highcharts_src_js_default_AST_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_AST_namespaceObject);
;// external ["../highcharts.src.js","default","Chart"]
const external_highcharts_src_js_default_Chart_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].Chart;
var external_highcharts_src_js_default_Chart_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_Chart_namespaceObject);
;// ./code/es-modules/Extensions/OfflineExporting/OfflineExportingDefaults.js
/* *
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
 *  API Options
 *
 * */
/**
 * @optionparent exporting
 * @private
 */
const exporting = {};
/* *
 *
 *  Default Export
 *
 * */
const OfflineExportingDefaults = {
    exporting
};
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




const { getOptions, setOptions } = (external_highcharts_src_js_default_default());

const { downloadURL: OfflineExporting_downloadURL, getScript: OfflineExporting_getScript } = Extensions_DownloadURL;

const { composed, doc: OfflineExporting_doc, win: OfflineExporting_win } = (external_highcharts_src_js_default_default());


const { addEvent, extend, pushUnique } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Composition
 *
 * */
var OfflineExporting;
(function (OfflineExporting) {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Composition function.
     *
     * @private
     * @function compose
     *
     * @param {ExportingClass} ExportingClass
     * Exporting class.
     *
     * @requires modules/exporting
     * @requires modules/offline-exporting
     */
    function compose(ExportingClass) {
        // Add the downloadSVG event to the Exporting class for local PDF export
        addEvent(ExportingClass, 'downloadSVG', async function (e) {
            const { svg, exportingOptions, exporting, preventDefault } = e;
            // Check if PDF export is requested
            if (exportingOptions?.type === 'application/pdf') {
                // Prevent the default export behavior
                preventDefault?.();
                // Run the PDF local export
                try {
                    // Get the final image options
                    const { type, filename, scale, libURL } = external_highcharts_src_js_default_default().Exporting.prepareImageOptions(exportingOptions);
                    // Local PDF download
                    if (type === 'application/pdf') {
                        // Must load pdf libraries first if not found. Don't
                        // destroy the object URL yet since we are doing
                        // things asynchronously
                        if (!OfflineExporting_win.jspdf?.jsPDF) {
                            // Get jspdf
                            await OfflineExporting_getScript(`${libURL}jspdf.js`);
                            // Get svg2pdf
                            await OfflineExporting_getScript(`${libURL}svg2pdf.js`);
                        }
                        // Call the PDF download if SVG element found
                        await downloadPDF(svg, scale, filename, exportingOptions?.pdfFont);
                    }
                }
                catch (error) {
                    // Try to fallback to the server
                    await exporting?.fallbackToServer(exportingOptions, error);
                }
            }
        });
        // Check the composition registry for the OfflineExporting
        if (!pushUnique(composed, 'OfflineExporting')) {
            return;
        }
        // Adding wrappers for the deprecated functions
        extend((external_highcharts_src_js_default_Chart_default()).prototype, {
            exportChartLocal: async function (exportingOptions, chartOptions) {
                await this.exporting?.exportChart(exportingOptions, chartOptions);
                return;
            }
        });
        // Update with defaults of the offline exporting module
        setOptions(OfflineExporting_OfflineExportingDefaults);
        // Additionaly, extend the menuItems with the offline exporting variants
        const menuItems = getOptions().exporting?.buttons?.contextButton?.menuItems;
        menuItems && menuItems.push('downloadPDF');
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
     * @deprecated
     *
     * @param {string} svg
     * The generated SVG
     *
     * @param {Highcharts.ExportingOptions} options
     * The exporting options
     *
     */
    async function downloadSVGLocal(svg, options) {
        await external_highcharts_src_js_default_default().Exporting.prototype.downloadSVG.call(void 0, svg, options);
    }
    OfflineExporting.downloadSVGLocal = downloadSVGLocal;
    /**
     * Converts an SVG string into a PDF file and triggers its download. This
     * function processes the SVG, applies necessary font adjustments, converts
     * it to a PDF, and initiates the file download.
     *
     * @private
     * @async
     * @function downloadPDF
     *
     * @param {string} svg
     * A string representation of the SVG markup to be converted into a PDF.
     * @param {number} scale
     * The scaling factor for the PDF output.
     * @param {string} filename
     * The name of the downloaded PDF file.
     * @param {Highcharts.PdfFontOptions} [pdfFont]
     * An optional object specifying URLs for different font variants (normal,
     * bold, italic, bolditalic).
     *
     * @return {Promise<void>}
     * A promise that resolves when the PDF has been successfully generated and
     * downloaded.
     *
     * @requires modules/exporting
     * @requires modules/offline-exporting
     */
    async function downloadPDF(svg, scale, filename, pdfFont) {
        const svgNode = preparePDF(svg, pdfFont);
        if (svgNode) {
            // Loads all required fonts
            await loadPdfFonts(svgNode, pdfFont);
            // Transform SVG to PDF
            const pdfData = await svgToPdf(svgNode, 0, scale);
            // Download the PDF
            OfflineExporting_downloadURL(pdfData, filename);
        }
    }
    /**
     * Loads and registers custom fonts for PDF export if non-ASCII characters
     * are detected in the given SVG element. This function ensures that text
     * content with special characters is properly rendered in the exported PDF.
     *
     * It fetches font files (if provided in `pdfFont`), converts them to
     * base64, and registers them with jsPDF.
     *
     * @private
     * @function loadPdfFonts
     *
     * @param {SVGElement} svgElement
     * The generated SVG element containing the text content to be exported.
     * @param {Highcharts.PdfFontOptions} [pdfFont]
     * An optional object specifying URLs for different font variants (normal,
     * bold, italic, bolditalic). If non-ASCII characters are not detected,
     * fonts are not loaded.
     *
     * @requires modules/exporting
     * @requires modules/offline-exporting
     */
    async function loadPdfFonts(svgElement, pdfFont) {
        const hasNonASCII = (s) => (
        // eslint-disable-next-line no-control-regex
        /[^\u0000-\u007F\u200B]+/.test(s));
        // Register an event in order to add the font once jsPDF is initialized
        const addFont = (variant, base64) => {
            OfflineExporting_win.jspdf.jsPDF.API.events.push([
                'initialized',
                function () {
                    this.addFileToVFS(variant, base64);
                    this.addFont(variant, 'HighchartsFont', variant);
                    if (!this.getFontList()?.HighchartsFont) {
                        this.setFont('HighchartsFont');
                    }
                }
            ]);
        };
        // If there are no non-ASCII characters in the SVG, do not use bother
        // downloading the font files
        if (pdfFont && !hasNonASCII(svgElement.textContent || '')) {
            pdfFont = void 0;
        }
        // Add new font if the URL is declared, #6417
        const variants = ['normal', 'italic', 'bold', 'bolditalic'];
        // Shift the first element off the variants and add as a font.
        // Then asynchronously trigger the next variant until variants are empty
        let normalBase64;
        for (const variant of variants) {
            const url = pdfFont?.[variant];
            if (url) {
                try {
                    const response = await OfflineExporting_win.fetch(url);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch font: ${url}`);
                    }
                    const blob = await response.blob(), reader = new FileReader();
                    const base64 = await new Promise((resolve, reject) => {
                        reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                                resolve(reader.result.split(',')[1]);
                            }
                            else {
                                reject(new Error('Failed to read font as base64'));
                            }
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                    addFont(variant, base64);
                    if (variant === 'normal') {
                        normalBase64 = base64;
                    }
                }
                catch (e) {
                    // If fetch or reading fails, fallback to next variant
                }
            }
            else {
                // For other variants, fall back to normal text weight/style
                if (normalBase64) {
                    addFont(variant, normalBase64);
                }
            }
        }
    }
    /**
     * Prepares an SVG for PDF export by ensuring proper text styling and
     * removing unnecessary elements. This function extracts an SVG element from
     * a given SVG string, applies font styles inherited from parent elements,
     * and removes text outlines and title elements to improve PDF rendering.
     *
     * @private
     * @function preparePDF
     *
     * @param {string} svg
     * A string representation of the SVG markup.
     * @param {Highcharts.PdfFontOptions} [pdfFont]
     * An optional object specifying URLs for different font variants (normal,
     * bold, italic, bolditalic). If provided, the text elements are assigned a
     * custom PDF font.
     *
     * @return {SVGSVGElement | null}
     * Returns the parsed SVG element from the container or `null` if the SVG is
     * not found.
     *
     * @requires modules/exporting
     * @requires modules/offline-exporting
     */
    function preparePDF(svg, pdfFont) {
        const dummySVGContainer = OfflineExporting_doc.createElement('div');
        external_highcharts_src_js_default_AST_default().setElementHTML(dummySVGContainer, svg);
        const textElements = dummySVGContainer.getElementsByTagName('text'), 
        // Copy style property to element from parents if it's not there.
        // Searches up hierarchy until it finds prop, or hits the chart
        // container
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
            el.style.fontFamily = pdfFont?.normal ?
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
        return dummySVGContainer.querySelector('svg');
    }
    /**
     * Transform from PDF to SVG.
     *
     * @async
     * @private
     * @function svgToPdf
     *
     * @param {Highcharts.SVGElement} svgElement
     * The SVG element to convert.
     * @param {number} margin
     * The margin to apply.
     * @param {number} scale
     * The scale of the SVG.
     *
     * @requires modules/exporting
     * @requires modules/offline-exporting
     */
    async function svgToPdf(svgElement, margin, scale) {
        const width = (Number(svgElement.getAttribute('width')) + 2 * margin) *
            scale, height = (Number(svgElement.getAttribute('height')) + 2 * margin) *
            scale, pdfDoc = new OfflineExporting_win.jspdf.jsPDF(// eslint-disable-line new-cap
        // Setting orientation to portrait if height exceeds width
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
        // Transform from PDF to SVG
        await pdfDoc.svg(svgElement, {
            x: 0,
            y: 0,
            width,
            height,
            removeInvalid: true
        });
        // Return the output
        return pdfDoc.output('datauristring');
    }
})(OfflineExporting || (OfflineExporting = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const OfflineExporting_OfflineExporting = (OfflineExporting);

;// external "./exporting.src.js"
var x = (y) => {
	var x = {}; __webpack_require__.d(x,
    	y); return x
    } 
    var y = (x) => (() => (x))
    const external_exporting_src_js_namespaceObject = x({  });
;// ./code/es-modules/masters/modules/offline-exporting.src.js






const G = (external_highcharts_src_js_default_default());
// Compatibility
G.dataURLtoBlob = G.dataURLtoBlob || Extensions_DownloadURL.dataURLtoBlob;
G.downloadSVGLocal = OfflineExporting_OfflineExporting.downloadSVGLocal;
G.downloadURL = G.downloadURL || Extensions_DownloadURL.downloadURL;
// Compose
OfflineExporting_OfflineExporting.compose(G.Exporting);
/* harmony default export */ const offline_exporting_src = ((external_highcharts_src_js_default_default()));

export { offline_exporting_src as default };
