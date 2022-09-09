import { createScopedElement } from "../../../lib/jsxRuntime";
import { Icon28AddOutline } from "@vkontakte/icons";
import { classNamesString } from "../../../lib/classNames";
import { useAppearance } from "../../../hooks/useAppearance";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import { Tappable } from "../../Tappable/Tappable";
var styles = {
  "ImageBaseOverlay": "vkuiImageBaseOverlay",
  "ImageBaseOverlay--visible": "vkuiImageBaseOverlay--visible",
  "ImageBaseOverlay--focus-visible": "vkuiImageBaseOverlay--focus-visible",
  "ImageBaseOverlay--theme-light": "vkuiImageBaseOverlay--theme-light",
  "ImageBaseOverlay--theme-dark": "vkuiImageBaseOverlay--theme-dark"
};

function getRelativeSizeOfIcon(imageSize) {
  if (imageSize <= 20) {
    return 12;
  } else if (imageSize <= 24) {
    return 16;
  } else if (imageSize <= 28) {
    return 18;
  } else if (imageSize <= 40) {
    return 20;
  } else if (imageSize <= 48) {
    return 24;
  } else if (imageSize <= 88) {
    return 28;
  }

  return 32;
}

export var ImageBaseOverlay = function ImageBaseOverlay(_ref) {
  var imageSize = _ref.imageSize,
      className = _ref.className,
      themeProp = _ref.theme,
      visibilityProp = _ref.visibility,
      _ref$Icon = _ref.Icon,
      Icon = _ref$Icon === void 0 ? Icon28AddOutline : _ref$Icon,
      onClick = _ref.onClick;
  var appearance = useAppearance();

  var _useAdaptivity = useAdaptivity(),
      hasMouse = _useAdaptivity.hasMouse;

  var theme = themeProp !== null && themeProp !== void 0 ? themeProp : appearance;
  var visibility = visibilityProp !== null && visibilityProp !== void 0 ? visibilityProp : hasMouse ? "on-hover" : "always";
  var iconSize = getRelativeSizeOfIcon(imageSize);
  return createScopedElement(Tappable, {
    type: "button",
    Component: "button",
    className: classNamesString(styles["ImageBaseOverlay"], visibility === "always" && styles["ImageBaseOverlay--visible"], theme === "light" && styles["ImageBaseOverlay--theme-light"], theme === "dark" && styles["ImageBaseOverlay--theme-dark"], className),
    hasHover: visibility === "on-hover",
    hoverMode: visibility === "on-hover" ? styles["ImageBaseOverlay--visible"] : undefined,
    focusVisibleMode: styles["ImageBaseOverlay--focus-visible"],
    hasActive: false,
    onClick: onClick
  }, createScopedElement(Icon, {
    width: iconSize,
    height: iconSize,
    "aria-hidden": true
  }));
};
//# sourceMappingURL=ImageBaseOverlay.js.map