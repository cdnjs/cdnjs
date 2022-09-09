"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoutRoot = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _AppRootPortal = require("../AppRoot/AppRootPortal");

var _dom = require("../../lib/dom");

var _useAdaptivityWithMediaQueries = require("../../hooks/useAdaptivityWithMediaQueries");

var _excluded = ["popout", "modal", "children", "getRootRef"];

var PopoutRoot = function PopoutRoot(_ref) {
  var popout = _ref.popout,
      modal = _ref.modal,
      children = _ref.children,
      getRootRef = _ref.getRootRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  var _useAdaptivityWithMed = (0, _useAdaptivityWithMediaQueries.useAdaptivityWithMediaQueries)(),
      isDesktop = _useAdaptivityWithMed.isDesktop;

  React.useEffect(function () {
    popout && (0, _dom.blurActiveElement)(document);
  }, [document, popout]);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: "PopoutRoot",
    ref: getRootRef
  }), children, (0, _jsxRuntime.createScopedElement)(_AppRootPortal.AppRootPortal, null, !!popout && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: isDesktop ? "PopoutRoot--absolute" : "PopoutRoot__popout"
  }, popout), !!modal && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PopoutRoot__modal"
  }, modal)));
};

exports.PopoutRoot = PopoutRoot;
//# sourceMappingURL=PopoutRoot.js.map