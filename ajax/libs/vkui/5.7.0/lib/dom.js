import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import * as React from "react";
import { canUseDOM } from "@vkontakte/vkjs";
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

//# sourceMappingURL=dom.js.map