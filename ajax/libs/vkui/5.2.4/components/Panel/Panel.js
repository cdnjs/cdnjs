import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["centered", "children", "getRootRef", "nav", "className"];
var _sizeXClassNames;
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { TooltipContainer } from '../Tooltip/TooltipContainer';
import { Touch } from '../Touch/Touch';
var sizeXClassNames = (_sizeXClassNames = {
  none: "vkuiPanel--sizeX-none"
}, _defineProperty(_sizeXClassNames, SizeType.COMPACT, "vkuiPanel--sizeX-compact"), _defineProperty(_sizeXClassNames, SizeType.REGULAR, "vkuiPanel--sizeX-regular"), _sizeXClassNames);
/**
 * @see https://vkcom.github.io/VKUI/#/Panel
 */
export var Panel = function Panel(_ref) {
  var _ref$centered = _ref.centered,
    centered = _ref$centered === void 0 ? false : _ref$centered,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    nav = _ref.nav,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    _useAdaptivity$sizeX = _useAdaptivity.sizeX,
    sizeX = _useAdaptivity$sizeX === void 0 ? 'none' : _useAdaptivity$sizeX;
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    ref: getRootRef,
    className: classNames("vkuiPanel", sizeXClassNames[sizeX], centered && "vkuiPanel--centered", className)
  }), /*#__PURE__*/React.createElement(Touch, {
    Component: TooltipContainer,
    className: "vkuiPanel__in"
  }, platform === Platform.IOS && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanel__fade"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanel__in-before"
  }), centered ? /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanel__centered"
  }, children) : children, /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanel__in-after"
  })));
};
//# sourceMappingURL=Panel.js.map