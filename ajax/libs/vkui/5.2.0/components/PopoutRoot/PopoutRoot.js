import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["popout", "modal", "children", "getRootRef", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { blurActiveElement, useDOM } from '../../lib/dom';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
var PopoutRootPopout = function PopoutRootPopout(_ref) {
  var children = _ref.children;
  var _useAdaptivityWithJSM = useAdaptivityWithJSMediaQueries(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames("vkuiPopoutRoot__popout", isDesktop && "vkuiPopoutRoot__popout--absolute")
  }, children);
};
var PopoutRootModal = function PopoutRootModal(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopoutRoot__modal"
  }, children);
};
export var PopoutRoot = function PopoutRoot(_ref3) {
  var popout = _ref3.popout,
    modal = _ref3.modal,
    children = _ref3.children,
    getRootRef = _ref3.getRootRef,
    className = _ref3.className,
    restProps = _objectWithoutProperties(_ref3, _excluded);
  var _useDOM = useDOM(),
    document = _useDOM.document;
  React.useEffect(function () {
    popout && blurActiveElement(document);
  }, [document, popout]);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiPopoutRoot", className),
    ref: getRootRef
  }), children, /*#__PURE__*/React.createElement(AppRootPortal, null, !!popout && /*#__PURE__*/React.createElement(PopoutRootPopout, null, popout), !!modal && /*#__PURE__*/React.createElement(PopoutRootModal, null, modal)));
};
//# sourceMappingURL=PopoutRoot.js.map