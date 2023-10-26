"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Group", {
    enumerable: true,
    get: function() {
        return Group;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _AppRootContext = require("../AppRoot/AppRootContext");
var _ModalRootContext = require("../ModalRoot/ModalRootContext");
var _RootComponent = require("../RootComponent/RootComponent");
var _Separator = require("../Separator/Separator");
var _Spacing = require("../Spacing/Spacing");
var _Footnote = require("../Typography/Footnote/Footnote");
var sizeXClassNames = _define_property._({
    none: (0, _vkjs.classNames)("vkuiGroup--sizeX-none", "vkuiInternalGroup--sizeX-none")
}, _adaptivity.SizeType.COMPACT, "vkuiGroup--sizeX-compact");
var stylesMode = {
    none: (0, _vkjs.classNames)("vkuiGroup--mode-none", "vkuiInternalGroup--mode-none"),
    plain: (0, _vkjs.classNames)("vkuiGroup--mode-plain", "vkuiInternalGroup--mode-plain"),
    card: (0, _vkjs.classNames)("vkuiGroup--mode-card", "vkuiInternalGroup--mode-card")
};
var stylesPadding = {
    s: "vkuiGroup--padding-s",
    m: "vkuiGroup--padding-m"
};
/**
 * Вычисляем mode для Group.
 */ function useGroupMode(forcedMode, sizeX, isInsideModal) {
    var layout = _react.useContext(_AppRootContext.AppRootContext).layout;
    if (forcedMode) {
        return forcedMode;
    }
    if (isInsideModal) {
        return "plain";
    }
    if (layout) {
        return layout;
    }
    if (sizeX !== "none") {
        return sizeX === _adaptivity.SizeType.REGULAR ? "card" : "plain";
    }
    return "none";
}
var warn = (0, _warnOnce.warnOnce)("Group");
var Group = function(_param) {
    var header = _param.header, description = _param.description, children = _param.children, _param_separator = _param.separator, separator = _param_separator === void 0 ? "auto" : _param_separator, modeProps = _param.mode, _param_padding = _param.padding, padding = _param_padding === void 0 ? "m" : _param_padding, tabIndexProp = _param.tabIndex, restProps = _object_without_properties._(_param, [
        "header",
        "description",
        "children",
        "separator",
        "mode",
        "padding",
        "tabIndex"
    ]);
    var isInsideModal = _react.useContext(_ModalRootContext.ModalRootContext).isInsideModal;
    var platform = (0, _usePlatform.usePlatform)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    var mode = useGroupMode(modeProps, sizeX, isInsideModal);
    var isTabPanel = restProps.role === "tabpanel";
    if (process.env.NODE_ENV === "development" && isTabPanel && (!restProps["aria-controls"] || !restProps["id"])) {
        warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
    }
    var tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "section"
    }, restProps), {
        tabIndex: tabIndex,
        baseClassName: (0, _vkjs.classNames)("vkuiInternalGroup", "vkuiGroup", isInsideModal && "vkuiGroup--inside-modal", platform === _platform.Platform.IOS && "vkuiGroup--ios", sizeX !== _adaptivity.SizeType.REGULAR && sizeXClassNames[sizeX], mode && stylesMode[mode], stylesPadding[padding])
    }), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiGroup__header"
    }, header), children, (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiGroup__description"
    }, description)), separator !== "hide" && /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_Spacing.Spacing, {
        className: (0, _vkjs.classNames)("vkuiGroup__separator", "vkuiGroup__separator--spacing"),
        size: 16
    }), /*#__PURE__*/ _react.createElement(_Separator.Separator, {
        className: (0, _vkjs.classNames)("vkuiGroup__separator", "vkuiGroup__separator--separator", separator === "show" && "vkuiGroup__separator--force")
    })));
};

//# sourceMappingURL=Group.js.map