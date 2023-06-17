import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { SizeType } from '../../../lib/adaptivity';
import styles from './Subhead.module.css';
const sizeYClassNames = {
    none: styles['Subhead--sizeY-none'],
    [SizeType.COMPACT]: styles['Subhead--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Subhead
 */ export const Subhead = ({ className , children , weight , Component ='h5' , ...restProps })=>{
    const { sizeY ='none'  } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        className: classNames(className, styles['Subhead'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], weight && ({
            '1': styles['Subhead--weight-1'],
            '2': styles['Subhead--weight-2'],
            '3': styles['Subhead--weight-3']
        })[weight])
    }, children);
};

//# sourceMappingURL=Subhead.js.map