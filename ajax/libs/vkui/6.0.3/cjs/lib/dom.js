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
    contains: function() {
        return contains;
    },
    getActiveElementByAnotherElement: function() {
        return getActiveElementByAnotherElement;
    },
    getBoundingClientRect: function() {
        return getBoundingClientRect;
    },
    getDOM: function() {
        return getDOM;
    },
    getDocumentBody: function() {
        return getDocumentBody;
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
    isElement: function() {
        return _dom.isElement;
    },
    isHTMLElement: function() {
        return _dom.isHTMLElement;
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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _core = require("@vkontakte/vkui-floating-ui/core");
const _dom = require("@vkontakte/vkui-floating-ui/utils/dom");
const getDOM = ()=>({
        window: _vkjs.canUseDOM ? window : undefined,
        document: _vkjs.canUseDOM ? document : undefined
    });
const DOMContext = /*#__PURE__*/ _react.createContext(getDOM());
const useDOM = ()=>{
    return _react.useContext(DOMContext);
};
const isWindow = (node)=>{
    return node !== null && node !== undefined && 'navigator' in node;
};
const isBody = (node)=>{
    return node !== null && node !== undefined && 'tagName' in node && node.tagName === 'BODY';
};
const isDocumentElement = (node)=>{
    return node !== null && node !== undefined && 'tagName' in node && node.tagName === 'HTML';
};
function withDOM(Component) {
    const WithDOM = (props)=>{
        const dom = useDOM();
        return /*#__PURE__*/ _react.createElement(Component, _object_spread._({}, props, dom));
    };
    return WithDOM;
}
function blurActiveElement(document1) {
    if (document1 && document1.activeElement) {
        document1.activeElement.blur();
    }
}
const TRANSFORM_DEFAULT_VALUES = [
    'none',
    'initial',
    'inherit',
    'unset'
];
const WILL_CHANGE_DEFAULT_VALUES = [
    'auto',
    'initial',
    'inherit',
    'unset'
];
function getTransformedParentCoords(element) {
    let parentNode = element.parentNode;
    while(parentNode !== null){
        if ((0, _dom.isHTMLElement)(parentNode)) {
            const { transform, willChange } = getComputedStyle(parentNode);
            if (!TRANSFORM_DEFAULT_VALUES.includes(transform) || !WILL_CHANGE_DEFAULT_VALUES.includes(willChange)) {
                const { x, y } = parentNode.getBoundingClientRect();
                return {
                    x,
                    y
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
const getBoundingClientRect = (node, isFixedStrategy = false)=>{
    const element = isWindow(node) ? node.document.documentElement : node;
    const clientRect = element.getBoundingClientRect();
    if (isDocumentElement(element)) {
        /**
     * Если на странице не используется `html, body { height: 100% }` (или `height: 100vh`), то
     * `height`, полученный из `document.documentElement.getBoundingClientRect()`, будет возвращать
     * `scrollHeight`, а не `clientHeight`. Поэтому перебиваем `height` на `clientHeight`.
     */ clientRect.height = element.clientHeight;
    }
    let offsetX = 0;
    let offsetY = 0;
    if (isFixedStrategy) {
        const { x, y } = getTransformedParentCoords(element);
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
const getNearestOverflowAncestor = (childEl)=>{
    const foundAncestor = (0, _dom.getNearestOverflowAncestor)(childEl);
    return isBody(foundAncestor) ? (0, _dom.getWindow)(foundAncestor) : (0, _dom.isHTMLElement)(childEl) ? foundAncestor : null;
};
const getScrollHeight = (node)=>{
    return isWindow(node) ? node.document.documentElement.scrollHeight : node.scrollHeight;
};
const getScrollRect = (node)=>{
    const window1 = (0, _dom.isElement)(node) ? (0, _dom.getWindow)(node) : node;
    const scrollElRect = getBoundingClientRect(node);
    const edgeTop = window1.scrollY + scrollElRect.top;
    const edgeBottom = edgeTop + scrollElRect.height;
    const y = [
        edgeTop,
        edgeBottom
    ];
    return {
        relative: scrollElRect,
        edges: {
            y
        }
    };
};
const getDocumentBody = (node)=>(0, _dom.getWindow)(node).document.body;
const getActiveElementByAnotherElement = (el)=>el ? el.ownerDocument.activeElement : null;
const contains = (parent, child)=>{
    return parent && child ? parent.contains(child) : false;
};

//# sourceMappingURL=dom.js.map