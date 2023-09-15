import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { generateVKUITokensClassName } from '../helpers/generateVKUITokensClassName';
export const TokensClassProvider = ({ children, platform, appearance })=>{
    return /*#__PURE__*/ React.createElement(React.Fragment, null, React.Children.map(children, (child)=>{
        if (/*#__PURE__*/ React.isValidElement(child)) {
            return /*#__PURE__*/ React.cloneElement(child, {
                className: classNames(child.props.className, generateVKUITokensClassName(platform, appearance))
            });
        }
        return child;
    }));
};

//# sourceMappingURL=tokensClassProvider.js.map