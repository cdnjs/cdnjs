"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrganizationChart = exports.OrganizationChartNode = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var OrganizationChartNode = /*#__PURE__*/function (_Component) {
  _inherits(OrganizationChartNode, _Component);

  var _super = _createSuper(OrganizationChartNode);

  function OrganizationChartNode(props) {
    var _this;

    _classCallCheck(this, OrganizationChartNode);

    _this = _super.call(this, props);
    _this.node = _this.props.node;
    _this.state = {
      expanded: _this.node.expanded
    };
    return _this;
  }

  _createClass(OrganizationChartNode, [{
    key: "getLeaf",
    value: function getLeaf() {
      return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
    }
  }, {
    key: "getColspan",
    value: function getColspan() {
      return this.node.children && this.node.children.length ? this.node.children.length * 2 : null;
    }
  }, {
    key: "onNodeClick",
    value: function onNodeClick(event, node) {
      this.props.onNodeClick(event, node);
    }
  }, {
    key: "toggleNode",
    value: function toggleNode(event, node) {
      this.setState(function (prevState) {
        return {
          expanded: !prevState.expanded
        };
      });
      event.preventDefault();
    }
  }, {
    key: "isSelected",
    value: function isSelected() {
      return this.props.isSelected(this.node);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.node = this.props.node;
      var colspan = this.getColspan();

      var nodeClassName = (0, _ClassNames.classNames)('p-organizationchart-node-content', this.node.className, {
        'p-organizationchart-selectable-node': this.props.selectionMode && this.node.selectable !== false,
        'p-highlight': this.isSelected()
      }),
          nodeLabel = this.props.nodeTemplate && this.props.nodeTemplate(this.node) ? /*#__PURE__*/_react.default.createElement("div", null, this.props.nodeTemplate(this.node)) : /*#__PURE__*/_react.default.createElement("div", null, this.node.label),
          toggleIcon = (0, _ClassNames.classNames)('p-node-toggler-icon', {
        'pi pi-chevron-down': this.state.expanded,
        'pi pi-chevron-up': !this.state.expanded
      }),
          nodeContent = /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
        colSpan: colspan
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: nodeClassName,
        onClick: function onClick(e) {
          return _this2.onNodeClick(e, _this2.node);
        }
      }, nodeLabel,
      /* eslint-disable */
      !this.getLeaf() && /*#__PURE__*/_react.default.createElement("a", {
        href: "#",
        className: "p-node-toggler",
        onClick: function onClick(e) {
          return _this2.toggleNode(e, _this2.node);
        }
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: toggleIcon
      }))
      /* eslint-enable */
      )));

      var _visibility = !this.getLeaf() && this.state.expanded ? 'inherit' : 'hidden',
          linesDown = /*#__PURE__*/_react.default.createElement("tr", {
        style: {
          visibility: _visibility
        },
        className: "p-organizationchart-lines"
      }, /*#__PURE__*/_react.default.createElement("td", {
        colSpan: colspan
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-organizationchart-line-down"
      }))),
          nodeChildLength = this.node.children && this.node.children.length,
          linesMiddle = /*#__PURE__*/_react.default.createElement("tr", {
        style: {
          visibility: _visibility
        },
        className: "p-organizationchart-lines"
      }, this.node.children && this.node.children.length === 1 && /*#__PURE__*/_react.default.createElement("td", {
        colSpan: this.getColspan()
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-organizationchart-line-down"
      })), this.node.children && this.node.children.length > 1 && this.node.children.map(function (item, index) {
        var leftClass = (0, _ClassNames.classNames)('p-organizationchart-line-left', {
          'p-organizationchart-line-top': index !== 0
        }),
            rightClass = (0, _ClassNames.classNames)('p-organizationchart-line-right', {
          'p-organizationchart-line-top': index !== nodeChildLength - 1
        });
        return [/*#__PURE__*/_react.default.createElement("td", {
          key: index + '_lineleft',
          className: leftClass
        }, "\xA0"), /*#__PURE__*/_react.default.createElement("td", {
          key: index + '_lineright',
          className: rightClass
        }, "\xA0")];
      })),
          childNodes = /*#__PURE__*/_react.default.createElement("tr", {
        style: {
          visibility: _visibility
        },
        className: "p-organizationchart-nodes"
      }, this.node.children && this.node.children.map(function (child, index) {
        return /*#__PURE__*/_react.default.createElement("td", {
          key: index,
          colSpan: "2"
        }, /*#__PURE__*/_react.default.createElement(OrganizationChartNode, {
          node: child,
          nodeTemplate: _this2.props.nodeTemplate,
          selectionMode: _this2.props.selectionMode,
          onNodeClick: _this2.props.onNodeClick,
          isSelected: _this2.props.isSelected
        }));
      }));

      return /*#__PURE__*/_react.default.createElement("table", {
        className: "p-organizationchart-table"
      }, /*#__PURE__*/_react.default.createElement("tbody", null, nodeContent, linesDown, linesMiddle, childNodes));
    }
  }]);

  return OrganizationChartNode;
}(_react.Component);

exports.OrganizationChartNode = OrganizationChartNode;

_defineProperty(OrganizationChartNode, "defaultProps", {
  node: null,
  nodeTemplate: null,
  root: false,
  first: false,
  last: false,
  selectionMode: null,
  onNodeClick: null,
  isSelected: null
});

_defineProperty(OrganizationChartNode, "propTypes", {
  node: _propTypes.default.any,
  nodeTemplate: _propTypes.default.any,
  root: _propTypes.default.bool,
  first: _propTypes.default.bool,
  last: _propTypes.default.bool,
  selectionMode: _propTypes.default.string,
  onNodeClick: _propTypes.default.func,
  isSelected: _propTypes.default.func
});

var OrganizationChart = /*#__PURE__*/function (_Component2) {
  _inherits(OrganizationChart, _Component2);

  var _super2 = _createSuper(OrganizationChart);

  function OrganizationChart(props) {
    var _this3;

    _classCallCheck(this, OrganizationChart);

    _this3 = _super2.call(this, props);
    _this3.root = _this3.props.value && _this3.props.value.length ? _this3.props.value[0] : null;
    _this3.onNodeClick = _this3.onNodeClick.bind(_assertThisInitialized(_this3));
    _this3.isSelected = _this3.isSelected.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(OrganizationChart, [{
    key: "onNodeClick",
    value: function onNodeClick(event, node) {
      if (this.props.selectionMode) {
        var eventTarget = event.target;

        if (eventTarget.className && (eventTarget.className.indexOf('p-node-toggler') !== -1 || eventTarget.className.indexOf('p-node-toggler-icon') !== -1)) {
          return;
        }

        if (node.selectable === false) {
          return;
        }

        var index = this.findIndexInSelection(node);
        var selected = index >= 0;
        var selection;

        if (this.props.selectionMode === 'single') {
          if (selected) {
            selection = null;

            if (this.props.onNodeUnselect) {
              this.props.onNodeUnselect({
                originalEvent: event,
                node: node
              });
            }
          } else {
            selection = node;

            if (this.props.onNodeSelect) {
              this.props.onNodeSelect({
                originalEvent: event,
                node: node
              });
            }
          }
        } else if (this.props.selectionMode === 'multiple') {
          if (selected) {
            selection = this.props.selection.filter(function (val, i) {
              return i !== index;
            });

            if (this.props.onNodeUnselect) {
              this.props.onNodeUnselect({
                originalEvent: event,
                node: node
              });
            }
          } else {
            selection = [].concat(_toConsumableArray(this.props.selection || []), [node]);

            if (this.props.onNodeSelect) {
              this.props.onNodeSelect({
                originalEvent: event,
                node: node
              });
            }
          }
        }

        if (this.props.onSelectionChange) {
          this.props.onSelectionChange({
            originalEvent: event,
            data: selection
          });
        }
      }
    }
  }, {
    key: "findIndexInSelection",
    value: function findIndexInSelection(node) {
      var index = -1;

      if (this.props.selectionMode && this.props.selection) {
        if (this.props.selectionMode === 'single') {
          index = this.props.selection === node ? 0 : -1;
        } else if (this.props.selectionMode === 'multiple') {
          for (var i = 0; i < this.props.selection.length; i++) {
            if (this.props.selection[i] === node) {
              index = i;
              break;
            }
          }
        }
      }

      return index;
    }
  }, {
    key: "isSelected",
    value: function isSelected(node) {
      return this.findIndexInSelection(node) !== -1;
    }
  }, {
    key: "render",
    value: function render() {
      this.root = this.props.value && this.props.value.length ? this.props.value[0] : null;
      var className = (0, _ClassNames.classNames)('p-organizationchart p-component', this.props.className);
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        style: this.props.style,
        className: className
      }, /*#__PURE__*/_react.default.createElement(OrganizationChartNode, {
        node: this.root,
        nodeTemplate: this.props.nodeTemplate,
        selectionMode: this.props.selectionMode,
        onNodeClick: this.onNodeClick,
        isSelected: this.isSelected
      }));
    }
  }]);

  return OrganizationChart;
}(_react.Component);

exports.OrganizationChart = OrganizationChart;

_defineProperty(OrganizationChart, "defaultProps", {
  id: null,
  value: null,
  style: null,
  className: null,
  selectionMode: null,
  selection: null,
  nodeTemplate: null,
  onSelectionChange: null,
  onNodeSelect: null,
  onNodeUnselect: null
});

_defineProperty(OrganizationChart, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.any,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  selectionMode: _propTypes.default.string,
  selection: _propTypes.default.any,
  nodeTemplate: _propTypes.default.any,
  onSelectionChange: _propTypes.default.func,
  onNodeSelect: _propTypes.default.func,
  onNodeUnselect: _propTypes.default.func
});