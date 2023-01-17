"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormFieldModeFromSelectType = exports.defaultFilterFn = void 0;
var _createForOfIteratorHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelper"));
var _utils = require("./utils");
var findAllIncludes = function findAllIncludes() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var search = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var includes = [];
  var i = target.indexOf(search);
  while (i !== -1) {
    includes.push(i);
    i = target.indexOf(search, i + 1);
  }
  return includes;
};
var letterRegexp;

// На момент написания флаг u не поддерживался рядом браузеров, поэтому добавили фоллбэк.
try {
  letterRegexp = new RegExp('\\p{L}', 'u');
} catch (e) {}
var _getOptionLabel = function _getOptionLabel(option) {
  return (0, _utils.getTitleFromChildren)(option.label);
};
var defaultFilterFn = function defaultFilterFn() {
  var _getOptionLabel2;
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var option = arguments.length > 1 ? arguments[1] : undefined;
  var getOptionLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _getOptionLabel;
  query = query.toLocaleLowerCase();
  var label = (_getOptionLabel2 = getOptionLabel(option)) === null || _getOptionLabel2 === void 0 ? void 0 : _getOptionLabel2.toLocaleLowerCase();
  if (label !== null && label !== void 0 && label.startsWith(query)) {
    return true;
  }
  var includes = findAllIncludes(label, query);

  // Ищем вхождение перед началом которого не буква
  if (letterRegexp && label) {
    var _iterator = (0, _createForOfIteratorHelper2.default)(includes),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _index = _step.value;
        if (!letterRegexp.test(label[_index - 1])) {
          return true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    // если regexp не поддерживается, то ищем любое вхождение
    return includes.length > 0;
  }
  return false;
};
exports.defaultFilterFn = defaultFilterFn;
var getFormFieldModeFromSelectType = function getFormFieldModeFromSelectType() {
  var selectType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
  return selectType === 'default' ? 'default' : 'plain';
};
exports.getFormFieldModeFromSelectType = getFormFieldModeFromSelectType;
//# sourceMappingURL=select.js.map