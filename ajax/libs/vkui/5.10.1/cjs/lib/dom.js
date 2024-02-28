"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DOMContext: function() {
        return DOMContext;
    },
    TRANSFORM_DEFAULT_VALUES: function() {
        return TRANSFORM_DEFAULT_VALUES;
    },
    WILL_CHANGE_DEFAULT_VALUES: function() {
        return WILL_CHANGE_DEFAULT_VALUES;
    },
    blurActiveElement: function() {
        return blurActiveElement;
    },
    canUseDOM: function() {
        return _vkjs.canUseDOM;
    },
    canUseEventListeners: function() {
        return _vkjs.canUseEventListeners;
    },
    getBoundingClientRect: function() {
        return getBoundingClientRect;
    },
    getDOM: function() {
        return getDOM;
    },
    getNearestOverflowAncestor: function() {
        return getNearestOverflowAncestor;
    },
    getNodeScroll: function() {
        return _dom.getNodeScroll;
    },
    getScrollHeight: function() {
        return getScrollHeight;
    },
    getScrollRect: function() {
        return getScrollRect;
    },
    getTransformedParentCoords: function() {
        return getTransformedParentCoords;
    },
    getWindow: function() {
        return _dom.getWindow;
    },
    isBody: function() {
        return isBody;
    },
    isDocumentElement: function() {
        return isDocumentElement;
    },
    isWindow: function() {
        return isWindow;
    },
    onDOMLoaded: function() {
        return _vkjs.onDOMLoaded;
    },
    useDOM: function() {
        return useDOM;
    },
    withDOM: function() {
        return withDOM;
    }
});
var _instanceof = require("@swc/helpers/_/_instanceof");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _core = require("@vkontakte/vkui-floating-ui/core");
var _dom = require("@vkontakte/vkui-floating-ui/utils/dom");
var getDOM = function() {
    return {
        window: _vkjs.canUseDOM ? window : undefined,
        document: _vkjs.canUseDOM ? document : undefined
    };
};
var DOMContext = /*#__PURE__*/ _react.createContext(getDOM());
var useDOM = function() {
    return _react.useContext(DOMContext);
};
var isWindow = function(node) {
    return node !== null && node !== undefined && "navigator" in node;
};
var isBody = function(node) {
    return node !== null && node !== undefined && "tagName" in node && node.tagName === "BODY";
};
var isDocumentElement = function(node) {
    return node !== null && node !== undefined && "tagName" in node && node.tagName === "HTML";
};
function withDOM(Component) {
    var WithDOM = function(props) {
        var dom = useDOM();
        return /*#__PURE__*/ _react.createElement(Component, _object_spread._({}, props, dom));
    };
    return WithDOM;
}
function blurActiveElement(document1) {
    if (document1 && document1.activeElement) {
        document1.activeElement.blur();
    }
}
var TRANSFORM_DEFAULT_VALUES = [
    "none",
    "initial",
    "inherit",
    "unset"
];
var WILL_CHANGE_DEFAULT_VALUES = [
    "auto",
    "initial",
    "inherit",
    "unset"
];
function getTransformedParentCoords(element) {
    var parentNode = element.parentNode;
    while(parentNode !== null){
        if ((0, _dom.isHTMLElement)(parentNode)) {
            var _getComputedStyle = getComputedStyle(parentNode), transform = _getComputedStyle.transform, willChange = _getComputedStyle.willChange;
            if (!TRANSFORM_DEFAULT_VALUES.includes(transform) || !WILL_CHANGE_DEFAULT_VALUES.includes(willChange)) {
                var _parentNode_getBoundingClientRect = parentNode.getBoundingClientRect(), x = _parentNode_getBoundingClientRect.x, y = _parentNode_getBoundingClientRect.y;
                return {
                    x: x,
                    y: y
                };
            }
        }
        parentNode = parentNode.parentNode;
    }
    return {
        x: 0,
        y: 0
    };
}
var getBoundingClientRect = function(node) {
    var isFixedStrategy = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var element = isWindow(node) ? node.document.documentElement : node;
    var clientRect = element.getBoundingClientRect();
    if (isDocumentElement(element)) {
        /**
     * Если на странице не используется `html, body { height: 100% }` (или `height: 100vh`), то
     * `height`, полученный из `document.documentElement.getBoundingClientRect()`, будет возвращать
     * `scrollHeight`, а не `clientHeight`. Поэтому перебиваем `height` на `clientHeight`.
     */ clientRect.height = element.clientHeight;
    }
    var offsetX = 0;
    var offsetY = 0;
    if (isFixedStrategy) {
        var _getTransformedParentCoords = getTransformedParentCoords(element), x = _getTransformedParentCoords.x, y = _getTransformedParentCoords.y;
        offsetX = x;
        offsetY = y;
    }
    return (0, _core.rectToClientRect)({
        x: clientRect.left - offsetX,
        y: clientRect.top - offsetY,
        width: clientRect.width,
        height: clientRect.height
    });
};
var getNearestOverflowAncestor = function(childEl) {
    var foundAncestor = (0, _dom.getNearestOverflowAncestor)(childEl);
    return isBody(foundAncestor) ? (0, _dom.getWindow)(foundAncestor) : (0, _dom.isHTMLElement)(childEl) ? foundAncestor : null;
};
var getScrollHeight = function(node) {
    return isWindow(node) ? node.document.documentElement.scrollHeight : node.scrollHeight;
};
var getScrollRect = function(node) {
    var window1 = _instanceof._(node, Element) ? (0, _dom.getWindow)(node) : node;
    var scrollElRect = getBoundingClientRect(node);
    var edgeTop = window1.scrollY + scrollElRect.top;
    var edgeBottom = edgeTop + scrollElRect.height;
    var y = [
        edgeTop,
        edgeBottom
    ];
    return {
        relative: scrollElRect,
        edges: {
            y: y
        }
    };
};

//# sourceMappingURL=dom.js.map