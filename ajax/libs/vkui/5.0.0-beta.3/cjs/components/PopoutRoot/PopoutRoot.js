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
var _classNames = require("../../lib/classNames");
var _AppRootPortal = require("../AppRoot/AppRootPortal");
var _dom = require("../../lib/dom");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _excluded = ["popout", "modal", "children", "getRootRef", "className"];
var PopoutRoot = function PopoutRoot(_ref) {
  var popout = _ref.popout,
    modal = _ref.modal,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  var _useAdaptivityWithJSM = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  React.useEffect(function () {
    popout && (0, _dom.blurActiveElement)(document);
  }, [document, popout]);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _classNames.classNamesString)("vkuiPopoutRoot", className),
    ref: getRootRef
  }), children, /*#__PURE__*/React.createElement(_AppRootPortal.AppRootPortal, null, !!popout && /*#__PURE__*/React.createElement("div", {
    className: isDesktop ? "vkuiPopoutRoot--absolute" : "vkuiPopoutRoot__popout"
  }, popout), !!modal && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopoutRoot__modal"
  }, modal)));
};
exports.PopoutRoot = PopoutRoot;
//# sourceMappingURL=PopoutRoot.js.map