this.primevue = this.primevue || {};
this.primevue.dataview = (function (Paginator, utils, BaseComponent, DataViewStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Paginator__default = /*#__PURE__*/_interopDefaultLegacy(Paginator);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var DataViewStyle__default = /*#__PURE__*/_interopDefaultLegacy(DataViewStyle);

    var script$1 = {
      name: 'BaseDataView',
      "extends": BaseComponent__default["default"],
      props: {
        value: {
          type: Array,
          "default": null
        },
        layout: {
          type: String,
          "default": 'list'
        },
        rows: {
          type: Number,
          "default": 0
        },
        first: {
          type: Number,
          "default": 0
        },
        totalRecords: {
          type: Number,
          "default": 0
        },
        paginator: {
          type: Boolean,
          "default": false
        },
        paginatorPosition: {
          type: String,
          "default": 'bottom'
        },
        alwaysShowPaginator: {
          type: Boolean,
          "default": true
        },
        paginatorTemplate: {
          type: String,
          "default": 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
        },
        pageLinkSize: {
          type: Number,
          "default": 5
        },
        rowsPerPageOptions: {
          type: Array,
          "default": null
        },
        currentPageReportTemplate: {
          type: String,
          "default": '({currentPage} of {totalPages})'
        },
        sortField: {
          type: [String, Function],
          "default": null
        },
        sortOrder: {
          type: Number,
          "default": null
        },
        lazy: {
          type: Boolean,
          "default": false
        },
        dataKey: {
          type: String,
          "default": null
        }
      },
      style: DataViewStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    var script = {
      name: 'DataView',
      "extends": script$1,
      inheritAttrs: false,
      emits: ['update:first', 'update:rows', 'page'],
      data: function data() {
        return {
          d_first: this.first,
          d_rows: this.rows
        };
      },
      watch: {
        first: function first(newValue) {
          this.d_first = newValue;
        },
        rows: function rows(newValue) {
          this.d_rows = newValue;
        },
        sortField: function sortField() {
          this.resetPage();
        },
        sortOrder: function sortOrder() {
          this.resetPage();
        }
      },
      methods: {
        getKey: function getKey(item, index) {
          return this.dataKey ? utils.ObjectUtils.resolveFieldData(item, this.dataKey) : index;
        },
        onPage: function onPage(event) {
          this.d_first = event.first;
          this.d_rows = event.rows;
          this.$emit('update:first', this.d_first);
          this.$emit('update:rows', this.d_rows);
          this.$emit('page', event);
        },
        sort: function sort() {
          var _this = this;
          if (this.value) {
            var value = _toConsumableArray(this.value);
            var comparer = utils.ObjectUtils.localeComparator();
            value.sort(function (data1, data2) {
              var value1 = utils.ObjectUtils.resolveFieldData(data1, _this.sortField);
              var value2 = utils.ObjectUtils.resolveFieldData(data2, _this.sortField);
              return utils.ObjectUtils.sort(value1, value2, _this.sortOrder, comparer);
            });
            return value;
          } else {
            return null;
          }
        },
        resetPage: function resetPage() {
          this.d_first = 0;
          this.$emit('update:first', this.d_first);
        }
      },
      computed: {
        getTotalRecords: function getTotalRecords() {
          if (this.totalRecords) return this.totalRecords;else return this.value ? this.value.length : 0;
        },
        empty: function empty() {
          return !this.value || this.value.length === 0;
        },
        emptyMessageText: function emptyMessageText() {
          var _this$$primevue$confi;
          return ((_this$$primevue$confi = this.$primevue.config) === null || _this$$primevue$confi === void 0 || (_this$$primevue$confi = _this$$primevue$confi.locale) === null || _this$$primevue$confi === void 0 ? void 0 : _this$$primevue$confi.emptyMessage) || '';
        },
        paginatorTop: function paginatorTop() {
          return this.paginator && (this.paginatorPosition !== 'bottom' || this.paginatorPosition === 'both');
        },
        paginatorBottom: function paginatorBottom() {
          return this.paginator && (this.paginatorPosition !== 'top' || this.paginatorPosition === 'both');
        },
        items: function items() {
          if (this.value && this.value.length) {
            var data = this.value;
            if (data && data.length && this.sortField) {
              data = this.sort();
            }
            if (this.paginator) {
              var first = this.lazy ? 0 : this.d_first;
              return data.slice(first, first + this.d_rows);
            } else {
              return data;
            }
          } else {
            return null;
          }
        }
      },
      components: {
        DVPaginator: Paginator__default["default"]
      }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_DVPaginator = vue.resolveComponent("DVPaginator");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root')
      }, _ctx.ptmi('root')), [_ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        "class": _ctx.cx('header')
      }, _ctx.ptm('header')), [vue.renderSlot(_ctx.$slots, "header")], 16)) : vue.createCommentVNode("", true), $options.paginatorTop ? (vue.openBlock(), vue.createBlock(_component_DVPaginator, {
        key: 1,
        rows: $data.d_rows,
        first: $data.d_first,
        totalRecords: $options.getTotalRecords,
        pageLinkSize: _ctx.pageLinkSize,
        template: _ctx.paginatorTemplate,
        rowsPerPageOptions: _ctx.rowsPerPageOptions,
        currentPageReportTemplate: _ctx.currentPageReportTemplate,
        "class": vue.normalizeClass(_ctx.cx('paginator')),
        alwaysShow: _ctx.alwaysShowPaginator,
        onPage: _cache[0] || (_cache[0] = function ($event) {
          return $options.onPage($event);
        }),
        unstyled: _ctx.unstyled,
        pt: _ctx.ptm('paginator')
      }, vue.createSlots({
        _: 2
      }, [_ctx.$slots.paginatorstart ? {
        name: "start",
        fn: vue.withCtx(function () {
          return [vue.renderSlot(_ctx.$slots, "paginatorstart")];
        }),
        key: "0"
      } : undefined, _ctx.$slots.paginatorend ? {
        name: "end",
        fn: vue.withCtx(function () {
          return [vue.renderSlot(_ctx.$slots, "paginatorend")];
        }),
        key: "1"
      } : undefined]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "unstyled", "pt"])) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('content')
      }, _ctx.ptm('content')), [!$options.empty ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
        key: 0
      }, [_ctx.$slots.list && _ctx.layout === 'list' ? vue.renderSlot(_ctx.$slots, "list", {
        key: 0,
        items: $options.items
      }) : vue.createCommentVNode("", true), _ctx.$slots.grid && _ctx.layout === 'grid' ? vue.renderSlot(_ctx.$slots, "grid", {
        key: 1,
        items: $options.items
      }) : vue.createCommentVNode("", true)], 64)) : (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 1,
        "class": _ctx.cx('emptyMessage')
      }, _ctx.ptm('emptyMessage')), [vue.renderSlot(_ctx.$slots, "empty", {
        layout: _ctx.layout
      }, function () {
        return [vue.createTextVNode(vue.toDisplayString($options.emptyMessageText), 1)];
      })], 16))], 16), $options.paginatorBottom ? (vue.openBlock(), vue.createBlock(_component_DVPaginator, {
        key: 2,
        rows: $data.d_rows,
        first: $data.d_first,
        totalRecords: $options.getTotalRecords,
        pageLinkSize: _ctx.pageLinkSize,
        template: _ctx.paginatorTemplate,
        rowsPerPageOptions: _ctx.rowsPerPageOptions,
        currentPageReportTemplate: _ctx.currentPageReportTemplate,
        "class": vue.normalizeClass(_ctx.cx('paginator')),
        alwaysShow: _ctx.alwaysShowPaginator,
        onPage: _cache[1] || (_cache[1] = function ($event) {
          return $options.onPage($event);
        }),
        unstyled: _ctx.unstyled,
        pt: _ctx.ptm('paginator')
      }, vue.createSlots({
        _: 2
      }, [_ctx.$slots.paginatorstart ? {
        name: "start",
        fn: vue.withCtx(function () {
          return [vue.renderSlot(_ctx.$slots, "paginatorstart")];
        }),
        key: "0"
      } : undefined, _ctx.$slots.paginatorend ? {
        name: "end",
        fn: vue.withCtx(function () {
          return [vue.renderSlot(_ctx.$slots, "paginatorend")];
        }),
        key: "1"
      } : undefined]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "unstyled", "pt"])) : vue.createCommentVNode("", true), _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 3,
        "class": _ctx.cx('footer')
      }, _ctx.ptm('footer')), [vue.renderSlot(_ctx.$slots, "footer")], 16)) : vue.createCommentVNode("", true)], 16);
    }

    script.render = render;

    return script;

})(primevue.paginator, primevue.utils, primevue.basecomponent, primevue.dataview.style, Vue);
