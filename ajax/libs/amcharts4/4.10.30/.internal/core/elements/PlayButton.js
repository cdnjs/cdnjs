/**
 * Play button functionality.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Button } from "./Button";
import { RoundedRectangle } from "./RoundedRectangle";
import { registry } from "../Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { Triangle } from "./Triangle";
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
 * @see {@link IPlayButtonEvents} for a list of available events
 * @see {@link IPlayButtonAdapters} for a list of available Adapters
 */
var PlayButton = /** @class */ (function (_super) {
    __extends(PlayButton, _super);
    /**
     * Constructor
     */
    function PlayButton() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "PlayButton";
        _this.padding(12, 12, 12, 12);
        _this.showSystemTooltip = true;
        var interfaceColors = new InterfaceColorSet();
        var background = _this.background;
        background.cornerRadius(25, 25, 25, 25);
        background.fill = interfaceColors.getFor("primaryButton");
        background.stroke = interfaceColors.getFor("primaryButtonStroke");
        background.strokeOpacity = 0;
        background.states.getKey("hover").properties.fill = interfaceColors.getFor("primaryButtonHover");
        background.states.getKey("down").properties.fill = interfaceColors.getFor("primaryButtonActive");
        // Create a play icon
        var playIcon = new Triangle();
        playIcon.direction = "right";
        playIcon.width = 9;
        playIcon.height = 11;
        playIcon.marginLeft = 1;
        playIcon.marginRight = 1;
        playIcon.horizontalCenter = "middle";
        playIcon.verticalCenter = "middle";
        playIcon.stroke = interfaceColors.getFor("primaryButtonText");
        playIcon.fill = playIcon.stroke;
        _this.icon = playIcon;
        // Create a play icon
        var stopIcon = new RoundedRectangle();
        stopIcon.width = 11;
        stopIcon.height = 11;
        stopIcon.horizontalCenter = "middle";
        stopIcon.verticalCenter = "middle";
        stopIcon.cornerRadius(0, 0, 0, 0);
        stopIcon.stroke = interfaceColors.getFor("primaryButtonText");
        stopIcon.fill = playIcon.stroke;
        _this.togglable = true;
        var activeState = _this.states.create("active");
        activeState.transitionDuration = 0;
        activeState.properties.icon = stopIcon;
        _this.defaultState.transitionDuration = 0;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    PlayButton.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Play");
        }
    };
    return PlayButton;
}(Button));
export { PlayButton };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PlayButton"] = PlayButton;
//# sourceMappingURL=PlayButton.js.map