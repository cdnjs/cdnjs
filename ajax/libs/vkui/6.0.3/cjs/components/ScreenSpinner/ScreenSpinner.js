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
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
const _Spinner = require("../Spinner/Spinner");
const _Icon48CancelCircle = require("./Icon48CancelCircle");
const _Icon48DoneOutline = require("./Icon48DoneOutline");
const ScreenSpinner = (_param)=>{
    var { style, className, state = 'loading', size = 'large', onClick, children = 'Пожалуйста, подождите...' } = _param, restProps = _object_without_properties._(_param, [
        "style",
        "className",
        "state",
        "size",
        "onClick",
        "children"
    ]);
    const hideSpinner = state === 'done' || state === 'error';
    const Icon = {
        loading: ()=>null,
        cancelable: _icons.Icon24Cancel,
        done: _Icon48DoneOutline.Icon48DoneOutline,
        error: _Icon48CancelCircle.Icon48CancelCircle
    }[state];
    (0, _ScrollContext.useScrollLock)();
    return /*#__PURE__*/ _react.createElement(_PopoutWrapper.PopoutWrapper, {
        noBackground: true,
        className: (0, _vkjs.classNames)("vkuiScreenSpinner", state === 'cancelable' && "vkuiScreenSpinner--clickable", className),
        style: style
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiScreenSpinner__container",
        onClick: onClick
    }, /*#__PURE__*/ _react.createElement(_Spinner.Spinner, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiScreenSpinner__spinner", hideSpinner && "vkuiScreenSpinner__spinner--hidden"),
        size: size
    }, restProps), children), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiScreenSpinner__icon", state === 'done' && "vkuiScreenSpinner__icon--state-done")
    }, /*#__PURE__*/ _react.createElement(Icon, null))));
};

//# sourceMappingURL=ScreenSpinner.js.map