/**
 * [[AMElement]] represents any SVG element and related functionality.
 */
import * as $dom from "../utils/DOM";
import * as $object from "../utils/Object";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for all SVG elements. Provides low-level DOM functionality.
 *
 * All visual elements extend this class.
 */
var AMElement = /** @class */ (function () {
    /**
     * Constructor creates a new element or uses the one that was passed in.
     *
     * @param element Element reference node type
     */
    function AMElement(element) {
        /**
         * Indicates if the element was already disposed.
         */
        this._isDisposed = false;
        /**
         * Current X coordinate.
         */
        this._x = 0;
        /**
         * Current Y coordinate.
         */
        this._y = 0;
        /**
         *
         */
        this._rotationY = 0;
        /**
         *
         */
        this._rotationX = 0;
        /**
         * Current rotation.
         */
        this._rotation = 0;
        /**
         * Current scale.
         */
        this._scale = 1;
        if (typeof element === "string") {
            this.node = document.createElementNS($dom.SVGNS, element);
        }
        else {
            this.node = element;
        }
    }
    /**
     * Removes element's node from DOM.
     */
    AMElement.prototype.removeNode = function () {
        if (this.node) {
            if (this.node.parentNode) {
                this.node.parentNode.removeChild(this.node);
            }
        }
    };
    Object.defineProperty(AMElement.prototype, "transformString", {
        /**
         * Returns `transform` attribute of the element.
         *
         * @ignore Exclude from docs
         * @return Transform attribute value
         */
        get: function () {
            if (this.node) {
                return this._transformString;
                /*
                const value = this.node.getAttribute("transform");
    
                if (value !== null) {
                    return value;
                }*/
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Appply position, rotation and scale properties via elemen's `transform`
     * property
     *
     * @ignore Exclude from docs
     */
    AMElement.prototype.transform = function () {
        var transfromString = "translate(" + this._x + "," + this._y + ")";
        if (this._scale != 1) {
            transfromString += ((transfromString ? " " : "") + "scale(" + this._scale + ")");
        }
        if (this._rotation != 0) {
            var rotateString = "rotate(" + this._rotation + ")";
            if (this._rotationX && this._rotationY) {
                rotateString = "rotate(" + this._rotation + " " + this._rotationX + " " + this._rotationY + ")";
            }
            transfromString += ((transfromString ? " " : "") + rotateString);
        }
        this._transformString = transfromString;
        this.node.setAttribute("transform", transfromString);
    };
    /**
     * Returns bounding box of the element.
     *
     * ATTENTION: Bounding box calculations are extremely costly so should be
     * used sparingly and cached whenever possible.
     *
     * @return Bounding rectangle
     */
    AMElement.prototype.getBBox = function () {
        var bbox = {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        };
        // FF would fail if getBBox() is called without node added to parent
        if (this.node && this.node.parentNode) {
            try { // again for ff. TODO: check if this doesn't slow down
                var svgbbox = this.node.getBBox();
                bbox.x = svgbbox.x;
                bbox.y = svgbbox.y;
                bbox.width = svgbbox.width;
                bbox.height = svgbbox.height;
            }
            catch (err) { }
        }
        return bbox;
    };
    /**
     * Moves the element to new coordinates.
     *
     * @param x  Target X
     * @param y  Target Y
     */
    AMElement.prototype.moveTo = function (point) {
        if (point) {
            var x = point.x;
            var y = point.y;
            if (this._x != x || this._y != y) {
                this._x = x;
                this._y = y;
                this.transform();
            }
        }
    };
    Object.defineProperty(AMElement.prototype, "content", {
        /**
         * Returns element's contents as SVG markup.
         *
         * @return Contents
         */
        get: function () {
            // @todo Do not use `innerHTML` as this is not reliable and will not work on all browsers
            return this.node.innerHTML || "";
        },
        /**
         * Element's SVG contents.
         *
         * @param value Contents
         */
        set: function (value) {
            // @todo Do not use `innerHTML` as this is not reliable and will not work on all browsers
            this.node.innerHTML = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMElement.prototype, "textContent", {
        /**
         * @return Text contents
         */
        get: function () {
            return this.node.textContent || "";
        },
        /**
         * Text contents of the SVG element.
         *
         * @param value Text contents
         */
        set: function (value) {
            this.node.textContent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMElement.prototype, "x", {
        /**
         * @return X coordinate (px)
         */
        get: function () {
            return this._x;
        },
        /**
         * Element's X position in pixels.
         *
         * @param value  X coordinate (px)
         */
        set: function (value) {
            if (this._x != value) {
                this._x = value;
                this.transform();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMElement.prototype, "y", {
        /**
         * @return Y coordinate (px)
         */
        get: function () {
            return this._y;
        },
        /**
         * Element's Y position in pixels.
         *
         * @param value Y coordinate (px)
         */
        set: function (value) {
            if (this._y != value) {
                this._y = value;
                this.transform();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMElement.prototype, "rotation", {
        /**
         * @return Rotation
         */
        get: function () {
            return this._rotation;
        },
        /**
         * Element's rotation in degrees.
         *
         * @param value Rotation
         */
        set: function (angle) {
            if (this._rotation != angle) {
                this._rotation = angle;
                this.transform();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMElement.prototype, "rotationX", {
        /**
         * @ignore
         */
        get: function () {
            return this._rotationX;
        },
        /**
         * @ignore
         */
        set: function (x) {
            if (this._rotationX != x) {
                this._rotationX = x;
                this.transform();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMElement.prototype, "rotationY", {
        /**
         * @ignore
         */
        get: function () {
            return this._rotationY;
        },
        /**
         * @ignore
         */
        set: function (y) {
            if (this._rotationY != y) {
                this._rotationY = y;
                this.transform();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMElement.prototype, "scale", {
        /**
         * @return Scale
         */
        get: function () {
            return this._scale;
        },
        /**
         * Element's scale where 1 is original size.
         *
         * Setting to 0.5 will reduce element's size by 50%, 2 will make element
         * twice as large, etc.
         *
         * @param value Scale
         */
        set: function (value) {
            if (this._scale != value) {
                this._scale = value;
                this.transform();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Removes an attribute from element.
     *
     * @param attribute  Attribute to remove
     */
    AMElement.prototype.removeAttr = function (attribute) {
        this.node.removeAttribute(attribute);
    };
    /**
     * Sets a set of attributes on a element.
     *
     * @param attributes  An object with attribute names (key) and values
     * @return The same element
     */
    AMElement.prototype.attr = function (attributes) {
        var _this = this;
        $object.each(attributes, function (attributeName, attributeValue) {
            if (!$type.hasValue(attributeValue)) {
                _this.node.removeAttribute(attributeName);
            }
            else {
                // this is for performance testing
                //if(attributeValue == this.node.getAttribute(attributeName)){
                //	console.log(attributeName, attributeValue)
                //}
                _this.node.setAttribute(attributeName, attributeValue);
            }
        });
        return this;
    };
    /**
     * Returns a value of a node attribute.
     *
     * @param attribute  Attribute name
     * @return Attribute value
     */
    AMElement.prototype.getAttr = function (attribute) {
        return this.node.getAttribute(attribute);
    };
    /**
     * Sets a single attribute of the element's node using namesspace.
     *
     * @param ns         Namespace
     * @param attribute  Attribute
     * @param value      Value
     * @return The same element
     */
    AMElement.prototype.attrNS = function (ns, attribute, value) {
        this.node.setAttributeNS(ns, attribute, value);
        return this;
    };
    /**
     * Returns a namespaced attribute value from node.
     *
     * @param ns         Namespace
     * @param attribute  Attribute
     * @return Attribute value
     */
    AMElement.prototype.getAttrNS = function (ns, attribute) {
        return this.node.getAttributeNS(ns, attribute);
    };
    /**
     * Removes `style` attribute from node.
     *
     * @param attribute  Attribute to remove
     */
    AMElement.prototype.removeStyle = function (attribute) {
        // @todo Review because it's a bit messy and maybe not needed (pratically not used)
        this.node.style[attribute] = null;
        delete this.node.style[attribute];
    };
    /**
     * Returns style attribute value.
     *
     * @param attribute  Style attribute value
     * @return Attribute value
     */
    AMElement.prototype.getStyle = function (attribute) {
        // @todo Review because it's a bit messy and maybe not needed (pratically not used)
        return this.node.style[attribute];
    };
    /**
     * Adds style attributes to element's node.
     *
     * @param attributes  Object containing attribute: value pairs
     * @return The same element
     */
    AMElement.prototype.addStyle = function (attributes) {
        var _this = this;
        // @todo Review because it's a bit messy and maybe not needed (pratically not used)
        $object.each(attributes, function (attributeName, attributeValue) {
            if (!$type.hasValue(attributeValue)) {
                _this.removeStyle(attributeName);
            }
            else {
                _this.node.style[attributeName] = attributeValue;
            }
        });
        return this;
    };
    /**
     * Adds a class to element.
     *
     * @param name  Class name
     */
    AMElement.prototype.addClass = function (name) {
        $dom.addClass(this.node, name);
    };
    /**
     * Removes a class from element.
     *
     * @param name Class name
     */
    AMElement.prototype.removeClass = function (name) {
        $dom.removeClass(this.node, name);
    };
    /**
     * Sets a class name on element.
     *
     * @param name  Class name
     */
    AMElement.prototype.setClass = function (name) {
        this.node.setAttribute("class", name);
    };
    /**
     * Removes all element's child nodes, basically leaving it empty.
     */
    AMElement.prototype.removeChildNodes = function () {
        // remove all children
        while (this.node.childNodes.length > 0) {
            this.node.removeChild(this.node.firstChild);
        }
    };
    /**
     * Was this element already been disposed?
     *
     * @return Disposed?
     */
    AMElement.prototype.isDisposed = function () {
        return this._isDisposed;
    };
    /**
     * Disposes element.
     */
    AMElement.prototype.dispose = function () {
        this.removeNode();
    };
    return AMElement;
}());
export { AMElement };
//# sourceMappingURL=AMElement.js.map