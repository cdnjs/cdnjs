/**
 * @module ol/render/Event
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Event from '../events/Event.js';
var RenderEvent = /** @class */ (function (_super) {
    __extends(RenderEvent, _super);
    /**
     * @param {import("./EventType.js").default} type Type.
     * @param {import("../transform.js").Transform} [opt_inversePixelTransform] Transform for
     *     CSS pixels to rendered pixels.
     * @param {import("../PluggableMap.js").FrameState} [opt_frameState] Frame state.
     * @param {?(CanvasRenderingContext2D|WebGLRenderingContext)} [opt_context] Context.
     */
    function RenderEvent(type, opt_inversePixelTransform, opt_frameState, opt_context) {
        var _this = _super.call(this, type) || this;
        /**
         * Transform from CSS pixels (relative to the top-left corner of the map viewport)
         * to rendered pixels on this event's `context`. Only available when a Canvas renderer is used, null otherwise.
         * @type {import("../transform.js").Transform|undefined}
         * @api
         */
        _this.inversePixelTransform = opt_inversePixelTransform;
        /**
         * An object representing the current render frame state.
         * @type {import("../PluggableMap.js").FrameState|undefined}
         * @api
         */
        _this.frameState = opt_frameState;
        /**
         * Canvas context. Not available when the event is dispatched by the map. For Canvas 2D layers,
         * the context will be the 2D rendering context.  For WebGL layers, the context will be the WebGL
         * context.
         * @type {CanvasRenderingContext2D|WebGLRenderingContext|undefined}
         * @api
         */
        _this.context = opt_context;
        return _this;
    }
    return RenderEvent;
}(Event));
export default RenderEvent;
//# sourceMappingURL=Event.js.map