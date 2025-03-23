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
    getFirstTouchEventData: function() {
        return getFirstTouchEventData;
    },
    getNearestOverflowAncestor: function() {
        return getNearestOverflowAncestor;
    },
    getNodeScroll: function() {
        return _dom.getNodeScroll;
    },
    getRelativeBoundingClientRect: function() {
        return getRelativeBoundingClientRect;
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
    initializeBrowserGesturePreventionEffect: function() {
        return initializeBrowserGesturePreventionEffect;
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
const _jsxruntime = require("react/jsx-runtime");
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
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, _object_spread._({}, props, dom));
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
const getRelativeBoundingClientRect = (parent, child)=>{
    const parentRect = getBoundingClientRect(parent);
    const childRect = getBoundingClientRect(child);
    return (0, _core.rectToClientRect)({
        x: childRect.left - parentRect.left,
        y: childRect.top - parentRect.top,
        width: childRect.width,
        height: childRect.height
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
const getFirstTouchEventData = (event)=>{
    let dataRaw = function resolveData() {
        switch(event.type){
            case 'touchend':
                return event.changedTouches[0];
            case 'touchstart':
            case 'touchmove':
            case 'touchcancel':
                return event.touches[0];
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseleave':
                return event;
            default:
                return {
                    screenX: 0,
                    screenY: 0,
                    clientX: 0,
                    clientY: 0,
                    pageX: 0,
                    pageY: 0
                };
        }
    }();
    /* istanbul ignore if */ if (process.env.NODE_ENV === 'test') {
        dataRaw = dataRaw ? dataRaw : {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0
        };
    }
    return {
        screenX: dataRaw.screenX || 0,
        screenY: dataRaw.screenY || 0,
        clientX: dataRaw.clientX || 0,
        clientY: dataRaw.clientY || 0,
        pageX: dataRaw.pageX || 0,
        pageY: dataRaw.pageY || 0
    };
};
const initializeBrowserGesturePreventionEffect = (window1)=>{
    const options = {
        passive: false
    };
    const handleWindowTouchMove = (event)=>{
        event.preventDefault();
        event.stopPropagation();
    };
    window1.document.documentElement.classList.add('vkui--disable-overscroll-behavior'); // eslint-disable-line no-restricted-properties
    window1.addEventListener('touchmove', handleWindowTouchMove, options);
    return function dispose() {
        window1.document.documentElement.classList.remove('vkui--disable-overscroll-behavior'); // eslint-disable-line no-restricted-properties
        window1.removeEventListener('touchmove', handleWindowTouchMove, options);
    };
};

//# sourceMappingURL=dom.js.map