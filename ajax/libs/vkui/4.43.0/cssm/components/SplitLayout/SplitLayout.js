import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["popout", "modal", "header", "children", "getRootRef", "getRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { IOS } from "../../lib/platform";
import { PopoutRoot } from "../PopoutRoot/PopoutRoot";
import { usePlatform } from "../../hooks/usePlatform";
import "./SplitLayout.css";
/**
 * @see https://vkcom.github.io/VKUI/#/SplitLayout
 */
export var SplitLayout = function SplitLayout(_ref) {
  var popout = _ref.popout,
    modal = _ref.modal,
    header = _ref.header,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  return createScopedElement(PopoutRoot, {
    vkuiClass: classNames("SplitLayout", platform === IOS && "SplitLayout--ios"),
    popout: popout,
    modal: modal,
    getRootRef: getRootRef
  }, header, createScopedElement("div", _extends({}, restProps, {
    ref: getRef,
    vkuiClass: classNames("SplitLayout__inner", !!header && "SplitLayout__inner--header")
  }), children));
};
//# sourceMappingURL=SplitLayout.js.map