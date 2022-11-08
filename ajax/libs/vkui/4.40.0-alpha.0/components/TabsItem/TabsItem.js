import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["before", "children", "status", "after", "selected", "role", "tabIndex"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Tappable } from "../Tappable/Tappable";
import { classNames } from "../../lib/classNames";
import { IOS, VKCOM } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { TabsModeContext } from "../Tabs/Tabs";
import { Headline } from "../Typography/Headline/Headline";
import { Subhead } from "../Typography/Subhead/Subhead";
import { warnOnce } from "../../lib/warnOnce";
var warn = warnOnce("TabsItem");

/**
 * @see https://vkcom.github.io/VKUI/#/TabsItem
 */
export var TabsItem = function TabsItem(_ref) {
  var before = _ref.before,
    children = _ref.children,
    status = _ref.status,
    after = _ref.after,
    _ref$selected = _ref.selected,
    selected = _ref$selected === void 0 ? false : _ref$selected,
    _ref$role = _ref.role,
    role = _ref$role === void 0 ? "tab" : _ref$role,
    tabIndexProp = _ref.tabIndex,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var _React$useContext = React.useContext(TabsModeContext),
    mode = _React$useContext.mode,
    withGaps = _React$useContext.withGaps;
  var statusComponent = null;
  var isTabFlow = role === "tab";
  if (status) {
    statusComponent = typeof status === "number" ? createScopedElement(Subhead, {
      Component: "span",
      vkuiClass: "TabsItem__status TabsItem__status--count",
      weight: "2"
    }, status) : createScopedElement("span", {
      vkuiClass: "TabsItem__status"
    }, status);
  }
  if (process.env.NODE_ENV === "development" && isTabFlow) {
    if (!restProps["aria-controls"]) {
      warn("\u041F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 \u0432 \"aria-controls\" id \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C\u043E\u0433\u043E \u0431\u043B\u043E\u043A\u0430", "warn");
    } else if (!restProps["id"]) {
      warn("\u041F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 \"id\" \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0443 \u0434\u043B\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0432 \"aria-labelledby\" \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C\u043E\u0433\u043E \u0431\u043B\u043E\u043A\u0430", "warn");
    }
  }
  var tabIndex = tabIndexProp;
  if (isTabFlow && tabIndex === undefined) {
    tabIndex = selected ? 0 : -1;
  }
  return createScopedElement(Tappable, _extends({}, restProps, {
    vkuiClass: classNames("TabsItem", (platform === IOS || platform === VKCOM) && "TabsItem--".concat(platform), mode && "TabsItem--".concat(mode), selected && "TabsItem--selected",
    // TODO v5.0.0 новая адаптивность
    sizeY && "TabsItem--sizeY-".concat(sizeY), withGaps && "TabsItem--withGaps"),
    hoverMode: "TabsItem--hover",
    activeMode: "TabsItem--active",
    focusVisibleMode: mode === "segmented" ? "outside" : "inside",
    hasActive: mode === "segmented",
    role: role,
    "aria-selected": selected,
    tabIndex: tabIndex
  }), before && createScopedElement("div", {
    vkuiClass: "TabsItem__before"
  }, before), createScopedElement(Headline, {
    Component: "span",
    vkuiClass: "TabsItem__label",
    level: mode === "default" ? "1" : "2",
    weight: "2"
  }, children), statusComponent, after && createScopedElement("div", {
    vkuiClass: "TabsItem__after"
  }, after), mode === "default" && createScopedElement("div", {
    vkuiClass: "TabsItem__underline",
    "aria-hidden": true,
    "data-selected": selected
  }));
};
//# sourceMappingURL=TabsItem.js.map