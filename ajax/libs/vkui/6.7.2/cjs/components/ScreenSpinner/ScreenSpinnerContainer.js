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
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const _Footnote = require("../Typography/Footnote/Footnote");
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
    var { state = 'loading', mode = 'shadow', caption, children } = _param, restProps = _object_without_properties._(_param, [
        "state",
        "mode",
        "caption",
        "children"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_context.ScreenSpinnerContext.Provider, {
        value: {
            state,
            caption
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
            baseClassName: (0, _vkjs.classNames)("vkuiScreenSpinner", modeClassNames[mode], state !== 'loading' && stateClassNames[state], (0, _vkjs.hasReactNode)(caption) && "vkuiScreenSpinner--has-caption")
        }, restProps), {
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiScreenSpinner__icon-slot",
                    children: children
                }),
                (0, _vkjs.hasReactNode)(caption) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                    className: "vkuiScreenSpinner__caption",
                    "aria-hidden": true,
                    children: caption
                })
            ]
        }))
    });
};
ScreenSpinnerContainer.displayName = 'ScreenSpinnerContainer';

//# sourceMappingURL=ScreenSpinnerContainer.js.map