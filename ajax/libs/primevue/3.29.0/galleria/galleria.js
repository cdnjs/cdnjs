this.primevue = this.primevue || {};
this.primevue.galleria = (function (BaseComponent, FocusTrap, Portal, utils, TimesIcon, Ripple, ChevronLeftIcon, ChevronRightIcon, vue, ChevronDownIcon, ChevronUpIcon) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var ChevronLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronLeftIcon);
    var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
    var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
    var ChevronUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronUpIcon);

    var script$3 = {
        name: 'GalleriaItem',
        extends: BaseComponent__default["default"],
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
        components: {
            ChevronLeftIcon: ChevronLeftIcon__default["default"],
            ChevronRightIcon: ChevronRightIcon__default["default"]
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1$3 = ["disabled"];
    const _hoisted_2$2 = ["id", "aria-label", "aria-roledescription"];
    const _hoisted_3$2 = ["disabled"];
    const _hoisted_4$1 = ["aria-label", "aria-selected", "aria-controls", "onClick", "onMouseenter", "onKeydown"];
    const _hoisted_5 = {
      key: 0,
      type: "button",
      tabindex: "-1",
      class: "p-link"
    };

    function render$3(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: "p-galleria-item-wrapper" }, _ctx.ptm('itemWrapper')), [
        vue.createElementVNode("div", vue.mergeProps({ class: "p-galleria-item-container" }, _ctx.ptm('itemContainer')), [
          ($props.showItemNavigators)
            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                key: 0,
                type: "button",
                class: $options.navBackwardClass,
                onClick: _cache[0] || (_cache[0] = $event => ($options.navBackward($event))),
                disabled: $options.isNavBackwardDisabled()
              }, _ctx.ptm('previousItemButton')), [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.previousitemicon || 'ChevronLeftIcon'), vue.mergeProps({ class: "p-galleria-item-prev-icon" }, _ctx.ptm('previousItemIcon')), null, 16))
              ], 16, _hoisted_1$3)), [
                [_directive_ripple]
              ])
            : vue.createCommentVNode("", true),
          vue.createElementVNode("div", vue.mergeProps({
            id: $props.id + '_item_' + $props.activeIndex,
            class: "p-galleria-item",
            role: "group",
            "aria-label": $options.ariaSlideNumber($props.activeIndex + 1),
            "aria-roledescription": $options.ariaSlideLabel
          }, _ctx.ptm('item')), [
            ($props.templates.item)
              ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.item), {
                  key: 0,
                  item: $options.activeItem
                }, null, 8, ["item"]))
              : vue.createCommentVNode("", true)
          ], 16, _hoisted_2$2),
          ($props.showItemNavigators)
            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                key: 1,
                type: "button",
                class: $options.navForwardClass,
                onClick: _cache[1] || (_cache[1] = $event => ($options.navForward($event))),
                disabled: $options.isNavForwardDisabled()
              }, _ctx.ptm('nextItemButton')), [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.nextitemicon || 'ChevronRightIcon'), vue.mergeProps({ class: "p-galleria-item-next-icon" }, _ctx.ptm('nextItemIcon')), null, 16))
              ], 16, _hoisted_3$2)), [
                [_directive_ripple]
              ])
            : vue.createCommentVNode("", true),
          ($props.templates['caption'])
            ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 2,
                class: "p-galleria-caption"
              }, _ctx.ptm('caption')), [
                ($props.templates.caption)
                  ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.caption), {
                      key: 0,
                      item: $options.activeItem
                    }, null, 8, ["item"]))
                  : vue.createCommentVNode("", true)
              ], 16))
            : vue.createCommentVNode("", true)
        ], 16),
        ($props.showIndicators)
          ? (vue.openBlock(), vue.createElementBlock("ul", vue.mergeProps({
              key: 0,
              class: "p-galleria-indicators p-reset"
            }, _ctx.ptm('indicators')), [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.value, (item, index) => {
                return (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                  key: `p-galleria-indicator-${index}`,
                  class: ['p-galleria-indicator', { 'p-highlight': $options.isIndicatorItemActive(index) }],
                  tabindex: "0",
                  "aria-label": $options.ariaPageLabel(index + 1),
                  "aria-selected": $props.activeIndex === index,
                  "aria-controls": $props.id + '_item_' + index,
                  onClick: $event => ($options.onIndicatorClick(index)),
                  onMouseenter: $event => ($options.onIndicatorMouseEnter(index)),
                  onKeydown: $event => ($options.onIndicatorKeyDown($event, index))
                }, _ctx.ptm('indicator')), [
                  (!$props.templates['indicator'])
                    ? (vue.openBlock(), vue.createElementBlock("button", _hoisted_5))
                    : vue.createCommentVNode("", true),
                  ($props.templates.indicator)
                    ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.indicator), {
                        key: 1,
                        index: index
                      }, null, 8, ["index"]))
                    : vue.createCommentVNode("", true)
                ], 16, _hoisted_4$1))
              }), 128))
            ], 16))
          : vue.createCommentVNode("", true)
      ], 16))
    }

    script$3.render = render$3;

    var script$2 = {
        name: 'GalleriaThumbnails',
        extends: BaseComponent__default["default"],
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
                    utils.DomHandler.removeClass(this.$refs.itemsContainer, 'p-items-hidden');
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
                    utils.DomHandler.removeClass(this.$refs.itemsContainer, 'p-items-hidden');
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
                const indicators = utils.DomHandler.find(this.$refs.itemsContainer, '.p-galleria-thumbnail-item');
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
                const indicators = utils.DomHandler.find(this.$refs.itemsContainer, '.p-galleria-thumbnail-item');
                const activeIndex = this.findFocusedIndicatorIndex();

                this.changedFocusedIndicator(activeIndex, indicators.length - 1);
            },
            onTabKey() {
                const indicators = [...utils.DomHandler.find(this.$refs.itemsContainer, '.p-galleria-thumbnail-item')];
                const highlightedIndex = indicators.findIndex((ind) => utils.DomHandler.hasClass(ind, 'p-galleria-thumbnail-item-current'));

                const activeIndicator = utils.DomHandler.findSingle(this.$refs.itemsContainer, '.p-galleria-thumbnail-item > [tabindex="0"');
                const activeIndex = indicators.findIndex((ind) => ind === activeIndicator.parentElement);

                indicators[activeIndex].children[0].tabIndex = '-1';
                indicators[highlightedIndex].children[0].tabIndex = '0';
            },
            findFocusedIndicatorIndex() {
                const indicators = [...utils.DomHandler.find(this.$refs.itemsContainer, '.p-galleria-thumbnail-item')];
                const activeIndicator = utils.DomHandler.findSingle(this.$refs.itemsContainer, '.p-galleria-thumbnail-item > [tabindex="0"]');

                return indicators.findIndex((ind) => ind === activeIndicator.parentElement);
            },
            changedFocusedIndicator(prevInd, nextInd) {
                const indicators = utils.DomHandler.find(this.$refs.itemsContainer, '.p-galleria-thumbnail-item');

                indicators[prevInd].children[0].tabIndex = '-1';
                indicators[nextInd].children[0].tabIndex = '0';
                indicators[nextInd].children[0].focus();
            },
            onTransitionEnd() {
                if (this.$refs.itemsContainer) {
                    utils.DomHandler.addClass(this.$refs.itemsContainer, 'p-items-hidden');
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
            ariaPrevButtonLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.prevPageLabel : undefined;
            },
            ariaNextButtonLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.nextPageLabel : undefined;
            }
        },
        components: {
            ChevronLeftIcon: ChevronLeftIcon__default["default"],
            ChevronRightIcon: ChevronRightIcon__default["default"],
            ChevronUpIcon: ChevronUpIcon__default["default"],
            ChevronDownIcon: ChevronDownIcon__default["default"]
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1$2 = ["disabled", "aria-label"];
    const _hoisted_2$1 = ["aria-selected", "aria-controls", "onKeydown"];
    const _hoisted_3$1 = ["tabindex", "aria-label", "aria-current", "onClick"];
    const _hoisted_4 = ["disabled", "aria-label"];

    function render$2(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: "p-galleria-thumbnail-wrapper" }, _ctx.ptm('thumbnailWrapper')), [
        vue.createElementVNode("div", vue.mergeProps({ class: "p-galleria-thumbnail-container" }, _ctx.ptm('thumbnailContainer')), [
          ($props.showThumbnailNavigators)
            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                key: 0,
                class: $options.navBackwardClass,
                disabled: $options.isNavBackwardDisabled(),
                type: "button",
                "aria-label": $options.ariaPrevButtonLabel,
                onClick: _cache[0] || (_cache[0] = $event => ($options.navBackward($event)))
              }, { ...$props.prevButtonProps, ..._ctx.ptm('previousThumbnailButton') }), [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.previousthumbnailicon || ($props.isVertical ? 'ChevronUpIcon' : 'ChevronLeftIcon')), vue.mergeProps({ class: "p-galleria-thumbnail-prev-icon" }, _ctx.ptm('previousThumbnailIcon')), null, 16))
              ], 16, _hoisted_1$2)), [
                [_directive_ripple]
              ])
            : vue.createCommentVNode("", true),
          vue.createElementVNode("div", vue.mergeProps({
            class: "p-galleria-thumbnail-items-container",
            style: { height: $props.isVertical ? $props.contentHeight : '' }
          }, _ctx.ptm('thumbnailItemsContainer')), [
            vue.createElementVNode("div", vue.mergeProps({
              ref: "itemsContainer",
              class: "p-galleria-thumbnail-items",
              role: "tablist",
              onTransitionend: _cache[1] || (_cache[1] = (...args) => ($options.onTransitionEnd && $options.onTransitionEnd(...args))),
              onTouchstart: _cache[2] || (_cache[2] = $event => ($options.onTouchStart($event))),
              onTouchmove: _cache[3] || (_cache[3] = $event => ($options.onTouchMove($event))),
              onTouchend: _cache[4] || (_cache[4] = $event => ($options.onTouchEnd($event)))
            }, _ctx.ptm('thumbnailItems')), [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.value, (item, index) => {
                return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: `p-galleria-thumbnail-item-${index}`,
                  class: [
                                'p-galleria-thumbnail-item',
                                {
                                    'p-galleria-thumbnail-item-current': $props.activeIndex === index,
                                    'p-galleria-thumbnail-item-active': $options.isItemActive(index),
                                    'p-galleria-thumbnail-item-start': $options.firstItemAciveIndex() === index,
                                    'p-galleria-thumbnail-item-end': $options.lastItemActiveIndex() === index
                                }
                            ],
                  role: "tab",
                  "aria-selected": $props.activeIndex === index,
                  "aria-controls": $props.containerId + '_item_' + index,
                  onKeydown: $event => ($options.onThumbnailKeydown($event, index))
                }, _ctx.ptm('thumbnailItem')), [
                  vue.createElementVNode("div", vue.mergeProps({
                    class: "p-galleria-thumbnail-item-content",
                    tabindex: $props.activeIndex === index ? '0' : '-1',
                    "aria-label": $options.ariaPageLabel(index + 1),
                    "aria-current": $props.activeIndex === index ? 'page' : undefined,
                    onClick: $event => ($options.onItemClick(index))
                  }, _ctx.ptm('thumbnailItemContent')), [
                    ($props.templates.thumbnail)
                      ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.thumbnail), {
                          key: 0,
                          item: item
                        }, null, 8, ["item"]))
                      : vue.createCommentVNode("", true)
                  ], 16, _hoisted_3$1)
                ], 16, _hoisted_2$1))
              }), 128))
            ], 16)
          ], 16),
          ($props.showThumbnailNavigators)
            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                key: 1,
                class: $options.navForwardClass,
                disabled: $options.isNavForwardDisabled(),
                type: "button",
                "aria-label": $options.ariaNextButtonLabel,
                onClick: _cache[5] || (_cache[5] = $event => ($options.navForward($event)))
              }, { ...$props.nextButtonProps, ..._ctx.ptm('nextThumbnailButton') }), [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.nextthumbnailicon || ($props.isVertical ? 'ChevronDownIcon' : 'ChevronRightIcon')), vue.mergeProps({ class: "p-galleria-thumbnail-next-icon" }, _ctx.ptm('nextThumbnailIcon')), null, 16))
              ], 16, _hoisted_4)), [
                [_directive_ripple]
              ])
            : vue.createCommentVNode("", true)
        ], 16)
      ], 16))
    }

    script$2.render = render$2;

    var script$1 = {
        name: 'GalleriaContent',
        extends: BaseComponent__default["default"],
        inheritAttrs: false,
        interval: null,
        emits: ['activeitem-change', 'mask-hide'],
        data() {
            return {
                id: this.$attrs.id || utils.UniqueComponentId(),
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
            },
            '$attrs.autoPlay': function (newVal) {
                newVal ? this.startSlideShow() : this.stopSlideShow();
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
            GalleriaThumbnails: script$2,
            TimesIcon: TimesIcon__default["default"]
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1$1 = ["id"];
    const _hoisted_2 = ["aria-label"];
    const _hoisted_3 = ["aria-live"];

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_GalleriaItem = vue.resolveComponent("GalleriaItem");
      const _component_GalleriaThumbnails = vue.resolveComponent("GalleriaThumbnails");
      const _directive_ripple = vue.resolveDirective("ripple");

      return (_ctx.$attrs.value && _ctx.$attrs.value.length > 0)
        ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            id: $data.id,
            class: $options.galleriaClass,
            style: _ctx.$attrs.containerStyle
          }, { ..._ctx.$attrs.containerProps, ..._ctx.ptm('root') }), [
            (_ctx.$attrs.fullScreen)
              ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                  key: 0,
                  autofocus: "",
                  type: "button",
                  class: "p-galleria-close p-link",
                  "aria-label": $options.closeAriaLabel,
                  onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('mask-hide')))
                }, _ctx.ptm('closeButton')), [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$attrs.templates['closeicon'] || 'TimesIcon'), vue.mergeProps({ class: "p-galleria-close-icon" }, _ctx.ptm('closeIcon')), null, 16))
                ], 16, _hoisted_2)), [
                  [_directive_ripple]
                ])
              : vue.createCommentVNode("", true),
            (_ctx.$attrs.templates && _ctx.$attrs.templates['header'])
              ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 1,
                  class: "p-galleria-header"
                }, _ctx.ptm('header')), [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$attrs.templates['header'])))
                ], 16))
              : vue.createCommentVNode("", true),
            vue.createElementVNode("div", vue.mergeProps({
              class: "p-galleria-content",
              "aria-live": _ctx.$attrs.autoPlay ? 'polite' : 'off'
            }, _ctx.ptm('content')), [
              vue.createVNode(_component_GalleriaItem, {
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
                onStopSlideshow: $options.stopSlideShow,
                pt: _ctx.pt
              }, null, 8, ["id", "activeIndex", "slideShowActive", "value", "circular", "templates", "showIndicators", "changeItemOnIndicatorHover", "showItemNavigators", "autoPlay", "onStartSlideshow", "onStopSlideshow", "pt"]),
              (_ctx.$attrs.showThumbnails)
                ? (vue.openBlock(), vue.createBlock(_component_GalleriaThumbnails, {
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
                    onStopSlideshow: $options.stopSlideShow,
                    pt: _ctx.pt
                  }, null, 8, ["activeIndex", "slideShowActive", "containerId", "value", "templates", "numVisible", "responsiveOptions", "circular", "isVertical", "contentHeight", "showThumbnailNavigators", "prevButtonProps", "nextButtonProps", "onStopSlideshow", "pt"]))
                : vue.createCommentVNode("", true)
            ], 16, _hoisted_3),
            (_ctx.$attrs.templates && _ctx.$attrs.templates['footer'])
              ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 2,
                  class: "p-galleria-footer"
                }, _ctx.ptm('footer')), [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$attrs.templates['footer'])))
                ], 16))
              : vue.createCommentVNode("", true)
          ], 16, _hoisted_1$1))
        : vue.createCommentVNode("", true)
    }

    script$1.render = render$1;

    var script = {
        name: 'Galleria',
        extends: BaseComponent__default["default"],
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
                utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }

            this.mask = null;

            if (this.container) {
                utils.ZIndexUtils.clear(this.container);
                this.container = null;
            }
        },
        methods: {
            onBeforeEnter(el) {
                utils.ZIndexUtils.set('modal', el, this.baseZIndex || this.$primevue.config.zIndex.modal);
            },
            onEnter(el) {
                this.mask.style.zIndex = String(parseInt(el.style.zIndex, 10) - 1);
                utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
                this.focus();
            },
            onBeforeLeave() {
                utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
            },
            onAfterLeave(el) {
                utils.ZIndexUtils.clear(el);
                this.containerVisible = false;
                utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
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
            Portal: Portal__default["default"]
        },
        directives: {
            focustrap: FocusTrap__default["default"]
        }
    };

    const _hoisted_1 = ["role", "aria-modal"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_GalleriaContent = vue.resolveComponent("GalleriaContent");
      const _component_Portal = vue.resolveComponent("Portal");
      const _directive_focustrap = vue.resolveDirective("focustrap");

      return ($props.fullScreen)
        ? (vue.openBlock(), vue.createBlock(_component_Portal, { key: 0 }, {
            default: vue.withCtx(() => [
              ($data.containerVisible)
                ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                    key: 0,
                    ref: $options.maskRef,
                    class: $options.maskContentClass,
                    role: $props.fullScreen ? 'dialog' : 'region',
                    "aria-modal": $props.fullScreen ? 'true' : undefined
                  }, _ctx.ptm('mask')), [
                    vue.createVNode(vue.Transition, {
                      name: "p-galleria",
                      onBeforeEnter: $options.onBeforeEnter,
                      onEnter: $options.onEnter,
                      onBeforeLeave: $options.onBeforeLeave,
                      onAfterLeave: $options.onAfterLeave,
                      appear: ""
                    }, {
                      default: vue.withCtx(() => [
                        ($props.visible)
                          ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_GalleriaContent, vue.mergeProps({
                              key: 0,
                              ref: $options.containerRef,
                              onMaskHide: $options.maskHide,
                              templates: _ctx.$slots,
                              onActiveitemChange: $options.onActiveItemChange,
                              pt: _ctx.pt
                            }, _ctx.$props), null, 16, ["onMaskHide", "templates", "onActiveitemChange", "pt"])), [
                              [_directive_focustrap]
                            ])
                          : vue.createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["onBeforeEnter", "onEnter", "onBeforeLeave", "onAfterLeave"])
                  ], 16, _hoisted_1))
                : vue.createCommentVNode("", true)
            ]),
            _: 1
          }))
        : (vue.openBlock(), vue.createBlock(_component_GalleriaContent, vue.mergeProps({
            key: 1,
            templates: _ctx.$slots,
            onActiveitemChange: $options.onActiveItemChange,
            pt: _ctx.pt
          }, _ctx.$props), null, 16, ["templates", "onActiveitemChange", "pt"]))
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

    return script;

})(primevue.basecomponent, primevue.focustrap, primevue.portal, primevue.utils, primevue.icons.times, primevue.ripple, primevue.icons.chevronleft, primevue.icons.chevronright, Vue, primevue.icons.chevrondown, primevue.icons.chevronup);
