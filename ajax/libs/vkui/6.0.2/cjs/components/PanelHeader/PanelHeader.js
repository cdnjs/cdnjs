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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
const _usePlatform = require("../../hooks/usePlatform");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _FixedLayout = require("../FixedLayout/FixedLayout");
const _ModalRootContext = require("../ModalRoot/ModalRootContext");
const _OnboardingTooltipContainer = require("../OnboardingTooltip/OnboardingTooltipContainer");
const _RootComponent = require("../RootComponent/RootComponent");
const _Separator = require("../Separator/Separator");
const _Spacing = require("../Spacing/Spacing");
const _Text = require("../Typography/Text/Text");
const platformClassNames = {
    ios: "vkuiPanelHeader--ios",
    android: "vkuiPanelHeader--android",
    vkcom: (0, _vkjs.classNames)("vkuiPanelHeader--vkcom", 'vkuiInternalPanelHeader--vkcom')
};
const sizeXClassNames = {
    none: "vkuiPanelHeader--sizeX-none",
    regular: "vkuiPanelHeader--sizeX-regular"
};
const sizeYClassNames = {
    none: "vkuiPanelHeader--sizeY-none",
    compact: "vkuiPanelHeader--sizeY-compact"
};
const PanelHeaderIn = ({ before, after, children, typographyProps = {} })=>{
    const { Component = 'span' } = typographyProps, restProps = _object_without_properties._(typographyProps, [
        "Component"
    ]);
    const { hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth } = (0, _ConfigProviderContext.useConfigProvider)();
    const { isInsideModal } = _react.useContext(_ModalRootContext.ModalRootContext);
    const platform = (0, _usePlatform.usePlatform)();
    const afterSlotProps = !hasCustomPanelHeaderAfter || isInsideModal ? {
        children: after
    } : {
        style: {
            minWidth: customPanelHeaderAfterMinWidth
        }
    };
    const typographyNode = platform === 'vkcom' ? /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread._({
        weight: "2",
        Component: Component
    }, restProps), children) : /*#__PURE__*/ _react.createElement(Component, _object_spread._({
        className: "vkuiPanelHeader__content-in"
    }, restProps), children);
    return /*#__PURE__*/ _react.createElement(_OnboardingTooltipContainer.OnboardingTooltipContainer, {
        fixed: true,
        className: "vkuiPanelHeader__in"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiPanelHeader__before", 'vkuiInternalPanelHeader__before')
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeader__content"
    }, typographyNode), /*#__PURE__*/ _react.createElement("div", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiPanelHeader__after", 'vkuiInternalPanelHeader__after')
    }, afterSlotProps)));
};
const PanelHeader = (_param)=>{
    var { before, children, after, float = false, transparent = false, delimiter = 'auto', shadow, getRef, getRootRef, fixed, typographyProps } = _param, restProps = _object_without_properties._(_param, [
        "before",
        "children",
        "after",
        "float",
        "transparent",
        "delimiter",
        "shadow",
        "getRef",
        "getRootRef",
        "fixed",
        "typographyProps"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { sizeX = 'none', sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const { sizeX: adaptiveSizeX } = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)();
    const isVKCOM = platform === 'vkcom';
    const isFixed = fixed !== undefined ? fixed : !isVKCOM;
    const separatorVisible = delimiter === 'auto' || delimiter === 'separator';
    const staticSeparatorVisible = !float && separatorVisible;
    const staticSpacingVisible = !float && (delimiter === 'auto' || delimiter === 'spacing');
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiPanelHeader", 'vkuiInternalPanelHeader', platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, transparent && "vkuiPanelHeader--trnsp", shadow && "vkuiPanelHeader--shadow", !float && (0, _vkjs.classNames)("vkuiPanelHeader--static", 'vkuiInternalPanelHeader--static'), staticSeparatorVisible && (0, _vkjs.classNames)("vkuiPanelHeader--sep", 'vkuiInternalPanelHeader--sep'), !before && (0, _vkjs.classNames)("vkuiPanelHeader--no-before", 'vkuiInternalPanelHeader--no-before'), !after && "vkuiPanelHeader--no-after", isFixed && "vkuiPanelHeader--fixed", sizeX !== 'compact' && sizeXClassNames[sizeX], sizeY !== 'regular' && sizeYClassNames[sizeY]),
        getRootRef: isFixed ? getRootRef : getRef
    }), isFixed ? /*#__PURE__*/ _react.createElement(_FixedLayout.FixedLayout, {
        className: (0, _vkjs.classNames)("vkuiPanelHeader__fixed", 'vkuiInternalPanelHeader__fixed'),
        vertical: "top",
        getRootRef: getRef
    }, /*#__PURE__*/ _react.createElement(PanelHeaderIn, {
        before: before,
        after: after,
        typographyProps: typographyProps
    }, children)) : /*#__PURE__*/ _react.createElement(PanelHeaderIn, {
        before: before,
        after: after,
        typographyProps: typographyProps
    }, children), !isVKCOM && /*#__PURE__*/ _react.createElement(_react.Fragment, null, staticSeparatorVisible && adaptiveSizeX.compact && /*#__PURE__*/ _react.createElement(_Separator.Separator, {
        className: adaptiveSizeX.compact.className
    }), staticSpacingVisible && adaptiveSizeX.regular && /*#__PURE__*/ _react.createElement(_Spacing.Spacing, {
        className: adaptiveSizeX.regular.className,
        size: 16
    })), separatorVisible && isVKCOM && /*#__PURE__*/ _react.createElement(_Separator.Separator, {
        className: "vkuiPanelHeader__separator",
        wide: true
    }));
};

//# sourceMappingURL=PanelHeader.js.map