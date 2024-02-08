import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useTokensClassName } from './useTokenClassName';
const InjectTokenClassNameToChild = ({ children })=>{
    const tokensClassName = useTokensClassName();
    return /*#__PURE__*/ React.cloneElement(children, {
        className: classNames(tokensClassName, children.props.className)
    });
};
export const TokensClassProvider = ({ children })=>{
    return React.Children.map(children, (child)=>{
        if (/*#__PURE__*/ React.isValidElement(child)) {
            return /*#__PURE__*/ React.createElement(InjectTokenClassNameToChild, null, child);
        }
        return child;
    });
};

//# sourceMappingURL=TokensClassProvider.js.map