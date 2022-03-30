import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["subtitle", "header", "text", "caption", "className", "mode", "style", "getRootRef", "getRef", "maxHeight", "image", "src", "srcSet", "alt", "width", "height", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "useMap"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Card } from "../Card/Card";
import { Caption } from "../Typography/Caption/Caption";
import Title from "../Typography/Title/Title";
import Text from "../Typography/Text/Text";
import Tappable from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { classNames } from "../../lib/classNames";
var warn = warnOnce("ContentCard");

var ContentCard = function ContentCard(props) {
  var subtitle = props.subtitle,
      header = props.header,
      text = props.text,
      caption = props.caption,
      className = props.className,
      mode = props.mode,
      style = props.style,
      getRootRef = props.getRootRef,
      getRef = props.getRef,
      maxHeight = props.maxHeight,
      image = props.image,
      src = props.src,
      srcSet = props.srcSet,
      alt = props.alt,
      width = props.width,
      height = props.height,
      crossOrigin = props.crossOrigin,
      decoding = props.decoding,
      loading = props.loading,
      referrerPolicy = props.referrerPolicy,
      sizes = props.sizes,
      useMap = props.useMap,
      restProps = _objectWithoutProperties(props, _excluded);

  var platform = usePlatform();
  var source = image || src;

  if (image && process.env.NODE_ENV === "development") {
    warn("Свойство image устарело и будет удалено в 5.0.0. Используйте src");
  }

  return createScopedElement(Card, {
    mode: mode,
    getRootRef: getRootRef,
    vkuiClass: classNames(getClassName("ContentCard", platform), {
      "ContentCard--disabled": restProps.disabled
    }),
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
    caps: true,
    vkuiClass: "ContentCard__text",
    weight: "1",
    level: "3"
  }, subtitle), hasReactNode(header) && createScopedElement(Title, {
    vkuiClass: "ContentCard__text",
    weight: "3",
    level: "1"
  }, header), hasReactNode(text) && createScopedElement(Text, {
    vkuiClass: "ContentCard__text",
    weight: "regular"
  }, text), hasReactNode(caption) && createScopedElement(Caption, {
    vkuiClass: "ContentCard__text"
  }, caption))));
};

ContentCard.defaultProps = {
  mode: "shadow"
}; // eslint-disable-next-line import/no-default-export

export default ContentCard;
//# sourceMappingURL=ContentCard.js.map