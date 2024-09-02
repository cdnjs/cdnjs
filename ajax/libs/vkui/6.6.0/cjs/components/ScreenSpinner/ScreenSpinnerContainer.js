"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ScreenSpinnerContainer", {
    enumerable: true,
    get: function() {
        return ScreenSpinnerContainer;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const _context = require("./context");
const stateClassNames = {
    cancelable: "vkuiScreenSpinner--state-cancelable",
    done: "vkuiScreenSpinner--state-done",
    error: "vkuiScreenSpinner--state-error"
};
const modeClassNames = {
    shadow: "vkuiScreenSpinner--mode-shadow",
    overlay: "vkuiScreenSpinner--mode-overlay"
};
const ScreenSpinnerContainer = (_param)=>{
    var { state = 'loading', mode = 'shadow' } = _param, restProps = _object_without_properties._(_param, [
        "state",
        "mode"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_context.ScreenSpinnerContext.Provider, {
        value: {
            state
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread._({
            baseClassName: (0, _vkjs.classNames)("vkuiScreenSpinner", modeClassNames[mode], state !== 'loading' && stateClassNames[state])
        }, restProps))
    });
};
ScreenSpinnerContainer.displayName = 'ScreenSpinnerContainer';

//# sourceMappingURL=ScreenSpinnerContainer.js.map