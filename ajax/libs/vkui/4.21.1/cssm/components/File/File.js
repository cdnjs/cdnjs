import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "align", "controlSize", "mode", "stretched", "before", "className", "style", "getRef", "getRootRef", "onClick"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import Button from "../Button/Button";
import { usePlatform } from "../../hooks/usePlatform";
import { useExternRef } from "../../hooks/useExternRef";
import "./File.css";

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
      restProps = _objectWithoutProperties(props, _excluded);

  var platform = usePlatform();
  var inputRef = useExternRef(getRef);
  return createScopedElement(Button, {
    align: align,
    vkuiClass: getClassName('File', platform),
    className: className,
    stretched: stretched,
    mode: mode,
    size: controlSize,
    before: before,
    style: style,
    getRootRef: getRootRef,
    disabled: restProps.disabled,
    type: "button",
    onClick: function onClick(e) {
      inputRef.current.click();
      _onClick && _onClick(e);
    }
  }, createScopedElement("input", _extends({}, restProps, {
    vkuiClass: "File__input",
    type: "file",
    ref: inputRef
  })), children);
};

File.defaultProps = {
  children: 'Выберите файл',
  align: 'left'
};
export default File;
//# sourceMappingURL=File.js.map