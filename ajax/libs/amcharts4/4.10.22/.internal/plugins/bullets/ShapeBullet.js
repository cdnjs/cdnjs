/**
 * Functionality for drawing bullets with basic shapes.
 */
import { __extends } from "tslib";
import { Bullet } from "../../charts/elements/Bullet";
import { Rectangle } from "../../core/elements/Rectangle";
import { Circle } from "../../core/elements/Circle";
import { Triangle } from "../../core/elements/Triangle";
import { registry } from "../../core/Registry";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a ShapeBullet shape.
 *
 * @since 4.9.34
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-bullets/} for usage instructions.
 * @see {@link IShapeBulletEvents} for a list of available events
 * @see {@link IShapeBulletAdapters} for a list of available Adapters
 */
var ShapeBullet = /** @class */ (function (_super) {
    __extends(ShapeBullet, _super);
    /**
     * Constructor
     */
    function ShapeBullet() {
        var _this = _super.call(this) || this;
        _this.className = "ShapeBullet";
        _this.size = 10;
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    ShapeBullet.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.shapeElement) {
            this.shapeElement.dispose();
        }
        switch (this.shape) {
            case "square":
                this.createSquare();
                break;
            case "diamond":
                this.createSquare(45);
                break;
            case "circle":
                this.createCircle();
                break;
            case "up":
                this.createTriangle();
                break;
            case "right":
                this.createTriangle(90);
                break;
            case "down":
                this.createTriangle(180);
                break;
            case "left":
                this.createTriangle(270);
                break;
        }
        // todo
    };
    /**
     * Decorates the shape so it is positioned properly.
     */
    ShapeBullet.prototype.processShape = function () {
        this.shapeElement.horizontalCenter = "middle";
        this.shapeElement.verticalCenter = "middle";
    };
    /**
     * Creates a square shape.
     */
    ShapeBullet.prototype.createSquare = function (rotation) {
        if (rotation === void 0) { rotation = 0; }
        var element = this.createChild(Rectangle);
        element.width = this.size;
        element.height = this.size;
        element.rotation = rotation;
        this.shapeElement = element;
        this.processShape();
    };
    /**
     * Creates a circle shape.
     */
    ShapeBullet.prototype.createCircle = function (rotation) {
        if (rotation === void 0) { rotation = 0; }
        var element = this.createChild(Circle);
        element.radius = this.size / 2;
        this.shapeElement = element;
        this.processShape();
    };
    /**
     * Creates a triangle shape.
     */
    ShapeBullet.prototype.createTriangle = function (rotation) {
        if (rotation === void 0) { rotation = 0; }
        var element = this.createChild(Triangle);
        element.width = this.size;
        element.height = this.size;
        element.rotation = rotation;
        this.shapeElement = element;
        this.processShape();
    };
    Object.defineProperty(ShapeBullet.prototype, "shape", {
        /**
         * @return shape scope
         */
        get: function () {
            return this.getPropertyValue("shape");
        },
        /**
         * Shape of the bullet.
         *
         * Available options: `"square"`, `"diamond"`, `"circle"`, `"up"`, `"down"`,
         * `"left"`, `"right"`.
         *
         * There is no default. If `shape` is not set, the bullets will come out
         * empty.
         *
         * @param  value  Shape
         */
        set: function (value) {
            if (this.setPropertyValue("shape", value, true)) {
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShapeBullet.prototype, "size", {
        /**
         * @return Size (px)
         */
        get: function () {
            var size = this.getPropertyValue("size");
            if (!$type.isNumber(size)) {
                size = 0;
            }
            return size;
        },
        /**
         * Size (width and height in pixels) of the bullet. The actual shapes will be
         * sized and positioned to fit this pixel value.
         *
         * @default 10
         * @param value  Size (px)
         */
        set: function (value) {
            if (this.setPropertyValue("size", value, true)) {
                this.width = value;
                this.height = value;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    return ShapeBullet;
}(Bullet));
export { ShapeBullet };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ShapeBullet"] = ShapeBullet;
//# sourceMappingURL=ShapeBullet.js.map