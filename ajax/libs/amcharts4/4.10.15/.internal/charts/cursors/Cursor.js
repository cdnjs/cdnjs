/**
 * Cursor module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { getInteraction } from "../../core/interaction/Interaction";
import { registry } from "../../core/Registry";
import { percent } from "../../core/utils/Percent";
import { MouseCursorStyle } from "../../core/interaction/Mouse";
import * as $math from "../../core/utils/Math";
import * as $utils from "../../core/utils/Utils";
import * as $type from "../../core/utils/Type";
import * as $dom from "../../core/utils/DOM";
import { system } from "../../core/System";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Main Cursor class with common cursor functionality.
 *
 * Chart-specific cursors must extend this class.
 *
 * @see {@link ICursorEvents} for a list of available events
 * @see {@link ICursorAdapters} for a list of available Adapters
 * @todo Add description, examples
 * @todo Should we allow changing `_generalBehavior`?
 */
var Cursor = /** @class */ (function (_super) {
    __extends(Cursor, _super);
    /**
     * Constructor
     */
    function Cursor() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Current cursor position during selection.
         *
         * @todo Better description
         */
        _this.point = { x: 0, y: 0 };
        /**
         * Specifies the rules when cursor needs to be moved or hidden.
         */
        _this._stick = "none";
        _this.className = "Cursor";
        // Set defaults
        _this.width = percent(100);
        _this.height = percent(100);
        _this.shouldClone = false;
        _this.hide(0);
        _this.trackable = true;
        _this.clickable = true;
        _this.isMeasured = false;
        // Add events on body to trigger down and up events (to start zooming or
        // selection)
        var interaction = getInteraction();
        _this._disposers.push(interaction.body.events.on("down", _this.handleCursorDown, _this));
        _this._disposers.push(interaction.body.events.on("up", _this.handleCursorUp, _this));
        _this._disposers.push(interaction.body.events.on("track", _this.handleCursorMove, _this));
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Handle pointer movement in document and update cursor position as needed.
     *
     * @ignore Exclude from docs
     * @param event Event
     */
    Cursor.prototype.handleCursorMove = function (event) {
        if (!this.interactionsEnabled || (this.interactions.isTouchProtected && event.touch)) {
            return;
        }
        if (((this._generalBehavior != "zoom" && this._generalBehavior != "pan") || !this.downPoint) && !getInteraction().isLocalElement(event.pointer, this.paper.svg, this.uid)) {
            // We want to let zoom/pan continue even if cursor is outside chart area
            if (!this.isHidden || !this.isHiding) {
                this.hide();
            }
            return;
        }
        var local = $utils.documentPointToSprite(event.pointer.point, this);
        if (this._stick == "hard" && this._stickPoint) {
            local = this._stickPoint;
        }
        if (this._stick == "soft" && this._stickPoint) {
            if (!this.fitsToBounds(local)) {
                local = this._stickPoint;
            }
        }
        if (this._adapterO) {
            this._adapterO.apply("cursorPoint", local);
        }
        this.triggerMove(local);
        return local;
    };
    /**
     * Hides actual SVG elements and handles hiding animations.
     *
     * @param duration  Fade out duration (ms)
     * @return Fade out duration (ms)
     * @ignore
     */
    Cursor.prototype.hideReal = function (duration) {
        if ((this._stick == "hard" || this._stick == "soft") && this._stickPoint) {
            return;
        }
        return _super.prototype.hideReal.call(this, duration);
    };
    /**
     * Places the cursor at specific point.
     *
     * The second parameter has following options:
     *
     * `"none"` - placed cursor will only be there until mouse/touch moves, then
     * it either moves to a new place (if pointer over plot area) or is hidden.
     *
     * `"soft"` - cursor will stay in the place if mouse/touch is happening
     * outside chart, but will move to a new place whe plot area is hovered or
     * touched.
     *
     * `"hard"` - cursor will stay in place no matter what, until it is moved by
     * another `triggerMove()` call.
     *
     * The third parameter - `force` (since `4.9.5`) - if set to `true` will
     * make cursor execute all of the actions associated with cursor move,
     * including line redraws, tooltip updates, etc. Useful when underlying
     * chart data is dynamically being updated.
     *
     * @param point  Point to place cursor at
     * @param stick  Level of cursor stickiness to the place
     * @param force  Force cursor move
     */
    Cursor.prototype.triggerMove = function (point, stick, force) {
        point.x = $math.round(point.x, 1);
        point.y = $math.round(point.y, 1);
        if (stick) {
            this._stick = stick;
        }
        if (stick == "hard" || stick == "soft") {
            this._stickPoint = point;
        }
        this.triggerMoveReal(point, force);
    };
    /**
     * Places the cursor at specific point.
     *
     * @param point Point to place cursor at
     */
    Cursor.prototype.triggerMoveReal = function (point, force) {
        if (this.point.x != point.x || this.point.y != point.y || force) {
            this.point = point;
            this.invalidatePosition();
            // hide cursor if it's out of bounds
            if (this.fitsToBounds(point)) {
                this.show(0);
            }
            else {
                // unless we are selecting (mouse is down)
                if (!this.downPoint) {
                    this.hide(0);
                }
            }
            if (this.visible) {
                this.getPositions();
                this.dispatch("cursorpositionchanged"); // not good to dispatch later (check step count example)
            }
        }
    };
    /**
     * Simulates pressing down (click/touch) action by a cursor.
     *
     * @param point               Point of action
     */
    Cursor.prototype.triggerDown = function (point) {
        this.triggerDownReal(point);
    };
    /**
     * Simulates pressing down (click/touch) action by a cursor.
     *
     * @param point               Point of action
     */
    Cursor.prototype.triggerDownReal = function (point) {
        switch (this._generalBehavior) {
            case "zoom":
                this.dispatchImmediately("zoomstarted");
                break;
            case "select":
                this.dispatchImmediately("selectstarted");
                break;
            case "pan":
                this.dispatchImmediately("panstarted");
                getInteraction().setGlobalStyle(MouseCursorStyle.grabbing);
                break;
        }
    };
    /**
     * Simulates the action of release of the mouse down / touch.
     *
     * @param point               Point of action
     */
    Cursor.prototype.triggerUp = function (point) {
        this.triggerUpReal(point);
    };
    /**
     * Simulates the action of release of the mouse down / touch.
     *
     * @param point               Point of action
     */
    Cursor.prototype.triggerUpReal = function (point) {
        system.requestFrame();
        this.updatePoint(this.upPoint);
        var interaction = getInteraction();
        if ($math.getDistance(this._upPointOrig, this._downPointOrig) > interaction.getHitOption(this.interactions, "hitTolerance")) {
            switch (this._generalBehavior) {
                case "zoom":
                    this.dispatch("zoomended");
                    break;
                case "select":
                    this.dispatch("selectended");
                    break;
                case "pan":
                    this.dispatch("panended");
                    interaction.setGlobalStyle(MouseCursorStyle.default);
                    break;
            }
            this.downPoint = undefined;
            this.updateSelection();
        }
        /*
        else {
            
            if(this._generalBehavior == "select"){
                this.dispatchImmediately("selectended");
            }
            this.dispatchImmediately("behaviorcanceled");
            interaction.setGlobalStyle(MouseCursorStyle.default);
            this.downPoint = undefined;
        }*/
    };
    /**
     * Updates selection dimensions on size change.
     *
     * @ignore Exclude from docs
     */
    Cursor.prototype.updateSelection = function () {
    };
    /**
     * Updates cursors current positions.
     */
    Cursor.prototype.getPositions = function () {
        // positions are used by axes or series
        this.xPosition = this.point.x / this.innerWidth;
        this.yPosition = 1 - this.point.y / this.innerHeight;
    };
    /**
     * Handles pointer down event so we can start zoom or selection.
     *
     * @ignore Exclude from docs
     * @param event Original event
     */
    Cursor.prototype.handleCursorDown = function (event) {
        if (!this.interactionsEnabled || (this.interactions.isTouchProtected && event.touch) || !getInteraction().isLocalElement(event.pointer, this.paper.svg, this.uid)) {
            return;
        }
        // Initiate blur so that whatever focused element on the page is unselected
        $dom.blur();
        // Get local point
        var local = $utils.documentPointToSprite(event.pointer.point, this);
        if (this._stick == "hard" && this._stickPoint) {
            local = this._stickPoint;
        }
        if (this._adapterO) {
            this._adapterO.apply("cursorPoint", local);
        }
        if (!this.fitsToBounds(local)) {
            return;
        }
        this._downPointOrig = { x: local.x, y: local.y };
        // We need to cancel the event to prevent gestures on touch devices
        if (event.event.cancelable && this.shouldPreventGestures(event.touch) && this.fitsToBounds(local)) {
            event.event.preventDefault();
        }
        // Make this happen
        this.triggerMove(local);
        this.triggerDown(local);
    };
    /**
     * Determines whether Cursor should prevent default action on move.
     *
     * Child classes should override this as necessary.
     *
     * @return Prevent default?
     */
    Cursor.prototype.shouldPreventGestures = function (touch) {
        return true;
    };
    /**
     * Updates the coordinates of where pointer down event occurred
     * (was pressed).
     */
    Cursor.prototype.updatePoint = function (point) {
    };
    /**
     * Handles pointer up event - finishes zoom or selection action.
     *
     * @ignore Exclude from docs
     * @param event Original event
     */
    Cursor.prototype.handleCursorUp = function (event) {
        if (!this.interactionsEnabled) {
            return;
        }
        if (!this.downPoint && !getInteraction().isLocalElement(event.pointer, this.paper.svg, this.uid)) {
            return;
        }
        var local = $utils.documentPointToSprite(event.pointer.point, this);
        if (this._adapterO) {
            this._adapterO.apply("cursorPoint", local);
        }
        if (!this.downPoint || !this.fitsToBounds(this.downPoint)) {
            return;
        }
        if (this._stick == "hard" && this._stickPoint) {
            local = this._stickPoint;
        }
        this._upPointOrig = { x: local.x, y: local.y };
        this.triggerMove(local);
        this.triggerUp(local);
    };
    Object.defineProperty(Cursor.prototype, "chart", {
        /**
         * @return Chart
         */
        get: function () {
            return this._chart;
        },
        /**
         * A reference to a [[Chart]] the cursor belongs to.
         *
         * @param value  Chart
         */
        set: function (value) {
            this._chart = value;
            if ($type.hasValue(this._chart.plotContainer)) {
                getInteraction().lockElement(this._chart.plotContainer.interactions);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Cursor;
}(Container));
export { Cursor };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Cursor"] = Cursor;
//# sourceMappingURL=Cursor.js.map