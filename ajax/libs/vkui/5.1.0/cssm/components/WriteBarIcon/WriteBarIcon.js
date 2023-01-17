import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "count", "className"];
import * as React from 'react';
import { Icon24Send, Icon28AddCircleOutline, Icon28AttachOutline, Icon28CheckCircleOutline, Icon48WritebarDone, Icon48WritebarSend } from '@vkontakte/icons';
import { usePlatform } from '../../hooks/usePlatform';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { Counter } from '../Counter/Counter';
import { Tappable } from '../Tappable/Tappable';
import { warnOnce } from '../../lib/warnOnce';
import "./WriteBarIcon.module.css";
var warn = warnOnce('WriteBarIcon');
var IS_DEV = process.env.NODE_ENV === 'development';

/**
 * @see https://vkcom.github.io/VKUI/#/WriteBarIcon
 */
export var WriteBarIcon = function WriteBarIcon(_ref) {
  var mode = _ref.mode,
    children = _ref.children,
    count = _ref.count,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var icon;
  var ariaLabel = undefined;
  switch (mode) {
    case 'attach':
      icon = platform === Platform.IOS ? /*#__PURE__*/React.createElement(Icon28AddCircleOutline, null) : /*#__PURE__*/React.createElement(Icon28AttachOutline, null);
      ariaLabel = 'Прикрепить файл';
      break;
    case 'send':
      icon = platform === Platform.IOS ? /*#__PURE__*/React.createElement(Icon48WritebarSend, null) : /*#__PURE__*/React.createElement(Icon24Send, null);
      ariaLabel = 'Отправить';
      break;
    case 'done':
      icon = platform === Platform.IOS ? /*#__PURE__*/React.createElement(Icon48WritebarDone, null) : /*#__PURE__*/React.createElement(Icon28CheckCircleOutline, null);
      ariaLabel = 'Готово';
      break;
    default:
      break;
  }
  if (IS_DEV && !restProps['aria-label'] && !ariaLabel) {
    warn('a11y: У WriteBarIcon нет aria-label. Кнопка будет недоступной для части пользователей.', 'error');
  }
  return /*#__PURE__*/React.createElement(Tappable, _extends({
    "aria-label": ariaLabel
  }, restProps, {
    Component: "button",
    hasHover: false,
    activeMode: "vkuiWriteBarIcon__active",
    className: classNames("vkuiWriteBarIcon", platform === Platform.IOS && "vkuiWriteBarIcon--ios", mode && styles["WriteBarIcon--mode-".concat(mode)], className)
  }), /*#__PURE__*/React.createElement("span", {
    className: "vkuiWriteBarIcon__in"
  }, icon || children), hasReactNode(count) && /*#__PURE__*/React.createElement(Counter, {
    className: "vkuiWriteBarIcon__counter",
    size: "s"
  }, count));
};
var styles = {
  "WriteBarIcon--mode-send": "vkuiWriteBarIcon--mode-send",
  "WriteBarIcon--mode-done": "vkuiWriteBarIcon--mode-done",
  "WriteBarIcon--mode-attach": "vkuiWriteBarIcon--mode-attach"
};
//# sourceMappingURL=WriteBarIcon.js.map