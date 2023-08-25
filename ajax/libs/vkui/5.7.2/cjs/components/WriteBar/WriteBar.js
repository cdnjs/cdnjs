"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WriteBar", {
    enumerable: true,
    get: function() {
        return WriteBar;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useEnsuredControl = require("../../hooks/useEnsuredControl");
var _useExternRef = require("../../hooks/useExternRef");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _Headline = require("../Typography/Headline/Headline");
var _Title = require("../Typography/Title/Title");
var WriteBarTypography = function(props) {
    var platform = (0, _usePlatform.usePlatform)();
    if (platform === _platform.Platform.IOS) {
        return /*#__PURE__*/ _react.createElement(_Title.Title, _object_spread_props._(_object_spread._({}, props), {
            level: "3",
            weight: "3"
        }));
    }
    return /*#__PURE__*/ _react.createElement(_Headline.Headline, props);
};
var WriteBar = function(_param) {
    var className = _param.className, style = _param.style, before = _param.before, inlineAfter = _param.inlineAfter, after = _param.after, getRootRef = _param.getRootRef, getRef = _param.getRef, onHeightChange = _param.onHeightChange, _param_shadow = _param.shadow, shadow = _param_shadow === void 0 ? false : _param_shadow, defaultValue = _param.defaultValue, restProps = _object_without_properties._(_param, [
        "className",
        "style",
        "before",
        "inlineAfter",
        "after",
        "getRootRef",
        "getRef",
        "onHeightChange",
        "shadow",
        "defaultValue"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _useEnsuredControl1 = _sliced_to_array._((0, _useEnsuredControl.useEnsuredControl)(_object_spread._({
        defaultValue: defaultValue
    }, restProps)), 2), value = _useEnsuredControl1[0], onChange = _useEnsuredControl1[1];
    var textareaRef = (0, _useExternRef.useExternRef)(getRef);
    var currentScrollHeight = _react.useRef();
    var resize = _react.useCallback(function() {
        var textareaEl = textareaRef.current;
        if (!textareaEl) {
            return;
        }
        if (textareaEl.offsetParent) {
            textareaEl.style.height = "";
            textareaEl.style.height = "".concat(textareaEl.scrollHeight, "px");
            if (textareaEl.scrollHeight !== currentScrollHeight.current && onHeightChange) {
                onHeightChange();
                currentScrollHeight.current = textareaEl.scrollHeight;
            }
        }
    }, [
        onHeightChange,
        textareaRef
    ]);
    _react.useEffect(resize, [
        resize,
        value,
        platform
    ]);
    return /*#__PURE__*/ _react.createElement("div", {
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiWriteBar", platform === _platform.Platform.IOS && "vkuiWriteBar--ios", shadow && "vkuiWriteBar--shadow", className),
        style: style
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiWriteBar__form"
    }, (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiWriteBar__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiWriteBar__formIn"
    }, /*#__PURE__*/ _react.createElement(WriteBarTypography, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "textarea",
        className: "vkuiWriteBar__textarea",
        onChange: onChange,
        getRootRef: textareaRef,
        value: value
    })), (0, _vkjs.hasReactNode)(inlineAfter) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiWriteBar__inlineAfter"
    }, inlineAfter)), (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiWriteBar__after"
    }, after)));
};

//# sourceMappingURL=WriteBar.js.map