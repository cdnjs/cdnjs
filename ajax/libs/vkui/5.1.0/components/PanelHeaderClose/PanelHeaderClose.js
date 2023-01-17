import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children"];
import * as React from 'react';
import { Icon28CancelOutline } from '@vkontakte/icons';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
import { Platform } from '../../lib/platform';
import { getTitleFromChildren } from '../../lib/utils';
import { usePlatform } from '../../hooks/usePlatform';

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderClose
 */
export var PanelHeaderClose = function PanelHeaderClose(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? 'Отмена' : _ref$children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  return /*#__PURE__*/React.createElement(PanelHeaderButton, _extends({
    "aria-label": getTitleFromChildren(children)
  }, restProps), platform === Platform.IOS ? children : /*#__PURE__*/React.createElement(Icon28CancelOutline, null));
};
//# sourceMappingURL=PanelHeaderClose.js.map