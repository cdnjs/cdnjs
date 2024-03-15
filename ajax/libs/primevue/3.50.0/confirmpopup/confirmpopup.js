this.primevue = this.primevue || {};
this.primevue.confirmpopup = (function (Button, ConfirmationEventBus, FocusTrap, OverlayEventBus, Portal, utils, BaseComponent, ConfirmPopupStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
    var ConfirmationEventBus__default = /*#__PURE__*/_interopDefaultLegacy(ConfirmationEventBus);
    var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
    var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var ConfirmPopupStyle__default = /*#__PURE__*/_interopDefaultLegacy(ConfirmPopupStyle);

    var script$1 = {
      name: 'BaseConfirmPopup',
      "extends": BaseComponent__default["default"],
      props: {
        group: String
      },
      style: ConfirmPopupStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'ConfirmPopup',
      "extends": script$1,
      inheritAttrs: false,
      data: function data() {
        return {
          visible: false,
          confirmation: null,
          autoFocusAccept: null,
          autoFocusReject: null
        };
      },
      target: null,
      outsideClickListener: null,
      scrollHandler: null,
      resizeListener: null,
      container: null,
      confirmListener: null,
      closeListener: null,
      mounted: function mounted() {
        var _this = this;
        this.confirmListener = function (options) {
          if (!options) {
            return;
          }
          if (options.group === _this.group) {
            _this.confirmation = options;
            _this.target = options.target;
            if (_this.confirmation.onShow) {
              _this.confirmation.onShow();
            }
            _this.visible = true;
          }
        };
        this.closeListener = function () {
          _this.visible = false;
          _this.confirmation = null;
        };
        ConfirmationEventBus__default["default"].on('confirm', this.confirmListener);
        ConfirmationEventBus__default["default"].on('close', this.closeListener);
      },
      beforeUnmount: function beforeUnmount() {
        ConfirmationEventBus__default["default"].off('confirm', this.confirmListener);
        ConfirmationEventBus__default["default"].off('close', this.closeListener);
        this.unbindOutsideClickListener();
        if (this.scrollHandler) {
          this.scrollHandler.destroy();
          this.scrollHandler = null;
        }
        this.unbindResizeListener();
        if (this.container) {
          utils.ZIndexUtils.clear(this.container);
          this.container = null;
        }
        this.target = null;
        this.confirmation = null;
      },
      methods: {
        accept: function accept() {
          if (this.confirmation.accept) {
            this.confirmation.accept();
          }
          this.visible = false;
        },
        reject: function reject() {
          if (this.confirmation.reject) {
            this.confirmation.reject();
          }
          this.visible = false;
        },
        onHide: function onHide() {
          if (this.confirmation.onHide) {
            this.confirmation.onHide();
          }
          this.visible = false;
        },
        onAcceptKeydown: function onAcceptKeydown(event) {
          if (event.code === 'Space' || event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.accept();
            utils.DomHandler.focus(this.target);
            event.preventDefault();
          }
        },
        onRejectKeydown: function onRejectKeydown(event) {
          if (event.code === 'Space' || event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.reject();
            utils.DomHandler.focus(this.target);
            event.preventDefault();
          }
        },
        onEnter: function onEnter(el) {
          this.autoFocusAccept = this.confirmation.defaultFocus === undefined || this.confirmation.defaultFocus === 'accept' ? true : false;
          this.autoFocusReject = this.confirmation.defaultFocus === 'reject' ? true : false;
          this.bindOutsideClickListener();
          this.bindScrollListener();
          this.bindResizeListener();
          utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
        },
        onAfterEnter: function onAfterEnter() {
          this.focus();
        },
        onLeave: function onLeave() {
          this.autoFocusAccept = null;
          this.autoFocusReject = null;
          this.unbindOutsideClickListener();
          this.unbindScrollListener();
          this.unbindResizeListener();
        },
        onAfterLeave: function onAfterLeave(el) {
          utils.ZIndexUtils.clear(el);
        },
        alignOverlay: function alignOverlay() {
          utils.DomHandler.absolutePosition(this.container, this.target, false);
          var containerOffset = utils.DomHandler.getOffset(this.container);
          var targetOffset = utils.DomHandler.getOffset(this.target);
          var arrowLeft = 0;
          if (containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left;
          }
          this.container.style.setProperty('--overlayArrowLeft', "".concat(arrowLeft, "px"));
          if (containerOffset.top < targetOffset.top) {
            this.container.setAttribute('data-p-confirm-popup-flipped', 'true');
            !this.isUnstyled && utils.DomHandler.addClass(this.container, 'p-confirm-popup-flipped');
          }
        },
        bindOutsideClickListener: function bindOutsideClickListener() {
          var _this2 = this;
          if (!this.outsideClickListener) {
            this.outsideClickListener = function (event) {
              if (_this2.visible && _this2.container && !_this2.container.contains(event.target) && !_this2.isTargetClicked(event)) {
                if (_this2.confirmation.onHide) {
                  _this2.confirmation.onHide();
                }
                _this2.visible = false;
              } else {
                _this2.alignOverlay();
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
        focus: function focus() {
          var focusTarget = this.container.querySelector('[autofocus]');
          if (focusTarget) {
            focusTarget.focus({
              preventScroll: true
            }); // Firefox requires preventScroll
          }
        },
        isTargetClicked: function isTargetClicked(event) {
          return this.target && (this.target === event.target || this.target.contains(event.target));
        },
        containerRef: function containerRef(el) {
          this.container = el;
        },
        onOverlayClick: function onOverlayClick(event) {
          OverlayEventBus__default["default"].emit('overlay-click', {
            originalEvent: event,
            target: this.target
          });
        },
        onOverlayKeydown: function onOverlayKeydown(event) {
          if (event.code === 'Escape') {
            ConfirmationEventBus__default["default"].emit('close', this.closeListener);
            utils.DomHandler.focus(this.target);
          }
        },
        getCXOptions: function getCXOptions(icon, iconProps) {
          return {
            contenxt: {
              icon: icon,
              iconClass: iconProps["class"]
            }
          };
        }
      },
      computed: {
        message: function message() {
          return this.confirmation ? this.confirmation.message : null;
        },
        acceptLabel: function acceptLabel() {
          return this.confirmation ? this.confirmation.acceptLabel || this.$primevue.config.locale.accept : null;
        },
        rejectLabel: function rejectLabel() {
          return this.confirmation ? this.confirmation.rejectLabel || this.$primevue.config.locale.reject : null;
        },
        acceptIcon: function acceptIcon() {
          return this.confirmation ? this.confirmation.acceptIcon : null;
        },
        rejectIcon: function rejectIcon() {
          return this.confirmation ? this.confirmation.rejectIcon : null;
        }
      },
      components: {
        CPButton: Button__default["default"],
        Portal: Portal__default["default"]
      },
      directives: {
        focustrap: FocusTrap__default["default"]
      }
    };

    var _hoisted_1 = ["aria-modal"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_CPButton = vue.resolveComponent("CPButton");
      var _component_Portal = vue.resolveComponent("Portal");
      var _directive_focustrap = vue.resolveDirective("focustrap");
      return vue.openBlock(), vue.createBlock(_component_Portal, null, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(vue.Transition, vue.mergeProps({
            name: "p-confirm-popup",
            onEnter: $options.onEnter,
            onAfterEnter: $options.onAfterEnter,
            onLeave: $options.onLeave,
            onAfterLeave: $options.onAfterLeave
          }, _ctx.ptm('transition')), {
            "default": vue.withCtx(function () {
              return [$data.visible ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                ref: $options.containerRef,
                role: "alertdialog",
                "class": _ctx.cx('root'),
                "aria-modal": $data.visible,
                onClick: _cache[2] || (_cache[2] = function () {
                  return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
                }),
                onKeydown: _cache[3] || (_cache[3] = function () {
                  return $options.onOverlayKeydown && $options.onOverlayKeydown.apply($options, arguments);
                })
              }, _ctx.ptmi('root')), [_ctx.$slots.container ? vue.renderSlot(_ctx.$slots, "container", {
                key: 0,
                message: $data.confirmation,
                onAccept: $options.accept,
                onReject: $options.reject,
                acceptCallback: $options.accept,
                rejectCallback: $options.reject
              }) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                key: 1
              }, [!_ctx.$slots.message ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                "class": _ctx.cx('content')
              }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "icon", {}, function () {
                return [_ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.icon), {
                  key: 0,
                  "class": vue.normalizeClass(_ctx.cx('icon'))
                }, null, 8, ["class"])) : $data.confirmation.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                  key: 1,
                  "class": [$data.confirmation.icon, _ctx.cx('icon')]
                }, _ctx.ptm('icon')), null, 16)) : vue.createCommentVNode("", true)];
              }), vue.createElementVNode("span", vue.mergeProps({
                "class": _ctx.cx('message')
              }, _ctx.ptm('message')), vue.toDisplayString($data.confirmation.message), 17)], 16)) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.message), {
                key: 1,
                message: $data.confirmation
              }, null, 8, ["message"])), vue.createElementVNode("div", vue.mergeProps({
                "class": _ctx.cx('footer')
              }, _ctx.ptm('footer')), [vue.createVNode(_component_CPButton, {
                label: $options.rejectLabel,
                onClick: _cache[0] || (_cache[0] = function ($event) {
                  return $options.reject();
                }),
                onKeydown: $options.onRejectKeydown,
                autofocus: $data.autoFocusReject,
                "class": vue.normalizeClass([_ctx.cx('rejectButton'), $data.confirmation.rejectClass]),
                unstyled: _ctx.unstyled,
                pt: _ctx.ptm('rejectButton')
              }, vue.createSlots({
                _: 2
              }, [$options.rejectIcon || _ctx.$slots.rejecticon ? {
                name: "icon",
                fn: vue.withCtx(function (iconProps) {
                  return [vue.renderSlot(_ctx.$slots, "rejecticon", {}, function () {
                    return [vue.createElementVNode("span", vue.mergeProps({
                      "class": [$options.rejectIcon, iconProps["class"]]
                    }, _ctx.ptm('rejectButton')['icon'], {
                      "data-pc-section": "rejectbuttonicon"
                    }), null, 16)];
                  })];
                }),
                key: "0"
              } : undefined]), 1032, ["label", "onKeydown", "autofocus", "class", "unstyled", "pt"]), vue.createVNode(_component_CPButton, {
                label: $options.acceptLabel,
                onClick: _cache[1] || (_cache[1] = function ($event) {
                  return $options.accept();
                }),
                onKeydown: $options.onAcceptKeydown,
                autofocus: $data.autoFocusAccept,
                "class": vue.normalizeClass([_ctx.cx('acceptButton'), $data.confirmation.acceptClass]),
                unstyled: _ctx.unstyled,
                pt: _ctx.ptm('acceptButton')
              }, vue.createSlots({
                _: 2
              }, [$options.acceptIcon || _ctx.$slots.accepticon ? {
                name: "icon",
                fn: vue.withCtx(function (iconProps) {
                  return [vue.renderSlot(_ctx.$slots, "accepticon", {}, function () {
                    return [vue.createElementVNode("span", vue.mergeProps({
                      "class": [$options.acceptIcon, iconProps["class"]]
                    }, _ctx.ptm('acceptButton')['icon'], {
                      "data-pc-section": "acceptbuttonicon"
                    }), null, 16)];
                  })];
                }),
                key: "0"
              } : undefined]), 1032, ["label", "onKeydown", "autofocus", "class", "unstyled", "pt"])], 16)], 64))], 16, _hoisted_1)), [[_directive_focustrap]]) : vue.createCommentVNode("", true)];
            }),
            _: 3
          }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
        }),
        _: 3
      });
    }

    script.render = render;

    return script;

})(primevue.button, primevue.confirmationeventbus, primevue.focustrap, primevue.overlayeventbus, primevue.portal, primevue.utils, primevue.basecomponent, primevue.confirmpopup.style, Vue);
