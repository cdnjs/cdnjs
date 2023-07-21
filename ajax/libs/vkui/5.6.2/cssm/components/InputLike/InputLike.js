import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { callMultiple } from '../../lib/callMultiple';
import { stopPropagation } from '../../lib/utils';
import styles from './InputLike.module.css';
const MASK_SYMBOL = String.fromCharCode(0x2007);
function getMaskElements(length) {
    const result = [];
    for(let index = 0; index < length; index += 1){
        result.push(/*#__PURE__*/ React.createElement("span", {
            key: index,
            className: styles['InputLike__mask']
        }, MASK_SYMBOL));
    }
    return result;
}
export const InputLike = ({ value, length, index, onElementSelect, onClick, onFocus, getRootRef, className, ...props })=>{
    const handleElementSelect = React.useCallback((event)=>{
        stopPropagation(event);
        onElementSelect?.(index);
    }, [
        index,
        onElementSelect
    ]);
    return /*#__PURE__*/ React.createElement("span", {
        className: classNames(styles['InputLike'], value?.length === length && styles['InputLike--full'], className),
        tabIndex: 0,
        ref: getRootRef,
        onClick: callMultiple(onClick, handleElementSelect),
        onFocus: callMultiple(stopPropagation, onFocus),
        ...props
    }, value?.slice(0, length - 1), value?.slice(length - 1) && /*#__PURE__*/ React.createElement("span", {
        key: index,
        className: styles['InputLike__last_character']
    }, value.slice(length - 1)), getMaskElements(length - (value?.length ?? 0)));
};
InputLike.displayName = 'InputLike';

//# sourceMappingURL=InputLike.js.map