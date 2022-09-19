/**
 * A module that defines Text element used to indicate links.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Label } from "../../core/elements/Label";
import { MouseCursorStyle } from "../../core/interaction/Mouse";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { registry } from "../Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a text element with a link.
 *
 * @see {@link ITextLinkEvents} for a list of available events
 * @see {@link ITextLinkAdapters} for a list of available Adapters
 */
var TextLink = /** @class */ (function (_super) {
    __extends(TextLink, _super);
    /**
     * Constructor
     */
    function TextLink() {
        var _this = _super.call(this) || this;
        _this.className = "TextLink";
        _this.selectable = true;
        var interfaceColors = new InterfaceColorSet();
        _this.fill = interfaceColors.getFor("primaryButton").brighten(0.3);
        var hoverState = _this.states.create("hover");
        hoverState.properties.fill = interfaceColors.getFor("primaryButtonHover").brighten(0.3);
        var downState = _this.states.create("down");
        downState.properties.fill = interfaceColors.getFor("primaryButtonDown").brighten(0.3);
        _this.cursorOverStyle = MouseCursorStyle.pointer;
        _this.applyTheme();
        return _this;
    }
    return TextLink;
}(Label));
export { TextLink };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["TextLink"] = TextLink;
//# sourceMappingURL=TextLink.js.map