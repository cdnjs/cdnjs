import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Typography } from '../Typography';
import styles from './Text.module.css';
const sizeYClassNames = {
    none: styles['Text--sizeY-none'],
    compact: styles['Text--sizeY-compact']
};
/**
 * Основной наборный текст.
 *
 * @see https://vkcom.github.io/VKUI/#/Text
 */ export const Text = ({ className, Component = 'span', normalize = true, inline = false, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Typography, {
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, styles['Text'], sizeY !== 'regular' && sizeYClassNames[sizeY]),
        ...restProps
    });
};

//# sourceMappingURL=Text.js.map