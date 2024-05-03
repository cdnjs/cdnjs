this.primevue = this.primevue || {};
this.primevue.accordionheader = (function (ChevronDownIcon, ChevronUpIcon, Ripple, utils, vue, AccordionHeaderStyle, BaseComponent) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
    var ChevronUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronUpIcon);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var AccordionHeaderStyle__default = /*#__PURE__*/_interopDefaultLegacy(AccordionHeaderStyle);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script$1 = {
      name: 'BaseAccordionHeader',
      "extends": BaseComponent__default["default"],
      props: {
        as: {
          type: String,
          "default": 'BUTTON'
        },
        asChild: {
          type: Boolean,
          "default": false
        }
      },
      style: AccordionHeaderStyle__default["default"],
      provide: function provide() {
        return {
          $pcAccordionHeader: this,
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'AccordionHeader',
      "extends": script$1,
      inheritAttrs: false,
      inject: ['$pcAccordion', '$pcAccordionPanel'],
      methods: {
        onFocus: function onFocus() {
          this.$pcAccordion.selectOnFocus && this.changeActiveValue();
        },
        onClick: function onClick() {
          this.changeActiveValue();
        },
        onKeydown: function onKeydown(event) {
          switch (event.code) {
            case 'ArrowDown':
              this.onArrowDownKey(event);
              break;
            case 'ArrowUp':
              this.onArrowUpKey(event);
              break;
            case 'Home':
              this.onHomeKey(event);
              break;
            case 'End':
              this.onEndKey(event);
              break;
            case 'Enter':
            case 'NumpadEnter':
            case 'Space':
              this.onEnterKey(event);
              break;
          }
        },
        onArrowDownKey: function onArrowDownKey(event) {
          var nextPanel = this.findNextPanel(this.findPanel(event.currentTarget));
          nextPanel ? this.changeFocusedPanel(event, nextPanel) : this.onHomeKey(event);
          event.preventDefault();
        },
        onArrowUpKey: function onArrowUpKey(event) {
          var prevPanel = this.findPrevPanel(this.findPanel(event.currentTarget));
          prevPanel ? this.changeFocusedPanel(event, prevPanel) : this.onEndKey(event);
          event.preventDefault();
        },
        onHomeKey: function onHomeKey(event) {
          var firstPanel = this.findFirstPanel();
          this.changeFocusedPanel(event, firstPanel);
          event.preventDefault();
        },
        onEndKey: function onEndKey(event) {
          var lastPanel = this.findLastPanel();
          this.changeFocusedPanel(event, lastPanel);
          event.preventDefault();
        },
        onEnterKey: function onEnterKey(event) {
          this.changeActiveValue();
          event.preventDefault();
        },
        findPanel: function findPanel(headerElement) {
          return headerElement === null || headerElement === void 0 ? void 0 : headerElement.closest('[data-pc-name="accordionpanel"]');
        },
        findHeader: function findHeader(panelElement) {
          return utils.DomHandler.findSingle(panelElement, '[data-pc-name="accordionheader"]');
        },
        findNextPanel: function findNextPanel(panelElement) {
          var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var element = selfCheck ? panelElement : panelElement.nextElementSibling;
          return element ? utils.DomHandler.getAttribute(element, 'data-p-disabled') ? this.findNextPanel(element) : this.findHeader(element) : null;
        },
        findPrevPanel: function findPrevPanel(panelElement) {
          var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var element = selfCheck ? panelElement : panelElement.previousElementSibling;
          return element ? utils.DomHandler.getAttribute(element, 'data-p-disabled') ? this.findPrevPanel(element) : this.findHeader(element) : null;
        },
        findFirstPanel: function findFirstPanel() {
          return this.findNextPanel(this.$pcAccordion.$el.firstElementChild, true);
        },
        findLastPanel: function findLastPanel() {
          return this.findPrevPanel(this.$pcAccordion.$el.lastElementChild, true);
        },
        changeActiveValue: function changeActiveValue() {
          this.$pcAccordion.updateValue(this.$pcAccordionPanel.value);
        },
        changeFocusedPanel: function changeFocusedPanel(event, element) {
          utils.DomHandler.focus(this.findHeader(element));
        }
      },
      computed: {
        id: function id() {
          return "".concat(this.$pcAccordion.id, "_accordionheader_").concat(this.$pcAccordionPanel.value);
        },
        ariaControls: function ariaControls() {
          return "".concat(this.$pcAccordion.id, "_accordioncontent_").concat(this.$pcAccordionPanel.value);
        },
        attrs: function attrs() {
          return vue.mergeProps(this.asAttrs, this.a11yAttrs, this.ptmi('root', this.ptParams));
        },
        asAttrs: function asAttrs() {
          return this.as === 'BUTTON' ? {
            type: 'button',
            disabled: this.$pcAccordionPanel.disabled
          } : undefined;
        },
        a11yAttrs: function a11yAttrs() {
          return {
            id: this.id,
            tabindex: this.$pcAccordion.tabindex,
            'aria-expanded': this.$pcAccordionPanel.active,
            'aria-controls': this.ariaControls,
            'data-pc-name': 'accordionheader',
            'data-p-disabled': this.$pcAccordionPanel.disabled,
            'data-p-active': this.$pcAccordionPanel.active,
            onFocus: this.onFocus,
            onKeydown: this.onKeydown
          };
        },
        ptParams: function ptParams() {
          return {
            context: {
              active: this.$pcAccordionPanel.active
            }
          };
        }
      },
      components: {
        ChevronUpIcon: ChevronUpIcon__default["default"],
        ChevronDownIcon: ChevronDownIcon__default["default"]
      },
      directives: {
        ripple: Ripple__default["default"]
      }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _directive_ripple = vue.resolveDirective("ripple");
      return !_ctx.asChild ? vue.withDirectives((vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.as), vue.mergeProps({
        key: 0,
        "class": _ctx.cx('root'),
        onClick: $options.onClick
      }, $options.attrs), {
        "default": vue.withCtx(function () {
          return [vue.renderSlot(_ctx.$slots, "default", {
            active: $options.$pcAccordionPanel.active
          }), vue.renderSlot(_ctx.$slots, "toggleicon", {
            active: $options.$pcAccordionPanel.active,
            "class": vue.normalizeClass(_ctx.cx('toggleicon'))
          }, function () {
            return [$options.$pcAccordionPanel.active ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.$pcAccordion.$slots.collapseicon ? $options.$pcAccordion.$slots.collapseicon : $options.$pcAccordion.collapseIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
              key: 0,
              "class": [$options.$pcAccordion.collapseIcon, _ctx.cx('toggleicon')],
              "aria-hidden": "true"
            }, _ctx.ptm('toggleicon', $options.ptParams)), null, 16, ["class"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.$pcAccordion.$slots.expandicon ? $options.$pcAccordion.$slots.expandicon : $options.$pcAccordion.expandIcon ? 'span' : 'ChevronUpIcon'), vue.mergeProps({
              key: 1,
              "class": [$options.$pcAccordion.expandIcon, _ctx.cx('toggleicon')],
              "aria-hidden": "true"
            }, _ctx.ptm('toggleicon', $options.ptParams)), null, 16, ["class"]))];
          })];
        }),
        _: 3
      }, 16, ["class", "onClick"])), [[_directive_ripple]]) : vue.renderSlot(_ctx.$slots, "default", {
        key: 1,
        "class": vue.normalizeClass(_ctx.cx('root')),
        active: $options.$pcAccordionPanel.active,
        a11yAttrs: $options.a11yAttrs,
        onClick: $options.onClick
      });
    }

    script.render = render;

    return script;

})(primevue.icons.chevrondown, primevue.icons.chevronup, primevue.ripple, primevue.utils, Vue, primevue.accordionheader.style, primevue.basecomponent);
