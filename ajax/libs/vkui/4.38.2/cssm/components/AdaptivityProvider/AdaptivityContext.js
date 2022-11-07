import * as React from "react";
import { hasHover, hasMouse } from "@vkontakte/vkjs";
export var SizeType;

(function (SizeType) {
  SizeType["COMPACT"] = "compact";
  SizeType["REGULAR"] = "regular";
})(SizeType || (SizeType = {}));

export var ViewWidth;

(function (ViewWidth) {
  ViewWidth[ViewWidth["SMALL_MOBILE"] = 1] = "SMALL_MOBILE";
  ViewWidth[ViewWidth["MOBILE"] = 2] = "MOBILE";
  ViewWidth[ViewWidth["SMALL_TABLET"] = 3] = "SMALL_TABLET";
  ViewWidth[ViewWidth["TABLET"] = 4] = "TABLET";
  ViewWidth[ViewWidth["DESKTOP"] = 5] = "DESKTOP";
})(ViewWidth || (ViewWidth = {}));

export var ViewHeight;

(function (ViewHeight) {
  ViewHeight[ViewHeight["EXTRA_SMALL"] = 1] = "EXTRA_SMALL";
  ViewHeight[ViewHeight["SMALL"] = 2] = "SMALL";
  ViewHeight[ViewHeight["MEDIUM"] = 3] = "MEDIUM";
})(ViewHeight || (ViewHeight = {}));

export var AdaptivityContext = /*#__PURE__*/React.createContext({
  sizeX: SizeType.COMPACT,
  sizeY: SizeType.REGULAR,
  hasMouse: hasMouse,
  deviceHasHover: hasHover,
  viewWidth: 0,
  viewHeight: 0
});
//# sourceMappingURL=AdaptivityContext.js.map