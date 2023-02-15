import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["getRef", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import "./VisuallyHiddenInput.module.css";
/**
 * @description
 * Обертка над обычным `<input/>`; дает
 * скрыть его визуально и оставить
 * доступным для ассистивных технологий.
 */
export var VisuallyHiddenInput = function VisuallyHiddenInput(_ref) {
  var getRef = _ref.getRef,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("input", _extends({}, restProps, {
    className: classNames("vkuiVisuallyHiddenInput", className),
    ref: getRef
  }));
};
//# sourceMappingURL=VisuallyHiddenInput.js.map