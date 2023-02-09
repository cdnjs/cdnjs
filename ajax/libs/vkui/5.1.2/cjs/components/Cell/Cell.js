"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _SimpleCell = require("../SimpleCell/SimpleCell");
var _Removable = require("../Removable/Removable");
var _usePlatform = require("../../hooks/usePlatform");
var _useExternRef = require("../../hooks/useExternRef");
var _useDraggable2 = require("./useDraggable");
var _ListContext = require("../List/ListContext");
var _CellDragger = require("./CellDragger/CellDragger");
var _CellCheckbox = require("./CellCheckbox/CellCheckbox");
var _excluded = ["mode", "onRemove", "removePlaceholder", "onDragFinish", "before", "after", "disabled", "draggable", "Component", "onChange", "name", "value", "checked", "defaultChecked", "getRootRef", "draggerLabel", "className", "style"],
  _excluded2 = ["dragging"];
/**
 * @see https://vkcom.github.io/VKUI/#/Cell
 */
var Cell = function Cell(_ref) {
  var mode = _ref.mode,
    _ref$onRemove = _ref.onRemove,
    _onRemove = _ref$onRemove === void 0 ? _vkjs.noop : _ref$onRemove,
    _ref$removePlaceholde = _ref.removePlaceholder,
    removePlaceholder = _ref$removePlaceholde === void 0 ? 'Удалить' : _ref$removePlaceholde,
    onDragFinish = _ref.onDragFinish,
    before = _ref.before,
    after = _ref.after,
    disabled = _ref.disabled,
    draggable = _ref.draggable,
    Component = _ref.Component,
    onChange = _ref.onChange,
    name = _ref.name,
    value = _ref.value,
    checked = _ref.checked,
    defaultChecked = _ref.defaultChecked,
    getRootRef = _ref.getRootRef,
    _ref$draggerLabel = _ref.draggerLabel,
    draggerLabel = _ref$draggerLabel === void 0 ? 'Перенести ячейку' : _ref$draggerLabel,
    className = _ref.className,
    style = _ref.style,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var selectable = mode === 'selectable';
  var removable = mode === 'removable';
  var platform = (0, _usePlatform.usePlatform)();
  var rootElRef = (0, _useExternRef.useExternRef)(getRootRef);
  var _useDraggable = (0, _useDraggable2.useDraggable)({
      rootElRef: rootElRef,
      onDragFinish: onDragFinish
    }),
    dragging = _useDraggable.dragging,
    draggableProps = (0, _objectWithoutProperties2.default)(_useDraggable, _excluded2);
  var _React$useContext = React.useContext(_ListContext.ListContext),
    toggleDrag = _React$useContext.toggleDrag;
  React.useEffect(function () {
    if (dragging) {
      toggleDrag(true);
      return function () {
        return toggleDrag(false);
      };
    }
    return undefined;
  }, [dragging, toggleDrag]);
  var dragger;
  if (draggable) {
    dragger = /*#__PURE__*/React.createElement(_CellDragger.CellDragger, (0, _extends2.default)({
      className: "vkuiCell__dragger",
      "aria-label": draggerLabel
    }, draggableProps));
  }
  var checkbox;
  if (selectable) {
    var checkboxProps = {
      name: name,
      value: value,
      onChange: onChange,
      defaultChecked: defaultChecked,
      checked: checked,
      disabled: disabled
    };
    checkbox = /*#__PURE__*/React.createElement(_CellCheckbox.CellCheckbox, (0, _extends2.default)({
      className: "vkuiCell__checkbox"
    }, checkboxProps));
  }
  var simpleCellDisabled = draggable && !selectable || removable || disabled;
  var hasActive = !simpleCellDisabled && !dragging;
  var cellClasses = (0, _vkjs.classNames)("vkuiCell", platform === _platform.Platform.IOS && "vkuiCell--ios", dragging && "vkuiCell--dragging", removable && "vkuiCell--removable", selectable && "vkuiCell--selectable", disabled && "vkuiCell--disabled");
  var simpleCell = /*#__PURE__*/React.createElement(_SimpleCell.SimpleCell, (0, _extends2.default)({
    hasActive: hasActive,
    hasHover: hasActive
  }, restProps, {
    className: "vkuiCell__content",
    disabled: simpleCellDisabled,
    Component: selectable ? 'label' : Component,
    before: /*#__PURE__*/React.createElement(React.Fragment, null, draggable && platform !== _platform.Platform.IOS && dragger, selectable && checkbox, before),
    after: /*#__PURE__*/React.createElement(React.Fragment, null, draggable && platform === _platform.Platform.IOS && dragger, after)
  }));
  if (removable) {
    return /*#__PURE__*/React.createElement(_Removable.Removable, {
      className: (0, _vkjs.classNames)(cellClasses, className),
      style: style,
      getRootRef: rootElRef,
      removePlaceholder: removePlaceholder,
      onRemove: function onRemove(e) {
        return _onRemove(e, rootElRef.current);
      }
    }, simpleCell);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)(cellClasses, className),
    style: style,
    ref: rootElRef
  }, simpleCell);
};
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map