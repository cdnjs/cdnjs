/**
 * Vuikit 0.9.0
 * (c) 2018 Miljan Aleksic
 * @license MIT
**/

/* Substantial part of the code is adapted from UIkit,
  Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vuikit = factory());
}(this, (function () { 'use strict';

  var isString = function (str) { return typeof str === 'string'; };
  var isObject = function (obj) { return obj !== null && typeof obj === 'object'; };
  function pick (obj, paths) {
    return paths
      .map(function (k) {
        var obj$1;
        return k in obj ? ( obj$1 = {}, obj$1[k] = obj[k], obj$1 ) : {};
    })
      .reduce(function (res, o) { return assign(res, o); }, {})
  }
  function get (obj, path, defVal) {
    var result = isObject(obj) && isString(path)
      ? _get(obj, path)
      : undefined;
    return result === undefined
      ? defVal
      : result
  }
  function _get (obj, path) {
    return path.split('.').reduce(function (acc, val) { return acc && acc[val]; }, obj)
  }
  var assign = Object.assign || function (target) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    target = Object(target);
    for (var i = 0; i < args.length; i++) {
      var source = args[i];
      if (source !== null) {
        for (var key in source) {
          if (hasOwn(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target
  };
  function each (obj, cb) {
    for (var key in obj) {
      if (cb.call(obj[key], obj[key], key) === false) {
        break
      }
    }
  }
  var ref = Object.prototype;
  var hasOwnProperty = ref.hasOwnProperty;
  function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  }

  function findParents (instance, filter) {
    var parents = [];
    var parent = instance.$parent;
    while (parent) {
      var itPassFilters = !filter || runFilter(parent, filter);
      if (itPassFilters) {
        parents.unshift(parent);
      }
      parent = parent.$parent;
    }
    return parents
  }
  function findChildren ($root, filter) {
    var matched = [];
    $root.$children.forEach(function (child) {
      var itPassFilters = !filter || runFilter(child, filter);
      if (itPassFilters) {
        matched.push(child);
      }
      matched = matched.concat( findChildren(child, filter));
    });
    return matched
  }
  function runFilter (instance, filter) {
    return Object.keys(filter).every(function (key) { return get(instance, key) === filter[key]; })
  }
  function apply (instance, fn) {
    if (!instance || !instance._isVue) {
      return
    }
    fn(instance);
    instance.$children.forEach(function (child) { return apply(child, fn); });
  }
  function filterOutTextNodes (nodes) {
    return nodes.filter(function (n) { return n.tag || isAsyncPlaceholder(n); })
  }
  function isAsyncPlaceholder (node) {
    return node.isComment && node.asyncFactory
  }
  function extractProps () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var props = {};
    for (var i = 0; i < args.length; i++) {
      var def = args[i];
      if (def !== null) {
        def.mixins && def.mixins.forEach(function (mixin) {
          assign(props, mixin.props || {});
        });
        def.extends && assign(props, extractProps(def.extends));
        def.props && assign(props, def.props);
      }
    }
    return props
  }
  function mergeData () {
    var arguments$1 = arguments;
    var mergeTarget = {};
    var i = arguments.length;
    var prop;
    var event;
    while (i--) {
      for (var _i = 0, _a = Object.keys(arguments[i]); _i < _a.length; _i++) {
        prop = _a[_i];
        switch (prop) {
          case 'class':
          case 'style':
          case 'directives':
            if (!Array.isArray(mergeTarget[prop])) {
              mergeTarget[prop] = [];
            }
            mergeTarget[prop] = mergeTarget[prop].concat(arguments$1[i][prop]);
            break
          case 'staticClass':
            if (!arguments$1[i][prop]) {
              break
            }
            if (mergeTarget[prop] === undefined) {
              mergeTarget[prop] = '';
            }
            if (mergeTarget[prop]) {
              mergeTarget[prop] += ' ';
            }
            mergeTarget[prop] += arguments$1[i][prop].trim();
            break
          case 'on':
          case 'nativeOn':
            if (!mergeTarget[prop]) {
              mergeTarget[prop] = {};
            }
            for (var _b = 0, _c = Object.keys(arguments[i][prop] || {}); _b < _c.length; _b++) {
              event = _c[_b];
              if (mergeTarget[prop][event]) {
                mergeTarget[prop][event] = [].concat(mergeTarget[prop][event], arguments$1[i][prop][event]);
              } else {
                mergeTarget[prop][event] = arguments$1[i][prop][event];
              }
            }
            break
          case 'attrs':
          case 'props':
          case 'domProps':
          case 'scopedSlots':
          case 'staticStyle':
          case 'hook':
          case 'transition':
            if (!mergeTarget[prop]) {
              mergeTarget[prop] = {};
            }
            mergeTarget[prop] = assign({}, arguments$1[i][prop], mergeTarget[prop]);
            break
          case 'slot':
          case 'key':
          case 'ref':
          case 'tag':
          case 'show':
          case 'keepAlive':
          default:
            if (!mergeTarget[prop]) {
              mergeTarget[prop] = arguments$1[i][prop];
            }
        }
      }
    }
    return mergeTarget
  }

  var breadcrumb = {
    functional: true,
    render: function (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      return h('ul', mergeData(data, {
        class: 'uk-breadcrumb'
      }), children)
    }
  };

  var hyphenateRe = /([a-z\d])([A-Z])/g;
  function hyphenate (str) {
    return str
      .replace(hyphenateRe, '$1-$2')
      .toLowerCase()
  }
  function toUpper (_, c) {
    return c ? c.toUpperCase() : ''
  }
  function ucfirst (str) {
    return (str && str.length) ? toUpper(null, str.charAt(0)) + str.slice(1) : ''
  }
  var strPrototype = String.prototype;
  var startsWithFn = strPrototype.startsWith || function (search) { return this.lastIndexOf(search, 0) === 0 };
  function startsWith (str, search) {
    return startsWithFn.call(str, search)
  }
  var endsWithFn = strPrototype.endsWith || function (search) { return this.substr(-search.length) === search };
  function endsWith (str, search) {
    return endsWithFn.call(str, search)
  }
  var includesFn = function (search) { return ~this.indexOf(search) };
  var includesStr = strPrototype.includes || includesFn;
  var includesArray = Array.prototype.includes || includesFn;
  function includes (obj, search) {
    return obj && (isString$1(obj) ? includesStr : includesArray).call(obj, search)
  }
  var isArray = Array.isArray;
  function isFunction (obj) {
    return typeof obj === 'function'
  }
  function isObject$1 (obj) {
    return obj !== null && typeof obj === 'object'
  }
  function isPlainObject (obj) {
    return isObject$1(obj) && Object.getPrototypeOf(obj) === Object.prototype
  }
  function isWindow (obj) {
    return isObject$1(obj) && obj === obj.window
  }
  function isDocument (obj) {
    return isObject$1(obj) && obj.nodeType === 9
  }
  function isJQuery (obj) {
    return isObject$1(obj) && !!obj.jquery
  }
  function isNode (element) {
    return typeof Node !== 'undefined' && element instanceof Node || isObject$1(element) && element.nodeType === 1
  }
  function isNodeCollection (element) {
    return typeof NodeList !== 'undefined' && element instanceof NodeList ||
      typeof HTMLCollection !== 'undefined' && element instanceof HTMLCollection
  }
  function isString$1 (value) {
    return typeof value === 'string'
  }
  function isNumber (value) {
    return typeof value === 'number'
  }
  function isNumeric (value) {
    return isNumber(value) || isString$1(value) && !isNaN(value - parseFloat(value))
  }
  function isUndefined (value) {
    return value === void 0
  }
  function toFloat (value) {
    return parseFloat(value) || 0
  }
  function toNode (element) {
    return isNode(element) || isWindow(element) || isDocument(element)
      ? element
      : isNodeCollection(element) || isJQuery(element)
        ? element[0]
        : isArray(element)
          ? toNode(element[0])
          : null
  }
  var arrayProto = Array.prototype;
  function toNodes (element) {
    return isNode(element)
      ? [element]
      : isNodeCollection(element)
        ? arrayProto.slice.call(element)
        : isArray(element)
          ? element.map(toNode).filter(Boolean)
          : isJQuery(element)
            ? element.toArray()
            : []
  }
  function noop () {}
  function intersectRect (r1, r2) {
    return r1.left <= r2.right &&
          r2.left <= r1.right &&
          r1.top <= r2.bottom &&
          r2.top <= r1.bottom
  }

  var breadcrumb_Item = {
    functional: true,
    props: {
      href: String,
      target: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    render: function (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var disabled = props.disabled;
      var href = props.href;
      var target = props.target;
      return h('li', mergeData(data, {
        class: {
          'uk-disabled': disabled
        }
      }), [
        (isUndefined(href) || disabled)
          ? h('span', children)
          : h('a', { attrs: { href: href, target: target } }, children)
      ])
    }
  };

  var ElButton = {
    functional: true,
    props: {
      active: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        validator: function (val) { return !val || /^(small|large)$/.test(val); }
      },
      type: {
        type: String,
        default: 'default',
        validator: function (val) { return !val || /^(default|primary|secondary|danger|text|link)$/.test(val); }
      },
      htmlType: {
        type: String,
        default: 'button'
      }
    },
    render: function render (h, ref) {
      var obj;
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var htmlType = props.htmlType;
      var active = props.active;
      var type = props.type;
      var size = props.size;
      return h('button', mergeData(data, {
        attrs: { type: htmlType },
        class: ['uk-button', ("uk-button-" + type), ( obj = {
          'uk-active': active
        }, obj[("uk-button-" + size)] = size, obj )]
      }), children)
    }
  };

  function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
  var ref$1 = ElButton.props;
  var htmlType = ref$1.htmlType;
  var rest = objectWithoutProperties( ref$1, ["htmlType"] );
  var props = rest;
  var buttonLink = {
    functional: true,
    props: props,
    render: function render (h, ref) {
      var obj;
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var active = props.active;
      var type = props.type;
      var size = props.size;
      return h('a', mergeData(data, {
        class: ['uk-button', ("uk-button-" + type), ( obj = {
          'uk-active': active
        }, obj[("uk-button-" + size)] = size, obj )]
      }), children)
    }
  };

  var buttonGroup = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-button-group'
      }), children)
    }
  };

  var card = {
    functional: true,
    props: {
      type: {
        type: String,
        default: 'default',
        validator: function (val) { return /^(default|primary|secondary|blank)$/.test(val); }
      },
      padding: {
        type: String,
        validator: function (val) { return !val || /^(small|large)$/.test(val); }
      },
      hover: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var obj;
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var type = props.type;
      var padding = props.padding;
      var hover = props.hover;
      return h('div', mergeData(data, {
        class: ['uk-card', ( obj = {
          'uk-card-hover': hover
        }, obj[("uk-card-" + type)] = type, obj[("uk-card-" + padding)] = padding, obj )]
      }), children)
    }
  };

  var card_Title = {
    functional: true,
    props: {
      tag: {
        type: String,
        default: 'h3'
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      return h(props.tag, mergeData(data, {
        class: 'uk-card-title'
      }), children)
    }
  };

  var card_Badge = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-card-badge'
      }), children)
    }
  };

  var card_Header = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-card-header'
      }), children)
    }
  };

  var card_Body = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-card-body'
      }), children)
    }
  };

  var card_Footer = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-card-footer'
      }), children)
    }
  };

  var card_Media = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-card-media'
      }), children)
    }
  };

  var card_MediaTop = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-card-media-top'
      }), children)
    }
  };

  var card_MediaBottom = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-card-media-bottom'
      }), children)
    }
  };



  var elements = /*#__PURE__*/Object.freeze({
    ElCard: card,
    ElCardTitle: card_Title,
    ElCardBadge: card_Badge,
    ElCardHeader: card_Header,
    ElCardBody: card_Body,
    ElCardFooter: card_Footer,
    ElCardMedia: card_Media,
    ElCardMediaTop: card_MediaTop,
    ElCardMediaBottom: card_MediaBottom
  });

  var mixinProps = {
    methods: {
      pickComponentProps: function pickComponentProps (obj, comp) {
        var component = get(this, ("$options.components." + comp), {});
        var props = extractProps(component);
        return pick(obj, Object.keys(props))
      }
    }
  };

  var script = {
    mixins: [mixinProps],
    components: assign({}, elements),
    props: card.props
  };

  /* script */
              var __vue_script__ = script;
              
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ElCard",
      _vm._b({}, "ElCard", _vm.pickComponentProps(_vm.$props, "ElCard"), false),
      [
        _vm._t("top"),
        _vm._v(" "),
        _vm.$slots["media-top"]
          ? _c("ElCardMediaTop", [_vm._t("media-top")], 2)
          : _vm._e(),
        _vm._v(" "),
        _vm.$slots.badge ? _c("ElCardBadge", [_vm._t("badge")], 2) : _vm._e(),
        _vm._v(" "),
        _vm.$slots.header ? _c("ElCardHeader", [_vm._t("header")], 2) : _vm._e(),
        _vm._v(" "),
        _vm.$slots["media"] ? _c("ElCardMedia", [_vm._t("media")], 2) : _vm._e(),
        _vm._v(" "),
        _vm.$slots.default ? _c("ElCardBody", [_vm._t("default")], 2) : _vm._e(),
        _vm._v(" "),
        _vm.$slots.footer ? _c("ElCardFooter", [_vm._t("footer")], 2) : _vm._e(),
        _vm._v(" "),
        _vm.$slots["media-bottom"]
          ? _c("ElCardMediaBottom", [_vm._t("media-bottom")], 2)
          : _vm._e(),
        _vm._v(" "),
        _vm._t("bottom")
      ],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* component normalizer */
    function __vue_normalize__(
      template, style, script$$1,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

      {
        component.__file = "/Users/miljan/repos/@vuikit/vuikit-next/packages/vuikit/src/card/components/card.vue";
      }

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    function __vue_create_injector__() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var card$1 = __vue_normalize__(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      __vue_create_injector__,
      undefined
    );

  var VkRoot = {
    inserted: function inserted (el, binding, vnode) {
      vnode.context.$nextTick(function () {
        vnode.context.$root.$el.appendChild(el);
      });
    }
  };

  function attr (element, name, value) {
    if (isObject$1(name)) {
      for (var key in name) {
        attr(element, key, name[key]);
      }
      return
    }
    if (isUndefined(value)) {
      element = toNode(element);
      return element && element.getAttribute(name)
    } else {
      toNodes(element).forEach(function (element) {
        if (isFunction(value)) {
          value = value.call(element, attr(element, name));
        }
        if (value === null) {
          removeAttr(element, name);
        } else {
          element.setAttribute(name, value);
        }
      });
    }
  }
  function hasAttr (element, name) {
    return toNodes(element).some(function (element) { return element.hasAttribute(name); })
  }
  function removeAttr (element, name) {
    element = toNodes(element);
    name.split(' ').forEach(function (name) { return element.forEach(function (element) { return element.removeAttribute(name); }
      ); }
    );
  }
  function filterAttr (element, attribute, pattern, replacement) {
    attr(element, attribute, function (value) { return value ? value.replace(pattern, replacement) : value; });
  }
  function data (element, attribute) {
    for (var i = 0, attrs = [attribute, ("data-" + attribute)]; i < attrs.length; i++) {
      if (hasAttr(element, attrs[i])) {
        return attr(element, attrs[i])
      }
    }
  }

  function query (selector, context) {
    return toNode(selector) || find(selector, isContextSelector(selector) ? context : document)
  }
  function find (selector, context) {
    return toNode(_query(selector, context, 'querySelector'))
  }
  function findAll (selector, context) {
    return toNodes(_query(selector, context, 'querySelectorAll'))
  }
  function _query (selector, context, queryFn) {
    if ( context === void 0 ) context = document;
    if (!selector || !isString$1(selector)) {
      return null
    }
    selector = selector.replace(contextSanitizeRe, '$1 *');
    var removes;
    if (isContextSelector(selector)) {
      removes = [];
      selector = selector.split(',').map(function (selector, i) {
        var ctx = context;
        selector = selector.trim();
        if (selector[0] === '!') {
          var selectors = selector.substr(1).trim().split(' ');
          ctx = closest(context.parentNode, selectors[0]);
          selector = selectors.slice(1).join(' ');
        }
        if (!ctx) {
          return null
        }
        if (!ctx.id) {
          ctx.id = "uk-" + (Date.now()) + i;
          removes.push(function () { return removeAttr(ctx, 'id'); });
        }
        return ("#" + (escape(ctx.id)) + " " + selector)
      }).filter(Boolean).join(',');
      context = document;
    }
    try {
      return context[queryFn](selector)
    } catch (e) {
      return null
    } finally {
      removes && removes.forEach(function (remove) { return remove(); });
    }
  }
  var contextSelectorRe = /(^|,)\s*[!>+~]/;
  var contextSanitizeRe = /([!>+~])(?=\s+[!>+~]|\s*$)/g;
  function isContextSelector (selector) {
    return isString$1(selector) && selector.match(contextSelectorRe)
  }
  function matches (element, selector) {
    var elProto = window.Element.prototype;
    var matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector;
    return toNodes(element).some(function (element) { return matchesFn.call(element, selector); })
  }
  function closest (element, selector) {
    var elProto = window.Element.prototype;
    var closestFn = elProto.closest || function (selector) {
      var ancestor = this;
      do {
        if (matches(ancestor, selector)) {
          return ancestor
        }
        ancestor = ancestor.parentNode;
      } while (ancestor && ancestor.nodeType === 1)
    };
    if (startsWith(selector, '>')) {
      selector = selector.slice(1);
    }
    return isNode(element)
      ? element.parentNode && closestFn.call(element, selector)
      : toNodes(element).map(function (element) { return element.parentNode && closestFn.call(element, selector); }).filter(Boolean)
  }
  function escape (css) {
    var escapeFn = window.CSS && CSS.escape || function (css) { return css.replace(/([^\x7f-\uFFFF\w-])/g, function (match) { return ("\\" + match); }) };
    return isString$1(css) ? escapeFn.call(null, css) : ''
  }

  function isVisible (element) {
    return toNodes(element).some(function (element) { return element.offsetHeight || element.getBoundingClientRect().height; })
  }
  function filter (element, selector) {
    return toNodes(element).filter(function (element) { return matches(element, selector); })
  }
  function within (element, selector) {
    return !isString$1(selector)
      ? element === selector || (isDocument(selector)
        ? selector.documentElement
        : toNode(selector)).contains(toNode(element))
      : matches(element, selector) || closest(element, selector)
  }

  function on () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var ref = getArgs(args);
    var target = ref[0];
    var type = ref[1];
    var selector = ref[2];
    var listener = ref[3];
    var useCapture = ref[4];
    target = toEventTarget(target);
    if (selector) {
      listener = delegate(target, selector, listener);
    }
    if (listener.length > 1) {
      listener = detail(listener);
    }
    type.split(' ').forEach(function (type) { return target && target.addEventListener(type, listener, useCapture); });
    return function () { return off(target, type, listener, useCapture); }
  }
  function off (target, type, listener, useCapture) {
    if ( useCapture === void 0 ) useCapture = false;
    target = toEventTarget(target);
    target && type.split(' ').forEach(function (type) { return target.removeEventListener(type, listener, useCapture); });
  }
  function once () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var ref = getArgs(args);
    var element = ref[0];
    var type = ref[1];
    var selector = ref[2];
    var listener = ref[3];
    var useCapture = ref[4];
    var condition = ref[5];
    var off = on(element, type, selector, function (e) {
      var result = !condition || condition(e);
      if (result) {
        off();
        listener(e, result);
      }
    }, useCapture);
    return off
  }
  function trigger (target, event, detail) {
    return toEventTargets(target).reduce(function (notCanceled, target) { return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail)); }
      , true)
  }
  function createEvent (e, bubbles, cancelable, detail) {
    if ( bubbles === void 0 ) bubbles = true;
    if ( cancelable === void 0 ) cancelable = false;
    if (isString$1(e)) {
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent(e, bubbles, cancelable, detail);
      e = event;
    }
    return e
  }
  function getArgs (args) {
    if (isString$1(args[0])) {
      args[0] = find(args[0]);
    }
    if (isFunction(args[2])) {
      args.splice(2, 0, false);
    }
    return args
  }
  function delegate (element, selector, listener) {
    var this$1 = this;
    return function (e) {
      var target = e.target;
      var current = selector[0] === '>'
        ? findAll(selector, element).reverse().filter(function (element) { return within(target, element); })[0]
        : closest(target, selector);
      if (current) {
        e.delegate = element;
        e.current = current;
        listener.call(this$1, e);
      }
    }
  }
  function detail (listener) {
    return function (e) { return isArray(e.detail) ? listener.apply(listener, [e].concat(e.detail)) : listener(e); }
  }
  function isEventTarget (target) {
    return typeof window !== 'undefined' && 'EventTarget' in window
      ? target instanceof window.EventTarget
      : target && 'addEventListener' in target
  }
  function toEventTarget (target) {
    return isEventTarget(target) ? target : toNode(target)
  }
  function toEventTargets (target) {
    return isEventTarget(target)
      ? [target]
      : isArray(target)
        ? target.map(toEventTarget).filter(Boolean)
        : toNodes(target)
  }

  var doc = typeof document !== 'undefined' && document;
  function isReady () {
    return doc && (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll)
  }
  function ready (fn) {
    if (!doc) {
      return
    }
    if (isReady()) {
      fn();
      return
    }
    var handle = function () {
      unbind1();
      unbind2();
      fn();
    };
    var unbind1 = on(document, 'DOMContentLoaded', handle);
    var unbind2 = on(window, 'load', handle);
  }
  function append (parent, element) {
    parent = toNode(parent);
    return insertNodes(element, function (element) { return parent.appendChild(element); })
  }
  function before (ref, element) {
    ref = toNode(ref);
    return insertNodes(element, function (element) { return ref.parentNode.insertBefore(element, ref); })
  }
  function after (ref, element) {
    ref = toNode(ref);
    return insertNodes(element, function (element) { return ref.nextSibling
      ? before(ref.nextSibling, element)
      : append(ref.parentNode, element); }
    )
  }
  function insertNodes (element, fn) {
    element = isString$1(element) ? fragment(element) : element;
    return element
      ? 'length' in element
        ? toNodes(element).map(fn)
        : fn(element)
      : null
  }
  function remove (element) {
    toNodes(element).map(function (element) { return element.parentNode && element.parentNode.removeChild(element); });
  }
  var fragmentRE = /^\s*<(\w+|!)[^>]*>/;
  var singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
  function fragment (html) {
    var matches = singleTagRE.exec(html);
    if (matches) {
      return document.createElement(matches[1])
    }
    var container = document.createElement('div');
    if (fragmentRE.test(html)) {
      container.insertAdjacentHTML('beforeend', html.trim());
    } else {
      container.textContent = html;
    }
    return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild
  }

  function addClass (element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    apply$2(element, args, 'add');
  }
  function removeClass (element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    apply$2(element, args, 'remove');
  }
  function removeClasses (element, cls) {
    filterAttr(element, 'class', new RegExp(("(^|\\s)" + cls + "(?!\\S)"), 'g'), '');
  }
  function replaceClass (element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    args[0] && removeClass(element, args[0]);
    args[1] && addClass(element, args[1]);
  }
  function hasClass (element, cls) {
    return toNodes(element).some(function (element) { return element.classList.contains(cls); })
  }
  function toggleClass (element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    if (!args.length) {
      return
    }
    args = getArgs$1(args);
    var force = !isString$1(args[args.length - 1]) ? args.pop() : [];
    args = args.filter(Boolean);
    toNodes(element).forEach(function (ref) {
      var classList = ref.classList;
      for (var i = 0; i < args.length; i++) {
        supports.Force
          ? classList.toggle.apply(classList, [args[i]].concat(force))
          : (classList[(!isUndefined(force) ? force : !classList.contains(args[i])) ? 'add' : 'remove'](args[i]));
      }
    });
  }
  function apply$2 (element, args, fn) {
    args = getArgs$1(args).filter(Boolean);
    args.length && toNodes(element).forEach(function (ref) {
      var classList = ref.classList;
      supports.Multiple
        ? classList[fn].apply(classList, args)
        : args.forEach(function (cls) { return classList[fn](cls); });
    });
  }
  function getArgs$1 (args) {
    return args.reduce(function (args, arg) { return args.concat.call(args, isString$1(arg) && includes(arg, ' ') ? arg.trim().split(' ') : arg); }
      , [])
  }
  var supports = {};
  (function () {
    if (typeof document !== 'undefined' && document.createElement('_').classList) {
      var list = document.createElement('_').classList;
      list.add('a', 'b');
      list.toggle('c', false);
      supports.Multiple = list.contains('b');
      supports.Force = !list.contains('c');
      list = null;
    }
  })();

  var cssNumber = {
    'animation-iteration-count': true,
    'column-count': true,
    'fill-opacity': true,
    'flex-grow': true,
    'flex-shrink': true,
    'font-weight': true,
    'line-height': true,
    'opacity': true,
    'order': true,
    'orphans': true,
    'widows': true,
    'z-index': true,
    'zoom': true
  };
  function css (element, property, value) {
    return toNodes(element).map(function (element) {
      if (isString$1(property)) {
        property = propName(property);
        if (isUndefined(value)) {
          return getStyle(element, property)
        } else if (!value && value !== 0) {
          element.style.removeProperty(property);
        } else {
          element.style[property] = isNumeric(value) && !cssNumber[property] ? (value + "px") : value;
        }
      } else if (isArray(property)) {
        var styles = getStyles(element);
        return property.reduce(function (props, property) {
          props[property] = styles[propName(property)];
          return props
        }, {})
      } else if (isObject$1(property)) {
        each(property, function (value, property) { return css(element, property, value); });
      }
      return element
    })[0]
  }
  function getStyles (element, pseudoElt) {
    element = toNode(element);
    return element.ownerDocument.defaultView.getComputedStyle(element, pseudoElt)
  }
  function getStyle (element, property, pseudoElt) {
    return getStyles(element, pseudoElt)[property]
  }
  var vars = {};
  function getCssVar (name) {
    if (!(name in vars)) {
      var element = append(document.documentElement, document.createElement('div'));
      addClass(element, ("var-" + name));
      try {
        vars[name] = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');
        vars[name] = JSON.parse(vars[name]);
      } catch (e) {}
      document.documentElement.removeChild(element);
    }
    return vars[name]
  }
  var cssProps = {};
  function propName (name) {
    var ret = cssProps[name];
    if (!ret) {
      ret = cssProps[name] = vendorPropName(name) || name;
    }
    return ret
  }
  var cssPrefixes = ['webkit', 'moz', 'ms'];
  function vendorPropName (name) {
    var ref = document.createElement('_');
    var style = ref.style;
    name = hyphenate(name);
    if (name in style) {
      return name
    }
    var i = cssPrefixes.length, prefixedName;
    while (i--) {
      prefixedName = "-" + (cssPrefixes[i]) + "-" + name;
      if (prefixedName in style) {
        return prefixedName
      }
    }
  }

  function noop$1 () {}
  var warn = noop$1;
  var tip = noop$1;
  {
    var hasConsole = typeof console !== 'undefined';
    var classifyRE = /(?:^|[-_])(\w)/g;
    var classify = function (str) { return str
      .replace(classifyRE, function (c) { return c.toUpperCase(); })
      .replace(/[-_]/g, ''); };
    warn = function (msg, vm) {
      if (hasConsole) {
        console.error("" + msg + (
          vm ? generateComponentTrace(vm) : ''
        ));
      }
    };
    tip = function (msg, vm) {
      if (hasConsole) {
        console.warn("" + msg + (
          vm ? generateComponentTrace(vm) : ''
        ));
      }
    };
    var formatComponentName = function (vm, includeFile) {
      if (vm.$root === vm) {
        return '<Root>'
      }
      var name = typeof vm === 'string'
        ? vm
        : typeof vm === 'function' && vm.options
          ? vm.options.name
          : vm._isVue
            ? vm.$options.name || vm.$options._componentTag
            : vm.name;
      var file = vm._isVue && vm.$options.__file;
      if (!name && file) {
        var match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
      }
      return (
        (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
        (file && includeFile !== false ? (" at " + file) : '')
      )
    };
    var repeat = function (str, n) {
      var res = '';
      while (n) {
        if (n % 2 === 1) { res += str; }
        if (n > 1) { str += str; }
        n >>= 1;
      }
      return res
    };
    var generateComponentTrace = function (vm) {
      if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
          if (tree.length > 0) {
            var last = tree[tree.length - 1];
            if (last.constructor === vm.constructor) {
              currentRecursiveSequence++;
              vm = vm.$parent;
              continue
            } else if (currentRecursiveSequence > 0) {
              tree[tree.length - 1] = [last, currentRecursiveSequence];
              currentRecursiveSequence = 0;
            }
          }
          tree.push(vm);
          vm = vm.$parent;
        }
        return '\n\nfound in\n\n' + tree
          .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
              ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
              : formatComponentName(vm))); })
          .join('\n')
      } else {
        return ("\n\n(found in " + (formatComponentName(vm)) + ")")
      }
    };
  }

  var dirs = {
    width: ['x', 'left', 'right'],
    height: ['y', 'top', 'bottom']
  };
  function positionAt (element, target, elAttach, targetAttach, elOffset, targetOffset, flip, boundary) {
    elAttach = getPos(elAttach);
    targetAttach = getPos(targetAttach);
    var flipped = {element: elAttach, target: targetAttach};
    if (!element || !target) {
      return flipped
    }
    var dim = getDimensions(element);
    var targetDim = getDimensions(target);
    var position = targetDim;
    moveTo(position, elAttach, dim, -1);
    moveTo(position, targetAttach, targetDim, 1);
    elOffset = getOffsets(elOffset, dim.width, dim.height);
    targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);
    elOffset['x'] += targetOffset['x'];
    elOffset['y'] += targetOffset['y'];
    position.left += elOffset['x'];
    position.top += elOffset['y'];
    boundary = getDimensions(boundary || window$1(element));
    if (flip) {
      each(dirs, function (ref, prop) {
        var dir = ref[0];
        var align = ref[1];
        var alignFlip = ref[2];
        if (!(flip === true || includes(flip, dir))) {
          return
        }
        var elemOffset = elAttach[dir] === align
          ? -dim[prop]
          : elAttach[dir] === alignFlip
            ? dim[prop]
            : 0;
        var targetOffset = targetAttach[dir] === align
          ? targetDim[prop]
          : targetAttach[dir] === alignFlip
            ? -targetDim[prop]
            : 0;
        if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {
          var centerOffset = dim[prop] / 2;
          var centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;
          elAttach[dir] === 'center' && (
            apply(centerOffset, centerTargetOffset) ||
                      apply(-centerOffset, -centerTargetOffset)
          ) || apply(elemOffset, targetOffset);
        }
        function apply (elemOffset, targetOffset) {
          var newVal = position[align] + elemOffset + targetOffset - elOffset[dir] * 2;
          if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
            position[align] = newVal;
            ['element', 'target'].forEach(function (el) {
              flipped[el][dir] = !elemOffset
                ? flipped[el][dir]
                : flipped[el][dir] === dirs[prop][1]
                  ? dirs[prop][2]
                  : dirs[prop][1];
            });
            return true
          }
        }
      });
    }
    offset(element, position);
    return flipped
  }
  function offset (element, coordinates) {
    element = toNode(element);
    if (coordinates) {
      var currentOffset = offset(element);
      var pos = css(element, 'position');
      ['left', 'top'].forEach(function (prop) {
        if (prop in coordinates) {
          var value = css(element, prop);
          element.style[prop] = ((coordinates[prop] - currentOffset[prop]) +
                  toFloat(pos === 'absolute' && value === 'auto' ? position(element)[prop] : value)) + "px";
        }
      });
      return
    }
    return getDimensions(element)
  }
  function getDimensions (element) {
    element = toNode(element);
    var ref = window$1(element);
    var top = ref.pageYOffset;
    var left = ref.pageXOffset;
    if (isWindow(element)) {
      var height = element.innerHeight;
      var width = element.innerWidth;
      return {
        top: top,
        left: left,
        height: height,
        width: width,
        bottom: top + height,
        right: left + width
      }
    }
    var display = false;
    if (!isVisible(element)) {
      display = element.style.display;
      element.style.display = 'block';
    }
    var rect = element.getBoundingClientRect();
    if (display !== false) {
      element.style.display = display;
    }
    return {
      height: rect.height,
      width: rect.width,
      top: rect.top + top,
      left: rect.left + left,
      bottom: rect.bottom + top,
      right: rect.right + left
    }
  }
  function position (element) {
    element = toNode(element);
    var parent = offsetParent(element);
    var parentOffset = parent === docEl(element) ? {top: 0, left: 0} : offset(parent);
    var ref = ['top', 'left'].reduce(function (props, prop) {
      var propName$$1 = ucfirst(prop);
      props[prop] -= parentOffset[prop] +
              (toFloat(css(element, ("margin" + propName$$1))) || 0) +
              (toFloat(css(parent, ("border" + propName$$1 + "Width"))) || 0);
      return props
    }, offset(element));
    var top = ref.top;
    var left = ref.left;
    return {top: top, left: left}
  }
  function offsetParent (element) {
    var parent = toNode(element).offsetParent;
    while (parent && css(parent, 'position') === 'static') {
      parent = parent.offsetParent;
    }
    return parent || docEl(element)
  }
  var height = dimension('height');
  var width = dimension('width');
  function dimension (prop) {
    var propName$$1 = ucfirst(prop);
    return function (element, value) {
      element = toNode(element);
      if (isUndefined(value)) {
        if (isWindow(element)) {
          return element[("inner" + propName$$1)]
        }
        if (isDocument(element)) {
          var doc = element.documentElement;
          return Math.max(doc[("offset" + propName$$1)], doc[("scroll" + propName$$1)])
        }
        value = css(element, prop);
        value = value === 'auto' ? element[("offset" + propName$$1)] : toFloat(value) || 0;
        return getContentSize(prop, element, value)
      } else {
        css(element, prop, !value && value !== 0
          ? ''
          : getContentSize(prop, element, value) + 'px'
        );
      }
    }
  }
  function getContentSize (prop, element, value) {
    return css(element, 'boxSizing') === 'border-box' ? dirs[prop].slice(1).map(ucfirst).reduce(function (value, prop) { return value -
          toFloat(css(element, ("padding" + prop))) -
          toFloat(css(element, ("border" + prop + "Width"))); }
      , value) : value
  }
  function moveTo (position, attach, dim, factor) {
    each(dirs, function (ref, prop) {
      var dir = ref[0];
      var align = ref[1];
      var alignFlip = ref[2];
      if (attach[dir] === alignFlip) {
        position[align] += dim[prop] * factor;
      } else if (attach[dir] === 'center') {
        position[align] += dim[prop] * factor / 2;
      }
    });
  }
  function getPos (pos) {
    var x = /left|center|right/;
    var y = /top|center|bottom/;
    pos = (pos || '').split(' ');
    if (pos.length === 1) {
      pos = x.test(pos[0])
        ? pos.concat(['center'])
        : y.test(pos[0])
          ? ['center'].concat(pos)
          : ['center', 'center'];
    }
    return {
      x: x.test(pos[0]) ? pos[0] : 'center',
      y: y.test(pos[1]) ? pos[1] : 'center'
    }
  }
  function getOffsets (offsets, width, height) {
    var ref = (offsets || '').split(' ');
    var x = ref[0];
    var y = ref[1];
    return {
      x: x ? toFloat(x) * (endsWith(x, '%') ? width / 100 : 1) : 0,
      y: y ? toFloat(y) * (endsWith(y, '%') ? height / 100 : 1) : 0
    }
  }
  function flipPosition (pos) {
    switch (pos) {
      case 'left':
        return 'right'
      case 'right':
        return 'left'
      case 'top':
        return 'bottom'
      case 'bottom':
        return 'top'
      default:
        return pos
    }
  }
  function isInView (element, top, left) {
    if ( top === void 0 ) top = 0;
    if ( left === void 0 ) left = 0;
    element = toNode(element);
    var win = window$1(element);
    return intersectRect(element.getBoundingClientRect(), {
      top: top,
      left: left,
      bottom: top + height(win),
      right: left + width(win)
    })
  }
  function window$1 (element) {
    return isWindow(element) ? element : document$1(element).defaultView
  }
  function document$1 (element) {
    return toNode(element).ownerDocument
  }
  function docEl (element) {
    return document$1(element).documentElement
  }

  var BEFORE_POSITION = 'v-vk-position:before';
  var AFTER_POSITION = 'v-vk-position:after';

  var Directive = {
    inserted: function inserted (el, binding, vnode) {
      var ctx = getContext(el, binding, vnode);
      if (ctx) {
        position$1(ctx);
      }
    },
    componentUpdated: function componentUpdated (el, binding, vnode) {
      var ctx = getContext(el, binding, vnode);
      if (ctx) {
        position$1(ctx);
      }
    }
  };
  function position$1 (ctx) {
    var el = ctx.el;
    var props = ctx.props;
    var vnode = ctx.vnode;
    var target = props.target;
    var position$$1 = props.position;
    var offset$$1 = props.offset;
    var boundary = props.boundary;
    var flip = props.flip;
    var mainClass = props.mainClass;
    if (!position$$1.match(/^((top|bottom)-(left|center|right))|((left|right)-(top|center|bottom))$/)) {
      warn(("[Vuikit v-position]: Invalid position: '" + position$$1 + "'."), vnode);
    }
    if (!target || !target.tagName) {
      warn("[Vuikit v-position]: Invalid target.", vnode);
    }
    var ref = position$$1.split('-');
    var dir = ref[0];
    var align = ref[1];
    trigger(el, BEFORE_POSITION);
    var classesRx = new RegExp((mainClass + "-(top|bottom|left|right)(-[a-z]+)?"));
    el.className = el.className.replace(classesRx, '');
    css(el, { top: '', left: '' });
    var axis = getPositionAxis(position$$1);
    var elAttach = axis === 'x'
      ? ((flipPosition(dir)) + " " + align)
      : (align + " " + (flipPosition(dir)));
    var targetAttach = axis === 'x'
      ? (dir + " " + align)
      : (align + " " + dir);
    var elOffset = axis === 'x'
      ? ("" + (dir === 'left' ? -1 * offset$$1 : offset$$1))
      : (" " + (dir === 'top' ? -1 * offset$$1 : offset$$1));
    var targetOffset = null;
    var ref$1 = positionAt(
      el,
      target,
      elAttach,
      targetAttach,
      elOffset,
      targetOffset,
      flip,
      boundary
    ).target;
    var x = ref$1.x;
    var y = ref$1.y;
    dir = axis === 'x' ? x : y;
    align = axis === 'x' ? y : x;
    toggleClass(el, (mainClass + "-" + dir + "-" + align), offset$$1 === false);
    trigger(el, AFTER_POSITION);
  }
  function getOptions (ctx) {
    var vnode = ctx.vnode;
    var ref = ctx.binding;
    var value = ref.value;
    if (isUndefined(value) || !isObject$1(value)) {
      warn('[Vuikit v-position]: Configuration is missing or is not an Object.', vnode.context);
    }
    var options = assign({
      target: null,
      position: 'top-center',
      boundary: window,
      flip: true,
      offset: false,
      mainClass: ''
    }, value);
    return options
  }
  function getContext (el, binding, vnode) {
    var ctx = { el: el, binding: binding, vnode: vnode };
    ctx.props = getOptions(ctx);
    if (!ctx.props) {
      binding.def.unbind(el, binding);
      return
    }
    return ctx
  }
  function getPositionAxis (position$$1) {
    var ref = position$$1.split('-');
    var dir = ref[0];
    return dir === 'top' || dir === 'bottom'
      ? 'y'
      : 'x'
  }

  var EventsMixin = {
    methods: {
      on: function on$1 () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        this._vk_events_off.push(on.apply(void 0, args));
      },
      off: function off$1 () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        off.apply(void 0, args);
      }
    },
    created: function created () {
      this._vk_events_off = [];
    },
    beforeDestroy: function beforeDestroy () {
      this._vk_events_off.forEach(function (off$$1) { return off$$1(); });
    }
  };

  function $ (selector, context) {
    return !isString$1(selector)
      ? toNode(selector)
      : isHtml(selector)
        ? toNode(fragment(selector))
        : find(selector, context)
  }
  function $$ (selector, context) {
    return !isString$1(selector)
      ? toNodes(selector)
      : isHtml(selector)
        ? toNodes(fragment(selector))
        : findAll(selector, context)
  }
  function isHtml (str) {
    return str[0] === '<' || str.match(/^\s*</)
  }

  var doc$1 = typeof document !== 'undefined' && document;
  var docEl$1 = typeof document !== 'undefined' && document.documentElement;
  var body = typeof document !== 'undefined' && document.body;
  var win$1 = typeof window !== 'undefined' && window;
  var nav = typeof navigator !== 'undefined' && navigator;
  var isRtl = doc$1 && attr(document.documentElement, 'dir') === 'rtl';
  var hasTouchEvents = win$1 && 'ontouchstart' in window;
  var hasPointerEvents = win$1 && window.PointerEvent;
  var hasTouch = hasTouchEvents ||
    (win$1 && window.DocumentTouch) && (doc$1 && document instanceof window.DocumentTouch) ||
    nav && navigator.maxTouchPoints;
  var pointerDown = !hasTouch ? 'mousedown' : ("mousedown " + (hasTouchEvents ? 'touchstart' : 'pointerdown'));
  var pointerMove = !hasTouch ? 'mousemove' : ("mousemove " + (hasTouchEvents ? 'touchmove' : 'pointermove'));
  var pointerUp = !hasTouch ? 'mouseup' : ("mouseup " + (hasTouchEvents ? 'touchend' : 'pointerup'));
  var pointerEnter = hasTouch && hasPointerEvents ? 'pointerenter' : 'mouseenter';
  var pointerLeave = hasTouch && hasPointerEvents ? 'pointerleave' : 'mouseleave';

  var touch = {}, clickTimeout, swipeTimeout, tapTimeout, clicked;
  function swipeDirection (ref) {
    var x1 = ref.x1;
    var x2 = ref.x2;
    var y1 = ref.y1;
    var y2 = ref.y2;
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }
  function cancelAll () {
    clickTimeout && clearTimeout(clickTimeout);
    swipeTimeout && clearTimeout(swipeTimeout);
    tapTimeout && clearTimeout(tapTimeout);
    clickTimeout = swipeTimeout = tapTimeout = null;
    touch = {};
  }
  ready(function () {
    on(document, 'click', function () { return clicked = true; }, true);
    on(document, pointerDown, function (e) {
      var target = e.target;
      var ref = getPos$1(e);
      var x = ref.x;
      var y = ref.y;
      var now = Date.now();
      var type = getType(e.type);
      if (touch.type && touch.type !== type) {
        return
      }
      touch.el = 'tagName' in target ? target : target.parentNode;
      clickTimeout && clearTimeout(clickTimeout);
      touch.x1 = x;
      touch.y1 = y;
      if (touch.last && now - touch.last <= 250) {
        touch = {};
      }
      touch.type = type;
      touch.last = now;
      clicked = e.button > 0;
    });
    on(document, pointerMove, function (e) {
      if (e.defaultPrevented) {
        return
      }
      var ref = getPos$1(e);
      var x = ref.x;
      var y = ref.y;
      touch.x2 = x;
      touch.y2 = y;
    });
    on(document, pointerUp, function (ref) {
      var type = ref.type;
      var target = ref.target;
      if (touch.type !== getType(type)) {
        return
      }
      if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) {
        swipeTimeout = setTimeout(function () {
          if (touch.el) {
            trigger(touch.el, 'swipe');
            trigger(touch.el, ("swipe" + (swipeDirection(touch))));
          }
          touch = {};
        });
      } else if ('last' in touch) {
        tapTimeout = setTimeout(function () { return trigger(touch.el, 'tap'); });
        if (touch.el && type !== 'mouseup' && within(target, touch.el)) {
          clickTimeout = setTimeout(function () {
            clickTimeout = null;
            if (touch.el && !clicked) {
              trigger(touch.el, 'click');
            }
            touch = {};
          }, 350);
        }
      } else {
        touch = {};
      }
    });
    on(document, 'touchcancel', cancelAll);
    on(window, 'scroll', cancelAll);
  });
  var touching = false;
  if (typeof document !== 'undefined') {
    on(document, 'touchstart', function () { return touching = true; }, true);
    on(document, 'click', function () { touching = false; });
    on(document, 'touchcancel', function () { return touching = false; }, true);
  }
  function isTouch (e) {
    return touching || e.pointerType === 'touch'
  }
  function getPos$1 (e) {
    var touches = e.touches;
    var changedTouches = e.changedTouches;
    var ref = touches && touches[0] || changedTouches && changedTouches[0] || e;
    var x = ref.pageX;
    var y = ref.pageY;
    return {x: x, y: y}
  }
  function getType (type) {
    return type.slice(0, 5)
  }

  function MouseTracker () {}
  MouseTracker.prototype = {
    positions: [],
    position: null,
    init: function init () {
      var this$1 = this;
      this.positions = [];
      this.position = null;
      var ticking = false;
      this.unbind = on(document, 'mousemove', function (e) {
        if (ticking) {
          return
        }
        setTimeout(function () {
          var time = Date.now();
          var ref = this$1.positions;
          var length = ref.length;
          if (length && (time - this$1.positions[length - 1].time > 100)) {
            this$1.positions.splice(0, length);
          }
          this$1.positions.push({time: time, x: e.pageX, y: e.pageY});
          if (this$1.positions.length > 5) {
            this$1.positions.shift();
          }
          ticking = false;
        }, 5);
        ticking = true;
      });
    },
    cancel: function cancel () {
      if (this.unbind) {
        this.unbind();
      }
    },
    movesTo: function movesTo (target) {
      if (this.positions.length < 2) {
        return false
      }
      var p = offset(target);
      var position$$1 = this.positions[this.positions.length - 1];
      var ref = this.positions;
      var prevPos = ref[0];
      if (p.left <= position$$1.x && position$$1.x <= p.right && p.top <= position$$1.y && position$$1.y <= p.bottom) {
        return false
      }
      var points = [
        [{x: p.left, y: p.top}, {x: p.right, y: p.bottom}],
        [{x: p.right, y: p.top}, {x: p.left, y: p.bottom}]
      ];
      if (p.right <= position$$1.x) ; else if (p.left >= position$$1.x) {
        points[0].reverse();
        points[1].reverse();
      } else if (p.bottom <= position$$1.y) {
        points[0].reverse();
      } else if (p.top >= position$$1.y) {
        points[1].reverse();
      }
      return !!points.reduce(function (result, point) {
        return result + (slope(prevPos, point[0]) < slope(position$$1, point[0]) && slope(prevPos, point[1]) > slope(position$$1, point[1]))
      }, 0)
    }
  };
  function slope (a, b) {
    return (b.y - a.y) / (b.x - a.x)
  }

  var ElDrop = {
    functional: true,
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var children = ref.children;
      var data = ref.data;
      var props = ref.props;
      var show = props.show;
      return h('div', mergeData(data, {
        class: ['uk-drop', {
          'uk-open': show
        }],
        style: {
          display: show ? 'block' : null
        }
      }), children)
    }
  };

  var active;
  var mixinTree = {
    methods: {
      setAsActive: function setAsActive () {
        if (active === this) {
          return
        }
        if (active && !active.isChildOf(this) && !active.isParentOf(this)) {
          hideActiveTree();
        }
        this.hideChildren();
        active = this;
      },
      setAsInactive: function setAsInactive () {
        if (active === this) {
          active = this.treeParent || null;
        }
      },
      isActive: function isActive () {
        return this === active
      },
      isChildOf: function isChildOf (instance) {
        return includes(instance.treeChildren, this)
      },
      isParentOf: function isParentOf (instance) {
        return includes(instance.treeParents, this)
      },
      hideChildren: function hideChildren () {
        this.treeChildren
          .filter(function (child) { return child.shown; })
          .forEach(function (child) { return child._hide(); });
      }
    },
    computed: {
      treeParent: function treeParent () {
        return this.treeParents.pop()
      },
      treeParents: function treeParents () {
        return findParents(this, { '$options.name': this.$options.name })
      },
      treeChildren: function treeChildren () {
        return findChildren(this, { '$options.name': this.$options.name })
      }
    },
    created: function created () {
      var this$1 = this;
      this.eventsOff = [
        on(docEl$1, 'click', function (ref) {
          var target = ref.target;
          var defaultPrevented = ref.defaultPrevented;
          if (defaultPrevented || !this$1.isActive()) {
            return
          }
          var targetedInstance = findTargetedInstance(target);
          if (targetedInstance) {
            targetedInstance.setAsActive();
            return
          }
          hideActiveTree();
        }),
        on(win$1, 'resize', function (ref) {
          var defaultPrevented = ref.defaultPrevented;
          if (defaultPrevented || !this$1.isActive()) {
            return
          }
          var isJustified = /justify/.test(this$1.position);
          if (isJustified) {
            this$1.$forceUpdate();
          }
        })
      ];
    },
    beforeDestroy: function beforeDestroy () {
      this.eventsOff.forEach(function (off$$1) { return off$$1(); });
    }
  };
  function hideActiveTree () {
    while (active) {
      var parent = active.treeParent;
      active._hide();
      active = parent;
    }
  }
  function findTargetedInstance (clickTarget) {
    var clickedInside = function (drop) { return within(clickTarget, drop.$el); };
    var clickedTarget = function (drop) { return within(clickTarget, drop.$refs.target); };
    var instance = active;
    while (instance && !clickedInside(instance) && !clickedTarget(instance)) {
      instance = instance.treeParent;
    }
    return instance
  }

  var win$2 = typeof window !== 'undefined' && window;
  var Promise = win$2 && 'Promise' in window ? window.Promise : PromiseFn;
  var RESOLVED = 0;
  var REJECTED = 1;
  var PENDING = 2;
  var async = win$2 && 'setImmediate' in window ? setImmediate : setTimeout;
  function PromiseFn (executor) {
    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];
    var promise = this;
    try {
      executor(
        function (x) {
          promise.resolve(x);
        },
        function (r) {
          promise.reject(r);
        }
      );
    } catch (e) {
      promise.reject(e);
    }
  }
  PromiseFn.reject = function (r) {
    return new PromiseFn(function (resolve, reject) {
      reject(r);
    })
  };
  PromiseFn.resolve = function (x) {
    return new PromiseFn(function (resolve, reject) {
      resolve(x);
    })
  };
  PromiseFn.all = function all (iterable) {
    return new PromiseFn(function (resolve, reject) {
      var result = [];
      var count = 0;
      if (iterable.length === 0) {
        resolve(result);
      }
      function resolver (i) {
        return function (x) {
          result[i] = x;
          count += 1;
          if (count === iterable.length) {
            resolve(result);
          }
        }
      }
      for (var i = 0; i < iterable.length; i += 1) {
        PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
      }
    })
  };
  PromiseFn.race = function race (iterable) {
    return new PromiseFn(function (resolve, reject) {
      for (var i = 0; i < iterable.length; i += 1) {
        PromiseFn.resolve(iterable[i]).then(resolve, reject);
      }
    })
  };
  var p = PromiseFn.prototype;
  p.resolve = function resolve (x) {
    var promise = this;
    if (promise.state === PENDING) {
      if (x === promise) {
        throw new TypeError('Promise settled with itself.')
      }
      var called = false;
      try {
        var then = x && x.then;
        if (x !== null && isObject$1(x) && isFunction(then)) {
          then.call(
            x,
            function (x) {
              if (!called) {
                promise.resolve(x);
              }
              called = true;
            },
            function (r) {
              if (!called) {
                promise.reject(r);
              }
              called = true;
            }
          );
          return
        }
      } catch (e) {
        if (!called) {
          promise.reject(e);
        }
        return
      }
      promise.state = RESOLVED;
      promise.value = x;
      promise.notify();
    }
  };
  p.reject = function reject (reason) {
    var promise = this;
    if (promise.state === PENDING) {
      if (reason === promise) {
        throw new TypeError('Promise settled with itself.')
      }
      promise.state = REJECTED;
      promise.value = reason;
      promise.notify();
    }
  };
  p.notify = function notify () {
    var this$1 = this;
    async(function () {
      if (this$1.state !== PENDING) {
        while (this$1.deferred.length) {
          var ref = this$1.deferred.shift();
          var onResolved = ref[0];
          var onRejected = ref[1];
          var resolve = ref[2];
          var reject = ref[3];
          try {
            if (this$1.state === RESOLVED) {
              if (isFunction(onResolved)) {
                resolve(onResolved.call(undefined, this$1.value));
              } else {
                resolve(this$1.value);
              }
            } else if (this$1.state === REJECTED) {
              if (isFunction(onRejected)) {
                resolve(onRejected.call(undefined, this$1.value));
              } else {
                reject(this$1.value);
              }
            }
          } catch (e) {
            reject(e);
          }
        }
      }
    });
  };
  p.then = function then (onResolved, onRejected) {
    var this$1 = this;
    return new PromiseFn(function (resolve, reject) {
      this$1.deferred.push([onResolved, onRejected, resolve, reject]);
      this$1.notify();
    })
  };
  p.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  };

  function transition (element, props, duration, timing) {
    if ( duration === void 0 ) duration = 400;
    if ( timing === void 0 ) timing = 'linear';
    return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {
        for (var name in props) {
          var value = css(element, name);
          if (value === '') {
            css(element, name, value);
          }
        }
        var timer = setTimeout(function () { return trigger(element, 'transitionend'); }, duration);
        once(element, 'transitionend transitioncanceled', function (ref) {
          var type = ref.type;
          clearTimeout(timer);
          removeClass(element, 'uk-transition');
          css(element, {
            'transition-property': '',
            'transition-duration': '',
            'transition-timing-function': ''
          });
          type === 'transitioncanceled' ? reject() : resolve();
        }, false, function (ref) {
          var target = ref.target;
          return element === target;
        });
        addClass(element, 'uk-transition');
        css(element, assign({
          'transition-property': Object.keys(props).map(propName).join(','),
          'transition-duration': (duration + "ms"),
          'transition-timing-function': timing
        }, props));
      }); }
    ))
  }
  var Transition = {
    start: transition,
    stop: function stop (element) {
      trigger(element, 'transitionend');
      return Promise.resolve()
    },
    cancel: function cancel (element) {
      trigger(element, 'transitioncanceled');
    },
    inProgress: function inProgress (element) {
      return hasClass(element, 'uk-transition')
    }
  };
  var animationPrefix = 'uk-animation-';
  var clsCancelAnimation = 'uk-cancel-animation';
  function animate (element, animation, duration, origin, out) {
    var arguments$1 = arguments;
    if ( duration === void 0 ) duration = 200;
    return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {
        if (hasClass(element, clsCancelAnimation)) {
          requestAnimationFrame(function () { return Promise.resolve().then(function () { return animate.apply(void 0, arguments$1).then(resolve, reject); }
            ); }
          );
          return
        }
        var cls = animation + " " + animationPrefix + (out ? 'leave' : 'enter');
        if (startsWith(animation, animationPrefix)) {
          if (origin) {
            cls += " uk-transform-origin-" + origin;
          }
          if (out) {
            cls += " " + animationPrefix + "reverse";
          }
        }
        reset();
        once(element, 'animationend animationcancel', function (ref) {
          var type = ref.type;
          var hasReset = false;
          if (type === 'animationcancel') {
            reject();
            reset();
          } else {
            resolve();
            Promise.resolve().then(function () {
              hasReset = true;
              reset();
            });
          }
          requestAnimationFrame(function () {
            if (!hasReset) {
              addClass(element, clsCancelAnimation);
              requestAnimationFrame(function () { return removeClass(element, clsCancelAnimation); });
            }
          });
        }, false, function (ref) {
          var target = ref.target;
          return element === target;
        });
        css(element, 'animationDuration', (duration + "ms"));
        addClass(element, cls);
        function reset () {
          css(element, 'animationDuration', '');
          removeClasses(element, (animationPrefix + "\\S*"));
        }
      }); }
    ))
  }
  var inProgress = new RegExp((animationPrefix + "(enter|leave)"));
  var Animation = {
    in: function in$1 (element, animation, duration, origin) {
      return animate(element, animation, duration, origin, false)
    },
    out: function out (element, animation, duration, origin) {
      return animate(element, animation, duration, origin, true)
    },
    inProgress: function inProgress$1 (element) {
      return inProgress.test(attr(element, 'class'))
    },
    cancel: function cancel (element) {
      trigger(element, 'animationcancel');
    }
  };

  var Transition$1 = {
    name: 'VkTransition',
    functional: true,
    props: {
      name: {
        type: [String, Array],
        required: true
      },
      duration: {
        type: Number
      },
      mode: {
        type: String,
        default: 'out-in'
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var name = props.name;
      var duration = props.duration;
      var ref$1 = isString$1(name) ? [name, name] : name;
      var animationIn = ref$1[0];
      var animationOut = ref$1[1];
      var def = {
        props: {
          css: false,
          mode: props.mode
        },
        on: {
          enter: function enter (el, done) {
            animationIn
              ? Animation.in(el, ("uk-animation-" + animationIn), duration).then(done)
              : done();
          },
          leave: function leave (el, done) {
            animationOut
              ? Animation.out(el, ("uk-animation-" + animationOut), duration).then(done)
              : done();
          }
        }
      };
      return h('transition', def, children)
    }
  };

  var SHOW = 'show';
  var HIDE = 'hide';

  var Drop = {
    name: 'VkDrop',
    mixins: [ EventsMixin, mixinTree ],
    directives: {
      VkRoot: VkRoot,
      VkPosition: Directive
    },
    props: {
      target: {},
      boundary: {},
      boundaryAlign: {
        type: Boolean,
        default: false
      },
      flip: {
        type: [String, Boolean],
        default: true
      },
      position: {
        type: String,
        default: ("bottom-" + (isRtl ? 'right' : 'left')),
        validator: function (pos) { return /^(top|bottom)-(left|right|center|justify)$/.test(pos) ||
          /^(left|right)-(top|bottom|center|justify)$/.test(pos); }
      },
      offset: {
        type: [Boolean, Number],
        default: false
      },
      animation: {
        type: String,
        default: 'fade'
      },
      duration: {
        type: Number,
        default: 200
      },
      mode: {
        type: String,
        default: 'click hover'
      },
      delayShow: {
        type: Number,
        default: 0
      },
      delayHide: {
        type: Number,
        default: 800
      },
      mainClass: {
        type: String,
        default: 'uk-drop'
      },
      mainElement: {
        type: Object,
        default: function () { return ElDrop; }
      }
    },
    data: function () { return ({
      shown: false
    }); },
    render: function render (h) {
      var this$1 = this;
      var obj, obj$1;
      var ref = this;
      var position$$1 = ref.position;
      var ref$1 = this.$refs;
      var boundary = ref$1.boundary;
      var target = ref$1.target;
      var ref$2 = position$$1.split('-');
      var align = ref$2[1];
      var ref$3 = this;
      var boundaryAlign = ref$3.boundaryAlign;
      var animation = ref$3.animation;
      var duration = ref$3.duration;
      var mainClass = ref$3.mainClass;
      var mainElement = ref$3.mainElement;
      var flip = ref$3.flip;
      var offset$$1 = ref$3.offset;
      if (!target || !boundary) { return }
      position$$1 = position$$1.replace('justify', 'center');
      target = boundaryAlign ? boundary : target;
      var def = {
        on: ( obj = {}, obj[BEFORE_POSITION] = function (e) {
            var ref = this$1;
            var $el = ref.$el;
            var alignTo = offset(target);
            var boundaryOffset = offset(boundary);
            css($el, { width: '', height: '' });
            removeClass($el, (mainClass + "-stack"));
            if (align === 'justify') {
              var prop = getAxis(position$$1) === 'y' ? 'width' : 'height';
              css($el, prop, alignTo[prop]);
            } else if ($el.offsetWidth > Math.max(boundaryOffset.right - alignTo.left, alignTo.right - boundaryOffset.left)) {
              addClass($el, (mainClass + "-stack"));
            }
          }, obj ),
        props: {
          show: this.shown
        },
        class: ( obj$1 = {}, obj$1[(mainClass + "-boundary")] = this.boundaryAlign, obj$1 ),
        directives: [
          {
            name: 'show',
            value: this.shown
          },
          {
            name: 'vk-position',
            value: {
              flip: flip,
              offset: offset$$1,
              target: target,
              boundary: boundary,
              position: position$$1,
              mainClass: mainClass
            }
          }
        ]
      };
      return h(Transition$1, {
        props: {
          name: [animation],
          duration: duration
        }
      }, [
        h(mainElement, def, this.$slots.default)
      ])
    },
    methods: {
      show: function show () {
        this.clearTimers();
        this.showTimer = setTimeout(this._show, this.delayShow);
      },
      _show: function _show () {
        this.shown = true;
        this.tracker.init();
        this.setAsActive();
        this.$emit(SHOW);
      },
      hide: function hide () {
        var hoverIdle = 200;
        this.clearTimers();
        this.isDelaying = this.tracker.movesTo(this.$el);
        if (this.isDelaying) {
          this.hideTimer = setTimeout(this.hide, hoverIdle);
        } else {
          this.hideTimer = setTimeout(this._hide, this.delayHide);
        }
      },
      _hide: function _hide () {
        this.shown = false;
        this.tracker.cancel();
        this.setAsInactive();
        this.$emit(HIDE);
      },
      clearTimers: function clearTimers () {
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
        this.showTimer = null;
        this.hideTimer = null;
      },
      toggle: function toggle () {
        this.shown ? this._hide() : this.show();
      },
      assignTriggerEvents: function assignTriggerEvents () {
        var ref = this;
        var on = ref.on;
        var show = ref.show;
        var hide = ref.hide;
        var toggle = ref.toggle;
        var mode = ref.mode;
        var clearTimers = ref.clearTimers;
        if (/click/.test(mode) || hasTouch) {
          on(this.$refs.target, 'click', toggle);
        }
        if (/hover/.test(mode)) {
          on(this.$refs.target, pointerEnter, function (e) {
            if (isTouch(e)) {
              return
            }
            e.preventDefault();
            show();
          });
          on(this.$refs.target, pointerLeave, function (e) {
            if (isTouch(e)) {
              return
            }
            e.preventDefault();
            hide();
          });
          on(this.$el, pointerLeave, hide);
          on(this.$el, pointerEnter, clearTimers);
        }
      },
      queryElement: function queryElement (el) {
        return isNode(el)
          ? el
          : isString$1(el)
            ? (get(this.$vnode.context.$refs, el) || $(el, this.$el))
            : el
      }
    },
    mounted: function mounted () {
      var this$1 = this;
      this.$refs.target = this.queryElement(this.target) || this.$el.previousElementSibling;
      this.$refs.boundary = this.queryElement(this.boundary) || window;
      this.$forceUpdate();
      this.$nextTick(function () {
        this$1.assignTriggerEvents();
      });
    },
    created: function created () {
      this.tracker = new MouseTracker();
    },
    beforeDestroy: function beforeDestroy () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
  function getAxis (position$$1) {
    var ref = position$$1.split('-');
    var dir = ref[0];
    return dir === 'top' || dir === 'bottom'
      ? 'y'
      : 'x'
  }

  var ElDropdown = {
    functional: true,
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var children = ref.children;
      var data = ref.data;
      var props = ref.props;
      var show = props.show;
      return h('div', mergeData(data, {
        class: ['uk-dropdown', {
          'uk-open': show
        }],
        style: {
          display: show ? 'block' : null
        }
      }), children)
    }
  };

  var ElDropdownNav = {
    functional: true,
    props: ElDropdown.props,
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h(ElDropdown, mergeData({}, data, { props: props }), [
        h('ul', {
          class: 'uk-nav uk-dropdown-nav'
        }, children)
      ])
    }
  };

  var Dropdown = {
    functional: true,
    name: 'VkDropdown',
    props: Drop.props,
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      return h(Drop, mergeData({}, data, {
        props: assign({}, props, {
          mainClass: 'uk-dropdown',
          mainElement: ElDropdown
        })
      }), children)
    }
  };

  var DropdownNav = {
    functional: true,
    name: 'VkDropdownNav',
    props: Drop.props,
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var items = children.filter(function (node) { return node.tag === 'li'; });
      return h(Drop, mergeData({}, data, {
        props: assign({}, props, {
          mainClass: 'uk-dropdown',
          mainElement: ElDropdownNav
        })
      }), items)
    }
  };

  var field = {
    functional: true,
    props: {
      vkBlank: Boolean,
      vkState: {
        type: String,
        validator: function (val) { return !val || /^(success|danger)$/.test(val); }
      },
      vkSize: {
        type: String,
        validator: function (val) { return !val || /^(large|small)$/.test(val); }
      },
      vkWidth: {
        type: String,
        validator: function (val) { return !val || /^(large|medium|small|xsmall)$/.test(val); }
      }
    }
  };

  var ElInput = {
    functional: true,
    props: field.props,
    render: function render (h, ref) {
      var obj;
      var props = ref.props;
      var data = ref.data;
      var vkState = props.vkState;
      var vkSize = props.vkSize;
      var vkWidth = props.vkWidth;
      var vkBlank = props.vkBlank;
      return h('input', mergeData(data, {
        class: ['uk-input', ( obj = {
          'uk-form-blank': vkBlank
        }, obj[("uk-form-" + vkState)] = vkState, obj[("uk-form-" + vkSize)] = vkSize, obj[("uk-form-width-" + vkWidth)] = vkWidth, obj )]
      }))
    }
  };

  var ElRange = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      return h('input', mergeData(data, {
        class: 'uk-range',
        attrs: {
          type: 'range'
        }
      }))
    }
  };

  var ElRadio = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      return h('input', mergeData(data, {
        class: 'uk-radio',
        attrs: {
          type: 'radio'
        }
      }))
    }
  };

  var ElCheckbox = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      return h('input', mergeData(data, {
        class: 'uk-checkbox',
        attrs: {
          type: 'checkbox'
        }
      }))
    }
  };

  var ElTextarea = {
    functional: true,
    props: assign({}, field.props, {
      vkWidth: {
        type: String,
        validator: function (val) { return !val || /^(large|medium|small)$/.test(val); }
      }
    }),
    render: function render (h, ref) {
      var obj;
      var props = ref.props;
      var data = ref.data;
      var vkState = props.vkState;
      var vkSize = props.vkSize;
      var vkWidth = props.vkWidth;
      var vkBlank = props.vkBlank;
      return h('textarea', mergeData(data, {
        class: ['uk-textarea', ( obj = {
          'uk-form-blank': vkBlank
        }, obj[("uk-form-" + vkState)] = vkState, obj[("uk-form-" + vkSize)] = vkSize, obj[("uk-form-width-" + vkWidth)] = vkWidth, obj )]
      }))
    }
  };

  var ElSelect = {
    functional: true,
    props: field.props,
    render: function render (h, ref) {
      var obj;
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var vkState = props.vkState;
      var vkSize = props.vkSize;
      var vkWidth = props.vkWidth;
      var vkBlank = props.vkBlank;
      return h('select', mergeData(data, {
        class: ['uk-select', ( obj = {
          'uk-form-blank': vkBlank
        }, obj[("uk-form-" + vkState)] = vkState, obj[("uk-form-" + vkSize)] = vkSize, obj[("uk-form-width-" + vkWidth)] = vkWidth, obj )]
      }), children)
    }
  };

  var legend = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      return h('legend', mergeData(data, {
        class: 'uk-legend'
      }))
    }
  };

  var fieldset = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      return h('fieldset', mergeData(data, {
        class: 'uk-fieldset'
      }))
    }
  };

  var formStacked = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('form', mergeData(data, {
        class: 'uk-form-stacked'
      }), children)
    }
  };

  var formHorizontal = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('form', mergeData(data, {
        class: 'uk-form-horizontal'
      }), children)
    }
  };

  var core = {
    functional: true,
    props: {
      icon: {
        required: true
      },
      ratio: {
        type: [Number, String],
        default: 1
      }
    },
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var icon = props.icon;
      var ratio = props.ratio;
      var attrs = data.attrs || {};
      var Icon = isString$1(icon)
        ? h(("vk-icons-" + icon), { attrs: attrs })
        : h(assign({}, icon), { attrs: attrs });
      if (ratio !== 1) {
        Icon.data.attrs.width *= ratio;
        Icon.data.attrs.height *= ratio;
        Icon.data.attrs.ratio = ratio;
      }
      return Icon
    }
  };

  var ElIcon = {
    functional: true,
    render: function (h, ref) {
        var data = ref.data;
        var children = ref.children;
        return h('span', mergeData(data, {
        class: 'uk-icon'
      }), children);
  }
  };

  var ElIconLink = {
    functional: true,
    props: {
      reset: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      var reset = props.reset;
      return h('a', mergeData(data, {
        class: ['uk-icon', {
          'uk-icon-link': reset
        }]
      }), children)
    }
  };

  var ElIconButton = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('a', mergeData(data, {
        class: 'uk-icon uk-icon-button'
      }), children)
    }
  };

  var iconImage = {
    functional: true,
    props: {
      src: {
        type: String,
        required: true
      }
    },
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var src = props.src;
      return h('span', mergeData(data, {
        class: 'uk-icon uk-icon-image',
        style: {
          'background-image': ("url(" + src + ")")
        }
      }))
    }
  };

  var icon = {
    name: 'VkIcon',
    functional: true,
    props: assign({}, core.props),
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      return h(ElIcon, data, [
        h(core, { attrs: data.attrs, props: props })
      ])
    }
  };

  var iconLink = {
    name: 'VkIconLink',
    functional: true,
    props: assign({}, core.props, ElIconLink.props),
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      return h(ElIconLink, assign(data, { props: props }), [
        h(core, { attrs: data.attrs, props: props })
      ])
    }
  };

  var iconButton = {
    name: 'VkIconButton',
    functional: true,
    props: assign({}, core.props, ElIconButton.props),
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      return h(ElIconButton, data, [
        h(core, { attrs: data.attrs, props: props })
      ])
    }
  };

  var ElIcon$1 = ElIcon;
  var ElIconLink$1 = ElIconLink;
  var ElFormIcon = {
    functional: true,
    props: {
      flipped: Boolean,
      linkTag: Boolean
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var flipped = props.flipped;
      var linkTag = props.linkTag;
      return h(linkTag ? ElIconLink$1 : ElIcon$1, mergeData(data, {
        class: ['uk-form-icon', {
          'uk-form-icon-flip': flipped
        }]
      }), children)
    }
  };

  var ElFormIconLink = {
    functional: true,
    props: {
      flipped: Boolean
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var flipped = props.flipped;
      return h(ElFormIcon, mergeData(data, {
        props: {
          flipped: flipped,
          linkTag: true
        }
      }), children)
    }
  };

  var formLabel = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('label', mergeData(data, {
        class: 'uk-form-label'
      }), children)
    }
  };

  var formControls = {
    functional: true,
    props: {
      text: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var text = props.text;
      return h('div', mergeData(data, {
        class: ['uk-form-controls', {
          'uk-form-controls-text': text
        }]
      }), children)
    }
  };

  var input = assign({}, ElInput, {
    name: 'VkFormInput',
    props: ['value'],
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var def = mergeData({}, data, {
        props: props,
        domProps: {
          value: props.value
        }
      });
      if (get(def, 'on.input')) {
        var callback = def.on.input;
        def.on.input = function (e) {
          if (e.target.composing) { return }
          callback(e.target.value);
        };
      }
      return h(ElInput, def)
    }
  });

  var range = assign({}, ElRange, {
    name: 'VkFormRange',
    props: ['value'],
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var toNumber = ref._n;
      var def = mergeData({}, data, {
        domProps: {
          value: props.value
        }
      });
      if (get(def, 'on.input')) {
        var callback = def.on.input;
        var number = get(def, 'model.modifiers.number');
        delete def.on.input;
        delete def.model;
        def.on.__r = function (e) {
          callback(number
            ? toNumber(e.target.value)
            : e.target.value
          );
        };
      }
      return h(ElRange, def)
    }
  });

  var radio = assign({}, ElRadio, {
    name: 'VkFormRadio',
    props: {
      label: String
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var looseEqual = ref._q;
      var label = props.label;
      var attrs = data.attrs; if ( attrs === void 0 ) attrs = {};
      var def = mergeData({}, data, {
        domProps: {
          checked: attrs.checked
        }
      });
      if (get(def, 'on.input')) {
        var callback = def.on.input;
        def.on.input = function (e) {
          callback(e.target.value);
        };
        if (def.model) {
          def.domProps.checked = looseEqual(def.model.value, attrs.value);
        }
      }
      var radio = h(ElRadio, def);
      if (label) {
        return h('label', [
          radio,
          (" " + label)
        ])
      }
      return radio
    }
  });

  var checkbox = assign({}, ElCheckbox, {
    name: 'VkFormCheckbox',
    props: {
      label: String
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var looseEqual = ref._q;
      var looseIndexOf = ref._i;
      var label = props.label;
      var attrs = data.attrs; if ( attrs === void 0 ) attrs = {};
      var def = mergeData({}, data, {
        domProps: {
          checked: attrs.checked
        }
      });
      if (get(def, 'on.input')) {
        var callback = def.on.input;
        delete def.on.input;
        var trueValue = get(attrs, 'true-value', true);
        var falseValue = get(attrs, 'false-value', false);
        def.on.change = function (e) {
          callback();
        };
        if (def.model) {
          var toggle = def.model.value;
          def.domProps = {
            checked: Array.isArray(toggle)
              ? looseIndexOf(toggle, null) > -1
              : looseEqual(toggle, trueValue)
          };
          def.on.change = function ($event) {
            var $$a = toggle;
            var $$el = $event.target;
            var $$c = $$el.checked ? trueValue : falseValue;
            if (Array.isArray($$a)) {
              var $$v = null;
              var $$i = looseIndexOf($$a, $$v);
              if ($$el.checked) {
                $$i < 0 && (toggle = $$a.concat([ $$v ]));
              } else {
                $$i > -1 && (toggle = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
              }
            } else {
              toggle = $$c;
            }
            callback(toggle);
          };
        }
      }
      var checkbox = h(ElCheckbox, def);
      if (label) {
        return h('label', [
          checkbox,
          (" " + label)
        ])
      }
      return checkbox
    }
  });

  var textarea = assign({}, ElTextarea, {
    name: 'VkFormTextarea',
    props: ['value'],
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var def = mergeData({}, data, {
        props: props,
        domProps: {
          value: props.value
        }
      });
      if (get(def, 'on.input')) {
        var callback = def.on.input;
        def.on.input = function (e) {
          if (e.target.composing) { return }
          callback(e.target.value);
        };
      }
      return h(ElTextarea, def)
    }
  });

  var select = assign({}, ElSelect, {
    name: 'VkFormSelect',
    props: ['value'],
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var def = mergeData({}, data, {
        props: props,
        directives: [{
          name: 'model',
          rawName: 'v-model',
          value: props.value
        }]
      });
      if (get(def, 'on.input')) {
        var callback = def.on.input;
        delete def.on.input;
        def.on.change = function (e) {
          var selectedVal = Array.prototype.filter
            .call(e.target.options, function (opt) { return opt.selected; })
            .map(function (opt) { return '_value' in opt ? opt._value : opt.value; });
          var selected = e.target.multiple
            ? selectedVal
            : selectedVal[0];
          callback(selected);
        };
      }
      return h(ElSelect, def, children)
    }
  });

  var formIcon = {
    functional: true,
    name: 'VkFormIcon',
    props: assign({}, core.props, ElFormIcon.props),
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var attrs = ref.attrs;
      return h(ElFormIcon, mergeData(data, { props: props }), [
        h(core, { attrs: data.attrs, props: props })
      ])
    }
  };

  var formIconLink = {
    functional: true,
    name: 'VkFormIconLink',
    props: assign({}, core.props, ElFormIconLink.props),
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var attrs = ref.attrs;
      return h(ElFormIconLink, mergeData(data, { props: props }), [
        h(core, { attrs: data.attrs, props: props })
      ])
    }
  };

  var ElGrid = {
    functional: true,
    props: {
      tag: {
        type: String,
        default: 'div'
      },
      divided: {
        type: Boolean,
        default: false
      },
      matched: {
        type: Boolean,
        default: false
      },
      gutter: {
        type: String,
        validator: function (val) { return !val || /^(small|medium|large|collapse)$/.test(val); }
      }
    },
    render: function render (h, ref) {
      var obj;
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var tag = props.tag;
      var gutter = props.gutter;
      var divided = props.divided;
      var matched = props.matched;
      return h(tag, mergeData(data, {
        class: ['uk-grid', ( obj = {
          'uk-grid-match': matched,
          'uk-grid-divider': divided
        }, obj[("uk-grid-" + gutter)] = gutter, obj )]
      }), children)
    }
  };

  function update (el, ctx) {
    var opts = getOptions$1(ctx);
    var items = el.children;
    if (!items.length || !isVisible(el)) {
      return
    }
    var data = getRows(items);
    data.rows.forEach(function (row, i) { return row.forEach(function (el, j) {
        toggleClass(el, opts.margin, i !== 0);
        toggleClass(el, opts.firstColumn, j === 0);
      }); }
    );
    opts.onUpdate(el, data);
  }
  function getOptions$1 (ctx) {
    var ref = ctx.binding;
    var value = ref.value;
    if (value && !isObject$1(value)) {
      warn('[VkMargin]: An Object is expected as configuration', ctx.vnode.context);
    }
    var options = assign({
      onUpdate: noop,
      margin: 'uk-margin-small-top',
      firstColumn: 'uk-first-column'
    }, value);
    return options
  }
  function getRows (items) {
    var data = {};
    var rows = [[]];
    data.stacks = true;
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      var dim = el.getBoundingClientRect();
      if (!dim.height) {
        continue
      }
      for (var j = rows.length - 1; j >= 0; j--) {
        var row = rows[j];
        if (!row[0]) {
          row.push(el);
          break
        }
        var leftDim = row[0].getBoundingClientRect();
        if (dim.top >= Math.floor(leftDim.bottom)) {
          rows.push([el]);
          break
        }
        if (Math.floor(dim.bottom) > leftDim.top) {
          data.stacks = false;
          if (dim.left < leftDim.left && !isRtl) {
            row.unshift(el);
            break
          }
          row.push(el);
          break
        }
        if (j === 0) {
          rows.unshift([el]);
          break
        }
      }
    }
    data.rows = rows;
    return data
  }

  var NAMESPACE = '__vkMargin';
  var Margin = {
    bind: function bind (el, binding, vnode) {
      el[NAMESPACE] = {};
    },
    inserted: function inserted (el, binding, vnode) {
      vnode.context.$nextTick(function () { return update(el, { binding: binding, vnode: vnode }); }
      );
      el[NAMESPACE].unbind = on(window, 'resize', function () { return update(el, { binding: binding, vnode: vnode }); }
      );
    },
    componentUpdated: function componentUpdated (el, binding, vnode) {
      vnode.context.$nextTick(function () { return update(el, { binding: binding, vnode: vnode }); }
      );
    },
    unbind: function unbind (el) {
      if (!el[NAMESPACE]) {
        return
      }
      el[NAMESPACE].unbind();
      delete el[NAMESPACE];
    }
  };

  var VkMargin = {
    install: function install (Vue, ref) {
      if ( ref === void 0 ) ref = {};
      var prefix = ref.prefix; if ( prefix === void 0 ) prefix = 'Vk';
      Vue.directive((prefix + "Margin"), Margin);
    }
  };

  var Grid = {
    name: 'VkGrid',
    directives: { VkMargin: VkMargin },
    props: assign({}, ElGrid.props, {
      margin: {
        type: String,
        default: 'uk-grid-margin'
      },
      firstColumn: {
        type: String,
        default: 'uk-first-column'
      }
    }),
    render: function render (h) {
      var clsStack = 'uk-grid-stack';
      var ref = this;
      var margin = ref.margin;
      var firstColumn = ref.firstColumn;
      return h(ElGrid, {
        props: this.$props,
        directives: [{
          name: 'vk-margin',
          value: {
            margin: margin,
            firstColumn: firstColumn,
            onUpdate: function (el, ref) {
              var stacks = ref.stacks;
              toggleClass(el, clsStack, stacks);
            }
          }
        }]
      }, this.$slots.default)
    }
  };

  var iconnav = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('ul', mergeData(data, {
        class: 'uk-iconnav'
      }), children)
    }
  };

  var iconnavVertical = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('ul', mergeData(data, {
        class: 'uk-iconnav uk-iconnav-vertical'
      }), children)
    }
  };

  var ElIconLink$2 = ElIconLink;
  var ElIconnavItem = {
    functional: true,
    props: {
      href: String,
      target: String,
      active: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var icon$$1 = ref.children;
      var active = props.active;
      var href = props.href;
      var target = props.target;
      return h('li', mergeData(data, {
        class: { 'uk-active': active }
      }), [
        h(ElIconLink$2, {
          attrs: { href: href, target: target }
        }, icon$$1)
      ])
    }
  };

  var iconnav_Item = {
    name: 'VkIconnavItem',
    functional: true,
    props: assign({}, core.props, ElIconnavItem.props),
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      return h(ElIconnavItem, mergeData(data, { props: props }), [
        h(core, { attrs: data.attrs, props: props })
      ])
    }
  };

  var label = {
    functional: true,
    props: {
      type: {
        type: String,
        validator: function (val) { return !val || /^(success|warning|danger)$/.test(val); }
      }
    },
    render: function render (h, ref) {
      var obj;
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      var type = props.type;
      return h('span', mergeData(data, {
        class: ['uk-label', ( obj = {}, obj[("uk-label-" + type)] = type, obj )]
      }), children)
    }
  };

  var list = {
    functional: true,
    props: {
      bullet: {
        type: Boolean,
        default: false
      },
      divided: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      spaced: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      var bullet = props.bullet;
      var divided = props.divided;
      var striped = props.striped;
      var spaced = props.spaced;
      return h('ul', mergeData(data, {
        class: ['uk-list', {
          'uk-list-large': spaced,
          'uk-list-bullet': bullet,
          'uk-list-divider': divided,
          'uk-list-striped': striped
        }]
      }), children)
    }
  };

  var ElModalDialog = {
    functional: true,
    name: 'ElModalDialog',
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-modal-dialog'
      }), children)
    }
  };

  var ElModal = {
    functional: true,
    name: 'ElModal',
    props: {
      expanded: {
        type: Boolean,
        default: false
      },
      centered: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      var expanded = props.expanded;
      var centered = props.centered;
      return h('div', mergeData(data, {
        class: ['uk-modal', {
          'uk-modal-container': expanded,
          'uk-flex uk-flex-top': centered
        }],
        style: {
          display: centered ? 'flex' : 'block'
        }
      }), [
        h(ElModalDialog, {
          class: {
            'uk-margin-auto-vertical': centered
          }
        }, children)
      ])
    }
  };

  var modalFull = {
    functional: true,
    name: 'ElModalFull',
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-modal uk-modal-full',
        style: {
          display: 'block'
        }
      }), [
        h(ElModalDialog, {
          class: 'uk-flex uk-flex-center uk-flex-middle',
          directives: [{
            name: 'vk-height-viewport'
          }]
        }, children)
      ])
    }
  };

  var modal_Body = {
    functional: true,
    name: 'ElModalBody',
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-modal-body'
      }), children)
    }
  };

  var IconClose = {
    functional: true,
    render: function (h, ctx) {
      var props = ctx.props;
      var width = props.width || 14;
      var height = props.height || 14;
      var viewBox = props.viewBox || '0 0 14 14';
      return h('svg', {
        attrs: {
          version: '1.1',
          width: width,
          height: height,
          viewBox: viewBox
        },
        domProps: {
          innerHTML: '<path fill="none" stroke="#000" stroke-width="1.1" d="M1 1l12 12M13 1L1 13"/>'
        }
      })
    }
  };

  var IconCloseLarge = {
    functional: true,
    render: function (h, ctx) {
      var props = ctx.props;
      var width = props.width || 20;
      var height = props.height || 20;
      var viewBox = props.viewBox || '0 0 20 20';
      return h('svg', {
        attrs: {
          version: '1.1',
          width: width,
          height: height,
          viewBox: viewBox
        },
        domProps: {
          innerHTML: '<path fill="none" stroke="#000" stroke-width="1.4" d="M1 1l18 18M19 1L1 19"/>'
        }
      })
    }
  };

  var modal_Close = {
    functional: true,
    name: 'ElModalClose',
    props: {
      large: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var large = props.large;
      var def = {
        class: ["uk-close uk-icon uk-modal-close-default", {
          'uk-close-large': large
        }],
        attrs: {
          type: 'button'
        }
      };
      return h('button', mergeData(data, def), [
        h(large
          ? IconCloseLarge
          : IconClose
        )
      ])
    }
  };

  var modal_Title = {
    functional: true,
    name: 'ElModalTitle',
    props: {
      tag: {
        type: String,
        default: 'h2'
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var tag = props.tag;
      return h(tag, mergeData(data, {
        class: 'uk-modal-title'
      }), children)
    }
  };

  var modal_Footer = {
    functional: true,
    name: 'ElModalFooter',
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-modal-footer'
      }), children)
    }
  };

  var modal_Header = {
    functional: true,
    name: 'ElModalHeader',
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-modal-header'
      }), children)
    }
  };



  var elements$1 = /*#__PURE__*/Object.freeze({
    ElModal: ElModal,
    ElModalFull: modalFull,
    ElModalBody: modal_Body,
    ElModalClose: modal_Close,
    ElModalTitle: modal_Title,
    ElModalDialog: ElModalDialog,
    ElModalFooter: modal_Footer,
    ElModalHeader: modal_Header
  });

  var SHOW$1 = 'show';
  var SHOWN = 'shown';
  var HIDE$1 = 'hide';
  var HIDDEN = 'hidden';
  var CLOSE_KEY = 27;

  var ModalTransition = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      var modal = ref.parent;
      var def = {
        props: {
          css: false
        },
        on: {
          beforeEnter: function beforeEnter () {
            modal.$emit(SHOW$1);
            modal.setPage();
          },
          enter: function enter (el, done) {
            setTimeout(function () {
              modal.open = true;
              once(el, 'transitionend', done, false, function (e) { return e.target === el; });
            }, 0);
          },
          afterEnter: function afterEnter () {
            modal.$emit(SHOWN);
          },
          beforeLeave: function beforeLeave () {
            modal.$emit(HIDE$1);
            modal.open = false;
          },
          leave: function leave (el, done) {
            once(el, 'transitionend', done, false, function (e) { return e.target === el; });
          },
          afterLeave: function afterLeave () {
            modal.$emit(HIDDEN);
            modal.resetPage();
          }
        }
      };
      return h('transition', mergeData({}, data, def), children)
    }
  };

  var core$1 = {
    components: {
      ModalTransition: ModalTransition
    },
    props: assign({}, ElModal.props, {
      show: {
        type: Boolean,
        default: false
      }
    }),
    data: function () { return ({
      open: false
    }); },
    methods: {
      setPage: function setPage () {
        addClass(docEl$1, 'uk-modal-page');
      },
      resetPage: function resetPage () {
        removeClass(docEl$1, 'uk-modal-page');
      },
      hide: function hide () {
        this.$emit('update:show', false);
      }
    },
    mounted: function mounted () {
      var this$1 = this;
      this.$nextTick(function () {
        this$1.$root.$el.appendChild(this$1.$el);
      });
    },
    beforeDestroy: function beforeDestroy () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };

  var active$1;
  var activeCount$1;
  var mixinActive = {
    props: {
      stucked: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      activeCount: function activeCount$1 () {
        return activeCount$1
      }
    },
    methods: {
      isActive: function isActive () {
        return this === active$1
      },
      setAsActive: function setAsActive () {
        active$1 = this;
        activeCount$1++;
      },
      setAsInactive: function setAsInactive () {
        activeCount$1--;
        if (active$1 === this) {
          active$1 = null;
        }
      }
    },
    created: function created () {
      var this$1 = this;
      this.eventsOff = on(docEl$1, 'keyup click', function (e) {
        if (!this$1.isActive() || this$1.stucked) {
          return
        }
        var clickedCloseKey = e.keyCode === CLOSE_KEY;
        var clickedBg = e.target === this$1.$el;
        if (clickedCloseKey || clickedBg) {
          this$1.hide();
        }
      });
    },
    beforeDestroy: function beforeDestroy () {
      this.eventsOff();
    }
  };

  var VkModalOverflowAuto = {
    bind: function bind (el, binding, vnode) {
      el.vkModalOverflowAutoOff = on(window, 'resize', function () { return binding.value && update$1(el, binding, vnode); }
      );
    },
    componentUpdated: function componentUpdated (el, binding, vnode) {
      vnode.context.$nextTick(function () { return binding.value && update$1(el, binding, vnode); }
      );
    },
    unbind: function unbind (el) {
      el.vkModalOverflowAutoOff();
    }
  };
  function update$1 (modal, binding, vnode) {
    var dialog = $('.uk-modal-dialog', modal);
    var body = $('.uk-modal-body', modal);
    addClass(body, 'uk-overflow-auto');
    if (!dialog || !modal) {
      return
    }
    var current = css(body, 'maxHeight');
    css(body, 'maxHeight', 150);
    css(body, 'maxHeight', Math.max(150, 150 + height(modal) - dialog.offsetHeight));
    if (current !== css(body, 'maxHeight')) {
      update$1(modal, binding, vnode);
    }
  }

  var script$1 = {
    name: 'VkModal',
    extends: core$1,
    components: assign({}, elements$1),
    mixins: [ mixinProps, mixinActive ],
    directives: { VkModalOverflowAuto: VkModalOverflowAuto },
    props: {
      scrollable: {
        type: Boolean,
        default: false
      }
    },
    created: function created () {
      var this$1 = this;
      this.$on(SHOWN, function () {
        this$1.setAsActive();
      });
      this.$on(HIDDEN, function () {
        this$1.setAsInactive();
      });
    }
  };

  /* script */
              var __vue_script__$1 = script$1;
              
  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ModalTransition",
      { attrs: { appear: "" } },
      [
        _c(
          "ElModal",
          _vm._b(
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.show,
                  expression: "show"
                },
                {
                  name: "vk-modal-overflow-auto",
                  rawName: "v-vk-modal-overflow-auto",
                  value: _vm.scrollable,
                  expression: "scrollable"
                }
              ],
              class: { "uk-open": _vm.open }
            },
            "ElModal",
            _vm.pickComponentProps(_vm.$props, "ElModal"),
            false
          ),
          [
            _vm.$slots.header
              ? _c("ElModalHeader", [_vm._t("header")], 2)
              : _vm._e(),
            _vm._v(" "),
            _vm.$slots.dialog ? _vm._t("dialog") : _vm._e(),
            _vm._v(" "),
            _vm.$slots.default
              ? _c("ElModalBody", [_vm._t("default")], 2)
              : _vm._e(),
            _vm._v(" "),
            _vm.$slots.footer
              ? _c("ElModalFooter", [_vm._t("footer")], 2)
              : _vm._e()
          ],
          2
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = undefined;
    /* scoped */
    var __vue_scope_id__$1 = undefined;
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* component normalizer */
    function __vue_normalize__$1(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      {
        component.__file = "/Users/miljan/repos/@vuikit/vuikit-next/packages/vuikit/src/modal/components/modal.vue";
      }

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    function __vue_create_injector__$1() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var modal = __vue_normalize__$1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      __vue_create_injector__$1,
      undefined
    );

  var script$2 = {
    name: 'VkModalFull',
    extends: core$1,
    mixins: [ mixinProps ],
    components: assign({}, elements$1),
    beforeUpdate: function beforeUpdate () {
      (this.$slots.default || []).forEach(function (node) {
        if (get(node, 'fnOptions.name') === 'ElModalClose') {
          node.data = mergeData(node.data, { class: 'uk-modal-close-full' });
        }
      });
    }
  };

  /* script */
              var __vue_script__$2 = script$2;
              
  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ModalTransition",
      { attrs: { appear: "" } },
      [
        _c(
          "ElModalFull",
          _vm._b(
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.show,
                  expression: "show"
                }
              ],
              class: { "uk-open": _vm.open }
            },
            "ElModalFull",
            _vm.pickComponentProps(_vm.$props, "ElModalFull"),
            false
          ),
          [_vm._t("default")],
          2
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    var __vue_inject_styles__$2 = undefined;
    /* scoped */
    var __vue_scope_id__$2 = undefined;
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = false;
    /* component normalizer */
    function __vue_normalize__$2(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      {
        component.__file = "/Users/miljan/repos/@vuikit/vuikit-next/packages/vuikit/src/modal/components/modal-full.vue";
      }

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    function __vue_create_injector__$2() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var modalFull$1 = __vue_normalize__$2(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      __vue_create_injector__$2,
      undefined
    );

  var nav$1 = {
    functional: true,
    props: {
      center: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'default',
        validator: function (val) { return /^(default|primary|blank)$/.test(val); }
      }
    },
    render: function render (h, ref) {
      var obj;
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var center = props.center;
      var type = props.type;
      return h('ul', mergeData(data, {
        class: ['uk-nav', ( obj = {
          'uk-nav-center': center
        }, obj[("uk-nav-" + type)] = type, obj )]
      }), children)
    }
  };

  var navItemDivider = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      return h('li', mergeData(data, {
        class: 'uk-nav-divider'
      }))
    }
  };

  var ElNavItemHeader = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('li', mergeData(data, {
        class: 'uk-nav-header'
      }), children)
    }
  };



  var elements$2 = /*#__PURE__*/Object.freeze({
    ElNav: nav$1,
    ElNavItemDivider: navItemDivider,
    ElNavItemHeader: ElNavItemHeader
  });

  var script$3 = {
    name: 'VkNav',
    mixins: [mixinProps],
    components: assign({}, elements$2),
    props: assign({}, nav$1.props)
  };

  /* script */
              var __vue_script__$3 = script$3;
              
  /* template */
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ElNav",
      _vm._b({}, "ElNav", _vm.pickComponentProps(_vm.$props, "ElNav"), false),
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    var __vue_inject_styles__$3 = undefined;
    /* scoped */
    var __vue_scope_id__$3 = undefined;
    /* module identifier */
    var __vue_module_identifier__$3 = undefined;
    /* functional template */
    var __vue_is_functional_template__$3 = false;
    /* component normalizer */
    function __vue_normalize__$3(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      {
        component.__file = "/Users/miljan/repos/@vuikit/vuikit-next/packages/vuikit/src/nav/components/nav.vue";
      }

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    function __vue_create_injector__$3() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var nav$2 = __vue_normalize__$3(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      __vue_create_injector__$3,
      undefined
    );

  var script$4 = {
    name: 'VkNavItem',
    functional: true,
    props: {
      href: String,
      title: String,
      target: String,
      active: Boolean,
      icon: [String, Object]
    }
  };

  /* script */
              var __vue_script__$4 = script$4;
              
  /* template */
  var __vue_render__$4 = function(_h, _vm) {
    var _c = _vm._c;
    return _c(
      "li",
      { class: [_vm.data.staticClass, { "uk-active": _vm.props.active }] },
      [
        _c(
          "a",
          _vm._g(
            { attrs: { href: _vm.props.href, target: _vm.props.target } },
            _vm.listeners
          ),
          [
            _vm.props.icon
              ? [
                  _c("vk-icon", { attrs: { icon: _vm.props.icon } }),
                  _vm._v(" "),
                  _vm.props.title
                    ? _c("span", {
                        staticClass: "uk-text-middle uk-margin-small-left",
                        domProps: { textContent: _vm._s(_vm.props.title) }
                      })
                    : _vm._e()
                ]
              : [_vm._v("\n      " + _vm._s(_vm.props.title) + "\n    ")]
          ],
          2
        )
      ]
    )
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;

    /* style */
    var __vue_inject_styles__$4 = undefined;
    /* scoped */
    var __vue_scope_id__$4 = undefined;
    /* module identifier */
    var __vue_module_identifier__$4 = undefined;
    /* functional template */
    var __vue_is_functional_template__$4 = true;
    /* component normalizer */
    function __vue_normalize__$4(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      {
        component.__file = "/Users/miljan/repos/@vuikit/vuikit-next/packages/vuikit/src/nav/components/nav-item.vue";
      }

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    function __vue_create_injector__$4() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$4.styles || (__vue_create_injector__$4.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var navItem = __vue_normalize__$4(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      __vue_create_injector__$4,
      undefined
    );

  var script$5 = {
    functional: true,
    name: 'VkNavItemParent',
    props: {
      href: String,
      target: String,
      title: {
        type: String,
        required: true
      }
    }
  };

  /* script */
              var __vue_script__$5 = script$5;
              
  /* template */
  var __vue_render__$5 = function(_h, _vm) {
    var _c = _vm._c;
    return _c("li", { staticClass: "uk-parent" }, [
      _c("a", { attrs: { href: _vm.props.href, target: _vm.props.target } }, [
        _vm._v("\n    " + _vm._s(_vm.props.title) + "\n  ")
      ]),
      _vm._v(" "),
      _c("ul", { staticClass: "uk-nav-sub" }, [_vm._t("default")], 2)
    ])
  };
  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;

    /* style */
    var __vue_inject_styles__$5 = undefined;
    /* scoped */
    var __vue_scope_id__$5 = undefined;
    /* module identifier */
    var __vue_module_identifier__$5 = undefined;
    /* functional template */
    var __vue_is_functional_template__$5 = true;
    /* component normalizer */
    function __vue_normalize__$5(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      {
        component.__file = "/Users/miljan/repos/@vuikit/vuikit-next/packages/vuikit/src/nav/components/nav-item-parent.vue";
      }

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    function __vue_create_injector__$5() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$5.styles || (__vue_create_injector__$5.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var navItemParent = __vue_normalize__$5(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      __vue_create_injector__$5,
      undefined
    );

  var script$6 = {
    functional: true,
    name: 'VkNavItemHeader',
    props: {
      title: {
        type: String,
        required: true
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      return h(ElNavItemHeader, data, props.title)
    }
  };

  /* script */
              var __vue_script__$6 = script$6;
              
  /* template */

    /* style */
    var __vue_inject_styles__$6 = undefined;
    /* scoped */
    var __vue_scope_id__$6 = undefined;
    /* module identifier */
    var __vue_module_identifier__$6 = undefined;
    /* functional template */
    var __vue_is_functional_template__$6 = undefined;
    /* component normalizer */
    function __vue_normalize__$6(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      {
        component.__file = "/Users/miljan/repos/@vuikit/vuikit-next/packages/vuikit/src/nav/components/nav-item-header.vue";
      }

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    function __vue_create_injector__$6() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$6.styles || (__vue_create_injector__$6.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var navItemHeader = __vue_normalize__$6(
      {},
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      __vue_create_injector__$6,
      undefined
    );

  var ElNavbarNavigation = {
    functional: true,
    props: {
      align: {
        type: String,
        default: 'left',
        validator: function (val) { return /^(left|center(-left|-right)?|right)$/.test(val); }
      }
    },
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      var align = props.align;
      var wrapContent = /center-(left|right)/.test(align);
      return h('div', mergeData(data, {
        class: ("uk-navbar-" + align)
      }), [
        wrapContent
          ? h('div', children)
          : children
      ])
    }
  };

  function renderSlots (h, slots) {
    return [
      (slots.left || slots.default) && h(ElNavbarNavigation, [
        slots.left, slots.default
      ]),
      (slots.center || slots['center-left'] || slots['center-right']) && h(ElNavbarNavigation, {
        props: { align: 'center' }
      }, [
        slots['center-left'] && h(ElNavbarNavigation, {
          props: { align: 'center-left' }
        }, slots['center-left']),
        slots.center && slots.center,
        slots['center-right'] && h(ElNavbarNavigation, {
          props: { align: 'center-right' }
        }, slots['center-right'])
      ]),
      slots.right && h(ElNavbarNavigation, {
        props: { align: 'right' }
      }, slots.right)
    ]
  }

  var navbar = {
    functional: true,
    props: {
      container: {
        type: Boolean,
        default: true
      },
      transparent: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var slots = ref.slots;
      var container = props.container;
      var transparent = props.transparent;
      return h('nav', mergeData(data, {
        class: ['uk-navbar', {
          'uk-navbar-container': container && !transparent,
          'uk-navbar-transparent': transparent
        }]
      }), renderSlots(h, slots()))
    }
  };

  var navbarFull = {
    functional: true,
    props: {
      expanded: {
        type: Boolean,
        default: false
      },
      transparent: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var slots = ref.slots;
      var expanded = props.expanded;
      var transparent = props.transparent;
      return h('nav', mergeData(data, {
        class: ['uk-navbar-container', {
          'uk-navbar-transparent': transparent
        }]
      }), [
        h('div', {
          class: ['uk-container', {
            'uk-container-expand': expanded
          }]
        }, [
          h('div', {
            class: 'uk-navbar'
          }, renderSlots(h, slots()))
        ])
      ])
    }
  };

  var ElNavbarDropbar = {
    functional: true,
    props: {
      slide: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var slide = props.slide;
      return h('div', mergeData(data, {
        class: ['uk-navbar-dropbar', {
          'uk-navbar-dropbar-slide': slide
        }]
      }))
    }
  };

  var navbar_Item = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-navbar-item'
      }), children)
    }
  };

  var navbar_Logo = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('span', mergeData(data, {
        class: 'uk-navbar-item uk-logo'
      }), children)
    }
  };

  var navbar_LogoLink = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('a', mergeData(data, {
        class: 'uk-navbar-item uk-logo'
      }), children)
    }
  };

  var IconToggle = {
    functional: true,
    render: function (h, ctx) {
      var props = ctx.props;
      var width = props.width || 20;
      var height = props.height || 20;
      var viewBox = props.viewBox || '0 0 20 20';
      return h('svg', {
        attrs: {
          version: '1.1',
          width: width,
          height: height,
          viewBox: viewBox
        },
        domProps: {
          innerHTML: '<path d="M0 9h20v2H0zM0 3h20v2H0zM0 15h20v2H0z"/>'
        }
      })
    }
  };

  var ElIcon$2 = ElIcon;
  var navbar_Toggle = {
    functional: true,
    props: {
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: Boolean,
        default: true
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var icon$$1 = props.icon;
      var title = props.title;
      var Icon = icon$$1 && h(ElIcon$2, {
        class: 'uk-navbar-toggle-icon'
      }, [ h(IconToggle) ]);
      return h('a', mergeData(data, {
        class: 'uk-navbar-toggle'
      }), [
        Icon,
        title && h('span', {
          class: 'uk-margin-small-left'
        }, title)
      ])
    }
  };

  var navbar_Nav = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('ul', mergeData(data, {
        class: 'uk-navbar-nav'
      }), children)
    }
  };

  var ElIcon$3 = ElIcon;
  var ElNavbarNavItem = {
    functional: true,
    props: {
      href: String,
      target: String,
      title: {
        type: String
      },
      subtitle: {
        type: String
      },
      active: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var slots = ref.slots;
      var _slots = slots();
      var active = props.active;
      var title = props.title;
      var subtitle = props.subtitle;
      var icon$$1 = props.icon;
      var href = props.href;
      var target = props.target;
      var Subtitle = subtitle && h('div', [ title, h('div', {
        class: 'uk-navbar-subtitle'
      }, subtitle) ]);
      return h('li', mergeData(data, {
        class: { 'uk-active': active }
      }), [
        h('a', {
          attrs: { href: href, target: target }
        }, [
          _slots.icon && h(ElIcon$3, {
            class: 'uk-margin-small-right'
          }, [ icon$$1 ]),
          Subtitle || title
        ]),
        children
      ])
    }
  };

  var navbar_Nav_DropdownNav = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('ul', mergeData(data, {
        class: 'uk-nav uk-navbar-dropdown-nav'
      }), children)
    }
  };

  var activeDrops;
  var navbarDropbar = {
    name: 'VkNavbarDropbar',
    props: {
      mode: {
        type: String,
        default: 'slide',
        validator: function (val) { return /^(slide|push)$/.test(val); }
      },
      duration: {
        type: Number,
        default: 200
      }
    },
    methods: {
      transitionDropbar: function transitionDropbar (dropdownEl) {
        var el = dropdownEl;
        var marginTop = toFloat(css(el, 'margin-top'));
        var marginBottom = toFloat(css(el, 'margin-bottom'));
        var height$$1 = el.offsetHeight + marginTop + marginBottom;
        this.transitionTo(height$$1, el);
      },
      transitionTo: function transitionTo (newHeight, el) {
        var dropbar = this.$refs.dropbar;
        var oldHeight = isVisible(dropbar) ? height(dropbar) : 0;
        el = oldHeight < newHeight && el;
        css(el, { height: oldHeight, overflow: 'hidden' });
        height(dropbar, oldHeight);
        Transition.cancel([el, dropbar]);
        return Transition
          .start([el, dropbar], { height: newHeight }, this.duration)
          .catch(noop)
          .finally(function () { return css(el, { height: '', overflow: '' }); })
      }
    },
    mounted: function mounted () {
      var this$1 = this;
      var dropdowns = get(this, '$children', [])
        .filter(function (child) { return /NavbarNavDropdown/.test(child.$options.name); })
        .map(function (c) { return c.$children[0]; });
      dropdowns.forEach(function (drop) {
        drop.$vnode.data.class['uk-navbar-dropdown-dropbar'] = true;
        drop.$on('show', function () {
          activeDrops++;
          this$1.$nextTick(function () {
            this$1.transitionDropbar(drop.$el);
          });
        });
        drop.$on('hide', function () {
          activeDrops--;
          this$1.$nextTick(function () {
            if (!activeDrops) {
              this$1.transitionDropbar(drop.$el);
            }
          });
        });
      });
    },
    render: function render (h) {
      return h('div', {
        class: 'uk-position-relative'
      }, [
        this.$slots.default,
        h(ElNavbarDropbar, {
          ref: 'dropbar',
          props: {
            slide: this.mode === 'slide'
          }
        })
      ])
    }
  };

  var navbar_Nav_Item = {
    name: 'VkNavbarNavItem',
    functional: true,
    props: assign({}, core.props, {
      icon: { required: false }
    }, ElNavbarNavItem.props),
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      return h(ElNavbarNavItem, mergeData(data, { props: props }), [
        props.icon && h(core, { props: props, slot: 'icon' })
      ])
    }
  };

  var navbar_Nav_Dropdown = {
    name: 'VkNavbarNavDropdown',
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String
      },
      justified: {
        type: Boolean,
        default: false
      },
      align: {
        type: String,
        default: isRtl ? 'right' : 'left',
        validator: function (val) { return /^(left|center|right)$/.test(val); }
      },
      navbarAligned: {
        type: Boolean,
        default: false
      },
      mode: Drop.props.mode,
      offset: Drop.props.offset,
      animation: Drop.props.animation,
      duration: Drop.props.duration,
      delayShow: Drop.props.delayShow,
      delayHide: Drop.props.delayHide
    },
    computed: {
      navbar: function navbar () {
        return query('!.uk-navbar', this.$el)
      },
      dropbar: function dropbar () {
        return /NavbarDropbar/.test(get(this, '$parent.$options.name', ''))
          ? this.$parent
          : false
      }
    },
    mounted: function mounted () {
      var ref = this;
      var mode = ref.mode;
      var ref$1 = this.$refs.drop;
      var on = ref$1.on;
      var toggle = ref$1.toggle;
      var show = ref$1.show;
      var hide = ref$1.hide;
      var target = this.$refs.drop.$refs.target;
      if (/click/.test(mode) || hasTouch) {
        on(target, 'click', toggle);
      }
      if (/hover/.test(mode)) {
        on(target, pointerEnter, function (e) {
          if (isTouch(e)) {
            return
          }
          e.preventDefault();
          show();
        });
        on(this.dropbar ? this.dropbar.$el : target, pointerLeave, function (e) {
          if (isTouch(e)) {
            return
          }
          e.preventDefault();
          hide();
        });
      }
    },
    render: function render (h) {
      var this$1 = this;
      var obj, obj$1;
      var ref = this;
      var title = ref.title;
      var justified = ref.justified;
      var mode = ref.mode;
      var align = ref.align;
      var navbarAligned = ref.navbarAligned;
      var subtitle = ref.subtitle;
      var defaultSlots = this.$slots.default || [];
      var childrenNodes = defaultSlots.filter(function (n) { return n.tag; });
      var colCount = childrenNodes.length;
      var Subtitle = subtitle && h('div', [ title, h('div', {
        class: 'uk-navbar-subtitle'
      }, subtitle) ]);
      return h('li', [
        h('a', [Subtitle || title]),
        h(Drop, {
          on: {
            show: function (e) {
              this$1.$forceUpdate();
            }
          },
          nativeOn: ( obj = {}, obj[pointerEnter] = function (e) {
              this$1.$refs.drop.clearTimers();
              if (/hover/.test(mode)) {
                this$1.$refs.drop.show();
              }
            }, obj[pointerLeave] = function (e) {
              if (!this$1.dropbar && /hover/.test(mode)) {
                this$1.$refs.drop.hide();
              }
            }, obj ),
          ref: 'drop',
          class: ( obj$1 = {
            'uk-navbar-dropdown-dropbar': Boolean(this.dropbar),
            'uk-navbar-dropdown-boundary': justified || navbarAligned
          }, obj$1[("uk-navbar-dropdown-width-" + colCount)] = colCount > 1 && !justified, obj$1 ),
          props: assign({}, this.$props, {
            mode: '',
            position: justified
              ? 'bottom-justify'
              : ("bottom-" + align),
            mainClass: 'uk-navbar-dropdown',
            flip: justified ? 'x' : undefined,
            boundary: '!nav',
            boundaryAlign: justified || navbarAligned
          })
        }, [
          colCount >= 2
            ? h(Grid, {
              class: [
                'uk-navbar-dropdown-grid',
                ("uk-child-width-1-" + colCount + (colCount > 2 ? '@m' : ''))
              ]
            }, childrenNodes.map(function (child) { return h('div', [ child ]); }
            ))
            : defaultSlots
        ])
      ])
    }
  };

  var NAMESPACE$1 = '__vkNotification';
  var MessageDirective = {
    inserted: function inserted (el, binding, vnode) {
      el[NAMESPACE$1] = {};
      var close = function () { return doClose(el, vnode); };
      var opts = el[NAMESPACE$1].options = binding.value;
      if (opts.timeout) {
        el[NAMESPACE$1].timer = setTimeout(close, opts.timeout);
      }
      on(el, 'click', close);
      on(el, pointerEnter, function () {
        if (el[NAMESPACE$1].timer) {
          clearTimeout(el[NAMESPACE$1].timer);
        }
      });
      on(el, pointerLeave, function () {
        if (opts.timeout) {
          el[NAMESPACE$1].timer = setTimeout(close, opts.timeout);
        }
      });
    },
    unbind: function unbind (el) {
      if (!el[NAMESPACE$1]) {
        return
      }
      clearTimeout(el[NAMESPACE$1].timer);
      delete el[NAMESPACE$1];
    }
  };
  function doClose (el, vnode) {
    clearTimeout(el[NAMESPACE$1].timer);
    trigger(el, 'close');
  }

  var MessageTransition = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      var parent = ref.parent;
      var def = {
        props: {
          css: false,
          appear: true,
          tag: 'div'
        },
        on: {
          enter: function enter (el, done) {
            var marginBottom = toFloat(css(el, 'marginBottom'));
            css(el, { opacity: 0, marginTop: -el.offsetHeight, marginBottom: 0 });
            Transition.start(el, {
              opacity: 1,
              marginTop: 0,
              marginBottom: marginBottom
            }).then(done);
          },
          leave: function leave (el, done) {
            Transition.start(el, {
              opacity: 0,
              marginTop: -el.offsetHeight,
              marginBottom: 0
            }).then(done);
          }
        }
      };
      return h('transition-group', mergeData(data, def), children)
    }
  };

  var ElNotification = {
    functional: true,
    props: {
      position: {
        type: String,
        default: 'top-center',
        validator: function (val) { return /^(top|bottom)-(left|center|right)$/.test(val); }
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var position = props.position;
      return h('div', mergeData(data, {
        class: [
          'uk-notification',
          ("uk-notification-" + position)
        ]
      }), children)
    }
  };

  var ElIconLink$3 = ElIconLink;
  var ElNotificationClose = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      return h(ElIconLink$3, mergeData(data, {
        class: 'uk-notification-close uk-close'
      }), [
        h(IconClose)
      ])
    }
  };

  var ElNotificationMessage = {
    functional: true,
    props: {
      status: {
        type: String,
        default: '',
        validator: function (val) { return !val || /^(primary|success|warning|danger)$/.test(val); }
      }
    },
    render: function render (h, ref) {
      var obj;
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var status = props.status;
      return h('div', mergeData(data, {
        class: ['uk-notification-message', ( obj = {}, obj[("uk-notification-message-" + status)] = status, obj )]
      }), children)
    }
  };

  var notification = {
    name: 'VkNotification',
    directives: { MessageDirective: MessageDirective },
    props: assign({}, ElNotification.props, {
      timeout: {
        type: Number,
        default: 5000
      },
      messages: {
        type: Array,
        default: function () { return []; },
        validator: function (val) {
          if (!val.every(function (m) { return isObject$1(m) || isString$1(m); })) {
            {
              warn('[VkNotification]: Each message is expected as Object or String');
            }
            return false
          }
          return true
        }
      },
      status: ElNotificationMessage.props.status
    }),
    computed: {
      $messages: function $messages () {
        var this$1 = this;
        var messages = this.messages.map(function (val) {
          var msg = isString$1(val) ? { message: val } : val;
          return assign({ status: this$1.status, timeout: this$1.timeout }, msg)
        });
        messages = this.removeDuplicates(messages);
        return messages
      }
    },
    methods: {
      triggerRemove: function triggerRemove (msg) {
        var this$1 = this;
        this.closeQueue = this.closeQueue || [];
        this.closeQueue.push(msg);
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          var queue = [].concat( this$1.closeQueue );
          var messages = [].concat( this$1.$messages );
          this$1.closeQueue = [];
          queue.forEach(function (msg) {
            var index = messages.indexOf(messages.filter(function (m) { return m === msg; })[0]);
            messages.splice(index, 1);
          });
          this$1.$emit('update:messages', messages);
        });
      },
      removeDuplicates: function removeDuplicates (values) {
        var this$1 = this;
        var messages = [];
        var isDuplicated = function (msg) { return messages.filter(function (m) { return this$1.getMessageId(m) === this$1.getMessageId(msg); }
        ).length; };
        for (var i = 0; i < values.length; i++) {
          if (isDuplicated(values[i])) {
            {
              tip('[VkNotification]: Duplicate messages are filtered out, consider adding a unique `key` to those.');
            }
            continue
          }
          messages.push(values[i]);
        }
        return messages
      },
      getMessageId: function getMessageId (msg) {
        var validKeys = ['message', 'status', 'key', 'timeout'];
        return Object.keys(msg)
          .filter(function (k) { return validKeys.filter(function (k) { return k; })[0]; })
          .map(function (k) { return msg[k]; })
          .join(':')
      }
    },
    render: function render (h) {
      var this$1 = this;
      var ref = this;
      var position = ref.position;
      var MessageSlot = get(this, '$scopedSlots.default', function (msg) { return msg.message; });
      return h(ElNotification, {
        props: { position: position }
      }, [
        h(MessageTransition, [
          this.$messages.map(function (msg, index) { return h(ElNotificationMessage, {
              key: this$1.getMessageId(msg),
              props: msg,
              directives: [{
                name: 'message-directive',
                value: msg
              }],
              on: {
                close: function () { return this$1.triggerRemove(msg); }
              }
            }, [
              MessageSlot(msg),
              h(ElNotificationClose)
            ]); }
          )
        ])
      ])
    }
  };

  var core$2 = {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hide: function hide () {
        this.$emit('update:show', false);
      }
    },
    mounted: function mounted () {
      this.$refs.content = query('body .uk-offcanvas-content');
      var isBody = function (n) { return n.nodeName === 'BODY'; };
      {
        if (!this.$refs.content) {
          warn('[VkOffcanas]: The `div.uk-offcanvas-content` element was not detected.', this);
        } else if (!isBody(this.$refs.content.parentNode)) {
          tip('[VkOffcanas]: The `div.uk-offcanvas-content` element should be placed as a direct child of the body.', this);
        }
      }
    }
  };

  var scroll;
  var mixinPage = {
    props: {
      flipped: {
        type: Boolean,
        default: false
      },
      overlay: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getScrollbarWidth: function getScrollbarWidth () {
        return width(win$1) - docEl$1.offsetWidth
      },
      setPage: function setPage () {
        var contentEl = queryContentEl();
        scroll = scroll || getScroll();
        addClass(docEl$1, 'uk-offcanvas-page');
        addClass(body, 'uk-offcanvas-container');
        if (this.flipped) {
          addClass(contentEl.parentNode, 'uk-offcanvas-flip');
        }
        if (this.overlay) {
          addClass(body, 'uk-offcanvas-overlay');
          height(contentEl, height(win$1));
        }
        if (scroll) {
          contentEl.scrollTop = scroll.y;
        }
      },
      resetPage: function resetPage () {
        var contentEl = queryContentEl();
        var hasOverlay = hasClass(body, 'uk-offcanvas-overlay');
        if (!hasOverlay) {
          scroll = getScroll();
        } else if (!scroll) {
          scroll = getContentScroll();
        }
        removeClass(contentEl.parentNode, 'uk-offcanvas-flip');
        removeClass(docEl$1, 'uk-offcanvas-page');
        removeClass(body, 'uk-offcanvas-container');
        removeClass(body, 'uk-offcanvas-overlay');
        body.scrollTop = scroll.y;
        css(body, 'overflowY', '');
        css(docEl$1, 'overflowY', '');
        width(contentEl, '');
        height(contentEl, '');
        win$1.scrollTo(scroll.x, scroll.y);
        scroll = null;
      }
    }
  };
  function getContentScroll () {
    var ref = queryContentEl();
    var x = ref.scrollLeft;
    var y = ref.scrollTop;
    return { x: x, y: y }
  }
  function getScroll () {
    return { x: win$1.pageXOffset, y: win$1.pageYOffset }
  }
  function queryContentEl () {
    return query('.uk-offcanvas-content')
  }

  var SHOW$2 = 'show';
  var HIDE$2 = 'hide';
  var SHOWN$1 = 'shown';
  var HIDDEN$1 = 'hidden';
  var CLOSE_KEY$1 = 27;

  var active$2;
  var mixinActive$1 = {
    props: {
      stucked: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      isActive: function isActive () {
        return this === active$2
      },
      setAsActive: function setAsActive () {
        active$2 = this;
      },
      setAsInactive: function setAsInactive () {
        if (active$2 === this) {
          active$2 = null;
        }
      }
    },
    created: function created () {
      var this$1 = this;
      this.eventsOff = on(docEl$1, 'keyup click', function (e) {
        if (!this$1.isActive() || this$1.stucked) {
          return
        }
        var clickedCloseKey = e.keyCode === CLOSE_KEY$1;
        var clickedOut = !this$1.$refs.bar.contains(e.target);
        if (clickedCloseKey || clickedOut) {
          this$1.hide();
        }
      });
    },
    beforeDestroy: function beforeDestroy () {
      this.eventsOff();
    }
  };

  var ElOffcanvas = {
    functional: true,
    props: {
      overlay: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var overlay = props.overlay;
      return h('div', mergeData(data, {
        class: ['uk-offcanvas', {
          'uk-offcanvas-overlay': overlay
        }],
        style: {
          display: 'block'
        }
      }), children)
    }
  };

  var offcanvasContent = {
    functional: true,
    render: function render (h, ref) {
      var data = ref.data;
      var children = ref.children;
      return h('div', mergeData(data, {
        class: 'uk-offcanvas-content'
      }), children)
    }
  };

  var ElOffcanvasBar = {
    functional: true,
    props: {
      animated: Boolean
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var animated = props.animated;
      return h('div', mergeData(data, {
        class: ['uk-offcanvas-bar', {
          'uk-offcanvas-bar-animation': animated
        }]
      }), children)
    }
  };

  var offcanvas_Close = {
    functional: true,
    props: {
      enlarged: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var enlarged = props.enlarged;
      var def = {
        class: ['uk-offcanvas-close uk-close uk-icon', {
          'uk-close-large': enlarged
        }],
        attrs: {
          type: 'button'
        }
      };
      return h('button', mergeData(data, def), [
        h(enlarged ? IconCloseLarge : IconClose)
      ])
    }
  };

  var Offcanvas = {
    inheritAttrs: false,
    name: 'VkOffcanvas',
    extends: core$2,
    mixins: [ mixinPage, mixinActive$1 ],
    created: function created () {
      var this$1 = this;
      this.$on(SHOW$2, function () {
        this$1.setPage();
      });
      this.$on(SHOWN$1, function () {
        this$1.setAsActive();
      });
      this.$on(HIDDEN$1, function () {
        this$1.resetPage();
        this$1.setAsInactive();
      });
    },
    beforeDestroy: function beforeDestroy () {
      this.$emit(HIDDEN$1);
    },
    render: function render (h) {
      var instance = this;
      var content = h(ElOffcanvas, {
        props: this.$props,
        class: {
          'uk-open': this.show
        },
        directives: [{
          name: 'show',
          value: this.show
        }]
      }, [
        h(ElOffcanvasBar, {
          ref: 'bar',
          class: {
            'uk-offcanvas-none': this.show
          }
        }, this.$slots.default)
      ]);
      return h('transition', {
        props: { css: false },
        on: {
          enter: function (el, done) { return done(); },
          leave: function (el, done) { return done(); },
          beforeEnter: function beforeEnter (el) {
            instance.$emit(SHOW$2);
            var scrollbarWidth = instance.getScrollbarWidth();
            css(docEl$1, 'overflowY', scrollbarWidth && instance.overlay
              ? 'scroll'
              : ''
            );
            width(instance.$refs.content, width(win$1) - scrollbarWidth);
          },
          afterEnter: function afterEnter (el) {
            instance.$emit(SHOWN$1);
          },
          beforeLeave: function beforeLeave (el) {
            instance.$emit(HIDE$2);
          },
          afterLeave: function afterLeave (el) {
            instance.$emit(HIDDEN$1);
          }
        }
      }, [ content ])
    }
  };

  var offcanvasPush = {
    name: 'VkOffcanvasPush',
    extends: Offcanvas,
    data: function () { return ({
      open: false
    }); },
    render: function render (h) {
      var instance = this;
      var content = h(ElOffcanvas, {
        props: this.$props,
        class: {
          'uk-open': this.open
        },
        directives: [{
          name: 'show',
          value: this.show
        }]
      }, [
        h(ElOffcanvasBar, {
          ref: 'bar',
          props: { animated: true },
          class: 'uk-offcanvas-push'
        }, this.$slots.default)
      ]);
      return h('transition', {
        props: { css: false },
        on: {
          beforeEnter: function beforeEnter (el) {
            instance.$emit(SHOW$2);
            var scrollbarWidth = instance.getScrollbarWidth();
            css(docEl$1, 'overflowY', instance.flipped && scrollbarWidth && instance.overlay
              ? 'scroll'
              : ''
            );
            width(instance.$refs.content, width(win$1) - scrollbarWidth);
          },
          enter: function enter (el, done) {
            height(el);
            instance.open = true;
            addClass(instance.$refs.content, 'uk-offcanvas-content-animation');
            once(el, 'transitionend', done, false, function (e) { return e.target === instance.$refs.bar; });
          },
          afterEnter: function afterEnter (el) {
            instance.$emit(SHOWN$1);
          },
          beforeLeave: function beforeLeave (el) {
            instance.$emit(HIDE$2);
            instance.open = false;
            removeClass(instance.$refs.content, 'uk-offcanvas-content-animation');
          },
          leave: function leave (el, done) {
            once(el, 'transitionend', done, false, function (e) { return e.target === instance.$refs.bar; });
          },
          afterLeave: function afterLeave (el) {
            instance.$emit(HIDDEN$1);
          }
        }
      }, [ content ])
    }
  };

  var offcanvasSlide = {
    name: 'VkOffcanvasSlide',
    extends: Offcanvas,
    data: function () { return ({
      open: false
    }); },
    render: function render (h) {
      var instance = this;
      var inheritClass = this.$vnode.data.staticClass;
      delete this.$vnode.data.staticClass;
      var content = h(ElOffcanvas, {
        props: this.$props,
        class: {
          'uk-open': this.open
        },
        directives: [{
          name: 'show',
          value: this.show
        }]
      }, [
        h(ElOffcanvasBar, {
          ref: 'bar',
          props: { animated: true },
          class: [inheritClass, 'uk-offcanvas-slide']
        }, this.$slots.default)
      ]);
      return h('transition', {
        props: { css: false },
        on: {
          beforeEnter: function beforeEnter (el) {
            instance.$emit(SHOW$2);
            var scrollbarWidth = instance.getScrollbarWidth();
            css(docEl$1, 'overflowY', scrollbarWidth && instance.overlay
              ? 'scroll'
              : ''
            );
            width(instance.$refs.content, width(win$1) - scrollbarWidth);
          },
          enter: function enter (el, done) {
            height(el);
            instance.open = true;
            once(el, 'transitionend', done, false, function (e) { return e.target === instance.$refs.bar; });
          },
          afterEnter: function afterEnter (el) {
            instance.$emit(SHOWN$1);
          },
          beforeLeave: function beforeLeave (el) {
            instance.$emit(HIDE$2);
            instance.open = false;
          },
          leave: function leave (el, done) {
            once(el, 'transitionend', done, false, function (e) { return e.target === instance.$refs.bar; });
          },
          afterLeave: function afterLeave (el) {
            instance.$emit(HIDDEN$1);
          }
        }
      }, [ content ])
    }
  };

  var offcanvasReveal = {
    name: 'VkOffcanvasReveal',
    extends: Offcanvas,
    data: function () { return ({
      open: false
    }); },
    render: function render (h) {
      var instance = this;
      var inheritClass = this.$vnode.data.staticClass;
      delete this.$vnode.data.staticClass;
      var content = h(ElOffcanvas, {
        props: this.$props,
        class: {
          'uk-open': this.open
        },
        directives: [{
          name: 'show',
          value: this.show
        }]
      }, [
        h('div', {
          ref: 'reveal',
          class: 'uk-offcanvas-reveal'
        }, [
          h(ElOffcanvasBar, {
            ref: 'bar',
            props: { animated: true },
            class: [inheritClass, 'uk-offcanvas-slide']
          }, this.$slots.default)
        ])
      ]);
      return h('transition', {
        props: { css: false },
        on: {
          beforeEnter: function beforeEnter (el) {
            instance.$emit(SHOW$2);
            var scrollbarWidth = instance.getScrollbarWidth();
            css(docEl$1, 'overflowY', instance.flipped && scrollbarWidth && instance.overlay
              ? 'scroll'
              : ''
            );
            width(instance.$refs.content, width(win$1) - scrollbarWidth);
          },
          enter: function enter (el, done) {
            height(el);
            instance.open = true;
            addClass(instance.$refs.content, 'uk-offcanvas-content-animation');
            once(el, 'transitionend', done, false, function (e) { return e.target === instance.$refs.reveal; });
          },
          afterEnter: function afterEnter (el) {
            instance.$emit(SHOWN$1);
          },
          beforeLeave: function beforeLeave (el) {
            instance.$emit(HIDE$2);
            instance.open = false;
            removeClass(instance.$refs.content, 'uk-offcanvas-content-animation');
          },
          leave: function leave (el, done) {
            once(el, 'transitionend', done, false, function (e) { return e.target === instance.$refs.reveal; });
          },
          afterLeave: function afterLeave (el) {
            instance.$emit(HIDDEN$1);
          }
        }
      }, [ content ])
    }
  };

  var ElPagination = {
    functional: true,
    props: {
      align: {
        type: String,
        default: 'left',
        validator: function (val) { return /^(left|center|right)$/.test(val); }
      }
    },
    render: function render (h, ref) {
      var obj;
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var align = props.align;
      return h('ul', mergeData(data, {
        class: ['uk-pagination', ( obj = {}, obj[("uk-flex-" + align)] = align !== 'left', obj )]
      }), children)
    }
  };

  var ElPaginationPage = {
    functional: true,
    props: {
      active: {
        type: Boolean,
        default: false
      },
      title: {
        type: [String, Number],
        default: ''
      }
    },
    render: function (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var active = props.active;
      var title = props.title;
      return h('li', {
        class: {
          'uk-active': active
        }
      }, [
        active
          ? h('span', title)
          : h('a', { on: data.on }, title)
      ])
    }
  };

  var Icon = {
    functional: true,
    render: function (h, ctx) {
      var props = ctx.props;
      var ratio = props.ratio || 1;
      var width = props.width || 7;
      var height = props.height || 12;
      var viewBox = props.viewBox || '0 0 7 12';
      if (ratio !== 1) {
        width = width * ratio;
        height = height * ratio;
      }
      return h('svg', {
        attrs: {
          version: '1.1',
          meta: 'icon-pagination-next ratio-' + ratio,
          width: width,
          height: height,
          viewBox: viewBox
        },
        domProps: {
          innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M1 1l5 5-5 5"/>'
        }
      })
    }
  };

  var ElIcon$4 = ElIcon;
  var ElPaginationPageNext = {
    functional: true,
    props: {
      title: {
        type: String,
        default: ''
      },
      expanded: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var listeners = ref.listeners;
      var title = props.title;
      var expanded = props.expanded;
      var disabled = props.disabled;
      delete data.on;
      return h('li', mergeData(data, {
        class: {
          'uk-disabled': disabled,
          'uk-margin-auto-left': expanded
        }
      }), [
        h('a', { on: listeners }, [
          title,
          h(ElIcon$4, {
            class: ['uk-pagination-prev', {
              'uk-margin-small-left': title
            }]
          }, [ h(Icon) ])
        ])
      ])
    }
  };

  var Icon$1 = {
    functional: true,
    render: function (h, ctx) {
      var props = ctx.props;
      var ratio = props.ratio || 1;
      var width = props.width || 7;
      var height = props.height || 12;
      var viewBox = props.viewBox || '0 0 7 12';
      if (ratio !== 1) {
        width = width * ratio;
        height = height * ratio;
      }
      return h('svg', {
        attrs: {
          version: '1.1',
          meta: 'icon-pagination-prev ratio-' + ratio,
          width: width,
          height: height,
          viewBox: viewBox
        },
        domProps: {
          innerHTML: '<path fill="none" stroke="#000" stroke-width="1.2" d="M6 1L1 6l5 5"/>'
        }
      })
    }
  };

  var ElIcon$5 = ElIcon;
  var ElPaginationPagePrev = {
    functional: true,
    props: {
      title: {
        type: String,
        default: ''
      },
      expanded: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var listeners = ref.listeners;
      var title = props.title;
      var expanded = props.expanded;
      var disabled = props.disabled;
      delete data.on;
      return h('li', mergeData(data, {
        class: {
          'uk-disabled': disabled,
          'uk-margin-auto-right': expanded
        }
      }), [
        h('a', { on: listeners }, [
          h(ElIcon$5, {
            class: ['uk-pagination-prev', {
              'uk-margin-small-right': title
            }]
          }, [ h(Icon$1) ]),
          title
        ])
      ])
    }
  };

  function toMedia (value) {
    if (isString$1(value)) {
      if (value[0] === '@') {
        var name = "media-" + (value.substr(1));
        value = toFloat(getCssVar(name));
      } else if (isNaN(value)) {
        return value
      }
    }
    return value && !isNaN(value) ? ("(min-width: " + value + "px)") : false
  }
  function range$1 (start, stop, step) {
    if ( step === void 0 ) step = 1;
    if (typeof stop === 'undefined') {
      stop = start;
      start = 0;
    }
    return Array.from(new Array(Math.floor((stop - start) / step)), function (x, i) { return start + (i * step); })
  }

  function Matrix (ref) {
    if ( ref === void 0 ) ref = {};
    var total = ref.total; if ( total === void 0 ) total = 200;
    var page = ref.page; if ( page === void 0 ) page = 1;
    var perPage = ref.perPage; if ( perPage === void 0 ) perPage = 10;
    var range$$1 = ref.range; if ( range$$1 === void 0 ) range$$1 = 3;
    var matrix = [];
    var totalPages = Math.ceil(total / perPage);
    if (totalPages < 2) {
      return [1]
    }
    var mainPages = getMainPages({ page: page, range: range$$1, totalPages: totalPages });
    var first = mainPages[0];
    var last = mainPages[mainPages.length - 1];
    var prePages = range$1(1, (first <= 3) ? first : 2);
    var postPages = range$1(
      last >= (totalPages - 2) ? last + 1 : totalPages,
      totalPages + 1
    );
    var nextPage = 1
    ;[].concat(prePages, mainPages, postPages).forEach(function (p) {
      if (p === nextPage) {
        matrix.push(p);
        nextPage++;
      } else {
        matrix.push('...');
        matrix.push(p);
        nextPage = p + 1;
      }
    });
    return matrix
  }
  var getMainPages = function (ref) {
    var page = ref.page;
    var range$$1 = ref.range;
    var totalPages = ref.totalPages;
    var start = page - range$$1;
    var end = page + range$$1;
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - (range$$1 * 2);
      start = start < 1 ? 1 : start;
    }
    if (start <= 1) {
      start = 1;
      end = Math.min((range$$1 * 2) + 1, totalPages);
    }
    return range$1(start, end + 1)
  };

  var pagination = {
    name: 'Pagination',
    directives: { VkMargin: VkMargin },
    props: assign({}, ElPagination.props, {
      page: {
        type: Number,
        default: 1
      },
      perPage: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      range: {
        type: Number,
        default: 3
      }
    }),
    computed: {
      prevPage: function prevPage () {
        return this.page - 1
      },
      nextPage: function nextPage () {
        return this.page + 1
      },
      pages: function pages () {
        return Matrix({ total: this.total, page: this.page, perPage: this.perPage })
      },
      lastPage: function lastPage () {
        return this.pages[this.pages.length - 1]
      }
    },
    methods: {
      update: function update (page) {
        this.$emit('update:page', page);
      }
    },
    render: function render (h) {
      var this$1 = this;
      var nodes = (this.$slots.default || []).filter(function (node) { return node.tag; });
      return h(ElPagination, {
        props: this.$props,
        directives: [{
          name: 'vk-margin'
        }]
      }, nodes.map(function (node) {
        if (!node.fnOptions) {
          warn(("[VkPagination]: " + (node.tag) + " component is not functional"), this$1);
          return
        }
        return node.data.rerender
          ? h(node.fnOptions, mergeData(node.data, {
            rerendering: true
          }))
          : node
      }))
    }
  };

  var pagination_Pages = {
    functional: true,
    render: function (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var parent = ref.parent;
      if (!data.rerendering) {
        return h('li', {
          rerender: true
        })
      }
      var currentPage = parent.page;
      return parent.pages.map(function (page) {
        var isPage = isNumber(page);
        return isPage
          ? h(ElPaginationPage, {
            props: {
              title: page,
              active: currentPage === page
            },
            on: {
              click: function (e) { return parent.$emit('update:page', page); }
            }
          })
          : h('li', [ h('span', '...') ])
      })
    }
  };

  var pagination_PageFirst = {
    functional: true,
    props: ElPaginationPagePrev.props,
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var parent = ref.parent;
      var title = props.title;
      var expanded = props.expanded;
      if (!data.rerendering) {
        return h('li', mergeData(data, {
          rerender: true,
          props: props
        }))
      }
      return h(ElPaginationPagePrev, {
        props: {
          title: title,
          expanded: expanded,
          disabled: parent.prevPage < 1
        },
        on: {
          click: function (e) { return parent.update(1); }
        }
      })
    }
  };

  var pagination_PagePrev = {
    functional: true,
    props: ElPaginationPagePrev.props,
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var parent = ref.parent;
      var title = props.title;
      var expanded = props.expanded;
      if (!data.rerendering) {
        return h('li', mergeData(data, {
          rerender: true,
          props: props
        }))
      }
      return h(ElPaginationPagePrev, {
        props: {
          title: title,
          expanded: expanded,
          disabled: parent.prevPage < 1
        },
        on: {
          click: function (e) { return parent.update(parent.prevPage); }
        }
      })
    }
  };

  var pagination_PageNext = {
    functional: true,
    props: ElPaginationPageNext.props,
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var parent = ref.parent;
      var title = props.title;
      var expanded = props.expanded;
      if (!data.rerendering) {
        return h('li', mergeData(data, {
          rerender: true,
          props: props
        }))
      }
      return h(ElPaginationPageNext, {
        props: {
          title: title,
          expanded: expanded,
          disabled: parent.nextPage > parent.lastPage
        },
        on: {
          click: function (e) { return parent.update(parent.nextPage); }
        }
      })
    }
  };

  var pagination_PageLast = {
    functional: true,
    props: ElPaginationPageNext.props,
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var parent = ref.parent;
      var title = props.title;
      var expanded = props.expanded;
      if (!data.rerendering) {
        return h('li', mergeData(data, {
          rerender: true,
          props: props
        }))
      }
      return h(ElPaginationPageNext, {
        props: {
          title: title,
          expanded: expanded,
          disabled: parent.nextPage > parent.lastPage
        },
        on: {
          click: function (e) { return parent.update(parent.lastPage); }
        }
      })
    }
  };

  var fastdom = {
    reads: [],
    writes: [],
    read: function read (task) {
      this.reads.push(task);
      scheduleFlush();
      return task
    },
    write: function write (task) {
      this.writes.push(task);
      scheduleFlush();
      return task
    },
    clear: function clear (task) {
      return remove$1(this.reads, task) || remove$1(this.writes, task)
    },
    flush: function flush () {
      runTasks(this.reads);
      runTasks(this.writes.splice(0, this.writes.length));
      this.scheduled = false;
      if (this.reads.length || this.writes.length) {
        scheduleFlush();
      }
    }
  };
  function scheduleFlush () {
    if (!fastdom.scheduled) {
      fastdom.scheduled = true;
      requestAnimationFrame(fastdom.flush.bind(fastdom));
    }
  }
  function runTasks (tasks) {
    var task;
    while ((task = tasks.shift())) {
      task();
    }
  }
  function remove$1 (array, item) {
    var index = array.indexOf(item);
    return !!~index && !!array.splice(index, 1)
  }

  var DATA = '_vk_fastdom_data';
  var FRAMES = '_vk_fastdom_frames';
  var scroll$1 = 0;
  var instances = [];
  if (typeof window !== 'undefined') {
    on(window, 'load resize', function () { return instances.forEach(function (i) { return i.fastdomUpdate(); }); }
    );
    on(window, 'scroll', function (e) {
      e.dir = scroll$1 <= window.pageYOffset ? 'down' : 'up';
      e.scrollY = scroll$1 = window.pageYOffset;
      instances.forEach(function (inst) { return inst.fastdomUpdate(e); });
    });
  }
  var MixinFastdom = {
    methods: {
      fastdomUpdate: function fastdomUpdate (e, parents) {
        if ( parents === void 0 ) parents = false;
        e = createEvent(e || 'update');
        var instance = this;
        if (parents) {
          do {
            if (instance._fastdom_ready) {
              instance._fastdomUpdate(e);
            }
            instance = instance.$parent();
          } while (instance)
        } else {
          apply(instance, function (instance) {
            if (instance._fastdom_ready) {
              instance._fastdomUpdate(e);
            }
          });
        }
      },
      _fastdomUpdate: function _fastdomUpdate (e) {
        var this$1 = this;
        e = createEvent(e || 'update');
        var type = e.type;
        var updates = this.$options.fastdom;
        var ref = this[FRAMES];
        var reads = ref.reads;
        var writes = ref.writes;
        if (!updates) {
          return
        }
        updates.forEach(function (ref, i) {
          var read = ref.read;
          var write = ref.write;
          var events = ref.events;
          if (type !== 'update' && !includes(events, type)) {
            return
          }
          if (read && !includes(fastdom.reads, reads[i])) {
            reads[i] = fastdom.read(function () {
              var result = read.call(this$1, this$1[DATA], e);
              if (result === false && write) {
                fastdom.clear(writes[i]);
                delete writes[i];
              } else if (isPlainObject(result)) {
                assign(this$1[DATA], result);
              }
              delete reads[i];
            });
          }
          if (write && !includes(fastdom.writes, writes[i])) {
            writes[i] = fastdom.write(function () {
              write.call(this$1, this$1[DATA], e);
              delete writes[i];
            });
          }
        });
      }
    },
    created: function created () {
      this[DATA] = {};
      this[FRAMES] = { reads: {}, writes: {} };
      instances.push(this);
    },
    mounted: function mounted () {
      var this$1 = this;
      this._fastdom_ready || ready(function () {
        var hook = this$1.$options.domReady;
        hook && hook.call(this$1);
        this$1._fastdom_ready = true;
        this$1._fastdomUpdate();
      });
      this._fastdomUpdate();
    },
    beforeDestroy: function beforeDestroy () {
      var this$1 = this;
      var index$$1 = instances.indexOf(instances.filter(function (inst) { return inst === this$1; })[0]);
      instances.splice(index$$1, 1);
    }
  };

  var scrollspy = {
    name: 'VkScrollspy',
    abstract: true,
    mixins: [EventsMixin, MixinFastdom],
    props: {
      cls: {
        type: Array,
        default: function () { return []; }
      },
      target: {
        default: false
      },
      hidden: {
        type: Boolean,
        default: true
      },
      offsetTop: {
        type: Number,
        default: 0
      },
      offsetLeft: {
        type: Number,
        default: 0
      },
      repeat: {
        type: Boolean,
        default: false
      },
      delay: {
        type: Number,
        default: 0
      }
    },
    classMapping: {
      inViewClass: 'uk-scrollspy-inview'
    },
    computed: {
      elements: function elements () {
        return this.target ? $$(this.target, this.$el) : [ this.$el ]
      }
    },
    fastdom: [
      {
        write: function write () {
          var ref = this.$options.classMapping;
          var inViewClass = ref.inViewClass;
          if (this.hidden) {
            css(filter(this.elements, (":not(." + inViewClass + ")")), 'visibility', 'hidden');
          }
        }
      },
      {
        read: function read (els) {
          var this$1 = this;
          this.elements.forEach(function (el, i) {
            var elData = els[i];
            if (!elData || elData.el !== el) {
              var cls = data(el, 'vk-scrollspy-class');
              elData = {el: el, toggles: cls && cls.split(',') || this$1.cls};
            }
            elData.show = isInView(el, this$1.offsetTop, this$1.offsetLeft);
            els[i] = elData;
          });
        },
        write: function write (els) {
          var this$1 = this;
          var ref = this.$options.classMapping;
          var inViewClass = ref.inViewClass;
          var index = this.elements.length === 1 ? 1 : 0;
          this.elements.forEach(function (el, i) {
            var elData = els[i];
            var cls = elData.toggles[i] || elData.toggles[0];
            if (elData.show && !elData.inview && !elData.timer) {
              var show = function () {
                css(el, 'visibility', '');
                addClass(el, inViewClass);
                toggleClass(el, cls);
                trigger(el, 'inview');
                this$1.fastdomUpdate();
                elData.inview = true;
                delete elData.timer;
              };
              if (this$1.delay && index) {
                elData.timer = setTimeout(show, this$1.delay * index);
              } else {
                show();
              }
              index++;
            } else if (!elData.show && elData.inview && this$1.repeat) {
              if (elData.timer) {
                clearTimeout(elData.timer);
                delete elData.timer;
              }
              css(el, 'visibility', this$1.hidden ? 'hidden' : '');
              removeClass(el, inViewClass);
              toggleClass(el, cls);
              trigger(el, 'outview');
              this$1.fastdomUpdate();
              elData.inview = false;
            }
          });
        },
        events: ['scroll', 'load', 'resize']
      }
    ],
    render: function render (h) {
      var children = this.$slots.default;
      if (!children) {
        return
      }
      children = filterOutTextNodes(children);
      if (!children.length) {
        return
      }
      if (children.length > 1) {
        warn('[VkScrollspy]: This component can only be applied to a single element', this.$parent);
      }
      return children[0]
    }
  };

  var scrollspyNav = {
    name: 'VkScrollspyNav',
    abstract: true,
    mixins: [EventsMixin, MixinFastdom],
    props: {
      cls: {
        type: String,
        default: 'uk-active'
      },
      closest: {
        type: String,
        default: ''
      },
      overflow: {
        type: Boolean,
        default: true
      },
      offset: {
        type: Number,
        default: 0
      }
    },
    methods: {
      setComputed: function setComputed () {
        this.links = $$('a[href^="#"]', this.$el).filter(function (el) { return el.hash; });
        this.elements = this.closest ? closest(this.links, this.closest) : this.links;
        this.targets = $$(this.links.map(function (el) { return el.hash; }).join(','));
      }
    },
    fastdom: [
      {
        read: function read (data) {
          var this$1 = this;
          var scroll = window.pageYOffset + this.offset + 1;
          var max = height(document) - height(window) + this.offset;
          data.active = false;
          this.targets.every(function (el, i) {
            var ref = offset(el);
            var top = ref.top;
            var last = i + 1 === this$1.targets.length;
            if (!this$1.overflow && (i === 0 && top > scroll || last && top + el.offsetTop < scroll)) {
              return false
            }
            if (!last && offset(this$1.targets[i + 1]).top <= scroll) {
              return true
            }
            if (scroll >= max) {
              for (var j = this$1.targets.length - 1; j > i; j--) {
                if (isInView(this$1.targets[j])) {
                  el = this$1.targets[j];
                  break
                }
              }
            }
            return !(data.active = $(filter(this$1.links, ("[href=\"#" + (el.id) + "\"]"))))
          });
        },
        write: function write (ref) {
          var active = ref.active;
          this.links.forEach(function (el) { return el.blur(); });
          removeClass(this.elements, this.cls);
          if (active) {
            trigger(this.$el, 'active', [active, addClass(this.closest ? closest(active, this.closest) : active, this.cls)]);
          }
        },
        events: ['scroll', 'load', 'resize']
      }
    ],
    mounted: function mounted () {
      this.setComputed();
    },
    updated: function updated () {
      var this$1 = this;
      this.$nextTick(function () {
        this$1.setComputed();
        this$1.fastdomUpdate();
      });
    },
    render: function render (h) {
      var children = this.$slots.default;
      if (!children) {
        return
      }
      children = filterOutTextNodes(children);
      if (!children.length) {
        return
      }
      if (children.length > 1) {
        warn('[VkScrollspyNav]: This component can only be applied to a single element', this.$parent);
      }
      return children[0]
    }
  };

  var Icon$2 = {
    functional: true,
    render: function (h, ctx) {
      var props = ctx.props;
      var ratio = props.ratio || 1;
      var width = props.width || 30;
      var height = props.height || 30;
      var viewBox = props.viewBox || '0 0 30 30';
      if (ratio !== 1) {
        width = width * ratio;
        height = height * ratio;
      }
      return h('svg', {
        attrs: {
          version: '1.1',
          width: width,
          height: height,
          viewBox: viewBox
        },
        domProps: {
          innerHTML: '<circle fill="none" stroke="#000" cx="15" cy="15" r="14"/>'
        }
      })
    }
  };

  var spinner = {
    functional: true,
    props: {
      ratio: {
        type: [String, Number]
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      return h('div', mergeData(data, {
        class: ['uk-icon', 'uk-spinner']
      }), [
        h(Icon$2, { props: props })
      ])
    }
  };

  var ACTIVE = 'active';
  var INACTIVE = 'inactive';

  var sticky = {
    name: 'VkSticky',
    abstract: true,
    mixins: [EventsMixin, MixinFastdom],
    props: {
      top: {
        type: [Number, String],
        default: 0
      },
      bottom: {
        type: [Boolean, String],
        default: false
      },
      offset: {
        type: Number,
        default: 0
      },
      widthElement: {
        default: false
      },
      animation: {
        type: String,
        default: ''
      },
      showOnUp: {
        type: Boolean,
        default: false
      },
      media: {
        type: [Number, String]
      },
      selTarget: {
        type: String
      },
      target: {
        type: [Number, Boolean],
        default: false
      }
    },
    classMapping: {
      clsFixed: 'uk-sticky-fixed',
      clsBelow: 'uk-sticky-below',
      clsActive: 'uk-active',
      clsInactive: ''
    },
    data: function () { return ({
      isActive: false
    }); },
    computed: {
      outerWidth: function outerWidth () {
        return (this.isActive ? this.$refs.placeholder : this.$el).offsetWidth
      },
      outerHeight: function outerHeight () {
        return (this.isActive ? this.$refs.placeholder : this.$el).offsetHeight
      },
      $selTarget: function $selTarget () {
        return this.selTarget
          ? $(this.selTarget, this.$el)
          : this.$el
      }
    },
    fastdom: [
      {
        write: function write () {
          var ref = this.$refs;
          var placeholder = ref.placeholder;
          var widthElement = ref.widthElement;
          css(placeholder, assign(
            {
              width: css(this.$el, 'position') !== 'absolute' ? this.outerWidth : '',
              height: css(this.$el, 'position') !== 'absolute' ? this.outerHeight : ''
            },
            css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'])
          ));
          if (!within(placeholder, document)) {
            after(this.$el, placeholder);
            attr(placeholder, 'hidden', '');
          }
          attr(widthElement, 'hidden', null);
          this.width = widthElement.offsetWidth;
          attr(widthElement, 'hidden', this.isActive ? null : '');
          this.topOffset = offset(this.isActive ? this.$refs.placeholder : this.$el).top;
          this.bottomOffset = this.topOffset + this.outerHeight;
          this.setBoundaries();
          if (this.isActive) {
            this.update();
          }
        },
        events: ['load', 'resize']
      },
      {
        read: function read (_, ref) {
          var scrollY = ref.scrollY; if ( scrollY === void 0 ) scrollY = window.pageYOffset;
          this.scroll = scrollY;
          return {
            scroll: scrollY,
            visible: isVisible(this.$el)
          }
        },
        write: function write (ref, ref$1) {
          var this$1 = this;
          var visible = ref.visible;
          var scroll = ref.scroll;
          if ( ref$1 === void 0 ) ref$1 = {};
          var dir = ref$1.dir;
          this.setBoundaries();
          if (scroll < 0 || !visible || this.disabled || this.showOnUp && !dir) {
            return
          }
          if (this.inactive ||
            scroll < this.stickAt ||
            this.showOnUp && (scroll <= this.stickAt || dir === 'down' || dir === 'up' && !this.isActive && scroll <= this.bottomOffset)
          ) {
            if (!this.isActive) {
              return
            }
            this.isActive = false;
            if (this.animation && scroll > this.topOffset) {
              Animation.cancel(this.$el);
              Animation.out(this.$el, ("uk-animation-" + (this.animation))).then(function () { return this$1.hide(); }, noop);
            } else {
              this.hide();
            }
          } else if (this.isActive) {
            this.update();
          } else if (this.animation) {
            Animation.cancel(this.$el);
            this.show();
            Animation.in(this.$el, ("uk-animation-" + (this.animation))).catch(noop);
          } else {
            this.show();
          }
        },
        events: ['scroll']
      }
    ],
    methods: {
      show: function show () {
        this.isActive = true;
        this.update();
        attr(this.$refs.placeholder, 'hidden', null);
      },
      hide: function hide () {
        var ref = this.$options.classMapping;
        var clsFixed = ref.clsFixed;
        var clsBelow = ref.clsBelow;
        var clsActive = ref.clsActive;
        if (!this.isActive || hasClass(this.$selTarget, clsActive)) {
          this.$emit(INACTIVE);
        }
        removeClass(this.$el, clsFixed, clsBelow);
        css(this.$el, { position: '', top: '', width: '' });
        attr(this.$refs.placeholder, 'hidden', '');
      },
      setBoundaries: function setBoundaries () {
        var bottom = parseProp('bottom', this);
        this.stickAt = Math.max(toFloat(parseProp('top', this)), this.topOffset) - this.offset;
        this.stickUntil = bottom && bottom - this.outerHeight;
        this.inactive = this.media && !window.matchMedia(toMedia(this.media)).matches;
      },
      update: function update () {
        var ref = this.$options.classMapping;
        var clsFixed = ref.clsFixed;
        var clsBelow = ref.clsBelow;
        var clsActive = ref.clsActive;
        var active = this.stickAt !== 0 || this.scroll > this.stickAt;
        var top = Math.max(0, this.offset);
        if (this.stickUntil && this.scroll > this.stickUntil - this.offset) {
          top = this.stickUntil - this.scroll;
        }
        css(this.$el, {
          position: 'fixed',
          top: (top + "px"),
          width: this.width
        });
        if (hasClass(this.$selTarget, clsActive)) {
          if (!active) {
            this.$emit(INACTIVE);
          }
        } else if (active) {
          this.$emit(ACTIVE);
        }
        toggleClass(this.$el, clsBelow, this.scroll > this.bottomOffset);
        addClass(this.$el, clsFixed);
      }
    },
    created: function created () {
      var this$1 = this;
      var ref = this.$options.classMapping;
      var clsActive = ref.clsActive;
      var clsInactive = ref.clsInactive;
      this.$on(ACTIVE, function () { return replaceClass(this$1.$selTarget, clsInactive, clsActive); });
      this.$on(INACTIVE, function () { return replaceClass(this$1.$selTarget, clsActive, clsInactive); });
    },
    mounted: function mounted () {
      addClass(this.$el, 'uk-sticky');
      this.$refs.placeholder = $('<div class="uk-sticky-placeholder"></div>');
      this.$refs.widthElement = (this.widthElement && query(this.widthElement)) || this.$refs.placeholder;
      if (!this.isActive) {
        this.hide();
      }
    },
    domReady: function domReady () {
      var this$1 = this;
      if (!(this.target && location.hash && window.pageYOffset > 0)) {
        return
      }
      var target = $(location.hash);
      if (target) {
        fastdom.read(function () {
          var ref = offset(target);
          var top = ref.top;
          var elTop = offset(this$1.$el).top;
          var elHeight = this$1.$el.offsetHeight;
          if (elTop + elHeight >= top && elTop <= top + target.offsetHeight) {
            window.scrollTo(0, top - elHeight - this$1.target - this$1.offset);
          }
        });
      }
    },
    beforeDestroy: function beforeDestroy () {
      var ref = this.$options.classMapping;
      var clsInactive = ref.clsInactive;
      if (this.isActive) {
        this.isActive = false;
        this.hide();
        removeClass(this.$selTarget, clsInactive);
      }
      remove(this.$refs.placeholder);
      this.$refs.placeholder = null;
      this.$refs.widthElement = null;
    },
    render: function render (h) {
      var children = this.$slots.default;
      if (!children) {
        return
      }
      children = filterOutTextNodes(children);
      if (!children.length) {
        return
      }
      if (children.length > 1) {
        warn('[VkSticky]: This component can only be applied to a single element', this.$parent);
      }
      return children[0]
    }
  };
  function parseProp (prop, ref) {
    var $props = ref.$props;
    var $el = ref.$el;
    var propOffset = ref[(prop + "Offset")];
    var value = $props[prop];
    value = isString$1(value) && value === ''
      ? true
      : value;
    if (!value) {
      return
    }
    if (isNumeric(value)) {
      return propOffset + toFloat(value)
    } else if (isString$1(value) && /^-?\d+vh$/.test(value)) {
      return height(window) * toFloat(value) / 100
    } else {
      var el = value === true ? $el.parentNode : query(value, $el);
      if (el) {
        return offset(el).top + el.offsetHeight
      }
    }
  }

  var ElSubnav = {
    functional: true,
    props: {
      divided: {
        type: Boolean,
        default: false
      },
      pill: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var divided = props.divided;
      var pill = props.pill;
      return h('ul', mergeData(data, {
        class: ['uk-subnav', {
          'uk-subnav-divider': divided,
          'uk-subnav-pill': pill
        }]
      }), children)
    }
  };

  var ElSubnavItem = {
    functional: true,
    props: {
      title: {
        type: String,
        required: true
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    render: function (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var listeners = ref.listeners;
      var title = props.title;
      var active = props.active;
      var disabled = props.disabled;
      delete data.on;
      return h('li', mergeData(data, {
        class: {
          'uk-active': active && !disabled,
          'uk-disabled': disabled
        }
      }), [ disabled
        ? h('span', title)
        : h('a', { on: listeners }, title)
      ])
    }
  };

  var triangleDown = {
    functional: true,
    props: {
      ratio: {
        type: [Number, String],
        default: 1
      }
    },
    render: function (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var ratio = props.ratio;
      var ref$1 = (data.attrs || {});
      var width = ref$1.width; if ( width === void 0 ) { width = 20; }
      var height = ref$1.height; if ( height === void 0 ) { height = 20; }
      var viewBox = ref$1.viewBox; if ( viewBox === void 0 ) { viewBox = '0 0 20 20'; }
      if (ratio !== 1) {
        width *= ratio;
        height *= ratio;
      }
      data.attrs = {
        version: '1.1',
        meta: 'vk-icons-triangle-down',
        width: width,
        height: height,
        viewBox: viewBox,
        ratio: ratio
      };
      data.domProps = {
        innerHTML: '<polygon points="5 7 15 7 10 12" />'
      };
      return h('svg', data)
    }
  };
  var triangleDown_1 = triangleDown;

  var ElSubnavItemDropdown = {
    functional: true,
    props: {
      title: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var disabled = props.disabled;
      var title = props.title;
      return h('li', mergeData(data, {
        class: {
          'uk-disabled': disabled
        }
      }), [
        disabled
          ? [ h('span', title) ]
          : [
            h('a', { class: 'uk-icon' }, [
              title + ' ',
              h(triangleDown_1)
            ]),
            children
          ]
      ])
    }
  };

  var subnav = {
    name: 'VkSubnav',
    props: assign({}, ElSubnav.props, {
      activeItem: {}
    }),
    data: function (vm) { return ({
      state: {
        activeItem: vm.activeItem || filterItems(vm).shift().data.key || 0
      }
    }); },
    computed: {
      items: function items () {
        return (this.$slots.default || []).filter(function (n) { return n.tag; })
      }
    },
    watch: {
      activeItem: function activeItem (val) {
        this.state.activeItem = val;
      }
    },
    methods: {
      triggerUpdate: function triggerUpdate (val) {
        this.state.activeItem = val;
        this.$emit('update:activeItem', val);
      }
    },
    render: function render (h) {
      var this$1 = this;
      return h(ElSubnav, {
        props: this.$props
      }, filterItems(this).map(function (node, index) {
        if (!node.fnOptions) {
          warn('[VkSubvnav]: the child components must be functional.', this$1);
        }
        var key = get(node, 'data.key', index);
        return node.data.rerender
          ? h(node.fnOptions, mergeData({}, node.data, {
            key: key,
            rerendering: true,
            props: {
              active: JSON.stringify(key) === JSON.stringify(this$1.state.activeItem)
            }
          }), node.children)
          : node
      }))
    }
  };
  function filterItems (vm) {
    return vm.$slots.default.filter(function (n) { return n.tag; })
  }

  var subnav_Item = {
    name: 'VkSubnavItem',
    functional: true,
    props: ElSubnavItem.props,
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var parent = ref.parent;
      if (data.rerendering) {
        delete data.class;
      }
      return h(ElSubnavItem, mergeData(data, { props: props }, {
        rerender: true,
        on: {
          click: function (e) {
            e.preventDefault();
            parent.triggerUpdate(data.key);
          }
        }
      }))
    }
  };

  var subnav_ItemDropdown = {
    functional: true,
    name: 'VkSubnavItemDropdown',
    props: assign({}, ElSubnavItemDropdown.props, Dropdown.props, {
      mode: {
        type: String,
        default: 'click'
      }
    }),
    render: function render (h, ref) {
      var props = ref.props;
      var children = ref.children;
      return h(ElSubnavItemDropdown, { props: props }, [
        h(Dropdown, { props: props }, children)
      ])
    }
  };

  var subnav_ItemDropdownNav = {
    functional: true,
    name: 'VkSubnavItemDropdown',
    props: assign({}, ElSubnavItemDropdown.props, DropdownNav.props, {
      mode: {
        type: String,
        default: 'click'
      }
    }),
    render: function render (h, ref) {
      var props = ref.props;
      var children = ref.children;
      return h(ElSubnavItemDropdown, { props: props }, [
        h(DropdownNav, { props: props }, children)
      ])
    }
  };

  function select$1 (selection, items) {
    return selection.concat( toArray(items))
  }
  function unselect (selection, items) {
    selection = [].concat( selection );
    toArray(items).forEach(function (item) { return selection.splice(selection.indexOf(item), 1); }
    );
    return selection
  }
  function isSelected (selection, items) {
    return toArray(items).every(function (item) { return includes(selection, item); })
  }
  function toArray (obj) {
    return isArray(obj) ? obj : [obj]
  }

  var ElTable = {
    functional: true,
    props: {
      narrowed: {
        type: Boolean,
        default: false
      },
      enlarged: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      hoverable: {
        type: Boolean,
        default: false
      },
      divided: {
        type: Boolean,
        default: false
      },
      justified: {
        type: Boolean,
        default: false
      },
      middleAligned: {
        type: Boolean,
        default: false
      },
      responsive: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      return h('table', mergeData(data, {
        class: ['uk-table', {
          'uk-table-hover': props.hoverable,
          'uk-table-divider': props.divided,
          'uk-table-striped': props.striped,
          'uk-table-justify': props.justified,
          'uk-table-middle': props.middleAligned,
          'uk-table-responsive': props.responsive,
          'uk-table-small': props.narrowed && !props.enlarged,
          'uk-table-large': props.enlarged && !props.narrowed
        }]
      }), children)
    }
  };

  var tableTr = {
    functional: true,
    props: {
      active: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      var active = props.active;
      return h('tr', mergeData(data, {
        class: {
          'uk-active': active
        }
      }), children)
    }
  };

  var ElTableTh = {
    functional: true,
    props: {
      align: {
        type: String,
        default: 'left',
        validator: function (val) { return /(left|center|right)/.test(val); }
      },
      alignVertical: {
        type: String,
        default: '',
        validator: function (val) { return !val || /(middle)/.test(val); }
      },
      width: {
        type: String,
        default: '',
        validator: function (val) { return !val || /(shrinked|expanded|small|medium|large)/.test(val); }
      }
    },
    render: function render (h, ref) {
      var obj;
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      var width = props.width;
      var align = props.align;
      var alignVertical = props.alignVertical;
      return h('th', mergeData(data, {
        class: ( obj = {
          'uk-table-shrink': width === 'shrinked',
          'uk-table-expand': width === 'expanded',
          'uk-table-middle': alignVertical === 'middle'
        }, obj[("uk-text-" + align)] = /(right|center)/.test(align), obj[("uk-width-" + width)] = /(small|medium|large)/.test(width), obj )
      }), children)
    }
  };

  var ElTableTd = {
    functional: true,
    props: {
      align: {
        type: String,
        default: 'left',
        validator: function (val) { return /(left|center|right)/.test(val); }
      },
      alignVertical: {
        type: String,
        default: '',
        validator: function (val) { return !val || /(middle)/.test(val); }
      },
      width: {
        type: String,
        default: '',
        validator: function (val) { return !val || /(shrinked|expanded|small|medium|large)/.test(val); }
      },
      linked: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var obj;
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;
      var width = props.width;
      var linked = props.linked;
      var align = props.align;
      var alignVertical = props.alignVertical;
      return h('td', mergeData(data, {
        class: ( obj = {
          'uk-table-link': linked,
          'uk-table-shrink': width === 'shrinked',
          'uk-table-expand': width === 'expanded',
          'uk-table-middle': alignVertical === 'middle'
        }, obj[("uk-text-" + align)] = /(right|center)/.test(align), obj[("uk-width-" + width)] = /(small|medium|large)/.test(width), obj )
      }), children)
    }
  };



  var elements$3 = /*#__PURE__*/Object.freeze({
    ElTable: ElTable,
    ElTableTr: tableTr,
    ElTableTh: ElTableTh,
    ElTableTd: ElTableTd
  });

  var core$3 = {
    props: assign({}, ElTable.props, {
      data: {
        type: Array,
        required: true
      }
    })
  };

  var mixinSelect = {
    props: {
      selectedRows: {
        type: Array,
        default: function () { return []; }
      }
    },
    methods: {
      getSelectionRowId: function getSelectionRowId (row) {
        return row['id']
      },
      selectRow: function selectRow (row) {
        this.updateRowSelection(
          select$1(this.selectedRows, this.getSelectionRowId(row))
        );
      },
      unselectRow: function unselectRow (row) {
        this.updateRowSelection(
          unselect(this.selectedRows, this.getSelectionRowId(row))
        );
      },
      toggleRowSelection: function toggleRowSelection (row) {
        this.isRowSelected(row) ? this.unselectRow(row) : this.selectRow(row);
      },
      toggleRowsSelection: function toggleRowsSelection () {
        var this$1 = this;
        var selectedRows = [];
        if (!this.allRowsSelected) {
          selectedRows = this.data.map(function (row) { return this$1.getSelectionRowId(row); });
        }
        this.updateRowSelection(selectedRows);
      },
      isRowSelected: function isRowSelected (row) {
        return isSelected(this.selectedRows, this.getSelectionRowId(row))
      },
      updateRowSelection: function updateRowSelection (selectedRows) {
        this.$emit('update:selectedRows', selectedRows);
      }
    },
    computed: {
      allRowsSelected: function allRowsSelected () {
        if (this.selectedRows.length < this.data.length) {
          return false
        }
        var selected = this.data.filter(this.isRowSelected);
        return selected.length === this.data.length
      }
    }
  };

  var script$7 = {
    name: 'VkTable',
    extends: core$3,
    components: assign({}, elements$3),
    mixins: [mixinSelect, mixinProps],
    props: {
      divided: {
        default: true
      },
      rowClass: {
        type: Function
      },
      headless: {
        type: Boolean,
        default: false
      },
      selectable: {
        type: [Boolean, String],
        default: false,
        validator: function (v) { return !v || /single/.test(v) || v === true; }
      }
    },
    computed: {
      columns: {
        get: function get$$1 () {
          return (this.$slots.default || []).filter(function (n) { return n.tag; }).map(this.mapColumnNode)
        },
        cache: false
      }
    },
    methods: {
      selectRow: function selectRow (row) {
        if (!this.selectable) {
          return
        }
        var id = this.getSelectionRowId(row);
        this.updateRowSelection(this.selectable === 'single'
          ? [id]
          : select$1(this.selectedRows, id)
        );
      },
      resolveRowClass: function resolveRowClass (row) {
        return isFunction(this.rowClass)
          ? this.rowClass(row)
          : this.rowClass
      },
      onRowClick: function onRowClick (e, row) {
        var isIgnoredTag = function (tag) { return /^(A|BUTTON)$/.test(tag); };
        if (!isIgnoredTag(e.target.tagName)) {
          this.toggleRowSelection(row);
        }
      },
      mapColumnNode: function mapColumnNode (node) {
        var data = node.data || {};
        var headRender = get(node, 'fnOptions.headRender');
        var cellRender = get(node, 'fnOptions.cellRender');
        if (!headRender) {
          warn(("[Vuikit Table]: The Column defined by " + (node.tag) + " component has not set a headRender"), this);
        }
        if (!cellRender) {
          warn(("[Vuikit Table]: The Column defined by " + (node.tag) + " component has not set a cellRender"), this);
        }
        return {
          props: data.props || {},
          slots: {
            static: data.staticSlots || {},
            scoped: data.scopedSlots || {}
          },
          headRender: headRender,
          cellRender: cellRender
        }
      }
    }
  };

  /* script */
              var __vue_script__$7 = script$7;
              
  /* template */
  var __vue_render__$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ElTable",
      _vm._b({}, "ElTable", _vm.pickComponentProps(_vm.$props, "ElTable"), false),
      [
        !_vm.headless
          ? _c(
              "thead",
              [
                _c(
                  "ElTableTr",
                  _vm._l(_vm.columns, function(col, i) {
                    return _c(
                      "ElTableTh",
                      _vm._b(
                        { key: i },
                        "ElTableTh",
                        _vm.pickComponentProps(col.props, "ElTableTh"),
                        false
                      ),
                      [
                        _c(
                          { functional: true, render: col.headRender },
                          _vm._b(
                            { tag: "component" },
                            "component",
                            col.props,
                            false
                          )
                        )
                      ],
                      1
                    )
                  })
                )
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "tbody",
          _vm._l(_vm.data, function(row, rowIndex) {
            return _c(
              "ElTableTr",
              {
                key: rowIndex,
                class: _vm.resolveRowClass(row),
                attrs: { active: _vm.isRowSelected(row) },
                on: {
                  click: function($event) {
                    _vm.onRowClick($event, row);
                  }
                }
              },
              _vm._l(_vm.columns, function(col, colIndex) {
                return _c(
                  "ElTableTd",
                  _vm._b(
                    { key: colIndex },
                    "ElTableTd",
                    _vm.pickComponentProps(col.props, "ElTableTd"),
                    false
                  ),
                  [
                    _c(
                      { functional: true, render: col.cellRender },
                      _vm._b(
                        {
                          tag: "component",
                          attrs: { row: row, slots: col.slots }
                        },
                        "component",
                        col.props,
                        false
                      )
                    )
                  ],
                  1
                )
              })
            )
          })
        )
      ]
    )
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;

    /* style */
    var __vue_inject_styles__$7 = undefined;
    /* scoped */
    var __vue_scope_id__$7 = undefined;
    /* module identifier */
    var __vue_module_identifier__$7 = undefined;
    /* functional template */
    var __vue_is_functional_template__$7 = false;
    /* component normalizer */
    function __vue_normalize__$7(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      {
        component.__file = "/Users/miljan/repos/@vuikit/vuikit-next/packages/vuikit/src/table/components/table.vue";
      }

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    function __vue_create_injector__$7() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$7.styles || (__vue_create_injector__$7.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var table = __vue_normalize__$7(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      __vue_create_injector__$7,
      undefined
    );

  var script$8 = {
    functional: true,
    name: 'VkTableColumn',
    props: assign({}, ElTableTh.props, ElTableTd.props, {
      head: String,
      cell: [String, Function]
    }),
    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var slots = ref.slots;
      data.staticSlots = slots();
      return h('div', mergeData({}, data, { props: props }))
    },
    headRender: function headRender (h, ref) {
      var props = ref.props;
      return [props.head]
    },
    cellRender: function cellRender (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var cell = props.cell;
      var row = props.row;
      var slots = props.slots; if ( slots === void 0 ) slots = { static: {}, scoped: {} };
      var cellValue = resolveCellValue(row, cell);
      var isEmpty = !isUndefined(cell) && isUndefined(cellValue);
      var scope = { value: cellValue, row: row };
      var defaultSlot = slots.static.default
        ? function () { return slots.static.default; }
        : slots.scoped.default || (function () { return cellValue; });
      var emptySlot = slots.static.empty
        ? function () { return slots.static.empty; }
        : slots.scoped.empty;
      return [
        isEmpty && emptySlot
          ? emptySlot(scope)
          : defaultSlot(scope)
      ]
    }
  };
  function resolveCellValue (row, cell) {
    return isFunction(cell)
      ? cell(row)
      : get(row, cell)
  }

  /* script */
              var __vue_script__$8 = script$8;
              
  /* template */

    /* style */
    var __vue_inject_styles__$8 = undefined;
    /* scoped */
    var __vue_scope_id__$8 = undefined;
    /* module identifier */
    var __vue_module_identifier__$8 = undefined;
    /* functional template */
    var __vue_is_functional_template__$8 = undefined;
    /* component normalizer */
    function __vue_normalize__$8(
      template, style, script,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script === 'function' ? script.options : script) || {};

      {
        component.__file = "/Users/miljan/repos/@vuikit/vuikit-next/packages/vuikit/src/table/components/column.vue";
      }

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    function __vue_create_injector__$8() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__$8.styles || (__vue_create_injector__$8.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var column = __vue_normalize__$8(
      {},
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      __vue_create_injector__$8,
      undefined
    );

  var TAB_ID = '__vkTabs_id';

  var core$4 = {
    props: {
      activeTab: {},
      animation: {
        type: String,
        default: ''
      },
      keepAlive: {
        type: Boolean,
        default: false
      }
    },
    data: function (vm) { return ({
      state: {
        activeTab: vm.activeTab || filterTabs(vm).shift().data.key || 0
      }
    }); },
    watch: {
      activeTab: function activeTab (val) {
        this.state.activeTab = val;
      }
    },
    computed: {
      activeTabContent: {
        get: function get$$1 () {
          var this$1 = this;
          return filterTabs(this).filter(function (node) { return this$1.isActive(node.data[TAB_ID]); })[0]
        },
        cache: false
      }
    },
    methods: {
      getTabs: function getTabs () {
        var this$1 = this;
        return filterTabs(this)
          .filter(function (node, index) {
            if (!node.componentOptions) {
              {
                warn(("[VkTabs]: failed to process '" + (node.tag) + "', it must be a stateful component."), this$1);
              }
              return false
            }
            node.key = get(node, 'data.key', index);
            node.data[TAB_ID] = node.key;
            return true
          })
      },
      setActiveTab: function setActiveTab (id) {
        this.state.activeTab = id;
        this.$emit('update:activeTab', id);
      },
      isActive: function isActive (id) {
        return JSON.stringify(this.state.activeTab) === JSON.stringify(id)
      }
    }
  };
  function filterTabs (vm) {
    return vm.$slots.default.filter(function (n) { return n.tag; })
  }

  var ElTabs = {
    functional: true,
    props: {
      align: {
        type: String,
        default: 'left',
        validator: function (val) { return !val || /^(left|right|center|justify)$/.test(val); }
      },
      flipped: {
        type: Boolean,
        default: false
      }
    },
    render: function (h, ref) {
      var obj;
      var children = ref.children;
      var props = ref.props;
      var data = ref.data;
      var align = props.align;
      var flipped = props.flipped;
      return h('ul', mergeData(data, {
        class: ['uk-tab', ( obj = {
          'uk-tab-bottom': flipped,
          'uk-child-width-expand': align === 'justify'
        }, obj[("uk-flex-" + align)] = /^(right|center)$/.test(align), obj )]
      }), children)
    }
  };

  var ElTabsVertical = {
    functional: true,
    props: {
      align: {
        type: String,
        default: 'left',
        validator: function (val) { return !val || /^(left|right)$/.test(val); }
      }
    },
    render: function (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var children = ref.children;
      var align = props.align;
      return h('ul', mergeData(data, {
        class: ['uk-tab', ("uk-tab-" + align)]
      }), children)
    }
  };

  var ElIcon$6 = ElIcon;
  var ElTabsItem = {
    functional: true,
    props: {
      title: {
        type: String,
        required: true
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    render: function render (h, ref) {
      var props = ref.props;
      var data = ref.data;
      var listeners = ref.listeners;
      var slots = ref.slots;
      var _slots = slots();
      var active = props.active;
      var disabled = props.disabled;
      var title = props.title;
      delete data.on;
      return h('li', mergeData(data, {
        class: {
          'uk-active': active && !disabled,
          'uk-disabled': disabled
        }
      }), [
        h('a', { on: listeners }, [
          title,
          _slots.icon && h(ElIcon$6, {
            class: 'uk-margin-small-left'
          }, [ _slots.icon ])
        ]),
        _slots.default
      ])
    }
  };

  var tabs = {
    name: 'VkTabs',
    extends: core$4,
    mixins: [EventsMixin],
    props: ElTabs.props,
    render: function render (h) {
      var this$1 = this;
      var ref = this;
      var flipped = ref.flipped;
      var animation = ref.animation;
      var keepAlive = ref.keepAlive;
      var $props = ref.$props;
      var Tabs = this.getTabs();
      Tabs = Tabs.map(function (node, index) {
        var obj;
        var Tab = {
          functional: true,
          render: node.componentOptions.Ctor.options.tabRender
        };
        return h(Tab, ( obj = {}, obj[TAB_ID] = node.data[TAB_ID], obj.props = assign({}, node.componentOptions.propsData, {
            active: this$1.isActive(node.data[TAB_ID])
          }), obj ))
      });
      return h('div', {
        class: {
          'uk-flex uk-flex-column-reverse': flipped
        }
      }, [
        h(ElTabs, { props: $props }, Tabs),
        h('div', {
          class: { 'uk-margin': flipped }
        }, [
          h(Transition$1, {
            props: { name: animation }
          }, [
            keepAlive
              ? h('keep-alive', [ this.activeTabContent ])
              : this.activeTabContent
          ])
        ])
      ])
    }
  };

  var tabsVertical = {
    name: 'VkTabsVertical',
    extends: core$4,
    props: ElTabsVertical.props,
    render: function render (h) {
      var this$1 = this;
      var ref = this;
      var align = ref.align;
      var animation = ref.animation;
      var keepAlive = ref.keepAlive;
      var $props = ref.$props;
      var Tabs = this.getTabs().map(function (node, index) {
        var obj;
        var Tab = {
          functional: true,
          render: node.componentOptions.Ctor.options.tabRender
        };
        return h(Tab, ( obj = {}, obj[TAB_ID] = node.data[TAB_ID], obj.props = assign({}, node.componentOptions.propsData, {
            active: this$1.isActive(node.data[TAB_ID])
          }), obj ))
      });
      return h('div', {
        class: ['uk-grid', {
          'uk-flex uk-flex-row-reverse': align === 'right'
        }]
      }, [
        h('div', { class: 'uk-width-auto' }, [
          h(ElTabsVertical, { props: $props }, Tabs)
        ]),
        h('div', { class: 'uk-width-expand' }, [
          h(Transition$1, {
            props: { name: animation }
          }, [
            keepAlive
              ? h('keep-alive', [ this.activeTabContent ])
              : this.activeTabContent
          ])
        ])
      ])
    }
  };

  var tabs_Item = {
    name: 'VkTabsItem',
    props: assign({}, core.props, {
      icon: { required: false }
    }, ElTabsItem.props),
    render: function render (h) {
      return h('div', this.$slots.default)
    },
    tabRender: function tabRender (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children; if ( children === void 0 ) children = [];
      var parent = ref.parent;
      return h(ElTabsItem, mergeData(data, {
        props: props,
        on: {
          click: function (e) {
            e.preventDefault();
            parent.setActiveTab(data[TAB_ID]);
          }
        }
      }), [
        props.icon && h(core, { props: props, slot: 'icon' }) ].concat( children
      ))
    }
  };



  var components = /*#__PURE__*/Object.freeze({
    Breadcrumb: breadcrumb,
    BreadcrumbItem: breadcrumb_Item,
    Button: ElButton,
    ButtonLink: buttonLink,
    ButtonGroup: buttonGroup,
    Card: card$1,
    CardTitle: card_Title,
    CardBadge: card_Badge,
    CardHeader: card_Header,
    CardBody: card_Body,
    CardFooter: card_Footer,
    CardMedia: card_Media,
    CardMediaTop: card_MediaTop,
    CardMediaBottom: card_MediaBottom,
    Drop: Drop,
    Dropdown: Dropdown,
    DropdownNav: DropdownNav,
    Input: input,
    Range: range,
    Radio: radio,
    Checkbox: checkbox,
    Textarea: textarea,
    Select: select,
    Legend: legend,
    Fieldset: fieldset,
    FormIcon: formIcon,
    FormIconLink: formIconLink,
    FormStacked: formStacked,
    FormHorizontal: formHorizontal,
    FormLabel: formLabel,
    FormControls: formControls,
    Grid: Grid,
    Icon: icon,
    IconLink: iconLink,
    IconButton: iconButton,
    IconImage: iconImage,
    Iconnav: iconnav,
    IconnavVertical: iconnavVertical,
    IconnavItem: iconnav_Item,
    Label: label,
    List: list,
    Modal: modal,
    ModalFull: modalFull$1,
    ModalTitle: modal_Title,
    ModalClose: modal_Close,
    Nav: nav$2,
    NavItem: navItem,
    NavItemParent: navItemParent,
    NavItemHeader: navItemHeader,
    NavItemDivider: navItemDivider,
    NavbarDropbar: navbarDropbar,
    NavbarNavItem: navbar_Nav_Item,
    NavbarNavDropdown: navbar_Nav_Dropdown,
    Navbar: navbar,
    NavbarFull: navbarFull,
    NavbarToggle: navbar_Toggle,
    NavbarNav: navbar_Nav,
    NavbarNavDropdownNav: navbar_Nav_DropdownNav,
    NavbarLogo: navbar_Logo,
    NavbarLogoLink: navbar_LogoLink,
    NavbarItem: navbar_Item,
    Notification: notification,
    Offcanvas: Offcanvas,
    OffcanvasPush: offcanvasPush,
    OffcanvasSlide: offcanvasSlide,
    OffcanvasReveal: offcanvasReveal,
    OffcanvasClose: offcanvas_Close,
    OffcanvasContent: offcanvasContent,
    Pagination: pagination,
    PaginationPages: pagination_Pages,
    PaginationPageFirst: pagination_PageFirst,
    PaginationPagePrev: pagination_PagePrev,
    PaginationPageNext: pagination_PageNext,
    PaginationPageLast: pagination_PageLast,
    Scrollspy: scrollspy,
    ScrollspyNav: scrollspyNav,
    Spinner: spinner,
    Sticky: sticky,
    Subnav: subnav,
    SubnavItem: subnav_Item,
    SubnavItemDropdown: subnav_ItemDropdown,
    SubnavItemDropdownNav: subnav_ItemDropdownNav,
    Table: table,
    TableColumn: column,
    Tabs: tabs,
    TabsVertical: tabsVertical,
    TabsItem: tabs_Item
  });

  function getOptions$2 (ctx) {
    var ref = ctx.binding;
    var value = ref.value;
    var modifiers = ref.modifiers;
    if (isString$1(value)) {
      value = { target: value };
    }
    return assign({
      offset: 0,
      target: 'a',
      force: false,
      duration: 1000
    }, modifiers, value)
  }
  function matches$1 (el, target, selector) {
    var matches = $$(("" + selector), el);
    var i = matches.length;
    while (--i >= 0 && matches[i] !== target) {}
    return i > -1
  }

  var NAMESPACE$2 = '__vkScroll';
  var directive = {
    bind: function bind (el, binding, vnode) {
      el[NAMESPACE$2] = {};
    },
    inserted: function inserted (el, binding, vnode) {
      el[NAMESPACE$2].options = getOptions$2({ binding: binding, vnode: vnode });
      el[NAMESPACE$2].unbind = on(el, 'click', function (e) {
        var opts = el[NAMESPACE$2].options;
        var isAnchor = e.target.nodeName === 'A';
        if (!isAnchor || (e.defaultPrevented && !opts.force)) {
          return
        }
        if (e.target === el || matches$1(el, e.target, opts.target)) {
          e.preventDefault();
          scrollTo(el, e.target, escape(e.target.hash).substr(1), opts);
        }
      });
    },
    componentUpdated: function componentUpdated (el, binding, vnode) {
      el[NAMESPACE$2].options = getOptions$2({ binding: binding, vnode: vnode });
    },
    unbind: function unbind (el) {
      if (!el[NAMESPACE$2]) {
        return
      }
      el[NAMESPACE$2].unbind();
      delete el[NAMESPACE$2];
    }
  };

  var NAMESPACE$3 = '__vkHeightViewport';

  function bindEvents (el) {
    var events = [
      on(el, ("focus " + pointerEnter + " " + pointerDown), function (e) {
        if (e.type !== pointerDown || !isTouch(e)) {
          show(el);
        }
      }),
      on(el, 'blur', function (e) { return hide(el); }),
      on(el, pointerLeave, function (e) {
        if (!isTouch(e)) {
          hide(el);
        }
      })
    ];
    el[NAMESPACE$3].unbindEvents = function () { return events.forEach(function (unbind) { return unbind(); }); };
  }
  function toggleIn (el) {
    if (!el[NAMESPACE$3]) {
      return
    }
    var ref = el[NAMESPACE$3].options;
    var cls = ref.cls;
    var position$$1 = ref.position;
    var animation = ref.animation;
    var duration = ref.duration;
    if (!trigger(el, 'beforeShow')) {
      return Promise.reject()
    }
    var origin = el[NAMESPACE$3].origin = getOrigin(position$$1);
    var tooltip = el[NAMESPACE$3].tooltip = createTooltip(el);
    positionTooltip(el);
    addClass(tooltip, cls);
    el[NAMESPACE$3].hideTimer = setInterval(function () {
      if (!isVisible(el)) {
        hide(el);
      }
    }, 150);
    el[NAMESPACE$3].state = 'in';
    trigger(el, 'show');
    return Animation
      .in(tooltip, ("uk-animation-" + (animation[0])), duration, origin)
      .then(function () {
        el[NAMESPACE$3].state = 'active';
        trigger(el, 'shown');
      })
      .catch(function () {})
  }
  function toggleOut (el) {
    if (!el[NAMESPACE$3]) {
      return
    }
    var ref = el[NAMESPACE$3];
    var tooltip = ref.tooltip;
    var ref$1 = el[NAMESPACE$3].options;
    var animation = ref$1.animation;
    var duration = ref$1.duration;
    if (!trigger(el, 'beforeHide')) {
      return Promise.reject()
    }
    Animation.cancel(tooltip);
    el[NAMESPACE$3].state = 'out';
    trigger(el, 'hide');
    if (!animation[1]) {
      return Promise.resolve().then(function () { return _hide(el); })
    }
    return Animation
      .out(tooltip, ("uk-animation-" + (animation[1])), duration, origin)
      .then(function () { return _hide(el); })
      .catch(function () {})
  }
  function show (el) {
    if (!el[NAMESPACE$3]) {
      return
    }
    var ref = el[NAMESPACE$3].options;
    var delay = ref.delay;
    var ref$1 = el[NAMESPACE$3];
    var state = ref$1.state;
    var title = ref$1.title;
    if (!title || state === 'active' || el[NAMESPACE$3].showTimer) {
      return
    }
    if (state === 'out') {
      Animation.cancel(el);
      _hide(el);
    }
    el[NAMESPACE$3].showTimer = setTimeout(function () { return toggleIn(el); }, delay);
  }
  function hide (el) {
    if (!el[NAMESPACE$3]) {
      return
    }
    var ref = el[NAMESPACE$3];
    var state = ref.state;
    clearAllTimers(el);
    if (state === 'out' || (matches(el, 'input') && isFocused(el))) {
      return
    }
    toggleOut(el);
  }
  function _hide (el) {
    if (!el[NAMESPACE$3]) {
      return
    }
    var ref = el[NAMESPACE$3];
    var tooltip = ref.tooltip;
    var ref$1 = el[NAMESPACE$3].options;
    var cls = ref$1.cls;
    attr(el, 'aria-expanded', false);
    removeClass(tooltip, cls);
    tooltip && remove(tooltip);
    el[NAMESPACE$3].state = null;
    el[NAMESPACE$3].tooltip = null;
    trigger(el, 'hidden');
  }
  function clearAllTimers (el) {
    clearTimeout(el[NAMESPACE$3].showTimer);
    clearTimeout(el[NAMESPACE$3].hideTimer);
    el[NAMESPACE$3].showTimer = null;
    el[NAMESPACE$3].hideTimer = null;
  }
  function positionTooltip (el) {
    var target = el;
    var ref = el[NAMESPACE$3];
    var tooltip = ref.tooltip;
    var ref$1 = el[NAMESPACE$3].options;
    var clsPos = ref$1.clsPos;
    var position$$1 = ref$1.position;
    var ref$2 = el[NAMESPACE$3].options;
    var offset$$1 = ref$2.offset;
    var node;
    var ref$3 = position$$1.split('-');
    var dir = ref$3[0];
    var align = ref$3[1]; if ( align === void 0 ) align = 'center';
    removeClasses(tooltip, (clsPos + "-(top|bottom|left|right)(-[a-z]+)?"));
    css(tooltip, { top: '', left: '' });
    var axis = getAxis$1(position$$1);
    offset$$1 = isNumeric(offset$$1)
      ? offset$$1
      : (node = $(offset$$1))
        ? offset(node)[axis === 'x' ? 'left' : 'top'] - offset(target)[axis === 'x' ? 'right' : 'bottom']
        : 0;
    var elAttach = axis === 'x'
      ? ((flipPosition(dir)) + " " + align)
      : (align + " " + (flipPosition(dir)));
    var targetAttach = axis === 'x'
      ? (dir + " " + align)
      : (align + " " + dir);
    var elOffset = axis === 'x'
      ? ("" + (dir === 'left' ? -1 * offset$$1 : offset$$1))
      : ("" + (dir === 'top' ? -1 * offset$$1 : offset$$1));
    var targetOffset = null;
    var ref$4 = positionAt(
      tooltip,
      target,
      elAttach,
      targetAttach,
      elOffset,
      targetOffset,
      true
    ).target;
    var x = ref$4.x;
    var y = ref$4.y;
    dir = axis === 'x' ? x : y;
    align = axis === 'x' ? y : x;
    toggleClass(tooltip, (clsPos + "-" + dir + "-" + align), el[NAMESPACE$3].options.offset === false);
    return {
      dir: dir,
      align: align
    }
  }
  function getOptions$3 (ctx) {
    var ref = ctx.binding;
    var value = ref.value;
    var modifiers = ref.modifiers;
    if (isString$1(value)) {
      value = { title: value };
    }
    if (Object.keys(modifiers).length) {
      var firstKey = Object.keys(modifiers)[0];
      modifiers = { position: firstKey };
    }
    var options = assign({
      delay: 0,
      title: '',
      offset: false,
      duration: 100,
      position: 'top',
      container: true,
      cls: 'uk-active',
      clsPos: 'uk-tooltip',
      animation: 'scale-up'
    }, modifiers, value);
    options.position = hyphenate(options.position);
    options.animation = options.animation.split(' ');
    {
      var pos = options.position;
      if (!(/^(top|bottom)-(left|right)$/.test(pos) || /^(top|bottom|left|right)$/.test(pos))) {
        warn(("[VkTooltip]: Invalid position: '" + pos + "'."), ctx.vnode);
      }
    }
    return options
  }
  function getAxis$1 (position$$1) {
    var ref = position$$1.split('-');
    var dir = ref[0];
    return dir === 'top' || dir === 'bottom' ? 'y' : 'x'
  }
  function getContainer (el) {
    var ref = el[NAMESPACE$3];
    var vnode = ref.vnode;
    var ref$1 = el[NAMESPACE$3].options;
    var container = ref$1.container;
    return (container === true && vnode.context.$root.$el) || (container && $(container))
  }
  function createTooltip (el) {
    var ref = el[NAMESPACE$3];
    var title = ref.title;
    var ref$1 = el[NAMESPACE$3].options;
    var clsPos = ref$1.clsPos;
    return append(getContainer(el), ("<div class=\"" + clsPos + "\" aria-hidden>\n    <div class=\"" + clsPos + "-inner\">" + title + "</div>\n  </div>"))
  }
  function getOrigin (position$$1) {
    var dir = position$$1[0];
    var align = position$$1[1];
    return getAxis$1(position$$1) === 'y'
      ? ((flipPosition(dir)) + "-" + align)
      : (align + "-" + (flipPosition(dir)))
  }
  function isFocused (el) {
    return el === document.activeElement
  }

  var directive$1 = {
    bind: function bind (el, binding, vnode) {
      el[NAMESPACE$3] = {
        vnode: vnode,
        state: null,
        options: getOptions$3({ binding: binding })
      };
      if (hasAttr(el, 'title')) {
        el[NAMESPACE$3].attrTitle = attr(el, 'title');
        attr(el, { title: '' });
      }
      el[NAMESPACE$3].title = el[NAMESPACE$3].options.title || el[NAMESPACE$3].attrTitle;
    },
    inserted: function inserted (el, binding, vnode) {
      bindEvents(el);
    },
    componentUpdated: function componentUpdated (el, binding, vnode) {
      el[NAMESPACE$3].options = getOptions$3({ binding: binding });
    },
    unbind: function unbind (el, binding, vnode) {
      if (!el[NAMESPACE$3]) {
        return
      }
      _hide(el);
      attr(el, { title: el[NAMESPACE$3].attrTitle || null });
      el[NAMESPACE$3].unbindEvents();
      delete el[NAMESPACE$3];
    }
  };

  function update$2 (el, ctx) {
    var opts = getOptions$4(ctx);
    var elements = $$(opts.target, el);
    css(elements, 'minHeight', '');
    var rows = getRows$1(elements, opts.row);
    rows.forEach(function (els) {
      var ref = match(els);
      var height = ref.height;
      var elements = ref.elements;
      css(elements, 'minHeight', height);
    });
  }
  function getOptions$4 (ctx) {
    var ref = ctx.binding;
    var value = ref.value;
    if (isString$1(value)) {
      value = { target: value };
    }
    return assign({
      target: '> *',
      row: true
    }, value)
  }
  function getRows$1 (elements, row) {
    if (!row) {
      return [ elements ]
    }
    var lastOffset = false;
    return elements.reduce(function (rows, el) {
      if (lastOffset !== el.offsetTop) {
        rows.push([el]);
      } else {
        rows[rows.length - 1].push(el);
      }
      lastOffset = el.offsetTop;
      return rows
    }, [])
  }
  function match (elements) {
    if (elements.length < 2) {
      return {}
    }
    var max = 0;
    var heights = [];
    elements.forEach(function (el) {
      var style;
      var hidden;
      if (!isVisible(el)) {
        style = attr(el, 'style');
        hidden = attr(el, 'hidden');
        attr(el, {
          style: ((style || '') + ";display:block !important;"),
          hidden: null
        });
      }
      max = Math.max(max, el.offsetHeight);
      heights.push(el.offsetHeight);
      if (!isUndefined(style)) {
        attr(el, {style: style, hidden: hidden});
      }
    });
    elements = elements.filter(function (el, i) { return heights[i] < max; });
    return { height: max, elements: elements }
  }

  var NAMESPACE$4 = '__vkHeightMatch';
  var directive$2 = {
    bind: function bind (el, binding, vnode) {
      el[NAMESPACE$4] = {};
    },
    inserted: function inserted (el, binding, vnode) {
      vnode.context.$nextTick(function () { return update$2(el, { binding: binding, vnode: vnode }); }
      );
      el[NAMESPACE$4].unbind = on(window, 'resize', function () { return update$2(el, { binding: binding, vnode: vnode }); }
      );
    },
    componentUpdated: function componentUpdated (el, binding, vnode) {
      vnode.context.$nextTick(function () { return update$2(el, { binding: binding, vnode: vnode }); }
      );
    },
    unbind: function unbind (el) {
      if (!el[NAMESPACE$4]) {
        return
      }
      el[NAMESPACE$4].unbind();
      delete el[NAMESPACE$4];
    }
  };

  function update$3 (el, ctx) {
    var opts = getOptions$5(ctx);
    css(el, 'boxSizing', 'border-box');
    var viewport = height(window);
    var minHeight;
    var offsetTop = 0;
    if (opts.expand) {
      css(el, {height: '', minHeight: ''});
      var diff = viewport - offsetHeight(document.documentElement);
      if (diff > 0) {
        minHeight = offsetHeight(el) + diff;
      }
    } else {
      var ref = offset(el);
      var top = ref.top;
      if (top < viewport / 2 && opts.offsetTop) {
        offsetTop += top;
      }
      if (opts.offsetBottom === true) {
        offsetTop += offsetHeight(el.nextElementSibling);
      } else if (isNumeric(opts.offsetBottom)) {
        offsetTop += (viewport / 100) * opts.offsetBottom;
      } else if (opts.offsetBottom && endsWith(opts.offsetBottom, 'px')) {
        offsetTop += toFloat(opts.offsetBottom);
      } else if (isString$1(opts.offsetBottom)) {
        offsetTop += offsetHeight(query(opts.offsetBottom, el));
      }
      minHeight = offsetTop ? ("calc(100vh - " + offsetTop + "px)") : '100vh';
    }
    if (!minHeight) {
      return
    }
    css(el, { height: '', minHeight: minHeight });
    var elHeight = el.offsetHeight;
    if (opts.minHeight && opts.minHeight > elHeight) {
      css(el, 'minHeight', opts.minHeight);
    }
    if (viewport - offsetTop >= elHeight) {
      css(el, 'height', minHeight);
    }
  }
  function getOptions$5 (ctx) {
    var ref = ctx.binding;
    var value = ref.value;
    var modifiers = ref.modifiers;
    if (value && !isObject$1(value)) {
      warn('[VkHeightViewport]: An Object is expected as configuration.', ctx.vnode.context);
    }
    var options = assign({
      minHeight: 0,
      expand: false,
      offsetTop: false,
      offsetBottom: false
    }, modifiers, value);
    return options
  }
  function offsetHeight (el) {
    return el && (el.offsetHeight || 0)
  }

  var NAMESPACE$5 = '__vkHeightViewport';
  var directive$3 = {
    bind: function bind (el, binding, vnode) {
      el[NAMESPACE$5] = {};
    },
    inserted: function inserted (el, binding, vnode) {
      vnode.context.$nextTick(function () { return update$3(el, { binding: binding, vnode: vnode }); }
      );
      el[NAMESPACE$5].unbind = on(window, 'resize', function () { return update$3(el, { binding: binding, vnode: vnode }); }
      );
    },
    componentUpdated: function componentUpdated (el, binding, vnode) {
      vnode.context.$nextTick(function () { return update$3(el, { binding: binding, vnode: vnode }); }
      );
    },
    unbind: function unbind (el) {
      if (!el[NAMESPACE$5]) {
        return
      }
      el[NAMESPACE$5].unbind();
      delete el[NAMESPACE$5];
    }
  };



  var directives = /*#__PURE__*/Object.freeze({
    Margin: Margin,
    Scroll: directive,
    Tooltip: directive$1,
    HeightMatch: directive$2,
    HeightViewport: directive$3
  });

  var Vuikit = {
    components: components,
    directives: directives,
    install: function install (Vue, ref) {
      if ( ref === void 0 ) ref = {};
      var prefix = ref.prefix; if ( prefix === void 0 ) prefix = 'Vk';
      each(components, function (def, name) {
        Vue.component(("" + prefix + name), def);
      });
      each(directives, function (def, name) {
        Vue.directive(("" + prefix + name), def);
      });
    }
  };
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Vuikit);
  }

  return Vuikit;

})));
