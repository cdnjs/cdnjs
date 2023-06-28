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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _scrollContext = require("../AppRoot/ScrollContext");
var _popoutWrapper = require("../PopoutWrapper/PopoutWrapper");
var _spinner = require("../Spinner/Spinner");
var _icon48CancelCircle = require("./Icon48CancelCircle");
var _icon48DoneOutline = require("./Icon48DoneOutline");
var ScreenSpinner = function(_param) {
    var style = _param.style, className = _param.className, _param_state = _param.state, state = _param_state === void 0 ? "loading" : _param_state, _param_size = _param.size, size = _param_size === void 0 ? "large" : _param_size, tmp = _param["aria-label"], ariaLabel = tmp === void 0 ? "Пожалуйста, подождите..." : tmp, onClick = _param.onClick, restProps = _objectWithoutProperties(_param, [
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
        done: _icon48DoneOutline.Icon48DoneOutline,
        error: _icon48CancelCircle.Icon48CancelCircle
    }[state];
    (0, _scrollContext.useScrollLock)();
    return /*#__PURE__*/ _react.createElement(_popoutWrapper.PopoutWrapper, {
        hasMask: false,
        className: (0, _vkjs.classNames)("vkuiScreenSpinner", hideSpinner && "vkuiScreenSpinner--hideSpinner", state === "cancelable" && "vkuiScreenSpinner--state-cancelable", state === "done" && "vkuiScreenSpinner--state-done", className),
        style: style
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiScreenSpinner__container",
        onClick: onClick
    }, /*#__PURE__*/ _react.createElement(_spinner.Spinner, _objectSpread({
        className: "vkuiScreenSpinner__spinner",
        size: size,
        "aria-label": ariaLabel
    }, restProps)), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiScreenSpinner__icon"
    }, /*#__PURE__*/ _react.createElement(Icon, null))));
};

//# sourceMappingURL=ScreenSpinner.js.map