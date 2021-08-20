/**
 * Functionality for drawing simple SwitchButtons.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../Container";
import { Label } from "./Label";
import { Button } from "../elements/Button";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { Circle } from "../../core/elements/Circle";
import { percent } from "../../core/utils/Percent";
import { registry } from "../Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * SwitchButton class is capable of drawing a simple rectangular SwitchButton with
 * optionally rounded corners and an icon in it.
 *
 * @see {@link ISwitchButtonEvents} for a list of available events
 * @see {@link ISwitchButtonAdapters} for a list of available Adapters
 */
var SwitchButton = /** @class */ (function (_super) {
    __extends(SwitchButton, _super);
    /**
     * Constructor
     */
    function SwitchButton() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "SwitchButton";
        _this.tooltipY = 0;
        // Set defaults
        _this.layout = "horizontal";
        _this.contentAlign = "center";
        _this.contentValign = "middle";
        _this.padding(8, 16, 8, 16);
        _this.setStateOnChildren = true;
        _this.states.create("active");
        var interfaceColors = new InterfaceColorSet();
        // Create the label element
        var leftLabel = new Label();
        leftLabel.fillOpacity = 0.3;
        var llas = leftLabel.states.create("active");
        llas.properties.fillOpacity = 1;
        leftLabel.isActive = true;
        _this.leftLabel = leftLabel;
        var button = new Button();
        var circle = new Circle();
        button.contentValign = "none";
        button.padding(0, 0, 0, 0);
        circle.radius = 10;
        button.icon = circle;
        button.icon.valign = "middle";
        button.label = undefined;
        var p100 = percent(100);
        button.background.cornerRadius(p100, p100, p100, p100);
        button.width = circle.radius * 3.5;
        button.height = circle.radius * 2.1;
        button.marginLeft = 8;
        button.marginRight = 8;
        button.togglable = true;
        circle.dx = -circle.radius * 0.7;
        circle.fill = interfaceColors.getFor("primaryButton");
        var hs = circle.states.create("hover");
        hs.properties.fill = interfaceColors.getFor("primaryButtonHover");
        var as = circle.states.create("active");
        as.properties.fill = interfaceColors.getFor("primaryButtonActive");
        as.properties.dx = circle.radius * 0.7;
        _this.switchButton = button;
        _this.events.on("toggled", function () {
            _this.leftLabel.isActive = !_this.isActive;
            _this.rightLabel.isActive = _this.isActive;
        });
        // Create the label element
        var rightLabel = new Label();
        rightLabel.fillOpacity = 0.3;
        var rlas = rightLabel.states.create("active");
        rlas.properties.fillOpacity = 1;
        _this.rightLabel = rightLabel;
        // Set up accessibility
        // A Button should be always focusable
        _this.role = "button";
        _this.focusable = true;
        rightLabel.valign = "middle";
        leftLabel.valign = "middle";
        button.valign = "middle";
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(SwitchButton.prototype, "leftLabel", {
        /**
         * @return Left label element
         */
        get: function () {
            return this._leftLabel;
        },
        /**
         * [[Label]] element to be used for left text.
         *
         * @param left label element
         */
        set: function (label) {
            if (this._leftLabel) {
                this.removeDispose(this._leftLabel);
            }
            this._leftLabel = label;
            if (label) {
                label.parent = this;
                label.interactionsEnabled = false;
                label.shouldClone = false;
                this._disposers.push(this._leftLabel);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchButton.prototype, "rightLabel", {
        /**
         * @return Rigth label element
         */
        get: function () {
            return this._rightLabel;
        },
        /**
         * [[Label]] element to be used for left text.
         *
         * @param rigth label element
         */
        set: function (label) {
            if (this._rightLabel) {
                this.removeDispose(this._rightLabel);
            }
            this._rightLabel = label;
            if (label) {
                label.parent = this;
                label.interactionsEnabled = false;
                label.shouldClone = false;
                this._disposers.push(this._rightLabel);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchButton.prototype, "switch", {
        /**
         * @ignore
         * @deprecated Use `switchButton` instead
         */
        get: function () {
            return this._switchButton;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchButton.prototype, "switchButton", {
        /**
         * @return Button
         */
        get: function () {
            return this._switchButton;
        },
        /**
         * A [[Button]] element for switch.
         *
         * @param Button
         */
        set: function (button) {
            if (this._switchButton) {
                this.removeDispose(this._switchButton);
            }
            this._switchButton = button;
            if (button) {
                button.parent = this;
                button.shouldClone = false;
                this._disposers.push(this._switchButton);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies properties and other attributes.
     *
     * @param source  Source
     */
    SwitchButton.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (source.leftLabel) {
            this.leftLabel.copyFrom(source.leftLabel);
        }
        if (source.rightLabel) {
            this.rightLabel.copyFrom(source.rightLabel);
        }
        if (source.switchButton) {
            this.switchButton.copyFrom(source.switchButton);
        }
    };
    return SwitchButton;
}(Container));
export { SwitchButton };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["SwitchButton"] = SwitchButton;
//# sourceMappingURL=SwitchButton.js.map