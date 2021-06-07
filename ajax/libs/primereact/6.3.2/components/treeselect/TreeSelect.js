"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeSelect = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _PrimeReact = _interopRequireDefault(require("../api/PrimeReact"));

var _ZIndexUtils = require("../utils/ZIndexUtils");

var _OverlayEventBus = _interopRequireDefault(require("../overlayeventbus/OverlayEventBus"));

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

var _Tree = require("../tree/Tree");

var _TreeSelectPanel = require("./TreeSelectPanel");

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

var TreeSelect = /*#__PURE__*/function (_Component) {
  _inherits(TreeSelect, _Component);

  var _super = _createSuper(TreeSelect);

  function TreeSelect(props) {
    var _this;

    _classCallCheck(this, TreeSelect);

    _this = _super.call(this, props);
    _this.state = {
      focused: false,
      overlayVisible: false,
      expandedKeys: {},
      filterValue: ''
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
    _this.onInputBlur = _this.onInputBlur.bind(_assertThisInitialized(_this));
    _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
    _this.onFilterInputChange = _this.onFilterInputChange.bind(_assertThisInitialized(_this));
    _this.onFilterInputKeyDown = _this.onFilterInputKeyDown.bind(_assertThisInitialized(_this));
    _this.onOverlayClick = _this.onOverlayClick.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.onSelectionChange = _this.onSelectionChange.bind(_assertThisInitialized(_this));
    _this.onNodeSelect = _this.onNodeSelect.bind(_assertThisInitialized(_this));
    _this.onNodeUnselect = _this.onNodeUnselect.bind(_assertThisInitialized(_this));
    _this.onNodeToggle = _this.onNodeToggle.bind(_assertThisInitialized(_this));
    _this.onFilterValueChange = _this.onFilterValueChange.bind(_assertThisInitialized(_this));
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    _this.show = _this.show.bind(_assertThisInitialized(_this));
    _this.overlayRef = /*#__PURE__*/(0, _react.createRef)();
    return _this;
  }

  _createClass(TreeSelect, [{
    key: "getSelectedNodes",
    value: function getSelectedNodes() {
      var selectedNodes = [];

      if (this.props.value && this.props.options) {
        var keys = this.props.selectionMode === 'single' ? _defineProperty({}, "".concat(this.props.value), true) : _objectSpread({}, this.props.value);
        this.findSelectedNodes(null, keys, selectedNodes);
      }

      return selectedNodes;
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      var value = this.getSelectedNodes();
      return value.length ? value.map(function (node) {
        return node.label;
      }).join(', ') : this.props.placeholder;
    }
  }, {
    key: "isValueEmpty",
    value: function isValueEmpty() {
      return !this.props.value || Object.keys(this.props.value).length === 0;
    }
  }, {
    key: "hasNoOptions",
    value: function hasNoOptions() {
      return !this.props.options || this.props.options.length === 0;
    }
  }, {
    key: "show",
    value: function show() {
      this.setState({
        overlayVisible: true
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.setState({
        overlayVisible: false
      });
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus() {
      this.setState({
        focused: true
      });
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur() {
      this.setState({
        focused: false
      });
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (!this.props.disabled && (!this.overlayRef || !this.overlayRef.current || !this.overlayRef.current.contains(event.target)) && !_DomHandler.default.hasClass(event.target, 'p-treeselect-close')) {
        this.focusInput.focus();

        if (this.state.overlayVisible) {
          this.hide();
        } else {
          this.show();
        }
      }
    }
  }, {
    key: "onSelectionChange",
    value: function onSelectionChange(event) {
      if (this.props.onChange) {
        this.selfChange = true;
        this.props.onChange({
          originalEvent: event.originalEvent,
          value: event.value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.props.id,
            value: event.value
          }
        });
      }
    }
  }, {
    key: "onNodeSelect",
    value: function onNodeSelect(node) {
      this.props.onNodeSelect && this.props.onNodeSelect(node);

      if (this.props.selectionMode === 'single') {
        this.hide();
      }
    }
  }, {
    key: "onNodeUnselect",
    value: function onNodeUnselect(node) {
      this.props.onNodeUnselect && this.props.onNodeUnselect(node);
    }
  }, {
    key: "onNodeToggle",
    value: function onNodeToggle(e) {
      this.setState({
        expandedKeys: e.value
      });
    }
  }, {
    key: "onFilterValueChange",
    value: function onFilterValueChange(e) {
      this.setState({
        filterValue: e.target.value
      });
    }
  }, {
    key: "onOverlayClick",
    value: function onOverlayClick(event) {
      _OverlayEventBus.default.emit('overlay-click', {
        originalEvent: event,
        target: this.container
      });
    }
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          if (!this.state.overlayVisible && event.altKey) {
            this.show();
          }

          break;
        //space

        case 32:
          if (!this.state.overlayVisible) {
            this.show();
            event.preventDefault();
          }

          break;
        //enter and escape

        case 13:
        case 27:
          if (this.state.overlayVisible) {
            this.hide();
            event.preventDefault();
          }

          break;
        //tab

        case 9:
          this.hide();
          break;

        default:
          break;
      }
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
      this.setState({
        filterValue: event.target.value
      });
    }
  }, {
    key: "resetFilter",
    value: function resetFilter() {
      this.setState({
        filterValue: ''
      });
    }
  }, {
    key: "onOverlayEnter",
    value: function onOverlayEnter() {
      _ZIndexUtils.ZIndexUtils.set('overlay', this.overlayRef.current);

      this.alignOverlay();
      this.scrollInView();
    }
  }, {
    key: "onOverlayEntered",
    value: function onOverlayEntered() {
      this.bindDocumentClickListener();
      this.bindScrollListener();
      this.bindResizeListener();

      if (this.props.filter && this.props.filterInputAutoFocus) {
        this.filterInput.focus();
      }

      this.props.onShow && this.props.onShow();
    }
  }, {
    key: "onOverlayExit",
    value: function onOverlayExit() {
      this.unbindDocumentClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
    }
  }, {
    key: "onOverlayExited",
    value: function onOverlayExited() {
      if (this.props.filter && this.props.resetFilterOnHide) {
        this.resetFilter();
      }

      _ZIndexUtils.ZIndexUtils.clear(this.overlayRef.current);

      this.props.onHide && this.props.onHide();
    }
  }, {
    key: "alignOverlay",
    value: function alignOverlay() {
      _DomHandler.default.alignOverlay(this.overlayRef.current, this.trigger.parentElement, this.props.appendTo || _PrimeReact.default.appendTo);
    }
  }, {
    key: "scrollInView",
    value: function scrollInView() {
      var highlightItem = _DomHandler.default.findSingle(this.overlayRef.current, '.p-treenode-content.p-highlight');

      if (highlightItem) {
        highlightItem.scrollIntoView({
          block: 'nearest',
          inline: 'start'
        });
      }
    }
  }, {
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this2 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this2.state.overlayVisible && _this2.isOutsideClicked(event)) {
            _this2.hide();
          }
        };

        document.addEventListener('click', this.documentClickListener);
      }
    }
  }, {
    key: "unbindDocumentClickListener",
    value: function unbindDocumentClickListener() {
      if (this.documentClickListener) {
        document.removeEventListener('click', this.documentClickListener);
        this.documentClickListener = null;
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this3 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.container, function () {
          if (_this3.state.overlayVisible) {
            _this3.hide();
          }
        });
      }

      this.scrollHandler.bindScrollListener();
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    }
  }, {
    key: "bindResizeListener",
    value: function bindResizeListener() {
      var _this4 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this4.state.overlayVisible && !_DomHandler.default.isAndroid()) {
            _this4.hide();
          }
        };

        window.addEventListener('resize', this.resizeListener);
      }
    }
  }, {
    key: "unbindResizeListener",
    value: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(event) {
      return this.container && !(this.container.isSameNode(event.target) || this.container.contains(event.target) || this.overlayRef && this.overlayRef.current.contains(event.target));
    }
  }, {
    key: "findSelectedNodes",
    value: function findSelectedNodes(node, keys, selectedNodes) {
      if (node) {
        if (this.isSelected(node, keys)) {
          selectedNodes.push(node);
          delete keys[node.key];
        }

        if (Object.keys(keys).length && node.children) {
          var _iterator = _createForOfIteratorHelper(node.children),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var childNode = _step.value;
              this.findSelectedNodes(childNode, keys, selectedNodes);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      } else {
        var _iterator2 = _createForOfIteratorHelper(this.props.options),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _childNode = _step2.value;
            this.findSelectedNodes(_childNode, keys, selectedNodes);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }, {
    key: "isSelected",
    value: function isSelected(node, keys) {
      return this.props.selectionMode === 'checkbox' ? keys[node.key] && keys[node.key].checked : keys[node.key];
    }
  }, {
    key: "updateTreeState",
    value: function updateTreeState() {
      var keys = this.props.selectionMode === 'single' ? _defineProperty({}, "".concat(this.props.value), true) : _objectSpread({}, this.props.value);
      this.setState({
        expandedKeys: {}
      });

      if (keys && this.props.options) {
        this.updateTreeBranchState(null, null, keys);
      }
    }
  }, {
    key: "updateTreeBranchState",
    value: function updateTreeBranchState(node, path, keys) {
      if (node) {
        if (this.isSelected(node, keys)) {
          this.expandPath(path);
          delete keys[node.key];
        }

        if (Object.keys(keys).length && node.children) {
          var _iterator3 = _createForOfIteratorHelper(node.children),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var childNode = _step3.value;
              path.push(node.key);
              this.updateTreeBranchState(childNode, path, keys);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } else {
        var _iterator4 = _createForOfIteratorHelper(this.props.options),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _childNode2 = _step4.value;
            this.updateTreeBranchState(_childNode2, [], keys);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    }
  }, {
    key: "expandPath",
    value: function expandPath(path) {
      if (path.length > 0) {
        var expandedKeys = _objectSpread({}, this.state.expandedKeys || {});

        var _iterator5 = _createForOfIteratorHelper(path),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var key = _step5.value;
            expandedKeys[key] = true;
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        this.setState({
          expandedKeys: expandedKeys
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateTreeState();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.overlayVisible) {
        if (this.props.filter || prevState.expandedKeys !== this.state.expandedKeys) {
          this.alignOverlay();
        }

        if (prevProps.value !== this.props.value) {
          if (!this.selfChange) {
            this.updateTreeState();
          }

          this.scrollInView();
          this.selfChange = false;
        }
      }

      if (prevProps.options !== this.props.options) {
        this.updateTreeState();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindDocumentClickListener();
      this.unbindResizeListener();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }

      _ZIndexUtils.ZIndexUtils.clear(this.overlayRef.current);
    }
  }, {
    key: "renderKeyboardHelper",
    value: function renderKeyboardHelper() {
      var _this5 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/_react.default.createElement("input", {
        ref: function ref(el) {
          return _this5.focusInput = el;
        },
        role: "listbox",
        id: this.props.inputId,
        type: "text",
        readOnly: true,
        "aria-haspopup": "true",
        "aria-expanded": this.state.overlayVisible,
        onFocus: this.onInputFocus,
        onBlur: this.onInputBlur,
        onKeyDown: this.onInputKeyDown,
        disabled: this.props.disabled,
        tabIndex: this.props.tabIndex,
        "aria-label": this.props.ariaLabel,
        "aria-labelledby": this.props.ariaLabelledBy
      }));
    }
  }, {
    key: "renderLabel",
    value: function renderLabel(selectedNodes) {
      var isValueEmpty = this.isValueEmpty();
      var labelClassName = (0, _ClassNames.classNames)('p-treeselect-label', {
        'p-placeholder': this.getLabel() === this.props.placeholder,
        'p-treeselect-label-empty': !this.props.placeholder && isValueEmpty
      });
      var content = null;

      if (this.props.valueTemplate) {
        content = _ObjectUtils.default.getJSXElement(this.props.valueTemplate, selectedNodes, this.props);
      } else {
        if (this.props.display === 'comma') {
          content = this.getLabel() || 'empty';
        } else if (this.props.display === 'chip') {
          var _selectedNodes = this.getSelectedNodes();

          content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _selectedNodes && _selectedNodes.map(function (node, index) {
            return /*#__PURE__*/_react.default.createElement("div", {
              className: "p-treeselect-token",
              key: "".concat(node.key, "_").concat(index)
            }, /*#__PURE__*/_react.default.createElement("span", {
              className: "p-treeselect-token-label"
            }, node.label));
          }), isValueEmpty && (this.props.placeholder || 'empty'));
        }
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treeselect-label-container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: labelClassName
      }, content));
    }
  }, {
    key: "renderDropdownIcon",
    value: function renderDropdownIcon() {
      var _this6 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this6.trigger = el;
        },
        className: "p-treeselect-trigger",
        role: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": this.state.overlayVisible
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-treeselect-trigger-icon pi pi-chevron-down p-clickable"
      }));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Tree.Tree, {
        value: this.props.options,
        selectionMode: this.props.selectionMode,
        selectionKeys: this.props.value,
        metaKeySelection: this.props.metaKeySelection,
        onSelectionChange: this.onSelectionChange,
        onSelect: this.onNodeSelect,
        onUnselect: this.onNodeUnselect,
        expandedKeys: this.state.expandedKeys,
        onToggle: this.onNodeToggle,
        onExpand: this.props.onNodeExpand,
        onCollapse: this.props.onNodeCollapse,
        filter: this.props.filter,
        filterValue: this.state.filterValue,
        filterBy: this.props.filterBy,
        filterMode: this.props.filterMode,
        filterPlaceholder: this.props.filterPlaceholder,
        filterLocale: this.props.filterLocale,
        showHeader: false,
        onFilterValueChange: this.onFilterValueChange
      }), this.hasNoOptions() && /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treeselect-empty-message"
      }, this.props.emptyMessage));
    }
  }, {
    key: "renderFilterElement",
    value: function renderFilterElement() {
      var _this7 = this;

      if (this.props.filter) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-treeselect-filter-container"
        }, /*#__PURE__*/_react.default.createElement("input", {
          ref: function ref(el) {
            return _this7.filterInput = el;
          },
          type: "text",
          value: this.state.filterValue,
          autoComplete: "off",
          className: "p-treeselect-filter p-inputtext p-component",
          placeholder: this.props.filterPlaceholder,
          onKeyDown: this.onFilterInputKeyDown,
          onChange: this.onFilterInputChange,
          disabled: this.props.disabled
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "p-treeselect-filter-icon pi pi-search"
        }));
      }

      return null;
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var filterElement = this.renderFilterElement();

      var closeElement = /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "p-treeselect-close p-link",
        onClick: this.hide
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-treeselect-close-icon pi pi-times"
      }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));

      var content = /*#__PURE__*/_react.default.createElement("div", {
        className: "p-treeselect-header"
      }, filterElement, closeElement);

      if (this.props.header) {
        var defaultOptions = {
          className: 'p-treeselect-header',
          filterElement: filterElement,
          closeElement: closeElement,
          closeElementClassName: 'p-treeselect-close p-link',
          closeIconClassName: 'p-treeselect-close-icon pi pi-times',
          onCloseClick: this.hide,
          element: content,
          props: this.props
        };
        return _ObjectUtils.default.getJSXElement(this.props.header, defaultOptions);
      }

      return content;
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var className = (0, _ClassNames.classNames)('p-treeselect p-component p-inputwrapper', {
        'p-treeselect-chip': this.props.display === 'chip',
        'p-disabled': this.props.disabled,
        'p-focus': this.state.focused,
        'p-inputwrapper-filled': !this.isValueEmpty(),
        'p-inputwrapper-focus': this.state.focused || this.state.overlayVisible
      }, this.props.className);
      var selectedNodes = this.getSelectedNodes();
      var keyboardHelper = this.renderKeyboardHelper();
      var labelElement = this.renderLabel(selectedNodes);
      var dropdownIcon = this.renderDropdownIcon();
      var content = this.renderContent();
      var header = this.renderHeader();

      var footer = _ObjectUtils.default.getJSXElement(this.props.footer, this.props);

      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        ref: function ref(el) {
          return _this8.container = el;
        },
        className: className,
        style: this.props.style,
        onClick: this.onClick
      }, keyboardHelper, labelElement, dropdownIcon, /*#__PURE__*/_react.default.createElement(_TreeSelectPanel.TreeSelectPanel, {
        ref: this.overlayRef,
        appendTo: this.props.appendTo,
        panelStyle: this.props.panelStyle,
        panelClassName: this.props.panelClassName,
        scrollHeight: this.props.scrollHeight,
        onClick: this.onOverlayClick,
        header: header,
        footer: footer,
        transitionOptions: this.props.transitionOptions,
        in: this.state.overlayVisible,
        onEnter: this.onOverlayEnter,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      }, content));
    }
  }]);

  return TreeSelect;
}(_react.Component);

exports.TreeSelect = TreeSelect;

_defineProperty(TreeSelect, "defaultProps", {
  id: null,
  value: null,
  name: null,
  style: null,
  className: null,
  disabled: false,
  options: null,
  scrollHeight: '400px',
  placeholder: null,
  tabIndex: null,
  inputId: null,
  ariaLabel: null,
  ariaLabelledBy: null,
  selectionMode: 'single',
  panelStyle: null,
  panelClassName: null,
  appendTo: null,
  emptyMessage: null,
  display: 'comma',
  metaKeySelection: true,
  valueTemplate: null,
  panelHeaderTemplate: null,
  panelFooterTemplate: null,
  transitionOptions: null,
  filter: false,
  filterBy: 'label',
  filterMode: 'lenient',
  filterPlaceholder: null,
  filterLocale: undefined,
  filterInputAutoFocus: true,
  resetFilterOnHide: false,
  onShow: null,
  onHide: null,
  onChange: null,
  onNodeSelect: null,
  onNodeUnselect: null,
  onNodeExpand: null,
  onNodeCollapse: null
});

_defineProperty(TreeSelect, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.any,
  name: _propTypes.default.string,
  style: _propTypes.default.object,
  classNames: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  options: _propTypes.default.any,
  scrollHeight: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  inputId: _propTypes.default.string,
  ariaLabel: _propTypes.default.string,
  ariaLabelledBy: _propTypes.default.string,
  selectionMode: _propTypes.default.string,
  panelStyle: _propTypes.default.bool,
  panelClassName: _propTypes.default.string,
  appendTo: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  emptyMessage: _propTypes.default.string,
  display: _propTypes.default.string,
  metaKeySelection: _propTypes.default.bool,
  valueTemplate: _propTypes.default.any,
  panelHeaderTemplate: _propTypes.default.any,
  panelFooterTemplate: _propTypes.default.any,
  transitionOptions: _propTypes.default.object,
  filter: _propTypes.default.bool,
  filterBy: _propTypes.default.any,
  filterMode: _propTypes.default.string,
  filterPlaceholder: _propTypes.default.string,
  filterLocale: _propTypes.default.string,
  filterInputAutoFocus: _propTypes.default.bool,
  resetFilterOnHide: _propTypes.default.bool,
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onNodeSelect: _propTypes.default.func,
  onNodeUnselect: _propTypes.default.func,
  onNodeExpand: _propTypes.default.func,
  onNodeCollapse: _propTypes.default.func
});