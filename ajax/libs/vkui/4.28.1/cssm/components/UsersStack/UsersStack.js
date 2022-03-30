import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["photos", "visibleCount", "size", "layout", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import { classNames } from "../../lib/classNames";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { Caption } from "../Typography/Caption/Caption";
import Subhead from "../Typography/Subhead/Subhead";
import { createMasks } from "./masks";
import { useDOM } from "../../lib/dom";
import "./UsersStack.css";

var UsersStack = function UsersStack(props) {
  var platform = usePlatform();

  var _props$photos = props.photos,
      photos = _props$photos === void 0 ? [] : _props$photos,
      _props$visibleCount = props.visibleCount,
      visibleCount = _props$visibleCount === void 0 ? 0 : _props$visibleCount,
      size = props.size,
      layout = props.layout,
      children = props.children,
      restProps = _objectWithoutProperties(props, _excluded);

  var _useDOM = useDOM(),
      document = _useDOM.document;

  useIsomorphicLayoutEffect(function () {
    createMasks(document);
  }, [document]);
  var othersCount = Math.max(0, photos.length - visibleCount);
  var canShowOthers = othersCount > 0 && size === "m";
  var photosShown = photos.slice(0, visibleCount);
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName("UsersStack", platform), "UsersStack--size-".concat(size), "UsersStack--l-".concat(layout), {
      "UsersStack--others": canShowOthers
    })
  }), createScopedElement("div", {
    vkuiClass: "UsersStack__photos",
    role: "presentation"
  }, photosShown.map(function (photo, i) {
    return createScopedElement("div", {
      key: i,
      vkuiClass: "UsersStack__photo",
      style: {
        backgroundImage: "url(".concat(photo, ")")
      }
    });
  }), canShowOthers && createScopedElement(Caption, {
    weight: "1",
    vkuiClass: "UsersStack__photo UsersStack__photo--others",
    "aria-hidden": "true"
  }, createScopedElement("span", null, "+", othersCount))), hasReactNode(children) && createScopedElement(Subhead, {
    Component: "span",
    vkuiClass: "UsersStack__text"
  }, children));
};

UsersStack.defaultProps = {
  photos: [],
  size: "s",
  visibleCount: 3,
  layout: "horizontal"
}; // eslint-disable-next-line import/no-default-export

export default /*#__PURE__*/React.memo(UsersStack);
//# sourceMappingURL=UsersStack.js.map