import * as React from 'react';
import { Icon24Cancel } from '@vkontakte/icons';
import { classNames, noop } from '@vkontakte/vkjs';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { useDOM } from '../../lib/dom';
import { Platform } from '../../lib/platform';
import { getTitleFromChildren } from '../../lib/utils';
import { IconButton } from '../IconButton/IconButton';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import styles from './Removable.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/RemovableIos
 */ const RemovableIos = ({ onRemove, removePlaceholder, removePlaceholderString, children: childrenProp })=>{
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
            removeButtonRef?.current?.focus();
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
        className: classNames(styles['Removable__content'], 'vkuiInternalRemovable__content'),
        style: {
            transform: `translateX(-${removeOffset ?? 0}px)`
        },
        onTransitionEnd: onRemoveTransitionEnd
    }, /*#__PURE__*/ React.createElement(IconButton, {
        hasActive: false,
        hasHover: false,
        "aria-label": removePlaceholderString,
        className: classNames(styles['Removable__action'], styles['Removable__toggle'], 'vkuiInternalRemovable__action'),
        onClick: onRemoveActivateClick,
        disabled: removeOffset > 0
    }, /*#__PURE__*/ React.createElement("i", {
        className: styles['Removable__toggle-in'],
        role: "presentation"
    })), typeof childrenProp === 'function' ? childrenProp({
        isRemoving: removeOffset > 0
    }) : childrenProp, /*#__PURE__*/ React.createElement("span", {
        className: styles['Removable__offset'],
        "aria-hidden": true
    }), /*#__PURE__*/ React.createElement(Tappable, {
        Component: "button",
        hasActive: false,
        hasHover: false,
        disabled: disabledRef.current,
        getRootRef: removeButtonRef,
        className: styles['Removable__remove'],
        onClick: onRemove
    }, /*#__PURE__*/ React.createElement("span", {
        className: styles['Removable__remove-in']
    }, removePlaceholder)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Removable
 */ export const Removable = ({ children, onRemove = noop, removePlaceholder = 'Удалить', align = 'center', indent = false, ...restProps })=>{
    const platform = usePlatform();
    const onRemoveClick = (e)=>{
        e.preventDefault();
        onRemove(e);
    };
    const removePlaceholderString = getTitleFromChildren(removePlaceholder);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(platform === Platform.IOS && styles['Removable--ios'], align === 'start' && styles['Removable--align-start'], indent && styles['Removable--indent'])
    }, platform !== Platform.IOS && /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['Removable__content'], 'vkuiInternalRemovable__content')
    }, children, /*#__PURE__*/ React.createElement(IconButton, {
        activeMode: "opacity",
        hoverMode: "opacity",
        className: classNames(styles['Removable__action'], 'vkuiInternalRemovable__action'),
        onClick: onRemoveClick,
        "aria-label": removePlaceholderString
    }, /*#__PURE__*/ React.createElement(Icon24Cancel, {
        role: "presentation"
    })), /*#__PURE__*/ React.createElement("span", {
        className: styles['Removable__offset'],
        "aria-hidden": true
    })), platform === Platform.IOS && /*#__PURE__*/ React.createElement(RemovableIos, {
        onRemove: onRemoveClick,
        removePlaceholder: removePlaceholder,
        removePlaceholderString: removePlaceholderString
    }, children));
};

//# sourceMappingURL=Removable.js.map