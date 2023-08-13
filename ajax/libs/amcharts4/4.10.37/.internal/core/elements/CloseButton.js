/**
 * Zoom out button functionality.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Button } from "./Button";
import { Sprite } from "../Sprite";
import { registry } from "../Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $path from "../rendering/Path";
import * as $type from "../../core/utils/Type";
import { MouseCursorStyle } from "../../core/interaction/Mouse";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a zoom out button.
 *
 * @see {@link ICloseButtonEvents} for a list of available events
 * @see {@link ICloseButtonAdapters} for a list of available Adapters
 */
var CloseButton = /** @class */ (function (_super) {
    __extends(CloseButton, _super);
    /**
     * Constructor
     */
    function CloseButton() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "CloseButton";
        _this.padding(8, 8, 8, 8);
        _this.showSystemTooltip = true;
        _this.width = 30;
        _this.height = 30;
        var interfaceColors = new InterfaceColorSet();
        _this.cursorOverStyle = MouseCursorStyle.pointer;
        var background = _this.background;
        background.cornerRadius(20, 20, 20, 20);
        var bgc = interfaceColors.getFor("background");
        background.fill = bgc;
        background.stroke = interfaceColors.getFor("primaryButton");
        background.strokeOpacity = 1;
        background.strokeWidth = 1;
        var downColor = interfaceColors.getFor("primaryButtonActive");
        var bhs = background.states.getKey("hover");
        bhs.properties.strokeWidth = 3;
        bhs.properties.fill = bgc;
        var bds = background.states.getKey("down");
        bds.properties.stroke = downColor;
        bds.properties.fill = bgc;
        // Create an icon
        var icon = new Sprite();
        icon.element = _this.paper.add("path");
        icon.stroke = background.stroke;
        _this.icon = icon;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    CloseButton.prototype.validate = function () {
        _super.prototype.validate.call(this);
        var w = this.pixelWidth / 3;
        var h = this.pixelHeight / 3;
        var path = $path.moveTo({ x: -w / 2, y: -h / 2 });
        path += $path.lineTo({ x: w / 2, y: h / 2 });
        path += $path.moveTo({ x: w / 2, y: -h / 2 });
        path += $path.lineTo({ x: -w / 2, y: h / 2 });
        this.icon.path = path;
        this.invalidateLayout();
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    CloseButton.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Close");
        }
    };
    return CloseButton;
}(Button));
export { CloseButton };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CloseButton"] = CloseButton;
//# sourceMappingURL=CloseButton.js.map