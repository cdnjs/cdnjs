"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = void 0;
var tslib_1 = require("tslib");
var defaultOpts = {
    xml: false,
    decodeEntities: true,
};
/** Cheerio default options. */
exports.default = defaultOpts;
var xmlModeDefault = {
    _useHtmlParser2: true,
    xmlMode: true,
};
function flatten(options) {
    return (options === null || options === void 0 ? void 0 : options.xml)
        ? typeof options.xml === 'boolean'
            ? xmlModeDefault
            : tslib_1.__assign(tslib_1.__assign({}, xmlModeDefault), options.xml)
        : options !== null && options !== void 0 ? options : undefined;
}
exports.flatten = flatten;
