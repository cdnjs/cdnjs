"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ScreenSpinner", {
    enumerable: true,
    get: function() {
        return ScreenSpinner;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _ScrollContext = require("../AppRoot/ScrollContext");
const _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
const _ScreenSpinnerContainer = require("./ScreenSpinnerContainer");
const _ScreenSpinnerLoader = require("./ScreenSpinnerLoader");
const _ScreenSpinnerSwapIcon = require("./ScreenSpinnerSwapIcon");
const ScreenSpinner = (_param)=>{
    var { style, className, state = 'loading', onClick, cancelLabel, mode, caption } = _param, restProps = _object_without_properties._(_param, [
        "style",
        "className",
        "state",
        "onClick",
        "cancelLabel",
        "mode",
        "caption"
    ]);
    (0, _ScrollContext.useScrollLock)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_PopoutWrapper.PopoutWrapper, {
        className: className,
        style: style,
        noBackground: true,
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_ScreenSpinnerContainer.ScreenSpinnerContainer, {
            state: state,
            mode: mode,
            caption: caption,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_ScreenSpinnerLoader.ScreenSpinnerLoader, _object_spread._({}, restProps)),
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_ScreenSpinnerSwapIcon.ScreenSpinnerSwapIcon, {
                    onClick: onClick,
                    cancelLabel: cancelLabel
                })
            ]
        })
    });
};
ScreenSpinner.displayName = 'ScreenSpinner';
ScreenSpinner.Container = _ScreenSpinnerContainer.ScreenSpinnerContainer;
ScreenSpinner.Container.displayName = 'ScreenSpinner.Container';
ScreenSpinner.Loader = _ScreenSpinnerLoader.ScreenSpinnerLoader;
ScreenSpinner.Loader.displayName = 'ScreenSpinner.Loader';
ScreenSpinner.SwapIcon = _ScreenSpinnerSwapIcon.ScreenSpinnerSwapIcon;
ScreenSpinner.SwapIcon.displayName = 'ScreenSpinner.SwapIcon';

//# sourceMappingURL=ScreenSpinner.js.map