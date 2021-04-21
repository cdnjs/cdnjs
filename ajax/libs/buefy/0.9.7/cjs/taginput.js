'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-14c82365.js');
var helpers = require('./helpers.js');
var __chunk_2 = require('./chunk-1bb51959.js');
var __chunk_3 = require('./chunk-330693d5.js');
require('./chunk-7f8af05c.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-99088816.js');
var __chunk_7 = require('./chunk-e321c12a.js');
var __chunk_27 = require('./chunk-430b5370.js');

var _components;
var script = {
  name: 'BTaginput',
  components: (_components = {}, __chunk_1._defineProperty(_components, __chunk_7.Autocomplete.name, __chunk_7.Autocomplete), __chunk_1._defineProperty(_components, __chunk_27.Tag.name, __chunk_27.Tag), _components),
  mixins: [__chunk_3.FormElementMixin],
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    type: String,
    closeType: String,
    rounded: {
      type: Boolean,
      default: false
    },
    attached: {
      type: Boolean,
      default: false
    },
    maxtags: {
      type: [Number, String],
      required: false
    },
    hasCounter: {
      type: Boolean,
      default: function _default() {
        return __chunk_2.config.defaultTaginputHasCounter;
      }
    },
    field: {
      type: String,
      default: 'value'
    },
    autocomplete: Boolean,
    groupField: String,
    groupOptions: String,
    nativeAutocomplete: String,
    openOnFocus: Boolean,
    disabled: Boolean,
    ellipsis: Boolean,
    closable: {
      type: Boolean,
      default: true
    },
    ariaCloseLabel: String,
    confirmKeys: {
      type: Array,
      default: function _default() {
        return [',', 'Tab', 'Enter'];
      }
    },
    removeOnKeys: {
      type: Array,
      default: function _default() {
        return ['Backspace'];
      }
    },
    allowNew: Boolean,
    onPasteSeparators: {
      type: Array,
      default: function _default() {
        return [','];
      }
    },
    beforeAdding: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    allowDuplicates: {
      type: Boolean,
      default: false
    },
    checkInfiniteScroll: {
      type: Boolean,
      default: false
    },
    createTag: {
      type: Function,
      default: function _default(tag) {
        return tag;
      }
    },
    appendToBody: Boolean
  },
  data: function data() {
    return {
      tags: Array.isArray(this.value) ? this.value.slice(0) : this.value || [],
      newTag: '',
      isComposing: false,
      _elementRef: 'autocomplete',
      _isTaginput: true
    };
  },
  computed: {
    rootClasses: function rootClasses() {
      return {
        'is-expanded': this.expanded
      };
    },
    containerClasses: function containerClasses() {
      return {
        'is-focused': this.isFocused,
        'is-focusable': this.hasInput
      };
    },
    valueLength: function valueLength() {
      return this.newTag.trim().length;
    },
    hasDefaultSlot: function hasDefaultSlot() {
      return !!this.$scopedSlots.default;
    },
    hasEmptySlot: function hasEmptySlot() {
      return !!this.$slots.empty;
    },
    hasHeaderSlot: function hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasFooterSlot: function hasFooterSlot() {
      return !!this.$slots.footer;
    },

    /**
     * Show the input field if a maxtags hasn't been set or reached.
     */
    hasInput: function hasInput() {
      return this.maxtags == null || this.maxtags === 1 || this.tagsLength < this.maxtags;
    },
    tagsLength: function tagsLength() {
      return this.tags.length;
    },

    /**
     * If Taginput has onPasteSeparators prop,
     * returning new RegExp used to split pasted string.
     */
    separatorsAsRegExp: function separatorsAsRegExp() {
      var sep = this.onPasteSeparators;
      return sep.length ? new RegExp(sep.map(function (s) {
        return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null;
      }).join('|'), 'g') : null;
    }
  },
  watch: {
    /**
     * When v-model is changed set internal value.
     */
    value: function value(_value) {
      this.tags = Array.isArray(_value) ? _value.slice(0) : _value || [];
    },
    hasInput: function hasInput() {
      if (!this.hasInput) this.onBlur();
    }
  },
  methods: {
    addTag: function addTag(tag) {
      var tagToAdd = tag || this.newTag.trim();

      if (tagToAdd) {
        if (!this.autocomplete) {
          var reg = this.separatorsAsRegExp;

          if (reg && tagToAdd.match(reg)) {
            tagToAdd.split(reg).map(function (t) {
              return t.trim();
            }).filter(function (t) {
              return t.length !== 0;
            }).map(this.addTag);
            return;
          }
        } // Add the tag input if it is not blank
        // or previously added (if not allowDuplicates).


        var add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true;

        if (add && this.beforeAdding(tagToAdd)) {
          if (this.maxtags === 1) {
            this.tags = []; // replace existing tag if only 1 is allowed
          }

          this.tags.push(this.createTag(tagToAdd));
          this.$emit('input', this.tags);
          this.$emit('add', tagToAdd);
        }
      }

      this.newTag = '';
    },
    getNormalizedTagText: function getNormalizedTagText(tag) {
      if (__chunk_1._typeof(tag) === 'object') {
        tag = helpers.getValueByPath(tag, this.field);
      }

      return "".concat(tag);
    },
    customOnBlur: function customOnBlur(event) {
      // Add tag on-blur if not select only
      if (!this.autocomplete) this.addTag();
      this.onBlur(event);
    },
    onSelect: function onSelect(option) {
      var _this = this;

      if (!option) return;
      this.addTag(option);
      this.$nextTick(function () {
        _this.newTag = '';
      });
    },
    removeTag: function removeTag(index, event) {
      var tag = this.tags.splice(index, 1)[0];
      this.$emit('input', this.tags);
      this.$emit('remove', tag);
      if (event) event.stopPropagation();

      if (this.openOnFocus && this.$refs.autocomplete) {
        this.$refs.autocomplete.focus();
      }

      return tag;
    },
    removeLastTag: function removeLastTag() {
      if (this.tagsLength > 0) {
        this.removeTag(this.tagsLength - 1);
      }
    },
    keydown: function keydown(event) {
      var key = event.key; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)

      if (this.removeOnKeys.indexOf(key) !== -1 && !this.newTag.length) {
        this.removeLastTag();
      } // Stop if is to accept select only


      if (this.autocomplete && !this.allowNew) return;

      if (this.confirmKeys.indexOf(key) >= 0) {
        // Allow Tab to advance to next field regardless
        if (key !== 'Tab') event.preventDefault();
        if (key === 'Enter' && this.isComposing) return;
        this.addTag();
      }
    },
    onTyping: function onTyping(event) {
      this.$emit('typing', event.trim());
    },
    emitInfiniteScroll: function emitInfiniteScroll() {
      this.$emit('infinite-scroll');
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"taginput control",class:_vm.rootClasses},[_c('div',{staticClass:"taginput-container",class:[_vm.statusType, _vm.size, _vm.containerClasses],attrs:{"disabled":_vm.disabled},on:{"click":function($event){_vm.hasInput && _vm.focus($event);}}},[_vm._t("selected",_vm._l((_vm.tags),function(tag,index){return _c('b-tag',{key:_vm.getNormalizedTagText(tag) + index,attrs:{"type":_vm.type,"close-type":_vm.closeType,"size":_vm.size,"rounded":_vm.rounded,"attached":_vm.attached,"tabstop":false,"disabled":_vm.disabled,"ellipsis":_vm.ellipsis,"closable":_vm.closable,"aria-close-label":_vm.ariaCloseLabel,"title":_vm.ellipsis && _vm.getNormalizedTagText(tag)},on:{"close":function($event){return _vm.removeTag(index, $event)}}},[_vm._t("tag",[_vm._v(" "+_vm._s(_vm.getNormalizedTagText(tag))+" ")],{"tag":tag})],2)}),{"tags":_vm.tags}),(_vm.hasInput)?_c('b-autocomplete',_vm._b({ref:"autocomplete",attrs:{"data":_vm.data,"field":_vm.field,"icon":_vm.icon,"icon-pack":_vm.iconPack,"maxlength":_vm.maxlength,"has-counter":false,"size":_vm.size,"disabled":_vm.disabled,"loading":_vm.loading,"autocomplete":_vm.nativeAutocomplete,"open-on-focus":_vm.openOnFocus,"keep-open":_vm.openOnFocus,"group-field":_vm.groupField,"group-options":_vm.groupOptions,"use-html5-validation":_vm.useHtml5Validation,"check-infinite-scroll":_vm.checkInfiniteScroll,"append-to-body":_vm.appendToBody,"confirm-keys":_vm.confirmKeys},on:{"typing":_vm.onTyping,"focus":_vm.onFocus,"blur":_vm.customOnBlur,"select":_vm.onSelect,"infinite-scroll":_vm.emitInfiniteScroll},nativeOn:{"keydown":function($event){return _vm.keydown($event)},"compositionstart":function($event){_vm.isComposing = true;},"compositionend":function($event){_vm.isComposing = false;}},scopedSlots:_vm._u([(_vm.hasHeaderSlot)?{key:"header",fn:function(){return [_vm._t("header")]},proxy:true}:null,(_vm.hasDefaultSlot)?{key:"default",fn:function(props){return [_vm._t("default",null,{"option":props.option,"index":props.index})]}}:null,(_vm.hasEmptySlot)?{key:"empty",fn:function(){return [_vm._t("empty")]},proxy:true}:null,(_vm.hasFooterSlot)?{key:"footer",fn:function(){return [_vm._t("footer")]},proxy:true}:null],null,true),model:{value:(_vm.newTag),callback:function ($$v) {_vm.newTag=$$v;},expression:"newTag"}},'b-autocomplete',_vm.$attrs,false)):_vm._e()],2),(_vm.hasCounter && (_vm.maxtags || _vm.maxlength))?_c('small',{staticClass:"help counter"},[(_vm.maxlength && _vm.valueLength > 0)?[_vm._v(" "+_vm._s(_vm.valueLength)+" / "+_vm._s(_vm.maxlength)+" ")]:(_vm.maxtags)?[_vm._v(" "+_vm._s(_vm.tagsLength)+" / "+_vm._s(_vm.maxtags)+" ")]:_vm._e()],2):_vm._e()])};
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
  

  
  var Taginput = __chunk_5.__vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, Taginput);
  }
};
__chunk_5.use(Plugin);

exports.BTaginput = Taginput;
exports.default = Plugin;
