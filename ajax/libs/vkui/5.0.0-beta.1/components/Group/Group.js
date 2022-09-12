import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["header", "description", "children", "separator", "getRootRef", "mode", "padding"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Platform } from "../../lib/platform";
import { classNames, classNamesString } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { Spacing } from "../Spacing/Spacing";
import { Separator } from "../Separator/Separator";
import { hasReactNode } from "../../lib/utils";
import { Footnote } from "../Typography/Footnote/Footnote";
import { ModalRootContext } from "../ModalRoot/ModalRootContext";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";

/**
 * @see https://vkcom.github.io/VKUI/#/Group
 */
export var Group = function Group(props) {
  var header = props.header,
      description = props.description,
      children = props.children,
      _props$separator = props.separator,
      separator = _props$separator === void 0 ? "auto" : _props$separator,
      getRootRef = props.getRootRef,
      modeProps = props.mode,
      _props$padding = props.padding,
      padding = _props$padding === void 0 ? "m" : _props$padding,
      restProps = _objectWithoutProperties(props, _excluded);

  var _React$useContext = React.useContext(ModalRootContext),
      isInsideModal = _React$useContext.isInsideModal;

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeX = _useAdaptivity.sizeX;

  var mode = modeProps;

  if (!modeProps) {
    // Подробнее в "none" можно прочитать в ADAPTIVITY_GUIDE.md
    mode = isInsideModal ? "plain" : "none";
  }

  var separatorClassName = classNamesString("Group__separator", separator === "show" && "Group__separator--force");
  return createScopedElement("section", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames("Group", platform === Platform.IOS && "Group--ios", getSizeXClassName("Group", sizeX), mode && "Group--mode-".concat(mode), "Group--padding-".concat(padding))
  }), createScopedElement("div", {
    vkuiClass: "Group__inner"
  }, header, children, hasReactNode(description) && createScopedElement(Footnote, {
    vkuiClass: "Group__description"
  }, description)), separator !== "hide" && createScopedElement(React.Fragment, null, createScopedElement(Spacing, {
    vkuiClass: classNames(separatorClassName, "Group__separator--spacing"),
    size: 16
  }), createScopedElement(Separator, {
    vkuiClass: classNames(separatorClassName, "Group__separator--separator")
  })));
};
//# sourceMappingURL=Group.js.map