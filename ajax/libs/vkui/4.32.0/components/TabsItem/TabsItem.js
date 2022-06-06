import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "selected", "after"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import Tappable from "../Tappable/Tappable";
import { classNames } from "../../lib/classNames";
import { VKCOM } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import { TabsModeContext } from "../Tabs/Tabs";
import { Headline } from "../Typography/Headline/Headline";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Text } from "../Typography/Text/Text";

/**
 * @see https://vkcom.github.io/VKUI/#/TabsItem
 */
var TabsItem = function TabsItem(_ref) {
  var children = _ref.children,
      selected = _ref.selected,
      after = _ref.after,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var mode = React.useContext(TabsModeContext);
  var ItemTypography = mode === "buttons" || mode === "segmented" ? Subhead : Headline;

  if (platform === VKCOM) {
    ItemTypography = Text;
  }

  return createScopedElement(Tappable, _extends({}, restProps, {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: classNames(getClassName("TabsItem", platform), {
      "TabsItem--selected": selected
    }),
    hasActive: mode === "segmented",
    activeMode: "TabsItem--active",
    focusVisibleMode: mode === "segmented" ? "outside" : "inside"
  }), createScopedElement(ItemTypography, {
    Component: "span",
    vkuiClass: "TabsItem__in",
    weight: "2"
  }, children), hasReactNode(after) && createScopedElement("div", {
    vkuiClass: "TabsItem__after"
  }, after));
};

TabsItem.defaultProps = {
  selected: false
}; // eslint-disable-next-line import/no-default-export

export default TabsItem;
//# sourceMappingURL=TabsItem.js.map