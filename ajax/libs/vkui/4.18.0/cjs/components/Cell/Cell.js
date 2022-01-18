"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _Touch = require("../Touch/Touch");

var _platform = require("../../lib/platform");

var _icons = require("@vkontakte/icons");

var _SimpleCell = _interopRequireDefault(require("../SimpleCell/SimpleCell"));

var _Removable = require("../Removable/Removable");

var _usePlatform = require("../../hooks/usePlatform");

var _ListContext = require("../../components/List/ListContext");

var _excluded = ["onRemove", "removePlaceholder", "onDragFinish", "className", "style", "before", "after", "disabled", "removable", "draggable", "selectable", "Component", "onChange", "name", "checked", "defaultChecked", "getRootRef"];

var Cell = function Cell(props) {
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
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var rootElRef = React.useRef(null);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      dragging = _React$useState2[0],
      setDragging = _React$useState2[1];

  var _React$useState3 = React.useState(undefined),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      siblings = _React$useState4[0],
      setSiblings = _React$useState4[1];

  var _React$useState5 = React.useState(undefined),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      dragStartIndex = _React$useState6[0],
      setDragStartIndex = _React$useState6[1];

  var _React$useState7 = React.useState(undefined),
      _React$useState8 = (0, _slicedToArray2.default)(_React$useState7, 2),
      dragEndIndex = _React$useState8[0],
      setDragEndIndex = _React$useState8[1];

  var _React$useState9 = React.useState(0),
      _React$useState10 = (0, _slicedToArray2.default)(_React$useState9, 2),
      dragShift = _React$useState10[0],
      setDragShift = _React$useState10[1];

  var _React$useState11 = React.useState(undefined),
      _React$useState12 = (0, _slicedToArray2.default)(_React$useState11, 2),
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
  }, [dragging]);
  var IconOff = platform === _platform.ANDROID ? _icons.Icon24CheckBoxOff : _icons.Icon24CheckCircleOff;
  var IconOn = platform === _platform.ANDROID ? _icons.Icon24CheckBoxOn : _icons.Icon24CheckCircleOn;
  var simpleCell = (0, _jsxRuntime.createScopedElement)(_SimpleCell.default, (0, _extends2.default)({}, restProps, {
    disabled: draggable || removable || disabled,
    Component: selectable ? 'label' : Component,
    htmlFor: selectable ? name : undefined,
    before: (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (platform === _platform.ANDROID || platform === _platform.VKCOM) && draggable && (0, _jsxRuntime.createScopedElement)(_Touch.Touch, {
      vkuiClass: "Cell__dragger",
      onStart: onDragStart,
      onMoveY: onDragMove,
      onEnd: onDragEnd,
      onClick: onDragClick
    }, (0, _jsxRuntime.createScopedElement)(_icons.Icon24Reorder, null)), selectable && (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _jsxRuntime.createScopedElement)("input", {
      type: "checkbox",
      vkuiClass: "Cell__checkbox",
      name: name,
      onChange: onChange,
      defaultChecked: defaultChecked,
      checked: checked,
      disabled: disabled
    }), (0, _jsxRuntime.createScopedElement)("span", {
      vkuiClass: "Cell__marker"
    }, (0, _jsxRuntime.createScopedElement)(IconOff, {
      vkuiClass: "Cell__marker-in"
    }), (0, _jsxRuntime.createScopedElement)(IconOn, {
      vkuiClass: "Cell__marker-in Cell__marker-in--checked"
    }))), before),
    after: (0, _jsxRuntime.createScopedElement)(React.Fragment, null, platform === _platform.IOS && draggable && (0, _jsxRuntime.createScopedElement)(_Touch.Touch, {
      vkuiClass: "Cell__dragger",
      onStart: onDragStart,
      onMoveY: onDragMove,
      onEnd: onDragEnd,
      onClick: onDragClick
    }, (0, _jsxRuntime.createScopedElement)(_icons.Icon24ReorderIos, null)), after)
  }));
  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Cell', platform), {
      'Cell--dragging': dragging,
      'Cell--removable': removable,
      'Cell--selectable': selectable,
      'Cell--disabled': disabled
    }),
    className: className,
    style: style,
    ref: rootElRef
  }, removable ? (0, _jsxRuntime.createScopedElement)(_Removable.Removable, {
    removePlaceholder: removePlaceholder,
    onRemove: function onRemove(e) {
      return _onRemove(e, rootElRef === null || rootElRef === void 0 ? void 0 : rootElRef.current);
    }
  }, simpleCell) : simpleCell);
};

exports.Cell = Cell;
Cell.defaultProps = {
  removePlaceholder: 'Удалить'
};
//# sourceMappingURL=Cell.js.map