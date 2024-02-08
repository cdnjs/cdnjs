// copied from react-children-utilities
// @see https://github.com/fernandopasik/react-children-utilities/tree/main
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    childToString: function() {
        return childToString;
    },
    getTextFromChildren: function() {
        return getTextFromChildren;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const childToString = (child)=>{
    if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
        return '';
    }
    if (JSON.stringify(child) === '{}') {
        return '';
    }
    return child.toString();
};
const getTextFromChildren = (children)=>{
    if (!(children instanceof Array) && !(0, _react.isValidElement)(children)) {
        return childToString(children);
    }
    return _react.Children.toArray(children).reduce((text, child)=>{
        let newText = '';
        const isValidElementResult = (0, _react.isValidElement)(child);
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