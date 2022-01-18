import _extends from "@babel/runtime/helpers/extends";
import { createScopedElement } from "./jsxRuntime";
import * as React from 'react';
import { canUseDOM } from '@vkontakte/vkjs';
export { canUseDOM, canUseEventListeners, onDOMLoaded } from '@vkontakte/vkjs';

/* eslint-disable no-restricted-globals */
export var getDOM = function getDOM() {
  return {
    window: canUseDOM ? window : null,
    document: canUseDOM ? document : null
  };
};
/* eslint-enable no-restricted-globals */

export var DOMContext = /*#__PURE__*/React.createContext(getDOM());
export var useDOM = function useDOM() {
  return React.useContext(DOMContext);
};
export function withDOM(Component) {
  var WithDOM = function WithDOM(props) {
    var dom = useDOM();
    return createScopedElement(Component, _extends({}, props, dom));
  };

  return WithDOM;
}
export function blurActiveElement(document) {
  if (document && document.activeElement) {
    document.activeElement.blur();
  }
}
//# sourceMappingURL=dom.js.map