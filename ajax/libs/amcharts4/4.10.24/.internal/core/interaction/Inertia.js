/**
 * Functionality related to inertia
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../Base";
import { getInteraction } from "./Interaction";
import { AnimationDisposer } from "../utils/Animation";
import * as $type from "../utils/Type";
/**
 * A point of inertia is to simulate gradually drecreasing motion even after
 * actual interaction by user, that caused it, has already ended.
 *
 * [[Inertia]] object will continue triggering the same [[Sprite]] handlers
 * as if the interaction was still happening, gradually reducing
 * shift/angle/scale values until full stop.
 *
 * Basically, from the target element's point of view, while inertia is
 * playing, it is still being interacted with by user, albeit with a
 * decreasing speed.
 */
var Inertia = /** @class */ (function (_super) {
    __extends(Inertia, _super);
    /**
     * Constructor
     */
    function Inertia(interaction, type, point, startPoint) {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * List of animations currently playing.
         */
        _this.animations = [];
        _this.className = "Inertia";
        _this.interaction = interaction;
        _this.type = type;
        _this.point = point;
        _this.startPoint = startPoint;
        // Make animations disposable
        _this._disposers.push(new AnimationDisposer(_this.animations));
        return _this;
    }
    Object.defineProperty(Inertia.prototype, "x", {
        /**
         * Returns current X coordinate.
         *
         * @return X
         */
        get: function () {
            return this.point.x;
        },
        /**
         * Sets current X coordinate.
         *
         * Will trigger "drag" event for the target element.
         *
         * @param value X
         */
        set: function (value) {
            if ($type.isNumber(value)) {
                this.point.x = value;
                this.handleMove();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Inertia.prototype, "y", {
        /**
         * Returns current Y coordinate.
         *
         * @return Y
         */
        get: function () {
            return this.point.y;
        },
        /**
         * Sets current Y coordinate.
         *
         * Will trigger "drag" event for the target element.
         *
         * @param value Y
         */
        set: function (value) {
            if ($type.isNumber(value)) {
                this.point.y = value;
                this.handleMove();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Simulates dragging of element.
     */
    Inertia.prototype.handleMove = function () {
        // Prepare {InteractionEvent} object
        if (this.interaction.events.isEnabled("drag")) {
            var imev = {
                type: "drag",
                target: this.interaction,
                shift: {
                    x: this.x - this.startPoint.x,
                    y: this.y - this.startPoint.y
                },
                startPoint: this.startPoint,
                point: {
                    x: this.x,
                    y: this.y
                },
                touch: false
            };
            // Call handler
            this.interaction.events.dispatchImmediately("drag", imev);
        }
    };
    /**
     * Finishes up the inertia animation. (removes reference to this animation
     * object)
     */
    Inertia.prototype.done = function () {
        // Remove inertia animation from the object
        this.interaction.inertias.removeKey(this.type);
        // Move ended
        if (this.type === "move") {
            getInteraction().processDragStop(this.interaction);
        }
        // Destroy
        this.dispose();
    };
    return Inertia;
}(BaseObject));
export { Inertia };
//# sourceMappingURL=Inertia.js.map