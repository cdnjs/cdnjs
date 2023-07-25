this.primevue = this.primevue || {};
this.primevue.sidebar = (function (FocusTrap, TimesIcon, Portal, Ripple, utils, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
    var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-sidebar-mask {\n    display: none;\n    pointer-events: none;\n    background-color: transparent;\n    transition-property: background-color;\n}\n\n.p-sidebar-mask.p-component-overlay {\n    pointer-events: auto;\n}\n\n.p-sidebar-visible {\n    display: flex;\n}\n\n.p-sidebar {\n    display: flex;\n    flex-direction: column;\n    pointer-events: auto;\n    transform: translate3d(0px, 0px, 0px);\n    position: relative;\n    transition: transform 0.3s;\n}\n\n.p-sidebar-content {\n    overflow-y: auto;\n    flex-grow: 1;\n}\n\n.p-sidebar-header {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    flex-shrink: 0;\n}\n\n.p-sidebar-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-sidebar-full .p-sidebar {\n    transition: none;\n    transform: none;\n    width: 100vw !important;\n    height: 100vh !important;\n    max-height: 100%;\n    top: 0px !important;\n    left: 0px !important;\n}\n\n/* Animation */\n/* Center */\n.p-sidebar-left .p-sidebar-enter-from,\n.p-sidebar-left .p-sidebar-leave-to {\n    transform: translateX(-100%);\n}\n.p-sidebar-right .p-sidebar-enter-from,\n.p-sidebar-right .p-sidebar-leave-to {\n    transform: translateX(100%);\n}\n.p-sidebar-top .p-sidebar-enter-from,\n.p-sidebar-top .p-sidebar-leave-to {\n    transform: translateY(-100%);\n}\n.p-sidebar-bottom .p-sidebar-enter-from,\n.p-sidebar-bottom .p-sidebar-leave-to {\n    transform: translateY(100%);\n}\n.p-sidebar-full .p-sidebar-enter-from,\n.p-sidebar-full .p-sidebar-leave-to {\n    opacity: 0;\n}\n.p-sidebar-full .p-sidebar-enter-active,\n.p-sidebar-full .p-sidebar-leave-active {\n    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n\n/* Size */\n.p-sidebar-left .p-sidebar {\n    width: 20rem;\n    height: 100%;\n}\n\n.p-sidebar-right .p-sidebar {\n    width: 20rem;\n    height: 100%;\n}\n\n.p-sidebar-top .p-sidebar {\n    height: 10rem;\n    width: 100%;\n}\n\n.p-sidebar-bottom .p-sidebar {\n    height: 10rem;\n    width: 100%;\n}\n\n.p-sidebar-left .p-sidebar-sm,\n.p-sidebar-right .p-sidebar-sm {\n    width: 20rem;\n}\n\n.p-sidebar-left .p-sidebar-md,\n.p-sidebar-right .p-sidebar-md {\n    width: 40rem;\n}\n\n.p-sidebar-left .p-sidebar-lg,\n.p-sidebar-right .p-sidebar-lg {\n    width: 60rem;\n}\n\n.p-sidebar-top .p-sidebar-sm,\n.p-sidebar-bottom .p-sidebar-sm {\n    height: 10rem;\n}\n\n.p-sidebar-top .p-sidebar-md,\n.p-sidebar-bottom .p-sidebar-md {\n    height: 20rem;\n}\n\n.p-sidebar-top .p-sidebar-lg,\n.p-sidebar-bottom .p-sidebar-lg {\n    height: 30rem;\n}\n\n.p-sidebar-left .p-sidebar-content,\n.p-sidebar-right .p-sidebar-content,\n.p-sidebar-top .p-sidebar-content,\n.p-sidebar-bottom .p-sidebar-content {\n    width: 100%;\n    height: 100%;\n}\n\n@media screen and (max-width: 64em) {\n    .p-sidebar-left .p-sidebar-lg,\n    .p-sidebar-left .p-sidebar-md,\n    .p-sidebar-right .p-sidebar-lg,\n    .p-sidebar-right .p-sidebar-md {\n        width: 20rem;\n    }\n}\n";

    /* Position */
    var inlineStyles = {
      mask: function mask(_ref) {
        var position = _ref.position;
        return {
          position: 'fixed',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          display: 'flex',
          justifyContent: position === 'left' ? 'flex-start' : position === 'right' ? 'flex-end' : 'center',
          alignItems: position === 'top' ? 'flex-start' : position === 'bottom' ? 'flex-end' : 'center'
        };
      }
    };
    var classes = {
      mask: function mask(_ref2) {
        var instance = _ref2.instance,
          props = _ref2.props;
        var positions = ['left', 'right', 'top', 'bottom'];
        var pos = positions.find(function (item) {
          return item === props.position;
        });
        return ['p-sidebar-mask', {
          'p-component-overlay p-component-overlay-enter': props.modal,
          'p-sidebar-mask-scrollblocker': props.blockScroll,
          'p-sidebar-visible': instance.containerVisible,
          'p-sidebar-full': instance.fullScreen
        }, pos ? "p-sidebar-".concat(pos) : ''];
      },
      root: function root(_ref3) {
        var instance = _ref3.instance;
        return ['p-sidebar p-component', {
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false,
          'p-sidebar-full': instance.fullScreen
        }];
      },
      header: 'p-sidebar-header',
      headerContent: 'p-sidebar-header-content',
      closeButton: 'p-sidebar-close p-sidebar-icon p-link',
      closeIcon: 'p-sidebar-close-icon',
      content: 'p-sidebar-content'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'sidebar',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseSidebar',
      "extends": BaseComponent__default["default"],
      props: {
        visible: {
          type: Boolean,
          "default": false
        },
        position: {
          type: String,
          "default": 'left'
        },
        baseZIndex: {
          type: Number,
          "default": 0
        },
        autoZIndex: {
          type: Boolean,
          "default": true
        },
        dismissable: {
          type: Boolean,
          "default": true
        },
        showCloseIcon: {
          type: Boolean,
          "default": true
        },
        closeIcon: {
          type: String,
          "default": undefined
        },
        modal: {
          type: Boolean,
          "default": true
        },
        blockScroll: {
          type: Boolean,
          "default": false
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

    var script = {
      name: 'Sidebar',
      "extends": script$1,
      inheritAttrs: false,
      emits: ['update:visible', 'show', 'hide', 'after-hide'],
      data: function data() {
        return {
          containerVisible: this.visible
        };
      },
      container: null,
      mask: null,
      content: null,
      headerContainer: null,
      closeButton: null,
      outsideClickListener: null,
      updated: function updated() {
        if (this.visible) {
          this.containerVisible = this.visible;
        }
      },
      beforeUnmount: function beforeUnmount() {
        this.disableDocumentSettings();
        if (this.mask && this.autoZIndex) {
          utils.ZIndexUtils.clear(this.mask);
        }
        this.container = null;
        this.mask = null;
      },
      methods: {
        hide: function hide() {
          this.$emit('update:visible', false);
        },
        onEnter: function onEnter() {
          this.$emit('show');
          this.focus();
          if (this.autoZIndex) {
            utils.ZIndexUtils.set('modal', this.mask, this.baseZIndex || this.$primevue.config.zIndex.modal);
          }
        },
        onAfterEnter: function onAfterEnter() {
          this.enableDocumentSettings();
        },
        onBeforeLeave: function onBeforeLeave() {
          if (this.modal) {
            !this.isUnstyled && utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
          }
        },
        onLeave: function onLeave() {
          this.$emit('hide');
        },
        onAfterLeave: function onAfterLeave() {
          if (this.autoZIndex) {
            utils.ZIndexUtils.clear(this.mask);
          }
          this.containerVisible = false;
          this.disableDocumentSettings();
          this.$emit('after-hide');
        },
        onMaskClick: function onMaskClick(event) {
          if (this.dismissable && this.modal && this.mask === event.target) {
            this.hide();
          }
        },
        focus: function focus() {
          var findFocusableElement = function findFocusableElement(container) {
            return container.querySelector('[autofocus]');
          };
          var focusTarget = this.$slots["default"] && findFocusableElement(this.content);
          if (!focusTarget) {
            focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);
            if (!focusTarget) {
              focusTarget = findFocusableElement(this.container);
            }
          }
          focusTarget && focusTarget.focus();
        },
        enableDocumentSettings: function enableDocumentSettings() {
          if (this.dismissable && !this.modal) {
            this.bindOutsideClickListener();
          }
          if (this.blockScroll) {
            utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
          }
        },
        disableDocumentSettings: function disableDocumentSettings() {
          this.unbindOutsideClickListener();
          if (this.blockScroll) {
            utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
          }
        },
        onKeydown: function onKeydown(event) {
          if (event.code === 'Escape') {
            this.hide();
          }
        },
        containerRef: function containerRef(el) {
          this.container = el;
        },
        maskRef: function maskRef(el) {
          this.mask = el;
        },
        contentRef: function contentRef(el) {
          this.content = el;
        },
        headerContainerRef: function headerContainerRef(el) {
          this.headerContainer = el;
        },
        closeButtonRef: function closeButtonRef(el) {
          this.closeButton = el;
        },
        bindOutsideClickListener: function bindOutsideClickListener() {
          var _this = this;
          if (!this.outsideClickListener) {
            this.outsideClickListener = function (event) {
              if (_this.isOutsideClicked(event)) {
                _this.hide();
              }
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
        isOutsideClicked: function isOutsideClicked(event) {
          return this.container && !this.container.contains(event.target);
        }
      },
      computed: {
        fullScreen: function fullScreen() {
          return this.position === 'full';
        },
        closeAriaLabel: function closeAriaLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
        }
      },
      directives: {
        focustrap: FocusTrap__default["default"],
        ripple: Ripple__default["default"]
      },
      components: {
        Portal: Portal__default["default"],
        TimesIcon: TimesIcon__default["default"]
      }
    };

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var _hoisted_1 = ["aria-modal"];
    var _hoisted_2 = ["aria-label"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_Portal = vue.resolveComponent("Portal");
      var _directive_ripple = vue.resolveDirective("ripple");
      var _directive_focustrap = vue.resolveDirective("focustrap");
      return vue.openBlock(), vue.createBlock(_component_Portal, null, {
        "default": vue.withCtx(function () {
          return [$data.containerVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.maskRef,
            onMousedown: _cache[2] || (_cache[2] = function () {
              return $options.onMaskClick && $options.onMaskClick.apply($options, arguments);
            }),
            "class": _ctx.cx('mask'),
            style: _ctx.sx('mask', true, {
              position: _ctx.position
            })
          }, _ctx.ptm('mask')), [vue.createVNode(vue.Transition, {
            name: "p-sidebar",
            onEnter: $options.onEnter,
            onAfterEnter: $options.onAfterEnter,
            onBeforeLeave: $options.onBeforeLeave,
            onLeave: $options.onLeave,
            onAfterLeave: $options.onAfterLeave,
            appear: ""
          }, {
            "default": vue.withCtx(function () {
              return [_ctx.visible ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.containerRef,
                "class": _ctx.cx('root'),
                role: "complementary",
                "aria-modal": _ctx.modal,
                onKeydown: _cache[1] || (_cache[1] = function () {
                  return $options.onKeydown && $options.onKeydown.apply($options, arguments);
                })
              }, _objectSpread(_objectSpread({}, _ctx.$attrs), _ctx.ptm('root'))), [vue.createElementVNode("div", vue.mergeProps({
                ref: $options.headerContainerRef,
                "class": _ctx.cx('header')
              }, _ctx.ptm('header')), [_ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                "class": _ctx.cx('headerContent')
              }, _ctx.ptm('headerContent')), [vue.renderSlot(_ctx.$slots, "header")], 16)) : vue.createCommentVNode("", true), _ctx.showCloseIcon ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                key: 1,
                ref: $options.closeButtonRef,
                autofocus: "",
                type: "button",
                "class": _ctx.cx('closeButton'),
                "aria-label": $options.closeAriaLabel,
                onClick: _cache[0] || (_cache[0] = function () {
                  return $options.hide && $options.hide.apply($options, arguments);
                })
              }, _ctx.ptm('closeButton'), {
                "data-pc-group-section": "iconcontainer"
              }), [vue.renderSlot(_ctx.$slots, "closeicon", {}, function () {
                return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.closeIcon ? 'span' : 'TimesIcon'), vue.mergeProps({
                  "class": [_ctx.cx('closeIcon'), _ctx.closeIcon]
                }, _ctx.ptm('closeIcon')), null, 16, ["class"]))];
              })], 16, _hoisted_2)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 16), vue.createElementVNode("div", vue.mergeProps({
                ref: $options.contentRef,
                "class": _ctx.cx('content')
              }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "default")], 16)], 16, _hoisted_1)), [[_directive_focustrap]]) : vue.createCommentVNode("", true)];
            }),
            _: 3
          }, 8, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])], 16)) : vue.createCommentVNode("", true)];
        }),
        _: 3
      });
    }

    script.render = render;

    return script;

})(primevue.focustrap, primevue.icons.times, primevue.portal, primevue.ripple, primevue.utils, primevue.basecomponent, primevue.usestyle, Vue);
