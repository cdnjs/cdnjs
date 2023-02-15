import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["onDragStart", "onDragMove", "onDragEnd", "className"];
import * as React from 'react';
import { Icon24Reorder, Icon24ReorderIos } from '@vkontakte/icons';
import { getPlatformClassName } from '../../../helpers/getPlatformClassName';
import { usePlatform } from '../../../hooks/usePlatform';
import { classNames } from '@vkontakte/vkjs';
import { Platform } from '../../../lib/platform';
import { Touch } from '../../Touch/Touch';
import "./CellDragger.module.css";
export var CellDragger = function CellDragger(_ref) {
  var onDragStart = _ref.onDragStart,
    onDragMove = _ref.onDragMove,
    onDragEnd = _ref.onDragEnd,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var onClick = React.useCallback(function (e) {
    e.preventDefault();
  }, []);
  return /*#__PURE__*/React.createElement(Touch, _extends({
    className: classNames("vkuiCellDragger", getPlatformClassName("vkuiCellDragger", platform), className),
    onStart: onDragStart,
    onMoveY: onDragMove,
    onEnd: onDragEnd,
    onClick: onClick
  }, restProps), platform === Platform.IOS ? /*#__PURE__*/React.createElement(Icon24ReorderIos, null) : /*#__PURE__*/React.createElement(Icon24Reorder, null));
};
//# sourceMappingURL=CellDragger.js.map