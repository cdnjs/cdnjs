import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children"];
import * as React from 'react';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
import { Icon28DoneOutline } from '@vkontakte/icons';
import { Platform } from '../../lib/platform';
import { usePlatform } from '../../hooks/usePlatform';
import { getTitleFromChildren } from '../../lib/utils';

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