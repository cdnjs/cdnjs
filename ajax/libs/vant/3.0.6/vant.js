(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define("vant", ["vue"], factory);
	else if(typeof exports === 'object')
		exports["vant"] = factory(require("vue"));
	else
		root["vant"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__197__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 618:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ActionBar": function() { return /* reexport */ action_bar; },
  "ActionBarButton": function() { return /* reexport */ action_bar_button; },
  "ActionBarIcon": function() { return /* reexport */ action_bar_icon; },
  "ActionSheet": function() { return /* reexport */ action_sheet; },
  "AddressEdit": function() { return /* reexport */ address_edit; },
  "AddressList": function() { return /* reexport */ address_list; },
  "Area": function() { return /* reexport */ es_area; },
  "Badge": function() { return /* reexport */ es_badge; },
  "Button": function() { return /* reexport */ es_button; },
  "Calendar": function() { return /* reexport */ calendar; },
  "Card": function() { return /* reexport */ card; },
  "Cascader": function() { return /* reexport */ cascader; },
  "Cell": function() { return /* reexport */ cell; },
  "CellGroup": function() { return /* reexport */ cell_group; },
  "Checkbox": function() { return /* reexport */ es_checkbox; },
  "CheckboxGroup": function() { return /* reexport */ checkbox_group; },
  "Circle": function() { return /* reexport */ circle; },
  "Col": function() { return /* reexport */ col; },
  "Collapse": function() { return /* reexport */ collapse; },
  "CollapseItem": function() { return /* reexport */ collapse_item; },
  "ContactCard": function() { return /* reexport */ contact_card; },
  "ContactEdit": function() { return /* reexport */ contact_edit; },
  "ContactList": function() { return /* reexport */ contact_list; },
  "CountDown": function() { return /* reexport */ count_down; },
  "Coupon": function() { return /* reexport */ es_coupon; },
  "CouponCell": function() { return /* reexport */ coupon_cell; },
  "CouponList": function() { return /* reexport */ coupon_list; },
  "DatetimePicker": function() { return /* reexport */ datetime_picker; },
  "Dialog": function() { return /* reexport */ dialog; },
  "Divider": function() { return /* reexport */ divider; },
  "DropdownItem": function() { return /* reexport */ dropdown_item; },
  "DropdownMenu": function() { return /* reexport */ dropdown_menu; },
  "Empty": function() { return /* reexport */ empty; },
  "Field": function() { return /* reexport */ es_field; },
  "Form": function() { return /* reexport */ es_form; },
  "Grid": function() { return /* reexport */ grid; },
  "GridItem": function() { return /* reexport */ grid_item; },
  "Icon": function() { return /* reexport */ es_icon; },
  "Image": function() { return /* reexport */ es_image; },
  "ImagePreview": function() { return /* reexport */ image_preview; },
  "IndexAnchor": function() { return /* reexport */ index_anchor; },
  "IndexBar": function() { return /* reexport */ index_bar; },
  "Lazyload": function() { return /* reexport */ lazyload; },
  "List": function() { return /* reexport */ list; },
  "Loading": function() { return /* reexport */ es_loading; },
  "Locale": function() { return /* reexport */ locale; },
  "NavBar": function() { return /* reexport */ nav_bar; },
  "NoticeBar": function() { return /* reexport */ notice_bar; },
  "Notify": function() { return /* reexport */ notify; },
  "NumberKeyboard": function() { return /* reexport */ number_keyboard; },
  "Overlay": function() { return /* reexport */ overlay; },
  "Pagination": function() { return /* reexport */ pagination; },
  "PasswordInput": function() { return /* reexport */ password_input; },
  "Picker": function() { return /* reexport */ es_picker; },
  "Popover": function() { return /* reexport */ popover; },
  "Popup": function() { return /* reexport */ popup; },
  "Progress": function() { return /* reexport */ progress; },
  "PullRefresh": function() { return /* reexport */ pull_refresh; },
  "Radio": function() { return /* reexport */ es_radio; },
  "RadioGroup": function() { return /* reexport */ radio_group; },
  "Rate": function() { return /* reexport */ rate; },
  "Row": function() { return /* reexport */ row; },
  "Search": function() { return /* reexport */ search; },
  "ShareSheet": function() { return /* reexport */ share_sheet; },
  "Sidebar": function() { return /* reexport */ sidebar; },
  "SidebarItem": function() { return /* reexport */ sidebar_item; },
  "Skeleton": function() { return /* reexport */ skeleton; },
  "Slider": function() { return /* reexport */ slider; },
  "Step": function() { return /* reexport */ step; },
  "Stepper": function() { return /* reexport */ stepper; },
  "Steps": function() { return /* reexport */ steps; },
  "Sticky": function() { return /* reexport */ sticky; },
  "SubmitBar": function() { return /* reexport */ submit_bar; },
  "Swipe": function() { return /* reexport */ swipe; },
  "SwipeCell": function() { return /* reexport */ swipe_cell; },
  "SwipeItem": function() { return /* reexport */ swipe_item; },
  "Switch": function() { return /* reexport */ es_switch; },
  "Tab": function() { return /* reexport */ tab; },
  "Tabbar": function() { return /* reexport */ tabbar; },
  "TabbarItem": function() { return /* reexport */ tabbar_item; },
  "Tabs": function() { return /* reexport */ tabs; },
  "Tag": function() { return /* reexport */ tag; },
  "Toast": function() { return /* reexport */ toast; },
  "TreeSelect": function() { return /* reexport */ tree_select; },
  "Uploader": function() { return /* reexport */ uploader; },
  "default": function() { return /* binding */ es; },
  "install": function() { return /* binding */ install; },
  "version": function() { return /* binding */ version; }
});

// EXTERNAL MODULE: external {"root":"Vue","commonjs":"vue","commonjs2":"vue","amd":"vue"}
var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_ = __webpack_require__(197);
;// CONCATENATED MODULE: ./es/utils/create/bem.js
/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
function gen(name, mods) {
  if (!mods) {
    return '';
  }

  if (typeof mods === 'string') {
    return " " + name + "--" + mods;
  }

  if (Array.isArray(mods)) {
    return mods.reduce(function (ret, item) {
      return ret + gen(name, item);
    }, '');
  }

  return Object.keys(mods).reduce(function (ret, key) {
    return ret + (mods[key] ? gen(name, key) : '');
  }, '');
}

function createBEM(name) {
  return function (el, mods) {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }

    el = el ? name + "__" + el : name;
    return "" + el + gen(el, mods);
  };
}
;// CONCATENATED MODULE: ./es/utils/format/string.js
var camelizeRE = /-(\w)/g;
function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c.toUpperCase();
  });
}
function padZero(num, targetLength) {
  if (targetLength === void 0) {
    targetLength = 2;
  }

  var str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}
;// CONCATENATED MODULE: ./es/utils/create/component.js
/**
 * Create a basic component with common options
 */


function createComponent(name) {
  return function (sfc) {
    sfc.name = name;

    sfc.install = function (app) {
      app.component(name, sfc);
      app.component(camelize("-" + name), sfc);
    };

    return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)(sfc);
  };
}
;// CONCATENATED MODULE: ./es/utils/base.js
// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}
var inBrowser = typeof window !== 'undefined';
function isDef(val) {
  return val !== undefined && val !== null;
} // eslint-disable-next-line @typescript-eslint/ban-types

function isFunction(val) {
  return typeof val === 'function';
}
function isObject(val) {
  return val !== null && typeof val === 'object';
}
function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
function get(object, path) {
  var keys = path.split('.');
  var result = object;
  keys.forEach(function (key) {
    var _result$key;

    result = (_result$key = result[key]) != null ? _result$key : '';
  });
  return result;
}
function pick(obj, keys) {
  return keys.reduce(function (ret, key) {
    ret[key] = obj[key];
    return ret;
  }, {});
}
;// CONCATENATED MODULE: ./es/utils/deep-assign.js

var deep_assign_hasOwnProperty = Object.prototype.hasOwnProperty;

function assignKey(to, from, key) {
  var val = from[key];

  if (!isDef(val)) {
    return;
  }

  if (!deep_assign_hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val;
  } else {
    // eslint-disable-next-line no-use-before-define
    to[key] = deepAssign(Object(to[key]), from[key]);
  }
}

function deepAssign(to, from) {
  Object.keys(from).forEach(function (key) {
    assignKey(to, from, key);
  });
  return to;
}
;// CONCATENATED MODULE: ./es/locale/lang/zh-CN.js
/* harmony default export */ var zh_CN = ({
  name: '姓名',
  tel: '电话',
  save: '保存',
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  complete: '完成',
  loading: '加载中...',
  telEmpty: '请填写电话',
  nameEmpty: '请填写姓名',
  nameInvalid: '请输入正确的姓名',
  confirmDelete: '确定要删除吗',
  telInvalid: '请输入正确的手机号',
  vanCalendar: {
    end: '结束',
    start: '开始',
    title: '日期选择',
    confirm: '确定',
    startEnd: '开始/结束',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: function monthTitle(year, month) {
      return year + "\u5E74" + month + "\u6708";
    },
    rangePrompt: function rangePrompt(maxRange) {
      return "\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 " + maxRange + " \u5929";
    }
  },
  vanCascader: {
    select: '请选择'
  },
  vanContactCard: {
    addText: '添加联系人'
  },
  vanContactList: {
    addText: '新建联系人'
  },
  vanPagination: {
    prev: '上一页',
    next: '下一页'
  },
  vanPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...'
  },
  vanSubmitBar: {
    label: '合计：'
  },
  vanCoupon: {
    unlimited: '无使用门槛',
    discount: function discount(_discount) {
      return _discount + "\u6298";
    },
    condition: function condition(_condition) {
      return "\u6EE1" + _condition + "\u5143\u53EF\u7528";
    }
  },
  vanCouponCell: {
    title: '优惠券',
    tips: '暂无可用',
    count: function count(_count) {
      return _count + "\u5F20\u53EF\u7528";
    }
  },
  vanCouponList: {
    empty: '暂无优惠券',
    exchange: '兑换',
    close: '不使用优惠券',
    enable: '可用',
    disabled: '不可用',
    placeholder: '请输入优惠码'
  },
  vanAddressEdit: {
    area: '地区',
    postal: '邮政编码',
    areaEmpty: '请选择地区',
    addressEmpty: '请填写详细地址',
    postalEmpty: '邮政编码格式不正确',
    defaultAddress: '设为默认收货地址',
    telPlaceholder: '收货人手机号',
    namePlaceholder: '收货人姓名',
    areaPlaceholder: '选择省 / 市 / 区'
  },
  vanAddressEditDetail: {
    label: '详细地址',
    placeholder: '街道门牌、楼层房间号等信息'
  },
  vanAddressList: {
    add: '新增地址'
  }
});
;// CONCATENATED MODULE: ./es/locale/index.js



var lang = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)('zh-CN');

var _messages = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
  'zh-CN': zh_CN
});

/* harmony default export */ var locale = ({
  messages: function messages() {
    return _messages[lang.value];
  },
  use: function use(newLang, newMessages) {
    var _this$add;

    lang.value = newLang;
    this.add((_this$add = {}, _this$add[newLang] = newMessages, _this$add));
  },
  add: function add(newMessages) {
    if (newMessages === void 0) {
      newMessages = {};
    }

    deepAssign(_messages, newMessages);
  }
});
;// CONCATENATED MODULE: ./es/utils/create/translate.js



function createTranslate(name) {
  var prefix = camelize(name) + '.';
  return function (path) {
    var messages = locale.messages();
    var message = get(messages, prefix + path) || get(messages, path);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return isFunction(message) ? message.apply(void 0, args) : message;
  };
}
;// CONCATENATED MODULE: ./es/utils/create/index.js



function createNamespace(name) {
  name = 'van-' + name;
  return [createComponent(name), createBEM(name), createTranslate(name)];
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useRelation/useChildren.js


function flattenVNodes(children) {
  var result = [];

  var traverse = function traverse(children) {
    if (Array.isArray(children)) {
      children.forEach(function (child) {
        if ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(child)) {
          var _child$component;

          result.push(child);

          if ((_child$component = child.component) != null && _child$component.subTree) {
            traverse(child.component.subTree.children);
          }

          if (child.children) {
            traverse(child.children);
          }
        }
      });
    }
  };

  traverse(children);
  return result;
} // sort children instances by vnodes order

function sortChildren(parent, publicChildren, internalChildren) {
  var vnodes = flattenVNodes(parent.subTree.children);
  internalChildren.sort(function (a, b) {
    return vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode);
  });
  var orderedPublicChildren = internalChildren.map(function (item) {
    return item.proxy;
  });
  publicChildren.sort(function (a, b) {
    var indexA = orderedPublicChildren.indexOf(a);
    var indexB = orderedPublicChildren.indexOf(b);
    return indexA - indexB;
  });
}
function useChildren(key) {
  var publicChildren = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)([]);
  var internalChildren = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)([]);
  var parent = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)();

  var linkChildren = function linkChildren(value) {
    var link = function link(child) {
      if (child.proxy) {
        internalChildren.push(child);
        publicChildren.push(child.proxy);
        sortChildren(parent, publicChildren, internalChildren);
      }
    };

    var unlink = function unlink(child) {
      var index = internalChildren.indexOf(child);
      publicChildren.splice(index, 1);
      internalChildren.splice(index, 1);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.provide)(key, _extends({
      link: link,
      unlink: unlink,
      children: publicChildren,
      internalChildren: internalChildren
    }, value));
  };

  return {
    children: publicChildren,
    linkChildren: linkChildren
  };
}
;// CONCATENATED MODULE: ./es/action-bar/index.js




var _createNamespace = createNamespace('action-bar'),
    action_bar_createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var ACTION_BAR_KEY = 'vanActionBar';
/* harmony default export */ var action_bar = (action_bar_createComponent({
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useChildren = useChildren(ACTION_BAR_KEY),
        linkChildren = _useChildren.linkChildren;

    linkChildren();
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": bem({
          unfit: !props.safeAreaInsetBottom
        })
      }, [slots.default == null ? void 0 : slots.default()]);
    };
  }
}));
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useRelation/useParent.js


function useParent(key) {
  var parent = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.inject)(key, null);

  if (parent) {
    var instance = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)();

    if (instance) {
      var _link = parent.link,
          _unlink = parent.unlink,
          internalChildren = parent.internalChildren,
          rest = _objectWithoutPropertiesLoose(parent, ["link", "unlink", "internalChildren"]);

      _link(instance);

      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onUnmounted)(function () {
        _unlink(instance);
      });
      var index = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
        return internalChildren.indexOf(instance);
      });
      return {
        parent: rest,
        index: index
      };
    }
  }

  return {};
}
;// CONCATENATED MODULE: ./es/composables/use-expose.js

 // expose public api

function useExpose(apis) {
  var instance = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)();

  if (instance) {
    _extends(instance.proxy, apis);
  }
}
;// CONCATENATED MODULE: ./es/composables/use-route.js
/**
 * Vue Router support
 */

var routeProps = {
  to: [String, Object],
  url: String,
  replace: Boolean
};
function route(vm) {
  var router = vm.$router;
  var to = vm.to,
      url = vm.url,
      replace = vm.replace;

  if (to && router) {
    router[replace ? 'replace' : 'push'](to);
  } else if (url) {
    replace ? location.replace(url) : location.href = url;
  }
}
function useRoute() {
  var vm = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)().proxy;
  return function () {
    route(vm);
  };
}
;// CONCATENATED MODULE: ./es/utils/constant.js
// color
var RED = '#ee0a24'; // border

var BORDER = 'van-hairline';
var BORDER_TOP = BORDER + "--top";
var BORDER_LEFT = BORDER + "--left";
var BORDER_BOTTOM = BORDER + "--bottom";
var BORDER_SURROUND = BORDER + "--surround";
var BORDER_TOP_BOTTOM = BORDER + "--top-bottom";
var BORDER_UNSET_TOP_BOTTOM = BORDER + "-unset--top-bottom";
;// CONCATENATED MODULE: ./es/utils/validate/number.js
function isNumeric(val) {
  return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);
}
function number_isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  } // eslint-disable-next-line no-self-compare


  return val !== val;
}
;// CONCATENATED MODULE: ./es/utils/format/unit.js


function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  return isNumeric(value) ? value + "px" : String(value);
}
function getSizeStyle(originSize) {
  if (isDef(originSize)) {
    var size = addUnit(originSize);
    return {
      width: size,
      height: size
    };
  }
} // cache

var rootFontSize;

function getRootFontSize() {
  if (!rootFontSize) {
    var doc = document.documentElement;
    var fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }

  return rootFontSize;
}

function convertRem(value) {
  value = value.replace(/rem/g, '');
  return +value * getRootFontSize();
}

function convertVw(value) {
  value = value.replace(/vw/g, '');
  return +value * window.innerWidth / 100;
}

function convertVh(value) {
  value = value.replace(/vh/g, '');
  return +value * window.innerHeight / 100;
}

function unitToPx(value) {
  if (typeof value === 'number') {
    return value;
  }

  if (inBrowser) {
    if (value.indexOf('rem') !== -1) {
      return convertRem(value);
    }

    if (value.indexOf('vw') !== -1) {
      return convertVw(value);
    }

    if (value.indexOf('vh') !== -1) {
      return convertVh(value);
    }
  }

  return parseFloat(value);
}
;// CONCATENATED MODULE: ./es/badge/index.js




var badge_createNamespace = createNamespace('badge'),
    badge_createComponent = badge_createNamespace[0],
    badge_bem = badge_createNamespace[1];

/* harmony default export */ var es_badge = (badge_createComponent({
  props: {
    dot: Boolean,
    max: [Number, String],
    color: String,
    offset: Array,
    content: [Number, String],
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var hasContent = function hasContent() {
      return !!(slots.content || isDef(props.content) && props.content !== '');
    };

    var renderContent = function renderContent() {
      var dot = props.dot,
          max = props.max,
          content = props.content;

      if (!dot && hasContent()) {
        if (slots.content) {
          return slots.content();
        }

        if (isDef(max) && isNumeric(content) && +content > max) {
          return max + "+";
        }

        return content;
      }
    };

    var renderBadge = function renderBadge() {
      if (hasContent() || props.dot) {
        var style = {
          background: props.color
        };

        if (props.offset) {
          var _props$offset = props.offset,
              x = _props$offset[0],
              y = _props$offset[1];

          if (slots.default) {
            style.top = y + "px";
            style.right = -x + "px";
          } else {
            style.marginTop = y + "px";
            style.marginLeft = x + "px";
          }
        }

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": badge_bem({
            dot: props.dot,
            fixed: !!slots.default
          }),
          "style": style
        }, [renderContent()]);
      }
    };

    return function () {
      if (slots.default) {
        var tag = props.tag;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag, {
          "class": badge_bem('wrapper')
        }, {
          default: function _default() {
            return [slots.default(), renderBadge()];
          }
        });
      }

      return renderBadge();
    };
  }
}));
;// CONCATENATED MODULE: ./es/icon/index.js




var icon_createNamespace = createNamespace('icon'),
    icon_createComponent = icon_createNamespace[0],
    icon_bem = icon_createNamespace[1];

function isImage(name) {
  return name ? name.indexOf('/') !== -1 : false;
}

/* harmony default export */ var es_icon = (icon_createComponent({
  props: {
    dot: Boolean,
    name: String,
    size: [Number, String],
    badge: [Number, String],
    color: String,
    tag: {
      type: String,
      default: 'i'
    },
    classPrefix: {
      type: String,
      default: icon_bem()
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var tag = props.tag,
          dot = props.dot,
          name = props.name,
          size = props.size,
          badge = props.badge,
          color = props.color,
          classPrefix = props.classPrefix;
      var isImageIcon = isImage(name);
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_badge, {
        "dot": dot,
        "tag": tag,
        "content": badge,
        "class": [classPrefix, isImageIcon ? '' : classPrefix + "-" + name],
        "style": {
          color: color,
          fontSize: addUnit(size)
        }
      }, {
        default: function _default() {
          return [slots.default == null ? void 0 : slots.default(), isImageIcon && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("img", {
            "class": icon_bem('image'),
            "src": name
          }, null)];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/loading/index.js





var loading_createNamespace = createNamespace('loading'),
    loading_createComponent = loading_createNamespace[0],
    loading_bem = loading_createNamespace[1];

var SpinIcon = [];

for (var i = 0; i < 12; i++) {
  SpinIcon.push((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("i", null, null));
}

var CircularIcon = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("svg", {
  "class": loading_bem('circular'),
  "viewBox": "25 25 50 50"
}, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("circle", {
  "cx": "50",
  "cy": "50",
  "r": "20",
  "fill": "none"
}, null)]);

/* harmony default export */ var es_loading = (loading_createComponent({
  props: {
    size: [Number, String],
    color: String,
    vertical: Boolean,
    textSize: [Number, String],
    textColor: String,
    type: {
      type: String,
      default: 'circular'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var spinnerStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return _extends({
        color: props.color
      }, getSizeStyle(props.size));
    });

    var renderText = function renderText() {
      if (slots.default) {
        var _props$textColor;

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": loading_bem('text'),
          "style": {
            fontSize: addUnit(props.textSize),
            color: (_props$textColor = props.textColor) != null ? _props$textColor : props.color
          }
        }, [slots.default()]);
      }
    };

    return function () {
      var type = props.type,
          vertical = props.vertical;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": loading_bem([type, {
          vertical: vertical
        }])
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": loading_bem('spinner', type),
        "style": spinnerStyle.value
      }, [type === 'spinner' ? SpinIcon : CircularIcon]), renderText()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/button/index.js


 // Utils



 // Components




function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var button_createNamespace = createNamespace('button'),
    button_createComponent = button_createNamespace[0],
    button_bem = button_createNamespace[1];

/* harmony default export */ var es_button = (button_createComponent({
  props: _extends({}, routeProps, {
    text: String,
    icon: String,
    color: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    iconPrefix: String,
    loadingText: String,
    loadingType: String,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loadingSize: {
      type: String,
      default: '20px'
    },
    iconPosition: {
      type: String,
      default: 'left'
    }
  }),
  emits: ['click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var route = useRoute();

    var renderLoadingIcon = function renderLoadingIcon() {
      if (slots.loading) {
        return slots.loading();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_loading, {
        "class": button_bem('loading'),
        "size": props.loadingSize,
        "type": props.loadingType,
        "color": "currentColor"
      }, null);
    };

    var renderIcon = function renderIcon() {
      if (props.loading) {
        return renderLoadingIcon();
      }

      if (props.icon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": props.icon,
          "class": button_bem('icon'),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    var renderText = function renderText() {
      var text;

      if (props.loading) {
        text = props.loadingText;
      } else {
        text = slots.default ? slots.default() : props.text;
      }

      if (text) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": button_bem('text')
        }, _isSlot(text) ? text : {
          default: function _default() {
            return [text];
          }
        });
      }
    };

    var getStyle = function getStyle() {
      var color = props.color,
          plain = props.plain;

      if (color) {
        var style = {};
        style.color = plain ? color : 'white';

        if (!plain) {
          // Use background instead of backgroundColor to make linear-gradient work
          style.background = color;
        } // hide border when color is linear-gradient


        if (color.indexOf('gradient') !== -1) {
          style.border = 0;
        } else {
          style.borderColor = color;
        }

        return style;
      }
    };

    var onClick = function onClick(event) {
      if (props.loading) {
        event.preventDefault();
      }

      if (!props.loading && !props.disabled) {
        emit('click', event);
        route();
      }
    };

    return function () {
      var _slot;

      var _ref2;

      var tag = props.tag,
          type = props.type,
          size = props.size,
          block = props.block,
          round = props.round,
          plain = props.plain,
          square = props.square,
          loading = props.loading,
          disabled = props.disabled,
          hairline = props.hairline,
          nativeType = props.nativeType,
          iconPosition = props.iconPosition;
      var classes = [button_bem([type, size, {
        plain: plain,
        block: block,
        round: round,
        square: square,
        loading: loading,
        disabled: disabled,
        hairline: hairline
      }]), (_ref2 = {}, _ref2[BORDER_SURROUND] = hairline, _ref2)];
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag, {
        "type": nativeType,
        "class": classes,
        "style": getStyle(),
        "disabled": disabled,
        "onClick": onClick
      }, _isSlot(_slot = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": button_bem('content')
      }, [iconPosition === 'left' && renderIcon(), renderText(), iconPosition === 'right' && renderIcon()])) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/action-bar-button/index.js




 // Composition



 // Components



var action_bar_button_createNamespace = createNamespace('action-bar-button'),
    action_bar_button_createComponent = action_bar_button_createNamespace[0],
    action_bar_button_bem = action_bar_button_createNamespace[1];

/* harmony default export */ var action_bar_button = (action_bar_button_createComponent({
  props: _extends({}, routeProps, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var route = useRoute();

    var _useParent = useParent(ACTION_BAR_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var isFirst = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (parent) {
        var prev = parent.children[index.value - 1];
        return !(prev && 'isButton' in prev);
      }
    });
    var isLast = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (parent) {
        var next = parent.children[index.value + 1];
        return !(next && 'isButton' in next);
      }
    });
    useExpose({
      isButton: true
    });
    return function () {
      var type = props.type,
          icon = props.icon,
          text = props.text,
          color = props.color,
          loading = props.loading,
          disabled = props.disabled;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
        "class": action_bar_button_bem([type, {
          last: isLast.value,
          first: isFirst.value
        }]),
        "size": "large",
        "type": type,
        "icon": icon,
        "color": color,
        "loading": loading,
        "disabled": disabled,
        "onClick": route
      }, {
        default: function _default() {
          return [slots.default ? slots.default() : text];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/action-bar-icon/index.js




 // Composition


 // Components




function action_bar_icon_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var action_bar_icon_createNamespace = createNamespace('action-bar-icon'),
    action_bar_icon_createComponent = action_bar_icon_createNamespace[0],
    action_bar_icon_bem = action_bar_icon_createNamespace[1];

/* harmony default export */ var action_bar_icon = (action_bar_icon_createComponent({
  props: _extends({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    color: String,
    badge: [Number, String],
    iconClass: null
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var route = useRoute();
    useParent(ACTION_BAR_KEY);

    var renderIcon = function renderIcon() {
      var dot = props.dot,
          badge = props.badge,
          icon = props.icon,
          color = props.color,
          iconClass = props.iconClass;

      if (slots.icon) {
        var _slot;

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_badge, {
          "dot": dot,
          "content": badge,
          "class": action_bar_icon_bem('icon')
        }, action_bar_icon_isSlot(_slot = slots.icon()) ? _slot : {
          default: function _default() {
            return [_slot];
          }
        });
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "tag": "div",
        "dot": dot,
        "name": icon,
        "badge": badge,
        "color": color,
        "class": [action_bar_icon_bem('icon'), iconClass]
      }, null);
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "button",
        "class": action_bar_icon_bem(),
        "tabindex": 0,
        "onClick": route
      }, [renderIcon(), slots.default ? slots.default() : props.text]);
    };
  }
}));
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/onMountedOrActivated/index.js

function onMountedOrActivated(hook) {
  var mounted;
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
    hook();
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
      mounted = true;
    });
  });
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onActivated)(function () {
    if (mounted) {
      hook();
    }
  });
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/utils.js
var utils_inBrowser = typeof window !== 'undefined';
var root = utils_inBrowser ? window : __webpack_require__.g;
var prev = Date.now();

function rafPolyfill(fn) {
  var curr = Date.now();
  var ms = Math.max(0, 16 - (curr - prev));
  var id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

function raf(fn) {
  var requestAnimationFrame = root.requestAnimationFrame || rafPolyfill;
  return requestAnimationFrame.call(root, fn);
}
function cancelRaf(id) {
  var cancelAnimationFrame = root.cancelAnimationFrame || root.clearTimeout;
  cancelAnimationFrame.call(root, id);
} // double raf for animation

function doubleRaf(fn) {
  raf(function () {
    raf(fn);
  });
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useEventListener/index.js


 // eslint-disable-next-line

var supportsPassive = false;

if (utils_inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', null, opts); // eslint-disable-next-line no-empty
  } catch (e) {}
}

function useEventListener(type, listener, options) {
  if (options === void 0) {
    options = {};
  }

  if (!utils_inBrowser) {
    return;
  }

  var _options = options,
      _options$target = _options.target,
      target = _options$target === void 0 ? window : _options$target,
      _options$passive = _options.passive,
      passive = _options$passive === void 0 ? false : _options$passive,
      _options$capture = _options.capture,
      capture = _options$capture === void 0 ? false : _options$capture;
  var attached;

  var add = function add() {
    var element = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.unref)(target);

    if (element && !attached) {
      element.addEventListener(type, listener, supportsPassive ? {
        capture: capture,
        passive: passive
      } : capture);
      attached = true;
    }
  };

  var remove = function remove() {
    var element = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.unref)(target);

    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };

  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onUnmounted)(remove);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onDeactivated)(remove);
  onMountedOrActivated(add);
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useScrollParent/index.js

var overflowScrollReg = /scroll|auto/i;

function isElement(node) {
  var ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
} // https://github.com/youzan/vant/issues/3823


function getScrollParent(el, root) {
  if (root === void 0) {
    root = window;
  }

  var node = el;

  while (node && node !== root && isElement(node)) {
    var _window$getComputedSt = window.getComputedStyle(node),
        overflowY = _window$getComputedSt.overflowY;

    if (overflowScrollReg.test(overflowY)) {
      return node;
    }

    node = node.parentNode;
  }

  return root;
}
function useScrollParent(el, root) {
  if (root === void 0) {
    root = window;
  }

  var scrollParent = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root);
    }
  });
  return scrollParent;
}
;// CONCATENATED MODULE: ./es/composables/use-touch.js

var MIN_DISTANCE = 10;

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }

  return '';
}

function useTouch() {
  var startX = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(0);
  var startY = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(0);
  var deltaX = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(0);
  var deltaY = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(0);
  var offsetX = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(0);
  var offsetY = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(0);
  var direction = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)('');

  var isVertical = function isVertical() {
    return direction.value === 'vertical';
  };

  var isHorizontal = function isHorizontal() {
    return direction.value === 'horizontal';
  };

  var reset = function reset() {
    deltaX.value = 0;
    deltaY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
    direction.value = '';
  };

  var start = function start(event) {
    reset();
    startX.value = event.touches[0].clientX;
    startY.value = event.touches[0].clientY;
  };

  var move = function move(event) {
    var touch = event.touches[0];
    deltaX.value = touch.clientX - startX.value;
    deltaY.value = touch.clientY - startY.value;
    offsetX.value = Math.abs(deltaX.value);
    offsetY.value = Math.abs(deltaY.value);

    if (!direction.value) {
      direction.value = getDirection(offsetX.value, offsetY.value);
    }
  };

  return {
    move: move,
    start: start,
    reset: reset,
    startX: startX,
    startY: startY,
    deltaX: deltaX,
    deltaY: deltaY,
    offsetX: offsetX,
    offsetY: offsetY,
    direction: direction,
    isVertical: isVertical,
    isHorizontal: isHorizontal
  };
}
;// CONCATENATED MODULE: ./es/utils/dom/event.js
function stopPropagation(event) {
  event.stopPropagation();
}
function preventDefault(event, isStopPropagation) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}
function trigger(target, type) {
  var inputEvent = document.createEvent('HTMLEvents');
  inputEvent.initEvent(type, true, true);
  target.dispatchEvent(inputEvent);
}
;// CONCATENATED MODULE: ./es/composables/use-lock-scroll.js



var totalLockCount = 0;
var BODY_LOCK_CLASS = 'van-overflow-hidden';
function useLockScroll(rootRef, shouldLock) {
  var touch = useTouch();

  var onTouchMove = function onTouchMove(event) {
    touch.move(event);
    var direction = touch.deltaY.value > 0 ? '10' : '01';
    var el = getScrollParent(event.target, rootRef.value);
    var scrollHeight = el.scrollHeight,
        offsetHeight = el.offsetHeight,
        scrollTop = el.scrollTop;
    var status = '11';

    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01';
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = '10';
    }

    if (status !== '11' && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
      preventDefault(event, true);
    }
  };

  var lock = function lock() {
    if (shouldLock()) {
      document.addEventListener('touchstart', touch.start);
      document.addEventListener('touchmove', onTouchMove, supportsPassive ? {
        passive: false
      } : false);

      if (!totalLockCount) {
        document.body.classList.add(BODY_LOCK_CLASS);
      }

      totalLockCount++;
    }
  };

  var unlock = function unlock() {
    if (shouldLock() && totalLockCount) {
      document.removeEventListener('touchstart', touch.start);
      document.removeEventListener('touchmove', onTouchMove);
      totalLockCount--;

      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };

  return [lock, unlock];
}
;// CONCATENATED MODULE: ./es/composables/use-lazy-render.js

function useLazyRender(show) {
  var inited = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(false);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(show, function (value) {
    if (value) {
      inited.value = value;
    }
  }, {
    immediate: true
  });
  return function (render) {
    return function () {
      return inited.value ? render() : null;
    };
  };
}
;// CONCATENATED MODULE: ./es/overlay/index.js









function overlay_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var overlay_createNamespace = createNamespace('overlay'),
    overlay_createComponent = overlay_createNamespace[0],
    overlay_bem = overlay_createNamespace[1];

/* harmony default export */ var overlay = (overlay_createComponent({
  props: {
    show: Boolean,
    zIndex: [Number, String],
    duration: [Number, String],
    className: null,
    customStyle: Object,
    lockScroll: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var lazyRender = useLazyRender(function () {
      return props.show;
    });

    var preventTouchMove = function preventTouchMove(event) {
      preventDefault(event, true);
    };

    var renderOverlay = lazyRender(function () {
      var style = _extends({
        zIndex: props.zIndex !== undefined ? +props.zIndex : undefined
      }, props.customStyle);

      if (isDef(props.duration)) {
        style.animationDuration = props.duration + "s";
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "style": style,
        "class": [overlay_bem(), props.className],
        "onTouchmove": props.lockScroll ? preventTouchMove : noop
      }, [slots.default == null ? void 0 : slots.default()]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.show]]);
    });
    return function () {
      var _slot;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Transition, {
        "name": "van-fade"
      }, overlay_isSlot(_slot = renderOverlay()) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/popup/index.js






 // Utils


 // Composition




 // Components




function popup_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var popup_createNamespace = createNamespace('popup'),
    popup_createComponent = popup_createNamespace[0],
    popup_bem = popup_createNamespace[1];

var context = {
  zIndex: 2000,
  lockCount: 0,
  stack: [],
  find: function find(vm) {
    return this.stack.filter(function (item) {
      return item.vm === vm;
    })[0];
  }
};
var popupSharedProps = {
  // whether to show popup
  show: Boolean,
  // z-index
  zIndex: [Number, String],
  // transition duration
  duration: [Number, String],
  // teleport
  teleport: [String, Object],
  // overlay custom style
  overlayStyle: Object,
  // overlay custom class name
  overlayClass: null,
  // Initial rendering animation
  transitionAppear: Boolean,
  // whether to show overlay
  overlay: {
    type: Boolean,
    default: true
  },
  // prevent body scroll
  lockScroll: {
    type: Boolean,
    default: true
  },
  // whether to lazy render
  lazyRender: {
    type: Boolean,
    default: true
  },
  // whether to close popup when overlay is clicked
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  }
};
/* harmony default export */ var popup = (popup_createComponent({
  inheritAttrs: false,
  props: _extends({}, popupSharedProps, {
    round: Boolean,
    closeable: Boolean,
    transition: String,
    closeOnPopstate: Boolean,
    safeAreaInsetBottom: Boolean,
    position: {
      type: String,
      default: 'center'
    },
    closeIcon: {
      type: String,
      default: 'cross'
    },
    closeIconPosition: {
      type: String,
      default: 'top-right'
    }
  }),
  emits: ['open', 'close', 'click', 'opened', 'closed', 'update:show', 'click-overlay', 'click-close-icon'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        attrs = _ref.attrs,
        slots = _ref.slots;
    var opened;
    var shouldReopen;
    var zIndex = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var popupRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var _useLockScroll = useLockScroll(popupRef, function () {
      return props.lockScroll;
    }),
        lockScroll = _useLockScroll[0],
        unlockScroll = _useLockScroll[1];

    var lazyRender = useLazyRender(function () {
      return props.show || !props.lazyRender;
    });
    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var style = {
        zIndex: zIndex.value
      };

      if (isDef(props.duration)) {
        var key = props.position === 'center' ? 'animationDuration' : 'transitionDuration';
        style[key] = props.duration + "s";
      }

      return style;
    });

    var open = function open() {
      if (!opened) {
        if (props.zIndex !== undefined) {
          context.zIndex = props.zIndex;
        }

        opened = true;
        lockScroll();
        zIndex.value = ++context.zIndex;
      }
    };

    var close = function close() {
      if (opened) {
        opened = false;
        unlockScroll();
        emit('update:show', false);
      }
    };

    var onClickOverlay = function onClickOverlay() {
      emit('click-overlay');

      if (props.closeOnClickOverlay) {
        close();
      }
    };

    var renderOverlay = function renderOverlay() {
      if (props.overlay) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(overlay, {
          "show": props.show,
          "class": props.overlayClass,
          "zIndex": zIndex.value,
          "duration": props.duration,
          "customStyle": props.overlayStyle,
          "onClick": onClickOverlay
        }, null);
      }
    };

    var onClickCloseIcon = function onClickCloseIcon(event) {
      emit('click-close-icon', event);
      close();
    };

    var renderCloseIcon = function renderCloseIcon() {
      if (props.closeable) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "role": "button",
          "tabindex": "0",
          "name": props.closeIcon,
          "class": popup_bem('close-icon', props.closeIconPosition),
          "onClick": onClickCloseIcon
        }, null);
      }
    };

    var onClick = function onClick(event) {
      return emit('click', event);
    };

    var onOpened = function onOpened() {
      return emit('opened');
    };

    var onClosed = function onClosed() {
      return emit('closed');
    };

    var renderPopup = lazyRender(function () {
      var _bem;

      var round = props.round,
          position = props.position,
          safeAreaInsetBottom = props.safeAreaInsetBottom;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": popupRef,
        "style": style.value,
        "class": popup_bem((_bem = {
          round: round
        }, _bem[position] = position, _bem['safe-area-inset-bottom'] = safeAreaInsetBottom, _bem)),
        "onClick": onClick
      }, attrs), [slots.default == null ? void 0 : slots.default(), renderCloseIcon()]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.show]]);
    });

    var renderTransition = function renderTransition() {
      var _slot;

      var position = props.position,
          transition = props.transition,
          transitionAppear = props.transitionAppear;
      var name = position === 'center' ? 'van-fade' : "van-popup-slide-" + position;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Transition, {
        "name": transition || name,
        "appear": transitionAppear,
        "onAfterEnter": onOpened,
        "onAfterLeave": onClosed
      }, popup_isSlot(_slot = renderPopup()) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      });
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.show;
    }, function (value) {
      if (value) {
        open();
        emit('open');
      } else {
        close();
        emit('close');
      }
    });
    useExpose({
      popupRef: popupRef
    });
    useEventListener('popstate', function () {
      if (props.closeOnPopstate) {
        close();
        shouldReopen = false;
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
      if (props.show) {
        open();
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onActivated)(function () {
      if (shouldReopen) {
        emit('update:show', true);
        shouldReopen = false;
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onDeactivated)(function () {
      if (props.show) {
        close();
        shouldReopen = true;
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(function () {
      if (opened) {
        unlockScroll();
      }
    });
    return function () {
      if (props.teleport) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Teleport, {
          "to": props.teleport
        }, {
          default: function _default() {
            return [renderOverlay(), renderTransition()];
          }
        });
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Fragment, null, [renderOverlay(), renderTransition()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/action-sheet/index.js



 // Utils

 // Components





function action_sheet_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var action_sheet_createNamespace = createNamespace('action-sheet'),
    action_sheet_createComponent = action_sheet_createNamespace[0],
    action_sheet_bem = action_sheet_createNamespace[1];

/* harmony default export */ var action_sheet = (action_sheet_createComponent({
  props: _extends({}, popupSharedProps, {
    title: String,
    actions: Array,
    cancelText: String,
    description: String,
    closeOnPopstate: Boolean,
    closeOnClickAction: Boolean,
    round: {
      type: Boolean,
      default: true
    },
    closeable: {
      type: Boolean,
      default: true
    },
    closeIcon: {
      type: String,
      default: 'cross'
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  }),
  emits: ['select', 'cancel', 'update:show'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    var popupPropKeys = Object.keys(popupSharedProps);

    var onUpdateShow = function onUpdateShow(show) {
      emit('update:show', show);
    };

    var onCancel = function onCancel() {
      onUpdateShow(false);
      emit('cancel');
    };

    var renderHeader = function renderHeader() {
      if (props.title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": action_sheet_bem('header')
        }, [props.title, props.closeable && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": props.closeIcon,
          "class": action_sheet_bem('close'),
          "onClick": onCancel
        }, null)]);
      }
    };

    var renderCancel = function renderCancel() {
      if (props.cancelText) {
        return [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": action_sheet_bem('gap')
        }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
          "type": "button",
          "class": action_sheet_bem('cancel'),
          "onClick": onCancel
        }, [props.cancelText])];
      }
    };

    var renderOption = function renderOption(item, index) {
      var name = item.name,
          color = item.color,
          subname = item.subname,
          loading = item.loading,
          callback = item.callback,
          disabled = item.disabled,
          className = item.className;
      var Content = loading ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_loading, {
        "class": action_sheet_bem('loading-icon')
      }, null) : [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": action_sheet_bem('name')
      }, action_sheet_isSlot(name) ? name : {
        default: function _default() {
          return [name];
        }
      }), subname && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": action_sheet_bem('subname')
      }, action_sheet_isSlot(subname) ? subname : {
        default: function _default() {
          return [subname];
        }
      })];

      var onClick = function onClick() {
        if (disabled || loading) {
          return;
        }

        if (callback) {
          callback(item);
        }

        emit('select', item, index);

        if (props.closeOnClickAction) {
          onUpdateShow(false);
        }
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
        "type": "button",
        "style": {
          color: color
        },
        "class": [action_sheet_bem('item', {
          loading: loading,
          disabled: disabled
        }), className],
        "onClick": onClick
      }, action_sheet_isSlot(Content) ? Content : {
        default: function _default() {
          return [Content];
        }
      });
    };

    var renderDescription = function renderDescription() {
      if (props.description || slots.description) {
        var content = slots.description ? slots.description() : props.description;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": action_sheet_bem('description')
        }, action_sheet_isSlot(content) ? content : {
          default: function _default() {
            return [content];
          }
        });
      }
    };

    var renderOptions = function renderOptions() {
      if (props.actions) {
        return props.actions.map(renderOption);
      }
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "class": action_sheet_bem(),
        "round": props.round,
        "position": "bottom"
      }, _extends({}, pick(props, popupPropKeys), {
        'onUpdate:show': onUpdateShow
      })), {
        default: function _default() {
          return [renderHeader(), renderDescription(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
            "class": action_sheet_bem('content')
          }, [renderOptions(), slots.default == null ? void 0 : slots.default()]), renderCancel()];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/utils/validate/mobile.js
function isMobile(value) {
  value = value.replace(/[^-|\d]/g, '');
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}
;// CONCATENATED MODULE: ./es/picker/shared.js
var PICKER_KEY = 'vanPicker';
var pickerProps = {
  title: String,
  loading: Boolean,
  readonly: Boolean,
  allowHtml: Boolean,
  cancelButtonText: String,
  confirmButtonText: String,
  itemHeight: {
    type: [Number, String],
    default: 44
  },
  showToolbar: {
    type: Boolean,
    default: true
  },
  visibleItemCount: {
    type: [Number, String],
    default: 6
  },
  swipeDuration: {
    type: [Number, String],
    default: 1000
  }
};
;// CONCATENATED MODULE: ./es/utils/deep-clone.js

function deepClone(obj) {
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      return deepClone(item);
    });
  }

  if (typeof obj === 'object') {
    return deepAssign({}, obj);
  }

  return obj;
}
;// CONCATENATED MODULE: ./es/utils/format/number.js
function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function trimExtraChar(value, _char, regExp) {
  var index = value.indexOf(_char);

  if (index === -1) {
    return value;
  }

  if (_char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

function formatNumber(value, allowDot, allowMinus) {
  if (allowDot === void 0) {
    allowDot = true;
  }

  if (allowMinus === void 0) {
    allowMinus = true;
  }

  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g);
  } else {
    value = value.split('.')[0];
  }

  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g);
  } else {
    value = value.replace(/-/, '');
  }

  var regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, '');
}
;// CONCATENATED MODULE: ./es/picker/PickerColumn.js


 // Utils


 // Composition




var DEFAULT_DURATION = 200; // 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
// 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动

var MOMENTUM_LIMIT_TIME = 300;
var MOMENTUM_LIMIT_DISTANCE = 15;

var PickerColumn_createNamespace = createNamespace('picker-column'),
    PickerColumn_createComponent = PickerColumn_createNamespace[0],
    PickerColumn_bem = PickerColumn_createNamespace[1];

function getElementTranslateY(element) {
  var style = window.getComputedStyle(element);
  var transform = style.transform || style.webkitTransform;
  var translateY = transform.slice(7, transform.length - 1).split(', ')[5];
  return Number(translateY);
}

function isOptionDisabled(option) {
  return isObject(option) && option.disabled;
}

/* harmony default export */ var PickerColumn = (PickerColumn_createComponent({
  props: {
    textKey: String,
    readonly: Boolean,
    allowHtml: Boolean,
    className: String,
    itemHeight: Number,
    defaultIndex: Number,
    swipeDuration: [Number, String],
    visibleItemCount: [Number, String],
    initialOptions: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  emits: ['change'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var moving;
    var startOffset;
    var touchStartTime;
    var momentumOffset;
    var transitionEndTrigger;
    var wrapper = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      index: props.defaultIndex,
      offset: 0,
      duration: 0,
      options: deepClone(props.initialOptions)
    });
    var touch = useTouch();

    var count = function count() {
      return state.options.length;
    };

    var baseOffset = function baseOffset() {
      return props.itemHeight * (props.visibleItemCount - 1) / 2;
    };

    var adjustIndex = function adjustIndex(index) {
      index = range(index, 0, count());

      for (var i = index; i < count(); i++) {
        if (!isOptionDisabled(state.options[i])) return i;
      }

      for (var _i = index - 1; _i >= 0; _i--) {
        if (!isOptionDisabled(state.options[_i])) return _i;
      }
    };

    var setIndex = function setIndex(index, emitChange) {
      index = adjustIndex(index) || 0;
      var offset = -index * props.itemHeight;

      var trigger = function trigger() {
        if (index !== state.index) {
          state.index = index;

          if (emitChange) {
            emit('change', index);
          }
        }
      }; // trigger the change event after transitionend when moving


      if (moving && offset !== state.offset) {
        transitionEndTrigger = trigger;
      } else {
        trigger();
      }

      state.offset = offset;
    };

    var setOptions = function setOptions(options) {
      if (JSON.stringify(options) !== JSON.stringify(state.options)) {
        state.options = deepClone(options);
        setIndex(props.defaultIndex);
      }
    };

    var onClickItem = function onClickItem(index) {
      if (moving || props.readonly) {
        return;
      }

      transitionEndTrigger = null;
      state.duration = DEFAULT_DURATION;
      setIndex(index, true);
    };

    var getOptionText = function getOptionText(option) {
      if (isObject(option) && props.textKey in option) {
        return option[props.textKey];
      }

      return option;
    };

    var getIndexByOffset = function getIndexByOffset(offset) {
      return range(Math.round(-offset / props.itemHeight), 0, count() - 1);
    };

    var momentum = function momentum(distance, duration) {
      var speed = Math.abs(distance / duration);
      distance = state.offset + speed / 0.003 * (distance < 0 ? -1 : 1);
      var index = getIndexByOffset(distance);
      state.duration = +props.swipeDuration;
      setIndex(index, true);
    };

    var stopMomentum = function stopMomentum() {
      moving = false;
      state.duration = 0;

      if (transitionEndTrigger) {
        transitionEndTrigger();
        transitionEndTrigger = null;
      }
    };

    var onTouchStart = function onTouchStart(event) {
      if (props.readonly) {
        return;
      }

      touch.start(event);

      if (moving) {
        var translateY = getElementTranslateY(wrapper.value);
        state.offset = Math.min(0, translateY - baseOffset());
        startOffset = state.offset;
      } else {
        startOffset = state.offset;
      }

      state.duration = 0;
      touchStartTime = Date.now();
      momentumOffset = startOffset;
      transitionEndTrigger = null;
    };

    var onTouchMove = function onTouchMove(event) {
      if (props.readonly) {
        return;
      }

      touch.move(event);

      if (touch.isVertical()) {
        moving = true;
        preventDefault(event, true);
      }

      state.offset = range(startOffset + touch.deltaY.value, -(count() * props.itemHeight), props.itemHeight);
      var now = Date.now();

      if (now - touchStartTime > MOMENTUM_LIMIT_TIME) {
        touchStartTime = now;
        momentumOffset = state.offset;
      }
    };

    var onTouchEnd = function onTouchEnd() {
      if (props.readonly) {
        return;
      }

      var distance = state.offset - momentumOffset;
      var duration = Date.now() - touchStartTime;
      var allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;

      if (allowMomentum) {
        momentum(distance, duration);
        return;
      }

      var index = getIndexByOffset(state.offset);
      state.duration = DEFAULT_DURATION;
      setIndex(index, true); // compatible with desktop scenario
      // use setTimeout to skip the click event Emitted after touchstart

      setTimeout(function () {
        moving = false;
      }, 0);
    };

    var renderOptions = function renderOptions() {
      var optionStyle = {
        height: props.itemHeight + "px"
      };
      return state.options.map(function (option, index) {
        var _childData;

        var text = getOptionText(option);
        var disabled = isOptionDisabled(option);
        var data = {
          role: 'button',
          style: optionStyle,
          tabindex: disabled ? -1 : 0,
          class: PickerColumn_bem('item', {
            disabled: disabled,
            selected: index === state.index
          }),
          onClick: function onClick() {
            onClickItem(index);
          }
        };
        var childData = (_childData = {
          class: 'van-ellipsis'
        }, _childData[props.allowHtml ? 'innerHTML' : 'textContent'] = text, _childData);
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", data, [slots.option ? slots.option(option) : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", childData, null)]);
      });
    };

    var setValue = function setValue(value) {
      var options = state.options;

      for (var i = 0; i < options.length; i++) {
        if (getOptionText(options[i]) === value) {
          return setIndex(i);
        }
      }
    };

    var getValue = function getValue() {
      return state.options[state.index];
    };

    setIndex(state.index);
    useParent(PICKER_KEY);
    useExpose({
      state: state,
      setIndex: setIndex,
      getValue: getValue,
      setValue: setValue,
      setOptions: setOptions,
      stopMomentum: stopMomentum
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.initialOptions;
    }, setOptions);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.defaultIndex;
    }, function (value) {
      setIndex(value);
    });
    return function () {
      var wrapperStyle = {
        transform: "translate3d(0, " + (state.offset + baseOffset()) + "px, 0)",
        transitionDuration: state.duration + "ms",
        transitionProperty: state.duration ? 'all' : 'none'
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [PickerColumn_bem(), props.className],
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("ul", {
        "ref": wrapper,
        "style": wrapperStyle,
        "class": PickerColumn_bem('wrapper'),
        "onTransitionend": stopMomentum
      }, [renderOptions()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/picker/index.js




 // Utils


 // Composition


 // Components




var picker_createNamespace = createNamespace('picker'),
    picker_createComponent = picker_createNamespace[0],
    picker_bem = picker_createNamespace[1],
    t = picker_createNamespace[2];

/* harmony default export */ var es_picker = (picker_createComponent({
  props: _extends({}, pickerProps, {
    columnsFieldNames: Object,
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultIndex: {
      type: [Number, String],
      default: 0
    },
    toolbarPosition: {
      type: String,
      default: 'top'
    },
    // @deprecated
    // should be removed in next major version
    valueKey: {
      type: String,
      default: 'text'
    }
  }),
  emits: ['confirm', 'cancel', 'change'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var formattedColumns = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)([]);

    var _text$values$children = _extends({
      // compatible with valueKey prop
      text: props.valueKey,
      values: 'values',
      children: 'children'
    }, props.columnsFieldNames),
        textKey = _text$values$children.text,
        valuesKey = _text$values$children.values,
        childrenKey = _text$values$children.children;

    var _useChildren = useChildren(PICKER_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    linkChildren();
    var itemHeight = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return unitToPx(props.itemHeight);
    });
    var dataType = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var columns = props.columns;
      var firstColumn = columns[0] || {};

      if (firstColumn[childrenKey]) {
        return 'cascade';
      }

      if (firstColumn[valuesKey]) {
        return 'object';
      }

      return 'text';
    });

    var formatCascade = function formatCascade() {
      var _cursor;

      var formatted = [];
      var cursor = (_cursor = {}, _cursor[childrenKey] = props.columns, _cursor);

      while (cursor && cursor[childrenKey]) {
        var _cursor$defaultIndex, _formatted$push;

        var _children = cursor[childrenKey];
        var defaultIndex = (_cursor$defaultIndex = cursor.defaultIndex) != null ? _cursor$defaultIndex : +props.defaultIndex;

        while (_children[defaultIndex] && _children[defaultIndex].disabled) {
          if (defaultIndex < _children.length - 1) {
            defaultIndex++;
          } else {
            defaultIndex = 0;
            break;
          }
        }

        formatted.push((_formatted$push = {}, _formatted$push[valuesKey] = cursor[childrenKey], _formatted$push.className = cursor.className, _formatted$push.defaultIndex = defaultIndex, _formatted$push));
        cursor = _children[defaultIndex];
      }

      formattedColumns.value = formatted;
    };

    var format = function format() {
      var columns = props.columns;

      if (dataType.value === 'text') {
        var _ref2;

        formattedColumns.value = [(_ref2 = {}, _ref2[valuesKey] = columns, _ref2)];
      } else if (dataType.value === 'cascade') {
        formatCascade();
      } else {
        formattedColumns.value = columns;
      }
    }; // get indexes of all columns


    var getIndexes = function getIndexes() {
      return children.map(function (child) {
        return child.state.index;
      });
    }; // set options of column by index


    var setColumnValues = function setColumnValues(index, options) {
      var column = children[index];

      if (column) {
        column.setOptions(options);
      }
    };

    var onCascadeChange = function onCascadeChange(columnIndex) {
      var _cursor2;

      var cursor = (_cursor2 = {}, _cursor2[childrenKey] = props.columns, _cursor2);
      var indexes = getIndexes();

      for (var i = 0; i <= columnIndex; i++) {
        cursor = cursor[childrenKey][indexes[i]];
      }

      while (cursor && cursor[childrenKey]) {
        columnIndex++;
        setColumnValues(columnIndex, cursor[childrenKey]);
        cursor = cursor[childrenKey][cursor.defaultIndex || 0];
      }
    }; // get column instance by index


    var getColumn = function getColumn(index) {
      return children[index];
    }; // get column value by index


    var getColumnValue = function getColumnValue(index) {
      var column = getColumn(index);
      return column && column.getValue();
    }; // set column value by index


    var setColumnValue = function setColumnValue(index, value) {
      var column = getColumn(index);

      if (column) {
        column.setValue(value);

        if (dataType.value === 'cascade') {
          onCascadeChange(index);
        }
      }
    }; // get column option index by column index


    var getColumnIndex = function getColumnIndex(index) {
      return (getColumn(index) || {}).state.index;
    }; // set column option index by column index


    var setColumnIndex = function setColumnIndex(columnIndex, optionIndex) {
      var column = getColumn(columnIndex);

      if (column) {
        column.setIndex(optionIndex);

        if (props.dataType === 'cascade') {
          onCascadeChange(columnIndex);
        }
      }
    }; // get options of column by index


    var getColumnValues = function getColumnValues(index) {
      return (children[index] || {}).state.options;
    }; // get values of all columns


    var getValues = function getValues() {
      return children.map(function (child) {
        return child.getValue();
      });
    }; // set values of all columns


    var setValues = function setValues(values) {
      values.forEach(function (value, index) {
        setColumnValue(index, value);
      });
    }; // set indexes of all columns


    var setIndexes = function setIndexes(indexes) {
      indexes.forEach(function (optionIndex, columnIndex) {
        setColumnIndex(columnIndex, optionIndex);
      });
    };

    var emitAction = function emitAction(event) {
      if (dataType.value === 'text') {
        emit(event, getColumnValue(0), getColumnIndex(0));
      } else {
        emit(event, getValues(), getIndexes());
      }
    };

    var _onChange = function onChange(columnIndex) {
      if (dataType.value === 'cascade') {
        onCascadeChange(columnIndex);
      }

      if (dataType.value === 'text') {
        emit('change', getColumnValue(0), getColumnIndex(0));
      } else {
        emit('change', getValues(), columnIndex);
      }
    };

    var confirm = function confirm() {
      children.forEach(function (child) {
        return child.stopMomentum();
      });
      emitAction('confirm');
    };

    var cancel = function cancel() {
      emitAction('cancel');
    };

    var renderTitle = function renderTitle() {
      if (slots.title) {
        return slots.title();
      }

      if (props.title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [picker_bem('title'), 'van-ellipsis']
        }, [props.title]);
      }
    };

    var renderCancel = function renderCancel() {
      var text = props.cancelButtonText || t('cancel');
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
        "type": "button",
        "class": picker_bem('cancel'),
        "onClick": cancel
      }, [slots.cancel ? slots.cancel() : text]);
    };

    var renderConfirm = function renderConfirm() {
      var text = props.confirmButtonText || t('confirm');
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
        "type": "button",
        "class": picker_bem('confirm'),
        "onClick": confirm
      }, [slots.confirm ? slots.confirm() : text]);
    };

    var renderToolbar = function renderToolbar() {
      if (props.showToolbar) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": picker_bem('toolbar')
        }, [slots.default ? slots.default() : [renderCancel(), renderTitle(), renderConfirm()]]);
      }
    };

    var renderColumnItems = function renderColumnItems() {
      return formattedColumns.value.map(function (item, columnIndex) {
        var _item$defaultIndex;

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(PickerColumn, {
          "textKey": textKey,
          "readonly": props.readonly,
          "allowHtml": props.allowHtml,
          "className": item.className,
          "itemHeight": itemHeight.value,
          "defaultIndex": (_item$defaultIndex = item.defaultIndex) != null ? _item$defaultIndex : +props.defaultIndex,
          "swipeDuration": props.swipeDuration,
          "visibleItemCount": props.visibleItemCount,
          "initialOptions": item[valuesKey],
          "onChange": function onChange() {
            _onChange(columnIndex);
          }
        }, {
          option: slots.option
        });
      });
    };

    var renderColumns = function renderColumns() {
      var wrapHeight = itemHeight.value * props.visibleItemCount;
      var frameStyle = {
        height: itemHeight.value + "px"
      };
      var columnsStyle = {
        height: wrapHeight + "px"
      };
      var maskStyle = {
        backgroundSize: "100% " + (wrapHeight - itemHeight.value) / 2 + "px"
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": picker_bem('columns'),
        "style": columnsStyle,
        "onTouchmove": preventDefault
      }, [renderColumnItems(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": picker_bem('mask'),
        "style": maskStyle
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [BORDER_UNSET_TOP_BOTTOM, picker_bem('frame')],
        "style": frameStyle
      }, null)]);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.columns;
    }, format, {
      immediate: true
    });
    useExpose({
      confirm: confirm,
      getValues: getValues,
      setValues: setValues,
      getIndexes: getIndexes,
      setIndexes: setIndexes,
      getColumnIndex: getColumnIndex,
      setColumnIndex: setColumnIndex,
      getColumnValue: getColumnValue,
      setColumnValue: setColumnValue,
      getColumnValues: getColumnValues,
      setColumnValues: setColumnValues
    });
    return function () {
      var _slots$columnsTop, _slots$columnsBottom;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": picker_bem()
      }, [props.toolbarPosition === 'top' ? renderToolbar() : null, props.loading ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_loading, {
        "class": picker_bem('loading')
      }, null) : null, (_slots$columnsTop = slots['columns-top']) == null ? void 0 : _slots$columnsTop.call(slots), renderColumns(), (_slots$columnsBottom = slots['columns-bottom']) == null ? void 0 : _slots$columnsBottom.call(slots), props.toolbarPosition === 'bottom' ? renderToolbar() : null]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/area/index.js










var area_createNamespace = createNamespace('area'),
    area_createComponent = area_createNamespace[0],
    area_bem = area_createNamespace[1];

var EMPTY_CODE = '000000';

function isOverseaCode(code) {
  return code[0] === '9';
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/* harmony default export */ var es_area = (area_createComponent({
  props: _extends({}, pickerProps, {
    value: String,
    areaList: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    columnsNum: {
      type: [Number, String],
      default: 3
    },
    isOverseaCode: {
      type: Function,
      default: isOverseaCode
    },
    columnsPlaceholder: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  }),
  emits: ['change', 'confirm'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var pickerRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      code: props.value,
      columns: [{
        values: []
      }, {
        values: []
      }, {
        values: []
      }]
    });
    var areaList = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var areaList = props.areaList;
      return {
        province: areaList.province_list || {},
        city: areaList.city_list || {},
        county: areaList.county_list || {}
      };
    });
    var placeholderMap = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var columnsPlaceholder = props.columnsPlaceholder;
      return {
        province: columnsPlaceholder[0] || '',
        city: columnsPlaceholder[1] || '',
        county: columnsPlaceholder[2] || ''
      };
    });

    var getDefaultCode = function getDefaultCode() {
      if (props.columnsPlaceholder.length) {
        return EMPTY_CODE;
      }

      var _areaList$value = areaList.value,
          county = _areaList$value.county,
          city = _areaList$value.city;
      var countyCodes = Object.keys(county);

      if (countyCodes[0]) {
        return countyCodes[0];
      }

      var cityCodes = Object.keys(city);

      if (cityCodes[0]) {
        return cityCodes[0];
      }

      return '';
    }; // get list by code


    var getList = function getList(type, code) {
      var result = [];

      if (type !== 'province' && !code) {
        return result;
      }

      var list = areaList.value[type];
      result = Object.keys(list).map(function (listCode) {
        return {
          code: listCode,
          name: list[listCode]
        };
      });

      if (code) {
        // oversea code
        if (type === 'city' && props.isOverseaCode(code)) {
          code = '9';
        }

        result = result.filter(function (item) {
          return item.code.indexOf(code) === 0;
        });
      }

      if (placeholderMap.value[type] && result.length) {
        // set columns placeholder
        var codeFill = '';

        if (type === 'city') {
          codeFill = EMPTY_CODE.slice(2, 4);
        } else if (type === 'county') {
          codeFill = EMPTY_CODE.slice(4, 6);
        }

        result.unshift({
          code: code + codeFill,
          name: placeholderMap.value[type]
        });
      }

      return result;
    }; // get index by code


    var getIndex = function getIndex(type, code) {
      var compareNum = code.length;

      if (type === 'province') {
        compareNum = props.isOverseaCode(code) ? 1 : 2;
      }

      if (type === 'city') {
        compareNum = 4;
      }

      code = code.slice(0, compareNum);
      var list = getList(type, compareNum > 2 ? code.slice(0, compareNum - 2) : '');

      for (var i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    };

    var setValues = function setValues() {
      var code = state.code;

      if (!code) {
        code = getDefaultCode();
      }

      var picker = pickerRef.value;
      var province = getList('province');
      var city = getList('city', code.slice(0, 2));

      if (!picker) {
        return;
      }

      picker.setColumnValues(0, province);
      picker.setColumnValues(1, city);

      if (city.length && code.slice(2, 4) === '00' && !props.isOverseaCode(code)) {
        code = city[0].code;
      }

      picker.setColumnValues(2, getList('county', code.slice(0, 4)));
      picker.setIndexes([getIndex('province', code), getIndex('city', code), getIndex('county', code)]);
    }; // parse output columns data


    var parseValues = function parseValues(values) {
      return values.map(function (value, index) {
        if (value) {
          value = clone(value);

          if (!value.code || value.name === props.columnsPlaceholder[index]) {
            value.code = '';
            value.name = '';
          }
        }

        return value;
      });
    };

    var getValues = function getValues() {
      if (pickerRef.value) {
        var values = pickerRef.value.getValues().filter(function (value) {
          return !!value;
        });
        return parseValues(values);
      }

      return [];
    };

    var getArea = function getArea() {
      var values = getValues();
      var area = {
        code: '',
        country: '',
        province: '',
        city: '',
        county: ''
      };

      if (!values.length) {
        return area;
      }

      var names = values.map(function (item) {
        return item.name;
      });
      var validValues = values.filter(function (value) {
        return !!value.code;
      });
      area.code = validValues.length ? validValues[validValues.length - 1].code : '';

      if (props.isOverseaCode(area.code)) {
        area.country = names[1] || '';
        area.province = names[2] || '';
      } else {
        area.province = names[0] || '';
        area.city = names[1] || '';
        area.county = names[2] || '';
      }

      return area;
    };

    var reset = function reset(newCode) {
      if (newCode === void 0) {
        newCode = '';
      }

      state.code = newCode;
      setValues();
    };

    var onChange = function onChange(values, index) {
      state.code = values[index].code;
      setValues();
      var parsedValues = parseValues(pickerRef.value.getValues());
      emit('change', parsedValues, index);
    };

    var onConfirm = function onConfirm(values, index) {
      setValues();
      emit('confirm', parseValues(values), index);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(setValues);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.value;
    }, function (value) {
      state.code = value;
      setValues();
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.areaList;
    }, setValues, {
      deep: true
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.columnsNum;
    }, function () {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(setValues);
    });
    useExpose({
      reset: reset,
      getArea: getArea,
      getValues: getValues
    });
    return function () {
      var columns = state.columns.slice(0, +props.columnsNum);
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_picker, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": pickerRef,
        "class": area_bem(),
        "columns": columns,
        "valueKey": "name",
        "onChange": onChange,
        "onConfirm": onConfirm
      }, pick(props, ['title', 'loading', 'readonly', 'itemHeight', 'swipeDuration', 'visibleItemCount', 'cancelButtonText', 'confirmButtonText'])), _extends({}, pick(slots, ['title', 'columns-top', 'columns-bottom'])));
    };
  }
}));
;// CONCATENATED MODULE: ./es/cell/index.js

 // Utils

 // Composition

 // Components



var cell_createNamespace = createNamespace('cell'),
    cell_createComponent = cell_createNamespace[0],
    cell_bem = cell_createNamespace[1];

var cellProps = {
  icon: String,
  size: String,
  title: [Number, String],
  value: [Number, String],
  label: [Number, String],
  center: Boolean,
  isLink: Boolean,
  required: Boolean,
  iconPrefix: String,
  titleStyle: null,
  titleClass: null,
  valueClass: null,
  labelClass: null,
  arrowDirection: String,
  border: {
    type: Boolean,
    default: true
  },
  clickable: {
    type: Boolean,
    default: null
  }
};
/* harmony default export */ var cell = (cell_createComponent({
  props: _extends({}, cellProps, routeProps),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var route = useRoute();

    var renderLabel = function renderLabel() {
      var showLabel = slots.label || isDef(props.label);

      if (showLabel) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [cell_bem('label'), props.labelClass]
        }, [slots.label ? slots.label() : props.label]);
      }
    };

    var renderTitle = function renderTitle() {
      if (slots.title || isDef(props.title)) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [cell_bem('title'), props.titleClass],
          "style": props.titleStyle
        }, [slots.title ? slots.title() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [props.title]), renderLabel()]);
      }
    };

    var renderValue = function renderValue() {
      var hasTitle = slots.title || isDef(props.title);
      var hasValue = slots.default || isDef(props.value);

      if (hasValue) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [cell_bem('value', {
            alone: !hasTitle
          }), props.valueClass]
        }, [slots.default ? slots.default() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [props.value])]);
      }
    };

    var renderLeftIcon = function renderLeftIcon() {
      if (slots.icon) {
        return slots.icon();
      }

      if (props.icon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": props.icon,
          "class": cell_bem('left-icon'),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    var renderRightIcon = function renderRightIcon() {
      if (slots['right-icon']) {
        return slots['right-icon']();
      }

      if (props.isLink) {
        var name = props.arrowDirection ? "arrow-" + props.arrowDirection : 'arrow';
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": name,
          "class": cell_bem('right-icon')
        }, null);
      }
    };

    return function () {
      var _props$clickable;

      var size = props.size,
          center = props.center,
          border = props.border,
          isLink = props.isLink,
          required = props.required;
      var clickable = (_props$clickable = props.clickable) != null ? _props$clickable : isLink;
      var classes = {
        center: center,
        required: required,
        clickable: clickable,
        borderless: !border
      };

      if (size) {
        classes[size] = !!size;
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": cell_bem(classes),
        "role": clickable ? 'button' : undefined,
        "tabindex": clickable ? 0 : undefined,
        "onClick": route
      }, [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), slots.extra == null ? void 0 : slots.extra()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/utils/validate/system.js

function isAndroid() {
  return inBrowser ? /android/.test(navigator.userAgent.toLowerCase()) : false;
}
function isIOS() {
  return inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
}
;// CONCATENATED MODULE: ./es/utils/dom/scroll.js


function isWindow(val) {
  return val === window;
}

function getScrollTop(el) {
  var top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset; // iOS scroll bounce cause minus scrollTop

  return Math.max(top, 0);
}
function setScrollTop(el, value) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
} // get distance from element top to page top or scroller top

function getElementTop(el, scroller) {
  if (isWindow(el)) {
    return 0;
  }

  var scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return el.getBoundingClientRect().top + scrollTop;
}
function getVisibleHeight(el) {
  if (isWindow(el)) {
    return el.innerHeight;
  }

  return el.getBoundingClientRect().height;
}
function getVisibleTop(el) {
  if (isWindow(el)) {
    return 0;
  }

  return el.getBoundingClientRect().top;
}
var scroll_isIOS = isIOS(); // hack for iOS12 page scroll
// see: https://developers.weixin.qq.com/community/develop/doc/00044ae90742f8c82fb78fcae56800

function resetScroll() {
  if (scroll_isIOS) {
    setRootScrollTop(getRootScrollTop());
  }
}
;// CONCATENATED MODULE: ./es/field/utils.js
function isEmptyValue(value) {
  if (Array.isArray(value)) {
    return !value.length;
  }

  if (value === 0) {
    return false;
  }

  return !value;
}

function runSyncRule(value, rule) {
  if (rule.required && isEmptyValue(value)) {
    return false;
  }

  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false;
  }

  return true;
}
;// CONCATENATED MODULE: ./es/composables/use-link-field.js

var FORM_KEY = 'vanForm';
var FIELD_KEY = 'vanField';
function useLinkField(getValue) {
  var field = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.inject)(FIELD_KEY, null);

  if (field && !field.childFieldValue.value) {
    field.childFieldValue.value = getValue;
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(getValue, function () {
      field.resetValidation();
      field.validateWithTrigger('onChange');
    });
  }
}
;// CONCATENATED MODULE: ./es/field/index.js






 // Utils


 // Composition



 // Components




function field_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var field_createNamespace = createNamespace('field'),
    field_createComponent = field_createNamespace[0],
    field_bem = field_createNamespace[1];

/* harmony default export */ var es_field = (field_createComponent({
  props: _extends({}, cellProps, {
    rows: [Number, String],
    name: String,
    rules: Array,
    autosize: [Boolean, Object],
    leftIcon: String,
    rightIcon: String,
    clearable: Boolean,
    formatter: Function,
    maxlength: [Number, String],
    labelWidth: [Number, String],
    labelClass: null,
    labelAlign: String,
    inputAlign: String,
    placeholder: String,
    autocomplete: String,
    errorMessage: String,
    errorMessageAlign: String,
    showWordLimit: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: Boolean,
      default: null
    },
    colon: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    readonly: {
      type: Boolean,
      default: null
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    clearTrigger: {
      type: String,
      default: 'focus'
    },
    formatTrigger: {
      type: String,
      default: 'onChange'
    }
  }),
  emits: ['blur', 'focus', 'clear', 'keypress', 'click-input', 'click-left-icon', 'click-right-icon', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      focused: false,
      validateFailed: false,
      validateMessage: ''
    });
    var inputRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var childFieldValue = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var _useParent = useParent(FORM_KEY),
        form = _useParent.parent;

    var getProp = function getProp(key) {
      if (isDef(props[key])) {
        return props[key];
      }

      if (form && isDef(form.props[key])) {
        return form.props[key];
      }
    };

    var showClear = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var readonly = getProp('readonly');

      if (props.clearable && !readonly) {
        var hasValue = isDef(props.modelValue) && props.modelValue !== '';

        var _trigger = props.clearTrigger === 'always' || props.clearTrigger === 'focus' && state.focused;

        return hasValue && _trigger;
      }
    });
    var formValue = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (childFieldValue.value && slots.input) {
        return childFieldValue.value();
      }

      return props.modelValue;
    });

    var runValidator = function runValidator(value, rule) {
      return new Promise(function (resolve) {
        var returnVal = rule.validator(value, rule);

        if (isPromise(returnVal)) {
          return returnVal.then(resolve);
        }

        resolve(returnVal);
      });
    };

    var getRuleMessage = function getRuleMessage(value, rule) {
      var message = rule.message;

      if (isFunction(message)) {
        return message(value, rule);
      }

      return message;
    };

    var runRules = function runRules(rules) {
      return rules.reduce(function (promise, rule) {
        return promise.then(function () {
          if (state.validateFailed) {
            return;
          }

          var value = formValue.value;

          if (rule.formatter) {
            value = rule.formatter(value, rule);
          }

          if (!runSyncRule(value, rule)) {
            state.validateFailed = true;
            state.validateMessage = getRuleMessage(value, rule);
            return;
          }

          if (rule.validator) {
            return runValidator(value, rule).then(function (result) {
              if (result && typeof result === 'string') {
                state.validateFailed = true;
                state.validateMessage = result;
              } else if (result === false) {
                state.validateFailed = true;
                state.validateMessage = getRuleMessage(value, rule);
              }
            });
          }
        });
      }, Promise.resolve());
    };

    var resetValidation = function resetValidation() {
      if (state.validateFailed) {
        state.validateFailed = false;
        state.validateMessage = '';
      }
    };

    var validate = function validate(rules) {
      if (rules === void 0) {
        rules = props.rules;
      }

      return new Promise(function (resolve) {
        if (!rules) {
          resolve();
        }

        resetValidation();
        runRules(rules).then(function () {
          if (state.validateFailed) {
            resolve({
              name: props.name,
              message: state.validateMessage
            });
          } else {
            resolve();
          }
        });
      });
    };

    var validateWithTrigger = function validateWithTrigger(trigger) {
      if (form && props.rules) {
        var defaultTrigger = form.props.validateTrigger === trigger;
        var rules = props.rules.filter(function (rule) {
          if (rule.trigger) {
            return rule.trigger === trigger;
          }

          return defaultTrigger;
        });
        validate(rules);
      }
    };

    var updateValue = function updateValue(value, trigger) {
      if (trigger === void 0) {
        trigger = 'onChange';
      }

      value = isDef(value) ? String(value) : ''; // native maxlength have incorrect line-break counting
      // see: https://github.com/youzan/vant/issues/5033

      var maxlength = props.maxlength,
          modelValue = props.modelValue;

      if (isDef(maxlength) && value.length > maxlength) {
        if (modelValue && modelValue.length === +maxlength) {
          value = modelValue;
        } else {
          value = value.slice(0, maxlength);
        }
      }

      if (props.type === 'number' || props.type === 'digit') {
        var isNumber = props.type === 'number';
        value = formatNumber(value, isNumber, isNumber);
      }

      if (props.formatter && trigger === props.formatTrigger) {
        value = props.formatter(value);
      }

      if (inputRef.value && value !== inputRef.value.value) {
        inputRef.value.value = value;
      }

      if (value !== props.modelValue) {
        emit('update:modelValue', value);
      }
    };

    var onInput = function onInput(event) {
      // skip update value when composing
      if (!event.target.composing) {
        updateValue(event.target.value);
      }
    };

    var focus = function focus() {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    };

    var blur = function blur() {
      if (inputRef.value) {
        inputRef.value.blur();
      }
    };

    var onFocus = function onFocus(event) {
      state.focused = true;
      emit('focus', event); // readonly not work in lagacy mobile safari

      var readonly = getProp('readonly');

      if (readonly) {
        blur();
      }
    };

    var onBlur = function onBlur(event) {
      state.focused = false;
      updateValue(props.modelValue, 'onBlur');
      emit('blur', event);
      validateWithTrigger('onBlur');
      resetScroll();
    };

    var onClickInput = function onClickInput(event) {
      emit('click-input', event);
    };

    var onClickLeftIcon = function onClickLeftIcon(event) {
      emit('click-left-icon', event);
    };

    var onClickRightIcon = function onClickRightIcon(event) {
      emit('click-right-icon', event);
    };

    var onClear = function onClear(event) {
      preventDefault(event);
      emit('update:modelValue', '');
      emit('clear', event);
    };

    var showError = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (typeof props.error === 'boolean') {
        return props.error;
      }

      if (form && form.props.showError && state.validateFailed) {
        return true;
      }
    });
    var labelStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var labelWidth = getProp('labelWidth');

      if (labelWidth) {
        return {
          width: addUnit(labelWidth)
        };
      }
    });

    var onKeypress = function onKeypress(event) {
      var ENTER_CODE = 13;

      if (event.keyCode === ENTER_CODE) {
        var submitOnEnter = getProp('submitOnEnter');

        if (!submitOnEnter && props.type !== 'textarea') {
          preventDefault(event);
        } // trigger blur after click keyboard search button


        if (props.type === 'search') {
          blur();
        }
      }

      emit('keypress', event);
    };

    var onCompositionStart = function onCompositionStart(event) {
      event.target.composing = true;
    };

    var onCompositionEnd = function onCompositionEnd(event) {
      var target = event.target;

      if (target.composing) {
        target.composing = false;
        trigger(target, 'input');
      }
    };

    var adjustSize = function adjustSize() {
      var input = inputRef.value;

      if (!(props.type === 'textarea' && props.autosize) || !input) {
        return;
      }

      input.style.height = 'auto';
      var height = input.scrollHeight;

      if (isObject(props.autosize)) {
        var _props$autosize = props.autosize,
            maxHeight = _props$autosize.maxHeight,
            minHeight = _props$autosize.minHeight;

        if (maxHeight) {
          height = Math.min(height, maxHeight);
        }

        if (minHeight) {
          height = Math.max(height, minHeight);
        }
      }

      if (height) {
        input.style.height = height + 'px';
      }
    };

    var renderInput = function renderInput() {
      var disabled = getProp('disabled');
      var readonly = getProp('readonly');
      var inputAlign = getProp('inputAlign');

      if (slots.input) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": field_bem('control', [inputAlign, 'custom']),
          "onClick": onClickInput
        }, [slots.input()]);
      }

      var inputProps = {
        ref: inputRef,
        name: props.name,
        rows: props.rows,
        class: field_bem('control', inputAlign),
        value: props.modelValue,
        disabled: disabled,
        readonly: readonly,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        onBlur: onBlur,
        onFocus: onFocus,
        onInput: onInput,
        onClick: onClickInput,
        onChange: onCompositionEnd,
        onKeypress: onKeypress,
        onCompositionend: onCompositionEnd,
        onCompositionstart: onCompositionStart
      };
      var type = props.type;

      if (type === 'textarea') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("textarea", inputProps, null);
      }

      var inputType = type;
      var inputMode; // type="number" is weired in iOS, and can't prevent dot in Android
      // so use inputmode to set keyboard in mordern browers

      if (type === 'number') {
        inputType = 'text';
        inputMode = 'decimal';
      }

      if (type === 'digit') {
        inputType = 'tel';
        inputMode = 'numeric';
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("input", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "type": inputType,
        "inputmode": inputMode
      }, inputProps), null);
    };

    var renderLeftIcon = function renderLeftIcon() {
      var leftIconSlot = slots['left-icon'];

      if (props.leftIcon || leftIconSlot) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": field_bem('left-icon'),
          "onClick": onClickLeftIcon
        }, [leftIconSlot ? leftIconSlot() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": props.leftIcon,
          "classPrefix": props.iconPrefix
        }, null)]);
      }
    };

    var renderRightIcon = function renderRightIcon() {
      var rightIconSlot = slots['right-icon'];

      if (props.rightIcon || rightIconSlot) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": field_bem('right-icon'),
          "onClick": onClickRightIcon
        }, [rightIconSlot ? rightIconSlot() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": props.rightIcon,
          "classPrefix": props.iconPrefix
        }, null)]);
      }
    };

    var renderWordLimit = function renderWordLimit() {
      if (props.showWordLimit && props.maxlength) {
        var count = (props.modelValue || '').length;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": field_bem('word-limit')
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": field_bem('word-num')
        }, field_isSlot(count) ? count : {
          default: function _default() {
            return [count];
          }
        }), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createTextVNode)("/"), props.maxlength]);
      }
    };

    var renderMessage = function renderMessage() {
      if (form && form.props.showErrorMessage === false) {
        return;
      }

      var message = props.errorMessage || state.validateMessage;

      if (message) {
        var errorMessageAlign = getProp('errorMessageAlign');
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": field_bem('error-message', errorMessageAlign)
        }, field_isSlot(message) ? message : {
          default: function _default() {
            return [message];
          }
        });
      }
    };

    var renderLabel = function renderLabel() {
      var colon = getProp('colon') ? ':' : '';

      if (slots.label) {
        return [slots.label(), colon];
      }

      if (props.label) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [props.label + colon]);
      }
    };

    useExpose({
      blur: blur,
      focus: focus,
      validate: validate,
      formValue: formValue,
      resetValidation: resetValidation
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.provide)(FIELD_KEY, {
      childFieldValue: childFieldValue,
      resetValidation: resetValidation,
      validateWithTrigger: validateWithTrigger
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.modelValue;
    }, function (value) {
      updateValue(value);
      resetValidation();
      validateWithTrigger('onChange');
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(adjustSize);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
      updateValue(props.modelValue, props.formatTrigger);
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(adjustSize);
    });
    return function () {
      var _bem;

      var disabled = getProp('disabled');
      var labelAlign = getProp('labelAlign');
      var Label = renderLabel();
      var LeftIcon = renderLeftIcon();
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell, {
        "size": props.size,
        "icon": props.leftIcon,
        "class": field_bem((_bem = {
          error: showError.value,
          disabled: disabled
        }, _bem["label-" + labelAlign] = labelAlign, _bem['min-height'] = props.type === 'textarea' && !props.autosize, _bem)),
        "center": props.center,
        "border": props.border,
        "isLink": props.isLink,
        "required": props.required,
        "clickable": props.clickable,
        "titleStyle": labelStyle.value,
        "valueClass": field_bem('value'),
        "titleClass": [field_bem('label', labelAlign), props.labelClass],
        "arrowDirection": props.arrowDirection
      }, {
        default: function _default() {
          return [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
            "class": field_bem('body')
          }, [renderInput(), showClear.value && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
            "name": "clear",
            "class": field_bem('clear'),
            "onTouchstart": onClear
          }, null), renderRightIcon(), slots.button && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
            "class": field_bem('button')
          }, [slots.button()])]), renderWordLimit(), renderMessage()];
        },
        icon: LeftIcon ? function () {
          return LeftIcon;
        } : null,
        title: Label ? function () {
          return Label;
        } : null,
        extra: slots.extra
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/utils/mount-component.js



function usePopupState() {
  var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
    show: false
  });

  var toggle = function toggle(show) {
    state.show = show;
  };

  var open = function open(props) {
    _extends(state, props);

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
      toggle(true);
    });
  };

  var close = function close() {
    toggle(false);
  };

  useExpose({
    open: open,
    close: close,
    toggle: toggle
  });
  return {
    open: open,
    close: close,
    state: state,
    toggle: toggle
  };
}
function mountComponent(RootComponent) {
  var app = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createApp)(RootComponent);
  var root = document.createElement('div');
  document.body.appendChild(root);
  return {
    instance: app.mount(root),
    unmount: function unmount() {
      app.unmount(root);
      document.body.removeChild(root);
    }
  };
}
;// CONCATENATED MODULE: ./es/toast/lock-click.js
var lockCount = 0;
function lockClick(lock) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add('van-toast--unclickable');
    }

    lockCount++;
  } else if (lockCount) {
    lockCount--;

    if (!lockCount) {
      document.body.classList.remove('van-toast--unclickable');
    }
  }
}
;// CONCATENATED MODULE: ./es/toast/Toast.js



 // Utils


 // Components





function Toast_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var Toast_createNamespace = createNamespace('toast'),
    Toast_createComponent = Toast_createNamespace[0],
    Toast_bem = Toast_createNamespace[1];

/* harmony default export */ var Toast = (Toast_createComponent({
  props: {
    icon: String,
    show: Boolean,
    message: [Number, String],
    duration: Number,
    className: null,
    iconPrefix: String,
    lockScroll: Boolean,
    loadingType: String,
    forbidClick: Boolean,
    overlayClass: null,
    overlayStyle: Object,
    closeOnClick: Boolean,
    closeOnClickOverlay: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    position: {
      type: String,
      default: 'middle'
    },
    transition: {
      type: String,
      default: 'van-fade'
    }
  },
  emits: ['update:show'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var timer;
    var clickable = false;

    var toggleClickable = function toggleClickable() {
      var newValue = props.show && props.forbidClick;

      if (clickable !== newValue) {
        clickable = newValue;
        lockClick(clickable);
      }
    };

    var onClick = function onClick() {
      if (props.closeOnClick) {
        emit('update:show', false);
      }
    };

    var clearTimer = function clearTimer() {
      clearTimeout(timer);
    };

    var toggle = function toggle(show) {
      emit('update:show', show);
    };

    var renderIcon = function renderIcon() {
      var icon = props.icon,
          type = props.type,
          iconPrefix = props.iconPrefix,
          loadingType = props.loadingType;
      var hasIcon = icon || type === 'success' || type === 'fail';

      if (hasIcon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": icon || type,
          "class": Toast_bem('icon'),
          "classPrefix": iconPrefix
        }, null);
      }

      if (type === 'loading') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_loading, {
          "class": Toast_bem('loading'),
          "type": loadingType
        }, null);
      }
    };

    var renderMessage = function renderMessage() {
      var type = props.type,
          message = props.message;

      if (isDef(message) && message !== '') {
        return type === 'html' ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Toast_bem('text'),
          "innerHTML": message
        }, null) : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Toast_bem('text')
        }, Toast_isSlot(message) ? message : {
          default: function _default() {
            return [message];
          }
        });
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([function () {
      return props.show;
    }, function () {
      return props.forbidClick;
    }], toggleClickable);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([function () {
      return props.show;
    }, function () {
      return props.duration;
    }], function () {
      clearTimer();

      if (props.show && props.duration > 0) {
        timer = setTimeout(function () {
          emit('update:show', false);
        }, props.duration);
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(toggleClickable);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onUnmounted)(toggleClickable);
    return function () {
      var _ref2;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "show": props.show,
        "class": [Toast_bem([props.position, (_ref2 = {}, _ref2[props.type] = !props.icon, _ref2)]), props.className],
        "lockScroll": false,
        "transition": props.transition,
        "overlayClass": props.overlayClass,
        "overlayStyle": props.overlayStyle,
        "closeOnClickOverlay": props.closeOnClickOverlay,
        "onClick": onClick,
        "onClosed": clearTimer
      }, {
        'onUpdate:show': toggle
      }), {
        default: function _default() {
          return [renderIcon(), renderMessage()];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/toast/index.js






var defaultOptions = {
  icon: '',
  type: 'text',
  message: '',
  className: '',
  overlay: false,
  onClose: null,
  onOpened: null,
  duration: 2000,
  teleport: 'body',
  iconPrefix: undefined,
  position: 'middle',
  transition: 'van-fade',
  forbidClick: false,
  loadingType: undefined,
  overlayClass: '',
  overlayStyle: null,
  closeOnClick: false,
  closeOnClickOverlay: false
}; // default options of specific type

var defaultOptionsMap = {};
var queue = [];
var allowMultiple = false;

var currentOptions = _extends({}, defaultOptions);

function parseOptions(message) {
  if (isObject(message)) {
    return message;
  }

  return {
    message: message
  };
}

function createInstance() {
  var _mountComponent = mountComponent({
    setup: function setup() {
      var message = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

      var _usePopupState = usePopupState(),
          open = _usePopupState.open,
          state = _usePopupState.state,
          close = _usePopupState.close,
          toggle = _usePopupState.toggle;

      var onClosed = function onClosed() {
        if (allowMultiple) {
          queue = queue.filter(function (item) {
            return item !== instance;
          });
          unmount();
        }
      };

      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(message, function (value) {
        state.message = value;
      });

      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)().render = function () {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Toast, _extends({}, state, {
          onClosed: onClosed,
          'onUpdate:show': toggle
        }), null);
      };

      return {
        open: open,
        clear: close,
        message: message
      };
    }
  }),
      instance = _mountComponent.instance,
      unmount = _mountComponent.unmount;

  return instance;
}

function getInstance() {
  /* istanbul ignore if */
  if (!inBrowser) {
    return {};
  }

  if (!queue.length || allowMultiple) {
    var instance = createInstance();
    queue.push(instance);
  }

  return queue[queue.length - 1];
}

function toast_Toast(options) {
  if (options === void 0) {
    options = {};
  }

  var toast = getInstance();
  options = parseOptions(options);
  options = _extends({}, currentOptions, defaultOptionsMap[options.type || currentOptions.type], options);
  toast.open(options);
  return toast;
}

var createMethod = function createMethod(type) {
  return function (options) {
    return toast_Toast(_extends({
      type: type
    }, parseOptions(options)));
  };
};

['loading', 'success', 'fail'].forEach(function (method) {
  toast_Toast[method] = createMethod(method);
});

toast_Toast.clear = function (all) {
  if (queue.length) {
    if (all) {
      queue.forEach(function (toast) {
        toast.clear();
      });
      queue = [];
    } else if (!allowMultiple) {
      queue[0].clear();
    } else {
      queue.shift().clear();
    }
  }
};

toast_Toast.setDefaultOptions = function (type, options) {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = options;
  } else {
    _extends(currentOptions, type);
  }
};

toast_Toast.resetDefaultOptions = function (type) {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = null;
  } else {
    currentOptions = _extends({}, defaultOptions);
    defaultOptionsMap = {};
  }
};

toast_Toast.allowMultiple = function (value) {
  if (value === void 0) {
    value = true;
  }

  allowMultiple = value;
};

toast_Toast.install = function (app) {
  app.use(Toast);
  app.config.globalProperties.$toast = toast_Toast;
};

/* harmony default export */ var toast = (toast_Toast);
;// CONCATENATED MODULE: ./es/utils/interceptor.js

function callInterceptor(options) {
  var interceptor = options.interceptor,
      args = options.args,
      done = options.done,
      canceled = options.canceled;

  if (interceptor) {
    // eslint-disable-next-line prefer-spread
    var returnVal = interceptor.apply(null, args || []);

    if (isPromise(returnVal)) {
      returnVal.then(function (value) {
        if (value) {
          done();
        } else if (canceled) {
          canceled();
        }
      }).catch(noop);
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}
;// CONCATENATED MODULE: ./es/dialog/Dialog.js




 // Utils



 // Components






function Dialog_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var Dialog_createNamespace = createNamespace('dialog'),
    Dialog_createComponent = Dialog_createNamespace[0],
    Dialog_bem = Dialog_createNamespace[1],
    Dialog_t = Dialog_createNamespace[2];

var popupKeys = [].concat(Object.keys(popupSharedProps), ['transition', 'closeOnPopstate']);
/* harmony default export */ var Dialog = (Dialog_createComponent({
  props: _extends({}, popupSharedProps, {
    title: String,
    theme: String,
    width: [Number, String],
    message: String,
    callback: Function,
    allowHtml: Boolean,
    className: null,
    beforeClose: Function,
    messageAlign: String,
    showCancelButton: Boolean,
    cancelButtonText: String,
    cancelButtonColor: String,
    confirmButtonText: String,
    confirmButtonColor: String,
    closeOnClickOverlay: Boolean,
    transition: {
      type: String,
      default: 'van-dialog-bounce'
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    }
  }),
  emits: ['confirm', 'cancel', 'update:show'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var loading = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      confirm: false,
      cancel: false
    });

    var onUpdateShow = function onUpdateShow(value) {
      emit('update:show', value);
    };

    var close = function close(action) {
      onUpdateShow(false);

      if (props.callback) {
        props.callback(action);
      }
    };

    var handleAction = function handleAction(action) {
      // should not trigger close event when hidden
      if (!props.show) {
        return;
      }

      emit(action);

      if (props.beforeClose) {
        loading[action] = true;
        callInterceptor({
          interceptor: props.beforeClose,
          args: [action],
          done: function done() {
            close(action);
            loading[action] = false;
          },
          canceled: function canceled() {
            loading[action] = false;
          }
        });
      } else {
        close(action);
      }
    };

    var renderTitle = function renderTitle() {
      var title = slots.title ? slots.title() : props.title;

      if (title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Dialog_bem('header', {
            isolated: !props.message && !slots.default
          })
        }, Dialog_isSlot(title) ? title : {
          default: function _default() {
            return [title];
          }
        });
      }
    };

    var renderContent = function renderContent() {
      if (slots.default) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Dialog_bem('content')
        }, [slots.default()]);
      }

      var title = props.title,
          message = props.message,
          allowHtml = props.allowHtml,
          messageAlign = props.messageAlign;

      if (message) {
        var _bem, _ref2;

        var hasTitle = title || slots.title;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "key": allowHtml ? 1 : 0,
          "class": Dialog_bem('content', {
            isolated: !hasTitle
          })
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
          "class": Dialog_bem('message', (_bem = {
            'has-title': hasTitle
          }, _bem[messageAlign] = messageAlign, _bem))
        }, (_ref2 = {}, _ref2[allowHtml ? 'innerHTML' : 'textContent'] = message, _ref2)), null)]);
      }
    };

    var renderButtons = function renderButtons() {
      var _ref3;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [BORDER_TOP, Dialog_bem('footer')]
      }, [props.showCancelButton && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
        "size": "large",
        "text": props.cancelButtonText || Dialog_t('cancel'),
        "class": Dialog_bem('cancel'),
        "style": {
          color: props.cancelButtonColor
        },
        "loading": loading.cancel,
        "onClick": function onClick() {
          handleAction('cancel');
        }
      }, null), props.showConfirmButton && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
        "size": "large",
        "text": props.confirmButtonText || Dialog_t('confirm'),
        "class": [Dialog_bem('confirm'), (_ref3 = {}, _ref3[BORDER_LEFT] = props.showCancelButton, _ref3)],
        "style": {
          color: props.confirmButtonColor
        },
        "loading": loading.confirm,
        "onClick": function onClick() {
          handleAction('confirm');
        }
      }, null)]);
    };

    var renderRoundButtons = function renderRoundButtons() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(action_bar, {
        "class": Dialog_bem('footer')
      }, {
        default: function _default() {
          return [props.showCancelButton && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(action_bar_button, {
            "size": "large",
            "type": "warning",
            "text": props.cancelButtonText || Dialog_t('cancel'),
            "class": Dialog_bem('cancel'),
            "color": props.cancelButtonColor,
            "loading": loading.cancel,
            "onClick": function onClick() {
              handleAction('cancel');
            }
          }, null), props.showConfirmButton && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(action_bar_button, {
            "size": "large",
            "type": "danger",
            "text": props.confirmButtonText || Dialog_t('confirm'),
            "class": Dialog_bem('confirm'),
            "color": props.confirmButtonColor,
            "loading": loading.confirm,
            "onClick": function onClick() {
              handleAction('confirm');
            }
          }, null)];
        }
      });
    };

    return function () {
      var width = props.width,
          title = props.title,
          theme = props.theme,
          message = props.message,
          className = props.className;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "role": "dialog",
        "class": [Dialog_bem([theme]), className],
        "style": {
          width: addUnit(width)
        },
        "aria-labelledby": title || message
      }, _extends({}, pick(props, popupKeys), {
        'onUpdate:show': onUpdateShow
      })), {
        default: function _default() {
          return [renderTitle(), renderContent(), theme === 'round-button' ? renderRoundButtons() : renderButtons()];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/dialog/index.js





var instance;

function initInstance() {
  var Wrapper = {
    setup: function setup() {
      var _usePopupState = usePopupState(),
          state = _usePopupState.state,
          toggle = _usePopupState.toggle;

      return function () {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Dialog, _extends({}, state, {
          'onUpdate:show': toggle
        }), null);
      };
    }
  };

  var _mountComponent = mountComponent(Wrapper);

  instance = _mountComponent.instance;
}

function dialog_Dialog(options) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return Promise.resolve();
  }

  return new Promise(function (resolve, reject) {
    if (!instance) {
      initInstance();
    }

    instance.open(_extends({}, dialog_Dialog.currentOptions, options, {
      callback: function callback(action) {
        (action === 'confirm' ? resolve : reject)(action);
      }
    }));
  });
}

dialog_Dialog.defaultOptions = {
  title: '',
  width: '',
  theme: null,
  message: '',
  overlay: true,
  callback: null,
  teleport: 'body',
  className: '',
  allowHtml: false,
  lockScroll: true,
  transition: 'van-dialog-bounce',
  beforeClose: null,
  overlayClass: '',
  overlayStyle: null,
  messageAlign: '',
  cancelButtonText: '',
  cancelButtonColor: null,
  confirmButtonText: '',
  confirmButtonColor: null,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false
};
dialog_Dialog.alert = dialog_Dialog;

dialog_Dialog.confirm = function (options) {
  return dialog_Dialog(_extends({
    showCancelButton: true
  }, options));
};

dialog_Dialog.close = function () {
  if (instance) {
    instance.toggle(false);
  }
};

dialog_Dialog.setDefaultOptions = function (options) {
  _extends(dialog_Dialog.currentOptions, options);
};

dialog_Dialog.resetDefaultOptions = function () {
  dialog_Dialog.currentOptions = _extends({}, dialog_Dialog.defaultOptions);
};

dialog_Dialog.resetDefaultOptions();

dialog_Dialog.install = function (app) {
  app.use(Dialog);
  app.config.globalProperties.$dialog = dialog_Dialog;
};

dialog_Dialog.Component = Dialog;
/* harmony default export */ var dialog = (dialog_Dialog);
;// CONCATENATED MODULE: ./es/address-edit/Detail.js




 // Utils


 // Components




var Detail_createNamespace = createNamespace('address-edit-detail'),
    Detail_createComponent = Detail_createNamespace[0],
    Detail_bem = Detail_createNamespace[1],
    Detail_t = Detail_createNamespace[2];

var android = isAndroid();
/* harmony default export */ var Detail = (Detail_createComponent({
  props: {
    show: Boolean,
    value: String,
    errorMessage: String,
    focused: Boolean,
    detailRows: [Number, String],
    searchResult: Array,
    detailMaxlength: [Number, String],
    showSearchResult: Boolean
  },
  emits: ['blur', 'focus', 'input', 'select-search'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var field = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var showSearchResult = function showSearchResult() {
      return props.focused && props.searchResult && props.showSearchResult;
    };

    var onSelect = function onSelect(express) {
      emit('select-search', express);
      emit('input', ((express.address || '') + " " + (express.name || '')).trim());
    };

    var onFinish = function onFinish() {
      field.value.blur();
    };

    var renderFinish = function renderFinish() {
      if (props.value && props.focused && android) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Detail_bem('finish'),
          "onClick": onFinish
        }, [Detail_t('complete')]);
      }
    };

    var renderSearchTitle = function renderSearchTitle(express) {
      if (express.name) {
        var text = express.name.replace(props.value, "<span class=" + Detail_bem('keyword') + ">" + props.value + "</span>");
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "innerHTML": text
        }, null);
      }
    };

    var renderSearchResult = function renderSearchResult() {
      if (!showSearchResult()) {
        return;
      }

      var searchResult = props.searchResult;
      return searchResult.map(function (express) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell, {
          "clickable": true,
          "key": express.name + express.address,
          "icon": "location-o",
          "label": express.address,
          "class": Detail_bem('search-item'),
          "border": false,
          "onClick": function onClick() {
            onSelect(express);
          }
        }, {
          title: function title() {
            return renderSearchTitle(express);
          }
        });
      });
    };

    var onFocus = function onFocus(event) {
      emit('focus', event);
    };

    var onBlur = function onBlur(event) {
      emit('blur', event);
    };

    var onInput = function onInput(value) {
      emit('input', value);
    };

    return function () {
      if (props.show) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Fragment, null, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_field, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
          "autosize": true,
          "ref": field,
          "class": Detail_bem(),
          "rows": props.detailRows,
          "type": "textarea",
          "label": Detail_t('label'),
          "border": !showSearchResult(),
          "clearable": !android,
          "maxlength": props.detailMaxlength,
          "modelValue": props.value,
          "placeholder": Detail_t('placeholder'),
          "errorMessage": props.errorMessage,
          "onBlur": onBlur,
          "onFocus": onFocus
        }, {
          'onUpdate:modelValue': onInput
        }), {
          icon: renderFinish
        }), renderSearchResult()]);
      }
    };
  }
}));
;// CONCATENATED MODULE: ./es/switch/index.js





var switch_createNamespace = createNamespace('switch'),
    switch_createComponent = switch_createNamespace[0],
    switch_bem = switch_createNamespace[1];

/* harmony default export */ var es_switch = (switch_createComponent({
  props: {
    size: [Number, String],
    loading: Boolean,
    disabled: Boolean,
    modelValue: null,
    activeColor: String,
    inactiveColor: String,
    activeValue: {
      type: null,
      default: true
    },
    inactiveValue: {
      type: null,
      default: false
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var isChecked = function isChecked() {
      return props.modelValue === props.activeValue;
    };

    var onClick = function onClick() {
      if (!props.disabled && !props.loading) {
        var newValue = isChecked() ? props.inactiveValue : props.activeValue;
        emit('update:modelValue', newValue);
        emit('change', newValue);
      }
    };

    var renderLoading = function renderLoading() {
      if (props.loading) {
        var color = isChecked() ? props.activeColor : props.inactiveColor;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_loading, {
          "class": switch_bem('loading'),
          "color": color
        }, null);
      }
    };

    useLinkField(function () {
      return props.modelValue;
    });
    return function () {
      var size = props.size,
          loading = props.loading,
          disabled = props.disabled,
          activeColor = props.activeColor,
          inactiveColor = props.inactiveColor;
      var checked = isChecked();
      var style = {
        fontSize: addUnit(size),
        backgroundColor: checked ? activeColor : inactiveColor
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "switch",
        "class": switch_bem({
          on: checked,
          loading: loading,
          disabled: disabled
        }),
        "style": style,
        "aria-checked": checked,
        "onClick": onClick
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": switch_bem('node')
      }, [renderLoading()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/address-edit/index.js






 // Utils


 // Composition

 // Components











function address_edit_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var address_edit_createNamespace = createNamespace('address-edit'),
    address_edit_createComponent = address_edit_createNamespace[0],
    address_edit_bem = address_edit_createNamespace[1],
    address_edit_t = address_edit_createNamespace[2];

var defaultData = {
  name: '',
  tel: '',
  country: '',
  province: '',
  city: '',
  county: '',
  areaCode: '',
  postalCode: '',
  addressDetail: '',
  isDefault: false
};

function isPostal(value) {
  return /^\d{6}$/.test(value);
}

/* harmony default export */ var address_edit = (address_edit_createComponent({
  props: {
    areaList: Object,
    isSaving: Boolean,
    isDeleting: Boolean,
    validator: Function,
    showDelete: Boolean,
    showPostal: Boolean,
    disableArea: Boolean,
    searchResult: Array,
    telMaxlength: [Number, String],
    showSetDefault: Boolean,
    saveButtonText: String,
    areaPlaceholder: String,
    deleteButtonText: String,
    showSearchResult: Boolean,
    showArea: {
      type: Boolean,
      default: true
    },
    showDetail: {
      type: Boolean,
      default: true
    },
    detailRows: {
      type: [Number, String],
      default: 1
    },
    detailMaxlength: {
      type: [Number, String],
      default: 200
    },
    addressInfo: {
      type: Object,
      default: function _default() {
        return _extends({}, defaultData);
      }
    },
    telValidator: {
      type: Function,
      default: isMobile
    },
    postalValidator: {
      type: Function,
      default: isPostal
    },
    areaColumnsPlaceholder: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  emits: ['save', 'focus', 'delete', 'click-area', 'change-area', 'change-detail', 'cancel-delete', 'select-search', 'change-default'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var areaRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      data: {},
      showAreaPopup: false,
      detailFocused: false,
      errorInfo: {
        tel: '',
        name: '',
        areaCode: '',
        postalCode: '',
        addressDetail: ''
      }
    });
    var areaListLoaded = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return isObject(props.areaList) && Object.keys(props.areaList).length;
    });
    var areaText = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var _state$data = state.data,
          country = _state$data.country,
          province = _state$data.province,
          city = _state$data.city,
          county = _state$data.county,
          areaCode = _state$data.areaCode;

      if (areaCode) {
        var arr = [country, province, city, county];

        if (province && province === city) {
          arr.splice(1, 1);
        }

        return arr.filter(function (text) {
          return text;
        }).join('/');
      }

      return '';
    }); // hide bottom field when use search && detail get focused

    var hideBottomFields = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var searchResult = props.searchResult;
      return searchResult && searchResult.length && state.detailFocused;
    });

    var assignAreaValues = function assignAreaValues() {
      if (areaRef.value) {
        var detail = areaRef.value.getArea();
        detail.areaCode = detail.code;
        delete detail.code;

        _extends(state.data, detail);
      }
    };

    var _onFocus = function onFocus(key) {
      state.errorInfo[key] = '';
      state.detailFocused = key === 'addressDetail';
      emit('focus', key);
    };

    var getErrorMessage = function getErrorMessage(key) {
      var value = String(state.data[key] || '').trim();

      if (props.validator) {
        var message = props.validator(key, value);

        if (message) {
          return message;
        }
      }

      switch (key) {
        case 'name':
          return value ? '' : address_edit_t('nameEmpty');

        case 'tel':
          return props.telValidator(value) ? '' : address_edit_t('telInvalid');

        case 'areaCode':
          return value ? '' : address_edit_t('areaEmpty');

        case 'addressDetail':
          return value ? '' : address_edit_t('addressEmpty');

        case 'postalCode':
          return value && !props.postalValidator(value) ? address_edit_t('postalEmpty') : '';
      }
    };

    var onSave = function onSave() {
      var items = ['name', 'tel'];

      if (props.showArea) {
        items.push('areaCode');
      }

      if (props.showDetail) {
        items.push('addressDetail');
      }

      if (props.showPostal) {
        items.push('postalCode');
      }

      var isValid = items.every(function (item) {
        var msg = getErrorMessage(item);

        if (msg) {
          state.errorInfo[item] = msg;
        }

        return !msg;
      });

      if (isValid && !props.isSaving) {
        emit('save', state.data);
      }
    };

    var onChangeDetail = function onChangeDetail(val) {
      state.data.addressDetail = val;
      emit('change-detail', val);
    };

    var onAreaConfirm = function onAreaConfirm(values) {
      values = values.filter(function (value) {
        return !!value;
      });

      if (values.some(function (value) {
        return !value.code;
      })) {
        toast(address_edit_t('areaEmpty'));
        return;
      }

      state.showAreaPopup = false;
      assignAreaValues();
      emit('change-area', values);
    };

    var onDelete = function onDelete() {
      dialog.confirm({
        title: address_edit_t('confirmDelete')
      }).then(function () {
        emit('delete', state.data);
      }).catch(function () {
        emit('cancel-delete', state.data);
      });
    }; // get values of area component


    var getArea = function getArea() {
      return areaRef.value ? areaRef.value.getValues() : [];
    }; // set area code to area component


    var setAreaCode = function setAreaCode(code) {
      state.data.areaCode = code || '';

      if (code) {
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(assignAreaValues);
      }
    };

    var onDetailBlur = function onDetailBlur() {
      // await for click search event
      setTimeout(function () {
        state.detailFocused = false;
      });
    };

    var setAddressDetail = function setAddressDetail(value) {
      state.data.addressDetail = value;
    };

    var renderSetDefaultCell = function renderSetDefaultCell() {
      if (props.showSetDefault) {
        var _slots = {
          'right-icon': function rightIcon() {
            return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_switch, {
              "modelValue": state.data.isDefault,
              "onUpdate:modelValue": function onUpdateModelValue($event) {
                return state.data.isDefault = $event;
              },
              "size": "24",
              "onChange": function onChange(event) {
                emit('change-default', event);
              }
            }, null);
          }
        };
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell, {
          "center": true,
          "title": address_edit_t('defaultAddress'),
          "class": address_edit_bem('default')
        }, _extends({}, _slots)), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, !hideBottomFields.value]]);
      }

      return null;
    };

    useExpose({
      getArea: getArea,
      setAreaCode: setAreaCode,
      setAddressDetail: setAddressDetail
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.areaList;
    }, function () {
      setAreaCode(state.data.areaCode);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.addressInfo;
    }, function (value) {
      state.data = _extends({}, defaultData, value);
      setAreaCode(value.areaCode);
    }, {
      deep: true,
      immediate: true
    });
    return function () {
      var _slot;

      var data = state.data,
          errorInfo = state.errorInfo;
      var disableArea = props.disableArea;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": address_edit_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": address_edit_bem('fields')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_field, {
        "modelValue": data.name,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return data.name = $event;
        },
        "clearable": true,
        "label": address_edit_t('name'),
        "placeholder": address_edit_t('namePlaceholder'),
        "errorMessage": errorInfo.name,
        "onFocus": function onFocus() {
          return _onFocus('name');
        }
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_field, {
        "modelValue": data.tel,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return data.tel = $event;
        },
        "clearable": true,
        "type": "tel",
        "label": address_edit_t('tel'),
        "maxlength": props.telMaxlength,
        "placeholder": address_edit_t('telPlaceholder'),
        "errorMessage": errorInfo.tel,
        "onFocus": function onFocus() {
          return _onFocus('tel');
        }
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_field, {
        "readonly": true,
        "label": address_edit_t('area'),
        "clickable": !disableArea,
        "rightIcon": !disableArea ? 'arrow' : null,
        "modelValue": areaText.value,
        "placeholder": props.areaPlaceholder || address_edit_t('areaPlaceholder'),
        "errorMessage": errorInfo.areaCode,
        "onFocus": function onFocus() {
          return _onFocus('areaCode');
        },
        "onClick": function onClick() {
          emit('click-area');
          state.showAreaPopup = !disableArea;
        }
      }, null), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.showArea]]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Detail, {
        "show": props.showDetail,
        "value": data.addressDetail,
        "focused": state.detailFocused,
        "detailRows": props.detailRows,
        "errorMessage": errorInfo.addressDetail,
        "searchResult": props.searchResult,
        "detailMaxlength": props.detailMaxlength,
        "showSearchResult": props.showSearchResult,
        "onBlur": onDetailBlur,
        "onFocus": function onFocus() {
          return _onFocus('addressDetail');
        },
        "onInput": onChangeDetail,
        "onSelect-search": function onSelectSearch(event) {
          emit('select-search', event);
        }
      }, null), props.showPostal && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_field, {
        "modelValue": data.postalCode,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return data.postalCode = $event;
        },
        "type": "tel",
        "maxlength": "6",
        "label": address_edit_t('postal'),
        "placeholder": address_edit_t('postal'),
        "errorMessage": errorInfo.postalCode,
        "onFocus": function onFocus() {
          return _onFocus('postalCode');
        }
      }, null), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, !hideBottomFields.value]]), slots.default == null ? void 0 : slots.default()]), renderSetDefaultCell(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": address_edit_bem('buttons')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
        "block": true,
        "round": true,
        "loading": props.isSaving,
        "type": "danger",
        "text": props.saveButtonText || address_edit_t('save'),
        "onClick": onSave
      }, null), props.showDelete && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
        "block": true,
        "round": true,
        "loading": props.isDeleting,
        "text": props.deleteButtonText || address_edit_t('delete'),
        "onClick": onDelete
      }, null)]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, !hideBottomFields.value]]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup, {
        "show": state.showAreaPopup,
        "onUpdate:show": function onUpdateShow($event) {
          return state.showAreaPopup = $event;
        },
        "round": true,
        "teleport": "body",
        "position": "bottom",
        "lazyRender": false
      }, address_edit_isSlot(_slot = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_area, {
        "ref": areaRef,
        "value": data.areaCode,
        "loading": !areaListLoaded.value,
        "areaList": props.areaList,
        "columnsPlaceholder": props.areaColumnsPlaceholder,
        "onConfirm": onAreaConfirm,
        "onCancel": function onCancel() {
          state.showAreaPopup = false;
        }
      }, null)) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      })]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/radio-group/index.js






var radio_group_createNamespace = createNamespace('radio-group'),
    radio_group_createComponent = radio_group_createNamespace[0],
    radio_group_bem = radio_group_createNamespace[1];

var RADIO_KEY = 'vanRadio';
/* harmony default export */ var radio_group = (radio_group_createComponent({
  props: {
    disabled: Boolean,
    iconSize: [Number, String],
    direction: String,
    modelValue: null,
    checkedColor: String
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useChildren = useChildren(RADIO_KEY),
        linkChildren = _useChildren.linkChildren;

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.modelValue;
    }, function (value) {
      emit('change', value);
    });
    linkChildren({
      emit: emit,
      props: props
    });
    useLinkField(function () {
      return props.modelValue;
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": radio_group_bem([props.direction]),
        "role": "radiogroup"
      }, [slots.default == null ? void 0 : slots.default()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/tag/index.js





var tag_createNamespace = createNamespace('tag'),
    tag_createComponent = tag_createNamespace[0],
    tag_bem = tag_createNamespace[1];

/* harmony default export */ var tag = (tag_createComponent({
  props: {
    size: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    closeable: Boolean,
    type: {
      type: String,
      default: 'default'
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var onClose = function onClose(event) {
      event.stopPropagation();
      emit('close');
    };

    var getStyle = function getStyle() {
      if (props.plain) {
        return {
          color: props.textColor || props.color
        };
      }

      return {
        color: props.textColor,
        background: props.color
      };
    };

    return function () {
      var show = props.show,
          type = props.type,
          mark = props.mark,
          plain = props.plain,
          round = props.round,
          size = props.size,
          closeable = props.closeable;
      var classes = {
        mark: mark,
        plain: plain,
        round: round
      };

      if (size) {
        classes[size] = size;
      }

      var CloseIcon = closeable && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "name": "cross",
        "class": tag_bem('close'),
        "onClick": onClose
      }, null);

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Transition, {
        "name": closeable ? 'van-fade' : undefined
      }, {
        default: function _default() {
          return [show ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
            "style": getStyle(),
            "class": tag_bem([classes, type])
          }, [slots.default == null ? void 0 : slots.default(), CloseIcon]) : null];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/checkbox/Checker.js







function Checker_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var checkerProps = {
  name: null,
  disabled: Boolean,
  iconSize: [Number, String],
  modelValue: null,
  checkedColor: String,
  labelPosition: String,
  labelDisabled: Boolean,
  shape: {
    type: String,
    default: 'round'
  }
};
/* harmony default export */ var Checker = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  props: _extends({}, checkerProps, {
    role: String,
    parent: Object,
    checked: Boolean,
    bindGroup: {
      type: Boolean,
      default: true
    },
    bem: {
      type: Function,
      required: true
    }
  }),
  emits: ['click', 'toggle'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var iconRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var getParentProp = function getParentProp(name) {
      if (props.parent && props.bindGroup) {
        return props.parent.props[name];
      }

      return null;
    };

    var disabled = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return getParentProp('disabled') || props.disabled;
    });
    var direction = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return getParentProp('direction') || null;
    });
    var iconStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var checkedColor = props.checkedColor || getParentProp('checkedColor');

      if (checkedColor && props.checked && !disabled.value) {
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor
        };
      }
    });

    var onClick = function onClick(event) {
      var target = event.target;
      var icon = iconRef.value;
      var iconClicked = icon === target || icon.contains(target);

      if (!disabled.value && (iconClicked || !props.labelDisabled)) {
        emit('toggle');
      }

      emit('click', event);
    };

    var renderIcon = function renderIcon() {
      var bem = props.bem,
          shape = props.shape,
          checked = props.checked;
      var iconSize = props.iconSize || getParentProp('iconSize');
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": iconRef,
        "class": bem('icon', [shape, {
          disabled: disabled.value,
          checked: checked
        }]),
        "style": {
          fontSize: addUnit(iconSize)
        }
      }, [slots.icon ? slots.icon({
        checked: checked
      }) : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "name": "success",
        "style": iconStyle.value
      }, null)]);
    };

    var renderLabel = function renderLabel() {
      if (slots.default) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": props.bem('label', [props.labelPosition, {
            disabled: disabled.value
          }])
        }, [slots.default()]);
      }
    };

    return function () {
      var nodes = [renderIcon()];

      if (props.labelPosition === 'left') {
        nodes.unshift(renderLabel());
      } else {
        nodes.push(renderLabel());
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": props.role,
        "class": props.bem([{
          disabled: disabled.value,
          'label-disabled': props.labelDisabled
        }, direction.value]),
        "tabindex": disabled.value ? -1 : 0,
        "aria-checked": props.checked,
        "onClick": onClick
      }, Checker_isSlot(nodes) ? nodes : {
        default: function _default() {
          return [nodes];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/radio/index.js









var radio_createNamespace = createNamespace('radio'),
    radio_createComponent = radio_createNamespace[0],
    radio_bem = radio_createNamespace[1];

/* harmony default export */ var es_radio = (radio_createComponent({
  props: checkerProps,
  emits: ['update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useParent = useParent(RADIO_KEY),
        parent = _useParent.parent;

    var checked = function checked() {
      var value = parent ? parent.props.modelValue : props.modelValue;
      return value === props.name;
    };

    var toggle = function toggle() {
      var emitter = parent ? parent.emit : emit;
      emitter('update:modelValue', props.name);
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Checker, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "bem": radio_bem,
        "role": "radio",
        "parent": parent,
        "checked": checked(),
        "onToggle": toggle
      }, props), _extends({}, pick(slots, ['default', 'icon'])));
    };
  }
}));
;// CONCATENATED MODULE: ./es/address-list/Item.js



 // Utils

 // Components






function Item_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var Item_createNamespace = createNamespace('address-item'),
    Item_createComponent = Item_createNamespace[0],
    Item_bem = Item_createNamespace[1];

/* harmony default export */ var Item = (Item_createComponent({
  props: {
    data: Object,
    disabled: Boolean,
    switchable: Boolean,
    defaultTagText: String
  },
  emits: ['edit', 'click', 'select'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var onClick = function onClick() {
      if (props.switchable) {
        emit('select');
      }

      emit('click');
    };

    var renderRightIcon = function renderRightIcon() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "name": "edit",
        "class": Item_bem('edit'),
        "onClick": function onClick(event) {
          event.stopPropagation();
          emit('edit');
          emit('click');
        }
      }, null);
    };

    var renderTag = function renderTag() {
      if (props.data.isDefault && props.defaultTagText) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag, {
          "type": "danger",
          "round": true,
          "class": Item_bem('tag')
        }, {
          default: function _default() {
            return [props.defaultTagText];
          }
        });
      }
    };

    var renderContent = function renderContent() {
      var data = props.data,
          disabled = props.disabled,
          switchable = props.switchable;
      var Info = [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Item_bem('name')
      }, [data.name + " " + data.tel, renderTag()]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Item_bem('address')
      }, [data.address])];

      if (switchable && !disabled) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_radio, {
          "name": data.id,
          "iconSize": 18
        }, Item_isSlot(Info) ? Info : {
          default: function _default() {
            return [Info];
          }
        });
      }

      return Info;
    };

    return function () {
      var disabled = props.disabled;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Item_bem({
          disabled: disabled
        }),
        "onClick": onClick
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell, {
        "border": false,
        "valueClass": Item_bem('value')
      }, {
        default: renderContent,
        'right-icon': renderRightIcon
      }), slots.bottom == null ? void 0 : slots.bottom(_extends({}, props.data, {
        disabled: disabled
      }))]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/address-list/index.js


 // Utils

 // Components





function address_list_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var address_list_createNamespace = createNamespace('address-list'),
    address_list_createComponent = address_list_createNamespace[0],
    address_list_bem = address_list_createNamespace[1],
    address_list_t = address_list_createNamespace[2];

/* harmony default export */ var address_list = (address_list_createComponent({
  props: {
    list: Array,
    modelValue: [Number, String],
    disabledList: Array,
    disabledText: String,
    addButtonText: String,
    defaultTagText: String,
    switchable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['add', 'edit', 'select', 'click-item', 'edit-disabled', 'select-disabled', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var renderItem = function renderItem(item, index, disabled) {
      var onEdit = function onEdit() {
        var name = disabled ? 'edit-disabled' : 'edit';
        emit(name, item, index);
      };

      var onClick = function onClick() {
        emit('click-item', item, index);
      };

      var onSelect = function onSelect() {
        var name = disabled ? 'select-disabled' : 'select';
        emit(name, item, index);

        if (!disabled) {
          emit('update:modelValue', item.id);
        }
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Item, {
        "key": item.id,
        "data": item,
        "disabled": disabled,
        "switchable": props.switchable,
        "defaultTagText": props.defaultTagText,
        "onEdit": onEdit,
        "onClick": onClick,
        "onSelect": onSelect
      }, {
        bottom: slots['item-bottom']
      });
    };

    var renderList = function renderList(list, disabled) {
      if (list) {
        return list.map(function (item, index) {
          return renderItem(item, index, disabled);
        });
      }
    };

    var renderBottom = function renderBottom() {
      var onClick = function onClick() {
        emit('add');
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": address_list_bem('bottom')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
        "round": true,
        "block": true,
        "type": "danger",
        "text": props.addButtonText || address_list_t('add'),
        "class": address_list_bem('add'),
        "onClick": onClick
      }, null)]);
    };

    return function () {
      var List = renderList(props.list);
      var DisabledList = renderList(props.disabledList, true);

      var DisabledText = props.disabledText && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": address_list_bem('disabled-text')
      }, [props.disabledText]);

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": address_list_bem()
      }, [slots.top == null ? void 0 : slots.top(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(radio_group, {
        "modelValue": props.modelValue
      }, address_list_isSlot(List) ? List : {
        default: function _default() {
          return [List];
        }
      }), DisabledText, DisabledList, slots.default == null ? void 0 : slots.default(), renderBottom()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/utils/validate/date.js

function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]' && !number_isNaN(val.getTime());
}
;// CONCATENATED MODULE: ./es/calendar/utils.js


var utils_createNamespace = createNamespace('calendar'),
    utils_createComponent = utils_createNamespace[0],
    utils_bem = utils_createNamespace[1],
    utils_t = utils_createNamespace[2];


function formatMonthTitle(date) {
  return utils_t('monthTitle', date.getFullYear(), date.getMonth() + 1);
}
function compareMonth(date1, date2) {
  var year1 = date1.getFullYear();
  var year2 = date2.getFullYear();
  var month1 = date1.getMonth();
  var month2 = date2.getMonth();

  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}
function compareDay(day1, day2) {
  var compareMonthResult = compareMonth(day1, day2);

  if (compareMonthResult === 0) {
    var date1 = day1.getDate();
    var date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }

  return compareMonthResult;
}
function getDayByOffset(date, offset) {
  date = new Date(date);
  date.setDate(date.getDate() + offset);
  return date;
}
function getPrevDay(date) {
  return getDayByOffset(date, -1);
}
function getNextDay(date) {
  return getDayByOffset(date, 1);
}
function calcDateNum(date) {
  var day1 = date[0].getTime();
  var day2 = date[1].getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}
function copyDate(dates) {
  return new Date(dates);
}
function copyDates(dates) {
  if (Array.isArray(dates)) {
    return dates.map(function (date) {
      if (date === null) {
        return date;
      }

      return copyDate(date);
    });
  }

  return copyDate(dates);
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useRect/index.js


function useRect_isWindow(val) {
  return val === window;
}

var useRect = function useRect(elementRef) {
  var element = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.unref)(elementRef);

  if (useRect_isWindow(element)) {
    var width = element.innerWidth;
    var height = element.innerHeight;
    return {
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      width: width,
      height: height
    };
  }

  if (element && element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }

  return {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0
  };
};
;// CONCATENATED MODULE: ./es/composables/use-refs.js

function useRefs() {
  var refs = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)([]);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUpdate)(function () {
    refs.value = [];
  });

  var setRefs = function setRefs(index) {
    return function (el) {
      refs.value[index] = el;
    };
  };

  return [refs, setRefs];
}
;// CONCATENATED MODULE: ./es/datetime-picker/utils.js



var sharedProps = _extends({}, pickerProps, {
  filter: Function,
  modelValue: null,
  columnsOrder: Array,
  formatter: {
    type: Function,
    default: function _default(type, value) {
      return value;
    }
  }
});
function times(n, iteratee) {
  var index = -1;
  var result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}
function getTrueValue(value) {
  if (!value) {
    return 0;
  }

  while (number_isNaN(parseInt(value, 10))) {
    if (value.length > 1) {
      value = value.slice(1);
    } else {
      return 0;
    }
  }

  return parseInt(value, 10);
}
function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useToggle/index.js

function useToggle(defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = false;
  }

  var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(defaultValue);

  var toggle = function toggle(value) {
    if (value === void 0) {
      value = !state.value;
    }

    state.value = value;
  };

  return [state, toggle];
}
;// CONCATENATED MODULE: ./es/composables/use-height.js


var useHeight = function useHeight(element) {
  var height = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
      height.value = useRect(element).height;
    });
  });
  return height;
};
;// CONCATENATED MODULE: ./es/calendar/components/Day.js






function Day_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var Day_createNamespace = createNamespace('calendar-day'),
    Day_createComponent = Day_createNamespace[0];

/* harmony default export */ var Day = (Day_createComponent({
  props: {
    item: Object,
    color: String,
    index: Number,
    offset: Number,
    rowHeight: String
  },
  emits: ['click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var item = props.item,
          index = props.index,
          color = props.color,
          offset = props.offset,
          rowHeight = props.rowHeight;
      var style = {
        height: rowHeight
      };

      if (item.type === 'placeholder') {
        style.width = '100%';
        return style;
      }

      if (index === 0) {
        style.marginLeft = 100 * offset / 7 + "%";
      }

      if (color) {
        switch (item.type) {
          case 'end':
          case 'start':
          case 'start-end':
          case 'multiple-middle':
          case 'multiple-selected':
            style.background = color;
            break;

          case 'middle':
            style.color = color;
            break;
        }
      }

      return style;
    });

    var onClick = function onClick() {
      if (props.item.type !== 'disabled') {
        emit('click', props.item);
      }
    };

    var renderContent = function renderContent() {
      var item = props.item,
          color = props.color,
          rowHeight = props.rowHeight;
      var type = item.type,
          text = item.text,
          topInfo = item.topInfo,
          bottomInfo = item.bottomInfo;

      var TopInfo = topInfo && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": utils_bem('top-info')
      }, Day_isSlot(topInfo) ? topInfo : {
        default: function _default() {
          return [topInfo];
        }
      });

      var BottomInfo = bottomInfo && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": utils_bem('bottom-info')
      }, Day_isSlot(bottomInfo) ? bottomInfo : {
        default: function _default() {
          return [bottomInfo];
        }
      });

      var Nodes = [TopInfo, text, BottomInfo];

      if (type === 'selected') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('selected-day'),
          "style": {
            width: rowHeight,
            height: rowHeight,
            background: color
          }
        }, Day_isSlot(Nodes) ? Nodes : {
          default: function _default() {
            return [Nodes];
          }
        });
      }

      return Nodes;
    };

    return function () {
      var _props$item = props.item,
          type = _props$item.type,
          className = _props$item.className;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "gridcell",
        "style": style.value,
        "class": [utils_bem('day', type), className],
        "tabindex": type === 'disabled' ? null : -1,
        "onClick": onClick
      }, [renderContent()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/calendar/components/Month.js

 // Utils



 // Composition



 // Components



var Month_createNamespace = createNamespace('calendar-month'),
    Month_createComponent = Month_createNamespace[0];

/* harmony default export */ var Month = (Month_createComponent({
  props: {
    date: Date,
    type: String,
    color: String,
    minDate: Date,
    maxDate: Date,
    showMark: Boolean,
    rowHeight: [Number, String],
    formatter: Function,
    lazyRender: Boolean,
    currentDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: Boolean,
    showMonthTitle: Boolean,
    firstDayOfWeek: Number
  },
  emits: ['click', 'update-height'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useToggle = useToggle(),
        visible = _useToggle[0],
        setVisible = _useToggle[1];

    var daysRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var monthRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var height = useHeight(monthRef);
    var title = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return formatMonthTitle(props.date);
    });
    var rowHeight = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return addUnit(props.rowHeight);
    });
    var offset = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var realDay = props.date.getDay();

      if (props.firstDayOfWeek) {
        return (realDay + 7 - props.firstDayOfWeek) % 7;
      }

      return realDay;
    });
    var totalDay = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return getMonthEndDay(props.date.getFullYear(), props.date.getMonth() + 1);
    });
    var shouldRender = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return visible.value || !props.lazyRender;
    });

    var getTitle = function getTitle() {
      return title.value;
    };

    var scrollIntoView = function scrollIntoView(body) {
      var el = props.showSubtitle ? daysRef.value : monthRef.value;
      var scrollTop = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop;
      setScrollTop(body, scrollTop);
    };

    var getMultipleDayType = function getMultipleDayType(day) {
      var isSelected = function isSelected(date) {
        return props.currentDate.some(function (item) {
          return compareDay(item, date) === 0;
        });
      };

      if (isSelected(day)) {
        var prevDay = getPrevDay(day);
        var nextDay = getNextDay(day);
        var prevSelected = isSelected(prevDay);
        var nextSelected = isSelected(nextDay);

        if (prevSelected && nextSelected) {
          return 'multiple-middle';
        }

        if (prevSelected) {
          return 'end';
        }

        if (nextSelected) {
          return 'start';
        }

        return 'multiple-selected';
      }

      return '';
    };

    var getRangeDayType = function getRangeDayType(day) {
      var _props$currentDate = props.currentDate,
          startDay = _props$currentDate[0],
          endDay = _props$currentDate[1];

      if (!startDay) {
        return '';
      }

      var compareToStart = compareDay(day, startDay);

      if (!endDay) {
        return compareToStart === 0 ? 'start' : '';
      }

      var compareToEnd = compareDay(day, endDay);

      if (props.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
        return 'start-end';
      }

      if (compareToStart === 0) {
        return 'start';
      }

      if (compareToEnd === 0) {
        return 'end';
      }

      if (compareToStart > 0 && compareToEnd < 0) {
        return 'middle';
      }
    };

    var getDayType = function getDayType(day) {
      var type = props.type,
          minDate = props.minDate,
          maxDate = props.maxDate,
          currentDate = props.currentDate;

      if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
        return 'disabled';
      }

      if (currentDate === null) {
        return;
      }

      if (Array.isArray(currentDate)) {
        if (type === 'multiple') {
          return getMultipleDayType(day);
        }

        if (type === 'range') {
          return getRangeDayType(day);
        }
      } else if (type === 'single') {
        return compareDay(day, currentDate) === 0 ? 'selected' : '';
      }
    };

    var getBottomInfo = function getBottomInfo(dayType) {
      if (props.type === 'range') {
        if (dayType === 'start' || dayType === 'end') {
          return utils_t(dayType);
        }

        if (dayType === 'start-end') {
          return utils_t('startEnd');
        }
      }
    };

    var renderTitle = function renderTitle() {
      if (props.showMonthTitle) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('month-title')
        }, [title.value]);
      }
    };

    var renderMark = function renderMark() {
      if (props.showMark && shouldRender.value) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('month-mark')
        }, [props.date.getMonth() + 1]);
      }
    };

    var placeholders = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var rows = [];
      var count = Math.ceil((totalDay.value + offset.value) / 7);

      for (var day = 1; day <= count; day++) {
        rows.push({
          type: 'placeholder'
        });
      }

      return rows;
    });
    var days = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var days = [];
      var year = props.date.getFullYear();
      var month = props.date.getMonth();

      for (var day = 1; day <= totalDay.value; day++) {
        var date = new Date(year, month, day);
        var type = getDayType(date);
        var config = {
          date: date,
          type: type,
          text: day,
          bottomInfo: getBottomInfo(type)
        };

        if (props.formatter) {
          config = props.formatter(config);
        }

        days.push(config);
      }

      return days;
    });

    var renderDay = function renderDay(item, index) {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Day, {
        "item": item,
        "index": index,
        "color": props.color,
        "offset": offset.value,
        "rowHeight": rowHeight.value,
        "onClick": function onClick(item) {
          emit('click', item);
        }
      }, null);
    };

    var renderDays = function renderDays() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": daysRef,
        "role": "grid",
        "class": utils_bem('days')
      }, [renderMark(), (shouldRender.value ? days : placeholders).value.map(renderDay)]);
    };

    useExpose({
      getTitle: getTitle,
      getHeight: function getHeight() {
        return height.value;
      },
      setVisible: setVisible,
      scrollIntoView: scrollIntoView
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": utils_bem('month'),
        "ref": monthRef
      }, [renderTitle(), renderDays()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/calendar/components/Header.js





function Header_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var Header_createNamespace = createNamespace('calendar-header'),
    Header_createComponent = Header_createNamespace[0];

/* harmony default export */ var Header = (Header_createComponent({
  props: {
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var renderTitle = function renderTitle() {
      if (props.showTitle) {
        var text = props.title || utils_t('title');
        var title = slots.title ? slots.title() : text;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('header-title')
        }, Header_isSlot(title) ? title : {
          default: function _default() {
            return [title];
          }
        });
      }
    };

    var renderSubtitle = function renderSubtitle() {
      if (props.showSubtitle) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('header-subtitle')
        }, [props.subtitle]);
      }
    };

    var renderWeekDays = function renderWeekDays() {
      var firstDayOfWeek = props.firstDayOfWeek;
      var weekdays = utils_t('weekdays');
      var renderWeekDays = [].concat(weekdays.slice(firstDayOfWeek, 7), weekdays.slice(0, firstDayOfWeek));
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": utils_bem('weekdays')
      }, [renderWeekDays.map(function (text) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": utils_bem('weekday')
        }, Header_isSlot(text) ? text : {
          default: function _default() {
            return [text];
          }
        });
      })]);
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": utils_bem('header')
      }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/calendar/index.js




 // Utils



 // Composition



 // Components







function calendar_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

/* harmony default export */ var calendar = (utils_createComponent({
  props: {
    show: Boolean,
    title: String,
    color: String,
    readonly: Boolean,
    teleport: [String, Object],
    formatter: Function,
    rowHeight: [Number, String],
    confirmText: String,
    rangePrompt: String,
    defaultDate: [Date, Array],
    allowSameDay: Boolean,
    confirmDisabledText: String,
    type: {
      type: String,
      default: 'single'
    },
    round: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom'
    },
    poppable: {
      type: Boolean,
      default: true
    },
    maxRange: {
      type: [Number, String],
      default: null
    },
    lazyRender: {
      type: Boolean,
      default: true
    },
    showMark: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    showSubtitle: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    minDate: {
      type: Date,
      validator: isDate,
      default: function _default() {
        return new Date();
      }
    },
    maxDate: {
      type: Date,
      validator: isDate,
      default: function _default() {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
      }
    },
    firstDayOfWeek: {
      type: [Number, String],
      default: 0,
      validator: function validator(val) {
        return val >= 0 && val <= 6;
      }
    }
  },
  emits: ['select', 'confirm', 'unselect', 'month-show', 'update:show'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var limitDateRange = function limitDateRange(date, minDate, maxDate) {
      if (minDate === void 0) {
        minDate = props.minDate;
      }

      if (maxDate === void 0) {
        maxDate = props.maxDate;
      }

      if (compareDay(date, minDate) === -1) {
        return minDate;
      }

      if (compareDay(date, maxDate) === 1) {
        return maxDate;
      }

      return date;
    };

    var getInitialDate = function getInitialDate(defaultDate) {
      if (defaultDate === void 0) {
        defaultDate = props.defaultDate;
      }

      var type = props.type,
          minDate = props.minDate,
          maxDate = props.maxDate;

      if (defaultDate === null) {
        return defaultDate;
      }

      var now = new Date();

      if (type === 'range') {
        if (!Array.isArray(defaultDate)) {
          defaultDate = [];
        }

        var start = limitDateRange(defaultDate[0] || now, minDate, getPrevDay(maxDate));
        var end = limitDateRange(defaultDate[1] || now, getNextDay(minDate));
        return [start, end];
      }

      if (type === 'multiple') {
        if (Array.isArray(defaultDate)) {
          return defaultDate.map(function (date) {
            return limitDateRange(date);
          });
        }

        return [limitDateRange(now)];
      }

      if (!defaultDate || Array.isArray(defaultDate)) {
        defaultDate = now;
      }

      return limitDateRange(defaultDate);
    };

    var bodyHeight;
    var bodyRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      subtitle: '',
      currentDate: getInitialDate()
    });

    var _useRefs = useRefs(),
        monthRefs = _useRefs[0],
        setMonthRefs = _useRefs[1];

    var dayOffset = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return props.firstDayOfWeek ? props.firstDayOfWeek % 7 : 0;
    });
    var months = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var months = [];
      var cursor = new Date(props.minDate);
      cursor.setDate(1);

      do {
        months.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, props.maxDate) !== 1);

      return months;
    });
    var buttonDisabled = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var currentDate = state.currentDate;

      if (currentDate) {
        if (props.type === 'range') {
          return !currentDate[0] || !currentDate[1];
        }

        if (props.type === 'multiple') {
          return !currentDate.length;
        }
      }

      return !currentDate;
    }); // calculate the position of the elements
    // and find the elements that needs to be rendered

    var onScroll = function onScroll() {
      var top = getScrollTop(bodyRef.value);
      var bottom = top + bodyHeight;
      var heights = months.value.map(function (item, index) {
        return monthRefs.value[index].getHeight();
      });
      var heightSum = heights.reduce(function (a, b) {
        return a + b;
      }, 0); // iOS scroll bounce may exceed the range

      if (bottom > heightSum && top > 0) {
        return;
      }

      var height = 0;
      var currentMonth;
      var visibleRange = [-1, -1];

      for (var i = 0; i < months.value.length; i++) {
        var month = monthRefs.value[i];
        var visible = height <= bottom && height + heights[i] >= top;

        if (visible) {
          visibleRange[1] = i;

          if (!currentMonth) {
            currentMonth = month;
            visibleRange[0] = i;
          }

          if (!monthRefs.value[i].showed) {
            monthRefs.value[i].showed = true;
            emit('month-show', {
              date: month.date,
              title: month.title
            });
          }
        }

        height += heights[i];
      }

      months.value.forEach(function (month, index) {
        var visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
        monthRefs.value[index].setVisible(visible);
      });
      /* istanbul ignore else */

      if (currentMonth) {
        state.subtitle = currentMonth.getTitle();
      }
    };

    var scrollToDate = function scrollToDate(targetDate) {
      raf(function () {
        months.value.some(function (month, index) {
          if (compareMonth(month, targetDate) === 0) {
            monthRefs.value[index].scrollIntoView(bodyRef.value);
            return true;
          }

          return false;
        });
        onScroll();
      });
    }; // scroll to current month


    var scrollIntoView = function scrollIntoView() {
      if (props.poppable && !props.show) {
        return;
      }

      var currentDate = state.currentDate;

      if (currentDate) {
        var targetDate = props.type === 'single' ? currentDate : currentDate[0];
        scrollToDate(targetDate);
      } else {
        raf(onScroll);
      }
    };

    var init = function init() {
      if (props.poppable && !props.show) {
        return;
      }

      raf(function () {
        // add Math.floor to avoid decimal height issues
        // https://github.com/youzan/vant/issues/5640
        bodyHeight = Math.floor(useRect(bodyRef).height);
        scrollIntoView();
      });
    };

    var reset = function reset(date) {
      if (date === void 0) {
        date = getInitialDate();
      }

      state.currentDate = date;
      scrollIntoView();
    };

    var checkRange = function checkRange(date) {
      var maxRange = props.maxRange,
          rangePrompt = props.rangePrompt;

      if (maxRange && calcDateNum(date) > maxRange) {
        toast(rangePrompt || utils_t('rangePrompt', maxRange));
        return false;
      }

      return true;
    };

    var onConfirm = function onConfirm() {
      emit('confirm', copyDates(state.currentDate));
    };

    var select = function select(date, complete) {
      var setCurrentDate = function setCurrentDate(date) {
        state.currentDate = date;
        emit('select', copyDates(state.currentDate));
      };

      if (complete && props.type === 'range') {
        var valid = checkRange(date);

        if (!valid) {
          // auto selected to max range if showConfirm
          if (props.showConfirm) {
            setCurrentDate([date[0], getDayByOffset(date[0], props.maxRange - 1)]);
          } else {
            setCurrentDate(date);
          }

          return;
        }
      }

      setCurrentDate(date);

      if (complete && !props.showConfirm) {
        onConfirm();
      }
    };

    var onClickDay = function onClickDay(item) {
      if (props.readonly) {
        return;
      }

      var date = item.date;
      var type = props.type;
      var currentDate = state.currentDate;

      if (type === 'range') {
        if (!currentDate) {
          select([date, null]);
          return;
        }

        var startDay = currentDate[0],
            endDay = currentDate[1];

        if (startDay && !endDay) {
          var compareToStart = compareDay(date, startDay);

          if (compareToStart === 1) {
            select([startDay, date], true);
          } else if (compareToStart === -1) {
            select([date, null]);
          } else if (props.allowSameDay) {
            select([date, date], true);
          }
        } else {
          select([date, null]);
        }
      } else if (type === 'multiple') {
        if (!currentDate) {
          select([date]);
          return;
        }

        var selectedIndex;
        var selected = state.currentDate.some(function (dateItem, index) {
          var equal = compareDay(dateItem, date) === 0;

          if (equal) {
            selectedIndex = index;
          }

          return equal;
        });

        if (selected) {
          var _currentDate$splice = currentDate.splice(selectedIndex, 1),
              unselectedDate = _currentDate$splice[0];

          emit('unselect', copyDate(unselectedDate));
        } else if (props.maxRange && currentDate.length >= props.maxRange) {
          toast(props.rangePrompt || utils_t('rangePrompt', props.maxRange));
        } else {
          select([].concat(currentDate, [date]));
        }
      } else {
        select(date, true);
      }
    };

    var togglePopup = function togglePopup(val) {
      emit('update:show', val);
    };

    var renderMonth = function renderMonth(date, index) {
      var showMonthTitle = index !== 0 || !props.showSubtitle;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Month, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": setMonthRefs(index),
        "date": date,
        "currentDate": state.currentDate,
        "showMonthTitle": showMonthTitle,
        "firstDayOfWeek": dayOffset.value
      }, pick(props, ['type', 'color', 'minDate', 'maxDate', 'showMark', 'formatter', 'rowHeight', 'lazyRender', 'showSubtitle', 'allowSameDay']), {
        "onClick": onClickDay
      }), null);
    };

    var renderFooterButton = function renderFooterButton() {
      if (slots.footer) {
        return slots.footer();
      }

      if (props.showConfirm) {
        var text = buttonDisabled.value ? props.confirmDisabledText : props.confirmText;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
          "round": true,
          "block": true,
          "type": "danger",
          "color": props.color,
          "class": utils_bem('confirm'),
          "disabled": buttonDisabled.value,
          "nativeType": "button",
          "onClick": onConfirm
        }, {
          default: function _default() {
            return [text || utils_t('confirm')];
          }
        });
      }
    };

    var renderFooter = function renderFooter() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": utils_bem('footer', {
          unfit: !props.safeAreaInsetBottom
        })
      }, [renderFooterButton()]);
    };

    var renderCalendar = function renderCalendar() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": utils_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Header, {
        "title": props.title,
        "showTitle": props.showTitle,
        "subtitle": state.subtitle,
        "showSubtitle": props.showSubtitle,
        "firstDayOfWeek": dayOffset.value
      }, {
        title: slots.title
      }), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": bodyRef,
        "class": utils_bem('body'),
        "onScroll": onScroll
      }, [months.value.map(renderMonth)]), renderFooter()]);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.show;
    }, init);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([function () {
      return props.type;
    }, function () {
      return props.minDate;
    }, function () {
      return props.maxDate;
    }], function () {
      reset(getInitialDate(state.currentDate));
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.defaultDate;
    }, function (value) {
      state.currentDate = value;
      scrollIntoView();
    });
    useExpose({
      reset: reset,
      scrollToDate: scrollToDate
    });
    onMountedOrActivated(init);
    return function () {
      if (props.poppable) {
        var _slot;

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
          "show": props.show,
          "class": utils_bem('popup'),
          "round": props.round,
          "position": props.position,
          "closeable": props.showTitle || props.showSubtitle,
          "teleport": props.teleport,
          "closeOnPopstate": props.closeOnPopstate,
          "closeOnClickOverlay": props.closeOnClickOverlay
        }, {
          'onUpdate:show': togglePopup
        }), calendar_isSlot(_slot = renderCalendar()) ? _slot : {
          default: function _default() {
            return [_slot];
          }
        });
      }

      return renderCalendar();
    };
  }
}));
;// CONCATENATED MODULE: ./es/image/index.js








var image_createNamespace = createNamespace('image'),
    image_createComponent = image_createNamespace[0],
    image_bem = image_createNamespace[1];

/* harmony default export */ var es_image = (image_createComponent({
  props: {
    src: String,
    alt: String,
    fit: String,
    round: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    lazyLoad: Boolean,
    iconPrefix: String,
    showError: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    errorIcon: {
      type: String,
      default: 'photo-fail'
    },
    loadingIcon: {
      type: String,
      default: 'photo'
    }
  },
  emits: ['load', 'error'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var error = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(false);
    var loading = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(true);
    var imageRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(); // TODO: types

    var _ref2 = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)().proxy,
        $Lazyload = _ref2.$Lazyload;
    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var style = {};

      if (isDef(props.width)) {
        style.width = addUnit(props.width);
      }

      if (isDef(props.height)) {
        style.height = addUnit(props.height);
      }

      if (isDef(props.radius)) {
        style.overflow = 'hidden';
        style.borderRadius = addUnit(props.radius);
      }

      return style;
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.src;
    }, function () {
      error.value = false;
      loading.value = true;
    });

    var onLoad = function onLoad(event) {
      loading.value = false;
      emit('load', event);
    };

    var onError = function onError(event) {
      error.value = true;
      loading.value = false;
      emit('error', event);
    };

    var renderLoadingIcon = function renderLoadingIcon() {
      if (slots.loading) {
        return slots.loading();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "name": props.loadingIcon,
        "class": image_bem('loading-icon'),
        "classPrefix": props.iconPrefix
      }, null);
    };

    var renderErrorIcon = function renderErrorIcon() {
      if (slots.error) {
        return slots.error();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "name": props.errorIcon,
        "class": image_bem('error-icon'),
        "classPrefix": props.iconPrefix
      }, null);
    };

    var renderPlaceholder = function renderPlaceholder() {
      if (loading.value && props.showLoading) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": image_bem('loading')
        }, [renderLoadingIcon()]);
      }

      if (error.value && props.showError) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": image_bem('error')
        }, [renderErrorIcon()]);
      }
    };

    var renderImage = function renderImage() {
      if (error.value || !props.src) {
        return;
      }

      var attrs = {
        alt: props.alt,
        class: image_bem('img'),
        style: {
          objectFit: props.fit
        }
      };

      if (props.lazyLoad) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("img", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
          "ref": imageRef
        }, attrs), null), [[(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.resolveDirective)("lazy"), props.src]]);
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("img", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "src": props.src,
        "onLoad": onLoad,
        "onError": onError
      }, attrs), null);
    };

    var onLazyLoaded = function onLazyLoaded(_ref3) {
      var el = _ref3.el;

      if (el === imageRef.value && loading.value) {
        onLoad();
      }
    };

    var onLazyLoadError = function onLazyLoadError(_ref4) {
      var el = _ref4.el;

      if (el === imageRef.value && !error.value) {
        onError();
      }
    };

    if ($Lazyload && inBrowser) {
      $Lazyload.$on('loaded', onLazyLoaded);
      $Lazyload.$on('error', onLazyLoadError);
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(function () {
        $Lazyload.$off('loaded', onLazyLoaded);
        $Lazyload.$off('error', onLazyLoadError);
      });
    }

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": image_bem({
          round: props.round
        }),
        "style": style.value
      }, [renderImage(), renderPlaceholder(), slots.default == null ? void 0 : slots.default()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/card/index.js

 // Utils

 // Components




var card_createNamespace = createNamespace('card'),
    card_createComponent = card_createNamespace[0],
    card_bem = card_createNamespace[1];

/* harmony default export */ var card = (card_createComponent({
  props: {
    tag: String,
    desc: String,
    thumb: String,
    title: String,
    centered: Boolean,
    lazyLoad: Boolean,
    thumbLink: String,
    num: [Number, String],
    price: [Number, String],
    originPrice: [Number, String],
    currency: {
      type: String,
      default: '¥'
    }
  },
  emits: ['click-thumb'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var renderTitle = function renderTitle() {
      if (slots.title) {
        return slots.title();
      }

      if (props.title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [card_bem('title'), 'van-multi-ellipsis--l2']
        }, [props.title]);
      }
    };

    var renderThumbTag = function renderThumbTag() {
      if (slots.tag || props.tag) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": card_bem('tag')
        }, [slots.tag ? slots.tag() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag, {
          "mark": true,
          "type": "danger"
        }, {
          default: function _default() {
            return [props.tag];
          }
        })]);
      }
    };

    var renderThumbImage = function renderThumbImage() {
      if (slots.thumb) {
        return slots.thumb();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_image, {
        "src": props.thumb,
        "width": "100%",
        "height": "100%",
        "fit": "cover",
        "lazyLoad": props.lazyLoad
      }, null);
    };

    var renderThumb = function renderThumb() {
      if (slots.thumb || props.thumb) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("a", {
          "href": props.thumbLink,
          "class": card_bem('thumb'),
          "onClick": function onClick(event) {
            emit('click-thumb', event);
          }
        }, [renderThumbImage(), renderThumbTag()]);
      }
    };

    var renderDesc = function renderDesc() {
      if (slots.desc) {
        return slots.desc();
      }

      if (props.desc) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [card_bem('desc'), 'van-ellipsis']
        }, [props.desc]);
      }
    };

    var renderPriceText = function renderPriceText() {
      var priceArr = props.price.toString().split('.');
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", null, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": card_bem('price-currency')
      }, [props.currency]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": card_bem('price-integer')
      }, [priceArr[0]]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createTextVNode)("."), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": card_bem('price-decimal')
      }, [priceArr[1]])]);
    };

    return function () {
      var _slots$priceTop;

      var showNum = slots.num || isDef(props.num);
      var showPrice = slots.price || isDef(props.price);
      var showOriginPrice = slots['origin-price'] || isDef(props.originPrice);
      var showBottom = showNum || showPrice || showOriginPrice || slots.bottom;

      var Price = showPrice && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": card_bem('price')
      }, [slots.price ? slots.price() : renderPriceText()]);

      var OriginPrice = showOriginPrice && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": card_bem('origin-price')
      }, [slots['origin-price'] ? slots['origin-price']() : props.currency + " " + props.originPrice]);

      var Num = showNum && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": card_bem('num')
      }, [slots.num ? slots.num() : "x" + props.num]);

      var Footer = slots.footer && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": card_bem('footer')
      }, [slots.footer()]);

      var Bottom = showBottom && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": card_bem('bottom')
      }, [(_slots$priceTop = slots['price-top']) == null ? void 0 : _slots$priceTop.call(slots), Price, OriginPrice, Num, slots.bottom == null ? void 0 : slots.bottom()]);

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": card_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": card_bem('header')
      }, [renderThumb(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": card_bem('content', {
          centered: props.centered
        })
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", null, [renderTitle(), renderDesc(), slots.tags == null ? void 0 : slots.tags()]), Bottom])]), Footer]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/utils/dom/style.js

function isHidden(elementRef) {
  var el = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.unref)(elementRef);

  if (!el) {
    return false;
  }

  var style = window.getComputedStyle(el);
  var hidden = style.display === 'none'; // offsetParent returns null in the following situations:
  // 1. The element or its parent element has the display property set to none.
  // 2. The element has the position property set to fixed

  var parentHidden = el.offsetParent === null && style.position !== 'fixed';
  return hidden || parentHidden;
}
;// CONCATENATED MODULE: ./es/tabs/utils.js


var rafId;
function scrollLeftTo(scroller, to, duration) {
  cancelRaf(rafId);
  var count = 0;
  var from = scroller.scrollLeft;
  var frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);

  function animate() {
    scroller.scrollLeft += (to - from) / frames;

    if (++count < frames) {
      rafId = raf(animate);
    }
  }

  animate();
}
function scrollTopTo(scroller, to, duration, callback) {
  var current = getScrollTop(scroller);
  var isDown = current < to;
  var frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);
  var step = (to - current) / frames;

  function animate() {
    current += step;

    if (isDown && current > to || !isDown && current < to) {
      current = to;
    }

    setScrollTop(scroller, current);

    if (isDown && current < to || !isDown && current > to) {
      raf(animate);
    } else if (callback) {
      raf(callback);
    }
  }

  animate();
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useWindowSize/index.js



function useWindowSize() {
  var width = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(utils_inBrowser ? window.innerWidth : 0);
  var height = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(utils_inBrowser ? window.innerHeight : 0);

  var onResize = function onResize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  useEventListener('resize', onResize);
  useEventListener('orientationchange', onResize);
  return {
    width: width,
    height: height
  };
}
;// CONCATENATED MODULE: ./es/composables/use-visibility-change.js


 // @Experimental

function useVisibilityChange(target, onChange) {
  // compatibility: https://caniuse.com/#feat=intersectionobserver
  if (!inBrowser || !window.IntersectionObserver) {
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    // visibility changed
    onChange(entries[0].intersectionRatio > 0);
  }, {
    root: document.body
  });

  var observe = function observe() {
    if (target.value) {
      observer.observe(target.value);
    }
  };

  var unobserve = function unobserve() {
    if (target.value) {
      observer.unobserve(target.value);
    }
  };

  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onDeactivated)(unobserve);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(unobserve);
  onMountedOrActivated(observe);
}
;// CONCATENATED MODULE: ./es/sticky/index.js

 // Utils

 // Composition




var sticky_createNamespace = createNamespace('sticky'),
    sticky_createComponent = sticky_createNamespace[0],
    sticky_bem = sticky_createNamespace[1];

/* harmony default export */ var sticky = (sticky_createComponent({
  props: {
    zIndex: [Number, String],
    container: null,
    offsetTop: {
      type: [Number, String],
      default: 0
    },
    offsetBottom: {
      type: [Number, String],
      default: 0
    },
    position: {
      type: String,
      default: 'top'
    }
  },
  emits: ['scroll'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var scrollParent = useScrollParent(root);
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      fixed: false,
      width: 0,
      // root width
      height: 0,
      // root height
      transform: 0
    });
    var offsetTop = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return unitToPx(props.offsetTop);
    });
    var offsetBottom = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return unitToPx(props.offsetBottom);
    });
    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (!state.fixed) {
        return;
      }

      var style = {
        width: state.width + "px",
        height: state.height + "px"
      };

      if (state.transform) {
        style.transform = "translate3d(0, " + state.transform + "px, 0)";
      }

      if (props.zIndex !== undefined) {
        style.zIndex = +props.zIndex;
      }

      if (props.position === 'top') {
        style.top = offsetTop.value ? offsetTop.value + "px" : 0;
      } else {
        style.bottom = offsetBottom.value ? offsetBottom.value + "px" : 0;
      }

      return style;
    });

    var emitScrollEvent = function emitScrollEvent(scrollTop) {
      emit('scroll', {
        scrollTop: scrollTop,
        isFixed: state.fixed
      });
    };

    var onScroll = function onScroll() {
      if (!root.value || isHidden(root)) {
        return;
      }

      var container = props.container;
      var rootRect = useRect(root);
      var containerRect = container == null ? void 0 : container.getBoundingClientRect();
      state.width = rootRect.width;
      state.height = rootRect.height;
      var scrollTop = getScrollTop(window);

      if (props.position === 'top') {
        // The sticky component should be kept inside the container element
        if (container) {
          var difference = containerRect.bottom - offsetTop.value - state.height;
          state.fixed = offsetTop.value > rootRect.top && containerRect.bottom > 0;
          state.transform = difference < 0 ? difference : 0;
        } else {
          state.fixed = offsetTop.value > rootRect.top;
        }
      } else if (props.position === 'bottom') {
        var clientHeight = document.documentElement.clientHeight;

        if (container) {
          var _difference = clientHeight - containerRect.top - offsetBottom.value - state.height;

          state.fixed = clientHeight - offsetBottom.value < rootRect.bottom && clientHeight > containerRect.top;
          state.transform = _difference < 0 ? -_difference : 0;
        } else {
          state.fixed = clientHeight - offsetBottom.value < rootRect.bottom;
        }
      }

      emitScrollEvent(scrollTop);
    };

    useEventListener('scroll', onScroll, {
      target: scrollParent
    });
    useVisibilityChange(root, onScroll);
    return function () {
      var fixed = state.fixed,
          height = state.height,
          width = state.width;
      var rootStyle = {
        width: fixed ? width + "px" : undefined,
        height: fixed ? height + "px" : undefined
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "style": rootStyle
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": sticky_bem({
          fixed: fixed
        }),
        "style": style.value
      }, [slots.default == null ? void 0 : slots.default()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/tabs/TabsTitle.js






function TabsTitle_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var TabsTitle_createNamespace = createNamespace('tab'),
    TabsTitle_createComponent = TabsTitle_createNamespace[0],
    TabsTitle_bem = TabsTitle_createNamespace[1];

/* harmony default export */ var TabsTitle = (TabsTitle_createComponent({
  props: {
    dot: Boolean,
    type: String,
    color: String,
    title: String,
    badge: [Number, String],
    isActive: Boolean,
    disabled: Boolean,
    scrollable: Boolean,
    activeColor: String,
    renderTitle: Function,
    inactiveColor: String
  },
  setup: function setup(props) {
    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var style = {};
      var type = props.type,
          color = props.color,
          disabled = props.disabled,
          isActive = props.isActive,
          activeColor = props.activeColor,
          inactiveColor = props.inactiveColor;
      var isCard = type === 'card'; // card theme color

      if (color && isCard) {
        style.borderColor = color;

        if (!disabled) {
          if (isActive) {
            style.backgroundColor = color;
          } else {
            style.color = color;
          }
        }
      }

      var titleColor = isActive ? activeColor : inactiveColor;

      if (titleColor) {
        style.color = titleColor;
      }

      return style;
    });

    var renderText = function renderText() {
      var Text = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": TabsTitle_bem('text', {
          ellipsis: !props.scrollable
        })
      }, [props.renderTitle ? props.renderTitle() : props.title]);

      if (props.dot || isDef(props.badge) && props.badge !== '') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_badge, {
          "dot": props.dot,
          "content": props.badge
        }, TabsTitle_isSlot(Text) ? Text : {
          default: function _default() {
            return [Text];
          }
        });
      }

      return Text;
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "tab",
        "class": [TabsTitle_bem({
          active: props.isActive,
          disabled: props.disabled
        })],
        "style": style.value,
        "aria-selected": props.isActive
      }, [renderText()]);
    };
  }
}));
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/usePageVisibility/index.js



function usePageVisibility() {
  var visibility = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)('visible');

  var setVisibility = function setVisibility() {
    if (utils_inBrowser) {
      visibility.value = document.hidden ? 'hidden' : 'visible';
    }
  };

  setVisibility();
  useEventListener('visibilitychange', setVisibility);
  return visibility;
}
;// CONCATENATED MODULE: ./es/swipe/index.js

 // Utils

 // Composition





var swipe_createNamespace = createNamespace('swipe'),
    swipe_createComponent = swipe_createNamespace[0],
    swipe_bem = swipe_createNamespace[1];

var SWIPE_KEY = 'vanSwipe';
/* harmony default export */ var swipe = (swipe_createComponent({
  props: {
    width: [Number, String],
    height: [Number, String],
    autoplay: [Number, String],
    vertical: Boolean,
    lazyRender: Boolean,
    indicatorColor: String,
    loop: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 500
    },
    touchable: {
      type: Boolean,
      default: true
    },
    initialSwipe: {
      type: [Number, String],
      default: 0
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    stopPropagation: {
      type: Boolean,
      default: true
    }
  },
  emits: ['change'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      rect: null,
      width: 0,
      height: 0,
      offset: 0,
      active: 0,
      swiping: false
    });
    var touch = useTouch();
    var windowSize = useWindowSize();

    var _useChildren = useChildren(SWIPE_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    var count = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return children.length;
    });
    var size = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return state[props.vertical ? 'height' : 'width'];
    });
    var delta = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return props.vertical ? touch.deltaY.value : touch.deltaX.value;
    });
    var minOffset = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return (props.vertical ? state.rect.height : state.rect.width) - size.value * count.value;
    });
    var maxCount = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return Math.ceil(Math.abs(minOffset.value) / size.value);
    });
    var trackSize = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return count.value * size.value;
    });
    var activeIndicator = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return (state.active + count.value) % count.value;
    });
    var isCorrectDirection = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var expect = props.vertical ? 'vertical' : 'horizontal';
      return touch.direction.value === expect;
    });
    var trackStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var mainAxis = props.vertical ? 'height' : 'width';
      var crossAxis = props.vertical ? 'width' : 'height';
      var style = {
        transitionDuration: (state.swiping ? 0 : props.duration) + "ms",
        transform: "translate" + (props.vertical ? 'Y' : 'X') + "(" + state.offset + "px)"
      };

      if (size.value) {
        style[mainAxis] = trackSize.value + "px";
        style[crossAxis] = props[crossAxis] ? props[crossAxis] + "px" : '';
      }

      return style;
    });

    var getTargetActive = function getTargetActive(pace) {
      var active = state.active;

      if (pace) {
        if (props.loop) {
          return range(active + pace, -1, count.value);
        }

        return range(active + pace, 0, maxCount.value);
      }

      return active;
    };

    var getTargetOffset = function getTargetOffset(targetActive, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      var currentPosition = targetActive * size.value;

      if (!props.loop) {
        currentPosition = Math.min(currentPosition, -minOffset.value);
      }

      var targetOffset = offset - currentPosition;

      if (!props.loop) {
        targetOffset = range(targetOffset, minOffset.value, 0);
      }

      return targetOffset;
    };

    var move = function move(_ref2) {
      var _ref2$pace = _ref2.pace,
          pace = _ref2$pace === void 0 ? 0 : _ref2$pace,
          _ref2$offset = _ref2.offset,
          offset = _ref2$offset === void 0 ? 0 : _ref2$offset,
          emitChange = _ref2.emitChange;

      if (count.value <= 1) {
        return;
      }

      var active = state.active;
      var targetActive = getTargetActive(pace);
      var targetOffset = getTargetOffset(targetActive, offset); // auto move first and last swipe in loop mode

      if (props.loop) {
        if (children[0] && targetOffset !== minOffset.value) {
          var outRightBound = targetOffset < minOffset.value;
          children[0].setOffset(outRightBound ? trackSize.value : 0);
        }

        if (children[count.value - 1] && targetOffset !== 0) {
          var outLeftBound = targetOffset > 0;
          children[count.value - 1].setOffset(outLeftBound ? -trackSize.value : 0);
        }
      }

      state.active = targetActive;
      state.offset = targetOffset;

      if (emitChange && targetActive !== active) {
        emit('change', activeIndicator.value);
      }
    };

    var correctPosition = function correctPosition() {
      state.swiping = true;

      if (state.active <= -1) {
        move({
          pace: count.value
        });
      }

      if (state.active >= count.value) {
        move({
          pace: -count.value
        });
      }
    };

    var prev = function prev() {
      correctPosition();
      touch.reset();
      doubleRaf(function () {
        state.swiping = false;
        move({
          pace: -1,
          emitChange: true
        });
      });
    };

    var next = function next() {
      correctPosition();
      touch.reset();
      doubleRaf(function () {
        state.swiping = false;
        move({
          pace: 1,
          emitChange: true
        });
      });
    };

    var autoplayTimer;

    var stopAutoplay = function stopAutoplay() {
      clearTimeout(autoplayTimer);
    };

    var autoplay = function autoplay() {
      if (props.autoplay > 0 && count.value > 1) {
        stopAutoplay();
        autoplayTimer = setTimeout(function () {
          next();
          autoplay();
        }, props.autoplay);
      }
    }; // initialize swipe position


    var initialize = function initialize(active) {
      if (active === void 0) {
        active = +props.initialSwipe;
      }

      if (!root.value || isHidden(root)) {
        return;
      }

      stopAutoplay();
      var rect = useRect(root);
      state.rect = rect;
      state.swiping = true;
      state.active = active;
      state.width = +props.width || rect.width;
      state.height = +props.height || rect.height;
      state.offset = getTargetOffset(active);
      children.forEach(function (swipe) {
        swipe.setOffset(0);
      });
      autoplay();
    };

    var resize = function resize() {
      initialize(state.active);
    };

    var touchStartTime;

    var onTouchStart = function onTouchStart(event) {
      if (!props.touchable) return;
      touch.start(event);
      touchStartTime = Date.now();
      stopAutoplay();
      correctPosition();
    };

    var onTouchMove = function onTouchMove(event) {
      if (props.touchable && state.swiping) {
        touch.move(event);

        if (isCorrectDirection.value) {
          preventDefault(event, props.stopPropagation);
          move({
            offset: delta.value
          });
        }
      }
    };

    var onTouchEnd = function onTouchEnd() {
      if (!props.touchable || !state.swiping) {
        return;
      }

      var duration = Date.now() - touchStartTime;
      var speed = delta.value / duration;
      var shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2;

      if (shouldSwipe && isCorrectDirection.value) {
        var offset = props.vertical ? touch.offsetY.value : touch.offsetX.value;
        var pace = 0;

        if (props.loop) {
          pace = offset > 0 ? delta.value > 0 ? -1 : 1 : 0;
        } else {
          pace = -Math[delta.value > 0 ? 'ceil' : 'floor'](delta.value / size.value);
        }

        move({
          pace: pace,
          emitChange: true
        });
      } else if (delta.value) {
        move({
          pace: 0
        });
      }

      state.swiping = false;
      autoplay();
    };

    var swipeTo = function swipeTo(index, options) {
      if (options === void 0) {
        options = {};
      }

      correctPosition();
      touch.reset();
      doubleRaf(function () {
        var targetIndex;

        if (props.loop && index === count.value) {
          targetIndex = state.active === 0 ? 0 : index;
        } else {
          targetIndex = index % count.value;
        }

        if (options.immediate) {
          doubleRaf(function () {
            state.swiping = false;
          });
        } else {
          state.swiping = false;
        }

        move({
          pace: targetIndex - state.active,
          emitChange: true
        });
      });
    };

    var renderDot = function renderDot(_, index) {
      var active = index === activeIndicator.value;
      var style = active ? {
        backgroundColor: props.indicatorColor
      } : null;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("i", {
        "style": style,
        "class": swipe_bem('indicator', {
          active: active
        })
      }, null);
    };

    var renderIndicator = function renderIndicator() {
      if (slots.indicator) {
        return slots.indicator();
      }

      if (props.showIndicators && count.value > 1) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": swipe_bem('indicators', {
            vertical: props.vertical
          })
        }, [Array.apply(void 0, Array(count.value)).map(renderDot)]);
      }
    };

    useExpose({
      prev: prev,
      next: next,
      state: state,
      resize: resize,
      swipeTo: swipeTo
    });
    linkChildren({
      size: size,
      props: props,
      count: count,
      activeIndicator: activeIndicator
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.initialSwipe;
    }, initialize);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return children.length;
    }, function () {
      var active = Math.min(children.length - 1, state.active);
      initialize(active);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.autoplay;
    }, function (value) {
      if (value > 0) {
        autoplay();
      } else {
        stopAutoplay();
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([windowSize.width, windowSize.height], resize);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(usePageVisibility(), function (visible) {
      if (visible === 'visible') {
        autoplay();
      } else {
        stopAutoplay();
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(initialize);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onActivated)(function () {
      initialize(state.active);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onDeactivated)(stopAutoplay);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(stopAutoplay);
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "class": swipe_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "style": trackStyle.value,
        "class": swipe_bem('track', {
          vertical: props.vertical
        }),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [slots.default == null ? void 0 : slots.default()]), renderIndicator()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/tabs/TabsContent.js






function TabsContent_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var TabsContent_createNamespace = createNamespace('tabs'),
    TabsContent_createComponent = TabsContent_createNamespace[0],
    TabsContent_bem = TabsContent_createNamespace[1];

/* harmony default export */ var TabsContent = (TabsContent_createComponent({
  props: {
    inited: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    lazyRender: Boolean,
    count: {
      type: Number,
      required: true
    },
    duration: {
      type: [Number, String],
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    }
  },
  emits: ['change'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var swipeRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var onChange = function onChange(index) {
      emit('change', index);
    };

    var renderChildren = function renderChildren() {
      var Content = slots.default == null ? void 0 : slots.default();

      if (props.animated || props.swipeable) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(swipe, {
          "ref": swipeRef,
          "loop": false,
          "class": TabsContent_bem('track'),
          "duration": +props.duration * 1000,
          "touchable": props.swipeable,
          "lazyRender": props.lazyRender,
          "showIndicators": false,
          "onChange": onChange
        }, TabsContent_isSlot(Content) ? Content : {
          default: function _default() {
            return [Content];
          }
        });
      }

      return Content;
    };

    var swipeToCurrentTab = function swipeToCurrentTab(index) {
      var swipe = swipeRef.value;

      if (swipe && swipe.state.active !== index) {
        swipe.swipeTo(index, {
          immediate: !props.inited
        });
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.currentIndex;
    }, swipeToCurrentTab);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
      swipeToCurrentTab(props.currentIndex);
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": TabsContent_bem('content', {
          animated: props.animated || props.swipeable
        })
      }, [renderChildren()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/tabs/index.js


 // Utils




 // Composition




 // Components





function tabs_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var tabs_createNamespace = createNamespace('tabs'),
    tabs_createComponent = tabs_createNamespace[0],
    tabs_bem = tabs_createNamespace[1];

var TABS_KEY = 'vanTabs';
/* harmony default export */ var tabs = (tabs_createComponent({
  props: {
    color: String,
    border: Boolean,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    scrollspy: Boolean,
    background: String,
    lineWidth: [Number, String],
    lineHeight: [Number, String],
    beforeChange: Function,
    titleActiveColor: String,
    titleInactiveColor: String,
    type: {
      type: String,
      default: 'line'
    },
    active: {
      type: [Number, String],
      default: 0
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 0.3
    },
    offsetTop: {
      type: [Number, String],
      default: 0
    },
    lazyRender: {
      type: Boolean,
      default: true
    },
    swipeThreshold: {
      type: [Number, String],
      default: 5
    }
  },
  emits: ['click', 'change', 'scroll', 'disabled', 'rendered', 'update:active'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var tabHeight;
    var lockScroll;
    var stickyFixed;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var navRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var wrapRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var windowSize = useWindowSize();
    var scroller = useScrollParent(root);

    var _useRefs = useRefs(),
        titleRefs = _useRefs[0],
        setTitleRefs = _useRefs[1];

    var _useChildren = useChildren(TABS_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      inited: false,
      position: '',
      currentIndex: -1,
      lineStyle: {
        backgroundColor: props.color
      }
    }); // whether the nav is scrollable

    var scrollable = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return children.length > props.swipeThreshold || !props.ellipsis;
    });
    var navStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return {
        borderColor: props.color,
        background: props.background
      };
    });

    var getTabName = function getTabName(tab, index) {
      var _tab$name;

      return (_tab$name = tab.name) != null ? _tab$name : index;
    };

    var currentName = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var activeTab = children[state.currentIndex];

      if (activeTab) {
        return getTabName(activeTab, state.currentIndex);
      }
    });
    var offsetTopPx = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return unitToPx(props.offsetTop);
    });
    var scrollOffset = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (props.sticky) {
        return offsetTopPx.value + tabHeight;
      }

      return 0;
    }); // scroll active tab into view

    var scrollIntoView = function scrollIntoView(immediate) {
      var nav = navRef.value;
      var titles = titleRefs.value;

      if (!scrollable.value || !titles || !titles[state.currentIndex]) {
        return;
      }

      var title = titles[state.currentIndex].$el;
      var to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      scrollLeftTo(nav, to, immediate ? 0 : +props.duration);
    }; // update nav bar style


    var setLine = function setLine() {
      var shouldAnimate = state.inited;
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        var titles = titleRefs.value;

        if (!titles || !titles[state.currentIndex] || props.type !== 'line' || isHidden(root.value)) {
          return;
        }

        var title = titles[state.currentIndex].$el;
        var lineWidth = props.lineWidth,
            lineHeight = props.lineHeight;
        var left = title.offsetLeft + title.offsetWidth / 2;
        var lineStyle = {
          width: addUnit(lineWidth),
          backgroundColor: props.color,
          transform: "translateX(" + left + "px) translateX(-50%)"
        };

        if (shouldAnimate) {
          lineStyle.transitionDuration = props.duration + "s";
        }

        if (isDef(lineHeight)) {
          var height = addUnit(lineHeight);
          lineStyle.height = height;
          lineStyle.borderRadius = height;
        }

        state.lineStyle = lineStyle;
      });
    };

    var findAvailableTab = function findAvailableTab(index) {
      var diff = index < state.currentIndex ? -1 : 1;

      while (index >= 0 && index < children.length) {
        if (!children[index].disabled) {
          return index;
        }

        index += diff;
      }
    };

    var setCurrentIndex = function setCurrentIndex(currentIndex) {
      var newIndex = findAvailableTab(currentIndex);

      if (!isDef(newIndex)) {
        return;
      }

      var newTab = children[newIndex];
      var newName = getTabName(newTab, newIndex);
      var shouldEmitChange = state.currentIndex !== null;
      state.currentIndex = newIndex;

      if (newName !== props.active) {
        emit('update:active', newName);

        if (shouldEmitChange) {
          emit('change', newName, newTab.title);
        }
      }
    }; // correct the index of active tab


    var setCurrentIndexByName = function setCurrentIndexByName(name) {
      var matched = children.filter(function (tab, index) {
        return getTabName(tab, index) === name;
      });
      var index = matched[0] ? children.indexOf(matched[0]) : 0;
      setCurrentIndex(index);
    };

    var scrollToCurrentContent = function scrollToCurrentContent(immediate) {
      if (immediate === void 0) {
        immediate = false;
      }

      if (props.scrollspy) {
        var target = children[state.currentIndex].$el;

        if (target) {
          var to = getElementTop(target, scroller.value) - scrollOffset.value;
          lockScroll = true;
          scrollTopTo(scroller.value, to, immediate ? 0 : +props.duration, function () {
            lockScroll = false;
          });
        }
      }
    }; // emit event when clicked


    var _onClick = function onClick(item, index) {
      var _children$index = children[index],
          title = _children$index.title,
          disabled = _children$index.disabled;
      var name = getTabName(children[index], index);

      if (disabled) {
        emit('disabled', name, title);
      } else {
        callInterceptor({
          interceptor: props.beforeChange,
          args: [name],
          done: function done() {
            setCurrentIndex(index);
            scrollToCurrentContent();
          }
        });
        emit('click', name, title);
        route(item);
      }
    };

    var onStickyScroll = function onStickyScroll(params) {
      stickyFixed = params.isFixed;
      emit('scroll', params);
    };

    var scrollTo = function scrollTo(name) {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        setCurrentIndexByName(name);
        scrollToCurrentContent(true);
      });
    };

    var getCurrentIndexOnScroll = function getCurrentIndexOnScroll() {
      for (var index = 0; index < children.length; index++) {
        var top = getVisibleTop(children[index].$el);

        if (top > scrollOffset.value) {
          return index === 0 ? 0 : index - 1;
        }
      }

      return children.length - 1;
    };

    var onScroll = function onScroll() {
      if (props.scrollspy && !lockScroll) {
        var index = getCurrentIndexOnScroll();
        setCurrentIndex(index);
      }
    };

    var renderNav = function renderNav() {
      return children.map(function (item, index) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(TabsTitle, {
          "ref": setTitleRefs(index),
          "dot": item.dot,
          "type": props.type,
          "badge": item.badge,
          "title": item.title,
          "color": props.color,
          "style": item.titleStyle,
          "class": item.titleClass,
          "isActive": index === state.currentIndex,
          "disabled": item.disabled,
          "scrollable": scrollable.value,
          "renderTitle": item.$slots.title,
          "activeColor": props.titleActiveColor,
          "inactiveColor": props.titleInactiveColor,
          "onClick": function onClick() {
            _onClick(item, index);
          }
        }, null);
      });
    };

    var renderHeader = function renderHeader() {
      var _ref2, _slots$navLeft, _slots$navRight;

      var type = props.type,
          border = props.border;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": wrapRef,
        "class": [tabs_bem('wrap', {
          scrollable: scrollable.value
        }), (_ref2 = {}, _ref2[BORDER_TOP_BOTTOM] = type === 'line' && border, _ref2)]
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": navRef,
        "role": "tablist",
        "class": tabs_bem('nav', [type, {
          complete: scrollable.value
        }]),
        "style": navStyle.value
      }, [(_slots$navLeft = slots['nav-left']) == null ? void 0 : _slots$navLeft.call(slots), renderNav(), type === 'line' && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": tabs_bem('line'),
        "style": state.lineStyle
      }, null), (_slots$navRight = slots['nav-right']) == null ? void 0 : _slots$navRight.call(slots)])]);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([function () {
      return props.color;
    }, windowSize.width], setLine);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.active;
    }, function (value) {
      if (value !== currentName.value) {
        setCurrentIndexByName(value);
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return children.length;
    }, function () {
      if (state.inited) {
        setCurrentIndexByName(props.active || currentName.value);
        setLine();
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
          scrollIntoView(true);
        });
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return state.currentIndex;
    }, function () {
      scrollIntoView();
      setLine(); // scroll to correct position

      if (stickyFixed && !props.scrollspy) {
        setRootScrollTop(Math.ceil(getElementTop(root.value) - offsetTopPx.value));
      }
    });

    var init = function init() {
      setCurrentIndexByName(props.active || currentName.value);
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        state.inited = true;
        tabHeight = getVisibleHeight(wrapRef.value);
        scrollIntoView(true);
      });
    };

    useExpose({
      resize: setLine,
      scrollTo: scrollTo
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onActivated)(setLine);
    onMountedOrActivated(init);
    useEventListener('scroll', onScroll, {
      target: scroller.value
    });
    linkChildren({
      emit: emit,
      props: props,
      setLine: setLine,
      currentName: currentName,
      scrollIntoView: scrollIntoView
    });
    return function () {
      var _slot;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "class": tabs_bem([props.type])
      }, [props.sticky ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(sticky, {
        "container": root.value,
        "offsetTop": offsetTopPx.value,
        "onScroll": onStickyScroll
      }, tabs_isSlot(_slot = renderHeader()) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      }) : renderHeader(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(TabsContent, {
        "count": children.length,
        "inited": state.inited,
        "animated": props.animated,
        "duration": props.duration,
        "swipeable": props.swipeable,
        "lazyRender": props.lazyRender,
        "currentIndex": state.currentIndex,
        "onChange": setCurrentIndex
      }, {
        default: function _default() {
          return [slots.default == null ? void 0 : slots.default()];
        }
      })]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/swipe-item/index.js







var swipe_item_createNamespace = createNamespace('swipe-item'),
    swipe_item_createComponent = swipe_item_createNamespace[0],
    swipe_item_bem = swipe_item_createNamespace[1];

/* harmony default export */ var swipe_item = (swipe_item_createComponent({
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var rendered;
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      offset: 0,
      inited: false,
      mounted: false
    });

    var _useParent = useParent(SWIPE_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var style = {};
      var vertical = parent.props.vertical;

      if (parent.size.value) {
        style[vertical ? 'height' : 'width'] = parent.size.value + "px";
      }

      if (state.offset) {
        style.transform = "translate" + (vertical ? 'Y' : 'X') + "(" + state.offset + "px)";
      }

      return style;
    });
    var shouldRender = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var _parent$props = parent.props,
          loop = _parent$props.loop,
          lazyRender = _parent$props.lazyRender;

      if (!lazyRender || rendered) {
        return true;
      } // wait for all item to mount, so we can get the exact count


      if (!state.mounted) {
        return false;
      }

      var active = parent.activeIndicator.value;
      var maxActive = parent.count.value - 1;
      var prevActive = active === 0 && loop ? maxActive : active - 1;
      var nextActive = active === maxActive && loop ? 0 : active + 1;
      rendered = index.value === active || index.value === prevActive || index.value === nextActive;
      return rendered;
    });

    var setOffset = function setOffset(offset) {
      state.offset = offset;
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        state.mounted = true;
      });
    });
    useExpose({
      setOffset: setOffset
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": swipe_item_bem(),
        "style": style.value
      }, [shouldRender.value ? slots.default == null ? void 0 : slots.default() : null]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/tab/index.js







 // Composition


 // Components



function tab_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var tab_createNamespace = createNamespace('tab'),
    tab_createComponent = tab_createNamespace[0],
    tab_bem = tab_createNamespace[1];

/* harmony default export */ var tab = (tab_createComponent({
  props: _extends({}, routeProps, {
    dot: Boolean,
    name: [Number, String],
    badge: [Number, String],
    title: String,
    titleStyle: null,
    titleClass: null,
    disabled: Boolean
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var inited = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(false);

    var _useParent = useParent(TABS_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    if (!parent) {
      throw new Error('[Vant] Tabs: <van-tab> must be used inside <van-tabs>');
    }

    var getName = function getName() {
      var _props$name;

      return (_props$name = props.name) != null ? _props$name : index.value;
    };

    var init = function init() {
      inited.value = true;

      if (parent.props.lazyRender) {
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
          parent.emit('rendered', getName(), props.title);
        });
      }
    };

    var isActive = function isActive() {
      var active = getName() === parent.currentName.value;

      if (active && !inited.value) {
        init();
      }

      return active;
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.title;
    }, function () {
      parent.setLine();
      parent.scrollIntoView();
    });
    return function () {
      var _parent$props = parent.props,
          animated = _parent$props.animated,
          swipeable = _parent$props.swipeable,
          scrollspy = _parent$props.scrollspy,
          lazyRender = _parent$props.lazyRender;

      if (!slots.default && !animated) {
        return;
      }

      var active = isActive();
      var show = scrollspy || active;

      if (animated || swipeable) {
        var _slot;

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(swipe_item, {
          "role": "tabpanel",
          "aria-hidden": !active,
          "class": tab_bem('pane-wrapper', {
            inactive: !active
          })
        }, tab_isSlot(_slot = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": tab_bem('pane')
        }, [slots.default == null ? void 0 : slots.default()])) ? _slot : {
          default: function _default() {
            return [_slot];
          }
        });
      }

      var shouldRender = inited.value || scrollspy || !lazyRender;
      var Content = shouldRender ? slots.default == null ? void 0 : slots.default() : null;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "tabpanel",
        "class": tab_bem('pane')
      }, tab_isSlot(Content) ? Content : {
        default: function _default() {
          return [Content];
        }
      }), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, show]]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/cascader/index.js




 // Components





function cascader_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var cascader_createNamespace = createNamespace('cascader'),
    cascader_createComponent = cascader_createNamespace[0],
    cascader_bem = cascader_createNamespace[1],
    cascader_t = cascader_createNamespace[2];

/* harmony default export */ var cascader = (cascader_createComponent({
  props: {
    title: String,
    modelValue: [Number, String],
    fieldNames: Object,
    placeholder: String,
    activeColor: String,
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close', 'change', 'finish', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      tabs: [],
      activeTab: 0
    });

    var _text$value$children$ = _extends({
      text: 'text',
      value: 'value',
      children: 'children'
    }, props.fieldNames),
        textKey = _text$value$children$.text,
        valueKey = _text$value$children$.value,
        childrenKey = _text$value$children$.children;

    var getSelectedOptionsByValue = function getSelectedOptionsByValue(options, value) {
      for (var i = 0; i < options.length; i++) {
        var option = options[i];

        if (option[valueKey] === value) {
          return [option];
        }

        if (option[childrenKey]) {
          var selectedOptions = getSelectedOptionsByValue(option[childrenKey], value);

          if (selectedOptions) {
            return [option].concat(selectedOptions);
          }
        }
      }
    };

    var updateTabs = function updateTabs() {
      if (props.modelValue || props.modelValue === 0) {
        var selectedOptions = getSelectedOptionsByValue(props.options, props.modelValue);

        if (selectedOptions) {
          var optionsCursor = props.options;
          state.tabs = selectedOptions.map(function (option) {
            var tab = {
              options: optionsCursor,
              selectedOption: option
            };
            var next = optionsCursor.filter(function (item) {
              return item[valueKey] === option[valueKey];
            });

            if (next.length) {
              optionsCursor = next[0][childrenKey];
            }

            return tab;
          });

          if (optionsCursor) {
            state.tabs.push({
              options: optionsCursor,
              selectedOption: null
            });
          }

          (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
            state.activeTab = state.tabs.length - 1;
          });
          return;
        }
      }

      state.tabs = [{
        options: props.options,
        selectedOption: null
      }];
    };

    var onSelect = function onSelect(option, tabIndex) {
      state.tabs[tabIndex].selectedOption = option;

      if (state.tabs.length > tabIndex + 1) {
        state.tabs = state.tabs.slice(0, tabIndex + 1);
      }

      if (option[childrenKey]) {
        var nextTab = {
          options: option[childrenKey],
          selectedOption: null
        };

        if (state.tabs[tabIndex + 1]) {
          state.tabs[tabIndex + 1] = nextTab;
        } else {
          state.tabs.push(nextTab);
        }

        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
          state.activeTab++;
        });
      }

      var selectedOptions = state.tabs.map(function (tab) {
        return tab.selectedOption;
      }).filter(function (item) {
        return !!item;
      });
      var eventParams = {
        value: option[valueKey],
        tabIndex: tabIndex,
        selectedOptions: selectedOptions
      };
      emit('update:modelValue', option[valueKey]);
      emit('change', eventParams);

      if (!option[childrenKey]) {
        emit('finish', eventParams);
      }
    };

    var onClose = function onClose() {
      emit('close');
    };

    var renderHeader = function renderHeader() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": cascader_bem('header')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("h2", {
        "class": cascader_bem('title')
      }, [slots.title ? slots.title() : props.title]), props.closeable ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "name": "cross",
        "class": cascader_bem('close-icon'),
        "onClick": onClose
      }, null) : null]);
    };

    var renderOptions = function renderOptions(options, selectedOption, tabIndex) {
      var renderOption = function renderOption(option) {
        var isSelected = selectedOption && option[valueKey] === selectedOption[valueKey];
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
          "class": cascader_bem('option', {
            selected: isSelected
          }),
          "style": {
            color: isSelected ? props.activeColor : null
          },
          "onClick": function onClick() {
            onSelect(option, tabIndex);
          }
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [option[textKey]]), isSelected ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": "success",
          "class": cascader_bem('selected-icon')
        }, null) : null]);
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("ul", {
        "class": cascader_bem('options')
      }, [options.map(renderOption)]);
    };

    var renderTab = function renderTab(item, tabIndex) {
      var _slot;

      var options = item.options,
          selectedOption = item.selectedOption;
      var title = selectedOption ? selectedOption[textKey] : props.placeholder || cascader_t('select');
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tab, {
        "title": title,
        "titleClass": cascader_bem('tab', {
          unselected: !selectedOption
        })
      }, cascader_isSlot(_slot = renderOptions(options, selectedOption, tabIndex)) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      });
    };

    var renderTabs = function renderTabs() {
      var _slot2;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tabs, {
        "active": state.activeTab,
        "onUpdate:active": function onUpdateActive($event) {
          return state.activeTab = $event;
        },
        "animated": true,
        "swipeable": true,
        "swipeThreshold": 0,
        "class": cascader_bem('tabs'),
        "color": props.activeColor
      }, cascader_isSlot(_slot2 = state.tabs.map(renderTab)) ? _slot2 : {
        default: function _default() {
          return [_slot2];
        }
      });
    };

    updateTabs();
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.options;
    }, updateTabs, {
      deep: true
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.modelValue;
    }, function (value) {
      if (value || value === 0) {
        var values = state.tabs.map(function (tab) {
          var _tab$selectedOption;

          return (_tab$selectedOption = tab.selectedOption) == null ? void 0 : _tab$selectedOption[valueKey];
        });

        if (values.indexOf(value) !== -1) {
          return;
        }
      }

      updateTabs();
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": cascader_bem()
      }, [renderHeader(), renderTabs()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/cell-group/index.js






var cell_group_createNamespace = createNamespace('cell-group'),
    cell_group_createComponent = cell_group_createNamespace[0],
    cell_group_bem = cell_group_createNamespace[1];

/* harmony default export */ var cell_group = (cell_group_createComponent({
  inheritAttrs: false,
  props: {
    title: String,
    border: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;

    var renderGroup = function renderGroup() {
      var _ref2;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "class": [cell_group_bem(), (_ref2 = {}, _ref2[BORDER_TOP_BOTTOM] = props.border, _ref2)]
      }, attrs), [slots.default == null ? void 0 : slots.default()]);
    };

    var renderTitle = function renderTitle() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": cell_group_bem('title')
      }, [slots.title ? slots.title() : props.title]);
    };

    return function () {
      if (props.title || slots.title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Fragment, null, [renderTitle(), renderGroup()]);
      }

      return renderGroup();
    };
  }
}));
;// CONCATENATED MODULE: ./es/checkbox/index.js











var checkbox_createNamespace = createNamespace('checkbox'),
    checkbox_createComponent = checkbox_createNamespace[0],
    checkbox_bem = checkbox_createNamespace[1];

var CHECKBOX_KEY = 'vanCheckbox';
/* harmony default export */ var es_checkbox = (checkbox_createComponent({
  props: _extends({}, checkerProps, {
    bindGroup: {
      type: Boolean,
      default: true
    }
  }),
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useParent = useParent(CHECKBOX_KEY),
        parent = _useParent.parent;

    var setParentValue = function setParentValue(checked) {
      var name = props.name;
      var _parent$props = parent.props,
          max = _parent$props.max,
          modelValue = _parent$props.modelValue;
      var value = modelValue.slice();

      if (checked) {
        var overlimit = max && value.length >= max;

        if (!overlimit && value.indexOf(name) === -1) {
          value.push(name);

          if (props.bindGroup) {
            parent.emit('update:modelValue', value);
          }
        }
      } else {
        var index = value.indexOf(name);

        if (index !== -1) {
          value.splice(index, 1);

          if (props.bindGroup) {
            parent.emit('update:modelValue', value);
          }
        }
      }
    };

    var checked = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (parent && props.bindGroup) {
        return parent.props.modelValue.indexOf(props.name) !== -1;
      }

      return props.modelValue;
    });

    var toggle = function toggle(newValue) {
      if (newValue === void 0) {
        newValue = !checked.value;
      }

      if (parent && props.bindGroup) {
        setParentValue(newValue);
      } else {
        emit('update:modelValue', newValue);
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.modelValue;
    }, function (value) {
      emit('change', value);
    });
    useExpose({
      toggle: toggle,
      props: props,
      checked: checked
    });
    useLinkField(function () {
      return props.modelValue;
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Checker, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "bem": checkbox_bem,
        "role": "checkbox",
        "parent": parent,
        "checked": checked.value,
        "bindGroup": props.bindGroup,
        "onToggle": toggle
      }, props), _extends({}, pick(slots, ['default', 'icon'])));
    };
  }
}));
;// CONCATENATED MODULE: ./es/checkbox-group/index.js








var checkbox_group_createNamespace = createNamespace('checkbox-group'),
    checkbox_group_createComponent = checkbox_group_createNamespace[0],
    checkbox_group_bem = checkbox_group_createNamespace[1];

/* harmony default export */ var checkbox_group = (checkbox_group_createComponent({
  props: {
    max: [Number, String],
    disabled: Boolean,
    direction: String,
    iconSize: [Number, String],
    checkedColor: String,
    modelValue: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useChildren = useChildren(CHECKBOX_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    var toggleAll = function toggleAll(options) {
      if (options === void 0) {
        options = {};
      }

      if (typeof options === 'boolean') {
        options = {
          checked: options
        };
      }

      var _options = options,
          checked = _options.checked,
          skipDisabled = _options.skipDisabled;
      var checkedChildren = children.filter(function (item) {
        if (!item.props.bindGroup) {
          return false;
        }

        if (item.props.disabled && skipDisabled) {
          return item.checked.value;
        }

        return checked != null ? checked : !item.checked.value;
      });
      var names = checkedChildren.map(function (item) {
        return item.name;
      });
      emit('update:modelValue', names);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.modelValue;
    }, function (value) {
      emit('change', value);
    });
    useExpose({
      toggleAll: toggleAll
    });
    useLinkField(function () {
      return props.modelValue;
    });
    linkChildren({
      emit: emit,
      props: props
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": checkbox_group_bem([props.direction])
      }, [slots.default == null ? void 0 : slots.default()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/circle/index.js






function circle_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var circle_createNamespace = createNamespace('circle'),
    circle_createComponent = circle_createNamespace[0],
    circle_bem = circle_createNamespace[1];

var uid = 0;

function format(rate) {
  return Math.min(Math.max(+rate, 0), 100);
}

function getPath(clockwise, viewBoxSize) {
  var sweepFlag = clockwise ? 1 : 0;
  return "M " + viewBoxSize / 2 + " " + viewBoxSize / 2 + " m 0, -500 a 500, 500 0 1, " + sweepFlag + " 0, 1000 a 500, 500 0 1, " + sweepFlag + " 0, -1000";
}

/* harmony default export */ var circle = (circle_createComponent({
  props: {
    text: String,
    size: [Number, String],
    color: [String, Object],
    layerColor: String,
    strokeLinecap: String,
    currentRate: {
      type: Number,
      default: 0
    },
    speed: {
      type: [Number, String],
      default: 0
    },
    fill: {
      type: String,
      default: 'none'
    },
    rate: {
      type: [Number, String],
      default: 100
    },
    strokeWidth: {
      type: [Number, String],
      default: 40
    },
    clockwise: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:currentRate'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var id = "van-circle-" + uid++;
    var viewBoxSize = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return +props.strokeWidth + 1000;
    });
    var path = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return getPath(props.clockwise, viewBoxSize.value);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.rate;
    }, function (rate) {
      var rafId;
      var startTime = Date.now();
      var startRate = props.currentRate;
      var endRate = format(rate);
      var duration = Math.abs((startRate - endRate) * 1000 / +props.speed);

      var animate = function animate() {
        var now = Date.now();
        var progress = Math.min((now - startTime) / duration, 1);
        var rate = progress * (endRate - startRate) + startRate;
        emit('update:currentRate', format(parseFloat(rate.toFixed(1))));

        if (endRate > startRate ? rate < endRate : rate > endRate) {
          rafId = raf(animate);
        }
      };

      if (props.speed) {
        if (rafId) {
          cancelRaf(rafId);
        }

        rafId = raf(animate);
      } else {
        emit('update:currentRate', endRate);
      }
    }, {
      immediate: true
    });

    var renderHover = function renderHover() {
      var PERIMETER = 3140;
      var strokeWidth = props.strokeWidth,
          currentRate = props.currentRate,
          strokeLinecap = props.strokeLinecap;
      var color = props.color;
      var offset = PERIMETER * currentRate / 100;
      color = isObject(color) ? "url(#" + id + ")" : color;
      var style = {
        stroke: "" + color,
        strokeWidth: +strokeWidth + 1 + "px",
        strokeLinecap: strokeLinecap,
        strokeDasharray: offset + "px " + PERIMETER + "px"
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
        "d": path.value,
        "style": style,
        "class": circle_bem('hover'),
        "stroke": color
      }, null);
    };

    var renderLayer = function renderLayer() {
      var style = {
        fill: props.fill,
        stroke: props.layerColor,
        strokeWidth: props.strokeWidth + "px"
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
        "class": circle_bem('layer'),
        "style": style,
        "d": path.value
      }, null);
    };

    var renderGradient = function renderGradient() {
      var color = props.color;

      if (!isObject(color)) {
        return;
      }

      var Stops = Object.keys(color).sort(function (a, b) {
        return parseFloat(a) - parseFloat(b);
      }).map(function (key, index) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("stop", {
          "key": index,
          "offset": key,
          "stop-color": color[key]
        }, null);
      });
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("defs", null, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("linearGradient", {
        "id": id,
        "x1": "100%",
        "y1": "0%",
        "x2": "0%",
        "y2": "0%"
      }, circle_isSlot(Stops) ? Stops : {
        default: function _default() {
          return [Stops];
        }
      })]);
    };

    var renderText = function renderText() {
      if (slots.default) {
        return slots.default();
      }

      if (props.text) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": circle_bem('text')
        }, [props.text]);
      }
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": circle_bem(),
        "style": getSizeStyle(props.size)
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("svg", {
        "viewBox": "0 0 " + viewBoxSize.value + " " + viewBoxSize.value
      }, [renderGradient(), renderLayer(), renderHover()]), renderText()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/row/index.js





var row_createNamespace = createNamespace('row'),
    row_createComponent = row_createNamespace[0],
    row_bem = row_createNamespace[1];

var ROW_KEY = 'vanRow';
/* harmony default export */ var row = (row_createComponent({
  props: {
    align: String,
    justify: String,
    tag: {
      type: String,
      default: 'div'
    },
    gutter: {
      type: [Number, String],
      default: 0
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useChildren = useChildren(ROW_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    var groups = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var groups = [[]];
      var totalSpan = 0;
      children.forEach(function (child, index) {
        // TODO
        // @ts-ignore
        totalSpan += Number(child.span);

        if (totalSpan > 24) {
          groups.push([index]);
          totalSpan -= 24;
        } else {
          groups[groups.length - 1].push(index);
        }
      });
      return groups;
    });
    var spaces = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var gutter = Number(props.gutter);
      var spaces = [];

      if (!gutter) {
        return spaces;
      }

      groups.value.forEach(function (group) {
        var averagePadding = gutter * (group.length - 1) / group.length;
        group.forEach(function (item, index) {
          if (index === 0) {
            spaces.push({
              right: averagePadding
            });
          } else {
            var left = gutter - spaces[item - 1].right;
            var right = averagePadding - left;
            spaces.push({
              left: left,
              right: right
            });
          }
        });
      });
      return spaces;
    });
    linkChildren({
      spaces: spaces
    });
    return function () {
      var _bem;

      var tag = props.tag,
          align = props.align,
          justify = props.justify;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag, {
        "class": row_bem((_bem = {}, _bem["align-" + align] = align, _bem["justify-" + justify] = justify, _bem))
      }, {
        default: function _default() {
          return [slots.default == null ? void 0 : slots.default()];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/col/index.js






var col_createNamespace = createNamespace('col'),
    col_createComponent = col_createNamespace[0],
    col_bem = col_createNamespace[1];

/* harmony default export */ var col = (col_createComponent({
  props: {
    offset: [Number, String],
    tag: {
      type: String,
      default: 'div'
    },
    span: {
      type: [Number, String],
      default: 0
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useParent = useParent(ROW_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (!parent) {
        return;
      }

      var spaces = parent.spaces;

      if (spaces && spaces.value && spaces.value[index.value]) {
        var _spaces$value$value = spaces.value[index.value],
            left = _spaces$value$value.left,
            right = _spaces$value$value.right;
        return {
          paddingLeft: left ? left + "px" : null,
          paddingRight: right ? right + "px" : null
        };
      }
    });
    return function () {
      var _bem;

      var tag = props.tag,
          span = props.span,
          offset = props.offset;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag, {
        "style": style.value,
        "class": col_bem((_bem = {}, _bem[span] = span, _bem["offset-" + offset] = offset, _bem))
      }, {
        default: function _default() {
          return [slots.default == null ? void 0 : slots.default()];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/collapse/index.js





var collapse_createNamespace = createNamespace('collapse'),
    collapse_createComponent = collapse_createNamespace[0],
    collapse_bem = collapse_createNamespace[1];

var COLLAPSE_KEY = 'vanCollapse';
/* harmony default export */ var collapse = (collapse_createComponent({
  props: {
    accordion: Boolean,
    modelValue: [String, Number, Array],
    border: {
      type: Boolean,
      default: true
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useChildren = useChildren(COLLAPSE_KEY),
        linkChildren = _useChildren.linkChildren;

    var toggle = function toggle(name, expanded) {
      var accordion = props.accordion,
          modelValue = props.modelValue;

      if (accordion) {
        if (name === modelValue) {
          name = '';
        }
      } else if (expanded) {
        name = modelValue.concat(name);
      } else {
        name = modelValue.filter(function (activeName) {
          return activeName !== name;
        });
      }

      emit('change', name);
      emit('update:modelValue', name);
    };

    var isExpanded = function isExpanded(name) {
      var accordion = props.accordion,
          modelValue = props.modelValue;

      if (!accordion && !Array.isArray(modelValue) && "production" !== 'production') {
        console.error('[Vant] Collapse: type of prop "modelValue" should be Array');
        return;
      }

      return accordion ? modelValue === name : modelValue.indexOf(name) !== -1;
    };

    linkChildren({
      toggle: toggle,
      isExpanded: isExpanded
    });
    return function () {
      var _ref2;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [collapse_bem(), (_ref2 = {}, _ref2[BORDER_TOP_BOTTOM] = props.border, _ref2)]
      }, [slots.default == null ? void 0 : slots.default()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/collapse-item/index.js






 // Utils

 // Composition



 // Components




var collapse_item_createNamespace = createNamespace('collapse-item'),
    collapse_item_createComponent = collapse_item_createNamespace[0],
    collapse_item_bem = collapse_item_createNamespace[1];

/* harmony default export */ var collapse_item = (collapse_item_createComponent({
  props: _extends({}, cellProps, {
    name: [Number, String],
    disabled: Boolean,
    isLink: {
      type: Boolean,
      default: true
    }
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var wrapperRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var contentRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var _useParent = useParent(COLLAPSE_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var currentName = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var _props$name;

      return (_props$name = props.name) != null ? _props$name : index.value;
    });
    var expanded = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (parent) {
        return parent.isExpanded(currentName.value);
      }

      return null;
    });
    var show = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(expanded.value);
    var lazyRender = useLazyRender(show);

    var onTransitionEnd = function onTransitionEnd() {
      if (!expanded.value) {
        show.value = false;
      } else {
        wrapperRef.value.style.height = '';
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(expanded, function (value, oldValue) {
      if (oldValue === null) {
        return;
      }

      if (value) {
        show.value = true;
      } // Use raf: flick when opened in safari
      // Use nextTick: closing animation failed when set `user-select: none`


      var tick = value ? external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick : raf;
      tick(function () {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }

        var offsetHeight = contentRef.value.offsetHeight;

        if (offsetHeight) {
          var contentHeight = offsetHeight + "px";
          wrapperRef.value.style.height = value ? 0 : contentHeight; // use double raf to ensure animation can start

          doubleRaf(function () {
            wrapperRef.value.style.height = value ? contentHeight : 0;
          });
        } else {
          onTransitionEnd();
        }
      });
    });

    var toggle = function toggle(value) {
      if (value === void 0) {
        value = !expanded.value;
      }

      parent.toggle(currentName.value, value);
    };

    var onClickTitle = function onClickTitle() {
      if (!props.disabled) {
        toggle();
      }
    };

    var renderTitle = function renderTitle() {
      var border = props.border,
          disabled = props.disabled;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "role": "button",
        "class": collapse_item_bem('title', {
          disabled: disabled,
          expanded: expanded.value,
          borderless: !border
        }),
        "tabindex": disabled ? -1 : 0,
        "aria-expanded": String(expanded.value),
        "onClick": onClickTitle
      }, props), {
        icon: slots.icon,
        title: slots.title,
        default: slots.value,
        'right-icon': slots['right-icon']
      });
    };

    var renderContent = lazyRender(function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": wrapperRef,
        "class": collapse_item_bem('wrapper'),
        "onTransitionend": onTransitionEnd
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": contentRef,
        "class": collapse_item_bem('content')
      }, [slots.default == null ? void 0 : slots.default()])]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, show.value]]);
    });
    useExpose({
      toggle: toggle
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [collapse_item_bem({
          border: index.value && props.border
        })]
      }, [renderTitle(), renderContent()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/contact-card/index.js





function contact_card_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var contact_card_createNamespace = createNamespace('contact-card'),
    contact_card_createComponent = contact_card_createNamespace[0],
    contact_card_bem = contact_card_createNamespace[1],
    contact_card_t = contact_card_createNamespace[2];

/* harmony default export */ var contact_card = (contact_card_createComponent({
  props: {
    tel: String,
    name: String,
    addText: String,
    editable: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  emits: ['click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var onClick = function onClick(event) {
      if (props.editable) {
        emit('click', event);
      }
    };

    var renderContent = function renderContent() {
      if (props.type === 'add') {
        return props.addText || contact_card_t('addText');
      }

      return [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", null, [contact_card_t('name') + "\uFF1A" + props.name]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", null, [contact_card_t('tel') + "\uFF1A" + props.tel])];
    };

    return function () {
      var _slot;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell, {
        "center": true,
        "icon": props.type === 'edit' ? 'contact' : 'add-square',
        "class": contact_card_bem([props.type]),
        "border": false,
        "isLink": props.editable,
        "valueClass": contact_card_bem('value'),
        "onClick": onClick
      }, contact_card_isSlot(_slot = renderContent()) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/form/index.js






var form_createNamespace = createNamespace('form'),
    form_createComponent = form_createNamespace[0],
    form_bem = form_createNamespace[1];

/* harmony default export */ var es_form = (form_createComponent({
  props: {
    colon: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    showError: Boolean,
    labelWidth: [Number, String],
    labelAlign: String,
    inputAlign: String,
    scrollToError: Boolean,
    validateFirst: Boolean,
    errorMessageAlign: String,
    submitOnEnter: {
      type: Boolean,
      default: true
    },
    validateTrigger: {
      type: String,
      default: 'onBlur'
    },
    showErrorMessage: {
      type: Boolean,
      default: true
    }
  },
  emits: ['submit', 'failed'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useChildren = useChildren(FORM_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    var getFieldsByNames = function getFieldsByNames(names) {
      if (names) {
        return children.filter(function (field) {
          return names.indexOf(field.name) !== -1;
        });
      }

      return children;
    };

    var validateSeq = function validateSeq(names) {
      return new Promise(function (resolve, reject) {
        var errors = [];
        var fields = getFieldsByNames(names);
        fields.reduce(function (promise, field) {
          return promise.then(function () {
            if (!errors.length) {
              return field.validate().then(function (error) {
                if (error) {
                  errors.push(error);
                }
              });
            }
          });
        }, Promise.resolve()).then(function () {
          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    };

    var validateAll = function validateAll(names) {
      return new Promise(function (resolve, reject) {
        var fields = getFieldsByNames(names);
        Promise.all(fields.map(function (item) {
          return item.validate();
        })).then(function (errors) {
          errors = errors.filter(function (item) {
            return item;
          });

          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    };

    var validateField = function validateField(name) {
      var matched = children.filter(function (item) {
        return item.name === name;
      });

      if (matched.length) {
        return new Promise(function (resolve, reject) {
          matched[0].validate().then(function (error) {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }

      return Promise.reject();
    };

    var validate = function validate(name) {
      if (name && !Array.isArray(name)) {
        return validateField(name);
      }

      return props.validateFirst ? validateSeq(name) : validateAll(name);
    };

    var resetValidation = function resetValidation(name) {
      if (name && !Array.isArray(name)) {
        name = [name];
      }

      var fields = getFieldsByNames(name);
      fields.forEach(function (item) {
        item.resetValidation();
      });
    };

    var scrollToField = function scrollToField(name, options) {
      children.some(function (item) {
        if (item.name === name) {
          item.$el.scrollIntoView(options);
          return true;
        }

        return false;
      });
    };

    var getValues = function getValues() {
      return children.reduce(function (form, field) {
        form[field.name] = field.formValue.value;
        return form;
      }, {});
    };

    var submit = function submit() {
      var values = getValues();
      validate().then(function () {
        emit('submit', values);
      }).catch(function (errors) {
        emit('failed', {
          values: values,
          errors: errors
        });

        if (props.scrollToError) {
          scrollToField(errors[0].name);
        }
      });
    };

    var onSubmit = function onSubmit(event) {
      event.preventDefault();
      submit();
    };

    linkChildren({
      props: props
    });
    useExpose({
      submit: submit,
      validate: validate,
      scrollToField: scrollToField,
      resetValidation: resetValidation
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("form", {
        "class": form_bem(),
        "onSubmit": onSubmit
      }, [slots.default == null ? void 0 : slots.default()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/contact-edit/index.js



 // Utils


 // Components








var contact_edit_createNamespace = createNamespace('contact-edit'),
    contact_edit_createComponent = contact_edit_createNamespace[0],
    contact_edit_bem = contact_edit_createNamespace[1],
    contact_edit_t = contact_edit_createNamespace[2];

var DEFAULT_CONTACT = {
  tel: '',
  name: ''
};
/* harmony default export */ var contact_edit = (contact_edit_createComponent({
  props: {
    isEdit: Boolean,
    isSaving: Boolean,
    isDeleting: Boolean,
    showSetDefault: Boolean,
    setDefaultLabel: String,
    contactInfo: {
      type: Object,
      default: function _default() {
        return _extends({}, DEFAULT_CONTACT);
      }
    },
    telValidator: {
      type: Function,
      default: isMobile
    }
  },
  emits: ['save', 'delete', 'change-default'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var contact = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)(_extends({}, DEFAULT_CONTACT, props.contactInfo));

    var onSave = function onSave() {
      if (!props.isSaving) {
        emit('save', contact);
      }
    };

    var onDelete = function onDelete() {
      dialog.confirm({
        title: contact_edit_t('confirmDelete')
      }).then(function () {
        emit('delete', contact);
      });
    };

    var renderButtons = function renderButtons() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": contact_edit_bem('buttons')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
        "block": true,
        "round": true,
        "type": "danger",
        "text": contact_edit_t('save'),
        "loading": props.isSaving,
        "nativeType": "submit"
      }, null), props.isEdit && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
        "block": true,
        "round": true,
        "text": contact_edit_t('delete'),
        "loading": props.isDeleting,
        "onClick": onDelete
      }, null)]);
    };

    var renderSwitch = function renderSwitch() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_switch, {
        "modelValue": contact.isDefault,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return contact.isDefault = $event;
        },
        "size": 24,
        "onChange": function onChange(event) {
          emit('change-default', event);
        }
      }, null);
    };

    var renderSetDefault = function renderSetDefault() {
      if (props.showSetDefault) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell, {
          "title": props.setDefaultLabel,
          "class": contact_edit_bem('switch-cell'),
          "border": false
        }, {
          'right-icon': renderSwitch
        });
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.contactInfo;
    }, function (value) {
      _extends(contact, DEFAULT_CONTACT, value);
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_form, {
        "class": contact_edit_bem(),
        "onSubmit": onSave
      }, {
        default: function _default() {
          return [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
            "class": contact_edit_bem('fields')
          }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_field, {
            "modelValue": contact.name,
            "onUpdate:modelValue": function onUpdateModelValue($event) {
              return contact.name = $event;
            },
            "clearable": true,
            "label": contact_edit_t('name'),
            "rules": [{
              required: true,
              message: contact_edit_t('nameInvalid')
            }],
            "maxlength": "30",
            "placeholder": contact_edit_t('nameEmpty')
          }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_field, {
            "modelValue": contact.tel,
            "onUpdate:modelValue": function onUpdateModelValue($event) {
              return contact.tel = $event;
            },
            "clearable": true,
            "type": "tel",
            "label": contact_edit_t('tel'),
            "rules": [{
              validator: props.telValidator,
              message: contact_edit_t('telInvalid')
            }],
            "placeholder": contact_edit_t('telEmpty')
          }, null)]), renderSetDefault(), renderButtons()];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/contact-list/index.js

 // Utils


 // Components








var contact_list_createNamespace = createNamespace('contact-list'),
    contact_list_createComponent = contact_list_createNamespace[0],
    contact_list_bem = contact_list_createNamespace[1],
    contact_list_t = contact_list_createNamespace[2];

/* harmony default export */ var contact_list = (contact_list_createComponent({
  props: {
    list: Array,
    addText: String,
    modelValue: null,
    defaultTagText: String
  },
  emits: ['add', 'edit', 'select', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var renderItem = function renderItem(item, index) {
      var onClick = function onClick() {
        emit('update:modelValue', item.id);
        emit('select', item, index);
      };

      var renderRightIcon = function renderRightIcon() {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_radio, {
          "name": item.id,
          "iconSize": 16,
          "checkedColor": RED
        }, null);
      };

      var renderEditIcon = function renderEditIcon() {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": "edit",
          "class": contact_list_bem('edit'),
          "onClick": function onClick(event) {
            event.stopPropagation();
            emit('edit', item, index);
          }
        }, null);
      };

      var renderContent = function renderContent() {
        var nodes = [item.name + "\uFF0C" + item.tel];

        if (item.isDefault && props.defaultTagText) {
          nodes.push((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag, {
            "type": "danger",
            "round": true,
            "class": contact_list_bem('item-tag')
          }, {
            default: function _default() {
              return [props.defaultTagText];
            }
          }));
        }

        return nodes;
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell, {
        "key": item.id,
        "isLink": true,
        "center": true,
        "class": contact_list_bem('item'),
        "valueClass": contact_list_bem('item-value'),
        "onClick": onClick
      }, {
        icon: renderEditIcon,
        default: renderContent,
        'right-icon': renderRightIcon
      });
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": contact_list_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(radio_group, {
        "modelValue": props.modelValue,
        "class": contact_list_bem('group')
      }, {
        default: function _default() {
          return [props.list && props.list.map(renderItem)];
        }
      }), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": contact_list_bem('bottom')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
        "round": true,
        "block": true,
        "type": "danger",
        "class": contact_list_bem('add'),
        "text": props.addText || contact_list_t('addText'),
        "onClick": function onClick() {
          emit('add');
        }
      }, null)])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/count-down/utils.js

function parseFormat(format, currentTime) {
  var days = currentTime.days;
  var hours = currentTime.hours,
      minutes = currentTime.minutes,
      seconds = currentTime.seconds,
      milliseconds = currentTime.milliseconds;

  if (format.indexOf('DD') === -1) {
    hours += days * 24;
  } else {
    format = format.replace('DD', padZero(days));
  }

  if (format.indexOf('HH') === -1) {
    minutes += hours * 60;
  } else {
    format = format.replace('HH', padZero(hours));
  }

  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60;
  } else {
    format = format.replace('mm', padZero(minutes));
  }

  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000;
  } else {
    format = format.replace('ss', padZero(seconds));
  }

  if (format.indexOf('S') !== -1) {
    var ms = padZero(milliseconds, 3);

    if (format.indexOf('SSS') !== -1) {
      format = format.replace('SSS', ms);
    } else if (format.indexOf('SS') !== -1) {
      format = format.replace('SS', ms.slice(0, 2));
    } else {
      format = format.replace('S', ms.charAt(0));
    }
  }

  return format;
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useCountDown/index.js


var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;

function parseTime(time) {
  var days = Math.floor(time / DAY);
  var hours = Math.floor(time % DAY / HOUR);
  var minutes = Math.floor(time % HOUR / MINUTE);
  var seconds = Math.floor(time % MINUTE / SECOND);
  var milliseconds = Math.floor(time % SECOND);
  return {
    total: time,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}

function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

function useCountDown(options) {
  var rafId;
  var endTime;
  var counting;
  var deactivated;
  var remain = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(options.time);
  var current = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
    return parseTime(remain.value);
  });

  var pause = function pause() {
    counting = false;
    cancelRaf(rafId);
  };

  var getCurrentRemain = function getCurrentRemain() {
    return Math.max(endTime - Date.now(), 0);
  };

  var setRemain = function setRemain(value) {
    remain.value = value;
    options.onChange == null ? void 0 : options.onChange(current.value);

    if (value === 0) {
      pause();
      options.onFinish == null ? void 0 : options.onFinish();
    }
  };

  var microTick = function microTick() {
    rafId = raf(function () {
      // in case of call reset immediately after finish
      if (counting) {
        setRemain(getCurrentRemain());

        if (remain.value > 0) {
          microTick();
        }
      }
    });
  };

  var macroTick = function macroTick() {
    rafId = raf(function () {
      // in case of call reset immediately after finish
      if (counting) {
        var remainRemain = getCurrentRemain();

        if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          setRemain(remainRemain);
        }

        if (remain.value > 0) {
          macroTick();
        }
      }
    });
  };

  var tick = function tick() {
    // should not start counting in server
    // see: https://github.com/youzan/vant/issues/7807
    if (!utils_inBrowser) {
      return;
    }

    if (options.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };

  var start = function start() {
    if (!counting) {
      endTime = Date.now() + remain.value;
      counting = true;
      tick();
    }
  };

  var reset = function reset(totalTime) {
    if (totalTime === void 0) {
      totalTime = options.time;
    }

    pause();
    remain.value = totalTime;
  };

  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(pause);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onActivated)(function () {
    if (deactivated) {
      counting = true;
      deactivated = false;
      tick();
    }
  });
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onDeactivated)(function () {
    if (counting) {
      pause();
      deactivated = true;
    }
  });
  return {
    start: start,
    pause: pause,
    reset: reset,
    current: current
  };
}
;// CONCATENATED MODULE: ./es/count-down/index.js

 // Utils


 // Composition




var count_down_createNamespace = createNamespace('count-down'),
    count_down_createComponent = count_down_createNamespace[0],
    count_down_bem = count_down_createNamespace[1];

/* harmony default export */ var count_down = (count_down_createComponent({
  props: {
    millisecond: Boolean,
    time: {
      type: [Number, String],
      default: 0
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    autoStart: {
      type: Boolean,
      default: true
    }
  },
  emits: ['change', 'finish'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useCountDown = useCountDown({
      time: +props.time,
      millisecond: props.millisecond,
      onChange: function onChange(current) {
        emit('change', current);
      },
      onFinish: function onFinish() {
        emit('finish');
      }
    }),
        start = _useCountDown.start,
        pause = _useCountDown.pause,
        reset = _useCountDown.reset,
        current = _useCountDown.current;

    var timeText = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return parseFormat(props.format, current.value);
    });

    var resetTime = function resetTime() {
      reset(+props.time);

      if (props.autoStart) {
        start();
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.time;
    }, resetTime, {
      immediate: true
    });
    useExpose({
      start: start,
      pause: pause,
      reset: resetTime
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": count_down_bem()
      }, [slots.default ? slots.default(current.value) : timeText.value]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/coupon/index.js







function coupon_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var coupon_createNamespace = createNamespace('coupon'),
    coupon_createComponent = coupon_createNamespace[0],
    coupon_bem = coupon_createNamespace[1],
    coupon_t = coupon_createNamespace[2];

function getDate(timeStamp) {
  var date = new Date(timeStamp * 1000);
  return date.getFullYear() + "." + padZero(date.getMonth() + 1) + "." + padZero(date.getDate());
}

function formatDiscount(discount) {
  return (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
}

function formatAmount(amount) {
  return (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
}

/* harmony default export */ var es_coupon = (coupon_createComponent({
  props: {
    coupon: Object,
    chosen: Boolean,
    disabled: Boolean,
    currency: {
      type: String,
      default: '¥'
    }
  },
  setup: function setup(props) {
    var validPeriod = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var _props$coupon = props.coupon,
          startAt = _props$coupon.startAt,
          endAt = _props$coupon.endAt;
      return getDate(startAt) + " - " + getDate(endAt);
    });
    var faceAmount = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var coupon = props.coupon,
          currency = props.currency;

      if (coupon.valueDesc) {
        return [coupon.valueDesc, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [coupon.unitDesc || ''])];
      }

      if (coupon.denominations) {
        var denominations = formatAmount(coupon.denominations);
        return [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, coupon_isSlot(currency) ? currency : {
          default: function _default() {
            return [currency];
          }
        }), " " + denominations];
      }

      if (coupon.discount) {
        return coupon_t('discount', formatDiscount(coupon.discount));
      }

      return '';
    });
    var conditionMessage = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var condition = formatAmount(props.coupon.originCondition);
      return condition === '0' ? coupon_t('unlimited') : coupon_t('condition', condition);
    });
    return function () {
      var chosen = props.chosen,
          coupon = props.coupon,
          disabled = props.disabled;
      var description = disabled && coupon.reason || coupon.description;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": coupon_bem({
          disabled: disabled
        })
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": coupon_bem('content')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": coupon_bem('head')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("h2", {
        "class": coupon_bem('amount')
      }, [faceAmount.value]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", {
        "class": coupon_bem('condition')
      }, [coupon.condition || conditionMessage.value])]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": coupon_bem('body')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", {
        "class": coupon_bem('name')
      }, [coupon.name]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", {
        "class": coupon_bem('valid')
      }, [validPeriod.value]), !disabled && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_checkbox, {
        "size": 18,
        "class": coupon_bem('corner'),
        "modelValue": chosen,
        "checkedColor": RED
      }, null)])]), description && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", {
        "class": coupon_bem('description')
      }, coupon_isSlot(description) ? description : {
        default: function _default() {
          return [description];
        }
      })]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/coupon-cell/index.js




var coupon_cell_createNamespace = createNamespace('coupon-cell'),
    coupon_cell_createComponent = coupon_cell_createNamespace[0],
    coupon_cell_bem = coupon_cell_createNamespace[1],
    coupon_cell_t = coupon_cell_createNamespace[2];

function formatValue(props) {
  var coupons = props.coupons,
      chosenCoupon = props.chosenCoupon,
      currency = props.currency;
  var coupon = coupons[+chosenCoupon];

  if (coupon) {
    var value = 0;

    if (isDef(coupon.value)) {
      value = coupon.value;
    } else if (isDef(coupon.denominations)) {
      value = coupon.denominations;
    }

    return "-" + currency + " " + (value / 100).toFixed(2);
  }

  return coupons.length === 0 ? coupon_cell_t('tips') : coupon_cell_t('count', coupons.length);
}

/* harmony default export */ var coupon_cell = (coupon_cell_createComponent({
  props: {
    title: String,
    coupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    currency: {
      type: String,
      default: '¥'
    },
    border: {
      type: Boolean,
      default: true
    },
    editable: {
      type: Boolean,
      default: true
    },
    chosenCoupon: {
      type: [Number, String],
      default: -1
    }
  },
  setup: function setup(props) {
    return function () {
      var selected = props.coupons[+props.chosenCoupon];
      var value = formatValue(props);
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell, {
        "class": coupon_cell_bem(),
        "value": value,
        "title": props.title || coupon_cell_t('title'),
        "border": props.border,
        "isLink": props.editable,
        "valueClass": coupon_cell_bem('value', {
          selected: selected
        })
      }, null);
    };
  }
}));
;// CONCATENATED MODULE: ./es/coupon-list/index.js




 // Utils

 // Composition


 // Components







function coupon_list_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var coupon_list_createNamespace = createNamespace('coupon-list'),
    coupon_list_createComponent = coupon_list_createNamespace[0],
    coupon_list_bem = coupon_list_createNamespace[1],
    coupon_list_t = coupon_list_createNamespace[2];

var EMPTY_IMAGE = 'https://img01.yzcdn.cn/vant/coupon-empty.png';
/* harmony default export */ var coupon_list = (coupon_list_createComponent({
  props: {
    code: String,
    enabledTitle: String,
    disabledTitle: String,
    closeButtonText: String,
    inputPlaceholder: String,
    exchangeButtonText: String,
    exchangeButtonLoading: Boolean,
    exchangeButtonDisabled: Boolean,
    exchangeMinLength: {
      type: Number,
      default: 1
    },
    chosenCoupon: {
      type: Number,
      default: -1
    },
    coupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabledCoupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    displayedCouponIndex: {
      type: Number,
      default: -1
    },
    showExchangeBar: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showCount: {
      type: Boolean,
      default: true
    },
    currency: {
      type: String,
      default: '¥'
    },
    emptyImage: {
      type: String,
      default: EMPTY_IMAGE
    }
  },
  emits: ['change', 'exchange', 'update:code'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useRefs = useRefs(),
        couponRefs = _useRefs[0],
        setCouponRefs = _useRefs[1];

    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      tab: 0,
      code: props.code || ''
    });

    var _useWindowSize = useWindowSize(),
        windowHeight = _useWindowSize.height;

    var buttonDisabled = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return !props.exchangeButtonLoading && (props.exchangeButtonDisabled || !state.code || state.code.length < props.exchangeMinLength);
    });
    var listStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return {
        height: windowHeight.value - (props.showExchangeBar ? 140 : 94) + 'px'
      };
    });

    var onExchange = function onExchange() {
      emit('exchange', state.code); // auto clear currentCode when not use vModel

      if (!props.code) {
        state.code = '';
      }
    };

    var scrollToCoupon = function scrollToCoupon(index) {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        if (couponRefs.value[index]) {
          couponRefs.value[index].scrollIntoView();
        }
      });
    };

    var renderEmpty = function renderEmpty() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": coupon_list_bem('empty')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("img", {
        "src": props.emptyImage
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", null, [coupon_list_t('empty')])]);
    };

    var renderExchangeBar = function renderExchangeBar() {
      if (props.showExchangeBar) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": coupon_list_bem('exchange-bar')
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_field, {
          "modelValue": state.code,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return state.code = $event;
          },
          "clearable": true,
          "border": false,
          "class": coupon_list_bem('field'),
          "placeholder": props.inputPlaceholder || coupon_list_t('placeholder'),
          "maxlength": "20"
        }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
          "plain": true,
          "type": "danger",
          "class": coupon_list_bem('exchange'),
          "text": props.exchangeButtonText || coupon_list_t('exchange'),
          "loading": props.exchangeButtonLoading,
          "disabled": buttonDisabled.value,
          "onClick": onExchange
        }, null)]);
      }
    };

    var renderCouponTab = function renderCouponTab() {
      var _slot;

      var coupons = props.coupons;
      var count = props.showCount ? " (" + coupons.length + ")" : '';
      var title = (props.enabledTitle || coupon_list_t('enable')) + count;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tab, {
        "title": title
      }, coupon_list_isSlot(_slot = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": coupon_list_bem('list', {
          'with-bottom': props.showCloseButton
        }),
        "style": listStyle.value
      }, [coupons.map(function (coupon, index) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_coupon, {
          "key": coupon.id,
          "ref": setCouponRefs(index),
          "coupon": coupon,
          "chosen": index === props.chosenCoupon,
          "currency": props.currency,
          "onClick": function onClick() {
            return emit('change', index);
          }
        }, null);
      }), !coupons.length && renderEmpty()])) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      });
    };

    var renderDisabledTab = function renderDisabledTab() {
      var _slot2;

      var disabledCoupons = props.disabledCoupons;
      var count = props.showCount ? " (" + disabledCoupons.length + ")" : '';
      var title = (props.disabledTitle || coupon_list_t('disabled')) + count;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tab, {
        "title": title
      }, coupon_list_isSlot(_slot2 = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": coupon_list_bem('list', {
          'with-bottom': props.showCloseButton
        }),
        "style": listStyle.value
      }, [disabledCoupons.map(function (coupon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_coupon, {
          "disabled": true,
          "key": coupon.id,
          "coupon": coupon,
          "currency": props.currency
        }, null);
      }), !disabledCoupons.length && renderEmpty()])) ? _slot2 : {
        default: function _default() {
          return [_slot2];
        }
      });
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.code;
    }, function (value) {
      state.code = value;
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return state.code;
    }, function (value) {
      emit('update:code', value);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.displayedCouponIndex;
    }, scrollToCoupon);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
      scrollToCoupon(props.displayedCouponIndex);
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": coupon_list_bem()
      }, [renderExchangeBar(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tabs, {
        "modelValue": state.tab,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return state.tab = $event;
        },
        "class": coupon_list_bem('tab'),
        "border": false
      }, {
        default: function _default() {
          return [renderCouponTab(), renderDisabledTab()];
        }
      }), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": coupon_list_bem('bottom')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
        "round": true,
        "block": true,
        "type": "danger",
        "class": coupon_list_bem('close'),
        "text": props.closeButtonText || coupon_list_t('close'),
        "onClick": function onClick() {
          emit('change', -1);
        }
      }, null), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.showCloseButton]])])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/datetime-picker/TimePicker.js




 // Utils


 // Composition

 // Components




var TimePicker_createNamespace = createNamespace('time-picker'),
    TimePicker_createComponent = TimePicker_createNamespace[0];

/* harmony default export */ var TimePicker = (TimePicker_createComponent({
  props: _extends({}, sharedProps, {
    minHour: {
      type: [Number, String],
      default: 0
    },
    maxHour: {
      type: [Number, String],
      default: 23
    },
    minMinute: {
      type: [Number, String],
      default: 0
    },
    maxMinute: {
      type: [Number, String],
      default: 59
    }
  }),
  emits: ['confirm', 'cancel', 'change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var formatValue = function formatValue(value) {
      var minHour = props.minHour,
          maxHour = props.maxHour,
          maxMinute = props.maxMinute,
          minMinute = props.minMinute;

      if (!value) {
        value = padZero(minHour) + ":" + padZero(minMinute);
      }

      var _value$split = value.split(':'),
          hour = _value$split[0],
          minute = _value$split[1];

      hour = padZero(range(hour, minHour, maxHour));
      minute = padZero(range(minute, minMinute, maxMinute));
      return hour + ":" + minute;
    };

    var picker = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var currentDate = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(formatValue(props.modelValue));
    var ranges = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return [{
        type: 'hour',
        range: [+props.minHour, +props.maxHour]
      }, {
        type: 'minute',
        range: [+props.minMinute, +props.maxMinute]
      }];
    });
    var originColumns = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return ranges.value.map(function (_ref2) {
        var type = _ref2.type,
            rangeArr = _ref2.range;
        var values = times(rangeArr[1] - rangeArr[0] + 1, function (index) {
          return padZero(rangeArr[0] + index);
        });

        if (props.filter) {
          values = props.filter(type, values);
        }

        return {
          type: type,
          values: values
        };
      });
    });
    var columns = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return originColumns.value.map(function (column) {
        return {
          values: column.values.map(function (value) {
            return props.formatter(column.type, value);
          })
        };
      });
    });

    var updateColumnValue = function updateColumnValue() {
      var pair = currentDate.value.split(':');
      var values = [props.formatter('hour', pair[0]), props.formatter('minute', pair[1])];
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        picker.value.setValues(values);
      });
    };

    var updateInnerValue = function updateInnerValue() {
      var _picker$value$getInde = picker.value.getIndexes(),
          hourIndex = _picker$value$getInde[0],
          minuteIndex = _picker$value$getInde[1];

      var _originColumns$value = originColumns.value,
          hourColumn = _originColumns$value[0],
          minuteColumn = _originColumns$value[1];
      var hour = hourColumn.values[hourIndex] || hourColumn.values[0];
      var minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];
      currentDate.value = formatValue(hour + ":" + minute);
      updateColumnValue();
    };

    var onConfirm = function onConfirm() {
      emit('confirm', currentDate.value);
    };

    var onCancel = function onCancel() {
      emit('cancel');
    };

    var onChange = function onChange() {
      updateInnerValue();
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
          emit('change', currentDate.value);
        });
      });
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
      updateColumnValue();
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(updateInnerValue);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(columns, updateColumnValue);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([function () {
      return props.filter;
    }, function () {
      return props.minHour;
    }, function () {
      return props.maxHour;
    }, function () {
      return props.minMinute;
    }, function () {
      return props.maxMinute;
    }], updateInnerValue);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(currentDate, function (value) {
      emit('update:modelValue', value);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.modelValue;
    }, function (value) {
      value = formatValue(value);

      if (value !== currentDate.value) {
        currentDate.value = value;
        updateColumnValue();
      }
    });
    useExpose({
      getPicker: function getPicker() {
        return picker.value;
      }
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_picker, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": picker,
        "columns": columns.value,
        "readonly": props.readonly,
        "onChange": onChange,
        "onCancel": onCancel,
        "onConfirm": onConfirm
      }, pick(props, Object.keys(pickerProps))), _extends({}, slots));
    };
  }
}));
;// CONCATENATED MODULE: ./es/datetime-picker/DatePicker.js




 // Utils



 // Composition

 // Components



var currentYear = new Date().getFullYear();

var DatePicker_createNamespace = createNamespace('date-picker'),
    DatePicker_createComponent = DatePicker_createNamespace[0];

/* harmony default export */ var DatePicker = (DatePicker_createComponent({
  props: _extends({}, sharedProps, {
    type: {
      type: String,
      default: 'datetime'
    },
    minDate: {
      type: Date,
      default: function _default() {
        return new Date(currentYear - 10, 0, 1);
      },
      validator: isDate
    },
    maxDate: {
      type: Date,
      default: function _default() {
        return new Date(currentYear + 10, 11, 31);
      },
      validator: isDate
    }
  }),
  emits: ['confirm', 'cancel', 'change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var formatValue = function formatValue(value) {
      if (!isDate(value)) {
        value = props.minDate;
      }

      value = Math.max(value, props.minDate.getTime());
      value = Math.min(value, props.maxDate.getTime());
      return new Date(value);
    };

    var picker = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var currentDate = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(formatValue(props.modelValue));

    var getBoundary = function getBoundary(type, value) {
      var _ref2;

      var boundary = props[type + "Date"];
      var year = boundary.getFullYear();
      var month = 1;
      var date = 1;
      var hour = 0;
      var minute = 0;

      if (type === 'max') {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;

        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();

          if (value.getDate() === date) {
            hour = boundary.getHours();

            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }

      return _ref2 = {}, _ref2[type + "Year"] = year, _ref2[type + "Month"] = month, _ref2[type + "Date"] = date, _ref2[type + "Hour"] = hour, _ref2[type + "Minute"] = minute, _ref2;
    };

    var ranges = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var _getBoundary = getBoundary('max', currentDate.value),
          maxYear = _getBoundary.maxYear,
          maxDate = _getBoundary.maxDate,
          maxMonth = _getBoundary.maxMonth,
          maxHour = _getBoundary.maxHour,
          maxMinute = _getBoundary.maxMinute;

      var _getBoundary2 = getBoundary('min', currentDate.value),
          minYear = _getBoundary2.minYear,
          minDate = _getBoundary2.minDate,
          minMonth = _getBoundary2.minMonth,
          minHour = _getBoundary2.minHour,
          minMinute = _getBoundary2.minMinute;

      var result = [{
        type: 'year',
        range: [minYear, maxYear]
      }, {
        type: 'month',
        range: [minMonth, maxMonth]
      }, {
        type: 'day',
        range: [minDate, maxDate]
      }, {
        type: 'hour',
        range: [minHour, maxHour]
      }, {
        type: 'minute',
        range: [minMinute, maxMinute]
      }];

      switch (props.type) {
        case 'date':
          result = result.slice(0, 3);
          break;

        case 'year-month':
          result = result.slice(0, 2);
          break;

        case 'month-day':
          result = result.slice(1, 3);
          break;

        case 'datehour':
          result = result.slice(0, 4);
          break;
      }

      if (props.columnsOrder) {
        var columnsOrder = props.columnsOrder.concat(result.map(function (column) {
          return column.type;
        }));
        result.sort(function (a, b) {
          return columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type);
        });
      }

      return result;
    });
    var originColumns = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return ranges.value.map(function (_ref3) {
        var type = _ref3.type,
            rangeArr = _ref3.range;
        var values = times(rangeArr[1] - rangeArr[0] + 1, function (index) {
          var value = padZero(rangeArr[0] + index);
          return value;
        });

        if (props.filter) {
          values = props.filter(type, values);
        }

        return {
          type: type,
          values: values
        };
      });
    });
    var columns = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return originColumns.value.map(function (column) {
        return {
          values: column.values.map(function (value) {
            return props.formatter(column.type, value);
          })
        };
      });
    });

    var updateColumnValue = function updateColumnValue() {
      var value = currentDate.value;
      var formatter = props.formatter;
      var values = originColumns.value.map(function (column) {
        switch (column.type) {
          case 'year':
            return formatter('year', "" + value.getFullYear());

          case 'month':
            return formatter('month', padZero(value.getMonth() + 1));

          case 'day':
            return formatter('day', padZero(value.getDate()));

          case 'hour':
            return formatter('hour', padZero(value.getHours()));

          case 'minute':
            return formatter('minute', padZero(value.getMinutes()));

          default:
            // no default
            return null;
        }
      });
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        picker.value.setValues(values);
      });
    };

    var updateInnerValue = function updateInnerValue() {
      var type = props.type;
      var indexes = picker.value.getIndexes();

      var getValue = function getValue(type) {
        var index = 0;
        originColumns.value.forEach(function (column, columnIndex) {
          if (type === column.type) {
            index = columnIndex;
          }
        });
        var values = originColumns.value[index].values;
        return getTrueValue(values[indexes[index]]);
      };

      var year;
      var month;
      var day;

      if (type === 'month-day') {
        year = currentDate.value.getFullYear();
        month = getValue('month');
        day = getValue('day');
      } else {
        year = getValue('year');
        month = getValue('month');
        day = type === 'year-month' ? 1 : getValue('day');
      }

      var maxDay = getMonthEndDay(year, month);
      day = day > maxDay ? maxDay : day;
      var hour = 0;
      var minute = 0;

      if (type === 'datehour') {
        hour = getValue('hour');
      }

      if (type === 'datetime') {
        hour = getValue('hour');
        minute = getValue('minute');
      }

      var value = new Date(year, month - 1, day, hour, minute);
      currentDate.value = formatValue(value);
    };

    var onConfirm = function onConfirm() {
      emit('confirm', currentDate.value);
    };

    var onCancel = function onCancel() {
      emit('cancel');
    };

    var onChange = function onChange() {
      updateInnerValue();
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
          emit('change', currentDate.value);
        });
      });
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
      updateColumnValue();
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(updateInnerValue);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(columns, updateColumnValue);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(currentDate, function (value) {
      emit('update:modelValue', value);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([function () {
      return props.filter;
    }, function () {
      return props.minDate;
    }, function () {
      return props.maxDate;
    }], updateInnerValue);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.modelValue;
    }, function (value) {
      value = formatValue(value);

      if (value.valueOf() !== currentDate.value.valueOf()) {
        currentDate.value = value;
      }
    });
    useExpose({
      getPicker: function getPicker() {
        return picker.value;
      }
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_picker, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": picker,
        "columns": columns.value,
        "readonly": props.readonly,
        "onChange": onChange,
        "onCancel": onCancel,
        "onConfirm": onConfirm
      }, pick(props, Object.keys(pickerProps))), _extends({}, slots));
    };
  }
}));
;// CONCATENATED MODULE: ./es/datetime-picker/index.js










var datetime_picker_createNamespace = createNamespace('datetime-picker'),
    datetime_picker_createComponent = datetime_picker_createNamespace[0],
    datetime_picker_bem = datetime_picker_createNamespace[1];

var timePickerProps = Object.keys(TimePicker.props);
var datePickerProps = Object.keys(DatePicker.props);
/* harmony default export */ var datetime_picker = (datetime_picker_createComponent({
  props: _extends({}, TimePicker.props, DatePicker.props),
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    useExpose({
      getPicker: function getPicker() {
        var _root$value;

        return (_root$value = root.value) == null ? void 0 : _root$value.getPicker();
      }
    });
    return function () {
      var isTimePicker = props.type === 'time';
      var Component = isTimePicker ? TimePicker : DatePicker;
      var inheritProps = pick(props, isTimePicker ? timePickerProps : datePickerProps);
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Component, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": root,
        "class": datetime_picker_bem()
      }, _extends({}, inheritProps, attrs)), _extends({}, slots));
    };
  }
}));
;// CONCATENATED MODULE: ./es/divider/index.js



var divider_createNamespace = createNamespace('divider'),
    divider_createComponent = divider_createNamespace[0],
    divider_bem = divider_createNamespace[1];

/* harmony default export */ var divider = (divider_createComponent({
  props: {
    dashed: Boolean,
    hairline: {
      type: Boolean,
      default: true
    },
    contentPosition: {
      type: String,
      default: 'center'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var _bem;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "separator",
        "class": divider_bem((_bem = {
          dashed: props.dashed,
          hairline: props.hairline
        }, _bem["content-" + props.contentPosition] = !!slots.default, _bem))
      }, [slots.default == null ? void 0 : slots.default()]);
    };
  }
}));
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useClickAway/index.js



function useClickAway(target, listener, options) {
  if (options === void 0) {
    options = {};
  }

  if (!utils_inBrowser) {
    return;
  }

  var _options = options,
      _options$eventName = _options.eventName,
      eventName = _options$eventName === void 0 ? 'click' : _options$eventName;

  var onClick = function onClick(event) {
    var element = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.unref)(target);

    if (element && !element.contains(event.target)) {
      listener(event);
    }
  };

  useEventListener(eventName, onClick, {
    target: document
  });
}
;// CONCATENATED MODULE: ./es/dropdown-menu/index.js

 // Utils

 // Composition



var dropdown_menu_createNamespace = createNamespace('dropdown-menu'),
    dropdown_menu_createComponent = dropdown_menu_createNamespace[0],
    dropdown_menu_bem = dropdown_menu_createNamespace[1];

var DROPDOWN_KEY = 'vanDropdownMenu';
/* harmony default export */ var dropdown_menu = (dropdown_menu_createComponent({
  props: {
    zIndex: [Number, String],
    activeColor: String,
    overlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 0.2
    },
    direction: {
      type: String,
      default: 'down'
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var offset = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(0);
    var barRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var _useChildren = useChildren(DROPDOWN_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    var scrollParent = useScrollParent(root);
    var opened = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return children.some(function (item) {
        return item.state.showWrapper;
      });
    });
    var barStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (opened.value && isDef(props.zIndex)) {
        return {
          zIndex: 1 + props.zIndex
        };
      }
    });

    var onClickAway = function onClickAway() {
      if (props.closeOnClickOutside) {
        children.forEach(function (item) {
          item.toggle(false);
        });
      }
    };

    var updateOffset = function updateOffset() {
      if (barRef.value) {
        var rect = useRect(barRef);

        if (props.direction === 'down') {
          offset.value = rect.bottom;
        } else {
          offset.value = window.innerHeight - rect.top;
        }
      }
    };

    var onScroll = function onScroll() {
      if (opened.value) {
        updateOffset();
      }
    };

    var toggleItem = function toggleItem(active) {
      children.forEach(function (item, index) {
        if (index === active) {
          updateOffset();
          item.toggle();
        } else if (item.state.showPopup) {
          item.toggle(false, {
            immediate: true
          });
        }
      });
    };

    var renderTitle = function renderTitle(item, index) {
      var showPopup = item.state.showPopup;
      var disabled = item.disabled,
          titleClass = item.titleClass;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "button",
        "tabindex": disabled ? -1 : 0,
        "class": dropdown_menu_bem('item', {
          disabled: disabled
        }),
        "onClick": function onClick() {
          if (!disabled) {
            toggleItem(index);
          }
        }
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": [dropdown_menu_bem('title', {
          down: showPopup === (props.direction === 'down'),
          active: showPopup
        }), titleClass],
        "style": {
          color: showPopup ? props.activeColor : ''
        }
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": "van-ellipsis"
      }, [item.renderTitle()])])]);
    };

    linkChildren({
      props: props,
      offset: offset
    });
    useClickAway(root, onClickAway);
    useEventListener('scroll', onScroll, {
      target: scrollParent
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "class": dropdown_menu_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": barRef,
        "style": barStyle.value,
        "class": dropdown_menu_bem('bar', {
          opened: opened.value
        })
      }, [children.map(renderTitle)]), slots.default == null ? void 0 : slots.default()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/dropdown-item/index.js




 // Utils


 // Composition


 // Components





function dropdown_item_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var dropdown_item_createNamespace = createNamespace('dropdown-item'),
    dropdown_item_createComponent = dropdown_item_createNamespace[0],
    dropdown_item_bem = dropdown_item_createNamespace[1];

/* harmony default export */ var dropdown_item = (dropdown_item_createComponent({
  props: {
    title: String,
    disabled: Boolean,
    teleport: [String, Object],
    modelValue: null,
    titleClass: null,
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    lazyRender: {
      type: Boolean,
      default: true
    }
  },
  emits: ['open', 'opened', 'close', 'closed', 'change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      showPopup: false,
      transition: true,
      showWrapper: false
    });

    var _useParent = useParent(DROPDOWN_KEY),
        parent = _useParent.parent;

    var createEmitter = function createEmitter(eventName) {
      return function () {
        return emit(eventName);
      };
    };

    var onOpen = createEmitter('open');
    var onClose = createEmitter('close');
    var onOpened = createEmitter('opened');

    var onClosed = function onClosed() {
      state.showWrapper = false;
      emit('closed');
    };

    var onClickWrapper = function onClickWrapper(event) {
      // prevent being identified as clicking outside and closed when using teleport
      if (props.teleport) {
        event.stopPropagation();
      }
    };

    var toggle = function toggle(show, options) {
      if (show === void 0) {
        show = !state.showPopup;
      }

      if (options === void 0) {
        options = {};
      }

      if (show === state.showPopup) {
        return;
      }

      state.showPopup = show;
      state.transition = !options.immediate;

      if (show) {
        state.showWrapper = true;
      }
    };

    var renderTitle = function renderTitle() {
      if (slots.title) {
        return slots.title();
      }

      if (props.title) {
        return props.title;
      }

      var match = props.options.filter(function (option) {
        return option.value === props.modelValue;
      });
      return match.length ? match[0].text : '';
    };

    var renderOption = function renderOption(option) {
      var activeColor = parent.props.activeColor;
      var active = option.value === props.modelValue;

      var onClick = function onClick() {
        state.showPopup = false;

        if (option.value !== props.modelValue) {
          emit('update:modelValue', option.value);
          emit('change', option.value);
        }
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell, {
        "clickable": true,
        "key": option.value,
        "icon": option.icon,
        "title": option.text,
        "class": dropdown_item_bem('option', {
          active: active
        }),
        "style": {
          color: active ? activeColor : ''
        },
        "onClick": onClick
      }, {
        default: function _default() {
          return [active && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
            "class": dropdown_item_bem('icon'),
            "color": activeColor,
            "name": "success"
          }, null)];
        }
      });
    };

    var renderContent = function renderContent() {
      var offset = parent.offset;
      var _parent$props = parent.props,
          zIndex = _parent$props.zIndex,
          overlay = _parent$props.overlay,
          duration = _parent$props.duration,
          direction = _parent$props.direction,
          closeOnClickOverlay = _parent$props.closeOnClickOverlay;
      var style = {
        zIndex: zIndex
      };

      if (direction === 'down') {
        style.top = offset.value + "px";
      } else {
        style.bottom = offset.value + "px";
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "style": style,
        "class": dropdown_item_bem([direction]),
        "onClick": onClickWrapper
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup, {
        "show": state.showPopup,
        "onUpdate:show": function onUpdateShow($event) {
          return state.showPopup = $event;
        },
        "class": dropdown_item_bem('content'),
        "overlay": overlay,
        "position": direction === 'down' ? 'top' : 'bottom',
        "duration": state.transition ? duration : 0,
        "lazyRender": props.lazyRender,
        "overlayStyle": {
          position: 'absolute'
        },
        "closeOnClickOverlay": closeOnClickOverlay,
        "onOpen": onOpen,
        "onClose": onClose,
        "onOpened": onOpened,
        "onClosed": onClosed
      }, {
        default: function _default() {
          return [props.options.map(renderOption), slots.default == null ? void 0 : slots.default()];
        }
      })]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, state.showWrapper]]);
    };

    useExpose({
      state: state,
      toggle: toggle,
      renderTitle: renderTitle
    });
    return function () {
      if (props.teleport) {
        var _slot;

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Teleport, {
          "to": props.teleport
        }, dropdown_item_isSlot(_slot = renderContent()) ? _slot : {
          default: function _default() {
            return [_slot];
          }
        });
      }

      return renderContent();
    };
  }
}));
;// CONCATENATED MODULE: ./es/empty/Network.js

var prefix = 'van-empty-network-';

var renderStop = function renderStop(color, offset, opacity) {
  return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("stop", {
    "stop-color": color,
    "offset": offset + "%",
    "stop-opacity": opacity
  }, null);
};

var Network = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("svg", {
  "viewBox": "0 0 160 160"
}, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("defs", null, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("linearGradient", {
  "id": prefix + "1",
  "x1": "64.022%",
  "y1": "100%",
  "x2": "64.022%",
  "y2": "0%"
}, [renderStop('#FFF', 0, 0.5), renderStop('#F2F3F5', 100)]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("linearGradient", {
  "id": prefix + "2",
  "x1": "50%",
  "y1": "0%",
  "x2": "50%",
  "y2": "84.459%"
}, [renderStop('#EBEDF0', 0), renderStop('#DCDEE0', 100, 0)]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("linearGradient", {
  "id": prefix + "3",
  "x1": "100%",
  "y1": "0%",
  "x2": "100%",
  "y2": "100%"
}, [renderStop('#EAEDF0', 0), renderStop('#DCDEE0', 100)]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("linearGradient", {
  "id": prefix + "4",
  "x1": "100%",
  "y1": "100%",
  "x2": "100%",
  "y2": "0%"
}, [renderStop('#EAEDF0', 0), renderStop('#DCDEE0', 100)]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("linearGradient", {
  "id": prefix + "5",
  "x1": "0%",
  "y1": "43.982%",
  "x2": "100%",
  "y2": "54.703%"
}, [renderStop('#EAEDF0', 0), renderStop('#DCDEE0', 100)]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("linearGradient", {
  "id": prefix + "6",
  "x1": "94.535%",
  "y1": "43.837%",
  "x2": "5.465%",
  "y2": "54.948%"
}, [renderStop('#EAEDF0', 0), renderStop('#DCDEE0', 100)]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("radialGradient", {
  "id": prefix + "7",
  "cx": "50%",
  "cy": "0%",
  "fx": "50%",
  "fy": "0%",
  "r": "100%",
  "gradientTransform": "matrix(0 1 -.54835 0 .5 -.5)"
}, [renderStop('#EBEDF0', 0), renderStop('#FFF', 100, 0)])]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("g", {
  "fill": "none",
  "fill-rule": "evenodd"
}, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("g", {
  "opacity": ".8"
}, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "d": "M0 124V46h20v20h14v58H0z",
  "fill": "url(#" + prefix + "1)",
  "transform": "matrix(-1 0 0 1 36 7)"
}, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "d": "M121 8h22.231v14H152v77.37h-31V8z",
  "fill": "url(#" + prefix + "1)",
  "transform": "translate(2 7)"
}, null)]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "fill": "url(#" + prefix + "7)",
  "d": "M0 139h160v21H0z"
}, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "d": "M37 18a7 7 0 013 13.326v26.742c0 1.23-.997 2.227-2.227 2.227h-1.546A2.227 2.227 0 0134 58.068V31.326A7 7 0 0137 18z",
  "fill": "url(#" + prefix + "2)",
  "fill-rule": "nonzero",
  "transform": "translate(43 36)"
}, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("g", {
  "opacity": ".6",
  "stroke-linecap": "round",
  "stroke-width": "7"
}, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "d": "M20.875 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
  "stroke": "url(#" + prefix + "3)",
  "transform": "translate(43 36)"
}, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "d": "M9.849 0C3.756 6.225 0 14.747 0 24.146c0 9.398 3.756 17.92 9.849 24.145",
  "stroke": "url(#" + prefix + "3)",
  "transform": "translate(43 36)"
}, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "d": "M57.625 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
  "stroke": "url(#" + prefix + "4)",
  "transform": "rotate(-180 76.483 42.257)"
}, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "d": "M73.216 0c-6.093 6.225-9.849 14.747-9.849 24.146 0 9.398 3.756 17.92 9.849 24.145",
  "stroke": "url(#" + prefix + "4)",
  "transform": "rotate(-180 89.791 42.146)"
}, null)]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("g", {
  "transform": "translate(31 105)",
  "fill-rule": "nonzero"
}, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("rect", {
  "fill": "url(#" + prefix + "5)",
  "width": "98",
  "height": "34",
  "rx": "2"
}, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("rect", {
  "fill": "#FFF",
  "x": "9",
  "y": "8",
  "width": "80",
  "height": "18",
  "rx": "1.114"
}, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("rect", {
  "fill": "url(#" + prefix + "6)",
  "x": "15",
  "y": "12",
  "width": "18",
  "height": "6",
  "rx": "1.114"
}, null)])])]);
;// CONCATENATED MODULE: ./es/empty/index.js





function empty_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var empty_createNamespace = createNamespace('empty'),
    empty_createComponent = empty_createNamespace[0],
    empty_bem = empty_createNamespace[1];

var PRESET_IMAGES = ['error', 'search', 'default'];
/* harmony default export */ var empty = (empty_createComponent({
  props: {
    imageSize: [Number, String],
    description: String,
    image: {
      type: String,
      default: 'default'
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var renderImage = function renderImage() {
      if (slots.image) {
        return slots.image();
      }

      var image = props.image;

      if (image === 'network') {
        return Network;
      }

      if (PRESET_IMAGES.indexOf(image) !== -1) {
        image = "https://img01.yzcdn.cn/vant/empty-image-" + image + ".png";
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("img", {
        "src": image
      }, null);
    };

    var renderDescription = function renderDescription() {
      var description = slots.description ? slots.description() : props.description;

      if (description) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", {
          "class": empty_bem('description')
        }, empty_isSlot(description) ? description : {
          default: function _default() {
            return [description];
          }
        });
      }
    };

    var renderBottom = function renderBottom() {
      if (slots.default) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": empty_bem('bottom')
        }, [slots.default()]);
      }
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": empty_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": empty_bem('image'),
        "style": getSizeStyle(props.imageSize)
      }, [renderImage()]), renderDescription(), renderBottom()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/grid/index.js





var grid_createNamespace = createNamespace('grid'),
    grid_createComponent = grid_createNamespace[0],
    grid_bem = grid_createNamespace[1];

var GRID_KEY = 'vanGrid';
/* harmony default export */ var grid = (grid_createComponent({
  props: {
    square: Boolean,
    gutter: [Number, String],
    iconSize: [Number, String],
    direction: String,
    clickable: Boolean,
    columnNum: {
      type: [Number, String],
      default: 4
    },
    center: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useChildren = useChildren(GRID_KEY),
        linkChildren = _useChildren.linkChildren;

    linkChildren({
      props: props
    });
    return function () {
      var _ref2;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "style": {
          paddingLeft: addUnit(props.gutter)
        },
        "class": [grid_bem(), (_ref2 = {}, _ref2[BORDER_TOP] = props.border && !props.gutter, _ref2)]
      }, [slots.default == null ? void 0 : slots.default()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/grid-item/index.js



 // Utils



 // Composition


 // Components




function grid_item_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var grid_item_createNamespace = createNamespace('grid-item'),
    grid_item_createComponent = grid_item_createNamespace[0],
    grid_item_bem = grid_item_createNamespace[1];

/* harmony default export */ var grid_item = (grid_item_createComponent({
  props: _extends({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    badge: [Number, String],
    iconPrefix: String
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useParent = useParent(GRID_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var route = useRoute();
    var rootStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var _parent$props = parent.props,
          square = _parent$props.square,
          gutter = _parent$props.gutter,
          columnNum = _parent$props.columnNum;
      var percent = 100 / columnNum + "%";
      var style = {
        flexBasis: percent
      };

      if (square) {
        style.paddingTop = percent;
      } else if (gutter) {
        var gutterValue = addUnit(gutter);
        style.paddingRight = gutterValue;

        if (index.value >= columnNum) {
          style.marginTop = gutterValue;
        }
      }

      return style;
    });
    var contentStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var _parent$props2 = parent.props,
          square = _parent$props2.square,
          gutter = _parent$props2.gutter;

      if (square && gutter) {
        var gutterValue = addUnit(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: 'auto'
        };
      }
    });

    var renderIcon = function renderIcon() {
      if (slots.icon) {
        var _slot;

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_badge, {
          "dot": props.dot,
          "content": props.badge
        }, grid_item_isSlot(_slot = slots.icon()) ? _slot : {
          default: function _default() {
            return [_slot];
          }
        });
      }

      if (props.icon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "dot": props.dot,
          "name": props.icon,
          "size": parent.props.iconSize,
          "badge": props.badge,
          "class": grid_item_bem('icon'),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    var renderText = function renderText() {
      if (slots.text) {
        return slots.text();
      }

      if (props.text) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": grid_item_bem('text')
        }, [props.text]);
      }
    };

    var renderContent = function renderContent() {
      if (slots.default) {
        return slots.default();
      }

      return [renderIcon(), renderText()];
    };

    return function () {
      var _ref2;

      var _parent$props3 = parent.props,
          center = _parent$props3.center,
          border = _parent$props3.border,
          square = _parent$props3.square,
          gutter = _parent$props3.gutter,
          direction = _parent$props3.direction,
          clickable = _parent$props3.clickable;
      var classes = [grid_item_bem('content', [direction, {
        center: center,
        square: square,
        clickable: clickable,
        surround: border && gutter
      }]), (_ref2 = {}, _ref2[BORDER] = border, _ref2)];
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [grid_item_bem({
          square: square
        })],
        "style": rootStyle.value
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": clickable ? 'button' : null,
        "class": classes,
        "style": contentStyle.value,
        "tabindex": clickable ? 0 : null,
        "onClick": route
      }, [renderContent()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/image-preview/shared.js


var shared_createNamespace = createNamespace('image-preview'),
    shared_createComponent = shared_createNamespace[0],
    shared_bem = shared_createNamespace[1];


;// CONCATENATED MODULE: ./es/image-preview/ImagePreviewItem.js




 // Utils


 // Composition

 // Component





function ImagePreviewItem_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

function getDistance(touches) {
  return Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
}

/* harmony default export */ var ImagePreviewItem = ({
  props: {
    src: String,
    show: Boolean,
    active: Number,
    minZoom: [Number, String],
    maxZoom: [Number, String],
    rootWidth: Number,
    rootHeight: Number
  },
  emits: ['scale', 'close'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      imageRatio: 0,
      displayWidth: 0,
      displayHeight: 0
    });
    var touch = useTouch();
    var vertical = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var rootWidth = props.rootWidth,
          rootHeight = props.rootHeight;
      var rootRatio = rootHeight / rootWidth;
      return state.imageRatio > rootRatio;
    });
    var imageStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var scale = state.scale,
          moveX = state.moveX,
          moveY = state.moveY,
          moving = state.moving,
          zooming = state.zooming;
      var style = {
        transitionDuration: zooming || moving ? '0s' : '.3s'
      };

      if (scale !== 1) {
        var offsetX = moveX / scale;
        var offsetY = moveY / scale;
        style.transform = "scale(" + scale + ", " + scale + ") translate(" + offsetX + "px, " + offsetY + "px)";
      }

      return style;
    });
    var maxMoveX = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (state.imageRatio) {
        var rootWidth = props.rootWidth,
            rootHeight = props.rootHeight;
        var displayWidth = vertical.value ? rootHeight / state.imageRatio : rootWidth;
        return Math.max(0, (state.scale * displayWidth - rootWidth) / 2);
      }

      return 0;
    });
    var maxMoveY = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (state.imageRatio) {
        var rootWidth = props.rootWidth,
            rootHeight = props.rootHeight;
        var displayHeight = vertical.value ? rootHeight : rootWidth * state.imageRatio;
        return Math.max(0, (state.scale * displayHeight - rootHeight) / 2);
      }

      return 0;
    });

    var setScale = function setScale(scale) {
      scale = range(scale, +props.minZoom, +props.maxZoom);

      if (scale !== state.scale) {
        state.scale = scale;
        emit('scale', {
          scale: scale,
          index: props.active
        });
      }
    };

    var resetScale = function resetScale() {
      setScale(1);
      state.moveX = 0;
      state.moveY = 0;
    };

    var toggleScale = function toggleScale() {
      var scale = state.scale > 1 ? 1 : 2;
      setScale(scale);
      state.moveX = 0;
      state.moveY = 0;
    };

    var startMoveX;
    var startMoveY;
    var startScale;
    var startDistance;
    var doubleTapTimer;
    var touchStartTime;

    var onTouchStart = function onTouchStart(event) {
      var touches = event.touches;
      var offsetX = touch.offsetX;
      touch.start(event);
      startMoveX = state.moveX;
      startMoveY = state.moveY;
      touchStartTime = new Date();
      state.moving = touches.length === 1 && state.scale !== 1;
      state.zooming = touches.length === 2 && !offsetX.value;

      if (state.zooming) {
        startScale = state.scale;
        startDistance = getDistance(event.touches);
      }
    };

    var onTouchMove = function onTouchMove(event) {
      var touches = event.touches;
      touch.move(event);

      if (state.moving || state.zooming) {
        preventDefault(event, true);
      }

      if (state.moving) {
        var deltaX = touch.deltaX,
            deltaY = touch.deltaY;
        var moveX = deltaX.value + startMoveX;
        var moveY = deltaY.value + startMoveY;
        state.moveX = range(moveX, -maxMoveX.value, maxMoveX.value);
        state.moveY = range(moveY, -maxMoveY.value, maxMoveY.value);
      }

      if (state.zooming && touches.length === 2) {
        var distance = getDistance(touches);
        var scale = startScale * distance / startDistance;
        setScale(scale);
      }
    };

    var checkTap = function checkTap() {
      var offsetX = touch.offsetX,
          offsetY = touch.offsetY;
      var deltaTime = new Date() - touchStartTime;
      var TAP_TIME = 250;
      var TAP_OFFSET = 10;

      if (offsetX.value < TAP_OFFSET && offsetY.value < TAP_OFFSET && deltaTime < TAP_TIME) {
        if (doubleTapTimer) {
          clearTimeout(doubleTapTimer);
          doubleTapTimer = null;
          toggleScale();
        } else {
          doubleTapTimer = setTimeout(function () {
            emit('close');
            doubleTapTimer = null;
          }, TAP_TIME);
        }
      }
    };

    var onTouchEnd = function onTouchEnd(event) {
      var stopPropagation = false;
      /* istanbul ignore else */

      if (state.moving || state.zooming) {
        stopPropagation = true;

        if (state.moving && startMoveX === state.moveX && startMoveY === state.moveY) {
          stopPropagation = false;
        }

        if (!event.touches.length) {
          if (state.zooming) {
            state.moveX = range(state.moveX, -maxMoveX.value, maxMoveX.value);
            state.moveY = range(state.moveY, -maxMoveY.value, maxMoveY.value);
            state.zooming = false;
          }

          state.moving = false;
          startMoveX = 0;
          startMoveY = 0;
          startScale = 1;

          if (state.scale < 1) {
            resetScale();
          }
        }
      } // eliminate tap delay on safari


      preventDefault(event, stopPropagation);
      checkTap();
      touch.reset();
    };

    var onLoad = function onLoad(event) {
      var _event$target = event.target,
          naturalWidth = _event$target.naturalWidth,
          naturalHeight = _event$target.naturalHeight;
      state.imageRatio = naturalHeight / naturalWidth;
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.active;
    }, resetScale);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.show;
    }, function (value) {
      if (!value) {
        resetScale();
      }
    });
    return function () {
      var _slot;

      var imageSlots = {
        loading: function loading() {
          return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_loading, {
            "type": "spinner"
          }, null);
        }
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(swipe_item, {
        "class": shared_bem('swipe-item'),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, ImagePreviewItem_isSlot(_slot = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_image, {
        "src": props.src,
        "fit": "contain",
        "class": shared_bem('image', {
          vertical: vertical.value
        }),
        "style": imageStyle.value,
        "onLoad": onLoad
      }, _extends({}, imageSlots))) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      });
    };
  }
});
;// CONCATENATED MODULE: ./es/image-preview/ImagePreview.js



 // Utils


 // Composition


 // Components






function ImagePreview_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

/* harmony default export */ var ImagePreview = (shared_createComponent({
  props: {
    show: Boolean,
    className: null,
    closeable: Boolean,
    beforeClose: Function,
    showIndicators: Boolean,
    images: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    loop: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    minZoom: {
      type: [Number, String],
      default: 1 / 3
    },
    maxZoom: {
      type: [Number, String],
      default: 3
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    swipeDuration: {
      type: [Number, String],
      default: 300
    },
    startPosition: {
      type: [Number, String],
      default: 0
    },
    closeIcon: {
      type: String,
      default: 'clear'
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeIconPosition: {
      type: String,
      default: 'top-right'
    }
  },
  emits: ['scale', 'close', 'closed', 'change', 'update:show'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var swipeRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var windowSize = useWindowSize();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      active: 0,
      rootWidth: 0,
      rootHeight: 0
    });

    var resize = function resize() {
      if (swipeRef.value) {
        var rect = swipeRef.value.$el.getBoundingClientRect();
        state.rootWidth = rect.width;
        state.rootHeight = rect.height;
      }
    };

    var emitScale = function emitScale(args) {
      emit('scale', args);
    };

    var toggle = function toggle(show) {
      emit('update:show', show);
    };

    var emitClose = function emitClose() {
      callInterceptor({
        interceptor: props.beforeClose,
        args: [state.active],
        done: function done() {
          toggle(false);
        }
      });
    };

    var setActive = function setActive(active) {
      if (active !== state.active) {
        state.active = active;
        emit('change', active);
      }
    };

    var renderIndex = function renderIndex() {
      if (props.showIndex) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": shared_bem('index')
        }, [slots.index ? slots.index({
          index: state.active
        }) : state.active + 1 + " / " + props.images.length]);
      }
    };

    var renderCover = function renderCover() {
      if (slots.cover) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": shared_bem('cover')
        }, [slots.cover()]);
      }
    };

    var renderImages = function renderImages() {
      var _slot;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(swipe, {
        "ref": swipeRef,
        "lazyRender": true,
        "loop": props.loop,
        "class": shared_bem('swipe'),
        "duration": props.swipeDuration,
        "initialSwipe": props.startPosition,
        "showIndicators": props.showIndicators,
        "indicatorColor": "white",
        "onChange": setActive
      }, ImagePreview_isSlot(_slot = props.images.map(function (image) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(ImagePreviewItem, {
          "src": image,
          "show": props.show,
          "active": state.active,
          "maxZoom": props.maxZoom,
          "minZoom": props.minZoom,
          "rootWidth": state.rootWidth,
          "rootHeight": state.rootHeight,
          "onScale": emitScale,
          "onClose": emitClose
        }, null);
      })) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      });
    };

    var renderClose = function renderClose() {
      if (props.closeable) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "role": "button",
          "name": props.closeIcon,
          "class": shared_bem('close-icon', props.closeIconPosition),
          "onClick": emitClose
        }, null);
      }
    };

    var onClosed = function onClosed() {
      emit('closed');
    };

    var swipeTo = function swipeTo(index, options) {
      if (swipeRef.value) {
        swipeRef.value.swipeTo(index, options);
      }
    };

    useExpose({
      swipeTo: swipeTo
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(resize);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([windowSize.width, windowSize.height], resize);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.startPosition;
    }, setActive);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.show;
    }, function (value) {
      var images = props.images,
          startPosition = props.startPosition;

      if (value) {
        setActive(+startPosition);
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
          resize();
          swipeTo(+startPosition, {
            immediate: true
          });
        });
      } else {
        emit('close', {
          index: state.active,
          url: images[state.active]
        });
      }
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "show": props.show,
        "class": [shared_bem(), props.className],
        "overlayClass": shared_bem('overlay'),
        "closeOnPopstate": props.closeOnPopstate,
        "onClosed": onClosed
      }, {
        'onUpdate:show': toggle
      }), {
        default: function _default() {
          return [renderClose(), renderImages(), renderIndex(), renderCover()];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/image-preview/index.js





var image_preview_instance;
var defaultConfig = {
  loop: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onScale: null,
  onClose: null,
  onChange: null,
  teleport: 'body',
  className: '',
  showIndex: true,
  closeable: false,
  closeIcon: 'clear',
  beforeClose: null,
  startPosition: 0,
  swipeDuration: 300,
  showIndicators: false,
  closeOnPopstate: true,
  closeIconPosition: 'top-right'
};

function image_preview_initInstance() {
  var _mountComponent = mountComponent({
    setup: function setup() {
      var _usePopupState = usePopupState(),
          state = _usePopupState.state,
          toggle = _usePopupState.toggle;

      var onClosed = function onClosed() {
        state.images = [];
      };

      return function () {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(ImagePreview, _extends({}, state, {
          onClosed: onClosed,
          'onUpdate:show': toggle
        }), null);
      };
    }
  });

  image_preview_instance = _mountComponent.instance;
}

var image_preview_ImagePreview = function ImagePreview(images, startPosition) {
  if (startPosition === void 0) {
    startPosition = 0;
  }
  /* istanbul ignore if */


  if (!inBrowser) {
    return;
  }

  if (!image_preview_instance) {
    image_preview_initInstance();
  }

  var options = Array.isArray(images) ? {
    images: images,
    startPosition: startPosition
  } : images;
  image_preview_instance.open(_extends({}, defaultConfig, options));
  return image_preview_instance;
};

image_preview_ImagePreview.Component = ImagePreview;

image_preview_ImagePreview.install = function (app) {
  app.use(ImagePreview);
};

/* harmony default export */ var image_preview = (image_preview_ImagePreview);
;// CONCATENATED MODULE: ./es/index-bar/index.js


 // Utils

 // Composition





function index_bar_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var INDEX_BAR_KEY = 'vanIndexBar';

function genAlphabet() {
  var indexList = [];
  var charCodeOfA = 'A'.charCodeAt(0);

  for (var i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }

  return indexList;
}

var index_bar_createNamespace = createNamespace('index-bar'),
    index_bar_createComponent = index_bar_createNamespace[0],
    index_bar_bem = index_bar_createNamespace[1];

/* harmony default export */ var index_bar = (index_bar_createComponent({
  props: {
    zIndex: [Number, String],
    highlightColor: String,
    sticky: {
      type: Boolean,
      default: true
    },
    stickyOffsetTop: {
      type: Number,
      default: 0
    },
    indexList: {
      type: Array,
      default: genAlphabet
    }
  },
  emits: ['select', 'change'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var activeAnchor = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var touch = useTouch();
    var scrollParent = useScrollParent(root);

    var _useChildren = useChildren(INDEX_BAR_KEY),
        children = _useChildren.children,
        linkChildren = _useChildren.linkChildren;

    linkChildren({
      props: props
    });
    var sidebarStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (isDef(props.zIndex)) {
        return {
          zIndex: 1 + props.zIndex
        };
      }
    });
    var highlightStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (props.highlightColor) {
        return {
          color: props.highlightColor
        };
      }
    });

    var getScrollerRect = function getScrollerRect() {
      if (scrollParent.value.getBoundingClientRect) {
        return useRect(scrollParent);
      }

      return {
        top: 0,
        left: 0
      };
    };

    var getActiveAnchor = function getActiveAnchor(scrollTop, rects) {
      for (var i = children.length - 1; i >= 0; i--) {
        var prevHeight = i > 0 ? rects[i - 1].height : 0;
        var reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : 0;

        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }

      return -1;
    };

    var onScroll = function onScroll() {
      if (isHidden(root)) {
        return;
      }

      var sticky = props.sticky,
          indexList = props.indexList;
      var scrollTop = getScrollTop(scrollParent.value);
      var scrollParentRect = getScrollerRect();
      var rects = children.map(function (item) {
        return item.getRect(scrollParent.value, scrollParentRect);
      });
      var active = getActiveAnchor(scrollTop, rects);
      activeAnchor.value = indexList[active];

      if (sticky) {
        children.forEach(function (item, index) {
          var state = item.state,
              $el = item.$el;

          if (index === active || index === active - 1) {
            var rect = $el.getBoundingClientRect();
            state.left = rect.left;
            state.width = rect.width;
          } else {
            state.left = null;
            state.width = null;
          }

          if (index === active) {
            state.active = true;
            state.top = Math.max(props.stickyOffsetTop, rects[index].top - scrollTop) + scrollParentRect.top;
          } else if (index === active - 1) {
            var activeItemTop = rects[active].top - scrollTop;
            state.active = activeItemTop > 0;
            state.top = activeItemTop + scrollParentRect.top - rects[index].height;
          } else {
            state.active = false;
          }
        });
      }
    };

    useEventListener('scroll', onScroll, {
      target: scrollParent
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.indexList;
    }, function () {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(onScroll);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(activeAnchor, function (value) {
      if (value) {
        emit('change', value);
      }
    });

    var renderIndexes = function renderIndexes() {
      return props.indexList.map(function (index) {
        var active = index === activeAnchor.value;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": index_bar_bem('index', {
            active: active
          }),
          "style": active ? highlightStyle.value : null,
          "data-index": index
        }, index_bar_isSlot(index) ? index : {
          default: function _default() {
            return [index];
          }
        });
      });
    };

    var scrollTo = function scrollTo(index) {
      if (!index) {
        return;
      }

      var match = children.filter(function (item) {
        return String(item.index) === index;
      });

      if (match[0]) {
        match[0].$el.scrollIntoView();

        if (props.sticky && props.stickyOffsetTop) {
          setRootScrollTop(getRootScrollTop() - props.stickyOffsetTop);
        }

        emit('select', match[0].index);
      }
    };

    var scrollToElement = function scrollToElement(element) {
      var index = element.dataset.index;
      scrollTo(index);
    };

    var onClick = function onClick(event) {
      scrollToElement(event.target);
    };

    var touchActiveIndex;

    var onTouchMove = function onTouchMove(event) {
      touch.move(event);

      if (touch.isVertical()) {
        preventDefault(event);
        var _event$touches$ = event.touches[0],
            clientX = _event$touches$.clientX,
            clientY = _event$touches$.clientY;
        var target = document.elementFromPoint(clientX, clientY);

        if (target) {
          var index = target.dataset.index;
          /* istanbul ignore else */

          if (touchActiveIndex !== index) {
            touchActiveIndex = index;
            scrollToElement(target);
          }
        }
      }
    };

    useExpose({
      scrollTo: scrollTo
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "class": index_bar_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": index_bar_bem('sidebar'),
        "style": sidebarStyle.value,
        "onClick": onClick,
        "onTouchstart": touch.start,
        "onTouchmove": onTouchMove
      }, [renderIndexes()]), slots.default == null ? void 0 : slots.default()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/index-anchor/index.js

 // Utils




 // Composition





var index_anchor_createNamespace = createNamespace('index-anchor'),
    index_anchor_createComponent = index_anchor_createNamespace[0],
    index_anchor_bem = index_anchor_createNamespace[1];

/* harmony default export */ var index_anchor = (index_anchor_createComponent({
  props: {
    index: [Number, String]
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      top: 0,
      left: null,
      rect: {
        top: 0,
        height: 0
      },
      width: null,
      active: false
    });
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var _useParent = useParent(INDEX_BAR_KEY),
        parent = _useParent.parent;

    var isSticky = function isSticky() {
      return state.active && parent.props.sticky;
    };

    var anchorStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var _parent$props = parent.props,
          zIndex = _parent$props.zIndex,
          highlightColor = _parent$props.highlightColor;

      if (isSticky()) {
        return {
          zIndex: "" + zIndex,
          left: state.left ? state.left + "px" : null,
          width: state.width ? state.width + "px" : null,
          transform: state.top ? "translate3d(0, " + state.top + "px, 0)" : null,
          color: highlightColor
        };
      }
    });

    var getRect = function getRect(scrollParent, scrollParentRect) {
      var rootRect = useRect(root);
      state.rect.height = rootRect.height;

      if (scrollParent === window || scrollParent === document.body) {
        state.rect.top = rootRect.top + getRootScrollTop();
      } else {
        state.rect.top = rootRect.top + getScrollTop(scrollParent) - scrollParentRect.top;
      }

      return state.rect;
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
      state.rect.height = useHeight(root);
    });
    useExpose({
      state: state,
      getRect: getRect
    });
    return function () {
      var _ref2;

      var sticky = isSticky();
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "style": {
          height: sticky ? state.rect.height + "px" : null
        }
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "style": anchorStyle.value,
        "class": [index_anchor_bem({
          sticky: sticky
        }), (_ref2 = {}, _ref2[BORDER_BOTTOM] = sticky, _ref2)]
      }, [slots.default ? slots.default() : props.index])]);
    };
  }
}));
;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/util.js
var util_inBrowser = typeof window !== 'undefined' && window !== null;

function checkIntersectionObserver() {
  if (util_inBrowser && 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get: function get() {
          return this.intersectionRatio > 0;
        }
      });
    }

    return true;
  }

  return false;
}

var hasIntersectionObserver = checkIntersectionObserver();
var modeType = {
  event: 'event',
  observer: 'observer'
}; // CustomEvent polyfill

var CustomEvent = function () {
  if (!util_inBrowser) return;
  if (typeof window.CustomEvent === 'function') return window.CustomEvent;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  return CustomEvent;
}();

function util_remove(arr, item) {
  if (!arr.length) return;
  var index = arr.indexOf(item);
  if (index > -1) return arr.splice(index, 1);
}

function some(arr, fn) {
  var has = false;

  for (var i = 0, len = arr.length; i < len; i++) {
    if (fn(arr[i])) {
      has = true;
      break;
    }
  }

  return has;
}

function getBestSelectionFromSrcset(el, scale) {
  if (el.tagName !== 'IMG' || !el.getAttribute('data-srcset')) return;
  var options = el.getAttribute('data-srcset');
  [];
  var container = el.parentNode;
  var containerWidth = container.offsetWidth * scale;
  var spaceIndex;
  var tmpSrc;
  var tmpWidth;
  options = options.trim().split(',');
  var result = options.map(function (item) {
    item = item.trim();
    spaceIndex = item.lastIndexOf(' ');

    if (spaceIndex === -1) {
      tmpSrc = item;
      tmpWidth = 999998;
    } else {
      tmpSrc = item.substr(0, spaceIndex);
      tmpWidth = parseInt(item.substr(spaceIndex + 1, item.length - spaceIndex - 2), 10);
    }

    return [tmpWidth, tmpSrc];
  });
  result.sort(function (a, b) {
    if (a[0] < b[0]) {
      return 1;
    }

    if (a[0] > b[0]) {
      return -1;
    }

    if (a[0] === b[0]) {
      if (b[1].indexOf('.webp', b[1].length - 5) !== -1) {
        return 1;
      }

      if (a[1].indexOf('.webp', a[1].length - 5) !== -1) {
        return -1;
      }
    }

    return 0;
  });
  var bestSelectedSrc = '';
  var tmpOption;

  for (var i = 0; i < result.length; i++) {
    tmpOption = result[i];
    bestSelectedSrc = tmpOption[1];
    var next = result[i + 1];

    if (next && next[0] < containerWidth) {
      bestSelectedSrc = tmpOption[1];
      break;
    } else if (!next) {
      bestSelectedSrc = tmpOption[1];
      break;
    }
  }

  return bestSelectedSrc;
}

function find(arr, fn) {
  var item;

  for (var i = 0, len = arr.length; i < len; i++) {
    if (fn(arr[i])) {
      item = arr[i];
      break;
    }
  }

  return item;
}

var getDPR = function getDPR(scale) {
  if (scale === void 0) {
    scale = 1;
  }

  return util_inBrowser ? window.devicePixelRatio || scale : scale;
};

function supportWebp() {
  if (!util_inBrowser) return false;
  var support = true;

  try {
    var elem = document.createElement('canvas');

    if (elem.getContext && elem.getContext('2d')) {
      support = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
  } catch (err) {
    support = false;
  }

  return support;
}

function throttle(action, delay) {
  var timeout = null;
  var lastRun = 0;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timeout) {
      return;
    }

    var elapsed = Date.now() - lastRun;

    var runCallback = function runCallback() {
      lastRun = Date.now();
      timeout = false;
      action.apply(_this, args);
    };

    if (elapsed >= delay) {
      runCallback();
    } else {
      timeout = setTimeout(runCallback, delay);
    }
  };
}

function testSupportsPassive() {
  if (!util_inBrowser) return;
  var support = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get: function get() {
        support = true;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {//
  }

  return support;
}

var util_supportsPassive = testSupportsPassive();
var _ = {
  on: function on(el, type, func, capture) {
    if (capture === void 0) {
      capture = false;
    }

    if (util_supportsPassive) {
      el.addEventListener(type, func, {
        capture: capture,
        passive: true
      });
    } else {
      el.addEventListener(type, func, capture);
    }
  },
  off: function off(el, type, func, capture) {
    if (capture === void 0) {
      capture = false;
    }

    el.removeEventListener(type, func, capture);
  }
};

var loadImageAsync = function loadImageAsync(item, resolve, reject) {
  var image = new Image();

  if (!item || !item.src) {
    var err = new Error('image src is required');
    return reject(err);
  }

  image.src = item.src;

  if (item.cors) {
    image.crossOrigin = item.cors;
  }

  image.onload = function () {
    resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: image.src
    });
  };

  image.onerror = function (e) {
    reject(e);
  };
};

var style = function style(el, prop) {
  return typeof getComputedStyle !== 'undefined' ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop];
};

var overflow = function overflow(el) {
  return style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x');
};

var scrollParent = function scrollParent(el) {
  if (!util_inBrowser) return;

  if (!(el instanceof HTMLElement)) {
    return window;
  }

  var parent = el;

  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break;
    }

    if (!parent.parentNode) {
      break;
    }

    if (/(scroll|auto)/.test(overflow(parent))) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return window;
};

function util_isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function ArrayFrom(arrLike) {
  var len = arrLike.length;
  var list = [];

  for (var i = 0; i < len; i++) {
    list.push(arrLike[i]);
  }

  return list;
}

function util_noop() {}

var ImageCache = /*#__PURE__*/function () {
  function ImageCache(_ref) {
    var max = _ref.max;
    this.options = {
      max: max || 100
    };
    this._caches = [];
  }

  var _proto = ImageCache.prototype;

  _proto.has = function has(key) {
    return this._caches.indexOf(key) > -1;
  };

  _proto.add = function add(key) {
    if (this.has(key)) return;

    this._caches.push(key);

    if (this._caches.length > this.options.max) {
      this.free();
    }
  };

  _proto.free = function free() {
    this._caches.shift();
  };

  return ImageCache;
}();


;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/listener.js
 // el: {
//     state,
//     src,
//     error,
//     loading
// }

var ReactiveListener = /*#__PURE__*/function () {
  function ReactiveListener(_ref) {
    var el = _ref.el,
        src = _ref.src,
        error = _ref.error,
        loading = _ref.loading,
        bindType = _ref.bindType,
        $parent = _ref.$parent,
        options = _ref.options,
        cors = _ref.cors,
        elRenderer = _ref.elRenderer,
        imageCache = _ref.imageCache;
    this.el = el;
    this.src = src;
    this.error = error;
    this.loading = loading;
    this.bindType = bindType;
    this.attempt = 0;
    this.cors = cors;
    this.naturalHeight = 0;
    this.naturalWidth = 0;
    this.options = options;
    this.rect = null;
    this.$parent = $parent;
    this.elRenderer = elRenderer;
    this._imageCache = imageCache;
    this.performanceData = {
      init: Date.now(),
      loadStart: 0,
      loadEnd: 0
    };
    this.filter();
    this.initState();
    this.render('loading', false);
  }
  /*
   * init listener state
   * @return
   */


  var _proto = ReactiveListener.prototype;

  _proto.initState = function initState() {
    if ('dataset' in this.el) {
      this.el.dataset.src = this.src;
    } else {
      this.el.setAttribute('data-src', this.src);
    }

    this.state = {
      loading: false,
      error: false,
      loaded: false,
      rendered: false
    };
  }
  /*
   * record performance
   * @return
   */
  ;

  _proto.record = function record(event) {
    this.performanceData[event] = Date.now();
  }
  /*
   * update image listener data
   * @param  {String} image uri
   * @param  {String} loading image uri
   * @param  {String} error image uri
   * @return
   */
  ;

  _proto.update = function update(_ref2) {
    var src = _ref2.src,
        loading = _ref2.loading,
        error = _ref2.error;
    var oldSrc = this.src;
    this.src = src;
    this.loading = loading;
    this.error = error;
    this.filter();

    if (oldSrc !== this.src) {
      this.attempt = 0;
      this.initState();
    }
  }
  /*
   * get el node rect
   * @return
   */
  ;

  _proto.getRect = function getRect() {
    this.rect = this.el.getBoundingClientRect();
  }
  /*
   *  check el is in view
   * @return {Boolean} el is in view
   */
  ;

  _proto.checkInView = function checkInView() {
    this.getRect();
    return this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0;
  }
  /*
   * listener filter
   */
  ;

  _proto.filter = function filter() {
    var _this = this;

    Object.keys(this.options.filter).forEach(function (key) {
      _this.options.filter[key](_this, _this.options);
    });
  }
  /*
   * render loading first
   * @params cb:Function
   * @return
   */
  ;

  _proto.renderLoading = function renderLoading(cb) {
    var _this2 = this;

    this.state.loading = true;
    loadImageAsync({
      src: this.loading,
      cors: this.cors
    }, function () {
      _this2.render('loading', false);

      _this2.state.loading = false;
      cb();
    }, function () {
      // handler `loading image` load failed
      cb();
      _this2.state.loading = false;
      if (!_this2.options.silent) console.warn("VueLazyload log: load failed with loading image(" + _this2.loading + ")");
    });
  }
  /*
   * try load image and  render it
   * @return
   */
  ;

  _proto.load = function load(onFinish) {
    var _this3 = this;

    if (onFinish === void 0) {
      onFinish = util_noop;
    }

    if (this.attempt > this.options.attempt - 1 && this.state.error) {
      if (!this.options.silent) console.log("VueLazyload log: " + this.src + " tried too more than " + this.options.attempt + " times");
      onFinish();
      return;
    }

    if (this.state.rendered && this.state.loaded) return;

    if (this._imageCache.has(this.src)) {
      this.state.loaded = true;
      this.render('loaded', true);
      this.state.rendered = true;
      return onFinish();
    }

    this.renderLoading(function () {
      _this3.attempt++;
      _this3.options.adapter.beforeLoad == null ? void 0 : _this3.options.adapter.beforeLoad(_this3, _this3.options);

      _this3.record('loadStart');

      loadImageAsync({
        src: _this3.src,
        cors: _this3.cors
      }, function (data) {
        _this3.naturalHeight = data.naturalHeight;
        _this3.naturalWidth = data.naturalWidth;
        _this3.state.loaded = true;
        _this3.state.error = false;

        _this3.record('loadEnd');

        _this3.render('loaded', false);

        _this3.state.rendered = true;

        _this3._imageCache.add(_this3.src);

        onFinish();
      }, function (err) {
        !_this3.options.silent && console.error(err);
        _this3.state.error = true;
        _this3.state.loaded = false;

        _this3.render('error', false);
      });
    });
  }
  /*
   * render image
   * @param  {String} state to render // ['loading', 'src', 'error']
   * @param  {String} is form cache
   * @return
   */
  ;

  _proto.render = function render(state, cache) {
    this.elRenderer(this, state, cache);
  }
  /*
   * output performance data
   * @return {Object} performance data
   */
  ;

  _proto.performance = function performance() {
    var state = 'loading';
    var time = 0;

    if (this.state.loaded) {
      state = 'loaded';
      time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1000;
    }

    if (this.state.error) state = 'error';
    return {
      src: this.src,
      state: state,
      time: time
    };
  }
  /*
   * $destroy
   * @return
   */
  ;

  _proto.$destroy = function $destroy() {
    this.el = null;
    this.src = null;
    this.error = null;
    this.loading = null;
    this.bindType = null;
    this.attempt = 0;
  };

  return ReactiveListener;
}();


;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/lazy.js




var DEFAULT_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
var DEFAULT_EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'];
var DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: '0px',
  threshold: 0
};
/* harmony default export */ function esm_lazy() {
  return /*#__PURE__*/function () {
    function Lazy(_ref) {
      var preLoad = _ref.preLoad,
          error = _ref.error,
          throttleWait = _ref.throttleWait,
          preLoadTop = _ref.preLoadTop,
          dispatchEvent = _ref.dispatchEvent,
          loading = _ref.loading,
          attempt = _ref.attempt,
          _ref$silent = _ref.silent,
          silent = _ref$silent === void 0 ? true : _ref$silent,
          scale = _ref.scale,
          listenEvents = _ref.listenEvents,
          filter = _ref.filter,
          adapter = _ref.adapter,
          observer = _ref.observer,
          observerOptions = _ref.observerOptions;
      this.version = '__VUE_LAZYLOAD_VERSION__';
      this.mode = modeType.event;
      this.ListenerQueue = [];
      this.TargetIndex = 0;
      this.TargetQueue = [];
      this.options = {
        silent: silent,
        dispatchEvent: !!dispatchEvent,
        throttleWait: throttleWait || 200,
        preLoad: preLoad || 1.3,
        preLoadTop: preLoadTop || 0,
        error: error || DEFAULT_URL,
        loading: loading || DEFAULT_URL,
        attempt: attempt || 3,
        scale: scale || getDPR(scale),
        ListenEvents: listenEvents || DEFAULT_EVENTS,
        hasbind: false,
        supportWebp: supportWebp(),
        filter: filter || {},
        adapter: adapter || {},
        observer: !!observer,
        observerOptions: observerOptions || DEFAULT_OBSERVER_OPTIONS
      };

      this._initEvent();

      this._imageCache = new ImageCache({
        max: 200
      });
      this.lazyLoadHandler = throttle(this._lazyLoadHandler.bind(this), this.options.throttleWait);
      this.setMode(this.options.observer ? modeType.observer : modeType.event);
    }
    /**
     * update config
     * @param  {Object} config params
     * @return
     */


    var _proto = Lazy.prototype;

    _proto.config = function config(options) {
      if (options === void 0) {
        options = {};
      }

      this.options = _extends({}, this.options, {
        options: options
      });
    }
    /**
     * output listener's load performance
     * @return {Array}
     */
    ;

    _proto.performance = function performance() {
      return this.ListenerQueue.map(function (item) {
        return item.performance();
      });
    }
    /*
     * add lazy component to queue
     * @param  {Vue} vm lazy component instance
     * @return
     */
    ;

    _proto.addLazyBox = function addLazyBox(vm) {
      this.ListenerQueue.push(vm);

      if (util_inBrowser) {
        this._addListenerTarget(window);

        this._observer && this._observer.observe(vm.el);

        if (vm.$el && vm.$el.parentNode) {
          this._addListenerTarget(vm.$el.parentNode);
        }
      }
    }
    /*
     * add image listener to queue
     * @param  {DOM} el
     * @param  {object} binding vue directive binding
     * @param  {vnode} vnode vue directive vnode
     * @return
     */
    ;

    _proto.add = function add(el, binding, vnode) {
      var _this = this;

      if (some(this.ListenerQueue, function (item) {
        return item.el === el;
      })) {
        this.update(el, binding);
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(this.lazyLoadHandler);
      }

      var value = this._valueFormatter(binding.value);

      var src = value.src;
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        src = getBestSelectionFromSrcset(el, _this.options.scale) || src;
        _this._observer && _this._observer.observe(el);
        var container = Object.keys(binding.modifiers)[0];
        var $parent;

        if (container) {
          $parent = vnode.context.$refs[container]; // if there is container passed in, try ref first, then fallback to getElementById to support the original usage

          $parent = $parent ? $parent.$el || $parent : document.getElementById(container);
        }

        if (!$parent) {
          $parent = scrollParent(el);
        }

        var newListener = new ReactiveListener({
          bindType: binding.arg,
          $parent: $parent,
          el: el,
          src: src,
          loading: value.loading,
          error: value.error,
          cors: value.cors,
          elRenderer: _this._elRenderer.bind(_this),
          options: _this.options,
          imageCache: _this._imageCache
        });

        _this.ListenerQueue.push(newListener);

        if (util_inBrowser) {
          _this._addListenerTarget(window);

          _this._addListenerTarget($parent);
        }

        _this.lazyLoadHandler();

        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
          return _this.lazyLoadHandler();
        });
      });
    }
    /**
     * update image src
     * @param  {DOM} el
     * @param  {object} vue directive binding
     * @return
     */
    ;

    _proto.update = function update(el, binding, vnode) {
      var _this2 = this;

      var value = this._valueFormatter(binding.value);

      var src = value.src;
      src = getBestSelectionFromSrcset(el, this.options.scale) || src;
      var exist = find(this.ListenerQueue, function (item) {
        return item.el === el;
      });

      if (!exist) {
        this.add(el, binding, vnode);
      } else {
        exist.update({
          src: src,
          error: value.error,
          loading: value.loading
        });
      }

      if (this._observer) {
        this._observer.unobserve(el);

        this._observer.observe(el);
      }

      this.lazyLoadHandler();
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        return _this2.lazyLoadHandler();
      });
    }
    /**
     * remove listener form list
     * @param  {DOM} el
     * @return
     */
    ;

    _proto.remove = function remove(el) {
      if (!el) return;
      this._observer && this._observer.unobserve(el);
      var existItem = find(this.ListenerQueue, function (item) {
        return item.el === el;
      });

      if (existItem) {
        this._removeListenerTarget(existItem.$parent);

        this._removeListenerTarget(window);

        util_remove(this.ListenerQueue, existItem);

        existItem.$destroy();
      }
    }
    /*
     * remove lazy components form list
     * @param  {Vue} vm Vue instance
     * @return
     */
    ;

    _proto.removeComponent = function removeComponent(vm) {
      if (!vm) return;

      util_remove(this.ListenerQueue, vm);

      this._observer && this._observer.unobserve(vm.el);

      if (vm.$parent && vm.$el.parentNode) {
        this._removeListenerTarget(vm.$el.parentNode);
      }

      this._removeListenerTarget(window);
    };

    _proto.setMode = function setMode(mode) {
      var _this3 = this;

      if (!hasIntersectionObserver && mode === modeType.observer) {
        mode = modeType.event;
      }

      this.mode = mode; // event or observer

      if (mode === modeType.event) {
        if (this._observer) {
          this.ListenerQueue.forEach(function (listener) {
            _this3._observer.unobserve(listener.el);
          });
          this._observer = null;
        }

        this.TargetQueue.forEach(function (target) {
          _this3._initListen(target.el, true);
        });
      } else {
        this.TargetQueue.forEach(function (target) {
          _this3._initListen(target.el, false);
        });

        this._initIntersectionObserver();
      }
    }
    /*
     *** Private functions ***
     */

    /*
     * add listener target
     * @param  {DOM} el listener target
     * @return
     */
    ;

    _proto._addListenerTarget = function _addListenerTarget(el) {
      if (!el) return;
      var target = find(this.TargetQueue, function (target) {
        return target.el === el;
      });

      if (!target) {
        target = {
          el: el,
          id: ++this.TargetIndex,
          childrenCount: 1,
          listened: true
        };
        this.mode === modeType.event && this._initListen(target.el, true);
        this.TargetQueue.push(target);
      } else {
        target.childrenCount++;
      }

      return this.TargetIndex;
    }
    /*
     * remove listener target or reduce target childrenCount
     * @param  {DOM} el or window
     * @return
     */
    ;

    _proto._removeListenerTarget = function _removeListenerTarget(el) {
      var _this4 = this;

      this.TargetQueue.forEach(function (target, index) {
        if (target.el === el) {
          target.childrenCount--;

          if (!target.childrenCount) {
            _this4._initListen(target.el, false);

            _this4.TargetQueue.splice(index, 1);

            target = null;
          }
        }
      });
    }
    /*
     * add or remove eventlistener
     * @param  {DOM} el DOM or Window
     * @param  {boolean} start flag
     * @return
     */
    ;

    _proto._initListen = function _initListen(el, start) {
      var _this5 = this;

      this.options.ListenEvents.forEach(function (evt) {
        return _[start ? 'on' : 'off'](el, evt, _this5.lazyLoadHandler);
      });
    };

    _proto._initEvent = function _initEvent() {
      var _this6 = this;

      this.Event = {
        listeners: {
          loading: [],
          loaded: [],
          error: []
        }
      };

      this.$on = function (event, func) {
        if (!_this6.Event.listeners[event]) _this6.Event.listeners[event] = [];

        _this6.Event.listeners[event].push(func);
      };

      this.$once = function (event, func) {
        var on = function on() {
          _this6.$off(event, on);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          func.apply(_this6, args);
        };

        _this6.$on(event, on);
      };

      this.$off = function (event, func) {
        if (!func) {
          if (!_this6.Event.listeners[event]) return;
          _this6.Event.listeners[event].length = 0;
          return;
        }

        util_remove(_this6.Event.listeners[event], func);
      };

      this.$emit = function (event, context, inCache) {
        if (!_this6.Event.listeners[event]) return;

        _this6.Event.listeners[event].forEach(function (func) {
          return func(context, inCache);
        });
      };
    }
    /**
     * find nodes which in viewport and trigger load
     * @return
     */
    ;

    _proto._lazyLoadHandler = function _lazyLoadHandler() {
      var _this7 = this;

      var freeList = [];
      this.ListenerQueue.forEach(function (listener) {
        if (!listener.el || !listener.el.parentNode) {
          freeList.push(listener);
        }

        var catIn = listener.checkInView();
        if (!catIn) return;
        listener.load();
      });
      freeList.forEach(function (item) {
        util_remove(_this7.ListenerQueue, item);

        item.$destroy();
      });
    }
    /**
     * init IntersectionObserver
     * set mode to observer
     * @return
     */
    ;

    _proto._initIntersectionObserver = function _initIntersectionObserver() {
      var _this8 = this;

      if (!hasIntersectionObserver) {
        return;
      }

      this._observer = new IntersectionObserver(this._observerHandler.bind(this), this.options.observerOptions);

      if (this.ListenerQueue.length) {
        this.ListenerQueue.forEach(function (listener) {
          _this8._observer.observe(listener.el);
        });
      }
    }
    /**
     * init IntersectionObserver
     * @return
     */
    ;

    _proto._observerHandler = function _observerHandler(entries) {
      var _this9 = this;

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          _this9.ListenerQueue.forEach(function (listener) {
            if (listener.el === entry.target) {
              if (listener.state.loaded) return _this9._observer.unobserve(listener.el);
              listener.load();
            }
          });
        }
      });
    }
    /**
     * set element attribute with image'url and state
     * @param  {object} lazyload listener object
     * @param  {string} state will be rendered
     * @param  {bool} inCache  is rendered from cache
     * @return
     */
    ;

    _proto._elRenderer = function _elRenderer(listener, state, cache) {
      if (!listener.el) return;
      var el = listener.el,
          bindType = listener.bindType;
      var src;

      switch (state) {
        case 'loading':
          src = listener.loading;
          break;

        case 'error':
          src = listener.error;
          break;

        default:
          src = listener.src;
          break;
      }

      if (bindType) {
        el.style[bindType] = 'url("' + src + '")';
      } else if (el.getAttribute('src') !== src) {
        el.setAttribute('src', src);
      }

      el.setAttribute('lazy', state);
      this.$emit(state, listener, cache);
      this.options.adapter[state] && this.options.adapter[state](listener, this.options);

      if (this.options.dispatchEvent) {
        var event = new CustomEvent(state, {
          detail: listener
        });
        el.dispatchEvent(event);
      }
    }
    /**
     * generate loading loaded error image url
     * @param {string} image's src
     * @return {object} image's loading, loaded, error url
     */
    ;

    _proto._valueFormatter = function _valueFormatter(value) {
      var src = value;
      var _this$options = this.options,
          loading = _this$options.loading,
          error = _this$options.error; // value is object

      if (util_isObject(value)) {
        if (!value.src && !this.options.silent) console.error('Vue Lazyload warning: miss src with ' + value);
        src = value.src;
        loading = value.loading || this.options.loading;
        error = value.error || this.options.error;
      }

      return {
        src: src,
        loading: loading,
        error: error
      };
    };

    return Lazy;
  }();
}
;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/lazy-component.js


/* harmony default export */ var lazy_component = (function (lazy) {
  return {
    props: {
      tag: {
        type: String,
        default: 'div'
      }
    },
    emits: ['show'],
    render: function render() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.h)(this.tag, this.show && this.$slots.default ? this.$slots.default() : null);
    },
    data: function data() {
      return {
        el: null,
        state: {
          loaded: false
        },
        rect: {},
        show: false
      };
    },
    mounted: function mounted() {
      this.el = this.$el;
      lazy.addLazyBox(this);
      lazy.lazyLoadHandler();
    },
    beforeUnmount: function beforeUnmount() {
      lazy.removeComponent(this);
    },
    methods: {
      getRect: function getRect() {
        this.rect = this.$el.getBoundingClientRect();
      },
      checkInView: function checkInView() {
        this.getRect();
        return util_inBrowser && this.rect.top < window.innerHeight * lazy.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazy.options.preLoad && this.rect.right > 0;
      },
      load: function load() {
        this.show = true;
        this.state.loaded = true;
        this.$emit('show', this);
      },
      destroy: function destroy() {
        return this.$destroy;
      }
    }
  };
});
;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/lazy-container.js


/* eslint-disable max-classes-per-file */

var lazy_container_defaultOptions = {
  selector: 'img'
};

var LazyContainer = /*#__PURE__*/function () {
  function LazyContainer(_ref) {
    var el = _ref.el,
        binding = _ref.binding,
        vnode = _ref.vnode,
        lazy = _ref.lazy;
    this.el = null;
    this.vnode = vnode;
    this.binding = binding;
    this.options = {};
    this.lazy = lazy;
    this._queue = [];
    this.update({
      el: el,
      binding: binding
    });
  }

  var _proto = LazyContainer.prototype;

  _proto.update = function update(_ref2) {
    var _this = this;

    var el = _ref2.el,
        binding = _ref2.binding;
    this.el = el;
    this.options = _extends({}, lazy_container_defaultOptions, binding.value);
    var imgs = this.getImgs();
    imgs.forEach(function (el) {
      _this.lazy.add(el, _extends({}, _this.binding, {
        value: {
          src: 'dataset' in el ? el.dataset.src : el.getAttribute('data-src'),
          error: ('dataset' in el ? el.dataset.error : el.getAttribute('data-error')) || _this.options.error,
          loading: ('dataset' in el ? el.dataset.loading : el.getAttribute('data-loading')) || _this.options.loading
        }
      }), _this.vnode);
    });
  };

  _proto.getImgs = function getImgs() {
    return ArrayFrom(this.el.querySelectorAll(this.options.selector));
  };

  _proto.clear = function clear() {
    var _this2 = this;

    var imgs = this.getImgs();
    imgs.forEach(function (el) {
      return _this2.lazy.remove(el);
    });
    this.vnode = null;
    this.binding = null;
    this.lazy = null;
  };

  return LazyContainer;
}();

var LazyContainerMananger = /*#__PURE__*/function () {
  function LazyContainerMananger(_ref3) {
    var lazy = _ref3.lazy;
    this.lazy = lazy;
    lazy.lazyContainerMananger = this;
    this._queue = [];
  }

  var _proto2 = LazyContainerMananger.prototype;

  _proto2.bind = function bind(el, binding, vnode) {
    var container = new LazyContainer({
      el: el,
      binding: binding,
      vnode: vnode,
      lazy: this.lazy
    });

    this._queue.push(container);
  };

  _proto2.update = function update(el, binding, vnode) {
    var container = find(this._queue, function (item) {
      return item.el === el;
    });
    if (!container) return;
    container.update({
      el: el,
      binding: binding,
      vnode: vnode
    });
  };

  _proto2.unbind = function unbind(el) {
    var container = find(this._queue, function (item) {
      return item.el === el;
    });
    if (!container) return;
    container.clear();
    util_remove(this._queue, container);
  };

  return LazyContainerMananger;
}();


;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/lazy-image.js

/* harmony default export */ var lazy_image = (function (lazyManager) {
  return {
    props: {
      src: [String, Object],
      tag: {
        type: String,
        default: 'img'
      }
    },
    render: function render(h) {
      return h(this.tag, {
        attrs: {
          src: this.renderSrc
        }
      }, this.$slots.default);
    },
    data: function data() {
      return {
        el: null,
        options: {
          src: '',
          error: '',
          loading: '',
          attempt: lazyManager.options.attempt
        },
        state: {
          loaded: false,
          error: false,
          attempt: 0
        },
        rect: {},
        renderSrc: ''
      };
    },
    watch: {
      src: function src() {
        this.init();
        lazyManager.addLazyBox(this);
        lazyManager.lazyLoadHandler();
      }
    },
    created: function created() {
      this.init();
      this.renderSrc = this.options.loading;
    },
    mounted: function mounted() {
      this.el = this.$el;
      lazyManager.addLazyBox(this);
      lazyManager.lazyLoadHandler();
    },
    beforeUnmount: function beforeUnmount() {
      lazyManager.removeComponent(this);
    },
    methods: {
      init: function init() {
        var _lazyManager$_valueFo = lazyManager._valueFormatter(this.src),
            src = _lazyManager$_valueFo.src,
            loading = _lazyManager$_valueFo.loading,
            error = _lazyManager$_valueFo.error;

        this.state.loaded = false;
        this.options.src = src;
        this.options.error = error;
        this.options.loading = loading;
        this.renderSrc = this.options.loading;
      },
      getRect: function getRect() {
        this.rect = this.$el.getBoundingClientRect();
      },
      checkInView: function checkInView() {
        this.getRect();
        return util_inBrowser && this.rect.top < window.innerHeight * lazyManager.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazyManager.options.preLoad && this.rect.right > 0;
      },
      load: function load(onFinish) {
        var _this = this;

        if (onFinish === void 0) {
          onFinish = util_noop;
        }

        if (this.state.attempt > this.options.attempt - 1 && this.state.error) {
          if (!lazyManager.options.silent) console.log("VueLazyload log: " + this.options.src + " tried too more than " + this.options.attempt + " times");
          onFinish();
          return;
        }

        var src = this.options.src;
        loadImageAsync({
          src: src
        }, function (_ref) {
          var src = _ref.src;
          _this.renderSrc = src;
          _this.state.loaded = true;
        }, function () {
          _this.state.attempt++;
          _this.renderSrc = _this.options.error;
          _this.state.error = true;
        });
      }
    }
  };
});
;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/index.js




var Lazyload = {
  /*
   * install function
   * @param  {App} app
   * @param  {object} options lazyload options
   */
  install: function install(app, options) {
    if (options === void 0) {
      options = {};
    }

    var LazyClass = esm_lazy();
    var lazy = new LazyClass(options);
    var lazyContainer = new LazyContainerMananger({
      lazy: lazy
    });
    app.config.globalProperties.$Lazyload = lazy;

    if (options.lazyComponent) {
      app.component('LazyComponent', lazy_component(lazy));
    }

    if (options.lazyImage) {
      app.component('LazyImage', lazy_image(lazy));
    }

    app.directive('lazy', {
      beforeMount: lazy.add.bind(lazy),
      updated: lazy.update.bind(lazy),
      unmounted: lazy.remove.bind(lazy)
    });
    app.directive('lazy-container', {
      beforeMount: lazyContainer.bind.bind(lazyContainer),
      updated: lazyContainer.update.bind(lazyContainer),
      unmounted: lazyContainer.unbind.bind(lazyContainer)
    });
  }
};
;// CONCATENATED MODULE: ./es/lazyload/index.js

/* harmony default export */ var lazyload = (Lazyload);
;// CONCATENATED MODULE: ./es/list/index.js


 // Utils

 // Composition


 // Components



function list_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var list_createNamespace = createNamespace('list'),
    list_createComponent = list_createNamespace[0],
    list_bem = list_createNamespace[1],
    list_t = list_createNamespace[2];

/* harmony default export */ var list = (list_createComponent({
  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: String,
    finishedText: String,
    offset: {
      type: [Number, String],
      default: 300
    },
    direction: {
      type: String,
      default: 'down'
    },
    immediateCheck: {
      type: Boolean,
      default: true
    }
  },
  emits: ['load', 'update:error', 'update:loading'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots; // use sync innerLoading state to avoid repeated loading in some edge cases

    var loading = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(false);
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var placeholder = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var scrollParent = useScrollParent(root);

    var check = function check() {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        if (loading.value || props.finished || props.error) {
          return;
        }

        var offset = props.offset,
            direction = props.direction;
        var scrollParentRect = useRect(scrollParent);

        if (!scrollParentRect.height || isHidden(root)) {
          return false;
        }

        var isReachEdge = false;
        var placeholderRect = useRect(placeholder);

        if (direction === 'up') {
          isReachEdge = scrollParentRect.top - placeholderRect.top <= offset;
        } else {
          isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset;
        }

        if (isReachEdge) {
          loading.value = true;
          emit('update:loading', true);
          emit('load');
        }
      });
    };

    var renderFinishedText = function renderFinishedText() {
      if (props.finished) {
        var text = slots.finished ? slots.finished() : props.finishedText;

        if (text) {
          return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
            "class": list_bem('finished-text')
          }, list_isSlot(text) ? text : {
            default: function _default() {
              return [text];
            }
          });
        }
      }
    };

    var clickErrorText = function clickErrorText() {
      emit('update:error', false);
      check();
    };

    var renderErrorText = function renderErrorText() {
      if (props.error) {
        var text = slots.error ? slots.error() : props.errorText;

        if (text) {
          return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
            "class": list_bem('error-text'),
            "onClick": clickErrorText
          }, list_isSlot(text) ? text : {
            default: function _default() {
              return [text];
            }
          });
        }
      }
    };

    var renderLoading = function renderLoading() {
      if (loading.value && !props.finished) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": list_bem('loading')
        }, [slots.loading ? slots.loading() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_loading, {
          "size": 16
        }, {
          default: function _default() {
            return [props.loadingText || list_t('loading')];
          }
        })]);
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([function () {
      return props.loading;
    }, function () {
      return props.finished;
    }, function () {
      return props.error;
    }], check);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onUpdated)(function () {
      loading.value = props.loading;
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(function () {
      if (props.immediateCheck) {
        check();
      }
    });
    useExpose({
      check: check
    });
    useEventListener('scroll', check, {
      target: scrollParent
    });
    return function () {
      var Content = slots.default == null ? void 0 : slots.default();

      var Placeholder = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": placeholder,
        "class": list_bem('placeholder')
      }, null);

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "role": "feed",
        "class": list_bem(),
        "aria-busy": loading.value
      }, [props.direction === 'down' ? Content : Placeholder, renderLoading(), renderFinishedText(), renderErrorText(), props.direction === 'up' ? Content : Placeholder]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/composables/use-placeholder.js


function usePlaceholder(contentRef, bem) {
  var height = useHeight(contentRef);
  return function (renderContent) {
    return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": bem('placeholder'),
      "style": {
        height: height.value ? height.value + "px" : undefined
      }
    }, [renderContent()]);
  };
}
;// CONCATENATED MODULE: ./es/nav-bar/index.js

 // Utils


 // Composition

 // Components



var nav_bar_createNamespace = createNamespace('nav-bar'),
    nav_bar_createComponent = nav_bar_createNamespace[0],
    nav_bar_bem = nav_bar_createNamespace[1];

/* harmony default export */ var nav_bar = (nav_bar_createComponent({
  props: {
    title: String,
    fixed: Boolean,
    zIndex: [Number, String],
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    placeholder: Boolean,
    safeAreaInsetTop: Boolean,
    border: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click-left', 'click-right'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var navBarRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var renderPlaceholder = usePlaceholder(navBarRef, nav_bar_bem);

    var onClickLeft = function onClickLeft(event) {
      emit('click-left', event);
    };

    var onClickRight = function onClickRight(event) {
      emit('click-right', event);
    };

    var renderLeft = function renderLeft() {
      if (slots.left) {
        return slots.left();
      }

      return [props.leftArrow && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "class": nav_bar_bem('arrow'),
        "name": "arrow-left"
      }, null), props.leftText && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": nav_bar_bem('text')
      }, [props.leftText])];
    };

    var renderRight = function renderRight() {
      if (slots.right) {
        return slots.right();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": nav_bar_bem('text')
      }, [props.rightText]);
    };

    var renderNavBar = function renderNavBar() {
      var _ref2;

      var title = props.title,
          fixed = props.fixed,
          border = props.border,
          zIndex = props.zIndex;
      var style = {
        zIndex: zIndex !== undefined ? +zIndex : undefined
      };
      var hasLeft = props.leftArrow || props.leftText || slots.left;
      var hasRight = props.rightText || slots.right;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": navBarRef,
        "style": style,
        "class": [nav_bar_bem({
          fixed: fixed,
          'safe-area-inset-top': props.safeAreaInsetTop
        }), (_ref2 = {}, _ref2[BORDER_BOTTOM] = border, _ref2)]
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": nav_bar_bem('content')
      }, [hasLeft && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": nav_bar_bem('left'),
        "onClick": onClickLeft
      }, [renderLeft()]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [nav_bar_bem('title'), 'van-ellipsis']
      }, [slots.title ? slots.title() : title]), hasRight && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": nav_bar_bem('right'),
        "onClick": onClickRight
      }, [renderRight()])])]);
    };

    return function () {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderNavBar);
      }

      return renderNavBar();
    };
  }
}));
;// CONCATENATED MODULE: ./es/notice-bar/index.js




 // Composition

 // Components



var notice_bar_createNamespace = createNamespace('notice-bar'),
    notice_bar_createComponent = notice_bar_createNamespace[0],
    notice_bar_bem = notice_bar_createNamespace[1];

/* harmony default export */ var notice_bar = (notice_bar_createComponent({
  props: {
    text: String,
    mode: String,
    color: String,
    leftIcon: String,
    wrapable: Boolean,
    background: String,
    scrollable: {
      type: Boolean,
      default: null
    },
    delay: {
      type: [Number, String],
      default: 1
    },
    speed: {
      type: [Number, String],
      default: 50
    }
  },
  emits: ['close', 'replay'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var wrapWidth = 0;
    var contentWidth = 0;
    var startTimer;
    var wrapRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var contentRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      show: true,
      offset: 0,
      duration: 0
    });

    var renderLeftIcon = function renderLeftIcon() {
      if (slots['left-icon']) {
        return slots['left-icon']();
      }

      if (props.leftIcon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "class": notice_bar_bem('left-icon'),
          "name": props.leftIcon
        }, null);
      }
    };

    var getRightIconName = function getRightIconName() {
      if (props.mode === 'closeable') {
        return 'cross';
      }

      if (props.mode === 'link') {
        return 'arrow';
      }
    };

    var onClickRightIcon = function onClickRightIcon(event) {
      if (props.mode === 'closeable') {
        state.show = false;
        emit('close', event);
      }
    };

    var renderRightIcon = function renderRightIcon() {
      if (slots['right-icon']) {
        return slots['right-icon']();
      }

      var name = getRightIconName();

      if (name) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": name,
          "class": notice_bar_bem('right-icon'),
          "onClick": onClickRightIcon
        }, null);
      }
    };

    var onTransitionEnd = function onTransitionEnd() {
      state.offset = wrapWidth;
      state.duration = 0; // wait for Vue to render offset
      // using nextTick won't work in iOS14

      raf(function () {
        // use double raf to ensure animation can start
        doubleRaf(function () {
          state.offset = -contentWidth;
          state.duration = (contentWidth + wrapWidth) / props.speed;
          emit('replay');
        });
      });
    };

    var renderMarquee = function renderMarquee() {
      var ellipsis = props.scrollable === false && !props.wrapable;
      var style = {
        transform: state.offset ? "translateX(" + state.offset + "px)" : '',
        transitionDuration: state.duration + "s"
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": wrapRef,
        "role": "marquee",
        "class": notice_bar_bem('wrap')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": contentRef,
        "style": style,
        "class": [notice_bar_bem('content'), {
          'van-ellipsis': ellipsis
        }],
        "onTransitionend": onTransitionEnd
      }, [slots.default ? slots.default() : props.text])]);
    };

    var reset = function reset() {
      wrapWidth = 0;
      contentWidth = 0;
      state.offset = 0;
      state.duration = 0;
    };

    var start = function start() {
      var delay = props.delay,
          speed = props.speed,
          scrollable = props.scrollable;
      var ms = isDef(delay) ? delay * 1000 : 0;
      reset();
      clearTimeout(startTimer);
      startTimer = setTimeout(function () {
        if (!wrapRef.value || !contentRef.value || scrollable === false) {
          return;
        }

        var wrapRefWidth = useRect(wrapRef).width;
        var contentRefWidth = useRect(contentRef).width;

        if (scrollable || contentRefWidth > wrapRefWidth) {
          doubleRaf(function () {
            wrapWidth = wrapRefWidth;
            contentWidth = contentRefWidth;
            state.offset = -contentWidth;
            state.duration = contentWidth / speed;
          });
        }
      }, ms);
    };

    onMountedOrActivated(start); // fix cache issues with forwards and back history in safari
    // see: https://guwii.com/cache-issues-with-forwards-and-back-history-in-safari/

    useEventListener('pageshow', start);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([function () {
      return props.text;
    }, function () {
      return props.scrollable;
    }], start);
    return function () {
      var color = props.color,
          wrapable = props.wrapable,
          background = props.background;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "alert",
        "class": notice_bar_bem({
          wrapable: wrapable
        }),
        "style": {
          color: color,
          background: background
        }
      }, [renderLeftIcon(), renderMarquee(), renderRightIcon()]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, state.show]]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/notify/Notify.js





var Notify_createNamespace = createNamespace('notify'),
    Notify_createComponent = Notify_createNamespace[0],
    Notify_bem = Notify_createNamespace[1];

/* harmony default export */ var Notify = (Notify_createComponent({
  props: _extends({}, popupSharedProps, {
    color: String,
    message: [Number, String],
    className: null,
    background: String,
    type: {
      type: String,
      default: 'danger'
    }
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var style = {
        color: props.color,
        background: props.background
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup, {
        "show": props.show,
        "class": [Notify_bem([props.type]), props.className],
        "style": style,
        "overlay": false,
        "position": "top",
        "duration": 0.2,
        "lockScroll": false
      }, {
        default: function _default() {
          return [slots.default ? slots.default() : props.message];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/notify/index.js





var timer;
var notify_instance;

function notify_parseOptions(message) {
  return isObject(message) ? message : {
    message: message
  };
}

function notify_initInstance() {
  var _mountComponent = mountComponent({
    setup: function setup() {
      var _usePopupState = usePopupState(),
          state = _usePopupState.state,
          toggle = _usePopupState.toggle;

      return function () {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Notify, _extends({}, state, {
          'onUpdate:show': toggle
        }), null);
      };
    }
  });

  notify_instance = _mountComponent.instance;
}

function notify_Notify(options) {
  if (!inBrowser) {
    return;
  }

  if (!notify_instance) {
    notify_initInstance();
  }

  options = _extends({}, notify_Notify.currentOptions, notify_parseOptions(options));
  notify_instance.open(options);
  clearTimeout(timer);

  if (options.duration > 0) {
    timer = setTimeout(notify_Notify.clear, options.duration);
  }

  return notify_instance;
}

function notify_defaultOptions() {
  return {
    type: 'danger',
    color: undefined,
    message: '',
    onClose: null,
    onClick: null,
    onOpened: null,
    duration: 3000,
    className: '',
    background: undefined
  };
}

notify_Notify.clear = function () {
  if (notify_instance) {
    notify_instance.toggle(false);
  }
};

notify_Notify.currentOptions = notify_defaultOptions();

notify_Notify.setDefaultOptions = function (options) {
  _extends(notify_Notify.currentOptions, options);
};

notify_Notify.resetDefaultOptions = function () {
  notify_Notify.currentOptions = notify_defaultOptions();
};

notify_Notify.install = function (app) {
  app.use(Notify);
  app.config.globalProperties.$notify = notify_Notify;
};

notify_Notify.Component = Notify;
/* harmony default export */ var notify = (notify_Notify);
;// CONCATENATED MODULE: ./es/number-keyboard/Key.js






var Key_createNamespace = createNamespace('key'),
    Key_createComponent = Key_createNamespace[0],
    Key_bem = Key_createNamespace[1];

var CollapseIcon = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("svg", {
  "class": Key_bem('collapse-icon'),
  "viewBox": "0 0 30 24"
}, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "d": "M25.877 12.843h-1.502c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.5c.187 0 .187 0 .187-.188v-1.511c0-.19 0-.191-.185-.191zM17.999 10.2c0 .188 0 .188.188.188h1.687c.188 0 .188 0 .188-.188V8.688c0-.187.004-.187-.186-.19h-1.69c-.187 0-.187 0-.187.19V10.2zm2.25-3.967h1.5c.188 0 .188 0 .188-.188v-1.7c0-.19 0-.19-.188-.19h-1.5c-.189 0-.189 0-.189.19v1.7c0 .188 0 .188.19.188zm2.063 4.157h3.563c.187 0 .187 0 .187-.189V4.346c0-.19.004-.19-.185-.19h-1.69c-.187 0-.187 0-.187.188v4.155h-1.688c-.187 0-.187 0-.187.189v1.514c0 .19 0 .19.187.19zM14.812 24l2.812-3.4H12l2.813 3.4zm-9-11.157H4.31c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.502c.187 0 .187 0 .187-.188v-1.511c0-.19.01-.191-.189-.191zm15.937 0H8.25c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h13.5c.188 0 .188 0 .188-.188v-1.511c0-.19 0-.191-.188-.191zm-11.438-2.454h1.5c.188 0 .188 0 .188-.188V8.688c0-.187 0-.187-.188-.189h-1.5c-.187 0-.187 0-.187.189V10.2c0 .188 0 .188.187.188zM27.94 0c.563 0 .917.21 1.313.567.518.466.748.757.748 1.51v14.92c0 .567-.188 1.134-.562 1.512-.376.378-.938.566-1.313.566H2.063c-.563 0-.938-.188-1.313-.566-.562-.378-.75-.945-.75-1.511V2.078C0 1.51.188.944.562.567.938.189 1.5 0 1.875 0zm-.062 2H2v14.92h25.877V2zM5.81 4.157c.19 0 .19 0 .19.189v1.762c-.003.126-.024.126-.188.126H4.249c-.126-.003-.126-.023-.126-.188v-1.7c-.187-.19 0-.19.188-.19zm10.5 2.077h1.503c.187 0 .187 0 .187-.188v-1.7c0-.19 0-.19-.187-.19h-1.502c-.188 0-.188.001-.188.19v1.7c0 .188 0 .188.188.188zM7.875 8.5c.187 0 .187.002.187.189V10.2c0 .188 0 .188-.187.188H4.249c-.126-.002-.126-.023-.126-.188V8.625c.003-.126.024-.126.188-.126zm7.875 0c.19.002.19.002.19.189v1.575c-.003.126-.024.126-.19.126h-1.563c-.126-.002-.126-.023-.126-.188V8.625c.002-.126.023-.126.189-.126zm-6-4.342c.187 0 .187 0 .187.189v1.7c0 .188 0 .188-.187.188H8.187c-.126-.003-.126-.023-.126-.188V4.283c.003-.126.024-.126.188-.126zm3.94 0c.185 0 .372 0 .372.189v1.762c-.002.126-.023.126-.187.126h-1.75C12 6.231 12 6.211 12 6.046v-1.7c0-.19.187-.19.187-.19z",
  "fill": "currentColor"
}, null)]);

var DeleteIcon = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("svg", {
  "class": Key_bem('delete-icon'),
  "viewBox": "0 0 32 22"
}, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "d": "M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z",
  "fill": "currentColor"
}, null)]);

/* harmony default export */ var Key = (Key_createComponent({
  props: {
    type: String,
    text: [Number, String],
    color: String,
    wider: Boolean,
    large: Boolean,
    loading: Boolean
  },
  emits: ['press'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var active = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(false);
    var touch = useTouch();

    var onTouchStart = function onTouchStart(event) {
      touch.start(event);
      active.value = true;
    };

    var onTouchMove = function onTouchMove(event) {
      touch.move(event);

      if (touch.direction.value) {
        active.value = false;
      }
    };

    var onTouchEnd = function onTouchEnd(event) {
      if (active.value) {
        // eliminate tap delay on safari
        // see: https://github.com/youzan/vant/issues/6836
        if (!slots.default) {
          event.preventDefault();
        }

        active.value = false;
        emit('press', props.text, props.type);
      }
    };

    var renderContent = function renderContent() {
      if (props.loading) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_loading, {
          "class": Key_bem('loading-icon')
        }, null);
      }

      var text = slots.default ? slots.default() : props.text;

      switch (props.type) {
        case 'delete':
          return text || DeleteIcon;

        case 'extra':
          return text || CollapseIcon;

        default:
          return text;
      }
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Key_bem('wrapper', {
          wider: props.wider
        }),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "button",
        "tabindex": 0,
        "class": Key_bem([props.color, {
          large: props.large,
          active: active.value,
          delete: props.type === 'delete'
        }])
      }, [renderContent()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/number-keyboard/index.js











function number_keyboard_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var number_keyboard_createNamespace = createNamespace('number-keyboard'),
    number_keyboard_createComponent = number_keyboard_createNamespace[0],
    number_keyboard_bem = number_keyboard_createNamespace[1];

/* harmony default export */ var number_keyboard = (number_keyboard_createComponent({
  props: {
    show: Boolean,
    title: String,
    zIndex: [Number, String],
    teleport: [String, Object],
    randomKeyOrder: Boolean,
    closeButtonText: String,
    deleteButtonText: String,
    closeButtonLoading: Boolean,
    theme: {
      type: String,
      default: 'default'
    },
    modelValue: {
      type: String,
      default: ''
    },
    extraKey: {
      type: [String, Array],
      default: ''
    },
    maxlength: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    transition: {
      type: Boolean,
      default: true
    },
    blurOnClose: {
      type: Boolean,
      default: true
    },
    showDeleteKey: {
      type: Boolean,
      default: true
    },
    hideOnClickOutside: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  emits: ['show', 'hide', 'blur', 'input', 'close', 'delete', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var genBasicKeys = function genBasicKeys() {
      var keys = [];

      for (var i = 1; i <= 9; i++) {
        keys.push({
          text: i
        });
      }

      if (props.randomKeyOrder) {
        keys.sort(function () {
          return Math.random() > 0.5 ? 1 : -1;
        });
      }

      return keys;
    };

    var genDefaultKeys = function genDefaultKeys() {
      return [].concat(genBasicKeys(), [{
        text: props.extraKey,
        type: 'extra'
      }, {
        text: 0
      }, {
        text: props.showDeleteKey ? props.deleteButtonText : '',
        type: props.showDeleteKey ? 'delete' : ''
      }]);
    };

    var genCustomKeys = function genCustomKeys() {
      var keys = genBasicKeys();
      var extraKey = props.extraKey;
      var extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];

      if (extraKeys.length === 1) {
        keys.push({
          text: 0,
          wider: true
        }, {
          text: extraKeys[0],
          type: 'extra'
        });
      } else if (extraKeys.length === 2) {
        keys.push({
          text: extraKeys[0],
          type: 'extra'
        }, {
          text: 0
        }, {
          text: extraKeys[1],
          type: 'extra'
        });
      }

      return keys;
    };

    var keys = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return props.theme === 'custom' ? genCustomKeys() : genDefaultKeys();
    });

    var onBlur = function onBlur() {
      if (props.show) {
        emit('blur');
      }
    };

    var onClose = function onClose() {
      emit('close');

      if (props.blurOnClose) {
        onBlur();
      }
    };

    var onAnimationEnd = function onAnimationEnd() {
      console.log('onAnimationEnd');
      emit(props.show ? 'show' : 'hide');
    };

    var onPress = function onPress(text, type) {
      if (text === '') {
        if (type === 'extra') {
          onBlur();
        }

        return;
      }

      var value = props.modelValue;

      if (type === 'delete') {
        emit('delete');
        emit('update:modelValue', value.slice(0, value.length - 1));
      } else if (type === 'close') {
        onClose();
      } else if (value.length < props.maxlength) {
        emit('input', text);
        emit('update:modelValue', value + text);
      }
    };

    var renderTitle = function renderTitle() {
      var title = props.title,
          theme = props.theme,
          closeButtonText = props.closeButtonText;
      var leftSlot = slots['title-left'];
      var showClose = closeButtonText && theme === 'default';
      var showTitle = title || showClose || leftSlot;

      if (!showTitle) {
        return;
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": number_keyboard_bem('header')
      }, [leftSlot && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": number_keyboard_bem('title-left')
      }, [leftSlot()]), title && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("h2", {
        "class": number_keyboard_bem('title')
      }, number_keyboard_isSlot(title) ? title : {
        default: function _default() {
          return [title];
        }
      }), showClose && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
        "type": "button",
        "class": number_keyboard_bem('close'),
        "onClick": onClose
      }, number_keyboard_isSlot(closeButtonText) ? closeButtonText : {
        default: function _default() {
          return [closeButtonText];
        }
      })]);
    };

    var renderKeys = function renderKeys() {
      return keys.value.map(function (key) {
        var keySlots = {};

        if (key.type === 'delete') {
          keySlots.default = slots.delete;
        }

        if (key.type === 'extra') {
          keySlots.default = slots['extra-key'];
        }

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Key, {
          "key": key.text,
          "text": key.text,
          "type": key.type,
          "wider": key.wider,
          "color": key.color,
          "onPress": onPress
        }, _extends({}, keySlots));
      });
    };

    var renderSidebar = function renderSidebar() {
      if (props.theme === 'custom') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": number_keyboard_bem('sidebar')
        }, [props.showDeleteKey && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Key, {
          "large": true,
          "text": props.deleteButtonText,
          "type": "delete",
          "onPress": onPress
        }, {
          delete: slots.delete
        }), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Key, {
          "large": true,
          "text": props.closeButtonText,
          "type": "close",
          "color": "blue",
          "loading": props.closeButtonLoading,
          "onPress": onPress
        }, null)]);
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.show;
    }, function (value) {
      if (!props.transition) {
        emit(value ? 'show' : 'hide');
      }
    });

    if (props.hideOnClickOutside) {
      useClickAway(root, onClose, {
        eventName: 'touchstart'
      });
    }

    return function () {
      var _slot;

      var Title = renderTitle();

      var Content = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Transition, {
        "name": props.transition ? 'van-slide-up' : ''
      }, number_keyboard_isSlot(_slot = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "style": {
          zIndex: props.zIndex
        },
        "class": number_keyboard_bem({
          unfit: !props.safeAreaInsetBottom,
          'with-title': !!Title
        }),
        "onTouchstart": stopPropagation,
        "onAnimationend": onAnimationEnd,
        "onWebkitAnimationEnd": onAnimationEnd
      }, [Title, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": number_keyboard_bem('body')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": number_keyboard_bem('keys')
      }, [renderKeys()]), renderSidebar()])]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.show]])) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      });

      if (props.teleport) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Teleport, {
          "to": props.teleport
        }, number_keyboard_isSlot(Content) ? Content : {
          default: function _default() {
            return [Content];
          }
        });
      }

      return Content;
    };
  }
}));
;// CONCATENATED MODULE: ./es/pagination/index.js





var pagination_createNamespace = createNamespace('pagination'),
    pagination_createComponent = pagination_createNamespace[0],
    pagination_bem = pagination_createNamespace[1],
    pagination_t = pagination_createNamespace[2];

function makePage(number, text, active) {
  return {
    number: number,
    text: text,
    active: active
  };
}

/* harmony default export */ var pagination = (pagination_createComponent({
  props: {
    prevText: String,
    nextText: String,
    forceEllipses: Boolean,
    mode: {
      type: String,
      default: 'multi'
    },
    modelValue: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: [Number, String],
      default: 0
    },
    totalItems: {
      type: [Number, String],
      default: 0
    },
    itemsPerPage: {
      type: [Number, String],
      default: 10
    },
    showPageSize: {
      type: [Number, String],
      default: 5
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var count = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var pageCount = props.pageCount,
          totalItems = props.totalItems,
          itemsPerPage = props.itemsPerPage;
      var count = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
      return Math.max(1, count);
    });
    var pages = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var items = [];
      var pageCount = count.value;
      var showPageSize = +props.showPageSize;
      var modelValue = props.modelValue,
          forceEllipses = props.forceEllipses;

      if (props.mode !== 'multi') {
        return items;
      } // Default page limits


      var startPage = 1;
      var endPage = pageCount;
      var isMaxSized = showPageSize < pageCount; // recompute if showPageSize

      if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(modelValue - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1; // Adjust if limit is exceeded

        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      } // Add page number links


      for (var number = startPage; number <= endPage; number++) {
        var page = makePage(number, number, number === modelValue);
        items.push(page);
      } // Add links to move between page sets


      if (isMaxSized && showPageSize > 0 && forceEllipses) {
        if (startPage > 1) {
          var prevPages = makePage(startPage - 1, '...');
          items.unshift(prevPages);
        }

        if (endPage < pageCount) {
          var nextPages = makePage(endPage + 1, '...');
          items.push(nextPages);
        }
      }

      return items;
    });

    var select = function select(page, emitChange) {
      page = Math.min(count.value, Math.max(1, page));

      if (props.modelValue !== page) {
        emit('update:modelValue', page);

        if (emitChange) {
          emit('change', page);
        }
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.modelValue;
    }, function (value) {
      select(value);
    }, {
      immediate: true
    });

    var renderDesc = function renderDesc() {
      if (props.mode !== 'multi') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
          "class": pagination_bem('page-desc')
        }, [slots.pageDesc ? slots.pageDesc() : props.modelValue + "/" + count.value]);
      }
    };

    return function () {
      var value = props.modelValue;
      var simple = props.mode !== 'multi';

      var onSelect = function onSelect(value) {
        return function () {
          select(value, true);
        };
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("ul", {
        "class": pagination_bem({
          simple: simple
        })
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
        "class": [pagination_bem('item', {
          disabled: value === 1
        }), pagination_bem('prev'), BORDER],
        "onClick": onSelect(value - 1)
      }, [slots['prev-text'] ? slots['prev-text']() : props.prevText || pagination_t('prev')]), pages.value.map(function (page) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
          "class": [pagination_bem('item', {
            active: page.active
          }), pagination_bem('page'), BORDER],
          "onClick": onSelect(page.number)
        }, [slots.page ? slots.page(page) : page.text]);
      }), renderDesc(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
        "class": [pagination_bem('item', {
          disabled: value === count.value
        }), pagination_bem('next'), BORDER],
        "onClick": onSelect(value + 1)
      }, [slots['next-text'] ? slots['next-text']() : props.nextText || pagination_t('next')])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/password-input/index.js





function password_input_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var password_input_createNamespace = createNamespace('password-input'),
    password_input_createComponent = password_input_createNamespace[0],
    password_input_bem = password_input_createNamespace[1];

/* harmony default export */ var password_input = (password_input_createComponent({
  props: {
    info: String,
    gutter: [Number, String],
    focused: Boolean,
    errorInfo: String,
    mask: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    length: {
      type: [Number, String],
      default: 6
    }
  },
  emits: ['focus'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var onTouchStart = function onTouchStart(event) {
      event.stopPropagation();
      emit('focus', event);
    };

    var renderPoints = function renderPoints() {
      var Points = [];
      var mask = props.mask,
          value = props.value,
          length = props.length,
          gutter = props.gutter,
          focused = props.focused;

      for (var i = 0; i < length; i++) {
        var _ref2;

        var _char = value[i];
        var showBorder = i !== 0 && !gutter;
        var showCursor = focused && i === value.length;
        var style = void 0;

        if (i !== 0 && gutter) {
          style = {
            marginLeft: addUnit(gutter)
          };
        }

        Points.push((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
          "class": [(_ref2 = {}, _ref2[BORDER_LEFT] = showBorder, _ref2), password_input_bem('item', {
            focus: showCursor
          })],
          "style": style
        }, [mask ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("i", {
          "style": {
            visibility: _char ? 'visible' : 'hidden'
          }
        }, null) : _char, showCursor && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": password_input_bem('cursor')
        }, null)]));
      }

      return Points;
    };

    return function () {
      var _ref3;

      var info = props.errorInfo || props.info;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": password_input_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("ul", {
        "class": [password_input_bem('security'), (_ref3 = {}, _ref3[BORDER_SURROUND] = !props.gutter, _ref3)],
        "onTouchstart": onTouchStart
      }, [renderPoints()]), info && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": password_input_bem(props.errorInfo ? 'error-info' : 'info')
      }, password_input_isSlot(info) ? info : {
        default: function _default() {
          return [info];
        }
      })]);
    };
  }
}));
;// CONCATENATED MODULE: ./node_modules/@vant/popperjs/dist/esm/index.js
function esm_extends() {
  esm_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return esm_extends.apply(this, arguments);
}

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

/*:: import type { Window } from '../types'; */

/*:: declare function getWindow(node: Node | Window): Window; */
function getWindow(node) {
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */

function esm_isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */


function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe: assume body is always available
  return ((esm_isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function esm_getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = esm_getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// $FlowFixMe: this is a quicker (but less type safe) way to save quite some bytes from the bundle
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    // $FlowFixMe: need a better way to handle this...
    element.host || // ShadowRoot detected
    // $FlowFixMe: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function esm_getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return esm_getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the 
reference element's position.
*/

function listScrollParents(element, list) {
  if (list === void 0) {
    list = [];
  }

  var scrollParent = esm_getScrollParent(element);
  var isBody = getNodeName(scrollParent) === 'body';
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  esm_getComputedStyle(element).position === 'fixed') {
    return null;
  }

  var offsetParent = element.offsetParent;

  if (offsetParent) {
    var html = getDocumentElement(offsetParent);

    if (getNodeName(offsetParent) === 'body' && esm_getComputedStyle(offsetParent).position === 'static' && esm_getComputedStyle(html).position !== 'static') {
      return html;
    }
  }

  return offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = esm_getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.

    if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && esm_getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && getNodeName(offsetParent) === 'body' && esm_getComputedStyle(offsetParent).position === 'static') {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

var esm_top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [esm_top, bottom, right, left];
var start = 'start';
var end = 'end';
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function esm_format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = (/* unused pure expression or super */ null && (['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options']));
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(esm_format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(esm_format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(esm_format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? esm_extends(esm_extends(esm_extends({}, existing), current), {}, {
      options: esm_extends(esm_extends({}, existing.options), current.options),
      data: esm_extends(esm_extends({}, existing.data), current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

function getVariation(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case esm_top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: esm_extends(esm_extends({}, DEFAULT_OPTIONS), defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = esm_extends(esm_extends(esm_extends({}, defaultOptions), state.options), options);
        state.scrollParents = {
          reference: esm_isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (false) { var _getComputedStyle, marginTop, marginRight, marginBottom, marginLeft, flipModifier, modifiers; }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (false) {}

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = esm_extends({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (false) {}

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (false) {}

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name; // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step

  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsets(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive;

  var _roundOffsets = roundOffsets(offsets),
      x = _roundOffsets.x,
      y = _roundOffsets.y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = esm_top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
    } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    /*:: offsetParent = (offsetParent: Element); */


    if (placement === esm_top) {
      sideY = bottom;
      y -= offsetParent.clientHeight - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right;
      x -= offsetParent.clientWidth - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = esm_extends({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return esm_extends(esm_extends({}, commonStyles), {}, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return esm_extends(esm_extends({}, commonStyles), {}, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref3) {
  var state = _ref3.state,
      options = _ref3.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

  if (false) { var transitionProperty; }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = esm_extends(esm_extends({}, state.styles.popper), mapToStyles(esm_extends(esm_extends({}, commonStyles), {}, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = esm_extends(esm_extends({}, state.styles.arrow), mapToStyles(esm_extends(esm_extends({}, commonStyles), {}, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false
    })));
  }

  state.attributes.popper = esm_extends(esm_extends({}, state.attributes.popper), {}, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe


    esm_extends(element.style, style);

    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };

  esm_extends(state.elements.popper.style, initialStyles.popper);

  if (state.elements.arrow) {
    esm_extends(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe


      esm_extends(element.style, style);

      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$1,
  requires: ['computeStyles']
};

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, esm_top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(esm_extends(esm_extends({}, rects), {}, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};



;// CONCATENATED MODULE: ./es/popover/index.js






 // Utils


 // Composition

 // Components




function popover_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var popover_createNamespace = createNamespace('popover'),
    popover_createComponent = popover_createNamespace[0],
    popover_bem = popover_createNamespace[1];

/* harmony default export */ var popover = (popover_createComponent({
  props: {
    show: Boolean,
    overlay: Boolean,
    offset: {
      type: Array,
      default: function _default() {
        return [0, 8];
      }
    },
    theme: {
      type: String,
      default: 'light'
    },
    trigger: {
      type: String,
      default: 'click'
    },
    actions: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    teleport: {
      type: [String, Object],
      default: 'body'
    },
    closeOnClickAction: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select', 'touchstart', 'update:show'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;
    var popper;
    var wrapperRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var popoverRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var createPopperInstance = function createPopperInstance() {
      return createPopper(wrapperRef.value, popoverRef.value.popupRef.value, {
        placement: props.placement,
        modifiers: [{
          name: 'computeStyles',
          options: {
            adaptive: false,
            gpuAcceleration: false
          }
        }, _extends({}, offset$1, {
          options: {
            offset: props.offset
          }
        })]
      });
    };

    var updateLocation = function updateLocation() {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        if (!props.show) {
          return;
        }

        if (!popper) {
          popper = createPopperInstance();
        } else {
          popper.setOptions({
            placement: props.placement
          });
        }
      });
    };

    var toggle = function toggle(value) {
      emit('update:show', value);
    };

    var onClickWrapper = function onClickWrapper() {
      if (props.trigger === 'click') {
        toggle(!props.show);
      }
    };

    var onTouchstart = function onTouchstart(event) {
      event.stopPropagation();
      emit('touchstart', event);
    };

    var onClickAction = function onClickAction(action, index) {
      if (action.disabled) {
        return;
      }

      emit('select', action, index);

      if (props.closeOnClickAction) {
        toggle(false);
      }
    };

    var onClickAway = function onClickAway() {
      toggle(false);
    };

    var renderAction = function renderAction(action, index) {
      var icon = action.icon,
          text = action.text,
          color = action.color,
          disabled = action.disabled,
          className = action.className;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "menuitem",
        "class": [popover_bem('action', {
          disabled: disabled,
          'with-icon': icon
        }), className],
        "style": {
          color: color
        },
        "onClick": function onClick() {
          return onClickAction(action, index);
        }
      }, [icon && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "name": icon,
        "class": popover_bem('action-icon')
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [popover_bem('action-text'), BORDER_BOTTOM]
      }, popover_isSlot(text) ? text : {
        default: function _default() {
          return [text];
        }
      })]);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(updateLocation);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(function () {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([function () {
      return props.show;
    }, function () {
      return props.placement;
    }], updateLocation);
    useClickAway(wrapperRef, onClickAway, {
      eventName: 'touchstart'
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Fragment, null, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "ref": wrapperRef,
        "class": popover_bem('wrapper'),
        "onClick": onClickWrapper
      }, [slots.reference == null ? void 0 : slots.reference()]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": popoverRef,
        "show": props.show,
        "class": popover_bem([props.theme]),
        "overlay": props.overlay,
        "position": null,
        "teleport": props.teleport,
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "onTouchstart": onTouchstart
      }, _extends({}, attrs, {
        'onUpdate:show': toggle
      })), {
        default: function _default() {
          return [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
            "class": popover_bem('arrow')
          }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
            "role": "menu",
            "class": popover_bem('content')
          }, [slots.default ? slots.default() : props.actions.map(renderAction)])];
        }
      })]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/progress/index.js






function progress_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var progress_createNamespace = createNamespace('progress'),
    progress_createComponent = progress_createNamespace[0],
    progress_bem = progress_createNamespace[1];

/* harmony default export */ var progress = (progress_createComponent({
  props: {
    color: String,
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    pivotColor: String,
    trackColor: String,
    strokeWidth: [Number, String],
    percentage: {
      type: [Number, String],
      required: true,
      validator: function validator(value) {
        return value >= 0 && value <= 100;
      }
    },
    showPivot: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props) {
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var pivotRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      rootWidth: 0,
      pivotWidth: 0
    });
    var background = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return props.inactive ? '#cacaca' : props.color;
    });

    var resize = function resize() {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
        state.rootWidth = root.value ? root.value.offsetWidth : 0;
        state.pivotWidth = pivotRef.value ? pivotRef.value.offsetWidth : 0;
      });
    };

    var renderPivot = function renderPivot() {
      var rootWidth = state.rootWidth,
          pivotWidth = state.pivotWidth;
      var textColor = props.textColor,
          pivotText = props.pivotText,
          pivotColor = props.pivotColor,
          percentage = props.percentage;
      var text = pivotText != null ? pivotText : percentage + "%";
      var show = props.showPivot && text;

      if (show) {
        var left = (rootWidth - pivotWidth) * +percentage / 100;
        var style = {
          color: textColor,
          left: left + "px",
          background: pivotColor || background.value
        };
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "ref": pivotRef,
          "style": style,
          "class": progress_bem('pivot')
        }, progress_isSlot(text) ? text : {
          default: function _default() {
            return [text];
          }
        });
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([function () {
      return props.showPivot;
    }, function () {
      return props.pivotText;
    }], resize);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(resize);
    useExpose({
      resize: resize
    });
    return function () {
      var trackColor = props.trackColor,
          percentage = props.percentage,
          strokeWidth = props.strokeWidth;
      var rootStyle = {
        background: trackColor,
        height: addUnit(strokeWidth)
      };
      var portionStyle = {
        background: background.value,
        width: state.rootWidth * +percentage / 100 + 'px'
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "class": progress_bem(),
        "style": rootStyle
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": progress_bem('portion'),
        "style": portionStyle
      }, [renderPivot()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/pull-refresh/index.js


 // Utils

 // Composition


 // Components



function pull_refresh_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var pull_refresh_createNamespace = createNamespace('pull-refresh'),
    pull_refresh_createComponent = pull_refresh_createNamespace[0],
    pull_refresh_bem = pull_refresh_createNamespace[1],
    pull_refresh_t = pull_refresh_createNamespace[2];

var DEFAULT_HEAD_HEIGHT = 50;
var TEXT_STATUS = ['pulling', 'loosing', 'success'];
/* harmony default export */ var pull_refresh = (pull_refresh_createComponent({
  props: {
    disabled: Boolean,
    successText: String,
    pullingText: String,
    loosingText: String,
    loadingText: String,
    modelValue: {
      type: Boolean,
      required: true
    },
    successDuration: {
      type: [Number, String],
      default: 500
    },
    animationDuration: {
      type: [Number, String],
      default: 300
    },
    headHeight: {
      type: [Number, String],
      default: DEFAULT_HEAD_HEIGHT
    }
  },
  emits: ['refresh', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var reachTop;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var scrollParent = useScrollParent(root);
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      status: 'normal',
      distance: 0,
      duration: 0
    });
    var touch = useTouch();

    var getHeadStyle = function getHeadStyle() {
      if (props.headHeight !== DEFAULT_HEAD_HEIGHT) {
        return {
          height: props.headHeight + "px"
        };
      }
    };

    var isTouchable = function isTouchable() {
      return state.status !== 'loading' && state.status !== 'success' && !props.disabled;
    };

    var ease = function ease(distance) {
      var headHeight = +props.headHeight;

      if (distance > headHeight) {
        if (distance < headHeight * 2) {
          distance = headHeight + (distance - headHeight) / 2;
        } else {
          distance = headHeight * 1.5 + (distance - headHeight * 2) / 4;
        }
      }

      return Math.round(distance);
    };

    var setStatus = function setStatus(distance, isLoading) {
      state.distance = distance;

      if (isLoading) {
        state.status = 'loading';
      } else if (distance === 0) {
        state.status = 'normal';
      } else if (distance < props.headHeight) {
        state.status = 'pulling';
      } else {
        state.status = 'loosing';
      }
    };

    var getStatusText = function getStatusText() {
      var status = state.status;

      if (status === 'normal') {
        return '';
      }

      return props[status + "Text"] || pull_refresh_t(status);
    };

    var renderStatus = function renderStatus() {
      var status = state.status,
          distance = state.distance;

      if (slots[status]) {
        return slots[status]({
          distance: distance
        });
      }

      var nodes = [];

      if (TEXT_STATUS.indexOf(status) !== -1) {
        nodes.push((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": pull_refresh_bem('text')
        }, [getStatusText()]));
      }

      if (status === 'loading') {
        var _slot;

        nodes.push((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_loading, {
          "size": "16"
        }, pull_refresh_isSlot(_slot = getStatusText()) ? _slot : {
          default: function _default() {
            return [_slot];
          }
        }));
      }

      return nodes;
    };

    var showSuccessTip = function showSuccessTip() {
      state.status = 'success';
      setTimeout(function () {
        setStatus(0);
      }, +props.successDuration);
    };

    var checkPosition = function checkPosition(event) {
      reachTop = getScrollTop(scrollParent.value) === 0;

      if (reachTop) {
        state.duration = 0;
        touch.start(event);
      }
    };

    var onTouchStart = function onTouchStart(event) {
      if (isTouchable()) {
        checkPosition(event);
      }
    };

    var onTouchMove = function onTouchMove(event) {
      if (isTouchable()) {
        if (!reachTop) {
          checkPosition(event);
        }

        var deltaY = touch.deltaY;
        touch.move(event);

        if (reachTop && deltaY.value >= 0 && touch.isVertical()) {
          preventDefault(event);
          setStatus(ease(deltaY.value));
        }
      }
    };

    var onTouchEnd = function onTouchEnd() {
      if (reachTop && touch.deltaY.value && isTouchable()) {
        state.duration = +props.animationDuration;

        if (state.status === 'loosing') {
          setStatus(+props.headHeight, true);
          emit('update:modelValue', true); // ensure value change can be watched

          (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(function () {
            emit('refresh');
          });
        } else {
          setStatus(0);
        }
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.modelValue;
    }, function (value) {
      state.duration = +props.animationDuration;

      if (value) {
        setStatus(+props.headHeight, true);
      } else if (slots.success || props.successText) {
        showSuccessTip();
      } else {
        setStatus(0, false);
      }
    });
    return function () {
      var trackStyle = {
        transitionDuration: state.duration + "ms",
        transform: state.distance ? "translate3d(0," + state.distance + "px, 0)" : ''
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "class": pull_refresh_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": pull_refresh_bem('track'),
        "style": trackStyle,
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": pull_refresh_bem('head'),
        "style": getHeadStyle()
      }, [renderStatus()]), slots.default == null ? void 0 : slots.default()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/rate/index.js

 // Utils

 // Composition



 // Components



var rate_createNamespace = createNamespace('rate'),
    rate_createComponent = rate_createNamespace[0],
    rate_bem = rate_createNamespace[1];

function getRateStatus(value, index, allowHalf) {
  if (value >= index) {
    return 'full';
  }

  if (value + 0.5 >= index && allowHalf) {
    return 'half';
  }

  return 'void';
}

/* harmony default export */ var rate = (rate_createComponent({
  props: {
    size: [Number, String],
    color: String,
    gutter: [Number, String],
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    voidColor: String,
    iconPrefix: String,
    disabledColor: String,
    modelValue: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'star'
    },
    voidIcon: {
      type: String,
      default: 'star-o'
    },
    count: {
      type: [Number, String],
      default: 5
    },
    touchable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var ranges;
    var touch = useTouch();

    var _useRefs = useRefs(),
        itemRefs = _useRefs[0],
        setItemRefs = _useRefs[1];

    var untouchable = function untouchable() {
      return props.readonly || props.disabled || !props.touchable;
    };

    var list = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var list = [];

      for (var i = 1; i <= props.count; i++) {
        list.push(getRateStatus(props.modelValue, i, props.allowHalf));
      }

      return list;
    });

    var select = function select(index) {
      if (!props.disabled && !props.readonly && index !== props.modelValue) {
        emit('update:modelValue', index);
        emit('change', index);
      }
    };

    var getScoreByPosition = function getScoreByPosition(x) {
      for (var i = ranges.length - 1; i > 0; i--) {
        if (x > ranges[i].left) {
          return ranges[i].score;
        }
      }

      return props.allowHalf ? 0.5 : 1;
    };

    var onTouchStart = function onTouchStart(event) {
      if (untouchable()) {
        return;
      }

      touch.start(event);
      var rects = itemRefs.value.map(function (item) {
        return item.getBoundingClientRect();
      });
      ranges = [];
      rects.forEach(function (rect, index) {
        if (props.allowHalf) {
          ranges.push({
            score: index + 0.5,
            left: rect.left
          }, {
            score: index + 1,
            left: rect.left + rect.width / 2
          });
        } else {
          ranges.push({
            score: index + 1,
            left: rect.left
          });
        }
      });
    };

    var onTouchMove = function onTouchMove(event) {
      if (untouchable()) {
        return;
      }

      touch.move(event);

      if (touch.isHorizontal()) {
        var clientX = event.touches[0].clientX;
        preventDefault(event);
        select(getScoreByPosition(clientX));
      }
    };

    var renderStar = function renderStar(status, index) {
      var icon = props.icon,
          size = props.size,
          color = props.color,
          count = props.count,
          gutter = props.gutter,
          voidIcon = props.voidIcon,
          disabled = props.disabled,
          voidColor = props.voidColor,
          allowHalf = props.allowHalf,
          iconPrefix = props.iconPrefix,
          disabledColor = props.disabledColor;
      var score = index + 1;
      var isFull = status === 'full';
      var isVoid = status === 'void';
      var style;

      if (gutter && score !== +count) {
        style = {
          paddingRight: addUnit(gutter)
        };
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "key": index,
        "ref": setItemRefs(index),
        "role": "radio",
        "style": style,
        "class": rate_bem('item'),
        "tabindex": "0",
        "aria-setsize": count,
        "aria-posinset": score,
        "aria-checked": String(!isVoid)
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "size": size,
        "name": isFull ? icon : voidIcon,
        "class": rate_bem('icon', {
          disabled: disabled,
          full: isFull
        }),
        "color": disabled ? disabledColor : isFull ? color : voidColor,
        "classPrefix": iconPrefix,
        "data-score": score,
        "onClick": function onClick() {
          select(score);
        }
      }, null), allowHalf && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "size": size,
        "name": isVoid ? voidIcon : icon,
        "class": rate_bem('icon', ['half', {
          disabled: disabled,
          full: !isVoid
        }]),
        "color": disabled ? disabledColor : isVoid ? voidColor : color,
        "classPrefix": iconPrefix,
        "data-score": score - 0.5,
        "onClick": function onClick() {
          select(score - 0.5);
        }
      }, null)]);
    };

    useLinkField(function () {
      return props.modelValue;
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "radiogroup",
        "class": rate_bem({
          readonly: props.readonly,
          disabled: props.disabled
        }),
        "tabindex": "0",
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove
      }, [list.value.map(renderStar)]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/search/index.js




 // Utils

 // Composition

 // Components



var search_createNamespace = createNamespace('search'),
    search_createComponent = search_createNamespace[0],
    search_bem = search_createNamespace[1],
    search_t = search_createNamespace[2];

/* harmony default export */ var search = (search_createComponent({
  inheritAttrs: false,
  props: {
    label: String,
    rightIcon: String,
    modelValue: String,
    actionText: String,
    background: String,
    showAction: Boolean,
    clearTrigger: String,
    shape: {
      type: String,
      default: 'square'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    leftIcon: {
      type: String,
      default: 'search'
    }
  },
  emits: ['update:modelValue', 'search', 'cancel'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;
    var filedRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var onCancel = function onCancel() {
      if (!slots.action) {
        emit('update:modelValue', '');
        emit('cancel');
      }
    };

    var onKeypress = function onKeypress(event) {
      var ENTER_CODE = 13;

      if (event.keyCode === ENTER_CODE) {
        preventDefault(event);
        emit('search', props.modelValue);
      }
    };

    var renderLabel = function renderLabel() {
      if (slots.label || props.label) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": search_bem('label')
        }, [slots.label ? slots.label() : props.label]);
      }
    };

    var renderAction = function renderAction() {
      if (props.showAction) {
        var text = props.actionText || search_t('cancel');
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": search_bem('action'),
          "role": "button",
          "tabindex": "0",
          "onClick": onCancel
        }, [slots.action ? slots.action() : text]);
      }
    };

    var focus = function focus() {
      if (filedRef.value) {
        filedRef.value.focus();
      }
    };

    var blur = function blur() {
      if (filedRef.value) {
        filedRef.value.blur();
      }
    };

    var fieldPropNames = ['leftIcon', 'rightIcon', 'clearable', 'modelValue', 'clearTrigger'];

    var renderField = function renderField() {
      var fieldAttrs = _extends({}, attrs, pick(props, fieldPropNames), {
        style: null,
        class: null
      });

      var onInput = function onInput(value) {
        emit('update:modelValue', value);
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_field, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": filedRef,
        "type": "search",
        "border": false,
        "onKeypress": onKeypress
      }, fieldAttrs, {
        'onUpdate:modelValue': onInput
      }), _extends({}, pick(slots, ['left-icon', 'right-icon'])));
    };

    useExpose({
      focus: focus,
      blur: blur
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [search_bem({
          'show-action': props.showAction
        }), attrs.class],
        "style": _extends({
          background: props.background
        }, attrs.style)
      }, [slots.left == null ? void 0 : slots.left(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": search_bem('content', props.shape)
      }, [renderLabel(), renderField()]), renderAction()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/share-sheet/index.js



 // Utils

 // Components



function share_sheet_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var PRESET_ICONS = ['qq', 'link', 'weibo', 'wechat', 'poster', 'qrcode', 'weapp-qrcode', 'wechat-moments'];

function getIconURL(icon) {
  if (PRESET_ICONS.indexOf(icon) !== -1) {
    return "https://img01.yzcdn.cn/vant/share-sheet-" + icon + ".png";
  }

  return icon;
}

var share_sheet_createNamespace = createNamespace('share-sheet'),
    share_sheet_createComponent = share_sheet_createNamespace[0],
    share_sheet_bem = share_sheet_createNamespace[1],
    share_sheet_t = share_sheet_createNamespace[2];

/* harmony default export */ var share_sheet = (share_sheet_createComponent({
  props: _extends({}, popupSharedProps, {
    title: String,
    cancelText: String,
    description: String,
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  }),
  emits: ['cancel', 'select', 'update:show'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var toggle = function toggle(value) {
      emit('update:show', value);
    };

    var onCancel = function onCancel() {
      toggle(false);
      emit('cancel');
    };

    var onSelect = function onSelect(option, index) {
      emit('select', option, index);
    };

    var renderHeader = function renderHeader() {
      var title = slots.title ? slots.title() : props.title;
      var description = slots.description ? slots.description() : props.description;

      if (title || description) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": share_sheet_bem('header')
        }, [title && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("h2", {
          "class": share_sheet_bem('title')
        }, share_sheet_isSlot(title) ? title : {
          default: function _default() {
            return [title];
          }
        }), description && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": share_sheet_bem('description')
        }, share_sheet_isSlot(description) ? description : {
          default: function _default() {
            return [description];
          }
        })]);
      }
    };

    var renderOption = function renderOption(option, index) {
      var name = option.name,
          icon = option.icon,
          className = option.className,
          description = option.description;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "button",
        "tabindex": "0",
        "class": [share_sheet_bem('option'), className],
        "onClick": function onClick() {
          onSelect(option, index);
        }
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("img", {
        "src": getIconURL(icon),
        "class": share_sheet_bem('icon')
      }, null), name && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": share_sheet_bem('name')
      }, share_sheet_isSlot(name) ? name : {
        default: function _default() {
          return [name];
        }
      }), description && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": share_sheet_bem('option-description')
      }, share_sheet_isSlot(description) ? description : {
        default: function _default() {
          return [description];
        }
      })]);
    };

    var renderOptions = function renderOptions(options, border) {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": share_sheet_bem('options', {
          border: border
        })
      }, [options.map(renderOption)]);
    };

    var renderRows = function renderRows() {
      var options = props.options;

      if (Array.isArray(options[0])) {
        return options.map(function (item, index) {
          return renderOptions(item, index !== 0);
        });
      }

      return renderOptions(options);
    };

    var renderCancelText = function renderCancelText() {
      var _props$cancelText;

      var text = (_props$cancelText = props.cancelText) != null ? _props$cancelText : share_sheet_t('cancel');

      if (text) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
          "type": "button",
          "class": share_sheet_bem('cancel'),
          "onClick": onCancel
        }, share_sheet_isSlot(text) ? text : {
          default: function _default() {
            return [text];
          }
        });
      }
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "round": true,
        "class": share_sheet_bem(),
        "position": "bottom"
      }, _extends({}, pick(props, ['show', 'overlay', 'duration', 'teleport', 'lazyRender', 'lockScroll', 'closeOnPopstate', 'closeOnClickOverlay', 'safeAreaInsetBottom']), {
        'onUpdate:show': toggle
      })), {
        default: function _default() {
          return [renderHeader(), renderRows(), renderCancelText()];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./es/sidebar/index.js





var sidebar_createNamespace = createNamespace('sidebar'),
    sidebar_createComponent = sidebar_createNamespace[0],
    sidebar_bem = sidebar_createNamespace[1];

var SIDEBAR_KEY = 'vanSidebar';
/* harmony default export */ var sidebar = (sidebar_createComponent({
  props: {
    modelValue: {
      type: [Number, String],
      default: 0
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useChildren = useChildren(SIDEBAR_KEY),
        linkChildren = _useChildren.linkChildren;

    var active = function active() {
      return +props.modelValue;
    };

    var setActive = function setActive(value) {
      if (value !== active()) {
        emit('change', value);
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(active, setActive);
    linkChildren({
      emit: emit,
      active: active,
      setActive: setActive
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": sidebar_bem()
      }, [slots.default == null ? void 0 : slots.default()]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/sidebar-item/index.js








var sidebar_item_createNamespace = createNamespace('sidebar-item'),
    sidebar_item_createComponent = sidebar_item_createNamespace[0],
    sidebar_item_bem = sidebar_item_createNamespace[1];

/* harmony default export */ var sidebar_item = (sidebar_item_createComponent({
  props: _extends({}, routeProps, {
    dot: Boolean,
    title: String,
    badge: [Number, String],
    disabled: Boolean
  }),
  emits: ['click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var route = useRoute();

    var _useParent = useParent(SIDEBAR_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var onClick = function onClick() {
      if (props.disabled) {
        return;
      }

      emit('click', index.value);
      parent.emit('update:modelValue', index.value);
      parent.setActive(index.value);
      route();
    };

    return function () {
      var dot = props.dot,
          badge = props.badge,
          title = props.title,
          disabled = props.disabled;
      var selected = index.value === parent.active();
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("a", {
        "class": sidebar_item_bem({
          select: selected,
          disabled: disabled
        }),
        "onClick": onClick
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_badge, {
        "dot": dot,
        "content": badge,
        "class": sidebar_item_bem('text')
      }, {
        default: function _default() {
          return [slots.title ? slots.title() : title];
        }
      })]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/skeleton/index.js



var skeleton_createNamespace = createNamespace('skeleton'),
    skeleton_createComponent = skeleton_createNamespace[0],
    skeleton_bem = skeleton_createNamespace[1];

var DEFAULT_ROW_WIDTH = '100%';
var DEFAULT_LAST_ROW_WIDTH = '60%';
/* harmony default export */ var skeleton = (skeleton_createComponent({
  props: {
    title: Boolean,
    round: Boolean,
    avatar: Boolean,
    avatarSize: [Number, String],
    titleWidth: [Number, String],
    row: {
      type: [Number, String],
      default: 0
    },
    loading: {
      type: Boolean,
      default: true
    },
    animate: {
      type: Boolean,
      default: true
    },
    avatarShape: {
      type: String,
      default: 'round'
    },
    rowWidth: {
      type: [Number, String, Array],
      default: DEFAULT_ROW_WIDTH
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var renderAvatar = function renderAvatar() {
      if (props.avatar) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": skeleton_bem('avatar', props.avatarShape),
          "style": getSizeStyle(props.avatarSize)
        }, null);
      }
    };

    var renderTitle = function renderTitle() {
      if (props.title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("h3", {
          "class": skeleton_bem('title'),
          "style": {
            width: addUnit(props.titleWidth)
          }
        }, null);
      }
    };

    var getRowWidth = function getRowWidth(index) {
      var rowWidth = props.rowWidth;

      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }

      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }

      return rowWidth;
    };

    var renderRows = function renderRows() {
      var Rows = [];

      for (var i = 0; i < props.row; i++) {
        Rows.push((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": skeleton_bem('row'),
          "style": {
            width: addUnit(getRowWidth(i))
          }
        }, null));
      }

      return Rows;
    };

    return function () {
      if (!props.loading) {
        return slots.default == null ? void 0 : slots.default();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": skeleton_bem({
          animate: props.animate,
          round: props.round
        })
      }, [renderAvatar(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": skeleton_bem('content')
      }, [renderTitle(), renderRows()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/slider/index.js

 // Utils

 // Composition





var slider_createNamespace = createNamespace('slider'),
    slider_createComponent = slider_createNamespace[0],
    slider_bem = slider_createNamespace[1];

/* harmony default export */ var slider = (slider_createComponent({
  props: {
    range: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    vertical: Boolean,
    barHeight: [Number, String],
    buttonSize: [Number, String],
    activeColor: String,
    inactiveColor: String,
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 1
    },
    modelValue: {
      type: [Number, Array],
      default: 0
    }
  },
  emits: ['change', 'drag-end', 'drag-start', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var buttonIndex;
    var startValue;
    var currentValue;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var dragStatus = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var touch = useTouch();
    var scope = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return Number(props.max) - Number(props.min);
    });
    var wrapperStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var _ref2;

      var crossAxis = props.vertical ? 'width' : 'height';
      return _ref2 = {
        background: props.inactiveColor
      }, _ref2[crossAxis] = addUnit(props.barHeight), _ref2;
    });

    var isRange = function isRange(val) {
      return !!props.range && Array.isArray(val);
    }; // 计算选中条的长度百分比


    var calcMainAxis = function calcMainAxis() {
      var modelValue = props.modelValue,
          min = props.min;

      if (isRange(modelValue)) {
        return (modelValue[1] - modelValue[0]) * 100 / scope.value + "%";
      }

      return (modelValue - Number(min)) * 100 / scope.value + "%";
    }; // 计算选中条的开始位置的偏移量


    var calcOffset = function calcOffset() {
      var modelValue = props.modelValue,
          min = props.min;

      if (isRange(modelValue)) {
        return (modelValue[0] - Number(min)) * 100 / scope.value + "%";
      }

      return "0%";
    };

    var barStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var _ref3;

      var mainAxis = props.vertical ? 'height' : 'width';
      return _ref3 = {}, _ref3[mainAxis] = calcMainAxis(), _ref3.left = props.vertical ? undefined : calcOffset(), _ref3.top = props.vertical ? calcOffset() : undefined, _ref3.background = props.activeColor, _ref3.transition = dragStatus.value ? 'none' : undefined, _ref3;
    });

    var format = function format(value) {
      var min = props.min,
          max = props.max,
          step = props.step;
      value = Math.max(+min, Math.min(value, +max));
      return Math.round(value / +step) * +step;
    };

    var isSameValue = function isSameValue(newValue, oldValue) {
      return JSON.stringify(newValue) === JSON.stringify(oldValue);
    }; // 处理两个滑块重叠之后的情况


    var handleOverlap = function handleOverlap(value) {
      if (value[0] > value[1]) {
        return value.slice(0).reverse();
      }

      return value;
    };

    var updateValue = function updateValue(value, end) {
      if (isRange(value)) {
        value = handleOverlap(value).map(format);
      } else {
        value = format(value);
      }

      if (!isSameValue(value, props.modelValue)) {
        emit('update:modelValue', value);
      }

      if (end && !isSameValue(value, startValue)) {
        emit('change', value);
      }
    };

    var onClick = function onClick(event) {
      event.stopPropagation();

      if (props.disabled || props.readonly) {
        return;
      }

      var min = props.min,
          vertical = props.vertical,
          modelValue = props.modelValue;
      var rect = useRect(root);
      var delta = vertical ? event.clientY - rect.top : event.clientX - rect.left;
      var total = vertical ? rect.height : rect.width;
      var value = Number(min) + delta / total * scope.value;

      if (isRange(modelValue)) {
        var left = modelValue[0],
            right = modelValue[1];
        var middle = (left + right) / 2;

        if (value <= middle) {
          updateValue([value, right], true);
        } else {
          updateValue([left, value], true);
        }
      } else {
        updateValue(value, true);
      }
    };

    var onTouchStart = function onTouchStart(event) {
      if (props.disabled || props.readonly) {
        return;
      }

      touch.start(event);
      currentValue = props.modelValue;

      if (isRange(currentValue)) {
        startValue = currentValue.map(format);
      } else {
        startValue = format(currentValue);
      }

      dragStatus.value = 'start';
    };

    var onTouchMove = function onTouchMove(event) {
      if (props.disabled || props.readonly) {
        return;
      }

      if (dragStatus.value === 'start') {
        emit('drag-start');
      }

      preventDefault(event, true);
      touch.move(event);
      dragStatus.value = 'draging';
      var rect = useRect(root);
      var delta = props.vertical ? touch.deltaY.value : touch.deltaX.value;
      var total = props.vertical ? rect.height : rect.width;
      var diff = delta / total * scope.value;

      if (isRange(startValue)) {
        currentValue[buttonIndex] = startValue[buttonIndex] + diff;
      } else {
        currentValue = startValue + diff;
      }

      updateValue(currentValue);
    };

    var onTouchEnd = function onTouchEnd() {
      if (props.disabled || props.readonly) {
        return;
      }

      if (dragStatus.value === 'draging') {
        updateValue(currentValue, true);
        emit('drag-end');
      }

      dragStatus.value = '';
    };

    var renderButton = function renderButton(index) {
      var getClassName = function getClassName() {
        if (typeof index === 'number') {
          var position = ['left', 'right'];
          return "button-wrapper-" + position[index];
        }

        return "button-wrapper";
      };

      var currentValue = typeof index === 'number' ? props.modelValue[index] : props.modelValue;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "slider",
        "class": slider_bem(getClassName()),
        "tabindex": props.disabled || props.readonly ? -1 : 0,
        "aria-valuemin": +props.min,
        "aria-valuenow": currentValue,
        "aria-valuemax": +props.max,
        "aria-orientation": props.vertical ? 'vertical' : 'horizontal',
        "onTouchstart": function onTouchstart(e) {
          if (typeof index === 'number') {
            // save index of current button
            buttonIndex = index;
          }

          onTouchStart(e);
        },
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd,
        "onClick": stopPropagation
      }, [slots.button ? slots.button() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": slider_bem('button'),
        "style": getSizeStyle(props.buttonSize)
      }, null)]);
    }; // format initial value


    updateValue(props.modelValue);
    useLinkField(function () {
      return props.modelValue;
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "style": wrapperStyle.value,
        "class": slider_bem({
          vertical: props.vertical,
          disabled: props.disabled
        }),
        "onClick": onClick
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": slider_bem('bar'),
        "style": barStyle.value
      }, [props.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/steps/index.js




var steps_createNamespace = createNamespace('steps'),
    steps_createComponent = steps_createNamespace[0],
    steps_bem = steps_createNamespace[1];

var STEPS_KEY = 'vanSteps';
/* harmony default export */ var steps = (steps_createComponent({
  props: {
    activeColor: String,
    inactiveIcon: String,
    inactiveColor: String,
    active: {
      type: [Number, String],
      default: 0
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    activeIcon: {
      type: String,
      default: 'checked'
    }
  },
  emits: ['click-step'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var _useChildren = useChildren(STEPS_KEY),
        linkChildren = _useChildren.linkChildren;

    linkChildren({
      emit: emit,
      props: props
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": steps_bem([props.direction])
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": steps_bem('items')
      }, [slots.default == null ? void 0 : slots.default()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/step/index.js








var step_createNamespace = createNamespace('step'),
    step_createComponent = step_createNamespace[0],
    step_bem = step_createNamespace[1];

/* harmony default export */ var step = (step_createComponent({
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useParent = useParent(STEPS_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var parentProps = parent.props;

    var getStatus = function getStatus() {
      var active = +parentProps.active;

      if (index.value < active) {
        return 'finish';
      }

      if (index.value === active) {
        return 'process';
      }
    };

    var isActive = function isActive() {
      return getStatus() === 'process';
    };

    var lineStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return {
        background: getStatus() === 'finish' ? parentProps.activeColor : parentProps.inactiveColor
      };
    });
    var titleStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      if (isActive()) {
        return {
          color: parentProps.activeColor
        };
      }

      if (!getStatus()) {
        return {
          color: parentProps.inactiveColor
        };
      }
    });

    var onClickStep = function onClickStep() {
      parent.emit('click-step', index.value);
    };

    var renderCircle = function renderCircle() {
      var activeIcon = parentProps.activeIcon,
          activeColor = parentProps.activeColor,
          inactiveIcon = parentProps.inactiveIcon;

      if (isActive()) {
        if (slots['active-icon']) {
          return slots['active-icon']();
        }

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "class": step_bem('icon', 'active'),
          "name": activeIcon,
          "color": activeColor
        }, null);
      }

      if (slots['inactive-icon']) {
        return slots['inactive-icon']();
      }

      if (inactiveIcon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "class": step_bem('icon'),
          "name": inactiveIcon
        }, null);
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("i", {
        "class": step_bem('circle'),
        "style": lineStyle.value
      }, null);
    };

    return function () {
      var _ref2;

      var status = getStatus();
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [BORDER, step_bem([parentProps.direction, (_ref2 = {}, _ref2[status] = status, _ref2)])]
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": step_bem('title', {
          active: isActive()
        }),
        "style": titleStyle.value,
        "onClick": onClickStep
      }, [slots.default == null ? void 0 : slots.default()]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": step_bem('circle-container'),
        "onClick": onClickStep
      }, [renderCircle()]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": step_bem('line'),
        "style": lineStyle.value
      }, null)]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/stepper/index.js




 // Utils


 // Composition




var stepper_createNamespace = createNamespace('stepper'),
    stepper_createComponent = stepper_createNamespace[0],
    stepper_bem = stepper_createNamespace[1];

var LONG_PRESS_INTERVAL = 200;
var LONG_PRESS_START_TIME = 600;

function equal(value1, value2) {
  return String(value1) === String(value2);
} // add num and avoid float number


function add(num1, num2) {
  var cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

/* harmony default export */ var stepper = (stepper_createComponent({
  props: {
    theme: String,
    integer: Boolean,
    disabled: Boolean,
    allowEmpty: Boolean,
    modelValue: [Number, String],
    inputWidth: [Number, String],
    buttonSize: [Number, String],
    placeholder: String,
    disablePlus: Boolean,
    disableMinus: Boolean,
    disableInput: Boolean,
    beforeChange: Function,
    decimalLength: [Number, String],
    name: {
      type: [Number, String],
      default: ''
    },
    min: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      default: Infinity
    },
    step: {
      type: [Number, String],
      default: 1
    },
    defaultValue: {
      type: [Number, String],
      default: 1
    },
    showPlus: {
      type: Boolean,
      default: true
    },
    showMinus: {
      type: Boolean,
      default: true
    },
    showInput: {
      type: Boolean,
      default: true
    },
    longPress: {
      type: Boolean,
      default: true
    }
  },
  emits: ['plus', 'blur', 'minus', 'focus', 'change', 'overlimit', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var format = function format(value) {
      var min = props.min,
          max = props.max,
          allowEmpty = props.allowEmpty,
          decimalLength = props.decimalLength;

      if (allowEmpty && value === '') {
        return value;
      }

      value = formatNumber(String(value), !props.integer);
      value = value === '' ? 0 : +value;
      value = number_isNaN(value) ? +min : value;
      value = Math.max(Math.min(+max, value), +min); // format decimal

      if (isDef(decimalLength)) {
        value = value.toFixed(+decimalLength);
      }

      return value;
    };

    var getInitialValue = function getInitialValue() {
      var _props$modelValue;

      var defaultValue = (_props$modelValue = props.modelValue) != null ? _props$modelValue : props.defaultValue;
      var value = format(defaultValue);

      if (!equal(value, props.modelValue)) {
        emit('update:modelValue', value);
      }

      return value;
    };

    var actionType;
    var inputRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var current = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(getInitialValue());
    var minusDisabled = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return props.disabled || props.disableMinus || current.value <= +props.min;
    });
    var plusDisabled = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return props.disabled || props.disablePlus || current.value >= +props.max;
    });
    var inputStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return {
        width: addUnit(props.inputWidth),
        height: addUnit(props.buttonSize)
      };
    });
    var buttonStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return getSizeStyle(props.buttonSize);
    });

    var check = function check() {
      var value = format(current.value);

      if (!equal(value, current.value)) {
        current.value = value;
      }
    };

    var setValue = function setValue(value) {
      if (props.beforeChange) {
        callInterceptor({
          args: [value],
          interceptor: props.beforeChange,
          done: function done() {
            current.value = value;
          }
        });
      } else {
        current.value = value;
      }
    };

    var onChange = function onChange() {
      if (actionType === 'plus' && plusDisabled.value || actionType === 'minus' && minusDisabled.value) {
        emit('overlimit', actionType);
        return;
      }

      var diff = actionType === 'minus' ? -props.step : +props.step;
      var value = format(add(+current.value, diff));
      setValue(value);
      emit(actionType);
    };

    var onInput = function onInput(event) {
      var input = event.target;
      var value = input.value;
      var decimalLength = props.decimalLength;
      var formatted = formatNumber(String(value), !props.integer); // limit max decimal length

      if (isDef(decimalLength) && formatted.indexOf('.') !== -1) {
        var pair = formatted.split('.');
        formatted = pair[0] + "." + pair[1].slice(0, +decimalLength);
      }

      if (props.beforeChange) {
        input.value = String(current.value);
      } else if (!equal(value, formatted)) {
        input.value = formatted;
      } // perfer number type


      var isNumeric = formatted === String(+formatted);
      setValue(isNumeric ? +formatted : formatted);
    };

    var onFocus = function onFocus(event) {
      // readonly not work in lagacy mobile safari
      if (props.disableInput && inputRef.value) {
        inputRef.value.blur();
      } else {
        emit('focus', event);
      }
    };

    var onBlur = function onBlur(event) {
      var input = event.target;
      var value = format(input.value);
      input.value = String(value);
      current.value = value;
      emit('blur', event);
      resetScroll();
    };

    var isLongPress;
    var longPressTimer;

    var longPressStep = function longPressStep() {
      longPressTimer = setTimeout(function () {
        onChange();
        longPressStep();
      }, LONG_PRESS_INTERVAL);
    };

    var onTouchStart = function onTouchStart() {
      if (props.longPress) {
        isLongPress = false;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(function () {
          isLongPress = true;
          onChange();
          longPressStep();
        }, LONG_PRESS_START_TIME);
      }
    };

    var onTouchEnd = function onTouchEnd(event) {
      if (props.longPress) {
        clearTimeout(longPressTimer);

        if (isLongPress) {
          preventDefault(event);
        }
      }
    };

    var onMousedown = function onMousedown(event) {
      // fix mobile safari page scroll down issue
      // see: https://github.com/youzan/vant/issues/7690
      if (props.disableInput) {
        event.preventDefault();
      }
    };

    var createListeners = function createListeners(type) {
      return {
        onClick: function onClick(event) {
          // disable double tap scrolling on mobile safari
          event.preventDefault();
          actionType = type;
          onChange();
        },
        onTouchstart: function onTouchstart() {
          actionType = type;
          onTouchStart();
        },
        onTouchend: onTouchEnd,
        onTouchcancel: onTouchEnd
      };
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([function () {
      return props.max;
    }, function () {
      return props.min;
    }, function () {
      return props.integer;
    }, function () {
      return props.decimalLength;
    }], check);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(function () {
      return props.modelValue;
    }, function (value) {
      if (!equal(value, current.value)) {
        current.value = format(value);
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(current, function (value) {
      emit('update:modelValue', value);
      emit('change', value, {
        name: props.name
      });
    });
    useLinkField(function () {
      return props.modelValue;
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": stepper_bem([props.theme])
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "type": "button",
        "style": buttonStyle.value,
        "class": stepper_bem('minus', {
          disabled: minusDisabled.value
        })
      }, createListeners('minus')), null), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.showMinus]]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("input", {
        "ref": inputRef,
        "type": props.integer ? 'tel' : 'text',
        "role": "spinbutton",
        "class": stepper_bem('input'),
        "value": current.value,
        "style": inputStyle.value,
        "disabled": props.disabled,
        "readonly": props.disableInput,
        "inputmode": props.integer ? 'numeric' : 'decimal',
        "placeholder": props.placeholder,
        "aria-valuemax": +props.max,
        "aria-valuemin": +props.min,
        "aria-valuenow": +current.value,
        "onBlur": onBlur,
        "onInput": onInput,
        "onFocus": onFocus,
        "onMousedown": onMousedown
      }, null), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.showInput]]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "type": "button",
        "style": buttonStyle.value,
        "class": stepper_bem('plus', {
          disabled: plusDisabled.value
        })
      }, createListeners('plus')), null), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.showPlus]])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/submit-bar/index.js






function submit_bar_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var submit_bar_createNamespace = createNamespace('submit-bar'),
    submit_bar_createComponent = submit_bar_createNamespace[0],
    submit_bar_bem = submit_bar_createNamespace[1],
    submit_bar_t = submit_bar_createNamespace[2];

/* harmony default export */ var submit_bar = (submit_bar_createComponent({
  props: {
    tip: String,
    label: String,
    price: Number,
    tipIcon: String,
    loading: Boolean,
    disabled: Boolean,
    textAlign: String,
    buttonText: String,
    buttonColor: String,
    suffixLabel: String,
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    decimalLength: {
      type: [Number, String],
      default: 2
    },
    currency: {
      type: String,
      default: '¥'
    },
    buttonType: {
      type: String,
      default: 'danger'
    }
  },
  emits: ['submit'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var renderText = function renderText() {
      var price = props.price,
          label = props.label,
          currency = props.currency,
          textAlign = props.textAlign,
          suffixLabel = props.suffixLabel,
          decimalLength = props.decimalLength;

      if (typeof price === 'number') {
        var pricePair = (price / 100).toFixed(decimalLength).split('.');
        var decimal = decimalLength ? "." + pricePair[1] : '';
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": submit_bar_bem('text'),
          "style": {
            textAlign: textAlign
          }
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [label || submit_bar_t('label')]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": submit_bar_bem('price')
        }, [currency, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": submit_bar_bem('price-integer')
        }, [pricePair[0]]), decimal]), suffixLabel && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": submit_bar_bem('suffix-label')
        }, submit_bar_isSlot(suffixLabel) ? suffixLabel : {
          default: function _default() {
            return [suffixLabel];
          }
        })]);
      }
    };

    var renderTip = function renderTip() {
      var tip = props.tip,
          tipIcon = props.tipIcon;

      if (slots.tip || tip) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": submit_bar_bem('tip')
        }, [tipIcon && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "class": submit_bar_bem('tip-icon'),
          "name": tipIcon
        }, null), tip && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": submit_bar_bem('tip-text')
        }, submit_bar_isSlot(tip) ? tip : {
          default: function _default() {
            return [tip];
          }
        }), slots.tip == null ? void 0 : slots.tip()]);
      }
    };

    var onClickButton = function onClickButton() {
      emit('submit');
    };

    var renderButton = function renderButton() {
      if (slots.button) {
        return slots.button();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_button, {
        "round": true,
        "type": props.buttonType,
        "text": props.buttonText,
        "class": submit_bar_bem('button', props.buttonType),
        "color": props.buttonColor,
        "loading": props.loading,
        "disabled": props.disabled,
        "onClick": onClickButton
      }, null);
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": submit_bar_bem({
          unfit: !props.safeAreaInsetBottom
        })
      }, [slots.top == null ? void 0 : slots.top(), renderTip(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": submit_bar_bem('bar')
      }, [slots.default == null ? void 0 : slots.default(), renderText(), renderButton()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/swipe-cell/index.js

 // Utils


 // Composition





var swipe_cell_createNamespace = createNamespace('swipe-cell'),
    swipe_cell_createComponent = swipe_cell_createNamespace[0],
    swipe_cell_bem = swipe_cell_createNamespace[1];

/* harmony default export */ var swipe_cell = (swipe_cell_createComponent({
  props: {
    disabled: Boolean,
    leftWidth: [Number, String],
    rightWidth: [Number, String],
    beforeClose: Function,
    stopPropagation: Boolean,
    name: {
      type: [Number, String],
      default: ''
    }
  },
  emits: ['open', 'close', 'click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var opened;
    var lockClick;
    var startOffset;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var leftRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var rightRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      offset: 0,
      dragging: false
    });
    var touch = useTouch();

    var getWidthByRef = function getWidthByRef(ref) {
      return ref.value ? useRect(ref).width : 0;
    };

    var leftWidth = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return +props.leftWidth || getWidthByRef(leftRef);
    });
    var rightWidth = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      return +props.rightWidth || getWidthByRef(rightRef);
    });

    var open = function open(position) {
      opened = true;
      state.offset = position === 'left' ? leftWidth.value : -rightWidth.value;
      emit('open', {
        name: props.name,
        position: position
      });
    };

    var close = function close(position) {
      state.offset = 0;

      if (opened) {
        opened = false;
        emit('close', {
          name: props.name,
          position: position
        });
      }
    };

    var toggle = function toggle(position) {
      var offset = Math.abs(state.offset);
      var THRESHOLD = 0.15;
      var threshold = opened ? 1 - THRESHOLD : THRESHOLD;

      if (position === 'left' || position === 'right') {
        var width = position === 'left' ? leftWidth.value : rightWidth.value;

        if (width && offset > width * threshold) {
          open(position);
          return;
        }
      }

      close();
    };

    var onTouchStart = function onTouchStart(event) {
      if (!props.disabled) {
        startOffset = state.offset;
        touch.start(event);
      }
    };

    var onTouchMove = function onTouchMove(event) {
      if (props.disabled) {
        return;
      }

      var deltaX = touch.deltaX;
      touch.move(event);

      if (touch.isHorizontal()) {
        lockClick = true;
        state.dragging = true;
        var isEdge = !opened || deltaX.value * startOffset < 0;

        if (isEdge) {
          preventDefault(event, props.stopPropagation);
        }

        state.offset = range(deltaX.value + startOffset, -rightWidth.value, leftWidth.value);
      }
    };

    var onTouchEnd = function onTouchEnd() {
      if (state.dragging) {
        state.dragging = false;
        toggle(state.offset > 0 ? 'left' : 'right'); // compatible with desktop scenario

        setTimeout(function () {
          lockClick = false;
        }, 0);
      }
    };

    var onClick = function onClick(position) {
      if (position === void 0) {
        position = 'outside';
      }

      emit('click', position);

      if (opened && !lockClick) {
        callInterceptor({
          interceptor: props.beforeClose,
          args: [{
            name: props.name,
            position: position
          }],
          done: function done() {
            close(position);
          }
        });
      }
    };

    var getClickHandler = function getClickHandler(position, stop) {
      return function (event) {
        if (stop) {
          event.stopPropagation();
        }

        onClick(position);
      };
    };

    var renderSideContent = function renderSideContent(position, ref) {
      if (slots[position]) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "ref": ref,
          "class": swipe_cell_bem(position),
          "onClick": getClickHandler(position, true)
        }, [slots[position]()]);
      }
    };

    useExpose({
      open: open,
      close: close
    });
    useClickAway(root, onClick, {
      eventName: 'touchstart'
    });
    return function () {
      var wrapperStyle = {
        transform: "translate3d(" + state.offset + "px, 0, 0)",
        transitionDuration: state.dragging ? '0s' : '.6s'
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "class": swipe_cell_bem(),
        "onClick": getClickHandler('cell'),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": swipe_cell_bem('wrapper'),
        "style": wrapperStyle
      }, [renderSideContent('left', leftRef), slots.default == null ? void 0 : slots.default(), renderSideContent('right', rightRef)])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/tabbar/index.js

 // Utils



 // Composition




var tabbar_createNamespace = createNamespace('tabbar'),
    tabbar_createComponent = tabbar_createNamespace[0],
    tabbar_bem = tabbar_createNamespace[1];

var TABBAR_KEY = 'vanTabbar';
/* harmony default export */ var tabbar = (tabbar_createComponent({
  props: {
    route: Boolean,
    zIndex: [Number, String],
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function,
    inactiveColor: String,
    modelValue: {
      type: [Number, String],
      default: 0
    },
    border: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: null
    }
  },
  emits: ['change', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var _useChildren = useChildren(TABBAR_KEY),
        linkChildren = _useChildren.linkChildren;

    var renderPlaceholder = usePlaceholder(root, tabbar_bem);

    var isUnfit = function isUnfit() {
      if (isDef(props.safeAreaInsetBottom)) {
        return !props.safeAreaInsetBottom;
      } // enable safe-area-inset-bottom by default when fixed


      return !props.fixed;
    };

    var renderTabbar = function renderTabbar() {
      var _ref2;

      var fixed = props.fixed,
          zIndex = props.zIndex,
          border = props.border;
      var unfit = isUnfit();
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "style": {
          zIndex: zIndex
        },
        "class": [tabbar_bem({
          unfit: unfit,
          fixed: fixed
        }), (_ref2 = {}, _ref2[BORDER_TOP_BOTTOM] = border, _ref2)]
      }, [slots.default == null ? void 0 : slots.default()]);
    };

    var setActive = function setActive(active) {
      if (active !== props.modelValue) {
        callInterceptor({
          interceptor: props.beforeChange,
          args: [active],
          done: function done() {
            emit('update:modelValue', active);
            emit('change', active);
          }
        });
      }
    };

    linkChildren({
      props: props,
      setActive: setActive
    });
    return function () {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderTabbar);
      }

      return renderTabbar();
    };
  }
}));
;// CONCATENATED MODULE: ./es/tabbar-item/index.js




 // Utils

 // Composition


 // Components




function tabbar_item_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var tabbar_item_createNamespace = createNamespace('tabbar-item'),
    tabbar_item_createComponent = tabbar_item_createNamespace[0],
    tabbar_item_bem = tabbar_item_createNamespace[1];

/* harmony default export */ var tabbar_item = (tabbar_item_createComponent({
  props: _extends({}, routeProps, {
    dot: Boolean,
    icon: String,
    name: [Number, String],
    badge: [Number, String],
    iconPrefix: String
  }),
  emits: ['click'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var route = useRoute();
    var vm = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)().proxy;

    var _useParent = useParent(TABBAR_KEY),
        parent = _useParent.parent,
        index = _useParent.index;

    var active = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(function () {
      var _parent$props = parent.props,
          route = _parent$props.route,
          modelValue = _parent$props.modelValue;

      if (route && '$route' in vm) {
        var $route = vm.$route;
        var to = props.to;
        var config = isObject(to) ? to : {
          path: to
        };
        var pathMatched = config.path === $route.path;
        var nameMatched = isDef(config.name) && config.name === $route.name;
        return pathMatched || nameMatched;
      }

      return (props.name || index.value) === modelValue;
    });

    var onClick = function onClick(event) {
      parent.setActive(props.name || index.value);
      emit('click', event);
      route();
    };

    var renderIcon = function renderIcon() {
      if (slots.icon) {
        return slots.icon({
          active: active.value
        });
      }

      if (props.icon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": props.icon,
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    return function () {
      var _slot;

      var dot = props.dot,
          badge = props.badge;
      var _parent$props2 = parent.props,
          activeColor = _parent$props2.activeColor,
          inactiveColor = _parent$props2.inactiveColor;
      var color = active.value ? activeColor : inactiveColor;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": tabbar_item_bem({
          active: active.value
        }),
        "style": {
          color: color
        },
        "onClick": onClick
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_badge, {
        "dot": dot,
        "content": badge,
        "class": tabbar_item_bem('icon')
      }, tabbar_item_isSlot(_slot = renderIcon()) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      }), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": tabbar_item_bem('text')
      }, [slots.default == null ? void 0 : slots.default({
        active: active.value
      })])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/tree-select/index.js

 // Utils

 // Components





function tree_select_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

var tree_select_createNamespace = createNamespace('tree-select'),
    tree_select_createComponent = tree_select_createNamespace[0],
    tree_select_bem = tree_select_createNamespace[1];

/* harmony default export */ var tree_select = (tree_select_createComponent({
  props: {
    max: {
      type: [Number, String],
      default: Infinity
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    height: {
      type: [Number, String],
      default: 300
    },
    activeId: {
      type: [Number, String, Array],
      default: 0
    },
    selectedIcon: {
      type: String,
      default: 'success'
    },
    mainActiveIndex: {
      type: [Number, String],
      default: 0
    }
  },
  emits: ['click-nav', 'click-item', 'update:activeId', 'update:mainActiveIndex'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var isMultiple = function isMultiple() {
      return Array.isArray(props.activeId);
    };

    var isActiveItem = function isActiveItem(id) {
      return isMultiple() ? props.activeId.indexOf(id) !== -1 : props.activeId === id;
    };

    var renderSubItem = function renderSubItem(item) {
      var onClick = function onClick() {
        if (item.disabled) {
          return;
        }

        var activeId;

        if (isMultiple()) {
          activeId = props.activeId.slice();
          var index = activeId.indexOf(item.id);

          if (index !== -1) {
            activeId.splice(index, 1);
          } else if (activeId.length < props.max) {
            activeId.push(item.id);
          }
        } else {
          activeId = item.id;
        }

        emit('update:activeId', activeId);
        emit('click-item', item);
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "key": item.id,
        "class": ['van-ellipsis', tree_select_bem('item', {
          active: isActiveItem(item.id),
          disabled: item.disabled
        })],
        "onClick": onClick
      }, [item.text, isActiveItem(item.id) && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "name": props.selectedIcon,
        "class": tree_select_bem('selected')
      }, null)]);
    };

    var onSidebarChange = function onSidebarChange(index) {
      emit('update:mainActiveIndex', index);
      emit('click-nav', index);
    };

    var renderSidebar = function renderSidebar() {
      var Items = props.items.map(function (item) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(sidebar_item, {
          "dot": item.dot,
          "title": item.text,
          "badge": item.badge,
          "class": [tree_select_bem('nav-item'), item.className],
          "disabled": item.disabled
        }, null);
      });
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(sidebar, {
        "class": tree_select_bem('nav'),
        "modelValue": props.mainActiveIndex,
        "onChange": onSidebarChange
      }, tree_select_isSlot(Items) ? Items : {
        default: function _default() {
          return [Items];
        }
      });
    };

    var renderContent = function renderContent() {
      if (slots.content) {
        return slots.content();
      }

      var selected = props.items[+props.mainActiveIndex] || {};

      if (selected.children) {
        return selected.children.map(renderSubItem);
      }
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": tree_select_bem(),
        "style": {
          height: addUnit(props.height)
        }
      }, [renderSidebar(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": tree_select_bem('content')
      }, [renderContent()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/uploader/shared.js


var uploader_shared_createNamespace = createNamespace('uploader'),
    uploader_shared_createComponent = uploader_shared_createNamespace[0],
    uploader_shared_bem = uploader_shared_createNamespace[1];


;// CONCATENATED MODULE: ./es/uploader/utils.js
function toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  return [item];
}
function readFileContent(file, resultType) {
  return new Promise(function (resolve) {
    if (resultType === 'file') {
      resolve();
      return;
    }

    var reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file);
    } else if (resultType === 'text') {
      reader.readAsText(file);
    }
  });
}
function isOversize(items, maxSize) {
  return toArray(items).some(function (item) {
    return item.file && item.file.size > maxSize;
  });
}
function filterFiles(items, maxSize) {
  var valid = [];
  var invalid = [];
  items.forEach(function (item) {
    if (item.file && item.file.size > maxSize) {
      invalid.push(item);
    } else {
      valid.push(item);
    }
  });
  return {
    valid: valid,
    invalid: invalid
  };
}
var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}
function isImageFile(item) {
  // some special urls cannot be recognized
  // user can add `isImage` flag to mark it as an image url
  if (item.isImage) {
    return true;
  }

  if (item.file && item.file.type) {
    return item.file.type.indexOf('image') === 0;
  }

  if (item.url) {
    return isImageUrl(item.url);
  }

  if (item.content) {
    return item.content.indexOf('data:image') === 0;
  }

  return false;
}
;// CONCATENATED MODULE: ./es/uploader/PreviewItem.js






 // Components





function PreviewItem_isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.isVNode)(s);
}

/* harmony default export */ var PreviewItem = ({
  props: {
    name: String,
    item: Object,
    index: Number,
    imageFit: String,
    lazyLoad: Boolean,
    deletable: Boolean,
    previewSize: [Number, String],
    beforeDelete: Function
  },
  emits: ['delete', 'preview'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var renderMask = function renderMask() {
      var _props$item = props.item,
          status = _props$item.status,
          message = _props$item.message;

      if (status === 'uploading' || status === 'failed') {
        var MaskIcon = status === 'failed' ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": "close",
          "class": uploader_shared_bem('mask-icon')
        }, null) : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_loading, {
          "class": uploader_shared_bem('loading')
        }, null);
        var showMessage = isDef(message) && message !== '';
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": uploader_shared_bem('mask')
        }, [MaskIcon, showMessage && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": uploader_shared_bem('mask-message')
        }, PreviewItem_isSlot(message) ? message : {
          default: function _default() {
            return [message];
          }
        })]);
      }
    };

    var onDelete = function onDelete(event) {
      var name = props.name,
          item = props.item,
          index = props.index,
          beforeDelete = props.beforeDelete;
      event.stopPropagation();
      callInterceptor({
        interceptor: beforeDelete,
        args: [item, {
          name: name,
          index: index
        }],
        done: function done() {
          emit('delete');
        }
      });
    };

    var onPreview = function onPreview() {
      emit('preview');
    };

    var renderDeleteIcon = function renderDeleteIcon() {
      if (props.deletable && props.item.status !== 'uploading') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": uploader_shared_bem('preview-delete'),
          "onClick": onDelete
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
          "name": "cross",
          "class": uploader_shared_bem('preview-delete-icon')
        }, null)]);
      }
    };

    var renderCover = function renderCover() {
      if (slots['preview-cover']) {
        var index = props.index,
            item = props.item;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": uploader_shared_bem('preview-cover')
        }, [slots['preview-cover'](_extends({
          index: index
        }, item))]);
      }
    };

    var renderPreview = function renderPreview() {
      var item = props.item;

      if (isImageFile(item)) {
        var _slot;

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_image, {
          "fit": props.imageFit,
          "src": item.content || item.url,
          "class": uploader_shared_bem('preview-image'),
          "width": props.previewSize,
          "height": props.previewSize,
          "lazyLoad": props.lazyLoad,
          "onClick": onPreview
        }, PreviewItem_isSlot(_slot = renderCover()) ? _slot : {
          default: function _default() {
            return [_slot];
          }
        });
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": uploader_shared_bem('file'),
        "style": getSizeStyle(props.previewSize)
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "class": uploader_shared_bem('file-icon'),
        "name": "description"
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [uploader_shared_bem('file-name'), 'van-ellipsis']
      }, [item.file ? item.file.name : item.url]), renderCover()]);
    };

    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": uploader_shared_bem('preview')
      }, [renderPreview(), renderMask(), renderDeleteIcon()]);
    };
  }
});
;// CONCATENATED MODULE: ./es/uploader/index.js




 // Utils



 // Composition


 // Components




/* harmony default export */ var uploader = (uploader_shared_createComponent({
  props: {
    capture: String,
    multiple: Boolean,
    disabled: Boolean,
    lazyLoad: Boolean,
    uploadText: String,
    afterRead: Function,
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String],
    previewOptions: Object,
    name: {
      type: [Number, String],
      default: ''
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    modelValue: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    maxSize: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    maxCount: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    deletable: {
      type: Boolean,
      default: true
    },
    showUpload: {
      type: Boolean,
      default: true
    },
    previewImage: {
      type: Boolean,
      default: true
    },
    previewFullImage: {
      type: Boolean,
      default: true
    },
    imageFit: {
      type: String,
      default: 'cover'
    },
    resultType: {
      type: String,
      default: 'dataUrl'
    },
    uploadIcon: {
      type: String,
      default: 'photograph'
    }
  },
  emits: ['delete', 'oversize', 'close-preview', 'click-preview', 'update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var inputRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var getDetail = function getDetail(index) {
      if (index === void 0) {
        index = props.modelValue.length;
      }

      return {
        name: props.name,
        index: index
      };
    };

    var resetInput = function resetInput() {
      if (inputRef.value) {
        inputRef.value.value = '';
      }
    };

    var onAfterRead = function onAfterRead(items) {
      resetInput();

      if (isOversize(items, props.maxSize)) {
        if (Array.isArray(items)) {
          var result = filterFiles(items, props.maxSize);
          items = result.valid;
          emit('oversize', result.invalid, getDetail());

          if (!items.length) {
            return;
          }
        } else {
          emit('oversize', items, getDetail());
          return;
        }
      }

      items = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)(items);
      emit('update:modelValue', [].concat(props.modelValue, toArray(items)));

      if (props.afterRead) {
        props.afterRead(items, getDetail());
      }
    };

    var readFile = function readFile(files) {
      var maxCount = props.maxCount,
          modelValue = props.modelValue,
          resultType = props.resultType;

      if (Array.isArray(files)) {
        var remainCount = maxCount - modelValue.length;

        if (files.length > remainCount) {
          files = files.slice(0, remainCount);
        }

        Promise.all(files.map(function (file) {
          return readFileContent(file, resultType);
        })).then(function (contents) {
          var fileList = files.map(function (file, index) {
            var result = {
              file: file,
              status: '',
              message: ''
            };

            if (contents[index]) {
              result.content = contents[index];
            }

            return result;
          });
          onAfterRead(fileList);
        });
      } else {
        readFileContent(files, resultType).then(function (content) {
          var result = {
            file: files,
            status: '',
            message: ''
          };

          if (content) {
            result.content = content;
          }

          onAfterRead(result);
        });
      }
    };

    var onChange = function onChange(event) {
      var files = event.target.files;

      if (props.disabled || !files.length) {
        return;
      }

      files = files.length === 1 ? files[0] : [].slice.call(files);

      if (props.beforeRead) {
        var response = props.beforeRead(files, getDetail());

        if (!response) {
          resetInput();
          return;
        }

        if (isPromise(response)) {
          response.then(function (data) {
            if (data) {
              readFile(data);
            } else {
              readFile(files);
            }
          }).catch(resetInput);
          return;
        }
      }

      readFile(files);
    };

    var imagePreview;

    var onClosePreview = function onClosePreview() {
      emit('close-preview');
    };

    var previewImage = function previewImage(item) {
      if (props.previewFullImage) {
        var imageFiles = props.modelValue.filter(isImageFile);
        var images = imageFiles.map(function (item) {
          return item.content || item.url;
        });
        imagePreview = image_preview(_extends({
          images: images,
          startPosition: imageFiles.indexOf(item),
          onClose: onClosePreview
        }, props.previewOptions));
      }
    };

    var closeImagePreview = function closeImagePreview() {
      if (imagePreview) {
        imagePreview.close();
      }
    };

    var deleteFile = function deleteFile(item, index) {
      var fileList = props.modelValue.slice(0);
      fileList.splice(index, 1);
      emit('update:modelValue', fileList);
      emit('delete', item, getDetail(index));
    };

    var renderPreviewItem = function renderPreviewItem(item, index) {
      var needPickData = ['imageFit', 'deletable', 'previewSize', 'beforeDelete'];
      var previewData = pick(props, needPickData);
      var previewProp = pick(item, needPickData);
      Object.keys(previewProp).forEach(function (item) {
        if (previewProp[item] !== undefined) {
          previewData[item] = previewProp[item];
        }
      });
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(PreviewItem, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "item": item,
        "index": index,
        "onClick": function onClick() {
          emit('click-preview', item, getDetail(index));
        },
        "onDelete": function onDelete() {
          deleteFile(item, index);
        },
        "onPreview": function onPreview() {
          previewImage(item);
        }
      }, pick(props, ['name', 'lazyLoad']), previewData), {
        'preview-cover': slots['preview-cover']
      });
    };

    var renderPreviewList = function renderPreviewList() {
      if (props.previewImage) {
        return props.modelValue.map(renderPreviewItem);
      }
    };

    var renderUpload = function renderUpload() {
      if (props.modelValue.length >= props.maxCount || !props.showUpload) {
        return;
      }

      var Input = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("input", {
        "ref": inputRef,
        "type": "file",
        "class": uploader_shared_bem('input'),
        "accept": props.accept,
        "capture": props.capture,
        "multiple": props.multiple,
        "disabled": props.disabled,
        "onChange": onChange
      }, null);

      if (slots.default) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": uploader_shared_bem('input-wrapper')
        }, [slots.default(), Input]);
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": uploader_shared_bem('upload'),
        "style": getSizeStyle(props.previewSize)
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_icon, {
        "name": props.uploadIcon,
        "class": uploader_shared_bem('upload-icon')
      }, null), props.uploadText && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": uploader_shared_bem('upload-text')
      }, [props.uploadText]), Input]);
    };

    var chooseFile = function chooseFile() {
      if (inputRef.value && !props.disabled) {
        inputRef.value.click();
      }
    };

    useExpose({
      chooseFile: chooseFile,
      closeImagePreview: closeImagePreview
    });
    useLinkField(function () {
      return props.modelValue;
    });
    return function () {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": uploader_shared_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": uploader_shared_bem('wrapper', {
          disabled: props.disabled
        })
      }, [renderPreviewList(), renderUpload()])]);
    };
  }
}));
;// CONCATENATED MODULE: ./es/index.js





















































































var version = '3.0.6';

function install(app) {
  var components = [action_bar, action_bar_button, action_bar_icon, action_sheet, address_edit, address_list, es_area, es_badge, es_button, calendar, card, cascader, cell, cell_group, es_checkbox, checkbox_group, circle, col, collapse, collapse_item, contact_card, contact_edit, contact_list, count_down, es_coupon, coupon_cell, coupon_list, datetime_picker, dialog, divider, dropdown_item, dropdown_menu, empty, es_field, es_form, grid, grid_item, es_icon, es_image, image_preview, index_anchor, index_bar, list, es_loading, locale, nav_bar, notice_bar, notify, number_keyboard, overlay, pagination, password_input, es_picker, popover, popup, progress, pull_refresh, es_radio, radio_group, rate, row, search, share_sheet, sidebar, sidebar_item, skeleton, slider, step, stepper, steps, sticky, submit_bar, swipe, swipe_cell, swipe_item, es_switch, tab, tabbar, tabbar_item, tabs, tag, toast, tree_select, uploader];
  components.forEach(function (item) {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}


/* harmony default export */ var es = ({
  install: install,
  version: version
});

/***/ }),

/***/ 197:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__197__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(618);
/******/ })()
;
});