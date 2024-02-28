"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelHeader", {
    enumerable: true,
    get: function() {
        return PanelHeader;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _FixedLayout = require("../FixedLayout/FixedLayout");
var _ModalRootContext = require("../ModalRoot/ModalRootContext");
var _RootComponent = require("../RootComponent/RootComponent");
var _Separator = require("../Separator/Separator");
var _Spacing = require("../Spacing/Spacing");
var _TooltipContainer = require("../Tooltip/TooltipContainer");
var _Text = require("../Typography/Text/Text");
var _LegacyPanelHeaderContent = require("./LegacyPanelHeaderContent");
var platformClassNames = {
    ios: (0, _vkjs.classNames)("vkuiPanelHeader--ios", "vkuiInternalPanelHeader--ios"),
    android: (0, _vkjs.classNames)("vkuiPanelHeader--android", "vkuiInternalPanelHeader--android"),
    vkcom: (0, _vkjs.classNames)("vkuiPanelHeader--vkcom", "vkuiInternalPanelHeader--vkcom")
};
var sizeXClassNames = {
    none: "vkuiPanelHeader--sizeX-none",
    regular: "vkuiPanelHeader--sizeX-regular"
};
var PanelHeaderIn = function(param) {
    var before = param.before, after = param.after, separator = param.separator, children = param.children, _param_typographyProps = param.typographyProps, typographyProps = _param_typographyProps === void 0 ? {} : _param_typographyProps;
    var _typographyProps_Component = typographyProps.Component, Component = _typographyProps_Component === void 0 ? "span" : _typographyProps_Component, restProps = _object_without_properties._(typographyProps, [
        "Component"
    ]);
    var _useConfigProvider = (0, _ConfigProviderContext.useConfigProvider)(), hasCustomPanelHeaderAfter = _useConfigProvider.hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth = _useConfigProvider.customPanelHeaderAfterMinWidth;
    var isInsideModal = _react.useContext(_ModalRootContext.ModalRootContext).isInsideModal;
    var platform = (0, _usePlatform.usePlatform)();
    var afterSlotProps = !hasCustomPanelHeaderAfter || isInsideModal ? {
        children: after
    } : {
        style: {
            minWidth: customPanelHeaderAfterMinWidth
        }
    };
    var typographyNode;
    // TODO [>=6]: Удалить условие
    if (/*#__PURE__*/ _react.isValidElement(children) && // eslint-disable-next-line @typescript-eslint/no-use-before-define
    children.type.displayName === _LegacyPanelHeaderContent.LegacyPanelHeaderContent.displayName) {
        typographyNode = children;
    } else {
        typographyNode = platform === _platform.Platform.VKCOM ? /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread._({
            weight: "2",
            Component: Component
        }, restProps), children) : /*#__PURE__*/ _react.createElement(Component, _object_spread._({
            className: "vkuiPanelHeader__content-in"
        }, restProps), children);
    }
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_TooltipContainer.TooltipContainer, {
        fixed: true,
        className: "vkuiPanelHeader__in"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiPanelHeader__before", "vkuiInternalPanelHeader__before")
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeader__content"
    }, typographyNode), /*#__PURE__*/ _react.createElement("div", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiPanelHeader__after", "vkuiInternalPanelHeader__after")
    }, afterSlotProps))), separator && platform === _platform.Platform.VKCOM && /*#__PURE__*/ _react.createElement(_Separator.Separator, {
        className: "vkuiPanelHeader__separator",
        wide: true
    }));
};
var PanelHeader = function(_param) {
    var before = _param.before, children = _param.children, after = _param.after, _param_separator = _param.separator, separator = _param_separator === void 0 ? true : _param_separator, _param_visor = _param.visor, visor = _param_visor === void 0 ? true : _param_visor, _param_transparent = _param.transparent, transparent = _param_transparent === void 0 ? false : _param_transparent, shadow = _param.shadow, getRef = _param.getRef, getRootRef = _param.getRootRef, fixed = _param.fixed, typographyProps = _param.typographyProps, restProps = _object_without_properties._(_param, [
        "before",
        "children",
        "after",
        "separator",
        "visor",
        "transparent",
        "shadow",
        "getRef",
        "getRootRef",
        "fixed",
        "typographyProps"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    var _useAdaptivityConditionalRender1 = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)(), adaptiveSizeX = _useAdaptivityConditionalRender1.sizeX;
    var isFixed = fixed !== undefined ? fixed : platform !== _platform.Platform.VKCOM;
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiPanelHeader", "vkuiInternalPanelHeader", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, transparent && "vkuiPanelHeader--trnsp", shadow && "vkuiPanelHeader--shadow", visor && (0, _vkjs.classNames)("vkuiPanelHeader--vis", "vkuiInternalPanelHeader--vis"), separator && visor && (0, _vkjs.classNames)("vkuiPanelHeader--sep", "vkuiInternalPanelHeader--sep"), !before && (0, _vkjs.classNames)("vkuiPanelHeader--no-before", "vkuiInternalPanelHeader--no-before"), !after && "vkuiPanelHeader--no-after", isFixed && "vkuiPanelHeader--fixed", sizeX !== _adaptivity.SizeType.COMPACT && sizeXClassNames[sizeX]),
        getRootRef: isFixed ? getRootRef : getRef
    }), isFixed ? /*#__PURE__*/ _react.createElement(_FixedLayout.FixedLayout, {
        className: (0, _vkjs.classNames)("vkuiPanelHeader__fixed", "vkuiInternalPanelHeader__fixed"),
        vertical: "top",
        getRootRef: getRef
    }, /*#__PURE__*/ _react.createElement(PanelHeaderIn, {
        before: before,
        after: after,
        separator: separator,
        typographyProps: typographyProps
    }, children)) : /*#__PURE__*/ _react.createElement(PanelHeaderIn, {
        before: before,
        after: after,
        separator: separator,
        typographyProps: typographyProps
    }, children), separator && visor && platform !== _platform.Platform.VKCOM && /*#__PURE__*/ _react.createElement(_react.Fragment, null, adaptiveSizeX.compact && /*#__PURE__*/ _react.createElement(_Separator.Separator, {
        className: adaptiveSizeX.compact.className
    }), adaptiveSizeX.regular && /*#__PURE__*/ _react.createElement(_Spacing.Spacing, {
        className: adaptiveSizeX.regular.className,
        size: 16
    })));
};
PanelHeader.Content = _LegacyPanelHeaderContent.LegacyPanelHeaderContent;

//# sourceMappingURL=PanelHeader.js.map