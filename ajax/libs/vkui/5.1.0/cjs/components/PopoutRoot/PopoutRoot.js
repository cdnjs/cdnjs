"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoutRoot = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _AppRootPortal = require("../AppRoot/AppRootPortal");
var _dom = require("../../lib/dom");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _excluded = ["popout", "modal", "children", "getRootRef", "className"];
var PopoutRootPopout = function PopoutRootPopout(_ref) {
  var children = _ref.children;
  var _useAdaptivityWithJSM = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)("vkuiPopoutRoot__popout", isDesktop && "vkuiPopoutRoot__popout--absolute")
  }, children);
};
var PopoutRootModal = function PopoutRootModal(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopoutRoot__modal"
  }, children);
};
var PopoutRoot = function PopoutRoot(_ref3) {
  var popout = _ref3.popout,
    modal = _ref3.modal,
    children = _ref3.children,
    getRootRef = _ref3.getRootRef,
    className = _ref3.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref3, _excluded);
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  React.useEffect(function () {
    popout && (0, _dom.blurActiveElement)(document);
  }, [document, popout]);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiPopoutRoot", className),
    ref: getRootRef
  }), children, /*#__PURE__*/React.createElement(_AppRootPortal.AppRootPortal, null, !!popout && /*#__PURE__*/React.createElement(PopoutRootPopout, null, popout), !!modal && /*#__PURE__*/React.createElement(PopoutRootModal, null, modal)));
};
exports.PopoutRoot = PopoutRoot;
//# sourceMappingURL=PopoutRoot.js.map