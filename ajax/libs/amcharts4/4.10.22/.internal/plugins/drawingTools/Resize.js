/**
 * Functionality for drawing paths.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { registry } from "../../core/Registry";
import * as $utils from "../../core/utils/Utils";
import { Rectangle } from "../../core/elements/Rectangle";
import { getInteraction } from "../../core/interaction/Interaction";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Resize class is capable of drawing a simple rectangular button with
 * optionally rounded corners and an icon in it.
 *
 * @see {@link IResizeEvents} for a list of available events
 * @see {@link IResizeAdapters} for a list of available Adapters
 */
var Resize = /** @class */ (function (_super) {
    __extends(Resize, _super);
    /**
     * Constructor
     */
    function Resize() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.isResizing = false;
        _this.constrainProportions = false;
        _this.className = "Resize";
        _this.isMeasured = false;
        // TODO is this needed ?
        getInteraction();
        var color = new InterfaceColorSet().getFor("alternativeBackground");
        var rectangle = _this.createChild(Rectangle);
        rectangle.strokeOpacity = 1;
        rectangle.strokeWidth = 1;
        rectangle.strokeDasharray = "2,2";
        rectangle.fillOpacity = 0;
        rectangle.stroke = color;
        _this.rectangle = rectangle;
        var tlGrip = _this.createChild(Rectangle);
        tlGrip.width = 10;
        tlGrip.height = 10;
        tlGrip.fill = color;
        tlGrip.verticalCenter = "middle";
        tlGrip.horizontalCenter = "middle";
        tlGrip.draggable = true;
        _this.tlGrip = tlGrip;
        tlGrip.events.on("drag", _this.handleGrips, _this, true);
        tlGrip.events.on("dragstart", _this.handleStartResize, _this, true);
        _this.trGrip = tlGrip.clone();
        _this.trGrip.parent = _this;
        _this.brGrip = tlGrip.clone();
        _this.brGrip.parent = _this;
        _this.blGrip = tlGrip.clone();
        _this.blGrip.parent = _this;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(Resize.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        set: function (sprite) {
            this._sprite = sprite;
            if (sprite) {
                this.toFront();
                this.visible = true;
                this.updatePosition();
                this._changeDisposer = sprite.events.on("transformed", this.updatePosition, this, false);
            }
            else {
                this.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Resize.prototype.updatePosition = function () {
        var sprite = this._sprite;
        if (sprite) {
            var w = sprite.measuredWidth;
            var h = sprite.measuredHeight;
            this.rectangle.width = w;
            this.rectangle.height = h;
            this.rectangle.x = 0;
            this.rectangle.y = 0;
            var point = $utils.spritePointToSprite({ x: sprite.pixelX + sprite.maxLeft, y: sprite.pixelY + sprite.maxTop }, sprite.parent, this.parent);
            this.x = point.x;
            this.y = point.y;
            this.tlGrip.x = 0;
            this.tlGrip.y = 0;
            this.trGrip.x = w;
            this.trGrip.y = 0;
            this.brGrip.x = w;
            this.brGrip.y = h;
            this.blGrip.x = 0;
            this.blGrip.y = h;
        }
    };
    Resize.prototype.handleStartResize = function () {
        this._startWidth = this.sprite.measuredWidth;
        this._startHeight = this.sprite.measuredHeight;
        this._startX = this.sprite.pixelX;
        this._startY = this.sprite.pixelY;
    };
    Resize.prototype.handleGrips = function (event) {
    };
    return Resize;
}(Container));
export { Resize };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Resize"] = Resize;
//# sourceMappingURL=Resize.js.map