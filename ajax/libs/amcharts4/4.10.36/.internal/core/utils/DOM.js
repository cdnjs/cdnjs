/**
 * A collection of DOM-related functions.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Disposer } from "./Disposer";
import { readFrame, writeFrame } from "./AsyncPending";
import { options } from "../Options";
import * as $object from "./Object";
import * as $array from "./Array";
import * as $type from "./Type";
/**
 * SVG namespace.
 *
 * @ignore Exclude from docs
 */
export var SVGNS = "http://www.w3.org/2000/svg";
/**
 * XML namespace.
 *
 * @ignore Exclude from docs
 */
export var XMLNS = "http://www.w3.org/2000/xmlns/";
/**
 * XLINK namespace.
 *
 * @ignore Exclude from docs
 */
export var XLINK = "http://www.w3.org/1999/xlink";
/**
 * Function that adds a disposable event listener directly to a DOM element.
 *
 * @ignore Exclude from docs
 * @param dom       A DOM element to add event to
 * @param type      Event type
 * @param listener  Event listener
 * @returns Disposable event
 */
export function addEventListener(dom, type, listener, options) {
    //@todo proper type check for options: EventListenerOptions | boolean (TS for some reason gives error on passive parameter)
    //console.log(type, dom);
    dom.addEventListener(type, listener, options || false);
    return new Disposer(function () {
        dom.removeEventListener(type, listener, options || false);
    });
}
/**
 * Finds and returns an element reference using following logic:
 * * If we pass in an element instance, we just return it back.
 * * If we pass in a string, the function looks for an element with such id.
 * * If no element with such id is found, we grab the first element with a tag name like this.
 *
 * @ignore Exclude from docs
 * @param el  Element definition (reference, or id, or tag name)
 * @return Element reference
 * @todo Review this function as it seems pretty fuzzy and hacky
 */
export function getElement(el) {
    if ($type.isString(el)) {
        var e = document.getElementById(el);
        if (e == null) {
            e = document.getElementsByClassName(el)[0];
        }
        if (e instanceof HTMLElement) {
            return e;
        }
    }
    else if (el instanceof HTMLElement) {
        return el;
    }
}
/**
 * Adds a class name to an HTML or SVG element.
 *
 * @ignore Exclude from docs
 * @param element    Element
 * @param className  Class name to add
 */
export function addClass(element, className) {
    if (!element) {
        return;
    }
    if (element.classList) {
        var classes = className.split(" ");
        $array.each(classes, function (name) {
            element.classList.add(name);
        });
    }
    else {
        var currentClassName = element.getAttribute("class");
        if (currentClassName) {
            element.setAttribute("class", currentClassName.split(" ").filter(function (item) {
                return item !== className;
            }).join(" ") + " " + className);
        }
        else {
            element.setAttribute("class", className);
        }
        //element.className = element.className.replace(new RegExp("^" + className + "| " + className), "") + " " + className;
    }
}
/**
 * Removes a class name from an HTML or SVG element.
 *
 * @ignore Exclude from docs
 * @param element    Element
 * @param className  Class name to add
 */
export function removeClass(element, className) {
    if (!element) {
        return;
    }
    if (element.classList) {
        element.classList.remove(className);
    }
    else {
        var currentClassName = element.getAttribute("class");
        if (currentClassName) {
            element.setAttribute("class", currentClassName.split(" ").filter(function (item) {
                return item !== className;
            }).join(" "));
        }
        //element.className = element.className.replace(new RegExp("^" + className + "| " + className), "");
    }
}
/**
 * Sets style property on DOM element.
 *
 * @ignore Exclude from docs
 * @todo Still needed?
 */
export function setStyle(element, property, value) {
    element.style[property] = value;
}
/**
 * Gets the computed style value for an element.
 *
 * @ignore Exclude from docs
 */
export function getComputedStyle(element, property) {
    if (element.currentStyle) {
        return element.currentStyle[property];
    }
    return document.defaultView.getComputedStyle(element, null).getPropertyValue(property);
}
/**
 * Removes focus from any element by shifting focus to body.
 *
 * @ignore Exclude from docs
 */
export function blur() {
    if (document.activeElement && document.activeElement != document.body) {
        if (document.activeElement.blur) {
            document.activeElement.blur();
        }
        else {
            var input = document.createElement("button");
            input.style.position = "fixed";
            input.style.top = "0px";
            input.style.left = "-10000px";
            document.body.appendChild(input);
            input.focus();
            input.blur();
            document.body.removeChild(input);
        }
    }
}
/**
 * Tries to focus the element.
 *
 * @ignore Exlude from docs
 * @param element  Element to focus
 */
export function focus(element) {
    if (element instanceof HTMLElement) {
        element.focus();
    }
    else {
        var input = document.createElement("input");
        var fo = document.createElementNS(SVGNS, "foreignObject");
        fo.appendChild(input);
        element.appendChild(fo);
        input.focus();
        input.disabled = true;
        fo.remove();
    }
    /*if ((<any>element).focus != undefined) {
        (<any>element).focus();
    }
    else if (element instanceof SVGSVGElement) {
        // Not implemented
        // @todo implement focus fallback
    }*/
}
/**
 * Returns markup for the element including the element tag itself.
 * SVG elements do not support `outerHTML` so this functions applies of
 * a workaround which creates a new temporary wrapper, clones element and uses
 * wrapper's `innerHTML`.
 *
 * @ignore Exclude from docs
 * @param element  Element to get full markup for
 * @return Markup
 * @deprecated Not in use anywhere
 */
export function outerHTML(element) {
    if (element.outerHTML) {
        return element.outerHTML;
    }
    else {
        var twrap = document.createElement("div");
        var tnode = element.cloneNode(true);
        twrap.appendChild(tnode);
        var content = twrap.innerHTML;
        return content;
    }
}
/**
 * Checks if element is a valid DOM node.
 *
 * @ignore Exclude from docs
 * @param el  Element
 * @return `true` if element is a valid DOM node
 */
export function isElement(el) {
    return el instanceof Object && el && el.nodeType === 1;
}
/**
 * Checks of element `a` contains element `b`.
 *
 * @param a  Aleged ascendant
 * @param b  Aleged descendant
 * @return Contains?
 */
export function contains(a, b) {
    var cursor = b;
    while (true) {
        if (a === cursor) {
            return true;
        }
        else if (cursor.parentNode == null) {
            // TODO better ShadowRoot detection
            if (cursor.host == null) {
                return false;
            }
            else {
                cursor = cursor.host;
            }
        }
        else {
            cursor = cursor.parentNode;
        }
    }
}
/**
 * Returns the shadow root of the element or null
 *
 * @param a  Node
 * @return Root
 */
export function getShadowRoot(a) {
    var cursor = a;
    while (true) {
        if (cursor.parentNode == null) {
            // TODO better ShadowRoot detection
            if (cursor.host != null) {
                return cursor;
            }
            else {
                return null;
            }
        }
        else {
            cursor = cursor.parentNode;
        }
    }
}
/**
 * Returns the root of the element (either the Document or the ShadowRoot)
 *
 * @param a  Node
 * @return Root
 */
export function getRoot(a) {
    // TODO replace with Node.prototype.getRootNode
    var owner = a.ownerDocument;
    var cursor = a;
    while (true) {
        if (cursor.parentNode == null) {
            // If the cursor is the document, or it is a ShadowRoot
            // TODO better ShadowRoot detection
            if (cursor === owner || cursor.host != null) {
                return cursor;
            }
            else {
                return null;
            }
        }
        else {
            cursor = cursor.parentNode;
        }
    }
}
/**
 * Gets the true target of the Event.
 *
 * This is needed to make events work with the shadow DOM.
 *
 * @param event  Event
 * @return EventTarget
 */
export function eventTarget(event) {
    if (typeof event.composedPath === "function") {
        return event.composedPath()[0];
    }
    else {
        return event.target;
    }
}
/**
 * Copies attributes from one element to another.
 *
 * @ignore Exclude from docs
 * @param source  Element to copy attributes from
 * @param target  Element to copy attributes to
 */
export function copyAttributes(source, target) {
    $array.each(source.attributes, function (attr) {
        // TODO what if it's null ?
        if (attr.value != null) {
            target.setAttribute(attr.name, attr.value);
        }
    });
}
/**
 * [fixPixelPerfect description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param el  Element
 */
export function fixPixelPerfect(el) {
    readFrame(function () {
        // sometimes IE doesn't like this
        // TODO figure out a way to remove this
        try {
            var rect = el.getBoundingClientRect();
            var left_1 = rect.left - Math.round(rect.left);
            var top_1 = rect.top - Math.round(rect.top);
            if (left_1 !== 0) {
                writeFrame(function () {
                    el.style.left = left_1 + "px";
                });
            }
            if (top_1 !== 0) {
                writeFrame(function () {
                    el.style.top = top_1 + "px";
                });
            }
        }
        catch (e) { }
    });
}
/**
 * [rootStylesheet description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
var rootStylesheet;
/**
 * [getStylesheet description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @return [description]
 */
function getStylesheet(element) {
    if (element == null) {
        if (!$type.hasValue(rootStylesheet)) {
            // TODO use createElementNS ?
            var e = document.createElement("style");
            e.type = "text/css";
            if (options.nonce != "") {
                e.setAttribute("nonce", options.nonce);
            }
            document.head.appendChild(e);
            rootStylesheet = e.sheet;
        }
        return rootStylesheet;
    }
    else {
        // TODO use createElementNS ?
        var e = document.createElement("style");
        e.type = "text/css";
        if (options.nonce != "") {
            e.setAttribute("nonce", options.nonce);
        }
        element.appendChild(e);
        return e.sheet;
    }
}
/**
 * [makeStylesheet description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param selector  [description]
 * @return [description]
 */
function appendStylesheet(root, selector) {
    var index = root.cssRules.length;
    root.insertRule(selector + "{}", index);
    return root.cssRules[index];
}
/**
 * Defines a class for a CSS rule.
 *
 * Can be used to dynamically add CSS to the document.
 */
var StyleRule = /** @class */ (function (_super) {
    __extends(StyleRule, _super);
    /**
     * Constructor.
     *
     * @param selector  CSS selector
     * @param styles    An object of style attribute - value pairs
     */
    function StyleRule(element, selector, styles) {
        var _this = this;
        var root = getStylesheet(element);
        // TODO test this
        _this = _super.call(this, function () {
            // TODO a bit hacky
            var index = $array.indexOf(root.cssRules, _this._rule);
            if (index === -1) {
                throw new Error("Could not dispose StyleRule");
            }
            else {
                // TODO if it's empty remove it from the DOM ?
                root.deleteRule(index);
            }
        }) || this;
        _this._rule = appendStylesheet(root, selector);
        $object.each(styles, function (key, value) {
            _this.setStyle(key, value);
        });
        return _this;
    }
    Object.defineProperty(StyleRule.prototype, "selector", {
        /**
         * @return CSS selector
         */
        get: function () {
            return this._rule.selectorText;
        },
        /**
         * A CSS selector text.
         *
         * E.g.: `.myClass p`
         *
         * @param selector  CSS selector
         */
        set: function (selector) {
            this._rule.selectorText = selector;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the same style properties with browser-specific prefixes.
     *
     * @param name   Attribute name
     * @param value  Attribute value
     */
    StyleRule.prototype._setVendorPrefixName = function (name, value) {
        var style = this._rule.style;
        style.setProperty("-webkit-" + name, value, "");
        style.setProperty("-moz-" + name, value, "");
        style.setProperty("-ms-" + name, value, "");
        style.setProperty("-o-" + name, value, "");
        style.setProperty(name, value, "");
    };
    /**
     * Sets a value for specific style attribute.
     *
     * @param name   Attribute
     * @param value  Value
     */
    StyleRule.prototype.setStyle = function (name, value) {
        if (name === "transition") {
            this._setVendorPrefixName(name, value);
        }
        else {
            this._rule.style.setProperty(name, value, "");
        }
    };
    return StyleRule;
}(Disposer));
export { StyleRule };
/**
 * An internal counter for unique style ids.
 *
 * @ignore Exclude from docs
 */
var styleId = 0;
/**
 * @ignore Exclude from docs
 * @todo Description
 */
var StyleClass = /** @class */ (function (_super) {
    __extends(StyleClass, _super);
    /**
     * Constructor.
     *
     * @param styles  An object of style attribute - value pairs
     * @param name    Class name
     */
    function StyleClass(element, styles, name) {
        var _this = this;
        var className = (!$type.hasValue(name)
            // TODO generate the classname randomly
            ? "__style_" + (++styleId) + "__"
            : name);
        _this = _super.call(this, element, "." + className, styles) || this;
        _this._className = className;
        return _this;
    }
    Object.defineProperty(StyleClass.prototype, "className", {
        /**
         * @return Class name
         */
        get: function () {
            return this._className;
        },
        /**
         * Class name.
         *
         * @param name  Class name
         */
        set: function (name) {
            this._className = name;
            this.selector = "." + name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts the whole class to
     * @ignore Exclude from docs
     */
    StyleClass.prototype.toString = function () {
        return this._className;
    };
    return StyleClass;
}(StyleRule));
export { StyleClass };
export function ready(f) {
    if (document.readyState !== "loading") {
        f();
    }
    else {
        var listener_1 = function () {
            if (document.readyState !== "loading") {
                document.removeEventListener("readystatechange", listener_1);
                f();
            }
        };
        document.addEventListener("readystatechange", listener_1);
    }
}
/**
 * Returns a font fmaily name for the element (directly set or
 * computed/inherited).
 *
 * @ignore Exclude from docs
 * @param element  Element
 * @return Font family
 */
export function findFont(element) {
    // Check if element has styles set
    var font = getComputedStyle(element, "font-family");
    if (!font) {
        // Completely transparent. Look for a parent
        var parent_1 = element.parentElement || element.parentNode;
        if (parent_1) {
            return findFont(parent_1);
        }
        else {
            return undefined;
        }
    }
    else {
        return font;
    }
}
/**
 * Returns a font fmaily name for the element (directly set or
 * computed/inherited).
 *
 * @ignore Exclude from docs
 * @param element  Element
 * @return Font family
 */
export function findFontSize(element) {
    // Check if element has styles set
    var font = getComputedStyle(element, "font-size");
    if (!font) {
        // Completely transparent. Look for a parent
        var parent_2 = element.parentElement || element.parentNode;
        if (parent_2) {
            return findFontSize(parent_2);
        }
        else {
            return undefined;
        }
    }
    else {
        return font;
    }
}
/**
 * Checks whether element is not visible, whether directly or via its
 * ascendants.
 *
 * @param   element  Target element
 * @return           Hidden?
 */
export function isHidden(element) {
    return (element.offsetParent === null);
}
/**
 * Checks wthether element is in the current viewport.
 *
 * @since 2.5.5
 * @param   el Element
 * @return     Within viewport?
 */
export function isElementInViewport(el, viewportTarget) {
    // Get position data of the element
    var rect = el.getBoundingClientRect();
    // Convert to array
    var targets = $type.isArray(viewportTarget) ? viewportTarget : viewportTarget ? [viewportTarget] : [];
    // Should we measure against specific viewport element?
    if (targets.length) {
        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            // Check if viewport itself is visible
            if (!isElementInViewport(target)) {
                return false;
            }
            // Check if element is visible within the viewport
            var viewportRect = target.getBoundingClientRect();
            if (rect.top >= 0 &&
                rect.left >= 0 &&
                rect.top <= (viewportRect.top + viewportRect.height) &&
                rect.left <= (viewportRect.left + viewportRect.width)) {
                return true;
            }
        }
        return false;
    }
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth));
}
//# sourceMappingURL=DOM.js.map