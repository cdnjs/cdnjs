'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var button = require('primereact/button');
var core = require('primereact/core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var OrderListControls = /*#__PURE__*/function (_Component) {
  _inherits(OrderListControls, _Component);

  var _super = _createSuper$2(OrderListControls);

  function OrderListControls() {
    var _this;

    _classCallCheck(this, OrderListControls);

    _this = _super.call(this);
    _this.moveUp = _this.moveUp.bind(_assertThisInitialized(_this));
    _this.moveTop = _this.moveTop.bind(_assertThisInitialized(_this));
    _this.moveDown = _this.moveDown.bind(_assertThisInitialized(_this));
    _this.moveBottom = _this.moveBottom.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(OrderListControls, [{
    key: "moveUp",
    value: function moveUp(event) {
      if (this.props.selection) {
        var value = _toConsumableArray(this.props.value);

        for (var i = 0; i < this.props.selection.length; i++) {
          var selectedItem = this.props.selection[i];
          var selectedItemIndex = core.ObjectUtils.findIndexInList(selectedItem, value, this.props.dataKey);

          if (selectedItemIndex !== 0) {
            var movedItem = value[selectedItemIndex];
            var temp = value[selectedItemIndex - 1];
            value[selectedItemIndex - 1] = movedItem;
            value[selectedItemIndex] = temp;
          } else {
            break;
          }
        }

        if (this.props.onReorder) {
          this.props.onReorder({
            originalEvent: event,
            value: value,
            direction: 'up'
          });
        }
      }
    }
  }, {
    key: "moveTop",
    value: function moveTop(event) {
      if (this.props.selection) {
        var value = _toConsumableArray(this.props.value);

        for (var i = 0; i < this.props.selection.length; i++) {
          var selectedItem = this.props.selection[i];
          var selectedItemIndex = core.ObjectUtils.findIndexInList(selectedItem, value, this.props.dataKey);

          if (selectedItemIndex !== 0) {
            var movedItem = value.splice(selectedItemIndex, 1)[0];
            value.unshift(movedItem);
          } else {
            break;
          }
        }

        if (this.props.onReorder) {
          this.props.onReorder({
            originalEvent: event,
            value: value,
            direction: 'top'
          });
        }
      }
    }
  }, {
    key: "moveDown",
    value: function moveDown(event) {
      if (this.props.selection) {
        var value = _toConsumableArray(this.props.value);

        for (var i = this.props.selection.length - 1; i >= 0; i--) {
          var selectedItem = this.props.selection[i];
          var selectedItemIndex = core.ObjectUtils.findIndexInList(selectedItem, value, this.props.dataKey);

          if (selectedItemIndex !== value.length - 1) {
            var movedItem = value[selectedItemIndex];
            var temp = value[selectedItemIndex + 1];
            value[selectedItemIndex + 1] = movedItem;
            value[selectedItemIndex] = temp;
          } else {
            break;
          }
        }

        if (this.props.onReorder) {
          this.props.onReorder({
            originalEvent: event,
            value: value,
            direction: 'down'
          });
        }
      }
    }
  }, {
    key: "moveBottom",
    value: function moveBottom(event) {
      if (this.props.selection) {
        var value = _toConsumableArray(this.props.value);

        for (var i = this.props.selection.length - 1; i >= 0; i--) {
          var selectedItem = this.props.selection[i];
          var selectedItemIndex = core.ObjectUtils.findIndexInList(selectedItem, value, this.props.dataKey);

          if (selectedItemIndex !== value.length - 1) {
            var movedItem = value.splice(selectedItemIndex, 1)[0];
            value.push(movedItem);
          } else {
            break;
          }
        }

        if (this.props.onReorder) {
          this.props.onReorder({
            originalEvent: event,
            value: value,
            direction: 'bottom'
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "p-orderlist-controls"
      }, /*#__PURE__*/React__default['default'].createElement(button.Button, {
        type: "button",
        icon: "pi pi-angle-up",
        onClick: this.moveUp
      }), /*#__PURE__*/React__default['default'].createElement(button.Button, {
        type: "button",
        icon: "pi pi-angle-double-up",
        onClick: this.moveTop
      }), /*#__PURE__*/React__default['default'].createElement(button.Button, {
        type: "button",
        icon: "pi pi-angle-down",
        onClick: this.moveDown
      }), /*#__PURE__*/React__default['default'].createElement(button.Button, {
        type: "button",
        icon: "pi pi-angle-double-down",
        onClick: this.moveBottom
      }));
    }
  }]);

  return OrderListControls;
}(React.Component);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var OrderListSubList = /*#__PURE__*/function (_Component) {
  _inherits(OrderListSubList, _Component);

  var _super = _createSuper$1(OrderListSubList);

  function OrderListSubList(props) {
    var _this;

    _classCallCheck(this, OrderListSubList);

    _this = _super.call(this, props);
    _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_this));
    _this.onDragLeave = _this.onDragLeave.bind(_assertThisInitialized(_this));
    _this.onDrop = _this.onDrop.bind(_assertThisInitialized(_this));
    _this.onListMouseMove = _this.onListMouseMove.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(OrderListSubList, [{
    key: "isSelected",
    value: function isSelected(item) {
      return core.ObjectUtils.findIndexInList(item, this.props.selection, this.props.dataKey) !== -1;
    }
  }, {
    key: "onDragStart",
    value: function onDragStart(event, index) {
      this.dragging = true;
      this.draggedItemIndex = index;

      if (this.props.dragdropScope) {
        event.dataTransfer.setData('text', 'orderlist');
      }
    }
  }, {
    key: "onDragOver",
    value: function onDragOver(event, index) {
      if (this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
        this.dragOverItemIndex = index;
        core.DomHandler.addClass(event.target, 'p-orderlist-droppoint-highlight');
        event.preventDefault();
      }
    }
  }, {
    key: "onDragLeave",
    value: function onDragLeave(event) {
      this.dragOverItemIndex = null;
      core.DomHandler.removeClass(event.target, 'p-orderlist-droppoint-highlight');
    }
  }, {
    key: "onDrop",
    value: function onDrop(event) {
      var dropIndex = this.draggedItemIndex > this.dragOverItemIndex ? this.dragOverItemIndex : this.dragOverItemIndex === 0 ? 0 : this.dragOverItemIndex - 1;

      var value = _toConsumableArray(this.props.value);

      core.ObjectUtils.reorderArray(value, this.draggedItemIndex, dropIndex);
      this.dragOverItemIndex = null;
      core.DomHandler.removeClass(event.target, 'p-orderlist-droppoint-highlight');

      if (this.props.onChange) {
        this.props.onChange({
          originalEvent: event,
          value: value
        });
      }
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd(event) {
      this.dragging = false;
    }
  }, {
    key: "onListMouseMove",
    value: function onListMouseMove(event) {
      if (this.dragging) {
        var offsetY = this.listElement.getBoundingClientRect().top + core.DomHandler.getWindowScrollTop();
        var bottomDiff = offsetY + this.listElement.clientHeight - event.pageY;
        var topDiff = event.pageY - offsetY;
        if (bottomDiff < 25 && bottomDiff > 0) this.listElement.scrollTop += 15;else if (topDiff < 25 && topDiff > 0) this.listElement.scrollTop -= 15;
      }
    }
  }, {
    key: "renderDropPoint",
    value: function renderDropPoint(index, key) {
      var _this2 = this;

      return /*#__PURE__*/React__default['default'].createElement("li", {
        key: key,
        className: "p-orderlist-droppoint",
        onDragOver: function onDragOver(e) {
          return _this2.onDragOver(e, index + 1);
        },
        onDragLeave: this.onDragLeave,
        onDrop: this.onDrop
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var header = null;
      var items = null;

      if (this.props.header) {
        header = /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-orderlist-header"
        }, this.props.header);
      }

      if (this.props.value) {
        items = this.props.value.map(function (item, i) {
          var content = _this3.props.itemTemplate ? _this3.props.itemTemplate(item) : item;
          var itemClassName = core.classNames('p-orderlist-item', {
            'p-highlight': _this3.isSelected(item)
          }, _this3.props.className);
          var key = JSON.stringify(item);

          if (_this3.props.dragdrop) {
            var _items = [_this3.renderDropPoint(i, key + '_droppoint'), /*#__PURE__*/React__default['default'].createElement("li", {
              key: key,
              className: itemClassName,
              onClick: function onClick(e) {
                return _this3.props.onItemClick({
                  originalEvent: e,
                  value: item,
                  index: i
                });
              },
              onKeyDown: function onKeyDown(e) {
                return _this3.props.onItemKeyDown({
                  originalEvent: e,
                  value: item,
                  index: i
                });
              },
              role: "option",
              "aria-selected": _this3.isSelected(item),
              draggable: "true",
              onDragStart: function onDragStart(e) {
                return _this3.onDragStart(e, i);
              },
              onDragEnd: _this3.onDragEnd,
              tabIndex: _this3.props.tabIndex
            }, content, /*#__PURE__*/React__default['default'].createElement(core.Ripple, null))];

            if (i === _this3.props.value.length - 1) {
              _items.push(_this3.renderDropPoint(item, i, key + '_droppoint_end'));
            }

            return _items;
          } else {
            return /*#__PURE__*/React__default['default'].createElement("li", {
              key: JSON.stringify(item),
              className: itemClassName,
              role: "option",
              "aria-selected": _this3.isSelected(item),
              onClick: function onClick(e) {
                return _this3.props.onItemClick({
                  originalEvent: e,
                  value: item,
                  index: i
                });
              },
              onKeyDown: function onKeyDown(e) {
                return _this3.props.onItemKeyDown({
                  originalEvent: e,
                  value: item,
                  index: i
                });
              },
              tabIndex: _this3.props.tabIndex
            }, content);
          }
        });
      }

      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "p-orderlist-list-container"
      }, header, /*#__PURE__*/React__default['default'].createElement("ul", {
        ref: function ref(el) {
          return _this3.listElement = el;
        },
        className: "p-orderlist-list",
        style: this.props.listStyle,
        onDragOver: this.onListMouseMove,
        role: "listbox",
        "aria-multiselectable": true
      }, items));
    }
  }]);

  return OrderListSubList;
}(React.Component);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var OrderList = /*#__PURE__*/function (_Component) {
  _inherits(OrderList, _Component);

  var _super = _createSuper(OrderList);

  function OrderList(props) {
    var _this;

    _classCallCheck(this, OrderList);

    _this = _super.call(this, props);
    _this.state = {
      selection: []
    };
    _this.onItemClick = _this.onItemClick.bind(_assertThisInitialized(_this));
    _this.onItemKeyDown = _this.onItemKeyDown.bind(_assertThisInitialized(_this));
    _this.onReorder = _this.onReorder.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(OrderList, [{
    key: "onItemClick",
    value: function onItemClick(event) {
      var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
      var index = core.ObjectUtils.findIndexInList(event.value, this.state.selection, this.props.dataKey);
      var selected = index !== -1;
      var selection;

      if (selected) {
        if (metaKey) selection = this.state.selection.filter(function (val, i) {
          return i !== index;
        });else selection = [event.value];
      } else {
        if (metaKey) selection = [].concat(_toConsumableArray(this.state.selection), [event.value]);else selection = [event.value];
      }

      this.setState({
        selection: selection
      });
    }
  }, {
    key: "onItemKeyDown",
    value: function onItemKeyDown(event) {
      var listItem = event.originalEvent.currentTarget;

      switch (event.originalEvent.which) {
        //down
        case 40:
          var nextItem = this.findNextItem(listItem);

          if (nextItem) {
            nextItem.focus();
          }

          event.originalEvent.preventDefault();
          break;
        //up

        case 38:
          var prevItem = this.findPrevItem(listItem);

          if (prevItem) {
            prevItem.focus();
          }

          event.originalEvent.preventDefault();
          break;
        //enter

        case 13:
          this.onItemClick(event);
          event.originalEvent.preventDefault();
          break;
      }
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      if (nextItem) return !core.DomHandler.hasClass(nextItem, 'p-orderlist-item') ? this.findNextItem(nextItem) : nextItem;else return null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return !core.DomHandler.hasClass(prevItem, 'p-orderlist-item') ? this.findPrevItem(prevItem) : prevItem;else return null;
    }
  }, {
    key: "onReorder",
    value: function onReorder(event) {
      if (this.props.onChange) {
        this.props.onChange({
          event: event.originalEvent,
          value: event.value
        });
      }

      this.reorderDirection = event.direction;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.reorderDirection) {
        this.updateListScroll();
        this.reorderDirection = null;
      }
    }
  }, {
    key: "updateListScroll",
    value: function updateListScroll() {
      var listItems = core.DomHandler.find(this.subList.listElement, '.p-orderlist-item.p-highlight');

      if (listItems && listItems.length) {
        switch (this.reorderDirection) {
          case 'up':
            core.DomHandler.scrollInView(this.subList.listElement, listItems[0]);
            break;

          case 'top':
            this.subList.listElement.scrollTop = 0;
            break;

          case 'down':
            core.DomHandler.scrollInView(this.subList.listElement, listItems[listItems.length - 1]);
            break;

          case 'bottom':
            this.subList.listElement.scrollTop = this.subList.listElement.scrollHeight;
            break;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = core.classNames('p-orderlist p-component', this.props.className);
      return /*#__PURE__*/React__default['default'].createElement("div", {
        ref: function ref(el) {
          return _this2.element = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style
      }, /*#__PURE__*/React__default['default'].createElement(OrderListControls, {
        value: this.props.value,
        selection: this.state.selection,
        onReorder: this.onReorder,
        dataKey: this.props.dataKey
      }), /*#__PURE__*/React__default['default'].createElement(OrderListSubList, {
        ref: function ref(el) {
          return _this2.subList = el;
        },
        value: this.props.value,
        selection: this.state.selection,
        onItemClick: this.onItemClick,
        onItemKeyDown: this.onItemKeyDown,
        itemTemplate: this.props.itemTemplate,
        header: this.props.header,
        listStyle: this.props.listStyle,
        dataKey: this.props.dataKey,
        dragdrop: this.props.dragdrop,
        onDragStart: this.onDragStart,
        onDragEnter: this.onDragEnter,
        onDragEnd: this.onDragEnd,
        onDragLeave: this.onDragEnter,
        onDrop: this.onDrop,
        onChange: this.props.onChange,
        tabIndex: this.props.tabIndex
      }));
    }
  }]);

  return OrderList;
}(React.Component);

_defineProperty(OrderList, "defaultProps", {
  id: null,
  value: null,
  header: null,
  style: null,
  className: null,
  listStyle: null,
  dragdrop: false,
  tabIndex: 0,
  dataKey: null,
  onChange: null,
  itemTemplate: null
});

exports.OrderList = OrderList;
