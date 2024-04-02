import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { ActionSheetContext } from '../ActionSheet/ActionSheetContext';
import { Tappable } from '../Tappable/Tappable';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
import { Radio } from './subcomponents/Radio/Radio';
import styles from './ActionSheetItem.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */ export const ActionSheetItem = ({ children, autoCloseDisabled = false, mode = 'default', meta, subtitle, before, after, selectable, value, name, checked, defaultChecked, onChange, onClick, onImmediateClick, multiline = false, iconChecked, className, isCancelItem, ...restProps })=>{
    const platform = usePlatform();
    const { onItemClick = ()=>noop, mode: actionSheetMode } = React.useContext(ActionSheetContext);
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const Component = selectable ? 'label' : undefined;
    const isRich = subtitle || meta || selectable;
    const isCentered = !isRich && !before && platform === 'ios';
    return /*#__PURE__*/ React.createElement(Tappable, {
        ...Component && {
            Component
        },
        ...restProps,
        onClick: selectable ? onClick : onItemClick({
            action: onClick,
            immediateAction: onImmediateClick,
            autoClose: !autoCloseDisabled,
            isCancelItem: Boolean(isCancelItem)
        }),
        activeMode: platform === 'ios' ? styles['ActionSheetItem--active'] : undefined,
        className: classNames(styles['ActionSheetItem'], platform === 'ios' && styles['ActionSheetItem--ios'], mode === 'cancel' && styles['ActionSheetItem--mode-cancel'], mode === 'destructive' && styles['ActionSheetItem--mode-destructive'], sizeY === 'compact' && styles['ActionSheetItem--sizeY-compact'], isRich && styles['ActionSheetItem--rich'], actionSheetMode === 'menu' && styles['ActionSheetItem--menu'], selectable && styles['ActionSheetItem--selectable'], className)
    }, before && /*#__PURE__*/ React.createElement("div", {
        className: styles['ActionSheetItem__before']
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['ActionSheetItem__container'], !multiline && styles['ActionSheetItem--ellipsis'])
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['ActionSheetItem__content'], isCentered && styles['ActionSheetItem--centered'])
    }, platform === 'ios' ? /*#__PURE__*/ React.createElement(Title, {
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
            autoClose: !autoCloseDisabled,
            isCancelItem: Boolean(isCancelItem)
        }),
        defaultChecked: defaultChecked,
        checked: checked,
        disabled: restProps.disabled
    }, iconChecked)));
};

//# sourceMappingURL=ActionSheetItem.js.map