import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "onRemove", "removePlaceholder", "onDragFinish", "before", "after", "disabled", "removable", "draggable", "selectable", "Component", "onChange", "name", "value", "checked", "defaultChecked", "getRootRef", "draggerLabel", "className", "style"],
    _excluded2 = ["dragging", "rootElRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { noop } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { getClassName } from "../../helpers/getClassName";
import { ANDROID, IOS, VKCOM } from "../../lib/platform";
import SimpleCell from "../SimpleCell/SimpleCell";
import { Removable } from "../Removable/Removable";
import { usePlatform } from "../../hooks/usePlatform";
import { useDraggable } from "./useDraggable";
import { ListContext } from "../List/ListContext";
import { CellDragger } from "./CellDragger/CellDragger";
import { CellCheckbox } from "./CellCheckbox/CellCheckbox";
var warn = warnOnce("Cell");
export var Cell = function Cell(_ref) {
  var propsMode = _ref.mode,
      _ref$onRemove = _ref.onRemove,
      _onRemove = _ref$onRemove === void 0 ? noop : _ref$onRemove,
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
      restProps = _objectWithoutProperties(_ref, _excluded);

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
  var platform = usePlatform();

  var _useDraggable = useDraggable({
    onDragFinish: onDragFinish
  }),
      dragging = _useDraggable.dragging,
      rootElRef = _useDraggable.rootElRef,
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
    dragger = createScopedElement(CellDragger, _extends({
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
    checkbox = createScopedElement(CellCheckbox, _extends({
      vkuiClass: "Cell__checkbox"
    }, checkboxProps));
  }

  var simpleCellDisabled = draggable && !selectable || removable || disabled;
  var hasActive = !simpleCellDisabled && !dragging;
  var cellClasses = classNames(getClassName("Cell", platform), {
    "Cell--dragging": dragging,
    "Cell--removable": removable,
    "Cell--selectable": selectable,
    "Cell--disabled": disabled
  });
  var simpleCell = createScopedElement(SimpleCell, _extends({
    hasActive: hasActive,
    hasHover: hasActive
  }, restProps, {
    vkuiClass: "Cell__content",
    disabled: simpleCellDisabled,
    Component: selectable ? "label" : Component,
    before: createScopedElement(React.Fragment, null, draggable && (platform === ANDROID || platform === VKCOM) && dragger, selectable && checkbox, before),
    after: createScopedElement(React.Fragment, null, draggable && platform === IOS && dragger, after)
  }));

  if (removable) {
    return createScopedElement(Removable, {
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

  return createScopedElement("div", {
    vkuiClass: cellClasses,
    className: className,
    style: style,
    ref: rootElRef
  }, simpleCell);
};
//# sourceMappingURL=Cell.js.map