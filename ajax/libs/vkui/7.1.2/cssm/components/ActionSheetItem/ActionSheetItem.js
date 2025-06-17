'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { Keys, pressedKey } from "../../lib/accessibility.js";
import { ActionSheetContext } from "../ActionSheet/ActionSheetContext.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { Text } from "../Typography/Text/Text.js";
import { Title } from "../Typography/Title/Title.js";
import { isRealClickEvent } from "./helpers.js";
import { Radio } from "./subcomponents/Radio/Radio.js";
import styles from "./ActionSheetItem.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */ export const ActionSheetItem = ({ children, autoCloseDisabled = false, mode = 'default', meta, subtitle, before, after, selectable, value, name, checked, defaultChecked, onChange, onClick, onImmediateClick, multiline = false, iconChecked, isCancelItem, ...restProps })=>{
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
        activeMode: platform === 'ios' ? styles.active : undefined,
        baseClassName: classNames(styles.host, platform === 'ios' && styles.ios, mode === 'cancel' && styles.modeCancel, mode === 'destructive' && styles.modeDestructive, sizeY === 'compact' && styles.sizeYCompact, isRich && styles.rich, actionSheetMode === 'menu' && styles.menu),
        onKeyDown: onKeyDown,
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: styles.before,
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: classNames(styles.container, !multiline && styles.ellipsis),
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: classNames(styles.content, isCentered && styles.centered),
                        children: [
                            platform === 'ios' ? /*#__PURE__*/ _jsx(Title, {
                                className: styles.children,
                                weight: mode === 'cancel' ? '2' : '3',
                                level: isCentered ? '2' : '3',
                                children: children
                            }) : /*#__PURE__*/ _jsx(Text, {
                                className: styles.children,
                                children: children
                            }),
                            meta && /*#__PURE__*/ _jsx(Text, {
                                className: styles.meta,
                                children: meta
                            })
                        ]
                    }),
                    subtitle && /*#__PURE__*/ _jsx(Subhead, {
                        className: styles.subtitle,
                        children: subtitle
                    })
                ]
            }),
            (selectable || after) && /*#__PURE__*/ _jsxs("div", {
                className: styles.after,
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