/**
 * Functionality for adding images in SVG tree.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../Sprite";
import { registry } from "../Registry";
import * as $dom from "../utils/DOM";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to add `<image>` elements to SVG.
 *
 * @see {@link IImageEvents} for a list of available events
 * @see {@link IImageAdapters} for a list of available Adapters
 */
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    /**
     * Constructor
     */
    function Image() {
        var _this = _super.call(this) || this;
        _this.className = "Image";
        _this.element = _this.paper.add("image");
        _this.applyTheme();
        _this.width = 50;
        _this.height = 50;
        return _this;
    }
    /**
     * Draws an `<image>` element.
     *
     * @ignore Exclude from docs
     */
    Image.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.href) {
            var width = this.innerWidth;
            var height = this.innerHeight;
            if ($type.isNumber(this.widthRatio)) {
                width = height * this.widthRatio;
                this.width = width;
            }
            if ($type.isNumber(this.heightRatio)) {
                height = width * this.heightRatio;
                this.height = height;
            }
            this.element.attr({
                "width": width,
                "height": height
            });
            this.element.attrNS($dom.XLINK, "xlink:href", this.href);
        }
    };
    Object.defineProperty(Image.prototype, "href", {
        /**
         * @return Image URI
         */
        get: function () {
            return this.getPropertyValue("href");
        },
        /**
         * An image URI.
         *
         * @param value  Image URI
         */
        set: function (value) {
            this.setPropertyValue("href", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "widthRatio", {
        /**
         * @return Ratio
         */
        get: function () {
            return this.getPropertyValue("widthRatio");
        },
        /**
         * Sets image `width` relatively to its `height`.
         *
         * If image's `height = 100` and `widthRatio = 0.5` the actual width will be
         * `50`.
         *
         * @param value  Ratio
         */
        set: function (value) {
            this.setPropertyValue("widthRatio", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "heightRatio", {
        /**
         * @return Ratio
         */
        get: function () {
            return this.getPropertyValue("heightRatio");
        },
        /**
         * Sets image `height` relatively to its `width`.
         *
         * If image's `width = 100` and `heightRatio = 0.5` the actual height will be
         * `50`.
         *
         * @param value  Ratio
         */
        set: function (value) {
            this.setPropertyValue("heightRatio", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "bbox", {
        /**
         * Returns bounding box (square) for this element.
         *
         * @ignore Exclude from docs
         */
        get: function () {
            return {
                x: 0,
                y: 0,
                width: this.pixelWidth,
                height: this.pixelHeight
            };
        },
        enumerable: true,
        configurable: true
    });
    return Image;
}(Sprite));
export { Image };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Image"] = Image;
//# sourceMappingURL=Image.js.map