'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
        activeMode: platform === 'ios' ? "ActionSheetItem__active--7kUJI" : undefined,
        className: classNames("ActionSheetItem__host--Qz7Os", platform === 'ios' && "ActionSheetItem__ios--OnK7W", mode === 'cancel' && "ActionSheetItem__modeCancel--Nn1U-", mode === 'destructive' && "ActionSheetItem__modeDestructive--MK97f", sizeY === 'compact' && "ActionSheetItem__sizeYCompact--yOGEw", isRich && "ActionSheetItem__rich--ByAtH", actionSheetMode === 'menu' && "ActionSheetItem__menu--vyHSv", className),
        onKeyDown: onKeyDown,
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: "ActionSheetItem__before--YslHq",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: classNames("ActionSheetItem__container--jIPor", !multiline && "ActionSheetItem__ellipsis--o3oUG"),
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: classNames("ActionSheetItem__content--3aum8", isCentered && "ActionSheetItem__centered--8-PW6"),
                        children: [
                            platform === 'ios' ? /*#__PURE__*/ _jsx(Title, {
                                className: "ActionSheetItem__children--4JlYe",
                                weight: mode === 'cancel' ? '2' : '3',
                                level: isCentered ? '2' : '3',
                                children: children
                            }) : /*#__PURE__*/ _jsx(Text, {
                                className: "ActionSheetItem__children--4JlYe",
                                children: children
                            }),
                            meta && /*#__PURE__*/ _jsx(Text, {
                                className: "ActionSheetItem__meta--i428h",
                                children: meta
                            })
                        ]
                    }),
                    subtitle && /*#__PURE__*/ _jsx(Subhead, {
                        className: "ActionSheetItem__subtitle--P1A6x",
                        children: subtitle
                    })
                ]
            }),
            (selectable || after) && /*#__PURE__*/ _jsxs("div", {
                className: "ActionSheetItem__after--qcnQk",
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