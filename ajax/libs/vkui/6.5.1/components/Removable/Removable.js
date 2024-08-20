import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon24Cancel } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { getTextFromChildren } from '../../lib/children';
import { useDOM } from '../../lib/dom';
import { IconButton } from '../IconButton/IconButton';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/RemovableIos
 */ const RemovableIos = ({ onRemove, removePlaceholder, removePlaceholderString, children: childrenProp, toggleButtonTestId, removeButtonTestId, disabled })=>{
    const { window } = useDOM();
    const removeButtonRef = React.useRef(null);
    const disabledRef = React.useRef(true);
    const [removeOffset, updateRemoveOffset] = React.useState(0);
    useGlobalEventListener(window, 'click', ()=>{
        if (removeOffset > 0) {
            updateRemoveOffset(0);
        }
    }, {
        capture: true
    });
    const onRemoveTransitionEnd = ()=>{
        if (removeOffset > 0) {
            var _removeButtonRef_current;
            removeButtonRef === null || removeButtonRef === void 0 ? void 0 : (_removeButtonRef_current = removeButtonRef.current) === null || _removeButtonRef_current === void 0 ? void 0 : _removeButtonRef_current.focus();
        } else {
            disabledRef.current = true;
        }
    };
    const onRemoveActivateClick = (e)=>{
        e.stopPropagation();
        if (!removeButtonRef.current) {
            return;
        }
        const { offsetWidth } = removeButtonRef.current;
        disabledRef.current = false;
        updateRemoveOffset(offsetWidth);
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames("vkuiRemovable__content", 'vkuiInternalRemovable__content'),
        style: {
            transform: `translateX(-${removeOffset !== null && removeOffset !== void 0 ? removeOffset : 0}px)`
        },
        onTransitionEnd: onRemoveTransitionEnd,
        children: [
            /*#__PURE__*/ _jsxs(IconButton, {
                hasActive: false,
                hasHover: false,
                className: classNames("vkuiRemovable__action", "vkuiRemovable__toggle", 'vkuiInternalRemovable__action'),
                onClick: onRemoveActivateClick,
                disabled: removeOffset > 0 || disabled,
                "data-testid": toggleButtonTestId,
                children: [
                    /*#__PURE__*/ _jsx(VisuallyHidden, {
                        children: removePlaceholderString
                    }),
                    /*#__PURE__*/ _jsx("i", {
                        className: "vkuiRemovable__toggle-in",
                        role: "presentation"
                    })
                ]
            }),
            typeof childrenProp === 'function' ? childrenProp({
                isRemoving: removeOffset > 0
            }) : childrenProp,
            /*#__PURE__*/ _jsx("span", {
                className: "vkuiRemovable__offset",
                "aria-hidden": true
            }),
            /*#__PURE__*/ _jsx(Tappable, {
                Component: "button",
                hasActive: false,
                hasHover: false,
                disabled: disabledRef.current,
                getRootRef: removeButtonRef,
                className: "vkuiRemovable__remove",
                onClick: onRemove,
                "data-testid": removeButtonTestId,
                children: /*#__PURE__*/ _jsx("span", {
                    className: "vkuiRemovable__remove-in",
                    children: removePlaceholder
                })
            })
        ]
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/Removable
 */ export const Removable = (_param)=>{
    var { children, onRemove, removePlaceholder = 'Удалить', align = 'center', indent = false, toggleButtonTestId, removeButtonTestId, disabled } = _param, restProps = _object_without_properties(_param, [
        "children",
        "onRemove",
        "removePlaceholder",
        "align",
        "indent",
        "toggleButtonTestId",
        "removeButtonTestId",
        "disabled"
    ]);
    const platform = usePlatform();
    const onRemoveClick = (e)=>{
        e.preventDefault();
        onRemove === null || onRemove === void 0 ? void 0 : onRemove(e);
    };
    const removePlaceholderString = getTextFromChildren(removePlaceholder);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames(platform === 'ios' && "vkuiRemovable--ios", align === 'start' && "vkuiRemovable--align-start", indent && "vkuiRemovable--indent"),
        children: [
            platform !== 'ios' && /*#__PURE__*/ _jsxs("div", {
                className: classNames("vkuiRemovable__content", 'vkuiInternalRemovable__content'),
                children: [
                    typeof children === 'function' ? children({
                        isRemoving: false
                    }) : children,
                    /*#__PURE__*/ _jsx(IconButton, {
                        activeMode: "opacity",
                        hoverMode: "opacity",
                        className: classNames("vkuiRemovable__action", 'vkuiInternalRemovable__action'),
                        onClick: onRemoveClick,
                        label: removePlaceholderString,
                        "data-testid": removeButtonTestId,
                        disabled: disabled,
                        children: /*#__PURE__*/ _jsx(Icon24Cancel, {
                            role: "presentation"
                        })
                    }),
                    /*#__PURE__*/ _jsx("span", {
                        className: "vkuiRemovable__offset",
                        "aria-hidden": true
                    })
                ]
            }),
            platform === 'ios' && /*#__PURE__*/ _jsx(RemovableIos, {
                onRemove: onRemoveClick,
                removePlaceholder: removePlaceholder,
                removePlaceholderString: removePlaceholderString,
                toggleButtonTestId: toggleButtonTestId,
                removeButtonTestId: removeButtonTestId,
                disabled: disabled,
                children: children
            })
        ]
    }));
};

//# sourceMappingURL=Removable.js.map