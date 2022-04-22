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
import { getUid } from '../../util.js';
import LRUCache from '../../structs/LRUCache.js';
/**
 * @module ol/render/canvas/LabelCache
 */
/**
 * @classdesc
 * Cache of pre-rendered labels.
 * @fires import("../events/Event.js").Event
 */
var LabelCache = /** @class */ (function (_super) {
    __extends(LabelCache, _super);
    /**
     * @inheritDoc
     */
    function LabelCache(opt_highWaterMark) {
        var _this = _super.call(this, opt_highWaterMark) || this;
        _this.consumers = {};
        return _this;
    }
    LabelCache.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.consumers = {};
    };
    /**
     * @override
     * @param {string} key Label key.
     * @param {import("./Executor.js").default} consumer Label consumer.
     * @return {HTMLCanvasElement} Label.
     */
    LabelCache.prototype.get = function (key, consumer) {
        var canvas = _super.prototype.get.call(this, key);
        var consumerId = getUid(consumer);
        if (!(consumerId in this.consumers)) {
            this.consumers[consumerId] = {};
        }
        this.consumers[consumerId][key] = true;
        return canvas;
    };
    LabelCache.prototype.prune = function () {
        outer: while (this.canExpireCache()) {
            var key = this.peekLastKey();
            for (var consumerId in this.consumers) {
                if (key in this.consumers[consumerId]) {
                    break outer;
                }
            }
            var canvas = this.pop();
            canvas.width = canvas.height = 0;
            for (var consumerId in this.consumers) {
                delete this.consumers[consumerId][key];
            }
        }
    };
    /**
     * @param {import("./Executor.js").default} consumer Label consumer.
     */
    LabelCache.prototype.release = function (consumer) {
        delete this.consumers[getUid(consumer)];
    };
    return LabelCache;
}(LRUCache));
export default LabelCache;
//# sourceMappingURL=LabelCache.js.map