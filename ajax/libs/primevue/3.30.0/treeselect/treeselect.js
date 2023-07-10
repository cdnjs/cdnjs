this.primevue = this.primevue || {};
this.primevue.treeselect = (function (ChevronDownIcon, OverlayEventBus, Portal, Ripple, Tree, utils, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
    var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var Tree__default = /*#__PURE__*/_interopDefaultLegacy(Tree);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-treeselect {\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n}\n\n.p-treeselect-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n}\n\n.p-treeselect-label-container {\n    overflow: hidden;\n    flex: 1 1 auto;\n    cursor: pointer;\n}\n\n.p-treeselect-label {\n    display: block;\n    white-space: nowrap;\n    cursor: pointer;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.p-treeselect-label-empty {\n    overflow: hidden;\n    visibility: hidden;\n}\n\n.p-treeselect-token {\n    cursor: default;\n    display: inline-flex;\n    align-items: center;\n    flex: 0 0 auto;\n}\n\n.p-treeselect .p-treeselect-panel {\n    min-width: 100%;\n}\n\n.p-treeselect-items-wrapper {\n    overflow: auto;\n}\n\n.p-fluid .p-treeselect {\n    display: flex;\n}\n";
    var inlineStyles = {
      root: function root(_ref) {
        var props = _ref.props;
        return {
          position: props.appendTo === 'self' ? 'relative' : undefined
        };
      }
    };
    var classes = {
      root: function root(_ref2) {
        var instance = _ref2.instance,
          props = _ref2.props;
        return ['p-treeselect p-component p-inputwrapper', {
          'p-treeselect-chip': props.display === 'chip',
          'p-disabled': props.disabled,
          'p-focus': instance.focused,
          'p-inputwrapper-filled': !instance.emptyValue,
          'p-inputwrapper-focus': instance.focused || instance.overlayVisible
        }];
      },
      labelContainer: 'p-treeselect-label-container',
      label: function label(_ref3) {
        var instance = _ref3.instance,
          props = _ref3.props;
        return ['p-treeselect-label', {
          'p-placeholder': instance.label === props.placeholder,
          'p-treeselect-label-empty': !props.placeholder && instance.emptyValue
        }];
      },
      token: 'p-treeselect-token',
      tokenLabel: 'p-treeselect-token-label',
      trigger: 'p-treeselect-trigger',
      triggerIcon: 'p-treeselect-trigger-icon',
      panel: function panel(_ref4) {
        var instance = _ref4.instance;
        return ['p-treeselect-panel p-component', {
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      wrapper: 'p-treeselect-items-wrapper',
      emptyMessage: 'p-treeselect-empty-message'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'treeselect',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseTreeSelect',
      "extends": BaseComponent__default["default"],
      props: {
        modelValue: null,
        options: Array,
        scrollHeight: {
          type: String,
          "default": '400px'
        },
        placeholder: {
          type: String,
          "default": null
        },
        disabled: {
          type: Boolean,
          "default": false
        },
        tabindex: {
          type: Number,
          "default": null
        },
        selectionMode: {
          type: String,
          "default": 'single'
        },
        appendTo: {
          type: String,
          "default": 'body'
        },
        emptyMessage: {
          type: String,
          "default": null
        },
        display: {
          type: String,
          "default": 'comma'
        },
        metaKeySelection: {
          type: Boolean,
          "default": true
        },
        inputId: {
          type: String,
          "default": null
        },
        inputClass: {
          type: [String, Object],
          "default": null
        },
        inputStyle: {
          type: Object,
          "default": null
        },
        inputProps: {
          type: null,
          "default": null
        },
        panelClass: {
          type: [String, Object],
          "default": null
        },
        panelProps: {
          type: null,
          "default": null
        },
        'aria-labelledby': {
          type: String,
          "default": null
        },
        'aria-label': {
          type: String,
          "default": null
        }
      },
      css: {
        classes: classes,
        inlineStyles: inlineStyles,
        loadStyle: loadStyle
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
    function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
    function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    var script = {
      name: 'TreeSelect',
      "extends": script$1,
      emits: ['update:modelValue', 'before-show', 'before-hide', 'change', 'show', 'hide', 'node-select', 'node-unselect', 'node-expand', 'node-collapse', 'focus', 'blur'],
      data: function data() {
        return {
          focused: false,
          overlayVisible: false,
          expandedKeys: {}
        };
      },
      watch: {
        modelValue: {
          handler: function handler() {
            if (!this.selfChange) {
              this.updateTreeState();
            }
            this.selfChange = false;
          },
          immediate: true
        },
        options: function options() {
          this.updateTreeState();
        }
      },
      outsideClickListener: null,
      resizeListener: null,
      scrollHandler: null,
      overlay: null,
      selfChange: false,
      selfClick: false,
      beforeUnmount: function beforeUnmount() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        if (this.scrollHandler) {
          this.scrollHandler.destroy();
          this.scrollHandler = null;
        }
        if (this.overlay) {
          utils.ZIndexUtils.clear(this.overlay);
          this.overlay = null;
        }
      },
      mounted: function mounted() {
        this.updateTreeState();
      },
      methods: {
        show: function show() {
          this.$emit('before-show');
          this.overlayVisible = true;
        },
        hide: function hide() {
          this.$emit('before-hide');
          this.overlayVisible = false;
          this.$refs.focusInput.focus();
        },
        onFocus: function onFocus(event) {
          this.focused = true;
          this.$emit('focus', event);
        },
        onBlur: function onBlur(event) {
          this.focused = false;
          this.$emit('blur', event);
        },
        onClick: function onClick(event) {
          if (!this.disabled && (!this.overlay || !this.overlay.contains(event.target))) {
            if (this.overlayVisible) this.hide();else this.show();
            this.$refs.focusInput.focus();
          }
        },
        onSelectionChange: function onSelectionChange(keys) {
          this.selfChange = true;
          this.$emit('update:modelValue', keys);
          this.$emit('change', keys);
        },
        onNodeSelect: function onNodeSelect(node) {
          this.$emit('node-select', node);
          if (this.selectionMode === 'single') {
            this.hide();
          }
        },
        onNodeUnselect: function onNodeUnselect(node) {
          this.$emit('node-unselect', node);
        },
        onNodeToggle: function onNodeToggle(keys) {
          this.expandedKeys = keys;
        },
        onKeyDown: function onKeyDown(event) {
          switch (event.code) {
            case 'ArrowDown':
              this.onArrowDownKey(event);
              break;
            case 'Space':
            case 'Enter':
              this.onEnterKey(event);
              break;
            case 'Escape':
              this.onEscapeKey(event);
              break;
          }
        },
        onArrowDownKey: function onArrowDownKey(event) {
          var _this = this;
          if (this.overlayVisible) return;
          this.show();
          this.$nextTick(function () {
            var treeNodeEl = utils.DomHandler.find(_this.$refs.tree.$el, '[data-pc-section="treeitem"]');
            var focusedElement = _toConsumableArray(treeNodeEl).find(function (item) {
              return item.getAttribute('tabindex') === '0';
            });
            utils.DomHandler.focus(focusedElement);
          });
          event.preventDefault();
        },
        onEnterKey: function onEnterKey(event) {
          if (this.overlayVisible) {
            this.hide();
          } else {
            this.onArrowDownKey(event);
          }
          event.preventDefault();
        },
        onEscapeKey: function onEscapeKey(event) {
          if (this.overlayVisible) {
            this.hide();
            event.preventDefault();
          }
        },
        onOverlayEnter: function onOverlayEnter(el) {
          utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
          utils.DomHandler.addStyles(el, {
            position: 'absolute',
            top: '0',
            left: '0'
          });
          this.alignOverlay();
          this.bindOutsideClickListener();
          this.bindScrollListener();
          this.bindResizeListener();
          this.scrollValueInView();
          this.$emit('show');
        },
        onOverlayLeave: function onOverlayLeave() {
          this.unbindOutsideClickListener();
          this.unbindScrollListener();
          this.unbindResizeListener();
          this.$emit('hide');
          this.overlay = null;
        },
        onOverlayAfterLeave: function onOverlayAfterLeave(el) {
          utils.ZIndexUtils.clear(el);
        },
        alignOverlay: function alignOverlay() {
          if (this.appendTo === 'self') {
            utils.DomHandler.relativePosition(this.overlay, this.$el);
          } else {
            this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(this.$el) + 'px';
            utils.DomHandler.absolutePosition(this.overlay, this.$el);
          }
        },
        bindOutsideClickListener: function bindOutsideClickListener() {
          var _this2 = this;
          if (!this.outsideClickListener) {
            this.outsideClickListener = function (event) {
              if (_this2.overlayVisible && !_this2.selfClick && _this2.isOutsideClicked(event)) {
                _this2.hide();
              }
              _this2.selfClick = false;
            };
            document.addEventListener('click', this.outsideClickListener);
          }
        },
        unbindOutsideClickListener: function unbindOutsideClickListener() {
          if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
          }
        },
        bindScrollListener: function bindScrollListener() {
          var _this3 = this;
          if (!this.scrollHandler) {
            this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, function () {
              if (_this3.overlayVisible) {
                _this3.hide();
              }
            });
          }
          this.scrollHandler.bindScrollListener();
        },
        unbindScrollListener: function unbindScrollListener() {
          if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
          }
        },
        bindResizeListener: function bindResizeListener() {
          var _this4 = this;
          if (!this.resizeListener) {
            this.resizeListener = function () {
              if (_this4.overlayVisible && !utils.DomHandler.isTouchDevice()) {
                _this4.hide();
              }
            };
            window.addEventListener('resize', this.resizeListener);
          }
        },
        unbindResizeListener: function unbindResizeListener() {
          if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
          }
        },
        isOutsideClicked: function isOutsideClicked(event) {
          return !(this.$el.isSameNode(event.target) || this.$el.contains(event.target) || this.overlay && this.overlay.contains(event.target));
        },
        overlayRef: function overlayRef(el) {
          this.overlay = el;
        },
        onOverlayClick: function onOverlayClick(event) {
          OverlayEventBus__default["default"].emit('overlay-click', {
            originalEvent: event,
            target: this.$el
          });
          this.selfClick = true;
        },
        onOverlayKeydown: function onOverlayKeydown(event) {
          if (event.code === 'Escape') this.hide();
        },
        findSelectedNodes: function findSelectedNodes(node, keys, selectedNodes) {
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
            var _iterator2 = _createForOfIteratorHelper(this.options),
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
        },
        isSelected: function isSelected(node, keys) {
          return this.selectionMode === 'checkbox' ? keys[node.key] && keys[node.key].checked : keys[node.key];
        },
        updateTreeState: function updateTreeState() {
          var keys = _objectSpread$1({}, this.modelValue);
          this.expandedKeys = {};
          if (keys && this.options) {
            this.updateTreeBranchState(null, null, keys);
          }
        },
        updateTreeBranchState: function updateTreeBranchState(node, path, keys) {
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
            var _iterator4 = _createForOfIteratorHelper(this.options),
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
        },
        expandPath: function expandPath(path) {
          if (path.length > 0) {
            var _iterator5 = _createForOfIteratorHelper(path),
              _step5;
            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var key = _step5.value;
                this.expandedKeys[key] = true;
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }
        },
        scrollValueInView: function scrollValueInView() {
          if (this.overlay) {
            var selectedItem = utils.DomHandler.findSingle(this.overlay, '[data-p-highlight="true"]');
            if (selectedItem) {
              selectedItem.scrollIntoView({
                block: 'nearest',
                inline: 'start'
              });
            }
          }
        }
      },
      computed: {
        selectedNodes: function selectedNodes() {
          var selectedNodes = [];
          if (this.modelValue && this.options) {
            var keys = _objectSpread$1({}, this.modelValue);
            this.findSelectedNodes(null, keys, selectedNodes);
          }
          return selectedNodes;
        },
        label: function label() {
          var value = this.selectedNodes;
          return value.length ? value.map(function (node) {
            return node.label;
          }).join(', ') : this.placeholder;
        },
        emptyMessageText: function emptyMessageText() {
          return this.emptyMessage || this.$primevue.config.locale.emptyMessage;
        },
        emptyValue: function emptyValue() {
          return !this.modelValue || Object.keys(this.modelValue).length === 0;
        },
        emptyOptions: function emptyOptions() {
          return !this.options || this.options.length === 0;
        },
        listId: function listId() {
          return utils.UniqueComponentId() + '_list';
        }
      },
      components: {
        TSTree: Tree__default["default"],
        Portal: Portal__default["default"],
        ChevronDownIcon: ChevronDownIcon__default["default"]
      },
      directives: {
        ripple: Ripple__default["default"]
      }
    };

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var _hoisted_1 = ["id", "disabled", "tabindex", "aria-labelledby", "aria-label", "aria-expanded", "aria-controls"];
    var _hoisted_2 = ["aria-expanded"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_TSTree = vue.resolveComponent("TSTree");
      var _component_Portal = vue.resolveComponent("Portal");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        ref: "container",
        "class": _ctx.cx('root'),
        style: _ctx.sx('root'),
        onClick: _cache[7] || (_cache[7] = function () {
          return $options.onClick && $options.onClick.apply($options, arguments);
        })
      }, _ctx.ptm('root'), {
        "data-pc-name": "treeselect"
      }), [vue.createElementVNode("div", vue.mergeProps({
        "class": "p-hidden-accessible"
      }, _ctx.ptm('hiddenInputWrapper'), {
        "data-p-hidden-accessible": true
      }), [vue.createElementVNode("input", vue.mergeProps({
        ref: "focusInput",
        id: _ctx.inputId,
        type: "text",
        role: "combobox",
        "class": _ctx.inputClass,
        style: _ctx.inputStyle,
        readonly: "",
        disabled: _ctx.disabled,
        tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        "aria-haspopup": "tree",
        "aria-expanded": $data.overlayVisible,
        "aria-controls": $options.listId,
        onFocus: _cache[0] || (_cache[0] = function ($event) {
          return $options.onFocus($event);
        }),
        onBlur: _cache[1] || (_cache[1] = function ($event) {
          return $options.onBlur($event);
        }),
        onKeydown: _cache[2] || (_cache[2] = function ($event) {
          return $options.onKeyDown($event);
        })
      }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('hiddenInput'))), null, 16, _hoisted_1)], 16), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('labelContainer')
      }, _ctx.ptm('labelContainer')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('label')
      }, _ctx.ptm('label')), [vue.renderSlot(_ctx.$slots, "value", {
        value: $options.selectedNodes,
        placeholder: _ctx.placeholder
      }, function () {
        return [_ctx.display === 'comma' ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: 0
        }, [vue.createTextVNode(vue.toDisplayString($options.label || 'empty'), 1)], 64)) : _ctx.display === 'chip' ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: 1
        }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.selectedNodes, function (node) {
          return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: node.key,
            "class": _ctx.cx('token')
          }, _ctx.ptm('token')), [vue.createElementVNode("span", vue.mergeProps({
            "class": _ctx.cx('tokenLabel')
          }, _ctx.ptm('tokenLabel')), vue.toDisplayString(node.label), 17)], 16);
        }), 128)), $options.emptyValue ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: 0
        }, [vue.createTextVNode(vue.toDisplayString(_ctx.placeholder || 'empty'), 1)], 64)) : vue.createCommentVNode("", true)], 64)) : vue.createCommentVNode("", true)];
      })], 16)], 16), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('trigger'),
        role: "button",
        "aria-haspopup": "tree",
        "aria-expanded": $data.overlayVisible
      }, _ctx.ptm('trigger')), [vue.renderSlot(_ctx.$slots, "triggericon", {
        "class": vue.normalizeClass(_ctx.cx('triggerIcon'))
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent('ChevronDownIcon'), vue.mergeProps({
          "class": _ctx.cx('triggerIcon')
        }, _ctx.ptm('triggerIcon')), null, 16, ["class"]))];
      })], 16, _hoisted_2), vue.createVNode(_component_Portal, {
        appendTo: _ctx.appendTo
      }, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(vue.Transition, {
            name: "p-connected-overlay",
            onEnter: $options.onOverlayEnter,
            onLeave: $options.onOverlayLeave,
            onAfterLeave: $options.onOverlayAfterLeave
          }, {
            "default": vue.withCtx(function () {
              return [$data.overlayVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.overlayRef,
                onClick: _cache[5] || (_cache[5] = function () {
                  return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
                }),
                "class": [_ctx.cx('panel'), _ctx.panelClass],
                onKeydown: _cache[6] || (_cache[6] = function () {
                  return $options.onOverlayKeydown && $options.onOverlayKeydown.apply($options, arguments);
                })
              }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm('panel'))), [vue.renderSlot(_ctx.$slots, "header", {
                value: _ctx.modelValue,
                options: _ctx.options
              }), vue.createElementVNode("div", vue.mergeProps({
                "class": _ctx.cx('panel'),
                style: {
                  'max-height': _ctx.scrollHeight
                }
              }, _ctx.ptm('wrapper')), [vue.createVNode(_component_TSTree, {
                ref: "tree",
                id: $options.listId,
                value: _ctx.options,
                selectionMode: _ctx.selectionMode,
                "onUpdate:selectionKeys": $options.onSelectionChange,
                selectionKeys: _ctx.modelValue,
                expandedKeys: $data.expandedKeys,
                "onUpdate:expandedKeys": $options.onNodeToggle,
                metaKeySelection: _ctx.metaKeySelection,
                onNodeExpand: _cache[3] || (_cache[3] = function ($event) {
                  return _ctx.$emit('node-expand', $event);
                }),
                onNodeCollapse: _cache[4] || (_cache[4] = function ($event) {
                  return _ctx.$emit('node-collapse', $event);
                }),
                onNodeSelect: $options.onNodeSelect,
                onNodeUnselect: $options.onNodeUnselect,
                level: 0,
                unstyled: _ctx.unstyled,
                pt: _ctx.ptm('tree'),
                "data-pc-section": "tree"
              }, vue.createSlots({
                _: 2
              }, [_ctx.$slots.itemtogglericon ? {
                name: "togglericon",
                fn: vue.withCtx(function (iconProps) {
                  return [vue.renderSlot(_ctx.$slots, "itemtogglericon", {
                    node: iconProps.node,
                    expanded: iconProps.expanded,
                    "class": vue.normalizeClass(iconProps["class"])
                  })];
                }),
                key: "0"
              } : undefined, _ctx.$slots.itemcheckboxicon ? {
                name: "checkboxicon",
                fn: vue.withCtx(function (iconProps) {
                  return [vue.renderSlot(_ctx.$slots, "itemcheckboxicon", {
                    checked: iconProps.checked,
                    partialChecked: iconProps.partialChecked,
                    "class": vue.normalizeClass(iconProps["class"])
                  })];
                }),
                key: "1"
              } : undefined]), 1032, ["id", "value", "selectionMode", "onUpdate:selectionKeys", "selectionKeys", "expandedKeys", "onUpdate:expandedKeys", "metaKeySelection", "onNodeSelect", "onNodeUnselect", "unstyled", "pt"]), $options.emptyOptions ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                "class": _ctx.cx('emptyMessage')
              }, _ctx.ptm('emptyMessage')), [vue.renderSlot(_ctx.$slots, "empty", {}, function () {
                return [vue.createTextVNode(vue.toDisplayString($options.emptyMessageText), 1)];
              })], 16)) : vue.createCommentVNode("", true)], 16), vue.renderSlot(_ctx.$slots, "footer", {
                value: _ctx.modelValue,
                options: _ctx.options
              })], 16)) : vue.createCommentVNode("", true)];
            }),
            _: 3
          }, 8, ["onEnter", "onLeave", "onAfterLeave"])];
        }),
        _: 3
      }, 8, ["appendTo"])], 16);
    }

    script.render = render;

    return script;

})(primevue.icons.chevrondown, primevue.overlayeventbus, primevue.portal, primevue.ripple, primevue.tree, primevue.utils, primevue.basecomponent, primevue.usestyle, Vue);
