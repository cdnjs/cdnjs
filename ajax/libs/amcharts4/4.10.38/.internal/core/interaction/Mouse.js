/**
 * Mouse-related functionality
 */
/**
 * Defines static methods that hold style list for various mouse cursor styles,
 * maintaining browser compatibility.
 */
var MouseCursorStyle = /** @class */ (function () {
    function MouseCursorStyle() {
    }
    /**
     * Styles for "grab" mouse cursor.
     */
    MouseCursorStyle.grab = [{
            "property": "cursor",
            "value": "move"
        }, {
            "property": "cursor",
            "value": "grab"
        }, {
            "property": "cursor",
            "value": "-webkit-grab"
        }];
    /**
     * Styles for "grabbing" mouse cursor.
     */
    MouseCursorStyle.grabbing = [{
            "property": "cursor",
            "value": "move"
        }, {
            "property": "cursor",
            "value": "grabbing"
        }, {
            "property": "cursor",
            "value": "-webkit-grabbing"
        }];
    /**
     * Styles for "pointer" mouse cursor. (usually used for links)
     */
    MouseCursorStyle.pointer = [{
            "property": "cursor",
            "value": "pointer"
        }];
    /**
     * Styles for default mouse cursor. (browser determines style)
     */
    MouseCursorStyle.default = [{
            "property": "cursor",
            "value": "default"
        }];
    /**
     * Styles for horizontal bi-directional resize mouse cursor.
     */
    MouseCursorStyle.horizontalResize = [{
            "property": "cursor",
            "value": "ew-resize"
        }];
    /**
     * Styles for vertical bi-directional mouse cursor.
     */
    MouseCursorStyle.verticalResize = [{
            "property": "cursor",
            "value": "ns-resize"
        }];
    /**
     * Styles for "no-allowed" cursor.
     * @since 4.7.15
     */
    MouseCursorStyle.notAllowed = [{
            "property": "cursor",
            "value": "not-allowed"
        }];
    /**
     * Styles for "text" cursor.
     * @since 4.9.12
     */
    MouseCursorStyle.text = [{
            "property": "cursor",
            "value": "text"
        }];
    return MouseCursorStyle;
}());
export { MouseCursorStyle };
//# sourceMappingURL=Mouse.js.map