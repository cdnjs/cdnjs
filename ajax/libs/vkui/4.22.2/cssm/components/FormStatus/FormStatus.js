import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "header", "children", "dangerouslySetInnerHTML"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import Headline from "../Typography/Headline/Headline";
import Caption from "../Typography/Caption/Caption";
import { hasReactNode } from "../../lib/utils";
import "./FormStatus.css";
export var FormStatus = function FormStatus(_ref) {
  var mode = _ref.mode,
      header = _ref.header,
      children = _ref.children,
      dangerouslySetInnerHTML = _ref.dangerouslySetInnerHTML,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName('FormStatus', platform), "FormStatus--".concat(mode))
  }), hasReactNode(header) && createScopedElement(Headline, {
    weight: "medium",
    vkuiClass: "FormStatus__header"
  }, header), dangerouslySetInnerHTML && createScopedElement(Caption, {
    level: "1",
    weight: "regular",
    dangerouslySetInnerHTML: dangerouslySetInnerHTML
  }), hasReactNode(children) && !dangerouslySetInnerHTML && createScopedElement(Caption, {
    level: "1",
    weight: "regular"
  }, children));
};
//# sourceMappingURL=FormStatus.js.map