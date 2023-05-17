import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["header", "description", "children", "separator", "getRootRef", "mode", "padding", "sizeX", "tabIndex"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { IOS } from "../../lib/platform";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { Spacing } from "../Spacing/Spacing";
import { Separator } from "../Separator/Separator";
import { hasReactNode } from "../../lib/utils";
import { Caption } from "../Typography/Caption/Caption";
import { warnOnce } from "../../lib/warnOnce";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import { ModalRootContext } from "../ModalRoot/ModalRootContext";
import "./Group.css";
var warn = warnOnce("TabsItem");
var GroupComponent = function GroupComponent(_ref) {
  var header = _ref.header,
    description = _ref.description,
    children = _ref.children,
    _ref$separator = _ref.separator,
    separator = _ref$separator === void 0 ? "auto" : _ref$separator,
    getRootRef = _ref.getRootRef,
    mode = _ref.mode,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? "m" : _ref$padding,
    sizeX = _ref.sizeX,
    tabIndexProp = _ref.tabIndex,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _React$useContext = React.useContext(ModalRootContext),
    isInsideModal = _React$useContext.isInsideModal;
  var platform = usePlatform();
  var computedMode = mode;
  if (!mode) {
    computedMode = sizeX === SizeType.COMPACT || isInsideModal ? "plain" : "card";
  }
  var isTabPanel = restProps.role === "tabpanel";
  if (process.env.NODE_ENV === "development" && isTabPanel && (!restProps["aria-controls"] || !restProps["id"])) {
    warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
  }
  var tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
  var separatorElement = null;
  if (separator !== "hide") {
    var separatorClassName = classNames("Group__separator", separator === "show" && "Group__separator--force");
    separatorElement = computedMode === "card" ? createScopedElement(Spacing, {
      vkuiClass: separatorClassName,
      size: 16
    }) : createScopedElement(Separator, {
      vkuiClass: separatorClassName
    });
  }
  return createScopedElement(React.Fragment, null, createScopedElement("section", _extends({}, restProps, {
    tabIndex: tabIndex,
    ref: getRootRef,
    vkuiClass: classNames("Group", platform === IOS && "Group--ios", // TODO v5.0.0 Новая адаптивность
    "Group--sizeX-".concat(sizeX), "Group--".concat(computedMode), "Group--padding-".concat(padding))
  }), header, children, hasReactNode(description) && createScopedElement(Caption, {
    vkuiClass: "Group__description"
  }, description)), separatorElement);
};

/**
 * @see https://vkcom.github.io/VKUI/#/Group
 */
export var Group = withAdaptivity(GroupComponent, {
  sizeX: true
});
Group.displayName = "Group";
//# sourceMappingURL=Group.js.map