"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ScreenSpinnerSwapIcon", {
    enumerable: true,
    get: function() {
        return ScreenSpinnerSwapIcon;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _mergeCalls = require("../../lib/mergeCalls");
const _utils = require("../../lib/utils");
const _RootComponent = require("../RootComponent/RootComponent");
const _Icon48CancelCircle = require("./Icon48CancelCircle");
const _Icon48DoneOutline = require("./Icon48DoneOutline");
const _context = require("./context");
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
ScreenSpinnerCancelIcon.displayName = 'ScreenSpinnerCancelIcon';
const ScreenSpinnerSwapIcon = (_param)=>{
    var { cancelLabel } = _param, restProps = _object_without_properties._(_param, [
        "cancelLabel"
    ]);
    const { state } = _react.useContext(_context.ScreenSpinnerContext);
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
ScreenSpinnerSwapIcon.displayName = 'ScreenSpinnerSwapIcon';

//# sourceMappingURL=ScreenSpinnerSwapIcon.js.map