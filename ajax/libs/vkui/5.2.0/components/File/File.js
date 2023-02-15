import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "align", "size", "mode", "stretched", "before", "after", "loading", "className", "style", "getRef", "getRootRef", "appearance"];
import * as React from 'react';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import { Button } from '../Button/Button';
import { usePlatform } from '../../hooks/usePlatform';
import { VisuallyHiddenInput } from '../VisuallyHiddenInput/VisuallyHiddenInput';
import { classNames } from '@vkontakte/vkjs';
/**
 * @see https://vkcom.github.io/VKUI/#/File
 */
export var File = function File(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? 'Выберите файл' : _ref$children,
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? 'left' : _ref$align,
    size = _ref.size,
    mode = _ref.mode,
    stretched = _ref.stretched,
    before = _ref.before,
    after = _ref.after,
    loading = _ref.loading,
    className = _ref.className,
    style = _ref.style,
    getRef = _ref.getRef,
    getRootRef = _ref.getRootRef,
    appearance = _ref.appearance,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  return /*#__PURE__*/React.createElement(Button, {
    Component: "label",
    align: align,
    className: classNames("vkuiFile", getPlatformClassName("vkuiFile", platform), className),
    stretched: stretched,
    mode: mode,
    appearance: appearance,
    size: size,
    before: before,
    after: after,
    loading: loading,
    style: style,
    getRootRef: getRootRef,
    disabled: restProps.disabled
  }, /*#__PURE__*/React.createElement(VisuallyHiddenInput, _extends({}, restProps, {
    className: "vkuiFile__input",
    type: "file",
    getRef: getRef
  })), children);
};
//# sourceMappingURL=File.js.map