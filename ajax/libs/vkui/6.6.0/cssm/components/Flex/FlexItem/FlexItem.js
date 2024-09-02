import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../../RootComponent/RootComponent';
import styles from './FlexItem.module.css';
const flexClassNames = {
    grow: styles['FlexItem--flex-grow'],
    shrink: styles['FlexItem--flex-shrink'],
    content: styles['FlexItem--flex-content'],
    fixed: styles['FlexItem--flex-fixed']
};
const alignSelfClassNames = {
    start: styles['FlexItem--align-self-start'],
    end: styles['FlexItem--align-self-end'],
    center: styles['FlexItem--align-self-center'],
    baseline: styles['FlexItem--align-self-baseline'],
    stretch: styles['FlexItem--align-self-stretch']
};
export const FlexItem = ({ children, alignSelf, flex, flexBasis, style, ...rest })=>{
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...rest,
        style: {
            flexBasis,
            ...style
        },
        baseClassName: classNames(styles.FlexItem, alignSelf && alignSelfClassNames[alignSelf], flex && flexClassNames[flex]),
        children: children
    });
};

//# sourceMappingURL=FlexItem.js.map