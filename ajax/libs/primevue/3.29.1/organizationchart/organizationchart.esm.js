import BaseComponent from 'primevue/basecomponent';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import ChevronUpIcon from 'primevue/icons/chevronup';
import { DomHandler } from 'primevue/utils';
import { resolveComponent, openBlock, createElementBlock, mergeProps, createElementVNode, normalizeProps, guardReactiveProps, createBlock, resolveDynamicComponent, createCommentVNode, Fragment, renderList, createVNode } from 'vue';

var script$1 = {
    name: 'OrganizationChartNode',
    extends: BaseComponent,
    emits: ['node-click', 'node-toggle'],
    props: {
        node: {
            type: null,
            default: null
        },
        templates: {
            type: null,
            default: null
        },
        collapsible: {
            type: Boolean,
            default: false
        },
        collapsedKeys: {
            type: null,
            default: null
        },
        selectionKeys: {
            type: null,
            default: null
        },
        selectionMode: {
            type: String,
            default: null
        }
    },
    methods: {
        getPTOptions(key) {
            return this.ptm(key, {
                context: {
                    expanded: this.expanded,
                    selectable: this.selectable,
                    selected: this.selected,
                    toggleable: this.toggleable,
                    active: this.selected
                }
            });
        },
        getNodeOptions(lineTop, key) {
            return this.ptm(key, {
                context: {
                    lineTop
                }
            });
        },
        onNodeClick(event) {
            if (DomHandler.hasClass(event.target, 'p-node-toggler') || DomHandler.hasClass(event.target, 'p-node-toggler-icon')) {
                return;
            }

            if (this.selectionMode) {
                this.$emit('node-click', this.node);
            }
        },
        onChildNodeClick(node) {
            this.$emit('node-click', node);
        },
        toggleNode() {
            this.$emit('node-toggle', this.node);
        },
        onChildNodeToggle(node) {
            this.$emit('node-toggle', node);
        },
        onKeydown(event) {
            if (event.code === 'Enter' || event.code === 'Space') {
                this.toggleNode();
                event.preventDefault();
            }
        }
    },
    computed: {
        nodeContentClass() {
            return ['p-organizationchart-node-content', this.node.styleClass, { 'p-organizationchart-selectable-node': this.selectable, 'p-highlight': this.selected }];
        },
        leaf() {
            return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
        },
        colspan() {
            return this.node.children && this.node.children.length ? this.node.children.length * 2 : null;
        },
        childStyle() {
            return {
                visibility: !this.leaf && this.expanded ? 'inherit' : 'hidden'
            };
        },
        expanded() {
            return this.collapsedKeys[this.node.key] === undefined;
        },
        selectable() {
            return this.selectionMode && this.node.selectable !== false;
        },
        selected() {
            return this.selectable && this.selectionKeys && this.selectionKeys[this.node.key] === true;
        },
        toggleable() {
            return this.collapsible && this.node.collapsible !== false && !this.leaf;
        }
    },
    components: {
        ChevronDownIcon: ChevronDownIcon,
        ChevronUpIcon: ChevronUpIcon
    }
};

const _hoisted_1 = ["colspan"];
const _hoisted_2 = ["colspan"];
const _hoisted_3 = ["colspan"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_OrganizationChartNode = resolveComponent("OrganizationChartNode", true);

  return (openBlock(), createElementBlock("table", mergeProps({ class: "p-organizationchart-table" }, _ctx.ptm('table')), [
    createElementVNode("tbody", normalizeProps(guardReactiveProps(_ctx.ptm('body'))), [
      ($props.node)
        ? (openBlock(), createElementBlock("tr", normalizeProps(mergeProps({ key: 0 }, _ctx.ptm('row'))), [
            createElementVNode("td", mergeProps({ colspan: $options.colspan }, _ctx.ptm('cell')), [
              createElementVNode("div", mergeProps({
                class: $options.nodeContentClass,
                onClick: _cache[2] || (_cache[2] = (...args) => ($options.onNodeClick && $options.onNodeClick(...args)))
              }, $options.getPTOptions('node')), [
                (openBlock(), createBlock(resolveDynamicComponent($props.templates[$props.node.type] || $props.templates['default']), { node: $props.node }, null, 8, ["node"])),
                ($options.toggleable)
                  ? (openBlock(), createElementBlock("a", mergeProps({
                      key: 0,
                      tabindex: "0",
                      class: "p-node-toggler",
                      onClick: _cache[0] || (_cache[0] = (...args) => ($options.toggleNode && $options.toggleNode(...args))),
                      onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onKeydown && $options.onKeydown(...args)))
                    }, $options.getPTOptions('nodeToggler')), [
                      ($props.templates.togglericon)
                        ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.togglericon), {
                            key: 0,
                            expanded: $options.expanded,
                            class: "p-node-toggler-icon"
                          }, null, 8, ["expanded"]))
                        : (openBlock(), createBlock(resolveDynamicComponent($options.expanded ? 'ChevronDownIcon' : 'ChevronUpIcon'), mergeProps({
                            key: 1,
                            class: "p-node-toggler-icon"
                          }, $options.getPTOptions('nodeTogglerIcon')), null, 16))
                    ], 16))
                  : createCommentVNode("", true)
              ], 16)
            ], 16, _hoisted_1)
          ], 16))
        : createCommentVNode("", true),
      createElementVNode("tr", mergeProps({
        style: $options.childStyle,
        class: "p-organizationchart-lines"
      }, _ctx.ptm('lines')), [
        createElementVNode("td", { colspan: $options.colspan }, [
          createElementVNode("div", mergeProps({ class: "p-organizationchart-line-down" }, _ctx.ptm('lineDown')), null, 16)
        ], 8, _hoisted_2)
      ], 16),
      createElementVNode("tr", mergeProps({
        style: $options.childStyle,
        class: "p-organizationchart-lines"
      }, _ctx.ptm('lines')), [
        ($props.node.children && $props.node.children.length === 1)
          ? (openBlock(), createElementBlock("td", mergeProps({
              key: 0,
              colspan: $options.colspan
            }, _ctx.ptm('lineCell')), [
              createElementVNode("div", mergeProps({ class: "p-organizationchart-line-down" }, _ctx.ptm('lineDown')), null, 16)
            ], 16, _hoisted_3))
          : createCommentVNode("", true),
        ($props.node.children && $props.node.children.length > 1)
          ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList($props.node.children, (child, i) => {
              return (openBlock(), createElementBlock(Fragment, {
                key: child.key
              }, [
                createElementVNode("td", mergeProps({
                  class: ["p-organizationchart-line-left", { 'p-organizationchart-line-top': !(i === 0) }]
                }, $options.getNodeOptions(!(i === 0), 'lineLeft')), " ", 16),
                createElementVNode("td", mergeProps({
                  class: ["p-organizationchart-line-right", { 'p-organizationchart-line-top': !(i === $props.node.children.length - 1) }]
                }, $options.getNodeOptions(!(i === $props.node.children.length - 1), 'lineRight')), " ", 16)
              ], 64))
            }), 128))
          : createCommentVNode("", true)
      ], 16),
      createElementVNode("tr", mergeProps({
        style: $options.childStyle,
        class: "p-organizationchart-nodes"
      }, _ctx.ptm('nodes')), [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.node.children, (child) => {
          return (openBlock(), createElementBlock("td", mergeProps({
            key: child.key,
            colspan: "2"
          }, _ctx.ptm('nodeCell')), [
            createVNode(_component_OrganizationChartNode, {
              node: child,
              templates: $props.templates,
              collapsedKeys: $props.collapsedKeys,
              onNodeToggle: $options.onChildNodeToggle,
              collapsible: $props.collapsible,
              selectionMode: $props.selectionMode,
              selectionKeys: $props.selectionKeys,
              onNodeClick: $options.onChildNodeClick,
              pt: _ctx.pt
            }, null, 8, ["node", "templates", "collapsedKeys", "onNodeToggle", "collapsible", "selectionMode", "selectionKeys", "onNodeClick", "pt"])
          ], 16))
        }), 128))
      ], 16)
    ], 16)
  ], 16))
}

script$1.render = render$1;

var script = {
    name: 'OrganizationChart',
    extends: BaseComponent,
    emits: ['node-unselect', 'node-select', 'update:selectionKeys', 'node-expand', 'node-collapse', 'update:collapsedKeys'],
    props: {
        value: {
            type: null,
            default: null
        },
        selectionKeys: {
            type: null,
            default: null
        },
        selectionMode: {
            type: String,
            default: null
        },
        collapsible: {
            type: Boolean,
            default: false
        },
        collapsedKeys: {
            type: null,
            default: null
        }
    },
    data() {
        return {
            d_collapsedKeys: this.collapsedKeys || {}
        };
    },
    watch: {
        collapsedKeys(newValue) {
            this.d_collapsedKeys = newValue;
        }
    },
    methods: {
        onNodeClick(node) {
            const key = node.key;

            if (this.selectionMode) {
                let _selectionKeys = this.selectionKeys ? { ...this.selectionKeys } : {};

                if (_selectionKeys[key]) {
                    delete _selectionKeys[key];
                    this.$emit('node-unselect', node);
                } else {
                    if (this.selectionMode === 'single') {
                        _selectionKeys = {};
                    }

                    _selectionKeys[key] = true;
                    this.$emit('node-select', node);
                }

                this.$emit('update:selectionKeys', _selectionKeys);
            }
        },
        onNodeToggle(node) {
            const key = node.key;

            if (this.d_collapsedKeys[key]) {
                delete this.d_collapsedKeys[key];
                this.$emit('node-expand', node);
            } else {
                this.d_collapsedKeys[key] = true;
                this.$emit('node-collapse', node);
            }

            this.d_collapsedKeys = { ...this.d_collapsedKeys };
            this.$emit('update:collapsedKeys', this.d_collapsedKeys);
        }
    },
    components: {
        OrganizationChartNode: script$1
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_OrganizationChartNode = resolveComponent("OrganizationChartNode");

  return (openBlock(), createElementBlock("div", mergeProps({ class: "p-organizationchart p-component" }, _ctx.ptm('root')), [
    createVNode(_component_OrganizationChartNode, {
      node: $props.value,
      templates: _ctx.$slots,
      onNodeToggle: $options.onNodeToggle,
      collapsedKeys: $data.d_collapsedKeys,
      collapsible: $props.collapsible,
      onNodeClick: $options.onNodeClick,
      selectionMode: $props.selectionMode,
      selectionKeys: $props.selectionKeys,
      pt: _ctx.pt
    }, null, 8, ["node", "templates", "onNodeToggle", "collapsedKeys", "collapsible", "onNodeClick", "selectionMode", "selectionKeys", "pt"])
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

var css_248z = "\n.p-organizationchart-table {\n    border-spacing: 0;\n    border-collapse: separate;\n    margin: 0 auto;\n}\n.p-organizationchart-table > tbody > tr > td {\n    text-align: center;\n    vertical-align: top;\n    padding: 0 0.75rem;\n}\n.p-organizationchart-node-content {\n    display: inline-block;\n    position: relative;\n}\n.p-organizationchart-node-content .p-node-toggler {\n    position: absolute;\n    bottom: -0.75rem;\n    margin-left: -0.75rem;\n    z-index: 2;\n    left: 50%;\n    user-select: none;\n    cursor: pointer;\n    width: 1.5rem;\n    height: 1.5rem;\n    text-decoration: none;\n}\n.p-organizationchart-node-content .p-node-toggler .p-node-toggler-icon {\n    position: relative;\n    top: 0.25rem;\n}\n.p-organizationchart-line-down {\n    margin: 0 auto;\n    height: 20px;\n    width: 1px;\n}\n.p-organizationchart-line-right {\n    border-radius: 0px;\n}\n.p-organizationchart-line-left {\n    border-radius: 0;\n}\n.p-organizationchart-selectable-node {\n    cursor: pointer;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
