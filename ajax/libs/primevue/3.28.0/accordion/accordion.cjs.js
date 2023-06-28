'use strict';

var BaseComponent = require('primevue/basecomponent');
var ChevronDownIcon = require('primevue/icons/chevrondown');
var ChevronRightIcon = require('primevue/icons/chevronright');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script = {
    name: 'Accordion',
    extends: BaseComponent__default["default"],
    emits: ['update:activeIndex', 'tab-open', 'tab-close', 'tab-click'],
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        activeIndex: {
            type: [Number, Array],
            default: null
        },
        lazy: {
            type: Boolean,
            default: false
        },
        expandIcon: {
            type: String,
            default: undefined
        },
        collapseIcon: {
            type: String,
            default: undefined
        },
        tabindex: {
            type: Number,
            default: 0
        },
        selectOnFocus: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            id: this.$attrs.id,
            d_activeIndex: this.activeIndex
        };
    },
    watch: {
        '$attrs.id': function (newValue) {
            this.id = newValue || utils.UniqueComponentId();
        },
        activeIndex(newValue) {
            this.d_activeIndex = newValue;
        }
    },
    mounted() {
        this.id = this.id || utils.UniqueComponentId();
    },
    methods: {
        isAccordionTab(child) {
            return child.type.name === 'AccordionTab';
        },
        isTabActive(index) {
            return this.multiple ? this.d_activeIndex && this.d_activeIndex.includes(index) : this.d_activeIndex === index;
        },
        getTabProp(tab, name) {
            return tab.props ? tab.props[name] : undefined;
        },
        getKey(tab, index) {
            return this.getTabProp(tab, 'header') || index;
        },
        getTabHeaderActionId(index) {
            return `${this.id}_${index}_header_action`;
        },
        getTabContentId(index) {
            return `${this.id}_${index}_content`;
        },
        getTabPT(tab, key) {
            return this.ptmo(this.getTabProp(tab, 'pt'), key, {
                props: tab.props,
                parent: {
                    props: this.$props,
                    state: this.$data
                }
            });
        },
        onTabClick(event, tab, index) {
            this.changeActiveIndex(event, tab, index);
            this.$emit('tab-click', { originalEvent: event, index });
        },
        onTabKeyDown(event, tab, index) {
            switch (event.code) {
                case 'ArrowDown':
                    this.onTabArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    this.onTabArrowUpKey(event);
                    break;

                case 'Home':
                    this.onTabHomeKey(event);
                    break;

                case 'End':
                    this.onTabEndKey(event);
                    break;

                case 'Enter':
                case 'Space':
                    this.onTabEnterKey(event, tab, index);
                    break;
            }
        },
        onTabArrowDownKey(event) {
            const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement.parentElement);

            nextHeaderAction ? this.changeFocusedTab(event, nextHeaderAction) : this.onTabHomeKey(event);
            event.preventDefault();
        },
        onTabArrowUpKey(event) {
            const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement.parentElement);

            prevHeaderAction ? this.changeFocusedTab(event, prevHeaderAction) : this.onTabEndKey(event);
            event.preventDefault();
        },
        onTabHomeKey(event) {
            const firstHeaderAction = this.findFirstHeaderAction();

            this.changeFocusedTab(event, firstHeaderAction);
            event.preventDefault();
        },
        onTabEndKey(event) {
            const lastHeaderAction = this.findLastHeaderAction();

            this.changeFocusedTab(event, lastHeaderAction);
            event.preventDefault();
        },
        onTabEnterKey(event, tab, index) {
            this.changeActiveIndex(event, tab, index);

            event.preventDefault();
        },
        findNextHeaderAction(tabElement, selfCheck = false) {
            const nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
            const headerElement = utils.DomHandler.findSingle(nextTabElement, '.p-accordion-header');

            return headerElement ? (utils.DomHandler.hasClass(headerElement, 'p-disabled') ? this.findNextHeaderAction(headerElement.parentElement) : utils.DomHandler.findSingle(headerElement, '.p-accordion-header-action')) : null;
        },
        findPrevHeaderAction(tabElement, selfCheck = false) {
            const prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
            const headerElement = utils.DomHandler.findSingle(prevTabElement, '.p-accordion-header');

            return headerElement ? (utils.DomHandler.hasClass(headerElement, 'p-disabled') ? this.findPrevHeaderAction(headerElement.parentElement) : utils.DomHandler.findSingle(headerElement, '.p-accordion-header-action')) : null;
        },
        findFirstHeaderAction() {
            return this.findNextHeaderAction(this.$el.firstElementChild, true);
        },
        findLastHeaderAction() {
            return this.findPrevHeaderAction(this.$el.lastElementChild, true);
        },
        changeActiveIndex(event, tab, index) {
            if (!this.getTabProp(tab, 'disabled')) {
                const active = this.isTabActive(index);
                const eventName = active ? 'tab-close' : 'tab-open';

                if (this.multiple) {
                    if (active) {
                        this.d_activeIndex = this.d_activeIndex.filter((i) => i !== index);
                    } else {
                        if (this.d_activeIndex) this.d_activeIndex.push(index);
                        else this.d_activeIndex = [index];
                    }
                } else {
                    this.d_activeIndex = this.d_activeIndex === index ? null : index;
                }

                this.$emit('update:activeIndex', this.d_activeIndex);
                this.$emit(eventName, { originalEvent: event, index });
            }
        },
        changeFocusedTab(event, element) {
            if (element) {
                utils.DomHandler.focus(element);

                if (this.selectOnFocus) {
                    const index = parseInt(element.parentElement.parentElement.dataset.index, 10);
                    const tab = this.tabs[index];

                    this.changeActiveIndex(event, tab, index);
                }
            }
        },
        getTabClass(i) {
            return [
                'p-accordion-tab',
                {
                    'p-accordion-tab-active': this.isTabActive(i)
                }
            ];
        },
        getTabHeaderClass(tab, i) {
            return [
                'p-accordion-header',
                this.getTabProp(tab, 'headerClass'),
                {
                    'p-highlight': this.isTabActive(i),
                    'p-disabled': this.getTabProp(tab, 'disabled')
                }
            ];
        },
        getTabContentClass(tab) {
            return ['p-toggleable-content', this.getTabProp(tab, 'contentClass')];
        }
    },
    computed: {
        tabs() {
            return this.$slots.default().reduce((tabs, child) => {
                if (this.isAccordionTab(child)) {
                    tabs.push(child);
                } else if (child.children && child.children instanceof Array) {
                    child.children.forEach((nestedChild) => {
                        if (this.isAccordionTab(nestedChild)) {
                            tabs.push(nestedChild);
                        }
                    });
                }

                return tabs;
            }, []);
        }
    },
    components: {
        ChevronDownIcon: ChevronDownIcon__default["default"],
        ChevronRightIcon: ChevronRightIcon__default["default"]
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

const _hoisted_1 = ["data-index"];
const _hoisted_2 = ["id", "tabindex", "aria-disabled", "aria-expanded", "aria-controls", "onClick", "onKeydown"];
const _hoisted_3 = ["id", "aria-labelledby"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: "p-accordion p-component" }, _ctx.ptm('root')), [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.tabs, (tab, i) => {
      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: $options.getKey(tab, i),
        class: $options.getTabClass(i),
        "data-index": i
      }, $options.getTabPT(tab, 'root')), [
        vue.createElementVNode("div", vue.mergeProps({
          style: $options.getTabProp(tab, 'headerStyle'),
          class: $options.getTabHeaderClass(tab, i)
        }, { ...$options.getTabProp(tab, 'headerProps'), ...$options.getTabPT(tab, 'header') }), [
          vue.createElementVNode("a", vue.mergeProps({
            id: $options.getTabHeaderActionId(i),
            class: "p-accordion-header-link p-accordion-header-action",
            tabindex: $options.getTabProp(tab, 'disabled') ? -1 : $props.tabindex,
            role: "button",
            "aria-disabled": $options.getTabProp(tab, 'disabled'),
            "aria-expanded": $options.isTabActive(i),
            "aria-controls": $options.getTabContentId(i),
            onClick: $event => ($options.onTabClick($event, tab, i)),
            onKeydown: $event => ($options.onTabKeyDown($event, tab, i))
          }, { ...$options.getTabProp(tab, 'headeractionprops'), ...$options.getTabPT(tab, 'headeraction') }), [
            (tab.children && tab.children.headericon)
              ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(tab.children.headericon), {
                  key: 0,
                  isTabActive: $options.isTabActive(i),
                  index: i
                }, null, 8, ["isTabActive", "index"]))
              : ($options.isTabActive(i))
                ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.collapseIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
                    key: 1,
                    class: ['p-accordion-toggle-icon', $props.collapseIcon],
                    "aria-hidden": "true"
                  }, $options.getTabPT(tab, 'headericon')), null, 16, ["class"]))
                : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.expandIcon ? 'span' : 'ChevronRightIcon'), vue.mergeProps({
                    key: 2,
                    class: ['p-accordion-toggle-icon', $props.expandIcon],
                    "aria-hidden": "true"
                  }, $options.getTabPT(tab, 'headericon')), null, 16, ["class"])),
            (tab.props && tab.props.header)
              ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                  key: 3,
                  class: "p-accordion-header-text"
                }, $options.getTabPT(tab, 'headertitle')), vue.toDisplayString(tab.props.header), 17))
              : vue.createCommentVNode("", true),
            (tab.children && tab.children.header)
              ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(tab.children.header), { key: 4 }))
              : vue.createCommentVNode("", true)
          ], 16, _hoisted_2)
        ], 16),
        vue.createVNode(vue.Transition, { name: "p-toggleable-content" }, {
          default: vue.withCtx(() => [
            ($props.lazy ? $options.isTabActive(i) : true)
              ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 0,
                  id: $options.getTabContentId(i),
                  style: $options.getTabProp(tab, 'contentStyle'),
                  class: $options.getTabContentClass(tab),
                  role: "region",
                  "aria-labelledby": $options.getTabHeaderActionId(i)
                }, { ...$options.getTabProp(tab, 'contentProps'), ...$options.getTabPT(tab, 'toggleablecontent') }), [
                  vue.createElementVNode("div", vue.mergeProps({ class: "p-accordion-content" }, $options.getTabPT(tab, 'content')), [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(tab)))
                  ], 16)
                ], 16, _hoisted_3)), [
                  [vue.vShow, $props.lazy ? true : $options.isTabActive(i)]
                ])
              : vue.createCommentVNode("", true)
          ]),
          _: 2
        }, 1024)
      ], 16, _hoisted_1))
    }), 128))
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

var css_248z = "\n.p-accordion-header-action {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    user-select: none;\n    position: relative;\n    text-decoration: none;\n}\n.p-accordion-header-action:focus {\n    z-index: 1;\n}\n.p-accordion-header-text {\n    line-height: 1;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
