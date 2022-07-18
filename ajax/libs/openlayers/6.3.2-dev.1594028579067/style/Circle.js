/**
 * @module ol/style/Circle
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import RegularShape from './RegularShape.js';
/**
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} radius Circle radius.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {Array<number>} [displacement=[0,0]] displacement
 */
/**
 * @classdesc
 * Set circle style for vector features.
 * @api
 */
var CircleStyle = /** @class */ (function (_super) {
    __extends(CircleStyle, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function CircleStyle(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            points: Infinity,
            fill: options.fill,
            radius: options.radius,
            stroke: options.stroke,
            displacement: options.displacement !== undefined ? options.displacement : [0, 0],
        }) || this;
        return _this;
    }
    /**
     * Clones the style.
     * @return {CircleStyle} The cloned style.
     * @api
     */
    CircleStyle.prototype.clone = function () {
        var style = new CircleStyle({
            fill: this.getFill() ? this.getFill().clone() : undefined,
            stroke: this.getStroke() ? this.getStroke().clone() : undefined,
            radius: this.getRadius(),
            displacement: this.getDisplacement().slice(),
        });
        style.setOpacity(this.getOpacity());
        style.setScale(this.getScale());
        return style;
    };
    /**
     * Set the circle radius.
     *
     * @param {number} radius Circle radius.
     * @api
     */
    CircleStyle.prototype.setRadius = function (radius) {
        this.radius_ = radius;
        this.render();
    };
    return CircleStyle;
}(RegularShape));
export default CircleStyle;
//# sourceMappingURL=Circle.js.map