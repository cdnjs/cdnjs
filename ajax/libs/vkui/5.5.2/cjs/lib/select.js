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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _utils = require("./utils");
var findAllIncludes = function() {
    var target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", search = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var includes = [];
    var i = target.indexOf(search);
    while(i !== -1){
        includes.push(i);
        i = target.indexOf(search, i + 1);
    }
    return includes;
};
var letterRegexp;
// На момент написания флаг u не поддерживался рядом браузеров, поэтому добавили фоллбэк.
try {
    letterRegexp = new RegExp("\\p{L}", "u");
} catch (e) {}
var _getOptionLabel = function(option) {
    return (0, _utils.getTitleFromChildren)(option.label);
};
var defaultFilterFn = function() {
    var query = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", option = arguments.length > 1 ? arguments[1] : void 0, getOptionLabel = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _getOptionLabel;
    var _getOptionLabel1;
    query = query.toLocaleLowerCase();
    var label = (_getOptionLabel1 = getOptionLabel(option)) === null || _getOptionLabel1 === void 0 ? void 0 : _getOptionLabel1.toLocaleLowerCase();
    if (label === null || label === void 0 ? void 0 : label.startsWith(query)) {
        return true;
    }
    var includes = findAllIncludes(label, query);
    // Ищем вхождение перед началом которого не буква
    if (letterRegexp && label) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = includes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var index = _step.value;
                if (!letterRegexp.test(label[index - 1])) {
                    return true;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    } else {
        // если regexp не поддерживается, то ищем любое вхождение
        return includes.length > 0;
    }
    return false;
};
var getFormFieldModeFromSelectType = function() {
    var selectType = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "default";
    return selectType === "default" ? "default" : "plain";
};

//# sourceMappingURL=select.js.map