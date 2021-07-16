import React, { Component } from 'react';
import { DomHandler, ObjectUtils, classNames, Ripple } from 'primereact/core';

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
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

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var UITreeNode = /*#__PURE__*/function (_Component) {
  _inherits(UITreeNode, _Component);

  var _super = _createSuper$1(UITreeNode);

  function UITreeNode(props) {
    var _this;

    _classCallCheck(this, UITreeNode);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onDoubleClick = _this.onDoubleClick.bind(_assertThisInitialized(_this));
    _this.onRightClick = _this.onRightClick.bind(_assertThisInitialized(_this));
    _this.onTouchEnd = _this.onTouchEnd.bind(_assertThisInitialized(_this));
    _this.onTogglerClick = _this.onTogglerClick.bind(_assertThisInitialized(_this));
    _this.onNodeKeyDown = _this.onNodeKeyDown.bind(_assertThisInitialized(_this));
    _this.propagateUp = _this.propagateUp.bind(_assertThisInitialized(_this));
    _this.onDrop = _this.onDrop.bind(_assertThisInitialized(_this));
    _this.onDragOver = _this.onDragOver.bind(_assertThisInitialized(_this));
    _this.onDragEnter = _this.onDragEnter.bind(_assertThisInitialized(_this));
    _this.onDragLeave = _this.onDragLeave.bind(_assertThisInitialized(_this));
    _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_this));
    _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_this));
    _this.onDropPointDragOver = _this.onDropPointDragOver.bind(_assertThisInitialized(_this));
    _this.onDropPointDragEnter = _this.onDropPointDragEnter.bind(_assertThisInitialized(_this));
    _this.onDropPointDragLeave = _this.onDropPointDragLeave.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(UITreeNode, [{
    key: "isLeaf",
    value: function isLeaf() {
      return this.props.isNodeLeaf(this.props.node);
    }
  }, {
    key: "expand",
    value: function expand(event) {
      var expandedKeys = this.props.expandedKeys ? _objectSpread$1({}, this.props.expandedKeys) : {};
      expandedKeys[this.props.node.key] = true;
      this.props.onToggle({
        originalEvent: event,
        value: expandedKeys
      });
      this.invokeToggleEvents(event, true);
    }
  }, {
    key: "collapse",
    value: function collapse(event) {
      var expandedKeys = _objectSpread$1({}, this.props.expandedKeys);

      delete expandedKeys[this.props.node.key];
      this.props.onToggle({
        originalEvent: event,
        value: expandedKeys
      });
      this.invokeToggleEvents(event, false);
    }
  }, {
    key: "onTogglerClick",
    value: function onTogglerClick(event) {
      if (this.props.disabled) {
        return;
      }

      if (this.isExpanded()) this.collapse(event);else this.expand(event);
    }
  }, {
    key: "invokeToggleEvents",
    value: function invokeToggleEvents(event, expanded) {
      if (expanded) {
        if (this.props.onExpand) {
          this.props.onExpand({
            originalEvent: event,
            node: this.props.node
          });
        }
      } else {
        if (this.props.onCollapse) {
          this.props.onCollapse({
            originalEvent: event,
            node: this.props.node
          });
        }
      }
    }
  }, {
    key: "isExpanded",
    value: function isExpanded() {
      return (this.props.expandedKeys ? this.props.expandedKeys[this.props.node.key] !== undefined : false) || this.props.node.expanded;
    }
  }, {
    key: "onNodeKeyDown",
    value: function onNodeKeyDown(event) {
      if (this.props.disabled) {
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
            this.focusNode(listElement.children[0]);
          } else {
            var nextNodeElement = nodeElement.nextElementSibling;

            if (nextNodeElement) {
              this.focusNode(nextNodeElement);
            } else {
              var nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);

              if (nextSiblingAncestor) {
                this.focusNode(nextSiblingAncestor);
              }
            }
          }

          event.preventDefault();
          break;
        //up arrow

        case 38:
          if (nodeElement.previousElementSibling) {
            this.focusNode(this.findLastVisibleDescendant(nodeElement.previousElementSibling));
          } else {
            var parentNodeElement = this.getParentNodeElement(nodeElement);

            if (parentNodeElement) {
              this.focusNode(parentNodeElement);
            }
          }

          event.preventDefault();
          break;
        //right arrow

        case 39:
          if (!this.isExpanded()) {
            this.expand(event);
          }

          event.preventDefault();
          break;
        //left arrow

        case 37:
          if (this.isExpanded()) {
            this.collapse(event);
          }

          event.preventDefault();
          break;
        //enter

        case 13:
          this.onClick(event);
          event.preventDefault();
          break;
      }
    }
  }, {
    key: "findNextSiblingOfAncestor",
    value: function findNextSiblingOfAncestor(nodeElement) {
      var parentNodeElement = this.getParentNodeElement(nodeElement);

      if (parentNodeElement) {
        if (parentNodeElement.nextElementSibling) return parentNodeElement.nextElementSibling;else return this.findNextSiblingOfAncestor(parentNodeElement);
      } else {
        return null;
      }
    }
  }, {
    key: "findLastVisibleDescendant",
    value: function findLastVisibleDescendant(nodeElement) {
      var childrenListElement = nodeElement.children[1];

      if (childrenListElement) {
        var lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
        return this.findLastVisibleDescendant(lastChildElement);
      } else {
        return nodeElement;
      }
    }
  }, {
    key: "getParentNodeElement",
    value: function getParentNodeElement(nodeElement) {
      var parentNodeElement = nodeElement.parentElement.parentElement;
      return DomHandler.hasClass(parentNodeElement, 'p-treenode') ? parentNodeElement : null;
    }
  }, {
    key: "focusNode",
    value: function focusNode(element) {
      element.children[0].focus();
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          originalEvent: event,
          node: this.props.node
        });
      }

      if (event.target.className && event.target.className.constructor === String && event.target.className.indexOf('p-tree-toggler') === 0 || this.props.disabled) {
        return;
      }

      if (this.props.selectionMode && this.props.node.selectable !== false) {
        var selectionKeys;

        if (this.isCheckboxSelectionMode()) {
          var checked = this.isChecked();
          selectionKeys = this.props.selectionKeys ? _objectSpread$1({}, this.props.selectionKeys) : {};

          if (checked) {
            if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, false, selectionKeys);else delete selectionKeys[this.props.node.key];

            if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
              this.props.onPropagateUp({
                originalEvent: event,
                check: false,
                selectionKeys: selectionKeys
              });
            }

            if (this.props.onUnselect) {
              this.props.onUnselect({
                originalEvent: event,
                node: this.props.node
              });
            }
          } else {
            if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, true, selectionKeys);else selectionKeys[this.props.node.key] = {
              checked: true
            };

            if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
              this.props.onPropagateUp({
                originalEvent: event,
                check: true,
                selectionKeys: selectionKeys
              });
            }

            if (this.props.onSelect) {
              this.props.onSelect({
                originalEvent: event,
                node: this.props.node
              });
            }
          }
        } else {
          var selected = this.isSelected();
          var metaSelection = this.nodeTouched ? false : this.props.metaKeySelection;

          if (metaSelection) {
            var metaKey = event.metaKey || event.ctrlKey;

            if (selected && metaKey) {
              if (this.isSingleSelectionMode()) {
                selectionKeys = null;
              } else {
                selectionKeys = _objectSpread$1({}, this.props.selectionKeys);
                delete selectionKeys[this.props.node.key];
              }

              if (this.props.onUnselect) {
                this.props.onUnselect({
                  originalEvent: event,
                  node: this.props.node
                });
              }
            } else {
              if (this.isSingleSelectionMode()) {
                selectionKeys = this.props.node.key;
              } else if (this.isMultipleSelectionMode()) {
                selectionKeys = !metaKey ? {} : this.props.selectionKeys ? _objectSpread$1({}, this.props.selectionKeys) : {};
                selectionKeys[this.props.node.key] = true;
              }

              if (this.props.onSelect) {
                this.props.onSelect({
                  originalEvent: event,
                  node: this.props.node
                });
              }
            }
          } else {
            if (this.isSingleSelectionMode()) {
              if (selected) {
                selectionKeys = null;

                if (this.props.onUnselect) {
                  this.props.onUnselect({
                    originalEvent: event,
                    node: this.props.node
                  });
                }
              } else {
                selectionKeys = this.props.node.key;

                if (this.props.onSelect) {
                  this.props.onSelect({
                    originalEvent: event,
                    node: this.props.node
                  });
                }
              }
            } else {
              if (selected) {
                selectionKeys = _objectSpread$1({}, this.props.selectionKeys);
                delete selectionKeys[this.props.node.key];

                if (this.props.onUnselect) {
                  this.props.onUnselect({
                    originalEvent: event,
                    node: this.props.node
                  });
                }
              } else {
                selectionKeys = this.props.selectionKeys ? _objectSpread$1({}, this.props.selectionKeys) : {};
                selectionKeys[this.props.node.key] = true;

                if (this.props.onSelect) {
                  this.props.onSelect({
                    originalEvent: event,
                    node: this.props.node
                  });
                }
              }
            }
          }
        }

        if (this.props.onSelectionChange) {
          this.props.onSelectionChange({
            originalEvent: event,
            value: selectionKeys
          });
        }
      }

      this.nodeTouched = false;
    }
  }, {
    key: "onDoubleClick",
    value: function onDoubleClick(event) {
      if (this.props.onDoubleClick) {
        this.props.onDoubleClick({
          originalEvent: event,
          node: this.props.node
        });
      }
    }
  }, {
    key: "onRightClick",
    value: function onRightClick(event) {
      if (this.props.disabled) {
        return;
      }

      DomHandler.clearSelection();

      if (this.props.onContextMenuSelectionChange) {
        this.props.onContextMenuSelectionChange({
          originalEvent: event,
          value: this.props.node.key
        });
      }

      if (this.props.onContextMenu) {
        this.props.onContextMenu({
          originalEvent: event,
          node: this.props.node
        });
      }
    }
  }, {
    key: "propagateUp",
    value: function propagateUp(event) {
      var check = event.check;
      var selectionKeys = event.selectionKeys;
      var checkedChildCount = 0;
      var childPartialSelected = false;

      var _iterator = _createForOfIteratorHelper$1(this.props.node.children),
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

      if (check && checkedChildCount === this.props.node.children.length) {
        selectionKeys[this.props.node.key] = {
          checked: true,
          partialChecked: false
        };
      } else {
        if (!check) {
          delete selectionKeys[this.props.node.key];
        }

        if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== this.props.node.children.length) selectionKeys[this.props.node.key] = {
          checked: false,
          partialChecked: true
        };else delete selectionKeys[this.props.node.key];
      }

      if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
        this.props.onPropagateUp(event);
      }
    }
  }, {
    key: "propagateDown",
    value: function propagateDown(node, check, selectionKeys) {
      if (check) selectionKeys[node.key] = {
        checked: true,
        partialChecked: false
      };else delete selectionKeys[node.key];

      if (node.children && node.children.length) {
        for (var i = 0; i < node.children.length; i++) {
          this.propagateDown(node.children[i], check, selectionKeys);
        }
      }
    }
  }, {
    key: "isSelected",
    value: function isSelected() {
      if (this.props.selectionMode && this.props.selectionKeys) return this.isSingleSelectionMode() ? this.props.selectionKeys === this.props.node.key : this.props.selectionKeys[this.props.node.key] !== undefined;else return false;
    }
  }, {
    key: "isChecked",
    value: function isChecked() {
      return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].checked : false;
    }
  }, {
    key: "isPartialChecked",
    value: function isPartialChecked() {
      return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].partialChecked : false;
    }
  }, {
    key: "isSingleSelectionMode",
    value: function isSingleSelectionMode() {
      return this.props.selectionMode && this.props.selectionMode === 'single';
    }
  }, {
    key: "isMultipleSelectionMode",
    value: function isMultipleSelectionMode() {
      return this.props.selectionMode && this.props.selectionMode === 'multiple';
    }
  }, {
    key: "isCheckboxSelectionMode",
    value: function isCheckboxSelectionMode() {
      return this.props.selectionMode && this.props.selectionMode === 'checkbox';
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd() {
      this.nodeTouched = true;
    }
  }, {
    key: "onDropPoint",
    value: function onDropPoint(event, position) {
      event.preventDefault();

      if (this.props.node.droppable !== false) {
        DomHandler.removeClass(event.target, 'p-treenode-droppoint-active');

        if (this.props.onDropPoint) {
          this.props.onDropPoint({
            originalEvent: event,
            path: this.props.path,
            index: this.props.index,
            position: position
          });
        }
      }
    }
  }, {
    key: "onDropPointDragOver",
    value: function onDropPointDragOver(event) {
      if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase()) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
      }
    }
  }, {
    key: "onDropPointDragEnter",
    value: function onDropPointDragEnter(event) {
      if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase()) {
        DomHandler.addClass(event.target, 'p-treenode-droppoint-active');
      }
    }
  }, {
    key: "onDropPointDragLeave",
    value: function onDropPointDragLeave(event) {
      if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase()) {
        DomHandler.removeClass(event.target, 'p-treenode-droppoint-active');
      }
    }
  }, {
    key: "onDrop",
    value: function onDrop(event) {
      if (this.props.dragdropScope && this.props.node.droppable !== false) {
        DomHandler.removeClass(this.contentElement, 'p-treenode-dragover');
        event.preventDefault();
        event.stopPropagation();

        if (this.props.onDrop) {
          this.props.onDrop({
            originalEvent: event,
            path: this.props.path,
            index: this.props.index
          });
        }
      }
    }
  }, {
    key: "onDragOver",
    value: function onDragOver(event) {
      if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase() && this.props.node.droppable !== false) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }, {
    key: "onDragEnter",
    value: function onDragEnter(event) {
      if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase() && this.props.node.droppable !== false) {
        DomHandler.addClass(this.contentElement, 'p-treenode-dragover');
      }
    }
  }, {
    key: "onDragLeave",
    value: function onDragLeave(event) {
      if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase() && this.props.node.droppable !== false) {
        var rect = event.currentTarget.getBoundingClientRect();

        if (event.nativeEvent.x > rect.left + rect.width || event.nativeEvent.x < rect.left || event.nativeEvent.y >= Math.floor(rect.top + rect.height) || event.nativeEvent.y < rect.top) {
          DomHandler.removeClass(this.contentElement, 'p-treenode-dragover');
        }
      }
    }
  }, {
    key: "onDragStart",
    value: function onDragStart(event) {
      event.dataTransfer.setData("text", this.props.dragdropScope);
      event.dataTransfer.setData(this.props.dragdropScope, this.props.dragdropScope);

      if (this.props.onDragStart) {
        this.props.onDragStart({
          originalEvent: event,
          path: this.props.path,
          index: this.props.index
        });
      }
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd(event) {
      if (this.props.onDragEnd) {
        this.props.onDragEnd({
          originalEvent: event
        });
      }
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var content = /*#__PURE__*/React.createElement("span", {
        className: "p-treenode-label"
      }, this.props.node.label);

      if (this.props.nodeTemplate) {
        var defaultContentOptions = {
          onTogglerClick: this.onTogglerClick,
          className: 'p-treenode-label',
          element: content,
          props: this.props,
          expanded: this.isExpanded()
        };
        content = ObjectUtils.getJSXElement(this.props.nodeTemplate, this.props.node, defaultContentOptions);
      }

      return content;
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox() {
      if (this.isCheckboxSelectionMode() && this.props.node.selectable !== false) {
        var checked = this.isChecked();
        var partialChecked = this.isPartialChecked();
        var className = classNames('p-checkbox-box', {
          'p-highlight': checked,
          'p-indeterminate': partialChecked,
          'p-disabled': this.props.disabled
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
    }
  }, {
    key: "renderIcon",
    value: function renderIcon(expanded) {
      var icon = this.props.node.icon || (expanded ? this.props.node.expandedIcon : this.props.node.collapsedIcon);

      if (icon) {
        var className = classNames('p-treenode-icon', icon);
        return /*#__PURE__*/React.createElement("span", {
          className: className
        });
      }

      return null;
    }
  }, {
    key: "renderToggler",
    value: function renderToggler(expanded) {
      var iconClassName = classNames('p-tree-toggler-icon pi pi-fw', {
        'pi-chevron-right': !expanded,
        'pi-chevron-down': expanded
      });
      var content = /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "p-tree-toggler p-link",
        tabIndex: -1,
        onClick: this.onTogglerClick
      }, /*#__PURE__*/React.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React.createElement(Ripple, null));

      if (this.props.togglerTemplate) {
        var defaultContentOptions = {
          onClick: this.onTogglerClick,
          containerClassName: 'p-tree-toggler p-link',
          iconClassName: 'p-tree-toggler-icon',
          element: content,
          props: this.props,
          expanded: expanded
        };
        content = ObjectUtils.getJSXElement(this.props.togglerTemplate, this.props.node, defaultContentOptions);
      }

      return content;
    }
  }, {
    key: "renderDropPoint",
    value: function renderDropPoint(position) {
      var _this2 = this;

      if (this.props.dragdropScope) {
        return /*#__PURE__*/React.createElement("li", {
          className: "p-treenode-droppoint",
          onDrop: function onDrop(event) {
            return _this2.onDropPoint(event, position);
          },
          onDragOver: this.onDropPointDragOver,
          onDragEnter: this.onDropPointDragEnter,
          onDragLeave: this.onDropPointDragLeave
        });
      }

      return null;
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this3 = this;

      var selected = this.isSelected();
      var checked = this.isChecked();
      var className = classNames('p-treenode-content', this.props.node.className, {
        'p-treenode-selectable': this.props.selectionMode && this.props.node.selectable !== false,
        'p-highlight': this.isCheckboxSelectionMode() ? checked : selected,
        'p-highlight-contextmenu': this.props.contextMenuSelectionKey && this.props.contextMenuSelectionKey === this.props.node.key,
        'p-disabled': this.props.disabled
      });
      var expanded = this.isExpanded();
      var toggler = this.renderToggler(expanded);
      var checkbox = this.renderCheckbox();
      var icon = this.renderIcon(expanded);
      var label = this.renderLabel();
      var tabIndex = this.props.disabled ? undefined : 0;
      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this3.contentElement = el;
        },
        className: className,
        style: this.props.node.style,
        onClick: this.onClick,
        onDoubleClick: this.onDoubleClick,
        onContextMenu: this.onRightClick,
        onTouchEnd: this.onTouchEnd,
        draggable: this.props.dragdropScope && this.props.node.draggable !== false && !this.props.disabled,
        onDrop: this.onDrop,
        onDragOver: this.onDragOver,
        onDragEnter: this.onDragEnter,
        onDragLeave: this.onDragLeave,
        onDragStart: this.onDragStart,
        onDragEnd: this.onDragEnd,
        tabIndex: tabIndex,
        onKeyDown: this.onNodeKeyDown,
        role: "treeitem",
        "aria-posinset": this.props.index + 1,
        "aria-expanded": this.isExpanded(),
        "aria-selected": checked || selected
      }, toggler, checkbox, icon, label);
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this4 = this;

      if (this.props.node.children && this.props.node.children.length && this.isExpanded()) {
        return /*#__PURE__*/React.createElement("ul", {
          className: "p-treenode-children",
          role: "group"
        }, this.props.node.children.map(function (childNode, index) {
          return /*#__PURE__*/React.createElement(UITreeNode, {
            key: childNode.key || childNode.label,
            node: childNode,
            parent: _this4.props.node,
            index: index,
            last: index === _this4.props.node.children.length - 1,
            path: _this4.props.path + '-' + index,
            disabled: _this4.props.disabled,
            selectionMode: _this4.props.selectionMode,
            selectionKeys: _this4.props.selectionKeys,
            onSelectionChange: _this4.props.onSelectionChange,
            metaKeySelection: _this4.props.metaKeySelection,
            propagateSelectionDown: _this4.props.propagateSelectionDown,
            propagateSelectionUp: _this4.props.propagateSelectionUp,
            contextMenuSelectionKey: _this4.props.contextMenuSelectionKey,
            onContextMenuSelectionChange: _this4.props.onContextMenuSelectionChange,
            onContextMenu: _this4.props.onContextMenu,
            onExpand: _this4.props.onExpand,
            onCollapse: _this4.props.onCollapse,
            onSelect: _this4.props.onSelect,
            onUnselect: _this4.props.onUnselect,
            expandedKeys: _this4.props.expandedKeys,
            onToggle: _this4.props.onToggle,
            onPropagateUp: _this4.propagateUp,
            nodeTemplate: _this4.props.nodeTemplate,
            togglerTemplate: _this4.props.togglerTemplate,
            isNodeLeaf: _this4.props.isNodeLeaf,
            dragdropScope: _this4.props.dragdropScope,
            onDragStart: _this4.props.onDragStart,
            onDragEnd: _this4.props.onDragEnd,
            onDrop: _this4.props.onDrop,
            onDropPoint: _this4.props.onDropPoint
          });
        }));
      }

      return null;
    }
  }, {
    key: "renderNode",
    value: function renderNode() {
      var className = classNames('p-treenode', {
        'p-treenode-leaf': this.isLeaf()
      }, this.props.node.className);
      var content = this.renderContent();
      var children = this.renderChildren();
      return /*#__PURE__*/React.createElement("li", {
        className: className,
        style: this.props.node.style
      }, content, children);
    }
  }, {
    key: "render",
    value: function render() {
      var node = this.renderNode();

      if (this.props.dragdropScope && !this.props.disabled) {
        var beforeDropPoint = this.renderDropPoint(-1);
        var afterDropPoint = this.props.last ? this.renderDropPoint(1) : null;
        return /*#__PURE__*/React.createElement(React.Fragment, null, beforeDropPoint, node, afterDropPoint);
      } else {
        return node;
      }
    }
  }]);

  return UITreeNode;
}(Component);

_defineProperty(UITreeNode, "defaultProps", {
  node: null,
  index: null,
  last: null,
  parent: null,
  path: null,
  disabled: false,
  selectionMode: null,
  selectionKeys: null,
  contextMenuSelectionKey: null,
  metaKeySelection: true,
  expandedKeys: null,
  propagateSelectionUp: true,
  propagateSelectionDown: true,
  dragdropScope: null,
  ariaLabel: null,
  ariaLabelledBy: null,
  nodeTemplate: null,
  togglerTemplate: null,
  isNodeLeaf: null,
  onSelect: null,
  onUnselect: null,
  onExpand: null,
  onCollapse: null,
  onToggle: null,
  onSelectionChange: null,
  onContextMenuSelectionChange: null,
  onPropagateUp: null,
  onDragStart: null,
  onDragEnd: null,
  onDrop: null,
  onDropPoint: null,
  onContextMenu: null,
  onNodeClick: null,
  onNodeDoubleClick: null
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Tree = /*#__PURE__*/function (_Component) {
  _inherits(Tree, _Component);

  var _super = _createSuper(Tree);

  function Tree(props) {
    var _this;

    _classCallCheck(this, Tree);

    _this = _super.call(this, props);
    _this.state = {};

    if (!_this.props.onFilterValueChange) {
      _this.state['filterValue'] = '';
    }

    if (!_this.props.onToggle) {
      _this.state['expandedKeys'] = _this.props.expandedKeys;
    }

    _this.isNodeLeaf = _this.isNodeLeaf.bind(_assertThisInitialized(_this));
    _this.onToggle = _this.onToggle.bind(_assertThisInitialized(_this));
    _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_this));
    _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_this));
    _this.onDrop = _this.onDrop.bind(_assertThisInitialized(_this));
    _this.onDropPoint = _this.onDropPoint.bind(_assertThisInitialized(_this));
    _this.onFilterInputChange = _this.onFilterInputChange.bind(_assertThisInitialized(_this));
    _this.onFilterInputKeyDown = _this.onFilterInputKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Tree, [{
    key: "getFilterValue",
    value: function getFilterValue() {
      return this.props.onFilterValueChange ? this.props.filterValue : this.state.filterValue;
    }
  }, {
    key: "getExpandedKeys",
    value: function getExpandedKeys() {
      return this.props.onToggle ? this.props.expandedKeys : this.state.expandedKeys;
    }
  }, {
    key: "getRootNode",
    value: function getRootNode() {
      return this.props.filter && this.filteredNodes ? this.filteredNodes : this.props.value;
    }
  }, {
    key: "onToggle",
    value: function onToggle(event) {
      if (this.props.onToggle) {
        this.props.onToggle(event);
      } else {
        this.setState({
          expandedKeys: event.value
        });
      }
    }
  }, {
    key: "onDragStart",
    value: function onDragStart(event) {
      this.dragState = {
        path: event.path,
        index: event.index
      };
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd() {
      this.dragState = null;
    }
  }, {
    key: "onDrop",
    value: function onDrop(event) {
      if (this.validateDropNode(this.dragState.path, event.path)) {
        var value = JSON.parse(JSON.stringify(this.props.value));
        var dragPaths = this.dragState.path.split('-');
        dragPaths.pop();
        var dragNodeParent = this.findNode(value, dragPaths);
        var dragNode = dragNodeParent ? dragNodeParent.children[this.dragState.index] : value[this.dragState.index];
        var dropNode = this.findNode(value, event.path.split('-'));
        if (dropNode.children) dropNode.children.push(dragNode);else dropNode.children = [dragNode];
        if (dragNodeParent) dragNodeParent.children.splice(this.dragState.index, 1);else value.splice(this.dragState.index, 1);

        if (this.props.onDragDrop) {
          this.props.onDragDrop({
            originalEvent: event.originalEvent,
            value: value,
            dragNode: dragNode,
            dropNode: dropNode,
            dropIndex: event.index
          });
        }
      }
    }
  }, {
    key: "onDropPoint",
    value: function onDropPoint(event) {
      if (this.validateDropPoint(event)) {
        var value = JSON.parse(JSON.stringify(this.props.value));
        var dragPaths = this.dragState.path.split('-');
        dragPaths.pop();
        var dropPaths = event.path.split('-');
        dropPaths.pop();
        var dragNodeParent = this.findNode(value, dragPaths);
        var dropNodeParent = this.findNode(value, dropPaths);
        var dragNode = dragNodeParent ? dragNodeParent.children[this.dragState.index] : value[this.dragState.index];
        var siblings = this.areSiblings(this.dragState.path, event.path);
        if (dragNodeParent) dragNodeParent.children.splice(this.dragState.index, 1);else value.splice(this.dragState.index, 1);

        if (event.position < 0) {
          var dropIndex = siblings ? this.dragState.index > event.index ? event.index : event.index - 1 : event.index;
          if (dropNodeParent) dropNodeParent.children.splice(dropIndex, 0, dragNode);else value.splice(dropIndex, 0, dragNode);
        } else {
          if (dropNodeParent) dropNodeParent.children.push(dragNode);else value.push(dragNode);
        }

        if (this.props.onDragDrop) {
          this.props.onDragDrop({
            originalEvent: event.originalEvent,
            value: value,
            dragNode: dragNode,
            dropNode: dropNodeParent,
            dropIndex: event.index
          });
        }
      }
    }
  }, {
    key: "validateDrop",
    value: function validateDrop(dragPath, dropPath) {
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
    }
  }, {
    key: "validateDropNode",
    value: function validateDropNode(dragPath, dropPath) {
      var validateDrop = this.validateDrop(dragPath, dropPath);

      if (validateDrop) {
        //child dropped on parent
        if (dragPath.indexOf('-') > 0 && dragPath.substring(0, dragPath.lastIndexOf('-')) === dropPath) {
          return false;
        }

        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "validateDropPoint",
    value: function validateDropPoint(event) {
      var validateDrop = this.validateDrop(this.dragState.path, event.path);

      if (validateDrop) {
        //child dropped to next sibling's drop point
        if (event.position === -1 && this.areSiblings(this.dragState.path, event.path) && this.dragState.index + 1 === event.index) {
          return false;
        }

        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "areSiblings",
    value: function areSiblings(path1, path2) {
      if (path1.length === 1 && path2.length === 1) return true;else return path1.substring(0, path1.lastIndexOf('-')) === path2.substring(0, path2.lastIndexOf('-'));
    }
  }, {
    key: "findNode",
    value: function findNode(value, path) {
      if (path.length === 0) {
        return null;
      } else {
        var index = parseInt(path[0], 10);
        var nextSearchRoot = value.children ? value.children[index] : value[index];

        if (path.length === 1) {
          return nextSearchRoot;
        } else {
          path.shift();
          return this.findNode(nextSearchRoot, path);
        }
      }
    }
  }, {
    key: "isNodeLeaf",
    value: function isNodeLeaf(node) {
      return node.leaf === false ? false : !(node.children && node.children.length);
    }
  }, {
    key: "onFilterInputKeyDown",
    value: function onFilterInputKeyDown(event) {
      //enter
      if (event.which === 13) {
        event.preventDefault();
      }
    }
  }, {
    key: "onFilterInputChange",
    value: function onFilterInputChange(event) {
      this.filterChanged = true;
      var filterValue = event.target.value;

      if (this.props.onFilterValueChange) {
        this.props.onFilterValueChange({
          originalEvent: event,
          value: filterValue
        });
      } else {
        this.setState({
          filterValue: filterValue
        });
      }
    }
  }, {
    key: "filter",
    value: function filter(value) {
      this.setState({
        filterValue: ObjectUtils.isNotEmpty(value) ? value : ''
      }, this._filter);
    }
  }, {
    key: "_filter",
    value: function _filter() {
      if (!this.filterChanged) {
        return;
      }

      var filterValue = this.getFilterValue();

      if (ObjectUtils.isEmpty(filterValue)) {
        this.filteredNodes = this.props.value;
      } else {
        this.filteredNodes = [];
        var searchFields = this.props.filterBy.split(',');
        var filterText = filterValue.toLocaleLowerCase(this.props.filterLocale);
        var isStrictMode = this.props.filterMode === 'strict';

        var _iterator = _createForOfIteratorHelper(this.props.value),
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

            if (isStrictMode && (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode)) || !isStrictMode && (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode))) {
              this.filteredNodes.push(copyNode);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this.filterChanged = false;
    }
  }, {
    key: "findFilteredNodes",
    value: function findFilteredNodes(node, paramsWithoutNode) {
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

              if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
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
    }
  }, {
    key: "isFilterMatched",
    value: function isFilterMatched(node, _ref) {
      var searchFields = _ref.searchFields,
          filterText = _ref.filterText,
          isStrictMode = _ref.isStrictMode;
      var matched = false;

      var _iterator3 = _createForOfIteratorHelper(searchFields),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var field = _step3.value;
          var fieldValue = String(ObjectUtils.resolveFieldData(node, field)).toLocaleLowerCase(this.props.filterLocale);

          if (fieldValue.indexOf(filterText) > -1) {
            matched = true;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (!matched || isStrictMode && !this.isNodeLeaf(node)) {
        matched = this.findFilteredNodes(node, {
          searchFields: searchFields,
          filterText: filterText,
          isStrictMode: isStrictMode
        }) || matched;
      }

      return matched;
    }
  }, {
    key: "renderRootChild",
    value: function renderRootChild(node, index, last) {
      return /*#__PURE__*/React.createElement(UITreeNode, {
        key: node.key || node.label,
        node: node,
        index: index,
        last: last,
        path: String(index),
        disabled: this.props.disabled,
        selectionMode: this.props.selectionMode,
        selectionKeys: this.props.selectionKeys,
        onSelectionChange: this.props.onSelectionChange,
        metaKeySelection: this.props.metaKeySelection,
        contextMenuSelectionKey: this.props.contextMenuSelectionKey,
        onContextMenuSelectionChange: this.props.onContextMenuSelectionChange,
        onContextMenu: this.props.onContextMenu,
        propagateSelectionDown: this.props.propagateSelectionDown,
        propagateSelectionUp: this.props.propagateSelectionUp,
        onExpand: this.props.onExpand,
        onCollapse: this.props.onCollapse,
        onSelect: this.props.onSelect,
        onUnselect: this.props.onUnselect,
        expandedKeys: this.getExpandedKeys(),
        onToggle: this.onToggle,
        nodeTemplate: this.props.nodeTemplate,
        togglerTemplate: this.props.togglerTemplate,
        isNodeLeaf: this.isNodeLeaf,
        dragdropScope: this.props.dragdropScope,
        onDragStart: this.onDragStart,
        onDragEnd: this.onDragEnd,
        onDrop: this.onDrop,
        onDropPoint: this.onDropPoint,
        onNodeClick: this.props.onNodeClick,
        onNodeDoubleClick: this.props.onNodeDoubleClick
      });
    }
  }, {
    key: "renderRootChildren",
    value: function renderRootChildren() {
      var _this2 = this;

      if (this.props.filter) {
        this.filterChanged = true;

        this._filter();
      }

      var value = this.getRootNode();
      return value.map(function (node, index) {
        return _this2.renderRootChild(node, index, index === value.length - 1);
      });
    }
  }, {
    key: "renderModel",
    value: function renderModel() {
      if (this.props.value) {
        var rootNodes = this.renderRootChildren();
        var contentClass = classNames('p-tree-container', this.props.contentClassName);
        return /*#__PURE__*/React.createElement("ul", {
          className: contentClass,
          role: "tree",
          "aria-label": this.props.ariaLabel,
          "aria-labelledby": this.props.ariaLabelledBy,
          style: this.props.contentStyle
        }, rootNodes);
      }

      return null;
    }
  }, {
    key: "renderLoader",
    value: function renderLoader() {
      if (this.props.loading) {
        var icon = classNames('p-tree-loading-icon pi-spin', this.props.loadingIcon);
        return /*#__PURE__*/React.createElement("div", {
          className: "p-tree-loading-overlay p-component-overlay"
        }, /*#__PURE__*/React.createElement("i", {
          className: icon
        }));
      }

      return null;
    }
  }, {
    key: "renderFilter",
    value: function renderFilter() {
      if (this.props.filter) {
        var filterValue = this.getFilterValue();
        filterValue = ObjectUtils.isNotEmpty(filterValue) ? filterValue : '';
        return /*#__PURE__*/React.createElement("div", {
          className: "p-tree-filter-container"
        }, /*#__PURE__*/React.createElement("input", {
          type: "text",
          value: filterValue,
          autoComplete: "off",
          className: "p-tree-filter p-inputtext p-component",
          placeholder: this.props.filterPlaceholder,
          onKeyDown: this.onFilterInputKeyDown,
          onChange: this.onFilterInputChange,
          disabled: this.props.disabled
        }), /*#__PURE__*/React.createElement("span", {
          className: "p-tree-filter-icon pi pi-search"
        }));
      }

      return null;
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      if (this.props.showHeader) {
        var filterElement = this.renderFilter();
        var content = filterElement;

        if (this.props.header) {
          var defaultContentOptions = {
            filterContainerClassName: 'p-tree-filter-container',
            filterIconClasssName: 'p-tree-filter-icon pi pi-search',
            filterInput: {
              className: 'p-tree-filter p-inputtext p-component',
              onKeyDown: this.onFilterInputKeyDown,
              onChange: this.onFilterInputChange
            },
            filterElement: filterElement,
            element: content,
            props: this.props
          };
          content = ObjectUtils.getJSXElement(this.props.header, defaultContentOptions);
        }

        return /*#__PURE__*/React.createElement("div", {
          className: "p-tree-header"
        }, content);
      }

      return null;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var content = ObjectUtils.getJSXElement(this.props.footer, this.props);
      return /*#__PURE__*/React.createElement("div", {
        className: "p-tree-footer"
      }, content);
    }
  }, {
    key: "render",
    value: function render() {
      var className = classNames('p-tree p-component', this.props.className, {
        'p-tree-selectable': this.props.selectionMode,
        'p-tree-loading': this.props.loading,
        'p-disabled': this.props.disabled
      });
      var loader = this.renderLoader();
      var content = this.renderModel();
      var header = this.renderHeader();
      var footer = this.renderFooter();
      return /*#__PURE__*/React.createElement("div", {
        id: this.props.id,
        className: className,
        style: this.props.style
      }, loader, header, content, footer);
    }
  }]);

  return Tree;
}(Component);

_defineProperty(Tree, "defaultProps", {
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
});

export { Tree };
