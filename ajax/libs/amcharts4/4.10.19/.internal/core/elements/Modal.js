/**
 * Modal class is used to display information over chart area.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Popup } from "./Popup";
import { Adapter } from "../utils/Adapter";
/**
 * Shows an HTML modal which covers window or a chart area.
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/popups-and-modals/} For examples and docs on Popups and Modals.
 */
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    /**
     * Constructor
     */
    function Modal() {
        var _this = _super.call(this) || this;
        /**
         * Adapter.
         */
        _this.adapter = new Adapter(_this);
        _this.className = "Modal";
        _this.showCurtain = true;
        _this.draggable = false;
        return _this;
    }
    return Modal;
}(Popup));
export { Modal };
//# sourceMappingURL=Modal.js.map