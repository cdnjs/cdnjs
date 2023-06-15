import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ListContext } from './ListContext';
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */
export var List = function List(_ref) {
  var children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isDragging = _React$useState2[0],
    toggleDrag = _React$useState2[1];
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "list"
  }, restProps, {
    className: classNames("vkuiList", isDragging && "vkuiList--dragging", className)
  }), /*#__PURE__*/React.createElement(ListContext.Provider, {
    value: React.useMemo(function () {
      return {
        toggleDrag: toggleDrag
      };
    }, [])
  }, children));
};
//# sourceMappingURL=List.js.map