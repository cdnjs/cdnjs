import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import styles from './SelectTypography.module.css';
const sizeYClassNames = {
    none: styles['SelectTypography--sizeY-none'],
    compact: styles['SelectTypography--sizeY-compact']
};
const platformClassNames = {
    vkcom: styles['SelectTypography--vkcom'],
    android: styles['SelectTypography--android']
};
/**
 * @private
 */ export const SelectTypography = ({ selectType = 'default', children, className, ...restProps })=>{
    const platform = usePlatform();
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement("span", {
        className: classNames(styles['SelectTypography'], platformClassNames.hasOwnProperty(platform) && platformClassNames[platform], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], selectType === 'accent' && styles['SelectTypography--selectType-accent'], className),
        ...restProps
    }, children);
};

//# sourceMappingURL=SelectTypography.js.map