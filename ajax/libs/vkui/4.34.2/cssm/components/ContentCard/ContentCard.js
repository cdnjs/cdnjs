import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["subtitle", "header", "text", "caption", "className", "mode", "style", "getRootRef", "getRef", "maxHeight", "image", "src", "srcSet", "alt", "width", "height", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "useMap"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Card } from "../Card/Card";
import { Caption } from "../Typography/Caption/Caption";
import { Headline } from "../Typography/Headline/Headline";
import { Text } from "../Typography/Text/Text";
import { Tappable } from "../Tappable/Tappable";
import { hasReactNode } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { classNames } from "../../lib/classNames";
import "./ContentCard.css";
var warn = warnOnce("ContentCard");
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
      mode = _ref$mode === void 0 ? "shadow" : _ref$mode,
      style = _ref.style,
      getRootRef = _ref.getRootRef,
      getRef = _ref.getRef,
      maxHeight = _ref.maxHeight,
      image = _ref.image,
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
      restProps = _objectWithoutProperties(_ref, _excluded);

  var source = image || src;

  if (image && process.env.NODE_ENV === "development") {
    warn("Свойство image устарело и будет удалено в 5.0.0. Используйте src");
  }

  return createScopedElement(Card, {
    mode: mode,
    getRootRef: getRootRef,
    vkuiClass: classNames("ContentCard", restProps.disabled && "ContentCard--disabled"),
    style: style,
    className: className
  }, createScopedElement(Tappable, _extends({}, restProps, {
    disabled: restProps.disabled || !restProps.onClick && !restProps.href,
    hasHover: false,
    hasActive: false,
    vkuiClass: "ContentCard__tappable"
  }), (source || srcSet) && createScopedElement("img", {
    ref: getRef,
    vkuiClass: "ContentCard__img",
    src: source,
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
  }), createScopedElement("div", {
    vkuiClass: "ContentCard__body"
  }, hasReactNode(subtitle) && createScopedElement(Caption, {
    vkuiClass: "ContentCard__text ContentCard__subtitle",
    weight: "1",
    level: "3",
    caps: true
  }, subtitle), hasReactNode(header) && createScopedElement(Headline, {
    vkuiClass: "ContentCard__text",
    weight: "2",
    level: "1"
  }, header), hasReactNode(text) && createScopedElement(Text, {
    vkuiClass: "ContentCard__text"
  }, text), hasReactNode(caption) && createScopedElement(Caption, {
    vkuiClass: "ContentCard__text ContentCard__caption"
  }, caption))));
};
//# sourceMappingURL=ContentCard.js.map