import { setOptions, CRS, latLng, latLngBounds, map, DomEvent } from 'leaflet';

var debounce = function (fn, time) {
  var timeout;

  var debouncedFunction = function() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      fn.apply(context, args);
      timeout = null;
    }, time);
  };

  debouncedFunction.cancel = function() {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  return debouncedFunction;
};

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

var Options = {
  props: {
    /**
     * Leaflet options to pass to the component constructor
     */
    options: {
      type: Object,
      default: function () { return ({}); }
    }
  }
};

//

/**
 * Base component, contains and wrap all the other components.
 */
var script = {
  name: 'LMap',
  mixins: [Options],
  props: {
    /**
     * The center of the map, supports .sync modifier
     */
    center: {
      type: [Object, Array],
      custom: true,
      default: function () { return [0, 0]; },
    },
    /**
     * The bounds of the map, supports .sync modifier
     */
    bounds: {
      type: [Array, Object],
      custom: true,
      default: null,
    },
    /**
     * The max bounds of the map
     */
    maxBounds: {
      type: [Array, Object],
      default: null,
    },
    /**
     * The zoom of the map, supports .sync modifier
     */
    zoom: {
      type: Number,
      custom: true,
      default: 0,
    },
    /**
     * The minZoom of the map
     */
    minZoom: {
      type: Number,
      default: null,
    },
    /**
     * The maxZoom of the map
     */
    maxZoom: {
      type: Number,
      default: null,
    },
    /**
     * The paddingBottomRight of the map
     */
    paddingBottomRight: {
      type: Array,
      custom: true,
      default: null,
    },
    /**
     * The paddingTopLeft of the map
     */
    paddingTopLeft: {
      type: Array,
      custom: true,
      default: null,
    },
    /**
     * The padding of the map
     */
    padding: {
      type: Array,
      custom: true,
      default: null,
    },
    /**
     * The worldCopyJump option for the map
     */
    worldCopyJump: {
      type: Boolean,
      default: false,
    },
    /**
     * The crs option for the map
     * @values CRS.EPSG3857
     */
    crs: {
      type: Object,
      custom: true,
      default: function () { return CRS.EPSG3857; },
    },
    maxBoundsViscosity: {
      type: Number,
      default: null,
    },
    inertia: {
      type: Boolean,
      default: null,
    },
    inertiaDeceleration: {
      type: Number,
      default: null,
    },
    inertiaMaxSpeed: {
      type: Number,
      default: null,
    },
    easeLinearity: {
      type: Number,
      default: null,
    },
    zoomAnimation: {
      type: Boolean,
      default: null,
    },
    zoomAnimationThreshold: {
      type: Number,
      default: null,
    },
    fadeAnimation: {
      type: Boolean,
      default: null,
    },
    markerZoomAnimation: {
      type: Boolean,
      default: null,
    },
    noBlockingAnimations: {
      type: Boolean,
      default: false,
    },
  },
  data: function data() {
    return {
      ready: false,
      lastSetCenter: this.center ? latLng(this.center) : null,
      lastSetBounds: this.bounds ? latLngBounds(this.bounds) : null,
      layerControl: undefined,
      layersToAdd: [],
      layersInControl: [],
    };
  },
  computed: {
    fitBoundsOptions: function fitBoundsOptions() {
      var options = {
        animate: this.noBlockingAnimations ? false : null,
      };
      if (this.padding) {
        options.padding = this.padding;
      } else {
        if (this.paddingBottomRight) {
          options.paddingBottomRight = this.paddingBottomRight;
        }
        if (this.paddingTopLeft) {
          options.paddingTopLeft = this.paddingTopLeft;
        }
      }
      return options;
    },
  },
  beforeDestroy: function beforeDestroy() {
    if (this.debouncedMoveEndHandler) {
      this.debouncedMoveEndHandler.cancel();
    }

    if (this.mapObject) {
      this.mapObject.remove();
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    var options = optionsMerger(
      {
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        maxBounds: this.maxBounds,
        maxBoundsViscosity: this.maxBoundsViscosity,
        worldCopyJump: this.worldCopyJump,
        crs: this.crs,
        center: this.center,
        zoom: this.zoom,
        inertia: this.inertia,
        inertiaDeceleration: this.inertiaDeceleration,
        inertiaMaxSpeed: this.inertiaMaxSpeed,
        easeLinearity: this.easeLinearity,
        zoomAnimation: this.zoomAnimation,
        zoomAnimationThreshold: this.zoomAnimationThreshold,
        fadeAnimation: this.fadeAnimation,
        markerZoomAnimation: this.markerZoomAnimation,
      },
      this
    );
    this.mapObject = map(this.$el, options);
    if (this.bounds) {
      this.fitBounds(this.bounds);
    }
    this.debouncedMoveEndHandler = debounce(this.moveEndHandler, 100);
    this.mapObject.on('moveend', this.debouncedMoveEndHandler);
    this.mapObject.on('overlayadd', this.overlayAddHandler);
    this.mapObject.on('overlayremove', this.overlayRemoveHandler);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
    /**
     * DEPRECATED event
     * @deprecated
     */
    this.$emit('leaflet:load');
    this.$nextTick(function () {
      /**
       * Triggers when the component is ready
       * @type {object}
       * @property {object} mapObject - reference to leaflet map object
       */
      this$1.$emit('ready', this$1.mapObject);
    });
  },
  methods: {
    registerLayerControl: function registerLayerControl(lControlLayers) {
      var this$1 = this;

      this.layerControl = lControlLayers;
      this.mapObject.addControl(lControlLayers.mapObject);
      this.layersToAdd.forEach(function (layer) {
        this$1.layerControl.addLayer(layer);
      });
      this.layersToAdd = [];
    },
    addLayer: function addLayer(layer, alreadyAdded) {
      if (layer.layerType !== undefined) {
        if (this.layerControl === undefined) {
          this.layersToAdd.push(layer);
        } else {
          var exist = this.layersInControl.find(
            function (l) { return l.mapObject._leaflet_id === layer.mapObject._leaflet_id; }
          );
          if (!exist) {
            this.layerControl.addLayer(layer);
            this.layersInControl.push(layer);
          }
        }
      }
      if (!alreadyAdded && layer.visible !== false) {
        this.mapObject.addLayer(layer.mapObject);
      }
    },
    hideLayer: function hideLayer(layer) {
      this.mapObject.removeLayer(layer.mapObject);
    },
    removeLayer: function removeLayer(layer, alreadyRemoved) {
      if (layer.layerType !== undefined) {
        if (this.layerControl === undefined) {
          this.layersToAdd = this.layersToAdd.filter(
            function (l) { return l.name !== layer.name; }
          );
        } else {
          this.layerControl.removeLayer(layer);
          this.layersInControl = this.layersInControl.filter(
            function (l) { return l.mapObject._leaflet_id !== layer.mapObject._leaflet_id; }
          );
        }
      }
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }
    },
    setZoom: function setZoom(newVal, oldVal) {
      if (newVal === undefined || newVal === null) { return; }
      this.mapObject.setZoom(newVal, {
        animate: this.noBlockingAnimations ? false : null,
      });
      this.cacheMapView();
    },
    setCenter: function setCenter(newVal, oldVal) {
      if (newVal == null) {
        return;
      }
      var newCenter = latLng(newVal);
      var oldCenter = this.lastSetCenter || this.mapObject.getCenter();
      if (oldCenter.lat !== newCenter.lat || oldCenter.lng !== newCenter.lng) {
        this.lastSetCenter = newCenter;
        this.mapObject.panTo(newCenter, {
          animate: this.noBlockingAnimations ? false : null,
        });
        this.cacheMapView(undefined, newCenter);
      }
    },
    setBounds: function setBounds(newVal, oldVal) {
      if (!newVal) {
        return;
      }
      var newBounds = latLngBounds(newVal);
      if (!newBounds.isValid()) {
        return;
      }
      var oldBounds = this.lastSetBounds || this.mapObject.getBounds();
      var boundsChanged = !oldBounds.equals(newBounds, 0); // set maxMargin to 0 - check exact equals
      if (boundsChanged) {
        this.fitBounds(newBounds);
        this.cacheMapView(newBounds);
      }
    },
    setPaddingBottomRight: function setPaddingBottomRight(newVal, oldVal) {
      this.paddingBottomRight = newVal;
    },
    setPaddingTopLeft: function setPaddingTopLeft(newVal, oldVal) {
      this.paddingTopLeft = newVal;
    },
    setPadding: function setPadding(newVal, oldVal) {
      this.padding = newVal;
    },
    setCrs: function setCrs(newVal, oldVal) {
      var mapObject = this.mapObject,
        prevBounds = mapObject.getBounds();
      mapObject.options.crs = newVal;
      this.fitBounds(prevBounds, { animate: false });
    },
    fitBounds: function fitBounds(bounds, overrideOptions) {
      this.mapObject.fitBounds(bounds, Object.assign({}, this.fitBoundsOptions, overrideOptions));
    },
    moveEndHandler: function moveEndHandler() {
      /**
       * Triggers when zoom is updated
       * @type {number,string}
       */
      this.$emit('update:zoom', this.mapObject.getZoom());
      var center = this.mapObject.getCenter();
      /**
       * Triggers when center is updated
       * @type {object,array}
       */
      this.$emit('update:center', center);
      var bounds = this.mapObject.getBounds();
      /**
       * Triggers when bounds are updated
       * @type {object}
       */
      this.$emit('update:bounds', bounds);
    },
    overlayAddHandler: function overlayAddHandler(e) {
      var layer = this.layersInControl.find(function (l) { return l.name === e.name; });
      if (layer) {
        layer.updateVisibleProp(true);
      }
    },
    overlayRemoveHandler: function overlayRemoveHandler(e) {
      var layer = this.layersInControl.find(function (l) { return l.name === e.name; });
      if (layer) {
        layer.updateVisibleProp(false);
      }
    },
    cacheMapView: function cacheMapView(bounds, center) {
      // Cache the last values used to define the map view by mutating props.
      this.lastSetBounds = bounds || this.mapObject.getBounds();
      this.lastSetCenter = center || this.lastSetBounds.getCenter();
    },
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

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue2leaflet-map"},[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-09f270aa_0", { source: ".vue2leaflet-map{height:100%;width:100%}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
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
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;
