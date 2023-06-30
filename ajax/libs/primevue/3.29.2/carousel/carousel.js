this.primevue = this.primevue || {};
this.primevue.carousel = (function (BaseComponent, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, Ripple, utils, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
    var ChevronLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronLeftIcon);
    var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
    var ChevronUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronUpIcon);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var script = {
        name: 'Carousel',
        extends: BaseComponent__default["default"],
        emits: ['update:page'],
        props: {
            value: null,
            page: {
                type: Number,
                default: 0
            },
            numVisible: {
                type: Number,
                default: 1
            },
            numScroll: {
                type: Number,
                default: 1
            },
            responsiveOptions: Array,
            orientation: {
                type: String,
                default: 'horizontal'
            },
            verticalViewPortHeight: {
                type: String,
                default: '300px'
            },
            contentClass: String,
            containerClass: String,
            indicatorsContentClass: String,
            circular: {
                type: Boolean,
                default: false
            },
            autoplayInterval: {
                type: Number,
                default: 0
            },
            showNavigators: {
                type: Boolean,
                default: true
            },
            showIndicators: {
                type: Boolean,
                default: true
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
        isRemainingItemsAdded: false,
        data() {
            return {
                remainingItems: 0,
                d_numVisible: this.numVisible,
                d_numScroll: this.numScroll,
                d_oldNumScroll: 0,
                d_oldNumVisible: 0,
                d_oldValue: null,
                d_page: this.page,
                totalShiftedItems: this.page * this.numScroll * -1,
                allowAutoplay: !!this.autoplayInterval,
                d_circular: this.circular || this.allowAutoplay,
                swipeThreshold: 20
            };
        },
        watch: {
            page(newValue) {
                this.d_page = newValue;
            },
            circular(newValue) {
                this.d_circular = newValue;
            },
            numVisible(newValue, oldValue) {
                this.d_numVisible = newValue;
                this.d_oldNumVisible = oldValue;
            },
            numScroll(newValue, oldValue) {
                this.d_oldNumScroll = oldValue;
                this.d_numScroll = newValue;
            },
            value(oldValue) {
                this.d_oldValue = oldValue;
            }
        },
        mounted() {
            let stateChanged = false;

            this.$el.setAttribute(this.attributeSelector, '');
            this.createStyle();
            this.calculatePosition();

            if (this.responsiveOptions) {
                this.bindDocumentListeners();
            }

            if (this.isCircular()) {
                let totalShiftedItems = this.totalShiftedItems;

                if (this.d_page === 0) {
                    totalShiftedItems = -1 * this.d_numVisible;
                } else if (totalShiftedItems === 0) {
                    totalShiftedItems = -1 * this.value.length;

                    if (this.remainingItems > 0) {
                        this.isRemainingItemsAdded = true;
                    }
                }

                if (totalShiftedItems !== this.totalShiftedItems) {
                    this.totalShiftedItems = totalShiftedItems;

                    stateChanged = true;
                }
            }

            if (!stateChanged && this.isAutoplay()) {
                this.startAutoplay();
            }
        },
        updated() {
            const isCircular = this.isCircular();
            let stateChanged = false;
            let totalShiftedItems = this.totalShiftedItems;

            if (this.autoplayInterval) {
                this.stopAutoplay();
            }

            if (this.d_oldNumScroll !== this.d_numScroll || this.d_oldNumVisible !== this.d_numVisible || this.d_oldValue.length !== this.value.length) {
                this.remainingItems = (this.value.length - this.d_numVisible) % this.d_numScroll;

                let page = this.d_page;

                if (this.totalIndicators !== 0 && page >= this.totalIndicators) {
                    page = this.totalIndicators - 1;

                    this.$emit('update:page', page);
                    this.d_page = page;

                    stateChanged = true;
                }

                totalShiftedItems = page * this.d_numScroll * -1;

                if (isCircular) {
                    totalShiftedItems -= this.d_numVisible;
                }

                if (page === this.totalIndicators - 1 && this.remainingItems > 0) {
                    totalShiftedItems += -1 * this.remainingItems + this.d_numScroll;
                    this.isRemainingItemsAdded = true;
                } else {
                    this.isRemainingItemsAdded = false;
                }

                if (totalShiftedItems !== this.totalShiftedItems) {
                    this.totalShiftedItems = totalShiftedItems;

                    stateChanged = true;
                }

                this.d_oldNumScroll = this.d_numScroll;
                this.d_oldNumVisible = this.d_numVisible;
                this.d_oldValue = this.value;

                this.$refs.itemsContainer.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
            }

            if (isCircular) {
                if (this.d_page === 0) {
                    totalShiftedItems = -1 * this.d_numVisible;
                } else if (totalShiftedItems === 0) {
                    totalShiftedItems = -1 * this.value.length;

                    if (this.remainingItems > 0) {
                        this.isRemainingItemsAdded = true;
                    }
                }

                if (totalShiftedItems !== this.totalShiftedItems) {
                    this.totalShiftedItems = totalShiftedItems;

                    stateChanged = true;
                }
            }

            if (!stateChanged && this.isAutoplay()) {
                this.startAutoplay();
            }
        },
        beforeUnmount() {
            if (this.responsiveOptions) {
                this.unbindDocumentListeners();
            }

            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
        },
        methods: {
            step(dir, page) {
                let totalShiftedItems = this.totalShiftedItems;
                const isCircular = this.isCircular();

                if (page != null) {
                    totalShiftedItems = this.d_numScroll * page * -1;

                    if (isCircular) {
                        totalShiftedItems -= this.d_numVisible;
                    }

                    this.isRemainingItemsAdded = false;
                } else {
                    totalShiftedItems += this.d_numScroll * dir;

                    if (this.isRemainingItemsAdded) {
                        totalShiftedItems += this.remainingItems - this.d_numScroll * dir;
                        this.isRemainingItemsAdded = false;
                    }

                    let originalShiftedItems = isCircular ? totalShiftedItems + this.d_numVisible : totalShiftedItems;

                    page = Math.abs(Math.floor(originalShiftedItems / this.d_numScroll));
                }

                if (isCircular && this.d_page === this.totalIndicators - 1 && dir === -1) {
                    totalShiftedItems = -1 * (this.value.length + this.d_numVisible);
                    page = 0;
                } else if (isCircular && this.d_page === 0 && dir === 1) {
                    totalShiftedItems = 0;
                    page = this.totalIndicators - 1;
                } else if (page === this.totalIndicators - 1 && this.remainingItems > 0) {
                    totalShiftedItems += this.remainingItems * -1 - this.d_numScroll * dir;
                    this.isRemainingItemsAdded = true;
                }

                if (this.$refs.itemsContainer) {
                    utils.DomHandler.removeClass(this.$refs.itemsContainer, 'p-items-hidden');
                    this.$refs.itemsContainer.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
                    this.$refs.itemsContainer.style.transition = 'transform 500ms ease 0s';
                }

                this.totalShiftedItems = totalShiftedItems;

                this.$emit('update:page', page);
                this.d_page = page;
            },
            calculatePosition() {
                if (this.$refs.itemsContainer && this.responsiveOptions) {
                    let windowWidth = window.innerWidth;
                    let matchedResponsiveOptionsData = {
                        numVisible: this.numVisible,
                        numScroll: this.numScroll
                    };

                    for (let i = 0; i < this.responsiveOptions.length; i++) {
                        let res = this.responsiveOptions[i];

                        if (parseInt(res.breakpoint, 10) >= windowWidth) {
                            matchedResponsiveOptionsData = res;
                        }
                    }

                    if (this.d_numScroll !== matchedResponsiveOptionsData.numScroll) {
                        let page = this.d_page;

                        page = parseInt((page * this.d_numScroll) / matchedResponsiveOptionsData.numScroll);

                        this.totalShiftedItems = matchedResponsiveOptionsData.numScroll * page * -1;

                        if (this.isCircular()) {
                            this.totalShiftedItems -= matchedResponsiveOptionsData.numVisible;
                        }

                        this.d_numScroll = matchedResponsiveOptionsData.numScroll;

                        this.$emit('update:page', page);
                        this.d_page = page;
                    }

                    if (this.d_numVisible !== matchedResponsiveOptionsData.numVisible) {
                        this.d_numVisible = matchedResponsiveOptionsData.numVisible;
                    }
                }
            },
            navBackward(e, index) {
                if (this.d_circular || this.d_page !== 0) {
                    this.step(1, index);
                }

                this.allowAutoplay = false;

                if (e.cancelable) {
                    e.preventDefault();
                }
            },
            navForward(e, index) {
                if (this.d_circular || this.d_page < this.totalIndicators - 1) {
                    this.step(-1, index);
                }

                this.allowAutoplay = false;

                if (e.cancelable) {
                    e.preventDefault();
                }
            },
            onIndicatorClick(e, index) {
                let page = this.d_page;

                if (index > page) {
                    this.navForward(e, index);
                } else if (index < page) {
                    this.navBackward(e, index);
                }
            },
            onTransitionEnd() {
                if (this.$refs.itemsContainer) {
                    utils.DomHandler.addClass(this.$refs.itemsContainer, 'p-items-hidden');
                    this.$refs.itemsContainer.style.transition = '';

                    if ((this.d_page === 0 || this.d_page === this.totalIndicators - 1) && this.isCircular()) {
                        this.$refs.itemsContainer.style.transform = this.isVertical() ? `translate3d(0, ${this.totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${this.totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
                    }
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

                if (this.isVertical()) {
                    this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
                } else {
                    this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
                }
            },
            changePageOnTouch(e, diff) {
                if (Math.abs(diff) > this.swipeThreshold) {
                    if (diff < 0) {
                        // left
                        this.navForward(e);
                    } else {
                        // right
                        this.navBackward(e);
                    }
                }
            },
            onIndicatorKeydown(event) {
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
                const indicators = [...utils.DomHandler.find(this.$refs.indicatorContent, '.p-carousel-indicator')];
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
                const indicators = [...utils.DomHandler.find(this.$refs.indicatorContent, '.p-carousel-indicator')];
                const activeIndex = this.findFocusedIndicatorIndex();

                this.changedFocusedIndicator(activeIndex, indicators.length - 1);
            },
            onTabKey() {
                const indicators = [...utils.DomHandler.find(this.$refs.indicatorContent, '.p-carousel-indicator')];
                const highlightedIndex = indicators.findIndex((ind) => utils.DomHandler.hasClass(ind, 'p-highlight'));

                const activeIndicator = utils.DomHandler.findSingle(this.$refs.indicatorContent, '.p-carousel-indicator > button[tabindex="0"]');
                const activeIndex = indicators.findIndex((ind) => ind === activeIndicator.parentElement);

                indicators[activeIndex].children[0].tabIndex = '-1';
                indicators[highlightedIndex].children[0].tabIndex = '0';
            },
            findFocusedIndicatorIndex() {
                const indicators = [...utils.DomHandler.find(this.$refs.indicatorContent, '.p-carousel-indicator')];
                const activeIndicator = utils.DomHandler.findSingle(this.$refs.indicatorContent, '.p-carousel-indicator > button[tabindex="0"]');

                return indicators.findIndex((ind) => ind === activeIndicator.parentElement);
            },
            changedFocusedIndicator(prevInd, nextInd) {
                const indicators = [...utils.DomHandler.find(this.$refs.indicatorContent, '.p-carousel-indicator')];

                indicators[prevInd].children[0].tabIndex = '-1';
                indicators[nextInd].children[0].tabIndex = '0';
                indicators[nextInd].children[0].focus();
            },
            bindDocumentListeners() {
                if (!this.documentResizeListener) {
                    this.documentResizeListener = (e) => {
                        this.calculatePosition(e);
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
            startAutoplay() {
                this.interval = setInterval(() => {
                    if (this.d_page === this.totalIndicators - 1) {
                        this.step(-1, 0);
                    } else {
                        this.step(-1, this.d_page + 1);
                    }
                }, this.autoplayInterval);
            },
            stopAutoplay() {
                if (this.interval) {
                    clearInterval(this.interval);
                }
            },
            createStyle() {
                if (!this.carouselStyle) {
                    this.carouselStyle = document.createElement('style');
                    this.carouselStyle.type = 'text/css';
                    document.body.appendChild(this.carouselStyle);
                }

                let innerHTML = `
                .p-carousel[${this.attributeSelector}] .p-carousel-item {
                    flex: 1 0 ${100 / this.d_numVisible}%
                }
            `;

                if (this.responsiveOptions) {
                    let _responsiveOptions = [...this.responsiveOptions];

                    _responsiveOptions.sort((data1, data2) => {
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

                    for (let i = 0; i < _responsiveOptions.length; i++) {
                        let res = _responsiveOptions[i];

                        innerHTML += `
                        @media screen and (max-width: ${res.breakpoint}) {
                            .p-carousel[${this.attributeSelector}] .p-carousel-item {
                                flex: 1 0 ${100 / res.numVisible}%
                            }
                        }
                    `;
                    }
                }

                this.carouselStyle.innerHTML = innerHTML;
            },
            isVertical() {
                return this.orientation === 'vertical';
            },
            isCircular() {
                return this.value && this.d_circular && this.value.length >= this.d_numVisible;
            },
            isAutoplay() {
                return this.autoplayInterval && this.allowAutoplay;
            },
            firstIndex() {
                return this.isCircular() ? -1 * (this.totalShiftedItems + this.d_numVisible) : this.totalShiftedItems * -1;
            },
            lastIndex() {
                return this.firstIndex() + this.d_numVisible - 1;
            },
            ariaSlideNumber(value) {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g, value) : undefined;
            },
            ariaPageLabel(value) {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g, value) : undefined;
            }
        },
        computed: {
            totalIndicators() {
                return this.value ? Math.max(Math.ceil((this.value.length - this.d_numVisible) / this.d_numScroll) + 1, 0) : 0;
            },
            backwardIsDisabled() {
                return this.value && (!this.circular || this.value.length < this.d_numVisible) && this.d_page === 0;
            },
            forwardIsDisabled() {
                return this.value && (!this.circular || this.value.length < this.d_numVisible) && (this.d_page === this.totalIndicators - 1 || this.totalIndicators === 0);
            },
            containerClasses() {
                return ['p-carousel-container', this.containerClass];
            },
            contentClasses() {
                return ['p-carousel-content ', this.contentClass];
            },
            indicatorsContentClasses() {
                return ['p-carousel-indicators p-reset', this.indicatorsContentClass];
            },
            ariaSlideLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.slide : undefined;
            },
            ariaPrevButtonLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.prevPageLabel : undefined;
            },
            ariaNextButtonLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.nextPageLabel : undefined;
            },
            attributeSelector() {
                return utils.UniqueComponentId();
            }
        },
        components: {
            ChevronRightIcon: ChevronRightIcon__default["default"],
            ChevronDownIcon: ChevronDownIcon__default["default"],
            ChevronLeftIcon: ChevronLeftIcon__default["default"],
            ChevronUpIcon: ChevronUpIcon__default["default"]
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1 = ["aria-live"];
    const _hoisted_2 = ["disabled", "aria-label"];
    const _hoisted_3 = ["aria-hidden", "aria-label", "aria-roledescription"];
    const _hoisted_4 = ["disabled", "aria-label"];
    const _hoisted_5 = ["tabindex", "aria-label", "aria-current", "onClick"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        class: ['p-carousel p-component', { 'p-carousel-vertical': $options.isVertical(), 'p-carousel-horizontal': !$options.isVertical() }],
        role: "region"
      }, _ctx.ptm('root')), [
        (_ctx.$slots.header)
          ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: 0,
              class: "p-carousel-header"
            }, _ctx.ptm('header')), [
              vue.renderSlot(_ctx.$slots, "header")
            ], 16))
          : vue.createCommentVNode("", true),
        vue.createElementVNode("div", vue.mergeProps({ class: $options.contentClasses }, _ctx.ptm('content')), [
          vue.createElementVNode("div", vue.mergeProps({
            class: $options.containerClasses,
            "aria-live": $data.allowAutoplay ? 'polite' : 'off'
          }, _ctx.ptm('container')), [
            ($props.showNavigators)
              ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                  key: 0,
                  type: "button",
                  class: ['p-carousel-prev p-link', { 'p-disabled': $options.backwardIsDisabled }],
                  disabled: $options.backwardIsDisabled,
                  "aria-label": $options.ariaPrevButtonLabel,
                  onClick: _cache[0] || (_cache[0] = (...args) => ($options.navBackward && $options.navBackward(...args)))
                }, { ...$props.prevButtonProps, ..._ctx.ptm('previousButton') }), [
                  vue.renderSlot(_ctx.$slots, "previousicon", {}, () => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.isVertical() ? 'ChevronUpIcon' : 'ChevronLeftIcon'), vue.mergeProps({ class: "p-carousel-next-icon" }, _ctx.ptm('previousButtonIcon')), null, 16))
                  ])
                ], 16, _hoisted_2)), [
                  [_directive_ripple]
                ])
              : vue.createCommentVNode("", true),
            vue.createElementVNode("div", vue.mergeProps({
              class: "p-carousel-items-content",
              style: [{ height: $options.isVertical() ? $props.verticalViewPortHeight : 'auto' }],
              onTouchend: _cache[2] || (_cache[2] = (...args) => ($options.onTouchEnd && $options.onTouchEnd(...args))),
              onTouchstart: _cache[3] || (_cache[3] = (...args) => ($options.onTouchStart && $options.onTouchStart(...args))),
              onTouchmove: _cache[4] || (_cache[4] = (...args) => ($options.onTouchMove && $options.onTouchMove(...args)))
            }, _ctx.ptm('itemsContent')), [
              vue.createElementVNode("div", vue.mergeProps({
                ref: "itemsContainer",
                class: "p-carousel-items-container",
                onTransitionend: _cache[1] || (_cache[1] = (...args) => ($options.onTransitionEnd && $options.onTransitionEnd(...args)))
              }, _ctx.ptm('itemsContainer')), [
                ($options.isCircular())
                  ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList($props.value.slice(-1 * $data.d_numVisible), (item, index) => {
                      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                        key: index + '_scloned',
                        class: [
                                        'p-carousel-item p-carousel-item-cloned',
                                        { 'p-carousel-item-active': $data.totalShiftedItems * -1 === $props.value.length + $data.d_numVisible, 'p-carousel-item-start': 0 === index, 'p-carousel-item-end': $props.value.slice(-1 * $data.d_numVisible).length - 1 === index }
                                    ]
                      }, _ctx.ptm('itemCloned')), [
                        vue.renderSlot(_ctx.$slots, "item", {
                          data: item,
                          index: index
                        })
                      ], 16))
                    }), 128))
                  : vue.createCommentVNode("", true),
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.value, (item, index) => {
                  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                    key: index,
                    class: ['p-carousel-item', { 'p-carousel-item-active': $options.firstIndex() <= index && $options.lastIndex() >= index, 'p-carousel-item-start': $options.firstIndex() === index, 'p-carousel-item-end': $options.lastIndex() === index }],
                    role: "group",
                    "aria-hidden": $options.firstIndex() > index || $options.lastIndex() < index ? true : undefined,
                    "aria-label": $options.ariaSlideNumber(index),
                    "aria-roledescription": $options.ariaSlideLabel
                  }, _ctx.ptm('item')), [
                    vue.renderSlot(_ctx.$slots, "item", {
                      data: item,
                      index: index
                    })
                  ], 16, _hoisted_3))
                }), 128)),
                ($options.isCircular())
                  ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList($props.value.slice(0, $data.d_numVisible), (item, index) => {
                      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                        key: index + '_fcloned',
                        class: ['p-carousel-item p-carousel-item-cloned', { 'p-carousel-item-active': $data.totalShiftedItems === 0, 'p-carousel-item-start': 0 === index, 'p-carousel-item-end': $props.value.slice(0, $data.d_numVisible).length - 1 === index }]
                      }, _ctx.ptm('itemCloned')), [
                        vue.renderSlot(_ctx.$slots, "item", {
                          data: item,
                          index: index
                        })
                      ], 16))
                    }), 128))
                  : vue.createCommentVNode("", true)
              ], 16)
            ], 16),
            ($props.showNavigators)
              ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                  key: 1,
                  type: "button",
                  class: ['p-carousel-next p-link', { 'p-disabled': $options.forwardIsDisabled }],
                  disabled: $options.forwardIsDisabled,
                  "aria-label": $options.ariaNextButtonLabel,
                  onClick: _cache[5] || (_cache[5] = (...args) => ($options.navForward && $options.navForward(...args)))
                }, { ...$props.nextButtonProps, ..._ctx.ptm('nextButton') }), [
                  vue.renderSlot(_ctx.$slots, "nexticon", {}, () => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.isVertical() ? 'ChevronDownIcon' : 'ChevronRightIcon'), vue.mergeProps({ class: "p-carousel-prev-icon" }, _ctx.ptm('nextButtonIcon')), null, 16))
                  ])
                ], 16, _hoisted_4)), [
                  [_directive_ripple]
                ])
              : vue.createCommentVNode("", true)
          ], 16, _hoisted_1),
          ($options.totalIndicators >= 0 && $props.showIndicators)
            ? (vue.openBlock(), vue.createElementBlock("ul", vue.mergeProps({
                key: 0,
                ref: "indicatorContent",
                class: $options.indicatorsContentClasses,
                onKeydown: _cache[6] || (_cache[6] = (...args) => ($options.onIndicatorKeydown && $options.onIndicatorKeydown(...args)))
              }, _ctx.ptm('indicators')), [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.totalIndicators, (indicator, i) => {
                  return (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                    key: 'p-carousel-indicator-' + i.toString(),
                    class: ['p-carousel-indicator', { 'p-highlight': $data.d_page === i }]
                  }, _ctx.ptm('indicator')), [
                    vue.createElementVNode("button", vue.mergeProps({
                      class: "p-link",
                      type: "button",
                      tabindex: $data.d_page === i ? '0' : '-1',
                      "aria-label": $options.ariaPageLabel(i + 1),
                      "aria-current": $data.d_page === i ? 'page' : undefined,
                      onClick: $event => ($options.onIndicatorClick($event, i))
                    }, _ctx.ptm('indicatorButton')), null, 16, _hoisted_5)
                  ], 16))
                }), 128))
              ], 16))
            : vue.createCommentVNode("", true)
        ], 16),
        (_ctx.$slots.footer)
          ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: 1,
              class: "p-carousel-footer"
            }, _ctx.ptm('footer')), [
              vue.renderSlot(_ctx.$slots, "footer")
            ], 16))
          : vue.createCommentVNode("", true)
      ], 16))
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

    var css_248z = "\n.p-carousel {\n    display: flex;\n    flex-direction: column;\n}\n.p-carousel-content {\n    display: flex;\n    flex-direction: column;\n    overflow: auto;\n}\n.p-carousel-prev,\n.p-carousel-next {\n    align-self: center;\n    flex-grow: 0;\n    flex-shrink: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    position: relative;\n}\n.p-carousel-container {\n    display: flex;\n    flex-direction: row;\n}\n.p-carousel-items-content {\n    overflow: hidden;\n    width: 100%;\n}\n.p-carousel-items-container {\n    display: flex;\n    flex-direction: row;\n}\n.p-carousel-indicators {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    flex-wrap: wrap;\n}\n.p-carousel-indicator > button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n/* Vertical */\n.p-carousel-vertical .p-carousel-container {\n    flex-direction: column;\n}\n.p-carousel-vertical .p-carousel-items-container {\n    flex-direction: column;\n    height: 100%;\n}\n\n/* Keyboard Support */\n.p-items-hidden .p-carousel-item {\n    visibility: hidden;\n}\n.p-items-hidden .p-carousel-item.p-carousel-item-active {\n    visibility: visible;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.icons.chevrondown, primevue.icons.chevronleft, primevue.icons.chevronright, primevue.icons.chevronup, primevue.ripple, primevue.utils, Vue);
