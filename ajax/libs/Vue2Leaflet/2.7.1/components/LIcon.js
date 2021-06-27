import { setOptions, DomEvent, divIcon, icon } from 'leaflet';

var capitalizeFirstLetter = function (string) {
  if (!string || typeof string.charAt !== 'function') {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var propsBinder = function (vueElement, leafletElement, props, options) {
  var loop = function ( key ) {
    var setMethodName = 'set' + capitalizeFirstLetter(key);
    var deepValue =
      props[key].type === Object ||
      props[key].type === Array ||
      Array.isArray(props[key].type);
    if (props[key].custom && vueElement[setMethodName]) {
      vueElement.$watch(
        key,
        function (newVal, oldVal) {
          vueElement[setMethodName](newVal, oldVal);
        },
        {
          deep: deepValue,
        }
      );
    } else if (setMethodName === 'setOptions') {
      vueElement.$watch(
        key,
        function (newVal, oldVal) {
          setOptions(leafletElement, newVal);
        },
        {
          deep: deepValue,
        }
      );
    } else if (leafletElement[setMethodName]) {
      vueElement.$watch(
        key,
        function (newVal, oldVal) {
          leafletElement[setMethodName](newVal);
        },
        {
          deep: deepValue,
        }
      );
    }
  };

  for (var key in props) loop( key );
};

var collectionCleaner = function (options) {
  var result = {};
  for (var key in options) {
    var value = options[key];
    if (value !== null && value !== undefined) {
      result[key] = value;
    }
  }
  return result;
};

var optionsMerger = function (props, instance) {
  var options =
    instance.options && instance.options.constructor === Object
      ? instance.options
      : {};
  props = props && props.constructor === Object ? props : {};
  var result = collectionCleaner(options);
  props = collectionCleaner(props);
  var defaultProps = instance.$options.props;
  for (var key in props) {
    var def = defaultProps[key]
      ? defaultProps[key].default &&
        typeof defaultProps[key].default === 'function'
        ? defaultProps[key].default.call()
        : defaultProps[key].default
      : Symbol('unique');
    var isEqual = false;
    if (Array.isArray(def)) {
      isEqual = JSON.stringify(def) === JSON.stringify(props[key]);
    } else {
      isEqual = def === props[key];
    }
    if (result[key] && !isEqual) {
      console.warn(
        (key + " props is overriding the value passed in the options props")
      );
      result[key] = props[key];
    } else if (!result[key]) {
      result[key] = props[key];
    }
  }
  return result;
};

var findRealParent = function (firstVueParent) {
  var found = false;
  while (firstVueParent && !found) {
    if (firstVueParent.mapObject === undefined) {
      firstVueParent = firstVueParent.$parent;
    } else {
      found = true;
    }
  }
  return firstVueParent;
};

//

/**
 * Easy and reactive way to configure the icon of a marker
 */
var script = {
  name: 'LIcon',
  props: {
    iconUrl: {
      type: String,
      custom: true,
      default: null,
    },
    iconRetinaUrl: {
      type: String,
      custom: true,
      default: null,
    },
    iconSize: {
      type: [Object, Array],
      custom: true,
      default: null,
    },
    iconAnchor: {
      type: [Object, Array],
      custom: true,
      default: null,
    },
    popupAnchor: {
      type: [Object, Array],
      custom: true,
      default: function () { return [0, 0]; },
    },
    tooltipAnchor: {
      type: [Object, Array],
      custom: true,
      default: function () { return [0, 0]; },
    },
    shadowUrl: {
      type: String,
      custom: true,
      default: null,
    },
    shadowRetinaUrl: {
      type: String,
      custom: true,
      default: null,
    },
    shadowSize: {
      type: [Object, Array],
      custom: true,
      default: null,
    },
    shadowAnchor: {
      type: [Object, Array],
      custom: true,
      default: null,
    },
    bgPos: {
      type: [Object, Array],
      custom: true,
      default: function () { return [0, 0]; },
    },
    className: {
      type: String,
      custom: true,
      default: '',
    },
    options: {
      type: Object,
      custom: true,
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      parentContainer: null,
      observer: null,
      recreationNeeded: false,
      swapHtmlNeeded: false,
    };
  },

  mounted: function mounted() {
    var this$1 = this;

    this.parentContainer = findRealParent(this.$parent);
    if (!this.parentContainer) {
      throw new Error('No parent container with mapObject found for LIcon');
    }
    propsBinder(this, this.parentContainer.mapObject, this.$options.props);

    this.observer = new MutationObserver(function () {
      this$1.scheduleHtmlSwap();
    });
    this.observer.observe(this.$el, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });
    this.scheduleCreateIcon();
  },

  beforeDestroy: function beforeDestroy() {
    if (this.parentContainer.mapObject) {
      this.parentContainer.mapObject.setIcon(this.parentContainer.$props.icon);
    }

    this.observer.disconnect();
  },

  methods: {
    scheduleCreateIcon: function scheduleCreateIcon() {
      this.recreationNeeded = true;

      this.$nextTick(this.createIcon);
    },

    scheduleHtmlSwap: function scheduleHtmlSwap() {
      this.htmlSwapNeeded = true;

      this.$nextTick(this.createIcon);
    },

    createIcon: function createIcon() {
      // If only html of a divIcon changed, we can just replace the DOM without the need of recreating the whole icon
      if (
        this.htmlSwapNeeded &&
        !this.recreationNeeded &&
        this.iconObject &&
        this.parentContainer.mapObject.getElement()
      ) {
        this.parentContainer.mapObject.getElement().innerHTML = this.$el.innerHTML;

        this.htmlSwapNeeded = false;
        return;
      }

      if (!this.recreationNeeded) {
        return;
      }

      if (this.iconObject) {
        DomEvent.off(this.iconObject, this.$listeners);
      }

      var options = optionsMerger(
        {
          iconUrl: this.iconUrl,
          iconRetinaUrl: this.iconRetinaUrl,
          iconSize: this.iconSize,
          iconAnchor: this.iconAnchor,
          popupAnchor: this.popupAnchor,
          tooltipAnchor: this.tooltipAnchor,
          shadowUrl: this.shadowUrl,
          shadowRetinaUrl: this.shadowRetinaUrl,
          shadowSize: this.shadowSize,
          shadowAnchor: this.shadowAnchor,
          bgPos: this.bgPos,
          className: this.className,
          html: this.$el.innerHTML || this.html,
        },
        this
      );

      if (options.html) {
        this.iconObject = divIcon(options);
      } else {
        this.iconObject = icon(options);
      }

      DomEvent.on(this.iconObject, this.$listeners);

      this.parentContainer.mapObject.setIcon(this.iconObject);

      this.recreationNeeded = false;
      this.htmlSwapNeeded = false;
    },

    setIconUrl: function setIconUrl() {
      this.scheduleCreateIcon();
    },
    setIconRetinaUrl: function setIconRetinaUrl() {
      this.scheduleCreateIcon();
    },
    setIconSize: function setIconSize() {
      this.scheduleCreateIcon();
    },
    setIconAnchor: function setIconAnchor() {
      this.scheduleCreateIcon();
    },
    setPopupAnchor: function setPopupAnchor() {
      this.scheduleCreateIcon();
    },
    setTooltipAnchor: function setTooltipAnchor() {
      this.scheduleCreateIcon();
    },
    setShadowUrl: function setShadowUrl() {
      this.scheduleCreateIcon();
    },
    setShadowRetinaUrl: function setShadowRetinaUrl() {
      this.scheduleCreateIcon();
    },
    setShadowAnchor: function setShadowAnchor() {
      this.scheduleCreateIcon();
    },
    setBgPos: function setBgPos() {
      this.scheduleCreateIcon();
    },
    setClassName: function setClassName() {
      this.scheduleCreateIcon();
    },
    setHtml: function setHtml() {
      this.scheduleCreateIcon();
    },
  },

  render: function render() {
    return null;
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__;
