import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "separator", "getRef", "className"];
import * as React from 'react';
import { usePlatform } from '../../hooks/usePlatform';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { Platform } from '../../lib/platform';
import { Separator } from '../Separator/Separator';
import { PanelHeader } from '../PanelHeader/PanelHeader';
import { classNames } from '@vkontakte/vkjs';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import "./ModalPageHeader.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPageHeader
 */
export var ModalPageHeader = function ModalPageHeader(_ref) {
  var children = _ref.children,
    _ref$separator = _ref.separator,
    separator = _ref$separator === void 0 ? true : _ref$separator,
    getRef = _ref.getRef,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var hasSeparator = separator && platform === Platform.VKCOM;
  var _useAdaptivityWithJSM = useAdaptivityWithJSMediaQueries(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames("vkuiModalPageHeader", getPlatformClassName("vkuiModalPageHeader", platform), platform !== Platform.VKCOM && "vkuiModalPageHeader--withGaps", isDesktop && "vkuiModalPageHeader--desktop"),
    ref: getRef
  }, /*#__PURE__*/React.createElement(PanelHeader, _extends({
    className: classNames("vkuiModalPageHeader__in", className)
  }, restProps, {
    fixed: false,
    separator: false,
    transparent: true
  }), children), hasSeparator && /*#__PURE__*/React.createElement(Separator, {
    wide: true
  }));
};
//# sourceMappingURL=ModalPageHeader.js.map