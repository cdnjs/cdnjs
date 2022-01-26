"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _utils = require("../../lib/utils");

var _warnOnce = require("../../lib/warnOnce");

var _getClassName = require("../../helpers/getClassName");

var _platform = require("../../lib/platform");

var _SimpleCell = _interopRequireDefault(require("../SimpleCell/SimpleCell"));

var _Removable = require("../Removable/Removable");

var _usePlatform = require("../../hooks/usePlatform");

var _useDraggable2 = require("./useDraggable");

var _ListContext = require("../List/ListContext");

var _CellDragger = require("./CellDragger/CellDragger");

var _CellCheckbox = require("./CellCheckbox/CellCheckbox");

var _excluded = ["mode", "onRemove", "removePlaceholder", "onDragFinish", "before", "after", "disabled", "removable", "draggable", "selectable", "Component", "onChange", "name", "value", "checked", "defaultChecked", "getRootRef", "draggerLabel", "className", "style"],
    _excluded2 = ["dragging", "rootElRef"];
var warn = (0, _warnOnce.warnOnce)("Cell");

var Cell = function Cell(_ref) {
  var propsMode = _ref.mode,
      _ref$onRemove = _ref.onRemove,
      _onRemove = _ref$onRemove === void 0 ? _utils.noop : _ref$onRemove,
      _ref$removePlaceholde = _ref.removePlaceholder,
      removePlaceholder = _ref$removePlaceholde === void 0 ? "Удалить" : _ref$removePlaceholde,
      onDragFinish = _ref.onDragFinish,
      before = _ref.before,
      after = _ref.after,
      disabled = _ref.disabled,
      deprecatedRemovable = _ref.removable,
      draggable = _ref.draggable,
      deprecatedSelectable = _ref.selectable,
      Component = _ref.Component,
      onChange = _ref.onChange,
      name = _ref.name,
      value = _ref.value,
      checked = _ref.checked,
      defaultChecked = _ref.defaultChecked,
      getRootRef = _ref.getRootRef,
      _ref$draggerLabel = _ref.draggerLabel,
      draggerLabel = _ref$draggerLabel === void 0 ? "Перенести ячейку" : _ref$draggerLabel,
      className = _ref.className,
      style = _ref.style,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  // TODO: удалить перед 5.0.0
  var mode = propsMode;

  if (!propsMode && (deprecatedSelectable || deprecatedRemovable)) {
    mode = deprecatedSelectable ? "selectable" : "removable";

    if (process.env.NODE_ENV === "development") {
      deprecatedSelectable && warn('Свойство selectable устарелo и будет удалено в 5.0.0. Используйте mode="selectable".');
      deprecatedRemovable && warn('Свойство removable устарелo и будет удалено в 5.0.0. Используйте mode="removable".');
    }
  } // /end TODO


  var selectable = mode === "selectable";
  var removable = mode === "removable";
  var platform = (0, _usePlatform.usePlatform)();

  var _useDraggable = (0, _useDraggable2.useDraggable)({
    onDragFinish: onDragFinish
  }),
      dragging = _useDraggable.dragging,
      rootElRef = _useDraggable.rootElRef,
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
    dragger = (0, _jsxRuntime.createScopedElement)(_CellDragger.CellDragger, (0, _extends2.default)({
      vkuiClass: "Cell__dragger",
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
    checkbox = (0, _jsxRuntime.createScopedElement)(_CellCheckbox.CellCheckbox, (0, _extends2.default)({
      vkuiClass: "Cell__checkbox"
    }, checkboxProps));
  }

  var simpleCellDisabled = draggable && !selectable || removable || disabled;
  var hasActive = !simpleCellDisabled && !dragging;
  var cellClasses = (0, _classNames.classNames)((0, _getClassName.getClassName)("Cell", platform), {
    "Cell--dragging": dragging,
    "Cell--removable": removable,
    "Cell--selectable": selectable,
    "Cell--disabled": disabled
  });
  var simpleCell = (0, _jsxRuntime.createScopedElement)(_SimpleCell.default, (0, _extends2.default)({
    hasActive: hasActive,
    hasHover: hasActive
  }, restProps, {
    vkuiClass: "Cell__content",
    disabled: simpleCellDisabled,
    Component: selectable ? "label" : Component,
    before: (0, _jsxRuntime.createScopedElement)(React.Fragment, null, draggable && (platform === _platform.ANDROID || platform === _platform.VKCOM) && dragger, selectable && checkbox, before),
    after: (0, _jsxRuntime.createScopedElement)(React.Fragment, null, draggable && platform === _platform.IOS && dragger, after)
  }));

  if (removable) {
    return (0, _jsxRuntime.createScopedElement)(_Removable.Removable, {
      vkuiClass: cellClasses,
      className: className,
      style: style,
      getRootRef: rootElRef,
      removePlaceholder: removePlaceholder,
      onRemove: function onRemove(e) {
        return _onRemove(e, rootElRef === null || rootElRef === void 0 ? void 0 : rootElRef.current);
      }
    }, simpleCell);
  }

  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: cellClasses,
    className: className,
    style: style,
    ref: rootElRef
  }, simpleCell);
};

exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map