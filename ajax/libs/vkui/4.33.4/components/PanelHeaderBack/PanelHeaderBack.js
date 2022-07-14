import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["label", "sizeX", "aria-label"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Icon28ChevronBack, Icon28ChevronLeftOutline, Icon28ArrowLeftOutline } from "@vkontakte/icons";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
import { ANDROID, VKCOM, IOS } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderBack
 */
export var PanelHeaderBackComponent = function PanelHeaderBackComponent(_ref) {
  var label = _ref.label,
      sizeX = _ref.sizeX,
      _ref$ariaLabel = _ref["aria-label"],
      ariaLabel = _ref$ariaLabel === void 0 ? "Назад" : _ref$ariaLabel,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var showLabel = platform === VKCOM || platform === IOS && sizeX === SizeType.REGULAR;
  return createScopedElement(PanelHeaderButton, _extends({}, restProps, {
    "aria-label": ariaLabel // eslint-disable-next-line vkui/no-object-expression-in-arguments
    ,
    vkuiClass: classNames(getClassName("PanelHeaderBack", platform), {
      "PanelHeaderBack--has-label": showLabel && !!label
    }),
    label: showLabel && label
  }), platform === ANDROID && createScopedElement(Icon28ArrowLeftOutline, null), platform === VKCOM && createScopedElement(Icon28ChevronLeftOutline, null), platform === IOS && createScopedElement(Icon28ChevronBack, null));
};
export var PanelHeaderBack = /*#__PURE__*/React.memo(withAdaptivity(PanelHeaderBackComponent, {
  sizeX: true
}));
PanelHeaderBack.displayName = "PanelHeaderBack";
//# sourceMappingURL=PanelHeaderBack.js.map