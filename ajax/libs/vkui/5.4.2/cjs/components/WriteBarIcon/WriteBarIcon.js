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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _adaptiveIconRenderer = require("../AdaptiveIconRenderer/AdaptiveIconRenderer");
var _counter = require("../Counter/Counter");
var _tappable = require("../Tappable/Tappable");
var warn = (0, _warnOnce.warnOnce)("WriteBarIcon");
var WriteBarIcon = function(_param) {
    var mode = _param.mode, children = _param.children, count = _param.count, className = _param.className, restProps = _objectWithoutProperties(_param, [
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
        var isAccessible = !modeLabel && (!restProps["aria-label"] || restProps["aria-labelledby"]);
        if (!isAccessible) {
            warn(_warnOnce.COMMON_WARNINGS.a11y["button-name"], "error");
        }
    }
    return /*#__PURE__*/ _react.createElement(_tappable.Tappable, _objectSpreadProps(_objectSpread({
        "aria-label": modeLabel
    }, restProps), {
        Component: "button",
        hasHover: false,
        activeMode: "vkuiWriteBarIcon__active",
        className: (0, _vkjs.classNames)("vkuiWriteBarIcon", platform === _platform.Platform.IOS && "vkuiWriteBarIcon--ios", mode === "send" && "vkuiWriteBarIcon--mode-send", mode === "done" && "vkuiWriteBarIcon--mode-done", className)
    }), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiWriteBarIcon__in"
    }, predefinedIcons ? /*#__PURE__*/ _react.createElement(_adaptiveIconRenderer.AdaptiveIconRenderer, predefinedIcons) : children), (0, _vkjs.hasReactNode)(count) && /*#__PURE__*/ _react.createElement(_counter.Counter, {
        className: "vkuiWriteBarIcon__counter",
        size: "s"
    }, count));
};

//# sourceMappingURL=WriteBarIcon.js.map