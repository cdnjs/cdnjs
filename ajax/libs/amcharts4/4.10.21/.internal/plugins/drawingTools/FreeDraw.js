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
import { percent } from "../../core/utils/Percent";
import * as $utils from "../../core/utils/Utils";
import { getInteraction } from "../../core/interaction/Interaction";
import { Polyspline } from "../../core/elements/Polyspline";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * FreeDraw class is capable of drawing a simple rectangular button with
 * optionally rounded corners and an icon in it.
 *
 * @see {@link IFreeDrawEvents} for a list of available events
 * @see {@link IFreeDrawAdapters} for a list of available Adapters
 */
var FreeDraw = /** @class */ (function (_super) {
    __extends(FreeDraw, _super);
    /**
     * Constructor
     */
    function FreeDraw() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.splines = [];
        _this.isDrawing = false;
        _this.className = "FreeDraw";
        _this.width = percent(100);
        _this.height = percent(100);
        _this.isMeasured = false;
        _this.background.fillOpacity = 0;
        var interaction = getInteraction();
        _this.strokeOpacity = 1;
        _this.strokeWidth = 1;
        _this.stroke = new InterfaceColorSet().getFor("stroke");
        _this.events.on("down", _this.handleDrawStart, _this, false);
        _this._disposers.push(interaction.body.events.on("up", _this.handleDrawEnd, _this));
        _this._disposers.push(interaction.body.events.on("track", _this.handleDraw, _this));
        _this._disposers.push(interaction.body.events.on("keyup", _this.handleKeyUp, _this));
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    FreeDraw.prototype.handleKeyUp = function () {
        this._direction = undefined;
    };
    FreeDraw.prototype.handleDraw = function (event) {
        if (this.isDrawing) {
            var point = $utils.documentPointToSprite(event.pointer.point, this);
            if (event.event.shiftKey) {
                if (this._direction == undefined) {
                    if (this._prevPoint) {
                        if (Math.abs(this._prevPoint.x - point.x) > Math.abs(this._prevPoint.y - point.y)) {
                            this._direction = "horizontal";
                        }
                        else {
                            this._direction = "vertical";
                        }
                    }
                }
                if (this._prevPoint) {
                    if (this._direction == "horizontal") {
                        point.y = this._prevPoint.y;
                    }
                    else if (this._direction == "vertical") {
                        point.x = this._prevPoint.x;
                    }
                }
            }
            else {
                this._direction = undefined;
            }
            this.currentPoints.push(point);
            this.currentSpline.segments = [this.currentPoints];
            this._prevPoint = point;
        }
    };
    FreeDraw.prototype.handleDrawStart = function (event) {
        this.isDrawing = true;
        this._direction = undefined;
        if (event.event.shiftKey) {
            var point = $utils.documentPointToSprite(event.pointer.point, this);
            if (!this.currentPoints) {
                this.currentPoints = [];
            }
            if (!this.currentSpline) {
                this.currentSpline = this.createChild(Polyspline);
            }
            this.currentPoints.push(point);
            this.currentSpline.segments = [this.currentPoints];
        }
        else {
            this.currentSpline = this.createChild(Polyspline);
            this.currentPoints = [];
            this.splines.push(this.currentSpline);
        }
        this.currentSpline.tensionX = 1;
        this.currentSpline.tensionY = 1;
        this._prevPoint = undefined;
    };
    FreeDraw.prototype.handleDrawEnd = function (event) {
        this.isDrawing = false;
    };
    return FreeDraw;
}(Container));
export { FreeDraw };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["FreeDraw"] = FreeDraw;
//# sourceMappingURL=FreeDraw.js.map