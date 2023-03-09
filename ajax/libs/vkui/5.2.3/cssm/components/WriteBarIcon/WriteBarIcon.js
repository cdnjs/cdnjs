import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "count", "className"];
import * as React from 'react';
import { Icon24Attach, Icon24CheckCircleOutline, Icon24Send, Icon28AddCircleOutline, Icon28AttachOutline, Icon28CheckCircleOutline, Icon28Send, Icon48WritebarDone, Icon48WritebarSend } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { COMMON_WARNINGS, warnOnce } from '../../lib/warnOnce';
import { Counter } from '../Counter/Counter';
import { Tappable } from '../Tappable/Tappable';
import { WriteBarIconRenderer } from './WriteBarIconRenderer';
import "./WriteBarIcon.module.css";
var warn = warnOnce('WriteBarIcon');

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
  var modeLabel = undefined;
  var predefinedIcons;
  switch (mode) {
    case 'attach':
      predefinedIcons = {
        IconCompact: platform === Platform.IOS ? Icon28AddCircleOutline : Icon24Attach,
        IconRegular: platform === Platform.IOS ? Icon28AddCircleOutline : Icon28AttachOutline
      };
      modeLabel = 'Прикрепить файл';
      break;
    case 'send':
      predefinedIcons = {
        IconCompact: platform === Platform.IOS ? Icon48WritebarSend : Icon24Send,
        IconRegular: platform === Platform.IOS ? Icon48WritebarSend : Icon28Send
      };
      modeLabel = 'Отправить';
      break;
    case 'done':
      predefinedIcons = {
        IconCompact: platform === Platform.IOS ? Icon48WritebarDone : Icon24CheckCircleOutline,
        IconRegular: platform === Platform.IOS ? Icon48WritebarDone : Icon28CheckCircleOutline
      };
      modeLabel = 'Готово';
      break;
    default:
      break;
  }
  if (process.env.NODE_ENV === 'development') {
    var isAccessible = !modeLabel && (!restProps['aria-label'] || restProps['aria-labelledby']);
    if (!isAccessible) {
      warn(COMMON_WARNINGS.a11y['button-name'], 'error');
    }
  }
  return /*#__PURE__*/React.createElement(Tappable, _extends({
    "aria-label": modeLabel
  }, restProps, {
    Component: "button",
    hasHover: false,
    activeMode: "vkuiWriteBarIcon__active",
    className: classNames("vkuiWriteBarIcon", platform === Platform.IOS && "vkuiWriteBarIcon--ios", mode && styles["WriteBarIcon--mode-".concat(mode)], className)
  }), /*#__PURE__*/React.createElement("span", {
    className: "vkuiWriteBarIcon__in"
  }, predefinedIcons ? /*#__PURE__*/React.createElement(WriteBarIconRenderer, predefinedIcons) : children), hasReactNode(count) && /*#__PURE__*/React.createElement(Counter, {
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