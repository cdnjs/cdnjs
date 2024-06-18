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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _accessibility = require("../../lib/accessibility");
const _warnOnce = require("../../lib/warnOnce");
const _AdaptiveIconRenderer = require("../AdaptiveIconRenderer/AdaptiveIconRenderer");
const _Counter = require("../Counter/Counter");
const _Tappable = require("../Tappable/Tappable");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const predefinedLabel = {
    attach: 'Прикрепить файл',
    send: 'Отправить',
    done: 'Готово'
};
const warn = (0, _warnOnce.warnOnce)('WriteBarIcon');
const WriteBarIcon = (_param)=>{
    var { mode, children, count, className, label: labelProp } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "children",
        "count",
        "className",
        "label"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    let predefinedIcons;
    switch(mode){
        case 'attach':
            predefinedIcons = {
                IconCompact: platform === 'ios' ? _icons.Icon28AddCircleOutline : _icons.Icon24Attach,
                IconRegular: platform === 'ios' ? _icons.Icon28AddCircleOutline : _icons.Icon28AttachOutline
            };
            break;
        case 'send':
            predefinedIcons = {
                IconCompact: platform === 'ios' ? _icons.Icon48WritebarSend : _icons.Icon24Send,
                IconRegular: platform === 'ios' ? _icons.Icon48WritebarSend : _icons.Icon28Send
            };
            break;
        case 'done':
            predefinedIcons = {
                IconCompact: platform === 'ios' ? _icons.Icon48WritebarDone : _icons.Icon24CheckCircleOutline,
                IconRegular: platform === 'ios' ? _icons.Icon48WritebarDone : _icons.Icon28CheckCircleOutline
            };
            break;
        default:
            break;
    }
    const label = labelProp !== null && labelProp !== void 0 ? labelProp : mode && predefinedLabel[mode];
    if (process.env.NODE_ENV === 'development') {
        /* istanbul ignore next: проверка в dev mode, тест на hasAccessibleName() есть в lib/accessibility.test.tsx */ const isAccessible = (0, _accessibility.hasAccessibleName)(_object_spread._({
            children: [
                children,
                label
            ]
        }, restProps));
        if (!isAccessible) {
            warn(_warnOnce.COMMON_WARNINGS.a11y['button-name'], 'error');
        }
    }
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "button",
        hasHover: false,
        activeMode: "vkuiWriteBarIcon__active",
        className: (0, _vkjs.classNames)("vkuiWriteBarIcon", platform === 'ios' && "vkuiWriteBarIcon--ios", mode === 'send' && "vkuiWriteBarIcon--mode-send", mode === 'done' && "vkuiWriteBarIcon--mode-done", className)
    }), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiWriteBarIcon__in"
    }, label && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, label), predefinedIcons ? /*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, predefinedIcons) : children), (0, _vkjs.hasReactNode)(count) && /*#__PURE__*/ _react.createElement(_Counter.Counter, {
        className: "vkuiWriteBarIcon__counter",
        size: "s"
    }, count));
};

//# sourceMappingURL=WriteBarIcon.js.map