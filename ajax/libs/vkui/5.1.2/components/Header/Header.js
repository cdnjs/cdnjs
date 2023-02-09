import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode"],
  _excluded2 = ["mode", "children", "subtitle", "indicator", "aside", "getRootRef", "multiline", "className"];
import * as React from 'react';
import { classNames, hasReactNode, isPrimitiveReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { Headline } from '../Typography/Headline/Headline';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Title } from '../Typography/Title/Title';
import { Text } from '../Typography/Text/Text';
import { Subhead } from '../Typography/Subhead/Subhead';
var HeaderContent = function HeaderContent(_ref) {
  var mode = _ref.mode,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  if (platform === Platform.IOS) {
    switch (mode) {
      case 'primary':
      case 'tertiary':
        return /*#__PURE__*/React.createElement(Title, _extends({
          weight: "1",
          level: "3"
        }, restProps));
      case 'secondary':
        return /*#__PURE__*/React.createElement(Footnote, _extends({
          weight: "2",
          caps: true
        }, restProps));
    }
  }
  if (platform === Platform.VKCOM) {
    switch (mode) {
      case 'primary':
        return /*#__PURE__*/React.createElement(Headline, _extends({
          weight: "3"
        }, restProps));
      case 'secondary':
      case 'tertiary':
        return /*#__PURE__*/React.createElement(Footnote, restProps);
    }
  }
  switch (mode) {
    case 'primary':
    case 'tertiary':
      return /*#__PURE__*/React.createElement(Headline, _extends({
        weight: "2"
      }, restProps));
    case 'secondary':
      return /*#__PURE__*/React.createElement(Footnote, _extends({
        weight: "1",
        caps: true
      }, restProps));
  }
  return null;
};

/**
 * @see https://vkcom.github.io/VKUI/#/Header
 */
export var Header = function Header(_ref2) {
  var _ref2$mode = _ref2.mode,
    mode = _ref2$mode === void 0 ? 'primary' : _ref2$mode,
    children = _ref2.children,
    subtitle = _ref2.subtitle,
    indicator = _ref2.indicator,
    aside = _ref2.aside,
    getRootRef = _ref2.getRootRef,
    multiline = _ref2.multiline,
    className = _ref2.className,
    restProps = _objectWithoutProperties(_ref2, _excluded2);
  var platform = usePlatform();
  var AsideTypography = platform === Platform.VKCOM ? Subhead : Text;
  var SubtitleTypography = mode === 'secondary' ? Subhead : Footnote;
  return /*#__PURE__*/React.createElement("header", _extends({}, restProps, {
    ref: getRootRef,
    className: classNames("vkuiHeader", platform === Platform.VKCOM && "vkuiHeader--vkcom", platform === Platform.ANDROID && "vkuiHeader--android", platform === Platform.IOS && "vkuiHeader--ios", styles["Header--mode-".concat(mode)], isPrimitiveReactNode(indicator) && "vkuiHeader--pi", className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiHeader__main"
  }, /*#__PURE__*/React.createElement(HeaderContent, {
    className: "vkuiHeader__content",
    Component: "span",
    mode: mode
  }, /*#__PURE__*/React.createElement("span", {
    className: classNames("vkuiHeader__content-in", multiline && "vkuiHeader__content-in--multiline")
  }, children), hasReactNode(indicator) && /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiHeader__indicator",
    weight: mode === 'primary' || mode === 'secondary' ? '1' : undefined
  }, indicator)), hasReactNode(subtitle) && /*#__PURE__*/React.createElement(SubtitleTypography, {
    className: "vkuiHeader__subtitle",
    Component: "span"
  }, subtitle)), hasReactNode(aside) && /*#__PURE__*/React.createElement(AsideTypography, {
    className: "vkuiHeader__aside",
    Component: "span"
  }, aside));
};
var styles = {
  "Header--mode-primary": "vkuiHeader--mode-primary",
  "Header--mode-secondary": "vkuiHeader--mode-secondary",
  "Header--mode-tertiary": "vkuiHeader--mode-tertiary"
};
//# sourceMappingURL=Header.js.map