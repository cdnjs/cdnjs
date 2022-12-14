/**
 * Functionality for drawing simple buttons.
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
import { RoundedRectangle } from "../elements/RoundedRectangle";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { registry } from "../Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Button class is capable of drawing a simple rectangular button with
 * optionally rounded corners and an icon in it.
 *
 * @see {@link IButtonEvents} for a list of available events
 * @see {@link IButtonAdapters} for a list of available Adapters
 */
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    /**
     * Constructor
     */
    function Button() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "Button";
        _this.tooltipY = 0;
        // Set defaults
        _this.iconPosition = "left";
        _this.layout = "horizontal";
        _this.contentAlign = "center";
        _this.contentValign = "middle";
        _this.padding(8, 16, 8, 16);
        _this.setStateOnChildren = true;
        var interfaceColors = new InterfaceColorSet();
        // Create background
        var background = _this.background;
        background.fill = interfaceColors.getFor("secondaryButton");
        background.stroke = interfaceColors.getFor("secondaryButtonStroke");
        background.fillOpacity = 1;
        background.strokeOpacity = 1;
        background.cornerRadius(3, 3, 3, 3);
        // Create the label element
        _this.label = new Label();
        _this.label.fill = interfaceColors.getFor("secondaryButtonText");
        ;
        _this.label.shouldClone = false;
        // Create default states
        var hoverState = background.states.create("hover");
        hoverState.properties.fillOpacity = 1;
        hoverState.properties.fill = interfaceColors.getFor("secondaryButtonHover");
        var downState = background.states.create("down");
        downState.transitionDuration = 100;
        downState.properties.fill = interfaceColors.getFor("secondaryButtonDown");
        downState.properties.fillOpacity = 1;
        // Set up accessibility
        // A button should be always focusable
        _this.role = "button";
        _this.focusable = true;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(Button.prototype, "icon", {
        /**
         * @return Icon Sprite
         */
        get: function () {
            return this._icon;
        },
        /**
         * A [[Sprite]] to be used as an icon on button.
         *
         * @param icon Icon Sprite
         */
        set: function (icon) {
            var currentIcon = this._icon;
            if (currentIcon) {
                //this._icon.dispose();
                //this.removeDispose(currentIcon);
                currentIcon.parent = undefined;
            }
            if (icon) {
                this._icon = icon;
                icon.parent = this;
                icon.interactionsEnabled = false;
                icon.shouldClone = false;
                this.iconPosition = this.iconPosition;
                this._disposers.push(icon);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "iconPosition", {
        /**
         * @return Icon position
         */
        get: function () {
            return this.getPropertyValue("iconPosition");
        },
        /**
         * Icon position: "left" or "right".
         *
         * @default "left"
         * @param position  Icon position
         */
        set: function (position) {
            this.setPropertyValue("iconPosition", position);
            if (this.icon) {
                if (position == "left") {
                    this.icon.toBack();
                }
                else {
                    this.icon.toFront();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "label", {
        /**
         * @return Label element
         */
        get: function () {
            return this._label;
        },
        /**
         * [[Label]] element to be used for text.
         *
         * @param label element
         */
        set: function (label) {
            if (this._label) {
                //this._label.dispose();
                this.removeDispose(this._label);
            }
            this._label = label;
            if (label) {
                label.parent = this;
                label.interactionsEnabled = false;
                this._disposers.push(this._label);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a background element for the button.
     *
     * @ignore Exclude from docs
     * @return Background element
     */
    Button.prototype.createBackground = function () {
        return new RoundedRectangle();
    };
    /**
     * Copies properties and other attributes.
     *
     * @param source  Source
     */
    Button.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (source.label) {
            this.label.copyFrom(source.label);
        }
        if (source.icon) {
            this.icon = source.icon.clone();
        }
    };
    return Button;
}(Container));
export { Button };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Button"] = Button;
//# sourceMappingURL=Button.js.map