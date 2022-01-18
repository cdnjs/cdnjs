"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplitLayout = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _PopoutRoot = require("../PopoutRoot/PopoutRoot");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["popout", "modal", "header", "children", "getRootRef", "getRef"];

var SplitLayout = function SplitLayout(_ref) {
  var popout = _ref.popout,
      modal = _ref.modal,
      header = _ref.header,
      children = _ref.children,
      getRootRef = _ref.getRootRef,
      getRef = _ref.getRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_PopoutRoot.PopoutRoot, {
    vkuiClass: (0, _getClassName.getClassName)('SplitLayout', platform),
    popout: popout,
    modal: modal,
    getRootRef: getRootRef
  }, header, (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: getRef,
    vkuiClass: (0, _classNames.classNames)('SplitLayout__inner', {
      'SplitLayout__inner--header': !!header
    })
  }), children));
};

exports.SplitLayout = SplitLayout;
//# sourceMappingURL=SplitLayout.js.map