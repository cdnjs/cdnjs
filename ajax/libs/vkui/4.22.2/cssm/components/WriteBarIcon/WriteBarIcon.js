import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "count"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon24Send, Icon28AddCircleOutline, Icon28AttachOutline, Icon28CheckCircleOutline, Icon48WritebarDone, Icon48WritebarSend } from '@vkontakte/icons';
import { usePlatform } from "../../hooks/usePlatform";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { IOS } from "../../lib/platform";
import Counter from "../Counter/Counter";
import Tappable from "../Tappable/Tappable";
import { warnOnce } from "../../lib/warnOnce";
import { hasReactNode } from "../../lib/utils";
import "./WriteBarIcon.css";
var warn = warnOnce('WriteBarIcon');
var IS_DEV = process.env.NODE_ENV === 'development';
export var WriteBarIcon = function WriteBarIcon(_ref) {
  var mode = _ref.mode,
      children = _ref.children,
      count = _ref.count,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var icon;
  var ariaLabel;

  switch (mode) {
    case 'attach':
      icon = platform === IOS ? createScopedElement(Icon28AddCircleOutline, null) : createScopedElement(Icon28AttachOutline, null);
      ariaLabel = 'Прикрепить файл';
      break;

    case 'send':
      icon = platform === IOS ? createScopedElement(Icon48WritebarSend, null) : createScopedElement(Icon24Send, null);
      ariaLabel = 'Отправить';
      break;

    case 'done':
      icon = platform === IOS ? createScopedElement(Icon48WritebarDone, null) : createScopedElement(Icon28CheckCircleOutline, null);
      ariaLabel = 'Готово';
      break;

    default:
      break;
  }

  if (IS_DEV && !restProps['aria-label'] && !ariaLabel) {
    warn('[WriteBarIcon/a11y] У WriteBarIcon нет aria-label. Кнопка будет недоступной для части пользователей.');
  }

  return createScopedElement(Tappable, _extends({
    "aria-label": ariaLabel
  }, restProps, {
    Component: "button",
    hasHover: false,
    activeMode: "WriteBarIcon__active",
    vkuiClass: classNames(getClassName('WriteBarIcon', platform), _defineProperty({}, "WriteBarIcon--".concat(mode), !!mode))
  }), createScopedElement("span", {
    vkuiClass: "WriteBarIcon__in"
  }, icon || children, hasReactNode(count) && createScopedElement(Counter, {
    vkuiClass: "WriteBarIcon__counter",
    size: "s"
  }, count)));
};
//# sourceMappingURL=WriteBarIcon.js.map