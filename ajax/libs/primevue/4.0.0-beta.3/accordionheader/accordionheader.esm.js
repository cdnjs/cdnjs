import ChevronDownIcon from 'primevue/icons/chevrondown';
import ChevronUpIcon from 'primevue/icons/chevronup';
import Ripple from 'primevue/ripple';
import { DomHandler } from 'primevue/utils';
import { mergeProps, resolveDirective, withDirectives, openBlock, createBlock, resolveDynamicComponent, withCtx, renderSlot, normalizeClass } from 'vue';
import AccordionHeaderStyle from 'primevue/accordionheader/style';
import BaseComponent from 'primevue/basecomponent';

var script$1 = {
  name: 'BaseAccordionHeader',
  "extends": BaseComponent,
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
  style: AccordionHeaderStyle,
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
      return DomHandler.findSingle(panelElement, '[data-pc-name="accordionheader"]');
    },
    findNextPanel: function findNextPanel(panelElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var element = selfCheck ? panelElement : panelElement.nextElementSibling;
      return element ? DomHandler.getAttribute(element, 'data-p-disabled') ? this.findNextPanel(element) : this.findHeader(element) : null;
    },
    findPrevPanel: function findPrevPanel(panelElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var element = selfCheck ? panelElement : panelElement.previousElementSibling;
      return element ? DomHandler.getAttribute(element, 'data-p-disabled') ? this.findPrevPanel(element) : this.findHeader(element) : null;
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
      DomHandler.focus(this.findHeader(element));
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
      return mergeProps(this.asAttrs, this.a11yAttrs, this.ptmi('root', this.ptParams));
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
    ChevronUpIcon: ChevronUpIcon,
    ChevronDownIcon: ChevronDownIcon
  },
  directives: {
    ripple: Ripple
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return !_ctx.asChild ? withDirectives((openBlock(), createBlock(resolveDynamicComponent(_ctx.as), mergeProps({
    key: 0,
    "class": _ctx.cx('root'),
    onClick: $options.onClick
  }, $options.attrs), {
    "default": withCtx(function () {
      return [renderSlot(_ctx.$slots, "default", {
        active: $options.$pcAccordionPanel.active
      }), renderSlot(_ctx.$slots, "toggleicon", {
        active: $options.$pcAccordionPanel.active,
        "class": normalizeClass(_ctx.cx('toggleicon'))
      }, function () {
        return [$options.$pcAccordionPanel.active ? (openBlock(), createBlock(resolveDynamicComponent($options.$pcAccordion.$slots.collapseicon ? $options.$pcAccordion.$slots.collapseicon : $options.$pcAccordion.collapseIcon ? 'span' : 'ChevronDownIcon'), mergeProps({
          key: 0,
          "class": [$options.$pcAccordion.collapseIcon, _ctx.cx('toggleicon')],
          "aria-hidden": "true"
        }, _ctx.ptm('toggleicon', $options.ptParams)), null, 16, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent($options.$pcAccordion.$slots.expandicon ? $options.$pcAccordion.$slots.expandicon : $options.$pcAccordion.expandIcon ? 'span' : 'ChevronUpIcon'), mergeProps({
          key: 1,
          "class": [$options.$pcAccordion.expandIcon, _ctx.cx('toggleicon')],
          "aria-hidden": "true"
        }, _ctx.ptm('toggleicon', $options.ptParams)), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 16, ["class", "onClick"])), [[_directive_ripple]]) : renderSlot(_ctx.$slots, "default", {
    key: 1,
    "class": normalizeClass(_ctx.cx('root')),
    active: $options.$pcAccordionPanel.active,
    a11yAttrs: $options.a11yAttrs,
    onClick: $options.onClick
  });
}

script.render = render;

export { script as default };
