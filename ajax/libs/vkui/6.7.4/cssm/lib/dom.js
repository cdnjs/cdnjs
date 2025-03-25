import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { canUseDOM } from '@vkontakte/vkjs';
import { rectToClientRect } from '@vkontakte/vkui-floating-ui/core';
import { getNearestOverflowAncestor as getNearestOverflowAncestorLib, getWindow, isElement, isHTMLElement } from '@vkontakte/vkui-floating-ui/utils/dom';
export { getWindow, getNodeScroll, isHTMLElement, isElement } from '@vkontakte/vkui-floating-ui/utils/dom';
export { canUseDOM, canUseEventListeners, onDOMLoaded } from '@vkontakte/vkjs';
/* eslint-disable no-restricted-globals */ export const getDOM = ()=>({
        window: canUseDOM ? window : undefined,
        document: canUseDOM ? document : undefined
    });
/* eslint-enable no-restricted-globals */ export const DOMContext = /*#__PURE__*/ React.createContext(getDOM());
export const useDOM = ()=>{
    return React.useContext(DOMContext);
};
/**
 * В случае, если используется DOMContext, при проверке 'node instanceOf Window' – Window может быть
 * другим объектом.
 */ export const isWindow = (node)=>{
    return node !== null && node !== undefined && 'navigator' in node;
};
export const isBody = (node)=>{
    return node !== null && node !== undefined && 'tagName' in node && node.tagName === 'BODY';
};
export const isDocumentElement = (node)=>{
    return node !== null && node !== undefined && 'tagName' in node && node.tagName === 'HTML';
};
export function withDOM(Component) {
    const WithDOM = (props)=>{
        const dom = useDOM();
        return /*#__PURE__*/ _jsx(Component, {
            ...props,
            ...dom
        });
    };
    return WithDOM;
}
export function blurActiveElement(document1) {
    if (document1 && document1.activeElement) {
        document1.activeElement.blur();
    }
}
export const TRANSFORM_DEFAULT_VALUES = [
    'none',
    'initial',
    'inherit',
    'unset'
];
export const WILL_CHANGE_DEFAULT_VALUES = [
    'auto',
    'initial',
    'inherit',
    'unset'
];
export function getTransformedParentCoords(element) {
    let parentNode = element.parentNode;
    while(parentNode !== null){
        if (isHTMLElement(parentNode)) {
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
export const getBoundingClientRect = (node, isFixedStrategy = false)=>{
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
    return rectToClientRect({
        x: clientRect.left - offsetX,
        y: clientRect.top - offsetY,
        width: clientRect.width,
        height: clientRect.height
    });
};
export const getRelativeBoundingClientRect = (parent, child)=>{
    const parentRect = getBoundingClientRect(parent);
    const childRect = getBoundingClientRect(child);
    return rectToClientRect({
        x: childRect.left - parentRect.left,
        y: childRect.top - parentRect.top,
        width: childRect.width,
        height: childRect.height
    });
};
/**
 * Адаптер над getNearestOverflowAncestor из @floating-ui/utils/dom.
 *
 * document.body подменяем на window, т.к. на document.body нельзя применить скролл.
 */ export const getNearestOverflowAncestor = (childEl)=>{
    const foundAncestor = getNearestOverflowAncestorLib(childEl);
    return isBody(foundAncestor) ? getWindow(foundAncestor) : isHTMLElement(childEl) ? foundAncestor : null;
};
export const getScrollHeight = (node)=>{
    return isWindow(node) ? node.document.documentElement.scrollHeight : node.scrollHeight;
};
export const getScrollRect = (node)=>{
    const window1 = isElement(node) ? getWindow(node) : node;
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
export const getDocumentBody = (node)=>getWindow(node).document.body;
export const getActiveElementByAnotherElement = (el)=>el ? el.ownerDocument.activeElement : null;
export const contains = (parent, child)=>{
    return parent && child ? parent.contains(child) : false;
};
export const getFirstTouchEventData = (event)=>{
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
/**
 * ⚠️ В частности, необходимо для iOS 15. Начиная с этой версии в Safari добавили
 * pull-to-refresh. CSS св-во `overflow-behavior` появился только с iOS 16.
 *
 * Во вторую очередь, полезна блокированием скролла, чтобы пользователь дождался обновления
 * данных.
 */ export const initializeBrowserGesturePreventionEffect = (window1)=>{
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