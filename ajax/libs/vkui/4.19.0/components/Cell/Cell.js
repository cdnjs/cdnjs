import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["onRemove", "removePlaceholder", "onDragFinish", "className", "style", "before", "after", "disabled", "removable", "draggable", "selectable", "Component", "onChange", "name", "checked", "defaultChecked", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { Touch } from "../Touch/Touch";
import { ANDROID, IOS, VKCOM } from "../../lib/platform";
import { Icon24Reorder, Icon24ReorderIos, Icon24CheckCircleOn, Icon24CheckCircleOff, Icon24CheckBoxOff, Icon24CheckBoxOn } from '@vkontakte/icons';
import SimpleCell from "../SimpleCell/SimpleCell";
import { Removable } from "../Removable/Removable";
import { usePlatform } from "../../hooks/usePlatform";
import { ListContext } from "../../components/List/ListContext";
export var Cell = function Cell(props) {
  var _onRemove = props.onRemove,
      removePlaceholder = props.removePlaceholder,
      onDragFinish = props.onDragFinish,
      className = props.className,
      style = props.style,
      before = props.before,
      after = props.after,
      disabled = props.disabled,
      removable = props.removable,
      draggable = props.draggable,
      selectable = props.selectable,
      Component = props.Component,
      onChange = props.onChange,
      name = props.name,
      checked = props.checked,
      defaultChecked = props.defaultChecked,
      getRootRef = props.getRootRef,
      restProps = _objectWithoutProperties(props, _excluded);

  var rootElRef = React.useRef(null);
  var platform = usePlatform();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      dragging = _React$useState2[0],
      setDragging = _React$useState2[1];

  var _React$useState3 = React.useState(undefined),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      siblings = _React$useState4[0],
      setSiblings = _React$useState4[1];

  var _React$useState5 = React.useState(undefined),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      dragStartIndex = _React$useState6[0],
      setDragStartIndex = _React$useState6[1];

  var _React$useState7 = React.useState(undefined),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      dragEndIndex = _React$useState8[0],
      setDragEndIndex = _React$useState8[1];

  var _React$useState9 = React.useState(0),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      dragShift = _React$useState10[0],
      setDragShift = _React$useState10[1];

  var _React$useState11 = React.useState(undefined),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      dragDirection = _React$useState12[0],
      setDragDirection = _React$useState12[1];

  var onDragStart = function onDragStart() {
    var rootEl = rootElRef === null || rootElRef === void 0 ? void 0 : rootElRef.current;
    setDragging(true);

    var _siblings = Array.from(rootEl.parentElement.childNodes);

    var rootElIdx = _siblings.indexOf(rootEl);

    setDragStartIndex(rootElIdx);
    setDragEndIndex(rootElIdx);
    setSiblings(_siblings);
    setDragShift(0);
  };

  var onDragMove = function onDragMove(e) {
    e.originalEvent.preventDefault();
    var rootEl = rootElRef === null || rootElRef === void 0 ? void 0 : rootElRef.current;
    rootEl.style.transform = "translateY(".concat(e.shiftY, "px)");
    setDragDirection(dragShift - e.shiftY < 0 ? 'down' : 'up');
    setDragShift(e.shiftY);
    setDragEndIndex(dragStartIndex);
    siblings.forEach(function (sibling, siblingIndex) {
      var rootGesture = rootEl.getBoundingClientRect();
      var siblingGesture = sibling.getBoundingClientRect();

      if (dragStartIndex < siblingIndex) {
        if (rootGesture.bottom > siblingGesture.top + siblingGesture.height / 2) {
          if (dragDirection === 'down') {
            sibling.style.transform = 'translateY(-100%)';
          }

          setDragEndIndex(function (dragEndIndex) {
            return dragEndIndex + 1;
          });
        }

        if (rootGesture.top < siblingGesture.bottom - siblingGesture.height / 2 && dragDirection === 'up') {
          sibling.style.transform = 'translateY(0)';
        }
      } else if (dragStartIndex > siblingIndex) {
        if (rootGesture.top < siblingGesture.bottom - siblingGesture.height / 2) {
          if (dragDirection === 'up') {
            sibling.style.transform = 'translateY(100%)';
          }

          setDragEndIndex(function (dragEndIndex) {
            return dragEndIndex - 1;
          });
        }

        if (rootGesture.bottom > siblingGesture.top + siblingGesture.height / 2 && dragDirection === 'down') {
          sibling.style.transform = 'translateY(0)';
        }
      }
    });
  };

  var onDragEnd = function onDragEnd() {
    var from = dragStartIndex,
        to = dragEndIndex;
    siblings.forEach(function (sibling) {
      sibling.style.transform = null;
    });
    setSiblings(undefined);
    setDragEndIndex(undefined);
    setDragStartIndex(undefined);
    setDragDirection(undefined);
    setDragShift(undefined);
    setDragging(false);
    props.onDragFinish && props.onDragFinish({
      from: from,
      to: to
    });
  };

  var onDragClick = function onDragClick(e) {
    e.nativeEvent.stopPropagation();
    e.preventDefault();
  };

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
  }, [dragging]);
  var IconOff = platform === ANDROID ? Icon24CheckBoxOff : Icon24CheckCircleOff;
  var IconOn = platform === ANDROID ? Icon24CheckBoxOn : Icon24CheckCircleOn;
  var simpleCell = createScopedElement(SimpleCell, _extends({}, restProps, {
    disabled: draggable || removable || disabled,
    Component: selectable ? 'label' : Component,
    htmlFor: selectable ? name : undefined,
    before: createScopedElement(React.Fragment, null, (platform === ANDROID || platform === VKCOM) && draggable && createScopedElement(Touch, {
      vkuiClass: "Cell__dragger",
      onStart: onDragStart,
      onMoveY: onDragMove,
      onEnd: onDragEnd,
      onClick: onDragClick
    }, createScopedElement(Icon24Reorder, null)), selectable && createScopedElement(React.Fragment, null, createScopedElement("input", {
      type: "checkbox",
      vkuiClass: "Cell__checkbox",
      name: name,
      onChange: onChange,
      defaultChecked: defaultChecked,
      checked: checked,
      disabled: disabled
    }), createScopedElement("span", {
      vkuiClass: "Cell__marker"
    }, createScopedElement(IconOff, {
      vkuiClass: "Cell__marker-in"
    }), createScopedElement(IconOn, {
      vkuiClass: "Cell__marker-in Cell__marker-in--checked"
    }))), before),
    after: createScopedElement(React.Fragment, null, platform === IOS && draggable && createScopedElement(Touch, {
      vkuiClass: "Cell__dragger",
      onStart: onDragStart,
      onMoveY: onDragMove,
      onEnd: onDragEnd,
      onClick: onDragClick
    }, createScopedElement(Icon24ReorderIos, null)), after)
  }));
  return createScopedElement("div", {
    vkuiClass: classNames(getClassName('Cell', platform), {
      'Cell--dragging': dragging,
      'Cell--removable': removable,
      'Cell--selectable': selectable,
      'Cell--disabled': disabled
    }),
    className: className,
    style: style,
    ref: rootElRef
  }, removable ? createScopedElement(Removable, {
    removePlaceholder: removePlaceholder,
    onRemove: function onRemove(e) {
      return _onRemove(e, rootElRef === null || rootElRef === void 0 ? void 0 : rootElRef.current);
    }
  }, simpleCell) : simpleCell);
};
Cell.defaultProps = {
  removePlaceholder: 'Удалить'
};
//# sourceMappingURL=Cell.js.map