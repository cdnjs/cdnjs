import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["before", "children", "status", "after", "selected"];
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
import "./TabsItem.css";

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
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var _React$useContext = React.useContext(TabsModeContext),
      mode = _React$useContext.mode,
      withGaps = _React$useContext.withGaps;

  var statusComponent = null;

  if (status) {
    statusComponent = typeof status === "number" ? createScopedElement(Subhead, {
      Component: "span",
      vkuiClass: "TabsItem__status TabsItem__status--count",
      weight: "2"
    }, status) : createScopedElement("span", {
      vkuiClass: "TabsItem__status"
    }, status);
  }

  return createScopedElement(Tappable, _extends({}, restProps, {
    vkuiClass: classNames("TabsItem", (platform === IOS || platform === VKCOM) && "TabsItem--".concat(platform), mode && "TabsItem--".concat(mode), selected && "TabsItem--selected", // TODO v5.0.0 новая адаптивность
    sizeY && "TabsItem--sizeY-".concat(sizeY), withGaps && "TabsItem--withGaps"),
    hoverMode: "TabsItem--hover",
    activeMode: "TabsItem--active",
    focusVisibleMode: mode === "segmented" ? "outside" : "inside",
    hasActive: mode === "segmented"
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