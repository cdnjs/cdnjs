this.primevue = this.primevue || {};
this.primevue.dataview = (function (Paginator, utils, BaseComponent, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Paginator__default = /*#__PURE__*/_interopDefaultLegacy(Paginator);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-dataview p-component', {
          'p-dataview-list': props.layout === 'list',
          'p-dataview-grid': props.layout === 'grid'
        }];
      },
      header: 'p-dataview-header',
      paginator: function paginator(_ref2) {
        var instance = _ref2.instance;
        return instance.paginatorTop ? 'p-paginator-top' : instance.paginatorBottom ? 'p-paginator-bottom' : '';
      },
      content: 'p-dataview-content',
      grid: 'p-grid p-nogutter grid grid-nogutter',
      column: 'p-col col',
      emptyMessage: 'p-dataview-emptymessage',
      footer: 'p-dataview-footer'
    };
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
      css: {
        classes: classes
      },
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
            value.sort(function (data1, data2) {
              var value1 = utils.ObjectUtils.resolveFieldData(data1, _this.sortField);
              var value2 = utils.ObjectUtils.resolveFieldData(data2, _this.sortField);
              var result = null;
              if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, {
                numeric: true
              });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
              return _this.sortOrder * result;
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
      }, _ctx.ptm('root'), {
        "data-pc-name": "dataview"
      }), [_ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
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
      }, _ctx.ptm('content')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('grid')
      }, _ctx.ptm('grid')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.items, function (item, index) {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: $options.getKey(item, index)
        }, [_ctx.$slots.list && _ctx.layout === 'list' ? vue.renderSlot(_ctx.$slots, "list", {
          key: 0,
          data: item,
          index: index
        }) : vue.createCommentVNode("", true), _ctx.$slots.grid && _ctx.layout === 'grid' ? vue.renderSlot(_ctx.$slots, "grid", {
          key: 1,
          data: item,
          index: index
        }) : vue.createCommentVNode("", true)], 64);
      }), 128)), $options.empty ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        "class": _ctx.cx('column')
      }, _ctx.ptm('column')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('emptyMessage')
      }, _ctx.ptm('emptyMessage')), [vue.renderSlot(_ctx.$slots, "empty")], 16)], 16)) : vue.createCommentVNode("", true)], 16)], 16), $options.paginatorBottom ? (vue.openBlock(), vue.createBlock(_component_DVPaginator, {
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

})(primevue.paginator, primevue.utils, primevue.basecomponent, Vue);
