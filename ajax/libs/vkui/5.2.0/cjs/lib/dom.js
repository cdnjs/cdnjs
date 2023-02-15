"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMContext = void 0;
exports.blurActiveElement = blurActiveElement;
Object.defineProperty(exports, "canUseDOM", {
  enumerable: true,
  get: function get() {
    return _vkjs.canUseDOM;
  }
});
Object.defineProperty(exports, "canUseEventListeners", {
  enumerable: true,
  get: function get() {
    return _vkjs.canUseEventListeners;
  }
});
exports.getDOM = void 0;
Object.defineProperty(exports, "onDOMLoaded", {
  enumerable: true,
  get: function get() {
    return _vkjs.onDOMLoaded;
  }
});
exports.useDOM = void 0;
exports.withDOM = withDOM;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
/* eslint-disable no-restricted-globals */
var getDOM = function getDOM() {
  return {
    window: _vkjs.canUseDOM ? window : undefined,
    document: _vkjs.canUseDOM ? document : undefined
  };
};
/* eslint-enable no-restricted-globals */
exports.getDOM = getDOM;
var DOMContext = /*#__PURE__*/React.createContext(getDOM());
exports.DOMContext = DOMContext;
var useDOM = function useDOM() {
  return React.useContext(DOMContext);
};
exports.useDOM = useDOM;
function withDOM(Component) {
  var WithDOM = function WithDOM(props) {
    var dom = useDOM();
    return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, props, dom));
  };
  return WithDOM;
}
function blurActiveElement(document) {
  if (document && document.activeElement) {
    document.activeElement.blur();
  }
}
//# sourceMappingURL=dom.js.map