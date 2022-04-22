"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _HoverPopper = require("../HoverPopper/HoverPopper");

var _ClickPopper = require("../ClickPopper/ClickPopper");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["action", "hideDelay", "showDelay"];

var Dropdown = function Dropdown(_ref) {
  var _ref$action = _ref.action,
      action = _ref$action === void 0 ? "click" : _ref$action,
      hideDelay = _ref.hideDelay,
      showDelay = _ref.showDelay,
      popperProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var Component;
  var actionSpecificProps = {};

  switch (action) {
    case "click":
      Component = _ClickPopper.ClickPopper;
      break;

    case "hover":
      actionSpecificProps = {
        hideDelay: hideDelay,
        showDelay: showDelay
      };
      Component = _HoverPopper.HoverPopper;
      break;
  }

  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({
    vkuiClass: (0, _getClassName.getClassName)("Dropdown", platform)
  }, actionSpecificProps, popperProps));
};

exports.Dropdown = Dropdown;
//# sourceMappingURL=Dropdown.js.map