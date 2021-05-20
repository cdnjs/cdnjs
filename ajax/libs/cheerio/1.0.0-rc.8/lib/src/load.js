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
 * See the README section titled "Loading" for additional usage information.
 *
 * @param content - Markup to be loaded.
 * @param options - Options for the created instance.
 * @param isDocument - Allows parser to be switched to fragment mode.
 * @returns The loaded document.
 */
function load(content, options, isDocument) {
    if (content == null) {
        throw new Error('cheerio.load() expects a string');
    }
    options = tslib_1.__assign(tslib_1.__assign({}, options_1.default), options_1.flatten(options));
    if (typeof isDocument === 'undefined')
        isDocument = true;
    var root = parse_1.default(content, options, isDocument);
    var initialize = /** @class */ (function (_super) {
        tslib_1.__extends(initialize, _super);
        function initialize(selector, context, r, opts) {
            if (r === void 0) { r = root; }
            var _this = this;
            // @ts-expect-error Using `this` before calling the constructor.
            if (!(_this instanceof initialize)) {
                return new initialize(selector, context, r, opts);
            }
            _this = _super.call(this, selector, context, r, tslib_1.__assign(tslib_1.__assign({}, options), opts)) || this;
            return _this;
        }
        // Mimic jQuery's prototype alias for plugin authors.
        initialize.fn = initialize.prototype;
        return initialize;
    }(cheerio_1.Cheerio));
    /*
     * Keep a reference to the top-level scope so we can chain methods that implicitly
     * resolve selectors; e.g. $("<span>").(".bar"), which otherwise loses ._root
     */
    initialize.prototype._originalRoot = root;
    // Add in the static methods
    Object.assign(initialize, staticMethods, { load: load });
    // Add in the root
    initialize._root = root;
    // Store options
    initialize._options = options;
    return initialize;
}
exports.load = load;
