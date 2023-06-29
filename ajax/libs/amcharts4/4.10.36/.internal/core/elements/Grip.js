/**
 * Grip module.
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
import { percent } from "../utils/Percent";
import * as $path from "../rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a grip element that can be used for scrolling or other things.
 *
 * @see {@link IGripEvents} for a list of available events
 * @see {@link IGripAdapters} for a list of available Adapters
 * @since 4.4.0
 */
var Grip = /** @class */ (function (_super) {
    __extends(Grip, _super);
    /**
     * Constructor
     */
    function Grip() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "Grip";
        var cs = new InterfaceColorSet();
        // Set defaults
        _this.layout = "absolute";
        _this.padding(10, 10, 10, 10);
        _this.margin(3, 3, 3, 3);
        _this.background.fillOpacity = 0.3;
        _this.background.cornerRadius(10, 10, 10, 10);
        // Create an icon
        var icon = new Sprite();
        icon.element = _this.paper.add("path");
        var path = $path.moveTo({ x: -6, y: 0 });
        path += $path.lineTo({ x: 6, y: 0 });
        path += $path.moveTo({ x: -8, y: -6 });
        path += $path.lineTo({ x: 0, y: -12 });
        path += $path.lineTo({ x: 8, y: -6 });
        path += $path.moveTo({ x: -8, y: 6 });
        path += $path.lineTo({ x: 0, y: 12 });
        path += $path.lineTo({ x: 8, y: 6 });
        icon.path = path;
        icon.strokeWidth = 2;
        icon.fillOpacity = 0;
        icon.pixelPerfect = true;
        icon.padding(0, 4, 0, 4);
        icon.stroke = cs.getFor("text");
        icon.strokeOpacity = 0.7;
        icon.align = "center";
        icon.valign = "middle";
        _this.icon = icon;
        _this.label.dispose();
        _this.label = undefined;
        // Set default position
        _this.position = "right";
        // Set up autohide
        _this.autoHideDelay = 3000;
        _this.events.on("shown", function (ev) {
            if (_this._autoHideTimeout) {
                _this._autoHideTimeout.dispose();
            }
            if (_this.autoHideDelay) {
                _this._autoHideTimeout = _this.setTimeout(function () {
                    _this.hide();
                }, _this.autoHideDelay);
            }
        });
        _this.events.on("down", function (ev) {
            if (_this._autoHideTimeout) {
                _this._autoHideTimeout.dispose();
            }
        });
        _this.events.on("out", function (ev) {
            if (_this.autoHideDelay) {
                _this._autoHideTimeout = _this.setTimeout(function () {
                    _this.hide();
                }, _this.autoHideDelay);
            }
        });
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(Grip.prototype, "position", {
        /**
         * @return Position
         */
        get: function () {
            return this.getPropertyValue("position");
        },
        /**
         * Sets position of the grip.
         *
         * Available options: "left", "right" (default), "top", "bottom".
         *
         * @param  value  Position
         */
        set: function (value) {
            if (this.setPropertyValue("position", value)) {
                switch (value) {
                    case "left":
                        this.align = "left";
                        this.valign = "middle";
                        this.horizontalCenter = "left";
                        this.verticalCenter = "middle";
                        this.icon.rotation = 0;
                        this.width = undefined;
                        this.height = percent(30);
                        break;
                    case "right":
                        this.align = "right";
                        this.valign = "middle";
                        this.horizontalCenter = "right";
                        this.verticalCenter = "middle";
                        this.icon.rotation = 0;
                        this.width = undefined;
                        this.height = percent(30);
                        break;
                    case "top":
                        this.align = "center";
                        this.valign = "top";
                        this.horizontalCenter = "middle";
                        this.verticalCenter = "top";
                        this.icon.rotation = 90;
                        this.width = percent(30);
                        this.height = undefined;
                        break;
                    case "bottom":
                        this.align = "center";
                        this.valign = "bottom";
                        this.horizontalCenter = "middle";
                        this.verticalCenter = "bottom";
                        this.icon.rotation = 90;
                        this.width = percent(30);
                        this.height = undefined;
                        break;
                    default:
                        this.align = "center";
                        this.valign = "middle";
                        this.horizontalCenter = "middle";
                        this.verticalCenter = "middle";
                        this.icon.rotation = 90;
                        this.width = percent(30);
                        this.height = undefined;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grip.prototype, "autoHideDelay", {
        /**
         * @return Delay
         */
        get: function () {
            return this.getPropertyValue("autoHideDelay");
        },
        /**
         * Number of milliseconds to show grip until it is hidden automatically.
         *
         * @default 3000
         * @param  value  Delay
         */
        set: function (value) {
            this.setPropertyValue("autoHideDelay", value);
        },
        enumerable: true,
        configurable: true
    });
    return Grip;
}(Button));
export { Grip };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Grip"] = Grip;
//# sourceMappingURL=Grip.js.map