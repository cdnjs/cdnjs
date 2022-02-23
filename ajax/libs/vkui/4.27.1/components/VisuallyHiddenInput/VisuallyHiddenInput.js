import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["getRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { useExternRef } from "../../hooks/useExternRef";

/**
 * @description
 * Обертка над обычным `<input/>`; дает
 * скрыть его визуально и оставить
 * доступным для ассистивных технологий.
 */
export var VisuallyHiddenInput = function VisuallyHiddenInput(_ref) {
  var getRef = _ref.getRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var inputRef = useExternRef(getRef);
  return createScopedElement("input", _extends({}, restProps, {
    vkuiClass: "VisuallyHiddenInput",
    ref: inputRef
  }));
};
//# sourceMappingURL=VisuallyHiddenInput.js.map