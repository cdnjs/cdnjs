import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
import { usePlatform } from '../../hooks/usePlatform';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { FixedLayout } from '../FixedLayout/FixedLayout';
import { ModalRootContext } from '../ModalRoot/ModalRootContext';
import { OnboardingTooltipContainer } from '../OnboardingTooltip/OnboardingTooltipContainer';
import { RootComponent } from '../RootComponent/RootComponent';
import { Separator } from '../Separator/Separator';
import { Spacing } from '../Spacing/Spacing';
import { Text } from '../Typography/Text/Text';
const platformClassNames = {
    ios: "vkuiPanelHeader--ios",
    android: "vkuiPanelHeader--android",
    vkcom: classNames("vkuiPanelHeader--vkcom", 'vkuiInternalPanelHeader--vkcom')
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
    const { Component = 'span' } = typographyProps, restProps = _object_without_properties(typographyProps, [
        "Component"
    ]);
    const { hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth } = useConfigProvider();
    const { isInsideModal } = React.useContext(ModalRootContext);
    const platform = usePlatform();
    const afterSlotProps = !hasCustomPanelHeaderAfter || isInsideModal ? {
        children: after
    } : {
        style: {
            minWidth: customPanelHeaderAfterMinWidth
        }
    };
    const typographyNode = platform === 'vkcom' ? /*#__PURE__*/ React.createElement(Text, _object_spread({
        weight: "2",
        Component: Component
    }, restProps), children) : /*#__PURE__*/ React.createElement(Component, _object_spread({
        className: "vkuiPanelHeader__content-in"
    }, restProps), children);
    return /*#__PURE__*/ React.createElement(OnboardingTooltipContainer, {
        fixed: true,
        className: "vkuiPanelHeader__in"
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiPanelHeader__before", 'vkuiInternalPanelHeader__before')
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanelHeader__content"
    }, typographyNode), /*#__PURE__*/ React.createElement("div", _object_spread({
        className: classNames("vkuiPanelHeader__after", 'vkuiInternalPanelHeader__after')
    }, afterSlotProps)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeader
 */ export const PanelHeader = (_param)=>{
    var { before, children, after, float = false, transparent = false, delimiter = 'auto', shadow, getRef, getRootRef, fixed, typographyProps } = _param, restProps = _object_without_properties(_param, [
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
    const platform = usePlatform();
    const { sizeX = 'none', sizeY = 'none' } = useAdaptivity();
    const { sizeX: adaptiveSizeX } = useAdaptivityConditionalRender();
    const isVKCOM = platform === 'vkcom';
    const isFixed = fixed !== undefined ? fixed : !isVKCOM;
    const separatorVisible = delimiter === 'auto' || delimiter === 'separator';
    const staticSeparatorVisible = !float && separatorVisible;
    const staticSpacingVisible = !float && (delimiter === 'auto' || delimiter === 'spacing');
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiPanelHeader", 'vkuiInternalPanelHeader', platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, transparent && "vkuiPanelHeader--trnsp", shadow && "vkuiPanelHeader--shadow", !float && classNames("vkuiPanelHeader--static", 'vkuiInternalPanelHeader--static'), staticSeparatorVisible && classNames("vkuiPanelHeader--sep", 'vkuiInternalPanelHeader--sep'), !before && classNames("vkuiPanelHeader--no-before", 'vkuiInternalPanelHeader--no-before'), !after && "vkuiPanelHeader--no-after", isFixed && "vkuiPanelHeader--fixed", sizeX !== 'compact' && sizeXClassNames[sizeX], sizeY !== 'regular' && sizeYClassNames[sizeY]),
        getRootRef: isFixed ? getRootRef : getRef
    }), isFixed ? /*#__PURE__*/ React.createElement(FixedLayout, {
        className: classNames("vkuiPanelHeader__fixed", 'vkuiInternalPanelHeader__fixed'),
        vertical: "top",
        getRootRef: getRef
    }, /*#__PURE__*/ React.createElement(PanelHeaderIn, {
        before: before,
        after: after,
        typographyProps: typographyProps
    }, children)) : /*#__PURE__*/ React.createElement(PanelHeaderIn, {
        before: before,
        after: after,
        typographyProps: typographyProps
    }, children), !isVKCOM && /*#__PURE__*/ React.createElement(React.Fragment, null, staticSeparatorVisible && adaptiveSizeX.compact && /*#__PURE__*/ React.createElement(Separator, {
        className: adaptiveSizeX.compact.className
    }), staticSpacingVisible && adaptiveSizeX.regular && /*#__PURE__*/ React.createElement(Spacing, {
        className: adaptiveSizeX.regular.className,
        size: 16
    })), separatorVisible && isVKCOM && /*#__PURE__*/ React.createElement(Separator, {
        className: "vkuiPanelHeader__separator",
        wide: true
    }));
};

//# sourceMappingURL=PanelHeader.js.map