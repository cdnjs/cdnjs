"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeaderEdit = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
var _platform = require("../../lib/platform");
var _icons = require("@vkontakte/icons");
var _usePlatform = require("../../hooks/usePlatform");
var _excluded = ["isActive", "editLabel", "doneLabel"];
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderEdit
 */
var PanelHeaderEdit = function PanelHeaderEdit(_ref) {
  var _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === void 0 ? false : _ref$isActive,
    _ref$editLabel = _ref.editLabel,
    editLabel = _ref$editLabel === void 0 ? 'Редактировать' : _ref$editLabel,
    _ref$doneLabel = _ref.doneLabel,
    doneLabel = _ref$doneLabel === void 0 ? 'Готово' : _ref$doneLabel,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var iOSText = isActive ? doneLabel : editLabel;
  var AndroidIcon = isActive ? _icons.Icon28DoneOutline : _icons.Icon28EditOutline;
  var platform = (0, _usePlatform.usePlatform)();
  return /*#__PURE__*/React.createElement(_PanelHeaderButton.PanelHeaderButton, (0, _extends2.default)({
    "aria-label": iOSText
  }, restProps), platform === _platform.Platform.IOS ? iOSText : /*#__PURE__*/React.createElement(AndroidIcon, null));
};
exports.PanelHeaderEdit = PanelHeaderEdit;
//# sourceMappingURL=PanelHeaderEdit.js.map