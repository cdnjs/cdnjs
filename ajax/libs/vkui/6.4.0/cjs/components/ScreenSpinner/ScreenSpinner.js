"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ScreenSpinner: function() {
        return ScreenSpinner;
    },
    ScreenSpinnerContext: function() {
        return ScreenSpinnerContext;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _mergeCalls = require("../../lib/mergeCalls");
const _utils = require("../../lib/utils");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
const _RootComponent = require("../RootComponent/RootComponent");
const _Spinner = require("../Spinner/Spinner");
const _Icon48CancelCircle = require("./Icon48CancelCircle");
const _Icon48DoneOutline = require("./Icon48DoneOutline");
const ScreenSpinnerContext = /*#__PURE__*/ _react.createContext({
    state: 'loading'
});
const stateClassNames = {
    cancelable: "vkuiScreenSpinner--state-cancelable",
    done: "vkuiScreenSpinner--state-done",
    error: "vkuiScreenSpinner--state-error"
};
const ScreenSpinnerLoader = (_param)=>{
    var { size = 'large', children = 'Пожалуйста, подождите...' } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "children"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Spinner.Spinner, _object_spread_props._(_object_spread._({
        className: "vkuiScreenSpinner__spinner",
        size: size
    }, restProps), {
        children: children
    }));
};
ScreenSpinnerLoader.displayName = 'ScreenSpinner.Loader';
const ScreenSpinnerCancelIcon = (_param)=>{
    var { onKeyDown, 'aria-label': ariaLabel = 'Отменить' } = _param, restProps = _object_without_properties._(_param, [
        "onKeyDown",
        'aria-label'
    ]);
    const handlers = (0, _mergeCalls.mergeCalls)({
        onKeyDown: _utils.clickByKeyboardHandler
    }, {
        onKeyDown
    });
    let clickableProps = _object_spread_props._(_object_spread._({}, handlers), {
        'tabIndex': 0,
        'role': 'button',
        'aria-label': ariaLabel
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        baseClassName: "vkuiScreenSpinner__icon"
    }, clickableProps, restProps), {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon24Cancel, {})
    }));
};
const ScreenSpinnerSwapIcon = (_param)=>{
    var { cancelLabel } = _param, restProps = _object_without_properties._(_param, [
        "cancelLabel"
    ]);
    const { state } = _react.useContext(ScreenSpinnerContext);
    if (state === 'cancelable') {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(ScreenSpinnerCancelIcon, _object_spread._({
            "aria-label": cancelLabel
        }, restProps));
    }
    const Icon = {
        loading: ()=>null,
        done: _Icon48DoneOutline.Icon48DoneOutline,
        error: _Icon48CancelCircle.Icon48CancelCircle
    }[state];
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        baseClassName: "vkuiScreenSpinner__icon"
    }, restProps), {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Icon, {})
    }));
};
ScreenSpinnerSwapIcon.displayName = 'ScreenSpinner.SwapIcon';
const ScreenSpinnerContainer = (_param)=>{
    var { state = 'loading' } = _param, restProps = _object_without_properties._(_param, [
        "state"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(ScreenSpinnerContext.Provider, {
        value: {
            state
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread._({
            baseClassName: (0, _vkjs.classNames)("vkuiScreenSpinner", state !== 'loading' && stateClassNames[state])
        }, restProps))
    });
};
ScreenSpinnerContainer.displayName = 'ScreenSpinner.Container';
const ScreenSpinner = (_param)=>{
    var { style, className, state = 'loading', onClick, cancelLabel } = _param, restProps = _object_without_properties._(_param, [
        "style",
        "className",
        "state",
        "onClick",
        "cancelLabel"
    ]);
    (0, _ScrollContext.useScrollLock)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_PopoutWrapper.PopoutWrapper, {
        className: className,
        style: style,
        noBackground: true,
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(ScreenSpinnerContainer, {
            state: state,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(ScreenSpinnerLoader, _object_spread._({}, restProps)),
                /*#__PURE__*/ (0, _jsxruntime.jsx)(ScreenSpinnerSwapIcon, {
                    onClick: onClick,
                    cancelLabel: cancelLabel
                })
            ]
        })
    });
};
ScreenSpinner.displayName = 'ScreenSpinner';
ScreenSpinner.Container = ScreenSpinnerContainer;
ScreenSpinner.Container.displayName = 'ScreenSpinner.Container';
ScreenSpinner.Loader = ScreenSpinnerLoader;
ScreenSpinner.Loader.displayName = 'ScreenSpinner.Loader';
ScreenSpinner.SwapIcon = ScreenSpinnerSwapIcon;
ScreenSpinner.SwapIcon.displayName = 'ScreenSpinner.SwapIcon';

//# sourceMappingURL=ScreenSpinner.js.map