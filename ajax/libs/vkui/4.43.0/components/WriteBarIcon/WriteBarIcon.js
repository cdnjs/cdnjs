import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "count"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon24Send, Icon28AddCircleOutline, Icon28AttachOutline, Icon28CheckCircleOutline, Icon48WritebarDone, Icon48WritebarSend } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform";
import { classNames } from "../../lib/classNames";
import { IOS, Platform } from "../../lib/platform";
import { Counter } from "../Counter/Counter";
import { Tappable } from "../Tappable/Tappable";
import { warnOnce } from "../../lib/warnOnce";
import { hasReactNode } from "../../lib/utils";
var warn = warnOnce("WriteBarIcon");
var IS_DEV = process.env.NODE_ENV === "development";

/**
 * @see https://vkcom.github.io/VKUI/#/WriteBarIcon
 */
export var WriteBarIcon = function WriteBarIcon(_ref) {
  var mode = _ref.mode,
    children = _ref.children,
    count = _ref.count,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var icon;
  var ariaLabel = undefined;
  switch (mode) {
    case "attach":
      icon = platform === IOS ? createScopedElement(Icon28AddCircleOutline, {
        "aria-hidden": true
      }) : createScopedElement(Icon28AttachOutline, {
        "aria-hidden": true
      });
      ariaLabel = "Прикрепить файл";
      break;
    case "send":
      icon = platform === IOS ? createScopedElement(Icon48WritebarSend, {
        "aria-hidden": true
      }) : createScopedElement(Icon24Send, {
        "aria-hidden": true
      });
      ariaLabel = "Отправить";
      break;
    case "done":
      icon = platform === IOS ? createScopedElement(Icon48WritebarDone, {
        "aria-hidden": true
      }) : createScopedElement(Icon28CheckCircleOutline, {
        "aria-hidden": true
      });
      ariaLabel = "Готово";
      break;
    default:
      break;
  }
  if (IS_DEV && !restProps["aria-label"] && !ariaLabel) {
    warn("a11y: У WriteBarIcon нет aria-label. Кнопка будет недоступной для части пользователей.", "error");
  }
  return createScopedElement(Tappable, _extends({
    "aria-label": ariaLabel
  }, restProps, {
    Component: "button",
    hasHover: false,
    activeMode: "WriteBarIcon__active",
    vkuiClass: classNames("WriteBarIcon", platform === Platform.IOS && "WriteBarIcon--ios", !!mode && "WriteBarIcon--".concat(mode))
  }), createScopedElement("span", {
    vkuiClass: "WriteBarIcon__in"
  }, icon || children, hasReactNode(count) && createScopedElement(Counter, {
    vkuiClass: "WriteBarIcon__counter",
    size: "s"
  }, count)));
};
//# sourceMappingURL=WriteBarIcon.js.map