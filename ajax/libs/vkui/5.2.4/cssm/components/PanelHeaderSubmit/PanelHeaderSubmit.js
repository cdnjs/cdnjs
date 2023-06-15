import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children"];
import * as React from 'react';
import { Icon28DoneOutline } from '@vkontakte/icons';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { getTitleFromChildren } from '../../lib/utils';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderSubmit
 */
export var PanelHeaderSubmit = function PanelHeaderSubmit(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? 'Готово' : _ref$children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  return /*#__PURE__*/React.createElement(PanelHeaderButton, _extends({
    "aria-label": getTitleFromChildren(children),
    primary: true
  }, restProps), platform === Platform.IOS ? children : /*#__PURE__*/React.createElement(Icon28DoneOutline, null));
};
//# sourceMappingURL=PanelHeaderSubmit.js.map