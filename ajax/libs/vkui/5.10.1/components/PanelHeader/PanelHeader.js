import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useAdaptivityConditionalRender } from "../../hooks/useAdaptivityConditionalRender";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext";
import { FixedLayout } from "../FixedLayout/FixedLayout";
import { ModalRootContext } from "../ModalRoot/ModalRootContext";
import { RootComponent } from "../RootComponent/RootComponent";
import { Separator } from "../Separator/Separator";
import { Spacing } from "../Spacing/Spacing";
import { TooltipContainer } from "../Tooltip/TooltipContainer";
import { Text } from "../Typography/Text/Text";
import { LegacyPanelHeaderContent } from "./LegacyPanelHeaderContent";
var platformClassNames = {
    ios: classNames("vkuiPanelHeader--ios", "vkuiInternalPanelHeader--ios"),
    android: classNames("vkuiPanelHeader--android", "vkuiInternalPanelHeader--android"),
    vkcom: classNames("vkuiPanelHeader--vkcom", "vkuiInternalPanelHeader--vkcom")
};
var sizeXClassNames = {
    none: "vkuiPanelHeader--sizeX-none",
    regular: "vkuiPanelHeader--sizeX-regular"
};
var PanelHeaderIn = function(param) {
    var before = param.before, after = param.after, separator = param.separator, children = param.children, _param_typographyProps = param.typographyProps, typographyProps = _param_typographyProps === void 0 ? {} : _param_typographyProps;
    var _typographyProps_Component = typographyProps.Component, Component = _typographyProps_Component === void 0 ? "span" : _typographyProps_Component, restProps = _object_without_properties(typographyProps, [
        "Component"
    ]);
    var _useConfigProvider = useConfigProvider(), hasCustomPanelHeaderAfter = _useConfigProvider.hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth = _useConfigProvider.customPanelHeaderAfterMinWidth;
    var isInsideModal = React.useContext(ModalRootContext).isInsideModal;
    var platform = usePlatform();
    var afterSlotProps = !hasCustomPanelHeaderAfter || isInsideModal ? {
        children: after
    } : {
        style: {
            minWidth: customPanelHeaderAfterMinWidth
        }
    };
    var typographyNode;
    // TODO [>=6]: Удалить условие
    if (/*#__PURE__*/ React.isValidElement(children) && // eslint-disable-next-line @typescript-eslint/no-use-before-define
    children.type.displayName === LegacyPanelHeaderContent.displayName) {
        typographyNode = children;
    } else {
        typographyNode = platform === Platform.VKCOM ? /*#__PURE__*/ React.createElement(Text, _object_spread({
            weight: "2",
            Component: Component
        }, restProps), children) : /*#__PURE__*/ React.createElement(Component, _object_spread({
            className: "vkuiPanelHeader__content-in"
        }, restProps), children);
    }
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(TooltipContainer, {
        fixed: true,
        className: "vkuiPanelHeader__in"
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiPanelHeader__before", "vkuiInternalPanelHeader__before")
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanelHeader__content"
    }, typographyNode), /*#__PURE__*/ React.createElement("div", _object_spread({
        className: classNames("vkuiPanelHeader__after", "vkuiInternalPanelHeader__after")
    }, afterSlotProps))), separator && platform === Platform.VKCOM && /*#__PURE__*/ React.createElement(Separator, {
        className: "vkuiPanelHeader__separator",
        wide: true
    }));
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeader
 */ export var PanelHeader = function(_param) {
    var before = _param.before, children = _param.children, after = _param.after, _param_separator = _param.separator, separator = _param_separator === void 0 ? true : _param_separator, _param_visor = _param.visor, visor = _param_visor === void 0 ? true : _param_visor, _param_transparent = _param.transparent, transparent = _param_transparent === void 0 ? false : _param_transparent, shadow = _param.shadow, getRef = _param.getRef, getRootRef = _param.getRootRef, fixed = _param.fixed, typographyProps = _param.typographyProps, restProps = _object_without_properties(_param, [
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
    var platform = usePlatform();
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeX = _useAdaptivity.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    var _useAdaptivityConditionalRender = useAdaptivityConditionalRender(), adaptiveSizeX = _useAdaptivityConditionalRender.sizeX;
    var isFixed = fixed !== undefined ? fixed : platform !== Platform.VKCOM;
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiPanelHeader", "vkuiInternalPanelHeader", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, transparent && "vkuiPanelHeader--trnsp", shadow && "vkuiPanelHeader--shadow", visor && classNames("vkuiPanelHeader--vis", "vkuiInternalPanelHeader--vis"), separator && visor && classNames("vkuiPanelHeader--sep", "vkuiInternalPanelHeader--sep"), !before && classNames("vkuiPanelHeader--no-before", "vkuiInternalPanelHeader--no-before"), !after && "vkuiPanelHeader--no-after", isFixed && "vkuiPanelHeader--fixed", sizeX !== SizeType.COMPACT && sizeXClassNames[sizeX]),
        getRootRef: isFixed ? getRootRef : getRef
    }), isFixed ? /*#__PURE__*/ React.createElement(FixedLayout, {
        className: classNames("vkuiPanelHeader__fixed", "vkuiInternalPanelHeader__fixed"),
        vertical: "top",
        getRootRef: getRef
    }, /*#__PURE__*/ React.createElement(PanelHeaderIn, {
        before: before,
        after: after,
        separator: separator,
        typographyProps: typographyProps
    }, children)) : /*#__PURE__*/ React.createElement(PanelHeaderIn, {
        before: before,
        after: after,
        separator: separator,
        typographyProps: typographyProps
    }, children), separator && visor && platform !== Platform.VKCOM && /*#__PURE__*/ React.createElement(React.Fragment, null, adaptiveSizeX.compact && /*#__PURE__*/ React.createElement(Separator, {
        className: adaptiveSizeX.compact.className
    }), adaptiveSizeX.regular && /*#__PURE__*/ React.createElement(Spacing, {
        className: adaptiveSizeX.regular.className,
        size: 16
    })));
};
PanelHeader.Content = LegacyPanelHeaderContent;

//# sourceMappingURL=PanelHeader.js.map