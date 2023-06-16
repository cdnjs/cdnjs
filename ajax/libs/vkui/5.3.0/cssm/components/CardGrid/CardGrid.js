import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { SizeType } from '../../lib/adaptivity';
import styles from './CardGrid.module.css';
const sizeXClassNames = {
    none: styles['CardGrid--sizeX-none'],
    [SizeType.COMPACT]: styles['CardGrid--sizeX-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */ export const CardGrid = ({ children , size ='s' , spaced =false , className , ...restProps })=>{
    const { sizeX ='none'  } = useAdaptivity();
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames(styles['CardGrid'], spaced && styles['CardGrid--spaced'], {
            s: styles['CardGrid--size-s'],
            m: styles['CardGrid--size-m'],
            l: styles['CardGrid--size-l']
        }[size], sizeX !== SizeType.REGULAR && sizeXClassNames[sizeX], className)
    }, children);
};

//# sourceMappingURL=CardGrid.js.map