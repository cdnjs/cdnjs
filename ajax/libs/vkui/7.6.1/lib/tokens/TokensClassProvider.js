import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useTokensClassName } from "./useTokenClassName.js";
const InjectTokenClassNameToChild = ({ children })=>{
    const tokensClassName = useTokensClassName();
    return /*#__PURE__*/ React.cloneElement(children, {
        className: classNames(tokensClassName, "vkuitokens__defaultColor", children.props.className)
    });
};
export const TokensClassProvider = ({ children })=>{
    return React.Children.map(children, (child)=>{
        if (/*#__PURE__*/ React.isValidElement(child)) {
            return /*#__PURE__*/ _jsx(InjectTokenClassNameToChild, {
                children: child
            });
        }
        return child;
    });
};

//# sourceMappingURL=TokensClassProvider.js.map