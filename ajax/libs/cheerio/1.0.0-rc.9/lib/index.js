"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = exports.parseHTML = exports.merge = exports.contains = void 0;
var tslib_1 = require("tslib");
var cheerio_1 = tslib_1.__importDefault(require("./cheerio"));
/**
 * The default cheerio instance.
 *
 * @deprecated Use the function returned by `load` instead.
 */
exports.default = cheerio_1.default;
/**
 * Types used in signatures of Cheerio methods.
 *
 * @category Cheerio
 */
tslib_1.__exportStar(require("./types"), exports);
tslib_1.__exportStar(require("./load"), exports);
var load_1 = require("./load");
// We add this here, to avoid a cyclic depenency
cheerio_1.default.load = load_1.load;
var staticMethods = tslib_1.__importStar(require("./static"));
/**
 * In order to promote consistency with the jQuery library, users are encouraged
 * to instead use the static method of the same name.
 *
 * @deprecated
 * @example
 *
 * ```js
 * const $ = cheerio.load('<div><p></p></div>');
 *
 * $.contains($('div').get(0), $('p').get(0));
 * //=> true
 *
 * $.contains($('p').get(0), $('div').get(0));
 * //=> false
 * ```
 *
 * @returns {boolean}
 */
exports.contains = staticMethods.contains;
/**
 * In order to promote consistency with the jQuery library, users are encouraged
 * to instead use the static method of the same name.
 *
 * @deprecated
 * @example
 *
 * ```js
 * const $ = cheerio.load('');
 *
 * $.merge([1, 2], [3, 4]);
 * //=> [1, 2, 3, 4]
 * ```
 */
exports.merge = staticMethods.merge;
/**
 * In order to promote consistency with the jQuery library, users are encouraged
 * to instead use the static method of the same name as it is defined on the
 * "loaded" Cheerio factory function.
 *
 * @deprecated See {@link static/parseHTML}.
 * @example
 *
 * ```js
 * const $ = cheerio.load('');
 * $.parseHTML('<b>markup</b>');
 * ```
 */
exports.parseHTML = staticMethods.parseHTML;
/**
 * Users seeking to access the top-level element of a parsed document should
 * instead use the `root` static method of a "loaded" Cheerio function.
 *
 * @deprecated
 * @example
 *
 * ```js
 * const $ = cheerio.load('');
 * $.root();
 * ```
 */
exports.root = staticMethods.root;
