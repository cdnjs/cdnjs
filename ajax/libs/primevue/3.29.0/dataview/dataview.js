this.primevue = this.primevue || {};
this.primevue.dataview = (function (BaseComponent, Paginator, utils, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var Paginator__default = /*#__PURE__*/_interopDefaultLegacy(Paginator);

    var script = {
        name: 'DataView',
        extends: BaseComponent__default["default"],
        emits: ['update:first', 'update:rows', 'page'],
        props: {
            value: {
                type: Array,
                default: null
            },
            layout: {
                type: String,
                default: 'list'
            },
            rows: {
                type: Number,
                default: 0
            },
            first: {
                type: Number,
                default: 0
            },
            totalRecords: {
                type: Number,
                default: 0
            },
            paginator: {
                type: Boolean,
                default: false
            },
            paginatorPosition: {
                type: String,
                default: 'bottom'
            },
            alwaysShowPaginator: {
                type: Boolean,
                default: true
            },
            paginatorTemplate: {
                type: String,
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
            },
            pageLinkSize: {
                type: Number,
                default: 5
            },
            rowsPerPageOptions: {
                type: Array,
                default: null
            },
            currentPageReportTemplate: {
                type: String,
                default: '({currentPage} of {totalPages})'
            },
            sortField: {
                type: [String, Function],
                default: null
            },
            sortOrder: {
                type: Number,
                default: null
            },
            lazy: {
                type: Boolean,
                default: false
            },
            dataKey: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                d_first: this.first,
                d_rows: this.rows
            };
        },
        watch: {
            first(newValue) {
                this.d_first = newValue;
            },
            rows(newValue) {
                this.d_rows = newValue;
            },
            sortField() {
                this.resetPage();
            },
            sortOrder() {
                this.resetPage();
            }
        },
        methods: {
            getKey(item, index) {
                return this.dataKey ? utils.ObjectUtils.resolveFieldData(item, this.dataKey) : index;
            },
            onPage(event) {
                this.d_first = event.first;
                this.d_rows = event.rows;

                this.$emit('update:first', this.d_first);
                this.$emit('update:rows', this.d_rows);
                this.$emit('page', event);
            },
            sort() {
                if (this.value) {
                    const value = [...this.value];

                    value.sort((data1, data2) => {
                        let value1 = utils.ObjectUtils.resolveFieldData(data1, this.sortField);
                        let value2 = utils.ObjectUtils.resolveFieldData(data2, this.sortField);
                        let result = null;

                        if (value1 == null && value2 != null) result = -1;
                        else if (value1 != null && value2 == null) result = 1;
                        else if (value1 == null && value2 == null) result = 0;
                        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });
                        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                        return this.sortOrder * result;
                    });

                    return value;
                } else {
                    return null;
                }
            },
            resetPage() {
                this.d_first = 0;
                this.$emit('update:first', this.d_first);
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-dataview p-component',
                    {
                        'p-dataview-list': this.layout === 'list',
                        'p-dataview-grid': this.layout === 'grid'
                    }
                ];
            },
            getTotalRecords() {
                if (this.totalRecords) return this.totalRecords;
                else return this.value ? this.value.length : 0;
            },
            empty() {
                return !this.value || this.value.length === 0;
            },
            paginatorTop() {
                return this.paginator && (this.paginatorPosition !== 'bottom' || this.paginatorPosition === 'both');
            },
            paginatorBottom() {
                return this.paginator && (this.paginatorPosition !== 'top' || this.paginatorPosition === 'both');
            },
            items() {
                if (this.value && this.value.length) {
                    let data = this.value;

                    if (data && data.length && this.sortField) {
                        data = this.sort();
                    }

                    if (this.paginator) {
                        const first = this.lazy ? 0 : this.d_first;

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
      const _component_DVPaginator = vue.resolveComponent("DVPaginator");

      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: $options.containerClass }, _ctx.ptm('root')), [
        (_ctx.$slots.header)
          ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: 0,
              class: "p-dataview-header"
            }, _ctx.ptm('header')), [
              vue.renderSlot(_ctx.$slots, "header")
            ], 16))
          : vue.createCommentVNode("", true),
        ($options.paginatorTop)
          ? (vue.openBlock(), vue.createBlock(_component_DVPaginator, {
              key: 1,
              rows: $data.d_rows,
              first: $data.d_first,
              totalRecords: $options.getTotalRecords,
              pageLinkSize: $props.pageLinkSize,
              template: $props.paginatorTemplate,
              rowsPerPageOptions: $props.rowsPerPageOptions,
              currentPageReportTemplate: $props.currentPageReportTemplate,
              class: vue.normalizeClass({ 'p-paginator-top': $options.paginatorTop }),
              alwaysShow: $props.alwaysShowPaginator,
              onPage: _cache[0] || (_cache[0] = $event => ($options.onPage($event))),
              pt: _ctx.ptm('paginator')
            }, vue.createSlots({ _: 2 }, [
              (_ctx.$slots.paginatorstart)
                ? {
                    name: "start",
                    fn: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "paginatorstart")
                    ]),
                    key: "0"
                  }
                : undefined,
              (_ctx.$slots.paginatorend)
                ? {
                    name: "end",
                    fn: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "paginatorend")
                    ]),
                    key: "1"
                  }
                : undefined
            ]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "pt"]))
          : vue.createCommentVNode("", true),
        vue.createElementVNode("div", vue.mergeProps({ class: "p-dataview-content" }, _ctx.ptm('content')), [
          vue.createElementVNode("div", vue.mergeProps({ class: "p-grid p-nogutter grid grid-nogutter" }, _ctx.ptm('grid')), [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.items, (item, index) => {
              return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                key: $options.getKey(item, index)
              }, [
                (_ctx.$slots.list && $props.layout === 'list')
                  ? vue.renderSlot(_ctx.$slots, "list", {
                      key: 0,
                      data: item,
                      index: index
                    })
                  : vue.createCommentVNode("", true),
                (_ctx.$slots.grid && $props.layout === 'grid')
                  ? vue.renderSlot(_ctx.$slots, "grid", {
                      key: 1,
                      data: item,
                      index: index
                    })
                  : vue.createCommentVNode("", true)
              ], 64))
            }), 128)),
            ($options.empty)
              ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 0,
                  class: "p-col col"
                }, _ctx.ptm('column')), [
                  vue.createElementVNode("div", vue.mergeProps({ class: "p-dataview-emptymessage" }, _ctx.ptm('emptyMessage')), [
                    vue.renderSlot(_ctx.$slots, "empty")
                  ], 16)
                ], 16))
              : vue.createCommentVNode("", true)
          ], 16)
        ], 16),
        ($options.paginatorBottom)
          ? (vue.openBlock(), vue.createBlock(_component_DVPaginator, {
              key: 2,
              rows: $data.d_rows,
              first: $data.d_first,
              totalRecords: $options.getTotalRecords,
              pageLinkSize: $props.pageLinkSize,
              template: $props.paginatorTemplate,
              rowsPerPageOptions: $props.rowsPerPageOptions,
              currentPageReportTemplate: $props.currentPageReportTemplate,
              class: vue.normalizeClass({ 'p-paginator-bottom': $options.paginatorBottom }),
              alwaysShow: $props.alwaysShowPaginator,
              onPage: _cache[1] || (_cache[1] = $event => ($options.onPage($event))),
              pt: _ctx.ptm('root')
            }, vue.createSlots({ _: 2 }, [
              (_ctx.$slots.paginatorstart)
                ? {
                    name: "start",
                    fn: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "paginatorstart")
                    ]),
                    key: "0"
                  }
                : undefined,
              (_ctx.$slots.paginatorend)
                ? {
                    name: "end",
                    fn: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "paginatorend")
                    ]),
                    key: "1"
                  }
                : undefined
            ]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "pt"]))
          : vue.createCommentVNode("", true),
        (_ctx.$slots.footer)
          ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: 3,
              class: "p-dataview-footer"
            }, _ctx.ptm('footer')), [
              vue.renderSlot(_ctx.$slots, "footer")
            ], 16))
          : vue.createCommentVNode("", true)
      ], 16))
    }

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.paginator, primevue.utils, Vue);
