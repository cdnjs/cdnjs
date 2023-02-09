import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "style", "aside", "status", "before", "children", "onClick"];
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Tappable } from '../Tappable/Tappable';
import { usePlatform } from '../../hooks/usePlatform';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Headline } from '../Typography/Headline/Headline';
import { Platform } from '../../lib/platform';
import { Text } from '../Typography/Text/Text';
var PanelHeaderChildren = function PanelHeaderChildren(_ref) {
  var hasStatus = _ref.hasStatus,
    hasBefore = _ref.hasBefore,
    children = _ref.children;
  var platform = usePlatform();
  if (platform === Platform.VKCOM) {
    return /*#__PURE__*/React.createElement(Text, {
      Component: "div",
      weight: "2"
    }, children);
  }
  return hasStatus || hasBefore ? /*#__PURE__*/React.createElement(Headline, {
    Component: "div",
    weight: "2"
  }, children) : /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContent__children-in"
  }, children);
};

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContent
 */
export var PanelHeaderContent = function PanelHeaderContent(_ref2) {
  var className = _ref2.className,
    style = _ref2.style,
    aside = _ref2.aside,
    status = _ref2.status,
    before = _ref2.before,
    children = _ref2.children,
    onClick = _ref2.onClick,
    restProps = _objectWithoutProperties(_ref2, _excluded);
  var InComponent = onClick ? Tappable : 'div';
  var rootProps = onClick ? {} : restProps;
  var platform = usePlatform();
  var inProps = onClick ? _objectSpread(_objectSpread({}, restProps), {}, {
    onClick: onClick,
    activeEffectDelay: 200,
    hasActive: platform === Platform.IOS,
    activeMode: 'opacity'
  }) : {};
  return /*#__PURE__*/React.createElement("div", _extends({}, rootProps, {
    style: style,
    className: classNames("vkuiPanelHeaderContent", getPlatformClassName("vkuiPanelHeaderContent", platform), className)
  }), hasReactNode(before) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContent__before"
  }, before), /*#__PURE__*/React.createElement(InComponent, _extends({}, inProps, {
    className: classNames("vkuiPanelHeaderContent__in", !before && platform !== Platform.ANDROID && "vkuiPanelHeaderContent__in--centered")
  }), hasReactNode(status) && /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiPanelHeaderContent__status"
  }, status), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContent__children"
  }, /*#__PURE__*/React.createElement(PanelHeaderChildren, {
    hasStatus: hasReactNode(status),
    hasBefore: hasReactNode(before)
  }, children), hasReactNode(aside) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContent__aside"
  }, aside)), hasReactNode(before) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContent__width"
  })));
};
//# sourceMappingURL=PanelHeaderContent.js.map