import * as React from 'react';
import { classNames, DomHandler, ObjectUtils } from 'primereact/utils';
import { ariaLabel } from 'primereact/api';
import { Ripple } from 'primereact/ripple';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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

function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
}

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var UITreeNode = /*#__PURE__*/React.memo(function (props) {
  var contentRef = React.useRef(null);
  var nodeTouched = React.useRef(false);
  var isLeaf = props.isNodeLeaf(props.node);
  var expanded = (props.expandedKeys ? props.expandedKeys[props.node.key] !== undefined : false) || props.node.expanded;

  var expand = function expand(event) {
    var expandedKeys = props.expandedKeys ? _objectSpread$1({}, props.expandedKeys) : {};
    expandedKeys[props.node.key] = true;
    props.onToggle({
      originalEvent: event,
      value: expandedKeys
    });
    invokeToggleEvents(event, true);
  };

  var collapse = function collapse(event) {
    var expandedKeys = _objectSpread$1({}, props.expandedKeys);

    delete expandedKeys[props.node.key];
    props.onToggle({
      originalEvent: event,
      value: expandedKeys
    });
    invokeToggleEvents(event, false);
  };

  var onTogglerClick = function onTogglerClick(event) {
    if (props.disabled) {
      return;
    }

    expanded ? collapse(event) : expand(event);
    event.preventDefault();
    event.stopPropagation();
  };

  var invokeToggleEvents = function invokeToggleEvents(event, isExpanded) {
    if (isExpanded) {
      if (props.onExpand) {
        props.onExpand({
          originalEvent: event,
          node: props.node
        });
      }
    } else {
      if (props.onCollapse) {
        props.onCollapse({
          originalEvent: event,
          node: props.node
        });
      }
    }
  };

  var onNodeKeyDown = function onNodeKeyDown(event) {
    if (props.disabled) {
      return;
    }

    var nodeElement = event.target.parentElement;

    if (!DomHandler.hasClass(nodeElement, 'p-treenode')) {
      return;
    }

    switch (event.which) {
      //down arrow
      case 40:
        var listElement = nodeElement.children[1];

        if (listElement) {
          focusNode(listElement.children[0]);
        } else {
          var nextNodeElement = nodeElement.nextElementSibling;

          while (nextNodeElement) {
            if (!DomHandler.hasClass(nextNodeElement, 'p-treenode-droppoint')) {
              break;
            }

            nextNodeElement = nextNodeElement.nextElementSibling;
          }

          if (nextNodeElement) {
            focusNode(nextNodeElement);
          } else {
            var nextSiblingAncestor = findNextSiblingOfAncestor(nodeElement);
            nextSiblingAncestor && focusNode(nextSiblingAncestor);
          }
        }

        event.preventDefault();
        break;
      //up arrow

      case 38:
        if (nodeElement.previousElementSibling) {
          focusNode(findLastVisibleDescendant(nodeElement.previousElementSibling));
        } else {
          var parentNodeElement = getParentNodeElement(nodeElement);
          parentNodeElement && focusNode(parentNodeElement);
        }

        event.preventDefault();
        break;
      //right arrow

      case 39:
        if (!expanded) {
          expand(event);
        }

        event.preventDefault();
        break;
      //left arrow

      case 37:
        if (expanded) {
          collapse(event);
        }

        event.preventDefault();
        break;
      //enter

      case 13:
        onClick(event);
        event.preventDefault();
        break;
    }
  };

  var findNextSiblingOfAncestor = function findNextSiblingOfAncestor(nodeElement) {
    var parentNodeElement = getParentNodeElement(nodeElement);
    return parentNodeElement ? parentNodeElement.nextElementSibling || findNextSiblingOfAncestor(parentNodeElement) : null;
  };

  var findLastVisibleDescendant = function findLastVisibleDescendant(nodeElement) {
    var childrenListElement = nodeElement.children[1];

    if (childrenListElement) {
      var lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
      return findLastVisibleDescendant(lastChildElement);
    } else {
      return nodeElement;
    }
  };

  var getParentNodeElement = function getParentNodeElement(nodeElement) {
    var parentNodeElement = nodeElement.parentElement.parentElement;
    return DomHandler.hasClass(parentNodeElement, 'p-treenode') ? parentNodeElement : null;
  };

  var focusNode = function focusNode(element) {
    element && element.children[0] && element.children[0].focus();
  };

  var onClick = function onClick(event) {
    if (props.onClick) {
      props.onClick({
        originalEvent: event,
        node: props.node
      });
    }

    var targetNode = event.target.nodeName;

    if (props.disabled || targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || DomHandler.hasClass(event.target, 'p-clickable')) {
      return;
    }

    if (props.selectionMode && props.node.selectable !== false) {
      var selectionKeys;

      if (isCheckboxSelectionMode()) {
        var checked = isChecked();
        selectionKeys = props.selectionKeys ? _objectSpread$1({}, props.selectionKeys) : {};

        if (checked) {
          if (props.propagateSelectionDown) propagateDown(props.node, false, selectionKeys);else delete selectionKeys[props.node.key];

          if (props.propagateSelectionUp && props.onPropagateUp) {
            props.onPropagateUp({
              originalEvent: event,
              check: false,
              selectionKeys: selectionKeys
            });
          }

          if (props.onUnselect) {
            props.onUnselect({
              originalEvent: event,
              node: props.node
            });
          }
        } else {
          if (props.propagateSelectionDown) propagateDown(props.node, true, selectionKeys);else selectionKeys[props.node.key] = {
            checked: true
          };

          if (props.propagateSelectionUp && props.onPropagateUp) {
            props.onPropagateUp({
              originalEvent: event,
              check: true,
              selectionKeys: selectionKeys
            });
          }

          if (props.onSelect) {
            props.onSelect({
              originalEvent: event,
              node: props.node
            });
          }
        }
      } else {
        var selected = isSelected();
        var metaSelection = nodeTouched.current ? false : props.metaKeySelection;

        if (metaSelection) {
          var metaKey = event.metaKey || event.ctrlKey;

          if (selected && metaKey) {
            if (isSingleSelectionMode()) {
              selectionKeys = null;
            } else {
              selectionKeys = _objectSpread$1({}, props.selectionKeys);
              delete selectionKeys[props.node.key];
            }

            if (props.onUnselect) {
              props.onUnselect({
                originalEvent: event,
                node: props.node
              });
            }
          } else {
            if (isSingleSelectionMode()) {
              selectionKeys = props.node.key;
            } else if (isMultipleSelectionMode()) {
              selectionKeys = !metaKey ? {} : props.selectionKeys ? _objectSpread$1({}, props.selectionKeys) : {};
              selectionKeys[props.node.key] = true;
            }

            if (props.onSelect) {
              props.onSelect({
                originalEvent: event,
                node: props.node
              });
            }
          }
        } else {
          if (isSingleSelectionMode()) {
            if (selected) {
              selectionKeys = null;

              if (props.onUnselect) {
                props.onUnselect({
                  originalEvent: event,
                  node: props.node
                });
              }
            } else {
              selectionKeys = props.node.key;

              if (props.onSelect) {
                props.onSelect({
                  originalEvent: event,
                  node: props.node
                });
              }
            }
          } else {
            if (selected) {
              selectionKeys = _objectSpread$1({}, props.selectionKeys);
              delete selectionKeys[props.node.key];

              if (props.onUnselect) {
                props.onUnselect({
                  originalEvent: event,
                  node: props.node
                });
              }
            } else {
              selectionKeys = props.selectionKeys ? _objectSpread$1({}, props.selectionKeys) : {};
              selectionKeys[props.node.key] = true;

              if (props.onSelect) {
                props.onSelect({
                  originalEvent: event,
                  node: props.node
                });
              }
            }
          }
        }
      }

      if (props.onSelectionChange) {
        props.onSelectionChange({
          originalEvent: event,
          value: selectionKeys
        });
      }
    }

    nodeTouched.current = false;
  };

  var onDoubleClick = function onDoubleClick(event) {
    if (props.onDoubleClick) {
      props.onDoubleClick({
        originalEvent: event,
        node: props.node
      });
    }
  };

  var onRightClick = function onRightClick(event) {
    if (props.disabled) {
      return;
    }

    DomHandler.clearSelection();

    if (props.onContextMenuSelectionChange) {
      props.onContextMenuSelectionChange({
        originalEvent: event,
        value: props.node.key
      });
    }

    if (props.onContextMenu) {
      props.onContextMenu({
        originalEvent: event,
        node: props.node
      });
    }
  };

  var propagateUp = function propagateUp(event) {
    var check = event.check;
    var selectionKeys = event.selectionKeys;
    var checkedChildCount = 0;
    var childPartialSelected = false;

    var _iterator = _createForOfIteratorHelper$1(props.node.children),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var child = _step.value;
        if (selectionKeys[child.key] && selectionKeys[child.key].checked) checkedChildCount++;else if (selectionKeys[child.key] && selectionKeys[child.key].partialChecked) childPartialSelected = true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (check && checkedChildCount === props.node.children.length) {
      selectionKeys[props.node.key] = {
        checked: true,
        partialChecked: false
      };
    } else {
      if (!check) {
        delete selectionKeys[props.node.key];
      }

      if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== props.node.children.length) selectionKeys[props.node.key] = {
        checked: false,
        partialChecked: true
      };else delete selectionKeys[props.node.key];
    }

    if (props.propagateSelectionUp && props.onPropagateUp) {
      props.onPropagateUp(event);
    }
  };

  var propagateDown = function propagateDown(node, check, selectionKeys) {
    if (check) selectionKeys[node.key] = {
      checked: true,
      partialChecked: false
    };else delete selectionKeys[node.key];

    if (node.children && node.children.length) {
      for (var i = 0; i < node.children.length; i++) {
        propagateDown(node.children[i], check, selectionKeys);
      }
    }
  };

  var isSelected = function isSelected() {
    if (props.selectionMode && props.selectionKeys) return isSingleSelectionMode() ? props.selectionKeys === props.node.key : props.selectionKeys[props.node.key] !== undefined;else return false;
  };

  var isChecked = function isChecked() {
    return props.selectionKeys ? props.selectionKeys[props.node.key] && props.selectionKeys[props.node.key].checked : false;
  };

  var isPartialChecked = function isPartialChecked() {
    return props.selectionKeys ? props.selectionKeys[props.node.key] && props.selectionKeys[props.node.key].partialChecked : false;
  };

  var isSingleSelectionMode = function isSingleSelectionMode() {
    return props.selectionMode && props.selectionMode === 'single';
  };

  var isMultipleSelectionMode = function isMultipleSelectionMode() {
    return props.selectionMode && props.selectionMode === 'multiple';
  };

  var isCheckboxSelectionMode = function isCheckboxSelectionMode() {
    return props.selectionMode && props.selectionMode === 'checkbox';
  };

  var onTouchEnd = function onTouchEnd() {
    nodeTouched.current = true;
  };

  var onDropPoint = function onDropPoint(event, position) {
    event.preventDefault();

    if (props.node.droppable !== false) {
      DomHandler.removeClass(event.target, 'p-treenode-droppoint-active');

      if (props.onDropPoint) {
        var dropIndex = position === -1 ? props.index : props.index + 1;
        props.onDropPoint({
          originalEvent: event,
          path: props.path,
          index: dropIndex,
          position: position
        });
      }
    }
  };

  var onDropPointDragOver = function onDropPointDragOver(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase()) {
      event.dataTransfer.dropEffect = 'move';
      event.preventDefault();
    }
  };

  var onDropPointDragEnter = function onDropPointDragEnter(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase()) {
      DomHandler.addClass(event.target, 'p-treenode-droppoint-active');
    }
  };

  var onDropPointDragLeave = function onDropPointDragLeave(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase()) {
      DomHandler.removeClass(event.target, 'p-treenode-droppoint-active');
    }
  };

  var onDrop = function onDrop(event) {
    if (props.dragdropScope && props.node.droppable !== false) {
      DomHandler.removeClass(contentRef.current, 'p-treenode-dragover');
      event.preventDefault();
      event.stopPropagation();

      if (props.onDrop) {
        props.onDrop({
          originalEvent: event,
          path: props.path,
          index: props.index
        });
      }
    }
  };

  var onDragOver = function onDragOver(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase() && props.node.droppable !== false) {
      event.dataTransfer.dropEffect = 'move';
      event.preventDefault();
      event.stopPropagation();
    }
  };

  var onDragEnter = function onDragEnter(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase() && props.node.droppable !== false) {
      DomHandler.addClass(contentRef.current, 'p-treenode-dragover');
    }
  };

  var onDragLeave = function onDragLeave(event) {
    if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase() && props.node.droppable !== false) {
      var rect = event.currentTarget.getBoundingClientRect();

      if (event.nativeEvent.x > rect.left + rect.width || event.nativeEvent.x < rect.left || event.nativeEvent.y >= Math.floor(rect.top + rect.height) || event.nativeEvent.y < rect.top) {
        DomHandler.removeClass(contentRef.current, 'p-treenode-dragover');
      }
    }
  };

  var onDragStart = function onDragStart(event) {
    event.dataTransfer.setData('text', props.dragdropScope);
    event.dataTransfer.setData(props.dragdropScope, props.dragdropScope);

    if (props.onDragStart) {
      props.onDragStart({
        originalEvent: event,
        path: props.path,
        index: props.index
      });
    }
  };

  var onDragEnd = function onDragEnd(event) {
    if (props.onDragEnd) {
      props.onDragEnd({
        originalEvent: event
      });
    }
  };

  var createLabel = function createLabel() {
    var content = /*#__PURE__*/React.createElement("span", {
      className: "p-treenode-label"
    }, props.node.label);

    if (props.nodeTemplate) {
      var defaultContentOptions = {
        onTogglerClick: onTogglerClick,
        className: 'p-treenode-label',
        element: content,
        props: props,
        expanded: expanded
      };
      content = ObjectUtils.getJSXElement(props.nodeTemplate, props.node, defaultContentOptions);
    }

    return content;
  };

  var createCheckbox = function createCheckbox() {
    if (isCheckboxSelectionMode() && props.node.selectable !== false) {
      var checked = isChecked();
      var partialChecked = isPartialChecked();
      var className = classNames('p-checkbox-box', {
        'p-highlight': checked,
        'p-indeterminate': partialChecked,
        'p-disabled': props.disabled
      });
      var icon = classNames('p-checkbox-icon p-c', {
        'pi pi-check': checked,
        'pi pi-minus': partialChecked
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "p-checkbox p-component"
      }, /*#__PURE__*/React.createElement("div", {
        className: className,
        role: "checkbox",
        "aria-checked": checked
      }, /*#__PURE__*/React.createElement("span", {
        className: icon
      })));
    }

    return null;
  };

  var createIcon = function createIcon() {
    var icon = props.node.icon || (expanded ? props.node.expandedIcon : props.node.collapsedIcon);

    if (icon) {
      var className = classNames('p-treenode-icon', icon);
      return /*#__PURE__*/React.createElement("span", {
        className: className
      });
    }

    return null;
  };

  var createToggler = function createToggler() {
    var label = expanded ? ariaLabel('collapseLabel') : ariaLabel('expandLabel');
    var iconClassName = classNames('p-tree-toggler-icon pi pi-fw', {
      'pi-chevron-right': !expanded,
      'pi-chevron-down': expanded
    });
    var content = /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "p-tree-toggler p-link",
      tabIndex: -1,
      onClick: onTogglerClick,
      "aria-label": label
    }, /*#__PURE__*/React.createElement("span", {
      className: iconClassName,
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement(Ripple, null));

    if (props.togglerTemplate) {
      var defaultContentOptions = {
        onClick: onTogglerClick,
        containerClassName: 'p-tree-toggler p-link',
        iconClassName: 'p-tree-toggler-icon',
        element: content,
        props: props,
        expanded: expanded
      };
      content = ObjectUtils.getJSXElement(props.togglerTemplate, props.node, defaultContentOptions);
    }

    return content;
  };

  var createDropPoint = function createDropPoint(position) {
    if (props.dragdropScope) {
      return /*#__PURE__*/React.createElement("li", {
        className: "p-treenode-droppoint",
        onDrop: function onDrop(event) {
          return onDropPoint(event, position);
        },
        onDragOver: onDropPointDragOver,
        onDragEnter: onDropPointDragEnter,
        onDragLeave: onDropPointDragLeave
      });
    }

    return null;
  };

  var createContent = function createContent() {
    var selected = isSelected();
    var checked = isChecked();
    var className = classNames('p-treenode-content', props.node.className, {
      'p-treenode-selectable': props.selectionMode && props.node.selectable !== false,
      'p-highlight': isCheckboxSelectionMode() ? checked : selected,
      'p-highlight-contextmenu': props.contextMenuSelectionKey && props.contextMenuSelectionKey === props.node.key,
      'p-disabled': props.disabled
    });
    var toggler = createToggler();
    var checkbox = createCheckbox();
    var icon = createIcon();
    var label = createLabel();
    var tabIndex = props.disabled ? undefined : 0;
    return /*#__PURE__*/React.createElement("div", {
      ref: contentRef,
      className: className,
      style: props.node.style,
      onClick: onClick,
      onDoubleClick: onDoubleClick,
      onContextMenu: onRightClick,
      onTouchEnd: onTouchEnd,
      draggable: props.dragdropScope && props.node.draggable !== false && !props.disabled,
      onDrop: onDrop,
      onDragOver: onDragOver,
      onDragEnter: onDragEnter,
      onDragLeave: onDragLeave,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
      tabIndex: tabIndex,
      onKeyDown: onNodeKeyDown,
      role: "treeitem",
      "aria-posinset": props.index + 1,
      "aria-expanded": expanded,
      "aria-selected": checked || selected
    }, toggler, checkbox, icon, label);
  };

  var createChildren = function createChildren() {
    if (ObjectUtils.isNotEmpty(props.node.children) && expanded) {
      return /*#__PURE__*/React.createElement("ul", {
        className: "p-treenode-children",
        role: "group"
      }, props.node.children.map(function (childNode, index) {
        return /*#__PURE__*/React.createElement(UITreeNode, {
          key: childNode.key || childNode.label,
          node: childNode,
          parent: props.node,
          index: index,
          last: index === props.node.children.length - 1,
          path: props.path + '-' + index,
          disabled: props.disabled,
          selectionMode: props.selectionMode,
          selectionKeys: props.selectionKeys,
          onSelectionChange: props.onSelectionChange,
          metaKeySelection: props.metaKeySelection,
          propagateSelectionDown: props.propagateSelectionDown,
          propagateSelectionUp: props.propagateSelectionUp,
          contextMenuSelectionKey: props.contextMenuSelectionKey,
          onContextMenuSelectionChange: props.onContextMenuSelectionChange,
          onContextMenu: props.onContextMenu,
          onExpand: props.onExpand,
          onCollapse: props.onCollapse,
          onSelect: props.onSelect,
          onUnselect: props.onUnselect,
          onClick: props.onClick,
          onDoubleClick: props.onDoubleClick,
          expandedKeys: props.expandedKeys,
          onToggle: props.onToggle,
          onPropagateUp: propagateUp,
          nodeTemplate: props.nodeTemplate,
          togglerTemplate: props.togglerTemplate,
          isNodeLeaf: props.isNodeLeaf,
          dragdropScope: props.dragdropScope,
          onDragStart: props.onDragStart,
          onDragEnd: props.onDragEnd,
          onDrop: props.onDrop,
          onDropPoint: props.onDropPoint
        });
      }));
    }

    return null;
  };

  var createNode = function createNode() {
    var className = classNames('p-treenode', {
      'p-treenode-leaf': isLeaf
    }, props.node.className);
    var content = createContent();
    var children = createChildren();
    return /*#__PURE__*/React.createElement("li", {
      className: className,
      style: props.node.style
    }, content, children);
  };

  var node = createNode();

  if (props.dragdropScope && !props.disabled) {
    var beforeDropPoint = createDropPoint(-1);
    var afterDropPoint = props.last ? createDropPoint(1) : null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, beforeDropPoint, node, afterDropPoint);
  }

  return node;
});
UITreeNode.displayName = 'UITreeNode';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var Tree = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filterValueState = _React$useState2[0],
      setFilterValueState = _React$useState2[1];

  var _React$useState3 = React.useState(props.expandedKeys),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      expandedKeysState = _React$useState4[0],
      setExpandedKeysState = _React$useState4[1];

  var elementRef = React.useRef(null);
  var filteredNodes = React.useRef([]);
  var dragState = React.useRef(null);
  var filterChanged = React.useRef(false);
  var filteredValue = props.onFilterValueChange ? props.filterValue : filterValueState;
  var expandedKeys = props.onToggle ? props.expandedKeys : expandedKeysState;
  var filterOptions = {
    filter: function filter(e) {
      return onFilterInputChange(e);
    },
    reset: function reset() {
      return resetFilter();
    }
  };

  var getRootNode = function getRootNode() {
    return props.filter && filteredNodes.current ? filteredNodes.current : props.value;
  };

  var onToggle = function onToggle(event) {
    if (props.onToggle) {
      props.onToggle(event);
    } else {
      setExpandedKeysState(event.value);
    }
  };

  var onDragStart = function onDragStart(event) {
    dragState.current = {
      path: event.path,
      index: event.index
    };
  };

  var onDragEnd = function onDragEnd() {
    dragState.current = null;
  };

  var onDrop = function onDrop(event) {
    if (validateDropNode(dragState.current.path, event.path)) {
      var value = JSON.parse(JSON.stringify(props.value));
      var dragPaths = dragState.current.path.split('-');
      dragPaths.pop();
      var dragNodeParent = findNode(value, dragPaths);
      var dragNode = dragNodeParent ? dragNodeParent.children[dragState.current.index] : value[dragState.current.index];
      var dropNode = findNode(value, event.path.split('-'));
      if (dropNode.children) dropNode.children.push(dragNode);else dropNode.children = [dragNode];
      if (dragNodeParent) dragNodeParent.children.splice(dragState.current.index, 1);else value.splice(dragState.current.index, 1);

      if (props.onDragDrop) {
        props.onDragDrop({
          originalEvent: event.originalEvent,
          value: value,
          dragNode: dragNode,
          dropNode: dropNode,
          dropIndex: event.index
        });
      }
    }
  };

  var onDropPoint = function onDropPoint(event) {
    if (validateDropPoint(event)) {
      var value = JSON.parse(JSON.stringify(props.value));
      var dragPaths = dragState.current.path.split('-');
      dragPaths.pop();
      var dropPaths = event.path.split('-');
      dropPaths.pop();
      var dragNodeParent = findNode(value, dragPaths);
      var dropNodeParent = findNode(value, dropPaths);
      var dragNode = dragNodeParent ? dragNodeParent.children[dragState.current.index] : value[dragState.current.index];
      var siblings = areSiblings(dragState.current.path, event.path);
      if (dragNodeParent) dragNodeParent.children.splice(dragState.current.index, 1);else value.splice(dragState.current.index, 1);

      if (event.position < 0) {
        var dropIndex = siblings ? dragState.current.index > event.index ? event.index : event.index - 1 : event.index;
        if (dropNodeParent) dropNodeParent.children.splice(dropIndex, 0, dragNode);else value.splice(dropIndex, 0, dragNode);
      } else {
        if (dropNodeParent) dropNodeParent.children.push(dragNode);else value.push(dragNode);
      }

      if (props.onDragDrop) {
        props.onDragDrop({
          originalEvent: event.originalEvent,
          value: value,
          dragNode: dragNode,
          dropNode: dropNodeParent,
          dropIndex: event.index
        });
      }
    }
  };

  var validateDrop = function validateDrop(dragPath, dropPath) {
    if (!dragPath) {
      return false;
    } else {
      //same node
      if (dragPath === dropPath) {
        return false;
      } //parent dropped on an descendant


      if (dropPath.indexOf(dragPath) === 0) {
        return false;
      }

      return true;
    }
  };

  var validateDropNode = function validateDropNode(dragPath, dropPath) {
    var _validateDrop = validateDrop(dragPath, dropPath);

    if (_validateDrop) {
      //child dropped on parent
      if (dragPath.indexOf('-') > 0 && dragPath.substring(0, dragPath.lastIndexOf('-')) === dropPath) {
        return false;
      }

      return true;
    } else {
      return false;
    }
  };

  var validateDropPoint = function validateDropPoint(event) {
    var _validateDrop = validateDrop(dragState.current.path, event.path);

    if (_validateDrop) {
      //child dropped to next sibling's drop point
      if (event.position === -1 && areSiblings(dragState.current.path, event.path) && dragState.current.index + 1 === event.index) {
        return false;
      }

      return true;
    } else {
      return false;
    }
  };

  var areSiblings = function areSiblings(path1, path2) {
    if (path1.length === 1 && path2.length === 1) return true;else return path1.substring(0, path1.lastIndexOf('-')) === path2.substring(0, path2.lastIndexOf('-'));
  };

  var findNode = function findNode(value, path) {
    if (path.length === 0) {
      return null;
    } else {
      var index = parseInt(path[0], 10);
      var nextSearchRoot = value.children ? value.children[index] : value[index];

      if (path.length === 1) {
        return nextSearchRoot;
      } else {
        path.shift();
        return findNode(nextSearchRoot, path);
      }
    }
  };

  var isNodeLeaf = function isNodeLeaf(node) {
    return node.leaf === false ? false : !(node.children && node.children.length);
  };

  var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
    //enter
    if (event.which === 13) {
      event.preventDefault();
    }
  };

  var onFilterInputChange = function onFilterInputChange(event) {
    filterChanged.current = true;
    var value = event.target.value;

    if (props.onFilterValueChange) {
      props.onFilterValueChange({
        originalEvent: event,
        value: value
      });
    } else {
      setFilterValueState(value);
    }
  };

  var filter = function filter(value) {
    setFilterValueState(ObjectUtils.isNotEmpty(value) ? value : '');

    _filter();
  };

  var _filter = function _filter() {
    if (!filterChanged.current) {
      return;
    }

    if (ObjectUtils.isEmpty(filteredValue)) {
      filteredNodes.current = props.value;
    } else {
      filteredNodes.current = [];
      var searchFields = props.filterBy.split(',');
      var filterText = filteredValue.toLocaleLowerCase(props.filterLocale);
      var isStrictMode = props.filterMode === 'strict';

      var _iterator = _createForOfIteratorHelper(props.value),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;

          var copyNode = _objectSpread({}, node);

          var paramsWithoutNode = {
            searchFields: searchFields,
            filterText: filterText,
            isStrictMode: isStrictMode
          };

          if (isStrictMode && (findFilteredNodes(copyNode, paramsWithoutNode) || isFilterMatched(copyNode, paramsWithoutNode)) || !isStrictMode && (isFilterMatched(copyNode, paramsWithoutNode) || findFilteredNodes(copyNode, paramsWithoutNode))) {
            filteredNodes.current.push(copyNode);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    filterChanged.current = false;
  };

  var findFilteredNodes = function findFilteredNodes(node, paramsWithoutNode) {
    if (node) {
      var matched = false;

      if (node.children) {
        var childNodes = _toConsumableArray(node.children);

        node.children = [];

        var _iterator2 = _createForOfIteratorHelper(childNodes),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var childNode = _step2.value;

            var copyChildNode = _objectSpread({}, childNode);

            if (isFilterMatched(copyChildNode, paramsWithoutNode)) {
              matched = true;
              node.children.push(copyChildNode);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      if (matched) {
        node.expanded = true;
        return true;
      }
    }
  };

  var isFilterMatched = function isFilterMatched(node, _ref) {
    var searchFields = _ref.searchFields,
        filterText = _ref.filterText,
        isStrictMode = _ref.isStrictMode;
    var matched = false;

    var _iterator3 = _createForOfIteratorHelper(searchFields),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var field = _step3.value;
        var fieldValue = String(ObjectUtils.resolveFieldData(node, field)).toLocaleLowerCase(props.filterLocale);

        if (fieldValue.indexOf(filterText) > -1) {
          matched = true;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    if (!matched || isStrictMode && !isNodeLeaf(node)) {
      matched = findFilteredNodes(node, {
        searchFields: searchFields,
        filterText: filterText,
        isStrictMode: isStrictMode
      }) || matched;
    }

    return matched;
  };

  var resetFilter = function resetFilter() {
    setFilterValueState('');
  };

  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      filter: filter,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });

  var createRootChild = function createRootChild(node, index, last) {
    return /*#__PURE__*/React.createElement(UITreeNode, {
      key: node.key || node.label,
      node: node,
      index: index,
      last: last,
      path: String(index),
      disabled: props.disabled,
      selectionMode: props.selectionMode,
      selectionKeys: props.selectionKeys,
      onSelectionChange: props.onSelectionChange,
      metaKeySelection: props.metaKeySelection,
      contextMenuSelectionKey: props.contextMenuSelectionKey,
      onContextMenuSelectionChange: props.onContextMenuSelectionChange,
      onContextMenu: props.onContextMenu,
      propagateSelectionDown: props.propagateSelectionDown,
      propagateSelectionUp: props.propagateSelectionUp,
      onExpand: props.onExpand,
      onCollapse: props.onCollapse,
      onSelect: props.onSelect,
      onUnselect: props.onUnselect,
      expandedKeys: expandedKeys,
      onToggle: onToggle,
      nodeTemplate: props.nodeTemplate,
      togglerTemplate: props.togglerTemplate,
      isNodeLeaf: isNodeLeaf,
      dragdropScope: props.dragdropScope,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
      onDrop: onDrop,
      onDropPoint: onDropPoint,
      onClick: props.onNodeClick,
      onDoubleClick: props.onNodeDoubleClick
    });
  };

  var createRootChildren = function createRootChildren() {
    if (props.filter) {
      filterChanged.current = true;

      _filter();
    }

    var value = getRootNode();
    return value.map(function (node, index) {
      return createRootChild(node, index, index === value.length - 1);
    });
  };

  var createModel = function createModel() {
    if (props.value) {
      var rootNodes = createRootChildren();
      var contentClass = classNames('p-tree-container', props.contentClassName);
      return /*#__PURE__*/React.createElement("ul", _extends({
        className: contentClass,
        role: "tree",
        style: props.contentStyle
      }, ariaProps), rootNodes);
    }

    return null;
  };

  var createLoader = function createLoader() {
    if (props.loading) {
      var icon = classNames('p-tree-loading-icon pi-spin', props.loadingIcon);
      return /*#__PURE__*/React.createElement("div", {
        className: "p-tree-loading-overlay p-component-overlay"
      }, /*#__PURE__*/React.createElement("i", {
        className: icon
      }));
    }

    return null;
  };

  var createFilter = function createFilter() {
    if (props.filter) {
      var value = ObjectUtils.isNotEmpty(filteredValue) ? filteredValue : '';

      var _content = /*#__PURE__*/React.createElement("div", {
        className: "p-tree-filter-container"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        value: value,
        autoComplete: "off",
        className: "p-tree-filter p-inputtext p-component",
        placeholder: props.filterPlaceholder,
        onKeyDown: onFilterInputKeyDown,
        onChange: onFilterInputChange,
        disabled: props.disabled
      }), /*#__PURE__*/React.createElement("span", {
        className: "p-tree-filter-icon pi pi-search"
      }));

      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: 'p-tree-filter-container',
          element: _content,
          filterOptions: filterOptions,
          filterInputKeyDown: onFilterInputKeyDown,
          filterInputChange: onFilterInputChange,
          filterIconClassName: 'p-dropdown-filter-icon pi pi-search',
          props: props
        };
        _content = ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, _content);
    }

    return null;
  };

  var createHeader = function createHeader() {
    if (props.showHeader) {
      var filterElement = createFilter();
      var _content2 = filterElement;

      if (props.header) {
        var defaultContentOptions = {
          filterContainerClassName: 'p-tree-filter-container',
          filterIconClasssName: 'p-tree-filter-icon pi pi-search',
          filterInput: {
            className: 'p-tree-filter p-inputtext p-component',
            onKeyDown: onFilterInputKeyDown,
            onChange: onFilterInputChange
          },
          filterElement: filterElement,
          element: _content2,
          props: props
        };
        _content2 = ObjectUtils.getJSXElement(props.header, defaultContentOptions);
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "p-tree-header"
      }, _content2);
    }

    return null;
  };

  var createFooter = function createFooter() {
    var content = ObjectUtils.getJSXElement(props.footer, props);
    return /*#__PURE__*/React.createElement("div", {
      className: "p-tree-footer"
    }, content);
  };

  var otherProps = ObjectUtils.findDiffKeys(props, Tree.defaultProps);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-tree p-component', props.className, {
    'p-tree-selectable': props.selectionMode,
    'p-tree-loading': props.loading,
    'p-disabled': props.disabled
  });
  var loader = createLoader();
  var content = createModel();
  var header = createHeader();
  var footer = createFooter();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), loader, header, content, footer);
}));
Tree.displayName = 'Tree';
Tree.defaultProps = {
  __TYPE: 'Tree',
  id: null,
  value: null,
  disabled: false,
  selectionMode: null,
  selectionKeys: null,
  onSelectionChange: null,
  contextMenuSelectionKey: null,
  onContextMenuSelectionChange: null,
  expandedKeys: null,
  style: null,
  className: null,
  contentStyle: null,
  contentClassName: null,
  metaKeySelection: true,
  propagateSelectionUp: true,
  propagateSelectionDown: true,
  loading: false,
  loadingIcon: 'pi pi-spinner',
  dragdropScope: null,
  header: null,
  footer: null,
  showHeader: true,
  filter: false,
  filterValue: null,
  filterBy: 'label',
  filterMode: 'lenient',
  filterPlaceholder: null,
  filterLocale: undefined,
  filterTemplate: null,
  nodeTemplate: null,
  togglerTemplate: null,
  onSelect: null,
  onUnselect: null,
  onExpand: null,
  onCollapse: null,
  onToggle: null,
  onDragDrop: null,
  onContextMenu: null,
  onFilterValueChange: null,
  onNodeClick: null,
  onNodeDoubleClick: null
};

export { Tree };
