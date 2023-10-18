import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { ActionSheetContext } from '../ActionSheet/ActionSheetContext';
import { Tappable } from '../Tappable/Tappable';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
import { Radio } from './subcomponents/Radio/Radio';
import styles from './ActionSheetItem.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */ export const ActionSheetItem = ({ children, autoClose, mode = 'default', meta, subtitle, before, after, selectable, value, name, checked, defaultChecked, onChange, onClick, onImmediateClick, multiline = false, iconChecked, className, isCancelItem, ...restProps })=>{
    const platform = usePlatform();
    const { onItemClick = ()=>noop, mode: actionSheetMode } = React.useContext(ActionSheetContext);
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    let Component = restProps.href ? 'a' : 'div';
    if (selectable) {
        Component = 'label';
    }
    const isRich = subtitle || meta || selectable;
    const isCentered = !isRich && !before && platform === Platform.IOS;
    return /*#__PURE__*/ React.createElement(Tappable, {
        Component: Component,
        ...restProps,
        onClick: selectable ? onClick : onItemClick({
            action: onClick,
            immediateAction: onImmediateClick,
            autoClose: Boolean(autoClose),
            isCancelItem: Boolean(isCancelItem)
        }),
        activeMode: platform === Platform.IOS ? styles['ActionSheetItem--active'] : undefined,
        className: classNames(styles['ActionSheetItem'], platform === Platform.IOS && styles['ActionSheetItem--ios'], mode === 'cancel' && styles['ActionSheetItem--mode-cancel'], mode === 'destructive' && styles['ActionSheetItem--mode-destructive'], sizeY === SizeType.COMPACT && styles['ActionSheetItem--sizeY-compact'], isRich && styles['ActionSheetItem--rich'], actionSheetMode === 'menu' && styles['ActionSheetItem--menu'], selectable && styles['ActionSheetItem--selectable'], className)
    }, before && /*#__PURE__*/ React.createElement("div", {
        className: styles['ActionSheetItem__before']
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['ActionSheetItem__container'], !multiline && styles['ActionSheetItem--ellipsis'])
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['ActionSheetItem__content'], isCentered && styles['ActionSheetItem--centered'])
    }, platform === Platform.IOS ? /*#__PURE__*/ React.createElement(Title, {
        className: styles['ActionSheetItem__children'],
        weight: mode === 'cancel' ? '2' : '3',
        level: isCentered ? '2' : '3'
    }, children) : /*#__PURE__*/ React.createElement(Text, {
        className: styles['ActionSheetItem__children']
    }, children), meta && /*#__PURE__*/ React.createElement(Text, {
        className: styles['ActionSheetItem__meta']
    }, meta)), subtitle && /*#__PURE__*/ React.createElement(Subhead, {
        className: styles['ActionSheetItem__subtitle']
    }, subtitle)), (selectable || after) && /*#__PURE__*/ React.createElement("div", {
        className: styles['ActionSheetItem__after']
    }, after, selectable && /*#__PURE__*/ React.createElement(Radio, {
        name: name,
        value: value,
        onChange: onChange,
        onClick: onItemClick({
            action: noop,
            immediateAction: noop,
            autoClose: Boolean(autoClose),
            isCancelItem: Boolean(isCancelItem)
        }),
        defaultChecked: defaultChecked,
        checked: checked,
        disabled: restProps.disabled
    }, iconChecked)));
};

//# sourceMappingURL=ActionSheetItem.js.map