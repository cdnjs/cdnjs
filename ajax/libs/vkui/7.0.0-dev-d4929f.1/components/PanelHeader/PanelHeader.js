'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useAdaptivityConditionalRender } from "../../hooks/useAdaptivityConditionalRender/index.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { FixedLayout } from "../FixedLayout/FixedLayout.js";
import { ModalRootContext } from "../ModalRoot/ModalRootContext.js";
import { OnboardingTooltipContainer } from "../OnboardingTooltip/OnboardingTooltipContainer.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Separator } from "../Separator/Separator.js";
import { Spacing } from "../Spacing/Spacing.js";
import { Text } from "../Typography/Text/Text.js";
const platformClassNames = {
    ios: "PanelHeader__ios--iqsEn",
    android: "PanelHeader__android--Kh-wx",
    vkcom: classNames("PanelHeader__vkcom--kdEop", 'vkuiInternalPanelHeader--vkcom')
};
const sizeXClassNames = {
    none: "PanelHeader__sizeXNone--ZTUcr",
    regular: "PanelHeader__sizeXRegular--ynXtE"
};
const sizeYClassNames = {
    none: "PanelHeader__sizeYNone--JgvHd",
    compact: "PanelHeader__sizeYCompact--TUQFx"
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
    const typographyNode = platform === 'vkcom' ? /*#__PURE__*/ _jsx(Text, _object_spread_props(_object_spread({
        weight: "2",
        Component: Component
    }, restProps), {
        children: children
    })) : /*#__PURE__*/ _jsx(Component, _object_spread_props(_object_spread({
        className: "PanelHeader__contentIn--UpuX4"
    }, restProps), {
        children: children
    }));
    return /*#__PURE__*/ _jsxs(OnboardingTooltipContainer, {
        fixed: true,
        className: "PanelHeader__in--hUM-u",
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames("PanelHeader__before--5ih9h", 'vkuiInternalPanelHeader__before'),
                children: before
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "PanelHeader__content--pEgcc",
                children: typographyNode
            }),
            /*#__PURE__*/ _jsx("div", _object_spread({
                className: classNames("PanelHeader__after--GnKXJ", 'vkuiInternalPanelHeader__after')
            }, afterSlotProps))
        ]
    });
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
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("PanelHeader__host--bZFCT", 'vkuiInternalPanelHeader', platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, transparent && "PanelHeader__trnsp--fZ97G", shadow && "PanelHeader__shadow--vrJay", !float && classNames("PanelHeader__static--ACC4Q", 'vkuiInternalPanelHeader--static'), staticSeparatorVisible && classNames("PanelHeader__sep--ojkA3", 'vkuiInternalPanelHeader--sep'), !before && classNames("PanelHeader__noBefore--novDn", 'vkuiInternalPanelHeader--no-before'), !after && "PanelHeader__noAfter--umD3W", isFixed && "PanelHeader__hasFixed--jTKCt", sizeX !== 'compact' && sizeXClassNames[sizeX], sizeY !== 'regular' && sizeYClassNames[sizeY]),
        getRootRef: isFixed ? getRootRef : getRef,
        children: [
            isFixed ? /*#__PURE__*/ _jsx(FixedLayout, {
                className: classNames("PanelHeader__fixed--zAvHW", 'vkuiInternalPanelHeader__fixed'),
                vertical: "top",
                getRootRef: getRef,
                children: /*#__PURE__*/ _jsx(PanelHeaderIn, {
                    before: before,
                    after: after,
                    typographyProps: typographyProps,
                    children: children
                })
            }) : /*#__PURE__*/ _jsx(PanelHeaderIn, {
                before: before,
                after: after,
                typographyProps: typographyProps,
                children: children
            }),
            !isVKCOM && /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    staticSeparatorVisible && adaptiveSizeX.compact && /*#__PURE__*/ _jsx(Separator, {
                        className: adaptiveSizeX.compact.className,
                        padding: true
                    }),
                    staticSpacingVisible && adaptiveSizeX.regular && /*#__PURE__*/ _jsx(Spacing, {
                        className: adaptiveSizeX.regular.className,
                        size: 16
                    })
                ]
            }),
            separatorVisible && isVKCOM && /*#__PURE__*/ _jsx(Separator, {
                className: "PanelHeader__separator--QNDp1"
            })
        ]
    }));
};

//# sourceMappingURL=PanelHeader.js.map