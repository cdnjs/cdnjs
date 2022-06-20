import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "align", "controlSize", "size", "mode", "stretched", "before", "className", "style", "getRef", "getRootRef", "appearance"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { Button } from "../Button/Button";
import { usePlatform } from "../../hooks/usePlatform";
import { VisuallyHiddenInput } from "../VisuallyHiddenInput/VisuallyHiddenInput";

/**
 * @see https://vkcom.github.io/VKUI/#/File
 */
export var File = function File(_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === void 0 ? "Выберите файл" : _ref$children,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? "left" : _ref$align,
      controlSize = _ref.controlSize,
      size = _ref.size,
      mode = _ref.mode,
      stretched = _ref.stretched,
      before = _ref.before,
      className = _ref.className,
      style = _ref.style,
      getRef = _ref.getRef,
      getRootRef = _ref.getRootRef,
      appearance = _ref.appearance,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(Button, {
    Component: "label",
    align: align,
    vkuiClass: getClassName("File", platform),
    className: className,
    stretched: stretched,
    mode: mode,
    appearance: appearance // TODO: v5.0.0 удалить controlSize
    ,
    size: size !== null && size !== void 0 ? size : controlSize,
    before: before,
    style: style,
    getRootRef: getRootRef,
    disabled: restProps.disabled
  }, createScopedElement(VisuallyHiddenInput, _extends({}, restProps, {
    vkuiClass: "File__input",
    type: "file",
    getRef: getRef
  })), children);
};
//# sourceMappingURL=File.js.map