import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["popout", "modal", "children", "getRootRef", "className"];
import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { blurActiveElement, useDOM } from "../../lib/dom";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import "./PopoutRoot.module.css";
export var PopoutRoot = function PopoutRoot(_ref) {
  var popout = _ref.popout,
    modal = _ref.modal,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useDOM = useDOM(),
    document = _useDOM.document;
  var _useAdaptivityWithJSM = useAdaptivityWithJSMediaQueries(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  React.useEffect(function () {
    popout && blurActiveElement(document);
  }, [document, popout]);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNamesString("vkuiPopoutRoot", className),
    ref: getRootRef
  }), children, /*#__PURE__*/React.createElement(AppRootPortal, null, !!popout && /*#__PURE__*/React.createElement("div", {
    className: isDesktop ? "vkuiPopoutRoot--absolute" : "vkuiPopoutRoot__popout"
  }, popout), !!modal && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopoutRoot__modal"
  }, modal)));
};
//# sourceMappingURL=PopoutRoot.js.map