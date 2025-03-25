"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ScreenSpinnerLoader", {
    enumerable: true,
    get: function() {
        return ScreenSpinnerLoader;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Spinner = require("../Spinner/Spinner");
const _context = require("./context");
const ScreenSpinnerLoader = (_param)=>{
    var { size = 'large', children } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "children"
    ]);
    const { caption } = _react.useContext(_context.ScreenSpinnerContext);
    // TODO [>=7]: см. https://github.com/VKCOM/VKUI/pull/7505#discussion_r1754153438
    const a11yText = children ? children : caption !== null && caption !== void 0 ? caption : 'Пожалуйста, подождите...';
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Spinner.Spinner, _object_spread_props._(_object_spread._({
        className: (0, _vkjs.classNames)("vkuiScreenSpinner__spinner", !caption && "vkuiScreenSpinner__spinner--transition"),
        size: size,
        noColor: true
    }, restProps), {
        children: a11yText
    }));
};
ScreenSpinnerLoader.displayName = 'ScreenSpinnerLoader';

//# sourceMappingURL=ScreenSpinnerLoader.js.map