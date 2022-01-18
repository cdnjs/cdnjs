"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SSRWrapper = exports.SSRContext = void 0;

var _jsxRuntime = require("./jsxRuntime");

var React = _interopRequireWildcard(require("react"));

var _platform = require("./platform");

var _browser = require("./browser");

var _dom = require("../lib/dom");

var SSRContext = /*#__PURE__*/React.createContext({
  platform: null,
  userAgent: '',
  browserInfo: undefined
});
exports.SSRContext = SSRContext;

var SSRWrapper = function SSRWrapper(props) {
  var userAgent = props.userAgent,
      browserInfo = props.browserInfo,
      children = props.children;

  if (!browserInfo && userAgent) {
    browserInfo = (0, _browser.computeBrowserInfo)(userAgent);
  } // TODO: Каждый раз создаётся новый объект для контекста – плохо


  var contextValue = {
    platform: (0, _platform.platform)(browserInfo),
    browserInfo: browserInfo,
    userAgent: userAgent
  }; // TODO: move to state, and update in effect?

  var dom = (0, _dom.getDOM)();
  return (0, _jsxRuntime.createScopedElement)(SSRContext.Provider, {
    value: contextValue
  }, (0, _jsxRuntime.createScopedElement)(_dom.DOMContext.Provider, {
    value: dom
  }, children));
};

exports.SSRWrapper = SSRWrapper;
//# sourceMappingURL=SSR.js.map