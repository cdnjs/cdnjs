import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon24Cancel } from '@vkontakte/icons';
import { classNames, noop } from '@vkontakte/vkjs';
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
 */ const RemovableIos = ({ onRemove, removePlaceholder, removePlaceholderString, children: childrenProp, toggleButtonTestId, removeButtonTestId })=>{
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
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiRemovable__content", 'vkuiInternalRemovable__content'),
        style: {
            transform: `translateX(-${removeOffset !== null && removeOffset !== void 0 ? removeOffset : 0}px)`
        },
        onTransitionEnd: onRemoveTransitionEnd
    }, /*#__PURE__*/ React.createElement(IconButton, {
        hasActive: false,
        hasHover: false,
        className: classNames("vkuiRemovable__action", "vkuiRemovable__toggle", 'vkuiInternalRemovable__action'),
        onClick: onRemoveActivateClick,
        disabled: removeOffset > 0,
        "data-testid": toggleButtonTestId
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, removePlaceholderString), /*#__PURE__*/ React.createElement("i", {
        className: "vkuiRemovable__toggle-in",
        role: "presentation"
    })), typeof childrenProp === 'function' ? childrenProp({
        isRemoving: removeOffset > 0
    }) : childrenProp, /*#__PURE__*/ React.createElement("span", {
        className: "vkuiRemovable__offset",
        "aria-hidden": true
    }), /*#__PURE__*/ React.createElement(Tappable, {
        Component: "button",
        hasActive: false,
        hasHover: false,
        disabled: disabledRef.current,
        getRootRef: removeButtonRef,
        className: "vkuiRemovable__remove",
        onClick: onRemove,
        "data-testid": removeButtonTestId
    }, /*#__PURE__*/ React.createElement("span", {
        className: "vkuiRemovable__remove-in"
    }, removePlaceholder)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Removable
 */ export const Removable = (_param)=>{
    var { children, onRemove = noop, removePlaceholder = 'Удалить', align = 'center', indent = false, toggleButtonTestId, removeButtonTestId } = _param, restProps = _object_without_properties(_param, [
        "children",
        "onRemove",
        "removePlaceholder",
        "align",
        "indent",
        "toggleButtonTestId",
        "removeButtonTestId"
    ]);
    const platform = usePlatform();
    const onRemoveClick = (e)=>{
        e.preventDefault();
        onRemove(e);
    };
    const removePlaceholderString = getTextFromChildren(removePlaceholder);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames(platform === 'ios' && "vkuiRemovable--ios", align === 'start' && "vkuiRemovable--align-start", indent && "vkuiRemovable--indent")
    }), platform !== 'ios' && /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiRemovable__content", 'vkuiInternalRemovable__content')
    }, typeof children === 'function' ? children({
        isRemoving: false
    }) : children, /*#__PURE__*/ React.createElement(IconButton, {
        activeMode: "opacity",
        hoverMode: "opacity",
        className: classNames("vkuiRemovable__action", 'vkuiInternalRemovable__action'),
        onClick: onRemoveClick,
        label: removePlaceholderString,
        "data-testid": removeButtonTestId
    }, /*#__PURE__*/ React.createElement(Icon24Cancel, {
        role: "presentation"
    })), /*#__PURE__*/ React.createElement("span", {
        className: "vkuiRemovable__offset",
        "aria-hidden": true
    })), platform === 'ios' && /*#__PURE__*/ React.createElement(RemovableIos, {
        onRemove: onRemoveClick,
        removePlaceholder: removePlaceholder,
        removePlaceholderString: removePlaceholderString,
        toggleButtonTestId: toggleButtonTestId,
        removeButtonTestId: removeButtonTestId
    }, children));
};

//# sourceMappingURL=Removable.js.map