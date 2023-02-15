import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "top", "bottom", "status", "Component", "removable", "onRemove", "removePlaceholder", "getRootRef", "className"];
import * as React from 'react';
import { classNames, hasReactNode, noop } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Footnote } from '../Typography/Footnote/Footnote';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { Removable } from '../Removable/Removable';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import "./FormItem.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/FormItem
 */
export var FormItem = function FormItem(_ref) {
  var children = _ref.children,
    top = _ref.top,
    bottom = _ref.bottom,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? 'default' : _ref$status,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'div' : _ref$Component,
    removable = _ref.removable,
    _ref$onRemove = _ref.onRemove,
    _onRemove = _ref$onRemove === void 0 ? noop : _ref$onRemove,
    _ref$removePlaceholde = _ref.removePlaceholder,
    removePlaceholder = _ref$removePlaceholde === void 0 ? 'Удалить' : _ref$removePlaceholde,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var rootEl = useExternRef(getRootRef);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var wrappedChildren = /*#__PURE__*/React.createElement(React.Fragment, null, hasReactNode(top) && /*#__PURE__*/React.createElement(Subhead, {
    className: "vkuiFormItem__top"
  }, top), children, hasReactNode(bottom) && /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiFormItem__bottom"
  }, bottom));
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    ref: rootEl,
    className: classNames("vkuiFormItem", status !== 'default' && styles["FormItem--status-".concat(status)], getSizeYClassName("vkuiFormItem", sizeY), hasReactNode(top) && "vkuiFormItem--withTop", removable && "vkuiFormItem--removable", className)
  }), removable ? /*#__PURE__*/React.createElement(Removable, {
    align: "start",
    onRemove: function onRemove(e) {
      if (rootEl !== null && rootEl !== void 0 && rootEl.current) {
        _onRemove(e, rootEl.current);
      }
    },
    removePlaceholder: removePlaceholder
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiFormItem__removable"
  }, wrappedChildren)) : wrappedChildren);
};
var styles = {
  "FormItem--status-error": "vkuiFormItem--status-error",
  "FormItem--status-valid": "vkuiFormItem--status-valid"
};
//# sourceMappingURL=FormItem.js.map