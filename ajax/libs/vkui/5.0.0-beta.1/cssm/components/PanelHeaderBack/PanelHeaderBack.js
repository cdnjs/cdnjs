import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["label", "aria-label"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon28ChevronBack, Icon28ChevronLeftOutline, Icon28ArrowLeftOutline } from "@vkontakte/icons";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
import { Platform } from "../../lib/platform";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { classNames } from "../../lib/classNames";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import "./PanelHeaderBack.css";

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderBack
 */
export var PanelHeaderBack = function PanelHeaderBack(_ref) {
  var label = _ref.label,
      _ref$ariaLabel = _ref["aria-label"],
      ariaLabel = _ref$ariaLabel === void 0 ? "Назад" : _ref$ariaLabel,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeX = _useAdaptivity.sizeX; // так-же label нужно скрывать при platform === Platform.IOS && sizeX === regular
  // https://github.com/VKCOM/VKUI/blob/master/src/components/PanelHeaderButton/PanelHeaderButton.css#L104


  var showLabel = platform === Platform.VKCOM || platform === Platform.IOS;
  var icon = createScopedElement(Icon28ArrowLeftOutline, null);

  switch (platform) {
    case Platform.IOS:
      icon = createScopedElement(Icon28ChevronBack, null);
      break;

    case Platform.VKCOM:
      icon = createScopedElement(Icon28ChevronLeftOutline, null);
      break;
  }

  return createScopedElement(PanelHeaderButton, _extends({}, restProps, {
    vkuiClass: classNames("PanelHeaderBack", getSizeXClassName("PanelHeaderBack", sizeX), platform === Platform.IOS && "PanelHeaderBack--ios", platform === Platform.VKCOM && "PanelHeaderBack--vkcom", showLabel && !!label && "PanelHeaderBack--has-label"),
    label: showLabel && label,
    "aria-label": ariaLabel
  }), icon);
};
//# sourceMappingURL=PanelHeaderBack.js.map