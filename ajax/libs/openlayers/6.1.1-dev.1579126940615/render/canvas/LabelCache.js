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
import LRUCache from '../../structs/LRUCache.js';
/**
 * @module ol/render/canvas/LabelCache
 */
/**
 * @classdesc
 * Cache of pre-rendered labels.
 */
var LabelCache = /** @class */ (function (_super) {
    __extends(LabelCache, _super);
    function LabelCache() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LabelCache.prototype.expireCache = function () {
        while (this.canExpireCache()) {
            this.pop();
        }
    };
    return LabelCache;
}(LRUCache));
export default LabelCache;
//# sourceMappingURL=LabelCache.js.map