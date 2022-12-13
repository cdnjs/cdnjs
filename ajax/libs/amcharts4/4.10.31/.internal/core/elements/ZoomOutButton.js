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
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a zoom out button.
 *
 * @see {@link IZoomOutButtonEvents} for a list of available events
 * @see {@link IZoomOutButtonAdapters} for a list of available Adapters
 */
var ZoomOutButton = /** @class */ (function (_super) {
    __extends(ZoomOutButton, _super);
    /**
     * Constructor
     */
    function ZoomOutButton() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "ZoomOutButton";
        _this.padding(9, 9, 9, 9);
        //this.dx = - 5;
        //this.dy = 5;
        _this.showSystemTooltip = true;
        var interfaceColors = new InterfaceColorSet();
        var background = _this.background;
        background.cornerRadius(20, 20, 20, 20);
        background.fill = interfaceColors.getFor("primaryButton");
        background.stroke = interfaceColors.getFor("primaryButtonStroke");
        background.strokeOpacity = 0;
        background.states.getKey("hover").properties.fill = interfaceColors.getFor("primaryButtonHover");
        background.states.getKey("down").properties.fill = interfaceColors.getFor("primaryButtonActive");
        // Create an icon
        var icon = new Sprite();
        icon.element = _this.paper.add("path");
        var path = $path.moveTo({ x: 0, y: 0 });
        path += $path.lineTo({ x: 11, y: 0 });
        icon.path = path;
        icon.pixelPerfect = true;
        icon.padding(8, 3, 8, 3);
        icon.stroke = interfaceColors.getFor("primaryButtonText");
        _this.icon = icon;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    ZoomOutButton.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Zoom Out");
        }
    };
    return ZoomOutButton;
}(Button));
export { ZoomOutButton };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ZoomOutButton"] = ZoomOutButton;
//# sourceMappingURL=ZoomOutButton.js.map