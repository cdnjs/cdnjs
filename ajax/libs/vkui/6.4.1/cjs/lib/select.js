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
    defaultFilterFn: function() {
        return defaultFilterFn;
    },
    getFormFieldModeFromSelectType: function() {
        return getFormFieldModeFromSelectType;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _children = require("./children");
function getOptionLabelDefault(option) {
    return option.label;
}
function defaultFilterFn(...args) {
    const [rawSearchQuery = '', option, getOptionLabel] = args;
    const foundRawLabel = getOptionLabel ? getOptionLabel(option) : getOptionLabelDefault(option);
    if (foundRawLabel === undefined) {
        return false;
    }
    const searchQuery = rawSearchQuery.toLocaleLowerCase();
    const label = (0, _children.getTextFromChildren)(foundRawLabel).toLocaleLowerCase();
    if (label.startsWith(searchQuery)) {
        return true;
    }
    const findAllIncludes = (target = '', search = '')=>{
        const includes = [];
        let i = target.indexOf(search);
        while(i !== -1){
            includes.push(i);
            i = target.indexOf(search, i + 1);
        }
        return includes;
    };
    const includes = findAllIncludes(label, searchQuery);
    if (includes.length) {
        // Ищем вхождение перед началом которого не буква
        const letterRegexp = new RegExp('\\p{L}', 'u');
        for (const index of includes){
            if (!letterRegexp.test(label[index - 1])) {
                return true;
            }
        }
    }
    return false;
}
const getFormFieldModeFromSelectType = (selectType = 'default')=>{
    return selectType === 'default' ? 'default' : 'plain';
};

//# sourceMappingURL=select.js.map