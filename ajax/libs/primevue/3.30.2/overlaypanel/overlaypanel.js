this.primevue = this.primevue || {};
this.primevue.overlaypanel = (function (FocusTrap, TimesIcon, OverlayEventBus, Portal, Ripple, utils, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
    var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
    var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-overlaypanel {\n    margin-top: 10px;\n}\n\n.p-overlaypanel-flipped {\n    margin-top: 0;\n    margin-bottom: 10px;\n}\n\n.p-overlaypanel-close {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Animation */\n.p-overlaypanel-enter-from {\n    opacity: 0;\n    transform: scaleY(0.8);\n}\n\n.p-overlaypanel-leave-to {\n    opacity: 0;\n}\n\n.p-overlaypanel-enter-active {\n    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n}\n\n.p-overlaypanel-leave-active {\n    transition: opacity 0.1s linear;\n}\n\n.p-overlaypanel:after,\n.p-overlaypanel:before {\n    bottom: 100%;\n    left: calc(var(--overlayArrowLeft, 0) + 1.25rem);\n    content: ' ';\n    height: 0;\n    width: 0;\n    position: absolute;\n    pointer-events: none;\n}\n\n.p-overlaypanel:after {\n    border-width: 8px;\n    margin-left: -8px;\n}\n\n.p-overlaypanel:before {\n    border-width: 10px;\n    margin-left: -10px;\n}\n\n.p-overlaypanel-flipped:after,\n.p-overlaypanel-flipped:before {\n    bottom: auto;\n    top: 100%;\n}\n\n.p-overlaypanel.p-overlaypanel-flipped:after {\n    border-bottom-color: transparent;\n}\n\n.p-overlaypanel.p-overlaypanel-flipped:before {\n    border-bottom-color: transparent;\n}\n";
    var classes = {
      root: function root(_ref) {
        var instance = _ref.instance;
        return ['p-overlaypanel p-component', {
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      content: 'p-overlaypanel-content',
      closeButton: 'p-overlaypanel-close p-link',
      closeIcon: 'p-overlaypanel-close-icon'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'overlaypanel',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseOverlayPanel',
      "extends": BaseComponent__default["default"],
      props: {
        dismissable: {
          type: Boolean,
          "default": true
        },
        showCloseIcon: {
          type: Boolean,
          "default": false
        },
        appendTo: {
          type: String,
          "default": 'body'
        },
        baseZIndex: {
          type: Number,
          "default": 0
        },
        autoZIndex: {
          type: Boolean,
          "default": true
        },
        breakpoints: {
          type: Object,
          "default": null
        },
        closeIcon: {
          type: String,
          "default": undefined
        }
      },
      css: {
        classes: classes,
        loadStyle: loadStyle
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'OverlayPanel',
      "extends": script$1,
      inheritAttrs: false,
      emits: ['show', 'hide'],
      data: function data() {
        return {
          visible: false
        };
      },
      watch: {
        dismissable: {
          immediate: true,
          handler: function handler(newValue) {
            if (newValue) {
              this.bindOutsideClickListener();
            } else {
              this.unbindOutsideClickListener();
            }
          }
        }
      },
      selfClick: false,
      target: null,
      eventTarget: null,
      outsideClickListener: null,
      scrollHandler: null,
      resizeListener: null,
      container: null,
      styleElement: null,
      overlayEventListener: null,
      beforeUnmount: function beforeUnmount() {
        if (this.dismissable) {
          this.unbindOutsideClickListener();
        }
        if (this.scrollHandler) {
          this.scrollHandler.destroy();
          this.scrollHandler = null;
        }
        this.destroyStyle();
        this.unbindResizeListener();
        this.target = null;
        if (this.container && this.autoZIndex) {
          utils.ZIndexUtils.clear(this.container);
        }
        if (this.overlayEventListener) {
          OverlayEventBus__default["default"].off('overlay-click', this.overlayEventListener);
          this.overlayEventListener = null;
        }
        this.container = null;
      },
      mounted: function mounted() {
        if (this.breakpoints) {
          this.createStyle();
        }
      },
      methods: {
        toggle: function toggle(event, target) {
          if (this.visible) this.hide();else this.show(event, target);
        },
        show: function show(event, target) {
          this.visible = true;
          this.eventTarget = event.currentTarget;
          this.target = target || event.currentTarget;
        },
        hide: function hide() {
          this.visible = false;
        },
        onContentClick: function onContentClick() {
          this.selfClick = true;
        },
        onEnter: function onEnter(el) {
          var _this = this;
          this.container.setAttribute(this.attributeSelector, '');
          utils.DomHandler.addStyles(el, {
            position: 'absolute',
            top: '0',
            left: '0'
          });
          this.alignOverlay();
          if (this.dismissable) {
            this.bindOutsideClickListener();
          }
          this.bindScrollListener();
          this.bindResizeListener();
          if (this.autoZIndex) {
            utils.ZIndexUtils.set('overlay', el, this.baseZIndex + this.$primevue.config.zIndex.overlay);
          }
          this.overlayEventListener = function (e) {
            if (_this.container.contains(e.target)) {
              _this.selfClick = true;
            }
          };
          this.focus();
          OverlayEventBus__default["default"].on('overlay-click', this.overlayEventListener);
          this.$emit('show');
        },
        onLeave: function onLeave() {
          this.unbindOutsideClickListener();
          this.unbindScrollListener();
          this.unbindResizeListener();
          OverlayEventBus__default["default"].off('overlay-click', this.overlayEventListener);
          this.overlayEventListener = null;
          this.$emit('hide');
        },
        onAfterLeave: function onAfterLeave(el) {
          if (this.autoZIndex) {
            utils.ZIndexUtils.clear(el);
          }
        },
        alignOverlay: function alignOverlay() {
          utils.DomHandler.absolutePosition(this.container, this.target);
          var containerOffset = utils.DomHandler.getOffset(this.container);
          var targetOffset = utils.DomHandler.getOffset(this.target);
          var arrowLeft = 0;
          if (containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left;
          }
          this.container.style.setProperty('--overlayArrowLeft', "".concat(arrowLeft, "px"));
          if (containerOffset.top < targetOffset.top) {
            this.container.setAttribute('data-p-overlaypanel-flipped', 'true');
            !this.isUnstyled && utils.DomHandler.addClass(this.container, 'p-overlaypanel-flipped');
          }
        },
        onContentKeydown: function onContentKeydown(event) {
          if (event.code === 'Escape') {
            this.hide();
            utils.DomHandler.focus(this.target);
          }
        },
        onButtonKeydown: function onButtonKeydown(event) {
          switch (event.code) {
            case 'ArrowDown':
            case 'ArrowUp':
            case 'ArrowLeft':
            case 'ArrowRight':
              event.preventDefault();
          }
        },
        focus: function focus() {
          var focusTarget = this.container.querySelector('[autofocus]');
          if (focusTarget) {
            focusTarget.focus();
          }
        },
        bindOutsideClickListener: function bindOutsideClickListener() {
          var _this2 = this;
          if (!this.outsideClickListener && utils.DomHandler.isClient()) {
            this.outsideClickListener = function (event) {
              if (_this2.visible && !_this2.selfClick && !_this2.isTargetClicked(event)) {
                _this2.visible = false;
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
            this.selfClick = false;
          }
        },
        bindScrollListener: function bindScrollListener() {
          var _this3 = this;
          if (!this.scrollHandler) {
            this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.target, function () {
              if (_this3.visible) {
                _this3.visible = false;
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
              if (_this4.visible && !utils.DomHandler.isTouchDevice()) {
                _this4.visible = false;
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
        isTargetClicked: function isTargetClicked(event) {
          return this.eventTarget && (this.eventTarget === event.target || this.eventTarget.contains(event.target));
        },
        containerRef: function containerRef(el) {
          this.container = el;
        },
        createStyle: function createStyle() {
          if (!this.styleElement && !this.isUnstyled) {
            this.styleElement = document.createElement('style');
            this.styleElement.type = 'text/css';
            document.head.appendChild(this.styleElement);
            var innerHTML = '';
            for (var breakpoint in this.breakpoints) {
              innerHTML += "\n                        @media screen and (max-width: ".concat(breakpoint, ") {\n                            .p-overlaypanel[").concat(this.attributeSelector, "] {\n                                width: ").concat(this.breakpoints[breakpoint], " !important;\n                            }\n                        }\n                    ");
            }
            this.styleElement.innerHTML = innerHTML;
          }
        },
        destroyStyle: function destroyStyle() {
          if (this.styleElement) {
            document.head.removeChild(this.styleElement);
            this.styleElement = null;
          }
        },
        onOverlayClick: function onOverlayClick(event) {
          OverlayEventBus__default["default"].emit('overlay-click', {
            originalEvent: event,
            target: this.target
          });
        }
      },
      computed: {
        attributeSelector: function attributeSelector() {
          return utils.UniqueComponentId();
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
      return vue.openBlock(), vue.createBlock(_component_Portal, {
        appendTo: _ctx.appendTo
      }, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(vue.Transition, {
            name: "p-overlaypanel",
            onEnter: $options.onEnter,
            onLeave: $options.onLeave,
            onAfterLeave: $options.onAfterLeave
          }, {
            "default": vue.withCtx(function () {
              return [$data.visible ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.containerRef,
                role: "dialog",
                "aria-modal": $data.visible,
                onClick: _cache[5] || (_cache[5] = function () {
                  return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
                }),
                "class": _ctx.cx('root')
              }, _objectSpread(_objectSpread({}, _ctx.$attrs), _ctx.ptm('root'))), [vue.createElementVNode("div", vue.mergeProps({
                "class": _ctx.cx('content'),
                onClick: _cache[0] || (_cache[0] = function () {
                  return $options.onContentClick && $options.onContentClick.apply($options, arguments);
                }),
                onMousedown: _cache[1] || (_cache[1] = function () {
                  return $options.onContentClick && $options.onContentClick.apply($options, arguments);
                }),
                onKeydown: _cache[2] || (_cache[2] = function () {
                  return $options.onContentKeydown && $options.onContentKeydown.apply($options, arguments);
                })
              }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "default")], 16), _ctx.showCloseIcon ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                key: 0,
                "class": _ctx.cx('closeButton'),
                "aria-label": $options.closeAriaLabel,
                type: "button",
                autofocus: "",
                onClick: _cache[3] || (_cache[3] = function () {
                  return $options.hide && $options.hide.apply($options, arguments);
                }),
                onKeydown: _cache[4] || (_cache[4] = function () {
                  return $options.onButtonKeydown && $options.onButtonKeydown.apply($options, arguments);
                })
              }, _ctx.ptm('closeButton')), [vue.renderSlot(_ctx.$slots, "closeicon", {}, function () {
                return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.closeIcon ? 'span' : 'TimesIcon'), vue.mergeProps({
                  "class": [_ctx.cx('closeIcon'), _ctx.closeIcon]
                }, _ctx.ptm('closeIcon')), null, 16, ["class"]))];
              })], 16, _hoisted_2)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 16, _hoisted_1)), [[_directive_focustrap]]) : vue.createCommentVNode("", true)];
            }),
            _: 3
          }, 8, ["onEnter", "onLeave", "onAfterLeave"])];
        }),
        _: 3
      }, 8, ["appendTo"]);
    }

    script.render = render;

    return script;

})(primevue.focustrap, primevue.icons.times, primevue.overlayeventbus, primevue.portal, primevue.ripple, primevue.utils, primevue.basecomponent, primevue.usestyle, Vue);
