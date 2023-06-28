import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { SizeType } from '../../../lib/adaptivity';
import styles from './Text.module.css';
const sizeYClassNames = {
    none: styles['Text--sizeY-none'],
    [SizeType.COMPACT]: styles['Text--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Text
 */ export const Text = ({ className , children , weight , Component ='span' , getRootRef , ...restProps })=>{
    const { sizeY ='none'  } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        ref: getRootRef,
        className: classNames(className, styles['Text'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], weight && ({
            '1': styles['Text--weight-1'],
            '2': styles['Text--weight-2'],
            '3': styles['Text--weight-3']
        })[weight])
    }, children);
};

//# sourceMappingURL=Text.js.map