import { _ as _defineProperty } from './chunk-1fafdf15.js';
import './helpers.js';
import { c as config } from './chunk-953eb524.js';
import { I as Icon } from './chunk-1f5e2a99.js';
import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-cca88db8.js';

//
//
//
//
//
//
var script = {
  name: 'BMenu',
  props: {
    accordion: {
      type: Boolean,
      default: true
    },
    activable: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      _isMenu: true // Used by MenuItem

    };
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"menu"},[_vm._t("default")],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Menu = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var script$1 = {
  name: 'BMenuList',
  functional: true,
  props: {
    label: String,
    icon: String,
    iconPack: String,
    ariaRole: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'is-small'
    }
  },
  render: function render(createElement, context) {
    var vlabel = null;
    var slots = context.slots();

    if (context.props.label || slots.label) {
      vlabel = createElement('p', {
        attrs: {
          'class': 'menu-label'
        }
      }, context.props.label ? context.props.icon ? [createElement('b-icon', {
        props: {
          'icon': context.props.icon,
          'pack': context.props.iconPack,
          'size': context.props.size
        }
      }), createElement('span', {}, context.props.label)] : context.props.label : slots.label);
    }

    var vnode = createElement('ul', {
      attrs: {
        'class': 'menu-list',
        'role': context.props.ariaRole === 'menu' ? context.props.ariaRole : null
      }
    }, slots.default);
    return vlabel ? [vlabel, vnode] : vnode;
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var MenuList = __vue_normalize__(
    {},
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var script$2 = {
  name: 'BMenuItem',
  components: _defineProperty({}, Icon.name, Icon),
  inheritAttrs: false,
  // deprecated, to replace with default 'value' in the next breaking change
  model: {
    prop: 'active',
    event: 'update:active'
  },
  props: {
    label: String,
    active: Boolean,
    expanded: Boolean,
    disabled: Boolean,
    iconPack: String,
    icon: String,
    animation: {
      type: String,
      default: 'slide'
    },
    tag: {
      type: String,
      default: 'a',
      validator: function validator(value) {
        return config.defaultLinkTags.indexOf(value) >= 0;
      }
    },
    ariaRole: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'is-small'
    }
  },
  data: function data() {
    return {
      newActive: this.active,
      newExpanded: this.expanded
    };
  },
  computed: {
    ariaRoleMenu: function ariaRoleMenu() {
      return this.ariaRole === 'menuitem' ? this.ariaRole : null;
    }
  },
  watch: {
    active: function active(value) {
      this.newActive = value;
    },
    expanded: function expanded(value) {
      this.newExpanded = value;
    }
  },
  methods: {
    onClick: function onClick(event) {
      if (this.disabled) return;
      var menu = this.getMenu();
      this.reset(this.$parent, menu);
      this.newExpanded = !this.newExpanded;
      this.$emit('update:expanded', this.newExpanded);

      if (menu && menu.activable) {
        this.newActive = true;
        this.$emit('update:active', this.newActive);
      }
    },
    reset: function reset(parent, menu) {
      var _this = this;

      var items = parent.$children.filter(function (c) {
        return c.name === _this.name;
      });
      items.forEach(function (item) {
        if (item !== _this) {
          _this.reset(item, menu);

          if (!parent.$data._isMenu || parent.$data._isMenu && parent.accordion) {
            item.newExpanded = false;
            item.$emit('update:expanded', item.newActive);
          }

          if (menu && menu.activable) {
            item.newActive = false;
            item.$emit('update:active', item.newActive);
          }
        }
      });
    },
    getMenu: function getMenu() {
      var parent = this.$parent;

      while (parent && !parent.$data._isMenu) {
        parent = parent.$parent;
      }

      return parent;
    }
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{attrs:{"role":_vm.ariaRoleMenu}},[_c(_vm.tag,_vm._g(_vm._b({tag:"component",class:{
            'is-active': _vm.newActive,
            'is-expanded': _vm.newExpanded,
            'is-disabled': _vm.disabled,
            'icon-text': _vm.icon,
        },on:{"click":function($event){return _vm.onClick($event)}}},'component',_vm.$attrs,false),_vm.$listeners),[(_vm.icon)?_c('b-icon',{attrs:{"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.size}}):_vm._e(),(_vm.label)?_c('span',[_vm._v(" "+_vm._s(_vm.label)+" ")]):_vm._t("label",null,{"expanded":_vm.newExpanded,"active":_vm.newActive})],2),(_vm.$slots.default)?[_c('transition',{attrs:{"name":_vm.animation}},[_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.newExpanded),expression:"newExpanded"}]},[_vm._t("default")],2)])]:_vm._e()],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var MenuItem = __vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Menu);
    registerComponent(Vue, MenuList);
    registerComponent(Vue, MenuItem);
  }
};
use(Plugin);

export default Plugin;
export { Menu as BMenu, MenuItem as BMenuItem, MenuList as BMenuList };
