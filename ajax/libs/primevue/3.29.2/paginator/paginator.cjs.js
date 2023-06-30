'use strict';

var BaseComponent = require('primevue/basecomponent');
var utils = require('primevue/utils');
var vue = require('vue');
var AngleDoubleLeftIcon = require('primevue/icons/angledoubleleft');
var Ripple = require('primevue/ripple');
var Dropdown = require('primevue/dropdown');
var InputNumber = require('primevue/inputnumber');
var AngleDoubleRightIcon = require('primevue/icons/angledoubleright');
var AngleRightIcon = require('primevue/icons/angleright');
var AngleLeftIcon = require('primevue/icons/angleleft');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var AngleDoubleLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleLeftIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var Dropdown__default = /*#__PURE__*/_interopDefaultLegacy(Dropdown);
var InputNumber__default = /*#__PURE__*/_interopDefaultLegacy(InputNumber);
var AngleDoubleRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleDoubleRightIcon);
var AngleRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleRightIcon);
var AngleLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(AngleLeftIcon);

var script$9 = {
    name: 'CurrentPageReport',
    extends: BaseComponent__default["default"],
    props: {
        pageCount: {
            type: Number,
            default: 0
        },
        currentPage: {
            type: Number,
            default: 0
        },
        page: {
            type: Number,
            default: 0
        },
        first: {
            type: Number,
            default: 0
        },
        rows: {
            type: Number,
            default: 0
        },
        totalRecords: {
            type: Number,
            default: 0
        },
        template: {
            type: String,
            default: '({currentPage} of {totalPages})'
        }
    },
    computed: {
        text() {
            let text = this.template
                .replace('{currentPage}', this.currentPage)
                .replace('{totalPages}', this.pageCount)
                .replace('{first}', this.pageCount > 0 ? this.first + 1 : 0)
                .replace('{last}', Math.min(this.first + this.rows, this.totalRecords))
                .replace('{rows}', this.rows)
                .replace('{totalRecords}', this.totalRecords);

            return text;
        }
    }
};

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({ class: "p-paginator-current" }, _ctx.ptm('current')), vue.toDisplayString($options.text), 17))
}

script$9.render = render$9;

var script$8 = {
    name: 'FirstPageLink',
    extends: BaseComponent__default["default"],
    props: {
        template: {
            type: Function,
            default: null
        }
    },
    methods: {
        getPTOptions(key) {
            return this.ptm(key, {
                context: {
                    disabled: this.$attrs.disabled
                }
            });
        }
    },
    computed: {
        containerClass() {
            return [
                'p-paginator-first p-paginator-element p-link',
                {
                    'p-disabled': this.$attrs.disabled
                }
            ];
        }
    },
    components: {
        AngleDoubleLeftIcon: AngleDoubleLeftIcon__default["default"]
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue.resolveDirective("ripple");

  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    class: $options.containerClass,
    type: "button"
  }, $options.getPTOptions('firstPageButton')), [
    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.template || 'AngleDoubleLeftIcon'), vue.mergeProps({ class: "p-paginator-icon" }, $options.getPTOptions('firstPageIcon')), null, 16))
  ], 16)), [
    [_directive_ripple]
  ])
}

script$8.render = render$8;

var script$7 = {
    name: 'JumpToPageDropdown',
    extends: BaseComponent__default["default"],
    emits: ['page-change'],
    props: {
        page: Number,
        pageCount: Number,
        disabled: Boolean
    },
    methods: {
        onChange(value) {
            this.$emit('page-change', value);
        }
    },
    computed: {
        pageOptions() {
            let opts = [];

            for (let i = 0; i < this.pageCount; i++) {
                opts.push({ label: String(i + 1), value: i });
            }

            return opts;
        }
    },
    components: {
        JTPDropdown: Dropdown__default["default"]
    }
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_JTPDropdown = vue.resolveComponent("JTPDropdown");

  return (vue.openBlock(), vue.createBlock(_component_JTPDropdown, {
    modelValue: $props.page,
    options: $options.pageOptions,
    optionLabel: "label",
    optionValue: "value",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ($options.onChange($event))),
    class: "p-paginator-page-options",
    disabled: $props.disabled,
    pt: _ctx.ptm('JTPDropdown')
  }, null, 8, ["modelValue", "options", "disabled", "pt"]))
}

script$7.render = render$7;

var script$6 = {
    name: 'JumpToPageInput',
    extends: BaseComponent__default["default"],
    inheritAttrs: false,
    emits: ['page-change'],
    props: {
        page: Number,
        pageCount: Number,
        disabled: Boolean
    },
    data() {
        return {
            d_page: this.page
        };
    },
    watch: {
        page(newValue) {
            this.d_page = newValue;
        }
    },
    methods: {
        onChange(value) {
            if (value !== this.page) {
                this.d_page = value;
                this.$emit('page-change', value - 1);
            }
        }
    },
    computed: {
        inputArialabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.jumpToPageInputLabel : undefined;
        }
    },
    components: {
        JTPInput: InputNumber__default["default"]
    }
};

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_JTPInput = vue.resolveComponent("JTPInput");

  return (vue.openBlock(), vue.createBlock(_component_JTPInput, {
    ref: "jtpInput",
    modelValue: $data.d_page,
    class: "p-paginator-page-input",
    "aria-label": $options.inputArialabel,
    disabled: $props.disabled,
    "onUpdate:modelValue": $options.onChange,
    pt: _ctx.ptm('JTPInput')
  }, null, 8, ["modelValue", "aria-label", "disabled", "onUpdate:modelValue", "pt"]))
}

script$6.render = render$6;

var script$5 = {
    name: 'LastPageLink',
    extends: BaseComponent__default["default"],
    props: {
        template: {
            type: Function,
            default: null
        }
    },
    methods: {
        getPTOptions(key) {
            return this.ptm(key, {
                context: {
                    disabled: this.$attrs.disabled
                }
            });
        }
    },
    computed: {
        containerClass() {
            return [
                'p-paginator-last p-paginator-element p-link',
                {
                    'p-disabled': this.$attrs.disabled
                }
            ];
        }
    },
    components: {
        AngleDoubleRightIcon: AngleDoubleRightIcon__default["default"]
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue.resolveDirective("ripple");

  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    class: $options.containerClass,
    type: "button"
  }, $options.getPTOptions('lastPageButton')), [
    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.template || 'AngleDoubleRightIcon'), vue.mergeProps({ class: "p-paginator-icon" }, $options.getPTOptions('lastPageIcon')), null, 16))
  ], 16)), [
    [_directive_ripple]
  ])
}

script$5.render = render$5;

var script$4 = {
    name: 'NextPageLink',
    extends: BaseComponent__default["default"],
    props: {
        template: {
            type: Function,
            default: null
        }
    },
    methods: {
        getPTOptions(key) {
            return this.ptm(key, {
                context: {
                    disabled: this.$attrs.disabled
                }
            });
        }
    },
    computed: {
        containerClass() {
            return [
                'p-paginator-next p-paginator-element p-link',
                {
                    'p-disabled': this.$attrs.disabled
                }
            ];
        }
    },
    components: {
        AngleRightIcon: AngleRightIcon__default["default"]
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue.resolveDirective("ripple");

  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    class: $options.containerClass,
    type: "button"
  }, $options.getPTOptions('nextPageButton')), [
    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.template || 'AngleRightIcon'), vue.mergeProps({ class: "p-paginator-icon" }, $options.getPTOptions('nextPageIcon')), null, 16))
  ], 16)), [
    [_directive_ripple]
  ])
}

script$4.render = render$4;

var script$3 = {
    name: 'PageLinks',
    extends: BaseComponent__default["default"],
    inheritAttrs: false,
    emits: ['click'],
    props: {
        value: Array,
        page: Number
    },
    methods: {
        getPTOptions(pageLink, key) {
            return this.ptm(key, {
                context: {
                    active: pageLink === this.page
                }
            });
        },
        onPageLinkClick(event, pageLink) {
            this.$emit('click', {
                originalEvent: event,
                value: pageLink
            });
        },
        ariaPageLabel(value) {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g, value) : undefined;
        }
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

const _hoisted_1 = ["aria-label", "aria-current", "onClick"];

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue.resolveDirective("ripple");

  return (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({ class: "p-paginator-pages" }, _ctx.ptm('pages')), [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.value, (pageLink) => {
      return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
        key: pageLink,
        class: ['p-paginator-page p-paginator-element p-link', { 'p-highlight': pageLink - 1 === $props.page }],
        type: "button",
        "aria-label": $options.ariaPageLabel(pageLink),
        "aria-current": pageLink - 1 === $props.page ? 'page' : undefined,
        onClick: $event => ($options.onPageLinkClick($event, pageLink))
      }, $options.getPTOptions(pageLink - 1, 'pageButton')), [
        vue.createTextVNode(vue.toDisplayString(pageLink), 1)
      ], 16, _hoisted_1)), [
        [_directive_ripple]
      ])
    }), 128))
  ], 16))
}

script$3.render = render$3;

var script$2 = {
    name: 'PrevPageLink',
    extends: BaseComponent__default["default"],
    props: {
        template: {
            type: Function,
            default: null
        }
    },
    methods: {
        getPTOptions(key) {
            return this.ptm(key, {
                context: {
                    disabled: this.$attrs.disabled
                }
            });
        }
    },
    computed: {
        containerClass() {
            return [
                'p-paginator-prev p-paginator-element p-link',
                {
                    'p-disabled': this.$attrs.disabled
                }
            ];
        }
    },
    components: {
        AngleLeftIcon: AngleLeftIcon__default["default"]
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue.resolveDirective("ripple");

  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    class: $options.containerClass,
    type: "button"
  }, $options.getPTOptions('prevPageButton')), [
    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.template || 'AngleLeftIcon'), vue.mergeProps({ class: "p-paginator-icon" }, $options.getPTOptions('prevPageIcon')), null, 16))
  ], 16)), [
    [_directive_ripple]
  ])
}

script$2.render = render$2;

var script$1 = {
    name: 'RowsPerPageDropdown',
    extends: BaseComponent__default["default"],
    emits: ['rows-change'],
    props: {
        options: Array,
        rows: Number,
        disabled: Boolean
    },
    methods: {
        onChange(value) {
            this.$emit('rows-change', value);
        }
    },
    computed: {
        rowsOptions() {
            let opts = [];

            if (this.options) {
                for (let i = 0; i < this.options.length; i++) {
                    opts.push({ label: String(this.options[i]), value: this.options[i] });
                }
            }

            return opts;
        }
    },
    components: {
        RPPDropdown: Dropdown__default["default"]
    }
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_RPPDropdown = vue.resolveComponent("RPPDropdown");

  return (vue.openBlock(), vue.createBlock(_component_RPPDropdown, {
    modelValue: $props.rows,
    options: $options.rowsOptions,
    optionLabel: "label",
    optionValue: "value",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ($options.onChange($event))),
    class: "p-paginator-rpp-options",
    disabled: $props.disabled,
    pt: _ctx.ptm('RPPDropdown')
  }, null, 8, ["modelValue", "options", "disabled", "pt"]))
}

script$1.render = render$1;

var script = {
    name: 'Paginator',
    extends: BaseComponent__default["default"],
    emits: ['update:first', 'update:rows', 'page'],
    props: {
        totalRecords: {
            type: Number,
            default: 0
        },
        rows: {
            type: Number,
            default: 0
        },
        first: {
            type: Number,
            default: 0
        },
        pageLinkSize: {
            type: Number,
            default: 5
        },
        rowsPerPageOptions: {
            type: Array,
            default: null
        },
        template: {
            type: [Object, String],
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
        },
        currentPageReportTemplate: {
            type: null,
            default: '({currentPage} of {totalPages})'
        },
        alwaysShow: {
            type: Boolean,
            default: true
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
        totalRecords(newValue) {
            if (this.page > 0 && newValue && this.d_first >= newValue) {
                this.changePage(this.pageCount - 1);
            }
        }
    },
    mounted() {
        this.setPaginatorAttribute();
        this.createStyle();
    },
    methods: {
        changePage(p) {
            const pc = this.pageCount;

            if (p >= 0 && p < pc) {
                this.d_first = this.d_rows * p;
                const state = {
                    page: p,
                    first: this.d_first,
                    rows: this.d_rows,
                    pageCount: pc
                };

                this.$emit('update:first', this.d_first);
                this.$emit('update:rows', this.d_rows);
                this.$emit('page', state);
            }
        },

        changePageToFirst(event) {
            if (!this.isFirstPage) {
                this.changePage(0);
            }

            event.preventDefault();
        },
        changePageToPrev(event) {
            this.changePage(this.page - 1);
            event.preventDefault();
        },
        changePageLink(event) {
            this.changePage(event.value - 1);
            event.originalEvent.preventDefault();
        },
        changePageToNext(event) {
            this.changePage(this.page + 1);
            event.preventDefault();
        },
        changePageToLast(event) {
            if (!this.isLastPage) {
                this.changePage(this.pageCount - 1);
            }

            event.preventDefault();
        },
        onRowChange(value) {
            this.d_rows = value;
            this.changePage(this.page);
        },
        createStyle() {
            if (this.hasBreakpoints()) {
                this.styleElement = document.createElement('style');
                this.styleElement.type = 'text/css';
                document.head.appendChild(this.styleElement);

                let innerHTML = '';

                const keys = Object.keys(this.template);
                const sortedBreakpoints = {};

                keys.sort((a, b) => parseInt(a) - parseInt(b)).forEach((key) => {
                    sortedBreakpoints[key] = this.template[key];
                });

                for (const [index, [key]] of Object.entries(Object.entries(sortedBreakpoints))) {
                    const minValue = Object.entries(sortedBreakpoints)[index - 1] ? `and (min-width:${Object.keys(sortedBreakpoints)[index - 1]})` : '';

                    if (key === 'default') {
                        innerHTML += `
                            @media screen ${minValue} {
                                .paginator[${this.attributeSelector}],
                                .p-paginator-default{
                                    display: flex !important;
                                }
                            }
                        `;
                    } else {
                        innerHTML += `
                        .paginator[${this.attributeSelector}], .p-paginator-${key} {
                                display: none !important;
                            }
                        @media screen ${minValue} and (max-width: ${key}) {
                            .paginator[${this.attributeSelector}], .p-paginator-${key} {
                                display: flex !important;
                            }
                            .paginator[${this.attributeSelector}],
                            .p-paginator-default{
                                display: none !important;
                            }
                        }
                    `;
                    }
                }

                this.styleElement.innerHTML = innerHTML;
            }
        },
        hasBreakpoints() {
            return typeof this.template === 'object';
        },
        getPaginatorClasses(key) {
            return [
                {
                    'p-paginator-default': !this.hasBreakpoints(),
                    [`p-paginator-${key}`]: this.hasBreakpoints()
                }
            ];
        },
        setPaginatorAttribute() {
            if (this.$refs.paginator && this.$refs.paginator.length >= 0) {
                [...this.$refs.paginator].forEach((el) => {
                    el.setAttribute(this.attributeSelector, '');
                });
            }
        },
        getAriaLabel(labelType) {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria[labelType] : undefined;
        }
    },
    computed: {
        templateItems() {
            let keys = {};

            if (this.hasBreakpoints()) {
                keys = this.template;

                if (!keys.default) {
                    keys.default = 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown';
                }

                for (const item in keys) {
                    keys[item] = this.template[item].split(' ').map((value) => {
                        return value.trim();
                    });
                }

                return keys;
            }

            keys['default'] = this.template.split(' ').map((value) => {
                return value.trim();
            });

            return keys;
        },
        page() {
            return Math.floor(this.d_first / this.d_rows);
        },
        pageCount() {
            return Math.ceil(this.totalRecords / this.d_rows);
        },
        isFirstPage() {
            return this.page === 0;
        },
        isLastPage() {
            return this.page === this.pageCount - 1;
        },
        calculatePageLinkBoundaries() {
            const numberOfPages = this.pageCount;
            const visiblePages = Math.min(this.pageLinkSize, numberOfPages);

            //calculate range, keep current in middle if necessary
            let start = Math.max(0, Math.ceil(this.page - visiblePages / 2));
            let end = Math.min(numberOfPages - 1, start + visiblePages - 1);

            //check when approaching to last page
            const delta = this.pageLinkSize - (end - start + 1);

            start = Math.max(0, start - delta);

            return [start, end];
        },
        pageLinks() {
            let pageLinks = [];
            let boundaries = this.calculatePageLinkBoundaries;
            let start = boundaries[0];
            let end = boundaries[1];

            for (var i = start; i <= end; i++) {
                pageLinks.push(i + 1);
            }

            return pageLinks;
        },
        currentState() {
            return {
                page: this.page,
                first: this.d_first,
                rows: this.d_rows
            };
        },
        empty() {
            return this.pageCount === 0;
        },
        currentPage() {
            return this.pageCount > 0 ? this.page + 1 : 0;
        },
        attributeSelector() {
            return utils.UniqueComponentId();
        }
    },
    components: {
        CurrentPageReport: script$9,
        FirstPageLink: script$8,
        LastPageLink: script$5,
        NextPageLink: script$4,
        PageLinks: script$3,
        PrevPageLink: script$2,
        RowsPerPageDropdown: script$1,
        JumpToPageDropdown: script$7,
        JumpToPageInput: script$6
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FirstPageLink = vue.resolveComponent("FirstPageLink");
  const _component_PrevPageLink = vue.resolveComponent("PrevPageLink");
  const _component_NextPageLink = vue.resolveComponent("NextPageLink");
  const _component_LastPageLink = vue.resolveComponent("LastPageLink");
  const _component_PageLinks = vue.resolveComponent("PageLinks");
  const _component_CurrentPageReport = vue.resolveComponent("CurrentPageReport");
  const _component_RowsPerPageDropdown = vue.resolveComponent("RowsPerPageDropdown");
  const _component_JumpToPageDropdown = vue.resolveComponent("JumpToPageDropdown");
  const _component_JumpToPageInput = vue.resolveComponent("JumpToPageInput");

  return ($props.alwaysShow ? true : $options.pageLinks && $options.pageLinks.length > 1)
    ? (vue.openBlock(), vue.createElementBlock("nav", vue.normalizeProps(vue.mergeProps({ key: 0 }, _ctx.ptm('root'))), [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.templateItems, (value, key) => {
          return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: key,
            ref_for: true,
            ref: "paginator",
            class: ["p-paginator p-component", $options.getPaginatorClasses(key)]
          }, _ctx.ptm('paginator')), [
            (_ctx.$slots.start)
              ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 0,
                  class: "p-paginator-left-content"
                }, _ctx.ptm('left')), [
                  vue.renderSlot(_ctx.$slots, "start", { state: $options.currentState })
                ], 16))
              : vue.createCommentVNode("", true),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(value, (item) => {
              return (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: item }, [
                (item === 'FirstPageLink')
                  ? (vue.openBlock(), vue.createBlock(_component_FirstPageLink, {
                      key: 0,
                      "aria-label": $options.getAriaLabel('firstPageLabel'),
                      template: _ctx.$slots.firstpagelinkicon,
                      onClick: _cache[0] || (_cache[0] = $event => ($options.changePageToFirst($event))),
                      disabled: $options.isFirstPage || $options.empty,
                      pt: _ctx.pt
                    }, null, 8, ["aria-label", "template", "disabled", "pt"]))
                  : (item === 'PrevPageLink')
                    ? (vue.openBlock(), vue.createBlock(_component_PrevPageLink, {
                        key: 1,
                        "aria-label": $options.getAriaLabel('prevPageLabel'),
                        template: _ctx.$slots.prevpagelinkicon,
                        onClick: _cache[1] || (_cache[1] = $event => ($options.changePageToPrev($event))),
                        disabled: $options.isFirstPage || $options.empty,
                        pt: _ctx.pt
                      }, null, 8, ["aria-label", "template", "disabled", "pt"]))
                    : (item === 'NextPageLink')
                      ? (vue.openBlock(), vue.createBlock(_component_NextPageLink, {
                          key: 2,
                          "aria-label": $options.getAriaLabel('nextPageLabel'),
                          template: _ctx.$slots.nextpagelinkicon,
                          onClick: _cache[2] || (_cache[2] = $event => ($options.changePageToNext($event))),
                          disabled: $options.isLastPage || $options.empty,
                          pt: _ctx.pt
                        }, null, 8, ["aria-label", "template", "disabled", "pt"]))
                      : (item === 'LastPageLink')
                        ? (vue.openBlock(), vue.createBlock(_component_LastPageLink, {
                            key: 3,
                            "aria-label": $options.getAriaLabel('lastPageLabel'),
                            template: _ctx.$slots.lastpagelinkicon,
                            onClick: _cache[3] || (_cache[3] = $event => ($options.changePageToLast($event))),
                            disabled: $options.isLastPage || $options.empty,
                            pt: _ctx.pt
                          }, null, 8, ["aria-label", "template", "disabled", "pt"]))
                        : (item === 'PageLinks')
                          ? (vue.openBlock(), vue.createBlock(_component_PageLinks, {
                              key: 4,
                              "aria-label": $options.getAriaLabel('pageLabel'),
                              value: $options.pageLinks,
                              page: $options.page,
                              onClick: _cache[4] || (_cache[4] = $event => ($options.changePageLink($event))),
                              pt: _ctx.pt
                            }, null, 8, ["aria-label", "value", "page", "pt"]))
                          : (item === 'CurrentPageReport')
                            ? (vue.openBlock(), vue.createBlock(_component_CurrentPageReport, {
                                key: 5,
                                "aria-live": "polite",
                                template: $props.currentPageReportTemplate,
                                currentPage: $options.currentPage,
                                page: $options.page,
                                pageCount: $options.pageCount,
                                first: $data.d_first,
                                rows: $data.d_rows,
                                totalRecords: $props.totalRecords,
                                pt: _ctx.pt
                              }, null, 8, ["template", "currentPage", "page", "pageCount", "first", "rows", "totalRecords", "pt"]))
                            : (item === 'RowsPerPageDropdown' && $props.rowsPerPageOptions)
                              ? (vue.openBlock(), vue.createBlock(_component_RowsPerPageDropdown, {
                                  key: 6,
                                  "aria-label": $options.getAriaLabel('rowsPerPageLabel'),
                                  rows: $data.d_rows,
                                  options: $props.rowsPerPageOptions,
                                  onRowsChange: _cache[5] || (_cache[5] = $event => ($options.onRowChange($event))),
                                  disabled: $options.empty,
                                  pt: _ctx.pt
                                }, null, 8, ["aria-label", "rows", "options", "disabled", "pt"]))
                              : (item === 'JumpToPageDropdown')
                                ? (vue.openBlock(), vue.createBlock(_component_JumpToPageDropdown, {
                                    key: 7,
                                    "aria-label": $options.getAriaLabel('jumpToPageDropdownLabel'),
                                    page: $options.page,
                                    pageCount: $options.pageCount,
                                    onPageChange: _cache[6] || (_cache[6] = $event => ($options.changePage($event))),
                                    disabled: $options.empty,
                                    pt: _ctx.pt
                                  }, null, 8, ["aria-label", "page", "pageCount", "disabled", "pt"]))
                                : (item === 'JumpToPageInput')
                                  ? (vue.openBlock(), vue.createBlock(_component_JumpToPageInput, {
                                      key: 8,
                                      page: $options.currentPage,
                                      onPageChange: _cache[7] || (_cache[7] = $event => ($options.changePage($event))),
                                      disabled: $options.empty,
                                      pt: _ctx.pt
                                    }, null, 8, ["page", "disabled", "pt"]))
                                  : vue.createCommentVNode("", true)
              ], 64))
            }), 128)),
            (_ctx.$slots.end)
              ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 1,
                  class: "p-paginator-right-content"
                }, _ctx.ptm('end')), [
                  vue.renderSlot(_ctx.$slots, "end", { state: $options.currentState })
                ], 16))
              : vue.createCommentVNode("", true)
          ], 16))
        }), 128))
      ], 16))
    : vue.createCommentVNode("", true)
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-paginator-default {\n    display: flex;\n}\n.p-paginator {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-wrap: wrap;\n}\n.p-paginator-left-content {\n    margin-right: auto;\n}\n.p-paginator-right-content {\n    margin-left: auto;\n}\n.p-paginator-page,\n.p-paginator-next,\n.p-paginator-last,\n.p-paginator-first,\n.p-paginator-prev,\n.p-paginator-current {\n    cursor: pointer;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    line-height: 1;\n    user-select: none;\n    overflow: hidden;\n    position: relative;\n}\n.p-paginator-element:focus {\n    z-index: 1;\n    position: relative;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
