import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { Keys, pressedKey } from '../../lib/accessibility';
import { ActionSheetContext } from '../ActionSheet/ActionSheetContext';
import { Tappable } from '../Tappable/Tappable';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
import { isRealClickEvent } from './helpers';
import { Radio } from './subcomponents/Radio/Radio';
import styles from './ActionSheetItem.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */ export const ActionSheetItem = ({ children, autoCloseDisabled = false, mode = 'default', meta, subtitle, before, after, selectable, value, name, checked, defaultChecked, onChange, onClick, onImmediateClick, multiline = false, iconChecked, className, isCancelItem, ...restProps })=>{
    const platform = usePlatform();
    const { onItemClick = ()=>noop, mode: actionSheetMode, onClose: onActionSheetClose } = React.useContext(ActionSheetContext);
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const Component = selectable ? 'label' : undefined;
    const isRich = subtitle || meta || selectable;
    const isCentered = !isRich && !before && platform === 'ios';
    const onItemClickHandler = React.useCallback((e)=>{
        onItemClick({
            action: onClick,
            immediateAction: onImmediateClick,
            autoClose: !autoCloseDisabled,
            isCancelItem: Boolean(isCancelItem)
        })?.(e);
    }, [
        autoCloseDisabled,
        isCancelItem,
        onClick,
        onImmediateClick,
        onItemClick
    ]);
    const onKeyDown = React.useCallback((event)=>{
        if (pressedKey(event) === Keys.ENTER) {
            onActionSheetClose?.();
        }
    }, [
        onActionSheetClose
    ]);
    const onItemClickImpl = React.useCallback((event)=>{
        if (selectable) {
            if (isRealClickEvent(event)) {
                onItemClickHandler(event);
            }
        } else {
            onItemClickHandler(event);
        }
    }, [
        onItemClickHandler,
        selectable
    ]);
    return /*#__PURE__*/ _jsxs(Tappable, {
        ...Component && {
            Component
        },
        ...restProps,
        onClick: onItemClickImpl,
        activeMode: platform === 'ios' ? styles['ActionSheetItem--active'] : undefined,
        className: classNames(styles['ActionSheetItem'], platform === 'ios' && styles['ActionSheetItem--ios'], mode === 'cancel' && styles['ActionSheetItem--mode-cancel'], mode === 'destructive' && styles['ActionSheetItem--mode-destructive'], sizeY === 'compact' && styles['ActionSheetItem--sizeY-compact'], isRich && styles['ActionSheetItem--rich'], actionSheetMode === 'menu' && styles['ActionSheetItem--menu'], selectable && styles['ActionSheetItem--selectable'], className),
        onKeyDown: onKeyDown,
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: styles['ActionSheetItem__before'],
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: classNames(styles['ActionSheetItem__container'], !multiline && styles['ActionSheetItem--ellipsis']),
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: classNames(styles['ActionSheetItem__content'], isCentered && styles['ActionSheetItem--centered']),
                        children: [
                            platform === 'ios' ? /*#__PURE__*/ _jsx(Title, {
                                className: styles['ActionSheetItem__children'],
                                weight: mode === 'cancel' ? '2' : '3',
                                level: isCentered ? '2' : '3',
                                children: children
                            }) : /*#__PURE__*/ _jsx(Text, {
                                className: styles['ActionSheetItem__children'],
                                children: children
                            }),
                            meta && /*#__PURE__*/ _jsx(Text, {
                                className: styles['ActionSheetItem__meta'],
                                children: meta
                            })
                        ]
                    }),
                    subtitle && /*#__PURE__*/ _jsx(Subhead, {
                        className: styles['ActionSheetItem__subtitle'],
                        children: subtitle
                    })
                ]
            }),
            (selectable || after) && /*#__PURE__*/ _jsxs("div", {
                className: styles['ActionSheetItem__after'],
                children: [
                    after,
                    selectable && /*#__PURE__*/ _jsx(Radio, {
                        name: name,
                        value: value,
                        onChange: onChange,
                        defaultChecked: defaultChecked,
                        checked: checked,
                        disabled: restProps.disabled,
                        children: iconChecked
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=ActionSheetItem.js.map