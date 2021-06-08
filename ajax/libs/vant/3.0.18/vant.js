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
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 197:
/***/ ((module) => {

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
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ActionBar": () => (/* reexport */ action_bar_ActionBar),
  "ActionBarButton": () => (/* reexport */ action_bar_button_ActionBarButton),
  "ActionBarIcon": () => (/* reexport */ action_bar_icon_ActionBarIcon),
  "ActionSheet": () => (/* reexport */ action_sheet_ActionSheet),
  "AddressEdit": () => (/* reexport */ address_edit_AddressEdit),
  "AddressList": () => (/* reexport */ address_list_AddressList),
  "Area": () => (/* reexport */ area_Area),
  "Badge": () => (/* reexport */ badge_Badge),
  "Button": () => (/* reexport */ button_Button),
  "Calendar": () => (/* reexport */ calendar_Calendar),
  "Card": () => (/* reexport */ card_Card),
  "Cascader": () => (/* reexport */ cascader_Cascader),
  "Cell": () => (/* reexport */ cell_Cell),
  "CellGroup": () => (/* reexport */ cell_group_CellGroup),
  "Checkbox": () => (/* reexport */ checkbox_Checkbox),
  "CheckboxGroup": () => (/* reexport */ checkbox_group_CheckboxGroup),
  "Circle": () => (/* reexport */ circle_Circle),
  "Col": () => (/* reexport */ col_Col),
  "Collapse": () => (/* reexport */ collapse_Collapse),
  "CollapseItem": () => (/* reexport */ collapse_item_CollapseItem),
  "ContactCard": () => (/* reexport */ contact_card_ContactCard),
  "ContactEdit": () => (/* reexport */ contact_edit_ContactEdit),
  "ContactList": () => (/* reexport */ contact_list_ContactList),
  "CountDown": () => (/* reexport */ count_down_CountDown),
  "Coupon": () => (/* reexport */ coupon_Coupon),
  "CouponCell": () => (/* reexport */ coupon_cell_CouponCell),
  "CouponList": () => (/* reexport */ coupon_list_CouponList),
  "DatetimePicker": () => (/* reexport */ datetime_picker_DatetimePicker),
  "Dialog": () => (/* reexport */ function_call_Dialog),
  "Divider": () => (/* reexport */ divider_Divider),
  "DropdownItem": () => (/* reexport */ dropdown_item_DropdownItem),
  "DropdownMenu": () => (/* reexport */ dropdown_menu_DropdownMenu),
  "Empty": () => (/* reexport */ empty_Empty),
  "Field": () => (/* reexport */ field_Field),
  "Form": () => (/* reexport */ form_Form),
  "Grid": () => (/* reexport */ grid_Grid),
  "GridItem": () => (/* reexport */ grid_item_GridItem),
  "Icon": () => (/* reexport */ icon_Icon),
  "Image": () => (/* reexport */ es_image_Image),
  "ImagePreview": () => (/* reexport */ function_call_ImagePreview),
  "IndexAnchor": () => (/* reexport */ index_anchor_IndexAnchor),
  "IndexBar": () => (/* reexport */ index_bar_IndexBar),
  "Lazyload": () => (/* reexport */ esm_Lazyload),
  "List": () => (/* reexport */ list_List),
  "Loading": () => (/* reexport */ loading_Loading),
  "Locale": () => (/* reexport */ Locale),
  "NavBar": () => (/* reexport */ nav_bar_NavBar),
  "NoticeBar": () => (/* reexport */ notice_bar_NoticeBar),
  "Notify": () => (/* reexport */ function_call_Notify),
  "NumberKeyboard": () => (/* reexport */ number_keyboard_NumberKeyboard),
  "Overlay": () => (/* reexport */ overlay_Overlay),
  "Pagination": () => (/* reexport */ pagination_Pagination),
  "PasswordInput": () => (/* reexport */ password_input_PasswordInput),
  "Picker": () => (/* reexport */ picker_Picker),
  "Popover": () => (/* reexport */ popover_Popover),
  "Popup": () => (/* reexport */ popup_Popup),
  "Progress": () => (/* reexport */ progress_Progress),
  "PullRefresh": () => (/* reexport */ pull_refresh_PullRefresh),
  "Radio": () => (/* reexport */ radio_Radio),
  "RadioGroup": () => (/* reexport */ radio_group_RadioGroup),
  "Rate": () => (/* reexport */ rate_Rate),
  "Row": () => (/* reexport */ row_Row),
  "Search": () => (/* reexport */ search_Search),
  "ShareSheet": () => (/* reexport */ share_sheet_ShareSheet),
  "Sidebar": () => (/* reexport */ sidebar_Sidebar),
  "SidebarItem": () => (/* reexport */ sidebar_item_SidebarItem),
  "Skeleton": () => (/* reexport */ skeleton_Skeleton),
  "Slider": () => (/* reexport */ slider_Slider),
  "Step": () => (/* reexport */ step_Step),
  "Stepper": () => (/* reexport */ stepper_Stepper),
  "Steps": () => (/* reexport */ steps_Steps),
  "Sticky": () => (/* reexport */ sticky_Sticky),
  "SubmitBar": () => (/* reexport */ submit_bar_SubmitBar),
  "Swipe": () => (/* reexport */ swipe_Swipe),
  "SwipeCell": () => (/* reexport */ swipe_cell_SwipeCell),
  "SwipeItem": () => (/* reexport */ swipe_item_SwipeItem),
  "Switch": () => (/* reexport */ switch_Switch),
  "Tab": () => (/* reexport */ tab_Tab),
  "Tabbar": () => (/* reexport */ tabbar_Tabbar),
  "TabbarItem": () => (/* reexport */ tabbar_item_TabbarItem),
  "Tabs": () => (/* reexport */ tabs_Tabs),
  "Tag": () => (/* reexport */ tag_Tag),
  "Toast": () => (/* reexport */ function_call_Toast),
  "TreeSelect": () => (/* reexport */ tree_select_TreeSelect),
  "Uploader": () => (/* reexport */ uploader_Uploader),
  "default": () => (/* binding */ es),
  "install": () => (/* binding */ install),
  "version": () => (/* binding */ version)
});

;// CONCATENATED MODULE: ./es/utils/format/string.js
var camelizeRE = /-(\w)/g;
function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}
function padZero(num, targetLength = 2) {
  var str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}
;// CONCATENATED MODULE: ./es/utils/with-install.js
 // https://github.com/youzan/vant/issues/8302
// using any here because tsc will generate some weird results when using generics

function withInstall(options) {
  options.install = app => {
    var {
      name
    } = options;
    app.component(name, options);
    app.component(camelize("-" + name), options);
  };

  return options;
}
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
    return mods.reduce((ret, item) => ret + gen(name, item), '');
  }

  return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? gen(name, key) : ''), '');
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
;// CONCATENATED MODULE: ./es/utils/base.js
function noop() {}
var extend = Object.assign;
var inBrowser = typeof window !== 'undefined'; // PropTypes

var unknownProp = null;
var truthProp = {
  type: Boolean,
  default: true
}; // eslint-disable-next-line

function get(object, path) {
  var keys = path.split('.');
  var result = object;
  keys.forEach(key => {
    var _result$key;

    result = (_result$key = result[key]) != null ? _result$key : '';
  });
  return result;
}
function pick(obj, keys, ignoreUndefined) {
  return keys.reduce((ret, key) => {
    if (!ignoreUndefined || obj[key] !== undefined) {
      ret[key] = obj[key];
    }

    return ret;
  }, {});
}
;// CONCATENATED MODULE: ./es/utils/validate.js

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
function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]' && !Number.isNaN(val.getTime());
}
function isMobile(value) {
  value = value.replace(/[^-|\d]/g, '');
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}
function isNumeric(val) {
  return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);
}
function isAndroid() {
  return inBrowser ? /android/.test(navigator.userAgent.toLowerCase()) : false;
}
function isIOS() {
  return inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
}
;// CONCATENATED MODULE: ./es/utils/deep-assign.js

var {
  hasOwnProperty: deep_assign_hasOwnProperty
} = Object.prototype;

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
  Object.keys(from).forEach(key => {
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
    monthTitle: (year, month) => year + "\u5E74" + month + "\u6708",
    rangePrompt: maxRange => "\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 " + maxRange + " \u5929"
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
    discount: discount => discount + "\u6298",
    condition: condition => "\u6EE1" + condition + "\u5143\u53EF\u7528"
  },
  vanCouponCell: {
    title: '优惠券',
    tips: '暂无可用',
    count: count => count + "\u5F20\u53EF\u7528"
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
var messages = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
  'zh-CN': zh_CN
});
var Locale = {
  messages() {
    return messages[lang.value];
  },

  use(newLang, newMessages) {
    lang.value = newLang;
    this.add({
      [newLang]: newMessages
    });
  },

  add(newMessages = {}) {
    deepAssign(messages, newMessages);
  }

};
/* harmony default export */ var locale = (Locale);

;// CONCATENATED MODULE: ./es/utils/create/translate.js




function createTranslate(name) {
  var prefix = camelize(name) + '.';
  return function (path, ...args) {
    var messages = locale.messages();
    var message = get(messages, prefix + path) || get(messages, path);
    return isFunction(message) ? message(...args) : message;
  };
}
;// CONCATENATED MODULE: ./es/utils/create/index.js


function createNamespace(name) {
  var prefixedName = "van-" + name;
  return [prefixedName, createBEM(prefixedName), createTranslate(prefixedName)];
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useRelation/useChildren.js

function flattenVNodes(children) {
  var result = [];

  var traverse = children => {
    if (Array.isArray(children)) {
      children.forEach(child => {
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
  internalChildren.sort((a, b) => vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode));
  var orderedPublicChildren = internalChildren.map(item => item.proxy);
  publicChildren.sort((a, b) => {
    var indexA = orderedPublicChildren.indexOf(a);
    var indexB = orderedPublicChildren.indexOf(b);
    return indexA - indexB;
  });
}
function useChildren(key) {
  var publicChildren = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)([]);
  var internalChildren = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)([]);
  var parent = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)();

  var linkChildren = value => {
    var link = child => {
      if (child.proxy) {
        internalChildren.push(child);
        publicChildren.push(child.proxy);
        sortChildren(parent, publicChildren, internalChildren);
      }
    };

    var unlink = child => {
      var index = internalChildren.indexOf(child);
      publicChildren.splice(index, 1);
      internalChildren.splice(index, 1);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.provide)(key, Object.assign({
      link,
      unlink,
      children: publicChildren,
      internalChildren
    }, value));
  };

  return {
    children: publicChildren,
    linkChildren
  };
}
;// CONCATENATED MODULE: ./es/action-bar/ActionBar.js




var [ActionBar_name, bem] = createNamespace('action-bar');
var ACTION_BAR_KEY = Symbol(ActionBar_name);
/* harmony default export */ var ActionBar = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: ActionBar_name,
  props: {
    safeAreaInsetBottom: truthProp
  },

  setup(props, {
    slots
  }) {
    var {
      linkChildren
    } = useChildren(ACTION_BAR_KEY);
    linkChildren();
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": bem({
        unfit: !props.safeAreaInsetBottom
      })
    }, [slots.default == null ? void 0 : slots.default()]);
  }

}));
;// CONCATENATED MODULE: ./es/action-bar/index.js


var action_bar_ActionBar = withInstall(ActionBar);
/* harmony default export */ var action_bar = ((/* unused pure expression or super */ null && (action_bar_ActionBar)));

;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useRelation/useParent.js

function useParent(key) {
  var parent = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.inject)(key, null);

  if (parent) {
    var instance = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)();
    var {
      link: _link,
      unlink: _unlink,
      internalChildren
    } = parent;

    _link(instance);

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onUnmounted)(() => _unlink(instance));
    var index = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => internalChildren.indexOf(instance));
    return {
      parent,
      index
    };
  }

  return {
    parent: null,
    index: (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(-1)
  };
}
;// CONCATENATED MODULE: ./es/composables/use-expose.js

 // expose public api

function useExpose(apis) {
  var instance = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)();

  if (instance) {
    extend(instance.proxy, apis);
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
  var {
    to,
    url,
    replace
  } = vm;

  if (to && router) {
    router[replace ? 'replace' : 'push'](to);
  } else if (url) {
    replace ? location.replace(url) : location.href = url;
  }
}
function useRoute() {
  var vm = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)().proxy;
  return () => route(vm);
}
;// CONCATENATED MODULE: ./es/utils/constant.js
// border
var BORDER = 'van-hairline';
var BORDER_TOP = BORDER + "--top";
var BORDER_LEFT = BORDER + "--left";
var BORDER_BOTTOM = BORDER + "--bottom";
var BORDER_SURROUND = BORDER + "--surround";
var BORDER_TOP_BOTTOM = BORDER + "--top-bottom";
var BORDER_UNSET_TOP_BOTTOM = BORDER + "-unset--top-bottom";
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
}
function getZIndexStyle(zIndex) {
  var style = {};

  if (zIndex !== undefined) {
    style.zIndex = +zIndex;
  }

  return style;
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
    if (value.includes('rem')) {
      return convertRem(value);
    }

    if (value.includes('vw')) {
      return convertVw(value);
    }

    if (value.includes('vh')) {
      return convertVh(value);
    }
  }

  return parseFloat(value);
}
;// CONCATENATED MODULE: ./es/badge/Badge.js



var [Badge_name, Badge_bem] = createNamespace('badge');
/* harmony default export */ var Badge = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Badge_name,
  props: {
    dot: Boolean,
    max: [Number, String],
    color: String,
    offset: Array,
    content: [Number, String],
    showZero: truthProp,
    tag: {
      type: String,
      default: 'div'
    }
  },

  setup(props, {
    slots
  }) {
    var hasContent = () => {
      if (slots.content) {
        return true;
      }

      var {
        content,
        showZero
      } = props;
      return isDef(content) && content !== '' && (showZero || content !== 0);
    };

    var renderContent = () => {
      var {
        dot,
        max,
        content
      } = props;

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

    var renderBadge = () => {
      if (hasContent() || props.dot) {
        var style = {
          background: props.color
        };

        if (props.offset) {
          var [x, y] = props.offset;

          if (slots.default) {
            style.top = addUnit(y);
            style.right = "-" + addUnit(x);
          } else {
            style.marginTop = addUnit(y);
            style.marginLeft = addUnit(x);
          }
        }

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Badge_bem({
            dot: props.dot,
            fixed: !!slots.default
          }),
          "style": style
        }, [renderContent()]);
      }
    };

    return () => {
      if (slots.default) {
        var {
          tag
        } = props;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag, {
          "class": Badge_bem('wrapper')
        }, {
          default: () => [slots.default(), renderBadge()]
        });
      }

      return renderBadge();
    };
  }

}));
;// CONCATENATED MODULE: ./es/badge/index.js


var badge_Badge = withInstall(Badge);
/* harmony default export */ var badge = ((/* unused pure expression or super */ null && (badge_Badge)));

;// CONCATENATED MODULE: ./es/icon/Icon.js




var [Icon_name, Icon_bem] = createNamespace('icon');

function isImage(name) {
  return name ? name.includes('/') : false;
}

/* harmony default export */ var Icon = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Icon_name,
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
      default: Icon_bem()
    }
  },

  setup(props, {
    slots
  }) {
    return () => {
      var {
        tag,
        dot,
        name,
        size,
        badge,
        color,
        classPrefix
      } = props;
      var isImageIcon = isImage(name);
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(badge_Badge, {
        "dot": dot,
        "tag": tag,
        "content": badge,
        "class": [classPrefix, isImageIcon ? '' : classPrefix + "-" + name],
        "style": {
          color,
          fontSize: addUnit(size)
        }
      }, {
        default: () => [slots.default == null ? void 0 : slots.default(), isImageIcon && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("img", {
          "class": Icon_bem('image'),
          "src": name
        }, null)]
      });
    };
  }

}));
;// CONCATENATED MODULE: ./es/icon/index.js


var icon_Icon = withInstall(Icon);
/* harmony default export */ var icon = ((/* unused pure expression or super */ null && (icon_Icon)));

;// CONCATENATED MODULE: ./es/loading/Loading.js



var [Loading_name, Loading_bem] = createNamespace('loading');
var SpinIcon = Array(12).fill((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("i", null, null));

var CircularIcon = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("svg", {
  "class": Loading_bem('circular'),
  "viewBox": "25 25 50 50"
}, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("circle", {
  "cx": "50",
  "cy": "50",
  "r": "20",
  "fill": "none"
}, null)]);

/* harmony default export */ var Loading = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Loading_name,
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

  setup(props, {
    slots
  }) {
    var spinnerStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => extend({
      color: props.color
    }, getSizeStyle(props.size)));

    var renderText = () => {
      if (slots.default) {
        var _props$textColor;

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": Loading_bem('text'),
          "style": {
            fontSize: addUnit(props.textSize),
            color: (_props$textColor = props.textColor) != null ? _props$textColor : props.color
          }
        }, [slots.default()]);
      }
    };

    return () => {
      var {
        type,
        vertical
      } = props;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Loading_bem([type, {
          vertical
        }])
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": Loading_bem('spinner', type),
        "style": spinnerStyle.value
      }, [type === 'spinner' ? SpinIcon : CircularIcon]), renderText()]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/loading/index.js


var loading_Loading = withInstall(Loading);
/* harmony default export */ var loading = ((/* unused pure expression or super */ null && (loading_Loading)));

;// CONCATENATED MODULE: ./es/button/Button.js

 // Utils



 // Components



var [Button_name, Button_bem] = createNamespace('button');
/* harmony default export */ var Button = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Button_name,
  props: extend({}, routeProps, {
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
    loadingSize: String,
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
    iconPosition: {
      type: String,
      default: 'left'
    }
  }),
  emits: ['click'],

  setup(props, {
    emit,
    slots
  }) {
    var route = useRoute();

    var renderLoadingIcon = () => {
      if (slots.loading) {
        return slots.loading();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(loading_Loading, {
        "size": props.loadingSize,
        "type": props.loadingType,
        "class": Button_bem('loading')
      }, null);
    };

    var renderIcon = () => {
      if (props.loading) {
        return renderLoadingIcon();
      }

      if (slots.icon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Button_bem('icon')
        }, [slots.icon()]);
      }

      if (props.icon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": props.icon,
          "class": Button_bem('icon'),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    var renderText = () => {
      var text;

      if (props.loading) {
        text = props.loadingText;
      } else {
        text = slots.default ? slots.default() : props.text;
      }

      if (text) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": Button_bem('text')
        }, [text]);
      }
    };

    var getStyle = () => {
      var {
        color,
        plain
      } = props;

      if (color) {
        var style = {
          color: plain ? color : 'white'
        };

        if (!plain) {
          // Use background instead of backgroundColor to make linear-gradient work
          style.background = color;
        } // hide border when color is linear-gradient


        if (color.includes('gradient')) {
          style.border = 0;
        } else {
          style.borderColor = color;
        }

        return style;
      }
    };

    var onClick = event => {
      if (props.loading) {
        event.preventDefault();
      } else if (!props.disabled) {
        emit('click', event);
        route();
      }
    };

    return () => {
      var {
        tag,
        type,
        size,
        block,
        round,
        plain,
        square,
        loading,
        disabled,
        hairline,
        nativeType,
        iconPosition
      } = props;
      var classes = [Button_bem([type, size, {
        plain,
        block,
        round,
        square,
        loading,
        disabled,
        hairline
      }]), {
        [BORDER_SURROUND]: hairline
      }];
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag, {
        "type": nativeType,
        "class": classes,
        "style": getStyle(),
        "disabled": disabled,
        "onClick": onClick
      }, {
        default: () => [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Button_bem('content')
        }, [iconPosition === 'left' && renderIcon(), renderText(), iconPosition === 'right' && renderIcon()])]
      });
    };
  }

}));
;// CONCATENATED MODULE: ./es/button/index.js


var button_Button = withInstall(Button);
/* harmony default export */ var es_button = ((/* unused pure expression or super */ null && (button_Button)));

;// CONCATENATED MODULE: ./es/action-bar-button/ActionBarButton.js



 // Composables



 // Components


var [ActionBarButton_name, ActionBarButton_bem] = createNamespace('action-bar-button');
/* harmony default export */ var ActionBarButton = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: ActionBarButton_name,
  props: extend({}, routeProps, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean
  }),

  setup(props, {
    slots
  }) {
    var route = useRoute();
    var {
      parent,
      index
    } = useParent(ACTION_BAR_KEY);
    var isFirst = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (parent) {
        var prev = parent.children[index.value - 1];
        return !(prev && 'isButton' in prev);
      }
    });
    var isLast = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (parent) {
        var next = parent.children[index.value + 1];
        return !(next && 'isButton' in next);
      }
    });
    useExpose({
      isButton: true
    });
    return () => {
      var {
        type,
        icon,
        text,
        color,
        loading,
        disabled
      } = props;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
        "class": ActionBarButton_bem([type, {
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
        default: () => [slots.default ? slots.default() : text]
      });
    };
  }

}));
;// CONCATENATED MODULE: ./es/action-bar-button/index.js


var action_bar_button_ActionBarButton = withInstall(ActionBarButton);
/* harmony default export */ var action_bar_button = ((/* unused pure expression or super */ null && (action_bar_button_ActionBarButton)));

;// CONCATENATED MODULE: ./es/action-bar-icon/ActionBarIcon.js



 // Composables


 // Components



var [ActionBarIcon_name, ActionBarIcon_bem] = createNamespace('action-bar-icon');
/* harmony default export */ var ActionBarIcon = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: ActionBarIcon_name,
  props: extend({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    color: String,
    badge: [Number, String],
    iconClass: unknownProp,
    iconPrefix: String
  }),

  setup(props, {
    slots
  }) {
    var route = useRoute();
    useParent(ACTION_BAR_KEY);

    var renderIcon = () => {
      var {
        dot,
        badge,
        icon,
        color,
        iconClass,
        iconPrefix
      } = props;

      if (slots.icon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(badge_Badge, {
          "dot": dot,
          "content": badge,
          "class": ActionBarIcon_bem('icon')
        }, {
          default: () => [slots.icon()]
        });
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "tag": "div",
        "dot": dot,
        "name": icon,
        "badge": badge,
        "color": color,
        "class": [ActionBarIcon_bem('icon'), iconClass],
        "classPrefix": iconPrefix
      }, null);
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "role": "button",
      "class": ActionBarIcon_bem(),
      "tabindex": 0,
      "onClick": route
    }, [renderIcon(), slots.default ? slots.default() : props.text]);
  }

}));
;// CONCATENATED MODULE: ./es/action-bar-icon/index.js


var action_bar_icon_ActionBarIcon = withInstall(ActionBarIcon);
/* harmony default export */ var action_bar_icon = ((/* unused pure expression or super */ null && (action_bar_icon_ActionBarIcon)));

;// CONCATENATED MODULE: ./es/popup/shared.js

var popupSharedProps = {
  // whether to show popup
  show: Boolean,
  // z-index
  zIndex: [Number, String],
  // whether to show overlay
  overlay: truthProp,
  // transition duration
  duration: [Number, String],
  // teleport
  teleport: [String, Object],
  // prevent body scroll
  lockScroll: truthProp,
  // whether to lazy render
  lazyRender: truthProp,
  // overlay custom style
  overlayStyle: Object,
  // overlay custom class name
  overlayClass: unknownProp,
  // Initial rendering animation
  transitionAppear: Boolean,
  // whether to close popup when overlay is clicked
  closeOnClickOverlay: truthProp
};
var popupSharedPropKeys = Object.keys(popupSharedProps);
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/onMountedOrActivated/index.js

function onMountedOrActivated(hook) {
  var mounted;
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(() => {
    hook();
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
      mounted = true;
    });
  });
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onActivated)(() => {
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
  raf(() => raf(fn));
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useEventListener/index.js


 // eslint-disable-next-line

var supportsPassive = false;

if (utils_inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get() {
        supportsPassive = true;
      }

    });
    window.addEventListener('test-passive', null, opts); // eslint-disable-next-line no-empty
  } catch (e) {}
}

function useEventListener(type, listener, options = {}) {
  if (!utils_inBrowser) {
    return;
  }

  var {
    target = window,
    passive = false,
    capture = false
  } = options;
  var attached;

  var add = () => {
    var element = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.unref)(target);

    if (element && !attached) {
      element.addEventListener(type, listener, supportsPassive ? {
        capture,
        passive
      } : capture);
      attached = true;
    }
  };

  var remove = () => {
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
var defaultRoot = utils_inBrowser ? window : undefined;

function isElement(node) {
  var ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
} // https://github.com/youzan/vant/issues/3823


function getScrollParent(el, root = defaultRoot) {
  var node = el;

  while (node && node !== root && isElement(node)) {
    var {
      overflowY
    } = window.getComputedStyle(node);

    if (overflowScrollReg.test(overflowY)) {
      return node;
    }

    node = node.parentNode;
  }

  return root;
}
function useScrollParent(el, root = defaultRoot) {
  var scrollParent = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(() => {
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

  var isVertical = () => direction.value === 'vertical';

  var isHorizontal = () => direction.value === 'horizontal';

  var reset = () => {
    deltaX.value = 0;
    deltaY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
    direction.value = '';
  };

  var start = event => {
    reset();
    startX.value = event.touches[0].clientX;
    startY.value = event.touches[0].clientY;
  };

  var move = event => {
    var touch = event.touches[0]; // Fix: Safari back will set clientX to negative number

    deltaX.value = touch.clientX < 0 ? 0 : touch.clientX - startX.value;
    deltaY.value = touch.clientY - startY.value;
    offsetX.value = Math.abs(deltaX.value);
    offsetY.value = Math.abs(deltaY.value);

    if (!direction.value) {
      direction.value = getDirection(offsetX.value, offsetY.value);
    }
  };

  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal
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

  var onTouchMove = event => {
    touch.move(event);
    var direction = touch.deltaY.value > 0 ? '10' : '01';
    var el = getScrollParent(event.target, rootRef.value);
    var {
      scrollHeight,
      offsetHeight,
      scrollTop
    } = el;
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

  var lock = () => {
    document.addEventListener('touchstart', touch.start);
    document.addEventListener('touchmove', onTouchMove, supportsPassive ? {
      passive: false
    } : false);

    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }

    totalLockCount++;
  };

  var unlock = () => {
    if (totalLockCount) {
      document.removeEventListener('touchstart', touch.start);
      document.removeEventListener('touchmove', onTouchMove);
      totalLockCount--;

      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };

  var init = () => {
    if (shouldLock()) {
      lock();
    }
  };

  var destroy = () => {
    if (shouldLock()) {
      unlock();
    }
  };

  onMountedOrActivated(init);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onDeactivated)(destroy);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(destroy);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(shouldLock, value => {
    value ? lock() : unlock();
  });
}
;// CONCATENATED MODULE: ./es/composables/use-lazy-render.js

function useLazyRender(show) {
  var inited = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(false);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(show, value => {
    if (value) {
      inited.value = value;
    }
  }, {
    immediate: true
  });
  return render => () => inited.value ? render() : null;
}
;// CONCATENATED MODULE: ./es/composables/on-popup-reopen.js
 // eslint-disable-next-line

var POPUP_TOGGLE_KEY = Symbol();
function onPopupReopen(callback) {
  var popupToggleStatus = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.inject)(POPUP_TOGGLE_KEY, null);

  if (popupToggleStatus) {
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(popupToggleStatus, show => {
      if (show) {
        callback();
      }
    });
  }
}
;// CONCATENATED MODULE: ./es/overlay/Overlay.js




var [Overlay_name, Overlay_bem] = createNamespace('overlay');
/* harmony default export */ var Overlay = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Overlay_name,
  props: {
    show: Boolean,
    zIndex: [Number, String],
    duration: [Number, String],
    className: unknownProp,
    lockScroll: truthProp,
    customStyle: Object
  },

  setup(props, {
    slots
  }) {
    var lazyRender = useLazyRender(() => props.show);

    var preventTouchMove = event => {
      preventDefault(event, true);
    };

    var renderOverlay = lazyRender(() => {
      var style = extend(getZIndexStyle(props.zIndex), props.customStyle);

      if (isDef(props.duration)) {
        style.animationDuration = props.duration + "s";
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "style": style,
        "class": [Overlay_bem(), props.className],
        "onTouchmove": props.lockScroll ? preventTouchMove : noop
      }, [slots.default == null ? void 0 : slots.default()]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.show]]);
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Transition, {
      "name": "van-fade"
    }, {
      default: () => [renderOverlay()]
    });
  }

}));
;// CONCATENATED MODULE: ./es/overlay/index.js


var overlay_Overlay = withInstall(Overlay);
/* harmony default export */ var overlay = ((/* unused pure expression or super */ null && (overlay_Overlay)));

;// CONCATENATED MODULE: ./es/popup/Popup.js

 // Utils


 // Composables





 // Components



var [Popup_name, Popup_bem] = createNamespace('popup');
var globalZIndex = 2000;
/* harmony default export */ var Popup = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Popup_name,
  inheritAttrs: false,
  props: extend({}, popupSharedProps, {
    round: Boolean,
    closeable: Boolean,
    transition: String,
    iconPrefix: String,
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

  setup(props, {
    emit,
    attrs,
    slots
  }) {
    var opened;
    var shouldReopen;
    var zIndex = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var popupRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var lazyRender = useLazyRender(() => props.show || !props.lazyRender);
    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var style = {
        zIndex: zIndex.value
      };

      if (isDef(props.duration)) {
        var key = props.position === 'center' ? 'animationDuration' : 'transitionDuration';
        style[key] = props.duration + "s";
      }

      return style;
    });

    var open = () => {
      if (!opened) {
        if (props.zIndex !== undefined) {
          globalZIndex = +props.zIndex;
        }

        opened = true;
        zIndex.value = ++globalZIndex;
      }
    };

    var close = () => {
      if (opened) {
        opened = false;
        emit('update:show', false);
      }
    };

    var onClickOverlay = event => {
      emit('click-overlay', event);

      if (props.closeOnClickOverlay) {
        close();
      }
    };

    var renderOverlay = () => {
      if (props.overlay) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(overlay_Overlay, {
          "show": props.show,
          "class": props.overlayClass,
          "zIndex": zIndex.value,
          "duration": props.duration,
          "customStyle": props.overlayStyle,
          "onClick": onClickOverlay
        }, {
          default: slots['overlay-content']
        });
      }
    };

    var onClickCloseIcon = event => {
      emit('click-close-icon', event);
      close();
    };

    var renderCloseIcon = () => {
      if (props.closeable) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "role": "button",
          "tabindex": 0,
          "name": props.closeIcon,
          "class": Popup_bem('close-icon', props.closeIconPosition),
          "classPrefix": props.iconPrefix,
          "onClick": onClickCloseIcon
        }, null);
      }
    };

    var onClick = event => emit('click', event);

    var onOpened = () => emit('opened');

    var onClosed = () => emit('closed');

    var renderPopup = lazyRender(() => {
      var {
        round,
        position,
        safeAreaInsetBottom
      } = props;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": popupRef,
        "style": style.value,
        "class": Popup_bem({
          round,
          [position]: position,
          'safe-area-inset-bottom': safeAreaInsetBottom
        }),
        "onClick": onClick
      }, attrs), [slots.default == null ? void 0 : slots.default(), renderCloseIcon()]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.show]]);
    });

    var renderTransition = () => {
      var {
        position,
        transition,
        transitionAppear
      } = props;
      var name = position === 'center' ? 'van-fade' : "van-popup-slide-" + position;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Transition, {
        "name": transition || name,
        "appear": transitionAppear,
        "onAfterEnter": onOpened,
        "onAfterLeave": onClosed
      }, {
        default: () => [renderPopup()]
      });
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.show, value => {
      if (value) {
        open();
        emit('open');
      } else {
        close();
        emit('close');
      }
    });
    useExpose({
      popupRef
    });
    useLockScroll(popupRef, () => props.show && props.lockScroll);
    useEventListener('popstate', () => {
      if (props.closeOnPopstate) {
        close();
        shouldReopen = false;
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(() => {
      if (props.show) {
        open();
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onActivated)(() => {
      if (shouldReopen) {
        emit('update:show', true);
        shouldReopen = false;
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onDeactivated)(() => {
      if (props.show) {
        close();
        shouldReopen = true;
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.provide)(POPUP_TOGGLE_KEY, () => props.show);
    return () => {
      if (props.teleport) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Teleport, {
          "to": props.teleport
        }, {
          default: () => [renderOverlay(), renderTransition()]
        });
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Fragment, null, [renderOverlay(), renderTransition()]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/popup/index.js


var popup_Popup = withInstall(Popup);
/* harmony default export */ var popup = ((/* unused pure expression or super */ null && (popup_Popup)));

;// CONCATENATED MODULE: ./es/action-sheet/ActionSheet.js

 // Utils

 // Components





var [ActionSheet_name, ActionSheet_bem] = createNamespace('action-sheet');
/* harmony default export */ var ActionSheet = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: ActionSheet_name,
  props: extend({}, popupSharedProps, {
    title: String,
    round: truthProp,
    actions: Array,
    closeable: truthProp,
    cancelText: String,
    description: String,
    closeOnPopstate: Boolean,
    closeOnClickAction: Boolean,
    safeAreaInsetBottom: truthProp,
    closeIcon: {
      type: String,
      default: 'cross'
    }
  }),
  emits: ['select', 'cancel', 'update:show'],

  setup(props, {
    slots,
    emit
  }) {
    var updateShow = show => emit('update:show', show);

    var onCancel = () => {
      updateShow(false);
      emit('cancel');
    };

    var renderHeader = () => {
      if (props.title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": ActionSheet_bem('header')
        }, [props.title, props.closeable && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": props.closeIcon,
          "class": ActionSheet_bem('close'),
          "onClick": onCancel
        }, null)]);
      }
    };

    var renderCancel = () => {
      if (slots.cancel || props.cancelText) {
        return [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": ActionSheet_bem('gap')
        }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
          "type": "button",
          "class": ActionSheet_bem('cancel'),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : props.cancelText])];
      }
    };

    var renderOption = (item, index) => {
      var {
        name,
        color,
        subname,
        loading,
        callback,
        disabled,
        className
      } = item;
      var Content = loading ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(loading_Loading, {
        "class": ActionSheet_bem('loading-icon')
      }, null) : [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": ActionSheet_bem('name')
      }, [name]), subname && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": ActionSheet_bem('subname')
      }, [subname])];

      var onClick = () => {
        if (disabled || loading) {
          return;
        }

        if (callback) {
          callback(item);
        }

        if (props.closeOnClickAction) {
          updateShow(false);
        }

        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => emit('select', item, index));
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
        "type": "button",
        "style": {
          color
        },
        "class": [ActionSheet_bem('item', {
          loading,
          disabled
        }), className],
        "onClick": onClick
      }, [Content]);
    };

    var renderDescription = () => {
      if (props.description || slots.description) {
        var content = slots.description ? slots.description() : props.description;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": ActionSheet_bem('description')
        }, [content]);
      }
    };

    var renderOptions = () => {
      if (props.actions) {
        return props.actions.map(renderOption);
      }
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup_Popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
      "class": ActionSheet_bem(),
      "round": props.round,
      "position": "bottom",
      "safeAreaInsetBottom": props.safeAreaInsetBottom
    }, pick(props, popupSharedPropKeys), {
      'onUpdate:show': updateShow
    }), {
      default: () => [renderHeader(), renderDescription(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": ActionSheet_bem('content')
      }, [renderOptions(), slots.default == null ? void 0 : slots.default()]), renderCancel()]
    });
  }

}));
;// CONCATENATED MODULE: ./es/action-sheet/index.js


var action_sheet_ActionSheet = withInstall(ActionSheet);
/* harmony default export */ var action_sheet = ((/* unused pure expression or super */ null && (action_sheet_ActionSheet)));

;// CONCATENATED MODULE: ./es/utils/deep-clone.js

function deepClone(obj) {
  if (!isDef(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  if (typeof obj === 'object') {
    var to = {};
    Object.keys(obj).forEach(key => {
      to[key] = deepClone(obj[key]);
    });
    return to;
  }

  return obj;
}
;// CONCATENATED MODULE: ./es/utils/format/number.js
function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function trimExtraChar(value, char, regExp) {
  var index = value.indexOf(char);

  if (index === -1) {
    return value;
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

function formatNumber(value, allowDot = true, allowMinus = true) {
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

/* eslint-disable no-use-before-define */

 // Utils


 // Composables




var DEFAULT_DURATION = 200; // 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
// 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动

var MOMENTUM_LIMIT_TIME = 300;
var MOMENTUM_LIMIT_DISTANCE = 15;
var [PickerColumn_name, PickerColumn_bem] = createNamespace('picker-column');

function getElementTranslateY(element) {
  var style = window.getComputedStyle(element);
  var transform = style.transform || style.webkitTransform;
  var translateY = transform.slice(7, transform.length - 1).split(', ')[5];
  return Number(translateY);
}

var PICKER_KEY = Symbol(PickerColumn_name);

function isOptionDisabled(option) {
  return isObject(option) && option.disabled;
}

/* harmony default export */ var PickerColumn = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: PickerColumn_name,
  props: {
    readonly: Boolean,
    allowHtml: Boolean,
    className: unknownProp,
    textKey: {
      type: String,
      required: true
    },
    itemHeight: {
      type: Number,
      required: true
    },
    swipeDuration: {
      type: [Number, String],
      required: true
    },
    visibleItemCount: {
      type: [Number, String],
      required: true
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    initialOptions: {
      type: Array,
      default: () => []
    }
  },
  emits: ['change'],

  setup(props, {
    emit,
    slots
  }) {
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

    var count = () => state.options.length;

    var baseOffset = () => props.itemHeight * (+props.visibleItemCount - 1) / 2;

    var adjustIndex = index => {
      index = range(index, 0, count());

      for (var i = index; i < count(); i++) {
        if (!isOptionDisabled(state.options[i])) return i;
      }

      for (var _i = index - 1; _i >= 0; _i--) {
        if (!isOptionDisabled(state.options[_i])) return _i;
      }
    };

    var setIndex = (index, emitChange) => {
      index = adjustIndex(index) || 0;
      var offset = -index * props.itemHeight;

      var trigger = () => {
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

    var setOptions = options => {
      if (JSON.stringify(options) !== JSON.stringify(state.options)) {
        state.options = deepClone(options);
        setIndex(props.defaultIndex);
      }
    };

    var onClickItem = index => {
      if (moving || props.readonly) {
        return;
      }

      transitionEndTrigger = null;
      state.duration = DEFAULT_DURATION;
      setIndex(index, true);
    };

    var getOptionText = option => {
      if (isObject(option) && props.textKey in option) {
        return option[props.textKey];
      }

      return option;
    };

    var getIndexByOffset = offset => range(Math.round(-offset / props.itemHeight), 0, count() - 1);

    var momentum = (distance, duration) => {
      var speed = Math.abs(distance / duration);
      distance = state.offset + speed / 0.003 * (distance < 0 ? -1 : 1);
      var index = getIndexByOffset(distance);
      state.duration = +props.swipeDuration;
      setIndex(index, true);
    };

    var stopMomentum = () => {
      moving = false;
      state.duration = 0;

      if (transitionEndTrigger) {
        transitionEndTrigger();
        transitionEndTrigger = null;
      }
    };

    var onTouchStart = event => {
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

    var onTouchMove = event => {
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

    var onTouchEnd = () => {
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

      setTimeout(() => {
        moving = false;
      }, 0);
    };

    var renderOptions = () => {
      var optionStyle = {
        height: props.itemHeight + "px"
      };
      return state.options.map((option, index) => {
        var text = getOptionText(option);
        var disabled = isOptionDisabled(option);
        var data = {
          role: 'button',
          style: optionStyle,
          tabindex: disabled ? -1 : 0,
          class: PickerColumn_bem('item', {
            disabled,
            selected: index === state.index
          }),
          onClick: () => onClickItem(index)
        };
        var childData = {
          class: 'van-ellipsis',
          [props.allowHtml ? 'innerHTML' : 'textContent']: text
        };
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", data, [slots.option ? slots.option(option) : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", childData, null)]);
      });
    };

    var setValue = value => {
      var {
        options
      } = state;

      for (var i = 0; i < options.length; i++) {
        if (getOptionText(options[i]) === value) {
          return setIndex(i);
        }
      }
    };

    var getValue = () => state.options[state.index];

    setIndex(state.index);
    useParent(PICKER_KEY);
    useExpose({
      state,
      setIndex,
      getValue,
      setValue,
      setOptions,
      stopMomentum
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.initialOptions, setOptions);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.defaultIndex, value => {
      setIndex(value);
    });
    return () => {
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
;// CONCATENATED MODULE: ./es/picker/Picker.js

 // Utils


 // Composables


 // Components



var [Picker_name, Picker_bem, t] = createNamespace('picker');
var pickerProps = {
  title: String,
  loading: Boolean,
  readonly: Boolean,
  allowHtml: Boolean,
  showToolbar: truthProp,
  cancelButtonText: String,
  confirmButtonText: String,
  itemHeight: {
    type: [Number, String],
    default: 44
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
/* harmony default export */ var Picker = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Picker_name,
  props: extend({}, pickerProps, {
    columnsFieldNames: Object,
    columns: {
      type: Array,
      default: () => []
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

  setup(props, {
    emit,
    slots
  }) {
    var formattedColumns = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)([]);
    var {
      text: textKey,
      values: valuesKey,
      children: childrenKey
    } = extend({
      // compatible with valueKey prop
      text: props.valueKey,
      values: 'values',
      children: 'children'
    }, props.columnsFieldNames);
    var {
      children,
      linkChildren
    } = useChildren(PICKER_KEY);
    linkChildren();
    var itemHeight = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => unitToPx(props.itemHeight));
    var dataType = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var firstColumn = props.columns[0];

      if (firstColumn && typeof firstColumn !== 'string') {
        if (childrenKey in firstColumn) {
          return 'cascade';
        }

        if (valuesKey in firstColumn) {
          return 'object';
        }
      }

      return 'plain';
    });

    var formatCascade = () => {
      var formatted = [];
      var cursor = {
        [childrenKey]: props.columns
      };

      while (cursor && cursor[childrenKey]) {
        var _cursor$defaultIndex;

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

        formatted.push({
          [valuesKey]: cursor[childrenKey],
          className: cursor.className,
          defaultIndex
        });
        cursor = _children[defaultIndex];
      }

      formattedColumns.value = formatted;
    };

    var format = () => {
      var {
        columns
      } = props;

      if (dataType.value === 'plain') {
        formattedColumns.value = [{
          [valuesKey]: columns
        }];
      } else if (dataType.value === 'cascade') {
        formatCascade();
      } else {
        formattedColumns.value = columns;
      }
    }; // get indexes of all columns


    var getIndexes = () => children.map(child => child.state.index); // set options of column by index


    var setColumnValues = (index, options) => {
      var column = children[index];

      if (column) {
        column.setOptions(options);
      }
    };

    var onCascadeChange = columnIndex => {
      var cursor = {
        [childrenKey]: props.columns
      };
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


    var getChild = index => children[index]; // get column value by index


    var getColumnValue = index => {
      var column = getChild(index);

      if (column) {
        return column.getValue();
      }
    }; // set column value by index


    var setColumnValue = (index, value) => {
      var column = getChild(index);

      if (column) {
        column.setValue(value);

        if (dataType.value === 'cascade') {
          onCascadeChange(index);
        }
      }
    }; // get column option index by column index


    var getColumnIndex = index => {
      var column = getChild(index);

      if (column) {
        return column.state.index;
      }
    }; // set column option index by column index


    var setColumnIndex = (columnIndex, optionIndex) => {
      var column = getChild(columnIndex);

      if (column) {
        column.setIndex(optionIndex);

        if (dataType.value === 'cascade') {
          onCascadeChange(columnIndex);
        }
      }
    }; // get options of column by index


    var getColumnValues = index => {
      var column = getChild(index);

      if (column) {
        return column.state.options;
      }
    }; // get values of all columns


    var getValues = () => children.map(child => child.getValue()); // set values of all columns


    var setValues = values => {
      values.forEach((value, index) => {
        setColumnValue(index, value);
      });
    }; // set indexes of all columns


    var setIndexes = indexes => {
      indexes.forEach((optionIndex, columnIndex) => {
        setColumnIndex(columnIndex, optionIndex);
      });
    };

    var emitAction = event => {
      if (dataType.value === 'plain') {
        emit(event, getColumnValue(0), getColumnIndex(0));
      } else {
        emit(event, getValues(), getIndexes());
      }
    };

    var onChange = columnIndex => {
      if (dataType.value === 'cascade') {
        onCascadeChange(columnIndex);
      }

      if (dataType.value === 'plain') {
        emit('change', getColumnValue(0), getColumnIndex(0));
      } else {
        emit('change', getValues(), columnIndex);
      }
    };

    var confirm = () => {
      children.forEach(child => child.stopMomentum());
      emitAction('confirm');
    };

    var cancel = () => emitAction('cancel');

    var renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }

      if (props.title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [Picker_bem('title'), 'van-ellipsis']
        }, [props.title]);
      }
    };

    var renderCancel = () => {
      var text = props.cancelButtonText || t('cancel');
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
        "type": "button",
        "class": Picker_bem('cancel'),
        "onClick": cancel
      }, [slots.cancel ? slots.cancel() : text]);
    };

    var renderConfirm = () => {
      var text = props.confirmButtonText || t('confirm');
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
        "type": "button",
        "class": Picker_bem('confirm'),
        "onClick": confirm
      }, [slots.confirm ? slots.confirm() : text]);
    };

    var renderToolbar = () => {
      if (props.showToolbar) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Picker_bem('toolbar')
        }, [slots.default ? slots.default() : [renderCancel(), renderTitle(), renderConfirm()]]);
      }
    };

    var renderColumnItems = () => formattedColumns.value.map((item, columnIndex) => {
      var _item$defaultIndex;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(PickerColumn, {
        "textKey": textKey,
        "readonly": props.readonly,
        "allowHtml": props.allowHtml,
        "className": item.className,
        "itemHeight": itemHeight.value,
        "defaultIndex": (_item$defaultIndex = item.defaultIndex) != null ? _item$defaultIndex : +props.defaultIndex,
        "swipeDuration": props.swipeDuration,
        "initialOptions": item[valuesKey],
        "visibleItemCount": props.visibleItemCount,
        "onChange": () => onChange(columnIndex)
      }, {
        option: slots.option
      });
    });

    var renderColumns = () => {
      var wrapHeight = itemHeight.value * +props.visibleItemCount;
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
        "class": Picker_bem('columns'),
        "style": columnsStyle,
        "onTouchmove": preventDefault
      }, [renderColumnItems(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Picker_bem('mask'),
        "style": maskStyle
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [BORDER_UNSET_TOP_BOTTOM, Picker_bem('frame')],
        "style": frameStyle
      }, null)]);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.columns, format, {
      immediate: true
    });
    useExpose({
      confirm,
      getValues,
      setValues,
      getIndexes,
      setIndexes,
      getColumnIndex,
      setColumnIndex,
      getColumnValue,
      setColumnValue,
      getColumnValues,
      setColumnValues
    });
    return () => {
      var _slots$columnsTop, _slots$columnsBottom;

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Picker_bem()
      }, [props.toolbarPosition === 'top' ? renderToolbar() : null, props.loading ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(loading_Loading, {
        "class": Picker_bem('loading')
      }, null) : null, (_slots$columnsTop = slots['columns-top']) == null ? void 0 : _slots$columnsTop.call(slots), renderColumns(), (_slots$columnsBottom = slots['columns-bottom']) == null ? void 0 : _slots$columnsBottom.call(slots), props.toolbarPosition === 'bottom' ? renderToolbar() : null]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/picker/index.js


var picker_Picker = withInstall(Picker);
/* harmony default export */ var picker = ((/* unused pure expression or super */ null && (picker_Picker)));

;// CONCATENATED MODULE: ./es/area/Area.js

/* eslint-disable camelcase */

 // Utils



 // Composables

 // Components


var [Area_name, Area_bem] = createNamespace('area');
var EMPTY_CODE = '000000';

function isOverseaCode(code) {
  return code[0] === '9';
}

/* harmony default export */ var Area = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Area_name,
  props: extend({}, pickerProps, {
    value: String,
    areaList: {
      type: Object,
      default: () => ({})
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
      default: () => []
    }
  }),
  emits: ['change', 'confirm'],

  setup(props, {
    emit,
    slots
  }) {
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
    var areaList = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        areaList
      } = props;
      return {
        province: areaList.province_list || {},
        city: areaList.city_list || {},
        county: areaList.county_list || {}
      };
    });
    var placeholderMap = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        columnsPlaceholder
      } = props;
      return {
        province: columnsPlaceholder[0] || '',
        city: columnsPlaceholder[1] || '',
        county: columnsPlaceholder[2] || ''
      };
    });

    var getDefaultCode = () => {
      if (props.columnsPlaceholder.length) {
        return EMPTY_CODE;
      }

      var {
        county,
        city
      } = areaList.value;
      var countyCodes = Object.keys(county);

      if (countyCodes[0]) {
        return countyCodes[0];
      }

      var cityCodes = Object.keys(city);

      if (cityCodes[0]) {
        return cityCodes[0];
      }

      return '';
    };

    var getColumnValues = (type, code) => {
      var column = [];

      if (type !== 'province' && !code) {
        return column;
      }

      var list = areaList.value[type];
      column = Object.keys(list).map(listCode => ({
        code: listCode,
        name: list[listCode]
      }));

      if (code) {
        // oversea code
        if (type === 'city' && props.isOverseaCode(code)) {
          code = '9';
        }

        column = column.filter(item => item.code.indexOf(code) === 0);
      }

      if (placeholderMap.value[type] && column.length) {
        // set columns placeholder
        var codeFill = '';

        if (type === 'city') {
          codeFill = EMPTY_CODE.slice(2, 4);
        } else if (type === 'county') {
          codeFill = EMPTY_CODE.slice(4, 6);
        }

        column.unshift({
          code: code + codeFill,
          name: placeholderMap.value[type]
        });
      }

      return column;
    }; // get index by code


    var getIndex = (type, code) => {
      var compareNum = code.length;

      if (type === 'province') {
        compareNum = props.isOverseaCode(code) ? 1 : 2;
      }

      if (type === 'city') {
        compareNum = 4;
      }

      code = code.slice(0, compareNum);
      var list = getColumnValues(type, compareNum > 2 ? code.slice(0, compareNum - 2) : '');

      for (var i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    };

    var setValues = () => {
      var code = state.code || getDefaultCode();
      var picker = pickerRef.value;
      var province = getColumnValues('province');
      var city = getColumnValues('city', code.slice(0, 2));

      if (!picker) {
        return;
      }

      picker.setColumnValues(0, province);
      picker.setColumnValues(1, city);

      if (city.length && code.slice(2, 4) === '00' && !props.isOverseaCode(code)) {
        [{
          code
        }] = city;
      }

      picker.setColumnValues(2, getColumnValues('county', code.slice(0, 4)));
      picker.setIndexes([getIndex('province', code), getIndex('city', code), getIndex('county', code)]);
    }; // parse output columns data


    var parseValues = values => {
      return values.map((value, index) => {
        if (value) {
          value = deepClone(value);

          if (!value.code || value.name === props.columnsPlaceholder[index]) {
            value.code = '';
            value.name = '';
          }
        }

        return value;
      });
    };

    var getValues = () => {
      if (pickerRef.value) {
        var values = pickerRef.value.getValues().filter(Boolean);
        return parseValues(values);
      }

      return [];
    };

    var getArea = () => {
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

      var names = values.map(item => item.name);
      var validValues = values.filter(value => value.code);
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

    var reset = (newCode = '') => {
      state.code = newCode;
      setValues();
    };

    var onChange = (values, index) => {
      state.code = values[index].code;
      setValues();
      var parsedValues = parseValues(pickerRef.value.getValues());
      emit('change', parsedValues, index);
    };

    var onConfirm = (values, index) => {
      setValues();
      emit('confirm', parseValues(values), index);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(setValues);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.value, value => {
      state.code = value;
      setValues();
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.areaList, setValues, {
      deep: true
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.columnsNum, () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(setValues));
    useExpose({
      reset,
      getArea,
      getValues
    });
    return () => {
      var columns = state.columns.slice(0, +props.columnsNum);
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(picker_Picker, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": pickerRef,
        "class": Area_bem(),
        "columns": columns,
        "valueKey": "name",
        "onChange": onChange,
        "onConfirm": onConfirm
      }, pick(props, ['title', 'loading', 'readonly', 'itemHeight', 'swipeDuration', 'visibleItemCount', 'cancelButtonText', 'confirmButtonText'])), pick(slots, ['title', 'columns-top', 'columns-bottom']));
    };
  }

}));
;// CONCATENATED MODULE: ./es/area/index.js


var area_Area = withInstall(Area);
/* harmony default export */ var es_area = ((/* unused pure expression or super */ null && (area_Area)));

;// CONCATENATED MODULE: ./es/cell/Cell.js

 // Utils

 // Composables

 // Components


var [Cell_name, Cell_bem] = createNamespace('cell');
var cellProps = {
  icon: String,
  size: String,
  title: [Number, String],
  value: [Number, String],
  label: [Number, String],
  center: Boolean,
  isLink: Boolean,
  border: truthProp,
  required: Boolean,
  iconPrefix: String,
  valueClass: unknownProp,
  labelClass: unknownProp,
  titleClass: unknownProp,
  titleStyle: null,
  arrowDirection: String,
  clickable: {
    type: Boolean,
    default: null
  }
};
/* harmony default export */ var Cell = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Cell_name,
  props: extend({}, cellProps, routeProps),

  setup(props, {
    slots
  }) {
    var route = useRoute();

    var renderLabel = () => {
      var showLabel = slots.label || isDef(props.label);

      if (showLabel) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [Cell_bem('label'), props.labelClass]
        }, [slots.label ? slots.label() : props.label]);
      }
    };

    var renderTitle = () => {
      if (slots.title || isDef(props.title)) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [Cell_bem('title'), props.titleClass],
          "style": props.titleStyle
        }, [slots.title ? slots.title() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [props.title]), renderLabel()]);
      }
    };

    var renderValue = () => {
      var hasValue = slots.default || isDef(props.value);

      if (hasValue) {
        var hasTitle = slots.title || isDef(props.title);
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [Cell_bem('value', {
            alone: !hasTitle
          }), props.valueClass]
        }, [slots.default ? slots.default() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [props.value])]);
      }
    };

    var renderLeftIcon = () => {
      if (slots.icon) {
        return slots.icon();
      }

      if (props.icon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": props.icon,
          "class": Cell_bem('left-icon'),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    var renderRightIcon = () => {
      if (slots['right-icon']) {
        return slots['right-icon']();
      }

      if (props.isLink) {
        var _name = props.arrowDirection ? "arrow-" + props.arrowDirection : 'arrow';

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": _name,
          "class": Cell_bem('right-icon')
        }, null);
      }
    };

    return () => {
      var _props$clickable;

      var {
        size,
        center,
        border,
        isLink,
        required
      } = props;
      var clickable = (_props$clickable = props.clickable) != null ? _props$clickable : isLink;
      var classes = {
        center,
        required,
        clickable,
        borderless: !border
      };

      if (size) {
        classes[size] = !!size;
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Cell_bem(classes),
        "role": clickable ? 'button' : undefined,
        "tabindex": clickable ? 0 : undefined,
        "onClick": route
      }, [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), slots.extra == null ? void 0 : slots.extra()]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/cell/index.js


var cell_Cell = withInstall(Cell);
/* harmony default export */ var cell = ((/* unused pure expression or super */ null && (cell_Cell)));

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
function runRuleValidator(value, rule) {
  return new Promise(resolve => {
    var returnVal = rule.validator(value, rule);

    if (isPromise(returnVal)) {
      return returnVal.then(resolve);
    }

    resolve(returnVal);
  });
}
function getRuleMessage(value, rule) {
  var {
    message
  } = rule;

  if (isFunction(message)) {
    return message(value, rule);
  }

  return message || '';
}
function startComposing(event) {
  event.target.composing = true;
}
function endComposing(event) {
  var {
    target
  } = event;

  if (target.composing) {
    target.composing = false;
    trigger(target, 'input');
  }
}
function resizeTextarea(input, autosize) {
  input.style.height = 'auto';
  var height = input.scrollHeight;

  if (isObject(autosize)) {
    var {
      maxHeight,
      minHeight
    } = autosize;

    if (maxHeight !== undefined) {
      height = Math.min(height, maxHeight);
    }

    if (minHeight !== undefined) {
      height = Math.max(height, minHeight);
    }
  }

  if (height) {
    input.style.height = height + "px";
  }
}
function mapInputType(type) {
  // type="number" is weird in iOS, and can't prevent dot in Android
  // so use inputmode to set keyboard in modern browsers
  if (type === 'number') {
    return {
      type: 'text',
      inputmode: 'decimal'
    };
  }

  if (type === 'digit') {
    return {
      type: 'tel',
      inputmode: 'numeric'
    };
  }

  return {
    type
  };
}
;// CONCATENATED MODULE: ./es/composables/use-link-field.js

var FORM_KEY = Symbol('van-form');
var FIELD_KEY = Symbol('van-field');
function useLinkField(getValue) {
  var field = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.inject)(FIELD_KEY, null);

  if (field && !field.childFieldValue.value) {
    field.childFieldValue.value = getValue;
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(getValue, () => {
      field.resetValidation();
      field.validateWithTrigger('onChange');
    });
  }
}
;// CONCATENATED MODULE: ./es/field/Field.js

 // Utils



 // Composables



 // Components


 // Types

var [Field_name, Field_bem] = createNamespace('field'); // provide to Search component to inherit

var fieldProps = {
  formatter: Function,
  leftIcon: String,
  rightIcon: String,
  autofocus: Boolean,
  clearable: Boolean,
  maxlength: [Number, String],
  inputAlign: String,
  placeholder: String,
  errorMessage: String,
  error: {
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
  clearIcon: {
    type: String,
    default: 'clear'
  },
  modelValue: {
    type: [Number, String],
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
};
/* harmony default export */ var Field = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Field_name,
  props: extend({}, cellProps, fieldProps, {
    rows: [Number, String],
    name: String,
    rules: Array,
    autosize: [Boolean, Object],
    labelWidth: [Number, String],
    labelClass: unknownProp,
    labelAlign: String,
    autocomplete: String,
    showWordLimit: Boolean,
    errorMessageAlign: String,
    type: {
      type: String,
      default: 'text'
    },
    colon: {
      type: Boolean,
      default: null
    }
  }),
  emits: ['blur', 'focus', 'clear', 'keypress', 'click-input', 'click-left-icon', 'click-right-icon', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      focused: false,
      validateFailed: false,
      validateMessage: ''
    });
    var inputRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var childFieldValue = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var {
      parent: form
    } = useParent(FORM_KEY);

    var getModelValue = () => {
      var _props$modelValue;

      return String((_props$modelValue = props.modelValue) != null ? _props$modelValue : '');
    };

    var getProp = key => {
      if (isDef(props[key])) {
        return props[key];
      }

      if (form && isDef(form.props[key])) {
        return form.props[key];
      }
    };

    var showClear = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var readonly = getProp('readonly');

      if (props.clearable && !readonly) {
        var hasValue = getModelValue() !== '';
        var trigger = props.clearTrigger === 'always' || props.clearTrigger === 'focus' && state.focused;
        return hasValue && trigger;
      }

      return false;
    });
    var formValue = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (childFieldValue.value && slots.input) {
        return childFieldValue.value();
      }

      return props.modelValue;
    });

    var runRules = rules => rules.reduce((promise, rule) => promise.then(() => {
      if (state.validateFailed) {
        return;
      }

      var {
        value
      } = formValue;

      if (rule.formatter) {
        value = rule.formatter(value, rule);
      }

      if (!runSyncRule(value, rule)) {
        state.validateFailed = true;
        state.validateMessage = getRuleMessage(value, rule);
        return;
      }

      if (rule.validator) {
        return runRuleValidator(value, rule).then(result => {
          if (result && typeof result === 'string') {
            state.validateFailed = true;
            state.validateMessage = result;
          } else if (result === false) {
            state.validateFailed = true;
            state.validateMessage = getRuleMessage(value, rule);
          }
        });
      }
    }), Promise.resolve());

    var resetValidation = () => {
      if (state.validateFailed) {
        state.validateFailed = false;
        state.validateMessage = '';
      }
    };

    var validate = (rules = props.rules) => new Promise(resolve => {
      resetValidation();

      if (rules) {
        runRules(rules).then(() => {
          if (state.validateFailed) {
            resolve({
              name: props.name,
              message: state.validateMessage
            });
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });

    var validateWithTrigger = trigger => {
      if (form && props.rules) {
        var defaultTrigger = form.props.validateTrigger === trigger;
        var rules = props.rules.filter(rule => {
          if (rule.trigger) {
            return rule.trigger === trigger;
          }

          return defaultTrigger;
        });

        if (rules.length) {
          validate(rules);
        }
      }
    }; // native maxlength have incorrect line-break counting
    // see: https://github.com/youzan/vant/issues/5033


    var limitValueLength = value => {
      var {
        maxlength
      } = props;

      if (isDef(maxlength) && value.length > maxlength) {
        var modelValue = getModelValue();

        if (modelValue && modelValue.length === +maxlength) {
          return modelValue;
        }

        return value.slice(0, +maxlength);
      }

      return value;
    };

    var updateValue = (value, trigger = 'onChange') => {
      value = limitValueLength(value);

      if (props.type === 'number' || props.type === 'digit') {
        var isNumber = props.type === 'number';
        value = formatNumber(value, isNumber, isNumber);
      }

      if (props.formatter && trigger === props.formatTrigger) {
        value = props.formatter(value);
      }

      if (inputRef.value && inputRef.value.value !== value) {
        inputRef.value.value = value;
      }

      if (value !== props.modelValue) {
        emit('update:modelValue', value);
      }
    };

    var onInput = event => {
      // skip update value when composing
      if (!event.target.composing) {
        updateValue(event.target.value);
      }
    };

    var blur = () => {
      var _inputRef$value;

      return (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.blur();
    };

    var focus = () => {
      var _inputRef$value2;

      return (_inputRef$value2 = inputRef.value) == null ? void 0 : _inputRef$value2.focus();
    };

    var onFocus = event => {
      state.focused = true;
      emit('focus', event); // readonly not work in legacy mobile safari

      var readonly = getProp('readonly');

      if (readonly) {
        blur();
      }
    };

    var onBlur = event => {
      state.focused = false;
      updateValue(getModelValue(), 'onBlur');
      emit('blur', event);
      validateWithTrigger('onBlur');
      resetScroll();
    };

    var onClickInput = event => emit('click-input', event);

    var onClickLeftIcon = event => emit('click-left-icon', event);

    var onClickRightIcon = event => emit('click-right-icon', event);

    var onClear = event => {
      preventDefault(event);
      emit('update:modelValue', '');
      emit('clear', event);
    };

    var showError = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (typeof props.error === 'boolean') {
        return props.error;
      }

      if (form && form.props.showError && state.validateFailed) {
        return true;
      }
    });
    var labelStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var labelWidth = getProp('labelWidth');

      if (labelWidth) {
        return {
          width: addUnit(labelWidth)
        };
      }
    });

    var onKeypress = event => {
      var ENTER_CODE = 13;

      if (event.keyCode === ENTER_CODE) {
        var submitOnEnter = form && form.props.submitOnEnter;

        if (!submitOnEnter && props.type !== 'textarea') {
          preventDefault(event);
        } // trigger blur after click keyboard search button


        if (props.type === 'search') {
          blur();
        }
      }

      emit('keypress', event);
    };

    var adjustTextareaSize = () => {
      var input = inputRef.value;

      if (props.type === 'textarea' && props.autosize && input) {
        resizeTextarea(input, props.autosize);
      }
    };

    var renderInput = () => {
      var inputAlign = getProp('inputAlign');

      if (slots.input) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Field_bem('control', [inputAlign, 'custom']),
          "onClick": onClickInput
        }, [slots.input()]);
      }

      var inputAttrs = {
        ref: inputRef,
        name: props.name,
        rows: props.rows !== undefined ? +props.rows : undefined,
        class: Field_bem('control', inputAlign),
        value: props.modelValue,
        disabled: getProp('disabled'),
        readonly: getProp('readonly'),
        autofocus: props.autofocus,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        onBlur,
        onFocus,
        onInput,
        onClick: onClickInput,
        onChange: endComposing,
        onKeypress,
        onCompositionend: endComposing,
        onCompositionstart: startComposing
      };

      if (props.type === 'textarea') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("textarea", inputAttrs, null);
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("input", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)(mapInputType(props.type), inputAttrs), null);
    };

    var renderLeftIcon = () => {
      var leftIconSlot = slots['left-icon'];

      if (props.leftIcon || leftIconSlot) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Field_bem('left-icon'),
          "onClick": onClickLeftIcon
        }, [leftIconSlot ? leftIconSlot() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": props.leftIcon,
          "classPrefix": props.iconPrefix
        }, null)]);
      }
    };

    var renderRightIcon = () => {
      var rightIconSlot = slots['right-icon'];

      if (props.rightIcon || rightIconSlot) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Field_bem('right-icon'),
          "onClick": onClickRightIcon
        }, [rightIconSlot ? rightIconSlot() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": props.rightIcon,
          "classPrefix": props.iconPrefix
        }, null)]);
      }
    };

    var renderWordLimit = () => {
      if (props.showWordLimit && props.maxlength) {
        var count = getModelValue().length;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Field_bem('word-limit')
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": Field_bem('word-num')
        }, [count]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createTextVNode)("/"), props.maxlength]);
      }
    };

    var renderMessage = () => {
      if (form && form.props.showErrorMessage === false) {
        return;
      }

      var message = props.errorMessage || state.validateMessage;

      if (message) {
        var errorMessageAlign = getProp('errorMessageAlign');
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Field_bem('error-message', errorMessageAlign)
        }, [message]);
      }
    };

    var renderLabel = () => {
      var colon = getProp('colon') ? ':' : '';

      if (slots.label) {
        return [slots.label(), colon];
      }

      if (props.label) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [props.label + colon]);
      }
    };

    useExpose({
      blur,
      focus,
      validate,
      formValue,
      resetValidation
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.provide)(FIELD_KEY, {
      childFieldValue,
      resetValidation,
      validateWithTrigger
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.modelValue, () => {
      updateValue(getModelValue());
      resetValidation();
      validateWithTrigger('onChange');
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(adjustTextareaSize);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(() => {
      updateValue(getModelValue(), props.formatTrigger);
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(adjustTextareaSize);
    });
    return () => {
      var disabled = getProp('disabled');
      var labelAlign = getProp('labelAlign');
      var Label = renderLabel();
      var LeftIcon = renderLeftIcon();
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell_Cell, {
        "size": props.size,
        "icon": props.leftIcon,
        "class": Field_bem({
          error: showError.value,
          disabled,
          ["label-" + labelAlign]: labelAlign,
          'min-height': props.type === 'textarea' && !props.autosize
        }),
        "center": props.center,
        "border": props.border,
        "isLink": props.isLink,
        "required": props.required,
        "clickable": props.clickable,
        "titleStyle": labelStyle.value,
        "valueClass": Field_bem('value'),
        "titleClass": [Field_bem('label', labelAlign), props.labelClass],
        "arrowDirection": props.arrowDirection
      }, {
        default: () => [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Field_bem('body')
        }, [renderInput(), showClear.value && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": props.clearIcon,
          "class": Field_bem('clear'),
          "onTouchstart": onClear
        }, null), renderRightIcon(), slots.button && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Field_bem('button')
        }, [slots.button()])]), renderWordLimit(), renderMessage()],
        icon: LeftIcon ? () => LeftIcon : null,
        title: Label ? () => Label : null,
        extra: slots.extra
      });
    };
  }

}));
;// CONCATENATED MODULE: ./es/field/index.js


var field_Field = withInstall(Field);
/* harmony default export */ var field = ((/* unused pure expression or super */ null && (field_Field)));

;// CONCATENATED MODULE: ./es/utils/mount-component.js



function usePopupState() {
  var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
    show: false
  });

  var toggle = show => {
    state.show = show;
  };

  var open = props => {
    extend(state, props);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => toggle(true));
  };

  var close = () => toggle(false);

  useExpose({
    open,
    close,
    toggle
  });
  return {
    open,
    close,
    state,
    toggle
  };
}
function mountComponent(RootComponent) {
  var app = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createApp)(RootComponent);
  var root = document.createElement('div');
  document.body.appendChild(root);
  return {
    instance: app.mount(root),

    unmount() {
      app.unmount();
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




var [Toast_name, Toast_bem] = createNamespace('toast');
/* harmony default export */ var toast_Toast = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Toast_name,
  props: {
    icon: String,
    show: Boolean,
    overlay: Boolean,
    message: [Number, String],
    iconSize: [Number, String],
    className: unknownProp,
    iconPrefix: String,
    loadingType: String,
    forbidClick: Boolean,
    overlayClass: unknownProp,
    overlayStyle: Object,
    closeOnClick: Boolean,
    closeOnClickOverlay: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    duration: {
      type: Number,
      default: 2000
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

  setup(props, {
    emit
  }) {
    var timer;
    var clickable = false;

    var toggleClickable = () => {
      var newValue = props.show && props.forbidClick;

      if (clickable !== newValue) {
        clickable = newValue;
        lockClick(clickable);
      }
    };

    var updateShow = show => emit('update:show', show);

    var onClick = () => {
      if (props.closeOnClick) {
        updateShow(false);
      }
    };

    var clearTimer = () => {
      clearTimeout(timer);
    };

    var renderIcon = () => {
      var {
        icon,
        type,
        iconSize,
        iconPrefix,
        loadingType
      } = props;
      var hasIcon = icon || type === 'success' || type === 'fail';

      if (hasIcon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": icon || type,
          "size": iconSize,
          "class": Toast_bem('icon'),
          "classPrefix": iconPrefix
        }, null);
      }

      if (type === 'loading') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(loading_Loading, {
          "class": Toast_bem('loading'),
          "size": iconSize,
          "type": loadingType
        }, null);
      }
    };

    var renderMessage = () => {
      var {
        type,
        message
      } = props;

      if (isDef(message) && message !== '') {
        return type === 'html' ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Toast_bem('text'),
          "innerHTML": String(message)
        }, null) : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Toast_bem('text')
        }, [message]);
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => [props.show, props.forbidClick], toggleClickable);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => [props.show, props.type, props.message, props.duration], () => {
      clearTimer();

      if (props.show && props.duration > 0) {
        timer = setTimeout(() => {
          updateShow(false);
        }, props.duration);
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(toggleClickable);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onUnmounted)(toggleClickable);
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup_Popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
      "show": props.show,
      "class": [Toast_bem([props.position, {
        [props.type]: !props.icon
      }]), props.className],
      "overlay": props.overlay,
      "lockScroll": false,
      "transition": props.transition,
      "overlayClass": props.overlayClass,
      "overlayStyle": props.overlayStyle,
      "closeOnClickOverlay": props.closeOnClickOverlay,
      "onClick": onClick,
      "onClosed": clearTimer
    }, {
      'onUpdate:show': updateShow
    }), {
      default: () => [renderIcon(), renderMessage()]
    });
  }

}));
;// CONCATENATED MODULE: ./es/toast/function-call.js





var defaultOptions = {
  icon: '',
  type: 'text',
  message: '',
  className: '',
  overlay: false,
  onClose: undefined,
  onOpened: undefined,
  duration: 2000,
  teleport: 'body',
  iconSize: undefined,
  iconPrefix: undefined,
  position: 'middle',
  transition: 'van-fade',
  forbidClick: false,
  loadingType: undefined,
  overlayClass: '',
  overlayStyle: undefined,
  closeOnClick: false,
  closeOnClickOverlay: false
};
var queue = [];
var allowMultiple = false;
var currentOptions = extend({}, defaultOptions); // default options of specific type

var defaultOptionsMap = {};

function parseOptions(message) {
  if (isObject(message)) {
    return message;
  }

  return {
    message
  };
}

function createInstance() {
  var {
    instance,
    unmount
  } = mountComponent({
    setup() {
      var message = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)('');
      var {
        open,
        state,
        close,
        toggle
      } = usePopupState();

      var onClosed = () => {
        if (allowMultiple) {
          queue = queue.filter(item => item !== instance);
          unmount();
        }
      };

      var render = () => {
        var attrs = {
          onClosed,
          'onUpdate:show': toggle
        };

        if (message.value) {
          attrs.message = message.value;
        }

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(toast_Toast, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)(state, attrs), null);
      }; // rewrite render function


      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)().render = render;
      return {
        open,
        clear: close,
        message
      };
    }

  });
  return instance;
}

function getInstance() {
  if (!queue.length || allowMultiple) {
    var instance = createInstance();
    queue.push(instance);
  }

  return queue[queue.length - 1];
}

function function_call_Toast(options = {}) {
  if (!inBrowser) {
    return {};
  }

  var toast = getInstance();
  var parsedOptions = parseOptions(options);
  toast.open(extend({}, currentOptions, defaultOptionsMap[parsedOptions.type || currentOptions.type], parsedOptions));
  return toast;
}

var createMethod = type => options => function_call_Toast(extend({
  type
}, parseOptions(options)));

function_call_Toast.loading = createMethod('loading');
function_call_Toast.success = createMethod('success');
function_call_Toast.fail = createMethod('fail');

function_call_Toast.clear = all => {
  if (queue.length) {
    if (all) {
      queue.forEach(toast => {
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

function setDefaultOptions(type, options) {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = options;
  } else {
    extend(currentOptions, type);
  }
}

function_call_Toast.setDefaultOptions = setDefaultOptions;

function_call_Toast.resetDefaultOptions = type => {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = null;
  } else {
    currentOptions = extend({}, defaultOptions);
    defaultOptionsMap = {};
  }
};

function_call_Toast.allowMultiple = (value = true) => {
  allowMultiple = value;
};

function_call_Toast.install = app => {
  app.use(withInstall(toast_Toast));
  app.config.globalProperties.$toast = function_call_Toast;
};


;// CONCATENATED MODULE: ./es/utils/interceptor.js

function callInterceptor(options) {
  var {
    interceptor,
    args,
    done,
    canceled
  } = options;

  if (interceptor) {
    // eslint-disable-next-line prefer-spread
    var returnVal = interceptor.apply(null, args || []);

    if (isPromise(returnVal)) {
      returnVal.then(value => {
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





var [Dialog_name, Dialog_bem, Dialog_t] = createNamespace('dialog');
var popupKeys = [...popupSharedPropKeys, 'transition', 'closeOnPopstate'];
/* harmony default export */ var dialog_Dialog = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Dialog_name,
  props: extend({}, popupSharedProps, {
    title: String,
    theme: String,
    width: [Number, String],
    message: [String, Function],
    callback: Function,
    allowHtml: Boolean,
    className: unknownProp,
    beforeClose: Function,
    messageAlign: String,
    closeOnPopstate: truthProp,
    showCancelButton: Boolean,
    cancelButtonText: String,
    cancelButtonColor: String,
    confirmButtonText: String,
    confirmButtonColor: String,
    showConfirmButton: truthProp,
    closeOnClickOverlay: Boolean,
    transition: {
      type: String,
      default: 'van-dialog-bounce'
    }
  }),
  emits: ['confirm', 'cancel', 'update:show'],

  setup(props, {
    emit,
    slots
  }) {
    var loading = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      confirm: false,
      cancel: false
    });

    var updateShow = value => emit('update:show', value);

    var close = action => {
      updateShow(false);

      if (props.callback) {
        props.callback(action);
      }
    };

    var getActionHandler = action => () => {
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

          done() {
            close(action);
            loading[action] = false;
          },

          canceled() {
            loading[action] = false;
          }

        });
      } else {
        close(action);
      }
    };

    var onCancel = getActionHandler('cancel');
    var onConfirm = getActionHandler('confirm');

    var renderTitle = () => {
      var title = slots.title ? slots.title() : props.title;

      if (title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Dialog_bem('header', {
            isolated: !props.message && !slots.default
          })
        }, [title]);
      }
    };

    var renderMessage = hasTitle => {
      var {
        message,
        allowHtml,
        messageAlign
      } = props;
      var classNames = Dialog_bem('message', {
        'has-title': hasTitle,
        [messageAlign]: messageAlign
      });

      if (allowHtml && typeof message === 'string') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": classNames,
          "innerHTML": message
        }, null);
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": classNames
      }, [isFunction(message) ? message() : message]);
    };

    var renderContent = () => {
      if (slots.default) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Dialog_bem('content')
        }, [slots.default()]);
      }

      var {
        title,
        message,
        allowHtml
      } = props;

      if (message) {
        var hasTitle = !!(title || slots.title);
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "key": allowHtml ? 1 : 0,
          "class": Dialog_bem('content', {
            isolated: !hasTitle
          })
        }, [renderMessage(hasTitle)]);
      }
    };

    var renderButtons = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": [BORDER_TOP, Dialog_bem('footer')]
    }, [props.showCancelButton && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
      "size": "large",
      "text": props.cancelButtonText || Dialog_t('cancel'),
      "class": Dialog_bem('cancel'),
      "style": {
        color: props.cancelButtonColor
      },
      "loading": loading.cancel,
      "onClick": onCancel
    }, null), props.showConfirmButton && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
      "size": "large",
      "text": props.confirmButtonText || Dialog_t('confirm'),
      "class": [Dialog_bem('confirm'), {
        [BORDER_LEFT]: props.showCancelButton
      }],
      "style": {
        color: props.confirmButtonColor
      },
      "loading": loading.confirm,
      "onClick": onConfirm
    }, null)]);

    var renderRoundButtons = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(action_bar_ActionBar, {
      "class": Dialog_bem('footer')
    }, {
      default: () => [props.showCancelButton && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(action_bar_button_ActionBarButton, {
        "type": "warning",
        "text": props.cancelButtonText || Dialog_t('cancel'),
        "class": Dialog_bem('cancel'),
        "color": props.cancelButtonColor,
        "loading": loading.cancel,
        "onClick": onCancel
      }, null), props.showConfirmButton && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(action_bar_button_ActionBarButton, {
        "type": "danger",
        "text": props.confirmButtonText || Dialog_t('confirm'),
        "class": Dialog_bem('confirm'),
        "color": props.confirmButtonColor,
        "loading": loading.confirm,
        "onClick": onConfirm
      }, null)]
    });

    var renderFooter = () => {
      if (slots.footer) {
        return slots.footer();
      }

      return props.theme === 'round-button' ? renderRoundButtons() : renderButtons();
    };

    return () => {
      var {
        width,
        title,
        theme,
        message,
        className
      } = props;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup_Popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "role": "dialog",
        "class": [Dialog_bem([theme]), className],
        "style": {
          width: addUnit(width)
        },
        "aria-labelledby": title || message
      }, pick(props, popupKeys), {
        'onUpdate:show': updateShow
      }), {
        default: () => [renderTitle(), renderContent(), renderFooter()]
      });
    };
  }

}));
;// CONCATENATED MODULE: ./es/dialog/function-call.js




var instance;

function initInstance() {
  var Wrapper = {
    setup() {
      var {
        state,
        toggle
      } = usePopupState();
      return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(dialog_Dialog, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)(state, {
        'onUpdate:show': toggle
      }), null);
    }

  };
  ({
    instance
  } = mountComponent(Wrapper));
}

function function_call_Dialog(options) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }

    instance.open(extend({}, function_call_Dialog.currentOptions, options, {
      callback: action => {
        (action === 'confirm' ? resolve : reject)(action);
      }
    }));
  });
}

function_call_Dialog.defaultOptions = {
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
  overlayStyle: undefined,
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
function_call_Dialog.currentOptions = extend({}, function_call_Dialog.defaultOptions);
function_call_Dialog.alert = function_call_Dialog;

function_call_Dialog.confirm = options => function_call_Dialog(extend({
  showCancelButton: true
}, options));

function_call_Dialog.close = () => {
  if (instance) {
    instance.toggle(false);
  }
};

function_call_Dialog.setDefaultOptions = options => {
  extend(function_call_Dialog.currentOptions, options);
};

function_call_Dialog.resetDefaultOptions = () => {
  function_call_Dialog.currentOptions = extend({}, function_call_Dialog.defaultOptions);
};

function_call_Dialog.install = app => {
  app.use(withInstall(dialog_Dialog));
  app.config.globalProperties.$dialog = function_call_Dialog;
};

function_call_Dialog.Component = withInstall(dialog_Dialog);

;// CONCATENATED MODULE: ./es/switch/Switch.js





var [Switch_name, Switch_bem] = createNamespace('switch');
/* harmony default export */ var Switch = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Switch_name,
  props: {
    size: [Number, String],
    loading: Boolean,
    disabled: Boolean,
    modelValue: unknownProp,
    activeColor: String,
    inactiveColor: String,
    activeValue: {
      type: unknownProp,
      default: true
    },
    inactiveValue: {
      type: unknownProp,
      default: false
    }
  },
  emits: ['change', 'update:modelValue'],

  setup(props, {
    emit
  }) {
    var isChecked = () => props.modelValue === props.activeValue;

    var onClick = () => {
      if (!props.disabled && !props.loading) {
        var newValue = isChecked() ? props.inactiveValue : props.activeValue;
        emit('update:modelValue', newValue);
        emit('change', newValue);
      }
    };

    var renderLoading = () => {
      if (props.loading) {
        var color = isChecked() ? props.activeColor : props.inactiveColor;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(loading_Loading, {
          "class": Switch_bem('loading'),
          "color": color
        }, null);
      }
    };

    useLinkField(() => props.modelValue);
    return () => {
      var {
        size,
        loading,
        disabled,
        activeColor,
        inactiveColor
      } = props;
      var checked = isChecked();
      var style = {
        fontSize: addUnit(size),
        backgroundColor: checked ? activeColor : inactiveColor
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "switch",
        "class": Switch_bem({
          on: checked,
          loading,
          disabled
        }),
        "style": style,
        "aria-checked": checked,
        "onClick": onClick
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Switch_bem('node')
      }, [renderLoading()])]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/switch/index.js


var switch_Switch = withInstall(Switch);
/* harmony default export */ var es_switch = ((/* unused pure expression or super */ null && (switch_Switch)));

;// CONCATENATED MODULE: ./es/address-edit/AddressEditDetail.js

 // Utils

 // Components



var [AddressEditDetail_name, AddressEditDetail_bem, AddressEditDetail_t] = createNamespace('address-edit-detail');
var android = isAndroid();
/* harmony default export */ var AddressEditDetail = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: AddressEditDetail_name,
  props: {
    show: Boolean,
    value: String,
    focused: Boolean,
    detailRows: [Number, String],
    searchResult: Array,
    errorMessage: String,
    detailMaxlength: [Number, String],
    showSearchResult: Boolean
  },
  emits: ['blur', 'focus', 'input', 'select-search'],

  setup(props, {
    emit
  }) {
    var field = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var showSearchResult = () => props.focused && props.searchResult && props.showSearchResult;

    var onSelect = express => {
      emit('select-search', express);
      emit('input', ((express.address || '') + " " + (express.name || '')).trim());
    };

    var onFinish = () => {
      field.value.blur();
    };

    var renderFinish = () => {
      if (props.value && props.focused && android) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": AddressEditDetail_bem('finish'),
          "onClick": onFinish
        }, [AddressEditDetail_t('complete')]);
      }
    };

    var renderSearchTitle = express => {
      if (express.name) {
        var text = express.name.replace(props.value, "<span class=" + AddressEditDetail_bem('keyword') + ">" + props.value + "</span>");
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "innerHTML": text
        }, null);
      }
    };

    var renderSearchResult = () => {
      if (!showSearchResult()) {
        return;
      }

      var {
        searchResult
      } = props;
      return searchResult.map(express => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell_Cell, {
        "clickable": true,
        "key": express.name + express.address,
        "icon": "location-o",
        "label": express.address,
        "class": AddressEditDetail_bem('search-item'),
        "border": false,
        "onClick": () => onSelect(express)
      }, {
        title: () => renderSearchTitle(express)
      }));
    };

    var onBlur = event => emit('blur', event);

    var onFocus = event => emit('focus', event);

    var onInput = value => emit('input', value);

    return () => {
      if (props.show) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Fragment, null, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(field_Field, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
          "autosize": true,
          "ref": field,
          "class": AddressEditDetail_bem(),
          "rows": props.detailRows,
          "type": "textarea",
          "label": AddressEditDetail_t('label'),
          "border": !showSearchResult(),
          "clearable": !android,
          "maxlength": props.detailMaxlength,
          "modelValue": props.value,
          "placeholder": AddressEditDetail_t('placeholder'),
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
;// CONCATENATED MODULE: ./es/address-edit/AddressEdit.js

 // Utils

 // Composables

 // Components










var [AddressEdit_name, AddressEdit_bem, AddressEdit_t] = createNamespace('address-edit');
var defaultData = {
  name: '',
  tel: '',
  city: '',
  county: '',
  country: '',
  province: '',
  areaCode: '',
  isDefault: false,
  postalCode: '',
  addressDetail: ''
};

function isPostal(value) {
  return /^\d{6}$/.test(value);
}

/* harmony default export */ var AddressEdit = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: AddressEdit_name,
  props: {
    areaList: Object,
    isSaving: Boolean,
    isDeleting: Boolean,
    validator: Function,
    showArea: truthProp,
    showDetail: truthProp,
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
      default: () => extend({}, defaultData)
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
      default: () => []
    }
  },
  emits: ['save', 'focus', 'delete', 'click-area', 'change-area', 'change-detail', 'cancel-delete', 'select-search', 'change-default'],

  setup(props, {
    emit,
    slots
  }) {
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
    var areaListLoaded = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => isObject(props.areaList) && Object.keys(props.areaList).length);
    var areaText = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        country,
        province,
        city,
        county,
        areaCode
      } = state.data;

      if (areaCode) {
        var arr = [country, province, city, county];

        if (province && province === city) {
          arr.splice(1, 1);
        }

        return arr.filter(Boolean).join('/');
      }

      return '';
    }); // hide bottom field when use search && detail get focused

    var hideBottomFields = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var _props$searchResult;

      return ((_props$searchResult = props.searchResult) == null ? void 0 : _props$searchResult.length) && state.detailFocused;
    });

    var assignAreaValues = () => {
      if (areaRef.value) {
        var detail = areaRef.value.getArea();
        detail.areaCode = detail.code;
        delete detail.code;
        extend(state.data, detail);
      }
    };

    var onFocus = key => {
      state.errorInfo[key] = '';
      state.detailFocused = key === 'addressDetail';
      emit('focus', key);
    };

    var getErrorMessage = key => {
      var value = String(state.data[key] || '').trim();

      if (props.validator) {
        var message = props.validator(key, value);

        if (message) {
          return message;
        }
      }

      switch (key) {
        case 'name':
          return value ? '' : AddressEdit_t('nameEmpty');

        case 'tel':
          return props.telValidator(value) ? '' : AddressEdit_t('telInvalid');

        case 'areaCode':
          return value ? '' : AddressEdit_t('areaEmpty');

        case 'addressDetail':
          return value ? '' : AddressEdit_t('addressEmpty');

        case 'postalCode':
          return value && !props.postalValidator(value) ? AddressEdit_t('postalEmpty') : '';
      }
    };

    var onSave = () => {
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

      var isValid = items.every(item => {
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

    var onChangeDetail = val => {
      state.data.addressDetail = val;
      emit('change-detail', val);
    };

    var onAreaConfirm = values => {
      values = values.filter(Boolean);

      if (values.some(value => !value.code)) {
        function_call_Toast(AddressEdit_t('areaEmpty'));
        return;
      }

      state.showAreaPopup = false;
      assignAreaValues();
      emit('change-area', values);
    };

    var onDelete = () => {
      function_call_Dialog.confirm({
        title: AddressEdit_t('confirmDelete')
      }).then(() => emit('delete', state.data)).catch(() => emit('cancel-delete', state.data));
    }; // get values of area component


    var getArea = () => areaRef.value ? areaRef.value.getValues() : []; // set area code to area component


    var setAreaCode = code => {
      state.data.areaCode = code || '';

      if (code) {
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(assignAreaValues);
      }
    };

    var onDetailBlur = () => {
      // await for click search event
      setTimeout(() => {
        state.detailFocused = false;
      });
    };

    var setAddressDetail = value => {
      state.data.addressDetail = value;
    };

    var renderSetDefaultCell = () => {
      if (props.showSetDefault) {
        var _slots = {
          'right-icon': () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(switch_Switch, {
            "modelValue": state.data.isDefault,
            "onUpdate:modelValue": $event => state.data.isDefault = $event,
            "size": "24",
            "onChange": event => emit('change-default', event)
          }, null)
        };
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell_Cell, {
          "center": true,
          "title": AddressEdit_t('defaultAddress'),
          "class": AddressEdit_bem('default')
        }, _slots), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, !hideBottomFields.value]]);
      }

      return null;
    };

    useExpose({
      getArea,
      setAreaCode,
      setAddressDetail
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.areaList, () => setAreaCode(state.data.areaCode));
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.addressInfo, value => {
      state.data = extend({}, defaultData, value);
      setAreaCode(value.areaCode);
    }, {
      deep: true,
      immediate: true
    });
    return () => {
      var {
        data,
        errorInfo
      } = state;
      var {
        disableArea
      } = props;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": AddressEdit_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": AddressEdit_bem('fields')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(field_Field, {
        "modelValue": data.name,
        "onUpdate:modelValue": $event => data.name = $event,
        "clearable": true,
        "label": AddressEdit_t('name'),
        "placeholder": AddressEdit_t('namePlaceholder'),
        "errorMessage": errorInfo.name,
        "onFocus": () => onFocus('name')
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(field_Field, {
        "modelValue": data.tel,
        "onUpdate:modelValue": $event => data.tel = $event,
        "clearable": true,
        "type": "tel",
        "label": AddressEdit_t('tel'),
        "maxlength": props.telMaxlength,
        "placeholder": AddressEdit_t('telPlaceholder'),
        "errorMessage": errorInfo.tel,
        "onFocus": () => onFocus('tel')
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(field_Field, {
        "readonly": true,
        "label": AddressEdit_t('area'),
        "clickable": !disableArea,
        "rightIcon": !disableArea ? 'arrow' : undefined,
        "modelValue": areaText.value,
        "placeholder": props.areaPlaceholder || AddressEdit_t('areaPlaceholder'),
        "errorMessage": errorInfo.areaCode,
        "onFocus": () => onFocus('areaCode'),
        "onClick": () => {
          emit('click-area');
          state.showAreaPopup = !disableArea;
        }
      }, null), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.showArea]]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(AddressEditDetail, {
        "show": props.showDetail,
        "value": data.addressDetail,
        "focused": state.detailFocused,
        "detailRows": props.detailRows,
        "errorMessage": errorInfo.addressDetail,
        "searchResult": props.searchResult,
        "detailMaxlength": props.detailMaxlength,
        "showSearchResult": props.showSearchResult,
        "onBlur": onDetailBlur,
        "onFocus": () => onFocus('addressDetail'),
        "onInput": onChangeDetail,
        "onSelectSearch": event => emit('select-search', event)
      }, null), props.showPostal && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(field_Field, {
        "modelValue": data.postalCode,
        "onUpdate:modelValue": $event => data.postalCode = $event,
        "type": "tel",
        "label": AddressEdit_t('postal'),
        "maxlength": "6",
        "placeholder": AddressEdit_t('postal'),
        "errorMessage": errorInfo.postalCode,
        "onFocus": () => onFocus('postalCode')
      }, null), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, !hideBottomFields.value]]), slots.default == null ? void 0 : slots.default()]), renderSetDefaultCell(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": AddressEdit_bem('buttons')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
        "block": true,
        "round": true,
        "type": "danger",
        "text": props.saveButtonText || AddressEdit_t('save'),
        "loading": props.isSaving,
        "onClick": onSave
      }, null), props.showDelete && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
        "block": true,
        "round": true,
        "loading": props.isDeleting,
        "text": props.deleteButtonText || AddressEdit_t('delete'),
        "onClick": onDelete
      }, null)]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, !hideBottomFields.value]]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup_Popup, {
        'show': state.showAreaPopup,
        "onUpdate:show": $event => state.showAreaPopup = $event,
        "round": true,
        "teleport": "body",
        "position": "bottom",
        "lazyRender": false
      }, {
        default: () => [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(area_Area, {
          "ref": areaRef,
          "value": data.areaCode,
          "loading": !areaListLoaded.value,
          "areaList": props.areaList,
          "columnsPlaceholder": props.areaColumnsPlaceholder,
          "onConfirm": onAreaConfirm,
          "onCancel": () => {
            state.showAreaPopup = false;
          }
        }, null)]
      })]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/address-edit/index.js


var address_edit_AddressEdit = withInstall(AddressEdit);
/* harmony default export */ var address_edit = ((/* unused pure expression or super */ null && (address_edit_AddressEdit)));

;// CONCATENATED MODULE: ./es/radio-group/RadioGroup.js





var [RadioGroup_name, RadioGroup_bem] = createNamespace('radio-group');
var RADIO_KEY = Symbol(RadioGroup_name);
var props = {
  disabled: Boolean,
  iconSize: [Number, String],
  direction: String,
  modelValue: unknownProp,
  checkedColor: String
};
/* harmony default export */ var RadioGroup = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: RadioGroup_name,
  props,
  emits: ['change', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var {
      linkChildren
    } = useChildren(RADIO_KEY);

    var updateValue = value => emit('update:modelValue', value);

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.modelValue, value => emit('change', value));
    linkChildren({
      props,
      updateValue
    });
    useLinkField(() => props.modelValue);
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": RadioGroup_bem([props.direction]),
      "role": "radiogroup"
    }, [slots.default == null ? void 0 : slots.default()]);
  }

}));
;// CONCATENATED MODULE: ./es/radio-group/index.js


var radio_group_RadioGroup = withInstall(RadioGroup);
/* harmony default export */ var radio_group = ((/* unused pure expression or super */ null && (radio_group_RadioGroup)));

;// CONCATENATED MODULE: ./es/tag/Tag.js




var [Tag_name, Tag_bem] = createNamespace('tag');
/* harmony default export */ var Tag = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Tag_name,
  props: {
    size: String,
    mark: Boolean,
    show: truthProp,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    closeable: Boolean,
    type: {
      type: String,
      default: 'default'
    }
  },
  emits: ['close'],

  setup(props, {
    slots,
    emit
  }) {
    var onClose = event => {
      event.stopPropagation();
      emit('close', event);
    };

    var getStyle = () => {
      if (props.plain) {
        return {
          color: props.textColor || props.color,
          borderColor: props.color
        };
      }

      return {
        color: props.textColor,
        background: props.color
      };
    };

    var renderTag = () => {
      var {
        type,
        mark,
        plain,
        round,
        size,
        closeable
      } = props;
      var classes = {
        mark,
        plain,
        round
      };

      if (size) {
        classes[size] = size;
      }

      var CloseIcon = closeable && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "name": "cross",
        "class": Tag_bem('close'),
        "onClick": onClose
      }, null);

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "style": getStyle(),
        "class": Tag_bem([classes, type])
      }, [slots.default == null ? void 0 : slots.default(), CloseIcon]);
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Transition, {
      "name": props.closeable ? 'van-fade' : undefined
    }, {
      default: () => [props.show ? renderTag() : null]
    });
  }

}));
;// CONCATENATED MODULE: ./es/tag/index.js


var tag_Tag = withInstall(Tag);
/* harmony default export */ var tag = ((/* unused pure expression or super */ null && (tag_Tag)));

;// CONCATENATED MODULE: ./es/checkbox/Checker.js




var checkerProps = {
  name: unknownProp,
  disabled: Boolean,
  iconSize: [Number, String],
  modelValue: unknownProp,
  checkedColor: String,
  labelPosition: String,
  labelDisabled: Boolean,
  shape: {
    type: String,
    default: 'round'
  }
};
/* harmony default export */ var Checker = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  props: extend({}, checkerProps, {
    role: String,
    parent: Object,
    checked: Boolean,
    bindGroup: truthProp,
    bem: {
      type: Function,
      required: true
    }
  }),
  emits: ['click', 'toggle'],

  setup(props, {
    emit,
    slots
  }) {
    var iconRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var getParentProp = name => {
      if (props.parent && props.bindGroup) {
        return props.parent.props[name];
      }
    };

    var disabled = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => getParentProp('disabled') || props.disabled);
    var direction = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => getParentProp('direction'));
    var iconStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var checkedColor = props.checkedColor || getParentProp('checkedColor');

      if (checkedColor && props.checked && !disabled.value) {
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor
        };
      }
    });

    var onClick = event => {
      var {
        target
      } = event;
      var icon = iconRef.value;
      var iconClicked = icon === target || icon.contains(target);

      if (!disabled.value && (iconClicked || !props.labelDisabled)) {
        emit('toggle');
      }

      emit('click', event);
    };

    var renderIcon = () => {
      var {
        bem,
        shape,
        checked
      } = props;
      var iconSize = props.iconSize || getParentProp('iconSize');
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": iconRef,
        "class": bem('icon', [shape, {
          disabled: disabled.value,
          checked
        }]),
        "style": {
          fontSize: addUnit(iconSize)
        }
      }, [slots.icon ? slots.icon({
        checked
      }) : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "name": "success",
        "style": iconStyle.value
      }, null)]);
    };

    var renderLabel = () => {
      if (slots.default) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": props.bem('label', [props.labelPosition, {
            disabled: disabled.value
          }])
        }, [slots.default()]);
      }
    };

    return () => {
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
      }, [nodes]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/radio/Radio.js

 // Utils


 // Composables

 // Components


var [Radio_name, Radio_bem] = createNamespace('radio');
/* harmony default export */ var Radio = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Radio_name,
  props: checkerProps,
  emits: ['update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var {
      parent
    } = useParent(RADIO_KEY);

    var checked = () => {
      var value = parent ? parent.props.modelValue : props.modelValue;
      return value === props.name;
    };

    var toggle = () => {
      if (parent) {
        parent.updateValue(props.name);
      } else {
        emit('update:modelValue', props.name);
      }
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Checker, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
      "bem": Radio_bem,
      "role": "radio",
      "parent": parent,
      "checked": checked(),
      "onToggle": toggle
    }, props), pick(slots, ['default', 'icon']));
  }

}));
;// CONCATENATED MODULE: ./es/radio/index.js


var radio_Radio = withInstall(Radio);
/* harmony default export */ var es_radio = ((/* unused pure expression or super */ null && (radio_Radio)));

;// CONCATENATED MODULE: ./es/address-list/AddressListItem.js

 // Utils

 // Components





var [AddressListItem_name, AddressListItem_bem] = createNamespace('address-item');
/* harmony default export */ var AddressListItem = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: AddressListItem_name,
  props: {
    disabled: Boolean,
    switchable: Boolean,
    defaultTagText: String,
    address: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'click', 'select'],

  setup(props, {
    slots,
    emit
  }) {
    var onClick = () => {
      if (props.switchable) {
        emit('select');
      }

      emit('click');
    };

    var renderRightIcon = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
      "name": "edit",
      "class": AddressListItem_bem('edit'),
      "onClick": event => {
        event.stopPropagation();
        emit('edit');
        emit('click');
      }
    }, null);

    var renderTag = () => {
      if (slots.tag) {
        return slots.tag(props.address);
      }

      if (props.address.isDefault && props.defaultTagText) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag_Tag, {
          "type": "danger",
          "round": true,
          "class": AddressListItem_bem('tag')
        }, {
          default: () => [props.defaultTagText]
        });
      }
    };

    var renderContent = () => {
      var {
        address,
        disabled,
        switchable
      } = props;
      var Info = [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": AddressListItem_bem('name')
      }, [address.name + " " + address.tel, renderTag()]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": AddressListItem_bem('address')
      }, [address.address])];

      if (switchable && !disabled) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(radio_Radio, {
          "name": address.id,
          "iconSize": 18
        }, {
          default: () => [Info]
        });
      }

      return Info;
    };

    return () => {
      var {
        disabled
      } = props;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": AddressListItem_bem({
          disabled
        }),
        "onClick": onClick
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell_Cell, {
        "border": false,
        "valueClass": AddressListItem_bem('value')
      }, {
        default: renderContent,
        'right-icon': renderRightIcon
      }), slots.bottom == null ? void 0 : slots.bottom(extend({}, props.address, {
        disabled
      }))]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/address-list/AddressList.js

 // Utils

 // Components




var [AddressList_name, AddressList_bem, AddressList_t] = createNamespace('address-list');
/* harmony default export */ var AddressList = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: AddressList_name,
  props: {
    modelValue: [Number, String],
    switchable: truthProp,
    disabledText: String,
    addButtonText: String,
    defaultTagText: String,
    list: {
      type: Array,
      default: () => []
    },
    disabledList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['add', 'edit', 'select', 'click-item', 'edit-disabled', 'select-disabled', 'update:modelValue'],

  setup(props, {
    slots,
    emit
  }) {
    var renderItem = (item, index, disabled) => {
      var onEdit = () => {
        var name = disabled ? 'edit-disabled' : 'edit';
        emit(name, item, index);
      };

      var onClick = () => emit('click-item', item, index);

      var onSelect = () => {
        var name = disabled ? 'select-disabled' : 'select';
        emit(name, item, index);

        if (!disabled) {
          emit('update:modelValue', item.id);
        }
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(AddressListItem, {
        "key": item.id,
        "address": item,
        "disabled": disabled,
        "switchable": props.switchable,
        "defaultTagText": props.defaultTagText,
        "onEdit": onEdit,
        "onClick": onClick,
        "onSelect": onSelect
      }, {
        bottom: slots['item-bottom'],
        tag: slots.tag
      });
    };

    var renderList = (list, disabled) => {
      if (list) {
        return list.map((item, index) => renderItem(item, index, disabled));
      }
    };

    var renderBottom = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": AddressList_bem('bottom')
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
      "round": true,
      "block": true,
      "type": "danger",
      "text": props.addButtonText || AddressList_t('add'),
      "class": AddressList_bem('add'),
      "onClick": () => emit('add')
    }, null)]);

    return () => {
      var List = renderList(props.list);
      var DisabledList = renderList(props.disabledList, true);

      var DisabledText = props.disabledText && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": AddressList_bem('disabled-text')
      }, [props.disabledText]);

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": AddressList_bem()
      }, [slots.top == null ? void 0 : slots.top(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(radio_group_RadioGroup, {
        "modelValue": props.modelValue
      }, {
        default: () => [List]
      }), DisabledText, DisabledList, slots.default == null ? void 0 : slots.default(), renderBottom()]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/address-list/index.js


var address_list_AddressList = withInstall(AddressList);
/* harmony default export */ var address_list = ((/* unused pure expression or super */ null && (address_list_AddressList)));

;// CONCATENATED MODULE: ./es/calendar/utils.js

var [utils_name, utils_bem, utils_t] = createNamespace('calendar');

function formatMonthTitle(date) {
  return utils_t('monthTitle', date.getFullYear(), date.getMonth() + 1);
}
function compareMonth(date1, date2) {
  var year1 = date1.getFullYear();
  var year2 = date2.getFullYear();

  if (year1 === year2) {
    var month1 = date1.getMonth();
    var month2 = date2.getMonth();
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
var cloneDate = date => new Date(date);
var cloneDates = dates => Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);
function getDayByOffset(date, offset) {
  var cloned = cloneDate(date);
  cloned.setDate(cloned.getDate() + offset);
  return cloned;
}
var getPrevDay = date => getDayByOffset(date, -1);
var getNextDay = date => getDayByOffset(date, 1);
var getToday = () => {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
function calcDateNum(date) {
  var day1 = date[0].getTime();
  var day2 = date[1].getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useRect/index.js


function useRect_isWindow(val) {
  return val === window;
}

function makeDOMRect(width, height) {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  };
}

var useRect = elementOrRef => {
  var element = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.unref)(elementOrRef);

  if (useRect_isWindow(element)) {
    var width = element.innerWidth;
    var height = element.innerHeight;
    return makeDOMRect(width, height);
  }

  if (element && element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }

  return makeDOMRect(0, 0);
};
;// CONCATENATED MODULE: ./es/composables/use-refs.js

function useRefs() {
  var refs = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)([]);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUpdate)(() => {
    refs.value = [];
  });

  var setRefs = index => el => {
    refs.value[index] = el;
  };

  return [refs, setRefs];
}
;// CONCATENATED MODULE: ./es/datetime-picker/utils.js


var sharedProps = extend({}, pickerProps, {
  filter: Function,
  columnsOrder: Array,
  formatter: {
    type: Function,
    default: (type, value) => value
  }
});
var pickerKeys = Object.keys(pickerProps);
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

  while (Number.isNaN(parseInt(value, 10))) {
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

function useToggle(defaultValue = false) {
  var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(defaultValue);

  var toggle = (value = !state.value) => {
    state.value = value;
  };

  return [state, toggle];
}
;// CONCATENATED MODULE: ./es/composables/use-height.js


var useHeight = element => {
  var height = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(() => {
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
      height.value = useRect(element).height;
    });
  });
  return height;
};
;// CONCATENATED MODULE: ./es/calendar/CalendarDay.js




var [CalendarDay_name] = createNamespace('calendar-day');
/* harmony default export */ var CalendarDay = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: CalendarDay_name,
  props: {
    color: String,
    index: Number,
    rowHeight: String,
    offset: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],

  setup(props, {
    emit,
    slots
  }) {
    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        item,
        index,
        color,
        offset,
        rowHeight
      } = props;
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

    var onClick = () => {
      if (props.item.type !== 'disabled') {
        emit('click', props.item);
      }
    };

    var renderTopInfo = () => {
      var {
        topInfo
      } = props.item;

      if (topInfo || slots['top-info']) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('top-info')
        }, [slots['top-info'] ? slots['top-info'](props.item) : topInfo]);
      }
    };

    var renderBottomInfo = () => {
      var {
        bottomInfo
      } = props.item;

      if (bottomInfo || slots['bottom-info']) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('bottom-info')
        }, [slots['bottom-info'] ? slots['bottom-info'](props.item) : bottomInfo]);
      }
    };

    var renderContent = () => {
      var {
        item,
        color,
        rowHeight
      } = props;
      var {
        type,
        text
      } = item;
      var Nodes = [renderTopInfo(), text, renderBottomInfo()];

      if (type === 'selected') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('selected-day'),
          "style": {
            width: rowHeight,
            height: rowHeight,
            background: color
          }
        }, [Nodes]);
      }

      return Nodes;
    };

    return () => {
      var {
        type,
        className
      } = props.item;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "gridcell",
        "style": style.value,
        "class": [utils_bem('day', type), className],
        "tabindex": type === 'disabled' ? undefined : -1,
        "onClick": onClick
      }, [renderContent()]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/calendar/CalendarMonth.js

 // Utils



 // Composables



 // Components


var [CalendarMonth_name] = createNamespace('calendar-month');
/* harmony default export */ var CalendarMonth = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: CalendarMonth_name,
  props: {
    type: String,
    color: String,
    showMark: Boolean,
    rowHeight: [Number, String],
    formatter: Function,
    lazyRender: Boolean,
    currentDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: Boolean,
    showMonthTitle: Boolean,
    firstDayOfWeek: Number,
    date: {
      type: Date,
      required: true
    },
    minDate: {
      type: Date,
      required: true
    },
    maxDate: {
      type: Date,
      required: true
    }
  },
  emits: ['click', 'update-height'],

  setup(props, {
    emit,
    slots
  }) {
    var [visible, setVisible] = useToggle();
    var daysRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var monthRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var height = useHeight(monthRef);
    var title = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => formatMonthTitle(props.date));
    var rowHeight = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => addUnit(props.rowHeight));
    var offset = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var realDay = props.date.getDay();

      if (props.firstDayOfWeek) {
        return (realDay + 7 - props.firstDayOfWeek) % 7;
      }

      return realDay;
    });
    var totalDay = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => getMonthEndDay(props.date.getFullYear(), props.date.getMonth() + 1));
    var shouldRender = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => visible.value || !props.lazyRender);

    var getTitle = () => title.value;

    var scrollIntoView = body => {
      var el = props.showSubtitle ? daysRef.value : monthRef.value;
      var scrollTop = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop;
      setScrollTop(body, scrollTop);
    };

    var getMultipleDayType = day => {
      var isSelected = date => props.currentDate.some(item => compareDay(item, date) === 0);

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

    var getRangeDayType = day => {
      var [startDay, endDay] = props.currentDate;

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

      return '';
    };

    var getDayType = day => {
      var {
        type,
        minDate,
        maxDate,
        currentDate
      } = props;

      if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
        return 'disabled';
      }

      if (currentDate === null) {
        return '';
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

      return '';
    };

    var getBottomInfo = dayType => {
      if (props.type === 'range') {
        if (dayType === 'start' || dayType === 'end') {
          return utils_t(dayType);
        }

        if (dayType === 'start-end') {
          return utils_t('startEnd');
        }
      }
    };

    var renderTitle = () => {
      if (props.showMonthTitle) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('month-title')
        }, [title.value]);
      }
    };

    var renderMark = () => {
      if (props.showMark && shouldRender.value) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('month-mark')
        }, [props.date.getMonth() + 1]);
      }
    };

    var placeholders = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var count = Math.ceil((totalDay.value + offset.value) / 7);
      return Array(count).fill({
        type: 'placeholder'
      });
    });
    var days = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var days = [];
      var year = props.date.getFullYear();
      var month = props.date.getMonth();

      for (var day = 1; day <= totalDay.value; day++) {
        var date = new Date(year, month, day);
        var type = getDayType(date);
        var config = {
          date,
          type,
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

    var renderDay = (item, index) => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(CalendarDay, {
      "item": item,
      "index": index,
      "color": props.color,
      "offset": offset.value,
      "rowHeight": rowHeight.value,
      "onClick": item => emit('click', item)
    }, pick(slots, ['top-info', 'bottom-info']));

    var renderDays = () => {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": daysRef,
        "role": "grid",
        "class": utils_bem('days')
      }, [renderMark(), (shouldRender.value ? days : placeholders).value.map(renderDay)]);
    };

    useExpose({
      getTitle,
      getHeight: () => height.value,
      setVisible,
      scrollIntoView
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": utils_bem('month'),
      "ref": monthRef
    }, [renderTitle(), renderDays()]);
  }

}));
;// CONCATENATED MODULE: ./es/calendar/CalendarHeader.js




var [CalendarHeader_name] = createNamespace('calendar-header');
/* harmony default export */ var CalendarHeader = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: CalendarHeader_name,
  props: {
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },

  setup(props, {
    slots
  }) {
    var renderTitle = () => {
      if (props.showTitle) {
        var text = props.title || utils_t('title');
        var title = slots.title ? slots.title() : text;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('header-title')
        }, [title]);
      }
    };

    var renderSubtitle = () => {
      if (props.showSubtitle) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": utils_bem('header-subtitle')
        }, [props.subtitle]);
      }
    };

    var renderWeekDays = () => {
      var {
        firstDayOfWeek
      } = props;
      var weekdays = utils_t('weekdays');
      var renderWeekDays = [...weekdays.slice(firstDayOfWeek, 7), ...weekdays.slice(0, firstDayOfWeek)];
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": utils_bem('weekdays')
      }, [renderWeekDays.map(text => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": utils_bem('weekday')
      }, [text]))]);
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": utils_bem('header')
    }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
  }

}));
;// CONCATENATED MODULE: ./es/calendar/Calendar.js

 // Utils


 // Composables



 // Components





 // Types

/* harmony default export */ var Calendar = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: utils_name,
  props: {
    show: Boolean,
    title: String,
    color: String,
    round: truthProp,
    readonly: Boolean,
    poppable: truthProp,
    teleport: [String, Object],
    showMark: truthProp,
    showTitle: truthProp,
    formatter: Function,
    rowHeight: [Number, String],
    confirmText: String,
    rangePrompt: String,
    lazyRender: truthProp,
    showConfirm: truthProp,
    // TODO: remove any
    // see: https://github.com/vuejs/vue-next/issues/2668
    defaultDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: truthProp,
    closeOnPopstate: truthProp,
    confirmDisabledText: String,
    closeOnClickOverlay: truthProp,
    safeAreaInsetBottom: truthProp,
    type: {
      type: String,
      default: 'single'
    },
    position: {
      type: String,
      default: 'bottom'
    },
    maxRange: {
      type: [Number, String],
      default: null
    },
    minDate: {
      type: Date,
      validator: isDate,
      default: getToday
    },
    maxDate: {
      type: Date,
      validator: isDate,
      default: () => {
        var now = getToday();
        return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
      }
    },
    firstDayOfWeek: {
      type: [Number, String],
      default: 0,
      validator: val => val >= 0 && val <= 6
    },
    showRangePrompt: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select', 'confirm', 'unselect', 'month-show', 'update:show', 'over-range'],

  setup(props, {
    emit,
    slots
  }) {
    var limitDateRange = (date, minDate = props.minDate, maxDate = props.maxDate) => {
      if (compareDay(date, minDate) === -1) {
        return minDate;
      }

      if (compareDay(date, maxDate) === 1) {
        return maxDate;
      }

      return date;
    };

    var getInitialDate = (defaultDate = props.defaultDate) => {
      var {
        type,
        minDate,
        maxDate
      } = props;

      if (defaultDate === null) {
        return defaultDate;
      }

      var now = getToday();

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
          return defaultDate.map(date => limitDateRange(date));
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
    var [monthRefs, setMonthRefs] = useRefs();
    var dayOffset = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => props.firstDayOfWeek ? +props.firstDayOfWeek % 7 : 0);
    var months = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var months = [];
      var cursor = new Date(props.minDate);
      cursor.setDate(1);

      do {
        months.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, props.maxDate) !== 1);

      return months;
    });
    var buttonDisabled = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        currentDate
      } = state;

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

    var onScroll = () => {
      var top = getScrollTop(bodyRef.value);
      var bottom = top + bodyHeight;
      var heights = months.value.map((item, index) => monthRefs.value[index].getHeight());
      var heightSum = heights.reduce((a, b) => a + b, 0); // iOS scroll bounce may exceed the range

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

      months.value.forEach((month, index) => {
        var visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
        monthRefs.value[index].setVisible(visible);
      });
      /* istanbul ignore else */

      if (currentMonth) {
        state.subtitle = currentMonth.getTitle();
      }
    };

    var scrollToDate = targetDate => {
      raf(() => {
        months.value.some((month, index) => {
          if (compareMonth(month, targetDate) === 0) {
            monthRefs.value[index].scrollIntoView(bodyRef.value);
            return true;
          }

          return false;
        });
        onScroll();
      });
    }; // scroll to current month


    var scrollIntoView = () => {
      if (props.poppable && !props.show) {
        return;
      }

      var {
        currentDate
      } = state;

      if (currentDate) {
        var targetDate = props.type === 'single' ? currentDate : currentDate[0];
        scrollToDate(targetDate);
      } else {
        raf(onScroll);
      }
    };

    var init = () => {
      if (props.poppable && !props.show) {
        return;
      }

      raf(() => {
        // add Math.floor to avoid decimal height issues
        // https://github.com/youzan/vant/issues/5640
        bodyHeight = Math.floor(useRect(bodyRef).height);
        scrollIntoView();
      });
    };

    var reset = (date = getInitialDate()) => {
      state.currentDate = date;
      scrollIntoView();
    };

    var checkRange = date => {
      var {
        maxRange,
        rangePrompt,
        showRangePrompt
      } = props;

      if (maxRange && calcDateNum(date) > maxRange) {
        if (showRangePrompt) {
          function_call_Toast(rangePrompt || utils_t('rangePrompt', maxRange));
        }

        emit('over-range');
        return false;
      }

      return true;
    };

    var onConfirm = () => emit('confirm', cloneDates(state.currentDate));

    var select = (date, complete) => {
      var setCurrentDate = date => {
        state.currentDate = date;
        emit('select', cloneDates(state.currentDate));
      };

      if (complete && props.type === 'range') {
        var valid = checkRange(date);

        if (!valid) {
          // auto selected to max range if showConfirm
          if (props.showConfirm) {
            setCurrentDate([date[0], getDayByOffset(date[0], +props.maxRange - 1)]);
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

    var onClickDay = item => {
      if (props.readonly || !item.date) {
        return;
      }

      var {
        date
      } = item;
      var {
        type
      } = props;
      var {
        currentDate
      } = state;

      if (type === 'range') {
        if (!currentDate) {
          select([date]);
          return;
        }

        var [startDay, endDay] = currentDate;

        if (startDay && !endDay) {
          var compareToStart = compareDay(date, startDay);

          if (compareToStart === 1) {
            select([startDay, date], true);
          } else if (compareToStart === -1) {
            select([date]);
          } else if (props.allowSameDay) {
            select([date, date], true);
          }
        } else {
          select([date]);
        }
      } else if (type === 'multiple') {
        if (!currentDate) {
          select([date]);
          return;
        }

        var selectedIndex;
        var selected = state.currentDate.some((dateItem, index) => {
          var equal = compareDay(dateItem, date) === 0;

          if (equal) {
            selectedIndex = index;
          }

          return equal;
        });

        if (selected) {
          var [unselectedDate] = currentDate.splice(selectedIndex, 1);
          emit('unselect', cloneDate(unselectedDate));
        } else if (props.maxRange && currentDate.length >= props.maxRange) {
          function_call_Toast(props.rangePrompt || utils_t('rangePrompt', props.maxRange));
        } else {
          select([...currentDate, date]);
        }
      } else {
        select(date, true);
      }
    };

    var updateShow = value => emit('update:show', value);

    var renderMonth = (date, index) => {
      var showMonthTitle = index !== 0 || !props.showSubtitle;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(CalendarMonth, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": setMonthRefs(index),
        "date": date,
        "currentDate": state.currentDate,
        "showMonthTitle": showMonthTitle,
        "firstDayOfWeek": dayOffset.value
      }, pick(props, ['type', 'color', 'minDate', 'maxDate', 'showMark', 'formatter', 'rowHeight', 'lazyRender', 'showSubtitle', 'allowSameDay']), {
        "onClick": onClickDay
      }), pick(slots, ['top-info', 'bottom-info']));
    };

    var renderFooterButton = () => {
      if (slots.footer) {
        return slots.footer();
      }

      if (props.showConfirm) {
        var text = buttonDisabled.value ? props.confirmDisabledText : props.confirmText;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
          "round": true,
          "block": true,
          "type": "danger",
          "color": props.color,
          "class": utils_bem('confirm'),
          "disabled": buttonDisabled.value,
          "nativeType": "button",
          "onClick": onConfirm
        }, {
          default: () => [text || utils_t('confirm')]
        });
      }
    };

    var renderFooter = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": utils_bem('footer', {
        unfit: !props.safeAreaInsetBottom
      })
    }, [renderFooterButton()]);

    var renderCalendar = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": utils_bem()
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(CalendarHeader, {
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

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.show, init);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => [props.type, props.minDate, props.maxDate], () => {
      reset(getInitialDate(state.currentDate));
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.defaultDate, value => {
      state.currentDate = value;
      scrollIntoView();
    });
    useExpose({
      reset,
      scrollToDate
    });
    onMountedOrActivated(init);
    return () => {
      if (props.poppable) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup_Popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
          "show": props.show,
          "class": utils_bem('popup'),
          "round": props.round,
          "position": props.position,
          "closeable": props.showTitle || props.showSubtitle,
          "teleport": props.teleport,
          "closeOnPopstate": props.closeOnPopstate,
          "closeOnClickOverlay": props.closeOnClickOverlay
        }, {
          'onUpdate:show': updateShow
        }), {
          default: () => [renderCalendar()]
        });
      }

      return renderCalendar();
    };
  }

}));
;// CONCATENATED MODULE: ./es/calendar/index.js


var calendar_Calendar = withInstall(Calendar);
/* harmony default export */ var calendar = ((/* unused pure expression or super */ null && (calendar_Calendar)));

;// CONCATENATED MODULE: ./es/image/Image.js

 // Utils

 // Components


var [Image_name, Image_bem] = createNamespace('image');
/* harmony default export */ var image_Image = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Image_name,
  props: {
    src: String,
    alt: String,
    fit: String,
    round: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    lazyLoad: Boolean,
    iconSize: [Number, String],
    showError: truthProp,
    iconPrefix: String,
    showLoading: truthProp,
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

  setup(props, {
    emit,
    slots
  }) {
    var error = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(false);
    var loading = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(true);
    var imageRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(); // TODO: types

    var {
      $Lazyload
    } = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)().proxy;
    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
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
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.src, () => {
      error.value = false;
      loading.value = true;
    });

    var onLoad = event => {
      loading.value = false;
      emit('load', event);
    };

    var onError = event => {
      error.value = true;
      loading.value = false;
      emit('error', event);
    };

    var renderLoadingIcon = () => {
      if (slots.loading) {
        return slots.loading();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "size": props.iconSize,
        "name": props.loadingIcon,
        "class": Image_bem('loading-icon'),
        "classPrefix": props.iconPrefix
      }, null);
    };

    var renderErrorIcon = () => {
      if (slots.error) {
        return slots.error();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "size": props.iconSize,
        "name": props.errorIcon,
        "class": Image_bem('error-icon'),
        "classPrefix": props.iconPrefix
      }, null);
    };

    var renderPlaceholder = () => {
      if (loading.value && props.showLoading) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Image_bem('loading')
        }, [renderLoadingIcon()]);
      }

      if (error.value && props.showError) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Image_bem('error')
        }, [renderErrorIcon()]);
      }
    };

    var renderImage = () => {
      if (error.value || !props.src) {
        return;
      }

      var attrs = {
        alt: props.alt,
        class: Image_bem('img'),
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

    var onLazyLoaded = ({
      el
    }) => {
      if (el === imageRef.value && loading.value) {
        onLoad();
      }
    };

    var onLazyLoadError = ({
      el
    }) => {
      if (el === imageRef.value && !error.value) {
        onError();
      }
    };

    if ($Lazyload && inBrowser) {
      $Lazyload.$on('loaded', onLazyLoaded);
      $Lazyload.$on('error', onLazyLoadError);
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(() => {
        $Lazyload.$off('loaded', onLazyLoaded);
        $Lazyload.$off('error', onLazyLoadError);
      });
    }

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Image_bem({
        round: props.round
      }),
      "style": style.value
    }, [renderImage(), renderPlaceholder(), slots.default == null ? void 0 : slots.default()]);
  }

}));
;// CONCATENATED MODULE: ./es/image/index.js


var es_image_Image = withInstall(image_Image);
/* harmony default export */ var es_image = ((/* unused pure expression or super */ null && (es_image_Image)));

;// CONCATENATED MODULE: ./es/card/Card.js

 // Utils

 // Components



var [Card_name, Card_bem] = createNamespace('card');
/* harmony default export */ var Card = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Card_name,
  props: {
    tag: String,
    num: [Number, String],
    desc: String,
    thumb: String,
    title: String,
    price: [Number, String],
    centered: Boolean,
    lazyLoad: Boolean,
    thumbLink: String,
    originPrice: [Number, String],
    currency: {
      type: String,
      default: '¥'
    }
  },
  emits: ['click-thumb'],

  setup(props, {
    slots,
    emit
  }) {
    var renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }

      if (props.title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [Card_bem('title'), 'van-multi-ellipsis--l2']
        }, [props.title]);
      }
    };

    var renderThumbTag = () => {
      if (slots.tag || props.tag) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Card_bem('tag')
        }, [slots.tag ? slots.tag() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag_Tag, {
          "mark": true,
          "type": "danger"
        }, {
          default: () => [props.tag]
        })]);
      }
    };

    var renderThumbImage = () => {
      if (slots.thumb) {
        return slots.thumb();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_image_Image, {
        "src": props.thumb,
        "fit": "cover",
        "width": "100%",
        "height": "100%",
        "lazyLoad": props.lazyLoad
      }, null);
    };

    var renderThumb = () => {
      if (slots.thumb || props.thumb) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("a", {
          "href": props.thumbLink,
          "class": Card_bem('thumb'),
          "onClick": event => emit('click-thumb', event)
        }, [renderThumbImage(), renderThumbTag()]);
      }
    };

    var renderDesc = () => {
      if (slots.desc) {
        return slots.desc();
      }

      if (props.desc) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": [Card_bem('desc'), 'van-ellipsis']
        }, [props.desc]);
      }
    };

    var renderPriceText = () => {
      var priceArr = props.price.toString().split('.');
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", null, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": Card_bem('price-currency')
      }, [props.currency]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": Card_bem('price-integer')
      }, [priceArr[0]]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createTextVNode)("."), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": Card_bem('price-decimal')
      }, [priceArr[1]])]);
    };

    return () => {
      var _slots$priceTop;

      var showNum = slots.num || isDef(props.num);
      var showPrice = slots.price || isDef(props.price);
      var showOriginPrice = slots['origin-price'] || isDef(props.originPrice);
      var showBottom = showNum || showPrice || showOriginPrice || slots.bottom;

      var Price = showPrice && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Card_bem('price')
      }, [slots.price ? slots.price() : renderPriceText()]);

      var OriginPrice = showOriginPrice && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Card_bem('origin-price')
      }, [slots['origin-price'] ? slots['origin-price']() : props.currency + " " + props.originPrice]);

      var Num = showNum && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Card_bem('num')
      }, [slots.num ? slots.num() : "x" + props.num]);

      var Footer = slots.footer && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Card_bem('footer')
      }, [slots.footer()]);

      var Bottom = showBottom && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Card_bem('bottom')
      }, [(_slots$priceTop = slots['price-top']) == null ? void 0 : _slots$priceTop.call(slots), Price, OriginPrice, Num, slots.bottom == null ? void 0 : slots.bottom()]);

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Card_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Card_bem('header')
      }, [renderThumb(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Card_bem('content', {
          centered: props.centered
        })
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", null, [renderTitle(), renderDesc(), slots.tags == null ? void 0 : slots.tags()]), Bottom])]), Footer]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/card/index.js


var card_Card = withInstall(Card);
/* harmony default export */ var card = ((/* unused pure expression or super */ null && (card_Card)));

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

  var onResize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  useEventListener('resize', onResize);
  useEventListener('orientationchange', onResize);
  return {
    width,
    height
  };
}
;// CONCATENATED MODULE: ./es/composables/use-visibility-change.js


 // @Experimental

function useVisibilityChange(target, onChange) {
  // compatibility: https://caniuse.com/#feat=intersectionobserver
  if (!inBrowser || !window.IntersectionObserver) {
    return;
  }

  var observer = new IntersectionObserver(entries => {
    // visibility changed
    onChange(entries[0].intersectionRatio > 0);
  }, {
    root: document.body
  });

  var observe = () => {
    if (target.value) {
      observer.observe(target.value);
    }
  };

  var unobserve = () => {
    if (target.value) {
      observer.unobserve(target.value);
    }
  };

  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onDeactivated)(unobserve);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(unobserve);
  onMountedOrActivated(observe);
}
;// CONCATENATED MODULE: ./es/sticky/Sticky.js

 // Utils

 // Composables



var [Sticky_name, Sticky_bem] = createNamespace('sticky');
/* harmony default export */ var Sticky = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Sticky_name,
  props: {
    zIndex: [Number, String],
    container: Object,
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
  emits: ['scroll', 'change'],

  setup(props, {
    emit,
    slots
  }) {
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
    var offset = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => unitToPx(props.position === 'top' ? props.offsetTop : props.offsetBottom));
    var rootStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        fixed,
        height,
        width
      } = state;

      if (fixed) {
        return {
          width: width + "px",
          height: height + "px"
        };
      }
    });
    var stickyStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (!state.fixed) {
        return;
      }

      var style = extend(getZIndexStyle(props.zIndex), {
        width: state.width + "px",
        height: state.height + "px",
        [props.position]: offset.value + "px"
      });

      if (state.transform) {
        style.transform = "translate3d(0, " + state.transform + "px, 0)";
      }

      return style;
    });

    var emitScroll = scrollTop => emit('scroll', {
      scrollTop,
      isFixed: state.fixed
    });

    var onScroll = () => {
      if (!root.value || isHidden(root)) {
        return;
      }

      var {
        container,
        position
      } = props;
      var rootRect = useRect(root);
      var scrollTop = getScrollTop(window);
      state.width = rootRect.width;
      state.height = rootRect.height;

      if (position === 'top') {
        // The sticky component should be kept inside the container element
        if (container) {
          var containerRect = useRect(container);
          var difference = containerRect.bottom - offset.value - state.height;
          state.fixed = offset.value > rootRect.top && containerRect.bottom > 0;
          state.transform = difference < 0 ? difference : 0;
        } else {
          state.fixed = offset.value > rootRect.top;
        }
      } else {
        var {
          clientHeight
        } = document.documentElement;

        if (container) {
          var _containerRect = useRect(container);

          var _difference = clientHeight - _containerRect.top - offset.value - state.height;

          state.fixed = clientHeight - offset.value < rootRect.bottom && clientHeight > _containerRect.top;
          state.transform = _difference < 0 ? -_difference : 0;
        } else {
          state.fixed = clientHeight - offset.value < rootRect.bottom;
        }
      }

      emitScroll(scrollTop);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => state.fixed, value => emit('change', value));
    useEventListener('scroll', onScroll, {
      target: scrollParent
    });
    useVisibilityChange(root, onScroll);
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "ref": root,
      "style": rootStyle.value
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Sticky_bem({
        fixed: state.fixed
      }),
      "style": stickyStyle.value
    }, [slots.default == null ? void 0 : slots.default()])]);
  }

}));
;// CONCATENATED MODULE: ./es/sticky/index.js


var sticky_Sticky = withInstall(Sticky);
/* harmony default export */ var sticky = ((/* unused pure expression or super */ null && (sticky_Sticky)));

;// CONCATENATED MODULE: ./es/tabs/TabsTitle.js




var [TabsTitle_name, TabsTitle_bem] = createNamespace('tab');
/* harmony default export */ var TabsTitle = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: TabsTitle_name,
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

  setup(props) {
    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var style = {};
      var {
        type,
        color,
        disabled,
        isActive,
        activeColor,
        inactiveColor
      } = props;
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

    var renderText = () => {
      var Text = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": TabsTitle_bem('text', {
          ellipsis: !props.scrollable
        })
      }, [props.renderTitle ? props.renderTitle() : props.title]);

      if (props.dot || isDef(props.badge) && props.badge !== '') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(badge_Badge, {
          "dot": props.dot,
          "content": props.badge
        }, {
          default: () => [Text]
        });
      }

      return Text;
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "role": "tab",
      "class": [TabsTitle_bem({
        active: props.isActive,
        disabled: props.disabled
      })],
      "style": style.value,
      "aria-selected": props.isActive
    }, [renderText()]);
  }

}));
;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/usePageVisibility/index.js



function usePageVisibility() {
  var visibility = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)('visible');

  var setVisibility = () => {
    if (utils_inBrowser) {
      visibility.value = document.hidden ? 'hidden' : 'visible';
    }
  };

  setVisibility();
  useEventListener('visibilitychange', setVisibility);
  return visibility;
}
;// CONCATENATED MODULE: ./es/swipe/Swipe.js

 // Utils

 // Composables





var [Swipe_name, Swipe_bem] = createNamespace('swipe');
var SWIPE_KEY = Symbol(Swipe_name);
var Swipe_props = {
  loop: truthProp,
  width: [Number, String],
  height: [Number, String],
  vertical: Boolean,
  touchable: truthProp,
  lazyRender: Boolean,
  indicatorColor: String,
  showIndicators: truthProp,
  stopPropagation: truthProp,
  autoplay: {
    type: [Number, String],
    default: 0
  },
  duration: {
    type: [Number, String],
    default: 500
  },
  initialSwipe: {
    type: [Number, String],
    default: 0
  }
};
/* harmony default export */ var Swipe = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Swipe_name,
  props: Swipe_props,
  emits: ['change'],

  setup(props, {
    emit,
    slots
  }) {
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
    var {
      children,
      linkChildren
    } = useChildren(SWIPE_KEY);
    var count = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => children.length);
    var size = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => state[props.vertical ? 'height' : 'width']);
    var delta = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => props.vertical ? touch.deltaY.value : touch.deltaX.value);
    var minOffset = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (state.rect) {
        var base = props.vertical ? state.rect.height : state.rect.width;
        return base - size.value * count.value;
      }

      return 0;
    });
    var maxCount = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => Math.ceil(Math.abs(minOffset.value) / size.value));
    var trackSize = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => count.value * size.value);
    var activeIndicator = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => (state.active + count.value) % count.value);
    var isCorrectDirection = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var expect = props.vertical ? 'vertical' : 'horizontal';
      return touch.direction.value === expect;
    });
    var trackStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var style = {
        transitionDuration: (state.swiping ? 0 : props.duration) + "ms",
        transform: "translate" + (props.vertical ? 'Y' : 'X') + "(" + state.offset + "px)"
      };

      if (size.value) {
        var mainAxis = props.vertical ? 'height' : 'width';
        var crossAxis = props.vertical ? 'width' : 'height';
        style[mainAxis] = trackSize.value + "px";
        style[crossAxis] = props[crossAxis] ? props[crossAxis] + "px" : '';
      }

      return style;
    });

    var getTargetActive = pace => {
      var {
        active
      } = state;

      if (pace) {
        if (props.loop) {
          return range(active + pace, -1, count.value);
        }

        return range(active + pace, 0, maxCount.value);
      }

      return active;
    };

    var getTargetOffset = (targetActive, offset = 0) => {
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

    var move = ({
      pace = 0,
      offset = 0,
      emitChange
    }) => {
      if (count.value <= 1) {
        return;
      }

      var {
        active
      } = state;
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

    var correctPosition = () => {
      state.swiping = true;

      if (state.active <= -1) {
        move({
          pace: count.value
        });
      } else if (state.active >= count.value) {
        move({
          pace: -count.value
        });
      }
    }; // swipe to prev item


    var prev = () => {
      correctPosition();
      touch.reset();
      doubleRaf(() => {
        state.swiping = false;
        move({
          pace: -1,
          emitChange: true
        });
      });
    }; // swipe to next item


    var next = () => {
      correctPosition();
      touch.reset();
      doubleRaf(() => {
        state.swiping = false;
        move({
          pace: 1,
          emitChange: true
        });
      });
    };

    var autoplayTimer;

    var stopAutoplay = () => clearTimeout(autoplayTimer);

    var autoplay = () => {
      stopAutoplay();

      if (props.autoplay > 0 && count.value > 1) {
        autoplayTimer = setTimeout(() => {
          next();
          autoplay();
        }, +props.autoplay);
      }
    }; // initialize swipe position


    var initialize = (active = +props.initialSwipe) => {
      if (!root.value) {
        return;
      }

      if (!isHidden(root)) {
        var _props$width, _props$height;

        var rect = {
          width: root.value.offsetWidth,
          height: root.value.offsetHeight
        };
        state.rect = rect;
        state.width = +((_props$width = props.width) != null ? _props$width : rect.width);
        state.height = +((_props$height = props.height) != null ? _props$height : rect.height);
      }

      if (count.value) {
        active = Math.min(count.value - 1, active);
      }

      state.active = active;
      state.swiping = true;
      state.offset = getTargetOffset(active);
      children.forEach(swipe => {
        swipe.setOffset(0);
      });
    };

    var resize = () => initialize(state.active);

    var touchStartTime;

    var onTouchStart = event => {
      if (!props.touchable) return;
      touch.start(event);
      touchStartTime = Date.now();
      stopAutoplay();
      correctPosition();
    };

    var onTouchMove = event => {
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

    var onTouchEnd = () => {
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
          pace,
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

    var swipeTo = (index, options = {}) => {
      correctPosition();
      touch.reset();
      doubleRaf(() => {
        var targetIndex;

        if (props.loop && index === count.value) {
          targetIndex = state.active === 0 ? 0 : index;
        } else {
          targetIndex = index % count.value;
        }

        if (options.immediate) {
          doubleRaf(() => {
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

    var renderDot = (_, index) => {
      var active = index === activeIndicator.value;
      var style = active ? {
        backgroundColor: props.indicatorColor
      } : undefined;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("i", {
        "style": style,
        "class": Swipe_bem('indicator', {
          active
        })
      }, null);
    };

    var renderIndicator = () => {
      if (slots.indicator) {
        return slots.indicator({
          active: activeIndicator.value
        });
      }

      if (props.showIndicators && count.value > 1) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Swipe_bem('indicators', {
            vertical: props.vertical
          })
        }, [Array(count.value).fill('').map(renderDot)]);
      }
    };

    useExpose({
      prev,
      next,
      state,
      resize,
      swipeTo
    });
    linkChildren({
      size,
      props,
      count,
      activeIndicator
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.initialSwipe, value => initialize(+value));
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(count, () => initialize(state.active));
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([count, () => props.autoplay], autoplay);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([windowSize.width, windowSize.height], resize);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(usePageVisibility(), visible => {
      if (visible === 'visible') {
        autoplay();
      } else {
        stopAutoplay();
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(initialize);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onActivated)(() => initialize(state.active));
    onPopupReopen(() => initialize(state.active));
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onDeactivated)(stopAutoplay);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(stopAutoplay);
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "ref": root,
      "class": Swipe_bem()
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "style": trackStyle.value,
      "class": Swipe_bem('track', {
        vertical: props.vertical
      }),
      "onTouchstart": onTouchStart,
      "onTouchmove": onTouchMove,
      "onTouchend": onTouchEnd,
      "onTouchcancel": onTouchEnd
    }, [slots.default == null ? void 0 : slots.default()]), renderIndicator()]);
  }

}));
;// CONCATENATED MODULE: ./es/swipe/index.js


var swipe_Swipe = withInstall(Swipe);
/* harmony default export */ var swipe = ((/* unused pure expression or super */ null && (swipe_Swipe)));

;// CONCATENATED MODULE: ./es/tabs/TabsContent.js




var [TabsContent_name, TabsContent_bem] = createNamespace('tabs');
/* harmony default export */ var TabsContent = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: TabsContent_name,
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

  setup(props, {
    emit,
    slots
  }) {
    var swipeRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var onChange = index => emit('change', index);

    var renderChildren = () => {
      var Content = slots.default == null ? void 0 : slots.default();

      if (props.animated || props.swipeable) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(swipe_Swipe, {
          "ref": swipeRef,
          "loop": false,
          "class": TabsContent_bem('track'),
          "duration": +props.duration * 1000,
          "touchable": props.swipeable,
          "lazyRender": props.lazyRender,
          "showIndicators": false,
          "onChange": onChange
        }, {
          default: () => [Content]
        });
      }

      return Content;
    };

    var swipeToCurrentTab = index => {
      var swipe = swipeRef.value;

      if (swipe && swipe.state.active !== index) {
        swipe.swipeTo(index, {
          immediate: !props.inited
        });
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.currentIndex, swipeToCurrentTab);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(() => {
      swipeToCurrentTab(props.currentIndex);
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": TabsContent_bem('content', {
        animated: props.animated || props.swipeable
      })
    }, [renderChildren()]);
  }

}));
;// CONCATENATED MODULE: ./es/tabs/Tabs.js

 // Utils




 // Composables





 // Components




var [Tabs_name, Tabs_bem] = createNamespace('tabs');
var TABS_KEY = Symbol(Tabs_name);
var Tabs_props = {
  color: String,
  border: Boolean,
  sticky: Boolean,
  animated: Boolean,
  ellipsis: truthProp,
  swipeable: Boolean,
  scrollspy: Boolean,
  background: String,
  lazyRender: truthProp,
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
  duration: {
    type: [Number, String],
    default: 0.3
  },
  offsetTop: {
    type: [Number, String],
    default: 0
  },
  swipeThreshold: {
    type: [Number, String],
    default: 5
  }
};
/* harmony default export */ var Tabs = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Tabs_name,
  props: Tabs_props,
  emits: ['click', 'change', 'scroll', 'disabled', 'rendered', 'update:active'],

  setup(props, {
    emit,
    slots
  }) {
    var tabHeight;
    var lockScroll;
    var stickyFixed;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var navRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var wrapRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var windowSize = useWindowSize();
    var scroller = useScrollParent(root);
    var [titleRefs, setTitleRefs] = useRefs();
    var {
      children,
      linkChildren
    } = useChildren(TABS_KEY);
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      inited: false,
      position: '',
      lineStyle: {},
      currentIndex: -1
    }); // whether the nav is scrollable

    var scrollable = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => children.length > props.swipeThreshold || !props.ellipsis);
    var navStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => ({
      borderColor: props.color,
      background: props.background
    }));

    var getTabName = (tab, index) => {
      var _tab$name;

      return (_tab$name = tab.name) != null ? _tab$name : index;
    };

    var currentName = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var activeTab = children[state.currentIndex];

      if (activeTab) {
        return getTabName(activeTab, state.currentIndex);
      }
    });
    var offsetTopPx = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => unitToPx(props.offsetTop));
    var scrollOffset = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (props.sticky) {
        return offsetTopPx.value + tabHeight;
      }

      return 0;
    }); // scroll active tab into view

    var scrollIntoView = immediate => {
      var nav = navRef.value;
      var titles = titleRefs.value;

      if (!scrollable.value || !nav || !titles || !titles[state.currentIndex]) {
        return;
      }

      var title = titles[state.currentIndex].$el;
      var to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      scrollLeftTo(nav, to, immediate ? 0 : +props.duration);
    }; // update nav bar style


    var setLine = () => {
      var shouldAnimate = state.inited;
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        var titles = titleRefs.value;

        if (!titles || !titles[state.currentIndex] || props.type !== 'line' || isHidden(root.value)) {
          return;
        }

        var title = titles[state.currentIndex].$el;
        var {
          lineWidth,
          lineHeight
        } = props;
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

    var findAvailableTab = index => {
      var diff = index < state.currentIndex ? -1 : 1;

      while (index >= 0 && index < children.length) {
        if (!children[index].disabled) {
          return index;
        }

        index += diff;
      }
    };

    var setCurrentIndex = currentIndex => {
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


    var setCurrentIndexByName = name => {
      var matched = children.find((tab, index) => getTabName(tab, index) === name);
      var index = matched ? children.indexOf(matched) : 0;
      setCurrentIndex(index);
    };

    var scrollToCurrentContent = (immediate = false) => {
      if (props.scrollspy) {
        var target = children[state.currentIndex].$el;

        if (target && scroller.value) {
          var to = getElementTop(target, scroller.value) - scrollOffset.value;
          lockScroll = true;
          scrollTopTo(scroller.value, to, immediate ? 0 : +props.duration, () => {
            lockScroll = false;
          });
        }
      }
    }; // emit event when clicked


    var onClick = (item, index) => {
      var {
        title,
        disabled
      } = children[index];
      var name = getTabName(children[index], index);

      if (disabled) {
        emit('disabled', name, title);
      } else {
        callInterceptor({
          interceptor: props.beforeChange,
          args: [name],
          done: () => {
            setCurrentIndex(index);
            scrollToCurrentContent();
          }
        });
        emit('click', name, title);
        route(item);
      }
    };

    var onStickyScroll = params => {
      stickyFixed = params.isFixed;
      emit('scroll', params);
    };

    var scrollTo = name => {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        setCurrentIndexByName(name);
        scrollToCurrentContent(true);
      });
    };

    var getCurrentIndexOnScroll = () => {
      for (var index = 0; index < children.length; index++) {
        var top = getVisibleTop(children[index].$el);

        if (top > scrollOffset.value) {
          return index === 0 ? 0 : index - 1;
        }
      }

      return children.length - 1;
    };

    var onScroll = () => {
      if (props.scrollspy && !lockScroll) {
        var index = getCurrentIndexOnScroll();
        setCurrentIndex(index);
      }
    };

    var renderNav = () => children.map((item, index) => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(TabsTitle, {
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
      "onClick": () => {
        onClick(item, index);
      }
    }, null));

    var renderHeader = () => {
      var _slots$navLeft, _slots$navRight;

      var {
        type,
        border
      } = props;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": wrapRef,
        "class": [Tabs_bem('wrap', {
          scrollable: scrollable.value
        }), {
          [BORDER_TOP_BOTTOM]: type === 'line' && border
        }]
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": navRef,
        "role": "tablist",
        "class": Tabs_bem('nav', [type, {
          complete: scrollable.value
        }]),
        "style": navStyle.value
      }, [(_slots$navLeft = slots['nav-left']) == null ? void 0 : _slots$navLeft.call(slots), renderNav(), type === 'line' && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Tabs_bem('line'),
        "style": state.lineStyle
      }, null), (_slots$navRight = slots['nav-right']) == null ? void 0 : _slots$navRight.call(slots)])]);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([() => props.color, windowSize.width], setLine);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.active, value => {
      if (value !== currentName.value) {
        setCurrentIndexByName(value);
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => children.length, () => {
      if (state.inited) {
        setCurrentIndexByName(props.active);
        setLine();
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
          scrollIntoView(true);
        });
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => state.currentIndex, () => {
      scrollIntoView();
      setLine(); // scroll to correct position

      if (stickyFixed && !props.scrollspy) {
        setRootScrollTop(Math.ceil(getElementTop(root.value) - offsetTopPx.value));
      }
    });

    var init = () => {
      setCurrentIndexByName(props.active);
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        state.inited = true;
        tabHeight = getVisibleHeight(wrapRef.value);
        scrollIntoView(true);
      });
    };

    var onRendered = (name, title) => emit('rendered', name, title);

    useExpose({
      resize: setLine,
      scrollTo
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onActivated)(setLine);
    onPopupReopen(setLine);
    onMountedOrActivated(init);
    useEventListener('scroll', onScroll, {
      target: scroller
    });
    linkChildren({
      props,
      setLine,
      onRendered,
      currentName,
      scrollIntoView
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "ref": root,
      "class": Tabs_bem([props.type])
    }, [props.sticky ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(sticky_Sticky, {
      "container": root.value,
      "offsetTop": offsetTopPx.value,
      "onScroll": onStickyScroll
    }, {
      default: () => [renderHeader()]
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
      default: () => [slots.default == null ? void 0 : slots.default()]
    })]);
  }

}));
;// CONCATENATED MODULE: ./es/composables/use-tab-status.js
 // eslint-disable-next-line

var TAB_STATUS_KEY = Symbol();
function useTabStatus() {
  return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.inject)(TAB_STATUS_KEY, null);
}
;// CONCATENATED MODULE: ./es/swipe-item/SwipeItem.js

 // Utils


 // Composables



var [SwipeItem_name, SwipeItem_bem] = createNamespace('swipe-item');
/* harmony default export */ var SwipeItem = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: SwipeItem_name,

  setup(props, {
    slots
  }) {
    var rendered;
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      offset: 0,
      inited: false,
      mounted: false
    });
    var {
      parent,
      index
    } = useParent(SWIPE_KEY);

    if (!parent) {
      if (false) {}

      return;
    }

    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var style = {};
      var {
        vertical
      } = parent.props;

      if (parent.size.value) {
        style[vertical ? 'height' : 'width'] = parent.size.value + "px";
      }

      if (state.offset) {
        style.transform = "translate" + (vertical ? 'Y' : 'X') + "(" + state.offset + "px)";
      }

      return style;
    });
    var shouldRender = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        loop,
        lazyRender
      } = parent.props;

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

    var setOffset = offset => {
      state.offset = offset;
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(() => {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        state.mounted = true;
      });
    });
    useExpose({
      setOffset
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": SwipeItem_bem(),
      "style": style.value
    }, [shouldRender.value ? slots.default == null ? void 0 : slots.default() : null]);
  }

}));
;// CONCATENATED MODULE: ./es/swipe-item/index.js


var swipe_item_SwipeItem = withInstall(SwipeItem);
/* harmony default export */ var swipe_item = ((/* unused pure expression or super */ null && (swipe_item_SwipeItem)));

;// CONCATENATED MODULE: ./es/tab/Tab.js

 // Utils


 // Composables



 // Components


var [Tab_name, Tab_bem] = createNamespace('tab');
/* harmony default export */ var Tab = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Tab_name,
  props: extend({}, routeProps, {
    dot: Boolean,
    name: [Number, String],
    badge: [Number, String],
    title: String,
    disabled: Boolean,
    titleClass: unknownProp,
    titleStyle: [String, Object]
  }),

  setup(props, {
    slots
  }) {
    var inited = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(false);
    var {
      parent,
      index
    } = useParent(TABS_KEY);

    if (!parent) {
      if (false) {}

      return;
    }

    var getName = () => {
      var _props$name;

      return (_props$name = props.name) != null ? _props$name : index.value;
    };

    var init = () => {
      inited.value = true;

      if (parent.props.lazyRender) {
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
          parent.onRendered(getName(), props.title);
        });
      }
    };

    var active = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var isActive = getName() === parent.currentName.value;

      if (isActive && !inited.value) {
        init();
      }

      return isActive;
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.title, () => {
      parent.setLine();
      parent.scrollIntoView();
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.provide)(TAB_STATUS_KEY, active);
    return () => {
      var {
        animated,
        swipeable,
        scrollspy,
        lazyRender
      } = parent.props;

      if (!slots.default && !animated) {
        return;
      }

      var show = scrollspy || active.value;

      if (animated || swipeable) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(swipe_item_SwipeItem, {
          "role": "tabpanel",
          "aria-hidden": !active.value,
          "class": Tab_bem('pane-wrapper', {
            inactive: !active.value
          })
        }, {
          default: () => [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
            "class": Tab_bem('pane')
          }, [slots.default == null ? void 0 : slots.default()])]
        });
      }

      var shouldRender = inited.value || scrollspy || !lazyRender;
      var Content = shouldRender ? slots.default == null ? void 0 : slots.default() : null;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "tabpanel",
        "class": Tab_bem('pane')
      }, [Content]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, show]]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/tab/index.js


var tab_Tab = withInstall(Tab);
/* harmony default export */ var tab = ((/* unused pure expression or super */ null && (tab_Tab)));

;// CONCATENATED MODULE: ./es/tabs/index.js


var tabs_Tabs = withInstall(Tabs);
/* harmony default export */ var tabs = ((/* unused pure expression or super */ null && (tabs_Tabs)));

;// CONCATENATED MODULE: ./es/cascader/Cascader.js


 // Components




var [Cascader_name, Cascader_bem, Cascader_t] = createNamespace('cascader');
/* harmony default export */ var Cascader = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Cascader_name,
  props: {
    title: String,
    closeable: truthProp,
    swipeable: truthProp,
    modelValue: [Number, String],
    fieldNames: Object,
    placeholder: String,
    activeColor: String,
    options: {
      type: Array,
      default: () => []
    },
    closeIcon: {
      type: String,
      default: 'cross'
    }
  },
  emits: ['close', 'change', 'finish', 'update:modelValue', 'click-tab'],

  setup(props, {
    slots,
    emit
  }) {
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      tabs: [],
      activeTab: 0
    });
    var {
      text: textKey,
      value: valueKey,
      children: childrenKey
    } = extend({
      text: 'text',
      value: 'value',
      children: 'children'
    }, props.fieldNames);

    var getSelectedOptionsByValue = (options, value) => {
      for (var i = 0; i < options.length; i++) {
        var option = options[i];

        if (option[valueKey] === value) {
          return [option];
        }

        if (option[childrenKey]) {
          var selectedOptions = getSelectedOptionsByValue(option[childrenKey], value);

          if (selectedOptions) {
            return [option, ...selectedOptions];
          }
        }
      }
    };

    var updateTabs = () => {
      if (props.modelValue || props.modelValue === 0) {
        var selectedOptions = getSelectedOptionsByValue(props.options, props.modelValue);

        if (selectedOptions) {
          var optionsCursor = props.options;
          state.tabs = selectedOptions.map(option => {
            var tab = {
              options: optionsCursor,
              selectedOption: option
            };
            var next = optionsCursor.find(item => item[valueKey] === option[valueKey]);

            if (next) {
              optionsCursor = next[childrenKey];
            }

            return tab;
          });

          if (optionsCursor) {
            state.tabs.push({
              options: optionsCursor,
              selectedOption: null
            });
          }

          (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
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

    var onSelect = (option, tabIndex) => {
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

        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
          state.activeTab++;
        });
      }

      var selectedOptions = state.tabs.map(tab => tab.selectedOption).filter(Boolean);
      var eventParams = {
        value: option[valueKey],
        tabIndex,
        selectedOptions
      };
      emit('update:modelValue', option[valueKey]);
      emit('change', eventParams);

      if (!option[childrenKey]) {
        emit('finish', eventParams);
      }
    };

    var onClose = () => emit('close');

    var onClickTab = (tabIndex, title) => {
      emit('click-tab', tabIndex, title);
    };

    var renderHeader = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Cascader_bem('header')
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("h2", {
      "class": Cascader_bem('title')
    }, [slots.title ? slots.title() : props.title]), props.closeable ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
      "name": props.closeIcon,
      "class": Cascader_bem('close-icon'),
      "onClick": onClose
    }, null) : null]);

    var renderOptions = (options, selectedOption, tabIndex) => {
      var renderOption = option => {
        var isSelected = selectedOption && option[valueKey] === selectedOption[valueKey];
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
          "class": Cascader_bem('option', {
            selected: isSelected
          }),
          "style": {
            color: isSelected ? props.activeColor : undefined
          },
          "onClick": () => onSelect(option, tabIndex)
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [option[textKey]]), isSelected ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": "success",
          "class": Cascader_bem('selected-icon')
        }, null) : null]);
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("ul", {
        "class": Cascader_bem('options')
      }, [options.map(renderOption)]);
    };

    var renderTab = (tab, tabIndex) => {
      var {
        options,
        selectedOption
      } = tab;
      var title = selectedOption ? selectedOption[textKey] : props.placeholder || Cascader_t('select');
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tab_Tab, {
        "title": title,
        "titleClass": Cascader_bem('tab', {
          unselected: !selectedOption
        })
      }, {
        default: () => [renderOptions(options, selectedOption, tabIndex)]
      });
    };

    var renderTabs = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tabs_Tabs, {
      'active': state.activeTab,
      "onUpdate:active": $event => state.activeTab = $event,
      "animated": true,
      "class": Cascader_bem('tabs'),
      "color": props.activeColor,
      "swipeThreshold": 0,
      "swipeable": props.swipeable,
      "onClick": onClickTab
    }, {
      default: () => [state.tabs.map(renderTab)]
    });

    updateTabs();
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.options, updateTabs, {
      deep: true
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.modelValue, value => {
      if (value || value === 0) {
        var values = state.tabs.map(tab => {
          var _tab$selectedOption;

          return (_tab$selectedOption = tab.selectedOption) == null ? void 0 : _tab$selectedOption[valueKey];
        });

        if (values.includes(value)) {
          return;
        }
      }

      updateTabs();
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Cascader_bem()
    }, [renderHeader(), renderTabs()]);
  }

}));
;// CONCATENATED MODULE: ./es/cascader/index.js


var cascader_Cascader = withInstall(Cascader);
/* harmony default export */ var cascader = ((/* unused pure expression or super */ null && (cascader_Cascader)));

;// CONCATENATED MODULE: ./es/cell-group/CellGroup.js




var [CellGroup_name, CellGroup_bem] = createNamespace('cell-group');
/* harmony default export */ var CellGroup = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: CellGroup_name,
  inheritAttrs: false,
  props: {
    title: String,
    border: truthProp
  },

  setup(props, {
    slots,
    attrs
  }) {
    var renderGroup = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
      "class": [CellGroup_bem(), {
        [BORDER_TOP_BOTTOM]: props.border
      }]
    }, attrs), [slots.default == null ? void 0 : slots.default()]);

    var renderTitle = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": CellGroup_bem('title')
    }, [slots.title ? slots.title() : props.title]);

    return () => {
      if (props.title || slots.title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Fragment, null, [renderTitle(), renderGroup()]);
      }

      return renderGroup();
    };
  }

}));
;// CONCATENATED MODULE: ./es/cell-group/index.js


var cell_group_CellGroup = withInstall(CellGroup);
/* harmony default export */ var cell_group = ((/* unused pure expression or super */ null && (cell_group_CellGroup)));

;// CONCATENATED MODULE: ./es/checkbox-group/CheckboxGroup.js






var [CheckboxGroup_name, CheckboxGroup_bem] = createNamespace('checkbox-group');
var CHECKBOX_GROUP_KEY = Symbol(CheckboxGroup_name);
var CheckboxGroup_props = {
  max: [Number, String],
  disabled: Boolean,
  direction: String,
  iconSize: [Number, String],
  checkedColor: String,
  modelValue: {
    type: Array,
    default: () => []
  }
};
/* harmony default export */ var CheckboxGroup = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: CheckboxGroup_name,
  props: CheckboxGroup_props,
  emits: ['change', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var {
      children,
      linkChildren
    } = useChildren(CHECKBOX_GROUP_KEY);

    var updateValue = value => emit('update:modelValue', value);

    var toggleAll = (options = {}) => {
      if (typeof options === 'boolean') {
        options = {
          checked: options
        };
      }

      var {
        checked,
        skipDisabled
      } = options;
      var checkedChildren = children.filter(item => {
        if (!item.props.bindGroup) {
          return false;
        }

        if (item.props.disabled && skipDisabled) {
          return item.checked.value;
        }

        return checked != null ? checked : !item.checked.value;
      });
      var names = checkedChildren.map(item => item.name);
      updateValue(names);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.modelValue, value => emit('change', value));
    useExpose({
      toggleAll
    });
    useLinkField(() => props.modelValue);
    linkChildren({
      props,
      updateValue
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": CheckboxGroup_bem([props.direction])
    }, [slots.default == null ? void 0 : slots.default()]);
  }

}));
;// CONCATENATED MODULE: ./es/checkbox/Checkbox.js

 // Utils


 // Composables



 // Components


var [Checkbox_name, Checkbox_bem] = createNamespace('checkbox');
/* harmony default export */ var Checkbox = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Checkbox_name,
  props: extend({}, checkerProps, {
    bindGroup: truthProp
  }),
  emits: ['change', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var {
      parent
    } = useParent(CHECKBOX_GROUP_KEY);

    var setParentValue = checked => {
      var {
        name
      } = props;
      var {
        max,
        modelValue
      } = parent.props;
      var value = modelValue.slice();

      if (checked) {
        var overlimit = max && value.length >= max;

        if (!overlimit && !value.includes(name)) {
          value.push(name);

          if (props.bindGroup) {
            parent.updateValue(value);
          }
        }
      } else {
        var index = value.indexOf(name);

        if (index !== -1) {
          value.splice(index, 1);

          if (props.bindGroup) {
            parent.updateValue(value);
          }
        }
      }
    };

    var checked = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (parent && props.bindGroup) {
        return parent.props.modelValue.indexOf(props.name) !== -1;
      }

      return !!props.modelValue;
    });

    var toggle = (newValue = !checked.value) => {
      if (parent && props.bindGroup) {
        setParentValue(newValue);
      } else {
        emit('update:modelValue', newValue);
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.modelValue, value => emit('change', value));
    useExpose({
      toggle,
      props,
      checked
    });
    useLinkField(() => props.modelValue);
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Checker, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
      "bem": Checkbox_bem,
      "role": "checkbox",
      "parent": parent,
      "checked": checked.value,
      "onToggle": toggle
    }, props), pick(slots, ['default', 'icon']));
  }

}));
;// CONCATENATED MODULE: ./es/checkbox/index.js


var checkbox_Checkbox = withInstall(Checkbox);
/* harmony default export */ var es_checkbox = ((/* unused pure expression or super */ null && (checkbox_Checkbox)));

;// CONCATENATED MODULE: ./es/checkbox-group/index.js


var checkbox_group_CheckboxGroup = withInstall(CheckboxGroup);
/* harmony default export */ var checkbox_group = ((/* unused pure expression or super */ null && (checkbox_group_CheckboxGroup)));

;// CONCATENATED MODULE: ./es/circle/Circle.js




var [Circle_name, Circle_bem] = createNamespace('circle');
var uid = 0;

function format(rate) {
  return Math.min(Math.max(+rate, 0), 100);
}

function getPath(clockwise, viewBoxSize) {
  var sweepFlag = clockwise ? 1 : 0;
  return "M " + viewBoxSize / 2 + " " + viewBoxSize / 2 + " m 0, -500 a 500, 500 0 1, " + sweepFlag + " 0, 1000 a 500, 500 0 1, " + sweepFlag + " 0, -1000";
}

/* harmony default export */ var Circle = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Circle_name,
  props: {
    text: String,
    size: [Number, String],
    color: [String, Object],
    clockwise: truthProp,
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
    }
  },
  emits: ['update:currentRate'],

  setup(props, {
    emit,
    slots
  }) {
    var id = "van-circle-" + uid++;
    var viewBoxSize = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => +props.strokeWidth + 1000);
    var path = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => getPath(props.clockwise, viewBoxSize.value));
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.rate, rate => {
      var rafId;
      var startTime = Date.now();
      var startRate = props.currentRate;
      var endRate = format(rate);
      var duration = Math.abs((startRate - endRate) * 1000 / +props.speed);

      var animate = () => {
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

    var renderHover = () => {
      var PERIMETER = 3140;
      var {
        strokeWidth,
        currentRate,
        strokeLinecap
      } = props;
      var offset = PERIMETER * currentRate / 100;
      var color = isObject(props.color) ? "url(#" + id + ")" : props.color;
      var style = {
        stroke: color,
        strokeWidth: +strokeWidth + 1 + "px",
        strokeLinecap,
        strokeDasharray: offset + "px " + PERIMETER + "px"
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
        "d": path.value,
        "style": style,
        "class": Circle_bem('hover'),
        "stroke": color
      }, null);
    };

    var renderLayer = () => {
      var style = {
        fill: props.fill,
        stroke: props.layerColor,
        strokeWidth: props.strokeWidth + "px"
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
        "class": Circle_bem('layer'),
        "style": style,
        "d": path.value
      }, null);
    };

    var renderGradient = () => {
      var {
        color
      } = props;

      if (!isObject(color)) {
        return;
      }

      var Stops = Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map((key, index) => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("stop", {
        "key": index,
        "offset": key,
        "stop-color": color[key]
      }, null));
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("defs", null, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("linearGradient", {
        "id": id,
        "x1": "100%",
        "y1": "0%",
        "x2": "0%",
        "y2": "0%"
      }, [Stops])]);
    };

    var renderText = () => {
      if (slots.default) {
        return slots.default();
      }

      if (props.text) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Circle_bem('text')
        }, [props.text]);
      }
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Circle_bem(),
      "style": getSizeStyle(props.size)
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("svg", {
      "viewBox": "0 0 " + viewBoxSize.value + " " + viewBoxSize.value
    }, [renderGradient(), renderLayer(), renderHover()]), renderText()]);
  }

}));
;// CONCATENATED MODULE: ./es/circle/index.js


var circle_Circle = withInstall(Circle);
/* harmony default export */ var circle = ((/* unused pure expression or super */ null && (circle_Circle)));

;// CONCATENATED MODULE: ./es/row/Row.js




var [Row_name, Row_bem] = createNamespace('row');
var ROW_KEY = Symbol(Row_name);
/* harmony default export */ var Row = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Row_name,
  props: {
    wrap: truthProp,
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

  setup(props, {
    slots
  }) {
    var {
      children,
      linkChildren
    } = useChildren(ROW_KEY);
    var groups = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var groups = [[]];
      var totalSpan = 0;
      children.forEach((child, index) => {
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
    var spaces = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var gutter = Number(props.gutter);
      var spaces = [];

      if (!gutter) {
        return spaces;
      }

      groups.value.forEach(group => {
        var averagePadding = gutter * (group.length - 1) / group.length;
        group.forEach((item, index) => {
          if (index === 0) {
            spaces.push({
              right: averagePadding
            });
          } else {
            var left = gutter - spaces[item - 1].right;
            var right = averagePadding - left;
            spaces.push({
              left,
              right
            });
          }
        });
      });
      return spaces;
    });
    linkChildren({
      spaces
    });
    return () => {
      var {
        tag,
        wrap,
        align,
        justify
      } = props;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag, {
        "class": Row_bem({
          ["align-" + align]: align,
          ["justify-" + justify]: justify,
          nowrap: !wrap
        })
      }, {
        default: () => [slots.default == null ? void 0 : slots.default()]
      });
    };
  }

}));
;// CONCATENATED MODULE: ./es/col/Col.js





var [Col_name, Col_bem] = createNamespace('col');
/* harmony default export */ var Col = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Col_name,
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

  setup(props, {
    slots
  }) {
    var {
      parent,
      index
    } = useParent(ROW_KEY);
    var style = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (!parent) {
        return;
      }

      var {
        spaces
      } = parent;

      if (spaces && spaces.value && spaces.value[index.value]) {
        var {
          left,
          right
        } = spaces.value[index.value];
        return {
          paddingLeft: left ? left + "px" : null,
          paddingRight: right ? right + "px" : null
        };
      }
    });
    return () => {
      var {
        tag,
        span,
        offset
      } = props;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag, {
        "style": style.value,
        "class": Col_bem({
          [span]: span,
          ["offset-" + offset]: offset
        })
      }, {
        default: () => [slots.default == null ? void 0 : slots.default()]
      });
    };
  }

}));
;// CONCATENATED MODULE: ./es/col/index.js


var col_Col = withInstall(Col);
/* harmony default export */ var col = ((/* unused pure expression or super */ null && (col_Col)));

;// CONCATENATED MODULE: ./es/collapse/Collapse.js





var [Collapse_name, Collapse_bem] = createNamespace('collapse');
var COLLAPSE_KEY = Symbol(Collapse_name);
/* harmony default export */ var Collapse = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Collapse_name,
  props: {
    border: truthProp,
    accordion: Boolean,
    modelValue: {
      type: [String, Number, Array],
      default: ''
    }
  },
  emits: ['change', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var {
      linkChildren
    } = useChildren(COLLAPSE_KEY);

    var updateName = name => {
      emit('change', name);
      emit('update:modelValue', name);
    };

    var toggle = (name, expanded) => {
      var {
        accordion,
        modelValue
      } = props;

      if (accordion) {
        updateName(name === modelValue ? '' : name);
      } else if (expanded) {
        updateName(modelValue.concat(name));
      } else {
        updateName(modelValue.filter(activeName => activeName !== name));
      }
    };

    var isExpanded = name => {
      var {
        accordion,
        modelValue
      } = props;

      if (false) {}

      return accordion ? modelValue === name : modelValue.includes(name);
    };

    linkChildren({
      toggle,
      isExpanded
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": [Collapse_bem(), {
        [BORDER_TOP_BOTTOM]: props.border
      }]
    }, [slots.default == null ? void 0 : slots.default()]);
  }

}));
;// CONCATENATED MODULE: ./es/collapse/index.js


var collapse_Collapse = withInstall(Collapse);
/* harmony default export */ var collapse = ((/* unused pure expression or super */ null && (collapse_Collapse)));

;// CONCATENATED MODULE: ./es/collapse-item/CollapseItem.js

 // Utils



 // Composables



 // Components


var [CollapseItem_name, CollapseItem_bem] = createNamespace('collapse-item');
/* harmony default export */ var CollapseItem = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: CollapseItem_name,
  props: extend({}, cellProps, {
    name: [Number, String],
    isLink: truthProp,
    disabled: Boolean,
    readonly: Boolean
  }),

  setup(props, {
    slots
  }) {
    var wrapperRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var contentRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var {
      parent,
      index
    } = useParent(COLLAPSE_KEY);

    if (!parent) {
      if (false) {}

      return;
    }

    var name = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var _props$name;

      return (_props$name = props.name) != null ? _props$name : index.value;
    });
    var expanded = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => parent.isExpanded(name.value));
    var show = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(expanded.value);
    var lazyRender = useLazyRender(show);

    var onTransitionEnd = () => {
      if (!expanded.value) {
        show.value = false;
      } else {
        wrapperRef.value.style.height = '';
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(expanded, (value, oldValue) => {
      if (oldValue === null) {
        return;
      }

      if (value) {
        show.value = true;
      } // Use raf: flick when opened in safari
      // Use nextTick: closing animation failed when set `user-select: none`


      var tick = value ? external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick : raf;
      tick(() => {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }

        var {
          offsetHeight
        } = contentRef.value;

        if (offsetHeight) {
          var contentHeight = offsetHeight + "px";
          wrapperRef.value.style.height = value ? '0' : contentHeight; // use double raf to ensure animation can start

          doubleRaf(() => {
            wrapperRef.value.style.height = value ? contentHeight : '0';
          });
        } else {
          onTransitionEnd();
        }
      });
    });

    var toggle = (newValue = !expanded.value) => {
      parent.toggle(name.value, newValue);
    };

    var onClickTitle = () => {
      if (!props.disabled && !props.readonly) {
        toggle();
      }
    };

    var renderTitle = () => {
      var {
        border,
        disabled,
        readonly
      } = props;
      var attrs = pick(props, Object.keys(cellProps));

      if (readonly) {
        attrs.isLink = false;
      }

      if (disabled || readonly) {
        attrs.clickable = false;
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell_Cell, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "role": "button",
        "class": CollapseItem_bem('title', {
          disabled,
          expanded: expanded.value,
          borderless: !border
        }),
        "aria-expanded": String(expanded.value),
        "onClick": onClickTitle
      }, attrs), {
        icon: slots.icon,
        title: slots.title,
        default: slots.value,
        'right-icon': slots['right-icon']
      });
    };

    var renderContent = lazyRender(() => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "ref": wrapperRef,
      "class": CollapseItem_bem('wrapper'),
      "onTransitionend": onTransitionEnd
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "ref": contentRef,
      "class": CollapseItem_bem('content')
    }, [slots.default == null ? void 0 : slots.default()])]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, show.value]]));
    useExpose({
      toggle
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": [CollapseItem_bem({
        border: index.value && props.border
      })]
    }, [renderTitle(), renderContent()]);
  }

}));
;// CONCATENATED MODULE: ./es/collapse-item/index.js


var collapse_item_CollapseItem = withInstall(CollapseItem);
/* harmony default export */ var collapse_item = ((/* unused pure expression or super */ null && (collapse_item_CollapseItem)));

;// CONCATENATED MODULE: ./es/contact-card/ContactCard.js




var [ContactCard_name, ContactCard_bem, ContactCard_t] = createNamespace('contact-card');
/* harmony default export */ var ContactCard = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: ContactCard_name,
  props: {
    tel: String,
    name: String,
    addText: String,
    editable: truthProp,
    type: {
      type: String,
      default: 'add'
    }
  },
  emits: ['click'],

  setup(props, {
    emit
  }) {
    var onClick = event => {
      if (props.editable) {
        emit('click', event);
      }
    };

    var renderContent = () => {
      if (props.type === 'add') {
        return props.addText || ContactCard_t('addText');
      }

      return [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", null, [ContactCard_t('name') + "\uFF1A" + props.name]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", null, [ContactCard_t('tel') + "\uFF1A" + props.tel])];
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell_Cell, {
      "center": true,
      "icon": props.type === 'edit' ? 'contact' : 'add-square',
      "class": ContactCard_bem([props.type]),
      "border": false,
      "isLink": props.editable,
      "valueClass": ContactCard_bem('value'),
      "onClick": onClick
    }, {
      default: () => [renderContent()]
    });
  }

}));
;// CONCATENATED MODULE: ./es/contact-card/index.js


var contact_card_ContactCard = withInstall(ContactCard);
/* harmony default export */ var contact_card = ((/* unused pure expression or super */ null && (contact_card_ContactCard)));

;// CONCATENATED MODULE: ./es/form/Form.js

 // Utils

 // Composables



 // Types

var [Form_name, Form_bem] = createNamespace('form');
/* harmony default export */ var Form = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Form_name,
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
    submitOnEnter: truthProp,
    showErrorMessage: truthProp,
    errorMessageAlign: String,
    validateTrigger: {
      type: String,
      default: 'onBlur'
    }
  },
  emits: ['submit', 'failed'],

  setup(props, {
    emit,
    slots
  }) {
    var {
      children,
      linkChildren
    } = useChildren(FORM_KEY);

    var getFieldsByNames = names => {
      if (names) {
        return children.filter(field => names.includes(field.name));
      }

      return children;
    };

    var validateSeq = names => new Promise((resolve, reject) => {
      var errors = [];
      var fields = getFieldsByNames(names);
      fields.reduce((promise, field) => promise.then(() => {
        if (!errors.length) {
          return field.validate().then(error => {
            if (error) {
              errors.push(error);
            }
          });
        }
      }), Promise.resolve()).then(() => {
        if (errors.length) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });

    var validateAll = names => new Promise((resolve, reject) => {
      var fields = getFieldsByNames(names);
      Promise.all(fields.map(item => item.validate())).then(errors => {
        errors = errors.filter(Boolean);

        if (errors.length) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });

    var validateField = name => {
      var matched = children.find(item => item.name === name);

      if (matched) {
        return new Promise((resolve, reject) => {
          matched.validate().then(error => {
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

    var validate = name => {
      if (typeof name === 'string') {
        return validateField(name);
      }

      return props.validateFirst ? validateSeq(name) : validateAll(name);
    };

    var resetValidation = name => {
      if (typeof name === 'string') {
        name = [name];
      }

      var fields = getFieldsByNames(name);
      fields.forEach(item => {
        item.resetValidation();
      });
    };

    var scrollToField = (name, options) => {
      children.some(item => {
        if (item.name === name) {
          item.$el.scrollIntoView(options);
          return true;
        }

        return false;
      });
    };

    var getValues = () => children.reduce((form, field) => {
      form[field.name] = field.formValue.value;
      return form;
    }, {});

    var submit = () => {
      var values = getValues();
      validate().then(() => emit('submit', values)).catch(errors => {
        emit('failed', {
          values,
          errors
        });

        if (props.scrollToError && errors[0].name) {
          scrollToField(errors[0].name);
        }
      });
    };

    var onSubmit = event => {
      event.preventDefault();
      submit();
    };

    linkChildren({
      props
    });
    useExpose({
      submit,
      validate,
      scrollToField,
      resetValidation
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("form", {
      "class": Form_bem(),
      "onSubmit": onSubmit
    }, [slots.default == null ? void 0 : slots.default()]);
  }

}));
;// CONCATENATED MODULE: ./es/form/index.js


var form_Form = withInstall(Form);
/* harmony default export */ var es_form = ((/* unused pure expression or super */ null && (form_Form)));

;// CONCATENATED MODULE: ./es/contact-edit/ContactEdit.js

 // Utils

 // Components







var [ContactEdit_name, ContactEdit_bem, ContactEdit_t] = createNamespace('contact-edit');
var DEFAULT_CONTACT = {
  tel: '',
  name: ''
};
/* harmony default export */ var ContactEdit = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: ContactEdit_name,
  props: {
    isEdit: Boolean,
    isSaving: Boolean,
    isDeleting: Boolean,
    showSetDefault: Boolean,
    setDefaultLabel: String,
    contactInfo: {
      type: Object,
      default: () => extend({}, DEFAULT_CONTACT)
    },
    telValidator: {
      type: Function,
      default: isMobile
    }
  },
  emits: ['save', 'delete', 'change-default'],

  setup(props, {
    emit
  }) {
    var contact = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)(extend({}, DEFAULT_CONTACT, props.contactInfo));

    var onSave = () => {
      if (!props.isSaving) {
        emit('save', contact);
      }
    };

    var onDelete = () => {
      function_call_Dialog.confirm({
        title: ContactEdit_t('confirmDelete')
      }).then(() => emit('delete', contact));
    };

    var renderButtons = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": ContactEdit_bem('buttons')
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
      "block": true,
      "round": true,
      "type": "danger",
      "text": ContactEdit_t('save'),
      "loading": props.isSaving,
      "nativeType": "submit"
    }, null), props.isEdit && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
      "block": true,
      "round": true,
      "text": ContactEdit_t('delete'),
      "loading": props.isDeleting,
      "onClick": onDelete
    }, null)]);

    var renderSwitch = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(switch_Switch, {
      "modelValue": contact.isDefault,
      "onUpdate:modelValue": $event => contact.isDefault = $event,
      "size": 24,
      "onChange": checked => emit('change-default', checked)
    }, null);

    var renderSetDefault = () => {
      if (props.showSetDefault) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell_Cell, {
          "title": props.setDefaultLabel,
          "class": ContactEdit_bem('switch-cell'),
          "border": false
        }, {
          'right-icon': renderSwitch
        });
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.contactInfo, value => extend(contact, DEFAULT_CONTACT, value));
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(form_Form, {
      "class": ContactEdit_bem(),
      "onSubmit": onSave
    }, {
      default: () => [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": ContactEdit_bem('fields')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(field_Field, {
        "modelValue": contact.name,
        "onUpdate:modelValue": $event => contact.name = $event,
        "clearable": true,
        "label": ContactEdit_t('name'),
        "rules": [{
          required: true,
          message: ContactEdit_t('nameInvalid')
        }],
        "maxlength": "30",
        "placeholder": ContactEdit_t('nameEmpty')
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(field_Field, {
        "modelValue": contact.tel,
        "onUpdate:modelValue": $event => contact.tel = $event,
        "clearable": true,
        "type": "tel",
        "label": ContactEdit_t('tel'),
        "rules": [{
          validator: props.telValidator,
          message: ContactEdit_t('telInvalid')
        }],
        "placeholder": ContactEdit_t('telEmpty')
      }, null)]), renderSetDefault(), renderButtons()]
    });
  }

}));
;// CONCATENATED MODULE: ./es/contact-edit/index.js


var contact_edit_ContactEdit = withInstall(ContactEdit);
/* harmony default export */ var contact_edit = ((/* unused pure expression or super */ null && (contact_edit_ContactEdit)));

;// CONCATENATED MODULE: ./es/contact-list/ContactList.js

 // Utils

 // Components







var [ContactList_name, ContactList_bem, ContactList_t] = createNamespace('contact-list');
/* harmony default export */ var ContactList = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: ContactList_name,
  props: {
    list: Array,
    addText: String,
    modelValue: unknownProp,
    defaultTagText: String
  },
  emits: ['add', 'edit', 'select', 'update:modelValue'],

  setup(props, {
    emit
  }) {
    var renderItem = (item, index) => {
      var onClick = () => {
        emit('update:modelValue', item.id);
        emit('select', item, index);
      };

      var renderRightIcon = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(radio_Radio, {
        "class": ContactList_bem('radio'),
        "name": item.id,
        "iconSize": 16
      }, null);

      var renderEditIcon = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "name": "edit",
        "class": ContactList_bem('edit'),
        "onClick": event => {
          event.stopPropagation();
          emit('edit', item, index);
        }
      }, null);

      var renderContent = () => {
        var nodes = [item.name + "\uFF0C" + item.tel];

        if (item.isDefault && props.defaultTagText) {
          nodes.push((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tag_Tag, {
            "type": "danger",
            "round": true,
            "class": ContactList_bem('item-tag')
          }, {
            default: () => [props.defaultTagText]
          }));
        }

        return nodes;
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell_Cell, {
        "key": item.id,
        "isLink": true,
        "center": true,
        "class": ContactList_bem('item'),
        "valueClass": ContactList_bem('item-value'),
        "onClick": onClick
      }, {
        icon: renderEditIcon,
        default: renderContent,
        'right-icon': renderRightIcon
      });
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": ContactList_bem()
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(radio_group_RadioGroup, {
      "modelValue": props.modelValue,
      "class": ContactList_bem('group')
    }, {
      default: () => [props.list && props.list.map(renderItem)]
    }), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": ContactList_bem('bottom')
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
      "round": true,
      "block": true,
      "type": "danger",
      "class": ContactList_bem('add'),
      "text": props.addText || ContactList_t('addText'),
      "onClick": () => emit('add')
    }, null)])]);
  }

}));
;// CONCATENATED MODULE: ./es/contact-list/index.js


var contact_list_ContactList = withInstall(ContactList);
/* harmony default export */ var contact_list = ((/* unused pure expression or super */ null && (contact_list_ContactList)));

;// CONCATENATED MODULE: ./es/count-down/utils.js

function parseFormat(format, currentTime) {
  var {
    days
  } = currentTime;
  var {
    hours,
    minutes,
    seconds,
    milliseconds
  } = currentTime;

  if (format.includes('DD')) {
    format = format.replace('DD', padZero(days));
  } else {
    hours += days * 24;
  }

  if (format.includes('HH')) {
    format = format.replace('HH', padZero(hours));
  } else {
    minutes += hours * 60;
  }

  if (format.includes('mm')) {
    format = format.replace('mm', padZero(minutes));
  } else {
    seconds += minutes * 60;
  }

  if (format.includes('ss')) {
    format = format.replace('ss', padZero(seconds));
  } else {
    milliseconds += seconds * 1000;
  }

  if (format.includes('S')) {
    var ms = padZero(milliseconds, 3);

    if (format.includes('SSS')) {
      format = format.replace('SSS', ms);
    } else if (format.includes('SS')) {
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
    days,
    hours,
    minutes,
    seconds,
    milliseconds
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
  var current = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => parseTime(remain.value));

  var pause = () => {
    counting = false;
    cancelRaf(rafId);
  };

  var getCurrentRemain = () => Math.max(endTime - Date.now(), 0);

  var setRemain = value => {
    remain.value = value;
    options.onChange == null ? void 0 : options.onChange(current.value);

    if (value === 0) {
      pause();
      options.onFinish == null ? void 0 : options.onFinish();
    }
  };

  var microTick = () => {
    rafId = raf(() => {
      // in case of call reset immediately after finish
      if (counting) {
        setRemain(getCurrentRemain());

        if (remain.value > 0) {
          microTick();
        }
      }
    });
  };

  var macroTick = () => {
    rafId = raf(() => {
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

  var tick = () => {
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

  var start = () => {
    if (!counting) {
      endTime = Date.now() + remain.value;
      counting = true;
      tick();
    }
  };

  var reset = (totalTime = options.time) => {
    pause();
    remain.value = totalTime;
  };

  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(pause);
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onActivated)(() => {
    if (deactivated) {
      counting = true;
      deactivated = false;
      tick();
    }
  });
  (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onDeactivated)(() => {
    if (counting) {
      pause();
      deactivated = true;
    }
  });
  return {
    start,
    pause,
    reset,
    current
  };
}
;// CONCATENATED MODULE: ./es/count-down/CountDown.js

 // Utils


 // Composables



var [CountDown_name, CountDown_bem] = createNamespace('count-down');
/* harmony default export */ var CountDown = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: CountDown_name,
  props: {
    autoStart: truthProp,
    millisecond: Boolean,
    time: {
      type: [Number, String],
      default: 0
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    }
  },
  emits: ['change', 'finish'],

  setup(props, {
    emit,
    slots
  }) {
    var {
      start,
      pause,
      reset,
      current
    } = useCountDown({
      time: +props.time,
      millisecond: props.millisecond,
      onChange: current => emit('change', current),
      onFinish: () => emit('finish')
    });
    var timeText = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => parseFormat(props.format, current.value));

    var resetTime = () => {
      reset(+props.time);

      if (props.autoStart) {
        start();
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.time, resetTime, {
      immediate: true
    });
    useExpose({
      start,
      pause,
      reset: resetTime
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": CountDown_bem()
    }, [slots.default ? slots.default(current.value) : timeText.value]);
  }

}));
;// CONCATENATED MODULE: ./es/count-down/index.js


var count_down_CountDown = withInstall(CountDown);
/* harmony default export */ var count_down = ((/* unused pure expression or super */ null && (count_down_CountDown)));

;// CONCATENATED MODULE: ./es/coupon/Coupon.js




var [Coupon_name, Coupon_bem, Coupon_t] = createNamespace('coupon');

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

/* harmony default export */ var Coupon = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Coupon_name,
  props: {
    chosen: Boolean,
    disabled: Boolean,
    coupon: {
      type: Object,
      required: true
    },
    currency: {
      type: String,
      default: '¥'
    }
  },

  setup(props) {
    var validPeriod = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        startAt,
        endAt
      } = props.coupon;
      return getDate(startAt) + " - " + getDate(endAt);
    });
    var faceAmount = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        coupon,
        currency
      } = props;

      if (coupon.valueDesc) {
        return [coupon.valueDesc, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [coupon.unitDesc || ''])];
      }

      if (coupon.denominations) {
        var denominations = formatAmount(coupon.denominations);
        return [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [currency]), " " + denominations];
      }

      if (coupon.discount) {
        return Coupon_t('discount', formatDiscount(coupon.discount));
      }

      return '';
    });
    var conditionMessage = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var condition = formatAmount(props.coupon.originCondition || 0);
      return condition === '0' ? Coupon_t('unlimited') : Coupon_t('condition', condition);
    });
    return () => {
      var {
        chosen,
        coupon,
        disabled
      } = props;
      var description = disabled && coupon.reason || coupon.description;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Coupon_bem({
          disabled
        })
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Coupon_bem('content')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Coupon_bem('head')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("h2", {
        "class": Coupon_bem('amount')
      }, [faceAmount.value]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", {
        "class": Coupon_bem('condition')
      }, [coupon.condition || conditionMessage.value])]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Coupon_bem('body')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", {
        "class": Coupon_bem('name')
      }, [coupon.name]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", {
        "class": Coupon_bem('valid')
      }, [validPeriod.value]), !disabled && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(checkbox_Checkbox, {
        "class": Coupon_bem('corner'),
        "modelValue": chosen
      }, null)])]), description && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", {
        "class": Coupon_bem('description')
      }, [description])]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/coupon/index.js


var coupon_Coupon = withInstall(Coupon);
/* harmony default export */ var coupon = ((/* unused pure expression or super */ null && (coupon_Coupon)));

;// CONCATENATED MODULE: ./es/coupon-cell/CouponCell.js

 // Utils

 // Components

 // Types

var [CouponCell_name, CouponCell_bem, CouponCell_t] = createNamespace('coupon-cell');

function formatValue(coupons, chosenCoupon, currency) {
  var coupon = coupons[+chosenCoupon];

  if (coupon) {
    var value = 0;

    if (isDef(coupon.value)) {
      ({
        value
      } = coupon);
    } else if (isDef(coupon.denominations)) {
      value = coupon.denominations;
    }

    return "-" + currency + " " + (value / 100).toFixed(2);
  }

  return coupons.length === 0 ? CouponCell_t('tips') : CouponCell_t('count', coupons.length);
}

/* harmony default export */ var CouponCell = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: CouponCell_name,
  props: {
    title: String,
    border: truthProp,
    editable: truthProp,
    coupons: {
      type: Array,
      default: () => []
    },
    currency: {
      type: String,
      default: '¥'
    },
    chosenCoupon: {
      type: [Number, String],
      default: -1
    }
  },

  setup(props) {
    return () => {
      var selected = props.coupons[+props.chosenCoupon];
      var value = formatValue(props.coupons, props.chosenCoupon, props.currency);
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell_Cell, {
        "class": CouponCell_bem(),
        "value": value,
        "title": props.title || CouponCell_t('title'),
        "border": props.border,
        "isLink": props.editable,
        "valueClass": CouponCell_bem('value', {
          selected
        })
      }, null);
    };
  }

}));
;// CONCATENATED MODULE: ./es/coupon-cell/index.js


var coupon_cell_CouponCell = withInstall(CouponCell);
/* harmony default export */ var coupon_cell = ((/* unused pure expression or super */ null && (coupon_cell_CouponCell)));

;// CONCATENATED MODULE: ./es/coupon-list/CouponList.js

 // Utils

 // Composables


 // Components






var [CouponList_name, CouponList_bem, CouponList_t] = createNamespace('coupon-list');
var EMPTY_IMAGE = 'https://img.yzcdn.cn/vant/coupon-empty.png';
/* harmony default export */ var CouponList = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: CouponList_name,
  props: {
    showCount: truthProp,
    enabledTitle: String,
    disabledTitle: String,
    showExchangeBar: truthProp,
    showCloseButton: truthProp,
    closeButtonText: String,
    inputPlaceholder: String,
    exchangeButtonText: String,
    exchangeButtonLoading: Boolean,
    exchangeButtonDisabled: Boolean,
    code: {
      type: String,
      default: ''
    },
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
      default: () => []
    },
    disabledCoupons: {
      type: Array,
      default: () => []
    },
    displayedCouponIndex: {
      type: Number,
      default: -1
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

  setup(props, {
    emit,
    slots
  }) {
    var [couponRefs, setCouponRefs] = useRefs();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      tab: 0,
      code: props.code
    });
    var {
      height: windowHeight
    } = useWindowSize();
    var buttonDisabled = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => !props.exchangeButtonLoading && (props.exchangeButtonDisabled || !state.code || state.code.length < props.exchangeMinLength));
    var listStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => ({
      height: windowHeight.value - (props.showExchangeBar ? 140 : 94) + 'px'
    }));

    var onExchange = () => {
      emit('exchange', state.code); // auto clear currentCode when not use v-model

      if (!props.code) {
        state.code = '';
      }
    };

    var scrollToCoupon = index => {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        if (couponRefs.value[index]) {
          couponRefs.value[index].scrollIntoView();
        }
      });
    };

    var renderEmpty = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": CouponList_bem('empty')
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("img", {
      "src": props.emptyImage
    }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", null, [CouponList_t('empty')])]);

    var renderExchangeBar = () => {
      if (props.showExchangeBar) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": CouponList_bem('exchange-bar')
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(field_Field, {
          "modelValue": state.code,
          "onUpdate:modelValue": $event => state.code = $event,
          "clearable": true,
          "border": false,
          "class": CouponList_bem('field'),
          "placeholder": props.inputPlaceholder || CouponList_t('placeholder'),
          "maxlength": "20"
        }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
          "plain": true,
          "type": "danger",
          "class": CouponList_bem('exchange'),
          "text": props.exchangeButtonText || CouponList_t('exchange'),
          "loading": props.exchangeButtonLoading,
          "disabled": buttonDisabled.value,
          "onClick": onExchange
        }, null)]);
      }
    };

    var renderCouponTab = () => {
      var _slots$listFooter;

      var {
        coupons
      } = props;
      var count = props.showCount ? " (" + coupons.length + ")" : '';
      var title = (props.enabledTitle || CouponList_t('enable')) + count;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tab_Tab, {
        "title": title
      }, {
        default: () => [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": CouponList_bem('list', {
            'with-bottom': props.showCloseButton
          }),
          "style": listStyle.value
        }, [coupons.map((coupon, index) => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(coupon_Coupon, {
          "key": coupon.id,
          "ref": setCouponRefs(index),
          "coupon": coupon,
          "chosen": index === props.chosenCoupon,
          "currency": props.currency,
          "onClick": () => emit('change', index)
        }, null)), !coupons.length && renderEmpty(), (_slots$listFooter = slots['list-footer']) == null ? void 0 : _slots$listFooter.call(slots)])]
      });
    };

    var renderDisabledTab = () => {
      var _slots$disabledList;

      var {
        disabledCoupons
      } = props;
      var count = props.showCount ? " (" + disabledCoupons.length + ")" : '';
      var title = (props.disabledTitle || CouponList_t('disabled')) + count;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tab_Tab, {
        "title": title
      }, {
        default: () => [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": CouponList_bem('list', {
            'with-bottom': props.showCloseButton
          }),
          "style": listStyle.value
        }, [disabledCoupons.map(coupon => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(coupon_Coupon, {
          "disabled": true,
          "key": coupon.id,
          "coupon": coupon,
          "currency": props.currency
        }, null)), !disabledCoupons.length && renderEmpty(), (_slots$disabledList = slots['disabled-list-footer']) == null ? void 0 : _slots$disabledList.call(slots)])]
      });
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.code, value => {
      state.code = value;
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => state.code, value => emit('update:code', value));
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.displayedCouponIndex, scrollToCoupon);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(() => {
      scrollToCoupon(props.displayedCouponIndex);
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": CouponList_bem()
    }, [renderExchangeBar(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(tabs_Tabs, {
      "modelValue": state.tab,
      "onUpdate:modelValue": $event => state.tab = $event,
      "class": CouponList_bem('tab'),
      "border": false
    }, {
      default: () => [renderCouponTab(), renderDisabledTab()]
    }), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": CouponList_bem('bottom')
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
      "round": true,
      "block": true,
      "type": "danger",
      "class": CouponList_bem('close'),
      "text": props.closeButtonText || CouponList_t('close'),
      "onClick": () => emit('change', -1)
    }, null), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.showCloseButton]])])]);
  }

}));
;// CONCATENATED MODULE: ./es/coupon-list/index.js


var coupon_list_CouponList = withInstall(CouponList);
/* harmony default export */ var coupon_list = ((/* unused pure expression or super */ null && (coupon_list_CouponList)));

;// CONCATENATED MODULE: ./es/datetime-picker/TimePicker.js

 // Utils


 // Composables

 // Components


var [TimePicker_name] = createNamespace('time-picker');
/* harmony default export */ var TimePicker = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: TimePicker_name,
  props: extend({}, sharedProps, {
    modelValue: String,
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

  setup(props, {
    emit,
    slots
  }) {
    var formatValue = value => {
      var {
        minHour,
        maxHour,
        maxMinute,
        minMinute
      } = props;

      if (!value) {
        value = padZero(minHour) + ":" + padZero(minMinute);
      }

      var [hour, minute] = value.split(':');
      hour = padZero(range(+hour, +minHour, +maxHour));
      minute = padZero(range(+minute, +minMinute, +maxMinute));
      return hour + ":" + minute;
    };

    var picker = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var currentDate = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(formatValue(props.modelValue));
    var ranges = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => [{
      type: 'hour',
      range: [+props.minHour, +props.maxHour]
    }, {
      type: 'minute',
      range: [+props.minMinute, +props.maxMinute]
    }]);
    var originColumns = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => ranges.value.map(({
      type,
      range: rangeArr
    }) => {
      var values = times(rangeArr[1] - rangeArr[0] + 1, index => padZero(rangeArr[0] + index));

      if (props.filter) {
        values = props.filter(type, values);
      }

      return {
        type,
        values
      };
    }));
    var columns = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => originColumns.value.map(column => ({
      values: column.values.map(value => props.formatter(column.type, value))
    })));

    var updateColumnValue = () => {
      var pair = currentDate.value.split(':');
      var values = [props.formatter('hour', pair[0]), props.formatter('minute', pair[1])];
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        picker.value.setValues(values);
      });
    };

    var updateInnerValue = () => {
      var [hourIndex, minuteIndex] = picker.value.getIndexes();
      var [hourColumn, minuteColumn] = originColumns.value;
      var hour = hourColumn.values[hourIndex] || hourColumn.values[0];
      var minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];
      currentDate.value = formatValue(hour + ":" + minute);
      updateColumnValue();
    };

    var onConfirm = () => emit('confirm', currentDate.value);

    var onCancel = () => emit('cancel');

    var onChange = () => {
      updateInnerValue();
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => emit('change', currentDate.value));
      });
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(() => {
      updateColumnValue();
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(updateInnerValue);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(columns, updateColumnValue);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => [props.filter, props.maxHour, props.minMinute, props.maxMinute], updateInnerValue);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.minHour, () => {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(updateInnerValue);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(currentDate, value => emit('update:modelValue', value));
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.modelValue, value => {
      value = formatValue(value);

      if (value !== currentDate.value) {
        currentDate.value = value;
        updateColumnValue();
      }
    });
    useExpose({
      getPicker: () => picker.value
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(picker_Picker, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
      "ref": picker,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props, pickerKeys)), slots);
  }

}));
;// CONCATENATED MODULE: ./es/datetime-picker/DatePicker.js

 // Utils


 // Composables

 // Components


var currentYear = new Date().getFullYear();
var [DatePicker_name] = createNamespace('date-picker');
/* harmony default export */ var DatePicker = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: DatePicker_name,
  props: extend({}, sharedProps, {
    modelValue: Date,
    type: {
      type: String,
      default: 'datetime'
    },
    minDate: {
      type: Date,
      default: () => new Date(currentYear - 10, 0, 1),
      validator: isDate
    },
    maxDate: {
      type: Date,
      default: () => new Date(currentYear + 10, 11, 31),
      validator: isDate
    }
  }),
  emits: ['confirm', 'cancel', 'change', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var formatValue = value => {
      if (isDate(value)) {
        var timestamp = range(value.getTime(), props.minDate.getTime(), props.maxDate.getTime());
        return new Date(timestamp);
      }

      return undefined;
    };

    var picker = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var currentDate = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(formatValue(props.modelValue));

    var getBoundary = (type, value) => {
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

      return {
        [type + "Year"]: year,
        [type + "Month"]: month,
        [type + "Date"]: date,
        [type + "Hour"]: hour,
        [type + "Minute"]: minute
      };
    };

    var ranges = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        maxYear,
        maxDate,
        maxMonth,
        maxHour,
        maxMinute
      } = getBoundary('max', currentDate.value || props.minDate);
      var {
        minYear,
        minDate,
        minMonth,
        minHour,
        minMinute
      } = getBoundary('min', currentDate.value || props.minDate);
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
        var columnsOrder = props.columnsOrder.concat(result.map(column => column.type));
        result.sort((a, b) => columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type));
      }

      return result;
    });
    var originColumns = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => ranges.value.map(({
      type,
      range: rangeArr
    }) => {
      var values = times(rangeArr[1] - rangeArr[0] + 1, index => padZero(rangeArr[0] + index));

      if (props.filter) {
        values = props.filter(type, values);
      }

      return {
        type,
        values
      };
    }));
    var columns = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => originColumns.value.map(column => ({
      values: column.values.map(value => props.formatter(column.type, value))
    })));

    var updateColumnValue = () => {
      var value = currentDate.value || props.minDate;
      var {
        formatter
      } = props;
      var values = originColumns.value.map(column => {
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
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        picker.value.setValues(values);
      });
    };

    var updateInnerValue = () => {
      var {
        type
      } = props;
      var indexes = picker.value.getIndexes();

      var getValue = type => {
        var index = 0;
        originColumns.value.forEach((column, columnIndex) => {
          if (type === column.type) {
            index = columnIndex;
          }
        });
        var {
          values
        } = originColumns.value[index];
        return getTrueValue(values[indexes[index]]);
      };

      var year;
      var month;
      var day;

      if (type === 'month-day') {
        year = (currentDate.value || props.minDate).getFullYear();
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

    var onConfirm = () => {
      emit('update:modelValue', currentDate.value);
      emit('confirm', currentDate.value);
    };

    var onCancel = () => emit('cancel');

    var onChange = () => {
      updateInnerValue();
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => emit('change', currentDate.value));
      });
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(() => {
      updateColumnValue();
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(updateInnerValue);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(columns, updateColumnValue);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(currentDate, (value, oldValue) => emit('update:modelValue', oldValue ? value : null));
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => [props.filter, props.maxDate], updateInnerValue);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.minDate, () => {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(updateInnerValue);
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.modelValue, value => {
      var _currentDate$value;

      value = formatValue(value);

      if (value && value.valueOf() !== ((_currentDate$value = currentDate.value) == null ? void 0 : _currentDate$value.valueOf())) {
        currentDate.value = value;
      }
    });
    useExpose({
      getPicker: () => picker.value
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(picker_Picker, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
      "ref": picker,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props, pickerKeys)), slots);
  }

}));
;// CONCATENATED MODULE: ./es/datetime-picker/DatetimePicker.js






var [DatetimePicker_name, DatetimePicker_bem] = createNamespace('datetime-picker');
var timePickerProps = Object.keys(TimePicker.props);
var datePickerProps = Object.keys(DatePicker.props);
/* harmony default export */ var DatetimePicker = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: DatetimePicker_name,
  props: extend({}, TimePicker.props, DatePicker.props, {
    modelValue: [String, Date]
  }),

  setup(props, {
    attrs,
    slots
  }) {
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    useExpose({
      getPicker: () => {
        var _root$value;

        return (_root$value = root.value) == null ? void 0 : _root$value.getPicker();
      }
    });
    return () => {
      var isTimePicker = props.type === 'time';
      var Component = isTimePicker ? TimePicker : DatePicker;
      var inheritProps = pick(props, isTimePicker ? timePickerProps : datePickerProps);
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(Component, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": root,
        "class": DatetimePicker_bem()
      }, inheritProps, attrs), slots);
    };
  }

}));
;// CONCATENATED MODULE: ./es/datetime-picker/index.js


var datetime_picker_DatetimePicker = withInstall(DatetimePicker);
/* harmony default export */ var datetime_picker = ((/* unused pure expression or super */ null && (datetime_picker_DatetimePicker)));

;// CONCATENATED MODULE: ./es/divider/Divider.js



var [Divider_name, Divider_bem] = createNamespace('divider');
/* harmony default export */ var Divider = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Divider_name,
  props: {
    dashed: Boolean,
    hairline: truthProp,
    contentPosition: {
      type: String,
      default: 'center'
    }
  },

  setup(props, {
    slots
  }) {
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "role": "separator",
      "class": Divider_bem({
        dashed: props.dashed,
        hairline: props.hairline,
        ["content-" + props.contentPosition]: !!slots.default
      })
    }, [slots.default == null ? void 0 : slots.default()]);
  }

}));
;// CONCATENATED MODULE: ./es/divider/index.js


var divider_Divider = withInstall(Divider);
/* harmony default export */ var divider = ((/* unused pure expression or super */ null && (divider_Divider)));

;// CONCATENATED MODULE: ./node_modules/@vant/use/dist/esm/useClickAway/index.js



function useClickAway(target, listener, options = {}) {
  if (!utils_inBrowser) {
    return;
  }

  var {
    eventName = 'click'
  } = options;

  var onClick = event => {
    var element = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.unref)(target);

    if (element && !element.contains(event.target)) {
      listener(event);
    }
  };

  useEventListener(eventName, onClick, {
    target: document
  });
}
;// CONCATENATED MODULE: ./es/dropdown-menu/DropdownMenu.js

 // Utils

 // Composables


var [DropdownMenu_name, DropdownMenu_bem] = createNamespace('dropdown-menu');
var DROPDOWN_KEY = Symbol(DropdownMenu_name);
var DropdownMenu_props = {
  overlay: truthProp,
  zIndex: [Number, String],
  activeColor: String,
  closeOnClickOutside: truthProp,
  closeOnClickOverlay: truthProp,
  duration: {
    type: [Number, String],
    default: 0.2
  },
  direction: {
    type: String,
    default: 'down'
  }
};
/* harmony default export */ var DropdownMenu = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: DropdownMenu_name,
  props: DropdownMenu_props,

  setup(props, {
    slots
  }) {
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var barRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var offset = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(0);
    var {
      children,
      linkChildren
    } = useChildren(DROPDOWN_KEY);
    var scrollParent = useScrollParent(root);
    var opened = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => children.some(item => item.state.showWrapper));
    var barStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (opened.value && isDef(props.zIndex)) {
        return {
          zIndex: +props.zIndex + 1
        };
      }
    });

    var onClickAway = () => {
      if (props.closeOnClickOutside) {
        children.forEach(item => {
          item.toggle(false);
        });
      }
    };

    var updateOffset = () => {
      if (barRef.value) {
        var rect = useRect(barRef);

        if (props.direction === 'down') {
          offset.value = rect.bottom;
        } else {
          offset.value = window.innerHeight - rect.top;
        }
      }
    };

    var onScroll = () => {
      if (opened.value) {
        updateOffset();
      }
    };

    var toggleItem = active => {
      children.forEach((item, index) => {
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

    var renderTitle = (item, index) => {
      var {
        showPopup
      } = item.state;
      var {
        disabled,
        titleClass
      } = item;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "button",
        "tabindex": disabled ? -1 : 0,
        "class": DropdownMenu_bem('item', {
          disabled
        }),
        "onClick": () => {
          if (!disabled) {
            toggleItem(index);
          }
        }
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": [DropdownMenu_bem('title', {
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
      props,
      offset
    });
    useClickAway(root, onClickAway);
    useEventListener('scroll', onScroll, {
      target: scrollParent
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "ref": root,
      "class": DropdownMenu_bem()
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "ref": barRef,
      "style": barStyle.value,
      "class": DropdownMenu_bem('bar', {
        opened: opened.value
      })
    }, [children.map(renderTitle)]), slots.default == null ? void 0 : slots.default()]);
  }

}));
;// CONCATENATED MODULE: ./es/dropdown-item/DropdownItem.js

 // Utils


 // Composables


 // Components




var [DropdownItem_name, DropdownItem_bem] = createNamespace('dropdown-item');
/* harmony default export */ var DropdownItem = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: DropdownItem_name,
  props: {
    title: String,
    disabled: Boolean,
    teleport: [String, Object],
    lazyRender: truthProp,
    modelValue: unknownProp,
    titleClass: unknownProp,
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['open', 'opened', 'close', 'closed', 'change', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      showPopup: false,
      transition: true,
      showWrapper: false
    });
    var {
      parent
    } = useParent(DROPDOWN_KEY);

    if (!parent) {
      if (false) {}

      return;
    }

    var getEmitter = name => () => emit(name);

    var onOpen = getEmitter('open');
    var onClose = getEmitter('close');
    var onOpened = getEmitter('opened');

    var onClosed = () => {
      state.showWrapper = false;
      emit('closed');
    };

    var onClickWrapper = event => {
      // prevent being identified as clicking outside and closed when using teleport
      if (props.teleport) {
        event.stopPropagation();
      }
    };

    var toggle = (show = !state.showPopup, options = {}) => {
      if (show === state.showPopup) {
        return;
      }

      state.showPopup = show;
      state.transition = !options.immediate;

      if (show) {
        state.showWrapper = true;
      }
    };

    var renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }

      if (props.title) {
        return props.title;
      }

      var match = props.options.find(option => option.value === props.modelValue);
      return match ? match.text : '';
    };

    var renderOption = option => {
      var {
        activeColor
      } = parent.props;
      var active = option.value === props.modelValue;

      var onClick = () => {
        state.showPopup = false;

        if (option.value !== props.modelValue) {
          emit('update:modelValue', option.value);
          emit('change', option.value);
        }
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(cell_Cell, {
        "clickable": true,
        "key": option.value,
        "icon": option.icon,
        "title": option.text,
        "class": DropdownItem_bem('option', {
          active
        }),
        "style": {
          color: active ? activeColor : ''
        },
        "onClick": onClick
      }, {
        default: () => [active && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "class": DropdownItem_bem('icon'),
          "color": activeColor,
          "name": "success"
        }, null)]
      });
    };

    var renderContent = () => {
      var {
        offset
      } = parent;
      var {
        zIndex,
        overlay,
        duration,
        direction,
        closeOnClickOverlay
      } = parent.props;
      var style = getZIndexStyle(zIndex);

      if (direction === 'down') {
        style.top = offset.value + "px";
      } else {
        style.bottom = offset.value + "px";
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "style": style,
        "class": DropdownItem_bem([direction]),
        "onClick": onClickWrapper
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup_Popup, {
        'show': state.showPopup,
        "onUpdate:show": $event => state.showPopup = $event,
        "class": DropdownItem_bem('content'),
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
        default: () => [props.options.map(renderOption), slots.default == null ? void 0 : slots.default()]
      })]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, state.showWrapper]]);
    };

    useExpose({
      state,
      toggle,
      renderTitle
    });
    return () => {
      if (props.teleport) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Teleport, {
          "to": props.teleport
        }, {
          default: () => [renderContent()]
        });
      }

      return renderContent();
    };
  }

}));
;// CONCATENATED MODULE: ./es/dropdown-item/index.js


var dropdown_item_DropdownItem = withInstall(DropdownItem);
/* harmony default export */ var dropdown_item = ((/* unused pure expression or super */ null && (dropdown_item_DropdownItem)));

;// CONCATENATED MODULE: ./es/dropdown-menu/index.js


var dropdown_menu_DropdownMenu = withInstall(DropdownMenu);
/* harmony default export */ var dropdown_menu = ((/* unused pure expression or super */ null && (dropdown_menu_DropdownMenu)));

;// CONCATENATED MODULE: ./es/empty/Network.js

var prefix = 'van-empty-network-';

var renderStop = (color, offset, opacity) => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("stop", {
  "stop-color": color,
  "offset": offset + "%",
  "stop-opacity": opacity
}, null);

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
;// CONCATENATED MODULE: ./es/empty/Empty.js




var [Empty_name, Empty_bem] = createNamespace('empty');
var PRESET_IMAGES = ['error', 'search', 'default'];
/* harmony default export */ var Empty = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Empty_name,
  props: {
    imageSize: [Number, String],
    description: String,
    image: {
      type: String,
      default: 'default'
    }
  },

  setup(props, {
    slots
  }) {
    var renderImage = () => {
      if (slots.image) {
        return slots.image();
      }

      var {
        image
      } = props;

      if (image === 'network') {
        return Network;
      }

      if (PRESET_IMAGES.includes(image)) {
        image = "https://img.yzcdn.cn/vant/empty-image-" + image + ".png";
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("img", {
        "src": image
      }, null);
    };

    var renderDescription = () => {
      var description = slots.description ? slots.description() : props.description;

      if (description) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("p", {
          "class": Empty_bem('description')
        }, [description]);
      }
    };

    var renderBottom = () => {
      if (slots.default) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Empty_bem('bottom')
        }, [slots.default()]);
      }
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Empty_bem()
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Empty_bem('image'),
      "style": getSizeStyle(props.imageSize)
    }, [renderImage()]), renderDescription(), renderBottom()]);
  }

}));
;// CONCATENATED MODULE: ./es/empty/index.js


var empty_Empty = withInstall(Empty);
/* harmony default export */ var empty = ((/* unused pure expression or super */ null && (empty_Empty)));

;// CONCATENATED MODULE: ./es/grid/Grid.js





var [Grid_name, Grid_bem] = createNamespace('grid');
var GRID_KEY = Symbol(Grid_name);
var Grid_props = {
  square: Boolean,
  center: truthProp,
  border: truthProp,
  gutter: [Number, String],
  iconSize: [Number, String],
  direction: String,
  clickable: Boolean,
  columnNum: {
    type: [Number, String],
    default: 4
  }
};
/* harmony default export */ var Grid = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Grid_name,
  props: Grid_props,

  setup(props, {
    slots
  }) {
    var {
      linkChildren
    } = useChildren(GRID_KEY);
    linkChildren({
      props
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "style": {
        paddingLeft: addUnit(props.gutter)
      },
      "class": [Grid_bem(), {
        [BORDER_TOP]: props.border && !props.gutter
      }]
    }, [slots.default == null ? void 0 : slots.default()]);
  }

}));
;// CONCATENATED MODULE: ./es/grid/index.js


var grid_Grid = withInstall(Grid);
/* harmony default export */ var grid = ((/* unused pure expression or super */ null && (grid_Grid)));

;// CONCATENATED MODULE: ./es/grid-item/GridItem.js

 // Utils



 // Composables


 // Components



var [GridItem_name, GridItem_bem] = createNamespace('grid-item');
/* harmony default export */ var GridItem = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: GridItem_name,
  props: extend({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    badge: [Number, String],
    iconPrefix: String,
    iconColor: String
  }),

  setup(props, {
    slots
  }) {
    var {
      parent,
      index
    } = useParent(GRID_KEY);
    var route = useRoute();

    if (!parent) {
      if (false) {}

      return;
    }

    var rootStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        square,
        gutter,
        columnNum
      } = parent.props;
      var percent = 100 / +columnNum + "%";
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
    var contentStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        square,
        gutter
      } = parent.props;

      if (square && gutter) {
        var gutterValue = addUnit(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: 'auto'
        };
      }
    });

    var renderIcon = () => {
      if (slots.icon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(badge_Badge, {
          "dot": props.dot,
          "content": props.badge
        }, {
          default: () => [slots.icon()]
        });
      }

      if (props.icon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "dot": props.dot,
          "name": props.icon,
          "size": parent.props.iconSize,
          "badge": props.badge,
          "class": GridItem_bem('icon'),
          "classPrefix": props.iconPrefix,
          "color": props.iconColor
        }, null);
      }
    };

    var renderText = () => {
      if (slots.text) {
        return slots.text();
      }

      if (props.text) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": GridItem_bem('text')
        }, [props.text]);
      }
    };

    var renderContent = () => {
      if (slots.default) {
        return slots.default();
      }

      return [renderIcon(), renderText()];
    };

    return () => {
      var {
        center,
        border,
        square,
        gutter,
        direction,
        clickable
      } = parent.props;
      var classes = [GridItem_bem('content', [direction, {
        center,
        square,
        clickable,
        surround: border && gutter
      }]), {
        [BORDER]: border
      }];
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [GridItem_bem({
          square
        })],
        "style": rootStyle.value
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": clickable ? 'button' : undefined,
        "class": classes,
        "style": contentStyle.value,
        "tabindex": clickable ? 0 : undefined,
        "onClick": route
      }, [renderContent()])]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/grid-item/index.js


var grid_item_GridItem = withInstall(GridItem);
/* harmony default export */ var grid_item = ((/* unused pure expression or super */ null && (grid_item_GridItem)));

;// CONCATENATED MODULE: ./es/image-preview/ImagePreviewItem.js

 // Utils

 // Composables

 // Components





function getDistance(touches) {
  return Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
}

var ImagePreviewItem_bem = createNamespace('image-preview')[1];
/* harmony default export */ var ImagePreviewItem = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  props: {
    src: String,
    show: Boolean,
    active: Number,
    minZoom: {
      type: [Number, String],
      required: true
    },
    maxZoom: {
      type: [Number, String],
      required: true
    },
    rootWidth: {
      type: Number,
      required: true
    },
    rootHeight: {
      type: Number,
      required: true
    }
  },
  emits: ['scale', 'close'],

  setup(props, {
    emit
  }) {
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
    var vertical = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        rootWidth,
        rootHeight
      } = props;
      var rootRatio = rootHeight / rootWidth;
      return state.imageRatio > rootRatio;
    });
    var imageStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        scale,
        moveX,
        moveY,
        moving,
        zooming
      } = state;
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
    var maxMoveX = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (state.imageRatio) {
        var {
          rootWidth,
          rootHeight
        } = props;
        var displayWidth = vertical.value ? rootHeight / state.imageRatio : rootWidth;
        return Math.max(0, (state.scale * displayWidth - rootWidth) / 2);
      }

      return 0;
    });
    var maxMoveY = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (state.imageRatio) {
        var {
          rootWidth,
          rootHeight
        } = props;
        var displayHeight = vertical.value ? rootHeight : rootWidth * state.imageRatio;
        return Math.max(0, (state.scale * displayHeight - rootHeight) / 2);
      }

      return 0;
    });

    var setScale = scale => {
      scale = range(scale, +props.minZoom, +props.maxZoom);

      if (scale !== state.scale) {
        state.scale = scale;
        emit('scale', {
          scale,
          index: props.active
        });
      }
    };

    var resetScale = () => {
      setScale(1);
      state.moveX = 0;
      state.moveY = 0;
    };

    var toggleScale = () => {
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

    var onTouchStart = event => {
      var {
        touches
      } = event;
      var {
        offsetX
      } = touch;
      touch.start(event);
      startMoveX = state.moveX;
      startMoveY = state.moveY;
      touchStartTime = Date.now();
      state.moving = touches.length === 1 && state.scale !== 1;
      state.zooming = touches.length === 2 && !offsetX.value;

      if (state.zooming) {
        startScale = state.scale;
        startDistance = getDistance(event.touches);
      }
    };

    var onTouchMove = event => {
      var {
        touches
      } = event;
      touch.move(event);

      if (state.moving || state.zooming) {
        preventDefault(event, true);
      }

      if (state.moving) {
        var {
          deltaX,
          deltaY
        } = touch;
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

    var checkTap = () => {
      var {
        offsetX,
        offsetY
      } = touch;
      var deltaTime = Date.now() - touchStartTime;
      var TAP_TIME = 250;
      var TAP_OFFSET = 10;

      if (offsetX.value < TAP_OFFSET && offsetY.value < TAP_OFFSET && deltaTime < TAP_TIME) {
        if (doubleTapTimer) {
          clearTimeout(doubleTapTimer);
          doubleTapTimer = null;
          toggleScale();
        } else {
          doubleTapTimer = setTimeout(() => {
            emit('close');
            doubleTapTimer = null;
          }, TAP_TIME);
        }
      }
    };

    var onTouchEnd = event => {
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

    var onLoad = event => {
      var {
        naturalWidth,
        naturalHeight
      } = event.target;
      state.imageRatio = naturalHeight / naturalWidth;
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.active, resetScale);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.show, value => {
      if (!value) {
        resetScale();
      }
    });
    return () => {
      var imageSlots = {
        loading: () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(loading_Loading, {
          "type": "spinner"
        }, null)
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(swipe_item_SwipeItem, {
        "class": ImagePreviewItem_bem('swipe-item'),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, {
        default: () => [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_image_Image, {
          "src": props.src,
          "fit": "contain",
          "class": ImagePreviewItem_bem('image', {
            vertical: vertical.value
          }),
          "style": imageStyle.value,
          "onLoad": onLoad
        }, imageSlots)]
      });
    };
  }

}));
;// CONCATENATED MODULE: ./es/image-preview/ImagePreview.js

 // Utils


 // Composables


 // Components





var [ImagePreview_name, ImagePreview_bem] = createNamespace('image-preview');
/* harmony default export */ var image_preview_ImagePreview = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: ImagePreview_name,
  props: {
    show: Boolean,
    loop: truthProp,
    overlay: truthProp,
    closeable: Boolean,
    showIndex: truthProp,
    className: unknownProp,
    transition: String,
    beforeClose: Function,
    overlayStyle: Object,
    showIndicators: Boolean,
    closeOnPopstate: truthProp,
    images: {
      type: Array,
      default: () => []
    },
    minZoom: {
      type: [Number, String],
      default: 1 / 3
    },
    maxZoom: {
      type: [Number, String],
      default: 3
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
    closeIconPosition: {
      type: String,
      default: 'top-right'
    }
  },
  emits: ['scale', 'close', 'closed', 'change', 'update:show'],

  setup(props, {
    emit,
    slots
  }) {
    var swipeRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var windowSize = useWindowSize();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      active: 0,
      rootWidth: 0,
      rootHeight: 0
    });

    var resize = () => {
      if (swipeRef.value) {
        var rect = swipeRef.value.$el.getBoundingClientRect();
        state.rootWidth = rect.width;
        state.rootHeight = rect.height;
        swipeRef.value.resize();
      }
    };

    var emitScale = args => emit('scale', args);

    var updateShow = show => emit('update:show', show);

    var emitClose = () => {
      callInterceptor({
        interceptor: props.beforeClose,
        args: [state.active],
        done: () => updateShow(false)
      });
    };

    var setActive = active => {
      if (active !== state.active) {
        state.active = active;
        emit('change', active);
      }
    };

    var renderIndex = () => {
      if (props.showIndex) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": ImagePreview_bem('index')
        }, [slots.index ? slots.index({
          index: state.active
        }) : state.active + 1 + " / " + props.images.length]);
      }
    };

    var renderCover = () => {
      if (slots.cover) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": ImagePreview_bem('cover')
        }, [slots.cover()]);
      }
    };

    var renderImages = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(swipe_Swipe, {
      "ref": swipeRef,
      "lazyRender": true,
      "loop": props.loop,
      "class": ImagePreview_bem('swipe'),
      "duration": props.swipeDuration,
      "initialSwipe": props.startPosition,
      "showIndicators": props.showIndicators,
      "indicatorColor": "white",
      "onChange": setActive
    }, {
      default: () => [props.images.map(image => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(ImagePreviewItem, {
        "src": image,
        "show": props.show,
        "active": state.active,
        "maxZoom": props.maxZoom,
        "minZoom": props.minZoom,
        "rootWidth": state.rootWidth,
        "rootHeight": state.rootHeight,
        "onScale": emitScale,
        "onClose": emitClose
      }, null))]
    });

    var renderClose = () => {
      if (props.closeable) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "role": "button",
          "name": props.closeIcon,
          "class": ImagePreview_bem('close-icon', props.closeIconPosition),
          "onClick": emitClose
        }, null);
      }
    };

    var onClosed = () => emit('closed');

    var swipeTo = (index, options) => {
      var _swipeRef$value;

      return (_swipeRef$value = swipeRef.value) == null ? void 0 : _swipeRef$value.swipeTo(index, options);
    };

    useExpose({
      swipeTo
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(resize);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([windowSize.width, windowSize.height], resize);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.startPosition, value => setActive(+value));
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.show, value => {
      var {
        images,
        startPosition
      } = props;

      if (value) {
        setActive(+startPosition);
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
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
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup_Popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
      "class": [ImagePreview_bem(), props.className],
      "overlayClass": ImagePreview_bem('overlay'),
      "onClosed": onClosed
    }, pick(props, ['show', 'transition', 'overlayStyle', 'closeOnPopstate']), {
      'onUpdate:show': updateShow
    }), {
      default: () => [renderClose(), renderImages(), renderIndex(), renderCover()]
    });
  }

}));
;// CONCATENATED MODULE: ./es/image-preview/function-call.js




var function_call_instance;
var defaultConfig = {
  loop: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onScale: undefined,
  onClose: undefined,
  onChange: undefined,
  teleport: 'body',
  className: '',
  showIndex: true,
  closeable: false,
  closeIcon: 'clear',
  transition: undefined,
  beforeClose: undefined,
  overlayStyle: undefined,
  startPosition: 0,
  swipeDuration: 300,
  showIndicators: false,
  closeOnPopstate: true,
  closeIconPosition: 'top-right'
};

function function_call_initInstance() {
  ({
    instance: function_call_instance
  } = mountComponent({
    setup() {
      var {
        state,
        toggle
      } = usePopupState();

      var onClosed = () => {
        state.images = [];
      };

      return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(image_preview_ImagePreview, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)(state, {
        onClosed,
        'onUpdate:show': toggle
      }), null);
    }

  }));
}

var function_call_ImagePreview = (images, startPosition = 0) => {
  /* istanbul ignore if */
  if (!inBrowser) {
    return;
  }

  if (!function_call_instance) {
    function_call_initInstance();
  }

  var options = Array.isArray(images) ? {
    images,
    startPosition
  } : images;
  function_call_instance.open(extend({}, defaultConfig, options));
  return function_call_instance;
};

function_call_ImagePreview.Component = withInstall(image_preview_ImagePreview);

function_call_ImagePreview.install = app => {
  app.use(withInstall(image_preview_ImagePreview));
};


;// CONCATENATED MODULE: ./es/index-bar/IndexBar.js

 // Utils

 // Composables





function genAlphabet() {
  var charCodeOfA = 'A'.charCodeAt(0);
  var indexList = Array(26).fill('').map((_, i) => String.fromCharCode(charCodeOfA + i));
  return indexList;
}

var [IndexBar_name, IndexBar_bem] = createNamespace('index-bar');
var INDEX_BAR_KEY = Symbol(IndexBar_name);
var IndexBar_props = {
  sticky: truthProp,
  zIndex: [Number, String],
  highlightColor: String,
  stickyOffsetTop: {
    type: Number,
    default: 0
  },
  indexList: {
    type: Array,
    default: genAlphabet
  }
};
/* harmony default export */ var IndexBar = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: IndexBar_name,
  props: IndexBar_props,
  emits: ['select', 'change'],

  setup(props, {
    emit,
    slots
  }) {
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var activeAnchor = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)('');
    var touch = useTouch();
    var scrollParent = useScrollParent(root);
    var {
      children,
      linkChildren
    } = useChildren(INDEX_BAR_KEY);
    linkChildren({
      props
    });
    var sidebarStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (isDef(props.zIndex)) {
        return {
          zIndex: +props.zIndex + 1
        };
      }
    });
    var highlightStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      if (props.highlightColor) {
        return {
          color: props.highlightColor
        };
      }
    });

    var getScrollerRect = () => {
      if ('getBoundingClientRect' in scrollParent.value) {
        return useRect(scrollParent);
      }

      return {
        top: 0,
        left: 0
      };
    };

    var getActiveAnchor = (scrollTop, rects) => {
      for (var i = children.length - 1; i >= 0; i--) {
        var prevHeight = i > 0 ? rects[i - 1].height : 0;
        var reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : 0;

        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }

      return -1;
    };

    var onScroll = () => {
      if (isHidden(root)) {
        return;
      }

      var {
        sticky,
        indexList
      } = props;
      var scrollTop = getScrollTop(scrollParent.value);
      var scrollParentRect = getScrollerRect();
      var rects = children.map(item => item.getRect(scrollParent.value, scrollParentRect));
      var active = getActiveAnchor(scrollTop, rects);
      activeAnchor.value = indexList[active];

      if (sticky) {
        children.forEach((item, index) => {
          var {
            state,
            $el
          } = item;

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

    var init = () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(onScroll);

    useEventListener('scroll', onScroll, {
      target: scrollParent
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(init);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.indexList, init);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(activeAnchor, value => {
      if (value) {
        emit('change', value);
      }
    });

    var renderIndexes = () => props.indexList.map(index => {
      var active = index === activeAnchor.value;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": IndexBar_bem('index', {
          active
        }),
        "style": active ? highlightStyle.value : undefined,
        "data-index": index
      }, [index]);
    });

    var scrollTo = index => {
      if (!index) {
        return;
      }

      var match = children.find(item => String(item.index) === index);

      if (match) {
        match.$el.scrollIntoView();

        if (props.sticky && props.stickyOffsetTop) {
          setRootScrollTop(getRootScrollTop() - props.stickyOffsetTop);
        }

        emit('select', match.index);
      }
    };

    var scrollToElement = element => {
      var {
        index
      } = element.dataset;

      if (index) {
        scrollTo(index);
      }
    };

    var onClickSidebar = event => {
      scrollToElement(event.target);
    };

    var touchActiveIndex;

    var onTouchMove = event => {
      touch.move(event);

      if (touch.isVertical()) {
        preventDefault(event);
        var {
          clientX,
          clientY
        } = event.touches[0];
        var target = document.elementFromPoint(clientX, clientY);

        if (target) {
          var {
            index
          } = target.dataset;

          if (index && touchActiveIndex !== index) {
            touchActiveIndex = index;
            scrollToElement(target);
          }
        }
      }
    };

    useExpose({
      scrollTo
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "ref": root,
      "class": IndexBar_bem()
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": IndexBar_bem('sidebar'),
      "style": sidebarStyle.value,
      "onClick": onClickSidebar,
      "onTouchstart": touch.start,
      "onTouchmove": onTouchMove
    }, [renderIndexes()]), slots.default == null ? void 0 : slots.default()]);
  }

}));
;// CONCATENATED MODULE: ./es/index-anchor/IndexAnchor.js

 // Utils




 // Composables



var [IndexAnchor_name, IndexAnchor_bem] = createNamespace('index-anchor');
/* harmony default export */ var IndexAnchor = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: IndexAnchor_name,
  props: {
    index: [Number, String]
  },

  setup(props, {
    slots
  }) {
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
    var {
      parent
    } = useParent(INDEX_BAR_KEY);

    if (!parent) {
      if (false) {}

      return;
    }

    var isSticky = () => state.active && parent.props.sticky;

    var anchorStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        zIndex,
        highlightColor
      } = parent.props;

      if (isSticky()) {
        return extend(getZIndexStyle(zIndex), {
          left: state.left ? state.left + "px" : undefined,
          width: state.width ? state.width + "px" : undefined,
          transform: state.top ? "translate3d(0, " + state.top + "px, 0)" : undefined,
          color: highlightColor
        });
      }
    });

    var getRect = (scrollParent, scrollParentRect) => {
      var rootRect = useRect(root);
      state.rect.height = rootRect.height;

      if (scrollParent === window || scrollParent === document.body) {
        state.rect.top = rootRect.top + getRootScrollTop();
      } else {
        state.rect.top = rootRect.top + getScrollTop(scrollParent) - scrollParentRect.top;
      }

      return state.rect;
    };

    useExpose({
      state,
      getRect
    });
    return () => {
      var sticky = isSticky();
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "style": {
          height: sticky ? state.rect.height + "px" : undefined
        }
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "style": anchorStyle.value,
        "class": [IndexAnchor_bem({
          sticky
        }), {
          [BORDER_BOTTOM]: sticky
        }]
      }, [slots.default ? slots.default() : props.index])]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/index-anchor/index.js


var index_anchor_IndexAnchor = withInstall(IndexAnchor);
/* harmony default export */ var index_anchor = ((/* unused pure expression or super */ null && (index_anchor_IndexAnchor)));

;// CONCATENATED MODULE: ./es/index-bar/index.js


var index_bar_IndexBar = withInstall(IndexBar);
/* harmony default export */ var index_bar = ((/* unused pure expression or super */ null && (index_bar_IndexBar)));

;// CONCATENATED MODULE: ./es/list/List.js

 // Utils

 // Composables



 // Components


var [List_name, List_bem, List_t] = createNamespace('list');
/* harmony default export */ var List = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: List_name,
  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: String,
    finishedText: String,
    immediateCheck: truthProp,
    offset: {
      type: [Number, String],
      default: 300
    },
    direction: {
      type: String,
      default: 'down'
    }
  },
  emits: ['load', 'update:error', 'update:loading'],

  setup(props, {
    emit,
    slots
  }) {
    // use sync innerLoading state to avoid repeated loading in some edge cases
    var loading = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(false);
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var placeholder = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var tabStatus = useTabStatus();
    var scrollParent = useScrollParent(root);

    var check = () => {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        if (loading.value || props.finished || props.error || // skip check when inside an inactive tab
        (tabStatus == null ? void 0 : tabStatus.value) === false) {
          return;
        }

        var {
          offset,
          direction
        } = props;
        var scrollParentRect = useRect(scrollParent);

        if (!scrollParentRect.height || isHidden(root)) {
          return;
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

    var renderFinishedText = () => {
      if (props.finished) {
        var text = slots.finished ? slots.finished() : props.finishedText;

        if (text) {
          return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
            "class": List_bem('finished-text')
          }, [text]);
        }
      }
    };

    var clickErrorText = () => {
      emit('update:error', false);
      check();
    };

    var renderErrorText = () => {
      if (props.error) {
        var text = slots.error ? slots.error() : props.errorText;

        if (text) {
          return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
            "class": List_bem('error-text'),
            "onClick": clickErrorText
          }, [text]);
        }
      }
    };

    var renderLoading = () => {
      if (loading.value && !props.finished) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": List_bem('loading')
        }, [slots.loading ? slots.loading() : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(loading_Loading, {
          "class": List_bem('loading-icon')
        }, {
          default: () => [props.loadingText || List_t('loading')]
        })]);
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([() => props.loading, () => props.finished, () => props.error], check);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onUpdated)(() => {
      loading.value = props.loading;
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(() => {
      if (props.immediateCheck) {
        check();
      }
    });
    useExpose({
      check
    });
    useEventListener('scroll', check, {
      target: scrollParent
    });
    return () => {
      var Content = slots.default == null ? void 0 : slots.default();

      var Placeholder = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": placeholder,
        "class": List_bem('placeholder')
      }, null);

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "role": "feed",
        "class": List_bem(),
        "aria-busy": loading.value
      }, [props.direction === 'down' ? Content : Placeholder, renderLoading(), renderFinishedText(), renderErrorText(), props.direction === 'up' ? Content : Placeholder]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/list/index.js


var list_List = withInstall(List);
/* harmony default export */ var list = ((/* unused pure expression or super */ null && (list_List)));

;// CONCATENATED MODULE: ./es/composables/use-placeholder.js


function usePlaceholder(contentRef, bem) {
  var height = useHeight(contentRef);
  return renderContent => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
    "class": bem('placeholder'),
    "style": {
      height: height.value ? height.value + "px" : undefined
    }
  }, [renderContent()]);
}
;// CONCATENATED MODULE: ./es/nav-bar/NavBar.js

 // Utils


 // Composables

 // Components


var [NavBar_name, NavBar_bem] = createNamespace('nav-bar');
/* harmony default export */ var NavBar = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: NavBar_name,
  props: {
    title: String,
    fixed: Boolean,
    zIndex: [Number, String],
    border: truthProp,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    placeholder: Boolean,
    safeAreaInsetTop: Boolean
  },
  emits: ['click-left', 'click-right'],

  setup(props, {
    emit,
    slots
  }) {
    var navBarRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var renderPlaceholder = usePlaceholder(navBarRef, NavBar_bem);

    var onClickLeft = event => emit('click-left', event);

    var onClickRight = event => emit('click-right', event);

    var renderLeft = () => {
      if (slots.left) {
        return slots.left();
      }

      return [props.leftArrow && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "class": NavBar_bem('arrow'),
        "name": "arrow-left"
      }, null), props.leftText && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": NavBar_bem('text')
      }, [props.leftText])];
    };

    var renderRight = () => {
      if (slots.right) {
        return slots.right();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": NavBar_bem('text')
      }, [props.rightText]);
    };

    var renderNavBar = () => {
      var {
        title,
        fixed,
        border,
        zIndex
      } = props;
      var style = getZIndexStyle(zIndex);
      var hasLeft = props.leftArrow || props.leftText || slots.left;
      var hasRight = props.rightText || slots.right;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": navBarRef,
        "style": style,
        "class": [NavBar_bem({
          fixed,
          'safe-area-inset-top': props.safeAreaInsetTop
        }), {
          [BORDER_BOTTOM]: border
        }]
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": NavBar_bem('content')
      }, [hasLeft && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": NavBar_bem('left'),
        "onClick": onClickLeft
      }, [renderLeft()]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [NavBar_bem('title'), 'van-ellipsis']
      }, [slots.title ? slots.title() : title]), hasRight && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": NavBar_bem('right'),
        "onClick": onClickRight
      }, [renderRight()])])]);
    };

    return () => {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderNavBar);
      }

      return renderNavBar();
    };
  }

}));
;// CONCATENATED MODULE: ./es/nav-bar/index.js


var nav_bar_NavBar = withInstall(NavBar);
/* harmony default export */ var nav_bar = ((/* unused pure expression or super */ null && (nav_bar_NavBar)));

;// CONCATENATED MODULE: ./es/notice-bar/NoticeBar.js

 // Utils

 // Composables


 // Components


var [NoticeBar_name, NoticeBar_bem] = createNamespace('notice-bar');
/* harmony default export */ var NoticeBar = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: NoticeBar_name,
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
      default: 60
    }
  },
  emits: ['close', 'replay'],

  setup(props, {
    emit,
    slots
  }) {
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

    var renderLeftIcon = () => {
      if (slots['left-icon']) {
        return slots['left-icon']();
      }

      if (props.leftIcon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "class": NoticeBar_bem('left-icon'),
          "name": props.leftIcon
        }, null);
      }
    };

    var getRightIconName = () => {
      if (props.mode === 'closeable') {
        return 'cross';
      }

      if (props.mode === 'link') {
        return 'arrow';
      }
    };

    var onClickRightIcon = event => {
      if (props.mode === 'closeable') {
        state.show = false;
        emit('close', event);
      }
    };

    var renderRightIcon = () => {
      if (slots['right-icon']) {
        return slots['right-icon']();
      }

      var name = getRightIconName();

      if (name) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": name,
          "class": NoticeBar_bem('right-icon'),
          "onClick": onClickRightIcon
        }, null);
      }
    };

    var onTransitionEnd = () => {
      state.offset = wrapWidth;
      state.duration = 0; // wait for Vue to render offset
      // using nextTick won't work in iOS14

      raf(() => {
        // use double raf to ensure animation can start
        doubleRaf(() => {
          state.offset = -contentWidth;
          state.duration = (contentWidth + wrapWidth) / +props.speed;
          emit('replay');
        });
      });
    };

    var renderMarquee = () => {
      var ellipsis = props.scrollable === false && !props.wrapable;
      var style = {
        transform: state.offset ? "translateX(" + state.offset + "px)" : '',
        transitionDuration: state.duration + "s"
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": wrapRef,
        "role": "marquee",
        "class": NoticeBar_bem('wrap')
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": contentRef,
        "style": style,
        "class": [NoticeBar_bem('content'), {
          'van-ellipsis': ellipsis
        }],
        "onTransitionend": onTransitionEnd
      }, [slots.default ? slots.default() : props.text])]);
    };

    var reset = () => {
      wrapWidth = 0;
      contentWidth = 0;
      state.offset = 0;
      state.duration = 0;
    };

    var start = () => {
      var {
        delay,
        speed,
        scrollable
      } = props;
      var ms = isDef(delay) ? +delay * 1000 : 0;
      reset();
      clearTimeout(startTimer);
      startTimer = setTimeout(() => {
        if (!wrapRef.value || !contentRef.value || scrollable === false) {
          return;
        }

        var wrapRefWidth = useRect(wrapRef).width;
        var contentRefWidth = useRect(contentRef).width;

        if (scrollable || contentRefWidth > wrapRefWidth) {
          doubleRaf(() => {
            wrapWidth = wrapRefWidth;
            contentWidth = contentRefWidth;
            state.offset = -contentWidth;
            state.duration = contentWidth / +speed;
          });
        }
      }, ms);
    };

    onPopupReopen(start);
    onMountedOrActivated(start); // fix cache issues with forwards and back history in safari
    // see: https://guwii.com/cache-issues-with-forwards-and-back-history-in-safari/

    useEventListener('pageshow', start);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => [props.text, props.scrollable], start);
    return () => {
      var {
        color,
        wrapable,
        background
      } = props;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "alert",
        "class": NoticeBar_bem({
          wrapable
        }),
        "style": {
          color,
          background
        }
      }, [renderLeftIcon(), renderMarquee(), renderRightIcon()]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, state.show]]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/notice-bar/index.js


var notice_bar_NoticeBar = withInstall(NoticeBar);
/* harmony default export */ var notice_bar = ((/* unused pure expression or super */ null && (notice_bar_NoticeBar)));

;// CONCATENATED MODULE: ./es/notify/Notify.js





var [Notify_name, Notify_bem] = createNamespace('notify');
/* harmony default export */ var notify_Notify = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Notify_name,
  props: extend({}, popupSharedProps, {
    color: String,
    message: [Number, String],
    className: unknownProp,
    background: String,
    lockScroll: Boolean,
    type: {
      type: String,
      default: 'danger'
    }
  }),

  setup(props, {
    slots
  }) {
    return () => {
      var style = {
        color: props.color,
        background: props.background
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup_Popup, {
        "show": props.show,
        "class": [Notify_bem([props.type]), props.className],
        "style": style,
        "overlay": false,
        "position": "top",
        "duration": 0.2,
        "lockScroll": props.lockScroll
      }, {
        default: () => [slots.default ? slots.default() : props.message]
      });
    };
  }

}));
;// CONCATENATED MODULE: ./es/notify/function-call.js




var timer;
var notify_function_call_instance;

function function_call_parseOptions(message) {
  return isObject(message) ? message : {
    message
  };
}

function notify_function_call_initInstance() {
  ({
    instance: notify_function_call_instance
  } = mountComponent({
    setup() {
      var {
        state,
        toggle
      } = usePopupState();
      return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(notify_Notify, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)(state, {
        'onUpdate:show': toggle
      }), null);
    }

  }));
}

function function_call_Notify(options) {
  if (!inBrowser) {
    return;
  }

  if (!notify_function_call_instance) {
    notify_function_call_initInstance();
  }

  options = extend(function_call_Notify.currentOptions, function_call_parseOptions(options));
  notify_function_call_instance.open(options);
  clearTimeout(timer);

  if (options.duration > 0) {
    timer = window.setTimeout(function_call_Notify.clear, options.duration);
  }

  return notify_function_call_instance;
}

function function_call_defaultOptions() {
  return {
    type: 'danger',
    color: undefined,
    message: '',
    onClose: undefined,
    onClick: undefined,
    onOpened: undefined,
    duration: 3000,
    className: '',
    lockScroll: false,
    background: undefined
  };
}

function_call_Notify.clear = () => {
  if (notify_function_call_instance) {
    notify_function_call_instance.toggle(false);
  }
};

function_call_Notify.currentOptions = function_call_defaultOptions();

function_call_Notify.setDefaultOptions = options => {
  extend(function_call_Notify.currentOptions, options);
};

function_call_Notify.resetDefaultOptions = () => {
  function_call_Notify.currentOptions = function_call_defaultOptions();
};

function_call_Notify.install = app => {
  app.use(withInstall(notify_Notify));
  app.config.globalProperties.$notify = function_call_Notify;
};

function_call_Notify.Component = withInstall(notify_Notify);

;// CONCATENATED MODULE: ./es/number-keyboard/NumberKeyboardKey.js





var [NumberKeyboardKey_name, NumberKeyboardKey_bem] = createNamespace('key');

var CollapseIcon = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("svg", {
  "class": NumberKeyboardKey_bem('collapse-icon'),
  "viewBox": "0 0 30 24"
}, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "d": "M25.877 12.843h-1.502c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.5c.187 0 .187 0 .187-.188v-1.511c0-.19 0-.191-.185-.191zM17.999 10.2c0 .188 0 .188.188.188h1.687c.188 0 .188 0 .188-.188V8.688c0-.187.004-.187-.186-.19h-1.69c-.187 0-.187 0-.187.19V10.2zm2.25-3.967h1.5c.188 0 .188 0 .188-.188v-1.7c0-.19 0-.19-.188-.19h-1.5c-.189 0-.189 0-.189.19v1.7c0 .188 0 .188.19.188zm2.063 4.157h3.563c.187 0 .187 0 .187-.189V4.346c0-.19.004-.19-.185-.19h-1.69c-.187 0-.187 0-.187.188v4.155h-1.688c-.187 0-.187 0-.187.189v1.514c0 .19 0 .19.187.19zM14.812 24l2.812-3.4H12l2.813 3.4zm-9-11.157H4.31c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.502c.187 0 .187 0 .187-.188v-1.511c0-.19.01-.191-.189-.191zm15.937 0H8.25c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h13.5c.188 0 .188 0 .188-.188v-1.511c0-.19 0-.191-.188-.191zm-11.438-2.454h1.5c.188 0 .188 0 .188-.188V8.688c0-.187 0-.187-.188-.189h-1.5c-.187 0-.187 0-.187.189V10.2c0 .188 0 .188.187.188zM27.94 0c.563 0 .917.21 1.313.567.518.466.748.757.748 1.51v14.92c0 .567-.188 1.134-.562 1.512-.376.378-.938.566-1.313.566H2.063c-.563 0-.938-.188-1.313-.566-.562-.378-.75-.945-.75-1.511V2.078C0 1.51.188.944.562.567.938.189 1.5 0 1.875 0zm-.062 2H2v14.92h25.877V2zM5.81 4.157c.19 0 .19 0 .19.189v1.762c-.003.126-.024.126-.188.126H4.249c-.126-.003-.126-.023-.126-.188v-1.7c-.187-.19 0-.19.188-.19zm10.5 2.077h1.503c.187 0 .187 0 .187-.188v-1.7c0-.19 0-.19-.187-.19h-1.502c-.188 0-.188.001-.188.19v1.7c0 .188 0 .188.188.188zM7.875 8.5c.187 0 .187.002.187.189V10.2c0 .188 0 .188-.187.188H4.249c-.126-.002-.126-.023-.126-.188V8.625c.003-.126.024-.126.188-.126zm7.875 0c.19.002.19.002.19.189v1.575c-.003.126-.024.126-.19.126h-1.563c-.126-.002-.126-.023-.126-.188V8.625c.002-.126.023-.126.189-.126zm-6-4.342c.187 0 .187 0 .187.189v1.7c0 .188 0 .188-.187.188H8.187c-.126-.003-.126-.023-.126-.188V4.283c.003-.126.024-.126.188-.126zm3.94 0c.185 0 .372 0 .372.189v1.762c-.002.126-.023.126-.187.126h-1.75C12 6.231 12 6.211 12 6.046v-1.7c0-.19.187-.19.187-.19z",
  "fill": "currentColor"
}, null)]);

var DeleteIcon = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("svg", {
  "class": NumberKeyboardKey_bem('delete-icon'),
  "viewBox": "0 0 32 22"
}, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("path", {
  "d": "M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z",
  "fill": "currentColor"
}, null)]);

/* harmony default export */ var NumberKeyboardKey = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: NumberKeyboardKey_name,
  props: {
    type: String,
    text: [Number, String],
    color: String,
    wider: Boolean,
    large: Boolean,
    loading: Boolean
  },
  emits: ['press'],

  setup(props, {
    emit,
    slots
  }) {
    var active = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)(false);
    var touch = useTouch();

    var onTouchStart = event => {
      touch.start(event);
      active.value = true;
    };

    var onTouchMove = event => {
      touch.move(event);

      if (touch.direction.value) {
        active.value = false;
      }
    };

    var onTouchEnd = event => {
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

    var renderContent = () => {
      if (props.loading) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(loading_Loading, {
          "class": NumberKeyboardKey_bem('loading-icon')
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

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": NumberKeyboardKey_bem('wrapper', {
        wider: props.wider
      }),
      "onTouchstart": onTouchStart,
      "onTouchmove": onTouchMove,
      "onTouchend": onTouchEnd,
      "onTouchcancel": onTouchEnd
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "role": "button",
      "tabindex": 0,
      "class": NumberKeyboardKey_bem([props.color, {
        large: props.large,
        active: active.value,
        delete: props.type === 'delete'
      }])
    }, [renderContent()])]);
  }

}));
;// CONCATENATED MODULE: ./es/number-keyboard/NumberKeyboard.js

 // Utils

 // Composables

 // Components


var [NumberKeyboard_name, NumberKeyboard_bem] = createNamespace('number-keyboard');
/* harmony default export */ var NumberKeyboard = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: NumberKeyboard_name,
  props: {
    show: Boolean,
    title: String,
    zIndex: [Number, String],
    teleport: [String, Object],
    transition: truthProp,
    blurOnClose: truthProp,
    showDeleteKey: truthProp,
    randomKeyOrder: Boolean,
    closeButtonText: String,
    deleteButtonText: String,
    closeButtonLoading: Boolean,
    hideOnClickOutside: truthProp,
    safeAreaInsetBottom: truthProp,
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
    }
  },
  emits: ['show', 'hide', 'blur', 'input', 'close', 'delete', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var genBasicKeys = () => {
      var keys = Array(9).fill('').map((_, i) => ({
        text: i + 1
      }));

      if (props.randomKeyOrder) {
        keys.sort(() => Math.random() > 0.5 ? 1 : -1);
      }

      return keys;
    };

    var genDefaultKeys = () => [...genBasicKeys(), {
      text: props.extraKey,
      type: 'extra'
    }, {
      text: 0
    }, {
      text: props.showDeleteKey ? props.deleteButtonText : '',
      type: props.showDeleteKey ? 'delete' : ''
    }];

    var genCustomKeys = () => {
      var keys = genBasicKeys();
      var {
        extraKey
      } = props;
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

    var keys = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => props.theme === 'custom' ? genCustomKeys() : genDefaultKeys());

    var onBlur = () => {
      if (props.show) {
        emit('blur');
      }
    };

    var onClose = () => {
      emit('close');

      if (props.blurOnClose) {
        onBlur();
      }
    };

    var onAnimationEnd = () => emit(props.show ? 'show' : 'hide');

    var onPress = (text, type) => {
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

    var renderTitle = () => {
      var {
        title,
        theme,
        closeButtonText
      } = props;
      var leftSlot = slots['title-left'];
      var showClose = closeButtonText && theme === 'default';
      var showTitle = title || showClose || leftSlot;

      if (!showTitle) {
        return;
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": NumberKeyboard_bem('header')
      }, [leftSlot && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": NumberKeyboard_bem('title-left')
      }, [leftSlot()]), title && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("h2", {
        "class": NumberKeyboard_bem('title')
      }, [title]), showClose && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
        "type": "button",
        "class": NumberKeyboard_bem('close'),
        "onClick": onClose
      }, [closeButtonText])]);
    };

    var renderKeys = () => {
      return keys.value.map(key => {
        var keySlots = {};

        if (key.type === 'delete') {
          keySlots.default = slots.delete;
        }

        if (key.type === 'extra') {
          keySlots.default = slots['extra-key'];
        }

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(NumberKeyboardKey, {
          "key": key.text,
          "text": key.text,
          "type": key.type,
          "wider": key.wider,
          "color": key.color,
          "onPress": onPress
        }, keySlots);
      });
    };

    var renderSidebar = () => {
      if (props.theme === 'custom') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": NumberKeyboard_bem('sidebar')
        }, [props.showDeleteKey && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(NumberKeyboardKey, {
          "large": true,
          "text": props.deleteButtonText,
          "type": "delete",
          "onPress": onPress
        }, {
          delete: slots.delete
        }), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(NumberKeyboardKey, {
          "large": true,
          "text": props.closeButtonText,
          "type": "close",
          "color": "blue",
          "loading": props.closeButtonLoading,
          "onPress": onPress
        }, null)]);
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.show, value => {
      if (!props.transition) {
        emit(value ? 'show' : 'hide');
      }
    });

    if (props.hideOnClickOutside) {
      useClickAway(root, onClose, {
        eventName: 'touchstart'
      });
    }

    return () => {
      var Title = renderTitle();

      var Content = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Transition, {
        "name": props.transition ? 'van-slide-up' : ''
      }, {
        default: () => [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "ref": root,
          "style": getZIndexStyle(props.zIndex),
          "class": NumberKeyboard_bem({
            unfit: !props.safeAreaInsetBottom,
            'with-title': !!Title
          }),
          "onTouchstart": stopPropagation,
          "onAnimationend": onAnimationEnd,
          "onWebkitAnimationEnd": onAnimationEnd
        }, [Title, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": NumberKeyboard_bem('body')
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": NumberKeyboard_bem('keys')
        }, [renderKeys()]), renderSidebar()])]), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.show]])]
      });

      if (props.teleport) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Teleport, {
          "to": props.teleport
        }, {
          default: () => [Content]
        });
      }

      return Content;
    };
  }

}));
;// CONCATENATED MODULE: ./es/number-keyboard/index.js


var number_keyboard_NumberKeyboard = withInstall(NumberKeyboard);
/* harmony default export */ var number_keyboard = ((/* unused pure expression or super */ null && (number_keyboard_NumberKeyboard)));

;// CONCATENATED MODULE: ./es/pagination/Pagination.js




var [Pagination_name, Pagination_bem, Pagination_t] = createNamespace('pagination');

function makePage(number, text, active) {
  return {
    number,
    text,
    active
  };
}

/* harmony default export */ var Pagination = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Pagination_name,
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

  setup(props, {
    emit,
    slots
  }) {
    var count = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        pageCount,
        totalItems,
        itemsPerPage
      } = props;
      var count = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
      return Math.max(1, count);
    });
    var pages = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var items = [];
      var pageCount = count.value;
      var showPageSize = +props.showPageSize;
      var {
        modelValue,
        forceEllipses
      } = props;

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

    var select = (page, emitChange) => {
      page = Math.min(count.value, Math.max(1, page));

      if (props.modelValue !== page) {
        emit('update:modelValue', page);

        if (emitChange) {
          emit('change', page);
        }
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.modelValue, value => {
      select(value);
    }, {
      immediate: true
    });

    var renderDesc = () => {
      if (props.mode !== 'multi') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
          "class": Pagination_bem('page-desc')
        }, [slots.pageDesc ? slots.pageDesc() : props.modelValue + "/" + count.value]);
      }
    };

    return () => {
      var value = props.modelValue;
      var simple = props.mode !== 'multi';

      var onSelect = value => () => select(value, true);

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("ul", {
        "class": Pagination_bem({
          simple
        })
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
        "class": [Pagination_bem('item', {
          disabled: value === 1
        }), Pagination_bem('prev'), BORDER],
        "onClick": onSelect(value - 1)
      }, [slots['prev-text'] ? slots['prev-text']() : props.prevText || Pagination_t('prev')]), pages.value.map(page => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
        "class": [Pagination_bem('item', {
          active: page.active
        }), Pagination_bem('page'), BORDER],
        "onClick": onSelect(page.number)
      }, [slots.page ? slots.page(page) : page.text])), renderDesc(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
        "class": [Pagination_bem('item', {
          disabled: value === count.value
        }), Pagination_bem('next'), BORDER],
        "onClick": onSelect(value + 1)
      }, [slots['next-text'] ? slots['next-text']() : props.nextText || Pagination_t('next')])]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/pagination/index.js


var pagination_Pagination = withInstall(Pagination);
/* harmony default export */ var pagination = ((/* unused pure expression or super */ null && (pagination_Pagination)));

;// CONCATENATED MODULE: ./es/password-input/PasswordInput.js




var [PasswordInput_name, PasswordInput_bem] = createNamespace('password-input');
/* harmony default export */ var PasswordInput = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: PasswordInput_name,
  props: {
    info: String,
    mask: truthProp,
    gutter: [Number, String],
    focused: Boolean,
    errorInfo: String,
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

  setup(props, {
    emit
  }) {
    var onTouchStart = event => {
      event.stopPropagation();
      emit('focus', event);
    };

    var renderPoints = () => {
      var Points = [];
      var {
        mask,
        value,
        length,
        gutter,
        focused
      } = props;

      for (var i = 0; i < length; i++) {
        var char = value[i];
        var showBorder = i !== 0 && !gutter;
        var showCursor = focused && i === value.length;
        var style = void 0;

        if (i !== 0 && gutter) {
          style = {
            marginLeft: addUnit(gutter)
          };
        }

        Points.push((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("li", {
          "class": [{
            [BORDER_LEFT]: showBorder
          }, PasswordInput_bem('item', {
            focus: showCursor
          })],
          "style": style
        }, [mask ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("i", {
          "style": {
            visibility: char ? 'visible' : 'hidden'
          }
        }, null) : char, showCursor && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": PasswordInput_bem('cursor')
        }, null)]));
      }

      return Points;
    };

    return () => {
      var info = props.errorInfo || props.info;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": PasswordInput_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("ul", {
        "class": [PasswordInput_bem('security'), {
          [BORDER_SURROUND]: !props.gutter
        }],
        "onTouchstart": onTouchStart
      }, [renderPoints()]), info && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": PasswordInput_bem(props.errorInfo ? 'error-info' : 'info')
      }, [info])]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/password-input/index.js


var password_input_PasswordInput = withInstall(PasswordInput);
/* harmony default export */ var password_input = ((/* unused pure expression or super */ null && (password_input_PasswordInput)));

;// CONCATENATED MODULE: ./node_modules/@vant/popperjs/dist/esm/index.js
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

function getWindow(node) {
  if (node == null) {
    return window;
  }

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

function esm_isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
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
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((esm_isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
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

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function esm_getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
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
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = esm_getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
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

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = esm_getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = esm_getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
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

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && esm_getComputedStyle(offsetParent).position === 'static')) {
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
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var round = Math.round;

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
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
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
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
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
        state.options = Object.assign({}, defaultOptions, state.options, options);
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
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
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

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(round(x * dpr) / dpr) || 0,
    y: round(round(y * dpr) / dpr) || 0
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
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = esm_top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (esm_getComputedStyle(offsetParent).position !== 'static') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === esm_top) {
      sideY = bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (false) { var transitionProperty; }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
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
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
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
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
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
      }

      Object.assign(element.style, style);
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

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
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



;// CONCATENATED MODULE: ./es/popover/Popover.js


 // Utils


 // Composables

 // Components



var [Popover_name, Popover_bem] = createNamespace('popover');
var popupProps = ['show', 'overlay', 'duration', 'teleport', 'overlayStyle', 'overlayClass', 'closeOnClickOverlay'];
/* harmony default export */ var Popover = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Popover_name,
  props: {
    show: Boolean,
    overlay: Boolean,
    duration: [Number, String],
    iconPrefix: String,
    overlayClass: unknownProp,
    overlayStyle: Object,
    closeOnClickAction: truthProp,
    closeOnClickOverlay: truthProp,
    closeOnClickOutside: truthProp,
    offset: {
      type: Array,
      default: () => [0, 8]
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
      default: () => []
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    teleport: {
      type: [String, Object],
      default: 'body'
    }
  },
  emits: ['select', 'touchstart', 'update:show'],

  setup(props, {
    emit,
    slots,
    attrs
  }) {
    var popper;
    var wrapperRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var popoverRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var createPopperInstance = () => {
      return createPopper(wrapperRef.value, popoverRef.value.popupRef.value, {
        placement: props.placement,
        modifiers: [{
          name: 'computeStyles',
          options: {
            adaptive: false,
            gpuAcceleration: false
          }
        }, extend({}, offset$1, {
          options: {
            offset: props.offset
          }
        })]
      });
    };

    var updateLocation = () => {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
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

    var updateShow = value => emit('update:show', value);

    var onClickWrapper = () => {
      if (props.trigger === 'click') {
        updateShow(!props.show);
      }
    };

    var onTouchstart = event => {
      event.stopPropagation();
      emit('touchstart', event);
    };

    var onClickAction = (action, index) => {
      if (action.disabled) {
        return;
      }

      emit('select', action, index);

      if (props.closeOnClickAction) {
        updateShow(false);
      }
    };

    var onClickAway = () => {
      if (props.closeOnClickOutside && (!props.overlay || props.closeOnClickOverlay)) {
        updateShow(false);
      }
    };

    var renderAction = (action, index) => {
      var {
        icon,
        text,
        color,
        disabled,
        className
      } = action;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "menuitem",
        "class": [Popover_bem('action', {
          disabled,
          'with-icon': icon
        }), className],
        "style": {
          color
        },
        "onClick": () => onClickAction(action, index)
      }, [icon && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "name": icon,
        "classPrefix": props.iconPrefix,
        "class": Popover_bem('action-icon')
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [Popover_bem('action-text'), BORDER_BOTTOM]
      }, [text])]);
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(updateLocation);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onBeforeUnmount)(() => {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => [props.show, props.placement], updateLocation);
    useClickAway(wrapperRef, onClickAway, {
      eventName: 'touchstart'
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.Fragment, null, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
      "ref": wrapperRef,
      "class": Popover_bem('wrapper'),
      "onClick": onClickWrapper
    }, [slots.reference == null ? void 0 : slots.reference()]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup_Popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
      "ref": popoverRef,
      "class": Popover_bem([props.theme]),
      "position": '',
      "transition": "van-popover-zoom",
      "lockScroll": false,
      "onTouchstart": onTouchstart
    }, attrs, pick(props, popupProps), {
      'onUpdate:show': updateShow
    }), {
      default: () => [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Popover_bem('arrow')
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "menu",
        "class": Popover_bem('content')
      }, [slots.default ? slots.default() : props.actions.map(renderAction)])]
    })]);
  }

}));
;// CONCATENATED MODULE: ./es/popover/index.js


var popover_Popover = withInstall(Popover);
/* harmony default export */ var popover = ((/* unused pure expression or super */ null && (popover_Popover)));

;// CONCATENATED MODULE: ./es/progress/Progress.js




var [Progress_name, Progress_bem] = createNamespace('progress');
/* harmony default export */ var Progress = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Progress_name,
  props: {
    color: String,
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    showPivot: truthProp,
    pivotColor: String,
    trackColor: String,
    strokeWidth: [Number, String],
    percentage: {
      type: [Number, String],
      required: true,
      validator: value => value >= 0 && value <= 100
    }
  },

  setup(props) {
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var pivotRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      rootWidth: 0,
      pivotWidth: 0
    });
    var background = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => props.inactive ? '#cacaca' : props.color);

    var resize = () => {
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        state.rootWidth = root.value ? root.value.offsetWidth : 0;
        state.pivotWidth = pivotRef.value ? pivotRef.value.offsetWidth : 0;
      });
    };

    var renderPivot = () => {
      var {
        rootWidth,
        pivotWidth
      } = state;
      var {
        textColor,
        pivotText,
        pivotColor,
        percentage
      } = props;
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
          "class": Progress_bem('pivot')
        }, [text]);
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => [props.showPivot, props.pivotText], resize);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.onMounted)(resize);
    useExpose({
      resize
    });
    return () => {
      var {
        trackColor,
        percentage,
        strokeWidth
      } = props;
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
        "class": Progress_bem(),
        "style": rootStyle
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": Progress_bem('portion'),
        "style": portionStyle
      }, [renderPivot()])]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/progress/index.js


var progress_Progress = withInstall(Progress);
/* harmony default export */ var progress = ((/* unused pure expression or super */ null && (progress_Progress)));

;// CONCATENATED MODULE: ./es/pull-refresh/PullRefresh.js

 // Utils

 // Composables


 // Components


var [PullRefresh_name, PullRefresh_bem, PullRefresh_t] = createNamespace('pull-refresh');
var DEFAULT_HEAD_HEIGHT = 50;
var TEXT_STATUS = ['pulling', 'loosing', 'success'];
/* harmony default export */ var PullRefresh = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: PullRefresh_name,
  props: {
    disabled: Boolean,
    successText: String,
    pullingText: String,
    loosingText: String,
    loadingText: String,
    pullDistance: [Number, String],
    modelValue: {
      type: Boolean,
      default: false
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

  setup(props, {
    emit,
    slots
  }) {
    var reachTop;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var scrollParent = useScrollParent(root);
    var state = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.reactive)({
      status: 'normal',
      distance: 0,
      duration: 0
    });
    var touch = useTouch();

    var getHeadStyle = () => {
      if (props.headHeight !== DEFAULT_HEAD_HEIGHT) {
        return {
          height: props.headHeight + "px"
        };
      }
    };

    var isTouchable = () => state.status !== 'loading' && state.status !== 'success' && !props.disabled;

    var ease = distance => {
      var pullDistance = +(props.pullDistance || props.headHeight);

      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2;
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
        }
      }

      return Math.round(distance);
    };

    var setStatus = (distance, isLoading) => {
      var pullDistance = +(props.pullDistance || props.headHeight);
      state.distance = distance;

      if (isLoading) {
        state.status = 'loading';
      } else if (distance === 0) {
        state.status = 'normal';
      } else if (distance < pullDistance) {
        state.status = 'pulling';
      } else {
        state.status = 'loosing';
      }
    };

    var getStatusText = () => {
      var {
        status
      } = state;

      if (status === 'normal') {
        return '';
      }

      return props[status + "Text"] || PullRefresh_t(status);
    };

    var renderStatus = () => {
      var {
        status,
        distance
      } = state;

      if (slots[status]) {
        return slots[status]({
          distance
        });
      }

      var nodes = [];

      if (TEXT_STATUS.includes(status)) {
        nodes.push((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": PullRefresh_bem('text')
        }, [getStatusText()]));
      }

      if (status === 'loading') {
        nodes.push((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(loading_Loading, {
          "class": PullRefresh_bem('loading')
        }, {
          default: () => [getStatusText()]
        }));
      }

      return nodes;
    };

    var showSuccessTip = () => {
      state.status = 'success';
      setTimeout(() => {
        setStatus(0);
      }, +props.successDuration);
    };

    var checkPosition = event => {
      reachTop = getScrollTop(scrollParent.value) === 0;

      if (reachTop) {
        state.duration = 0;
        touch.start(event);
      }
    };

    var onTouchStart = event => {
      if (isTouchable()) {
        checkPosition(event);
      }
    };

    var onTouchMove = event => {
      if (isTouchable()) {
        if (!reachTop) {
          checkPosition(event);
        }

        var {
          deltaY
        } = touch;
        touch.move(event);

        if (reachTop && deltaY.value >= 0 && touch.isVertical()) {
          preventDefault(event);
          setStatus(ease(deltaY.value));
        }
      }
    };

    var onTouchEnd = () => {
      if (reachTop && touch.deltaY.value && isTouchable()) {
        state.duration = +props.animationDuration;

        if (state.status === 'loosing') {
          setStatus(+props.headHeight, true);
          emit('update:modelValue', true); // ensure value change can be watched

          (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => emit('refresh'));
        } else {
          setStatus(0);
        }
      }
    };

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.modelValue, value => {
      state.duration = +props.animationDuration;

      if (value) {
        setStatus(+props.headHeight, true);
      } else if (slots.success || props.successText) {
        showSuccessTip();
      } else {
        setStatus(0, false);
      }
    });
    return () => {
      var trackStyle = {
        transitionDuration: state.duration + "ms",
        transform: state.distance ? "translate3d(0," + state.distance + "px, 0)" : ''
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "class": PullRefresh_bem()
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": PullRefresh_bem('track'),
        "style": trackStyle,
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": PullRefresh_bem('head'),
        "style": getHeadStyle()
      }, [renderStatus()]), slots.default == null ? void 0 : slots.default()])]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/pull-refresh/index.js


var pull_refresh_PullRefresh = withInstall(PullRefresh);
/* harmony default export */ var pull_refresh = ((/* unused pure expression or super */ null && (pull_refresh_PullRefresh)));

;// CONCATENATED MODULE: ./es/rate/Rate.js

 // Utils

 // Composables



 // Components


var [Rate_name, Rate_bem] = createNamespace('rate');

function getRateStatus(value, index, allowHalf, readonly) {
  if (value >= index) {
    return {
      status: 'full',
      value: 1
    };
  }

  if (value + 0.5 >= index && allowHalf && !readonly) {
    return {
      status: 'half',
      value: 0.5
    };
  }

  if (value + 1 >= index && allowHalf && readonly) {
    var cardinal = Math.pow(10, 10);
    return {
      status: 'half',
      value: Math.round((value - index + 1) * cardinal) / cardinal
    };
  }

  return {
    status: 'void',
    value: 0
  };
}

/* harmony default export */ var Rate = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Rate_name,
  props: {
    size: [Number, String],
    color: String,
    gutter: [Number, String],
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    voidColor: String,
    touchable: truthProp,
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
    }
  },
  emits: ['change', 'update:modelValue'],

  setup(props, {
    emit
  }) {
    var touch = useTouch();
    var [itemRefs, setItemRefs] = useRefs();

    var untouchable = () => props.readonly || props.disabled || !props.touchable;

    var list = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => Array(props.count).fill('').map((_, i) => getRateStatus(props.modelValue, i + 1, props.allowHalf, props.readonly)));
    var ranges;

    var updateRanges = () => {
      var rects = itemRefs.value.map(item => item.getBoundingClientRect());
      ranges = [];
      rects.forEach((rect, index) => {
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

    var getScoreByPosition = x => {
      for (var i = ranges.length - 1; i > 0; i--) {
        if (x > ranges[i].left) {
          return ranges[i].score;
        }
      }

      return props.allowHalf ? 0.5 : 1;
    };

    var select = index => {
      if (!props.disabled && !props.readonly && index !== props.modelValue) {
        emit('update:modelValue', index);
        emit('change', index);
      }
    };

    var onTouchStart = event => {
      if (untouchable()) {
        return;
      }

      touch.start(event);
      updateRanges();
    };

    var onTouchMove = event => {
      if (untouchable()) {
        return;
      }

      touch.move(event);

      if (touch.isHorizontal()) {
        var {
          clientX
        } = event.touches[0];
        preventDefault(event);
        select(getScoreByPosition(clientX));
      }
    };

    var renderStar = (item, index) => {
      var {
        icon,
        size,
        color,
        count,
        gutter,
        voidIcon,
        disabled,
        voidColor,
        allowHalf,
        iconPrefix,
        disabledColor
      } = props;
      var score = index + 1;
      var isFull = item.status === 'full';
      var isVoid = item.status === 'void';
      var renderHalf = allowHalf && item.value > 0 && item.value < 1;
      var style;

      if (gutter && score !== +count) {
        style = {
          paddingRight: addUnit(gutter)
        };
      }

      var onClickItem = event => {
        updateRanges();
        select(allowHalf ? getScoreByPosition(event.clientX) : score);
      };

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "key": index,
        "ref": setItemRefs(index),
        "role": "radio",
        "style": style,
        "class": Rate_bem('item'),
        "tabindex": 0,
        "aria-setsize": +count,
        "aria-posinset": score,
        "aria-checked": !isVoid,
        "onClick": onClickItem
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "size": size,
        "name": isFull ? icon : voidIcon,
        "class": Rate_bem('icon', {
          disabled,
          full: isFull
        }),
        "color": disabled ? disabledColor : isFull ? color : voidColor,
        "classPrefix": iconPrefix
      }, null), renderHalf && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "size": size,
        "style": {
          width: item.value + 'em'
        },
        "name": isVoid ? voidIcon : icon,
        "class": Rate_bem('icon', ['half', {
          disabled,
          full: !isVoid
        }]),
        "color": disabled ? disabledColor : isVoid ? voidColor : color,
        "classPrefix": iconPrefix
      }, null)]);
    };

    useLinkField(() => props.modelValue);
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "role": "radiogroup",
      "class": Rate_bem({
        readonly: props.readonly,
        disabled: props.disabled
      }),
      "tabindex": 0,
      "onTouchstart": onTouchStart,
      "onTouchmove": onTouchMove
    }, [list.value.map(renderStar)]);
  }

}));
;// CONCATENATED MODULE: ./es/rate/index.js


var rate_Rate = withInstall(Rate);
/* harmony default export */ var rate = ((/* unused pure expression or super */ null && (rate_Rate)));

;// CONCATENATED MODULE: ./es/row/index.js


var row_Row = withInstall(Row);
/* harmony default export */ var row = ((/* unused pure expression or super */ null && (row_Row)));

;// CONCATENATED MODULE: ./es/search/Search.js

 // Utils


 // Composables

 // Components


var [Search_name, Search_bem, Search_t] = createNamespace('search');
/* harmony default export */ var Search = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Search_name,
  props: extend({}, fieldProps, {
    label: String,
    clearable: truthProp,
    actionText: String,
    background: String,
    showAction: Boolean,
    shape: {
      type: String,
      default: 'square'
    },
    leftIcon: {
      type: String,
      default: 'search'
    }
  }),
  emits: ['search', 'cancel', 'update:modelValue'],

  setup(props, {
    emit,
    slots,
    attrs
  }) {
    var filedRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var onCancel = () => {
      if (!slots.action) {
        emit('update:modelValue', '');
        emit('cancel');
      }
    };

    var onKeypress = event => {
      var ENTER_CODE = 13;

      if (event.keyCode === ENTER_CODE) {
        preventDefault(event);
        emit('search', props.modelValue);
      }
    };

    var renderLabel = () => {
      if (slots.label || props.label) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Search_bem('label')
        }, [slots.label ? slots.label() : props.label]);
      }
    };

    var renderAction = () => {
      if (props.showAction) {
        var text = props.actionText || Search_t('cancel');
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Search_bem('action'),
          "role": "button",
          "tabindex": 0,
          "onClick": onCancel
        }, [slots.action ? slots.action() : text]);
      }
    };

    var blur = () => {
      var _filedRef$value;

      return (_filedRef$value = filedRef.value) == null ? void 0 : _filedRef$value.blur();
    };

    var focus = () => {
      var _filedRef$value2;

      return (_filedRef$value2 = filedRef.value) == null ? void 0 : _filedRef$value2.focus();
    };

    var fieldPropNames = Object.keys(fieldProps);

    var renderField = () => {
      var fieldAttrs = extend({}, attrs, pick(props, fieldPropNames));

      var onInput = value => emit('update:modelValue', value);

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(field_Field, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "ref": filedRef,
        "type": "search",
        "border": false,
        "onKeypress": onKeypress
      }, fieldAttrs, {
        'onUpdate:modelValue': onInput
      }), pick(slots, ['left-icon', 'right-icon']));
    };

    useExpose({
      focus,
      blur
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Search_bem({
        'show-action': props.showAction
      }),
      "style": {
        background: props.background
      }
    }, [slots.left == null ? void 0 : slots.left(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Search_bem('content', props.shape)
    }, [renderLabel(), renderField()]), renderAction()]);
  }

}));
;// CONCATENATED MODULE: ./es/search/index.js


var search_Search = withInstall(Search);
/* harmony default export */ var search = ((/* unused pure expression or super */ null && (search_Search)));

;// CONCATENATED MODULE: ./es/share-sheet/ShareSheet.js

 // Utils


 // Components


var PRESET_ICONS = ['qq', 'link', 'weibo', 'wechat', 'poster', 'qrcode', 'weapp-qrcode', 'wechat-moments'];
var ShareSheet_popupKeys = [...popupSharedPropKeys, 'closeOnPopstate', 'safeAreaInsetBottom'];

function getIconURL(icon) {
  if (PRESET_ICONS.includes(icon)) {
    return "https://img.yzcdn.cn/vant/share-sheet-" + icon + ".png";
  }

  return icon;
}

var [ShareSheet_name, ShareSheet_bem, ShareSheet_t] = createNamespace('share-sheet');
/* harmony default export */ var ShareSheet = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: ShareSheet_name,
  props: extend({}, popupSharedProps, {
    title: String,
    cancelText: String,
    description: String,
    closeOnPopstate: truthProp,
    safeAreaInsetBottom: truthProp,
    options: {
      type: Array,
      default: () => []
    }
  }),
  emits: ['cancel', 'select', 'update:show'],

  setup(props, {
    emit,
    slots
  }) {
    var updateShow = value => emit('update:show', value);

    var onCancel = () => {
      updateShow(false);
      emit('cancel');
    };

    var onSelect = (option, index) => emit('select', option, index);

    var renderHeader = () => {
      var title = slots.title ? slots.title() : props.title;
      var description = slots.description ? slots.description() : props.description;

      if (title || description) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": ShareSheet_bem('header')
        }, [title && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("h2", {
          "class": ShareSheet_bem('title')
        }, [title]), description && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": ShareSheet_bem('description')
        }, [description])]);
      }
    };

    var renderOption = (option, index) => {
      var {
        name,
        icon,
        className,
        description
      } = option;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "button",
        "tabindex": 0,
        "class": [ShareSheet_bem('option'), className],
        "onClick": () => onSelect(option, index)
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("img", {
        "src": getIconURL(icon),
        "class": ShareSheet_bem('icon')
      }, null), name && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": ShareSheet_bem('name')
      }, [name]), description && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": ShareSheet_bem('option-description')
      }, [description])]);
    };

    var renderOptions = (options, border) => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": ShareSheet_bem('options', {
        border
      })
    }, [options.map(renderOption)]);

    var renderRows = () => {
      var {
        options
      } = props;

      if (Array.isArray(options[0])) {
        return options.map((item, index) => renderOptions(item, index !== 0));
      }

      return renderOptions(options);
    };

    var renderCancelButton = () => {
      var _props$cancelText;

      var cancelText = (_props$cancelText = props.cancelText) != null ? _props$cancelText : ShareSheet_t('cancel');

      if (slots.cancel || cancelText) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", {
          "type": "button",
          "class": ShareSheet_bem('cancel'),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : cancelText]);
      }
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(popup_Popup, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
      "round": true,
      "class": ShareSheet_bem(),
      "position": "bottom"
    }, pick(props, ShareSheet_popupKeys), {
      'onUpdate:show': updateShow
    }), {
      default: () => [renderHeader(), renderRows(), renderCancelButton()]
    });
  }

}));
;// CONCATENATED MODULE: ./es/share-sheet/index.js


var share_sheet_ShareSheet = withInstall(ShareSheet);
/* harmony default export */ var share_sheet = ((/* unused pure expression or super */ null && (share_sheet_ShareSheet)));

;// CONCATENATED MODULE: ./es/sidebar/Sidebar.js




var [Sidebar_name, Sidebar_bem] = createNamespace('sidebar');
var SIDEBAR_KEY = Symbol(Sidebar_name);
/* harmony default export */ var Sidebar = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Sidebar_name,
  props: {
    modelValue: {
      type: [Number, String],
      default: 0
    }
  },
  emits: ['change', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var {
      linkChildren
    } = useChildren(SIDEBAR_KEY);

    var getActive = () => +props.modelValue;

    var setActive = value => {
      if (value !== getActive()) {
        emit('update:modelValue', value);
        emit('change', value);
      }
    };

    linkChildren({
      getActive,
      setActive
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Sidebar_bem()
    }, [slots.default == null ? void 0 : slots.default()]);
  }

}));
;// CONCATENATED MODULE: ./es/sidebar/index.js


var sidebar_Sidebar = withInstall(Sidebar);
/* harmony default export */ var sidebar = ((/* unused pure expression or super */ null && (sidebar_Sidebar)));

;// CONCATENATED MODULE: ./es/sidebar-item/SidebarItem.js

 // Utils


 // Composables


 // Components


var [SidebarItem_name, SidebarItem_bem] = createNamespace('sidebar-item');
/* harmony default export */ var SidebarItem = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: SidebarItem_name,
  props: extend({}, routeProps, {
    dot: Boolean,
    title: String,
    badge: [Number, String],
    disabled: Boolean
  }),
  emits: ['click'],

  setup(props, {
    emit,
    slots
  }) {
    var route = useRoute();
    var {
      parent,
      index
    } = useParent(SIDEBAR_KEY);

    if (!parent) {
      if (false) {}

      return;
    }

    var onClick = () => {
      if (props.disabled) {
        return;
      }

      emit('click', index.value);
      parent.setActive(index.value);
      route();
    };

    return () => {
      var {
        dot,
        badge,
        title,
        disabled
      } = props;
      var selected = index.value === parent.getActive();
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("a", {
        "class": SidebarItem_bem({
          select: selected,
          disabled
        }),
        "onClick": onClick
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(badge_Badge, {
        "dot": dot,
        "content": badge,
        "class": SidebarItem_bem('text')
      }, {
        default: () => [slots.title ? slots.title() : title]
      })]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/sidebar-item/index.js


var sidebar_item_SidebarItem = withInstall(SidebarItem);
/* harmony default export */ var sidebar_item = ((/* unused pure expression or super */ null && (sidebar_item_SidebarItem)));

;// CONCATENATED MODULE: ./es/skeleton/Skeleton.js



var [Skeleton_name, Skeleton_bem] = createNamespace('skeleton');
var DEFAULT_ROW_WIDTH = '100%';
var DEFAULT_LAST_ROW_WIDTH = '60%';
/* harmony default export */ var Skeleton = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Skeleton_name,
  props: {
    title: Boolean,
    round: Boolean,
    avatar: Boolean,
    loading: truthProp,
    animate: truthProp,
    avatarSize: [Number, String],
    titleWidth: [Number, String],
    row: {
      type: [Number, String],
      default: 0
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

  setup(props, {
    slots
  }) {
    var renderAvatar = () => {
      if (props.avatar) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": Skeleton_bem('avatar', props.avatarShape),
          "style": getSizeStyle(props.avatarSize)
        }, null);
      }
    };

    var renderTitle = () => {
      if (props.title) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("h3", {
          "class": Skeleton_bem('title'),
          "style": {
            width: addUnit(props.titleWidth)
          }
        }, null);
      }
    };

    var getRowWidth = index => {
      var {
        rowWidth
      } = props;

      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }

      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }

      return rowWidth;
    };

    var renderRows = () => Array(props.row).fill('').map((_, i) => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Skeleton_bem('row'),
      "style": {
        width: addUnit(getRowWidth(i))
      }
    }, null));

    return () => {
      if (!props.loading) {
        return slots.default == null ? void 0 : slots.default();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Skeleton_bem({
          animate: props.animate,
          round: props.round
        })
      }, [renderAvatar(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Skeleton_bem('content')
      }, [renderTitle(), renderRows()])]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/skeleton/index.js


var skeleton_Skeleton = withInstall(Skeleton);
/* harmony default export */ var skeleton = ((/* unused pure expression or super */ null && (skeleton_Skeleton)));

;// CONCATENATED MODULE: ./es/slider/Slider.js

 // Utils

 // Composables




var [Slider_name, Slider_bem] = createNamespace('slider');
/* harmony default export */ var Slider = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Slider_name,
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

  setup(props, {
    emit,
    slots
  }) {
    var buttonIndex;
    var startValue;
    var currentValue;
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var dragStatus = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var touch = useTouch();
    var scope = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => Number(props.max) - Number(props.min));
    var wrapperStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var crossAxis = props.vertical ? 'width' : 'height';
      return {
        background: props.inactiveColor,
        [crossAxis]: addUnit(props.barHeight)
      };
    });

    var isRange = val => !!props.range && Array.isArray(val); // 计算选中条的长度百分比


    var calcMainAxis = () => {
      var {
        modelValue,
        min
      } = props;

      if (isRange(modelValue)) {
        return (modelValue[1] - modelValue[0]) * 100 / scope.value + "%";
      }

      return (modelValue - Number(min)) * 100 / scope.value + "%";
    }; // 计算选中条的开始位置的偏移量


    var calcOffset = () => {
      var {
        modelValue,
        min
      } = props;

      if (isRange(modelValue)) {
        return (modelValue[0] - Number(min)) * 100 / scope.value + "%";
      }

      return '0%';
    };

    var barStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var mainAxis = props.vertical ? 'height' : 'width';
      return {
        [mainAxis]: calcMainAxis(),
        left: props.vertical ? undefined : calcOffset(),
        top: props.vertical ? calcOffset() : undefined,
        background: props.activeColor,
        transition: dragStatus.value ? 'none' : undefined
      };
    });

    var format = value => {
      var {
        min,
        max,
        step
      } = props;
      value = Math.max(+min, Math.min(value, +max));
      return Math.round(value / +step) * +step;
    };

    var isSameValue = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue); // 处理两个滑块重叠之后的情况


    var handleOverlap = value => {
      if (value[0] > value[1]) {
        return value.slice(0).reverse();
      }

      return value;
    };

    var updateValue = (value, end) => {
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

    var onClick = event => {
      event.stopPropagation();

      if (props.disabled || props.readonly) {
        return;
      }

      var {
        min,
        vertical,
        modelValue
      } = props;
      var rect = useRect(root);
      var delta = vertical ? event.clientY - rect.top : event.clientX - rect.left;
      var total = vertical ? rect.height : rect.width;
      var value = Number(min) + delta / total * scope.value;

      if (isRange(modelValue)) {
        var [left, right] = modelValue;
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

    var onTouchStart = event => {
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

    var onTouchMove = event => {
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

    var onTouchEnd = () => {
      if (props.disabled || props.readonly) {
        return;
      }

      if (dragStatus.value === 'draging') {
        updateValue(currentValue, true);
        emit('drag-end');
      }

      dragStatus.value = '';
    };

    var renderButton = index => {
      var getClassName = () => {
        if (typeof index === 'number') {
          var position = ['left', 'right'];
          return "button-wrapper-" + position[index];
        }

        return "button-wrapper";
      };

      var currentValue = typeof index === 'number' ? props.modelValue[index] : props.modelValue;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "role": "slider",
        "class": Slider_bem(getClassName()),
        "tabindex": props.disabled || props.readonly ? -1 : 0,
        "aria-valuemin": +props.min,
        "aria-valuenow": currentValue,
        "aria-valuemax": +props.max,
        "aria-orientation": props.vertical ? 'vertical' : 'horizontal',
        "onTouchstart": e => {
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
        "class": Slider_bem('button'),
        "style": getSizeStyle(props.buttonSize)
      }, null)]);
    }; // format initial value


    updateValue(props.modelValue);
    useLinkField(() => props.modelValue);
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "ref": root,
      "style": wrapperStyle.value,
      "class": Slider_bem({
        vertical: props.vertical,
        disabled: props.disabled
      }),
      "onClick": onClick
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Slider_bem('bar'),
      "style": barStyle.value
    }, [props.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
  }

}));
;// CONCATENATED MODULE: ./es/slider/index.js


var slider_Slider = withInstall(Slider);
/* harmony default export */ var slider = ((/* unused pure expression or super */ null && (slider_Slider)));

;// CONCATENATED MODULE: ./es/steps/Steps.js




var [Steps_name, Steps_bem] = createNamespace('steps');
var STEPS_KEY = Symbol(Steps_name);
var Steps_props = {
  iconPrefix: String,
  finishIcon: String,
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
};
/* harmony default export */ var Steps = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Steps_name,
  props: Steps_props,
  emits: ['click-step'],

  setup(props, {
    emit,
    slots
  }) {
    var {
      linkChildren
    } = useChildren(STEPS_KEY);

    var onClickStep = index => emit('click-step', index);

    linkChildren({
      props,
      onClickStep
    });
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Steps_bem([props.direction])
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Steps_bem('items')
    }, [slots.default == null ? void 0 : slots.default()])]);
  }

}));
;// CONCATENATED MODULE: ./es/step/Step.js

 // Utils



 // Composables

 // Components


var [Step_name, Step_bem] = createNamespace('step');
/* harmony default export */ var Step = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Step_name,

  setup(props, {
    slots
  }) {
    var {
      parent,
      index
    } = useParent(STEPS_KEY);

    if (!parent) {
      if (false) {}

      return;
    }

    var parentProps = parent.props;

    var getStatus = () => {
      var active = +parentProps.active;

      if (index.value < active) {
        return 'finish';
      }

      return index.value === active ? 'process' : 'waiting';
    };

    var isActive = () => getStatus() === 'process';

    var lineStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => ({
      background: getStatus() === 'finish' ? parentProps.activeColor : parentProps.inactiveColor
    }));
    var titleStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
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

    var onClickStep = () => parent.onClickStep(index.value);

    var renderCircle = () => {
      var {
        iconPrefix,
        finishIcon,
        activeIcon,
        activeColor,
        inactiveIcon
      } = parentProps;

      if (isActive()) {
        if (slots['active-icon']) {
          return slots['active-icon']();
        }

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "class": Step_bem('icon', 'active'),
          "name": activeIcon,
          "color": activeColor,
          "classPrefix": iconPrefix
        }, null);
      }

      if (getStatus() === 'finish' && (finishIcon || slots['finish-icon'])) {
        if (slots['finish-icon']) {
          return slots['finish-icon']();
        }

        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "class": Step_bem('icon', 'finish'),
          "name": finishIcon,
          "color": activeColor,
          "classPrefix": iconPrefix
        }, null);
      }

      if (slots['inactive-icon']) {
        return slots['inactive-icon']();
      }

      if (inactiveIcon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "class": Step_bem('icon'),
          "name": inactiveIcon,
          "classPrefix": iconPrefix
        }, null);
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("i", {
        "class": Step_bem('circle'),
        "style": lineStyle.value
      }, null);
    };

    return () => {
      var status = getStatus();
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [BORDER, Step_bem([parentProps.direction, {
          [status]: status
        }])]
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Step_bem('title', {
          active: isActive()
        }),
        "style": titleStyle.value,
        "onClick": onClickStep
      }, [slots.default == null ? void 0 : slots.default()]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Step_bem('circle-container'),
        "onClick": onClickStep
      }, [renderCircle()]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": Step_bem('line'),
        "style": lineStyle.value
      }, null)]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/step/index.js


var step_Step = withInstall(Step);
/* harmony default export */ var step = ((/* unused pure expression or super */ null && (step_Step)));

;// CONCATENATED MODULE: ./es/stepper/Stepper.js

 // Utils

 // Composables



var [Stepper_name, Stepper_bem] = createNamespace('stepper');
var LONG_PRESS_INTERVAL = 200;
var LONG_PRESS_START_TIME = 600;

function equal(value1, value2) {
  return String(value1) === String(value2);
} // add num and avoid float number


function add(num1, num2) {
  var cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

/* harmony default export */ var Stepper = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Stepper_name,
  props: {
    theme: String,
    integer: Boolean,
    disabled: Boolean,
    showPlus: truthProp,
    showMinus: truthProp,
    showInput: truthProp,
    longPress: truthProp,
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
    }
  },
  emits: ['plus', 'blur', 'minus', 'focus', 'change', 'overlimit', 'update:modelValue'],

  setup(props, {
    emit
  }) {
    var format = value => {
      var {
        min,
        max,
        allowEmpty,
        decimalLength
      } = props;

      if (allowEmpty && value === '') {
        return value;
      }

      value = formatNumber(String(value), !props.integer);
      value = value === '' ? 0 : +value;
      value = Number.isNaN(value) ? +min : value;
      value = Math.max(Math.min(+max, value), +min); // format decimal

      if (isDef(decimalLength)) {
        value = value.toFixed(+decimalLength);
      }

      return value;
    };

    var getInitialValue = () => {
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
    var minusDisabled = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => props.disabled || props.disableMinus || current.value <= +props.min);
    var plusDisabled = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => props.disabled || props.disablePlus || current.value >= +props.max);
    var inputStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => ({
      width: addUnit(props.inputWidth),
      height: addUnit(props.buttonSize)
    }));
    var buttonStyle = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => getSizeStyle(props.buttonSize));

    var check = () => {
      var value = format(current.value);

      if (!equal(value, current.value)) {
        current.value = value;
      }
    };

    var setValue = value => {
      if (props.beforeChange) {
        callInterceptor({
          args: [value],
          interceptor: props.beforeChange,

          done() {
            current.value = value;
          }

        });
      } else {
        current.value = value;
      }
    };

    var onChange = () => {
      if (actionType === 'plus' && plusDisabled.value || actionType === 'minus' && minusDisabled.value) {
        emit('overlimit', actionType);
        return;
      }

      var diff = actionType === 'minus' ? -props.step : +props.step;
      var value = format(add(+current.value, diff));
      setValue(value);
      emit(actionType);
    };

    var onInput = event => {
      var input = event.target;
      var {
        value
      } = input;
      var {
        decimalLength
      } = props;
      var formatted = formatNumber(String(value), !props.integer); // limit max decimal length

      if (isDef(decimalLength) && formatted.includes('.')) {
        var pair = formatted.split('.');
        formatted = pair[0] + "." + pair[1].slice(0, +decimalLength);
      }

      if (props.beforeChange) {
        input.value = String(current.value);
      } else if (!equal(value, formatted)) {
        input.value = formatted;
      } // prefer number type


      var isNumeric = formatted === String(+formatted);
      setValue(isNumeric ? +formatted : formatted);
    };

    var onFocus = event => {
      // readonly not work in legacy mobile safari
      if (props.disableInput) {
        var _inputRef$value;

        (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.blur();
      } else {
        emit('focus', event);
      }
    };

    var onBlur = event => {
      var input = event.target;
      var value = format(input.value);
      input.value = String(value);
      current.value = value;
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        emit('blur', event);
        resetScroll();
      });
    };

    var isLongPress;
    var longPressTimer;

    var longPressStep = () => {
      longPressTimer = setTimeout(() => {
        onChange();
        longPressStep();
      }, LONG_PRESS_INTERVAL);
    };

    var onTouchStart = () => {
      if (props.longPress) {
        isLongPress = false;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(() => {
          isLongPress = true;
          onChange();
          longPressStep();
        }, LONG_PRESS_START_TIME);
      }
    };

    var onTouchEnd = event => {
      if (props.longPress) {
        clearTimeout(longPressTimer);

        if (isLongPress) {
          preventDefault(event);
        }
      }
    };

    var onMousedown = event => {
      // fix mobile safari page scroll down issue
      // see: https://github.com/youzan/vant/issues/7690
      if (props.disableInput) {
        event.preventDefault();
      }
    };

    var createListeners = type => ({
      onClick: event => {
        // disable double tap scrolling on mobile safari
        event.preventDefault();
        actionType = type;
        onChange();
      },
      onTouchstart: () => {
        actionType = type;
        onTouchStart();
      },
      onTouchend: onTouchEnd,
      onTouchcancel: onTouchEnd
    });

    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)([() => props.max, () => props.min, () => props.integer, () => props.decimalLength], check);
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(() => props.modelValue, value => {
      if (!equal(value, current.value)) {
        current.value = format(value);
      }
    });
    (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.watch)(current, value => {
      emit('update:modelValue', value);
      emit('change', value, {
        name: props.name
      });
    });
    useLinkField(() => props.modelValue);
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": Stepper_bem([props.theme])
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("button", (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
      "type": "button",
      "style": buttonStyle.value,
      "class": Stepper_bem('minus', {
        disabled: minusDisabled.value
      })
    }, createListeners('minus')), null), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.showMinus]]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.withDirectives)((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("input", {
      "ref": inputRef,
      "type": props.integer ? 'tel' : 'text',
      "role": "spinbutton",
      "class": Stepper_bem('input'),
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
      "class": Stepper_bem('plus', {
        disabled: plusDisabled.value
      })
    }, createListeners('plus')), null), [[external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.vShow, props.showPlus]])]);
  }

}));
;// CONCATENATED MODULE: ./es/stepper/index.js


var stepper_Stepper = withInstall(Stepper);
/* harmony default export */ var stepper = ((/* unused pure expression or super */ null && (stepper_Stepper)));

;// CONCATENATED MODULE: ./es/steps/index.js


var steps_Steps = withInstall(Steps);
/* harmony default export */ var steps = ((/* unused pure expression or super */ null && (steps_Steps)));

;// CONCATENATED MODULE: ./es/submit-bar/SubmitBar.js


 // Components



var [SubmitBar_name, SubmitBar_bem, SubmitBar_t] = createNamespace('submit-bar');
/* harmony default export */ var SubmitBar = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: SubmitBar_name,
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
    safeAreaInsetBottom: truthProp,
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

  setup(props, {
    emit,
    slots
  }) {
    var renderText = () => {
      var {
        price,
        label,
        currency,
        textAlign,
        suffixLabel,
        decimalLength
      } = props;

      if (typeof price === 'number') {
        var pricePair = (price / 100).toFixed(+decimalLength).split('.');
        var decimal = decimalLength ? "." + pricePair[1] : '';
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": SubmitBar_bem('text'),
          "style": {
            textAlign
          }
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", null, [label || SubmitBar_t('label')]), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": SubmitBar_bem('price')
        }, [currency, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": SubmitBar_bem('price-integer')
        }, [pricePair[0]]), decimal]), suffixLabel && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": SubmitBar_bem('suffix-label')
        }, [suffixLabel])]);
      }
    };

    var renderTip = () => {
      var {
        tip,
        tipIcon
      } = props;

      if (slots.tip || tip) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": SubmitBar_bem('tip')
        }, [tipIcon && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "class": SubmitBar_bem('tip-icon'),
          "name": tipIcon
        }, null), tip && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
          "class": SubmitBar_bem('tip-text')
        }, [tip]), slots.tip == null ? void 0 : slots.tip()]);
      }
    };

    var onClickButton = () => emit('submit');

    var renderButton = () => {
      if (slots.button) {
        return slots.button();
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(button_Button, {
        "round": true,
        "type": props.buttonType,
        "text": props.buttonText,
        "class": SubmitBar_bem('button', props.buttonType),
        "color": props.buttonColor,
        "loading": props.loading,
        "disabled": props.disabled,
        "onClick": onClickButton
      }, null);
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": SubmitBar_bem({
        unfit: !props.safeAreaInsetBottom
      })
    }, [slots.top == null ? void 0 : slots.top(), renderTip(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": SubmitBar_bem('bar')
    }, [slots.default == null ? void 0 : slots.default(), renderText(), renderButton()])]);
  }

}));
;// CONCATENATED MODULE: ./es/submit-bar/index.js


var submit_bar_SubmitBar = withInstall(SubmitBar);
/* harmony default export */ var submit_bar = ((/* unused pure expression or super */ null && (submit_bar_SubmitBar)));

;// CONCATENATED MODULE: ./es/swipe-cell/SwipeCell.js

 // Utils


 // Composables




var [SwipeCell_name, SwipeCell_bem] = createNamespace('swipe-cell');
/* harmony default export */ var SwipeCell = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: SwipeCell_name,
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

  setup(props, {
    emit,
    slots
  }) {
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

    var getWidthByRef = ref => ref.value ? useRect(ref).width : 0;

    var leftWidth = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => isDef(props.leftWidth) ? +props.leftWidth : getWidthByRef(leftRef));
    var rightWidth = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => isDef(props.rightWidth) ? +props.rightWidth : getWidthByRef(rightRef));

    var open = side => {
      opened = true;
      state.offset = side === 'left' ? leftWidth.value : -rightWidth.value;
      emit('open', {
        name: props.name,
        position: side
      });
    };

    var close = position => {
      state.offset = 0;

      if (opened) {
        opened = false;
        emit('close', {
          name: props.name,
          position
        });
      }
    };

    var toggle = side => {
      var offset = Math.abs(state.offset);
      var THRESHOLD = 0.15;
      var threshold = opened ? 1 - THRESHOLD : THRESHOLD;
      var width = side === 'left' ? leftWidth.value : rightWidth.value;

      if (width && offset > width * threshold) {
        open(side);
      } else {
        close(side);
      }
    };

    var onTouchStart = event => {
      if (!props.disabled) {
        startOffset = state.offset;
        touch.start(event);
      }
    };

    var onTouchMove = event => {
      if (props.disabled) {
        return;
      }

      var {
        deltaX
      } = touch;
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

    var onTouchEnd = () => {
      if (state.dragging) {
        state.dragging = false;
        toggle(state.offset > 0 ? 'left' : 'right'); // compatible with desktop scenario

        setTimeout(() => {
          lockClick = false;
        }, 0);
      }
    };

    var onClick = (position = 'outside') => {
      emit('click', position);

      if (opened && !lockClick) {
        callInterceptor({
          interceptor: props.beforeClose,
          args: [{
            name: props.name,
            position
          }],
          done: () => close(position)
        });
      }
    };

    var getClickHandler = (position, stop) => event => {
      if (stop) {
        event.stopPropagation();
      }

      onClick(position);
    };

    var renderSideContent = (side, ref) => {
      var contentSlot = slots[side];

      if (contentSlot) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "ref": ref,
          "class": SwipeCell_bem(side),
          "onClick": getClickHandler(side, true)
        }, [contentSlot()]);
      }
    };

    useExpose({
      open,
      close
    });
    useClickAway(root, () => onClick('outside'), {
      eventName: 'touchstart'
    });
    return () => {
      var wrapperStyle = {
        transform: "translate3d(" + state.offset + "px, 0, 0)",
        transitionDuration: state.dragging ? '0s' : '.6s'
      };
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "class": SwipeCell_bem(),
        "onClick": getClickHandler('cell'),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": SwipeCell_bem('wrapper'),
        "style": wrapperStyle
      }, [renderSideContent('left', leftRef), slots.default == null ? void 0 : slots.default(), renderSideContent('right', rightRef)])]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/swipe-cell/index.js


var swipe_cell_SwipeCell = withInstall(SwipeCell);
/* harmony default export */ var swipe_cell = ((/* unused pure expression or super */ null && (swipe_cell_SwipeCell)));

;// CONCATENATED MODULE: ./es/tabbar/Tabbar.js

 // Utils



 // Composables



var [Tabbar_name, Tabbar_bem] = createNamespace('tabbar');
var TABBAR_KEY = Symbol(Tabbar_name);
var Tabbar_props = {
  route: Boolean,
  fixed: truthProp,
  border: truthProp,
  zIndex: [Number, String],
  placeholder: Boolean,
  activeColor: String,
  beforeChange: Function,
  inactiveColor: String,
  modelValue: {
    type: [Number, String],
    default: 0
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: null
  }
};
/* harmony default export */ var Tabbar = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: Tabbar_name,
  props: Tabbar_props,
  emits: ['change', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var root = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();
    var {
      linkChildren
    } = useChildren(TABBAR_KEY);
    var renderPlaceholder = usePlaceholder(root, Tabbar_bem); // enable safe-area-inset-bottom by default when fixed

    var isUnfit = () => {
      var _props$safeAreaInsetB;

      return !((_props$safeAreaInsetB = props.safeAreaInsetBottom) != null ? _props$safeAreaInsetB : props.fixed);
    };

    var renderTabbar = () => {
      var {
        fixed,
        zIndex,
        border
      } = props;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "ref": root,
        "style": getZIndexStyle(zIndex),
        "class": [Tabbar_bem({
          unfit: isUnfit(),
          fixed
        }), {
          [BORDER_TOP_BOTTOM]: border
        }]
      }, [slots.default == null ? void 0 : slots.default()]);
    };

    var setActive = active => {
      if (active !== props.modelValue) {
        callInterceptor({
          interceptor: props.beforeChange,
          args: [active],

          done() {
            emit('update:modelValue', active);
            emit('change', active);
          }

        });
      }
    };

    linkChildren({
      props,
      setActive
    });
    return () => {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderTabbar);
      }

      return renderTabbar();
    };
  }

}));
;// CONCATENATED MODULE: ./es/tabbar/index.js


var tabbar_Tabbar = withInstall(Tabbar);
/* harmony default export */ var tabbar = ((/* unused pure expression or super */ null && (tabbar_Tabbar)));

;// CONCATENATED MODULE: ./es/tabbar-item/TabbarItem.js

 // Utils


 // Composables


 // Components



var [TabbarItem_name, TabbarItem_bem] = createNamespace('tabbar-item');
/* harmony default export */ var TabbarItem = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: TabbarItem_name,
  props: extend({}, routeProps, {
    dot: Boolean,
    icon: String,
    name: [Number, String],
    badge: [Number, String],
    iconPrefix: String
  }),
  emits: ['click'],

  setup(props, {
    emit,
    slots
  }) {
    var route = useRoute();
    var vm = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.getCurrentInstance)().proxy;
    var {
      parent,
      index
    } = useParent(TABBAR_KEY);

    if (!parent) {
      if (false) {}

      return;
    }

    var active = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.computed)(() => {
      var {
        route,
        modelValue
      } = parent.props;

      if (route && '$route' in vm) {
        var {
          $route
        } = vm;
        var {
          to
        } = props;
        var config = isObject(to) ? to : {
          path: to
        };
        var pathMatched = 'path' in config && config.path === $route.path;
        var nameMatched = 'name' in config && config.name === $route.name;
        return pathMatched || nameMatched;
      }

      return (props.name || index.value) === modelValue;
    });

    var onClick = event => {
      var _props$name;

      parent.setActive((_props$name = props.name) != null ? _props$name : index.value);
      emit('click', event);
      route();
    };

    var renderIcon = () => {
      if (slots.icon) {
        return slots.icon({
          active: active.value
        });
      }

      if (props.icon) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": props.icon,
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    return () => {
      var {
        dot,
        badge
      } = props;
      var {
        activeColor,
        inactiveColor
      } = parent.props;
      var color = active.value ? activeColor : inactiveColor;
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": TabbarItem_bem({
          active: active.value
        }),
        "style": {
          color
        },
        "onClick": onClick
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(badge_Badge, {
        "dot": dot,
        "content": badge,
        "class": TabbarItem_bem('icon')
      }, {
        default: () => [renderIcon()]
      }), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": TabbarItem_bem('text')
      }, [slots.default == null ? void 0 : slots.default({
        active: active.value
      })])]);
    };
  }

}));
;// CONCATENATED MODULE: ./es/tabbar-item/index.js


var tabbar_item_TabbarItem = withInstall(TabbarItem);
/* harmony default export */ var tabbar_item = ((/* unused pure expression or super */ null && (tabbar_item_TabbarItem)));

;// CONCATENATED MODULE: ./es/tree-select/TreeSelect.js

 // Utils

 // Components




var [TreeSelect_name, TreeSelect_bem] = createNamespace('tree-select');
/* harmony default export */ var TreeSelect = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: TreeSelect_name,
  props: {
    max: {
      type: [Number, String],
      default: Infinity
    },
    items: {
      type: Array,
      default: () => []
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

  setup(props, {
    emit,
    slots
  }) {
    var isActiveItem = id => {
      return Array.isArray(props.activeId) ? props.activeId.includes(id) : props.activeId === id;
    };

    var renderSubItem = item => {
      var onClick = () => {
        if (item.disabled) {
          return;
        }

        var activeId;

        if (Array.isArray(props.activeId)) {
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
        "class": ['van-ellipsis', TreeSelect_bem('item', {
          active: isActiveItem(item.id),
          disabled: item.disabled
        })],
        "onClick": onClick
      }, [item.text, isActiveItem(item.id) && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "name": props.selectedIcon,
        "class": TreeSelect_bem('selected')
      }, null)]);
    };

    var onSidebarChange = index => {
      emit('update:mainActiveIndex', index);
      emit('click-nav', index);
    };

    var renderSidebar = () => {
      var Items = props.items.map(item => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(sidebar_item_SidebarItem, {
        "dot": item.dot,
        "title": item.text,
        "badge": item.badge,
        "class": [TreeSelect_bem('nav-item'), item.className],
        "disabled": item.disabled
      }, null));
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(sidebar_Sidebar, {
        "class": TreeSelect_bem('nav'),
        "modelValue": props.mainActiveIndex,
        "onChange": onSidebarChange
      }, {
        default: () => [Items]
      });
    };

    var renderContent = () => {
      if (slots.content) {
        return slots.content();
      }

      var selected = props.items[+props.mainActiveIndex] || {};

      if (selected.children) {
        return selected.children.map(renderSubItem);
      }
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": TreeSelect_bem(),
      "style": {
        height: addUnit(props.height)
      }
    }, [renderSidebar(), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": TreeSelect_bem('content')
    }, [renderContent()])]);
  }

}));
;// CONCATENATED MODULE: ./es/tree-select/index.js


var tree_select_TreeSelect = withInstall(TreeSelect);
/* harmony default export */ var tree_select = ((/* unused pure expression or super */ null && (tree_select_TreeSelect)));

;// CONCATENATED MODULE: ./es/uploader/utils.js

var [uploader_utils_name, uploader_utils_bem] = createNamespace('uploader');

function toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  return [item];
}
function readFileContent(file, resultType) {
  return new Promise(resolve => {
    if (resultType === 'file') {
      resolve();
      return;
    }

    var reader = new FileReader();

    reader.onload = event => {
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
  return toArray(items).some(item => {
    if (item.file) {
      if (isFunction(maxSize)) {
        return maxSize(item.file);
      }

      return item.file.size > maxSize;
    }

    return false;
  });
}
function filterFiles(items, maxSize) {
  var valid = [];
  var invalid = [];
  items.forEach(item => {
    if (isOversize(item, maxSize)) {
      invalid.push(item);
    } else {
      valid.push(item);
    }
  });
  return {
    valid,
    invalid
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

  if (typeof item.content === 'string') {
    return item.content.indexOf('data:image') === 0;
  }

  return false;
}
;// CONCATENATED MODULE: ./es/uploader/UploaderPreviewItem.js

 // Utils



 // Components




/* harmony default export */ var UploaderPreviewItem = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  props: {
    name: [Number, String],
    index: Number,
    imageFit: String,
    lazyLoad: Boolean,
    deletable: Boolean,
    previewSize: [Number, String],
    beforeDelete: Function,
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['delete', 'preview'],

  setup(props, {
    emit,
    slots
  }) {
    var renderMask = () => {
      var {
        status,
        message
      } = props.item;

      if (status === 'uploading' || status === 'failed') {
        var MaskIcon = status === 'failed' ? (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": "close",
          "class": uploader_utils_bem('mask-icon')
        }, null) : (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(loading_Loading, {
          "class": uploader_utils_bem('loading')
        }, null);
        var showMessage = isDef(message) && message !== '';
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": uploader_utils_bem('mask')
        }, [MaskIcon, showMessage && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": uploader_utils_bem('mask-message')
        }, [message])]);
      }
    };

    var onDelete = event => {
      var {
        name,
        item,
        index,
        beforeDelete
      } = props;
      event.stopPropagation();
      callInterceptor({
        interceptor: beforeDelete,
        args: [item, {
          name,
          index
        }],
        done: () => emit('delete')
      });
    };

    var onPreview = () => emit('preview');

    var renderDeleteIcon = () => {
      if (props.deletable && props.item.status !== 'uploading') {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": uploader_utils_bem('preview-delete'),
          "onClick": onDelete
        }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
          "name": "cross",
          "class": uploader_utils_bem('preview-delete-icon')
        }, null)]);
      }
    };

    var renderCover = () => {
      if (slots['preview-cover']) {
        var {
          index,
          item
        } = props;
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": uploader_utils_bem('preview-cover')
        }, [slots['preview-cover'](extend({
          index
        }, item))]);
      }
    };

    var renderPreview = () => {
      var {
        item
      } = props;

      if (isImageFile(item)) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(es_image_Image, {
          "fit": props.imageFit,
          "src": item.content || item.url,
          "class": uploader_utils_bem('preview-image'),
          "width": props.previewSize,
          "height": props.previewSize,
          "lazyLoad": props.lazyLoad,
          "onClick": onPreview
        }, {
          default: () => [renderCover()]
        });
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": uploader_utils_bem('file'),
        "style": getSizeStyle(props.previewSize)
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "class": uploader_utils_bem('file-icon'),
        "name": "description"
      }, null), (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": [uploader_utils_bem('file-name'), 'van-ellipsis']
      }, [item.file ? item.file.name : item.url]), renderCover()]);
    };

    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": uploader_utils_bem('preview')
    }, [renderPreview(), renderMask(), renderDeleteIcon()]);
  }

}));
;// CONCATENATED MODULE: ./es/uploader/Uploader.js

 // Utils


 // Composables


 // Components



 // Types

/* harmony default export */ var Uploader = ((0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.defineComponent)({
  name: uploader_utils_name,
  props: {
    capture: String,
    multiple: Boolean,
    disabled: Boolean,
    lazyLoad: Boolean,
    uploadText: String,
    deletable: truthProp,
    afterRead: Function,
    showUpload: truthProp,
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String],
    previewImage: truthProp,
    previewOptions: Object,
    previewFullImage: truthProp,
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
      default: () => []
    },
    maxSize: {
      type: [Number, String, Function],
      default: Number.MAX_VALUE
    },
    maxCount: {
      type: [Number, String],
      default: Number.MAX_VALUE
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

  setup(props, {
    emit,
    slots
  }) {
    var inputRef = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.ref)();

    var getDetail = (index = props.modelValue.length) => ({
      name: props.name,
      index
    });

    var resetInput = () => {
      if (inputRef.value) {
        inputRef.value.value = '';
      }
    };

    var onAfterRead = items => {
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
      emit('update:modelValue', [...props.modelValue, ...toArray(items)]);

      if (props.afterRead) {
        props.afterRead(items, getDetail());
      }
    };

    var readFile = files => {
      var {
        maxCount,
        modelValue,
        resultType
      } = props;

      if (Array.isArray(files)) {
        var remainCount = +maxCount - modelValue.length;

        if (files.length > remainCount) {
          files = files.slice(0, remainCount);
        }

        Promise.all(files.map(file => readFileContent(file, resultType))).then(contents => {
          var fileList = files.map((file, index) => {
            var result = {
              file,
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
        readFileContent(files, resultType).then(content => {
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

    var onChange = event => {
      var {
        files
      } = event.target;

      if (props.disabled || !files || !files.length) {
        return;
      }

      var file = files.length === 1 ? files[0] : [].slice.call(files);

      if (props.beforeRead) {
        var response = props.beforeRead(file, getDetail());

        if (!response) {
          resetInput();
          return;
        }

        if (isPromise(response)) {
          response.then(data => {
            if (data) {
              readFile(data);
            } else {
              readFile(file);
            }
          }).catch(resetInput);
          return;
        }
      }

      readFile(file);
    };

    var imagePreview;

    var onClosePreview = () => emit('close-preview');

    var previewImage = item => {
      if (props.previewFullImage) {
        var imageFiles = props.modelValue.filter(isImageFile);
        var images = imageFiles.map(item => item.content || item.url).filter(Boolean);
        imagePreview = function_call_ImagePreview(extend({
          images,
          startPosition: imageFiles.indexOf(item),
          onClose: onClosePreview
        }, props.previewOptions));
      }
    };

    var closeImagePreview = () => {
      if (imagePreview) {
        imagePreview.close();
      }
    };

    var deleteFile = (item, index) => {
      var fileList = props.modelValue.slice(0);
      fileList.splice(index, 1);
      emit('update:modelValue', fileList);
      emit('delete', item, getDetail(index));
    };

    var renderPreviewItem = (item, index) => {
      var needPickData = ['imageFit', 'deletable', 'previewSize', 'beforeDelete'];
      var previewData = extend(pick(props, needPickData), pick(item, needPickData, true));
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(UploaderPreviewItem, (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.mergeProps)({
        "item": item,
        "index": index,
        "onClick": () => emit('click-preview', item, getDetail(index)),
        "onDelete": () => deleteFile(item, index),
        "onPreview": () => previewImage(item)
      }, pick(props, ['name', 'lazyLoad']), previewData), {
        'preview-cover': slots['preview-cover']
      });
    };

    var renderPreviewList = () => {
      if (props.previewImage) {
        return props.modelValue.map(renderPreviewItem);
      }
    };

    var renderUpload = () => {
      if (props.modelValue.length >= props.maxCount || !props.showUpload) {
        return;
      }

      var Input = (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("input", {
        "ref": inputRef,
        "type": "file",
        "class": uploader_utils_bem('input'),
        "accept": props.accept,
        "capture": props.capture,
        "multiple": props.multiple,
        "disabled": props.disabled,
        "onChange": onChange
      }, null);

      if (slots.default) {
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
          "class": uploader_utils_bem('input-wrapper')
        }, [slots.default(), Input]);
      }

      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
        "class": uploader_utils_bem('upload'),
        "style": getSizeStyle(props.previewSize)
      }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)(icon_Icon, {
        "name": props.uploadIcon,
        "class": uploader_utils_bem('upload-icon')
      }, null), props.uploadText && (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("span", {
        "class": uploader_utils_bem('upload-text')
      }, [props.uploadText]), Input]);
    };

    var chooseFile = () => {
      if (inputRef.value && !props.disabled) {
        inputRef.value.click();
      }
    };

    useExpose({
      chooseFile,
      closeImagePreview
    });
    useLinkField(() => props.modelValue);
    return () => (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": uploader_utils_bem()
    }, [(0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.createVNode)("div", {
      "class": uploader_utils_bem('wrapper', {
        disabled: props.disabled
      })
    }, [renderPreviewList(), renderUpload()])]);
  }

}));
;// CONCATENATED MODULE: ./es/uploader/index.js


var uploader_Uploader = withInstall(Uploader);
/* harmony default export */ var uploader = ((/* unused pure expression or super */ null && (uploader_Uploader)));

;// CONCATENATED MODULE: ./es/dialog/index.js

/* harmony default export */ var dialog = ((/* unused pure expression or super */ null && (Dialog)));

;// CONCATENATED MODULE: ./es/image-preview/index.js

/* harmony default export */ var image_preview = ((/* unused pure expression or super */ null && (ImagePreview)));

;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/util.js
var util_inBrowser = typeof window !== 'undefined' && window !== null;

function checkIntersectionObserver() {
  if (util_inBrowser && 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get() {
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

function remove(arr, item) {
  if (!arr.length) return;
  var index = arr.indexOf(item);
  if (index > -1) return arr.splice(index, 1);
}

function getBestSelectionFromSrcset(el, scale) {
  if (el.tagName !== 'IMG' || !el.getAttribute('data-srcset')) return;
  var options = el.getAttribute('data-srcset');
  var container = el.parentNode;
  var containerWidth = container.offsetWidth * scale;
  var spaceIndex;
  var tmpSrc;
  var tmpWidth;
  options = options.trim().split(',');
  var result = options.map(item => {
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

var getDPR = (scale = 1) => util_inBrowser ? window.devicePixelRatio || scale : scale;

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
  return function (...args) {
    if (timeout) {
      return;
    }

    var elapsed = Date.now() - lastRun;

    var runCallback = () => {
      lastRun = Date.now();
      timeout = false;
      action.apply(this, args);
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
      get() {
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
  on(el, type, func, capture = false) {
    if (util_supportsPassive) {
      el.addEventListener(type, func, {
        capture,
        passive: true
      });
    } else {
      el.addEventListener(type, func, capture);
    }
  },

  off(el, type, func, capture = false) {
    el.removeEventListener(type, func, capture);
  }

};

var loadImageAsync = (item, resolve, reject) => {
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

var style = (el, prop) => {
  return typeof getComputedStyle !== 'undefined' ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop];
};

var overflow = el => {
  return style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x');
};

var scrollParent = el => {
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

function util_noop() {}

class ImageCache {
  constructor({
    max
  }) {
    this.options = {
      max: max || 100
    };
    this._caches = [];
  }

  has(key) {
    return this._caches.indexOf(key) > -1;
  }

  add(key) {
    if (this.has(key)) return;

    this._caches.push(key);

    if (this._caches.length > this.options.max) {
      this.free();
    }
  }

  free() {
    this._caches.shift();
  }

}


;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/listener.js

class ReactiveListener {
  constructor({
    el,
    src,
    error,
    loading,
    bindType,
    $parent,
    options,
    cors,
    elRenderer,
    imageCache
  }) {
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


  initState() {
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


  record(event) {
    this.performanceData[event] = Date.now();
  }
  /*
   * update image listener data
   * @param  {String} image uri
   * @param  {String} loading image uri
   * @param  {String} error image uri
   * @return
   */


  update({
    src,
    loading,
    error
  }) {
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


  getRect() {
    this.rect = this.el.getBoundingClientRect();
  }
  /*
   *  check el is in view
   * @return {Boolean} el is in view
   */


  checkInView() {
    this.getRect();
    return this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0;
  }
  /*
   * listener filter
   */


  filter() {
    Object.keys(this.options.filter).forEach(key => {
      this.options.filter[key](this, this.options);
    });
  }
  /*
   * render loading first
   * @params cb:Function
   * @return
   */


  renderLoading(cb) {
    this.state.loading = true;
    loadImageAsync({
      src: this.loading,
      cors: this.cors
    }, () => {
      this.render('loading', false);
      this.state.loading = false;
      cb();
    }, () => {
      // handler `loading image` load failed
      cb();
      this.state.loading = false;
      if (!this.options.silent) console.warn("VueLazyload log: load failed with loading image(" + this.loading + ")");
    });
  }
  /*
   * try load image and  render it
   * @return
   */


  load(onFinish = util_noop) {
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

    this.renderLoading(() => {
      var _this$options$adapter, _this$options$adapter2;

      this.attempt++;
      (_this$options$adapter = (_this$options$adapter2 = this.options.adapter).beforeLoad) == null ? void 0 : _this$options$adapter.call(_this$options$adapter2, this, this.options);
      this.record('loadStart');
      loadImageAsync({
        src: this.src,
        cors: this.cors
      }, data => {
        this.naturalHeight = data.naturalHeight;
        this.naturalWidth = data.naturalWidth;
        this.state.loaded = true;
        this.state.error = false;
        this.record('loadEnd');
        this.render('loaded', false);
        this.state.rendered = true;

        this._imageCache.add(this.src);

        onFinish();
      }, err => {
        !this.options.silent && console.error(err);
        this.state.error = true;
        this.state.loaded = false;
        this.render('error', false);
      });
    });
  }
  /*
   * render image
   * @param  {String} state to render // ['loading', 'src', 'error']
   * @param  {String} is form cache
   * @return
   */


  render(state, cache) {
    this.elRenderer(this, state, cache);
  }
  /*
   * output performance data
   * @return {Object} performance data
   */


  performance() {
    var state = 'loading';
    var time = 0;

    if (this.state.loaded) {
      state = 'loaded';
      time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1000;
    }

    if (this.state.error) state = 'error';
    return {
      src: this.src,
      state,
      time
    };
  }
  /*
   * $destroy
   * @return
   */


  $destroy() {
    this.el = null;
    this.src = null;
    this.error = null;
    this.loading = null;
    this.bindType = null;
    this.attempt = 0;
  }

}
;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/lazy.js



var DEFAULT_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
var DEFAULT_EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'];
var DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: '0px',
  threshold: 0
};
/* harmony default export */ function esm_lazy() {
  return class Lazy {
    constructor({
      preLoad,
      error,
      throttleWait,
      preLoadTop,
      dispatchEvent,
      loading,
      attempt,
      silent = true,
      scale,
      listenEvents,
      filter,
      adapter,
      observer,
      observerOptions
    }) {
      this.mode = modeType.event;
      this.ListenerQueue = [];
      this.TargetIndex = 0;
      this.TargetQueue = [];
      this.options = {
        silent,
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


    config(options = {}) {
      Object.assign(this.options, options);
    }
    /**
     * output listener's load performance
     * @return {Array}
     */


    performance() {
      return this.ListenerQueue.map(item => item.performance());
    }
    /*
     * add lazy component to queue
     * @param  {Vue} vm lazy component instance
     * @return
     */


    addLazyBox(vm) {
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


    add(el, binding, vnode) {
      if (this.ListenerQueue.some(item => item.el === el)) {
        this.update(el, binding);
        return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(this.lazyLoadHandler);
      }

      var value = this._valueFormatter(binding.value);

      var {
        src
      } = value;
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => {
        src = getBestSelectionFromSrcset(el, this.options.scale) || src;
        this._observer && this._observer.observe(el);
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
          $parent,
          el,
          src,
          loading: value.loading,
          error: value.error,
          cors: value.cors,
          elRenderer: this._elRenderer.bind(this),
          options: this.options,
          imageCache: this._imageCache
        });
        this.ListenerQueue.push(newListener);

        if (util_inBrowser) {
          this._addListenerTarget(window);

          this._addListenerTarget($parent);
        }

        this.lazyLoadHandler();
        (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => this.lazyLoadHandler());
      });
    }
    /**
     * update image src
     * @param  {DOM} el
     * @param  {object} vue directive binding
     * @return
     */


    update(el, binding, vnode) {
      var value = this._valueFormatter(binding.value);

      var {
        src
      } = value;
      src = getBestSelectionFromSrcset(el, this.options.scale) || src;
      var exist = find(this.ListenerQueue, item => item.el === el);

      if (!exist) {
        this.add(el, binding, vnode);
      } else {
        exist.update({
          src,
          error: value.error,
          loading: value.loading
        });
      }

      if (this._observer) {
        this._observer.unobserve(el);

        this._observer.observe(el);
      }

      this.lazyLoadHandler();
      (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.nextTick)(() => this.lazyLoadHandler());
    }
    /**
     * remove listener form list
     * @param  {DOM} el
     * @return
     */


    remove(el) {
      if (!el) return;
      this._observer && this._observer.unobserve(el);
      var existItem = find(this.ListenerQueue, item => item.el === el);

      if (existItem) {
        this._removeListenerTarget(existItem.$parent);

        this._removeListenerTarget(window);

        remove(this.ListenerQueue, existItem);
        existItem.$destroy();
      }
    }
    /*
     * remove lazy components form list
     * @param  {Vue} vm Vue instance
     * @return
     */


    removeComponent(vm) {
      if (!vm) return;
      remove(this.ListenerQueue, vm);
      this._observer && this._observer.unobserve(vm.el);

      if (vm.$parent && vm.$el.parentNode) {
        this._removeListenerTarget(vm.$el.parentNode);
      }

      this._removeListenerTarget(window);
    }

    setMode(mode) {
      if (!hasIntersectionObserver && mode === modeType.observer) {
        mode = modeType.event;
      }

      this.mode = mode; // event or observer

      if (mode === modeType.event) {
        if (this._observer) {
          this.ListenerQueue.forEach(listener => {
            this._observer.unobserve(listener.el);
          });
          this._observer = null;
        }

        this.TargetQueue.forEach(target => {
          this._initListen(target.el, true);
        });
      } else {
        this.TargetQueue.forEach(target => {
          this._initListen(target.el, false);
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


    _addListenerTarget(el) {
      if (!el) return;
      var target = find(this.TargetQueue, target => target.el === el);

      if (!target) {
        target = {
          el,
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


    _removeListenerTarget(el) {
      this.TargetQueue.forEach((target, index) => {
        if (target.el === el) {
          target.childrenCount--;

          if (!target.childrenCount) {
            this._initListen(target.el, false);

            this.TargetQueue.splice(index, 1);
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


    _initListen(el, start) {
      this.options.ListenEvents.forEach(evt => _[start ? 'on' : 'off'](el, evt, this.lazyLoadHandler));
    }

    _initEvent() {
      this.Event = {
        listeners: {
          loading: [],
          loaded: [],
          error: []
        }
      };

      this.$on = (event, func) => {
        if (!this.Event.listeners[event]) this.Event.listeners[event] = [];
        this.Event.listeners[event].push(func);
      };

      this.$once = (event, func) => {
        var on = (...args) => {
          this.$off(event, on);
          func.apply(this, args);
        };

        this.$on(event, on);
      };

      this.$off = (event, func) => {
        if (!func) {
          if (!this.Event.listeners[event]) return;
          this.Event.listeners[event].length = 0;
          return;
        }

        remove(this.Event.listeners[event], func);
      };

      this.$emit = (event, context, inCache) => {
        if (!this.Event.listeners[event]) return;
        this.Event.listeners[event].forEach(func => func(context, inCache));
      };
    }
    /**
     * find nodes which in viewport and trigger load
     * @return
     */


    _lazyLoadHandler() {
      var freeList = [];
      this.ListenerQueue.forEach(listener => {
        if (!listener.el || !listener.el.parentNode) {
          freeList.push(listener);
        }

        var catIn = listener.checkInView();
        if (!catIn) return;
        listener.load();
      });
      freeList.forEach(item => {
        remove(this.ListenerQueue, item);
        item.$destroy();
      });
    }
    /**
     * init IntersectionObserver
     * set mode to observer
     * @return
     */


    _initIntersectionObserver() {
      if (!hasIntersectionObserver) {
        return;
      }

      this._observer = new IntersectionObserver(this._observerHandler.bind(this), this.options.observerOptions);

      if (this.ListenerQueue.length) {
        this.ListenerQueue.forEach(listener => {
          this._observer.observe(listener.el);
        });
      }
    }
    /**
     * init IntersectionObserver
     * @return
     */


    _observerHandler(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.ListenerQueue.forEach(listener => {
            if (listener.el === entry.target) {
              if (listener.state.loaded) return this._observer.unobserve(listener.el);
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


    _elRenderer(listener, state, cache) {
      if (!listener.el) return;
      var {
        el,
        bindType
      } = listener;
      var src;

      switch (state) {
        case 'loading':
          src = listener.loading;
          break;

        case 'error':
          src = listener.error;
          break;

        default:
          ({
            src
          } = listener);
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


    _valueFormatter(value) {
      var src = value;
      var {
        loading,
        error
      } = this.options; // value is object

      if (util_isObject(value)) {
        if (!value.src && !this.options.silent) console.error('Vue Lazyload warning: miss src with ' + value);
        ({
          src
        } = value);
        loading = value.loading || this.options.loading;
        error = value.error || this.options.error;
      }

      return {
        src,
        loading,
        error
      };
    }

  };
}
;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/lazy-component.js


/* harmony default export */ var lazy_component = (lazy => {
  return {
    props: {
      tag: {
        type: String,
        default: 'div'
      }
    },
    emits: ['show'],

    render() {
      return (0,external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_.h)(this.tag, this.show && this.$slots.default ? this.$slots.default() : null);
    },

    data() {
      return {
        el: null,
        state: {
          loaded: false
        },
        rect: {},
        show: false
      };
    },

    mounted() {
      this.el = this.$el;
      lazy.addLazyBox(this);
      lazy.lazyLoadHandler();
    },

    beforeUnmount() {
      lazy.removeComponent(this);
    },

    methods: {
      getRect() {
        this.rect = this.$el.getBoundingClientRect();
      },

      checkInView() {
        this.getRect();
        return util_inBrowser && this.rect.top < window.innerHeight * lazy.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazy.options.preLoad && this.rect.right > 0;
      },

      load() {
        this.show = true;
        this.state.loaded = true;
        this.$emit('show', this);
      },

      destroy() {
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

class LazyContainer {
  constructor({
    el,
    binding,
    vnode,
    lazy
  }) {
    this.el = null;
    this.vnode = vnode;
    this.binding = binding;
    this.options = {};
    this.lazy = lazy;
    this._queue = [];
    this.update({
      el,
      binding
    });
  }

  update({
    el,
    binding
  }) {
    this.el = el;
    this.options = Object.assign({}, lazy_container_defaultOptions, binding.value);
    var imgs = this.getImgs();
    imgs.forEach(el => {
      this.lazy.add(el, Object.assign({}, this.binding, {
        value: {
          src: 'dataset' in el ? el.dataset.src : el.getAttribute('data-src'),
          error: ('dataset' in el ? el.dataset.error : el.getAttribute('data-error')) || this.options.error,
          loading: ('dataset' in el ? el.dataset.loading : el.getAttribute('data-loading')) || this.options.loading
        }
      }), this.vnode);
    });
  }

  getImgs() {
    return Array.from(this.el.querySelectorAll(this.options.selector));
  }

  clear() {
    var imgs = this.getImgs();
    imgs.forEach(el => this.lazy.remove(el));
    this.vnode = null;
    this.binding = null;
    this.lazy = null;
  }

}

class LazyContainerManager {
  constructor({
    lazy
  }) {
    this.lazy = lazy;
    this._queue = [];
  }

  bind(el, binding, vnode) {
    var container = new LazyContainer({
      el,
      binding,
      vnode,
      lazy: this.lazy
    });

    this._queue.push(container);
  }

  update(el, binding, vnode) {
    var container = find(this._queue, item => item.el === el);
    if (!container) return;
    container.update({
      el,
      binding,
      vnode
    });
  }

  unbind(el) {
    var container = find(this._queue, item => item.el === el);
    if (!container) return;
    container.clear();
    remove(this._queue, container);
  }

}
;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/lazy-image.js

/* harmony default export */ var lazy_image = (lazyManager => {
  return {
    props: {
      src: [String, Object],
      tag: {
        type: String,
        default: 'img'
      }
    },

    render(h) {
      return h(this.tag, {
        attrs: {
          src: this.renderSrc
        }
      }, this.$slots.default);
    },

    data() {
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
      src() {
        this.init();
        lazyManager.addLazyBox(this);
        lazyManager.lazyLoadHandler();
      }

    },

    created() {
      this.init();
      this.renderSrc = this.options.loading;
    },

    mounted() {
      this.el = this.$el;
      lazyManager.addLazyBox(this);
      lazyManager.lazyLoadHandler();
    },

    beforeUnmount() {
      lazyManager.removeComponent(this);
    },

    methods: {
      init() {
        var {
          src,
          loading,
          error
        } = lazyManager._valueFormatter(this.src);

        this.state.loaded = false;
        this.options.src = src;
        this.options.error = error;
        this.options.loading = loading;
        this.renderSrc = this.options.loading;
      },

      getRect() {
        this.rect = this.$el.getBoundingClientRect();
      },

      checkInView() {
        this.getRect();
        return util_inBrowser && this.rect.top < window.innerHeight * lazyManager.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazyManager.options.preLoad && this.rect.right > 0;
      },

      load(onFinish = util_noop) {
        if (this.state.attempt > this.options.attempt - 1 && this.state.error) {
          if (!lazyManager.options.silent) console.log("VueLazyload log: " + this.options.src + " tried too more than " + this.options.attempt + " times");
          onFinish();
          return;
        }

        var {
          src
        } = this.options;
        loadImageAsync({
          src
        }, ({
          src
        }) => {
          this.renderSrc = src;
          this.state.loaded = true;
        }, () => {
          this.state.attempt++;
          this.renderSrc = this.options.error;
          this.state.error = true;
        });
      }

    }
  };
});
;// CONCATENATED MODULE: ./node_modules/@vant/lazyload/dist/esm/index.js




var esm_Lazyload = {
  /*
   * install function
   * @param  {App} app
   * @param  {object} options lazyload options
   */
  install(app, options = {}) {
    var LazyClass = esm_lazy();
    var lazy = new LazyClass(options);
    var lazyContainer = new LazyContainerManager({
      lazy
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

/* harmony default export */ var lazyload = ((/* unused pure expression or super */ null && (Lazyload)));

;// CONCATENATED MODULE: ./es/notify/index.js

/* harmony default export */ var notify = ((/* unused pure expression or super */ null && (Notify)));

;// CONCATENATED MODULE: ./es/toast/index.js

/* harmony default export */ var toast = ((/* unused pure expression or super */ null && (Toast)));

;// CONCATENATED MODULE: ./es/index.js





















































































var version = '3.0.18';

function install(app) {
  var components = [action_bar_ActionBar, action_bar_button_ActionBarButton, action_bar_icon_ActionBarIcon, action_sheet_ActionSheet, address_edit_AddressEdit, address_list_AddressList, area_Area, badge_Badge, button_Button, calendar_Calendar, card_Card, cascader_Cascader, cell_Cell, cell_group_CellGroup, checkbox_Checkbox, checkbox_group_CheckboxGroup, circle_Circle, col_Col, collapse_Collapse, collapse_item_CollapseItem, contact_card_ContactCard, contact_edit_ContactEdit, contact_list_ContactList, count_down_CountDown, coupon_Coupon, coupon_cell_CouponCell, coupon_list_CouponList, datetime_picker_DatetimePicker, function_call_Dialog, divider_Divider, dropdown_item_DropdownItem, dropdown_menu_DropdownMenu, empty_Empty, field_Field, form_Form, grid_Grid, grid_item_GridItem, icon_Icon, es_image_Image, function_call_ImagePreview, index_anchor_IndexAnchor, index_bar_IndexBar, list_List, loading_Loading, Locale, nav_bar_NavBar, notice_bar_NoticeBar, function_call_Notify, number_keyboard_NumberKeyboard, overlay_Overlay, pagination_Pagination, password_input_PasswordInput, picker_Picker, popover_Popover, popup_Popup, progress_Progress, pull_refresh_PullRefresh, radio_Radio, radio_group_RadioGroup, rate_Rate, row_Row, search_Search, share_sheet_ShareSheet, sidebar_Sidebar, sidebar_item_SidebarItem, skeleton_Skeleton, slider_Slider, step_Step, stepper_Stepper, steps_Steps, sticky_Sticky, submit_bar_SubmitBar, swipe_Swipe, swipe_cell_SwipeCell, swipe_item_SwipeItem, switch_Switch, tab_Tab, tabbar_Tabbar, tabbar_item_TabbarItem, tabs_Tabs, tag_Tag, function_call_Toast, tree_select_TreeSelect, uploader_Uploader];
  components.forEach(item => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}























































































/* harmony default export */ var es = ({
  install,
  version
});
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});