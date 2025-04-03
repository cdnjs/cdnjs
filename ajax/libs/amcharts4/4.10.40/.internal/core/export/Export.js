/**
 * Export module.
 *
 * Parts of Export functionality rely on the following third party libraries:
 *
 * [canvg.js](https://github.com/canvg/canvg)
 * Copyright (c) Gabe Lerner
 * Licensed under [MIT](https://github.com/canvg/canvg/blob/master/LICENSE)
 *
 * [pdfmake](http://pdfmake.org/)
 * Copyright (c) 2014 bpampuch
 * Licensed under [MIT](https://github.com/bpampuch/pdfmake/blob/master/LICENSE)
 *
 * [SheetJS Community Edition](https://github.com/sheetjs/js-xlsx)
 * Licensed under [Apache License 2.0](https://github.com/SheetJS/js-xlsx/blob/master/LICENSE)
 *
 * [JSZip](http://stuartk.com/jszip)
 * Copyright (c) Stuart Knightley
 * Dual licenced under the [MIT license or GPLv3](https://raw.githubusercontent.com/Stuk/jszip/master/LICENSE.markdown).
 */
import { __awaiter, __extends, __generator } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ExportMenu } from "./ExportMenu";
import { Adapter } from "../utils/Adapter";
import { Sprite } from "../Sprite";
import { Modal } from "../elements/Modal";
import { List } from "../utils/List";
import { Dictionary } from "../utils/Dictionary";
import { DateFormatter } from "../formatters/DateFormatter";
import { DurationFormatter } from "../formatters/DurationFormatter";
import { NumberFormatter } from "../formatters/NumberFormatter";
import { Language } from "../utils/Language";
import { Validatable } from "../utils/Validatable";
import { color } from "../utils/Color";
import { registry } from "../Registry";
import { options } from "../Options";
import { StyleRule, getComputedStyle } from "../utils/DOM";
import * as $browser from "../utils/Browser";
import * as $object from "../utils/Object";
import * as $net from "../utils/Net";
import * as $dom from "../utils/DOM";
import * as $type from "../utils/Type";
import * as $log from "../utils/Log";
import * as $utils from "../utils/Utils";
import * as $array from "../utils/Array";
import * as $math from "../utils/Math";
import * as $strings from "../utils/Strings";
// This is used to cache the pdfmake loading
var pdfmakePromise;
/**
 * Loads pdfmake dynamic module
 *
 * This is an asynchronous function. Check the description of `getImage()`
 * for description and example usage.
 *
 * @ignore Exclude from docs
 * @return Instance of pdfmake
 * @async
 */
function _pdfmake() {
    return __awaiter(this, void 0, void 0, function () {
        var a, pdfmake, vfs_fonts, global;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        import(/* webpackChunkName: "pdfmake" */ "pdfmake/build/pdfmake.js"),
                        import(/* webpackChunkName: "pdfmake" */ "../../pdfmake/vfs_fonts")
                    ])];
                case 1:
                    a = _a.sent();
                    pdfmake = a[0].default || a[0];
                    vfs_fonts = a[1].default || a[1];
                    global = window;
                    global.pdfMake = global.pdfMake || {};
                    global.pdfMake.vfs = vfs_fonts;
                    pdfmake.vfs = vfs_fonts;
                    return [2 /*return*/, pdfmake];
            }
        });
    });
}
// TODO better parsing
var fontFamilySrcRegexp = /src: ([^;]+);/;
// TODO better checks
function supportsBlobUri() {
    return window.navigator.msSaveOrOpenBlob != null;
}
// TODO move into utils or something ?
function blobToDataUri(blob) {
    return new Promise(function (resolve, reject) {
        // TODO handle abort ?
        var f = new FileReader();
        f.onload = function (e) { resolve(f.result); };
        f.onerror = function (e) { reject(e); };
        f.readAsDataURL(blob);
    });
}
function getCssRules(s) {
    return __awaiter(this, void 0, void 0, function () {
        var sheet, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sheet = s.sheet;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 2, , 4]);
                    return [2 /*return*/, sheet.cssRules];
                case 2:
                    e_1 = _a.sent();
                    return [4 /*yield*/, new Promise(function (success, error) {
                            s.addEventListener("load", function () {
                                success(sheet.cssRules);
                            }, true);
                            s.addEventListener("error", function (e) {
                                error(e);
                            }, true);
                            setTimeout(function () {
                                error(new Error("Timeout while waiting for <style> to load"));
                            }, 10000);
                        })];
                case 3: 
                // Needed because of https://bugzilla.mozilla.org/show_bug.cgi?id=625013
                return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// This loads a stylesheet by URL and then calls the function with it
// TODO this should be moved into utils or something
function loadStylesheet(doc, url, f) {
    return __awaiter(this, void 0, void 0, function () {
        var response, e_2, s, rules;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, $net.load(url)];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.error("Failed to load stylesheet", url, e_2);
                    return [2 /*return*/];
                case 3:
                    s = doc.createElement("style");
                    s.textContent = response.response;
                    if (options.nonce != "") {
                        s.setAttribute("nonce", options.nonce);
                    }
                    doc.head.appendChild(s);
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, , 7, 8]);
                    return [4 /*yield*/, getCssRules(s)];
                case 5:
                    rules = _a.sent();
                    return [4 /*yield*/, eachStylesheet(doc, url, rules, f)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    doc.head.removeChild(s);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// This calls a function for each CSSRule inside of a CSSStyleSheet.
// If the CSSStyleSheet has any @import, then it will recursively call the function for those CSSRules too.
// TODO this should be moved into utils or something
function eachStylesheet(doc, topUrl, rules, f) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, length, i, rule, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    length = rules.length;
                    for (i = 0; i < length; i++) {
                        rule = rules[i];
                        if (rule.type === CSSRule.IMPORT_RULE) {
                            url = rule.href;
                            if (url) {
                                url = $utils.joinUrl(topUrl, url);
                                promises.push(loadStylesheet(doc, url, f));
                            }
                        }
                        else {
                            f(topUrl, rule);
                        }
                    }
                    if (!promises.length) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
// This calls a function for each CSSRule for all of the stylesheets in the page.
// If the CSSStyleSheet has any @import, then it will recursively call the function for those CSSRules too.
// TODO this should be moved into utils or something
function eachStylesheets(f) {
    return __awaiter(this, void 0, void 0, function () {
        var iframe, doc_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    iframe = document.createElement("iframe");
                    // This causes it to use the same origin policy as the parent page
                    iframe.src = "about:blank";
                    // This tries to make it more accessible for screen readers
                    iframe.setAttribute("title", "");
                    document.head.appendChild(iframe);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    doc_1 = iframe.contentDocument;
                    // TODO use $dom.getRoot instead of document ?
                    return [4 /*yield*/, Promise.all($array.map(document.styleSheets, function (sheet) {
                            var url = sheet.href;
                            if (url == null) {
                                return eachStylesheet(doc_1, location.href, sheet.cssRules, f);
                            }
                            else {
                                url = $utils.joinUrl(location.href, url);
                                return loadStylesheet(doc_1, url, f);
                            }
                        }))];
                case 2:
                    // TODO use $dom.getRoot instead of document ?
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    document.head.removeChild(iframe);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * [[Export]] allows downloading of current snapshot of the chart as an
 * image, PDF, or its data in various formats.
 *
 * The export functionality is enabled by default in charts and is accessible
 * via API or optional export menu.
 *
 * To enable menu, simply access export's `menu` property. E.g.:
 *
 * ```TypeScript
 * chart.exporting.menu = new am4core.ExportMenu();
 * ```
 * ```JavaScript
 * chart.exporting.menu = new am4core.ExportMenu();
 * ```
 * ```JSON
 * {
 *   // ...
 *   "exporting": {
 *     "menu": {}
 *   }
 * }
 * ```
 *
 * To export via API, use `export()` method:
 *
 * ```TypeScript
 * chart.exporting.export(type, [options]);
 * ```
 * ```JavaScript
 * chart.exporting.export(type, [options]);
 * ```
 *
 * E.g.:
 *
 * ```TypeScript
 * chart.exporting.export("png");
 * ```
 * ```JavaScript
 * chart.exporting.export("png");
 * ```
 *
 * @todo Better loading indicator?
 * @todo Implement multiplier option
 * @todo Handling of hanged exports
 * @important
 */
var Export = /** @class */ (function (_super) {
    __extends(Export, _super);
    /**
     * Constructor
     */
    function Export(container) {
        var _this = _super.call(this) || this;
        /**
         * Adapter.
         */
        _this.adapter = new Adapter(_this);
        /**
         * Holds options for each format.
         *
         * @ignore Exclude from docs
         */
        _this._formatOptions = new Dictionary();
        /**
         * Extra [[Sprite]] elements to include in exports.
         */
        _this._extraSprites = [];
        /**
         * A list of [[Sprite]] elements that need to be valid before export
         * commences.
         */
        _this._validateSprites = [];
        /**
         * Holds an array of data field names. If set, exported data fields will try
         * to maintain this order.
         *
         * If not set (default), the export will try to maintain the same order as
         * in source data, or as in `dataFields` (if set).
         *
         * @since 4.9.7
         */
        _this.dataFieldsOrder = [];
        /**
         * Indicates whether data fields were generated dynamically (`true`) or
         * if they were pre-set by the user (`false`).
         */
        _this._dynamicDataFields = true;
        /**
         * Holds a list of objects that were temporarily removed from the DOM while
         * exporting. Those most probably are tainted images, or foreign objects that
         * would otherwise prevent SVG to be converted to canvas.
         *
         * @ignore Exclude from docs
         */
        _this._removedObjects = new List();
        /**
         * Holds references to the objects that were temporarily hidden when export
         * started, so that we can reveal them back when export ends.
         */
        _this._hiddenObjects = [];
        /**
         * Indicates if non-exportable objects are now hidden;
         */
        _this._objectsAlreadyHidden = false;
        /**
         * Exported files will be prefixed with whatever it is set here.
         *
         * @ignore Exclude from docs
         */
        _this._filePrefix = "amCharts";
        /**
         * If you are using web fonts (such as Google Fonts), your chart might be
         * using them as well.
         *
         * Normally, exporting to image will require to download these fonts so the
         * are carried over to exported image.
         *
         * This setting can be used to disable or enable this functionality.
         *
         * @default true
         */
        _this.useWebFonts = true;
        /**
         * Many modern displays have use more actual pixels per displayed pixel. This
         * results in sharper images on screen. Unfortunately, when exported to a
         * bitmap image of the sam width/height size it will lose those extra pixels,
         * resulting in somewhat blurry image.
         *
         * This is why we are going to export images larger than they are, so that we
         * don't lose any details.
         *
         * If you'd rather export images without change in size, set this to `false`.
         *
         * @default true
         */
        _this.useRetina = true;
        /**
         * By default Export will try to use built-in method for transforming chart
         * into an image for download, then fallback to external library (canvg) for
         * conversion if failed.
         *
         * Setting this to `false` will force use of external library for all export
         * operations.
         *
         * It might be useful to turn off simplified export if you are using strict
         * content security policies, that disallow images with blobs as their
         * source.
         *
         * @default true
         * @since 4.2.5
         */
        _this.useSimplifiedExport = true;
        /**
         * If export operation takes longer than milliseconds in this second, we will
         * show a modal saying export operation took longer than expected.
         */
        _this.timeoutDelay = 2000;
        _this._exportRunning = false;
        /**
         * Indicator used by [[Component]].
         *
         * @ignore
         */
        _this._prevHasData = false;
        _this._container = container;
        _this.className = "Export";
        // Set default options
        _this._formatOptions.setKey("png", {});
        _this._formatOptions.setKey("jpg", {
            quality: 0.8
        });
        _this._formatOptions.setKey("gif", {});
        _this._formatOptions.setKey("svg", {});
        _this._formatOptions.setKey("pdf", {
            fontSize: 14,
            imageFormat: "png",
            align: "left",
            addURL: true,
            addColumnNames: true
        });
        _this._formatOptions.setKey("json", {
            indent: 2,
            useLocale: true
        });
        _this._formatOptions.setKey("csv", {
            addColumnNames: true,
            emptyAs: "",
            addBOM: true
        });
        _this._formatOptions.setKey("xlsx", {
            addColumnNames: true,
            useLocale: true,
            emptyAs: ""
        });
        _this._formatOptions.setKey("html", {
            addColumnNames: true,
            emptyAs: ""
        });
        _this._formatOptions.setKey("pdfdata", {
            fontSize: 14,
            imageFormat: "png",
            addURL: true,
            addColumnNames: true,
            emptyAs: ""
        });
        _this._formatOptions.setKey("print", {
            delay: 500,
            printMethod: "iframe"
        });
        // Add options adapter
        _this.adapter.add("options", function (arg) {
            var formatOptions = _this._formatOptions.getKey(arg.type);
            if (arg.options) {
                arg.options = $object.merge(formatOptions, arg.options);
            }
            else {
                arg.options = formatOptions;
            }
            return arg;
        });
        _this.applyTheme();
        _this.dispatchImmediately("inited");
        return _this;
    }
    Object.defineProperty(Export.prototype, "menu", {
        /**
         * @return ExportMenu instance
         */
        get: function () {
            return this._menu;
        },
        /**
         * An instance of [[ExportMenu]].
         *
         * To add an export menu to a chart, set this to a new instance of
         * [[ExportMenu]].
         *
         * ```TypeScript
         * chart.exporting.menu = new am4core.ExportMenu();
         * ```
         * ```JavaScript
         * chart.exporting.menu = new am4core.ExportMenu();
         * ```
         * ```JSON
         * {
         *   // ...
         *   "exporting": {
         *     "menu": {}
         *   }
         * }
         * ```
         *
         * @param menu  ExportMenu instance
         */
        set: function (menu) {
            var _this = this;
            if (this._menu) {
                this.removeDispose(this._menu);
            }
            this._menu = menu;
            // Set container and language
            this._menu.container = this.container;
            this._menu.language = this._language;
            // Add adapter to check for browser support
            this._menu.adapter.add("branch", function (arg) {
                arg.branch.unsupported = !_this.typeSupported(arg.branch.type);
                return arg;
            });
            // Add click events
            this._menu.events.on("hit", function (ev) {
                _this.export(ev.branch.type, ev.branch.options);
                _this.menu.close();
            });
            this._menu.events.on("enter", function (ev) {
                _this.export(ev.branch.type, ev.branch.options);
                _this.menu.close();
            });
            this._menu.events.on("over", function (ev) {
                _this._disablePointers();
            });
            this._menu.events.on("out", function (ev) {
                setTimeout(function () { _this._releasePointers(); }, 10);
            });
            // Dispatch event
            this.dispatchImmediately("menucreated");
            // Prefix with Sprite's class name
            this._menu.adapter.add("classPrefix", function (obj) {
                obj.classPrefix = options.classNamePrefix + obj.classPrefix;
                return obj;
            });
            // Add menu to disposers so that it's destroyed when Export is disposed
            this._disposers.push(this._menu);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if this specific menu item type is supported by current system.
     *
     * @param type  Menu item type
     * @return `false` if not supported
     */
    Export.prototype.typeSupported = function (type) {
        var supported = true;
        var options = this.getFormatOptions(type);
        if ($type.hasValue(options) && options.disabled) {
            supported = false;
        }
        else if (type === "pdf") {
            //supported = this.downloadSupport();
        }
        else if (type === "xlsx") {
            //supported = (this.downloadSupport() && this._hasData()) ? true : false;
            supported = this._hasData() ? true : false;
        }
        else if (type == "print" && !window.print) {
            supported = false;
        }
        else if (["json", "csv", "html", "pdfdata"].indexOf(type) !== -1 && !this._hasData()) {
            supported = false;
        }
        return this.adapter.apply("supported", {
            supported: supported,
            type: type
        }).supported;
    };
    /**
     * Checks if data is available.
     *
     * @return Has data?
     */
    Export.prototype._hasData = function () {
        return this.data && this.data.length;
    };
    /**
     * Get function to handle export for particular format.
     *
     * @ignore Exclude from docs
     */
    Export.prototype._getFunction = function (type) {
        switch (type) {
            case "png":
            case "gif":
            case "jpg":
                return this.getImage;
            case "svg":
                return this.getSVG;
            case "pdf":
            case "pdfdata":
                return this.getPDF;
            case "xlsx":
                return this.getExcel;
            case "csv":
                return this.getCSV;
            case "json":
                return this.getJSON;
            case "html":
                return this.getHTML;
            case "print":
                return this.getPrint;
            default:
                return this.unsupported;
        }
    };
    /**
     * Initiates export procedure.
     *
     * @param type     Export type
     * @param options  Options
     * @return `true` if export was successful
     * @async
     */
    Export.prototype.export = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var event_1, func, data, event_2, event_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Check if it's a custom item, and do nothing or execute custom callback
                        if (type == "custom") {
                            this.handleCustom(options);
                            return [2 /*return*/, true];
                        }
                        // Set export running flag
                        this._exportRunning = true;
                        // Dispatch event
                        if (this.events.isEnabled("exportstarted")) {
                            event_1 = {
                                "type": "exportstarted",
                                "target": this,
                                "format": type,
                                "options": options
                            };
                            this.events.dispatchImmediately("exportstarted", event_1);
                        }
                        // Schedule a preloader
                        this.showPreloader();
                        // Schedule a timeout
                        if (this.timeoutDelay) {
                            this.hideTimeout();
                            this._timeoutTimeout = this.setTimeout(function () {
                                // Dispatch event
                                if (_this.events.isEnabled("exporttimedout")) {
                                    var event_4 = {
                                        "type": "exporttimedout",
                                        "target": _this,
                                        "format": type,
                                        "options": options
                                    };
                                    _this.events.dispatchImmediately("exporttimedout", event_4);
                                }
                                // Show modal
                                _this.showTimeout();
                            }, this.timeoutDelay);
                        }
                        // Hide items that should not be exported
                        this.hideNonExportableSprites();
                        func = this._getFunction(type);
                        // Give chance for plugins to override both function and options
                        options = this.adapter.apply("options", {
                            options: options,
                            type: type
                        }).options;
                        func = this.adapter.apply("exportFunction", {
                            func: func,
                            type: type,
                            options: options
                        }).func;
                        return [4 /*yield*/, func.call(this, type, options)];
                    case 1:
                        data = _a.sent();
                        // Release pointers
                        this._exportRunning = false;
                        this._releasePointers();
                        // Restore temporarily hidden elements
                        this.restoreNonExportableSprites();
                        if (data) {
                            // Dispatch event
                            if (this.events.isEnabled("exportfinished")) {
                                event_2 = {
                                    "type": "exportfinished",
                                    "target": this,
                                    "format": type,
                                    "options": options
                                };
                                this.events.dispatchImmediately("exportfinished", event_2);
                            }
                            // Hide preloader and timeout modals
                            this.hidePreloader();
                            this.hideTimeout();
                            if (this.menu) {
                                this.menu.close();
                            }
                            // Download or print
                            if (type === "print") {
                                return [2 /*return*/, this.print(data, options, this.adapter.apply("title", {
                                        title: this.title,
                                        options: options
                                    }).title)];
                            }
                            else {
                                if (type == "pdfdata") {
                                    return [2 /*return*/, this.download(data, this.filePrefix + ".pdf")];
                                }
                                return [2 /*return*/, this.download(data, this.filePrefix + "." + type, (options && options.addBOM))];
                            }
                        }
                        else {
                            // Throw exception?
                            // @todo
                            // Dispatch event
                            if (this.events.isEnabled("error")) {
                                event_3 = {
                                    "type": "error",
                                    "target": this,
                                    "format": type,
                                    "options": options
                                };
                                this.events.dispatchImmediately("error", event_3);
                            }
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * A function that should handle unsupported export types.
     *
     * @ignore Exclude from docs
     * @param type     Export type
     * @param options  Options
     * @return Promise
     * @async
     */
    Export.prototype.unsupported = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // TODO should this return `undefined`?
                return [2 /*return*/, ""];
            });
        });
    };
    /**
     * Handles click on a "custom" menu item.
     *
     * Basically, if it has "callback" enabled, it will be called. Nothing else.
     *
     * @ignore Exclude from docs
     * @param options  Options
     */
    Export.prototype.handleCustom = function (options) {
        if ($type.hasValue(options) && $type.hasValue(options.callback)) {
            options.callback.call(options.callbackTarget || this, options);
        }
    };
    /**
     * Requests a Print of the chart.
     *
     * @param type     Export type
     * @param options  Options
     * @return Promise
     * @async
     */
    Export.prototype.getPrint = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getImage("png", options)];
            });
        });
    };
    /**
     * A function that returns data: URI encoded @font-family, so that way it can be embedded into SVG.
     *
     * @ignore Exclude from docs
     * @return String which can be embedded directly into a <style> element.
     * @async
     */
    Export.prototype.getFontFamilies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var DOMURL, blobs, promises, a;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        DOMURL = this.getDOMURL();
                        blobs = [];
                        promises = [];
                        return [4 /*yield*/, eachStylesheets(function (topUrl, rule) {
                                if (rule.type === CSSRule.FONT_FACE_RULE) {
                                    var cssText_1 = rule.cssText;
                                    // TODO this is necessary because Edge doesn't let you access the src using getPropertyValue
                                    var src = fontFamilySrcRegexp.exec(cssText_1);
                                    if (src !== null) {
                                        // TODO make this faster (don't create Promises for non-url stuff)
                                        var urls = src[1].split(/ *, */).map(function (url) { return __awaiter(_this, void 0, void 0, function () {
                                            var a, after, fullUrl, response, url_1, e_3;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        a = /^url\(["']?([^"'\)]+)["']?\)([^,]*)$/.exec(url);
                                                        if (!(a === null)) return [3 /*break*/, 1];
                                                        return [2 /*return*/, url];
                                                    case 1:
                                                        after = a[2];
                                                        fullUrl = $utils.joinUrl(topUrl, a[1]);
                                                        if (this.webFontFilter && !fullUrl.match(this.webFontFilter)) {
                                                            return [2 /*return*/, null];
                                                        }
                                                        _a.label = 2;
                                                    case 2:
                                                        _a.trys.push([2, 7, , 8]);
                                                        return [4 /*yield*/, $net.load(fullUrl, undefined, { responseType: "blob" })];
                                                    case 3:
                                                        response = _a.sent();
                                                        if (!supportsBlobUri()) return [3 /*break*/, 4];
                                                        url_1 = DOMURL.createObjectURL(response.blob);
                                                        blobs.push(url_1);
                                                        return [3 /*break*/, 6];
                                                    case 4: return [4 /*yield*/, blobToDataUri(response.blob)];
                                                    case 5:
                                                        url_1 = _a.sent();
                                                        _a.label = 6;
                                                    case 6: 
                                                    // TODO should it should escape the URI ?
                                                    return [2 /*return*/, "url(\"" + url_1 + "\")" + after];
                                                    case 7:
                                                        e_3 = _a.sent();
                                                        console.error("Failed to load font", fullUrl, e_3);
                                                        return [2 /*return*/, null];
                                                    case 8: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        promises.push(Promise.all(urls).then(function (a) {
                                            a = a.filter(function (x) { return x != null; });
                                            if (a.length === 0) {
                                                return "";
                                            }
                                            else {
                                                return cssText_1.replace(fontFamilySrcRegexp, "src: " + a.join(", ") + ";");
                                            }
                                        }));
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        a = _a.sent();
                        return [2 /*return*/, {
                                blobs: blobs,
                                cssText: a.filter(function (x) { return !!x; }).join("\n")
                            }];
                }
            });
        });
    };
    /**
     * Produces image output from the element.
     *
     * Converts to a `Canvas` first, then produces an image to download.
     *
     * This is an asynchronous function. Rather than returning a result, it
     * returns a Promise.
     *
     * You can use `await` notion from other async functions, or `then()`
     * anywhere else.
     *
     * ```TypeScript
     * let img;
     *
     * // Async
     * img = await chart.exporting.getImage( "png" );
     *
     * // Sync
     * chart.exporting.getImage( "png" ).then( ( data ) => {
     *   img = data;
     * } );
     * ```
     * ```JavaScript
     * var img;
     * chart.exporting.getImage( "png" ).then( ( data ) => {
     *   img = data;
     * } );
     * ```
     *
     * @param  type           Image format
     * @param  options        Options
     * @param  includeExtras  Should extra sprites be included if set?
     * @return Promise
     */
    Export.prototype.getImage = function (type, options, includeExtras) {
        return __awaiter(this, void 0, void 0, function () {
            var prehidden, canvas, newCanvas, uri, e_4, data, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prehidden = this._objectsAlreadyHidden;
                        if (!prehidden) {
                            this.hideNonExportableSprites();
                        }
                        if (!$type.hasValue(options)) {
                            options = this.getFormatOptions(type);
                        }
                        // Wait for required elements to be ready before proceeding
                        return [4 /*yield*/, this.awaitValidSprites()];
                    case 1:
                        // Wait for required elements to be ready before proceeding
                        _a.sent();
                        return [4 /*yield*/, this.simplifiedImageExport()];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 10];
                        canvas = void 0;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 9]);
                        return [4 /*yield*/, this.getCanvas(options)];
                    case 4:
                        canvas = _a.sent();
                        if (!(includeExtras !== false)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.addExtras(canvas, options)];
                    case 5:
                        newCanvas = _a.sent();
                        this.disposeCanvas(canvas);
                        canvas = newCanvas;
                        _a.label = 6;
                    case 6:
                        uri = canvas.toDataURL(this.getContentType(type), options.quality);
                        // Get rid of the canvas
                        this.disposeCanvas(canvas);
                        if (!prehidden) {
                            this.restoreNonExportableSprites();
                        }
                        return [2 /*return*/, uri];
                    case 7:
                        e_4 = _a.sent();
                        console.error(e_4.message + "\n" + e_4.stack);
                        $log.warn("Simple export failed, falling back to advanced export");
                        if (canvas) {
                            this.disposeCanvas(canvas);
                        }
                        return [4 /*yield*/, this.getImageAdvanced(type, options, includeExtras)];
                    case 8:
                        data = _a.sent();
                        if (!prehidden) {
                            this.restoreNonExportableSprites();
                        }
                        return [2 /*return*/, data];
                    case 9: return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, this.getImageAdvanced(type, options, includeExtras)];
                    case 11:
                        data = _a.sent();
                        if (!prehidden) {
                            this.restoreNonExportableSprites();
                        }
                        return [2 /*return*/, data];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Adds extra elements to the canvas.
     *
     * @param  canvas   Original canvas
     * @param  options  Options
     */
    Export.prototype.addExtras = function (canvas, options, advanced) {
        return __awaiter(this, void 0, void 0, function () {
            var middleLeft_1, middleTop_1, middleWidth_1, middleHeight_1, extraRight_1, extraBottom_1, extras, newCanvas, ctx_1, background, left_1, top_1, right_1, bottom_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.extraSprites.length) return [3 /*break*/, 2];
                        middleLeft_1 = 0;
                        middleTop_1 = 0;
                        middleWidth_1 = canvas.width;
                        middleHeight_1 = canvas.height;
                        extraRight_1 = 0;
                        extraBottom_1 = 0;
                        return [4 /*yield*/, Promise.all($array.map(this.extraSprites, function (extraSprite) { return __awaiter(_this, void 0, void 0, function () {
                                var extra, extraCanvas, extraWidth, extraHeight;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (extraSprite instanceof Sprite) {
                                                extra = {
                                                    sprite: extraSprite,
                                                    position: "bottom"
                                                };
                                            }
                                            else {
                                                extra = extraSprite;
                                            }
                                            // Set defaults
                                            extra.position = extra.position || "bottom";
                                            extra.marginTop = extra.marginTop || 0;
                                            extra.marginRight = extra.marginRight || 0;
                                            extra.marginBottom = extra.marginBottom || 0;
                                            extra.marginLeft = extra.marginLeft || 0;
                                            if (!advanced) return [3 /*break*/, 2];
                                            return [4 /*yield*/, extra.sprite.exporting.getCanvasAdvanced(options)];
                                        case 1:
                                            extraCanvas = _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, extra.sprite.exporting.getCanvas(options)];
                                        case 3:
                                            extraCanvas = _a.sent();
                                            _a.label = 4;
                                        case 4:
                                            extraWidth = extraCanvas.width + extra.marginLeft + extra.marginRight;
                                            extraHeight = extraCanvas.height + extra.marginTop + extra.marginBottom;
                                            if (extra.position == "top") {
                                                middleWidth_1 = extra.crop ? middleHeight_1 : $math.max(middleWidth_1, extraWidth);
                                                middleTop_1 += extraHeight;
                                            }
                                            else if (extra.position == "right") {
                                                middleHeight_1 = extra.crop ? middleHeight_1 : $math.max(middleHeight_1, extraHeight);
                                                extraRight_1 += extraWidth;
                                            }
                                            else if (extra.position == "left") {
                                                middleHeight_1 = extra.crop ? middleHeight_1 : $math.max(middleHeight_1, extraHeight);
                                                middleLeft_1 += extraWidth;
                                            }
                                            else if (extra.position === "bottom") {
                                                middleWidth_1 = extra.crop ? middleHeight_1 : $math.max(middleWidth_1, extraWidth);
                                                extraBottom_1 += extraHeight;
                                            }
                                            return [2 /*return*/, {
                                                    canvas: extraCanvas,
                                                    position: extra.position,
                                                    left: extra.marginLeft,
                                                    top: extra.marginTop,
                                                    width: extraWidth,
                                                    height: extraHeight
                                                }];
                                    }
                                });
                            }); }))];
                    case 1:
                        extras = _a.sent();
                        newCanvas = this.getDisposableCanvas();
                        newCanvas.width = middleLeft_1 + middleWidth_1 + extraRight_1;
                        newCanvas.height = middleTop_1 + middleHeight_1 + extraBottom_1;
                        ctx_1 = newCanvas.getContext("2d");
                        background = this.backgroundColor || this.findBackgroundColor(this.sprite.dom);
                        if (background) {
                            ctx_1.fillStyle = background.toString();
                            ctx_1.fillRect(0, 0, newCanvas.width, newCanvas.height);
                        }
                        left_1 = middleLeft_1;
                        top_1 = middleTop_1;
                        right_1 = left_1 + middleWidth_1;
                        bottom_1 = top_1 + middleHeight_1;
                        // Radiates outwards from center
                        $array.each(extras, function (extra) {
                            if (extra.position == "top") {
                                top_1 -= extra.height;
                                ctx_1.drawImage(extra.canvas, middleLeft_1 + extra.left, top_1 + extra.top);
                            }
                            else if (extra.position == "right") {
                                ctx_1.drawImage(extra.canvas, right_1 + extra.left, middleTop_1 + extra.top);
                                right_1 += extra.width;
                            }
                            else if (extra.position == "left") {
                                left_1 -= extra.width;
                                ctx_1.drawImage(extra.canvas, left_1 + extra.left, middleTop_1 + extra.top);
                            }
                            else if (extra.position === "bottom") {
                                ctx_1.drawImage(extra.canvas, middleLeft_1 + extra.left, bottom_1 + extra.top);
                                bottom_1 += extra.height;
                            }
                            _this.disposeCanvas(extra.canvas);
                        });
                        ctx_1.drawImage(canvas, middleLeft_1, middleTop_1);
                        return [2 /*return*/, newCanvas];
                    case 2: return [2 /*return*/, canvas];
                }
            });
        });
    };
    /**
     * Returns canvas representation of the [[Sprite]].
     *
     * @param   options  Options
     * @return           Canvas
     */
    Export.prototype.getCanvas = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var background, DOMURL, url, blobs, canvas, width, height, font, fontSize, scale, pixelRatio, ctx, promises, a, data, svg, img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Options are set?
                        if (!$type.hasValue(options)) {
                            options = {};
                        }
                        background = this.backgroundColor || this.findBackgroundColor(this.sprite.dom);
                        DOMURL = this.getDOMURL();
                        url = null;
                        blobs = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 4, 5]);
                        width = this.sprite.pixelWidth;
                        height = this.sprite.pixelHeight;
                        font = $dom.findFont(this.sprite.dom);
                        fontSize = $dom.findFontSize(this.sprite.dom);
                        scale = options.scale || 1;
                        pixelRatio = this.getPixelRatio(options);
                        // Check if scale needs to be updated as per min/max dimensions
                        scale = this.getAdjustedScale(width * pixelRatio, height * pixelRatio, scale, options);
                        // Create canvas and its 2D context
                        canvas = this.getDisposableCanvas();
                        // Set canvas width/height
                        canvas.style.width = width * scale + 'px';
                        canvas.style.height = height * scale + 'px';
                        canvas.width = width * scale;
                        canvas.height = height * scale;
                        ctx = canvas.getContext("2d");
                        // if (pixelRatio != 1) {
                        // 	ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
                        // }
                        // Add background if necessary
                        if (background) {
                            ctx.fillStyle = background.toString();
                            ctx.fillRect(0, 0, width * scale, height * scale);
                        }
                        promises = [];
                        if (this.useWebFonts) {
                            // TODO what if one of the other things errors before it's been able to set `blobs` ?
                            promises.push(this.getFontFamilies().then(function (fonts) {
                                blobs = fonts.blobs;
                                return fonts.cssText;
                            }));
                        }
                        promises.push(this.imagesToDataURI(this.sprite.dom, options));
                        promises.push(this.prepForeignObjects(this.sprite.dom, options));
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        a = _a.sent();
                        data = this.normalizeSVG("<style>" + a[0] + "</style>" + this.serializeElement(this.sprite.paper.defs) + this.serializeElement(this.sprite.dom), options, width, height, scale, font, fontSize);
                        svg = new Blob([data], { type: "image/svg+xml" });
                        url = DOMURL.createObjectURL(svg);
                        return [4 /*yield*/, this.loadNewImage(url, width * scale * pixelRatio, height * scale * pixelRatio, "anonymous")];
                    case 3:
                        img = _a.sent();
                        // Draw image on canvas
                        ctx.drawImage(img, 0, 0);
                        return [3 /*break*/, 5];
                    case 4:
                        if (url !== null) {
                            DOMURL.revokeObjectURL(url);
                        }
                        if (blobs !== null) {
                            $array.each(blobs, function (url) {
                                DOMURL.revokeObjectURL(url);
                            });
                        }
                        // Restore replaced tainted images in DOM
                        this.restoreRemovedObjects();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/, canvas];
                }
            });
        });
    };
    /**
     * Returns canvas representation of the [[Sprite]] using canvg.
     *
     * @param   options  Options
     * @return           Canvas
     */
    Export.prototype.getCanvasAdvanced = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var background, canvg, width, height, font, fontSize, scale, pixelRatio, data, canvas, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Options are set?
                        if (!$type.hasValue(options)) {
                            options = {};
                        }
                        // Convert external images to data uris
                        return [4 /*yield*/, this.imagesToDataURI(this.sprite.dom, options)];
                    case 1:
                        // Convert external images to data uris
                        _a.sent();
                        background = this.backgroundColor || this.findBackgroundColor(this.sprite.dom);
                        return [4 /*yield*/, this.canvg];
                    case 2:
                        canvg = _a.sent();
                        width = this.sprite.pixelWidth;
                        height = this.sprite.pixelHeight;
                        font = $dom.findFont(this.sprite.dom);
                        fontSize = $dom.findFontSize(this.sprite.dom);
                        scale = options.scale || 1;
                        pixelRatio = this.getPixelRatio(options);
                        // Check if scale needs to be updated as per min/max dimensions
                        scale = this.getAdjustedScale(width * pixelRatio, height * pixelRatio, scale, options);
                        data = this.normalizeSVG(this.serializeElement(this.sprite.paper.defs) + this.serializeElement(this.sprite.dom), options, width, height, scale, font, fontSize, background);
                        canvas = this.getDisposableCanvas();
                        // Set canvas width/height
                        canvas.style.width = (width * pixelRatio * scale) + 'px';
                        canvas.style.height = (height * pixelRatio * scale) + 'px';
                        canvas.width = width * pixelRatio * scale;
                        canvas.height = height * pixelRatio * scale;
                        config = {
                            //ignoreDimensions: true,
                            useCORS: true
                        };
                        if (pixelRatio != 1) {
                            config.ignoreDimensions = true;
                            config.scaleWidth = width * pixelRatio * scale;
                            config.scaleHeight = height * pixelRatio * scale;
                        }
                        return [4 /*yield*/, canvg.fromString(canvas.getContext("2d"), data, config).render()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, canvas];
                }
            });
        });
    };
    /**
     * Tries to dynamically load [canvg.js](https://github.com/canvg/canvg) and
     * export an image using its functions.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type     Image format
     * @param options  Options
     * @return Data uri
     */
    Export.prototype.getImageAdvanced = function (type, options, includeExtras) {
        return __awaiter(this, void 0, void 0, function () {
            var prehidden, canvas, uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prehidden = this._objectsAlreadyHidden;
                        if (!prehidden) {
                            this.hideNonExportableSprites();
                        }
                        if (!$type.hasValue(options)) {
                            options = this.getFormatOptions(type);
                        }
                        return [4 /*yield*/, this.getCanvasAdvanced(options)];
                    case 1:
                        canvas = _a.sent();
                        if (!(includeExtras !== false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.addExtras(canvas, options, true)];
                    case 2:
                        canvas = _a.sent();
                        _a.label = 3;
                    case 3:
                        uri = canvas.toDataURL(this.getContentType(type), options.quality);
                        // Get rid of the canvas
                        this.disposeCanvas(canvas);
                        if (!prehidden) {
                            this.restoreNonExportableSprites();
                        }
                        return [2 /*return*/, uri];
                }
            });
        });
    };
    /**
     * Creates a `<canvas>` element and returns it.
     *
     * @return Canvas element
     */
    Export.prototype.getDisposableCanvas = function () {
        var canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.top = "-10000px";
        document.body.appendChild(canvas);
        return canvas;
    };
    /**
     * Removes canvas.
     *
     * @param canvas  Canvas element
     */
    Export.prototype.disposeCanvas = function (canvas) {
        if (document.body.contains(canvas)) {
            document.body.removeChild(canvas);
        }
    };
    /**
     * Returns pixel ratio for retina displays.
     *
     * @return Pixel ratio
     */
    Export.prototype.getPixelRatio = function (options) {
        // const scale = options && options.scale ? options.scale : 1;
        // return (this.useRetina ? $utils.getPixelRatio() : 1) * scale;
        return this.useRetina ? $utils.getPixelRatio() : 1;
    };
    /**
     * Calculates adjusted scale if image does not fit or is larger than min/max
     * settings.
     *
     * @param   width    Width of the source image
     * @param   height   Height of the source image
     * @param   scale    Current scale
     * @param   options  Options
     * @return           Adjusted scale
     */
    Export.prototype.getAdjustedScale = function (width, height, scale, options) {
        if (!options) {
            return scale;
        }
        var adjWidth = width * scale;
        var adjHeight = width * scale;
        // Check max restrictions
        var widthScale;
        var heightScale;
        if (options.maxWidth && (adjWidth > options.maxWidth)) {
            widthScale = options.maxWidth / width;
        }
        if (options.maxHeight && (adjHeight > options.maxHeight)) {
            heightScale = options.maxHeight / height;
        }
        if (widthScale || heightScale) {
            return $math.min(widthScale, heightScale);
        }
        // Check min restrictions
        if (options.minWidth && (adjWidth < options.minWidth)) {
            widthScale = options.minWidth / width;
        }
        if (options.minHeight && (adjHeight < options.minHeight)) {
            heightScale = options.minHeight / height;
        }
        if (widthScale || heightScale) {
            return $math.max(widthScale, heightScale);
        }
        return scale;
    };
    /**
     * Converts all `<image>` tags in SVG to use data uris instead of external
     * URLs
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param el       SVG node
     * @param options  Options
     * @return Promise
     */
    Export.prototype.imagesToDataURI = function (el, options) {
        return __awaiter(this, void 0, void 0, function () {
            var images, promises, count, i, image, href;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        images = el.querySelectorAll("image");
                        if (!images.length) return [3 /*break*/, 2];
                        promises = [];
                        // There are images, process each of them
                        for (count = images.length, i = 0; i < count; i++) {
                            image = images[i];
                            href = image.getAttributeNS(Export.XLINK, "href");
                            // no href?
                            if (!href) {
                                continue;
                            }
                            if (href.indexOf("data:image") !== -1) {
                                // Ignore image if it's already in Data URI format
                            }
                            else {
                                // SVG or bitmap image?
                                if (href.indexOf(".svg") !== -1) {
                                    promises.push(this.svgToDataURI(image, options));
                                }
                                else {
                                    promises.push(this.imageToDataURI(image, options));
                                }
                            }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * `foreignObject` elements cannot be exported. This function hides them
     * temprarily. In the future it might try to convert them to SVG to make them
     * exportable.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param el       SVG node
     * @param options  Options
     * @return Promise
     */
    Export.prototype.prepForeignObjects = function (el, options) {
        return __awaiter(this, void 0, void 0, function () {
            var objects, count, i;
            return __generator(this, function (_a) {
                objects = el.querySelectorAll("foreignObject");
                if (objects.length) {
                    // There are foreign objects, process each of them
                    for (count = objects.length, i = 0; i < count; i++) {
                        this.temporarilyRemoveObject(objects[i]);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Converts an SVG `<image>` to use its data uri for `href` instead of
     * external file.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param el       SVG element
     * @param options  Options
     */
    Export.prototype.imageToDataURI = function (el, options) {
        return __awaiter(this, void 0, void 0, function () {
            var img, canvas, uri, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.loadNewImage(el.getAttributeNS(Export.XLINK, "href"), null, null, "anonymous")];
                    case 1:
                        // Create image
                        img = _a.sent();
                        canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        // Draw new image on it via `toDataURL`
                        canvas.getContext("2d").drawImage(img, 0, 0);
                        // Replace image `href` with data uri
                        // If we got to this point it means image has loaded, however we might
                        // still get an error with `toDataURL()`
                        try {
                            uri = canvas.toDataURL();
                            el.setAttribute("href", uri);
                            return [2 /*return*/, uri];
                        }
                        catch (e) {
                            // Give up and temporarily remove the element href temporarily
                            if (options.keepTainted !== false) {
                                /*this._removedObjects.push({
                                    "element": el,
                                    "originalHref": el.getAttributeNS(Export.XLINK, "href")
                                });
                                el.setAttributeNS(Export.XLINK, "href", "");*/
                                this.temporarilyRemoveObject(el);
                            }
                            return [2 /*return*/, undefined];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        // Give up and temporarily remove the element's href
                        if (!options || options.keepTainted !== false) {
                            /*this._removedObjects.push({
                                "element": el,
                                "originalHref": el.getAttributeNS(Export.XLINK, "href")
                            });
                            el.setAttributeNS(Export.XLINK, "href", "");*/
                            this.temporarilyRemoveObject(el);
                        }
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Converts `<image>` with external SVG source to data uri. Loads external SVG
     * file, then converts it to data uri and replaces the `xlink:href` parameter.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param el        An SVG element
     * @param options   Options
     */
    Export.prototype.svgToDataURI = function (el, options) {
        return __awaiter(this, void 0, void 0, function () {
            var href, data, charset, uri, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        href = el.getAttributeNS(Export.XLINK, "href");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, $net.load(href)];
                    case 2:
                        data = _a.sent();
                        charset = this.adapter.apply("charset", {
                            charset: "base64",
                            type: "svg",
                            options: options
                        }).charset;
                        uri = this.adapter.apply("svgToDataURI", {
                            data: "data:" + this.getContentType("svg") + ";" + charset + "," + btoa(data.response),
                            options: options
                        }).data;
                        el.setAttributeNS(Export.XLINK, "href", uri);
                        return [2 /*return*/, uri];
                    case 3:
                        e_6 = _a.sent();
                        // Disable temporarily
                        if (!options || options.keepTainted !== false) {
                            /*this._removedObjects.push({
                                "element": el,
                                "originalHref": href
                            });
                            el.setAttributeNS(Export.XLINK, "href", "");*/
                            this.temporarilyRemoveObject(el);
                        }
                        return [2 /*return*/, undefined];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Temporarily removes element from DOM, and replaces it with a dummy
     * placeholder, as well as stores it for later restoration.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @param el Node
     */
    Export.prototype.temporarilyRemoveObject = function (el, placeholder) {
        // Get parent
        var parent = el.parentElement || el.parentNode;
        // Create a placeholder group element if it has not been passed in
        if (!placeholder) {
            placeholder = this.sprite.paper.add("g").node;
        }
        parent.insertBefore(placeholder, el);
        // Check if we have a textContents we can replace with
        // @todo Perhaps we should explore alternatives to creating text nodes
        // i.e. creating a text version of the HTML-based Text, just for export
        // purposes. Converting HTML into SVG is very complicated
        if (el.textContent) {
            /*let text = this.sprite.paper.add("text").node;
            text.textContent = el.textContent;
            placeholder.appendChild(text);

            // Copy properties from the removing element to the placeholder
            $dom.copyAttributes(el, placeholder);*/
        }
        // Remove the old element
        parent.removeChild(el);
        // Log removed item
        this._removedObjects.push({
            "element": el,
            "placeholder": placeholder
        });
    };
    /**
     * Restores all (possibly tainted or unsupported) objects that were
     * temporarily removed when exporting.
     *
     * @ignore Exclude from docs
     */
    Export.prototype.restoreRemovedObjects = function () {
        var obj;
        while (true) {
            obj = this._removedObjects.pop();
            if (!obj) {
                break;
            }
            //obj.element.setAttribute("href", obj.originalHref);
            var parent_1 = obj.placeholder.parentElement || obj.placeholder.parentNode;
            parent_1.insertBefore(obj.element, obj.placeholder);
            //parent.removeChild(obj.placeholder);
        }
    };
    /**
     * Checkes if simplified export can be used using `createObjectURL` and SVG
     * document does not contain any external images.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @return `true` if simplified export can be used
     */
    Export.prototype.simplifiedImageExport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cache, canvas, ctx, DOMURL, svg, url, img, e_7, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.useSimplifiedExport === false) {
                            return [2 /*return*/, false];
                        }
                        cache = registry.getCache("simplifiedImageExport");
                        if (cache === false || cache === true) {
                            return [2 /*return*/, cache];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        canvas = document.createElement("canvas");
                        canvas.width = 1;
                        canvas.height = 1;
                        ctx = canvas.getContext("2d");
                        DOMURL = this.getDOMURL();
                        svg = new Blob([this.normalizeSVG("<g></g>", {}, 1, 1)], { type: "image/svg+xml" });
                        url = DOMURL.createObjectURL(svg);
                        img = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.loadNewImage(url, 1, 1)];
                    case 3:
                        img = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_7 = _a.sent();
                        return [2 /*return*/, false];
                    case 5:
                        ctx.drawImage(img, 0, 0);
                        DOMURL.revokeObjectURL(url);
                        try {
                            //let uri = canvas.toDataURL("image/png");
                            registry.setCache("simplifiedImageExport", true);
                            return [2 /*return*/, true];
                        }
                        catch (e) {
                            registry.setCache("simplifiedImageExport", false);
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        e_8 = _a.sent();
                        registry.setCache("simplifiedImageExport", false);
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns a new `<image>` element.
     *
     * @ignore Exclude from docs
     * @param url          URL of the image
     * @param width        Width (px)
     * @param height       Height (px)
     * @param crossOrigin  Cross-Origin setting
     * @return Promise
     */
    Export.prototype.loadNewImage = function (url, width, height, crossOrigin) {
        return new Promise(function (success, error) {
            // New image
            var image;
            if (width && height) {
                image = new Image(width, height);
            }
            else {
                image = new Image();
            }
            // Set crossorigin
            if (crossOrigin) {
                image.setAttribute("crossOrigin", crossOrigin);
            }
            // Report success on load
            image.onload = function () {
                success(image);
            };
            function onerror() {
                // Error occurred. Just in case it's the crossOrigin issue, let's try
                // stripping off this attribute and trying again
                if (crossOrigin) {
                    // Retain old uri
                    var currentHref = image.src;
                    // Set up another `onerror` to handle situations where image is not
                    // loadable at all (i.e. protected by CORS)
                    image.onerror = function () {
                        // Nope, no luck
                        error(new Error("Loading image \"" + url + "\" failed"));
                    };
                    // remove the `crossOrigin` attribute
                    image.removeAttribute("crossorigin");
                    // retry
                    image.src = "";
                    image.src = currentHref;
                }
                else {
                    error(new Error("Loading image \"" + url + "\" failed"));
                }
            }
            // Set image error handlers
            image.onabort = onerror;
            image.onerror = onerror;
            // Trigger load
            image.src = url;
        });
    };
    /**
     * Returns current DOM URL.
     *
     * @ignore Exclude from docs
     * @return URL
     */
    Export.prototype.getDOMURL = function () {
        return self.URL || self.webkitURL || self;
    };
    /**
     * Returns an SVG representation of the chart.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type       Type of the export
     * @param options    Options
     * @param encodeURI  If true, will return result will be data URI
     * @return Promise
     */
    Export.prototype.getSVG = function (type, options, encodeURI) {
        if (encodeURI === void 0) { encodeURI = true; }
        return __awaiter(this, void 0, void 0, function () {
            var prehidden, width, height, font, fontSize, scale, pixelRatio, svg, charset, uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prehidden = this._objectsAlreadyHidden;
                        if (!prehidden) {
                            this.hideNonExportableSprites();
                        }
                        if (!$type.hasValue(options)) {
                            options = this.getFormatOptions("svg");
                        }
                        // Wait for required elements to be ready before proceeding
                        return [4 /*yield*/, this.awaitValidSprites()];
                    case 1:
                        // Wait for required elements to be ready before proceeding
                        _a.sent();
                        width = this.sprite.pixelWidth;
                        height = this.sprite.pixelHeight;
                        font = $dom.findFont(this.sprite.dom);
                        fontSize = $dom.findFontSize(this.sprite.dom);
                        scale = options.scale || 1;
                        pixelRatio = this.getPixelRatio(options);
                        // Check if scale needs to be updated as per min/max dimensions
                        scale = this.getAdjustedScale(width * pixelRatio, height * pixelRatio, scale, options);
                        svg = this.normalizeSVG(this.serializeElement(this.sprite.paper.defs) + this.serializeElement(this.sprite.dom), options, width, height, scale, font, fontSize);
                        charset = this.adapter.apply("charset", {
                            charset: "charset=utf-8",
                            type: "svg",
                            options: options
                        }).charset;
                        uri = this.adapter.apply("getSVG", {
                            data: encodeURI ? "data:" + this.getContentType(type) + ";" + charset + "," + encodeURIComponent(svg) : svg,
                            options: options
                        }).data;
                        if (!prehidden) {
                            this.restoreNonExportableSprites();
                        }
                        return [2 /*return*/, uri];
                }
            });
        });
    };
    /**
     * Checks if SVG is fully formatted. Encloses in `<svg>...</svg>` if
     * necessary.
     *
     * @ignore Exclude from docs
     * @param svg       Input SVG
     * @param options   Options
     * @param width     Width of the SVG viewport
     * @param height    Height of the SVG viewport
     * @param font      Font family to use as a base
     * @param fontSize  Font size to use as a base
     * @return Output SVG
     * @todo Add style params to existing <svg>
     */
    Export.prototype.normalizeSVG = function (svg, options, width, height, scale, font, fontSize, background) {
        // Construct width/height params
        var dimParams = "";
        if (width) {
            dimParams += "width=\"" + Math.round(width * (scale || 1)) + "px\" ";
        }
        if (height) {
            dimParams += "height=\"" + Math.round(height * (scale || 1)) + "px\" ";
        }
        // Apply font settings
        var styleParams = "";
        if (font) {
            styleParams += "font-family: " + font.replace(/"/g, "") + ";";
        }
        if (fontSize) {
            styleParams += "font-size: " + fontSize + ";";
        }
        // Scale
        if (scale) {
            dimParams += "viewBox=\"0 0 " + (width) + " " + (height) + "\" ";
        }
        // Remove foreign objects temporarily
        var fos = [];
        var ms = svg.match(/<foreignObject[\s\S]*<\/foreignObject>/gi);
        if (ms) {
            for (var i = 0; i < ms.length; i++) {
                svg = svg.replace(ms[i], $strings.PLACEHOLDER);
                fos.push(ms[i]);
            }
        }
        // Add missing <svg> enclosure
        if (!svg.match(/<svg/)) {
            svg = "<?xml version=\"1.0\" encoding=\"utf-8\"?><svg " + dimParams + " style=\"" + styleParams + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">" + svg + "</svg>";
        }
        else {
            if (dimParams !== "") {
                // Clear current params
                svg = svg.replace(/(<svg[^>]*)width="[^"]*"/, "$1");
                svg = svg.replace(/(<svg[^>]*)height="[^"]*"/, "$1");
                // Add new params
                svg = svg.replace(/(<svg)/, "$1" + dimParams);
            }
            /*if (styleParams !== "") {
                // Clear current params
                svg = svg.replace(/(<svg[^>]*)stylewidth="[^"]*"/, "$1");
                svg = svg.replace(/(<svg[^>]*)height="[^"]*"/, "$1");

                // Add new params
                svg = svg.replace(/(<svg)/, "$1" + dimParams);
            }*/
        }
        if (background) {
            svg = svg.replace(/(<svg[^>]*>)/, "$1<rect width=\"100%\" height=\"100%\" fill=\"" + background.rgba + "\"/>");
            //svg = svg.replace(/<\/svg>/, "<rect width=\"100%\" height=\"100%\" fill=\"" + background.rgba + "\"/></svg>");
        }
        if ($browser.isInternetExplorer()) {
            // IE can't handle exporting <feColorMatrix> for some reason
            svg = svg.replace(/<feColorMatrix [^\/>]*\/>/gi, "");
        }
        // Remove base uri-related stuff
        var reg = new RegExp("url\\(" + $utils.escapeForRgex($utils.getBaseURI()), "g");
        svg = svg.replace(reg, "url(#");
        // Remove escaped quotes in url() parameters
        svg = svg.replace(/url\(&quot;([^)]*)&quot;\)/gm, "url($1)");
        // Put foreignObjects back in
        if (fos.length) {
            for (var i = 0; i < fos.length; i++) {
                svg = svg.replace($strings.PLACEHOLDER, fos[i]);
            }
        }
        svg = this.adapter.apply("normalizeSVG", {
            data: svg,
            options: options
        }).data;
        return svg;
    };
    /**
     * Serializes an element and returns its contents.
     *
     * @ignore Exclude from docs
     * @param element  An element to serialize
     * @return A serialized XML
     */
    Export.prototype.serializeElement = function (element) {
        return new XMLSerializer().serializeToString(element);
    };
    /**
     * Returns a PDF containing chart image.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type     Type of the export
     * @param options  Options
     * @return Promise
     * @async
     * @todo Account for header when calculating vertical fit
     */
    Export.prototype.getPDF = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            function addFont(font) {
                var paths = {};
                paths.normal = font.normal.path;
                vfs[font.normal.path] = font.normal.bytes;
                if (font.bold) {
                    paths.bold = font.bold.path;
                    vfs[font.bold.path] = font.bold.bytes;
                }
                else {
                    paths.bold = font.normal.path;
                }
                if (font.italics) {
                    paths.italics = font.italics.path;
                    vfs[font.italics.path] = font.italics.bytes;
                }
                else {
                    paths.italics = font.normal.path;
                }
                if (font.bolditalics) {
                    paths.bolditalics = font.bolditalics.path;
                    vfs[font.bolditalics.path] = font.bolditalics.bytes;
                }
                else {
                    paths.bolditalics = font.normal.path;
                }
                fonts[font.name] = paths;
            }
            var image, pdfmake, defaultMargins, doc, title, extraMargin, _a, _b, _c, fonts, vfs;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.getImage(options.imageFormat || "png", options)];
                    case 1:
                        image = _d.sent();
                        return [4 /*yield*/, this.pdfmake];
                    case 2:
                        pdfmake = _d.sent();
                        defaultMargins = [30, 30, 30, 30];
                        doc = {
                            pageSize: options.pageSize || "A4",
                            pageOrientation: options.pageOrientation || "portrait",
                            pageMargins: options.pageMargins || defaultMargins,
                            defaultStyle: {
                                font: options.font ? options.font.name : undefined
                            },
                            //header: <any>[],
                            content: []
                        };
                        title = this.adapter.apply("title", {
                            title: this.title,
                            options: options
                        }).title;
                        extraMargin = 0;
                        if (title) {
                            doc.content.push({
                                text: title,
                                fontSize: options.fontSize || 14,
                                bold: true,
                                margin: [0, 0, 0, 15]
                            });
                            // Add some leftover margin for title
                            extraMargin += 50;
                        }
                        // Add page URL?
                        if (options.addURL) {
                            doc.content.push({
                                text: this.language.translate("Saved from") + ": " + document.location.href,
                                fontSize: options.fontSize,
                                margin: [0, 0, 0, 15]
                            });
                            // Add some leftover margin for URL
                            extraMargin += 50;
                        }
                        // Add image
                        if (type != "pdfdata") {
                            doc.content.push({
                                image: image,
                                alignment: options.align || "left",
                                fit: this.getPageSizeFit(doc.pageSize, doc.pageMargins, extraMargin)
                            });
                        }
                        if (!(type == "pdfdata" || options.addData)) return [3 /*break*/, 4];
                        _b = (_a = doc.content).push;
                        _c = {};
                        return [4 /*yield*/, this.getPDFData("pdf", options)];
                    case 3:
                        _b.apply(_a, [(_c.table = _d.sent(),
                                _c.fontSize = options.fontSize || 14,
                                _c)]);
                        _d.label = 4;
                    case 4:
                        // Apply adapters
                        doc = this.adapter.apply("pdfmakeDocument", {
                            doc: doc,
                            options: options
                        }).doc;
                        fonts = null;
                        vfs = null;
                        if (options.font) {
                            fonts = {};
                            vfs = {};
                            addFont(options.font);
                            if (options.extraFonts) {
                                $array.each(options.extraFonts, addFont);
                            }
                        }
                        return [4 /*yield*/, new Promise(function (success, error) {
                                pdfmake.createPdf(doc, null, fonts, vfs).getDataUrl(function (uri) {
                                    success(uri);
                                });
                            })];
                    case 5: 
                    // Create PDF
                    return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    /**
     * Returns chart's data formatted suitable for PDF export (pdfmake).
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @since 4.7.0
     * @param type     Type of the export
     * @param options  Options
     * @return Promise
     * @async
     */
    Export.prototype.getPDFData = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var content, dataFields, data, dataFieldsOrder_1, len, i;
            var _this = this;
            return __generator(this, function (_a) {
                content = {
                    "body": []
                };
                dataFields = this.adapter.apply("formatDataFields", {
                    dataFields: this.dataFields,
                    format: "pdf"
                }).dataFields;
                data = this.data;
                // Vertical or horizontal (default) layout
                if (options.pivot) {
                    dataFieldsOrder_1 = this.adapter.apply("dataFieldsOrder", {
                        dataFieldsOrder: this.dataFieldsOrder,
                        format: "pdfdata"
                    }).dataFieldsOrder;
                    $object.eachOrdered(dataFields, function (key, val) {
                        var dataRow = [];
                        if (options.addColumnNames) {
                            dataRow.push(val);
                        }
                        for (var len = data.length, i = 0; i < len; i++) {
                            var dataValue = data[i][key];
                            dataRow.push(_this.convertToSpecialFormat(key, dataValue, options, true));
                        }
                        content.body.push(_this.getPDFDataRow(dataRow, options, undefined, true));
                    }, function (a, b) {
                        //console.log(a, b)
                        var ai = dataFieldsOrder_1.indexOf(a);
                        var bi = dataFieldsOrder_1.indexOf(b);
                        if (ai > bi) {
                            return 1;
                        }
                        else if (ai < bi) {
                            return -1;
                        }
                        return 0;
                    });
                }
                else {
                    // Add column names?
                    if (options.addColumnNames) {
                        content.body.push(this.getPDFDataRow(dataFields, options, undefined, true));
                        content.headerRows = 1;
                    }
                    for (len = data.length, i = 0; i < len; i++) {
                        content.body.push(this.getPDFDataRow(data[i], options, dataFields));
                    }
                }
                return [2 /*return*/, this.adapter.apply("pdfmakeTable", {
                        table: content,
                        options: options
                    }).table];
            });
        });
    };
    /**
     * Formats a row of data for use in PDF data table (pdfmake).
     *
     * @ignore Exclude from docs
     * @since 4.7.0
     * @param  row         An object holding data for the row
     * @param  options     Options
     * @param  dataFields  Data fields
     * @param  asIs        Do not try to convert to dates
     * @return Formated Data line
     */
    Export.prototype.getPDFDataRow = function (row, options, dataFields, asIs) {
        var _this = this;
        if (asIs === void 0) { asIs = false; }
        // Init
        var items = [];
        // Data fields
        if (!dataFields) {
            dataFields = row;
        }
        // Data fields order
        var dataFieldsOrder = this.adapter.apply("dataFieldsOrder", {
            dataFieldsOrder: this.dataFieldsOrder,
            format: "pdfdata"
        }).dataFieldsOrder;
        // Process each row item
        $object.eachOrdered(dataFields, function (key, name) {
            // Get value
            var value = _this.convertEmptyValue(key, row[key], options);
            // Convert dates
            var item = asIs ? value : _this.convertToSpecialFormat(key, value, options);
            item = "" + item;
            // Add to item
            items.push(item);
        }, function (a, b) {
            //console.log(a, b)
            var ai = dataFieldsOrder.indexOf(a);
            var bi = dataFieldsOrder.indexOf(b);
            if (ai > bi) {
                return 1;
            }
            else if (ai < bi) {
                return -1;
            }
            return 0;
        });
        return items;
    };
    /**
     * Returns fit dimensions for available page sizes.
     *
     * @ignore Exclude from docs
     * @param pageSize Page size
     * @return `[width, height]` in pixels
     */
    Export.prototype.getPageSizeFit = function (pageSize, margins, extraMargin) {
        if (extraMargin === void 0) { extraMargin = 0; }
        // Check margins
        var newMargins = [0, 0, 0, 0];
        if (typeof margins == "number") {
            newMargins = [margins, margins, margins, margins];
        }
        else if (margins.length == 2) {
            newMargins = [margins[0], margins[1], margins[0], margins[1]];
        }
        else if (margins.length == 4) {
            newMargins = margins;
        }
        // Define available page sizes
        var sizes = {
            "4A0": [4767.87, 6740.79],
            "2A0": [3370.39, 4767.87],
            A0: [2383.94, 3370.39],
            A1: [1683.78, 2383.94],
            A2: [1190.55, 1683.78],
            A3: [841.89, 1190.55],
            A4: [595.28, 841.89],
            A5: [419.53, 595.28],
            A6: [297.64, 419.53],
            A7: [209.76, 297.64],
            A8: [147.40, 209.76],
            A9: [104.88, 147.40],
            A10: [73.70, 104.88],
            B0: [2834.65, 4008.19],
            B1: [2004.09, 2834.65],
            B2: [1417.32, 2004.09],
            B3: [1000.63, 1417.32],
            B4: [708.66, 1000.63],
            B5: [498.90, 708.66],
            B6: [354.33, 498.90],
            B7: [249.45, 354.33],
            B8: [175.75, 249.45],
            B9: [124.72, 175.75],
            B10: [87.87, 124.72],
            C0: [2599.37, 3676.54],
            C1: [1836.85, 2599.37],
            C2: [1298.27, 1836.85],
            C3: [918.43, 1298.27],
            C4: [649.13, 918.43],
            C5: [459.21, 649.13],
            C6: [323.15, 459.21],
            C7: [229.61, 323.15],
            C8: [161.57, 229.61],
            C9: [113.39, 161.57],
            C10: [79.37, 113.39],
            RA0: [2437.80, 3458.27],
            RA1: [1729.13, 2437.80],
            RA2: [1218.90, 1729.13],
            RA3: [864.57, 1218.90],
            RA4: [609.45, 864.57],
            SRA0: [2551.18, 3628.35],
            SRA1: [1814.17, 2551.18],
            SRA2: [1275.59, 1814.17],
            SRA3: [907.09, 1275.59],
            SRA4: [637.80, 907.09],
            EXECUTIVE: [521.86, 756.00],
            FOLIO: [612.00, 936.00],
            LEGAL: [612.00, 1008.00],
            LETTER: [612.00, 792.00],
            TABLOID: [792.00, 1224.00]
        };
        // Calculate size
        var fitSize = sizes[pageSize];
        fitSize[0] -= newMargins[0] + newMargins[2];
        fitSize[1] -= newMargins[1] + newMargins[3] + extraMargin;
        return fitSize;
    };
    /**
     * Returns an Excel file of chart's data.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type     Type of the export
     * @param options  Options
     * @return Promise
     * @async
     * @todo Handle dates
     * @todo Support for multi-sheet
     */
    Export.prototype.getExcel = function (type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var XLSX, wbOptions, sheetName, wb, data, dataFields, dataFieldsOrder_2, len, i, uri;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!$type.hasValue(options)) {
                            options = this.getFormatOptions("xlsx");
                        }
                        return [4 /*yield*/, this.xlsx];
                    case 1:
                        XLSX = _a.sent();
                        wbOptions = this.adapter.apply("xlsxWorkbookOptions", {
                            xlsx: XLSX,
                            options: {
                                bookType: "xlsx",
                                bookSST: false,
                                type: "base64",
                            }
                        }).options;
                        sheetName = this.normalizeExcelSheetName(this.adapter.apply("xlsxSheetName", {
                            xlsx: XLSX,
                            name: this.title || this.language.translate("Data")
                        }).name);
                        wb = {
                            SheetNames: [sheetName],
                            Sheets: {}
                        };
                        data = [];
                        dataFields = this.adapter.apply("formatDataFields", {
                            dataFields: this.dataFields,
                            format: "xslx"
                        }).dataFields;
                        // Vertical or horizontal (default) layout
                        if (options.pivot) {
                            dataFieldsOrder_2 = this.adapter.apply("dataFieldsOrder", {
                                dataFieldsOrder: this.dataFieldsOrder,
                                format: "xlsx"
                            }).dataFieldsOrder;
                            $object.eachOrdered(dataFields, function (key, val) {
                                var dataRow = [];
                                if (options.addColumnNames) {
                                    dataRow.push(val);
                                }
                                for (var len = _this.data.length, i = 0; i < len; i++) {
                                    var dataValue = _this.data[i][key];
                                    dataRow.push(_this.convertToSpecialFormat(key, dataValue, options, true));
                                }
                                data.push(_this.getExcelRow(dataRow, options, undefined, true));
                            }, function (a, b) {
                                //console.log(a, b)
                                var ai = dataFieldsOrder_2.indexOf(a);
                                var bi = dataFieldsOrder_2.indexOf(b);
                                if (ai > bi) {
                                    return 1;
                                }
                                else if (ai < bi) {
                                    return -1;
                                }
                                return 0;
                            });
                        }
                        else {
                            // Add column names?
                            if (options.addColumnNames) {
                                data.push(this.getExcelRow(dataFields, options, undefined, true));
                            }
                            // Add lines
                            for (len = this.data.length, i = 0; i < len; i++) {
                                data.push(this.getExcelRow(this.data[i], options, dataFields));
                            }
                        }
                        // Create sheet and add data
                        wb.Sheets[sheetName] = XLSX.utils.aoa_to_sheet(data);
                        // Apply adapters
                        wb = this.adapter.apply("xlsxWorkbook", {
                            xlsx: XLSX,
                            workbook: wb,
                            options: options
                        }).workbook;
                        uri = this.adapter.apply("getExcel", {
                            data: "data:" + this.getContentType(type) + ";base64," + XLSX.write(wb, wbOptions),
                            options: options
                        }).data;
                        return [2 /*return*/, uri];
                }
            });
        });
    };
    /**
     * This is needed to work around Excel limitations.
     *
     * @param name  Source name
     * @return Normalized name
     */
    Export.prototype.normalizeExcelSheetName = function (name) {
        name = name.replace(/([:\\\/?*\[\]]+)/g, " ");
        return $utils.truncateWithEllipsis(name, 31, "...", true);
    };
    /**
     * Rertuns an array of values to be used as Excel row.
     *
     * @ignore Exclude from docs
     * @param  row         Row data
     * @param  options     Options
     * @param  dataFields  Data fields
     * @param  asIs        Do not try to convert to dates
     * @return Array of values
     */
    Export.prototype.getExcelRow = function (row, options, dataFields, asIs) {
        var _this = this;
        if (asIs === void 0) { asIs = false; }
        // Init
        var items = [];
        // Data fields
        if (!dataFields) {
            dataFields = row;
        }
        // Data fields order
        var dataFieldsOrder = this.adapter.apply("dataFieldsOrder", {
            dataFieldsOrder: this.dataFieldsOrder,
            format: "xlsx"
        }).dataFieldsOrder;
        // Process each row item
        $object.eachOrdered(dataFields, function (key, name) {
            // Get value
            var value = _this.convertEmptyValue(key, row[key], options);
            // Convert dates
            var item = asIs ? value : _this.convertToSpecialFormat(key, value, options, true);
            items.push(item);
        }, function (a, b) {
            //console.log(a, b)
            var ai = dataFieldsOrder.indexOf(a);
            var bi = dataFieldsOrder.indexOf(b);
            if (ai > bi) {
                return 1;
            }
            else if (ai < bi) {
                return -1;
            }
            return 0;
        });
        return items;
    };
    /**
     * Returns chart's data formatted as CSV.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type       Type of the export
     * @param options    Options
     * @param encodeURI  If true, will return result will be data URI
     * @return Promise
     * @async
     */
    Export.prototype.getCSV = function (type, options, encodeURI) {
        if (encodeURI === void 0) { encodeURI = true; }
        return __awaiter(this, void 0, void 0, function () {
            var csv, dataFields, br, data, dataFieldsOrder_3, len, i, row, charset, uri;
            var _this = this;
            return __generator(this, function (_a) {
                if (!$type.hasValue(options)) {
                    options = this.getFormatOptions("csv");
                }
                csv = "";
                dataFields = this.adapter.apply("formatDataFields", {
                    dataFields: this.dataFields,
                    format: "csv"
                }).dataFields;
                br = "";
                data = this.data;
                // Vertical or horizontal (default) layout
                if (options.pivot) {
                    dataFieldsOrder_3 = this.adapter.apply("dataFieldsOrder", {
                        dataFieldsOrder: this.dataFieldsOrder,
                        format: "csv"
                    }).dataFieldsOrder;
                    $object.eachOrdered(dataFields, function (key, val) {
                        var dataRow = [];
                        if (options.addColumnNames) {
                            dataRow.push(val);
                        }
                        for (var len = data.length, i = 0; i < len; i++) {
                            var dataValue = data[i][key];
                            dataRow.push(_this.convertToSpecialFormat(key, dataValue, options, true));
                        }
                        csv += br + _this.getCSVRow(dataRow, options, undefined, true);
                        br = "\n";
                    }, function (a, b) {
                        var ai = dataFieldsOrder_3.indexOf(a);
                        var bi = dataFieldsOrder_3.indexOf(b);
                        if (ai > bi) {
                            return -1;
                        }
                        else if (ai < bi) {
                            return 1;
                        }
                        return 0;
                    });
                }
                else {
                    for (len = data.length, i = 0; i < len; i++) {
                        row = this.getCSVRow(data[i], options, dataFields);
                        if (options.reverse) {
                            csv = row + br + csv;
                        }
                        else {
                            csv += br + row;
                        }
                        br = "\n";
                    }
                    // Add column names?
                    if (options.addColumnNames) {
                        csv = this.getCSVRow(dataFields, options, undefined, true) + br + csv;
                    }
                }
                charset = this.adapter.apply("charset", {
                    charset: "charset=utf-8",
                    type: type,
                    options: options
                }).charset;
                uri = this.adapter.apply("getCSV", {
                    data: encodeURI ? "data:" + this.getContentType(type) + ";" + charset + "," + encodeURIComponent(csv) : csv,
                    options: options
                }).data;
                return [2 /*return*/, uri];
            });
        });
    };
    /**
     * Formats a row of CSV data.
     *
     * @ignore Exclude from docs
     * @param  row         An object holding data for the row
     * @param  options     Options
     * @param  dataFields  Data fields
     * @param  asIs        Do not try to convert to dates
     * @return Formated CSV line
     */
    Export.prototype.getCSVRow = function (row, options, dataFields, asIs) {
        var _this = this;
        if (asIs === void 0) { asIs = false; }
        // Init
        var separator = options.separator || ",";
        var items = [];
        // Data fields
        if (!dataFields) {
            dataFields = row;
        }
        // Data fields order
        var dataFieldsOrder = this.adapter.apply("dataFieldsOrder", {
            dataFieldsOrder: this.dataFieldsOrder,
            format: "csv"
        }).dataFieldsOrder;
        // Process each row item
        $object.eachOrdered(dataFields, function (key, name) {
            // Get value
            var value = _this.convertEmptyValue(key, row[key], options);
            // Check if we need to skip
            // This is no longer required because we are iterating via dataFields anyway
            /*if ($type.hasValue(this.dataFields) && !$type.hasValue(this.dataFields[key])) {
                return;
            }*/
            // Convert dates
            var item = asIs ? value : _this.convertToSpecialFormat(key, value, options);
            // Cast and escape doublequotes
            item = "" + item;
            item = item.replace(/"/g, '""');
            // Enclose into double quotes
            if (options.forceQuotes || (item.search(new RegExp("\"|\n|" + separator, "g")) >= 0)) {
                item = "\"" + item + "\"";
            }
            // Add to item
            items.push(item);
        }, function (a, b) {
            //console.log(a, b)
            var ai = dataFieldsOrder.indexOf(a);
            var bi = dataFieldsOrder.indexOf(b);
            if (ai > bi) {
                return 1;
            }
            else if (ai < bi) {
                return -1;
            }
            return 0;
        });
        return items.join(separator);
    };
    /**
     * Returns chart's data formatted as HTML table.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @since 4.7.0
     * @param type       Type of the export
     * @param options    Options
     * @param encodeURI  If true, will return result will be data URI
     * @return Promise
     * @async
     */
    Export.prototype.getHTML = function (type, options, encodeURI) {
        if (encodeURI === void 0) { encodeURI = true; }
        return __awaiter(this, void 0, void 0, function () {
            var html, dataFields, data, dataFieldsOrder_4, len, i, charset, uri;
            var _this = this;
            return __generator(this, function (_a) {
                if (!$type.hasValue(options)) {
                    options = this.getFormatOptions("html");
                }
                html = "<table>";
                if (options.tableClass) {
                    html = "<table class=\"" + options.tableClass + "\">";
                }
                dataFields = this.adapter.apply("formatDataFields", {
                    dataFields: this.dataFields,
                    format: "html"
                }).dataFields;
                data = this.data;
                // Vertical or horizontal (default) layout
                if (options.pivot) {
                    dataFieldsOrder_4 = this.adapter.apply("dataFieldsOrder", {
                        dataFieldsOrder: this.dataFieldsOrder,
                        format: "html"
                    }).dataFieldsOrder;
                    html += "\n<tbody>";
                    $object.eachOrdered(dataFields, function (key, val) {
                        var dataRow = [];
                        if (options.addColumnNames) {
                            dataRow.push(val);
                        }
                        for (var len = data.length, i = 0; i < len; i++) {
                            var dataValue = data[i][key];
                            dataRow.push(_this.convertToSpecialFormat(key, dataValue, options, true));
                        }
                        html += "\n" + _this.getHTMLRow(dataRow, options, undefined, true);
                    }, function (a, b) {
                        var ai = dataFieldsOrder_4.indexOf(a);
                        var bi = dataFieldsOrder_4.indexOf(b);
                        if (ai > bi) {
                            return -1;
                        }
                        else if (ai < bi) {
                            return 1;
                        }
                        return 0;
                    });
                    html += "\n</tbody>";
                }
                else {
                    // Add column names?
                    if (options.addColumnNames) {
                        html += "\n<thead>\n" + this.getHTMLRow(dataFields, options, undefined, true, true) + "\n</thead>";
                    }
                    html += "\n<tbody>";
                    for (len = data.length, i = 0; i < len; i++) {
                        html += "\n" + this.getHTMLRow(data[i], options, dataFields);
                    }
                    html += "\n</tbody>";
                }
                html += "\n</table>";
                charset = this.adapter.apply("charset", {
                    charset: "charset=utf-8",
                    type: type,
                    options: options
                }).charset;
                uri = this.adapter.apply("getHTML", {
                    data: encodeURI ? "data:" + this.getContentType(type) + ";" + charset + "," + encodeURIComponent(html) : html,
                    options: options
                }).data;
                return [2 /*return*/, uri];
            });
        });
    };
    /**
     * Formats a row of HTML data.
     *
     * @since 4.7.0
     * @ignore Exclude from docs
     * @param  row         An object holding data for the row
     * @param  options     Options
     * @param  dataFields  Data fields
     * @param  asIs        Do not try to convert to dates
     * @return Formated HTML row
     */
    Export.prototype.getHTMLRow = function (row, options, dataFields, asIs, headerRow) {
        var _this = this;
        if (asIs === void 0) { asIs = false; }
        if (headerRow === void 0) { headerRow = false; }
        // Init output
        var html = "\t<tr>";
        if (options.rowClass) {
            html = "\t<tr class=\"" + options.rowClass + "\">";
        }
        // Data fields
        if (!dataFields) {
            dataFields = row;
        }
        // Data fields order
        var dataFieldsOrder = this.adapter.apply("dataFieldsOrder", {
            dataFieldsOrder: this.dataFieldsOrder,
            format: "html"
        }).dataFieldsOrder;
        // th or dh?
        var tag = headerRow ? "th" : "td";
        // Process each row item
        var first = true;
        $object.eachOrdered(dataFields, function (key, name) {
            // Get value
            var value = _this.convertEmptyValue(key, row[key], options);
            // Convert dates
            var item = asIs ? value : _this.convertToSpecialFormat(key, value, options);
            // Escape HTML entities
            item = "" + item;
            item = item.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
                return "&#" + i.charCodeAt(0) + ";";
            });
            // Which tag to use
            var useTag = tag;
            if (options.pivot && first) {
                useTag = "th";
            }
            // Add cell
            if (options.cellClass) {
                html += "\n\t\t<" + useTag + " class=\"" + options.cellClass + "\">" + item + "</" + useTag + ">";
            }
            else {
                html += "\n\t\t<" + useTag + ">" + item + "</" + useTag + ">";
            }
            first = false;
        }, function (a, b) {
            var ai = dataFieldsOrder.indexOf(a);
            var bi = dataFieldsOrder.indexOf(b);
            if (ai > bi) {
                return 1;
            }
            else if (ai < bi) {
                return -1;
            }
            return 0;
        });
        html += "\n\t</tr>";
        return html;
    };
    /**
     * Returns chart's data in JSON format.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param type       Type of the export
     * @param options    Options
     * @param encodeURI  If true, will return result will be data URI
     * @return Promise
     * @async
     */
    Export.prototype.getJSON = function (type, options, encodeURI) {
        if (encodeURI === void 0) { encodeURI = true; }
        return __awaiter(this, void 0, void 0, function () {
            var data, dataFields, sourceData, _loop_1, len, i, json, charset, uri;
            var _this = this;
            return __generator(this, function (_a) {
                if (!$type.hasValue(options)) {
                    options = this.getFormatOptions("json");
                }
                dataFields = this.adapter.apply("formatDataFields", {
                    dataFields: this.dataFields,
                    format: "json"
                }).dataFields;
                if (!this._dynamicDataFields) {
                    data = [];
                    sourceData = this.data;
                    _loop_1 = function (len, i) {
                        var value = sourceData[i];
                        if (typeof value == "object") {
                            var newValue_1 = {};
                            $object.each(value, function (field, item) {
                                if ($type.hasValue(dataFields[field])) {
                                    newValue_1[dataFields[field]] = _this.convertToSpecialFormat(field, item, options);
                                }
                            });
                            data.push(newValue_1);
                        }
                    };
                    for (len = sourceData.length, i = 0; i < len; i++) {
                        _loop_1(len, i);
                    }
                }
                else {
                    data = this.data;
                }
                json = JSON.stringify(data, function (key, value) {
                    if (typeof value == "object") {
                        $object.each(value, function (field, item) {
                            value[field] = _this.convertToSpecialFormat(field, item, options);
                        });
                    }
                    return value;
                }, options.indent);
                charset = this.adapter.apply("charset", {
                    charset: "charset=utf-8",
                    type: type,
                    options: options
                }).charset;
                uri = this.adapter.apply("getJSON", {
                    data: encodeURI ? "data:" + this.getContentType(type) + ";" + charset + "," + encodeURIComponent(json) : json,
                    options: options
                }).data;
                return [2 /*return*/, uri];
            });
        });
    };
    /**
     * Converts the value to proper date format.
     *
     * @ignore Exclude from docs
     * @param  field         Field name
     * @param  value         Value
     * @param  options       Options
     * @param  keepOriginal  Will ignore formatting and will keep value as it is in data
     * @return Formatted date value or unmodified value
     */
    Export.prototype.convertToSpecialFormat = function (field, value, options, keepOriginal) {
        // Is this a timestamp or duration?
        if (typeof value == "number") {
            if (this.isDateField(field)) {
                value = new Date(value);
            }
            else if (this.isDurationField(field)) {
                return this.durationFormatter.format(value, this.durationFormat);
            }
            else if (this.isNumberField(field) && this.numberFormat) {
                return this.numberFormatter.format(value, this.numberFormat);
            }
        }
        if (value instanceof Date) {
            if (options.useTimestamps) {
                value = value.getTime();
            }
            else if (options.useLocale) {
                if (!keepOriginal) {
                    value = value.toLocaleString();
                }
            }
            else {
                value = this.dateFormatter.format(value, this.dateFormat);
            }
        }
        else if ($type.isString(value) && this.isDateField(field) && this.dateFormat) {
            value = this.dateFormatter.format(this.dateFormatter.parse(value), this.dateFormat);
        }
        return value;
    };
    /**
     * Converts empty value based on `emptyAs` option.
     *
     * @ignore Exclude from docs
     */
    Export.prototype.convertEmptyValue = function (field, value, options) {
        return $type.hasValue(value) ? value : options.emptyAs;
    };
    /**
     * Triggers download of the file.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param uri       Data URI with file content
     * @param fileName  File name
     * @return Promise
     * @async
     */
    Export.prototype.download = function (uri, fileName, addBOM) {
        if (addBOM === void 0) { addBOM = false; }
        return __awaiter(this, void 0, void 0, function () {
            var parts, contentType, decoded, blob_1, chars, i, charCode, blob, link_1, parts, contentType, decoded, blob_2, url_2, chars, i, charCode, blob, url_3, link, parts, contentType, iframe, idoc;
            return __generator(this, function (_a) {
                if (this.msBlobDownloadSupport()) {
                    parts = uri.split(";");
                    contentType = parts.shift().replace(/data:/, "");
                    uri = decodeURIComponent(parts.join(";").replace(/^[^,]*,/, ""));
                    // Check if we need to Base64-decode
                    if (["image/svg+xml", "application/json", "text/csv"].indexOf(contentType) == -1) {
                        try {
                            decoded = atob(uri);
                            uri = decoded;
                        }
                        catch (e) {
                            // Error occurred, meaning string was not Base64-encoded. Do nothing.
                            return [2 /*return*/, false];
                        }
                    }
                    else {
                        blob_1 = new Blob([uri], { type: contentType });
                        window.navigator.msSaveBlob(blob_1, fileName);
                        return [2 /*return*/, true];
                    }
                    chars = new Array(uri.length);
                    for (i = 0; i < uri.length; ++i) {
                        charCode = uri.charCodeAt(i);
                        chars[i] = charCode;
                    }
                    blob = new Blob([new Uint8Array(chars)], { type: contentType });
                    window.navigator.msSaveBlob(blob, fileName);
                }
                else if (this.blobDownloadSupport()) {
                    link_1 = document.createElement("a");
                    link_1.download = fileName;
                    document.body.appendChild(link_1);
                    parts = uri.split(";");
                    contentType = parts.shift().replace(/data:/, "");
                    uri = decodeURIComponent(parts.join(";").replace(/^[^,]*,/, ""));
                    if (["image/svg+xml", "application/json", "text/csv", "text/html"].indexOf(contentType) == -1) {
                        try {
                            decoded = atob(uri);
                            uri = decoded;
                        }
                        catch (e) {
                            // Error occurred, meaning string was not Base64-encoded. Do nothing.
                            return [2 /*return*/, false];
                        }
                    }
                    else {
                        if (addBOM) {
                            uri = "\ufeff" + uri;
                        }
                        blob_2 = new Blob([uri], { type: contentType });
                        url_2 = window.URL.createObjectURL(blob_2);
                        link_1.href = url_2;
                        link_1.download = fileName;
                        link_1.click();
                        setTimeout(function () {
                            document.body.removeChild(link_1);
                            window.URL.revokeObjectURL(url_2);
                        }, 100);
                        return [2 /*return*/, true];
                    }
                    chars = new Array(uri.length);
                    for (i = 0; i < uri.length; ++i) {
                        charCode = uri.charCodeAt(i);
                        chars[i] = charCode;
                    }
                    if (addBOM) {
                        chars = [0xEF, 0xBB, 0xBF].concat(chars);
                    }
                    blob = new Blob([new Uint8Array(chars)], { type: contentType });
                    url_3 = window.URL.createObjectURL(blob);
                    link_1.href = url_3;
                    link_1.download = fileName;
                    document.body.appendChild(link_1);
                    link_1.click();
                    document.body.removeChild(link_1);
                    setTimeout(function () {
                        window.URL.revokeObjectURL(url_3);
                    }, 100);
                }
                else if (this.linkDownloadSupport()) {
                    link = document.createElement("a");
                    link.download = fileName;
                    link.href = uri;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                else if (this.legacyIE()) {
                    parts = uri.match(/^data:(.*);[ ]*([^,]*),(.*)$/);
                    if (parts.length === 4) {
                        // Base64-encoded or text-based stuff?
                        if (parts[2] == "base64") {
                            // Base64-encoded - probably an image
                            if (parts[1].match(/^image\//)) {
                                // Yep, an image. Let's create a temporary image placeholder,
                                // so that user can use do Save As.
                                this.showModal("<img src=\"" + uri + "\" style=\"float: left; max-width: 50%; max-height: 80%; margin: 0 1em 0.5em 0; border: 1px solid #eee;\" />" +
                                    "<p>" + this.language.translate("To save the image, right-click thumbnail on the left and choose \"Save picture as...\"") +
                                    "</p>" +
                                    "<p style=\"text-align: center;\"><small>" + this.language.translate("(Press ESC to close this message)") + "</small></p>", this.language.translate("Image Export Complete"));
                            }
                        }
                        else {
                            contentType = void 0;
                            if (fileName.match(/\.svg$/)) {
                                contentType = "image/svg+xml";
                            }
                            else {
                                contentType = "text/plain";
                                fileName += ".txt";
                            }
                            iframe = document.createElement("iframe");
                            iframe.width = "1px";
                            iframe.height = "1px";
                            iframe.style.display = "none";
                            document.body.appendChild(iframe);
                            idoc = iframe.contentDocument;
                            idoc.open(contentType, "replace");
                            // TODO test this with various encodings (e.g. UTF)
                            //idoc.charset = parts[2].replace(/charset=/, "");
                            idoc.write(decodeURIComponent(parts[3]));
                            idoc.close();
                            idoc.execCommand("SaveAs", true, fileName);
                            // Destroy the iframe
                            document.body.removeChild(iframe);
                        }
                    }
                }
                else {
                    /**
                     * Something else - perhaps a mobile.
                     * Let's just display it in the same page.
                     * (hey we don't like it either)
                     */
                    window.location.href = uri;
                }
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * Returns `true` if browser has any supported methods to trigger download
     * of a binary file.
     *
     * @return Supports downloads?
     */
    Export.prototype.downloadSupport = function () {
        //return !this.legacyIE();
        return this.linkDownloadSupport() || this.msBlobDownloadSupport();
    };
    /**
     * Checks if the browser supports "download" attribute on links.
     *
     * @ignore Exclude from docs
     * @return Browser supports triggering downloads?
     */
    Export.prototype.linkDownloadSupport = function () {
        // Do we have this cached?
        var cache = registry.getCache("linkDownloadSupport");
        if (cache === false || cache === true) {
            return cache;
        }
        var a = document.createElement("a");
        var res = typeof a.download !== "undefined";
        registry.setCache("linkDownloadSupport", res);
        return res;
    };
    /**
     * Checks if the browser supports download via `msBlob`.
     *
     * @ignore Exclude from docs
     * @return Browser supports triggering downloads?
     */
    Export.prototype.blobDownloadSupport = function () {
        return $type.hasValue(window.Blob);
    };
    /**
     * Checks if the browser supports download via `msBlob`.
     *
     * @ignore Exclude from docs
     * @return Browser supports triggering downloads?
     */
    Export.prototype.msBlobDownloadSupport = function () {
        return $type.hasValue(window.navigator.msSaveOrOpenBlob);
    };
    /**
     * Checks if this is a legacy version of IE.
     *
     * @ignore Exclude from docs
     * @return IE9 or less?
     */
    Export.prototype.legacyIE = function () {
        // Create a temporary <div> with conditional tags in it an an <i> tag.
        // Count <i>s. If there are some, we have IE9 or late on our hands.
        var div = document.createElement("div");
        div.innerHTML = "<!--[if lt IE 10]><i></i><![endif]-->";
        return div.getElementsByTagName("i").length == 1;
    };
    /**
     * Initiates print of the chart.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @param data     Data URI for the image
     * @param options  Options
     * @param title    Optional title to use (uses window's title by default)
     * @return Promise
     * @async
     */
    Export.prototype.print = function (data, options, title) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (options.printMethod == "css") {
                    return [2 /*return*/, this.printViaCSS(data, options, title)];
                }
                else {
                    return [2 /*return*/, this.printViaIframe(data, options, title)];
                }
                return [2 /*return*/];
            });
        });
    };
    Export.prototype.printViaCSS = function (data, options, title) {
        return __awaiter(this, void 0, void 0, function () {
            var scroll, rule, originalTitle, img, isIOS;
            return __generator(this, function (_a) {
                scroll = document.documentElement.scrollTop || document.body.scrollTop;
                rule = new StyleRule($dom.getShadowRoot(this.container), "body > *", {
                    "display": "none",
                    "position": "fixed",
                    "visibility": "hidden",
                    "opacity": "0",
                    "clipPath": "polygon(0px 0px,0px 0px,0px 0px,0px 0px);"
                });
                if (title && document && document.title) {
                    originalTitle = document.title;
                    document.title = title;
                }
                img = new Image();
                img.src = data;
                img.style.maxWidth = "100%";
                img.style.display = "block";
                img.style.position = "relative";
                img.style.visibility = "visible";
                img.style.opacity = "1";
                img.style.clipPath = "none";
                document.body.appendChild(img);
                // Print
                this.setTimeout(function () {
                    window.print();
                }, 50);
                isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                if (isIOS && (options.delay < 1000)) {
                    options.delay = 1000;
                }
                else if (options.delay < 100) {
                    options.delay = 100;
                }
                // Delay function that resets back the document the way ot was before
                this.setTimeout(function () {
                    // Remove image
                    document.body.removeChild(img);
                    // Reset back all elements
                    /*for (let len = items.length, i = 0; i < len; i++) {
                        let item = <HTMLElement>items[i];
                        if ($dom.isElement(item)) {
                            item.style.display = states[i];
                        }
                    }*/
                    rule.dispose();
                    // Restore title
                    if (originalTitle) {
                        document.title = document.title;
                    }
                    // Scroll back the document the way it was before
                    document.documentElement.scrollTop = document.body.scrollTop = scroll;
                }, options.delay || 500);
                return [2 /*return*/, true];
            });
        });
    };
    Export.prototype.printViaIframe = function (data, options, title) {
        return __awaiter(this, void 0, void 0, function () {
            var iframe, img, isIOS;
            return __generator(this, function (_a) {
                iframe = document.createElement("iframe");
                iframe.style.visibility = "hidden";
                document.body.appendChild(iframe);
                // This is needed for FireFox
                iframe.contentWindow.document.open();
                iframe.contentWindow.document.close();
                img = new Image();
                img.src = data;
                img.style.maxWidth = "100%";
                img.style.height = "auto";
                if (title) {
                    iframe.contentWindow.document.title = title;
                }
                iframe.contentWindow.document.body.appendChild(img);
                iframe.load = function () {
                    iframe.contentWindow.document.body.appendChild(img);
                };
                // Print
                this.setTimeout(function () {
                    try {
                        if (!iframe.contentWindow.document.execCommand("print", false, null)) {
                            iframe.contentWindow.print();
                        }
                    }
                    catch (e) {
                        iframe.contentWindow.print();
                    }
                }, options.delay || 50);
                isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                if (isIOS && (options.delay < 1000)) {
                    options.delay = 1000;
                }
                else if (options.delay < 100) {
                    options.delay = 100;
                }
                // Delay function that resets back the document the way ot was before
                this.setTimeout(function () {
                    // Remove image
                    document.body.removeChild(iframe);
                }, options.delay + 50 || 100);
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * Finds a background color for the element. If element is transparent it goes
     * up the DOM hierarchy to find a parent element that does.
     *
     * @ignore Exclude from docs
     * @param element Element
     * @return Color code
     */
    Export.prototype.findBackgroundColor = function (element) {
        // Check if element has styles set
        var opacity = 1, currentColor = getComputedStyle(element, "background-color");
        // Check opacity
        if (currentColor.match(/[^,]*,[^,]*,[^,]*,[ ]?0/) || currentColor == "transparent") {
            opacity = 0;
        }
        if (opacity == 0) {
            var parent_2 = element.parentElement; // || <Element>element.parentNode;
            // Completely transparent. Look for a parent
            if (parent_2) {
                return this.findBackgroundColor(parent_2);
            }
            else {
                return color("#fff");
            }
        }
        else {
            return color(currentColor, opacity);
        }
    };
    Object.defineProperty(Export.prototype, "container", {
        /**
         * @return Reference
         */
        get: function () {
            return this.adapter.apply("container", {
                container: this._container
            }).container;
        },
        /**
         * A reference to a container to be used to place [[ExportMenu]] in.
         *
         * @param value Reference
         */
        set: function (value) {
            this._container = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "sprite", {
        /**
         * @return Sprite
         */
        get: function () {
            return this.adapter.apply("sprite", {
                sprite: this._sprite
            }).sprite;
        },
        /**
         * A reference to [[Sprite]] to export. Can be any Sprite, including some
         * internal elements.
         *
         * @param value Sprite
         */
        set: function (value) {
            this._sprite = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "extraSprites", {
        /**
         * @return Sprite
         */
        get: function () {
            return this.adapter.apply("extraSprites", {
                extraSprites: this._extraSprites
            }).extraSprites;
        },
        /**
         * An array of extra [[Sprite]] elements to include in export.
         *
         * It can be used to export any external elements, or even other charts.
         *
         * E.g.:
         *
         * ```TypeScript
         * chart.exporting.extraSprites.push(chart2);
         * ```
         * ```JavaScript
         * chart.exporting.extraSprites.push(chart2);
         * ```
         *
         * IMPORTANT: This setting is ignored when exporting to SVG format.
         *
         * @since 4.2.0
         * @param value Sprite
         */
        set: function (value) {
            this._extraSprites = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "validateSprites", {
        /**
         * @return Sprite
         */
        get: function () {
            return this.adapter.apply("validateSprites", {
                validateSprites: this._validateSprites
            }).validateSprites;
        },
        /**
         * An array of [[Sprite]] elements that need to be valid before export
         * commences.
         *
         * If any of those elements is not completely ready when export is triggered,
         * the export will wait until they are (their `validated` event triggers)
         * before going through with the export opertaion.
         *
         * This is useful if you need to modify chart appearance for the export.
         *
         * E.g.:
         *
         * ```TypeScript
         * // Add watermark
         * let watermark = chart.createChild(am4core.Label);
         * watermark.text = "Copyright (C) 2019";
         * watermark.disabled = true;
         *
         * // Add watermark to validated sprites
         * chart.exporting.validateSprites.push(watermark);
         *
         * // Enable watermark on export
         * chart.exporting.events.on("exportstarted", function(ev) {
         *   watermark.disabled = false;
         * });
         *
         * // Disable watermark when export finishes
         * chart.exporting.events.on("exportfinished", function(ev) {
         *   watermark.disabled = true;
         * });
         * ```
         * ```JavaScript
         * // Add watermark
         * var watermark = chart.createChild(am4core.Label);
         * watermark.text = "Copyright (C) 2019";
         * watermark.disabled = true;
         *
         * // Add watermark to validated sprites
         * chart.exporting.validateSprites.push(watermark);
         *
         * // Enable watermark on export
         * chart.exporting.events.on("exportstarted", function(ev) {
         *   watermark.disabled = false;
         * });
         *
         * // Disable watermark when export finishes
         * chart.exporting.events.on("exportfinished", function(ev) {
         *   watermark.disabled = true;
         * });
         * ```
         *
         * @since 4.6.8
         * @param value Sprite
         */
        set: function (value) {
            this._validateSprites = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "data", {
        /**
         * @return Data
         */
        get: function () {
            return this.adapter.apply("data", {
                data: this._data
            }).data;
        },
        /**
         * Data to export.
         *
         * @param value Data
         */
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "dataFields", {
        /**
         * @return Field names `{ field: fieldName }`
         */
        get: function () {
            if (!this._dataFields) {
                this.generateDataFields();
            }
            return this.adapter.apply("dataFields", {
                dataFields: this._dataFields
            }).dataFields;
        },
        /**
         * Data fields in `{ field: fieldName }` format. Those are used for
         * exporting in data formats to name the columns.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/exporting/#Changing_order_and_names_of_columns} for examples and details
         * @param value Field names
         */
        set: function (value) {
            this._dataFields = value;
            this._dynamicDataFields = false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after target chart's data updates.
     *
     * @ignore
     */
    Export.prototype.handleDataUpdated = function () {
        if (this._dynamicDataFields) {
            this._dataFields = undefined;
        }
        var hasData = this.data.length > 0;
        if (this._prevHasData != hasData) {
            this._prevHasData = hasData;
            if (this.menu) {
                this.menu.invalidate();
            }
        }
    };
    Object.defineProperty(Export.prototype, "dateFormatter", {
        /**
         * @return A DateFormatter instance
         */
        get: function () {
            if (!this._dateFormatter) {
                this._dateFormatter = new DateFormatter();
                this._dateFormatter.language = this.language;
            }
            return this.adapter.apply("dateFormatter", {
                dateFormatter: this._dateFormatter
            }).dateFormatter;
        },
        /**
         * A [[DateFormatter]] to use when formatting dates when exporting data.
         *
         * @param value DateFormatter instance
         */
        set: function (value) {
            this._dateFormatter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "dateFormat", {
        /**
         * @return Date format
         */
        get: function () {
            return this.adapter.apply("dateFormat", {
                dateFormat: this._dateFormat
            }).dateFormat;
        },
        /**
         * A date format to use for exporting dates. Will use [[DateFormatter]]
         * format if not set.
         *
         * @param value Date format
         */
        set: function (value) {
            this._dateFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "dateFields", {
        /**
         * @return Date field list
         */
        get: function () {
            if (!this._dateFields) {
                this._dateFields = new List();
            }
            return this.adapter.apply("dateFields", {
                dateFields: this._dateFields
            }).dateFields;
        },
        /**
         * A list of fields that hold date values.
         *
         * @param value Date field list
         */
        set: function (value) {
            this._dateFields = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "numberFormatter", {
        /**
         * @return A NumberFormatter instance
         */
        get: function () {
            if (!this._numberFormatter) {
                this._numberFormatter = new NumberFormatter();
                this._numberFormatter.language = this.language;
            }
            return this.adapter.apply("numberFormatter", {
                numberFormatter: this._numberFormatter
            }).numberFormatter;
        },
        /**
         * A [[NumberFormatter]] to use when formatting dates when exporting data.
         *
         * @since 4.5.15
         * @param value NumberFormatter instance
         */
        set: function (value) {
            this._numberFormatter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "numberFormat", {
        /**
         * @return Number format
         */
        get: function () {
            return this.adapter.apply("numberFormat", {
                numberFormat: this._numberFormat
            }).numberFormat;
        },
        /**
         * A number format to use for exporting dates. Will use [[NumberFormatter]]
         * format if not set.
         *
         * @since 4.5.15
         * @param value Number format
         */
        set: function (value) {
            this._numberFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "numberFields", {
        /**
         * @return Number field list
         */
        get: function () {
            if (!this._numberFields) {
                this._numberFields = new List();
            }
            return this.adapter.apply("numberFields", {
                numberFields: this._numberFields
            }).numberFields;
        },
        /**
         * A list of fields that hold number values.
         *
         * @since 4.5.15
         * @param value Number field list
         */
        set: function (value) {
            this._numberFields = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "durationFormatter", {
        /**
         * @return A DurationFormatter instance
         */
        get: function () {
            if (!this._durationFormatter) {
                this._durationFormatter = new DurationFormatter();
                this._durationFormatter.language = this.language;
            }
            return this.adapter.apply("durationFormatter", {
                durationFormatter: this._durationFormatter
            }).durationFormatter;
        },
        /**
         * A [[DurationFormatter]] to use when formatting duration values when
         * exporting data.
         *
         * @param value  DurationFormatter instance
         */
        set: function (value) {
            this._durationFormatter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "durationFormat", {
        /**
         * @return Duration format
         */
        get: function () {
            return this.adapter.apply("durationFormat", {
                durationFormat: this._durationFormat
            }).durationFormat;
        },
        /**
         * A format to use when formatting values from `durationFields`.
         * Will use [[DurationFormatter]] format if not set.
         *
         * @param value Duration format
         */
        set: function (value) {
            this._durationFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "durationFields", {
        /**
         * @return Duration field list
         */
        get: function () {
            if (!this._durationFields) {
                this._durationFields = new List();
            }
            return this.adapter.apply("durationFields", {
                durationFields: this._durationFields
            }).durationFields;
        },
        /**
         * A list of fields that hold duration values.
         *
         * @param value Duration field list
         */
        set: function (value) {
            this._durationFields = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generates data fields out of the first row of data.
     *
     * @ignore Exclude from docs
     */
    Export.prototype.generateDataFields = function () {
        var _this = this;
        this._dataFields = {};
        if (this.data.length) {
            $array.each(this.data, function (row) {
                $object.each(row, function (key, value) {
                    if (!$type.hasValue(_this._dataFields[key])) {
                        _this._dataFields[key] = _this.adapter.apply("dataFieldName", {
                            name: key,
                            field: key
                        }).name;
                    }
                });
            });
        }
    };
    /**
     * Cheks against `dateFields` property to determine if this field holds
     * dates.
     *
     * @ignore Exclude from docs
     * @param field   Field name
     * @param options Options
     * @return `true` if it's a date field
     */
    Export.prototype.isDateField = function (field) {
        return this.adapter.apply("isDateField", {
            isDateField: this.dateFields.contains(field),
            field: field
        }).isDateField;
    };
    /**
     * Cheks against `numberFields` property to determine if this field holds
     * numbers.
     *
     * @ignore Exclude from docs
     * @param field   Field name
     * @param options Options
     * @return `true` if it's a number field
     */
    Export.prototype.isNumberField = function (field) {
        return this.adapter.apply("isNumberField", {
            isNumberField: this.numberFields.contains(field),
            field: field
        }).isNumberField;
    };
    /**
     * Cheks against `durationFields` property to determine if this field holds
     * durations.
     *
     * @ignore Exclude from docs
     * @param field   Field name
     * @param options Options
     * @return `true` if it's a date field
     */
    Export.prototype.isDurationField = function (field) {
        return this.adapter.apply("isDurationField", {
            isDurationField: this.durationFields.contains(field),
            field: field
        }).isDurationField;
    };
    /**
     * Returns proper content type for the export type.
     *
     * @param type  Export format/type
     * @return Proper content type, i.e. "image/jpeg"
     */
    Export.prototype.getContentType = function (type) {
        var contentType = "";
        switch (type) {
            case "png":
            case "gif":
                contentType = "image/" + type;
                break;
            case "jpg":
                contentType = "image/jpeg";
                break;
            case "svg":
                contentType = "image/svg+xml";
                break;
            case "csv":
                contentType = "text/csv";
                break;
            case "json":
                contentType = "application/json";
                break;
            case "html":
                contentType = "text/html";
                break;
            case "pdf":
            case "pdfdata":
                contentType = "application/pdf";
                break;
            case "xlsx":
                contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                break;
        }
        return this.adapter.apply("contentType", {
            contentType: contentType,
            type: type
        }).contentType;
    };
    Object.defineProperty(Export.prototype, "filePrefix", {
        /**
         * @return File prefix
         */
        get: function () {
            return this.adapter.apply("filePrefix", {
                filePrefix: this._filePrefix
            }).filePrefix;
        },
        /**
         * A file prefix to be used for all exported formats.
         *
         * Export will apply format-related extension to it. E.g. if this is set to
         * "myExport", the file name of the PNG exported image will be "myExport.png".
         *
         * @param value File prefix
         */
        set: function (value) {
            this._filePrefix = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "backgroundColor", {
        /**
         * @return Background color
         */
        get: function () {
            return this.adapter.apply("backgroundColor", {
                backgroundColor: this._backgroundColor
            }).backgroundColor;
        },
        /**
         * A background color to be used for exported images. If set, this will
         * override the automatically acquired background color.
         *
         * @param value Color
         */
        set: function (value) {
            this._backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "title", {
        /**
         * @return Title
         */
        get: function () {
            return this.adapter.apply("title", {
                title: this._title
            }).title;
        },
        /**
         * A title to be used when printing.
         *
         * @param value Title
         */
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Displays a preloader/exporting indicator.
     *
     * @ignore Exclude from docs
     * @todo Add ability to change text
     */
    Export.prototype.showPreloader = function () {
        var preloader = this.preloader;
        if (preloader) {
            preloader.progress = 0.5;
            preloader.label.text = "...";
        }
    };
    /**
     * Hides preloader/exporting indicator
     *
     * @ignore Exclude from docs
     */
    Export.prototype.hidePreloader = function () {
        var preloader = this.preloader;
        if (preloader) {
            preloader.progress = 1;
        }
    };
    Object.defineProperty(Export.prototype, "preloader", {
        /**
         * Returns a an instance of [[Preloader]] associated with the Sprite being
         * exported.
         *
         * @return Preloader
         */
        get: function () {
            return this._sprite && this._sprite.parent && this._sprite.parent.preloader ?
                this._sprite.parent.preloader :
                undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Displays a modal saying export is taking longer than expected.
     *
     * @ignore Exclude from docs
     */
    Export.prototype.showTimeout = function () {
        this.showModal(this.adapter.apply("timeoutMessage", {
            message: this.language.translate("Export operation took longer than expected. Something might have gone wrong.")
        }).message);
    };
    /**
     * Hides preloader/exporting indicator.
     *
     * @ignore Exclude from docs
     */
    Export.prototype.hideTimeout = function () {
        if (this._timeoutTimeout) {
            this.removeDispose(this._timeoutTimeout);
            this._timeoutTimeout = null;
        }
        this.hideModal();
    };
    Object.defineProperty(Export.prototype, "language", {
        /**
         * @return A [[Language]] instance to be used
         */
        get: function () {
            if (!this._language) {
                this._language = new Language();
            }
            return this._language;
        },
        /**
         * A [[Language]] instance to be used for translations.
         *
         * @param value An instance of [[Language]]
         */
        set: function (value) {
            this._language = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "modal", {
        /**
         * Returns (and creates) [[Modal]].
         *
         * @ignore Exclude from docs
         * @return Modal instance
         */
        get: function () {
            if (!this._modal) {
                this._modal = new Modal();
                // Prefix with Sprite's class name
                this._modal.adapter.add("classPrefix", function (value) {
                    value = options.classNamePrefix + value;
                    return value;
                });
            }
            return this._modal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows [[Modal]] with specific text.
     *
     * @ignore Exclude from docs
     * @param text Modal contents
     */
    Export.prototype.showModal = function (text, title) {
        // Hide previous modal and preloader
        this.hideModal();
        this.hidePreloader();
        // Create modal
        var modal = this.modal;
        modal.container = this.sprite.svgContainer.SVGContainer;
        modal.content = text;
        modal.readerTitle = title;
        modal.open();
    };
    /**
     * Hides modal window if one's currently open.
     *
     * @ignore Exclude from docs
     */
    Export.prototype.hideModal = function () {
        if (this._modal) {
            this.modal.close();
        }
    };
    /**
     * Loads canvg dynamic module.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @return Instance of canvg
     * @async
     */
    Export.prototype._canvg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var canvg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import(/* webpackChunkName: "canvg" */ "../../canvg/index.js")];
                    case 1:
                        canvg = (_a.sent());
                        if (canvg.default != null) {
                            return [2 /*return*/, canvg.default];
                        }
                        else {
                            return [2 /*return*/, canvg];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Export.prototype, "canvg", {
        /**
         * Returns canvg instance.
         *
         * @ignore Exclude from docs
         * @return Instance of canvg
         */
        get: function () {
            return this._canvg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Export.prototype, "pdfmake", {
        /**
         * Returns pdfmake instance.
         *
         * @ignore Exclude from docs
         * @return Instance of pdfmake
         */
        get: function () {
            if (pdfmakePromise == null) {
                pdfmakePromise = _pdfmake();
            }
            return pdfmakePromise;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads xlsx dynamic module.
     *
     * This is an asynchronous function. Check the description of `getImage()`
     * for description and example usage.
     *
     * @ignore Exclude from docs
     * @return Instance of pdfmake
     * @async
     */
    Export.prototype._xlsx = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import(/* webpackChunkName: "xlsx" */ "../../bundled/xlsx")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Object.defineProperty(Export.prototype, "xlsx", {
        /**
         * Returns xlsx instance.
         *
         * @ignore Exclude from docs
         * @return Instance of pdfmake
         */
        get: function () {
            return this._xlsx();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets options for a format.
     */
    Export.prototype.setFormatOptions = function (type, options) {
        this._formatOptions.setKey(type, options);
    };
    /**
     * Returns current options for a format.
     */
    Export.prototype.getFormatOptions = function (type) {
        return this._formatOptions.getKey(type);
    };
    Object.defineProperty(Export.prototype, "formatOptions", {
        /**
         * A [[Dictionary]] object containing format-specific options.
         *
         * May be used to change specific option for the format:
         *
         * ```TypeScript
         * chart.exporting.formatOptions.getKey("csv").disabled = true;
         * ```
         * ```JavaScript
         * chart.exporting.formatOptions.getKey("csv").disabled = true;
         * ```
         * ```JSON
         * {
         *   // ...
         *   "exporting": {
         *     // ...
         *     "formatOptions": {
         *       "csv": {
         *         "disabled": true
         *       }
         *     }
         *   }
         * }
         * ```
         *
         * @since 4.9.12
         * @return  Options
         */
        get: function () {
            return this._formatOptions;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Disables interactivity on parent chart.
     */
    Export.prototype._disablePointers = function () {
        if (!$type.hasValue(this._spriteInteractionsEnabled)) {
            this._spriteInteractionsEnabled = this.sprite.interactionsEnabled;
        }
        this.sprite.interactionsEnabled = false;
    };
    /**
     * Releases temporarily disabled pointers on parent chart.
     */
    Export.prototype._releasePointers = function () {
        if ($type.hasValue(this._spriteInteractionsEnabled) && !this._exportRunning) {
            this.sprite.interactionsEnabled = this._spriteInteractionsEnabled;
        }
    };
    /**
     * Hides all elements that should not be included in the exported image.
     */
    Export.prototype.hideNonExportableSprites = function () {
        var _this = this;
        if (this._objectsAlreadyHidden) {
            return;
        }
        var svgContainer = this.sprite.svgContainer;
        if (svgContainer) {
            $array.each(svgContainer.nonExportableSprites, function (item) {
                if (!item.isHidden && !item.isHiding && item.visible) {
                    _this._hiddenObjects.push(item);
                }
                item.hide(0);
            });
        }
        this._objectsAlreadyHidden = true;
    };
    /**
     * Respores elements that were hidden before export.
     */
    Export.prototype.restoreNonExportableSprites = function () {
        if (!this._objectsAlreadyHidden) {
            return;
        }
        $array.each(this._hiddenObjects, function (item) {
            item.show(0);
        });
        this._hiddenObjects = [];
        this._objectsAlreadyHidden = false;
    };
    /**
     * Checks if there are elements that absolutely need to be validated before
     * export.
     *
     * If there are invalid elements, it will await for them to be validated.
     *
     * @return Promise
     */
    Export.prototype.awaitValidSprites = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        if (this.validateSprites.length) {
                            $array.each(this.validateSprites, function (sprite, index) {
                                if (sprite.invalid) {
                                    promises.push(new Promise(function (resolve, reject) {
                                        sprite.events.once("validated", function (ev) {
                                            resolve();
                                        });
                                    }));
                                }
                            });
                        }
                        if (!promises.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    Export.prototype.processConfig = function (config) {
        registry.registeredClasses["ExportMenu"] = ExportMenu;
        if (config) {
            // Set up menu
            if ($type.hasValue(config.menu) && !$type.hasValue(config.menu.type)) {
                config.menu.type = "ExportMenu";
            }
            if ($type.hasValue(config.dataFields) && $type.isObject(config.dataFields)) {
                this.dataFields = config.dataFields;
                delete config.dataFields;
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    /**
     * XLINK namespace definition.
     *
     * @ignore Exclude from docs
     */
    Export.XLINK = "http://www.w3.org/1999/xlink";
    return Export;
}(Validatable));
export { Export };
//# sourceMappingURL=Export.js.map