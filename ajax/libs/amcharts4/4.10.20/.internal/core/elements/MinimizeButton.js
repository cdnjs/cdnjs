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
import { color } from "../../core/utils/Color";
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
 * @see {@link IMinimizeButtonEvents} for a list of available events
 * @see {@link IMinimizeButtonAdapters} for a list of available Adapters
 */
var MinimizeButton = /** @class */ (function (_super) {
    __extends(MinimizeButton, _super);
    /**
     * Constructor
     */
    function MinimizeButton() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "MinimizeButton";
        _this.padding(8, 8, 8, 8);
        _this.togglable = true;
        //this.dx = - 5;
        //this.dy = 5;
        _this.setStateOnChildren = true;
        _this.showSystemTooltip = true;
        _this.width = 30;
        _this.height = 30;
        var interfaceColors = new InterfaceColorSet();
        var background = _this.background;
        background.cornerRadius(20, 20, 20, 20);
        _this.cursorOverStyle = MouseCursorStyle.pointer;
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
        icon.states.create("active");
        icon.element = _this.paper.add("path");
        icon.stroke = background.stroke;
        icon.fill = color();
        _this.icon = icon;
        _this._disposers.push(background.events.on("over", function () {
            icon.isHover = true;
        }, _this, false));
        _this._disposers.push(background.events.on("out", function () {
            icon.isHover = false;
        }, _this, false));
        _this._disposers.push(background.events.on("hit", function () {
            icon.isActive = !icon.isActive;
        }, _this, false));
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    MinimizeButton.prototype.setActive = function (value) {
        _super.prototype.setActive.call(this, value);
        this.updateIcon();
    };
    MinimizeButton.prototype.updateIcon = function () {
        var path = "";
        if (this.isActive) {
            path = this._activePath;
        }
        else {
            path = this._path;
        }
        this.icon.path = path;
    };
    MinimizeButton.prototype.validate = function () {
        _super.prototype.validate.call(this);
        var w = this.pixelWidth / 3;
        var h = this.pixelHeight / 3;
        var path = $path.moveTo({ x: -w / 2, y: -h / 2 });
        path += $path.lineTo({ x: 0, y: -2 });
        path += $path.lineTo({ x: w / 2, y: -h / 2 });
        path += $path.moveTo({ x: -w / 2, y: h / 2 });
        path += $path.lineTo({ x: 0, y: 2 });
        path += $path.lineTo({ x: w / 2, y: h / 2 });
        this._path = path;
        this.icon.path = path;
        var activePath = $path.moveTo({ x: -w / 2, y: -2 });
        activePath += $path.lineTo({ x: 0, y: -h / 2 });
        activePath += $path.lineTo({ x: w / 2, y: -2 });
        activePath += $path.moveTo({ x: -w / 2, y: 2 });
        activePath += $path.lineTo({ x: 0, y: h / 2 });
        activePath += $path.lineTo({ x: w / 2, y: 2 });
        var activeState = this.icon.states.getKey("active");
        activeState.properties.path = activePath;
        this._activePath = activePath;
        this.invalidateLayout();
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    MinimizeButton.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Minimize");
        }
    };
    return MinimizeButton;
}(Button));
export { MinimizeButton };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MinimizeButton"] = MinimizeButton;
//# sourceMappingURL=MinimizeButton.js.map