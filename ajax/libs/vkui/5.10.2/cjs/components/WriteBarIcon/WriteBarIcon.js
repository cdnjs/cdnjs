"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WriteBarIcon", {
    enumerable: true,
    get: function() {
        return WriteBarIcon;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _AdaptiveIconRenderer = require("../AdaptiveIconRenderer/AdaptiveIconRenderer");
var _Counter = require("../Counter/Counter");
var _Tappable = require("../Tappable/Tappable");
var warn = (0, _warnOnce.warnOnce)("WriteBarIcon");
var WriteBarIcon = function(_param) {
    var mode = _param.mode, children = _param.children, count = _param.count, className = _param.className, restProps = _object_without_properties._(_param, [
        "mode",
        "children",
        "count",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var modeLabel = undefined;
    var predefinedIcons;
    switch(mode){
        case "attach":
            predefinedIcons = {
                IconCompact: platform === _platform.Platform.IOS ? _icons.Icon28AddCircleOutline : _icons.Icon24Attach,
                IconRegular: platform === _platform.Platform.IOS ? _icons.Icon28AddCircleOutline : _icons.Icon28AttachOutline
            };
            modeLabel = "Прикрепить файл";
            break;
        case "send":
            predefinedIcons = {
                IconCompact: platform === _platform.Platform.IOS ? _icons.Icon48WritebarSend : _icons.Icon24Send,
                IconRegular: platform === _platform.Platform.IOS ? _icons.Icon48WritebarSend : _icons.Icon28Send
            };
            modeLabel = "Отправить";
            break;
        case "done":
            predefinedIcons = {
                IconCompact: platform === _platform.Platform.IOS ? _icons.Icon48WritebarDone : _icons.Icon24CheckCircleOutline,
                IconRegular: platform === _platform.Platform.IOS ? _icons.Icon48WritebarDone : _icons.Icon28CheckCircleOutline
            };
            modeLabel = "Готово";
            break;
        default:
            break;
    }
    if (process.env.NODE_ENV === "development") {
        var isAccessible = modeLabel || restProps["aria-label"] || restProps["aria-labelledby"];
        if (!isAccessible) {
            warn(_warnOnce.COMMON_WARNINGS.a11y["button-name"], "error");
        }
    }
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        "aria-label": modeLabel
    }, restProps), {
        Component: "button",
        hasHover: false,
        activeMode: "vkuiWriteBarIcon__active",
        className: (0, _vkjs.classNames)("vkuiWriteBarIcon", platform === _platform.Platform.IOS && "vkuiWriteBarIcon--ios", mode === "send" && "vkuiWriteBarIcon--mode-send", mode === "done" && "vkuiWriteBarIcon--mode-done", className)
    }), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiWriteBarIcon__in"
    }, predefinedIcons ? /*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, predefinedIcons) : children), (0, _vkjs.hasReactNode)(count) && /*#__PURE__*/ _react.createElement(_Counter.Counter, {
        className: "vkuiWriteBarIcon__counter",
        size: "s"
    }, count));
};

//# sourceMappingURL=WriteBarIcon.js.map