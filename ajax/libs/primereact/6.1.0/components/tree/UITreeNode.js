"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UITreeNode = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _Ripple = require("../ripple/Ripple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UITreeNode = /*#__PURE__*/function (_Component) {
  _inherits(UITreeNode, _Component);

  var _super = _createSuper(UITreeNode);

  function UITreeNode(props) {
    var _this;

    _classCallCheck(this, UITreeNode);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
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
      var expandedKeys = this.props.expandedKeys ? _objectSpread({}, this.props.expandedKeys) : {};
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
      var expandedKeys = _objectSpread({}, this.props.expandedKeys);

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
      return this.props.expandedKeys ? this.props.expandedKeys[this.props.node.key] !== undefined : false;
    }
  }, {
    key: "onNodeKeyDown",
    value: function onNodeKeyDown(event) {
      if (this.props.disabled) {
        return;
      }

      var nodeElement = event.target.parentElement;

      if (!_DomHandler.default.hasClass(nodeElement, 'p-treenode')) {
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

        default:
          //no op
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
      return _DomHandler.default.hasClass(parentNodeElement, 'p-treenode') ? parentNodeElement : null;
    }
  }, {
    key: "focusNode",
    value: function focusNode(element) {
      element.children[0].focus();
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (event.target.className && event.target.className.constructor === String && event.target.className.indexOf('p-tree-toggler') === 0 || this.props.disabled) {
        return;
      }

      if (this.props.selectionMode && this.props.node.selectable !== false) {
        var selectionKeys;

        if (this.isCheckboxSelectionMode()) {
          var checked = this.isChecked();
          selectionKeys = this.props.selectionKeys ? _objectSpread({}, this.props.selectionKeys) : {};

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
                selectionKeys = _objectSpread({}, this.props.selectionKeys);
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
                selectionKeys = !metaKey ? {} : this.props.selectionKeys ? _objectSpread({}, this.props.selectionKeys) : {};
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
                selectionKeys = _objectSpread({}, this.props.selectionKeys);
                delete selectionKeys[this.props.node.key];

                if (this.props.onUnselect) {
                  this.props.onUnselect({
                    originalEvent: event,
                    node: this.props.node
                  });
                }
              } else {
                selectionKeys = this.props.selectionKeys ? _objectSpread({}, this.props.selectionKeys) : {};
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
    key: "onRightClick",
    value: function onRightClick(event) {
      if (this.props.disabled) {
        return;
      }

      _DomHandler.default.clearSelection();

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

      var _iterator = _createForOfIteratorHelper(this.props.node.children),
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
        };else selectionKeys[this.props.node.key] = {
          checked: false,
          partialChecked: false
        };
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
        _DomHandler.default.removeClass(event.target, 'p-treenode-droppoint-active');

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
        _DomHandler.default.addClass(event.target, 'p-treenode-droppoint-active');
      }
    }
  }, {
    key: "onDropPointDragLeave",
    value: function onDropPointDragLeave(event) {
      if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase()) {
        _DomHandler.default.removeClass(event.target, 'p-treenode-droppoint-active');
      }
    }
  }, {
    key: "onDrop",
    value: function onDrop(event) {
      if (this.props.dragdropScope && this.props.node.droppable !== false) {
        _DomHandler.default.removeClass(this.contentElement, 'p-treenode-dragover');

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
        _DomHandler.default.addClass(this.contentElement, 'p-treenode-dragover');
      }
    }
  }, {
    key: "onDragLeave",
    value: function onDragLeave(event) {
      if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase() && this.props.node.droppable !== false) {
        var rect = event.currentTarget.getBoundingClientRect();

        if (event.nativeEvent.x > rect.left + rect.width || event.nativeEvent.x < rect.left || event.nativeEvent.y >= Math.floor(rect.top + rect.height) || event.nativeEvent.y < rect.top) {
          _DomHandler.default.removeClass(this.contentElement, 'p-treenode-dragover');
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
      var label = this.props.nodeTemplate ? this.props.nodeTemplate(this.props.node) : this.props.node.label;
      return /*#__PURE__*/_react.default.createElement("span", {
        className: "p-treenode-label"
      }, label);
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox() {
      if (this.isCheckboxSelectionMode() && this.props.node.selectable !== false) {
        var checked = this.isChecked();
        var partialChecked = this.isPartialChecked();
        var className = (0, _ClassNames.classNames)('p-checkbox-box', {
          'p-highlight': checked,
          'p-indeterminate': partialChecked,
          'p-disabled': this.props.disabled
        });
        var icon = (0, _ClassNames.classNames)('p-checkbox-icon p-c', {
          'pi pi-check': checked,
          'pi pi-minus': partialChecked
        });
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-checkbox p-component"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: className,
          role: "checkbox",
          "aria-checked": checked
        }, /*#__PURE__*/_react.default.createElement("span", {
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
        var className = (0, _ClassNames.classNames)('p-treenode-icon', icon);
        return /*#__PURE__*/_react.default.createElement("span", {
          className: className
        });
      }

      return null;
    }
  }, {
    key: "renderToggler",
    value: function renderToggler(expanded) {
      var iconClassName = (0, _ClassNames.classNames)('p-tree-toggler-icon pi pi-fw', {
        'pi-chevron-right': !expanded,
        'pi-chevron-down': expanded
      });
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "p-tree-toggler p-link",
        tabIndex: -1,
        onClick: this.onTogglerClick
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
    }
  }, {
    key: "renderDropPoint",
    value: function renderDropPoint(position) {
      var _this2 = this;

      if (this.props.dragdropScope) {
        return /*#__PURE__*/_react.default.createElement("li", {
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
      var className = (0, _ClassNames.classNames)('p-treenode-content', this.props.node.className, {
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
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this3.contentElement = el;
        },
        className: className,
        style: this.props.node.style,
        onClick: this.onClick,
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
        return /*#__PURE__*/_react.default.createElement("ul", {
          className: "p-treenode-children",
          role: "group"
        }, this.props.node.children.map(function (childNode, index) {
          return /*#__PURE__*/_react.default.createElement(UITreeNode, {
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
      var className = (0, _ClassNames.classNames)('p-treenode', {
        'p-treenode-leaf': this.isLeaf()
      }, this.props.node.className);
      var content = this.renderContent();
      var children = this.renderChildren();
      return /*#__PURE__*/_react.default.createElement("li", {
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
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, beforeDropPoint, node, afterDropPoint);
      } else {
        return node;
      }
    }
  }]);

  return UITreeNode;
}(_react.Component);

exports.UITreeNode = UITreeNode;

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
  onContextMenu: null
});

_defineProperty(UITreeNode, "propTypes", {
  node: _propTypes.default.object,
  index: _propTypes.default.number,
  last: _propTypes.default.bool,
  parent: _propTypes.default.object,
  path: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  selectionMode: _propTypes.default.string,
  selectionKeys: _propTypes.default.any,
  contextMenuSelectionKey: _propTypes.default.any,
  metaKeySelection: _propTypes.default.bool,
  expandedKeys: _propTypes.default.object,
  propagateSelectionUp: _propTypes.default.bool,
  propagateSelectionDown: _propTypes.default.bool,
  dragdropScope: _propTypes.default.string,
  ariaLabel: _propTypes.default.string,
  ariaLabelledBy: _propTypes.default.string,
  nodeTemplate: _propTypes.default.func,
  isNodeLeaf: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onUnselect: _propTypes.default.func,
  onExpand: _propTypes.default.func,
  onCollapse: _propTypes.default.func,
  onToggle: _propTypes.default.func,
  onSelectionChange: _propTypes.default.func,
  onContextMenuSelectionChange: _propTypes.default.func,
  onPropagateUp: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDrop: _propTypes.default.func,
  onDropPoint: _propTypes.default.func,
  onContextMenu: _propTypes.default.func
});