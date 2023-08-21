/**
 * Functionality related simulating of dragging of elements using keyboard.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { getInteraction } from "./Interaction";
import { system } from "../System";
import * as $array from "../utils/Array";
/**
 * [[InteractionKeyboardObject]] is used to simulate dragging of the `draggable`
 * element using keyboard arrows.
 *
 * @ignore Exclude from docs
 */
var InteractionKeyboardObject = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param io An InteractionObject
     */
    function InteractionKeyboardObject(io, ev) {
        /**
         * Indicates if this object has already been deleted. Any
         * destruction/disposal code should take this into account when deciding
         * wheter to run potentially costly disposal operations if they already have
         * been run.
         */
        this._disposed = false;
        /**
         * Indicates direction of current horizontal movement.
         *
         * 0 - not moving horizontally
         * 1 - moving right
         * -1 - moving left
         */
        this.directionX = 0;
        /**
         * Indicates direction of current vertical movement.
         *
         * 0 - not moving vertically
         * 1 - moving down
         * -1 - moving up
         */
        this.directionY = 0;
        this.interaction = io;
        this.keyboardEvent = ev;
        this._startedOn = new Date().getTime();
        getInteraction().processDragStart(io);
        system.animations.push(this);
        this.update();
    }
    /**
     * It's an update method which is called by the system if
     * [[InteractionObject]] is used as animation.
     *
     * This will update coordinates of the element based on the movement
     * directions.
     */
    InteractionKeyboardObject.prototype.update = function () {
        // Init and get settings
        var io = this.interaction;
        var speed = getInteraction().getKeyboardOption(io, "speed"), accelleration = getInteraction().getKeyboardOption(io, "accelleration"), accellerationDelay = getInteraction().getKeyboardOption(io, "accellerationDelay"), shift = {
            x: 0,
            y: 0
        };
        // If SHIFT key is pressed we slash speed by half and disable accelleration
        if (this.keyboardEvent.shiftKey) {
            speed *= 0.5;
            accelleration = 1;
        }
        // If CTRL is pressed we increase speed by x2
        else if (this.keyboardEvent.ctrlKey) {
            speed *= 2;
        }
        // Get elapsed time
        var ms = new Date().getTime() - this._startedOn;
        var accelleratedMs = ms - accellerationDelay;
        // Add accellerated movement
        if ((accelleration > 0) && (accelleratedMs > 0)) {
            var accellerationFactor = ms / accellerationDelay;
            ms = accellerationDelay;
            shift.x += this.directionX * (speed * accelleration * accellerationFactor * accelleratedMs);
            shift.y += this.directionY * (speed * accelleration * accellerationFactor * accelleratedMs);
        }
        // Calculate position
        shift.x += this.directionX * (speed * ms);
        shift.y += this.directionY * (speed * ms);
        // Simulate move on Interaction
        getInteraction().handleTransformMove(io, shift, { x: 0, y: 0 }, this.keyboardEvent, true, false);
    };
    /**
     * Returns if this object has been already been disposed.
     *
     * @return Is disposed?
     */
    InteractionKeyboardObject.prototype.isDisposed = function () {
        return this._disposed;
    };
    /**
     * Disposes this object. Removes from system animations.
     */
    InteractionKeyboardObject.prototype.dispose = function () {
        if (!this._disposed) {
            getInteraction().processDragStop(this.interaction);
            $array.remove(system.animations, this);
        }
    };
    return InteractionKeyboardObject;
}());
export { InteractionKeyboardObject };
//# sourceMappingURL=InteractionKeyboardObject.js.map