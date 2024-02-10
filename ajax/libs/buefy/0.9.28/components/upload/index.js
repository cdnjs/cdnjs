/*! Buefy v0.9.28 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Upload = {}));
})(this, (function (exports) { 'use strict';

    var config = {
      defaultContainerElement: null,
      defaultIconPack: 'mdi',
      defaultIconComponent: null,
      defaultIconPrev: 'chevron-left',
      defaultIconNext: 'chevron-right',
      defaultLocale: undefined,
      defaultDialogConfirmText: null,
      defaultDialogCancelText: null,
      defaultSnackbarDuration: 3500,
      defaultSnackbarPosition: null,
      defaultToastDuration: 2000,
      defaultToastPosition: null,
      defaultNotificationDuration: 2000,
      defaultNotificationPosition: null,
      defaultTooltipType: 'is-primary',
      defaultTooltipDelay: null,
      defaultTooltipCloseDelay: null,
      defaultSidebarDelay: null,
      defaultInputAutocomplete: 'on',
      defaultDateFormatter: null,
      defaultDateParser: null,
      defaultDateCreator: null,
      defaultTimeCreator: null,
      defaultDayNames: null,
      defaultMonthNames: null,
      defaultFirstDayOfWeek: null,
      defaultUnselectableDaysOfWeek: null,
      defaultTimeFormatter: null,
      defaultTimeParser: null,
      defaultModalCanCancel: ['escape', 'x', 'outside', 'button'],
      defaultModalScroll: null,
      defaultDatepickerMobileNative: true,
      defaultTimepickerMobileNative: true,
      defaultTimepickerMobileModal: true,
      defaultNoticeQueue: true,
      defaultInputHasCounter: true,
      defaultTaginputHasCounter: true,
      defaultUseHtml5Validation: true,
      defaultDropdownMobileModal: true,
      defaultFieldLabelPosition: null,
      defaultDatepickerYearsRange: [-100, 10],
      defaultDatepickerNearbyMonthDays: true,
      defaultDatepickerNearbySelectableMonthDays: false,
      defaultDatepickerShowWeekNumber: false,
      defaultDatepickerWeekNumberClickable: false,
      defaultDatepickerMobileModal: true,
      defaultTrapFocus: true,
      defaultAutoFocus: true,
      defaultButtonRounded: false,
      defaultSwitchRounded: true,
      defaultCarouselInterval: 3500,
      defaultTabsExpanded: false,
      defaultTabsAnimated: true,
      defaultTabsType: null,
      defaultStatusIcon: true,
      defaultProgrammaticPromise: false,
      defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
      defaultImageWebpFallback: null,
      defaultImageLazy: true,
      defaultImageResponsive: true,
      defaultImageRatio: null,
      defaultImageSrcsetFormatter: null,
      defaultBreadcrumbTag: 'a',
      defaultBreadcrumbAlign: 'is-left',
      defaultBreadcrumbSeparator: '',
      defaultBreadcrumbSize: 'is-medium',
      customIconPacks: null
    };

    function isVueComponent(c) {
      return c && c._isVue;
    }

    var FormElementMixin = {
      props: {
        size: String,
        expanded: Boolean,
        loading: Boolean,
        rounded: Boolean,
        icon: String,
        iconPack: String,
        // Native options to use in HTML5 validation
        autocomplete: String,
        maxlength: [Number, String],
        useHtml5Validation: {
          type: Boolean,
          default: function _default() {
            return config.defaultUseHtml5Validation;
          }
        },
        validationMessage: String,
        locale: {
          type: [String, Array],
          default: function _default() {
            return config.defaultLocale;
          }
        },
        statusIcon: {
          type: Boolean,
          default: function _default() {
            return config.defaultStatusIcon;
          }
        }
      },
      data: function data() {
        return {
          isValid: true,
          isFocused: false,
          newIconPack: this.iconPack || config.defaultIconPack
        };
      },
      computed: {
        /**
         * Find parent Field, max 3 levels deep.
         */
        parentField: function parentField() {
          var parent = this.$parent;
          for (var i = 0; i < 3; i++) {
            if (parent && !parent.$data._isField) {
              parent = parent.$parent;
            }
          }
          return parent;
        },
        /**
         * Get the type prop from parent if it's a Field.
         */
        statusType: function statusType() {
          var _ref = this.parentField || {},
            newType = _ref.newType;
          if (!newType) return;
          if (typeof newType === 'string') {
            return newType;
          } else {
            for (var key in newType) {
              if (newType[key]) {
                return key;
              }
            }
          }
        },
        /**
         * Get the message prop from parent if it's a Field.
         */
        statusMessage: function statusMessage() {
          if (!this.parentField) return;
          return this.parentField.newMessage || this.parentField.$slots.message;
        },
        /**
         * Fix icon size for inputs, large was too big
         */
        iconSize: function iconSize() {
          switch (this.size) {
            case 'is-small':
              return this.size;
            case 'is-medium':
              return;
            case 'is-large':
              return this.newIconPack === 'mdi' ? 'is-medium' : '';
          }
        }
      },
      methods: {
        /**
         * Focus method that work dynamically depending on the component.
         */
        focus: function focus() {
          var el = this.getElement();
          if (el === undefined) return;
          this.$nextTick(function () {
            if (el) el.focus();
          });
        },
        onBlur: function onBlur($event) {
          this.isFocused = false;
          this.$emit('blur', $event);
          this.checkHtml5Validity();
        },
        onFocus: function onFocus($event) {
          this.isFocused = true;
          this.$emit('focus', $event);
        },
        getElement: function getElement() {
          var el = this.$refs[this.$data._elementRef];
          while (isVueComponent(el)) {
            el = el.$refs[el.$data._elementRef];
          }
          return el;
        },
        setInvalid: function setInvalid() {
          var type = 'is-danger';
          var message = this.validationMessage || this.getElement().validationMessage;
          this.setValidity(type, message);
        },
        setValidity: function setValidity(type, message) {
          var _this = this;
          this.$nextTick(function () {
            if (_this.parentField) {
              // Set type only if not defined
              if (!_this.parentField.type) {
                _this.parentField.newType = type;
              }
              // Set message only if not defined
              if (!_this.parentField.message) {
                _this.parentField.newMessage = message;
              }
            }
          });
        },
        /**
         * Check HTML5 validation, set isValid property.
         * If validation fail, send 'is-danger' type,
         * and error message to parent if it's a Field.
         */
        checkHtml5Validity: function checkHtml5Validity() {
          if (!this.useHtml5Validation) return;
          var el = this.getElement();
          if (el === undefined) return;
          if (!el.checkValidity()) {
            this.setInvalid();
            this.isValid = false;
          } else {
            this.setValidity(null, null);
            this.isValid = true;
          }
          return this.isValid;
        }
      }
    };

    // Polyfills for SSR

    var isSSR = typeof window === 'undefined';
    var File = isSSR ? Object : window.File;

    //
    var script = {
      name: 'BUpload',
      mixins: [FormElementMixin],
      inheritAttrs: false,
      props: {
        value: {
          type: [Object, Function, File, Array]
        },
        multiple: Boolean,
        disabled: Boolean,
        accept: String,
        dragDrop: Boolean,
        type: {
          type: String,
          default: 'is-primary'
        },
        native: {
          type: Boolean,
          default: false
        },
        expanded: {
          type: Boolean,
          default: false
        },
        rounded: {
          type: Boolean,
          default: false
        }
      },
      data: function data() {
        return {
          newValue: this.value,
          dragDropFocus: false,
          _elementRef: 'input'
        };
      },
      watch: {
        /**
         *   When v-model is changed:
         *   1. Set internal value.
         *   2. Reset internal input file value
         *   3. If it's invalid, validate again.
         */
        value: function value(_value) {
          this.newValue = _value;
          if (!_value || Array.isArray(_value) && _value.length === 0) {
            this.$refs.input.value = null;
          }
          !this.isValid && !this.dragDrop && this.checkHtml5Validity();
        }
      },
      methods: {
        /**
        * Listen change event on input type 'file',
        * emit 'input' event and validate
        */
        onFileChange: function onFileChange(event) {
          if (this.disabled || this.loading) return;
          if (this.dragDrop) this.updateDragDropFocus(false);
          var value = event.target.files || event.dataTransfer.files;
          if (value.length === 0) {
            if (!this.newValue) return;
            if (this.native) this.newValue = null;
          } else if (!this.multiple) {
            // only one element in case drag drop mode and isn't multiple
            if (this.dragDrop && value.length !== 1) return;else {
              var file = value[0];
              if (this.checkType(file)) this.newValue = file;else if (this.newValue) {
                this.newValue = null;
                this.clearInput();
              } else {
                // Force input back to empty state and recheck validity
                this.clearInput();
                this.checkHtml5Validity();
                return;
              }
            }
          } else {
            // always new values if native or undefined local
            var newValues = false;
            if (this.native || !this.newValue) {
              this.newValue = [];
              newValues = true;
            }
            for (var i = 0; i < value.length; i++) {
              var _file = value[i];
              if (this.checkType(_file)) {
                this.newValue.push(_file);
                newValues = true;
              }
            }
            if (!newValues) return;
          }
          this.$emit('input', this.newValue);
          !this.dragDrop && this.checkHtml5Validity();
        },
        /*
        * Reset file input value
        */
        clearInput: function clearInput() {
          this.$refs.input.value = null;
        },
        /**
        * Listen drag-drop to update internal variable
        */
        updateDragDropFocus: function updateDragDropFocus(focus) {
          if (!this.disabled && !this.loading) {
            this.dragDropFocus = focus;
          }
        },
        /**
        * Check mime type of file
        */
        checkType: function checkType(file) {
          if (!this.accept) return true;
          var types = this.accept.split(',');
          if (types.length === 0) return true;
          var valid = false;
          for (var i = 0; i < types.length && !valid; i++) {
            var type = types[i].trim();
            if (type) {
              if (type.substring(0, 1) === '.') {
                // check extension
                var extension = file.name.toLowerCase().slice(-type.length);
                if (extension === type.toLowerCase()) {
                  valid = true;
                }
              } else {
                // check mime type
                if (file.type.match(type)) {
                  valid = true;
                }
              }
            }
          }
          if (!valid) this.$emit('invalid');
          return valid;
        }
      }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        const options = typeof script === 'function' ? script.options : script;
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
        let hook;
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
                const originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                const existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    /* script */
    const __vue_script__ = script;

    /* template */
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"upload control",class:{'is-expanded' : _vm.expanded, 'is-rounded' : _vm.rounded}},[(!_vm.dragDrop)?[_vm._t("default")]:_c('div',{staticClass:"upload-draggable",class:[_vm.type, {
                'is-loading': _vm.loading,
                'is-disabled': _vm.disabled,
                'is-hovered': _vm.dragDropFocus,
                'is-expanded': _vm.expanded,
            }],on:{"dragover":function($event){$event.preventDefault();return _vm.updateDragDropFocus(true)},"dragleave":function($event){$event.preventDefault();return _vm.updateDragDropFocus(false)},"dragenter":function($event){$event.preventDefault();return _vm.updateDragDropFocus(true)},"drop":function($event){$event.preventDefault();return _vm.onFileChange($event)}}},[_vm._t("default")],2),_c('input',_vm._b({ref:"input",attrs:{"type":"file","multiple":_vm.multiple,"accept":_vm.accept,"disabled":_vm.disabled},on:{"change":_vm.onFileChange}},'input',_vm.$attrs,false))],2)};
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
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = /*#__PURE__*/normalizeComponent(
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

      var Upload = __vue_component__;

    var use = function use(plugin) {
      if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin);
      }
    };
    var registerComponent = function registerComponent(Vue, component) {
      Vue.component(component.name, component);
    };

    var Plugin = {
      install: function install(Vue) {
        registerComponent(Vue, Upload);
      }
    };
    use(Plugin);

    exports.BUpload = Upload;
    exports["default"] = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
