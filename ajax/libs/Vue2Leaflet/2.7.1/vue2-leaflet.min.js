(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'vue'], factory) :
  (global = global || self, factory(global.Vue2Leaflet = {}, global.L, global.Vue));
}(this, (function (exports, leaflet, Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

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
            leaflet.setOptions(leafletElement, newVal);
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

  var Layer = {
    props: {
      pane: {
        type: String,
        default: 'overlayPane',
      },
      attribution: {
        type: String,
        default: null,
        custom: true,
      },
      name: {
        type: String,
        custom: true,
        default: undefined,
      },
      layerType: {
        type: String,
        custom: true,
        default: undefined,
      },
      visible: {
        type: Boolean,
        custom: true,
        default: true,
      },
    },
    mounted: function mounted() {
      this.layerOptions = {
        attribution: this.attribution,
        pane: this.pane,
      };
    },
    beforeDestroy: function beforeDestroy() {
      this.unbindPopup();
      this.unbindTooltip();
      this.parentContainer.removeLayer(this);
    },
    methods: {
      setAttribution: function setAttribution(val, old) {
        var attributionControl = this.$parent.mapObject.attributionControl;
        attributionControl.removeAttribution(old).addAttribution(val);
      },
      setName: function setName() {
        this.parentContainer.removeLayer(this);
        if (this.visible) {
          this.parentContainer.addLayer(this);
        }
      },
      setLayerType: function setLayerType() {
        this.parentContainer.removeLayer(this);
        if (this.visible) {
          this.parentContainer.addLayer(this);
        }
      },
      setVisible: function setVisible(isVisible) {
        if (this.mapObject) {
          if (isVisible) {
            this.parentContainer.addLayer(this);
          } else {
            if (this.parentContainer.hideLayer) {
              this.parentContainer.hideLayer(this);
            } else {
              this.parentContainer.removeLayer(this);
            }
          }
        }
      },
      unbindTooltip: function unbindTooltip() {
        var tooltip = this.mapObject ? this.mapObject.getTooltip() : null;
        if (tooltip) {
          tooltip.unbindTooltip();
        }
      },
      unbindPopup: function unbindPopup() {
        var popup = this.mapObject ? this.mapObject.getPopup() : null;
        if (popup) {
          popup.unbindPopup();
        }
      },
      updateVisibleProp: function updateVisibleProp(value) {
        /**
         * Triggers when the visible prop needs to be updated
         * @type {boolean}
         * @property {boolean} value - value of the visible property
         */
        this.$emit('update:visible', value);
      },
    },
  };

  var InteractiveLayer = {
    props: {
      interactive: {
        type: Boolean,
        default: true
      },
      bubblingMouseEvents: {
        type: Boolean,
        default: true
      }
    },
    mounted: function mounted () {
      this.interactiveLayerOptions = {
        interactive: this.interactive,
        bubblingMouseEvents: this.bubblingMouseEvents
      };
    }
  };

  var Path = {
    mixins: [Layer, InteractiveLayer],
    props: {
      lStyle: {
        type: Object,
        custom: true,
        default: null
      },
      stroke: {
        type: Boolean,
        custom: true,
        default: true
      },
      color: {
        type: String,
        custom: true,
        default: '#3388ff'
      },
      weight: {
        type: Number,
        custom: true,
        default: 3
      },
      opacity: {
        type: Number,
        custom: true,
        default: 1.0
      },
      lineCap: {
        type: String,
        custom: true,
        default: 'round'
      },
      lineJoin: {
        type: String,
        custom: true,
        default: 'round'
      },
      dashArray: {
        type: String,
        custom: true,
        default: null
      },
      dashOffset: {
        type: String,
        custom: true,
        default: null
      },
      fill: {
        type: Boolean,
        custom: true,
        default: false
      },
      fillColor: {
        type: String,
        custom: true,
        default: '#3388ff'
      },
      fillOpacity: {
        type: Number,
        custom: true,
        default: 0.2
      },
      fillRule: {
        type: String,
        custom: true,
        default: 'evenodd'
      },
      className: {
        type: String,
        custom: true,
        default: null
      }
    },
    mounted: function mounted () {
      this.pathOptions = Object.assign({}, this.layerOptions,
        this.interactiveLayerOptions,
        {stroke: this.stroke,
        color: this.color,
        weight: this.weight,
        opacity: this.opacity,
        lineCap: this.lineCap,
        lineJoin: this.lineJoin,
        dashArray: this.dashArray,
        dashOffset: this.dashOffset,
        fill: this.fill,
        fillColor: this.fillColor,
        fillOpacity: this.fillOpacity,
        fillRule: this.fillRule,
        className: this.className});

      if (this.lStyle) {
        console.warn('lStyle is deprecated and is going to be removed in the next major version');
        for (var style in this.lStyle) {
          this.pathOptions[style] = this.lStyle[style];
        }
      }
    },
    beforeDestroy: function beforeDestroy () {
      if (this.parentContainer) {
        this.parentContainer.removeLayer(this);
      } else {
        console.error('Missing parent container');
      }
    },
    methods: {
      setLStyle: function setLStyle (newVal) {
        this.mapObject.setStyle(newVal);
      },
      setStroke: function setStroke (newVal) {
        this.mapObject.setStyle({ stroke: newVal });
      },
      setColor: function setColor (newVal) {
        this.mapObject.setStyle({ color: newVal });
      },
      setWeight: function setWeight (newVal) {
        this.mapObject.setStyle({ weight: newVal });
      },
      setOpacity: function setOpacity (newVal) {
        this.mapObject.setStyle({ opacity: newVal });
      },
      setLineCap: function setLineCap (newVal) {
        this.mapObject.setStyle({ lineCap: newVal });
      },
      setLineJoin: function setLineJoin (newVal) {
        this.mapObject.setStyle({ lineJoin: newVal });
      },
      setDashArray: function setDashArray (newVal) {
        this.mapObject.setStyle({ dashArray: newVal });
      },
      setDashOffset: function setDashOffset (newVal) {
        this.mapObject.setStyle({ dashOffset: newVal });
      },
      setFill: function setFill (newVal) {
        this.mapObject.setStyle({ fill: newVal });
      },
      setFillColor: function setFillColor (newVal) {
        this.mapObject.setStyle({ fillColor: newVal });
      },
      setFillOpacity: function setFillOpacity (newVal) {
        this.mapObject.setStyle({ fillOpacity: newVal });
      },
      setFillRule: function setFillRule (newVal) {
        this.mapObject.setStyle({ fillRule: newVal });
      },
      setClassName: function setClassName (newVal) {
        this.mapObject.setStyle({ className: newVal });
      }
    }
  };

  var CircleMixin = {
    mixins: [Path],
    props: {
      fill: {
        type: Boolean,
        custom: true,
        default: true
      },
      radius: {
        type: Number,
        default: null
      }
    },
    mounted: function mounted () {
      this.circleOptions = Object.assign({}, this.pathOptions,
        {radius: this.radius});
    }
  };

  var ControlMixin = {
    props: {
      position: {
        type: String,
        default: 'topright'
      }
    },
    mounted: function mounted () {
      this.controlOptions = {
        position: this.position
      };
    },
    beforeDestroy: function beforeDestroy () {
      if (this.mapObject) {
        this.mapObject.remove();
      }
    }
  };

  var GridLayerMixin = {
    mixins: [Layer],
    props: {
      pane: {
        type: String,
        default: 'tilePane'
      },
      opacity: {
        type: Number,
        custom: false,
        default: 1.0
      },
      zIndex: {
        type: Number,
        default: 1
      },
      tileSize: {
        type: Number,
        default: 256
      },
      noWrap: {
        type: Boolean,
        default: false
      }
    },
    mounted: function mounted () {
      this.gridLayerOptions = Object.assign({}, this.layerOptions,
        {pane: this.pane,
        opacity: this.opacity,
        zIndex: this.zIndex,
        tileSize: this.tileSize,
        noWrap: this.noWrap});
    }
  };

  var ImageOverlayMixin = {
    mixins: [Layer, InteractiveLayer],
    props: {
      url: {
        type: String,
        custom: true
      },
      bounds: {
        custom: true
      },
      opacity: {
        type: Number,
        custom: true,
        default: 1.0
      },
      alt: {
        type: String,
        default: ''
      },
      interactive: {
        type: Boolean,
        default: false
      },
      crossOrigin: {
        type: Boolean,
        default: false
      },
      errorOverlayUrl: {
        type: String,
        custom: true,
        default: ''
      },
      zIndex: {
        type: Number,
        custom: true,
        default: 1
      },
      className: {
        type: String,
        default: ''
      }
    },
    mounted: function mounted () {
      this.imageOverlayOptions = Object.assign({}, this.layerOptions,
        this.interactiveLayerOptions,
        {opacity: this.opacity,
        alt: this.alt,
        interactive: this.interactive,
        crossOrigin: this.crossOrigin,
        errorOverlayUrl: this.errorOverlayUrl,
        zIndex: this.zIndex,
        className: this.className});
    },
    methods: {
      setOpacity: function setOpacity (opacity) {
        return this.mapObject.setOpacity(opacity);
      },
      setUrl: function setUrl (url) {
        return this.mapObject.setUrl(url);
      },
      setBounds: function setBounds (bounds) {
        return this.mapObject.setBounds(bounds);
      },
      getBounds: function getBounds () {
        return this.mapObject.getBounds();
      },
      getElement: function getElement () {
        return this.mapObject.getElement();
      },
      bringToFront: function bringToFront () {
        return this.mapObject.bringToFront();
      },
      bringToBack: function bringToBack () {
        return this.mapObject.bringToBack();
      }
    },
    render: function render () {
      return null;
    }
  };

  var LayerGroupMixin = {
    mixins: [Layer],
    mounted: function mounted () {
      this.layerGroupOptions = this.layerOptions;
    },
    methods: {
      addLayer: function addLayer (layer, alreadyAdded) {
        if (!alreadyAdded) {
          this.mapObject.addLayer(layer.mapObject);
        }
        this.parentContainer.addLayer(layer, true);
      },
      removeLayer: function removeLayer (layer, alreadyRemoved) {
        if (!alreadyRemoved) {
          this.mapObject.removeLayer(layer.mapObject);
        }
        this.parentContainer.removeLayer(layer, true);
      }
    }
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

  var PolylineMixin = {
    mixins: [Path],
    props: {
      smoothFactor: {
        type: Number,
        custom: true,
        default: 1.0
      },
      noClip: {
        type: Boolean,
        custom: true,
        default: false
      }
    },
    data: function data () {
      return {
        ready: false
      };
    },
    mounted: function mounted () {
      this.polyLineOptions = Object.assign({}, this.pathOptions,
        {smoothFactor: this.smoothFactor,
        noClip: this.noClip});
    },
    methods: {
      setSmoothFactor: function setSmoothFactor (newVal) {
        this.mapObject.setStyle({ smoothFactor: newVal });
      },
      setNoClip: function setNoClip (newVal) {
        this.mapObject.setStyle({ noClip: newVal });
      },
      addLatLng: function addLatLng (value) {
        this.mapObject.addLatLng(value);
      }
    }
  };

  var Polygon = {
    mixins: [PolylineMixin],
    props: {
      fill: {
        type: Boolean,
        custom: true,
        default: true
      }
    },
    mounted: function mounted () {
      this.polygonOptions = this.polyLineOptions;
    },
    methods: {
      getGeoJSONData: function getGeoJSONData () {
        return this.mapObject.toGeoJSON();
      }
    }
  };

  var Popper = {
    props: {
      content: {
        type: String,
        default: null,
        custom: true
      }
    },
    mounted: function mounted () {
      this.popperOptions = {};
    },
    methods: {
      setContent: function setContent (newVal) {
        if (this.mapObject && newVal !== null && newVal !== undefined) {
          this.mapObject.setContent(newVal);
        }
      }
    },
    render: function render (h) {
      if (this.$slots.default) {
        return h('div', this.$slots.default);
      }
      return null;
    }
  };

  var TileLayerMixin = {
    mixins: [GridLayerMixin],
    props: {
      tms: {
        type: Boolean,
        default: false,
      },
      subdomains: {
        type: [String, Array],
        default: 'abc',
        validator: function (prop) {
          if (typeof prop === 'string') { return true; }
          // Validates array that array only contains only strings
          if (Array.isArray(prop)) {
            return prop.every(function (subdomain) { return typeof subdomain === 'string'; });
          }
          return false;
        },
      },
      detectRetina: {
        type: Boolean,
        default: false,
      },
    },
    mounted: function mounted() {
      this.tileLayerOptions = Object.assign({}, this.gridLayerOptions,
        {tms: this.tms,
        subdomains: this.subdomains,
        detectRetina: this.detectRetina});
    },
    render: function render() {
      return null;
    },
  };

  var TileLayerWMS = {
    mixins: [TileLayerMixin],
    props: {
      layers: {
        type: String,
        default: ''
      },
      styles: {
        type: String,
        default: ''
      },
      format: {
        type: String,
        default: 'image/jpeg'
      },
      transparent: {
        type: Boolean,
        custom: false
      },
      version: {
        type: String,
        default: '1.1.1'
      },
      crs: {
        default: null
      },
      upperCase: {
        type: Boolean,
        default: false
      }
    },
    mounted: function mounted () {
      this.tileLayerWMSOptions = Object.assign({}, this.tileLayerOptions,
        {layers: this.layers,
        styles: this.styles,
        format: this.format,
        transparent: this.transparent,
        version: this.version,
        crs: this.crs,
        upperCase: this.upperCase});
    }
  };

  //

  /**
   * Draw a path in the shape of a circle around a center positioned at `latLng` coordinates
   */
  var script = {
    name: 'LCircle',
    mixins: [CircleMixin, Options],
    props: {
      latLng: {
        type: [Object, Array],
        default: function () { return [0, 0]; },
      },
    },
    data: function data() {
      return {
        ready: false,
      };
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(this.circleOptions, this);
      this.mapObject = leaflet.circle(this.latLng, options);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.ready = true;
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
    methods: {},
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
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"display":"none"}},[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
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

  //

  /**
   * A marker in the shape of a circle
   */
  var script$1 = {
    name: 'LCircleMarker',
    mixins: [CircleMixin, Options],
    props: {
      latLng: {
        type: [Object, Array],
        default: function () { return [0, 0]; },
      },
      pane: {
        type: String,
        default: 'markerPane',
      },
    },
    data: function data() {
      return {
        ready: false,
      };
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(this.circleOptions, this);
      this.mapObject = leaflet.circleMarker(this.latLng, options);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.ready = true;
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
  };

  /* script */
  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"display":"none"}},[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
  var __vue_staticRenderFns__$1 = [];

    /* style */
    var __vue_inject_styles__$1 = undefined;
    /* scoped */
    var __vue_scope_id__$1 = undefined;
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  //

  /**
   * Add any custom component as a leaflet control
   */
  var script$2 = {
    name: 'LControl',
    mixins: [ControlMixin, Options],
    props: {
      disableClickPropagation: {
        type: Boolean,
        custom: true,
        default: true,
      },
      disableScrollPropagation: {
        type: Boolean,
        custom: true,
        default: false,
      }
    },
    mounted: function mounted() {
      var this$1 = this;

      var LControl = leaflet.Control.extend({
        element: undefined,
        onAdd: function onAdd() {
          return this.element;
        },
        setElement: function setElement(el) {
          this.element = el;
        },
      });
      var options = optionsMerger(this.controlOptions, this);
      this.mapObject = new LControl(options);
      propsBinder(this, this.mapObject, this.$options.props);
      this.parentContainer = findRealParent(this.$parent);
      this.mapObject.setElement(this.$el);
      if (this.disableClickPropagation) {
        leaflet.DomEvent.disableClickPropagation(this.$el);
      }
      if (this.disableScrollPropagation) {
        leaflet.DomEvent.disableScrollPropagation(this.$el);
      }
      this.mapObject.addTo(this.parentContainer.mapObject);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
  };

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)};
  var __vue_staticRenderFns__$2 = [];

    /* style */
    var __vue_inject_styles__$2 = undefined;
    /* scoped */
    var __vue_scope_id__$2 = undefined;
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * Add any custom component as a leaflet control-attribution
   */
  var script$3 = {
    name: 'LControlAttribution',
    mixins: [ControlMixin, Options],
    props: {
      prefix: {
        type: [String, Boolean],
        default: null,
      },
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(
        Object.assign({}, this.controlOptions,
          {prefix: this.prefix}),
        this
      );
      this.mapObject = leaflet.control.attribution(options);
      propsBinder(this, this.mapObject, this.$options.props);
      this.mapObject.addTo(this.$parent.mapObject);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
    render: function render() {
      return null;
    },
  };

  /* script */
  var __vue_script__$3 = script$3;

  /* template */

    /* style */
    var __vue_inject_styles__$3 = undefined;
    /* scoped */
    var __vue_scope_id__$3 = undefined;
    /* module identifier */
    var __vue_module_identifier__$3 = undefined;
    /* functional template */
    var __vue_is_functional_template__$3 = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * Add any custom component as a leaflet control-layers
   */
  var script$4 = {
    name: 'LControlLayers',
    mixins: [ControlMixin, Options],
    props: {
      collapsed: {
        type: Boolean,
        default: true,
      },
      autoZIndex: {
        type: Boolean,
        default: true,
      },
      hideSingleBase: {
        type: Boolean,
        default: false,
      },
      sortLayers: {
        type: Boolean,
        default: false,
      },
      sortFunction: {
        type: Function,
        default: undefined,
      },
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(
        Object.assign({}, this.controlOptions,
          {collapsed: this.collapsed,
          autoZIndex: this.autoZIndex,
          hideSingleBase: this.hideSingleBase,
          sortLayers: this.sortLayers,
          sortFunction: this.sortFunction}),
        this
      );
      this.mapObject = leaflet.control.layers(null, null, options);
      propsBinder(this, this.mapObject, this.$options.props);
      this.$parent.registerLayerControl(this);
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
      addLayer: function addLayer(layer) {
        if (layer.layerType === 'base') {
          this.mapObject.addBaseLayer(layer.mapObject, layer.name);
        } else if (layer.layerType === 'overlay') {
          this.mapObject.addOverlay(layer.mapObject, layer.name);
        }
      },
      removeLayer: function removeLayer(layer) {
        this.mapObject.removeLayer(layer.mapObject);
      },
    },
    render: function render() {
      return null;
    },
  };

  /* script */
  var __vue_script__$4 = script$4;

  /* template */

    /* style */
    var __vue_inject_styles__$4 = undefined;
    /* scoped */
    var __vue_scope_id__$4 = undefined;
    /* module identifier */
    var __vue_module_identifier__$4 = undefined;
    /* functional template */
    var __vue_is_functional_template__$4 = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * Add any custom component as a leaflet control-scale
   */
  var script$5 = {
    name: 'LControlScale',
    mixins: [ControlMixin, Options],
    props: {
      maxWidth: {
        type: Number,
        default: 100,
      },
      metric: {
        type: Boolean,
        default: true,
      },
      imperial: {
        type: Boolean,
        default: true,
      },
      updateWhenIdle: {
        type: Boolean,
        default: false,
      },
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(
        Object.assign({}, this.controlOptions,
          {maxWidth: this.maxWidth,
          metric: this.metric,
          imperial: this.imperial,
          updateWhenIdle: this.updateWhenIdle}),
        this
      );
      this.mapObject = leaflet.control.scale(options);
      propsBinder(this, this.mapObject, this.$options.props);
      this.mapObject.addTo(this.$parent.mapObject);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
    render: function render() {
      return null;
    },
  };

  /* script */
  var __vue_script__$5 = script$5;

  /* template */

    /* style */
    var __vue_inject_styles__$5 = undefined;
    /* scoped */
    var __vue_scope_id__$5 = undefined;
    /* module identifier */
    var __vue_module_identifier__$5 = undefined;
    /* functional template */
    var __vue_is_functional_template__$5 = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * Add any custom component as a leaflet control-zoom
   */
  var script$6 = {
    name: 'LControlZoom',
    mixins: [ControlMixin, Options],
    props: {
      zoomInText: {
        type: String,
        default: '+',
      },
      zoomInTitle: {
        type: String,
        default: 'Zoom in',
      },
      zoomOutText: {
        type: String,
        default: '-',
      },
      zoomOutTitle: {
        type: String,
        default: 'Zoom out',
      },
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(
        Object.assign({}, this.controlOptions,
          {zoomInText: this.zoomInText,
          zoomInTitle: this.zoomInTitle,
          zoomOutText: this.zoomOutText,
          zoomOutTitle: this.zoomOutTitle}),
        this
      );
      this.mapObject = leaflet.control.zoom(options);
      propsBinder(this, this.mapObject, this.$options.props);
      this.mapObject.addTo(this.$parent.mapObject);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
    render: function render() {
      return null;
    },
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
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      undefined,
      undefined,
      undefined
    );

  //

  /**
   * Group together elements of the maps  including: markers, geoJSON, polylines and polygon, tooltip and popup.
   */
  var script$7 = {
    name: 'LFeatureGroup',
    mixins: [LayerGroupMixin, Options],
    data: function data() {
      return {
        ready: false,
      };
    },
    mounted: function mounted() {
      var this$1 = this;

      this.mapObject = leaflet.featureGroup();
      propsBinder(this, this.mapObject, this.$options.props);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      this.ready = true;
      this.parentContainer = findRealParent(this.$parent);
      if (this.visible) {
        this.parentContainer.addLayer(this);
      }
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
  };

  /* script */
  var __vue_script__$7 = script$7;

  /* template */
  var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"display":"none"}},[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
  var __vue_staticRenderFns__$3 = [];

    /* style */
    var __vue_inject_styles__$7 = undefined;
    /* scoped */
    var __vue_scope_id__$7 = undefined;
    /* module identifier */
    var __vue_module_identifier__$7 = undefined;
    /* functional template */
    var __vue_is_functional_template__$7 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * Easily display a geo-json on the map
   */
  var script$8 = {
    name: 'LGeoJson',
    mixins: [LayerGroupMixin, Options],
    props: {
      geojson: {
        type: [Object, Array],
        custom: true,
        default: function () { return ({}); },
      },
      options: {
        type: Object,
        custom: true,
        default: function () { return ({}); },
      },
      optionsStyle: {
        type: [Object, Function],
        custom: true,
        default: null,
      },
    },
    computed: {
      mergedOptions: function mergedOptions() {
        return optionsMerger(
          Object.assign({}, this.layerGroupOptions,
            {style: this.optionsStyle}),
          this
        );
      },
    },
    mounted: function mounted() {
      var this$1 = this;

      this.mapObject = leaflet.geoJSON(this.geojson, this.mergedOptions);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
    beforeDestroy: function beforeDestroy() {
      this.parentContainer.mapObject.removeLayer(this.mapObject);
    },
    methods: {
      setGeojson: function setGeojson(newVal) {
        this.mapObject.clearLayers();
        this.mapObject.addData(newVal);
      },
      getGeoJSONData: function getGeoJSONData() {
        return this.mapObject.toGeoJSON();
      },
      getBounds: function getBounds() {
        return this.mapObject.getBounds();
      },
      setOptions: function setOptions$1(newVal, oldVal) {
        this.mapObject.clearLayers();
        leaflet.setOptions(this.mapObject, this.mergedOptions);
        this.mapObject.addData(this.geojson);
      },
      setOptionsStyle: function setOptionsStyle(newVal, oldVal) {
        this.mapObject.setStyle(newVal);
      },
    },
    render: function render() {
      return null;
    },
  };

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
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      false,
      undefined,
      undefined,
      undefined
    );

  //

  /**
   * Creates a map layer where each tile is an instantiated Vue component.
   * Each tile component is given `coords` props by `l-grid-layer` to indicate
   * the zoom level and position of the tile
   * (see https://leafletjs.com/examples/extending/extending-2-layers.html#lgridlayer-and-dom-elements).
   */
  var script$9 = {
    name: 'LGridLayer',
    mixins: [GridLayerMixin, Options],

    props: {
      tileComponent: {
        type: Object,
        custom: true,
        required: true,
      },
    },

    data: function data() {
      return {
        tileComponents: {},
      };
    },

    computed: {
      TileConstructor: function TileConstructor() {
        return Vue.extend(this.tileComponent);
      },
    },

    mounted: function mounted() {
      var this$1 = this;

      var GLayer = leaflet.GridLayer.extend({});
      var options = optionsMerger(this.gridLayerOptions, this);
      this.mapObject = new GLayer(options);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      this.mapObject.on('tileunload', this.onUnload, this);
      propsBinder(this, this.mapObject, this.$options.props);
      this.mapObject.createTile = this.createTile;
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
    beforeDestroy: function beforeDestroy() {
      this.parentContainer.removeLayer(this.mapObject);
      this.mapObject.off('tileunload', this.onUnload);
      this.mapObject = null;
    },

    methods: {
      createTile: function createTile(coords) {
        var div = leaflet.DomUtil.create('div');
        var dummy = leaflet.DomUtil.create('div');
        div.appendChild(dummy);

        var tileInstance = new this.TileConstructor({
          el: dummy,
          parent: this,
          propsData: {
            coords: coords,
          },
        });

        var key = this.mapObject._tileCoordsToKey(coords);
        this.tileComponents[key] = tileInstance;

        return div;
      },

      onUnload: function onUnload(e) {
        var key = this.mapObject._tileCoordsToKey(e.coords);
        if (typeof this.tileComponents[key] !== 'undefined') {
          this.tileComponents[key].$destroy();
          this.tileComponents[key].$el.remove();
          delete this.tileComponents[key];
        }
      },

      setTileComponent: function setTileComponent(newVal) {
        this.mapObject.redraw();
      },
    },
  };

  /* script */
  var __vue_script__$9 = script$9;

  /* template */
  var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
  var __vue_staticRenderFns__$4 = [];

    /* style */
    var __vue_inject_styles__$9 = undefined;
    /* scoped */
    var __vue_scope_id__$9 = undefined;
    /* module identifier */
    var __vue_module_identifier__$9 = undefined;
    /* functional template */
    var __vue_is_functional_template__$9 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      false,
      undefined,
      undefined,
      undefined
    );

  //

  /**
   * Easy and reactive way to configure the icon of a marker
   */
  var script$a = {
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
          leaflet.DomEvent.off(this.iconObject, this.$listeners);
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
          this.iconObject = leaflet.divIcon(options);
        } else {
          this.iconObject = leaflet.icon(options);
        }

        leaflet.DomEvent.on(this.iconObject, this.$listeners);

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

  /* script */
  var __vue_script__$a = script$a;

  /* template */
  var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)};
  var __vue_staticRenderFns__$5 = [];

    /* style */
    var __vue_inject_styles__$a = undefined;
    /* scoped */
    var __vue_scope_id__$a = undefined;
    /* module identifier */
    var __vue_module_identifier__$a = undefined;
    /* functional template */
    var __vue_is_functional_template__$a = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$a = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * Set a default icon
   * @deprecated since version 2.0
   */
  var script$b = {
    name: 'LIconDefault',
    props: {
      imagePath: {
        type: String,
        custom: true,
        default: '',
      },
    },
    mounted: function mounted() {
      leaflet.Icon.Default.imagePath = this.imagePath;
      propsBinder(this, {}, this.$options.props);
    },
    methods: {
      setImagePath: function setImagePath(newVal) {
        leaflet.Icon.Default.imagePath = newVal;
      },
    },
    render: function render() {
      return null;
    },
  };

  /* script */
  var __vue_script__$b = script$b;

  /* template */

    /* style */
    var __vue_inject_styles__$b = undefined;
    /* scoped */
    var __vue_scope_id__$b = undefined;
    /* module identifier */
    var __vue_module_identifier__$b = undefined;
    /* functional template */
    var __vue_is_functional_template__$b = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$b = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$b,
      __vue_script__$b,
      __vue_scope_id__$b,
      __vue_is_functional_template__$b,
      __vue_module_identifier__$b,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * Easily display a image overlay.
   */
  var script$c = {
    name: 'LImageOverlay',
    mixins: [ImageOverlayMixin, Options],
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(this.imageOverlayOptions, this);
      this.mapObject = leaflet.imageOverlay(this.url, this.bounds, options);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
    render: function render() {
      return null;
    },
  };

  /* script */
  var __vue_script__$c = script$c;

  /* template */

    /* style */
    var __vue_inject_styles__$c = undefined;
    /* scoped */
    var __vue_scope_id__$c = undefined;
    /* module identifier */
    var __vue_module_identifier__$c = undefined;
    /* functional template */
    var __vue_is_functional_template__$c = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$c = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$c,
      __vue_script__$c,
      __vue_scope_id__$c,
      __vue_is_functional_template__$c,
      __vue_module_identifier__$c,
      false,
      undefined,
      undefined,
      undefined
    );

  //

  /**
   * Group together elements of the maps  including: markers, geoJSON, polylines and polygon, tooltip and popup.
   */
  var script$d = {
    name: 'LLayerGroup',
    mixins: [LayerGroupMixin, Options],
    data: function data() {
      return {
        ready: false,
      };
    },
    mounted: function mounted() {
      var this$1 = this;

      this.mapObject = leaflet.layerGroup();
      propsBinder(this, this.mapObject, this.$options.props);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      this.ready = true;
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
  };

  /* script */
  var __vue_script__$d = script$d;

  /* template */
  var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"display":"none"}},[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
  var __vue_staticRenderFns__$6 = [];

    /* style */
    var __vue_inject_styles__$d = undefined;
    /* scoped */
    var __vue_scope_id__$d = undefined;
    /* module identifier */
    var __vue_module_identifier__$d = undefined;
    /* functional template */
    var __vue_is_functional_template__$d = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$d = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$d,
      __vue_script__$d,
      __vue_scope_id__$d,
      __vue_is_functional_template__$d,
      __vue_module_identifier__$d,
      false,
      undefined,
      undefined,
      undefined
    );

  //

  /**
   * Base component, contains and wrap all the other components.
   */
  var script$e = {
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
        default: function () { return leaflet.CRS.EPSG3857; },
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
        lastSetCenter: this.center ? leaflet.latLng(this.center) : null,
        lastSetBounds: this.bounds ? leaflet.latLngBounds(this.bounds) : null,
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
      this.mapObject = leaflet.map(this.$el, options);
      if (this.bounds) {
        this.fitBounds(this.bounds);
      }
      this.debouncedMoveEndHandler = debounce(this.moveEndHandler, 100);
      this.mapObject.on('moveend', this.debouncedMoveEndHandler);
      this.mapObject.on('overlayadd', this.overlayAddHandler);
      this.mapObject.on('overlayremove', this.overlayRemoveHandler);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
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
        var newCenter = leaflet.latLng(newVal);
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
        var newBounds = leaflet.latLngBounds(newVal);
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
  var __vue_script__$e = script$e;

  /* template */
  var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue2leaflet-map"},[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
  var __vue_staticRenderFns__$7 = [];

    /* style */
    var __vue_inject_styles__$e = function (inject) {
      if (!inject) { return }
      inject("data-v-09f270aa_0", { source: ".vue2leaflet-map{height:100%;width:100%}", map: undefined, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$e = undefined;
    /* module identifier */
    var __vue_module_identifier__$e = undefined;
    /* functional template */
    var __vue_is_functional_template__$e = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$e = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$e,
      __vue_script__$e,
      __vue_scope_id__$e,
      __vue_is_functional_template__$e,
      __vue_module_identifier__$e,
      false,
      createInjector,
      undefined,
      undefined
    );

  /**
   * Marker component, lets you add and personalize markers on the map
   */
  var script$f = {
    name: 'LMarker',
    mixins: [Layer, Options],
    props: {
      pane: {
        type: String,
        default: 'markerPane',
      },
      draggable: {
        type: Boolean,
        custom: true,
        default: false,
      },
      latLng: {
        type: [Object, Array],
        custom: true,
        default: null,
      },
      icon: {
        type: [Object],
        custom: false,
        default: function () { return new leaflet.Icon.Default(); },
      },
      opacity: {
        type: Number,
        custom: false,
        default: 1.0,
      },
      zIndexOffset: {
        type: Number,
        custom: false,
        default: null,
      },
    },
    data: function data() {
      return {
        ready: false,
      };
    },
    beforeDestroy: function beforeDestroy() {
      if (this.debouncedLatLngSync) {
        this.debouncedLatLngSync.cancel();
      }
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(
        Object.assign({}, this.layerOptions,
          {icon: this.icon,
          zIndexOffset: this.zIndexOffset,
          draggable: this.draggable,
          opacity: this.opacity}),
        this
      );
      this.mapObject = leaflet.marker(this.latLng, options);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      this.debouncedLatLngSync = debounce(this.latLngSync, 100);
      this.mapObject.on('move', this.debouncedLatLngSync);
      propsBinder(this, this.mapObject, this.$options.props);
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.ready = true;
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
      setDraggable: function setDraggable(newVal, oldVal) {
        if (this.mapObject.dragging) {
          newVal
            ? this.mapObject.dragging.enable()
            : this.mapObject.dragging.disable();
        }
      },
      setLatLng: function setLatLng(newVal) {
        if (newVal == null) {
          return;
        }

        if (this.mapObject) {
          var oldLatLng = this.mapObject.getLatLng();
          var newLatLng = leaflet.latLng(newVal);
          if (
            newLatLng.lat !== oldLatLng.lat ||
            newLatLng.lng !== oldLatLng.lng
          ) {
            this.mapObject.setLatLng(newLatLng);
          }
        }
      },
      latLngSync: function latLngSync(event) {
        this.$emit('update:latLng', event.latlng);
        this.$emit('update:lat-lng', event.latlng);
      },
    },
    render: function(h) {
      if (this.ready && this.$slots.default) {
        return h('div', { style: { display: 'none' } }, this.$slots.default);
      }
      return null;
    },
  };

  /* script */
  var __vue_script__$f = script$f;

  /* template */

    /* style */
    var __vue_inject_styles__$f = undefined;
    /* scoped */
    var __vue_scope_id__$f = undefined;
    /* module identifier */
    var __vue_module_identifier__$f = undefined;
    /* functional template */
    var __vue_is_functional_template__$f = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$f = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$f,
      __vue_script__$f,
      __vue_scope_id__$f,
      __vue_is_functional_template__$f,
      __vue_module_identifier__$f,
      false,
      undefined,
      undefined,
      undefined
    );

  //

  /**
   * Easily draw a polygon on the map
   */
  var script$g = {
    name: 'LPolygon',
    mixins: [Polygon, Options],
    props: {
      latLngs: {
        type: Array,
        default: function () { return []; },
      },
    },
    data: function data() {
      return {
        ready: false,
      };
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(this.polygonOptions, this);
      this.mapObject = leaflet.polygon(this.latLngs, options);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.ready = true;
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
  };

  /* script */
  var __vue_script__$g = script$g;

  /* template */
  var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"display":"none"}},[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
  var __vue_staticRenderFns__$8 = [];

    /* style */
    var __vue_inject_styles__$g = undefined;
    /* scoped */
    var __vue_scope_id__$g = undefined;
    /* module identifier */
    var __vue_module_identifier__$g = undefined;
    /* functional template */
    var __vue_is_functional_template__$g = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$g = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$g,
      __vue_script__$g,
      __vue_scope_id__$g,
      __vue_is_functional_template__$g,
      __vue_module_identifier__$g,
      false,
      undefined,
      undefined,
      undefined
    );

  //

  /**
   * Easily draw a polyline on the map
   */
  var script$h = {
    name: 'LPolyline',
    mixins: [PolylineMixin, Options],
    props: {
      latLngs: {
        type: Array,
        default: function () { return []; },
      },
    },
    data: function data() {
      return {
        ready: false,
      };
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(this.polyLineOptions, this);
      this.mapObject = leaflet.polyline(this.latLngs, options);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.ready = true;
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
  };

  /* script */
  var __vue_script__$h = script$h;

  /* template */
  var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"display":"none"}},[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
  var __vue_staticRenderFns__$9 = [];

    /* style */
    var __vue_inject_styles__$h = undefined;
    /* scoped */
    var __vue_scope_id__$h = undefined;
    /* module identifier */
    var __vue_module_identifier__$h = undefined;
    /* functional template */
    var __vue_is_functional_template__$h = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$h = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$h,
      __vue_script__$h,
      __vue_scope_id__$h,
      __vue_is_functional_template__$h,
      __vue_module_identifier__$h,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * Display a popup on the map
   */
  var script$i = {
    name: 'LPopup',
    mixins: [Popper, Options],
    props: {
      latLng: {
        type: [Object, Array],
        default: function () { return []; },
      },
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(this.popperOptions, this);
      this.mapObject = leaflet.popup(options);
      if (this.latLng !== undefined) {
        this.mapObject.setLatLng(this.latLng);
      }
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.mapObject.setContent(this.content || this.$el);
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.mapObject.bindPopup(this.mapObject);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
    beforeDestroy: function beforeDestroy() {
      if (this.parentContainer) {
        if (this.parentContainer.unbindPopup) {
          this.parentContainer.unbindPopup();
        } else if (
          this.parentContainer.mapObject &&
          this.parentContainer.mapObject.unbindPopup
        ) {
          this.parentContainer.mapObject.unbindPopup();
        }
      }
    },
  };

  /* script */
  var __vue_script__$i = script$i;

  /* template */

    /* style */
    var __vue_inject_styles__$i = undefined;
    /* scoped */
    var __vue_scope_id__$i = undefined;
    /* module identifier */
    var __vue_module_identifier__$i = undefined;
    /* functional template */
    var __vue_is_functional_template__$i = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$i = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$i,
      __vue_script__$i,
      __vue_scope_id__$i,
      __vue_is_functional_template__$i,
      __vue_module_identifier__$i,
      false,
      undefined,
      undefined,
      undefined
    );

  //

  /**
   * Easily draw a rectangle on the map
   */
  var script$j = {
    name: 'LRectangle',
    mixins: [Polygon, Options],
    props: {
      bounds: {
        default: function () { return [[0,0],[0,0]]; },
        validator: function (value) { return value && leaflet.latLngBounds(value).isValid(); },
      },
    },
    data: function data() {
      return {
        ready: false,
      };
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(this.polygonOptions, this);
      this.mapObject = leaflet.rectangle(this.bounds, options);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.ready = true;
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
  };

  /* script */
  var __vue_script__$j = script$j;

  /* template */
  var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"display":"none"}},[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
  var __vue_staticRenderFns__$a = [];

    /* style */
    var __vue_inject_styles__$j = undefined;
    /* scoped */
    var __vue_scope_id__$j = undefined;
    /* module identifier */
    var __vue_module_identifier__$j = undefined;
    /* functional template */
    var __vue_is_functional_template__$j = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$j = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$j,
      __vue_script__$j,
      __vue_scope_id__$j,
      __vue_is_functional_template__$j,
      __vue_module_identifier__$j,
      false,
      undefined,
      undefined,
      undefined
    );

  //

  /**
   * Load tiles from a map server and display them accordingly to map zoom, center and size
   */
  var script$k = {
    name: 'LTileLayer',
    mixins: [TileLayerMixin, Options],
    props: {
      url: {
        type: String,
        default: null,
      },
      tileLayerClass: {
        type: Function,
        default: leaflet.tileLayer,
      },
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(this.tileLayerOptions, this);
      this.mapObject = this.tileLayerClass(this.url, options);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
  };

  /* script */
  var __vue_script__$k = script$k;

  /* template */
  var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
  var __vue_staticRenderFns__$b = [];

    /* style */
    var __vue_inject_styles__$k = undefined;
    /* scoped */
    var __vue_scope_id__$k = undefined;
    /* module identifier */
    var __vue_module_identifier__$k = undefined;
    /* functional template */
    var __vue_is_functional_template__$k = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$k = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
      __vue_inject_styles__$k,
      __vue_script__$k,
      __vue_scope_id__$k,
      __vue_is_functional_template__$k,
      __vue_module_identifier__$k,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * Display a tooltip on the map
   */
  var script$l = {
    name: 'LTooltip',
    mixins: [Popper, Options],
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(this.popperOptions, this);
      this.mapObject = leaflet.tooltip(options);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.mapObject.setContent(this.content || this.$el);
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.mapObject.bindTooltip(this.mapObject);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
    beforeDestroy: function beforeDestroy() {
      if (this.parentContainer) {
        if (this.parentContainer.unbindTooltip) {
          this.parentContainer.unbindTooltip();
        } else if (
          this.parentContainer.mapObject &&
          this.parentContainer.mapObject.unbindTooltip
        ) {
          this.parentContainer.mapObject.unbindTooltip();
        }
      }
    },
  };

  /* script */
  var __vue_script__$l = script$l;

  /* template */

    /* style */
    var __vue_inject_styles__$l = undefined;
    /* scoped */
    var __vue_scope_id__$l = undefined;
    /* module identifier */
    var __vue_module_identifier__$l = undefined;
    /* functional template */
    var __vue_is_functional_template__$l = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$l = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$l,
      __vue_script__$l,
      __vue_scope_id__$l,
      __vue_is_functional_template__$l,
      __vue_module_identifier__$l,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * Display WMS services as tile layers on the map
   */
  var script$m = {
    name: 'LWMSTileLayer',
    mixins: [TileLayerWMS, Options],
    props: {
      baseUrl: {
        type: String,
        default: null,
      },
    },
    mounted: function mounted() {
      var this$1 = this;

      var options = optionsMerger(this.tileLayerWMSOptions, this);
      this.mapObject = leaflet.tileLayer.wms(this.baseUrl, options);
      leaflet.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, this.$options.props);
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      this.$nextTick(function () {
        /**
         * Triggers when the component is ready
         * @type {object}
         * @property {object} mapObject - reference to leaflet map object
         */
        this$1.$emit('ready', this$1.mapObject);
      });
    },
  };

  /* script */
  var __vue_script__$m = script$m;

  /* template */

    /* style */
    var __vue_inject_styles__$m = undefined;
    /* scoped */
    var __vue_scope_id__$m = undefined;
    /* module identifier */
    var __vue_module_identifier__$m = undefined;
    /* functional template */
    var __vue_is_functional_template__$m = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$m = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$m,
      __vue_script__$m,
      __vue_scope_id__$m,
      __vue_is_functional_template__$m,
      __vue_module_identifier__$m,
      false,
      undefined,
      undefined,
      undefined
    );

  exports.CircleMixin = CircleMixin;
  exports.ControlMixin = ControlMixin;
  exports.GridLayerMixin = GridLayerMixin;
  exports.ImageOverlayMixin = ImageOverlayMixin;
  exports.InteractiveLayerMixin = InteractiveLayer;
  exports.LCircle = __vue_component__;
  exports.LCircleMarker = __vue_component__$1;
  exports.LControl = __vue_component__$2;
  exports.LControlAttribution = __vue_component__$3;
  exports.LControlLayers = __vue_component__$4;
  exports.LControlScale = __vue_component__$5;
  exports.LControlZoom = __vue_component__$6;
  exports.LFeatureGroup = __vue_component__$7;
  exports.LGeoJson = __vue_component__$8;
  exports.LGridLayer = __vue_component__$9;
  exports.LIcon = __vue_component__$a;
  exports.LIconDefault = __vue_component__$b;
  exports.LImageOverlay = __vue_component__$c;
  exports.LLayerGroup = __vue_component__$d;
  exports.LMap = __vue_component__$e;
  exports.LMarker = __vue_component__$f;
  exports.LPolygon = __vue_component__$g;
  exports.LPolyline = __vue_component__$h;
  exports.LPopup = __vue_component__$i;
  exports.LRectangle = __vue_component__$j;
  exports.LTileLayer = __vue_component__$k;
  exports.LTooltip = __vue_component__$l;
  exports.LWMSTileLayer = __vue_component__$m;
  exports.LayerGroupMixin = LayerGroupMixin;
  exports.LayerMixin = Layer;
  exports.OptionsMixin = Options;
  exports.PathMixin = Path;
  exports.PolygonMixin = Polygon;
  exports.PolylineMixin = PolylineMixin;
  exports.PopperMixin = Popper;
  exports.TileLayerMixin = TileLayerMixin;
  exports.TileLayerWMSMixin = TileLayerWMS;
  exports.capitalizeFirstLetter = capitalizeFirstLetter;
  exports.collectionCleaner = collectionCleaner;
  exports.debounce = debounce;
  exports.findRealParent = findRealParent;
  exports.optionsMerger = optionsMerger;
  exports.propsBinder = propsBinder;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
