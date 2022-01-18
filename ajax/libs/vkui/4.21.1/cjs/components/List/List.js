"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _ListContext = require("./ListContext");

var _excluded = ["children"];

var List = function List(_ref) {
  var children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      isDragging = _React$useState2[0],
      toggleDrag = _React$useState2[1];

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    role: "list"
  }, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('List', platform), {
      'List--dragging': isDragging
    })
  }), (0, _jsxRuntime.createScopedElement)(_ListContext.ListContext.Provider, {
    value: React.useMemo(function () {
      return {
        toggleDrag: toggleDrag
      };
    }, [])
  }, children));
};

var _default = List;
exports.default = _default;
//# sourceMappingURL=List.js.map