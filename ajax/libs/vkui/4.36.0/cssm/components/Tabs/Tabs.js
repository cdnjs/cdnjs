import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "mode", "getRootRef", "sizeX"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { IOS, VKCOM } from "../../lib/platform";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { warnOnce } from "../../lib/warnOnce";
import "./Tabs.css";
var warn = warnOnce("Tabs");
export var TabsModeContext = /*#__PURE__*/React.createContext({
  mode: "default",
  withGaps: false
});

var TabsComponent = function TabsComponent(_ref) {
  var children = _ref.children,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "default" : _ref$mode,
      getRootRef = _ref.getRootRef,
      sizeX = _ref.sizeX,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  if ((mode === "buttons" || mode === "segmented") && process.env.NODE_ENV === "development") {
    var expectedValueText = mode === "buttons" ? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \"secondary\"" : "компонент SegmentedControl";
    warn("mode=\"".concat(mode, "\" \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u043E \u0438 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u0432 5.0.0. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 ").concat(expectedValueText));
  }

  if (platform !== IOS && mode === "segmented") {
    mode = "default";
  }

  if (mode === "buttons") {
    mode = "secondary";
  }

  var withGaps = mode === "accent" || mode === "secondary";
  return createScopedElement("div", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames("Tabs", (platform === IOS || platform === VKCOM) && "Tabs--".concat(platform), "Tabs--".concat(mode), withGaps && "Tabs--withGaps", // TODO v5.0.0 новая адаптивность
    "Tabs--sizeX-".concat(sizeX))
  }), createScopedElement("div", {
    vkuiClass: "Tabs__in"
  }, createScopedElement(TabsModeContext.Provider, {
    value: {
      mode: mode,
      withGaps: withGaps
    }
  }, children)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */


export var Tabs = withAdaptivity(TabsComponent, {
  sizeX: true
});
Tabs.displayName = "Tabs";
//# sourceMappingURL=Tabs.js.map