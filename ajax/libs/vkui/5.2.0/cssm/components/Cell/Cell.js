import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "onRemove", "removePlaceholder", "onDragFinish", "before", "after", "disabled", "draggable", "Component", "onChange", "name", "value", "checked", "defaultChecked", "getRootRef", "draggerLabel", "className", "style"],
  _excluded2 = ["dragging"];
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { SimpleCell } from '../SimpleCell/SimpleCell';
import { Removable } from '../Removable/Removable';
import { usePlatform } from '../../hooks/usePlatform';
import { useExternRef } from '../../hooks/useExternRef';
import { useDraggable } from './useDraggable';
import { ListContext } from '../List/ListContext';
import { CellDragger } from './CellDragger/CellDragger';
import { CellCheckbox } from './CellCheckbox/CellCheckbox';
import "./Cell.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Cell
 */
export var Cell = function Cell(_ref) {
  var mode = _ref.mode,
    _ref$onRemove = _ref.onRemove,
    _onRemove = _ref$onRemove === void 0 ? noop : _ref$onRemove,
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  var selectable = mode === 'selectable';
  var removable = mode === 'removable';
  var platform = usePlatform();
  var rootElRef = useExternRef(getRootRef);
  var _useDraggable = useDraggable({
      rootElRef: rootElRef,
      onDragFinish: onDragFinish
    }),
    dragging = _useDraggable.dragging,
    draggableProps = _objectWithoutProperties(_useDraggable, _excluded2);
  var _React$useContext = React.useContext(ListContext),
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
    dragger = /*#__PURE__*/React.createElement(CellDragger, _extends({
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
    checkbox = /*#__PURE__*/React.createElement(CellCheckbox, _extends({
      className: "vkuiCell__checkbox"
    }, checkboxProps));
  }
  var simpleCellDisabled = draggable && !selectable || removable || disabled;
  var hasActive = !simpleCellDisabled && !dragging;
  var cellClasses = classNames("vkuiCell", platform === Platform.IOS && "vkuiCell--ios", dragging && "vkuiCell--dragging", removable && "vkuiCell--removable", selectable && "vkuiCell--selectable", disabled && "vkuiCell--disabled");
  var simpleCell = /*#__PURE__*/React.createElement(SimpleCell, _extends({
    hasActive: hasActive,
    hasHover: hasActive
  }, restProps, {
    className: "vkuiCell__content",
    disabled: simpleCellDisabled,
    Component: selectable ? 'label' : Component,
    before: /*#__PURE__*/React.createElement(React.Fragment, null, draggable && platform !== Platform.IOS && dragger, selectable && checkbox, before),
    after: /*#__PURE__*/React.createElement(React.Fragment, null, draggable && platform === Platform.IOS && dragger, after)
  }));
  if (removable) {
    return /*#__PURE__*/React.createElement(Removable, {
      className: classNames(cellClasses, className),
      style: style,
      getRootRef: rootElRef,
      removePlaceholder: removePlaceholder,
      onRemove: function onRemove(e) {
        return _onRemove(e, rootElRef.current);
      }
    }, simpleCell);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(cellClasses, className),
    style: style,
    ref: rootElRef
  }, simpleCell);
};
//# sourceMappingURL=Cell.js.map