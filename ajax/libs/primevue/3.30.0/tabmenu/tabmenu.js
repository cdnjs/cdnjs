this.primevue = this.primevue || {};
this.primevue.tabmenu = (function (Ripple, utils, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-tabmenu {\n    overflow-x: auto;\n}\n\n.p-tabmenu-nav {\n    display: flex;\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    flex-wrap: nowrap;\n}\n\n.p-tabmenu-nav a {\n    cursor: pointer;\n    user-select: none;\n    display: flex;\n    align-items: center;\n    position: relative;\n    text-decoration: none;\n    text-decoration: none;\n    overflow: hidden;\n}\n\n.p-tabmenu-nav a:focus {\n    z-index: 1;\n}\n\n.p-tabmenu-nav .p-menuitem-text {\n    line-height: 1;\n}\n\n.p-tabmenu-ink-bar {\n    display: none;\n    z-index: 1;\n}\n\n.p-tabmenu::-webkit-scrollbar {\n    display: none;\n}\n";
    var classes = {
      root: 'p-tabmenu p-component',
      menu: 'p-tabmenu-nav p-reset',
      menuitem: function menuitem(_ref) {
        var instance = _ref.instance,
          props = _ref.props,
          index = _ref.index,
          item = _ref.item,
          isActive = _ref.isActive,
          isExactActive = _ref.isExactActive;
        return ['p-tabmenuitem', {
          'p-highlight': (props.exact ? isExactActive : isActive) || instance.d_activeIndex === index,
          'p-disabled': instance.disabled(item)
        }];
      },
      action: 'p-menuitem-link',
      icon: 'p-menuitem-icon',
      label: 'p-menuitem-text',
      inkbar: 'p-tabmenu-ink-bar'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'tabmenu',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseTabMenu',
      "extends": BaseComponent__default["default"],
      props: {
        model: {
          type: Array,
          "default": null
        },
        exact: {
          type: Boolean,
          "default": true
        },
        activeIndex: {
          type: Number,
          "default": 0
        },
        'aria-labelledby': {
          type: String,
          "default": null
        },
        'aria-label': {
          type: String,
          "default": null
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
      name: 'TabMenu',
      "extends": script$1,
      emits: ['update:activeIndex', 'tab-change'],
      timeout: null,
      data: function data() {
        return {
          d_activeIndex: this.activeIndex
        };
      },
      watch: {
        $route: function $route() {
          var _this = this;
          this.timeout = setTimeout(function () {
            return _this.updateInkBar();
          }, 50);
        },
        activeIndex: function activeIndex(newValue) {
          this.d_activeIndex = newValue;
        }
      },
      mounted: function mounted() {
        this.updateInkBar();
      },
      updated: function updated() {
        this.updateInkBar();
      },
      beforeUnmount: function beforeUnmount() {
        clearTimeout(this.timeout);
      },
      methods: {
        getPTOptions: function getPTOptions(key, index) {
          return this.ptm(key, {
            context: {
              order: index
            }
          });
        },
        onItemClick: function onItemClick(event, item, index, navigate) {
          if (this.disabled(item)) {
            event.preventDefault();
            return;
          }
          if (item.command) {
            item.command({
              originalEvent: event,
              item: item
            });
          }
          if (item.to && navigate) {
            navigate(event);
          }
          if (index !== this.d_activeIndex) {
            this.d_activeIndex = index;
            this.$emit('update:activeIndex', this.d_activeIndex);
          }
          this.$emit('tab-change', {
            originalEvent: event,
            index: index
          });
        },
        onKeydownItem: function onKeydownItem(event, index) {
          var i = index;
          var foundElement = {};
          var tabLinkRef = this.$refs.tabLink;
          switch (event.code) {
            case 'ArrowRight':
              {
                foundElement = this.findNextItem(this.$refs.tab, i);
                i = foundElement.i;
                break;
              }
            case 'ArrowLeft':
              {
                foundElement = this.findPrevItem(this.$refs.tab, i);
                i = foundElement.i;
                break;
              }
            case 'End':
              {
                foundElement = this.findPrevItem(this.$refs.tab, this.model.length);
                i = foundElement.i;
                event.preventDefault();
                break;
              }
            case 'Home':
              {
                foundElement = this.findNextItem(this.$refs.tab, -1);
                i = foundElement.i;
                event.preventDefault();
                break;
              }
            case 'Space':
            case 'Enter':
              {
                if (event.currentTarget) {
                  event.currentTarget.click();
                }
                event.preventDefault();
                break;
              }
            case 'Tab':
              {
                this.setDefaultTabIndexes(tabLinkRef);
                break;
              }
          }
          if (tabLinkRef[i] && tabLinkRef[index]) {
            tabLinkRef[index].tabIndex = '-1';
            tabLinkRef[i].tabIndex = '0';
            tabLinkRef[i].focus();
          }
        },
        findNextItem: function findNextItem(items, index) {
          var i = index + 1;
          if (i >= items.length) {
            return {
              nextItem: items[items.length],
              i: items.length
            };
          }
          var nextItem = items[i];
          if (nextItem) return utils.DomHandler.getAttribute(nextItem, 'data-p-disabled') ? this.findNextItem(items, i) : {
            nextItem: nextItem,
            i: i
          };else return null;
        },
        findPrevItem: function findPrevItem(items, index) {
          var i = index - 1;
          if (i < 0) {
            return {
              nextItem: items[0],
              i: 0
            };
          }
          var prevItem = items[i];
          if (prevItem) return utils.DomHandler.getAttribute(prevItem, 'data-p-disabled') ? this.findPrevItem(items, i) : {
            prevItem: prevItem,
            i: i
          };else return null;
        },
        visible: function visible(item) {
          return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
        },
        disabled: function disabled(item) {
          return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
        },
        label: function label(item) {
          return typeof item.label === 'function' ? item.label() : item.label;
        },
        setDefaultTabIndexes: function setDefaultTabIndexes(tabLinkRef) {
          setTimeout(function () {
            tabLinkRef.forEach(function (item) {
              item.tabIndex = utils.DomHandler.getAttribute(item.parentElement, 'data-p-highlight') ? '0' : '-1';
            });
          }, 300);
        },
        setTabIndex: function setTabIndex(index) {
          return this.d_activeIndex === index ? '0' : '-1';
        },
        updateInkBar: function updateInkBar() {
          var tabs = this.$refs.nav.children;
          var inkHighlighted = false;
          for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (utils.DomHandler.getAttribute(tab, 'data-p-highlight')) {
              this.$refs.inkbar.style.width = utils.DomHandler.getWidth(tab) + 'px';
              this.$refs.inkbar.style.left = utils.DomHandler.getOffset(tab).left - utils.DomHandler.getOffset(this.$refs.nav).left + 'px';
              inkHighlighted = true;
            }
          }
          if (!inkHighlighted) {
            this.$refs.inkbar.style.width = '0px';
            this.$refs.inkbar.style.left = '0px';
          }
        }
      },
      computed: {
        focusableItems: function focusableItems() {
          var _this2 = this;
          return (this.model || []).reduce(function (result, item) {
            _this2.visible(item) && !_this2.disabled(item) && result.push(item);
            return result;
          }, []);
        }
      },
      directives: {
        ripple: Ripple__default["default"]
      }
    };

    var _hoisted_1 = ["aria-labelledby", "aria-label"];
    var _hoisted_2 = ["data-p-highlight", "data-p-disabled"];
    var _hoisted_3 = ["href", "aria-label", "aria-disabled", "tabindex", "onClick", "onKeydown"];
    var _hoisted_4 = ["onClick", "onKeydown", "data-p-highlight", "data-p-disabled"];
    var _hoisted_5 = ["href", "target", "aria-label", "aria-disabled", "tabindex"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_router_link = vue.resolveComponent("router-link");
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root')
      }, _ctx.ptm('root'), {
        "data-pc-name": "tabmenu"
      }), [vue.createElementVNode("ul", vue.mergeProps({
        ref: "nav",
        "class": _ctx.cx('menu'),
        role: "menubar",
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel
      }, _ctx.ptm('menu')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.focusableItems, function (item, i) {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: $options.label(item) + '_' + i.toString()
        }, [item.to && !$options.disabled(item) ? (vue.openBlock(), vue.createBlock(_component_router_link, {
          key: 0,
          to: item.to,
          custom: ""
        }, {
          "default": vue.withCtx(function (_ref) {
            var navigate = _ref.navigate,
              href = _ref.href,
              isActive = _ref.isActive,
              isExactActive = _ref.isExactActive;
            return [$options.visible(item) ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
              key: 0,
              ref_for: true,
              ref: "tab",
              "class": [_ctx.cx('menuitem', {
                item: item,
                isActive: isActive,
                isExactActive: isExactActive
              }), item["class"]],
              style: item.style,
              role: "presentation"
            }, $options.getPTOptions('menuitem', i), {
              "data-p-highlight": _ctx.exact ? isExactActive : isActive,
              "data-p-disabled": $options.disabled(item)
            }), [!_ctx.$slots.item ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
              key: 0,
              ref_for: true,
              ref: "tabLink",
              role: "menuitem",
              href: href,
              "class": _ctx.cx('action'),
              "aria-label": $options.label(item),
              "aria-disabled": $options.disabled(item),
              tabindex: isExactActive ? '0' : '-1',
              onClick: function onClick($event) {
                return $options.onItemClick($event, item, i, navigate);
              },
              onKeydown: function onKeydown($event) {
                return $options.onKeydownItem($event, i, navigate);
              }
            }, $options.getPTOptions('action', i)), [_ctx.$slots.itemicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.itemicon), {
              key: 0,
              item: item,
              "class": vue.normalizeClass([_ctx.cx('icon'), item.icon])
            }, null, 8, ["item", "class"])) : item.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
              key: 1,
              "class": [_ctx.cx('icon'), item.icon]
            }, $options.getPTOptions('icon', i)), null, 16)) : vue.createCommentVNode("", true), vue.createElementVNode("span", vue.mergeProps({
              "class": _ctx.cx('label')
            }, $options.getPTOptions('label', i)), vue.toDisplayString($options.label(item)), 17)], 16, _hoisted_3)), [[_directive_ripple]]) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.item), {
              key: 1,
              item: item,
              index: i
            }, null, 8, ["item", "index"]))], 16, _hoisted_2)) : vue.createCommentVNode("", true)];
          }),
          _: 2
        }, 1032, ["to"])) : $options.visible(item) ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
          key: 1,
          ref_for: true,
          ref: "tab",
          "class": [_ctx.cx('menuitem', {
            item: item,
            index: i
          }), item["class"]],
          role: "presentation",
          onClick: function onClick($event) {
            return $options.onItemClick($event, item, i);
          },
          onKeydown: function onKeydown($event) {
            return $options.onKeydownItem($event, i);
          }
        }, $options.getPTOptions('menuitem', i), {
          "data-p-highlight": $data.d_activeIndex === i,
          "data-p-disabled": $options.disabled(item)
        }), [!_ctx.$slots.item ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
          key: 0,
          ref_for: true,
          ref: "tabLink",
          role: "menuitem",
          href: item.url,
          "class": _ctx.cx('action'),
          target: item.target,
          "aria-label": $options.label(item),
          "aria-disabled": $options.disabled(item),
          tabindex: $options.setTabIndex(i)
        }, $options.getPTOptions('action', i)), [_ctx.$slots.itemicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.itemicon), {
          key: 0,
          item: item,
          "class": vue.normalizeClass([_ctx.cx('icon'), item.icon])
        }, null, 8, ["item", "class"])) : item.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 1,
          "class": [_ctx.cx('icon'), item.icon]
        }, $options.getPTOptions('icon', i)), null, 16)) : vue.createCommentVNode("", true), vue.createElementVNode("span", vue.mergeProps({
          "class": _ctx.cx('label')
        }, $options.getPTOptions('label', i)), vue.toDisplayString($options.label(item)), 17)], 16, _hoisted_5)), [[_directive_ripple]]) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.item), {
          key: 1,
          item: item,
          index: i
        }, null, 8, ["item", "index"]))], 16, _hoisted_4)) : vue.createCommentVNode("", true)], 64);
      }), 128)), vue.createElementVNode("li", vue.mergeProps({
        ref: "inkbar",
        role: "none",
        "class": _ctx.cx('inkbar')
      }, _ctx.ptm('inkbar')), null, 16)], 16, _hoisted_1)], 16);
    }

    script.render = render;

    return script;

})(primevue.ripple, primevue.utils, primevue.basecomponent, primevue.usestyle, Vue);
