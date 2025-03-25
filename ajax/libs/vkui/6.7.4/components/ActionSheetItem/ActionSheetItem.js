import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */ export const ActionSheetItem = (_param)=>{
    var { children, autoCloseDisabled = false, mode = 'default', meta, subtitle, before, after, selectable, value, name, checked, defaultChecked, onChange, onClick, onImmediateClick, multiline = false, iconChecked, className, isCancelItem } = _param, restProps = _object_without_properties(_param, [
        "children",
        "autoCloseDisabled",
        "mode",
        "meta",
        "subtitle",
        "before",
        "after",
        "selectable",
        "value",
        "name",
        "checked",
        "defaultChecked",
        "onChange",
        "onClick",
        "onImmediateClick",
        "multiline",
        "iconChecked",
        "className",
        "isCancelItem"
    ]);
    const platform = usePlatform();
    const { onItemClick = ()=>noop, mode: actionSheetMode, onClose: onActionSheetClose } = React.useContext(ActionSheetContext);
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const Component = selectable ? 'label' : undefined;
    const isRich = subtitle || meta || selectable;
    const isCentered = !isRich && !before && platform === 'ios';
    const onItemClickHandler = React.useCallback((e)=>{
        var _onItemClick;
        (_onItemClick = onItemClick({
            action: onClick,
            immediateAction: onImmediateClick,
            autoClose: !autoCloseDisabled,
            isCancelItem: Boolean(isCancelItem)
        })) === null || _onItemClick === void 0 ? void 0 : _onItemClick(e);
    }, [
        autoCloseDisabled,
        isCancelItem,
        onClick,
        onImmediateClick,
        onItemClick
    ]);
    const onKeyDown = React.useCallback((event)=>{
        if (pressedKey(event) === Keys.ENTER) {
            onActionSheetClose === null || onActionSheetClose === void 0 ? void 0 : onActionSheetClose();
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
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({}, Component && {
        Component
    }, restProps), {
        onClick: onItemClickImpl,
        activeMode: platform === 'ios' ? "vkuiActionSheetItem--active" : undefined,
        className: classNames("vkuiActionSheetItem", platform === 'ios' && "vkuiActionSheetItem--ios", mode === 'cancel' && "vkuiActionSheetItem--mode-cancel", mode === 'destructive' && "vkuiActionSheetItem--mode-destructive", sizeY === 'compact' && "vkuiActionSheetItem--sizeY-compact", isRich && "vkuiActionSheetItem--rich", actionSheetMode === 'menu' && "vkuiActionSheetItem--menu", selectable && "vkuiActionSheetItem--selectable", className),
        onKeyDown: onKeyDown,
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: "vkuiActionSheetItem__before",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: classNames("vkuiActionSheetItem__container", !multiline && "vkuiActionSheetItem--ellipsis"),
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: classNames("vkuiActionSheetItem__content", isCentered && "vkuiActionSheetItem--centered"),
                        children: [
                            platform === 'ios' ? /*#__PURE__*/ _jsx(Title, {
                                className: "vkuiActionSheetItem__children",
                                weight: mode === 'cancel' ? '2' : '3',
                                level: isCentered ? '2' : '3',
                                children: children
                            }) : /*#__PURE__*/ _jsx(Text, {
                                className: "vkuiActionSheetItem__children",
                                children: children
                            }),
                            meta && /*#__PURE__*/ _jsx(Text, {
                                className: "vkuiActionSheetItem__meta",
                                children: meta
                            })
                        ]
                    }),
                    subtitle && /*#__PURE__*/ _jsx(Subhead, {
                        className: "vkuiActionSheetItem__subtitle",
                        children: subtitle
                    })
                ]
            }),
            (selectable || after) && /*#__PURE__*/ _jsxs("div", {
                className: "vkuiActionSheetItem__after",
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
    }));
};

//# sourceMappingURL=ActionSheetItem.js.map