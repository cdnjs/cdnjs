import BaseComponent from 'primevue/basecomponent';
import Button from 'primevue/button';
import PlusIcon from 'primevue/icons/plus';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import { UniqueComponentId, DomHandler } from 'primevue/utils';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, Fragment, createElementVNode, mergeProps, renderSlot, createVNode, normalizeClass, withCtx, createBlock, resolveDynamicComponent, renderList, withDirectives, createCommentVNode } from 'vue';

var script = {
    name: 'SpeedDial',
    extends: BaseComponent,
    emits: ['click', 'show', 'hide', 'focus', 'blur'],
    props: {
        model: null,
        visible: {
            type: Boolean,
            default: false
        },
        direction: {
            type: String,
            default: 'up'
        },
        transitionDelay: {
            type: Number,
            default: 30
        },
        type: {
            type: String,
            default: 'linear'
        },
        radius: {
            type: Number,
            default: 0
        },
        mask: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        hideOnClickOutside: {
            type: Boolean,
            default: true
        },
        buttonClass: null,
        maskStyle: null,
        maskClass: null,
        showIcon: {
            type: String,
            default: undefined
        },
        hideIcon: {
            type: String,
            default: undefined
        },
        rotateAnimation: {
            type: Boolean,
            default: true
        },
        tooltipOptions: null,
        style: null,
        class: null,
        'aria-labelledby': {
            type: String,
            default: null
        },
        'aria-label': {
            type: String,
            default: null
        }
    },
    documentClickListener: null,
    container: null,
    list: null,
    data() {
        return {
            id: this.$attrs.id,
            d_visible: this.visible,
            isItemClicked: false,
            focused: false,
            focusedOptionIndex: -1
        };
    },
    watch: {
        '$attrs.id': function (newValue) {
            this.id = newValue || UniqueComponentId();
        },
        visible(newValue) {
            this.d_visible = newValue;
        }
    },
    mounted() {
        this.id = this.id || UniqueComponentId();

        if (this.type !== 'linear') {
            const button = DomHandler.findSingle(this.container, '.p-speeddial-button');
            const firstItem = DomHandler.findSingle(this.list, '.p-speeddial-item');

            if (button && firstItem) {
                const wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
                const hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);

                this.list.style.setProperty('--item-diff-x', `${wDiff / 2}px`);
                this.list.style.setProperty('--item-diff-y', `${hDiff / 2}px`);
            }
        }

        if (this.hideOnClickOutside) {
            this.bindDocumentClickListener();
        }
    },
    beforeMount() {
        this.unbindDocumentClickListener();
    },
    methods: {
        getPTOptions(id, key) {
            return this.ptm(key, {
                context: {
                    active: this.isItemActive(id)
                }
            });
        },
        onFocus(event) {
            this.focused = true;

            this.$emit('focus', event);
        },
        onBlur(event) {
            this.focused = false;
            this.focusedOptionIndex = -1;
            this.$emit('blur', event);
        },
        onItemClick(e, item) {
            if (item.command) {
                item.command({ originalEvent: e, item });
            }

            this.hide();

            this.isItemClicked = true;
            e.preventDefault();
        },
        onClick(event) {
            this.d_visible ? this.hide() : this.show();

            this.isItemClicked = true;

            this.$emit('click', event);
        },
        show() {
            this.d_visible = true;
            this.$emit('show');
        },
        hide() {
            this.d_visible = false;
            this.$emit('hide');
        },
        calculateTransitionDelay(index) {
            const length = this.model.length;
            const visible = this.d_visible;

            return (visible ? index : length - index - 1) * this.transitionDelay;
        },
        onTogglerKeydown(event) {
            switch (event.code) {
                case 'ArrowDown':
                case 'ArrowLeft':
                    this.onTogglerArrowDown(event);

                    break;

                case 'ArrowUp':
                case 'ArrowRight':
                    this.onTogglerArrowUp(event);

                    break;

                case 'Escape':
                    this.onEscapeKey();

                    break;
            }
        },
        onKeyDown(event) {
            switch (event.code) {
                case 'ArrowDown':
                    this.onArrowDown(event);
                    break;

                case 'ArrowUp':
                    this.onArrowUp(event);
                    break;

                case 'ArrowLeft':
                    this.onArrowLeft(event);
                    break;

                case 'ArrowRight':
                    this.onArrowRight(event);
                    break;

                case 'Enter':
                case 'Space':
                    this.onEnterKey(event);
                    break;

                case 'Escape':
                    this.onEscapeKey(event);
                    break;

                case 'Home':
                    this.onHomeKey(event);
                    break;

                case 'End':
                    this.onEndKey(event);
                    break;
            }
        },
        onTogglerArrowUp(event) {
            this.focused = true;
            DomHandler.focus(this.list);

            this.show();
            this.navigatePrevItem(event);

            event.preventDefault();
        },
        onTogglerArrowDown(event) {
            this.focused = true;
            DomHandler.focus(this.list);

            this.show();
            this.navigateNextItem(event);

            event.preventDefault();
        },
        onEnterKey(event) {
            const items = DomHandler.find(this.container, '.p-speeddial-item');
            const itemIndex = [...items].findIndex((item) => item.id === this.focusedOptionIndex);

            this.onItemClick(event, this.model[itemIndex]);
            this.onBlur(event);

            const buttonEl = DomHandler.findSingle(this.container, 'button');

            buttonEl && DomHandler.focus(buttonEl);
        },
        onEscapeKey() {
            this.hide();

            const buttonEl = DomHandler.findSingle(this.container, 'button');

            buttonEl && DomHandler.focus(buttonEl);
        },
        onArrowUp(event) {
            if (this.direction === 'up') {
                this.navigateNextItem(event);
            } else if (this.direction === 'down') {
                this.navigatePrevItem(event);
            } else {
                this.navigateNextItem(event);
            }
        },
        onArrowDown(event) {
            if (this.direction === 'up') {
                this.navigatePrevItem(event);
            } else if (this.direction === 'down') {
                this.navigateNextItem(event);
            } else {
                this.navigatePrevItem(event);
            }
        },

        onArrowLeft(event) {
            const leftValidDirections = ['left', 'up-right', 'down-left'];
            const rightValidDirections = ['right', 'up-left', 'down-right'];

            if (leftValidDirections.includes(this.direction)) {
                this.navigateNextItem(event);
            } else if (rightValidDirections.includes(this.direction)) {
                this.navigatePrevItem(event);
            } else {
                this.navigatePrevItem(event);
            }
        },

        onArrowRight(event) {
            const leftValidDirections = ['left', 'up-right', 'down-left'];
            const rightValidDirections = ['right', 'up-left', 'down-right'];

            if (leftValidDirections.includes(this.direction)) {
                this.navigatePrevItem(event);
            } else if (rightValidDirections.includes(this.direction)) {
                this.navigateNextItem(event);
            } else {
                this.navigateNextItem(event);
            }
        },
        onEndKey(event) {
            event.preventDefault();

            this.focusedOptionIndex = -1;
            this.navigatePrevItem(event);
        },
        onHomeKey(event) {
            event.preventDefault();

            this.focusedOptionIndex = -1;
            this.navigateNextItem(event);
        },
        navigateNextItem(event) {
            const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);

            this.changeFocusedOptionIndex(optionIndex);

            event.preventDefault();
        },
        navigatePrevItem(event) {
            const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);

            this.changeFocusedOptionIndex(optionIndex);

            event.preventDefault();
        },
        changeFocusedOptionIndex(index) {
            const items = DomHandler.find(this.container, '.p-speeddial-item');
            const filteredItems = [...items].filter((item) => !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled'));

            if (filteredItems[index]) {
                this.focusedOptionIndex = filteredItems[index].getAttribute('id');
            }
        },
        findPrevOptionIndex(index) {
            const items = DomHandler.find(this.container, '.p-speeddial-item');
            const filteredItems = [...items].filter((item) => !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled'));
            const newIndex = index === -1 ? filteredItems[filteredItems.length - 1].id : index;
            let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);

            matchedOptionIndex = index === -1 ? filteredItems.length - 1 : matchedOptionIndex - 1;

            return matchedOptionIndex;
        },
        findNextOptionIndex(index) {
            const items = DomHandler.find(this.container, '.p-speeddial-item');
            const filteredItems = [...items].filter((item) => !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled'));
            const newIndex = index === -1 ? filteredItems[0].id : index;
            let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);

            matchedOptionIndex = index === -1 ? 0 : matchedOptionIndex + 1;

            return matchedOptionIndex;
        },
        calculatePointStyle(index) {
            const type = this.type;

            if (type !== 'linear') {
                const length = this.model.length;
                const radius = this.radius || length * 20;

                if (type === 'circle') {
                    const step = (2 * Math.PI) / length;

                    return {
                        left: `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`,
                        top: `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`
                    };
                } else if (type === 'semi-circle') {
                    const direction = this.direction;
                    const step = Math.PI / (length - 1);
                    const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                    const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;

                    if (direction === 'up') {
                        return { left: x, bottom: y };
                    } else if (direction === 'down') {
                        return { left: x, top: y };
                    } else if (direction === 'left') {
                        return { right: y, top: x };
                    } else if (direction === 'right') {
                        return { left: y, top: x };
                    }
                } else if (type === 'quarter-circle') {
                    const direction = this.direction;
                    const step = Math.PI / (2 * (length - 1));
                    const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                    const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;

                    if (direction === 'up-left') {
                        return { right: x, bottom: y };
                    } else if (direction === 'up-right') {
                        return { left: x, bottom: y };
                    } else if (direction === 'down-left') {
                        return { right: y, top: x };
                    } else if (direction === 'down-right') {
                        return { left: y, top: x };
                    }
                }
            }

            return {};
        },
        getItemStyle(index) {
            const transitionDelay = this.calculateTransitionDelay(index);
            const pointStyle = this.calculatePointStyle(index);

            return {
                transitionDelay: `${transitionDelay}ms`,
                ...pointStyle
            };
        },
        bindDocumentClickListener() {
            if (!this.documentClickListener) {
                this.documentClickListener = (event) => {
                    if (this.d_visible && this.isOutsideClicked(event)) {
                        this.hide();
                    }

                    this.isItemClicked = false;
                };

                document.addEventListener('click', this.documentClickListener);
            }
        },
        unbindDocumentClickListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        },
        isOutsideClicked(event) {
            return this.container && !(this.container.isSameNode(event.target) || this.container.contains(event.target) || this.isItemClicked);
        },
        isItemVisible(item) {
            return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
        },
        isItemActive(id) {
            return id === this.focusedOptionId;
        },
        containerRef(el) {
            this.container = el;
        },
        listRef(el) {
            this.list = el;
        },
        itemClass(id) {
            return [
                {
                    'p-focus': this.isItemActive(id)
                }
            ];
        }
    },
    computed: {
        containerClass() {
            return [
                `p-speeddial p-component p-speeddial-${this.type}`,
                {
                    [`p-speeddial-direction-${this.direction}`]: this.type !== 'circle',
                    'p-speeddial-opened': this.d_visible,
                    'p-disabled': this.disabled
                },
                this.class
            ];
        },
        buttonClassName() {
            return [
                'p-speeddial-button p-button-rounded',
                {
                    'p-speeddial-rotate': this.rotateAnimation && !this.hideIcon
                },
                this.buttonClass
            ];
        },
        maskClassName() {
            return [
                'p-speeddial-mask',
                {
                    'p-speeddial-mask-visible': this.d_visible
                },
                this.maskClass
            ];
        },
        focusedOptionId() {
            return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
        }
    },
    components: {
        SDButton: Button,
        PlusIcon: PlusIcon
    },
    directives: {
        ripple: Ripple,
        tooltip: Tooltip
    }
};

const _hoisted_1 = ["id", "aria-activedescendant"];
const _hoisted_2 = ["id", "aria-controls"];
const _hoisted_3 = ["href", "target", "onClick", "aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SDButton = resolveComponent("SDButton");
  const _directive_tooltip = resolveDirective("tooltip");
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createElementBlock(Fragment, null, [
    createElementVNode("div", mergeProps({
      ref: $options.containerRef,
      class: $options.containerClass,
      style: $props.style
    }, _ctx.ptm('root')), [
      renderSlot(_ctx.$slots, "button", { toggle: $options.onClick }, () => [
        createVNode(_component_SDButton, {
          type: "button",
          class: normalizeClass($options.buttonClassName),
          onClick: _cache[0] || (_cache[0] = $event => ($options.onClick($event))),
          disabled: $props.disabled,
          onKeydown: $options.onTogglerKeydown,
          "aria-expanded": $data.d_visible,
          "aria-haspopup": true,
          "aria-controls": $data.id + '_list',
          "aria-label": _ctx.ariaLabel,
          "aria-labelledby": _ctx.ariaLabelledby,
          pt: _ctx.ptm('button')
        }, {
          icon: withCtx(() => [
            renderSlot(_ctx.$slots, "icon", { visible: $data.d_visible }, () => [
              ($data.d_visible && !!$props.hideIcon)
                ? (openBlock(), createBlock(resolveDynamicComponent($props.hideIcon ? 'span' : 'PlusIcon'), mergeProps({
                    key: 0,
                    class: $props.hideIcon
                  }, _ctx.ptm('button')['icon']), null, 16, ["class"]))
                : (openBlock(), createBlock(resolveDynamicComponent($props.showIcon ? 'span' : 'PlusIcon'), mergeProps({
                    key: 1,
                    class: $props.showIcon
                  }, _ctx.ptm('button')['icon']), null, 16, ["class"]))
            ])
          ]),
          _: 3
        }, 8, ["class", "disabled", "onKeydown", "aria-expanded", "aria-controls", "aria-label", "aria-labelledby", "pt"])
      ]),
      createElementVNode("ul", mergeProps({
        ref: $options.listRef,
        id: $data.id + '_list',
        class: "p-speeddial-list",
        role: "menu",
        onFocus: _cache[1] || (_cache[1] = (...args) => ($options.onFocus && $options.onFocus(...args))),
        onBlur: _cache[2] || (_cache[2] = (...args) => ($options.onBlur && $options.onBlur(...args))),
        onKeydown: _cache[3] || (_cache[3] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args))),
        "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
        tabindex: "-1"
      }, _ctx.ptm('menu')), [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.model, (item, index) => {
          return (openBlock(), createElementBlock(Fragment, { key: index }, [
            ($options.isItemVisible(item))
              ? (openBlock(), createElementBlock("li", mergeProps({
                  key: 0,
                  id: `${$data.id}_${index}`,
                  "aria-controls": `${$data.id}_item`,
                  class: ["p-speeddial-item", $options.itemClass(`${$data.id}_${index}`)],
                  style: $options.getItemStyle(index),
                  role: "menuitem"
                }, $options.getPTOptions(`${$data.id}_${index}`, 'menuitem')), [
                  (!_ctx.$slots.item)
                    ? withDirectives((openBlock(), createElementBlock("a", mergeProps({
                        key: 0,
                        tabindex: -1,
                        href: item.url || '#',
                        role: "menuitem",
                        class: ['p-speeddial-action', { 'p-disabled': item.disabled }],
                        target: item.target,
                        onClick: $event => ($options.onItemClick($event, item)),
                        "aria-label": item.label
                      }, $options.getPTOptions(`${$data.id}_${index}`, 'action')), [
                        (item.icon)
                          ? (openBlock(), createElementBlock("span", mergeProps({
                              key: 0,
                              class: ['p-speeddial-action-icon', item.icon]
                            }, $options.getPTOptions(`${$data.id}_${index}`, 'actionIcon')), null, 16))
                          : createCommentVNode("", true)
                      ], 16, _hoisted_3)), [
                        [_directive_tooltip, { value: item.label, disabled: !$props.tooltipOptions }, $props.tooltipOptions],
                        [_directive_ripple]
                      ])
                    : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
                        key: 1,
                        item: item,
                        onClick: (event) => $options.onItemClick(event, item)
                      }, null, 8, ["item", "onClick"]))
                ], 16, _hoisted_2))
              : createCommentVNode("", true)
          ], 64))
        }), 128))
      ], 16, _hoisted_1)
    ], 16),
    ($props.mask)
      ? (openBlock(), createElementBlock("div", mergeProps({
          key: 0,
          class: $options.maskClassName,
          style: $props.maskStyle
        }, _ctx.ptm('mask')), null, 16))
      : createCommentVNode("", true)
  ], 64))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-speeddial {\n    position: absolute;\n    display: flex;\n}\n.p-speeddial-button {\n    z-index: 1;\n}\n.p-speeddial-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: top 0s linear 0.2s;\n    pointer-events: none;\n    z-index: 2;\n}\n.p-speeddial-item {\n    transform: scale(0);\n    opacity: 0;\n    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.8s;\n    will-change: transform;\n}\n.p-speeddial-action {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 50%;\n    position: relative;\n    overflow: hidden;\n}\n.p-speeddial-circle .p-speeddial-item,\n.p-speeddial-semi-circle .p-speeddial-item,\n.p-speeddial-quarter-circle .p-speeddial-item {\n    position: absolute;\n}\n.p-speeddial-rotate {\n    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n    will-change: transform;\n}\n.p-speeddial-mask {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    transition: opacity 250ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.p-speeddial-mask-visible {\n    pointer-events: none;\n    opacity: 1;\n    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.p-speeddial-opened .p-speeddial-list {\n    pointer-events: auto;\n}\n.p-speeddial-opened .p-speeddial-item {\n    transform: scale(1);\n    opacity: 1;\n}\n.p-speeddial-opened .p-speeddial-rotate {\n    transform: rotate(45deg);\n}\n\n/* Direction */\n.p-speeddial-direction-up {\n    align-items: center;\n    flex-direction: column-reverse;\n}\n.p-speeddial-direction-up .p-speeddial-list {\n    flex-direction: column-reverse;\n}\n.p-speeddial-direction-down {\n    align-items: center;\n    flex-direction: column;\n}\n.p-speeddial-direction-down .p-speeddial-list {\n    flex-direction: column;\n}\n.p-speeddial-direction-left {\n    justify-content: center;\n    flex-direction: row-reverse;\n}\n.p-speeddial-direction-left .p-speeddial-list {\n    flex-direction: row-reverse;\n}\n.p-speeddial-direction-right {\n    justify-content: center;\n    flex-direction: row;\n}\n.p-speeddial-direction-right .p-speeddial-list {\n    flex-direction: row;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
