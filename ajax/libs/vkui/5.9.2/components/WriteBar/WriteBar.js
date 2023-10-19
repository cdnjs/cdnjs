import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { Headline } from "../Typography/Headline/Headline";
import { Title } from "../Typography/Title/Title";
var WriteBarTypography = function(props) {
    var platform = usePlatform();
    if (platform === Platform.IOS) {
        return /*#__PURE__*/ React.createElement(Title, _object_spread_props(_object_spread({}, props), {
            level: "3",
            weight: "3"
        }));
    }
    return /*#__PURE__*/ React.createElement(Headline, props);
};
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBar
 */ export var WriteBar = function(_param) {
    var className = _param.className, style = _param.style, before = _param.before, inlineAfter = _param.inlineAfter, after = _param.after, getRootRef = _param.getRootRef, getRef = _param.getRef, onHeightChange = _param.onHeightChange, _param_shadow = _param.shadow, shadow = _param_shadow === void 0 ? false : _param_shadow, defaultValue = _param.defaultValue, restProps = _object_without_properties(_param, [
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
    var platform = usePlatform();
    var _useEnsuredControl = _sliced_to_array(useEnsuredControl(_object_spread({
        defaultValue: defaultValue
    }, restProps)), 2), value = _useEnsuredControl[0], onChange = _useEnsuredControl[1];
    var textareaRef = useExternRef(getRef);
    var currentScrollHeight = React.useRef();
    var resize = React.useCallback(function() {
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
    React.useEffect(resize, [
        resize,
        value,
        platform
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        ref: getRootRef,
        className: classNames("vkuiWriteBar", platform === Platform.IOS && "vkuiWriteBar--ios", shadow && "vkuiWriteBar--shadow", className),
        style: style
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiWriteBar__form"
    }, hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiWriteBar__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiWriteBar__formIn"
    }, /*#__PURE__*/ React.createElement(WriteBarTypography, _object_spread_props(_object_spread({}, restProps), {
        Component: "textarea",
        className: "vkuiWriteBar__textarea",
        onChange: onChange,
        getRootRef: textareaRef,
        value: value
    })), hasReactNode(inlineAfter) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiWriteBar__inlineAfter"
    }, inlineAfter)), hasReactNode(after) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiWriteBar__after"
    }, after)));
};

//# sourceMappingURL=WriteBar.js.map