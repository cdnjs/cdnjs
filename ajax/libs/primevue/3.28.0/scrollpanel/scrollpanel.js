this.primevue = this.primevue || {};
this.primevue.scrollpanel = (function (BaseComponent, utils, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script = {
        name: 'ScrollPanel',
        extends: BaseComponent__default["default"],
        props: {
            step: {
                type: Number,
                default: 5
            }
        },
        initialized: false,
        documentResizeListener: null,
        documentMouseMoveListener: null,
        documentMouseUpListener: null,
        frame: null,
        scrollXRatio: null,
        scrollYRatio: null,
        isXBarClicked: false,
        isYBarClicked: false,
        lastPageX: null,
        lastPageY: null,
        timer: null,
        outsideClickListener: null,
        data() {
            return {
                id: utils.UniqueComponentId(),
                orientation: 'vertical',
                lastScrollTop: 0,
                lastScrollLeft: 0
            };
        },
        mounted() {
            if (this.$el.offsetParent) {
                this.initialize();
            }
        },
        updated() {
            if (!this.initialized && this.$el.offsetParent) {
                this.initialize();
            }
        },
        beforeUnmount() {
            this.unbindDocumentResizeListener();

            if (this.frame) {
                window.cancelAnimationFrame(this.frame);
            }
        },
        methods: {
            initialize() {
                this.moveBar();
                this.bindDocumentResizeListener();
                this.calculateContainerHeight();
            },
            calculateContainerHeight() {
                let containerStyles = getComputedStyle(this.$el),
                    xBarStyles = getComputedStyle(this.$refs.xBar),
                    pureContainerHeight = utils.DomHandler.getHeight(this.$el) - parseInt(xBarStyles['height'], 10);

                if (containerStyles['max-height'] !== 'none' && pureContainerHeight === 0) {
                    if (this.$refs.content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                        this.$el.style.height = containerStyles['max-height'];
                    } else {
                        this.$el.style.height =
                            this.$refs.content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + 'px';
                    }
                }
            },
            moveBar() {
                /* horizontal scroll */
                let totalWidth = this.$refs.content.scrollWidth;
                let ownWidth = this.$refs.content.clientWidth;
                let bottom = (this.$el.clientHeight - this.$refs.xBar.clientHeight) * -1;

                this.scrollXRatio = ownWidth / totalWidth;

                /* vertical scroll */
                let totalHeight = this.$refs.content.scrollHeight;
                let ownHeight = this.$refs.content.clientHeight;
                let right = (this.$el.clientWidth - this.$refs.yBar.clientWidth) * -1;

                this.scrollYRatio = ownHeight / totalHeight;

                this.frame = this.requestAnimationFrame(() => {
                    if (this.scrollXRatio >= 1) {
                        utils.DomHandler.addClass(this.$refs.xBar, 'p-scrollpanel-hidden');
                    } else {
                        utils.DomHandler.removeClass(this.$refs.xBar, 'p-scrollpanel-hidden');
                        this.$refs.xBar.style.cssText = 'width:' + Math.max(this.scrollXRatio * 100, 10) + '%; left:' + (this.$refs.content.scrollLeft / totalWidth) * 100 + '%;bottom:' + bottom + 'px;';
                    }

                    if (this.scrollYRatio >= 1) {
                        utils.DomHandler.addClass(this.$refs.yBar, 'p-scrollpanel-hidden');
                    } else {
                        utils.DomHandler.removeClass(this.$refs.yBar, 'p-scrollpanel-hidden');
                        this.$refs.yBar.style.cssText = 'height:' + Math.max(this.scrollYRatio * 100, 10) + '%; top: calc(' + (this.$refs.content.scrollTop / totalHeight) * 100 + '% - ' + this.$refs.xBar.clientHeight + 'px);right:' + right + 'px;';
                    }
                });
            },
            onYBarMouseDown(e) {
                this.isYBarClicked = true;
                this.$refs.yBar.focus();
                this.lastPageY = e.pageY;
                utils.DomHandler.addClass(this.$refs.yBar, 'p-scrollpanel-grabbed');
                utils.DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');

                this.bindDocumentMouseListeners();
                e.preventDefault();
            },
            onXBarMouseDown(e) {
                this.isXBarClicked = true;
                this.$refs.xBar.focus();
                this.lastPageX = e.pageX;
                utils.DomHandler.addClass(this.$refs.xBar, 'p-scrollpanel-grabbed');
                utils.DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');

                this.bindDocumentMouseListeners();
                e.preventDefault();
            },
            onScroll(event) {
                if (this.lastScrollLeft !== event.target.scrollLeft) {
                    this.lastScrollLeft = event.target.scrollLeft;
                    this.orientation = 'horizontal';
                } else if (this.lastScrollTop !== event.target.scrollTop) {
                    this.lastScrollTop = event.target.scrollTop;
                    this.orientation = 'vertical';
                }

                this.moveBar();
            },
            onKeyDown(event) {
                if (this.orientation === 'vertical') {
                    switch (event.code) {
                        case 'ArrowDown': {
                            this.setTimer('scrollTop', this.step);
                            event.preventDefault();
                            break;
                        }

                        case 'ArrowUp': {
                            this.setTimer('scrollTop', this.step * -1);
                            event.preventDefault();
                            break;
                        }

                        case 'ArrowLeft':

                        case 'ArrowRight': {
                            event.preventDefault();
                            break;
                        }
                    }
                } else if (this.orientation === 'horizontal') {
                    switch (event.code) {
                        case 'ArrowRight': {
                            this.setTimer('scrollLeft', this.step);
                            event.preventDefault();
                            break;
                        }

                        case 'ArrowLeft': {
                            this.setTimer('scrollLeft', this.step * -1);
                            event.preventDefault();
                            break;
                        }

                        case 'ArrowDown':

                        case 'ArrowUp': {
                            event.preventDefault();
                            break;
                        }
                    }
                }
            },
            onKeyUp() {
                this.clearTimer();
            },
            repeat(bar, step) {
                this.$refs.content[bar] += step;
                this.moveBar();
            },
            setTimer(bar, step) {
                this.clearTimer();
                this.timer = setTimeout(() => {
                    this.repeat(bar, step);
                }, 40);
            },
            clearTimer() {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            onDocumentMouseMove(e) {
                if (this.isXBarClicked) {
                    this.onMouseMoveForXBar(e);
                } else if (this.isYBarClicked) {
                    this.onMouseMoveForYBar(e);
                } else {
                    this.onMouseMoveForXBar(e);
                    this.onMouseMoveForYBar(e);
                }
            },
            onMouseMoveForXBar(e) {
                let deltaX = e.pageX - this.lastPageX;

                this.lastPageX = e.pageX;

                this.frame = this.requestAnimationFrame(() => {
                    this.$refs.content.scrollLeft += deltaX / this.scrollXRatio;
                });
            },
            onMouseMoveForYBar(e) {
                let deltaY = e.pageY - this.lastPageY;

                this.lastPageY = e.pageY;

                this.frame = this.requestAnimationFrame(() => {
                    this.$refs.content.scrollTop += deltaY / this.scrollYRatio;
                });
            },
            onFocus(event) {
                if (this.$refs.xBar.isSameNode(event.target)) {
                    this.orientation = 'horizontal';
                } else if (this.$refs.yBar.isSameNode(event.target)) {
                    this.orientation = 'vertical';
                }
            },
            onBlur() {
                if (this.orientation === 'horizontal') {
                    this.orientation = 'vertical';
                }
            },
            onDocumentMouseUp() {
                utils.DomHandler.removeClass(this.$refs.yBar, 'p-scrollpanel-grabbed');
                utils.DomHandler.removeClass(this.$refs.xBar, 'p-scrollpanel-grabbed');
                utils.DomHandler.removeClass(document.body, 'p-scrollpanel-grabbed');

                this.unbindDocumentMouseListeners();
                this.isXBarClicked = false;
                this.isYBarClicked = false;
            },
            requestAnimationFrame(f) {
                let frame = window.requestAnimationFrame || this.timeoutFrame;

                return frame(f);
            },
            refresh() {
                this.moveBar();
            },
            scrollTop(scrollTop) {
                let scrollableHeight = this.$refs.content.scrollHeight - this.$refs.content.clientHeight;

                scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
                this.$refs.content.scrollTop = scrollTop;
            },
            timeoutFrame(fn) {
                setTimeout(fn, 0);
            },
            bindDocumentMouseListeners() {
                if (!this.documentMouseMoveListener) {
                    this.documentMouseMoveListener = (e) => {
                        this.onDocumentMouseMove(e);
                    };

                    document.addEventListener('mousemove', this.documentMouseMoveListener);
                }

                if (!this.documentMouseUpListener) {
                    this.documentMouseUpListener = (e) => {
                        this.onDocumentMouseUp(e);
                    };

                    document.addEventListener('mouseup', this.documentMouseUpListener);
                }
            },
            unbindDocumentMouseListeners() {
                if (this.documentMouseMoveListener) {
                    document.removeEventListener('mousemove', this.documentMouseMoveListener);
                    this.documentMouseMoveListener = null;
                }

                if (this.documentMouseUpListener) {
                    document.removeEventListener('mouseup', this.documentMouseUpListener);
                    this.documentMouseUpListener = null;
                }
            },
            bindDocumentResizeListener() {
                if (!this.documentResizeListener) {
                    this.documentResizeListener = () => {
                        this.moveBar();
                    };

                    window.addEventListener('resize', this.documentResizeListener);
                }
            },
            unbindDocumentResizeListener() {
                if (this.documentResizeListener) {
                    window.removeEventListener('resize', this.documentResizeListener);
                    this.documentResizeListener = null;
                }
            }
        }
    };

    const _hoisted_1 = ["aria-valuenow"];
    const _hoisted_2 = ["aria-valuenow"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: "p-scrollpanel p-component" }, _ctx.ptm('root')), [
        vue.createElementVNode("div", vue.mergeProps({ class: "p-scrollpanel-wrapper" }, _ctx.ptm('wrapper')), [
          vue.createElementVNode("div", vue.mergeProps({
            ref: "content",
            class: "p-scrollpanel-content",
            onScroll: _cache[0] || (_cache[0] = (...args) => ($options.onScroll && $options.onScroll(...args))),
            onMouseenter: _cache[1] || (_cache[1] = (...args) => ($options.moveBar && $options.moveBar(...args)))
          }, _ctx.ptm('content')), [
            vue.renderSlot(_ctx.$slots, "default")
          ], 16)
        ], 16),
        vue.createElementVNode("div", vue.mergeProps({
          ref: "xBar",
          class: "p-scrollpanel-bar p-scrollpanel-bar-x",
          tabindex: "0",
          role: "scrollbar",
          "aria-orientation": "horizontal",
          "aria-valuenow": $data.lastScrollLeft,
          onMousedown: _cache[2] || (_cache[2] = (...args) => ($options.onXBarMouseDown && $options.onXBarMouseDown(...args))),
          onKeydown: _cache[3] || (_cache[3] = $event => ($options.onKeyDown($event))),
          onKeyup: _cache[4] || (_cache[4] = (...args) => ($options.onKeyUp && $options.onKeyUp(...args))),
          onFocus: _cache[5] || (_cache[5] = (...args) => ($options.onFocus && $options.onFocus(...args))),
          onBlur: _cache[6] || (_cache[6] = (...args) => ($options.onBlur && $options.onBlur(...args)))
        }, _ctx.ptm('barx')), null, 16, _hoisted_1),
        vue.createElementVNode("div", vue.mergeProps({
          ref: "yBar",
          class: "p-scrollpanel-bar p-scrollpanel-bar-y",
          tabindex: "0",
          role: "scrollbar",
          "aria-orientation": "vertical",
          "aria-valuenow": $data.lastScrollTop,
          onMousedown: _cache[7] || (_cache[7] = (...args) => ($options.onYBarMouseDown && $options.onYBarMouseDown(...args))),
          onKeydown: _cache[8] || (_cache[8] = $event => ($options.onKeyDown($event))),
          onKeyup: _cache[9] || (_cache[9] = (...args) => ($options.onKeyUp && $options.onKeyUp(...args))),
          onFocus: _cache[10] || (_cache[10] = (...args) => ($options.onFocus && $options.onFocus(...args)))
        }, _ctx.ptm('bary')), null, 16, _hoisted_2)
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

    var css_248z = "\n.p-scrollpanel-wrapper {\n    overflow: hidden;\n    width: 100%;\n    height: 100%;\n    position: relative;\n    z-index: 1;\n    float: left;\n}\n.p-scrollpanel-content {\n    height: calc(100% + 18px);\n    width: calc(100% + 18px);\n    padding: 0 18px 18px 0;\n    position: relative;\n    overflow: scroll;\n    box-sizing: border-box;\n    scrollbar-width: none;\n}\n.p-scrollpanel-content::-webkit-scrollbar {\n    display: none;\n}\n.p-scrollpanel-bar {\n    position: relative;\n    background: #c1c1c1;\n    border-radius: 3px;\n    z-index: 2;\n    cursor: pointer;\n    opacity: 0;\n    transition: opacity 0.25s linear;\n}\n.p-scrollpanel-bar-y {\n    width: 9px;\n    top: 0;\n}\n.p-scrollpanel-bar-x {\n    height: 9px;\n    bottom: 0;\n}\n.p-scrollpanel-hidden {\n    visibility: hidden;\n}\n.p-scrollpanel:hover .p-scrollpanel-bar,\n.p-scrollpanel:active .p-scrollpanel-bar {\n    opacity: 1;\n}\n.p-scrollpanel-grabbed {\n    user-select: none;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.basecomponent, primevue.utils, Vue);
