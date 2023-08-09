import * as React from 'react';
import { canUseDOM } from '@vkontakte/vkjs';
export { canUseDOM, canUseEventListeners, onDOMLoaded } from '@vkontakte/vkjs';
/* eslint-disable no-restricted-globals */ export const getDOM = ()=>({
        window: canUseDOM ? window : undefined,
        document: canUseDOM ? document : undefined
    });
/* eslint-enable no-restricted-globals */ export const DOMContext = /*#__PURE__*/ React.createContext(getDOM());
export const useDOM = ()=>{
    return React.useContext(DOMContext);
};
export function withDOM(Component) {
    const WithDOM = (props)=>{
        const dom = useDOM();
        return /*#__PURE__*/ React.createElement(Component, {
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

//# sourceMappingURL=dom.js.map