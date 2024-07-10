// copied from react-children-utilities
// @see https://github.com/fernandopasik/react-children-utilities/tree/main
import * as React from 'react';
import { Children, isValidElement } from 'react';
export const childToString = (child)=>{
    if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
        return '';
    }
    if (JSON.stringify(child) === '{}') {
        return '';
    }
    return child.toString();
};
export const getTextFromChildren = (children)=>{
    if (!(children instanceof Array) && !isValidElement(children)) {
        return childToString(children);
    }
    return Children.toArray(children).reduce((text, child)=>{
        let newText = '';
        const isValidElementResult = isValidElement(child);
        const hasChildren = isValidElementResult && 'children' in child.props;
        if (isValidElementResult && hasChildren) {
            newText = getTextFromChildren(child.props.children);
        } else if (isValidElementResult && !hasChildren) {
            newText = '';
        } else {
            newText = childToString(child);
        }
        return text.concat(newText);
    }, '');
};

//# sourceMappingURL=children.js.map