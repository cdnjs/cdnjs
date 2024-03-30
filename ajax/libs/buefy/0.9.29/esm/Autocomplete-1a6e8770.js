import { _ as _defineProperty, l as _createForOfIteratorHelper, e as _toConsumableArray, b as _typeof } from './_rollupPluginBabelHelpers-df313029.js';
import { getValueByPath, toCssWidth, isCustomElement, createAbsoluteElement, removeElement } from './helpers.js';
import { F as FormElementMixin } from './FormElementMixin-b223d3c7.js';
import { I as Input } from './Input-20612b63.js';
import { n as normalizeComponent } from './plugins-218aea86.js';

var script = {
  name: 'BAutocomplete',
  components: _defineProperty({}, Input.name, Input),
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    value: [Number, String],
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    field: {
      type: String,
      default: 'value'
    },
    keepFirst: Boolean,
    clearOnSelect: Boolean,
    openOnFocus: Boolean,
    customFormatter: Function,
    checkInfiniteScroll: Boolean,
    keepOpen: Boolean,
    selectOnClickOutside: Boolean,
    clearable: Boolean,
    maxHeight: [String, Number],
    dropdownPosition: {
      type: String,
      default: 'auto'
    },
    groupField: String,
    groupOptions: String,
    iconRight: String,
    iconRightClickable: Boolean,
    appendToBody: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    confirmKeys: {
      type: Array,
      default: function _default() {
        return ['Tab', 'Enter'];
      }
    },
    selectableHeader: Boolean,
    selectableFooter: Boolean
  },
  data: function data() {
    return {
      selected: null,
      hovered: null,
      headerHovered: null,
      footerHovered: null,
      isActive: false,
      newValue: this.value,
      newAutocomplete: this.autocomplete || 'off',
      ariaAutocomplete: this.keepFirst ? 'both' : 'list',
      isListInViewportVertically: true,
      hasFocus: false,
      style: {},
      _isAutocomplete: true,
      _elementRef: 'input',
      _bodyEl: undefined,
      // Used to append to body
      timeOutID: null
    };
  },
  computed: {
    computedData: function computedData() {
      var _this = this;
      if (this.groupField) {
        if (this.groupOptions) {
          var newData = [];
          this.data.forEach(function (option) {
            var group = getValueByPath(option, _this.groupField);
            var items = getValueByPath(option, _this.groupOptions);
            newData.push({
              group: group,
              items: items
            });
          });
          return newData;
        } else {
          var tmp = {};
          this.data.forEach(function (option) {
            var group = getValueByPath(option, _this.groupField);
            if (!tmp[group]) tmp[group] = [];
            tmp[group].push(option);
          });
          var _newData = [];
          Object.keys(tmp).forEach(function (group) {
            _newData.push({
              group: group,
              items: tmp[group]
            });
          });
          return _newData;
        }
      }
      return [{
        items: this.data
      }];
    },
    isEmpty: function isEmpty() {
      if (!this.computedData) return true;
      return !this.computedData.some(function (element) {
        return element.items && element.items.length;
      });
    },
    /**
     * White-listed items to not close when clicked.
     * Add input, dropdown and all children.
     */
    whiteList: function whiteList() {
      var whiteList = [];
      whiteList.push(this.$refs.input.$el.querySelector('input'));
      whiteList.push(this.$refs.dropdown);
      // Add all children from dropdown
      if (this.$refs.dropdown !== undefined) {
        var children = this.$refs.dropdown.querySelectorAll('*');
        var _iterator = _createForOfIteratorHelper(children),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            whiteList.push(child);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      if (this.$parent.$data._isTaginput) {
        // Add taginput container
        whiteList.push(this.$parent.$el);
        // Add .tag and .delete
        var tagInputChildren = this.$parent.$el.querySelectorAll('*');
        var _iterator2 = _createForOfIteratorHelper(tagInputChildren),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var tagInputChild = _step2.value;
            whiteList.push(tagInputChild);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return whiteList;
    },
    /**
     * Check if exists default slot
     */
    hasDefaultSlot: function hasDefaultSlot() {
      return !!this.$scopedSlots.default;
    },
    /**
     * Check if exists group slot
     */
    hasGroupSlot: function hasGroupSlot() {
      return !!this.$scopedSlots.group;
    },
    /**
     * Check if exists "empty" slot
     */
    hasEmptySlot: function hasEmptySlot() {
      return !!this.$slots.empty;
    },
    /**
     * Check if exists "header" slot
     */
    hasHeaderSlot: function hasHeaderSlot() {
      return !!this.$slots.header;
    },
    /**
     * Check if exists "footer" slot
     */
    hasFooterSlot: function hasFooterSlot() {
      return !!this.$slots.footer;
    },
    /**
     * Apply dropdownPosition property
     */
    isOpenedTop: function isOpenedTop() {
      return this.dropdownPosition === 'top' || this.dropdownPosition === 'auto' && !this.isListInViewportVertically;
    },
    newIconRight: function newIconRight() {
      if (this.clearable && this.newValue) {
        return 'close-circle';
      }
      return this.iconRight;
    },
    newIconRightClickable: function newIconRightClickable() {
      if (this.clearable) {
        return true;
      }
      return this.iconRightClickable;
    },
    contentStyle: function contentStyle() {
      return {
        maxHeight: toCssWidth(this.maxHeight)
      };
    }
  },
  watch: {
    /**
     * When dropdown is toggled, check the visibility to know when
     * to open upwards.
     */
    isActive: function isActive(active) {
      var _this2 = this;
      if (this.dropdownPosition === 'auto') {
        if (active) {
          this.calcDropdownInViewportVertical();
        } else {
          // Timeout to wait for the animation to finish before recalculating
          this.timeOutID = setTimeout(function () {
            _this2.calcDropdownInViewportVertical();
          }, 100);
        }
      }
      this.$nextTick(function () {
        _this2.$emit('active', active);
      });
    },
    /**
     * When checkInfiniteScroll property changes scroll event should be removed or added
     */
    checkInfiniteScroll: function checkInfiniteScroll(_checkInfiniteScroll) {
      if ((this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')) === false) return;
      var list = this.$refs.dropdown.querySelector('.dropdown-content');
      if (_checkInfiniteScroll === true) {
        list.addEventListener('scroll', this.checkIfReachedTheEndOfScroll);
        return;
      }
      list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll);
    },
    /**
     * When updating input's value
     *   1. Emit changes
     *   2. If value isn't the same as selected, set null
     *   3. Close dropdown if value is clear or else open it
     */
    newValue: function newValue(value) {
      this.$emit('input', value);
      // Check if selected is invalid
      var currentValue = this.getValue(this.selected);
      if (currentValue && currentValue !== value) {
        this.setSelected(null, false);
      }
      // Close dropdown if input is clear or else open it
      if (this.hasFocus && (!this.openOnFocus || value)) {
        this.isActive = !!value;
      }
    },
    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    value: function value(_value) {
      this.newValue = _value;
    },
    /**
     * Select first option if "keep-first
     */
    data: function data() {
      var _this3 = this;
      // Keep first option always pre-selected
      if (this.keepFirst) {
        this.$nextTick(function () {
          if (_this3.isActive) {
            _this3.selectFirstOption(_this3.computedData);
          } else {
            _this3.setHovered(null);
          }
        });
      } else {
        if (this.hovered) {
          // reset hovered if list doesn't contain it
          var hoveredValue = this.getValue(this.hovered);
          var data = this.computedData.map(function (d) {
            return d.items;
          }).reduce(function (a, b) {
            return [].concat(_toConsumableArray(a), _toConsumableArray(b));
          }, []);
          if (!data.some(function (d) {
            return _this3.getValue(d) === hoveredValue;
          })) {
            this.setHovered(null);
          }
        }
      }
    }
  },
  methods: {
    /**
     * Set which option is currently hovered.
     */
    setHovered: function setHovered(option) {
      if (option === undefined) return;
      this.hovered = option;
    },
    /**
     * Set which option is currently selected, update v-model,
     * update input value and close dropdown.
     */
    setSelected: function setSelected(option) {
      var _this4 = this;
      var closeDropdown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      if (option === undefined) return;
      this.selected = option;
      this.$emit('select', this.selected, event);
      if (this.selected !== null) {
        if (this.clearOnSelect) {
          var input = this.$refs.input;
          input.newValue = '';
          input.$refs.input.value = '';
        } else {
          this.newValue = this.getValue(this.selected);
        }
        this.setHovered(null);
      }
      closeDropdown && this.$nextTick(function () {
        _this4.isActive = false;
      });
      this.checkValidity();
    },
    /**
     * Select first option
     */
    selectFirstOption: function selectFirstOption(computedData) {
      var _this5 = this;
      this.$nextTick(function () {
        var nonEmptyElements = computedData.filter(function (element) {
          return element.items && element.items.length;
        });
        if (nonEmptyElements.length) {
          var option = nonEmptyElements[0].items[0];
          _this5.setHovered(option);
        } else {
          _this5.setHovered(null);
        }
      });
    },
    keydown: function keydown(event) {
      var key = event.key; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
      // prevent emit submit event
      if (key === 'Enter') event.preventDefault();
      // Close dropdown on Tab & no hovered
      if (key === 'Escape' || key === 'Tab') {
        this.isActive = false;
      }
      if (this.confirmKeys.indexOf(key) >= 0) {
        // If adding by comma, don't add the comma to the input
        if (key === ',') event.preventDefault();
        // Close dropdown on select by Tab
        var closeDropdown = !this.keepOpen || key === 'Tab';
        if (this.hovered === null) {
          // header and footer uses headerHovered && footerHovered. If header or footer
          // was selected then fire event otherwise just return so a value isn't selected
          this.checkIfHeaderOrFooterSelected(event, null, closeDropdown);
          return;
        }
        this.setSelected(this.hovered, closeDropdown, event);
      }
    },
    selectHeaderOrFoterByClick: function selectHeaderOrFoterByClick(event, origin) {
      this.checkIfHeaderOrFooterSelected(event, {
        origin: origin
      });
    },
    /**
     * Check if header or footer was selected.
     */
    checkIfHeaderOrFooterSelected: function checkIfHeaderOrFooterSelected(event, triggerClick) {
      var closeDropdown = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (this.selectableHeader && (this.headerHovered || triggerClick && triggerClick.origin === 'header')) {
        this.$emit('select-header', event);
        this.headerHovered = false;
        if (triggerClick) this.setHovered(null);
        if (closeDropdown) this.isActive = false;
      }
      if (this.selectableFooter && (this.footerHovered || triggerClick && triggerClick.origin === 'footer')) {
        this.$emit('select-footer', event);
        this.footerHovered = false;
        if (triggerClick) this.setHovered(null);
        if (closeDropdown) this.isActive = false;
      }
    },
    /**
     * Close dropdown if clicked outside.
     */
    clickedOutside: function clickedOutside(event) {
      var target = isCustomElement(this) ? event.composedPath()[0] : event.target;
      if (!this.hasFocus && this.whiteList.indexOf(target) < 0) {
        if (this.keepFirst && this.hovered && this.selectOnClickOutside) {
          this.setSelected(this.hovered, true);
        } else {
          this.isActive = false;
        }
      }
    },
    /**
     * Return display text for the input.
     * If object, get value from path, or else just the value.
     */
    getValue: function getValue(option) {
      if (option === null) return;
      if (typeof this.customFormatter !== 'undefined') {
        return this.customFormatter(option);
      }
      return _typeof(option) === 'object' ? getValueByPath(option, this.field) : option;
    },
    /**
     * Check if the scroll list inside the dropdown
     * reached it's end.
     */
    checkIfReachedTheEndOfScroll: function checkIfReachedTheEndOfScroll() {
      var list = this.$refs.dropdown.querySelector('.dropdown-content');
      var footerHeight = this.hasFooterSlot ? list.querySelectorAll('div.dropdown-footer')[0].clientHeight : 0;
      if (list.clientHeight !== list.scrollHeight && list.scrollTop + list.parentElement.clientHeight + footerHeight >= list.scrollHeight) {
        this.$emit('infinite-scroll');
      }
    },
    /**
     * Calculate if the dropdown is vertically visible when activated,
     * otherwise it is openened upwards.
     */
    calcDropdownInViewportVertical: function calcDropdownInViewportVertical() {
      var _this6 = this;
      this.$nextTick(function () {
        /**
         * this.$refs.dropdown may be undefined
         * when Autocomplete is conditional rendered
         */
        if (_this6.$refs.dropdown === undefined) return;
        var rect = _this6.$refs.dropdown.getBoundingClientRect();
        _this6.isListInViewportVertically = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
        if (_this6.appendToBody) {
          _this6.updateAppendToBody();
        }
      });
    },
    /**
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
     */
    keyArrows: function keyArrows(direction) {
      var sum = direction === 'down' ? 1 : -1;
      if (this.isActive) {
        var data = this.computedData.map(function (d) {
          return d.items;
        }).reduce(function (a, b) {
          return [].concat(_toConsumableArray(a), _toConsumableArray(b));
        }, []);
        if (this.hasHeaderSlot && this.selectableHeader) {
          data.unshift(undefined);
        }
        if (this.hasFooterSlot && this.selectableFooter) {
          data.push(undefined);
        }
        var index;
        if (this.headerHovered) {
          index = 0 + sum;
        } else if (this.footerHovered) {
          index = data.length - 1 + sum;
        } else {
          index = data.indexOf(this.hovered) + sum;
        }
        index = index > data.length - 1 ? data.length - 1 : index;
        index = index < 0 ? 0 : index;
        this.footerHovered = false;
        this.headerHovered = false;
        this.setHovered(data[index] !== undefined ? data[index] : null);
        if (this.hasFooterSlot && this.selectableFooter && index === data.length - 1) {
          this.footerHovered = true;
        }
        if (this.hasHeaderSlot && this.selectableHeader && index === 0) {
          this.headerHovered = true;
        }
        var list = this.$refs.dropdown.querySelector('.dropdown-content');
        var querySelectorText = 'a.dropdown-item:not(.is-disabled)';
        if (this.hasHeaderSlot && this.selectableHeader) {
          querySelectorText += ',div.dropdown-header';
        }
        if (this.hasFooterSlot && this.selectableFooter) {
          querySelectorText += ',div.dropdown-footer';
        }
        var element = list.querySelectorAll(querySelectorText)[index];
        if (!element) return;
        var visMin = list.scrollTop;
        var visMax = list.scrollTop + list.clientHeight - element.clientHeight;
        if (element.offsetTop < visMin) {
          list.scrollTop = element.offsetTop;
        } else if (element.offsetTop >= visMax) {
          list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
        }
      } else {
        this.isActive = true;
      }
    },
    /**
     * Focus listener.
     * If value is the same as selected, select all text.
     */
    focused: function focused(event) {
      if (this.getValue(this.selected) === this.newValue) {
        this.$el.querySelector('input').select();
      }
      if (this.openOnFocus) {
        this.isActive = true;
        if (this.keepFirst) {
          // If open on focus, update the hovered
          this.selectFirstOption(this.computedData);
        }
      }
      this.hasFocus = true;
      this.$emit('focus', event);
    },
    /**
     * Blur listener.
     */
    onBlur: function onBlur(event) {
      this.hasFocus = false;
      this.$emit('blur', event);
    },
    onInput: function onInput() {
      var currentValue = this.getValue(this.selected);
      if (currentValue && currentValue === this.newValue) return;
      this.$emit('typing', this.newValue);
      this.checkValidity();
    },
    rightIconClick: function rightIconClick(event) {
      if (this.clearable) {
        this.newValue = '';
        this.setSelected(null, false);
        if (this.openOnFocus) {
          this.$refs.input.$el.focus();
        }
      } else {
        this.$emit('icon-right-click', event);
      }
    },
    checkValidity: function checkValidity() {
      var _this7 = this;
      if (this.useHtml5Validation) {
        this.$nextTick(function () {
          _this7.checkHtml5Validity();
        });
      }
    },
    updateAppendToBody: function updateAppendToBody() {
      var dropdownMenu = this.$refs.dropdown;
      var trigger = this.$parent.$data._isTaginput ? this.$parent.$el : this.$refs.input.$el;
      if (dropdownMenu && trigger) {
        // update wrapper dropdown
        var root = this.$data._bodyEl;
        root.classList.forEach(function (item) {
          return root.classList.remove(item);
        });
        root.classList.add('autocomplete');
        root.classList.add('control');
        if (this.expandend) {
          root.classList.add('is-expandend');
        }
        var rect = trigger.getBoundingClientRect();
        var top = rect.top + window.scrollY;
        var left = rect.left + window.scrollX;
        if (!this.isOpenedTop) {
          top += trigger.clientHeight;
        } else {
          top -= dropdownMenu.clientHeight;
        }
        this.style = {
          position: 'absolute',
          top: "".concat(top, "px"),
          left: "".concat(left, "px"),
          width: "".concat(trigger.clientWidth, "px"),
          maxWidth: "".concat(trigger.clientWidth, "px"),
          zIndex: '99'
        };
      }
    }
  },
  created: function created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', this.clickedOutside);
      if (this.dropdownPosition === 'auto') {
        window.addEventListener('resize', this.calcDropdownInViewportVertical);
      }
    }
  },
  mounted: function mounted() {
    if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')) {
      var list = this.$refs.dropdown.querySelector('.dropdown-content');
      list.addEventListener('scroll', this.checkIfReachedTheEndOfScroll);
    }
    if (this.appendToBody) {
      this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdown);
      this.updateAppendToBody();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', this.clickedOutside);
      if (this.dropdownPosition === 'auto') {
        window.removeEventListener('resize', this.calcDropdownInViewportVertical);
      }
    }
    if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')) {
      var list = this.$refs.dropdown.querySelector('.dropdown-content');
      list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll);
    }
    if (this.appendToBody) {
      removeElement(this.$data._bodyEl);
    }
    clearTimeout(this.timeOutID);
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"autocomplete control",class:{ 'is-expanded': _vm.expanded }},[_c('b-input',_vm._b({ref:"input",attrs:{"type":_vm.type,"size":_vm.size,"loading":_vm.loading,"rounded":_vm.rounded,"icon":_vm.icon,"icon-right":_vm.newIconRight,"icon-right-clickable":_vm.newIconRightClickable,"icon-pack":_vm.iconPack,"maxlength":_vm.maxlength,"autocomplete":_vm.newAutocomplete,"use-html5-validation":false,"aria-autocomplete":_vm.ariaAutocomplete},on:{"input":_vm.onInput,"focus":_vm.focused,"blur":_vm.onBlur,"icon-right-click":_vm.rightIconClick,"icon-click":function (event) { return _vm.$emit('icon-click', event); }},nativeOn:{"keydown":[function($event){return _vm.keydown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.keyArrows('up')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.keyArrows('down')}]},model:{value:(_vm.newValue),callback:function ($$v) {_vm.newValue=$$v;},expression:"newValue"}},'b-input',_vm.$attrs,false)),_c('transition',{attrs:{"name":"fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive && (!_vm.isEmpty || _vm.hasEmptySlot || _vm.hasHeaderSlot || _vm.hasFooterSlot)),expression:"isActive && (!isEmpty || hasEmptySlot || hasHeaderSlot || hasFooterSlot)"}],ref:"dropdown",staticClass:"dropdown-menu",class:{ 'is-opened-top': _vm.isOpenedTop && !_vm.appendToBody },style:(_vm.style)},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"dropdown-content",style:(_vm.contentStyle)},[(_vm.hasHeaderSlot)?_c('div',{staticClass:"dropdown-item dropdown-header",class:{ 'is-hovered': _vm.headerHovered },attrs:{"role":"button","tabindex":"0"},on:{"click":function($event){return _vm.selectHeaderOrFoterByClick($event, 'header')}}},[_vm._t("header")],2):_vm._e(),_vm._l((_vm.computedData),function(element,groupindex){return [(element.group)?_c('div',{key:groupindex + 'group',staticClass:"dropdown-item"},[(_vm.hasGroupSlot)?_vm._t("group",null,{"group":element.group,"index":groupindex}):_c('span',{staticClass:"has-text-weight-bold"},[_vm._v(" "+_vm._s(element.group)+" ")])],2):_vm._e(),_vm._l((element.items),function(option,index){return _c('a',{key:groupindex + ':' + index,staticClass:"dropdown-item",class:{ 'is-hovered': option === _vm.hovered },attrs:{"role":"button","tabindex":"0"},on:{"click":function($event){$event.stopPropagation();return _vm.setSelected(option, !_vm.keepOpen, $event)}}},[(_vm.hasDefaultSlot)?_vm._t("default",null,{"option":option,"index":index}):_c('span',[_vm._v(" "+_vm._s(_vm.getValue(option, true))+" ")])],2)})]}),(_vm.isEmpty && _vm.hasEmptySlot)?_c('div',{staticClass:"dropdown-item is-disabled"},[_vm._t("empty")],2):_vm._e(),(_vm.hasFooterSlot)?_c('div',{staticClass:"dropdown-item dropdown-footer",class:{ 'is-hovered': _vm.footerHovered },attrs:{"role":"button","tabindex":"0"},on:{"click":function($event){return _vm.selectHeaderOrFoterByClick($event, 'footer')}}},[_vm._t("footer")],2):_vm._e()],2)])])],1)};
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

  var Autocomplete = __vue_component__;

export { Autocomplete as A };
