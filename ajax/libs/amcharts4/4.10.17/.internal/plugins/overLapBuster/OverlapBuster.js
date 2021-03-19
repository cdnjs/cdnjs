/**
 * Plugin which enables automatically exploding overlapping elements.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Plugin } from "../../core/utils/Plugin";
import { List } from "../../core/utils/List";
import * as $array from "../../core/utils/Array";
//import * as $math from "../../core/utils/Math";
import * as d3force from "d3-force";
import { Dictionary } from "../../core/utils/Dictionary";
import { Disposer, MultiDisposer } from "../../core/utils/Disposer";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A plugin which automatically groups [[PercenSeries]] slices that are smaller
 * than certain percent into one "Other" slice.
 *
 * By pushing an instance of [[Annnotation]] into `plugin` list of
 * any [[Chart]], it automatically applies the functionality.
 *
 * Example:
 *
 * ```TypeScript
 * let overlap = chart.plugins.push(new am4plugins_overlapBuster.OverlapBuster());
 * overlap.targets.push(bullet);
 * ```
 * ```JavaScript
 * let overlap = chart.plugins.push(new am4plugins_overlapBuster.OverlapBuster());
 * overlap.targets.push(bullet);
 * ```
 * ```JSON
 * // this plugin does not support JSON config
 * ```
 *
 * @since 4.6.2
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-overlap-buster/} for more information and usage instructions
 */
var OverlapBuster = /** @class */ (function (_super) {
    __extends(OverlapBuster, _super);
    /**
     * Constructor
     */
    function OverlapBuster() {
        var _this = 
        // Nothing to do here
        _super.call(this) || this;
        /**
         * How much of the obstructed object should be arevealed approximately.
         *
         * The number is relative (0-1). With `0` meaning the objstructed objects
         * won't be moved at all, `0.5` (default) will make at least half of the
         * object show up, and `1` to reveal object whole.
         *
         * @default 0.7
         */
        _this.revealRatio = 0.7;
        /**
         * A delay in milliseconds to postpone collapse of expanded items once
         * they are unhovered.
         *
         * @default 500
         */
        _this.collapseDelay = 500;
        /**
         * How big an area to check for overlapping elements should be checked in
         * relation to hovered items size.
         *
         * `1` (one) means it will affect only elements that are at least partially
         * overlapping with the target element.
         *
         * `2` (two) will check area twice as big.
         *
         * Etc.
         *
         * @default 2
         */
        _this.tolerance = 2;
        // Create simulation
        _this.d3forceSimulation = d3force.forceSimulation();
        // Init shifted targets list
        _this._shiftedTargets = new Dictionary();
        _this._disposers.push(new Disposer(function () { return _this._shiftedTargets; }));
        // Create list
        _this._targets = new List();
        _this._disposers.push(new Disposer(function () { return _this.targets; }));
        // Events
        _this._targets.events.on("inserted", function (ev) {
            // Set up hover events
            _this._disposers.push(new MultiDisposer([
                ev.newValue.events.on("over", _this.handleHover, _this),
                ev.newValue.events.on("out", _this.handleOut, _this)
            ]));
            // We need this in order to auto-register clones of the template
            if (ev.newValue.isTemplate) {
                _this._disposers.push(ev.newValue.events.once("ready", _this.register, _this));
            }
        });
        return _this;
    }
    /**
     * Initializes plugin.
     */
    OverlapBuster.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    Object.defineProperty(OverlapBuster.prototype, "targets", {
        /**
         * A list of objects to check for overlapping.
         *
         * If you push a list template into this, e.g. bullet from a series, all
         * elements created from that templat will automatically end up in this list.
         *
         * @return List of target objects
         */
        get: function () {
            return this._targets;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handles hover event on a target element.
     *
     * @param  ev  Event
     */
    OverlapBuster.prototype.handleHover = function (ev) {
        var _this = this;
        var mainTarget = ev.target;
        // Collapse currently exploded items
        if (this._centerTarget) {
            if (this._centerTarget === mainTarget) {
                // Same item. Do nothing.
                this.cancelCollapse();
                return;
            }
            if (this._shiftedTargets.hasKey(mainTarget.uid)) {
                // Currently expanded item.
                // Clear collapse timeout which probably is already ticking after
                // hovering out of the previous center.
                this.cancelCollapse();
                return;
            }
            // Some totally different cluster was hovered.
            // Initiate immediate collapse of currently exploded cluster.
            this.collapseCurrent();
        }
        // Set up simulation
        //let w = $math.max(50, this.target.innerWidth);
        //let h = $math.max(50, this.target.innerHeight);
        var d3forceSimulation = this.d3forceSimulation;
        if (d3forceSimulation) {
            // Assemble ojects
            var nodes_1 = [];
            this._nodes = nodes_1;
            this._targets.each(function (target) {
                if (_this.hitTest(mainTarget, target)) {
                    var x = target.pixelX;
                    var y = target.pixelY;
                    nodes_1.push({
                        radius: Math.max(target.measuredWidth, target.measuredHeight) / 2 * _this.revealRatio,
                        target: target,
                        x: x,
                        y: y,
                        ox: x,
                        oy: y
                    });
                    // Log shifted
                    _this._shiftedTargets.setKey(target.uid, {
                        target: target,
                        originalX: target.dx,
                        originalY: target.dy
                    });
                    _this.stopAnimation(target);
                }
            });
            this.d3forceSimulation = d3force.forceSimulation(nodes_1)
                .force('collision', d3force.forceCollide().radius(function (d) {
                return d.radius;
            }))
                .on("tick", function () {
                $array.each(nodes_1, function (node) {
                    // node.target.dx = node.target.pixelX - node.x;
                    // node.target.dy = node.target.pixelY - node.y;
                    node.target.dx = node.x - node.ox;
                    node.target.dy = node.y - node.oy;
                });
            });
        }
        // Set center
        this._centerTarget = mainTarget;
    };
    /**
     * Handles out event on a target element.
     *
     * @param  ev  Event
     */
    OverlapBuster.prototype.handleOut = function (ev) {
        var _this = this;
        // Dispose old timeout if necessary
        this.cancelCollapse();
        // Delay collapse
        this._collapseTimeout = this.target.setTimeout(function () {
            _this.collapseCurrent();
        }, this.collapseDelay + 10);
    };
    /**
     * Stops object's animations.
     * @param  target  Target
     */
    OverlapBuster.prototype.stopAnimation = function (target) {
        if (target.isInTransition()) {
            var animation = target.animations.pop();
            while (animation) {
                animation.kill();
                animation = target.animations.pop();
            }
        }
    };
    /**
     * Collapses currently expanded cluster of objects.
     */
    OverlapBuster.prototype.collapseCurrent = function () {
        var _this = this;
        // Stop all directed force simulations
        this.d3forceSimulation.force("collision", null);
        this.d3forceSimulation.stop();
        // Animate elements back to their original positions
        $array.each(this._nodes, function (node) {
            node.target.animate([
                { property: "dx", to: 0 },
                { property: "dy", to: 0 }
            ], _this.target.defaultState.transitionDuration);
        });
        // Reset center
        this._centerTarget = undefined;
        // Clear the list
        this._shiftedTargets.clear();
    };
    /**
     * Cancels the collapse timeout.
     */
    OverlapBuster.prototype.cancelCollapse = function () {
        if (this._collapseTimeout) {
            this._collapseTimeout.dispose();
        }
    };
    /**
     * Registers new element.
     *
     * @param  ev  Event
     */
    OverlapBuster.prototype.register = function (ev) {
        if (this._targets.indexOf(ev.target) == -1) {
            this._targets.push(ev.target);
        }
    };
    /**
     * Checks if the this element has any of its parts overlapping with another
     * element.
     *
     * @todo Description (review)
     * @param sprite  Second element to test again
     * @return Overlapping?
     */
    OverlapBuster.prototype.hitTest = function (target, sprite) {
        // validate, otherwise we will not know measuredWidth and measuredHeight
        if (target.invalid) {
            target.validate();
        }
        if (target.invalid) {
            target.validate();
        }
        var ax1 = target.pixelX;
        var ay1 = target.pixelY;
        var ax2 = ax1 + target.measuredWidth * this.tolerance;
        var ay2 = ay1 + target.measuredHeight * this.tolerance;
        var bx1 = sprite.pixelX;
        var by1 = sprite.pixelY;
        var bx2 = bx1 + sprite.measuredWidth * this.tolerance;
        var by2 = by1 + sprite.measuredHeight * this.tolerance;
        return !(bx1 > ax2 || bx2 < ax1 || by1 > ay2 || by2 < ay1);
    };
    return OverlapBuster;
}(Plugin));
export { OverlapBuster };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["OverlapBuster"] = OverlapBuster;
//# sourceMappingURL=OverlapBuster.js.map