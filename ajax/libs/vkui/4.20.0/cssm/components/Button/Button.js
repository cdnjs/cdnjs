import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "sizeY", "platform"],
    _excluded2 = ["size", "mode", "stretched", "align", "children", "before", "after", "getRootRef", "sizeY", "Component", "loading", "onClick"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import Tappable from "../Tappable/Tappable";
import Title from "../Typography/Title/Title";
import Text from "../Typography/Text/Text";
import Subhead from "../Typography/Subhead/Subhead";
import Caption from "../Typography/Caption/Caption";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType, withAdaptivity } from "../../hoc/withAdaptivity";
import { IOS, VKCOM } from "../../lib/platform";
import Spinner from "../Spinner/Spinner";
import "./Button.css";

var ButtonTypography = function ButtonTypography(props) {
  var size = props.size,
      sizeY = props.sizeY,
      platform = props.platform,
      restProps = _objectWithoutProperties(props, _excluded);

  var isCompact = sizeY === SizeType.COMPACT;

  switch (size) {
    case 'l':
      if (isCompact) {
        return createScopedElement(Text, _extends({
          weight: "medium"
        }, restProps));
      }

      return createScopedElement(Title, _extends({
        level: "3",
        weight: "medium"
      }, restProps));

    case 'm':
      if (isCompact) {
        return createScopedElement(Subhead, _extends({
          weight: platform === VKCOM ? 'regular' : 'medium'
        }, restProps));
      }

      return createScopedElement(Text, _extends({
        weight: "medium"
      }, restProps));

    case 's':
    default:
      if (platform === IOS) {
        return createScopedElement(Subhead, _extends({
          weight: "medium"
        }, restProps));
      }

      if (platform === VKCOM) {
        return createScopedElement(Caption, _extends({
          level: "1",
          weight: "regular"
        }, restProps));
      }

      if (isCompact) {
        return createScopedElement(Caption, _extends({
          level: "1",
          weight: "medium"
        }, restProps));
      }

      return createScopedElement(Subhead, _extends({
        weight: "medium"
      }, restProps));
  }
};

var Button = function Button(props) {
  var _classNames;

  var platform = usePlatform();

  var size = props.size,
      mode = props.mode,
      stretched = props.stretched,
      align = props.align,
      children = props.children,
      before = props.before,
      after = props.after,
      getRootRef = props.getRootRef,
      sizeY = props.sizeY,
      _props$Component = props.Component,
      Component = _props$Component === void 0 ? 'button' : _props$Component,
      loading = props.loading,
      onClick = props.onClick,
      restProps = _objectWithoutProperties(props, _excluded2);

  var hasIcons = Boolean(before || after);
  return createScopedElement(Tappable, _extends({}, restProps, {
    Component: restProps.href ? 'a' : Component,
    onClick: loading ? null : onClick,
    focusVisibleMode: "outside",
    vkuiClass: classNames(getClassName('Button', platform), "Button--sz-".concat(size), "Button--lvl-".concat(mode), "Button--aln-".concat(align), "Button--sizeY-".concat(sizeY), (_classNames = {}, _defineProperty(_classNames, 'Button--stretched', stretched), _defineProperty(_classNames, 'Button--with-icon', hasIcons), _classNames)),
    getRootRef: getRootRef,
    activeMode: "opacity"
  }), loading && createScopedElement(Spinner, {
    size: "small",
    vkuiClass: "Button__spinner"
  }), createScopedElement("span", {
    vkuiClass: "Button__in"
  }, before && createScopedElement("span", {
    vkuiClass: "Button__before"
  }, before), children && createScopedElement(ButtonTypography, {
    size: size,
    sizeY: sizeY,
    platform: platform,
    vkuiClass: "Button__content",
    Component: "span"
  }, children), after && createScopedElement("span", {
    vkuiClass: "Button__after"
  }, after)));
};

Button.defaultProps = {
  mode: 'primary',
  align: 'center',
  size: 's',
  stretched: false,
  stopPropagation: true
};
export default withAdaptivity(Button, {
  sizeY: true
});
//# sourceMappingURL=Button.js.map