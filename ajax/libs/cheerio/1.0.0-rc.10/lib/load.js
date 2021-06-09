"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
var tslib_1 = require("tslib");
var options_1 = tslib_1.__importStar(require("./options"));
var staticMethods = tslib_1.__importStar(require("./static"));
var cheerio_1 = require("./cheerio");
var parse_1 = tslib_1.__importDefault(require("./parse"));
/**
 * Create a querying function, bound to a document created from the provided
 * markup. Note that similar to web browser contexts, this operation may
 * introduce `<html>`, `<head>`, and `<body>` elements; set `isDocument` to
 * `false` to switch to fragment mode and disable this.
 *
 * @param content - Markup to be loaded.
 * @param options - Options for the created instance.
 * @param isDocument - Allows parser to be switched to fragment mode.
 * @returns The loaded document.
 * @see {@link https://cheerio.js.org#loading} for additional usage information.
 */
function load(content, options, isDocument) {
    if (isDocument === void 0) { isDocument = true; }
    if (content == null) {
        throw new Error('cheerio.load() expects a string');
    }
    var internalOpts = tslib_1.__assign(tslib_1.__assign({}, options_1.default), options_1.flatten(options));
    var root = parse_1.default(content, internalOpts, isDocument);
    /** Create an extended class here, so that extensions only live on one instance. */
    var LoadedCheerio = /** @class */ (function (_super) {
        tslib_1.__extends(LoadedCheerio, _super);
        function LoadedCheerio() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LoadedCheerio;
    }(cheerio_1.Cheerio));
    function initialize(selector, context, r, opts) {
        if (r === void 0) { r = root; }
        return new LoadedCheerio(selector, context, r, tslib_1.__assign(tslib_1.__assign({}, internalOpts), options_1.flatten(opts)));
    }
    // Add in static methods & properties
    Object.assign(initialize, staticMethods, {
        load: load,
        // `_root` and `_options` are used in static methods.
        _root: root,
        _options: internalOpts,
        // Add `fn` for plugins
        fn: LoadedCheerio.prototype,
        // Add the prototype here to maintain `instanceof` behavior.
        prototype: LoadedCheerio.prototype,
    });
    return initialize;
}
exports.load = load;
