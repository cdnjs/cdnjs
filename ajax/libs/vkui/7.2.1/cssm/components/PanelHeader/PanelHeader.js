'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useModalContext } from "../../context/ModalContext.js";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useAdaptivityConditionalRender } from "../../hooks/useAdaptivityConditionalRender/index.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { FixedLayout } from "../FixedLayout/FixedLayout.js";
import { OnboardingTooltipContainer } from "../OnboardingTooltip/OnboardingTooltipContainer.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Separator } from "../Separator/Separator.js";
import { Spacing } from "../Spacing/Spacing.js";
import { Text } from "../Typography/Text/Text.js";
import styles from "./PanelHeader.module.css";
const platformClassNames = {
    ios: styles.ios,
    android: styles.android,
    vkcom: classNames(styles.vkcom, 'vkuiInternalPanelHeader--vkcom')
};
const sizeXClassNames = {
    none: styles.sizeXNone,
    regular: styles.sizeXRegular
};
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
const PanelHeaderIn = ({ before, after, children, typographyProps = {} })=>{
    const { Component = 'span', ...restProps } = typographyProps;
    const { hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth } = useConfigProvider();
    const isInsideModal = useModalContext().id !== null;
    const platform = usePlatform();
    const afterSlotProps = !hasCustomPanelHeaderAfter || isInsideModal ? {
        children: after
    } : {
        style: {
            minWidth: customPanelHeaderAfterMinWidth
        }
    };
    const typographyNode = platform === 'vkcom' ? /*#__PURE__*/ _jsx(Text, {
        weight: "2",
        Component: Component,
        ...restProps,
        children: children
    }) : /*#__PURE__*/ _jsx(Component, {
        className: styles.contentIn,
        ...restProps,
        children: children
    });
    return /*#__PURE__*/ _jsxs(OnboardingTooltipContainer, {
        fixed: true,
        className: styles.in,
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles.before, 'vkuiInternalPanelHeader__before'),
                children: before
            }),
            /*#__PURE__*/ _jsx("div", {
                className: styles.content,
                children: typographyNode
            }),
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles.after, 'vkuiInternalPanelHeader__after'),
                ...afterSlotProps
            })
        ]
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeader
 */ export const PanelHeader = ({ before, children, after, float = false, transparent = false, delimiter = 'auto', shadow, getRef, getRootRef, fixed, typographyProps, ...restProps })=>{
    const platform = usePlatform();
    const { sizeX = 'none', sizeY = 'none' } = useAdaptivity();
    const { sizeX: adaptiveSizeX } = useAdaptivityConditionalRender();
    const isVKCOM = platform === 'vkcom';
    const isFixed = fixed !== undefined ? fixed : !isVKCOM;
    const separatorVisible = delimiter === 'auto' || delimiter === 'separator';
    const staticSeparatorVisible = !float && separatorVisible;
    const staticSpacingVisible = !float && (delimiter === 'auto' || delimiter === 'spacing');
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, 'vkuiInternalPanelHeader', platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, transparent && styles.trnsp, shadow && styles.shadow, !float && classNames(styles.static, 'vkuiInternalPanelHeader--static'), staticSeparatorVisible && classNames(styles.sep, 'vkuiInternalPanelHeader--sep'), !before && classNames(styles.noBefore, 'vkuiInternalPanelHeader--no-before'), !after && styles.noAfter, isFixed && styles.hasFixed, sizeX !== 'compact' && sizeXClassNames[sizeX], sizeY !== 'regular' && sizeYClassNames[sizeY]),
        getRootRef: isFixed ? getRootRef : getRef,
        children: [
            isFixed ? /*#__PURE__*/ _jsx(FixedLayout, {
                className: classNames(styles.fixed, 'vkuiInternalPanelHeader__fixed'),
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
                className: styles.separator
            })
        ]
    });
};

//# sourceMappingURL=PanelHeader.js.map