import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "mode", "removable", "segmented", "removePlaceholder", "onRemove", "getRootRef", "className"];
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { Removable } from '../Removable/Removable';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import "./FormLayoutGroup.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayoutGroup
 */
export var FormLayoutGroup = function FormLayoutGroup(_ref) {
  var children = _ref.children,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'vertical' : _ref$mode,
    removable = _ref.removable,
    segmented = _ref.segmented,
    _ref$removePlaceholde = _ref.removePlaceholder,
    removePlaceholder = _ref$removePlaceholde === void 0 ? 'Удалить' : _ref$removePlaceholde,
    _ref$onRemove = _ref.onRemove,
    _onRemove = _ref$onRemove === void 0 ? noop : _ref$onRemove,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var isRemovable = removable && mode === 'horizontal';
  var isSegmented = segmented && mode === 'horizontal';
  var rootEl = useExternRef(getRootRef);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: rootEl,
    className: classNames("vkuiFormLayoutGroup", getSizeYClassName("vkuiFormLayoutGroup", sizeY), styles["FormLayoutGroup--mode-".concat(mode)], isRemovable && "vkuiFormLayoutGroup--removable", isSegmented && "vkuiFormLayoutGroup--segmented", className)
  }, restProps), isRemovable ? /*#__PURE__*/React.createElement(Removable, {
    className: "vkuiFormLayoutGroup__removable",
    align: "start",
    removePlaceholder: removePlaceholder,
    onRemove: function onRemove(e) {
      if (rootEl !== null && rootEl !== void 0 && rootEl.current) {
        _onRemove(e, rootEl.current);
      }
    }
  }, children) : /*#__PURE__*/React.createElement(React.Fragment, null, children, /*#__PURE__*/React.createElement("span", {
    className: "vkuiFormLayoutGroup__offset",
    "aria-hidden": true
  })));
};
var styles = {
  "FormLayoutGroup--mode-horizontal": "vkuiFormLayoutGroup--mode-horizontal",
  "FormLayoutGroup--mode-vertical": "vkuiFormLayoutGroup--mode-vertical"
};
//# sourceMappingURL=FormLayoutGroup.js.map