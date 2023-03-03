import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "header", "children", "dangerouslySetInnerHTML"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { Headline } from "../Typography/Headline/Headline";
import { Caption } from "../Typography/Caption/Caption";
import { hasReactNode } from "../../lib/utils";
/* TODO: v5.0.0 удалить */

/**
 * @deprecated Этот компонент устарел и будет удален в v5.0.0. Используйте [`Banner`](#/Banner).
 * @see https://vkcom.github.io/VKUI/#/FormStatus
 */
export var FormStatus = function FormStatus(_ref) {
  var mode = _ref.mode,
    header = _ref.header,
    children = _ref.children,
    dangerouslySetInnerHTML = _ref.dangerouslySetInnerHTML,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames("FormStatus", "FormStatus--".concat(mode))
  }), hasReactNode(header) && createScopedElement(Headline, {
    weight: "2",
    vkuiClass: "FormStatus__header"
  }, header), dangerouslySetInnerHTML && createScopedElement(Caption, {
    dangerouslySetInnerHTML: dangerouslySetInnerHTML
  }), hasReactNode(children) && !dangerouslySetInnerHTML && createScopedElement(Caption, null, children));
};
//# sourceMappingURL=FormStatus.js.map