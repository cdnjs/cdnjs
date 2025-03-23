import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
import styles from './PanelHeader.module.css';
const platformClassNames = {
    ios: styles['PanelHeader--ios'],
    android: styles['PanelHeader--android'],
    vkcom: classNames(styles['PanelHeader--vkcom'], 'vkuiInternalPanelHeader--vkcom')
};
const sizeXClassNames = {
    none: styles['PanelHeader--sizeX-none'],
    regular: styles['PanelHeader--sizeX-regular']
};
const sizeYClassNames = {
    none: styles['PanelHeader--sizeY-none'],
    compact: styles['PanelHeader--sizeY-compact']
};
const PanelHeaderIn = ({ before, after, children, typographyProps = {} })=>{
    const { Component = 'span', ...restProps } = typographyProps;
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
    const typographyNode = platform === 'vkcom' ? /*#__PURE__*/ _jsx(Text, {
        weight: "2",
        Component: Component,
        ...restProps,
        children: children
    }) : /*#__PURE__*/ _jsx(Component, {
        className: styles['PanelHeader__content-in'],
        ...restProps,
        children: children
    });
    return /*#__PURE__*/ _jsxs(OnboardingTooltipContainer, {
        fixed: true,
        className: styles['PanelHeader__in'],
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles['PanelHeader__before'], 'vkuiInternalPanelHeader__before'),
                children: before
            }),
            /*#__PURE__*/ _jsx("div", {
                className: styles['PanelHeader__content'],
                children: typographyNode
            }),
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles['PanelHeader__after'], 'vkuiInternalPanelHeader__after'),
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
        baseClassName: classNames(styles['PanelHeader'], 'vkuiInternalPanelHeader', platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, transparent && styles['PanelHeader--trnsp'], shadow && styles['PanelHeader--shadow'], !float && classNames(styles['PanelHeader--static'], 'vkuiInternalPanelHeader--static'), staticSeparatorVisible && classNames(styles['PanelHeader--sep'], 'vkuiInternalPanelHeader--sep'), !before && classNames(styles['PanelHeader--no-before'], 'vkuiInternalPanelHeader--no-before'), !after && styles['PanelHeader--no-after'], isFixed && styles['PanelHeader--fixed'], sizeX !== 'compact' && sizeXClassNames[sizeX], sizeY !== 'regular' && sizeYClassNames[sizeY]),
        getRootRef: isFixed ? getRootRef : getRef,
        children: [
            isFixed ? /*#__PURE__*/ _jsx(FixedLayout, {
                className: classNames(styles['PanelHeader__fixed'], 'vkuiInternalPanelHeader__fixed'),
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
                        className: adaptiveSizeX.compact.className
                    }),
                    staticSpacingVisible && adaptiveSizeX.regular && /*#__PURE__*/ _jsx(Spacing, {
                        className: adaptiveSizeX.regular.className,
                        size: 16
                    })
                ]
            }),
            separatorVisible && isVKCOM && /*#__PURE__*/ _jsx(Separator, {
                className: styles['PanelHeader__separator'],
                wide: true
            })
        ]
    });
};

//# sourceMappingURL=PanelHeader.js.map