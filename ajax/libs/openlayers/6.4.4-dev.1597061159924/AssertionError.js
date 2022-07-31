var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/AssertionError
 */
import { VERSION } from './util.js';
/**
 * Error object thrown when an assertion failed. This is an ECMA-262 Error,
 * extended with a `code` property.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error.
 */
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    /**
     * @param {number} code Error code.
     */
    function AssertionError(code) {
        var _this = this;
        var path = VERSION === 'latest' ? VERSION : 'v' + VERSION.split('-')[0];
        var message = 'Assertion failed. See https://openlayers.org/en/' +
            path +
            '/doc/errors/#' +
            code +
            ' for details.';
        _this = _super.call(this, message) || this;
        /**
         * Error code. The meaning of the code can be found on
         * https://openlayers.org/en/latest/doc/errors/ (replace `latest` with
         * the version found in the OpenLayers script's header comment if a version
         * other than the latest is used).
         * @type {number}
         * @api
         */
        _this.code = code;
        /**
         * @type {string}
         */
        _this.name = 'AssertionError';
        // Re-assign message, see https://github.com/Rich-Harris/buble/issues/40
        _this.message = message;
        return _this;
    }
    return AssertionError;
}(Error));
export default AssertionError;
//# sourceMappingURL=AssertionError.js.map