/**
 * Bullet module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Bullet } from "./Bullet";
import { Sprite } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import * as $path from "../../core/rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a bullet with a textual label.
 *
 * Uses [[Label]] instance to draw the label, so the label itself is
 * configurable.
 *
 * @see {@link IBulletEvents} for a list of available events
 * @see {@link IBulletAdapters} for a list of available Adapters
 * @todo Usage example
 * @important
 */
var ErrorBullet = /** @class */ (function (_super) {
    __extends(ErrorBullet, _super);
    /**
     * Constructor
     */
    function ErrorBullet() {
        var _this = _super.call(this) || this;
        _this.className = "ErrorBullet";
        _this.errorLine = _this.createChild(Sprite);
        _this.errorLine.shouldClone = false;
        _this.width = 20;
        _this.height = 20;
        _this.strokeOpacity = 1;
        _this.isDynamic = true;
        return _this;
    }
    ErrorBullet.prototype.validatePosition = function () {
        _super.prototype.validatePosition.call(this);
        var w = this.pixelWidth / 2;
        var h = this.pixelHeight / 2;
        this.errorLine.path = $path.moveTo({ x: -w, y: -h }) + $path.lineTo({ x: w, y: -h }) + $path.moveTo({ x: 0, y: -h }) + $path.lineTo({ x: 0, y: h }) + $path.moveTo({ x: -w, y: h }) + $path.lineTo({ x: w, y: h });
    };
    /**
     * Copies all proprities and related stuff from another instance of
     * [[ErrorBullet]].
     *
     * @param source  Source element
     */
    ErrorBullet.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.errorLine.copyFrom(source.errorLine);
    };
    return ErrorBullet;
}(Bullet));
export { ErrorBullet };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ErrorBullet"] = ErrorBullet;
//# sourceMappingURL=ErrorBullet.js.map