import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import * as React from "react";
import { canUseDOM } from "@vkontakte/vkjs";
import { rectToClientRect } from "@vkontakte/vkui-floating-ui/core";
import { getNearestOverflowAncestor as getNearestOverflowAncestorLib, getWindow, isHTMLElement } from "@vkontakte/vkui-floating-ui/utils/dom";
export { getWindow, getNodeScroll } from "@vkontakte/vkui-floating-ui/utils/dom";
export { canUseDOM, canUseEventListeners, onDOMLoaded } from "@vkontakte/vkjs";
/* eslint-disable no-restricted-globals */ export var getDOM = function() {
    return {
        window: canUseDOM ? window : undefined,
        document: canUseDOM ? document : undefined
    };
};
/* eslint-enable no-restricted-globals */ export var DOMContext = /*#__PURE__*/ React.createContext(getDOM());
export var useDOM = function() {
    return React.useContext(DOMContext);
};
/**
 * В случае, если используется DOMContext, при проверке 'node instanceOf Window' – Window может быть
 * другим объектом.
 */ export var isWindow = function(node) {
    return node !== null && node !== undefined && "navigator" in node;
};
export var isBody = function(node) {
    return node !== null && node !== undefined && "tagName" in node && node.tagName === "BODY";
};
export var isDocumentElement = function(node) {
    return node !== null && node !== undefined && "tagName" in node && node.tagName === "HTML";
};
export function withDOM(Component) {
    var WithDOM = function(props) {
        var dom = useDOM();
        return /*#__PURE__*/ React.createElement(Component, _object_spread({}, props, dom));
    };
    return WithDOM;
}
export function blurActiveElement(document1) {
    if (document1 && document1.activeElement) {
        document1.activeElement.blur();
    }
}
export var TRANSFORM_DEFAULT_VALUES = [
    "none",
    "initial",
    "inherit",
    "unset"
];
export var WILL_CHANGE_DEFAULT_VALUES = [
    "auto",
    "initial",
    "inherit",
    "unset"
];
export function getTransformedParentCoords(element) {
    var parentNode = element.parentNode;
    while(parentNode !== null){
        if (isHTMLElement(parentNode)) {
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
export var getBoundingClientRect = function(node) {
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
    return rectToClientRect({
        x: clientRect.left - offsetX,
        y: clientRect.top - offsetY,
        width: clientRect.width,
        height: clientRect.height
    });
};
/**
 * Адаптер над getNearestOverflowAncestor из @floating-ui/utils/dom.
 *
 * document.body подменяем на window, т.к. на document.body нельзя применить скролл.
 */ export var getNearestOverflowAncestor = function(childEl) {
    var foundAncestor = getNearestOverflowAncestorLib(childEl);
    return isBody(foundAncestor) ? getWindow(foundAncestor) : isHTMLElement(childEl) ? foundAncestor : null;
};
export var getScrollHeight = function(node) {
    return isWindow(node) ? node.document.documentElement.scrollHeight : node.scrollHeight;
};
export var getScrollRect = function(node) {
    var window1 = _instanceof(node, Element) ? getWindow(node) : node;
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