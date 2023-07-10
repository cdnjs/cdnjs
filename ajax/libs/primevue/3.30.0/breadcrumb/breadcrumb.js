this.primevue = this.primevue || {};
this.primevue.breadcrumb = (function (ChevronRightIcon, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-breadcrumb {\n    overflow-x: auto;\n}\n\n.p-breadcrumb .p-breadcrumb-list {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    display: flex;\n    align-items: center;\n    flex-wrap: nowrap;\n}\n\n.p-breadcrumb .p-menuitem-text {\n    line-height: 1;\n}\n\n.p-breadcrumb .p-menuitem-link {\n    text-decoration: none;\n    display: flex;\n    align-items: center;\n}\n\n.p-breadcrumb .p-menuitem-separator {\n    display: flex;\n    align-items: center;\n}\n\n.p-breadcrumb::-webkit-scrollbar {\n    display: none;\n}\n";
    var classes = {
      root: 'p-breadcrumb p-component',
      menu: 'p-breadcrumb-list',
      home: 'p-breadcrumb-home',
      separator: 'p-menuitem-separator',
      menuitem: function menuitem(_ref) {
        var instance = _ref.instance;
        return ['p-menuitem', {
          'p-disabled': instance.disabled()
        }];
      },
      action: function action(_ref2) {
        var props = _ref2.props,
          isActive = _ref2.isActive,
          isExactActive = _ref2.isExactActive;
        return ['p-menuitem-link', {
          'router-link-active': isActive,
          'router-link-active-exact': props.exact && isExactActive
        }];
      },
      icon: 'p-menuitem-icon',
      label: 'p-menuitem-text'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'breadcrumb',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$2 = {
      name: 'BaseBreadcrumb',
      "extends": BaseComponent__default["default"],
      props: {
        model: {
          type: Array,
          "default": null
        },
        home: {
          type: null,
          "default": null
        },
        exact: {
          type: Boolean,
          "default": true
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

    var script$1 = {
      name: 'BreadcrumbItem',
      hostName: 'Breadcrumb',
      "extends": BaseComponent__default["default"],
      props: {
        item: null,
        templates: null,
        exact: null,
        index: null
      },
      methods: {
        onClick: function onClick(event, navigate) {
          if (this.item.command) {
            this.item.command({
              originalEvent: event,
              item: this.item
            });
          }
          if (this.item.to && navigate) {
            navigate(event);
          }
        },
        visible: function visible() {
          return typeof this.item.visible === 'function' ? this.item.visible() : this.item.visible !== false;
        },
        disabled: function disabled() {
          return typeof this.item.disabled === 'function' ? this.item.disabled() : this.item.disabled;
        },
        label: function label() {
          return typeof this.item.label === 'function' ? this.item.label() : this.item.label;
        },
        isCurrentUrl: function isCurrentUrl() {
          var _this$item = this.item,
            to = _this$item.to,
            url = _this$item.url;
          var lastPath = this.$router ? this.$router.currentRoute.path : '';
          return to === lastPath || url === lastPath ? 'page' : undefined;
        }
      }
    };

    var _hoisted_1 = ["href", "aria-current", "onClick"];
    var _hoisted_2 = ["href", "target", "aria-current"];
    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_router_link = vue.resolveComponent("router-link");
      return $options.visible() ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
        key: 0,
        "class": [_ctx.cx('menuitem'), $props.item["class"]]
      }, _ctx.ptm('menuitem')), [!$props.templates || !$props.templates.item ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
        key: 0
      }, [$props.item.to ? (vue.openBlock(), vue.createBlock(_component_router_link, {
        key: 0,
        to: $props.item.to,
        custom: ""
      }, {
        "default": vue.withCtx(function (_ref) {
          var navigate = _ref.navigate,
            href = _ref.href,
            isActive = _ref.isActive,
            isExactActive = _ref.isExactActive;
          return [vue.createElementVNode("a", vue.mergeProps({
            href: href,
            "class": _ctx.cx('action', {
              isActive: isActive,
              isExactActive: isExactActive
            }),
            "aria-current": $options.isCurrentUrl(),
            onClick: function onClick($event) {
              return $options.onClick($event, navigate);
            }
          }, _ctx.ptm('action')), [$props.templates.itemicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.itemicon), {
            key: 0,
            item: $props.item,
            "class": vue.normalizeClass(_ctx.cx('icon'))
          }, null, 8, ["item", "class"])) : $props.item.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
            key: 1,
            "class": [_ctx.cx('icon'), $props.item.icon]
          }, _ctx.ptm('icon')), null, 16)) : vue.createCommentVNode("", true), $props.item.label ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
            key: 2,
            "class": _ctx.cx('label')
          }, _ctx.ptm('label')), vue.toDisplayString($options.label()), 17)) : vue.createCommentVNode("", true)], 16, _hoisted_1)];
        }),
        _: 1
      }, 8, ["to"])) : (vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
        key: 1,
        href: $props.item.url || '#',
        "class": _ctx.cx('action'),
        target: $props.item.target,
        "aria-current": $options.isCurrentUrl(),
        onClick: _cache[0] || (_cache[0] = function () {
          return $options.onClick && $options.onClick.apply($options, arguments);
        })
      }, _ctx.ptm('action')), [$props.templates && $props.templates.itemicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.itemicon), {
        key: 0,
        item: $props.item,
        "class": vue.normalizeClass(_ctx.cx('icon'))
      }, null, 8, ["item", "class"])) : $props.item.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        key: 1,
        "class": [_ctx.cx('icon'), $props.item.icon]
      }, _ctx.ptm('icon')), null, 16)) : vue.createCommentVNode("", true), $props.item.label ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        key: 2,
        "class": _ctx.cx('label')
      }, _ctx.ptm('label')), vue.toDisplayString($options.label()), 17)) : vue.createCommentVNode("", true)], 16, _hoisted_2))], 64)) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.item), {
        key: 1,
        item: $props.item
      }, null, 8, ["item"]))], 16)) : vue.createCommentVNode("", true);
    }

    script$1.render = render$1;

    var script = {
      name: 'Breadcrumb',
      "extends": script$2,
      components: {
        BreadcrumbItem: script$1,
        ChevronRightIcon: ChevronRightIcon__default["default"]
      }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_BreadcrumbItem = vue.resolveComponent("BreadcrumbItem");
      var _component_ChevronRightIcon = vue.resolveComponent("ChevronRightIcon");
      return vue.openBlock(), vue.createElementBlock("nav", vue.mergeProps({
        "class": _ctx.cx('root')
      }, _ctx.ptm('root'), {
        "data-pc-name": "breadcrumb"
      }), [vue.createElementVNode("ol", vue.mergeProps({
        "class": _ctx.cx('menu')
      }, _ctx.ptm('menu')), [_ctx.home ? (vue.openBlock(), vue.createBlock(_component_BreadcrumbItem, vue.mergeProps({
        key: 0,
        item: _ctx.home,
        "class": _ctx.cx('home'),
        templates: _ctx.$slots,
        exact: _ctx.exact,
        pt: _ctx.pt
      }, _ctx.ptm('home')), null, 16, ["item", "class", "templates", "exact", "pt"])) : vue.createCommentVNode("", true), (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.model, function (item, i) {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: item.label
        }, [_ctx.home || i !== 0 ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
          key: 0,
          "class": _ctx.cx('separator')
        }, _ctx.ptm('separator')), [vue.renderSlot(_ctx.$slots, "separator", {}, function () {
          return [vue.createVNode(_component_ChevronRightIcon, vue.mergeProps({
            "aria-hidden": "true"
          }, _ctx.ptm('separatorIcon')), null, 16)];
        })], 16)) : vue.createCommentVNode("", true), vue.createVNode(_component_BreadcrumbItem, {
          item: item,
          index: i,
          templates: _ctx.$slots,
          exact: _ctx.exact,
          pt: _ctx.pt
        }, null, 8, ["item", "index", "templates", "exact", "pt"])], 64);
      }), 128))], 16)], 16);
    }

    script.render = render;

    return script;

})(primevue.icons.chevronright, primevue.basecomponent, primevue.usestyle, Vue);
