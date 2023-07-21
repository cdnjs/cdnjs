import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { ListContext } from '../List/ListContext';
import { Removable } from '../Removable/Removable';
import { SimpleCell } from '../SimpleCell/SimpleCell';
import { CellCheckbox } from './CellCheckbox/CellCheckbox';
import { CellDragger } from './CellDragger/CellDragger';
import { useDraggable } from './useDraggable';
import styles from './Cell.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Cell
 */ export const Cell = ({ mode, onRemove = noop, removePlaceholder = 'Удалить', onDragFinish, before, after, disabled, draggable, Component: ComponentProps, onChange, name, value, checked, defaultChecked, getRootRef, draggerLabel = 'Перенести ячейку', className, style, ...restProps })=>{
    const selectable = mode === 'selectable';
    const removable = mode === 'removable';
    const Component = selectable ? 'label' : ComponentProps;
    const platform = usePlatform();
    const rootElRef = useExternRef(getRootRef);
    const { dragging, ...draggableProps } = useDraggable({
        rootElRef,
        onDragFinish
    });
    const { toggleDrag } = React.useContext(ListContext);
    React.useEffect(()=>{
        if (dragging) {
            toggleDrag(true);
            return ()=>toggleDrag(false);
        }
        return undefined;
    }, [
        dragging,
        toggleDrag
    ]);
    let dragger;
    if (draggable) {
        dragger = /*#__PURE__*/ React.createElement(CellDragger, {
            className: styles['Cell__dragger'],
            "aria-label": draggerLabel,
            ...draggableProps
        });
    }
    let checkbox;
    if (selectable) {
        const checkboxProps = {
            name,
            value,
            onChange,
            defaultChecked,
            checked,
            disabled
        };
        checkbox = /*#__PURE__*/ React.createElement(CellCheckbox, {
            className: styles['Cell__checkbox'],
            ...checkboxProps
        });
    }
    const simpleCellDisabled = draggable && !selectable || removable || disabled;
    const hasActive = !simpleCellDisabled && !dragging;
    const cellClasses = classNames(styles['Cell'], platform === Platform.IOS && styles['Cell--ios'], dragging && styles['Cell--dragging'], removable && styles['Cell--removable'], Component === 'label' && styles['Cell--selectable'], disabled && styles['Cell--disabled']);
    const simpleCell = /*#__PURE__*/ React.createElement(SimpleCell, {
        hasActive: hasActive,
        hasHover: hasActive,
        ...restProps,
        className: styles['Cell__content'],
        disabled: simpleCellDisabled,
        Component: Component,
        before: /*#__PURE__*/ React.createElement(React.Fragment, null, draggable && platform !== Platform.IOS && dragger, selectable && checkbox, before),
        after: /*#__PURE__*/ React.createElement(React.Fragment, null, draggable && platform === Platform.IOS && dragger, after)
    });
    if (removable) {
        return /*#__PURE__*/ React.createElement(Removable, {
            className: classNames(cellClasses, className),
            style: style,
            getRootRef: rootElRef,
            removePlaceholder: removePlaceholder,
            onRemove: (e)=>onRemove(e, rootElRef.current)
        }, simpleCell);
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames(cellClasses, className),
        style: style,
        ref: rootElRef
    }, simpleCell);
};
Cell.Checkbox = CellCheckbox;

//# sourceMappingURL=Cell.js.map