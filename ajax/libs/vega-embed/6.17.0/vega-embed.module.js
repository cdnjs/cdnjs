import { applyPatch } from 'fast-json-patch';
import stringify from 'json-stringify-pretty-compact';
import { satisfies } from 'semver';
import * as vegaImport from 'vega';
import { writeConfig, isString, mergeConfig, isBoolean } from 'vega';
import * as vegaLiteImport from 'vega-lite';
import schemaParser from 'vega-schema-url-parser';
import * as themes from 'vega-themes';
import { Handler } from 'vega-tooltip';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * Open editor url in a new window, and pass a message.
 */
function post (window, url, data) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const editor = window.open(url);
    const wait = 10000;
    const step = 250;
    const { origin } = new URL(url);
    // eslint-disable-next-line no-bitwise
    let count = ~~(wait / step);
    function listen(evt) {
        if (evt.source === editor) {
            count = 0;
            window.removeEventListener('message', listen, false);
        }
    }
    window.addEventListener('message', listen, false);
    // send message
    // periodically resend until ack received or timeout
    function send() {
        if (count <= 0) {
            return;
        }
        editor.postMessage(data, origin);
        setTimeout(send, step);
        count -= 1;
    }
    setTimeout(send, step);
}

// generated with build-style.sh
var embedStyle = `.vega-embed {
  position: relative;
  display: inline-block;
  box-sizing: border-box; }
  .vega-embed.has-actions {
    padding-right: 38px; }
  .vega-embed details:not([open]) > :not(summary) {
    display: none !important; }
  .vega-embed summary {
    list-style: none;
    position: absolute;
    top: 0;
    right: 0;
    padding: 6px;
    z-index: 1000;
    background: white;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    color: #1b1e23;
    border: 1px solid #aaa;
    border-radius: 999px;
    opacity: 0.2;
    transition: opacity 0.4s ease-in;
    outline: none;
    cursor: pointer;
    line-height: 0px; }
    .vega-embed summary::-webkit-details-marker {
      display: none; }
    .vega-embed summary:active {
      box-shadow: #aaa 0px 0px 0px 1px inset; }
    .vega-embed summary svg {
      width: 14px;
      height: 14px; }
  .vega-embed details[open] summary {
    opacity: 0.7; }
  .vega-embed:hover summary,
  .vega-embed:focus summary {
    opacity: 1 !important;
    transition: opacity 0.2s ease; }
  .vega-embed .vega-actions {
    position: absolute;
    z-index: 1001;
    top: 35px;
    right: -9px;
    display: flex;
    flex-direction: column;
    padding-bottom: 8px;
    padding-top: 8px;
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    border: 1px solid #d9d9d9;
    background: white;
    animation-duration: 0.15s;
    animation-name: scale-in;
    animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);
    text-align: left; }
    .vega-embed .vega-actions a {
      padding: 8px 16px;
      font-family: sans-serif;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      color: #434a56;
      text-decoration: none; }
      .vega-embed .vega-actions a:hover {
        background-color: #f7f7f9;
        color: black; }
    .vega-embed .vega-actions::before, .vega-embed .vega-actions::after {
      content: "";
      display: inline-block;
      position: absolute; }
    .vega-embed .vega-actions::before {
      left: auto;
      right: 14px;
      top: -16px;
      border: 8px solid #0000;
      border-bottom-color: #d9d9d9; }
    .vega-embed .vega-actions::after {
      left: auto;
      right: 15px;
      top: -14px;
      border: 7px solid #0000;
      border-bottom-color: #fff; }
  .vega-embed .chart-wrapper {
    width: 100%;
    height: 100%; }

.vega-embed-wrapper {
  max-width: 100%;
  overflow: auto;
  padding-right: 14px; }

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.6); }
  to {
    opacity: 1;
    transform: scale(1); } }
`;

// polyfill for IE
if (!String.prototype.startsWith) {
    // eslint-disable-next-line no-extend-native,func-names
    String.prototype.startsWith = function (search, pos) {
        return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    };
}
function mergeDeep(dest, ...src) {
    for (const s of src) {
        deepMerge_(dest, s);
    }
    return dest;
}
function deepMerge_(dest, src) {
    for (const property of Object.keys(src)) {
        writeConfig(dest, property, src[property], true);
    }
}

var _a;
const vega = vegaImport;
let vegaLite = vegaLiteImport;
// For backwards compatibility with Vega-Lite before v4.
const w = (typeof window !== 'undefined' ? window : undefined);
if (vegaLite === undefined && ((_a = w === null || w === void 0 ? void 0 : w['vl']) === null || _a === void 0 ? void 0 : _a.compile)) {
    vegaLite = w['vl'];
}
const DEFAULT_ACTIONS = { export: { svg: true, png: true }, source: true, compiled: true, editor: true };
const I18N = {
    CLICK_TO_VIEW_ACTIONS: 'Click to view actions',
    COMPILED_ACTION: 'View Compiled Vega',
    EDITOR_ACTION: 'Open in Vega Editor',
    PNG_ACTION: 'Save as PNG',
    SOURCE_ACTION: 'View Source',
    SVG_ACTION: 'Save as SVG',
};
const NAMES = {
    vega: 'Vega',
    'vega-lite': 'Vega-Lite',
};
const VERSION = {
    vega: vega.version,
    'vega-lite': vegaLite ? vegaLite.version : 'not available',
};
const PREPROCESSOR = {
    vega: (vgSpec) => vgSpec,
    'vega-lite': (vlSpec, config) => vegaLite.compile(vlSpec, { config: config }).spec,
};
const SVG_CIRCLES = `
<svg viewBox="0 0 16 16" fill="currentColor" stroke="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <circle r="2" cy="8" cx="2"></circle>
  <circle r="2" cy="8" cx="8"></circle>
  <circle r="2" cy="8" cx="14"></circle>
</svg>`;
const CHART_WRAPPER_CLASS = 'chart-wrapper';
function isTooltipHandler(h) {
    return typeof h === 'function';
}
function viewSource(source, sourceHeader, sourceFooter, mode) {
    const header = `<html><head>${sourceHeader}</head><body><pre><code class="json">`;
    const footer = `</code></pre>${sourceFooter}</body></html>`;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const win = window.open('');
    win.document.write(header + source + footer);
    win.document.title = `${NAMES[mode]} JSON Source`;
}
/**
 * Try to guess the type of spec.
 *
 * @param spec Vega or Vega-Lite spec.
 */
function guessMode(spec, providedMode) {
    var _a;
    // Decide mode
    if (spec.$schema) {
        const parsed = schemaParser(spec.$schema);
        if (providedMode && providedMode !== parsed.library) {
            console.warn(`The given visualization spec is written in ${NAMES[parsed.library]}, but mode argument sets ${(_a = NAMES[providedMode]) !== null && _a !== void 0 ? _a : providedMode}.`);
        }
        const mode = parsed.library;
        if (!satisfies(VERSION[mode], `^${parsed.version.slice(1)}`)) {
            console.warn(`The input spec uses ${NAMES[mode]} ${parsed.version}, but the current version of ${NAMES[mode]} is v${VERSION[mode]}.`);
        }
        return mode;
    }
    // try to guess from the provided spec
    if ('mark' in spec ||
        'encoding' in spec ||
        'layer' in spec ||
        'hconcat' in spec ||
        'vconcat' in spec ||
        'facet' in spec ||
        'repeat' in spec) {
        return 'vega-lite';
    }
    if ('marks' in spec || 'signals' in spec || 'scales' in spec || 'axes' in spec) {
        return 'vega';
    }
    return providedMode !== null && providedMode !== void 0 ? providedMode : 'vega';
}
function isLoader(o) {
    return !!(o && 'load' in o);
}
function createLoader(opts) {
    return isLoader(opts) ? opts : vega.loader(opts);
}
function embedOptionsFromUsermeta(parsedSpec) {
    var _a;
    return (_a = (parsedSpec.usermeta && parsedSpec.usermeta['embedOptions'])) !== null && _a !== void 0 ? _a : {};
}
/**
 * Embed a Vega visualization component in a web page. This function returns a promise.
 *
 * @param el        DOM element in which to place component (DOM node or CSS selector).
 * @param spec      String : A URL string from which to load the Vega specification.
 *                  Object : The Vega/Vega-Lite specification as a parsed JSON object.
 * @param opts       A JavaScript object containing options for embedding.
 */
function embed(el, spec, opts = {}) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let parsedSpec;
        let loader;
        if (isString(spec)) {
            loader = createLoader(opts.loader);
            parsedSpec = JSON.parse(yield loader.load(spec));
        }
        else {
            parsedSpec = spec;
        }
        const usermetaLoader = embedOptionsFromUsermeta(parsedSpec).loader;
        // either create the loader for the first time or create a new loader if the spec has new loader options
        if (!loader || usermetaLoader) {
            loader = createLoader((_a = opts.loader) !== null && _a !== void 0 ? _a : usermetaLoader);
        }
        const usermetaOpts = yield loadOpts(embedOptionsFromUsermeta(parsedSpec), loader);
        const parsedOpts = yield loadOpts(opts, loader);
        const mergedOpts = Object.assign(Object.assign({}, mergeDeep(parsedOpts, usermetaOpts)), { config: mergeConfig((_b = parsedOpts.config) !== null && _b !== void 0 ? _b : {}, (_c = usermetaOpts.config) !== null && _c !== void 0 ? _c : {}) });
        return yield _embed(el, parsedSpec, mergedOpts, loader);
    });
}
function loadOpts(opt, loader) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = isString(opt.config) ? JSON.parse(yield loader.load(opt.config)) : (_a = opt.config) !== null && _a !== void 0 ? _a : {};
        const patch = isString(opt.patch) ? JSON.parse(yield loader.load(opt.patch)) : opt.patch;
        return Object.assign(Object.assign(Object.assign({}, opt), (patch ? { patch } : {})), (config ? { config } : {}));
    });
}
function getRoot(el) {
    var _a;
    const possibleRoot = el.getRootNode ? el.getRootNode() : document;
    if (possibleRoot instanceof ShadowRoot) {
        return { root: possibleRoot, rootContainer: possibleRoot };
    }
    else {
        return { root: document, rootContainer: (_a = document.head) !== null && _a !== void 0 ? _a : document.body };
    }
}
function _embed(el, spec, opts = {}, loader) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        const config = opts.theme ? mergeConfig(themes[opts.theme], (_a = opts.config) !== null && _a !== void 0 ? _a : {}) : opts.config;
        const actions = isBoolean(opts.actions) ? opts.actions : mergeDeep({}, DEFAULT_ACTIONS, (_b = opts.actions) !== null && _b !== void 0 ? _b : {});
        const i18n = Object.assign(Object.assign({}, I18N), opts.i18n);
        const renderer = (_c = opts.renderer) !== null && _c !== void 0 ? _c : 'canvas';
        const logLevel = (_d = opts.logLevel) !== null && _d !== void 0 ? _d : vega.Warn;
        const downloadFileName = (_e = opts.downloadFileName) !== null && _e !== void 0 ? _e : 'visualization';
        const element = typeof el === 'string' ? document.querySelector(el) : el;
        if (!element) {
            throw new Error(`${el} does not exist`);
        }
        if (opts.defaultStyle !== false) {
            // Add a default stylesheet to the head of the document.
            const ID = 'vega-embed-style';
            const { root, rootContainer } = getRoot(element);
            if (!root.getElementById(ID)) {
                const style = document.createElement('style');
                style.id = ID;
                style.innerText =
                    opts.defaultStyle === undefined || opts.defaultStyle === true
                        ? (embedStyle ).toString()
                        : opts.defaultStyle;
                rootContainer.appendChild(style);
            }
        }
        const mode = guessMode(spec, opts.mode);
        let vgSpec = PREPROCESSOR[mode](spec, config);
        if (mode === 'vega-lite') {
            if (vgSpec.$schema) {
                const parsed = schemaParser(vgSpec.$schema);
                if (!satisfies(VERSION.vega, `^${parsed.version.slice(1)}`)) {
                    console.warn(`The compiled spec uses Vega ${parsed.version}, but current version is v${VERSION.vega}.`);
                }
            }
        }
        element.classList.add('vega-embed');
        if (actions) {
            element.classList.add('has-actions');
        }
        element.innerHTML = ''; // clear container
        let container = element;
        if (actions) {
            const chartWrapper = document.createElement('div');
            chartWrapper.classList.add(CHART_WRAPPER_CLASS);
            element.appendChild(chartWrapper);
            container = chartWrapper;
        }
        const patch = opts.patch;
        if (patch) {
            if (patch instanceof Function) {
                vgSpec = patch(vgSpec);
            }
            else {
                vgSpec = applyPatch(vgSpec, patch, true, false).newDocument;
            }
        }
        // Set locale. Note that this is a global setting.
        if (opts.formatLocale) {
            vega.formatLocale(opts.formatLocale);
        }
        if (opts.timeFormatLocale) {
            vega.timeFormatLocale(opts.timeFormatLocale);
        }
        const { ast } = opts;
        // Do not apply the config to Vega when we have already applied it to Vega-Lite.
        // This call may throw an Error if parsing fails.
        const runtime = vega.parse(vgSpec, mode === 'vega-lite' ? {} : config, { ast });
        const view = new (opts.viewClass || vega.View)(runtime, Object.assign({ loader,
            logLevel,
            renderer }, (ast ? { expr: vega.expressionInterpreter } : {})));
        if (opts.tooltip !== false) {
            let handler;
            if (isTooltipHandler(opts.tooltip)) {
                handler = opts.tooltip;
            }
            else {
                // user provided boolean true or tooltip options
                handler = new Handler(opts.tooltip === true ? {} : opts.tooltip).call;
            }
            view.tooltip(handler);
        }
        let { hover } = opts;
        if (hover === undefined) {
            hover = mode === 'vega';
        }
        if (hover) {
            const { hoverSet, updateSet } = (typeof hover === 'boolean' ? {} : hover);
            view.hover(hoverSet, updateSet);
        }
        if (opts) {
            if (opts.width != null) {
                view.width(opts.width);
            }
            if (opts.height != null) {
                view.height(opts.height);
            }
            if (opts.padding != null) {
                view.padding(opts.padding);
            }
        }
        yield view.initialize(container, opts.bind).runAsync();
        let documentClickHandler;
        if (actions !== false) {
            let wrapper = element;
            if (opts.defaultStyle !== false) {
                const details = document.createElement('details');
                details.title = i18n.CLICK_TO_VIEW_ACTIONS;
                element.append(details);
                wrapper = details;
                const summary = document.createElement('summary');
                summary.innerHTML = SVG_CIRCLES;
                details.append(summary);
                documentClickHandler = (ev) => {
                    if (!details.contains(ev.target)) {
                        details.removeAttribute('open');
                    }
                };
                document.addEventListener('click', documentClickHandler);
            }
            const ctrl = document.createElement('div');
            wrapper.append(ctrl);
            ctrl.classList.add('vega-actions');
            // add 'Export' action
            if (actions === true || actions.export !== false) {
                for (const ext of ['svg', 'png']) {
                    if (actions === true || actions.export === true || actions.export[ext]) {
                        const i18nExportAction = i18n[`${ext.toUpperCase()}_ACTION`];
                        const exportLink = document.createElement('a');
                        exportLink.text = i18nExportAction;
                        exportLink.href = '#';
                        exportLink.target = '_blank';
                        exportLink.download = `${downloadFileName}.${ext}`;
                        // add link on mousedown so that it's correct when the click happens
                        exportLink.addEventListener('mousedown', function (e) {
                            return __awaiter(this, void 0, void 0, function* () {
                                e.preventDefault();
                                const url = yield view.toImageURL(ext, opts.scaleFactor);
                                this.href = url;
                            });
                        });
                        ctrl.append(exportLink);
                    }
                }
            }
            // add 'View Source' action
            if (actions === true || actions.source !== false) {
                const viewSourceLink = document.createElement('a');
                viewSourceLink.text = i18n.SOURCE_ACTION;
                viewSourceLink.href = '#';
                viewSourceLink.addEventListener('click', function (e) {
                    var _a, _b;
                    viewSource(stringify(spec), (_a = opts.sourceHeader) !== null && _a !== void 0 ? _a : '', (_b = opts.sourceFooter) !== null && _b !== void 0 ? _b : '', mode);
                    e.preventDefault();
                });
                ctrl.append(viewSourceLink);
            }
            // add 'View Compiled' action
            if (mode === 'vega-lite' && (actions === true || actions.compiled !== false)) {
                const compileLink = document.createElement('a');
                compileLink.text = i18n.COMPILED_ACTION;
                compileLink.href = '#';
                compileLink.addEventListener('click', function (e) {
                    var _a, _b;
                    viewSource(stringify(vgSpec), (_a = opts.sourceHeader) !== null && _a !== void 0 ? _a : '', (_b = opts.sourceFooter) !== null && _b !== void 0 ? _b : '', 'vega');
                    e.preventDefault();
                });
                ctrl.append(compileLink);
            }
            // add 'Open in Vega Editor' action
            if (actions === true || actions.editor !== false) {
                const editorUrl = (_f = opts.editorUrl) !== null && _f !== void 0 ? _f : 'https://vega.github.io/editor/';
                const editorLink = document.createElement('a');
                editorLink.text = i18n.EDITOR_ACTION;
                editorLink.href = '#';
                editorLink.addEventListener('click', function (e) {
                    post(window, editorUrl, {
                        config: config,
                        mode,
                        renderer,
                        spec: stringify(spec),
                    });
                    e.preventDefault();
                });
                ctrl.append(editorLink);
            }
        }
        function finalize() {
            if (documentClickHandler) {
                document.removeEventListener('click', documentClickHandler);
            }
            view.finalize();
        }
        return { view, spec, vgSpec, finalize };
    });
}

export default embed;
export { DEFAULT_ACTIONS, guessMode, vega, vegaLite };
//# sourceMappingURL=vega-embed.module.js.map
