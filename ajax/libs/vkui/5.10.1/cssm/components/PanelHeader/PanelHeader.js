import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { FixedLayout } from '../FixedLayout/FixedLayout';
import { ModalRootContext } from '../ModalRoot/ModalRootContext';
import { RootComponent } from '../RootComponent/RootComponent';
import { Separator } from '../Separator/Separator';
import { Spacing } from '../Spacing/Spacing';
import { TooltipContainer } from '../Tooltip/TooltipContainer';
import { Text } from '../Typography/Text/Text';
import { LegacyPanelHeaderContent } from './LegacyPanelHeaderContent';
import styles from './PanelHeader.module.css';
const platformClassNames = {
    ios: classNames(styles['PanelHeader--ios'], 'vkuiInternalPanelHeader--ios'),
    android: classNames(styles['PanelHeader--android'], 'vkuiInternalPanelHeader--android'),
    vkcom: classNames(styles['PanelHeader--vkcom'], 'vkuiInternalPanelHeader--vkcom')
};
const sizeXClassNames = {
    none: styles['PanelHeader--sizeX-none'],
    regular: styles['PanelHeader--sizeX-regular']
};
const PanelHeaderIn = ({ before, after, separator, children, typographyProps = {} })=>{
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
    let typographyNode;
    // TODO [>=6]: Удалить условие
    if (/*#__PURE__*/ React.isValidElement(children) && // eslint-disable-next-line @typescript-eslint/no-use-before-define
    children.type.displayName === LegacyPanelHeaderContent.displayName) {
        typographyNode = children;
    } else {
        typographyNode = platform === Platform.VKCOM ? /*#__PURE__*/ React.createElement(Text, {
            weight: "2",
            Component: Component,
            ...restProps
        }, children) : /*#__PURE__*/ React.createElement(Component, {
            className: styles['PanelHeader__content-in'],
            ...restProps
        }, children);
    }
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(TooltipContainer, {
        fixed: true,
        className: styles['PanelHeader__in']
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['PanelHeader__before'], 'vkuiInternalPanelHeader__before')
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: styles['PanelHeader__content']
    }, typographyNode), /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['PanelHeader__after'], 'vkuiInternalPanelHeader__after'),
        ...afterSlotProps
    })), separator && platform === Platform.VKCOM && /*#__PURE__*/ React.createElement(Separator, {
        className: styles['PanelHeader__separator'],
        wide: true
    }));
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeader
 */ export const PanelHeader = ({ before, children, after, separator = true, visor = true, transparent = false, shadow, getRef, getRootRef, fixed, typographyProps, ...restProps })=>{
    const platform = usePlatform();
    const { sizeX = 'none' } = useAdaptivity();
    const { sizeX: adaptiveSizeX } = useAdaptivityConditionalRender();
    let isFixed = fixed !== undefined ? fixed : platform !== Platform.VKCOM;
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['PanelHeader'], 'vkuiInternalPanelHeader', platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, transparent && styles['PanelHeader--trnsp'], shadow && styles['PanelHeader--shadow'], visor && classNames(styles['PanelHeader--vis'], 'vkuiInternalPanelHeader--vis'), separator && visor && classNames(styles['PanelHeader--sep'], 'vkuiInternalPanelHeader--sep'), !before && classNames(styles['PanelHeader--no-before'], 'vkuiInternalPanelHeader--no-before'), !after && styles['PanelHeader--no-after'], isFixed && styles['PanelHeader--fixed'], sizeX !== SizeType.COMPACT && sizeXClassNames[sizeX]),
        getRootRef: isFixed ? getRootRef : getRef
    }, isFixed ? /*#__PURE__*/ React.createElement(FixedLayout, {
        className: classNames(styles['PanelHeader__fixed'], 'vkuiInternalPanelHeader__fixed'),
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