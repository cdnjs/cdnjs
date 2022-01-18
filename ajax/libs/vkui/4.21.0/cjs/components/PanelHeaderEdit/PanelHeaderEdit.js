"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");

var _platform = require("../../lib/platform");

var _icons = require("@vkontakte/icons");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["isActive", "editLabel", "doneLabel"];

var PanelHeaderEdit = function PanelHeaderEdit(_ref) {
  var isActive = _ref.isActive,
      editLabel = _ref.editLabel,
      doneLabel = _ref.doneLabel,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var iOSText = isActive ? doneLabel : editLabel;
  var AndroidIcon = isActive ? _icons.Icon28DoneOutline : _icons.Icon28EditOutline;
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_PanelHeaderButton.PanelHeaderButton, (0, _extends2.default)({
    "aria-label": iOSText
  }, restProps), platform === _platform.ANDROID || platform === _platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(AndroidIcon, null) : iOSText);
};

PanelHeaderEdit.defaultProps = {
  isActive: false,
  editLabel: 'Редактировать',
  doneLabel: 'Готово'
};
var _default = PanelHeaderEdit;
exports.default = _default;
//# sourceMappingURL=PanelHeaderEdit.js.map