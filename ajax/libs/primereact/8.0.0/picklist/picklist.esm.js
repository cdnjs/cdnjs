import * as React from 'react';
import { useUpdateEffect } from 'primereact/hooks';
import { classNames, ObjectUtils, DomHandler } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var PickListControls = /*#__PURE__*/React.memo(function (props) {
  var moveDisabled = !props.selection.length;

  var moveUp = function moveUp(event) {
    var selectedItems = props.selection;

    if (selectedItems && selectedItems.length) {
      var list = _toConsumableArray(props.list);

      for (var i = 0; i < selectedItems.length; i++) {
        var selectedItem = selectedItems[i];
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);

        if (selectedItemIndex !== 0) {
          var movedItem = list[selectedItemIndex];
          var temp = list[selectedItemIndex - 1];
          list[selectedItemIndex - 1] = movedItem;
          list[selectedItemIndex] = temp;
        } else {
          break;
        }
      }

      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: list,
          direction: 'up'
        });
      }
    }
  };

  var moveTop = function moveTop(event) {
    var selectedItems = props.selection;

    if (selectedItems && selectedItems.length) {
      var list = _toConsumableArray(props.list);

      for (var i = 0; i < selectedItems.length; i++) {
        var selectedItem = selectedItems[i];
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);

        if (selectedItemIndex !== 0) {
          var movedItem = list.splice(selectedItemIndex, 1)[0];
          list.unshift(movedItem);
        } else {
          break;
        }
      }

      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: list,
          direction: 'top'
        });
      }
    }
  };

  var moveDown = function moveDown(event) {
    var selectedItems = props.selection;

    if (selectedItems && selectedItems.length) {
      var list = _toConsumableArray(props.list);

      for (var i = selectedItems.length - 1; i >= 0; i--) {
        var selectedItem = selectedItems[i];
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);

        if (selectedItemIndex !== list.length - 1) {
          var movedItem = list[selectedItemIndex];
          var temp = list[selectedItemIndex + 1];
          list[selectedItemIndex + 1] = movedItem;
          list[selectedItemIndex] = temp;
        } else {
          break;
        }
      }

      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: list,
          direction: 'down'
        });
      }
    }
  };

  var moveBottom = function moveBottom(event) {
    var selectedItems = props.selection;

    if (selectedItems && selectedItems.length) {
      var list = _toConsumableArray(props.list);

      for (var i = selectedItems.length - 1; i >= 0; i--) {
        var selectedItem = selectedItems[i];
        var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list, props.dataKey);

        if (selectedItemIndex !== list.length - 1) {
          var movedItem = list.splice(selectedItemIndex, 1)[0];
          list.push(movedItem);
        } else {
          break;
        }
      }

      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: list,
          direction: 'bottom'
        });
      }
    }
  };

  var className = classNames('p-picklist-buttons', props.className);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(Button, {
    disabled: moveDisabled,
    type: "button",
    icon: "pi pi-angle-up",
    onClick: moveUp
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveDisabled,
    type: "button",
    icon: "pi pi-angle-double-up",
    onClick: moveTop
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveDisabled,
    type: "button",
    icon: "pi pi-angle-down",
    onClick: moveDown
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveDisabled,
    type: "button",
    icon: "pi pi-angle-double-down",
    onClick: moveBottom
  }));
});
PickListControls.displayName = 'PickListControls';

var PickListItem = /*#__PURE__*/React.memo(function (props) {
  var onClick = function onClick(event) {
    if (props.onClick) {
      props.onClick({
        originalEvent: event,
        value: props.value
      });
    }
  };

  var onKeyDown = function onKeyDown(event) {
    if (props.onKeyDown) {
      props.onKeyDown({
        originalEvent: event,
        value: props.value
      });
    }
  };

  var content = props.template ? props.template(props.value) : props.value;
  var className = classNames('p-picklist-item', {
    'p-highlight': props.selected
  }, props.className);
  return /*#__PURE__*/React.createElement("li", {
    className: className,
    onClick: onClick,
    onKeyDown: onKeyDown,
    tabIndex: props.tabIndex,
    role: "option",
    "aria-selected": props.selected
  }, content, /*#__PURE__*/React.createElement(Ripple, null));
});
PickListItem.displayName = 'PickListItem';

var PickListSubList = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var listElementRef = React.useRef(null);

  var onItemClick = function onItemClick(event) {
    var originalEvent = event.originalEvent;
    var item = event.value;

    var selection = _toConsumableArray(props.selection);

    var index = ObjectUtils.findIndexInList(item, selection, props.dataKey);
    var selected = index !== -1;
    var metaSelection = props.metaKeySelection;

    if (metaSelection) {
      var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;

      if (selected && metaKey) {
        selection.splice(index, 1);
      } else {
        if (!metaKey) {
          selection.length = 0;
        }

        selection.push(item);
      }
    } else {
      if (selected) selection.splice(index, 1);else selection.push(item);
    }

    if (props.onSelectionChange) {
      props.onSelectionChange({
        event: originalEvent,
        value: selection
      });
    }
  };

  var onItemKeyDown = function onItemKeyDown(event) {
    var originalEvent = event.originalEvent;
    var listItem = originalEvent.currentTarget;

    switch (originalEvent.which) {
      //down
      case 40:
        var nextItem = findNextItem(listItem);
        nextItem && nextItem.focus();
        originalEvent.preventDefault();
        break;
      //up

      case 38:
        var prevItem = findPrevItem(listItem);
        prevItem && prevItem.focus();
        originalEvent.preventDefault();
        break;
      //enter

      case 13:
        onItemClick(event);
        originalEvent.preventDefault();
        break;
    }
  };

  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? !DomHandler.hasClass(nextItem, 'p-picklist-item') ? findNextItem(nextItem) : nextItem : null;
  };

  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? !DomHandler.hasClass(prevItem, 'p-picklist-item') ? findPrevItem(prevItem) : prevItem : null;
  };

  var isSelected = function isSelected(item) {
    return ObjectUtils.findIndexInList(item, props.selection, props.dataKey) !== -1;
  };

  React.useImperativeHandle(ref, function () {
    return {
      listElementRef: listElementRef
    };
  });

  var createHeader = function createHeader() {
    if (props.header) {
      return /*#__PURE__*/React.createElement("div", {
        className: "p-picklist-header"
      }, ObjectUtils.getJSXElement(props.header, props));
    }

    return null;
  };

  var createItems = function createItems() {
    if (props.list) {
      return props.list.map(function (item) {
        var key = JSON.stringify(item);
        var selected = isSelected(item);
        return /*#__PURE__*/React.createElement(PickListItem, {
          key: key,
          value: item,
          template: props.itemTemplate,
          selected: selected,
          onClick: onItemClick,
          onKeyDown: onItemKeyDown,
          tabIndex: props.tabIndex
        });
      });
    }

    return null;
  };

  var createList = function createList() {
    var items = createItems();
    var className = classNames('p-picklist-list', props.listClassName);
    return /*#__PURE__*/React.createElement("ul", {
      className: className,
      style: props.style,
      role: "listbox",
      "aria-multiselectable": true
    }, items);
  };

  var className = classNames('p-picklist-list-wrapper', props.className);
  var header = createHeader();
  var list = createList();
  return /*#__PURE__*/React.createElement("div", {
    ref: listElementRef,
    className: className
  }, header, list);
}));
PickListSubList.displayName = 'PickListSubList';

var PickListTransferControls = /*#__PURE__*/React.memo(function (props) {
  var moveRightDisabled = ObjectUtils.isEmpty(props.sourceSelection);
  var moveLeftDisabled = ObjectUtils.isEmpty(props.targetSelection);
  var moveAllRightDisabled = ObjectUtils.isEmpty(props.source);
  var moveAllLeftDisabled = ObjectUtils.isEmpty(props.target);

  var moveRight = function moveRight(event) {
    var selection = props.sourceSelection;

    if (ObjectUtils.isNotEmpty(selection)) {
      var targetList = _toConsumableArray(props.target);

      var sourceList = _toConsumableArray(props.source);

      for (var i = 0; i < selection.length; i++) {
        var selectedItem = selection[i];

        if (ObjectUtils.findIndexInList(selectedItem, targetList, props.dataKey) === -1) {
          targetList.push(sourceList.splice(ObjectUtils.findIndexInList(selectedItem, sourceList, props.dataKey), 1)[0]);
        }
      }

      if (props.onTransfer) {
        props.onTransfer({
          originalEvent: event,
          source: sourceList,
          target: targetList,
          direction: 'toTarget'
        });
      }
    }
  };

  var moveAllRight = function moveAllRight(event) {
    if (props.source) {
      var targetList = [].concat(_toConsumableArray(props.target), _toConsumableArray(props.source));
      var sourceList = [];

      if (props.onTransfer) {
        props.onTransfer({
          originalEvent: event,
          source: sourceList,
          target: targetList,
          direction: 'allToTarget'
        });
      }
    }
  };

  var moveLeft = function moveLeft(event) {
    var selection = props.targetSelection;

    if (ObjectUtils.isNotEmpty(selection)) {
      var targetList = _toConsumableArray(props.target);

      var sourceList = _toConsumableArray(props.source);

      for (var i = 0; i < selection.length; i++) {
        var selectedItem = selection[i];

        if (ObjectUtils.findIndexInList(selectedItem, sourceList, props.dataKey) === -1) {
          sourceList.push(targetList.splice(ObjectUtils.findIndexInList(selectedItem, targetList, props.dataKey), 1)[0]);
        }
      }

      if (props.onTransfer) {
        props.onTransfer({
          originalEvent: event,
          source: sourceList,
          target: targetList,
          direction: 'toSource'
        });
      }
    }
  };

  var moveAllLeft = function moveAllLeft(event) {
    if (props.source) {
      var sourceList = [].concat(_toConsumableArray(props.source), _toConsumableArray(props.target));
      var targetList = [];

      if (props.onTransfer) {
        props.onTransfer({
          originalEvent: event,
          source: sourceList,
          target: targetList,
          direction: 'allToSource'
        });
      }
    }
  };

  var className = classNames('p-picklist-buttons p-picklist-transfer-buttons', props.className);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(Button, {
    disabled: moveRightDisabled,
    type: "button",
    icon: "pi pi-angle-right",
    onClick: moveRight
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveAllRightDisabled,
    type: "button",
    icon: "pi pi-angle-double-right",
    onClick: moveAllRight
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveLeftDisabled,
    type: "button",
    icon: "pi pi-angle-left",
    onClick: moveLeft
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: moveAllLeftDisabled,
    type: "button",
    icon: "pi pi-angle-double-left",
    onClick: moveAllLeft
  }));
});
PickListTransferControls.displayName = 'PickListTransferControls';

var PickList = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      sourceSelectionState = _React$useState2[0],
      setSourceSelectionState = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      targetSelectionState = _React$useState4[0],
      setTargetSelectionState = _React$useState4[1];

  var sourceListElementRef = React.useRef(null);
  var targetListElementRef = React.useRef(null);
  var reorderedListElementRef = React.useRef(null);
  var reorderDirection = React.useRef(null);
  var sourceSelection = props.onSourceSelectionChange ? props.sourceSelection : sourceSelectionState;
  var targetSelection = props.onTargetSelectionChange ? props.targetSelection : targetSelectionState;

  var onSourceReorder = function onSourceReorder(event) {
    handleChange(event, event.value, props.target);
    reorderedListElementRef.current = sourceListElementRef.current.listElementRef.current;
    reorderDirection.current = event.direction;
  };

  var onTargetReorder = function onTargetReorder(event) {
    handleChange(event, props.source, event.value);
    reorderedListElementRef.current = targetListElementRef.current.listElementRef.current;
    reorderDirection.current = event.direction;
  };

  var handleScrollPosition = function handleScrollPosition(listElement, direction) {
    if (listElement) {
      var list = DomHandler.findSingle(listElement, '.p-picklist-list');

      switch (direction) {
        case 'up':
          scrollInView(list, -1);
          break;

        case 'top':
          list.scrollTop = 0;
          break;

        case 'down':
          scrollInView(list, 1);
          break;

        case 'bottom':
          /* TODO: improve this code block */
          setTimeout(function () {
            return list.scrollTop = list.scrollHeight;
          }, 100);
          break;
      }
    }
  };

  var handleChange = function handleChange(event, source, target) {
    if (props.onChange) {
      props.onChange({
        originalEvent: event.originalEvent,
        source: source,
        target: target
      });
    }
  };

  var onTransfer = function onTransfer(event) {
    var originalEvent = event.originalEvent,
        source = event.source,
        target = event.target,
        direction = event.direction;

    switch (direction) {
      case 'toTarget':
        if (props.onMoveToTarget) {
          props.onMoveToTarget({
            originalEvent: originalEvent,
            value: sourceSelection
          });
        }

        break;

      case 'allToTarget':
        if (props.onMoveAllToTarget) {
          props.onMoveAllToTarget({
            originalEvent: originalEvent,
            value: props.source
          });
        }

        break;

      case 'toSource':
        if (props.onMoveToSource) {
          props.onMoveToSource({
            originalEvent: originalEvent,
            value: targetSelection
          });
        }

        break;

      case 'allToSource':
        if (props.onMoveAllToSource) {
          props.onMoveAllToSource({
            originalEvent: originalEvent,
            value: props.target
          });
        }

        break;
    }

    _onSelectionChange({
      originalEvent: originalEvent,
      value: []
    }, 'sourceSelection', props.onSourceSelectionChange);

    _onSelectionChange({
      originalEvent: originalEvent,
      value: []
    }, 'targetSelection', props.onTargetSelectionChange);

    handleChange(event, source, target);
  };

  var scrollInView = function scrollInView(listContainer) {
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var selectedItems = listContainer.getElementsByClassName('p-highlight');

    if (ObjectUtils.isNotEmpty(selectedItems)) {
      DomHandler.scrollInView(listContainer, direction === -1 ? selectedItems[0] : selectedItems[selectedItems.length - 1]);
    }
  };

  var _onSelectionChange = function onSelectionChange(e, stateKey, callback) {
    if (callback) {
      callback(e);
    } else {
      if (stateKey === 'sourceSelection') setSourceSelectionState(e.value);else setTargetSelectionState(e.value);
    }

    if (ObjectUtils.isNotEmpty(sourceSelection) && stateKey === 'targetSelection') {
      setSourceSelectionState([]);
    } else if (ObjectUtils.isNotEmpty(targetSelection) && stateKey === 'sourceSelection') {
      setTargetSelectionState([]);
    }
  };

  useUpdateEffect(function () {
    if (reorderedListElementRef.current) {
      handleScrollPosition(reorderedListElementRef.current, reorderDirection.current);
      reorderedListElementRef.current = null;
      reorderDirection.current = null;
    }
  });
  var otherProps = ObjectUtils.findDiffKeys(props, PickList.defaultProps);
  var className = classNames('p-picklist p-component', props.className);
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    className: className,
    style: props.style
  }, otherProps), props.showSourceControls && /*#__PURE__*/React.createElement(PickListControls, {
    list: props.source,
    selection: sourceSelection,
    onReorder: onSourceReorder,
    className: "p-picklist-source-controls",
    dataKey: props.dataKey
  }), /*#__PURE__*/React.createElement(PickListSubList, {
    ref: sourceListElementRef,
    list: props.source,
    selection: sourceSelection,
    onSelectionChange: function onSelectionChange(e) {
      return _onSelectionChange(e, 'sourceSelection', props.onSourceSelectionChange);
    },
    itemTemplate: props.itemTemplate,
    header: props.sourceHeader,
    style: props.sourceStyle,
    className: "p-picklist-source-wrapper",
    listClassName: "p-picklist-source",
    metaKeySelection: props.metaKeySelection,
    tabIndex: props.tabIndex,
    dataKey: props.dataKey
  }), /*#__PURE__*/React.createElement(PickListTransferControls, {
    onTransfer: onTransfer,
    source: props.source,
    target: props.target,
    sourceSelection: sourceSelection,
    targetSelection: targetSelection,
    dataKey: props.dataKey
  }), /*#__PURE__*/React.createElement(PickListSubList, {
    ref: targetListElementRef,
    list: props.target,
    selection: targetSelection,
    onSelectionChange: function onSelectionChange(e) {
      return _onSelectionChange(e, 'targetSelection', props.onTargetSelectionChange);
    },
    itemTemplate: props.itemTemplate,
    header: props.targetHeader,
    style: props.targetStyle,
    className: "p-picklist-target-wrapper",
    listClassName: "p-picklist-target",
    metaKeySelection: props.metaKeySelection,
    tabIndex: props.tabIndex,
    dataKey: props.dataKey
  }), props.showTargetControls && /*#__PURE__*/React.createElement(PickListControls, {
    list: props.target,
    selection: targetSelection,
    onReorder: onTargetReorder,
    className: "p-picklist-target-controls",
    dataKey: props.dataKey
  }));
}));
PickList.displayName = 'PickList';
PickList.defaultProps = {
  __TYPE: 'PickList',
  id: null,
  source: null,
  target: null,
  sourceHeader: null,
  targetHeader: null,
  style: null,
  className: null,
  sourceStyle: null,
  targetStyle: null,
  sourceSelection: null,
  targetSelection: null,
  showSourceControls: true,
  showTargetControls: true,
  metaKeySelection: true,
  tabIndex: 0,
  dataKey: null,
  itemTemplate: null,
  onChange: null,
  onMoveToSource: null,
  onMoveAllToSource: null,
  onMoveToTarget: null,
  onMoveAllToTarget: null,
  onSourceSelectionChange: null,
  onTargetSelectionChange: null
};

export { PickList };
