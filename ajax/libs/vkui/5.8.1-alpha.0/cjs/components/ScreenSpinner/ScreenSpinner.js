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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
var _Spinner = require("../Spinner/Spinner");
var _Icon48CancelCircle = require("./Icon48CancelCircle");
var _Icon48DoneOutline = require("./Icon48DoneOutline");
var ScreenSpinner = function(_param) {
    var style = _param.style, className = _param.className, _param_state = _param.state, state = _param_state === void 0 ? "loading" : _param_state, _param_size = _param.size, size = _param_size === void 0 ? "large" : _param_size, tmp = _param["aria-label"], ariaLabel = tmp === void 0 ? "Пожалуйста, подождите..." : tmp, onClick = _param.onClick, restProps = _object_without_properties._(_param, [
        "style",
        "className",
        "state",
        "size",
        "aria-label",
        "onClick"
    ]);
    var hideSpinner = state === "done" || state === "error";
    var Icon = {
        loading: function() {
            return null;
        },
        cancelable: _icons.Icon24Cancel,
        done: _Icon48DoneOutline.Icon48DoneOutline,
        error: _Icon48CancelCircle.Icon48CancelCircle
    }[state];
    (0, _ScrollContext.useScrollLock)();
    return /*#__PURE__*/ _react.createElement(_PopoutWrapper.PopoutWrapper, {
        hasMask: false,
        className: (0, _vkjs.classNames)("vkuiScreenSpinner", state === "cancelable" && "vkuiScreenSpinner--clickable", className),
        style: style
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiScreenSpinner__container",
        onClick: onClick
    }, /*#__PURE__*/ _react.createElement(_Spinner.Spinner, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiScreenSpinner__spinner", hideSpinner && "vkuiScreenSpinner__spinner--hidden"),
        size: size,
        "aria-label": ariaLabel
    }, restProps)), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiScreenSpinner__icon", state === "done" && "vkuiScreenSpinner__icon--state-done")
    }, /*#__PURE__*/ _react.createElement(Icon, null))));
};

//# sourceMappingURL=ScreenSpinner.js.map