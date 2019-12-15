/*!
 * Quasar Framework v0.16.0
 * (c) 2016-present Razvan Stoenescu
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
	typeof define === 'function' && define.amd ? define(['vue'], factory) :
	(global.Quasar = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

var version = "0.16.0";

function offset (el) {
  if (el === window) {
    return {top: 0, left: 0}
  }
  var ref = el.getBoundingClientRect();
  var top = ref.top;
  var left = ref.left;

  return {top: top, left: left}
}

function style (el, property) {
  return window.getComputedStyle(el).getPropertyValue(property)
}

function height (el) {
  if (el === window) {
    return window.innerHeight
  }
  return parseFloat(style(el, 'height'))
}

function width (el) {
  if (el === window) {
    return window.innerWidth
  }
  return parseFloat(style(el, 'width'))
}

function css (element, css) {
  var style = element.style;

  Object.keys(css).forEach(function (prop) {
    style[prop] = css[prop];
  });
}

function ready (fn) {
  if (typeof fn !== 'function') {
    return
  }

  if (document.readyState === 'complete') {
    return fn()
  }

  document.addEventListener('DOMContentLoaded', fn, false);
}

var prefix = ['-webkit-', '-moz-', '-ms-', '-o-'];
function cssTransform (val) {
  var o = {transform: val};
  prefix.forEach(function (p) {
    o[p + 'transform'] = val;
  });
  return o
}

var dom = /*#__PURE__*/Object.freeze({
offset: offset,
style: style,
height: height,
width: width,
css: css,
ready: ready,
cssTransform: cssTransform
});

/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-mixed-operators */

var isSSR = typeof window === 'undefined';

function getUserAgent () {
  return (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
}

function getMatch (userAgent, platformMatch) {
  var match = /(edge)\/([\w.]+)/.exec(userAgent) ||
    /(opr)[\/]([\w.]+)/.exec(userAgent) ||
    /(vivaldi)[\/]([\w.]+)/.exec(userAgent) ||
    /(chrome)[\/]([\w.]+)/.exec(userAgent) ||
    /(iemobile)[\/]([\w.]+)/.exec(userAgent) ||
    /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent) ||
    /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent) ||
    /(webkit)[\/]([\w.]+)/.exec(userAgent) ||
    /(opera)(?:.*version|)[\/]([\w.]+)/.exec(userAgent) ||
    /(msie) ([\w.]+)/.exec(userAgent) ||
    userAgent.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(userAgent) ||
    userAgent.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent) ||
    [];

  return {
    browser: match[5] || match[3] || match[1] || '',
    version: match[2] || match[4] || '0',
    versionNumber: match[4] || match[2] || '0',
    platform: platformMatch[0] || ''
  }
}

function getPlatformMatch (userAgent) {
  return /(ipad)/.exec(userAgent) ||
    /(ipod)/.exec(userAgent) ||
    /(windows phone)/.exec(userAgent) ||
    /(iphone)/.exec(userAgent) ||
    /(kindle)/.exec(userAgent) ||
    /(silk)/.exec(userAgent) ||
    /(android)/.exec(userAgent) ||
    /(win)/.exec(userAgent) ||
    /(mac)/.exec(userAgent) ||
    /(linux)/.exec(userAgent) ||
    /(cros)/.exec(userAgent) ||
    /(playbook)/.exec(userAgent) ||
    /(bb)/.exec(userAgent) ||
    /(blackberry)/.exec(userAgent) ||
    []
}

function getPlatform () {
  var
    userAgent = getUserAgent(),
    platformMatch = getPlatformMatch(userAgent),
    matched = getMatch(userAgent, platformMatch),
    browser = {};

  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.versionNumber, 10);
  }

  if (matched.platform) {
    browser[matched.platform] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if (browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone ||
    browser.ipod || browser.kindle || browser.playbook || browser.silk || browser['windows phone']) {
    browser.mobile = true;
  }

  // Set iOS if on iPod, iPad or iPhone
  if (browser.ipod || browser.ipad || browser.iphone) {
    browser.ios = true;
  }

  if (browser['windows phone']) {
    browser.winphone = true;
    delete browser['windows phone'];
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if (browser.cros || browser.mac || browser.linux || browser.win) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+, Vivaldi and Safari are webkit based browsers
  if (browser.chrome || browser.opr || browser.safari || browser.vivaldi) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if (browser.rv || browser.iemobile) {
    matched.browser = 'ie';
    browser.ie = true;
  }

  // Edge is officially known as Microsoft Edge, so rewrite the key to match
  if (browser.edge) {
    matched.browser = 'edge';
    browser.edge = true;
  }

  // Blackberry browsers are marked as Safari on BlackBerry
  if (browser.safari && browser.blackberry || browser.bb) {
    matched.browser = 'blackberry';
    browser.blackberry = true;
  }

  // Playbook browsers are marked as Safari on Playbook
  if (browser.safari && browser.playbook) {
    matched.browser = 'playbook';
    browser.playbook = true;
  }

  // Opera 15+ are identified as opr
  if (browser.opr) {
    matched.browser = 'opera';
    browser.opera = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if (browser.safari && browser.android) {
    matched.browser = 'android';
    browser.android = true;
  }

  // Kindle browsers are marked as Safari on Kindle
  if (browser.safari && browser.kindle) {
    matched.browser = 'kindle';
    browser.kindle = true;
  }

  // Kindle Silk browsers are marked as Safari on Kindle
  if (browser.safari && browser.silk) {
    matched.browser = 'silk';
    browser.silk = true;
  }

  if (browser.vivaldi) {
    matched.browser = 'vivaldi';
    browser.vivaldi = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;

  if (!isSSR) {
    if (window.process && window.process.versions && window.process.versions.electron) {
      browser.electron = true;
    }
    else if (document.location.href.indexOf('chrome-extension://') === 0) {
      browser.chromeExt = true;
    }
    else if (window._cordovaNative || window.cordova) {
      browser.cordova = true;
    }
  }

  return browser
}

var Platform = {
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;

    if (this.__installed) { return }
    this.__installed = true;

    if (isSSR) {
      Platform.is = { ssr: true };
      Platform.has = {
        touch: false,
        webStorage: false
      };
      Platform.within = { iframe: false };
    }
    else {
      var webStorage;

      try {
        if (window.localStorage) {
          webStorage = true;
        }
      }
      catch (e) {
        webStorage = false;
      }

      Platform.is = getPlatform();
      Platform.has = {
        touch: (function () { return !!('ontouchstart' in document.documentElement) || window.navigator.msMaxTouchPoints > 0; })(),
        webStorage: webStorage
      };
      Platform.within = {
        iframe: window.self !== window.top
      };
    }

    $q.platform = Platform;
  }
};

var History = {
  __history: [],
  add: function () {},
  remove: function () {},

  __installed: false,
  install: function install () {
    var this$1 = this;

    if (this.__installed || !Platform.is.cordova || isSSR) {
      return
    }

    this.__installed = true;
    this.add = function (definition) {
      this$1.__history.push(definition);
    };
    this.remove = function (definition) {
      var index = this$1.__history.indexOf(definition);
      if (index >= 0) {
        this$1.__history.splice(index, 1);
      }
    };

    document.addEventListener('deviceready', function () {
      document.addEventListener('backbutton', function () {
        if (this$1.__history.length) {
          this$1.__history.pop().handler();
        }
        else if (window.location.hash === '#/') {
          navigator.app.exitApp();
        }
        else {
          window.history.back();
        }
      }, false);
    });
  }
}

/* eslint-disable no-extend-native, one-var, no-self-compare */

if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchEl, startFrom) {

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false
    }
    var n = parseInt(startFrom, 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    }
    else {
      k = len + n;
      if (k < 0) { k = 0; }
    }
    var curEl;
    while (k < len) {
      curEl = O[k];
      if (searchEl === curEl ||
         (searchEl !== searchEl && curEl !== curEl)) { // NaN !== NaN
        return true
      }
      k++;
    }
    return false
  };
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (str, position) {
    position = position || 0;
    return this.substr(position, str.length) === str
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (str, position) {
    var subjectString = this.toString();

    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= str.length;

    var lastIndex = subjectString.indexOf(str, position);

    return lastIndex !== -1 && lastIndex === position
  };
}

if (!isSSR && typeof Element.prototype.matches !== 'function') {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || function matches (selector) {
    var
      element = this,
      elements = (element.document || element.ownerDocument).querySelectorAll(selector),
      index = 0;

    while (elements[index] && elements[index] !== element) {
      ++index;
    }

    return Boolean(elements[index])
  };
}

if (!isSSR && typeof Element.prototype.closest !== 'function') {
  Element.prototype.closest = function closest (selector) {
    var el = this;
    while (el && el.nodeType === 1) {
      if (el.matches(selector)) {
        return el
      }
      el = el.parentNode;
    }
    return null
  };
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function value (predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined')
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }

      var value;
      var
        list = Object(this),
        length = list.length >>> 0,
        thisArg = arguments[1];

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value
        }
      }
      return undefined
    }
  });
}

var langEn = {
  lang: 'en-us',
  label: {
    clear: 'Clear',
    ok: 'OK',
    cancel: 'Cancel',
    close: 'Close',
    set: 'Set',
    select: 'Select',
    reset: 'Reset',
    remove: 'Remove',
    update: 'Update',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    refresh: 'Refresh'
  },
  date: {
    days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: false
  },
  pullToRefresh: {
    pull: 'Pull down to refresh',
    release: 'Release to refresh',
    refresh: 'Refreshing...'
  },
  table: {
    noData: 'No data available',
    noResults: 'No matching records found',
    loading: 'Loading...',
    selectedRows: function (rows) {
      return rows === 1
        ? '1 row selected.'
        : (rows === 0 ? 'No' : rows) + ' rows selected.'
    },
    rowsPerPage: 'Rows per page:',
    allRows: 'All',
    pagination: function (start, end, total) {
      return start + '-' + end + ' of ' + total
    },
    columns: 'Columns'
  },
  editor: {
    url: 'URL',
    bold: 'Bold',
    italic: 'Italic',
    strikethrough: 'Strikethrough',
    underline: 'Underline',
    unorderedList: 'Unordered List',
    orderedList: 'Ordered List',
    subscript: 'Subscript',
    superscript: 'Superscript',
    hyperlink: 'Hyperlink',
    toggleFullscreen: 'Toggle Fullscreen',
    quote: 'Quote',
    left: 'Left align',
    center: 'Center align',
    right: 'Right align',
    justify: 'Justify align',
    print: 'Print',
    outdent: 'Decrease indentation',
    indent: 'Increase indentation',
    removeFormat: 'Remove formatting',
    formatting: 'Formatting',
    fontSize: 'Font Size',
    align: 'Align',
    hr: 'Insert Horizontal Rule',
    undo: 'Undo',
    redo: 'Redo',
    header1: 'Header 1',
    header2: 'Header 2',
    header3: 'Header 3',
    header4: 'Header 4',
    header5: 'Header 5',
    header6: 'Header 6',
    paragraph: 'Paragraph',
    code: 'Code',
    size1: 'Very small',
    size2: 'A bit small',
    size3: 'Normal',
    size4: 'Medium-large',
    size5: 'Big',
    size6: 'Very big',
    size7: 'Maximum',
    defaultFont: 'Default Font'
  },
  tree: {
    noNodes: 'No nodes available',
    noResults: 'No matching nodes found'
  }
}

var i18n = {
  __installed: false,
  install: function install (ref) {
    var this$1 = this;
    var $q = ref.$q;
    var Vue$$1 = ref.Vue;
    var lang = ref.lang;

    if (this.__installed) { return }
    this.__installed = true;

    this.set = function (lang) {
      if ( lang === void 0 ) lang = langEn;

      lang.set = this$1.set;
      lang.getLocale = this$1.getLocale;
      lang.rtl = lang.rtl || false;

      if (!isSSR) {
        ready(function () {
          var el = document.documentElement;
          el.setAttribute('dir', lang.rtl ? 'rtl' : 'ltr');
          el.setAttribute('lang', lang.lang);
        });
      }

      if ($q.i18n) {
        $q.i18n = lang;
      }
      else {
        Vue$$1.util.defineReactive($q, 'i18n', lang);
      }

      this$1.name = lang.lang;
      this$1.lang = lang;
    };

    this.set(lang);
  },

  getLocale: function getLocale () {
    var val =
      navigator.language ||
      navigator.languages[0] ||
      navigator.browserLanguage ||
      navigator.userLanguage ||
      navigator.systemLanguage;

    if (val) {
      return val.toLowerCase()
    }
  }
}

var materialIcons = {
  name: 'material-icons',
  type: {
    positive: 'check_circle',
    negative: 'warning',
    info: 'info',
    warning: 'priority_high'
  },
  arrow: {
    up: 'arrow_upward',
    right: 'arrow_forward',
    down: 'arrow_downward',
    left: 'arrow_back'
  },
  chevron: {
    left: 'chevron_left',
    right: 'chevron_right'
  },

  pullToRefresh: {
    arrow: 'arrow_downward',
    refresh: 'refresh'
  },
  search: {
    icon: 'search',
    clear: 'cancel',
    clearInverted: 'clear'
  },
  carousel: {
    left: 'chevron_left',
    right: 'chevron_right',
    quickNav: 'lens',
    thumbnails: 'view_carousel'
  },
  checkbox: {
    checked: {
      ios: 'check_circle',
      mat: 'check_box'
    },
    unchecked: {
      ios: 'radio_button_unchecked',
      mat: 'check_box_outline_blank'
    },
    indeterminate: {
      ios: 'remove_circle_outline',
      mat: 'indeterminate_check_box'
    }
  },
  chip: {
    close: 'cancel'
  },
  chipsInput: {
    add: 'send'
  },
  collapsible: {
    icon: 'arrow_drop_down'
  },
  datetime: {
    arrowLeft: 'chevron_left',
    arrowRight: 'chevron_right'
  },
  editor: {
    bold: 'format_bold',
    italic: 'format_italic',
    strikethrough: 'strikethrough_s',
    underline: 'format_underlined',
    unorderedList: 'format_list_bulleted',
    orderedList: 'format_list_numbered',
    subscript: 'vertical_align_bottom',
    superscript: 'vertical_align_top',
    hyperlink: 'link',
    toggleFullscreen: 'fullscreen',
    quote: 'format_quote',
    left: 'format_align_left',
    center: 'format_align_center',
    right: 'format_align_right',
    justify: 'format_align_justify',
    print: 'print',
    outdent: 'format_indent_decrease',
    indent: 'format_indent_increase',
    removeFormat: 'format_clear',
    formatting: 'text_format',
    fontSize: 'format_size',
    align: 'format_align_left',
    hr: 'remove',
    undo: 'undo',
    redo: 'redo',
    header: 'format_size',
    code: 'code',
    size: 'format_size',
    font: 'font_download'
  },
  fab: {
    icon: 'add',
    activeIcon: 'close'
  },
  input: {
    showPass: 'visibility',
    hidePass: 'visibility_off',
    showNumber: 'keyboard',
    hideNumber: 'keyboard_hide',
    clear: 'cancel',
    clearInverted: 'clear',
    dropdown: 'arrow_drop_down'
  },
  pagination: {
    first: 'first_page',
    prev: 'keyboard_arrow_left',
    next: 'keyboard_arrow_right',
    last: 'last_page'
  },
  radio: {
    checked: {
      ios: 'check',
      mat: 'radio_button_checked'
    },
    unchecked: {
      ios: '',
      mat: 'radio_button_unchecked'
    }
  },
  rating: {
    icon: 'grade'
  },
  stepper: {
    done: 'check',
    active: 'edit',
    error: 'warning'
  },
  tabs: {
    left: 'chevron_left',
    right: 'chevron_right'
  },
  table: {
    arrowUp: 'arrow_upward',
    warning: 'warning',
    prevPage: 'chevron_left',
    nextPage: 'chevron_right'
  },
  tree: {
    icon: 'play_arrow'
  },
  uploader: {
    done: 'done',
    clear: 'cancel',
    clearInverted: 'clear',
    add: 'add',
    upload: 'cloud_upload',
    expand: 'keyboard_arrow_down',
    file: 'insert_drive_file'
  }
}

var icons = {
  __installed: false,
  install: function install (ref) {
    var this$1 = this;
    var $q = ref.$q;
    var Vue$$1 = ref.Vue;
    var iconSet = ref.iconSet;

    if (this.__installed) { return }
    this.__installed = true;

    this.set = function (iconDef) {
      if ( iconDef === void 0 ) iconDef = materialIcons;

      iconDef.set = this$1.set;

      if ($q.icon) {
        $q.icon = iconDef;
      }
      else {
        Vue$$1.util.defineReactive($q, 'icon', iconDef);
      }

      this$1.name = iconDef.name;
      this$1.def = iconDef;
    };

    this.set(iconSet);
  }
}

function bodyInit () {
  var cls = [
    "ios",
    Platform.is.desktop ? 'desktop' : 'mobile',
    Platform.has.touch ? 'touch' : 'no-touch',
    ("platform-" + (Platform.is.ios ? 'ios' : 'mat'))
  ];

  Platform.within.iframe && cls.push('within-iframe');
  Platform.is.cordova && cls.push('cordova');
  Platform.is.electron && cls.push('electron');

  if (Platform.is.ie && Platform.is.versionNumber === 11) {
    cls.forEach(function (c) { return document.body.classList.add(c); });
  }
  else {
    document.body.classList.add.apply(document.body.classList, cls);
  }

  if (Platform.is.ios) {
    // needed for iOS button active state
    document.body.addEventListener('touchstart', function () {});
  }
}

function install (_Vue, opts) {
  if ( opts === void 0 ) opts = {};

  if (this.__installed) {
    return
  }
  this.__installed = true;

  var $q = {
    version: version,
    theme: "ios"
  };

  // required plugins
  Platform.install({ $q: $q });
  History.install();
  i18n.install({ $q: $q, Vue: _Vue, lang: opts.i18n });
  icons.install({ $q: $q, Vue: _Vue, iconSet: opts.iconSet });

  if (!isSSR) {
    ready(bodyInit);
  }

  if (opts.directives) {
    Object.keys(opts.directives).forEach(function (key) {
      var d = opts.directives[key];
      if (d.name !== undefined && d.unbind !== void 0) {
        _Vue.directive(d.name, d);
      }
    });
  }

  if (opts.components) {
    Object.keys(opts.components).forEach(function (key) {
      var c = opts.components[key];
      if (c.name !== undefined && (c.render !== void 0 || c.mixins !== void 0)) {
        _Vue.component(c.name, c);
      }
    });
  }

  if (opts.plugins) {
    Object.keys(opts.plugins).forEach(function (key) {
      var p = opts.plugins[key];
      if (typeof p.install === 'function') {
        p.install({ $q: $q, Vue: _Vue });
      }
    });
  }

  _Vue.prototype.$q = $q;
}

var handlers = [];

var EscapeKey = {
  __installed: false,
  __install: function __install () {
    this.__installed = true;
    window.addEventListener('keyup', function (evt) {
      if (handlers.length === 0) {
        return
      }

      if (evt.which === 27 || evt.keyCode === 27) {
        handlers[handlers.length - 1]();
      }
    });
  },

  register: function register (handler) {
    if (Platform.is.desktop) {
      if (!this.__installed) {
        this.__install();
      }

      handlers.push(handler);
    }
  },

  pop: function pop () {
    if (Platform.is.desktop) {
      handlers.pop();
    }
  }
}

var
  toString = Object.prototype.toString,
  hasOwn = Object.prototype.hasOwnProperty,
  class2type = {};

'Boolean Number String Function Array Date RegExp Object'.split(' ').forEach(function (name) {
  class2type['[object ' + name + ']'] = name.toLowerCase();
});

function type (obj) {
  return obj === null ? String(obj) : class2type[toString.call(obj)] || 'object'
}

function isPlainObject (obj) {
  if (!obj || type(obj) !== 'object') {
    return false
  }

  if (obj.constructor &&
    !hasOwn.call(obj, 'constructor') &&
    !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false
  }

  var key;
  for (key in obj) {}

  return key === undefined || hasOwn.call(obj, key)
}

function extend () {
  var arguments$1 = arguments;

  var
    options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }

  if (Object(target) !== target && type(target) !== 'function') {
    target = {};
  }

  if (length === i) {
    target = this;
    i--;
  }

  for (; i < length; i++) {
    if ((options = arguments$1[i]) !== null) {
      for (name in options) {
        src = target[name];
        copy = options[name];

        if (target === copy) {
          continue
        }

        if (deep && copy && (isPlainObject(copy) || (copyIsArray = type(copy) === 'array'))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && type(src) === 'array' ? src : [];
          }
          else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extend(deep, clone, copy);
        }
        else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target
}

/* eslint prefer-promise-reject-errors: 0 */

var ModelToggleMixin = {
  props: {
    value: Boolean
  },
  data: function data () {
    return {
      showing: false
    }
  },
  watch: {
    value: function value (val) {
      var this$1 = this;

      if (this.disable && val) {
        this.$emit('input', false);
        return
      }

      this.$nextTick(function () {
        if (this$1.value !== this$1.showing) {
          this$1[val ? 'show' : 'hide']();
        }
      });
    }
  },
  methods: {
    toggle: function toggle (evt) {
      return this[this.showing ? 'hide' : 'show'](evt)
    },
    show: function show (evt) {
      var this$1 = this;

      if (this.disable || this.showing) {
        return this.showPromise || Promise.resolve(evt)
      }

      this.hidePromise && this.hidePromiseReject();

      this.showing = true;
      if (this.value === false) {
        this.$emit('input', true);
      }

      if (this.$options.modelToggle === void 0 || this.$options.modelToggle.history) {
        this.__historyEntry = {
          handler: this.hide
        };
        History.add(this.__historyEntry);
      }

      if (!this.__show) {
        this.$emit('show', evt);
        return Promise.resolve(evt)
      }

      this.showPromise = new Promise(function (resolve, reject) {
        this$1.showPromiseResolve = function () {
          this$1.showPromise = null;
          this$1.$emit('show', evt);
          resolve(evt);
        };
        this$1.showPromiseReject = function () {
          this$1.showPromise = null;
          reject(null); // eslint prefer-promise-reject-errors: 0
        };
      });

      this.__show(evt);
      return this.showPromise || Promise.resolve(evt)
    },
    hide: function hide (evt) {
      var this$1 = this;

      if (this.disable || !this.showing) {
        return this.hidePromise || Promise.resolve(evt)
      }

      this.showPromise && this.showPromiseReject();

      this.showing = false;
      if (this.value === true) {
        this.$emit('input', false);
      }

      if (this.__historyEntry) {
        History.remove(this.__historyEntry);
        this.__historyEntry = null;
      }

      if (!this.__hide) {
        this.$emit('hide', evt);
        return Promise.resolve()
      }

      this.hidePromise = new Promise(function (resolve, reject) {
        this$1.hidePromiseResolve = function () {
          this$1.hidePromise = null;
          this$1.$emit('hide', evt);
          resolve();
        };
        this$1.hidePromiseReject = function () {
          this$1.hidePromise = null;
          reject(null);
        };
      });

      this.__hide(evt);
      return this.hidePromise || Promise.resolve(evt)
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.showing) {
      this.showPromise && this.showPromiseReject();
      this.hidePromise && this.hidePromiseReject();
      this.$emit('input', false);
      this.__hide && this.__hide();
    }
  }
}

var listenOpts = {};
Object.defineProperty(listenOpts, 'passive', {
  configurable: true,
  get: function get () {
    var passive;

    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get () {
          passive = { passive: true };
        }
      });
      window.addEventListener('qtest', null, opts);
      window.removeEventListener('qtest', null, opts);
    }
    catch (e) {}

    listenOpts.passive = passive;
    return passive
  },
  set: function set (val) {
    Object.defineProperty(this, 'passive', {
      value: val
    });
  }
});

function leftClick (e) {
  return e.button === 0
}

function middleClick (e) {
  return e.button === 1
}

function rightClick (e) {
  return e.button === 2
}

function getEventKey (e) {
  return e.which || e.keyCode
}

function position (e) {
  var posx, posy;

  if (e.touches && e.touches[0]) {
    e = e.touches[0];
  }
  else if (e.changedTouches && e.changedTouches[0]) {
    e = e.changedTouches[0];
  }

  if (e.clientX || e.clientY) {
    posx = e.clientX;
    posy = e.clientY;
  }
  else if (e.pageX || e.pageY) {
    posx = e.pageX - document.body.scrollLeft - document.documentElement.scrollLeft;
    posy = e.pageY - document.body.scrollTop - document.documentElement.scrollTop;
  }
  else {
    var offset = targetElement(e).getBoundingClientRect();
    posx = ((offset.right - offset.left) / 2) + offset.left;
    posy = ((offset.bottom - offset.top) / 2) + offset.top;
  }

  return {
    top: posy,
    left: posx
  }
}

function targetElement (e) {
  var target;

  if (e.target) {
    target = e.target;
  }
  else if (e.srcElement) {
    target = e.srcElement;
  }

  // defeat Safari bug
  if (target.nodeType === 3) {
    target = target.parentNode;
  }

  return target
}

function getEventPath (e) {
  if (e.path) {
    return e.path
  }
  if (e.composedPath) {
    return e.composedPath()
  }

  var path = [];
  var el = e.target;

  while (el) {
    path.push(el);

    if (el.tagName === 'HTML') {
      path.push(document);
      path.push(window);
      return path
    }

    el = el.parentElement;
  }
}

// Reasonable defaults
var
  PIXEL_STEP = 10,
  LINE_HEIGHT = 40,
  PAGE_HEIGHT = 800;

function getMouseWheelDistance (e) {
  var
    sX = 0, sY = 0, // spinX, spinY
    pX = 0, pY = 0; // pixelX, pixelY

  // Legacy
  if ('detail' in e) { sY = e.detail; }
  if ('wheelDelta' in e) { sY = -e.wheelDelta / 120; }
  if ('wheelDeltaY' in e) { sY = -e.wheelDeltaY / 120; }
  if ('wheelDeltaX' in e) { sX = -e.wheelDeltaX / 120; }

  // side scrolling on FF with DOMMouseScroll
  if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in e) { pY = e.deltaY; }
  if ('deltaX' in e) { pX = e.deltaX; }

  if ((pX || pY) && e.deltaMode) {
    if (e.deltaMode === 1) { // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    }
    else { // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
  if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }

  /*
   * spinX  -- normalized spin speed (use for zoom) - x plane
   * spinY  -- " - y plane
   * pixelX -- normalized distance (to pixels) - x plane
   * pixelY -- " - y plane
   */
  return {
    spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY
  }
}

function stopAndPrevent (e) {
  e.preventDefault();
  e.stopPropagation();
}

var event = /*#__PURE__*/Object.freeze({
listenOpts: listenOpts,
leftClick: leftClick,
middleClick: middleClick,
rightClick: rightClick,
getEventKey: getEventKey,
position: position,
targetElement: targetElement,
getEventPath: getEventPath,
getMouseWheelDistance: getMouseWheelDistance,
stopAndPrevent: stopAndPrevent
});

function getScrollTarget (el) {
  return el.closest('.scroll') || window
}

function getScrollHeight (el) {
  return (el === window ? document.body : el).scrollHeight
}

function getScrollPosition (scrollTarget) {
  if (scrollTarget === window) {
    return window.pageYOffset || window.scrollY || document.body.scrollTop || 0
  }
  return scrollTarget.scrollTop
}

function animScrollTo (el, to, duration) {
  if (duration <= 0) {
    return
  }

  var pos = getScrollPosition(el);

  window.requestAnimationFrame(function () {
    setScroll(el, pos + (to - pos) / duration * 16);
    if (el.scrollTop !== to) {
      animScrollTo(el, to, duration - 16);
    }
  });
}

function setScroll (scrollTarget, offset$$1) {
  if (scrollTarget === window) {
    document.documentElement.scrollTop = offset$$1;
    document.body.scrollTop = offset$$1;
    return
  }
  scrollTarget.scrollTop = offset$$1;
}

function setScrollPosition (scrollTarget, offset$$1, duration) {
  if (duration) {
    animScrollTo(scrollTarget, offset$$1, duration);
    return
  }
  setScroll(scrollTarget, offset$$1);
}

var size;
function getScrollbarWidth () {
  if (size !== undefined) {
    return size
  }

  var
    inner = document.createElement('p'),
    outer = document.createElement('div');

  css(inner, {
    width: '100%',
    height: '200px'
  });
  css(outer, {
    position: 'absolute',
    top: '0px',
    left: '0px',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;

  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  document.body.removeChild(outer);
  size = w1 - w2;

  return size
}

function hasScrollbar (el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false
  }

  return (
    el.classList.contains('scroll') ||
    ['auto', 'scroll'].includes(window.getComputedStyle(el)['overflow-y'])
  ) && el.scrollHeight > el.clientHeight
}

var scroll = /*#__PURE__*/Object.freeze({
getScrollTarget: getScrollTarget,
getScrollHeight: getScrollHeight,
getScrollPosition: getScrollPosition,
animScrollTo: animScrollTo,
setScrollPosition: setScrollPosition,
getScrollbarWidth: getScrollbarWidth,
hasScrollbar: hasScrollbar
});

var registered = 0;

function onWheel (e) {
  if (shouldPreventScroll(e)) {
    e.preventDefault();
  }
}

function shouldPreventScroll (e) {
  if (e.target === document.body) {
    return true
  }

  var
    path = getEventPath(e),
    delta = e.deltaY || -e.wheelDelta;

  for (var index = 0; index < path.length; index++) {
    var el = path[index];

    if (hasScrollbar(el)) {
      return delta < 0 && el.scrollTop === 0
        ? true
        : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight
    }
  }

  return true
}

var PreventScroll = {
  methods: {
    __preventScroll: function __preventScroll (register) {
      registered += register ? 1 : -1;
      if (registered > 1) { return }

      var action = register ? 'add' : 'remove';

      if (this.$q.platform.is.mobile) {
        document.body.classList[action]('q-body-prevent-scroll');
      }
      else if (this.$q.platform.is.desktop) {
        window[(action + "EventListener")]('wheel', onWheel);
      }
    }
  }
}

var positions = {
  top: 'items-start justify-center with-backdrop',
  bottom: 'items-end justify-center with-backdrop',
  right: 'items-center justify-end with-backdrop',
  left: 'items-center justify-start with-backdrop'
};
var positionCSS = {
    maxHeight: '80vh',
    height: 'auto',
    boxShadow: 'none'
  };

function additionalCSS (position) {
  var css = {};

  if (['left', 'right'].includes(position)) {
    css.maxWidth = '90vw';
  }
  {
    if (['left', 'top'].includes(position)) {
      css.borderTopLeftRadius = 0;
    }
    if (['right', 'top'].includes(position)) {
      css.borderTopRightRadius = 0;
    }
    if (['left', 'bottom'].includes(position)) {
      css.borderBottomLeftRadius = 0;
    }
    if (['right', 'bottom'].includes(position)) {
      css.borderBottomRightRadius = 0;
    }
  }

  return css
}

var modals = {
  responsive: 0,
  maximized: 0
};

var QModal = {
  name: 'QModal',
  mixins: [ModelToggleMixin, PreventScroll],
  provide: function provide () {
    return {
      __qmodal: true
    }
  },
  props: {
    position: {
      type: String,
      default: '',
      validator: function validator (val) {
        return val === '' || ['top', 'bottom', 'left', 'right'].includes(val)
      }
    },
    transition: String,
    enterClass: String,
    leaveClass: String,
    positionClasses: {
      type: String,
      default: 'flex-center'
    },
    contentClasses: [Object, Array, String],
    contentCss: [Object, Array, String],
    noBackdropDismiss: {
      type: Boolean,
      default: false
    },
    noEscDismiss: {
      type: Boolean,
      default: false
    },
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    minimized: Boolean,
    maximized: Boolean
  },
  watch: {
    $route: function $route () {
      if (!this.noRouteDismiss) {
        this.hide();
      }
    }
  },
  computed: {
    modalClasses: function modalClasses () {
      var cls = this.position
        ? positions[this.position]
        : this.positionClasses;
      if (this.maximized) {
        return ['maximized', cls]
      }
      else if (this.minimized) {
        return ['minimized', cls]
      }
      return cls
    },
    transitionProps: function transitionProps () {
      if (this.position) {
        return { name: ("q-modal-" + (this.position)) }
      }
      if (this.enterClass || this.leaveClass) {
        return {
          enterActiveClass: this.enterClass,
          leaveActiveClass: this.leaveClass
        }
      }
      return { name: this.transition || 'q-modal' }
    },
    modalCss: function modalCss () {
      if (this.position) {
        var css = Array.isArray(this.contentCss)
          ? this.contentCss
          : [this.contentCss];

        css.unshift(extend(
          {},
          positionCSS,
          additionalCSS(this.position)
        ));

        return css
      }

      return this.contentCss
    }
  },
  methods: {
    __dismiss: function __dismiss () {
      var this$1 = this;

      if (this.noBackdropDismiss) {
        return
      }
      this.hide().then(function () {
        this$1.$emit('dismiss');
      });
    },
    __show: function __show () {
      var this$1 = this;

      if (!this.noRefocus) {
        this.__refocusTarget = document.activeElement;
      }
      var body = document.body;

      body.appendChild(this.$el);
      this.__register(true);
      this.__preventScroll(true);

      EscapeKey.register(function () {
        if (!this$1.noEscDismiss) {
          this$1.hide().then(function () {
            this$1.$emit('escape-key');
          });
        }
      });

      var content = this.$refs.content;
      if (this.$q.platform.is.ios) {
        // workaround the iOS hover/touch issue
        content.click();
      }
      content.scrollTop = 0
      ;['modal-scroll', 'layout-view'].forEach(function (c) {
        [].slice.call(content.getElementsByClassName(c)).forEach(function (el) {
          el.scrollTop = 0;
        });
      });
    },
    __hide: function __hide () {
      EscapeKey.pop();
      this.__preventScroll(false);
      this.__register(false);
      if (!this.noRefocus && this.__refocusTarget) {
        this.__refocusTarget.focus();
      }
    },
    __stopPropagation: function __stopPropagation (e) {
      e.stopPropagation();
    },
    __register: function __register (opening) {
      var state = opening
        ? { action: 'add', step: 1 }
        : { action: 'remove', step: -1 };

      if (this.maximized) {
        modals.maximized += state.step;
        if (!opening && modals.maximized > 0) {
          return
        }
        document.body.classList[state.action]('q-maximized-modal');
      }
      else if (!this.minimized) {
        modals.responsive += state.step;
        if (!opening && modals.responsive > 0) {
          return
        }
        document.body.classList[state.action]('q-responsive-modal');
      }
    }
  },
  mounted: function mounted () {
    if (this.value) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h('transition', {
      props: this.transitionProps,
      on: {
        afterEnter: function () {
          this$1.showPromise && this$1.showPromiseResolve();
        },
        enterCancelled: function () {
          this$1.showPromise && this$1.showPromiseReject();
        },
        afterLeave: function () {
          this$1.hidePromise && this$1.hidePromiseResolve();
        },
        leaveCancelled: function () {
          this$1.hidePromise && this$1.hidePromiseReject();
        }
      }
    }, [
      h('div', {
        staticClass: 'modal fullscreen row',
        'class': this.modalClasses,
        on: {
          click: this.__dismiss
        },
        directives: [{
          name: 'show',
          value: this.showing
        }]
      }, [
        h('div', {
          ref: 'content',
          staticClass: 'modal-content scroll',
          style: this.modalCss,
          'class': this.contentClasses,
          on: {
            click: this.__stopPropagation,
            touchstart: this.__stopPropagation
          }
        }, [ this.$slots.default ])
      ])
    ])
  }
}

var QModalLayout = {
  name: 'QModalLayout',
  inject: {
    __qmodal: {
      default: function default$1 () {
        console.error('QModalLayout needs to be child of QModal');
      }
    }
  },
  props: {
    headerStyle: [String, Object, Array],
    headerClass: [String, Object, Array],

    contentStyle: [String, Object, Array],
    contentClass: [String, Object, Array],

    footerStyle: [String, Object, Array],
    footerClass: [String, Object, Array]
  },
  render: function render (h) {
    var child = [];

    if (this.$slots.header || ("ios" !== 'ios' && this.$slots.navigation)) {
      child.push(h('div', {
        staticClass: 'q-layout-header',
        style: this.headerStyle,
        'class': this.headerClass
      }, [
        this.$slots.header,
        null
      ]));
    }

    child.push(h('div', {
      staticClass: 'q-modal-layout-content col scroll',
      style: this.contentStyle,
      'class': this.contentClass
    }, [
      this.$slots.default
    ]));

    if (this.$slots.footer || ("ios" === 'ios' && this.$slots.navigation)) {
      child.push(h('div', {
        staticClass: 'q-layout-footer',
        style: this.footerStyle,
        'class': this.footerClass
      }, [
        this.$slots.footer,
        this.$slots.navigation
      ]));
    }

    return h('div', {
      staticClass: 'q-modal-layout column absolute-full'
    }, child)
  }
}

var prefix$1 = 'ios';

var QIcon = {
  name: 'QIcon',
  props: {
    name: String,
    color: String,
    size: String
  },
  computed: {
    classes: function classes () {
      var cls;
      var icon = this.name;

      if (!icon) {
        return ''
      }
      else if (/^fa[s|r|l|b]{0,1} /.test(icon) || icon.startsWith('icon-')) {
        cls = icon;
      }
      else if (icon.startsWith('bt-')) {
        cls = "bt " + icon;
      }
      else if (/^ion-(md|ios|logo)/.test(icon)) {
        cls = "ionicons " + icon;
      }
      else if (icon.startsWith('ion-')) {
        cls = "ionicons ion-" + prefix$1 + (icon.substr(3));
      }
      else if (icon.startsWith('mdi-')) {
        cls = "mdi " + icon;
      }
      else {
        cls = 'material-icons';
      }

      return this.color
        ? (cls + " text-" + (this.color))
        : cls
    },
    content: function content () {
      return this.classes.startsWith('material-icons')
        ? this.name.replace(/ /g, '_')
        : ' '
    },
    style: function style () {
      if (this.size) {
        return { fontSize: this.size }
      }
    }
  },
  render: function render (h) {
    return h('i', {
      staticClass: 'q-icon',
      'class': this.classes,
      style: this.style,
      attrs: { 'aria-hidden': true }
    }, [
      this.content,
      this.$slots.default
    ])
  }
}

function textStyle (n) {
  return n === void 0 || n < 2
    ? {}
    : {overflow: 'hidden', display: '-webkit-box', '-webkit-box-orient': 'vertical', '-webkit-line-clamp': n}
}

var ItemMixin = {
  props: {
    dark: Boolean,

    link: Boolean,
    dense: Boolean,
    sparse: Boolean,
    separator: Boolean,
    insetSeparator: Boolean,
    multiline: Boolean,
    highlight: Boolean,

    icon: String,
    rightIcon: String,
    image: String,
    rightImage: String,
    avatar: String,
    rightAvatar: String,
    letter: String,
    rightLetter: String,
    label: String,
    sublabel: String,
    labelLines: [String, Number],
    sublabelLines: [String, Number],

    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    itemClasses: function itemClasses () {
      return {
        'q-item': true,
        'q-item-division': true,
        'relative-position': true,
        'q-item-dark': this.dark,
        'q-item-dense': this.dense,
        'q-item-sparse': this.sparse,
        'q-item-separator': this.separator,
        'q-item-inset-separator': this.insetSeparator,
        'q-item-multiline': this.multiline,
        'q-item-highlight': this.highlight,
        'q-item-link': this.to || this.link
      }
    }
  }
}

var routerLinkEventName = 'qrouterlinkclick';

var evt = null;

if (!isSSR) {
  try {
    evt = new Event(routerLinkEventName);
  }
  catch (e) {
    // IE doesn't support `new Event()`, so...`
    evt = document.createEvent('Event');
    evt.initEvent(routerLinkEventName, true, false);
  }
}

var RouterLinkMixin = {
  props: {
    to: [String, Object],
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    event: [String, Array],
    activeClass: String,
    exactActiveClass: String
  },
  data: function data () {
    return {
      routerLinkEventName: routerLinkEventName
    }
  }
};

var QItem = {
  name: 'QItem',
  mixins: [
    ItemMixin,
    { props: RouterLinkMixin.props }
  ],
  props: {
    active: Boolean,
    link: Boolean
  },
  computed: {
    classes: function classes () {
      var cls = this.itemClasses;
      return this.to !== void 0
        ? cls
        : [{active: this.active}, cls]
    }
  },
  render: function render (h) {
    return this.to !== void 0
      ? h('router-link', { props: this.$props, 'class': this.classes }, [ this.$slots.default ])
      : h(this.tag, { 'class': this.classes }, [ this.$slots.default ])
  }
}

var QItemSeparator = {
  name: 'QItemSeparator',
  props: {
    inset: Boolean
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-item-separator-component',
      'class': {
        'q-item-separator-inset-component': this.inset
      }
    }, [
      this.$slots.default
    ])
  }
}

function text (h, name, val, n) {
  n = parseInt(n, 10);
  return h('div', {
    staticClass: ("q-item-" + name + (n === 1 ? ' ellipsis' : '')),
    style: textStyle(n)
  }, [ val ])
}

var QItemMain = {
  name: 'QItemMain',
  props: {
    label: String,
    labelLines: [String, Number],
    sublabel: String,
    sublabelLines: [String, Number],
    inset: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-item-main q-item-section',
      'class': {
        'q-item-main-inset': this.inset
      }
    }, [
      this.label ? text(h, 'label', this.label, this.labelLines) : null,
      this.sublabel ? text(h, 'sublabel', this.sublabel, this.sublabelLines) : null,
      this.$slots.default
    ])
  }
}

var QItemSide = {
  name: 'QItemSide',
  props: {
    right: Boolean,

    icon: String,
    letter: {
      type: String,
      validator: function (v) { return v.length === 1; }
    },
    inverted: Boolean, // for icon and letter only

    avatar: String,
    image: String,
    stamp: String,

    color: String,
    textColor: String // only for inverted icon/letter
  },
  computed: {
    type: function type () {
      var this$1 = this;

      return ['icon', 'image', 'avatar', 'letter', 'stamp'].find(function (type) { return this$1[type]; })
    },
    classes: function classes () {
      var cls = [ ("q-item-side-" + (this.right ? 'right' : 'left')) ];

      if (this.color && (!this.icon && !this.letter)) {
        cls.push(("text-" + (this.color)));
      }

      return cls
    },
    typeClasses: function typeClasses () {
      var cls = [ ("q-item-" + (this.type)) ];

      if (this.color) {
        if (this.inverted && (this.icon || this.letter)) {
          cls.push(("bg-" + (this.color)));
        }
        else if (!this.textColor) {
          cls.push(("text-" + (this.color)));
        }
      }
      this.textColor && cls.push(("text-" + (this.textColor)));

      if (this.inverted && (this.icon || this.letter)) {
        cls.push('q-item-inverted');
        cls.push('flex');
        cls.push('flex-center');
      }

      return cls
    },
    imagePath: function imagePath () {
      return this.image || this.avatar
    }
  },
  render: function render (h) {
    var child;

    if (this.type) {
      if (this.icon) {
        child = h(QIcon, {
          'class': this.inverted ? null : this.typeClasses,
          props: { name: this.icon }
        });

        if (this.inverted) {
          child = h('div', {
            'class': this.typeClasses
          }, [ child ]);
        }
      }
      else if (this.imagePath) {
        child = h('img', {
          'class': this.typeClasses,
          attrs: { src: this.imagePath }
        });
      }
      else {
        child = h('div', { 'class': this.typeClasses }, [ this.stamp || this.letter ]);
      }
    }

    return h('div', {
      staticClass: 'q-item-side q-item-section',
      'class': this.classes
    }, [
      child,
      this.$slots.default
    ])
  }
}

var QItemTile = {
  name: 'QItemTile',
  props: {
    icon: String,
    letter: Boolean,
    inverted: Boolean, // for icon and letter only

    image: Boolean,
    avatar: Boolean,
    stamp: Boolean,

    label: Boolean,
    sublabel: Boolean,
    lines: [Number, String],

    tag: {
      type: String,
      default: 'div'
    },

    color: String,
    textColor: String // only for inverted icon/letter
  },
  computed: {
    hasLines: function hasLines () {
      return (this.label || this.sublabel) && this.lines
    },
    type: function type () {
      var this$1 = this;

      return ['icon', 'label', 'sublabel', 'image', 'avatar', 'letter', 'stamp'].find(function (type) { return this$1[type]; })
    },
    classes: function classes () {
      var cls = [];

      if (this.color) {
        if (this.inverted) {
          cls.push(("bg-" + (this.color)));
        }
        else if (!this.textColor) {
          cls.push(("text-" + (this.color)));
        }
      }
      this.textColor && cls.push(("text-" + (this.textColor)));
      this.type && cls.push(("q-item-" + (this.type)));

      if (this.inverted && (this.icon || this.letter)) {
        cls.push('q-item-inverted');
        cls.push('flex');
        cls.push('flex-center');
      }

      if (this.hasLines && (this.lines === '1' || this.lines === 1)) {
        cls.push('ellipsis');
      }

      return cls
    },
    style: function style () {
      if (this.hasLines) {
        return textStyle(this.lines)
      }
    }
  },
  render: function render (h) {
    var data = {
      'class': this.classes,
      style: this.style
    };

    if (this.icon) {
      if (this.inverted) {
        return h(this.tag, data, [
          h(QIcon, { props: { name: this.icon } }, [ this.$slots.default ])
        ])
      }
      data.props = { name: this.icon };
    }

    return h(this.icon ? QIcon : this.tag, data, [ this.$slots.default ])
  }
}

function push (child, h, name, slot, replace, conf) {
  var defaultProps = { props: { right: conf.right } };

  if (slot && replace) {
    child.push(h(name, defaultProps, slot));
    return
  }

  var v = false;
  for (var p in conf) {
    if (conf.hasOwnProperty(p)) {
      v = conf[p];
      if (v !== void 0 && v !== true) {
        child.push(h(name, { props: conf }));
        break
      }
    }
  }

  slot && child.push(h(name, defaultProps, slot));
}

var QItemWrapper = {
  name: 'QItemWrapper',
  props: {
    cfg: {
      type: Object,
      default: function () { return ({}); }
    },
    slotReplace: Boolean
  },
  render: function render (h) {
    var
      cfg = this.cfg,
      replace = this.slotReplace,
      child = [];

    push(child, h, QItemSide, this.$slots.left, replace, {
      icon: cfg.icon,
      color: cfg.leftColor,
      avatar: cfg.avatar,
      letter: cfg.letter,
      image: cfg.image,
      inverted: cfg.leftInverted,
      textColor: cfg.leftTextColor
    });

    push(child, h, QItemMain, this.$slots.main, replace, {
      label: cfg.label,
      sublabel: cfg.sublabel,
      labelLines: cfg.labelLines,
      sublabelLines: cfg.sublabelLines,
      inset: cfg.inset
    });

    push(child, h, QItemSide, this.$slots.right, replace, {
      right: true,
      icon: cfg.rightIcon,
      color: cfg.rightColor,
      avatar: cfg.rightAvatar,
      letter: cfg.rightLetter,
      image: cfg.rightImage,
      stamp: cfg.stamp,
      inverted: cfg.rightInverted,
      textColor: cfg.rightTextColor
    });

    child.push(this.$slots.default);

    return h(QItem, {
      attrs: this.$attrs,
      on: this.$listeners,
      props: cfg
    }, child)
  }
}

var QList = {
  name: 'QList',
  props: {
    noBorder: Boolean,
    dark: Boolean,
    dense: Boolean,
    sparse: Boolean,
    striped: Boolean,
    stripedOdd: Boolean,
    separator: Boolean,
    insetSeparator: Boolean,
    multiline: Boolean,
    highlight: Boolean,
    link: Boolean
  },
  computed: {
    classes: function classes () {
      return {
        'no-border': this.noBorder,
        'q-list-dark': this.dark,
        'q-list-dense': this.dense,
        'q-list-sparse': this.sparse,
        'q-list-striped': this.striped,
        'q-list-striped-odd': this.stripedOdd,
        'q-list-separator': this.separator,
        'q-list-inset-separator': this.insetSeparator,
        'q-list-multiline': this.multiline,
        'q-list-highlight': this.highlight,
        'q-list-link': this.link
      }
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-list',
      'class': this.classes
    }, [
      this.$slots.default
    ])
  }
}

var QListHeader = {
  name: 'QListHeader',
  props: {
    inset: Boolean
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-list-header',
      'class': {
        'q-list-header-inset': this.inset
      }
    }, [
      this.$slots.default
    ])
  }
}

var QActionSheet = {
  name: 'QActionSheet',
  props: {
    value: Boolean,
    title: String,
    grid: Boolean,
    actions: Array,
    dismissLabel: String
  },
  computed: {
    contentCss: function contentCss () {
      {
        return {backgroundColor: 'transparent'}
      }
    }
  },
  render: function render (h) {
    var this$1 = this;

    var
      child = [],
      title = this.$slots.title || this.title;

    if (title) {
      child.push(
        h('div', {
          staticClass: 'q-actionsheet-title column justify-center'
        }, [ title ])
      );
    }

    child.push(
      h(
        'div',
        { staticClass: 'q-actionsheet-body scroll' },
        this.actions
          ? [
            this.grid
              ? h('div', { staticClass: 'q-actionsheet-grid row wrap items-center justify-between' }, this.__getActions(h))
              : h(QList, { staticClass: 'no-border', props: { link: true } }, this.__getActions(h))
          ]
          : [ this.$slots.default ]
      )
    );

    {
      child = [
        h('div', { staticClass: 'q-actionsheet' }, child),
        h('div', { staticClass: 'q-actionsheet' }, [
          h(QItem, {
            props: {
              link: true
            },
            attrs: {
              tabindex: 0
            },
            nativeOn: {
              click: this.__onCancel,
              keydown: this.__onKeyCancel
            }
          }, [
            h(QItemMain, { staticClass: 'text-center text-primary' }, [
              this.dismissLabel || this.$q.i18n.label.cancel
            ])
          ])
        ])
      ];
    }

    return h(QModal, {
      ref: 'modal',
      props: {
        value: this.value,
        position: 'bottom',
        contentCss: this.contentCss
      },
      on: {
        input: function (val) {
          this$1.$emit('input', val);
        },
        show: function () {
          this$1.$emit('show');
        },
        hide: function () {
          this$1.$emit('hide');
        },
        dismiss: function () {
          this$1.$emit('cancel');
        },
        'escape-key': function () {
          this$1.$emit('escape-key');
          this$1.$emit('cancel');
        }
      }
    }, child)
  },
  methods: {
    show: function show () {
      return this.$refs.modal.show()
    },
    hide: function hide () {
      return this.$refs.modal.hide()
    },
    __getActions: function __getActions (h) {
      var this$1 = this;

      return this.actions.map(function (action) {
        var obj;

        return action.label
        ? h(this$1.grid ? 'div' : QItem, ( obj = {
          staticClass: this$1.grid
            ? 'q-actionsheet-grid-item cursor-pointer relative-position column inline flex-center'
            : null,
          'class': action.classes,
          attrs: {
            tabindex: 0
          }
        }, obj[this$1.grid ? 'on' : 'nativeOn'] = {
            click: function () { return this$1.__onOk(action); },
            keydown: function (e) {
              if (getEventKey(e) === /* Enter */ 13) {
                this$1.__onOk(action);
              }
            }
          }, obj), this$1.grid
          ? [
            action.icon ? h(QIcon, { props: { name: action.icon, color: action.color } }) : null,
            action.avatar ? h('img', { domProps: { src: action.avatar }, staticClass: 'avatar' }) : null,
            h('span', [ action.label ])
          ]
          : [
            h(QItemSide, { props: { icon: action.icon, color: action.color, avatar: action.avatar } }),
            h(QItemMain, { props: { inset: true, label: action.label } })
          ]
        )
        : h(QItemSeparator, { staticClass: 'col-12' });
      }
      )
    },
    __onOk: function __onOk (action) {
      var this$1 = this;

      this.hide().then(function () {
        if (typeof action.handler === 'function') {
          action.handler();
        }
        this$1.$emit('ok', action);
      });
    },
    __onCancel: function __onCancel () {
      var this$1 = this;

      this.hide().then(function () {
        this$1.$emit('cancel');
      });
    },
    __onKeyCancel: function __onKeyCancel (e) {
      if (getEventKey(e) === /* Enter */ 13) {
        this.__onCancel();
      }
    }
  }
}

var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];

function humanStorageSize (bytes) {
  var u = 0;

  while (parseInt(bytes, 10) >= 1024 && u < units.length - 1) {
    bytes /= 1024;
    ++u;
  }

  return ((bytes.toFixed(1)) + " " + (units[u]))
}

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function between (v, min, max) {
  if (max <= min) {
    return min
  }
  return Math.min(max, Math.max(min, v))
}

function normalizeToInterval (v, min, max) {
  if (max <= min) {
    return min
  }

  var size = (max - min + 1);

  var index = v % size;
  if (index < min) {
    index = size + index;
  }

  return index
}

function pad (v, length, char) {
  if ( length === void 0 ) length = 2;
  if ( char === void 0 ) char = '0';

  var val = '' + v;
  return val.length >= length
    ? val
    : new Array(length - val.length + 1).join(char) + val
}

var format = /*#__PURE__*/Object.freeze({
humanStorageSize: humanStorageSize,
capitalize: capitalize,
between: between,
normalizeToInterval: normalizeToInterval,
pad: pad
});

var
  xhr = isSSR ? null : XMLHttpRequest,
  send = isSSR ? null : xhr.prototype.send;
var highjackCount = 0;

function translate (ref) {
  var p = ref.p;
  var pos = ref.pos;
  var active = ref.active;
  var horiz = ref.horiz;
  var reverse = ref.reverse;
  var dir = ref.dir;

  var x = 1, y = 1;

  if (horiz) {
    if (reverse) { x = -1; }
    if (pos === 'bottom') { y = -1; }
    return cssTransform(("translate3d(" + (x * (p - 100)) + "%, " + (active ? 0 : y * -200) + "%, 0)"))
  }

  if (reverse) { y = -1; }
  if (pos === 'right') { x = -1; }

  return cssTransform(("translate3d(" + (active ? 0 : dir * x * -200) + "%, " + (y * (p - 100)) + "%, 0)"))
}

function inc (p, amount) {
  if (typeof amount !== 'number') {
    if (p < 25) {
      amount = Math.random() * (5 - 3 + 1) + 3;
    }
    else if (p < 65) {
      amount = Math.random() * 3;
    }
    else if (p < 85) {
      amount = Math.random() * 2;
    }
    else if (p < 99) {
      amount = 0.5;
    }
    else {
      amount = 0;
    }
  }
  return between(p + amount, 0, 100)
}

function highjackAjax (startHandler, endHandler) {
  xhr.prototype.send = function () {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    startHandler();

    this.addEventListener('abort', endHandler, false);
    this.addEventListener('readystatechange', function () {
      if (this$1.readyState === 4) {
        endHandler();
      }
    }, false);

    send.apply(this, args);
  };
  highjackCount += 1;
}

function restoreAjax () {
  highjackCount = Math.max(0, highjackCount - 1);
  if (!highjackCount) {
    xhr.prototype.send = send;
  }
}

var QAjaxBar = {
  name: 'QAjaxBar',
  props: {
    position: {
      type: String,
      default: 'top',
      validator: function validator (val) {
        return ['top', 'right', 'bottom', 'left'].includes(val)
      }
    },
    size: {
      type: String,
      default: '4px'
    },
    color: {
      type: String,
      default: 'red'
    },
    speed: {
      type: Number,
      default: 250
    },
    delay: {
      type: Number,
      default: 1000
    },
    reverse: Boolean
  },
  data: function data () {
    return {
      animate: false,
      active: false,
      progress: 0,
      calls: 0
    }
  },
  computed: {
    classes: function classes () {
      return [
        this.position,
        this.animate ? '' : 'no-transition'
      ]
    },
    innerClasses: function innerClasses () {
      return ("bg-" + (this.color))
    },
    style: function style$$1 () {
      var reverse = this.$q.i18n.rtl && ['top', 'bottom'].includes(this.position)
        ? !this.reverse
        : this.reverse;
      var o = translate({
        p: this.progress,
        pos: this.position,
        active: this.active,
        horiz: this.horizontal,
        reverse: reverse,
        dir: this.$q.i18n.rtl ? -1 : 1
      });
      o[this.sizeProp] = this.size;
      return o
    },
    horizontal: function horizontal () {
      return this.position === 'top' || this.position === 'bottom'
    },
    sizeProp: function sizeProp () {
      return this.horizontal ? 'height' : 'width'
    }
  },
  methods: {
    start: function start () {
      var this$1 = this;

      this.calls++;
      if (!this.active) {
        this.progress = 0;
        this.active = true;
        this.animate = false;
        this.$emit('start');
        this.timer = setTimeout(function () {
          this$1.animate = true;
          this$1.move();
        }, this.delay);
      }
      else if (this.closing) {
        this.closing = false;
        clearTimeout(this.timer);
        this.progress = 0;
        this.move();
      }
    },
    increment: function increment (amount) {
      if (this.active) {
        this.progress = inc(this.progress, amount);
      }
    },
    stop: function stop () {
      var this$1 = this;

      this.calls = Math.max(0, this.calls - 1);
      if (this.calls > 0) {
        return
      }

      clearTimeout(this.timer);

      if (!this.animate) {
        this.active = false;
        return
      }
      this.closing = true;
      this.progress = 100;
      this.$emit('stop');
      this.timer = setTimeout(function () {
        this$1.closing = false;
        this$1.active = false;
      }, 1050);
    },
    move: function move () {
      var this$1 = this;

      this.timer = setTimeout(function () {
        this$1.increment();
        this$1.move();
      }, this.speed);
    }
  },
  mounted: function mounted () {
    highjackAjax(this.start, this.stop);
  },
  beforeDestroy: function beforeDestroy () {
    if (!isSSR) {
      clearTimeout(this.timer);
      restoreAjax();
    }
  },
  render: function render (h) {
    if (isSSR) { return }

    return h('div', {
      staticClass: 'q-loading-bar shadow-4',
      'class': this.classes,
      style: this.style
    }, [
      h('div', {
        staticClass: 'q-loading-bar-inner',
        'class': this.innerClasses
      })
    ])
  }
}

function showRipple (evt, el, stopPropagation) {
  if (stopPropagation) {
    evt.stopPropagation();
  }

  var
    container = document.createElement('span'),
    animNode = document.createElement('span');

  container.appendChild(animNode);
  container.className = 'q-ripple-container';

  var size = el.clientWidth > el.clientHeight ? el.clientWidth : el.clientHeight;
  size = (size * 2) + "px";
  animNode.className = 'q-ripple-animation';
  css(animNode, { width: size, height: size });

  el.appendChild(container);

  var
    offset$$1 = el.getBoundingClientRect(),
    pos = position(evt),
    x = pos.left - offset$$1.left,
    y = pos.top - offset$$1.top;

  animNode.classList.add('q-ripple-animation-enter', 'q-ripple-animation-visible');
  css(animNode, cssTransform(("translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(.001)")));

  setTimeout(function () {
    animNode.classList.remove('q-ripple-animation-enter');
    css(animNode, cssTransform(("translate(-50%, -50%) translate(" + x + "px, " + y + "px)")));
    setTimeout(function () {
      animNode.classList.remove('q-ripple-animation-visible');
      setTimeout(function () {
        animNode.parentNode.remove();
      }, 300);
    }, 400);
  }, 25);
}

function shouldAbort (ref) {
  var mat = ref.mat;
  var ios = ref.ios;

  return (
    (mat && "ios" !== 'mat') ||
    (ios && "ios" !== 'ios')
  )
}

var Ripple = {
  name: 'ripple',
  inserted: function inserted (el, ref) {
    var value = ref.value;
    var modifiers = ref.modifiers;

    if (shouldAbort(modifiers)) {
      return
    }

    var ctx = {
      enabled: value !== false,
      click: function click (evt) {
        if (ctx.enabled) {
          showRipple(evt, el, modifiers.stop);
        }
      }
    };

    el.__qripple = ctx;
    el.addEventListener('click', ctx.click, false);
  },
  update: function update (el, ref) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    if (el.__qripple && value !== oldValue) {
      el.__qripple.enabled = value !== false;
    }
  },
  unbind: function unbind (el, ref) {
    var modifiers = ref.modifiers;

    var ctx = el.__qripple;
    if (!ctx || shouldAbort(modifiers)) {
      return
    }

    el.removeEventListener('click', ctx.click, false);
    delete el.__qripple;
  }
}

var alignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
  between: 'between',
  around: 'around'
};

var AlignMixin = {
  props: {
    align: {
      type: String,
      default: 'center',
      validator: function (v) { return ['left', 'right', 'center', 'between', 'around'].includes(v); }
    }
  },
  computed: {
    alignClass: function alignClass () {
      return ("justify-" + (alignMap[this.align]))
    }
  }
}

var sizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24,
  form: 12.446,
  'form-label': 17.11,
  'form-hide-underline': 9.335,
  'form-label-hide-underline': 14,
  'form-inverted': 15.555,
  'form-label-inverted': 20.22
};

var BtnMixin = {
  mixins: [AlignMixin],
  components: {
    QIcon: QIcon
  },
  directives: {
    Ripple: Ripple
  },
  props: {
    loading: Boolean,
    disable: Boolean,
    label: [Number, String],
    noCaps: Boolean,
    noWrap: Boolean,
    icon: String,
    iconRight: String,
    round: Boolean,
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    push: Boolean,
    size: String,
    fab: Boolean,
    fabMini: Boolean,
    color: String,
    textColor: String,
    glossy: Boolean,
    dense: Boolean,
    noRipple: Boolean,
    tabindex: Number
  },
  computed: {
    style: function style () {
      if (this.size && !this.fab && !this.fabMini) {
        return {
          fontSize: this.size in sizes ? ((sizes[this.size]) + "px") : this.size
        }
      }
    },
    isRectangle: function isRectangle () {
      return !this.isRound
    },
    isRound: function isRound () {
      return this.round || this.fab || this.fabMini
    },
    shape: function shape () {
      return ("q-btn-" + (this.isRound ? 'round' : 'rectangle'))
    },
    isDisabled: function isDisabled () {
      return this.disable || this.loading
    },
    hasRipple: function hasRipple () {
      return "ios" === 'mat' && !this.noRipple && !this.isDisabled
    },
    computedTabIndex: function computedTabIndex () {
      return this.isDisabled ? -1 : this.tabindex || 0
    },
    classes: function classes () {
      var cls = [ this.shape ];

      if (this.fab) {
        cls.push('q-btn-fab');
      }
      else if (this.fabMini) {
        cls.push('q-btn-fab-mini');
      }

      if (this.flat) {
        cls.push('q-btn-flat');
      }
      else if (this.outline) {
        cls.push('q-btn-outline');
      }
      else if (this.push) {
        cls.push('q-btn-push');
      }

      if (this.isDisabled) {
        cls.push('disabled');
      }
      else {
        cls.push('q-focusable q-hoverable');
      }

      if (this.color) {
        if (this.flat || this.outline) {
          cls.push(("text-" + (this.textColor || this.color)));
        }
        else {
          cls.push(("bg-" + (this.color)));
          cls.push(("text-" + (this.textColor || 'white')));
        }
      }
      else if (this.textColor) {
        cls.push(("text-" + (this.textColor)));
      }

      cls.push({
        'q-btn-no-uppercase': this.noCaps,
        'q-btn-rounded': this.rounded,
        'q-btn-dense': this.dense,
        'glossy': this.glossy
      });

      return cls
    },
    innerClasses: function innerClasses () {
      var classes = [ this.alignClass ];
      this.noWrap && classes.push('no-wrap', 'text-no-wrap');
      this.repeating && classes.push('non-selectable');
      return classes
    }
  }
}

var mixin = {
  props: {
    color: String,
    size: {
      type: [Number, String],
      default: '1em'
    }
  },
  computed: {
    classes: function classes () {
      if (this.color) {
        return ("text-" + (this.color))
      }
    }
  }
}

var DefaultSpinner = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"stroke":"currentColor","fill":"currentColor","viewBox":"0 0 64 64"}},[_c('g',{attrs:{"stroke-width":"4","stroke-linecap":"round"}},[_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(180)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":"1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(210)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":"0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(240)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(270)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(300)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(330)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(0)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(30)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(60)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(90)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(120)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(150)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":"1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'QSpinnerIos',
  mixins: [mixin]
}

var audio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 55 80","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"matrix(1 0 0 -1 0 80)"}},[_c('rect',{attrs:{"width":"10","height":"20","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"4.3s","values":"20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"15","width":"10","height":"80","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"2s","values":"80;55;33;5;75;23;73;33;12;14;60;80","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"30","width":"10","height":"50","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"1.4s","values":"50;34;78;23;56;23;34;76;80;54;21;50","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"45","width":"10","height":"30","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"2s","values":"30;45;13;80;56;72;45;76;34;23;67;30","calcMode":"linear","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'QSpinnerAudio',
  mixins: [mixin]
}

var ball = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 57 57","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"translate(1 1)","stroke-width":"2","fill":"none","fill-rule":"evenodd"}},[_c('circle',{attrs:{"cx":"5","cy":"50","r":"5"}},[_c('animate',{attrs:{"attributeName":"cy","begin":"0s","dur":"2.2s","values":"50;5;50;50","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"cx","begin":"0s","dur":"2.2s","values":"5;27;49;5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"27","cy":"5","r":"5"}},[_c('animate',{attrs:{"attributeName":"cy","begin":"0s","dur":"2.2s","from":"5","to":"5","values":"5;50;50;5","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"cx","begin":"0s","dur":"2.2s","from":"27","to":"27","values":"27;49;5;27","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"49","cy":"50","r":"5"}},[_c('animate',{attrs:{"attributeName":"cy","begin":"0s","dur":"2.2s","values":"50;50;5;50","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"cx","from":"49","to":"49","begin":"0s","dur":"2.2s","values":"49;5;27;49","calcMode":"linear","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'QSpinnerBall',
  mixins: [mixin]
}

var bars = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 135 140","xmlns":"http://www.w3.org/2000/svg"}},[_c('rect',{attrs:{"y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.5s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.5s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"30","y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.25s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.25s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"60","width":"15","height":"140","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"90","y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.25s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.25s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"120","y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.5s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.5s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'QSpinnerBars',
  mixins: [mixin]
}

var circles = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 135 135","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 67 67","to":"-360 67 67","dur":"2.5s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 67 67","to":"360 67 67","dur":"8s","repeatCount":"indefinite"}})],1)])},staticRenderFns: [],
  name: 'QSpinnerCircles',
  mixins: [mixin]
}

var comment = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid"}},[_c('rect',{attrs:{"x":"0","y":"0","width":"100","height":"100","fill":"none"}}),_c('path',{attrs:{"d":"M78,19H22c-6.6,0-12,5.4-12,12v31c0,6.6,5.4,12,12,12h37.2c0.4,3,1.8,5.6,3.7,7.6c2.4,2.5,5.1,4.1,9.1,4 c-1.4-2.1-2-7.2-2-10.3c0-0.4,0-0.8,0-1.3h8c6.6,0,12-5.4,12-12V31C90,24.4,84.6,19,78,19z","fill":"currentColor"}}),_c('circle',{attrs:{"cx":"30","cy":"47","r":"5","fill":"#fff"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","values":"0;1;1","keyTimes":"0;0.2;1","dur":"1s","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"50","cy":"47","r":"5","fill":"#fff"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","values":"0;0;1;1","keyTimes":"0;0.2;0.4;1","dur":"1s","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"70","cy":"47","r":"5","fill":"#fff"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","values":"0;0;1;1","keyTimes":"0;0.4;0.6;1","dur":"1s","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'QSpinnerComment',
  mixins: [mixin]
}

var cube = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid"}},[_c('rect',{attrs:{"x":"0","y":"0","width":"100","height":"100","fill":"none"}}),_c('g',{attrs:{"transform":"translate(25 25)"}},[_c('rect',{attrs:{"x":"-20","y":"-20","width":"40","height":"40","fill":"currentColor","opacity":"0.9"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"1.5","to":"1","repeatCount":"indefinite","begin":"0s","dur":"1s","calcMode":"spline","keySplines":"0.2 0.8 0.2 0.8","keyTimes":"0;1"}})],1)]),_c('g',{attrs:{"transform":"translate(75 25)"}},[_c('rect',{attrs:{"x":"-20","y":"-20","width":"40","height":"40","fill":"currentColor","opacity":"0.8"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"1.5","to":"1","repeatCount":"indefinite","begin":"0.1s","dur":"1s","calcMode":"spline","keySplines":"0.2 0.8 0.2 0.8","keyTimes":"0;1"}})],1)]),_c('g',{attrs:{"transform":"translate(25 75)"}},[_c('rect',{staticClass:"cube",attrs:{"x":"-20","y":"-20","width":"40","height":"40","fill":"currentColor","opacity":"0.7"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"1.5","to":"1","repeatCount":"indefinite","begin":"0.3s","dur":"1s","calcMode":"spline","keySplines":"0.2 0.8 0.2 0.8","keyTimes":"0;1"}})],1)]),_c('g',{attrs:{"transform":"translate(75 75)"}},[_c('rect',{staticClass:"cube",attrs:{"x":"-20","y":"-20","width":"40","height":"40","fill":"currentColor","opacity":"0.6"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"1.5","to":"1","repeatCount":"indefinite","begin":"0.2s","dur":"1s","calcMode":"spline","keySplines":"0.2 0.8 0.2 0.8","keyTimes":"0;1"}})],1)])])},staticRenderFns: [],
  name: 'QSpinnerCube',
  mixins: [mixin]
}

var dots = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 120 30","xmlns":"http://www.w3.org/2000/svg"}},[_c('circle',{attrs:{"cx":"15","cy":"15","r":"15"}},[_c('animate',{attrs:{"attributeName":"r","from":"15","to":"15","begin":"0s","dur":"0.8s","values":"15;9;15","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":"1","to":"1","begin":"0s","dur":"0.8s","values":"1;.5;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"60","cy":"15","r":"9","fill-opacity":".3"}},[_c('animate',{attrs:{"attributeName":"r","from":"9","to":"9","begin":"0s","dur":"0.8s","values":"9;15;9","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":".5","to":".5","begin":"0s","dur":"0.8s","values":".5;1;.5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"105","cy":"15","r":"15"}},[_c('animate',{attrs:{"attributeName":"r","from":"15","to":"15","begin":"0s","dur":"0.8s","values":"15;9;15","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":"1","to":"1","begin":"0s","dur":"0.8s","values":"1;.5;1","calcMode":"linear","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'QSpinnerDots',
  mixins: [mixin]
}

var facebook = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","xmlns":"http://www.w3.org/2000/svg","preserveAspectRatio":"xMidYMid"}},[_c('g',{attrs:{"transform":"translate(20 50)"}},[_c('rect',{attrs:{"x":"-10","y":"-30","width":"20","height":"60","fill":"currentColor","opacity":"0.6"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"2","to":"1","begin":"0s","repeatCount":"indefinite","dur":"1s","calcMode":"spline","keySplines":"0.1 0.9 0.4 1","keyTimes":"0;1","values":"2;1"}})],1)]),_c('g',{attrs:{"transform":"translate(50 50)"}},[_c('rect',{attrs:{"x":"-10","y":"-30","width":"20","height":"60","fill":"currentColor","opacity":"0.8"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"2","to":"1","begin":"0.1s","repeatCount":"indefinite","dur":"1s","calcMode":"spline","keySplines":"0.1 0.9 0.4 1","keyTimes":"0;1","values":"2;1"}})],1)]),_c('g',{attrs:{"transform":"translate(80 50)"}},[_c('rect',{attrs:{"x":"-10","y":"-30","width":"20","height":"60","fill":"currentColor","opacity":"0.9"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"2","to":"1","begin":"0.2s","repeatCount":"indefinite","dur":"1s","calcMode":"spline","keySplines":"0.1 0.9 0.4 1","keyTimes":"0;1","values":"2;1"}})],1)])])},staticRenderFns: [],
  name: 'QSpinnerFacebook',
  mixins: [mixin]
}

var gears = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"translate(-20,-20)"}},[_c('path',{attrs:{"d":"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z","fill":"currentColor"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"90 50 50","to":"0 50 50","dur":"1s","repeatCount":"indefinite"}})],1)]),_c('g',{attrs:{"transform":"translate(20,20) rotate(15 50 50)"}},[_c('path',{attrs:{"d":"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z","fill":"currentColor"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"90 50 50","dur":"1s","repeatCount":"indefinite"}})],1)])])},staticRenderFns: [],
  name: 'QSpinnerGears',
  mixins: [mixin]
}

var grid = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 105 105","xmlns":"http://www.w3.org/2000/svg"}},[_c('circle',{attrs:{"cx":"12.5","cy":"12.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"0s","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"12.5","cy":"52.5","r":"12.5","fill-opacity":".5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"100ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"52.5","cy":"12.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"300ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"52.5","cy":"52.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"600ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"92.5","cy":"12.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"800ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"92.5","cy":"52.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"400ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"12.5","cy":"92.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"700ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"52.5","cy":"92.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"500ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"92.5","cy":"92.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"200ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'QSpinnerGrid',
  mixins: [mixin]
}

var hearts = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 140 64","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.716-6.002 11.47-7.65 17.304-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z","fill-opacity":".5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"0s","dur":"1.4s","values":"0.5;1;0.5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('path',{attrs:{"d":"M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.593-2.32 17.308 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z","fill-opacity":".5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"0.7s","dur":"1.4s","values":"0.5;1;0.5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('path',{attrs:{"d":"M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z"}})])},staticRenderFns: [],
  name: 'QSpinnerHearts',
  mixins: [mixin]
}

var hourglass = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',[_c('path',{staticClass:"glass",attrs:{"fill":"none","stroke":"currentColor","stroke-width":"5","stroke-miterlimit":"10","d":"M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z"}}),_c('clipPath',{attrs:{"id":"uil-hourglass-clip1"}},[_c('rect',{staticClass:"clip",attrs:{"x":"15","y":"20","width":"70","height":"25"}},[_c('animate',{attrs:{"attributeName":"height","from":"25","to":"0","dur":"1s","repeatCount":"indefinite","vlaues":"25;0;0","keyTimes":"0;0.5;1"}}),_c('animate',{attrs:{"attributeName":"y","from":"20","to":"45","dur":"1s","repeatCount":"indefinite","vlaues":"20;45;45","keyTimes":"0;0.5;1"}})])]),_c('clipPath',{attrs:{"id":"uil-hourglass-clip2"}},[_c('rect',{staticClass:"clip",attrs:{"x":"15","y":"55","width":"70","height":"25"}},[_c('animate',{attrs:{"attributeName":"height","from":"0","to":"25","dur":"1s","repeatCount":"indefinite","vlaues":"0;25;25","keyTimes":"0;0.5;1"}}),_c('animate',{attrs:{"attributeName":"y","from":"80","to":"55","dur":"1s","repeatCount":"indefinite","vlaues":"80;55;55","keyTimes":"0;0.5;1"}})])]),_c('path',{staticClass:"sand",attrs:{"d":"M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z","clip-path":"url(#uil-hourglass-clip1)","fill":"currentColor"}}),_c('path',{staticClass:"sand",attrs:{"d":"M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z","clip-path":"url(#uil-hourglass-clip2)","fill":"currentColor"}}),_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"180 50 50","repeatCount":"indefinite","dur":"1s","values":"0 50 50;0 50 50;180 50 50","keyTimes":"0;0.7;1"}})],1)])},staticRenderFns: [],
  name: 'QSpinnerHourglass',
  mixins: [mixin]
}

var infinity = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid"}},[_c('path',{attrs:{"d":"M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z","fill":"none","stroke":"currentColor","stroke-width":"8","stroke-dasharray":"10.691205342610678 10.691205342610678","stroke-dashoffset":"0"}},[_c('animate',{attrs:{"attributeName":"stroke-dashoffset","from":"0","to":"21.382410685221355","begin":"0","dur":"2s","repeatCount":"indefinite","fill":"freeze"}})])])},staticRenderFns: [],
  name: 'QSpinnerInfinity',
  mixins: [mixin]
}

var QSpinner_mat = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner q-spinner-mat",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"25 25 50 50"}},[_c('circle',{staticClass:"path",attrs:{"cx":"50","cy":"50","r":"20","fill":"none","stroke":"currentColor","stroke-width":"3","stroke-miterlimit":"10"}})])},staticRenderFns: [],
  name: 'QSpinnerMat',
  mixins: [mixin]
}

var oval = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 38 38","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"translate(1 1)","stroke-width":"2","fill":"none","fill-rule":"evenodd"}},[_c('circle',{attrs:{"stroke-opacity":".5","cx":"18","cy":"18","r":"18"}}),_c('path',{attrs:{"d":"M36 18c0-9.94-8.06-18-18-18"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"1s","repeatCount":"indefinite"}})],1)])])},staticRenderFns: [],
  name: 'QSpinnerOval',
  mixins: [mixin]
}

var pie = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M0 50A50 50 0 0 1 50 0L50 50L0 50","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"0.8s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M50 0A50 50 0 0 1 100 50L50 50L50 0","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"1.6s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M100 50A50 50 0 0 1 50 100L50 50L100 50","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"2.4s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M50 100A50 50 0 0 1 0 50L50 50L50 100","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"3.2s","repeatCount":"indefinite"}})],1)])},staticRenderFns: [],
  name: 'QSpinnerPie',
  mixins: [mixin]
}

var puff = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 44 44","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd","stroke-width":"2"}},[_c('circle',{attrs:{"cx":"22","cy":"22","r":"1"}},[_c('animate',{attrs:{"attributeName":"r","begin":"0s","dur":"1.8s","values":"1; 20","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.165, 0.84, 0.44, 1","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"0s","dur":"1.8s","values":"1; 0","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.3, 0.61, 0.355, 1","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"22","cy":"22","r":"1"}},[_c('animate',{attrs:{"attributeName":"r","begin":"-0.9s","dur":"1.8s","values":"1; 20","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.165, 0.84, 0.44, 1","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"-0.9s","dur":"1.8s","values":"1; 0","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.3, 0.61, 0.355, 1","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'QSpinnerPuff',
  mixins: [mixin]
}

var radio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"scale(0.55)"}},[_c('circle',{attrs:{"cx":"30","cy":"150","r":"30","fill":"currentColor"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","dur":"1s","begin":"0","repeatCount":"indefinite","keyTimes":"0;0.5;1","values":"0;1;1"}})]),_c('path',{attrs:{"d":"M90,150h30c0-49.7-40.3-90-90-90v30C63.1,90,90,116.9,90,150z","fill":"currentColor"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","dur":"1s","begin":"0.1","repeatCount":"indefinite","keyTimes":"0;0.5;1","values":"0;1;1"}})]),_c('path',{attrs:{"d":"M150,150h30C180,67.2,112.8,0,30,0v30C96.3,30,150,83.7,150,150z","fill":"currentColor"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","dur":"1s","begin":"0.2","repeatCount":"indefinite","keyTimes":"0;0.5;1","values":"0;1;1"}})])])])},staticRenderFns: [],
  name: 'QSpinnerRadio',
  mixins: [mixin]
}

var rings = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 45 45","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd","transform":"translate(1 1)","stroke-width":"2"}},[_c('circle',{attrs:{"cx":"22","cy":"22","r":"6"}},[_c('animate',{attrs:{"attributeName":"r","begin":"1.5s","dur":"3s","values":"6;22","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"1.5s","dur":"3s","values":"1;0","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-width","begin":"1.5s","dur":"3s","values":"2;0","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"22","cy":"22","r":"6"}},[_c('animate',{attrs:{"attributeName":"r","begin":"3s","dur":"3s","values":"6;22","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"3s","dur":"3s","values":"1;0","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-width","begin":"3s","dur":"3s","values":"2;0","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"22","cy":"22","r":"8"}},[_c('animate',{attrs:{"attributeName":"r","begin":"0s","dur":"1.5s","values":"6;1;2;3;4;5;6","calcMode":"linear","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'QSpinnerRings',
  mixins: [mixin]
}

var tail = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 38 38","xmlns":"http://www.w3.org/2000/svg"}},[_c('defs',[_c('linearGradient',{attrs:{"x1":"8.042%","y1":"0%","x2":"65.682%","y2":"23.865%","id":"a"}},[_c('stop',{attrs:{"stop-color":"currentColor","stop-opacity":"0","offset":"0%"}}),_c('stop',{attrs:{"stop-color":"currentColor","stop-opacity":".631","offset":"63.146%"}}),_c('stop',{attrs:{"stop-color":"currentColor","offset":"100%"}})],1)],1),_c('g',{attrs:{"transform":"translate(1 1)","fill":"none","fill-rule":"evenodd"}},[_c('path',{attrs:{"d":"M36 18c0-9.94-8.06-18-18-18","stroke":"url(#a)","stroke-width":"2"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"0.9s","repeatCount":"indefinite"}})],1),_c('circle',{attrs:{"fill":"currentColor","cx":"36","cy":"18","r":"1"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"0.9s","repeatCount":"indefinite"}})],1)])])},staticRenderFns: [],
  name: 'QSpinnerTail',
  mixins: [mixin]
}

var QSpinner = {
  mixins: [DefaultSpinner],
  name: 'QSpinner'
};

var QBtn = {
  name: 'QBtn',
  mixins: [BtnMixin],
  props: {
    percentage: Number,
    darkPercentage: Boolean,
    waitForRipple: Boolean,
    repeatTimeout: [Number, Function],
    to: [Object, String],
    replace: Boolean
  },
  computed: {
    hasPercentage: function hasPercentage () {
      return this.percentage !== void 0
    },
    width: function width () {
      return ((between(this.percentage, 0, 100)) + "%")
    },
    events: function events () {
      var this$1 = this;

      return this.isDisabled || !this.repeatTimeout
        ? { click: this.click }
        : {
          mousedown: this.__startRepeat,
          touchstart: this.__startRepeat,
          keydown: function (e) { return [13, 32].includes(e.keyCode) && this$1.__startRepeat(e); },

          mouseup: this.__endRepeat,
          touchend: this.__endRepeat,
          keyup: function (e) { return [13, 32].includes(e.keyCode) && this$1.__endRepeat(e); },

          mouseleave: this.__abortRepeat,
          touchmove: this.__abortRepeat,
          blur: this.__abortRepeat
        }
    }
  },
  data: function data () {
    return {
      repeating: false
    }
  },
  methods: {
    click: function click (e) {
      var this$1 = this;

      this.__cleanup();

      var trigger = function () {
        if (this$1.isDisabled) {
          return
        }

        this$1.$emit('click', e);

        if (this$1.to !== void 0) {
          this$1.$router[this$1.replace ? 'replace' : 'push'](this$1.to);
        }
      };

      if (this.waitForRipple && this.hasRipple) {
        this.timer = setTimeout(trigger, 300);
      }
      else {
        trigger();
      }
    },
    __cleanup: function __cleanup () {
      clearTimeout(this.timer);
    },
    __startRepeat: function __startRepeat (e) {
      var this$1 = this;

      if (this.repeating) {
        return
      }
      var setTimer = function () {
        this$1.timer = setTimeout(
          trigger,
          typeof this$1.repeatTimeout === 'function'
            ? this$1.repeatTimeout(this$1.repeatCount)
            : this$1.repeatTimeout
        );
      };
      var trigger = function () {
        if (this$1.isDisabled) {
          return
        }
        this$1.repeatCount += 1;
        e.repeatCount = this$1.repeatCount;
        this$1.$emit('click', e);
        setTimer();
      };

      this.repeatCount = 0;
      this.repeating = true;
      setTimer();
    },
    __abortRepeat: function __abortRepeat () {
      this.repeating = false;
      this.__cleanup();
    },
    __endRepeat: function __endRepeat (e) {
      if (!this.repeating) {
        return
      }

      this.repeating = false;
      if (this.repeatCount) {
        this.repeatCount = 0;
      }
      else if (e.detail || e.keyCode) {
        e.repeatCount = 0;
        this.$emit('click', e);
      }

      this.__cleanup();
    }
  },
  beforeDestroy: function beforeDestroy () {
    this.__cleanup();
  },
  render: function render (h) {
    return h('button', {
      staticClass: 'q-btn inline relative-position q-btn-item non-selectable',
      'class': this.classes,
      style: this.style,
      attrs: { tabindex: this.computedTabIndex, type: 'button' },
      on: this.events,
      directives: this.hasRipple
        ? [{
          name: 'ripple',
          value: true
        }]
        : null
    }, [
      h('div', { staticClass: 'q-focus-helper' }),

      this.loading && this.hasPercentage
        ? h('div', {
          staticClass: 'q-btn-progress absolute-full',
          'class': { 'q-btn-dark-progress': this.darkPercentage },
          style: { width: this.width }
        })
        : null,

      h('div', {
        staticClass: 'q-btn-inner row col items-center',
        'class': this.innerClasses
      },
      this.loading
        ? [ this.$slots.loading || h(QSpinner) ]
        : [
          this.icon
            ? h('QIcon', {
              'class': { 'on-left': this.label && this.isRectangle },
              props: { name: this.icon }
            })
            : null,

          this.label && this.isRectangle ? h('div', [ this.label ]) : null,

          this.$slots.default,

          this.iconRight && this.isRectangle
            ? h('QIcon', {
              staticClass: 'on-right',
              props: { name: this.iconRight }
            })
            : null
        ]
      )
    ])
  }
}

var QBtnGroup = {
  name: 'QBtnGroup',
  props: {
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    push: Boolean
  },
  computed: {
    classes: function classes () {
      var this$1 = this;

      return ['outline', 'flat', 'rounded', 'push']
        .filter(function (t) { return this$1[t]; })
        .map(function (t) { return ("q-btn-group-" + t); }).join(' ')
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-btn-group row no-wrap inline',
      'class': this.classes
    }, [
      this.$slots.default
    ])
  }
}

function getAnchorPosition (el, offset) {
  var ref = el.getBoundingClientRect();
  var top = ref.top;
  var left = ref.left;
  var right = ref.right;
  var bottom = ref.bottom;
  var a = {
      top: top,
      left: left,
      width: el.offsetWidth,
      height: el.offsetHeight
    };

  if (offset) {
    a.top -= offset[1];
    a.left -= offset[0];
    if (bottom) {
      bottom += offset[1];
    }
    if (right) {
      right += offset[0];
    }
    a.width += offset[0];
    a.height += offset[1];
  }

  a.right = right || a.left + a.width;
  a.bottom = bottom || a.top + a.height;
  a.middle = a.left + ((a.right - a.left) / 2);
  a.center = a.top + ((a.bottom - a.top) / 2);

  return a
}

function getTargetPosition (el) {
  return {
    top: 0,
    center: el.offsetHeight / 2,
    bottom: el.offsetHeight,
    left: 0,
    middle: el.offsetWidth / 2,
    right: el.offsetWidth
  }
}

function getOverlapMode (anchor, target, median) {
  if ([anchor, target].indexOf(median) >= 0) { return 'auto' }
  if (anchor === target) { return 'inclusive' }
  return 'exclusive'
}

function getPositions (anchor, target) {
  var
    a = extend({}, anchor),
    t = extend({}, target);

  var positions = {
    x: ['left', 'right'].filter(function (p) { return p !== t.horizontal; }),
    y: ['top', 'bottom'].filter(function (p) { return p !== t.vertical; })
  };

  var overlap = {
    x: getOverlapMode(a.horizontal, t.horizontal, 'middle'),
    y: getOverlapMode(a.vertical, t.vertical, 'center')
  };

  positions.x.splice(overlap.x === 'auto' ? 0 : 1, 0, 'middle');
  positions.y.splice(overlap.y === 'auto' ? 0 : 1, 0, 'center');

  if (overlap.y !== 'auto') {
    a.vertical = a.vertical === 'top' ? 'bottom' : 'top';
    if (overlap.y === 'inclusive') {
      t.vertical = t.vertical;
    }
  }

  if (overlap.x !== 'auto') {
    a.horizontal = a.horizontal === 'left' ? 'right' : 'left';
    if (overlap.y === 'inclusive') {
      t.horizontal = t.horizontal;
    }
  }

  return {
    positions: positions,
    anchorPos: a
  }
}

function repositionIfNeeded (anchor, target, selfOrigin, anchorOrigin, targetPosition) {
  var ref = getPositions(anchorOrigin, selfOrigin);
  var positions = ref.positions;
  var anchorPos = ref.anchorPos;

  if (targetPosition.top < 0 || targetPosition.top + target.bottom > window.innerHeight) {
    var newTop = anchor[anchorPos.vertical] - target[positions.y[0]];
    if (newTop + target.bottom <= window.innerHeight) {
      targetPosition.top = newTop;
    }
    else {
      newTop = anchor[anchorPos.vertical] - target[positions.y[1]];
      if (newTop + target.bottom <= window.innerHeight) {
        targetPosition.top = newTop;
      }
    }
  }
  if (targetPosition.left < 0 || targetPosition.left + target.right > window.innerWidth) {
    var newLeft = anchor[anchorPos.horizontal] - target[positions.x[0]];
    if (newLeft + target.right <= window.innerWidth) {
      targetPosition.left = newLeft;
    }
    else {
      newLeft = anchor[anchorPos.horizontal] - target[positions.x[1]];
      if (newLeft + target.right <= window.innerWidth) {
        targetPosition.left = newLeft;
      }
    }
  }

  return targetPosition
}

function setPosition (ref) {
  var el = ref.el;
  var animate = ref.animate;
  var anchorEl = ref.anchorEl;
  var anchorOrigin = ref.anchorOrigin;
  var selfOrigin = ref.selfOrigin;
  var maxHeight = ref.maxHeight;
  var event = ref.event;
  var anchorClick = ref.anchorClick;
  var touchPosition = ref.touchPosition;
  var offset = ref.offset;

  var anchor;
  el.style.maxHeight = maxHeight || '65vh';

  if (event && (!anchorClick || touchPosition)) {
    var ref$1 = position(event);
    var top = ref$1.top;
    var left = ref$1.left;
    anchor = {top: top, left: left, width: 1, height: 1, right: left + 1, center: top, middle: left, bottom: top + 1};
  }
  else {
    anchor = getAnchorPosition(anchorEl, offset);
  }

  var target = getTargetPosition(el);
  var targetPosition = {
    top: anchor[anchorOrigin.vertical] - target[selfOrigin.vertical],
    left: anchor[anchorOrigin.horizontal] - target[selfOrigin.horizontal]
  };

  targetPosition = repositionIfNeeded(anchor, target, selfOrigin, anchorOrigin, targetPosition);

  el.style.top = Math.max(0, targetPosition.top) + 'px';
  el.style.left = Math.max(0, targetPosition.left) + 'px';

  if (animate) {
    var directions = targetPosition.top < anchor.top ? ['up', 'down'] : ['down', 'up'];
    el.classList.add(("animate-popup-" + (directions[0])));
    el.classList.remove(("animate-popup-" + (directions[1])));
  }
}

function positionValidator (pos) {
  var parts = pos.split(' ');
  if (parts.length !== 2) {
    return false
  }
  if (!['top', 'center', 'bottom'].includes(parts[0])) {
    console.error('Anchor/Self position must start with one of top/center/bottom');
    return false
  }
  if (!['left', 'middle', 'right'].includes(parts[1])) {
    console.error('Anchor/Self position must end with one of left/middle/right');
    return false
  }
  return true
}

function offsetValidator (val) {
  if (!val) { return true }
  if (val.length !== 2) { return false }
  if (typeof val[0] !== 'number' || typeof val[1] !== 'number') {
    return false
  }
  return true
}

function parsePosition (pos) {
  var parts = pos.split(' ');
  return {vertical: parts[0], horizontal: parts[1]}
}

function debounce (fn, wait, immediate) {
  if ( wait === void 0 ) wait = 250;

  var timeout;

  function debounced () {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var later = function () {
      timeout = null;
      if (!immediate) {
        fn.apply(this$1, args);
      }
    };

    clearTimeout(timeout);
    if (immediate && !timeout) {
      fn.apply(this, args);
    }
    timeout = setTimeout(later, wait);
  }

  debounced.cancel = function () {
    clearTimeout(timeout);
  };

  return debounced
}

function frameDebounce (fn) {
  var wait = false;

  return function () {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (wait) { return }

    wait = true;
    window.requestAnimationFrame(function () {
      fn.apply(this$1, args);
      wait = false;
    });
  }
}

var QPopover = {
  name: 'QPopover',
  mixins: [ModelToggleMixin],
  props: {
    anchor: {
      type: String,
      validator: positionValidator
    },
    self: {
      type: String,
      validator: positionValidator
    },
    fit: Boolean,
    maxHeight: String,
    touchPosition: Boolean,
    anchorClick: {
      /*
        for handling anchor outside of Popover
        example: context menu component
      */
      type: Boolean,
      default: true
    },
    offset: {
      type: Array,
      validator: offsetValidator
    },
    disable: Boolean
  },
  watch: {
    $route: function $route () {
      this.hide();
    }
  },
  computed: {
    anchorOrigin: function anchorOrigin () {
      return parsePosition(this.anchor || ("bottom " + (this.$q.i18n.rtl ? 'right' : 'left')))
    },
    selfOrigin: function selfOrigin () {
      return parsePosition(this.self || ("top " + (this.$q.i18n.rtl ? 'right' : 'left')))
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-popover scroll',
      on: {
        click: function click (e) { e.stopPropagation(); }
      }
    }, [
      this.$slots.default
    ])
  },
  created: function created () {
    var this$1 = this;

    this.__updatePosition = frameDebounce(function (_, event, animate) { return this$1.reposition(event, animate); });
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.anchorEl = this$1.$el.parentNode;
      this$1.anchorEl.removeChild(this$1.$el);
      if (this$1.anchorEl.classList.contains('q-btn-inner') || this$1.anchorEl.classList.contains('q-if-inner')) {
        this$1.anchorEl = this$1.anchorEl.parentNode;
      }
      if (this$1.anchorClick) {
        this$1.anchorEl.classList.add('cursor-pointer');
        this$1.anchorEl.addEventListener('click', this$1.toggle);
      }
    });
    if (this.value) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.anchorClick && this.anchorEl) {
      this.anchorEl.removeEventListener('click', this.toggle);
    }
  },
  methods: {
    __show: function __show (evt) {
      var this$1 = this;

      document.body.appendChild(this.$el);
      EscapeKey.register(function () { this$1.hide(); });
      this.scrollTarget = getScrollTarget(this.anchorEl);
      this.scrollTarget.addEventListener('scroll', this.__updatePosition, listenOpts.passive);
      window.addEventListener('resize', this.__updatePosition, listenOpts.passive);
      this.__updatePosition(0, evt, true);

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        document.body.addEventListener('click', this$1.__bodyHide, true);
        document.body.addEventListener('touchstart', this$1.__bodyHide, true);
        this$1.showPromise && this$1.showPromiseResolve();
      }, 0);
    },
    __bodyHide: function __bodyHide (evt) {
      if (
        evt && evt.target &&
        (this.$el.contains(evt.target) || this.anchorEl.contains(evt.target))
      ) {
        return
      }

      this.hide(evt);
    },
    __hide: function __hide () {
      clearTimeout(this.timer);

      document.body.removeEventListener('click', this.__bodyHide, true);
      document.body.removeEventListener('touchstart', this.__bodyHide, true);
      this.scrollTarget.removeEventListener('scroll', this.__updatePosition, listenOpts.passive);
      window.removeEventListener('resize', this.__updatePosition, listenOpts.passive);
      EscapeKey.pop();

      document.body.removeChild(this.$el);
      this.hidePromise && this.hidePromiseResolve();
    },
    reposition: function reposition (event, animate) {
      if (this.fit) {
        this.$el.style.minWidth = width(this.anchorEl) + 'px';
      }
      var ref = this.anchorEl.getBoundingClientRect();
      var top = ref.top;
      var bottom = ref.bottom;

      if (bottom < 0 || top > window.innerHeight) {
        return this.hide()
      }

      setPosition({
        event: event,
        animate: animate,
        el: this.$el,
        offset: this.offset,
        anchorEl: this.anchorEl,
        anchorOrigin: this.anchorOrigin,
        selfOrigin: this.selfOrigin,
        maxHeight: this.maxHeight,
        anchorClick: this.anchorClick,
        touchPosition: this.touchPosition
      });
    }
  }
}

var QBtnDropdown = {
  name: 'QBtnDropdown',
  mixins: [BtnMixin],
  props: {
    value: Boolean,
    split: Boolean,
    contentClass: [Array, String, Object],
    contentStyle: [Array, String, Object]
  },
  data: function data () {
    return {
      showing: this.value
    }
  },
  watch: {
    value: function value (val) {
      this.$refs.popover[val ? 'show' : 'hide']();
    }
  },
  render: function render (h) {
    var this$1 = this;

    var
      Popover = h(
        QPopover,
        {
          ref: 'popover',
          props: {
            disable: this.disable,
            fit: true,
            anchorClick: !this.split,
            anchor: 'bottom right',
            self: 'top right'
          },
          'class': this.contentClass,
          style: this.contentStyle,
          on: {
            show: function (e) {
              this$1.showing = true;
              this$1.$emit('show', e);
              this$1.$emit('input', true);
            },
            hide: function (e) {
              this$1.showing = false;
              this$1.$emit('hide', e);
              this$1.$emit('input', false);
            }
          }
        },
        [ this.$slots.default ]
      ),
      Icon = h(
        'QIcon',
        {
          props: {
            name: this.$q.icon.input.dropdown
          },
          staticClass: 'transition-generic',
          'class': {
            'rotate-180': this.showing,
            'on-right': !this.split,
            'q-btn-dropdown-arrow': !this.split
          }
        }
      ),
      Btn = h(QBtn, {
        props: {
          loading: this.loading,
          disable: this.disable,
          noCaps: this.noCaps,
          noWrap: this.noWrap,
          icon: this.icon,
          label: this.label,
          iconRight: this.split ? this.iconRight : null,
          outline: this.outline,
          flat: this.flat,
          rounded: this.rounded,
          push: this.push,
          size: this.size,
          color: this.color,
          textColor: this.textColor,
          glossy: this.glossy,
          dense: this.dense,
          noRipple: this.noRipple,
          waitForRipple: this.waitForRipple
        },
        'class': this.split ? 'q-btn-dropdown-current' : 'q-btn-dropdown q-btn-dropdown-simple',
        on: {
          click: function (e) {
            this$1.split && this$1.hide();
            if (!this$1.disable) {
              this$1.$emit('click', e);
            }
          }
        }
      }, this.split ? null : [ Icon, Popover ]);

    if (!this.split) {
      return Btn
    }

    return h(
      QBtnGroup,
      {
        props: {
          outline: this.outline,
          flat: this.flat,
          rounded: this.rounded,
          push: this.push
        },
        staticClass: 'q-btn-dropdown q-btn-dropdown-split no-wrap q-btn-item'
      },
      [
        Btn,
        h(
          QBtn,
          {
            props: {
              disable: this.disable,
              outline: this.outline,
              flat: this.flat,
              rounded: this.rounded,
              push: this.push,
              size: this.size,
              color: this.color,
              textColor: this.textColor,
              dense: this.dense,
              glossy: this.glossy,
              noRipple: this.noRipple,
              waitForRipple: this.waitForRipple
            },
            staticClass: 'q-btn-dropdown-arrow',
            on: { click: function () { this$1.toggle(); } }
          },
          [ Icon ]
        ),
        [ Popover ]
      ]
    )
  },
  methods: {
    toggle: function toggle () {
      return this.$refs.popover.toggle()
    },
    show: function show () {
      return this.$refs.popover.show()
    },
    hide: function hide () {
      return this.$refs.popover.hide()
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      if (this$1.value) {
        this$1.$refs.popover.show();
      }
    });
  }
}

var QBtnToggle = {
  name: 'QBtnToggle',
  props: {
    value: {
      required: true
    },
    // To avoid seeing the active raise shadow through the transparent button, give it a color (even white).
    color: String,
    textColor: String,
    toggleColor: {
      type: String,
      default: 'primary'
    },
    toggleTextColor: String,
    options: {
      type: Array,
      required: true,
      validator: function (v) { return v.every(function (opt) { return ('label' in opt || 'icon' in opt) && 'value' in opt; }); }
    },
    readonly: Boolean,
    disable: Boolean,
    noCaps: Boolean,
    noWrap: Boolean,
    outline: Boolean,
    flat: Boolean,
    dense: Boolean,
    rounded: Boolean,
    push: Boolean,
    size: String,
    glossy: Boolean,
    noRipple: Boolean,
    waitForRipple: Boolean
  },
  computed: {
    val: function val () {
      var this$1 = this;

      return this.options.map(function (opt) { return opt.value === this$1.value; })
    }
  },
  methods: {
    set: function set (value, opt) {
      var this$1 = this;

      if (this.readonly) {
        return
      }
      this.$emit('input', value, opt);
      this.$nextTick(function () {
        if (JSON.stringify(value) !== JSON.stringify(this$1.value)) {
          this$1.$emit('change', value, opt);
        }
      });
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(QBtnGroup, {
      staticClass: 'q-btn-toggle',
      props: {
        outline: this.outline,
        flat: this.flat,
        rounded: this.rounded,
        push: this.push
      }
    },
    this.options.map(
      function (opt, i) { return h(QBtn, {
        key: ("" + (opt.label) + (opt.icon) + (opt.iconRight)),
        on: { click: function () { return this$1.set(opt.value, opt); } },
        props: {
          disable: this$1.disable,
          label: opt.label,
          // Colors come from the button specific options first, then from general props
          color: this$1.val[i] ? opt.toggleColor || this$1.toggleColor : opt.color || this$1.color,
          textColor: this$1.val[i] ? opt.toggleTextColor || this$1.toggleTextColor : opt.textColor || this$1.textColor,
          icon: opt.icon,
          iconRight: opt.iconRight,
          noCaps: this$1.noCaps || opt.noCaps,
          noWrap: this$1.noWrap || opt.noWrap,
          outline: this$1.outline,
          flat: this$1.flat,
          rounded: this$1.rounded,
          push: this$1.push,
          glossy: this$1.glossy,
          size: this$1.size,
          dense: this$1.dense,
          noRipple: this$1.noRipple || opt.noRipple,
          waitForRipple: this$1.waitForRipple || opt.waitForRipple,
          tabindex: opt.tabindex
        }
      }); }
    ))
  }
}

var QAlert = {
  name: 'QAlert',
  props: {
    type: {
      type: String,
      validator: function (v) { return ['positive', 'negative', 'warning', 'info'].includes(v); }
    },
    color: {
      type: String,
      default: 'negative'
    },
    textColor: String,
    message: String,
    detail: String,
    icon: String,
    avatar: String,
    actions: Array
  },
  computed: {
    computedIcon: function computedIcon () {
      return this.icon
        ? this.icon
        : this.$q.icon.type[this.type || this.color]
    },
    classes: function classes () {
      return ("bg-" + (this.type || this.color) + " text-" + (this.textColor || 'white'))
    }
  },
  render: function render (h) {
    var this$1 = this;

    var
      side = [],
      detail = this.$slots.detail || this.detail;

    if (this.avatar) {
      side.push(
        h('img', {
          staticClass: 'avatar',
          domProps: { src: this.avatar }
        })
      );
    }
    else if (this.icon || this.type) {
      side.push(
        h(QIcon, {
          props: { name: this.computedIcon }
        })
      );
    }

    return h('div', [
      h('div', {
        staticClass: 'q-alert row no-wrap shadow-2',
        'class': this.classes
      }, [
        side.length
          ? h('div', { staticClass: 'q-alert-side col-auto row flex-center' }, side)
          : null,
        h('div', {
          staticClass: 'q-alert-content col self-center'
        }, [
          h('div', this.$slots.default || this.message),
          detail ? h('div', { staticClass: 'q-alert-detail' }, [ detail ]) : null
        ]),
        this.actions && this.actions.length
          ? h('div', {
            staticClass: 'q-alert-actions col-auto gutter-xs column flex-center'
          },
          this.actions.map(function (action) { return h('div', { staticClass: 'full-width' }, [
              h(QBtn, {
                staticClass: 'full-width',
                props: {
                  flat: true,
                  dense: true,
                  align: 'left',
                  icon: action.icon,
                  label: action.closeBtn === true
                    ? (typeof action.label === 'string' ? action.label : this$1.$q.i18n.label.close)
                    : action.label
                },
                on: {
                  click: function () { return action.handler(); }
                }
              })
            ]); }
          ))
          : null
      ])
    ])
  }
}

function filter (terms, ref) {
  var field = ref.field;
  var list = ref.list;

  var token = terms.toLowerCase();
  return list.filter(function (item) { return ('' + item[field]).toLowerCase().startsWith(token); })
}

function s4 () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

function uid () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

var KeyboardSelectionMixin = {
  data: function () { return ({
    keyboardIndex: 0,
    keyboardMoveDirection: false,
    keyboardMoveTimer: false
  }); },
  methods: {
    __keyboardShow: function __keyboardShow (index) {
      if ( index === void 0 ) index = 0;

      if (this.keyboardIndex !== index) {
        this.keyboardIndex = index;
      }
    },
    __keyboardSetCurrentSelection: function __keyboardSetCurrentSelection () {
      if (this.keyboardIndex >= 0 && this.keyboardIndex <= this.keyboardMaxIndex) {
        this.__keyboardSetSelection(this.keyboardIndex);
      }
    },
    __keyboardHandleKey: function __keyboardHandleKey (e) {
      var key = getEventKey(e);

      switch (key) {
        case 38: // UP key
          this.__keyboardMoveCursor(-1, e);
          break
        case 40: // DOWN key
          this.__keyboardMoveCursor(1, e);
          break
        case 13: // ENTER key
          if (this.$refs.popover.showing) {
            stopAndPrevent(e);
            this.__keyboardSetCurrentSelection();
            return
          }
          break
        case 9: // TAB key
          this.hide();
          break
      }

      this.__keyboardCustomKeyHandle(key, e);
    },
    __keyboardMoveCursor: function __keyboardMoveCursor (offset, e) {
      var this$1 = this;

      stopAndPrevent(e);

      if (this.$refs.popover.showing) {
        clearTimeout(this.keyboardMoveTimer);
        var
          index = this.keyboardIndex,
          valid = this.__keyboardIsSelectableIndex || (function () { return true; });

        do {
          index = normalizeToInterval(
            index + offset,
            0,
            this$1.keyboardMaxIndex
          );
        }
        while (index !== this.keyboardIndex && !valid(index))

        this.keyboardMoveDirection = index > this.keyboardIndex ? 1 : -1;
        this.keyboardMoveTimer = setTimeout(function () { this$1.keyboardMoveDirection = false; }, 500);
        this.keyboardIndex = index;
        return
      }

      this.__keyboardShowTrigger();
    }
  }
}

var QAutocomplete = {
  name: 'QAutocomplete',
  mixins: [KeyboardSelectionMixin],
  props: {
    minCharacters: {
      type: Number,
      default: 1
    },
    maxResults: {
      type: Number,
      default: 6
    },
    debounce: {
      type: Number,
      default: 500
    },
    filter: {
      type: Function,
      default: filter
    },
    staticData: Object,
    separator: Boolean
  },
  inject: {
    __input: {
      default: function default$1 () {
        console.error('QAutocomplete needs to be child of QInput or QSearch');
      }
    },
    __inputDebounce: { default: null }
  },
  data: function data () {
    return {
      searchId: '',
      results: [],
      width: 0,
      enterKey: false,
      timer: null
    }
  },
  watch: {
    '__input.val': function _input_val () {
      if (this.enterKey) {
        this.enterKey = false;
      }
      else {
        this.__delayTrigger();
      }
    }
  },
  computed: {
    computedResults: function computedResults () {
      return this.maxResults && this.results.length > 0
        ? this.results.slice(0, this.maxResults)
        : []
    },
    keyboardMaxIndex: function keyboardMaxIndex () {
      return this.computedResults.length - 1
    },
    computedWidth: function computedWidth () {
      return {minWidth: this.width}
    },
    searching: function searching () {
      return this.searchId.length > 0
    }
  },
  methods: {
    isWorking: function isWorking () {
      return this.$refs && this.$refs.popover
    },
    trigger: function trigger () {
      var this$1 = this;

      if (!this.__input.hasFocus() || !this.isWorking()) {
        return
      }

      var terms = [null, void 0].includes(this.__input.val) ? '' : String(this.__input.val);
      var searchId = uid();
      this.searchId = searchId;

      if (terms.length < this.minCharacters) {
        this.searchId = '';
        this.__clearSearch();
        this.hide();
        return
      }

      this.width = width(this.inputEl) + 'px';

      if (this.staticData) {
        this.searchId = '';
        this.results = this.filter(terms, this.staticData);
        var popover = this.$refs.popover;
        if (this.results.length) {
          this.__keyboardShow(-1);
          if (popover.showing) {
            popover.reposition();
          }
          else {
            popover.show();
          }
        }
        else {
          popover.hide();
        }
        return
      }

      this.__input.loading = true;
      this.$emit('search', terms, function (results) {
        if (!this$1.isWorking() || this$1.searchId !== searchId) {
          return
        }

        this$1.__clearSearch();

        if (Array.isArray(results) && results.length > 0) {
          this$1.results = results;
          this$1.__keyboardShow(-1);
          this$1.$refs.popover.show();
          return
        }

        this$1.hide();
      });
    },
    hide: function hide () {
      this.results = [];
      return this.isWorking()
        ? this.$refs.popover.hide()
        : Promise.resolve()
    },
    blurHide: function blurHide () {
      var this$1 = this;

      this.__clearSearch();
      setTimeout(function () { return this$1.hide(); }, 300);
    },
    __clearSearch: function __clearSearch () {
      clearTimeout(this.timer);
      this.__input.loading = false;
      this.searchId = '';
    },
    __keyboardCustomKeyHandle: function __keyboardCustomKeyHandle (key) {
      if (key === 27) { // ESCAPE
        this.__clearSearch();
      }
    },
    __keyboardShowTrigger: function __keyboardShowTrigger () {
      this.trigger();
    },
    __keyboardIsSelectableIndex: function __keyboardIsSelectableIndex (index) {
      return index > -1 && index < this.computedResults.length && !this.computedResults[index].disable
    },
    setValue: function setValue (result) {
      var value = this.staticData ? result[this.staticData.field] : result.value;
      var suffix = this.__inputDebounce ? 'Debounce' : '';

      if (this.inputEl && this.__input && !this.__input.hasFocus()) {
        this.inputEl.focus();
      }

      this.enterKey = this.__input && value !== this.__input.val;
      this[("__input" + suffix)].set(value);

      this.$emit('selected', result);
      this.__clearSearch();
      this.hide();
    },
    __keyboardSetSelection: function __keyboardSetSelection (index) {
      this.setValue(this.results[index]);
    },
    __delayTrigger: function __delayTrigger () {
      this.__clearSearch();
      if (!this.__input.hasFocus()) {
        return
      }
      if (this.staticData) {
        this.trigger();
        return
      }
      this.timer = setTimeout(this.trigger, this.debounce);
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.__input.register();
    if (this.__inputDebounce) {
      this.__inputDebounce.setChildDebounce(true);
    }
    this.$nextTick(function () {
      this$1.inputEl = this$1.__input.getEl();
      this$1.inputEl.addEventListener('keydown', this$1.__keyboardHandleKey);
      this$1.inputEl.addEventListener('blur', this$1.blurHide);
    });
  },
  beforeDestroy: function beforeDestroy () {
    this.__clearSearch();
    this.__input.unregister();
    if (this.__inputDebounce) {
      this.__inputDebounce.setChildDebounce(false);
    }
    if (this.inputEl) {
      this.inputEl.removeEventListener('keydown', this.__keyboardHandleKey);
      this.inputEl.removeEventListener('blur', this.blurHide);
      this.hide();
    }
  },
  render: function render (h) {
    var this$1 = this;

    var dark = this.__input.isDark();
    return h(QPopover, {
      ref: 'popover',
      'class': dark ? 'bg-dark' : null,
      props: {
        fit: true,
        anchorClick: false
      },
      on: {
        show: function () {
          this$1.__input.selectionOpen = true;
          this$1.$emit('show');
        },
        hide: function () {
          this$1.__input.selectionOpen = false;
          this$1.$emit('hide');
        }
      }
    }, [
      h(QList, {
        props: {
          dark: dark,
          noBorder: true,
          separator: this.separator
        },
        style: this.computedWidth
      },
      this.computedResults.map(function (result, index) { return h(QItemWrapper, {
        key: result.id || JSON.stringify(result),
        'class': {
          active: this$1.keyboardIndex === index,
          'cursor-pointer': !result.disable,
          'text-faded': result.disable
        },
        props: { cfg: result },
        nativeOn: {
          mouseenter: function () { !result.disable && (this$1.keyboardIndex = index); },
          click: function () { !result.disable && this$1.setValue(result); }
        }
      }); }))
    ])
  }
}

var QBreadcrumbs = {
  name: 'QBreadcrumbs',
  mixins: [AlignMixin],
  props: {
    color: {
      type: String,
      default: 'faded'
    },
    activeColor: {
      type: String,
      default: 'primary'
    },
    separator: {
      type: String,
      default: '/'
    },
    align: {
      default: 'left'
    }
  },
  computed: {
    classes: function classes () {
      return [("text-" + (this.color)), this.alignClass]
    }
  },
  render: function render (h) {
    var this$1 = this;

    if (!this.$slots.default) {
      return
    }

    var
      child = [],
      len = this.$slots.default.filter(function (c) { return c.tag !== void 0 && c.tag.endsWith('-QBreadcrumbsEl'); }).length,
      separator = this.$scopedSlots.separator || (function () { return this$1.separator; }),
      color = "text-" + (this.color),
      active = "text-" + (this.activeColor);
    var els = 1;

    for (var i in this$1.$slots.default) {
      var comp = this$1.$slots.default[i];
      if (comp.tag !== void 0 && comp.tag.endsWith('-QBreadcrumbsEl')) {
        var middle = els < len;
        els++;

        child.push(h('div', {
          staticClass: 'flex items-center',
          'class': [ middle ? active : color, middle ? 'text-weight-bold' : 'q-breadcrumbs-last' ]
        }, [ comp ]));

        if (middle) {
          child.push(h('div', { staticClass: "q-breadcrumbs-separator", 'class': color }, [ separator() ]));
        }
      }
      else {
        child.push(comp);
      }
    }

    return h('div', {
      staticClass: 'q-breadcrumbs flex gutter-xs items-center overflow-hidden',
      'class': this.classes
    }, child)
  }
}

var QBreadcrumbsEl = {
  name: 'QBreadcrumbsEl',
  mixins: [{ props: RouterLinkMixin.props }],
  props: {
    label: String,
    icon: String,
    color: String
  },
  computed: {
    link: function link () {
      return this.to !== void 0
    }
  },
  render: function render (h) {
    return h(this.link ? 'router-link' : 'span', {
      staticClass: 'q-breadcrumbs-el flex inline items-center relative-position',
      props: this.link ? this.$props : null
    },
    this.label || this.icon
      ? [
        this.icon ? h(QIcon, { staticClass: 'q-breacrumbs-el-icon q-mr-sm', props: { name: this.icon } }) : null,
        this.label
      ]
      : [ this.$slots.default ]
    )
  }
}

var QCard = {
  name: 'QCard',
  props: {
    square: Boolean,
    flat: Boolean,
    inline: Boolean,
    color: String,
    textColor: String
  },
  computed: {
    classes: function classes () {
      var cls = [{
        'no-border-radius': this.square,
        'no-shadow': this.flat,
        'inline-block': this.inline
      }];

      if (this.color) {
        cls.push(("bg-" + (this.color)));
        cls.push("q-card-dark");
        cls.push(("text-" + (this.textColor || 'white')));
      }
      else if (this.textColor) {
        cls.push(("text-" + (this.textColor)));
      }

      return cls
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card',
      'class': this.classes
    }, [
      this.$slots.default
    ])
  }
}

var QCardTitle = {
  name: 'QCardTitle',
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card-primary q-card-container row no-wrap'
    }, [
      h('div', {staticClass: 'col column'}, [
        h('div', {staticClass: 'q-card-title'}, [ this.$slots.default ]),
        h('div', {staticClass: 'q-card-subtitle'}, [ this.$slots.subtitle ])
      ]),
      h('div', {staticClass: 'col-auto self-center q-card-title-extra'}, [ this.$slots.right ])
    ])
  }
}

var QCardMain = {
  name: 'QCardMain',
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card-main q-card-container'
    }, [
      this.$slots.default
    ])
  }
}

var QCardActions = {
  name: 'QCardActions',
  props: {
    vertical: Boolean,
    align: {
      type: String,
      default: 'start',
      validator: function (v) { return ['start', 'center', 'end', 'around', 'between'].includes(v); }
    }
  },
  computed: {
    classes: function classes () {
      return "q-card-actions-" + (this.vertical ? 'vert column justify-start' : 'horiz row') + " " +
        (this.vertical ? 'items' : 'justify') + "-" + (this.align)
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card-actions',
      'class': this.classes
    }, [
      this.$slots.default
    ])
  }
}

var QCardMedia = {
  name: 'QCardMedia',
  props: {
    overlayPosition: {
      type: String,
      default: 'bottom',
      validator: function (v) { return ['top', 'bottom', 'full'].includes(v); }
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card-media relative-position'
    }, [
      this.$slots.default,
      this.$slots.overlay
        ? h('div', {
          staticClass: 'q-card-media-overlay',
          'class': ("absolute-" + (this.overlayPosition))
        }, [
          this.$slots.overlay
        ])
        : null
    ])
  }
}

var QCardSeparator = {
  name: 'QCardSeparator',
  props: {
    inset: Boolean
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card-separator',
      'class': { inset: this.inset }
    }, [
      this.$slots.default
    ])
  }
}

function getDirection (mod) {
  if (!mod.horizontal && !mod.vertical) {
    return {
      horizontal: true,
      vertical: true
    }
  }

  var dir = {}

  ;['horizontal', 'vertical'].forEach(function (direction) {
    if (mod[direction]) {
      dir[direction] = true;
    }
  });

  return dir
}

function processChanges (evt, ctx, isFinal) {
  var
    direction,
    pos = position(evt),
    distX = pos.left - ctx.event.x,
    distY = pos.top - ctx.event.y,
    absDistX = Math.abs(distX),
    absDistY = Math.abs(distY);

  if (ctx.direction.horizontal && !ctx.direction.vertical) {
    direction = distX < 0 ? 'left' : 'right';
  }
  else if (!ctx.direction.horizontal && ctx.direction.vertical) {
    direction = distY < 0 ? 'up' : 'down';
  }
  else if (absDistX >= absDistY) {
    direction = distX < 0 ? 'left' : 'right';
  }
  else {
    direction = distY < 0 ? 'up' : 'down';
  }

  return {
    evt: evt,
    position: pos,
    direction: direction,
    isFirst: ctx.event.isFirst,
    isFinal: Boolean(isFinal),
    duration: new Date().getTime() - ctx.event.time,
    distance: {
      x: absDistX,
      y: absDistY
    },
    delta: {
      x: pos.left - ctx.event.lastX,
      y: pos.top - ctx.event.lastY
    }
  }
}

function shouldTrigger (ctx, changes) {
  if (ctx.direction.horizontal && ctx.direction.vertical) {
    return true
  }
  if (ctx.direction.horizontal && !ctx.direction.vertical) {
    return Math.abs(changes.delta.x) > 0
  }
  if (!ctx.direction.horizontal && ctx.direction.vertical) {
    return Math.abs(changes.delta.y) > 0
  }
}

var TouchPan = {
  name: 'touch-pan',
  bind: function bind (el, binding) {
    var
      mouse = !binding.modifiers.noMouse,
      stopPropagation = binding.modifiers.stop,
      preventDefault = binding.modifiers.prevent,
      evtOpts = preventDefault || binding.modifiers.mightPrevent ? null : listenOpts.passive;

    var ctx = {
      handler: binding.value,
      direction: getDirection(binding.modifiers),

      mouseStart: function mouseStart (evt) {
        if (leftClick(evt)) {
          document.addEventListener('mousemove', ctx.move, evtOpts);
          document.addEventListener('mouseup', ctx.mouseEnd, evtOpts);
          ctx.start(evt);
        }
      },
      mouseEnd: function mouseEnd (evt) {
        document.removeEventListener('mousemove', ctx.move, evtOpts);
        document.removeEventListener('mouseup', ctx.mouseEnd, evtOpts);
        ctx.end(evt);
      },

      start: function start (evt) {
        var pos = position(evt);

        ctx.event = {
          x: pos.left,
          y: pos.top,
          time: new Date().getTime(),
          detected: ctx.direction.horizontal && ctx.direction.vertical,
          abort: false,
          isFirst: true,
          lastX: pos.left,
          lastY: pos.top
        };

        if (ctx.event.detected) {
          stopPropagation && evt.stopPropagation();
          preventDefault && evt.preventDefault();
        }
      },
      move: function move (evt) {
        if (ctx.event.abort) {
          return
        }

        if (ctx.event.detected) {
          stopPropagation && evt.stopPropagation();
          preventDefault && evt.preventDefault();

          var changes = processChanges(evt, ctx, false);
          if (shouldTrigger(ctx, changes)) {
            ctx.handler(changes);
            ctx.event.lastX = changes.position.left;
            ctx.event.lastY = changes.position.top;
            ctx.event.isFirst = false;
          }

          return
        }

        var
          pos = position(evt),
          distX = Math.abs(pos.left - ctx.event.x),
          distY = Math.abs(pos.top - ctx.event.y);

        if (distX === distY) {
          return
        }

        ctx.event.detected = true;
        ctx.event.abort = ctx.direction.vertical
          ? distX > distY
          : distX < distY;

        ctx.move(evt);
      },
      end: function end (evt) {
        if (ctx.event.abort || !ctx.event.detected || ctx.event.isFirst) {
          return
        }

        stopPropagation && evt.stopPropagation();
        preventDefault && evt.preventDefault();
        ctx.handler(processChanges(evt, ctx, true));
      }
    };

    el.__qtouchpan = ctx;
    el.classList.add('q-touch');

    if (mouse) {
      el.addEventListener('mousedown', ctx.mouseStart, evtOpts);
    }
    el.addEventListener('touchstart', ctx.start, evtOpts);
    el.addEventListener('touchmove', ctx.move, evtOpts);
    el.addEventListener('touchend', ctx.end, evtOpts);
  },
  update: function update (el, binding) {
    if (binding.oldValue !== binding.value) {
      el.__qtouchpan.handler = binding.value;
    }
  },
  unbind: function unbind (el, binding) {
    var ctx = el.__qtouchpan;
    if (!ctx) { return }
    var evtOpts = binding.modifiers.prevent ? null : listenOpts.passive;

    el.removeEventListener('mousedown', ctx.mouseStart, evtOpts);

    el.removeEventListener('touchstart', ctx.start, evtOpts);
    el.removeEventListener('touchmove', ctx.move, evtOpts);
    el.removeEventListener('touchend', ctx.end, evtOpts);

    delete el.__qtouchpan;
  }
}

function isDate (v) {
  return Object.prototype.toString.call(v) === '[object Date]'
}

function isNumber (v) {
  return typeof v === 'number' && isFinite(v)
}

var linear = function (t) { return t; };

var easeInQuad = function (t) { return t * t; };
var easeOutQuad = function (t) { return t * (2 - t); };
var easeInOutQuad = function (t) { return t < 0.5
  ? 2 * t * t
  : -1 + (4 - 2 * t) * t; };

var easeInCubic = function (t) { return Math.pow( t, 3 ); };
var easeOutCubic = function (t) { return 1 + Math.pow( (t - 1), 3 ); };
var easeInOutCubic = function (t) { return t < 0.5
  ? 4 * Math.pow( t, 3 )
  : 1 + (t - 1) * Math.pow( (2 * t - 2), 2 ); };

var easeInQuart = function (t) { return Math.pow( t, 4 ); };
var easeOutQuart = function (t) { return 1 - Math.pow( (t - 1), 4 ); };
var easeInOutQuart = function (t) { return t < 0.5
  ? 8 * Math.pow( t, 4 )
  : 1 - 8 * Math.pow( (t - 1), 4 ); };

var easeInQuint = function (t) { return Math.pow( t, 5 ); };
var easeOutQuint = function (t) { return 1 + Math.pow( (t - 1), 5 ); };
var easeInOutQuint = function (t) { return t < 0.5
  ? 16 * Math.pow( t, 5 )
  : 1 + 16 * Math.pow( (t - 1), 5 ); };

var easeInCirc = function (t) { return -1 * Math.sqrt(1 - Math.pow( t, 2 )) + 1; };
var easeOutCirc = function (t) { return Math.sqrt(-1 * (t - 2) * t); };
var easeInOutCirc = function (t) { return t < 0.5
  ? 0.5 * (1 - Math.sqrt(1 - 4 * t * t))
  : 0.5 * (1 + Math.sqrt(-3 + 8 * t - 4 * t * t)); };

var overshoot = function (t) { return -1 * (Math.pow( Math.E, (-6.3 * t) )) * (Math.cos(5 * t)) + 1; };

/* -- Material Design curves -- */

/**
 * Faster ease in, slower ease out
 */
var standard = function (t) { return t < 0.4031
  ? 12 * Math.pow( t, 4 )
  : 1 / 1290 * (11 * Math.sqrt(-40000 * t * t + 80000 * t - 23359) - 129); };

var decelerate = easeOutCubic;
var accelerate = easeInCubic;
var sharp = easeInOutQuad;

var easing = /*#__PURE__*/Object.freeze({
linear: linear,
easeInQuad: easeInQuad,
easeOutQuad: easeOutQuad,
easeInOutQuad: easeInOutQuad,
easeInCubic: easeInCubic,
easeOutCubic: easeOutCubic,
easeInOutCubic: easeInOutCubic,
easeInQuart: easeInQuart,
easeOutQuart: easeOutQuart,
easeInOutQuart: easeInOutQuart,
easeInQuint: easeInQuint,
easeOutQuint: easeOutQuint,
easeInOutQuint: easeInOutQuint,
easeInCirc: easeInCirc,
easeOutCirc: easeOutCirc,
easeInOutCirc: easeInOutCirc,
overshoot: overshoot,
standard: standard,
decelerate: decelerate,
accelerate: accelerate,
sharp: sharp
});

var ids = {};

function start (ref) {
  var name = ref.name;
  var duration = ref.duration; if ( duration === void 0 ) duration = 300;
  var to = ref.to;
  var from = ref.from;
  var apply = ref.apply;
  var done = ref.done;
  var cancel = ref.cancel;
  var easing = ref.easing;

  var id = name;
  var start = new Date();

  if (id) {
    stop(id);
  }
  else {
    id = uid();
  }

  var delta = easing || linear;
  var handler = function () {
    var progress = ((new Date()) - start) / duration;
    if (progress > 1) {
      progress = 1;
    }

    var newPos = from + (to - from) * delta(progress);
    apply(newPos, progress);

    if (progress === 1) {
      delete ids[id];
      done && done(newPos);
      return
    }

    anim.last = {
      pos: newPos,
      progress: progress
    };
    anim.timer = window.requestAnimationFrame(handler);
  };

  var anim = ids[id] = {
    cancel: cancel,
    timer: window.requestAnimationFrame(handler)
  };

  return id
}

function stop (id) {
  if (!id) {
    return
  }
  var anim = ids[id];
  if (anim && anim.timer) {
    cancelAnimationFrame(anim.timer);
    anim.cancel && anim.cancel(anim.last);
    delete ids[id];
  }
}

var animate = /*#__PURE__*/Object.freeze({
start: start,
stop: stop
});

var FullscreenMixin = {
  data: function data () {
    return {
      inFullscreen: false
    }
  },
  watch: {
    $route: function $route () {
      this.exitFullscreen();
    }
  },
  methods: {
    toggleFullscreen: function toggleFullscreen () {
      if (this.inFullscreen) {
        this.exitFullscreen();
      }
      else {
        this.setFullscreen();
      }
    },
    setFullscreen: function setFullscreen () {
      if (this.inFullscreen) {
        return
      }

      this.inFullscreen = true;
      this.container = this.$el.parentNode;
      this.container.replaceChild(this.fullscreenFillerNode, this.$el);
      document.body.appendChild(this.$el);
      document.body.classList.add('q-body-fullscreen-mixin');

      this.__historyFullscreen = {
        handler: this.exitFullscreen
      };
      History.add(this.__historyFullscreen);
    },
    exitFullscreen: function exitFullscreen () {
      if (!this.inFullscreen) {
        return
      }

      if (this.__historyFullscreen) {
        History.remove(this.__historyFullscreen);
        this.__historyFullscreen = null;
      }
      this.container.replaceChild(this.$el, this.fullscreenFillerNode);
      document.body.classList.remove('q-body-fullscreen-mixin');
      this.inFullscreen = false;
    }
  },
  created: function created () {
    this.fullscreenFillerNode = document.createElement('span');
  },
  beforeDestroy: function beforeDestroy () {
    this.exitFullscreen();
  }
}

var QCarousel = {
  name: 'QCarousel',
  mixins: [FullscreenMixin],
  directives: {
    TouchPan: TouchPan
  },
  props: {
    value: Number,
    color: {
      type: String,
      default: 'primary'
    },
    height: String,
    arrows: Boolean,
    infinite: Boolean,
    animation: {
      type: [Number, Boolean],
      default: true
    },
    easing: Function,
    swipeEasing: Function,
    noSwipe: Boolean,
    autoplay: [Number, Boolean],
    handleArrowKeys: Boolean,
    quickNav: Boolean,
    quickNavPosition: {
      type: String,
      default: 'bottom',
      validator: function (v) { return ['top', 'bottom'].includes(v); }
    },
    quickNavIcon: String,
    thumbnails: {
      type: Array,
      default: function () { return ([]); }
    },
    thumbnailsIcon: String,
    thumbnailsHorizontal: Boolean
  },
  provide: function provide () {
    return {
      'carousel': this
    }
  },
  data: function data () {
    return {
      position: 0,
      slide: 0,
      positionSlide: 0,
      slidesNumber: 0,
      animUid: false,
      viewThumbnails: false
    }
  },
  watch: {
    value: function value (v) {
      if (v !== this.slide) {
        this.goToSlide(v);
      }
    },
    autoplay: function autoplay () {
      this.__planAutoPlay();
    },
    infinite: function infinite () {
      this.__planAutoPlay();
    },
    handleArrowKeys: function handleArrowKeys (v) {
      this.__setArrowKeys(v);
    }
  },
  computed: {
    rtlDir: function rtlDir () {
      return this.$q.i18n.rtl ? -1 : 1
    },
    arrowIcon: function arrowIcon () {
      var ico = [ this.$q.icon.carousel.left, this.$q.icon.carousel.right ];
      return this.$q.i18n.rtl
        ? ico.reverse()
        : ico
    },
    trackPosition: function trackPosition () {
      return cssTransform(("translateX(" + (this.rtlDir * this.position) + "%)"))
    },
    infiniteLeft: function infiniteLeft () {
      return this.infinite && this.slidesNumber > 1 && this.positionSlide < 0
    },
    infiniteRight: function infiniteRight () {
      return this.infinite && this.slidesNumber > 1 && this.positionSlide >= this.slidesNumber
    },
    canGoToPrevious: function canGoToPrevious () {
      return this.infinite ? this.slidesNumber > 1 : this.slide > 0
    },
    canGoToNext: function canGoToNext () {
      return this.infinite ? this.slidesNumber > 1 : this.slide < this.slidesNumber - 1
    },
    computedQuickNavIcon: function computedQuickNavIcon () {
      return this.quickNavIcon || this.$q.icon.carousel.quickNav
    },
    computedStyle: function computedStyle () {
      if (!this.inFullscreen && this.height) {
        return ("height: " + (this.height))
      }
    },
    slotScope: function slotScope () {
      return {
        slide: this.slide,
        slidesNumber: this.slidesNumber,
        percentage: this.slidesNumber < 2
          ? 100
          : 100 * this.slide / (this.slidesNumber - 1),
        goToSlide: this.goToSlide,
        previous: this.previous,
        next: this.next,
        color: this.color,
        inFullscreen: this.inFullscreen,
        toggleFullscreen: this.toggleFullscreen,
        canGoToNext: this.canGoToNext,
        canGoToPrevious: this.canGoToPrevious
      }
    },
    computedThumbnailIcon: function computedThumbnailIcon () {
      return this.thumbnailsIcon || this.$q.icon.carousel.thumbnails
    }
  },
  methods: {
    previous: function previous () {
      return this.canGoToPrevious
        ? this.goToSlide(this.slide - 1)
        : Promise.resolve()
    },
    next: function next () {
      return this.canGoToNext
        ? this.goToSlide(this.slide + 1)
        : Promise.resolve()
    },
    goToSlide: function goToSlide (slide, fromSwipe) {
      var this$1 = this;
      if ( fromSwipe === void 0 ) fromSwipe = false;

      return new Promise(function (resolve) {
        var
          direction = '',
          curSlide = this$1.slide,
          pos;

        this$1.__cleanup();

        var finish = function () {
          this$1.$emit('input', this$1.slide);
          this$1.$emit('slide', this$1.slide, direction);
          this$1.$emit('slide-direction', direction);
          this$1.__planAutoPlay();
          resolve();
        };

        if (this$1.slidesNumber < 2) {
          this$1.slide = 0;
          this$1.positionSlide = 0;
          pos = 0;
        }
        else {
          if (!this$1.hasOwnProperty('initialPosition')) {
            this$1.position = -this$1.slide * 100;
          }
          direction = slide > this$1.slide ? 'next' : 'previous';
          if (this$1.infinite) {
            this$1.slide = normalizeToInterval(slide, 0, this$1.slidesNumber - 1);
            pos = normalizeToInterval(slide, -1, this$1.slidesNumber);
            if (!fromSwipe) {
              this$1.positionSlide = pos;
            }
          }
          else {
            this$1.slide = between(slide, 0, this$1.slidesNumber - 1);
            this$1.positionSlide = this$1.slide;
            pos = this$1.slide;
          }
        }

        this$1.$emit('slide-trigger', curSlide, this$1.slide, direction);
        pos = pos * -100;

        if (!this$1.animation) {
          this$1.position = pos;
          finish();
          return
        }

        this$1.animationInProgress = true;

        this$1.animUid = start({
          from: this$1.position,
          to: pos,
          duration: isNumber(this$1.animation) ? this$1.animation : 300,
          easing: fromSwipe
            ? this$1.swipeEasing || decelerate
            : this$1.easing || standard,
          apply: function (pos) {
            this$1.position = pos;
          },
          done: function () {
            if (this$1.infinite) {
              this$1.position = -this$1.slide * 100;
              this$1.positionSlide = this$1.slide;
            }
            this$1.animationInProgress = false;
            finish();
          }
        });
      })
    },
    stopAnimation: function stopAnimation () {
      stop(this.animUid);
      this.animationInProgress = false;
    },
    __pan: function __pan (event) {
      var this$1 = this;

      if (this.infinite && this.animationInProgress) {
        return
      }
      if (event.isFirst) {
        this.initialPosition = this.position;
        this.__cleanup();
      }

      var delta = this.rtlDir * (event.direction === 'left' ? -1 : 1) * event.distance.x;

      if (
        (this.infinite && this.slidesNumber < 2) ||
        (
          !this.infinite &&
          (
            (this.slide === 0 && delta > 0) ||
            (this.slide === this.slidesNumber - 1 && delta < 0)
          )
        )
      ) {
        delta = 0;
      }

      var
        pos = this.initialPosition + delta / this.$refs.track.offsetWidth * 100,
        slidePos = this.slide + this.rtlDir * (event.direction === 'left' ? 1 : -1);

      if (this.position !== pos) {
        this.position = pos;
      }
      if (this.positionSlide !== slidePos) {
        this.positionSlide = slidePos;
      }

      if (event.isFinal) {
        this.goToSlide(
          event.distance.x < 40
            ? this.slide
            : this.positionSlide,
          true
        ).then(function () {
          delete this$1.initialPosition;
        });
      }
    },
    __planAutoPlay: function __planAutoPlay () {
      var this$1 = this;

      this.$nextTick(function () {
        if (this$1.autoplay) {
          clearTimeout(this$1.timer);
          this$1.timer = setTimeout(
            this$1.next,
            isNumber(this$1.autoplay) ? this$1.autoplay : 5000
          );
        }
      });
    },
    __cleanup: function __cleanup () {
      this.stopAnimation();
      clearTimeout(this.timer);
    },
    __handleArrowKey: function __handleArrowKey (e) {
      var key = getEventKey(e);

      if (key === 37) { // left arrow key
        this.previous();
      }
      else if (key === 39) { // right arrow key
        this.next();
      }
    },
    __setArrowKeys: function __setArrowKeys (/* boolean */ state) {
      var op = (state === true ? 'add' : 'remove') + "EventListener";
      document[op]('keydown', this.__handleArrowKey);
    },
    __registerSlide: function __registerSlide () {
      this.slidesNumber++;
    },
    __unregisterSlide: function __unregisterSlide () {
      this.slidesNumber--;
    },
    __getScopedSlots: function __getScopedSlots (h) {
      var this$1 = this;

      if (this.slidesNumber === 0) {
        return
      }
      var slots = this.$scopedSlots;
      if (slots) {
        return Object.keys(slots)
          .filter(function (key) { return key.startsWith('control-'); })
          .map(function (key) { return slots[key](this$1.slotScope); })
      }
    },
    __getQuickNav: function __getQuickNav (h) {
      var this$1 = this;

      if (this.slidesNumber === 0 || !this.quickNav) {
        return
      }

      var
        slot = this.$scopedSlots['quick-nav'],
        items = [];

      if (slot) {
        var loop = function ( i ) {
          items.push(slot({
            slide: i,
            before: i < this$1.slide,
            current: i === this$1.slide,
            after: i > this$1.slide,
            color: this$1.color,
            goToSlide: function (slide) { this$1.goToSlide(slide || i); }
          }));
        };

        for (var i = 0; i < this.slidesNumber; i++) loop( i );
      }
      else {
        var loop$1 = function ( i ) {
          items.push(h(QBtn, {
            key: i,
            'class': { inactive: i !== this$1.slide },
            props: {
              icon: this$1.computedQuickNavIcon,
              round: true,
              flat: true,
              dense: true,
              color: this$1.color
            },
            on: {
              click: function () { this$1.goToSlide(i); }
            }
          }));
        };

        for (var i$1 = 0; i$1 < this.slidesNumber; i$1++) loop$1( i$1 );
      }

      return h('div', {
        staticClass: 'q-carousel-quick-nav scroll text-center',
        'class': [("text-" + (this.color)), ("absolute-" + (this.quickNavPosition))]
      }, items)
    },
    __getThumbnails: function __getThumbnails (h) {
      var this$1 = this;

      var slides = this.thumbnails.map(function (img, index) {
        if (!img) {
          return
        }

        return h('div', {
          on: {
            click: function () { this$1.goToSlide(index); }
          }
        }, [
          h('img', {
            attrs: { src: img },
            'class': { active: this$1.slide === index }
          })
        ])
      });

      var nodes = [
        h(QBtn, {
          staticClass: 'q-carousel-thumbnail-btn absolute',
          props: {
            icon: this.computedThumbnailIcon,
            fabMini: true,
            flat: true,
            color: this.color
          },
          on: {
            click: function () {
              this$1.viewThumbnails = !this$1.viewThumbnails;
            }
          }
        }),
        h('div', {
          staticClass: 'q-carousel-thumbnails scroll absolute-bottom',
          'class': { active: this.viewThumbnails }
        }, [h('div', {
          staticClass: 'row gutter-xs',
          'class': this.thumbnailsHorizontal ? 'no-wrap' : 'justify-center'
        }, slides)])
      ];

      if (this.viewThumbnails) {
        nodes.unshift(
          h('div', {
            staticClass: 'absolute-full',
            on: {
              click: function () { this$1.viewThumbnails = false; }
            }
          })
        );
      }

      return nodes
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-carousel',
      style: this.computedStyle,
      'class': { fullscreen: this.inFullscreen }
    }, [
      h('div', {
        staticClass: 'q-carousel-inner',
        directives: this.noSwipe
          ? null
          : [{
            name: 'touch-pan',
            modifiers: {
              horizontal: true,
              prevent: true,
              stop: true
            },
            value: this.__pan
          }]
      }, [
        h('div', {
          ref: 'track',
          staticClass: 'q-carousel-track',
          style: this.trackPosition,
          'class': {
            'infinite-left': this.infiniteLeft,
            'infinite-right': this.infiniteRight
          }
        }, [
          h('div', { staticClass: 'q-carousel-slide', style: ("flex: 0 0 " + (100) + "%"), directives: [{ name: 'show', value: this.infiniteRight }] }),
          this.$slots.default,
          h('div', { staticClass: 'q-carousel-slide', style: ("flex: 0 0 " + (100) + "%"), directives: [{ name: 'show', value: this.infiniteLeft }] })
        ])
      ]),
      this.arrows ? h(QBtn, {
        staticClass: 'q-carousel-left-arrow absolute',
        props: { color: this.color, icon: this.arrowIcon[0], fabMini: true, flat: true },
        directives: [{ name: 'show', value: this.canGoToPrevious }],
        on: { click: this.previous }
      }) : null,
      this.arrows ? h(QBtn, {
        staticClass: 'q-carousel-right-arrow absolute',
        props: { color: this.color, icon: this.arrowIcon[1], fabMini: true, flat: true },
        directives: [{ name: 'show', value: this.canGoToNext }],
        on: { click: this.next }
      }) : null,
      this.__getQuickNav(h),
      this.__getScopedSlots(h),
      this.thumbnails.length
        ? this.__getThumbnails(h)
        : null,
      this.$slots.control
    ])
  },
  mounted: function mounted () {
    var this$1 = this;

    this.__planAutoPlay();
    if (this.handleArrowKeys) {
      this.__setArrowKeys(true);
    }
    this.__stopSlideNumberNotifier = this.$watch('slidesNumber', function (val) {
      if (this$1.value >= val) {
        this$1.$emit('input', val - 1);
      }
    }, { immediate: true });
  },
  beforeDestroy: function beforeDestroy () {
    this.__cleanup();
    this.__stopSlideNumberNotifier();
    if (this.handleArrowKeys) {
      this.__setArrowKeys(false);
    }
  }
}

var QCarouselSlide = {
  name: 'QCarouselSlide',
  inject: {
    carousel: {
      default: function default$1 () {
        console.error('QCarouselSlide needs to be child of QCarousel');
      }
    }
  },
  props: {
    imgSrc: String
  },
  computed: {
    computedStyle: function computedStyle () {
      var style = {};
      if (this.imgSrc) {
        style.backgroundImage = "url(" + (this.imgSrc) + ")";
        style.backgroundSize = "cover";
        style.backgroundPosition = "50%";
      }
      if (!this.carousel.inFullscreen && this.carousel.height) {
        style.maxHeight = this.carousel.height;
      }
      return style
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-carousel-slide relative-position scroll',
      style: this.computedStyle
    }, this.$slots.default)
  },
  created: function created () {
    this.carousel.__registerSlide();
  },
  beforeDestroy: function beforeDestroy () {
    this.carousel.__unregisterSlide();
  }
}

var QCarouselControl = {
  name: 'QCarouselControl',
  props: {
    position: {
      type: String,
      default: 'bottom-right'
    },
    offset: {
      type: Array,
      default: function () { return [18, 18]; }
    }
  },
  computed: {
    computedClass: function computedClass () {
      return ("absolute-" + (this.position))
    },
    computedStyle: function computedStyle () {
      return {
        margin: ((this.offset[1]) + "px " + (this.offset[0]) + "px")
      }
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-carousel-control absolute',
      style: this.computedStyle,
      'class': this.computedClass
    }, this.$slots.default)
  }
}

var QChatMessage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-message",class:{ 'q-message-sent': _vm.sent, 'q-message-received': !_vm.sent }},[(_vm.label)?_c('p',{staticClass:"q-message-label text-center",domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"q-message-container row items-end no-wrap"},[(_vm.hasAvatarSlot())?_vm._t("avatar"):_vm._e(),_vm._v(" "),(_vm.avatar && !_vm.hasAvatarSlot())?_c('img',{staticClass:"q-message-avatar",attrs:{"src":_vm.avatar}}):_vm._e(),_vm._v(" "),_c('div',{class:_vm.sizeClass},[(_vm.name)?_c('div',{staticClass:"q-message-name",domProps:{"innerHTML":_vm._s(_vm.name)}}):_vm._e(),_vm._v(" "),(_vm.text)?_vm._l((_vm.text),function(msg,index){return _c('div',{key:index,staticClass:"q-message-text",class:_vm.messageClass},[_c('span',{staticClass:"q-message-text-content",class:_vm.textClass},[_c('div',{domProps:{"innerHTML":_vm._s(msg)}}),_vm._v(" "),(_vm.stamp)?_c('div',{staticClass:"q-message-stamp",domProps:{"innerHTML":_vm._s(_vm.stamp)}}):_vm._e()])])}):_vm._e(),_vm._v(" "),(_vm.hasDefaultSlot())?_c('div',{staticClass:"q-message-text",class:_vm.messageClass},[_c('span',{staticClass:"q-message-text-content",class:_vm.textClass},[_vm._t("default"),_vm._v(" "),(_vm.stamp)?_c('div',{staticClass:"q-message-stamp",domProps:{"innerHTML":_vm._s(_vm.stamp)}}):_vm._e()],2)]):_vm._e()],2)],2)])},staticRenderFns: [],
  name: 'QChatMessage',
  props: {
    sent: Boolean,
    label: String,
    bgColor: String,
    textColor: String,
    name: String,
    avatar: String,
    text: Array,
    stamp: String,
    size: String
  },
  computed: {
    textClass: function textClass () {
      if (this.textColor) {
        return ("text-" + (this.textColor))
      }
    },
    messageClass: function messageClass () {
      if (this.bgColor) {
        return ("text-" + (this.bgColor))
      }
    },
    sizeClass: function sizeClass () {
      if (this.size) {
        return ("col-" + (this.size))
      }
    }
  },
  methods: {
    hasDefaultSlot: function hasDefaultSlot () {
      return Boolean(this.$slots['default'])
    },
    hasAvatarSlot: function hasAvatarSlot () {
      return Boolean(this.$slots['avatar'])
    }
  }
}

function getDirection$1 (mod) {
  var dir = {}

  ;['left', 'right', 'up', 'down', 'horizontal', 'vertical'].forEach(function (direction) {
    if (mod[direction]) {
      dir[direction] = true;
    }
  });

  if (Object.keys(dir).length === 0) {
    return {
      left: true, right: true, up: true, down: true, horizontal: true, vertical: true
    }
  }

  if (dir.horizontal) {
    dir.left = dir.right = true;
  }
  if (dir.vertical) {
    dir.up = dir.down = true;
  }
  if (dir.left && dir.right) {
    dir.horizontal = true;
  }
  if (dir.up && dir.down) {
    dir.vertical = true;
  }

  return dir
}

var TouchSwipe = {
  name: 'touch-swipe',
  bind: function bind (el, binding) {
    var mouse = !binding.modifiers.noMouse;

    var ctx = {
      handler: binding.value,
      threshold: parseInt(binding.arg, 10) || 300,
      direction: getDirection$1(binding.modifiers),

      mouseStart: function mouseStart (evt) {
        if (leftClick(evt)) {
          document.addEventListener('mousemove', ctx.move);
          document.addEventListener('mouseup', ctx.mouseEnd);
          ctx.start(evt);
        }
      },
      mouseEnd: function mouseEnd (evt) {
        document.removeEventListener('mousemove', ctx.move);
        document.removeEventListener('mouseup', ctx.mouseEnd);
        ctx.end(evt);
      },

      start: function start (evt) {
        var pos = position(evt);

        ctx.event = {
          x: pos.left,
          y: pos.top,
          time: new Date().getTime(),
          detected: false,
          abort: false
        };
      },
      move: function move (evt) {
        if (ctx.event.abort) {
          return
        }

        if (new Date().getTime() - ctx.event.time > ctx.threshold) {
          ctx.event.abort = true;
          return
        }

        if (ctx.event.detected) {
          evt.stopPropagation();
          evt.preventDefault();
          return
        }

        var
          pos = position(evt),
          distX = pos.left - ctx.event.x,
          absX = Math.abs(distX),
          distY = pos.top - ctx.event.y,
          absY = Math.abs(distY);

        if (absX === absY) {
          return
        }

        ctx.event.detected = true;
        ctx.event.abort = !(
          (ctx.direction.vertical && absX < absY) ||
          (ctx.direction.horizontal && absX > absY) ||
          (ctx.direction.up && absX < absY && distY < 0) ||
          (ctx.direction.down && absX < absY && distY > 0) ||
          (ctx.direction.left && absX > absY && distX < 0) ||
          (ctx.direction.right && absX > absY && distX > 0)
        );

        ctx.move(evt);
      },
      end: function end (evt) {
        if (ctx.event.abort || !ctx.event.detected) {
          return
        }

        var duration = new Date().getTime() - ctx.event.time;
        if (duration > ctx.threshold) {
          return
        }

        evt.stopPropagation();
        evt.preventDefault();

        var
          direction,
          pos = position(evt),
          distX = pos.left - ctx.event.x,
          absX = Math.abs(distX),
          distY = pos.top - ctx.event.y,
          absY = Math.abs(distY);

        if (absX >= absY) {
          if (absX < 50) {
            return
          }
          direction = distX < 0 ? 'left' : 'right';
        }
        else {
          if (absY < 50) {
            return
          }
          direction = distY < 0 ? 'up' : 'down';
        }

        if (ctx.direction[direction]) {
          ctx.handler({
            evt: evt,
            direction: direction,
            duration: duration,
            distance: {
              x: absX,
              y: absY
            }
          });
        }
      }
    };

    el.__qtouchswipe = ctx;
    el.classList.add('q-touch');

    if (mouse) {
      el.addEventListener('mousedown', ctx.mouseStart);
    }

    el.addEventListener('touchstart', ctx.start);
    el.addEventListener('touchmove', ctx.move);
    el.addEventListener('touchend', ctx.end);
  },
  update: function update (el, binding) {
    if (binding.oldValue !== binding.value) {
      el.__qtouchswipe.handler = binding.value;
    }
  },
  unbind: function unbind (el, binding) {
    var ctx = el.__qtouchswipe;
    if (!ctx) { return }

    el.removeEventListener('mousedown', ctx.mouseStart);

    el.removeEventListener('touchstart', ctx.start);
    el.removeEventListener('touchmove', ctx.move);
    el.removeEventListener('touchend', ctx.end);

    delete el.__qtouchswipe;
  }
}

var CheckboxMixin = {
  directives: {
    TouchSwipe: TouchSwipe
  },
  props: {
    val: {},
    trueValue: { default: true },
    falseValue: { default: false }
  },
  computed: {
    isTrue: function isTrue () {
      return this.modelIsArray
        ? this.index > -1
        : this.value === this.trueValue
    },
    isFalse: function isFalse () {
      return this.modelIsArray
        ? this.index === -1
        : this.value === this.falseValue
    },
    index: function index () {
      if (this.modelIsArray) {
        return this.value.indexOf(this.val)
      }
    },
    modelIsArray: function modelIsArray () {
      return Array.isArray(this.value)
    }
  },
  methods: {
    toggle: function toggle (evt, blur) {
      if ( blur === void 0 ) blur = true;

      if (this.disable || this.readonly) {
        return
      }
      evt && stopAndPrevent(evt);
      blur && this.$el.blur();

      var val;

      if (this.modelIsArray) {
        if (this.isTrue) {
          val = this.value.slice();
          val.splice(this.index, 1);
        }
        else {
          val = this.value.concat(this.val);
        }
      }
      else if (this.isTrue) {
        val = this.toggleIndeterminate ? this.indeterminateValue : this.falseValue;
      }
      else if (this.isFalse) {
        val = this.trueValue;
      }
      else {
        val = this.falseValue;
      }

      this.__update(val);
    }
  }
}

var OptionMixin = {
  props: {
    value: {
      required: true
    },
    label: String,
    leftLabel: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    keepColor: Boolean,
    dark: Boolean,
    disable: Boolean,
    readonly: Boolean,
    noFocus: Boolean,
    checkedIcon: String,
    uncheckedIcon: String
  },
  computed: {
    classes: function classes () {
      return [
        this.__kebabTag,
        {
          disabled: this.disable,
          reverse: this.leftLabel,
          'q-focusable': this.focusable
        }
      ]
    },
    innerClasses: function innerClasses () {
      if (this.isTrue || this.isIndeterminate) {
        return ['active', ("text-" + (this.color))]
      }
      else {
        var color = this.keepColor
          ? this.color
          : (this.dark ? 'light' : 'faded');

        return ("text-" + color)
      }
    },
    focusable: function focusable () {
      return !this.noFocus && !this.disable && !this.readonly
    },
    tabindex: function tabindex () {
      return this.focusable ? 0 : -1
    }
  },
  methods: {
    __update: function __update (value) {
      var this$1 = this;

      var ref = this.$refs.ripple;
      if (ref) {
        ref.classList.add('active');
        setTimeout(function () {
          ref.classList.remove('active');
        }, 10);
      }

      this.$emit('input', value);
      this.$nextTick(function () {
        if (JSON.stringify(value) !== JSON.stringify(this$1.value)) {
          this$1.$emit('change', value);
        }
      });
    },
    __handleKeyDown: function __handleKeyDown (e) {
      if ([13, 32].includes(getEventKey(e))) {
        this.toggle(e, false);
      }
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h('div', {
      staticClass: 'q-option cursor-pointer no-outline row inline no-wrap items-center',
      'class': this.classes,
      attrs: { tabindex: this.tabindex },
      on: {
        click: this.toggle,
        focus: function () { this$1.$emit('focus'); },
        blur: function () { this$1.$emit('blur'); },
        keydown: this.__handleKeyDown
      },
      directives: this.__kebabTag === 'q-toggle' && !this.disable && !this.readonly
        ? [{
          name: 'touch-swipe',
          modifiers: { horizontal: true },
          value: this.__swipe
        }]
        : null
    }, [
      h('div', {
        staticClass: 'q-option-inner relative-position',
        'class': this.innerClasses
      }, [
        h('input', {
          attrs: { type: 'checkbox' },
          on: { change: this.toggle }
        }),
        this.$q.platform.is.desktop
          ? h('div', { staticClass: 'q-focus-helper' })
          : null,
        this.__getContent(h)
      ]),

      this.label
        ? h('span', {
          staticClass: 'q-option-label',
          domProps: { innerHTML: this.label }
        })
        : null,

      this.$slots.default
    ])
  }
}

var QCheckbox = {
  name: 'QCheckbox',
  mixins: [CheckboxMixin, OptionMixin],
  props: {
    toggleIndeterminate: Boolean,
    indeterminateValue: { default: null },
    indeterminateIcon: String
  },
  computed: {
    isIndeterminate: function isIndeterminate () {
      return this.value === void 0 || this.value === this.indeterminateValue
    },
    checkedStyle: function checkedStyle () {
      return this.isTrue
        ? {transition: 'opacity 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 800ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', opacity: 1, transform: 'scale(1)'}
        : {transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms', opacity: 0, transform: 'scale(0)'}
    },
    indeterminateStyle: function indeterminateStyle () {
      return this.isIndeterminate
        ? {transition: 'opacity 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 800ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', opacity: 1, transform: 'scale(1)'}
        : {transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms', opacity: 0, transform: 'scale(0)'}
    },
    uncheckedStyle: function uncheckedStyle () {
      return this.isFalse
        ? {opacity: 1}
        : {transition: 'opacity 650ms cubic-bezier(0.23, 1, 0.32, 1) 150ms', opacity: 0}
    }
  },
  methods: {
    __getContent: function __getContent (h) {
      return [
        h(QIcon, {
          staticClass: 'q-checkbox-icon cursor-pointer',
          props: { name: this.uncheckedIcon || this.$q.icon.checkbox.unchecked["ios"] },
          style: this.uncheckedStyle
        }),
        h(QIcon, {
          staticClass: 'q-checkbox-icon cursor-pointer absolute-full',
          props: { name: this.indeterminateIcon || this.$q.icon.checkbox.indeterminate["ios"] },
          style: this.indeterminateStyle
        }),
        h(QIcon, {
          staticClass: 'q-checkbox-icon cursor-pointer absolute-full',
          props: { name: this.checkedIcon || this.$q.icon.checkbox.checked["ios"] },
          style: this.checkedStyle
        }),
        null
      ]
    }
  },
  beforeCreate: function beforeCreate () {
    this.__kebabTag = 'q-checkbox';
  }
}

var QChip = {
  name: 'QChip',
  props: {
    small: Boolean,
    dense: Boolean,
    tag: Boolean,
    square: Boolean,
    floating: Boolean,
    pointing: {
      type: String,
      validator: function (v) { return ['up', 'right', 'down', 'left'].includes(v); }
    },
    color: String,
    textColor: String,
    icon: String,
    iconRight: String,
    avatar: String,
    closable: Boolean,
    detail: Boolean
  },
  computed: {
    classes: function classes () {
      var this$1 = this;

      var cls = [];

      this.pointing && cls.push(("q-chip-pointing-" + (this.pointing)))
      ;['tag', 'square', 'floating', 'pointing', 'small', 'dense'].forEach(function (prop) {
        this$1[prop] && cls.push(("q-chip-" + prop));
      });
      if (this.floating) {
        !this.dense && cls.push('q-chip-dense');
        !this.square && cls.push('q-chip-square');
      }

      if (this.color) {
        cls.push(("bg-" + (this.color)));
        !this.textColor && cls.push("text-white");
      }
      if (this.textColor) {
        cls.push(("text-" + (this.textColor)));
      }

      return cls
    }
  },
  methods: {
    __onClick: function __onClick (e) {
      this.$emit('click', e);
    },
    __onMouseDown: function __onMouseDown (e) {
      this.$emit('focus', e);
    },
    __handleKeyDown: function __handleKeyDown (e) {
      if (this.closable && [8, 13, 32].includes(getEventKey(e))) {
        stopAndPrevent(e);
        this.$emit('hide');
      }
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h('div', {
      staticClass: 'q-chip row no-wrap inline items-center',
      'class': this.classes,
      on: {
        mousedown: this.__onMouseDown,
        touchstart: this.__onMouseDown,
        click: this.__onClick,
        keydown: this.__handleKeyDown
      }
    }, [
      this.icon || this.avatar
        ? h('div', {
          staticClass: 'q-chip-side q-chip-left row flex-center',
          'class': { 'q-chip-detail': this.detail }
        }, [
          this.icon
            ? h(QIcon, { staticClass: 'q-chip-icon', props: { name: this.icon } })
            : (this.avatar ? h('img', { domProps: { src: this.avatar } }) : null)
        ])
        : null,

      h('div', { staticClass: 'q-chip-main' }, [
        this.$slots.default
      ]),

      this.iconRight
        ? h(QIcon, {
          props: { name: this.iconRight },
          'class': this.closable ? 'on-right q-chip-icon' : 'q-chip-side q-chip-right'
        })
        : null,

      this.closable
        ? h('div', { staticClass: 'q-chip-side q-chip-close q-chip-right row flex-center' }, [
          h(QIcon, {
            props: { name: this.$q.icon.chip.close },
            staticClass: 'cursor-pointer',
            nativeOn: {
              click: function (e) {
                e && e.stopPropagation();
                this$1.$emit('hide');
              }
            }
          })
        ])
        : null
    ])
  }
}

var marginal = {
  type: Array,
  validator: function (v) { return v.every(function (i) { return 'icon' in i; }); }
};

var FrameMixin = {
  mixins: [AlignMixin],
  components: {
    QIcon: QIcon
  },
  props: {
    prefix: String,
    suffix: String,
    stackLabel: String,
    floatLabel: String,
    error: Boolean,
    warning: Boolean,
    disable: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    align: {
      default: 'left'
    },
    dark: Boolean,
    before: marginal,
    after: marginal,
    inverted: Boolean,
    invertedLight: Boolean,
    hideUnderline: Boolean,
    clearValue: {
      default: null
    },
    noParentField: Boolean
  },
  computed: {
    inputPlaceholder: function inputPlaceholder () {
      if ((!this.floatLabel && !this.stackLabel) || this.labelIsAbove) {
        return this.placeholder
      }
    },
    isInverted: function isInverted () {
      return this.inverted || this.invertedLight
    },
    isInvertedLight: function isInvertedLight () {
      return (this.invertedLight && !this.hasError) || (this.inverted && this.hasWarning)
    },
    labelIsAbove: function labelIsAbove () {
      return this.focused || this.length || this.additionalLength || this.stackLabel
    },
    editable: function editable () {
      return !this.disable && !this.readonly
    },
    hasError: function hasError () {
      return !!((!this.noParentField && this.field && this.field.error) || this.error)
    },
    hasWarning: function hasWarning () {
      // error is the higher priority
      return !!(!this.hasError && ((!this.noParentField && this.field && this.field.warning) || this.warning))
    },
    fakeInputValue: function fakeInputValue () {
      return this.actualValue || this.actualValue === 0
        ? this.actualValue
        : this.placeholder
    },
    fakeInputClasses: function fakeInputClasses () {
      var hasValue = this.actualValue || this.actualValue === 0;
      return [this.alignClass, {
        invisible: (this.stackLabel || this.floatLabel) && !this.labelIsAbove && !hasValue,
        'q-input-target-placeholder': !hasValue && this.inputPlaceholder
      }]
    }
  },
  methods: {
    clear: function clear (evt) {
      if (!this.editable) {
        return
      }
      evt && stopAndPrevent(evt);
      var val = this.clearValue;
      if (this.__setModel) {
        this.__setModel(val, true);
      }
      this.$emit('clear', val);
    }
  }
}

var InputMixin = {
  props: {
    autofocus: [Boolean, String],
    maxHeight: Number,
    placeholder: String,
    loading: Boolean
  },
  data: function data () {
    return {
      focused: false,
      timer: null,
      isNumberError: false,
      isNegZero: false
    }
  },
  methods: {
    focus: function focus () {
      if (!this.disable) {
        this.$refs.input.focus();
      }
    },
    blur: function blur () {
      this.$refs.input.blur();
    },
    select: function select () {
      this.$refs.input.select();
    },

    __onFocus: function __onFocus (e) {
      clearTimeout(this.timer);
      this.focused = true;
      this.$emit('focus', e);
    },
    __onInputBlur: function __onInputBlur (e) {
      var this$1 = this;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        this$1.__onBlur(e);
      }, 200);
    },
    __onBlur: function __onBlur (e) {
      this.focused = false;
      this.$emit('blur', e);
      this.__emit();
    },
    __emit: function __emit () {
      var this$1 = this;

      var isNumberError = this.isNumber && this.isNumberError;
      var value = isNumberError ? (this.isNegZero ? -0 : null) : this.model;
      if (isNumberError) {
        this.$emit('input', value);
      }
      this.$nextTick(function () {
        if (JSON.stringify(value) !== JSON.stringify(this$1.value)) {
          this$1.$emit('change', value);
        }
      });
    },
    __onKeydown: function __onKeydown (e) {
      this.$emit('keydown', e);
    },
    __onKeyup: function __onKeyup (e) {
      this.$emit('keyup', e);
    },
    __onClick: function __onClick (e) {
      this.focus();
      this.$emit('click', e);
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      var input = this$1.$refs.input;
      if (this$1.autofocus && input) {
        input.focus();
        if (this$1.autofocus === 'select') {
          input.select();
        }
      }
    });
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
  }
}

var ParentFieldMixin = {
  inject: {
    field: {
      from: '__field',
      default: null
    }
  },
  props: {
    noParentField: Boolean
  },
  beforeMount: function beforeMount () {
    if (!this.noParentField && this.field) {
      this.field.__registerInput(this);
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (!this.noParentField && this.field) {
      this.field.__unregisterInput(this);
    }
  }
}

var QInputFrame = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-if row no-wrap items-end relative-position",class:_vm.classes,attrs:{"tabindex":_vm.focusable && !_vm.disable ? 0 : -1},on:{"click":_vm.__onClick}},[(_vm.before)?_vm._l((_vm.before),function(item){return _c('q-icon',{key:("b" + (item.icon)),staticClass:"q-if-control q-if-control-before",class:{hidden: _vm.__additionalHidden(item, _vm.hasError, _vm.hasWarning, _vm.length)},attrs:{"name":item.icon},nativeOn:{"mousedown":function($event){return _vm.__onMouseDown($event)},"touchstart":function($event){return _vm.__onMouseDown($event)},"click":function($event){_vm.__baHandler($event, item);}}})}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"q-if-inner col row no-wrap relative-position"},[(_vm.hasLabel)?_c('div',{staticClass:"q-if-label ellipsis full-width absolute self-start",class:{'q-if-label-above': _vm.labelIsAbove},domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e(),_vm._v(" "),(_vm.prefix)?_c('span',{staticClass:"q-if-addon q-if-addon-left",class:_vm.addonClass,domProps:{"innerHTML":_vm._s(_vm.prefix)}}):_vm._e(),_vm._v(" "),_vm._t("default"),_vm._v(" "),(_vm.suffix)?_c('span',{staticClass:"q-if-addon q-if-addon-right",class:_vm.addonClass,domProps:{"innerHTML":_vm._s(_vm.suffix)}}):_vm._e()],2),_vm._v(" "),(_vm.after)?_vm._l((_vm.after),function(item){return _c('q-icon',{key:("a" + (item.icon)),staticClass:"q-if-control",class:{hidden: _vm.__additionalHidden(item, _vm.hasError, _vm.hasWarning, _vm.length)},attrs:{"name":item.icon},nativeOn:{"mousedown":function($event){return _vm.__onMouseDown($event)},"touchstart":function($event){return _vm.__onMouseDown($event)},"click":function($event){_vm.__baHandler($event, item);}}})}):_vm._e(),_vm._v(" "),_vm._t("after")],2)},staticRenderFns: [],
  name: 'QInputFrame',
  mixins: [FrameMixin, ParentFieldMixin],
  props: {
    topAddons: Boolean,
    focused: Boolean,
    length: Number,
    focusable: Boolean,
    additionalLength: Boolean
  },
  computed: {
    hasStackLabel: function hasStackLabel () {
      return typeof this.stackLabel === 'string' && this.stackLabel.length > 0
    },
    hasLabel: function hasLabel () {
      return this.hasStackLabel || (typeof this.floatLabel === 'string' && this.floatLabel.length > 0)
    },
    label: function label () {
      return this.hasStackLabel ? this.stackLabel : this.floatLabel
    },
    addonClass: function addonClass () {
      return {
        'q-if-addon-visible': !this.hasLabel || this.labelIsAbove,
        'self-start': this.topAddons
      }
    },
    classes: function classes () {
      var cls = [{
        'q-if-has-label': this.label,
        'q-if-focused': this.focused,
        'q-if-error': this.hasError,
        'q-if-warning': this.hasWarning,
        'q-if-disabled': this.disable,
        'q-if-focusable': this.focusable && !this.disable,
        'q-if-inverted': this.isInverted,
        'q-if-inverted-light': this.isInvertedLight,
        'q-if-light-color': this.lightColor,
        'q-if-dark': this.dark,
        'q-if-hide-underline': !this.isInverted && this.hideUnderline
      }];

      var color = this.hasError ? 'negative' : (this.hasWarning ? 'warning' : this.color);

      if (this.isInverted) {
        cls.push(("bg-" + color));
        cls.push(("text-" + (this.isInvertedLight ? 'black' : 'white')));
      }
      else if (color) {
        cls.push(("text-" + color));
      }

      return cls
    }
  },
  methods: {
    __onClick: function __onClick (e) {
      this.$emit('click', e);
    },
    __onMouseDown: function __onMouseDown (e) {
      var this$1 = this;

      this.$nextTick(function () { return this$1.$emit('focus', e); });
    },
    __additionalHidden: function __additionalHidden (item, hasError, hasWarning, length) {
      if (item.condition !== void 0) {
        return item.condition === false
      }
      return (
        (item.content !== void 0 && !item.content === (length > 0)) ||
        (item.error !== void 0 && !item.error === hasError) ||
        (item.warning !== void 0 && !item.warning === hasWarning)
      )
    },
    __baHandler: function __baHandler (evt, item) {
      if (!item.allowPropagation) {
        evt.stopPropagation();
      }
      if (item.handler) {
        item.handler(evt);
      }
    }
  }
}

var QChipsInput = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{staticClass:"q-chips-input",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"warning":_vm.warning,"disable":_vm.disable,"inverted":_vm.inverted,"invertedLight":_vm.invertedLight,"dark":_vm.dark,"hide-underline":_vm.hideUnderline,"before":_vm.before,"after":_vm.after,"color":_vm.color,"no-parent-field":_vm.noParentField,"focused":_vm.focused,"length":_vm.length,"additional-length":_vm.input.length > 0},on:{"click":_vm.__onClick}},[_c('div',{staticClass:"col row items-center group q-input-chips"},[_vm._l((_vm.model),function(label,index){return _c('q-chip',{key:(label + "#" + index),attrs:{"small":"","closable":_vm.editable,"color":_vm.computedChipBgColor,"text-color":_vm.computedChipTextColor,"tabindex":_vm.editable && _vm.focused ? 0 : -1},on:{"blur":_vm.__onInputBlur,"focus":_vm.__clearTimer,"hide":function($event){_vm.remove(index);}},nativeOn:{"blur":function($event){return _vm.__onInputBlur($event)},"focus":function($event){return _vm.__clearTimer($event)}}},[_vm._v(" "+_vm._s(label)+" ")])}),_vm._v(" "),(((_vm.$attrs).type)==='checkbox')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.input),expression:"input"}],ref:"input",staticClass:"col q-input-target",class:_vm.alignClass,attrs:{"placeholder":_vm.inputPlaceholder,"disabled":_vm.disable,"readonly":_vm.readonly,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.input)?_vm._i(_vm.input,null)>-1:(_vm.input)},on:{"focus":_vm.__onFocus,"blur":_vm.__onInputBlur,"keydown":_vm.__handleKeyDown,"keyup":_vm.__onKeyup,"change":function($event){var $$a=_vm.input,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.input=$$a.concat([$$v]));}else{$$i>-1&&(_vm.input=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.input=$$c;}}}},'input',_vm.$attrs,false)):(((_vm.$attrs).type)==='radio')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.input),expression:"input"}],ref:"input",staticClass:"col q-input-target",class:_vm.alignClass,attrs:{"placeholder":_vm.inputPlaceholder,"disabled":_vm.disable,"readonly":_vm.readonly,"type":"radio"},domProps:{"checked":_vm._q(_vm.input,null)},on:{"focus":_vm.__onFocus,"blur":_vm.__onInputBlur,"keydown":_vm.__handleKeyDown,"keyup":_vm.__onKeyup,"change":function($event){_vm.input=null;}}},'input',_vm.$attrs,false)):_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.input),expression:"input"}],ref:"input",staticClass:"col q-input-target",class:_vm.alignClass,attrs:{"placeholder":_vm.inputPlaceholder,"disabled":_vm.disable,"readonly":_vm.readonly,"type":(_vm.$attrs).type},domProps:{"value":(_vm.input)},on:{"focus":_vm.__onFocus,"blur":_vm.__onInputBlur,"keydown":_vm.__handleKeyDown,"keyup":_vm.__onKeyup,"input":function($event){if($event.target.composing){ return; }_vm.input=$event.target.value;}}},'input',_vm.$attrs,false))],2),_vm._v(" "),(_vm.isLoading)?_c('q-spinner',{staticClass:"q-if-control",attrs:{"slot":"after","size":"24px"},slot:"after"}):(_vm.editable)?_c('q-icon',{staticClass:"q-if-control",class:{invisible: !_vm.input.length},attrs:{"slot":"after","name":_vm.computedAddIcon},nativeOn:{"mousedown":function($event){return _vm.__clearTimer($event)},"touchstart":function($event){return _vm.__clearTimer($event)},"click":function($event){_vm.add();}},slot:"after"}):_vm._e(),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],
  name: 'QChipsInput',
  mixins: [FrameMixin, InputMixin],
  components: {
    QInputFrame: QInputFrame,
    QChip: QChip,
    QSpinner: QSpinner
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    chipsColor: String,
    chipsBgColor: String,
    readonly: Boolean,
    addIcon: String
  },
  data: function data () {
    var this$1 = this;

    return {
      input: '',
      model: this.value.slice(),
      watcher: null,
      shadow: {
        val: this.input,
        set: this.add,
        loading: false,
        selectionOpen: false,
        watched: 0,
        isDark: function () { return this$1.dark; },
        hasFocus: function () { return document.activeElement === this$1.$refs.input; },
        register: function () {
          this$1.shadow.watched += 1;
          this$1.__watcherRegister();
        },
        unregister: function () {
          this$1.shadow.watched = Math.max(0, this$1.shadow.watched - 1);
          this$1.__watcherUnregister();
        },
        getEl: function () { return this$1.$refs.input; }
      }
    }
  },
  watch: {
    value: function value (v) {
      this.model = v.slice();
    }
  },
  provide: function provide () {
    return {
      __input: this.shadow
    }
  },
  computed: {
    length: function length () {
      return this.model
        ? this.model.length
        : 0
    },
    isLoading: function isLoading () {
      return this.loading || (this.shadow.watched && this.shadow.loading)
    },
    computedAddIcon: function computedAddIcon () {
      return this.addIcon || this.$q.icon.chipsInput.add
    },
    computedChipTextColor: function computedChipTextColor () {
      if (this.chipsColor) {
        return this.chipsColor
      }
      if (this.isInvertedLight) {
        return this.invertedLight ? this.color : 'white'
      }
      if (this.isInverted) {
        return this.invertedLight ? 'grey-10' : this.color
      }
      return this.dark
        ? this.color
        : 'white'
    },
    computedChipBgColor: function computedChipBgColor () {
      if (this.chipsBgColor) {
        return this.chipsBgColor
      }
      if (this.isInvertedLight) {
        return this.invertedLight ? 'grey-10' : this.color
      }
      if (this.isInverted) {
        return this.invertedLight ? this.color : 'white'
      }
      return this.dark
        ? 'white'
        : this.color
    }
  },
  methods: {
    add: function add (value) {
      if ( value === void 0 ) value = this.input;

      clearTimeout(this.timer);
      this.focus();

      if (this.isLoading || !this.editable || !value) {
        return
      }
      if (this.model.includes(value)) {
        this.$emit('duplicate', value);
        return
      }

      this.model.push(value);
      this.$emit('input', this.model);
      this.input = '';
    },
    remove: function remove (index) {
      clearTimeout(this.timer);
      this.focus();
      if (this.editable && index >= 0 && index < this.length) {
        this.model.splice(index, 1);
        this.$emit('input', this.model);
      }
    },
    __clearTimer: function __clearTimer () {
      var this$1 = this;

      this.$nextTick(function () { return clearTimeout(this$1.timer); });
    },
    __handleKeyDown: function __handleKeyDown (e) {
      switch (getEventKey(e)) {
        case 13: // ENTER key
          if (this.shadow.selectionOpen) {
            return
          }
          stopAndPrevent(e);
          return this.add()
        case 8: // Backspace key
          if (!this.input.length && this.length) {
            this.remove(this.length - 1);
          }
          return
        default:
          return this.__onKeydown(e)
      }
    },
    __onClick: function __onClick () {
      this.focus();
    },
    __watcher: function __watcher (value) {
      if (this.shadow.watched) {
        this.shadow.val = value;
      }
    },
    __watcherRegister: function __watcherRegister () {
      if (!this.watcher) {
        this.watcher = this.$watch('input', this.__watcher);
      }
    },
    __watcherUnregister: function __watcherUnregister (forceUnregister) {
      if (
        this.watcher &&
        (forceUnregister || !this.shadow.watched)
      ) {
        this.watcher();
        this.watcher = null;
        this.shadow.selectionOpen = false;
      }
    }
  },
  beforeDestroy: function beforeDestroy () {
    this.__watcherUnregister(true);
  }
}

function getHeight (el, style$$1) {
  var initial = {
    visibility: el.style.visibility,
    maxHeight: el.style.maxHeight
  };

  css(el, {
    visibility: 'hidden',
    maxHeight: ''
  });
  var height$$1 = style$$1.height;
  css(el, initial);

  return parseFloat(height$$1)
}

function parseSize (padding) {
  return padding.split(' ').map(function (t) {
    var unit = t.match(/[a-zA-Z]+/) || '';
    if (unit) {
      unit = unit[0];
    }
    return [parseFloat(t), unit]
  })
}

function toggleSlide (el, showing, done) {
  var store = el.__qslidetoggle || {};
  function anim () {
    store.uid = start({
      to: showing ? 100 : 0,
      from: store.pos !== null ? store.pos : showing ? 0 : 100,
      apply: function apply (pos) {
        store.pos = pos;
        css(el, {
          maxHeight: ((store.height * pos / 100) + "px"),
          padding: store.padding ? store.padding.map(function (t) { return (t[0] * pos / 100) + t[1]; }).join(' ') : '',
          margin: store.margin ? store.margin.map(function (t) { return (t[0] * pos / 100) + t[1]; }).join(' ') : ''
        });
      },
      done: function done$1 () {
        store.uid = null;
        store.pos = null;
        done();
        css(el, store.css);
      }
    });
    el.__qslidetoggle = store;
  }

  if (store.uid) {
    stop(store.uid);
    return anim()
  }

  store.css = {
    overflowY: el.style.overflowY,
    maxHeight: el.style.maxHeight,
    padding: el.style.padding,
    margin: el.style.margin
  };
  var style$$1 = window.getComputedStyle(el);
  if (style$$1.padding && style$$1.padding !== '0px') {
    store.padding = parseSize(style$$1.padding);
  }
  if (style$$1.margin && style$$1.margin !== '0px') {
    store.margin = parseSize(style$$1.margin);
  }
  store.height = getHeight(el, style$$1);
  store.pos = null;
  el.style.overflowY = 'hidden';
  anim();
}

var QSlideTransition = {
  name: 'QSlideTransition',
  props: {
    appear: Boolean
  },
  render: function render (h) {
    var this$1 = this;

    return h('transition', {
      props: {
        mode: 'out-in',
        css: false,
        appear: this.appear
      },
      on: {
        enter: function (el, done) {
          toggleSlide(el, true, function () {
            this$1.$emit('show');
            done();
          });
        },
        leave: function (el, done) {
          toggleSlide(el, false, function () {
            this$1.$emit('hide');
            done();
          });
        }
      }
    }, this.$slots.default)
  }
}

var eventName = 'q:collapsible:close';

var QCollapsible = {
  name: 'QCollapsible',
  mixins: [ModelToggleMixin, ItemMixin],
  modelToggle: {
    history: false
  },
  props: {
    disable: Boolean,
    popup: Boolean,
    indent: Boolean,
    group: String,
    iconToggle: Boolean,
    collapseIcon: String,
    opened: Boolean,

    headerStyle: [Array, String, Object],
    headerClass: [Array, String, Object]
  },
  computed: {
    classes: function classes () {
      return {
        'q-collapsible-opened': this.popup && this.showing,
        'q-collapsible-closed': this.popup && !this.showing,
        'q-collapsible-cursor-pointer': !this.iconToggle,
        'q-item-separator': this.separator,
        'q-item-inset-separator': this.insetSeparator,
        disabled: this.disable
      }
    }
  },
  watch: {
    showing: function showing (val) {
      if (val && this.group) {
        this.$root.$emit(eventName, this);
      }
    }
  },
  methods: {
    __toggleItem: function __toggleItem () {
      if (!this.iconToggle) {
        this.toggle();
      }
    },
    __toggleIcon: function __toggleIcon (e) {
      if (this.iconToggle) {
        e && e.stopPropagation();
        this.toggle();
      }
    },
    __eventHandler: function __eventHandler (comp) {
      if (this.group && this !== comp && comp.group === this.group) {
        this.hide();
      }
    },
    __getToggleSide: function __getToggleSide (h, slot) {
      return [
        h(QItemTile, {
          slot: slot ? 'right' : undefined,
          staticClass: 'cursor-pointer transition-generic relative-position q-collapsible-toggle-icon',
          'class': {
            'rotate-180': this.showing,
            invisible: this.disable
          },
          nativeOn: {
            click: this.__toggleIcon
          },
          props: { icon: this.collapseIcon || this.$q.icon.collapsible.icon }
        })
      ]
    },
    __getItemProps: function __getItemProps (wrapper) {
      return {
        props: { cfg: this.$props },
        style: this.headerStyle,
        'class': this.headerClass,
        nativeOn: {
          click: this.__toggleItem
        }
      }
    }
  },
  created: function created () {
    this.$root.$on(eventName, this.__eventHandler);
    if (this.opened || this.value) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy () {
    this.$root.$off(eventName, this.__eventHandler);
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-collapsible q-item-division relative-position',
      'class': this.classes
    }, [
      h('div', {
        staticClass: 'q-collapsible-inner'
      }, [
        this.$slots.header
          ? h(QItem, this.__getItemProps(), [
            this.$slots.header,
            h(QItemSide, { props: { right: true }, staticClass: 'relative-position' }, this.__getToggleSide(h))
          ])
          : h(QItemWrapper, this.__getItemProps(true), this.__getToggleSide(h, true)),

        h(QSlideTransition, [
          h('div', {
            directives: [{ name: 'show', value: this.showing }]
          }, [
            h('div', {
              staticClass: 'q-collapsible-sub-item relative-position',
              'class': { indent: this.indent }
            }, [
              this.$slots.default
            ])
          ])
        ])
      ])
    ])
  }
}

var DisplayModeMixin = {
  props: {
    popover: Boolean,
    modal: Boolean
  },
  computed: {
    isPopover: function isPopover () {
      // Explicit popover / modal choice
      if (this.popover) { return true }
      if (this.modal) { return false }

      // Automatically determine the default popover or modal behavior
      return this.$q.platform.is.desktop && !this.$q.platform.within.iframe
    }
  }
}

function getPercentage (event, dragging, rtl) {
  var val = between((position(event).left - dragging.left) / dragging.width, 0, 1);
  return rtl ? 1.0 - val : val
}

function notDivides (res, decimals) {
  var number = decimals
    ? parseFloat(res.toFixed(decimals))
    : res;

  return number !== parseInt(number, 10)
}

function getModel (percentage, min, max, step, decimals) {
  var
    model = min + percentage * (max - min),
    modulo = (model - min) % step;

  model += (Math.abs(modulo) >= step / 2 ? (modulo < 0 ? -1 : 1) * step : 0) - modulo;

  if (decimals) {
    model = parseFloat(model.toFixed(decimals));
  }

  return between(model, min, max)
}

var SliderMixin = {
  directives: {
    TouchPan: TouchPan
  },
  props: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 5
    },
    step: {
      type: Number,
      default: 1
    },
    decimals: Number,
    snap: Boolean,
    markers: Boolean,
    label: Boolean,
    labelAlways: Boolean,
    square: Boolean,
    color: String,
    fillHandleAlways: Boolean,
    error: Boolean,
    warning: Boolean,
    readonly: Boolean,
    disable: Boolean
  },
  computed: {
    editable: function editable () {
      return !this.disable && !this.readonly
    },
    classes: function classes () {
      var cls = {
        disabled: this.disable,
        readonly: this.readonly,
        'label-always': this.labelAlways,
        'has-error': this.error,
        'has-warning': this.warning
      };

      if (!this.error && !this.warning && this.color) {
        cls[("text-" + (this.color))] = true;
      }

      return cls
    },
    markersLen: function markersLen () {
      return (this.max - this.min) / this.step + 1
    },
    labelColor: function labelColor () {
      return this.error
        ? 'negative'
        : (this.warning ? 'warning' : (this.color || 'primary'))
    },
    computedDecimals: function computedDecimals () {
      return this.decimals !== void 0 ? this.decimals || 0 : (String(this.step).trim('0').split('.')[1] || '').length
    }
  },
  methods: {
    __pan: function __pan (event) {
      var this$1 = this;

      if (event.isFinal) {
        if (this.dragging) {
          this.dragTimer = setTimeout(function () {
            this$1.dragging = false;
          }, 100);
          this.__end(event.evt);
          this.__update(true);
        }
      }
      else if (event.isFirst) {
        clearTimeout(this.dragTimer);
        this.dragging = this.__getDragging(event.evt);
      }
      else if (this.dragging) {
        this.__move(event.evt);
        this.__update();
      }
    },
    __update: function __update (change) {
      var this$1 = this;

      if (JSON.stringify(this.model) === JSON.stringify(this.value)) {
        return
      }
      this.$emit('input', this.model);
      if (change) {
        this.$nextTick(function () {
          if (JSON.stringify(this$1.model) !== JSON.stringify(this$1.value)) {
            this$1.$emit('change', this$1.model);
          }
        });
      }
    },
    __click: function __click (event) {
      if (!this.dragging) {
        var dragging = this.__getDragging(event);
        if (dragging) {
          this.__end(event, dragging);
          this.__update(true);
        }
      }
    },
    __getMarkers: function __getMarkers (h) {
      var this$1 = this;

      if (!this.markers) {
        return
      }

      var markers = [];

      for (var i = 0; i < this.markersLen; i++) {
        markers.push(h('div', {
          staticClass: 'q-slider-mark',
          key: ("marker" + i),
          style: {
            left: ((i * 100 * this$1.step / (this$1.max - this$1.min)) + "%")
          }
        }));
      }

      return markers
    }
  },
  created: function created () {
    this.__validateProps();
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-slider non-selectable',
      'class': this.classes,
      on: this.editable ? { click: this.__click } : null,
      directives: this.editable
        ? [{
          name: 'touch-pan',
          modifiers: {
            horizontal: true,
            prevent: true,
            stop: true
          },
          value: this.__pan
        }]
        : null
    }, [
      h('div', {
        ref: 'handle',
        staticClass: 'q-slider-handle-container'
      }, [
        h('div', { staticClass: 'q-slider-track' }),
        this.__getMarkers(h)
      ].concat(this.__getContent(h)))
    ])
  }
};

var QSlider = {
  name: 'QSlider',
  mixins: [SliderMixin],
  props: {
    value: Number,
    labelValue: String
  },
  data: function data () {
    return {
      model: this.value,
      dragging: false,
      currentPercentage: (this.value - this.min) / (this.max - this.min)
    }
  },
  computed: {
    percentage: function percentage () {
      if (this.snap) {
        return (this.model - this.min) / (this.max - this.min) * 100 + '%'
      }
      return 100 * this.currentPercentage + '%'
    },
    displayValue: function displayValue () {
      return this.labelValue !== void 0
        ? this.labelValue
        : this.model
    }
  },
  watch: {
    value: function value (value$1) {
      if (this.dragging) {
        return
      }
      if (value$1 < this.min) {
        this.model = this.min;
      }
      else if (value$1 > this.max) {
        this.model = this.max;
      }
      else {
        this.model = value$1;
      }
      this.currentPercentage = (this.model - this.min) / (this.max - this.min);
    },
    min: function min (value) {
      if (this.model < value) {
        this.model = value;
        return
      }
      this.$nextTick(this.__validateProps);
    },
    max: function max (value) {
      if (this.model > value) {
        this.model = value;
        return
      }
      this.$nextTick(this.__validateProps);
    },
    step: function step () {
      this.$nextTick(this.__validateProps);
    }
  },
  methods: {
    __getDragging: function __getDragging (evt) {
      var container = this.$refs.handle;
      return {
        left: container.getBoundingClientRect().left,
        width: container.offsetWidth
      }
    },
    __move: function __move (event) {
      var percentage = getPercentage(
        event,
        this.dragging,
        this.$q.i18n.rtl
      );

      this.currentPercentage = percentage;
      this.model = getModel(percentage, this.min, this.max, this.step, this.computedDecimals);
    },
    __end: function __end (event, dragging) {
      if ( dragging === void 0 ) dragging = this.dragging;

      var percentage = getPercentage(
        event,
        dragging,
        this.$q.i18n.rtl
      );
      this.model = getModel(percentage, this.min, this.max, this.step, this.computedDecimals);
      this.currentPercentage = (this.model - this.min) / (this.max - this.min);
    },
    __validateProps: function __validateProps () {
      if (this.min >= this.max) {
        console.error('Range error: min >= max', this.$el, this.min, this.max);
      }
      else if (notDivides((this.max - this.min) / this.step, this.computedDecimals)) {
        console.error('Range error: step must be a divisor of max - min', this.min, this.max, this.step, this.computedDecimals);
      }
    },
    __getContent: function __getContent (h) {
      var obj;

      return [
        h('div', {
          staticClass: 'q-slider-track active-track',
          style: { width: this.percentage },
          'class': {
            'no-transition': this.dragging,
            'handle-at-minimum': this.model === this.min
          }
        }),
        h('div', {
          staticClass: 'q-slider-handle',
          style: ( obj = {}, obj[this.$q.i18n.rtl ? 'right' : 'left'] = this.percentage, obj.borderRadius = this.square ? '0' : '50%', obj),
          'class': {
            dragging: this.dragging,
            'handle-at-minimum': !this.fillHandleAlways && this.model === this.min
          }
        }, [
          this.label || this.labelAlways
            ? h(QChip, {
              staticClass: 'q-slider-label no-pointer-events',
              'class': { 'label-always': this.labelAlways },
              props: {
                pointing: 'down',
                square: true,
                dense: true,
                color: this.labelColor
              }
            }, [ this.displayValue ])
            : null,
          null
        ])
      ]
    }
  }
}

function throttle (fn, limit) {
  if ( limit === void 0 ) limit = 250;

  var wait = false;

  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (wait) {
      return
    }

    wait = true;
    fn.apply(this, args);
    setTimeout(function () {
      wait = false;
    }, limit);
  }
}

function clone (data) {
  var s = JSON.stringify(data);
  if (s) {
    return JSON.parse(s)
  }
}

function rgbToHex (ref) {
  var r = ref.r;
  var g = ref.g;
  var b = ref.b;
  var a = ref.a;

  var alpha = a !== void 0;

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  if (
    r > 255 ||
    g > 255 ||
    b > 255 ||
    (alpha && a > 100)
  ) {
    throw new TypeError('Expected 3 numbers below 256 (and optionally one below 100)')
  }

  a = alpha
    ? (Math.round(255 * a / 100) | 1 << 8).toString(16).slice(1)
    : '';

  return '#' + ((b | g << 8 | r << 16) | 1 << 24).toString(16).slice(1) + a
}

function hexToRgb (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }

  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  var num = parseInt(hex, 16);

  return hex.length > 6
    ? {r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55)}
    : {r: num >> 16, g: num >> 8 & 255, b: num & 255}
}

function hsvToRgb (ref) {
  var h = ref.h;
  var s = ref.s;
  var v = ref.v;
  var a = ref.a;

  var r, g, b, i, f, p, q, t;
  s = s / 100;
  v = v / 100;

  h = h / 360;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break
    case 1:
      r = q;
      g = v;
      b = p;
      break
    case 2:
      r = p;
      g = v;
      b = t;
      break
    case 3:
      r = p;
      g = q;
      b = v;
      break
    case 4:
      r = t;
      g = p;
      b = v;
      break
    case 5:
      r = v;
      g = p;
      b = q;
      break
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: a
  }
}

function rgbToHsv (ref) {
  var r = ref.r;
  var g = ref.g;
  var b = ref.b;
  var a = ref.a;

  var
    max = Math.max(r, g, b), min = Math.min(r, g, b),
    d = max - min,
    h,
    s = (max === 0 ? 0 : d / max),
    v = max / 255;

  switch (max) {
    case min:
      h = 0;
      break
    case r:
      h = (g - b) + d * (g < b ? 6 : 0);
      h /= 6 * d;
      break
    case g:
      h = (b - r) + d * 2;
      h /= 6 * d;
      break
    case b:
      h = (r - g) + d * 4;
      h /= 6 * d;
      break
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
    a: a
  }
}

var reRGBA = /^\s*rgb(a)?\s*\((\s*(\d+)\s*,\s*?){2}(\d+)\s*,?\s*([01]?\.?\d*?)?\s*\)\s*$/;

function textToRgb (color) {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string')
  }

  var m = reRGBA.exec(color);
  if (m) {
    var rgb = {
      r: Math.max(255, parseInt(m[2], 10)),
      g: Math.max(255, parseInt(m[3], 10)),
      b: Math.max(255, parseInt(m[4], 10))
    };
    if (m[1]) {
      rgb.a = Math.max(1, parseFloat(m[5]));
    }
    return rgb
  }
  return hexToRgb(color)
}

/* works as darken if percent < 0 */
function lighten (color, percent) {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string as color')
  }
  if (typeof percent !== 'number') {
    throw new TypeError('Expected a numeric percent')
  }

  var rgb = textToRgb(color),
    t = percent < 0 ? 0 : 255,
    p = Math.abs(percent) / 100,
    R = rgb.r,
    G = rgb.g,
    B = rgb.b;

  return '#' + (
    0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  ).toString(16).slice(1)
}

function luminosity (color) {
  if (typeof color !== 'string' || color.r === void 0) {
    throw new TypeError('Expected a string or a {r, g, b} object as color')
  }

  var
    rgb = typeof color === 'string' ? textToRgb(color) : color,
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
    G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
    B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function setBrand (color, value, element) {
  if ( element === void 0 ) element = document.body;

  if (typeof color !== 'string') {
    throw new TypeError('Expected a string as color')
  }
  if (typeof value !== 'string') {
    throw new TypeError('Expected a string as value')
  }
  if (!(element instanceof Element)) {
    throw new TypeError('Expected a DOM element')
  }

  element.style.setProperty(("--q-color-" + color), value);
  switch (color) {
    case 'negative':
    case 'warning':
      element.style.setProperty(("--q-color-" + color + "-l"), lighten(value, 46));
      break
    case 'light':
      element.style.setProperty(("--q-color-" + color + "-d"), lighten(value, -10));
  }
}

function getBrand (color, element) {
  if ( element === void 0 ) element = document.body;

  if (typeof color !== 'string') {
    throw new TypeError('Expected a string as color')
  }
  if (!(element instanceof Element)) {
    throw new TypeError('Expected a DOM element')
  }

  return getComputedStyle(element).getPropertyValue(("--q-color-" + color)).trim() || null
}

var colors = /*#__PURE__*/Object.freeze({
rgbToHex: rgbToHex,
hexToRgb: hexToRgb,
hsvToRgb: hsvToRgb,
rgbToHsv: rgbToHsv,
textToRgb: textToRgb,
lighten: lighten,
luminosity: luminosity,
setBrand: setBrand,
getBrand: getBrand
});

var QColorPicker = {
  name: 'QColorPicker',
  mixins: [ParentFieldMixin],
  directives: {
    TouchPan: TouchPan
  },
  props: {
    value: [String, Object],
    defaultValue: {
      type: [String, Object],
      default: '#000'
    },
    formatModel: {
      type: String,
      default: 'auto',
      validator: function (v) { return ['auto', 'hex', 'rgb', 'hexa', 'rgba'].includes(v); }
    },
    disable: Boolean,
    readonly: Boolean,
    dark: Boolean
  },
  data: function data () {
    return {
      view: !this.value || typeof this.value === 'string' ? 'hex' : 'rgb',
      model: this.__parseModel(this.value || this.defaultValue),
      inputError: {
        hex: false,
        r: false,
        g: false,
        b: false
      }
    }
  },
  watch: {
    value: {
      handler: function handler (v) {
        var model = this.__parseModel(v || this.defaultValue);
        if (model.hex !== this.model.hex) {
          this.model = model;
        }
      },
      deep: true
    }
  },
  computed: {
    forceHex: function forceHex () {
      return this.formatModel === 'auto'
        ? null
        : this.formatModel.indexOf('hex') > -1
    },
    forceAlpha: function forceAlpha () {
      return this.formatModel === 'auto'
        ? null
        : this.formatModel.indexOf('a') > -1
    },
    isHex: function isHex () {
      return typeof this.value === 'string'
    },
    isOutputHex: function isOutputHex () {
      return this.forceHex !== null
        ? this.forceHex
        : this.isHex
    },
    editable: function editable () {
      return !this.disable && !this.readonly
    },
    hasAlpha: function hasAlpha () {
      if (this.forceAlpha !== null) {
        return this.forceAlpha
      }
      return this.isHex
        ? this.value.trim().length > 7
        : this.value && this.value.a !== void 0
    },
    swatchColor: function swatchColor () {
      return {
        backgroundColor: ("rgba(" + (this.model.r) + "," + (this.model.g) + "," + (this.model.b) + "," + ((this.model.a === void 0 ? 100 : this.model.a) / 100) + ")")
      }
    },
    saturationStyle: function saturationStyle () {
      return {
        background: ("hsl(" + (this.model.h) + ",100%,50%)")
      }
    },
    saturationPointerStyle: function saturationPointerStyle () {
      var obj;

      return ( obj = {
        top: ((101 - this.model.v) + "%")
      }, obj[this.$q.i18n.rtl ? 'right' : 'left'] = ((this.model.s) + "%"), obj)
    },
    inputsArray: function inputsArray () {
      var inp = ['r', 'g', 'b'];
      if (this.hasAlpha) {
        inp.push('a');
      }
      return inp
    }
  },
  created: function created () {
    this.__saturationChange = throttle(this.__saturationChange, 20);
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-color',
      'class': { disabled: this.disable, 'q-color-dark': this.dark }
    }, [
      this.__getSaturation(h),
      this.__getSliders(h),
      this.__getInputs(h)
    ])
  },
  methods: {
    __getSaturation: function __getSaturation (h) {
      return h('div', {
        ref: 'saturation',
        staticClass: 'q-color-saturation non-selectable relative-position overflow-hidden cursor-pointer',
        style: this.saturationStyle,
        'class': { readonly: !this.editable },
        on: this.editable
          ? { click: this.__saturationClick }
          : null,
        directives: this.editable
          ? [{
            name: 'touch-pan',
            modifiers: {
              prevent: true,
              stop: true
            },
            value: this.__saturationPan
          }]
          : null
      }, [
        h('div', { staticClass: 'q-color-saturation-white absolute-full' }),
        h('div', { staticClass: 'q-color-saturation-black absolute-full' }),
        h('div', {
          staticClass: 'absolute',
          style: this.saturationPointerStyle
        }, [
          h('div', { staticClass: 'q-color-saturation-circle' })
        ])
      ])
    },
    __getSliders: function __getSliders (h) {
      var this$1 = this;

      return h('div', {
        staticClass: 'q-color-sliders row items-center'
      }, [
        h('div', {
          staticClass: 'q-color-swatch q-mt-sm q-ml-md q-mb-sm non-selectable overflow-hidden'
        }, [
          h('div', { style: this.swatchColor, staticClass: 'fit' })
        ]),
        h('div', { staticClass: 'col q-pa-sm' }, [
          h('div', { staticClass: 'q-color-hue non-selectable' }, [
            h(QSlider, {
              props: {
                value: this.model.h,
                color: 'white',
                min: 0,
                max: 360,
                fillHandleAlways: true,
                readonly: !this.editable
              },
              on: {
                input: this.__onHueChange,
                dragend: function (val) { return this$1.__onHueChange(val, true); }
              }
            })
          ]),
          this.hasAlpha
            ? h('div', { staticClass: 'q-color-alpha non-selectable' }, [
              h(QSlider, {
                props: {
                  value: this.model.a,
                  color: 'white',
                  min: 0,
                  max: 100,
                  fillHandleAlways: true,
                  readonly: !this.editable
                },
                on: {
                  input: function (value) { return this$1.__onNumericChange({ target: { value: value } }, 'a', 100); },
                  dragend: function (value) { return this$1.__onNumericChange({ target: { value: value } }, 'a', 100, true); }
                }
              })
            ])
            : null
        ])
      ])
    },
    __getNumericInputs: function __getNumericInputs (h) {
      var this$1 = this;

      return this.inputsArray.map(function (formatModel) {
        var max = formatModel === 'a' ? 100 : 255;
        return h('div', { staticClass: 'col q-color-padding' }, [
          h('input', {
            attrs: {
              type: 'number',
              min: 0,
              max: max,
              readonly: !this$1.editable,
              tabindex: this$1.editable ? 0 : -1
            },
            staticClass: 'full-width text-center q-no-input-spinner',
            domProps: {
              value: Math.round(this$1.model[formatModel])
            },
            on: {
              input: function (evt) { return this$1.__onNumericChange(evt, formatModel, max); },
              blur: function (evt) { return this$1.editable && this$1.__onNumericChange(evt, formatModel, max, true); }
            }
          }),
          h('div', { staticClass: 'q-color-label text-center uppercase' }, [
            formatModel
          ])
        ])
      })
    },
    __getInputs: function __getInputs (h) {
      var this$1 = this;

      var inputs = this.view === 'hex'
        ? [
          h('div', { staticClass: 'col' }, [
            h('input', {
              domProps: { value: this.model.hex },
              attrs: {
                readonly: !this.editable,
                tabindex: this.editable ? 0 : -1
              },
              on: {
                change: this.__onHexChange,
                blur: function (evt) { return this$1.editable && this$1.__onHexChange(evt, true); }
              },
              staticClass: 'full-width text-center uppercase'
            }),
            h('div', { staticClass: 'q-color-label text-center' }, [
              ("HEX" + (this.hasAlpha ? ' / A' : ''))
            ])
          ])
        ]
        : this.__getNumericInputs(h);

      return h('div', {
        staticClass: 'q-color-inputs row items-center q-px-sm q-pb-sm'
      }, [
        h('div', { staticClass: 'col q-mr-sm row no-wrap' }, inputs),
        h('div', [
          h(QBtn, {
            props: {
              flat: true,
              disable: this.disable
            },
            on: {
              click: this.__nextInputView
            },
            staticClass: 'q-pa-none'
          }, [
            h('svg', {
              attrs: {
                viewBox: '0 0 24 24'
              },
              style: {width: '24px', height: '24px'}
            }, [
              h('path', {
                attrs: {
                  fill: 'currentColor',
                  d: 'M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z'
                }
              })
            ])
          ])
        ])
      ])
    },

    __onSaturationChange: function __onSaturationChange (left, top, change) {
      var
        panel = this.$refs.saturation,
        width = panel.clientWidth,
        height = panel.clientHeight,
        rect = panel.getBoundingClientRect();
      var x = Math.min(width, Math.max(0, left - rect.left));

      if (this.$q.i18n.rtl) {
        x = width - x;
      }

      var
        y = Math.min(height, Math.max(0, top - rect.top)),
        s = Math.round(100 * x / width),
        v = Math.round(100 * Math.max(0, Math.min(1, -(y / height) + 1))),
        rgb = hsvToRgb({
          h: this.model.h,
          s: s,
          v: v,
          a: this.hasAlpha ? this.model.a : void 0
        });

      this.model.s = s;
      this.model.v = v;
      this.__update(rgb, rgbToHex(rgb), change);
    },
    __onHueChange: function __onHueChange (h, change) {
      h = Math.round(h);
      var val = hsvToRgb({
        h: h,
        s: this.model.s,
        v: this.model.v,
        a: this.hasAlpha ? this.model.a : void 0
      });

      this.model.h = h;
      this.__update(val, rgbToHex(val), change);
    },
    __onNumericChange: function __onNumericChange (evt, formatModel, max, change) {
      var val = Number(evt.target.value);
      if (isNaN(val)) {
        return
      }

      val = Math.floor(val);
      if (val < 0 || val > max) {
        if (change) {
          this.$forceUpdate();
        }
        return
      }

      var rgb = {
        r: formatModel === 'r' ? val : this.model.r,
        g: formatModel === 'g' ? val : this.model.g,
        b: formatModel === 'b' ? val : this.model.b,
        a: this.hasAlpha
          ? (formatModel === 'a' ? val : this.model.a)
          : void 0
      };
      if (formatModel !== 'a') {
        var hsv = rgbToHsv(rgb);
        this.model.h = hsv.h;
        this.model.s = hsv.s;
        this.model.v = hsv.v;
      }
      this.__update(rgb, rgbToHex(rgb), change);
    },
    __onHexChange: function __onHexChange (evt, change) {
      var
        hex = evt.target.value,
        len = hex.length,
        edges = this.hasAlpha ? [5, 9] : [4, 7];

      if (len !== edges[0] && len !== edges[1]) {
        if (change) {
          this.$forceUpdate();
        }
        return
      }

      var
        rgb = hexToRgb(hex),
        hsv = rgbToHsv(rgb);

      this.model.h = hsv.h;
      this.model.s = hsv.s;
      this.model.v = hsv.v;
      this.__update(rgb, hex, change);
    },
    __update: function __update (rgb, hex, change) {
      var this$1 = this;

      var value = this.isOutputHex ? hex : rgb;

      // update internally
      this.model.hex = hex;
      this.model.r = rgb.r;
      this.model.g = rgb.g;
      this.model.b = rgb.b;
      this.model.a = this.hasAlpha ? rgb.a : void 0;

      // emit new value
      this.$emit('input', value);
      this.$nextTick(function () {
        if (change && JSON.stringify(value) !== JSON.stringify(this$1.value)) {
          this$1.$emit('change', value);
        }
      });
    },
    __nextInputView: function __nextInputView () {
      this.view = this.view === 'hex' ? 'rgba' : 'hex';
    },
    __parseModel: function __parseModel (v) {
      var model = typeof v === 'string' ? hexToRgb(v.trim()) : clone(v);
      if (this.forceAlpha === (model.a === void 0)) {
        model.a = this.forceAlpha ? 100 : void 0;
      }
      model.hex = rgbToHex(model);
      return extend({ a: 100 }, model, rgbToHsv(model))
    },

    __saturationPan: function __saturationPan (evt) {
      if (evt.isFinal) {
        this.__dragStop(evt);
      }
      else if (evt.isFirst) {
        this.__dragStart(evt);
      }
      else {
        this.__dragMove(evt);
      }
    },
    __dragStart: function __dragStart (event) {
      stopAndPrevent(event.evt);

      this.saturationDragging = true;
      this.__saturationChange(event);
    },
    __dragMove: function __dragMove (event) {
      if (!this.saturationDragging) {
        return
      }
      stopAndPrevent(event.evt);

      this.__saturationChange(event);
    },
    __dragStop: function __dragStop (event) {
      var this$1 = this;

      stopAndPrevent(event.evt);
      setTimeout(function () {
        this$1.saturationDragging = false;
      }, 100);
      this.__onSaturationChange(
        event.position.left,
        event.position.top,
        true
      );
    },
    __saturationChange: function __saturationChange (evt) {
      this.__onSaturationChange(
        evt.position.left,
        evt.position.top
      );
    },
    __saturationClick: function __saturationClick (evt) {
      if (this.saturationDragging) {
        return
      }
      this.__onSaturationChange(
        evt.pageX - window.pageXOffset,
        evt.pageY - window.pageYOffset,
        true
      );
    }
  }
}

var contentCss = {
    maxHeight: '80vh',
    height: 'auto',
    boxShadow: 'none',
    backgroundColor: '#e4e4e4'
  };

var QColor = {
  name: 'QColor',
  mixins: [FrameMixin, DisplayModeMixin],
  props: {
    value: {
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    defaultValue: {
      type: [String, Object],
      default: '#000'
    },
    formatModel: {
      type: String,
      default: 'auto',
      validator: function (v) { return ['auto', 'hex', 'rgb', 'hexa', 'rgba'].includes(v); }
    },
    displayValue: String,
    placeholder: String,
    okLabel: String,
    cancelLabel: String
  },
  watch: {
    value: function value (v) {
      if (!this.disable && this.isPopover) {
        this.model = clone(v);
      }
    }
  },
  data: function data () {
    var data = this.isPopover ? {} : {
      transition: 'q-modal-bottom'
    };
    data.focused = false;
    data.model = clone(this.value || this.defaultValue);
    return data
  },
  computed: {
    actualValue: function actualValue () {
      if (this.displayValue) {
        return this.displayValue
      }

      if (this.value) {
        return typeof this.value === 'string'
          ? this.value
          : ("rgb" + (this.value.a !== void 0 ? 'a' : '') + "(" + (this.value.r) + "," + (this.value.g) + "," + (this.value.b) + (this.value.a !== void 0 ? ("," + (this.value.a / 100)) : '') + ")")
      }

      return ''
    },
    modalBtnColor: function modalBtnColor () {
      return this.dark ? 'light' : 'dark'
    }
  },
  methods: {
    toggle: function toggle () {
      this[this.$refs.popup.showing ? 'hide' : 'show']();
    },
    show: function show () {
      if (!this.disable) {
        this.__setModel(this.value || this.defaultValue);
        return this.$refs.popup.show()
      }
    },
    hide: function hide () {
      return this.$refs.popup.hide()
    },

    __handleKeyDown: function __handleKeyDown (e) {
      switch (getEventKey(e)) {
        case 13: // ENTER key
        case 32: // SPACE key
          stopAndPrevent(e);
          return this.show()
        case 8: // BACKSPACE key
          if (this.editable && this.clearable && this.actualValue.length) {
            this.clear();
          }
      }
    },
    __onFocus: function __onFocus () {
      if (this.disable || this.focused) {
        return
      }
      this.model = clone(this.value || this.defaultValue);
      this.focused = true;
      this.$emit('focus');
    },
    __onBlur: function __onBlur (e) {
      var this$1 = this;

      if (!this.focused) {
        return
      }

      setTimeout(function () {
        var el = document.activeElement;
        if (
          !this$1.$refs.popup ||
          !this$1.$refs.popup.showing ||
          (el !== document.body && !this$1.$refs.popup.$el.contains(el))
        ) {
          this$1.__onHide();
          this$1.hide();
        }
      }, 1);
    },
    __onHide: function __onHide (forceUpdate, keepFocus) {
      if (forceUpdate || this.isPopover) {
        this.__update(forceUpdate);
      }
      if (!this.focused) {
        return
      }
      if (keepFocus) {
        this.$el.focus();
        return
      }
      this.$emit('blur');
      this.focused = false;
    },
    __setModel: function __setModel (val, forceUpdate) {
      this.model = clone(val);
      if (forceUpdate || this.isPopover) {
        this.__update(forceUpdate);
      }
    },
    __hasModelChanged: function __hasModelChanged () {
      return JSON.stringify(this.model) !== JSON.stringify(this.value)
    },
    __update: function __update (change) {
      var this$1 = this;

      this.$nextTick(function () {
        if (this$1.__hasModelChanged()) {
          this$1.$emit('input', this$1.model);
          if (change) {
            this$1.$emit('change', this$1.model);
          }
        }
      });
    },

    __getPicker: function __getPicker (h, modal) {
      var this$1 = this;

      var child = [
        h(QColorPicker, {
          staticClass: ("no-border" + (modal ? ' full-width' : '')),
          props: extend({
            value: this.model || '#000',
            disable: this.disable,
            readonly: this.readonly,
            formatModel: this.formatModel,
            dark: this.dark,
            noParentField: true
          }, this.$attrs),
          on: {
            input: function (v) { return this$1.$nextTick(function () { return this$1.__setModel(v); }); }
          }
        })
      ];

      if (modal) {
        child['unshift'](h('div', {
          staticClass: 'modal-buttons modal-buttons-top row full-width',
          'class': this.dark ? 'bg-black' : null
        }, [
          h('div', { staticClass: 'col' }),
          h(QBtn, {
            props: {
              color: this.modalBtnColor,
              flat: true,
              label: this.cancelLabel || this.$q.i18n.label.cancel,
              noRipple: true
            },
            on: {
              click: function () {
                this$1.__onHide(false, true);
                this$1.hide();
              }
            }
          }),
          this.editable
            ? h(QBtn, {
              props: {
                color: this.modalBtnColor,
                flat: true,
                label: this.okLabel || this.$q.i18n.label.set,
                noRipple: true
              },
              on: {
                click: function () {
                  this$1.__onHide(true, true);
                  this$1.hide();
                }
              }
            })
            : null
        ]));
      }

      return child
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(QInputFrame, {
      staticClass: 'q-color-input',
      props: {
        prefix: this.prefix,
        suffix: this.suffix,
        stackLabel: this.stackLabel,
        floatLabel: this.floatLabel,
        error: this.error,
        warning: this.warning,
        disable: this.disable,
        readonly: this.readonly,
        inverted: this.inverted,
        invertedLight: this.invertedLight,
        dark: this.dark,
        hideUnderline: this.hideUnderline,
        before: this.before,
        after: this.after,
        color: this.color,
        noParentField: this.noParentField,

        focused: this.focused || (this.$refs.popup && this.$refs.popup.showing),
        focusable: true,
        length: this.actualValue.length
      },
      nativeOn: {
        click: this.toggle,
        focus: this.__onFocus,
        blur: this.__onBlur,
        keydown: this.__handleKeyDown
      }
    }, [
      h('div', {
        staticClass: 'col q-input-target ellipsis',
        'class': this.fakeInputClasses
      }, [
        this.fakeInputValue
      ]),

      this.isPopover
        ? h(QPopover, {
          ref: 'popup',
          props: {
            disable: this.disable,
            anchorClick: false,
            maxHeight: '100vh'
          },
          on: {
            show: this.__onFocus,
            hide: function () { return this$1.__onHide(true, true); }
          }
        }, this.__getPicker(h))
        : h(QModal, {
          ref: 'popup',
          staticClass: 'with-backdrop',
          props: {
            contentCss: contentCss,
            minimized: "ios" === 'mat',
            position: 'bottom',
            transition: this.transition
          },
          on: {
            dismiss: function () { return this$1.__onHide(false, true); }
          }
        }, this.__getPicker(h, true)),

      this.editable && this.clearable && this.actualValue.length
        ? h('QIcon', {
          slot: 'after',
          props: { name: this.$q.icon.input[("clear" + (this.isInverted ? 'Inverted' : ''))] },
          nativeOn: { click: this.clear },
          staticClass: 'q-if-control'
        })
        : null,

      h('QIcon', {
        slot: 'after',
        props: { name: this.$q.icon.input.dropdown },
        staticClass: 'q-if-control'
      })
    ])
  }
}

var ContextMenuDesktop = {
  name: 'QContextMenu',
  components: {
    QPopover: QPopover
  },
  props: {
    disable: Boolean
  },
  render: function render (h) {
    return h(QPopover, {
      ref: 'popover',
      props: {
        anchorClick: false
      },
      on: {
        show: this.__onShow,
        hide: this.__onHide
      }
    }, this.$slots.default)
  },
  methods: {
    hide: function hide (evt) {
      if (this.$refs.popover) {
        return this.$refs.popover.hide(evt)
      }
    },
    show: function show (evt) {
      var this$1 = this;

      if (!evt || this.disable) {
        return
      }
      stopAndPrevent(evt);
      /*
        Opening with a timeout for
        Firefox workaround
       */
      setTimeout(function () {
        if (this$1.$refs.popover) {
          this$1.event = evt;
          this$1.$refs.popover.show(evt);
        }
      }, 100);
    },
    __bodyHide: function __bodyHide (evt) {
      if (!this.$el.contains(evt.target)) {
        this.hide(evt);
      }
    },
    __onShow: function __onShow () {
      document.body.addEventListener('contextmenu', this.__bodyHide, true);
      document.body.addEventListener('click', this.__bodyHide, true);
      this.$emit('show', this.event);
    },
    __onHide: function __onHide (evt) {
      document.body.removeEventListener('contextmenu', this.__bodyHide, true);
      document.body.removeEventListener('click', this.__bodyHide, true);
      this.$emit('hide', this.event, evt);
    }
  },
  mounted: function mounted () {
    this.target = this.$refs.popover.$el.parentNode;
    this.target.addEventListener('contextmenu', this.show);
  },
  beforeDestroy: function beforeDestroy () {
    this.target.removeEventListener('contextmenu', this.show);
  }
}

var ContextMenuMobile = {
  name: 'QContextMenu',
  props: {
    disable: Boolean
  },
  methods: {
    hide: function hide (evt) {
      this.target.classList.remove('non-selectable');
      return this.$refs.dialog.hide(evt)
    },
    show: function show (evt) {
      if (!this.disable && this.$refs.dialog) {
        this.event = evt;
        this.$refs.dialog.show(evt);
      }
    },
    __touchStartHandler: function __touchStartHandler (evt) {
      var this$1 = this;

      this.target.classList.add('non-selectable');
      this.touchTimer = setTimeout(function () {
        evt && stopAndPrevent(evt);
        setTimeout(function () {
          this$1.__cleanup();
          this$1.show(evt);
        }, 10);
      }, 600);
    },
    __cleanup: function __cleanup () {
      this.target.classList.remove('non-selectable');
      clearTimeout(this.touchTimer);
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(QModal, {
      ref: 'dialog',
      props: {
        minimized: true
      },
      on: {
        show: function () { this$1.$emit('show', this$1.event); },
        hide: function (evt) { this$1.$emit('hide', this$1.event, evt); }
      }
    }, this.$slots.default)
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.target = this$1.$el.parentNode;
      this$1.target.addEventListener('touchstart', this$1.__touchStartHandler)
      ;['touchcancel', 'touchmove', 'touchend'].forEach(function (evt) {
        this$1.target.addEventListener(evt, this$1.__cleanup);
      });
    });
  },
  beforeDestroy: function beforeDestroy () {
    var this$1 = this;

    this.target.removeEventListener('touchstart', this.__touchStartHandler)
    ;['touchcancel', 'touchmove', 'touchend'].forEach(function (evt) {
      this$1.target.removeEventListener(evt, this$1.__cleanup);
    });
  }
}

var QContextMenu = {
  name: 'QContextMenu',
  functional: true,
  render: function render (h, ctx) {
    return h(
      Platform.is.mobile ? ContextMenuMobile : ContextMenuDesktop,
      ctx.data,
      ctx.children
    )
  }
}

var modelValidator = function (v) {
  var type = typeof v;
  return (
    v === null || v === undefined ||
    type === 'number' || type === 'string' ||
    isDate(v)
  )
};

var inline = {
  value: {
    validator: modelValidator,
    required: true
  },
  defaultValue: {
    type: [String, Number, Date],
    default: null
  },
  type: {
    type: String,
    default: 'date',
    validator: function (v) { return ['date', 'time', 'datetime'].includes(v); }
  },
  color: {
    type: String,
    default: 'primary'
  },
  dark: Boolean,
  min: {
    validator: modelValidator,
    default: null
  },
  max: {
    validator: modelValidator,
    default: null
  },
  firstDayOfWeek: Number,
  formatModel: {
    type: String,
    default: 'auto',
    validator: function (v) { return ['auto', 'date', 'number', 'string'].includes(v); }
  },
  format24h: {
    type: [Boolean, Number],
    default: 0,
    validator: function (v) { return [true, false, 0].includes(v); }
  },
  defaultView: {
    type: String,
    validator: function (v) { return ['year', 'month', 'day', 'hour', 'minute'].includes(v); }
  },
  minimal: Boolean
};

var input = {
  format: String,
  placeholder: String,
  okLabel: String,
  cancelLabel: String,
  displayValue: String
};

/* eslint no-fallthrough: 0 */

var
  MILLISECONDS_IN_DAY = 86400000,
  MILLISECONDS_IN_HOUR = 3600000,
  MILLISECONDS_IN_MINUTE = 60000,
  token = /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g;

function formatTimezone (offset, delimeter) {
  if ( delimeter === void 0 ) delimeter = '';

  var
    sign = offset > 0 ? '-' : '+',
    absOffset = Math.abs(offset),
    hours = Math.floor(absOffset / 60),
    minutes = absOffset % 60;

  return sign + pad(hours) + delimeter + pad(minutes)
}

function setMonth (date, newMonth /* 1-based */) {
  var
    test = new Date(date.getFullYear(), newMonth, 0, 0, 0, 0, 0),
    days = test.getDate();

  date.setMonth(newMonth - 1, Math.min(days, date.getDate()));
}

function getChange (date, mod, add) {
  var
    t = new Date(date),
    sign = (add ? 1 : -1);

  Object.keys(mod).forEach(function (key) {
    if (key === 'month') {
      setMonth(t, t.getMonth() + 1 + sign * mod.month);
      return
    }

    var op = key === 'year'
      ? 'FullYear'
      : capitalize(key === 'days' ? 'date' : key);
    t[("set" + op)](t[("get" + op)]() + sign * mod[key]);
  });
  return t
}

function isValid (date) {
  if (typeof date === 'number') {
    return true
  }
  var t = Date.parse(date);
  return isNaN(t) === false
}

function buildDate (mod, utc) {
  return adjustDate(new Date(), mod, utc)
}

function getDayOfWeek (date) {
  var dow = new Date(date).getDay();
  return dow === 0 ? 7 : dow
}

function getWeekOfYear (date) {
  // Remove time components of date
  var thursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Change date to Thursday same week
  thursday.setDate(thursday.getDate() - ((thursday.getDay() + 6) % 7) + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601)
  var firstThursday = new Date(thursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occurred and correct for it
  var ds = thursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  thursday.setHours(thursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  var weekDiff = (thursday - firstThursday) / (MILLISECONDS_IN_DAY * 7);
  return 1 + Math.floor(weekDiff)
}

function isBetweenDates (date, from, to, opts) {
  if ( opts === void 0 ) opts = {};

  var
    d1 = new Date(from).getTime(),
    d2 = new Date(to).getTime(),
    cur = new Date(date).getTime();

  opts.inclusiveFrom && d1--;
  opts.inclusiveTo && d2++;

  return cur > d1 && cur < d2
}

function addToDate (date, mod) {
  return getChange(date, mod, true)
}
function subtractFromDate (date, mod) {
  return getChange(date, mod, false)
}

function adjustDate (date, mod, utc) {
  var
    t = new Date(date),
    prefix = "set" + (utc ? 'UTC' : '');

  Object.keys(mod).forEach(function (key) {
    if (key === 'month') {
      setMonth(t, mod.month);
      return
    }

    var op = key === 'year'
      ? 'FullYear'
      : key.charAt(0).toUpperCase() + key.slice(1);
    t[("" + prefix + op)](mod[key]);
  });
  return t
}

function startOfDate (date, unit) {
  var t = new Date(date);
  switch (unit) {
    case 'year':
      t.setMonth(0);
    case 'month':
      t.setDate(1);
    case 'day':
      t.setHours(0);
    case 'hour':
      t.setMinutes(0);
    case 'minute':
      t.setSeconds(0);
    case 'second':
      t.setMilliseconds(0);
  }
  return t
}

function endOfDate (date, unit) {
  var t = new Date(date);
  switch (unit) {
    case 'year':
      t.setMonth(11);
    case 'month':
      t.setDate(daysInMonth(date));
    case 'day':
      t.setHours(23);
    case 'hour':
      t.setMinutes(59);
    case 'minute':
      t.setSeconds(59);
    case 'second':
      t.setMilliseconds(59);
  }
  return t
}

function getMaxDate (date) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var t = new Date(date);
  args.forEach(function (d) {
    t = Math.max(t, new Date(d));
  });
  return t
}
function getMinDate (date) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var t = new Date(date);
  args.forEach(function (d) {
    t = Math.min(t, new Date(d));
  });
  return t
}

function getDiff (t, sub, interval) {
  return (
    (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE) -
    (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)
  ) / interval
}

function getDateDiff (date, subtract, unit) {
  if ( unit === void 0 ) unit = 'days';

  var
    t = new Date(date),
    sub = new Date(subtract);

  switch (unit) {
    case 'years':
      return (t.getFullYear() - sub.getFullYear())

    case 'months':
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth()

    case 'days':
      return getDiff(startOfDate(t, 'day'), startOfDate(sub, 'day'), MILLISECONDS_IN_DAY)

    case 'hours':
      return getDiff(startOfDate(t, 'hour'), startOfDate(sub, 'hour'), MILLISECONDS_IN_HOUR)

    case 'minutes':
      return getDiff(startOfDate(t, 'minute'), startOfDate(sub, 'minute'), MILLISECONDS_IN_MINUTE)

    case 'seconds':
      return getDiff(startOfDate(t, 'second'), startOfDate(sub, 'second'), 1000)
  }
}

function getDayOfYear (date) {
  return getDateDiff(date, startOfDate(date, 'year'), 'days') + 1
}

function inferDateFormat (example) {
  if (isDate(example)) {
    return 'date'
  }
  if (typeof example === 'number') {
    return 'number'
  }

  return 'string'
}

function convertDateToFormat (date, type) {
  if (!date && date !== 0) {
    return
  }

  switch (type) {
    case 'date':
      return date
    case 'number':
      return date.getTime()
    default:
      return formatDate(date)
  }
}

function getDateBetween (date, min, max) {
  var t = new Date(date);

  if (min) {
    var low = new Date(min);
    if (t < low) {
      return low
    }
  }

  if (max) {
    var high = new Date(max);
    if (t > high) {
      return high
    }
  }

  return t
}

function isSameDate (date, date2, unit) {
  var
    t = new Date(date),
    d = new Date(date2);

  if (unit === void 0) {
    return t.getTime() === d.getTime()
  }

  switch (unit) {
    case 'second':
      if (t.getSeconds() !== d.getSeconds()) {
        return false
      }
    case 'minute': // intentional fall-through
      if (t.getMinutes() !== d.getMinutes()) {
        return false
      }
    case 'hour': // intentional fall-through
      if (t.getHours() !== d.getHours()) {
        return false
      }
    case 'day': // intentional fall-through
      if (t.getDate() !== d.getDate()) {
        return false
      }
    case 'month': // intentional fall-through
      if (t.getMonth() !== d.getMonth()) {
        return false
      }
    case 'year': // intentional fall-through
      if (t.getFullYear() !== d.getFullYear()) {
        return false
      }
      break
    default:
      throw new Error(("date isSameDate unknown unit " + unit))
  }

  return true
}

function daysInMonth (date) {
  return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate()
}

function getOrdinal (n) {
  if (n >= 11 && n <= 13) {
    return (n + "th")
  }
  switch (n % 10) {
    case 1: return (n + "st")
    case 2: return (n + "nd")
    case 3: return (n + "rd")
  }
  return (n + "th")
}

var formatter = {
  // Year: 00, 01, ..., 99
  YY: function YY (date) {
    return pad(date.getFullYear(), 4).substr(2)
  },

  // Year: 1900, 1901, ..., 2099
  YYYY: function YYYY (date) {
    return pad(date.getFullYear(), 4)
  },

  // Month: 1, 2, ..., 12
  M: function M (date) {
    return date.getMonth() + 1
  },

  // Month: 01, 02, ..., 12
  MM: function MM (date) {
    return pad(date.getMonth() + 1)
  },

  // Month Short Name: Jan, Feb, ...
  MMM: function MMM (date) {
    return i18n.lang.date.monthsShort[date.getMonth()]
  },

  // Month Name: January, February, ...
  MMMM: function MMMM (date) {
    return i18n.lang.date.months[date.getMonth()]
  },

  // Quarter: 1, 2, 3, 4
  Q: function Q (date) {
    return Math.ceil((date.getMonth() + 1) / 3)
  },

  // Quarter: 1st, 2nd, 3rd, 4th
  Qo: function Qo (date) {
    return getOrdinal(this.Q(date))
  },

  // Day of month: 1, 2, ..., 31
  D: function D (date) {
    return date.getDate()
  },

  // Day of month: 1st, 2nd, ..., 31st
  Do: function Do (date) {
    return getOrdinal(date.getDate())
  },

  // Day of month: 01, 02, ..., 31
  DD: function DD (date) {
    return pad(date.getDate())
  },

  // Day of year: 1, 2, ..., 366
  DDD: function DDD (date) {
    return getDayOfYear(date)
  },

  // Day of year: 001, 002, ..., 366
  DDDD: function DDDD (date) {
    return pad(getDayOfYear(date), 3)
  },

  // Day of week: 0, 1, ..., 6
  d: function d (date) {
    return date.getDay()
  },

  // Day of week: Su, Mo, ...
  dd: function dd (date) {
    return this.dddd(date).slice(0, 2)
  },

  // Day of week: Sun, Mon, ...
  ddd: function ddd (date) {
    return i18n.lang.date.daysShort[date.getDay()]
  },

  // Day of week: Sunday, Monday, ...
  dddd: function dddd (date) {
    return i18n.lang.date.days[date.getDay()]
  },

  // Day of ISO week: 1, 2, ..., 7
  E: function E (date) {
    return date.getDay() || 7
  },

  // Week of Year: 1 2 ... 52 53
  w: function w (date) {
    return getWeekOfYear(date)
  },

  // Week of Year: 01 02 ... 52 53
  ww: function ww (date) {
    return pad(getWeekOfYear(date))
  },

  // Hour: 0, 1, ... 23
  H: function H (date) {
    return date.getHours()
  },

  // Hour: 00, 01, ..., 23
  HH: function HH (date) {
    return pad(date.getHours())
  },

  // Hour: 1, 2, ..., 12
  h: function h (date) {
    var hours = date.getHours();
    if (hours === 0) {
      return 12
    }
    if (hours > 12) {
      return hours % 12
    }
    return hours
  },

  // Hour: 01, 02, ..., 12
  hh: function hh (date) {
    return pad(this.h(date))
  },

  // Minute: 0, 1, ..., 59
  m: function m (date) {
    return date.getMinutes()
  },

  // Minute: 00, 01, ..., 59
  mm: function mm (date) {
    return pad(date.getMinutes())
  },

  // Second: 0, 1, ..., 59
  s: function s (date) {
    return date.getSeconds()
  },

  // Second: 00, 01, ..., 59
  ss: function ss (date) {
    return pad(date.getSeconds())
  },

  // 1/10 of second: 0, 1, ..., 9
  S: function S (date) {
    return Math.floor(date.getMilliseconds() / 100)
  },

  // 1/100 of second: 00, 01, ..., 99
  SS: function SS (date) {
    return pad(Math.floor(date.getMilliseconds() / 10))
  },

  // Millisecond: 000, 001, ..., 999
  SSS: function SSS (date) {
    return pad(date.getMilliseconds(), 3)
  },

  // Meridiem: AM, PM
  A: function A (date) {
    return this.H(date) < 12 ? 'AM' : 'PM'
  },

  // Meridiem: am, pm
  a: function a (date) {
    return this.H(date) < 12 ? 'am' : 'pm'
  },

  // Meridiem: a.m., p.m
  aa: function aa (date) {
    return this.H(date) < 12 ? 'a.m.' : 'p.m.'
  },

  // Timezone: -01:00, +00:00, ... +12:00
  Z: function Z (date) {
    return formatTimezone(date.getTimezoneOffset(), ':')
  },

  // Timezone: -0100, +0000, ... +1200
  ZZ: function ZZ (date) {
    return formatTimezone(date.getTimezoneOffset())
  },

  // Seconds timestamp: 512969520
  X: function X (date) {
    return Math.floor(date.getTime() / 1000)
  },

  // Milliseconds timestamp: 512969520900
  x: function x (date) {
    return date.getTime()
  }
};

function formatDate (val, mask) {
  if ( mask === void 0 ) mask = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

  if (val !== 0 && !val) {
    return
  }

  var date = new Date(val);

  return mask.replace(token, function (match, text) {
    if (match in formatter) {
      return formatter[match](date)
    }
    return text === void 0
      ? match
      : text.split('\\]').join(']')
  })
}

function matchFormat (format) {
  if ( format === void 0 ) format = '';

  return format.match(token)
}

function clone$1 (value) {
  return isDate(value) ? new Date(value.getTime()) : value
}

var date = /*#__PURE__*/Object.freeze({
isValid: isValid,
buildDate: buildDate,
getDayOfWeek: getDayOfWeek,
getWeekOfYear: getWeekOfYear,
isBetweenDates: isBetweenDates,
addToDate: addToDate,
subtractFromDate: subtractFromDate,
adjustDate: adjustDate,
startOfDate: startOfDate,
endOfDate: endOfDate,
getMaxDate: getMaxDate,
getMinDate: getMinDate,
getDateDiff: getDateDiff,
getDayOfYear: getDayOfYear,
inferDateFormat: inferDateFormat,
convertDateToFormat: convertDateToFormat,
getDateBetween: getDateBetween,
isSameDate: isSameDate,
daysInMonth: daysInMonth,
formatter: formatter,
formatDate: formatDate,
matchFormat: matchFormat,
clone: clone$1
});

var DateMixin = {
  props: inline,
  computed: {
    model: {
      get: function get () {
        var date = isValid(this.value)
          ? new Date(this.value)
          : (this.defaultValue ? new Date(this.defaultValue) : startOfDate(new Date(), 'day'));

        return getDateBetween(
          date,
          this.pmin,
          this.pmax
        )
      },
      set: function set (val) {
        var this$1 = this;

        var date = getDateBetween(val, this.pmin, this.pmax);
        var value = convertDateToFormat(date, this.formatModel === 'auto' ? inferDateFormat(this.value) : this.formatModel);
        this.$emit('input', value);
        this.$nextTick(function () {
          if (!isSameDate(value, this$1.value)) {
            this$1.$emit('change', value);
          }
        });
      }
    },
    pmin: function pmin () {
      return this.min ? new Date(this.min) : null
    },
    pmax: function pmax () {
      return this.max ? new Date(this.max) : null
    },
    typeHasDate: function typeHasDate () {
      return this.type === 'date' || this.type === 'datetime'
    },
    typeHasTime: function typeHasTime () {
      return this.type === 'time' || this.type === 'datetime'
    },

    year: function year () {
      return this.model.getFullYear()
    },
    month: function month () {
      return this.model.getMonth() + 1
    },
    day: function day () {
      return this.model.getDate()
    },
    minute: function minute () {
      return this.model.getMinutes()
    },

    yearInterval: function yearInterval () {
      var
        min = this.pmin !== null ? this.pmin.getFullYear() : 1950,
        max = this.pmax !== null ? this.pmax.getFullYear() : 2050;
      return Math.max(1, max - min + 1)
    },
    yearMin: function yearMin () {
      return this.pmin !== null ? this.pmin.getFullYear() - 1 : 1949
    },
    monthInterval: function monthInterval () {
      var
        min = this.pmin !== null && this.pmin.getFullYear() === this.model.getFullYear() ? this.pmin.getMonth() : 0,
        max = this.pmax !== null && this.pmax.getFullYear() === this.model.getFullYear() ? this.pmax.getMonth() : 11;
      return Math.max(1, max - min + 1)
    },
    monthMin: function monthMin () {
      return this.pmin !== null && this.pmin.getFullYear() === this.model.getFullYear()
        ? this.pmin.getMonth()
        : 0
    },

    daysInMonth: function daysInMonth$$1 () {
      return (new Date(this.model.getFullYear(), this.model.getMonth() + 1, 0)).getDate()
    },

    editable: function editable () {
      return !this.disable && !this.readonly
    }
  },

  methods: {
    toggleAmPm: function toggleAmPm () {
      if (!this.editable) {
        return
      }
      var
        hour = this.model.getHours(),
        offset = this.am ? 12 : -12;

      this.model = new Date(this.model.setHours(hour + offset));
    },

    __parseTypeValue: function __parseTypeValue (type, value) {
      if (type === 'month') {
        return between(value, 1, 12)
      }
      if (type === 'date') {
        return between(value, 1, this.daysInMonth)
      }
      if (type === 'year') {
        var
          min = this.pmin ? this.pmin.getFullYear() : 1950,
          max = this.pmax ? this.pmax.getFullYear() : 2050;
        return between(value, min, max)
      }
      if (type === 'hour') {
        return between(value, 0, 23)
      }
      if (type === 'minute') {
        return between(value, 0, 59)
      }
    }
  }
}

var QDatetimePicker = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-datetime",class:_vm.classes},[_vm._t("default"),_vm._v(" "),_c('div',{staticClass:"q-datetime-content non-selectable"},[_c('div',{staticClass:"q-datetime-inner full-height flex justify-center",on:{"touchstart":function($event){$event.stopPropagation();$event.preventDefault();}}},[(_vm.typeHasDate)?[_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical",value:(_vm.__dragMonth),expression:"__dragMonth",modifiers:{"vertical":true}}],staticClass:"q-datetime-col q-datetime-col-month"},[_c('div',{ref:"month",staticClass:"q-datetime-col-wrapper",style:(_vm.__monthStyle)},_vm._l((_vm.monthInterval),function(index){return _c('div',{key:("mi" + index),staticClass:"q-datetime-item"},[_vm._v(" "+_vm._s(_vm.$q.i18n.date.months[index + _vm.monthMin - 1])+" ")])}))]),_vm._v(" "),_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical",value:(_vm.__dragDate),expression:"__dragDate",modifiers:{"vertical":true}}],staticClass:"q-datetime-col q-datetime-col-day"},[_c('div',{ref:"date",staticClass:"q-datetime-col-wrapper",style:(_vm.__dayStyle)},_vm._l((_vm.daysInterval),function(index){return _c('div',{key:("di" + index),staticClass:"q-datetime-item"},[_vm._v(" "+_vm._s(index + _vm.dayMin - 1)+" ")])}))]),_vm._v(" "),_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical",value:(_vm.__dragYear),expression:"__dragYear",modifiers:{"vertical":true}}],staticClass:"q-datetime-col q-datetime-col-year"},[_c('div',{ref:"year",staticClass:"q-datetime-col-wrapper",style:(_vm.__yearStyle)},_vm._l((_vm.yearInterval),function(n){return _c('div',{key:("yi" + n),staticClass:"q-datetime-item"},[_vm._v(" "+_vm._s(n + _vm.yearMin)+" ")])}))])]:_vm._e(),_vm._v(" "),(_vm.typeHasTime)?[_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical",value:(_vm.__dragHour),expression:"__dragHour",modifiers:{"vertical":true}}],staticClass:"q-datetime-col q-datetime-col-hour"},[_c('div',{ref:"hour",staticClass:"q-datetime-col-wrapper",style:(_vm.__hourStyle)},_vm._l((_vm.hourInterval),function(n){return _c('div',{key:("hi" + n),staticClass:"q-datetime-item"},[_vm._v(" "+_vm._s(n + _vm.hourMin - 1)+" ")])}))]),_vm._v(" "),_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical",value:(_vm.__dragMinute),expression:"__dragMinute",modifiers:{"vertical":true}}],staticClass:"q-datetime-col q-datetime-col-minute"},[_c('div',{ref:"minute",staticClass:"q-datetime-col-wrapper",style:(_vm.__minuteStyle)},_vm._l((_vm.minuteInterval),function(n){return _c('div',{key:("ni" + n),staticClass:"q-datetime-item"},[_vm._v(" "+_vm._s(_vm.__pad(n + _vm.minuteMin - 1))+" ")])}))])]:_vm._e()],2),_vm._v(" "),_c('div',{staticClass:"q-datetime-mask"}),_vm._v(" "),_c('div',{staticClass:"q-datetime-highlight"})])],2)},staticRenderFns: [],
  name: 'QDatetimePicker',
  mixins: [DateMixin, ParentFieldMixin],
  directives: {
    TouchPan: TouchPan
  },
  props: {
    defaultValue: [String, Number, Date],
    disable: Boolean,
    readonly: Boolean
  },
  data: function data () {
    return {
      monthDragOffset: 0,
      dateDragOffset: 0,
      yearDragOffset: 0,
      hourDragOffset: 0,
      minuteDragOffset: 0,
      dragging: false
    }
  },
  watch: {
    model: function model () {
      this.$nextTick(this.__updateAllPositions);
    }
  },
  computed: {
    classes: function classes () {
      var cls = ['type-' + this.type];
      this.disable && cls.push('disabled');
      this.readonly && cls.push('readonly');
      this.dark && cls.push('q-datetime-dark');
      this.minimal && cls.push('q-datetime-minimal');
      return cls
    },
    dayMin: function dayMin () {
      return this.pmin !== null && isSameDate(this.pmin, this.model, 'month')
        ? this.pmin.getDate()
        : 1
    },
    dayMax: function dayMax () {
      return this.pmax !== null && isSameDate(this.pmax, this.model, 'month')
        ? this.pmax.getDate()
        : this.daysInMonth
    },
    daysInterval: function daysInterval () {
      return this.dayMax - this.dayMin + 1
    },

    hour: function hour () {
      return this.model.getHours()
    },
    hourMin: function hourMin () {
      return this.pmin && isSameDate(this.pmin, this.model, 'day') ? this.pmin.getHours() : 0
    },
    hourInterval: function hourInterval () {
      return (this.pmax && isSameDate(this.pmax, this.model, 'day') ? this.pmax.getHours() : 23) - this.hourMin + 1
    },

    minuteMin: function minuteMin () {
      return this.pmin && isSameDate(this.pmin, this.model, 'hour') ? this.pmin.getMinutes() : 0
    },
    minuteInterval: function minuteInterval () {
      return (this.pmax && isSameDate(this.pmax, this.model, 'hour') ? this.pmax.getMinutes() : 59) - this.minuteMin + 1
    },

    __monthStyle: function __monthStyle () {
      return this.__colStyle(82 - (this.month - 1 + this.monthDragOffset) * 36)
    },
    __dayStyle: function __dayStyle () {
      return this.__colStyle(82 - (this.day + this.dateDragOffset) * 36)
    },
    __yearStyle: function __yearStyle () {
      return this.__colStyle(82 - (this.year + this.yearDragOffset) * 36)
    },
    __hourStyle: function __hourStyle () {
      return this.__colStyle(82 - (this.hour + this.hourDragOffset) * 36)
    },
    __minuteStyle: function __minuteStyle () {
      return this.__colStyle(82 - (this.minute + this.minuteDragOffset) * 36)
    }
  },
  methods: {
    /* date */
    setYear: function setYear (value) {
      if (this.editable) {
        this.model = new Date(this.model.setFullYear(this.__parseTypeValue('year', value)));
      }
    },
    setMonth: function setMonth (value) {
      if (this.editable) {
        this.model = adjustDate(this.model, {month: value});
      }
    },
    setDay: function setDay (value) {
      if (this.editable) {
        this.model = new Date(this.model.setDate(this.__parseTypeValue('date', value)));
      }
    },

    /* time */
    setHour: function setHour (value) {
      if (this.editable) {
        this.model = new Date(this.model.setHours(this.__parseTypeValue('hour', value)));
      }
    },
    setMinute: function setMinute (value) {
      if (this.editable) {
        this.model = new Date(this.model.setMinutes(this.__parseTypeValue('minute', value)));
      }
    },

    setView: function setView () {},

    /* helpers */
    __pad: function __pad (unit, filler) {
      return (unit < 10 ? filler || '0' : '') + unit
    },
    __scrollView: function __scrollView () {},
    __updateAllPositions: function __updateAllPositions () {
      var this$1 = this;

      this.$nextTick(function () {
        if (this$1.typeHasDate) {
          this$1.__updatePositions('month', this$1.model.getMonth());
          this$1.__updatePositions('date', this$1.model.getDate());
          this$1.__updatePositions('year', this$1.model.getFullYear());
        }
        if (this$1.typeHasTime) {
          this$1.__updatePositions('hour', this$1.model.getHours());
          this$1.__updatePositions('minute', this$1.model.getMinutes());
        }
      });
    },
    __updatePositions: function __updatePositions (type, value) {
      var this$1 = this;

      var root = this.$refs[type];
      if (!root) {
        return
      }

      var delta = -value;
      if (type === 'year') {
        delta += this.yearMin + 1;
      }
      else if (type === 'date') {
        delta += this.dayMin;
      }
      else {
        delta += this[type + 'Min'];
      }
[].slice.call(root.children).forEach(function (item) {
        css(item, this$1.__itemStyle(value * 36, between(delta * -18, -180, 180)));
        delta++;
      });
    },
    __colStyle: function __colStyle (value) {
      return {
        '-webkit-transform': 'translate3d(0,' + value + 'px,0)',
        '-ms-transform': 'translate3d(0,' + value + 'px,0)',
        'transform': 'translate3d(0,' + value + 'px,0)'
      }
    },
    __itemStyle: function __itemStyle (translation, rotation) {
      return {
        '-webkit-transform': 'translate3d(0, ' + translation + 'px, 0) rotateX(' + rotation + 'deg)',
        '-ms-transform': 'translate3d(0, ' + translation + 'px, 0) rotateX(' + rotation + 'deg)',
        'transform': 'translate3d(0, ' + translation + 'px, 0) rotateX(' + rotation + 'deg)'
      }
    },

    /* common */
    __dragMonth: function __dragMonth (e) {
      this.__drag(e, 'month');
    },
    __dragDate: function __dragDate (e) {
      this.__drag(e, 'date');
    },
    __dragYear: function __dragYear (e) {
      this.__drag(e, 'year');
    },
    __dragHour: function __dragHour (e) {
      this.__drag(e, 'hour');
    },
    __dragMinute: function __dragMinute (e) {
      this.__drag(e, 'minute');
    },
    __drag: function __drag (e, type) {
      var method = e.isFirst
        ? '__dragStart' : (e.isFinal ? '__dragStop' : '__dragMove');

      this[method](e.evt, type);
    },
    __dragStart: function __dragStart (ev, type) {
      if (!this.editable) {
        return
      }

      this[type + 'DragOffset'] = 0;
      this.dragging = type;
      this.__actualType = type === 'date' ? 'day' : type;
      this.__typeOffset = type === 'month' ? -1 : 0;
      this.__dragPosition = position(ev).top;
    },
    __dragMove: function __dragMove (ev, type) {
      if (this.dragging !== type || !this.editable) {
        return
      }

      var offset$$1 = (this.__dragPosition - position(ev).top) / 36;
      this[type + 'DragOffset'] = offset$$1;
      this.__updatePositions(type, this[this.__actualType] + offset$$1 + this.__typeOffset);
    },
    __dragStop: function __dragStop (ev, type) {
      var this$1 = this;

      if (this.dragging !== type || !this.editable) {
        return
      }
      this.dragging = false;

      var
        offset$$1 = Math.round(this[type + 'DragOffset']),
        newValue = this.__parseTypeValue(type, this[this.__actualType] + offset$$1);

      if (newValue !== this[this.__actualType]) {
        this[("set" + (capitalize(this.__actualType)))](newValue);
      }
      else {
        this.__updatePositions(type, this[this.__actualType] + this.__typeOffset);
      }
      this.$nextTick(function () {
        this$1[type + 'DragOffset'] = 0;
      });
    }
  },
  mounted: function mounted () {
    this.$nextTick(this.__updateAllPositions);
  }
}

var contentCss$1 = {
    maxHeight: '80vh',
    height: 'auto',
    boxShadow: 'none',
    backgroundColor: '#e4e4e4'
  };

var QDatetime = {
  name: 'QDatetime',
  mixins: [FrameMixin, DisplayModeMixin],
  props: extend(
    input,
    inline
  ),
  watch: {
    value: function value (v) {
      if (!this.disable && this.isPopover) {
        this.model = clone$1(v);
      }
    }
  },
  data: function data () {
    var data = this.isPopover ? {} : {
      transition: 'q-modal-bottom'
    };
    data.focused = false;
    data.model = clone$1(this.computedValue);
    return data
  },
  computed: {
    actualValue: function actualValue () {
      if (this.displayValue) {
        return this.displayValue
      }
      if (!isValid(this.value)) {
        return ''
      }

      var format;

      if (this.format) {
        format = this.format;
      }
      else if (this.type === 'date') {
        format = 'YYYY/MM/DD';
      }
      else if (this.type === 'time') {
        format = 'HH:mm';
      }
      else {
        format = 'YYYY/MM/DD HH:mm:ss';
      }

      return formatDate(this.value, format, /* for reactiveness */ this.$q.i18n.date)
    },
    computedValue: function computedValue () {
      if (isValid(this.value)) {
        return this.value
      }
      {
        return this.defaultValue || startOfDate(new Date(), 'day')
      }
      return this.defaultValue
    },
    modalBtnColor: function modalBtnColor () {
      return this.dark ? 'light' : 'dark'
    }
  },
  methods: {
    toggle: function toggle () {
      this[this.$refs.popup.showing ? 'hide' : 'show']();
    },
    show: function show () {
      if (!this.disable) {
        this.__setModel(this.computedValue);
        return this.$refs.popup.show()
      }
    },
    hide: function hide () {
      return this.$refs.popup.hide()
    },

    __handleKeyDown: function __handleKeyDown (e) {
      switch (getEventKey(e)) {
        case 13: // ENTER key
        case 32: // SPACE key
          stopAndPrevent(e);
          return this.show()
        case 8: // BACKSPACE key
          if (this.editable && this.clearable && this.actualValue.length) {
            this.clear();
          }
      }
    },
    __onFocus: function __onFocus () {
      if (this.disable || this.focused) {
        return
      }
      
      this.model = clone$1(this.computedValue);
      this.focused = true;
      this.$emit('focus');
    },
    __onBlur: function __onBlur (e) {
      var this$1 = this;

      if (!this.focused) {
        return
      }

      setTimeout(function () {
        var el = document.activeElement;
        if (
          !this$1.$refs.popup ||
          !this$1.$refs.popup.showing ||
          (el !== document.body && !this$1.$refs.popup.$el.contains(el))
        ) {
          this$1.__onHide();
          this$1.hide();
        }
      }, 1);
    },
    __onHide: function __onHide (forceUpdate, keepFocus) {
      if (forceUpdate || this.isPopover) {
        this.__update(forceUpdate);
      }
      if (!this.focused) {
        return
      }
      if (keepFocus) {
        this.$el.focus();
        return
      }
      this.$emit('blur');
      this.focused = false;
    },
    __setModel: function __setModel (val, forceUpdate) {
      this.model = clone$1(val);
      if (forceUpdate || this.isPopover) {
        this.__update(forceUpdate);
      }
    },
    __update: function __update (change) {
      var this$1 = this;

      this.$nextTick(function () {
        if (!isSameDate(this$1.model, this$1.value)) {
          this$1.$emit('input', this$1.model);
          if (change) {
            this$1.$emit('change', this$1.model);
          }
        }
      });
    },
    __resetView: function __resetView () {
      // go back to initial entry point for that type of control
      // if it has defaultView it's going to be reapplied anyway on focus
      if (!this.defaultView) {
        this.$refs.target.setView();
      }
    },

    __getPicker: function __getPicker (h, modal) {
      var this$1 = this;

      return [
        h(QDatetimePicker, {
          ref: 'target',
          staticClass: 'no-border',
          'class': {
            'datetime-ios-modal': "ios" === 'ios' && modal
          },
          props: {
            type: this.type,
            min: this.min,
            max: this.max,
            minimal: this.minimal,
            formatModel: this.formatModel,
            format24h: this.format24h,
            firstDayOfWeek: this.firstDayOfWeek,
            defaultView: this.defaultView,
            color: this.invertedLight ? 'grey-7' : this.color,
            dark: this.dark,
            value: this.model,
            disable: this.disable,
            readonly: this.readonly,
            noParentField: true
          },
          on: {
            input: function (v) { return this$1.$nextTick(function () { return this$1.__setModel(v); }); },
            canClose: function () {
              if (this$1.isPopover) {
                this$1.hide();
                this$1.__resetView();
              }
            }
          }
        }, [
          modal
            ? h('div', {
              staticClass: 'modal-buttons modal-buttons-top row full-width'
            }, [
              h('div', { staticClass: 'col' }),
              h(QBtn, {
                props: {
                  color: this.modalBtnColor,
                  flat: true,
                  label: this.cancelLabel || this.$q.i18n.label.cancel,
                  noRipple: true
                },
                on: {
                  click: function () {
                    this$1.__onHide(false, true);
                    this$1.hide();
                    this$1.__resetView();
                  }
                }
              }),
              this.editable
                ? h(QBtn, {
                  props: {
                    color: this.modalBtnColor,
                    flat: true,
                    label: this.okLabel || this.$q.i18n.label.set,
                    noRipple: true,
                    disable: !this.model
                  },
                  on: {
                    click: function () {
                      this$1.__onHide(true, true);
                      this$1.hide();
                      this$1.__resetView();
                    }
                  }
                })
                : null
            ])
            : null
        ])
      ]
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(QInputFrame, {
      staticClass: 'q-datetime-input',
      props: {
        prefix: this.prefix,
        suffix: this.suffix,
        stackLabel: this.stackLabel,
        floatLabel: this.floatLabel,
        error: this.error,
        warning: this.warning,
        disable: this.disable,
        readonly: this.readonly,
        inverted: this.inverted,
        invertedLight: this.invertedLight,
        dark: this.dark,
        hideUnderline: this.hideUnderline,
        before: this.before,
        after: this.after,
        color: this.color,
        noParentField: this.noParentField,

        focused: this.focused || (this.$refs.popup && this.$refs.popup.showing),
        focusable: true,
        length: this.actualValue.length
      },
      nativeOn: {
        click: this.toggle,
        focus: this.__onFocus,
        blur: this.__onBlur,
        keydown: this.__handleKeyDown
      }
    }, [
      h('div', {
        staticClass: 'col q-input-target ellipsis',
        'class': this.fakeInputClasses
      }, [
        this.fakeInputValue
      ]),

      this.isPopover
        ? h(QPopover, {
          ref: 'popup',
          props: {
            disable: this.disable,
            anchorClick: false,
            maxHeight: '100vh'
          },
          on: {
            show: this.__onFocus,
            hide: function () { return this$1.__onHide(true, true); }
          }
        }, this.__getPicker(h))
        : h(QModal, {
          ref: 'popup',
          staticClass: 'with-backdrop',
          props: {
            contentCss: contentCss$1,
            minimized: "ios" === 'mat',
            position: 'bottom',
            transition: this.transition
          },
          on: {
            dismiss: function () { return this$1.__onHide(false, true); }
          }
        }, this.__getPicker(h, true)),

      this.editable && this.clearable && this.actualValue.length
        ? h('QIcon', {
          slot: 'after',
          props: { name: this.$q.icon.input[("clear" + (this.isInverted ? 'Inverted' : ''))] },
          nativeOn: { click: this.clear },
          staticClass: 'q-if-control'
        })
        : null,

      h('QIcon', {
        slot: 'after',
        props: { name: this.$q.icon.input.dropdown },
        staticClass: 'q-if-control'
      })
    ])
  }
}

var inputTypes = [
  'text', 'textarea', 'email',
  'tel', 'file', 'number',
  'password', 'url', 'time', 'date'
]

var QResizeObservable = {
  name: 'QResizeObservable',
  props: {
    debounce: {
      type: Number,
      default: 100
    }
  },
  data: function data () {
    return this.hasObserver
      ? {}
      : { url: this.$q.platform.is.ie ? null : 'about:blank' }
  },
  methods: {
    onResize: function onResize () {
      this.timer = null;

      if (!this.$el || !this.$el.parentNode) {
        return
      }

      var
        parent = this.$el.parentNode,
        size = {
          width: parent.offsetWidth,
          height: parent.offsetHeight
        };

      if (size.width === this.size.width && size.height === this.size.height) {
        return
      }

      this.size = size;
      this.$emit('resize', this.size);
    },
    trigger: function trigger (immediately) {
      if (immediately || this.debounce === 0) {
        this.onResize();
      }
      else if (!this.timer) {
        this.timer = setTimeout(this.onResize, this.debounce);
      }
    }
  },
  render: function render (h) {
    var this$1 = this;

    if (this.hasObserver) {
      return
    }

    return h('object', {
      style: this.style,
      attrs: {
        type: 'text/html',
        data: this.url,
        'aria-hidden': true
      },
      on: {
        load: function () {
          this$1.$el.contentDocument.defaultView.addEventListener('resize', this$1.trigger, listenOpts.passive);
          this$1.trigger(true);
        }
      }
    })
  },
  beforeCreate: function beforeCreate () {
    this.size = { width: -1, height: -1 };
    this.hasObserver = typeof ResizeObserver !== 'undefined';

    if (!this.hasObserver) {
      this.style = (this.$q.platform.is.ie ? 'visibility:hidden;' : '') + "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;";
    }
  },
  mounted: function mounted () {
    if (this.hasObserver) {
      this.observer = new ResizeObserver(this.trigger);
      this.observer.observe(this.$el.parentNode);
      return
    }

    this.trigger(true);

    if (this.$q.platform.is.ie) {
      this.url = 'about:blank';
    }
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);

    if (this.hasObserver) {
      this.observer.unobserve(this.$el.parentNode);
      return
    }

    if (this.$el.contentDocument) {
      this.$el.contentDocument.defaultView.removeEventListener('resize', this.trigger, listenOpts.passive);
    }
  }
}

var QScrollObservable = {
  name: 'QScrollObservable',
  render: function render () {},
  data: function data () {
    return {
      pos: 0,
      dir: 'down',
      dirChanged: false,
      dirChangePos: 0
    }
  },
  methods: {
    getPosition: function getPosition () {
      return {
        position: this.pos,
        direction: this.dir,
        directionChanged: this.dirChanged,
        inflexionPosition: this.dirChangePos
      }
    },
    trigger: function trigger () {
      if (!this.timer) {
        this.timer = window.requestAnimationFrame(this.emit);
      }
    },
    emit: function emit () {
      var
        pos = Math.max(0, getScrollPosition(this.target)),
        delta = pos - this.pos,
        dir = delta < 0 ? 'up' : 'down';

      this.dirChanged = this.dir !== dir;
      if (this.dirChanged) {
        this.dir = dir;
        this.dirChangePos = this.pos;
      }

      this.timer = null;
      this.pos = pos;
      this.$emit('scroll', this.getPosition());
    }
  },
  mounted: function mounted () {
    this.target = getScrollTarget(this.$el.parentNode);
    this.target.addEventListener('scroll', this.trigger, listenOpts.passive);
    this.trigger();
  },
  beforeDestroy: function beforeDestroy () {
    this.target.removeEventListener('scroll', this.trigger, listenOpts.passive);
  }
}

var QWindowResizeObservable = {
  name: 'QWindowResizeObservable',
  props: {
    debounce: {
      type: Number,
      default: 80
    }
  },
  render: function render () {},
  methods: {
    trigger: function trigger () {
      if (this.debounce === 0) {
        this.emit();
      }
      else if (!this.timer) {
        this.timer = setTimeout(this.emit, this.debounce);
      }
    },
    emit: function emit () {
      this.timer = null;
      this.$emit('resize', {
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
  },
  created: function created () {
    this.emit();
  },
  mounted: function mounted () {
    window.addEventListener('resize', this.trigger, listenOpts.passive);
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
    window.removeEventListener('resize', this.trigger, listenOpts.passive);
  }
}

var QInput = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{staticClass:"q-input",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"warning":_vm.warning,"disable":_vm.disable,"inverted":_vm.inverted,"invertedLight":_vm.invertedLight,"dark":_vm.dark,"hide-underline":_vm.hideUnderline,"before":_vm.before,"after":_vm.after,"color":_vm.color,"no-parent-field":_vm.noParentField,"focused":_vm.focused,"length":_vm.autofilled + _vm.length,"top-addons":_vm.isTextarea},on:{"click":_vm.__onClick,"focus":_vm.__onFocus}},[_vm._t("before"),_vm._v(" "),(_vm.isTextarea)?[_c('div',{staticClass:"col row relative-position"},[_c('q-resize-observable',{on:{"resize":function($event){_vm.__updateArea();}}}),_vm._v(" "),_c('textarea',_vm._b({ref:"shadow",staticClass:"col q-input-target q-input-shadow absolute-top",domProps:{"value":_vm.model}},'textarea',_vm.$attrs,false)),_vm._v(" "),_c('textarea',_vm._b({ref:"input",staticClass:"col q-input-target q-input-area",attrs:{"placeholder":_vm.inputPlaceholder,"disabled":_vm.disable,"readonly":_vm.readonly},domProps:{"value":_vm.model},on:{"input":_vm.__set,"focus":_vm.__onFocus,"blur":_vm.__onInputBlur,"keydown":_vm.__onKeydown,"keyup":_vm.__onKeyup}},'textarea',_vm.$attrs,false))],1)]:_c('input',_vm._b({ref:"input",staticClass:"col q-input-target q-no-input-spinner",class:_vm.inputClasses,attrs:{"placeholder":_vm.inputPlaceholder,"disabled":_vm.disable,"readonly":_vm.readonly,"step":_vm.computedStep,"type":_vm.inputType},domProps:{"value":_vm.model},on:{"input":_vm.__set,"focus":_vm.__onFocus,"blur":_vm.__onInputBlur,"keydown":_vm.__onKeydown,"keyup":_vm.__onKeyup,"animationstart":_vm.__onAnimationStart}},'input',_vm.$attrs,false)),_vm._v(" "),(!_vm.disable && _vm.isPassword && !_vm.noPassToggle && _vm.length)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.input[_vm.showPass ? 'showPass' : 'hidePass']},nativeOn:{"mousedown":function($event){return _vm.__clearTimer($event)},"touchstart":function($event){return _vm.__clearTimer($event)},"click":function($event){return _vm.togglePass($event)}},slot:"after"}):_vm._e(),_vm._v(" "),(_vm.editable && _vm.keyboardToggle)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.input[_vm.showNumber ? 'showNumber' : 'hideNumber']},nativeOn:{"mousedown":function($event){return _vm.__clearTimer($event)},"touchstart":function($event){return _vm.__clearTimer($event)},"click":function($event){return _vm.toggleNumber($event)}},slot:"after"}):_vm._e(),_vm._v(" "),(_vm.editable && _vm.clearable && _vm.length)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.input[("clear" + (_vm.isInverted ? 'Inverted' : ''))]},nativeOn:{"mousedown":function($event){return _vm.__clearTimer($event)},"touchstart":function($event){return _vm.__clearTimer($event)},"click":function($event){return _vm.clear($event)}},slot:"after"}):_vm._e(),_vm._v(" "),(_vm.isLoading)?_c('q-spinner',{staticClass:"q-if-control",attrs:{"slot":"after","size":"24px"},slot:"after"}):_vm._e(),_vm._v(" "),_vm._t("after"),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],
  name: 'QInput',
  mixins: [FrameMixin, InputMixin],
  components: {
    QInputFrame: QInputFrame,
    QSpinner: QSpinner,
    QResizeObservable: QResizeObservable
  },
  props: {
    value: { required: true },
    type: {
      type: String,
      default: 'text',
      validator: function (t) { return inputTypes.includes(t); }
    },
    align: {
      type: String,
      validator: function (v) { return ['left', 'center', 'right'].includes(v); }
    },
    clearable: Boolean,
    noPassToggle: Boolean,
    numericKeyboardToggle: Boolean,
    readonly: Boolean,

    decimals: Number,
    step: Number,
    upperCase: Boolean
  },
  data: function data () {
    var this$1 = this;

    return {
      showPass: false,
      showNumber: true,
      model: this.value,
      watcher: null,
      autofilled: false,
      shadow: {
        val: this.model,
        set: this.__set,
        loading: false,
        watched: 0,
        isDark: function () { return this$1.dark; },
        hasFocus: function () { return document.activeElement === this$1.$refs.input; },
        register: function () {
          this$1.shadow.watched += 1;
          this$1.__watcherRegister();
        },
        unregister: function () {
          this$1.shadow.watched = Math.max(0, this$1.shadow.watched - 1);
          this$1.__watcherUnregister();
        },
        getEl: function () { return this$1.$refs.input; }
      }
    }
  },
  watch: {
    value: function value (v) {
      this.model = v;
      this.isNumberError = false;
      this.isNegZero = false;
    },
    isTextarea: function isTextarea (v) {
      this[v ? '__watcherRegister' : '__watcherUnregister']();
    }
  },
  provide: function provide () {
    return {
      __input: this.shadow
    }
  },
  computed: {
    isNumber: function isNumber () {
      return this.type === 'number'
    },
    isPassword: function isPassword () {
      return this.type === 'password'
    },
    isTextarea: function isTextarea () {
      return this.type === 'textarea'
    },
    isLoading: function isLoading () {
      return this.loading || (this.shadow.watched && this.shadow.loading)
    },
    keyboardToggle: function keyboardToggle () {
      return this.$q.platform.is.mobile &&
        this.isNumber &&
        this.numericKeyboardToggle &&
        length
    },
    inputType: function inputType () {
      if (this.isPassword) {
        return this.showPass && this.editable ? 'text' : 'password'
      }
      return this.isNumber
        ? (this.showNumber || !this.editable ? 'number' : 'text')
        : this.type
    },
    inputClasses: function inputClasses () {
      var classes = [];
      this.align && classes.push(("text-" + (this.align)));
      this.autofilled && classes.push('q-input-autofill');
      return classes
    },
    length: function length () {
      return this.model !== null && this.model !== undefined
        ? ('' + this.model).length
        : 0
    },
    computedStep: function computedStep () {
      return this.step || (this.decimals ? Math.pow( 10, -this.decimals ) : 'any')
    }
  },
  methods: {
    togglePass: function togglePass () {
      this.showPass = !this.showPass;
      clearTimeout(this.timer);
      this.focus();
    },
    toggleNumber: function toggleNumber () {
      this.showNumber = !this.showNumber;
      clearTimeout(this.timer);
      this.focus();
    },

    __clearTimer: function __clearTimer () {
      var this$1 = this;

      this.$nextTick(function () { return clearTimeout(this$1.timer); });
    },

    __onAnimationStart: function __onAnimationStart (e) {
      if (e.animationName.indexOf('webkit-autofill-') === 0) {
        var value = e.animationName === 'webkit-autofill-on';
        if (value !== this.autofilled) {
          e.value = this.autofilled = value;
          e.el = this;
          return this.$emit('autofill', e)
        }
      }
    },

    __setModel: function __setModel (val) {
      clearTimeout(this.timer);
      this.focus();
      this.__set(val || (this.isNumber ? null : ''), true);
    },
    __set: function __set (e, forceUpdate) {
      var this$1 = this;

      var val = e && e.target ? e.target.value : e;

      if (this.isNumber) {
        this.isNegZero = (1 / val) === -Infinity;
        var forcedValue = this.isNegZero ? -0 : val;
        val = parseFloat(val);
        if (isNaN(val) || this.isNegZero) {
          this.isNumberError = true;
          if (forceUpdate) {
            this.$emit('input', forcedValue);
            this.$nextTick(function () {
              if (JSON.stringify(forcedValue) !== JSON.stringify(this$1.value)) {
                this$1.$emit('change', forcedValue);
              }
            });
          }
          return
        }
        this.isNumberError = false;
        if (Number.isInteger(this.decimals)) {
          val = parseFloat(val.toFixed(this.decimals));
        }
      }
      else if (this.upperCase) {
        val = val.toUpperCase();
      }

      this.model = val;
      this.$emit('input', val);
      if (forceUpdate) {
        this.$nextTick(function () {
          if (JSON.stringify(val) !== JSON.stringify(this$1.value)) {
            this$1.$emit('change', val);
          }
        });
      }
    },
    __updateArea: function __updateArea () {
      var shadow = this.$refs.shadow;
      if (shadow) {
        var h = shadow.scrollHeight;
        var minHeight = between(h, 19, this.maxHeight || h);
        this.$refs.input.style.minHeight = (minHeight + 19) + "px";
      }
    },
    __watcher: function __watcher (value) {
      if (this.isTextarea) {
        this.__updateArea(value);
      }
      if (this.shadow.watched) {
        this.shadow.val = value;
      }
    },
    __watcherRegister: function __watcherRegister () {
      if (!this.watcher) {
        this.watcher = this.$watch('model', this.__watcher);
      }
    },
    __watcherUnregister: function __watcherUnregister (forceUnregister) {
      if (
        this.watcher &&
        (forceUnregister || (!this.isTextarea && !this.shadow.watched))
      ) {
        this.watcher();
        this.watcher = null;
      }
    }
  },
  mounted: function mounted () {
    this.__updateArea = frameDebounce(this.__updateArea);
    if (this.isTextarea) {
      this.__updateArea();
      this.__watcherRegister();
    }
  },
  beforeDestroy: function beforeDestroy () {
    this.__watcherUnregister(true);
  }
}

var QRadio = {
  name: 'QRadio',
  mixins: [OptionMixin],
  props: {
    val: {
      required: true
    }
  },
  computed: {
    isTrue: function isTrue () {
      return this.value === this.val
    }
  },
  methods: {
    toggle: function toggle (evt, blur) {
      if ( blur === void 0 ) blur = true;

      if (this.disable || this.readonly) {
        return
      }
      evt && stopAndPrevent(evt);
      blur && this.$el.blur();

      if (!this.isTrue) {
        this.__update(this.val);
      }
    },
    __getContent: function __getContent (h) {
      return [
        h(QIcon, {
          staticClass: 'q-radio-unchecked cursor-pointer absolute-full',
          props: {
            name: this.uncheckedIcon || this.$q.icon.radio.unchecked["ios"]
          }
        }),
        h(QIcon, {
          staticClass: 'q-radio-checked cursor-pointer absolute-full',
          props: {
            name: this.checkedIcon || this.$q.icon.radio.checked["ios"]
          }
        }),
        null
      ]
    }
  },
  beforeCreate: function beforeCreate () {
    this.__kebabTag = 'q-radio';
  }
}

var QToggle = {
  name: 'QToggle',
  mixins: [CheckboxMixin, OptionMixin],
  props: {
    icon: String
  },
  computed: {
    currentIcon: function currentIcon () {
      return (this.isTrue ? this.checkedIcon : this.uncheckedIcon) || this.icon
    },
    iconColor: function iconColor () {
      return 'dark'
    },
    baseClass: function baseClass () {
      if ("ios" === 'ios' && this.dark) {
        return "q-toggle-base-dark"
      }
    }
  },
  methods: {
    __swipe: function __swipe (evt) {
      if (evt.direction === 'left') {
        if (this.isTrue) {
          this.toggle();
        }
      }
      else if (evt.direction === 'right') {
        if (this.isFalse) {
          this.toggle();
        }
      }
    },
    __getContent: function __getContent (h) {
      return [
        h('div', { staticClass: 'q-toggle-base', 'class': this.baseClass }),
        h('div', { staticClass: 'q-toggle-handle row flex-center' }, [
          this.currentIcon
            ? h(QIcon, {
              staticClass: 'q-toggle-icon',
              props: { name: this.currentIcon, color: this.iconColor }
            })
            : null,
          null
        ])
      ]
    }
  },
  beforeCreate: function beforeCreate () {
    this.__kebabTag = 'q-toggle';
  }
}

var QOptionGroup = {
  name: 'QOptionGroup',
  mixins: [ParentFieldMixin],
  components: {
    QRadio: QRadio,
    QCheckbox: QCheckbox,
    QToggle: QToggle
  },
  props: {
    value: {
      required: true
    },
    type: {
      default: 'radio',
      validator: function (v) { return ['radio', 'checkbox', 'toggle'].includes(v); }
    },
    color: String,
    keepColor: Boolean,
    dark: Boolean,
    options: {
      type: Array,
      validator: function validator (opts) {
        return opts.every(function (opt) { return 'value' in opt && 'label' in opt; })
      }
    },
    leftLabel: Boolean,
    inline: Boolean,
    disable: Boolean,
    readonly: Boolean
  },
  computed: {
    component: function component () {
      return ("q-" + (this.type))
    },
    model: function model () {
      return Array.isArray(this.value) ? this.value.slice() : this.value
    },
    length: function length () {
      return this.value
        ? (this.type === 'radio' ? 1 : this.value.length)
        : 0
    },
    __needsBorder: function __needsBorder () {
      return true
    }
  },
  methods: {
    __onFocus: function __onFocus () {
      this.$emit('focus');
    },
    __onBlur: function __onBlur () {
      this.$emit('blur');
    },
    __update: function __update (value) {
      var this$1 = this;

      this.$emit('input', value);
      this.$nextTick(function () {
        if (JSON.stringify(value) !== JSON.stringify(this$1.value)) {
          this$1.$emit('change', value);
        }
      });
    }
  },
  created: function created () {
    var isArray = Array.isArray(this.value);
    if (this.type === 'radio') {
      if (isArray) {
        console.error('q-option-group: model should not be array');
      }
    }
    else if (!isArray) {
      console.error('q-option-group: model should be array in your case');
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(
      'div',
      {
        staticClass: 'q-option-group group',
        'class': { 'q-option-group-inline-opts': this.inline }
      },
      this.options.map(
        function (opt) { return h('div', [
          h(this$1.component, {
            props: {
              value: this$1.value,
              val: opt.value,
              readonly: this$1.readonly || opt.readonly,
              disable: this$1.disable || opt.disable,
              label: opt.label,
              leftLabel: this$1.leftLabel || opt.leftLabel,
              color: opt.color || this$1.color,
              checkedIcon: opt.checkedIcon,
              uncheckedIcon: opt.uncheckedIcon,
              dark: opt.dark || this$1.dark,
              keepColor: opt.keepColor || this$1.keepColor
            },
            on: {
              input: this$1.__update,
              focus: this$1.__onFocus,
              blur: this$1.__onBlur
            }
          })
        ]); }
      )
    )
  }
}

var QDialog = {
  name: 'QDialog',
  props: {
    value: Boolean,
    title: String,
    message: String,
    prompt: Object,
    options: Object,
    ok: {
      type: [String, Object, Boolean],
      default: true
    },
    cancel: [String, Object, Boolean],
    stackButtons: Boolean,
    preventClose: Boolean,
    noBackdropDismiss: Boolean,
    noEscDismiss: Boolean,
    noRefocus: Boolean,
    position: String,
    color: {
      type: String,
      default: 'primary'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var
      child = [],
      title = this.$slots.title || this.title,
      msg = this.$slots.message || this.message;

    if (title) {
      child.push(
        h('div', {
          staticClass: 'modal-header'
        }, [ title ])
      );
    }
    if (msg) {
      child.push(
        h('div', {
          staticClass: 'modal-body modal-message modal-scroll'
        }, [ msg ])
      );
    }

    if (this.hasForm || this.$slots.body) {
      child.push(
        h(
          'div',
          { staticClass: 'modal-body modal-scroll' },
          this.hasForm
            ? (this.prompt ? this.__getPrompt(h) : this.__getOptions(h))
            : [ this.$slots.body ]
        )
      );
    }

    if (this.$scopedSlots.buttons) {
      child.push(
        h('div', {
          staticClass: 'modal-buttons',
          'class': this.buttonClass
        }, [
          this.$scopedSlots.buttons({
            ok: this.__onOk,
            cancel: this.__onCancel
          })
        ])
      );
    }
    else if (this.ok || this.cancel) {
      child.push(this.__getButtons(h));
    }

    return h(QModal, {
      ref: 'modal',
      props: {
        value: this.value,
        minimized: true,
        noBackdropDismiss: this.noBackdropDismiss || this.preventClose,
        noEscDismiss: this.noEscDismiss || this.preventClose,
        noRefocus: this.noRefocus,
        position: this.position
      },
      on: {
        input: function (val) {
          this$1.$emit('input', val);
        },
        show: function () {
          this$1.$emit('show');

          if (!this$1.$q.platform.is.desktop || (!this$1.prompt && !this$1.options)) {
            return
          }

          var node = this$1.prompt
            ? this$1.$refs.modal.$el.getElementsByTagName('INPUT')
            : this$1.$refs.modal.$el.getElementsByClassName('q-option');

          if (node.length) {
            node[0].focus();
            return
          }

          node = this$1.$refs.modal.$el.getElementsByTagName('BUTTON');
          if (node.length) {
            node[node.length - 1].focus();
          }
        },
        hide: function () {
          this$1.$emit('hide');
        },
        dismiss: function () {
          this$1.$emit('cancel');
        },
        'escape-key': function () {
          this$1.$emit('escape-key');
          this$1.$emit('cancel');
        }
      }
    }, child)
  },
  computed: {
    hasForm: function hasForm () {
      return this.prompt || this.options
    },
    okLabel: function okLabel () {
      return this.ok === true
        ? this.$q.i18n.label.ok
        : this.ok
    },
    cancelLabel: function cancelLabel () {
      return this.cancel === true
        ? this.$q.i18n.label.cancel
        : this.cancel
    },
    buttonClass: function buttonClass () {
      return this.stackButtons
        ? 'column'
        : 'row'
    },
    okProps: function okProps () {
      return Object(this.ok) === this.ok
        ? extend({
          color: this.color,
          label: this.$q.i18n.label.ok,
          noRipple: true
        }, this.ok)
        : { color: this.color, flat: true, label: this.okLabel, noRipple: true }
    },
    cancelProps: function cancelProps () {
      return Object(this.cancel) === this.cancel
        ? extend({
          color: this.color,
          label: this.$q.i18n.label.cancel,
          noRipple: true
        }, this.cancel)
        : { color: this.color, flat: true, label: this.cancelLabel, noRipple: true }
    }
  },
  methods: {
    show: function show () {
      return this.$refs.modal.show()
    },
    hide: function hide () {
      var this$1 = this;

      var data;

      return this.$refs.modal.hide().then(function () {
        if (this$1.hasForm) {
          data = clone(this$1.__getData());
        }
        return data
      })
    },
    __getPrompt: function __getPrompt (h) {
      var this$1 = this;

      return [
        h(QInput, {
          style: 'margin-bottom: 10px',
          props: {
            value: this.prompt.model,
            type: this.prompt.type || 'text',
            color: this.color,
            noPassToggle: true
          },
          on: {
            input: function (v) { this$1.prompt.model = v; },
            keyup: function (evt) {
              // if ENTER key
              if (getEventKey(evt) === 13) {
                this$1.__onOk();
              }
            }
          }
        })
      ]
    },
    __getOptions: function __getOptions (h) {
      var this$1 = this;

      return [
        h(QOptionGroup, {
          props: {
            value: this.options.model,
            type: this.options.type,
            color: this.color,
            inline: this.options.inline,
            options: this.options.items
          },
          on: {
            change: function (v) { this$1.options.model = v; }
          }
        })
      ]
    },
    __getButtons: function __getButtons (h) {
      var child = [];

      if (this.cancel) {
        child.push(h(QBtn, {
          props: this.cancelProps,
          on: { click: this.__onCancel }
        }));
      }
      if (this.ok) {
        child.push(h(QBtn, {
          props: this.okProps,
          on: { click: this.__onOk }
        }));
      }

      return h('div', {
        staticClass: 'modal-buttons',
        'class': this.buttonClass
      }, child)
    },
    __onOk: function __onOk () {
      var this$1 = this;

      return this.hide().then(function (data) {
        this$1.$emit('ok', data);
      })
    },
    __onCancel: function __onCancel () {
      var this$1 = this;

      return this.hide().then(function () {
        this$1.$emit('cancel');
      })
    },
    __getData: function __getData () {
      if (this.prompt) {
        return this.prompt.model
      }
      if (this.options) {
        return this.options.model
      }
    }
  }
}

var QTooltip = {
  name: 'QTooltip',
  mixins: [ModelToggleMixin],
  props: {
    anchor: {
      type: String,
      default: 'top middle',
      validator: positionValidator
    },
    self: {
      type: String,
      default: 'bottom middle',
      validator: positionValidator
    },
    offset: {
      type: Array,
      validator: offsetValidator
    },
    delay: {
      type: Number,
      default: 0
    },
    maxHeight: String,
    disable: Boolean
  },
  watch: {
    $route: function $route () {
      this.hide();
    }
  },
  computed: {
    anchorOrigin: function anchorOrigin () {
      return parsePosition(this.anchor)
    },
    selfOrigin: function selfOrigin () {
      return parsePosition(this.self)
    }
  },
  methods: {
    __show: function __show () {
      clearTimeout(this.timer);

      document.body.appendChild(this.$el);
      this.scrollTarget = getScrollTarget(this.anchorEl);
      this.scrollTarget.addEventListener('scroll', this.hide, listenOpts.passive);
      window.addEventListener('resize', this.__debouncedUpdatePosition, listenOpts.passive);
      if (this.$q.platform.is.mobile) {
        document.body.addEventListener('click', this.hide, true);
      }

      this.__updatePosition();
      this.showPromise && this.showPromiseResolve();
    },
    __hide: function __hide () {
      clearTimeout(this.timer);

      this.scrollTarget.removeEventListener('scroll', this.hide, listenOpts.passive);
      window.removeEventListener('resize', this.__debouncedUpdatePosition, listenOpts.passive);
      document.body.removeChild(this.$el);
      if (this.$q.platform.is.mobile) {
        document.body.removeEventListener('click', this.hide, true);
      }

      this.hidePromise && this.hidePromiseResolve();
    },
    __updatePosition: function __updatePosition () {
      setPosition({
        el: this.$el,
        animate: true,
        offset: this.offset,
        anchorEl: this.anchorEl,
        anchorOrigin: this.anchorOrigin,
        selfOrigin: this.selfOrigin,
        maxHeight: this.maxHeight
      });
    },
    __delayShow: function __delayShow () {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.show, this.delay);
    },
    __delayHide: function __delayHide () {
      clearTimeout(this.timer);
      this.hide();
    }
  },
  render: function render (h) {
    return h('span', {
      staticClass: 'q-tooltip animate-popup',
      style: this.transformCSS
    }, [
      h('div', [
        this.$slots.default
      ])
    ])
  },
  created: function created () {
    var this$1 = this;

    this.__debouncedUpdatePosition = debounce(function () {
      this$1.__updatePosition();
    }, 70);
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      /*
        The following is intentional.
        Fixes a bug in Chrome regarding offsetHeight by requiring browser
        to calculate this before removing from DOM and using it for first time.
      */
      this$1.$el.offsetHeight; // eslint-disable-line

      this$1.anchorEl = this$1.$el.parentNode;
      this$1.anchorEl.removeChild(this$1.$el);
      if (this$1.anchorEl.classList.contains('q-btn-inner')) {
        this$1.anchorEl = this$1.anchorEl.parentNode;
      }
      if (this$1.$q.platform.is.mobile) {
        this$1.anchorEl.addEventListener('click', this$1.show);
      }
      else {
        this$1.anchorEl.addEventListener('mouseenter', this$1.__delayShow);
        this$1.anchorEl.addEventListener('focus', this$1.__delayShow);
        this$1.anchorEl.addEventListener('mouseleave', this$1.__delayHide);
        this$1.anchorEl.addEventListener('blur', this$1.__delayHide);
      }

      if (this$1.value) {
        this$1.show();
      }
    });
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
    if (!this.anchorEl) {
      return
    }
    if (this.$q.platform.is.mobile) {
      this.anchorEl.removeEventListener('click', this.show);
    }
    else {
      this.anchorEl.removeEventListener('mouseenter', this.__delayShow);
      this.anchorEl.removeEventListener('focus', this.__delayShow);
      this.anchorEl.removeEventListener('mouseleave', this.__delayHide);
      this.anchorEl.removeEventListener('blur', this.__delayHide);
    }
  }
}

function run (e, btn, vm) {
  if (btn.handler) {
    btn.handler(e, vm, vm.caret);
  }
  else {
    vm.runCmd(btn.cmd, btn.param);
  }
}

function getBtn (h, vm, btn, clickHandler, active) {
  if ( active === void 0 ) active = false;

  var
    toggled = active || (btn.type === 'toggle'
      ? (btn.toggled ? btn.toggled(vm) : btn.cmd && vm.caret.is(btn.cmd, btn.param))
      : false),
    child = [],
    events = {
      click: function click (e) {
        clickHandler && clickHandler();
        run(e, btn, vm);
      }
    };

  if (btn.tip && vm.$q.platform.is.desktop) {
    var Key = btn.key
      ? h('div', [h('small', ("(CTRL + " + (String.fromCharCode(btn.key)) + ")"))])
      : null;
    child.push(h(QTooltip, { props: {delay: 1000} }, [
      h('div', { domProps: { innerHTML: btn.tip } }),
      Key
    ]));
  }

  return h(QBtn, {
    props: extend({
      icon: btn.icon,
      color: toggled ? btn.toggleColor || vm.toolbarToggleColor : btn.color || vm.toolbarColor,
      textColor: toggled && (vm.toolbarFlat || vm.toolbarOutline) ? null : btn.textColor || vm.toolbarTextColor,
      label: btn.label,
      disable: btn.disable ? (typeof btn.disable === 'function' ? btn.disable(vm) : true) : false
    }, vm.buttonProps),
    on: events
  }, child)
}

function getDropdown (h, vm, btn) {
  var
    label = btn.label,
    icon = btn.icon,
    noIcons = btn.list === 'no-icons',
    onlyIcons = btn.list === 'only-icons',
    contentClass,
    Items;

  function closeDropdown () {
    Dropdown.componentInstance.hide();
  }

  if (onlyIcons) {
    Items = btn.options.map(function (btn) {
      var active = btn.type === void 0
        ? vm.caret.is(btn.cmd, btn.param)
        : false;

      if (active) {
        label = btn.tip;
        icon = btn.icon;
      }
      return getBtn(h, vm, btn, closeDropdown, active)
    });
    contentClass = vm.toolbarBackgroundClass;
    Items = [
      h(
        QBtnGroup,
        {
          props: vm.buttonProps,
          staticClass: 'relative-position q-editor-toolbar-padding',
          style: { borderRadius: '0' }
        },
        Items
      )
    ];
  }
  else {
    Items = btn.options.map(function (btn) {
      var disable = btn.disable ? btn.disable(vm) : false;
      var active = btn.type === void 0
        ? vm.caret.is(btn.cmd, btn.param)
        : false;

      if (active) {
        label = btn.tip;
        icon = btn.icon;
      }

      var htmlTip = btn.htmlTip;

      return h(
        QItem,
        {
          props: { active: active, link: !disable },
          'class': { disabled: disable },
          nativeOn: {
            click: function click (e) {
              if (disable) { return }
              closeDropdown();
              vm.$refs.content.focus();
              vm.caret.restore();
              run(e, btn, vm);
            }
          }
        },
        [
          noIcons ? '' : h(QItemSide, {props: {icon: btn.icon}}),
          h(QItemMain, {
            props: !htmlTip && btn.tip
              ? { label: btn.tip }
              : null,
            domProps: htmlTip
              ? { innerHTML: btn.htmlTip }
              : null
          })
        ]
      )
    });
    contentClass = [vm.toolbarBackgroundClass, vm.toolbarTextColor ? ("text-" + (vm.toolbarTextColor)) : ''];
    Items = [
      h(QList, {
        props: { separator: true }
      }, [ Items ])
    ];
  }

  var highlight = btn.highlight && label !== btn.label;
  var Dropdown = h(
    QBtnDropdown,
    {
      props: extend({
        noCaps: true,
        noWrap: true,
        color: highlight ? vm.toolbarToggleColor : vm.toolbarColor,
        textColor: highlight && (vm.toolbarFlat || vm.toolbarOutline) ? null : vm.toolbarTextColor,
        label: btn.fixedLabel ? btn.label : label,
        icon: btn.fixedIcon ? btn.icon : icon,
        contentClass: contentClass
      }, vm.buttonProps)
    },
    Items
  );
  return Dropdown
}

function getToolbar (h, vm) {
  if (vm.caret) {
    return vm.buttons.map(function (group) { return h(
      QBtnGroup,
      { props: vm.buttonProps, staticClass: 'items-center relative-position' },
      group.map(function (btn) {
        if (btn.type === 'slot') {
          return vm.$slots[btn.slot]
        }

        if (btn.type === 'dropdown') {
          return getDropdown(h, vm, btn)
        }

        return getBtn(h, vm, btn)
      })
    ); })
  }
}

function getFonts (defaultFont, defaultFontLabel, defaultFontIcon, fonts) {
  if ( fonts === void 0 ) fonts = {};

  var aliases = Object.keys(fonts);
  if (aliases.length === 0) {
    return {}
  }

  var def = {
    default_font: {
      cmd: 'fontName',
      param: defaultFont,
      icon: defaultFontIcon,
      tip: defaultFontLabel
    }
  };

  aliases.forEach(function (alias) {
    var name = fonts[alias];
    def[alias] = {
      cmd: 'fontName',
      param: name,
      icon: defaultFontIcon,
      tip: name,
      htmlTip: ("<font face=\"" + name + "\">" + name + "</font>")
    };
  });

  return def
}

function getLinkEditor (h, vm) {
  if (vm.caret) {
    var color = vm.toolbarColor || vm.toolbarTextColor;
    var link = vm.editLinkUrl;
    var updateLink = function () {
      vm.caret.restore();
      if (link !== vm.editLinkUrl) {
        document.execCommand('createLink', false, link === '' ? ' ' : link);
      }
      vm.editLinkUrl = null;
    };

    return [
      h('div', { staticClass: 'q-mx-xs', 'class': ("text-" + color) }, [((vm.$q.i18n.editor.url) + ": ")]),
      h(QInput, {
        key: 'qedt_btm_input',
        staticClass: 'q-ma-none q-pa-none col q-editor-input',
        props: {
          value: link,
          color: color,
          autofocus: true,
          hideUnderline: true
        },
        on: {
          input: function (val) { link = val; },
          keydown: function (event) {
            switch (getEventKey(event)) {
              case 13: // ENTER key
                return updateLink()
              case 27: // ESCAPE key
                vm.caret.restore();
                vm.editLinkUrl = null;
                break
            }
          }
        }
      }),
      h(QBtnGroup, {
        key: 'qedt_btm_grp',
        props: vm.buttonProps
      }, [
        h(QBtn, {
          key: 'qedt_btm_rem',
          attrs: {
            tabindex: -1
          },
          props: extend({
            label: vm.$q.i18n.label.remove,
            noCaps: true
          }, vm.buttonProps),
          on: {
            click: function () {
              vm.caret.restore();
              document.execCommand('unlink');
              vm.editLinkUrl = null;
            }
          }
        }),
        h(QBtn, {
          key: 'qedt_btm_upd',
          props: extend({
            label: vm.$q.i18n.label.update,
            noCaps: true
          }, vm.buttonProps),
          on: {
            click: updateLink
          }
        })
      ])
    ]
  }
}

function getBlockElement (el, parent) {
  if (parent && el === parent) {
    return null
  }

  var
    style = window.getComputedStyle
      ? window.getComputedStyle(el)
      : el.currentStyle,
    display = style.display;

  if (display === 'block' || display === 'table') {
    return el
  }

  return getBlockElement(el.parentNode)
}

function isChildOf (el, parent) {
  if (!el) {
    return false
  }
  while ((el = el.parentNode)) {
    if (el === document.body) {
      return false
    }
    if (el === parent) {
      return true
    }
  }
  return false
}

var urlRegex = /^https?:\/\//;

var Caret = function Caret (el, vm) {
  this.el = el;
  this.vm = vm;
};

var prototypeAccessors = { selection: { configurable: true },hasSelection: { configurable: true },range: { configurable: true },parent: { configurable: true },blockParent: { configurable: true } };

prototypeAccessors.selection.get = function () {
  if (!this.el) {
    return
  }
  var sel = document.getSelection();
  // only when the selection in element
  if (isChildOf(sel.anchorNode, this.el) && isChildOf(sel.focusNode, this.el)) {
    return sel
  }
};

prototypeAccessors.hasSelection.get = function () {
  return this.selection
    ? this.selection.toString().length > 0
    : null
};

prototypeAccessors.range.get = function () {
  var sel = this.selection;

  if (!sel) {
    return
  }

  return sel.rangeCount
    ? sel.getRangeAt(0)
    : null
};

prototypeAccessors.parent.get = function () {
  var range = this.range;
  if (!range) {
    return
  }

  var node = range.startContainer;
  return node.nodeType === document.ELEMENT_NODE
    ? node
    : node.parentNode
};

prototypeAccessors.blockParent.get = function () {
  var parent = this.parent;
  if (!parent) {
    return
  }
  return getBlockElement(parent, this.el)
};

Caret.prototype.save = function save (range) {
    if ( range === void 0 ) range = this.range;

  this._range = range;
};

Caret.prototype.restore = function restore (range) {
    if ( range === void 0 ) range = this._range;

  var
    r = document.createRange(),
    sel = document.getSelection();

  if (range) {
    r.setStart(range.startContainer, range.startOffset);
    r.setEnd(range.endContainer, range.endOffset);
    sel.removeAllRanges();
    sel.addRange(r);
  }
  else {
    sel.selectAllChildren(this.el);
    sel.collapseToEnd();
  }
};

Caret.prototype.hasParent = function hasParent (name, spanLevel) {
  var el = spanLevel
    ? this.parent
    : this.blockParent;

  return el
    ? el.nodeName.toLowerCase() === name.toLowerCase()
    : false
};

Caret.prototype.hasParents = function hasParents (list) {
  var el = this.parent;
  return el
    ? list.includes(el.nodeName.toLowerCase())
    : false
};

Caret.prototype.is = function is (cmd, param) {
  switch (cmd) {
    case 'formatBlock':
      if (param === 'DIV' && this.parent === this.el) {
        return true
      }
      return this.hasParent(param, param === 'PRE')
    case 'link':
      return this.hasParent('A', true)
    case 'fontSize':
      return document.queryCommandValue(cmd) === param
    case 'fontName':
      var res = document.queryCommandValue(cmd);
      return res === ("\"" + param + "\"") || res === param
    case 'fullscreen':
      return this.vm.inFullscreen
    case void 0:
      return false
    default:
      var state = document.queryCommandState(cmd);
      return param ? state === param : state
  }
};

Caret.prototype.getParentAttribute = function getParentAttribute (attrib) {
  if (this.parent) {
    return this.parent.getAttribute(attrib)
  }
};

Caret.prototype.can = function can (name) {
  if (name === 'outdent') {
    return this.hasParents(['blockquote', 'li'])
  }
  if (name === 'indent') {
    var parentName = this.parent ? this.parent.nodeName.toLowerCase() : false;
    if (parentName === 'blockquote') {
      return false
    }
    if (parentName === 'li') {
      var previousEl = this.parent.previousSibling;
      return previousEl && previousEl.nodeName.toLowerCase() === 'li'
    }
    return false
  }
};

Caret.prototype.apply = function apply (cmd, param, done) {
    if ( done === void 0 ) done = function () {};

  if (cmd === 'formatBlock') {
    if (['BLOCKQUOTE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'PRE'].includes(param) && this.is(cmd, param)) {
      cmd = 'outdent';
      param = null;
    }
  }
  else if (cmd === 'print') {
    done();
    var win = window.open();
    win.document.write(("\n        <!doctype html>\n        <html>\n          <head>\n            <title>Print - " + (document.title) + "</title>\n          </head>\n          <body>\n            <div>" + (this.el.innerHTML) + "</div>\n          </body>\n        </html>\n      "));
    win.print();
    win.close();
    return
  }
  else if (cmd === 'link') {
    var link = this.getParentAttribute('href');
    if (!link) {
      var selection = this.selectWord(this.selection);
      var url = selection ? selection.toString() : '';
      if (!url.length) {
        return
      }
      this.vm.editLinkUrl = urlRegex.test(url) ? url : ("https://" + url);
      document.execCommand('createLink', false, this.vm.editLinkUrl);
    }
    else {
      this.vm.editLinkUrl = link;
    }
    this.range.selectNodeContents(this.parent);
    this.save();
    return
  }
  else if (cmd === 'fullscreen') {
    this.vm.toggleFullscreen();
    done();
    return
  }

  document.execCommand(cmd, false, param);
  done();
};

Caret.prototype.selectWord = function selectWord (sel) {
  if (!sel.isCollapsed) {
    return sel
  }

  // Detect if selection is backwards
  var range = document.createRange();
  range.setStart(sel.anchorNode, sel.anchorOffset);
  range.setEnd(sel.focusNode, sel.focusOffset);
  var direction = range.collapsed ? ['backward', 'forward'] : ['forward', 'backward'];
  range.detach();

  // modify() works on the focus of the selection
  var
    endNode = sel.focusNode,
    endOffset = sel.focusOffset;
  sel.collapse(sel.anchorNode, sel.anchorOffset);
  sel.modify('move', direction[0], 'character');
  sel.modify('move', direction[1], 'word');
  sel.extend(endNode, endOffset);
  sel.modify('extend', direction[1], 'character');
  sel.modify('extend', direction[0], 'word');

  return sel
};

Object.defineProperties( Caret.prototype, prototypeAccessors );

var QEditor = {
  name: 'QEditor',
  mixins: [FullscreenMixin],
  props: {
    value: {
      type: String,
      required: true
    },
    readonly: Boolean,
    disable: Boolean,
    minHeight: {
      type: String,
      default: '10rem'
    },
    maxHeight: String,
    height: String,
    definitions: Object,
    fonts: Object,
    toolbar: {
      type: Array,
      validator: function (v) { return v.length === 0 || v.every(function (group) { return group.length; }); },
      default: function default$1 () {
        return [
          ['left', 'center', 'right', 'justify'],
          ['bold', 'italic', 'underline', 'strike'],
          ['undo', 'redo']
        ]
      }
    },
    toolbarColor: String,
    toolbarTextColor: String,
    toolbarToggleColor: {
      type: String,
      default: 'primary'
    },
    toolbarBg: {
      type: String,
      default: 'grey-3'
    },
    toolbarFlat: Boolean,
    toolbarOutline: Boolean,
    toolbarPush: Boolean,
    toolbarRounded: Boolean,
    contentStyle: Object,
    contentClass: [Object, Array, String]
  },
  computed: {
    editable: function editable () {
      return !this.readonly && !this.disable
    },
    hasToolbar: function hasToolbar () {
      return this.toolbar && this.toolbar.length > 0
    },
    toolbarBackgroundClass: function toolbarBackgroundClass () {
      if (this.toolbarBg) {
        return ("bg-" + (this.toolbarBg))
      }
    },
    buttonProps: function buttonProps () {
      return {
        outline: this.toolbarOutline,
        flat: this.toolbarFlat,
        push: this.toolbarPush,
        rounded: this.toolbarRounded,
        dense: true,
        color: this.toolbarColor,
        disable: !this.editable
      }
    },
    buttonDef: function buttonDef () {
      var
        e = this.$q.i18n.editor,
        i = this.$q.icon.editor;

      return {
        bold: {cmd: 'bold', icon: i.bold, tip: e.bold, key: 66},
        italic: {cmd: 'italic', icon: i.italic, tip: e.italic, key: 73},
        strike: {cmd: 'strikeThrough', icon: i.strikethrough, tip: e.strikethrough, key: 83},
        underline: {cmd: 'underline', icon: i.underline, tip: e.underline, key: 85},
        unordered: {cmd: 'insertUnorderedList', icon: i.unorderedList, tip: e.unorderedList},
        ordered: {cmd: 'insertOrderedList', icon: i.orderedList, tip: e.orderedList},
        subscript: {cmd: 'subscript', icon: i.subscript, tip: e.subscript, htmlTip: 'x<subscript>2</subscript>'},
        superscript: {cmd: 'superscript', icon: i.superscript, tip: e.superscript, htmlTip: 'x<superscript>2</superscript>'},
        link: {cmd: 'link', icon: i.hyperlink, tip: e.hyperlink, key: 76},
        fullscreen: {cmd: 'fullscreen', icon: i.toggleFullscreen, tip: e.toggleFullscreen, key: 70},

        quote: {cmd: 'formatBlock', param: 'BLOCKQUOTE', icon: i.quote, tip: e.quote, key: 81},
        left: {cmd: 'justifyLeft', icon: i.left, tip: e.left},
        center: {cmd: 'justifyCenter', icon: i.center, tip: e.center},
        right: {cmd: 'justifyRight', icon: i.right, tip: e.right},
        justify: {cmd: 'justifyFull', icon: i.justify, tip: e.justify},

        print: {type: 'no-state', cmd: 'print', icon: i.print, tip: e.print, key: 80},
        outdent: {type: 'no-state', disable: function (vm) { return vm.caret && !vm.caret.can('outdent'); }, cmd: 'outdent', icon: i.outdent, tip: e.outdent},
        indent: {type: 'no-state', disable: function (vm) { return vm.caret && !vm.caret.can('indent'); }, cmd: 'indent', icon: i.indent, tip: e.indent},
        removeFormat: {type: 'no-state', cmd: 'removeFormat', icon: i.removeFormat, tip: e.removeFormat},
        hr: {type: 'no-state', cmd: 'insertHorizontalRule', icon: i.hr, tip: e.hr},
        undo: {type: 'no-state', cmd: 'undo', icon: i.undo, tip: e.undo, key: 90},
        redo: {type: 'no-state', cmd: 'redo', icon: i.redo, tip: e.redo, key: 89},

        h1: {cmd: 'formatBlock', param: 'H1', icon: i.header, tip: e.header1, htmlTip: ("<h1 class=\"q-ma-none\">" + (e.header1) + "</h1>")},
        h2: {cmd: 'formatBlock', param: 'H2', icon: i.header, tip: e.header2, htmlTip: ("<h2 class=\"q-ma-none\">" + (e.header2) + "</h2>")},
        h3: {cmd: 'formatBlock', param: 'H3', icon: i.header, tip: e.header3, htmlTip: ("<h3 class=\"q-ma-none\">" + (e.header3) + "</h3>")},
        h4: {cmd: 'formatBlock', param: 'H4', icon: i.header, tip: e.header4, htmlTip: ("<h4 class=\"q-ma-none\">" + (e.header4) + "</h4>")},
        h5: {cmd: 'formatBlock', param: 'H5', icon: i.header, tip: e.header5, htmlTip: ("<h5 class=\"q-ma-none\">" + (e.header5) + "</h5>")},
        h6: {cmd: 'formatBlock', param: 'H6', icon: i.header, tip: e.header6, htmlTip: ("<h6 class=\"q-ma-none\">" + (e.header6) + "</h6>")},
        p: {cmd: 'formatBlock', param: 'DIV', icon: i.header, tip: e.paragraph},
        code: {cmd: 'formatBlock', param: 'PRE', icon: i.code, tip: ("<code>" + (e.code) + "</code>")},

        'size-1': {cmd: 'fontSize', param: '1', icon: i.size, tip: e.size1, htmlTip: ("<font size=\"1\">" + (e.size1) + "</font>")},
        'size-2': {cmd: 'fontSize', param: '2', icon: i.size, tip: e.size2, htmlTip: ("<font size=\"2\">" + (e.size2) + "</font>")},
        'size-3': {cmd: 'fontSize', param: '3', icon: i.size, tip: e.size3, htmlTip: ("<font size=\"3\">" + (e.size3) + "</font>")},
        'size-4': {cmd: 'fontSize', param: '4', icon: i.size, tip: e.size4, htmlTip: ("<font size=\"4\">" + (e.size4) + "</font>")},
        'size-5': {cmd: 'fontSize', param: '5', icon: i.size, tip: e.size5, htmlTip: ("<font size=\"5\">" + (e.size5) + "</font>")},
        'size-6': {cmd: 'fontSize', param: '6', icon: i.size, tip: e.size6, htmlTip: ("<font size=\"6\">" + (e.size6) + "</font>")},
        'size-7': {cmd: 'fontSize', param: '7', icon: i.size, tip: e.size7, htmlTip: ("<font size=\"7\">" + (e.size7) + "</font>")}
      }
    },
    buttons: function buttons () {
      var this$1 = this;

      var userDef = this.definitions || {};
      var def = this.definitions || this.fonts
        ? extend(
          true,
          {},
          this.buttonDef,
          userDef,
          getFonts(
            this.defaultFont,
            this.$q.i18n.editor.defaultFont,
            this.$q.icon.editor.font,
            this.fonts
          )
        )
        : this.buttonDef;

      return this.toolbar.map(
        function (group) { return group.map(function (token) {
          if (token.options) {
            return {
              type: 'dropdown',
              icon: token.icon,
              label: token.label,
              fixedLabel: token.fixedLabel,
              fixedIcon: token.fixedIcon,
              highlight: token.highlight,
              list: token.list,
              options: token.options.map(function (item) { return def[item]; })
            }
          }

          var obj = def[token];

          if (obj) {
            return obj.type === 'no-state' || (userDef[token] && (
              obj.cmd === void 0 || (this$1.buttonDef[obj.cmd] && this$1.buttonDef[obj.cmd].type === 'no-state')
            ))
              ? obj
              : extend(true, { type: 'toggle' }, obj)
          }
          else {
            return {
              type: 'slot',
              slot: token
            }
          }
        }); }
      )
    },
    keys: function keys () {
      var
        k = {},
        add = function (btn) {
          if (btn.key) {
            k[btn.key] = {
              cmd: btn.cmd,
              param: btn.param
            };
          }
        };

      this.buttons.forEach(function (group) {
        group.forEach(function (token) {
          if (token.options) {
            token.options.forEach(add);
          }
          else {
            add(token);
          }
        });
      });
      return k
    },
    innerStyle: function innerStyle () {
      return this.inFullscreen
        ? this.contentStyle
        : [
          {
            minHeight: this.minHeight,
            height: this.height,
            maxHeight: this.maxHeight
          },
          this.contentStyle
        ]
    },
    innerClass: function innerClass () {
      return [
        this.contentClass,
        { col: this.inFullscreen, 'overflow-auto': this.inFullscreen || this.maxHeight }
      ]
    }
  },
  data: function data () {
    return {
      editWatcher: true,
      editLinkUrl: null
    }
  },
  watch: {
    value: function value (v) {
      if (this.editWatcher) {
        this.$refs.content.innerHTML = v;
      }
      else {
        this.editWatcher = true;
      }
    }
  },
  methods: {
    onInput: function onInput (e) {
      if (this.editWatcher) {
        var val = this.$refs.content.innerHTML;
        if (val !== this.value) {
          this.editWatcher = false;
          this.$emit('input', val);
        }
      }
    },
    onKeydown: function onKeydown (e) {
      var key = getEventKey(e);

      if (!e.ctrlKey) {
        this.refreshToolbar();
        this.$q.platform.is.ie && this.$nextTick(this.onInput);
        return
      }

      var target = this.keys[key];
      if (target !== void 0) {
        var cmd = target.cmd;
        var param = target.param;
        stopAndPrevent(e);
        this.runCmd(cmd, param, false);
        this.$q.platform.is.ie && this.$nextTick(this.onInput);
      }
    },
    runCmd: function runCmd (cmd, param, update) {
      var this$1 = this;
      if ( update === void 0 ) update = true;

      this.focus();
      this.caret.apply(cmd, param, function () {
        this$1.focus();
        if (update) {
          this$1.refreshToolbar();
        }
      });
    },
    refreshToolbar: function refreshToolbar () {
      var this$1 = this;

      setTimeout(function () {
        this$1.editLinkUrl = null;
        this$1.$forceUpdate();
      }, 1);
    },
    focus: function focus () {
      this.$refs.content.focus();
    },
    getContentEl: function getContentEl () {
      return this.$refs.content
    }
  },
  created: function created () {
    document.execCommand('defaultParagraphSeparator', false, 'div');
    this.defaultFont = window.getComputedStyle(document.body).fontFamily;
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.caret = new Caret(this$1.$refs.content, this$1);
      this$1.$refs.content.innerHTML = this$1.value;
      this$1.$nextTick(this$1.refreshToolbar);
    });
  },
  render: function render (h) {
    var this$1 = this;

    var toolbars;
    if (this.hasToolbar) {
      var toolbarConfig = {
        staticClass: "q-editor-toolbar row no-wrap scroll",
        'class': [
          { 'q-editor-toolbar-separator': !this.toolbarOutline && !this.toolbarPush },
          this.toolbarBackgroundClass
        ]
      };
      toolbars = [];
      toolbars.push(h('div', extend({key: 'qedt_top'}, toolbarConfig), [
        h('div', { staticClass: 'row no-wrap q-editor-toolbar-padding fit items-center' }, getToolbar(h, this))
      ]));
      if (this.editLinkUrl !== null) {
        toolbars.push(h('div', extend({key: 'qedt_btm'}, toolbarConfig), [
          h('div', { staticClass: 'row no-wrap q-editor-toolbar-padding fit items-center' }, getLinkEditor(h, this))
        ]));
      }
      toolbars = h('div', toolbars);
    }

    return h(
      'div',
      {
        staticClass: 'q-editor',
        style: {
          height: this.inFullscreen ? '100vh' : null
        },
        'class': {
          disabled: this.disable,
          fullscreen: this.inFullscreen,
          column: this.inFullscreen
        }
      },
      [
        toolbars,
        h(
          'div',
          {
            ref: 'content',
            staticClass: "q-editor-content",
            style: this.innerStyle,
            class: this.innerClass,
            attrs: { contenteditable: this.editable },
            on: {
              input: this.onInput,
              keydown: this.onKeydown,
              click: this.refreshToolbar,
              blur: function () {
                this$1.caret.save();
              }
            }
          }
        )
      ]
    )
  }
}

var FabMixin = {
  props: {
    outline: Boolean,
    push: Boolean,
    flat: Boolean,
    color: String,
    textColor: String,
    glossy: Boolean
  }
}

var QFab = {
  name: 'QFab',
  mixins: [FabMixin, ModelToggleMixin],
  provide: function provide () {
    return {
      __qFabClose: this.hide
    }
  },
  props: {
    icon: String,
    activeIcon: String,
    direction: {
      type: String,
      default: 'right'
    }
  },
  watch: {
    $route: function $route () {
      this.hide();
    }
  },
  created: function created () {
    if (this.value) {
      this.show();
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-fab z-fab row inline justify-center',
      'class': {
        'q-fab-opened': this.showing
      }
    }, [
      h(QBtn, {
        props: {
          fab: true,
          outline: this.outline,
          push: this.push,
          flat: this.flat,
          color: this.color,
          textColor: this.textColor,
          glossy: this.glossy
        },
        on: {
          click: this.toggle
        }
      }, [
        this.$slots.tooltip,
        h(QIcon, {
          staticClass: 'q-fab-icon absolute-full',
          props: { name: this.icon || this.$q.icon.fab.icon }
        }),
        h(QIcon, {
          staticClass: 'q-fab-active-icon absolute-full',
          props: { name: this.activeIcon || this.$q.icon.fab.activeIcon }
        })
      ]),

      h('div', {
        staticClass: 'q-fab-actions flex no-wrap inline items-center',
        'class': ("q-fab-" + (this.direction))
      }, [
        this.$slots.default
      ])
    ])
  }
}

var QFabAction = {
  name: 'QFabAction',
  mixins: [FabMixin],
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  inject: {
    __qFabClose: {
      default: function default$1 () {
        console.error('QFabAction needs to be child of QFab');
      }
    }
  },
  methods: {
    click: function click (e) {
      var this$1 = this;

      this.__qFabClose().then(function () {
        this$1.$emit('click', e);
      });
    }
  },
  render: function render (h) {
    return h(QBtn, {
      props: {
        fabMini: true,
        outline: this.outline,
        push: this.push,
        flat: this.flat,
        color: this.color,
        textColor: this.textColor,
        glossy: this.glossy,
        icon: this.icon
      },
      on: {
        click: this.click
      }
    }, [
      this.$slots.default
    ])
  }
}

var QField = {
  name: 'QField',
  props: {
    inset: {
      type: String,
      validator: function (v) { return ['icon', 'label', 'full'].includes(v); }
    },
    label: String,
    count: {
      type: [Number, Boolean],
      default: false
    },
    error: Boolean,
    errorLabel: String,
    warning: Boolean,
    warningLabel: String,
    helper: String,
    icon: String,
    iconColor: String,
    dark: Boolean,
    orientation: {
      type: String,
      validator: function (v) { return ['vertical', 'horizontal'].includes(v); }
    },
    labelWidth: {
      type: [Number, String],
      default: 5,
      validator: function validator (val) {
        var v = parseInt(val, 10);
        return v > 0 && v < 13
      }
    }
  },
  data: function data () {
    return {
      input: {}
    }
  },
  computed: {
    hasError: function hasError () {
      return this.input.error || this.error
    },
    hasWarning: function hasWarning () {
      return !this.hasError && (this.input.warning || this.warning)
    },
    childHasLabel: function childHasLabel () {
      return this.input.floatLabel || this.input.stackLabel
    },
    isDark: function isDark () {
      return this.input.dark || this.dark
    },
    insetIcon: function insetIcon () {
      return ['icon', 'full'].includes(this.inset)
    },
    hasNoInput: function hasNoInput () {
      return !this.input.$options || this.input.__needsBorder
    },
    counter: function counter () {
      if (this.count) {
        var length = this.input.length || '0';
        return Number.isInteger(this.count)
          ? (length + " / " + (this.count))
          : length
      }
    },
    classes: function classes () {
      return {
        'q-field-responsive': !this.isVertical && !this.isHorizontal,
        'q-field-vertical': this.isVertical,
        'q-field-horizontal': this.isHorizontal,
        'q-field-floating': this.childHasLabel,
        'q-field-no-label': !this.label && !this.$slots.label,
        'q-field-with-error': this.hasError,
        'q-field-with-warning': this.hasWarning,
        'q-field-dark': this.isDark
      }
    },
    computedLabelWidth: function computedLabelWidth () {
      return parseInt(this.labelWidth, 10)
    },
    isVertical: function isVertical () {
      return this.orientation === 'vertical' || this.computedLabelWidth === 12
    },
    isHorizontal: function isHorizontal () {
      return this.orientation === 'horizontal'
    },
    labelClasses: function labelClasses () {
      return this.isVertical
        ? "col-12"
        : (this.isHorizontal ? ("col-" + (this.labelWidth)) : ("col-xs-12 col-sm-" + (this.labelWidth)))
    },
    inputClasses: function inputClasses () {
      return this.isVertical
        ? "col-xs-12"
        : (this.isHorizontal ? 'col' : 'col-xs-12 col-sm')
    },
    iconProps: function iconProps () {
      var prop = { name: this.icon };
      if (this.iconColor && !this.hasError && !this.hasWarning) {
        prop.color = this.iconColor;
      }
      return prop
    },
    insetHasLabel: function insetHasLabel () {
      return ['label', 'full'].includes(this.inset)
    }
  },
  provide: function provide () {
    return {
      __field: this
    }
  },
  methods: {
    __registerInput: function __registerInput (vm) {
      this.input = vm;
    },
    __unregisterInput: function __unregisterInput (vm) {
      if (!vm || vm === this.input) {
        this.input = {};
      }
    },
    __getBottomContent: function __getBottomContent (h) {
      var label;

      if (this.hasError && (label = this.$slots['error-label'] || this.errorLabel)) {
        return h('div', { staticClass: 'q-field-error col' }, label)
      }
      if (this.hasWarning && (label = this.$slots['warning-label'] || this.warningLabel)) {
        return h('div', { staticClass: 'q-field-warning col' }, label)
      }
      if ((label = this.$slots.helper || this.helper)) {
        return h('div', { staticClass: 'q-field-helper col' }, label)
      }
      return h('div', { staticClass: 'col' })
    },
    __hasBottom: function __hasBottom () {
      return (this.hasError && (this.$slots['error-label'] || this.errorLabel)) ||
        (this.hasWarning && (this.$slots['warning-label'] || this.warningLabel)) ||
        (this.$slots.helper || this.helper) ||
        this.count
    }
  },
  render: function render (h) {
    var label = this.$slots.label || this.label;

    return h('div', {
      staticClass: 'q-field row no-wrap items-start',
      'class': this.classes
    }, [
      this.icon
        ? h(QIcon, {
          props: this.iconProps,
          staticClass: 'q-field-icon q-field-margin'
        })
        : (this.insetIcon ? h('div', { staticClass: 'q-field-icon' }) : null),

      h('div', { staticClass: 'row col' }, [
        label || this.insetHasLabel
          ? h('div', {
            staticClass: 'q-field-label q-field-margin',
            'class': this.labelClasses
          }, [
            h('div', { staticClass: 'q-field-label-inner row items-center' }, [
              this.$slots.label || this.label
            ])
          ])
          : null,

        h('div', {
          staticClass: 'q-field-content',
          'class': this.inputClasses
        }, [
          this.$slots.default,
          this.__hasBottom()
            ? h('div', {
              staticClass: 'q-field-bottom row no-wrap',
              'class': { 'q-field-no-input': this.hasNoInput }
            }, [
              this.__getBottomContent(h),
              this.counter
                ? h('div', { staticClass: 'q-field-counter col-auto' }, [ this.counter ])
                : null
            ])
            : null
        ])
      ])
    ])
  }
}

var QInfiniteScroll = {
  name: 'QInfiniteScroll',
  props: {
    handler: {
      type: Function,
      required: true
    },
    inline: Boolean,
    offset: {
      type: Number,
      default: 0
    }
  },
  data: function data () {
    return {
      index: 0,
      fetching: false,
      working: true
    }
  },
  methods: {
    poll: function poll () {
      if (this.fetching || !this.working) {
        return
      }

      var
        containerHeight = height(this.scrollContainer),
        containerBottom = offset(this.scrollContainer).top + containerHeight,
        triggerPosition = offset(this.element).top + height(this.element) - (this.offset || containerHeight);

      if (triggerPosition < containerBottom) {
        this.loadMore();
      }
    },
    loadMore: function loadMore () {
      var this$1 = this;

      if (this.fetching || !this.working) {
        return
      }

      this.index++;
      this.fetching = true;
      this.handler(this.index, function (stopLoading) {
        this$1.fetching = false;
        if (stopLoading) {
          this$1.stop();
          return
        }
        if (this$1.element.closest('body')) {
          this$1.poll();
        }
      });
    },
    reset: function reset () {
      this.index = 0;
    },
    resume: function resume () {
      this.working = true;
      this.scrollContainer.addEventListener('scroll', this.poll, listenOpts.passive);
      this.poll();
    },
    stop: function stop () {
      this.working = false;
      this.scrollContainer.removeEventListener('scroll', this.poll, listenOpts.passive);
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.element = this$1.$refs.content;

      this$1.scrollContainer = this$1.inline ? this$1.$el : getScrollTarget(this$1.$el);
      if (this$1.working) {
        this$1.scrollContainer.addEventListener('scroll', this$1.poll, listenOpts.passive);
      }

      this$1.poll();
      this$1.poll = debounce(this$1.poll, 50);
    });
  },
  beforeDestroy: function beforeDestroy () {
    this.scrollContainer.removeEventListener('scroll', this.poll, listenOpts.passive);
  },
  render: function render (h) {
    return h('div', { staticClass: 'q-infinite-scroll' }, [
      h('div', {
        ref: 'content',
        staticClass: 'q-infinite-scroll-content'
      }, [ this.$slots.default ]),
      h('div', {
        staticClass: 'q-infinite-scroll-message',
        directives: [{
          name: 'show',
          value: this.fetching
        }]
      }, [
        this.$slots.message
      ])
    ])
  }
}

var QInnerLoading = {
  name: 'QInnerLoading',
  props: {
    dark: Boolean,
    visible: Boolean,
    size: {
      type: [String, Number],
      default: 42
    },
    color: String
  },
  render: function render (h) {
    if (!this.visible) {
      return
    }

    return h('div', {
      staticClass: 'q-inner-loading animate-fade absolute-full column flex-center',
      'class': { dark: this.dark }
    }, [
      this.$slots.default ||
      h(QSpinner, {
        props: {
          size: this.size,
          color: this.color
        }
      })
    ])
  }
}

var QKnob = {
  name: 'QKnob',
  directives: {
    TouchPan: TouchPan
  },
  props: {
    value: Number,
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    color: String,
    trackColor: {
      type: String,
      default: 'grey-3'
    },
    lineWidth: {
      type: String,
      default: '6px'
    },
    size: {
      type: String,
      default: '100px'
    },
    step: {
      type: Number,
      default: 1
    },
    decimals: Number,
    disable: Boolean,
    readonly: Boolean
  },
  computed: {
    classes: function classes () {
      var cls = [];
      if (this.disable) {
        cls.push('disabled');
      }
      if (!this.readonly) {
        cls.push('cursor-pointer');
      }
      if (this.color) {
        cls.push(("text-" + (this.color)));
      }
      return cls
    },
    svgStyle: function svgStyle () {
      var dir = this.$q.i18n.rtl ? -1 : 1;
      return {
        'stroke-dasharray': '295.31px, 295.31px',
        'stroke-dashoffset': (295.31 * dir * (1.0 - (this.model - this.min) / (this.max - this.min))) + 'px',
        'transition': this.dragging ? '' : 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    },
    editable: function editable () {
      return !this.disable && !this.readonly
    },
    computedDecimals: function computedDecimals () {
      return this.decimals !== void 0 ? this.decimals || 0 : (String(this.step).trim('0').split('.')[1] || '').length
    }
  },
  data: function data () {
    return {
      model: this.value,
      dragging: false
    }
  },
  watch: {
    value: function value (value$1) {
      var this$1 = this;

      if (value$1 < this.min) {
        this.model = this.min;
      }
      else if (value$1 > this.max) {
        this.model = this.max;
      }
      else {
        var newVal = this.computedDecimals && typeof value$1 === 'number'
          ? parseFloat(value$1.toFixed(this.computedDecimals))
          : value$1;
        if (newVal !== this.model) {
          this.model = newVal;
        }
        return
      }

      this.$emit('input', this.model);
      this.$nextTick(function () {
        if (this$1.model !== this$1.value) {
          this$1.$emit('change', this$1.model);
        }
      });
    }
  },
  methods: {
    __pan: function __pan (event) {
      if (!this.editable) {
        return
      }
      if (event.isFinal) {
        this.__dragStop(event.evt);
      }
      else if (event.isFirst) {
        this.__dragStart(event.evt);
      }
      else {
        this.__dragMove(event.evt);
      }
    },
    __dragStart: function __dragStart (ev) {
      if (!this.editable) {
        return
      }
      stopAndPrevent(ev);
      this.centerPosition = this.__getCenter();
      clearTimeout(this.timer);
      this.dragging = true;
      this.__onInput(ev);
    },
    __dragMove: function __dragMove (ev) {
      if (!this.dragging || !this.editable) {
        return
      }
      stopAndPrevent(ev);
      this.__onInput(ev, this.centerPosition);
    },
    __dragStop: function __dragStop (ev) {
      var this$1 = this;

      if (!this.editable) {
        return
      }
      stopAndPrevent(ev);
      this.timer = setTimeout(function () {
        this$1.dragging = false;
      }, 100);
      this.__onInput(ev, this.centerPosition, true);
    },
    __onInput: function __onInput (ev, center, emitChange) {
      var this$1 = this;
      if ( center === void 0 ) center = this.__getCenter();

      if (!this.editable) {
        return
      }
      var
        pos = position(ev),
        height$$1 = Math.abs(pos.top - center.top),
        distance = Math.sqrt(
          Math.pow(Math.abs(pos.top - center.top), 2) +
          Math.pow(Math.abs(pos.left - center.left), 2)
        ),
        angle = Math.asin(height$$1 / distance) * (180 / Math.PI);

      if (pos.top < center.top) {
        angle = center.left < pos.left ? 90 - angle : 270 + angle;
      }
      else {
        angle = center.left < pos.left ? angle + 90 : 270 - angle;
      }

      if (this.$q.i18n.rtl) {
        angle = 360 - angle;
      }

      var
        model = this.min + (angle / 360) * (this.max - this.min),
        modulo = model % this.step;

      var value = between(
        model - modulo + (Math.abs(modulo) >= this.step / 2 ? (modulo < 0 ? -1 : 1) * this.step : 0),
        this.min,
        this.max
      );

      if (this.computedDecimals) {
        value = parseFloat(value.toFixed(this.computedDecimals));
      }

      if (this.model !== value) {
        this.model = value;
      }

      this.$emit('drag-value', value);

      if (this.value === value) {
        return
      }

      this.$emit('input', value);
      if (emitChange) {
        this.$nextTick(function () {
          if (JSON.stringify(value) !== JSON.stringify(this$1.value)) {
            this$1.$emit('change', value);
          }
        });
      }
    },
    __getCenter: function __getCenter () {
      var knobOffset = offset(this.$el);
      return {
        top: knobOffset.top + height(this.$el) / 2,
        left: knobOffset.left + width(this.$el) / 2
      }
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h('div', {
      staticClass: 'q-knob non-selectable',
      'class': this.classes,
      style: {
        width: this.size,
        height: this.size
      }
    }, [
      h('div', {
        on: {
          click: function (e) { return !this$1.dragging && this$1.__onInput(e, void 0, true); }
        },
        directives: this.editable
          ? [{
            name: 'touch-pan',
            modifiers: {
              prevent: true,
              stop: true
            },
            value: this.__pan
          }]
          : null
      }, [
        h('svg', { attrs: { viewBox: '0 0 100 100' } }, [
          h('path', {
            attrs: {
              d: 'M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94',
              'fill-opacity': '0',
              stroke: 'currentColor',
              'stroke-width': this.lineWidth
            },
            'class': ("text-" + (this.trackColor))
          }),
          h('path', {
            attrs: {
              d: 'M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94',
              'fill-opacity': '0',
              stroke: 'currentColor',
              'stroke-linecap': 'round',
              'stroke-width': this.lineWidth
            },
            style: this.svgStyle
          })
        ]),

        h('div', {
          staticClass: 'q-knob-label row flex-center content-center'
        }, [
          this.$slots.default
            ? this.$slots.default
            : h('span', [ this.model ])
        ])
      ])
    ])
  }
}

var QLayout = {
  name: 'QLayout',
  provide: function provide () {
    return {
      layout: this
    }
  },
  props: {
    view: {
      type: String,
      default: 'hhh lpr fff',
      validator: function (v) { return /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase()); }
    }
  },
  data: function data () {
    return {
      height: window.innerHeight,
      width: window.innerWidth,

      header: {
        size: 0,
        offset: 0,
        space: false
      },
      right: {
        size: 300,
        offset: 0,
        space: false
      },
      footer: {
        size: 0,
        offset: 0,
        space: false
      },
      left: {
        size: 300,
        offset: 0,
        space: false
      },

      scrollHeight: 0,
      scroll: {
        position: 0,
        direction: 'down'
      }
    }
  },
  computed: {
    rows: function rows () {
      var rows = this.view.toLowerCase().split(' ');
      return {
        top: rows[0].split(''),
        middle: rows[1].split(''),
        bottom: rows[2].split('')
      }
    }
  },
  created: function created () {
    this.instances = {
      header: null,
      right: null,
      footer: null,
      left: null
    };
  },
  render: function render (h) {
    return h('div', { staticClass: 'q-layout' }, [
      h(QScrollObservable, {
        on: { scroll: this.__onPageScroll }
      }),
      h(QResizeObservable, {
        on: { resize: this.__onLayoutResize }
      }),
      h(QWindowResizeObservable, {
        on: { resize: this.__onWindowResize }
      }),
      this.$slots.default
    ])
  },
  methods: {
    __animate: function __animate () {
      var this$1 = this;

      if (this.timer) {
        clearTimeout(this.timer);
      }
      else {
        document.body.classList.add('q-layout-animate');
      }
      this.timer = setTimeout(function () {
        document.body.classList.remove('q-layout-animate');
        this$1.timer = null;
      }, 150);
    },
    __onPageScroll: function __onPageScroll (data) {
      this.scroll = data;
      this.$emit('scroll', data);
    },
    __onLayoutResize: function __onLayoutResize () {
      this.scrollHeight = this.$el.scrollHeight;
      this.$emit('scrollHeight', this.scrollHeight);
    },
    __onWindowResize: function __onWindowResize (ref) {
      var height = ref.height;
      var width = ref.width;

      if (this.height !== height) {
        this.height = height;
      }
      if (this.width !== width) {
        this.width = width;
      }
      this.$emit('resize', { height: height, width: width });
    }
  }
}

var
  bodyClass = 'q-body-drawer-toggle',
  duration = 150;

var QLayoutDrawer = {
  name: 'QLayoutDrawer',
  inject: {
    layout: {
      default: function default$1 () {
        console.error('QLayoutDrawer needs to be child of QLayout');
      }
    }
  },
  mixins: [ModelToggleMixin, PreventScroll],
  directives: {
    TouchPan: TouchPan
  },
  props: {
    overlay: Boolean,
    side: {
      type: String,
      default: 'left',
      validator: function (v) { return ['left', 'right'].includes(v); }
    },
    mini: Boolean,
    miniWidth: {
      type: String,
      default: '60px'
    },
    breakpoint: {
      type: Number,
      default: 992
    },
    behavior: {
      type: String,
      validator: function (v) { return ['default', 'desktop', 'mobile'].includes(v); },
      default: 'default'
    },
    contentStyle: Object,
    contentClass: [String, Object, Array],
    noHideOnRouteChange: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean
  },
  data: function data () {
    var
      largeScreenState = this.value !== void 0 ? this.value : true,
      showing = this.behavior !== 'mobile' && this.breakpoint < this.layout.width && !this.overlay
        ? largeScreenState
        : false;

    if (this.value !== void 0 && this.value !== showing) {
      this.$emit('input', showing);
    }

    return {
      showing: showing,
      belowBreakpoint: (
        this.behavior === 'mobile' ||
        (this.behavior !== 'desktop' && this.breakpoint >= this.layout.width)
      ),
      largeScreenState: largeScreenState,
      mobileOpened: false,
      size: 300
    }
  },
  watch: {
    belowBreakpoint: function belowBreakpoint (val, old) {
      if (this.mobileOpened) {
        return
      }

      if (val) { // from lg to xs
        if (!this.overlay) {
          this.largeScreenState = this.showing;
        }
        // ensure we close it for small screen
        this.hide();
      }
      else if (!this.overlay) { // from xs to lg
        this[this.largeScreenState ? 'show' : 'hide']();
      }
    },
    behavior: function behavior (val) {
      this.__updateLocal('belowBreakpoint', (
        val === 'mobile' ||
        (val !== 'desktop' && this.breakpoint >= this.layout.width)
      ));
    },
    breakpoint: function breakpoint (val) {
      this.__updateLocal('belowBreakpoint', (
        this.behavior === 'mobile' ||
        (this.behavior !== 'desktop' && val >= this.layout.width)
      ));
    },
    'layout.width': function layout_width (val) {
      this.__updateLocal('belowBreakpoint', (
        this.behavior === 'mobile' ||
        (this.behavior !== 'desktop' && this.breakpoint >= val)
      ));
    },
    offset: function offset$$1 (val) {
      this.__update('offset', val);
    },
    onLayout: function onLayout (val) {
      this.__update('space', val);
      this.layout.__animate();
    },
    $route: function $route () {
      if (this.noHideOnRouteChange) {
        return
      }

      if (this.mobileOpened || this.onScreenOverlay) {
        this.hide();
      }
    },
    rightSide: function rightSide () {
      this.applyPosition();
    },
    size: function size () {
      this.applyPosition();
    },
    '$q.i18n.rtl': function $q_i18n_rtl () {
      this.applyPosition();
    },
    mini: function mini () {
      if (this.value) {
        this.layout.__animate();
      }
    }
  },
  computed: {
    rightSide: function rightSide () {
      return this.side === 'right'
    },
    offset: function offset$$1 () {
      return this.showing && !this.mobileOpened && !this.overlay
        ? this.size
        : 0
    },
    fixed: function fixed () {
      return this.overlay || this.layout.view.indexOf(this.rightSide ? 'R' : 'L') > -1
    },
    onLayout: function onLayout () {
      return this.showing && !this.mobileView && !this.overlay
    },
    onScreenOverlay: function onScreenOverlay () {
      return this.showing && !this.mobileView && this.overlay
    },
    backdropClass: function backdropClass () {
      return {
        'no-pointer-events': !this.showing
      }
    },
    mobileView: function mobileView () {
      return this.belowBreakpoint || this.mobileOpened
    },
    headerSlot: function headerSlot () {
      return this.overlay
        ? false
        : (this.rightSide
          ? this.layout.rows.top[2] === 'r'
          : this.layout.rows.top[0] === 'l'
        )
    },
    footerSlot: function footerSlot () {
      return this.overlay
        ? false
        : (this.rightSide
          ? this.layout.rows.bottom[2] === 'r'
          : this.layout.rows.bottom[0] === 'l'
        )
    },
    belowClass: function belowClass () {
      return {
        'fixed': true,
        'on-top': true,
        'q-layout-drawer-delimiter': this.fixed && this.showing,
        'q-layout-drawer-mobile': true,
        'top-padding': true
      }
    },
    aboveClass: function aboveClass () {
      return {
        'fixed': this.fixed || !this.onLayout,
        'q-layout-drawer-mini': this.isMini,
        'q-layout-drawer-normal': !this.isMini,
        'q-layout-drawer-delimiter': this.fixed && this.showing,
        'top-padding': this.headerSlot
      }
    },
    aboveStyle: function aboveStyle () {
      var css$$1 = {};

      if (this.layout.header.space && !this.headerSlot) {
        if (this.fixed) {
          css$$1.top = (this.layout.header.offset) + "px";
        }
        else if (this.layout.header.space) {
          css$$1.top = (this.layout.header.size) + "px";
        }
      }

      if (this.layout.footer.space && !this.footerSlot) {
        if (this.fixed) {
          css$$1.bottom = (this.layout.footer.offset) + "px";
        }
        else if (this.layout.footer.space) {
          css$$1.bottom = (this.layout.footer.size) + "px";
        }
      }

      if (this.isMini) {
        css$$1.width = this.miniWidth;
      }

      return css$$1
    },
    computedStyle: function computedStyle () {
      return [this.contentStyle, this.mobileView ? '' : this.aboveStyle]
    },
    computedClass: function computedClass () {
      return [this.contentClass, this.mobileView ? this.belowClass : this.aboveClass]
    },
    stateDirection: function stateDirection () {
      return (this.$q.i18n.rtl ? -1 : 1) * (this.rightSide ? 1 : -1)
    },
    isMini: function isMini () {
      return this.mini && !this.mobileView
    }
  },
  render: function render (h) {
    var child = [];

    if (this.mobileView) {
      if (!this.noSwipeOpen) {
        child.push(h('div', {
          staticClass: ("q-layout-drawer-opener fixed-" + (this.side)),
          directives: [{
            name: 'touch-pan',
            modifiers: { horizontal: true },
            value: this.__openByTouch
          }]
        }));
      }
      child.push(h('div', {
        ref: 'backdrop',
        staticClass: 'fullscreen q-layout-backdrop',
        'class': this.backdropClass,
        on: { click: this.hide },
        directives: [{
          name: 'touch-pan',
          modifiers: { horizontal: true },
          value: this.__closeByTouch
        }]
      }));
    }

    return h('div', {
      staticClass: 'q-drawer-container'
    }, child.concat([
      h('aside', {
        ref: 'content',
        staticClass: ("q-layout-drawer q-layout-transition q-layout-drawer-" + (this.side) + " scroll"),
        'class': this.computedClass,
        style: this.computedStyle,
        attrs: this.$attrs,
        on: !this.mobileView ? this.$listeners : null,
        directives: this.mobileView && !this.noSwipeClose ? [{
          name: 'touch-pan',
          modifiers: { horizontal: true },
          value: this.__closeByTouch
        }] : null
      }, [
        h(QResizeObservable, {
          props: { debounce: 0 },
          on: { resize: this.__onResize }
        }),
        this.mini && this.$slots.mini && !this.mobileView
          ? this.$slots.mini
          : this.$slots.default
      ])
    ]))
  },
  created: function created () {
    var this$1 = this;

    this.layout.instances[this.side] = this;
    this.__update('space', this.onLayout);
    this.__update('offset', this.offset);

    this.$nextTick(function () {
      this$1.animateOverlay = true;
    });
  },
  mounted: function mounted () {
    if (this.showing) {
      this.applyPosition(0);
    }
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
    if (this.layout.instances[this.side] === this) {
      this.layout.instances[this.side] = null;
      this.__update('size', 0);
      this.__update('offset', 0);
      this.__update('space', false);
    }
  },
  methods: {
    applyPosition: function applyPosition (position) {
      var this$1 = this;

      if (position === void 0) {
        this.$nextTick(function () {
          position = this$1.showing
            ? 0
            : (this$1.$q.i18n.rtl ? -1 : 1) * (this$1.rightSide ? 1 : -1) * this$1.size;

          this$1.applyPosition(position);
        });
        return
      }
      css(this.$refs.content, cssTransform(("translateX(" + position + "px)")));
    },
    applyBackdrop: function applyBackdrop (x) {
      this.$refs.backdrop && css(this.$refs.backdrop, { backgroundColor: ("rgba(0,0,0," + (x * 0.4) + ")") });
    },
    __openByTouch: function __openByTouch (evt) {
      if (!this.belowBreakpoint) {
        return
      }

      var
        width$$1 = this.size,
        position = between(evt.distance.x, 0, width$$1);

      if (evt.isFinal) {
        var
          el = this.$refs.content,
          opened = position >= Math.min(75, width$$1);

        el.classList.remove('no-transition');

        if (opened) {
          this.show();
        }
        else {
          this.layout.__animate();
          this.applyBackdrop(0);
          this.applyPosition(this.stateDirection * width$$1);
          el.classList.remove('q-layout-drawer-delimiter');
        }

        return
      }

      this.applyPosition(
        (this.$q.i18n.rtl ? !this.rightSide : this.rightSide)
          ? Math.max(width$$1 - position, 0)
          : Math.min(0, position - width$$1)
      );
      this.applyBackdrop(
        between(position / width$$1, 0, 1)
      );

      if (evt.isFirst) {
        var el$1 = this.$refs.content;
        el$1.classList.add('no-transition');
        el$1.classList.add('q-layout-drawer-delimiter');
      }
    },
    __closeByTouch: function __closeByTouch (evt) {
      if (!this.mobileOpened) {
        return
      }

      var
        width$$1 = this.size,
        dir = evt.direction === this.side,
        position = (this.$q.i18n.rtl ? !dir : dir)
          ? between(evt.distance.x, 0, width$$1)
          : 0;

      if (evt.isFinal) {
        var opened = Math.abs(position) < Math.min(75, width$$1);
        this.$refs.content.classList.remove('no-transition');

        if (opened) {
          this.layout.__animate();
          this.applyBackdrop(1);
          this.applyPosition(0);
        }
        else {
          this.hide();
        }

        return
      }

      this.applyPosition(this.stateDirection * position);
      this.applyBackdrop(between(1 - position / width$$1, 0, 1));

      if (evt.isFirst) {
        this.$refs.content.classList.add('no-transition');
      }
    },
    __show: function __show () {
      var this$1 = this;

      this.layout.__animate();
      this.applyPosition(0);

      var otherSide = this.layout.instances[this.rightSide ? 'left' : 'right'];
      if (otherSide && otherSide.mobileOpened) {
        otherSide.hide();
      }

      if (this.belowBreakpoint) {
        this.mobileOpened = true;
        this.applyBackdrop(1);
        this.__preventScroll(true);
      }
      else {
        document.body.classList.add(bodyClass);
      }

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        if (this$1.showPromise) {
          this$1.showPromise.then(function () {
            document.body.classList.remove(bodyClass);
          });
          this$1.showPromiseResolve();
        }
      }, duration);
    },
    __hide: function __hide () {
      var this$1 = this;

      this.layout.__animate();

      if (this.mobileOpened) {
        this.__preventScroll(false);
        this.mobileOpened = false;
      }

      this.applyPosition((this.$q.i18n.rtl ? -1 : 1) * (this.rightSide ? 1 : -1) * this.size);
      this.applyBackdrop(0);

      document.body.classList.remove(bodyClass);

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        this$1.hidePromise && this$1.hidePromiseResolve();
      }, duration);
    },

    __onResize: function __onResize (ref) {
      var width$$1 = ref.width;

      this.__update('size', width$$1);
      this.__updateLocal('size', width$$1);
    },
    __update: function __update (prop, val) {
      if (this.layout[this.side][prop] !== val) {
        this.layout[this.side][prop] = val;
      }
    },
    __updateLocal: function __updateLocal (prop, val) {
      if (this[prop] !== val) {
        this[prop] = val;
      }
    }
  }
}

var QLayoutFooter = {
  name: 'QLayoutFooter',
  inject: {
    layout: {
      default: function default$1 () {
        console.error('QLayoutFooter needs to be child of QLayout');
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    reveal: Boolean
  },
  data: function data () {
    return {
      size: 0,
      revealed: true
    }
  },
  watch: {
    value: function value (val) {
      this.__update('space', val);
      this.__updateLocal('revealed', true);
      this.layout.__animate();
    },
    offset: function offset (val) {
      this.__update('offset', val);
    },
    reveal: function reveal (val) {
      if (!val) {
        this.__updateLocal('revealed', this.value);
      }
    },
    revealed: function revealed (val) {
      this.layout.__animate();
      this.$emit('reveal', val);
    },
    'layout.scroll': function layout_scroll () {
      this.__updateRevealed();
    },
    'layout.scrollHeight': function layout_scrollHeight () {
      this.__updateRevealed();
    },
    size: function size () {
      this.__updateRevealed();
    }
  },
  computed: {
    fixed: function fixed () {
      return this.reveal || this.layout.view.indexOf('F') > -1
    },
    offset: function offset () {
      if (!this.value) {
        return 0
      }
      if (this.fixed) {
        return this.revealed ? this.size : 0
      }
      var offset = this.layout.height + this.layout.scroll.position + this.size - this.layout.scrollHeight;
      return offset > 0 ? offset : 0
    },
    computedClass: function computedClass () {
      return {
        'fixed-bottom': this.fixed,
        'absolute-bottom': !this.fixed,
        'hidden': !this.value && !this.fixed,
        'q-layout-footer-hidden': !this.value || (this.fixed && !this.revealed)
      }
    },
    computedStyle: function computedStyle () {
      var
        view = this.layout.rows.bottom,
        css = {};

      if (view[0] === 'l' && this.layout.left.space) {
        css[("margin" + (this.$q.i18n.rtl ? 'Right' : 'Left'))] = (this.layout.left.size) + "px";
      }
      if (view[2] === 'r' && this.layout.right.space) {
        css[("margin" + (this.$q.i18n.rtl ? 'Left' : 'Right'))] = (this.layout.right.size) + "px";
      }

      return css
    }
  },
  render: function render (h) {
    return h('footer', {
      staticClass: 'q-layout-footer q-layout-transition',
      'class': this.computedClass,
      style: this.computedStyle
    }, [
      h(QResizeObservable, {
        props: { debounce: 0 },
        on: { resize: this.__onResize }
      }),
      this.$slots.default
    ])
  },
  created: function created () {
    this.layout.instances.footer = this;
    this.__update('space', this.value);
    this.__update('offset', this.offset);
  },
  beforeDestroy: function beforeDestroy () {
    if (this.layout.instances.footer === this) {
      this.layout.instances.footer = null;
      this.__update('size', 0);
      this.__update('offset', 0);
      this.__update('space', false);
    }
  },
  methods: {
    __onResize: function __onResize (ref) {
      var height = ref.height;

      this.__updateLocal('size', height);
      this.__update('size', height);
    },
    __update: function __update (prop, val) {
      if (this.layout.footer[prop] !== val) {
        this.layout.footer[prop] = val;
      }
    },
    __updateLocal: function __updateLocal (prop, val) {
      if (this[prop] !== val) {
        this[prop] = val;
      }
    },
    __updateRevealed: function __updateRevealed () {
      if (!this.reveal) {
        return
      }
      var
        scroll = this.layout.scroll,
        scrollHeight = this.layout.scrollHeight,
        height = this.layout.height;

      this.__updateLocal('revealed',
        scroll.direction === 'up' ||
        scroll.position - scroll.inflexionPosition < 100 ||
        scrollHeight - height - scroll.position < this.size + 300
      );
    }
  }
}

var QLayoutHeader = {
  name: 'QLayoutHeader',
  inject: {
    layout: {
      default: function default$1 () {
        console.error('QLayoutHeader needs to be child of QLayout');
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    }
  },
  data: function data () {
    return {
      size: 0,
      revealed: true
    }
  },
  watch: {
    value: function value (val) {
      this.__update('space', val);
      this.__updateLocal('revealed', true);
      this.layout.__animate();
    },
    offset: function offset (val) {
      this.__update('offset', val);
    },
    reveal: function reveal (val) {
      if (!val) {
        this.__updateLocal('revealed', this.value);
      }
    },
    revealed: function revealed (val) {
      this.layout.__animate();
      this.$emit('reveal', val);
    },
    'layout.scroll': function layout_scroll (scroll) {
      if (!this.reveal) {
        return
      }
      this.__updateLocal('revealed',
        scroll.direction === 'up' ||
        scroll.position <= this.revealOffset ||
        scroll.position - scroll.inflexionPosition < 100
      );
    }
  },
  computed: {
    fixed: function fixed () {
      return this.reveal || this.layout.view.indexOf('H') > -1
    },
    offset: function offset () {
      if (!this.value) {
        return 0
      }
      if (this.fixed) {
        return this.revealed ? this.size : 0
      }
      var offset = this.size - this.layout.scroll.position;
      return offset > 0 ? offset : 0
    },
    computedClass: function computedClass () {
      return {
        'fixed-top': this.fixed,
        'absolute-top': !this.fixed,
        'q-layout-header-hidden': !this.value || (this.fixed && !this.revealed)
      }
    },
    computedStyle: function computedStyle () {
      var
        view = this.layout.rows.top,
        css = {};

      if (view[0] === 'l' && this.layout.left.space) {
        css[("margin" + (this.$q.i18n.rtl ? 'Right' : 'Left'))] = (this.layout.left.size) + "px";
      }
      if (view[2] === 'r' && this.layout.right.space) {
        css[("margin" + (this.$q.i18n.rtl ? 'Left' : 'Right'))] = (this.layout.right.size) + "px";
      }

      return css
    }
  },
  render: function render (h) {
    return h('header', {
      staticClass: 'q-layout-header q-layout-transition',
      'class': this.computedClass,
      style: this.computedStyle
    }, [
      h(QResizeObservable, {
        props: { debounce: 0 },
        on: { resize: this.__onResize }
      }),
      this.$slots.default
    ])
  },
  created: function created () {
    this.layout.instances.header = this;
    this.__update('space', this.value);
    this.__update('offset', this.offset);
  },
  beforeDestroy: function beforeDestroy () {
    if (this.layout.instances.header === this) {
      this.layout.instances.header = null;
      this.__update('size', 0);
      this.__update('offset', 0);
      this.__update('space', false);
    }
  },
  methods: {
    __onResize: function __onResize (ref) {
      var height = ref.height;

      this.__updateLocal('size', height);
      this.__update('size', height);
    },
    __update: function __update (prop, val) {
      if (this.layout.header[prop] !== val) {
        this.layout.header[prop] = val;
      }
    },
    __updateLocal: function __updateLocal (prop, val) {
      if (this[prop] !== val) {
        this[prop] = val;
      }
    }
  }
}

var QPage = {
  name: 'QPage',
  inject: {
    pageContainer: {
      default: function default$1 () {
        console.error('QPage needs to be child of QPageContainer');
      }
    },
    layout: {}
  },
  props: {
    padding: Boolean
  },
  computed: {
    computedStyle: function computedStyle () {
      var offset =
        (this.layout.header.space ? this.layout.header.size : 0) +
        (this.layout.footer.space ? this.layout.footer.size : 0);

      return {
        minHeight: offset ? ("calc(100vh - " + offset + "px)") : '100vh'
      }
    },
    computedClass: function computedClass () {
      if (this.padding) {
        return 'layout-padding'
      }
    }
  },
  render: function render (h) {
    return h('main', {
      staticClass: 'q-layout-page',
      style: this.computedStyle,
      'class': this.computedClass
    }, [
      this.$slots.default
    ])
  }
}

var QPageContainer = {
  name: 'QPageContainer',
  inject: {
    layout: {
      default: function default$1 () {
        console.error('QPageContainer needs to be child of QLayout');
      }
    }
  },
  provide: {
    pageContainer: true
  },
  computed: {
    computedStyle: function computedStyle () {
      var css = {};

      if (this.layout.header.space) {
        css.paddingTop = (this.layout.header.size) + "px";
      }
      if (this.layout.right.space) {
        css[("padding" + (this.$q.i18n.rtl ? 'Left' : 'Right'))] = (this.layout.right.size) + "px";
      }
      if (this.layout.footer.space) {
        css.paddingBottom = (this.layout.footer.size) + "px";
      }
      if (this.layout.left.space) {
        css[("padding" + (this.$q.i18n.rtl ? 'Right' : 'Left'))] = (this.layout.left.size) + "px";
      }

      return css
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-layout-page-container q-layout-transition',
      style: this.computedStyle
    }, [
      this.$slots.default
    ])
  }
}

var QPageSticky = {
  name: 'QPageSticky',
  inject: {
    layout: {
      default: function default$1 () {
        console.error('QPageSticky needs to be child of QLayout');
      }
    }
  },
  props: {
    position: {
      type: String,
      default: 'bottom-right',
      validator: function (v) { return [
        'top-right', 'top-left',
        'bottom-right', 'bottom-left',
        'top', 'right', 'bottom', 'left'
      ].includes(v); }
    },
    offset: {
      type: Array,
      validator: function (v) { return v.length === 2; }
    },
    expand: Boolean
  },
  computed: {
    attach: function attach () {
      var pos = this.position;

      return {
        top: pos.indexOf('top') > -1,
        right: pos.indexOf('right') > -1,
        bottom: pos.indexOf('bottom') > -1,
        left: pos.indexOf('left') > -1,
        vertical: pos === 'top' || pos === 'bottom',
        horizontal: pos === 'left' || pos === 'right'
      }
    },
    top: function top () {
      return this.layout.header.offset
    },
    right: function right () {
      return this.layout.right.offset
    },
    bottom: function bottom () {
      return this.layout.footer.offset
    },
    left: function left () {
      return this.layout.left.offset
    },
    computedStyle: function computedStyle () {
      var
        attach = this.attach,
        transforms = [],
        dir = this.$q.i18n.rtl ? -1 : 1;

      if (attach.top && this.top) {
        transforms.push(("translateY(" + (this.top) + "px)"));
      }
      else if (attach.bottom && this.bottom) {
        transforms.push(("translateY(" + (-this.bottom) + "px)"));
      }

      if (attach.left && this.left) {
        transforms.push(("translateX(" + (dir * this.left) + "px)"));
      }
      else if (attach.right && this.right) {
        transforms.push(("translateX(" + (-dir * this.right) + "px)"));
      }

      var css$$1 = transforms.length
        ? cssTransform(transforms.join(' '))
        : {};

      if (this.offset) {
        css$$1.margin = (this.offset[1]) + "px " + (this.offset[0]) + "px";
      }

      if (attach.vertical) {
        if (this.left) {
          css$$1[this.$q.i18n.rtl ? 'right' : 'left'] = (this.left) + "px";
        }
        if (this.right) {
          css$$1[this.$q.i18n.rtl ? 'left' : 'right'] = (this.right) + "px";
        }
      }
      else if (attach.horizontal) {
        if (this.top) {
          css$$1.top = (this.top) + "px";
        }
        if (this.bottom) {
          css$$1.bottom = (this.bottom) + "px";
        }
      }

      return css$$1
    },
    classes: function classes () {
      return [ ("fixed-" + (this.position)), ("q-page-sticky-" + (this.expand ? 'expand' : 'shrink')) ]
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-page-sticky q-layout-transition z-fixed row flex-center',
      'class': this.classes,
      style: this.computedStyle
    }, [
      this.expand
        ? this.$slots.default
        : h('span', [
          this.$slots.default
        ])
    ])
  }
}

var QPagination = {
  name: 'QPagination',
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    textColor: String,
    size: String,
    disable: Boolean,
    input: Boolean,
    boundaryLinks: {
      type: Boolean,
      default: null
    },
    boundaryNumbers: {
      type: Boolean,
      default: null
    },
    directionLinks: {
      type: Boolean,
      default: null
    },
    ellipses: {
      type: Boolean,
      default: null
    },
    maxPages: {
      type: Number,
      default: 0,
      validator: function (v) {
        if (v < 0) {
          console.error('maxPages should not be negative');
          return false
        }
        return true
      }
    }
  },
  data: function data () {
    return {
      newPage: null
    }
  },
  watch: {
    min: function min (value) {
      this.model = this.value;
    },
    max: function max (value) {
      this.model = this.value;
    }
  },
  computed: {
    model: {
      get: function get () {
        return this.value
      },
      set: function set (val) {
        var this$1 = this;

        if (this.disable || !val || isNaN(val)) {
          return
        }
        var value = between(parseInt(val, 10), this.min, this.max);
        this.$emit('input', value);
        this.$nextTick(function () {
          if (JSON.stringify(value) !== JSON.stringify(this$1.value)) {
            this$1.$emit('change', value);
          }
        });
      }
    },
    inputPlaceholder: function inputPlaceholder () {
      return this.model + ' / ' + this.max
    },
    __boundaryLinks: function __boundaryLinks () {
      return this.__getBool(this.boundaryLinks, this.input)
    },
    __boundaryNumbers: function __boundaryNumbers () {
      return this.__getBool(this.boundaryNumbers, !this.input)
    },
    __directionLinks: function __directionLinks () {
      return this.__getBool(this.directionLinks, this.input)
    },
    __ellipses: function __ellipses () {
      return this.__getBool(this.ellipses, !this.input)
    },
    icons: function icons () {
      var ico = [
        this.$q.icon.pagination.first,
        this.$q.icon.pagination.prev,
        this.$q.icon.pagination.next,
        this.$q.icon.pagination.last
      ];
      return this.$q.i18n.rtl ? ico.reverse() : ico
    }
  },
  methods: {
    set: function set (value) {
      this.model = value;
    },
    setByOffset: function setByOffset (offset) {
      this.model = this.model + offset;
    },
    __update: function __update () {
      this.model = this.newPage;
      this.newPage = null;
    },
    __repeatTimeout: function __repeatTimeout (count) {
      return Math.max(100, 300 - count * count * 10)
    },
    __getBool: function __getBool (val, otherwise) {
      return [true, false].includes(val)
        ? val
        : otherwise
    },
    __getBtn: function __getBtn (h, props) {
      return h(QBtn, extend(true, {
        props: {
          color: this.color,
          flat: true,
          size: this.size
        }
      }, props))
    }
  },
  render: function render (h) {
    var this$1 = this;

    var
      contentStart = [],
      contentEnd = [],
      contentMiddle = [];

    if (this.__boundaryLinks) {
      contentStart.push(this.__getBtn(h, {
        key: 'bls',
        props: {
          disable: this.disable || this.value <= this.min,
          icon: this.icons[0]
        },
        on: {
          click: function () { return this$1.set(this$1.min); }
        }
      }));
      contentEnd.unshift(this.__getBtn(h, {
        key: 'ble',
        props: {
          disable: this.disable || this.value >= this.max,
          icon: this.icons[3]
        },
        on: {
          click: function () { return this$1.set(this$1.max); }
        }
      }));
    }

    if (this.__directionLinks) {
      contentStart.push(this.__getBtn(h, {
        key: 'bdp',
        props: {
          disable: this.disable || this.value <= this.min,
          icon: this.icons[1],
          repeatTimeout: this.__repeatTimeout
        },
        on: {
          click: function () { return this$1.setByOffset(-1); }
        }
      }));
      contentEnd.unshift(this.__getBtn(h, {
        key: 'bdn',
        props: {
          disable: this.disable || this.value >= this.max,
          icon: this.icons[2],
          repeatTimeout: this.__repeatTimeout
        },
        on: {
          click: function () { return this$1.setByOffset(1); }
        }
      }));
    }

    if (this.input) {
      contentMiddle.push(h(QInput, {
        staticClass: 'inline no-padding',
        style: {
          width: ((this.inputPlaceholder.length) + "rem")
        },
        props: {
          type: 'number',
          value: this.newPage,
          noNumberToggle: true,
          min: this.min,
          max: this.max,
          color: this.color,
          placeholder: this.inputPlaceholder,
          disable: this.disable,
          hideUnderline: true
        },
        on: {
          input: function (value) { return (this$1.newPage = value); },
          keydown: function (event) { return (getEventKey(event) === 13 && this$1.__update()); },
          blur: function () { return this$1.__update(); }
        }
      }));
    }
    else { // is type select
      var
        maxPages = Math.max(
          this.maxPages,
          1 + (this.__ellipses ? 2 : 0) + (this.__boundaryNumbers ? 2 : 0)
        ),
        pgFrom = this.min,
        pgTo = this.max,
        ellipsesStart = false,
        ellipsesEnd = false,
        boundaryStart = false,
        boundaryEnd = false;

      if (this.maxPages && maxPages < (this.max - this.min + 1)) {
        maxPages = 1 + Math.floor(maxPages / 2) * 2;
        pgFrom = Math.max(this.min, Math.min(this.max - maxPages + 1, this.value - Math.floor(maxPages / 2)));
        pgTo = Math.min(this.max, pgFrom + maxPages - 1);
        if (this.__boundaryNumbers) {
          boundaryStart = true;
          pgFrom += 1;
        }
        if (this.__ellipses && pgFrom > (this.min + (this.__boundaryNumbers ? 1 : 0))) {
          ellipsesStart = true;
          pgFrom += 1;
        }
        if (this.__boundaryNumbers) {
          boundaryEnd = true;
          pgTo -= 1;
        }
        if (this.__ellipses && pgTo < (this.max - (this.__boundaryNumbers ? 1 : 0))) {
          ellipsesEnd = true;
          pgTo -= 1;
        }
      }
      var style = {
        minWidth: ((Math.max(2, String(this.max).length)) + "em")
      };
      if (boundaryStart) {
        var active = this.min === this.value;
        contentStart.push(this.__getBtn(h, {
          key: 'bns',
          style: style,
          props: {
            disable: this.disable,
            flat: !active,
            textColor: active ? this.textColor : null,
            label: this.min,
            noRipple: true
          },
          on: {
            click: function () { return this$1.set(this$1.min); }
          }
        }));
      }
      if (boundaryEnd) {
        var active$1 = this.max === this.value;
        contentEnd.unshift(this.__getBtn(h, {
          key: 'bne',
          style: style,
          props: {
            disable: this.disable,
            flat: !active$1,
            textColor: active$1 ? this.textColor : null,
            label: this.max,
            noRipple: true
          },
          on: {
            click: function () { return this$1.set(this$1.max); }
          }
        }));
      }
      if (ellipsesStart) {
        contentStart.push(this.__getBtn(h, {
          key: 'bes',
          style: style,
          props: {
            disable: this.disable,
            label: '…',
            repeatTimeout: this.__repeatTimeout
          },
          on: {
            click: function () { return this$1.set(pgFrom - 1); }
          }
        }));
      }
      if (ellipsesEnd) {
        contentEnd.unshift(this.__getBtn(h, {
          key: 'bee',
          style: style,
          props: {
            disable: this.disable,
            label: '…',
            repeatTimeout: this.__repeatTimeout
          },
          on: {
            click: function () { return this$1.set(pgTo + 1); }
          }
        }));
      }
      var loop = function ( i ) {
        var active$2 = i === this$1.value;
        contentMiddle.push(this$1.__getBtn(h, {
          key: ("bpg" + i),
          style: style,
          props: {
            disable: this$1.disable,
            flat: !active$2,
            textColor: active$2 ? this$1.textColor : null,
            label: i,
            noRipple: true
          },
          on: {
            click: function () { return this$1.set(i); }
          }
        }));
      };

      for (var i = pgFrom; i <= pgTo; i++) loop( i );
    }

    return h('div', {
      staticClass: 'q-pagination row no-wrap items-center',
      'class': { disabled: this.disable }
    }, [
      contentStart,

      h('div', { staticClass: 'row justify-center' }, [
        contentMiddle
      ]),

      contentEnd
    ])
  }
}

var QParallax = {
  name: 'QParallax',
  props: {
    src: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: 500
    },
    speed: {
      type: Number,
      default: 1,
      validator: function validator (value) {
        return value >= 0 && value <= 1
      }
    }
  },
  data: function data () {
    return {
      imageHasBeenLoaded: false,
      scrolling: false
    }
  },
  watch: {
    src: function src () {
      this.imageHasBeenLoaded = false;
    },
    height: function height$$1 () {
      this.__updatePos();
    }
  },
  methods: {
    __processImage: function __processImage () {
      this.imageHasBeenLoaded = true;
      this.__onResize();
    },
    __onResize: function __onResize () {
      if (!this.imageHasBeenLoaded || !this.scrollTarget) {
        return
      }

      if (this.scrollTarget === window) {
        this.viewportHeight = window.innerHeight;
      }
      this.imageHeight = height(this.image);
      this.__updatePos();
    },
    __updatePos: function __updatePos () {
      if (!this.imageHasBeenLoaded) {
        return
      }

      var containerTop, containerHeight, containerBottom, top, bottom;

      if (this.scrollTarget === window) {
        containerTop = 0;
        containerHeight = this.viewportHeight;
        containerBottom = containerHeight;
      }
      else {
        containerTop = offset(this.scrollTarget).top;
        containerHeight = height(this.scrollTarget);
        containerBottom = containerTop + containerHeight;
      }
      top = offset(this.container).top;
      bottom = top + this.height;

      if (bottom > containerTop && top < containerBottom) {
        var percentScrolled = (containerBottom - top) / (this.height + containerHeight);
        this.__setPos(Math.round((this.imageHeight - this.height) * percentScrolled * this.speed));
      }
    },
    __setPos: function __setPos (offset$$1) {
      css(this.$refs.img, cssTransform(("translate3D(-50%," + offset$$1 + "px, 0)")));
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-parallax',
      style: { height: ((this.height) + "px") }
    }, [
      h('div', {
        staticClass: 'q-parallax-image absolute-full'
      }, [
        h('img', {
          ref: 'img',
          domProps: {
            src: this.src
          },
          'class': { ready: this.imageHasBeenLoaded },
          on: {
            load: this.__processImage
          }
        })
      ]),

      h('div', {
        staticClass: 'q-parallax-text absolute-full column flex-center'
      }, [
        this.imageHasBeenLoaded
          ? this.$slots.default
          : this.$slots.loading
      ])
    ])
  },
  created: function created () {
    this.__setPos = frameDebounce(this.__setPos);
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.container = this$1.$el;
      this$1.image = this$1.$refs.img;

      this$1.scrollTarget = getScrollTarget(this$1.$el);
      this$1.resizeHandler = debounce(this$1.__onResize, 50);

      window.addEventListener('resize', this$1.resizeHandler, listenOpts.passive);
      this$1.scrollTarget.addEventListener('scroll', this$1.__updatePos, listenOpts.passive);
      this$1.__onResize();
    });
  },
  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler, listenOpts.passive);
    this.scrollTarget.removeEventListener('scroll', this.__updatePos, listenOpts.passive);
  }
}

function width$1 (val) {
  return { width: (val + "%") }
}

var QProgress = {
  name: 'QProgress',
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 'primary'
    },
    stripe: Boolean,
    animate: Boolean,
    indeterminate: Boolean,
    buffer: Number,
    height: {
      type: String,
      default: '4px'
    }
  },
  computed: {
    model: function model () {
      return between(this.percentage, 0, 100)
    },
    bufferModel: function bufferModel () {
      return between(this.buffer || 0, 0, 100 - this.model)
    },
    bufferStyle: function bufferStyle () {
      return width$1(this.bufferModel)
    },
    trackStyle: function trackStyle () {
      return width$1(this.buffer ? 100 - this.buffer : 100)
    },
    computedClass: function computedClass () {
      return ("text-" + (this.color))
    },
    computedStyle: function computedStyle () {
      return { height: this.height }
    },
    modelClass: function modelClass () {
      return {
        animate: this.animate,
        stripe: this.stripe,
        indeterminate: this.indeterminate
      }
    },
    modelStyle: function modelStyle () {
      return width$1(this.model)
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-progress',
      style: this.computedStyle,
      'class': this.computedClass
    }, [
      this.buffer && !this.indeterminate
        ? h('div', {
          staticClass: 'q-progress-buffer',
          style: this.bufferStyle
        })
        : null,

      h('div', {
        staticClass: 'q-progress-track',
        style: this.trackStyle
      }),

      h('div', {
        staticClass: 'q-progress-model',
        style: this.modelStyle,
        'class': this.modelClass
      })
    ])
  }
}

var QPullToRefresh = {
  name: 'QPullToRefresh',
  directives: {
    TouchPan: TouchPan
  },
  props: {
    handler: {
      type: Function,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    distance: {
      type: Number,
      default: 35
    },
    pullMessage: String,
    releaseMessage: String,
    refreshMessage: String,
    refreshIcon: String,
    inline: Boolean,
    disable: Boolean
  },
  data: function data () {
    var height$$1 = 65;

    return {
      state: 'pull',
      pullPosition: -height$$1,
      height: height$$1,
      animating: false,
      pulling: false,
      scrolling: false
    }
  },
  computed: {
    message: function message () {
      switch (this.state) {
        case 'pulled':
          return this.releaseMessage || this.$q.i18n.pullToRefresh.release
        case 'refreshing':
          return this.refreshMessage || this.$q.i18n.pullToRefresh.refresh
        case 'pull':
        default:
          return this.pullMessage || this.$q.i18n.pullToRefresh.pull
      }
    },
    style: function style$$1 () {
      return cssTransform(("translateY(" + (this.pullPosition) + "px)"))
    },
    messageClass: function messageClass () {
      return ("text-" + (this.color))
    }
  },
  methods: {
    __pull: function __pull (event) {
      if (this.disable) {
        return
      }

      if (event.isFinal) {
        this.scrolling = false;
        this.pulling = false;
        if (this.state === 'pulled') {
          this.state = 'refreshing';
          this.__animateTo(0);
          this.trigger();
        }
        else if (this.state === 'pull') {
          this.__animateTo(-this.height);
        }
        return
      }
      if (this.animating || this.scrolling || this.state === 'refreshing') {
        return true
      }

      var top = getScrollPosition(this.scrollContainer);
      if (top !== 0 || (top === 0 && event.direction !== 'down')) {
        this.scrolling = true;
        if (this.pulling) {
          this.pulling = false;
          this.state = 'pull';
          this.__animateTo(-this.height);
        }
        return true
      }

      event.evt.preventDefault();
      this.pulling = true;
      this.pullPosition = -this.height + Math.max(0, Math.pow(event.distance.y, 0.85));
      this.state = this.pullPosition > this.distance ? 'pulled' : 'pull';
    },
    __animateTo: function __animateTo (target, done, previousCall) {
      var this$1 = this;

      if (!previousCall && this.animationId) {
        cancelAnimationFrame(this.animating);
      }

      this.pullPosition -= (this.pullPosition - target) / 7;

      if (this.pullPosition - target > 1) {
        this.animating = window.requestAnimationFrame(function () {
          this$1.__animateTo(target, done, true);
        });
      }
      else {
        this.animating = window.requestAnimationFrame(function () {
          this$1.pullPosition = target;
          this$1.animating = false;
          done && done();
        });
      }
    },
    trigger: function trigger () {
      var this$1 = this;

      this.handler(function () {
        this$1.__animateTo(-this$1.height, function () {
          this$1.state = 'pull';
        });
      });
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.scrollContainer = this$1.inline ? this$1.$el.parentNode : getScrollTarget(this$1.$el);
    });
  },
  render: function render (h) {
    return h('div', { staticClass: 'pull-to-refresh' }, [
      h('div', {
        staticClass: 'pull-to-refresh-container',
        style: this.style,
        directives: [{
          name: 'touch-pan',
          modifiers: {
            vertical: true,
            mightPrevent: true
          },
          value: this.__pull
        }]
      }, [
        h('div', {
          staticClass: 'pull-to-refresh-message row flex-center',
          'class': this.messageClass
        }, [
          h(QIcon, {
            'class': { 'rotate-180': this.state === 'pulled' },
            props: { name: this.$q.icon.pullToRefresh.arrow },
            directives: [{
              name: 'show',
              value: this.state !== 'refreshing'
            }]
          }),
          h(QIcon, {
            staticClass: 'animate-spin',
            props: { name: this.refreshIcon || this.$q.icon.pullToRefresh.refresh },
            directives: [{
              name: 'show',
              value: this.state === 'refreshing'
            }]
          }),
          (" " + (this.message))
        ]),
        this.$slots.default
      ])
    ])
  }
}

var dragType = {
  MIN: 0,
  RANGE: 1,
  MAX: 2
};

var QRange = {
  name: 'QRange',
  mixins: [SliderMixin],
  props: {
    value: {
      type: Object,
      default: function () { return ({
        min: 0,
        max: 0
      }); },
      validator: function validator (value) {
        return value.hasOwnProperty('min') && value.hasOwnProperty('max')
      }
    },
    dragRange: Boolean,
    dragOnlyRange: Boolean,
    leftLabelColor: String,
    leftLabelValue: String,
    rightLabelColor: String,
    rightLabelValue: String
  },
  data: function data () {
    return {
      model: extend({}, this.value),
      dragging: false,
      currentMinPercentage: (this.value.min - this.min) / (this.max - this.min),
      currentMaxPercentage: (this.value.max - this.min) / (this.max - this.min)
    }
  },
  computed: {
    percentageMin: function percentageMin () {
      return this.snap ? (this.model.min - this.min) / (this.max - this.min) : this.currentMinPercentage
    },
    percentageMax: function percentageMax () {
      return this.snap ? (this.model.max - this.min) / (this.max - this.min) : this.currentMaxPercentage
    },
    activeTrackWidth: function activeTrackWidth () {
      return 100 * (this.percentageMax - this.percentageMin) + '%'
    },
    leftDisplayValue: function leftDisplayValue () {
      return this.leftLabelValue !== void 0
        ? this.leftLabelValue
        : this.model.min
    },
    rightDisplayValue: function rightDisplayValue () {
      return this.rightLabelValue !== void 0
        ? this.rightLabelValue
        : this.model.max
    },
    leftTooltipColor: function leftTooltipColor () {
      return this.leftLabelColor || this.labelColor
    },
    rightTooltipColor: function rightTooltipColor () {
      return this.rightLabelColor || this.labelColor
    }
  },
  watch: {
    'value.min': function value_min (value) {
      this.model.min = value;
    },
    'value.max': function value_max (value) {
      this.model.max = value;
    },
    'model.min': function model_min (value) {
      if (this.dragging) {
        return
      }
      if (value > this.model.max) {
        value = this.model.max;
      }
      this.currentMinPercentage = (value - this.min) / (this.max - this.min);
    },
    'model.max': function model_max (value) {
      if (this.dragging) {
        return
      }
      if (value < this.model.min) {
        value = this.model.min;
      }
      this.currentMaxPercentage = (value - this.min) / (this.max - this.min);
    },
    min: function min (value) {
      if (this.model.min < value) {
        this.__update({min: value});
      }
      if (this.model.max < value) {
        this.__update({max: value});
      }
      this.$nextTick(this.__validateProps);
    },
    max: function max (value) {
      if (this.model.min > value) {
        this.__update({min: value});
      }
      if (this.model.max > value) {
        this.__update({max: value});
      }
      this.$nextTick(this.__validateProps);
    },
    step: function step () {
      this.$nextTick(this.__validateProps);
    }
  },
  methods: {
    __getDragging: function __getDragging (event) {
      var
        container = this.$refs.handle,
        width = container.offsetWidth,
        sensitivity = (this.dragOnlyRange ? -1 : 1) * this.$refs.handleMin.offsetWidth / (2 * width);

      var dragging = {
        left: container.getBoundingClientRect().left,
        width: width,
        valueMin: this.model.min,
        valueMax: this.model.max,
        percentageMin: this.currentMinPercentage,
        percentageMax: this.currentMaxPercentage
      };

      var
        percentage = getPercentage(event, dragging, this.$q.i18n.rtl),
        type;

      if (percentage < this.currentMinPercentage + sensitivity) {
        type = dragType.MIN;
      }
      else if (percentage < this.currentMaxPercentage - sensitivity) {
        if (this.dragRange || this.dragOnlyRange) {
          type = dragType.RANGE;
          extend(dragging, {
            offsetPercentage: percentage,
            offsetModel: getModel(percentage, this.min, this.max, this.step, this.computedDecimals),
            rangeValue: dragging.valueMax - dragging.valueMin,
            rangePercentage: this.currentMaxPercentage - this.currentMinPercentage
          });
        }
        else {
          type = this.currentMaxPercentage - percentage < percentage - this.currentMinPercentage
            ? dragType.MAX
            : dragType.MIN;
        }
      }
      else {
        type = dragType.MAX;
      }

      if (this.dragOnlyRange && type !== dragType.RANGE) {
        return false
      }

      dragging.type = type;
      return dragging
    },
    __move: function __move (event, dragging) {
      if ( dragging === void 0 ) dragging = this.dragging;

      var
        percentage = getPercentage(event, dragging, this.$q.i18n.rtl),
        model = getModel(percentage, this.min, this.max, this.step, this.computedDecimals),
        pos;

      switch (dragging.type) {
        case dragType.MIN:
          if (percentage <= dragging.percentageMax) {
            pos = {
              minP: percentage,
              maxP: dragging.percentageMax,
              min: model,
              max: dragging.valueMax
            };
          }
          else {
            pos = {
              minP: dragging.percentageMax,
              maxP: percentage,
              min: dragging.valueMax,
              max: model
            };
          }
          break

        case dragType.MAX:
          if (percentage >= dragging.percentageMin) {
            pos = {
              minP: dragging.percentageMin,
              maxP: percentage,
              min: dragging.valueMin,
              max: model
            };
          }
          else {
            pos = {
              minP: percentage,
              maxP: dragging.percentageMin,
              min: model,
              max: dragging.valueMin
            };
          }
          break

        case dragType.RANGE:
          var
            percentageDelta = percentage - dragging.offsetPercentage,
            minP = between(dragging.percentageMin + percentageDelta, 0, 1 - dragging.rangePercentage),
            modelDelta = model - dragging.offsetModel,
            min = between(dragging.valueMin + modelDelta, this.min, this.max - dragging.rangeValue);

          pos = {
            minP: minP,
            maxP: minP + dragging.rangePercentage,
            min: parseFloat(min.toFixed(this.computedDecimals)),
            max: parseFloat((min + dragging.rangeValue).toFixed(this.computedDecimals))
          };
          break
      }

      this.currentMinPercentage = pos.minP;
      this.currentMaxPercentage = pos.maxP;
      this.model = {
        min: pos.min,
        max: pos.max
      };
    },
    __end: function __end (event, dragging) {
      if ( dragging === void 0 ) dragging = this.dragging;

      this.__move(event, dragging);
      this.currentMinPercentage = (this.model.min - this.min) / (this.max - this.min);
      this.currentMaxPercentage = (this.model.max - this.min) / (this.max - this.min);
    },
    __validateProps: function __validateProps () {
      if (this.min >= this.max) {
        console.error('Range error: min >= max', this.$el, this.min, this.max);
      }
      else if (notDivides((this.max - this.min) / this.step, this.computedDecimals)) {
        console.error('Range error: step must be a divisor of max - min', this.min, this.max, this.step);
      }
      else if (notDivides((this.model.min - this.min) / this.step, this.computedDecimals)) {
        console.error('Range error: step must be a divisor of initial value.min - min', this.model.min, this.min, this.step);
      }
      else if (notDivides((this.model.max - this.min) / this.step, this.computedDecimals)) {
        console.error('Range error: step must be a divisor of initial value.max - min', this.model.max, this.max, this.step);
      }
    },

    __getHandle: function __getHandle (h, lower, upper, edge, percentage, color, label) {
      var obj;

      return h('div', {
        ref: ("handle" + upper),
        staticClass: ("q-slider-handle q-slider-handle-" + lower),
        style: ( obj = {}, obj[this.$q.i18n.rtl ? 'right' : 'left'] = ((percentage * 100) + "%"), obj.borderRadius = this.square ? '0' : '50%', obj),
        'class': [
          edge ? 'handle-at-minimum' : null,
          { dragging: this.dragging }
        ]
      }, [
        this.label || this.labelAlways
          ? h(QChip, {
            props: {
              pointing: 'down',
              square: true,
              dense: true,
              color: color
            },
            staticClass: 'q-slider-label no-pointer-events',
            'class': { 'label-always': this.labelAlways }
          }, [ label ])
          : null,
        null
      ])
    },
    __getContent: function __getContent (h) {
      var obj;

      return [
        h('div', {
          staticClass: 'q-slider-track active-track',
          style: ( obj = {}, obj[this.$q.i18n.rtl ? 'right' : 'left'] = ((this.percentageMin * 100) + "%"), obj.width = this.activeTrackWidth, obj),
          'class': {
            dragging: this.dragging,
            'track-draggable': this.dragRange || this.dragOnlyRange
          }
        }),

        this.__getHandle(
          h, 'min', 'Min', !this.fillHandleAlways && this.model.min === this.min, this.percentageMin,
          this.leftTooltipColor, this.leftDisplayValue
        ),
        this.__getHandle(
          h, 'max', 'Max', false, this.percentageMax,
          this.rightTooltipColor, this.rightDisplayValue
        )
      ]
    }
  }
}

var QRating = {
  name: 'QRating',
  props: {
    value: Number,
    max: {
      type: Number,
      default: 5
    },
    icon: String,
    color: String,
    size: String,
    readonly: Boolean,
    disable: Boolean
  },
  data: function data () {
    return {
      mouseModel: 0
    }
  },
  computed: {
    model: {
      get: function get () {
        return this.value
      },
      set: function set (value) {
        var this$1 = this;

        this.$emit('input', value);
        this.$nextTick(function () {
          if (JSON.stringify(value) !== JSON.stringify(this$1.value)) {
            this$1.$emit('change', value);
          }
        });
      }
    },
    editable: function editable () {
      return !this.readonly && !this.disable
    },
    classes: function classes () {
      var cls = [];

      this.disable && cls.push('disabled');
      this.editable && cls.push('editable');
      this.color && cls.push(("text-" + (this.color)));

      return cls
    }
  },
  methods: {
    set: function set (value) {
      if (this.editable) {
        var model = between(parseInt(value, 10), 1, this.max);
        this.model = this.model === model ? 0 : model;
        this.mouseModel = 0;
      }
    },
    __setHoverValue: function __setHoverValue (value) {
      if (this.editable) {
        this.mouseModel = value;
      }
    }
  },
  render: function render (h) {
    var this$1 = this;

    var
      child = [],
      tabindex = this.editable ? 0 : -1;

    var loop = function ( i ) {
      child.push(h(QIcon, {
        key: i,
        ref: ("rt" + i),
        props: { name: this$1.icon || this$1.$q.icon.rating.icon },
        'class': {
          active: (!this$1.mouseModel && this$1.model >= i) || (this$1.mouseModel && this$1.mouseModel >= i),
          exselected: this$1.mouseModel && this$1.model >= i && this$1.mouseModel < i,
          hovered: this$1.mouseModel === i
        },
        attrs: { tabindex: tabindex },
        nativeOn: {
          click: function (e) {
            e.target.blur();
            this$1.set(i);
          },
          mouseover: function () { return this$1.__setHoverValue(i); },
          mouseout: function () { this$1.mouseModel = 0; },
          keydown: function (e) {
            switch (getEventKey(e)) {
              case 13:
              case 32:
                this$1.set(i);
                return stopAndPrevent(e)
              case 37: // LEFT ARROW
              case 40: // DOWN ARROW
                if (this$1.$refs[("rt" + (i - 1))]) {
                  this$1.$refs[("rt" + (i - 1))].$el.focus();
                }
                return stopAndPrevent(e)
              case 39: // RIGHT ARROW
              case 38: // UP ARROW
                if (this$1.$refs[("rt" + (i + 1))]) {
                  this$1.$refs[("rt" + (i + 1))].$el.focus();
                }
                return stopAndPrevent(e)
            }
          },
          focus: function () { return this$1.__setHoverValue(i); },
          blur: function () { this$1.mouseModel = 0; }
        }
      }));
    };

    for (var i = 1; i <= this.max; i++) loop( i );

    return h('div', {
      staticClass: 'q-rating row inline items-center no-wrap',
      'class': this.classes,
      style: this.size ? ("font-size: " + (this.size)) : ''
    }, child)
  }
}

var QScrollArea = {
  name: 'QScrollArea',
  directives: {
    TouchPan: TouchPan
  },
  props: {
    thumbStyle: {
      type: Object,
      default: function () { return ({}); }
    },
    contentStyle: {
      type: Object,
      default: function () { return ({}); }
    },
    contentActiveStyle: {
      type: Object,
      default: function () { return ({}); }
    },
    delay: {
      type: Number,
      default: 1000
    }
  },
  data: function data () {
    return {
      active: false,
      hover: false,
      containerHeight: 0,
      scrollPosition: 0,
      scrollHeight: 0
    }
  },
  computed: {
    thumbHidden: function thumbHidden () {
      return this.scrollHeight <= this.containerHeight || (!this.active && !this.hover)
    },
    thumbHeight: function thumbHeight () {
      return Math.round(between(this.containerHeight * this.containerHeight / this.scrollHeight, 50, this.containerHeight))
    },
    style: function style () {
      var top = this.scrollPercentage * (this.containerHeight - this.thumbHeight);
      return extend({}, this.thumbStyle, {
        top: (top + "px"),
        height: ((this.thumbHeight) + "px")
      })
    },
    mainStyle: function mainStyle () {
      return this.thumbHidden ? this.contentStyle : this.contentActiveStyle
    },
    scrollPercentage: function scrollPercentage () {
      var p = between(this.scrollPosition / (this.scrollHeight - this.containerHeight), 0, 1);
      return Math.round(p * 10000) / 10000
    }
  },
  methods: {
    setScrollPosition: function setScrollPosition$1 (offset, duration) {
      setScrollPosition(this.$refs.target, offset, duration);
    },
    __updateContainer: function __updateContainer (ref) {
      var height = ref.height;

      if (this.containerHeight !== height) {
        this.containerHeight = height;
        this.__setActive(true, true);
      }
    },
    __updateScroll: function __updateScroll (ref) {
      var position$$1 = ref.position;

      if (this.scrollPosition !== position$$1) {
        this.scrollPosition = position$$1;
        this.__setActive(true, true);
      }
    },
    __updateScrollHeight: function __updateScrollHeight (ref) {
      var height = ref.height;

      if (this.scrollHeight !== height) {
        this.scrollHeight = height;
        this.__setActive(true, true);
      }
    },
    __panThumb: function __panThumb (e) {
      if (e.isFirst) {
        this.refPos = this.scrollPosition;
        this.__setActive(true, true);
        document.body.classList.add('non-selectable');
        if (document.selection) {
          document.selection.empty();
        }
        else if (window.getSelection) {
          window.getSelection().removeAllRanges();
        }
      }

      if (e.isFinal) {
        this.__setActive(false);
        document.body.classList.remove('non-selectable');
      }

      var multiplier = (this.scrollHeight - this.containerHeight) / (this.containerHeight - this.thumbHeight);
      this.$refs.target.scrollTop = this.refPos + (e.direction === 'down' ? 1 : -1) * e.distance.y * multiplier;
    },
    __panContainer: function __panContainer (e) {
      if (e.isFirst) {
        this.refPos = this.scrollPosition;
        this.__setActive(true, true);
      }
      if (e.isFinal) {
        this.__setActive(false);
      }

      var pos = this.refPos + (e.direction === 'down' ? -1 : 1) * e.distance.y;
      this.$refs.target.scrollTop = pos;

      if (pos > 0 && pos + this.containerHeight < this.scrollHeight) {
        e.evt.preventDefault();
      }
    },
    __mouseWheel: function __mouseWheel (e) {
      var el = this.$refs.target;
      el.scrollTop += getMouseWheelDistance(e).pixelY;
      if (el.scrollTop > 0 && el.scrollTop + this.containerHeight < this.scrollHeight) {
        e.preventDefault();
      }
    },
    __setActive: function __setActive (active, timer) {
      clearTimeout(this.timer);
      if (active === this.active) {
        if (active && this.timer) {
          this.__startTimer();
        }
        return
      }

      if (active) {
        this.active = true;
        if (timer) {
          this.__startTimer();
        }
      }
      else {
        this.active = false;
      }
    },
    __startTimer: function __startTimer () {
      var this$1 = this;

      this.timer = setTimeout(function () {
        this$1.active = false;
        this$1.timer = null;
      }, this.delay);
    }
  },
  render: function render (h) {
    var this$1 = this;

    if (!this.$q.platform.is.desktop) {
      return h('div', {
        staticClass: 'q-scroll-area relative-position',
        style: this.contentStyle
      }, [
        h('div', {
          ref: 'target',
          staticClass: 'scroll relative-position fit'
        }, [
          this.$slots.default
        ])
      ])
    }

    return h('div', {
      staticClass: 'q-scrollarea relative-position',
      on: {
        mouseenter: function () { this$1.hover = true; },
        mouseleave: function () { this$1.hover = false; }
      }
    }, [
      h('div', {
        ref: 'target',
        staticClass: 'scroll relative-position overflow-hidden fit',
        on: {
          wheel: this.__mouseWheel
        },
        directives: [{
          name: 'touch-pan',
          modifiers: {
            vertical: true,
            noMouse: true,
            mightPrevent: true
          },
          value: this.__panContainer
        }]
      }, [
        h('div', {
          staticClass: 'absolute full-width',
          style: this.mainStyle
        }, [
          h(QResizeObservable, {
            on: { resize: this.__updateScrollHeight }
          }),
          this.$slots.default
        ]),
        h(QScrollObservable, {
          on: { scroll: this.__updateScroll }
        })
      ]),

      h(QResizeObservable, {
        on: { resize: this.__updateContainer }
      }),

      h('div', {
        staticClass: 'q-scrollarea-thumb absolute-right',
        style: this.style,
        'class': { 'invisible-thumb': this.thumbHidden },
        directives: [{
          name: 'touch-pan',
          modifiers: {
            vertical: true,
            prevent: true
          },
          value: this.__panThumb
        }]
      })
    ])
  }
}

var QSearch = {
  name: 'QSearch',
  mixins: [FrameMixin, InputMixin],
  props: {
    value: { required: true },
    type: String,
    debounce: {
      type: Number,
      default: 300
    },
    icon: String,
    placeholder: String,
    noIcon: Boolean
  },
  data: function data () {
    return {
      model: this.value,
      childDebounce: false
    }
  },
  provide: function provide () {
    var this$1 = this;

    return {
      __inputDebounce: {
        set: function (val) {
          if (this$1.model !== val) {
            this$1.model = val;
          }
        },
        setChildDebounce: function (v) {
          this$1.childDebounce = v;
        }
      }
    }
  },
  watch: {
    value: function value (v) {
      this.model = v;
    },
    model: function model (val) {
      var this$1 = this;

      clearTimeout(this.timer);
      if (this.value === val) {
        return
      }
      if (!val && val !== 0) {
        this.model = this.type === 'number' ? null : '';
      }
      this.timer = setTimeout(function () {
        this$1.$emit('input', this$1.model);
      }, this.debounceValue);
    }
  },
  computed: {
    debounceValue: function debounceValue () {
      return this.childDebounce
        ? 0
        : this.debounce
    },
    controlBefore: function controlBefore () {
      return this.before || (
        this.noIcon
          ? null
          : [{
            icon: this.icon || this.$q.icon.search.icon,
            handler: this.focus
          }]
      )
    },
    controlAfter: function controlAfter () {
      if (this.after) {
        return this.after
      }
      if (this.editable && this.clearable) {
        return [{
          icon: this.$q.icon.search[("clear" + (this.isInverted ? 'Inverted' : ''))],
          content: true,
          handler: this.clear
        }]
      }
    }
  },
  methods: {
    clear: function clear () {
      this.$refs.input.clear();
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(QInput, {
      ref: 'input',
      staticClass: 'q-search',
      props: {
        value: this.model,
        type: this.type,
        autofocus: this.autofocus,
        placeholder: this.placeholder || this.$q.i18n.label.search,
        disable: this.disable,
        readonly: this.readonly,
        error: this.error,
        warning: this.warning,
        align: this.align,
        noParentField: this.noParentField,
        floatLabel: this.floatLabel,
        stackLabel: this.stackLabel,
        prefix: this.prefix,
        suffix: this.suffix,
        inverted: this.inverted,
        invertedLight: this.invertedLight,
        dark: this.dark,
        hideUnderline: this.hideUnderline,
        color: this.color,
        before: this.controlBefore,
        after: this.controlAfter,
        clearValue: this.clearValue
      },
      attrs: this.$attrs,
      on: {
        input: function (v) { this$1.model = v; },
        focus: this.__onFocus,
        blur: this.__onBlur,
        keyup: this.__onKeyup,
        keydown: this.__onKeydown,
        click: this.__onClick,
        clear: function (val) {
          this$1.$emit('clear', val);
          this$1.__emit();
        }
      }
    }, [
      this.$slots.default
    ])
  }
}

function defaultFilterFn (terms, obj) {
  return obj.label.toLowerCase().indexOf(terms) > -1
}

var QSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{ref:"input",staticClass:"q-select",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"warning":_vm.warning,"disable":_vm.disable,"inverted":_vm.inverted,"invertedLight":_vm.invertedLight,"dark":_vm.dark,"hide-underline":_vm.hideUnderline,"before":_vm.before,"after":_vm.after,"color":_vm.color,"no-parent-field":_vm.noParentField,"focused":_vm.focused,"focusable":"","length":_vm.length,"additional-length":_vm.additionalLength},nativeOn:{"click":function($event){return _vm.togglePopup($event)},"focus":function($event){return _vm.__onFocus($event)},"blur":function($event){return _vm.__onBlur($event)},"keydown":function($event){return _vm.__keyboardHandleKey($event)}}},[(_vm.hasChips)?_c('div',{staticClass:"col row items-center group q-input-chips",class:_vm.alignClass},_vm._l((_vm.selectedOptions),function(opt){return _c('q-chip',{key:opt.label,attrs:{"small":"","closable":!_vm.disable && !_vm.readonly && !opt.disable,"color":_vm.__getChipBgColor(opt.color),"text-color":_vm.__getChipTextColor(opt.color),"icon":opt.icon,"iconRight":opt.rightIcon,"avatar":opt.avatar},on:{"hide":function($event){_vm.__toggleMultiple(opt.value, _vm.disable || opt.disable);}},nativeOn:{"click":function($event){$event.stopPropagation();}}},[_vm._v(" "+_vm._s(opt.label)+" ")])})):_c('div',{staticClass:"col q-input-target ellipsis",class:_vm.fakeInputClasses},[_vm._v(" "+_vm._s(_vm.fakeInputValue)+" ")]),_vm._v(" "),(!_vm.disable && !_vm.readonly && _vm.clearable && _vm.length)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.input.clear},nativeOn:{"click":function($event){$event.stopPropagation();return _vm.clear($event)}},slot:"after"}):_vm._e(),_vm._v(" "),_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.input.dropdown},slot:"after"}),_vm._v(" "),_c('q-popover',{ref:"popover",staticClass:"column no-wrap",class:_vm.dark ? 'bg-dark' : null,attrs:{"fit":"","disable":_vm.readonly || _vm.disable,"anchor-click":false},on:{"show":_vm.__onShow,"hide":function($event){_vm.__onClose(true);}}},[(_vm.filter)?_c('q-search',{ref:"filter",staticClass:"col-auto",staticStyle:{"padding":"10px"},attrs:{"placeholder":_vm.filterPlaceholder || _vm.$q.i18n.label.filter,"debounce":100,"color":_vm.color,"dark":_vm.dark,"no-parent-field":"","no-icon":""},on:{"input":_vm.reposition},nativeOn:{"keydown":function($event){return _vm.__keyboardHandleKey($event)}},model:{value:(_vm.terms),callback:function ($$v) {_vm.terms=$$v;},expression:"terms"}}):_vm._e(),_vm._v(" "),(_vm.visibleOptions.length)?_c('q-list',{staticClass:"no-border scroll",attrs:{"separator":_vm.separator,"dark":_vm.dark}},[(_vm.multiple)?_vm._l((_vm.visibleOptions),function(opt,index){return _c('q-item-wrapper',{key:JSON.stringify(opt),class:[ opt.disable ? 'text-faded' : 'cursor-pointer', index === _vm.keyboardIndex ? 'q-select-highlight' : '' ],attrs:{"cfg":opt,"link":!opt.disable,"slot-replace":""},nativeOn:{"!click":function($event){_vm.__toggleMultiple(opt.value, opt.disable);},"mouseenter":function($event){return (function (e) { return !opt.disable && _vm.__mouseEnterHandler(e, index); })($event)}}},[(_vm.toggle)?_c('q-toggle',{attrs:{"slot":"right","keep-color":"","color":opt.color || _vm.color,"dark":_vm.dark,"value":_vm.optModel[opt.index],"disable":opt.disable,"no-focus":""},slot:"right"}):_c('q-checkbox',{attrs:{"slot":"left","keep-color":"","color":opt.color || _vm.color,"dark":_vm.dark,"value":_vm.optModel[opt.index],"disable":opt.disable,"no-focus":""},slot:"left"})],1)}):_vm._l((_vm.visibleOptions),function(opt,index){return _c('q-item-wrapper',{key:JSON.stringify(opt),class:[ opt.disable ? 'text-faded' : 'cursor-pointer', index === _vm.keyboardIndex ? 'q-select-highlight' : '' ],attrs:{"cfg":opt,"link":!opt.disable,"slot-replace":"","active":_vm.value === opt.value},nativeOn:{"!click":function($event){_vm.__singleSelect(opt.value, opt.disable);},"mouseenter":function($event){return (function (e) { return !opt.disable && _vm.__mouseEnterHandler(e, index); })($event)}}},[(_vm.radio)?_c('q-radio',{attrs:{"slot":"left","keep-color":"","color":opt.color || _vm.color,"value":_vm.value,"val":opt.value,"disable":opt.disable,"no-focus":""},slot:"left"}):_vm._e()],1)})],2):_vm._e()],1)],1)},staticRenderFns: [],
  name: 'QSelect',
  mixins: [FrameMixin, KeyboardSelectionMixin],
  components: {
    QSearch: QSearch,
    QPopover: QPopover,
    QList: QList,
    QItemWrapper: QItemWrapper,
    QCheckbox: QCheckbox,
    QRadio: QRadio,
    QToggle: QToggle,
    QIcon: QIcon,
    QInputFrame: QInputFrame,
    QChip: QChip
  },
  props: {
    filter: [Function, Boolean],
    filterPlaceholder: String,
    autofocusFilter: Boolean,
    radio: Boolean,
    placeholder: String,
    separator: Boolean,
    value: { required: true },
    multiple: Boolean,
    toggle: Boolean,
    chips: Boolean,
    readonly: Boolean,
    options: {
      type: Array,
      required: true,
      validator: function (v) { return v.every(function (o) { return 'label' in o && 'value' in o; }); }
    },
    chipsColor: String,
    chipsBgColor: String,
    displayValue: String,
    clearable: Boolean,
    clearValue: {}
  },
  data: function data () {
    return {
      model: this.multiple && Array.isArray(this.value)
        ? this.value.slice()
        : this.value,
      terms: '',
      focused: false
    }
  },
  watch: {
    value: function value (val) {
      this.model = this.multiple && Array.isArray(val)
        ? val.slice()
        : val;
    },
    keyboardIndex: function keyboardIndex (val) {
      var this$1 = this;

      if (this.$refs.popover.showing && this.keyboardMoveDirection && val > -1) {
        this.$nextTick(function () {
          var selected = this$1.$refs.popover.$el.querySelector('.q-select-highlight');
          if (selected && selected.scrollIntoView) {
            if (selected.scrollIntoViewIfNeeded) {
              return selected.scrollIntoViewIfNeeded(false)
            }
            selected.scrollIntoView(this$1.keyboardMoveDirection < 0);
          }
        });
      }
    },
    visibleOptions: function visibleOptions () {
      this.__keyboardCalcIndex();
    }
  },
  computed: {
    optModel: function optModel () {
      var this$1 = this;

      if (this.multiple) {
        return this.model.length > 0
          ? this.options.map(function (opt) { return this$1.model.includes(opt.value); })
          : this.options.map(function (opt) { return false; })
      }
    },
    visibleOptions: function visibleOptions () {
      var this$1 = this;

      var opts = this.options.map(function (opt, index) { return extend({}, opt, { index: index }); });
      if (this.filter && this.terms.length) {
        var lowerTerms = this.terms.toLowerCase();
        opts = opts.filter(function (opt) { return this$1.filterFn(lowerTerms, opt); });
      }
      return opts
    },
    keyboardMaxIndex: function keyboardMaxIndex () {
      return this.visibleOptions.length - 1
    },
    filterFn: function filterFn () {
      return typeof this.filter === 'boolean'
        ? defaultFilterFn
        : this.filter
    },
    actualValue: function actualValue () {
      var this$1 = this;

      if (this.displayValue) {
        return this.displayValue
      }
      if (!this.multiple) {
        var opt$1 = this.options.find(function (opt) { return opt.value === this$1.model; });
        return opt$1 ? opt$1.label : ''
      }

      var opt = this.selectedOptions.map(function (opt) { return opt.label; });
      return opt.length ? opt.join(', ') : ''
    },
    selectedOptions: function selectedOptions () {
      var this$1 = this;

      if (this.multiple) {
        return this.length > 0
          ? this.options.filter(function (opt) { return this$1.model.includes(opt.value); })
          : []
      }
    },
    hasChips: function hasChips () {
      return this.multiple && this.chips
    },
    length: function length () {
      return this.multiple
        ? this.model.length
        : ([null, undefined, ''].includes(this.model) ? 0 : 1)
    },
    additionalLength: function additionalLength () {
      return this.displayValue && this.displayValue.length > 0
    }
  },
  methods: {
    togglePopup: function togglePopup () {
      this[this.$refs.popover.showing ? 'hide' : 'show']();
    },
    show: function show () {
      this.__keyboardCalcIndex();
      return this.$refs.popover.show()
    },
    hide: function hide () {
      return this.$refs.popover.hide()
    },
    reposition: function reposition () {
      var popover = this.$refs.popover;
      if (popover.showing) {
        popover.reposition();
      }
    },

    __keyboardCalcIndex: function __keyboardCalcIndex () {
      var this$1 = this;

      this.keyboardIndex = -1;
      var sel = this.multiple ? this.selectedOptions.map(function (o) { return o.value; }) : [this.model];
      this.$nextTick(function () {
        var index = sel === void 0 ? -1 : Math.max(-1, this$1.visibleOptions.findIndex(function (opt) { return sel.includes(opt.value); }));
        if (index > -1) {
          this$1.keyboardMoveDirection = true;
          setTimeout(function () { this$1.keyboardMoveDirection = false; }, 500);
          this$1.__keyboardShow(index);
        }
      });
    },
    __keyboardCustomKeyHandle: function __keyboardCustomKeyHandle (key, e) {
      switch (key) {
        case 13: // ENTER key
        case 32: // SPACE key
          if (!this.$refs.popover.showing) {
            this.show();
          }
          break
      }
    },
    __keyboardShowTrigger: function __keyboardShowTrigger () {
      this.show();
    },
    __keyboardSetSelection: function __keyboardSetSelection (index) {
      var opt = this.visibleOptions[index];

      if (this.multiple) {
        this.__toggleMultiple(opt.value, opt.disable);
      }
      else {
        this.__singleSelect(opt.value, opt.disable);
      }
    },
    __keyboardIsSelectableIndex: function __keyboardIsSelectableIndex (index) {
      return index > -1 && index < this.visibleOptions.length && !this.visibleOptions[index].disable
    },
    __mouseEnterHandler: function __mouseEnterHandler (e, index) {
      if (!this.keyboardMoveDirection) {
        this.keyboardIndex = index;
      }
    },
    __onFocus: function __onFocus () {
      if (this.disable || this.focused) {
        return
      }
      this.focused = true;
      this.$emit('focus');
    },
    __onShow: function __onShow () {
      if (this.disable) {
        return
      }
      this.__onFocus();
      if (this.filter && this.autofocusFilter) {
        this.$refs.filter.focus();
      }
    },
    __onBlur: function __onBlur (e) {
      var this$1 = this;

      if (!this.focused) {
        return
      }
      setTimeout(function () {
        var el = document.activeElement;
        if (
          !this$1.$refs.popover ||
          !this$1.$refs.popover.showing ||
          (el !== document.body && !this$1.$refs.popover.$el.contains(el))
        ) {
          this$1.__onClose();
          this$1.hide();
        }
      }, 1);
    },
    __onClose: function __onClose (keepFocus) {
      var this$1 = this;

      this.$nextTick(function () {
        if (JSON.stringify(this$1.model) !== JSON.stringify(this$1.value)) {
          this$1.$emit('change', this$1.model);
        }
      });
      this.terms = '';
      if (keepFocus) {
        this.$refs.input && this.$refs.input.$el && this.$refs.input.$el.focus();
        return
      }
      this.focused = false;
      this.$emit('blur');
    },
    __singleSelect: function __singleSelect (val, disable) {
      if (disable) {
        return
      }
      this.__emit(val);
      this.hide();
    },
    __toggleMultiple: function __toggleMultiple (value, disable) {
      if (disable) {
        return
      }
      var
        model = this.model,
        index = model.indexOf(value);

      if (index > -1) {
        model.splice(index, 1);
      }
      else {
        model.push(value);
      }

      this.$emit('input', model);
    },
    __emit: function __emit (value) {
      var this$1 = this;

      this.$emit('input', value);
      this.$nextTick(function () {
        if (JSON.stringify(value) !== JSON.stringify(this$1.value)) {
          this$1.$emit('change', value);
        }
      });
    },
    __setModel: function __setModel (val, forceUpdate) {
      this.model = val || (this.multiple ? [] : null);
      this.$emit('input', this.model);
      if (forceUpdate || !this.$refs.popover.showing) {
        this.__onClose();
      }
    },
    __getChipTextColor: function __getChipTextColor (optColor) {
      if (this.chipsColor) {
        return this.chipsColor
      }
      if (this.isInvertedLight) {
        return this.invertedLight ? optColor || this.color : 'white'
      }
      if (this.isInverted) {
        return optColor || (this.invertedLight ? 'grey-10' : this.color)
      }
      return this.dark
        ? optColor || this.color
        : 'white'
    },
    __getChipBgColor: function __getChipBgColor (optColor) {
      if (this.chipsBgColor) {
        return this.chipsBgColor
      }
      if (this.isInvertedLight) {
        return this.invertedLight ? 'grey-10' : optColor || this.color
      }
      if (this.isInverted) {
        return this.invertedLight ? this.color : 'white'
      }
      return this.dark
        ? 'white'
        : optColor || this.color
    }
  }
}

var StepTab = {
  name: 'QStepTab',
  components: {
    QIcon: QIcon
  },
  directives: {
    Ripple: Ripple
  },
  props: ['vm'],
  computed: {
    hasNavigation: function hasNavigation () {
      return !this.vm.__stepper.noHeaderNavigation
    },
    classes: function classes () {
      return {
        'step-error': this.vm.error,
        'step-active': this.vm.active,
        'step-done': this.vm.done,
        'step-navigation': this.vm.done && this.hasNavigation,
        'step-waiting': this.vm.waiting,
        'step-disabled': this.vm.disable,
        'step-colored': this.vm.active || this.vm.done,
        'items-center': !this.vm.__stepper.vertical,
        'items-start': this.vm.__stepper.vertical,
        'q-stepper-first': this.vm.first,
        'q-stepper-last': this.vm.last
      }
    }
  },
  methods: {
    __select: function __select () {
      if (this.hasNavigation) {
        this.vm.select();
      }
    }
  },
  render: function render (h) {
    var icon = this.vm.stepIcon
      ? h(QIcon, { props: { name: this.vm.stepIcon } })
      : h('span', [ (this.vm.innerOrder + 1) ]);

    return h('div', {
      staticClass: 'q-stepper-tab col-grow flex no-wrap relative-position',
      'class': this.classes,
      on: {
        click: this.__select
      },
      directives: null
    }, [
      h('div', { staticClass: 'q-stepper-dot row flex-center q-stepper-line relative-position' }, [
        h('span', { staticClass: 'row flex-center' }, [ icon ])
      ]),
      this.vm.title
        ? h('div', {
          staticClass: 'q-stepper-label q-stepper-line relative-position'
        }, [
          h('div', { staticClass: 'q-stepper-title' }, [ this.vm.title ]),
          h('div', { staticClass: 'q-stepper-subtitle' }, [ this.vm.subtitle ])
        ])
        : null
    ])
  }
}

var QStep = {
  name: 'QStep',
  inject: {
    __stepper: {
      default: function default$1 () {
        console.error('QStep needs to be child of QStepper');
      }
    }
  },
  props: {
    name: {
      type: [Number, String],
      default: function default$2 () {
        return uid()
      }
    },
    default: Boolean,
    title: {
      type: String,
      required: true
    },
    subtitle: String,
    icon: String,
    order: [Number, String],
    error: Boolean,
    activeIcon: String,
    errorIcon: String,
    doneIcon: String,
    disable: Boolean
  },
  watch: {
    order: function order () {
      this.__stepper.__sortSteps();
    }
  },
  data: function data () {
    return {
      innerOrder: 0,
      first: false,
      last: false
    }
  },
  computed: {
    stepIcon: function stepIcon () {
      var data = this.__stepper;

      if (this.active) {
        return this.activeIcon || data.activeIcon || this.$q.icon.stepper.active
      }
      if (this.error) {
        return this.errorIcon || data.errorIcon || this.$q.icon.stepper.error
      }
      if (this.done && !this.disable) {
        return this.doneIcon || data.doneIcon || this.$q.icon.stepper.done
      }

      return this.icon
    },
    actualOrder: function actualOrder () {
      return parseInt(this.order || this.innerOrder, 10)
    },
    active: function active () {
      return this.__stepper.step === this.name
    },
    done: function done () {
      return !this.disable && this.__stepper.currentOrder > this.innerOrder
    },
    waiting: function waiting () {
      return !this.disable && this.__stepper.currentOrder < this.innerOrder
    },
    style: function style () {
      var ord = this.actualOrder;
      return {
        '-webkit-box-ordinal-group': ord,
        '-ms-flex-order': ord,
        order: ord
      }
    }
  },
  methods: {
    select: function select () {
      if (this.done) {
        this.__stepper.goToStep(this.name);
      }
    }
  },
  mounted: function mounted () {
    this.__stepper.__registerStep(this);
    if (this.default) {
      this.select();
    }
  },
  beforeDestroy: function beforeDestroy () {
    this.__stepper.__unregisterStep(this);
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-stepper-step',
      style: this.style
    }, [
      this.__stepper.vertical
        ? h(StepTab, { props: { vm: this } })
        : null,
      h(QSlideTransition, [
        this.active
          ? h('div', {
            staticClass: 'q-stepper-step-content'
          }, [
            h('div', { staticClass: 'q-stepper-step-inner' }, [
              this.$slots.default
            ])
          ])
          : null
      ])
    ])
  }
}

var QStepper = {
  name: 'QStepper',
  components: {
    StepTab: StepTab
  },
  props: {
    value: [Number, String],
    color: {
      type: String,
      default: 'primary'
    },
    vertical: Boolean,
    alternativeLabels: Boolean,
    noHeaderNavigation: Boolean,
    contractable: Boolean,
    doneIcon: Boolean,
    activeIcon: Boolean,
    errorIcon: Boolean
  },
  data: function data () {
    return {
      step: this.value || null,
      steps: []
    }
  },
  provide: function provide () {
    return {
      __stepper: this
    }
  },
  watch: {
    value: function value (v) {
      this.goToStep(v);
    }
  },
  computed: {
    classes: function classes () {
      var cls = [
        ("q-stepper-" + (this.vertical ? 'vertical' : 'horizontal')),
        ("text-" + (this.color))
      ];
      this.contractable && cls.push("q-stepper-contractable");
      return cls
    },
    hasSteps: function hasSteps () {
      return this.steps.length > 0
    },
    currentStep: function currentStep () {
      var this$1 = this;

      if (this.hasSteps) {
        return this.steps.find(function (step) { return step.name === this$1.step; })
      }
    },
    currentOrder: function currentOrder () {
      if (this.currentStep) {
        return this.currentStep.innerOrder
      }
    },
    length: function length () {
      return this.steps.length
    }
  },
  methods: {
    goToStep: function goToStep (value) {
      var this$1 = this;

      if (this.step === value || value === void 0) {
        return
      }

      this.step = value;

      this.$emit('input', value);
      this.$emit('step', value);
      this.$nextTick(function () {
        if (JSON.stringify(value) !== JSON.stringify(this$1.value)) {
          this$1.$emit('change', value);
        }
      });
    },
    next: function next () {
      this.__go(1);
    },
    previous: function previous () {
      this.__go(-1);
    },
    reset: function reset () {
      if (this.hasSteps) {
        this.goToStep(this.steps[0].name);
      }
    },

    __go: function __go (offset) {
      var
        name,
        index = this.currentOrder;

      if (index === void 0) {
        if (!this.hasSteps) {
          return
        }
        name = this.steps[0].name;
      }
      else {
        do {
          index += offset;
        } while (index >= 0 && index < this.length - 1 && this.steps[index].disable)
        if (index < 0 || index > this.length - 1 || this.steps[index].disable) {
          return
        }
        name = this.steps[index].name;
      }

      this.goToStep(name);
    },
    __sortSteps: function __sortSteps () {
      var this$1 = this;

      this.steps.sort(function (a, b) {
        return a.actualOrder - b.actualOrder
      });
      var last = this.steps.length - 1;
      this.steps.forEach(function (step, index) {
        step.innerOrder = index;
        step.first = index === 0;
        step.last = index === last;
      });
      this.$nextTick(function () {
        if (!this$1.steps.some(function (step) { return step.active; })) {
          this$1.goToStep(this$1.steps[0].name);
        }
      });
    },
    __registerStep: function __registerStep (vm) {
      this.steps.push(vm);
      this.__sortSteps();
      return this
    },
    __unregisterStep: function __unregisterStep (vm) {
      this.steps = this.steps.filter(function (step) { return step !== vm; });
    }
  },
  created: function created () {
    this.__sortSteps = frameDebounce(this.__sortSteps);
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-stepper column overflow-hidden relative-position',
      'class': this.classes
    }, [
      this.vertical
        ? null
        : h('div', {
          staticClass: 'q-stepper-header row items-stretch justify-between shadow-1',
          'class': { 'alternative-labels': this.alternativeLabels }
        },
        this.steps.map(function (step) { return h(StepTab, {
          key: step.name,
          props: {
            vm: step
          }
        }); })),
      this.$slots.default
    ])
  }
}

var QStepperNavigation = {
  name: 'QStepperNavigation',
  render: function render (h) {
    return h('div', {
      staticClass: 'q-stepper-nav order-last row items-center'
    }, [
      this.$slots.left,
      h('div', { staticClass: 'col' }),
      this.$slots.default
    ])
  }
}

var TabMixin = {
  directives: {
    Ripple: Ripple
  },
  props: {
    label: String,
    icon: String,
    disable: Boolean,
    hidden: Boolean,
    hide: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: function default$1 () {
        return uid()
      }
    },
    alert: Boolean,
    count: [Number, String],
    color: String
  },
  inject: {
    data: {
      default: function default$2 () {
        console.error('QTab/QRouteTab components need to be child of QTabs');
      }
    },
    selectTab: {}
  },
  watch: {
    active: function active (val) {
      if (val) {
        this.$emit('select', this.name);
      }
    }
  },
  computed: {
    active: function active () {
      return this.data.tabName === this.name
    },
    classes: function classes () {
      var cls = {
        active: this.active,
        hidden: this.hidden,
        disabled: this.disable,
        'q-tab-only-label': !this.icon && this.label,
        'hide-icon': this.hide === 'icon',
        'hide-label': this.hide === 'label'
      };

      var color = this.data.inverted
        ? this.color || this.data.textColor || this.data.color
        : this.color;

      if (color) {
        cls[("text-" + color)] = this.active;
      }

      return cls
    },
    barStyle: function barStyle () {
      if (!this.active || !this.data.highlight) {
        return 'display: none;'
      }
    }
  },
  methods: {
    __getTabContent: function __getTabContent (h) {
      var child = [];

      this.icon && child.push(h(QIcon, {
        staticClass: 'q-tab-icon',
        props: {
          name: this.icon
        }
      }));

      this.label && child.push(h('div', {
        staticClass: 'q-tab-label',
        domProps: {
          innerHTML: this.label
        }
      }));

      if (this.count) {
        child.push(h(QChip, {
          props: {
            floating: true
          }
        }, [ this.count ]));
      }
      else if (this.alert) {
        child.push(h('div', {
          staticClass: 'q-dot'
        }));
      }

      child.push(this.$slots.default);

      return child
    }
  }
}

var QRouteTab = {
  name: 'QRouteTab',
  mixins: [TabMixin, RouterLinkMixin],
  inject: {
    selectTabRouter: {}
  },
  watch: {
    $route: function $route () {
      this.checkIfSelected();
    }
  },
  methods: {
    select: function select () {
      this.$emit('click', this.name);
      if (!this.disable) {
        this.$el.dispatchEvent(evt);
        this.selectTabRouter({ value: this.name, selected: true });
      }
    },
    checkIfSelected: function checkIfSelected () {
      var this$1 = this;

      this.$nextTick(function () {
        if (this$1.$el.classList.contains('q-router-link-exact-active')) {
          this$1.selectTabRouter({ value: this$1.name, selectable: true, exact: true });
        }
        else if (this$1.$el.classList.contains('q-router-link-active')) {
          var path = this$1.$router.resolve(this$1.to, undefined, this$1.append);
          this$1.selectTabRouter({ value: this$1.name, selectable: true, priority: path.href.length });
        }
        else if (this$1.active) {
          this$1.selectTabRouter({ value: null });
        }
      });
    }
  },
  created: function created () {
    this.checkIfSelected();
  },
  render: function render (h) {
    return h('router-link', {
      props: {
        tag: 'div',
        to: this.to,
        exact: this.exact,
        append: this.append,
        replace: this.replace,
        event: routerLinkEventName,
        activeClass: 'q-router-link-active',
        exactActiveClass: 'q-router-link-exact-active'
      },
      nativeOn: {
        click: this.select
      },
      staticClass: 'q-tab column flex-center relative-position',
      'class': this.classes,
      directives: null
    }, this.__getTabContent(h))
  }
}

var QTab = {
  name: 'QTab',
  mixins: [TabMixin],
  props: {
    default: Boolean
  },
  methods: {
    select: function select () {
      this.$emit('click', this.name);
      if (!this.disable) {
        this.selectTab(this.name);
      }
    }
  },
  mounted: function mounted () {
    if (this.default && !this.disable) {
      this.select();
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-tab column flex-center relative-position',
      'class': this.classes,
      on: {
        click: this.select
      },
      directives: null
    }, this.__getTabContent(h))
  }
}

var QTabPane = {
  name: 'QTabPane',
  inject: {
    data: {
      default: function default$1 () {
        console.error('QTabPane needs to be child of QTabs');
      }
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    keepAlive: Boolean
  },
  data: function data () {
    return {
      shown: false
    }
  },
  computed: {
    active: function active () {
      return this.data.tabName === this.name
    }
  },
  render: function render (h) {
    var node = h('div', {staticClass: 'q-tab-pane', 'class': {hidden: !this.active}}, [this.$slots.default]);
    if (this.keepAlive) {
      if (!this.shown && !this.active) {
        return
      }
      this.shown = true;
      return node
    }
    else {
      this.shown = this.active;
      if (this.active) {
        return node
      }
    }
  }
}

var
  scrollNavigationSpeed = 5, // in pixels
  debounceDelay = 50; // in ms

var QTabs = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-tabs flex no-wrap",class:_vm.classes},[_c('div',{ref:"tabs",staticClass:"q-tabs-head row",class:_vm.innerClasses},[_c('div',{ref:"scroller",staticClass:"q-tabs-scroller row no-wrap"},[_vm._t("title"),_vm._v(" "),(_vm.$q.theme !== 'ios')?_c('div',{staticClass:"relative-position self-stretch q-tabs-global-bar-container",class:_vm.posbarClasses},[_c('div',{ref:"posbar",staticClass:"q-tabs-bar q-tabs-global-bar",on:{"transitionend":_vm.__updatePosbarTransition}})]):_vm._e()],2),_vm._v(" "),_c('div',{ref:"leftScroll",staticClass:"row flex-center q-tabs-left-scroll",on:{"mousedown":function($event){_vm.__animScrollTo(0);},"touchstart":function($event){_vm.__animScrollTo(0);},"mouseup":_vm.__stopAnimScroll,"mouseleave":_vm.__stopAnimScroll,"touchend":_vm.__stopAnimScroll}},[_c('q-icon',{attrs:{"name":_vm.$q.icon.tabs.left}})],1),_vm._v(" "),_c('div',{ref:"rightScroll",staticClass:"row flex-center q-tabs-right-scroll",on:{"mousedown":function($event){_vm.__animScrollTo(9999);},"touchstart":function($event){_vm.__animScrollTo(9999);},"mouseup":_vm.__stopAnimScroll,"mouseleave":_vm.__stopAnimScroll,"touchend":_vm.__stopAnimScroll}},[_c('q-icon',{attrs:{"name":_vm.$q.icon.tabs.right}})],1)]),_vm._v(" "),_c('div',{staticClass:"q-tabs-panes"},[_vm._t("default")],2)])},staticRenderFns: [],
  name: 'QTabs',
  provide: function provide () {
    return {
      data: this.data,
      selectTab: this.selectTab,
      selectTabRouter: this.selectTabRouter
    }
  },
  components: {
    QIcon: QIcon
  },
  props: {
    value: String,
    align: {
      type: String,
      default: 'center',
      validator: function (v) { return ['left', 'center', 'right', 'justify'].includes(v); }
    },
    position: {
      type: String,
      default: 'top',
      validator: function (v) { return ['top', 'bottom'].includes(v); }
    },
    color: {
      type: String,
      default: 'primary'
    },
    textColor: String,
    inverted: Boolean,
    twoLines: Boolean,
    noPaneBorder: Boolean,
    glossy: Boolean
  },
  data: function data () {
    return {
      currentEl: null,
      posbar: {
        width: 0,
        left: 0
      },
      data: {
        highlight: true,
        tabName: this.value || '',
        color: this.color,
        textColor: this.textColor,
        inverted: this.inverted
      }
    }
  },
  watch: {
    value: function value (name) {
      this.selectTab(name);
    },
    color: function color (v) {
      this.data.color = v;
    },
    textColor: function textColor (v) {
      this.data.textColor = v;
    },
    inverted: function inverted (v) {
      this.data.inverted = v;
    }
  },
  computed: {
    classes: function classes () {
      return [
        ("q-tabs-position-" + (this.position)),
        ("q-tabs-" + (this.inverted ? 'inverted' : 'normal')),
        this.noPaneBorder ? 'q-tabs-no-pane-border' : '',
        this.twoLines ? 'q-tabs-two-lines' : ''
      ]
    },
    innerClasses: function innerClasses () {
      var cls = [ ("q-tabs-align-" + (this.align)) ];
      this.glossy && cls.push('glossy');
      if (this.inverted) {
        cls.push(("text-" + (this.textColor || this.color)));
      }
      else {
        cls.push(("bg-" + (this.color)));
        cls.push(("text-" + (this.textColor || 'white')));
      }
      return cls
    },
    posbarClasses: function posbarClasses () {
      var cls = [];
      this.inverted && cls.push(("text-" + (this.textColor || this.color)));
      this.data.highlight && cls.push('highlight');
      return cls
    }
  },
  methods: {
    selectTab: function selectTab (value) {
      if (this.data.tabName === value) {
        return
      }

      this.data.tabName = value;
      this.$emit('input', value);
      this.$emit('select', value);

      var el = this.__getTabElByName(value);

      if (el) {
        this.__scrollToTab(el);
      }
      else {
        this.oldEl = null;
      }
    },
    selectTabRouter: function selectTabRouter (params) {
      var this$1 = this;

      var value = params.value;
      var selectable = params.selectable;
      var exact = params.exact;
      var selected = params.selected;
      var priority = params.priority;
      var first = !this.buffer.length,
        existingIndex = first ? -1 : this.buffer.findIndex(function (t) { return t.value === value; });

      if (existingIndex > -1) {
        var buffer = this.buffer[existingIndex];
        exact && (buffer.exact = exact);
        selectable && (buffer.selectable = selectable);
        selected && (buffer.selected = selected);
        priority && (buffer.priority = priority);
      }
      else {
        this.buffer.push(params);
      }

      if (first) {
        this.bufferTimer = setTimeout(function () {
          var tab = this$1.buffer.find(function (t) { return t.exact && t.selected; }) ||
            this$1.buffer.find(function (t) { return t.selectable && t.selected; }) ||
            this$1.buffer.find(function (t) { return t.exact; }) ||
            this$1.buffer.filter(function (t) { return t.selectable; }).sort(function (t1, t2) { return t2.priority - t1.priority; })[0] ||
            this$1.buffer[0];

          this$1.buffer.length = 0;
          this$1.selectTab(tab.value);
        }, 100);
      }
    },
    __repositionBar: function __repositionBar () {
      var this$1 = this;

      clearTimeout(this.timer);

      var needsUpdate = false;
      var
        ref = this.$refs.posbar,
        el = this.currentEl;

      if (this.data.highlight !== false) {
        this.data.highlight = false;
        needsUpdate = true;
      }

      if (!el) {
        this.finalPosbar = {width: 0, left: 0};
        this.__setPositionBar(0, 0);
        return
      }

      var offsetReference = ref.parentNode.offsetLeft;

      if (needsUpdate && this.oldEl) {
        this.__setPositionBar(
          this.oldEl.getBoundingClientRect().width,
          this.oldEl.offsetLeft - offsetReference
        );
      }

      this.timer = setTimeout(function () {
        var
          width$$1 = el.getBoundingClientRect().width,
          left = el.offsetLeft - offsetReference;

        ref.classList.remove('contract');
        this$1.oldEl = el;
        this$1.finalPosbar = {width: width$$1, left: left};
        this$1.__setPositionBar(
          this$1.posbar.left < left
            ? left + width$$1 - this$1.posbar.left
            : this$1.posbar.left + this$1.posbar.width - left,
          this$1.posbar.left < left
            ? this$1.posbar.left
            : left
        );
      }, 20);
    },
    __setPositionBar: function __setPositionBar (width$$1, left) {
      if ( width$$1 === void 0 ) width$$1 = 0;
      if ( left === void 0 ) left = 0;

      if (this.posbar.width === width$$1 && this.posbar.left === left) {
        this.__updatePosbarTransition();
        return
      }
      this.posbar = {width: width$$1, left: left};
      var xPos = this.$q.i18n.rtl
        ? left + width$$1
        : left;
      css(this.$refs.posbar, cssTransform(("translateX(" + xPos + "px) scaleX(" + width$$1 + ")")));
    },
    __updatePosbarTransition: function __updatePosbarTransition () {
      if (
        this.finalPosbar.width === this.posbar.width &&
        this.finalPosbar.left === this.posbar.left
      ) {
        this.posbar = {};
        if (this.data.highlight !== true) {
          this.data.highlight = true;
        }
        return
      }

      this.$refs.posbar.classList.add('contract');
      this.__setPositionBar(this.finalPosbar.width, this.finalPosbar.left);
    },
    __redraw: function __redraw () {
      if (!this.$q.platform.is.desktop) {
        return
      }
      this.scrollerWidth = width(this.$refs.scroller);
      if (this.scrollerWidth === 0 && this.$refs.scroller.scrollWidth === 0) {
        return
      }
      if (this.scrollerWidth + 5 < this.$refs.scroller.scrollWidth) {
        this.$refs.tabs.classList.add('scrollable');
        this.scrollable = true;
        this.__updateScrollIndicator();
      }
      else {
        this.$refs.tabs.classList.remove('scrollable');
        this.scrollable = false;
      }
    },
    __updateScrollIndicator: function __updateScrollIndicator () {
      if (!this.$q.platform.is.desktop || !this.scrollable) {
        return
      }
      var action = this.$refs.scroller.scrollLeft + width(this.$refs.scroller) + 5 >= this.$refs.scroller.scrollWidth ? 'add' : 'remove';
      this.$refs.leftScroll.classList[this.$refs.scroller.scrollLeft <= 0 ? 'add' : 'remove']('disabled');
      this.$refs.rightScroll.classList[action]('disabled');
    },
    __getTabElByName: function __getTabElByName (value) {
      var tab = this.$children.find(function (child) { return child.name === value && child.$el && child.$el.nodeType === 1; });
      if (tab) {
        return tab.$el
      }
    },
    __findTabAndScroll: function __findTabAndScroll (name, noAnimation) {
      var this$1 = this;

      setTimeout(function () {
        this$1.__scrollToTab(this$1.__getTabElByName(name), noAnimation);
      }, debounceDelay * 4);
    },
    __scrollToTab: function __scrollToTab (tab, noAnimation) {
      if (!tab || !this.scrollable) {
        return
      }

      var
        contentRect = this.$refs.scroller.getBoundingClientRect(),
        rect = tab.getBoundingClientRect(),
        tabWidth = rect.width,
        offset$$1 = rect.left - contentRect.left;

      if (offset$$1 < 0) {
        if (noAnimation) {
          this.$refs.scroller.scrollLeft += offset$$1;
        }
        else {
          this.__animScrollTo(this.$refs.scroller.scrollLeft + offset$$1);
        }
        return
      }

      offset$$1 += tabWidth - this.$refs.scroller.offsetWidth;
      if (offset$$1 > 0) {
        if (noAnimation) {
          this.$refs.scroller.scrollLeft += offset$$1;
        }
        else {
          this.__animScrollTo(this.$refs.scroller.scrollLeft + offset$$1);
        }
      }
    },
    __animScrollTo: function __animScrollTo (value) {
      var this$1 = this;

      this.__stopAnimScroll();
      this.__scrollTowards(value);

      this.scrollTimer = setInterval(function () {
        if (this$1.__scrollTowards(value)) {
          this$1.__stopAnimScroll();
        }
      }, 5);
    },
    __stopAnimScroll: function __stopAnimScroll () {
      clearInterval(this.scrollTimer);
    },
    __scrollTowards: function __scrollTowards (value) {
      var
        scrollPosition = this.$refs.scroller.scrollLeft,
        direction = value < scrollPosition ? -1 : 1,
        done = false;

      scrollPosition += direction * scrollNavigationSpeed;
      if (scrollPosition < 0) {
        done = true;
        scrollPosition = 0;
      }
      else if (
        (direction === -1 && scrollPosition <= value) ||
        (direction === 1 && scrollPosition >= value)
      ) {
        done = true;
        scrollPosition = value;
      }

      this.$refs.scroller.scrollLeft = scrollPosition;
      return done
    }
  },
  created: function created () {
    this.timer = null;
    this.scrollTimer = null;
    this.bufferTimer = null;
    this.buffer = [];
    this.scrollable = !this.$q.platform.is.desktop;

    // debounce some costly methods;
    // debouncing here because debounce needs to be per instance
    this.__redraw = debounce(this.__redraw, debounceDelay);
    this.__updateScrollIndicator = debounce(this.__updateScrollIndicator, debounceDelay);
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      if (!this$1.$refs.scroller) {
        return
      }
      this$1.$refs.scroller.addEventListener('scroll', this$1.__updateScrollIndicator, listenOpts.passive);
      window.addEventListener('resize', this$1.__redraw, listenOpts.passive);

      if (this$1.data.tabName !== '' && this$1.value) {
        this$1.selectTab(this$1.value);
      }

      this$1.__redraw();
      this$1.__findTabAndScroll(this$1.data.tabName, true);
    });
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
    clearTimeout(this.bufferTimer);
    this.__stopAnimScroll();
    this.$refs.scroller.removeEventListener('scroll', this.__updateScrollIndicator, listenOpts.passive);
    window.removeEventListener('resize', this.__redraw, listenOpts.passive);
    this.__redraw.cancel();
    this.__updateScrollIndicator.cancel();
  }
}

var Top = {
  computed: {
    marginalsProps: function marginalsProps () {
      return {
        pagination: this.computedPagination,
        pagesNumber: this.pagesNumber,
        isFirstPage: this.isFirstPage,
        isLastPage: this.isLastPage,
        prevPage: this.prevPage,
        nextPage: this.nextPage,

        inFullscreen: this.inFullscreen,
        toggleFullscreen: this.toggleFullscreen
      }
    }
  },
  methods: {
    getTop: function getTop (h) {
      var
        top = this.$scopedSlots.top,
        topLeft = this.$scopedSlots['top-left'],
        topRight = this.$scopedSlots['top-right'],
        topSelection = this.$scopedSlots['top-selection'],
        hasSelection = this.hasSelectionMode && topSelection && this.rowsSelectedNumber > 0,
        staticClass = 'q-table-top relative-position row items-center',
        child = [];

      if (top) {
        return h('div', { staticClass: staticClass }, [ top(this.marginalsProps) ])
      }

      if (hasSelection) {
        child.push(topSelection(this.marginalsProps));
      }
      else {
        if (topLeft) {
          child.push(
            h('div', { staticClass: 'q-table-control' }, [
              topLeft(this.marginalsProps)
            ])
          );
        }
        else if (this.title) {
          child.push(
            h('div', { staticClass: 'q-table-control' }, [
              h('div', { staticClass: 'q-table-title' }, this.title)
            ])
          );
        }
      }

      if (topRight) {
        child.push(h('div', { staticClass: 'q-table-separator col' }));
        child.push(
          h('div', { staticClass: 'q-table-control' }, [
            topRight(this.marginalsProps)
          ])
        );
      }

      if (child.length === 0) {
        return
      }

      return h('div', { staticClass: staticClass }, child)
    }
  }
}

var QTh = {
  name: 'QTh',
  props: {
    props: Object,
    autoWidth: Boolean
  },
  render: function render (h) {
    var this$1 = this;

    if (!this.props) {
      return h('td', {
        'class': { 'q-table-col-auto-width': this.autoWidth }
      }, [ this.$slots.default ])
    }

    var col;
    var
      name = this.$vnode.key,
      child = [ this.$slots.default ];

    if (name) {
      col = this.props.colsMap[name];
      if (!col) { return }
    }
    else {
      col = this.props.col;
    }

    if (col.sortable) {
      var action = col.align === 'right'
        ? 'unshift'
        : 'push';

      child[action](
        h(QIcon, {
          props: { name: this.$q.icon.table.arrowUp },
          staticClass: col.__iconClass
        })
      );
    }

    return h('th', {
      'class': [col.__thClass, {
        'q-table-col-auto-width': this.autoWidth
      }],
      on: col.sortable
        ? { click: function () { this$1.props.sort(col); } }
        : null
    }, child)
  }
}

var TableHeader = {
  methods: {
    getTableHeader: function getTableHeader (h) {
      if (this.hideHeader) {
        return
      }

      var child = [ this.getTableHeaderRow(h) ];

      if (this.loading) {
        child.push(h('tr', { staticClass: 'q-table-progress animate-fade' }, [
          h('td', { attrs: {colspan: '100%'} }, [
            h(QProgress, {
              props: {
                color: this.color,
                indeterminate: true,
                height: '2px'
              }
            })
          ])
        ]));
      }

      return h('thead', child)
    },
    getTableHeaderRow: function getTableHeaderRow (h) {
      var this$1 = this;

      var
        header = this.$scopedSlots.header,
        headerCell = this.$scopedSlots['header-cell'];

      if (header) {
        return header(this.addTableHeaderRowMeta({header: true, cols: this.computedCols, sort: this.sort, colsMap: this.computedColsMap}))
      }

      var mapFn;

      if (headerCell) {
        mapFn = function (col) { return headerCell({col: col, cols: this$1.computedCols, sort: this$1.sort, colsMap: this$1.computedColsMap}); };
      }
      else {
        mapFn = function (col) { return h(QTh, {
          key: col.name,
          props: {
            props: {
              col: col,
              cols: this$1.computedCols,
              sort: this$1.sort,
              colsMap: this$1.computedColsMap
            }
          }
        }, col.label); };
      }
      var child = this.computedCols.map(mapFn);

      if (this.singleSelection) {
        child.unshift(h('th', { staticClass: 'q-table-col-auto-width' }, [' ']));
      }
      else if (this.multipleSelection) {
        child.unshift(h('th', { staticClass: 'q-table-col-auto-width' }, [
          h(QCheckbox, {
            props: {
              color: this.color,
              value: this.someRowsSelected ? null : this.allRowsSelected,
              dark: this.dark
            },
            on: {
              input: function (val) {
                if (this$1.someRowsSelected) {
                  val = false;
                }
                this$1.__updateSelection(
                  this$1.computedRows.map(function (row) { return row[this$1.rowKey]; }),
                  this$1.computedRows,
                  val
                );
              }
            }
          })
        ]));
      }

      return h('tr', child)
    },
    addTableHeaderRowMeta: function addTableHeaderRowMeta (data) {
      var this$1 = this;

      if (this.multipleSelection) {
        Object.defineProperty(data, 'selected', {
          get: function () { return this$1.someRowsSelected ? 'some' : this$1.allRowsSelected; },
          set: function (val) {
            if (this$1.someRowsSelected) {
              val = false;
            }
            this$1.__updateSelection(
              this$1.computedRows.map(function (row) { return row[this$1.rowKey]; }),
              this$1.computedRows,
              val
            );
          }
        });
        data.partialSelected = this.someRowsSelected;
        data.multipleSelect = true;
      }

      return data
    }
  }
}

var TableBody = {
  methods: {
    getTableBody: function getTableBody (h) {
      var this$1 = this;

      var
        body = this.$scopedSlots.body,
        bodyCell = this.$scopedSlots['body-cell'],
        topRow = this.$scopedSlots['top-row'],
        bottomRow = this.$scopedSlots['bottom-row'];
      var
        child = [];

      if (body) {
        child = this.computedRows.map(function (row) {
          var
            key = row[this$1.rowKey],
            selected = this$1.isRowSelected(key);

          return body(this$1.addBodyRowMeta({
            key: key,
            row: row,
            cols: this$1.computedCols,
            colsMap: this$1.computedColsMap,
            __trClass: selected ? 'selected' : ''
          }))
        });
      }
      else {
        child = this.computedRows.map(function (row) {
          var
            key = row[this$1.rowKey],
            selected = this$1.isRowSelected(key),
            child = bodyCell
              ? this$1.computedCols.map(function (col) { return bodyCell(this$1.addBodyCellMetaData({ row: row, col: col })); })
              : this$1.computedCols.map(function (col) {
                var slot = this$1.$scopedSlots[("body-cell-" + (col.name))];
                return slot
                  ? slot(this$1.addBodyCellMetaData({ row: row, col: col }))
                  : h('td', { staticClass: col.__tdClass }, this$1.getCellValue(col, row))
              });

          if (this$1.hasSelectionMode) {
            child.unshift(h('td', { staticClass: 'q-table-col-auto-width' }, [
              h(QCheckbox, {
                props: {
                  value: selected,
                  color: this$1.color,
                  dark: this$1.dark
                },
                on: {
                  input: function (adding) {
                    this$1.__updateSelection([key], [row], adding);
                  }
                }
              })
            ]));
          }

          return h('tr', { key: key, 'class': { selected: selected } }, child)
        });
      }

      if (topRow) {
        child.unshift(topRow({cols: this.computedCols}));
      }
      if (bottomRow) {
        child.push(bottomRow({cols: this.computedCols}));
      }

      return h('tbody', child)
    },
    addBodyRowMeta: function addBodyRowMeta (data) {
      var this$1 = this;

      if (this.hasSelectionMode) {
        Object.defineProperty(data, 'selected', {
          get: function () { return this$1.isRowSelected(data.key); },
          set: function (adding) {
            this$1.__updateSelection([data.key], [data.row], adding);
          }
        });
      }

      Object.defineProperty(data, 'expand', {
        get: function () { return this$1.rowsExpanded[data.key] === true; },
        set: function (val) {
          this$1.$set(this$1.rowsExpanded, data.key, val);
        }
      });

      data.cols = data.cols.map(function (col) {
        var c = extend({}, col);
        Object.defineProperty(c, 'value', {
          get: function () { return this$1.getCellValue(col, data.row); }
        });
        return c
      });

      return data
    },
    addBodyCellMetaData: function addBodyCellMetaData (data) {
      var this$1 = this;

      Object.defineProperty(data, 'value', {
        get: function () { return this$1.getCellValue(data.col, data.row); }
      });
      return data
    },
    getCellValue: function getCellValue (col, row) {
      var val = typeof col.field === 'function' ? col.field(row) : row[col.field];
      return col.format ? col.format(val) : val
    }
  }
}

var Bottom = {
  computed: {
    navIcon: function navIcon () {
      var ico = [ this.$q.icon.table.prevPage, this.$q.icon.table.nextPage ];
      return this.$q.i18n.rtl ? ico.reverse() : ico
    }
  },
  methods: {
    getBottom: function getBottom (h) {
      if (this.hideBottom) {
        return
      }

      if (this.nothingToDisplay) {
        var message = this.filter
          ? this.noResultsLabel || this.$q.i18n.table.noResults
          : (this.loading ? this.loadingLabel || this.$q.i18n.table.loading : this.noDataLabel || this.$q.i18n.table.noData);

        return h('div', { staticClass: 'q-table-bottom row items-center q-table-nodata' }, [
          h(QIcon, {props: { name: this.$q.icon.table.warning }}),
          message
        ])
      }

      var bottom = this.$scopedSlots.bottom;

      return h('div', {
        staticClass: 'q-table-bottom row items-center',
        'class': bottom ? null : 'justify-end'
      }, bottom ? [ bottom(this.marginalsProps) ] : this.getPaginationRow(h))
    },
    getPaginationRow: function getPaginationRow (h) {
      var this$1 = this;

      var ref = this.computedPagination;
      var rowsPerPage = ref.rowsPerPage;
      var paginationLabel = this.paginationLabel || this.$q.i18n.table.pagination,
        paginationSlot = this.$scopedSlots.pagination;

      return [
        h('div', { staticClass: 'q-table-control' }, [
          h('div', [
            this.hasSelectionMode && this.rowsSelectedNumber > 0
              ? (this.selectedRowsLabel || this.$q.i18n.table.selectedRows)(this.rowsSelectedNumber)
              : ''
          ])
        ]),
        h('div', { staticClass: 'q-table-separator col' }),
        h('div', { staticClass: 'q-table-control' }, [
          h('span', { staticClass: 'q-table-bottom-item' }, [
            this.rowsPerPageLabel || this.$q.i18n.table.rowsPerPage
          ]),
          h(QSelect, {
            staticClass: 'inline q-table-bottom-item',
            props: {
              color: this.color,
              value: rowsPerPage,
              options: this.computedRowsPerPageOptions,
              dark: this.dark,
              hideUnderline: true
            },
            on: {
              input: function (rowsPerPage) {
                this$1.setPagination({
                  page: 1,
                  rowsPerPage: rowsPerPage
                });
              }
            }
          })
        ]),
        h('div', { staticClass: 'q-table-control' }, [
          paginationSlot
            ? paginationSlot(this.marginalsProps)
            : [
              h('span', { staticClass: 'q-table-bottom-item' }, [
                rowsPerPage
                  ? paginationLabel(this.firstRowIndex + 1, Math.min(this.lastRowIndex, this.computedRowsNumber), this.computedRowsNumber)
                  : paginationLabel(1, this.computedRowsNumber, this.computedRowsNumber)
              ]),
              h(QBtn, {
                props: {
                  color: this.color,
                  round: true,
                  icon: this.navIcon[0],
                  dense: true,
                  flat: true,
                  disable: this.isFirstPage
                },
                on: { click: this.prevPage }
              }),
              h(QBtn, {
                props: {
                  color: this.color,
                  round: true,
                  icon: this.navIcon[1],
                  dense: true,
                  flat: true,
                  disable: this.isLastPage
                },
                on: { click: this.nextPage }
              })
            ]
        ])
      ]
    }
  }
}

function sortDate (a, b) {
  return (new Date(a)) - (new Date(b))
}

var Sort = {
  props: {
    sortMethod: {
      type: Function,
      default: function default$1 (data, sortBy, descending) {
        var col = this.computedCols.find(function (def) { return def.name === sortBy; });
        if (col === null || col.field === void 0) {
          return data
        }

        var
          dir = descending ? -1 : 1,
          val = typeof col.field === 'function'
            ? function (v) { return col.field(v); }
            : function (v) { return v[col.field]; };

        return data.sort(function (a, b) {
          var assign;

          var
            A = val(a),
            B = val(b);

          if (A === null || A === void 0) {
            return -1 * dir
          }
          if (B === null || B === void 0) {
            return 1 * dir
          }
          if (col.sort) {
            return col.sort(A, B) * dir
          }
          if (isNumber(A) && isNumber(B)) {
            return (A - B) * dir
          }
          if (isDate(A) && isDate(B)) {
            return sortDate(A, B) * dir
          }
          if (typeof A === 'boolean' && typeof B === 'boolean') {
            return (a - b) * dir
          }

          (assign = [A, B].map(function (s) { return (s + '').toLowerCase(); }), A = assign[0], B = assign[1]);

          return A < B
            ? -1 * dir
            : (A === B ? 0 : dir)
        })
      }
    }
  },
  computed: {
    columnToSort: function columnToSort () {
      var ref = this.computedPagination;
      var sortBy = ref.sortBy;

      if (sortBy) {
        var col = this.computedCols.find(function (def) { return def.name === sortBy; });
        return col || null
      }
    }
  },
  methods: {
    sort: function sort (col /* String(col name) or Object(col definition) */) {
      if (col === Object(col)) {
        col = col.name;
      }

      var ref = this.computedPagination;
      var sortBy = ref.sortBy;
      var descending = ref.descending;

      if (sortBy !== col) {
        sortBy = col;
        descending = false;
      }
      else if (descending) {
        sortBy = null;
      }
      else {
        descending = true;
      }

      this.setPagination({ sortBy: sortBy, descending: descending, page: 1 });
    }
  }
}

var Filter = {
  props: {
    filter: String,
    filterMethod: {
      type: Function,
      default: function default$1 (rows, terms, cols, cellValue) {
        if ( cols === void 0 ) cols = this.computedCols;
        if ( cellValue === void 0 ) cellValue = this.getCellValue;

        var lowerTerms = terms ? terms.toLowerCase() : '';
        return rows.filter(
          function (row) { return cols.some(function (col) { return (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1; }); }
        )
      }
    }
  },
  computed: {
    hasFilter: function hasFilter () {
      return this.filter !== void 0 && this.filter.length > 0
    }
  },
  watch: {
    filter: function filter () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.setPagination({ page: 1 }, true);
      });
    }
  }
}

function samePagination (oldPag, newPag) {
  for (var prop in newPag) {
    if (newPag[prop] !== oldPag[prop]) {
      return false
    }
  }
  return true
}

function fixPagination (p) {
  if (p.page < 1) {
    p.page = 1;
  }
  if (p.rowsPerPage !== void 0 && p.rowsPerPage < 1) {
    p.rowsPerPage = 0;
  }
  return p
}

var Pagination = {
  props: {
    pagination: Object,
    rowsPerPageOptions: {
      type: Array,
      default: function () { return [3, 5, 7, 10, 15, 20, 25, 50, 0]; }
    }
  },
  data: function data () {
    return {
      innerPagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 5
      }
    }
  },
  computed: {
    computedPagination: function computedPagination () {
      return fixPagination(extend({}, this.innerPagination, this.pagination))
    },
    firstRowIndex: function firstRowIndex () {
      var ref = this.computedPagination;
      var page = ref.page;
      var rowsPerPage = ref.rowsPerPage;
      return (page - 1) * rowsPerPage
    },
    lastRowIndex: function lastRowIndex () {
      var ref = this.computedPagination;
      var page = ref.page;
      var rowsPerPage = ref.rowsPerPage;
      return page * rowsPerPage
    },
    isFirstPage: function isFirstPage () {
      return this.computedPagination.page === 1
    },
    pagesNumber: function pagesNumber () {
      return Math.max(
        1,
        Math.ceil(this.computedRowsNumber / this.computedPagination.rowsPerPage)
      )
    },
    isLastPage: function isLastPage () {
      if (this.lastRowIndex === 0) {
        return true
      }
      return this.computedPagination.page >= this.pagesNumber
    },
    computedRowsPerPageOptions: function computedRowsPerPageOptions () {
      var this$1 = this;

      return this.rowsPerPageOptions.map(function (count) { return ({
        label: count === 0 ? this$1.$q.i18n.table.allRows : '' + count,
        value: count
      }); })
    }
  },
  watch: {
    pagesNumber: function pagesNumber (lastPage, oldLastPage) {
      if (lastPage === oldLastPage) {
        return
      }

      var currentPage = this.computedPagination.page;
      if (lastPage && !currentPage) {
        this.setPagination({ page: 1 });
      }
      else if (lastPage < currentPage) {
        this.setPagination({ page: lastPage });
      }
    }
  },
  methods: {
    __sendServerRequest: function __sendServerRequest (pagination) {
      this.requestServerInteraction({
        pagination: pagination,
        filter: this.filter
      });
    },
    setPagination: function setPagination (val, forceServerRequest) {
      var newPagination = fixPagination(extend({}, this.computedPagination, val));

      if (samePagination(this.computedPagination, newPagination)) {
        if (this.isServerSide && forceServerRequest) {
          this.__sendServerRequest(newPagination);
        }
        return
      }

      if (this.isServerSide) {
        this.__sendServerRequest(newPagination);
        return
      }

      if (this.pagination) {
        this.$emit('update:pagination', newPagination);
      }
      else {
        this.innerPagination = newPagination;
      }
    },
    prevPage: function prevPage () {
      var ref = this.computedPagination;
      var page = ref.page;
      if (page > 1) {
        this.setPagination({page: page - 1});
      }
    },
    nextPage: function nextPage () {
      var ref = this.computedPagination;
      var page = ref.page;
      var rowsPerPage = ref.rowsPerPage;
      if (this.lastRowIndex > 0 && page * rowsPerPage < this.computedRowsNumber) {
        this.setPagination({page: page + 1});
      }
    }
  },
  created: function created () {
    this.$emit('update:pagination', extend({}, this.computedPagination));
  }
}

var RowSelection = {
  props: {
    selection: {
      type: String,
      default: 'none',
      validator: function (v) { return ['single', 'multiple', 'none'].includes(v); }
    },
    selected: {
      type: Array,
      default: function () { return []; }
    }
  },
  computed: {
    selectedKeys: function selectedKeys () {
      var this$1 = this;

      var keys = {};
      this.selected.map(function (row) { return row[this$1.rowKey]; }).forEach(function (key) {
        keys[key] = true;
      });
      return keys
    },
    hasSelectionMode: function hasSelectionMode () {
      return this.selection !== 'none'
    },
    singleSelection: function singleSelection () {
      return this.selection === 'single'
    },
    multipleSelection: function multipleSelection () {
      return this.selection === 'multiple'
    },
    allRowsSelected: function allRowsSelected () {
      var this$1 = this;

      if (this.multipleSelection) {
        return this.computedRows.length > 0 && this.computedRows.every(function (row) { return this$1.selectedKeys[row[this$1.rowKey]] === true; })
      }
    },
    someRowsSelected: function someRowsSelected () {
      var this$1 = this;

      if (this.multipleSelection) {
        return !this.allRowsSelected && this.computedRows.some(function (row) { return this$1.selectedKeys[row[this$1.rowKey]] === true; })
      }
    },
    rowsSelectedNumber: function rowsSelectedNumber () {
      return this.selected.length
    }
  },
  methods: {
    isRowSelected: function isRowSelected (key) {
      return this.selectedKeys[key] === true
    },
    clearSelection: function clearSelection () {
      this.$emit('update:selected', []);
    },
    __updateSelection: function __updateSelection (keys, rows, adding) {
      var this$1 = this;

      if (this.singleSelection) {
        this.$emit('update:selected', adding ? rows : []);
      }
      else {
        this.$emit('update:selected', adding
          ? this.selected.concat(rows)
          : this.selected.filter(function (row) { return !keys.includes(row[this$1.rowKey]); })
        );
      }
    }
  }
}

var ColumnSelection = {
  props: {
    visibleColumns: Array
  },
  computed: {
    computedCols: function computedCols () {
      var this$1 = this;

      var ref = this.computedPagination;
      var sortBy = ref.sortBy;
      var descending = ref.descending;

      var cols = this.visibleColumns
        ? this.columns.filter(function (col) { return col.required || this$1.visibleColumns.includes(col.name); })
        : this.columns;

      return cols.map(function (col) {
        col.align = col.align || 'right';
        col.__iconClass = "q-table-sort-icon q-table-sort-icon-" + (col.align);
        col.__thClass = "text-" + (col.align) + (col.sortable ? ' sortable' : '') + (col.name === sortBy ? (" sorted " + (descending ? 'sort-desc' : '')) : '');
        col.__tdClass = "text-" + (col.align);
        return col
      })
    },
    computedColsMap: function computedColsMap () {
      var names = {};
      this.computedCols.forEach(function (col) {
        names[col.name] = col;
      });
      return names
    }
  }
}

var Expand = {
  data: function data () {
    return {
      rowsExpanded: {}
    }
  }
}

var QTable = {
  name: 'QTable',
  mixins: [
    FullscreenMixin,
    Top,
    TableHeader,
    TableBody,
    Bottom,
    Sort,
    Filter,
    Pagination,
    RowSelection,
    ColumnSelection,
    Expand
  ],
  props: {
    data: {
      type: Array,
      default: function () { return []; }
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    color: {
      type: String,
      default: 'grey-8'
    },
    dense: Boolean,
    columns: Array,
    loading: Boolean,
    title: String,
    hideHeader: Boolean,
    hideBottom: Boolean,
    dark: Boolean,
    separator: {
      type: String,
      default: 'horizontal',
      validator: function (v) { return ['horizontal', 'vertical', 'cell', 'none'].includes(v); }
    },
    noDataLabel: String,
    noResultsLabel: String,
    loadingLabel: String,
    selectedRowsLabel: Function,
    rowsPerPageLabel: String,
    paginationLabel: Function,
    tableStyle: {
      type: [String, Array, Object],
      default: ''
    },
    tableClass: {
      type: [String, Array, Object],
      default: ''
    }
  },
  computed: {
    computedData: function computedData () {
      var rows = this.data.slice().map(function (row, i) {
        row.__index = i;
        return row
      });

      if (rows.length === 0) {
        return {
          rowsNumber: 0,
          rows: []
        }
      }
      if (this.isServerSide) {
        return { rows: rows }
      }

      var ref = this.computedPagination;
      var sortBy = ref.sortBy;
      var descending = ref.descending;
      var rowsPerPage = ref.rowsPerPage;

      if (this.hasFilter) {
        rows = this.filterMethod(rows, this.filter, this.computedCols, this.getCellValue);
      }

      if (this.columnToSort) {
        rows = this.sortMethod(rows, sortBy, descending);
      }

      var rowsNumber = rows.length;

      if (rowsPerPage) {
        rows = rows.slice(this.firstRowIndex, this.lastRowIndex);
      }

      return { rowsNumber: rowsNumber, rows: rows }
    },
    computedRows: function computedRows () {
      return this.computedData.rows
    },
    computedRowsNumber: function computedRowsNumber () {
      return this.isServerSide
        ? this.computedPagination.rowsNumber || 0
        : this.computedData.rowsNumber
    },
    nothingToDisplay: function nothingToDisplay () {
      return this.computedRows.length === 0
    },
    isServerSide: function isServerSide () {
      return this.computedPagination.rowsNumber !== void 0
    }
  },
  render: function render (h) {
    return h('div',
      {
        'class': {
          'q-table-container': true,
          'q-table-dark': this.dark,
          'q-table-dense': this.dense,
          fullscreen: this.inFullscreen,
          scroll: this.inFullscreen
        }
      },
      [
        this.getTop(h),
        h('div', { staticClass: 'q-table-middle scroll', 'class': this.tableClass, style: this.tableStyle }, [
          h('table', { staticClass: ("q-table q-table-" + (this.separator) + "-separator" + (this.dark ? ' q-table-dark' : '')) },
            [
              this.getTableHeader(h),
              this.getTableBody(h)
            ]
          )
        ]),
        this.getBottom(h)
      ]
    )
  },
  methods: {
    requestServerInteraction: function requestServerInteraction (prop) {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.$emit('request', {
          pagination: prop.pagination || this$1.computedPagination,
          filter: prop.filter || this$1.filter,
          getCellValue: this$1.getCellValue
        });
      });
    }
  }
}

var QTr = {
  name: 'QTr',
  props: {
    props: Object
  },
  render: function render (h) {
    return h('tr',
      !this.props || this.props.header ? {} : { 'class': this.props.__trClass },
      [ this.$slots.default ]
    )
  }
}

var QTd = {
  name: 'QTd',
  props: {
    props: Object,
    autoWidth: Boolean
  },
  render: function render (h) {
    if (!this.props) {
      return h('td', {
        'class': { 'q-table-col-auto-width': this.autoWidth }
      }, [ this.$slots.default ])
    }

    var col;
    var name = this.$vnode.key;

    if (name) {
      col = this.props.colsMap[name];
      if (!col) { return }
    }
    else {
      col = this.props.col;
    }

    return h('td', {
      'class': [col.__tdClass, {
        'q-table-col-auto-width': this.autoWidth
      }]
    }, [ this.$slots.default ])
  }
}

var QTableColumns = {
  name: 'QTableColumns',
  props: {
    value: {
      type: Array,
      required: true
    },
    label: String,
    columns: {
      type: Array,
      required: true
    },
    color: String
  },
  computed: {
    computedOptions: function computedOptions () {
      return this.columns.filter(function (col) { return !col.required; }).map(function (col) { return ({
        value: col.name,
        label: col.label
      }); })
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(QSelect, {
      props: {
        multiple: true,
        toggle: true,
        value: this.value,
        options: this.computedOptions,
        displayValue: this.label || this.$q.i18n.table.columns,
        color: this.color,
        hideUnderline: true
      },
      on: {
        input: function (v) { this$1.$emit('input', v); },
        change: function (v) { this$1.$emit('change', v); }
      }
    })
  }
}

var QTimeline = {
  name: 'QTimeline',
  provide: function provide () {
    return {
      __timeline: this
    }
  },
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    dark: Boolean
  },
  render: function render (h) {
    return h('ul', {
      staticClass: 'q-timeline',
      'class': { 'q-timeline-dark': this.dark }
    }, [
      this.$slots.default
    ])
  }
}

var QTimelineEntry = {
  name: 'QTimelineEntry',
  inject: {
    __timeline: {
      default: function default$1 () {
        console.error('QTimelineEntry needs to be child of QTimeline');
      }
    }
  },
  props: {
    heading: Boolean,
    tag: {
      type: String,
      default: 'h3'
    },
    side: {
      type: String,
      default: 'right',
      validator: function (v) { return ['left', 'right'].includes(v); }
    },
    icon: String,
    color: String,
    title: String,
    subtitle: String
  },
  computed: {
    colorClass: function colorClass () {
      return ("text-" + (this.color || this.__timeline.color))
    },
    classes: function classes () {
      return [
        ("q-timeline-entry-" + (this.side === 'left' ? 'left' : 'right')),
        this.icon ? 'q-timeline-entry-with-icon' : ''
      ]
    }
  },
  render: function render (h) {
    if (this.heading) {
      return h('div', { staticClass: 'q-timeline-heading' }, [
        h('div'),
        h('div'),
        h(this.tag, { staticClass: 'q-timeline-heading-title' }, [
          this.$slots.default
        ])
      ])
    }

    return h('li', {
      staticClass: "q-timeline-entry",
      'class': this.classes
    }, [
      h('div', { staticClass: 'q-timeline-subtitle' }, [
        h('span', this.subtitle)
      ]),

      h('div', {
        staticClass: 'q-timeline-dot',
        'class': this.colorClass
      }, [
        this.icon
          ? h(QIcon, { props: { name: this.icon } })
          : null
      ]),

      h('div', { staticClass: 'q-timeline-content' }, [
        h('h6', { staticClass: 'q-timeline-title' }, [ this.title ]),
        this.$slots.default
      ])
    ])
  }
}

var QToolbar = {
  name: 'QToolbar',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    textColor: String,
    inverted: Boolean,
    glossy: Boolean
  },
  computed: {
    classes: function classes () {
      var cls = [ ("q-toolbar-" + (this.inverted ? 'inverted' : 'normal')) ];

      this.glossy && cls.push('glossy');

      if (this.inverted) {
        cls.push(("text-" + (this.textColor || this.color)));
      }
      else {
        cls.push(("bg-" + (this.color)));
        cls.push(("text-" + (this.textColor || 'white')));
      }

      return cls
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-toolbar row no-wrap items-center relative-position',
      'class': this.classes
    }, [
      this.$slots.default
    ])
  }
}

var QToolbarTitle = {
  name: 'QToolbarTitle',
  props: {
    shrink: Boolean
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-toolbar-title',
      'class': this.shrink ? 'col-auto' : null
    }, [
      this.$slots.default,
      this.$slots.subtitle
        ? h('div', { staticClass: 'q-toolbar-subtitle' }, this.$slots.subtitle)
        : null
    ])
  }
}

var QTree = {
  name: 'QTree',
  directives: {
    Ripple: Ripple
  },
  props: {
    nodes: Array,
    nodeKey: {
      type: String,
      required: true
    },

    color: {
      type: String,
      default: 'grey'
    },
    controlColor: String,
    textColor: String,
    dark: Boolean,

    icon: String,

    tickStrategy: {
      type: String,
      default: 'none',
      validator: function (v) { return ['none', 'strict', 'leaf', 'leaf-filtered'].includes(v); }
    },
    ticked: Array, // sync
    expanded: Array, // sync
    selected: {}, // sync

    defaultExpandAll: Boolean,
    accordion: Boolean,

    filter: String,
    filterMethod: {
      type: Function,
      default: function default$1 (node, filter) {
        var filt = filter.toLowerCase();
        return node.label && node.label.toLowerCase().indexOf(filt) > -1
      }
    },

    noNodesLabel: String,
    noResultsLabel: String
  },
  computed: {
    hasRipple: function hasRipple () {
      return "ios" === 'mat' && !this.noRipple
    },
    classes: function classes () {
      return [
        ("text-" + (this.color)),
        { 'q-tree-dark': this.dark }
      ]
    },
    hasSelection: function hasSelection () {
      return this.selected !== void 0
    },
    computedIcon: function computedIcon () {
      return this.icon || this.$q.icon.tree.icon
    },
    computedControlColor: function computedControlColor () {
      return this.controlColor || this.color
    },
    contentClass: function contentClass () {
      return ("text-" + (this.textColor || (this.dark ? 'white' : 'black')))
    },
    meta: function meta () {
      var this$1 = this;

      var meta = {};

      var travel = function (node, parent) {
        var tickStrategy = node.tickStrategy || (parent ? parent.tickStrategy : this$1.tickStrategy);
        var
          key = node[this$1.nodeKey],
          isParent = node.children && node.children.length > 0,
          isLeaf = !isParent,
          selectable = !node.disabled && this$1.hasSelection && node.selectable !== false,
          expandable = !node.disabled && node.expandable !== false,
          hasTicking = tickStrategy !== 'none',
          strictTicking = tickStrategy === 'strict',
          leafFilteredTicking = tickStrategy === 'leaf-filtered',
          leafTicking = tickStrategy === 'leaf' || tickStrategy === 'leaf-filtered';

        var tickable = !node.disabled && node.tickable !== false;
        if (leafTicking && tickable && parent && !parent.tickable) {
          tickable = false;
        }

        var lazy = node.lazy;
        if (lazy && this$1.lazy[key]) {
          lazy = this$1.lazy[key];
        }

        var m = {
          key: key,
          parent: parent,
          isParent: isParent,
          isLeaf: isLeaf,
          lazy: lazy,
          disabled: node.disabled,
          link: selectable || (expandable && (isParent || lazy === true)),
          children: [],
          matchesFilter: this$1.filter ? this$1.filterMethod(node, this$1.filter) : true,

          selected: key === this$1.selected && selectable,
          selectable: selectable,
          expanded: isParent ? this$1.innerExpanded.includes(key) : false,
          expandable: expandable,
          noTick: node.noTick || (!strictTicking && lazy && lazy !== 'loaded'),
          tickable: tickable,
          tickStrategy: tickStrategy,
          hasTicking: hasTicking,
          strictTicking: strictTicking,
          leafFilteredTicking: leafFilteredTicking,
          leafTicking: leafTicking,
          ticked: strictTicking
            ? this$1.innerTicked.includes(key)
            : (isLeaf ? this$1.innerTicked.includes(key) : false)
        };

        meta[key] = m;

        if (isParent) {
          m.children = node.children.map(function (n) { return travel(n, m); });

          if (this$1.filter) {
            if (!m.matchesFilter) {
              m.matchesFilter = m.children.some(function (n) { return n.matchesFilter; });
            }
            if (
              m.matchesFilter &&
              !m.noTick &&
              !m.disabled &&
              m.tickable &&
              leafFilteredTicking &&
              m.children.every(function (n) { return !n.matchesFilter || n.noTick || !n.tickable; })
            ) {
              m.tickable = false;
            }
          }

          if (m.matchesFilter) {
            if (!m.noTick && !strictTicking && m.children.every(function (n) { return n.noTick; })) {
              m.noTick = true;
            }

            if (leafTicking) {
              m.ticked = false;
              m.indeterminate = m.children.some(function (node) { return node.indeterminate; });

              if (!m.indeterminate) {
                var sel = m.children
                  .reduce(function (acc, meta) { return meta.ticked ? acc + 1 : acc; }, 0);

                if (sel === m.children.length) {
                  m.ticked = true;
                }
                else if (sel > 0) {
                  m.indeterminate = true;
                }
              }
            }
          }
        }

        return m
      };

      this.nodes.forEach(function (node) { return travel(node, null); });
      return meta
    }
  },
  data: function data () {
    return {
      lazy: {},
      innerTicked: this.ticked || [],
      innerExpanded: this.expanded || []
    }
  },
  watch: {
    ticked: function ticked (val) {
      this.innerTicked = val;
    },
    expanded: function expanded (val) {
      this.innerExpanded = val;
    }
  },
  methods: {
    getNodeByKey: function getNodeByKey (key) {
      var this$1 = this;

      var reduce = [].reduce;

      var find = function (result, node) {
        if (result || !node) {
          return result
        }
        if (Array.isArray(node)) {
          return reduce.call(Object(node), find, result)
        }
        if (node[this$1.nodeKey] === key) {
          return node
        }
        if (node.children) {
          return find(null, node.children)
        }
      };

      return find(null, this.nodes)
    },
    getTickedNodes: function getTickedNodes () {
      var this$1 = this;

      return this.innerTicked.map(function (key) { return this$1.getNodeByKey(key); })
    },
    getExpandedNodes: function getExpandedNodes () {
      var this$1 = this;

      return this.innerExpanded.map(function (key) { return this$1.getNodeByKey(key); })
    },
    isExpanded: function isExpanded (key) {
      return key && this.meta[key]
        ? this.meta[key].expanded
        : false
    },
    collapseAll: function collapseAll () {
      if (this.expanded !== void 0) {
        this.$emit('update:expanded', []);
      }
      else {
        this.innerExpanded = [];
      }
    },
    expandAll: function expandAll () {
      var this$1 = this;

      var
        expanded = this.innerExpanded,
        travel = function (node) {
          if (node.children && node.children.length > 0) {
            if (node.expandable !== false && node.disabled !== true) {
              expanded.push(node[this$1.nodeKey]);
              node.children.forEach(travel);
            }
          }
        };

      this.nodes.forEach(travel);

      if (this.expanded !== void 0) {
        this.$emit('update:expanded', expanded);
      }
      else {
        this.innerExpanded = expanded;
      }
    },
    setExpanded: function setExpanded (key, state, node, meta) {
      var this$1 = this;
      if ( node === void 0 ) node = this.getNodeByKey(key);
      if ( meta === void 0 ) meta = this.meta[key];

      if (meta.lazy && meta.lazy !== 'loaded') {
        if (meta.lazy === 'loading') {
          return
        }

        this.$set(this.lazy, key, 'loading');
        this.$emit('lazy-load', {
          node: node,
          key: key,
          done: function (children) {
            this$1.lazy[key] = 'loaded';
            if (children) {
              node.children = children;
            }
            this$1.$nextTick(function () {
              var m = this$1.meta[key];
              if (m && m.isParent) {
                this$1.__setExpanded(key, true);
              }
            });
          },
          fail: function () {
            this$1.$delete(this$1.lazy, key);
          }
        });
      }
      else if (meta.isParent && meta.expandable) {
        this.__setExpanded(key, state);
      }
    },
    __setExpanded: function __setExpanded (key, state) {
      var this$1 = this;

      var target = this.innerExpanded;
      var emit = this.expanded !== void 0;

      if (emit) {
        target = target.slice();
      }

      if (state) {
        if (this.accordion) {
          if (this.meta[key]) {
            var collapse = [];
            if (this.meta[key].parent) {
              this.meta[key].parent.children.forEach(function (m) {
                if (m.key !== key && m.expandable) {
                  collapse.push(m.key);
                }
              });
            }
            else {
              this.nodes.forEach(function (node) {
                var k = node[this$1.nodeKey];
                if (k !== key) {
                  collapse.push(k);
                }
              });
            }
            if (collapse.length > 0) {
              target = target.filter(function (k) { return !collapse.includes(k); });
            }
          }
        }

        target = target.concat([ key ])
          .filter(function (key, index, self) { return self.indexOf(key) === index; });
      }
      else {
        target = target.filter(function (k) { return k !== key; });
      }

      if (emit) {
        this.$emit("update:expanded", target);
      }
      else {
        this.innerExpanded = target;
      }
    },
    isTicked: function isTicked (key) {
      return key && this.meta[key]
        ? this.meta[key].ticked
        : false
    },
    setTicked: function setTicked (keys, state) {
      var target = this.innerTicked;
      var emit = this.ticked !== void 0;

      if (emit) {
        target = target.slice();
      }

      if (state) {
        target = target.concat(keys)
          .filter(function (key, index, self) { return self.indexOf(key) === index; });
      }
      else {
        target = target.filter(function (k) { return !keys.includes(k); });
      }

      if (emit) {
        this.$emit("update:ticked", target);
      }
    },
    __getSlotScope: function __getSlotScope (node, meta, key) {
      var this$1 = this;

      var scope = { tree: this, node: node, key: key, color: this.color, dark: this.dark };

      Object.defineProperty(scope, 'expanded', {
        get: function () { return meta.expanded },
        set: function (val) { val !== meta.expanded && this$1.setExpanded(key, val); }
      });
      Object.defineProperty(scope, 'ticked', {
        get: function () { return meta.ticked },
        set: function (val) { val !== meta.ticked && this$1.setTicked([ key ], val); }
      });

      return scope
    },
    __getChildren: function __getChildren (h, nodes) {
      var this$1 = this;

      return (
        this.filter
          ? nodes.filter(function (n) { return this$1.meta[n[this$1.nodeKey]].matchesFilter; })
          : nodes
      ).map(function (child) { return this$1.__getNode(h, child); })
    },
    __getNodeMedia: function __getNodeMedia (h, node) {
      if (node.icon) {
        return h(QIcon, {
          staticClass: "q-tree-icon q-mr-sm",
          props: { name: node.icon }
        })
      }
      if (node.img || node.avatar) {
        return h('img', {
          staticClass: "q-tree-img q-mr-sm",
          'class': { avatar: node.avatar },
          domProps: { src: node.img || node.avatar }
        })
      }
    },
    __getNode: function __getNode (h, node) {
      var this$1 = this;

      var
        key = node[this.nodeKey],
        meta = this.meta[key],
        header = node.header
          ? this.$scopedSlots[("header-" + (node.header))] || this.$scopedSlots['default-header']
          : this.$scopedSlots['default-header'];

      var children = meta.isParent
        ? this.__getChildren(h, node.children)
        : [];

      var isParent = children.length > 0 || (meta.lazy && meta.lazy !== 'loaded');

      var
        body = node.body
          ? this.$scopedSlots[("body-" + (node.body))] || this.$scopedSlots['default-body']
          : this.$scopedSlots['default-body'],
        slotScope = header || body
          ? this.__getSlotScope(node, meta, key)
          : null;

      if (body) {
        body = h('div', { staticClass: 'q-tree-node-body relative-position' }, [
          h('div', { 'class': this.contentClass }, [
            body(slotScope)
          ])
        ]);
      }

      return h('div', {
        key: key,
        staticClass: 'q-tree-node',
        'class': { 'q-tree-node-parent': isParent, 'q-tree-node-child': !isParent }
      }, [
        h('div', {
          staticClass: 'q-tree-node-header relative-position row no-wrap items-center',
          'class': {
            'q-tree-node-link': meta.link,
            'q-tree-node-selected': meta.selected,
            disabled: meta.disabled
          },
          on: { click: function () { this$1.__onClick(node, meta); } },
          directives: null
        }, [
          meta.lazy === 'loading'
            ? h(QSpinner, {
              staticClass: 'q-tree-node-header-media q-mr-xs',
              props: { color: this.computedControlColor }
            })
            : (
              isParent
                ? h(QIcon, {
                  staticClass: 'q-tree-arrow q-mr-xs transition-generic',
                  'class': { 'q-tree-arrow-rotate': meta.expanded },
                  props: { name: this.computedIcon },
                  nativeOn: {
                    click: function (e) {
                      this$1.__onExpandClick(node, meta, e);
                    }
                  }
                })
                : null
            ),

          h('span', { 'staticClass': 'row no-wrap items-center', 'class': this.contentClass }, [
            meta.hasTicking && !meta.noTick
              ? h(QCheckbox, {
                staticClass: 'q-mr-xs',
                props: {
                  value: meta.indeterminate ? null : meta.ticked,
                  color: this.computedControlColor,
                  dark: this.dark,
                  keepColor: true,
                  disable: !meta.tickable
                },
                on: {
                  input: function (v) {
                    this$1.__onTickedClick(node, meta, v);
                  }
                }
              })
              : null,
            header
              ? header(slotScope)
              : [
                this.__getNodeMedia(h, node),
                h('span', node.label)
              ]
          ])
        ]),

        isParent
          ? h(QSlideTransition, [
            h('div', {
              directives: [{ name: 'show', value: meta.expanded }],
              staticClass: 'q-tree-node-collapsible',
              'class': ("text-" + (this.color))
            }, [
              body,
              h('div', {
                staticClass: 'q-tree-children',
                'class': { disabled: meta.disabled }
              }, children)
            ])
          ])
          : body
      ])
    },
    __onClick: function __onClick (node, meta) {
      if (this.hasSelection) {
        if (meta.selectable) {
          this.$emit('update:selected', meta.key !== this.selected ? meta.key : null);
        }
      }
      else {
        this.__onExpandClick(node, meta);
      }

      if (typeof node.handler === 'function') {
        node.handler(node);
      }
    },
    __onExpandClick: function __onExpandClick (node, meta, e) {
      if (e !== void 0) {
        e.stopPropagation();
      }
      this.setExpanded(meta.key, !meta.expanded, node, meta);
    },
    __onTickedClick: function __onTickedClick (node, meta, state) {
      if (meta.indeterminate && state) {
        state = false;
      }
      if (meta.strictTicking) {
        this.setTicked([ meta.key ], state);
      }
      else if (meta.leafTicking) {
        var keys = [];
        var travel = function (meta) {
          if (meta.isParent) {
            if (!state && !meta.noTick && meta.tickable) {
              keys.push(meta.key);
            }
            if (meta.leafTicking) {
              meta.children.forEach(travel);
            }
          }
          else if (!meta.noTick && meta.tickable && (!meta.leafFilteredTicking || meta.matchesFilter)) {
            keys.push(meta.key);
          }
        };
        travel(meta);
        this.setTicked(keys, state);
      }
    }
  },
  render: function render (h) {
    var children = this.__getChildren(h, this.nodes);

    return h(
      'div', {
        staticClass: 'q-tree relative-position',
        'class': this.classes
      },
      children.length === 0
        ? (
          this.filter
            ? this.noResultsLabel || this.$q.i18n.tree.noResults
            : this.noNodesLabel || this.$q.i18n.tree.noNodes
        )
        : children
    )
  },
  created: function created () {
    if (this.defaultExpandAll) {
      this.expandAll();
    }
  }
}

function initFile (file) {
  file.__doneUploading = false;
  file.__failed = false;
  file.__uploaded = 0;
  file.__progress = 0;
}

var QUploader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-uploader relative-position",class:_vm.classes,on:{"dragover":function($event){$event.preventDefault();$event.stopPropagation();return _vm.__onDragOver($event)}}},[_c('q-input-frame',{ref:"input",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"warning":_vm.warning,"disable":_vm.disable,"inverted":_vm.inverted,"invertedLight":_vm.invertedLight,"dark":_vm.dark,"hide-underline":_vm.hideUnderline,"before":_vm.before,"after":_vm.after,"color":_vm.color,"align":_vm.align,"no-parent-field":_vm.noParentField,"length":_vm.queueLength,"additional-length":""}},[_c('div',{staticClass:"col q-input-target ellipsis",class:_vm.alignClass},[_vm._v(" "+_vm._s(_vm.label)+" ")]),_vm._v(" "),(_vm.uploading)?_c('q-spinner',{staticClass:"q-if-end self-center",attrs:{"slot":"after","size":"24px"},slot:"after"}):_vm._e(),_vm._v(" "),(_vm.uploading)?_c('q-icon',{staticClass:"q-if-end self-center",attrs:{"slot":"after","name":_vm.$q.icon.uploader[("clear" + (_vm.isInverted ? 'Inverted' : ''))]},nativeOn:{"click":function($event){return _vm.abort($event)}},slot:"after"}):_vm._e(),_vm._v(" "),(!_vm.uploading)?_c('q-icon',{staticClass:"q-uploader-pick-button q-if-control relative-position overflow-hidden",attrs:{"slot":"after","name":_vm.$q.icon.uploader.add,"disabled":_vm.addDisabled},nativeOn:{"click":function($event){return _vm.__pick($event)}},slot:"after"},[_c('input',_vm._b({ref:"file",staticClass:"q-uploader-input absolute-full cursor-pointer",attrs:{"type":"file","accept":_vm.extensions},on:{"change":_vm.__add}},'input',{multiple: _vm.multiple},true))]):_vm._e(),_vm._v(" "),(!_vm.hideUploadButton && !_vm.uploading)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.uploader.upload,"disabled":_vm.queueLength === 0},nativeOn:{"click":function($event){return _vm.upload($event)}},slot:"after"}):_vm._e(),_vm._v(" "),(_vm.hasExpandedContent)?_c('q-icon',{staticClass:"q-if-control generic_transition",class:{'rotate-180': _vm.expanded},attrs:{"slot":"after","name":_vm.$q.icon.uploader.expand},nativeOn:{"click":function($event){_vm.expanded = !_vm.expanded;}},slot:"after"}):_vm._e()],1),_vm._v(" "),_c('q-slide-transition',[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.expanded),expression:"expanded"}],class:_vm.expandClass,style:(_vm.expandStyle)},[_c('q-list',{staticClass:"q-uploader-files q-py-none scroll",style:(_vm.filesStyle),attrs:{"dark":_vm.dark}},_vm._l((_vm.files),function(file){return _c('q-item',{key:file.name + file.__timestamp,staticClass:"q-uploader-file q-pa-xs"},[(!_vm.hideUploadProgress)?_c('q-progress',{staticClass:"q-uploader-progress-bg absolute-full",attrs:{"color":file.__failed ? 'negative' : _vm.progressColor,"percentage":file.__progress,"height":"100%"}}):_vm._e(),_vm._v(" "),(!_vm.hideUploadProgress)?_c('div',{staticClass:"q-uploader-progress-text absolute"},[_vm._v(" "+_vm._s(file.__progress)+"% ")]):_vm._e(),_vm._v(" "),(file.__img)?_c('q-item-side',{attrs:{"image":file.__img.src}}):_c('q-item-side',{attrs:{"icon":_vm.$q.icon.uploader.file,"color":_vm.color}}),_vm._v(" "),_c('q-item-main',{attrs:{"label":file.name,"sublabel":file.__size}}),_vm._v(" "),_c('q-item-side',{attrs:{"right":""}},[_c('q-item-tile',{staticClass:"cursor-pointer",attrs:{"icon":_vm.$q.icon.uploader[file.__doneUploading ? 'done' : 'clear'],"color":_vm.color},nativeOn:{"click":function($event){_vm.__remove(file);}}})],1)],1)}))],1)]),_vm._v(" "),(_vm.dnd)?_c('div',{staticClass:"q-uploader-dnd flex row items-center justify-center absolute-full",class:_vm.dndClass,on:{"dragenter":function($event){$event.preventDefault();$event.stopPropagation();},"dragover":function($event){$event.preventDefault();$event.stopPropagation();},"dragleave":function($event){$event.preventDefault();$event.stopPropagation();return _vm.__onDragLeave($event)},"drop":function($event){$event.preventDefault();$event.stopPropagation();return _vm.__onDrop($event)}}}):_vm._e()],1)},staticRenderFns: [],
  name: 'QUploader',
  mixins: [FrameMixin],
  components: {
    QInputFrame: QInputFrame,
    QSpinner: QSpinner,
    QIcon: QIcon,
    QProgress: QProgress,
    QList: QList,
    QItem: QItem,
    QItemSide: QItemSide,
    QItemMain: QItemMain,
    QItemTile: QItemTile,
    QSlideTransition: QSlideTransition
  },
  props: {
    name: {
      type: String,
      default: 'file'
    },
    headers: Object,
    url: {
      type: String,
      required: true
    },
    urlFactory: {
      type: Function,
      required: false
    },
    additionalFields: {
      type: Array,
      default: function () { return []; }
    },
    method: {
      type: String,
      default: 'POST'
    },
    extensions: String,
    multiple: Boolean,
    hideUploadButton: Boolean,
    hideUploadProgress: Boolean,
    noThumbnails: Boolean,
    autoExpand: Boolean,
    expandStyle: [Array, String, Object],
    expandClass: [Array, String, Object],
    sendRaw: {
      type: Boolean,
      default: false
    }
  },
  data: function data () {
    return {
      queue: [],
      files: [],
      uploading: false,
      uploadedSize: 0,
      totalSize: 0,
      xhrs: [],
      focused: false,
      dnd: false,
      expanded: false
    }
  },
  computed: {
    queueLength: function queueLength () {
      return this.queue.length
    },
    hasExpandedContent: function hasExpandedContent () {
      return this.files.length > 0
    },
    label: function label () {
      var total = humanStorageSize(this.totalSize);
      return this.uploading
        ? (((this.progress).toFixed(2)) + "% (" + (humanStorageSize(this.uploadedSize)) + " / " + total + ")")
        : ((this.queueLength) + " (" + total + ")")
    },
    progress: function progress () {
      return this.totalSize ? Math.min(99.99, this.uploadedSize / this.totalSize * 100) : 0
    },
    addDisabled: function addDisabled () {
      return !this.multiple && this.queueLength >= 1
    },
    filesStyle: function filesStyle () {
      if (this.maxHeight) {
        return { maxHeight: this.maxHeight }
      }
    },
    dndClass: function dndClass () {
      var cls = [("text-" + (this.color))];
      if (this.isInverted) {
        cls.push('inverted');
      }
      return cls
    },
    classes: function classes () {
      return {
        'q-uploader-expanded': this.expanded,
        'q-uploader-dark': this.dark,
        'q-uploader-files-no-border': this.isInverted || !this.hideUnderline
      }
    },
    progressColor: function progressColor () {
      return this.dark ? 'white' : 'grey'
    },
    computedExtensions: function computedExtensions () {
      if (this.extensions) {
        return this.extensions.split(',').map(function (ext) {
          ext = ext.trim();
          // support "image/*"
          if (ext.endsWith('/*')) {
            ext = ext.slice(0, ext.length - 1);
          }
          return ext
        })
      }
    }
  },
  watch: {
    hasExpandedContent: function hasExpandedContent (v) {
      if (v === false) {
        this.expanded = false;
      }
      else if (this.autoExpand) {
        this.expanded = true;
      }
    }
  },
  methods: {
    add: function add (files) {
      if (files) {
        this.__add(null, files);
      }
    },

    __onDragOver: function __onDragOver () {
      this.dnd = true;
    },
    __onDragLeave: function __onDragLeave () {
      this.dnd = false;
    },
    __onDrop: function __onDrop (e) {
      this.dnd = false;
      var files = e.dataTransfer.files;

      if (files.length === 0) {
        return
      }

      files = this.multiple ? files : [ files[0] ];
      if (this.extensions) {
        files = this.__filter(files);
        if (files.length === 0) {
          return
        }
      }

      this.__add(null, files);
    },
    __filter: function __filter (files) {
      var this$1 = this;

      return Array.prototype.filter.call(files, function (file) {
        return this$1.computedExtensions.some(function (ext) {
          return file.type.toUpperCase().startsWith(ext.toUpperCase()) ||
            file.name.toUpperCase().endsWith(ext.toUpperCase())
        })
      })
    },
    __add: function __add (e, files) {
      var this$1 = this;

      if (this.addDisabled) {
        return
      }

      files = Array.prototype.slice.call(files || e.target.files);
      this.$refs.file.value = '';

      var filesReady = []; // List of image load promises
      files = files.filter(function (file) { return !this$1.queue.some(function (f) { return file.name === f.name; }); })
        .map(function (file) {
          initFile(file);
          file.__size = humanStorageSize(file.size);
          file.__timestamp = new Date().getTime();

          if (this$1.noThumbnails || !file.type.toUpperCase().startsWith('IMAGE')) {
            this$1.queue.push(file);
          }
          else {
            var reader = new FileReader();
            var p = new Promise(function (resolve, reject) {
              reader.onload = function (e) {
                var img = new Image();
                img.src = e.target.result;
                file.__img = img;
                this$1.queue.push(file);
                this$1.__computeTotalSize();
                resolve(true);
              };
              reader.onerror = function (e) { reject(e); };
            });

            reader.readAsDataURL(file);
            filesReady.push(p);
          }

          return file
        });

      if (files.length > 0) {
        this.files = this.files.concat(files);
        Promise.all(filesReady).then(function () {
          this$1.$emit('add', files);
        });
        this.__computeTotalSize();
      }
    },
    __computeTotalSize: function __computeTotalSize () {
      this.totalSize = this.queueLength
        ? this.queue.map(function (f) { return f.size; }).reduce(function (total, size) { return total + size; })
        : 0;
    },
    __remove: function __remove (file) {
      var
        name = file.name,
        done = file.__doneUploading;

      if (this.uploading && !done) {
        this.$emit('remove:abort', file, file.xhr);
        file.xhr.abort();
        this.uploadedSize -= file.__uploaded;
      }
      else {
        this.$emit(("remove:" + (done ? 'done' : 'cancel')), file, file.xhr);
      }

      if (!done) {
        this.queue = this.queue.filter(function (obj) { return obj.name !== name; });
      }

      file.__removed = true;
      this.files = this.files.filter(function (obj) { return obj.name !== name; });
      this.__computeTotalSize();
    },
    __pick: function __pick () {
      if (!this.addDisabled && this.$q.platform.is.mozilla) {
        this.$refs.file.click();
      }
    },
    __getUploadPromise: function __getUploadPromise (file) {
      var this$1 = this;

      var
        form = new FormData(),
        xhr = new XMLHttpRequest();

      try {
        this.additionalFields.forEach(function (field) {
          form.append(field.name, field.value);
        });
        form.append('Content-Type', file.type || 'application/octet-stream');
        form.append(this.name, file);
      }
      catch (e) {
        return
      }

      initFile(file);
      file.xhr = xhr;
      return new Promise(function (resolve, reject) {
        xhr.upload.addEventListener('progress', function (e) {
          if (file.__removed) { return }
          e.percent = e.total ? e.loaded / e.total : 0;
          var uploaded = e.percent * file.size;
          this$1.uploadedSize += uploaded - file.__uploaded;
          file.__uploaded = uploaded;
          file.__progress = Math.min(99, parseInt(e.percent * 100, 10));
        }, false);

        xhr.onreadystatechange = function () {
          if (xhr.readyState < 4) {
            return
          }
          if (xhr.status && xhr.status < 400) {
            file.__doneUploading = true;
            file.__progress = 100;
            this$1.$emit('uploaded', file, xhr);
            resolve(file);
          }
          else {
            file.__failed = true;
            this$1.$emit('fail', file, xhr);
            reject(xhr);
          }
        };

        xhr.onerror = function () {
          file.__failed = true;
          this$1.$emit('fail', file, xhr);
          reject(xhr);
        };

        var resolver = this$1.urlFactory
          ? this$1.urlFactory(file)
          : Promise.resolve(this$1.url);

        resolver.then(function (url) {
          xhr.open(this$1.method, url, true);
          if (this$1.headers) {
            Object.keys(this$1.headers).forEach(function (key) {
              xhr.setRequestHeader(key, this$1.headers[key]);
            });
          }

          this$1.xhrs.push(xhr);
          if (this$1.sendRaw) {
            xhr.send(file);
          }
          else {
            xhr.send(form);
          }
        });
      })
    },
    pick: function pick () {
      if (!this.addDisabled) {
        this.$refs.file.click();
      }
    },
    upload: function upload () {
      var this$1 = this;

      var length = this.queueLength;
      if (this.disable || length === 0) {
        return
      }

      var filesDone = 0;
      this.uploadedSize = 0;
      this.uploading = true;
      this.xhrs = [];
      this.$emit('start');

      var solved = function () {
        filesDone++;
        if (filesDone === length) {
          this$1.uploading = false;
          this$1.xhrs = [];
          this$1.queue = this$1.queue.filter(function (f) { return !f.__doneUploading; });
          this$1.__computeTotalSize();
          this$1.$emit('finish');
        }
      };

      this.queue
        .map(function (file) { return this$1.__getUploadPromise(file); })
        .forEach(function (promise) {
          promise.then(solved).catch(solved);
        });
    },
    abort: function abort () {
      this.xhrs.forEach(function (xhr) { xhr.abort(); });
      this.uploading = false;
    },
    reset: function reset () {
      this.abort();
      this.files = [];
      this.queue = [];
      this.expanded = false;
      this.__computeTotalSize();
      this.$emit('reset');
    }
  }
}

var QVideo = {
  name: 'QVideo',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    iframeData: function iframeData () {
      return {
        attrs: {
          src: this.src,
          frameborder: '0',
          allowfullscreen: true
        }
      }
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-video'
    }, [
      h('iframe', this.iframeData)
    ])
  }
}



var components = /*#__PURE__*/Object.freeze({
QActionSheet: QActionSheet,
QAjaxBar: QAjaxBar,
QAlert: QAlert,
QAutocomplete: QAutocomplete,
QBreadcrumbs: QBreadcrumbs,
QBreadcrumbsEl: QBreadcrumbsEl,
QBtn: QBtn,
QBtnGroup: QBtnGroup,
QBtnDropdown: QBtnDropdown,
QBtnToggle: QBtnToggle,
QCard: QCard,
QCardTitle: QCardTitle,
QCardMain: QCardMain,
QCardActions: QCardActions,
QCardMedia: QCardMedia,
QCardSeparator: QCardSeparator,
QCarousel: QCarousel,
QCarouselSlide: QCarouselSlide,
QCarouselControl: QCarouselControl,
QChatMessage: QChatMessage,
QCheckbox: QCheckbox,
QChip: QChip,
QChipsInput: QChipsInput,
QCollapsible: QCollapsible,
QColor: QColor,
QColorPicker: QColorPicker,
QContextMenu: QContextMenu,
QDatetime: QDatetime,
QDatetimePicker: QDatetimePicker,
QDialog: QDialog,
QEditor: QEditor,
QFab: QFab,
QFabAction: QFabAction,
QField: QField,
QIcon: QIcon,
QInfiniteScroll: QInfiniteScroll,
QInnerLoading: QInnerLoading,
QInput: QInput,
QInputFrame: QInputFrame,
QKnob: QKnob,
QLayout: QLayout,
QLayoutDrawer: QLayoutDrawer,
QLayoutFooter: QLayoutFooter,
QLayoutHeader: QLayoutHeader,
QPage: QPage,
QPageContainer: QPageContainer,
QPageSticky: QPageSticky,
QItem: QItem,
QItemSeparator: QItemSeparator,
QItemMain: QItemMain,
QItemSide: QItemSide,
QItemTile: QItemTile,
QItemWrapper: QItemWrapper,
QList: QList,
QListHeader: QListHeader,
QModal: QModal,
QModalLayout: QModalLayout,
QResizeObservable: QResizeObservable,
QScrollObservable: QScrollObservable,
QWindowResizeObservable: QWindowResizeObservable,
QOptionGroup: QOptionGroup,
QPagination: QPagination,
QParallax: QParallax,
QPopover: QPopover,
QProgress: QProgress,
QPullToRefresh: QPullToRefresh,
QRadio: QRadio,
QRange: QRange,
QRating: QRating,
QScrollArea: QScrollArea,
QSearch: QSearch,
QSelect: QSelect,
QSlideTransition: QSlideTransition,
QSlider: QSlider,
QSpinner: QSpinner,
QSpinnerAudio: audio,
QSpinnerBall: ball,
QSpinnerBars: bars,
QSpinnerCircles: circles,
QSpinnerComment: comment,
QSpinnerCube: cube,
QSpinnerDots: dots,
QSpinnerFacebook: facebook,
QSpinnerGears: gears,
QSpinnerGrid: grid,
QSpinnerHearts: hearts,
QSpinnerHourglass: hourglass,
QSpinnerInfinity: infinity,
QSpinnerIos: DefaultSpinner,
QSpinnerMat: QSpinner_mat,
QSpinnerOval: oval,
QSpinnerPie: pie,
QSpinnerPuff: puff,
QSpinnerRadio: radio,
QSpinnerRings: rings,
QSpinnerTail: tail,
QStep: QStep,
QStepper: QStepper,
QStepperNavigation: QStepperNavigation,
QRouteTab: QRouteTab,
QTab: QTab,
QTabPane: QTabPane,
QTabs: QTabs,
QTable: QTable,
QTh: QTh,
QTr: QTr,
QTd: QTd,
QTableColumns: QTableColumns,
QTimeline: QTimeline,
QTimelineEntry: QTimelineEntry,
QToggle: QToggle,
QToolbar: QToolbar,
QToolbarTitle: QToolbarTitle,
QTooltip: QTooltip,
QTree: QTree,
QUploader: QUploader,
QVideo: QVideo
});

function updateBinding (el, ref) {
  var value = ref.value;
  var modifiers = ref.modifiers;

  var ctx = el.__qbacktotop;

  if (!value) {
    ctx.update();
    return
  }

  if (typeof value === 'number') {
    ctx.offset = value;
    ctx.update();
    return
  }

  if (value && Object(value) !== value) {
    console.error('v-back-to-top requires an object {offset, duration} as parameter', el);
    return
  }

  if (value.offset) {
    if (typeof value.offset !== 'number') {
      console.error('v-back-to-top requires a number as offset', el);
      return
    }
    ctx.offset = value.offset;
  }
  if (value.duration) {
    if (typeof value.duration !== 'number') {
      console.error('v-back-to-top requires a number as duration', el);
      return
    }
    ctx.duration = value.duration;
  }

  ctx.update();
}

var backToTop = {
  name: 'back-to-top',
  bind: function bind (el) {
    var ctx = {
      offset: 200,
      duration: 300,
      updateNow: function () {
        var trigger = getScrollPosition(ctx.scrollTarget) <= ctx.offset;

        if (trigger !== el.classList.contains('hidden')) {
          el.classList[trigger ? 'add' : 'remove']('hidden');
        }
      },
      goToTop: function goToTop () {
        setScrollPosition(ctx.scrollTarget, 0, ctx.animate ? ctx.duration : 0);
      }
    };
    ctx.update = debounce(ctx.updateNow, 25);
    el.classList.add('hidden');
    el.__qbacktotop = ctx;
  },
  inserted: function inserted (el, binding) {
    var ctx = el.__qbacktotop;
    ctx.scrollTarget = getScrollTarget(el);
    ctx.animate = binding.modifiers.animate;
    updateBinding(el, binding);
    ctx.scrollTarget.addEventListener('scroll', ctx.update, listenOpts.passive);
    window.addEventListener('resize', ctx.update, listenOpts.passive);
    el.addEventListener('click', ctx.goToTop);
  },
  update: function update (el, binding) {
    if (JSON.stringify(binding.oldValue) !== JSON.stringify(binding.value)) {
      updateBinding(el, binding);
    }
    else {
      setTimeout(function () {
        el.__qbacktotop && el.__qbacktotop.updateNow();
      }, 0);
    }
  },
  unbind: function unbind (el) {
    var ctx = el.__qbacktotop;
    if (!ctx) { return }
    ctx.scrollTarget.removeEventListener('scroll', ctx.update, listenOpts.passive);
    window.removeEventListener('resize', ctx.update, listenOpts.passive);
    el.removeEventListener('click', ctx.goToTop);
    delete el.__qbacktotop;
  }
}

var closeOverlay = {
  name: 'close-overlay',
  bind: function bind (el, binding, vnode) {
    var handler = function (ev) {
      var vm = vnode.componentInstance;
      while ((vm = vm.$parent)) {
        var name = vm.$options.name;
        if (name === 'QPopover' || name === 'QModal') {
          vm.hide(ev);
          break
        }
      }
    };
    el.__qclose = { handler: handler };
    el.addEventListener('click', handler);
  },
  unbind: function unbind (el) {
    var ctx = el.__qclose;
    if (!ctx) { return }
    el.removeEventListener('click', ctx.handler);
    delete el.__qclose;
  }
}

var goBack = {
  name: 'go-back',
  bind: function bind (el, ref, vnode) {
    var value = ref.value;
    var modifiers = ref.modifiers;

    var ctx = { value: value, position: window.history.length - 1, single: modifiers.single };

    if (Platform.is.cordova) {
      ctx.goBack = function () {
        vnode.context.$router.go(ctx.single ? -1 : ctx.position - window.history.length);
      };
    }
    else {
      ctx.goBack = function () {
        vnode.context.$router.replace(ctx.value);
      };
    }

    el.__qgoback = ctx;
    el.addEventListener('click', ctx.goBack);
  },
  update: function update (el, binding) {
    if (binding.oldValue !== binding.value) {
      el.__qgoback.value = binding.value;
    }
  },
  unbind: function unbind (el) {
    var ctx = el.__qgoback;
    if (!ctx) { return }
    el.removeEventListener('click', ctx.goBack);
    delete el.__qgoback;
  }
}

function updateBinding$1 (el, binding) {
  var ctx = el.__qscrollfire;

  if (typeof binding.value !== 'function') {
    ctx.scrollTarget.removeEventListener('scroll', ctx.scroll);
    console.error('v-scroll-fire requires a function as parameter', el);
    return
  }

  ctx.handler = binding.value;
  if (typeof binding.oldValue !== 'function') {
    ctx.scrollTarget.addEventListener('scroll', ctx.scroll, listenOpts.passive);
    ctx.scroll();
  }
}

var scrollFire = {
  name: 'scroll-fire',
  bind: function bind (el, binding) {
    var ctx = {
      scroll: debounce(function () {
        var containerBottom, elementBottom, fire;

        if (ctx.scrollTarget === window) {
          elementBottom = el.getBoundingClientRect().bottom;
          fire = elementBottom < window.innerHeight;
        }
        else {
          containerBottom = offset(ctx.scrollTarget).top + height(ctx.scrollTarget);
          elementBottom = offset(el).top + height(el);
          fire = elementBottom < containerBottom;
        }

        if (fire) {
          ctx.scrollTarget.removeEventListener('scroll', ctx.scroll, listenOpts.passive);
          ctx.handler(el);
        }
      }, 25)
    };

    el.__qscrollfire = ctx;
  },
  inserted: function inserted (el, binding) {
    var ctx = el.__qscrollfire;
    ctx.scrollTarget = getScrollTarget(el);
    updateBinding$1(el, binding);
  },
  update: function update (el, binding) {
    if (binding.value !== binding.oldValue) {
      updateBinding$1(el, binding);
    }
  },
  unbind: function unbind (el) {
    var ctx = el.__qscrollfire;
    if (!ctx) { return }
    ctx.scrollTarget.removeEventListener('scroll', ctx.scroll, listenOpts.passive);
    delete el.__qscrollfire;
  }
}

function updateBinding$2 (el, binding) {
  var ctx = el.__qscroll;

  if (typeof binding.value !== 'function') {
    ctx.scrollTarget.removeEventListener('scroll', ctx.scroll, listenOpts.passive);
    console.error('v-scroll requires a function as parameter', el);
    return
  }

  ctx.handler = binding.value;
  if (typeof binding.oldValue !== 'function') {
    ctx.scrollTarget.addEventListener('scroll', ctx.scroll, listenOpts.passive);
  }
}

var scroll$1 = {
  name: 'scroll',
  bind: function bind (el, binding) {
    var ctx = {
      scroll: function scroll () {
        ctx.handler(getScrollPosition(ctx.scrollTarget));
      }
    };
    el.__qscroll = ctx;
  },
  inserted: function inserted (el, binding) {
    var ctx = el.__qscroll;
    ctx.scrollTarget = getScrollTarget(el);
    updateBinding$2(el, binding);
  },
  update: function update (el, binding) {
    if (binding.oldValue !== binding.value) {
      updateBinding$2(el, binding);
    }
  },
  unbind: function unbind (el) {
    var ctx = el.__qscroll;
    if (!ctx) { return }
    ctx.scrollTarget.removeEventListener('scroll', ctx.scroll, listenOpts.passive);
    delete el.__qscroll;
  }
}

function updateBinding$3 (el, binding) {
  var ctx = el.__qtouchhold;

  ctx.duration = parseInt(binding.arg, 10) || 600;

  if (binding.oldValue !== binding.value) {
    ctx.handler = binding.value;
  }
}

var touchHold = {
  name: 'touch-hold',
  bind: function bind (el, binding) {
    var
      mouse = !binding.modifiers.noMouse,
      stopPropagation = binding.modifiers.stop,
      preventDefault = binding.modifiers.prevent;

    var ctx = {
      mouseStart: function mouseStart (evt) {
        if (leftClick(evt)) {
          document.addEventListener('mousemove', ctx.mouseAbort);
          document.addEventListener('mouseup', ctx.mouseAbort);
          ctx.start(evt);
        }
      },
      mouseAbort: function mouseAbort (evt) {
        document.removeEventListener('mousemove', ctx.mouseAbort);
        document.removeEventListener('mouseup', ctx.mouseAbort);
        ctx.abort(evt);
      },

      start: function start (evt) {
        var startTime = new Date().getTime();

        stopPropagation && evt.stopPropagation();
        preventDefault && evt.preventDefault();

        ctx.timer = setTimeout(function () {
          if (mouse) {
            document.removeEventListener('mousemove', ctx.mouseAbort);
            document.removeEventListener('mouseup', ctx.mouseAbort);
          }

          ctx.handler({
            evt: evt,
            position: position(evt),
            duration: new Date().getTime() - startTime
          });
        }, ctx.duration);
      },
      abort: function abort (evt) {
        clearTimeout(ctx.timer);
        ctx.timer = null;
      }
    };

    el.__qtouchhold = ctx;
    updateBinding$3(el, binding);

    if (mouse) {
      el.addEventListener('mousedown', ctx.mouseStart);
    }
    el.addEventListener('touchstart', ctx.start);
    el.addEventListener('touchmove', ctx.abort);
    el.addEventListener('touchend', ctx.abort);
  },
  update: function update (el, binding) {
    updateBinding$3(el, binding);
  },
  unbind: function unbind (el, binding) {
    var ctx = el.__qtouchhold;
    if (!ctx) { return }
    el.removeEventListener('touchstart', ctx.start);
    el.removeEventListener('touchend', ctx.abort);
    el.removeEventListener('touchmove', ctx.abort);
    el.removeEventListener('mousedown', ctx.mouseStart);
    document.removeEventListener('mousemove', ctx.mouseAbort);
    document.removeEventListener('mouseup', ctx.mouseAbort);
    delete el.__qtouchhold;
  }
}



var directives = /*#__PURE__*/Object.freeze({
BackToTop: backToTop,
CloseOverlay: closeOverlay,
GoBack: goBack,
Ripple: Ripple,
ScrollFire: scrollFire,
Scroll: scroll$1,
TouchHold: touchHold,
TouchPan: TouchPan,
TouchSwipe: TouchSwipe
});

function modalFn (Component, Vue$$1) {
  return function (props) {
    var node = document.createElement('div');
    document.body.appendChild(node);

    return new Promise(function (resolve, reject) {
      var vm = new Vue$$1({
        el: node,
        data: function data () {
          return { props: props }
        },
        render: function (h) { return h(Component, {
          props: props,
          ref: 'modal',
          on: {
            ok: function (data) {
              resolve(data);
              vm.$destroy();
            },
            cancel: function () {
              reject(new Error());
              vm.$destroy();
            }
          }
        }); },
        mounted: function mounted () {
          this.$refs.modal.show();
        }
      });
    })
  }
}

var actionSheet = {
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;
    var Vue$$1 = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    this.create = $q.actionSheet = modalFn(QActionSheet, Vue$$1);
  }
}

var metaValue;

function getProp () {
  if (Platform.is.winphone) {
    return 'msapplication-navbutton-color'
  }
  if (Platform.is.safari) {
    return 'apple-mobile-web-app-status-bar-style'
  }
  // Chrome, Firefox OS, Opera, Vivaldi
  return 'theme-color'
}

function getMetaTag (v) {
  var els = document.getElementsByTagName('META');
  for (var i in els) {
    if (els[i].name === v) {
      return els[i]
    }
  }
}

function setColor (hexColor) {
  if (metaValue === void 0) {
    // cache it
    metaValue = getProp();
  }

  var metaTag = getMetaTag(metaValue);
  var newTag = metaTag === void 0;

  if (newTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('name', metaValue);
  }

  metaTag.setAttribute('content', hexColor);

  if (newTag) {
    document.getElementsByTagName('HEAD')[0].appendChild(metaTag);
  }
}

var addressbarColor = {
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;
    var Vue$$1 = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    $q.addressbarColor = this;
  },

  set: function set (hexColor) {
    if (!Platform.is.mobile || Platform.is.cordova || isSSR) {
      return
    }
    if (!Platform.is.winphone && !Platform.is.safari && !Platform.is.webkit && !Platform.is.vivaldi) {
      return
    }

    ready(function () {
      setColor(hexColor || getBrand('primary'));
    });
  }
}

var appFullscreen = {
  isCapable: false,
  isActive: false,
  __prefixes: {},

  request: function request (target) {
    if (this.isCapable && !this.isActive) {
      target = target || document.documentElement;
      target[this.__prefixes.request]();
    }
  },
  exit: function exit () {
    if (this.isCapable && this.isActive) {
      document[this.__prefixes.exit]();
    }
  },
  toggle: function toggle (target) {
    if (this.isActive) {
      this.exit();
    }
    else {
      this.request(target);
    }
  },

  __installed: false,
  install: function install (ref) {
    var this$1 = this;
    var $q = ref.$q;
    var Vue$$1 = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    $q.fullscreen = this;

    if (isSSR) {
      return
    }

    var request = [
      'requestFullscreen',
      'msRequestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen'
    ].find(function (request) { return document.documentElement[request]; });

    this.isCapable = request !== undefined;
    if (!this.isCapable) {
      // it means the browser does NOT support it
      return
    }

    var exit = [
      'exitFullscreen',
      'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'
    ].find(function (exit) { return document[exit]; });

    this.__prefixes = {
      request: request,
      exit: exit
    };

    this.isActive = !!(document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement)

    ;[
      'onfullscreenchange',
      'onmsfullscreenchange', 'onmozfullscreenchange', 'onwebkitfullscreenchange'
    ].forEach(function (evt) {
      document[evt] = function () {
        this$1.isActive = !this$1.isActive;
      };
    });

    Vue$$1.util.defineReactive(this, 'isActive', this.isActive);
  }
}

var appVisibility = {
  appVisible: false,

  __installed: false,
  install: function install (ref) {
    var this$1 = this;
    var $q = ref.$q;
    var Vue$$1 = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    if (isSSR) {
      this.appVisible = $q.appVisible = true;
      return
    }

    var prop, evt;

    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
      prop = 'hidden';
      evt = 'visibilitychange';
    }
    else if (typeof document.msHidden !== 'undefined') {
      prop = 'msHidden';
      evt = 'msvisibilitychange';
    }
    else if (typeof document.webkitHidden !== 'undefined') {
      prop = 'webkitHidden';
      evt = 'webkitvisibilitychange';
    }

    var update = function () {
      this$1.appVisible = $q.appVisible = !document[prop];
    };

    update();

    if (evt && typeof document[prop] !== 'undefined') {
      Vue$$1.util.defineReactive($q, 'appVisible', this.appVisible);
      document.addEventListener(evt, update, false);
    }
  }
}

function encode (string) {
  return encodeURIComponent(string)
}

function decode (string) {
  return decodeURIComponent(string)
}

function stringifyCookieValue (value) {
  return encode(value === Object(value) ? JSON.stringify(value) : '' + value)
}

function read (string) {
  if (string === '') {
    return string
  }

  if (string.indexOf('"') === 0) {
    // This is a quoted cookie as according to RFC2068, unescape...
    string = string.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }

  // Replace server-side written pluses with spaces.
  // If we can't decode the cookie, ignore it, it's unusable.
  // If we can't parse the cookie, ignore it, it's unusable.
  string = decode(string.replace(/\+/g, ' '));

  try {
    string = JSON.parse(string);
  }
  catch (e) {}

  return string
}

function set (key, val, opts) {
  if ( opts === void 0 ) opts = {};

  var time = opts.expires;

  if (typeof opts.expires === 'number') {
    time = new Date();
    time.setMilliseconds(time.getMilliseconds() + opts.expires * 864e+5);
  }

  document.cookie = [
    encode(key), '=', stringifyCookieValue(val),
    time ? '; expires=' + time.toUTCString() : '', // use expires attribute, max-age is not supported by IE
    opts.path ? '; path=' + opts.path : '',
    opts.domain ? '; domain=' + opts.domain : '',
    opts.secure ? '; secure' : ''
  ].join('');
}

function get (key) {
  var
    result = key ? undefined : {},
    cookies = document.cookie ? document.cookie.split('; ') : [],
    i = 0,
    l = cookies.length,
    parts,
    name,
    cookie;

  for (; i < l; i++) {
    parts = cookies[i].split('=');
    name = decode(parts.shift());
    cookie = parts.join('=');

    if (!key) {
      result[name] = cookie;
    }
    else if (key === name) {
      result = read(cookie);
      break
    }
  }

  return result
}

function remove (key, options) {
  set(key, '', extend(true, {}, options, {
    expires: -1
  }));
}

function has (key) {
  return get(key) !== undefined
}

var cookies = {
  get: get,
  set: set,
  has: has,
  remove: remove,
  all: function () { return get(); },

  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;

    if (this.__installed) { return }
    this.__installed = true;

    if (isSSR) {
      var noop = function () {};
      this.get = noop;
      this.set = noop;
      this.has = noop;
      this.remove = noop;
      this.all = noop;
    }

    $q.cookies = this;
  }
}

var dialog = {
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;
    var Vue$$1 = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    this.create = $q.dialog = isSSR
      ? function () { return new Promise(); }
      : modalFn(QDialog, Vue$$1);
  }
}

var
  vm,
  timeout,
  props = {};

var staticClass = 'q-loading animate-fade fullscreen column flex-center z-max';

var Loading = {
  isActive: false,

  show: function show (ref) {
    var this$1 = this;
    if ( ref === void 0 ) ref = {};
    var delay = ref.delay; if ( delay === void 0 ) delay = 500;
    var message = ref.message; if ( message === void 0 ) message = false;
    var spinnerSize = ref.spinnerSize; if ( spinnerSize === void 0 ) spinnerSize = 80;
    var spinnerColor = ref.spinnerColor; if ( spinnerColor === void 0 ) spinnerColor = 'white';
    var messageColor = ref.messageColor; if ( messageColor === void 0 ) messageColor = 'white';
    var spinner = ref.spinner; if ( spinner === void 0 ) spinner = QSpinner;
    var customClass = ref.customClass; if ( customClass === void 0 ) customClass = false;

    if (isSSR) { return }

    props.spinner = spinner;
    props.message = message;
    props.spinnerSize = spinnerSize;
    props.spinnerColor = spinnerColor;
    props.messageColor = messageColor;

    if (typeof customClass === 'string') {
      props.customClass = customClass.trim();
    }

    if (this.isActive) {
      vm && vm.$forceUpdate();
      return
    }

    timeout = setTimeout(function () {
      timeout = null;

      var node = document.createElement('div');
      document.body.appendChild(node);
      document.body.classList.add('with-loading');

      vm = new this$1.__Vue({
        name: 'QLoading',
        el: node,
        render: function render (h) {
          return h('div', {
            staticClass: staticClass,
            'class': props.customClass
          }, [
            h(props.spinner, {
              props: {
                color: props.spinnerColor,
                size: props.spinnerSize
              }
            }),
            message
              ? h('div', {
                'class': ("text-" + (props.messageColor)),
                domProps: {
                  innerHTML: props.message
                }
              })
              : null
          ])
        }
      });
    }, delay);

    this.isActive = true;
  },
  hide: function hide () {
    if (!this.isActive) {
      return
    }

    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    else {
      vm.$destroy();
      document.body.classList.remove('with-loading');
      document.body.removeChild(vm.$el);
      vm = null;
    }

    this.isActive = false;
  },

  __Vue: null,
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;
    var Vue$$1 = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    $q.loading = Loading;
    this.__Vue = Vue$$1;
  }
};

var positionList = [
  'top-left', 'top-right',
  'bottom-left', 'bottom-right',
  'top', 'bottom', 'left', 'right', 'center'
];

function init (ref) {
  var this$1 = this;
  var $q = ref.$q;
  var Vue$$1 = ref.Vue;

  if (!document.body) {
    ready(function () {
      init.call(this$1, { $q: $q, Vue: Vue$$1 });
    });
    return
  }

  var node = document.createElement('div');
  document.body.appendChild(node);

  this.__vm = new Vue$$1({
    name: 'QNotifications',
    data: {
      notifs: {
        center: [],
        left: [],
        right: [],
        top: [],
        'top-left': [],
        'top-right': [],
        bottom: [],
        'bottom-left': [],
        'bottom-right': []
      }
    },
    methods: {
      add: function add (config) {
        var this$1 = this;

        if (!config) {
          console.error('Notify: parameter required');
          return false
        }
        var notif;
        if (typeof config === 'string') {
          notif = {
            message: config,
            position: 'bottom'
          };
        }
        else {
          notif = clone(config);
        }

        if (notif.position) {
          if (!positionList.includes(notif.position)) {
            console.error(("Notify: wrong position: " + (notif.position)));
            return false
          }
        }
        else {
          notif.position = 'bottom';
        }

        notif.__uid = uid();

        if (notif.timeout === void 0) {
          notif.timeout = 5000;
        }

        var close = function () {
          this$1.remove(notif);
        };

        if (config.actions) {
          notif.actions = config.actions.map(function (item) {
            var
              handler = item.handler,
              action = clone(item);
            action.handler = typeof handler === 'function'
              ? function () {
                handler();
                !item.noDismiss && close();
              }
              : function () { return close(); };
            return action
          });
        }

        if (typeof config.onDismiss === 'function') {
          notif.onDismiss = config.onDismiss;
        }

        if (notif.closeBtn) {
          var btn = [{
            closeBtn: true,
            label: notif.closeBtn,
            handler: close
          }];
          notif.actions = notif.actions
            ? notif.actions.concat(btn)
            : btn;
        }

        if (notif.timeout) {
          notif.__timeout = setTimeout(function () {
            close();
          }, notif.timeout + /* show duration */ 1000);
        }

        var action = notif.position.indexOf('top') > -1 ? 'unshift' : 'push';
        this.notifs[notif.position][action](notif);

        return close
      },
      remove: function remove (notif) {
        if (notif.__timeout) { clearTimeout(notif.__timeout); }

        var index = this.notifs[notif.position].indexOf(notif);
        if (index !== -1) {
          var ref = this.$refs[("notif_" + (notif.__uid))];
          if (ref && ref.$el) {
            var el = ref.$el;
            el.style.left = (el.offsetLeft) + "px";
            el.style.width = getComputedStyle(el).width;
          }
          this.notifs[notif.position].splice(index, 1);
          if (typeof notif.onDismiss === 'function') {
            notif.onDismiss();
          }
        }
      }
    },
    render: function render (h) {
      var this$1 = this;

      return h('div', { staticClass: 'q-notifications' }, positionList.map(function (pos) {
        var
          vert = ['left', 'center', 'right'].includes(pos) ? 'center' : (pos.indexOf('top') > -1 ? 'top' : 'bottom'),
          align = pos.indexOf('left') > -1 ? 'start' : (pos.indexOf('right') > -1 ? 'end' : 'center'),
          classes = ['left', 'right'].includes(pos) ? ("items-" + (pos === 'left' ? 'start' : 'end') + " justify-center") : (pos === 'center' ? 'flex-center' : ("items-" + align));

        return h('transition-group', {
          key: pos,
          staticClass: ("q-notification-list q-notification-list-" + vert + " fixed column " + classes),
          tag: 'div',
          props: {
            name: ("q-notification-" + pos),
            mode: 'out-in'
          }
        }, this$1.notifs[pos].map(function (notif) {
          return h(QAlert, {
            ref: ("notif_" + (notif.__uid)),
            key: notif.__uid,
            staticClass: 'q-notification',
            props: notif
          }, [ notif.message ])
        }))
      }))
    }
  });

  this.__vm.$mount(node);
}

var notify = {
  create: function create (opts) {
    var this$1 = this;

    if (!isSSR) {
      if (!document.body) {
        ready(function () {
          this$1.create(opts);
        });
      }
      else {
        this.__vm.add(opts);
      }
    }
  },

  __installed: false,
  install: function install (args) {
    if (this.__installed) { return }
    this.__installed = true;

    if (!isSSR) {
      init.call(this, args);
    }
    args.$q.notify = this.create.bind(this);
  }
}

var screen = {
  width: 1024,

  sizes: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },

  lt: {
    xl: true
  },
  gt: {
    xs: true,
    sm: true,
    md: true
  },
  lg: true,

  __installed: false,
  install: function install (ref) {
    var this$1 = this;
    var $q = ref.$q;
    var Vue$$1 = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    if (isSSR) {
      this.$q.screen = this;
      this.setSizes = this.setDebounce = function () {};
      return
    }

    if (document && document.body) {
      var style = getComputedStyle(document.body);

      // if css props available
      if (style.getPropertyValue('--q-size-sm')) {
        ['sm', 'md', 'lg', 'xl'].forEach(function (name) {
          this$1.sizes[name] = parseInt(style.getPropertyValue(("--q-size-" + name)), 10);
        });
      }
    }

    var update = function () {
      var
        w = window.innerWidth,
        s = this$1.sizes;

      if (w === this$1.width) {
        return
      }

      this$1.width = w;

      this$1.gt.xs = w >= s.sm;
      this$1.gt.sm = w >= s.md;
      this$1.gt.md = w >= s.lg;
      this$1.gt.lg = w >= s.xl;
      this$1.lt.sm = w < s.sm;
      this$1.lt.md = w < s.md;
      this$1.lt.lg = w < s.lg;
      this$1.lt.xl = w < s.xl;
      this$1.xs = this$1.lt.sm;
      this$1.sm = this$1.gt.xs && this$1.lt.md;
      this$1.md = this$1.gt.sm && this$1.lt.lg;
      this$1.lg = this$1.gt.md && this$1.lt.xl;
      this$1.xl = w > s.xl;
    };

    update();
    var updateEvt = debounce(update, 100);

    window.addEventListener('resize', updateEvt, listenOpts.passive);

    this.setSizes = function (sizes) {
      ['sm', 'md', 'lg', 'xl'].forEach(function (name) {
        if (sizes[name]) {
          this$1.sizes[name] = sizes[name];
        }
      });
      update();
    };
    this.setDebounce = function (delay) {
      window.removeEventListener('resize', updateEvt, listenOpts.passive);
      updateEvt = delay > 0
        ? debounce(update, delay)
        : update;
      window.addEventListener('resize', updateEvt, listenOpts.passive);
    };

    Vue$$1.util.defineReactive($q, 'screen', this);
  }
}

function encode$1 (value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return '__q_date|' + value.toUTCString()
  }
  if (Object.prototype.toString.call(value) === '[object RegExp]') {
    return '__q_expr|' + value.source
  }
  if (typeof value === 'number') {
    return '__q_numb|' + value
  }
  if (typeof value === 'boolean') {
    return '__q_bool|' + (value ? '1' : '0')
  }
  if (typeof value === 'string') {
    return '__q_strn|' + value
  }
  if (typeof value === 'function') {
    return '__q_strn|' + value.toString()
  }
  if (value === Object(value)) {
    return '__q_objt|' + JSON.stringify(value)
  }

  // hmm, we don't know what to do with it,
  // so just return it as is
  return value
}

function decode$1 (value) {
  var type, length, source;

  length = value.length;
  if (length < 9) {
    // then it wasn't encoded by us
    return value
  }

  type = value.substr(0, 8);
  source = value.substring(9);

  switch (type) {
    case '__q_date':
      return new Date(source)

    case '__q_expr':
      return new RegExp(source)

    case '__q_numb':
      return Number(source)

    case '__q_bool':
      return Boolean(source === '1')

    case '__q_strn':
      return '' + source

    case '__q_objt':
      return JSON.parse(source)

    default:
      // hmm, we reached here, we don't know the type,
      // then it means it wasn't encoded by us, so just
      // return whatever value it is
      return value
  }
}

function getEmptyStorage () {
  var fn = function () { return null; };

  return {
    has: fn,
    get: {
      length: fn,
      item: fn,
      index: fn,
      all: fn
    },
    set: fn,
    remove: fn,
    clear: fn,
    isEmpty: fn
  }
}

function getStorage (type) {
  var
    webStorage = window[type + 'Storage'],
    get = function (key) {
      var item = webStorage.getItem(key);
      return item
        ? decode$1(item)
        : null
    };

  return {
    has: function (key) { return webStorage.getItem(key) !== null; },
    get: {
      length: function () { return webStorage.length; },
      item: get,
      index: function (index) {
        if (index < webStorage.length) {
          return get(webStorage.key(index))
        }
      },
      all: function () {
        var result = {}, key, len = webStorage.length;

        for (var i = 0; i < len; i++) {
          key = webStorage.key(i);
          result[key] = get(key);
        }

        return result
      }
    },
    set: function (key, value) { webStorage.setItem(key, encode$1(value)); },
    remove: function (key) { webStorage.removeItem(key); },
    clear: function () { webStorage.clear(); },
    isEmpty: function () { return webStorage.length === 0; }
  }
}

var LocalStorage = {
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;

    if (this.__installed) { return }
    this.__installed = true;

    if ($q.platform.has.webStorage) {
      var storage = getStorage('local');
      $q.localStorage = storage;
      extend(true, this, storage);
    }
    else {
      $q.localStorage = getEmptyStorage();
    }
  }
};

var SessionStorage = {
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;

    if (this.__installed) { return }
    this.__installed = true;

    if ($q.platform.has.webStorage) {
      var storage = getStorage('session');
      $q.sessionStorage = storage;
      extend(true, this, storage);
    }
    else {
      $q.sessionStorage = getEmptyStorage();
    }
  }
};



var plugins = /*#__PURE__*/Object.freeze({
ActionSheet: actionSheet,
AddressbarColor: addressbarColor,
AppFullscreen: appFullscreen,
AppVisibility: appVisibility,
Cookies: cookies,
Dialog: dialog,
Loading: Loading,
Notify: notify,
Platform: Platform,
Screen: screen,
LocalStorage: LocalStorage,
SessionStorage: SessionStorage
});

function openUrl (url, reject) {
  if (Platform.is.cordova && navigator && navigator.app) {
    return navigator.app.loadUrl(url, {
      openExternal: true
    })
  }

  var win = window.open(url, '_blank');

  if (win) {
    win.focus();
    return win
  }
  else {
    reject();
  }
}

function noop () {}

var utils = /*#__PURE__*/Object.freeze({
animate: animate,
clone: clone,
colors: colors,
date: date,
debounce: debounce,
frameDebounce: frameDebounce,
dom: dom,
easing: easing,
event: event,
extend: extend,
filter: filter,
format: format,
noop: noop,
openURL: openUrl,
scroll: scroll,
throttle: throttle,
uid: uid
});

if (Vue === void 0) {
  console.error('[ Quasar ] Vue is required to run. Please add a script tag for it before loading Quasar.');
}
else {
  Vue.use({ install: install }, {
    components: components,
    directives: directives,
    plugins: plugins
  });
}

var index_umd = {
  version: version,
  theme: "ios",

  i18n: i18n,
  icons: icons,
  components: components,
  directives: directives,
  plugins: plugins,
  utils: utils
}

return index_umd;

})));
