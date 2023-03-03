import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["activeStory", "tabbar", "children", "viewWidth"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { withAdaptivity, ViewWidth } from "../../hoc/withAdaptivity";
import { ScrollSaver } from "./ScrollSaver";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { SMALL_TABLET_SIZE } from "../AdaptivityProvider/AdaptivityProvider";
import "./Epic.css";
var warn = warnOnce("Epic");
var EpicComponent = function EpicComponent(_ref) {
  var _ref2;
  var activeStory = _ref.activeStory,
    tabbar = _ref.tabbar,
    children = _ref.children,
    viewWidth = _ref.viewWidth,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var scroll = React.useRef({}).current;
  if (process.env.NODE_ENV === "development" && !tabbar && viewWidth < ViewWidth.SMALL_TABLET) {
    warn("\u041D\u0435 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u0442\u0441\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C Epic \u0431\u0435\u0437 Tabbar \u043F\u0440\u0438 \u0448\u0438\u0440\u0438\u043D\u0435 \u043E\u043A\u043D\u0430 \u043C\u0435\u043D\u044C\u0448\u0435 ".concat(SMALL_TABLET_SIZE, "px"));
  }
  var story = (_ref2 = React.Children.toArray(children).find(function (story) {
    return /*#__PURE__*/React.isValidElement(story) && getNavId(story.props, warn) === activeStory;
  })) !== null && _ref2 !== void 0 ? _ref2 : null;
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: "Epic"
  }), createScopedElement(ScrollSaver, {
    key: activeStory,
    initialScroll: scroll[activeStory] || 0,
    saveScroll: function saveScroll(value) {
      return scroll[activeStory] = value;
    }
  }, story), tabbar);
};

/**
 * @see https://vkcom.github.io/VKUI/#/Epic
 */
export var Epic = withAdaptivity(EpicComponent, {
  viewWidth: true
});
Epic.displayName = "Epic";
//# sourceMappingURL=Epic.js.map