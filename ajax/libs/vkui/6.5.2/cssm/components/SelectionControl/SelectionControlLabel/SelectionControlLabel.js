import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { RootComponent } from '../../RootComponent/RootComponent';
import { Footnote } from '../../Typography/Footnote/Footnote';
import { Text } from '../../Typography/Text/Text';
import styles from './SelectionControlLabel.module.css';
const sizeYClassNames = {
    none: styles['SelectionControlLabel--sizeY-none'],
    compact: styles['SelectionControlLabel--sizeY-compact']
};
export function SelectionControlLabel({ children, titleAfter, description, ...restProps }) {
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsxs(RootComponent, {
        baseClassName: classNames(styles['SelectionControlLabel'], sizeY !== 'regular' && sizeYClassNames[sizeY]),
        ...restProps,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: styles['SelectionControlLabel__titleLayout'],
                children: [
                    /*#__PURE__*/ _jsx(Text, {
                        className: styles['SelectionControlLabel__title'],
                        children: children
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: styles['SelectionControlLabel__titleAfter'],
                        children: titleAfter
                    })
                ]
            }),
            hasReactNode(description) && /*#__PURE__*/ _jsx(Footnote, {
                className: styles['SelectionControlLabel__description'],
                children: description
            })
        ]
    });
}

//# sourceMappingURL=SelectionControlLabel.js.map