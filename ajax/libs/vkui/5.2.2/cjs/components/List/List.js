"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _ListContext = require("./ListContext");
var _excluded = ["children", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */
var List = function List(_ref) {
  var children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    isDragging = _React$useState2[0],
    toggleDrag = _React$useState2[1];
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    role: "list"
  }, restProps, {
    className: (0, _vkjs.classNames)("vkuiList", isDragging && "vkuiList--dragging", className)
  }), /*#__PURE__*/React.createElement(_ListContext.ListContext.Provider, {
    value: React.useMemo(function () {
      return {
        toggleDrag: toggleDrag
      };
    }, [])
  }, children));
};
exports.List = List;
//# sourceMappingURL=List.js.map