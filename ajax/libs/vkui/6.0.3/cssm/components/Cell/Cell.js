import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { Removable } from '../Removable/Removable';
import { SimpleCell } from '../SimpleCell/SimpleCell';
import { CellCheckbox } from './CellCheckbox/CellCheckbox';
import { CellDragger } from './CellDragger/CellDragger';
import { DEFAULT_DRAGGABLE_LABEL } from './constants';
import styles from './Cell.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Cell
 */ export const Cell = ({ mode, onRemove = noop, removePlaceholder = 'Удалить', onDragFinish, before, after, disabled, draggable, Component: ComponentProps, onChange, name, value, checked, defaultChecked, getRootRef, draggerLabel = DEFAULT_DRAGGABLE_LABEL, className, style, toggleButtonTestId, removeButtonTestId, ...restProps })=>{
    const [dragging, setDragging] = React.useState(false);
    const selectable = mode === 'selectable';
    const removable = mode === 'removable';
    const Component = selectable ? 'label' : ComponentProps;
    const platform = usePlatform();
    const rootElRef = useExternRef(getRootRef);
    const dragger = draggable ? /*#__PURE__*/ React.createElement(CellDragger, {
        elRef: rootElRef,
        className: styles['Cell__dragger'],
        disabled: disabled,
        onDragStateChange: setDragging,
        onDragFinish: onDragFinish
    }, draggerLabel) : null;
    let checkbox;
    if (selectable) {
        const checkboxProps = {
            name,
            value,
            defaultChecked,
            checked,
            disabled,
            onChange
        };
        checkbox = /*#__PURE__*/ React.createElement(CellCheckbox, {
            className: styles['Cell__checkbox'],
            ...checkboxProps
        });
    }
    const simpleCellDisabled = draggable && !selectable || removable && !restProps.onClick || disabled;
    const hasActive = !simpleCellDisabled && !dragging;
    const cellClasses = classNames(styles['Cell'], dragging && styles['Cell--dragging'], platform === 'ios' && styles['Cell--ios'], removable && styles['Cell--removable'], Component === 'label' && styles['Cell--selectable'], disabled && styles['Cell--disabled']);
    const simpleCellProps = {
        hasActive: hasActive,
        hasHover: hasActive && !removable,
        ...restProps,
        className: styles['Cell__content'],
        Component: Component,
        before: /*#__PURE__*/ React.createElement(React.Fragment, null, draggable && platform !== 'ios' && dragger, selectable && checkbox, before),
        after: /*#__PURE__*/ React.createElement(React.Fragment, null, draggable && platform === 'ios' && dragger, after)
    };
    if (restProps.onClick) {
        simpleCellProps.disabled = simpleCellDisabled;
    }
    if (removable) {
        return /*#__PURE__*/ React.createElement(Removable, {
            className: classNames(cellClasses, className),
            style: style,
            getRootRef: rootElRef,
            removePlaceholder: removePlaceholder,
            onRemove: (e)=>onRemove(e, rootElRef.current),
            toggleButtonTestId: toggleButtonTestId,
            removeButtonTestId: removeButtonTestId
        }, platform === 'ios' ? ({ isRemoving })=>{
            if (simpleCellProps.onClick) {
                simpleCellProps.disabled = isRemoving || !simpleCellProps.disabled;
            }
            return /*#__PURE__*/ React.createElement(SimpleCell, simpleCellProps);
        } : /*#__PURE__*/ React.createElement(SimpleCell, simpleCellProps));
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames(cellClasses, className),
        style: style,
        ref: rootElRef
    }, /*#__PURE__*/ React.createElement(SimpleCell, simpleCellProps));
};
Cell.Checkbox = CellCheckbox;

//# sourceMappingURL=Cell.js.map