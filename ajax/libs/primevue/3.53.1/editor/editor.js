this.primevue = this.primevue || {};
this.primevue.editor = (function (utils, BaseComponent, EditorStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var EditorStyle__default = /*#__PURE__*/_interopDefaultLegacy(EditorStyle);

    var script$1 = {
      name: 'BaseEditor',
      "extends": BaseComponent__default["default"],
      props: {
        modelValue: String,
        placeholder: String,
        readonly: Boolean,
        formats: Array,
        editorStyle: null,
        modules: null
      },
      style: EditorStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      },
      beforeMount: function beforeMount() {
        var _this$$primevue;
        EditorStyle__default["default"].loadStyle({
          nonce: (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.csp) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.nonce
        });
      }
    };

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var QuillJS = function () {
      try {
        return window.Quill;
      } catch (_unused) {
        return null;
      }
    }();
    var script = {
      name: 'Editor',
      "extends": script$1,
      inheritAttrs: false,
      emits: ['update:modelValue', 'text-change', 'selection-change', 'load'],
      data: function data() {
        return {
          reRenderColorKey: 0
        };
      },
      quill: null,
      watch: {
        modelValue: function modelValue(newValue, oldValue) {
          if (newValue !== oldValue && this.quill && !this.quill.hasFocus()) {
            this.reRenderColorKey++;
            this.renderValue(newValue);
          }
        },
        readonly: function readonly() {
          this.handleReadOnlyChange();
        }
      },
      mounted: function mounted() {
        var _this = this;
        var configuration = {
          modules: _objectSpread({
            toolbar: this.$refs.toolbarElement
          }, this.modules),
          readOnly: this.readonly,
          theme: 'snow',
          formats: this.formats,
          placeholder: this.placeholder
        };
        if (QuillJS) {
          // Loaded by script only
          this.quill = new QuillJS(this.$refs.editorElement, configuration);
          this.initQuill();
          this.handleLoad();
        } else {
          import('quill').then(function (module) {
            if (module && utils.DomHandler.isExist(_this.$refs.editorElement)) {
              if (module["default"]) {
                // webpack
                _this.quill = new module["default"](_this.$refs.editorElement, configuration);
              } else {
                // parceljs
                _this.quill = new module(_this.$refs.editorElement, configuration);
              }
              _this.initQuill();
            }
          }).then(function () {
            _this.handleLoad();
          });
        }
      },
      beforeUnmount: function beforeUnmount() {
        this.quill = null;
      },
      methods: {
        renderValue: function renderValue(value) {
          if (this.quill) {
            if (value) this.quill.setContents(this.quill.clipboard.convert(value));else this.quill.setText('');
          }
        },
        initQuill: function initQuill() {
          var _this2 = this;
          this.renderValue(this.modelValue);
          this.quill.on('text-change', function (delta, oldContents, source) {
            if (source === 'user') {
              var html = _this2.$refs.editorElement.children[0].innerHTML;
              var text = _this2.quill.getText().trim();
              if (html === '<p><br></p>') {
                html = '';
              }
              _this2.$emit('update:modelValue', html);
              _this2.$emit('text-change', {
                htmlValue: html,
                textValue: text,
                delta: delta,
                source: source,
                instance: _this2.quill
              });
            }
          });
          this.quill.on('selection-change', function (range, oldRange, source) {
            var html = _this2.$refs.editorElement.children[0].innerHTML;
            var text = _this2.quill.getText().trim();
            _this2.$emit('selection-change', {
              htmlValue: html,
              textValue: text,
              range: range,
              oldRange: oldRange,
              source: source,
              instance: _this2.quill
            });
          });
        },
        handleLoad: function handleLoad() {
          if (this.quill && this.quill.getModule('toolbar')) {
            this.$emit('load', {
              instance: this.quill
            });
          }
        },
        handleReadOnlyChange: function handleReadOnlyChange() {
          if (this.quill) this.quill.enable(!this.readonly);
        }
      }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root')
      }, _ctx.ptmi('root')), [vue.createElementVNode("div", vue.mergeProps({
        ref: "toolbarElement",
        "class": _ctx.cx('toolbar')
      }, _ctx.ptm('toolbar')), [vue.renderSlot(_ctx.$slots, "toolbar", {}, function () {
        return [vue.createElementVNode("span", vue.mergeProps({
          "class": "ql-formats"
        }, _ctx.ptm('formats')), [vue.createElementVNode("select", vue.mergeProps({
          "class": "ql-header",
          defaultValue: "0"
        }, _ctx.ptm('header')), [vue.createElementVNode("option", vue.mergeProps({
          value: "1"
        }, _ctx.ptm('option')), "Heading", 16), vue.createElementVNode("option", vue.mergeProps({
          value: "2"
        }, _ctx.ptm('option')), "Subheading", 16), vue.createElementVNode("option", vue.mergeProps({
          value: "0"
        }, _ctx.ptm('option')), "Normal", 16)], 16), vue.createElementVNode("select", vue.mergeProps({
          "class": "ql-font"
        }, _ctx.ptm('font')), [vue.createElementVNode("option", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('option'))), null, 16), vue.createElementVNode("option", vue.mergeProps({
          value: "serif"
        }, _ctx.ptm('option')), null, 16), vue.createElementVNode("option", vue.mergeProps({
          value: "monospace"
        }, _ctx.ptm('option')), null, 16)], 16)], 16), vue.createElementVNode("span", vue.mergeProps({
          "class": "ql-formats"
        }, _ctx.ptm('formats')), [vue.createElementVNode("button", vue.mergeProps({
          "class": "ql-bold",
          type: "button"
        }, _ctx.ptm('bold')), null, 16), vue.createElementVNode("button", vue.mergeProps({
          "class": "ql-italic",
          type: "button"
        }, _ctx.ptm('italic')), null, 16), vue.createElementVNode("button", vue.mergeProps({
          "class": "ql-underline",
          type: "button"
        }, _ctx.ptm('underline')), null, 16)], 16), (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: $data.reRenderColorKey,
          "class": "ql-formats"
        }, _ctx.ptm('formats')), [vue.createElementVNode("select", vue.mergeProps({
          "class": "ql-color"
        }, _ctx.ptm('color')), null, 16), vue.createElementVNode("select", vue.mergeProps({
          "class": "ql-background"
        }, _ctx.ptm('background')), null, 16)], 16)), vue.createElementVNode("span", vue.mergeProps({
          "class": "ql-formats"
        }, _ctx.ptm('formats')), [vue.createElementVNode("button", vue.mergeProps({
          "class": "ql-list",
          value: "ordered",
          type: "button"
        }, _ctx.ptm('list')), null, 16), vue.createElementVNode("button", vue.mergeProps({
          "class": "ql-list",
          value: "bullet",
          type: "button"
        }, _ctx.ptm('list')), null, 16), vue.createElementVNode("select", vue.mergeProps({
          "class": "ql-align"
        }, _ctx.ptm('select')), [vue.createElementVNode("option", vue.mergeProps({
          defaultValue: ""
        }, _ctx.ptm('option')), null, 16), vue.createElementVNode("option", vue.mergeProps({
          value: "center"
        }, _ctx.ptm('option')), null, 16), vue.createElementVNode("option", vue.mergeProps({
          value: "right"
        }, _ctx.ptm('option')), null, 16), vue.createElementVNode("option", vue.mergeProps({
          value: "justify"
        }, _ctx.ptm('option')), null, 16)], 16)], 16), vue.createElementVNode("span", vue.mergeProps({
          "class": "ql-formats"
        }, _ctx.ptm('formats')), [vue.createElementVNode("button", vue.mergeProps({
          "class": "ql-link",
          type: "button"
        }, _ctx.ptm('link')), null, 16), vue.createElementVNode("button", vue.mergeProps({
          "class": "ql-image",
          type: "button"
        }, _ctx.ptm('image')), null, 16), vue.createElementVNode("button", vue.mergeProps({
          "class": "ql-code-block",
          type: "button"
        }, _ctx.ptm('codeBlock')), null, 16)], 16), vue.createElementVNode("span", vue.mergeProps({
          "class": "ql-formats"
        }, _ctx.ptm('formats')), [vue.createElementVNode("button", vue.mergeProps({
          "class": "ql-clean",
          type: "button"
        }, _ctx.ptm('clean')), null, 16)], 16)];
      })], 16), vue.createElementVNode("div", vue.mergeProps({
        ref: "editorElement",
        "class": _ctx.cx('content'),
        style: _ctx.editorStyle
      }, _ctx.ptm('content')), null, 16)], 16);
    }

    script.render = render;

    return script;

})(primevue.utils, primevue.basecomponent, primevue.editor.style, Vue);
