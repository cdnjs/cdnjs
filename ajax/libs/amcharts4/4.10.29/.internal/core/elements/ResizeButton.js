/**
 * Resize button module.
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
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { registry } from "../Registry";
import * as $path from "../rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a draggable resize/grip button.
 *
 * @see {@link IResizeButtonEvents} for a list of available events
 * @see {@link IResizeButtonAdapters} for a list of available Adapters
 */
var ResizeButton = /** @class */ (function (_super) {
    __extends(ResizeButton, _super);
    /**
     * Constructor
     */
    function ResizeButton() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "ResizeButton";
        // Set defaults
        _this.orientation = "horizontal";
        _this.layout = "absolute";
        _this.horizontalCenter = "middle";
        _this.verticalCenter = "middle";
        _this.draggable = true;
        _this.padding(8, 8, 8, 8);
        _this.background.cornerRadius(20, 20, 20, 20);
        // Create an icon
        var icon = new Sprite();
        icon.element = _this.paper.add("path");
        var path = $path.moveTo({ x: -2, y: -6 });
        path += $path.lineTo({ x: -2, y: 6 });
        path += $path.moveTo({ x: 2, y: -6 });
        path += $path.lineTo({ x: 2, y: 6 });
        icon.path = path;
        icon.pixelPerfect = true;
        icon.padding(0, 4, 0, 4);
        icon.stroke = new InterfaceColorSet().getFor("alternativeText");
        icon.strokeOpacity = 0.7;
        //icon.align = "center";
        //icon.valign = "middle";
        _this.icon = icon;
        _this.label.dispose();
        _this.label = undefined;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(ResizeButton.prototype, "orientation", {
        /**
         * Use for setting of direction (orientation) of the resize button.
         *
         * Available options: "horizontal", "vertical".
         *
         * @param value Orientation
         */
        set: function (value) {
            var icon = this.icon;
            if (icon) {
                if (value == "horizontal") {
                    icon.rotation = 0;
                }
                else {
                    icon.rotation = -90;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return ResizeButton;
}(Button));
export { ResizeButton };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ResizeButton"] = ResizeButton;
//# sourceMappingURL=ResizeButton.js.map