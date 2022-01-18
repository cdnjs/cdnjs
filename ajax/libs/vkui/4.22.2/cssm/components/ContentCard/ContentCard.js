import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["subtitle", "header", "text", "caption", "className", "mode", "style", "getRootRef", "getRef", "maxHeight", "image", "src", "srcSet", "alt", "width", "height", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "useMap"];
import { createScopedElement } from "../../lib/jsxRuntime";
import Card from "../Card/Card";
import Caption from "../Typography/Caption/Caption";
import Title from "../Typography/Title/Title";
import Text from "../Typography/Text/Text";
import Tappable from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import "./ContentCard.css";

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
  var disabled = restProps.disabled || typeof restProps.onClick !== 'function';
  var source = image || src;
  return createScopedElement(Card, {
    mode: mode,
    getRootRef: getRootRef,
    vkuiClass: getClassName('ContentCard', platform),
    style: style,
    className: className
  }, createScopedElement(Tappable, _extends({}, restProps, {
    disabled: disabled,
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
    weight: "semibold",
    level: "3"
  }, subtitle), hasReactNode(header) && createScopedElement(Title, {
    vkuiClass: "ContentCard__text",
    weight: "semibold",
    level: "3"
  }, header), hasReactNode(text) && createScopedElement(Text, {
    vkuiClass: "ContentCard__text",
    weight: "regular"
  }, text), hasReactNode(caption) && createScopedElement(Caption, {
    vkuiClass: "ContentCard__text",
    weight: "regular",
    level: "1"
  }, caption))));
};

ContentCard.defaultProps = {
  mode: 'shadow'
};
export default ContentCard;
//# sourceMappingURL=ContentCard.js.map