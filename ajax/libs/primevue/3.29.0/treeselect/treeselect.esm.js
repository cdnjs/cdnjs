import BaseComponent from 'primevue/basecomponent';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import OverlayEventBus from 'primevue/overlayeventbus';
import Portal from 'primevue/portal';
import Ripple from 'primevue/ripple';
import Tree from 'primevue/tree';
import { ZIndexUtils, DomHandler, ConnectedOverlayScrollHandler, UniqueComponentId } from 'primevue/utils';
import { resolveComponent, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, Fragment, createTextVNode, toDisplayString, renderList, createCommentVNode, createBlock, resolveDynamicComponent, createVNode, withCtx, Transition, createSlots, normalizeClass } from 'vue';

var script = {
    name: 'TreeSelect',
    extends: BaseComponent,
    emits: ['update:modelValue', 'before-show', 'before-hide', 'change', 'show', 'hide', 'node-select', 'node-unselect', 'node-expand', 'node-collapse', 'focus', 'blur'],
    props: {
        modelValue: null,
        options: Array,
        scrollHeight: {
            type: String,
            default: '400px'
        },
        placeholder: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tabindex: {
            type: Number,
            default: null
        },
        selectionMode: {
            type: String,
            default: 'single'
        },
        appendTo: {
            type: String,
            default: 'body'
        },
        emptyMessage: {
            type: String,
            default: null
        },
        display: {
            type: String,
            default: 'comma'
        },
        metaKeySelection: {
            type: Boolean,
            default: true
        },
        inputId: {
            type: String,
            default: null
        },
        inputClass: {
            type: [String, Object],
            default: null
        },
        inputStyle: {
            type: Object,
            default: null
        },
        inputProps: {
            type: null,
            default: null
        },
        panelClass: {
            type: [String, Object],
            default: null
        },
        panelProps: {
            type: null,
            default: null
        },
        'aria-labelledby': {
            type: String,
            default: null
        },
        'aria-label': {
            type: String,
            default: null
        }
    },
    data() {
        return {
            focused: false,
            overlayVisible: false,
            expandedKeys: {}
        };
    },
    watch: {
        modelValue: {
            handler: function () {
                if (!this.selfChange) {
                    this.updateTreeState();
                }

                this.selfChange = false;
            },
            immediate: true
        },
        options() {
            this.updateTreeState();
        }
    },
    outsideClickListener: null,
    resizeListener: null,
    scrollHandler: null,
    overlay: null,
    selfChange: false,
    selfClick: false,
    beforeUnmount() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.overlay) {
            ZIndexUtils.clear(this.overlay);
            this.overlay = null;
        }
    },
    mounted() {
        this.updateTreeState();
    },
    methods: {
        show() {
            this.$emit('before-show');
            this.overlayVisible = true;
        },
        hide() {
            this.$emit('before-hide');
            this.overlayVisible = false;
            this.$refs.focusInput.focus();
        },
        onFocus(event) {
            this.focused = true;
            this.$emit('focus', event);
        },
        onBlur(event) {
            this.focused = false;
            this.$emit('blur', event);
        },
        onClick(event) {
            if (!this.disabled && (!this.overlay || !this.overlay.contains(event.target)) && !DomHandler.hasClass(event.target, 'p-treeselect-close')) {
                if (this.overlayVisible) this.hide();
                else this.show();

                this.$refs.focusInput.focus();
            }
        },
        onSelectionChange(keys) {
            this.selfChange = true;
            this.$emit('update:modelValue', keys);
            this.$emit('change', keys);
        },
        onNodeSelect(node) {
            this.$emit('node-select', node);

            if (this.selectionMode === 'single') {
                this.hide();
            }
        },
        onNodeUnselect(node) {
            this.$emit('node-unselect', node);
        },
        onNodeToggle(keys) {
            this.expandedKeys = keys;
        },
        onKeyDown(event) {
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
        onArrowDownKey(event) {
            if (this.overlayVisible) return;

            this.show();

            this.$nextTick(() => {
                const treeNodeEl = DomHandler.find(this.$refs.tree.$el, '.p-treenode');
                const focusedElement = [...treeNodeEl].find((item) => item.getAttribute('tabindex') === '0');

                DomHandler.focus(focusedElement);
            });

            event.preventDefault();
        },
        onEnterKey(event) {
            if (this.overlayVisible) {
                this.hide();
            } else {
                this.onArrowDownKey(event);
            }

            event.preventDefault();
        },
        onEscapeKey(event) {
            if (this.overlayVisible) {
                this.hide();
                event.preventDefault();
            }
        },
        onOverlayEnter(el) {
            ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
            this.alignOverlay();
            this.bindOutsideClickListener();
            this.bindScrollListener();
            this.bindResizeListener();
            this.scrollValueInView();
            this.$emit('show');
        },
        onOverlayLeave() {
            this.unbindOutsideClickListener();
            this.unbindScrollListener();
            this.unbindResizeListener();
            this.$emit('hide');
            this.overlay = null;
        },
        onOverlayAfterLeave(el) {
            ZIndexUtils.clear(el);
        },
        alignOverlay() {
            if (this.appendTo === 'self') {
                DomHandler.relativePosition(this.overlay, this.$el);
            } else {
                this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + 'px';
                DomHandler.absolutePosition(this.overlay, this.$el);
            }
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.overlayVisible && !this.selfClick && this.isOutsideClicked(event)) {
                        this.hide();
                    }

                    this.selfClick = false;
                };

                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        },
        bindScrollListener() {
            if (!this.scrollHandler) {
                this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
                    if (this.overlayVisible) {
                        this.hide();
                    }
                });
            }

            this.scrollHandler.bindScrollListener();
        },
        unbindScrollListener() {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        },
        bindResizeListener() {
            if (!this.resizeListener) {
                this.resizeListener = () => {
                    if (this.overlayVisible && !DomHandler.isTouchDevice()) {
                        this.hide();
                    }
                };

                window.addEventListener('resize', this.resizeListener);
            }
        },
        unbindResizeListener() {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.resizeListener = null;
            }
        },
        isOutsideClicked(event) {
            return !(this.$el.isSameNode(event.target) || this.$el.contains(event.target) || (this.overlay && this.overlay.contains(event.target)));
        },
        overlayRef(el) {
            this.overlay = el;
        },
        onOverlayClick(event) {
            OverlayEventBus.emit('overlay-click', {
                originalEvent: event,
                target: this.$el
            });

            this.selfClick = true;
        },
        onOverlayKeydown(event) {
            if (event.code === 'Escape') this.hide();
        },
        findSelectedNodes(node, keys, selectedNodes) {
            if (node) {
                if (this.isSelected(node, keys)) {
                    selectedNodes.push(node);
                    delete keys[node.key];
                }

                if (Object.keys(keys).length && node.children) {
                    for (let childNode of node.children) {
                        this.findSelectedNodes(childNode, keys, selectedNodes);
                    }
                }
            } else {
                for (let childNode of this.options) {
                    this.findSelectedNodes(childNode, keys, selectedNodes);
                }
            }
        },
        isSelected(node, keys) {
            return this.selectionMode === 'checkbox' ? keys[node.key] && keys[node.key].checked : keys[node.key];
        },
        updateTreeState() {
            let keys = { ...this.modelValue };

            this.expandedKeys = {};

            if (keys && this.options) {
                this.updateTreeBranchState(null, null, keys);
            }
        },
        updateTreeBranchState(node, path, keys) {
            if (node) {
                if (this.isSelected(node, keys)) {
                    this.expandPath(path);
                    delete keys[node.key];
                }

                if (Object.keys(keys).length && node.children) {
                    for (let childNode of node.children) {
                        path.push(node.key);
                        this.updateTreeBranchState(childNode, path, keys);
                    }
                }
            } else {
                for (let childNode of this.options) {
                    this.updateTreeBranchState(childNode, [], keys);
                }
            }
        },
        expandPath(path) {
            if (path.length > 0) {
                for (let key of path) {
                    this.expandedKeys[key] = true;
                }
            }
        },
        scrollValueInView() {
            if (this.overlay) {
                let selectedItem = DomHandler.findSingle(this.overlay, 'li.p-highlight');

                if (selectedItem) {
                    selectedItem.scrollIntoView({ block: 'nearest', inline: 'start' });
                }
            }
        }
    },
    computed: {
        containerClass() {
            return [
                'p-treeselect p-component p-inputwrapper',
                {
                    'p-treeselect-chip': this.display === 'chip',
                    'p-disabled': this.disabled,
                    'p-focus': this.focused,
                    'p-inputwrapper-filled': !this.emptyValue,
                    'p-inputwrapper-focus': this.focused || this.overlayVisible
                }
            ];
        },
        labelClass() {
            return [
                'p-treeselect-label',
                {
                    'p-placeholder': this.label === this.placeholder,
                    'p-treeselect-label-empty': !this.placeholder && this.emptyValue
                }
            ];
        },
        panelStyleClass() {
            return [
                'p-treeselect-panel p-component',
                this.panelClass,
                {
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false
                }
            ];
        },
        selectedNodes() {
            let selectedNodes = [];

            if (this.modelValue && this.options) {
                let keys = { ...this.modelValue };

                this.findSelectedNodes(null, keys, selectedNodes);
            }

            return selectedNodes;
        },
        label() {
            let value = this.selectedNodes;

            return value.length ? value.map((node) => node.label).join(', ') : this.placeholder;
        },
        emptyMessageText() {
            return this.emptyMessage || this.$primevue.config.locale.emptyMessage;
        },
        emptyValue() {
            return !this.modelValue || Object.keys(this.modelValue).length === 0;
        },
        emptyOptions() {
            return !this.options || this.options.length === 0;
        },
        listId() {
            return UniqueComponentId() + '_list';
        }
    },
    components: {
        TSTree: Tree,
        Portal: Portal,
        ChevronDownIcon: ChevronDownIcon
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1 = ["id", "disabled", "tabindex", "aria-labelledby", "aria-label", "aria-expanded", "aria-controls"];
const _hoisted_2 = ["aria-expanded"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TSTree = resolveComponent("TSTree");
  const _component_Portal = resolveComponent("Portal");

  return (openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    class: $options.containerClass,
    onClick: _cache[7] || (_cache[7] = (...args) => ($options.onClick && $options.onClick(...args)))
  }, _ctx.ptm('root')), [
    createElementVNode("div", mergeProps({ class: "p-hidden-accessible" }, _ctx.ptm('hiddenInputWrapper')), [
      createElementVNode("input", mergeProps({
        ref: "focusInput",
        id: $props.inputId,
        type: "text",
        role: "combobox",
        class: $props.inputClass,
        style: $props.inputStyle,
        readonly: "",
        disabled: $props.disabled,
        tabindex: !$props.disabled ? $props.tabindex : -1,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        "aria-haspopup": "tree",
        "aria-expanded": $data.overlayVisible,
        "aria-controls": $options.listId,
        onFocus: _cache[0] || (_cache[0] = $event => ($options.onFocus($event))),
        onBlur: _cache[1] || (_cache[1] = $event => ($options.onBlur($event))),
        onKeydown: _cache[2] || (_cache[2] = $event => ($options.onKeyDown($event)))
      }, { ...$props.inputProps, ..._ctx.ptm('hiddenInput') }), null, 16, _hoisted_1)
    ], 16),
    createElementVNode("div", mergeProps({ class: "p-treeselect-label-container" }, _ctx.ptm('labelContainer')), [
      createElementVNode("div", mergeProps({ class: $options.labelClass }, _ctx.ptm('label')), [
        renderSlot(_ctx.$slots, "value", {
          value: $options.selectedNodes,
          placeholder: $props.placeholder
        }, () => [
          ($props.display === 'comma')
            ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString($options.label || 'empty'), 1)
              ], 64))
            : ($props.display === 'chip')
              ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($options.selectedNodes, (node) => {
                    return (openBlock(), createElementBlock("div", mergeProps({
                      key: node.key,
                      class: "p-treeselect-token"
                    }, _ctx.ptm('token')), [
                      createElementVNode("span", mergeProps({ class: "p-treeselect-token-label" }, _ctx.ptm('tokenLabel')), toDisplayString(node.label), 17)
                    ], 16))
                  }), 128)),
                  ($options.emptyValue)
                    ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        createTextVNode(toDisplayString($props.placeholder || 'empty'), 1)
                      ], 64))
                    : createCommentVNode("", true)
                ], 64))
              : createCommentVNode("", true)
        ])
      ], 16)
    ], 16),
    createElementVNode("div", mergeProps({
      class: "p-treeselect-trigger",
      role: "button",
      "aria-haspopup": "tree",
      "aria-expanded": $data.overlayVisible
    }, _ctx.ptm('trigger')), [
      renderSlot(_ctx.$slots, "triggericon", {}, () => [
        (openBlock(), createBlock(resolveDynamicComponent('ChevronDownIcon'), mergeProps({ class: "p-treeselect-trigger-icon" }, _ctx.ptm('triggerIcon')), null, 16))
      ])
    ], 16, _hoisted_2),
    createVNode(_component_Portal, { appendTo: $props.appendTo }, {
      default: withCtx(() => [
        createVNode(Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: withCtx(() => [
            ($data.overlayVisible)
              ? (openBlock(), createElementBlock("div", mergeProps({
                  key: 0,
                  ref: $options.overlayRef,
                  onClick: _cache[5] || (_cache[5] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args))),
                  class: $options.panelStyleClass,
                  onKeydown: _cache[6] || (_cache[6] = (...args) => ($options.onOverlayKeydown && $options.onOverlayKeydown(...args)))
                }, { ...$props.panelProps, ..._ctx.ptm('panel') }), [
                  renderSlot(_ctx.$slots, "header", {
                    value: $props.modelValue,
                    options: $props.options
                  }),
                  createElementVNode("div", mergeProps({
                    class: "p-treeselect-items-wrapper",
                    style: { 'max-height': $props.scrollHeight }
                  }, _ctx.ptm('wrapper')), [
                    createVNode(_component_TSTree, {
                      ref: "tree",
                      id: $options.listId,
                      value: $props.options,
                      selectionMode: $props.selectionMode,
                      "onUpdate:selectionKeys": $options.onSelectionChange,
                      selectionKeys: $props.modelValue,
                      expandedKeys: $data.expandedKeys,
                      "onUpdate:expandedKeys": $options.onNodeToggle,
                      metaKeySelection: $props.metaKeySelection,
                      onNodeExpand: _cache[3] || (_cache[3] = $event => (_ctx.$emit('node-expand', $event))),
                      onNodeCollapse: _cache[4] || (_cache[4] = $event => (_ctx.$emit('node-collapse', $event))),
                      onNodeSelect: $options.onNodeSelect,
                      onNodeUnselect: $options.onNodeUnselect,
                      level: 0,
                      pt: _ctx.ptm('tree')
                    }, createSlots({ _: 2 }, [
                      (_ctx.$slots.itemtogglericon)
                        ? {
                            name: "togglericon",
                            fn: withCtx((iconProps) => [
                              renderSlot(_ctx.$slots, "itemtogglericon", {
                                node: iconProps.node,
                                expanded: iconProps.expanded,
                                class: normalizeClass(iconProps.class)
                              })
                            ]),
                            key: "0"
                          }
                        : undefined,
                      (_ctx.$slots.itemcheckboxicon)
                        ? {
                            name: "checkboxicon",
                            fn: withCtx((iconProps) => [
                              renderSlot(_ctx.$slots, "itemcheckboxicon", {
                                checked: iconProps.checked,
                                partialChecked: iconProps.partialChecked,
                                class: normalizeClass(iconProps.class)
                              })
                            ]),
                            key: "1"
                          }
                        : undefined
                    ]), 1032, ["id", "value", "selectionMode", "onUpdate:selectionKeys", "selectionKeys", "expandedKeys", "onUpdate:expandedKeys", "metaKeySelection", "onNodeSelect", "onNodeUnselect", "pt"]),
                    ($options.emptyOptions)
                      ? (openBlock(), createElementBlock("div", mergeProps({
                          key: 0,
                          class: "p-treeselect-empty-message"
                        }, _ctx.ptm('emptyMessage')), [
                          renderSlot(_ctx.$slots, "empty", {}, () => [
                            createTextVNode(toDisplayString($options.emptyMessageText), 1)
                          ])
                        ], 16))
                      : createCommentVNode("", true)
                  ], 16),
                  renderSlot(_ctx.$slots, "footer", {
                    value: $props.modelValue,
                    options: $props.options
                  })
                ], 16))
              : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 3
    }, 8, ["appendTo"])
  ], 16))
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

var css_248z = "\n.p-treeselect {\n    display: inline-flex;\n    cursor: pointer;\n    position: relative;\n    user-select: none;\n}\n.p-treeselect-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n}\n.p-treeselect-label-container {\n    overflow: hidden;\n    flex: 1 1 auto;\n    cursor: pointer;\n}\n.p-treeselect-label {\n    display: block;\n    white-space: nowrap;\n    cursor: pointer;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n.p-treeselect-label-empty {\n    overflow: hidden;\n    visibility: hidden;\n}\n.p-treeselect-token {\n    cursor: default;\n    display: inline-flex;\n    align-items: center;\n    flex: 0 0 auto;\n}\n.p-treeselect .p-treeselect-panel {\n    min-width: 100%;\n}\n.p-treeselect-panel {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-treeselect-items-wrapper {\n    overflow: auto;\n}\n.p-fluid .p-treeselect {\n    display: flex;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
