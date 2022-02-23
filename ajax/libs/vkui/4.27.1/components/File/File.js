import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "align", "controlSize", "mode", "stretched", "before", "className", "style", "getRef", "getRootRef", "onClick", "appearance"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import Button from "../Button/Button";
import { usePlatform } from "../../hooks/usePlatform";
import { useExternRef } from "../../hooks/useExternRef";

var File = function File(props) {
  var children = props.children,
      align = props.align,
      controlSize = props.controlSize,
      mode = props.mode,
      stretched = props.stretched,
      before = props.before,
      className = props.className,
      style = props.style,
      getRef = props.getRef,
      getRootRef = props.getRootRef,
      _onClick = props.onClick,
      appearance = props.appearance,
      restProps = _objectWithoutProperties(props, _excluded);

  var platform = usePlatform();
  var inputRef = useExternRef(getRef);
  return createScopedElement(Button, {
    align: align,
    vkuiClass: getClassName("File", platform),
    className: className,
    stretched: stretched,
    mode: mode,
    appearance: appearance,
    size: controlSize,
    before: before,
    style: style,
    getRootRef: getRootRef,
    disabled: restProps.disabled,
    type: "button",
    onClick: function onClick(e) {
      var _inputRef$current;

      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.click();
      _onClick && _onClick(e);
    }
  }, createScopedElement("input", _extends({}, restProps, {
    vkuiClass: "File__input",
    type: "file",
    ref: inputRef
  })), children);
};

File.defaultProps = {
  children: "Выберите файл",
  align: "left"
}; // eslint-disable-next-line import/no-default-export

export default File;
//# sourceMappingURL=File.js.map