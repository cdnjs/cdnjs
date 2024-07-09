this.primevue = this.primevue || {};
this.primevue.accordioncontent = (function (vue, AccordionContentStyle, BaseComponent) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var AccordionContentStyle__default = /*#__PURE__*/_interopDefaultLegacy(AccordionContentStyle);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script$1 = {
      name: 'BaseAccordionContent',
      "extends": BaseComponent__default["default"],
      props: {
        as: {
          type: String,
          "default": 'DIV'
        },
        asChild: {
          type: Boolean,
          "default": false
        }
      },
      style: AccordionContentStyle__default["default"],
      provide: function provide() {
        return {
          $pcAccordionContent: this,
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'AccordionContent',
      "extends": script$1,
      inheritAttrs: false,
      inject: ['$pcAccordion', '$pcAccordionPanel'],
      computed: {
        id: function id() {
          return "".concat(this.$pcAccordion.id, "_accordioncontent_").concat(this.$pcAccordionPanel.value);
        },
        ariaLabelledby: function ariaLabelledby() {
          return "".concat(this.$pcAccordion.id, "_accordionheader_").concat(this.$pcAccordionPanel.value);
        },
        attrs: function attrs() {
          return vue.mergeProps(this.a11yAttrs, this.ptmi('root', this.ptParams));
        },
        a11yAttrs: function a11yAttrs() {
          return {
            id: this.id,
            role: 'region',
            'aria-labelledby': this.ariaLabelledby,
            'data-pc-name': 'accordioncontent',
            'data-p-active': this.$pcAccordionPanel.active
          };
        },
        ptParams: function ptParams() {
          return {
            context: {
              active: this.$pcAccordionPanel.active
            }
          };
        }
      }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return !_ctx.asChild ? (vue.openBlock(), vue.createBlock(vue.Transition, vue.mergeProps({
        key: 0,
        name: "p-toggleable-content"
      }, _ctx.ptm('transition', $options.ptParams)), {
        "default": vue.withCtx(function () {
          return [($options.$pcAccordion.lazy ? $options.$pcAccordionPanel.active : true) ? vue.withDirectives((vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.as), vue.mergeProps({
            key: 0,
            "class": _ctx.cx('root')
          }, $options.attrs), {
            "default": vue.withCtx(function () {
              return [vue.createElementVNode("div", vue.mergeProps({
                "class": _ctx.cx('content')
              }, _ctx.ptm('content', $options.ptParams)), [vue.renderSlot(_ctx.$slots, "default")], 16)];
            }),
            _: 3
          }, 16, ["class"])), [[vue.vShow, $options.$pcAccordion.lazy ? true : $options.$pcAccordionPanel.active]]) : vue.createCommentVNode("", true)];
        }),
        _: 3
      }, 16)) : vue.renderSlot(_ctx.$slots, "default", {
        key: 1,
        "class": vue.normalizeClass(_ctx.cx('root')),
        active: _ctx.active,
        a11yAttrs: $options.a11yAttrs
      });
    }

    script.render = render;

    return script;

})(Vue, primevue.accordioncontent.style, primevue.basecomponent);
