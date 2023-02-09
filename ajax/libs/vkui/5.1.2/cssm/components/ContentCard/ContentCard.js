import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["subtitle", "header", "text", "caption", "className", "mode", "style", "getRootRef", "getRef", "maxHeight", "src", "srcSet", "alt", "width", "height", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "useMap", "hasHover", "hasActive"];
import * as React from 'react';
import { Card } from '../Card/Card';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Headline } from '../Typography/Headline/Headline';
import { Text } from '../Typography/Text/Text';
import { Tappable } from '../Tappable/Tappable';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import "./ContentCard.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/ContentCard
 */
export var ContentCard = function ContentCard(_ref) {
  var subtitle = _ref.subtitle,
    header = _ref.header,
    text = _ref.text,
    caption = _ref.caption,
    className = _ref.className,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'shadow' : _ref$mode,
    style = _ref.style,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    maxHeight = _ref.maxHeight,
    src = _ref.src,
    srcSet = _ref.srcSet,
    alt = _ref.alt,
    width = _ref.width,
    height = _ref.height,
    crossOrigin = _ref.crossOrigin,
    decoding = _ref.decoding,
    loading = _ref.loading,
    referrerPolicy = _ref.referrerPolicy,
    sizes = _ref.sizes,
    useMap = _ref.useMap,
    _ref$hasHover = _ref.hasHover,
    hasHover = _ref$hasHover === void 0 ? false : _ref$hasHover,
    _ref$hasActive = _ref.hasActive,
    hasActive = _ref$hasActive === void 0 ? false : _ref$hasActive,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Card, {
    mode: mode,
    getRootRef: getRootRef,
    style: style,
    className: classNames("vkuiContentCard", restProps.disabled && "vkuiContentCard--disabled", className)
  }, /*#__PURE__*/React.createElement(Tappable, _extends({}, restProps, {
    disabled: restProps.disabled || !restProps.onClick && !restProps.href,
    hasHover: hasHover,
    hasActive: hasActive,
    className: "vkuiContentCard__tappable"
  }), (src || srcSet) && /*#__PURE__*/React.createElement("img", {
    ref: getRef,
    className: "vkuiContentCard__img",
    src: src,
    srcSet: srcSet,
    alt: alt,
    crossOrigin: crossOrigin,
    decoding: decoding,
    loading: loading,
    referrerPolicy: referrerPolicy,
    sizes: sizes,
    useMap: useMap,
    height: height,
    style: {
      maxHeight: maxHeight
    },
    width: "100%"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiContentCard__body"
  }, hasReactNode(subtitle) && /*#__PURE__*/React.createElement(Caption, {
    className: classNames("vkuiContentCard__text", "vkuiContentCard__subtitle"),
    weight: "1",
    level: "3",
    caps: true
  }, subtitle), hasReactNode(header) && /*#__PURE__*/React.createElement(Headline, {
    className: "vkuiContentCard__text",
    weight: "2",
    level: "1"
  }, header), hasReactNode(text) && /*#__PURE__*/React.createElement(Text, {
    className: "vkuiContentCard__text"
  }, text), hasReactNode(caption) && /*#__PURE__*/React.createElement(Footnote, {
    className: classNames("vkuiContentCard__text", "vkuiContentCard__caption")
  }, caption))));
};
//# sourceMappingURL=ContentCard.js.map