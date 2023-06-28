import FocusTrap from 'primevue/focustrap';
import Portal from 'primevue/portal';
import { DomHandler, UniqueComponentId, ZIndexUtils } from 'primevue/utils';
import Ripple from 'primevue/ripple';
import { resolveDirective, openBlock, createElementBlock, createElementVNode, withDirectives, normalizeClass, createCommentVNode, createBlock, resolveDynamicComponent, Fragment, renderList, mergeProps, normalizeStyle, resolveComponent, createVNode, withCtx, Transition } from 'vue';

var script$3 = {
    name: 'GalleriaItem',
    emits: ['start-slideshow', 'stop-slideshow', 'update:activeIndex'],
    props: {
        circular: {
            type: Boolean,
            default: false
        },
        activeIndex: {
            type: Number,
            default: 0
        },
        value: {
            type: Array,
            default: null
        },
        showItemNavigators: {
            type: Boolean,
            default: true
        },
        showIndicators: {
            type: Boolean,
            default: true
        },
        slideShowActive: {
            type: Boolean,
            default: true
        },
        changeItemOnIndicatorHover: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: false
        },
        templates: {
            type: null,
            default: null
        },
        id: {
            type: String,
            default: null
        }
    },
    mounted() {
        if (this.autoPlay) {
            this.$emit('start-slideshow');
        }
    },
    methods: {
        next() {
            let nextItemIndex = this.activeIndex + 1;
            let activeIndex = this.circular && this.value.length - 1 === this.activeIndex ? 0 : nextItemIndex;

            this.$emit('update:activeIndex', activeIndex);
        },
        prev() {
            let prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
            let activeIndex = this.circular && this.activeIndex === 0 ? this.value.length - 1 : prevItemIndex;

            this.$emit('update:activeIndex', activeIndex);
        },
        stopSlideShow() {
            if (this.slideShowActive && this.stopSlideShow) {
                this.$emit('stop-slideshow');
            }
        },
        navBackward(e) {
            this.stopSlideShow();
            this.prev();

            if (e && e.cancelable) {
                e.preventDefault();
            }
        },
        navForward(e) {
            this.stopSlideShow();
            this.next();

            if (e && e.cancelable) {
                e.preventDefault();
            }
        },
        onIndicatorClick(index) {
            this.stopSlideShow();
            this.$emit('update:activeIndex', index);
        },
        onIndicatorMouseEnter(index) {
            if (this.changeItemOnIndicatorHover) {
                this.stopSlideShow();

                this.$emit('update:activeIndex', index);
            }
        },
        onIndicatorKeyDown(event, index) {
            switch (event.code) {
                case 'Enter':
                case 'Space':
                    this.stopSlideShow();

                    this.$emit('update:activeIndex', index);
                    event.preventDefault();
                    break;

                case 'ArrowDown':
                case 'ArrowUp':
                    event.preventDefault();
                    break;
            }
        },
        isIndicatorItemActive(index) {
            return this.activeIndex === index;
        },
        isNavBackwardDisabled() {
            return !this.circular && this.activeIndex === 0;
        },
        isNavForwardDisabled() {
            return !this.circular && this.activeIndex === this.value.length - 1;
        },
        ariaSlideNumber(value) {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g, value) : undefined;
        },
        ariaPageLabel(value) {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g, value) : undefined;
        }
    },
    computed: {
        activeItem() {
            return this.value[this.activeIndex];
        },
        navBackwardClass() {
            return [
                'p-galleria-item-prev p-galleria-item-nav p-link',
                {
                    'p-disabled': this.isNavBackwardDisabled()
                }
            ];
        },
        navForwardClass() {
            return [
                'p-galleria-item-next p-galleria-item-nav p-link',
                {
                    'p-disabled': this.isNavForwardDisabled()
                }
            ];
        },
        ariaSlideLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.slide : undefined;
        }
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1$3 = { class: "p-galleria-item-wrapper" };
const _hoisted_2$2 = { class: "p-galleria-item-container" };
const _hoisted_3$2 = ["disabled"];
const _hoisted_4$2 = /*#__PURE__*/createElementVNode("span", { class: "p-galleria-item-prev-icon pi pi-chevron-left" }, null, -1);
const _hoisted_5$2 = [
  _hoisted_4$2
];
const _hoisted_6$2 = ["id", "aria-label", "aria-roledescription"];
const _hoisted_7$1 = ["disabled"];
const _hoisted_8 = /*#__PURE__*/createElementVNode("span", { class: "p-galleria-item-next-icon pi pi-chevron-right" }, null, -1);
const _hoisted_9 = [
  _hoisted_8
];
const _hoisted_10 = {
  key: 2,
  class: "p-galleria-caption"
};
const _hoisted_11 = {
  key: 0,
  class: "p-galleria-indicators p-reset"
};
const _hoisted_12 = ["aria-label", "aria-selected", "aria-controls", "onClick", "onMouseenter", "onKeydown"];
const _hoisted_13 = {
  key: 0,
  type: "button",
  tabindex: "-1",
  class: "p-link"
};

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    createElementVNode("div", _hoisted_2$2, [
      ($props.showItemNavigators)
        ? withDirectives((openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            class: normalizeClass($options.navBackwardClass),
            onClick: _cache[0] || (_cache[0] = $event => ($options.navBackward($event))),
            disabled: $options.isNavBackwardDisabled()
          }, _hoisted_5$2, 10, _hoisted_3$2)), [
            [_directive_ripple]
          ])
        : createCommentVNode("", true),
      createElementVNode("div", {
        id: $props.id + '_item_' + $props.activeIndex,
        class: "p-galleria-item",
        role: "group",
        "aria-label": $options.ariaSlideNumber($props.activeIndex + 1),
        "aria-roledescription": $options.ariaSlideLabel
      }, [
        ($props.templates.item)
          ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
              key: 0,
              item: $options.activeItem
            }, null, 8, ["item"]))
          : createCommentVNode("", true)
      ], 8, _hoisted_6$2),
      ($props.showItemNavigators)
        ? withDirectives((openBlock(), createElementBlock("button", {
            key: 1,
            type: "button",
            class: normalizeClass($options.navForwardClass),
            onClick: _cache[1] || (_cache[1] = $event => ($options.navForward($event))),
            disabled: $options.isNavForwardDisabled()
          }, _hoisted_9, 10, _hoisted_7$1)), [
            [_directive_ripple]
          ])
        : createCommentVNode("", true),
      ($props.templates['caption'])
        ? (openBlock(), createElementBlock("div", _hoisted_10, [
            ($props.templates.caption)
              ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.caption), {
                  key: 0,
                  item: $options.activeItem
                }, null, 8, ["item"]))
              : createCommentVNode("", true)
          ]))
        : createCommentVNode("", true)
    ]),
    ($props.showIndicators)
      ? (openBlock(), createElementBlock("ul", _hoisted_11, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.value, (item, index) => {
            return (openBlock(), createElementBlock("li", {
              key: `p-galleria-indicator-${index}`,
              class: normalizeClass(['p-galleria-indicator', { 'p-highlight': $options.isIndicatorItemActive(index) }]),
              tabindex: "0",
              "aria-label": $options.ariaPageLabel(index + 1),
              "aria-selected": $props.activeIndex === index,
              "aria-controls": $props.id + '_item_' + index,
              onClick: $event => ($options.onIndicatorClick(index)),
              onMouseenter: $event => ($options.onIndicatorMouseEnter(index)),
              onKeydown: $event => ($options.onIndicatorKeyDown($event, index))
            }, [
              (!$props.templates['indicator'])
                ? (openBlock(), createElementBlock("button", _hoisted_13))
                : createCommentVNode("", true),
              ($props.templates.indicator)
                ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.indicator), {
                    key: 1,
                    index: index
                  }, null, 8, ["index"]))
                : createCommentVNode("", true)
            ], 42, _hoisted_12))
          }), 128))
        ]))
      : createCommentVNode("", true)
  ]))
}

script$3.render = render$3;

var script$2 = {
    name: 'GalleriaThumbnails',
    emits: ['stop-slideshow', 'update:activeIndex'],
    props: {
        containerId: {
            type: String,
            default: null
        },
        value: {
            type: Array,
            default: null
        },
        numVisible: {
            type: Number,
            default: 3
        },
        activeIndex: {
            type: Number,
            default: 0
        },
        isVertical: {
            type: Boolean,
            default: false
        },
        slideShowActive: {
            type: Boolean,
            default: false
        },
        circular: {
            type: Boolean,
            default: false
        },
        responsiveOptions: {
            type: Array,
            default: null
        },
        contentHeight: {
            type: String,
            default: '300px'
        },
        showThumbnailNavigators: {
            type: Boolean,
            default: true
        },
        templates: {
            type: null,
            default: null
        },
        prevButtonProps: {
            type: null,
            default: null
        },
        nextButtonProps: {
            type: null,
            default: null
        }
    },
    startPos: null,
    thumbnailsStyle: null,
    sortedResponsiveOptions: null,
    data() {
        return {
            d_numVisible: this.numVisible,
            d_oldNumVisible: this.numVisible,
            d_activeIndex: this.activeIndex,
            d_oldActiveItemIndex: this.activeIndex,
            totalShiftedItems: 0,
            page: 0
        };
    },
    watch: {
        numVisible(newValue, oldValue) {
            this.d_numVisible = newValue;
            this.d_oldNumVisible = oldValue;
        },
        activeIndex(newValue, oldValue) {
            this.d_activeIndex = newValue;
            this.d_oldActiveItemIndex = oldValue;
        }
    },
    mounted() {
        this.createStyle();
        this.calculatePosition();

        if (this.responsiveOptions) {
            this.bindDocumentListeners();
        }
    },
    updated() {
        let totalShiftedItems = this.totalShiftedItems;

        if (this.d_oldNumVisible !== this.d_numVisible || this.d_oldActiveItemIndex !== this.d_activeIndex) {
            if (this.d_activeIndex <= this.getMedianItemIndex()) {
                totalShiftedItems = 0;
            } else if (this.value.length - this.d_numVisible + this.getMedianItemIndex() < this.d_activeIndex) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            } else if (this.value.length - this.d_numVisible < this.d_activeIndex && this.d_numVisible % 2 === 0) {
                totalShiftedItems = this.d_activeIndex * -1 + this.getMedianItemIndex() + 1;
            } else {
                totalShiftedItems = this.d_activeIndex * -1 + this.getMedianItemIndex();
            }

            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }

            this.$refs.itemsContainer.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;

            if (this.d_oldActiveItemIndex !== this.d_activeIndex) {
                DomHandler.removeClass(this.$refs.itemsContainer, 'p-items-hidden');
                this.$refs.itemsContainer.style.transition = 'transform 500ms ease 0s';
            }

            this.d_oldActiveItemIndex = this.d_activeIndex;
            this.d_oldNumVisible = this.d_numVisible;
        }
    },
    beforeUnmount() {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }

        if (this.thumbnailsStyle) {
            this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle);
        }
    },
    methods: {
        step(dir) {
            let totalShiftedItems = this.totalShiftedItems + dir;

            if (dir < 0 && -1 * totalShiftedItems + this.d_numVisible > this.value.length - 1) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            } else if (dir > 0 && totalShiftedItems > 0) {
                totalShiftedItems = 0;
            }

            if (this.circular) {
                if (dir < 0 && this.value.length - 1 === this.d_activeIndex) {
                    totalShiftedItems = 0;
                } else if (dir > 0 && this.d_activeIndex === 0) {
                    totalShiftedItems = this.d_numVisible - this.value.length;
                }
            }

            if (this.$refs.itemsContainer) {
                DomHandler.removeClass(this.$refs.itemsContainer, 'p-items-hidden');
                this.$refs.itemsContainer.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
                this.$refs.itemsContainer.style.transition = 'transform 500ms ease 0s';
            }

            this.totalShiftedItems = totalShiftedItems;
        },
        stopSlideShow() {
            if (this.slideShowActive && this.stopSlideShow) {
                this.$emit('stop-slideshow');
            }
        },
        getMedianItemIndex() {
            let index = Math.floor(this.d_numVisible / 2);

            return this.d_numVisible % 2 ? index : index - 1;
        },
        navBackward(e) {
            this.stopSlideShow();

            let prevItemIndex = this.d_activeIndex !== 0 ? this.d_activeIndex - 1 : 0;
            let diff = prevItemIndex + this.totalShiftedItems;

            if (this.d_numVisible - diff - 1 > this.getMedianItemIndex() && (-1 * this.totalShiftedItems !== 0 || this.circular)) {
                this.step(1);
            }

            let activeIndex = this.circular && this.d_activeIndex === 0 ? this.value.length - 1 : prevItemIndex;

            this.$emit('update:activeIndex', activeIndex);

            if (e.cancelable) {
                e.preventDefault();
            }
        },
        navForward(e) {
            this.stopSlideShow();

            let nextItemIndex = this.d_activeIndex === this.value.length - 1 ? this.value.length - 1 : this.d_activeIndex + 1;

            if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && (-1 * this.totalShiftedItems < this.getTotalPageNumber() - 1 || this.circular)) {
                this.step(-1);
            }

            let activeIndex = this.circular && this.value.length - 1 === this.d_activeIndex ? 0 : nextItemIndex;

            this.$emit('update:activeIndex', activeIndex);

            if (e.cancelable) {
                e.preventDefault();
            }
        },
        onItemClick(index) {
            this.stopSlideShow();

            let selectedItemIndex = index;

            if (selectedItemIndex !== this.d_activeIndex) {
                const diff = selectedItemIndex + this.totalShiftedItems;
                let dir = 0;

                if (selectedItemIndex < this.d_activeIndex) {
                    dir = this.d_numVisible - diff - 1 - this.getMedianItemIndex();

                    if (dir > 0 && -1 * this.totalShiftedItems !== 0) {
                        this.step(dir);
                    }
                } else {
                    dir = this.getMedianItemIndex() - diff;

                    if (dir < 0 && -1 * this.totalShiftedItems < this.getTotalPageNumber() - 1) {
                        this.step(dir);
                    }
                }

                this.$emit('update:activeIndex', selectedItemIndex);
            }
        },
        onThumbnailKeydown(event, index) {
            if (event.code === 'Enter' || event.code === 'Space') {
                this.onItemClick(index);
                event.preventDefault();
            }

            switch (event.code) {
                case 'ArrowRight':
                    this.onRightKey();
                    break;

                case 'ArrowLeft':
                    this.onLeftKey();
                    break;

                case 'Home':
                    this.onHomeKey();
                    event.preventDefault();
                    break;

                case 'End':
                    this.onEndKey();
                    event.preventDefault();
                    break;

                case 'ArrowUp':
                case 'ArrowDown':
                    event.preventDefault();
                    break;

                case 'Tab':
                    this.onTabKey();
                    break;
            }
        },
        onRightKey() {
            const indicators = DomHandler.find(this.$refs.itemsContainer, '.p-galleria-thumbnail-item');
            const activeIndex = this.findFocusedIndicatorIndex();

            this.changedFocusedIndicator(activeIndex, activeIndex + 1 === indicators.length ? indicators.length - 1 : activeIndex + 1);
        },
        onLeftKey() {
            const activeIndex = this.findFocusedIndicatorIndex();

            this.changedFocusedIndicator(activeIndex, activeIndex - 1 <= 0 ? 0 : activeIndex - 1);
        },
        onHomeKey() {
            const activeIndex = this.findFocusedIndicatorIndex();

            this.changedFocusedIndicator(activeIndex, 0);
        },
        onEndKey() {
            const indicators = DomHandler.find(this.$refs.itemsContainer, '.p-galleria-thumbnail-item');
            const activeIndex = this.findFocusedIndicatorIndex();

            this.changedFocusedIndicator(activeIndex, indicators.length - 1);
        },
        onTabKey() {
            const indicators = [...DomHandler.find(this.$refs.itemsContainer, '.p-galleria-thumbnail-item')];
            const highlightedIndex = indicators.findIndex((ind) => DomHandler.hasClass(ind, 'p-galleria-thumbnail-item-current'));

            const activeIndicator = DomHandler.findSingle(this.$refs.itemsContainer, '.p-galleria-thumbnail-item > [tabindex="0"');
            const activeIndex = indicators.findIndex((ind) => ind === activeIndicator.parentElement);

            indicators[activeIndex].children[0].tabIndex = '-1';
            indicators[highlightedIndex].children[0].tabIndex = '0';
        },
        findFocusedIndicatorIndex() {
            const indicators = [...DomHandler.find(this.$refs.itemsContainer, '.p-galleria-thumbnail-item')];
            const activeIndicator = DomHandler.findSingle(this.$refs.itemsContainer, '.p-galleria-thumbnail-item > [tabindex="0"]');

            return indicators.findIndex((ind) => ind === activeIndicator.parentElement);
        },
        changedFocusedIndicator(prevInd, nextInd) {
            const indicators = DomHandler.find(this.$refs.itemsContainer, '.p-galleria-thumbnail-item');

            indicators[prevInd].children[0].tabIndex = '-1';
            indicators[nextInd].children[0].tabIndex = '0';
            indicators[nextInd].children[0].focus();
        },
        onTransitionEnd() {
            if (this.$refs.itemsContainer) {
                DomHandler.addClass(this.$refs.itemsContainer, 'p-items-hidden');
                this.$refs.itemsContainer.style.transition = '';
            }
        },
        onTouchStart(e) {
            let touchobj = e.changedTouches[0];

            this.startPos = {
                x: touchobj.pageX,
                y: touchobj.pageY
            };
        },
        onTouchMove(e) {
            if (e.cancelable) {
                e.preventDefault();
            }
        },
        onTouchEnd(e) {
            let touchobj = e.changedTouches[0];

            if (this.isVertical) {
                this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
            } else {
                this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
            }
        },
        changePageOnTouch(e, diff) {
            if (diff < 0) {
                // left
                this.navForward(e);
            } else {
                // right
                this.navBackward(e);
            }
        },
        getTotalPageNumber() {
            return this.value.length > this.d_numVisible ? this.value.length - this.d_numVisible + 1 : 0;
        },
        createStyle() {
            if (!this.thumbnailsStyle) {
                this.thumbnailsStyle = document.createElement('style');
                this.thumbnailsStyle.type = 'text/css';
                document.body.appendChild(this.thumbnailsStyle);
            }

            let innerHTML = `
                #${this.containerId} .p-galleria-thumbnail-item {
                    flex: 1 0 ${100 / this.d_numVisible}%
                }
            `;

            if (this.responsiveOptions) {
                this.sortedResponsiveOptions = [...this.responsiveOptions];
                this.sortedResponsiveOptions.sort((data1, data2) => {
                    const value1 = data1.breakpoint;
                    const value2 = data2.breakpoint;
                    let result = null;

                    if (value1 == null && value2 != null) result = -1;
                    else if (value1 != null && value2 == null) result = 1;
                    else if (value1 == null && value2 == null) result = 0;
                    else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });
                    else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                    return -1 * result;
                });

                for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                    let res = this.sortedResponsiveOptions[i];

                    innerHTML += `
                        @media screen and (max-width: ${res.breakpoint}) {
                            #${this.containerId} .p-galleria-thumbnail-item {
                                flex: 1 0 ${100 / res.numVisible}%
                            }
                        }
                    `;
                }
            }

            this.thumbnailsStyle.innerHTML = innerHTML;
        },
        calculatePosition() {
            if (this.$refs.itemsContainer && this.sortedResponsiveOptions) {
                let windowWidth = window.innerWidth;
                let matchedResponsiveData = {
                    numVisible: this.numVisible
                };

                for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                    let res = this.sortedResponsiveOptions[i];

                    if (parseInt(res.breakpoint, 10) >= windowWidth) {
                        matchedResponsiveData = res;
                    }
                }

                if (this.d_numVisible !== matchedResponsiveData.numVisible) {
                    this.d_numVisible = matchedResponsiveData.numVisible;
                }
            }
        },
        bindDocumentListeners() {
            if (!this.documentResizeListener) {
                this.documentResizeListener = () => {
                    this.calculatePosition();
                };

                window.addEventListener('resize', this.documentResizeListener);
            }
        },
        unbindDocumentListeners() {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        },
        isNavBackwardDisabled() {
            return (!this.circular && this.d_activeIndex === 0) || this.value.length <= this.d_numVisible;
        },
        isNavForwardDisabled() {
            return (!this.circular && this.d_activeIndex === this.value.length - 1) || this.value.length <= this.d_numVisible;
        },
        firstItemAciveIndex() {
            return this.totalShiftedItems * -1;
        },
        lastItemActiveIndex() {
            return this.firstItemAciveIndex() + this.d_numVisible - 1;
        },
        isItemActive(index) {
            return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
        },
        ariaPageLabel(value) {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g, value) : undefined;
        }
    },
    computed: {
        navBackwardClass() {
            return [
                'p-galleria-thumbnail-prev p-link',
                {
                    'p-disabled': this.isNavBackwardDisabled()
                }
            ];
        },
        navForwardClass() {
            return [
                'p-galleria-thumbnail-next p-link',
                {
                    'p-disabled': this.isNavForwardDisabled()
                }
            ];
        },
        navBackwardIconClass() {
            return [
                'p-galleria-thumbnail-prev-icon pi',
                {
                    'pi-chevron-left': !this.isVertical,
                    'pi-chevron-up': this.isVertical
                }
            ];
        },
        navForwardIconClass() {
            return [
                'p-galleria-thumbnail-next-icon pi',
                {
                    'pi-chevron-right': !this.isVertical,
                    'pi-chevron-down': this.isVertical
                }
            ];
        },
        ariaPrevButtonLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.prevPageLabel : undefined;
        },
        ariaNextButtonLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.nextPageLabel : undefined;
        }
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1$2 = { class: "p-galleria-thumbnail-wrapper" };
const _hoisted_2$1 = { class: "p-galleria-thumbnail-container" };
const _hoisted_3$1 = ["disabled", "aria-label"];
const _hoisted_4$1 = ["aria-selected", "aria-controls", "onKeydown"];
const _hoisted_5$1 = ["tabindex", "aria-label", "aria-current", "onClick"];
const _hoisted_6$1 = ["disabled", "aria-label"];

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createElementVNode("div", _hoisted_2$1, [
      ($props.showThumbnailNavigators)
        ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
            key: 0,
            class: $options.navBackwardClass,
            disabled: $options.isNavBackwardDisabled(),
            type: "button",
            "aria-label": $options.ariaPrevButtonLabel,
            onClick: _cache[0] || (_cache[0] = $event => ($options.navBackward($event)))
          }, $props.prevButtonProps), [
            createElementVNode("span", {
              class: normalizeClass($options.navBackwardIconClass)
            }, null, 2)
          ], 16, _hoisted_3$1)), [
            [_directive_ripple]
          ])
        : createCommentVNode("", true),
      createElementVNode("div", {
        class: "p-galleria-thumbnail-items-container",
        style: normalizeStyle({ height: $props.isVertical ? $props.contentHeight : '' })
      }, [
        createElementVNode("div", {
          ref: "itemsContainer",
          class: "p-galleria-thumbnail-items",
          role: "tablist",
          onTransitionend: _cache[1] || (_cache[1] = (...args) => ($options.onTransitionEnd && $options.onTransitionEnd(...args))),
          onTouchstart: _cache[2] || (_cache[2] = $event => ($options.onTouchStart($event))),
          onTouchmove: _cache[3] || (_cache[3] = $event => ($options.onTouchMove($event))),
          onTouchend: _cache[4] || (_cache[4] = $event => ($options.onTouchEnd($event)))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.value, (item, index) => {
            return (openBlock(), createElementBlock("div", {
              key: `p-galleria-thumbnail-item-${index}`,
              class: normalizeClass([
                            'p-galleria-thumbnail-item',
                            {
                                'p-galleria-thumbnail-item-current': $props.activeIndex === index,
                                'p-galleria-thumbnail-item-active': $options.isItemActive(index),
                                'p-galleria-thumbnail-item-start': $options.firstItemAciveIndex() === index,
                                'p-galleria-thumbnail-item-end': $options.lastItemActiveIndex() === index
                            }
                        ]),
              role: "tab",
              "aria-selected": $props.activeIndex === index,
              "aria-controls": $props.containerId + '_item_' + index,
              onKeydown: $event => ($options.onThumbnailKeydown($event, index))
            }, [
              createElementVNode("div", {
                class: "p-galleria-thumbnail-item-content",
                tabindex: $props.activeIndex === index ? '0' : '-1',
                "aria-label": $options.ariaPageLabel(index + 1),
                "aria-current": $props.activeIndex === index ? 'page' : undefined,
                onClick: $event => ($options.onItemClick(index))
              }, [
                ($props.templates.thumbnail)
                  ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.thumbnail), {
                      key: 0,
                      item: item
                    }, null, 8, ["item"]))
                  : createCommentVNode("", true)
              ], 8, _hoisted_5$1)
            ], 42, _hoisted_4$1))
          }), 128))
        ], 544)
      ], 4),
      ($props.showThumbnailNavigators)
        ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
            key: 1,
            class: $options.navForwardClass,
            disabled: $options.isNavForwardDisabled(),
            type: "button",
            "aria-label": $options.ariaNextButtonLabel,
            onClick: _cache[5] || (_cache[5] = $event => ($options.navForward($event)))
          }, $props.nextButtonProps), [
            createElementVNode("span", {
              class: normalizeClass($options.navForwardIconClass)
            }, null, 2)
          ], 16, _hoisted_6$1)), [
            [_directive_ripple]
          ])
        : createCommentVNode("", true)
    ])
  ]))
}

script$2.render = render$2;

var script$1 = {
    name: 'GalleriaContent',
    inheritAttrs: false,
    interval: null,
    emits: ['activeitem-change', 'mask-hide'],
    data() {
        return {
            id: this.$attrs.id || UniqueComponentId(),
            activeIndex: this.$attrs.activeIndex,
            numVisible: this.$attrs.numVisible,
            slideShowActive: false
        };
    },
    watch: {
        '$attrs.value': function (newVal) {
            if (newVal && newVal.length < this.numVisible) {
                this.numVisible = newVal.length;
            }
        },
        '$attrs.activeIndex': function (newVal) {
            this.activeIndex = newVal;
        },
        '$attrs.numVisible': function (newVal) {
            this.numVisible = newVal;
        }
    },
    updated() {
        this.$emit('activeitem-change', this.activeIndex);
    },
    beforeUnmount() {
        if (this.slideShowActive) {
            this.stopSlideShow();
        }
    },
    methods: {
        isAutoPlayActive() {
            return this.slideShowActive;
        },
        startSlideShow() {
            this.interval = setInterval(() => {
                let activeIndex = this.$attrs.circular && this.$attrs.value.length - 1 === this.activeIndex ? 0 : this.activeIndex + 1;

                this.activeIndex = activeIndex;
            }, this.$attrs.transitionInterval);

            this.slideShowActive = true;
        },
        stopSlideShow() {
            if (this.interval) {
                clearInterval(this.interval);
            }

            this.slideShowActive = false;
        },
        getPositionClass(preClassName, position) {
            const positions = ['top', 'left', 'bottom', 'right'];
            const pos = positions.find((item) => item === position);

            return pos ? `${preClassName}-${pos}` : '';
        },
        isVertical() {
            return this.$attrs.thumbnailsPosition === 'left' || this.$attrs.thumbnailsPosition === 'right';
        }
    },
    computed: {
        galleriaClass() {
            const thumbnailsPosClass = this.$attrs.showThumbnails && this.getPositionClass('p-galleria-thumbnails', this.$attrs.thumbnailsPosition);
            const indicatorPosClass = this.$attrs.showIndicators && this.getPositionClass('p-galleria-indicators', this.$attrs.indicatorsPosition);

            return [
                'p-galleria p-component',
                {
                    'p-galleria-fullscreen': this.$attrs.fullScreen,
                    'p-galleria-indicator-onitem': this.$attrs.showIndicatorsOnItem,
                    'p-galleria-item-nav-onhover': this.$attrs.showItemNavigatorsOnHover && !this.$attrs.fullScreen
                },
                thumbnailsPosClass,
                indicatorPosClass,
                this.$attrs.containerClass
            ];
        },
        closeAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
        }
    },
    components: {
        GalleriaItem: script$3,
        GalleriaThumbnails: script$2
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1$1 = ["id"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = /*#__PURE__*/createElementVNode("span", { class: "p-galleria-close-icon pi pi-times" }, null, -1);
const _hoisted_4 = [
  _hoisted_3
];
const _hoisted_5 = {
  key: 1,
  class: "p-galleria-header"
};
const _hoisted_6 = ["aria-live"];
const _hoisted_7 = {
  key: 2,
  class: "p-galleria-footer"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_GalleriaItem = resolveComponent("GalleriaItem");
  const _component_GalleriaThumbnails = resolveComponent("GalleriaThumbnails");
  const _directive_ripple = resolveDirective("ripple");

  return (_ctx.$attrs.value && _ctx.$attrs.value.length > 0)
    ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        id: $data.id,
        class: $options.galleriaClass,
        style: _ctx.$attrs.containerStyle
      }, _ctx.$attrs.containerProps), [
        (_ctx.$attrs.fullScreen)
          ? withDirectives((openBlock(), createElementBlock("button", {
              key: 0,
              autofocus: "",
              type: "button",
              class: "p-galleria-close p-link",
              "aria-label": $options.closeAriaLabel,
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('mask-hide')))
            }, _hoisted_4, 8, _hoisted_2)), [
              [_directive_ripple]
            ])
          : createCommentVNode("", true),
        (_ctx.$attrs.templates && _ctx.$attrs.templates['header'])
          ? (openBlock(), createElementBlock("div", _hoisted_5, [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.$attrs.templates['header'])))
            ]))
          : createCommentVNode("", true),
        createElementVNode("div", {
          class: "p-galleria-content",
          "aria-live": _ctx.$attrs.autoPlay ? 'polite' : 'off'
        }, [
          createVNode(_component_GalleriaItem, {
            id: $data.id,
            activeIndex: $data.activeIndex,
            "onUpdate:activeIndex": _cache[1] || (_cache[1] = $event => (($data.activeIndex) = $event)),
            slideShowActive: $data.slideShowActive,
            "onUpdate:slideShowActive": _cache[2] || (_cache[2] = $event => (($data.slideShowActive) = $event)),
            value: _ctx.$attrs.value,
            circular: _ctx.$attrs.circular,
            templates: _ctx.$attrs.templates,
            showIndicators: _ctx.$attrs.showIndicators,
            changeItemOnIndicatorHover: _ctx.$attrs.changeItemOnIndicatorHover,
            showItemNavigators: _ctx.$attrs.showItemNavigators,
            autoPlay: _ctx.$attrs.autoPlay,
            onStartSlideshow: $options.startSlideShow,
            onStopSlideshow: $options.stopSlideShow
          }, null, 8, ["id", "activeIndex", "slideShowActive", "value", "circular", "templates", "showIndicators", "changeItemOnIndicatorHover", "showItemNavigators", "autoPlay", "onStartSlideshow", "onStopSlideshow"]),
          (_ctx.$attrs.showThumbnails)
            ? (openBlock(), createBlock(_component_GalleriaThumbnails, {
                key: 0,
                activeIndex: $data.activeIndex,
                "onUpdate:activeIndex": _cache[3] || (_cache[3] = $event => (($data.activeIndex) = $event)),
                slideShowActive: $data.slideShowActive,
                "onUpdate:slideShowActive": _cache[4] || (_cache[4] = $event => (($data.slideShowActive) = $event)),
                containerId: $data.id,
                value: _ctx.$attrs.value,
                templates: _ctx.$attrs.templates,
                numVisible: $data.numVisible,
                responsiveOptions: _ctx.$attrs.responsiveOptions,
                circular: _ctx.$attrs.circular,
                isVertical: $options.isVertical(),
                contentHeight: _ctx.$attrs.verticalThumbnailViewPortHeight,
                showThumbnailNavigators: _ctx.$attrs.showThumbnailNavigators,
                prevButtonProps: _ctx.$attrs.prevButtonProps,
                nextButtonProps: _ctx.$attrs.nextButtonProps,
                onStopSlideshow: $options.stopSlideShow
              }, null, 8, ["activeIndex", "slideShowActive", "containerId", "value", "templates", "numVisible", "responsiveOptions", "circular", "isVertical", "contentHeight", "showThumbnailNavigators", "prevButtonProps", "nextButtonProps", "onStopSlideshow"]))
            : createCommentVNode("", true)
        ], 8, _hoisted_6),
        (_ctx.$attrs.templates && _ctx.$attrs.templates['footer'])
          ? (openBlock(), createElementBlock("div", _hoisted_7, [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.$attrs.templates['footer'])))
            ]))
          : createCommentVNode("", true)
      ], 16, _hoisted_1$1))
    : createCommentVNode("", true)
}

script$1.render = render$1;

var script = {
    name: 'Galleria',
    inheritAttrs: false,
    emits: ['update:activeIndex', 'update:visible'],
    props: {
        id: {
            type: String,
            default: null
        },
        value: {
            type: Array,
            default: null
        },
        activeIndex: {
            type: Number,
            default: 0
        },
        fullScreen: {
            type: Boolean,
            default: false
        },
        visible: {
            type: Boolean,
            default: false
        },
        numVisible: {
            type: Number,
            default: 3
        },
        responsiveOptions: {
            type: Array,
            default: null
        },
        showItemNavigators: {
            type: Boolean,
            default: false
        },
        showThumbnailNavigators: {
            type: Boolean,
            default: true
        },
        showItemNavigatorsOnHover: {
            type: Boolean,
            default: false
        },
        changeItemOnIndicatorHover: {
            type: Boolean,
            default: false
        },
        circular: {
            type: Boolean,
            default: false
        },
        autoPlay: {
            type: Boolean,
            default: false
        },
        transitionInterval: {
            type: Number,
            default: 4000
        },
        showThumbnails: {
            type: Boolean,
            default: true
        },
        thumbnailsPosition: {
            type: String,
            default: 'bottom'
        },
        verticalThumbnailViewPortHeight: {
            type: String,
            default: '300px'
        },
        showIndicators: {
            type: Boolean,
            default: false
        },
        showIndicatorsOnItem: {
            type: Boolean,
            default: false
        },
        indicatorsPosition: {
            type: String,
            default: 'bottom'
        },
        baseZIndex: {
            type: Number,
            default: 0
        },
        maskClass: {
            type: String,
            default: null
        },
        containerStyle: {
            type: null,
            default: null
        },
        containerClass: {
            type: null,
            default: null
        },
        containerProps: {
            type: null,
            default: null
        },
        prevButtonProps: {
            type: null,
            default: null
        },
        nextButtonProps: {
            type: null,
            default: null
        }
    },
    container: null,
    mask: null,
    data() {
        return {
            containerVisible: this.visible
        };
    },
    updated() {
        if (this.fullScreen && this.visible) {
            this.containerVisible = this.visible;
        }
    },
    beforeUnmount() {
        if (this.fullScreen) {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }

        this.mask = null;

        if (this.container) {
            ZIndexUtils.clear(this.container);
            this.container = null;
        }
    },
    methods: {
        onBeforeEnter(el) {
            ZIndexUtils.set('modal', el, this.baseZIndex || this.$primevue.config.zIndex.modal);
        },
        onEnter(el) {
            this.mask.style.zIndex = String(parseInt(el.style.zIndex, 10) - 1);
            DomHandler.addClass(document.body, 'p-overflow-hidden');
            this.focus();
        },
        onBeforeLeave() {
            DomHandler.addClass(this.mask, 'p-component-overlay-leave');
        },
        onAfterLeave(el) {
            ZIndexUtils.clear(el);
            this.containerVisible = false;
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
        },
        onActiveItemChange(index) {
            if (this.activeIndex !== index) {
                this.$emit('update:activeIndex', index);
            }
        },
        maskHide() {
            this.$emit('update:visible', false);
        },
        containerRef(el) {
            this.container = el;
        },
        maskRef(el) {
            this.mask = el;
        },
        focus() {
            let focusTarget = this.container.$el.querySelector('[autofocus]');

            if (focusTarget) {
                focusTarget.focus();
            }
        }
    },
    computed: {
        maskContentClass() {
            return [
                'p-galleria-mask p-component-overlay p-component-overlay-enter',
                this.maskClass,
                {
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false
                }
            ];
        }
    },
    components: {
        GalleriaContent: script$1,
        Portal: Portal
    },
    directives: {
        focustrap: FocusTrap
    }
};

const _hoisted_1 = ["role", "aria-modal"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_GalleriaContent = resolveComponent("GalleriaContent");
  const _component_Portal = resolveComponent("Portal");
  const _directive_focustrap = resolveDirective("focustrap");

  return ($props.fullScreen)
    ? (openBlock(), createBlock(_component_Portal, { key: 0 }, {
        default: withCtx(() => [
          ($data.containerVisible)
            ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref: $options.maskRef,
                class: normalizeClass($options.maskContentClass),
                role: $props.fullScreen ? 'dialog' : 'region',
                "aria-modal": $props.fullScreen ? 'true' : undefined
              }, [
                createVNode(Transition, {
                  name: "p-galleria",
                  onBeforeEnter: $options.onBeforeEnter,
                  onEnter: $options.onEnter,
                  onBeforeLeave: $options.onBeforeLeave,
                  onAfterLeave: $options.onAfterLeave,
                  appear: ""
                }, {
                  default: withCtx(() => [
                    ($props.visible)
                      ? withDirectives((openBlock(), createBlock(_component_GalleriaContent, mergeProps({
                          key: 0,
                          ref: $options.containerRef
                        }, _ctx.$props, {
                          onMaskHide: $options.maskHide,
                          templates: _ctx.$slots,
                          onActiveitemChange: $options.onActiveItemChange
                        }), null, 16, ["onMaskHide", "templates", "onActiveitemChange"])), [
                          [_directive_focustrap]
                        ])
                      : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["onBeforeEnter", "onEnter", "onBeforeLeave", "onAfterLeave"])
              ], 10, _hoisted_1))
            : createCommentVNode("", true)
        ]),
        _: 1
      }))
    : (openBlock(), createBlock(_component_GalleriaContent, mergeProps({ key: 1 }, _ctx.$props, {
        templates: _ctx.$slots,
        onActiveitemChange: $options.onActiveItemChange
      }), null, 16, ["templates", "onActiveitemChange"]))
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

var css_248z = "\n.p-galleria-content {\n    display: flex;\n    flex-direction: column;\n}\n.p-galleria-item-wrapper {\n    display: flex;\n    flex-direction: column;\n    position: relative;\n}\n.p-galleria-item-container {\n    position: relative;\n    display: flex;\n    height: 100%;\n}\n.p-galleria-item-nav {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n}\n.p-galleria-item-prev {\n    left: 0;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.p-galleria-item-next {\n    right: 0;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.p-galleria-item {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n}\n.p-galleria-item-nav-onhover .p-galleria-item-nav {\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity 0.2s ease-in-out;\n}\n.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav {\n    pointer-events: all;\n    opacity: 1;\n}\n.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav.p-disabled {\n    pointer-events: none;\n}\n.p-galleria-caption {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n}\n\n/* Thumbnails */\n.p-galleria-thumbnail-wrapper {\n    display: flex;\n    flex-direction: column;\n    overflow: auto;\n    flex-shrink: 0;\n}\n.p-galleria-thumbnail-prev,\n.p-galleria-thumbnail-next {\n    align-self: center;\n    flex: 0 0 auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    position: relative;\n}\n.p-galleria-thumbnail-prev span,\n.p-galleria-thumbnail-next span {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.p-galleria-thumbnail-container {\n    display: flex;\n    flex-direction: row;\n}\n.p-galleria-thumbnail-items-container {\n    overflow: hidden;\n    width: 100%;\n}\n.p-galleria-thumbnail-items {\n    display: flex;\n}\n.p-galleria-thumbnail-item {\n    overflow: auto;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    opacity: 0.5;\n}\n.p-galleria-thumbnail-item:hover {\n    opacity: 1;\n    transition: opacity 0.3s;\n}\n.p-galleria-thumbnail-item-current {\n    opacity: 1;\n}\n\n/* Positions */\n/* Thumbnails */\n.p-galleria-thumbnails-left .p-galleria-content,\n.p-galleria-thumbnails-right .p-galleria-content {\n    flex-direction: row;\n}\n.p-galleria-thumbnails-left .p-galleria-item-wrapper,\n.p-galleria-thumbnails-right .p-galleria-item-wrapper {\n    flex-direction: row;\n}\n.p-galleria-thumbnails-left .p-galleria-item-wrapper,\n.p-galleria-thumbnails-top .p-galleria-item-wrapper {\n    order: 2;\n}\n.p-galleria-thumbnails-left .p-galleria-thumbnail-wrapper,\n.p-galleria-thumbnails-top .p-galleria-thumbnail-wrapper {\n    order: 1;\n}\n.p-galleria-thumbnails-left .p-galleria-thumbnail-container,\n.p-galleria-thumbnails-right .p-galleria-thumbnail-container {\n    flex-direction: column;\n    flex-grow: 1;\n}\n.p-galleria-thumbnails-left .p-galleria-thumbnail-items,\n.p-galleria-thumbnails-right .p-galleria-thumbnail-items {\n    flex-direction: column;\n    height: 100%;\n}\n\n/* Indicators */\n.p-galleria-indicators {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-galleria-indicator > button {\n    display: inline-flex;\n    align-items: center;\n}\n.p-galleria-indicators-left .p-galleria-item-wrapper,\n.p-galleria-indicators-right .p-galleria-item-wrapper {\n    flex-direction: row;\n    align-items: center;\n}\n.p-galleria-indicators-left .p-galleria-item-container,\n.p-galleria-indicators-top .p-galleria-item-container {\n    order: 2;\n}\n.p-galleria-indicators-left .p-galleria-indicators,\n.p-galleria-indicators-top .p-galleria-indicators {\n    order: 1;\n}\n.p-galleria-indicators-left .p-galleria-indicators,\n.p-galleria-indicators-right .p-galleria-indicators {\n    flex-direction: column;\n}\n.p-galleria-indicator-onitem .p-galleria-indicators {\n    position: absolute;\n    display: flex;\n}\n.p-galleria-indicator-onitem.p-galleria-indicators-top .p-galleria-indicators {\n    top: 0;\n    left: 0;\n    width: 100%;\n    align-items: flex-start;\n}\n.p-galleria-indicator-onitem.p-galleria-indicators-right .p-galleria-indicators {\n    right: 0;\n    top: 0;\n    height: 100%;\n    align-items: flex-end;\n}\n.p-galleria-indicator-onitem.p-galleria-indicators-bottom .p-galleria-indicators {\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    align-items: flex-end;\n}\n.p-galleria-indicator-onitem.p-galleria-indicators-left .p-galleria-indicators {\n    left: 0;\n    top: 0;\n    height: 100%;\n    align-items: flex-start;\n}\n\n/* FullScreen */\n.p-galleria-mask {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-galleria-close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n}\n.p-galleria-mask .p-galleria-item-nav {\n    position: fixed;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n\n/* Animation */\n.p-galleria-enter-active {\n    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n}\n.p-galleria-leave-active {\n    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.p-galleria-enter-from,\n.p-galleria-leave-to {\n    opacity: 0;\n    transform: scale(0.7);\n}\n.p-galleria-enter-active .p-galleria-item-nav {\n    opacity: 0;\n}\n\n/* Keyboard Support */\n.p-items-hidden .p-galleria-thumbnail-item {\n    visibility: hidden;\n}\n.p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active {\n    visibility: visible;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
