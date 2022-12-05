this.primereact = this.primereact || {};
this.primereact.organizationchart = (function (exports, React, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
          ;
        }
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var OrganizationChartNode = /*#__PURE__*/React__namespace.memo(function (props) {
    var node = props.node;
    var _React$useState = React__namespace.useState(node.expanded),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      expandedState = _React$useState2[0],
      setExpandedState = _React$useState2[1];
    var leaf = node.leaf === false ? false : !(node.children && node.children.length);
    var colspan = node.children && node.children.length ? node.children.length * 2 : null;
    var selected = props.isSelected(node);
    var visibility = !leaf && expandedState ? 'inherit' : 'hidden';
    var onNodeClick = function onNodeClick(event, node) {
      props.onNodeClick(event, node);
    };
    var toggleNode = function toggleNode(event, node) {
      setExpandedState(function (prevExpanded) {
        return !prevExpanded;
      });
      event.preventDefault();
    };
    var createChildNodes = function createChildNodes() {
      return /*#__PURE__*/React__namespace.createElement("tr", {
        style: {
          visibility: visibility
        },
        className: "p-organizationchart-nodes"
      }, node.children && node.children.map(function (child, index) {
        return /*#__PURE__*/React__namespace.createElement("td", {
          key: index,
          colSpan: "2"
        }, /*#__PURE__*/React__namespace.createElement(OrganizationChartNode, {
          node: child,
          nodeTemplate: props.nodeTemplate,
          selectionMode: props.selectionMode,
          onNodeClick: props.onNodeClick,
          isSelected: props.isSelected
        }));
      }));
    };
    var createLinesMiddle = function createLinesMiddle() {
      var nodeChildLength = node.children && node.children.length;
      return /*#__PURE__*/React__namespace.createElement("tr", {
        style: {
          visibility: visibility
        },
        className: "p-organizationchart-lines"
      }, node.children && node.children.length === 1 && /*#__PURE__*/React__namespace.createElement("td", {
        colSpan: colspan
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-organizationchart-line-down"
      })), node.children && node.children.length > 1 && node.children.map(function (_, index) {
        var leftClassName = utils.classNames('p-organizationchart-line-left', {
          'p-organizationchart-line-top': index !== 0
        });
        var rightClassName = utils.classNames('p-organizationchart-line-right', {
          'p-organizationchart-line-top': index !== nodeChildLength - 1
        });
        return [/*#__PURE__*/React__namespace.createElement("td", {
          key: index + '_lineleft',
          className: leftClassName
        }, "\xA0"), /*#__PURE__*/React__namespace.createElement("td", {
          key: index + '_lineright',
          className: rightClassName
        }, "\xA0")];
      }));
    };
    var createLinesDown = function createLinesDown() {
      return /*#__PURE__*/React__namespace.createElement("tr", {
        style: {
          visibility: visibility
        },
        className: "p-organizationchart-lines"
      }, /*#__PURE__*/React__namespace.createElement("td", {
        colSpan: colspan
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-organizationchart-line-down"
      })));
    };
    var createToggler = function createToggler() {
      if (!leaf) {
        var toggleIconClassName = utils.classNames('p-node-toggler-icon', {
          'pi pi-chevron-down': expandedState,
          'pi pi-chevron-up': !expandedState
        });
        return (
          /*#__PURE__*/
          /* eslint-disable */
          React__namespace.createElement("a", {
            href: "#",
            className: "p-node-toggler",
            onClick: function onClick(e) {
              return toggleNode(e);
            }
          }, /*#__PURE__*/React__namespace.createElement("i", {
            className: toggleIconClassName
          }))
          /* eslint-enable */
        );
      }

      return null;
    };
    var createNodeLabel = function createNodeLabel() {
      var label = props.nodeTemplate && utils.ObjectUtils.getJSXElement(props.nodeTemplate, node) || node.label;
      return /*#__PURE__*/React__namespace.createElement("div", null, label);
    };
    var createNodeContent = function createNodeContent() {
      var nodeClassName = utils.classNames('p-organizationchart-node-content', {
        'p-organizationchart-selectable-node': props.selectionMode && node.selectable !== false,
        'p-highlight': selected
      }, node.className);
      var label = createNodeLabel();
      var toggler = createToggler();
      return /*#__PURE__*/React__namespace.createElement("tr", null, /*#__PURE__*/React__namespace.createElement("td", {
        colSpan: colspan
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: nodeClassName,
        onClick: function onClick(e) {
          return onNodeClick(e, node);
        }
      }, label, toggler)));
    };
    var nodeContent = createNodeContent();
    var linesDown = createLinesDown();
    var linesMiddle = createLinesMiddle();
    var childNodes = createChildNodes();
    return /*#__PURE__*/React__namespace.createElement("table", {
      className: "p-organizationchart-table"
    }, /*#__PURE__*/React__namespace.createElement("tbody", null, nodeContent, linesDown, linesMiddle, childNodes));
  });
  OrganizationChartNode.displayName = 'OrganizationChartNode';

  var OrganizationChart = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(null);
    var root = props.value && props.value.length ? props.value[0] : null;
    var onNodeClick = function onNodeClick(event, node) {
      if (props.selectionMode) {
        var target = event.target;
        if (node.selectable === false || !utils.DomHandler.hasClass(target, 'p-node-toggler') || !utils.DomHandler.hasClass(target, 'p-node-toggler-icon')) {
          return;
        }
        var index = findIndexInSelection(node);
        var selected = index >= 0;
        var selection;
        if (props.selectionMode === 'single') {
          if (selected) {
            selection = null;
            props.onNodeUnselect && props.onNodeUnselect({
              originalEvent: event,
              node: node
            });
          } else {
            selection = node;
            props.onNodeSelect && props.onNodeSelect({
              originalEvent: event,
              node: node
            });
          }
        } else if (props.selectionMode === 'multiple') {
          if (selected) {
            selection = props.selection.filter(function (_, i) {
              return i !== index;
            });
            props.onNodeUnselect && props.onNodeUnselect({
              originalEvent: event,
              node: node
            });
          } else {
            selection = [].concat(_toConsumableArray(props.selection || []), [node]);
            props.onNodeSelect && props.onNodeSelect({
              originalEvent: event,
              node: node
            });
          }
        }
        if (props.onSelectionChange) {
          props.onSelectionChange({
            originalEvent: event,
            data: selection
          });
        }
      }
    };
    var findIndexInSelection = function findIndexInSelection(node) {
      if (props.selectionMode && props.selection) {
        if (props.selectionMode === 'single') return props.selection === node ? 0 : -1;else if (props.selectionMode === 'multiple') return props.selection.findIndex(function (selectedNode) {
          return selectedNode === node;
        });
      }
      return -1;
    };
    var isSelected = function isSelected(node) {
      return findIndexInSelection(node) !== -1;
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var otherProps = utils.ObjectUtils.findDiffKeys(props, OrganizationChart.defaultProps);
    var className = utils.classNames('p-organizationchart p-component', props.className);
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef,
      style: props.style,
      className: className
    }, otherProps), /*#__PURE__*/React__namespace.createElement(OrganizationChartNode, {
      node: root,
      nodeTemplate: props.nodeTemplate,
      selectionMode: props.selectionMode,
      onNodeClick: onNodeClick,
      isSelected: isSelected
    }));
  }));
  OrganizationChart.displayName = 'OrganizationChart';
  OrganizationChart.defaultProps = {
    __TYPE: 'OrganizationChart',
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
  };

  exports.OrganizationChart = OrganizationChart;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);
