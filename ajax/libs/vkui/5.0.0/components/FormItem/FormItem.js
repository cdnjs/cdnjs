import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "top", "bottom", "status", "Component", "removable", "onRemove", "removePlaceholder", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { useExternRef } from "../../hooks/useExternRef";
import { hasReactNode, noop } from "../../lib/utils";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Footnote } from "../Typography/Footnote/Footnote";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { Removable } from "../Removable/Removable";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";

/**
 * @see https://vkcom.github.io/VKUI/#/FormItem
 */
export var FormItem = function FormItem(_ref) {
  var children = _ref.children,
      top = _ref.top,
      bottom = _ref.bottom,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? "default" : _ref$status,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "div" : _ref$Component,
      removable = _ref.removable,
      _ref$onRemove = _ref.onRemove,
      _onRemove = _ref$onRemove === void 0 ? noop : _ref$onRemove,
      _ref$removePlaceholde = _ref.removePlaceholder,
      removePlaceholder = _ref$removePlaceholde === void 0 ? "Удалить" : _ref$removePlaceholde,
      getRootRef = _ref.getRootRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var rootEl = useExternRef(getRootRef);

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var wrappedChildren = createScopedElement(React.Fragment, null, hasReactNode(top) && createScopedElement(Subhead, {
    vkuiClass: "FormItem__top"
  }, top), children, hasReactNode(bottom) && createScopedElement(Footnote, {
    vkuiClass: "FormItem__bottom"
  }, bottom));
  return createScopedElement(Component, _extends({}, restProps, {
    ref: rootEl,
    vkuiClass: classNames("FormItem", "FormItem--status-".concat(status), getSizeYClassName("FormItem", sizeY), hasReactNode(top) && "FormItem--withTop", removable && "FormItem--removable")
  }), removable ? createScopedElement(Removable, {
    align: "start",
    onRemove: function onRemove(e) {
      if (rootEl !== null && rootEl !== void 0 && rootEl.current) {
        _onRemove(e, rootEl.current);
      }
    },
    removePlaceholder: removePlaceholder
  }, createScopedElement("div", {
    vkuiClass: "FormItem__removable"
  }, wrappedChildren)) : wrappedChildren);
};
//# sourceMappingURL=FormItem.js.map